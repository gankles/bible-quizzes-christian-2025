import fs from 'fs';
import path from 'path';

interface SectionHeadingsData {
  [book: string]: {
    [chapter: string]: {
      [verse: string]: string;
    };
  };
}

let _cache: SectionHeadingsData | null = null;

function loadData(): SectionHeadingsData {
  if (_cache) return _cache;
  const filePath = path.join(process.cwd(), 'data', 'kjvstudy', 'section_headings.json');
  try {
    _cache = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    _cache = {};
  }
  return _cache!;
}

const SLUG_TO_BOOK: Record<string, string> = {
  'genesis': 'Genesis', 'exodus': 'Exodus', 'leviticus': 'Leviticus',
  'numbers': 'Numbers', 'deuteronomy': 'Deuteronomy', 'joshua': 'Joshua',
  'judges': 'Judges', 'ruth': 'Ruth', '1-samuel': '1 Samuel',
  '2-samuel': '2 Samuel', '1-kings': '1 Kings', '2-kings': '2 Kings',
  '1-chronicles': '1 Chronicles', '2-chronicles': '2 Chronicles',
  'ezra': 'Ezra', 'nehemiah': 'Nehemiah', 'esther': 'Esther',
  'job': 'Job', 'psalms': 'Psalms', 'proverbs': 'Proverbs',
  'ecclesiastes': 'Ecclesiastes', 'song-of-solomon': 'Song of Solomon',
  'isaiah': 'Isaiah', 'jeremiah': 'Jeremiah', 'lamentations': 'Lamentations',
  'ezekiel': 'Ezekiel', 'daniel': 'Daniel', 'hosea': 'Hosea',
  'joel': 'Joel', 'amos': 'Amos', 'obadiah': 'Obadiah',
  'jonah': 'Jonah', 'micah': 'Micah', 'nahum': 'Nahum',
  'habakkuk': 'Habakkuk', 'zephaniah': 'Zephaniah', 'haggai': 'Haggai',
  'zechariah': 'Zechariah', 'malachi': 'Malachi',
  'matthew': 'Matthew', 'mark': 'Mark', 'luke': 'Luke', 'john': 'John',
  'acts': 'Acts', 'romans': 'Romans', '1-corinthians': '1 Corinthians',
  '2-corinthians': '2 Corinthians', 'galatians': 'Galatians',
  'ephesians': 'Ephesians', 'philippians': 'Philippians',
  'colossians': 'Colossians', '1-thessalonians': '1 Thessalonians',
  '2-thessalonians': '2 Thessalonians', '1-timothy': '1 Timothy',
  '2-timothy': '2 Timothy', 'titus': 'Titus', 'philemon': 'Philemon',
  'hebrews': 'Hebrews', 'james': 'James', '1-peter': '1 Peter',
  '2-peter': '2 Peter', '1-john': '1 John', '2-john': '2 John',
  '3-john': '3 John', 'jude': 'Jude', 'revelation': 'Revelation',
};

export function getHeading(bookSlug: string, chapter: number, verse: number): string | null {
  const bookName = SLUG_TO_BOOK[bookSlug];
  if (!bookName) return null;
  const data = loadData();
  return data[bookName]?.[String(chapter)]?.[String(verse)] || null;
}

export function getChapterHeadings(bookSlug: string, chapter: number): Record<number, string> {
  const bookName = SLUG_TO_BOOK[bookSlug];
  if (!bookName) return {};
  const data = loadData();
  const chData = data[bookName]?.[String(chapter)];
  if (!chData) return {};
  const result: Record<number, string> = {};
  for (const [v, text] of Object.entries(chData)) {
    result[parseInt(v)] = text;
  }
  return result;
}
