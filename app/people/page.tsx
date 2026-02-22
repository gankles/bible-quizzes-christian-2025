import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPeople, getPeopleStats, getAllTribes } from '@/lib/people-data';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Bible People Directory | 3,000+ Biblical Characters with Family Trees & Hebrew Names',
  description: 'Explore 3,000+ people mentioned in the Bible with family relationships, Hebrew and Greek names, tribal affiliations, and scripture references. The most comprehensive Bible character directory online.',
  keywords: [
    'Bible characters', 'Bible people', 'biblical characters list', 'people in the Bible',
    'Bible family trees', 'Old Testament characters', 'New Testament characters',
    'Hebrew Bible names', 'Bible genealogy', 'biblical figures',
    'Bible character directory', 'who is in the Bible',
  ],
  openGraph: {
    title: 'Bible People Directory — 3,000+ Biblical Characters',
    description: 'The most comprehensive directory of people mentioned in the Bible.',
    url: '/people',
    type: 'website',
  },
  alternates: { canonical: '/people' },
};

export default function PeoplePage() {
  const stats = getPeopleStats();
  const tribes = getAllTribes();
  const allPeople = getAllPeople();

  // Group by first letter
  const byLetter: Record<string, typeof allPeople> = {};
  for (const p of allPeople) {
    const letter = p.name.charAt(0).toUpperCase();
    if (!byLetter[letter]) byLetter[letter] = [];
    byLetter[letter].push(p);
  }
  const letters = Object.keys(byLetter).sort();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible People Directory',
    description: metadata.description,
    url: 'https://biblemaximum.com/people',
    numberOfItems: stats.total,
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">Bible People</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white border-b border-grace">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-scripture">
              Bible People Directory
            </h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mb-6">
              Discover every person mentioned in the Bible — their names in Hebrew
              and Greek, family relationships, tribal affiliations, and scriptural references.
            </p>

            <div className="flex flex-wrap gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.total.toLocaleString()}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">People</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-400">{stats.male.toLocaleString()}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Men</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-pink-400">{stats.female.toLocaleString()}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Women</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.tribes}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Tribes</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.totalRelationships.toLocaleString()}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Relationships</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tribes */}
      {tribes.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-8">
          <h2 className="text-lg font-bold text-scripture mb-3">Browse by Tribe</h2>
          <div className="flex flex-wrap gap-2">
            {tribes.map(tribe => (
              <span
                key={tribe}
                className="px-3 py-1.5 bg-white border border-grace rounded-lg text-sm text-primary-dark/80"
              >
                {tribe}
              </span>
            ))}
          </div>
        </section>
      )}

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

      {/* People by Letter */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        {letters.map(letter => {
          const people = byLetter[letter] || [];
          return (
            <div key={letter} id={`letter-${letter}`} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
                  {letter}
                </span>
                <h2 className="text-xl font-bold text-scripture">{letter}</h2>
                <span className="text-sm text-primary-dark/60">({people.length})</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {people.map(p => (
                  <Link
                    key={p.id}
                    href={`/people/${p.slug}`}
                    className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                        {p.name}
                        {p.nameInstance > 1 && (
                          <span className="text-xs text-primary-dark/40 ml-1">({p.nameInstance})</span>
                        )}
                      </span>
                      {p.sex && (
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          p.sex === 'male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'
                        }`}>
                          {p.sex === 'male' ? 'M' : 'F'}
                        </span>
                      )}
                    </div>
                    {p.uniqueAttribute && (
                      <span className="block text-xs text-primary-dark/60 mt-0.5 line-clamp-1">
                        {p.uniqueAttribute}
                      </span>
                    )}
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
            Discover more about the people, names, and stories of the Bible.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/bible-names" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Bible Name Meanings
            </Link>
            <Link href="/commandments" className="px-5 py-2.5 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-primary-light transition-colors">
              613 Commandments
            </Link>
            <Link href="/bible-quizzes" className="px-5 py-2.5 bg-white text-primary-dark/80 text-sm font-medium rounded-lg border border-grace hover:bg-primary-light/50 transition-colors">
              Bible Quizzes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
