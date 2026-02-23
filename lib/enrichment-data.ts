/**
 * Loaders for enrichment data (imported from CSV and kjvstudy.org).
 * All data is loaded lazily and cached per-book for efficiency.
 */

import fs from 'fs';
import path from 'path';

const ENRICHMENT_DIR = path.join(process.cwd(), 'data', 'enrichment');
const KJVSTUDY_DIR = path.join(process.cwd(), 'data', 'kjvstudy');

// ============================================================================
// KJV Verse Text
// ============================================================================

const kjvCache: Record<string, Record<string, string> | null> = {};

export function getKJVText(bookSlug: string, chapter: number, verse: number): string | null {
  if (!(bookSlug in kjvCache)) {
    const filePath = path.join(ENRICHMENT_DIR, 'kjv', `${bookSlug}.json`);
    try {
      kjvCache[bookSlug] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
      kjvCache[bookSlug] = null;
    }
  }
  return kjvCache[bookSlug]?.[`${chapter}:${verse}`] || null;
}

// ============================================================================
// Commandments by verse
// ============================================================================

const cmdCache: Record<string, Record<string, Array<{
  number: string; concept: string; polarity: string; category: string;
}>> | null> = {};

export function getVerseCommandments(bookSlug: string, chapter: number, verse: number) {
  if (!(bookSlug in cmdCache)) {
    const filePath = path.join(ENRICHMENT_DIR, 'commandments', `${bookSlug}.json`);
    try {
      cmdCache[bookSlug] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
      cmdCache[bookSlug] = null;
    }
  }
  return cmdCache[bookSlug]?.[`${chapter}:${verse}`] || [];
}

// ============================================================================
// KJVStudy.org Verse Commentary
// ============================================================================

const commentaryCache: Record<string, any> = {};

export function getVerseCommentary(bookSlug: string, chapter: number, verse: number): string | null {
  if (!(bookSlug in commentaryCache)) {
    // kjvstudy uses lowercase book names
    const filePath = path.join(KJVSTUDY_DIR, 'verse_commentary', `${bookSlug}.json`);
    try {
      commentaryCache[bookSlug] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
      commentaryCache[bookSlug] = null;
    }
  }
  const data = commentaryCache[bookSlug];
  if (!data?.commentary) return null;
  const analysis = data.commentary?.[String(chapter)]?.[String(verse)]?.analysis;
  if (!analysis) return null;
  // Strip HTML tags for plain text
  return analysis.replace(/<[^>]+>/g, '').trim();
}

// ============================================================================
// Person master data
// ============================================================================

let personsCache: Record<string, {
  name: string; sex: string; tribe: string; attribute: string;
  labels: Array<{
    english: string; hebrew: string; hebrewTranslit: string; hebrewMeaning: string;
    hebrewStrongs: string; greek: string; greekTranslit: string; greekMeaning: string;
    greekStrongs: string; firstRef: string; type: string; givenByGod: boolean;
  }>;
  relationships: Array<{
    type: string; relatedTo: string; relatedName: string; category: string; ref: string;
  }>;
}> | null = null;

function loadPersons() {
  if (personsCache !== null) return personsCache;
  const filePath = path.join(ENRICHMENT_DIR, 'persons.json');
  try {
    personsCache = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    personsCache = {};
  }
  return personsCache!;
}

export function getPersonById(personId: string) {
  const persons = loadPersons();
  return persons[personId] || null;
}

export function getPersonByName(name: string) {
  const persons = loadPersons();
  // Try exact match on person_id patterns: "Name_1", "Name_2", etc.
  const normalized = name.replace(/\s+/g, '_');
  const keys = [`${normalized}_1`, `${normalized}_2`, normalized];
  for (const key of keys) {
    if (persons[key]) return { id: key, ...persons[key] };
  }
  // Fallback: search by name field
  for (const [id, person] of Object.entries(persons)) {
    if (person.name.toLowerCase() === name.toLowerCase()) {
      return { id, ...person };
    }
  }
  return null;
}

/** Find ALL persons matching a name (e.g., David_1, David_2, etc.) */
export function getAllPersonsByName(name: string) {
  const persons = loadPersons();
  const results: Array<{ id: string; name: string; sex: string; tribe: string; attribute: string; labels: any[]; relationships: any[] }> = [];
  const normalized = name.replace(/\s+/g, '_');
  // Check _1 through _10 (covers nearly all cases)
  for (let i = 1; i <= 10; i++) {
    const key = `${normalized}_${i}`;
    if (persons[key]) results.push({ id: key, ...persons[key] });
  }
  // Also check bare key
  if (persons[normalized] && !results.find(r => r.id === normalized)) {
    results.push({ id: normalized, ...persons[normalized] });
  }
  // Fallback: search by name field if nothing found
  if (results.length === 0) {
    for (const [id, person] of Object.entries(persons)) {
      if (person.name.toLowerCase() === name.toLowerCase()) {
        results.push({ id, ...person });
      }
    }
  }
  return results;
}

export function getAllPersons() {
  return loadPersons();
}

// ============================================================================
// Place master data
// ============================================================================

let placesCache: Record<string, {
  name: string; type: string; modern: string; notes: string;
  labels: Array<{
    english: string; hebrew: string; hebrewTranslit: string; hebrewMeaning: string;
    hebrewStrongs: string; greek: string; greekTranslit: string; greekMeaning: string;
    greekStrongs: string; firstRef: string; givenByGod: boolean;
  }>;
}> | null = null;

function loadPlaces() {
  if (placesCache !== null) return placesCache;
  const filePath = path.join(ENRICHMENT_DIR, 'places.json');
  try {
    placesCache = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    placesCache = {};
  }
  return placesCache!;
}

export function getEnrichmentPlace(placeId: string) {
  const places = loadPlaces();
  return places[placeId] || null;
}

export function getAllEnrichmentPlaces() {
  return loadPlaces();
}

// ============================================================================
// Book metadata (Hebrew/Greek names)
// ============================================================================

let bookMetaCache: Record<string, {
  hebrewName: string; hebrewTranslit: string; hebrewMeaning: string;
  greekName: string; greekTranslit: string; greekMeaning: string;
  chapterCount: number; verseCount: number;
  writerId: string; writtenStart: string; writtenEnd: string;
}> | null = null;

export function getEnrichmentBookMeta(bookSlug: string) {
  if (bookMetaCache === null) {
    const filePath = path.join(ENRICHMENT_DIR, 'book-metadata.json');
    try {
      bookMetaCache = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
      bookMetaCache = {};
    }
  }
  return bookMetaCache![bookSlug] || null;
}

// ============================================================================
// Hebrew Strong's
// ============================================================================

let strongsCache: Record<string, {
  word: string; gloss: string; language: string; pos: string;
  occurrences: number; firstOccurrence: string;
  rootWord: string; rootNumber: string;
}> | null = null;

export function getHebrewStrongs(strongsNumber: string) {
  if (strongsCache === null) {
    const filePath = path.join(ENRICHMENT_DIR, 'hebrew-strongs.json');
    try {
      strongsCache = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
      strongsCache = {};
    }
  }
  // Handle both "H1" prefix and plain "1" format
  const num = strongsNumber.replace(/^[Hh]/, '');
  return strongsCache![num] || strongsCache![strongsNumber] || null;
}

// ============================================================================
// KJVStudy.org Biographies
// ============================================================================

let biographiesCache: { biographies: any[]; aliases: Record<string, string> } | null = null;

function loadBiographies() {
  if (biographiesCache !== null) return biographiesCache;
  const filePath = path.join(KJVSTUDY_DIR, 'biographies.json');
  try {
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    // Handle both {biographies: [...], aliases: {...}} and plain array format
    if (Array.isArray(raw)) {
      biographiesCache = { biographies: raw, aliases: {} };
    } else {
      biographiesCache = { biographies: raw.biographies || [], aliases: raw.aliases || {} };
    }
  } catch {
    biographiesCache = { biographies: [], aliases: {} };
  }
  return biographiesCache;
}

export function getBiography(name: string) {
  const { biographies, aliases } = loadBiographies();
  const lowerName = name.toLowerCase();
  // Check aliases first (e.g., "Abram" -> "Abraham")
  const canonicalName = aliases[name] || aliases[lowerName] || name;
  const lowerCanonical = canonicalName.toLowerCase();
  return biographies.find((b: any) => {
    if (b.name?.toLowerCase() === lowerCanonical) return true;
    if (b.name?.toLowerCase() === lowerName) return true;
    return false;
  }) || null;
}

// ============================================================================
// KJVStudy.org Section Headings
// ============================================================================

let sectionHeadingsCache: any = null;

export function getSectionHeading(bookSlug: string, chapter: number, verse: number): string | null {
  if (sectionHeadingsCache === null) {
    const filePath = path.join(KJVSTUDY_DIR, 'section_headings.json');
    try {
      sectionHeadingsCache = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
      sectionHeadingsCache = {};
    }
  }
  // kjvstudy uses capitalized book names like "Genesis"
  const SLUG_TO_NAME: Record<string, string> = {};
  // Build reverse mapping dynamically
  const entries = Object.keys(sectionHeadingsCache);
  for (const bookName of entries) {
    const slug = bookName.toLowerCase().replace(/\s+/g, '-').replace(/(\d)\s*/g, '$1-');
    SLUG_TO_NAME[slug] = bookName;
  }
  const bookName = SLUG_TO_NAME[bookSlug];
  if (!bookName) return null;
  return sectionHeadingsCache[bookName]?.[String(chapter)]?.[String(verse)] || null;
}

// ============================================================================
// KJVStudy.org Featured Verses
// ============================================================================

let featuredVersesCache: any = null;

export function getFeaturedVerse(bookSlug: string, chapter: number, verse: number) {
  if (featuredVersesCache === null) {
    const filePath = path.join(KJVSTUDY_DIR, 'featured_verses.json');
    try {
      featuredVersesCache = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
      featuredVersesCache = {};
    }
  }
  // Featured verses are keyed by "Book Chapter:Verse" e.g. "Genesis 1:1"
  const SLUG_TO_NAME: Record<string, string> = {
    'genesis': 'Genesis', 'exodus': 'Exodus', 'leviticus': 'Leviticus', 'numbers': 'Numbers',
    'deuteronomy': 'Deuteronomy', 'joshua': 'Joshua', 'judges': 'Judges', 'ruth': 'Ruth',
    '1-samuel': '1 Samuel', '2-samuel': '2 Samuel', '1-kings': '1 Kings', '2-kings': '2 Kings',
    '1-chronicles': '1 Chronicles', '2-chronicles': '2 Chronicles', 'ezra': 'Ezra',
    'nehemiah': 'Nehemiah', 'esther': 'Esther', 'job': 'Job', 'psalms': 'Psalms',
    'proverbs': 'Proverbs', 'ecclesiastes': 'Ecclesiastes', 'song-of-solomon': 'Song of Solomon',
    'isaiah': 'Isaiah', 'jeremiah': 'Jeremiah', 'lamentations': 'Lamentations',
    'ezekiel': 'Ezekiel', 'daniel': 'Daniel', 'hosea': 'Hosea', 'joel': 'Joel',
    'amos': 'Amos', 'obadiah': 'Obadiah', 'jonah': 'Jonah', 'micah': 'Micah',
    'nahum': 'Nahum', 'habakkuk': 'Habakkuk', 'zephaniah': 'Zephaniah', 'haggai': 'Haggai',
    'zechariah': 'Zechariah', 'malachi': 'Malachi', 'matthew': 'Matthew', 'mark': 'Mark',
    'luke': 'Luke', 'john': 'John', 'acts': 'Acts', 'romans': 'Romans',
    '1-corinthians': '1 Corinthians', '2-corinthians': '2 Corinthians', 'galatians': 'Galatians',
    'ephesians': 'Ephesians', 'philippians': 'Philippians', 'colossians': 'Colossians',
    '1-thessalonians': '1 Thessalonians', '2-thessalonians': '2 Thessalonians',
    '1-timothy': '1 Timothy', '2-timothy': '2 Timothy', 'titus': 'Titus',
    'philemon': 'Philemon', 'hebrews': 'Hebrews', 'james': 'James',
    '1-peter': '1 Peter', '2-peter': '2 Peter', '1-john': '1 John', '2-john': '2 John',
    '3-john': '3 John', 'jude': 'Jude', 'revelation': 'Revelation',
  };
  const bookName = SLUG_TO_NAME[bookSlug];
  if (!bookName) return null;
  const key = `${bookName} ${chapter}:${verse}`;
  return featuredVersesCache[key] || null;
}

// ============================================================================
// KJVStudy.org Red Letter Verses
// ============================================================================

let redLetterCache: Record<string, string> | null = null;

export function isRedLetterVerse(bookSlug: string, chapter: number, verse: number): boolean {
  if (redLetterCache === null) {
    const filePath = path.join(KJVSTUDY_DIR, 'red_letter_verses.json');
    try {
      redLetterCache = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
      redLetterCache = {};
    }
  }
  const key = `${bookSlug}-${chapter}-${verse}`;
  return key in redLetterCache!;
}
