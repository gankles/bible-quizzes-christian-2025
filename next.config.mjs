/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable ISR for static generation
  trailingSlash: false,
  // Include data files in Vercel serverless function bundles
  // (fs.readFileSync paths can't be traced automatically)
  outputFileTracingIncludes: {
    '/sitemap.xml': ['./data/*.json', './data/bible-data/*'],
    '/sitemap-\\[slug\\].xml': ['./data/*.json', './data/bible-data/*'],
    '/\\[slug\\]': ['./data/quizzes/**', './data/chapter-breakdowns/**'],
    '/topics/\\[slug\\]': ['./data/topics.json'],
    '/topics/\\[slug\\]/in/\\[book\\]': ['./data/topics.json'],
    '/lexicon/\\[strongs\\]': ['./data/lexicon.json', './data/lexicon-concepts.json'],
    '/lexicon/concept/\\[slug\\]': ['./data/lexicon.json', './data/lexicon-concepts.json'],
    '/characters/\\[slug\\]': ['./data/characters.json'],
    '/verses/\\[book\\]/\\[chapter\\]/\\[verse\\]': ['./data/cross-references.json', './data/commentaries/**'],
    '/chapters/\\[book\\]/\\[chapter\\]': ['./data/cross-references.json', './data/commentaries/**'],
    '/cross-references/\\[book\\]/\\[chapter\\]/\\[verse\\]': ['./data/cross-references.json'],
  },
  // Optimize images
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
    ],
    unoptimized: false,
  },
  // Enable compression
  compress: true,
  // Skip lint during build (run separately)
  eslint: { ignoreDuringBuilds: true },
  // Disable type checking in build (handled by IDE/CI)
  typescript: { ignoreBuildErrors: true },
  // PWA and performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
