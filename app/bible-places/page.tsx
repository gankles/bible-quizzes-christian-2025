import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPlaces, getGeocodingStats, getPlaceTypeWithCount, formatPlaceType } from '@/lib/geocoding-data';
import { StructuredData } from '@/components/StructuredData';
import GeoAttribution from '@/components/GeoAttribution';

export const metadata: Metadata = {
  title: 'Bible Places Directory | 1,300+ Biblical Locations with Maps, Coordinates & Verse References | Complete Bible Geography Guide | Bible Maximum',
  description: 'Explore every place mentioned in the Bible with interactive maps, GPS coordinates, confidence scores, and verse references. Browse 1,300+ biblical locations from Jerusalem to Babylon with photos and scholarly data.',
  keywords: [
    'Bible places', 'biblical locations', 'Bible geography', 'Bible map',
    'places in the Bible', 'biblical cities', 'Bible atlas', 'Holy Land places',
    'Bible places list', 'biblical geography guide', 'Bible locations with maps',
  ],
  openGraph: {
    title: 'Bible Places Directory — 1,300+ Biblical Locations with Maps',
    description: 'The most comprehensive directory of places mentioned in the Bible with maps and verse references.',
    url: '/bible-places',
    type: 'website',
  },
  alternates: { canonical: '/bible-places' },
};

export default function BiblePlacesPage() {
  const stats = getGeocodingStats();
  const allPlaces = getAllPlaces();
  const typeList = getPlaceTypeWithCount().filter(t => t.type !== 'special');

  // Group by first letter
  const byLetter: Record<string, typeof allPlaces> = {};
  for (const p of allPlaces) {
    const letter = p.name.charAt(0).toUpperCase();
    if (!byLetter[letter]) byLetter[letter] = [];
    byLetter[letter].push(p);
  }
  const letters = Object.keys(byLetter).sort();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Places Directory',
    description: metadata.description,
    url: 'https://biblemaximum.com/bible-places',
    numberOfItems: stats.totalPlaces,
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">Bible Places</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white border-b border-grace">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-scripture">
              Bible Places Directory
            </h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mb-6">
              Explore every identifiable place mentioned in the Bible — with interactive maps,
              scholarly confidence scores, verse references, and photos from the Holy Land.
            </p>

            <div className="flex flex-wrap gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.totalPlaces.toLocaleString()}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Places</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-400">{stats.withCoordinates.toLocaleString()}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Mapped</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.totalVerseRefs.toLocaleString()}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Verse Refs</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.totalTypes}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Types</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Type Badges */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <h2 className="text-lg font-bold text-scripture mb-3">Browse by Type</h2>
        <div className="flex flex-wrap gap-2">
          {typeList.slice(0, 20).map(({ type, count }) => (
            <Link
              key={type}
              href={`/bible-places/type/${type.replace(/\s+/g, '-')}`}
              className="px-3 py-1.5 bg-white border border-grace rounded-lg text-sm text-primary-dark/80 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              {formatPlaceType(type)} <span className="text-primary-dark/40">({count})</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Alphabet Jump Links */}
      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {letters.map(letter => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-grace text-sm font-bold text-primary-dark/80 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
            >
              {letter}
            </a>
          ))}
        </div>
      </section>

      {/* Places by Letter */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        {letters.map(letter => {
          const places = byLetter[letter] || [];
          return (
            <div key={letter} id={`letter-${letter}`} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
                  {letter}
                </span>
                <h2 className="text-xl font-bold text-scripture">{letter}</h2>
                <span className="text-sm text-primary-dark/60">({places.length})</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {places.map(p => (
                  <Link
                    key={p.slug}
                    href={`/bible-places/${p.slug}`}
                    className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                        {p.name}
                      </span>
                      {p.lat !== null && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-green-50 text-green-600">
                          Mapped
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-primary-dark/50 capitalize">{p.type}</span>
                      {p.verseCount > 0 && (
                        <span className="text-xs text-primary-dark/40">{p.verseCount} verse{p.verseCount !== 1 ? 's' : ''}</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Related Resources */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-scripture mb-2">Explore More</h2>
          <p className="text-sm text-primary-dark/70 mb-4">
            Discover Bible geography organized by book and chapter.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/bible-geography" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Bible Geography by Book
            </Link>
            <Link href="/people" className="px-5 py-2.5 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-primary-light transition-colors">
              Bible People
            </Link>
            <Link href="/bible-quizzes" className="px-5 py-2.5 bg-white text-primary-dark/80 text-sm font-medium rounded-lg border border-grace hover:bg-primary-light/50 transition-colors">
              Bible Quizzes
            </Link>
          </div>
        </div>
        <GeoAttribution compact />
      </section>
    </>
  );
}
