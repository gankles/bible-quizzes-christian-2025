import fs from 'fs';
import path from 'path';

export interface InterlinearWord {
  position: number;
  original: string;
  transliteration: string;
  strongs: string;
  english: string;
  parsing: string;
  definition: string;
}

const SLUG_TO_FILE: Record<string, string> = {
  'genesis': 'genesis', 'exodus': 'exodus', 'leviticus': 'leviticus',
  'numbers': 'numbers', 'deuteronomy': 'deuteronomy', 'joshua': 'joshua',
  'judges': 'judges', 'ruth': 'ruth', '1-samuel': '1_samuel',
  '2-samuel': '2_samuel', '1-kings': '1_kings', '2-kings': '2_kings',
  '1-chronicles': '1_chronicles', '2-chronicles': '2_chronicles',
  'ezra': 'ezra', 'nehemiah': 'nehemiah', 'esther': 'esther',
  'job': 'job', 'psalms': 'psalms', 'proverbs': 'proverbs',
  'ecclesiastes': 'ecclesiastes', 'song-of-solomon': "solomon's_song",
  'isaiah': 'isaiah', 'jeremiah': 'jeremiah', 'lamentations': 'lamentations',
  'ezekiel': 'ezekiel', 'daniel': 'daniel', 'hosea': 'hosea',
  'joel': 'joel', 'amos': 'amos', 'obadiah': 'obadiah', 'jonah': 'jonah',
  'micah': 'micah', 'nahum': 'nahum', 'habakkuk': 'habakkuk',
  'zephaniah': 'zephaniah', 'haggai': 'haggai', 'zechariah': 'zechariah',
  'malachi': 'malachi', 'matthew': 'matthew', 'mark': 'mark',
  'luke': 'luke', 'john': 'john', 'acts': 'acts', 'romans': 'romans',
  '1-corinthians': '1_corinthians', '2-corinthians': '2_corinthians',
  'galatians': 'galatians', 'ephesians': 'ephesians',
  'philippians': 'philippians', 'colossians': 'colossians',
  '1-thessalonians': '1_thessalonians', '2-thessalonians': '2_thessalonians',
  '1-timothy': '1_timothy', '2-timothy': '2_timothy', 'titus': 'titus',
  'philemon': 'philemon', 'hebrews': 'hebrews', 'james': 'james',
  '1-peter': '1_peter', '2-peter': '2_peter', '1-john': '1_john',
  '2-john': '2_john', '3-john': '3_john', 'jude': 'jude',
  'revelation': 'revelation',
};

// Book name as used in the interlinear JSON keys (e.g. "Genesis", "1 Samuel")
const SLUG_TO_BOOK_NAME: Record<string, string> = {
  'genesis': 'Genesis', 'exodus': 'Exodus', 'leviticus': 'Leviticus',
  'numbers': 'Numbers', 'deuteronomy': 'Deuteronomy', 'joshua': 'Joshua',
  'judges': 'Judges', 'ruth': 'Ruth', '1-samuel': '1 Samuel',
  '2-samuel': '2 Samuel', '1-kings': '1 Kings', '2-kings': '2 Kings',
  '1-chronicles': '1 Chronicles', '2-chronicles': '2 Chronicles',
  'ezra': 'Ezra', 'nehemiah': 'Nehemiah', 'esther': 'Esther',
  'job': 'Job', 'psalms': 'Psalms', 'proverbs': 'Proverbs',
  'ecclesiastes': 'Ecclesiastes', 'song-of-solomon': "Solomon's Song",
  'isaiah': 'Isaiah', 'jeremiah': 'Jeremiah', 'lamentations': 'Lamentations',
  'ezekiel': 'Ezekiel', 'daniel': 'Daniel', 'hosea': 'Hosea',
  'joel': 'Joel', 'amos': 'Amos', 'obadiah': 'Obadiah', 'jonah': 'Jonah',
  'micah': 'Micah', 'nahum': 'Nahum', 'habakkuk': 'Habakkuk',
  'zephaniah': 'Zephaniah', 'haggai': 'Haggai', 'zechariah': 'Zechariah',
  'malachi': 'Malachi', 'matthew': 'Matthew', 'mark': 'Mark',
  'luke': 'Luke', 'john': 'John', 'acts': 'Acts', 'romans': 'Romans',
  '1-corinthians': '1 Corinthians', '2-corinthians': '2 Corinthians',
  'galatians': 'Galatians', 'ephesians': 'Ephesians',
  'philippians': 'Philippians', 'colossians': 'Colossians',
  '1-thessalonians': '1 Thessalonians', '2-thessalonians': '2 Thessalonians',
  '1-timothy': '1 Timothy', '2-timothy': '2 Timothy', 'titus': 'Titus',
  'philemon': 'Philemon', 'hebrews': 'Hebrews', 'james': 'James',
  '1-peter': '1 Peter', '2-peter': '2 Peter', '1-john': '1 John',
  '2-john': '2 John', '3-john': '3 John', 'jude': 'Jude',
  'revelation': 'Revelation',
};

const bookCache: Record<string, Record<string, InterlinearWord[]> | null> = {};

function loadBook(bookSlug: string): Record<string, InterlinearWord[]> | null {
  if (bookSlug in bookCache) return bookCache[bookSlug];

  const filename = SLUG_TO_FILE[bookSlug];
  if (!filename) {
    bookCache[bookSlug] = null;
    return null;
  }

  const filePath = path.join(process.cwd(), 'data', 'kjvstudy', 'interlinear', `${filename}.json`);
  try {
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    bookCache[bookSlug] = raw;
    return raw;
  } catch {
    bookCache[bookSlug] = null;
    return null;
  }
}

export function getInterlinearVerse(bookSlug: string, chapter: number, verse: number): InterlinearWord[] | null {
  const bookData = loadBook(bookSlug);
  if (!bookData) return null;

  const bookName = SLUG_TO_BOOK_NAME[bookSlug];
  if (!bookName) return null;

  const key = `${bookName}:${chapter}:${verse}`;
  return bookData[key] || null;
}

export function isOldTestament(bookSlug: string): boolean {
  const otBooks = [
    'genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy', 'joshua',
    'judges', 'ruth', '1-samuel', '2-samuel', '1-kings', '2-kings',
    '1-chronicles', '2-chronicles', 'ezra', 'nehemiah', 'esther', 'job',
    'psalms', 'proverbs', 'ecclesiastes', 'song-of-solomon', 'isaiah',
    'jeremiah', 'lamentations', 'ezekiel', 'daniel', 'hosea', 'joel',
    'amos', 'obadiah', 'jonah', 'micah', 'nahum', 'habakkuk', 'zephaniah',
    'haggai', 'zechariah', 'malachi',
  ];
  return otBooks.includes(bookSlug);
}

export function getBookName(bookSlug: string): string | null {
  return SLUG_TO_BOOK_NAME[bookSlug] || null;
}

export function getAllInterlinearBookSlugs(): string[] {
  return Object.keys(SLUG_TO_FILE);
}

/** Get all chapter numbers that have interlinear data for a book */
export function getInterlinearChapters(bookSlug: string): number[] {
  const bookData = loadBook(bookSlug);
  if (!bookData) return [];

  const chapters = new Set<number>();
  for (const key of Object.keys(bookData)) {
    const parts = key.split(':');
    const ch = parseInt(parts[parts.length - 2], 10);
    if (!isNaN(ch)) chapters.add(ch);
  }
  return Array.from(chapters).sort((a, b) => a - b);
}

/** Get all verse numbers for a chapter with their English preview text */
export function getInterlinearChapterVerses(
  bookSlug: string,
  chapter: number
): { verse: number; preview: string }[] {
  const bookData = loadBook(bookSlug);
  if (!bookData) return [];

  const bookName = SLUG_TO_BOOK_NAME[bookSlug];
  if (!bookName) return [];

  const verses: { verse: number; preview: string }[] = [];
  const prefix = `${bookName}:${chapter}:`;

  for (const [key, words] of Object.entries(bookData)) {
    if (!key.startsWith(prefix)) continue;
    const verseNum = parseInt(key.split(':')[2], 10);
    if (isNaN(verseNum)) continue;
    const preview = words.slice(0, 6).map((w) => w.english).join(' ');
    verses.push({ verse: verseNum, preview });
  }

  return verses.sort((a, b) => a.verse - b.verse);
}
