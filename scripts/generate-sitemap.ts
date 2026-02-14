#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { generateAllUrls, generateSitemapXml, generateSitemapIndex, SitemapUrl } from '../lib/sitemap-generator';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const MAX_URLS_PER_SITEMAP = 5000;

const urls = generateAllUrls();

// Group URLs by their assigned group tag
const grouped: Record<string, SitemapUrl[]> = {};
for (const u of urls) {
  const key = u.group || 'pages';
  if (!grouped[key]) grouped[key] = [];
  grouped[key].push(u);
}

// Generate sub-sitemaps, chunking large groups
const sitemapNames: string[] = [];

for (const [group, groupUrls] of Object.entries(grouped)) {
  if (groupUrls.length === 0) continue;

  if (groupUrls.length <= MAX_URLS_PER_SITEMAP) {
    // Single sitemap for this group
    const name = `sitemap-${group}.xml`;
    fs.writeFileSync(path.join(PUBLIC_DIR, name), generateSitemapXml(groupUrls));
    sitemapNames.push(name);
  } else {
    // Split into chunks
    for (let i = 0; i < groupUrls.length; i += MAX_URLS_PER_SITEMAP) {
      const chunk = groupUrls.slice(i, i + MAX_URLS_PER_SITEMAP);
      const idx = Math.floor(i / MAX_URLS_PER_SITEMAP) + 1;
      const name = `sitemap-${group}-${idx}.xml`;
      fs.writeFileSync(path.join(PUBLIC_DIR, name), generateSitemapXml(chunk));
      sitemapNames.push(name);
    }
  }
}

// Write sitemap index
const indexXml = generateSitemapIndex(sitemapNames);
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), indexXml);

// Stats
console.log(`\nSitemap index: public/sitemap.xml`);
console.log(`Total URLs: ${urls.length.toLocaleString()}`);
console.log(`Sub-sitemaps: ${sitemapNames.length}\n`);

// Sort by URL count descending
const stats = Object.entries(grouped)
  .map(([group, urls]) => ({ group, count: urls.length }))
  .sort((a, b) => b.count - a.count);

for (const { group, count } of stats) {
  const chunks = Math.ceil(count / MAX_URLS_PER_SITEMAP);
  const suffix = chunks > 1 ? ` (${chunks} chunks)` : '';
  console.log(`  ${group}: ${count.toLocaleString()} URLs${suffix}`);
}
