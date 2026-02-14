import fs from 'fs';
import path from 'path';

interface CommentaryData {
  [verseKey: string]: string;
}

const cache: Record<string, CommentaryData> = {};

function loadCommentary(name: string): CommentaryData {
  if (cache[name]) return cache[name];

  const filePath = path.join(process.cwd(), 'data', 'commentaries', `${name}.json`);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    cache[name] = JSON.parse(raw);
  } catch {
    cache[name] = {};
  }
  return cache[name];
}

export function getEllicottCommentary(bookSlug: string, chapter: number, verse: number): string | null {
  const data = loadCommentary('ellicott');
  const key = `${bookSlug}-${chapter}-${verse}`;
  return data[key] || null;
}

export function getJFBCommentary(bookSlug: string, chapter: number, verse: number): string | null {
  const data = loadCommentary('jfb');
  const key = `${bookSlug}-${chapter}-${verse}`;
  return data[key] || null;
}

export function getMHCCCommentary(bookSlug: string, chapter: number, verse: number): string | null {
  const data = loadCommentary('mhcc');
  const key = `${bookSlug}-${chapter}-${verse}`;
  return data[key] || null;
}

export interface VerseCommentary {
  text: string;
  source: string;
  author: string;
}

/**
 * Get commentary for a verse with fallback chain:
 * Ellicott (74%) → JFB (93.1% combined) → MHCC (98.4% combined)
 */
export function getVerseCommentary(bookSlug: string, chapter: number, verse: number): VerseCommentary | null {
  const key = `${bookSlug}-${chapter}-${verse}`;

  const ellicott = loadCommentary('ellicott');
  if (ellicott[key]) {
    return {
      text: ellicott[key],
      source: "Ellicott\u2019s Commentary for English Readers",
      author: "Charles John Ellicott (1819\u20131905)",
    };
  }

  const jfb = loadCommentary('jfb');
  if (jfb[key]) {
    return {
      text: jfb[key],
      source: "Jamieson-Fausset-Brown Bible Commentary",
      author: "Robert Jamieson, A.R. Fausset, David Brown",
    };
  }

  const mhcc = loadCommentary('mhcc');
  if (mhcc[key]) {
    return {
      text: mhcc[key],
      source: "Matthew Henry\u2019s Concise Commentary",
      author: "Matthew Henry (1662\u20131714)",
    };
  }

  return null;
}
