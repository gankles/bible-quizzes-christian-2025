#!/usr/bin/env tsx
/**
 * Build verse-context.json from BibleData CSVs.
 * Maps each verse reference to persons, places, and events mentioned in it.
 * Used to enrich cross-reference pages with unique contextual content.
 */

import fs from 'fs';
import path from 'path';

const RAW = path.join(process.cwd(), 'data', 'raw-csv');
const OUT = path.join(process.cwd(), 'data', 'verse-context.json');

// USX book codes → site slugs
const USX_TO_SLUG: Record<string, string> = {
  GEN: 'genesis', EXO: 'exodus', LEV: 'leviticus', NUM: 'numbers',
  DEU: 'deuteronomy', JOS: 'joshua', JDG: 'judges', RUT: 'ruth',
  '1SA': '1-samuel', '2SA': '2-samuel', '1KI': '1-kings', '2KI': '2-kings',
  '1CH': '1-chronicles', '2CH': '2-chronicles', EZR: 'ezra', NEH: 'nehemiah',
  EST: 'esther', JOB: 'job', PSA: 'psalms', PRO: 'proverbs',
  ECC: 'ecclesiastes', SNG: 'song-of-solomon', ISA: 'isaiah', JER: 'jeremiah',
  LAM: 'lamentations', EZK: 'ezekiel', DAN: 'daniel', HOS: 'hosea',
  JOL: 'joel', AMO: 'amos', OBA: 'obadiah', JON: 'jonah',
  MIC: 'micah', NAM: 'nahum', HAB: 'habakkuk', ZEP: 'zephaniah',
  HAG: 'haggai', ZEC: 'zechariah', MAL: 'malachi',
  MAT: 'matthew', MRK: 'mark', LUK: 'luke', JHN: 'john',
  ACT: 'acts', ROM: 'romans', '1CO': '1-corinthians', '2CO': '2-corinthians',
  GAL: 'galatians', EPH: 'ephesians', PHP: 'philippians', COL: 'colossians',
  '1TH': '1-thessalonians', '2TH': '2-thessalonians', '1TI': '1-timothy',
  '2TI': '2-timothy', TIT: 'titus', PHM: 'philemon', HEB: 'hebrews',
  JAS: 'james', '1PE': '1-peter', '2PE': '2-peter', '1JN': '1-john',
  '2JN': '2-john', '3JN': '3-john', JUD: 'jude', REV: 'revelation',
};

function parseCsv(filename: string): Record<string, string>[] {
  const raw = fs.readFileSync(path.join(RAW, filename), 'utf-8')
    .replace(/^\uFEFF/, ''); // Strip BOM
  const lines = raw.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => { row[h] = (values[idx] || '').trim(); });
    rows.push(row);
  }
  return rows;
}

// Simple CSV line parser handling quoted fields
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
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
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

/** Convert "GEN 1:1" → "genesis-1-1" */
function refToKey(refId: string): string | null {
  const match = refId.match(/^(\w+)\s+(\d+):(\d+)$/);
  if (!match) return null;
  const slug = USX_TO_SLUG[match[1]];
  if (!slug) return null;
  return `${slug}-${match[2]}-${match[3]}`;
}

interface PersonInfo {
  id: string;
  name: string;
  label: string;
  sex: string;
  attribute: string;
}

interface PlaceInfo {
  id: string;
  name: string;
  label: string;
  type: string;
  modern: string;
}

interface EventInfo {
  id: string;
  name: string;
  description: string;
  type: string;
  year: string;
}

interface VerseContext {
  persons: PersonInfo[];
  places: PlaceInfo[];
  events: EventInfo[];
}

console.log('Loading CSVs...');

// 1. Build person lookup
const persons = parseCsv('BibleData-Person.csv');
const personMap = new Map<string, { name: string; sex: string; attribute: string }>();
for (const p of persons) {
  personMap.set(p.person_id, {
    name: p.person_name,
    sex: p.sex,
    attribute: p.unique_attribute || '',
  });
}
console.log(`  Persons: ${personMap.size}`);

// 2. Build person label lookup (for display names / Hebrew meanings)
const personLabels = parseCsv('BibleData-PersonLabel.csv');
const personLabelMap = new Map<string, { english: string; hebrewMeaning: string }>();
for (const pl of personLabels) {
  if (!personLabelMap.has(pl.person_id)) {
    personLabelMap.set(pl.person_id, {
      english: pl.english_label,
      hebrewMeaning: pl.hebrew_label_meaning || '',
    });
  }
}

// 3. Build place lookup
const places = parseCsv('BibleData-Place.csv');
const placeMap = new Map<string, { name: string; type: string; modern: string }>();
for (const p of places) {
  placeMap.set(p.place_id, {
    name: p.place_name,
    type: p.place_type || '',
    modern: p.modern_equivalent || '',
  });
}
console.log(`  Places: ${placeMap.size}`);

// 4. Build event lookup (events linked to specific verses)
const events = parseCsv('BibleData-Event.csv');
const eventByRef = new Map<string, EventInfo[]>();
for (const e of events) {
  const refId = e.event_reference_id;
  if (!refId) continue;
  const key = refToKey(refId);
  if (!key) continue;
  const info: EventInfo = {
    id: e.event_id,
    name: e.event_name,
    description: (e.event_description || '').substring(0, 200),
    type: e.event_type || '',
    year: e.bce_year ? `${e.bce_year} BC` : '',
  };
  if (!eventByRef.has(key)) eventByRef.set(key, []);
  eventByRef.get(key)!.push(info);
}
console.log(`  Events: ${events.length} (mapped to ${eventByRef.size} verses)`);

// 5. Map person-verse associations
const personVerses = parseCsv('BibleData-PersonVerse.csv');
const personByVerse = new Map<string, Set<string>>();
for (const pv of personVerses) {
  const key = refToKey(pv.reference_id);
  if (!key) continue;
  if (!personByVerse.has(key)) personByVerse.set(key, new Set());
  personByVerse.get(key)!.add(pv.person_id);
}
console.log(`  PersonVerse mappings: ${personVerses.length} (${personByVerse.size} verses)`);

// 6. Map place-verse associations
const placeVerses = parseCsv('BibleData-PlaceVerse.csv');
const placeByVerse = new Map<string, Set<string>>();
for (const pv of placeVerses) {
  const key = refToKey(pv.reference_id);
  if (!key) continue;
  if (!placeByVerse.has(key)) placeByVerse.set(key, new Set());
  placeByVerse.get(key)!.add(pv.place_id);
}
console.log(`  PlaceVerse mappings: ${placeVerses.length} (${placeByVerse.size} verses)`);

// 7. Build final verse-context map (only for verses that have context)
const verseContext: Record<string, VerseContext> = {};
let count = 0;

// Collect all verse keys
const allVerseKeys = new Set<string>();
for (const k of personByVerse.keys()) allVerseKeys.add(k);
for (const k of placeByVerse.keys()) allVerseKeys.add(k);
for (const k of eventByRef.keys()) allVerseKeys.add(k);

for (const key of allVerseKeys) {
  const ctx: VerseContext = { persons: [], places: [], events: [] };

  // Add persons (deduplicated, max 6)
  const personIds = personByVerse.get(key);
  if (personIds) {
    const seen = new Set<string>();
    for (const pid of personIds) {
      const p = personMap.get(pid);
      if (!p || seen.has(p.name)) continue;
      seen.add(p.name);
      const label = personLabelMap.get(pid);
      ctx.persons.push({
        id: pid,
        name: p.name,
        label: label?.english || p.name,
        sex: p.sex,
        attribute: p.attribute.substring(0, 120),
      });
      if (ctx.persons.length >= 6) break;
    }
  }

  // Add places (deduplicated, max 4)
  const placeIds = placeByVerse.get(key);
  if (placeIds) {
    const seen = new Set<string>();
    for (const plid of placeIds) {
      const pl = placeMap.get(plid);
      if (!pl || seen.has(pl.name)) continue;
      seen.add(pl.name);
      ctx.places.push({
        id: plid,
        name: pl.name,
        label: pl.name,
        type: pl.type,
        modern: pl.modern,
      });
      if (ctx.places.length >= 4) break;
    }
  }

  // Add events (max 3)
  const evts = eventByRef.get(key);
  if (evts) {
    ctx.events = evts.slice(0, 3);
  }

  // Only include if there's meaningful content
  if (ctx.persons.length > 0 || ctx.places.length > 0 || ctx.events.length > 0) {
    verseContext[key] = ctx;
    count++;
  }
}

console.log(`\nBuilt verse context for ${count} verses`);
console.log(`Writing ${OUT}...`);

fs.writeFileSync(OUT, JSON.stringify(verseContext));

const stats = fs.statSync(OUT);
console.log(`Done! File size: ${(stats.size / 1024 / 1024).toFixed(1)} MB`);
