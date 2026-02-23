import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPlaceSlugs, getPlaceBySlug, getNearbyPlaces } from '@/lib/geocoding-data';
import { StructuredData } from '@/components/StructuredData';
import GeoAttribution from '@/components/GeoAttribution';
import NearbyMapClient from './NearbyMapClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Only generate for places that have coordinates (hence nearby data)
  return getAllPlaceSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) return {};
  const nearby = getNearbyPlaces(slug);

  const title = `Places Near ${place.name} | ${nearby.length} Nearby Biblical Locations | Bible Geography | Bible Maximum`;
  const description = `Discover ${nearby.length} biblical places near ${place.name} with distances, interactive map, and verse references. Explore the geography around this biblical location.`;

  return {
    title,
    description,
    keywords: [
      `places near ${place.name}`, `${place.name} nearby`, `biblical places near ${place.name}`,
      'Bible geography', 'nearby Bible places', 'biblical locations map',
    ],
    openGraph: {
      title: `Places Near ${place.name}`,
      description,
      url: `/bible-places/near/${slug}`,
      type: 'website',
    },
    alternates: { canonical: `/bible-places/${slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function NearbyPage({ params }: PageProps) {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place || place.lat === null) notFound();

  const nearby = getNearbyPlaces(slug);
  if (nearby.length === 0) notFound();

  // Build markers: center place + nearby
  const markers = [
    { lat: place.lat!, lon: place.lon!, name: place.name, slug: place.slug },
    ...nearby.map(n => {
      const p = getPlaceBySlug(n.slug);
      return p && p.lat !== null ? { lat: p.lat, lon: p.lon!, name: n.name, slug: n.slug } : null;
    }).filter((m): m is NonNullable<typeof m> => m !== null),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Places Near ${place.name}`,
    url: `https://biblemaximum.com/bible-places/near/${slug}`,
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
        <span className="text-scripture font-medium">Nearby</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold font-display mb-3 text-scripture">
          Biblical Places Near {place.name}
        </h1>
        <p className="text-primary-dark/70 max-w-2xl mb-4">
          <strong>{nearby.length}</strong> biblical places located near {place.name},
          sorted by distance. Explore the geographical context of this important Bible location.
        </p>
      </section>

      {/* Map */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <h2 className="text-lg font-bold text-scripture mb-3">Map</h2>
        <NearbyMapClient markers={markers} />
      </section>

      {/* Distance Table */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <h2 className="text-xl font-bold text-scripture mb-4">Nearby Places</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-grace">
                <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-primary-dark/50">Place</th>
                <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-primary-dark/50">Distance</th>
                <th className="py-2 text-xs font-semibold uppercase tracking-wider text-primary-dark/50">Verses</th>
              </tr>
            </thead>
            <tbody>
              {nearby.map(n => {
                const nearPlace = getPlaceBySlug(n.slug);
                return (
                  <tr key={n.slug} className="border-b border-grace/50">
                    <td className="py-3 pr-4">
                      <Link href={`/bible-places/${n.slug}`} className="font-medium text-scripture hover:text-blue-600 transition-colors">
                        {n.name}
                      </Link>
                      {nearPlace && (
                        <span className="text-xs text-primary-dark/40 ml-2 capitalize">{nearPlace.type}</span>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-sm text-primary-dark/70">{n.distanceKm} km</td>
                    <td className="py-3 text-sm text-primary-dark/70">{nearPlace?.verseCount || 0}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Internal Links */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Related Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href={`/bible-places/${slug}`} className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              {place.name} — Full Profile
            </Link>
            <Link href="/bible-places" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              All Bible Places
            </Link>
          </div>
        </div>
        <GeoAttribution compact />
      </section>
    </>
  );
}
