/**
 * bible-quotes-data.ts — Data library for /bible-quotes/ pages
 *
 * Loads consolidated bible-quotes.json and provides query functions.
 * Uses module-level caching (same pattern as naves-data.ts, strongs-data.ts).
 */

import fs from 'fs';
import path from 'path';

export interface QuoteTopic {
  slug: string;
  name: string;
  category: string;
  description: string;
  verseRefs: string[];
  verseCount: number;
  sourceTopics: string[];
  subtopics: string[];
  relatedSlugs: string[];
  keywords: string[];
}

interface QuotesData {
  topics: QuoteTopic[];
  generatedAt: string;
  totalVerseRefs: number;
}

// Module-level cache
let _cache: QuotesData | null = null;
let _slugIndex: Map<string, QuoteTopic> | null = null;
let _categoryIndex: Map<string, QuoteTopic[]> | null = null;

function loadData(): QuotesData {
  if (_cache) return _cache;
  const filePath = path.join(process.cwd(), 'data', 'bible-quotes.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  _cache = JSON.parse(raw);
  return _cache!;
}

function getSlugIndex(): Map<string, QuoteTopic> {
  if (_slugIndex) return _slugIndex;
  const data = loadData();
  _slugIndex = new Map();
  for (const t of data.topics) {
    _slugIndex.set(t.slug, t);
  }
  return _slugIndex;
}

function getCategoryIndex(): Map<string, QuoteTopic[]> {
  if (_categoryIndex) return _categoryIndex;
  const data = loadData();
  _categoryIndex = new Map();
  for (const t of data.topics) {
    if (!_categoryIndex.has(t.category)) _categoryIndex.set(t.category, []);
    _categoryIndex.get(t.category)!.push(t);
  }
  return _categoryIndex;
}

// ============================================
// Public API
// ============================================

/** Get a single quote topic by slug */
export function getQuoteTopic(slug: string): QuoteTopic | undefined {
  return getSlugIndex().get(slug);
}

/** Get all quote topics (sorted by verse count desc) */
export function getAllQuoteTopics(): QuoteTopic[] {
  return loadData().topics;
}

/** Get all slugs (for sitemap/static params) */
export function getAllQuoteSlugs(): string[] {
  return loadData().topics.map(t => t.slug);
}

/** Get topics by category */
export function getQuotesByCategory(category: string): QuoteTopic[] {
  return getCategoryIndex().get(category) || [];
}

/** Get all categories with counts */
export function getQuoteCategories(): { name: string; count: number; topTopics: QuoteTopic[] }[] {
  const catIndex = getCategoryIndex();
  const result: { name: string; count: number; topTopics: QuoteTopic[] }[] = [];
  for (const [name, topics] of catIndex) {
    result.push({
      name,
      count: topics.length,
      topTopics: topics.slice(0, 6), // Already sorted by verse count from processing
    });
  }
  // Sort: named categories first (Miscellaneous last), then by count
  return result.sort((a, b) => {
    if (a.name === 'Miscellaneous') return 1;
    if (b.name === 'Miscellaneous') return -1;
    return b.count - a.count;
  });
}

/** Get featured topics (high-search-volume topics for the hub) */
export function getFeaturedQuoteTopics(): QuoteTopic[] {
  const featured = [
    'love', 'faith', 'hope', 'peace', 'joy', 'strength', 'prayer',
    'forgiveness', 'healing', 'salvation', 'grace', 'fear', 'worry',
    'anger', 'grief', 'depression', 'marriage', 'money', 'trust',
    'patience', 'wisdom', 'comfort', 'courage', 'temptation', 'death',
    'heaven', 'gratitude', 'humility', 'protection', 'blessings',
    'holy-spirit', 'obedience', 'suffering', 'repentance', 'sin',
    'pride', 'jealousy', 'lying', 'gossip', 'self-control',
    'friendship', 'children', 'work', 'giving', 'baptism',
    'fasting', 'doubt', 'addiction', 'divorce', 'eternal-life',
  ];
  const index = getSlugIndex();
  return featured.map(s => index.get(s)).filter(Boolean) as QuoteTopic[];
}

/** Get related topics for a given slug */
export function getRelatedQuoteTopics(slug: string, limit: number = 8): QuoteTopic[] {
  const topic = getQuoteTopic(slug);
  if (!topic) return [];

  const index = getSlugIndex();
  const related: QuoteTopic[] = [];

  // First: explicitly related slugs
  for (const rel of topic.relatedSlugs) {
    const t = index.get(rel);
    if (t && t.slug !== slug) related.push(t);
    if (related.length >= limit) break;
  }

  // Pad with same-category topics if needed
  if (related.length < limit) {
    const sameCat = getQuotesByCategory(topic.category);
    for (const t of sameCat) {
      if (t.slug !== slug && !related.find(r => r.slug === t.slug)) {
        related.push(t);
      }
      if (related.length >= limit) break;
    }
  }

  return related.slice(0, limit);
}

/** Search topics by keyword */
export function searchQuoteTopics(query: string, limit: number = 20): QuoteTopic[] {
  const q = query.toLowerCase();
  const data = loadData();
  return data.topics
    .filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.slug.includes(q) ||
      t.keywords.some(k => k.toLowerCase().includes(q))
    )
    .slice(0, limit);
}

/** Get A-Z letter index with counts */
export function getQuoteLetterIndex(): { letter: string; count: number }[] {
  const data = loadData();
  const counts = new Map<string, number>();
  for (const t of data.topics) {
    const letter = t.name.charAt(0).toUpperCase();
    if (/[A-Z]/.test(letter)) {
      counts.set(letter, (counts.get(letter) || 0) + 1);
    }
  }
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => ({
    letter: l,
    count: counts.get(l) || 0,
  }));
}

/** Get topics starting with a specific letter */
export function getQuoteTopicsByLetter(letter: string): QuoteTopic[] {
  const data = loadData();
  const l = letter.toUpperCase();
  return data.topics.filter(t => t.name.charAt(0).toUpperCase() === l);
}

/** Total topic count */
export function getQuoteTopicCount(): number {
  return loadData().topics.length;
}

/** Total verse reference count */
export function getTotalVerseRefCount(): number {
  return loadData().totalVerseRefs;
}
