import { Metadata } from 'next';
import Link from 'next/link';
import { getBooksWithPlaces, getPlacesForBook } from '@/lib/geocoding-data';
import { BOOK_NAMES } from '@/lib/bolls-api';
import { BIBLE_BOOKS } from '@/lib/bible-data';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Bible Geography Quizzes | Test Your Knowledge of Biblical Places | Bible Maximum',
  description: 'Take geography quizzes for every book of the Bible. Test your knowledge of biblical places, cities, mountains, rivers, and regions mentioned in Scripture.',
  keywords: [
    'Bible geography quiz', 'biblical places quiz', 'Bible map quiz',
    'Bible places test', 'biblical geography test', 'Bible location quiz',
  ],
  openGraph: {
    title: 'Bible Geography Quizzes',
    description: 'Test your knowledge of biblical places with quizzes for every book.',
    url: '/bible-geography-quiz',
    type: 'website',
  },
  alternates: { canonical: '/bible-geography-quiz' },
};

export default function GeographyQuizHubPage() {
  const booksWithPlaces = getBooksWithPlaces();

  // Split into OT and NT
  const otBooks = BIBLE_BOOKS.filter(b => b.testament === 'old').map(b => b.slug);
  const ntBooks = BIBLE_BOOKS.filter(b => b.testament === 'new').map(b => b.slug);

  const otQuizBooks = booksWithPlaces.filter(b => otBooks.includes(b));
  const ntQuizBooks = booksWithPlaces.filter(b => ntBooks.includes(b));

  const totalPlaces = booksWithPlaces.reduce((sum, book) => sum + getPlacesForBook(book).length, 0);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Geography Quizzes',
    description: 'Geography quizzes for every book of the Bible with places.',
    url: 'https://biblemaximum.com/bible-geography-quiz',
    numberOfItems: booksWithPlaces.length,
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bible Geography', item: 'https://biblemaximum.com/bible-geography' },
      { '@type': 'ListItem', position: 3, name: 'Geography Quizzes' },
    ],
  };

  function BookGrid({ books, title }: { books: string[]; title: string }) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-display text-scripture mb-6">{title}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map(book => {
            const bookName = BOOK_NAMES[book] || book;
            const placeCount = getPlacesForBook(book).length;
            return (
              <Link
                key={book}
                href={`/bible-geography-quiz/${book}`}
                className="bg-white border border-grace rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <h3 className="text-lg font-semibold text-scripture group-hover:text-blue-600 transition-colors mb-1">
                  {bookName}
                </h3>
                <p className="text-sm text-primary-dark/60">
                  {placeCount} place{placeCount !== 1 ? 's' : ''} to test
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <>
      <StructuredData data={collectionSchema} />
      <StructuredData data={breadcrumbSchema} />

      <Breadcrumb items={[
        { label: 'Bible Geography', href: '/bible-geography' },
        { label: 'Geography Quizzes' },
      ]} />

      <div className="min-h-screen bg-primary-light/30">
        <section className="py-16 bg-gradient-to-b from-blue-50 to-primary-light/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-scripture mb-4">
              Bible Geography <span className="text-blue-600">Quizzes</span>
            </h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mx-auto mb-8">
              Test your knowledge of biblical places with geography quizzes for
              {' '}{booksWithPlaces.length} books of the Bible.
            </p>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{booksWithPlaces.length}</div>
                <div className="text-sm text-primary-dark/60">Book Quizzes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{totalPlaces}</div>
                <div className="text-sm text-primary-dark/60">Places Covered</div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-2rem] relative z-20 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/bible-geography" className="bg-blue-600 rounded-lg p-6 text-white shadow-lg flex items-center justify-between hover:bg-blue-700 transition-colors">
              <div>
                <h3 className="font-bold text-lg">Explore Bible Geography</h3>
                <p className="text-white/80 text-xs">Interactive maps and place details</p>
              </div>
              <span className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm uppercase shrink-0 ml-3">Maps</span>
            </Link>
            <Link href="/bible-places/era" className="bg-scripture rounded-lg p-6 text-white shadow-lg flex items-center justify-between hover:bg-scripture/90 transition-colors">
              <div>
                <h3 className="font-bold text-lg">Places by Historical Era</h3>
                <p className="text-white/80 text-xs">Geography through biblical timeline</p>
              </div>
              <span className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-bold text-sm uppercase shrink-0 ml-3">Explore</span>
            </Link>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <BookGrid books={otQuizBooks} title="Old Testament Geography Quizzes" />
          <BookGrid books={ntQuizBooks} title="New Testament Geography Quizzes" />

          <section className="bg-grace/10 border border-grace rounded-xl p-6 mt-8">
            <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/bible-geography" className="text-blue-600 hover:underline text-sm">Bible Geography</Link>
              <Link href="/bible-places" className="text-blue-600 hover:underline text-sm">All Bible Places</Link>
              <Link href="/bible-places/era" className="text-blue-600 hover:underline text-sm">Places by Era</Link>
              <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">Bible Quizzes</Link>
              <Link href="/character-quiz" className="text-blue-600 hover:underline text-sm">Character Quizzes</Link>
              <Link href="/bible-maps" className="text-blue-600 hover:underline text-sm">Bible Maps</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
