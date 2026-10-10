#!/usr/bin/env npx tsx
/**
 * AI Verse Deep-Dive Essay Generator using OpenAI GPT-4.1-mini
 *
 * Targets the 100 curated verses in lib/popular-verses-data.ts. These pages
 * currently render generic boilerplate in components/verse-study/StudyTabs.tsx's
 * ScholarlyContent() ("This verse is found in the book of {bookName}...") that
 * is identical across every verse. This generates real historical-context and
 * theological-significance prose grounded in the verse's own KJV text plus
 * whatever real commentary/cross-reference/interlinear/place data already
 * exists for it — never inventing facts beyond what's fetched here.
 *
 * Output: data/verse-essays/{bookSlug}-{chapter}-{verse}.json
 *
 * Usage:
 *   npx tsx scripts/generate-verse-essays-ai.ts --all
 *   npx tsx scripts/generate-verse-essays-ai.ts --all --force --concurrency 3
 */

import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';
import { ALL_POPULAR_VERSES, PopularVerse, popularVerseSlug } from '../lib/popular-verses-data';
import { getAllVerseCommentaries } from '../lib/commentary-loader';
import { getCrossReferences } from '../lib/cross-references';
import { getInterlinearVerse } from '../lib/interlinear-data';
import { getVersePlaces } from '../lib/geocoding-data';

// =============================================================================
// TYPES
// =============================================================================

interface VerseEssay {
  slug: string;
  reference: string;
  historicalContext: string;
  theologicalSignificance: string;
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
const OUTPUT_DIR = path.resolve(SCRIPT_DIR, '..', 'data', 'verse-essays');
const PROGRESS_FILE = path.join(OUTPUT_DIR, '.progress.json');

const OPENAI_RATE_LIMIT_MS = 300;
const OPENAI_TIMEOUT_MS = 120000;
const MAX_RETRIES = 3;

const INPUT_COST_PER_1M = 0.40;
const OUTPUT_COST_PER_1M = 1.60;

// =============================================================================
// HELPERS
// =============================================================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
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
  verse: PopularVerse;
  commentaries: { text: string; source: string }[];
  crossRefs: string[];
  interlinearGlosses: string[];
  places: string[];
}

function buildGrounding(verse: PopularVerse): Grounding {
  const commentaries = getAllVerseCommentaries(verse.bookSlug, verse.chapter, verse.verse)
    .map(c => ({ text: c.text, source: c.source }));

  const crossRefs = getCrossReferences(verse.bookSlug, verse.chapter, verse.verse, 6)
    .map(r => r.reference);

  const interlinear = getInterlinearVerse(verse.bookSlug, verse.chapter, verse.verse);
  const interlinearGlosses = interlinear
    ? interlinear.map(w => `${w.transliteration} (${w.strongs}): ${w.definition}`).slice(0, 10)
    : [];

  const places = getVersePlaces(`${verse.bookSlug}-${verse.chapter}-${verse.verse}`)
    .map(p => `${p.name} (${p.type})`);

  return { verse, commentaries, crossRefs, interlinearGlosses, places };
}

// =============================================================================
// PROMPT
// =============================================================================

function buildPrompt(g: Grounding): string {
  const { verse, commentaries, crossRefs, interlinearGlosses, places } = g;

  const facts = {
    reference: verse.reference,
    verseText: verse.text,
    theme: verse.theme,
    scholarlyCommentary: commentaries.length > 0 ? commentaries : null,
    crossReferences: crossRefs.length > 0 ? crossRefs : null,
    originalLanguageWords: interlinearGlosses.length > 0 ? interlinearGlosses : null,
    namedPlaces: places.length > 0 ? places : null,
  };

  return `You are a Bible scholar writing deep-dive study content for "${verse.reference}" in an evangelical, conservative, Christ-centered Bible study resource.

FACTS (the ONLY information you may use — do not invent historical details, quotes, or claims beyond what is given here):
${JSON.stringify(facts, null, 2)}

Return ONLY valid JSON with exactly these keys:
{
  "historicalContext": "2-4 sentences on the historical/literary setting of this verse, grounded in verseText and, if present, scholarlyCommentary/originalLanguageWords/namedPlaces. If little grounding data is given, stay general about the book's known setting rather than inventing specifics.",
  "theologicalSignificance": "2-4 sentences on what this verse teaches theologically and how it connects to the broader witness of Scripture, grounded in verseText, theme, and crossReferences if present. Avoid generic filler — say something substantive tied to the actual wording of the verse."
}

REQUIREMENTS:
- Every claim must trace back to a fact listed above.
- Write in original prose — if scholarlyCommentary is present, do not copy its wording, synthesize the same ideas freshly.
- Do not use social-justice framing, environmental activism, or modern political language.`;
}

// =============================================================================
// AI GENERATION
// =============================================================================

async function generateEssay(client: OpenAI, g: Grounding): Promise<{ essay: VerseEssay; cost: number }> {
  const prompt = buildPrompt(g);
  const slug = popularVerseSlug(g.verse);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`  Calling GPT-4.1-mini for ${slug} (attempt ${attempt})...`);
      const response = await client.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: 'You are a Bible scholar. Return ONLY valid JSON, no markdown, no code fences.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.5,
        max_tokens: 700,
        response_format: { type: 'json_object' },
      }, { timeout: OPENAI_TIMEOUT_MS });

      const content = response.choices[0]?.message?.content?.trim();
      if (!content) throw new Error('Empty API response');

      const parsed = JSON.parse(content);
      if (!parsed.historicalContext || !parsed.theologicalSignificance) {
        throw new Error('Response missing required fields');
      }

      const inputTokens = response.usage?.prompt_tokens || 0;
      const outputTokens = response.usage?.completion_tokens || 0;
      const cost = (inputTokens * INPUT_COST_PER_1M / 1_000_000) + (outputTokens * OUTPUT_COST_PER_1M / 1_000_000);

      const essay: VerseEssay = {
        slug,
        reference: g.verse.reference,
        historicalContext: parsed.historicalContext,
        theologicalSignificance: parsed.theologicalSignificance,
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
  verse: PopularVerse,
  force: boolean,
  dryRun: boolean,
): Promise<void> {
  const slug = popularVerseSlug(verse);

  if (!force && progress.completed[slug]) {
    console.log(`  [SKIP] ${slug} (already generated)`);
    return;
  }

  const g = buildGrounding(verse);

  if (dryRun) {
    console.log(`  [DRY-RUN] Would generate ${slug} (${verse.reference}) — ${g.commentaries.length} commentaries, ${g.crossRefs.length} cross-refs, ${g.interlinearGlosses.length} interlinear words, ${g.places.length} places`);
    return;
  }

  console.log(`\n[GEN] ${slug} (${verse.reference})...`);

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
  verses: PopularVerse[],
  concurrency: number,
  force: boolean,
  dryRun: boolean,
): Promise<void> {
  const progress = loadProgress();

  console.log(`\nVerse Essay Generation`);
  console.log(`Total verses: ${verses.length}`);
  console.log(`Already done: ${Object.keys(progress.completed).length}`);
  console.log(`Concurrency: ${concurrency}`);
  console.log(`Force: ${force}`);
  console.log(`Dry run: ${dryRun}`);
  console.log(`Total cost so far: $${progress.totalCost.toFixed(4)}\n`);

  let idx = 0;
  const total = verses.length;

  async function worker(): Promise<void> {
    while (idx < total) {
      const i = idx++;
      const verse = verses[i];
      try {
        await processEntry(client, progress, verse, force, dryRun);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`  [FAIL] ${popularVerseSlug(verse)}: ${msg}`);
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
  npx tsx scripts/generate-verse-essays-ai.ts --all

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

  if (!args.includes('--all')) {
    console.error('Only --all is supported (grounds against the fixed 100-verse curated list)');
    process.exit(1);
  }

  await processBatch(client, ALL_POPULAR_VERSES, concurrency, force, dryRun);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
