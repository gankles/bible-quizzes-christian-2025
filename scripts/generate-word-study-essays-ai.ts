#!/usr/bin/env npx tsx
/**
 * AI Word-Study Essay Generator using OpenAI GPT-4.1-mini
 *
 * Grounds each essay in real lexical data already in this repo — never lets
 * the model invent facts:
 *   - data/lexicon.json: word, transliteration, morphology, Strong's/BDB/LSJ
 *     definitions, etymology, and the resolved root-word entry (if any)
 *   - data/lexicon-concordance.json: total occurrence count and the real
 *     KJV translation-count breakdown (built in scripts/build-lexicon-concordance.ts)
 *   - bolls.life API: exact KJV text for one real "key verse" (the entry's
 *     first occurrence in canonical book order)
 *
 * Output: data/word-study-essays/{strongs}.json
 *
 * Usage:
 *   npx tsx scripts/generate-word-study-essays-ai.ts --strongs H7225
 *   npx tsx scripts/generate-word-study-essays-ai.ts --strongs H7225,H430,G25,G2316,G26
 *   npx tsx scripts/generate-word-study-essays-ai.ts --all
 *   npx tsx scripts/generate-word-study-essays-ai.ts --all --force --concurrency 3
 */

import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';
import { getLexiconConcordance } from '../lib/lexicon-concordance';
import { getVerse, stripHtml } from '../lib/bolls-api';

// =============================================================================
// TYPES
// =============================================================================

interface LexiconEntry {
  strongs: string;
  word: string;
  transliteration: string;
  pronunciation: string;
  language: string;
  definitions: { strongs: string; lsj?: string; bdb?: string; abbottSmith?: string };
  morphology: { code: string; explanation: string };
  etymology: string;
  rootWord: string;
}

interface Essay {
  strongs: string;
  word: string;
  transliteration: string;
  language: string;
  keyVerseRef: string;
  keyVerseText: string;
  rootMeaning: string;
  usageInScripture: string;
  theologicalSignificance: string;
  keyVerseReflection: string;
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
const LEXICON_PATH = path.resolve(SCRIPT_DIR, '..', 'data', 'lexicon.json');
const OUTPUT_DIR = path.resolve(SCRIPT_DIR, '..', 'data', 'word-study-essays');
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

function truncate(text: string | undefined, max: number): string {
  if (!text) return '';
  return text.length > max ? text.slice(0, max) + '...' : text;
}

let _lexiconMap: Map<string, LexiconEntry> | null = null;
function loadLexicon(): Map<string, LexiconEntry> {
  if (_lexiconMap) return _lexiconMap;
  const raw = JSON.parse(fs.readFileSync(LEXICON_PATH, 'utf-8'));
  const entries: LexiconEntry[] = raw.entries || raw;
  _lexiconMap = new Map(entries.map(e => [e.strongs, e]));
  return _lexiconMap;
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
  entry: LexiconEntry;
  rootEntry: LexiconEntry | null;
  totalOccurrences: number;
  topTranslations: { gloss: string; count: number }[];
  keyVerseRef: { bookSlug: string; bookName: string; chapter: number; verse: number; ref: string };
}

function buildGrounding(strongsId: string): Grounding | null {
  const lexicon = loadLexicon();
  const entry = lexicon.get(strongsId);
  if (!entry) return null;

  const rootEntry = entry.rootWord ? lexicon.get(entry.rootWord) || null : null;

  const concordance = getLexiconConcordance(strongsId);
  if (!concordance || concordance.occurrences.length === 0) return null;

  const first = concordance.occurrences[0];

  return {
    entry,
    rootEntry,
    totalOccurrences: concordance.totalOccurrences,
    topTranslations: concordance.translationCounts.slice(0, 8),
    keyVerseRef: first,
  };
}

// =============================================================================
// PROMPT
// =============================================================================

function buildPrompt(g: Grounding, keyVerseText: string): string {
  const { entry, rootEntry } = g;

  const facts = {
    strongs: entry.strongs,
    word: entry.word,
    transliteration: entry.transliteration,
    pronunciation: entry.pronunciation,
    language: entry.language,
    morphology: entry.morphology.explanation,
    strongsDefinition: truncate(entry.definitions.strongs, 500),
    lexiconDefinition: truncate(entry.definitions.bdb || entry.definitions.lsj, 800),
    abbottSmith: truncate(entry.definitions.abbottSmith, 500),
    etymology: entry.etymology || null,
    rootWord: rootEntry ? {
      strongs: rootEntry.strongs,
      word: rootEntry.word,
      transliteration: rootEntry.transliteration,
      definition: truncate(rootEntry.definitions.strongs, 300),
    } : null,
    totalOccurrences: g.totalOccurrences,
    topTranslations: g.topTranslations,
    keyVerse: { ref: g.keyVerseRef.ref, text: keyVerseText },
  };

  return `You are a Bible scholar writing a word-study essay for "${entry.word}" (${entry.transliteration}, ${entry.strongs}) in the style of BibleHub's Strong's Concordance pages combined with a devotional theological blog post — rigorous about the original language, but reflective about its meaning for faith.

FACTS (the ONLY information you may use — do not invent verses, numbers, derivations, or occurrences beyond what is given here):
${JSON.stringify(facts, null, 2)}

Return ONLY valid JSON with exactly these keys:
{
  "rootMeaning": "2-4 sentences on the word's root/etymological meaning, using the etymology and rootWord facts if present. If no etymology is given, analyze the Strong's/lexicon definition's core sense instead. Explain what the literal/root sense adds beyond the common English gloss.",
  "usageInScripture": "2-4 sentences on how this word is actually used across Scripture, grounded in totalOccurrences and topTranslations. Note the range or consistency of how it gets translated and what that reveals.",
  "theologicalSignificance": "3-5 sentences of theological reflection on why this word's original meaning matters for understanding Scripture and the Christian faith. Evangelical, conservative, Christ-centered perspective. Grounded in the facts given, not speculation.",
  "keyVerseReflection": "2-4 sentences reflecting on the keyVerse specifically — quote or closely paraphrase its text, and explain what this word contributes to that verse's meaning."
}

REQUIREMENTS:
- Every claim must trace back to a fact listed above. Do not cite verses other than the keyVerse given.
- Do not use social-justice framing, environmental activism, or modern political language.
- Write in original prose — do not copy lexicon definition wording verbatim, synthesize it.`;
}

// =============================================================================
// AI GENERATION
// =============================================================================

async function generateEssay(
  client: OpenAI,
  g: Grounding,
  keyVerseText: string,
): Promise<{ essay: Essay; cost: number }> {
  const prompt = buildPrompt(g, keyVerseText);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`  Calling GPT-4.1-mini for ${g.entry.strongs} (attempt ${attempt})...`);
      const response = await client.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: 'You are a Bible scholar. Return ONLY valid JSON, no markdown, no code fences.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.5,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }, { timeout: OPENAI_TIMEOUT_MS });

      const content = response.choices[0]?.message?.content?.trim();
      if (!content) throw new Error('Empty API response');

      const parsed = JSON.parse(content);
      if (!parsed.rootMeaning || !parsed.usageInScripture || !parsed.theologicalSignificance || !parsed.keyVerseReflection) {
        throw new Error('Response missing required fields');
      }

      const inputTokens = response.usage?.prompt_tokens || 0;
      const outputTokens = response.usage?.completion_tokens || 0;
      const cost = (inputTokens * INPUT_COST_PER_1M / 1_000_000) + (outputTokens * OUTPUT_COST_PER_1M / 1_000_000);

      const essay: Essay = {
        strongs: g.entry.strongs,
        word: g.entry.word,
        transliteration: g.entry.transliteration,
        language: g.entry.language,
        keyVerseRef: g.keyVerseRef.ref,
        keyVerseText,
        rootMeaning: parsed.rootMeaning,
        usageInScripture: parsed.usageInScripture,
        theologicalSignificance: parsed.theologicalSignificance,
        keyVerseReflection: parsed.keyVerseReflection,
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
  strongsId: string,
  force: boolean,
  dryRun: boolean,
): Promise<void> {
  if (!force && progress.completed[strongsId]) {
    console.log(`  [SKIP] ${strongsId} (already generated)`);
    return;
  }

  const g = buildGrounding(strongsId);
  if (!g) {
    console.warn(`  [SKIP] ${strongsId}: no lexicon entry or no concordance occurrences`);
    return;
  }

  if (dryRun) {
    console.log(`  [DRY-RUN] Would generate ${strongsId} (${g.entry.word}) — key verse ${g.keyVerseRef.ref}`);
    return;
  }

  console.log(`\n[GEN] ${strongsId} (${g.entry.word} / ${g.entry.transliteration})...`);

  const verse = await getVerse('KJV', g.keyVerseRef.bookSlug, g.keyVerseRef.chapter, g.keyVerseRef.verse);
  const keyVerseText = stripHtml(verse.text).trim();

  const { essay, cost } = await generateEssay(client, g, keyVerseText);

  const outFile = path.join(OUTPUT_DIR, `${strongsId}.json`);
  fs.writeFileSync(outFile, JSON.stringify(essay, null, 2), 'utf-8');

  progress.completed[strongsId] = true;
  progress.totalGenerated++;
  progress.totalCost += cost;
  saveProgress(progress);

  console.log(`  [OK] ${strongsId} saved ($${cost.toFixed(4)})`);
}

async function processBatch(
  client: OpenAI,
  ids: string[],
  concurrency: number,
  force: boolean,
  dryRun: boolean,
): Promise<void> {
  const progress = loadProgress();

  console.log(`\nWord Study Essay Generation`);
  console.log(`Total entries: ${ids.length}`);
  console.log(`Already done: ${Object.keys(progress.completed).length}`);
  console.log(`Concurrency: ${concurrency}`);
  console.log(`Force: ${force}`);
  console.log(`Dry run: ${dryRun}`);
  console.log(`Total cost so far: $${progress.totalCost.toFixed(4)}\n`);

  let idx = 0;
  const total = ids.length;

  async function worker(): Promise<void> {
    while (idx < total) {
      const i = idx++;
      const strongsId = ids[i];
      try {
        await processEntry(client, progress, strongsId, force, dryRun);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`  [FAIL] ${strongsId}: ${msg}`);
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
  npx tsx scripts/generate-word-study-essays-ai.ts --strongs H7225
  npx tsx scripts/generate-word-study-essays-ai.ts --strongs H7225,H430,G25
  npx tsx scripts/generate-word-study-essays-ai.ts --all

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

  let ids: string[] = [];

  if (args.includes('--strongs')) {
    const i = args.indexOf('--strongs');
    ids = args[i + 1].split(',').map(s => s.trim().toUpperCase());
  } else if (args.includes('--all')) {
    ids = Array.from(loadLexicon().keys());
  }

  if (ids.length === 0) {
    console.error('No Strong\'s numbers specified');
    process.exit(1);
  }

  await processBatch(client, ids, concurrency, force, dryRun);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
