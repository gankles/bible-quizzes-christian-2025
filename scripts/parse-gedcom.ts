#!/usr/bin/env npx tsx
/**
 * Parses data/kjvstudy/static/adameve.ged (kjvstudy.org's biblical genealogy
 * GEDCOM export, ~479 individuals / 207 families) into JSON for the
 * /family-tree feature. Only the small subset of GEDCOM tags this specific
 * file uses is handled (INDI/NAME/SEX/FAMS/FAMC/NOTE with CONC/CONT,
 * FAM/HUSB/WIFE/CHIL) - no general-purpose GEDCOM library needed.
 *
 * Usage: npx tsx scripts/parse-gedcom.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const SOURCE_FILE = path.resolve(SCRIPT_DIR, '..', 'data', 'kjvstudy', 'static', 'adameve.ged');
const OUTPUT_DIR = path.resolve(SCRIPT_DIR, '..', 'data', 'family-tree');

interface Person {
  id: string;
  name: string;
  sex: 'M' | 'F' | '';
  note: string;
  verseRefs: Array<{ book: string; chapter: number; verse: number; label: string }>;
  famc?: string;
  fams: string[];
}

interface Family {
  id: string;
  husb?: string;
  wife?: string;
  chil: string[];
}

// Abbreviations actually used in this file's NOTE text, mapped to our site's book slugs.
const BOOK_ABBR: Record<string, string> = {
  'gen': 'genesis',
  'exo': 'exodus',
  'ruth': 'ruth',
  '1 chr': '1-chronicles',
  '2 ki': '2-kings',
  'luke': 'luke',
  'mat': 'matthew',
};

function extractVerseRefs(note: string): Person['verseRefs'] {
  const refs: Person['verseRefs'] = [];
  const regex = /(?:(\d)\s+)?([A-Za-z]+)\.?\s+(\d+):(\d+)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(note)) !== null) {
    const abbr = (match[1] ? `${match[1]} ` : '') + match[2].toLowerCase();
    const book = BOOK_ABBR[abbr];
    if (!book) continue;
    refs.push({
      book,
      chapter: parseInt(match[3], 10),
      verse: parseInt(match[4], 10),
      label: match[0].trim(),
    });
  }
  return refs;
}

function parseGedcom(raw: string): { people: Person[]; families: Family[] } {
  const lines = raw.split(/\r?\n/).map(l => l.replace(/^﻿/, ''));
  const people: Record<string, Person> = {};
  const families: Record<string, Family> = {};

  let currentType: 'INDI' | 'FAM' | null = null;
  let currentId = '';
  let inNote = false;

  const lineRe = /^(\d+)\s+(?:(@[^@]+@)\s+)?(\S+)(?:\s(.*))?$/;

  for (const line of lines) {
    if (!line.trim()) continue;
    const m = line.match(lineRe);
    if (!m) continue;
    const level = parseInt(m[1], 10);
    const xref = m[2];
    const tag = m[3];
    const value = m[4] ?? '';

    if (level === 0) {
      inNote = false;
      if (tag === 'INDI' && xref) {
        currentType = 'INDI';
        currentId = xref;
        people[currentId] = { id: currentId, name: '', sex: '', note: '', verseRefs: [], fams: [] };
      } else if (tag === 'FAM' && xref) {
        currentType = 'FAM';
        currentId = xref;
        families[currentId] = { id: currentId, chil: [] };
      } else {
        currentType = null;
      }
      continue;
    }

    if (level === 1) {
      inNote = false;
      if (currentType === 'INDI') {
        const person = people[currentId];
        if (tag === 'NAME') person.name = value.replace(/\//g, '').trim();
        else if (tag === 'SEX') person.sex = value === 'M' || value === 'F' ? value : '';
        else if (tag === 'FAMS') person.fams.push(value);
        else if (tag === 'FAMC') person.famc = value;
        else if (tag === 'NOTE') { inNote = true; person.note = value; }
      } else if (currentType === 'FAM') {
        const family = families[currentId];
        if (tag === 'HUSB') family.husb = value;
        else if (tag === 'WIFE') family.wife = value;
        else if (tag === 'CHIL') family.chil.push(value);
      }
      continue;
    }

    if (level >= 2 && inNote && currentType === 'INDI' && (tag === 'CONT' || tag === 'CONC')) {
      const sep = tag === 'CONT' ? '\n' : '';
      people[currentId].note += sep + value;
    }
  }

  for (const person of Object.values(people)) {
    person.verseRefs = extractVerseRefs(person.note);
  }

  return { people: Object.values(people), families: Object.values(families) };
}

function main(): void {
  const raw = fs.readFileSync(SOURCE_FILE, 'utf-8');
  const { people, families } = parseGedcom(raw);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  fs.writeFileSync(path.join(OUTPUT_DIR, 'people.json'), JSON.stringify(people, null, 2), 'utf-8');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'families.json'), JSON.stringify(families, null, 2), 'utf-8');

  console.log(`Parsed ${people.length} people, ${families.length} families.`);
  console.log(`Wrote ${path.join(OUTPUT_DIR, 'people.json')}`);
  console.log(`Wrote ${path.join(OUTPUT_DIR, 'families.json')}`);
}

main();
