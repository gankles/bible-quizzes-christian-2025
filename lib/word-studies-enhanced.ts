import fs from 'fs';
import path from 'path';

export interface WordStudy {
  word: string;
  otTerm?: string;
  otTransliteration?: string;
  otMeaning?: string;
  otStrongs: string[];
  otNote?: string;
  ntTerm?: string;
  ntTransliteration?: string;
  ntMeaning?: string;
  ntStrongs: string[];
  ntNote?: string;
}

let _cache: Map<string, WordStudy> | null = null;
let _strongsIndex: Map<string, WordStudy> | null = null;

function loadAll(): Map<string, WordStudy> {
  if (_cache) return _cache;
  _cache = new Map();

  const filePath = path.join(process.cwd(), 'data', 'kjvstudy', 'word_studies.json');
  try {
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    for (const [word, data] of Object.entries(raw as Record<string, any>)) {
      _cache.set(word, {
        word,
        otTerm: data.ot_term,
        otTransliteration: data.ot_transliteration,
        otMeaning: data.ot_meaning,
        otStrongs: data.ot_strongs || [],
        otNote: data.ot_note,
        ntTerm: data.nt_term,
        ntTransliteration: data.nt_transliteration,
        ntMeaning: data.nt_meaning,
        ntStrongs: data.nt_strongs || [],
        ntNote: data.nt_note,
      });
    }
  } catch {}

  return _cache;
}

function buildStrongsIndex(): Map<string, WordStudy> {
  if (_strongsIndex) return _strongsIndex;
  _strongsIndex = new Map();

  const all = loadAll();
  for (const study of all.values()) {
    for (const s of study.otStrongs) {
      _strongsIndex.set(s, study);
    }
    for (const s of study.ntStrongs) {
      _strongsIndex.set(s, study);
    }
  }

  return _strongsIndex;
}

export function getWordStudyByStrongs(strongsNumber: string): WordStudy | null {
  return buildStrongsIndex().get(strongsNumber) || null;
}

export function getAllWordStudies(): WordStudy[] {
  return Array.from(loadAll().values());
}
