import { Metadata } from 'next';
import Link from 'next/link';
import { BIBLE_BOOKS } from '@/lib/bible-data';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Interlinear Bible | Word-by-Word Hebrew & Greek Analysis | 31,102 Verses | Bible Maximum',
  description: 'Study every verse of the Bible with word-by-word Hebrew and Greek interlinear analysis. Explore Strong\'s numbers, transliterations, and definitions for all 31,102 verses across 66 books.',
  keywords: [
    'interlinear Bible', 'Hebrew interlinear', 'Greek interlinear',
    'word by word Bible', 'Strong\'s numbers', 'Bible word study',
    'Hebrew Bible', 'Greek New Testament', 'KJV interlinear',
  ],
  openGraph: {
    title: 'Interlinear Bible — Word-by-Word Hebrew & Greek Analysis',
    description: 'Study every verse with word-by-word Hebrew and Greek interlinear analysis across all 66 books.',
    url: '/interlinear',
    type: 'website',
  },
  alternates: { canonical: '/interlinear' },
};

export default function InterlinearHubPage() {
  const otBooks = BIBLE_BOOKS.filter(b => b.testament === 'old');
  const ntBooks = BIBLE_BOOKS.filter(b => b.testament === 'new');
  const totalChapters = BIBLE_BOOKS.reduce((sum, b) => sum + b.chapters, 0);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Interlinear Bible',
    description: 'Word-by-word Hebrew and Greek interlinear analysis for all 31,102 verses of the Bible.',
    url: 'https://biblemaximum.com/interlinear',
    numberOfItems: 31102,
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
      { '@type': 'ListItem', position: 2, name: 'Interlinear Bible' },
    ],
  };

  return (
    <>
      <StructuredData data={collectionSchema} />
      <StructuredData data={breadcrumbSchema} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero */}
        <div className="bg-white border-b border-grace py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <nav className="flex items-center gap-2 text-sm text-primary-dark/60 mb-6">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-scripture font-medium">Interlinear Bible</span>
            </nav>

            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase mb-4">
              Hebrew &amp; Greek
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-scripture font-display mb-4">
              Interlinear Bible
            </h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mb-8">
              Study every verse of the Bible with word-by-word Hebrew and Greek analysis.
              Explore original language words, Strong&apos;s numbers, transliterations,
              and definitions across all 66 books.
            </p>

            <div className="flex flex-wrap gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">31,102</div>
                <div className="text-sm text-primary-dark/60">Verses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">66</div>
                <div className="text-sm text-primary-dark/60">Books</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{totalChapters.toLocaleString()}</div>
                <div className="text-sm text-primary-dark/60">Chapters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2</div>
                <div className="text-sm text-primary-dark/60">Languages</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="max-w-6xl mx-auto px-4 md:px-10 mt-[-1.5rem] relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/lexicon/browse/greek"
              className="bg-blue-600 rounded-lg p-6 text-white shadow-lg flex items-center justify-between hover:bg-blue-700 transition-colors"
            >
              <div>
                <h3 className="font-bold text-lg">Greek Lexicon</h3>
                <p className="text-white/80 text-xs">Browse New Testament Greek words</p>
              </div>
              <span className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase">
                Browse
              </span>
            </Link>
            <Link
              href="/lexicon/browse/hebrew"
              className="bg-scripture rounded-lg p-6 text-white shadow-lg flex items-center justify-between hover:bg-scripture/90 transition-colors"
            >
              <div>
                <h3 className="font-bold text-lg">Hebrew Lexicon</h3>
                <p className="text-white/80 text-xs">Browse Old Testament Hebrew words</p>
              </div>
              <span className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase">
                Browse
              </span>
            </Link>
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-4 md:px-10 py-12">
          {/* Old Testament */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold font-display text-scripture mb-6">
              Old Testament
              <span className="text-sm font-normal text-primary-dark/60 ml-2">({otBooks.length} books &middot; Hebrew)</span>
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {otBooks.map(book => (
                <Link
                  key={book.slug}
                  href={`/interlinear/${book.slug}`}
                  className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <span className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                    {book.name}
                  </span>
                  <span className="block text-xs text-primary-dark/60 mt-0.5">
                    {book.chapters} chapter{book.chapters !== 1 ? 's' : ''}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* New Testament */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold font-display text-scripture mb-6">
              New Testament
              <span className="text-sm font-normal text-primary-dark/60 ml-2">({ntBooks.length} books &middot; Greek)</span>
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {ntBooks.map(book => (
                <Link
                  key={book.slug}
                  href={`/interlinear/${book.slug}`}
                  className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <span className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                    {book.name}
                  </span>
                  <span className="block text-xs text-primary-dark/60 mt-0.5">
                    {book.chapters} chapter{book.chapters !== 1 ? 's' : ''}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Internal Links */}
          <section className="bg-grace/10 border border-grace rounded-xl p-6">
            <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/lexicon" className="text-blue-600 hover:underline text-sm">
                Greek &amp; Hebrew Lexicon
              </Link>
              <Link href="/word-studies" className="text-blue-600 hover:underline text-sm">
                Word Studies
              </Link>
              <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">
                Bible Quizzes
              </Link>
              <Link href="/cross-references" className="text-blue-600 hover:underline text-sm">
                Cross References
              </Link>
              <Link href="/topics" className="text-blue-600 hover:underline text-sm">
                Bible Topics
              </Link>
              <Link href="/resources" className="text-blue-600 hover:underline text-sm">
                Bible Resources
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
