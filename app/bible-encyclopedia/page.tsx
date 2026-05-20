import { Metadata } from 'next';
import Link from 'next/link';
import { StructuredData } from '@/components/StructuredData';
import {
  getAllEncyclopediaEntries,
  getEncyclopediaStats,
  getEncyclopediaSections,
  getFeaturedEntries,
  getEncyclopediaEntriesByType,
  EntryType,
} from '@/lib/encyclopedia-data';

export const metadata: Metadata = {
  title: 'Bible Encyclopedia | 11,000+ People, Places, Topics & Concepts | Complete Biblical Reference | Bible Maximum',
  description: 'The most comprehensive Bible encyclopedia online. Over 11,000 entries covering biblical people, places, topics, and theological concepts. Includes name etymologies, verse references, definitions, and cross-references.',
  keywords: [
    'Bible encyclopedia', 'biblical encyclopedia', 'Bible dictionary',
    'Bible people', 'Bible places', 'Bible topics', 'biblical names',
    'Bible name meanings', 'Hitchcock Bible names', 'Nave\'s topical Bible',
    'Bible reference', 'biblical definitions', 'Bible study resource',
  ],
  openGraph: {
    title: 'Bible Encyclopedia -- 11,000+ Biblical Entries',
    description: 'The most comprehensive Bible encyclopedia with people, places, topics, and concepts from Scripture.',
    url: '/bible-encyclopedia',
    type: 'website',
  },
  alternates: { canonical: '/bible-encyclopedia' },
};

function getTypeBadgeColor(type: EntryType): string {
  switch (type) {
    case 'person': return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
    case 'place': return 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200';
    case 'topic': return 'bg-sacred/10 text-scripture border-sacred/20 hover:bg-sacred-light';
    case 'concept': return 'bg-scripture/10 text-scripture border-sacred/20 hover:bg-purple-200';
  }
}

function getTypeLabel(type: EntryType): string {
  switch (type) {
    case 'person': return 'People';
    case 'place': return 'Places';
    case 'topic': return 'Topics';
    case 'concept': return 'Concepts';
  }
}

export default function BibleEncyclopediaIndexPage() {
  const stats = getEncyclopediaStats();
  const sections = getEncyclopediaSections();
  const featured = getFeaturedEntries(20);
  const allEntries = getAllEncyclopediaEntries();

  // Group by section
  const bySection: Record<string, typeof allEntries> = {};
  for (const entry of allEntries) {
    if (!bySection[entry.section]) bySection[entry.section] = [];
    bySection[entry.section].push(entry);
  }

  // Category type counts for filter cards
  const typeCards: { type: EntryType; count: number }[] = [
    { type: 'person', count: stats.people },
    { type: 'place', count: stats.places },
    { type: 'topic', count: stats.topics },
    { type: 'concept', count: stats.concepts },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Encyclopedia',
    description: metadata.description,
    url: 'https://biblemaximum.com/bible-encyclopedia',
    numberOfItems: stats.totalEntries,
  };

  return (
    <div className="min-h-screen bg-primary-light/30">
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-grace">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <ol className="flex items-center text-sm">
            <li>
              <Link href="/" className="text-sacred hover:underline">Home</Link>
            </li>
            <li className="text-ink-light mx-2">/</li>
            <li className="text-ink-muted">Bible Encyclopedia</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-white border-b border-grace">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          <p className="text-sm font-medium text-sacred uppercase tracking-wider mb-2">
            Complete Biblical Reference
          </p>
          <h1 className="text-3xl md:text-4xl font-bold font-display text-scripture mb-4">
            Bible Encyclopedia
          </h1>
          <p className="text-lg text-ink-muted max-w-2xl mb-8">
            Over {stats.totalEntries.toLocaleString()} entries covering every person, place,
            topic, and concept mentioned in Scripture. Includes name etymologies from
            Hitchcock, topical indexes from Nave&apos;s, and verse-by-verse references.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-scripture">{stats.totalEntries.toLocaleString()}</p>
              <p className="text-xs text-ink-muted uppercase tracking-wider">Total Entries</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">{stats.people.toLocaleString()}</p>
              <p className="text-xs text-ink-muted uppercase tracking-wider">People</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-600">{stats.places.toLocaleString()}</p>
              <p className="text-xs text-ink-muted uppercase tracking-wider">Places</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-sacred">{stats.topics.toLocaleString()}</p>
              <p className="text-xs text-ink-muted uppercase tracking-wider">Topics</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-scripture">{stats.concepts.toLocaleString()}</p>
              <p className="text-xs text-ink-muted uppercase tracking-wider">Concepts</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">

        {/* Category Filters */}
        <section>
          <h2 className="text-2xl font-bold font-display text-scripture mb-4">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {typeCards.map(({ type, count }) => (
              <div
                key={type}
                className={`rounded-lg border p-5 text-center ${getTypeBadgeColor(type)} transition-colors`}
              >
                <p className="text-3xl font-bold mb-1">{count.toLocaleString()}</p>
                <p className="text-sm font-medium">{getTypeLabel(type)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Entries */}
        <section>
          <h2 className="text-2xl font-bold font-display text-scripture mb-2">
            Featured Entries
          </h2>
          <p className="text-ink-muted text-sm mb-6">
            The most referenced entries across Scripture
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map(entry => (
              <Link
                key={entry.slug}
                href={`/bible-encyclopedia/${entry.slug}`}
                className="block bg-white rounded-lg border border-grace p-4 hover:border-sacred/50 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-block px-1.5 py-0.5 rounded text-xs font-medium border ${getTypeBadgeColor(entry.type)}`}>
                    {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                  </span>
                </div>
                <p className="font-semibold text-scripture group-hover:text-gold-dark transition-colors">
                  {entry.title}
                </p>
                {entry.etymology && (
                  <p className="text-xs text-ink-light mt-1 italic">
                    &ldquo;{entry.etymology[0]}&rdquo;
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2 text-xs text-ink-light">
                  <span>{entry.totalVerseRefs} verses</span>
                  {entry.booksReferenced.length > 0 && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-scripture/20"></span>
                      <span>{entry.booksReferenced.length} books</span>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* A-Z Navigation */}
        <section>
          <h2 className="text-2xl font-bold font-display text-scripture mb-4">
            Browse All Entries A-Z
          </h2>

          {/* Letter Jump Links */}
          <div className="flex flex-wrap gap-1.5 mb-8">
            {sections.filter(s => /[A-Z]/.test(s.letter)).map(({ letter, count }) => (
              <a
                key={letter}
                href={`#section-${letter}`}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-grace text-sm font-medium text-scripture hover:bg-sacred-light hover:border-sacred/50 hover:text-gold-dark transition-colors"
                title={`${letter} -- ${count} entries`}
              >
                {letter}
              </a>
            ))}
          </div>

          {/* Section Listings */}
          <div className="space-y-8">
            {sections.filter(s => /[A-Z]/.test(s.letter)).map(({ letter, count }) => {
              const sectionEntries = bySection[letter] || [];
              // Show first 30 entries per section, with expand indicator
              const displayEntries = sectionEntries.slice(0, 30);
              const remaining = sectionEntries.length - displayEntries.length;

              return (
                <div key={letter} id={`section-${letter}`}>
                  <div className="flex items-center gap-3 mb-3 border-b border-grace pb-2">
                    <span className="text-2xl font-bold text-scripture">{letter}</span>
                    <span className="text-sm text-ink-light">{count} entries</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
                    {displayEntries.map(entry => (
                      <Link
                        key={entry.slug}
                        href={`/bible-encyclopedia/${entry.slug}`}
                        className="flex items-center justify-between py-1.5 text-sm text-scripture hover:text-gold-dark transition-colors group"
                      >
                        <span className="group-hover:underline truncate">{entry.title}</span>
                        <span className={`flex-shrink-0 ml-2 inline-block px-1.5 py-0.5 rounded text-xs border ${getTypeBadgeColor(entry.type)} opacity-60`}>
                          {entry.type.charAt(0).toUpperCase()}
                        </span>
                      </Link>
                    ))}
                  </div>
                  {remaining > 0 && (
                    <p className="text-sm text-ink-light mt-2">
                      ... and {remaining} more entries starting with {letter}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Data Sources */}
        <section className="bg-white rounded-xl border border-grace p-6 md:p-8">
          <h2 className="text-2xl font-bold font-display text-scripture mb-4">
            About This Encyclopedia
          </h2>
          <div className="prose prose-scripture max-w-none text-scripture">
            <p>
              This Bible encyclopedia combines data from multiple trusted reference works to
              create the most comprehensive biblical reference available online:
            </p>
            <ul>
              <li>
                <strong>Nave&apos;s Topical Bible</strong> -- {stats.withNavesData.toLocaleString()} entries
                with detailed sub-topics and verse references organized by theme
              </li>
              <li>
                <strong>Hitchcock&apos;s Bible Names Dictionary</strong> -- {stats.withEtymology.toLocaleString()} name
                etymologies revealing the meaning behind biblical names
              </li>
              <li>
                <strong>Character Profiles</strong> -- {stats.withCharacterData} in-depth biographical
                entries with timelines, relationships, and historical significance
              </li>
              <li>
                <strong>Topical Studies</strong> -- Categorized definitions and descriptions
                spanning {stats.sections.filter(s => /[A-Z]/.test(s.letter)).length} alphabetical sections
              </li>
            </ul>
            <p>
              Every entry is cross-referenced with verse citations, related topics, and links
              to deeper study resources throughout Bible Maximum.
            </p>
          </div>
        </section>

        {/* CRO Links */}
        <section className="bg-gradient-to-br from-scripture to-white rounded-xl border border-sacred/20 p-6 md:p-8">
          <h2 className="text-xl font-bold font-display text-scripture mb-4">
            More Study Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/chain-study"
              className="block bg-white rounded-lg border border-grace p-4 hover:border-sacred/50 hover:shadow-sm transition-all group"
            >
              <p className="font-semibold text-scripture group-hover:text-gold-dark transition-colors">
                Chain Studies
              </p>
              <p className="text-sm text-ink-muted mt-1">
                Trace themes chronologically through both testaments
              </p>
            </Link>
            <Link
              href="/topics"
              className="block bg-white rounded-lg border border-grace p-4 hover:border-sacred/50 hover:shadow-sm transition-all group"
            >
              <p className="font-semibold text-scripture group-hover:text-gold-dark transition-colors">
                Bible Topics
              </p>
              <p className="text-sm text-ink-muted mt-1">
                Verse text and commentary organized by theme
              </p>
            </Link>
            <Link
              href="/bible-quizzes"
              className="block bg-white rounded-lg border border-grace p-4 hover:border-sacred/50 hover:shadow-sm transition-all group"
            >
              <p className="font-semibold text-scripture group-hover:text-gold-dark transition-colors">
                Bible Quizzes
              </p>
              <p className="text-sm text-ink-muted mt-1">
                Test your biblical knowledge with interactive quizzes
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
