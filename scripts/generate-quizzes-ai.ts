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

type QuestionType = 'multiple-choice' | 'true-false';
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
  type: 'multiple-choice' | 'true-false';
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
const MAX_RETRIES = 5;
let modelOverride: string | undefined; // set by --model flag

// Pricing per 1M tokens (gpt-4o-mini; gpt-4.1-mini used as fallback on attempt 3+)
const COST_PER_1M: Record<string, { input: number; output: number }> = {
  'gpt-4o-mini':  { input: 0.15, output: 0.60 },
  'gpt-4.1-mini': { input: 0.40, output: 1.60 },
};
// Legacy aliases kept for cost accumulation
const INPUT_COST_PER_1M = 0.15;
const OUTPUT_COST_PER_1M = 0.60;

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
  const verses = chapterText.split('\n').filter(l => l.trim());
  const totalVerses = verses.length;
  const third = Math.ceil(totalVerses / 3);
  const firstThird = verses.slice(0, third).join('\n');
  const middleThird = verses.slice(third, third * 2).join('\n');
  const lastThird = verses.slice(third * 2).join('\n');

  const universalRules = `UNIVERSAL RULES — FOLLOW STRICTLY:
1. Every verseReference MUST cite the exact verse(s) containing the answer (e.g., "${bookName} ${chapter}:5"). Never cite verse N when the answer is in verse N+1.
2. The correctAnswer MUST appear verbatim in the options array.
3. Multiple-choice: exactly 4 options. True/False: options must be exactly ["True", "False"].
4. FORBIDDEN: fill-in-the-blank questions. Only "multiple-choice" or "true-false" types.
5. Do not use the same verse as the primary reference for more than 2 questions.
6. Each explanation must state the specific verse and explain WHY that answer is correct.
7. DISTRACTOR QUALITY — wrong options must be plausible, not obviously absurd:
   - Wrong options should be things a student who half-knows the passage might genuinely pick.
   - Use real details from the chapter or nearby chapters as distractors (e.g., a different day, a different name, a different command that actually appears in the text).
   - NEVER use distractors like "God was unsure", "Creation is random", "God regrets", "Chaos without order" — these are obviously false to anyone with basic Bible knowledge.
   - For typology/doctrine questions: wrong options should be real theological terms or real NT passages that are close but incorrect (e.g., offer Romans 5:12 when the answer is Romans 8:19 — both are real, both are plausible).
   - A student who doesn't know the answer should have to think, not just eliminate obvious nonsense.
8. CHRISTOLOGICAL AND TRINITARIAN ORTHODOXY — non-negotiable hard rules:
   - Jesus Christ is fully God and fully man — the second Person of the Trinity, co-equal and co-eternal with the Father and Holy Spirit. NEVER write a question or answer that implies He is a created being, subordinate in divine nature, or less than fully God.
   - The Father, Son, and Holy Spirit are one God in three Persons — equal in essence, power, and glory. NEVER imply one Person is greater than another in nature.
   - Passages about Christ's INCARNATION (e.g., Philippians 2:7 "emptied himself", Hebrews 2:9 "made a little lower than angels for the suffering of death") describe His voluntary humiliation in taking on human flesh — they do NOT teach that Christ is ontologically inferior to angels or that He ceased being God. NEVER cite these passages as evidence that Jesus is lower than angels in nature.
   - NEVER use Hebrews 2:6-8 as proof that "Jesus was made lower than angels" — that passage quotes Psalm 8 about humanity's dominion mandate; verse 9 applies it to Christ's incarnation only, not His eternal nature.
   - Preferred NT passages for Christ's dominion and authority: Ephesians 1:20-22, Matthew 28:18, 1 Corinthians 15:27, Colossians 1:15-17, Philippians 2:9-11.
   - If you are unsure whether a doctrinal claim is orthodox, choose a different question entirely rather than risk error.
9. OPTION LENGTH PARITY — all four options must be roughly the same length and level of detail:
   - NEVER write a question where the correct answer is noticeably longer or more specific than the wrong options. This gives it away instantly.
   - Wrong options must be just as fully worded as the correct answer. If the correct answer is a full sentence with details, ALL options must be full sentences with comparable detail.
   - BAD example — correct answer obvious because it's the only specific one:
       A) The earth was still void
       B) Lights appeared
       C) Creatures came forth
       D) The earth brought forth grass, herbs yielding seed, and fruit trees yielding fruit after their kind ✓
   - GOOD example — all options equally detailed, student must know the content:
       A) The earth brought forth grass, herbs yielding seed, and fruit trees after their kind ✓
       B) The earth brought forth great whales and every living creature that moves in the waters
       C) The earth remained without form and void, and darkness covered the face of the deep
       D) The earth brought forth lights in the firmament to divide the day from the night
   - Apply this to every single question, especially factual recall questions where the temptation is to write vague wrong options.`;

  const typologyNote = `TYPOLOGICAL RETRIEVAL STYLE — apply at every difficulty level:
Questions should not just ask WHAT happened — they should ask WHAT IT MEANS and WHY it matters.
- "What does X represent?" questions where the text or a clear NT citation gives the answer
- Cause-and-effect: "Because God did X in verse Y, what does verse Z reveal?"
- Symbol identification: people, objects, places that represent deeper spiritual realities
- Contrast questions: "God commanded X the first time but Y the second time — what changed and why?"
This style turns passive readers into active thinkers who understand the story behind the story.

MANDATORY FOR ALL REPRESENTATION QUESTIONS: The explanation MUST cite a specific Bible verse from another passage (e.g., "John 8:12 confirms this — Jesus said 'I am the light of the world'") that establishes WHY the item represents what it does. Simply restating that something "implies" or "symbolizes" without a cross-reference citation is NOT sufficient. If you cannot name a specific confirming verse, choose a different representational question.`;

  const jsonFormat = `Return ONLY valid JSON — no markdown fences, no extra text:
{
  "questions": [
    {
      "question": "The question text",
      "type": "multiple-choice",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "Explanation citing the exact verse",
      "verseReference": "${bookName} ${chapter}:1"
    }
  ]
}`;

  switch (tab) {
    case 'easy':
      return `You are an expert Bible scholar creating quiz questions. Generate exactly 15 questions.

CHAPTER: ${bookName} Chapter ${chapter}

VERSE TEXT — Questions MUST come from WITHIN these verses ONLY:
${firstThird}

${universalRules}

DIFFICULTY: EASY — Pure factual recall, strategically ordered so that facts build on each other.
STRICT RULES:
- Every answer must be stated directly in the verse text. No interpretation, no allegory, no NT cross-references.
- Do NOT ask what anything represents or means spiritually.
- "Who / What / Where / When / Which" answered directly from the text.

THE SOCRATIC CHAIN METHOD — this is the core structure:
Questions are grouped into chains of 3. Within each chain the first two questions establish facts (premises), and the third question asks the student to reason from those two facts to a conclusion that is still directly observable in the text.

HOW TO WRITE A CHAIN CONCLUSION (Slot 3 of each chain):
- The question text MUST explicitly reference what the previous two questions established.
- The answer must still be directly answerable from the verse text — no spiritual interpretation yet.
- The student should feel: "Oh — I already knew both pieces, now I can see how they connect."

EXAMPLE OF A VALID CHAIN:
  Slot 2: "What did God create on Day 1?" → "Light"
  Slot 3: "What did God create on Day 4?" → "The sun and moon"
  Slot 4: "Light was created on Day 1, but the sun and moon were not created until Day 4. According to Genesis 1:3, what was the source of that first light?" → "God's spoken word — He said 'Let there be light'"
  (The student has both facts from Slots 2–3 and reasons to the textual conclusion in Slot 4.)

QUESTION CHAIN LAYOUT — follow exactly:
Slot 1  (multiple-choice): SEQUENCING — "In ${bookName} ${chapter}, which of the following appears FIRST?" 4 options = real events/people from the text. Correct = the earliest.

CHAIN A (Slots 2–4): Choose two adjacent or contrasting facts from the verse text that together reveal a third observable truth.
  Slot 2  (multiple-choice): Fact A — pure recall
  Slot 3  (multiple-choice): Fact B — pure recall
  Slot 4  (multiple-choice): CONCLUSION — question must explicitly reference the facts from Slots 2–3 in its wording. Answer is still a directly observable text fact, not spiritual interpretation.

CHAIN B (Slots 5–7): Choose a different pair of facts from the verse text.
  Slot 5  (multiple-choice): Fact A — pure recall
  Slot 6  (multiple-choice): Fact B — pure recall
  Slot 7  (multiple-choice): CONCLUSION — question must explicitly reference Slots 5–6 facts. No interpretation.

CHAIN C (Slots 8–10): Choose a third pair of facts.
  Slot 8  (multiple-choice): Fact A — pure recall
  Slot 9  (multiple-choice): Fact B — pure recall
  Slot 10 (multiple-choice): CONCLUSION — question must explicitly reference Slots 8–9 facts. No interpretation.

Slot 11 (multiple-choice): Standalone factual question from the verse text.
Slot 12 (true/false): correctAnswer MUST be "True"  — state a fact that IS in the text
Slot 13 (true/false): correctAnswer MUST be "True"  — a different fact that IS in the text
Slot 14 (true/false): correctAnswer MUST be "False" — state something the text does NOT say
Slot 15 (true/false): correctAnswer MUST be "False" — state something else the text does NOT say

${jsonFormat}`;

    case 'medium':
      return `You are an expert Bible scholar creating quiz questions. Generate exactly 15 questions.

CHAPTER: ${bookName} Chapter ${chapter}

PRIMARY VERSE TEXT — Most questions MUST come from these verses:
${middleThird}

EARLIER VERSES (for contrast and cause-effect questions only):
${firstThird}

${universalRules}

DIFFICULTY: MEDIUM — Verse-to-verse connections within the chapter. Cause → effect. Command → result. No NT cross-references. No spiritual allegory.
- Every question must connect two or more verses from the chapter text.
- Ask what ONE verse says will RESULT from or FOLLOW what ANOTHER verse commands or describes.
- Ask what CHANGED between two passages in the same chapter, and what that change reveals about God's actions or character as described in the text.
- Do NOT jump to NT theology. Do NOT ask what things represent spiritually. Stay inside this chapter.

THE SOCRATIC CHAIN METHOD — same as Easy but one level deeper:
Groups of 3 questions where Slots 1–2 establish what the text says, and Slot 3 asks what this connection reveals about God's pattern, intention, or character AS DESCRIBED IN THE CHAPTER TEXT.

EXAMPLE OF A VALID MEDIUM CHAIN:
  Slot 1: "What did God command the waters to do in verse 9?" → "Gather together so dry land could appear"
  Slot 2: "What does verse 10 record happening immediately after God's command?" → "The dry land appeared and God called it Earth"
  Slot 3: "God commanded the waters to gather in verse 9 and verse 10 records it happening immediately. What pattern does this establish about the relationship between God's word and the created world?" → "God's spoken command produces immediate, complete fulfillment — the created world obeys His word without delay"
  (Still inside the chapter text — no NT jump — but now drawing a conclusion about God's character.)

QUESTION CHAIN LAYOUT — follow exactly:
CHAIN A (Slots 1–3): Command → result chain from PRIMARY VERSE TEXT
  Slot 1  (multiple-choice): What did God command or say in verse X?
  Slot 2  (multiple-choice): What does verse X+1 (or nearby verse) record happening as a result?
  Slot 3  (multiple-choice): CONCLUSION — "God commanded [X] in verse [N] and [result] happened in verse [N+1]. What does this pattern reveal about [God's word / God's character / the nature of creation]?" Answer drawn from the chapter text.

CHAIN B (Slots 4–6): Contrast chain — something changed between the EARLIER VERSES and the PRIMARY VERSE TEXT
  Slot 4  (multiple-choice): What does an earlier verse establish about [person/thing/command]?
  Slot 5  (multiple-choice): What does a verse in the PRIMARY range say about the same [person/thing/command]?
  Slot 6  (multiple-choice): CONCLUSION — "In the earlier passage [X happened], but in verse [Y] we see [Z]. What does this change or progression reveal?" Answer stays in the chapter.

CHAIN C (Slots 7–9): Evaluation / pattern chain from PRIMARY VERSE TEXT
  Slot 7  (multiple-choice): Factual question from primary range
  Slot 8  (multiple-choice): Different factual question from primary range showing a similar pattern
  Slot 9  (multiple-choice): CONCLUSION — "We've seen [Slot 7 fact] and [Slot 8 fact]. What pattern does this establish in ${bookName} ${chapter}?" Answer is the observed pattern.

Slots 10–12 (multiple-choice): Standalone cause-effect questions — each connects exactly two adjacent verses from PRIMARY VERSE TEXT. "Because verse X says [Y], what does verse X+1 say follows?"
Slot 13 (true/false): correctAnswer MUST be "True"
Slot 14 (true/false): correctAnswer MUST be "False"
Slot 15 (true/false): correctAnswer MUST be "False"

${jsonFormat}`;

    case 'hard':
      return `You are an expert Bible scholar creating quiz questions. Generate exactly 15 questions.

CHAPTER: ${bookName} Chapter ${chapter}

PRIMARY VERSE TEXT (final section — anchor most questions here):
${lastThird}

FULL CHAPTER (for cross-reference and typology questions):
${chapterText}

${universalRules}

DIFFICULTY: HARD — Typological chains with NT cross-references, word studies, literary devices.
Now the chains from Easy and Medium are completed with their theological meaning.
NT cross-references ARE required here. Word studies unlock symbolic meaning. Geography becomes theology.

THE SOCRATIC CHAIN METHOD — now completing typological chains:
Groups of 2–3 questions where earlier questions supply the premises (from the chapter text) and the final question introduces the NT cross-reference that reveals the TYPE.

EXAMPLE OF A VALID HARD CHAIN:
  Slot 1: "John 1:1 opens 'In the beginning,' deliberately echoing Genesis 1:1. What does John 1:3 claim about the Word?" → "All things were made by him; without him nothing was made"
  Slot 2: "Given that John 1:3 identifies the Word as the agent of all creation, who was speaking in Genesis 1:3 when God said 'Let there be light'?" → "Christ, the eternal Word — all creative speech in Genesis 1 is the voice of the Son"
  Slot 3: "Paul writes in 2 Corinthians 4:6 that God 'commanded the light to shine out of darkness, hath shined in our hearts.' What does Paul identify as the parallel to God's creative word in Genesis 1:3?" → "The new birth — God shining spiritual light into the human heart follows the same pattern as the first creation"
  (Each question uses the previous answer as its premise. By Slot 3 the student has reasoned from creation → Christ as creator → new creation as the same act.)

QUESTION CHAIN LAYOUT — follow exactly:
CHAIN A (Slots 1–3): Typological chain — from a detail in the PRIMARY VERSE TEXT to its NT fulfillment
  Slot 1  (multiple-choice): What does the PRIMARY TEXT say about [person/object/event]? (textual premise)
  Slot 2  (multiple-choice): What does [NT passage] say about the same [person/object/event]? (NT connection — name the passage explicitly in the question)
  Slot 3  (multiple-choice): CONCLUSION — "Given that [Slot 1 fact] and [Slot 2 NT connection], what does [original detail] represent or foreshadow?" The student has both premises and reasons to the typological conclusion.

CHAIN B (Slots 4–5): Shorter typological pair — one premise from the chapter, one NT completion
  Slot 4  (multiple-choice): Textual observation from the chapter
  Slot 5  (multiple-choice): COMPLETION — "Given what verse [X] says and what [NT passage] confirms, what does [detail] represent?" NT passage named in question.

Slot 6  (multiple-choice): WORD STUDY — "What does the Hebrew/Greek '[word]' in ${bookName} ${chapter}:[verse] mean?" 4 options; only one is correct. Explanation states why this meaning unlocks the passage's theological significance.
Slot 7  (multiple-choice): LITERARY DEVICE — Which literary technique is used in a specific passage, and what theological truth does it reveal?
Slots 8–9  (multiple-choice): CROSS-REFERENCE — "Which other Bible passage [fulfills / echoes / interprets] [theme] from this chapter?" Both passages cited in the explanation.
Slots 10–11 (multiple-choice): WHAT-REPRESENTS chains — each asks what a specific detail from the chapter represents in the full biblical narrative, with NT or OT cross-reference named in the question.
Slots 12–13 (multiple-choice): Additional typological, word-study, or cross-reference questions from the chapter.
Slot 14 (true/false): correctAnswer MUST be "True"
Slot 15 (true/false): correctAnswer MUST be "False"

CRITICAL: For every typological or representation question, the NT/OT cross-reference MUST be named inside the question itself (not just in the explanation), so the student can reason toward the answer using the reference as a clue.

${jsonFormat}`;

    case 'theological':
      return `You are a seminary professor creating advanced biblical theology questions. Generate exactly 15 questions.

CHAPTER: ${bookName} Chapter ${chapter}

FULL CHAPTER TEXT (KJV):
${chapterText}

${universalRules}

DIFFICULTY: THEOLOGICAL — Full Socratic chains that end at soteriological doctrine. Every chain should answer the question: "What does this mean for salvation?"

STRICT PROHIBITION: No factual recall ("What did X do?", "Who said Y?"). Every question requires theological reasoning built on premises established in the chain.

VERSE SPREAD: Draw from at least 10 distinct verses.

ALL 15 questions must be multiple-choice. No true/false.

THE SOCRATIC CHAIN METHOD — full chains ending at gospel truth:
Each chain consists of 3–4 questions. The first questions supply premises (what the text says, what the NT confirms). The final question of each chain asks the student to synthesize those premises into a doctrinal conclusion about salvation, redemption, or the nature of God.

The student should feel: "I already knew each piece — now I see what it all means together."

EXAMPLE OF A COMPLETE THEOLOGICAL CHAIN:
  Q1: "Genesis 1:1-2 describes the earth as formless, void, and dark — and the Spirit of God moving over the waters. In John 3:5, Jesus says you must be born of water and Spirit. What does the Spirit's movement over the chaos in Genesis 1:2 foreshadow?" → "The Spirit's role in regeneration — bringing new life and order out of spiritual darkness and emptiness"
  Q2: "Paul writes in 2 Corinthians 4:6 that God 'commanded the light to shine out of darkness, hath shined in our hearts.' What does Paul identify God's command in Genesis 1:3 as a direct parallel to?" → "The new birth — salvation follows the same creative pattern: Spirit moves, God speaks, light appears"
  Q3: "Given that Genesis 1:2-3 shows Spirit + Word producing light from chaos, and 2 Corinthians 4:6 applies this pattern to salvation, what doctrine do these passages together establish?" → "Regeneration is an act of new creation — God does not improve the old nature, He creates anew by His Spirit and Word, exactly as He created the cosmos"
  (Each question used the previous answer as its premise. By Q3 the student has reasoned to a full doctrinal statement from two OT-NT premises.)

CHAIN LAYOUT — follow exactly:
CHAIN A (Slots 1–3): Choose a typological chain from this chapter → NT fulfillment → soteriological doctrine
  Slot 1: Premise from the chapter text — what does this passage establish?
  Slot 2: NT confirmation — "Given [Slot 1 premise], what does [NT passage] reveal about its fulfillment or meaning?" Name the NT passage in the question.
  Slot 3: DOCTRINAL CONCLUSION — "Given [Slot 1] and [Slot 2], what doctrine do these passages together teach?" The student synthesizes both premises.

CHAIN B (Slots 4–6): Different chain — attribute of God → its redemptive implication
  Slot 4: Which divine attribute does a specific verse demonstrate? (name the verse)
  Slot 5: How does a different verse in this chapter show this same attribute operating in a different way?
  Slot 6: CONCLUSION — "Given that [Slot 4] and [Slot 5] both show God's [attribute], what does this reveal about how God accomplishes redemption?" Synthesize toward salvation.

CHAIN C (Slots 7–9): Narrative arc chain — OT type → NT fulfillment → what this means for the believer today
  Slot 7: What does this chapter establish in the redemptive narrative?
  Slot 8: How does a NT passage fulfill or complete what this chapter began? (name the passage)
  Slot 9: CONCLUSION — "Given [Slot 7] and [Slot 8], what does the full arc from [chapter] to [NT passage] teach about [salvation / grace / human inability / God's faithfulness]?"

Slot 10 (multiple-choice): SYNTHESIS — "What combined doctrine do ${bookName} ${chapter}:[X] and ${bookName} ${chapter}:[Y] teach about [topic]?" Both verse numbers must appear in the question text.
Slot 11 (multiple-choice): APOLOGETICS — "Sceptics claim [specific objection about this chapter]. What does ${bookName} ${chapter}:[verse] actually teach?" One correct answer, three plausible misreadings.
Slots 12–15 (multiple-choice): Additional chains or synthesis questions from unused verses — each must connect at least two verses and end at a doctrinal or typological conclusion.

CROSS-REFERENCE LIMIT: Max 2 verses from other books per explanation. No hallucinated references.
DENOMINATIONS: Avoid Reformed vs. Arminian, Young Earth vs. Old Earth. Focus on Apostles'/Nicene Creed truths.

FINAL COUNT CHECK: Count your questions array before returning. It MUST contain exactly 15 items. If you have 13 or 14, complete the missing slots from Slots 12–15 now.

${jsonFormat}`;

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
      // Use smarter model after 2 failed attempts, unless overridden by --model flag
      const model = modelOverride ?? (attempt <= 2 ? 'gpt-4o-mini' : 'gpt-4.1-mini');
      if (!modelOverride && attempt === 3) console.warn(`    Upgrading to gpt-4.1-mini for attempt ${attempt}...`);
      const response = await client.chat.completions.create({
        model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert Bible scholar and quiz creator. You always return valid JSON with exactly the structure requested. You never include markdown formatting or code fences in your response.'
          },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: tab === 'theological' ? 5000 : 4000,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('Empty response from OpenAI');
      }

      const parsed = JSON.parse(content);
      let questions: AIQuestion[] = parsed.questions;

      // Auto-normalize common GPT mistakes
      for (const q of questions) {
        // Normalize type strings — model sometimes writes "true/false" instead of "true-false"
        const rawType = (q.type as string).toLowerCase().replace(/[_\/\s]+/g, '-');
        if (rawType === 'true-false' || rawType === 'truefalse' || rawType === 'true-or-false') {
          q.type = 'true-false';
        } else if (rawType === 'fill-blank' || rawType === 'fill-in-the-blank') {
          q.type = 'multiple-choice';
        }
        // Normalize true/false options if model wrote something other than ["True","False"]
        if (q.type === 'true-false') {
          q.options = ['True', 'False'];
          // Normalize correctAnswer capitalisation
          const ca = String(q.correctAnswer).trim().toLowerCase();
          q.correctAnswer = ca === 'true' ? 'True' : 'False';
        }
        // Shuffle MC options — model always puts correct answer first (option A bias)
        if (q.type === 'multiple-choice' && Array.isArray(q.options) && q.options.length > 1) {
          for (let i = q.options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [q.options[i], q.options[j]] = [q.options[j], q.options[i]];
          }
          // correctAnswer holds the text value, not the index — no update needed
        }
      }
      // Trim to 15 if GPT returned 16-17
      if (questions.length > 15) {
        questions = questions.slice(0, 15);
      }

      const inputTokens = response.usage?.prompt_tokens || 0;
      const outputTokens = response.usage?.completion_tokens || 0;
      const pricing = COST_PER_1M[model] ?? { input: INPUT_COST_PER_1M, output: OUTPUT_COST_PER_1M };
      const cost = (inputTokens / 1_000_000) * pricing.input + (outputTokens / 1_000_000) * pricing.output;

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

      // Rate limit handling — use exponential backoff starting at 60s
      if (msg.includes('429') || msg.includes('rate_limit')) {
        const backoff = 60000 * attempt; // 60s, 120s, 180s
        console.warn(`    OpenAI rate limited, waiting ${backoff / 1000}s (attempt ${attempt}/${MAX_RETRIES})...`);
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

  const expectedDist: Record<TabLevel, { mc: [number, number]; tf: [number, number] }> = {
    easy: { mc: [11, 11], tf: [4, 4] },
    medium: { mc: [12, 12], tf: [3, 3] },
    hard: { mc: [13, 13], tf: [2, 2] },
    theological: { mc: [15, 15], tf: [0, 0] },
  };

  const dist = expectedDist[tab];
  if (mcCount < dist.mc[0] || mcCount > dist.mc[1]) {
    errors.push(`${tab}: expected ${dist.mc[0]}-${dist.mc[1]} MC, got ${mcCount}`);
  }
  if (tfCount < dist.tf[0] || tfCount > dist.tf[1]) {
    errors.push(`${tab}: expected ${dist.tf[0]}-${dist.tf[1]} T/F, got ${tfCount}`);
  }

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    if (!q.question || typeof q.question !== 'string') {
      errors.push(`Q${i + 1}: missing question text`);
      continue;
    }

    if (!q.type || !['multiple-choice', 'true-false'].includes(q.type)) {
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
  model?: string; // override model for all attempts
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

      case '--model':
        options.model = args[i + 1];
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

  // Set module-level flags
  fallbackEnabled = options.fallback;
  if (options.model) modelOverride = options.model;

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
