#!/usr/bin/env npx tsx
/**
 * Bible Quiz Generator
 *
 * Fetches chapter text from Bolls.life API and generates quiz questions
 * programmatically using template-based NLP extraction patterns.
 *
 * Usage:
 *   npx tsx scripts/generate-quizzes.ts mark 1
 *   npx tsx scripts/generate-quizzes.ts genesis 1-50
 *   npx tsx scripts/generate-quizzes.ts --all
 *   npx tsx scripts/generate-quizzes.ts --seed 42 mark 1
 */

import * as fs from 'fs';
import * as path from 'path';

// =============================================================================
// TYPES (mirroring lib/types.ts without import path issues)
// =============================================================================

type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank';
type DifficultyLevel = 'easy' | 'medium' | 'hard';

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
  book: string;
  chapter: number;
  questions: QuizQuestion[];
  difficulty: DifficultyLevel;
  isBookQuiz: boolean;
  slug: string;
  tags: string[];
  totalQuestions: number;
  estimatedTime: number;
}

interface BollsVerse {
  pk: number;
  verse: number;
  text: string;
  comment?: string;
}

// =============================================================================
// SEEDED RANDOM (deterministic output)
// =============================================================================

let rngState = Date.now();

function seedRng(seed: number): void {
  rngState = seed;
}

function seededRandom(): number {
  // xorshift32
  rngState ^= rngState << 13;
  rngState ^= rngState >> 17;
  rngState ^= rngState << 5;
  return (rngState >>> 0) / 4294967296;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

const BASE_URL = 'https://bolls.life';
const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const OUTPUT_DIR = path.resolve(SCRIPT_DIR, '..', 'data', 'quizzes');
const QUESTIONS_PER_CHAPTER = 16;
const RATE_LIMIT_MS = 500;
const FETCH_TIMEOUT_MS = 15000;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;
const CONCURRENT_FETCHES = 3;

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

// OT book IDs: 1-39, NT: 40-66
const OT_BOOK_IDS = new Set(Object.entries(BOOK_IDS).filter(([, id]) => id <= 39).map(([slug]) => slug));

function isOTBook(bookSlug: string): boolean {
  return OT_BOOK_IDS.has(bookSlug);
}

// =============================================================================
// HELPERS
// =============================================================================

function stripHtml(html: string): string {
  return html
    .replace(/<S>\d+<\/S>/g, '')    // Strong's number tags from Bolls API
    .replace(/<sup>.*?<\/sup>/g, '') // Bolls API superscript annotations
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function capitalizeWords(s: string): string {
  return s.replace(/\b[a-z]/g, c => c.toUpperCase());
}

// =============================================================================
// API (with retry, timeout, validation)
// =============================================================================

async function fetchChapter(bookSlug: string, chapter: number): Promise<BollsVerse[]> {
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
        const backoff = RETRY_DELAY_MS * attempt;
        console.warn(`  Rate limited, waiting ${backoff}ms before retry ${attempt}/${MAX_RETRIES}...`);
        await sleep(backoff);
        continue;
      }

      if (!response.ok) {
        if (response.status >= 500 && attempt < MAX_RETRIES) {
          console.warn(`  Server error ${response.status}, retry ${attempt}/${MAX_RETRIES}...`);
          await sleep(RETRY_DELAY_MS * attempt);
          continue;
        }
        throw new Error(`API error ${response.status}: ${url}`);
      }

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error(`Invalid API response for ${bookSlug} ${chapter}: expected non-empty array`);
      }

      const first = data[0];
      if (typeof first.verse !== 'number' || typeof first.text !== 'string') {
        throw new Error(`Malformed verse data for ${bookSlug} ${chapter}`);
      }

      return data as BollsVerse[];
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        if (attempt < MAX_RETRIES) {
          console.warn(`  Fetch timeout, retry ${attempt}/${MAX_RETRIES}...`);
          await sleep(RETRY_DELAY_MS);
          continue;
        }
        throw new Error(`Fetch timeout after ${MAX_RETRIES} attempts: ${url}`);
      }
      if (attempt >= MAX_RETRIES) throw err;
      await sleep(RETRY_DELAY_MS * attempt);
    }
  }

  throw new Error(`Failed after ${MAX_RETRIES} retries: ${url}`);
}

// =============================================================================
// VERSE ANALYSIS
// =============================================================================

interface VerseFact {
  verse: number;
  text: string;
  subject: string | null;
  people: string[];
  places: string[];
  numbers: string[];
  actions: ActionFact[];
  quotes: string[];
}

interface ActionFact {
  verb: string;
  agent: string | null;
  patient: string | null;
  clause: string;
  priority: number; // 1=high (baptized, healed), 3=low (came, went)
}

const BIBLICAL_NAMES = new Set([
  'God', 'Lord', 'LORD', 'Jesus', 'Christ', 'Spirit', 'Holy Ghost',
  'Abraham', 'Abram', 'Isaac', 'Jacob', 'Israel', 'Moses', 'Aaron', 'David', 'Solomon', 'Samuel',
  'Adam', 'Eve', 'Noah', 'Cain', 'Abel', 'Lot', 'Sarah', 'Sarai', 'Hagar', 'Rebekah', 'Rachel', 'Leah',
  'Joseph', 'Benjamin', 'Judah', 'Reuben', 'Simeon', 'Levi', 'Esau', 'Ishmael',
  'Joshua', 'Caleb', 'Gideon', 'Samson', 'Ruth', 'Boaz', 'Naomi', 'Deborah', 'Barak',
  'Elijah', 'Elisha', 'Isaiah', 'Jeremiah', 'Ezekiel', 'Daniel',
  'Saul', 'Jonathan', 'Absalom', 'Joab', 'Nathan', 'Bathsheba',
  'Eli', 'Hannah', 'Nehemiah', 'Ezra', 'Mordecai', 'Esther', 'Haman',
  'Rahab', 'Balaam', 'Balak', 'Potiphar',
  'Peter', 'Simon', 'Andrew', 'James', 'John', 'Philip', 'Bartholomew',
  'Matthew', 'Thomas', 'Judas', 'Thaddaeus', 'Paul', 'Barnabas', 'Timothy',
  'Mary', 'Martha', 'Lazarus', 'Nicodemus', 'Pilate', 'Herod',
  'Mark', 'Luke', 'Stephen', 'Cornelius', 'Lydia', 'Silas', 'Apollos',
  'Caiaphas', 'Annas', 'Zacchaeus', 'Priscilla', 'Aquila',
  'Satan', 'Pharaoh',
  'John the Baptist',
]);

// Precompiled name patterns for performance
const BIBLICAL_NAME_PATTERNS: { name: string; regex: RegExp }[] =
  Array.from(BIBLICAL_NAMES)
    .sort((a, b) => b.length - a.length) // match longer names first ("John the Baptist" before "John")
    .map(name => ({
      name,
      regex: new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`),
    }));

// Case-insensitive version for LORD/Lord matching
const BIBLICAL_NAME_PATTERNS_CI: { name: string; regex: RegExp }[] =
  Array.from(BIBLICAL_NAMES)
    .sort((a, b) => b.length - a.length)
    .map(name => ({
      name,
      regex: new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'),
    }));

const BIBLICAL_PLACES = new Set([
  'Eden', 'Canaan', 'Egypt', 'Babylon', 'Assyria', 'Judah',
  'Jerusalem', 'Bethlehem', 'Nazareth', 'Galilee', 'Samaria', 'Jordan',
  'Sinai', 'Horeb', 'Moriah', 'Zion', 'Carmel', 'Tabor',
  'Capernaum', 'Bethsaida', 'Tyre', 'Sidon', 'Damascus',
  'Rome', 'Corinth', 'Ephesus', 'Antioch', 'Philippi', 'Thessalonica',
  'Judaea', 'Decapolis', 'Gennesaret', 'Gethsemane', 'Golgotha', 'Calvary',
  'Sea of Galilee', 'Red Sea', 'Dead Sea', 'Mediterranean',
  'Jericho', 'Bethany', 'Beersheba', 'Hebron', 'Shiloh', 'Gilgal',
  'Nineveh', 'Tarshish', 'Ur', 'Haran', 'Shechem', 'Dothan',
]);
// Removed 'wilderness', 'temple', 'synagogue' - too generic as place names

// Precompiled place patterns
const BIBLICAL_PLACE_PATTERNS: { place: string; regex: RegExp }[] =
  Array.from(BIBLICAL_PLACES)
    .sort((a, b) => b.length - a.length)
    .map(place => ({
      place,
      regex: new RegExp(`\\b${place.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'),
    }));

const NUMBER_WORDS: Record<string, string> = {
  'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5',
  'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10',
  'eleven': '11', 'twelve': '12', 'thirty': '30', 'forty': '40',
  'fifty': '50', 'seventy': '70', 'hundred': '100', 'thousand': '1000',
  'first': '1st', 'second': '2nd', 'third': '3rd', 'fourth': '4th',
  'fifth': '5th', 'sixth': '6th', 'seventh': '7th',
};

const HIGH_PRIORITY_VERBS = new Set([
  'baptize', 'baptized', 'preach', 'preached', 'preaching',
  'healed', 'healing', 'cast out', 'forgave', 'forgive',
  'prayed', 'praying', 'taught', 'teaching', 'created',
  'blessed', 'cursed', 'crucified', 'rose', 'risen',
  'ascended', 'descended', 'tempted', 'fasted', 'fasting',
  'repent', 'repentance', 'prophesied', 'anointed', 'rebuked',
  'raised', 'delivered', 'betrayed', 'denied', 'confessed',
  'believed', 'commanded', 'ordained', 'appointed',
]);

const LOW_PRIORITY_VERBS = new Set([
  'came', 'went', 'departed', 'followed', 'follow',
  'said', 'called', 'sent', 'chosen',
]);

// Precompute verb list and patterns
const ALL_VERBS = [...Array.from(HIGH_PRIORITY_VERBS), ...Array.from(LOW_PRIORITY_VERBS)];
const VERB_PATTERNS: { verb: string; regex: RegExp; priority: number }[] =
  ALL_VERBS.map(verb => ({
    verb,
    regex: new RegExp(`\\b${verb.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'),
    priority: HIGH_PRIORITY_VERBS.has(verb) ? 1 : 3,
  }));

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function findGrammaticalSubject(text: string, people: string[]): string | null {
  const sentences = text.split(/[.;?!]/);
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;
    for (const person of people) {
      // Direct start: "Moses said..." or "And Moses said..."
      const startPattern = new RegExp(
        `^(?:And\\s+|Now\\s+|But\\s+|Then\\s+|For\\s+)?(?:the\\s+)?${escapeRegex(person)}\\b`, 'i'
      );
      if (startPattern.test(trimmed)) return person;
      // Inverted KJV order: "Then said Jesus" / "And said the LORD"
      const invertedPattern = new RegExp(
        `^(?:And\\s+|Now\\s+|But\\s+|Then\\s+|For\\s+)?(?:said|spake|answered|cried)\\s+(?:the\\s+)?${escapeRegex(person)}\\b`, 'i'
      );
      if (invertedPattern.test(trimmed)) return person;
      const thatPattern = new RegExp(`\\bthat\\s+${escapeRegex(person)}\\b`, 'i');
      if (thatPattern.test(trimmed)) return person;
    }
  }
  return null;
}

function isInPrepositionalContext(text: string, name: string): boolean {
  const preps = ['of', 'from', 'by', 'through', 'with', 'unto', 'upon', 'before', 'after', 'against'];
  for (const prep of preps) {
    const pattern = new RegExp(`\\b${prep}\\s+(?:the\\s+)?${escapeRegex(name)}\\b`, 'i');
    if (pattern.test(text)) return true;
  }
  const ofPattern = new RegExp(`\\w+\\s+of\\s+(?:the\\s+)?${escapeRegex(name)}\\b`, 'i');
  return ofPattern.test(text);
}

function findClosestPerson(text: string, verb: string, people: string[]): string | null {
  const lowerText = text.toLowerCase();
  const verbIdx = lowerText.indexOf(verb.toLowerCase());
  if (verbIdx === -1) return null;

  let closest: string | null = null;
  let closestDist = Infinity;

  for (const person of people) {
    // Find ALL occurrences, not just the first
    const lowerPerson = person.toLowerCase();
    let searchFrom = 0;
    while (searchFrom < lowerText.length) {
      const idx = lowerText.indexOf(lowerPerson, searchFrom);
      if (idx === -1) break;
      const dist = Math.abs(idx - verbIdx);
      if (dist < closestDist) {
        closestDist = dist;
        closest = person;
      }
      searchFrom = idx + 1;
    }
  }
  return closest;
}

function detectAgentPatient(
  text: string, verb: string, people: string[]
): { agent: string | null; patient: string | null } {
  const escaped = escapeRegex(verb);

  // Passive: "tempted of/by X" -> X is agent
  const passivePattern = new RegExp(`${escaped}\\s+(?:of|by)\\s+(\\w+)`, 'i');
  const passiveMatch = text.match(passivePattern);
  if (passiveMatch) {
    const agentName = people.find(
      p => p.toLowerCase() === passiveMatch[1].toLowerCase()
    ) || passiveMatch[1];
    const remainingPeople = people.filter(p => p !== agentName);
    const patientName = findClosestPerson(text, verb, remainingPeople)
      || findGrammaticalSubject(text, remainingPeople);
    return { agent: agentName, patient: patientName };
  }

  // Active: prefer the person closest to the verb over sentence-initial subject
  // Exclude God/Lord only when they appear in prepositional context
  const closestToVerb = findClosestPerson(text, verb, people.filter(
    p => (p !== 'God' && p !== 'Lord' && p !== 'LORD') || !isInPrepositionalContext(text, p)
  ));
  const subject = findGrammaticalSubject(text, people);

  // If the closest person to the verb is different from the sentence subject,
  // and the subject appears in a subordinate clause ("after that X was..."),
  // prefer the closest person
  const subordinatePattern = /^(?:And\s+|Now\s+|But\s+)?(?:after\s+(?:that\s+)?|when\s+|before\s+)/i;
  if (closestToVerb && subject && closestToVerb !== subject && subordinatePattern.test(text)) {
    return { agent: closestToVerb, patient: null };
  }

  return { agent: closestToVerb || subject, patient: null };
}

function extractActionClause(text: string, verb: string): string {
  const escaped = escapeRegex(verb);
  const pattern = new RegExp(
    `\\b${escaped}\\b\\s+(.{5,50})(?:\\.|,|;|:|and\\b|$)`, 'i'
  );
  const match = text.match(pattern);
  if (match && match[1]) {
    const tail = match[1].trim().replace(/[\s,;:]+$/, '');
    return `${verb} ${tail}`;
  }
  return verb;
}

function analyzeVerse(verse: BollsVerse, bookSlug: string): VerseFact {
  const text = stripHtml(verse.text);

  // Detect people using precompiled case-insensitive patterns (handles LORD/Lord)
  const people: string[] = [];
  const seenPeopleNorm = new Set<string>();
  for (const { name, regex } of BIBLICAL_NAME_PATTERNS_CI) {
    if (regex.test(text)) {
      const norm = name.toLowerCase();
      // Merge LORD/Lord into a canonical form
      if (norm === 'lord' && seenPeopleNorm.has('lord')) continue;
      if (!seenPeopleNorm.has(norm)) {
        seenPeopleNorm.add(norm);
        // Normalize LORD -> Lord for consistent display
        const displayName = name === 'LORD' ? 'Lord' : name;
        people.push(displayName);
      }
    }
  }

  const subject = findGrammaticalSubject(text, people);

  // Detect places using precompiled patterns
  const places: string[] = [];
  for (const { place, regex } of BIBLICAL_PLACE_PATTERNS) {
    if (regex.test(text)) places.push(place);
  }

  const numbers: string[] = [];
  const digitMatch = text.match(/\b\d+\b/g);
  if (digitMatch) numbers.push(...digitMatch);
  for (const [word] of Object.entries(NUMBER_WORDS)) {
    if (new RegExp(`\\b${word}\\b`, 'i').test(text)) numbers.push(word);
  }

  const quotes: string[] = [];
  for (const pattern of [
    /saying,?\s*["']?(.+?)["']?\s*(?:\.|$)/i,
    /said,?\s*["']?(.+?)["']?\s*(?:\.|$)/i,
    /saith,?\s*["']?(.+?)["']?\s*(?:\.|$)/i,
  ]) {
    const match = text.match(pattern);
    if (match) quotes.push(match[1].trim());
  }

  const actions: ActionFact[] = [];
  for (const { verb, regex, priority } of VERB_PATTERNS) {
    if (!regex.test(text)) continue;
    const { agent, patient } = detectAgentPatient(text, verb, people);
    const clause = extractActionClause(text, verb);
    actions.push({ verb, agent, patient, clause, priority });
  }
  actions.sort((a, b) => a.priority - b.priority);

  return { verse: verse.verse, text, subject, people, places, numbers, actions, quotes };
}

// =============================================================================
// QUESTION GENERATORS
// =============================================================================

interface QuestionCandidate {
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  verseReference: string;
  difficulty: DifficultyLevel;
  quality: number;
}

const DIVINE_ENTITIES = new Set(['God', 'Lord', 'LORD', 'Spirit', 'Holy Ghost', 'Christ']);

function displayNameFn(name: string): string {
  if (name === 'Lord' || name === 'LORD' || name === 'God' || name === 'Spirit' || name === 'Holy Ghost' || name === 'Christ') return `the ${name === 'LORD' ? 'Lord' : name}`;
  return name;
}

function normalizeVerbClause(clause: string): string {
  return clause
    .replace(/^did\s+/i, '')
    .replace(/^was\s+was\s+/i, 'was ')
    .replace(/[\s,;:]+$/, '');
}

const KJV_VERB_STARTS = /^(?:did\s+)?(?:baptize[ds]?|preach(?:ed|ing)?|heal(?:ed|ing)|cast|taught|teach|pray(?:ed|ing)|creat(?:ed|ing)|bless(?:ed|ing)|curs(?:ed|ing)|sent|call(?:ed|ing)|crucifi(?:ed)|rose|risen|ascend(?:ed)|descend(?:ed)|tempt(?:ed|ing)|fast(?:ed|ing)|follow(?:ed|ing)|command(?:ed)|rebuk(?:ed)|deliver(?:ed)|betray(?:ed)|deni(?:ed)|confess(?:ed)|believ(?:ed)|anoint(?:ed)|prophesi(?:ed)|forgave|ordain(?:ed)|appoint(?:ed)|said|came|went|depart(?:ed)|was|were|had|shall|have|saw|clothed|driveth|like|spake|begat|built|slew|smote|took|gave|made|brought|set|put)\b/i;

function generateWhoQuestion(
  fact: VerseFact, bookName: string, chapter: number, chapterPeople: string[]
): QuestionCandidate | null {
  if (!fact.subject) return null;
  if (!BIBLICAL_NAMES.has(fact.subject) && fact.subject !== 'Lord') return null;

  const person = fact.subject;
  // Removed dead guard: person !== fact.subject is always false

  const escaped = escapeRegex(person);
  const personRegex = new RegExp(
    `${escaped}\\s+((?:did\\s+)?(?:\\w+)(?:\\s+\\w+){0,8}?)(?:\\.|,|;|:|$)`, 'i'
  );
  const match = fact.text.match(personRegex);
  if (!match) return null;

  let actionClause = normalizeVerbClause(match[1].trim());
  if (actionClause.length < 5 || actionClause.length > 80) return null;

  if (!KJV_VERB_STARTS.test(actionClause)) return null;

  const genericSingle = /^(?:came|went|was|had|is|are|were|said)$/i;
  if (genericSingle.test(actionClause)) return null;

  const distractors = pickPersonDistractors(person, chapterPeople, 3);
  if (distractors.length < 3) return null;

  return {
    question: `According to ${bookName} ${chapter}:${fact.verse}, who ${actionClause}?`,
    type: 'multiple-choice',
    options: shuffleArray([person, ...distractors]),
    correctAnswer: person,
    explanation: `${bookName} ${chapter}:${fact.verse} states: "${truncate(fact.text, 120)}"`,
    verseReference: `${bookName} ${chapter}:${fact.verse}`,
    difficulty: 'medium',
    quality: 7,
  };
}

function generateWhereQuestion(
  fact: VerseFact, bookName: string, chapter: number, chapterPlaces: string[]
): QuestionCandidate | null {
  if (fact.places.length === 0) return null;

  const place = fact.places[0];
  const actor = fact.subject || fact.people.find(p => !isInPrepositionalContext(fact.text, p));

  let questionText: string;
  if (actor && !DIVINE_ENTITIES.has(actor)) {
    questionText = `Where was ${displayNameFn(actor)} according to ${bookName} ${chapter}:${fact.verse}?`;
  } else if (actor && DIVINE_ENTITIES.has(actor)) {
    questionText = `What location is mentioned in ${bookName} ${chapter}:${fact.verse}?`;
  } else if (fact.actions.length > 0) {
    questionText = `Where did the events of ${bookName} ${chapter}:${fact.verse} take place?`;
  } else {
    questionText = `What location is mentioned in ${bookName} ${chapter}:${fact.verse}?`;
  }

  const distractors = pickPlaceDistractors(place, chapterPlaces, 3);
  if (distractors.length < 3) return null;

  const displayPlace = capitalizeWords(place);

  return {
    question: questionText,
    type: 'multiple-choice',
    options: shuffleArray([displayPlace, ...distractors.map(d => capitalizeWords(d))]),
    correctAnswer: displayPlace,
    explanation: `${bookName} ${chapter}:${fact.verse} states: "${truncate(fact.text, 120)}"`,
    verseReference: `${bookName} ${chapter}:${fact.verse}`,
    difficulty: 'medium',
    quality: 6,
  };
}

function generateWhatQuestion(
  fact: VerseFact, bookName: string, chapter: number, chapterPeople: string[], bookSlug: string
): QuestionCandidate | null {
  const text = fact.text;
  if (text.length < 20) return null;

  const bestAction = fact.actions.find(a => a.priority === 1) || null;
  if (!bestAction) return null;

  const actor = bestAction.agent || fact.subject;
  if (!actor) return null;
  if (!BIBLICAL_NAMES.has(actor) && actor !== 'Lord') return null;
  // Allow God AND Lord for "What did..." questions
  if (DIVINE_ENTITIES.has(actor) && actor !== 'God' && actor !== 'Lord') return null;
  if (isInPrepositionalContext(text, actor) && !fact.subject && !bestAction.agent) return null;

  const answer = buildContextualAnswer(text, actor, bestAction, bookSlug);
  if (!answer || answer.length < 8) return null;

  const distractors = buildContextualDistractions(bestAction.verb, answer, bookSlug);
  if (distractors.length < 3) return null;

  const nameDisplay = displayNameFn(actor);

  return {
    question: `What did ${nameDisplay} do in ${bookName} ${chapter}:${fact.verse}?`,
    type: 'multiple-choice',
    options: shuffleArray([answer, ...distractors]),
    correctAnswer: answer,
    explanation: `${bookName} ${chapter}:${fact.verse} states: "${truncate(text, 120)}"`,
    verseReference: `${bookName} ${chapter}:${fact.verse}`,
    difficulty: 'medium',
    quality: bestAction.priority === 1 ? 8 : 5,
  };
}

function generateTrueFalseFromFact(
  fact: VerseFact, bookName: string, chapter: number, chapterPeople: string[]
): QuestionCandidate | null {
  const text = fact.text;

  if (fact.actions.length > 0 && fact.subject) {
    const bestAction = fact.actions.find(a => a.priority === 1) || fact.actions[0];
    const actor = bestAction.agent || fact.subject;
    const fullClause = buildTFClause(text, actor, bestAction);
    if (!fullClause || fullClause.length < 10) return null;

    const makeTrue = seededRandom() > 0.5;

    if (makeTrue) {
      return {
        question: `In ${bookName} ${chapter}:${fact.verse}, ${displayNameFn(actor)} ${fullClause}.`,
        type: 'true-false',
        correctAnswer: 'true',
        explanation: `This is correct. ${bookName} ${chapter}:${fact.verse} states: "${truncate(text, 100)}"`,
        verseReference: `${bookName} ${chapter}:${fact.verse}`,
        difficulty: 'easy',
        quality: 6,
      };
    } else {
      const wrongPerson = pickOneDistractorPerson(actor, chapterPeople);
      if (!wrongPerson) return null;
      return {
        question: `In ${bookName} ${chapter}:${fact.verse}, ${displayNameFn(wrongPerson)} ${fullClause}.`,
        type: 'true-false',
        correctAnswer: 'false',
        explanation: `This is false. It was ${displayNameFn(actor)}, not ${wrongPerson}, who ${fullClause}. ${bookName} ${chapter}:${fact.verse} states: "${truncate(text, 100)}"`,
        verseReference: `${bookName} ${chapter}:${fact.verse}`,
        difficulty: 'easy',
        quality: 7,
      };
    }
  }

  if (fact.places.length > 0 && fact.subject) {
    const place = fact.places[0];
    const makeTrue = seededRandom() > 0.5;
    const placeDisplay = capitalizeWords(place);

    if (makeTrue) {
      return {
        question: `The events of ${bookName} ${chapter}:${fact.verse} take place in ${placeDisplay}.`,
        type: 'true-false',
        correctAnswer: 'true',
        explanation: `This is correct. ${bookName} ${chapter}:${fact.verse} states: "${truncate(text, 100)}"`,
        verseReference: `${bookName} ${chapter}:${fact.verse}`,
        difficulty: 'easy',
        quality: 5,
      };
    } else {
      const wrongPlace = getRandomDifferentPlace(place);
      return {
        question: `The events of ${bookName} ${chapter}:${fact.verse} take place in ${wrongPlace}.`,
        type: 'true-false',
        correctAnswer: 'false',
        explanation: `This is false. The verse mentions ${placeDisplay}, not ${wrongPlace}. ${bookName} ${chapter}:${fact.verse} states: "${truncate(text, 100)}"`,
        verseReference: `${bookName} ${chapter}:${fact.verse}`,
        difficulty: 'easy',
        quality: 6,
      };
    }
  }

  return null;
}

function generateClozeQuestion(
  fact: VerseFact, bookName: string, chapter: number, chapterPeople: string[]
): QuestionCandidate | null {
  const text = fact.text;
  if (text.length < 30) return null;

  let blankWord: string | null = null;
  let blankCategory: 'person' | 'place' | 'word' = 'word';

  if (fact.people.length > 0 && fact.people[0] !== 'God' && fact.people[0] !== 'Lord') {
    blankWord = fact.people[0];
    blankCategory = 'person';
  } else if (fact.places.length > 0) {
    blankWord = fact.places[0];
    blankCategory = 'place';
  } else {
    const importantWords = extractImportantWords(text);
    if (importantWords.length > 0) blankWord = importantWords[0];
  }

  if (!blankWord) return null;

  // Replace ALL occurrences of the blank word so the answer isn't visible
  const blankRegex = new RegExp(`\\b${escapeRegex(blankWord)}\\b`, 'gi');
  const clozeSentence = text.replace(blankRegex, '______');
  if (clozeSentence === text) return null;

  let distractors: string[];
  if (blankCategory === 'person') {
    distractors = pickPersonDistractors(blankWord, chapterPeople, 3);
  } else if (blankCategory === 'place') {
    distractors = getPlaceDistractors(blankWord);
  } else {
    distractors = getWordDistractors(blankWord);
  }

  if (distractors.length < 3) return null;

  return {
    question: `Complete this verse from ${bookName} ${chapter}:${fact.verse}: "${truncate(clozeSentence, 150)}"`,
    type: 'fill-blank',
    options: shuffleArray([blankWord, ...distractors.slice(0, 3)]),
    correctAnswer: blankWord,
    explanation: `The complete verse reads: "${truncate(text, 120)}"`,
    verseReference: `${bookName} ${chapter}:${fact.verse}`,
    difficulty: 'hard',
    quality: 8,
  };
}

// Generate a quote-based question from detected quotes
function generateQuoteQuestion(
  fact: VerseFact, bookName: string, chapter: number, chapterPeople: string[]
): QuestionCandidate | null {
  if (fact.quotes.length === 0) return null;
  if (!fact.subject) return null;

  const speaker = fact.subject;
  if (!BIBLICAL_NAMES.has(speaker) && speaker !== 'Lord') return null;
  if (speaker === 'God' || speaker === 'Lord' || speaker === 'LORD') return null;

  const quote = truncate(fact.quotes[0], 80);
  if (quote.length < 10) return null;

  const distractors = pickPersonDistractors(speaker, chapterPeople, 3);
  if (distractors.length < 3) return null;

  return {
    question: `Who said "${quote}" in ${bookName} ${chapter}:${fact.verse}?`,
    type: 'multiple-choice',
    options: shuffleArray([speaker, ...distractors]),
    correctAnswer: speaker,
    explanation: `${bookName} ${chapter}:${fact.verse} states: "${truncate(fact.text, 120)}"`,
    verseReference: `${bookName} ${chapter}:${fact.verse}`,
    difficulty: 'medium',
    quality: 7,
  };
}

// Generate a number-based question from detected numbers
function generateNumberQuestion(
  fact: VerseFact, bookName: string, chapter: number
): QuestionCandidate | null {
  if (fact.numbers.length === 0) return null;
  if (fact.text.length < 20) return null;

  const number = fact.numbers[0];
  // Only use meaningful numbers (not verse refs or trivial ones)
  const numVal = parseInt(number, 10);
  if (!isNaN(numVal) && (numVal < 2 || numVal > 10000)) return null;

  const blankRegex = new RegExp(`\\b${escapeRegex(number)}\\b`);
  const clozeSentence = fact.text.replace(blankRegex, '______');
  if (clozeSentence === fact.text) return null;

  // Generate number distractors
  const distractorNums = new Set<string>();
  if (!isNaN(numVal)) {
    const offsets = [1, 2, 3, 5, 10, -1, -2, -3];
    for (const offset of offsets) {
      const d = numVal + offset;
      if (d > 0 && d !== numVal) distractorNums.add(String(d));
      if (distractorNums.size >= 3) break;
    }
  } else {
    // Word numbers
    const wordNums = Object.keys(NUMBER_WORDS).filter(w => w !== number);
    for (const w of shuffleArray(wordNums).slice(0, 3)) {
      distractorNums.add(w);
    }
  }

  if (distractorNums.size < 3) return null;

  return {
    question: `Complete this verse from ${bookName} ${chapter}:${fact.verse}: "${truncate(clozeSentence, 150)}"`,
    type: 'fill-blank',
    options: shuffleArray([number, ...Array.from(distractorNums).slice(0, 3)]),
    correctAnswer: number,
    explanation: `The complete verse reads: "${truncate(fact.text, 120)}"`,
    verseReference: `${bookName} ${chapter}:${fact.verse}`,
    difficulty: 'hard',
    quality: 7,
  };
}

// =============================================================================
// ANSWER & DISTRACTOR HELPERS
// =============================================================================

function resolveHePronoun(text: string, excludePerson?: string, bookSlug?: string): string | null {
  const pronounPattern = /\b(?:he|him|his)\b/i;
  if (!pronounPattern.test(text)) return null;
  const namedPeople = Array.from(BIBLICAL_NAMES).filter(name => {
    if (name === 'God' || name === 'Lord' || name === 'LORD' || name === 'Spirit' || name === 'Holy Ghost') return false;
    if (name === excludePerson) return false;
    return new RegExp(`\\b${escapeRegex(name)}\\b`).test(text);
  });
  if (namedPeople.length === 1) return namedPeople[0];
  // Context-appropriate fallback instead of always "Jesus"
  if (namedPeople.length > 0) {
    if (bookSlug && !isOTBook(bookSlug)) {
      return namedPeople.find(p => p === 'Jesus' || p === 'Christ') || namedPeople[0];
    }
    return namedPeople[0];
  }
  // No fallback - return null instead of guessing
  return null;
}

function buildContextualAnswer(text: string, person: string, action: ActionFact, bookSlug?: string): string | null {
  const verb = action.verb.toLowerCase();

  // Handle passive constructions: "tempted of Satan" -> Satan "Tempted Jesus"
  if (action.agent && action.patient && action.agent === person) {
    const patientDisplay = action.patient === 'God' || action.patient === 'Lord'
      ? `the ${action.patient}` : action.patient;
    const verbMap: Record<string, string> = {
      'tempted': `Tempted ${patientDisplay}`,
      'baptized': `Baptized ${patientDisplay}`,
      'healed': `Healed ${patientDisplay}`,
      'called': `Called ${patientDisplay}`,
      'sent': `Sent ${patientDisplay}`,
      'rebuked': `Rebuked ${patientDisplay}`,
      'betrayed': `Betrayed ${patientDisplay}`,
    };
    if (verbMap[verb]) return verbMap[verb];
  }

  // Extract contextual clause from the verse text around the verb
  const escaped = escapeRegex(verb);
  const clausePattern = new RegExp(
    `\\b${escaped}\\b\\s+(.{5,45})(?:\\.|,|;|and\\b|$)`, 'i'
  );
  const clauseMatch = text.match(clausePattern);
  const tail = clauseMatch ? clauseMatch[1].trim().replace(/[\s,;:]+$/, '') : '';

  const contextualAnswers: Record<string, () => string> = {
    'baptize': () => tail ? `Baptized ${tail}` : 'Baptized people',
    'baptized': () => {
      if (action.patient === person) return `Was baptized${tail ? ` ${tail}` : ''}`;
      return tail ? `Baptized ${tail}` : 'Baptized people';
    },
    'preach': () => tail ? `Preached ${tail}` : 'Preached',
    'preached': () => tail ? `Preached ${tail}` : 'Preached the word',
    'preaching': () => tail ? `Preached ${tail}` : 'Preached the gospel',
    'healed': () => tail ? `Healed ${tail}` : 'Healed the sick',
    'healing': () => tail ? `Healed ${tail}` : 'Healed the sick',
    'cast out': () => tail ? `Cast out ${tail}` : 'Cast out evil spirits',
    'prayed': () => 'Prayed to God',
    'praying': () => 'Prayed to God',
    'taught': () => tail ? `Taught ${tail}` : 'Taught the people',
    'teaching': () => tail ? `Taught ${tail}` : 'Taught the people',
    'tempted': () => {
      if (action.patient === person) {
        const by = action.agent ? ` by ${action.agent}` : '';
        return `Was tempted${by} in the wilderness`;
      }
      const patient = action.patient || resolveHePronoun(text, person, bookSlug);
      return patient ? `Tempted ${patient}` : 'Tempted others';
    },
    'fasted': () => 'Fasted in the wilderness',
    'fasting': () => 'Fasted in the wilderness',
    'repent': () => 'Called people to repent',
    'repentance': () => 'Preached repentance',
    'followed': () => tail ? `Followed ${tail}` : (bookSlug && isOTBook(bookSlug) ? 'Followed after God' : 'Followed after Jesus'),
    'called': () => tail ? `Called ${tail}` : 'Called His people',
    'crucified': () => 'Was crucified',
    'rose': () => 'Rose from the dead',
    'risen': () => 'Rose from the dead',
    'ascended': () => 'Ascended into heaven',
    'blessed': () => tail ? `Blessed ${tail}` : 'Blessed the people',
    'commanded': () => tail ? `Commanded ${tail}` : 'Gave a command',
    'rebuked': () => tail ? `Rebuked ${tail}` : 'Rebuked them',
    'delivered': () => tail ? `Delivered ${tail}` : 'Delivered the people',
    'denied': () => tail ? `Denied ${tail}` : 'Denied knowing Him',
    'betrayed': () => tail ? `Betrayed ${tail}` : (bookSlug && isOTBook(bookSlug) ? 'Betrayed his master' : 'Betrayed Jesus'),
    'confessed': () => tail ? `Confessed ${tail}` : 'Confessed their sins',
    'believed': () => tail ? `Believed ${tail}` : 'Believed in the Lord',
    'forgave': () => tail ? `Forgave ${tail}` : 'Forgave sins',
    'anointed': () => tail ? `Anointed ${tail}` : 'Was anointed',
    'prophesied': () => tail ? `Prophesied ${tail}` : 'Prophesied',
    'sent': () => tail ? `Sent ${tail}` : 'Was sent forth',
    'created': () => tail ? `Created ${tail}` : 'Created all things',
    'raised': () => tail ? `Raised ${tail}` : 'Raised from the dead',
    'ordained': () => tail ? `Ordained ${tail}` : 'Ordained leaders',
    'appointed': () => tail ? `Appointed ${tail}` : 'Appointed leaders',
  };

  const builder = contextualAnswers[verb];
  if (!builder) return null;

  const answer = builder();
  return answer.length >= 8 ? answer : null;
}

function buildTFClause(text: string, actor: string, action: ActionFact): string | null {
  const verb = action.verb.toLowerCase();
  const escaped = escapeRegex(verb);
  const clausePattern = new RegExp(
    `\\b${escaped}\\b\\s*(.{0,40}?)(?:\\.|,|;|$)`, 'i'
  );
  const match = text.match(clausePattern);
  const tail = match ? match[1].trim().replace(/[\s,;:]+$/, '') : '';

  const clauseMap: Record<string, string> = {
    'baptize': tail ? `baptized ${tail}` : 'baptized people',
    'baptized': tail ? `was baptized ${tail}` : 'was baptized',
    'preach': tail ? `preached ${tail}` : 'preached',
    'preached': tail ? `preached ${tail}` : 'preached the word',
    'preaching': tail ? `preached ${tail}` : 'preached the gospel',
    'healed': tail ? `healed ${tail}` : 'healed the sick',
    'healing': tail ? `healed ${tail}` : 'healed the sick',
    'cast out': tail ? `cast out ${tail}` : 'cast out evil spirits',
    'prayed': 'prayed to God',
    'praying': 'was praying',
    'taught': tail ? `taught ${tail}` : 'taught the people',
    'teaching': tail ? `taught ${tail}` : 'taught the people',
    'tempted': action.patient === actor
      ? `was tempted${action.agent ? ` by ${action.agent}` : ''}`
      : `tempted ${action.patient || 'others'}`,
    'fasted': 'fasted in the wilderness',
    'fasting': 'fasted in the wilderness',
    'repent': 'called for repentance',
    'repentance': 'preached repentance',
    'followed': tail ? `followed ${tail}` : 'followed after God',
    'called': tail ? `called ${tail}` : 'called His people',
    'crucified': 'was crucified',
    'rose': 'rose from the dead',
    'risen': 'rose from the dead',
    'blessed': tail ? `blessed ${tail}` : 'blessed the people',
    'sent': tail ? `sent ${tail}` : 'was sent forth',
    'came': tail ? `came ${tail}` : 'came forth',
    'went': tail ? `went ${tail}` : 'went forth',
    'departed': tail ? `departed ${tail}` : 'departed from there',
    'rebuked': tail ? `rebuked ${tail}` : 'rebuked them',
    'commanded': tail ? `commanded ${tail}` : 'gave a command',
    'delivered': tail ? `delivered ${tail}` : 'delivered the people',
    'denied': tail ? `denied ${tail}` : 'denied knowing Him',
    'betrayed': tail ? `betrayed ${tail}` : 'betrayed his master',
    'confessed': tail ? `confessed ${tail}` : 'confessed their sins',
    'believed': tail ? `believed ${tail}` : 'believed in the Lord',
    'forgave': tail ? `forgave ${tail}` : 'forgave sins',
    'anointed': tail ? `anointed ${tail}` : 'was anointed',
    'prophesied': tail ? `prophesied ${tail}` : 'prophesied',
  };

  return clauseMap[verb] || null;
}

function buildContextualDistractions(verb: string, correctAnswer: string, bookSlug?: string): string[] {
  const otDistractions = [
    'Built an altar to the Lord',
    'Led the people through the wilderness',
    'Offered a sacrifice to God',
    'Blessed the people of Israel',
    'Prophesied about the future',
    'Commanded the people to obey',
    'Delivered the people from bondage',
    'Made a covenant with God',
    'Anointed with oil',
    'Called upon the name of the Lord',
    'Judged the people of Israel',
    'Destroyed the idols',
    'Prayed to God for guidance',
    'Sent messengers to the king',
    'Conquered the land of Canaan',
    'Spoke the word of the Lord',
    'Established the law of God',
    'Gathered the people together',
    'Went up to the mountain',
    'Set up pillars of stone',
  ];

  const ntDistractions = [
    'Baptized people in the river',
    'Preached the gospel to the people',
    'Healed the sick and afflicted',
    'Cast out evil spirits',
    'Taught in the synagogue',
    'Prayed to God in solitude',
    'Fasted in the wilderness',
    'Called His disciples to follow',
    'Was tempted by the devil',
    'Rose from the dead',
    'Blessed the children',
    'Forgave their sins',
    'Rebuked the Pharisees',
    'Prophesied about the future',
    'Commanded the wind and sea',
    'Delivered the people from bondage',
    'Denied knowing Jesus',
    'Confessed their sins publicly',
    'Believed in the Lord',
    'Anointed with oil',
    'Preached repentance and faith',
    'Called people to repent',
    'Was baptized in the Jordan',
    'Followed after Jesus',
  ];

  const allDistractions = (bookSlug && isOTBook(bookSlug)) ? otDistractions : ntDistractions;

  return allDistractions
    .filter(d => d.toLowerCase() !== correctAnswer.toLowerCase())
    .filter(d => !d.toLowerCase().includes(verb.toLowerCase()))
    .sort(() => seededRandom() - 0.5)
    .slice(0, 3);
}

function pickPersonDistractors(correct: string, chapterPeople: string[], count: number): string[] {
  const exclude = new Set([correct, 'God', 'Lord', 'LORD', 'Spirit', 'Holy Ghost', 'Christ', 'John the Baptist']);

  const fromChapter = chapterPeople
    .filter(p => !exclude.has(p))
    .sort(() => seededRandom() - 0.5);

  const ntFallbacks = ['Peter', 'Paul', 'John', 'James', 'Andrew', 'Philip',
    'Thomas', 'Matthew', 'Barnabas', 'Timothy', 'Stephen', 'Mark', 'Luke', 'Silas'];
  const otFallbacks = ['Abraham', 'Moses', 'David', 'Solomon', 'Elijah', 'Isaiah',
    'Jeremiah', 'Daniel', 'Joshua', 'Samuel', 'Jacob', 'Joseph', 'Esau', 'Saul',
    'Jonathan', 'Deborah', 'Gideon', 'Ruth', 'Boaz', 'Rahab'];
  const fallbacks = [...ntFallbacks, ...otFallbacks]
    .filter(p => !exclude.has(p) && !fromChapter.includes(p))
    .sort(() => seededRandom() - 0.5);

  const pool = [...fromChapter, ...fallbacks];
  const seen = new Set<string>();
  const result: string[] = [];
  for (const p of pool) {
    if (result.length >= count) break;
    if (!seen.has(p)) {
      seen.add(p);
      result.push(p);
    }
  }
  return result;
}

function pickOneDistractorPerson(correct: string, chapterPeople: string[]): string | null {
  const result = pickPersonDistractors(correct, chapterPeople, 1);
  return result.length > 0 ? result[0] : null;
}

function pickPlaceDistractors(correct: string, chapterPlaces: string[], count: number): string[] {
  const exclude = new Set([correct.toLowerCase()]);

  const fromChapter = chapterPlaces
    .filter(p => !exclude.has(p.toLowerCase()))
    .sort(() => seededRandom() - 0.5);

  const fallbacks = ['Jerusalem', 'Bethlehem', 'Nazareth', 'Capernaum', 'Galilee',
    'Samaria', 'Egypt', 'Babylon', 'Damascus', 'Antioch', 'Jordan',
    'Judaea', 'Bethsaida', 'Jericho', 'Tyre', 'Sidon']
    .filter(p => !exclude.has(p.toLowerCase()) && !fromChapter.includes(p))
    .sort(() => seededRandom() - 0.5);

  return [...fromChapter, ...fallbacks].slice(0, count);
}

function getRandomDifferentPlace(place: string): string {
  const places = ['Jerusalem', 'Bethlehem', 'Nazareth', 'Capernaum', 'Galilee',
    'Samaria', 'Egypt', 'Babylon', 'Damascus', 'Antioch', 'Rome',
    'Corinth', 'Ephesus', 'Bethsaida', 'Jericho', 'Tyre'];
  const filtered = places.filter(p => p.toLowerCase() !== place.toLowerCase());
  return filtered[Math.floor(seededRandom() * filtered.length)];
}

function getPlaceDistractors(correctPlace: string): string[] {
  const allPlaces = ['Jerusalem', 'Bethlehem', 'Nazareth', 'Capernaum', 'Galilee',
    'Samaria', 'Egypt', 'Babylon', 'Damascus', 'Antioch', 'Jordan',
    'Judaea', 'Sinai', 'Horeb', 'Bethsaida', 'Jericho'];
  return allPlaces
    .filter(p => p.toLowerCase() !== correctPlace.toLowerCase())
    .sort(() => seededRandom() - 0.5)
    .slice(0, 3);
}

function getWordDistractors(correctWord: string): string[] {
  const words = [
    'righteousness', 'salvation', 'repentance', 'forgiveness', 'faith',
    'grace', 'mercy', 'truth', 'wisdom', 'glory', 'power', 'spirit',
    'heaven', 'kingdom', 'covenant', 'temple', 'offering', 'prayer',
    'light', 'darkness', 'love', 'peace', 'joy', 'hope',
    'baptism', 'gospel', 'prophet', 'messenger', 'disciple',
    'sword', 'shield', 'shepherd', 'servant', 'inheritance',
    'judgment', 'blessing', 'praise', 'worship', 'obedience',
  ];
  return words
    .filter(w => w.toLowerCase() !== correctWord.toLowerCase())
    .sort(() => seededRandom() - 0.5)
    .slice(0, 3);
}

function extractImportantWords(text: string): string[] {
  const stopWords = new Set([
    'the', 'and', 'of', 'to', 'in', 'a', 'that', 'is', 'was', 'for', 'it',
    'his', 'he', 'with', 'as', 'but', 'not', 'they', 'her', 'she', 'him',
    'them', 'their', 'this', 'from', 'had', 'have', 'has', 'been', 'were',
    'said', 'did', 'shall', 'will', 'unto', 'upon', 'which', 'there', 'are',
    'all', 'out', 'into', 'came', 'went', 'thou', 'thee', 'thy', 'ye',
    'also', 'when', 'then', 'than', 'who', 'whom', 'what', 'how', 'may',
    'even', 'because', 'every', 'come', 'one', 'let', 'being', 'before',
    'after', 'about', 'over', 'down', 'through', 'between', 'again',
  ]);

  const words = text.split(/\s+/)
    .map(w => w.replace(/[^a-zA-Z]/g, ''))
    .filter(w => w.length >= 4 && !stopWords.has(w.toLowerCase()));

  const seen = new Set<string>();
  const result: string[] = [];
  for (const w of words) {
    const lower = w.toLowerCase();
    if (!seen.has(lower)) {
      seen.add(lower);
      result.push(w);
    }
  }
  return result;
}

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 3) + '...';
}

// =============================================================================
// QUIZ ASSEMBLY
// =============================================================================

function generateQuestionsFromChapter(
  verses: BollsVerse[],
  bookSlug: string,
  chapter: number
): QuizQuestion[] {
  const bookName = BOOK_NAMES[bookSlug] || bookSlug;

  const facts = verses.map(v => analyzeVerse(v, bookSlug));

  const chapterPeople = Array.from(new Set(facts.flatMap(f => f.people)));
  const chapterPlaces = Array.from(new Set(facts.flatMap(f => f.places)));

  const candidates: QuestionCandidate[] = [];

  for (const fact of facts) {
    const whoQ = generateWhoQuestion(fact, bookName, chapter, chapterPeople);
    if (whoQ) candidates.push(whoQ);

    const whereQ = generateWhereQuestion(fact, bookName, chapter, chapterPlaces);
    if (whereQ) candidates.push(whereQ);

    const whatQ = generateWhatQuestion(fact, bookName, chapter, chapterPeople, bookSlug);
    if (whatQ) candidates.push(whatQ);

    const tfQ = generateTrueFalseFromFact(fact, bookName, chapter, chapterPeople);
    if (tfQ) candidates.push(tfQ);

    const clozeQ = generateClozeQuestion(fact, bookName, chapter, chapterPeople);
    if (clozeQ) candidates.push(clozeQ);

    const quoteQ = generateQuoteQuestion(fact, bookName, chapter, chapterPeople);
    if (quoteQ) candidates.push(quoteQ);

    const numQ = generateNumberQuestion(fact, bookName, chapter);
    if (numQ) candidates.push(numQ);
  }

  // Sort by quality descending
  candidates.sort((a, b) => b.quality - a.quality);

  // Enforce 70% MC, 20% T/F, 10% fill-blank distribution
  const target = QUESTIONS_PER_CHAPTER;
  const mcTarget = Math.round(target * 0.7);   // 11
  const tfTarget = Math.round(target * 0.2);    // 3
  const fbTarget = target - mcTarget - tfTarget; // 2

  // Separate by actual type
  const mcCandidates = candidates.filter(c => c.type === 'multiple-choice');
  const tfCandidates = candidates.filter(c => c.type === 'true-false');
  const fbCandidates = candidates.filter(c => c.type === 'fill-blank');

  // Select in order: MC first, then TF excluding MC refs, then FB excluding both
  const usedRefs = new Set<string>();

  const selectedMC = selectUniqueByVerse(mcCandidates, mcTarget, usedRefs);
  for (const q of selectedMC) usedRefs.add(q.verseReference);

  const selectedTF = selectUniqueByVerse(tfCandidates, tfTarget, usedRefs);
  for (const q of selectedTF) usedRefs.add(q.verseReference);

  const selectedFB = selectUniqueByVerse(fbCandidates, fbTarget, usedRefs);
  for (const q of selectedFB) usedRefs.add(q.verseReference);

  const allSelected = [...selectedMC, ...selectedTF, ...selectedFB];

  // If we don't have enough, fill from any remaining candidates
  if (allSelected.length < target) {
    const remaining = candidates.filter(c => !usedRefs.has(c.verseReference));
    const needed = target - allSelected.length;
    for (const c of remaining.slice(0, needed)) {
      allSelected.push(c);
      usedRefs.add(c.verseReference);
    }
  }

  // Deduplicate by question text
  const seenQuestions = new Set<string>();
  const deduped: QuestionCandidate[] = [];
  for (const q of allSelected) {
    const norm = q.question.toLowerCase();
    if (!seenQuestions.has(norm)) {
      seenQuestions.add(norm);
      deduped.push(q);
    }
  }

  // Convert to QuizQuestion format with IDs
  const prefix = `${bookSlug}${chapter}`;
  return deduped.slice(0, target).map((c, i) => ({
    id: `${prefix}-q${i + 1}`,
    question: c.question,
    type: c.type,
    ...(c.options ? { options: c.options } : {}),
    correctAnswer: c.correctAnswer,
    explanation: c.explanation,
    verseReference: c.verseReference,
    difficulty: c.difficulty,
  }));
}

function selectUniqueByVerse(
  candidates: QuestionCandidate[],
  count: number,
  excludeRefs: Set<string>
): QuestionCandidate[] {
  const result: QuestionCandidate[] = [];

  for (const c of candidates) {
    if (result.length >= count) break;
    if (!excludeRefs.has(c.verseReference)) {
      result.push(c);
    }
  }

  return result;
}

// =============================================================================
// QUIZ BUILDER
// =============================================================================

async function generateChapterQuiz(bookSlug: string, chapter: number): Promise<Quiz> {
  const bookName = BOOK_NAMES[bookSlug] || capitalize(bookSlug);

  console.log(`  Fetching ${bookName} ${chapter}...`);
  const verses = await fetchChapter(bookSlug, chapter);
  console.log(`  Got ${verses.length} verses. Generating questions...`);

  const questions = generateQuestionsFromChapter(verses, bookSlug, chapter);
  console.log(`  Generated ${questions.length} questions`);

  // Count types for logging
  const mcCount = questions.filter(q => q.type === 'multiple-choice').length;
  const tfCount = questions.filter(q => q.type === 'true-false').length;
  const fbCount = questions.filter(q => q.type === 'fill-blank').length;
  console.log(`  Distribution: ${mcCount} MC, ${tfCount} T/F, ${fbCount} fill-blank`);

  const quiz: Quiz = {
    id: `${bookSlug}-${chapter}`,
    title: `${bookName} Chapter ${chapter} Quiz`,
    description: `Test your knowledge of ${bookName} chapter ${chapter} with ${questions.length} questions covering key people, places, events, and teachings from this chapter.`,
    type: 'chapter',
    book: bookName,
    chapter,
    questions,
    difficulty: 'medium',
    isBookQuiz: false,
    slug: `${bookSlug}-${chapter}-quiz`,
    tags: Array.from(new Set([bookName.toLowerCase(), `chapter-${chapter}`, bookSlug, 'bible-quiz'])),
    totalQuestions: questions.length,
    estimatedTime: Math.ceil(questions.length * 0.75),
  };

  return quiz;
}

// =============================================================================
// FILE OUTPUT
// =============================================================================

function writeQuiz(quiz: Quiz): string {
  const dir = OUTPUT_DIR;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, `${quiz.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(quiz, null, 2), 'utf-8');
  return filePath;
}

// =============================================================================
// BOUNDED CONCURRENCY HELPER
// =============================================================================

async function processWithConcurrency<T>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<void>
): Promise<void> {
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const i = index++;
      await fn(items[i]);
      await sleep(RATE_LIMIT_MS);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
  await Promise.all(workers);
}

// =============================================================================
// CLI
// =============================================================================

async function main() {
  const args = process.argv.slice(2);

  // Parse optional --seed flag
  let argStart = 0;
  if (args[0] === '--seed' && args[1]) {
    const seed = parseInt(args[1], 10);
    if (isNaN(seed)) {
      console.error('Invalid seed value. Must be a number.');
      process.exit(1);
    }
    seedRng(seed);
    argStart = 2;
    console.log(`Using seed: ${seed}`);
  }

  const remainingArgs = args.slice(argStart);

  if (remainingArgs.length === 0 || remainingArgs[0] === '--help') {
    console.log(`
Bible Quiz Generator
====================

Usage:
  npx tsx scripts/generate-quizzes.ts <book> <chapter>       Generate one chapter
  npx tsx scripts/generate-quizzes.ts <book> <start>-<end>   Generate chapter range
  npx tsx scripts/generate-quizzes.ts <book> --all           Generate all chapters for a book
  npx tsx scripts/generate-quizzes.ts --all                  Generate all 1,189 chapters
  npx tsx scripts/generate-quizzes.ts --seed 42 mark 1       Use deterministic seed

Examples:
  npx tsx scripts/generate-quizzes.ts mark 1
  npx tsx scripts/generate-quizzes.ts genesis 1-10
  npx tsx scripts/generate-quizzes.ts mark --all
  npx tsx scripts/generate-quizzes.ts --seed 42 --all
    `);
    process.exit(0);
  }

  // Parse arguments
  if (remainingArgs[0] === '--all') {
    // Generate ALL chapters for ALL books
    console.log('Generating quizzes for all 1,189 chapters...\n');
    let totalGenerated = 0;
    let totalFailed = 0;

    for (const [bookSlug, totalChapters] of Object.entries(BOOK_CHAPTERS)) {
      console.log(`\n${BOOK_NAMES[bookSlug]} (${totalChapters} chapters)`);

      const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);

      await processWithConcurrency(chapters, CONCURRENT_FETCHES, async (ch) => {
        try {
          const quiz = await generateChapterQuiz(bookSlug, ch);
          const filePath = writeQuiz(quiz);
          totalGenerated++;
          console.log(`  OK ${filePath}`);
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error(`  FAIL ${bookSlug} ${ch}: ${msg}`);
          totalFailed++;
        }
      });
    }

    console.log(`\nDone! Generated ${totalGenerated} quizzes. ${totalFailed > 0 ? `${totalFailed} failed.` : ''}`);
    return;
  }

  const bookSlug = remainingArgs[0].toLowerCase();
  if (!BOOK_IDS[bookSlug]) {
    console.error(`Unknown book: "${remainingArgs[0]}". Available: ${Object.keys(BOOK_IDS).join(', ')}`);
    process.exit(1);
  }

  const totalChapters = BOOK_CHAPTERS[bookSlug];

  if (remainingArgs[1] === '--all') {
    // Generate all chapters for one book
    console.log(`Generating quizzes for ${BOOK_NAMES[bookSlug]} (${totalChapters} chapters)...\n`);
    let generated = 0;
    let failed = 0;

    const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);

    await processWithConcurrency(chapters, CONCURRENT_FETCHES, async (ch) => {
      try {
        const quiz = await generateChapterQuiz(bookSlug, ch);
        const filePath = writeQuiz(quiz);
        generated++;
        console.log(`  OK ${filePath}`);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`  FAIL ${bookSlug} ${ch}: ${msg}`);
        failed++;
      }
    });

    console.log(`\nDone! Generated ${generated} quizzes for ${BOOK_NAMES[bookSlug]}. ${failed > 0 ? `${failed} failed.` : ''}`);
    return;
  }

  // Single chapter or range
  const chapterArg = remainingArgs[1];
  if (!chapterArg) {
    console.error('Please specify a chapter number, range (e.g., 1-10), or --all');
    process.exit(1);
  }

  if (chapterArg.includes('-')) {
    // Range: e.g., "1-10"
    const [startStr, endStr] = chapterArg.split('-');
    const start = parseInt(startStr, 10);
    const end = parseInt(endStr, 10);

    if (isNaN(start) || isNaN(end) || start < 1 || end > totalChapters || start > end) {
      console.error(`Invalid range: ${chapterArg}. ${BOOK_NAMES[bookSlug]} has ${totalChapters} chapters.`);
      process.exit(1);
    }

    console.log(`Generating quizzes for ${BOOK_NAMES[bookSlug]} chapters ${start}-${end}...\n`);
    let generated = 0;

    const chapters = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    await processWithConcurrency(chapters, CONCURRENT_FETCHES, async (ch) => {
      try {
        const quiz = await generateChapterQuiz(bookSlug, ch);
        const filePath = writeQuiz(quiz);
        generated++;
        console.log(`  OK ${filePath}`);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`  FAIL ${bookSlug} ${ch}: ${msg}`);
      }
    });

    console.log(`\nDone! Generated ${generated} quizzes.`);
    return;
  }

  // Single chapter
  const chapter = parseInt(chapterArg, 10);
  if (isNaN(chapter) || chapter < 1 || chapter > totalChapters) {
    console.error(`Invalid chapter: ${chapterArg}. ${BOOK_NAMES[bookSlug]} has ${totalChapters} chapters.`);
    process.exit(1);
  }

  console.log(`Generating quiz for ${BOOK_NAMES[bookSlug]} ${chapter}...\n`);

  try {
    const quiz = await generateChapterQuiz(bookSlug, chapter);
    const filePath = writeQuiz(quiz);
    console.log(`\nOK Saved to: ${filePath}`);
    console.log(`\nQuiz Summary:`);
    console.log(`  Title: ${quiz.title}`);
    console.log(`  Questions: ${quiz.totalQuestions}`);
    console.log(`  Slug: ${quiz.slug}`);
    console.log(`  Estimated time: ${quiz.estimatedTime} minutes`);

    // Print question preview
    console.log(`\nQuestion Preview:`);
    for (const q of quiz.questions.slice(0, 5)) {
      console.log(`  [${q.type}] ${q.question}`);
      if (q.options) console.log(`    Options: ${q.options.join(' | ')}`);
      console.log(`    Answer: ${q.correctAnswer}`);
      console.log(`    Ref: ${q.verseReference}\n`);
    }
    if (quiz.questions.length > 5) {
      console.log(`  ... and ${quiz.questions.length - 5} more questions`);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`Failed: ${msg}`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
