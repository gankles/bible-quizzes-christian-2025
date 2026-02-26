import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCharacterTopicBridgeSlugs, getCharactersForTopic, getCharacterTopicBridgeStats } from '@/lib/character-topic-bridge';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Bible Characters by Topic | Explore Biblical Figures Through Themes | Bible Maximum',
  description: 'Discover Bible characters organized by topic. Explore how biblical figures like Abraham, Moses, David, and Paul connect to themes of faith, obedience, prayer, and more.',
  keywords: [
    'Bible characters by topic', 'biblical figures themes', 'Bible character study',
    'topical Bible characters', 'Bible character topics', 'biblical themes characters',
  ],
  openGraph: {
    title: 'Bible Characters by Topic',
    description: 'Explore Bible characters organized by topic and theme.',
    url: '/characters-by-topic',
    type: 'website',
  },
  alternates: { canonical: '/characters-by-topic' },
};

function formatTopicName(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export default function CharactersByTopicHubPage() {
  const slugs = getAllCharacterTopicBridgeSlugs();
  const stats = getCharacterTopicBridgeStats();

  // Get top topics with most characters for featured section
  const topicsWithCounts = slugs
    .map(slug => ({
      slug,
      name: formatTopicName(slug),
      count: getCharactersForTopic(slug).length,
    }))
    .sort((a, b) => b.count - a.count);

  const featured = topicsWithCounts.slice(0, 12);
  const remaining = topicsWithCounts.slice(12);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Characters by Topic',
    description: 'Explore Bible characters organized by topic and theme.',
    url: 'https://biblemaximum.com/characters-by-topic',
    numberOfItems: slugs.length,
    publisher: {
      '@type': 'Organization',
      name: 'Bible Maximum',
      url: 'https://biblemaximum.com',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Characters', item: 'https://biblemaximum.com/characters' },
      { '@type': 'ListItem', position: 3, name: 'Characters by Topic' },
    ],
  };

  return (
    <>
      <StructuredData data={collectionSchema} />
      <StructuredData data={breadcrumbSchema} />

      <Breadcrumb items={[
        { label: 'Characters', href: '/characters' },
        { label: 'Characters by Topic' },
      ]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-blue-50 to-primary-light/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-scripture mb-4">
              Bible Characters <span className="text-blue-600">by Topic</span>
            </h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mx-auto mb-8">
              Discover how biblical figures connect to key themes and topics.
              Explore characters whose lives, events, and significance relate to
              topics like faith, obedience, prayer, and more.
            </p>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.totalBridgePages}</div>
                <div className="text-sm text-primary-dark/60">Topic Pages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.totalCharacters}</div>
                <div className="text-sm text-primary-dark/60">Characters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.avgCharactersPerTopic}</div>
                <div className="text-sm text-primary-dark/60">Avg per Topic</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-2rem] relative z-20 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/character-quiz" className="bg-blue-600 rounded-lg p-6 text-white shadow-lg flex items-center justify-between hover:bg-blue-700 transition-colors">
              <div>
                <h3 className="font-bold text-lg">Character Quizzes</h3>
                <p className="text-white/80 text-xs">Test your knowledge of 127 Bible characters</p>
              </div>
              <span className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase shrink-0 ml-3">Start</span>
            </Link>
            <Link href="/topics" className="bg-scripture rounded-lg p-6 text-white shadow-lg flex items-center justify-between hover:bg-scripture/90 transition-colors">
              <div>
                <h3 className="font-bold text-lg">Browse All Topics</h3>
                <p className="text-white/80 text-xs">6,700+ Bible topics with verse references</p>
              </div>
              <span className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase shrink-0 ml-3">Explore</span>
            </Link>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Featured Topics */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold font-display text-scripture mb-6">Featured Topics</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map(({ slug, name, count }) => (
                <Link
                  key={slug}
                  href={`/characters-by-topic/${slug}`}
                  className="bg-white border border-grace rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <h3 className="text-lg font-semibold text-scripture group-hover:text-blue-600 transition-colors mb-1">
                    {name}
                  </h3>
                  <p className="text-sm text-primary-dark/60">
                    {count} Bible character{count !== 1 ? 's' : ''} related to this topic
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* All Topics */}
          {remaining.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold font-display text-scripture mb-6">All Topics</h2>
              <div className="flex flex-wrap gap-2">
                {remaining.map(({ slug, name, count }) => (
                  <Link
                    key={slug}
                    href={`/characters-by-topic/${slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-grace rounded-lg text-sm text-primary-dark/80 hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    {name}
                    <span className="text-xs text-primary-dark/40">({count})</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Internal Links */}
          <section className="bg-grace/10 border border-grace rounded-xl p-6 mt-8">
            <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/characters" className="text-blue-600 hover:underline text-sm">Bible Characters</Link>
              <Link href="/character-quiz" className="text-blue-600 hover:underline text-sm">Character Quizzes</Link>
              <Link href="/topics" className="text-blue-600 hover:underline text-sm">Bible Topics</Link>
              <Link href="/commandments" className="text-blue-600 hover:underline text-sm">613 Commandments</Link>
              <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">Bible Quizzes</Link>
              <Link href="/timeline" className="text-blue-600 hover:underline text-sm">Bible Timeline</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
