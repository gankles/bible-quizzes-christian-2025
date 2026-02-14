#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { generateAllUrls, generateSitemapXml, generateSitemapIndex } from '../lib/sitemap-generator';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const urls = generateAllUrls();

// Split URLs into categories for sub-sitemaps
const staticUrls = urls.filter(u => {
  const p = u.url.replace('https://biblemaximum.com', '');
  return !p.includes('-chapters') && !p.match(/-\d*-?quiz$/) && !p.startsWith('/books/') && !p.startsWith('/lexicon/') && !p.startsWith('/verses/') && !p.startsWith('/chapters/') && !p.match(/^\/cross-references\/.+/) && !p.match(/^\/topics\/.+/);
});

const chapterPageUrls = urls.filter(u => u.url.includes('-chapters'));
const bookQuizUrls = urls.filter(u => u.url.match(/-quiz$/) && !u.url.match(/-\d+-quiz$/));
const chapterQuizUrls = urls.filter(u => u.url.match(/-\d+-quiz$/));
const bookInfoUrls = urls.filter(u => u.url.includes('/books/'));
const lexiconUrls = urls.filter(u => u.url.includes('/lexicon/') && !staticUrls.some(s => s.url === u.url));
const verseUrls = urls.filter(u => u.url.includes('/verses/'));
const chapterReadingUrls = urls.filter(u => u.url.includes('/chapters/'));
const topicUrls = urls.filter(u => u.url.match(/\/topics\/.+/));
const crossRefUrls = urls.filter(u => u.url.includes('/cross-references/') && !staticUrls.some(s => s.url === u.url));

// Write sub-sitemaps (split verses into chunks of 10,000 for Google's 50K limit)
const sitemaps: { name: string; urls: typeof urls }[] = [
  { name: 'sitemap-pages.xml', urls: staticUrls },
  { name: 'sitemap-book-chapters.xml', urls: chapterPageUrls },
  { name: 'sitemap-book-quizzes.xml', urls: bookQuizUrls },
  { name: 'sitemap-chapter-quizzes.xml', urls: chapterQuizUrls },
  { name: 'sitemap-book-info.xml', urls: bookInfoUrls },
  { name: 'sitemap-lexicon.xml', urls: lexiconUrls },
  { name: 'sitemap-chapter-reading.xml', urls: chapterReadingUrls },
  { name: 'sitemap-topics.xml', urls: topicUrls },
];

// Split cross-reference URLs into chunks if > 40,000
const CROSSREF_CHUNK_SIZE = 40000;
if (crossRefUrls.length <= CROSSREF_CHUNK_SIZE) {
  sitemaps.push({ name: 'sitemap-cross-references.xml', urls: crossRefUrls });
} else {
  for (let i = 0; i < crossRefUrls.length; i += CROSSREF_CHUNK_SIZE) {
    const chunk = crossRefUrls.slice(i, i + CROSSREF_CHUNK_SIZE);
    const idx = Math.floor(i / CROSSREF_CHUNK_SIZE) + 1;
    sitemaps.push({ name: `sitemap-cross-references-${idx}.xml`, urls: chunk });
  }
}

// Split verse URLs into chunks if > 40,000
const VERSE_CHUNK_SIZE = 40000;
if (verseUrls.length <= VERSE_CHUNK_SIZE) {
  sitemaps.push({ name: 'sitemap-verses.xml', urls: verseUrls });
} else {
  for (let i = 0; i < verseUrls.length; i += VERSE_CHUNK_SIZE) {
    const chunk = verseUrls.slice(i, i + VERSE_CHUNK_SIZE);
    const idx = Math.floor(i / VERSE_CHUNK_SIZE) + 1;
    sitemaps.push({ name: `sitemap-verses-${idx}.xml`, urls: chunk });
  }
}

const sitemapNames: string[] = [];
sitemaps.forEach(({ name, urls: sitemapUrls }) => {
  if (sitemapUrls.length === 0) return;
  const xml = generateSitemapXml(sitemapUrls);
  fs.writeFileSync(path.join(PUBLIC_DIR, name), xml);
  sitemapNames.push(name);
});

// Write sitemap index
const indexXml = generateSitemapIndex(sitemapNames);
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), indexXml);

// Stats
console.log(`Sitemap index generated: public/sitemap.xml`);
console.log(`Total URLs: ${urls.length}\n`);
sitemaps.forEach(({ name, urls: s }) => {
  if (s.length > 0) console.log(`  ${name}: ${s.length} URLs`);
});
