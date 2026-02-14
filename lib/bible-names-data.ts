import fs from 'fs';
import path from 'path';

export interface BibleName {
  name: string;
  meaning: string;
  slug: string;
  firstLetter: string;
}

let _cache: BibleName[] | null = null;

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function parseCSVLine(line: string): [string, string] {
  // Name field never contains commas, so split on first comma
  const idx = line.indexOf(',');
  if (idx === -1) return [line.trim(), ''];
  const name = line.slice(0, idx).trim();
  let meaning = line.slice(idx + 1).trim();
  // Strip surrounding quotes if present
  if (meaning.startsWith('"') && meaning.endsWith('"')) {
    meaning = meaning.slice(1, -1).replace(/""/g, '"');
  }
  return [name, meaning];
}

function loadAll(): BibleName[] {
  if (_cache) return _cache;

  const csvPath = path.join(process.cwd(), 'data', 'bible-data', 'HitchcocksBibleNamesDictionary.csv');
  if (!fs.existsSync(csvPath)) return [];

  const csv = fs.readFileSync(csvPath, 'utf-8');
  // Strip BOM
  const clean = csv.charCodeAt(0) === 0xFEFF ? csv.slice(1) : csv;
  const lines = clean.trim().split('\n');

  // Track slug counts for deduplication
  const slugCounts = new Map<string, number>();

  _cache = lines.slice(1).map(line => {
    const [name, meaning] = parseCSVLine(line);
    let slug = toSlug(name);

    // Handle duplicate names by appending a number
    const count = slugCounts.get(slug) || 0;
    slugCounts.set(slug, count + 1);
    if (count > 0) {
      slug = `${slug}-${count + 1}`;
    }

    return {
      name,
      meaning,
      slug,
      firstLetter: name.charAt(0).toUpperCase(),
    };
  }).filter(entry => entry.name.length > 0);

  return _cache;
}

// ── Core lookups ──

export function getAllBibleNames(): BibleName[] {
  return loadAll();
}

export function getBibleNameBySlug(slug: string): BibleName | undefined {
  return loadAll().find(n => n.slug === slug);
}

export function getBibleNamesByLetter(): Record<string, BibleName[]> {
  const all = loadAll();
  const grouped: Record<string, BibleName[]> = {};

  for (const entry of all) {
    const letter = entry.firstLetter;
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(entry);
  }

  return grouped;
}

export function getLetters(): string[] {
  const all = loadAll();
  const letters = new Set<string>();
  for (const entry of all) {
    letters.add(entry.firstLetter);
  }
  return Array.from(letters).sort();
}

export function getBibleNamesForLetter(letter: string): BibleName[] {
  return loadAll().filter(n => n.firstLetter === letter.toUpperCase());
}
