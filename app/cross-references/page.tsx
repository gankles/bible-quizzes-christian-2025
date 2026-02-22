import { Metadata } from 'next';
import Link from 'next/link';
import { BIBLE_BOOKS } from '@/lib/bible-data';

export const metadata: Metadata = {
  title: 'Bible Cross-References | Treasury of Scripture Knowledge | Bible Maximum',
  description:
    'Explore cross-references for every verse in the Bible from the Treasury of Scripture Knowledge. Compare related scriptures across the Old and New Testaments.',
  keywords: [
    'Bible cross-references',
    'Treasury of Scripture Knowledge',
    'scripture cross-references',
    'Bible verse connections',
    'related Bible verses',
  ],
  openGraph: {
    title: 'Bible Cross-References | Treasury of Scripture Knowledge | Bible Maximum',
    description:
      'Explore cross-references for every verse in the Bible from the Treasury of Scripture Knowledge.',
    type: 'website',
    url: '/cross-references',
  },
  alternates: {
    canonical: '/cross-references',
  },
};

export default function CrossReferencesIndexPage() {
  const otBooks = BIBLE_BOOKS.filter((b) => b.testament === 'old');
  const ntBooks = BIBLE_BOOKS.filter((b) => b.testament === 'new');

  return (
    <div className="min-h-screen bg-primary-light/30">
      <nav className="bg-white border-b border-grace">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <ol className="flex items-center text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            </li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li className="text-primary-dark/70">Cross-References</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold font-display text-scripture mb-3">
            Bible Cross-References
          </h1>
          <p className="text-primary-dark/70 max-w-2xl">
            Explore verse-by-verse cross-references from the Treasury of Scripture Knowledge.
            Select a book to browse cross-references for every chapter and verse.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-scripture mb-4">Old Testament</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {otBooks.map((book) => (
              <Link
                key={book.slug}
                href={`/cross-references/${book.slug}/1/1`}
                className="p-3 bg-white border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors text-center"
              >
                <span className="text-blue-600 font-medium text-sm">{book.name}</span>
                <span className="block text-xs text-primary-dark/40 mt-1">{book.chapters} ch.</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-scripture mb-4">New Testament</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {ntBooks.map((book) => (
              <Link
                key={book.slug}
                href={`/cross-references/${book.slug}/1/1`}
                className="p-3 bg-white border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors text-center"
              >
                <span className="text-blue-600 font-medium text-sm">{book.name}</span>
                <span className="block text-xs text-primary-dark/40 mt-1">{book.chapters} ch.</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-grace p-6">
          <h2 className="text-lg font-bold text-scripture mb-2">About Treasury of Scripture Knowledge</h2>
          <p className="text-primary-dark/70 text-sm leading-relaxed">
            The Treasury of Scripture Knowledge (TSK) is one of the most comprehensive
            cross-reference resources available for Bible study. Originally compiled by
            R.A. Torrey and published in 1836, it contains over 500,000 cross-references
            linking related verses throughout Scripture. Each cross-reference helps illuminate
            the meaning of a passage by connecting it to parallel themes, prophecies, and
            teachings found elsewhere in the Bible.
          </p>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'Bible Cross-References',
              description:
                'Browse cross-references for every verse in the Bible from the Treasury of Scripture Knowledge.',
              publisher: {
                '@type': 'Organization',
                name: 'Bible Maximum',
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://biblemaximum.com/cross-references',
              },
            }),
          }}
        />
      </main>
    </div>
  );
}
