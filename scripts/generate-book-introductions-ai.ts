#!/usr/bin/env npx tsx
/**
 * AI-Powered Bible Book Introduction Rewriter using OpenAI GPT-4.1-mini
 *
 * The data/kjvstudy/books/*.json files are a verbatim mirror of kjvstudy.org's
 * own book-introduction content. This script uses that content only as
 * reference material and asks GPT-4.1-mini to rewrite every prose field in
 * original wording (same facts, structure, and theology, fresh phrasing),
 * so our /books/[book] pages never serve duplicate text. Scripture quotations
 * in key_verses are left untouched (exact KJV wording, not kjvstudy's prose).
 *
 * Usage:
 *   npx tsx scripts/generate-book-introductions-ai.ts --book genesis
 *   npx tsx scripts/generate-book-introductions-ai.ts --all
 *   npx tsx scripts/generate-book-introductions-ai.ts --all --concurrency 3
 *   npx tsx scripts/generate-book-introductions-ai.ts --all --force
 *   npx tsx scripts/generate-book-introductions-ai.ts --book genesis --dry-run
 */

import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';

// =============================================================================
// TYPES
// =============================================================================

interface RawBookData {
  name: string;
  abbreviation?: string;
  testament?: string;
  position?: number;
  chapters?: number;
  category?: string;
  author?: string;
  date_written?: string;
  introduction: string;
  outline: { section: string; chapters: string; description: string }[];
  key_themes: { theme: string; description: string }[];
  key_verses: { reference: string; text: string }[];
  historical_context: string;
  literary_style: string;
  theological_significance: string;
  christ_in_book: string;
  relationship_to_new_testament: string;
  practical_application: string;
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
const SOURCE_DIR = path.resolve(SCRIPT_DIR, '..', 'data', 'kjvstudy', 'books');
const OUTPUT_DIR = path.resolve(SCRIPT_DIR, '..', 'data', 'book-introductions');
const PROGRESS_FILE = path.join(OUTPUT_DIR, '.progress.json');

const OPENAI_RATE_LIMIT_MS = 300;
const OPENAI_TIMEOUT_MS = 180000;
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

function slugFromFile(file: string): string {
  return file.replace('.json', '').replace(/_/g, '-');
}

function listSourceBooks(): Array<{ slug: string; file: string }> {
  return fs.readdirSync(SOURCE_DIR)
    .filter(f => f.endsWith('.json'))
    .map(file => ({ slug: slugFromFile(file), file }));
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
// PROMPT
// =============================================================================

function buildPrompt(raw: RawBookData): string {
  const source = {
    introduction: raw.introduction,
    outline: raw.outline,
    key_themes: raw.key_themes,
    historical_context: raw.historical_context,
    literary_style: raw.literary_style,
    theological_significance: raw.theological_significance,
    christ_in_book: raw.christ_in_book,
    relationship_to_new_testament: raw.relationship_to_new_testament,
    practical_application: raw.practical_application,
  };

  return `You are a Bible scholar rewriting a book-introduction article about ${raw.name} for a new study site. Below is REFERENCE MATERIAL covering the same facts, structure, and theological content you must preserve. Do not copy its sentences or phrasing - rewrite every field in your own original words, same length and depth as the reference, same evangelical/conservative theological stance.

REFERENCE MATERIAL (JSON):
${JSON.stringify(source, null, 2)}

Return ONLY valid JSON with exactly these keys, each rewritten in fresh wording:
{
  "introduction": "Rewritten multi-paragraph introduction, same length and paragraph count as the reference introduction",
  "outline": [ { "section": "Section name (may keep or lightly rephrase)", "chapters": "EXACT same chapter range as reference - do not change", "description": "Rewritten description, same depth as reference" } ],
  "key_themes": [ { "theme": "Theme name (may keep or lightly rephrase)", "description": "Rewritten description, same depth as reference" } ],
  "historical_context": "Rewritten, same length as reference",
  "literary_style": "Rewritten, same length as reference",
  "theological_significance": "Rewritten, same length as reference",
  "christ_in_book": "Rewritten, same length as reference",
  "relationship_to_new_testament": "Rewritten, same length as reference",
  "practical_application": "Rewritten, same length as reference"
}

REQUIREMENTS:
- Preserve every fact, named person, place, number, and theological claim from the reference.
- outline must have the exact same number of items as the reference, in the same order, with identical "chapters" ranges.
- key_themes must have the exact same number of items as the reference, in the same order.
- Do not include social justice framing, environmental activism, or sensitivity-training language.
- Do not use "inherent worth/dignity" phrasing or modern political framing.
- Write from a conservative, evangelical perspective grounded in the biblical text.`;
}

// =============================================================================
// AI GENERATION
// =============================================================================

async function generateBookIntroduction(
  client: OpenAI,
  raw: RawBookData,
): Promise<{ data: RawBookData; cost: number }> {
  const prompt = buildPrompt(raw);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`  Calling GPT-4.1-mini for ${raw.name} (attempt ${attempt})...`);
      const response = await client.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: 'You are a Bible scholar. Return ONLY valid JSON, no markdown, no code fences.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.4,
        max_tokens: 16000,
        response_format: { type: 'json_object' },
      }, { timeout: OPENAI_TIMEOUT_MS });

      const content = response.choices[0]?.message?.content?.trim();
      if (!content) throw new Error('Empty API response');

      const parsed = JSON.parse(content);

      if (!parsed.introduction || !Array.isArray(parsed.outline) || parsed.outline.length !== raw.outline.length) {
        throw new Error('Response missing fields or outline length mismatch');
      }
      if (!Array.isArray(parsed.key_themes) || parsed.key_themes.length !== raw.key_themes.length) {
        throw new Error('key_themes length mismatch');
      }

      const inputTokens = response.usage?.prompt_tokens || 0;
      const outputTokens = response.usage?.completion_tokens || 0;
      const cost = (inputTokens * INPUT_COST_PER_1M / 1_000_000) + (outputTokens * OUTPUT_COST_PER_1M / 1_000_000);

      const data: RawBookData = {
        ...raw,
        introduction: parsed.introduction,
        outline: raw.outline.map((o, i) => ({
          section: parsed.outline[i]?.section || o.section,
          chapters: o.chapters,
          description: parsed.outline[i]?.description || o.description,
        })),
        key_themes: raw.key_themes.map((t, i) => ({
          theme: parsed.key_themes[i]?.theme || t.theme,
          description: parsed.key_themes[i]?.description || t.description,
        })),
        key_verses: raw.key_verses,
        historical_context: parsed.historical_context || raw.historical_context,
        literary_style: parsed.literary_style || raw.literary_style,
        theological_significance: parsed.theological_significance || raw.theological_significance,
        christ_in_book: parsed.christ_in_book || raw.christ_in_book,
        relationship_to_new_testament: parsed.relationship_to_new_testament || raw.relationship_to_new_testament,
        practical_application: parsed.practical_application || raw.practical_application,
      };

      await sleep(OPENAI_RATE_LIMIT_MS);
      return { data, cost };
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

async function processBook(
  client: OpenAI,
  progress: ProgressData,
  slug: string,
  file: string,
  force: boolean,
  dryRun: boolean,
): Promise<void> {
  if (!force && progress.completed[slug]) {
    console.log(`  [SKIP] ${slug} (already generated)`);
    return;
  }

  if (dryRun) {
    console.log(`  [DRY-RUN] Would generate ${slug}`);
    return;
  }

  const raw: RawBookData = JSON.parse(fs.readFileSync(path.join(SOURCE_DIR, file), 'utf-8'));

  console.log(`\n[GEN] ${raw.name} (${slug})...`);
  const { data, cost } = await generateBookIntroduction(client, raw);

  const outFile = path.join(OUTPUT_DIR, `${slug}.json`);
  fs.writeFileSync(outFile, JSON.stringify(data, null, 2), 'utf-8');

  progress.completed[slug] = true;
  progress.totalGenerated++;
  progress.totalCost += cost;
  saveProgress(progress);

  console.log(`  [OK] ${slug} saved ($${cost.toFixed(4)})`);
}

async function processBatch(
  client: OpenAI,
  books: Array<{ slug: string; file: string }>,
  concurrency: number,
  force: boolean,
  dryRun: boolean,
): Promise<void> {
  const progress = loadProgress();

  console.log(`\nBook Introduction Rewrite`);
  console.log(`Total books: ${books.length}`);
  console.log(`Already done: ${Object.keys(progress.completed).length}`);
  console.log(`Concurrency: ${concurrency}`);
  console.log(`Force: ${force}`);
  console.log(`Dry run: ${dryRun}`);
  console.log(`Total cost so far: $${progress.totalCost.toFixed(4)}\n`);

  let idx = 0;
  const total = books.length;

  async function worker(): Promise<void> {
    while (idx < total) {
      const i = idx++;
      const { slug, file } = books[i];
      try {
        await processBook(client, progress, slug, file, force, dryRun);
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
  npx tsx scripts/generate-book-introductions-ai.ts --book <slug>
  npx tsx scripts/generate-book-introductions-ai.ts --all

Options:
  --concurrency <n>   Parallel workers (default: 3)
  --force             Regenerate even if already completed
  --dry-run           Show what would be generated without calling API
`);
    process.exit(0);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('Error: OPENAI_API_KEY environment variable is required');
    process.exit(1);
  }

  const client = new OpenAI({ apiKey });
  const force = args.includes('--force');
  const dryRun = args.includes('--dry-run');
  const concurrencyIdx = args.indexOf('--concurrency');
  const concurrency = concurrencyIdx !== -1 ? parseInt(args[concurrencyIdx + 1]) || 3 : 3;

  const allBooks = listSourceBooks();
  let books: Array<{ slug: string; file: string }> = [];

  if (args.includes('--book')) {
    const i = args.indexOf('--book');
    const slug = args[i + 1];
    const found = allBooks.find(b => b.slug === slug);
    if (!found) { console.error(`Unknown book: ${slug}`); process.exit(1); }
    books = [found];
  } else if (args.includes('--all')) {
    books = allBooks;
  }

  if (books.length === 0) {
    console.error('No books specified');
    process.exit(1);
  }

  await processBatch(client, books, concurrency, force, dryRun);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
