import fs from 'fs';
import path from 'path';

export interface StrongsEntry {
  number: string;
  lemma: string;
  transliteration: string;
  pronunciation: string;
  derivation: string;
  definition: string;
  kjvTranslations: string;
  slug: string;
}

interface StrongsIndex {
  totalEntries: number;
  slugMap: Record<string, string>;
  letterIndex: Record<string, string[]>;
}

// ── Hebrew cache ──

let _hebrewData: StrongsEntry[] | null = null;
let _hebrewSlugMap: Map<string, StrongsEntry> | null = null;
let _hebrewNumberMap: Map<string, StrongsEntry> | null = null;
let _hebrewIndex: StrongsIndex | null = null;

function loadHebrewData(): StrongsEntry[] {
  if (_hebrewData) return _hebrewData;
  const filePath = path.join(process.cwd(), 'data', 'strongs-hebrew.json');
  if (!fs.existsSync(filePath)) return [];
  _hebrewData = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as StrongsEntry[];
  return _hebrewData;
}

function loadHebrewIndex(): StrongsIndex {
  if (_hebrewIndex) return _hebrewIndex;
  const filePath = path.join(process.cwd(), 'data', 'strongs-hebrew-index.json');
  if (!fs.existsSync(filePath)) return { totalEntries: 0, slugMap: {}, letterIndex: {} };
  _hebrewIndex = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as StrongsIndex;
  return _hebrewIndex;
}

function buildHebrewSlugMap(): Map<string, StrongsEntry> {
  if (_hebrewSlugMap) return _hebrewSlugMap;
  _hebrewSlugMap = new Map();
  for (const entry of loadHebrewData()) {
    _hebrewSlugMap.set(entry.slug, entry);
  }
  return _hebrewSlugMap;
}

function buildHebrewNumberMap(): Map<string, StrongsEntry> {
  if (_hebrewNumberMap) return _hebrewNumberMap;
  _hebrewNumberMap = new Map();
  for (const entry of loadHebrewData()) {
    _hebrewNumberMap.set(entry.number, entry);
  }
  return _hebrewNumberMap;
}

// ── Greek cache ──

let _greekData: StrongsEntry[] | null = null;
let _greekSlugMap: Map<string, StrongsEntry> | null = null;
let _greekNumberMap: Map<string, StrongsEntry> | null = null;
let _greekIndex: StrongsIndex | null = null;

function loadGreekData(): StrongsEntry[] {
  if (_greekData) return _greekData;
  const filePath = path.join(process.cwd(), 'data', 'strongs-greek.json');
  if (!fs.existsSync(filePath)) return [];
  _greekData = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as StrongsEntry[];
  return _greekData;
}

function loadGreekIndex(): StrongsIndex {
  if (_greekIndex) return _greekIndex;
  const filePath = path.join(process.cwd(), 'data', 'strongs-greek-index.json');
  if (!fs.existsSync(filePath)) return { totalEntries: 0, slugMap: {}, letterIndex: {} };
  _greekIndex = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as StrongsIndex;
  return _greekIndex;
}

function buildGreekSlugMap(): Map<string, StrongsEntry> {
  if (_greekSlugMap) return _greekSlugMap;
  _greekSlugMap = new Map();
  for (const entry of loadGreekData()) {
    _greekSlugMap.set(entry.slug, entry);
  }
  return _greekSlugMap;
}

function buildGreekNumberMap(): Map<string, StrongsEntry> {
  if (_greekNumberMap) return _greekNumberMap;
  _greekNumberMap = new Map();
  for (const entry of loadGreekData()) {
    _greekNumberMap.set(entry.number, entry);
  }
  return _greekNumberMap;
}

// ── Public API ──

export function getStrongsHebrew(slug: string): StrongsEntry | undefined {
  return buildHebrewSlugMap().get(slug);
}

export function getStrongsGreek(slug: string): StrongsEntry | undefined {
  return buildGreekSlugMap().get(slug);
}

export function getAllHebrewSlugs(): string[] {
  const index = loadHebrewIndex();
  return Object.keys(index.slugMap);
}

export function getAllGreekSlugs(): string[] {
  const index = loadGreekIndex();
  return Object.keys(index.slugMap);
}

export function getHebrewByNumber(number: string): StrongsEntry | undefined {
  // Normalize: accept "H1", "h1", "1"
  const normalized = number.toUpperCase().startsWith('H') ? number.toUpperCase() : `H${number}`;
  return buildHebrewNumberMap().get(normalized);
}

export function getGreekByNumber(number: string): StrongsEntry | undefined {
  const normalized = number.toUpperCase().startsWith('G') ? number.toUpperCase() : `G${number}`;
  return buildGreekNumberMap().get(normalized);
}

/**
 * Find related entries that share the same root by parsing derivation cross-references.
 * Derivation fields often contain patterns like "from H24", "corresponding to H1", etc.
 */
export function getRelatedEntries(entry: StrongsEntry): StrongsEntry[] {
  const related: StrongsEntry[] = [];
  const seenNumbers = new Set<string>([entry.number]);

  const isHebrew = entry.number.startsWith('H');
  const numberMap = isHebrew ? buildHebrewNumberMap() : buildGreekNumberMap();
  const prefix = isHebrew ? 'H' : 'G';

  // 1. Find entries referenced in this entry's derivation (e.g., "from H24")
  const refPattern = new RegExp(`${prefix}(\\d+)`, 'g');
  let match;
  while ((match = refPattern.exec(entry.derivation)) !== null) {
    const refNumber = `${prefix}${match[1]}`;
    if (!seenNumbers.has(refNumber)) {
      const refEntry = numberMap.get(refNumber);
      if (refEntry) {
        related.push(refEntry);
        seenNumbers.add(refNumber);
      }
    }
  }

  // Also check kjvTranslations for "Compare" cross-refs
  while ((match = refPattern.exec(entry.kjvTranslations)) !== null) {
    const refNumber = `${prefix}${match[1]}`;
    if (!seenNumbers.has(refNumber)) {
      const refEntry = numberMap.get(refNumber);
      if (refEntry) {
        related.push(refEntry);
        seenNumbers.add(refNumber);
      }
    }
  }

  // 2. Find entries that reference this entry in their derivation
  const data = isHebrew ? loadHebrewData() : loadGreekData();
  const myNumber = entry.number;
  for (const e of data) {
    if (seenNumbers.has(e.number)) continue;
    if (e.derivation.includes(myNumber) || e.derivation.includes(`(${entry.lemma})`)) {
      related.push(e);
      seenNumbers.add(e.number);
      if (related.length >= 12) break;
    }
  }

  return related;
}

export function getHebrewLetterIndex(): Record<string, string[]> {
  return loadHebrewIndex().letterIndex;
}

export function getGreekLetterIndex(): Record<string, string[]> {
  return loadGreekIndex().letterIndex;
}

/** Get total entry count */
export function getHebrewEntryCount(): number {
  return loadHebrewIndex().totalEntries;
}

export function getGreekEntryCount(): number {
  return loadGreekIndex().totalEntries;
}

/** Get all Hebrew entries (for iteration in index page) */
export function getAllHebrewEntries(): StrongsEntry[] {
  return loadHebrewData();
}

/** Get all Greek entries */
export function getAllGreekEntries(): StrongsEntry[] {
  return loadGreekData();
}

/**
 * Get the previous and next entries by Strong's number for navigation.
 */
export function getHebrewNeighbors(entry: StrongsEntry): { prev: StrongsEntry | undefined; next: StrongsEntry | undefined } {
  const num = parseInt(entry.number.replace('H', ''), 10);
  return {
    prev: num > 1 ? buildHebrewNumberMap().get(`H${num - 1}`) : undefined,
    next: buildHebrewNumberMap().get(`H${num + 1}`),
  };
}

export function getGreekNeighbors(entry: StrongsEntry): { prev: StrongsEntry | undefined; next: StrongsEntry | undefined } {
  const num = parseInt(entry.number.replace('G', ''), 10);
  return {
    prev: num > 1 ? buildGreekNumberMap().get(`G${num - 1}`) : undefined,
    next: buildGreekNumberMap().get(`G${num + 1}`),
  };
}

/**
 * Parse KJV translations string into an array of individual translations.
 * Input example: "chief, (fore-) father(-less), [idiom] patrimony, principal."
 * Returns cleaned translation strings.
 */
export function parseKjvTranslations(kjvTranslations: string): string[] {
  if (!kjvTranslations) return [];
  return kjvTranslations
    .replace(/\.$/, '')                // remove trailing period
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0)
    .map(t => t
      .replace(/\[idiom\]\s*/g, '')    // remove [idiom] markers
      .replace(/\[?Compare.*$/i, '')   // remove Compare notes
      .replace(/\(?\+\)?/g, '')        // remove + markers
      .replace(/--/g, '')              // remove leading dashes
      .replace(/\.\s*$/, '')           // remove trailing periods from individual tokens
      .trim()
    )
    .filter(t => t.length > 0 && !t.startsWith('Compare'));
}
