import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPlacesForChapter, getPlacesByBookChapterKeys } from '@/lib/geocoding-data';
import { BOOK_NAMES } from '@/lib/bolls-api';
import { StructuredData } from '@/components/StructuredData';
import GeoAttribution from '@/components/GeoAttribution';
import ChapterGeographyClient from './ChapterGeographyClient';

interface PageProps {
  params: Promise<{ book: string; chapter: string }>;
}

export async function generateStaticParams() {
  return getPlacesByBookChapterKeys().map(key => {
    const parts = key.split('-');
    const chapter = parts.pop()!;
    const book = parts.join('-');
    return { book, chapter };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { book, chapter } = await params;
  const bookName = BOOK_NAMES[book];
  if (!bookName) return {};
  const ch = parseInt(chapter, 10);
  const places = getPlacesForChapter(book, ch);

  const title = `Places in ${bookName} ${ch} | ${places.length} Locations with Map | Bible Geography | Bible Maximum`;
  const description = `Discover ${places.length} biblical places mentioned in ${bookName} chapter ${ch}. View on an interactive map with coordinates, verse references, and nearby places.`;

  return {
    title,
    description,
    keywords: [
      `${bookName} ${ch} geography`, `${bookName} ${ch} places`, `${bookName} chapter ${ch} map`,
      'Bible geography', 'biblical locations', 'Bible chapter map',
    ],
    openGraph: {
      title: `Places in ${bookName} ${ch}`,
      description,
      url: `/bible-geography/${book}/${ch}`,
      type: 'article',
    },
    alternates: { canonical: `/bible-geography/${book}/${ch}` },
  };
}

export default async function ChapterGeographyPage({ params }: PageProps) {
  const { book, chapter } = await params;
  const bookName = BOOK_NAMES[book];
  const ch = parseInt(chapter, 10);
  if (!bookName || isNaN(ch)) notFound();

  const places = getPlacesForChapter(book, ch);
  if (places.length === 0) notFound();

  // Find prev/next chapters with places
  const allKeys = getPlacesByBookChapterKeys();
  const bookChapters = allKeys
    .filter(k => k.startsWith(`${book}-`))
    .map(k => parseInt(k.split('-').pop()!, 10))
    .sort((a, b) => a - b);
  const currentIdx = bookChapters.indexOf(ch);
  const prevCh = currentIdx > 0 ? bookChapters[currentIdx - 1] : null;
  const nextCh = currentIdx < bookChapters.length - 1 ? bookChapters[currentIdx + 1] : null;

  const markers = places
    .filter(p => p.lat !== null && p.lon !== null)
    .map(p => ({ lat: p.lat!, lon: p.lon!, name: p.name, slug: p.slug }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Places in ${bookName} ${ch}`,
    url: `https://biblemaximum.com/bible-geography/${book}/${ch}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com' },
        { '@type': 'ListItem', position: 2, name: 'Bible Geography', item: 'https://biblemaximum.com/bible-geography' },
        { '@type': 'ListItem', position: 3, name: bookName, item: `https://biblemaximum.com/bible-geography/${book}` },
        { '@type': 'ListItem', position: 4, name: `Chapter ${ch}` },
      ],
    },
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
        <Link href={`/bible-geography/${book}`} className="hover:text-blue-600">{bookName}</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">Chapter {ch}</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold font-display mb-3 text-scripture">
          Places in {bookName} {ch}
        </h1>
        <p className="text-primary-dark/70 max-w-2xl mb-4">
          <strong>{places.length}</strong> biblical place{places.length !== 1 ? 's' : ''} mentioned
          in {bookName} chapter {ch}, with interactive map and verse references.
        </p>

        {/* Prev/Next Navigation */}
        <div className="flex gap-3 mb-6">
          {prevCh !== null ? (
            <Link href={`/bible-geography/${book}/${prevCh}`} className="px-4 py-2 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              &larr; Chapter {prevCh}
            </Link>
          ) : <span />}
          {nextCh !== null && (
            <Link href={`/bible-geography/${book}/${nextCh}`} className="px-4 py-2 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              Chapter {nextCh} &rarr;
            </Link>
          )}
        </div>
      </section>

      {/* Map */}
      {markers.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-8">
          <h2 className="text-lg font-bold text-scripture mb-3">Map</h2>
          <ChapterGeographyClient markers={markers} />
        </section>
      )}

      {/* Place List */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <h2 className="text-xl font-bold text-scripture mb-4">Places</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {places.map(p => {
            const chapterVerses = p.verses.filter(v => v.bookSlug === book && v.chapter === ch);
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
                  {p.lat !== null && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-green-50 text-green-600">Mapped</span>
                  )}
                </div>
                <div className="text-xs text-primary-dark/50 mt-1">
                  <span className="capitalize">{p.type}</span>
                  {chapterVerses.length > 0 && (
                    <span className="ml-2">
                      v. {chapterVerses.map(v => v.verse).join(', ')}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Continue Your Study */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-scripture mb-4">Continue Your Study</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href={`/${book}-${ch}-quiz`} className="block p-4 bg-blue-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all text-center">
            <span className="font-semibold text-blue-800 block">Take the Quiz</span>
            <span className="text-xs text-blue-600">Test your knowledge of this chapter</span>
          </Link>
          <Link href={`/bible-chapter-summaries/${book}/${ch}`} className="block p-4 bg-green-50 rounded-lg border border-green-200 hover:border-green-400 hover:shadow-md transition-all text-center">
            <span className="font-semibold text-green-800 block">Chapter Summary</span>
            <span className="text-xs text-green-600">Read the key events and themes</span>
          </Link>
          <Link href={`/${book}-chapters`} className="block p-4 bg-purple-50 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all text-center">
            <span className="font-semibold text-purple-800 block">All Chapters</span>
            <span className="text-xs text-purple-600">Browse all chapter quizzes</span>
          </Link>
        </div>
      </div>

      {/* Internal Links */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Related Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <Link href={`/${book}-${ch}-quiz`} className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              {bookName} {ch} Quiz
            </Link>
            <Link href={`/bible-geography/${book}`} className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              All {bookName} Places
            </Link>
            <Link href={`/${book}-chapters`} className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              {bookName} Chapters
            </Link>
          </div>
        </div>
        <GeoAttribution compact />
      </section>
    </>
  );
}
