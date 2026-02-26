import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBooksWithPlaces, getPlacesForBook, getPlacesByBookChapterKeys } from '@/lib/geocoding-data';
import { BOOK_NAMES } from '@/lib/bolls-api';
import { StructuredData } from '@/components/StructuredData';
import GeoAttribution from '@/components/GeoAttribution';
import BookGeographyClient from './BookGeographyClient';

interface PageProps {
  params: Promise<{ book: string }>;
}

export async function generateStaticParams() {
  return getBooksWithPlaces().map(book => ({ book }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { book } = await params;
  const bookName = BOOK_NAMES[book];
  if (!bookName) return {};
  const places = getPlacesForBook(book);

  const title = `Places in ${bookName} | ${places.length} Biblical Locations with Maps | Bible Geography | Bible Maximum`;
  const description = `Explore ${places.length} places mentioned in the Book of ${bookName} with interactive maps and coordinates. Complete geographical guide to ${bookName} with chapter-by-chapter place references.`;

  return {
    title,
    description,
    keywords: [
      `${bookName} geography`, `${bookName} places`, `${bookName} map`, `places in ${bookName}`,
      'Bible geography', 'biblical locations', 'Bible atlas',
    ],
    openGraph: {
      title: `Places in ${bookName} — Bible Geography`,
      description,
      url: `/bible-geography/${book}`,
      type: 'article',
    },
    alternates: { canonical: `/bible-geography/${book}` },
  };
}

export default async function BookGeographyPage({ params }: PageProps) {
  const { book } = await params;
  const bookName = BOOK_NAMES[book];
  if (!bookName) notFound();

  const places = getPlacesForBook(book);
  if (places.length === 0) notFound();

  // Sort by mention count descending
  const sortedPlaces = [...places].sort((a, b) => {
    const aCount = a.verses.filter(v => v.bookSlug === book).length;
    const bCount = b.verses.filter(v => v.bookSlug === book).length;
    return bCount - aCount;
  });

  // Get chapters that have places in this book
  const allChapterKeys = getPlacesByBookChapterKeys();
  const bookChapters = allChapterKeys
    .filter(k => k.startsWith(`${book}-`))
    .map(k => parseInt(k.split('-').pop()!, 10))
    .sort((a, b) => a - b);

  // Map markers
  const markers = sortedPlaces
    .filter(p => p.lat !== null && p.lon !== null)
    .map(p => ({ lat: p.lat!, lon: p.lon!, name: p.name, slug: p.slug }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Places in ${bookName}`,
    description: `${places.length} biblical places mentioned in ${bookName}`,
    url: `https://biblemaximum.com/bible-geography/${book}`,
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/bible-geography" className="hover:text-blue-600">Bible Geography</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">{bookName}</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-scripture">
          Places in {bookName}
        </h1>
        <p className="text-primary-dark/70 max-w-2xl mb-4">
          Explore <strong>{places.length}</strong> biblical places mentioned in the Book of {bookName},
          mapped with coordinates and organized by frequency of mention.
        </p>
        <div className="flex flex-wrap gap-4 text-center mb-6">
          <div className="px-4 py-2 bg-white border border-grace rounded-lg">
            <p className="text-xs text-primary-dark/50 uppercase">Places</p>
            <p className="text-lg font-bold text-scripture">{places.length}</p>
          </div>
          <div className="px-4 py-2 bg-white border border-grace rounded-lg">
            <p className="text-xs text-primary-dark/50 uppercase">Chapters</p>
            <p className="text-lg font-bold text-scripture">{bookChapters.length}</p>
          </div>
          <div className="px-4 py-2 bg-white border border-grace rounded-lg">
            <p className="text-xs text-primary-dark/50 uppercase">Mapped</p>
            <p className="text-lg font-bold text-blue-400">{markers.length}</p>
          </div>
        </div>
      </section>

      {/* Map */}
      {markers.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-8">
          <h2 className="text-xl font-bold text-scripture mb-3">Map of Places in {bookName}</h2>
          <BookGeographyClient markers={markers} />
        </section>
      )}

      {/* Chapter Navigation */}
      {bookChapters.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-8">
          <h2 className="text-lg font-bold text-scripture mb-3">Geography by Chapter</h2>
          <div className="flex flex-wrap gap-2">
            {bookChapters.map(ch => (
              <Link
                key={ch}
                href={`/bible-geography/${book}/${ch}`}
                className="w-12 h-10 flex items-center justify-center bg-white border border-grace rounded-lg text-sm font-medium text-primary-dark/80 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
              >
                {ch}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Place Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <h2 className="text-xl font-bold text-scripture mb-4">All Places in {bookName}</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {sortedPlaces.map(p => {
            const bookVerses = p.verses.filter(v => v.bookSlug === book);
            return (
              <Link
                key={p.slug}
                href={`/bible-places/${p.slug}`}
                className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                    {p.name}
                  </span>
                  <span className="text-xs text-primary-dark/40">{bookVerses.length}x</span>
                </div>
                <span className="text-xs text-primary-dark/50 capitalize">{p.type}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Internal Links */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Related Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <Link href={`/${book}-chapters`} className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              {bookName} Chapter Quizzes
            </Link>
            <Link href={`/bible-geography-quiz/${book}`} className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              {bookName} Geography Quiz
            </Link>
            <Link href="/bible-geography" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              All Books Geography
            </Link>
            <Link href="/bible-places" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              Bible Places A-Z
            </Link>
            <Link href="/bible-geography-quiz" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              All Geography Quizzes
            </Link>
            <Link href="/bible-places/era" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              Places by Era
            </Link>
          </div>
        </div>
        <GeoAttribution compact />
      </section>
    </>
  );
}
