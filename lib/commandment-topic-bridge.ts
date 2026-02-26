import fs from 'fs';
import path from 'path';
import { getAllCommandments, Commandment, categorySlug } from './commandments-data';

interface TopicEntry {
  name: string;
  slug: string;
  category: string;
  verseRefs: string[];
  keywords: string[];
}

let _topicsCache: TopicEntry[] | null = null;
let _bridgeCache: Map<string, Commandment[]> | null = null;
let _reverseCache: Map<number, { slug: string; name: string }[]> | null = null;

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

// Convert "EXO 20:2" → "exodus-20-2" to match topic verseRef format
const USX_MAP: Record<string, string> = {
  GEN: 'genesis', EXO: 'exodus', LEV: 'leviticus', NUM: 'numbers', DEU: 'deuteronomy',
};

function refIdToKey(refId: string): string {
  const match = refId.match(/^([A-Z]+)\s+(\d+):(\d+)/);
  if (!match) return '';
  const book = USX_MAP[match[1]] || match[1].toLowerCase();
  return `${book}-${match[2]}-${match[3]}`;
}

function refIdToChapterKey(refId: string): string {
  const match = refId.match(/^([A-Z]+)\s+(\d+)/);
  if (!match) return '';
  const book = USX_MAP[match[1]] || match[1].toLowerCase();
  return `${book}-${match[2]}`;
}

function buildBridge(): void {
  if (_bridgeCache) return;
  _bridgeCache = new Map();
  _reverseCache = new Map();

  const topics = loadTopics();
  const commandments = getAllCommandments();

  const topicData = topics.map(t => ({
    ...t,
    refSet: new Set(t.verseRefs),
    chapterRefs: new Set(t.verseRefs.map(r => {
      const parts = r.split('-');
      parts.pop();
      return parts.join('-');
    })),
    keywordSet: new Set([
      ...t.keywords.map(k => k.toLowerCase()),
      ...t.name.toLowerCase().split(/\s+/),
    ]),
  }));

  for (const topic of topicData) {
    const matches: Commandment[] = [];

    for (const cmd of commandments) {
      let relevance = 0;

      // Method 1: Verse overlap
      const cmdRefKey = refIdToKey(cmd.referenceId);
      const cmdChapterKey = refIdToChapterKey(cmd.referenceId);
      if (cmdRefKey && topic.refSet.has(cmdRefKey)) {
        relevance += 3;
      } else if (cmdChapterKey && topic.chapterRefs.has(cmdChapterKey)) {
        relevance += 1;
      }

      // Method 2: Concept keyword matching
      const conceptLower = cmd.concept.toLowerCase();
      for (const kw of topic.keywordSet) {
        if (kw.length >= 4 && conceptLower.includes(kw)) {
          relevance += 2;
        }
      }

      // Method 3: Topic name in concept
      const topicNameLower = topic.name.toLowerCase();
      if (topicNameLower.length >= 4 && conceptLower.includes(topicNameLower)) {
        relevance += 3;
      }

      // Method 4: Category matching
      const catLower = cmd.category.toLowerCase();
      if (topicNameLower.length >= 4 && catLower.includes(topicNameLower)) {
        relevance += 2;
      }

      if (relevance >= 6) {
        matches.push(cmd);
      }
    }

    if (matches.length >= 3) {
      _bridgeCache!.set(topic.slug, matches);

      for (const cmd of matches) {
        if (!_reverseCache!.has(cmd.number)) {
          _reverseCache!.set(cmd.number, []);
        }
        _reverseCache!.get(cmd.number)!.push({
          slug: topic.slug,
          name: topic.name,
        });
      }
    }
  }
}

export function getCommandmentsForTopic(topicSlug: string): Commandment[] {
  buildBridge();
  return _bridgeCache!.get(topicSlug) || [];
}

export function getTopicsForCommandment(num: number): { slug: string; name: string }[] {
  buildBridge();
  return _reverseCache!.get(num) || [];
}

export function getAllCommandmentTopicSlugs(): string[] {
  buildBridge();
  return Array.from(_bridgeCache!.keys());
}

export function getCommandmentTopicBridgeStats(): {
  totalBridgePages: number;
  totalCommandments: number;
  avgCommandmentsPerTopic: number;
} {
  buildBridge();
  const slugs = Array.from(_bridgeCache!.keys());
  const totalCmds = new Set<number>();
  let totalMatches = 0;
  for (const cmds of _bridgeCache!.values()) {
    totalMatches += cmds.length;
    for (const c of cmds) totalCmds.add(c.number);
  }
  return {
    totalBridgePages: slugs.length,
    totalCommandments: totalCmds.size,
    avgCommandmentsPerTopic: slugs.length > 0 ? Math.round(totalMatches / slugs.length) : 0,
  };
}
