import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://biblemaximum.com/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Allow all Bible quiz pages
Allow: /*-quiz
Allow: /bible-quizzes
Allow: /chapter-quizzes
Allow: /old-testament-quizzes
Allow: /new-testament-quizzes

# Disallow admin or private paths (if any)
# Disallow: /admin
# Disallow: /private

# Disallow common non-content paths
Disallow: /api/
Disallow: /_next/
Disallow: /static/`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // 24 hours cache
    },
  });
}