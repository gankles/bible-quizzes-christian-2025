#!/usr/bin/env npx tsx
/**
 * Cross-Reference Generator
 *
 * Downloads 340,000+ Bible cross-references from openbible.info (CC-BY)
 * via scrollmapper/bible_databases and builds a compact JSON lookup file.
 *
 * Source: https://github.com/scrollmapper/bible_databases
 * Data: Treasury of Scripture Knowledge (public domain) + crowd-sourced votes
 *
 * Output: data/cross-references.json
 *   Key: "book-chapter-verse" (e.g. "genesis-1-1")
 *   Value: Array of [reference, votes] pairs sorted by votes desc, max 10 per verse
 *
 * Usage:
 *   npx tsx scripts/generate-cross-references.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

// =============================================================================
// CONFIGURATION
// =============================================================================

const TSV_URL = 'https://raw.githubusercontent.com/scrollmapper/bible_databases/master/sources/extras/cross_references.txt';
const OUTPUT_PATH = path.resolve(__dirname, '..', 'data', 'cross-references.json');
const CACHE_PATH = '/tmp/cross_references.txt';
const MAX_REFS_PER_VERSE = 10;

// =============================================================================
// OSIS ABBREVIATION → BOOK SLUG + DISPLAY NAME
// =============================================================================

const OSIS_MAP: Record<string, { slug: string; name: string }> = {
  'Gen': { slug: 'genesis', name: 'Genesis' },
  'Exod': { slug: 'exodus', name: 'Exodus' },
  'Lev': { slug: 'leviticus', name: 'Leviticus' },
  'Num': { slug: 'numbers', name: 'Numbers' },
  'Deut': { slug: 'deuteronomy', name: 'Deuteronomy' },
  'Josh': { slug: 'joshua', name: 'Joshua' },
  'Judg': { slug: 'judges', name: 'Judges' },
  'Ruth': { slug: 'ruth', name: 'Ruth' },
  '1Sam': { slug: '1-samuel', name: '1 Samuel' },
  '2Sam': { slug: '2-samuel', name: '2 Samuel' },
  '1Kgs': { slug: '1-kings', name: '1 Kings' },
  '2Kgs': { slug: '2-kings', name: '2 Kings' },
  '1Chr': { slug: '1-chronicles', name: '1 Chronicles' },
  '2Chr': { slug: '2-chronicles', name: '2 Chronicles' },
  'Ezra': { slug: 'ezra', name: 'Ezra' },
  'Neh': { slug: 'nehemiah', name: 'Nehemiah' },
  'Esth': { slug: 'esther', name: 'Esther' },
  'Job': { slug: 'job', name: 'Job' },
  'Ps': { slug: 'psalms', name: 'Psalms' },
  'Prov': { slug: 'proverbs', name: 'Proverbs' },
  'Eccl': { slug: 'ecclesiastes', name: 'Ecclesiastes' },
  'Song': { slug: 'song-of-solomon', name: 'Song of Solomon' },
  'Isa': { slug: 'isaiah', name: 'Isaiah' },
  'Jer': { slug: 'jeremiah', name: 'Jeremiah' },
  'Lam': { slug: 'lamentations', name: 'Lamentations' },
  'Ezek': { slug: 'ezekiel', name: 'Ezekiel' },
  'Dan': { slug: 'daniel', name: 'Daniel' },
  'Hos': { slug: 'hosea', name: 'Hosea' },
  'Joel': { slug: 'joel', name: 'Joel' },
  'Amos': { slug: 'amos', name: 'Amos' },
  'Obad': { slug: 'obadiah', name: 'Obadiah' },
  'Jonah': { slug: 'jonah', name: 'Jonah' },
  'Mic': { slug: 'micah', name: 'Micah' },
  'Nah': { slug: 'nahum', name: 'Nahum' },
  'Hab': { slug: 'habakkuk', name: 'Habakkuk' },
  'Zeph': { slug: 'zephaniah', name: 'Zephaniah' },
  'Hag': { slug: 'haggai', name: 'Haggai' },
  'Zech': { slug: 'zechariah', name: 'Zechariah' },
  'Mal': { slug: 'malachi', name: 'Malachi' },
  'Matt': { slug: 'matthew', name: 'Matthew' },
  'Mark': { slug: 'mark', name: 'Mark' },
  'Luke': { slug: 'luke', name: 'Luke' },
  'John': { slug: 'john', name: 'John' },
  'Acts': { slug: 'acts', name: 'Acts' },
  'Rom': { slug: 'romans', name: 'Romans' },
  '1Cor': { slug: '1-corinthians', name: '1 Corinthians' },
  '2Cor': { slug: '2-corinthians', name: '2 Corinthians' },
  'Gal': { slug: 'galatians', name: 'Galatians' },
  'Eph': { slug: 'ephesians', name: 'Ephesians' },
  'Phil': { slug: 'philippians', name: 'Philippians' },
  'Col': { slug: 'colossians', name: 'Colossians' },
  '1Thess': { slug: '1-thessalonians', name: '1 Thessalonians' },
  '2Thess': { slug: '2-thessalonians', name: '2 Thessalonians' },
  '1Tim': { slug: '1-timothy', name: '1 Timothy' },
  '2Tim': { slug: '2-timothy', name: '2 Timothy' },
  'Titus': { slug: 'titus', name: 'Titus' },
  'Phlm': { slug: 'philemon', name: 'Philemon' },
  'Heb': { slug: 'hebrews', name: 'Hebrews' },
  'Jas': { slug: 'james', name: 'James' },
  '1Pet': { slug: '1-peter', name: '1 Peter' },
  '2Pet': { slug: '2-peter', name: '2 Peter' },
  '1John': { slug: '1-john', name: '1 John' },
  '2John': { slug: '2-john', name: '2 John' },
  '3John': { slug: '3-john', name: '3 John' },
  'Jude': { slug: 'jude', name: 'Jude' },
  'Rev': { slug: 'revelation', name: 'Revelation' },
};

// =============================================================================
// DOWNLOAD HELPER
// =============================================================================

function download(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const get = (u: string, redirects = 0) => {
      if (redirects > 5) return reject(new Error('Too many redirects'));
      https.get(u, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location, redirects + 1);
        }
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
        const chunks: Buffer[] = [];
        res.on('data', (c: Buffer) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
        res.on('error', reject);
      }).on('error', reject);
    };
    get(url);
  });
}

// =============================================================================
// OSIS REFERENCE PARSER
// =============================================================================

interface ParsedRef {
  slug: string;
  name: string;
  chapter: number;
  verse: number;
}

function parseOsis(ref: string): ParsedRef | null {
  // Format: Book.Chapter.Verse (e.g. Gen.1.1, 1Sam.3.4, Ps.119.105)
  const match = ref.match(/^(\d?[A-Za-z]+)\.(\d+)\.(\d+)$/);
  if (!match) return null;
  const info = OSIS_MAP[match[1]];
  if (!info) return null;
  return {
    slug: info.slug,
    name: info.name,
    chapter: parseInt(match[2], 10),
    verse: parseInt(match[3], 10),
  };
}

/**
 * Parse a "To Verse" field which may be a single ref or a range.
 * Examples:
 *   "Prov.8.22" → "Proverbs 8:22"
 *   "Prov.8.22-Prov.8.30" → "Proverbs 8:22-30"
 *   "Isa.51.13" → "Isaiah 51:13"
 */
function parseToRef(toField: string): { display: string; slug: string; chapter: number; verse: number; verseEnd?: number } | null {
  // Check for range: Book.Ch.V-Book.Ch.V
  const rangeParts = toField.split('-');
  if (rangeParts.length === 2) {
    const start = parseOsis(rangeParts[0]);
    const end = parseOsis(rangeParts[1]);
    if (start && end && start.slug === end.slug && start.chapter === end.chapter) {
      // Same book+chapter range
      return {
        display: `${start.name} ${start.chapter}:${start.verse}-${end.verse}`,
        slug: start.slug,
        chapter: start.chapter,
        verse: start.verse,
        verseEnd: end.verse,
      };
    }
    // Different chapters or books — just use the start
    if (start) {
      return {
        display: `${start.name} ${start.chapter}:${start.verse}`,
        slug: start.slug,
        chapter: start.chapter,
        verse: start.verse,
      };
    }
    return null;
  }

  // Single reference
  const parsed = parseOsis(toField);
  if (!parsed) return null;
  return {
    display: `${parsed.name} ${parsed.chapter}:${parsed.verse}`,
    slug: parsed.slug,
    chapter: parsed.chapter,
    verse: parsed.verse,
  };
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  console.log('Cross-Reference Generator');
  console.log('========================\n');

  // ── Step 1: Download TSV ──────────────────────────────────────────────
  let tsvData: string;
  if (fs.existsSync(CACHE_PATH)) {
    console.log('Loading cached cross_references.txt...');
    tsvData = fs.readFileSync(CACHE_PATH, 'utf-8');
  } else {
    console.log('Downloading cross_references.txt (~8MB)...');
    tsvData = await download(TSV_URL);
    fs.writeFileSync(CACHE_PATH, tsvData, 'utf-8');
  }

  const lines = tsvData.split('\n').filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('From'));
  console.log(`  ${lines.length} cross-reference lines to parse`);

  // ── Step 2: Parse and index ───────────────────────────────────────────
  console.log('\nParsing cross-references...');

  // Key: "genesis-1-1", Value: array of { display, slug, chapter, verse, verseEnd?, votes }
  const index = new Map<string, { display: string; slug: string; chapter: number; verse: number; verseEnd?: number; votes: number }[]>();

  let parsed = 0;
  let skipped = 0;

  for (const line of lines) {
    const parts = line.split('\t');
    if (parts.length < 3) { skipped++; continue; }

    const [fromField, toField, votesStr] = parts;
    const votes = parseInt(votesStr, 10);

    // Skip negative or zero votes (low quality)
    if (isNaN(votes) || votes <= 0) { skipped++; continue; }

    const from = parseOsis(fromField);
    if (!from) { skipped++; continue; }

    const to = parseToRef(toField);
    if (!to) { skipped++; continue; }

    const key = `${from.slug}-${from.chapter}-${from.verse}`;

    if (!index.has(key)) {
      index.set(key, []);
    }
    index.get(key)!.push({
      display: to.display,
      slug: to.slug,
      chapter: to.chapter,
      verse: to.verse,
      verseEnd: to.verseEnd,
      votes,
    });

    parsed++;
  }

  console.log(`  Parsed: ${parsed} cross-references`);
  console.log(`  Skipped: ${skipped} (negative votes, parse errors)`);
  console.log(`  Unique source verses: ${index.size}`);

  // ── Step 3: Sort and trim ─────────────────────────────────────────────
  console.log('\nSorting by votes and trimming to top 10 per verse...');

  // Build compact output: key → [[display, votes, slug, chapter, verse, verseEnd?], ...]
  const output: Record<string, [string, number, string, number, number, number?][]> = {};

  for (const [key, refs] of index.entries()) {
    // Sort by votes descending, take top N
    refs.sort((a, b) => b.votes - a.votes);
    const top = refs.slice(0, MAX_REFS_PER_VERSE);
    output[key] = top.map(r =>
      r.verseEnd
        ? [r.display, r.votes, r.slug, r.chapter, r.verse, r.verseEnd]
        : [r.display, r.votes, r.slug, r.chapter, r.verse]
    );
  }

  // ── Step 4: Write JSON ────────────────────────────────────────────────
  console.log('\nWriting cross-references.json...');
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output), 'utf-8');

  const fileSizeMB = (fs.statSync(OUTPUT_PATH).size / (1024 * 1024)).toFixed(1);
  console.log(`  Written to ${OUTPUT_PATH} (${fileSizeMB} MB)`);

  // ── Step 5: Stats ─────────────────────────────────────────────────────
  const totalRefs = Object.values(output).reduce((sum, refs) => sum + refs.length, 0);
  const avgRefs = (totalRefs / Object.keys(output).length).toFixed(1);

  console.log(`\n--- Stats ---`);
  console.log(`  Total cross-references stored: ${totalRefs}`);
  console.log(`  Verses with references: ${Object.keys(output).length}`);
  console.log(`  Avg refs per verse: ${avgRefs}`);

  // Show samples
  console.log('\n--- Samples ---');
  const sampleKeys = ['genesis-1-1', 'john-3-16', 'romans-8-28', 'psalms-23-1', 'revelation-22-21'];
  for (const key of sampleKeys) {
    const refs = output[key];
    if (refs) {
      console.log(`\n  ${key}: ${refs.length} refs`);
      for (const r of refs.slice(0, 3)) {
        console.log(`    ${r[0]} (votes: ${r[1]})`);
      }
    }
  }

  console.log('\nDone!');
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
