#!/usr/bin/env npx tsx
/**
 * AI Verse Comparison Essay Generator using OpenAI GPT-4.1-mini
 *
 * app/verses/[book]/page.tsx's "-and-" combination scenario accepts ANY two
 * verse slugs (no fixed list, not in the sitemap, no internal links point to
 * it) and currently renders a single hardcoded "Scholarly Insight" paragraph
 * IDENTICAL for every pair regardless of content — a fabricated theological
 * claim, not grounded in the actual verses.
 *
 * Since the combination space is unbounded, this script curates a FINITE set
 * of real pairs: for each of the 100 curated popular verses (lib/popular-
 * verses-data.ts), it takes that verse's own highest-voted REAL cross
 * reference (data/cross-references.json via lib/cross-references.ts) as its
 * partner verse. The pairing itself is therefore grounded in existing
 * cross-reference data, never invented. Duplicate/self pairs are dropped.
 *
 * Output:
 *   data/verse-comparisons/{slug1}-and-{slug2}.json   (per-pair essay)
 *   data/verse-comparisons/_manifest.json             (list of all pairs, for linking)
 *
 * Usage:
 *   npx tsx scripts/generate-verse-comparisons-ai.ts --all
 *   npx tsx scripts/generate-verse-comparisons-ai.ts --all --force --concurrency 3
 */

import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';
import { ALL_POPULAR_VERSES, PopularVerse, popularVerseSlug } from '../lib/popular-verses-data';
import { getCrossReferences } from '../lib/cross-references';
import { getAllVerseCommentaries } from '../lib/commentary-loader';
import { getVerses, getBookId, getBookName, stripHtml } from '../lib/bolls-api';

// =============================================================================
// TYPES
// =============================================================================

interface ComparisonPair {
  slug: string;
  slug1: string;
  slug2: string;
  ref1: string;
  ref2: string;
  votes: number;
}

interface ComparisonEssay {
  slug: string;
  ref1: string;
  ref2: string;
  insight: string;
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
const OUTPUT_DIR = path.resolve(SCRIPT_DIR, '..', 'data', 'verse-comparisons');
const PROGRESS_FILE = path.join(OUTPUT_DIR, '.progress.json');
const MANIFEST_FILE = path.join(OUTPUT_DIR, '_manifest.json');

const MAX_PAIRS = 40;
const OPENAI_RATE_LIMIT_MS = 300;
const OPENAI_TIMEOUT_MS = 120000;
const MAX_RETRIES = 3;

const INPUT_COST_PER_1M = 0.40;
const OUTPUT_COST_PER_1M = 1.60;

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// =============================================================================
// CURATE PAIRS (grounded in real cross-reference data)
// =============================================================================

function buildPairs(): ComparisonPair[] {
  const seen = new Set<string>();
  const pairs: ComparisonPair[] = [];

  for (const v of ALL_POPULAR_VERSES) {
    const crossRefs = getCrossReferences(v.bookSlug, v.chapter, v.verse, 1);
    if (crossRefs.length === 0) continue;
    const cr = crossRefs[0];

    const slug1 = popularVerseSlug(v);
    const slug2 = `${cr.bookSlug}-${cr.chapter}-${cr.verse}`;
    if (slug1 === slug2) continue;

    const dedupeKey = [slug1, slug2].sort().join('|');
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    pairs.push({
      slug: `${slug1}-and-${slug2}`,
      slug1,
      slug2,
      ref1: v.reference,
      ref2: cr.reference,
      votes: cr.votes,
    });

    if (pairs.length >= MAX_PAIRS) break;
  }

  return pairs;
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
  pair: ComparisonPair;
  text1: string;
  text2: string;
  commentary1: string | null;
  commentary2: string | null;
}

async function buildGrounding(pair: ComparisonPair): Promise<Grounding | null> {
  const parseSlug = (slug: string) => {
    const parts = slug.split('-');
    const verse = parseInt(parts.pop()!);
    const chapter = parseInt(parts.pop()!);
    const bookSlug = parts.join('-');
    return { bookSlug, chapter, verse };
  };

  const loc1 = parseSlug(pair.slug1);
  const loc2 = parseSlug(pair.slug2);

  const bookId1 = getBookId(loc1.bookSlug);
  const bookId2 = getBookId(loc2.bookSlug);
  if (!bookId1 || !bookId2) return null;

  const results = await getVerses([
    { translation: 'KJV', book: bookId1, chapter: loc1.chapter, verses: [loc1.verse] },
    { translation: 'KJV', book: bookId2, chapter: loc2.chapter, verses: [loc2.verse] },
  ]);

  const v1 = results[0]?.[0];
  const v2 = results[1]?.[0];
  if (!v1 || !v2) return null;

  const commentaries1 = getAllVerseCommentaries(loc1.bookSlug, loc1.chapter, loc1.verse);
  const commentaries2 = getAllVerseCommentaries(loc2.bookSlug, loc2.chapter, loc2.verse);

  return {
    pair,
    text1: stripHtml(v1.text).trim(),
    text2: stripHtml(v2.text).trim(),
    commentary1: commentaries1[0]?.text || null,
    commentary2: commentaries2[0]?.text || null,
  };
}

// =============================================================================
// PROMPT
// =============================================================================

function buildPrompt(g: Grounding): string {
  const facts = {
    verse1: { ref: g.pair.ref1, text: g.text1, commentary: g.commentary1 },
    verse2: { ref: g.pair.ref2, text: g.text2, commentary: g.commentary2 },
    crossReferenceVotes: g.pair.votes,
  };

  return `You are a Bible scholar writing a short comparison note for a page that places two Scripture passages side by side, in an evangelical, conservative, Christ-centered Bible study resource. These two verses are linked as cross-references in a real cross-reference database (crossReferenceVotes shows how many editors confirmed the link).

FACTS (the ONLY information you may use — do not invent historical details or claims beyond what is given here):
${JSON.stringify(facts, null, 2)}

Return ONLY valid JSON with exactly this key:
{
  "insight": "2-4 sentences explaining the real, textual connection between verse1 and verse2 — grounded specifically in their actual wording (and commentary, if present). Do not impose a generic template like 'one is the what and one is the how' unless the actual text supports it. If the two verses share a direct thematic or verbal link, say what it specifically is."
}

REQUIREMENTS:
- Every claim must trace back to a fact listed above.
- Write in original prose, not copied from commentary.
- Do not use social-justice framing, environmental activism, or modern political language.`;
}

// =============================================================================
// AI GENERATION
// =============================================================================

async function generateEssay(client: OpenAI, g: Grounding): Promise<{ essay: ComparisonEssay; cost: number }> {
  const prompt = buildPrompt(g);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`  Calling GPT-4.1-mini for ${g.pair.slug} (attempt ${attempt})...`);
      const response = await client.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: 'You are a Bible scholar. Return ONLY valid JSON, no markdown, no code fences.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.5,
        max_tokens: 500,
        response_format: { type: 'json_object' },
      }, { timeout: OPENAI_TIMEOUT_MS });

      const content = response.choices[0]?.message?.content?.trim();
      if (!content) throw new Error('Empty API response');

      const parsed = JSON.parse(content);
      if (!parsed.insight) throw new Error('Response missing required fields');

      const inputTokens = response.usage?.prompt_tokens || 0;
      const outputTokens = response.usage?.completion_tokens || 0;
      const cost = (inputTokens * INPUT_COST_PER_1M / 1_000_000) + (outputTokens * OUTPUT_COST_PER_1M / 1_000_000);

      const essay: ComparisonEssay = {
        slug: g.pair.slug,
        ref1: g.pair.ref1,
        ref2: g.pair.ref2,
        insight: parsed.insight,
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
  pair: ComparisonPair,
  force: boolean,
  dryRun: boolean,
): Promise<void> {
  if (!force && progress.completed[pair.slug]) {
    console.log(`  [SKIP] ${pair.slug} (already generated)`);
    return;
  }

  const g = await buildGrounding(pair);
  if (!g) {
    console.warn(`  [SKIP] ${pair.slug}: could not resolve both verses`);
    return;
  }

  if (dryRun) {
    console.log(`  [DRY-RUN] Would generate ${pair.slug} — commentary1: ${!!g.commentary1}, commentary2: ${!!g.commentary2}`);
    return;
  }

  console.log(`\n[GEN] ${pair.slug}...`);

  const { essay, cost } = await generateEssay(client, g);

  const outFile = path.join(OUTPUT_DIR, `${pair.slug}.json`);
  fs.writeFileSync(outFile, JSON.stringify(essay, null, 2), 'utf-8');

  progress.completed[pair.slug] = true;
  progress.totalGenerated++;
  progress.totalCost += cost;
  saveProgress(progress);

  console.log(`  [OK] ${pair.slug} saved ($${cost.toFixed(4)})`);
}

async function processBatch(
  client: OpenAI,
  pairs: ComparisonPair[],
  concurrency: number,
  force: boolean,
  dryRun: boolean,
): Promise<void> {
  const progress = loadProgress();

  console.log(`\nVerse Comparison Essay Generation`);
  console.log(`Total pairs: ${pairs.length}`);
  console.log(`Already done: ${Object.keys(progress.completed).length}`);
  console.log(`Concurrency: ${concurrency}`);
  console.log(`Force: ${force}`);
  console.log(`Dry run: ${dryRun}`);
  console.log(`Total cost so far: $${progress.totalCost.toFixed(4)}\n`);

  let idx = 0;
  const total = pairs.length;

  async function worker(): Promise<void> {
    while (idx < total) {
      const i = idx++;
      const pair = pairs[i];
      try {
        await processEntry(client, progress, pair, force, dryRun);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`  [FAIL] ${pair.slug}: ${msg}`);
      }
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  if (!dryRun) {
    fs.writeFileSync(MANIFEST_FILE, JSON.stringify(pairs, null, 2), 'utf-8');
  }

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
  npx tsx scripts/generate-verse-comparisons-ai.ts --all

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
    console.error('Only --all is supported (curates pairs from the fixed 100-verse popular list)');
    process.exit(1);
  }

  const pairs = buildPairs();
  await processBatch(client, pairs, concurrency, force, dryRun);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
