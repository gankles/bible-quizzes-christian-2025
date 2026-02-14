/**
 * Loader for verse-context.json — provides person, place, and event data
 * for individual Bible verses. Used to enrich cross-reference pages.
 */

import fs from 'fs';
import path from 'path';

export interface PersonInfo {
  id: string;
  name: string;
  label: string;
  sex: string;
  attribute: string;
}

export interface PlaceInfo {
  id: string;
  name: string;
  label: string;
  type: string;
  modern: string;
}

export interface EventInfo {
  id: string;
  name: string;
  description: string;
  type: string;
  year: string;
}

export interface VerseContext {
  persons: PersonInfo[];
  places: PlaceInfo[];
  events: EventInfo[];
}

let cached: Record<string, VerseContext> | null = null;

function loadContextData(): Record<string, VerseContext> {
  if (cached) return cached;
  const filePath = path.join(process.cwd(), 'data', 'verse-context.json');
  if (!fs.existsSync(filePath)) {
    cached = {};
    return cached;
  }
  cached = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return cached!;
}

/**
 * Get context (persons, places, events) for a specific verse.
 * @param bookSlug - e.g. "genesis"
 * @param chapter - chapter number
 * @param verse - verse number
 */
export function getVerseContext(
  bookSlug: string,
  chapter: number,
  verse: number
): VerseContext | null {
  const data = loadContextData();
  const key = `${bookSlug}-${chapter}-${verse}`;
  return data[key] || null;
}
