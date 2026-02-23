import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPlaceTypes, getPlacesByType, formatPlaceType, formatPlaceTypeSingular } from '@/lib/geocoding-data';
import { StructuredData } from '@/components/StructuredData';
import GeoAttribution from '@/components/GeoAttribution';
import TypeMapClient from './TypeMapClient';

interface PageProps {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return getAllPlaceTypes()
    .filter(t => t !== 'special')
    .map(type => ({ type: type.replace(/\s+/g, '-') }));
}

function typeFromSlug(slug: string): string {
  return slug.replace(/-/g, ' ');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type: typeSlug } = await params;
  const type = typeFromSlug(typeSlug);
  const label = formatPlaceType(type);
  const places = getPlacesByType(type);

  const title = `Biblical ${label} | ${places.length} Bible ${label} with Maps & Verse References | Bible Maximum`;
  const description = `Explore ${places.length} ${label.toLowerCase()} mentioned in the Bible with interactive maps, coordinates, and verse references. Complete guide to biblical ${label.toLowerCase()}.`;

  return {
    title,
    description,
    keywords: [
      `biblical ${label.toLowerCase()}`, `${label.toLowerCase()} in the Bible`,
      `Bible ${label.toLowerCase()}`, 'Bible places', 'Bible geography',
    ],
    openGraph: {
      title: `Biblical ${label}`,
      description,
      url: `/bible-places/type/${typeSlug}`,
      type: 'website',
    },
    alternates: { canonical: `/bible-places/type/${typeSlug}` },
  };
}

export default async function TypePage({ params }: PageProps) {
  const { type: typeSlug } = await params;
  const type = typeFromSlug(typeSlug);
  const label = formatPlaceType(type);
  const singularLabel = formatPlaceTypeSingular(type);
  const places = getPlacesByType(type);
  if (places.length === 0) notFound();

  const sorted = [...places].sort((a, b) => b.verseCount - a.verseCount);
  const markers = sorted
    .filter(p => p.lat !== null && p.lon !== null)
    .map(p => ({ lat: p.lat!, lon: p.lon!, name: p.name, slug: p.slug }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Biblical ${label}`,
    description: `${places.length} ${label.toLowerCase()} mentioned in the Bible`,
    url: `https://biblemaximum.com/bible-places/type/${typeSlug}`,
    numberOfItems: places.length,
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
        <span className="text-scripture font-medium">{label}</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-scripture">
          Biblical {label}
        </h1>
        <p className="text-primary-dark/70 max-w-2xl mb-4">
          Explore <strong>{places.length}</strong> {label.toLowerCase()} mentioned in the Bible,
          sorted by frequency of reference, with interactive maps and verse references.
        </p>
      </section>

      {/* Map */}
      {markers.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-8">
          <h2 className="text-xl font-bold text-scripture mb-3">Map of Biblical {label}</h2>
          <TypeMapClient markers={markers} />
        </section>
      )}

      {/* Place Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <h2 className="text-xl font-bold text-scripture mb-4">All Biblical {label}</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map(p => (
            <Link
              key={p.slug}
              href={`/bible-places/${p.slug}`}
              className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                  {p.name}
                </span>
                <span className="text-xs text-primary-dark/40">{p.verseCount} verse{p.verseCount !== 1 ? 's' : ''}</span>
              </div>
              {p.modernName && p.modernName !== p.name && (
                <span className="text-xs text-primary-dark/50">Modern: {p.modernName}</span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Browse Other Types</h2>
          <div className="flex flex-wrap gap-2">
            {getAllPlaceTypes().filter(t => t !== 'special' && t !== type).slice(0, 12).map(t => (
              <Link
                key={t}
                href={`/bible-places/type/${t.replace(/\s+/g, '-')}`}
                className="px-3 py-1.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors"
              >
                {formatPlaceType(t)}
              </Link>
            ))}
          </div>
        </div>
        <GeoAttribution compact />
      </section>
    </>
  );
}
