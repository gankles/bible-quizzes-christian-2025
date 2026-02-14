#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { generateAllUrls, generateSitemapXml, generateSitemapIndex, assignRealisticDates, SitemapUrl } from '../lib/sitemap-generator';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const MAX_URLS_PER_SITEMAP = 5000;

const urls = generateAllUrls();

// Assign gradually-spread lastmod dates per content group
assignRealisticDates(urls);

// Group URLs by their assigned group tag
const grouped: Record<string, SitemapUrl[]> = {};
for (const u of urls) {
  const key = u.group || 'pages';
  if (!grouped[key]) grouped[key] = [];
  grouped[key].push(u);
}

// Generate sub-sitemaps, chunking large groups
const chunks: { name: string; urls: SitemapUrl[] }[] = [];

for (const [group, groupUrls] of Object.entries(grouped)) {
  if (groupUrls.length === 0) continue;

  if (groupUrls.length <= MAX_URLS_PER_SITEMAP) {
    const name = `sitemap-${group}`;
    fs.writeFileSync(path.join(PUBLIC_DIR, `${name}.xml`), generateSitemapXml(groupUrls));
    chunks.push({ name, urls: groupUrls });
  } else {
    for (let i = 0; i < groupUrls.length; i += MAX_URLS_PER_SITEMAP) {
      const chunk = groupUrls.slice(i, i + MAX_URLS_PER_SITEMAP);
      const idx = Math.floor(i / MAX_URLS_PER_SITEMAP) + 1;
      const name = `sitemap-${group}-${idx}`;
      fs.writeFileSync(path.join(PUBLIC_DIR, `${name}.xml`), generateSitemapXml(chunk));
      chunks.push({ name, urls: chunk });
    }
  }
}

// Write sitemap index — each entry gets the latest lastmod from its chunk
const indexXml = generateSitemapIndex(chunks);
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), indexXml);

// Stats
console.log(`\nSitemap index: public/sitemap.xml`);
console.log(`Total URLs: ${urls.length.toLocaleString()}`);
console.log(`Sub-sitemaps: ${chunks.length}\n`);

// Sort by URL count descending
const stats = Object.entries(grouped)
  .map(([group, urls]) => ({ group, count: urls.length }))
  .sort((a, b) => b.count - a.count);

for (const { group, count } of stats) {
  const chunks = Math.ceil(count / MAX_URLS_PER_SITEMAP);
  const suffix = chunks > 1 ? ` (${chunks} chunks)` : '';
  console.log(`  ${group}: ${count.toLocaleString()} URLs${suffix}`);
}
