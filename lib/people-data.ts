import fs from 'fs';
import path from 'path';

// ── Interfaces ──

export interface BiblePerson {
  id: string;
  name: string;
  surname: string;
  uniqueAttribute: string;
  sex: 'male' | 'female' | '';
  tribe: string;
  notes: string;
  nameInstance: number;
  sequence: number;
  slug: string;
  labels: PersonLabel[];
  relationships: PersonRelationship[];
}

export interface PersonLabel {
  labelId: string;
  labelName: string;
  meaningEn: string;
  meaningHe: string;
  meaningAr: string;
  hebrewTransliterated: string;
  hebrewStrongsNumber: string;
  greekLabel: string;
  greekTransliterated: string;
  greekMeaning: string;
  greekStrongsNumber: string;
  reference: string;
  labelType: string;
  givenByGod: boolean;
  labelNotes: string;
}

export interface PersonRelationship {
  otherPersonId: string;
  otherPersonName: string;
  relationshipType: string;
  relationshipSubtype: string;
  reference: string;
  notes: string;
}

// ── CSV Parser ──

function parseCSVLine(line: string): string[] {
  const row: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      row.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  row.push(current.trim());
  return row;
}

function splitCSVRows(text: string): string[] {
  const rows: string[] = [];
  const lines = text.split('\n');
  let currentRow = '';
  let inQuotes = false;

  for (const line of lines) {
    if (currentRow === '') {
      currentRow = line;
    } else {
      currentRow += '\n' + line;
    }

    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      }
    }

    if (!inQuotes) {
      const trimmed = currentRow.trim();
      if (trimmed.length > 0) {
        rows.push(trimmed);
      }
      currentRow = '';
    }
  }

  if (currentRow.trim().length > 0) {
    rows.push(currentRow.trim());
  }

  return rows;
}

function stripBOM(text: string): string {
  return text.charCodeAt(0) === 0xFEFF ? text.slice(1) : text;
}

// ── Caches ──

let _personCache: BiblePerson[] | null = null;
let _slugMap: Map<string, BiblePerson> | null = null;
let _idMap: Map<string, BiblePerson> | null = null;

// ── Raw types ──

interface RawRelationship {
  personId1: string;
  personId2: string;
  relationshipType: string;
  relationshipCategory: string;
  reference: string;
  notes: string;
}

// ── Data loaders ──

function loadLabels(): Map<string, PersonLabel[]> {
  const csvPath = path.join(process.cwd(), 'data', 'bible-data', 'BibleData-PersonLabel.csv');
  if (!fs.existsSync(csvPath)) return new Map();

  const csv = stripBOM(fs.readFileSync(csvPath, 'utf-8'));
  const rows = splitCSVRows(csv);

  const map = new Map<string, PersonLabel[]>();

  for (let i = 1; i < rows.length; i++) {
    const r = parseCSVLine(rows[i]);
    if (r.length < 2) continue;

    const personId = r[1] || '';
    if (!personId) continue;

    const label: PersonLabel = {
      labelId: r[0] || '',
      labelName: r[2] || '',
      meaningEn: r[5] || '',
      meaningHe: r[3] || '',
      meaningAr: r[7] || '',
      hebrewTransliterated: r[4] || '',
      hebrewStrongsNumber: r[6] || '',
      greekLabel: r[7] || '',
      greekTransliterated: r[8] || '',
      greekMeaning: r[9] || '',
      greekStrongsNumber: r[10] || '',
      reference: r[11] || '',
      labelType: r[12] || '',
      givenByGod: (r[13] || '').toUpperCase() === 'Y',
      labelNotes: r[14] || '',
    };

    if (!map.has(personId)) map.set(personId, []);
    map.get(personId)!.push(label);
  }

  return map;
}

function loadRelationships(): RawRelationship[] {
  const csvPath = path.join(process.cwd(), 'data', 'bible-data', 'BibleData-PersonRelationship.csv');
  if (!fs.existsSync(csvPath)) return [];

  const csv = stripBOM(fs.readFileSync(csvPath, 'utf-8'));
  const rows = splitCSVRows(csv);

  const rels: RawRelationship[] = [];

  for (let i = 1; i < rows.length; i++) {
    const r = parseCSVLine(rows[i]);
    if (r.length < 5) continue;

    rels.push({
      personId1: r[2] || '',
      personId2: r[4] || '',
      relationshipType: r[3] || '',
      relationshipCategory: r[5] || '',
      reference: r[6] || '',
      notes: r[7] || '',
    });
  }

  return rels;
}

// ── Slug generation ──

function makeSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ── Main loader ──

function loadAll(): BiblePerson[] {
  if (_personCache) return _personCache;

  const csvPath = path.join(process.cwd(), 'data', 'bible-data', 'BibleData-Person.csv');
  if (!fs.existsSync(csvPath)) return [];

  const csv = stripBOM(fs.readFileSync(csvPath, 'utf-8'));
  const rows = splitCSVRows(csv);

  const labelsMap = loadLabels();
  const rawRelationships = loadRelationships();

  // Build person_id -> name map for resolving relationship names
  const idToName = new Map<string, string>();
  for (let i = 1; i < rows.length; i++) {
    const r = parseCSVLine(rows[i]);
    if (r.length < 2) continue;
    idToName.set(r[0] || '', r[1] || '');
  }

  // Build relationships map
  const relsMap = new Map<string, PersonRelationship[]>();
  for (const raw of rawRelationships) {
    if (!raw.personId1) continue;

    const rel: PersonRelationship = {
      otherPersonId: raw.personId2,
      otherPersonName: idToName.get(raw.personId2) || raw.personId2,
      relationshipType: raw.relationshipType,
      relationshipSubtype: raw.relationshipCategory,
      reference: raw.reference,
      notes: raw.notes,
    };

    if (!relsMap.has(raw.personId1)) relsMap.set(raw.personId1, []);
    relsMap.get(raw.personId1)!.push(rel);
  }

  // Build BiblePerson objects
  const people: BiblePerson[] = [];

  for (let i = 1; i < rows.length; i++) {
    const r = parseCSVLine(rows[i]);
    if (r.length < 2) continue;

    const personId = r[0] || '';
    const name = r[1] || '';
    const nameInstance = parseInt(r[7], 10) || 1;
    const baseSlug = makeSlug(name);
    const slug = nameInstance > 1 ? `${baseSlug}-${nameInstance}` : baseSlug;

    const sexRaw = (r[4] || '').toLowerCase().trim();
    const sex: 'male' | 'female' | '' =
      sexRaw === 'male' ? 'male' :
      sexRaw === 'female' ? 'female' : '';

    people.push({
      id: personId,
      name,
      surname: r[2] || '',
      uniqueAttribute: r[3] || '',
      sex,
      tribe: r[5] || '',
      notes: r[6] || '',
      nameInstance,
      sequence: parseInt(r[8], 10) || 0,
      slug,
      labels: labelsMap.get(personId) || [],
      relationships: relsMap.get(personId) || [],
    });
  }

  _personCache = people;
  return people;
}

// ── Index builders ──

function buildSlugMap(): Map<string, BiblePerson> {
  if (_slugMap) return _slugMap;
  _slugMap = new Map();
  for (const p of loadAll()) {
    _slugMap.set(p.slug, p);
  }
  return _slugMap;
}

function buildIdMap(): Map<string, BiblePerson> {
  if (_idMap) return _idMap;
  _idMap = new Map();
  for (const p of loadAll()) {
    _idMap.set(p.id, p);
  }
  return _idMap;
}

// ── Public API ──

export function getAllPeople(): BiblePerson[] {
  return loadAll();
}

export function getPersonBySlug(slug: string): BiblePerson | undefined {
  return buildSlugMap().get(slug);
}

export function getPersonById(id: string): BiblePerson | undefined {
  return buildIdMap().get(id);
}

export function getPeopleByTribe(tribe: string): BiblePerson[] {
  const lower = tribe.toLowerCase();
  return loadAll().filter(p => p.tribe.toLowerCase() === lower);
}

export function getPeopleBySex(sex: string): BiblePerson[] {
  const lower = sex.toLowerCase();
  return loadAll().filter(p => p.sex === lower);
}

export function getAllTribes(): string[] {
  const tribes = new Set<string>();
  for (const p of loadAll()) {
    if (p.tribe) tribes.add(p.tribe);
  }
  return Array.from(tribes).sort();
}

export function getPeopleStats() {
  const all = loadAll();
  return {
    total: all.length,
    male: all.filter(p => p.sex === 'male').length,
    female: all.filter(p => p.sex === 'female').length,
    tribes: getAllTribes().length,
    withLabels: all.filter(p => p.labels.length > 0).length,
    withRelationships: all.filter(p => p.relationships.length > 0).length,
    totalLabels: all.reduce((sum, p) => sum + p.labels.length, 0),
    totalRelationships: all.reduce((sum, p) => sum + p.relationships.length, 0),
  };
}

export function searchPeople(query: string): BiblePerson[] {
  const lower = query.toLowerCase();
  return loadAll().filter(p =>
    p.name.toLowerCase().includes(lower) ||
    p.surname.toLowerCase().includes(lower) ||
    p.uniqueAttribute.toLowerCase().includes(lower) ||
    p.labels.some(l => l.labelName.toLowerCase().includes(lower))
  );
}
