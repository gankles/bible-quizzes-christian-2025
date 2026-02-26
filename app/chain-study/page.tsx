import { Metadata } from 'next';
import Link from 'next/link';
import { StructuredData } from '@/components/StructuredData';
import {
  getAllChainStudies,
  getChainStats,
  getFeaturedChains,
  getChainSections,
} from '@/lib/chain-data';

export const metadata: Metadata = {
  title: 'Bible Chain Studies | Thompson Chain Reference-Style Topical Studies | 900+ Themes Traced Through Scripture | Bible Maximum',
  description: 'Explore 900+ chain studies that trace biblical themes from Genesis to Revelation. Each chain follows a topic chronologically through both testaments, revealing the unity and progression of Scripture.',
  keywords: [
    'Bible chain study', 'Thompson Chain Reference', 'topical Bible study',
    'Bible themes', 'Scripture chain', 'Bible topics through Scripture',
    'Old and New Testament themes', 'chronological Bible study',
    'Bible chain reference', 'trace themes through Bible',
  ],
  openGraph: {
    title: 'Bible Chain Studies -- Trace Themes Through Scripture',
    description: 'Over 900 chain studies tracing themes chronologically from Genesis to Revelation.',
    url: '/chain-study',
    type: 'website',
  },
  alternates: { canonical: '/chain-study' },
};

export default function ChainStudyIndexPage() {
  const stats = getChainStats();
  const featured = getFeaturedChains(20);
  const sections = getChainSections();
  const allChains = getAllChainStudies();

  // Group all chains by section letter
  const bySection: Record<string, typeof allChains> = {};
  for (const chain of allChains) {
    if (!bySection[chain.section]) bySection[chain.section] = [];
    bySection[chain.section].push(chain);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Chain Studies',
    description: metadata.description,
    url: 'https://biblemaximum.com/chain-study',
    numberOfItems: stats.totalChains,
  };

  return (
    <div className="min-h-screen bg-primary-light/30">
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-grace">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <ol className="flex items-center text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            </li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li className="text-primary-dark/70">Chain Studies</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-white border-b border-grace">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-2">
            Thompson Chain Reference-Style Studies
          </p>
          <h1 className="text-3xl md:text-4xl font-bold font-display text-scripture mb-4">
            Bible Chain Studies
          </h1>
          <p className="text-lg text-primary-dark/70 max-w-2xl mb-8">
            Trace biblical themes chronologically from Genesis to Revelation. Each chain study
            follows a topic through both testaments, revealing the unity and progressive
            revelation of Scripture.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-scripture">{stats.totalChains.toLocaleString()}</p>
              <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Chain Studies</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-scripture">{stats.totalVerses.toLocaleString()}</p>
              <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Total Verses</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-scripture">{stats.averageBooks}</p>
              <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Avg. Books Per Chain</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">

        {/* Featured Chains */}
        <section>
          <h2 className="text-2xl font-bold font-display text-scripture mb-2">
            Featured Chain Studies
          </h2>
          <p className="text-primary-dark/60 text-sm mb-6">
            The most comprehensive chains spanning the most books of the Bible
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map(chain => (
              <Link
                key={chain.slug}
                href={`/chain-study/${chain.slug}`}
                className="block bg-white rounded-lg border border-grace p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <p className="font-semibold text-scripture group-hover:text-blue-600 transition-colors mb-2">
                  {chain.subject}
                </p>
                <div className="flex items-center gap-2 text-xs text-primary-dark/50">
                  <span className="font-medium">{chain.bookCount} books</span>
                  <span className="w-1 h-1 rounded-full bg-primary-dark/20"></span>
                  <span>{chain.totalVerses} verses</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-amber-50 text-amber-700 border border-amber-100">
                    {chain.otBookCount} OT
                  </span>
                  <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-blue-50 text-blue-700 border border-blue-100">
                    {chain.ntBookCount} NT
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* A-Z Navigation */}
        <section>
          <h2 className="text-2xl font-bold font-display text-scripture mb-4">
            Browse All Chain Studies A-Z
          </h2>

          {/* Letter Jump Links */}
          <div className="flex flex-wrap gap-1.5 mb-8">
            {sections.map(({ letter, count }) => (
              <a
                key={letter}
                href={`#section-${letter}`}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-grace text-sm font-medium text-scripture hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
                title={`${letter} -- ${count} chains`}
              >
                {letter}
              </a>
            ))}
          </div>

          {/* Section Listings */}
          <div className="space-y-8">
            {sections.map(({ letter, count }) => {
              const sectionChains = bySection[letter] || [];
              return (
                <div key={letter} id={`section-${letter}`}>
                  <div className="flex items-center gap-3 mb-3 border-b border-grace pb-2">
                    <span className="text-2xl font-bold text-scripture">{letter}</span>
                    <span className="text-sm text-primary-dark/40">{count} chains</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1.5">
                    {sectionChains.map(chain => (
                      <Link
                        key={chain.slug}
                        href={`/chain-study/${chain.slug}`}
                        className="flex items-center justify-between py-1.5 text-sm text-primary-dark/80 hover:text-blue-600 transition-colors group"
                      >
                        <span className="group-hover:underline">{chain.subject}</span>
                        <span className="text-xs text-primary-dark/30 flex-shrink-0 ml-2">
                          {chain.bookCount} books
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* What is a Chain Study? */}
        <section className="bg-white rounded-xl border border-grace p-6 md:p-8">
          <h2 className="text-2xl font-bold font-display text-scripture mb-4">
            What Is a Bible Chain Study?
          </h2>
          <div className="prose prose-scripture max-w-none text-primary-dark/80">
            <p>
              A chain study traces a single theme, topic, or concept chronologically through the
              books of the Bible. Inspired by the Thompson Chain Reference Bible, this method
              reveals how God progressively unfolds His truth from Genesis to Revelation.
            </p>
            <p>
              Each chain in our collection spans at least 4 different books of the Bible and
              bridges both the Old and New Testaments. This ensures every chain demonstrates
              the continuity of Scripture and the consistency of God&apos;s message across
              thousands of years of revelation.
            </p>
            <p>
              Chain studies are especially valuable for understanding major doctrines,
              character traits, divine attributes, and recurring themes that weave
              through the entire biblical narrative.
            </p>
          </div>
        </section>

        {/* CRO Links */}
        <section className="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200 p-6 md:p-8">
          <h2 className="text-xl font-bold font-display text-scripture mb-4">
            More Ways to Study the Bible
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/topics"
              className="block bg-white rounded-lg border border-grace p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <p className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                Bible Topics
              </p>
              <p className="text-sm text-primary-dark/60 mt-1">
                Browse topics with verse text and commentary
              </p>
            </Link>
            <Link
              href="/bible-encyclopedia"
              className="block bg-white rounded-lg border border-grace p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <p className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                Bible Encyclopedia
              </p>
              <p className="text-sm text-primary-dark/60 mt-1">
                People, places, and topics with etymology and definitions
              </p>
            </Link>
            <Link
              href="/bible-quizzes"
              className="block bg-white rounded-lg border border-grace p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <p className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                Bible Quizzes
              </p>
              <p className="text-sm text-primary-dark/60 mt-1">
                Test your biblical knowledge with interactive quizzes
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
