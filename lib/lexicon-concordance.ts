import fs from 'fs';
import path from 'path';
import { BIBLE_BOOKS } from './bible-data';

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
