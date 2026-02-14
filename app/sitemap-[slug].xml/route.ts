import { NextResponse } from 'next/server';
import { generateAllUrls, groupUrlsByPattern, splitIntoChunks, generateSitemapXml } from '@/lib/sitemap-generator';

// Never statically generate — serve dynamically with CDN caching
export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params?.slug;

    if (!slug) {
      return new NextResponse('Sitemap slug required', { status: 400 });
    }

    // Generate all URLs
    const allUrls = generateAllUrls();

    // Group URLs by pattern
    const groupedUrls = groupUrlsByPattern(allUrls);

    // Split into chunks of 5000 URLs max
    const chunks = splitIntoChunks(groupedUrls, 5000);

    // Find the requested sitemap
    const requestedSitemap = chunks.find(chunk => chunk.name === slug);

    if (!requestedSitemap) {
      return new NextResponse('Sitemap not found', { status: 404 });
    }

    // Generate XML for this sitemap
    const sitemapXml = generateSitemapXml(requestedSitemap.urls);

    return new NextResponse(sitemapXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
