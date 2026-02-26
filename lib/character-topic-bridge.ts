import fs from 'fs';
import path from 'path';
import { getAllBiographies, Biography } from './biographies-data';
import { getCharacterQuizSlug } from './character-quiz-generator';

interface TopicEntry {
  name: string;
  slug: string;
  category: string;
  verseRefs: string[];
  keywords: string[];
}

interface CharacterForTopic {
  name: string;
  slug: string;
  significance: string;
  relevance: number;
}

interface TopicForCharacter {
  slug: string;
  name: string;
}

let _topicsCache: TopicEntry[] | null = null;
let _bridgeCache: Map<string, CharacterForTopic[]> | null = null;
let _reverseCache: Map<string, TopicForCharacter[]> | null = null;

function loadTopics(): TopicEntry[] {
  if (_topicsCache) return _topicsCache;
  try {
    const filePath = path.join(process.cwd(), 'data', 'topics.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    _topicsCache = (data.topics || []).map((t: any) => ({
      name: t.name,
      slug: t.slug,
      category: t.category || '',
      verseRefs: t.verseRefs || [],
      keywords: t.keywords || [],
    }));
  } catch {
    _topicsCache = [];
  }
  return _topicsCache!;
}

// Convert "Genesis 2:7" → "genesis-2-7" format to match topic verseRefs
function verseToRefKey(verse: string): string {
  return verse
    .toLowerCase()
    .replace(/:/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// Convert "Genesis 2:7" → just "genesis-2" (chapter level)
function verseToChapterKey(verse: string): string {
  const match = verse.match(/^(.+?)\s+(\d+)/);
  if (!match) return '';
  return `${match[1].toLowerCase().replace(/\s+/g, '-')}-${match[2]}`;
}

function buildBridge(): void {
  if (_bridgeCache) return;
  _bridgeCache = new Map();
  _reverseCache = new Map();

  const topics = loadTopics();
  const bios = getAllBiographies();

  // Build topic verseRef sets and keyword sets for matching
  const topicData = topics.map(t => ({
    ...t,
    refSet: new Set(t.verseRefs),
    chapterRefs: new Set(t.verseRefs.map(r => {
      const parts = r.split('-');
      parts.pop(); // remove verse
      return parts.join('-');
    })),
    keywordSet: new Set([
      ...t.keywords.map(k => k.toLowerCase()),
      ...t.name.toLowerCase().split(/\s+/),
    ]),
  }));

  for (const topic of topicData) {
    const matches: CharacterForTopic[] = [];

    for (const bio of bios) {
      let relevance = 0;

      // Method 1: Verse overlap — character's verse refs match topic verse refs
      for (const event of bio.keyEvents) {
        const refKey = verseToRefKey(event.verse);
        const chapterKey = verseToChapterKey(event.verse);
        if (topic.refSet.has(refKey)) {
          relevance += 3; // Exact verse match
        } else if (topic.chapterRefs.has(chapterKey)) {
          relevance += 1; // Chapter-level match
        }
      }

      // Method 2: Keyword matching — bio summary/significance mentions topic keywords
      const bioText = `${bio.summary} ${bio.significance}`.toLowerCase();
      const charNameLower = bio.name.toLowerCase();

      for (const kw of topic.keywordSet) {
        if (kw.length >= 4 && bioText.includes(kw)) {
          relevance += 2;
        }
      }

      // Method 3: Topic name appears in bio text
      const topicNameLower = topic.name.toLowerCase();
      if (topicNameLower.length >= 4 && bioText.includes(topicNameLower)) {
        relevance += 3;
      }

      // Method 4: Character name appears in topic keywords
      if (topic.keywordSet.has(charNameLower)) {
        relevance += 5;
      }

      if (relevance >= 6) {
        matches.push({
          name: bio.name,
          slug: getCharacterQuizSlug(bio.name),
          significance: bio.significance,
          relevance,
        });
      }
    }

    if (matches.length >= 3) {
      const sorted = matches.sort((a, b) => b.relevance - a.relevance);
      _bridgeCache!.set(topic.slug, sorted);

      // Build reverse index
      for (const match of sorted) {
        if (!_reverseCache!.has(match.slug)) {
          _reverseCache!.set(match.slug, []);
        }
        _reverseCache!.get(match.slug)!.push({
          slug: topic.slug,
          name: topic.name,
        });
      }
    }
  }
}

export function getCharactersForTopic(topicSlug: string): CharacterForTopic[] {
  buildBridge();
  return _bridgeCache!.get(topicSlug) || [];
}

export function getTopicsForCharacter(charSlug: string): TopicForCharacter[] {
  buildBridge();
  return _reverseCache!.get(charSlug) || [];
}

export function getAllCharacterTopicBridgeSlugs(): string[] {
  buildBridge();
  return Array.from(_bridgeCache!.keys());
}

export function getCharacterTopicBridgeStats(): {
  totalBridgePages: number;
  totalCharacters: number;
  avgCharactersPerTopic: number;
} {
  buildBridge();
  const slugs = Array.from(_bridgeCache!.keys());
  const totalChars = new Set<string>();
  let totalMatches = 0;
  for (const chars of _bridgeCache!.values()) {
    totalMatches += chars.length;
    for (const c of chars) totalChars.add(c.slug);
  }
  return {
    totalBridgePages: slugs.length,
    totalCharacters: totalChars.size,
    avgCharactersPerTopic: slugs.length > 0 ? Math.round(totalMatches / slugs.length) : 0,
  };
}
