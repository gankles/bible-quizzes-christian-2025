/**
 * Deterministic enrichment joins for /bible-places/[slug] pages: etymology (lexicon),
 * commentary (MHCC/Ellicott/JFB), and related people (family-tree). No AI involved —
 * every fact shown is a direct lookup against existing repo data, so nothing here can
 * invent a meaning, quote, or relationship that isn't already in the source files.
 */

import fs from 'fs';
import path from 'path';
import type { VerseRef } from './geocoding-data';
import { getAllPeople } from './family-tree';

const DATA_DIR = path.join(process.cwd(), 'data');

// ============================================================================
// Etymology (Strong's Concordance name match)
// ============================================================================

export interface PlaceEtymologyMatch {
  strongs: string;
  language: string;
  word: string;
  transliteration: string;
  meaning: string | null; // e.g. "wandering", from a `Name = "meaning"` gloss line, if present
  description: string; // fuller descriptive line, e.g. "Nod, the land of Cain"
}

let _etymologyIndex: Map<string, PlaceEtymologyMatch[]> | null = null;

// Strong's proper-noun definitions conventionally open with the English name as its own
// line, e.g. "Nod.\n- § Nod = \"\"wandering\"\n- Nod, the land of Cain\n...". The source
// data has a stray doubled quote on the meaning line, which we normalize away.
function firstDefinitionLine(strongsDef: string | undefined): string | null {
  if (!strongsDef) return null;
  const first = strongsDef.split('\n')[0].trim().replace(/\.$/, '').trim();
  return first || null;
}

// Restrict to short Title-Case name candidates so we don't match common-noun glosses.
const PROPER_NOUN_RE = /^[A-Z][a-zA-Z'-]*(\s[A-Z][a-zA-Z'-]*){0,3}$/;

function buildEtymologyIndex(): Map<string, PlaceEtymologyMatch[]> {
  const index = new Map<string, PlaceEtymologyMatch[]>();
  const filePath = path.join(DATA_DIR, 'lexicon.json');
  const { entries } = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as {
    entries: Array<{
      strongs: string; word: string; transliteration: string; language: string;
      definitions: { strongs?: string };
    }>;
  };

  for (const entry of entries) {
    const name = firstDefinitionLine(entry.definitions?.strongs);
    if (!name || !PROPER_NOUN_RE.test(name)) continue;

    const lines = (entry.definitions.strongs || '').split('\n').map(l => l.trim());
    const meaningLine = lines[1]?.replace(/^-\s*§?\s*/, '').replace(/"+/g, '"') || '';
    const meaningMatch = meaningLine.match(/=\s*"([^"]+)"/);
    const meaning = meaningMatch ? meaningMatch[1] : null;
    // If line 1 carried a meaning, the description is line 2; otherwise line 1 IS the description.
    const descriptionLine = meaning ? lines[2] : lines[1];
    const description = (descriptionLine || '').replace(/^-\s*§?\s*/, '').trim() || name;

    const match: PlaceEtymologyMatch = {
      strongs: entry.strongs,
      language: entry.language,
      word: entry.word,
      transliteration: entry.transliteration,
      meaning,
      description,
    };
    const key = name.toLowerCase();
    const bucket = index.get(key);
    if (bucket) bucket.push(match);
    else index.set(key, [match]);
  }
  return index;
}

/** Returns all Strong's entries whose proper-noun gloss exactly matches this place's name. */
export function getPlaceEtymology(placeName: string): PlaceEtymologyMatch[] {
  if (!_etymologyIndex) _etymologyIndex = buildEtymologyIndex();
  return _etymologyIndex.get(placeName.toLowerCase()) || [];
}

// ============================================================================
// Commentary (direct verse-ref lookup, verbatim quotes only)
// ============================================================================

export interface PlaceCommentaryQuote {
  source: 'MHCC' | 'Ellicott';
  sourceName: string;
  bookSlug: string;
  chapter: number;
  verse: number;
  readable: string;
  text: string;
}

// JFB is intentionally excluded: its verse-ref keys are shifted against their own content
// (e.g. the "genesis-4-16" entry is actually commentary on verse 9), so it can't be trusted
// for an exact-ref join without misattributing a quote to the wrong verse.
const COMMENTARY_SOURCES: Array<{ file: string; source: PlaceCommentaryQuote['source']; sourceName: string }> = [
  { file: 'mhcc.json', source: 'MHCC', sourceName: "Matthew Henry's Concise Commentary" },
  { file: 'ellicott.json', source: 'Ellicott', sourceName: "Ellicott's Commentary for English Readers" },
];

let _commentaryCache: Record<string, Record<string, string>> | null = null;

function loadCommentaries(): Record<string, Record<string, string>> {
  if (_commentaryCache) return _commentaryCache;
  _commentaryCache = {};
  for (const { file, source } of COMMENTARY_SOURCES) {
    try {
      _commentaryCache[source] = JSON.parse(
        fs.readFileSync(path.join(DATA_DIR, 'commentaries', file), 'utf-8')
      );
    } catch {
      _commentaryCache[source] = {};
    }
  }
  return _commentaryCache;
}

/** For each commentary source, returns the first verse (in the place's own verse order) that has an entry. */
export function getPlaceCommentary(verses: VerseRef[]): PlaceCommentaryQuote[] {
  const commentaries = loadCommentaries();
  const results: PlaceCommentaryQuote[] = [];
  for (const { source, sourceName } of COMMENTARY_SOURCES) {
    const byRef = commentaries[source];
    for (const v of verses) {
      const text = byRef[v.ref];
      if (text) {
        results.push({
          source, sourceName, text,
          bookSlug: v.bookSlug, chapter: v.chapter, verse: v.verse, readable: v.readable,
        });
        break;
      }
    }
  }
  return results;
}

// ============================================================================
// Related people (shared verse-ref join against the family tree)
// ============================================================================

export interface RelatedPerson {
  slug: string;
  name: string;
  ref: string;
  readable: string;
}

let _personVerseIndex: Map<string, Array<{ slug: string; name: string }>> | null = null;

function buildPersonVerseIndex(): Map<string, Array<{ slug: string; name: string }>> {
  const index = new Map<string, Array<{ slug: string; name: string }>>();
  for (const person of getAllPeople()) {
    for (const v of person.verseRefs) {
      const key = `${v.book}-${v.chapter}-${v.verse}`;
      const entry = { slug: person.slug, name: person.name };
      const bucket = index.get(key);
      if (bucket) bucket.push(entry);
      else index.set(key, [entry]);
    }
  }
  return index;
}

/** Finds family-tree people whose own verse citations overlap with this place's verses. */
export function getPlaceRelatedPeople(verses: VerseRef[]): RelatedPerson[] {
  if (!_personVerseIndex) _personVerseIndex = buildPersonVerseIndex();
  const seen = new Map<string, RelatedPerson>();
  for (const v of verses) {
    const people = _personVerseIndex.get(v.ref);
    if (!people) continue;
    for (const person of people) {
      if (!seen.has(person.slug)) {
        seen.set(person.slug, { slug: person.slug, name: person.name, ref: v.ref, readable: v.readable });
      }
    }
  }
  return Array.from(seen.values());
}
