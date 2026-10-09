import fs from 'fs';
import path from 'path';

export interface VerseRef {
  book: string;
  chapter: number;
  verse: number;
  label: string;
}

export interface FamilyTreePerson {
  id: string;
  slug: string;
  name: string;
  sex: 'M' | 'F' | '';
  verseRefs: VerseRef[];
  famc?: string;
  fams: string[];
}

interface Family {
  id: string;
  husb?: string;
  wife?: string;
  chil: string[];
}

interface RawPerson {
  id: string;
  name: string;
  sex: 'M' | 'F' | '';
  note: string;
  verseRefs: VerseRef[];
  famc?: string;
  fams: string[];
}

export interface PersonRelations {
  parents: FamilyTreePerson[];
  spouses: FamilyTreePerson[];
  children: FamilyTreePerson[];
}

function slugify(name: string, id: string): string {
  const base = name
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .split(/\s+or\s+/)[0]
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const num = id.replace(/[^0-9]/g, '');
  return `${base || 'person'}-${num}`;
}

interface Store {
  people: FamilyTreePerson[];
  families: Family[];
  bySlug: Map<string, FamilyTreePerson>;
  byId: Map<string, FamilyTreePerson>;
}

let cache: Store | null = null;

function load(): Store {
  if (cache) return cache;
  const dir = path.join(process.cwd(), 'data', 'family-tree');
  const rawPeople: RawPerson[] = JSON.parse(fs.readFileSync(path.join(dir, 'people.json'), 'utf-8'));
  const families: Family[] = JSON.parse(fs.readFileSync(path.join(dir, 'families.json'), 'utf-8'));

  const people: FamilyTreePerson[] = rawPeople.map(p => ({
    id: p.id,
    slug: slugify(p.name, p.id),
    name: p.name,
    sex: p.sex,
    verseRefs: p.verseRefs,
    famc: p.famc,
    fams: p.fams,
  }));

  const bySlug = new Map(people.map(p => [p.slug, p]));
  const byId = new Map(people.map(p => [p.id, p]));

  cache = { people, families, bySlug, byId };
  return cache;
}

export function getAllPeople(): FamilyTreePerson[] {
  return load().people;
}

export function getPersonBySlug(slug: string): FamilyTreePerson | null {
  return load().bySlug.get(slug) ?? null;
}

export function getRelations(person: FamilyTreePerson): PersonRelations {
  const { byId, families } = load();

  const parents: FamilyTreePerson[] = [];
  if (person.famc) {
    const fam = families.find(f => f.id === person.famc);
    if (fam) {
      if (fam.husb) {
        const p = byId.get(fam.husb);
        if (p) parents.push(p);
      }
      if (fam.wife) {
        const p = byId.get(fam.wife);
        if (p) parents.push(p);
      }
    }
  }

  const spouses: FamilyTreePerson[] = [];
  const children: FamilyTreePerson[] = [];
  for (const famId of person.fams) {
    const fam = families.find(f => f.id === famId);
    if (!fam) continue;
    const spouseId = fam.husb === person.id ? fam.wife : fam.husb;
    if (spouseId) {
      const sp = byId.get(spouseId);
      if (sp) spouses.push(sp);
    }
    for (const chId of fam.chil) {
      const ch = byId.get(chId);
      if (ch) children.push(ch);
    }
  }

  return { parents, spouses, children };
}

/** Curated starting points for the family-tree index — well-known lineages worth surfacing. */
export const NOTABLE_LINEAGE_NAMES = [
  'Adam',
  'Noah or Noe',
  'Shem',
  'Abram or Abraham',
  'Isaac',
  'Jacob or Israel',
  'Juda or Judah or Judas',
  'Booz or Boaz',
  'Jesse',
  'David',
  'Solomon',
  'Joseph',
  'Mary',
];

/** Matches an encyclopedia/character entry title (e.g. "Noah") against family-tree names, which may store alternate spellings as "Noah or Noe". */
export function findPersonByName(name: string): FamilyTreePerson | null {
  const { people } = load();
  const target = name.trim().toLowerCase();
  for (const p of people) {
    const parts = p.name.toLowerCase().split(/\s+or\s+/);
    if (parts.includes(target)) return p;
  }
  return null;
}

export function getNotableLineagePeople(): FamilyTreePerson[] {
  const { people } = load();
  const result: FamilyTreePerson[] = [];
  for (const name of NOTABLE_LINEAGE_NAMES) {
    const match = people.find(p => p.name === name);
    if (match) result.push(match);
  }
  return result;
}
