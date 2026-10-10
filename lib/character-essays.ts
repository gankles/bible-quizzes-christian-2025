import fs from 'fs';
import path from 'path';

export interface CharacterEssayKeyEvent {
  event: string;
  verse: string;
}

export interface CharacterEssay {
  slug: string;
  name: string;
  overview: string;
  namesAndTitles: string;
  familyAndRelationships: string;
  scriptureSignificance: string;
  keyEvents: CharacterEssayKeyEvent[];
  generatedAt: string;
}

const cache = new Map<string, CharacterEssay | null>();

export function getCharacterEssay(slug: string): CharacterEssay | null {
  if (cache.has(slug)) return cache.get(slug)!;
  try {
    const filePath = path.join(process.cwd(), 'data', 'character-essays', `${slug}.json`);
    const essay = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    cache.set(slug, essay);
    return essay;
  } catch {
    cache.set(slug, null);
    return null;
  }
}
