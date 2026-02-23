import fs from 'fs';
import path from 'path';
import { Quiz } from './types';

export interface TabbedQuiz {
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

const QUIZZES_DIR = path.join(process.cwd(), 'data', 'quizzes');

const BOOK_SLUGS = [
  'genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy',
  'joshua', 'judges', 'ruth', '1-samuel', '2-samuel',
  '1-kings', '2-kings', '1-chronicles', '2-chronicles',
  'ezra', 'nehemiah', 'esther', 'job', 'psalms',
  'proverbs', 'ecclesiastes', 'song-of-solomon', 'isaiah',
  'jeremiah', 'lamentations', 'ezekiel', 'daniel',
  'hosea', 'joel', 'amos', 'obadiah', 'jonah',
  'micah', 'nahum', 'habakkuk', 'zephaniah', 'haggai',
  'zechariah', 'malachi',
  'matthew', 'mark', 'luke', 'john', 'acts',
  'romans', '1-corinthians', '2-corinthians', 'galatians',
  'ephesians', 'philippians', 'colossians', '1-thessalonians',
  '2-thessalonians', '1-timothy', '2-timothy', 'titus',
  'philemon', 'hebrews', 'james', '1-peter', '2-peter',
  '1-john', '2-john', '3-john', 'jude', 'revelation',
];

export const BOOK_NAMES: Record<string, string> = {
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

// Pre-sorted by length descending so "song-of-solomon" matches before "song"
const SORTED_BOOK_SLUGS = [...BOOK_SLUGS].sort((a, b) => b.length - a.length);

/**
 * Parse a quiz slug like "genesis-1-quiz" or "1-samuel-5-quiz" into book + chapter.
 * Handles multi-part book names by matching longest known slug first.
 */
export function parseQuizSlug(slug: string): { book: string; chapter: number } | null {
  if (!slug.endsWith('-quiz')) return null;
  const withoutQuiz = slug.slice(0, -5); // remove '-quiz'

  for (const bookSlug of SORTED_BOOK_SLUGS) {
    if (withoutQuiz.startsWith(bookSlug + '-')) {
      const chapterStr = withoutQuiz.slice(bookSlug.length + 1);
      const chapter = parseInt(chapterStr, 10);
      if (!isNaN(chapter) && chapter > 0 && chapter <= (BOOK_CHAPTERS[bookSlug] || 200)) {
        return { book: bookSlug, chapter };
      }
    }
  }
  return null;
}

export function loadTabbedQuiz(bookSlug: string, chapter: number): TabbedQuiz | null {
  const filePath = path.join(QUIZZES_DIR, `${bookSlug}-${chapter}-tabbed.json`);
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

export function loadQuiz(bookSlug: string, chapter: number): Quiz | null {
  const filePath = path.join(QUIZZES_DIR, `${bookSlug}-${chapter}.json`);
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

/**
 * Scan the data/quizzes/ directory and return all valid quiz slugs.
 * Prefers tabbed quizzes over regular when both exist.
 */
export function getAllQuizSlugs(): string[] {
  if (!fs.existsSync(QUIZZES_DIR)) return [];
  const files = fs.readdirSync(QUIZZES_DIR);
  const slugs: string[] = [];
  const seen = new Set<string>();

  for (const file of files) {
    if (file.startsWith('.')) continue;

    if (file.endsWith('-tabbed.json')) {
      const base = file.replace('-tabbed.json', '');
      const slug = `${base}-quiz`;
      if (!seen.has(slug)) {
        seen.add(slug);
        slugs.push(slug);
      }
    } else if (file.endsWith('.json')) {
      const base = file.replace('.json', '');
      const slug = `${base}-quiz`;
      if (!seen.has(slug)) {
        seen.add(slug);
        slugs.push(slug);
      }
    }
  }

  return slugs;
}

/**
 * Get total chapters for a book.
 */
export function getBookChapters(bookSlug: string): number {
  return BOOK_CHAPTERS[bookSlug] || 0;
}

/**
 * Load a book-level quiz (e.g., genesis-book-quiz.json)
 */
export function loadBookQuiz(bookSlug: string): any | null {
  const filePath = path.join(QUIZZES_DIR, `${bookSlug}-book-quiz.json`);
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

/**
 * Parse a book quiz slug like "genesis-quiz" into a book slug.
 * Returns null if it's a chapter quiz (has a number) or not a valid book.
 */
export function parseBookQuizSlug(slug: string): string | null {
  if (!slug.endsWith('-quiz')) return null;
  const withoutQuiz = slug.slice(0, -5);

  // Make sure it's NOT a chapter quiz (no trailing number)

  for (const bookSlug of SORTED_BOOK_SLUGS) {
    if (withoutQuiz === bookSlug) return bookSlug;
  }
  return null;
}

/**
 * Get all book quiz slugs from disk.
 */
export function getAllBookQuizSlugs(): string[] {
  if (!fs.existsSync(QUIZZES_DIR)) return [];
  const files = fs.readdirSync(QUIZZES_DIR);
  return files
    .filter(f => f.endsWith('-book-quiz.json'))
    .map(f => f.replace('-book-quiz.json', '-quiz'));
}

/**
 * Get all book slugs that have at least one quiz generated.
 */
export function getBooksWithQuizzes(): string[] {
  const slugs = getAllQuizSlugs();
  const books = new Set<string>();
  for (const slug of slugs) {
    const parsed = parseQuizSlug(slug);
    if (parsed) books.add(parsed.book);
  }
  return [...books];
}

/**
 * Parse a chapters slug like "exodus-chapters" into a book slug.
 * Returns null if not a valid book.
 */
export function parseChaptersSlug(slug: string): string | null {
  if (!slug.endsWith('-chapters')) return null;
  const withoutChapters = slug.slice(0, -9);

  for (const bookSlug of SORTED_BOOK_SLUGS) {
    if (withoutChapters === bookSlug) return bookSlug;
  }
  return null;
}

/**
 * Get all valid book-chapters slugs.
 */
export function getAllChaptersSlugs(): string[] {
  return BOOK_SLUGS.map(slug => `${slug}-chapters`);
}

/**
 * Load a generic (non-book, non-chapter) quiz by slug.
 * e.g., "ten-commandments-quiz" → data/quizzes/ten-commandments.json
 */
export function loadGenericQuiz(slug: string): any | null {
  if (!slug.endsWith('-quiz')) return null;
  const base = slug.slice(0, -5); // remove '-quiz'
  const filePath = path.join(QUIZZES_DIR, `${base}.json`);
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

/**
 * Get all generic quiz slugs (non-book, non-chapter, non-tabbed).
 * These are files that don't match *-book-quiz.json, *-tabbed.json,
 * or the {book}-{chapter}.json pattern.
 */
export function getAllGenericQuizSlugs(): string[] {
  if (!fs.existsSync(QUIZZES_DIR)) return [];
  const files = fs.readdirSync(QUIZZES_DIR);
  const slugs: string[] = [];

  for (const file of files) {
    if (file.startsWith('.')) continue;
    if (file.endsWith('-book-quiz.json')) continue;
    if (file.endsWith('-tabbed.json')) continue;
    if (!file.endsWith('.json')) continue;

    const base = file.replace('.json', '');
    const slug = `${base}-quiz`;

    // Skip if it's a chapter quiz (matches {book}-{number} pattern)
    if (parseQuizSlug(slug)) continue;

    slugs.push(slug);
  }

  return slugs;
}

/**
 * Load a character-based tabbed quiz (e.g., jesus-character-tabbed.json)
 */
export function loadCharacterTabbedQuiz(characterSlug: string): TabbedQuiz | null {
  const filePath = path.join(QUIZZES_DIR, `${characterSlug}-character-tabbed.json`);
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

export { BOOK_SLUGS };
