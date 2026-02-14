import fs from 'fs';
import path from 'path';
import { BIBLE_BOOKS } from './bible-data';
import { getAllBibleNames } from './bible-names-data';
import { getAllPeople } from './people-data';
import { getAllEpochs } from './timeline-data';
import { getAllStories } from './bible-stories-data';
import { getAllNaveTopics, getAllNaveTopicBookCombos } from './naves-data';
import { getAllCategories, getAllCommandments } from './commandments-data';

export interface SitemapUrl {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const baseUrl = 'https://biblemaximum.com';
const now = new Date();

// Load cross-reference verse keys from data file
function getCrossReferenceKeys(): string[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'cross-references.json');
    if (!fs.existsSync(filePath)) return [];
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return Object.keys(data);
  } catch {
    return [];
  }
}

// Load topic slugs from data file
function getTopicSlugs(): string[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'topics.json');
    if (!fs.existsSync(filePath)) return [];
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return (data.topics || []).map((t: any) => t.slug);
  } catch {
    return [];
  }
}

// Load lexicon entry IDs from data file
function getLexiconIds(): string[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'lexicon.json');
    if (!fs.existsSync(filePath)) return [];
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return (data.entries || []).map((e: any) => e.strongs);
  } catch {
    return [];
  }
}

// Load lexicon concept slugs
function getLexiconConceptSlugs(): string[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'lexicon-concepts.json');
    if (!fs.existsSync(filePath)) return [];
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data.map((c: any) => c.slug);
  } catch {
    return [];
  }
}

// Generate all URLs for pages that actually exist
export function generateAllUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];

  // 1. Static pages (hardcoded routes in app/)
  const staticPages = [
    { path: '/', priority: 1.0, changeFreq: 'weekly' as const },
    { path: '/bible-quizzes', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/old-testament-quizzes', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/new-testament-quizzes', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/chapter-quizzes', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/about', priority: 0.4, changeFreq: 'monthly' as const },
    { path: '/contact', priority: 0.4, changeFreq: 'monthly' as const },
    { path: '/privacy-policy', priority: 0.3, changeFreq: 'yearly' as const },
    { path: '/terms-of-service', priority: 0.3, changeFreq: 'yearly' as const },
    { path: '/bible-characters', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/bible-quiz-difficulty', priority: 0.5, changeFreq: 'monthly' as const },
    { path: '/bible-quiz-faq', priority: 0.5, changeFreq: 'monthly' as const },
    { path: '/how-bible-quiz-works', priority: 0.5, changeFreq: 'monthly' as const },
    { path: '/bible-study-guides', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/site-map', priority: 0.3, changeFreq: 'monthly' as const },
    { path: '/characters', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/topics', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/lexicon', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/lexicon/browse/greek', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/lexicon/browse/hebrew', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/word-studies', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/cross-references', priority: 0.7, changeFreq: 'monthly' as const },
  ];

  staticPages.forEach(page => {
    urls.push({
      url: `${baseUrl}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFreq,
      priority: page.priority,
    });
  });

  // 2. Book chapters pages (/{book}-chapters) — all 66 books
  BIBLE_BOOKS.forEach(book => {
    urls.push({
      url: `${baseUrl}/${book.slug}-chapters`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // 3. Book quizzes (/{book}-quiz) — all 66 books
  BIBLE_BOOKS.forEach(book => {
    urls.push({
      url: `${baseUrl}/${book.slug}-quiz`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // 4. Chapter quizzes (/{book}-{chapter}-quiz) — all 1,189 chapters
  BIBLE_BOOKS.forEach(book => {
    for (let chapter = 1; chapter <= book.chapters; chapter++) {
      urls.push({
        url: `${baseUrl}/${book.slug}-${chapter}-quiz`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  });

  // 5. Book info pages (/books/{book}) — all 66 books
  BIBLE_BOOKS.forEach(book => {
    urls.push({
      url: `${baseUrl}/books/${book.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  // 6. Lexicon Strong's pages (/lexicon/{strongs}) — Greek & Hebrew
  const lexiconIds = getLexiconIds();
  lexiconIds.forEach(id => {
    urls.push({
      url: `${baseUrl}/lexicon/${id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  // 7. Lexicon concept pages (/lexicon/concept/{slug})
  const conceptSlugs = getLexiconConceptSlugs();
  conceptSlugs.forEach(slug => {
    urls.push({
      url: `${baseUrl}/lexicon/concept/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // 8. Verse study pages (/verses/{book}/{chapter}/{verse}) — from cross-references data
  const verseKeys = getCrossReferenceKeys();
  verseKeys.forEach(key => {
    // key format: "genesis-1-1" → /verses/genesis/1/1
    const parts = key.split('-');
    // Handle multi-word books like "1-samuel-1-1" or "song-of-solomon-1-1"
    // Find the last two numeric parts as chapter and verse
    let verse = parts.pop()!;
    let chapter = parts.pop()!;
    const bookSlug = parts.join('-');
    if (bookSlug && chapter && verse) {
      urls.push({
        url: `${baseUrl}/verses/${bookSlug}/${chapter}/${verse}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  });

  // 9. Verse chapter index pages (/verses/{book}/{chapter}) — all 1,189 chapters
  BIBLE_BOOKS.forEach(book => {
    for (let chapter = 1; chapter <= book.chapters; chapter++) {
      urls.push({
        url: `${baseUrl}/verses/${book.slug}/${chapter}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
  });

  // 10. Verse book index pages (/verses/{book}) — all 66 books
  BIBLE_BOOKS.forEach(book => {
    urls.push({
      url: `${baseUrl}/verses/${book.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  // 11. Chapter reading pages with cross-references (/chapters/{book}/{chapter})
  BIBLE_BOOKS.forEach(book => {
    for (let chapter = 1; chapter <= book.chapters; chapter++) {
      urls.push({
        url: `${baseUrl}/chapters/${book.slug}/${chapter}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  });

  // 12. Topic pages (/topics/{slug})
  const topicSlugs = getTopicSlugs();
  topicSlugs.forEach(slug => {
    urls.push({
      url: `${baseUrl}/topics/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // 12b. Topic-in-book pages (/topics/{slug}/in/{book})
  try {
    const topicsJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'topics.json'), 'utf-8'));
    const seen = new Set<string>();
    for (const topic of topicsJson.topics || []) {
      if (!topic.verseRefs?.length) continue;
      const books = new Set<string>();
      for (const ref of topic.verseRefs) {
        const parts = ref.split('-');
        parts.pop(); // verse
        parts.pop(); // chapter
        const bookSlug = parts.join('-');
        if (bookSlug) books.add(bookSlug);
      }
      for (const book of books) {
        const key = `${topic.slug}:${book}`;
        if (!seen.has(key)) {
          seen.add(key);
          urls.push({
            url: `${baseUrl}/topics/${topic.slug}/in/${book}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.4,
          });
        }
      }
    }
  } catch {}

  // 13. Cross-reference pages (/cross-references/{book}/{chapter}/{verse})
  verseKeys.forEach(key => {
    const parts = key.split('-');
    let verse = parts.pop()!;
    let chapter = parts.pop()!;
    const bookSlug = parts.join('-');
    if (bookSlug && chapter && verse) {
      urls.push({
        url: `${baseUrl}/cross-references/${bookSlug}/${chapter}/${verse}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
  });

  // 14. Bible names (/bible-names/{name}) — ~2,623 pages
  try {
    const names = getAllBibleNames();
    urls.push({ url: `${baseUrl}/bible-names`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 });
    names.forEach(n => {
      urls.push({ url: `${baseUrl}/bible-names/${n.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 });
    });
  } catch {}

  // 15. People (/people/{slug}) — ~3,009 pages
  try {
    const people = getAllPeople();
    urls.push({ url: `${baseUrl}/people`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 });
    people.forEach(p => {
      urls.push({ url: `${baseUrl}/people/${p.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 });
    });
  } catch {}

  // 15b. Characters (/characters/{slug})
  try {
    const charModule = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'characters.json'), 'utf-8'));
    const characters = charModule.characters || charModule;
    urls.push({ url: `${baseUrl}/characters`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 });
    characters.forEach((c: any) => {
      if (c.slug) {
        urls.push({ url: `${baseUrl}/characters/${c.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 });
      }
    });
  } catch {}

  // 16. Timeline (/timeline/{slug}) — ~114 pages
  try {
    const epochs = getAllEpochs();
    urls.push({ url: `${baseUrl}/timeline`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 });
    epochs.forEach(e => {
      urls.push({ url: `${baseUrl}/timeline/${e.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 });
    });
  } catch {}

  // 17. Bible stories (/bible-stories/{slug}) — ~372 pages
  try {
    const stories = getAllStories();
    urls.push({ url: `${baseUrl}/bible-stories`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 });
    stories.forEach(s => {
      urls.push({ url: `${baseUrl}/bible-stories/${s.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 });
    });
  } catch {}

  // 18. Nave's topics (/nave-topics/{slug}) — ~5,319 pages
  try {
    const naveTopics = getAllNaveTopics();
    urls.push({ url: `${baseUrl}/nave-topics`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 });
    naveTopics.forEach(t => {
      urls.push({ url: `${baseUrl}/nave-topics/${t.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 });
    });
  } catch {}

  // 19. Nave's topic-book combos (/nave-topics/{slug}/in/{book}) — ~21,323 pages
  try {
    const combos = getAllNaveTopicBookCombos();
    combos.forEach(c => {
      urls.push({ url: `${baseUrl}/nave-topics/${c.topic}/in/${c.book}`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 });
    });
  } catch {}

  // 20. Commandments (/commandments/{number}) — 613 pages
  try {
    const cmds = getAllCommandments();
    urls.push({ url: `${baseUrl}/commandments`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 });
    cmds.forEach(c => {
      urls.push({ url: `${baseUrl}/commandments/${c.number}`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 });
    });
  } catch {}

  // 21. Commandment categories (/commandments/category/{slug}) — ~30 pages
  try {
    const cats = getAllCategories();
    cats.forEach(c => {
      urls.push({ url: `${baseUrl}/commandments/category/${c.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 });
    });
  } catch {}

  return urls;
}

// ── Chunking helpers ──

export interface SitemapChunk {
  name: string;
  urls: SitemapUrl[];
}

/** Group URLs by first path segment (e.g. "verses", "lexicon", "topics") */
export function groupUrlsByPattern(urls: SitemapUrl[]): Record<string, SitemapUrl[]> {
  const groups: Record<string, SitemapUrl[]> = {};
  for (const u of urls) {
    const p = u.url.replace(baseUrl, '');
    const seg = p.split('/').filter(Boolean)[0] || 'pages';
    if (!groups[seg]) groups[seg] = [];
    groups[seg].push(u);
  }
  return groups;
}

/** Split grouped URLs into named chunks of at most `max` URLs each */
export function splitIntoChunks(grouped: Record<string, SitemapUrl[]>, max: number): SitemapChunk[] {
  const chunks: SitemapChunk[] = [];
  for (const [pattern, urls] of Object.entries(grouped)) {
    for (let i = 0; i < urls.length; i += max) {
      const slice = urls.slice(i, i + max);
      const suffix = urls.length > max ? `-${Math.floor(i / max) + 1}` : '';
      chunks.push({ name: `sitemap-${pattern}${suffix}`, urls: slice });
    }
  }
  return chunks;
}

// Generate sitemap XML content
export function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls.map(urlData => {
    return `  <url>
    <loc>${urlData.url}</loc>
    <lastmod>${urlData.lastModified.toISOString()}</lastmod>
    <changefreq>${urlData.changeFrequency}</changefreq>
    <priority>${urlData.priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// Generate sitemap index XML pointing to sub-sitemaps
export function generateSitemapIndex(items: string[] | SitemapChunk[]): string {
  const entries = items.map(item => {
    const name = typeof item === 'string' ? item : `${item.name}.xml`;
    return `  <sitemap>
    <loc>${baseUrl}/${name}</loc>
    <lastmod>${now.toISOString()}</lastmod>
  </sitemap>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;
}
