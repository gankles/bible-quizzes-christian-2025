import { Metadata } from 'next';
import Link from 'next/link';
import { getAllRoutes, getRouteStats, ERA_LABELS, ERA_ORDER, ERA_COLORS } from '@/lib/bible-routes';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Bible Journeys & Travel Routes | Maps of 179 Biblical Paths | Bible Maximum',
  description: 'Browse 179 real biblical travel routes, from Abram\'s journey to Haran to Paul\'s voyage to Rome, mapped from original coordinates and grouped by era.',
  keywords: [
    'Bible journeys', 'Bible routes', 'biblical travel routes', 'Bible maps',
    'Abraham journey map', 'Exodus route map', "Paul's missionary journeys map",
    'Jesus ministry map',
  ],
  openGraph: {
    title: 'Bible Journeys & Travel Routes',
    description: '179 real biblical travel routes mapped from original coordinates, grouped by era.',
    url: '/bible-journeys',
    type: 'website',
  },
  alternates: { canonical: '/bible-journeys' },
};

export default function BibleJourneysPage() {
  const routes = getAllRoutes();
  const stats = getRouteStats();

  const eras = ERA_ORDER
    .filter(era => stats.byEra[era])
    .map(era => ({
      era,
      label: ERA_LABELS[era],
      color: ERA_COLORS[era]?.color,
      routes: routes.filter(r => r.era === era).sort((a, b) => a.title.localeCompare(b.title)),
    }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Journeys & Travel Routes',
    description: metadata.description,
    url: 'https://biblemaximum.com/bible-journeys',
    numberOfItems: routes.length,
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-ink-muted">
        <Link href="/" className="hover:text-gold-dark">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">Bible Journeys</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white border-b border-grace">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-scripture">
              Bible Journeys & Travel Routes
            </h1>
            <p className="text-lg text-ink-muted max-w-2xl mb-6">
              From Abram&rsquo;s walk to Haran to Paul&rsquo;s voyage to Rome, every route below is
              drawn from real geographic coordinates, not an illustrative sketch. Browse by era
              to find the journey behind a story you&rsquo;re studying.
            </p>

            <div className="flex flex-wrap gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.totalRoutes}</p>
                <p className="text-xs text-ink-muted uppercase tracking-wider">Journeys</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-sacred">{eras.length}</p>
                <p className="text-xs text-ink-muted uppercase tracking-wider">Eras</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.totalPoints.toLocaleString()}</p>
                <p className="text-xs text-ink-muted uppercase tracking-wider">Mapped Points</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Era sections */}
      {eras.map(({ era, label, color, routes: eraRoutes }) => (
        <section key={era} className="max-w-6xl mx-auto px-4 pb-8">
          <h2 className="text-xl font-bold text-scripture mb-1 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            {label}
          </h2>
          <p className="text-xs text-ink-light mb-4">{eraRoutes.length} journeys</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {eraRoutes.map(route => (
              <Link
                key={route.slug}
                href={`/bible-journeys/${route.slug}`}
                className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-sacred/50 transition-all group"
              >
                <span className="font-semibold text-scripture group-hover:text-gold-dark transition-colors">
                  {route.title}
                </span>
                {route.narrativeGroup && route.narrativeGroup !== route.title && (
                  <span className="block text-xs text-ink-light mt-0.5">{route.narrativeGroup}</span>
                )}
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Related Resources */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-scripture mb-2">Explore More</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/bible-geography" className="px-5 py-2.5 bg-scripture text-white text-sm font-medium rounded-lg hover:bg-ink-muted transition-colors">
              Bible Geography by Book
            </Link>
            <Link href="/bible-places" className="px-5 py-2.5 bg-white text-sacred text-sm font-medium rounded-lg border border-sacred/50 hover:bg-primary-light transition-colors">
              Bible Places A-Z
            </Link>
          </div>
        </div>
        <p className="text-xs text-ink-light mt-4">
          Journey routes:{' '}
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
