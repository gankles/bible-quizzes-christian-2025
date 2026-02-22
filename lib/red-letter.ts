import fs from 'fs';
import path from 'path';

interface RedLetterData {
  [reference: string]: string;
}

let _cache: RedLetterData | null = null;
let _refSet: Set<string> | null = null;

function loadData(): RedLetterData {
  if (_cache) return _cache;
  const filePath = path.join(process.cwd(), 'data', 'kjvstudy', 'red_letter_verses.json');
  try {
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    _cache = raw.verses || {};
  } catch {
    _cache = {};
  }
  return _cache!;
}

// Build a set of "book-chapter-verse" keys for fast lookup
function buildRefSet(): Set<string> {
  if (_refSet) return _refSet;
  const data = loadData();
  _refSet = new Set<string>();
  for (const ref of Object.keys(data)) {
    // Parse "Matthew 3:15" -> "matthew-3-15"
    const match = ref.match(/^(.+?)\s+(\d+):(\d+)$/);
    if (match) {
      const slug = match[1].toLowerCase().replace(/\s+/g, '-');
      _refSet.add(`${slug}-${match[2]}-${match[3]}`);
    }
  }
  return _refSet;
}

export function isRedLetter(bookSlug: string, chapter: number, verse: number): boolean {
  const set = buildRefSet();
  return set.has(`${bookSlug}-${chapter}-${verse}`);
}

export function getAllRedLetterVerses(): { reference: string; text: string }[] {
  const data = loadData();
  return Object.entries(data).map(([reference, text]) => ({ reference, text }));
}

export function getRedLetterStats(): { totalVerses: number; books: string[] } {
  const data = loadData();
  const refs = Object.keys(data);
  const books = new Set<string>();
  for (const ref of refs) {
    const match = ref.match(/^(.+?)\s+\d/);
    if (match) books.add(match[1]);
  }
  return { totalVerses: refs.length, books: Array.from(books) };
}
