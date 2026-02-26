/**
 * Bible Encyclopedia Data Library
 *
 * Combines multiple data sources into ISBE-style encyclopedia entries:
 * - Nave's Topics (topical entries with verses)
 * - Hitchcock Names (etymologies)
 * - Characters (biographical data)
 * - Topics (definitions and categories)
 */

import fs from 'fs';
import path from 'path';

// ── Types ──

export type EntryType = 'person' | 'place' | 'topic' | 'concept';

export interface EncyclopediaEntry {
  slug: string;
  title: string;
  type: EntryType;
  section: string;         // first letter

  // From Hitchcock
  etymology: string[] | null;

  // From Topics
  category: string | null;
  definition: string | null;
  description: string | null;
  keywords: string[];

  // From Nave's
  subTopics: { title: string; verses: string[] }[];
  navesRelatedTopics: string[];
  navesVerseCount: number;

  // From Characters
  character: {
    biography: string;
    significance: string;
    testament: string;
    occupation: string;
    lifespan: string;
    verseRefs: string[];
    timeline: { date: string; event: string; verses: string; significance: string }[];
    relationships: { person: string; relationship: string }[];
  } | null;

  // Computed
  booksReferenced: string[];
  totalVerseRefs: number;
  hasOldTestament: boolean;
  hasNewTestament: boolean;
  relatedSlugs: string[];
}

export interface EncyclopediaStats {
  totalEntries: number;
  people: number;
  places: number;
  topics: number;
  concepts: number;
  withEtymology: number;
  withCharacterData: number;
  withNavesData: number;
  sections: { letter: string; count: number }[];
}

// ── Bible Book Classification ──

const OT_BOOKS = new Set([
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
  'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms',
  'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah',
  'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel',
  'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah',
  'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai',
  'Zechariah', 'Malachi',
]);

const NT_BOOKS = new Set([
  'Matthew', 'Mark', 'Luke', 'John', 'Acts',
  'Romans', '1 Corinthians', '2 Corinthians', 'Galatians',
  'Ephesians', 'Philippians', 'Colossians',
  '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', 'Titus', 'Philemon',
  'Hebrews', 'James', '1 Peter', '2 Peter',
  '1 John', '2 John', '3 John', 'Jude', 'Revelation',
]);

// Keywords that indicate a place entry
const PLACE_KEYWORDS = [
  'city', 'cities', 'land', 'country', 'mountain', 'river', 'sea',
  'valley', 'wilderness', 'desert', 'region', 'province', 'kingdom',
  'village', 'town', 'plain', 'hill', 'island', 'lake', 'brook',
  'gate', 'pool', 'well', 'spring', 'territory', 'border',
];

// Keywords that indicate a person entry
const PERSON_KEYWORDS = [
  'son of', 'daughter of', 'father of', 'mother of', 'wife of',
  'husband of', 'king of', 'prophet', 'priest', 'apostle',
  'disciple', 'judge of', 'ruler', 'servant',
];

// ── Raw JSON types ──

interface NaveTopicJSON {
  slug: string;
  subject: string;
  section: string;
  subTopics: { title: string; verses: string[] }[];
  relatedTopics: string[];
  totalVerses: number;
}

interface HitchcockJSON {
  slug: string;
  name: string;
  meanings: string[];
  firstLetter: string;
  namePrefix: string;
}

interface CharacterJSON {
  name: string;
  slug: string;
  testament: string;
  biography: string;
  significance: string;
  verseRefs: string[];
  occupation: string;
  lifespan: string;
  timeline: { date: string; event: string; verses: string; significance: string }[];
  relationships: { person: string; relationship: string }[];
  keywords: string[];
}

interface TopicJSON {
  name: string;
  slug: string;
  category: string;
  description: string;
  definition: string;
  verseRefs: string[];
  verseCount: number;
  subtopics: string[];
  relatedTopics: string[];
  keywords: string[];
}

// ── Helpers ──

function extractBookFromVerse(verseRef: string): string | null {
  const match = verseRef.match(/^(.+?)\s+\d/);
  return match ? match[1] : null;
}

function extractBooksFromVerseRefs(refs: string[]): string[] {
  const books = new Set<string>();
  for (const ref of refs) {
    const book = extractBookFromVerse(ref);
    if (book) books.add(book);
  }
  return [...books];
}

// Known place names that Hitchcock classifies as names but are actually places
const KNOWN_PLACES = new Set([
  'jerusalem', 'bethlehem', 'nazareth', 'egypt', 'babylon', 'zion',
  'samaria', 'galilee', 'jordan', 'sinai', 'canaan', 'hebron',
  'jericho', 'bethel', 'shiloh', 'gilgal', 'gilead', 'moab',
  'edom', 'ammon', 'damascus', 'tyre', 'sidon', 'nineveh',
  'sodom', 'gomorrah', 'antioch', 'corinth', 'ephesus', 'rome',
  'philippi', 'thessalonica', 'galatia', 'colossae', 'patmos',
  'ararat', 'carmel', 'hermon', 'tabor', 'olivet', 'calvary',
  'gethsemane', 'eden', 'beersheba', 'caesarea', 'capernaum',
  'cana', 'bethany', 'emmaus', 'joppa', 'lydda', 'sharon',
  'lebanon', 'mesopotamia', 'persia', 'assyria', 'media',
  'macedonia', 'achaia', 'crete', 'cyprus', 'malta',
]);

function classifyEntryType(
  slug: string,
  hitchcock: HitchcockJSON | undefined,
  character: CharacterJSON | undefined,
  topic: TopicJSON | undefined,
  naves: NaveTopicJSON | undefined
): EntryType {
  // Character data always means person
  if (character) return 'person';

  // Known places override
  if (KNOWN_PLACES.has(slug)) return 'place';

  // Check Nave's sub-topics for place indicators first (more reliable than Hitchcock)
  if (naves) {
    const allText = naves.subTopics.map(st => st.title).join(' ').toLowerCase();
    const navesSubject = naves.subject.toLowerCase();

    // Check if subject itself mentions geographic terms
    const subjectIsPlace = PLACE_KEYWORDS.some(kw => navesSubject.includes(kw));
    if (subjectIsPlace) return 'place';

    // Check sub-topic text for place-defining patterns
    const placePatterns = [
      'captured', 'besieged', 'built', 'destroyed', 'inhabitants of',
      'situated', 'located', 'boundary', 'borders', 'allotted to',
    ];
    const isPlaceByContext = placePatterns.some(p => allText.includes(p));
    if (isPlaceByContext) return 'place';
  }

  // Check Hitchcock meanings for place indicators
  if (hitchcock) {
    const meaningsLower = hitchcock.meanings.join(' ').toLowerCase();
    const isPlace = PLACE_KEYWORDS.some(kw => meaningsLower.includes(kw));
    if (isPlace) return 'place';

    // Check for person indicators in Nave's sub-topics
    if (naves) {
      const allText = naves.subTopics.map(st => st.title).join(' ').toLowerCase();
      const isPerson = PERSON_KEYWORDS.some(kw => allText.includes(kw));
      if (isPerson) return 'person';
    }

    // Hitchcock entries are primarily names of people/places
    // Default hitchcock entries to person
    return 'person';
  }

  // Topic with a category
  if (topic) {
    const cat = topic.category.toLowerCase();
    if (cat.includes('character') || cat.includes('people')) return 'person';
    if (cat.includes('place') || cat.includes('geography')) return 'place';
    if (cat.includes('doctrine') || cat.includes('theology') || cat.includes('faith')) return 'concept';
    return 'topic';
  }

  // Nave's only - check sub-topic titles
  if (naves) {
    const allText = naves.subTopics.map(st => st.title).join(' ').toLowerCase();
    const isPerson = PERSON_KEYWORDS.some(kw => allText.includes(kw));
    if (isPerson) return 'person';
    const isPlace = PLACE_KEYWORDS.some(kw => allText.includes(kw));
    if (isPlace) return 'place';
  }

  return 'topic';
}

function formatTitle(raw: string): string {
  return raw
    .split(/\s+/)
    .map(w => {
      const lower = w.toLowerCase();
      // Keep short prepositions lowercase unless first word
      if (['of', 'the', 'in', 'and', 'or', 'a', 'an', 'to', 'for', 'by', 'on', 'at'].includes(lower)) {
        return lower;
      }
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(' ')
    // Capitalize first letter regardless
    .replace(/^./, c => c.toUpperCase());
}

// ── Cache ──

let _allEntries: EncyclopediaEntry[] | null = null;
let _slugMap: Map<string, EncyclopediaEntry> | null = null;

function loadJSON<T>(filename: string): T | null {
  const filePath = path.join(process.cwd(), 'data', filename);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function loadAllEntries(): EncyclopediaEntry[] {
  if (_allEntries) return _allEntries;

  // Load all data sources
  const navesRaw: NaveTopicJSON[] = loadJSON('naves-topics.json') || [];
  const hitchcockRaw: HitchcockJSON[] = loadJSON('hitchcock-names.json') || [];
  const charactersData = loadJSON<{ characters: CharacterJSON[] }>('characters.json');
  const topicsData = loadJSON<{ topics: TopicJSON[] }>('topics.json');

  const characters = charactersData?.characters || [];
  const topics = topicsData?.topics || [];

  // Build lookup maps
  const navesMap = new Map<string, NaveTopicJSON>();
  for (const n of navesRaw) navesMap.set(n.slug, n);

  const hitchcockMap = new Map<string, HitchcockJSON>();
  for (const h of hitchcockRaw) hitchcockMap.set(h.slug, h);

  const characterMap = new Map<string, CharacterJSON>();
  for (const c of characters) characterMap.set(c.slug, c);

  const topicMap = new Map<string, TopicJSON>();
  for (const t of topics) topicMap.set(t.slug, t);

  // Collect all unique slugs
  const allSlugs = new Set<string>();
  for (const n of navesRaw) allSlugs.add(n.slug);
  for (const h of hitchcockRaw) allSlugs.add(h.slug);
  for (const c of characters) allSlugs.add(c.slug);
  for (const t of topics) allSlugs.add(t.slug);

  const entries: EncyclopediaEntry[] = [];

  for (const slug of allSlugs) {
    const naves = navesMap.get(slug);
    const hitchcock = hitchcockMap.get(slug);
    const character = characterMap.get(slug);
    const topic = topicMap.get(slug);

    // Need at least one substantive data source
    if (!naves && !hitchcock && !character && !topic) continue;

    // Determine display title
    let title: string;
    if (character) {
      title = character.name;
    } else if (hitchcock) {
      title = hitchcock.name;
    } else if (topic) {
      title = topic.name;
    } else if (naves) {
      title = formatTitle(naves.subject);
    } else {
      title = formatTitle(slug.replace(/-/g, ' '));
    }

    // Section letter (group numeric entries under '#')
    const firstChar = title.charAt(0).toUpperCase();
    const section = /[A-Z]/.test(firstChar) ? firstChar : '#';

    // Classify type
    const type = classifyEntryType(slug, hitchcock, character, topic, naves);

    // Gather all verse references for books analysis
    const allVerseRefs: string[] = [];
    if (naves) {
      for (const st of naves.subTopics) {
        allVerseRefs.push(...st.verses);
      }
    }
    if (topic) {
      // topic verseRefs are in "book-chapter-verse" format, convert to display
      for (const ref of topic.verseRefs) {
        allVerseRefs.push(ref);
      }
    }

    const booksReferenced = extractBooksFromVerseRefs(allVerseRefs);
    const hasOT = booksReferenced.some(b => OT_BOOKS.has(b));
    const hasNT = booksReferenced.some(b => NT_BOOKS.has(b));

    // Collect related slugs
    const relatedSlugs: string[] = [];
    if (naves?.relatedTopics) {
      for (const rt of naves.relatedTopics) {
        const rtSlug = rt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (rtSlug && rtSlug !== slug) relatedSlugs.push(rtSlug);
      }
    }
    if (topic?.relatedTopics) {
      for (const rt of topic.relatedTopics) {
        if (rt && rt !== slug && !relatedSlugs.includes(rt)) {
          relatedSlugs.push(rt);
        }
      }
    }

    const totalVerseRefs = (naves?.totalVerses || 0) + (topic?.verseCount || 0);

    entries.push({
      slug,
      title,
      type,
      section,
      etymology: hitchcock?.meanings || null,
      category: topic?.category || null,
      definition: topic?.definition || null,
      description: topic?.description || null,
      keywords: topic?.keywords || [],
      subTopics: naves?.subTopics || [],
      navesRelatedTopics: naves?.relatedTopics || [],
      navesVerseCount: naves?.totalVerses || 0,
      character: character
        ? {
            biography: character.biography,
            significance: character.significance,
            testament: character.testament,
            occupation: character.occupation,
            lifespan: character.lifespan,
            verseRefs: character.verseRefs,
            timeline: character.timeline || [],
            relationships: character.relationships || [],
          }
        : null,
      booksReferenced,
      totalVerseRefs,
      hasOldTestament: hasOT,
      hasNewTestament: hasNT,
      relatedSlugs,
    });
  }

  // Sort alphabetically
  entries.sort((a, b) => a.title.localeCompare(b.title));

  _allEntries = entries;
  return _allEntries;
}

function buildSlugMap(): Map<string, EncyclopediaEntry> {
  if (_slugMap) return _slugMap;
  _slugMap = new Map();
  for (const e of loadAllEntries()) {
    _slugMap.set(e.slug, e);
  }
  return _slugMap;
}

// ── Public API ──

export function getEncyclopediaEntry(slug: string): EncyclopediaEntry | undefined {
  return buildSlugMap().get(slug);
}

export function getAllEncyclopediaSlugs(): string[] {
  return loadAllEntries().map(e => e.slug);
}

export function getAllEncyclopediaEntries(): EncyclopediaEntry[] {
  return loadAllEntries();
}

export function getEncyclopediaEntriesBySection(section: string): EncyclopediaEntry[] {
  return loadAllEntries().filter(e => e.section === section);
}

export function getEncyclopediaEntriesByType(type: EntryType): EncyclopediaEntry[] {
  return loadAllEntries().filter(e => e.type === type);
}

export function getRelatedEntries(slug: string, limit = 8): EncyclopediaEntry[] {
  const entry = getEncyclopediaEntry(slug);
  if (!entry) return [];

  const slugMap = buildSlugMap();
  const related: EncyclopediaEntry[] = [];

  // First, use direct related slugs
  for (const rs of entry.relatedSlugs) {
    const match = slugMap.get(rs);
    if (match && match.slug !== slug) {
      related.push(match);
      if (related.length >= limit) return related;
    }
  }

  // Then fill with same-type entries from same section
  if (related.length < limit) {
    const sameType = loadAllEntries().filter(
      e => e.slug !== slug &&
        e.type === entry.type &&
        !related.some(r => r.slug === e.slug)
    );
    // Prioritize same section, then most verse-rich
    sameType.sort((a, b) => {
      if (a.section === entry.section && b.section !== entry.section) return -1;
      if (b.section === entry.section && a.section !== entry.section) return 1;
      return b.totalVerseRefs - a.totalVerseRefs;
    });
    for (const e of sameType) {
      related.push(e);
      if (related.length >= limit) break;
    }
  }

  return related;
}

export function getFeaturedEntries(limit = 20): EncyclopediaEntry[] {
  return [...loadAllEntries()]
    .sort((a, b) => b.totalVerseRefs - a.totalVerseRefs)
    .slice(0, limit);
}

export function getEncyclopediaSections(): { letter: string; count: number }[] {
  const map = new Map<string, number>();
  for (const e of loadAllEntries()) {
    map.set(e.section, (map.get(e.section) || 0) + 1);
  }
  return Array.from(map.entries())
    .map(([letter, count]) => ({ letter, count }))
    .sort((a, b) => a.letter.localeCompare(b.letter));
}

export function getEncyclopediaStats(): EncyclopediaStats {
  const all = loadAllEntries();

  const typeCount = { person: 0, place: 0, topic: 0, concept: 0 };
  let withEtymology = 0;
  let withCharacterData = 0;
  let withNavesData = 0;

  for (const e of all) {
    typeCount[e.type]++;
    if (e.etymology) withEtymology++;
    if (e.character) withCharacterData++;
    if (e.subTopics.length > 0) withNavesData++;
  }

  return {
    totalEntries: all.length,
    people: typeCount.person,
    places: typeCount.place,
    topics: typeCount.topic,
    concepts: typeCount.concept,
    withEtymology,
    withCharacterData,
    withNavesData,
    sections: getEncyclopediaSections(),
  };
}
