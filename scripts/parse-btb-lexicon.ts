#!/usr/bin/env npx tsx
/**
 * BTB Lexicon Parser
 *
 * Parses the BTB (Bible Translation Bundle) lexicon data from Obsidian Markdown
 * files into a JSON format consumable by the lexicon pages.
 *
 * Sources parsed:
 *   - DEF (Strong's definitions) — Greek & Hebrew
 *   - AS  (Abbott-Smith Manual Greek Lexicon) — Greek only
 *   - LSJ (Liddell-Scott-Jones) — Greek only
 *   - BDB (Brown-Driver-Briggs) — Hebrew only
 *
 * Usage:
 *   npx tsx scripts/parse-btb-lexicon.ts
 *   npx tsx scripts/parse-btb-lexicon.ts --btb-path /path/to/BTB
 */

import * as fs from 'fs';
import * as path from 'path';

// =============================================================================
// CONFIGURATION
// =============================================================================

const DEFAULT_BTB_PATH = '/tmp/BTB';
const OUTPUT_PATH = path.resolve(__dirname, '..', 'data', 'lexicon.json');

// Parse CLI args
const args = process.argv.slice(2);
const btbPathIdx = args.indexOf('--btb-path');
const BTB_PATH = btbPathIdx !== -1 && args[btbPathIdx + 1]
  ? args[btbPathIdx + 1]
  : DEFAULT_BTB_PATH;

const LEXICON_DIR = path.join(BTB_PATH, 'lexicon');
const DEF_DIR = path.join(LEXICON_DIR, 'dictionary');
const AS_DIR = path.join(LEXICON_DIR, 'as');
const LSJ_DIR = path.join(LEXICON_DIR, 'lsj');
const BDB_DIR = path.join(LEXICON_DIR, 'bdb');

// =============================================================================
// TYPES
// =============================================================================

interface LexiconEntry {
  id: string;
  strongs: string;
  word: string;
  transliteration: string;
  phonetic: string;
  language: string;
  pronunciation: string;
  colorCode: string;
  definitions: {
    strongs: string;
    lsj?: string;
    abbottSmith?: string;
    bdb?: string;
    briefLexicon?: string;
  };
  morphology: { code: string; explanation: string };
  stats: { totalOccurrences: number; mostFrequentBook: string; bookBreakdown: Record<string, number> };
  synergy: { crossReferences: string[]; devotional: string; peopleAlsoAsked: any[] };
  verseSample: { ref: string; text: string }[];
}

interface DEFData {
  word: string;
  transliteration: string;
  phonetic: string;
  gloss: string;
  morphCode: string;
  definitions: string;
  etymology: string;
  crossRefs: string[];
}

// =============================================================================
// TEXT CLEANING UTILITIES
// =============================================================================

/** Strip all HTML tags, keeping text content */
function stripHtml(text: string): string {
  return text.replace(/<[^>]+>/g, '');
}

/** Resolve Obsidian wiki-links [[target|display]] → display, [[target]] → target */
function resolveWikiLinks(text: string): string {
  // [[target|display]] → display
  text = text.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2');
  // [[target]] → target
  text = text.replace(/\[\[([^\]]+)\]\]/g, '$1');
  return text;
}

/** Remove LaTeX math notation */
function removeLaTeX(text: string): string {
  return text.replace(/\$\\q?quad\$/g, ' ').replace(/\$[^$]*\$/g, '');
}

/** Remove Obsidian transclusions */
function removeTransclusions(text: string): string {
  return text.replace(/!\[\[[^\]]+\]\]/g, '');
}

/** Remove markdown bold/italic markers */
function removeMarkdownFormatting(text: string): string {
  // Bold (**text** or __text__)
  text = text.replace(/\*\*\*([^*]+)\*\*\*/g, '$1'); // bold-italic
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/__([^_]+)__/g, '$1');
  // Italic (*text* or _text_) - be careful not to strip underscores in words
  text = text.replace(/\*([^*]+)\*/g, '$1');
  // Highlight ==text==
  text = text.replace(/==([^=]+)==/g, '$1');
  return text;
}

/** Full clean: strip HTML, wiki-links, LaTeX, transclusions, then normalize whitespace */
function fullClean(text: string): string {
  text = stripHtml(text);
  text = resolveWikiLinks(text);
  text = removeLaTeX(text);
  text = removeTransclusions(text);
  text = removeMarkdownFormatting(text);
  // Remove RTL/LTR marks and zero-width chars
  text = text.replace(/[\u200E\u200F\u200B\u200C\u200D\uFEFF]/g, '');
  // Collapse whitespace
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

/** Light clean: strip HTML and wiki-links but keep markdown structure */
function lightClean(text: string): string {
  text = stripHtml(text);
  text = resolveWikiLinks(text);
  text = removeLaTeX(text);
  text = removeTransclusions(text);
  text = text.replace(/[\u200E\u200F\u200B\u200C\u200D\uFEFF]/g, '');
  return text;
}

// =============================================================================
// MORPHOLOGY CODE MAPPING
// =============================================================================

const MORPH_EXPLANATIONS: Record<string, string> = {
  // Greek parts of speech
  'G:N-M': 'Greek Noun, Masculine',
  'G:N-F': 'Greek Noun, Feminine',
  'G:N-N': 'Greek Noun, Neuter',
  'G:N': 'Greek Noun',
  'G:V': 'Greek Verb',
  'G:A': 'Greek Adjective',
  'G:ADV': 'Greek Adverb',
  'G:PREP': 'Greek Preposition',
  'G:CONJ': 'Greek Conjunction',
  'G:PRT': 'Greek Particle',
  'G:PRON': 'Greek Pronoun',
  'G:ART': 'Greek Article',
  'G:INT': 'Greek Interjection',
  // Hebrew parts of speech
  'H:N-M': 'Hebrew Noun, Masculine',
  'H:N-F': 'Hebrew Noun, Feminine',
  'H:N': 'Hebrew Noun',
  'H:V': 'Hebrew Verb',
  'H:A': 'Hebrew Adjective',
  'H:ADV': 'Hebrew Adverb',
  'H:PREP': 'Hebrew Preposition',
  'H:CONJ': 'Hebrew Conjunction',
  'H:PRT': 'Hebrew Particle',
  'H:PRON': 'Hebrew Pronoun',
  'H:PROP': 'Proper Noun',
};

function getMorphExplanation(code: string): string {
  if (MORPH_EXPLANATIONS[code]) return MORPH_EXPLANATIONS[code];

  // Try to build explanation from parts
  const parts: string[] = [];
  if (code.startsWith('G:')) parts.push('Greek');
  else if (code.startsWith('H:')) parts.push('Hebrew');

  const remainder = code.replace(/^[GH]:/, '');
  const typeMap: Record<string, string> = {
    'N': 'Noun', 'V': 'Verb', 'A': 'Adjective', 'ADV': 'Adverb',
    'PREP': 'Preposition', 'CONJ': 'Conjunction', 'PRT': 'Particle',
    'PRON': 'Pronoun', 'ART': 'Article', 'INT': 'Interjection', 'PROP': 'Proper Noun',
  };
  const genderMap: Record<string, string> = { 'M': 'Masculine', 'F': 'Feminine', 'N': 'Neuter' };

  const match = remainder.match(/^([A-Z]+)(?:-([MFN]))?/);
  if (match) {
    if (typeMap[match[1]]) parts.push(typeMap[match[1]]);
    else parts.push(match[1]);
    if (match[2] && genderMap[match[2]]) parts.push(genderMap[match[2]]);
  }

  return parts.length > 0 ? parts.join(', ') : code;
}

// =============================================================================
// DEF PARSER
// =============================================================================

function parseDEF(filePath: string): DEFData | null {
  let content: string;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }

  const data: DEFData = {
    word: '',
    transliteration: '',
    phonetic: '',
    gloss: '',
    morphCode: '',
    definitions: '',
    etymology: '',
    crossRefs: [],
  };

  // Extract original word from <span class="asgreek"> or <span class="ashebrew">
  const wordMatch = content.match(/<span class="as(?:greek|hebrew)">([^<]*)<\/span>/);
  if (wordMatch) {
    data.word = wordMatch[1].replace(/[\u200E\u200F\u200B‎]/g, '').trim();
  }

  // Extract transliteration: bold text after the span on the first line
  // Pattern: </span></big>** **transliteration**
  const translitMatch = content.match(/<\/span><\/big>\*\*\s*\*\*([^*]+)\*\*/);
  if (translitMatch) {
    data.transliteration = translitMatch[1].trim();
  }

  // Extract pronunciation from *(pron)*
  const pronMatch = content.match(/\*\(([^)]+)\)\*/);
  if (pronMatch) {
    data.phonetic = pronMatch[1].trim();
  }

  // Extract gloss from ==**word**==
  const glossMatch = content.match(/==\*\*([^*=]+)\*\*==/);
  if (glossMatch) {
    data.gloss = glossMatch[1].trim();
  }

  // Extract morph code from [[TEGMC#...]] or [[TEHMC#...]]
  const morphMatch = content.match(/\[\[TE[GH]MC#([^\]|]+)/);
  if (morphMatch) {
    data.morphCode = morphMatch[1].trim();
  }

  // Extract definitions: everything after the first line of "metadata" up to cross-refs
  const lines = content.split('\n');
  const defLines: string[] = [];
  let pastHeader = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines at start
    if (!pastHeader) {
      // The header is the first line(s) with the word/transliteration/morph
      if (trimmed.startsWith('**<big>') || trimmed.startsWith('<small>from') || trimmed.startsWith('<small>perhaps') || trimmed.startsWith('<small>a primitive') || trimmed === '') {
        continue;
      }
      pastHeader = true;
    }

    // Stop at cross-reference section or HR
    if (trimmed.startsWith('<small>See Greek:') || trimmed.startsWith('<small>See Hebrew:') || trimmed === '---') {
      break;
    }

    // Collect definition lines
    if (trimmed) {
      defLines.push(trimmed);
    }
  }

  data.definitions = defLines.map(l => fullClean(l)).filter(Boolean).join('\n');

  // Extract etymology from <small>from line
  const etymMatch = content.match(/<small>(from\s+[^<]+|perhaps\s+from[^<]+|a primitive[^<]+)<\/small>/i);
  if (etymMatch) {
    data.etymology = fullClean(etymMatch[1]);
  }

  // Extract cross-references: [[G1234|...]] or [[H1234|...]] links in "See Greek/Hebrew" lines
  const seeMatch = content.match(/<small>See (?:Greek|Hebrew):\s*<\/small>(.*)/s);
  if (seeMatch) {
    const refs = seeMatch[1].match(/\[\[([GH]\d+)/g);
    if (refs) {
      data.crossRefs = refs.map(r => r.replace('[[', ''));
    }
  }

  return data;
}

// =============================================================================
// AS (ABBOTT-SMITH) PARSER
// =============================================================================

function parseAS(filePath: string): string | null {
  let content: string;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }

  // Remove the reference table at the bottom
  const tableIdx = content.indexOf('**Abbott-Smith References**');
  if (tableIdx !== -1) {
    content = content.substring(0, tableIdx);
  }

  // Clean and return
  let cleaned = lightClean(content);
  cleaned = removeMarkdownFormatting(cleaned);
  // Collapse multiple spaces/newlines
  cleaned = cleaned.replace(/\n{2,}/g, '\n').replace(/\s+/g, ' ').trim();

  // Truncate if very long (some entries are massive)
  if (cleaned.length > 2000) {
    cleaned = cleaned.substring(0, 2000) + '...';
  }

  return cleaned || null;
}

// =============================================================================
// LSJ (LIDDELL-SCOTT-JONES) PARSER
// =============================================================================

function parseLSJ(filePath: string): string | null {
  let content: string;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }

  // Remove scripture ref table at bottom
  const tableIdx = content.indexOf('LSJ Scripture Refs:');
  if (tableIdx !== -1) {
    content = content.substring(0, tableIdx);
  }

  // Clean
  let cleaned = lightClean(content);
  // Remove <a> tag text remnants with dating info
  cleaned = cleaned.replace(/\[Refs[^\]]*\]/g, '');
  cleaned = removeMarkdownFormatting(cleaned);
  cleaned = cleaned.replace(/\n{2,}/g, '\n').replace(/\s+/g, ' ').trim();

  if (cleaned.length > 2000) {
    cleaned = cleaned.substring(0, 2000) + '...';
  }

  return cleaned || null;
}

// =============================================================================
// BDB (BROWN-DRIVER-BRIGGS) PARSER
// =============================================================================

function parseBDB(filePath: string): string | null {
  let content: string;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }

  // Remove reference table at bottom
  const tableIdx = content.indexOf('**Brown-Driver-Briggs References**');
  if (tableIdx !== -1) {
    content = content.substring(0, tableIdx);
  }

  // Clean
  let cleaned = lightClean(content);
  // Remove base64 images
  cleaned = cleaned.replace(/<img[^>]+>/g, '');
  cleaned = removeMarkdownFormatting(cleaned);
  cleaned = cleaned.replace(/\n{2,}/g, '\n').replace(/\s+/g, ' ').trim();

  if (cleaned.length > 3000) {
    cleaned = cleaned.substring(0, 3000) + '...';
  }

  return cleaned || null;
}

// =============================================================================
// MAIN ASSEMBLY
// =============================================================================

function getStrongsNumber(filename: string): string {
  // DEF.G0026.md → G0026, or G0026.md → G0026
  const match = filename.match(/([GH]\d+)/);
  return match ? match[1] : '';
}

function normalizeStrongsId(raw: string): string {
  // G0026 → G26, H0001 → H1
  const match = raw.match(/^([GH])(\d+)$/);
  if (!match) return raw;
  return match[1] + String(parseInt(match[2], 10));
}

function main() {
  console.log('BTB Lexicon Parser');
  console.log('==================');
  console.log(`BTB path: ${BTB_PATH}`);
  console.log(`Output:   ${OUTPUT_PATH}`);
  console.log('');

  // Verify BTB path exists
  if (!fs.existsSync(DEF_DIR)) {
    console.error(`ERROR: BTB lexicon not found at ${DEF_DIR}`);
    console.error('Clone the BTB repo first: git clone --depth 1 https://github.com/revjude/BTB.git /tmp/BTB');
    process.exit(1);
  }

  // Step 1: Build master list of Strong's IDs from DEF files
  // (DEF files are the most reliable source — every entry has one)
  const defFiles = fs.readdirSync(DEF_DIR)
    .filter(f => f.match(/^DEF\.[GH]\d+\.md$/))
    .sort();

  console.log(`Found ${defFiles.length} DEF files`);

  const entries: LexiconEntry[] = [];
  let parsed = 0;
  let skipped = 0;

  for (const defFile of defFiles) {
    const rawId = getStrongsNumber(defFile);
    if (!rawId) { skipped++; continue; }

    const id = normalizeStrongsId(rawId);
    const isGreek = rawId.startsWith('G');
    const language = isGreek ? 'Greek' : 'Hebrew';

    // Parse DEF
    const defData = parseDEF(path.join(DEF_DIR, defFile));
    if (!defData || !defData.word) { skipped++; continue; }

    // Parse supplementary sources
    let asText: string | null = null;
    let lsjText: string | null = null;
    let bdbText: string | null = null;

    if (isGreek) {
      asText = parseAS(path.join(AS_DIR, `AS.${rawId}.md`));
      lsjText = parseLSJ(path.join(LSJ_DIR, `LSJ.${rawId}.md`));
    } else {
      bdbText = parseBDB(path.join(BDB_DIR, `BDB.${rawId}.md`));
    }

    // Build definitions object
    const definitions: LexiconEntry['definitions'] = {
      strongs: defData.definitions || defData.gloss || '',
    };
    if (asText) definitions.abbottSmith = asText;
    if (lsjText) definitions.lsj = lsjText;
    if (bdbText) definitions.bdb = bdbText;

    // Build morphology
    const morphCode = defData.morphCode || (isGreek ? 'G:N' : 'H:N');
    const morphology = {
      code: morphCode,
      explanation: getMorphExplanation(morphCode),
    };

    // Build cross references from DEF
    const crossRefs = defData.crossRefs.map(r => {
      const normalized = normalizeStrongsId(r);
      return normalized;
    });

    const entry: LexiconEntry = {
      id,
      strongs: id,
      word: defData.word,
      transliteration: defData.transliteration || '',
      phonetic: defData.phonetic || '',
      language,
      pronunciation: defData.phonetic || '',
      colorCode: isGreek ? 'purple' : 'red',
      definitions,
      morphology,
      stats: { totalOccurrences: 0, mostFrequentBook: '', bookBreakdown: {} },
      synergy: { crossReferences: crossRefs, devotional: '', peopleAlsoAsked: [] },
      verseSample: [],
    };

    entries.push(entry);
    parsed++;

    if (parsed % 1000 === 0) {
      console.log(`  Parsed ${parsed} entries...`);
    }
  }

  // Sort by Strong's number: G before H, then numerically
  entries.sort((a, b) => {
    const aLang = a.id.charAt(0);
    const bLang = b.id.charAt(0);
    if (aLang !== bLang) return aLang === 'G' ? -1 : 1;
    const aNum = parseInt(a.id.substring(1), 10);
    const bNum = parseInt(b.id.substring(1), 10);
    return aNum - bNum;
  });

  console.log('');
  console.log(`Parsed: ${parsed} entries`);
  console.log(`Skipped: ${skipped} entries (no word found)`);

  // Count by type
  const greekCount = entries.filter(e => e.language === 'Greek').length;
  const hebrewCount = entries.filter(e => e.language === 'Hebrew').length;
  const withAS = entries.filter(e => e.definitions.abbottSmith).length;
  const withLSJ = entries.filter(e => e.definitions.lsj).length;
  const withBDB = entries.filter(e => e.definitions.bdb).length;
  const withCrossRefs = entries.filter(e => e.synergy.crossReferences.length > 0).length;

  console.log(`  Greek:  ${greekCount}`);
  console.log(`  Hebrew: ${hebrewCount}`);
  console.log(`  With Abbott-Smith: ${withAS}`);
  console.log(`  With LSJ:          ${withLSJ}`);
  console.log(`  With BDB:          ${withBDB}`);
  console.log(`  With cross-refs:   ${withCrossRefs}`);

  // Ensure output directory exists
  const outDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Write output
  const output = { entries };
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf-8');

  const fileSizeMB = (fs.statSync(OUTPUT_PATH).size / (1024 * 1024)).toFixed(1);
  console.log('');
  console.log(`Written to ${OUTPUT_PATH} (${fileSizeMB} MB)`);

  // Show sample entries
  console.log('');
  console.log('Sample entries:');
  const samples = [
    entries.find(e => e.id === 'G26'),   // agape
    entries.find(e => e.id === 'G25'),   // agapao
    entries.find(e => e.id === 'H1'),    // ab (father)
    entries.find(e => e.id === 'H7965'), // shalom
  ].filter(Boolean);

  for (const s of samples) {
    if (!s) continue;
    console.log(`  ${s.id}: ${s.word} (${s.transliteration}) - "${s.definitions.strongs.substring(0, 60)}..."`);
    if (s.definitions.abbottSmith) console.log(`    AS: ${s.definitions.abbottSmith.substring(0, 60)}...`);
    if (s.definitions.lsj) console.log(`    LSJ: ${s.definitions.lsj.substring(0, 60)}...`);
    if (s.definitions.bdb) console.log(`    BDB: ${s.definitions.bdb.substring(0, 60)}...`);
  }
}

main();
