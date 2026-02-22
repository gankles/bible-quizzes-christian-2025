import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBibleNames, getBibleNamesByLetter, getLetters } from '@/lib/bible-names-data';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Bible Names & Meanings | 2,600+ Biblical Name Origins & Definitions | Complete Dictionary',
  description: 'Discover the meanings of over 2,600 names found in the Bible. Browse alphabetically from Aaron to Zurishaddai with definitions, origins, and biblical significance.',
  keywords: [
    'Bible names', 'biblical name meanings', 'Hebrew name meanings', 'Bible name dictionary',
    'what does my name mean in the Bible', 'biblical baby names', 'Bible name origins',
    'Christian name meanings', 'Old Testament names', 'New Testament names',
    'Hebrew names and meanings', 'biblical names list', 'Bible name definitions',
  ],
  openGraph: {
    title: 'Bible Names & Meanings — 2,600+ Biblical Name Dictionary',
    description: 'Browse the meanings and origins of over 2,600 names found in the Bible.',
    url: '/bible-names',
    type: 'website',
  },
  alternates: { canonical: '/bible-names' },
};

export default function BibleNamesPage() {
  const allNames = getAllBibleNames();
  const byLetter = getBibleNamesByLetter();
  const letters = getLetters();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Names & Meanings Dictionary',
    description: metadata.description,
    url: 'https://biblemaximum.com/bible-names',
    numberOfItems: allNames.length,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allNames.length,
      itemListElement: allNames.slice(0, 20).map((n, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${n.name} — ${n.meaning}`,
        url: `https://biblemaximum.com/bible-names/${n.slug}`,
      })),
    },
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">Bible Names</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white border-b border-grace">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-scripture">
              Bible Names &amp; Meanings
            </h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mb-6">
              Explore the meaning and origin of over {allNames.length.toLocaleString()} names found
              in the Bible — from patriarchs and prophets to kings and apostles.
            </p>

            <div className="flex flex-wrap gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-scripture">{allNames.length.toLocaleString()}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Names</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{letters.length}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Letters</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alphabet Jump Links */}
      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {letters.map(letter => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-grace text-sm font-bold text-primary-dark/80 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
            >
              {letter}
            </a>
          ))}
        </div>
      </section>

      {/* Names by Letter */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        {letters.map(letter => {
          const names = byLetter[letter] || [];
          return (
            <div key={letter} id={`letter-${letter}`} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
                  {letter}
                </span>
                <h2 className="text-xl font-bold text-scripture">
                  {letter}
                </h2>
                <span className="text-sm text-primary-dark/60">({names.length} names)</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {names.map(n => (
                  <Link
                    key={n.slug}
                    href={`/bible-names/${n.slug}`}
                    className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
                  >
                    <span className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                      {n.name}
                    </span>
                    <span className="block text-xs text-primary-dark/60 mt-0.5 line-clamp-1">
                      {n.meaning}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Related Resources */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-scripture mb-2">Explore More</h2>
          <p className="text-sm text-primary-dark/70 mb-4">
            Dive deeper into the people and places of the Bible.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/people" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Bible People Directory
            </Link>
            <Link href="/bible-book-names" className="px-5 py-2.5 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-primary-light transition-colors">
              Bible Book Names
            </Link>
            <Link href="/commandments" className="px-5 py-2.5 bg-white text-primary-dark/80 text-sm font-medium rounded-lg border border-grace hover:bg-primary-light/50 transition-colors">
              613 Commandments
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
