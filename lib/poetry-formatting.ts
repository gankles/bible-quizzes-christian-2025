import fs from 'fs';
import path from 'path';

interface PoetryData {
  books: Record<string, {
    is_poetry: boolean;
    poetry_chapters: number[];
  }>;
}

let _cache: PoetryData | null = null;

function loadData(): PoetryData {
  if (_cache) return _cache;
  const filePath = path.join(process.cwd(), 'data', 'kjvstudy', 'poetry_formatting.json');
  try {
    _cache = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    _cache = { books: {} };
  }
  return _cache!;
}

const SLUG_TO_BOOK: Record<string, string> = {
  'psalms': 'Psalms', 'proverbs': 'Proverbs', 'job': 'Job',
  'ecclesiastes': 'Ecclesiastes', 'song-of-solomon': 'Song of Solomon',
  'lamentations': 'Lamentations', 'isaiah': 'Isaiah',
};

export function isPoetryChapter(bookSlug: string, chapter: number): boolean {
  const bookName = SLUG_TO_BOOK[bookSlug];
  if (!bookName) return false;
  const data = loadData();
  const bookData = data.books[bookName];
  if (!bookData) return false;
  return bookData.poetry_chapters.includes(chapter);
}
