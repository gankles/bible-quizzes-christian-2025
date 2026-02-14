import { NextResponse } from 'next/server';
import { generateAllUrls, groupUrlsByPattern, splitIntoChunks, generateSitemapXml } from '@/lib/sitemap-generator';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
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
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200', // 24 hours cache
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

// Generate static params for all possible sitemap chunks
export async function generateStaticParams() {
  try {
    const allUrls = generateAllUrls();
    const groupedUrls = groupUrlsByPattern(allUrls);
    const chunks = splitIntoChunks(groupedUrls, 5000);
    
    return chunks.map(chunk => ({
      slug: chunk.name,
    }));
  } catch (error) {
    console.error('Error generating static params for sitemaps:', error);
    return [];
  }
}