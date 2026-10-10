#!/usr/bin/env npx tsx
/**
 * AI Character Essay Generator using OpenAI GPT-4.1-mini
 *
 * Grounds each essay in real structured data already in this repo — never lets
 * the model invent facts:
 *   - lib/people-data.ts (CSV-backed, 3,009 people): uniqueAttribute, tribe,
 *     sex, Hebrew/Greek name labels with real Strong's numbers and scripture
 *     references, and family relationships with real scripture references
 *   - data/kjvstudy/biographies.json (127 people, name-matched): used ONLY as
 *     extra grounding facts to fold into fresh prose — never copied verbatim,
 *     since that file is a verbatim mirror of kjvstudy.org and copying it
 *     directly would be duplicate content
 *
 * Output: data/character-essays/{slug}.json
 *
 * Usage:
 *   npx tsx scripts/generate-character-essays-ai.ts --slugs david,moses
 *   npx tsx scripts/generate-character-essays-ai.ts --all
 *   npx tsx scripts/generate-character-essays-ai.ts --all --force --concurrency 3
 */

import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';
import { getAllPeople, BiblePerson } from '../lib/people-data';
import { findBiography } from '../lib/biographies-data';

// =============================================================================
// TYPES
// =============================================================================

interface CharacterEssay {
  slug: string;
  name: string;
  overview: string;
  namesAndTitles: string;
  familyAndRelationships: string;
  scriptureSignificance: string;
  keyEvents: { event: string; verse: string }[];
  generatedAt: string;
}

interface ProgressData {
  completed: Record<string, boolean>;
  lastUpdated: string;
  totalGenerated: number;
  totalCost: number;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const OUTPUT_DIR = path.resolve(SCRIPT_DIR, '..', 'data', 'character-essays');
const PROGRESS_FILE = path.join(OUTPUT_DIR, '.progress.json');

const OPENAI_RATE_LIMIT_MS = 300;
const OPENAI_TIMEOUT_MS = 120000;
const MAX_RETRIES = 3;

// GPT-4.1-mini pricing (per 1M tokens)
const INPUT_COST_PER_1M = 0.40;
const OUTPUT_COST_PER_1M = 1.60;

// =============================================================================
// HELPERS
// =============================================================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let _peopleMap: Map<string, BiblePerson> | null = null;
function loadPeople(): Map<string, BiblePerson> {
  if (_peopleMap) return _peopleMap;
  _peopleMap = new Map(getAllPeople().map(p => [p.slug, p]));
  return _peopleMap;
}

// =============================================================================
// PROGRESS TRACKING
// =============================================================================

function loadProgress(): ProgressData {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
  }
  return { completed: {}, lastUpdated: new Date().toISOString(), totalGenerated: 0, totalCost: 0 };
}

function saveProgress(progress: ProgressData): void {
  progress.lastUpdated = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2), 'utf-8');
}

// =============================================================================
// GROUNDING DATA
// =============================================================================

interface Grounding {
  person: BiblePerson;
  kjvBio: { summary: string; significance: string; keyEvents: { age: number; event: string; verse: string }[] } | null;
}

function buildGrounding(slug: string): Grounding | null {
  const person = loadPeople().get(slug);
  if (!person) return null;

  const bio = findBiography(person.name);

  return {
    person,
    kjvBio: bio ? { summary: bio.summary, significance: bio.significance, keyEvents: bio.keyEvents } : null,
  };
}

// =============================================================================
// PROMPT
// =============================================================================

function buildPrompt(g: Grounding): string {
  const { person, kjvBio } = g;

  const facts = {
    name: person.name,
    nameInstance: person.nameInstance > 1 ? person.nameInstance : null,
    sex: person.sex || null,
    tribe: person.tribe || null,
    surname: person.surname || null,
    uniqueAttribute: person.uniqueAttribute || null,
    notes: person.notes || null,
    names: person.labels.slice(0, 12).map(l => ({
      name: l.labelName,
      meaning: l.meaningEn || null,
      type: l.labelType || null,
      givenByGod: l.givenByGod,
      reference: l.reference || null,
    })),
    relationships: person.relationships.slice(0, 15).map(r => ({
      person: r.otherPersonName,
      relationship: r.relationshipType,
      subtype: r.relationshipSubtype || null,
      reference: r.reference || null,
    })),
    additionalRelationshipsNotShown: Math.max(0, person.relationships.length - 15),
    // Extra grounding ONLY — reflect these facts in your own words, never copy wording
    priorReferenceSummary: kjvBio?.summary || null,
    priorReferenceSignificance: kjvBio?.significance || null,
  };

  return `You are a Bible scholar writing a concise, factual character profile essay for "${person.name}" in an evangelical, conservative, Christ-centered Bible encyclopedia.

FACTS (the ONLY information you may use — do not invent events, relationships, verses, or meanings beyond what is given here):
${JSON.stringify(facts, null, 2)}

Return ONLY valid JSON with exactly these keys:
{
  "overview": "2-4 sentences introducing who this person is, grounded in uniqueAttribute, tribe, sex, and notes. If uniqueAttribute is minimal, keep this short rather than padding with speculation.",
  "namesAndTitles": "1-3 sentences on what this person's name(s)/title(s) in the 'names' list mean and reveal, citing the Hebrew/Greek meanings given. If there is only one name with no special meaning given, state that plainly and briefly rather than inventing significance.",
  "familyAndRelationships": "1-3 sentences summarizing the relationships listed. If the relationships array is empty, say plainly that Scripture does not record family relationships for this person beyond what is listed in uniqueAttribute — do not invent a family.",
  "scriptureSignificance": "2-4 sentences on why this person matters in the biblical narrative, synthesizing uniqueAttribute, notes, and priorReferenceSummary/priorReferenceSignificance (if given) into fresh original wording — never copy the prior reference text verbatim.",
  "keyEvents": "If priorReferenceSummary/significance included key life events with verse references, you may omit this — leave as an empty array []. This field is populated separately from source data, not by you."
}

REQUIREMENTS:
- Every claim must trace back to a fact listed above.
- Do not cite verses other than those given in the facts.
- Write in original prose — if priorReferenceSummary/priorReferenceSignificance are present, do not copy their wording, synthesize the same facts freshly.
- Do not use social-justice framing, environmental activism, or modern political language.
- Always return "keyEvents": [] — it is filled in separately.`;
}

// =============================================================================
// AI GENERATION
// =============================================================================

async function generateEssay(client: OpenAI, g: Grounding): Promise<{ essay: CharacterEssay; cost: number }> {
  const prompt = buildPrompt(g);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`  Calling GPT-4.1-mini for ${g.person.slug} (attempt ${attempt})...`);
      const response = await client.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: 'You are a Bible scholar. Return ONLY valid JSON, no markdown, no code fences.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.5,
        max_tokens: 1200,
        response_format: { type: 'json_object' },
      }, { timeout: OPENAI_TIMEOUT_MS });

      const content = response.choices[0]?.message?.content?.trim();
      if (!content) throw new Error('Empty API response');

      const parsed = JSON.parse(content);
      if (!parsed.overview || !parsed.namesAndTitles || !parsed.familyAndRelationships || !parsed.scriptureSignificance) {
        throw new Error('Response missing required fields');
      }

      const inputTokens = response.usage?.prompt_tokens || 0;
      const outputTokens = response.usage?.completion_tokens || 0;
      const cost = (inputTokens * INPUT_COST_PER_1M / 1_000_000) + (outputTokens * OUTPUT_COST_PER_1M / 1_000_000);

      // Key events are passed through from the source data, not AI-generated —
      // they're short factual (event, verse) pairs, not prose, so there's no
      // duplicate-content risk in reusing them as-is.
      const keyEvents = (g.kjvBio?.keyEvents || []).map(e => ({ event: e.event, verse: e.verse }));

      const essay: CharacterEssay = {
        slug: g.person.slug,
        name: g.person.name,
        overview: parsed.overview,
        namesAndTitles: parsed.namesAndTitles,
        familyAndRelationships: parsed.familyAndRelationships,
        scriptureSignificance: parsed.scriptureSignificance,
        keyEvents,
        generatedAt: new Date().toISOString(),
      };

      await sleep(OPENAI_RATE_LIMIT_MS);
      return { essay, cost };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`  Attempt ${attempt} failed: ${msg}`);
      if (attempt >= MAX_RETRIES) throw err;
      await sleep(3000 * attempt);
    }
  }

  throw new Error(`Failed after ${MAX_RETRIES} retries`);
}

// =============================================================================
// BATCH PROCESSING
// =============================================================================

async function processEntry(
  client: OpenAI,
  progress: ProgressData,
  slug: string,
  force: boolean,
  dryRun: boolean,
): Promise<void> {
  if (!force && progress.completed[slug]) {
    console.log(`  [SKIP] ${slug} (already generated)`);
    return;
  }

  const g = buildGrounding(slug);
  if (!g) {
    console.warn(`  [SKIP] ${slug}: no person record found`);
    return;
  }

  if (dryRun) {
    console.log(`  [DRY-RUN] Would generate ${slug} (${g.person.name}) — ${g.person.labels.length} names, ${g.person.relationships.length} relationships, kjvBio: ${!!g.kjvBio}`);
    return;
  }

  console.log(`\n[GEN] ${slug} (${g.person.name})...`);

  const { essay, cost } = await generateEssay(client, g);

  const outFile = path.join(OUTPUT_DIR, `${slug}.json`);
  fs.writeFileSync(outFile, JSON.stringify(essay, null, 2), 'utf-8');

  progress.completed[slug] = true;
  progress.totalGenerated++;
  progress.totalCost += cost;
  saveProgress(progress);

  console.log(`  [OK] ${slug} saved ($${cost.toFixed(4)})`);
}

async function processBatch(
  client: OpenAI,
  slugs: string[],
  concurrency: number,
  force: boolean,
  dryRun: boolean,
): Promise<void> {
  const progress = loadProgress();

  console.log(`\nCharacter Essay Generation`);
  console.log(`Total people: ${slugs.length}`);
  console.log(`Already done: ${Object.keys(progress.completed).length}`);
  console.log(`Concurrency: ${concurrency}`);
  console.log(`Force: ${force}`);
  console.log(`Dry run: ${dryRun}`);
  console.log(`Total cost so far: $${progress.totalCost.toFixed(4)}\n`);

  let idx = 0;
  const total = slugs.length;

  async function worker(): Promise<void> {
    while (idx < total) {
      const i = idx++;
      const slug = slugs[i];
      try {
        await processEntry(client, progress, slug, force, dryRun);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`  [FAIL] ${slug}: ${msg}`);
      }
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  console.log(`\n=== COMPLETE ===`);
  console.log(`Generated: ${progress.totalGenerated}`);
  console.log(`Total cost: $${progress.totalCost.toFixed(4)}`);
}

// =============================================================================
// CLI
// =============================================================================

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage:
  npx tsx scripts/generate-character-essays-ai.ts --slugs david,moses
  npx tsx scripts/generate-character-essays-ai.ts --all

Options:
  --concurrency <n>   Parallel workers (default: 2)
  --force             Regenerate even if already completed
  --dry-run           Show what would be generated without calling any API
`);
    process.exit(0);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const dryRun = args.includes('--dry-run');
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey && !dryRun) {
    console.error('Error: OPENAI_API_KEY environment variable is required');
    process.exit(1);
  }

  const client = new OpenAI({ apiKey: apiKey || 'dry-run' });
  const force = args.includes('--force');
  const concurrencyIdx = args.indexOf('--concurrency');
  const concurrency = concurrencyIdx !== -1 ? parseInt(args[concurrencyIdx + 1]) || 2 : 2;

  let slugs: string[] = [];

  if (args.includes('--slugs')) {
    const i = args.indexOf('--slugs');
    slugs = args[i + 1].split(',').map(s => s.trim().toLowerCase());
  } else if (args.includes('--all')) {
    slugs = getAllPeople().map(p => p.slug);
  }

  if (slugs.length === 0) {
    console.error('No slugs specified');
    process.exit(1);
  }

  await processBatch(client, slugs, concurrency, force, dryRun);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
