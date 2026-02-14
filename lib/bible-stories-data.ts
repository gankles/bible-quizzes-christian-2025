import fs from 'fs';
import path from 'path';

export interface BibleStory {
  reference: string;
  title: string;
  slug: string;
  book: string;
  chapter: number;
  bookSlug: string;
}

let _cache: BibleStory[] | null = null;

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function extractBook(reference: string): string {
  // Extract book name from references like "Genesis 1:1-25" or "1 Samuel 3:1-18"
  const match = reference.match(/^(\d?\s?[A-Za-z]+)\s/);
  return match ? match[1].trim() : '';
}

function extractChapter(reference: string): number {
  const match = reference.match(/(\d+):/);
  return match ? parseInt(match[1], 10) : 0;
}

function loadAll(): BibleStory[] {
  if (_cache) return _cache;

  const csvPath = path.join(process.cwd(), "Children's Bible stories - Sheet1.csv");
  if (!fs.existsSync(csvPath)) return [];

  const csv = fs.readFileSync(csvPath, 'utf-8');
  const clean = csv.charCodeAt(0) === 0xFEFF ? csv.slice(1) : csv;
  const lines = clean.trim().split('\n');

  // The CSV is a matrix: first column is Reference, second is Story title
  // Rows 1-6 are headers/metadata, row 7 is separator, actual data starts at row 8
  const stories: BibleStory[] = [];
  const slugCounts = new Map<string, number>();

  for (let i = 7; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Split on first two commas to get Reference and Story
    const firstComma = line.indexOf(',');
    if (firstComma === -1) continue;

    const reference = line.slice(0, firstComma).trim();
    if (!reference || !reference.match(/^[0-9]?\s?[A-Z]/i)) continue;

    const rest = line.slice(firstComma + 1);
    const secondComma = rest.indexOf(',');
    const title = (secondComma === -1 ? rest : rest.slice(0, secondComma)).trim();
    if (!title) continue;

    const book = extractBook(reference);
    const chapter = extractChapter(reference);
    let baseSlug = toSlug(title);
    if (!baseSlug) baseSlug = toSlug(reference);

    // Deduplicate slugs
    const count = slugCounts.get(baseSlug) || 0;
    slugCounts.set(baseSlug, count + 1);
    const slug = count > 0 ? `${baseSlug}-${count + 1}` : baseSlug;

    stories.push({
      reference,
      title,
      slug,
      book,
      chapter,
      bookSlug: toSlug(book),
    });
  }

  _cache = stories;
  return _cache;
}

// ── Public API ──

export function getAllStories(): BibleStory[] {
  return loadAll();
}

export function getStoryBySlug(slug: string): BibleStory | undefined {
  return loadAll().find(s => s.slug === slug);
}

export function getStoriesByBook(bookSlug: string): BibleStory[] {
  return loadAll().filter(s => s.bookSlug === bookSlug);
}

export function getStoryBooks(): string[] {
  const books = new Set<string>();
  for (const s of loadAll()) {
    if (s.book) books.add(s.book);
  }
  return Array.from(books);
}

export function getStoriesStats() {
  const all = loadAll();
  return {
    total: all.length,
    books: getStoryBooks().length,
  };
}
