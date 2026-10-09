#!/usr/bin/env npx tsx
/**
 * Lexicon Concordance Builder
 *
 * Indexes every word in data/kjvstudy/interlinear/*.json by Strong's number,
 * producing for each number: the full list of verse occurrences and a
 * translation-count breakdown (frequency of each distinct English gloss used).
 *
 * Unlike scripts/generate-strongs-verses.ts (which downloads an external
 * interlinear dataset to populate a 5-verse `verseSample` on each lexicon
 * entry), this reads the interlinear data already committed to this repo
 * and keeps the FULL occurrence list, so lexicon pages can show a complete
 * concordance instead of a capped sample.
 *
 * Usage:
 *   npx tsx scripts/build-lexicon-concordance.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const INTERLINEAR_DIR = path.resolve(__dirname, '..', 'data', 'kjvstudy', 'interlinear');
const OUT_PATH = path.resolve(__dirname, '..', 'data', 'lexicon-concordance.json');

// slug (used in site URLs) -> [interlinear filename, book name used in interlinear keys]
const BOOKS: [string, string, string][] = [
  ['genesis', 'genesis', 'Genesis'], ['exodus', 'exodus', 'Exodus'], ['leviticus', 'leviticus', 'Leviticus'],
  ['numbers', 'numbers', 'Numbers'], ['deuteronomy', 'deuteronomy', 'Deuteronomy'], ['joshua', 'joshua', 'Joshua'],
  ['judges', 'judges', 'Judges'], ['ruth', 'ruth', 'Ruth'], ['1-samuel', '1_samuel', '1 Samuel'],
  ['2-samuel', '2_samuel', '2 Samuel'], ['1-kings', '1_kings', '1 Kings'], ['2-kings', '2_kings', '2 Kings'],
  ['1-chronicles', '1_chronicles', '1 Chronicles'], ['2-chronicles', '2_chronicles', '2 Chronicles'],
  ['ezra', 'ezra', 'Ezra'], ['nehemiah', 'nehemiah', 'Nehemiah'], ['esther', 'esther', 'Esther'],
  ['job', 'job', 'Job'], ['psalms', 'psalms', 'Psalms'], ['proverbs', 'proverbs', 'Proverbs'],
  ['ecclesiastes', 'ecclesiastes', 'Ecclesiastes'], ['song-of-solomon', "solomon's_song", "Solomon's Song"],
  ['isaiah', 'isaiah', 'Isaiah'], ['jeremiah', 'jeremiah', 'Jeremiah'], ['lamentations', 'lamentations', 'Lamentations'],
  ['ezekiel', 'ezekiel', 'Ezekiel'], ['daniel', 'daniel', 'Daniel'], ['hosea', 'hosea', 'Hosea'],
  ['joel', 'joel', 'Joel'], ['amos', 'amos', 'Amos'], ['obadiah', 'obadiah', 'Obadiah'], ['jonah', 'jonah', 'Jonah'],
  ['micah', 'micah', 'Micah'], ['nahum', 'nahum', 'Nahum'], ['habakkuk', 'habakkuk', 'Habakkuk'],
  ['zephaniah', 'zephaniah', 'Zephaniah'], ['haggai', 'haggai', 'Haggai'], ['zechariah', 'zechariah', 'Zechariah'],
  ['malachi', 'malachi', 'Malachi'], ['matthew', 'matthew', 'Matthew'], ['mark', 'mark', 'Mark'],
  ['luke', 'luke', 'Luke'], ['john', 'john', 'John'], ['acts', 'acts', 'Acts'], ['romans', 'romans', 'Romans'],
  ['1-corinthians', '1_corinthians', '1 Corinthians'], ['2-corinthians', '2_corinthians', '2 Corinthians'],
  ['galatians', 'galatians', 'Galatians'], ['ephesians', 'ephesians', 'Ephesians'],
  ['philippians', 'philippians', 'Philippians'], ['colossians', 'colossians', 'Colossians'],
  ['1-thessalonians', '1_thessalonians', '1 Thessalonians'], ['2-thessalonians', '2_thessalonians', '2 Thessalonians'],
  ['1-timothy', '1_timothy', '1 Timothy'], ['2-timothy', '2_timothy', '2 Timothy'], ['titus', 'titus', 'Titus'],
  ['philemon', 'philemon', 'Philemon'], ['hebrews', 'hebrews', 'Hebrews'], ['james', 'james', 'James'],
  ['1-peter', '1_peter', '1 Peter'], ['2-peter', '2_peter', '2 Peter'], ['1-john', '1_john', '1 John'],
  ['2-john', '2_john', '2 John'], ['3-john', '3_john', '3 John'], ['jude', 'jude', 'Jude'],
  ['revelation', 'revelation', 'Revelation'],
];

interface InterlinearWord {
  strongs: string;
  english: string;
}

interface ConcordanceEntry {
  totalOccurrences: number;
  translationCounts: Record<string, number>;
  occurrences: string[]; // "bookSlug:chapter:verse", one per raw word occurrence (repeats within a verse included)
}

function main() {
  console.log('Lexicon Concordance Builder');
  console.log('============================\n');

  const concordance = new Map<string, ConcordanceEntry>();

  let booksProcessed = 0;
  let totalWords = 0;

  for (const [slug, filename, bookName] of BOOKS) {
    const filePath = path.join(INTERLINEAR_DIR, `${filename}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`  WARNING: missing ${filePath}`);
      continue;
    }

    const bookData: Record<string, InterlinearWord[]> = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    for (const [key, words] of Object.entries(bookData)) {
      // key format: "<Book Name>:<chapter>:<verse>" — book name never contains ':'
      const parts = key.split(':');
      const chapter = parts[parts.length - 2];
      const verse = parts[parts.length - 1];
      const occRef = `${slug}:${chapter}:${verse}`;

      for (const word of words) {
        if (!word.strongs) continue;
        const strongsId = word.strongs.toUpperCase();
        totalWords++;

        let entry = concordance.get(strongsId);
        if (!entry) {
          entry = { totalOccurrences: 0, translationCounts: {}, occurrences: [] };
          concordance.set(strongsId, entry);
        }

        entry.totalOccurrences++;
        entry.occurrences.push(occRef);

        const gloss = word.english.trim();
        if (gloss) {
          entry.translationCounts[gloss] = (entry.translationCounts[gloss] || 0) + 1;
        }
      }
    }

    booksProcessed++;
    console.log(`  [${booksProcessed}/${BOOKS.length}] ${bookName}`);
  }

  console.log(`\n${totalWords} total Strong's-tagged words processed`);
  console.log(`${concordance.size} unique Strong's numbers indexed`);

  const out: Record<string, ConcordanceEntry> = {};
  for (const [id, entry] of concordance) out[id] = entry;

  fs.writeFileSync(OUT_PATH, JSON.stringify(out), 'utf-8');
  const sizeMB = (fs.statSync(OUT_PATH).size / (1024 * 1024)).toFixed(1);
  console.log(`\nWritten to ${OUT_PATH} (${sizeMB} MB)`);

  console.log('\n--- Sample Results ---');
  for (const id of ['H7225', 'H7218', 'G25', 'G2316', 'H430']) {
    const entry = out[id];
    if (!entry) {
      console.log(`${id}: no data`);
      continue;
    }
    const topGlosses = Object.entries(entry.translationCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    console.log(`\n${id}: ${entry.totalOccurrences} occurrences`);
    console.log(`  Top translations: ${topGlosses.map(([g, c]) => `"${g}" (${c})`).join(', ')}`);
    console.log(`  First 3 refs: ${entry.occurrences.slice(0, 3).join(', ')}`);
  }
}

main();
