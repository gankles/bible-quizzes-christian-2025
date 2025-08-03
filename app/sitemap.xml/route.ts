import { NextResponse } from 'next/server';
import { generateAllUrls, groupUrlsByPattern, splitIntoChunks, generateSitemapIndex } from '@/lib/sitemap-generator';

export async function GET() {
  try {
    // Generate all URLs
    const allUrls = generateAllUrls();
    
    // Group URLs by pattern
    const groupedUrls = groupUrlsByPattern(allUrls);
    
    // Split into chunks of 5000 URLs max
    const chunks = splitIntoChunks(groupedUrls, 5000);
    
    // Generate sitemap index
    const sitemapIndex = generateSitemapIndex(chunks);
    
    return new NextResponse(sitemapIndex, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200', // 24 hours cache
      },
    });
  } catch (error) {
    console.error('Error generating sitemap index:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}