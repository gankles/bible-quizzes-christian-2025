/**
 * kjv-verse-data.ts — Data library for /[book]-[chapter]-[verse]-kjv pages
 *
 * Provides:
 * - parseKjvSlug(): parse a slug like "john-3-16-kjv" into book/chapter/verse
 * - getVerseTopic(): get the most relevant topic name for a verse reference
 * - getAllKjvSlugs(): get all 31,102 verse slugs for sitemap generation
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

  // Try matching from longest possible book slug to shortest
  // Book slugs can be multi-part: "1-samuel", "2-kings", "song-of-solomon"
  for (let i = parts.length - 2; i >= 1; i--) {
    const bookSlug = parts.slice(0, i).join('-');
    const chapterStr = parts[i];
    const verseStr = parts[i + 1];

    if (BOOK_SLUG_SET.has(bookSlug) && i + 1 < parts.length) {
      const chapter = parseInt(chapterStr);
      const verse = parseInt(verseStr);
      if (chapter > 0 && verse > 0) {
        const book = BIBLE_BOOKS.find(b => b.slug === bookSlug);
        return {
          bookSlug,
          chapter,
          verse,
          bookName: book?.name || bookSlug,
        };
      }
    }
  }

  return null;
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
