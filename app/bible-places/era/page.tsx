import { Metadata } from 'next';
import Link from 'next/link';
import { getAllEraGeographies, getTimelineGeographyStats } from '@/lib/timeline-geography-bridge';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Bible Places by Historical Era | Geography Through Biblical History | Bible Maximum',
  description: 'Explore biblical places organized by historical era. Discover the geography of primeval history, the patriarchs, the exodus, the monarchy, the exile, and the life of Christ.',
  keywords: [
    'Bible places by era', 'biblical geography timeline', 'Bible geography history',
    'historical Bible places', 'Bible maps by period',
  ],
  openGraph: {
    title: 'Bible Places by Historical Era',
    description: 'Explore biblical places organized by historical period.',
    url: '/bible-places/era',
    type: 'website',
  },
  alternates: { canonical: '/bible-places/era' },
};

export default function EraGeographyHubPage() {
  const eras = getAllEraGeographies();
  const stats = getTimelineGeographyStats();

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Places by Historical Era',
    description: 'Explore biblical places organized by historical period.',
    url: 'https://biblemaximum.com/bible-places/era',
    numberOfItems: eras.length,
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bible Places', item: 'https://biblemaximum.com/bible-places' },
      { '@type': 'ListItem', position: 3, name: 'By Era' },
    ],
  };

  return (
    <>
      <StructuredData data={collectionSchema} />
      <StructuredData data={breadcrumbSchema} />

      <Breadcrumb items={[
        { label: 'Bible Places', href: '/bible-places' },
        { label: 'By Era' },
      ]} />

      <div className="min-h-screen bg-primary-light/30">
        <section className="py-16 bg-gradient-to-b from-blue-50 to-primary-light/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-scripture mb-4">
              Bible Places by <span className="text-blue-600">Historical Era</span>
            </h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mx-auto mb-8">
              Journey through biblical history and discover the places where key events unfolded,
              from creation through the apostolic age.
            </p>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.totalEras}</div>
                <div className="text-sm text-primary-dark/60">Eras</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.totalPlaces}</div>
                <div className="text-sm text-primary-dark/60">Places</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.totalEvents}</div>
                <div className="text-sm text-primary-dark/60">Events</div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-2rem] relative z-20 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/bible-places" className="bg-blue-600 rounded-lg p-6 text-white shadow-lg flex items-center justify-between hover:bg-blue-700 transition-colors">
              <div>
                <h3 className="font-bold text-lg">Browse All Bible Places</h3>
                <p className="text-white/80 text-xs">1,300+ places with maps and verse references</p>
              </div>
              <span className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm uppercase shrink-0 ml-3">View</span>
            </Link>
            <Link href="/timeline" className="bg-scripture rounded-lg p-6 text-white shadow-lg flex items-center justify-between hover:bg-scripture/90 transition-colors">
              <div>
                <h3 className="font-bold text-lg">Bible Timeline</h3>
                <p className="text-white/80 text-xs">Complete chronological history</p>
              </div>
              <span className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-bold text-sm uppercase shrink-0 ml-3">Explore</span>
            </Link>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="space-y-6">
            {eras.map((era) => (
              <Link
                key={era.eraSlug}
                href={`/bible-places/era/${era.eraSlug}`}
                className="block bg-white border border-grace rounded-xl p-6 hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <h2 className="text-xl font-bold text-scripture group-hover:text-blue-600 transition-colors mb-2">
                  {era.eraName}
                </h2>
                <div className="flex gap-4 mb-3">
                  <span className="text-sm text-primary-dark/60">{era.places.length} places</span>
                  <span className="text-sm text-primary-dark/60">{era.events.length} events</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {era.places.slice(0, 8).map(p => (
                    <span key={p.slug} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded">
                      {p.name}
                    </span>
                  ))}
                  {era.places.length > 8 && (
                    <span className="px-2 py-0.5 bg-grace/30 text-primary-dark/40 text-xs rounded">
                      +{era.places.length - 8} more
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <section className="bg-grace/10 border border-grace rounded-xl p-6 mt-8">
            <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/bible-places" className="text-blue-600 hover:underline text-sm">All Bible Places</Link>
              <Link href="/timeline" className="text-blue-600 hover:underline text-sm">Bible Timeline</Link>
              <Link href="/bible-geography" className="text-blue-600 hover:underline text-sm">Bible Geography</Link>
              <Link href="/bible-geography-quiz" className="text-blue-600 hover:underline text-sm">Geography Quizzes</Link>
              <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">Bible Quizzes</Link>
              <Link href="/characters-by-topic" className="text-blue-600 hover:underline text-sm">Characters by Topic</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
