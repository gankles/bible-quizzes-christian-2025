import fs from 'fs';
import path from 'path';

export interface BibleStory {
  title: string;
  slug: string;
  description: string;
  category: string;
  categorySlug: string;
  verses: string[];
  themes: string[];
  characters: string[];
  narrative: string;
  kidsTitle: string;
  kidsDescription: string;
  kidsNarrative: string;
  book: string;
  bookSlug: string;
  chapter: number;
}

export interface StoryCategory {
  name: string;
  slug: string;
  description: string;
}

interface RawStory {
  title: string;
  slug: string;
  description: string;
  verses: string[];
  themes: string[];
  characters: string[];
  narrative: string;
  kids_title: string;
  kids_description: string;
  kids_narrative: string;
}

interface RawFile {
  category: string;
  slug: string;
  description: string;
  stories: RawStory[];
}

let _cache: BibleStory[] | null = null;
let _categoryCache: StoryCategory[] | null = null;

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function extractBookAndChapter(verseRef: string): { book: string; chapter: number } {
  // Match book name (optional leading digit + words) and chapter number
  // Examples: "Genesis 1:1-31", "1 Samuel 3:1-21", "Exodus 14:1-31"
  const match = verseRef.match(/^(\d?\s?[A-Za-z]+(?:\s+of\s+[A-Za-z]+)?)\s+(\d+)/);
  if (match) {
    return { book: match[1].trim(), chapter: parseInt(match[2], 10) };
  }
  return { book: '', chapter: 0 };
}

function loadAll(): BibleStory[] {
  if (_cache) return _cache;

  const storiesDir = path.join(process.cwd(), 'data/kjvstudy/stories');
  if (!fs.existsSync(storiesDir)) return [];

  const files = fs.readdirSync(storiesDir)
    .filter(f => f.endsWith('.json'))
    .sort();

  const stories: BibleStory[] = [];

  for (const file of files) {
    const raw: RawFile = JSON.parse(
      fs.readFileSync(path.join(storiesDir, file), 'utf-8')
    );

    for (const s of raw.stories) {
      const firstVerse = s.verses[0] || '';
      const { book, chapter } = extractBookAndChapter(firstVerse);

      stories.push({
        title: s.title,
        slug: s.slug,
        description: s.description,
        category: raw.category,
        categorySlug: raw.slug,
        verses: s.verses,
        themes: s.themes,
        characters: s.characters,
        narrative: s.narrative,
        kidsTitle: s.kids_title,
        kidsDescription: s.kids_description || '',
        kidsNarrative: s.kids_narrative,
        book,
        bookSlug: toSlug(book),
        chapter,
      });
    }
  }

  _cache = stories;
  return _cache;
}

function loadCategories(): StoryCategory[] {
  if (_categoryCache) return _categoryCache;

  const storiesDir = path.join(process.cwd(), 'data/kjvstudy/stories');
  if (!fs.existsSync(storiesDir)) return [];

  const files = fs.readdirSync(storiesDir)
    .filter(f => f.endsWith('.json'))
    .sort();

  const categories: StoryCategory[] = [];

  for (const file of files) {
    const raw: RawFile = JSON.parse(
      fs.readFileSync(path.join(storiesDir, file), 'utf-8')
    );
    categories.push({
      name: raw.category,
      slug: raw.slug,
      description: raw.description,
    });
  }

  _categoryCache = categories;
  return _categoryCache;
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
    categories: getCategories().length,
  };
}

export function getCategories(): StoryCategory[] {
  return loadCategories();
}

export function getStoriesByCategory(categorySlug: string): BibleStory[] {
  return loadAll().filter(s => s.categorySlug === categorySlug);
}
