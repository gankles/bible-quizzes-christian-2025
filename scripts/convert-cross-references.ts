#!/usr/bin/env tsx
/**
 * Convert cross_references.txt (OpenBible.info TSV) to compact JSON format.
 * Input:  tab-separated "From Verse\tTo Verse\tVotes"
 *         e.g. "Gen.1.1\tJer.51.15\t83"
 * Output: data/cross-references.json in compact format:
 *         { "genesis-1-1": [["Jeremiah 51:15", 83, "jeremiah", 51, 15], ...] }
 */

import fs from 'fs';
import path from 'path';

// Abbreviation → [slug, displayName]
const BOOK_MAP: Record<string, [string, string]> = {
  'Gen': ['genesis', 'Genesis'],
  'Exod': ['exodus', 'Exodus'],
  'Lev': ['leviticus', 'Leviticus'],
  'Num': ['numbers', 'Numbers'],
  'Deut': ['deuteronomy', 'Deuteronomy'],
  'Josh': ['joshua', 'Joshua'],
  'Judg': ['judges', 'Judges'],
  'Ruth': ['ruth', 'Ruth'],
  '1Sam': ['1-samuel', '1 Samuel'],
  '2Sam': ['2-samuel', '2 Samuel'],
  '1Kgs': ['1-kings', '1 Kings'],
  '2Kgs': ['2-kings', '2 Kings'],
  '1Chr': ['1-chronicles', '1 Chronicles'],
  '2Chr': ['2-chronicles', '2 Chronicles'],
  'Ezra': ['ezra', 'Ezra'],
  'Neh': ['nehemiah', 'Nehemiah'],
  'Esth': ['esther', 'Esther'],
  'Job': ['job', 'Job'],
  'Ps': ['psalms', 'Psalms'],
  'Prov': ['proverbs', 'Proverbs'],
  'Eccl': ['ecclesiastes', 'Ecclesiastes'],
  'Song': ['song-of-solomon', 'Song of Solomon'],
  'Isa': ['isaiah', 'Isaiah'],
  'Jer': ['jeremiah', 'Jeremiah'],
  'Lam': ['lamentations', 'Lamentations'],
  'Ezek': ['ezekiel', 'Ezekiel'],
  'Dan': ['daniel', 'Daniel'],
  'Hos': ['hosea', 'Hosea'],
  'Joel': ['joel', 'Joel'],
  'Amos': ['amos', 'Amos'],
  'Obad': ['obadiah', 'Obadiah'],
  'Jonah': ['jonah', 'Jonah'],
  'Mic': ['micah', 'Micah'],
  'Nah': ['nahum', 'Nahum'],
  'Hab': ['habakkuk', 'Habakkuk'],
  'Zeph': ['zephaniah', 'Zephaniah'],
  'Hag': ['haggai', 'Haggai'],
  'Zech': ['zechariah', 'Zechariah'],
  'Mal': ['malachi', 'Malachi'],
  'Matt': ['matthew', 'Matthew'],
  'Mark': ['mark', 'Mark'],
  'Luke': ['luke', 'Luke'],
  'John': ['john', 'John'],
  'Acts': ['acts', 'Acts'],
  'Rom': ['romans', 'Romans'],
  '1Cor': ['1-corinthians', '1 Corinthians'],
  '2Cor': ['2-corinthians', '2 Corinthians'],
  'Gal': ['galatians', 'Galatians'],
  'Eph': ['ephesians', 'Ephesians'],
  'Phil': ['philippians', 'Philippians'],
  'Col': ['colossians', 'Colossians'],
  '1Thess': ['1-thessalonians', '1 Thessalonians'],
  '2Thess': ['2-thessalonians', '2 Thessalonians'],
  '1Tim': ['1-timothy', '1 Timothy'],
  '2Tim': ['2-timothy', '2 Timothy'],
  'Titus': ['titus', 'Titus'],
  'Phlm': ['philemon', 'Philemon'],
  'Heb': ['hebrews', 'Hebrews'],
  'Jas': ['james', 'James'],
  '1Pet': ['1-peter', '1 Peter'],
  '2Pet': ['2-peter', '2 Peter'],
  '1John': ['1-john', '1 John'],
  '2John': ['2-john', '2 John'],
  '3John': ['3-john', '3 John'],
  'Jude': ['jude', 'Jude'],
  'Rev': ['revelation', 'Revelation'],
};

interface ParsedRef {
  abbrev: string;
  chapter: number;
  verse: number;
}

// Parse "Gen.1.1" → { abbrev: "Gen", chapter: 1, verse: 1 }
function parseRef(ref: string): ParsedRef | null {
  const parts = ref.split('.');
  if (parts.length < 3) return null;
  // Handle books like "1Sam", "Song" — the book abbreviation is parts[0]
  const abbrev = parts[0];
  const chapter = parseInt(parts[1], 10);
  const verse = parseInt(parts[2], 10);
  if (isNaN(chapter) || isNaN(verse)) return null;
  return { abbrev, chapter, verse };
}

// Parse "To Verse" field which can be a single ref or range like "Prov.8.22-Prov.8.30"
function parseToVerse(toField: string): { slug: string; name: string; chapter: number; verse: number; verseEnd?: number; display: string } | null {
  // Check for range FIRST: "Book.Ch.V-Book.Ch.V"
  const rangeMatch = toField.match(/^(.+?\.\d+\.\d+)-(.+?\.\d+\.\d+)$/);
  if (rangeMatch) {
    const start = parseRef(rangeMatch[1]);
    const end = parseRef(rangeMatch[2]);
    if (start && end) {
      const bookInfo = BOOK_MAP[start.abbrev];
      if (!bookInfo) return null;
      const [slug, name] = bookInfo;

      if (start.chapter === end.chapter) {
        return {
          slug,
          name,
          chapter: start.chapter,
          verse: start.verse,
          verseEnd: end.verse,
          display: `${name} ${start.chapter}:${start.verse}-${end.verse}`,
        };
      } else {
        return {
          slug,
          name,
          chapter: start.chapter,
          verse: start.verse,
          verseEnd: end.verse,
          display: `${name} ${start.chapter}:${start.verse}-${end.chapter}:${end.verse}`,
        };
      }
    }
  }

  // Single verse: "Jer.51.15"
  const single = parseRef(toField);
  if (single) {
    const bookInfo = BOOK_MAP[single.abbrev];
    if (!bookInfo) return null;
    const [slug, name] = bookInfo;
    return {
      slug,
      name,
      chapter: single.chapter,
      verse: single.verse,
      display: `${name} ${single.chapter}:${single.verse}`,
    };
  }

  return null;
}

// Compact format: [display, votes, slug, chapter, verse, verseEnd?]
type CompactRef = [string, number, string, number, number] | [string, number, string, number, number, number];

const inputPath = path.join(process.cwd(), 'cross_references.txt');
const outputPath = path.join(process.cwd(), 'data', 'cross-references.json');

console.log('Reading cross_references.txt...');
const raw = fs.readFileSync(inputPath, 'utf-8');
const lines = raw.split('\n').filter(l => l.trim());

// Skip header
const dataLines = lines.slice(1);
console.log(`Parsing ${dataLines.length} cross-reference pairs...`);

const result: Record<string, CompactRef[]> = {};
let skipped = 0;
let parsed = 0;

for (const line of dataLines) {
  const [fromField, toField, votesStr] = line.split('\t');
  if (!fromField || !toField || !votesStr) { skipped++; continue; }

  const votes = parseInt(votesStr, 10);
  // Skip negative votes (community-downvoted as irrelevant)
  if (isNaN(votes) || votes < 0) { skipped++; continue; }

  const from = parseRef(fromField);
  if (!from) { skipped++; continue; }

  const fromBook = BOOK_MAP[from.abbrev];
  if (!fromBook) { skipped++; continue; }

  const toRef = parseToVerse(toField);
  if (!toRef) { skipped++; continue; }

  const key = `${fromBook[0]}-${from.chapter}-${from.verse}`;

  const entry: CompactRef = toRef.verseEnd
    ? [toRef.display, votes, toRef.slug, toRef.chapter, toRef.verse, toRef.verseEnd]
    : [toRef.display, votes, toRef.slug, toRef.chapter, toRef.verse];

  if (!result[key]) {
    result[key] = [];
  }
  result[key].push(entry);
  parsed++;
}

// Sort each verse's cross-references by votes descending
for (const key of Object.keys(result)) {
  result[key].sort((a, b) => b[1] - a[1]);
}

const verseCount = Object.keys(result).length;
console.log(`\nResults:`);
console.log(`  Verse entries: ${verseCount}`);
console.log(`  Total cross-refs: ${parsed}`);
console.log(`  Skipped lines: ${skipped}`);

// Write output
console.log(`\nWriting ${outputPath}...`);
fs.writeFileSync(outputPath, JSON.stringify(result));

const fileSizeMB = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(1);
console.log(`Done! File size: ${fileSizeMB} MB`);
