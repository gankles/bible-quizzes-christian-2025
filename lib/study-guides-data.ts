import fs from 'fs';
import path from 'path';

export interface StudyGuideSection {
  title: string;
  verses: string[];
  content: string;
  discussionQuestions?: string[];
}

export interface StudyGuide {
  title: string;
  slug: string;
  description: string;
  category: string;
  verses: string[];
  sections: StudyGuideSection[];
}

let _cache: StudyGuide[] | null = null;

function loadAll(): StudyGuide[] {
  if (_cache) return _cache;
  const dir = path.join(process.cwd(), 'data', 'kjvstudy', 'study_guides');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const guides: StudyGuide[] = [];

  for (const file of files) {
    try {
      const raw = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8'));
      guides.push({
        title: raw.catalog_entry.title,
        slug: raw.catalog_entry.slug || file.replace('.json', ''),
        description: raw.catalog_entry.description,
        category: raw.category || 'General',
        verses: raw.catalog_entry.verses || [],
        sections: (raw.content.sections || []).map((s: any) => ({
          title: s.title,
          verses: s.verses || [],
          content: s.content,
          discussionQuestions: s.discussion_questions,
        })),
      });
    } catch { /* skip malformed files */ }
  }

  guides.sort((a, b) => a.title.localeCompare(b.title));
  _cache = guides;
  return guides;
}

export function getAllStudyGuides(): StudyGuide[] {
  return loadAll();
}

export function getStudyGuideBySlug(slug: string): StudyGuide | undefined {
  return loadAll().find(g => g.slug === slug);
}

export function getStudyGuideCategories(): string[] {
  const cats = new Set(loadAll().map(g => g.category));
  return Array.from(cats).sort();
}

export function getStudyGuidesByCategory(category: string): StudyGuide[] {
  return loadAll().filter(g => g.category === category);
}
