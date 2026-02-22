import { Metadata } from 'next';
import Link from 'next/link';
import { getAllResources, getResourcesStats } from '@/lib/resources-data';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Bible Resources | 39 Topical Studies & Reference Guides | Bible Maximum',
  description:
    'Browse 39 in-depth Bible study resources covering theology, doctrine, and biblical topics. Each guide includes verse references, study notes, and organized categories for serious Bible study.',
  keywords: [
    'Bible resources',
    'Bible study guides',
    'topical Bible study',
    'Bible reference',
    'theology study',
    'doctrine study',
    'Bible verse references',
    'KJV study resources',
  ],
  openGraph: {
    title: 'Bible Resources — 39 Topical Studies & Reference Guides',
    description:
      'In-depth Bible study resources covering theology, doctrine, and biblical topics with verse references.',
    url: '/resources',
    type: 'website',
  },
  alternates: { canonical: '/resources' },
};

export default function ResourcesPage() {
  const resources = getAllResources();
  const stats = getResourcesStats();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Resources & Reference Guides',
    description: metadata.description,
    url: 'https://biblemaximum.com/resources',
    numberOfItems: stats.totalResources,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Bible Maximum',
      url: 'https://biblemaximum.com',
    },
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">Resources</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white border-b border-grace">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-scripture">
              Bible Resources &amp; Reference Guides
            </h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mb-6">
              In-depth topical studies and reference guides for serious Bible
              study. Each resource is organized by category with extensive KJV
              verse references and study notes.
            </p>
            <div className="flex flex-wrap gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-scripture">
                  {stats.totalResources}
                </p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">
                  Resources
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">
                  {stats.totalCategories}
                </p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">
                  Categories
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">
                  {stats.totalEntries.toLocaleString()}
                </p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">
                  Study Entries
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">
                  {stats.totalVerses.toLocaleString()}
                </p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">
                  Verse References
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Link
              key={resource.slug}
              href={`/resources/${resource.slug}`}
              className="bg-white border border-grace rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <h2 className="text-lg font-bold text-scripture group-hover:text-blue-600 transition-colors mb-1">
                {resource.title}
              </h2>
              {resource.subtitle && (
                <p className="text-sm text-primary-dark/60 mb-3">
                  {resource.subtitle}
                </p>
              )}
              <div className="flex items-center gap-4 text-xs text-primary-dark/60">
                <span>
                  {resource.categories.length}{' '}
                  {resource.categories.length === 1 ? 'section' : 'sections'}
                </span>
                <span className="w-1 h-1 rounded-full bg-primary-dark/30" />
                <span>
                  {resource.totalEntries}{' '}
                  {resource.totalEntries === 1 ? 'entry' : 'entries'}
                </span>
                <span className="w-1 h-1 rounded-full bg-primary-dark/30" />
                <span>
                  {resource.totalVerses}{' '}
                  {resource.totalVerses === 1 ? 'verse' : 'verses'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Internal Links */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-scripture mb-2">
            Explore More
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/topics"
              className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Bible Topics
            </Link>
            <Link
              href="/nave-topics"
              className="px-5 py-2.5 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-primary-light transition-colors"
            >
              Nave&apos;s Topical Bible
            </Link>
            <Link
              href="/commandments"
              className="px-5 py-2.5 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-primary-light transition-colors"
            >
              613 Commandments
            </Link>
            <Link
              href="/lexicon"
              className="px-5 py-2.5 bg-white text-primary-dark/80 text-sm font-medium rounded-lg border border-grace hover:bg-primary-light/50 transition-colors"
            >
              Hebrew &amp; Greek Lexicon
            </Link>
            <Link
              href="/bible-quizzes"
              className="px-5 py-2.5 bg-white text-primary-dark/80 text-sm font-medium rounded-lg border border-grace hover:bg-primary-light/50 transition-colors"
            >
              Bible Quizzes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
