import fs from 'fs';
import path from 'path';

export interface Devotional {
  title: string;
  slug: string;
  theme: string;
  book: string;
  chapter: number;
  verse: number;
  reference: string;
  opening: string;
  meditation: string;
  application: string;
  prayer: string;
}

interface RawVerse {
  book: string;
  chapter: number;
  verse: number;
  devotional: {
    title: string;
    theme: string;
    opening: string;
    meditation: string;
    application: string;
    prayer: string;
  };
}

interface FeaturedVersesData {
  verses: RawVerse[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

let cachedDevotionals: Devotional[] | null = null;
let cachedBySlug: Map<string, Devotional> | null = null;

function loadDevotionals(): Devotional[] {
  if (cachedDevotionals) return cachedDevotionals;

  const filePath = path.join(process.cwd(), 'data', 'kjvstudy', 'featured_verses.json');
  const raw: FeaturedVersesData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const slugCounts = new Map<string, number>();
  const devotionals: Devotional[] = [];

  for (const entry of raw.verses) {
    const baseSlug = slugify(entry.devotional.title);
    const count = slugCounts.get(baseSlug) || 0;
    slugCounts.set(baseSlug, count + 1);

    const slug = count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;

    devotionals.push({
      title: entry.devotional.title,
      slug,
      theme: entry.devotional.theme,
      book: entry.book,
      chapter: entry.chapter,
      verse: entry.verse,
      reference: `${entry.book} ${entry.chapter}:${entry.verse}`,
      opening: entry.devotional.opening,
      meditation: entry.devotional.meditation,
      application: entry.devotional.application,
      prayer: entry.devotional.prayer,
    });
  }

  cachedDevotionals = devotionals;
  return devotionals;
}

function buildSlugIndex(): Map<string, Devotional> {
  if (cachedBySlug) return cachedBySlug;
  const devotionals = loadDevotionals();
  cachedBySlug = new Map(devotionals.map(d => [d.slug, d]));
  return cachedBySlug;
}

export function getAllDevotionals(): Devotional[] {
  return loadDevotionals();
}

export function getDevotionalBySlug(slug: string): Devotional | undefined {
  return buildSlugIndex().get(slug);
}

export function getDevotionalThemes(): { theme: string; count: number }[] {
  const devotionals = loadDevotionals();
  const themeMap = new Map<string, number>();
  for (const d of devotionals) {
    themeMap.set(d.theme, (themeMap.get(d.theme) || 0) + 1);
  }
  return Array.from(themeMap.entries())
    .map(([theme, count]) => ({ theme, count }))
    .sort((a, b) => b.count - a.count);
}

export function getDevotionalsByTheme(theme: string): Devotional[] {
  return loadDevotionals().filter(d => d.theme === theme);
}

export function getDevotionalsStats(): {
  total: number;
  themes: number;
  books: number;
} {
  const devotionals = loadDevotionals();
  const themes = new Set(devotionals.map(d => d.theme));
  const books = new Set(devotionals.map(d => d.book));
  return {
    total: devotionals.length,
    themes: themes.size,
    books: books.size,
  };
}
