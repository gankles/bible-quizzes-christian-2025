/**
 * Client-safe utility for parsing verse references into URLs.
 * Used to interlink quiz question references to cross-reference pages.
 */

// Reverse map: display name → slug
const NAME_TO_SLUG: Record<string, string> = {
  'genesis': 'genesis', 'exodus': 'exodus', 'leviticus': 'leviticus',
  'numbers': 'numbers', 'deuteronomy': 'deuteronomy', 'joshua': 'joshua',
  'judges': 'judges', 'ruth': 'ruth', '1 samuel': '1-samuel', '2 samuel': '2-samuel',
  '1 kings': '1-kings', '2 kings': '2-kings', '1 chronicles': '1-chronicles',
  '2 chronicles': '2-chronicles', 'ezra': 'ezra', 'nehemiah': 'nehemiah',
  'esther': 'esther', 'job': 'job', 'psalms': 'psalms', 'psalm': 'psalms',
  'proverbs': 'proverbs', 'ecclesiastes': 'ecclesiastes',
  'song of solomon': 'song-of-solomon', 'song of songs': 'song-of-solomon',
  'isaiah': 'isaiah', 'jeremiah': 'jeremiah', 'lamentations': 'lamentations',
  'ezekiel': 'ezekiel', 'daniel': 'daniel', 'hosea': 'hosea', 'joel': 'joel',
  'amos': 'amos', 'obadiah': 'obadiah', 'jonah': 'jonah', 'micah': 'micah',
  'nahum': 'nahum', 'habakkuk': 'habakkuk', 'zephaniah': 'zephaniah',
  'haggai': 'haggai', 'zechariah': 'zechariah', 'malachi': 'malachi',
  'matthew': 'matthew', 'mark': 'mark', 'luke': 'luke', 'john': 'john',
  'acts': 'acts', 'romans': 'romans', '1 corinthians': '1-corinthians',
  '2 corinthians': '2-corinthians', 'galatians': 'galatians', 'ephesians': 'ephesians',
  'philippians': 'philippians', 'colossians': 'colossians',
  '1 thessalonians': '1-thessalonians', '2 thessalonians': '2-thessalonians',
  '1 timothy': '1-timothy', '2 timothy': '2-timothy', 'titus': 'titus',
  'philemon': 'philemon', 'hebrews': 'hebrews', 'james': 'james',
  '1 peter': '1-peter', '2 peter': '2-peter', '1 john': '1-john',
  '2 john': '2-john', '3 john': '3-john', 'jude': 'jude', 'revelation': 'revelation',
};

export interface ParsedVerseRef {
  bookSlug: string;
  chapter: number;
  verse: number;
  crossRefUrl: string;
  verseStudyUrl: string;
}

/**
 * Parse a verse reference string like "Genesis 1:1", "1 John 3:16", "Psalm 23:1"
 * into structured data with URLs.
 * Returns null if parsing fails.
 */
export function parseVerseReference(ref: string): ParsedVerseRef | null {
  if (!ref) return null;

  // Match: "Book Name Chapter:Verse" (handles ranges like "1:1-3" by taking first verse)
  const match = ref.match(/^(.+?)\s+(\d+):(\d+)/);
  if (!match) return null;

  const bookName = match[1].trim().toLowerCase();
  const chapter = parseInt(match[2], 10);
  const verse = parseInt(match[3], 10);

  const slug = NAME_TO_SLUG[bookName];
  if (!slug || isNaN(chapter) || isNaN(verse)) return null;

  return {
    bookSlug: slug,
    chapter,
    verse,
    crossRefUrl: `/cross-references/${slug}/${chapter}/${verse}`,
    verseStudyUrl: `/verses/${slug}/${chapter}/${verse}`,
  };
}

/**
 * Get the primary link URL for a verse reference.
 * Links to the verse study page for SEO and UX.
 */
export function getVerseReferenceUrl(ref: string): string | null {
  const parsed = parseVerseReference(ref);
  return parsed ? parsed.verseStudyUrl : null;
}

/**
 * Get the cross-reference page URL for a verse reference.
 */
export function getCrossRefPageUrl(ref: string): string | null {
  const parsed = parseVerseReference(ref);
  return parsed ? parsed.crossRefUrl : null;
}
