import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Cache for IP to country lookups (simple in-memory cache)
const countryCache = new Map<string, string>();

async function getCountryFromIP(ip: string): Promise<string> {
  // Check cache first
  if (countryCache.has(ip)) {
    return countryCache.get(ip)!;
  }

  try {
    // Use ipapi.co for geolocation (free tier: 1000 requests/day)
    // For production, consider using a paid service or Cloudflare headers
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BibleMaximum/1.0)'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const countryCode = data.country_code || 'UNKNOWN';

    // Cache the result
    countryCache.set(ip, countryCode);

    // Limit cache size to prevent memory issues
    if (countryCache.size > 1000) {
      const firstKey = countryCache.keys().next().value;
      countryCache.delete(firstKey);
    }

    return countryCode;
  } catch (error) {
    console.error('Error fetching country:', error);
    return 'UNKNOWN';
  }
}

export async function middleware(request: NextRequest) {
  // Get the user's IP address
  // Check for Cloudflare headers first (if using Cloudflare)
  const cfCountry = request.headers.get('cf-ipcountry');
  
  let countryCode: string;
  
  if (cfCountry) {
    // Use Cloudflare's country detection
    countryCode = cfCountry;
  } else {
    // Get IP from various headers
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               request.headers.get('x-real-ip') ||
               request.ip ||
               '127.0.0.1';

    // Skip localhost/private IPs
    if (ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      countryCode = 'LOCAL';
    } else {
      countryCode = await getCountryFromIP(ip);
    }
  }

  // Create response with country header
  const response = NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  });

  // Set the country code in a custom header
  response.headers.set('x-country-code', countryCode);

  return response;
}

// Apply middleware to all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};