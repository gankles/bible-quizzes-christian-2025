import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCommandmentTopicSlugs, getCommandmentsForTopic, getCommandmentTopicBridgeStats } from '@/lib/commandment-topic-bridge';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: '613 Commandments by Topic | Biblical Commands Organized by Theme | Bible Maximum',
  description: 'Explore the 613 biblical commandments organized by topic. Discover how Torah commands relate to themes like sabbath, worship, justice, purity, and more.',
  keywords: [
    '613 commandments by topic', 'biblical commandments topics', 'Torah commands themes',
    'commandments organized', 'mitzvot by topic',
  ],
  openGraph: {
    title: '613 Commandments by Topic',
    description: 'Explore biblical commandments organized by topic and theme.',
    url: '/commandments/topic',
    type: 'website',
  },
  alternates: { canonical: '/commandments/topic' },
};

function formatTopicName(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export default function CommandmentsByTopicHubPage() {
  const slugs = getAllCommandmentTopicSlugs();
  const stats = getCommandmentTopicBridgeStats();

  const topicsWithCounts = slugs
    .map(slug => ({
      slug,
      name: formatTopicName(slug),
      count: getCommandmentsForTopic(slug).length,
    }))
    .sort((a, b) => b.count - a.count);

  const featured = topicsWithCounts.slice(0, 12);
  const remaining = topicsWithCounts.slice(12);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '613 Commandments by Topic',
    description: 'Explore the 613 biblical commandments organized by topic.',
    url: 'https://biblemaximum.com/commandments/topic',
    numberOfItems: slugs.length,
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Commandments', item: 'https://biblemaximum.com/commandments' },
      { '@type': 'ListItem', position: 3, name: 'By Topic' },
    ],
  };

  return (
    <>
      <StructuredData data={collectionSchema} />
      <StructuredData data={breadcrumbSchema} />

      <Breadcrumb items={[
        { label: 'Commandments', href: '/commandments' },
        { label: 'By Topic' },
      ]} />

      <div className="min-h-screen bg-primary-light/30">
        <section className="py-16 bg-gradient-to-b from-blue-50 to-primary-light/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-scripture mb-4">
              613 Commandments <span className="text-blue-600">by Topic</span>
            </h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mx-auto mb-8">
              Explore how the 613 biblical commandments connect to key themes and topics
              found throughout Scripture.
            </p>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.totalBridgePages}</div>
                <div className="text-sm text-primary-dark/60">Topic Pages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.totalCommandments}</div>
                <div className="text-sm text-primary-dark/60">Commandments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.avgCommandmentsPerTopic}</div>
                <div className="text-sm text-primary-dark/60">Avg per Topic</div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-2rem] relative z-20 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/commandments" className="bg-blue-600 rounded-lg p-6 text-white shadow-lg flex items-center justify-between hover:bg-blue-700 transition-colors">
              <div>
                <h3 className="font-bold text-lg">Browse All 613 Commandments</h3>
                <p className="text-white/80 text-xs">Complete list with scripture references</p>
              </div>
              <span className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm uppercase shrink-0 ml-3">View</span>
            </Link>
            <Link href="/topics" className="bg-scripture rounded-lg p-6 text-white shadow-lg flex items-center justify-between hover:bg-scripture/90 transition-colors">
              <div>
                <h3 className="font-bold text-lg">Browse Bible Topics</h3>
                <p className="text-white/80 text-xs">6,700+ topics with verse references</p>
              </div>
              <span className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-bold text-sm uppercase shrink-0 ml-3">Explore</span>
            </Link>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <section className="mb-12">
            <h2 className="text-2xl font-bold font-display text-scripture mb-6">Featured Topics</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map(({ slug, name, count }) => (
                <Link
                  key={slug}
                  href={`/commandments/topic/${slug}`}
                  className="bg-white border border-grace rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <h3 className="text-lg font-semibold text-scripture group-hover:text-blue-600 transition-colors mb-1">{name}</h3>
                  <p className="text-sm text-primary-dark/60">{count} commandment{count !== 1 ? 's' : ''} related to this topic</p>
                </Link>
              ))}
            </div>
          </section>

          {remaining.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold font-display text-scripture mb-6">All Topics</h2>
              <div className="flex flex-wrap gap-2">
                {remaining.map(({ slug, name, count }) => (
                  <Link
                    key={slug}
                    href={`/commandments/topic/${slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-grace rounded-lg text-sm text-primary-dark/80 hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    {name} <span className="text-xs text-primary-dark/40">({count})</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="bg-grace/10 border border-grace rounded-xl p-6 mt-8">
            <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/commandments" className="text-blue-600 hover:underline text-sm">All 613 Commandments</Link>
              <Link href="/topics" className="text-blue-600 hover:underline text-sm">Bible Topics</Link>
              <Link href="/characters-by-topic" className="text-blue-600 hover:underline text-sm">Characters by Topic</Link>
              <Link href="/character-quiz" className="text-blue-600 hover:underline text-sm">Character Quizzes</Link>
              <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">Bible Quizzes</Link>
              <Link href="/timeline" className="text-blue-600 hover:underline text-sm">Bible Timeline</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
