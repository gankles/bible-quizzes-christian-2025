import fs from 'fs';
import path from 'path';

export interface VerseComparisonEssay {
  slug: string;
  ref1: string;
  ref2: string;
  insight: string;
  generatedAt: string;
}

export interface VerseComparisonPair {
  slug: string;
  slug1: string;
  slug2: string;
  ref1: string;
  ref2: string;
  votes: number;
}

const cache = new Map<string, VerseComparisonEssay | null>();
let manifestCache: VerseComparisonPair[] | null = null;

export function getVerseComparisonEssay(slug1: string, slug2: string): VerseComparisonEssay | null {
  const slug = `${slug1}-and-${slug2}`;
  if (cache.has(slug)) return cache.get(slug)!;
  try {
    const filePath = path.join(process.cwd(), 'data', 'verse-comparisons', `${slug}.json`);
    const essay = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    cache.set(slug, essay);
    return essay;
  } catch {
    cache.set(slug, null);
    return null;
  }
}

function loadManifest(): VerseComparisonPair[] {
  if (manifestCache) return manifestCache;
  try {
    const filePath = path.join(process.cwd(), 'data', 'verse-comparisons', '_manifest.json');
    manifestCache = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    manifestCache = [];
  }
  return manifestCache!;
}

export function getComparisonsForVerse(bookSlug: string, chapter: number, verse: number): VerseComparisonPair[] {
  const slug = `${bookSlug}-${chapter}-${verse}`;
  return loadManifest().filter(p => p.slug1 === slug || p.slug2 === slug);
}
