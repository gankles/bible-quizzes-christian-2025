import fs from 'fs';
import path from 'path';
import { BIBLE_BOOKS } from './bible-data';
import { getVerses, getBookId, stripHtml, type FetchVersesRequest } from './bolls-api';

interface RawConcordanceEntry {
  totalOccurrences: number;
  translationCounts: Record<string, number>;
  occurrences: string[]; // "bookSlug:chapter:verse"
}

export interface ConcordanceOccurrence {
  bookSlug: string;
  bookName: string;
  chapter: number;
  verse: number;
  ref: string; // e.g. "Genesis 1:1"
  href: string; // e.g. "/verses/genesis/1/1"
}

export interface TranslationCount {
  gloss: string;
  count: number;
}

export interface LexiconConcordance {
  totalOccurrences: number;
  translationCounts: TranslationCount[];
  occurrences: ConcordanceOccurrence[];
}

const BOOK_NAME_BY_SLUG = new Map(BIBLE_BOOKS.map((b) => [b.slug, b.name]));

let cache: Record<string, RawConcordanceEntry> | null = null;

function load(): Record<string, RawConcordanceEntry> {
  if (cache) return cache;
  try {
    const filePath = path.join(process.cwd(), 'data', 'lexicon-concordance.json');
    cache = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    cache = {};
  }
  return cache!;
}

/** Full concordance (every occurrence + translation-count breakdown) for a Strong's number, e.g. "H7225". */
export function getLexiconConcordance(strongsId: string): LexiconConcordance | null {
  const entry = load()[strongsId.toUpperCase()];
  if (!entry) return null;

  const occurrences: ConcordanceOccurrence[] = entry.occurrences.map((raw) => {
    const [bookSlug, chapterStr, verseStr] = raw.split(':');
    const chapter = parseInt(chapterStr, 10);
    const verse = parseInt(verseStr, 10);
    const bookName = BOOK_NAME_BY_SLUG.get(bookSlug) || bookSlug;
    return {
      bookSlug,
      bookName,
      chapter,
      verse,
      ref: `${bookName} ${chapter}:${verse}`,
      href: `/verses/${bookSlug}/${chapter}/${verse}`,
    };
  });

  const translationCounts: TranslationCount[] = Object.entries(entry.translationCounts)
    .map(([gloss, count]) => ({ gloss, count }))
    .sort((a, b) => b.count - a.count);

  return { totalOccurrences: entry.totalOccurrences, translationCounts, occurrences };
}

export interface ConcordanceStats {
  totalOccurrences: number;
  mostFrequentBook: string;
  bookBreakdown: Record<string, number>;
}

/** Book-level stats derived from the real occurrence list (replaces the always-empty lexicon.json stats). */
export function getConcordanceStats(strongsId: string): ConcordanceStats | null {
  const concordance = getLexiconConcordance(strongsId);
  if (!concordance) return null;

  const bookBreakdown: Record<string, number> = {};
  for (const occ of concordance.occurrences) {
    bookBreakdown[occ.bookName] = (bookBreakdown[occ.bookName] || 0) + 1;
  }
  const mostFrequentBook = Object.entries(bookBreakdown).sort((a, b) => b[1] - a[1])[0]?.[0] || '';

  return { totalOccurrences: concordance.totalOccurrences, mostFrequentBook, bookBreakdown };
}

export interface VerseSampleEntry {
  ref: string;
  text: string;
}

/** Fetches real KJV text for a set of occurrences, batched per book/chapter to minimize requests. */
async function fetchVerseTexts(sample: ConcordanceOccurrence[]): Promise<VerseSampleEntry[]> {
  if (sample.length === 0) return [];

  const byBookChapter = new Map<string, { bookSlug: string; chapter: number; verses: number[] }>();
  for (const occ of sample) {
    const key = `${occ.bookSlug}:${occ.chapter}`;
    const group = byBookChapter.get(key);
    if (group) group.verses.push(occ.verse);
    else byBookChapter.set(key, { bookSlug: occ.bookSlug, chapter: occ.chapter, verses: [occ.verse] });
  }

  const requests: FetchVersesRequest[] = [];
  for (const { bookSlug, chapter, verses } of byBookChapter.values()) {
    const bookId = getBookId(bookSlug);
    if (bookId) requests.push({ translation: 'KJV', book: bookId, chapter, verses });
  }
  if (requests.length === 0) return [];

  try {
    const results = await getVerses(requests);
    const textByKey = new Map<string, string>();
    for (const group of results) {
      for (const v of group) {
        textByKey.set(`${v.chapter}:${v.verse}:${v.book}`, stripHtml(v.text));
      }
    }

    return sample.map((occ) => {
      const bookId = getBookId(occ.bookSlug);
      const text = textByKey.get(`${occ.chapter}:${occ.verse}:${bookId}`) || '';
      return { ref: occ.ref, text };
    }).filter((v) => v.text);
  } catch {
    return [];
  }
}

/** Fetches real KJV text for the first `limit` occurrences, batched per book/chapter to minimize requests. */
export async function getConcordanceVerseSample(strongsId: string, limit = 10): Promise<VerseSampleEntry[]> {
  const concordance = getLexiconConcordance(strongsId);
  if (!concordance || concordance.occurrences.length === 0) return [];
  return fetchVerseTexts(concordance.occurrences.slice(0, limit));
}

/**
 * Fetches real KJV text for up to `limit` occurrences spread evenly across the full
 * occurrence list, so high-frequency words aren't sampled only from their earliest
 * (typically Old-Testament-heavy) hits. Used for AI grounding where representative
 * coverage across the whole canon matters more than "first N".
 */
export async function getConcordanceVerseSampleDistributed(strongsId: string, limit = 40): Promise<VerseSampleEntry[]> {
  const concordance = getLexiconConcordance(strongsId);
  if (!concordance || concordance.occurrences.length === 0) return [];

  const all = concordance.occurrences;
  const sample = all.length <= limit
    ? all
    : Array.from({ length: limit }, (_, i) => all[Math.round(i * (all.length - 1) / (limit - 1))]);

  return fetchVerseTexts(sample);
}
