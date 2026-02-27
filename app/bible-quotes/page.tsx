import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  getFeaturedQuoteTopics,
  getQuoteCategories,
  getQuoteLetterIndex,
  getQuoteTopicCount,
  getTotalVerseRefCount,
} from '@/lib/bible-quotes-data';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Bible Quotes by Topic — 8,400+ Topics with Scripture Verses (KJV)',
  description:
    'Browse Bible quotes organized by topic. Over 8,400 topics with 200,000+ Scripture references from the King James Version. Find verses about love, faith, hope, prayer, forgiveness, and more.',
  keywords: [
    'bible quotes',
    'bible verses by topic',
    'topical bible verses',
    'scripture quotes',
    'bible quotes about love',
    'bible quotes about faith',
    'bible quotes about hope',
    'inspirational bible verses',
    'KJV bible quotes',
  ],
  alternates: {
    canonical: 'https://biblemaximum.com/bible-quotes',
  },
  openGraph: {
    title: 'Bible Quotes by Topic — 8,400+ Topics',
    description:
      'Browse Bible quotes organized by topic. Over 8,400 topics with 200,000+ Scripture references from the KJV.',
    url: 'https://biblemaximum.com/bible-quotes',
    type: 'website',
  },
};

export default function BibleQuotesHubPage() {
  const featured = getFeaturedQuoteTopics();
  const categories = getQuoteCategories();
  const letterIndex = getQuoteLetterIndex();
  const topicCount = getQuoteTopicCount();
  const verseCount = getTotalVerseRefCount();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com' },
      { '@type': 'ListItem', position: 2, name: 'Bible Quotes', item: 'https://biblemaximum.com/bible-quotes' },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Quotes by Topic',
    description: `Browse ${topicCount.toLocaleString()} Bible topics with ${verseCount.toLocaleString()} Scripture references from the King James Version.`,
    url: 'https://biblemaximum.com/bible-quotes',
    isPartOf: { '@type': 'WebSite', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
    numberOfItems: topicCount,
    datePublished: '2026-02-27',
    dateModified: '2026-02-27',
    author: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
  };

  return (
    <div className="min-h-screen bg-primary-light/30">
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={collectionSchema} />

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-grace">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <ol className="flex items-center text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            </li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li className="text-primary-dark/70">Bible Quotes</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png"
            alt="Open Bible"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Bible Quotes by Topic</h1>
          <p className="text-blue-100 text-lg max-w-2xl mb-6">
            Explore {topicCount.toLocaleString()} topics with {verseCount.toLocaleString()} Scripture
            references from the King James Version. Find the perfect Bible verse for any subject.
          </p>
          <div className="flex gap-6 text-sm">
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <span className="font-bold text-xl">{topicCount.toLocaleString()}</span>
              <span className="text-blue-200 ml-2">Topics</span>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <span className="font-bold text-xl">{verseCount.toLocaleString()}</span>
              <span className="text-blue-200 ml-2">Verse References</span>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <span className="font-bold text-xl">66</span>
              <span className="text-blue-200 ml-2">Bible Books</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* A-Z Navigation */}
        <nav className="bg-white rounded-xl shadow-sm border border-grace p-4 mb-8">
          <h2 className="text-sm font-semibold text-primary-dark/60 uppercase tracking-wider mb-3">Browse by Letter</h2>
          <div className="flex flex-wrap gap-1">
            {letterIndex.map(({ letter, count }) => (
              <Link
                key={letter}
                href={`#letter-${letter}`}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  count > 0
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    : 'bg-gray-50 text-gray-300 cursor-default'
                }`}
                title={count > 0 ? `${count} topics starting with ${letter}` : `No topics starting with ${letter}`}
              >
                {letter}
              </Link>
            ))}
          </div>
        </nav>

        {/* Featured / Most Searched Topics */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-scripture mb-6">Most Searched Bible Quotes</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.slice(0, 30).map((topic) => (
              <Link
                key={topic.slug}
                href={`/bible-quotes/${topic.slug}`}
                className="bg-white rounded-xl shadow-sm border border-grace p-5 hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                    Bible Quotes About {topic.name}
                  </h3>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full whitespace-nowrap ml-2">
                    {topic.verseCount} verses
                  </span>
                </div>
                <p className="text-sm text-primary-dark/60 line-clamp-2">{topic.description}</p>
                <span className="inline-block mt-3 text-xs text-blue-600 font-medium">
                  Read Verses →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse by Category */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-scripture mb-6">Browse by Category</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {categories.filter(c => c.name !== 'Miscellaneous').map((cat) => (
              <div key={cat.name} className="bg-white rounded-xl shadow-sm border border-grace p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-scripture">{cat.name}</h3>
                  <span className="text-xs text-primary-dark/50">{cat.count} topics</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.topTopics.map((topic) => (
                    <Link
                      key={topic.slug}
                      href={`/bible-quotes/${topic.slug}`}
                      className="px-3 py-1.5 bg-primary-light/30 border border-grace rounded-lg text-sm text-primary-dark/80 hover:border-blue-300 hover:text-blue-600 transition-colors"
                    >
                      {topic.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Full A-Z Directory */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-scripture mb-6">All Bible Quote Topics A-Z</h2>
          {letterIndex.filter(l => l.count > 0).map(({ letter, count }) => {
            // Get topics for this letter from the featured + categories
            const allTopics = getFeaturedQuoteTopics(); // This is just for rendering; full data loaded on [slug]
            return (
              <div key={letter} id={`letter-${letter}`} className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg font-bold text-lg">
                    {letter}
                  </span>
                  <span className="text-sm text-primary-dark/50">{count} topics</span>
                </div>
              </div>
            );
          })}
          <p className="text-sm text-primary-dark/60">
            Use the search or browse individual topics above to explore all {topicCount.toLocaleString()} Bible quote categories.
          </p>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Study the Bible by Topic</h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-6">
            Deepen your understanding of Scripture with our topical Bible study tools,
            quizzes, word studies, and cross-references.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/bible-quizzes"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Bible Quizzes
            </Link>
            <Link
              href="/bible-topics"
              className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Topical Bible Study
            </Link>
            <Link
              href="/topics"
              className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Bible Topics
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
