import fs from 'fs';
import path from 'path';

export interface BookOutlineItem {
  section: string;
  chapters: string;
  description: string;
}

export interface BookTheme {
  theme: string;
  description: string;
}

export interface BookKeyVerse {
  reference: string;
  text: string;
}

export interface BookIntroduction {
  name: string;
  introduction: string;
  outline: BookOutlineItem[];
  keyThemes: BookTheme[];
  keyVerses: BookKeyVerse[];
  christInBook: string;
  historicalContext: string;
  theologicalSignificance: string;
  practicalApplication: string;
}

interface RawBookData {
  name: string;
  introduction: string;
  outline: { section: string; chapters: string; description: string }[];
  key_themes: { theme: string; description: string }[];
  key_verses: { reference: string; text: string }[];
  christ_in_book: string;
  historical_context: string;
  theological_significance: string;
  practical_application: string;
}

// Cache: slug -> BookIntroduction
const cache: Record<string, BookIntroduction | null> = {};

// Build slug-to-filename mapping by scanning the directory
let slugToFile: Record<string, string> | null = null;

function buildSlugMap(): Record<string, string> {
  if (slugToFile) return slugToFile;
  slugToFile = {};
  const dir = path.join(process.cwd(), 'data', 'kjvstudy', 'books');
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      // e.g. "1_samuel.json" -> slug "1-samuel"
      // e.g. "song_of_solomon.json" -> slug "song-of-solomon"
      const slug = file.replace('.json', '').replace(/_/g, '-');
      slugToFile[slug] = file;
    }
  } catch {
    // Directory not found - return empty map
  }
  return slugToFile;
}

export function getBookIntroduction(bookSlug: string): BookIntroduction | null {
  if (bookSlug in cache) return cache[bookSlug];

  const map = buildSlugMap();
  const filename = map[bookSlug];
  if (!filename) {
    cache[bookSlug] = null;
    return null;
  }

  const filePath = path.join(process.cwd(), 'data', 'kjvstudy', 'books', filename);
  try {
    const raw: RawBookData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const intro: BookIntroduction = {
      name: raw.name,
      introduction: raw.introduction || '',
      outline: (raw.outline || []).map(o => ({
        section: o.section,
        chapters: o.chapters,
        description: o.description,
      })),
      keyThemes: (raw.key_themes || []).map(t => ({
        theme: t.theme,
        description: t.description,
      })),
      keyVerses: (raw.key_verses || []).map(v => ({
        reference: v.reference,
        text: v.text,
      })),
      christInBook: raw.christ_in_book || '',
      historicalContext: raw.historical_context || '',
      theologicalSignificance: raw.theological_significance || '',
      practicalApplication: raw.practical_application || '',
    };
    cache[bookSlug] = intro;
    return intro;
  } catch {
    cache[bookSlug] = null;
    return null;
  }
}
