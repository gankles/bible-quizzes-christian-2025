#!/usr/bin/env npx tsx
/**
 * Strong's Verse Reference Generator
 *
 * Populates the verseSample and stats fields in data/lexicon.json by:
 *   1. Downloading interlinear Bible data (tahmmee/interlinear_bibledata — Public Domain)
 *   2. Downloading KJV text (scrollmapper/bible_databases — MIT License)
 *   3. Building a reverse concordance: Strong's number → verse references
 *   4. Selecting up to 5 representative verse samples per entry
 *   5. Computing occurrence statistics (totalOccurrences, bookBreakdown, mostFrequentBook)
 *
 * Usage:
 *   npx tsx scripts/generate-strongs-verses.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

// =============================================================================
// CONFIGURATION
// =============================================================================

const LEXICON_PATH = path.resolve(__dirname, '..', 'data', 'lexicon.json');
const INTERLINEAR_REPO = 'https://raw.githubusercontent.com/tahmmee/interlinear_bibledata/master';
const KJV_URL = 'https://raw.githubusercontent.com/scrollmapper/bible_databases/master/sources/en/KJV/KJV.json';
const CACHE_DIR = '/tmp/strongs-verse-cache';

// =============================================================================
// BOOK NAME MAPPING (tahmmee dir name → standard Bible name)
// =============================================================================

const BOOK_NAME_MAP: Record<string, string> = {
  genesis: 'Genesis', exodus: 'Exodus', leviticus: 'Leviticus',
  numbers: 'Numbers', deuteronomy: 'Deuteronomy', joshua: 'Joshua',
  judges: 'Judges', ruth: 'Ruth',
  i_samuel: '1 Samuel', ii_samuel: '2 Samuel',
  i_kings: '1 Kings', ii_kings: '2 Kings',
  i_chronicles: '1 Chronicles', ii_chronicles: '2 Chronicles',
  ezra: 'Ezra', nehemiah: 'Nehemiah', esther: 'Esther',
  job: 'Job', psalms: 'Psalms', proverbs: 'Proverbs',
  ecclesiastes: 'Ecclesiastes', song_of_solomon: 'Song of Solomon',
  isaiah: 'Isaiah', jeremiah: 'Jeremiah', lamentations: 'Lamentations',
  ezekiel: 'Ezekiel', daniel: 'Daniel', hosea: 'Hosea',
  joel: 'Joel', amos: 'Amos', obadiah: 'Obadiah',
  jonah: 'Jonah', micah: 'Micah', nahum: 'Nahum',
  habakkuk: 'Habakkuk', zephaniah: 'Zephaniah', haggai: 'Haggai',
  zechariah: 'Zechariah', malachi: 'Malachi',
  matthew: 'Matthew', mark: 'Mark', luke: 'Luke', john: 'John',
  acts: 'Acts', romans: 'Romans',
  i_corinthians: '1 Corinthians', ii_corinthians: '2 Corinthians',
  galatians: 'Galatians', ephesians: 'Ephesians',
  philippians: 'Philippians', colossians: 'Colossians',
  i_thessalonians: '1 Thessalonians', ii_thessalonians: '2 Thessalonians',
  i_timothy: '1 Timothy', ii_timothy: '2 Timothy',
  titus: 'Titus', philemon: 'Philemon', hebrews: 'Hebrews',
  james: 'James',
  i_peter: '1 Peter', ii_peter: '2 Peter',
  i_john: '1 John', ii_john: '2 John', iii_john: '3 John',
  jude: 'Jude', revelation: 'Revelation',
};

// Book order for spreading verse samples across different books
const BOOK_ORDER: string[] = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
  'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
  'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations',
  'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah',
  'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai',
  'Zechariah', 'Malachi',
  'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans',
  '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
  'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews',
  'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
  'Jude', 'Revelation',
];

// =============================================================================
// TYPES
// =============================================================================

interface InterlinearWord {
  text: string;
  number: string; // e.g. "h430", "g25"
}

interface BookMeta {
  b: number;  // book number
  n: string;  // directory name
  t: string;  // "ot" or "nt"
  c: number;  // chapter count
}

interface KJVBook {
  name: string;
  chapters: { chapter: number; name?: string; verses: { verse: number; text: string }[] }[];
}

interface VerseRef {
  ref: string;   // e.g. "Genesis 1:1"
  book: string;
  chapter: number;
  verse: number;
}

// =============================================================================
// HTTP DOWNLOAD
// =============================================================================

function download(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const get = (u: string, redirects = 0) => {
      if (redirects > 5) return reject(new Error('Too many redirects'));
      https.get(u, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location, redirects + 1);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${u}`));
        }
        const chunks: Buffer[] = [];
        res.on('data', (c: Buffer) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
        res.on('error', reject);
      }).on('error', reject);
    };
    get(url);
  });
}

async function downloadCached(url: string, cacheKey: string): Promise<string> {
  const cachePath = path.join(CACHE_DIR, cacheKey);
  if (fs.existsSync(cachePath)) {
    return fs.readFileSync(cachePath, 'utf-8');
  }
  const data = await download(url);
  fs.writeFileSync(cachePath, data, 'utf-8');
  return data;
}

// =============================================================================
// KJV BOOK NAME NORMALIZATION
// ScrollMapper KJV uses Roman numerals ("I Samuel") and "Revelation of John"
// Our concordance refs use Arabic numerals ("1 Samuel") and "Revelation"
// =============================================================================

const KJV_NAME_NORMALIZE: Record<string, string> = {
  'I Samuel': '1 Samuel', 'II Samuel': '2 Samuel',
  'I Kings': '1 Kings', 'II Kings': '2 Kings',
  'I Chronicles': '1 Chronicles', 'II Chronicles': '2 Chronicles',
  'I Corinthians': '1 Corinthians', 'II Corinthians': '2 Corinthians',
  'I Thessalonians': '1 Thessalonians', 'II Thessalonians': '2 Thessalonians',
  'I Timothy': '1 Timothy', 'II Timothy': '2 Timothy',
  'I Peter': '1 Peter', 'II Peter': '2 Peter',
  'I John': '1 John', 'II John': '2 John', 'III John': '3 John',
  'Revelation of John': 'Revelation',
};

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  console.log('Strong\'s Verse Reference Generator');
  console.log('===================================\n');

  // Ensure cache directory
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }

  // ── Step 1: Load lexicon ──────────────────────────────────────────────
  console.log('Loading lexicon...');
  if (!fs.existsSync(LEXICON_PATH)) {
    console.error(`ERROR: Lexicon not found at ${LEXICON_PATH}`);
    process.exit(1);
  }
  const lexiconData = JSON.parse(fs.readFileSync(LEXICON_PATH, 'utf-8'));
  const entries: any[] = lexiconData.entries;
  console.log(`  ${entries.length} lexicon entries loaded`);

  // Build a quick lookup set of valid Strong's IDs
  const validIds = new Set(entries.map((e: any) => e.strongs));

  // ── Step 2: Download books metadata ───────────────────────────────────
  console.log('\nDownloading books metadata...');
  const booksRaw = await downloadCached(`${INTERLINEAR_REPO}/books.json`, 'books.json');
  const books: BookMeta[] = JSON.parse(booksRaw);
  console.log(`  ${books.length} books found`);

  // ── Step 3: Download KJV text ─────────────────────────────────────────
  console.log('\nDownloading KJV text (this may take a moment)...');
  const kjvRaw = await downloadCached(KJV_URL, 'kjv.json');
  const kjvData: { books: KJVBook[] } = JSON.parse(kjvRaw);
  console.log(`  ${kjvData.books.length} KJV books loaded`);

  // Build KJV verse text lookup: "Genesis 1:1" → text
  // Normalize book names (Roman numerals → Arabic, "Revelation of John" → "Revelation")
  const kjvVerseText = new Map<string, string>();
  for (const book of kjvData.books) {
    const normalizedName = KJV_NAME_NORMALIZE[book.name] || book.name;
    for (const chapter of book.chapters) {
      for (const verse of chapter.verses) {
        const ref = `${normalizedName} ${chapter.chapter}:${verse.verse}`;
        kjvVerseText.set(ref, verse.text);
      }
    }
  }
  console.log(`  ${kjvVerseText.size} KJV verses indexed`);

  // ── Step 4: Build reverse concordance index ───────────────────────────
  console.log('\nBuilding concordance index from interlinear data...');

  // strongsId → Set of "Book Chapter:Verse" strings (deduplicated per verse)
  const concordance = new Map<string, VerseRef[]>();
  let chaptersProcessed = 0;
  let downloadErrors = 0;

  for (const book of books) {
    const bookName = BOOK_NAME_MAP[book.n];
    if (!bookName) {
      console.warn(`  WARNING: Unknown book directory "${book.n}", skipping`);
      continue;
    }

    for (let ch = 1; ch <= book.c; ch++) {
      const url = `${INTERLINEAR_REPO}/src/${book.n}/${ch}.json`;
      const cacheKey = `src_${book.n}_${ch}.json`;

      let chapterData: Record<string, InterlinearWord[]>;
      try {
        const raw = await downloadCached(url, cacheKey);
        chapterData = JSON.parse(raw);
      } catch (err: any) {
        downloadErrors++;
        if (downloadErrors <= 5) {
          console.warn(`  WARNING: Failed to download ${book.n}/${ch}: ${err.message}`);
        }
        continue;
      }

      // Process each verse in the chapter
      for (const [verseNum, words] of Object.entries(chapterData)) {
        const ref = `${bookName} ${ch}:${verseNum}`;
        const verseRef: VerseRef = {
          ref,
          book: bookName,
          chapter: ch,
          verse: parseInt(verseNum, 10),
        };

        // Track which Strong's numbers appear in this verse (deduplicate)
        const seenInVerse = new Set<string>();
        for (const word of words) {
          if (!word.number) continue;
          // Normalize: "h430" → "H430", "g25" → "G25"
          const strongsId = word.number.toUpperCase();
          if (!seenInVerse.has(strongsId)) {
            seenInVerse.add(strongsId);
            if (!concordance.has(strongsId)) {
              concordance.set(strongsId, []);
            }
            concordance.get(strongsId)!.push(verseRef);
          }
        }
      }

      chaptersProcessed++;
      if (chaptersProcessed % 100 === 0) {
        process.stdout.write(`  ${chaptersProcessed} chapters processed...\r`);
      }
    }
  }

  console.log(`  ${chaptersProcessed} chapters processed, ${downloadErrors} download errors`);
  console.log(`  ${concordance.size} unique Strong's numbers found in concordance`);

  // ── Step 5: Select verse samples & compute stats ──────────────────────
  console.log('\nComputing stats and selecting verse samples...');

  let enrichedCount = 0;
  let noDataCount = 0;

  for (const entry of entries) {
    const strongsId = entry.strongs; // e.g. "G25", "H430"
    const refs = concordance.get(strongsId);

    if (!refs || refs.length === 0) {
      noDataCount++;
      continue;
    }

    // Compute book breakdown
    const bookBreakdown: Record<string, number> = {};
    for (const ref of refs) {
      bookBreakdown[ref.book] = (bookBreakdown[ref.book] || 0) + 1;
    }

    // Find most frequent book
    let mostFrequentBook = '';
    let maxCount = 0;
    for (const [book, count] of Object.entries(bookBreakdown)) {
      if (count > maxCount) {
        maxCount = count;
        mostFrequentBook = book;
      }
    }

    // Update stats
    entry.stats = {
      totalOccurrences: refs.length,
      mostFrequentBook,
      bookBreakdown,
    };

    // Select up to 5 verse samples, spread across different books
    const samples = selectVerseSamples(refs, bookBreakdown, kjvVerseText);
    entry.verseSample = samples;

    enrichedCount++;
  }

  console.log(`  Enriched: ${enrichedCount} entries`);
  console.log(`  No concordance data: ${noDataCount} entries`);

  // ── Step 6: Write updated lexicon ─────────────────────────────────────
  console.log('\nWriting updated lexicon...');
  fs.writeFileSync(LEXICON_PATH, JSON.stringify(lexiconData, null, 2), 'utf-8');

  const fileSizeMB = (fs.statSync(LEXICON_PATH).size / (1024 * 1024)).toFixed(1);
  console.log(`  Written to ${LEXICON_PATH} (${fileSizeMB} MB)`);

  // ── Step 7: Show sample results ───────────────────────────────────────
  console.log('\n--- Sample Results ---');
  const sampleIds = ['G25', 'G26', 'G2316', 'H430', 'H1', 'H7965'];
  for (const id of sampleIds) {
    const entry = entries.find((e: any) => e.strongs === id);
    if (entry) {
      console.log(`\n${id} (${entry.word} — ${entry.transliteration}):`);
      console.log(`  Occurrences: ${entry.stats.totalOccurrences}`);
      console.log(`  Most frequent: ${entry.stats.mostFrequentBook}`);
      console.log(`  Books: ${Object.keys(entry.stats.bookBreakdown).length}`);
      console.log(`  Samples: ${entry.verseSample.length}`);
      for (const s of entry.verseSample.slice(0, 3)) {
        const textPreview = s.text.length > 80 ? s.text.substring(0, 80) + '...' : s.text;
        console.log(`    ${s.ref}: "${textPreview}"`);
      }
    }
  }

  console.log('\nDone!');
}

// =============================================================================
// VERSE SAMPLE SELECTION
// =============================================================================

/**
 * Select up to 5 representative verses, spread across different books.
 * Prioritizes well-known books and spreads across OT/NT when possible.
 */
function selectVerseSamples(
  refs: VerseRef[],
  bookBreakdown: Record<string, number>,
  kjvVerseText: Map<string, string>,
): { ref: string; text: string }[] {
  const MAX_SAMPLES = 5;

  if (refs.length <= MAX_SAMPLES) {
    // Few enough to include all
    return refs.map(r => ({
      ref: r.ref,
      text: kjvVerseText.get(r.ref) || '',
    })).filter(s => s.text);
  }

  // Strategy: pick from different books, prioritizing books with more occurrences
  // Sort books by canonical order for consistent results
  const booksWithRefs = Object.keys(bookBreakdown).sort((a, b) => {
    return BOOK_ORDER.indexOf(a) - BOOK_ORDER.indexOf(b);
  });

  const selected: { ref: string; text: string }[] = [];
  const usedBooks = new Set<string>();

  // First pass: one verse per book, spreading across as many books as possible
  // Pick from evenly spaced books
  const step = Math.max(1, Math.floor(booksWithRefs.length / MAX_SAMPLES));
  for (let i = 0; i < booksWithRefs.length && selected.length < MAX_SAMPLES; i += step) {
    const book = booksWithRefs[i];
    const bookRefs = refs.filter(r => r.book === book);
    // Pick a verse from roughly the middle of the book's occurrences
    const midRef = bookRefs[Math.floor(bookRefs.length / 2)];
    const text = kjvVerseText.get(midRef.ref);
    if (text) {
      selected.push({ ref: midRef.ref, text });
      usedBooks.add(book);
    }
  }

  // Second pass: fill remaining slots from unused books or books with most occurrences
  if (selected.length < MAX_SAMPLES) {
    const sortedByCount = Object.entries(bookBreakdown)
      .sort((a, b) => b[1] - a[1]);

    for (const [book] of sortedByCount) {
      if (selected.length >= MAX_SAMPLES) break;
      if (usedBooks.has(book)) continue;

      const bookRefs = refs.filter(r => r.book === book);
      const midRef = bookRefs[Math.floor(bookRefs.length / 2)];
      const text = kjvVerseText.get(midRef.ref);
      if (text) {
        selected.push({ ref: midRef.ref, text });
        usedBooks.add(book);
      }
    }
  }

  return selected;
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
