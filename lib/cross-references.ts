import crossRefData from '../data/cross-references.json';

export interface FormattedCrossRef {
  reference: string;
  bookSlug: string;
  bookName: string;
  chapter: number;
  verse: number;
  verseEnd?: number;
  votes: number;
  url: string;
}

// Compact format: [display, votes, slug, chapter, verse, verseEnd?]
type CompactRef = [string, number, string, number, number, number?];
const data = crossRefData as unknown as Record<string, CompactRef[]>;

function formatRef(r: CompactRef): FormattedCrossRef {
  const [display, votes, slug, chapter, verse, verseEnd] = r;
  const bookName = display.split(' ').slice(0, -1).join(' ');
  return {
    reference: display,
    bookSlug: slug,
    bookName,
    chapter,
    verse,
    verseEnd: verseEnd || undefined,
    votes,
    url: `/verses/${slug}/${chapter}/${verse}`,
  };
}

export function getCrossReferences(
  bookSlug: string,
  chapter: number,
  verse: number,
  limit: number = 6
): FormattedCrossRef[] {
  const key = `${bookSlug}-${chapter}-${verse}`;
  const refs = data[key];
  if (!refs || refs.length === 0) return [];
  return refs.slice(0, limit).map(formatRef);
}

export function getAllCrossReferenceKeys(): string[] {
  return Object.keys(data);
}

export function getCrossReferenceCount(
  bookSlug: string,
  chapter: number,
  verse: number
): number {
  const key = `${bookSlug}-${chapter}-${verse}`;
  const refs = data[key];
  return refs ? refs.length : 0;
}

export function formatCrossRefUrl(bookSlug: string, chapter: number, verse: number): string {
  return `/verses/${bookSlug}/${chapter}/${verse}`;
}
