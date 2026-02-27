/**
 * kjv-verse-data.ts — Data library for KJV verse & chapter pages
 *
 * Provides:
 * - parseKjvSlug(): parse "john-3-16-kjv" into book/chapter/verse
 * - parseKjvChapterSlug(): parse "john-3-kjv" into book/chapter
 * - getVerseTopic(): get the most relevant topic name for a verse reference
 * - getAllKjvVerseSlugs(): get all ~29,333 verse slugs for sitemap
 * - getAllKjvChapterSlugs(): get all 1,189 chapter slugs for sitemap
 */

import fs from 'fs';
import path from 'path';
import { BIBLE_BOOKS } from './bible-data';

// ============================================
// Slug parsing
// ============================================

interface ParsedKjvSlug {
  bookSlug: string;
  chapter: number;
  verse: number;
  bookName: string;
}

const BOOK_SLUG_SET = new Set(BIBLE_BOOKS.map(b => b.slug));

/** Parse a slug like "john-3-16-kjv" or "1-samuel-2-3-kjv" into parts */
export function parseKjvSlug(slug: string): ParsedKjvSlug | null {
  if (!slug.endsWith('-kjv')) return null;

  // Strip "-kjv" suffix
  const core = slug.slice(0, -4); // "john-3-16" or "1-samuel-2-3"
  const parts = core.split('-');

  // Need at least book + chapter + verse = 3 parts minimum
  if (parts.length < 3) return null;

  // Try matching from longest possible book slug to shortest
  // Book slugs can be multi-part: "1-samuel", "2-kings", "song-of-solomon"
  for (let i = parts.length - 2; i >= 1; i--) {
    const bookSlug = parts.slice(0, i).join('-');
    const chapterStr = parts[i];
    const verseStr = parts[i + 1];

    if (BOOK_SLUG_SET.has(bookSlug) && i + 1 < parts.length) {
      const chapter = parseInt(chapterStr);
      const verse = parseInt(verseStr);
      if (isNaN(chapter) || isNaN(verse) || chapter < 1 || verse < 1) continue;
      const book = BIBLE_BOOKS.find(b => b.slug === bookSlug);
      if (!book || chapter > book.chapters) continue;
      return {
        bookSlug,
        chapter,
        verse,
        bookName: book.name,
      };
    }
  }

  return null;
}

// ============================================
// KJV Chapter slug parsing
// ============================================

interface ParsedKjvChapterSlug {
  bookSlug: string;
  chapter: number;
  bookName: string;
  totalChapters: number;
}

/** Parse a slug like "psalms-93-kjv" or "1-samuel-2-kjv" into book/chapter */
export function parseKjvChapterSlug(slug: string): ParsedKjvChapterSlug | null {
  if (!slug.endsWith('-kjv')) return null;

  const core = slug.slice(0, -4); // "psalms-93" or "1-samuel-2"
  const parts = core.split('-');

  // Need at least book + chapter = 2 parts minimum
  if (parts.length < 2) return null;

  // The chapter number is always the last part; everything before is the book slug
  const chapterStr = parts[parts.length - 1];
  const chapter = parseInt(chapterStr);
  if (isNaN(chapter) || chapter < 1) return null;

  const bookSlug = parts.slice(0, parts.length - 1).join('-');
  if (!BOOK_SLUG_SET.has(bookSlug)) return null;

  const book = BIBLE_BOOKS.find(b => b.slug === bookSlug);
  if (!book || chapter > book.chapters) return null;

  return {
    bookSlug,
    chapter,
    bookName: book.name,
    totalChapters: book.chapters,
  };
}

// ============================================
// Verse-to-topic mapping (cached)
// ============================================

interface QuoteTopic {
  slug: string;
  name: string;
  verseRefs: string[];
  verseCount: number;
  category: string;
}

let _topicMap: Map<string, string> | null = null;

// Priority topic names — common Bible themes people search for
const PRIORITY_TOPICS = new Set([
  'Love', 'Faith', 'Hope', 'Prayer', 'Salvation', 'Grace', 'Forgiveness',
  'Peace', 'Strength', 'Courage', 'Wisdom', 'Joy', 'Healing', 'Patience',
  'Trust', 'Mercy', 'Obedience', 'Righteousness', 'Humility', 'Truth',
  'Worship', 'Gratitude', 'Comfort', 'Protection', 'Guidance', 'Provision',
  'Marriage', 'Family', 'Children', 'Friendship', 'Unity', 'Generosity',
  'Holiness', 'Repentance', 'Eternal Life', 'Heaven', 'Hell', 'Sin',
  'Temptation', 'Anxiety', 'Fear', 'Anger', 'Pride', 'Jealousy',
  'Money', 'Work', 'Leadership', 'Servanthood', 'Evangelism', 'Discipleship',
  'Creation', 'Prophecy', 'Resurrection', 'Redemption', 'Covenant',
  'Blessing', 'Judgment', 'Justice', 'Compassion', 'Contentment',
  'Perseverance', 'Faithfulness', 'Kindness', 'Goodness', 'Self-Control',
  'Death', 'Suffering', 'Trials', 'Victory', 'Freedom', 'Praise',
  'Thanksgiving', 'Fasting', 'Tithing', 'Baptism', 'Holy Spirit',
  'Charity', 'Godly Living', 'Born Again', 'Atonement', 'Sacrifice',
]);

const SKIP_NAMES = new Set([
  'God', 'Jesus', 'Christ', 'Bible', 'Psalms', 'Scripture', 'Readings Select',
  'Israel', 'Word Of God', 'Lord', 'Spirit',
]);

function buildTopicMap(): Map<string, string> {
  if (_topicMap) return _topicMap;

  const filePath = path.join(process.cwd(), 'data', 'bible-quotes.json');
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const topics: QuoteTopic[] = raw.topics;

  _topicMap = new Map();

  // Pass 1: Priority topics (sorted by specificity — smaller = more specific)
  const priorityTopics = topics
    .filter(t => PRIORITY_TOPICS.has(t.name))
    .sort((a, b) => a.verseCount - b.verseCount);

  for (const topic of priorityTopics) {
    for (const ref of topic.verseRefs) {
      if (!_topicMap.has(ref)) _topicMap.set(ref, topic.name);
    }
  }

  // Pass 2: Non-skip, mid-range topics (10-500 verses)
  const midTopics = topics
    .filter(t => !PRIORITY_TOPICS.has(t.name) && !SKIP_NAMES.has(t.name) && t.verseCount >= 10 && t.verseCount <= 500)
    .sort((a, b) => a.verseCount - b.verseCount);

  for (const topic of midTopics) {
    for (const ref of topic.verseRefs) {
      if (!_topicMap.has(ref)) _topicMap.set(ref, topic.name);
    }
  }

  // Pass 3: Everything non-skip
  const remaining = topics
    .filter(t => !SKIP_NAMES.has(t.name))
    .sort((a, b) => a.verseCount - b.verseCount);

  for (const topic of remaining) {
    for (const ref of topic.verseRefs) {
      if (!_topicMap.has(ref)) _topicMap.set(ref, topic.name);
    }
  }

  // Pass 4: Even skip names for unmapped
  for (const topic of topics) {
    for (const ref of topic.verseRefs) {
      if (!_topicMap.has(ref)) _topicMap.set(ref, topic.name);
    }
  }

  return _topicMap;
}

/** Get the most relevant topic name for a verse reference like "john-3-16" */
export function getVerseTopic(bookSlug: string, chapter: number, verse: number): string {
  const map = buildTopicMap();
  const ref = `${bookSlug}-${chapter}-${verse}`;
  return map.get(ref) || 'Bible Study';
}

// ============================================
// All KJV slugs for sitemap — uses cross-references keys as verse inventory
// ============================================

let _allVerseRefs: string[] | null = null;

function loadAllVerseRefs(): string[] {
  if (_allVerseRefs) return _allVerseRefs;
  const filePath = path.join(process.cwd(), 'data', 'cross-references.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  _allVerseRefs = Object.keys(data); // e.g., ["genesis-1-1", "genesis-1-2", ...]
  return _allVerseRefs;
}

/** Get all KJV verse slugs (appends -kjv to each verse ref) */
export function getAllKjvVerseSlugs(): string[] {
  return loadAllVerseRefs().map(ref => `${ref}-kjv`);
}

/** Get verse ref count */
export function getKjvVerseCount(): number {
  return loadAllVerseRefs().length;
}

// ============================================
// All KJV chapter slugs for sitemap
// ============================================

/** Get all 1,189 KJV chapter slugs (e.g., "genesis-1-kjv", "psalm-93-kjv") */
export function getAllKjvChapterSlugs(): string[] {
  const slugs: string[] = [];
  for (const book of BIBLE_BOOKS) {
    for (let ch = 1; ch <= book.chapters; ch++) {
      slugs.push(`${book.slug}-${ch}-kjv`);
    }
  }
  return slugs;
}
