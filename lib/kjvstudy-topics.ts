import fs from 'fs';
import path from 'path';

export interface TopicVerse {
  ref: string;
  note: string;
}

export interface Subtopic {
  name: string;
  description: string;
  verses: TopicVerse[];
}

export interface KjvStudyTopic {
  name: string;
  slug: string;
  description: string;
  overview?: string;
  subtopics: Subtopic[];
}

let _cache: Map<string, KjvStudyTopic> | null = null;

function loadAll(): Map<string, KjvStudyTopic> {
  if (_cache) return _cache;
  _cache = new Map();

  const dir = path.join(process.cwd(), 'data', 'kjvstudy', 'topics');
  try {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    for (const file of files) {
      const raw = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8'));
      const topicName = Object.keys(raw)[0];
      const data = raw[topicName];
      const slug = file.replace('.json', '').replace(/_/g, '-');

      const subtopics: Subtopic[] = [];
      if (data.subtopics && typeof data.subtopics === 'object') {
        for (const [name, sub] of Object.entries(data.subtopics as Record<string, any>)) {
          subtopics.push({
            name,
            description: sub.description || '',
            verses: (sub.verses || []).map((v: any) => ({ ref: v.ref, note: v.note })),
          });
        }
      }

      const topic: KjvStudyTopic = {
        name: topicName,
        slug,
        description: data.description || '',
        overview: data.overview,
        subtopics,
      };

      _cache.set(slug, topic);
    }
  } catch {}

  return _cache;
}

export function getKjvStudyTopic(slug: string): KjvStudyTopic | null {
  return loadAll().get(slug) || null;
}

export function getAllKjvStudyTopics(): KjvStudyTopic[] {
  return Array.from(loadAll().values());
}
