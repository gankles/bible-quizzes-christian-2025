import fs from 'fs';
import path from 'path';

interface CommentaryData {
  [verseKey: string]: string;
}

const cache: Record<string, CommentaryData> = {};

function loadCommentary(name: string): CommentaryData {
  if (cache[name]) return cache[name];

  const filePath = path.join(process.cwd(), 'data', 'commentaries', `${name}.json`);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    cache[name] = JSON.parse(raw);
  } catch {
    cache[name] = {};
  }
  return cache[name];
}

// KJV Study commentary types and cache
interface KjvStudyVerseEntry {
  analysis: string;
  questions: string[];
  historical: string;
}

interface KjvStudyBookData {
  book: string;
  commentary: Record<string, Record<string, KjvStudyVerseEntry>>;
}

const kjvstudyCache: Record<string, KjvStudyBookData | null> = {};

function loadKjvStudyBook(bookSlug: string): KjvStudyBookData | null {
  if (bookSlug in kjvstudyCache) return kjvstudyCache[bookSlug];

  const filename = bookSlug.replace(/-/g, '_');
  const filePath = path.join(process.cwd(), 'data', 'kjvstudy', 'verse_commentary', `${filename}.json`);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    kjvstudyCache[bookSlug] = JSON.parse(raw);
  } catch {
    kjvstudyCache[bookSlug] = null;
  }
  return kjvstudyCache[bookSlug];
}

export function getEllicottCommentary(bookSlug: string, chapter: number, verse: number): string | null {
  const data = loadCommentary('ellicott');
  const key = `${bookSlug}-${chapter}-${verse}`;
  return data[key] || null;
}

export function getJFBCommentary(bookSlug: string, chapter: number, verse: number): string | null {
  const data = loadCommentary('jfb');
  const key = `${bookSlug}-${chapter}-${verse}`;
  return data[key] || null;
}

export function getMHCCCommentary(bookSlug: string, chapter: number, verse: number): string | null {
  const data = loadCommentary('mhcc');
  const key = `${bookSlug}-${chapter}-${verse}`;
  return data[key] || null;
}

export interface VerseCommentary {
  text: string;
  source: string;
  author: string;
  historical?: string;
  questions?: string[];
}

/**
 * Get commentary for a verse with fallback chain:
 * KJV Study (primary) → Ellicott → JFB → MHCC
 */
export function getVerseCommentary(bookSlug: string, chapter: number, verse: number): VerseCommentary | null {
  // Try KJV Study first
  const kjvStudyBook = loadKjvStudyBook(bookSlug);
  if (kjvStudyBook) {
    const chapterData = kjvStudyBook.commentary[String(chapter)];
    if (chapterData) {
      const verseData = chapterData[String(verse)];
      if (verseData && verseData.analysis) {
        return {
          text: verseData.analysis,
          source: 'KJV Study Commentary',
          author: 'KJV Study',
          historical: verseData.historical || undefined,
          questions: verseData.questions?.length ? verseData.questions : undefined,
        };
      }
    }
  }

  // Fallback to Ellicott → JFB → MHCC
  const key = `${bookSlug}-${chapter}-${verse}`;

  const ellicott = loadCommentary('ellicott');
  if (ellicott[key]) {
    return {
      text: ellicott[key],
      source: "Ellicott\u2019s Commentary for English Readers",
      author: "Charles John Ellicott (1819\u20131905)",
    };
  }

  const jfb = loadCommentary('jfb');
  if (jfb[key]) {
    return {
      text: jfb[key],
      source: "Jamieson-Fausset-Brown Bible Commentary",
      author: "Robert Jamieson, A.R. Fausset, David Brown",
    };
  }

  const mhcc = loadCommentary('mhcc');
  if (mhcc[key]) {
    return {
      text: mhcc[key],
      source: "Matthew Henry\u2019s Concise Commentary",
      author: "Matthew Henry (1662\u20131714)",
    };
  }

  return null;
}

/**
 * Get all KJV Study commentary entries for a chapter.
 * Returns a record keyed by verse number, or null if no data.
 */
export function getKjvStudyChapterCommentary(
  bookSlug: string,
  chapter: number
): Record<number, { analysis: string; historical: string; questions: string[] }> | null {
  const bookData = loadKjvStudyBook(bookSlug);
  if (!bookData) return null;

  const chapterData = bookData.commentary[String(chapter)];
  if (!chapterData) return null;

  const result: Record<number, { analysis: string; historical: string; questions: string[] }> = {};
  for (const [verseNum, entry] of Object.entries(chapterData)) {
    const num = parseInt(verseNum, 10);
    if (!isNaN(num) && entry.analysis) {
      result[num] = {
        analysis: entry.analysis,
        historical: entry.historical || '',
        questions: entry.questions || [],
      };
    }
  }

  return Object.keys(result).length > 0 ? result : null;
}
