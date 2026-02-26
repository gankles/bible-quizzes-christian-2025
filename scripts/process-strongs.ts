/**
 * process-strongs.ts
 *
 * Reads raw Strong's Hebrew and Greek dictionary JS files from data/sword-modules/,
 * parses them into clean JSON, and outputs:
 *   - data/strongs-hebrew.json
 *   - data/strongs-greek.json
 *   - data/strongs-hebrew-index.json
 *   - data/strongs-greek-index.json
 *
 * Run: npx tsx scripts/process-strongs.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RawEntry {
  lemma?: string;
  xlit?: string;       // Hebrew uses xlit
  translit?: string;   // Greek uses translit
  pron?: string;
  derivation?: string;
  strongs_def?: string;
  kjv_def?: string;
}

interface StrongsEntry {
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
  slugMap: Record<string, string>;       // slug -> number
  letterIndex: Record<string, string[]>; // A -> [slugs...]
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Strip HTML tags from a string */
function stripHtml(s: string): string {
  return s.replace(/<[^>]*>/g, '');
}

/** Decode common HTML entities */
function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

/** Clean a text field: strip HTML, decode entities, trim whitespace */
function clean(s: string | undefined): string {
  if (!s) return '';
  let result = stripHtml(s);
  result = decodeEntities(result);
  // Remove curly-brace wrappers (used for implied definitions)
  result = result.replace(/^\{(.+)\}$/, '$1');
  // Normalize whitespace
  result = result.replace(/\s+/g, ' ').trim();
  // Remove trailing semicolons and periods for cleanliness in some fields
  return result;
}

/**
 * Generate a URL-friendly slug from the Strong's number and transliteration.
 * e.g. "H1" + "ʼâb" -> "h1-ab"
 */
function generateSlug(number: string, transliteration: string): string {
  const lowerNum = number.toLowerCase();

  if (!transliteration) {
    return lowerNum;
  }

  // Take the first word of the transliteration for the slug
  const firstWord = transliteration.split(/[\s,;()/]+/)[0] || transliteration;

  let slug = firstWord.toLowerCase();

  // Use NFD normalization to decompose accented characters, then strip combining marks
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Remove specific non-ASCII punctuation characters (ayin, aleph markers, quotes)
  slug = slug.replace(/[\u02BC\u02BB\u2018\u2019\u0027\u201C\u201D\u1D49\u1D43\u1D52\u1D58\u1D62]/g, "");

  // Replace superscript letters with their base forms
  slug = slug
    .replace(/\u1D49/g, "e")  // superscript e
    .replace(/\u1D43/g, "a")  // superscript a
    .replace(/\u1D52/g, "o")  // superscript o
    .replace(/\u1D58/g, "u")  // superscript u
    .replace(/\u1D62/g, "i"); // subscript i

  // Handle specific transliteration characters not covered by NFD
  const specialChars: Array<[RegExp, string]> = [
    [/\u1E63/g, "s"], // ṣ
    [/\u015B/g, "s"],  // ś
    [/\u0161/g, "s"],  // š
    [/\u1E6D/g, "t"],  // ṭ
    [/\u1E6F/g, "t"],  // ṯ
    [/\u1E25/g, "h"],  // ḥ
    [/\u1E2B/g, "h"],  // ḫ
    [/\u1E0D/g, "d"],  // ḍ
    [/\u1E0F/g, "d"],  // ḏ
    [/\u1E45/g, "n"],  // ṅ
    [/\u1E5B/g, "r"],  // ṛ
    [/\u1E33/g, "k"],  // ḳ
    [/\u1E37/g, "l"],  // ḷ
    [/\u1E41/g, "m"],  // ṁ
    [/\u1E57/g, "p"],  // ṗ
    [/\u1E93/g, "z"],  // ẓ
    [/\u011F/g, "g"],  // ğ
    [/\u00E7/g, "c"],  // ç
    [/\u00F1/g, "n"],  // ñ
    [/\u03C9/g, "o"],  // ω (Greek omega)
  ];
  for (const [pattern, replacement] of specialChars) {
    slug = slug.replace(pattern, replacement);
  }

  // Remove any remaining non-ASCII characters
  slug = slug.replace(/[^\x00-\x7F]/g, "");

  // Keep only alphanumeric and hyphens
  slug = slug.replace(/[^a-z0-9-]/g, '');

  // Remove leading/trailing hyphens and collapse multiple hyphens
  slug = slug.replace(/-+/g, '-').replace(/^-|-$/g, '');

  if (!slug) {
    return lowerNum;
  }

  return `${lowerNum}-${slug}`;
}

/**
 * Parse a raw JS dictionary file into a Record<string, RawEntry>.
 * The file format is: var strongsXxxDictionary = {...JSON...}; module.exports = ...
 */
function parseRawFile(filePath: string, varName: string): Record<string, RawEntry> {
  console.log(`Reading ${filePath}...`);
  const raw = fs.readFileSync(filePath, 'utf-8');

  // Find the JSON object: starts after "var <varName> = " and ends before "};"
  const varPrefix = `var ${varName} = `;
  const startIdx = raw.indexOf(varPrefix);
  if (startIdx === -1) {
    throw new Error(`Could not find "${varPrefix}" in ${filePath}`);
  }

  const jsonStart = startIdx + varPrefix.length;

  // Find the closing of the top-level object.
  // The file ends with: ...};\n\nmodule.exports = ...
  // We need to find the matching closing brace for the opening one.
  // A simpler approach: find "};" followed by optional whitespace and "module.exports"
  // or end of file.
  const moduleExportsPattern = /\};\s*(module\.exports\s*=|$)/;
  const match = raw.substring(jsonStart).match(moduleExportsPattern);
  if (!match || match.index === undefined) {
    throw new Error(`Could not find end of dictionary object in ${filePath}`);
  }

  const jsonStr = raw.substring(jsonStart, jsonStart + match.index + 1); // +1 to include the }

  console.log(`  Parsing JSON (${jsonStr.length} chars)...`);

  let dict: Record<string, RawEntry>;
  try {
    dict = JSON.parse(jsonStr);
  } catch (e) {
    throw new Error(`Failed to parse JSON from ${filePath}: ${e}`);
  }

  console.log(`  Found ${Object.keys(dict).length} entries`);
  return dict;
}

/**
 * Process a raw dictionary into an array of clean StrongsEntry objects.
 */
function processDictionary(
  raw: Record<string, RawEntry>,
  prefix: 'H' | 'G'
): StrongsEntry[] {
  const entries: StrongsEntry[] = [];
  const slugCounts = new Map<string, number>();

  // Sort entries by numeric value for consistent output
  const sortedKeys = Object.keys(raw).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, ''), 10);
    const numB = parseInt(b.replace(/\D/g, ''), 10);
    return numA - numB;
  });

  for (const number of sortedKeys) {
    const entry = raw[number];

    // Get transliteration — Hebrew uses xlit, Greek uses translit
    const transliteration = clean(entry.xlit || entry.translit || '');
    const pronunciation = clean(entry.pron || '');
    const derivation = clean(entry.derivation || '');
    const definition = clean(entry.strongs_def || '');
    const kjvTranslations = clean(entry.kjv_def || '');
    const lemma = (entry.lemma || '').trim();

    // Generate slug
    let slug = generateSlug(number, transliteration);

    // Handle duplicate slugs by appending a counter
    const baseSlug = slug;
    const count = slugCounts.get(baseSlug) || 0;
    if (count > 0) {
      slug = `${baseSlug}-${count + 1}`;
    }
    slugCounts.set(baseSlug, count + 1);

    entries.push({
      number,
      lemma,
      transliteration,
      pronunciation,
      derivation,
      definition,
      kjvTranslations,
      slug,
    });
  }

  return entries;
}

/**
 * Build an index from an array of StrongsEntry objects.
 */
function buildIndex(entries: StrongsEntry[]): StrongsIndex {
  const slugMap: Record<string, string> = {};
  const letterIndex: Record<string, string[]> = {};

  for (const entry of entries) {
    slugMap[entry.slug] = entry.number;

    // Get the first letter of the transliteration part of the slug (after the number prefix)
    // e.g. "h1-ab" -> "A", "g100-agathos" -> "A"
    const parts = entry.slug.split('-');
    // The slug starts with the number prefix (h1, g100, etc.)
    // The transliteration part starts at index 1
    const translitPart = parts.slice(1).join('-');
    let letter: string;

    if (translitPart) {
      letter = translitPart[0].toUpperCase();
    } else {
      letter = '#'; // No transliteration available
    }

    if (!letterIndex[letter]) {
      letterIndex[letter] = [];
    }
    letterIndex[letter].push(entry.slug);
  }

  // Sort letter index keys and their arrays
  const sortedLetterIndex: Record<string, string[]> = {};
  for (const key of Object.keys(letterIndex).sort()) {
    sortedLetterIndex[key] = letterIndex[key].sort();
  }

  return {
    totalEntries: entries.length,
    slugMap,
    letterIndex: sortedLetterIndex,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const baseDir = path.resolve(__dirname, '..');
  const swordDir = path.join(baseDir, 'data', 'sword-modules');
  const outDir = path.join(baseDir, 'data');

  console.log('=== Strong\'s Dictionary Processor ===\n');

  // Parse raw files
  const hebrewRaw = parseRawFile(
    path.join(swordDir, 'strongs-hebrew-raw.js'),
    'strongsHebrewDictionary'
  );
  const greekRaw = parseRawFile(
    path.join(swordDir, 'strongs-greek-raw.js'),
    'strongsGreekDictionary'
  );

  // Process into clean entries
  console.log('\nProcessing Hebrew entries...');
  const hebrewEntries = processDictionary(hebrewRaw, 'H');
  console.log(`  Processed ${hebrewEntries.length} Hebrew entries`);

  console.log('Processing Greek entries...');
  const greekEntries = processDictionary(greekRaw, 'G');
  console.log(`  Processed ${greekEntries.length} Greek entries`);

  // Build indexes
  console.log('\nBuilding indexes...');
  const hebrewIndex = buildIndex(hebrewEntries);
  const greekIndex = buildIndex(greekEntries);

  // Write output files
  console.log('\nWriting output files...');

  const hebrewPath = path.join(outDir, 'strongs-hebrew.json');
  fs.writeFileSync(hebrewPath, JSON.stringify(hebrewEntries, null, 2), 'utf-8');
  console.log(`  ${hebrewPath} (${hebrewEntries.length} entries)`);

  const greekPath = path.join(outDir, 'strongs-greek.json');
  fs.writeFileSync(greekPath, JSON.stringify(greekEntries, null, 2), 'utf-8');
  console.log(`  ${greekPath} (${greekEntries.length} entries)`);

  const hebrewIndexPath = path.join(outDir, 'strongs-hebrew-index.json');
  fs.writeFileSync(hebrewIndexPath, JSON.stringify(hebrewIndex, null, 2), 'utf-8');
  console.log(`  ${hebrewIndexPath} (${hebrewIndex.totalEntries} entries, ${Object.keys(hebrewIndex.letterIndex).length} letter groups)`);

  const greekIndexPath = path.join(outDir, 'strongs-greek-index.json');
  fs.writeFileSync(greekIndexPath, JSON.stringify(greekIndex, null, 2), 'utf-8');
  console.log(`  ${greekIndexPath} (${greekIndex.totalEntries} entries, ${Object.keys(greekIndex.letterIndex).length} letter groups)`);

  // Summary
  console.log('\n=== Summary ===');
  console.log(`Hebrew: ${hebrewEntries.length} entries`);
  console.log(`  Letter groups: ${Object.keys(hebrewIndex.letterIndex).sort().join(', ')}`);
  console.log(`Greek:  ${greekEntries.length} entries`);
  console.log(`  Letter groups: ${Object.keys(greekIndex.letterIndex).sort().join(', ')}`);

  // Show a sample entry from each
  console.log('\n--- Sample Hebrew Entry (H1) ---');
  console.log(JSON.stringify(hebrewEntries[0], null, 2));
  console.log('\n--- Sample Greek Entry (first) ---');
  console.log(JSON.stringify(greekEntries[0], null, 2));

  console.log('\nDone!');
}

main();
