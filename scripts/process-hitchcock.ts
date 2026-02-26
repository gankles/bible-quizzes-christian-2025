/**
 * process-hitchcock.ts
 *
 * Reads hitchcock-raw.csv (Name,Meaning) and produces:
 *   - data/hitchcock-names.json   — full array of name objects
 *   - data/hitchcock-index.json   — letter index + prefix groups
 *
 * Run: npx tsx scripts/process-hitchcock.ts
 */

import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HitchcockName {
  slug: string;
  name: string;
  meanings: string[];
  firstLetter: string;
  namePrefix: string;
}

interface LetterEntry {
  slug: string;
  name: string;
}

interface PrefixEntry {
  slug: string;
  name: string;
  meanings: string[];
}

interface HitchcockIndex {
  totalNames: number;
  letterIndex: Record<string, LetterEntry[]>;
  prefixGroups: Record<string, PrefixEntry[]>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert a name to a URL-friendly kebab-case slug. */
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, "")       // remove apostrophes / curly quotes
    .replace(/[^a-z0-9]+/g, "-") // non-alphanumeric → hyphen
    .replace(/^-+|-+$/g, "");    // trim leading/trailing hyphens
}

/**
 * Derive a prefix of 3 characters (or the full name when shorter).
 * Hyphens are included so "Abel-beth-maachah" → "Abe", not broken at hyphen.
 */
function namePrefix(name: string): string {
  // Use first 3 alpha characters (ignore hyphens for prefix extraction)
  const alphaOnly = name.replace(/[^A-Za-z]/g, "");
  const prefix = alphaOnly.slice(0, 3);
  // Capitalise first letter, lowercase rest for consistent grouping
  return prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase();
}

/**
 * Parse a single CSV line that may contain a quoted Meaning field.
 * Returns [name, rawMeaning] or null for blank / header lines.
 */
function parseCsvLine(line: string): [string, string] | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("Name,")) return null; // header or blank

  // Find the first comma that separates Name from Meaning
  const firstComma = trimmed.indexOf(",");
  if (firstComma === -1) return null;

  const name = trimmed.slice(0, firstComma).trim();
  let meaning = trimmed.slice(firstComma + 1).trim();

  // Strip surrounding quotes if present
  if (meaning.startsWith('"') && meaning.endsWith('"')) {
    meaning = meaning.slice(1, -1);
  }

  if (!name) return null;
  return [name, meaning];
}

/**
 * Split a meaning string on semicolons, trimming each part.
 * Handles cases like "a teacher; lofty; mountain of strength".
 */
function splitMeanings(raw: string): string[] {
  return raw
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const rootDir = path.resolve(__dirname, "..");
  const csvPath = path.join(rootDir, "data", "sword-modules", "hitchcock-raw.csv");
  const outNamesPath = path.join(rootDir, "data", "hitchcock-names.json");
  const outIndexPath = path.join(rootDir, "data", "hitchcock-index.json");

  // 1. Read & parse CSV -------------------------------------------------------
  const raw = fs.readFileSync(csvPath, "utf-8");
  const lines = raw.split(/\r?\n/);

  const names: HitchcockName[] = [];

  for (const line of lines) {
    const parsed = parseCsvLine(line);
    if (!parsed) continue;

    const [nameStr, meaningStr] = parsed;
    const meanings = splitMeanings(meaningStr);

    names.push({
      slug: toSlug(nameStr),
      name: nameStr,
      meanings,
      firstLetter: nameStr.charAt(0).toUpperCase(),
      namePrefix: namePrefix(nameStr),
    });
  }

  // Sort alphabetically by name
  names.sort((a, b) => a.name.localeCompare(b.name));

  // 2. Build letter index -----------------------------------------------------
  const letterIndex: Record<string, LetterEntry[]> = {};
  for (const n of names) {
    if (!letterIndex[n.firstLetter]) {
      letterIndex[n.firstLetter] = [];
    }
    letterIndex[n.firstLetter].push({ slug: n.slug, name: n.name });
  }

  // 3. Build prefix groups ----------------------------------------------------
  const prefixGroups: Record<string, PrefixEntry[]> = {};
  for (const n of names) {
    if (!prefixGroups[n.namePrefix]) {
      prefixGroups[n.namePrefix] = [];
    }
    prefixGroups[n.namePrefix].push({
      slug: n.slug,
      name: n.name,
      meanings: n.meanings,
    });
  }

  // 4. Assemble index ---------------------------------------------------------
  const index: HitchcockIndex = {
    totalNames: names.length,
    letterIndex,
    prefixGroups,
  };

  // 5. Write outputs ----------------------------------------------------------
  fs.writeFileSync(outNamesPath, JSON.stringify(names, null, 2), "utf-8");
  fs.writeFileSync(outIndexPath, JSON.stringify(index, null, 2), "utf-8");

  // 6. Report -----------------------------------------------------------------
  console.log(`\n=== Hitchcock Bible Names Processing Complete ===\n`);
  console.log(`Total names: ${names.length}`);
  console.log(`Output: ${outNamesPath}`);
  console.log(`Output: ${outIndexPath}\n`);

  console.log(`Letter distribution:`);
  const sortedLetters = Object.keys(letterIndex).sort();
  for (const letter of sortedLetters) {
    const count = letterIndex[letter].length;
    const bar = "#".repeat(Math.ceil(count / 5));
    console.log(`  ${letter}: ${String(count).padStart(4)} ${bar}`);
  }

  console.log(`\nPrefix groups: ${Object.keys(prefixGroups).length}`);

  // Show top 10 largest prefix groups
  const sortedPrefixes = Object.entries(prefixGroups)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 10);
  console.log(`Top 10 prefix groups:`);
  for (const [prefix, entries] of sortedPrefixes) {
    console.log(`  ${prefix}: ${entries.length} names`);
  }
}

main();
