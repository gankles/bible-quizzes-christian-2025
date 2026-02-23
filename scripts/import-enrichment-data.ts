#!/usr/bin/env npx ts-node
/**
 * Import CSV data into indexed JSON files for page enrichment.
 * Produces book-indexed JSON files in data/enrichment/ for efficient lookups.
 *
 * Usage: npx ts-node scripts/import-enrichment-data.ts
 */

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'bible-data');
const OUT_DIR = path.join(process.cwd(), 'data', 'enrichment');

// Simple CSV parser that handles quoted fields with commas and newlines
function parseCSV(content: string): Record<string, string>[] {
  const rows: Record<string, string>[] = [];
  const lines: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    if (ch === '"') {
      if (inQuotes && content[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (current.trim()) lines.push(current);
      current = '';
      if (ch === '\r' && content[i + 1] === '\n') i++;
    } else {
      current += ch;
    }
  }
  if (current.trim()) lines.push(current);

  if (lines.length < 2) return rows;
  const headers = splitCSVLine(lines[0]);

  for (let i = 1; i < lines.length; i++) {
    const values = splitCSVLine(lines[i]);
    const row: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = (values[j] || '').replace(/^"|"$/g, '');
    }
    rows.push(row);
  }
  return rows;
}

function splitCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

// USX book codes to slug mapping
const USX_TO_SLUG: Record<string, string> = {
  GEN: 'genesis', EXO: 'exodus', LEV: 'leviticus', NUM: 'numbers', DEU: 'deuteronomy',
  JOS: 'joshua', JDG: 'judges', RUT: 'ruth', '1SA': '1-samuel', '2SA': '2-samuel',
  '1KI': '1-kings', '2KI': '2-kings', '1CH': '1-chronicles', '2CH': '2-chronicles',
  EZR: 'ezra', NEH: 'nehemiah', EST: 'esther', JOB: 'job', PSA: 'psalms',
  PRO: 'proverbs', ECC: 'ecclesiastes', SNG: 'song-of-solomon', ISA: 'isaiah',
  JER: 'jeremiah', LAM: 'lamentations', EZK: 'ezekiel', DAN: 'daniel',
  HOS: 'hosea', JOL: 'joel', AMO: 'amos', OBA: 'obadiah', JON: 'jonah',
  MIC: 'micah', NAM: 'nahum', HAB: 'habakkuk', ZEP: 'zephaniah', HAG: 'haggai',
  ZEC: 'zechariah', MAL: 'malachi',
  MAT: 'matthew', MRK: 'mark', LUK: 'luke', JHN: 'john', ACT: 'acts',
  ROM: 'romans', '1CO': '1-corinthians', '2CO': '2-corinthians', GAL: 'galatians',
  EPH: 'ephesians', PHP: 'philippians', COL: 'colossians',
  '1TH': '1-thessalonians', '2TH': '2-thessalonians',
  '1TI': '1-timothy', '2TI': '2-timothy', TIT: 'titus', PHM: 'philemon',
  HEB: 'hebrews', JAS: 'james', '1PE': '1-peter', '2PE': '2-peter',
  '1JN': '1-john', '2JN': '2-john', '3JN': '3-john', JUD: 'jude', REV: 'revelation',
};

// Polyglot book names to slug
const BOOK_NAME_TO_SLUG: Record<string, string> = {
  'Genesis': 'genesis', 'Exodus': 'exodus', 'Leviticus': 'leviticus', 'Numbers': 'numbers',
  'Deuteronomy': 'deuteronomy', 'Joshua': 'joshua', 'Judges': 'judges', 'Ruth': 'ruth',
  '1 Samuel': '1-samuel', '2 Samuel': '2-samuel', '1 Kings': '1-kings', '2 Kings': '2-kings',
  '1 Chronicles': '1-chronicles', '2 Chronicles': '2-chronicles', 'Ezra': 'ezra',
  'Nehemiah': 'nehemiah', 'Esther': 'esther', 'Job': 'job', 'Psalms': 'psalms',
  'Proverbs': 'proverbs', 'Ecclesiastes': 'ecclesiastes', 'Song of Solomon': 'song-of-solomon',
  'Isaiah': 'isaiah', 'Jeremiah': 'jeremiah', 'Lamentations': 'lamentations',
  'Ezekiel': 'ezekiel', 'Daniel': 'daniel', 'Hosea': 'hosea', 'Joel': 'joel',
  'Amos': 'amos', 'Obadiah': 'obadiah', 'Jonah': 'jonah', 'Micah': 'micah',
  'Nahum': 'nahum', 'Habakkuk': 'habakkuk', 'Zephaniah': 'zephaniah', 'Haggai': 'haggai',
  'Zechariah': 'zechariah', 'Malachi': 'malachi', 'Matthew': 'matthew', 'Mark': 'mark',
  'Luke': 'luke', 'John': 'john', 'Acts': 'acts', 'Romans': 'romans',
  '1 Corinthians': '1-corinthians', '2 Corinthians': '2-corinthians', 'Galatians': 'galatians',
  'Ephesians': 'ephesians', 'Philippians': 'philippians', 'Colossians': 'colossians',
  '1 Thessalonians': '1-thessalonians', '2 Thessalonians': '2-thessalonians',
  '1 Timothy': '1-timothy', '2 Timothy': '2-timothy', 'Titus': 'titus',
  'Philemon': 'philemon', 'Hebrews': 'hebrews', 'James': 'james',
  '1 Peter': '1-peter', '2 Peter': '2-peter', '1 John': '1-john', '2 John': '2-john',
  '3 John': '3-john', 'Jude': 'jude', 'Revelation': 'revelation',
};

function readCSV(filename: string): Record<string, string>[] {
  const filePath = path.join(DATA_DIR, filename);
  let content = fs.readFileSync(filePath, 'utf-8');
  // Strip BOM
  if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);
  return parseCSV(content);
}

function parseRefId(refId: string): { slug: string; chapter: number; verse: number } | null {
  // Format: "GEN 1:1" or "1SA 2:3"
  const match = refId.match(/^(\w+)\s+(\d+):(\d+)$/);
  if (!match) return null;
  const slug = USX_TO_SLUG[match[1]];
  if (!slug) return null;
  return { slug, chapter: parseInt(match[2]), verse: parseInt(match[3]) };
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeJSON(filename: string, data: any) {
  fs.writeFileSync(path.join(OUT_DIR, filename), JSON.stringify(data));
}

// ==========================================================================
// 1. KJV Verse Text (from AlamoPolyglot - KJV column only)
// ==========================================================================
function importKJVText() {
  console.log('Importing KJV verse text...');
  const rows = readCSV('AlamoPolyglot.csv');
  // Index by book slug → { "chapter:verse": "text" }
  const byBook: Record<string, Record<string, string>> = {};

  for (const row of rows) {
    const slug = BOOK_NAME_TO_SLUG[row.book_name];
    if (!slug) continue;
    const key = `${row.chapter}:${row.verse}`;
    if (!byBook[slug]) byBook[slug] = {};
    byBook[slug][key] = (row.king_james_bible_kjv || '').trim();
  }

  ensureDir(path.join(OUT_DIR, 'kjv'));
  for (const [slug, verses] of Object.entries(byBook)) {
    fs.writeFileSync(path.join(OUT_DIR, 'kjv', `${slug}.json`), JSON.stringify(verses));
  }
  console.log(`  → ${Object.keys(byBook).length} books, ${rows.length} verses`);
}

// ==========================================================================
// 2. Person-Verse mappings (who appears in which verse)
// ==========================================================================
function importPersonVerses() {
  console.log('Importing person-verse mappings...');
  const rows = readCSV('BibleData-PersonVerse.csv');
  // Index by book slug → chapter → verse → [{person_id, label}]
  const byBook: Record<string, Record<string, Array<{ id: string; label: string }>>> = {};

  for (const row of rows) {
    const ref = parseRefId(row.reference_id);
    if (!ref) continue;
    const label = (row.person_label || '').trim();
    if (!label || label === 'NA') continue;

    if (!byBook[ref.slug]) byBook[ref.slug] = {};
    const key = `${ref.chapter}:${ref.verse}`;
    if (!byBook[ref.slug][key]) byBook[ref.slug][key] = [];

    // Avoid duplicate person in same verse
    const pid = row.person_id;
    if (!byBook[ref.slug][key].some(p => p.id === pid)) {
      byBook[ref.slug][key].push({ id: pid, label });
    }
  }

  ensureDir(path.join(OUT_DIR, 'person-verses'));
  for (const [slug, data] of Object.entries(byBook)) {
    fs.writeFileSync(path.join(OUT_DIR, 'person-verses', `${slug}.json`), JSON.stringify(data));
  }
  console.log(`  → ${Object.keys(byBook).length} books, ${rows.length} raw mappings`);
}

// ==========================================================================
// 3. Place-Verse mappings (which places appear in which verse)
// ==========================================================================
function importPlaceVerses() {
  console.log('Importing place-verse mappings...');
  const rows = readCSV('BibleData-PlaceVerse.csv');
  const byBook: Record<string, Record<string, Array<{ id: string; label: string; notes: string }>>> = {};

  for (const row of rows) {
    const ref = parseRefId(row.reference_id);
    if (!ref) continue;
    const label = (row.place_label || '').trim();
    if (!label) continue;

    if (!byBook[ref.slug]) byBook[ref.slug] = {};
    const key = `${ref.chapter}:${ref.verse}`;
    if (!byBook[ref.slug][key]) byBook[ref.slug][key] = [];

    const pid = row.place_id;
    if (!byBook[ref.slug][key].some(p => p.id === pid)) {
      byBook[ref.slug][key].push({
        id: pid,
        label,
        notes: (row.place_verse_notes || '').trim(),
      });
    }
  }

  ensureDir(path.join(OUT_DIR, 'place-verses'));
  for (const [slug, data] of Object.entries(byBook)) {
    fs.writeFileSync(path.join(OUT_DIR, 'place-verses', `${slug}.json`), JSON.stringify(data));
  }
  console.log(`  → ${Object.keys(byBook).length} books, ${rows.length} raw mappings`);
}

// ==========================================================================
// 4. Events (mapped to verses)
// ==========================================================================
function importEvents() {
  console.log('Importing events...');
  const rows = readCSV('BibleData-Event.csv');
  // Index by verse ref → [{name, description, type, year, location, person}]
  const byBook: Record<string, Record<string, Array<{
    name: string; type: string; year: string; bce: string; location: string; person: string;
  }>>> = {};

  for (const row of rows) {
    const refId = (row.event_reference_id || '').trim();
    if (!refId) continue;
    const ref = parseRefId(refId);
    if (!ref) continue;

    if (!byBook[ref.slug]) byBook[ref.slug] = {};
    const key = `${ref.chapter}:${ref.verse}`;
    if (!byBook[ref.slug][key]) byBook[ref.slug][key] = [];

    byBook[ref.slug][key].push({
      name: (row.event_name || '').trim(),
      type: (row.event_type || '').trim(),
      year: (row.event_year_ah || '').trim(),
      bce: (row.bce_year || '').trim(),
      location: (row.event_location || '').trim(),
      person: (row.person_id || '').replace(/_\d+$/, '').replace(/_/g, ' ').trim(),
    });
  }

  ensureDir(path.join(OUT_DIR, 'events'));
  for (const [slug, data] of Object.entries(byBook)) {
    fs.writeFileSync(path.join(OUT_DIR, 'events', `${slug}.json`), JSON.stringify(data));
  }
  console.log(`  → ${Object.keys(byBook).length} books, ${rows.length} events`);
}

// ==========================================================================
// 5. Commandments (mapped to verses)
// ==========================================================================
function importCommandments() {
  console.log('Importing commandments...');
  const rows = readCSV('BibleData-Commandments.csv');
  const byBook: Record<string, Record<string, Array<{
    number: string; concept: string; polarity: string; category: string;
  }>>> = {};

  for (const row of rows) {
    const refId = (row.reference_id || '').trim();
    if (!refId) continue;
    const ref = parseRefId(refId);
    if (!ref) continue;

    if (!byBook[ref.slug]) byBook[ref.slug] = {};
    const key = `${ref.chapter}:${ref.verse}`;
    if (!byBook[ref.slug][key]) byBook[ref.slug][key] = [];

    byBook[ref.slug][key].push({
      number: (row.commandment_number || '').trim(),
      concept: (row.commandment_concept || '').trim(),
      polarity: (row.commandment_polarity || '').trim(),
      category: (row.p119f_category || '').trim(),
    });
  }

  ensureDir(path.join(OUT_DIR, 'commandments'));
  for (const [slug, data] of Object.entries(byBook)) {
    fs.writeFileSync(path.join(OUT_DIR, 'commandments', `${slug}.json`), JSON.stringify(data));
  }
  console.log(`  → ${Object.keys(byBook).length} books, ${rows.length} commandments`);
}

// ==========================================================================
// 6. Person master data (for /bible-names/ enrichment)
// ==========================================================================
function importPersons() {
  console.log('Importing person master data...');
  const persons = readCSV('BibleData-Person.csv');
  const labels = readCSV('BibleData-PersonLabel.csv');
  const relationships = readCSV('BibleData-PersonRelationship.csv');

  // Build person map
  const personMap: Record<string, {
    name: string; sex: string; tribe: string; attribute: string;
    labels: Array<{
      english: string; hebrew: string; hebrewTranslit: string; hebrewMeaning: string;
      hebrewStrongs: string; greek: string; greekTranslit: string; greekMeaning: string;
      greekStrongs: string; firstRef: string; type: string; givenByGod: boolean;
    }>;
    relationships: Array<{
      type: string; relatedTo: string; relatedName: string; category: string; ref: string;
    }>;
  }> = {};

  for (const row of persons) {
    const pid = (row.person_id || '').trim();
    if (!pid) continue;
    personMap[pid] = {
      name: (row.person_name || '').trim(),
      sex: (row.sex || '').trim(),
      tribe: (row.tribe || '').trim(),
      attribute: (row.unique_attribute || '').trim(),
      labels: [],
      relationships: [],
    };
  }

  for (const row of labels) {
    const pid = (row.person_id || '').trim();
    if (!pid || !personMap[pid]) continue;
    personMap[pid].labels.push({
      english: (row.english_label || '').trim(),
      hebrew: (row.hebrew_label || '').trim(),
      hebrewTranslit: (row.hebrew_label_transliterated || '').trim(),
      hebrewMeaning: (row.hebrew_label_meaning || '').trim(),
      hebrewStrongs: (row.hebrew_strongs_number || '').trim(),
      greek: (row.greek_label || '').trim(),
      greekTranslit: (row.greek_label_transliterated || '').trim(),
      greekMeaning: (row.greek_label_meaning || '').trim(),
      greekStrongs: (row.greek_strongs_number || '').trim(),
      firstRef: (row.label_reference_id || '').trim(),
      type: (row.label_type || '').trim(),
      givenByGod: row['label-given_by_god'] === 'Y',
    });
  }

  for (const row of relationships) {
    const pid1 = (row.person_id_1 || '').trim();
    const pid2 = (row.person_id_2 || '').trim();
    if (!pid1 || !pid2) continue;

    const p2Name = personMap[pid2]?.name || pid2.replace(/_\d+$/, '').replace(/_/g, ' ');
    const p1Name = personMap[pid1]?.name || pid1.replace(/_\d+$/, '').replace(/_/g, ' ');

    if (personMap[pid1]) {
      personMap[pid1].relationships.push({
        type: (row.relationship_type || '').trim(),
        relatedTo: pid2,
        relatedName: p2Name,
        category: (row.relationship_category || '').trim(),
        ref: (row.reference_id || '').trim(),
      });
    }
    // Add reverse relationship for pid2
    const reverseType = getReverseRelationType((row.relationship_type || '').trim(), personMap[pid2]?.sex);
    if (personMap[pid2] && reverseType) {
      personMap[pid2].relationships.push({
        type: reverseType,
        relatedTo: pid1,
        relatedName: p1Name,
        category: (row.relationship_category || '').trim(),
        ref: (row.reference_id || '').trim(),
      });
    }
  }

  writeJSON('persons.json', personMap);
  console.log(`  → ${Object.keys(personMap).length} persons, ${labels.length} labels, ${relationships.length} relationships`);
}

function getReverseRelationType(type: string, sex?: string): string | null {
  const map: Record<string, string> = {
    'father': 'child of',
    'mother': 'child of',
    'son': sex === 'F' ? 'mother of' : 'father of',
    'daughter': sex === 'F' ? 'mother of' : 'father of',
    'husband': 'wife of',
    'wife': 'husband of',
    'brother': 'sibling of',
    'sister': 'sibling of',
    'grandfather': 'grandchild of',
    'grandmother': 'grandchild of',
    'grandson': 'grandparent of',
    'Creator': 'creation of',
    'creation': 'Creator of',
    'killer': 'killed by',
    'killed by': 'killer of',
  };
  return map[type] || null;
}

// ==========================================================================
// 7. Place master data (for /bible-places/ enrichment)
// ==========================================================================
function importPlaces() {
  console.log('Importing place master data...');
  const places = readCSV('BibleData-Place.csv');
  const labels = readCSV('BibleData-PlaceLabel.csv');

  const placeMap: Record<string, {
    name: string; type: string; modern: string; notes: string;
    labels: Array<{
      english: string; hebrew: string; hebrewTranslit: string; hebrewMeaning: string;
      hebrewStrongs: string; greek: string; greekTranslit: string; greekMeaning: string;
      greekStrongs: string; firstRef: string; givenByGod: boolean;
    }>;
  }> = {};

  for (const row of places) {
    const pid = (row.place_id || '').trim();
    if (!pid) continue;
    placeMap[pid] = {
      name: (row.place_name || '').trim(),
      type: (row.place_type || '').trim(),
      modern: (row.modern_equivalent || '').trim(),
      notes: (row.place_notes || '').trim(),
      labels: [],
    };
  }

  for (const row of labels) {
    const pid = (row.place_id || '').trim();
    if (!pid || !placeMap[pid]) continue;
    placeMap[pid].labels.push({
      english: (row.english_label || '').trim(),
      hebrew: (row.hebrew_label || '').trim(),
      hebrewTranslit: (row.hebrew_label_transliterated || '').trim(),
      hebrewMeaning: (row.hebrew_label_meaning || '').trim(),
      hebrewStrongs: (row.hebrew_strongs_number || '').trim(),
      greek: (row.greek_label || '').trim(),
      greekTranslit: (row.greek_label_transliterated || '').trim(),
      greekMeaning: (row.greek_label_meaning || '').trim(),
      greekStrongs: (row.greek_strongs_number || '').trim(),
      firstRef: (row.label_reference_id || '').trim(),
      givenByGod: row['label-given_by_god'] === 'Y',
    });
  }

  writeJSON('places.json', placeMap);
  console.log(`  → ${Object.keys(placeMap).length} places, ${labels.length} labels`);
}

// ==========================================================================
// 8. Ussher Annals (for timeline enrichment)
// ==========================================================================
function importUssher() {
  console.log('Importing Ussher Annals...');
  const rows = readCSV('Ussher-AnnalsOfTheWorld.csv');

  // Index by paragraph number for lookup
  const annals: Array<{
    amYear: string; gcYear: string; bcAd: string; paragraph: string; event: string;
  }> = [];

  for (const row of rows) {
    annals.push({
      amYear: (row.am_year_only || '').trim(),
      gcYear: (row.gc_year || '').trim(),
      bcAd: (row.gc_bc_ad || '').trim(),
      paragraph: (row.paragraph_nr || '').trim(),
      event: (row.event || '').trim(),
    });
  }

  writeJSON('ussher.json', annals);
  console.log(`  → ${annals.length} annals entries`);
}

// ==========================================================================
// 9. Book metadata (Hebrew/Greek names, authors, dates)
// ==========================================================================
function importBookMetadata() {
  console.log('Importing book metadata...');
  const rows = readCSV('BibleData-Book.csv');

  const bookMeta: Record<string, {
    hebrewName: string; hebrewTranslit: string; hebrewMeaning: string;
    greekName: string; greekTranslit: string; greekMeaning: string;
    chapterCount: number; verseCount: number;
    writerId: string; writtenStart: string; writtenEnd: string;
  }> = {};

  for (const row of rows) {
    const slug = BOOK_NAME_TO_SLUG[row.book_name] || (row.book_name || '').toLowerCase().replace(/\s+/g, '-');
    if (!slug) continue;
    bookMeta[slug] = {
      hebrewName: (row.hebrew_name || '').trim(),
      hebrewTranslit: (row.hebrew_transliteration || '').trim(),
      hebrewMeaning: (row.hebrew_meaning || '').trim(),
      greekName: (row.greek_name || '').trim(),
      greekTranslit: (row.greek_transliteration || '').trim(),
      greekMeaning: (row.greek_meaning || '').trim(),
      chapterCount: parseInt(row.chapter_count) || 0,
      verseCount: parseInt(row.verse_count) || 0,
      writerId: (row.writer_id || '').trim(),
      writtenStart: (row.written_start_date || '').trim(),
      writtenEnd: (row.written_end_date || '').trim(),
    };
  }

  writeJSON('book-metadata.json', bookMeta);
  console.log(`  → ${Object.keys(bookMeta).length} books`);
}

// ==========================================================================
// 10. Hebrew Strong's (for etymology enrichment)
// ==========================================================================
function importHebrewStrongs() {
  console.log('Importing Hebrew Strong\'s...');
  const rows = readCSV('HebrewStrongs.csv');

  const strongs: Record<string, {
    word: string; gloss: string; language: string; pos: string;
    occurrences: number; firstOccurrence: string;
    rootWord: string; rootNumber: string;
  }> = {};

  for (const row of rows) {
    const num = (row.strongs_number || '').trim();
    if (!num) continue;
    // Only take first occurrence of each Strong's number (some have multiline glosses)
    if (strongs[num]) {
      // Append to gloss
      strongs[num].gloss += ' ' + (row.gloss || '').trim();
      continue;
    }
    strongs[num] = {
      word: (row.word || '').trim(),
      gloss: (row.gloss || '').trim(),
      language: (row.language || '').trim(),
      pos: (row.part_of_speech || '').trim(),
      occurrences: parseInt(row.occurrences) || 0,
      firstOccurrence: (row.first_occurrence || '').trim(),
      rootWord: (row.root_word || '').trim(),
      rootNumber: (row.first_root_number || '').trim(),
    };
  }

  writeJSON('hebrew-strongs.json', strongs);
  console.log(`  → ${Object.keys(strongs).length} entries`);
}

// ==========================================================================
// Main
// ==========================================================================
async function main() {
  console.log('=== Bible Data Enrichment Import ===\n');
  ensureDir(OUT_DIR);

  importKJVText();
  importPersonVerses();
  importPlaceVerses();
  importEvents();
  importCommandments();
  importPersons();
  importPlaces();
  importUssher();
  importBookMetadata();
  importHebrewStrongs();

  console.log('\n=== Import complete! ===');
  console.log(`Output directory: ${OUT_DIR}`);
}

main().catch(console.error);
