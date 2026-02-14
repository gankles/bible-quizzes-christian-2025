#!/usr/bin/env npx tsx
/**
 * AI-Powered Bible Quiz Generator using OpenAI GPT-4.1-mini
 *
 * Generates high-quality 4-tab quizzes (Easy/Medium/Hard/Theological × 15 questions = 60 per chapter)
 * for all 1,189 Bible chapters.
 *
 * Usage:
 *   npx tsx scripts/generate-quizzes-ai.ts --chapter genesis 1
 *   npx tsx scripts/generate-quizzes-ai.ts --range genesis 1 50
 *   npx tsx scripts/generate-quizzes-ai.ts --book genesis
 *   npx tsx scripts/generate-quizzes-ai.ts --all
 *   npx tsx scripts/generate-quizzes-ai.ts --chapter genesis 1 --dry-run
 *   npx tsx scripts/generate-quizzes-ai.ts --all --concurrency 5
 *   npx tsx scripts/generate-quizzes-ai.ts --all --force
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import OpenAI from 'openai';

// =============================================================================
// TYPES
// =============================================================================

type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank';
type DifficultyLevel = 'easy' | 'medium' | 'hard';
type TabLevel = 'easy' | 'medium' | 'hard' | 'theological';

interface QuizQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  verseReference: string;
  difficulty: DifficultyLevel;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  type: 'chapter' | 'book' | 'character' | 'theme';
  book?: string;
  chapter?: number;
  questions: QuizQuestion[];
  difficulty: DifficultyLevel;
  isBookQuiz: boolean;
  slug: string;
  tags: string[];
  totalQuestions: number;
  estimatedTime: number;
}

interface TabbedQuiz {
  id: string;
  title: string;
  description: string;
  tabs: {
    easy: Quiz;
    medium: Quiz;
    hard: Quiz;
    theological: Quiz;
  };
}

interface BollsVerse {
  pk: number;
  verse: number;
  text: string;
  comment?: string;
}

interface ProgressData {
  completed: Record<string, boolean>; // "genesis-1" -> true
  lastUpdated: string;
  totalGenerated: number;
  totalCost: number;
}

interface AIQuestion {
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options: string[];
  correctAnswer: string;
  explanation: string;
  verseReference: string;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const OUTPUT_DIR = path.resolve(SCRIPT_DIR, '..', 'data', 'quizzes');
const PROGRESS_FILE = path.join(OUTPUT_DIR, '.progress.json');
const BASE_URL = 'https://bolls.life';

const BOLLS_RATE_LIMIT_MS = 500;
const OPENAI_RATE_LIMIT_MS = 200;
const FETCH_TIMEOUT_MS = 15000;
const OPENAI_TIMEOUT_MS = 60000;
const MAX_RETRIES = 3;

// GPT-4.1-mini pricing (per 1M tokens)
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
        console.warn(`  Rate limited by Bolls.life, waiting ${backoff}ms (attempt ${attempt}/${MAX_RETRIES})...`);
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

      // Format as readable text with verse numbers
      const bookName = BOOK_NAMES[bookSlug] || capitalize(bookSlug);
      const lines = verses.map(v => `${bookName} ${chapter}:${v.verse} - ${stripHtml(v.text)}`);
      return lines.join('\n');
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        if (attempt < MAX_RETRIES) {
          await sleep(2000);
          continue;
        }
        throw new Error(`Fetch timeout for ${bookSlug} ${chapter}`);
      }
      if (attempt >= MAX_RETRIES) throw err;
      await sleep(2000 * attempt);
    }
  }

  throw new Error(`Failed after ${MAX_RETRIES} retries: ${bookSlug} ${chapter}`);
}

// =============================================================================
// PROMPT ENGINEERING
// =============================================================================

function buildPrompt(
  bookName: string,
  chapter: number,
  chapterText: string,
  tab: TabLevel
): string {
  const commonInstructions = `You are an expert Bible scholar and quiz creator. Generate exactly 15 quiz questions based on the following Bible chapter text.

CHAPTER: ${bookName} Chapter ${chapter}

CHAPTER TEXT:
${chapterText}

IMPORTANT RULES:
- Every question MUST be directly grounded in the chapter text provided above.
- Every verseReference must cite a specific verse from this chapter (e.g., "${bookName} ${chapter}:5").
- The correctAnswer MUST appear exactly in the options array.
- Multiple choice questions must have exactly 4 options.
- True/False questions must have exactly 2 options: ["True", "False"].
- Fill-in-the-blank questions must have exactly 4 options.
- Each explanation should cite the specific verse and briefly explain why the answer is correct.
- Do not repeat questions or use the same verse reference for more than 2 questions.

Return ONLY valid JSON in this exact format:
{
  "questions": [
    {
      "question": "The question text",
      "type": "multiple-choice",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "Explanation citing the verse",
      "verseReference": "${bookName} ${chapter}:1"
    }
  ]
}`;

  switch (tab) {
    case 'easy':
      return `${commonInstructions}

DIFFICULTY: EASY — Basic Recognition & Simple Facts

Focus on:
- Simple factual recall directly from the chapter text
- "What/Who/Where/When" questions
- Basic events, characters, and places mentioned
- Direct quotes and simple facts

Question type distribution (STRICT):
- 10-11 multiple-choice questions (70%)
- 3 true/false questions (20%)
- 1-2 fill-in-the-blank questions (10%)

EXAMPLE QUESTIONS (for reference style only, do NOT copy):
- "According to ${bookName} ${chapter}:3, what did God say?" (multiple-choice)
- "True or False: ${bookName} ${chapter}:7 states that God formed man from the dust of the ground." (true-false)
- "Complete this verse from ${bookName} ${chapter}:1: 'In the beginning God created the ______ and the earth.'" (fill-blank)`;

    case 'medium':
      return `${commonInstructions}

DIFFICULTY: MEDIUM — Practical Christian Application

Focus on traditional, practical Christian living grounded in this chapter's teaching:
- Faith, trust in God, obedience to His Word
- Prayer, personal devotion, spiritual discipline
- Evangelism, sharing the Gospel, being a witness
- Marriage, family life, parenting with biblical wisdom
- Work ethic, honesty, integrity in daily life
- Generosity, stewardship, tithing
- Church life, fellowship, serving others
- Forgiveness, reconciliation, love for neighbors
- Dealing with temptation, perseverance through trials
- Humility, contentment, gratitude

Frame questions as: "How does this passage teach us about [biblical virtue]?"
Use scenarios like: "A fellow believer is struggling with [common challenge]. Based on [passage], what biblical truth would you share?"

CRITICAL — DO NOT use these patterns:
- No social justice or activism framing
- No environmental activism language
- No "inherent worth/dignity" repetition
- No sensitivity-training scenarios
- No culture-war topics or politically charged framing
- No social media cyberbullying scenarios
- No "marginalized" or "excluded" language

GOOD example: "A fellow believer is going through a trial and asks you for counsel. Based on ${bookName} ${chapter}, what biblical truth would you share?"
BAD example: "You see someone being cyberbullied on social media. How does ${bookName} ${chapter} guide your response to defend their inherent dignity?"

Question type distribution (STRICT):
- 12 multiple-choice questions (80%)
- 2 true/false questions (15%)
- 1 fill-in-the-blank question (5%)

Each explanation should reference 3-5 supporting Scripture verses.`;

    case 'hard':
      return `${commonInstructions}

DIFFICULTY: HARD — Analysis & Cross-Biblical Connections

Focus on:
- Cross-biblical connections: how this chapter relates to other books of the Bible
- Literary structure and devices (chiasm, parallelism, typology, foreshadowing)
- Hebrew or Greek word studies and their significance
- Historical and cultural context of the ancient Near East
- Authorial intent and audience considerations
- How themes in this chapter develop across Scripture
- Intertextual connections and allusions

Question type distribution (STRICT):
- 13-14 multiple-choice questions (90%)
- 1-2 true/false questions (10%)

EXAMPLE QUESTIONS (for reference style only, do NOT copy):
- "How does the creation account in Genesis 1 parallel the structure of the tabernacle description in Exodus 25-31?"
- "The Hebrew word 'bara' used in Genesis 1:1 specifically denotes what type of creative action?"
- "Which New Testament passage most directly references the events of this chapter?"`;

    case 'theological':
      return `${commonInstructions}

DIFFICULTY: THEOLOGICAL — Advanced Biblical Theology

Focus on:
- Seminary-level doctrinal questions rooted in this chapter
- Systematic theology: what does this chapter teach about God, humanity, sin, salvation, etc.?
- Apologetics: how does this chapter address common objections to the faith?
- Biblical theology: how does this chapter fit into the grand narrative of Scripture?
- Core Christian doctrines that all orthodox believers share
- Attributes of God revealed in this chapter
- Christological connections and messianic themes
- Pneumatology (Holy Spirit), eschatology, ecclesiology as relevant

CRITICAL — AVOID denominational controversies:
- Do not take sides on Reformed vs. Arminian debates
- Do not take sides on Young Earth vs. Old Earth
- Do not reference specific denominational distinctives
- Focus on truths affirmed across the historic Christian creeds

Question type distribution (STRICT):
- All 15 questions must be multiple-choice (100%)

Each explanation should reference 4-5 supporting Scripture verses showing biblical consistency across Old and New Testaments.`;

    default:
      throw new Error(`Unknown tab level: ${tab}`);
  }
}

// =============================================================================
// OPENAI API INTEGRATION
// =============================================================================

let openai: OpenAI | null = null;
let fallbackEnabled = false;

function getOpenAI(): OpenAI | null {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      if (fallbackEnabled) {
        console.warn('Warning: OPENAI_API_KEY not set. Will use regex fallback for all chapters.');
        return null;
      }
      console.error('Error: OPENAI_API_KEY environment variable is required.');
      console.error('Set it with: export OPENAI_API_KEY=sk-your-key-here');
      console.error('Or create a .env file with: OPENAI_API_KEY=sk-your-key-here');
      console.error('Tip: use --fallback to fall back to the regex generator when OpenAI is unavailable.');
      process.exit(1);
    }
    openai = new OpenAI({ apiKey });
  }
  return openai;
}

interface GenerationResult {
  questions: AIQuestion[];
  inputTokens: number;
  outputTokens: number;
  cost: number;
}

async function generateQuestions(
  bookName: string,
  chapter: number,
  chapterText: string,
  tab: TabLevel
): Promise<GenerationResult> {
  const client = getOpenAI();
  if (!client) {
    throw new Error('OpenAI client unavailable (no API key)');
  }
  const prompt = buildPrompt(bookName, chapter, chapterText, tab);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await client.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert Bible scholar and quiz creator. You always return valid JSON with exactly the structure requested. You never include markdown formatting or code fences in your response.'
          },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 4000,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('Empty response from OpenAI');
      }

      const parsed = JSON.parse(content);
      let questions: AIQuestion[] = parsed.questions;

      // Auto-normalize common GPT mistakes
      for (const q of questions) {
        // Fix "fill-in-the-blank" → "fill-blank"
        if ((q.type as string) === 'fill-in-the-blank') {
          q.type = 'fill-blank';
        }
      }
      // Trim to 15 if GPT returned 16-17
      if (questions.length > 15) {
        questions = questions.slice(0, 15);
      }

      const inputTokens = response.usage?.prompt_tokens || 0;
      const outputTokens = response.usage?.completion_tokens || 0;
      const cost = (inputTokens / 1_000_000) * INPUT_COST_PER_1M + (outputTokens / 1_000_000) * OUTPUT_COST_PER_1M;

      // Validate the response
      const errors = validateQuestions(questions, tab, bookName, chapter);

      if (errors.length > 0) {
        if (attempt < MAX_RETRIES) {
          console.warn(`    Validation errors for ${tab} tab (attempt ${attempt}): ${errors.join('; ')}`);
          console.warn(`    Re-prompting...`);
          await sleep(1000 * attempt);
          continue;
        }
        // On last attempt, log errors but use what we have
        console.warn(`    Final attempt still has validation issues: ${errors.join('; ')}`);
      }

      return { questions, inputTokens, outputTokens, cost };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);

      // Rate limit handling
      if (msg.includes('429') || msg.includes('rate_limit')) {
        const backoff = 5000 * attempt;
        console.warn(`    OpenAI rate limited, waiting ${backoff}ms (attempt ${attempt}/${MAX_RETRIES})...`);
        await sleep(backoff);
        continue;
      }

      // Timeout handling
      if (msg.includes('timeout') || msg.includes('ETIMEDOUT')) {
        if (attempt < MAX_RETRIES) {
          console.warn(`    OpenAI timeout, retrying (attempt ${attempt}/${MAX_RETRIES})...`);
          await sleep(2000 * attempt);
          continue;
        }
      }

      if (attempt >= MAX_RETRIES) throw err;
      await sleep(1000 * attempt);
    }
  }

  throw new Error(`Failed to generate ${tab} questions after ${MAX_RETRIES} attempts`);
}

// =============================================================================
// RESPONSE VALIDATION
// =============================================================================

function validateQuestions(
  questions: AIQuestion[],
  tab: TabLevel,
  bookName: string,
  chapter: number
): string[] {
  const errors: string[] = [];

  if (!Array.isArray(questions)) {
    return ['Response is not an array of questions'];
  }

  if (questions.length !== 15) {
    errors.push(`Expected 15 questions, got ${questions.length}`);
  }

  // Check question type distribution
  const mcCount = questions.filter(q => q.type === 'multiple-choice').length;
  const tfCount = questions.filter(q => q.type === 'true-false').length;
  const fbCount = questions.filter(q => q.type === 'fill-blank').length;

  const expectedDist: Record<TabLevel, { mc: [number, number]; tf: [number, number]; fb: [number, number] }> = {
    easy: { mc: [10, 11], tf: [3, 3], fb: [1, 2] },
    medium: { mc: [12, 12], tf: [2, 2], fb: [1, 1] },
    hard: { mc: [13, 14], tf: [1, 2], fb: [0, 0] },
    theological: { mc: [15, 15], tf: [0, 0], fb: [0, 0] },
  };

  const dist = expectedDist[tab];
  if (mcCount < dist.mc[0] || mcCount > dist.mc[1]) {
    errors.push(`${tab}: expected ${dist.mc[0]}-${dist.mc[1]} MC, got ${mcCount}`);
  }
  if (tfCount < dist.tf[0] || tfCount > dist.tf[1]) {
    errors.push(`${tab}: expected ${dist.tf[0]}-${dist.tf[1]} T/F, got ${tfCount}`);
  }
  if (fbCount < dist.fb[0] || fbCount > dist.fb[1]) {
    errors.push(`${tab}: expected ${dist.fb[0]}-${dist.fb[1]} fill-blank, got ${fbCount}`);
  }

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    if (!q.question || typeof q.question !== 'string') {
      errors.push(`Q${i + 1}: missing question text`);
      continue;
    }

    if (!q.type || !['multiple-choice', 'true-false', 'fill-blank'].includes(q.type)) {
      errors.push(`Q${i + 1}: invalid type "${q.type}"`);
    }

    if (!Array.isArray(q.options) || q.options.length === 0) {
      errors.push(`Q${i + 1}: missing or empty options`);
    } else {
      if (q.type === 'multiple-choice' && q.options.length !== 4) {
        errors.push(`Q${i + 1}: MC question should have 4 options, got ${q.options.length}`);
      }
      if (q.type === 'true-false' && q.options.length !== 2) {
        errors.push(`Q${i + 1}: T/F question should have 2 options, got ${q.options.length}`);
      }
      if (q.type === 'fill-blank' && q.options.length !== 4) {
        errors.push(`Q${i + 1}: fill-blank question should have 4 options, got ${q.options.length}`);
      }
    }

    if (!q.correctAnswer) {
      errors.push(`Q${i + 1}: missing correctAnswer`);
    } else if (Array.isArray(q.options) && !q.options.includes(q.correctAnswer)) {
      errors.push(`Q${i + 1}: correctAnswer "${q.correctAnswer}" not in options`);
    }

    if (!q.explanation) {
      errors.push(`Q${i + 1}: missing explanation`);
    }

    if (!q.verseReference) {
      errors.push(`Q${i + 1}: missing verseReference`);
    }
  }

  return errors;
}

// =============================================================================
// QUIZ ASSEMBLY
// =============================================================================

function assembleTabQuiz(
  bookSlug: string,
  bookName: string,
  chapter: number,
  tab: TabLevel,
  aiQuestions: AIQuestion[]
): Quiz {
  const difficultyMap: Record<TabLevel, DifficultyLevel> = {
    easy: 'easy',
    medium: 'medium',
    hard: 'hard',
    theological: 'hard',
  };

  const timeMap: Record<TabLevel, number> = {
    easy: 8,
    medium: 12,
    hard: 15,
    theological: 25,
  };

  const descriptionMap: Record<TabLevel, string> = {
    easy: `Perfect for beginners! Test your basic knowledge of ${bookName} Chapter ${chapter}.`,
    medium: `Ready for more? Apply biblical truths from ${bookName} Chapter ${chapter} to real-life situations.`,
    hard: `Challenge yourself with deep analysis and cross-biblical connections from ${bookName} Chapter ${chapter}.`,
    theological: `Deep biblical theology from ${bookName} Chapter ${chapter} that unites all believers. Explore foundational truths about God, creation, and humanity.`,
  };

  const questions: QuizQuestion[] = aiQuestions.map((q, i) => ({
    id: `${bookSlug}-${chapter}-${tab}-q${i + 1}`,
    question: q.question,
    type: q.type,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    verseReference: q.verseReference,
    difficulty: difficultyMap[tab],
  }));

  return {
    id: `${bookSlug}-${chapter}-${tab}`,
    title: `${bookName} Chapter ${chapter} Quiz - ${capitalize(tab)} Level`,
    description: descriptionMap[tab],
    type: 'chapter',
    book: bookName,
    chapter,
    questions,
    difficulty: difficultyMap[tab],
    isBookQuiz: false,
    slug: `${bookSlug}-${chapter}-quiz`,
    tags: [bookName.toLowerCase(), `chapter-${chapter}`, bookSlug, 'bible-quiz', tab],
    totalQuestions: questions.length,
    estimatedTime: timeMap[tab],
  };
}

function assembleTabbedQuiz(
  bookSlug: string,
  bookName: string,
  chapter: number,
  tabs: Record<TabLevel, Quiz>
): TabbedQuiz {
  return {
    id: `${bookSlug}-${chapter}-tabbed`,
    title: `${bookName} Chapter ${chapter} Quiz - Multi-Level`,
    description: `An enhanced quiz on ${bookName} chapter ${chapter} with Easy, Medium, Hard, and Theological levels. Each level has 15 carefully crafted questions. Choose your difficulty and dive in!`,
    tabs: {
      easy: tabs.easy,
      medium: tabs.medium,
      hard: tabs.hard,
      theological: tabs.theological,
    },
  };
}

// =============================================================================
// FILE OUTPUT
// =============================================================================

function writeQuiz(tabbedQuiz: TabbedQuiz): string {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const filePath = path.join(OUTPUT_DIR, `${tabbedQuiz.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(tabbedQuiz, null, 2), 'utf-8');
  return filePath;
}

// =============================================================================
// CHAPTER GENERATION PIPELINE
// =============================================================================

function runRegexFallback(bookSlug: string, chapter: number): string {
  const scriptPath = path.resolve(SCRIPT_DIR, 'generate-quizzes.ts');
  const cmd = `npx tsx "${scriptPath}" ${bookSlug} ${chapter}`;
  console.log(`    Running regex fallback: ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd: path.resolve(SCRIPT_DIR, '..') });
  return path.join(OUTPUT_DIR, `${bookSlug}-${chapter}.json`);
}

async function generateChapter(
  bookSlug: string,
  chapter: number,
  progress: ProgressData,
  options: { force: boolean; dryRun: boolean; fallback: boolean }
): Promise<{ cost: number; time: number; fallback?: boolean } | null> {
  const bookName = BOOK_NAMES[bookSlug] || capitalize(bookSlug);
  const key = `${bookSlug}-${chapter}`;

  // Skip if already completed (unless --force)
  if (!options.force && isCompleted(progress, bookSlug, chapter)) {
    console.log(`  Skipping ${bookName} ${chapter} (already generated, use --force to regenerate)`);
    return null;
  }

  if (options.dryRun) {
    console.log(`  [DRY RUN] Would generate ${bookName} ${chapter}`);
    return null;
  }

  const startTime = Date.now();

  // If fallback is enabled and no API key, skip OpenAI entirely
  if (options.fallback && !process.env.OPENAI_API_KEY) {
    console.log(`  No API key — using regex fallback for ${bookName} ${chapter}`);
    try {
      const filePath = runRegexFallback(bookSlug, chapter);
      markCompleted(progress, bookSlug, chapter, 0);
      saveProgress(progress);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`  OpenAI failed, fell back to regex generator for ${bookName} ${chapter} (${elapsed}s) → ${filePath}`);
      return { cost: 0, time: Date.now() - startTime, fallback: true };
    } catch (fbErr: unknown) {
      const fbMsg = fbErr instanceof Error ? fbErr.message : String(fbErr);
      throw new Error(`Regex fallback also failed for ${bookName} ${chapter}: ${fbMsg}`);
    }
  }

  try {
    // 1. Fetch chapter text
    console.log(`  Fetching ${bookName} ${chapter}...`);
    const chapterText = await fetchChapterText(bookSlug, chapter);
    await sleep(BOLLS_RATE_LIMIT_MS);

    // 2. Generate all 4 tabs
    let totalCost = 0;
    const tabQuizzes: Record<string, Quiz> = {};
    const tabOrder: TabLevel[] = ['easy', 'medium', 'hard', 'theological'];

    for (const tab of tabOrder) {
      console.log(`    Generating ${tab} tab...`);
      const result = await generateQuestions(bookName, chapter, chapterText, tab);
      totalCost += result.cost;

      tabQuizzes[tab] = assembleTabQuiz(bookSlug, bookName, chapter, tab, result.questions);

      console.log(`    ${tab}: ${result.questions.length} questions (${result.inputTokens} in / ${result.outputTokens} out, $${result.cost.toFixed(4)})`);
      await sleep(OPENAI_RATE_LIMIT_MS);
    }

    // 3. Assemble and write
    const tabbedQuiz = assembleTabbedQuiz(
      bookSlug, bookName, chapter,
      tabQuizzes as Record<TabLevel, Quiz>
    );
    const filePath = writeQuiz(tabbedQuiz);

    // 4. Update progress
    markCompleted(progress, bookSlug, chapter, totalCost);
    saveProgress(progress);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`  Done: ${bookName} ${chapter} (${elapsed}s, $${totalCost.toFixed(4)}) → ${filePath}`);

    return { cost: totalCost, time: Date.now() - startTime };
  } catch (err: unknown) {
    // If fallback is enabled, try regex generator
    if (options.fallback) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.warn(`  OpenAI generation failed for ${bookName} ${chapter}: ${errMsg}`);
      console.warn(`  Attempting regex fallback...`);
      try {
        const filePath = runRegexFallback(bookSlug, chapter);
        markCompleted(progress, bookSlug, chapter, 0);
        saveProgress(progress);
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`  OpenAI failed, fell back to regex generator for ${bookName} ${chapter} (${elapsed}s) → ${filePath}`);
        return { cost: 0, time: Date.now() - startTime, fallback: true };
      } catch (fbErr: unknown) {
        const fbMsg = fbErr instanceof Error ? fbErr.message : String(fbErr);
        throw new Error(`Both OpenAI and regex fallback failed for ${bookName} ${chapter}: ${fbMsg}`);
      }
    }
    throw err;
  }
}

// =============================================================================
// BOUNDED CONCURRENCY
// =============================================================================

async function processWithConcurrency<T>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<void>
): Promise<void> {
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const i = index++;
      await fn(items[i], i);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
  await Promise.all(workers);
}

// =============================================================================
// CLI ARGUMENT PARSING
// =============================================================================

interface CLIOptions {
  mode: 'chapter' | 'range' | 'book' | 'all';
  book?: string;
  chapterStart?: number;
  chapterEnd?: number;
  dryRun: boolean;
  force: boolean;
  fallback: boolean;
  concurrency: number;
}

function parseArgs(): CLIOptions {
  const args = process.argv.slice(2);
  const options: CLIOptions = {
    mode: 'chapter',
    dryRun: false,
    force: false,
    fallback: false,
    concurrency: 3,
  };

  let i = 0;
  while (i < args.length) {
    switch (args[i]) {
      case '--help':
      case '-h':
        printUsage();
        process.exit(0);

      case '--dry-run':
        options.dryRun = true;
        i++;
        break;

      case '--force':
        options.force = true;
        i++;
        break;

      case '--fallback':
        options.fallback = true;
        i++;
        break;

      case '--concurrency':
        options.concurrency = parseInt(args[i + 1], 10) || 3;
        i += 2;
        break;

      case '--chapter':
        options.mode = 'chapter';
        options.book = args[i + 1]?.toLowerCase();
        options.chapterStart = parseInt(args[i + 2], 10);
        options.chapterEnd = options.chapterStart;
        i += 3;
        break;

      case '--range':
        options.mode = 'range';
        options.book = args[i + 1]?.toLowerCase();
        options.chapterStart = parseInt(args[i + 2], 10);
        options.chapterEnd = parseInt(args[i + 3], 10);
        i += 4;
        break;

      case '--book':
        options.mode = 'book';
        options.book = args[i + 1]?.toLowerCase();
        i += 2;
        break;

      case '--all':
        options.mode = 'all';
        i++;
        break;

      default:
        console.error(`Unknown argument: ${args[i]}`);
        printUsage();
        process.exit(1);
    }
  }

  // Validate
  if (options.mode !== 'all') {
    if (!options.book || !BOOK_IDS[options.book]) {
      console.error(`Unknown or missing book: "${options.book}"`);
      console.error(`Available books: ${Object.keys(BOOK_IDS).join(', ')}`);
      process.exit(1);
    }
  }

  if (options.mode === 'chapter' || options.mode === 'range') {
    const totalChapters = BOOK_CHAPTERS[options.book!];
    if (!options.chapterStart || isNaN(options.chapterStart) || options.chapterStart < 1) {
      console.error(`Invalid start chapter: ${options.chapterStart}`);
      process.exit(1);
    }
    if (!options.chapterEnd || isNaN(options.chapterEnd) || options.chapterEnd > totalChapters) {
      console.error(`Invalid end chapter: ${options.chapterEnd}. ${BOOK_NAMES[options.book!]} has ${totalChapters} chapters.`);
      process.exit(1);
    }
    if (options.chapterStart > options.chapterEnd) {
      console.error(`Start chapter (${options.chapterStart}) cannot be greater than end chapter (${options.chapterEnd}).`);
      process.exit(1);
    }
  }

  if (options.mode === 'book') {
    options.chapterStart = 1;
    options.chapterEnd = BOOK_CHAPTERS[options.book!];
  }

  return options;
}

function printUsage(): void {
  console.log(`
AI-Powered Bible Quiz Generator (GPT-4.1-mini)
================================================

Usage:
  npx tsx scripts/generate-quizzes-ai.ts --chapter <book> <chapter>
  npx tsx scripts/generate-quizzes-ai.ts --range <book> <start> <end>
  npx tsx scripts/generate-quizzes-ai.ts --book <book>
  npx tsx scripts/generate-quizzes-ai.ts --all

Options:
  --chapter <book> <ch>      Generate a single chapter
  --range <book> <start> <end>  Generate a range of chapters
  --book <book>              Generate all chapters for a book
  --all                      Generate all 1,189 Bible chapters
  --dry-run                  Show what would be generated (no API calls)
  --force                    Regenerate even if already completed
  --fallback                 Fall back to regex generator if OpenAI fails
  --concurrency <n>          Parallel API calls (default: 3)
  -h, --help                 Show this help message

Examples:
  npx tsx scripts/generate-quizzes-ai.ts --chapter genesis 1
  npx tsx scripts/generate-quizzes-ai.ts --range genesis 1 50
  npx tsx scripts/generate-quizzes-ai.ts --book genesis
  npx tsx scripts/generate-quizzes-ai.ts --all --concurrency 5
  npx tsx scripts/generate-quizzes-ai.ts --chapter genesis 1 --dry-run
  npx tsx scripts/generate-quizzes-ai.ts --all --force
  npx tsx scripts/generate-quizzes-ai.ts --chapter mark 3 --fallback

Output:
  data/quizzes/{book}-{chapter}-tabbed.json

Cost estimate:
  ~$0.02 per chapter, ~$24 for all 1,189 chapters
`);
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  const options = parseArgs();

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const progress = loadProgress();

  // Set module-level fallback flag so getOpenAI() can check it
  fallbackEnabled = options.fallback;

  console.log('AI Bible Quiz Generator (GPT-4.1-mini)');
  console.log('=======================================');

  if (options.fallback) {
    console.log('MODE: Fallback enabled (will use regex generator if OpenAI fails)\n');
  }

  if (options.dryRun) {
    console.log('MODE: DRY RUN (no API calls will be made)\n');
  }

  // Build target list
  interface Target {
    book: string;
    chapter: number;
  }

  const targets: Target[] = [];

  if (options.mode === 'all') {
    for (const [bookSlug, totalChapters] of Object.entries(BOOK_CHAPTERS)) {
      for (let ch = 1; ch <= totalChapters; ch++) {
        targets.push({ book: bookSlug, chapter: ch });
      }
    }
    console.log(`Generating ${targets.length} chapters (all Bible books)\n`);
  } else {
    for (let ch = options.chapterStart!; ch <= options.chapterEnd!; ch++) {
      targets.push({ book: options.book!, chapter: ch });
    }
    const bookName = BOOK_NAMES[options.book!];
    if (options.mode === 'chapter') {
      console.log(`Generating ${bookName} ${options.chapterStart}\n`);
    } else if (options.mode === 'range') {
      console.log(`Generating ${bookName} ${options.chapterStart}-${options.chapterEnd} (${targets.length} chapters)\n`);
    } else {
      console.log(`Generating all ${targets.length} chapters of ${bookName}\n`);
    }
  }

  // Filter out already completed unless --force
  const pending = options.force
    ? targets
    : targets.filter(t => !isCompleted(progress, t.book, t.chapter));

  if (pending.length === 0 && !options.dryRun) {
    console.log('All target chapters have already been generated.');
    console.log('Use --force to regenerate.');
    return;
  }

  if (!options.force && pending.length < targets.length) {
    console.log(`Skipping ${targets.length - pending.length} already-completed chapters.`);
    console.log(`${pending.length} chapters remaining.\n`);
  }

  // Estimate cost
  const estimatedCost = pending.length * 0.02;
  console.log(`Estimated cost: ~$${estimatedCost.toFixed(2)} (${pending.length} chapters × ~$0.02 each)\n`);

  // Process
  const startTime = Date.now();
  let totalGenerated = 0;
  let totalFailed = 0;
  let totalCost = 0;

  await processWithConcurrency(pending, options.concurrency, async (target, idx) => {
    const label = `[${idx + 1}/${pending.length}]`;
    try {
      console.log(`${label} Generating ${BOOK_NAMES[target.book]} ${target.chapter}...`);
      const result = await generateChapter(target.book, target.chapter, progress, {
        force: options.force,
        dryRun: options.dryRun,
        fallback: options.fallback,
      });
      if (result) {
        totalGenerated++;
        totalCost += result.cost;
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`${label} FAILED: ${BOOK_NAMES[target.book]} ${target.chapter}: ${msg}`);
      totalFailed++;
    }
  });

  // Summary
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('\n=======================================');
  console.log('Generation Complete!');
  console.log(`  Generated: ${totalGenerated} chapters`);
  if (totalFailed > 0) console.log(`  Failed: ${totalFailed} chapters`);
  console.log(`  Total cost: $${totalCost.toFixed(4)}`);
  console.log(`  Time elapsed: ${elapsed}s`);
  console.log(`  Progress: ${Object.keys(progress.completed).length}/${targets.length} total chapters`);
  console.log(`  Cumulative cost: $${progress.totalCost.toFixed(4)}`);
  console.log('=======================================');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
