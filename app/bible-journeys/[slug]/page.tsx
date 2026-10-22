import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getRouteBySlug, getAllRouteSlugs, getRoutesByEra, getBooksForRoute, getNearbyPlacesForRoute,
  ERA_LABELS, ERA_COLORS, type BibleRoute,
} from '@/lib/bible-routes';
import { BOOK_NAMES } from '@/lib/bolls-api';
import { StructuredData } from '@/components/StructuredData';
import RouteMapClient from './RouteMapClient';

export const revalidate = 86400; // 24 hours

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllRouteSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) return {};

  const title = `${route.title} | Bible Journey Map`;
  const description = `Map of ${route.title}${route.narrativeGroup ? ` (${route.narrativeGroup})` : ''} — a real biblical travel route plotted from original coordinates.`;

  return {
    title,
    description,
    keywords: [route.title, 'Bible journey map', 'Bible route', ERA_LABELS[route.era]].filter(Boolean) as string[],
    openGraph: {
      title: `${route.title} — Bible Journey Map`,
      description,
      url: `/bible-journeys/${slug}`,
      type: 'article',
    },
    alternates: { canonical: `/bible-journeys/${slug}` },
  };
}

function legsToMapRoutes(route: BibleRoute) {
  const style = ERA_COLORS[route.era] || { color: '#7c5cbf' };
  return route.legs.map(leg => ({
    path: leg.map(([lon, lat]) => [lat, lon] as [number, number]),
    color: style.color,
    dashed: style.dashed,
  }));
}

export default async function BibleJourneyPage({ params }: PageProps) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) notFound();

  const books = getBooksForRoute(route);
  const nearbyPlaces = getNearbyPlacesForRoute(slug);
  const relatedRoutes = getRoutesByEra(route.era).filter(r => r.slug !== slug).slice(0, 6);
  const eraColor = ERA_COLORS[route.era]?.color;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${route.title} — Bible Journey Map`,
    description: `Map of ${route.title}, a real biblical travel route plotted from original coordinates.`,
    url: `https://biblemaximum.com/bible-journeys/${slug}`,
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-ink-muted">
        <Link href="/" className="hover:text-gold-dark">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/bible-journeys" className="hover:text-gold-dark">Bible Journeys</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">{route.title}</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-muted mb-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: eraColor }} />
          {ERA_LABELS[route.era]}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold font-display mb-2 text-scripture">
          {route.title}
        </h1>
        {route.narrativeGroup && route.narrativeGroup !== route.title && (
          <p className="text-ink-muted max-w-2xl mb-4">{route.narrativeGroup}</p>
        )}
        {books.length > 0 && (
          <p className="text-sm text-ink-muted mb-4">
            Narrated in{' '}
            {books.map((b, i) => (
              <span key={b}>
                {i > 0 && ', '}
                <Link href={`/bible-geography/${b}`} className="font-medium text-scripture hover:text-gold-dark">
                  {BOOK_NAMES[b] || b}
                </Link>
              </span>
            ))}
          </p>
        )}
      </section>

      {/* Map */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <RouteMapClient routes={legsToMapRoutes(route)} />
      </section>

      {/* Places along the route */}
      {nearbyPlaces.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-8">
          <h2 className="text-lg font-bold text-scripture mb-3">Places Along This Route</h2>
          <div className="flex flex-wrap gap-2">
            {nearbyPlaces.map(p => (
              <Link
                key={p.slug}
                href={`/bible-places/${p.slug}`}
                className="px-3 py-1.5 bg-white border border-grace rounded-lg text-sm hover:border-sacred/50 transition-colors"
              >
                {p.name}
                <span className="text-ink-light text-xs ml-1.5">{p.distanceKm.toFixed(1)} km</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related journeys */}
      {relatedRoutes.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-8">
          <h2 className="text-lg font-bold text-scripture mb-3">More Journeys in This Era</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {relatedRoutes.map(r => (
              <Link
                key={r.slug}
                href={`/bible-journeys/${r.slug}`}
                className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-sacred/50 transition-all group"
              >
                <span className="font-semibold text-scripture group-hover:text-gold-dark transition-colors">
                  {r.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Internal Links */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Related Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/bible-journeys" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-sacred/50 transition-colors">
              All Bible Journeys
            </Link>
            {books.map(b => (
              <Link key={b} href={`/bible-geography/${b}`} className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-sacred/50 transition-colors">
                {BOOK_NAMES[b] || b} Geography
              </Link>
            ))}
            <Link href="/bible-places" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-sacred/50 transition-colors">
              Bible Places A-Z
            </Link>
          </div>
        </div>
        <p className="text-xs text-ink-light mt-4">
          Journey route:{' '}
          <a
            href="https://github.com/ubsicap/ubs-open-license/tree/main/ubs-bible-routes"
            className="underline hover:text-ink-muted"
            target="_blank"
            rel="noopener noreferrer"
          >
            UBS Bible Routes
          </a>
          , &copy; United Bible Societies, created by Dr. Leen Ritmeyer &mdash; CC BY-SA 4.0. Map tiles: OpenStreetMap contributors (ODbL).
        </p>
      </section>
    </>
  );
}
