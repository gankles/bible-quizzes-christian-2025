import fs from 'fs';
import path from 'path';
import { BIBLE_BOOKS } from './bible-data';
import { getAllBibleNames } from './bible-names-data';
import { getAllPeople } from './people-data';
import { getAllEpochs } from './timeline-data';
import { getAllStories } from './bible-stories-data';
import { getAllNaveTopics, getAllNaveTopicBookCombos } from './naves-data';
import { getAllCategories, getAllCommandments } from './commandments-data';
import { getAllInterlinearBookSlugs, getInterlinearChapters, getInterlinearChapterVerses, getBookName } from './interlinear-data';
import { getAllResources, getAllResourceItemSlugs } from './resources-data';
import { getAllDevotionals } from './devotionals-data';
import { getAllCharacterQuizSlugs } from './character-quiz-generator';
import { getAllCharacterTopicBridgeSlugs } from './character-topic-bridge';
import { getAllCommandmentTopicSlugs } from './commandment-topic-bridge';
import { getAllEraGeographySlugs } from './timeline-geography-bridge';
import { getAllReadingPlans } from './reading-plans-data';
import { getAllStudyGuides } from './study-guides-data';
import { getAllPlaceSlugs, getAllVersePlaceKeys, getBooksWithPlaces, getPlacesByBookChapterKeys, getAllPlaceTypes } from './geocoding-data';
import { getAllHebrewSlugs, getAllGreekSlugs } from './strongs-data';
import { getAllChainStudies } from './chain-data';
import { getAllEncyclopediaSlugs } from './encyclopedia-data';
import { getAllGrammarForms } from './grammar-data';

export interface SitemapUrl {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  group: string;
}

const baseUrl = 'https://biblemaximum.com';
const now = new Date();

// Realistic date ranges per content group — simulates gradual site growth
const GROUP_DATE_RANGES: Record<string, [string, string]> = {
  'pages':            ['2025-10-01', '2025-10-15'],
  'book-chapters':    ['2025-10-20', '2025-11-05'],
  'book-quizzes':     ['2025-11-01', '2025-11-15'],
  'chapter-quizzes':  ['2025-11-10', '2025-12-15'],
  'book-info':        ['2025-11-05', '2025-11-20'],
  'lexicon':          ['2025-12-01', '2026-01-10'],
  'verses':           ['2025-12-10', '2026-01-20'],
  'chapter-reading':  ['2025-12-15', '2026-01-05'],
  'topics':           ['2026-01-01', '2026-01-25'],
  'cross-references': ['2026-01-10', '2026-02-01'],
  'bible-names':      ['2025-12-20', '2026-01-05'],
  'people':           ['2025-12-25', '2026-01-10'],
  'characters':       ['2025-12-15', '2025-12-20'],
  'timeline':         ['2025-12-01', '2025-12-10'],
  'bible-stories':    ['2025-12-05', '2025-12-15'],
  'nave-topics':      ['2026-01-15', '2026-02-05'],
  'commandments':     ['2026-01-25', '2026-02-10'],
  'interlinear':      ['2026-01-15', '2026-02-15'],
  'resource-items':   ['2026-02-05', '2026-02-18'],
  'resources':        ['2026-01-20', '2026-02-05'],
  'devotionals':      ['2026-01-15', '2026-02-10'],
  'reading-plans':    ['2026-01-25', '2026-02-08'],
  'study-guides':     ['2026-01-10', '2026-02-01'],
  'bible-places':     ['2026-02-01', '2026-02-20'],
  'verse-places':     ['2026-02-05', '2026-02-20'],
  'bible-geography':  ['2026-02-05', '2026-02-20'],
  'geography-quizzes': ['2026-02-10', '2026-02-20'],
  'chapter-summaries': ['2026-02-10', '2026-02-23'],
  'lexicon-concepts': ['2026-02-15', '2026-02-23'],
  'character-quizzes': ['2026-02-20', '2026-02-25'],
  'characters-by-topic': ['2026-02-20', '2026-02-25'],
  'commandments-by-topic': ['2026-02-20', '2026-02-25'],
  'timeline-geography': ['2026-02-20', '2026-02-25'],
  'hebrew-word':        ['2026-02-20', '2026-02-26'],
  'greek-word':         ['2026-02-20', '2026-02-26'],
  'bible-topics':       ['2026-02-20', '2026-02-26'],
  'chain-study':        ['2026-02-22', '2026-02-26'],
  'bible-encyclopedia': ['2026-02-22', '2026-02-26'],
  'greek-grammar':      ['2026-02-24', '2026-02-26'],
  'pillar-pages':       ['2026-02-18', '2026-02-26'],
};

/** Assign realistic, gradually-spread lastmod dates per content group */
export function assignRealisticDates(urls: SitemapUrl[]): void {
  const grouped: Record<string, SitemapUrl[]> = {};
  for (const u of urls) {
    const key = u.group || 'pages';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(u);
  }

  for (const [group, groupUrls] of Object.entries(grouped)) {
    const range = GROUP_DATE_RANGES[group] || ['2026-01-15', '2026-02-10'];
    const start = new Date(range[0]).getTime();
    const end = new Date(range[1]).getTime();
    const span = end - start;

    for (let i = 0; i < groupUrls.length; i++) {
      const offset = groupUrls.length > 1 ? (i / (groupUrls.length - 1)) * span : 0;
      groupUrls[i].lastModified = new Date(start + offset);
    }
  }
}

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

function makeUrl(url: string, group: string, priority: number, changeFrequency: SitemapUrl['changeFrequency'] = 'monthly'): SitemapUrl {
  return { url, lastModified: now, changeFrequency, priority, group };
}

// Generate all URLs for pages that actually exist
export function generateAllUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];

  // 1. Static pages
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
    { path: '/books-of-the-bible', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/books-of-the-bible/old-testament', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/books-of-the-bible/new-testament', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/famous-bible-verses', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/how-to-study-the-bible', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/bible-study-for-beginners', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/bible-trivia', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/bible-maps', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/hebrew-words', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/greek-words', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/bible-quiz-difficulty/easy', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/bible-quiz-difficulty/medium', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/bible-quiz-difficulty/hard', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/bible-quiz-difficulty/theological', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/love', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/strength', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/faith', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/death', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/healing', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/anxiety', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/prayer', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/forgiveness', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/hope', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/marriage', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/peace', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/patience', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/money', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/friendship', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/worry', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/jealousy', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/fear', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/anger', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/gratitude', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/humility', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/pride', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/temptation', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/salvation', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/grace', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/what-does-the-bible-say-about/joy', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/bible-chapter-summaries', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/bible-geography-quiz', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/bible-book-names', priority: 0.5, changeFreq: 'monthly' as const },
    { path: '/kids-bible-quiz', priority: 0.5, changeFreq: 'monthly' as const },
  ];

  staticPages.forEach(page => {
    urls.push(makeUrl(`${baseUrl}${page.path}`, 'pages', page.priority, page.changeFreq));
  });

  // 2. Book chapters pages (/{book}-chapters) — all 66 books
  BIBLE_BOOKS.forEach(book => {
    urls.push(makeUrl(`${baseUrl}/${book.slug}-chapters`, 'book-chapters', 0.8));
  });

  // 3. Book quizzes (/{book}-quiz) — all 66 books
  BIBLE_BOOKS.forEach(book => {
    urls.push(makeUrl(`${baseUrl}/${book.slug}-quiz`, 'book-quizzes', 0.7));
  });

  // 4. Chapter quizzes (/{book}-{chapter}-quiz) — all 1,189 chapters
  BIBLE_BOOKS.forEach(book => {
    for (let chapter = 1; chapter <= book.chapters; chapter++) {
      urls.push(makeUrl(`${baseUrl}/${book.slug}-${chapter}-quiz`, 'chapter-quizzes', 0.6));
    }
  });

  // 5. Book info pages (/books/{book}) — all 66 books
  BIBLE_BOOKS.forEach(book => {
    urls.push(makeUrl(`${baseUrl}/books/${book.slug}`, 'book-info', 0.5));
  });

  // 6. Lexicon Strong's pages (/lexicon/{strongs}) — Greek & Hebrew
  const lexiconIds = getLexiconIds();
  lexiconIds.forEach(id => {
    urls.push(makeUrl(`${baseUrl}/lexicon/${id}`, 'lexicon', 0.5));
  });

  // 7. Lexicon concept pages (/lexicon/concept/{slug})
  const conceptSlugs = getLexiconConceptSlugs();
  conceptSlugs.forEach(slug => {
    urls.push(makeUrl(`${baseUrl}/lexicon/concept/${slug}`, 'lexicon-concepts', 0.6));
  });

  // 8. Verse study pages (/verses/{book}/{chapter}/{verse})
  const verseKeys = getCrossReferenceKeys();
  verseKeys.forEach(key => {
    const parts = key.split('-');
    let verse = parts.pop()!;
    let chapter = parts.pop()!;
    const bookSlug = parts.join('-');
    if (bookSlug && chapter && verse) {
      urls.push(makeUrl(`${baseUrl}/verses/${bookSlug}/${chapter}/${verse}`, 'verses', 0.6));
    }
  });

  // 9. Verse chapter index pages (/verses/{book}/{chapter}) — all 1,189 chapters
  BIBLE_BOOKS.forEach(book => {
    for (let chapter = 1; chapter <= book.chapters; chapter++) {
      urls.push(makeUrl(`${baseUrl}/verses/${book.slug}/${chapter}`, 'verses', 0.5));
    }
  });

  // 10. Verse book index pages (/verses/{book}) — all 66 books
  BIBLE_BOOKS.forEach(book => {
    urls.push(makeUrl(`${baseUrl}/verses/${book.slug}`, 'verses', 0.5));
  });

  // 11. Chapter reading pages (/chapters/{book}/{chapter})
  BIBLE_BOOKS.forEach(book => {
    for (let chapter = 1; chapter <= book.chapters; chapter++) {
      urls.push(makeUrl(`${baseUrl}/chapters/${book.slug}/${chapter}`, 'chapter-reading', 0.6));
    }
  });

  // 12. Topic pages (/topics/{slug})
  const topicSlugs = getTopicSlugs();
  topicSlugs.forEach(slug => {
    urls.push(makeUrl(`${baseUrl}/topics/${slug}`, 'topics', 0.6));
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
          urls.push(makeUrl(`${baseUrl}/topics/${topic.slug}/in/${book}`, 'topics', 0.4));
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
      urls.push(makeUrl(`${baseUrl}/cross-references/${bookSlug}/${chapter}/${verse}`, 'cross-references', 0.5));
    }
  });

  // 14. Bible names (/bible-names/{name}) — ~2,623 pages
  try {
    const names = getAllBibleNames();
    urls.push(makeUrl(`${baseUrl}/bible-names`, 'bible-names', 0.7));
    names.forEach(n => {
      urls.push(makeUrl(`${baseUrl}/bible-names/${n.slug}`, 'bible-names', 0.4));
    });
  } catch {}

  // 15. People (/people/{slug}) — ~3,009 pages
  try {
    const people = getAllPeople();
    urls.push(makeUrl(`${baseUrl}/people`, 'people', 0.7));
    people.forEach(p => {
      urls.push(makeUrl(`${baseUrl}/people/${p.slug}`, 'people', 0.4));
    });
  } catch {}

  // 15b. Characters (/characters/{slug})
  try {
    const charModule = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'characters.json'), 'utf-8'));
    const characters = charModule.characters || charModule;
    characters.forEach((c: any) => {
      if (c.slug) {
        urls.push(makeUrl(`${baseUrl}/characters/${c.slug}`, 'characters', 0.4));
      }
    });
  } catch {}

  // 16. Timeline (/timeline/{slug}) — ~114 pages
  try {
    const epochs = getAllEpochs();
    urls.push(makeUrl(`${baseUrl}/timeline`, 'timeline', 0.6));
    epochs.forEach(e => {
      urls.push(makeUrl(`${baseUrl}/timeline/${e.slug}`, 'timeline', 0.4));
    });
  } catch {}

  // 17. Bible stories (/bible-stories/{slug}) — ~372 pages
  try {
    const stories = getAllStories();
    urls.push(makeUrl(`${baseUrl}/bible-stories`, 'bible-stories', 0.6));
    stories.forEach(s => {
      urls.push(makeUrl(`${baseUrl}/bible-stories/${s.slug}`, 'bible-stories', 0.4));
    });
  } catch {}

  // 18. Nave's topics (/nave-topics/{slug}) — ~5,319 pages
  try {
    const naveTopics = getAllNaveTopics();
    urls.push(makeUrl(`${baseUrl}/nave-topics`, 'nave-topics', 0.7));
    naveTopics.forEach(t => {
      urls.push(makeUrl(`${baseUrl}/nave-topics/${t.slug}`, 'nave-topics', 0.5));
    });
  } catch {}

  // 19. Nave's topic-book combos (/nave-topics/{slug}/in/{book}) — ~21,323 pages
  try {
    const combos = getAllNaveTopicBookCombos();
    combos.forEach(c => {
      urls.push(makeUrl(`${baseUrl}/nave-topics/${c.topic}/in/${c.book}`, 'nave-topics', 0.4));
    });
  } catch {}

  // 20. Commandments (/commandments/{number}) — 613 pages
  try {
    const cmds = getAllCommandments();
    urls.push(makeUrl(`${baseUrl}/commandments`, 'commandments', 0.7));
    cmds.forEach(c => {
      urls.push(makeUrl(`${baseUrl}/commandments/${c.number}`, 'commandments', 0.5));
    });
  } catch {}

  // 21. Commandment categories (/commandments/category/{slug}) — ~30 pages
  try {
    const cats = getAllCategories();
    cats.forEach(c => {
      urls.push(makeUrl(`${baseUrl}/commandments/category/${c.slug}`, 'commandments', 0.5));
    });
  } catch {}

  // 22. Devotionals (/devotionals, /devotionals/{slug})
  try {
    const devotionals = getAllDevotionals();
    urls.push(makeUrl(`${baseUrl}/devotionals`, 'devotionals', 0.7));
    devotionals.forEach(d => {
      urls.push(makeUrl(`${baseUrl}/devotionals/${d.slug}`, 'devotionals', 0.5));
    });
  } catch {}

  // 23. Resources hub + detail pages (/resources, /resources/{slug})
  try {
    const resources = getAllResources();
    urls.push(makeUrl(`${baseUrl}/resources`, 'resources', 0.7));
    resources.forEach(r => {
      urls.push(makeUrl(`${baseUrl}/resources/${r.slug}`, 'resources', 0.6));
    });
  } catch {}

  // 24. Reading plans (/reading-plans, /reading-plans/{slug})
  try {
    const plans = getAllReadingPlans();
    urls.push(makeUrl(`${baseUrl}/reading-plans`, 'reading-plans', 0.7));
    plans.forEach(p => {
      urls.push(makeUrl(`${baseUrl}/reading-plans/${p.slug}`, 'reading-plans', 0.5));
    });
  } catch {}

  // 25. Red Letter (Words of Jesus) hub
  urls.push(makeUrl(`${baseUrl}/red-letter`, 'pages', 0.6));

  // 26. Bible study guide detail pages (/bible-study-guides/{slug})
  try {
    const guides = getAllStudyGuides();
    guides.forEach(g => {
      urls.push(makeUrl(`${baseUrl}/bible-study-guides/${g.slug}`, 'study-guides', 0.5));
    });
  } catch {}

  // 28. Interlinear pages (/interlinear, /interlinear/{book}, /interlinear/{book}/{chapter}, /interlinear/{book}/{chapter}/{verse})
  try {
    urls.push(makeUrl(`${baseUrl}/interlinear`, 'interlinear', 0.8));
    const bookSlugs = getAllInterlinearBookSlugs();
    for (const bookSlug of bookSlugs) {
      urls.push(makeUrl(`${baseUrl}/interlinear/${bookSlug}`, 'interlinear', 0.6));
      const chapters = getInterlinearChapters(bookSlug);
      for (const ch of chapters) {
        urls.push(makeUrl(`${baseUrl}/interlinear/${bookSlug}/${ch}`, 'interlinear', 0.5));
        const verses = getInterlinearChapterVerses(bookSlug, ch);
        for (const v of verses) {
          urls.push(makeUrl(`${baseUrl}/interlinear/${bookSlug}/${ch}/${v.verse}`, 'interlinear', 0.4));
        }
      }
    }
  } catch {}

  // 29. Resource item sub-pages (/resources/{slug}/{item})
  try {
    const itemSlugs = getAllResourceItemSlugs();
    for (const { resourceSlug, itemSlug } of itemSlugs) {
      urls.push(makeUrl(`${baseUrl}/resources/${resourceSlug}/${itemSlug}`, 'resource-items', 0.5));
    }
  } catch {}

  // 30. Bible Places (/bible-places, /bible-places/{slug}, /bible-places/type/{type}, /bible-places/near/{slug})
  try {
    urls.push(makeUrl(`${baseUrl}/bible-places`, 'bible-places', 0.8));
    const placeSlugs = getAllPlaceSlugs();
    placeSlugs.forEach(slug => {
      urls.push(makeUrl(`${baseUrl}/bible-places/${slug}`, 'bible-places', 0.6));
      urls.push(makeUrl(`${baseUrl}/bible-places/near/${slug}`, 'bible-places', 0.4));
    });
    const placeTypes = getAllPlaceTypes().filter(t => t !== 'special');
    placeTypes.forEach(t => {
      urls.push(makeUrl(`${baseUrl}/bible-places/type/${t.replace(/\s+/g, '-')}`, 'bible-places', 0.5));
    });
  } catch {}

  // 31. Verse-Place pages (/bible-places/{slug}/{verseRef}) — ~5,600+ ISR pages
  try {
    const verseKeys = getAllVersePlaceKeys();
    // Include all verse-place combos in sitemap for discovery
    const versePlacesData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'geocoding', 'verse-places.json'), 'utf-8'));
    for (const [verseRef, slugs] of Object.entries(versePlacesData)) {
      for (const slug of (slugs as string[])) {
        urls.push(makeUrl(`${baseUrl}/bible-places/${slug}/${verseRef}`, 'verse-places', 0.3));
      }
    }
  } catch {}

  // 32. Bible Geography (/bible-geography, /bible-geography/{book}, /bible-geography/{book}/{chapter})
  try {
    urls.push(makeUrl(`${baseUrl}/bible-geography`, 'bible-geography', 0.8));
    const geoBooks = getBooksWithPlaces();
    geoBooks.forEach(book => {
      urls.push(makeUrl(`${baseUrl}/bible-geography/${book}`, 'bible-geography', 0.6));
    });
    const chapterKeys = getPlacesByBookChapterKeys();
    chapterKeys.forEach(key => {
      const parts = key.split('-');
      const chapter = parts.pop()!;
      const book = parts.join('-');
      urls.push(makeUrl(`${baseUrl}/bible-geography/${book}/${chapter}`, 'bible-geography', 0.5));
    });
  } catch {}

  // 33. Geography Quizzes (/bible-geography-quiz/{book})
  try {
    const geoBooks = getBooksWithPlaces();
    geoBooks.forEach(book => {
      urls.push(makeUrl(`${baseUrl}/bible-geography-quiz/${book}`, 'geography-quizzes', 0.6));
    });
  } catch {}

  // 35. Character Quizzes (/character-quiz, /character-quiz/{slug})
  try {
    const charQuizSlugs = getAllCharacterQuizSlugs();
    urls.push(makeUrl(`${baseUrl}/character-quiz`, 'character-quizzes', 0.7));
    charQuizSlugs.forEach(slug => {
      urls.push(makeUrl(`${baseUrl}/character-quiz/${slug}`, 'character-quizzes', 0.6));
    });
  } catch {}

  // 36. Characters by Topic (/characters-by-topic, /characters-by-topic/{slug})
  try {
    const charTopicSlugs = getAllCharacterTopicBridgeSlugs();
    urls.push(makeUrl(`${baseUrl}/characters-by-topic`, 'characters-by-topic', 0.7));
    charTopicSlugs.forEach(slug => {
      urls.push(makeUrl(`${baseUrl}/characters-by-topic/${slug}`, 'characters-by-topic', 0.5));
    });
  } catch {}

  // 37. Commandments by Topic (/commandments/topic, /commandments/topic/{slug})
  try {
    const cmdTopicSlugs = getAllCommandmentTopicSlugs();
    urls.push(makeUrl(`${baseUrl}/commandments/topic`, 'commandments-by-topic', 0.7));
    cmdTopicSlugs.forEach(slug => {
      urls.push(makeUrl(`${baseUrl}/commandments/topic/${slug}`, 'commandments-by-topic', 0.5));
    });
  } catch {}

  // 38. Timeline Geography (/bible-places/era, /bible-places/era/{slug})
  try {
    const eraSlugs = getAllEraGeographySlugs();
    urls.push(makeUrl(`${baseUrl}/bible-places/era`, 'timeline-geography', 0.7));
    eraSlugs.forEach(slug => {
      urls.push(makeUrl(`${baseUrl}/bible-places/era/${slug}`, 'timeline-geography', 0.6));
    });
  } catch {}

  // 34. Bible Chapter Summaries (/bible-chapter-summaries/{book}, /bible-chapter-summaries/{book}/{chapter})
  BIBLE_BOOKS.forEach(book => {
    urls.push(makeUrl(`${baseUrl}/bible-chapter-summaries/${book.slug}`, 'chapter-summaries', 0.6));
    for (let chapter = 1; chapter <= book.chapters; chapter++) {
      urls.push(makeUrl(`${baseUrl}/bible-chapter-summaries/${book.slug}/${chapter}`, 'chapter-summaries', 0.5));
    }
  });

  // 39. Hebrew Word Studies (/hebrew-word, /hebrew-word/{slug}) — ~8,674 pages
  try {
    urls.push(makeUrl(`${baseUrl}/hebrew-word`, 'hebrew-word', 0.8));
    const hebrewSlugs = getAllHebrewSlugs();
    hebrewSlugs.forEach(slug => {
      urls.push(makeUrl(`${baseUrl}/hebrew-word/${slug}`, 'hebrew-word', 0.5));
    });
  } catch {}

  // 40. Greek Word Studies (/greek-word, /greek-word/{slug}) — ~5,523 pages
  try {
    urls.push(makeUrl(`${baseUrl}/greek-word`, 'greek-word', 0.8));
    const greekSlugs = getAllGreekSlugs();
    greekSlugs.forEach(slug => {
      urls.push(makeUrl(`${baseUrl}/greek-word/${slug}`, 'greek-word', 0.5));
    });
  } catch {}

  // 41. Bible Topics / Nave's Topical (/bible-topics, /bible-topics/{slug}) — ~5,319 pages
  try {
    urls.push(makeUrl(`${baseUrl}/bible-topics`, 'bible-topics', 0.8));
    const naveTopicList = getAllNaveTopics();
    naveTopicList.forEach(t => {
      urls.push(makeUrl(`${baseUrl}/bible-topics/${t.slug}`, 'bible-topics', 0.5));
    });
  } catch {}

  // 42. Chain Studies (/chain-study, /chain-study/{slug}) — ~916 pages
  try {
    urls.push(makeUrl(`${baseUrl}/chain-study`, 'chain-study', 0.8));
    const chains = getAllChainStudies();
    chains.forEach(c => {
      urls.push(makeUrl(`${baseUrl}/chain-study/${c.slug}`, 'chain-study', 0.5));
    });
  } catch {}

  // 43. Bible Encyclopedia (/bible-encyclopedia, /bible-encyclopedia/{slug}) — ~11,478 pages
  try {
    urls.push(makeUrl(`${baseUrl}/bible-encyclopedia`, 'bible-encyclopedia', 0.8));
    const encSlugs = getAllEncyclopediaSlugs();
    encSlugs.forEach(slug => {
      urls.push(makeUrl(`${baseUrl}/bible-encyclopedia/${slug}`, 'bible-encyclopedia', 0.5));
    });
  } catch {}

  // 44. Greek Grammar (/greek-grammar, /greek-grammar/{slug}) — ~18 pages
  try {
    urls.push(makeUrl(`${baseUrl}/greek-grammar`, 'greek-grammar', 0.8));
    const grammarForms = getAllGrammarForms();
    grammarForms.forEach(g => {
      urls.push(makeUrl(`${baseUrl}/greek-grammar/${g.slug}`, 'greek-grammar', 0.6));
    });
  } catch {}

  // 45. Pillar Pages (verse study landing pages)
  const pillarPages = [
    '/john-3-16',
    '/psalm-23',
    '/romans-8-28',
    '/philippians-4-13',
    '/proverbs-3-5-6',
    '/jeremiah-29-11',
    '/isaiah-41-10',
  ];
  pillarPages.forEach(p => {
    urls.push(makeUrl(`${baseUrl}${p}`, 'pillar-pages', 0.9, 'monthly'));
  });

  return urls;
}

// ── Chunking helpers ──

export interface SitemapChunk {
  name: string;
  urls: SitemapUrl[];
}

/** Group URLs by their assigned group tag */
export function groupUrlsByPattern(urls: SitemapUrl[]): Record<string, SitemapUrl[]> {
  const groups: Record<string, SitemapUrl[]> = {};
  for (const u of urls) {
    const key = u.group || 'pages';
    if (!groups[key]) groups[key] = [];
    groups[key].push(u);
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
    // Only output loc + lastmod — Google ignores changefreq and priority
    return `  <url>
    <loc>${urlData.url}</loc>
    <lastmod>${urlData.lastModified.toISOString()}</lastmod>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// Generate sitemap index XML pointing to sub-sitemaps
// Each entry uses the latest lastmod from its chunk's URLs
export function generateSitemapIndex(items: { name: string; urls: SitemapUrl[] }[]): string {
  const entries = items.map(item => {
    const latest = item.urls.reduce((max, u) =>
      u.lastModified > max ? u.lastModified : max, item.urls[0].lastModified);
    return `  <sitemap>
    <loc>${baseUrl}/${item.name}.xml</loc>
    <lastmod>${latest.toISOString()}</lastmod>
  </sitemap>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;
}
