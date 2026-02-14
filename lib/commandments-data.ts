import fs from 'fs';
import path from 'path';

export interface Commandment {
  number: number;
  concept: string;
  polarity: 'P' | 'N'; // Positive (thou shalt) or Negative (thou shalt not)
  referenceId: string; // e.g. "EXO 20:2"
  scriptureEnglish: string;
  scriptureHebrew: string;
  scriptureGreek: string;
  parashah: string;
  seferHachinuchNumber: number;
  mishnahTorahBookNumber: number;
  mishnahTorahBookName: string;
  mishnahTorahCategory: string;
  category: string; // p119f_category
  book: string; // derived: exodus, leviticus, etc.
  chapter: number; // derived from referenceId
  slug: string; // derived: "commandment-1"
}

export interface CommandmentCategory {
  slug: string;
  name: string;
  count: number;
  positive: number;
  negative: number;
}

const USX_TO_SLUG: Record<string, string> = {
  GEN: 'genesis', EXO: 'exodus', LEV: 'leviticus', NUM: 'numbers', DEU: 'deuteronomy',
};

const USX_TO_NAME: Record<string, string> = {
  GEN: 'Genesis', EXO: 'Exodus', LEV: 'Leviticus', NUM: 'Numbers', DEU: 'Deuteronomy',
};

let _cache: Commandment[] | null = null;

function parseCSVLine(line: string): string[] {
  const row: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      row.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  row.push(current.trim());
  return row;
}

function loadAll(): Commandment[] {
  if (_cache) return _cache;

  const csvPath = path.join(process.cwd(), 'data', 'bible-data', 'BibleData-Commandments.csv');
  if (!fs.existsSync(csvPath)) return [];

  const csv = fs.readFileSync(csvPath, 'utf-8');
  // Strip BOM
  const clean = csv.charCodeAt(0) === 0xFEFF ? csv.slice(1) : csv;
  const lines = clean.trim().split('\n');

  _cache = lines.slice(1).map(line => {
    const r = parseCSVLine(line);
    const refId = r[3] || '';
    const refMatch = refId.match(/^([A-Z0-9]+)\s+(\d+):/);
    const usxCode = refMatch ? refMatch[1] : '';
    const chapter = refMatch ? parseInt(refMatch[2], 10) : 0;

    return {
      number: parseInt(r[0], 10),
      concept: r[1],
      polarity: r[2] as 'P' | 'N',
      referenceId: refId,
      scriptureEnglish: r[4],
      scriptureHebrew: r[5],
      scriptureGreek: r[6],
      parashah: r[7],
      seferHachinuchNumber: parseInt(r[8], 10) || 0,
      mishnahTorahBookNumber: parseInt(r[9], 10) || 0,
      mishnahTorahBookName: r[10],
      mishnahTorahCategory: r[11],
      category: r[12],
      book: USX_TO_SLUG[usxCode] || usxCode.toLowerCase(),
      chapter,
      slug: `commandment-${r[0]}`,
    };
  });

  return _cache;
}

// ── Core lookups ──

export function getAllCommandments(): Commandment[] {
  return loadAll();
}

export function getCommandment(num: number): Commandment | undefined {
  return loadAll().find(c => c.number === num);
}

export function getCommandmentsByCategory(category: string): Commandment[] {
  return loadAll().filter(c => c.category === category);
}

export function getCommandmentsByCategorySlug(slug: string): Commandment[] {
  return loadAll().filter(c => categorySlug(c.category) === slug);
}

export function getCommandmentsByBook(bookSlug: string): Commandment[] {
  return loadAll().filter(c => c.book === bookSlug);
}

export function getCommandmentsByChapter(bookSlug: string, chapter: number): Commandment[] {
  return loadAll().filter(c => c.book === bookSlug && c.chapter === chapter);
}

export function getCommandmentsByPolarity(polarity: 'P' | 'N'): Commandment[] {
  return loadAll().filter(c => c.polarity === polarity);
}

// ── Categories ──

export function categorySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getAllCategories(): CommandmentCategory[] {
  const all = loadAll();
  const map = new Map<string, { count: number; positive: number; negative: number }>();

  for (const c of all) {
    const cat = c.category;
    if (!map.has(cat)) map.set(cat, { count: 0, positive: 0, negative: 0 });
    const entry = map.get(cat)!;
    entry.count++;
    if (c.polarity === 'P') entry.positive++;
    else entry.negative++;
  }

  return Array.from(map.entries())
    .map(([name, stats]) => ({
      slug: categorySlug(name),
      name,
      ...stats,
    }))
    .sort((a, b) => b.count - a.count);
}

export function getCategoryBySlug(slug: string): CommandmentCategory | undefined {
  return getAllCategories().find(c => c.slug === slug);
}

// ── Chapter helpers ──

export interface ChapterCommandmentSummary {
  bookSlug: string;
  chapter: number;
  count: number;
  positive: number;
  negative: number;
  commandments: Commandment[];
}

export function getChaptersWithCommandments(): ChapterCommandmentSummary[] {
  const all = loadAll();
  const map = new Map<string, ChapterCommandmentSummary>();

  for (const c of all) {
    const key = `${c.book}-${c.chapter}`;
    if (!map.has(key)) {
      map.set(key, {
        bookSlug: c.book,
        chapter: c.chapter,
        count: 0,
        positive: 0,
        negative: 0,
        commandments: [],
      });
    }
    const entry = map.get(key)!;
    entry.count++;
    if (c.polarity === 'P') entry.positive++;
    else entry.negative++;
    entry.commandments.push(c);
  }

  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

// ── Stats ──

export function getCommandmentStats() {
  const all = loadAll();
  return {
    total: all.length,
    positive: all.filter(c => c.polarity === 'P').length,
    negative: all.filter(c => c.polarity === 'N').length,
    categories: getAllCategories().length,
    books: new Set(all.map(c => c.book)).size,
  };
}

// ── Ten Commandments (Exodus 20:2-17) ──

const TEN_COMMANDMENT_NUMBERS = [1, 2, 6, 7, 10, 11, 26, 29, 30, 31, 32, 33, 34, 35, 36, 37];

export function getTenCommandments(): Commandment[] {
  // Traditional Ten Commandments map to Exodus 20:2-17
  return loadAll().filter(c =>
    c.book === 'exodus' && c.chapter === 20
  );
}

// ── Reference formatting ──

export function formatReference(refId: string): string {
  const match = refId.match(/^([A-Z0-9]+)\s+(.+)$/);
  if (!match) return refId;
  const bookName = USX_TO_NAME[match[1]] || match[1];
  return `${bookName} ${match[2]}`;
}

export function referenceToQuizSlug(refId: string): string | null {
  const match = refId.match(/^([A-Z0-9]+)\s+(\d+):/);
  if (!match) return null;
  const bookSlug = USX_TO_SLUG[match[1]];
  if (!bookSlug) return null;
  return `${bookSlug}-${match[2]}-quiz`;
}

export { USX_TO_SLUG, USX_TO_NAME };
