import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPlaceBySlug } from '@/lib/geocoding-data';
import { BOOK_NAMES } from '@/lib/bolls-api';
import { StructuredData } from '@/components/StructuredData';
import GeoAttribution from '@/components/GeoAttribution';

interface PageProps {
  params: Promise<{ slug: string; verseRef: string }>;
}

// ISR — too many combos for static build
export async function generateStaticParams() {
  return [];
}

function parseVerseRef(ref: string): { bookSlug: string; chapter: number; verse: number } | null {
  // Format: "genesis-14-18" or "1-samuel-3-10"
  const parts = ref.split('-');
  if (parts.length < 3) return null;
  const verse = parseInt(parts[parts.length - 1], 10);
  const chapter = parseInt(parts[parts.length - 2], 10);
  if (isNaN(verse) || isNaN(chapter)) return null;
  const bookSlug = parts.slice(0, -2).join('-');
  return { bookSlug, chapter, verse };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, verseRef } = await params;
  const place = getPlaceBySlug(slug);
  const parsed = parseVerseRef(verseRef);
  if (!place || !parsed) return {};

  const bookName = BOOK_NAMES[parsed.bookSlug] || parsed.bookSlug;
  const ref = `${bookName} ${parsed.chapter}:${parsed.verse}`;
  const title = `${place.name} in ${ref} | Bible Geography & Map | Bible Maximum`;
  const description = `Explore ${place.name} as mentioned in ${ref}. View on an interactive map with coordinates, nearby places, and links to chapter quizzes and interlinear Bible.`;

  return {
    title,
    description,
    keywords: [
      `${place.name} ${ref}`, `${place.name} Bible`, `${ref} geography`,
      'Bible places', 'Bible geography', 'biblical locations map',
    ],
    openGraph: {
      title: `${place.name} in ${ref}`,
      description,
      url: `/bible-places/${slug}/${verseRef}`,
      type: 'article',
    },
    alternates: { canonical: `/bible-places/${slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function VersePlacePage({ params }: PageProps) {
  const { slug, verseRef } = await params;
  const place = getPlaceBySlug(slug);
  const parsed = parseVerseRef(verseRef);
  if (!place || !parsed) notFound();

  // Verify this verse actually exists for this place
  const matchingVerse = place.verses.find(
    v => v.bookSlug === parsed.bookSlug && v.chapter === parsed.chapter && v.verse === parsed.verse
  );
  if (!matchingVerse) notFound();

  const bookName = BOOK_NAMES[parsed.bookSlug] || parsed.bookSlug;
  const ref = `${bookName} ${parsed.chapter}:${parsed.verse}`;

  // Find nearby verses in same book
  const sameBookVerses = place.verses
    .filter(v => v.bookSlug === parsed.bookSlug && v.ref !== verseRef)
    .slice(0, 6);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${place.name} in ${ref}`,
    url: `https://biblemaximum.com/bible-places/${slug}/${verseRef}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com' },
        { '@type': 'ListItem', position: 2, name: 'Bible Places', item: 'https://biblemaximum.com/bible-places' },
        { '@type': 'ListItem', position: 3, name: place.name, item: `https://biblemaximum.com/bible-places/${slug}` },
        { '@type': 'ListItem', position: 4, name: ref },
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
        <Link href="/bible-places" className="hover:text-blue-600">Bible Places</Link>
        <span className="mx-1.5">/</span>
        <Link href={`/bible-places/${slug}`} className="hover:text-blue-600">{place.name}</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">{ref}</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-sm text-blue-600 font-medium uppercase tracking-wider mb-1">
          Bible Geography
        </p>
        <h1 className="text-2xl md:text-3xl font-bold font-display mb-3 text-scripture">
          {place.name} in {ref}
        </h1>
        <p className="text-primary-dark/70 max-w-2xl mb-4">
          The biblical place <strong>{place.name}</strong> is referenced in{' '}
          <strong>{ref}</strong>.{' '}
          {place.name} is mentioned in a total of{' '}
          <strong>{place.verseCount}</strong> verse{place.verseCount !== 1 ? 's' : ''} across{' '}
          the Bible.
        </p>

        {place.lat !== null && (
          <div className="flex items-center gap-2 text-sm text-primary-dark/50 mb-6">
            <span>Coordinates: {place.lat.toFixed(4)}, {place.lon!.toFixed(4)}</span>
          </div>
        )}
      </section>

      {/* Quick Links */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <h2 className="text-lg font-bold text-scripture mb-3">Study This Passage</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${parsed.bookSlug}-${parsed.chapter}-quiz`}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {bookName} {parsed.chapter} Quiz
          </Link>
          <Link
            href={`/bible-geography/${parsed.bookSlug}/${parsed.chapter}`}
            className="px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-primary-light transition-colors"
          >
            {bookName} {parsed.chapter} Geography
          </Link>
          <Link
            href={`/interlinear/${parsed.bookSlug}/${parsed.chapter}/${parsed.verse}`}
            className="px-4 py-2 bg-white text-primary-dark/80 text-sm font-medium rounded-lg border border-grace hover:bg-primary-light/50 transition-colors"
          >
            Interlinear {ref}
          </Link>
        </div>
      </section>

      {/* More references in same book */}
      {sameBookVerses.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-8">
          <h2 className="text-lg font-bold text-scripture mb-3">
            More {place.name} References in {bookName}
          </h2>
          <div className="flex flex-wrap gap-2">
            {sameBookVerses.map(v => (
              <Link
                key={v.ref}
                href={`/bible-places/${slug}/${v.ref}`}
                className="px-3 py-1.5 text-sm bg-white border border-grace rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {v.readable}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Internal Links */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Related Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <Link href={`/bible-places/${slug}`} className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              All {place.name} Verses
            </Link>
            <Link href={`/bible-places/near/${slug}`} className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              Near {place.name}
            </Link>
            <Link href={`/${parsed.bookSlug}-chapters`} className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              {bookName} Chapters
            </Link>
            <Link href="/bible-places" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              All Bible Places
            </Link>
            <Link href="/bible-geography" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              Bible Geography
            </Link>
          </div>
        </div>
        <GeoAttribution compact />
      </section>
    </>
  );
}
