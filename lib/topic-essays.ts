import fs from 'fs';
import path from 'path';

export interface TopicEssay {
  slug: string;
  name: string;
  overview: string;
  generatedAt: string;
}

const cache = new Map<string, TopicEssay | null>();

export function getTopicEssay(slug: string): TopicEssay | null {
  if (cache.has(slug)) return cache.get(slug)!;
  try {
    const filePath = path.join(process.cwd(), 'data', 'topic-essays', `${slug}.json`);
    const essay = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    cache.set(slug, essay);
    return essay;
  } catch {
    cache.set(slug, null);
    return null;
  }
}
