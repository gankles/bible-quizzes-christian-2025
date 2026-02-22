import { Metadata } from 'next';
import Link from 'next/link';
import { getAllNaveTopics, getNavesStats, getNaveSections, getNaveTopicsBySection } from '@/lib/naves-data';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: "Nave's Topical Bible | 5,300+ Bible Topics with Verse References | Complete Topical Dictionary",
  description: "Browse Nave's Topical Bible — over 5,300 topics with 41,000+ scripture references. The most comprehensive topical index of the Bible, organized A-Z with verse cross-references.",
  keywords: [
    "Nave's Topical Bible", 'Bible topics', 'topical Bible index', 'Bible topic dictionary',
    'Bible verses by topic', 'biblical topics list', 'Nave topical dictionary',
    'Bible topic study', 'scripture by topic', 'topical Bible reference',
  ],
  openGraph: {
    title: "Nave's Topical Bible — 5,300+ Topics with Scripture References",
    description: 'The most comprehensive topical index of the Bible with 41,000+ verse references.',
    url: '/nave-topics',
    type: 'website',
  },
  alternates: { canonical: '/nave-topics' },
};

export default function NaveTopicsPage() {
  const stats = getNavesStats();
  const sections = getNaveSections();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "Nave's Topical Bible",
    description: metadata.description,
    url: 'https://biblemaximum.com/nave-topics',
    numberOfItems: stats.topics,
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">Nave&apos;s Topical Bible</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white border-b border-grace">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-scripture">
              Nave&apos;s Topical Bible
            </h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mb-6">
              The most comprehensive topical index of the Bible. Browse over{' '}
              {stats.topics.toLocaleString()} topics with {stats.totalRefs.toLocaleString()}+ scripture
              references, organized alphabetically from A to Z.
            </p>
            <div className="flex flex-wrap gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.topics.toLocaleString()}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Topics</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.totalRefs.toLocaleString()}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">References</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.topicBookCombos.toLocaleString()}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Topic-Book Studies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alphabet Jump */}
      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {sections.map(sec => (
            <a
              key={sec}
              href={`#section-${sec}`}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-grace text-sm font-bold text-primary-dark/80 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
            >
              {sec}
            </a>
          ))}
        </div>
      </section>

      {/* Topics by Section */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        {sections.map(sec => {
          const topics = getNaveTopicsBySection(sec);
          return (
            <div key={sec} id={`section-${sec}`} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
                  {sec}
                </span>
                <h2 className="text-xl font-bold text-scripture">{sec}</h2>
                <span className="text-sm text-primary-dark/60">({topics.length} topics)</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {topics.map(t => (
                  <Link
                    key={t.slug}
                    href={`/nave-topics/${t.slug}`}
                    className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
                  >
                    <span className="font-semibold text-scripture group-hover:text-blue-600 transition-colors capitalize">
                      {t.subject.toLowerCase()}
                    </span>
                    <span className="block text-xs text-primary-dark/60 mt-0.5">
                      {t.refCount} references &middot; {t.books.length} books
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Related */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-scripture mb-2">Explore More</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/topics" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Bible Topics
            </Link>
            <Link href="/commandments" className="px-5 py-2.5 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-primary-light transition-colors">
              613 Commandments
            </Link>
            <Link href="/bible-quizzes" className="px-5 py-2.5 bg-white text-primary-dark/80 text-sm font-medium rounded-lg border border-grace hover:bg-primary-light/50 transition-colors">
              Bible Quizzes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
