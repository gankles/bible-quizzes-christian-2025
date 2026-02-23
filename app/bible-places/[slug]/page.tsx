import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllPlaceSlugs,
  getPlaceBySlug,
  getNearbyPlaces,
  formatPlaceTypeSingular,
} from '@/lib/geocoding-data';
import { BOOK_NAMES } from '@/lib/bolls-api';
import { StructuredData } from '@/components/StructuredData';
import GeoAttribution from '@/components/GeoAttribution';
import PlacePageClient from './PlacePageClient';
import { getKJVText } from '@/lib/enrichment-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPlaceSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) return {};

  const typeLabel = formatPlaceTypeSingular(place.type);
  const title = `${place.name} in the Bible | Map, ${place.verseCount} Verses & History | Biblical ${typeLabel} | Bible Maximum`;
  const description = `Discover ${place.name} — a biblical ${typeLabel.toLowerCase()} mentioned in ${place.verseCount} verse${place.verseCount !== 1 ? 's' : ''} across ${place.books.length} book${place.books.length !== 1 ? 's' : ''} of the Bible.${place.lat ? ` View on an interactive map with GPS coordinates.` : ''} Complete verse references and scholarly analysis.`;

  return {
    title,
    description,
    keywords: [
      `${place.name} Bible`, `${place.name} in the Bible`, `${place.name} biblical`,
      `${place.name} map`, `where is ${place.name} in the Bible`,
      `biblical ${typeLabel.toLowerCase()}`, 'Bible places', 'Bible geography',
    ],
    openGraph: {
      title: `${place.name} in the Bible — Map & Verses`,
      description,
      url: `/bible-places/${place.slug}`,
      type: 'article',
    },
    alternates: { canonical: `/bible-places/${place.slug}` },
  };
}

export default async function PlacePage({ params }: PageProps) {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) notFound();

  const nearby = getNearbyPlaces(slug);
  const typeLabel = formatPlaceTypeSingular(place.type);

  // Group verses by book
  const versesByBook: Record<string, typeof place.verses> = {};
  for (const v of place.verses) {
    if (!versesByBook[v.bookSlug]) versesByBook[v.bookSlug] = [];
    versesByBook[v.bookSlug].push(v);
  }

  // Confidence label
  let confidenceLabel = 'Unknown';
  let confidenceColor = 'text-gray-400';
  if (place.confidenceScore >= 800) { confidenceLabel = 'Very High'; confidenceColor = 'text-green-600'; }
  else if (place.confidenceScore >= 500) { confidenceLabel = 'High'; confidenceColor = 'text-green-500'; }
  else if (place.confidenceScore >= 200) { confidenceLabel = 'Moderate'; confidenceColor = 'text-yellow-600'; }
  else if (place.confidenceScore > 0) { confidenceLabel = 'Low'; confidenceColor = 'text-orange-500'; }

  // JSON-LD
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Place',
        name: place.name,
        description: `${place.name} is a biblical ${typeLabel.toLowerCase()} mentioned in ${place.verseCount} Bible verses.`,
        url: `https://biblemaximum.com/bible-places/${place.slug}`,
        ...(place.lat && place.lon ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: place.lat,
            longitude: place.lon,
          },
        } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com' },
          { '@type': 'ListItem', position: 2, name: 'Bible Places', item: 'https://biblemaximum.com/bible-places' },
          { '@type': 'ListItem', position: 3, name: place.name },
        ],
      },
    ],
  };

  // Load KJV text for first 5 verses to add unique content
  const versesWithText = place.verses.slice(0, 5).map(v => ({
    ...v,
    text: getKJVText(v.bookSlug, v.chapter, v.verse),
  }));

  // Map markers
  const markers = place.lat !== null && place.lon !== null
    ? [{ lat: place.lat, lon: place.lon, name: place.name }]
    : [];

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/bible-places" className="hover:text-blue-600">Bible Places</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">{place.name}</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="md:flex md:gap-8">
          <div className="flex-1">
            <p className="text-sm text-blue-600 font-medium uppercase tracking-wider mb-1">
              Biblical {typeLabel}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-scripture">
              {place.name} in the Bible
            </h1>
            <p className="text-primary-dark/70 mb-4">
              {place.name} is {place.type === 'island' || place.type === 'altar' ? 'an' : 'a'} {typeLabel.toLowerCase()} mentioned in{' '}
              <strong>{place.verseCount}</strong> verse{place.verseCount !== 1 ? 's' : ''} across{' '}
              <strong>{place.books.length}</strong> book{place.books.length !== 1 ? 's' : ''} of the Bible.
              {place.modernName && place.modernName !== place.name && (
                <> Known today as <strong>{place.modernName}</strong>.</>
              )}
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="px-4 py-2 bg-white border border-grace rounded-lg">
                <p className="text-xs text-primary-dark/50 uppercase">Verses</p>
                <p className="text-lg font-bold text-scripture">{place.verseCount}</p>
              </div>
              <div className="px-4 py-2 bg-white border border-grace rounded-lg">
                <p className="text-xs text-primary-dark/50 uppercase">Books</p>
                <p className="text-lg font-bold text-scripture">{place.books.length}</p>
              </div>
              <div className="px-4 py-2 bg-white border border-grace rounded-lg">
                <p className="text-xs text-primary-dark/50 uppercase">Confidence</p>
                <p className={`text-lg font-bold ${confidenceColor}`}>{confidenceLabel}</p>
              </div>
              {place.lat !== null && (
                <div className="px-4 py-2 bg-white border border-grace rounded-lg">
                  <p className="text-xs text-primary-dark/50 uppercase">Coordinates</p>
                  <p className="text-sm font-mono text-scripture">{place.lat.toFixed(4)}, {place.lon!.toFixed(4)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      {markers.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-8">
          <h2 className="text-xl font-bold text-scripture mb-3">Map</h2>
          <PlacePageClient markers={markers} />
        </section>
      )}

      {/* Key Verses with KJV Text */}
      {versesWithText.some(v => v.text) && (
        <section className="max-w-6xl mx-auto px-4 pb-8">
          <h2 className="text-xl font-bold text-scripture mb-4">
            Key Verses About {place.name}
          </h2>
          <div className="space-y-4">
            {versesWithText.filter(v => v.text).map(v => (
              <div key={v.ref} className="bg-white border border-grace rounded-lg p-4">
                <blockquote className="text-primary-dark/80 leading-relaxed italic border-l-4 border-blue-600 pl-4 mb-2">
                  &ldquo;{v.text}&rdquo;
                </blockquote>
                <Link
                  href={`/verses/${v.bookSlug}/${v.chapter}/${v.verse}`}
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  {v.readable} (KJV)
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Verses by Book */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <h2 className="text-xl font-bold text-scripture mb-4">
          Bible Verses Mentioning {place.name}
        </h2>
        <div className="space-y-6">
          {Object.entries(versesByBook).map(([bookSlug, verses]) => (
            <div key={bookSlug}>
              <h3 className="text-lg font-semibold text-scripture mb-2">
                <Link href={`/${bookSlug}-chapters`} className="hover:text-blue-600">
                  {BOOK_NAMES[bookSlug] || bookSlug}
                </Link>
                <span className="text-sm text-primary-dark/40 ml-2">({verses.length})</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {verses.map(v => (
                  <Link
                    key={v.ref}
                    href={`/bible-places/${place.slug}/${v.ref}`}
                    className="px-3 py-1.5 text-sm bg-white border border-grace rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    {v.readable}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* External Links */}
      {(place.wikipedia || place.wikidata) && (
        <section className="max-w-6xl mx-auto px-4 pb-8">
          <h2 className="text-lg font-bold text-scripture mb-3">Learn More</h2>
          <div className="flex flex-wrap gap-3">
            {place.wikipedia && (
              <a
                href={place.wikipedia}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors"
              >
                Wikipedia
              </a>
            )}
            {place.wikidata && (
              <a
                href={place.wikidata}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors"
              >
                Wikidata
              </a>
            )}
          </div>
        </section>
      )}

      {/* Nearby Places */}
      {nearby.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-8">
          <h2 className="text-xl font-bold text-scripture mb-3">
            Nearby Biblical Places
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map(n => (
              <Link
                key={n.slug}
                href={`/bible-places/${n.slug}`}
                className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <span className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                  {n.name}
                </span>
                <span className="text-xs text-primary-dark/40 ml-2">{n.distanceKm} km</span>
              </Link>
            ))}
          </div>
          <div className="mt-3">
            <Link
              href={`/bible-places/near/${place.slug}`}
              className="text-sm text-blue-600 hover:underline"
            >
              See all nearby places &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* Internal Links */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Related Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/bible-places" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              All Bible Places
            </Link>
            <Link href="/bible-geography" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              Bible Geography by Book
            </Link>
            {place.types[0] && place.types[0] !== 'special' && (
              <Link href={`/bible-places/type/${place.types[0].replace(/\s+/g, '-')}`} className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
                Biblical {formatPlaceTypeSingular(place.types[0])}s
              </Link>
            )}
            {place.books[0] && (
              <Link href={`/bible-geography/${place.books[0]}`} className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
                Places in {BOOK_NAMES[place.books[0]] || place.books[0]}
              </Link>
            )}
            <Link href="/people" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              Bible People Directory
            </Link>
            <Link href="/bible-quizzes" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              Bible Quizzes
            </Link>
          </div>
        </div>
        <GeoAttribution imageCredit={place.credit} imageCreditUrl={place.creditUrl} />
      </section>
    </>
  );
}
