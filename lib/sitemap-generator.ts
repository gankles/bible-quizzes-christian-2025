import { BIBLE_BOOKS } from './bible-data';

export interface SitemapUrl {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface SitemapGroup {
  name: string;
  pattern: string;
  urls: SitemapUrl[];
}

const baseUrl = 'https://biblemaximum.com';
const now = new Date();

// Generate all possible URLs for the Bible quiz application
export function generateAllUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];

  // Static pages
  const staticPages = [
    { path: '/', priority: 1.0, changeFreq: 'weekly' as const },
    { path: '/bible-quizzes', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/chapter-quizzes', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/old-testament-quizzes', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/new-testament-quizzes', priority: 0.8, changeFreq: 'weekly' as const },
  ];

  staticPages.forEach(page => {
    urls.push({
      url: `${baseUrl}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFreq,
      priority: page.priority
    });
  });

  // Book quizzes (complete book quizzes)
  BIBLE_BOOKS.forEach(book => {
    urls.push({
      url: `${baseUrl}/${book.slug}-quiz`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7
    });
  });

  // Chapter quizzes (individual chapter quizzes)
  BIBLE_BOOKS.forEach(book => {
    for (let chapter = 1; chapter <= book.chapters; chapter++) {
      urls.push({
        url: `${baseUrl}/${book.slug}-${chapter}-quiz`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6
      });
    }
  });

  // Character quizzes (common Bible characters)
  const characters = [
    'abraham', 'moses', 'david', 'solomon', 'daniel', 'joseph', 'noah', 'jacob',
    'isaac', 'joshua', 'samuel', 'elijah', 'elisha', 'jeremiah', 'isaiah', 'ezekiel',
    'jesus', 'peter', 'paul', 'john', 'james', 'matthew', 'mark', 'luke', 'timothy',
    'barnabas', 'stephen', 'philip', 'thomas', 'andrew', 'bartholomew', 'mary',
    'martha', 'mary-magdalene', 'elizabeth', 'hannah', 'ruth', 'esther', 'deborah'
  ];

  characters.forEach(character => {
    urls.push({
      url: `${baseUrl}/${character}-quiz`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5
    });
  });

  // Theme quizzes (biblical themes)
  const themes = [
    'creation', 'salvation', 'faith', 'love', 'hope', 'prayer', 'worship', 'forgiveness',
    'grace', 'mercy', 'justice', 'peace', 'joy', 'wisdom', 'truth', 'light', 'life',
    'eternal-life', 'kingdom-of-god', 'heaven', 'angels', 'miracles', 'parables',
    'prophecy', 'covenant', 'sacrifice', 'redemption', 'resurrection', 'second-coming',
    'holy-spirit', 'trinity', 'discipleship', 'evangelism', 'mission', 'church',
    'baptism', 'communion', 'marriage', 'family', 'money', 'work', 'suffering',
    'persecution', 'temptation', 'sin', 'repentance', 'holiness', 'righteousness'
  ];

  themes.forEach(theme => {
    urls.push({
      url: `${baseUrl}/${theme}-quiz`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5
    });
  });

  // Event quizzes (biblical events)
  const events = [
    'christmas', 'easter', 'pentecost', 'exodus', 'creation', 'flood', 'tower-of-babel',
    'burning-bush', 'ten-commandments', 'golden-calf', 'promised-land', 'fall-of-jericho',
    'davids-victory', 'solomons-temple', 'babylonian-exile', 'return-from-exile',
    'birth-of-jesus', 'baptism-of-jesus', 'temptation-of-jesus', 'sermon-on-mount',
    'last-supper', 'crucifixion', 'resurrection', 'ascension', 'day-of-pentecost',
    'conversion-of-paul', 'council-of-jerusalem', 'pauls-missionary-journeys'
  ];

  events.forEach(event => {
    urls.push({
      url: `${baseUrl}/${event}-quiz`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5
    });
  });

  return urls;
}

// Group URLs by pattern for organized sitemaps
export function groupUrlsByPattern(urls: SitemapUrl[]): SitemapGroup[] {
  const groups: SitemapGroup[] = [
    { name: 'main', pattern: 'main-pages', urls: [] },
    { name: 'book-quizzes', pattern: 'book-quiz', urls: [] },
    { name: 'chapter-quizzes', pattern: 'chapter-quiz', urls: [] },
    { name: 'character-quizzes', pattern: 'character-quiz', urls: [] },
    { name: 'theme-quizzes', pattern: 'theme-quiz', urls: [] },
    { name: 'event-quizzes', pattern: 'event-quiz', urls: [] }
  ];

  urls.forEach(url => {
    const path = url.url.replace(baseUrl, '');
    
    // Main pages
    if (path === '/' || path.includes('/bible-quizzes') || path.includes('/chapter-quizzes') || 
        path.includes('/old-testament-quizzes') || path.includes('/new-testament-quizzes')) {
      groups[0].urls.push(url);
    }
    // Book quizzes (book name followed by -quiz, no numbers)
    else if (path.match(/^\/[a-z0-9-]+-quiz$/) && !path.match(/\d+-quiz$/)) {
      // Check if it's a Bible book
      const bookSlug = path.replace('/', '').replace('-quiz', '');
      const isBook = BIBLE_BOOKS.some(book => book.slug === bookSlug);
      
      if (isBook) {
        groups[1].urls.push(url);
      } else {
        // Could be character, theme, or event - categorize by common patterns
        const characterKeywords = ['abraham', 'moses', 'david', 'solomon', 'jesus', 'peter', 'paul', 'john', 'mary'];
        const themeKeywords = ['creation', 'salvation', 'faith', 'love', 'hope', 'prayer', 'grace', 'mercy'];
        const eventKeywords = ['christmas', 'easter', 'pentecost', 'exodus', 'flood', 'crucifixion'];
        
        if (characterKeywords.some(char => bookSlug.includes(char))) {
          groups[3].urls.push(url);
        } else if (themeKeywords.some(theme => bookSlug.includes(theme))) {
          groups[4].urls.push(url);
        } else if (eventKeywords.some(event => bookSlug.includes(event))) {
          groups[5].urls.push(url);
        } else {
          // Default to theme quizzes
          groups[4].urls.push(url);
        }
      }
    }
    // Chapter quizzes (book name followed by number and -quiz)
    else if (path.match(/^\/[a-z0-9-]+-\d+-quiz$/)) {
      groups[2].urls.push(url);
    }
    // Fallback to main
    else {
      groups[0].urls.push(url);
    }
  });

  return groups.filter(group => group.urls.length > 0);
}

// Split large groups into chunks of 5000 URLs
export function splitIntoChunks(groups: SitemapGroup[], maxUrlsPerSitemap: number = 5000): SitemapGroup[] {
  const result: SitemapGroup[] = [];

  groups.forEach(group => {
    if (group.urls.length <= maxUrlsPerSitemap) {
      result.push(group);
    } else {
      // Split into chunks
      const chunks = [];
      for (let i = 0; i < group.urls.length; i += maxUrlsPerSitemap) {
        chunks.push(group.urls.slice(i, i + maxUrlsPerSitemap));
      }

      chunks.forEach((chunk, index) => {
        result.push({
          name: `${group.name}-${index + 1}`,
          pattern: group.pattern,
          urls: chunk
        });
      });
    }
  });

  return result;
}

// Generate sitemap index content
export function generateSitemapIndex(groups: SitemapGroup[]): string {
  const sitemapEntries = groups.map(group => {
    return `  <sitemap>
    <loc>${baseUrl}/sitemap-${group.name}.xml</loc>
    <lastmod>${now.toISOString()}</lastmod>
  </sitemap>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
}

// Generate individual sitemap content
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