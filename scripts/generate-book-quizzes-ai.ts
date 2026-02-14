#!/usr/bin/env npx tsx
/**
 * AI-Powered Bible BOOK Quiz Generator using OpenAI GPT-4.1-mini
 *
 * Generates 25-question comprehensive quizzes covering an entire book.
 * Distribution: 70% Multiple Choice (17-18), 20% True/False (5), 10% Fill-in-blank (2-3)
 *
 * Usage:
 *   npx tsx scripts/generate-book-quizzes-ai.ts --book genesis
 *   npx tsx scripts/generate-book-quizzes-ai.ts --all
 *   npx tsx scripts/generate-book-quizzes-ai.ts --all --concurrency 5
 */

import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';

// =============================================================================
// TYPES
// =============================================================================

interface AIQuestion {
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options: string[];
  correctAnswer: string;
  explanation: string;
  verseReference: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  verseReference: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface BookQuiz {
  id: string;
  title: string;
  description: string;
  type: 'book';
  book: string;
  questions: QuizQuestion[];
  difficulty: 'medium';
  isBookQuiz: true;
  slug: string;
  tags: string[];
  totalQuestions: number;
  estimatedTime: number;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const OUTPUT_DIR = path.resolve(SCRIPT_DIR, '..', 'data', 'quizzes');
const PROGRESS_FILE = path.join(OUTPUT_DIR, '.book-quiz-progress.json');
const BASE_URL = 'https://bolls.life';

const OPENAI_TIMEOUT_MS = 90000;
const MAX_RETRIES = 3;
const FETCH_TIMEOUT_MS = 15000;

const INPUT_COST_PER_1M = 0.40;
const OUTPUT_COST_PER_1M = 1.60;

const BOOK_IDS: Record<string, number> = {
  'genesis': 1, 'exodus': 2, 'leviticus': 3, 'numbers': 4, 'deuteronomy': 5,
  'joshua': 6, 'judges': 7, 'ruth': 8, '1-samuel': 9, '2-samuel': 10,
  '1-kings': 11, '2-kings': 12, '1-chronicles': 13, '2-chronicles': 14,
  'ezra': 15, 'nehemiah': 16, 'esther': 17, 'job': 18, 'psalms': 19,
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

const ALL_BOOKS = Object.keys(BOOK_IDS);

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

// =============================================================================
// PROGRESS TRACKING
// =============================================================================

interface ProgressData {
  completed: Record<string, boolean>;
  lastUpdated: string;
  totalGenerated: number;
  totalCost: number;
}

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
// BIBLE TEXT FETCHING - sample key chapters
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
        await sleep(2000 * attempt);
        continue;
      }
      if (!response.ok) {
        if (attempt < MAX_RETRIES) { await sleep(2000 * attempt); continue; }
        throw new Error(`Bolls.life API error ${response.status}`);
      }

      const verses: { verse: number; text: string }[] = await response.json();
      return verses.map(v => `${v.verse}. ${stripHtml(v.text)}`).join('\n');
    } catch (err: any) {
      if (attempt === MAX_RETRIES) throw err;
      await sleep(2000 * attempt);
    }
  }
  throw new Error('Failed after retries');
}

/**
 * Pick a spread of key chapters to give GPT context for the whole book.
 * For short books (<=5 ch), fetch all. For longer books, sample ~5 key chapters.
 */
function pickSampleChapters(bookSlug: string): number[] {
  const total = BOOK_CHAPTERS[bookSlug] || 1;
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  // First, last, and 3 evenly spaced in between
  const chapters = [1];
  const step = Math.floor((total - 1) / 4);
  for (let i = 1; i <= 3; i++) {
    chapters.push(1 + step * i);
  }
  chapters.push(total);
  return [...new Set(chapters)];
}

async function fetchBookSampleText(bookSlug: string): Promise<string> {
  const chapters = pickSampleChapters(bookSlug);
  const bookName = BOOK_NAMES[bookSlug];
  const texts: string[] = [];

  for (const ch of chapters) {
    try {
      const text = await fetchChapterText(bookSlug, ch);
      // Truncate each chapter to ~40 verses worth to keep prompt manageable
      const lines = text.split('\n').slice(0, 40);
      texts.push(`--- ${bookName} Chapter ${ch} ---\n${lines.join('\n')}`);
      await sleep(300);
    } catch {
      // Skip chapters that fail to fetch
    }
  }

  return texts.join('\n\n');
}

// =============================================================================
// OPENAI QUIZ GENERATION
// =============================================================================

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateBookQuiz(bookSlug: string, sampleText: string): Promise<{ questions: AIQuestion[]; inputTokens: number; outputTokens: number; cost: number }> {
  const bookName = BOOK_NAMES[bookSlug];
  const totalChapters = BOOK_CHAPTERS[bookSlug];

  const prompt = `You are a Bible scholar creating a comprehensive quiz for the entire book of ${bookName} (${totalChapters} chapters).

Generate exactly 45 questions covering the ENTIRE book - key events, people, places, teachings, and themes from across ALL major sections of the book. Spread questions across different chapters.

Question distribution (STRICT):
- 32 multiple-choice questions (each with exactly 4 options)
- 9 true-false questions (correctAnswer must be exactly "true" or "false")
- 4 fill-blank questions (correctAnswer is one word or short phrase; options should contain 4 choices including the answer)

Mix difficulties: roughly 15 easy, 18 medium, 12 hard.

Rules:
- Every question MUST have a verseReference like "${bookName} 3:16"
- Spread questions across different chapters of the book
- Include questions about: key characters, major events, important teachings, memorable verses, and themes
- For true-false: correctAnswer must be exactly "true" or "false"
- For fill-blank: frame as "Complete this verse: ..." or fill-in-the-blank format
- All answers must be KJV-accurate

Here is sample text from the book for reference:
${sampleText.slice(0, 12000)}

Return a JSON object with a "questions" key containing an array of 45 question objects:
{"questions": [
  {
    "question": "...",
    "type": "multiple-choice",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "A",
    "explanation": "...",
    "verseReference": "${bookName} 1:1"
  }
]}`;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: 'You are a Bible quiz generator. Always respond with valid JSON containing a "questions" array. Generate all requested questions.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 16000,
        response_format: { type: 'json_object' },
      });

      const content = response.choices[0]?.message?.content || '{}';
      const inputTokens = response.usage?.prompt_tokens || 0;
      const outputTokens = response.usage?.completion_tokens || 0;
      const cost = (inputTokens * INPUT_COST_PER_1M + outputTokens * OUTPUT_COST_PER_1M) / 1_000_000;

      let parsed: any;
      try {
        parsed = JSON.parse(content);
      } catch {
        if (attempt < MAX_RETRIES) { await sleep(2000); continue; }
        throw new Error('Failed to parse JSON');
      }

      let questions: AIQuestion[] = parsed.questions || parsed.quiz || (Array.isArray(parsed) ? parsed : []);

      // Auto-normalize common GPT mistakes
      for (const q of questions) {
        if ((q.type as string) === 'fill-in-the-blank') q.type = 'fill-blank';
        if ((q.type as string) === 'true/false') q.type = 'true-false';
      }

      // Trim to 45 if GPT returned extra
      if (questions.length > 45) questions = questions.slice(0, 45);

      if (questions.length >= 40) {
        return { questions, inputTokens, outputTokens, cost };
      }

      if (attempt < MAX_RETRIES) {
        await sleep(2000);
        continue;
      }

      return { questions, inputTokens, outputTokens, cost };
    } catch (err: any) {
      if (attempt === MAX_RETRIES) throw err;
      await sleep(3000 * attempt);
    }
  }
  throw new Error('Failed after retries');
}

// =============================================================================
// MAIN GENERATION
// =============================================================================

async function generateAndSaveBookQuiz(bookSlug: string): Promise<number> {
  const bookName = BOOK_NAMES[bookSlug];
  const startTime = Date.now();

  console.log(`  Fetching sample chapters for ${bookName}...`);
  const sampleText = await fetchBookSampleText(bookSlug);

  console.log(`  Generating 45-question book quiz...`);
  const { questions, inputTokens, outputTokens, cost } = await generateBookQuiz(bookSlug, sampleText);

  // Build quiz object
  const quizQuestions: QuizQuestion[] = questions.map((q, i) => ({
    id: `${bookSlug}-bq-${i + 1}`,
    question: q.question,
    type: q.type,
    ...(q.type !== 'true-false' && q.options?.length ? { options: q.options } : {}),
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    verseReference: q.verseReference,
    difficulty: i < 15 ? 'easy' as const : i < 33 ? 'medium' as const : 'hard' as const,
  }));

  const quiz: BookQuiz = {
    id: `${bookSlug}-book-quiz`,
    title: `${bookName} Quiz - Complete Book`,
    description: `Test your comprehensive knowledge of the entire book of ${bookName} with 25 questions covering key events, people, and teachings from all ${BOOK_CHAPTERS[bookSlug]} chapters.`,
    type: 'book',
    book: bookName,
    questions: quizQuestions,
    difficulty: 'medium',
    isBookQuiz: true,
    slug: `${bookSlug}-quiz`,
    tags: [bookSlug, bookName.toLowerCase(), 'book quiz', 'comprehensive', 'bible quiz'],
    totalQuestions: quizQuestions.length,
    estimatedTime: Math.ceil(quizQuestions.length * 0.75),
  };

  const outPath = path.join(OUTPUT_DIR, `${bookSlug}-book-quiz.json`);
  fs.writeFileSync(outPath, JSON.stringify(quiz, null, 2), 'utf-8');

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`  Done: ${bookName} (${elapsed}s, $${cost.toFixed(4)}) → ${outPath}`);
  console.log(`    ${quizQuestions.length} questions (${inputTokens} in / ${outputTokens} out)`);

  return cost;
}

async function runGeneration(books: string[], concurrency: number) {
  const progress = loadProgress();

  // Filter out already completed
  const remaining = books.filter(b => !progress.completed[b]);
  const skipped = books.length - remaining.length;
  if (skipped > 0) console.log(`Skipping ${skipped} already-completed books.`);

  if (remaining.length === 0) {
    console.log('All book quizzes already generated!');
    return;
  }

  console.log(`\n${remaining.length} books to generate.\n`);

  let generated = 0;
  let failed = 0;
  let totalCost = 0;
  const startTime = Date.now();

  // Process in batches
  for (let i = 0; i < remaining.length; i += concurrency) {
    const batch = remaining.slice(i, i + concurrency);
    const results = await Promise.allSettled(
      batch.map(async (bookSlug) => {
        const idx = books.indexOf(bookSlug) + 1;
        console.log(`[${idx}/${books.length}] Generating ${BOOK_NAMES[bookSlug]} book quiz...`);
        try {
          const cost = await generateAndSaveBookQuiz(bookSlug);
          progress.completed[bookSlug] = true;
          progress.totalGenerated++;
          progress.totalCost += cost;
          saveProgress(progress);
          generated++;
          totalCost += cost;
        } catch (err: any) {
          console.error(`[${idx}/${books.length}] FAILED: ${BOOK_NAMES[bookSlug]}: ${err.message}`);
          failed++;
        }
      })
    );
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n=======================================`);
  console.log(`Generation Complete!`);
  console.log(`  Generated: ${generated} book quizzes`);
  console.log(`  Failed: ${failed} books`);
  console.log(`  Total cost: $${totalCost.toFixed(4)}`);
  console.log(`  Time elapsed: ${elapsed}s`);
  console.log(`=======================================`);
}

// =============================================================================
// CLI
// =============================================================================

async function main() {
  const args = process.argv.slice(2);

  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY not set');
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let books: string[] = [];
  let concurrency = 3;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--book' && args[i + 1]) {
      books = [args[++i]];
    } else if (args[i] === '--all') {
      books = [...ALL_BOOKS];
    } else if (args[i] === '--concurrency' && args[i + 1]) {
      concurrency = parseInt(args[++i], 10);
    }
  }

  if (books.length === 0) {
    console.log('Usage:');
    console.log('  npx tsx scripts/generate-book-quizzes-ai.ts --book genesis');
    console.log('  npx tsx scripts/generate-book-quizzes-ai.ts --all --concurrency 5');
    process.exit(0);
  }

  console.log(`AI Bible Book Quiz Generator (GPT-4.1-mini)`);
  console.log(`=======================================`);
  console.log(`Generating book quizzes for ${books.length} books\n`);

  await runGeneration(books, concurrency);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
