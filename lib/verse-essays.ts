import fs from 'fs';
import path from 'path';

export interface VerseEssay {
  slug: string;
  reference: string;
  historicalContext: string;
  theologicalSignificance: string;
  generatedAt: string;
}

const cache = new Map<string, VerseEssay | null>();

export function verseEssaySlug(bookSlug: string, chapter: number, verse: number): string {
  return `${bookSlug}-${chapter}-${verse}`;
}

export function getVerseEssay(bookSlug: string, chapter: number, verse: number): VerseEssay | null {
  const slug = verseEssaySlug(bookSlug, chapter, verse);
  if (cache.has(slug)) return cache.get(slug)!;
  try {
    const filePath = path.join(process.cwd(), 'data', 'verse-essays', `${slug}.json`);
    const essay = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    cache.set(slug, essay);
    return essay;
  } catch {
    cache.set(slug, null);
    return null;
  }
}
