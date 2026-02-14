import fs from 'fs';
import path from 'path';

export interface NaveTopic {
  subject: string;
  slug: string;
  section: string;
  entries: NaveEntry[];
  books: string[];       // unique book codes referenced
  bookSlugs: string[];   // URL-safe book slugs
  refCount: number;      // total verse references
}

export interface NaveEntry {
  text: string;
  references: NaveReference[];
}

export interface NaveReference {
  book: string;     // USX code like "GEN"
  bookSlug: string; // URL-safe like "genesis"
  chapter: number;
  raw: string;      // original text like "GEN 1:1"
}

// USX → slug mapping (all 66 books)
const USX_TO_SLUG: Record<string, string> = {
  GEN: 'genesis', EXO: 'exodus', LEV: 'leviticus', NUM: 'numbers', DEU: 'deuteronomy',
  JOS: 'joshua', JDG: 'judges', RUT: 'ruth', '1SA': '1-samuel', '2SA': '2-samuel',
  '1KI': '1-kings', '2KI': '2-kings', '1CH': '1-chronicles', '2CH': '2-chronicles',
  EZR: 'ezra', NEH: 'nehemiah', EST: 'esther', JOB: 'job', PSA: 'psalms',
  PRO: 'proverbs', ECC: 'ecclesiastes', SNG: 'song-of-solomon', ISA: 'isaiah',
  JER: 'jeremiah', LAM: 'lamentations', EZK: 'ezekiel', DAN: 'daniel',
  HOS: 'hosea', JOL: 'joel', AMO: 'amos', OBA: 'obadiah', JON: 'jonah',
  MIC: 'micah', NAH: 'nahum', HAB: 'habakkuk', ZEP: 'zephaniah', HAG: 'haggai',
  ZEC: 'zechariah', MAL: 'malachi',
  MAT: 'matthew', MRK: 'mark', LUK: 'luke', JHN: 'john', ACT: 'acts',
  ROM: 'romans', '1CO': '1-corinthians', '2CO': '2-corinthians', GAL: 'galatians',
  EPH: 'ephesians', PHP: 'philippians', COL: 'colossians',
  '1TH': '1-thessalonians', '2TH': '2-thessalonians',
  '1TI': '1-timothy', '2TI': '2-timothy', TIT: 'titus', PHM: 'philemon',
  HEB: 'hebrews', JAS: 'james', '1PE': '1-peter', '2PE': '2-peter',
  '1JN': '1-john', '2JN': '2-john', '3JN': '3-john', JUD: 'jude', REV: 'revelation',
};

const USX_TO_NAME: Record<string, string> = {
  GEN: 'Genesis', EXO: 'Exodus', LEV: 'Leviticus', NUM: 'Numbers', DEU: 'Deuteronomy',
  JOS: 'Joshua', JDG: 'Judges', RUT: 'Ruth', '1SA': '1 Samuel', '2SA': '2 Samuel',
  '1KI': '1 Kings', '2KI': '2 Kings', '1CH': '1 Chronicles', '2CH': '2 Chronicles',
  EZR: 'Ezra', NEH: 'Nehemiah', EST: 'Esther', JOB: 'Job', PSA: 'Psalms',
  PRO: 'Proverbs', ECC: 'Ecclesiastes', SNG: 'Song of Solomon', ISA: 'Isaiah',
  JER: 'Jeremiah', LAM: 'Lamentations', EZK: 'Ezekiel', DAN: 'Daniel',
  HOS: 'Hosea', JOL: 'Joel', AMO: 'Amos', OBA: 'Obadiah', JON: 'Jonah',
  MIC: 'Micah', NAH: 'Nahum', HAB: 'Habakkuk', ZEP: 'Zephaniah', HAG: 'Haggai',
  ZEC: 'Zechariah', MAL: 'Malachi',
  MAT: 'Matthew', MRK: 'Mark', LUK: 'Luke', JHN: 'John', ACT: 'Acts',
  ROM: 'Romans', '1CO': '1 Corinthians', '2CO': '2 Corinthians', GAL: 'Galatians',
  EPH: 'Ephesians', PHP: 'Philippians', COL: 'Colossians',
  '1TH': '1 Thessalonians', '2TH': '2 Thessalonians',
  '1TI': '1 Timothy', '2TI': '2 Timothy', TIT: 'Titus', PHM: 'Philemon',
  HEB: 'Hebrews', JAS: 'James', '1PE': '1 Peter', '2PE': '2 Peter',
  '1JN': '1 John', '2JN': '2 John', '3JN': '3 John', JUD: 'Jude', REV: 'Revelation',
};

// Reference regex
const REF_PATTERN = /\b(GEN|EXO|LEV|NUM|DEU|JOS|JDG|RUT|1SA|2SA|1KI|2KI|1CH|2CH|EZR|NEH|EST|JOB|PSA|PRO|ECC|SNG|ISA|JER|LAM|EZK|DAN|HOS|JOL|AMO|OBA|JON|MIC|NAH|HAB|ZEP|HAG|ZEC|MAL|MAT|MRK|LUK|JHN|ACT|ROM|1CO|2CO|GAL|EPH|PHP|COL|1TH|2TH|1TI|2TI|TIT|PHM|HEB|JAS|1PE|2PE|1JN|2JN|3JN|JUD|REV)\s+(\d+)/g;

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function parseReferences(text: string): NaveReference[] {
  const refs: NaveReference[] = [];
  let match;
  const regex = new RegExp(REF_PATTERN.source, 'g');
  while ((match = regex.exec(text)) !== null) {
    const book = match[1];
    const chapter = parseInt(match[2], 10);
    const bookSlug = USX_TO_SLUG[book] || book.toLowerCase();
    refs.push({
      book,
      bookSlug,
      chapter,
      raw: match[0],
    });
  }
  return refs;
}

// ── Cache ──

let _cache: NaveTopic[] | null = null;
let _slugMap: Map<string, NaveTopic> | null = null;

function loadAll(): NaveTopic[] {
  if (_cache) return _cache;

  const csvPath = path.join(process.cwd(), 'data', 'bible-data', 'NavesTopicalDictionary.csv');
  if (!fs.existsSync(csvPath)) return [];

  const csv = fs.readFileSync(csvPath, 'utf-8');
  const clean = csv.charCodeAt(0) === 0xFEFF ? csv.slice(1) : csv;

  // Join multi-line quoted fields into single logical rows
  function splitCSVRows(text: string): string[] {
    const rows: string[] = [];
    const lines = text.split('\n');
    let currentRow = '';
    let inQuotes = false;

    for (const line of lines) {
      currentRow = currentRow === '' ? line : currentRow + '\n' + line;

      for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') {
          if (i + 1 < line.length && line[i + 1] === '"') { i++; }
          else { inQuotes = !inQuotes; }
        }
      }

      if (!inQuotes) {
        const trimmed = currentRow.trim();
        if (trimmed.length > 0) rows.push(trimmed);
        currentRow = '';
      }
    }

    if (currentRow.trim().length > 0) rows.push(currentRow.trim());
    return rows;
  }

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

  const logicalRows = splitCSVRows(clean);
  const topicMap = new Map<string, { section: string; entries: string[] }>();

  // Skip header row (index 0)
  for (let i = 1; i < logicalRows.length; i++) {
    const row = logicalRows[i];
    if (!row.trim()) continue;

    const fields = parseCSVLine(row);
    const section = fields[0] || '';
    const subject = fields[1] || '';
    const entry = fields[2] || '';

    if (!subject) continue;

    if (!topicMap.has(subject)) {
      topicMap.set(subject, { section, entries: [] });
    }
    if (entry) {
      topicMap.get(subject)!.entries.push(entry);
    }
  }

  // Build NaveTopic objects
  const topics: NaveTopic[] = [];

  for (const [subject, data] of Array.from(topicMap.entries())) {
    const allRefs: NaveReference[] = [];
    const entries: NaveEntry[] = [];
    const bookSet = new Set<string>();

    for (const entryText of data.entries) {
      const refs = parseReferences(entryText);
      entries.push({ text: entryText, references: refs });
      allRefs.push(...refs);
      for (const ref of refs) {
        bookSet.add(ref.book);
      }
    }

    const bookSlugs = Array.from(bookSet).map(b => USX_TO_SLUG[b] || b.toLowerCase());

    topics.push({
      subject,
      slug: toSlug(subject),
      section: data.section,
      entries,
      books: Array.from(bookSet).sort(),
      bookSlugs: bookSlugs.sort(),
      refCount: allRefs.length,
    });
  }

  // Sort alphabetically
  topics.sort((a, b) => a.subject.localeCompare(b.subject));

  _cache = topics;
  return _cache;
}

function buildSlugMap(): Map<string, NaveTopic> {
  if (_slugMap) return _slugMap;
  _slugMap = new Map();
  for (const t of loadAll()) {
    _slugMap.set(t.slug, t);
  }
  return _slugMap;
}

// ── Public API ──

export function getAllNaveTopics(): NaveTopic[] {
  return loadAll();
}

export function getNaveTopicBySlug(slug: string): NaveTopic | undefined {
  return buildSlugMap().get(slug);
}

export function getNaveTopicsBySection(section: string): NaveTopic[] {
  return loadAll().filter(t => t.section === section);
}

export function getNaveSections(): string[] {
  const sections = new Set<string>();
  for (const t of loadAll()) {
    if (t.section) sections.add(t.section);
  }
  return Array.from(sections).sort();
}

export function getNaveTopicsForBook(bookSlug: string): NaveTopic[] {
  return loadAll().filter(t => t.bookSlugs.includes(bookSlug));
}

/** Get all topic+book combos for generateStaticParams */
export function getAllNaveTopicBookCombos(): Array<{ topic: string; book: string }> {
  const combos: Array<{ topic: string; book: string }> = [];
  for (const topic of loadAll()) {
    for (const bookSlug of topic.bookSlugs) {
      combos.push({ topic: topic.slug, book: bookSlug });
    }
  }
  return combos;
}

/** Get entries for a topic filtered to a specific book */
export function getNaveTopicInBook(topicSlug: string, bookSlug: string) {
  const topic = getNaveTopicBySlug(topicSlug);
  if (!topic) return null;

  const filteredEntries = topic.entries
    .filter(e => e.references.some(r => r.bookSlug === bookSlug))
    .map(e => ({
      ...e,
      references: e.references.filter(r => r.bookSlug === bookSlug),
    }));

  if (filteredEntries.length === 0) return null;

  const bookCode = topic.books.find(b => (USX_TO_SLUG[b] || b.toLowerCase()) === bookSlug);
  const bookName = bookCode ? (USX_TO_NAME[bookCode] || bookCode) : bookSlug;

  return {
    topic,
    bookSlug,
    bookName,
    entries: filteredEntries,
    refCount: filteredEntries.reduce((sum, e) => sum + e.references.length, 0),
  };
}

export function getNavesStats() {
  const all = loadAll();
  const combos = getAllNaveTopicBookCombos();
  return {
    topics: all.length,
    sections: getNaveSections().length,
    topicBookCombos: combos.length,
    totalRefs: all.reduce((sum, t) => sum + t.refCount, 0),
    withRefs: all.filter(t => t.refCount > 0).length,
  };
}

export { USX_TO_NAME, USX_TO_SLUG };
