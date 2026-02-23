import { Metadata } from 'next';
import Link from 'next/link';
import { getBooksWithPlaces, getPlacesForBook, getGeocodingStats } from '@/lib/geocoding-data';
import { BOOK_NAMES } from '@/lib/bolls-api';
import { StructuredData } from '@/components/StructuredData';
import GeoAttribution from '@/components/GeoAttribution';

const BOOK_ORDER = [
  'genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy',
  'joshua', 'judges', 'ruth', '1-samuel', '2-samuel',
  '1-kings', '2-kings', '1-chronicles', '2-chronicles',
  'ezra', 'nehemiah', 'esther', 'job', 'psalms', 'proverbs',
  'ecclesiastes', 'song-of-solomon', 'isaiah', 'jeremiah', 'lamentations',
  'ezekiel', 'daniel', 'hosea', 'joel', 'amos', 'obadiah', 'jonah',
  'micah', 'nahum', 'habakkuk', 'zephaniah', 'haggai', 'zechariah', 'malachi',
  'matthew', 'mark', 'luke', 'john', 'acts',
  'romans', '1-corinthians', '2-corinthians', 'galatians', 'ephesians',
  'philippians', 'colossians', '1-thessalonians', '2-thessalonians',
  '1-timothy', '2-timothy', 'titus', 'philemon', 'hebrews',
  'james', '1-peter', '2-peter', '1-john', '2-john', '3-john', 'jude', 'revelation',
];

export const metadata: Metadata = {
  title: 'Bible Geography by Book | Maps & Places for Every Book of the Bible | Bible Maximum',
  description: 'Explore Bible geography organized by all 66 books of the Bible. View interactive maps showing biblical places mentioned in each book — from Genesis through Revelation.',
  keywords: [
    'Bible geography', 'Bible maps', 'biblical geography by book',
    'Bible places by book', 'Old Testament geography', 'New Testament geography',
    'Bible atlas', 'biblical maps', 'Holy Land maps',
  ],
  openGraph: {
    title: 'Bible Geography by Book — Maps for Every Book',
    description: 'Interactive maps and place directories for all 66 books of the Bible.',
    url: '/bible-geography',
    type: 'website',
  },
  alternates: { canonical: '/bible-geography' },
};

export default function BibleGeographyPage() {
  const stats = getGeocodingStats();
  const booksWithPlaces = getBooksWithPlaces();

  // Sort books in canonical order and get place counts
  const bookData = BOOK_ORDER
    .filter(b => booksWithPlaces.includes(b))
    .map(slug => ({
      slug,
      name: BOOK_NAMES[slug] || slug,
      placeCount: getPlacesForBook(slug).length,
    }));

  const otBooks = bookData.filter(b => BOOK_ORDER.indexOf(b.slug) < 39);
  const ntBooks = bookData.filter(b => BOOK_ORDER.indexOf(b.slug) >= 39);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Geography by Book',
    description: metadata.description,
    url: 'https://biblemaximum.com/bible-geography',
    numberOfItems: bookData.length,
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">Bible Geography</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white border-b border-grace">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-scripture">
              Bible Geography by Book
            </h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mb-6">
              Explore the places of the Bible organized by book and chapter. Every book from
              Genesis through Revelation with interactive maps and place directories.
            </p>

            <div className="flex flex-wrap gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.totalPlaces.toLocaleString()}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Places</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-400">{stats.totalBooks}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Books</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.totalVerseRefs.toLocaleString()}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Verse Refs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Old Testament */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <h2 className="text-xl font-bold text-scripture mb-4">Old Testament</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {otBooks.map(book => (
            <Link
              key={book.slug}
              href={`/bible-geography/${book.slug}`}
              className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <span className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                {book.name}
              </span>
              <span className="text-xs text-primary-dark/40 ml-2">{book.placeCount} places</span>
            </Link>
          ))}
        </div>
      </section>

      {/* New Testament */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <h2 className="text-xl font-bold text-scripture mb-4">New Testament</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {ntBooks.map(book => (
            <Link
              key={book.slug}
              href={`/bible-geography/${book.slug}`}
              className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <span className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                {book.name}
              </span>
              <span className="text-xs text-primary-dark/40 ml-2">{book.placeCount} places</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Related Resources */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-scripture mb-2">Explore More</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/bible-places" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Bible Places A-Z
            </Link>
            <Link href="/bible-quizzes" className="px-5 py-2.5 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-primary-light transition-colors">
              Bible Quizzes
            </Link>
          </div>
        </div>
        <GeoAttribution compact />
      </section>
    </>
  );
}
