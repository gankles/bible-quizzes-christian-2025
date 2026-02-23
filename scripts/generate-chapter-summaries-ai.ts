#!/usr/bin/env npx tsx
/**
 * AI-Powered Bible Chapter Summary Generator using OpenAI GPT-4.1-mini
 *
 * Generates rich chapter-level study content for all 1,189 Bible chapters:
 * - Short summary (2-3 sentences)
 * - Timeline / historical period
 * - Key characters with descriptions
 * - Key terms/definitions
 * - Detailed outline with verse ranges
 * - Practical application points
 * - Key verses with text
 *
 * Usage:
 *   npx tsx scripts/generate-chapter-summaries-ai.ts --chapter genesis 1
 *   npx tsx scripts/generate-chapter-summaries-ai.ts --range genesis 1 50
 *   npx tsx scripts/generate-chapter-summaries-ai.ts --book genesis
 *   npx tsx scripts/generate-chapter-summaries-ai.ts --all
 *   npx tsx scripts/generate-chapter-summaries-ai.ts --all --concurrency 5
 *   npx tsx scripts/generate-chapter-summaries-ai.ts --all --force
 *   npx tsx scripts/generate-chapter-summaries-ai.ts --chapter genesis 1 --dry-run
 */

import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';

// =============================================================================
// TYPES
// =============================================================================

interface ChapterSummaryData {
  book: string;
  bookName: string;
  chapter: number;
  title: string;
  shortSummary: string;
  timeline: string;
  keyCharacters: Array<{ name: string; description: string }>;
  definitions: Array<{ term: string; definition: string }>;
  outline: Array<{
    heading: string;
    verseRange: string;
    description: string;
  }>;
  application: string[];
  keyVerses: Array<{ reference: string; text: string; significance: string }>;
}

interface ProgressData {
  completed: Record<string, boolean>;
  lastUpdated: string;
  totalGenerated: number;
  totalCost: number;
}

interface BollsVerse {
  pk: number;
  verse: number;
  text: string;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const OUTPUT_DIR = path.resolve(SCRIPT_DIR, '..', 'data', 'chapter-summaries');
const PROGRESS_FILE = path.join(OUTPUT_DIR, '.progress.json');
const BASE_URL = 'https://bolls.life';

const BOLLS_RATE_LIMIT_MS = 500;
const OPENAI_RATE_LIMIT_MS = 200;
const FETCH_TIMEOUT_MS = 15000;
const OPENAI_TIMEOUT_MS = 90000;
const MAX_RETRIES = 3;

// GPT-4.1-mini pricing (per 1M tokens)
const INPUT_COST_PER_1M = 0.40;
const OUTPUT_COST_PER_1M = 1.60;

const BOOK_IDS: Record<string, number> = {
  'genesis': 1, 'exodus': 2, 'leviticus': 3, 'numbers': 4, 'deuteronomy': 5,
  'joshua': 6, 'judges': 7, 'ruth': 8, '1-samuel': 9, '2-samuel': 10,
  '1-kings': 11, '2-kings': 12, '1-chronicles': 13, '2-chronicles': 14,
  'ezra': 15, 'nehemiah': 16, 'esther': 17, 'job': 18, 'psalms': 19, 'psalm': 19,
  'proverbs': 20, 'ecclesiastes': 21, 'song-of-solomon': 22, 'isaiah': 23,
  'jeremiah': 24, 'lamentations': 25, 'ezekiel': 26, 'daniel': 27,
  'hosea': 28, 'joel': 29, 'amos': 30, 'obadiah': 31, 'jonah': 32,
  'micah': 33, 'nahum': 34, 'habakkuk': 35, 'zephaniah': 36, 'haggai': 37,
  'zechariah': 38, 'malachi': 39,
  'matthew': 40, 'mark': 41, 'luke': 42, 'john': 43, 'acts': 44,
  'romans': 45, '1-corinthians': 46, '2-corinthians': 47, 'galatians': 48,
  'ephesians': 49, 'philippians': 50, 'colossians': 51, '1-thessalonians': 52,
  '2-thessalonians': 53, '1-timothy': 54, '2-timothy': 55, 'titus': 56,
  'philemon': 57, 'hebrews': 58, 'james': 59, '1-peter': 60, '2-peter': 61,
  '1-john': 62, '2-john': 63, '3-john': 64, 'jude': 65, 'revelation': 66,
};

const BOOK_NAMES: Record<string, string> = {
  'genesis': 'Genesis', 'exodus': 'Exodus', 'leviticus': 'Leviticus',
  'numbers': 'Numbers', 'deuteronomy': 'Deuteronomy', 'joshua': 'Joshua',
  'judges': 'Judges', 'ruth': 'Ruth', '1-samuel': '1 Samuel', '2-samuel': '2 Samuel',
  '1-kings': '1 Kings', '2-kings': '2 Kings', '1-chronicles': '1 Chronicles',
  '2-chronicles': '2 Chronicles', 'ezra': 'Ezra', 'nehemiah': 'Nehemiah',
  'esther': 'Esther', 'job': 'Job', 'psalms': 'Psalms', 'proverbs': 'Proverbs',
  'ecclesiastes': 'Ecclesiastes', 'song-of-solomon': 'Song of Solomon',
  'isaiah': 'Isaiah', 'jeremiah': 'Jeremiah', 'lamentations': 'Lamentations',
  'ezekiel': 'Ezekiel', 'daniel': 'Daniel', 'hosea': 'Hosea', 'joel': 'Joel',
  'amos': 'Amos', 'obadiah': 'Obadiah', 'jonah': 'Jonah', 'micah': 'Micah',
  'nahum': 'Nahum', 'habakkuk': 'Habakkuk', 'zephaniah': 'Zephaniah',
  'haggai': 'Haggai', 'zechariah': 'Zechariah', 'malachi': 'Malachi',
  'matthew': 'Matthew', 'mark': 'Mark', 'luke': 'Luke', 'john': 'John',
  'acts': 'Acts', 'romans': 'Romans', '1-corinthians': '1 Corinthians',
  '2-corinthians': '2 Corinthians', 'galatians': 'Galatians', 'ephesians': 'Ephesians',
  'philippians': 'Philippians', 'colossians': 'Colossians',
  '1-thessalonians': '1 Thessalonians', '2-thessalonians': '2 Thessalonians',
  '1-timothy': '1 Timothy', '2-timothy': '2 Timothy', 'titus': 'Titus',
  'philemon': 'Philemon', 'hebrews': 'Hebrews', 'james': 'James',
  '1-peter': '1 Peter', '2-peter': '2 Peter', '1-john': '1 John',
  '2-john': '2 John', '3-john': '3 John', 'jude': 'Jude', 'revelation': 'Revelation',
};

const BOOK_CHAPTERS: Record<string, number> = {
  'genesis': 50, 'exodus': 40, 'leviticus': 27, 'numbers': 36, 'deuteronomy': 34,
  'joshua': 24, 'judges': 21, 'ruth': 4, '1-samuel': 31, '2-samuel': 24,
  '1-kings': 22, '2-kings': 25, '1-chronicles': 29, '2-chronicles': 36,
  'ezra': 10, 'nehemiah': 13, 'esther': 10, 'job': 42, 'psalms': 150,
  'proverbs': 31, 'ecclesiastes': 12, 'song-of-solomon': 8, 'isaiah': 66,
  'jeremiah': 52, 'lamentations': 5, 'ezekiel': 48, 'daniel': 12,
  'hosea': 14, 'joel': 3, 'amos': 9, 'obadiah': 1, 'jonah': 4,
  'micah': 7, 'nahum': 3, 'habakkuk': 3, 'zephaniah': 3, 'haggai': 2,
  'zechariah': 14, 'malachi': 4,
  'matthew': 28, 'mark': 16, 'luke': 24, 'john': 21, 'acts': 28,
  'romans': 16, '1-corinthians': 16, '2-corinthians': 13, 'galatians': 6,
  'ephesians': 6, 'philippians': 4, 'colossians': 4, '1-thessalonians': 5,
  '2-thessalonians': 3, '1-timothy': 6, '2-timothy': 4, 'titus': 3,
  'philemon': 1, 'hebrews': 13, 'james': 5, '1-peter': 5, '2-peter': 3,
  '1-john': 5, '2-john': 1, '3-john': 1, 'jude': 1, 'revelation': 22,
};

// =============================================================================
// HELPERS
// =============================================================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function stripHtml(html: string): string {
  return html
    .replace(/<S>\d+<\/S>/g, '')
    .replace(/<sup>.*?<\/sup>/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
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

function isCompleted(progress: ProgressData, bookSlug: string, chapter: number): boolean {
  return !!progress.completed[`${bookSlug}-${chapter}`];
}

function markCompleted(progress: ProgressData, bookSlug: string, chapter: number, cost: number): void {
  progress.completed[`${bookSlug}-${chapter}`] = true;
  progress.totalGenerated++;
  progress.totalCost += cost;
}

// =============================================================================
// BIBLE TEXT FETCHING (Bolls.life API)
// =============================================================================

async function fetchChapterText(bookSlug: string, chapter: number): Promise<string> {
  const bookId = BOOK_IDS[bookSlug];
  if (!bookId) throw new Error(`Unknown book: ${bookSlug}`);

  const url = `${BASE_URL}/get-text/KJV/${bookId}/${chapter}/`;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);

      if (response.status === 429) {
        const backoff = 2000 * attempt;
        console.warn(`  Rate limited by Bolls.life, waiting ${backoff}ms...`);
        await sleep(backoff);
        continue;
      }

      if (!response.ok) {
        if (response.status >= 500 && attempt < MAX_RETRIES) {
          await sleep(2000 * attempt);
          continue;
        }
        throw new Error(`Bolls.life API error ${response.status}: ${url}`);
      }

      const verses: BollsVerse[] = await response.json();
      if (!Array.isArray(verses) || verses.length === 0) {
        throw new Error(`Empty response for ${bookSlug} ${chapter}`);
      }

      const bookName = BOOK_NAMES[bookSlug] || capitalize(bookSlug);
      const lines = verses.map(v => `${bookName} ${chapter}:${v.verse} - ${stripHtml(v.text)}`);
      return lines.join('\n');
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        if (attempt < MAX_RETRIES) { await sleep(2000); continue; }
        throw new Error(`Fetch timeout for ${bookSlug} ${chapter}`);
      }
      if (attempt >= MAX_RETRIES) throw err;
      await sleep(2000 * attempt);
    }
  }

  throw new Error(`Failed after ${MAX_RETRIES} retries: ${bookSlug} ${chapter}`);
}

// =============================================================================
// PROMPT
// =============================================================================

function buildPrompt(bookName: string, chapter: number, chapterText: string): string {
  return `You are a Bible scholar creating a rich chapter study guide for ${bookName} Chapter ${chapter}.

CHAPTER TEXT (KJV):
${chapterText}

Generate a comprehensive study guide for this chapter. Return ONLY valid JSON in this exact format:

{
  "title": "Short title for this chapter (2-4 words, e.g. 'The Creation', 'Cain and Abel')",
  "shortSummary": "A 2-3 sentence overview of the chapter's content and significance. Written in engaging, accessible prose.",
  "timeline": "Historical time period (e.g. 'c. 4000 BC - Creation', 'c. 1446 BC - The Exodus', 'c. AD 57 - Paul's Third Missionary Journey'). Be specific where possible.",
  "keyCharacters": [
    { "name": "Character Name", "description": "Brief description of who they are and their role in this chapter (1-2 sentences)" }
  ],
  "definitions": [
    { "term": "Term", "definition": "Clear, concise definition relevant to understanding this chapter" }
  ],
  "outline": [
    { "heading": "Section heading", "verseRange": "${bookName} ${chapter}:1-5", "description": "2-3 sentence description of what happens in this section and its theological significance." }
  ],
  "application": [
    "Practical application point 1 (1-2 sentences, specific and actionable for Christian living)",
    "Practical application point 2",
    "Practical application point 3"
  ],
  "keyVerses": [
    { "reference": "${bookName} ${chapter}:verse", "text": "Exact KJV text of the verse", "significance": "Why this verse matters (1 sentence)" }
  ]
}

REQUIREMENTS:
- keyCharacters: 2-5 characters (only include people actually present/mentioned in this chapter, not God unless He speaks or acts directly)
- definitions: 2-5 terms (archaic KJV words, theological concepts, or cultural terms a modern reader would benefit from understanding)
- outline: 3-6 sections that cover the entire chapter, with accurate verse ranges
- application: 3-4 points focused on traditional Christian faith, prayer, obedience, and biblical wisdom
- keyVerses: 2-4 of the most important/memorable verses from this chapter, with EXACT KJV text
- All verse references must be from this chapter
- Do NOT include social justice framing, environmental activism, or sensitivity-training language
- Write from a conservative, evangelical perspective grounded in the biblical text`;
}

// =============================================================================
// AI GENERATION
// =============================================================================

async function generateChapterSummary(
  client: OpenAI,
  bookSlug: string,
  chapter: number
): Promise<{ data: ChapterSummaryData; cost: number }> {
  const bookName = BOOK_NAMES[bookSlug];
  if (!bookName) throw new Error(`Unknown book slug: ${bookSlug}`);

  // Fetch chapter text
  console.log(`  Fetching ${bookName} ${chapter} text...`);
  const chapterText = await fetchChapterText(bookSlug, chapter);
  await sleep(BOLLS_RATE_LIMIT_MS);

  const prompt = buildPrompt(bookName, chapter, chapterText);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`  Calling GPT-4.1-mini (attempt ${attempt})...`);
      const response = await client.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: 'You are a Bible scholar. Return ONLY valid JSON, no markdown, no code fences.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 3000,
      }, { timeout: OPENAI_TIMEOUT_MS });

      const content = response.choices[0]?.message?.content?.trim();
      if (!content) throw new Error('Empty API response');

      // Strip markdown fences if present
      const jsonStr = content.replace(/^```json?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();

      const parsed = JSON.parse(jsonStr);

      // Calculate cost
      const inputTokens = response.usage?.prompt_tokens || 0;
      const outputTokens = response.usage?.completion_tokens || 0;
      const cost = (inputTokens * INPUT_COST_PER_1M / 1_000_000) + (outputTokens * OUTPUT_COST_PER_1M / 1_000_000);

      // Build the full data object
      const data: ChapterSummaryData = {
        book: bookSlug,
        bookName,
        chapter,
        title: parsed.title || '',
        shortSummary: parsed.shortSummary || '',
        timeline: parsed.timeline || '',
        keyCharacters: Array.isArray(parsed.keyCharacters) ? parsed.keyCharacters : [],
        definitions: Array.isArray(parsed.definitions) ? parsed.definitions : [],
        outline: Array.isArray(parsed.outline) ? parsed.outline : [],
        application: Array.isArray(parsed.application) ? parsed.application : [],
        keyVerses: Array.isArray(parsed.keyVerses) ? parsed.keyVerses : [],
      };

      // Validation
      if (!data.title || !data.shortSummary || data.outline.length === 0) {
        throw new Error('Missing required fields in response');
      }

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

async function processChapter(
  client: OpenAI,
  progress: ProgressData,
  bookSlug: string,
  chapter: number,
  force: boolean,
  dryRun: boolean,
): Promise<void> {
  const key = `${bookSlug}-${chapter}`;
  const bookName = BOOK_NAMES[bookSlug];

  if (!force && isCompleted(progress, bookSlug, chapter)) {
    console.log(`  [SKIP] ${bookName} ${chapter} (already generated)`);
    return;
  }

  if (dryRun) {
    console.log(`  [DRY-RUN] Would generate ${bookName} ${chapter}`);
    return;
  }

  console.log(`\n[GEN] ${bookName} ${chapter}...`);

  const { data, cost } = await generateChapterSummary(client, bookSlug, chapter);

  // Save to file
  const outFile = path.join(OUTPUT_DIR, `${key}.json`);
  fs.writeFileSync(outFile, JSON.stringify(data, null, 2), 'utf-8');

  markCompleted(progress, bookSlug, chapter, cost);
  saveProgress(progress);

  console.log(`  [OK] ${bookName} ${chapter} saved ($${cost.toFixed(4)})`);
}

async function processBatch(
  client: OpenAI,
  chapters: Array<{ bookSlug: string; chapter: number }>,
  concurrency: number,
  force: boolean,
  dryRun: boolean,
): Promise<void> {
  const progress = loadProgress();

  console.log(`\nChapter Summary Generation`);
  console.log(`Total chapters: ${chapters.length}`);
  console.log(`Already done: ${Object.keys(progress.completed).length}`);
  console.log(`Concurrency: ${concurrency}`);
  console.log(`Force: ${force}`);
  console.log(`Dry run: ${dryRun}`);
  console.log(`Total cost so far: $${progress.totalCost.toFixed(4)}\n`);

  // Process with concurrency limiter
  let idx = 0;
  const total = chapters.length;

  async function worker(): Promise<void> {
    while (idx < total) {
      const i = idx++;
      const { bookSlug, chapter } = chapters[i];
      try {
        await processChapter(client, progress, bookSlug, chapter, force, dryRun);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`  [FAIL] ${bookSlug} ${chapter}: ${msg}`);
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
  npx tsx scripts/generate-chapter-summaries-ai.ts --chapter <book> <chapter>
  npx tsx scripts/generate-chapter-summaries-ai.ts --range <book> <start> <end>
  npx tsx scripts/generate-chapter-summaries-ai.ts --book <book>
  npx tsx scripts/generate-chapter-summaries-ai.ts --all

Options:
  --concurrency <n>   Parallel workers (default: 3)
  --force             Regenerate even if already completed
  --dry-run           Show what would be generated without calling API
`);
    process.exit(0);
  }

  // Ensure output directory exists
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

  let chapters: Array<{ bookSlug: string; chapter: number }> = [];

  if (args.includes('--chapter')) {
    const i = args.indexOf('--chapter');
    const bookSlug = args[i + 1];
    const ch = parseInt(args[i + 2]);
    if (!BOOK_NAMES[bookSlug]) { console.error(`Unknown book: ${bookSlug}`); process.exit(1); }
    chapters = [{ bookSlug, chapter: ch }];
  } else if (args.includes('--range')) {
    const i = args.indexOf('--range');
    const bookSlug = args[i + 1];
    const start = parseInt(args[i + 2]);
    const end = parseInt(args[i + 3]);
    if (!BOOK_NAMES[bookSlug]) { console.error(`Unknown book: ${bookSlug}`); process.exit(1); }
    for (let ch = start; ch <= end; ch++) {
      chapters.push({ bookSlug, chapter: ch });
    }
  } else if (args.includes('--book')) {
    const i = args.indexOf('--book');
    const bookSlug = args[i + 1];
    if (!BOOK_CHAPTERS[bookSlug]) { console.error(`Unknown book: ${bookSlug}`); process.exit(1); }
    const total = BOOK_CHAPTERS[bookSlug];
    for (let ch = 1; ch <= total; ch++) {
      chapters.push({ bookSlug, chapter: ch });
    }
  } else if (args.includes('--all')) {
    for (const [bookSlug, total] of Object.entries(BOOK_CHAPTERS)) {
      for (let ch = 1; ch <= total; ch++) {
        chapters.push({ bookSlug, chapter: ch });
      }
    }
  }

  if (chapters.length === 0) {
    console.error('No chapters specified');
    process.exit(1);
  }

  await processBatch(client, chapters, concurrency, force, dryRun);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
