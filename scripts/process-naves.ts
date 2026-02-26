/**
 * process-naves.ts
 *
 * Reads data/sword-modules/naves-raw.csv (columns: section, subject, entry)
 * and produces:
 *   - data/naves-topics.json   (full topic array)
 *   - data/naves-index.json    (summary / lookup indices)
 *
 * Run: npx tsx scripts/process-naves.ts
 */

import * as fs from "fs";
import * as path from "path";

// ---------------------------------------------------------------------------
// Book abbreviation map — SWORD module uses its own short forms
// ---------------------------------------------------------------------------

const BOOK_ABBREV: Record<string, string> = {
  GEN: "Genesis",
  EXO: "Exodus",
  LEV: "Leviticus",
  NUM: "Numbers",
  DEU: "Deuteronomy",
  JOS: "Joshua",
  JDG: "Judges",
  RUT: "Ruth",
  "1SA": "1 Samuel",
  "2SA": "2 Samuel",
  "1KI": "1 Kings",
  "2KI": "2 Kings",
  "1CH": "1 Chronicles",
  "2CH": "2 Chronicles",
  EZR: "Ezra",
  NEH: "Nehemiah",
  EST: "Esther",
  JOB: "Job",
  PSA: "Psalms",
  PRO: "Proverbs",
  ECC: "Ecclesiastes",
  SOL: "Song of Solomon",
  ISA: "Isaiah",
  JER: "Jeremiah",
  LAM: "Lamentations",
  EZE: "Ezekiel",
  DAN: "Daniel",
  HOS: "Hosea",
  JOE: "Joel",
  AMO: "Amos",
  OBA: "Obadiah",
  JON: "Jonah",
  MIC: "Micah",
  NAH: "Nahum",
  HAB: "Habakkuk",
  ZEP: "Zephaniah",
  HAG: "Haggai",
  ZEC: "Zechariah",
  MAL: "Malachi",
  MAT: "Matthew",
  MAR: "Mark",
  LUK: "Luke",
  JOH: "John",
  ACT: "Acts",
  ROM: "Romans",
  "1CO": "1 Corinthians",
  "2CO": "2 Corinthians",
  GAL: "Galatians",
  EPH: "Ephesians",
  PHP: "Philippians",
  COL: "Colossians",
  "1TH": "1 Thessalonians",
  "2TH": "2 Thessalonians",
  "1TI": "1 Timothy",
  "2TI": "2 Timothy",
  TIT: "Titus",
  PHM: "Philemon",
  HEB: "Hebrews",
  JAM: "James",
  "1PE": "1 Peter",
  "2PE": "2 Peter",
  "1JO": "1 John",
  "2JO": "2 John",
  "3JO": "3 John",
  JDE: "Jude",
  REV: "Revelation",

  // Alternate abbreviations actually found in the SWORD naves-raw.csv
  MRK: "Mark",
  JHN: "John",
  JAS: "James",
  EZK: "Ezekiel",
  JOL: "Joel",
  NAM: "Nahum",
  So: "Song of Solomon",
  Jude: "Jude",
  "1JN": "1 John",
  "2JN": "2 John",
  "3JN": "3 John",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SubTopic {
  title: string;
  verses: string[];
}

interface NavesTopic {
  slug: string;
  subject: string;
  section: string;
  subTopics: SubTopic[];
  relatedTopics: string[];
  totalVerses: number;
}

interface NavesIndex {
  totalTopics: number;
  totalVerseRefs: number;
  slugMap: Record<string, string>;
  letterIndex: Record<string, string[]>;
  topVerseCount: { slug: string; subject: string; totalVerses: number }[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Parse a CSV file where fields may be quoted with double-quotes and may
 * contain newlines inside the quotes. We handle this manually because
 * the standard line-by-line approach breaks on multi-line fields.
 */
function parseCSV(raw: string): Array<{ section: string; subject: string; entry: string }> {
  const rows: Array<{ section: string; subject: string; entry: string }> = [];

  // Skip the header line
  let idx = raw.indexOf("\n");
  if (idx === -1) return rows;
  idx++; // move past the newline

  while (idx < raw.length) {
    const row = readRow(raw, idx);
    if (!row) break;
    idx = row.nextIdx;
    if (row.fields.length >= 3) {
      rows.push({
        section: row.fields[0],
        subject: row.fields[1],
        entry: row.fields[2],
      });
    }
  }

  return rows;
}

function readRow(
  raw: string,
  start: number
): { fields: string[]; nextIdx: number } | null {
  if (start >= raw.length) return null;

  const fields: string[] = [];
  let idx = start;

  while (idx < raw.length) {
    if (raw[idx] === '"') {
      // Quoted field
      idx++; // skip opening quote
      let field = "";
      while (idx < raw.length) {
        if (raw[idx] === '"') {
          if (idx + 1 < raw.length && raw[idx + 1] === '"') {
            // Escaped quote
            field += '"';
            idx += 2;
          } else {
            // End of quoted field
            idx++; // skip closing quote
            break;
          }
        } else {
          field += raw[idx];
          idx++;
        }
      }
      fields.push(field);
      // Skip comma or newline after field
      if (idx < raw.length && raw[idx] === ",") {
        idx++;
      } else {
        // End of row — skip newline(s)
        while (idx < raw.length && (raw[idx] === "\r" || raw[idx] === "\n")) {
          idx++;
        }
        break;
      }
    } else {
      // Unquoted field — read until comma or newline
      let field = "";
      while (idx < raw.length && raw[idx] !== "," && raw[idx] !== "\n" && raw[idx] !== "\r") {
        field += raw[idx];
        idx++;
      }
      fields.push(field);
      if (idx < raw.length && raw[idx] === ",") {
        idx++;
      } else {
        // End of row
        while (idx < raw.length && (raw[idx] === "\r" || raw[idx] === "\n")) {
          idx++;
        }
        break;
      }
    }
  }

  return { fields, nextIdx: idx };
}

/**
 * Expand a verse reference like "EXO 6:16-20" to "Exodus 6:16-20".
 * Also handles "2SA  8:17" (extra spaces) and comma-separated chapters
 * within the same book reference.
 */
function expandVerseRef(ref: string): string | null {
  ref = ref.trim();
  if (!ref) return null;

  // Match: BOOK CHAPTER:VERSE(s) — book can be like "1SA", "GEN", "So", "Jude"
  const match = ref.match(/^(\d?[A-Za-z]+)\s+(.+)$/);
  if (!match) return null;

  const abbrev = match[1];
  const rest = match[2].trim();

  const fullName = BOOK_ABBREV[abbrev];
  if (!fullName) return null;

  return `${fullName} ${rest}`;
}

/**
 * Given a line of text (a sub-entry), extract all verse references.
 *
 * Verse references appear after the descriptive text and look like:
 *   EXO 6:16-20; JOS 21:4,10; 1CH 6:2,3; 23:13
 *
 * We need to handle "carry-over" chapter references where a semicolon
 * separates refs that share the same book, e.g. "1CH 6:2,3; 23:13"
 * means "1 Chronicles 6:2,3" AND "1 Chronicles 23:13".
 *
 * Strategy: find the first book abbreviation followed by a digit,
 * then parse everything after that as verse references.
 */
function extractVerseRefs(text: string): string[] {
  const refs: string[] = [];
  if (!text) return refs;

  // Build a regex alternation for all known abbreviations, longest first
  const abbrevs = Object.keys(BOOK_ABBREV).sort((a, b) => b.length - a.length);
  const abbrevPattern = abbrevs.map((a) => a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");

  // Find all book references with their verse portions.
  // Pattern: BOOK (spaces) DIGITS (the rest until the next book or semicolon)
  // We'll use a different approach: split on semicolons and track the current book.
  const refRegex = new RegExp(`(${abbrevPattern})\\s+(\\d[^;]*)`, "g");

  // First, find the start of verse references in the text.
  // Look for the first occurrence of a known book abbreviation followed by space+digit.
  const startRegex = new RegExp(`(?:^|\\s|;)(${abbrevPattern})\\s+\\d`);
  const startMatch = text.match(startRegex);
  if (!startMatch || startMatch.index === undefined) return refs;

  // Get the verse reference portion of the text
  const refText = text.substring(startMatch.index).trim();

  // Split on semicolons
  const parts = refText.split(";").map((p) => p.trim()).filter(Boolean);

  let currentBook: string | null = null;

  for (const part of parts) {
    // Check if this part starts with a book abbreviation
    const bookMatch = part.match(new RegExp(`^(${abbrevPattern})\\s+(.+)$`));

    if (bookMatch) {
      currentBook = bookMatch[1];
      const versePart = bookMatch[2].trim();
      const fullName = BOOK_ABBREV[currentBook];
      if (fullName && versePart) {
        refs.push(`${fullName} ${versePart}`);
      }
    } else if (currentBook) {
      // This is a continuation reference using the same book
      // e.g. "23:13" after "1CH 6:2,3; 23:13"
      // Or it could be just a chapter number like "24"
      const versePart = part.trim();
      if (versePart && /^\d/.test(versePart)) {
        const fullName = BOOK_ABBREV[currentBook];
        if (fullName) {
          refs.push(`${fullName} ${versePart}`);
        }
      }
    }
  }

  return refs;
}

/**
 * Extract "See TOPIC" references from entry text.
 */
function extractRelatedTopics(entryLines: string[]): string[] {
  const related: string[] = [];
  const seePattern = /[-\s]*See\s+(.+?)(?:"|$)/gi;

  for (const line of entryLines) {
    const trimmed = line.trim();
    // Match lines like "-See PRIEST, HIGH" or "     -See ACHBOR"
    if (/See\s+/i.test(trimmed)) {
      let match: RegExpExecArray | null;
      seePattern.lastIndex = 0;
      while ((match = seePattern.exec(trimmed)) !== null) {
        const topic = match[1]
          .trim()
          .replace(/[",;.]+$/, "")
          .trim();
        if (topic && !topic.match(/^\d/) && topic.length > 1) {
          related.push(topic);
        }
      }
    }
  }

  // Deduplicate
  return [...new Set(related)];
}

/**
 * Parse the entry text for a single topic into sub-topics.
 *
 * Entry text can be multi-line. Lines starting with "-" denote sub-topics.
 * Lines starting with "     -" (indented) are sub-sub-entries that belong
 * to the previous sub-topic.
 */
function parseEntry(
  entry: string
): { subTopics: SubTopic[]; relatedTopics: string[]; totalVerses: number } {
  const lines = entry.split("\n");
  const subTopics: SubTopic[] = [];
  let totalVerses = 0;

  // Track current sub-topic being built
  let currentTitle: string | null = null;
  let currentVerses: string[] = [];
  const allLines: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.replace(/^"/, "").replace(/"$/, "");
    allLines.push(line);

    const trimmed = line.trim();
    if (!trimmed) continue;

    // Check if this is a "See" only line
    if (/^-?\s*See\s+/i.test(trimmed) && !trimmed.match(/\d+:\d+/)) {
      // Pure "See TOPIC" reference, no verse data — still push previous sub-topic
      // (the See references are extracted separately)
      continue;
    }

    // Check if this is a parenthetical note like "-(A city in...)"
    if (/^-?\(/.test(trimmed) && !trimmed.match(/\d+:\d+/)) {
      // Descriptive note without verse references
      continue;
    }

    // Check if this is a new top-level sub-entry (starts with "-" but not indented)
    const isTopLevel = /^-[A-Z0-9]/.test(trimmed) || /^-[a-z]/.test(trimmed);
    const isIndented = /^\s+-/.test(line) && !line.startsWith("-");

    if (isTopLevel) {
      // Save previous sub-topic if it exists
      if (currentTitle !== null && (currentVerses.length > 0 || currentTitle)) {
        subTopics.push({ title: currentTitle, verses: [...currentVerses] });
        totalVerses += currentVerses.length;
      }

      // Extract title (text before verse references)
      const titleMatch = trimmed.match(
        /^-(.+?)(?:\s+(?:\d?[A-Za-z]{2,3}\s+\d)|$)/
      );
      currentTitle = titleMatch
        ? titleMatch[1].trim().replace(/,?\s*$/, "")
        : trimmed.replace(/^-/, "").trim();

      // Extract verses from this line
      currentVerses = extractVerseRefs(trimmed);
    } else if (isIndented) {
      // Sub-sub entry — append verses to current sub-topic
      // Or it could be a new indented sub-entry
      const indentedTitle = trimmed.match(
        /^-(.+?)(?:\s+(?:\d?[A-Za-z]{2,3}\s+\d)|$)/
      );
      if (indentedTitle) {
        // If we have a current title, save it first
        if (currentTitle !== null && currentVerses.length > 0) {
          subTopics.push({ title: currentTitle, verses: [...currentVerses] });
          totalVerses += currentVerses.length;
        }
        currentTitle = indentedTitle[1].trim().replace(/,?\s*$/, "");
        currentVerses = extractVerseRefs(trimmed);
      } else {
        // Just verse references continuing
        const moreVerses = extractVerseRefs(trimmed);
        currentVerses.push(...moreVerses);
      }
    } else {
      // Continuation line or unrecognized format
      const moreVerses = extractVerseRefs(trimmed);
      if (moreVerses.length > 0) {
        currentVerses.push(...moreVerses);
      }
    }
  }

  // Don't forget the last sub-topic
  if (currentTitle !== null) {
    subTopics.push({ title: currentTitle, verses: [...currentVerses] });
    totalVerses += currentVerses.length;
  }

  // If there are no sub-topics but there are verses in the raw text,
  // create a single "General" sub-topic
  if (subTopics.length === 0) {
    const allVersesFromEntry = extractVerseRefs(entry.replace(/"/g, ""));
    if (allVersesFromEntry.length > 0) {
      subTopics.push({ title: "General", verses: allVersesFromEntry });
      totalVerses = allVersesFromEntry.length;
    }
  }

  const relatedTopics = extractRelatedTopics(allLines.length > 0 ? allLines : lines);

  return { subTopics, relatedTopics, totalVerses };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const rootDir = path.resolve(__dirname, "..");
  const csvPath = path.join(rootDir, "data", "sword-modules", "naves-raw.csv");
  const topicsOutPath = path.join(rootDir, "data", "naves-topics.json");
  const indexOutPath = path.join(rootDir, "data", "naves-index.json");

  console.log("Reading CSV...");
  const rawCSV = fs.readFileSync(csvPath, "utf-8");

  console.log("Parsing CSV rows...");
  const rows = parseCSV(rawCSV);
  console.log(`  Parsed ${rows.length} CSV rows`);

  // Group rows by subject (multi-line entries have already been joined by the
  // CSV parser when they are in a quoted field, but some topics span multiple
  // CSV rows with the same section+subject — we should merge those).
  // Actually, looking at the data, each row is one line of the entry, and
  // multi-line entries are stored as one quoted field. So each row is a
  // distinct topic already — but let's group just in case.

  const topicMap = new Map<
    string,
    { section: string; subject: string; entries: string[] }
  >();

  for (const row of rows) {
    const key = `${row.section}|||${row.subject}`;
    if (!topicMap.has(key)) {
      topicMap.set(key, {
        section: row.section,
        subject: row.subject,
        entries: [],
      });
    }
    topicMap.get(key)!.entries.push(row.entry);
  }

  console.log(`  Merged into ${topicMap.size} unique topics`);

  // Process each topic
  const topics: NavesTopic[] = [];
  let grandTotalVerses = 0;

  // Track slug collisions
  const slugCounts = new Map<string, number>();

  for (const [, data] of topicMap) {
    const combinedEntry = data.entries.join("\n");
    const { subTopics, relatedTopics, totalVerses } = parseEntry(combinedEntry);

    let slug = slugify(data.subject);
    if (!slug) slug = "unknown";

    // Handle slug collisions
    const count = slugCounts.get(slug) || 0;
    slugCounts.set(slug, count + 1);
    if (count > 0) {
      slug = `${slug}-${count + 1}`;
    }

    topics.push({
      slug,
      subject: data.subject,
      section: data.section,
      subTopics,
      relatedTopics,
      totalVerses,
    });

    grandTotalVerses += totalVerses;
  }

  // Sort topics alphabetically by subject
  topics.sort((a, b) => a.subject.localeCompare(b.subject));

  // Build index
  const slugMap: Record<string, string> = {};
  const letterIndex: Record<string, string[]> = {};

  for (const topic of topics) {
    slugMap[topic.slug] = topic.subject;

    const letter = topic.section.toUpperCase();
    if (!letterIndex[letter]) {
      letterIndex[letter] = [];
    }
    letterIndex[letter].push(topic.slug);
  }

  // Top 50 by verse count
  const topVerseCount = [...topics]
    .sort((a, b) => b.totalVerses - a.totalVerses)
    .slice(0, 50)
    .map((t) => ({
      slug: t.slug,
      subject: t.subject,
      totalVerses: t.totalVerses,
    }));

  const index: NavesIndex = {
    totalTopics: topics.length,
    totalVerseRefs: grandTotalVerses,
    slugMap,
    letterIndex,
    topVerseCount,
  };

  // Write output files
  console.log(`\nWriting ${topicsOutPath}...`);
  fs.writeFileSync(topicsOutPath, JSON.stringify(topics, null, 2), "utf-8");

  console.log(`Writing ${indexOutPath}...`);
  fs.writeFileSync(indexOutPath, JSON.stringify(index, null, 2), "utf-8");

  // Report
  console.log("\n--- Results ---");
  console.log(`Total topics:          ${topics.length}`);
  console.log(`Total verse references: ${grandTotalVerses}`);
  console.log(`Letter sections:       ${Object.keys(letterIndex).length}`);
  console.log(`\nTop 10 topics by verse count:`);
  for (const t of topVerseCount.slice(0, 10)) {
    console.log(`  ${t.subject.padEnd(30)} ${t.totalVerses} refs`);
  }
  console.log("\nDone.");
}

main();
