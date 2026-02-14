/**
 * Bolls.life Bible API Integration
 * 
 * Comprehensive API service for Bible verses, commentaries, Strong's definitions,
 * and search functionality.
 * 
 * @see https://bolls.life/api/
 */

// =============================================================================
// TYPES
// =============================================================================

/** Available Bible translations */
export type BibleTranslation = 
  | 'KJV' | 'NKJV' | 'ASV' | 'WEB' | 'YLT' | 'DARBY' 
  | 'ESV' | 'NIV' | 'NLT' | 'NASB' | 'RSV'
  | 'SYNOD' | 'UBIO' | 'LXX' | 'WLC' | 'TR';

/** Dictionary types for Strong's lookups */
export type DictionaryType = 'BDBT' | 'RUSD';

/** A single verse from the API */
export interface BollsVerse {
  pk: number;
  translation?: string;
  book: number;
  chapter: number;
  verse: number;
  text: string;
  comment?: string; // Commentary/cross-references (HTML)
}

/** Book information from the API */
export interface BollsBook {
  bookid: number;
  chronorder: number;
  name: string;
  chapters: number;
}

/** Translation metadata */
export interface BollsTranslation {
  short_name: string;
  full_name: string;
  updated?: number;
  dir?: 'rtl' | 'ltr';
}

/** Search result from the API */
export interface BollsSearchResult {
  exact_matches: number;
  total: number;
  results: BollsVerse[];
}

/** Dictionary/Strong's definition */
export interface BollsDictionaryEntry {
  topic: string; // Strong's number (e.g., H157, G25)
  definition: string; // HTML definition
  lexeme: string; // Original word
  transliteration: string;
  pronunciation: string;
  short_definition: string;
  weight: number; // Relevance score 0-1
}

/** Parallel verses request body */
export interface ParallelVersesRequest {
  translations: string[];
  verses: number[];
  chapter: number;
  book: number;
}

/** Fetch verses request body */
export interface FetchVersesRequest {
  translation: string;
  book: number;
  chapter: number;
  verses: number[];
}

// =============================================================================
// CONFIGURATION
// =============================================================================

const BASE_URL = 'https://bolls.life';

/** Book ID mapping (Bolls.life uses numeric IDs) */
export const BOOK_IDS: Record<string, number> = {
  'genesis': 1, 'exodus': 2, 'leviticus': 3, 'numbers': 4, 'deuteronomy': 5,
  'joshua': 6, 'judges': 7, 'ruth': 8, '1-samuel': 9, '2-samuel': 10,
  '1-kings': 11, '2-kings': 12, '1-chronicles': 13, '2-chronicles': 14,
  'ezra': 15, 'nehemiah': 16, 'esther': 17, 'job': 18, 'psalms': 19,
  'proverbs': 20, 'ecclesiastes': 21, 'song-of-solomon': 22, 'isaiah': 23,
  'jeremiah': 24, 'lamentations': 25, 'ezekiel': 26, 'daniel': 27,
  'hosea': 28, 'joel': 29, 'amos': 30, 'obadiah': 31, 'jonah': 32,
  'micah': 33, 'nahum': 34, 'habakkuk': 35, 'zephaniah': 36, 'haggai': 37,
  'zechariah': 38, 'malachi': 39,
  // New Testament
  'matthew': 40, 'mark': 41, 'luke': 42, 'john': 43, 'acts': 44,
  'romans': 45, '1-corinthians': 46, '2-corinthians': 47, 'galatians': 48,
  'ephesians': 49, 'philippians': 50, 'colossians': 51, '1-thessalonians': 52,
  '2-thessalonians': 53, '1-timothy': 54, '2-timothy': 55, 'titus': 56,
  'philemon': 57, 'hebrews': 58, 'james': 59, '1-peter': 60, '2-peter': 61,
  '1-john': 62, '2-john': 63, '3-john': 64, 'jude': 65, 'revelation': 66,
};

/** Reverse mapping: Book ID to slug */
export const BOOK_SLUGS: Record<number, string> = Object.entries(BOOK_IDS).reduce(
  (acc, [slug, id]) => ({ ...acc, [id]: slug }),
  {} as Record<number, string>
);

/** Book names for display */
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

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Convert book slug to Bolls.life book ID
 */
export function getBookId(bookSlug: string): number | undefined {
  return BOOK_IDS[bookSlug.toLowerCase()];
}

/**
 * Convert Bolls.life book ID to slug
 */
export function getBookSlug(bookId: number): string | undefined {
  return BOOK_SLUGS[bookId];
}

/**
 * Get display name for a book
 */
export function getBookName(bookSlug: string): string {
  return BOOK_NAMES[bookSlug.toLowerCase()] || bookSlug;
}

/**
 * Strip HTML tags from text, including Strong's number tags
 */
export function stripHtml(html: string): string {
  // Remove Strong's number tags and their content: <S>1063</S> → ""
  let text = html.replace(/<S>\d+<\/S>/gi, '');
  // Remove any remaining HTML tags
  text = text.replace(/<[^>]*>/g, '');
  // Clean up extra spaces left behind
  return text.replace(/\s{2,}/g, ' ').trim();
}

/**
 * Format verse reference for display
 */
export function formatReference(bookSlug: string, chapter: number, verse?: number): string {
  const bookName = getBookName(bookSlug);
  return verse ? `${bookName} ${chapter}:${verse}` : `${bookName} ${chapter}`;
}

// =============================================================================
// API FUNCTIONS
// =============================================================================

/**
 * Get list of available translations
 */
export async function getTranslations(): Promise<BollsTranslation[]> {
  const response = await fetch(`${BASE_URL}/static/bolls/app/views/languages.json`);
  if (!response.ok) throw new Error('Failed to fetch translations');
  return response.json();
}

/**
 * Get list of books for a translation
 */
export async function getBooks(translation: string = 'KJV'): Promise<BollsBook[]> {
  const response = await fetch(`${BASE_URL}/get-books/${translation}/`);
  if (!response.ok) throw new Error(`Failed to fetch books for ${translation}`);
  return response.json();
}

/**
 * Get a chapter WITHOUT commentary
 */
export async function getChapter(
  translation: string,
  bookSlug: string,
  chapter: number
): Promise<BollsVerse[]> {
  const bookId = getBookId(bookSlug);
  if (!bookId) throw new Error(`Unknown book: ${bookSlug}`);
  
  const response = await fetch(`${BASE_URL}/get-text/${translation}/${bookId}/${chapter}/`);
  if (!response.ok) throw new Error(`Failed to fetch ${bookSlug} ${chapter}`);
  return response.json();
}

/**
 * Get a chapter WITH commentary (Matthew Henry, cross-references, etc.)
 */
export async function getChapterWithCommentary(
  translation: string,
  bookSlug: string,
  chapter: number
): Promise<BollsVerse[]> {
  const bookId = getBookId(bookSlug);
  if (!bookId) throw new Error(`Unknown book: ${bookSlug}`);
  
  const response = await fetch(`${BASE_URL}/get-chapter/${translation}/${bookId}/${chapter}/`);
  if (!response.ok) throw new Error(`Failed to fetch ${bookSlug} ${chapter} with commentary`);
  return response.json();
}

/**
 * Get a single verse
 */
export async function getVerse(
  translation: string,
  bookSlug: string,
  chapter: number,
  verse: number
): Promise<BollsVerse> {
  const bookId = getBookId(bookSlug);
  if (!bookId) throw new Error(`Unknown book: ${bookSlug}`);
  
  const response = await fetch(`${BASE_URL}/get-verse/${translation}/${bookId}/${chapter}/${verse}/`);
  if (!response.ok) throw new Error(`Failed to fetch ${bookSlug} ${chapter}:${verse}`);
  return response.json();
}

/**
 * Get multiple specific verses from different locations
 */
export async function getVerses(requests: FetchVersesRequest[]): Promise<BollsVerse[][]> {
  const response = await fetch(`${BASE_URL}/get-verses/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requests),
  });
  if (!response.ok) throw new Error('Failed to fetch verses');
  return response.json();
}

/**
 * Compare verses across multiple translations
 */
export async function getParallelVerses(
  translations: string[],
  bookSlug: string,
  chapter: number,
  verses: number[]
): Promise<BollsVerse[][]> {
  const bookId = getBookId(bookSlug);
  if (!bookId) throw new Error(`Unknown book: ${bookSlug}`);
  
  const response = await fetch(`${BASE_URL}/get-parallel-verses/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      translations,
      verses,
      chapter,
      book: bookId,
    }),
  });
  if (!response.ok) throw new Error('Failed to fetch parallel verses');
  return response.json();
}

/**
 * Search the Bible for a keyword or phrase
 */
export async function searchBible(
  translation: string,
  query: string,
  options?: {
    matchCase?: boolean;
    matchWhole?: boolean;
    book?: string | 'ot' | 'nt';
    page?: number;
    limit?: number;
  }
): Promise<BollsSearchResult> {
  const params = new URLSearchParams({
    search: query,
    match_case: String(options?.matchCase ?? false),
    match_whole: String(options?.matchWhole ?? false),
    page: String(options?.page ?? 1),
    limit: String(options?.limit ?? 50),
  });
  
  if (options?.book) {
    params.append('book', options.book);
  }
  
  const response = await fetch(`${BASE_URL}/v2/find/${translation}?${params}`);
  if (!response.ok) throw new Error(`Search failed for "${query}"`);
  return response.json();
}

/**
 * Get a random verse
 */
export async function getRandomVerse(translation: string = 'KJV'): Promise<BollsVerse> {
  const response = await fetch(`${BASE_URL}/get-random-verse/${translation}/`);
  if (!response.ok) throw new Error('Failed to fetch random verse');
  return response.json();
}

/**
 * Get Strong's dictionary definition for a Hebrew or Greek word
 * 
 * @param dict - Dictionary to use: 'BDBT' (Brown-Driver-Briggs/Thayer's) or 'RUSD' (Russian)
 * @param query - Hebrew/Greek word, Strong's number (H157, G25), or English word
 * @param extended - Include extended search results
 */
export async function getDictionaryDefinition(
  dict: DictionaryType,
  query: string,
  extended: boolean = false
): Promise<BollsDictionaryEntry[]> {
  const url = extended 
    ? `${BASE_URL}/dictionary-definition/${dict}/${encodeURIComponent(query)}/?extended=true`
    : `${BASE_URL}/dictionary-definition/${dict}/${encodeURIComponent(query)}/`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Dictionary lookup failed for "${query}"`);
  return response.json();
}

/**
 * Get Strong's definition by number (convenience function)
 */
export async function getStrongsDefinition(strongsNumber: string): Promise<BollsDictionaryEntry[]> {
  return getDictionaryDefinition('BDBT', strongsNumber);
}

/**
 * Download a full translation as JSON
 */
export async function downloadTranslation(translation: string): Promise<BollsVerse[]> {
  const response = await fetch(`${BASE_URL}/static/translations/${translation}.json`);
  if (!response.ok) throw new Error(`Failed to download ${translation}`);
  return response.json();
}

/**
 * Download a full dictionary as JSON
 */
export async function downloadDictionary(dict: DictionaryType): Promise<BollsDictionaryEntry[]> {
  const response = await fetch(`${BASE_URL}/static/dictionaries/${dict}.json`);
  if (!response.ok) throw new Error(`Failed to download dictionary ${dict}`);
  return response.json();
}

// =============================================================================
// HIGH-LEVEL CONVENIENCE FUNCTIONS
// =============================================================================

/**
 * Get a verse with its commentary and formatted for display
 */
export async function getVerseWithDetails(
  bookSlug: string,
  chapter: number,
  verse: number,
  translation: string = 'KJV'
): Promise<{
  reference: string;
  text: string;
  commentary: string | null;
  translation: string;
  bookName: string;
  chapter: number;
  verse: number;
}> {
  const verses = await getChapterWithCommentary(translation, bookSlug, chapter);
  const verseData = verses.find(v => v.verse === verse);
  
  if (!verseData) {
    throw new Error(`Verse not found: ${bookSlug} ${chapter}:${verse}`);
  }
  
  return {
    reference: formatReference(bookSlug, chapter, verse),
    text: stripHtml(verseData.text),
    commentary: verseData.comment ? verseData.comment : null,
    translation,
    bookName: getBookName(bookSlug),
    chapter,
    verse,
  };
}

/**
 * Get verses about a topic (uses search)
 */
export async function getVersesAboutTopic(
  topic: string,
  translation: string = 'KJV',
  limit: number = 20
): Promise<BollsVerse[]> {
  const result = await searchBible(translation, topic, { limit });
  return result.results;
}

/**
 * Get chapter summary with all verses and commentary
 */
export async function getChapterSummary(
  bookSlug: string,
  chapter: number,
  translation: string = 'KJV'
): Promise<{
  reference: string;
  bookName: string;
  chapter: number;
  verses: Array<{
    verse: number;
    text: string;
    commentary: string | null;
  }>;
  totalVerses: number;
}> {
  const verses = await getChapterWithCommentary(translation, bookSlug, chapter);
  
  return {
    reference: formatReference(bookSlug, chapter),
    bookName: getBookName(bookSlug),
    chapter,
    verses: verses.map(v => ({
      verse: v.verse,
      text: stripHtml(v.text),
      commentary: v.comment || null,
    })),
    totalVerses: verses.length,
  };
}
