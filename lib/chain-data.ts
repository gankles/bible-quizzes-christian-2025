/**
 * Chain Study Data Library
 *
 * Generates Thompson Chain Reference-style data from Nave's Topics.
 * A "chain" is a topic that spans 4+ books and both testaments,
 * tracing a theme chronologically through Scripture.
 */

import fs from 'fs';
import path from 'path';

// ── Types ──

export interface ChainVerse {
  reference: string;    // e.g. "Genesis 12:1-3"
  book: string;         // e.g. "Genesis"
  bookOrder: number;    // canonical order 1-66
  testament: 'OT' | 'NT';
  chapter: number;
  subTopicTitle: string; // Nave's sub-topic context
}

export interface ChainBookGroup {
  book: string;
  bookOrder: number;
  testament: 'OT' | 'NT';
  verses: ChainVerse[];
  subTopics: string[];  // unique sub-topic titles for this book
}

export interface ChainStudy {
  slug: string;
  subject: string;      // display name
  section: string;      // first letter
  bookGroups: ChainBookGroup[];
  totalVerses: number;
  bookCount: number;
  otBookCount: number;
  ntBookCount: number;
  relatedTopics: string[];
  subTopics: { title: string; verses: string[] }[];
}

export interface ChainStats {
  totalChains: number;
  totalVerses: number;
  averageBooks: number;
  mostBooks: { slug: string; subject: string; bookCount: number };
  mostVerses: { slug: string; subject: string; totalVerses: number };
  sections: { letter: string; count: number }[];
}

// ── Bible Book Canonical Order ──

const BOOK_ORDER: Record<string, { order: number; testament: 'OT' | 'NT' }> = {
  'Genesis': { order: 1, testament: 'OT' },
  'Exodus': { order: 2, testament: 'OT' },
  'Leviticus': { order: 3, testament: 'OT' },
  'Numbers': { order: 4, testament: 'OT' },
  'Deuteronomy': { order: 5, testament: 'OT' },
  'Joshua': { order: 6, testament: 'OT' },
  'Judges': { order: 7, testament: 'OT' },
  'Ruth': { order: 8, testament: 'OT' },
  '1 Samuel': { order: 9, testament: 'OT' },
  '2 Samuel': { order: 10, testament: 'OT' },
  '1 Kings': { order: 11, testament: 'OT' },
  '2 Kings': { order: 12, testament: 'OT' },
  '1 Chronicles': { order: 13, testament: 'OT' },
  '2 Chronicles': { order: 14, testament: 'OT' },
  'Ezra': { order: 15, testament: 'OT' },
  'Nehemiah': { order: 16, testament: 'OT' },
  'Esther': { order: 17, testament: 'OT' },
  'Job': { order: 18, testament: 'OT' },
  'Psalms': { order: 19, testament: 'OT' },
  'Proverbs': { order: 20, testament: 'OT' },
  'Ecclesiastes': { order: 21, testament: 'OT' },
  'Song of Solomon': { order: 22, testament: 'OT' },
  'Isaiah': { order: 23, testament: 'OT' },
  'Jeremiah': { order: 24, testament: 'OT' },
  'Lamentations': { order: 25, testament: 'OT' },
  'Ezekiel': { order: 26, testament: 'OT' },
  'Daniel': { order: 27, testament: 'OT' },
  'Hosea': { order: 28, testament: 'OT' },
  'Joel': { order: 29, testament: 'OT' },
  'Amos': { order: 30, testament: 'OT' },
  'Obadiah': { order: 31, testament: 'OT' },
  'Jonah': { order: 32, testament: 'OT' },
  'Micah': { order: 33, testament: 'OT' },
  'Nahum': { order: 34, testament: 'OT' },
  'Habakkuk': { order: 35, testament: 'OT' },
  'Zephaniah': { order: 36, testament: 'OT' },
  'Haggai': { order: 37, testament: 'OT' },
  'Zechariah': { order: 38, testament: 'OT' },
  'Malachi': { order: 39, testament: 'OT' },
  'Matthew': { order: 40, testament: 'NT' },
  'Mark': { order: 41, testament: 'NT' },
  'Luke': { order: 42, testament: 'NT' },
  'John': { order: 43, testament: 'NT' },
  'Acts': { order: 44, testament: 'NT' },
  'Romans': { order: 45, testament: 'NT' },
  '1 Corinthians': { order: 46, testament: 'NT' },
  '2 Corinthians': { order: 47, testament: 'NT' },
  'Galatians': { order: 48, testament: 'NT' },
  'Ephesians': { order: 49, testament: 'NT' },
  'Philippians': { order: 50, testament: 'NT' },
  'Colossians': { order: 51, testament: 'NT' },
  '1 Thessalonians': { order: 52, testament: 'NT' },
  '2 Thessalonians': { order: 53, testament: 'NT' },
  '1 Timothy': { order: 54, testament: 'NT' },
  '2 Timothy': { order: 55, testament: 'NT' },
  'Titus': { order: 56, testament: 'NT' },
  'Philemon': { order: 57, testament: 'NT' },
  'Hebrews': { order: 58, testament: 'NT' },
  'James': { order: 59, testament: 'NT' },
  '1 Peter': { order: 60, testament: 'NT' },
  '2 Peter': { order: 61, testament: 'NT' },
  '1 John': { order: 62, testament: 'NT' },
  '2 John': { order: 63, testament: 'NT' },
  '3 John': { order: 64, testament: 'NT' },
  'Jude': { order: 65, testament: 'NT' },
  'Revelation': { order: 66, testament: 'NT' },
};

// ── Helpers ──

function parseBookFromVerse(verseRef: string): { book: string; chapter: number } | null {
  const match = verseRef.match(/^(.+?)\s+(\d+)/);
  if (!match) return null;
  const book = match[1];
  const chapter = parseInt(match[2], 10);
  if (!BOOK_ORDER[book]) return null;
  return { book, chapter };
}

function formatSubject(raw: string): string {
  // Convert "ABRAHAM" to "Abraham", "HOLY SPIRIT" to "Holy Spirit"
  return raw
    .split(/\s+/)
    .map(w => {
      if (w.length <= 2 && w === w.toUpperCase()) return w; // Keep "OF", "IN" etc short
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(' ');
}

// ── Raw JSON type ──

interface NaveTopicJSON {
  slug: string;
  subject: string;
  section: string;
  subTopics: { title: string; verses: string[] }[];
  relatedTopics: string[];
  totalVerses: number;
}

// ── Cache ──

let _allChains: ChainStudy[] | null = null;
let _slugMap: Map<string, ChainStudy> | null = null;

function loadAllChains(): ChainStudy[] {
  if (_allChains) return _allChains;

  const jsonPath = path.join(process.cwd(), 'data', 'naves-topics.json');
  if (!fs.existsSync(jsonPath)) {
    _allChains = [];
    return _allChains;
  }

  const raw: NaveTopicJSON[] = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const chains: ChainStudy[] = [];

  for (const topic of raw) {
    // Parse all verses from all sub-topics
    const allVerses: ChainVerse[] = [];
    const bookSet = new Set<string>();

    for (const st of topic.subTopics) {
      for (const vRef of st.verses) {
        const parsed = parseBookFromVerse(vRef);
        if (!parsed) continue;

        const info = BOOK_ORDER[parsed.book];
        if (!info) continue;

        bookSet.add(parsed.book);
        allVerses.push({
          reference: vRef,
          book: parsed.book,
          bookOrder: info.order,
          testament: info.testament,
          chapter: parsed.chapter,
          subTopicTitle: st.title,
        });
      }
    }

    // Chain qualification: 4+ books AND both testaments
    if (bookSet.size < 4) continue;

    const hasOT = allVerses.some(v => v.testament === 'OT');
    const hasNT = allVerses.some(v => v.testament === 'NT');
    if (!hasOT || !hasNT) continue;

    // Group verses by book, sorted by canonical order
    const bookMap = new Map<string, ChainVerse[]>();
    for (const v of allVerses) {
      if (!bookMap.has(v.book)) bookMap.set(v.book, []);
      bookMap.get(v.book)!.push(v);
    }

    const bookGroups: ChainBookGroup[] = [];
    for (const [book, verses] of bookMap.entries()) {
      const info = BOOK_ORDER[book];
      // Sort verses within book by chapter
      verses.sort((a, b) => a.chapter - b.chapter);
      // Unique sub-topic titles
      const subTopics = [...new Set(verses.map(v => v.subTopicTitle))];

      bookGroups.push({
        book,
        bookOrder: info.order,
        testament: info.testament,
        verses,
        subTopics,
      });
    }

    // Sort book groups by canonical order
    bookGroups.sort((a, b) => a.bookOrder - b.bookOrder);

    const otBooks = bookGroups.filter(g => g.testament === 'OT').length;
    const ntBooks = bookGroups.filter(g => g.testament === 'NT').length;

    chains.push({
      slug: topic.slug,
      subject: formatSubject(topic.subject),
      section: topic.section,
      bookGroups,
      totalVerses: allVerses.length,
      bookCount: bookGroups.length,
      otBookCount: otBooks,
      ntBookCount: ntBooks,
      relatedTopics: topic.relatedTopics || [],
      subTopics: topic.subTopics,
    });
  }

  // Sort alphabetically
  chains.sort((a, b) => a.subject.localeCompare(b.subject));

  _allChains = chains;
  return _allChains;
}

function buildSlugMap(): Map<string, ChainStudy> {
  if (_slugMap) return _slugMap;
  _slugMap = new Map();
  for (const c of loadAllChains()) {
    _slugMap.set(c.slug, c);
  }
  return _slugMap;
}

// ── Public API ──

export function getChainStudy(slug: string): ChainStudy | undefined {
  return buildSlugMap().get(slug);
}

export function getAllChainStudies(): ChainStudy[] {
  return loadAllChains();
}

export function getChainStudiesBySection(section: string): ChainStudy[] {
  return loadAllChains().filter(c => c.section === section);
}

export function getChainSections(): { letter: string; count: number }[] {
  const map = new Map<string, number>();
  for (const c of loadAllChains()) {
    map.set(c.section, (map.get(c.section) || 0) + 1);
  }
  return Array.from(map.entries())
    .map(([letter, count]) => ({ letter, count }))
    .sort((a, b) => a.letter.localeCompare(b.letter));
}

export function getRelatedChains(slug: string, limit = 6): ChainStudy[] {
  const chain = getChainStudy(slug);
  if (!chain) return [];

  const all = loadAllChains();

  // Find chains with overlapping related topics or similar book coverage
  const relatedSlugs = new Set(
    chain.relatedTopics
      .map(rt => rt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
  );

  const scored: { chain: ChainStudy; score: number }[] = [];
  for (const c of all) {
    if (c.slug === slug) continue;

    let score = 0;

    // Direct related topic match
    if (relatedSlugs.has(c.slug)) score += 10;

    // Same section bonus
    if (c.section === chain.section) score += 1;

    // Overlapping books
    const chainBooks = new Set(chain.bookGroups.map(g => g.book));
    const overlapBooks = c.bookGroups.filter(g => chainBooks.has(g.book)).length;
    score += overlapBooks * 0.5;

    // Similar size bonus
    const sizeDiff = Math.abs(c.bookCount - chain.bookCount);
    if (sizeDiff <= 3) score += 2;

    if (score > 0) scored.push({ chain: c, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.chain);
}

export function getFeaturedChains(limit = 20): ChainStudy[] {
  const all = loadAllChains();
  // Sort by book coverage (most books first), then by verse count
  return [...all]
    .sort((a, b) => {
      if (b.bookCount !== a.bookCount) return b.bookCount - a.bookCount;
      return b.totalVerses - a.totalVerses;
    })
    .slice(0, limit);
}

export function getChainStats(): ChainStats {
  const all = loadAllChains();
  if (all.length === 0) {
    return {
      totalChains: 0,
      totalVerses: 0,
      averageBooks: 0,
      mostBooks: { slug: '', subject: '', bookCount: 0 },
      mostVerses: { slug: '', subject: '', totalVerses: 0 },
      sections: [],
    };
  }

  const totalVerses = all.reduce((sum, c) => sum + c.totalVerses, 0);
  const averageBooks = Math.round(all.reduce((sum, c) => sum + c.bookCount, 0) / all.length * 10) / 10;

  const byBooks = [...all].sort((a, b) => b.bookCount - a.bookCount);
  const byVerses = [...all].sort((a, b) => b.totalVerses - a.totalVerses);

  return {
    totalChains: all.length,
    totalVerses,
    averageBooks,
    mostBooks: {
      slug: byBooks[0].slug,
      subject: byBooks[0].subject,
      bookCount: byBooks[0].bookCount,
    },
    mostVerses: {
      slug: byVerses[0].slug,
      subject: byVerses[0].subject,
      totalVerses: byVerses[0].totalVerses,
    },
    sections: getChainSections(),
  };
}

export { BOOK_ORDER };
