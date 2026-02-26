import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGeographyForEra, getAllEraGeographySlugs } from '@/lib/timeline-geography-bridge';
import { StructuredData } from '@/components/StructuredData';
import { BibleMap as BibleMapDynamic } from '@/components/BibleMapDynamic';

interface PageProps {
  params: Promise<{ era: string }>;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { era } = await params;
  const data = getGeographyForEra(era);
  if (!data) return {};

  return {
    title: `Places of the ${data.eraName} | Bible Geography by Era | Bible Maximum`,
    description: `Explore ${data.places.length} biblical places from the ${data.eraName}. Interactive map and event timeline with scripture references.`,
    keywords: [
      `${data.eraName} places`, `${data.eraName} geography`, `${data.eraName} Bible map`,
      'Bible geography', 'biblical places', 'Bible history map',
    ],
    openGraph: {
      title: `Places of the ${data.eraName}`,
      description: `${data.places.length} biblical places from the ${data.eraName}.`,
      url: `/bible-places/era/${era}`,
      type: 'website',
    },
    alternates: { canonical: `/bible-places/era/${era}` },
  };
}

export default async function EraGeographyPage({ params }: PageProps) {
  const { era } = await params;
  const data = getGeographyForEra(era);
  if (!data) notFound();

  const allSlugs = getAllEraGeographySlugs();
  const currentIdx = allSlugs.indexOf(era);
  const prevSlug = currentIdx > 0 ? allSlugs[currentIdx - 1] : null;
  const nextSlug = currentIdx < allSlugs.length - 1 ? allSlugs[currentIdx + 1] : null;

  // Prepare map markers
  const mapMarkers = data.places
    .filter(p => p.lat !== null && p.lon !== null)
    .map(p => ({
      slug: p.slug,
      name: p.name,
      lat: p.lat!,
      lon: p.lon!,
    }));

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Places of the ${data.eraName}`,
    description: `${data.places.length} biblical places from the ${data.eraName}.`,
    url: `https://biblemaximum.com/bible-places/era/${era}`,
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bible Places', item: 'https://biblemaximum.com/bible-places' },
      { '@type': 'ListItem', position: 3, name: 'By Era', item: 'https://biblemaximum.com/bible-places/era' },
      { '@type': 'ListItem', position: 4, name: data.eraName },
    ],
  };

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />

      <div className="min-h-screen bg-primary-light/30">
        <nav className="bg-white border-b border-grace">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <ol className="flex items-center flex-wrap gap-y-1 text-sm">
              <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
              <li className="text-primary-dark/40 mx-2">/</li>
              <li><Link href="/bible-places" className="text-blue-600 hover:underline">Bible Places</Link></li>
              <li className="text-primary-dark/40 mx-2">/</li>
              <li><Link href="/bible-places/era" className="text-blue-600 hover:underline">By Era</Link></li>
              <li className="text-primary-dark/40 mx-2">/</li>
              <li className="text-primary-dark/70 truncate max-w-[200px]">{data.eraName}</li>
            </ol>
          </div>
        </nav>

        <section className="py-12 bg-gradient-to-b from-blue-50 to-primary-light/30">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-display text-scripture mb-3">
              Places of the <span className="text-blue-600">{data.eraName}</span>
            </h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mx-auto">
              {data.places.length} biblical places and {data.events.length} key events
              from this period of biblical history.
            </p>
          </div>
        </section>

        <main className="max-w-4xl mx-auto px-4 pb-12">
          {/* Map */}
          {mapMarkers.length > 0 && (
            <section className="mb-8 bg-white border border-grace rounded-xl overflow-hidden shadow-sm">
              <div className="h-[400px]">
                <BibleMapDynamic markers={mapMarkers} height="400px" />
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link href="/timeline" className="bg-blue-600 rounded-lg p-5 text-white shadow-lg flex items-center justify-between hover:bg-blue-700 transition-colors">
              <div>
                <h3 className="font-bold text-lg">Full Bible Timeline</h3>
                <p className="text-white/80 text-xs">Complete chronological history</p>
              </div>
              <span className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm uppercase shrink-0 ml-3">View</span>
            </Link>
            <Link href="/bible-geography-quiz" className="bg-scripture rounded-lg p-5 text-white shadow-lg flex items-center justify-between hover:bg-scripture/90 transition-colors">
              <div>
                <h3 className="font-bold text-lg">Geography Quizzes</h3>
                <p className="text-white/80 text-xs">Test your knowledge of Bible places</p>
              </div>
              <span className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-bold text-sm uppercase shrink-0 ml-3">Quiz</span>
            </Link>
          </div>

          {/* Events Timeline */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-scripture mb-6">Events &amp; Places</h2>
            <div className="space-y-4">
              {data.events.map((event, i) => (
                <div
                  key={i}
                  className="bg-white border border-grace rounded-xl p-5 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-lg font-semibold text-scripture">{event.title}</h3>
                    <span className="text-xs text-primary-dark/40 font-medium shrink-0 ml-2">{event.date}</span>
                  </div>
                  {event.scriptureRefs.length > 0 && (
                    <p className="text-xs text-blue-600 mb-2">{event.scriptureRefs.join(', ')}</p>
                  )}
                  {event.places.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {event.places.map(name => {
                        const place = data.places.find(p => p.name === name);
                        return place ? (
                          <Link
                            key={name}
                            href={`/bible-places/${place.slug}`}
                            className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100 transition-colors"
                          >
                            {name}
                          </Link>
                        ) : (
                          <span key={name} className="px-2 py-0.5 bg-grace/30 text-primary-dark/60 text-xs rounded">
                            {name}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* All Places in this Era */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-scripture mb-4">All Places in this Era</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {data.places.map(place => (
                <Link
                  key={place.slug}
                  href={`/bible-places/${place.slug}`}
                  className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors"
                >
                  {place.name}
                  <span className="text-xs text-primary-dark/40 ml-1">({place.type})</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Era Navigation */}
          <div className="flex items-stretch justify-between gap-4 mb-8">
            {prevSlug ? (
              <Link
                href={`/bible-places/era/${prevSlug}`}
                className="flex-1 bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="text-xs text-primary-dark/60">Previous Era</span>
                <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors truncate">
                  {getGeographyForEra(prevSlug)?.eraName || prevSlug}
                </span>
              </Link>
            ) : <div className="flex-1" />}
            {nextSlug ? (
              <Link
                href={`/bible-places/era/${nextSlug}`}
                className="flex-1 text-right bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="text-xs text-primary-dark/60">Next Era</span>
                <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors truncate">
                  {getGeographyForEra(nextSlug)?.eraName || nextSlug}
                </span>
              </Link>
            ) : <div className="flex-1" />}
          </div>

          {/* Internal Links */}
          <section className="bg-grace/10 border border-grace rounded-xl p-6">
            <h2 className="text-lg font-bold text-scripture mb-3">Related Resources</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              <Link href="/bible-places/era" className="text-blue-600 hover:underline text-sm">All Eras</Link>
              <Link href="/bible-places" className="text-blue-600 hover:underline text-sm">All Bible Places</Link>
              <Link href="/timeline" className="text-blue-600 hover:underline text-sm">Bible Timeline</Link>
              <Link href="/bible-geography" className="text-blue-600 hover:underline text-sm">Bible Geography</Link>
              <Link href="/bible-geography-quiz" className="text-blue-600 hover:underline text-sm">Geography Quizzes</Link>
              <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">Bible Quizzes</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
