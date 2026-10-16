import fs from 'fs';
import path from 'path';

export interface MorphologyBreakdownEntry {
  label: string;
  count: number;
}

let cache: Record<string, MorphologyBreakdownEntry[]> | null = null;

function load(): Record<string, MorphologyBreakdownEntry[]> {
  if (cache) return cache;
  try {
    const filePath = path.join(process.cwd(), 'data', 'lexicon-morphology.json');
    cache = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    cache = {};
  }
  return cache!;
}

/** Per-occurrence grammatical-form breakdown (e.g. "Singular Feminine, Construct": 43x) for a Strong's number. */
export function getMorphologyBreakdown(strongsId: string): MorphologyBreakdownEntry[] | null {
  return load()[strongsId.toUpperCase()] || null;
}
