import fs from 'fs';
import path from 'path';

export interface KeyEvent {
  age: number;
  event: string;
  verse: string;
}

export interface Biography {
  name: string;
  summary: string;
  significance: string;
  keyEvents: KeyEvent[];
}

interface BiographyFile {
  biographies: Record<string, {
    summary: string;
    significance: string;
    key_events: { age: number; event: string; verse: string }[];
  }>;
  aliases: Record<string, string>;
}

let _cache: BiographyFile | null = null;

function loadData(): BiographyFile {
  if (_cache) return _cache;
  const filePath = path.join(process.cwd(), 'data', 'kjvstudy', 'biographies.json');
  try {
    _cache = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    _cache = { biographies: {}, aliases: {} };
  }
  return _cache!;
}

export function getBiography(name: string): Biography | null {
  const data = loadData();
  // Check aliases first
  const canonicalName = data.aliases[name] || name;
  const bio = data.biographies[canonicalName];
  if (!bio) return null;
  return {
    name: canonicalName,
    summary: bio.summary,
    significance: bio.significance,
    keyEvents: bio.key_events || [],
  };
}

// Try to find by matching the person's display name
export function getAllBiographies(): Biography[] {
  const data = loadData();
  return Object.entries(data.biographies).map(([name, bio]) => ({
    name,
    summary: bio.summary,
    significance: bio.significance,
    keyEvents: bio.key_events || [],
  }));
}

export function getAllBiographyNames(): string[] {
  const data = loadData();
  return Object.keys(data.biographies);
}

export function findBiography(personName: string): Biography | null {
  const data = loadData();
  // Direct match
  if (data.biographies[personName]) {
    return getBiography(personName);
  }
  // Alias match
  if (data.aliases[personName]) {
    return getBiography(data.aliases[personName]);
  }
  // Case-insensitive match
  const lowerName = personName.toLowerCase();
  for (const key of Object.keys(data.biographies)) {
    if (key.toLowerCase() === lowerName) return getBiography(key);
  }
  for (const [alias, canonical] of Object.entries(data.aliases)) {
    if (alias.toLowerCase() === lowerName) return getBiography(canonical);
  }
  return null;
}
