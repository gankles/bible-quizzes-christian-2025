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
  // 10-section rich format
  overview: string;
  structure: string;
  keyVerses: Array<{ reference: string; text: string; significance: string }>;
  characters: Array<{ name: string; description: string }>;
  themes: Array<{ theme: string; description: string }>;
  historicalContext: string;
  theologicalInterpretations: Array<{ view: string; description: string }>;
  crossReferences: Array<{ reference: string; connection: string }>;
  application: string[];
  conclusion: string;
  // Backward compat fields
  timeline: string;
  definitions: Array<{ term: string; definition: string }>;
  outline: Array<{ heading: string; verseRange: string; description: string }>;
  // Legacy field (old-format files only)
  shortSummary?: string;
  keyCharacters?: Array<{ name: string; description: string }>;
}

const summaryCache: Record<string, ChapterSummaryData | null> = {};

export function loadChapterSummary(bookSlug: string, chapter: number): ChapterSummaryData | null {
  const key = `${bookSlug}-${chapter}`;
  if (key in summaryCache) return summaryCache[key];

  const filePath = path.join(process.cwd(), 'data', 'chapter-summaries', `${key}.json`);
  try {
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Normalize: support both old-format and new 10-section format
    const data: ChapterSummaryData = {
      book: raw.book || bookSlug,
      bookName: raw.bookName || '',
      chapter: raw.chapter || chapter,
      title: raw.title || '',
      // New fields with fallbacks from old format
      overview: raw.overview || raw.shortSummary || '',
      structure: raw.structure || '',
      keyVerses: Array.isArray(raw.keyVerses) ? raw.keyVerses : [],
      characters: Array.isArray(raw.characters) ? raw.characters : (Array.isArray(raw.keyCharacters) ? raw.keyCharacters : []),
      themes: Array.isArray(raw.themes) ? raw.themes : [],
      historicalContext: raw.historicalContext || '',
      theologicalInterpretations: Array.isArray(raw.theologicalInterpretations) ? raw.theologicalInterpretations : [],
      crossReferences: Array.isArray(raw.crossReferences) ? raw.crossReferences : [],
      application: Array.isArray(raw.application) ? raw.application : [],
      conclusion: raw.conclusion || '',
      // Always-present fields
      timeline: raw.timeline || '',
      definitions: Array.isArray(raw.definitions) ? raw.definitions : [],
      outline: Array.isArray(raw.outline) ? raw.outline : [],
      // Legacy passthrough
      shortSummary: raw.shortSummary,
      keyCharacters: raw.keyCharacters,
    };

    summaryCache[key] = data;
    return data;
  } catch {
    summaryCache[key] = null;
    return null;
  }
}
