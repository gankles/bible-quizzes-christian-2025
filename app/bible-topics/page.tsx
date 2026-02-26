import { Metadata } from 'next';
import Link from 'next/link';
import {
  getAllNaveTopics,
  getNaveSections,
  getNavesStats,
  NaveTopic,
} from '@/lib/naves-data';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: "Nave's Topical Bible -- 5,000+ Topics with Every Verse Reference | Bible Maximum",
  description:
    'Browse over 5,000 Bible topics from A to Z in Nave\'s Topical Bible. Find every sub-topic and verse reference for comprehensive Scripture study on any subject.',
  keywords: [
    "Nave's Topical Bible",
    'Bible topics',
    'topical Bible study',
    'Bible verse by topic',
    'scripture references by subject',
    'Bible concordance topics',
  ],
  openGraph: {
    title: "Nave's Topical Bible -- 5,000+ Topics with Every Verse Reference",
    description:
      'Browse over 5,000 Bible topics from A to Z. Find every sub-topic and verse reference for comprehensive Scripture study.',
    type: 'website',
  },
  alternates: { canonical: '/bible-topics' },
};

export default function BibleTopicsIndexPage() {
  const allTopics = getAllNaveTopics();
  const sections = getNaveSections();
  const stats = getNavesStats();

  // Featured topics: top 10 by verse count
  const featured = [...allTopics]
    .filter(t => t.refCount > 0)
    .sort((a, b) => b.refCount - a.refCount)
    .slice(0, 10);

  // Group topics by section letter
  const grouped: Record<string, NaveTopic[]> = {};
  for (const t of allTopics) {
    const letter = t.section || '#';
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(t);
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "Nave's Topical Bible -- Complete A-Z Index",
    description:
      'Browse over 5,000 Bible topics from Nave\'s Topical Bible with verse references across every book of Scripture.',
    url: 'https://biblemaximum.com/bible-topics',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: stats.topics,
      itemListElement: featured.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t.subject,
        url: `https://biblemaximum.com/bible-topics/${t.slug}`,
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://biblemaximum.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Bible Topics',
          item: 'https://biblemaximum.com/bible-topics',
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <StructuredData data={schemaData} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 md:px-10 pt-6">
        <ol className="flex items-center gap-2 text-sm text-primary-dark/60">
          <li>
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          </li>
          <li aria-hidden="true">
            <svg className="w-4 h-4 text-primary-dark/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li>
            <span className="font-semibold text-scripture">Bible Topics</span>
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-amber-50 to-primary-light/30 py-16 md:py-24 border-b border-grace mt-4">
        <div className="max-w-7xl mx-auto px-4 md:px-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase mb-6">
            Nave&apos;s Topical Bible
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display text-scripture mb-6 leading-tight">
            Bible Topics<br />
            <span className="text-amber-700">A to Z</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-dark/70 leading-relaxed">
            Browse over {stats.topics.toLocaleString()} topics from Nave&apos;s Topical Bible.
            Every sub-topic and verse reference, organized for thorough Scripture study.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 -mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="bg-white rounded-lg border border-grace shadow-sm p-5 text-center">
            <div className="text-3xl font-bold text-scripture">{stats.topics.toLocaleString()}</div>
            <div className="text-xs font-bold uppercase text-primary-dark/40 mt-1">Topics</div>
          </div>
          <div className="bg-white rounded-lg border border-grace shadow-sm p-5 text-center">
            <div className="text-3xl font-bold text-amber-700">{stats.totalRefs.toLocaleString()}</div>
            <div className="text-xs font-bold uppercase text-primary-dark/40 mt-1">Verse References</div>
          </div>
          <div className="bg-white rounded-lg border border-grace shadow-sm p-5 text-center">
            <div className="text-3xl font-bold text-amber-700">{stats.sections}</div>
            <div className="text-xs font-bold uppercase text-primary-dark/40 mt-1">Sections</div>
          </div>
          <div className="bg-white rounded-lg border border-grace shadow-sm p-5 text-center">
            <div className="text-3xl font-bold text-amber-700">{stats.withRefs.toLocaleString()}</div>
            <div className="text-xs font-bold uppercase text-primary-dark/40 mt-1">With Verses</div>
          </div>
        </div>
      </div>

      {/* Featured Topics */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-scripture mb-2">Most Referenced Topics</h2>
          <p className="text-primary-dark/60">
            The ten most-cited subjects in Nave&apos;s Topical Bible, by total verse references.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {featured.map((topic, idx) => (
            <Link
              key={topic.slug}
              href={`/bible-topics/${topic.slug}`}
              className="group bg-white rounded-lg border border-grace p-5 hover:border-amber-400 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-amber-100 text-amber-800 text-xs font-bold">
                  #{idx + 1}
                </span>
                <span className="text-xs font-bold text-primary-dark/40 uppercase">{topic.section}</span>
              </div>
              <div className="text-base font-bold text-scripture group-hover:text-amber-700 transition-colors mb-1 leading-tight">
                {topic.subject}
              </div>
              <div className="text-xs text-primary-dark/50">
                {topic.refCount.toLocaleString()} references &middot; {topic.entries.length} sub-topics
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* A-Z Letter Navigation */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-grace">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-3">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {sections.map(letter => (
              <a
                key={letter}
                href={`#section-${letter}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary-light/50 border border-grace text-sm font-bold text-primary-dark/70 hover:bg-amber-100 hover:text-amber-800 hover:border-amber-300 transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* A-Z Topic Listing */}
      <main className="max-w-7xl mx-auto px-4 md:px-10 py-12">
        <p className="text-sm text-primary-dark/50 mb-8">
          Tip: Use your browser&apos;s find feature (Ctrl+F / Cmd+F) to search for a specific topic on this page.
        </p>
        {sections.map(letter => {
          const topicsInSection = grouped[letter] || [];
          if (topicsInSection.length === 0) return null;
          return (
            <section key={letter} id={`section-${letter}`} className="mb-12 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-amber-700 text-white text-lg font-bold">
                  {letter}
                </span>
                <div className="flex-1 h-px bg-grace" />
                <span className="text-sm text-primary-dark/40 font-medium">
                  {topicsInSection.length} topics
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {topicsInSection.map(topic => (
                  <Link
                    key={topic.slug}
                    href={`/bible-topics/${topic.slug}`}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-amber-800 transition-colors group"
                  >
                    <span className="text-sm text-primary-dark/80 group-hover:text-amber-800 truncate">
                      {topic.subject}
                    </span>
                    {topic.refCount > 0 && (
                      <span className="text-xs text-primary-dark/30 flex-shrink-0 ml-2">
                        {topic.refCount}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-amber-700 to-amber-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
            Deepen Your Bible Knowledge
          </h2>
          <p className="text-amber-100 mb-8 max-w-xl mx-auto">
            Pair topical study with word studies, quizzes, and devotionals for a complete understanding of Scripture.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/word-studies"
              className="px-6 py-3 bg-white text-amber-800 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
            >
              Word Studies
            </Link>
            <Link
              href="/bible-quizzes"
              className="px-6 py-3 bg-white/15 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/25 transition-colors"
            >
              Bible Quizzes
            </Link>
            <Link
              href="/topics"
              className="px-6 py-3 bg-white/15 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/25 transition-colors"
            >
              Topic Verses
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="bg-primary-light/30 border-t border-grace py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <h2 className="text-2xl font-bold text-scripture mb-2">Continue Your Study</h2>
          <p className="text-primary-dark/60 mb-8">Explore more resources for deeper Bible understanding.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/topics"
              className="group bg-white rounded-lg border border-grace p-6 hover:border-amber-400 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="font-bold text-scripture group-hover:text-amber-700 transition-colors mb-1">
                Topic Verses with Text
              </h3>
              <p className="text-sm text-primary-dark/60">
                Read full verse text for every topic with commentary and cross-references.
              </p>
            </Link>
            <Link
              href="/word-studies"
              className="group bg-white rounded-lg border border-grace p-6 hover:border-amber-400 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-bold text-scripture group-hover:text-amber-700 transition-colors mb-1">
                Greek and Hebrew Word Studies
              </h3>
              <p className="text-sm text-primary-dark/60">
                Study the original-language words behind key Bible terms.
              </p>
            </Link>
            <Link
              href="/characters"
              className="group bg-white rounded-lg border border-grace p-6 hover:border-amber-400 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-scripture group-hover:text-amber-700 transition-colors mb-1">
                Bible Characters
              </h3>
              <p className="text-sm text-primary-dark/60">
                Explore the lives and stories of key biblical figures.
              </p>
            </Link>
            <Link
              href="/bible-quizzes"
              className="group bg-white rounded-lg border border-grace p-6 hover:border-amber-400 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-scripture group-hover:text-amber-700 transition-colors mb-1">
                Bible Quizzes
              </h3>
              <p className="text-sm text-primary-dark/60">
                Test your knowledge on every book, chapter, and theme of the Bible.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
