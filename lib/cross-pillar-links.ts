/**
 * Cross-Pillar Link Resolver
 *
 * Given a topic, returns relevant links to other content pillars:
 * - Book chapter quizzes (based on verse refs)
 * - Characters (keyword matching)
 * - Lexicon concepts (topic name matching)
 * - Prayers (tag matching)
 * - Study guides (topic matching)
 * - Bible questions (tag matching)
 * - Word studies (topic name matching)
 */

import { BIBLE_BOOKS } from './bible-data';

export interface CrossPillarLink {
  type: 'quiz' | 'character' | 'lexicon' | 'prayer' | 'guide' | 'question' | 'word-study';
  label: string;
  href: string;
  description: string;
}

interface TopicInput {
  name: string;
  slug: string;
  category: string;
  verseRefs: string[];
  keywords: string[];
}

// Lazy-loaded data caches
let _characters: any[] | null = null;
let _prayers: any[] | null = null;
let _guides: any[] | null = null;
let _questions: any[] | null = null;
let _wordStudies: any[] | null = null;
let _concepts: any[] | null = null;
let _sermons: any[] | null = null;

function loadCharacters() {
  if (_characters) return _characters;
  try {
    const mod = require('@/data/characters.json');
    _characters = (mod.default || mod).characters || [];
  } catch { _characters = []; }
  return _characters!;
}

function loadPrayers() {
  if (_prayers) return _prayers;
  try {
    const mod = require('@/data/prayers.json');
    _prayers = (mod.default || mod).prayers || [];
  } catch { _prayers = []; }
  return _prayers!;
}

function loadGuides() {
  if (_guides) return _guides;
  try {
    const mod = require('@/data/bible-study-guides.json');
    _guides = (mod.default || mod).bibleStudyGuides || [];
  } catch { _guides = []; }
  return _guides!;
}

function loadQuestions() {
  if (_questions) return _questions;
  try {
    const mod = require('@/data/questions.json');
    _questions = (mod.default || mod).questions || [];
  } catch { _questions = []; }
  return _questions!;
}

function loadWordStudies() {
  if (_wordStudies) return _wordStudies;
  try {
    const mod = require('@/data/word-studies.json');
    _wordStudies = (mod.default || mod).wordStudies || [];
  } catch { _wordStudies = []; }
  return _wordStudies!;
}

function loadConcepts() {
  if (_concepts) return _concepts;
  try {
    _concepts = require('@/data/lexicon-concepts.json');
    if (!Array.isArray(_concepts)) _concepts = [];
  } catch { _concepts = []; }
  return _concepts!;
}

function loadSermons() {
  if (_sermons) return _sermons;
  try {
    const mod = require('@/data/sermon-illustrations.json');
    _sermons = (mod.default || mod).sermonIllustrations || [];
  } catch { _sermons = []; }
  return _sermons!;
}

/**
 * Extract unique book slugs from verse references like "genesis-1-1"
 */
function getBooksFromRefs(refs: string[]): string[] {
  const books = new Set<string>();
  for (const ref of refs) {
    const parts = ref.split('-');
    parts.pop(); // verse
    parts.pop(); // chapter
    const bookSlug = parts.join('-');
    if (bookSlug) books.add(bookSlug);
  }
  return Array.from(books);
}

/**
 * Resolve cross-pillar links for a topic.
 * Returns up to 8 links across different pillars.
 */
export function getCrossPillarLinks(topic: TopicInput): CrossPillarLink[] {
  const links: CrossPillarLink[] = [];
  const lowerName = topic.name.toLowerCase();
  const lowerKeywords = topic.keywords.map(k => k.toLowerCase());

  // 1. Book quiz links — from the books referenced in verseRefs
  const bookSlugs = getBooksFromRefs(topic.verseRefs);
  const matchedBooks = BIBLE_BOOKS.filter(b => bookSlugs.includes(b.slug));
  if (matchedBooks.length > 0) {
    // Pick the most-referenced book (first in verseRefs since they're sorted by quality)
    const primaryBook = matchedBooks[0];
    links.push({
      type: 'quiz',
      label: `${primaryBook.name} Quiz`,
      href: `/${primaryBook.slug}-chapters`,
      description: `Test your knowledge of ${primaryBook.name}`,
    });
  }

  // 2. Characters — keyword/name matching
  const characters = loadCharacters();
  for (const char of characters) {
    const charLower = char.name.toLowerCase();
    const charKeywords = (char.keywords || []).map((k: string) => k.toLowerCase());
    if (
      lowerName.includes(charLower) ||
      charLower.includes(lowerName) ||
      lowerKeywords.some(k => charKeywords.includes(k)) ||
      charKeywords.some((k: string) => lowerName.includes(k))
    ) {
      links.push({
        type: 'character',
        label: char.name,
        href: `/characters/${char.slug}`,
        description: `Study the life of ${char.name}`,
      });
      if (links.filter(l => l.type === 'character').length >= 2) break;
    }
  }

  // 3. Lexicon concepts — name matching
  const concepts = loadConcepts();
  for (const concept of concepts) {
    const conceptLower = (concept.name || '').toLowerCase();
    if (
      lowerName === conceptLower ||
      lowerName.includes(conceptLower) ||
      conceptLower.includes(lowerName)
    ) {
      links.push({
        type: 'lexicon',
        label: `"${concept.name}" in Greek/Hebrew`,
        href: `/lexicon/concept/${concept.slug}`,
        description: `Original language study of ${concept.name}`,
      });
      if (links.filter(l => l.type === 'lexicon').length >= 2) break;
    }
  }

  // 4. Word studies — direct name match
  const wordStudies = loadWordStudies();
  for (const ws of wordStudies) {
    const wsWord = (ws.word || ws.slug || '').toLowerCase();
    if (lowerName.includes(wsWord) || wsWord.includes(lowerName)) {
      links.push({
        type: 'word-study',
        label: `Word Study: ${ws.word || ws.slug}`,
        href: `/word-studies/${ws.language}/${ws.slug}`,
        description: `Deep dive into the ${ws.language} word "${ws.word || ws.slug}"`,
      });
      if (links.filter(l => l.type === 'word-study').length >= 1) break;
    }
  }

  // 5. Prayers — tag matching
  const prayers = loadPrayers();
  for (const prayer of prayers) {
    const tags = (prayer.tags || []).map((t: string) => t.toLowerCase());
    if (
      tags.includes(lowerName) ||
      tags.some((t: string) => lowerName.includes(t)) ||
      lowerKeywords.some(k => tags.includes(k))
    ) {
      links.push({
        type: 'prayer',
        label: prayer.title,
        href: `/prayers/${prayer.slug}`,
        description: `A prayer related to ${topic.name.toLowerCase()}`,
      });
      if (links.filter(l => l.type === 'prayer').length >= 1) break;
    }
  }

  // 6. Study guides — topic matching
  const guides = loadGuides();
  for (const guide of guides) {
    const guideTopics = (guide.topics || []).map((t: string) => t.toLowerCase());
    if (
      guideTopics.includes(lowerName) ||
      guideTopics.some((t: string) => lowerName.includes(t)) ||
      lowerKeywords.some(k => guideTopics.includes(k))
    ) {
      links.push({
        type: 'guide',
        label: guide.title,
        href: `/bible-study-guides/${guide.slug}`,
        description: `In-depth study guide covering ${topic.name.toLowerCase()}`,
      });
      if (links.filter(l => l.type === 'guide').length >= 1) break;
    }
  }

  // 7. Questions — tag matching
  const questions = loadQuestions();
  for (const q of questions) {
    const tags = (q.tags || []).map((t: string) => t.toLowerCase());
    if (
      tags.includes(lowerName) ||
      tags.some((t: string) => lowerName.includes(t)) ||
      lowerKeywords.some(k => tags.includes(k))
    ) {
      links.push({
        type: 'question',
        label: q.question,
        href: `/questions/${q.slug}`,
        description: `Common question about ${topic.name.toLowerCase()}`,
      });
      if (links.filter(l => l.type === 'question').length >= 1) break;
    }
  }

  // Return up to 8 links, deduplicated
  const seen = new Set<string>();
  return links.filter(l => {
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  }).slice(0, 8);
}
