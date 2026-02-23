import fs from 'fs';
import path from 'path';

export interface ChapterBreakdown {
  title: string;
  keyEvent: string;
  verses: number;
}

export type BookChapterBreakdowns = Record<string, ChapterBreakdown>;

const cache: Record<string, BookChapterBreakdowns | null> = {};

export function loadChapterBreakdown(bookSlug: string): BookChapterBreakdowns | null {
  if (bookSlug in cache) return cache[bookSlug];

  const filePath = path.join(process.cwd(), 'data', 'chapter-breakdowns', `${bookSlug}.json`);
  try {
    const data: BookChapterBreakdowns = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    cache[bookSlug] = data;
    return data;
  } catch {
    cache[bookSlug] = null;
    return null;
  }
}

export function getChapterBreakdown(bookSlug: string, chapter: number): ChapterBreakdown | null {
  const breakdowns = loadChapterBreakdown(bookSlug);
  if (!breakdowns) return null;
  return breakdowns[String(chapter)] || null;
}

export function getTotalVerses(breakdowns: BookChapterBreakdowns): number {
  return Object.values(breakdowns).reduce((sum, ch) => sum + ch.verses, 0);
}

// =============================================================================
// Rich Chapter Summary Data (AI-generated, per-chapter files)
// =============================================================================

export interface ChapterSummaryData {
  book: string;
  bookName: string;
  chapter: number;
  title: string;
  shortSummary: string;
  timeline: string;
  keyCharacters: Array<{ name: string; description: string }>;
  definitions: Array<{ term: string; definition: string }>;
  outline: Array<{
    heading: string;
    verseRange: string;
    description: string;
  }>;
  application: string[];
  keyVerses: Array<{ reference: string; text: string; significance: string }>;
}

const summaryCache: Record<string, ChapterSummaryData | null> = {};

export function loadChapterSummary(bookSlug: string, chapter: number): ChapterSummaryData | null {
  const key = `${bookSlug}-${chapter}`;
  if (key in summaryCache) return summaryCache[key];

  const filePath = path.join(process.cwd(), 'data', 'chapter-summaries', `${key}.json`);
  try {
    const data: ChapterSummaryData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    summaryCache[key] = data;
    return data;
  } catch {
    summaryCache[key] = null;
    return null;
  }
}
