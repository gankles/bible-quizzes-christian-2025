import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { StructuredData } from '@/components/StructuredData';
import {
  getEncyclopediaEntry,
  getRelatedEntries,
  EncyclopediaEntry,
  EntryType,
} from '@/lib/encyclopedia-data';

interface EncyclopediaPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Use ISR (on-demand) for 11K+ entries — avoids lengthy build times
  return [];
}

export async function generateMetadata({ params }: EncyclopediaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEncyclopediaEntry(slug);
  if (!entry) return {};

  const typeLabel = getTypeLabel(entry.type);
  const etymologyNote = entry.etymology
    ? ` The name means "${entry.etymology[0]}".`
    : '';

  const title = `${entry.title} -- Bible Encyclopedia | ${typeLabel} in the Bible | Bible Maximum`;
  const description = entry.description
    || entry.definition
    || `${entry.title} in the Bible.${etymologyNote} ${entry.totalVerseRefs} verse references across ${entry.booksReferenced.length} books. Comprehensive encyclopedia entry with definitions, cross-references, and study resources.`;

  return {
    title,
    description: description.slice(0, 300),
    keywords: [
      `${entry.title} in the Bible`,
      `${entry.title} meaning`,
      `${entry.title} definition`,
      `${entry.title} Bible encyclopedia`,
      `what is ${entry.title} in the Bible`,
      ...(entry.etymology ? entry.etymology.map(m => `${entry.title} means ${m}`) : []),
      ...entry.keywords.slice(0, 5),
    ],
    openGraph: {
      title: `${entry.title} -- Bible Encyclopedia`,
      description: description.slice(0, 200),
      url: `/bible-encyclopedia/${slug}`,
      type: 'article',
    },
    alternates: { canonical: `/bible-encyclopedia/${slug}` },
  };
}

function getTypeLabel(type: EntryType): string {
  switch (type) {
    case 'person': return 'Person';
    case 'place': return 'Place';
    case 'topic': return 'Topic';
    case 'concept': return 'Concept';
  }
}

function getTypeBadgeColor(type: EntryType): string {
  switch (type) {
    case 'person': return 'bg-green-100 text-green-800 border-green-200';
    case 'place': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'topic': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'concept': return 'bg-purple-100 text-purple-800 border-purple-200';
  }
}

function getTestamentBadge(entry: EncyclopediaEntry): string {
  if (entry.hasOldTestament && entry.hasNewTestament) return 'Both Testaments';
  if (entry.hasOldTestament) return 'Old Testament';
  if (entry.hasNewTestament) return 'New Testament';
  return '';
}

export default async function EncyclopediaDetailPage({ params }: EncyclopediaPageProps) {
  const { slug } = await params;
  const entry = getEncyclopediaEntry(slug);

  if (!entry) {
    notFound();
  }

  const related = getRelatedEntries(slug, 8);

  // Extract key verses (first verse from each sub-topic, up to 10)
  const keyVerses: { reference: string; context: string }[] = [];
  for (const st of entry.subTopics) {
    if (keyVerses.length >= 10) break;
    if (st.verses.length > 0) {
      keyVerses.push({
        reference: st.verses[0],
        context: st.title,
      });
    }
  }

  // JSON-LD schemas
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${entry.title} -- Bible Encyclopedia`,
    description: entry.description || entry.definition || `Bible encyclopedia entry for ${entry.title}.`,
    url: `https://biblemaximum.com/bible-encyclopedia/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Bible Maximum',
      url: 'https://biblemaximum.com',
    },
    about: {
      '@type': 'Thing',
      name: entry.title,
    },
  };

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: entry.title,
    description: entry.definition || entry.description || `${entry.title} in the Bible`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Bible Maximum Encyclopedia',
      url: 'https://biblemaximum.com/bible-encyclopedia',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://biblemaximum.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Bible Encyclopedia',
        item: 'https://biblemaximum.com/bible-encyclopedia',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: entry.title,
        item: `https://biblemaximum.com/bible-encyclopedia/${slug}`,
      },
    ],
  };

  const testamentBadge = getTestamentBadge(entry);

  return (
    <div className="min-h-screen bg-primary-light/30">
      <StructuredData data={articleSchema} />
      <StructuredData data={definedTermSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-grace">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <ol className="flex items-center flex-wrap gap-y-1 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            </li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li>
              <Link href="/bible-encyclopedia" className="text-blue-600 hover:underline">Bible Encyclopedia</Link>
            </li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li className="text-primary-dark/70">{entry.title}</li>
          </ol>
        </div>
      </nav>

      {/* Hero + Quick Facts Layout */}
      <header className="bg-white border-b border-grace">
        <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
            {/* Main hero */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getTypeBadgeColor(entry.type)}`}>
                  {getTypeLabel(entry.type)}
                </span>
                {entry.category && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                    {entry.category}
                  </span>
                )}
                {testamentBadge && (
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                    entry.hasOldTestament && entry.hasNewTestament
                      ? 'bg-gradient-to-r from-amber-50 to-blue-50 text-primary-dark/70 border-grace'
                      : entry.hasOldTestament
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {testamentBadge}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold font-display text-scripture mb-4">
                {entry.title}
              </h1>

              {entry.definition && (
                <p className="text-lg text-primary-dark/70 max-w-2xl mb-4">
                  {entry.definition}
                </p>
              )}

              {/* Stats */}
              <div className="flex flex-wrap gap-5 text-center">
                {entry.totalVerseRefs > 0 && (
                  <div>
                    <p className="text-2xl font-bold text-scripture">{entry.totalVerseRefs.toLocaleString()}</p>
                    <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Verse Refs</p>
                  </div>
                )}
                {entry.booksReferenced.length > 0 && (
                  <div>
                    <p className="text-2xl font-bold text-scripture">{entry.booksReferenced.length}</p>
                    <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Books</p>
                  </div>
                )}
                {entry.subTopics.length > 0 && (
                  <div>
                    <p className="text-2xl font-bold text-scripture">{entry.subTopics.length}</p>
                    <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Sub-Topics</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Facts Sidebar */}
            {(entry.etymology || entry.character) && (
              <div className="lg:w-72 mt-6 lg:mt-0 flex-shrink-0">
                <div className="bg-primary-light/50 rounded-lg border border-grace p-5">
                  <h2 className="text-sm font-bold text-scripture uppercase tracking-wider mb-3">
                    Quick Facts
                  </h2>
                  <dl className="space-y-3 text-sm">
                    {entry.etymology && (
                      <>
                        <dt className="font-medium text-primary-dark/60">Etymology</dt>
                        <dd className="text-primary-dark/80">
                          {entry.etymology.map((m, i) => (
                            <span key={i}>
                              {i > 0 && ', '}
                              &ldquo;{m}&rdquo;
                            </span>
                          ))}
                        </dd>
                      </>
                    )}
                    {entry.character?.occupation && (
                      <>
                        <dt className="font-medium text-primary-dark/60">Occupation</dt>
                        <dd className="text-primary-dark/80">{entry.character.occupation}</dd>
                      </>
                    )}
                    {entry.character?.lifespan && (
                      <>
                        <dt className="font-medium text-primary-dark/60">Lifespan</dt>
                        <dd className="text-primary-dark/80">{entry.character.lifespan}</dd>
                      </>
                    )}
                    {entry.character?.testament && (
                      <>
                        <dt className="font-medium text-primary-dark/60">Testament</dt>
                        <dd className="text-primary-dark/80">{entry.character.testament} Testament</dd>
                      </>
                    )}
                    {entry.type !== 'concept' && (
                      <>
                        <dt className="font-medium text-primary-dark/60">Type</dt>
                        <dd className="text-primary-dark/80">{getTypeLabel(entry.type)}</dd>
                      </>
                    )}
                    {entry.booksReferenced.length > 0 && (
                      <>
                        <dt className="font-medium text-primary-dark/60">Referenced In</dt>
                        <dd className="text-primary-dark/80">{entry.booksReferenced.length} books of the Bible</dd>
                      </>
                    )}
                  </dl>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">

        {/* Character Biography */}
        {entry.character && (
          <section className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-2xl font-bold font-display text-scripture mb-4">
              Biography
            </h2>
            <p className="text-primary-dark/80 leading-relaxed mb-4">
              {entry.character.biography}
            </p>
            {entry.character.significance && (
              <>
                <h3 className="text-lg font-semibold text-scripture mb-2">Significance</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  {entry.character.significance}
                </p>
              </>
            )}

            {/* Timeline */}
            {entry.character.timeline.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-scripture mb-3">Timeline</h3>
                <div className="space-y-3">
                  {entry.character.timeline.map((event, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-20 text-right text-sm font-mono text-amber-700">
                        {event.date}
                      </span>
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                        {i < entry.character!.timeline.length - 1 && (
                          <span className="w-0.5 flex-1 bg-blue-200"></span>
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="font-medium text-scripture">{event.event}</p>
                        <p className="text-sm text-primary-dark/60">{event.significance}</p>
                        <p className="text-xs text-primary-dark/40 mt-0.5">{event.verses}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Relationships */}
            {entry.character.relationships.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-scripture mb-3">Key Relationships</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {entry.character.relationships.map((rel, i) => (
                    <div key={i} className="bg-primary-light/50 rounded-lg p-3 border border-grace">
                      <p className="font-medium text-scripture text-sm">{rel.person}</p>
                      <p className="text-xs text-primary-dark/50">{rel.relationship}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Description (from Topics data) */}
        {entry.description && !entry.character && (
          <section className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-2xl font-bold font-display text-scripture mb-4">
              Overview
            </h2>
            <p className="text-primary-dark/80 leading-relaxed">
              {entry.description}
            </p>
          </section>
        )}

        {/* Sub-Topics from Nave's */}
        {entry.subTopics.length > 0 && (
          <section className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-2xl font-bold font-display text-scripture mb-2">
              Topical Index
            </h2>
            <p className="text-sm text-primary-dark/50 mb-5">
              {entry.subTopics.length} sub-topics from Nave&apos;s Topical Bible
            </p>
            <div className="space-y-4">
              {entry.subTopics.slice(0, 25).map((st, i) => (
                <div key={i} className="border-b border-grace/60 last:border-b-0 pb-3 last:pb-0">
                  <h3 className="font-medium text-scripture text-sm mb-1">
                    {st.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {st.verses.slice(0, 6).map((v, vi) => (
                      <span
                        key={vi}
                        className="inline-block px-2 py-0.5 rounded text-xs bg-primary-light/60 text-primary-dark/60 border border-grace/50"
                      >
                        {v}
                      </span>
                    ))}
                    {st.verses.length > 6 && (
                      <span className="text-xs text-primary-dark/40 self-center">
                        +{st.verses.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {entry.subTopics.length > 25 && (
                <p className="text-sm text-primary-dark/50">
                  ... and {entry.subTopics.length - 25} more sub-topics
                </p>
              )}
            </div>
          </section>
        )}

        {/* Key Verses */}
        {keyVerses.length > 0 && (
          <section className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-2xl font-bold font-display text-scripture mb-4">
              Key Verses
            </h2>
            <div className="space-y-3">
              {keyVerses.map((kv, i) => (
                <div key={i} className="flex items-start gap-3 py-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-mono text-sm text-scripture">{kv.reference}</p>
                    <p className="text-xs text-primary-dark/50 mt-0.5">{kv.context}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CRO: Explore Further */}
        <section className="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200 p-6 md:p-8">
          <h2 className="text-xl font-bold font-display text-scripture mb-4">
            Explore Further
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href={`/topics/${slug}`}
              className="block bg-white rounded-lg border border-grace p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <p className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                {entry.title} Topic Study
              </p>
              <p className="text-sm text-primary-dark/60 mt-1">
                Verse text and commentary for deeper study
              </p>
            </Link>

            <Link
              href={`/chain-study/${slug}`}
              className="block bg-white rounded-lg border border-grace p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <p className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                Chain Study
              </p>
              <p className="text-sm text-primary-dark/60 mt-1">
                Trace this theme chronologically through Scripture
              </p>
            </Link>

            {entry.type === 'place' && (
              <Link
                href={`/bible-places`}
                className="block bg-white rounded-lg border border-grace p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <p className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                  Bible Places Map
                </p>
                <p className="text-sm text-primary-dark/60 mt-1">
                  Explore biblical locations with interactive maps
                </p>
              </Link>
            )}

            {entry.type === 'person' && (
              <Link
                href={`/characters/${slug}`}
                className="block bg-white rounded-lg border border-grace p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <p className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                  Character Profile
                </p>
                <p className="text-sm text-primary-dark/60 mt-1">
                  Biography, timeline, and relationships
                </p>
              </Link>
            )}

            {entry.type !== 'place' && entry.type !== 'person' && (
              <Link
                href="/bible-quizzes"
                className="block bg-white rounded-lg border border-grace p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <p className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                  Test Your Knowledge
                </p>
                <p className="text-sm text-primary-dark/60 mt-1">
                  Take a Bible quiz to reinforce what you learned
                </p>
              </Link>
            )}
          </div>
        </section>

        {/* Related Entries */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold font-display text-scripture mb-4">
              Related Encyclopedia Entries
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/bible-encyclopedia/${r.slug}`}
                  className="block bg-white rounded-lg border border-grace p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-xs font-medium border ${getTypeBadgeColor(r.type)}`}>
                      {getTypeLabel(r.type)}
                    </span>
                  </div>
                  <p className="font-semibold text-scripture group-hover:text-blue-600 transition-colors text-sm">
                    {r.title}
                  </p>
                  {r.etymology && (
                    <p className="text-xs text-primary-dark/40 mt-1 italic">
                      &ldquo;{r.etymology[0]}&rdquo;
                    </p>
                  )}
                  {r.totalVerseRefs > 0 && (
                    <p className="text-xs text-primary-dark/40 mt-1">
                      {r.totalVerseRefs} verse refs
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Internal Links */}
        <section className="bg-white rounded-xl border border-grace p-6 md:p-8">
          <h2 className="text-lg font-bold text-scripture mb-3">
            Cross-References and Internal Links
          </h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/chain-study" className="text-sm text-blue-600 hover:underline">
              All Chain Studies
            </Link>
            <span className="text-primary-dark/20">|</span>
            <Link href="/bible-encyclopedia" className="text-sm text-blue-600 hover:underline">
              Bible Encyclopedia A-Z
            </Link>
            <span className="text-primary-dark/20">|</span>
            <Link href="/topics" className="text-sm text-blue-600 hover:underline">
              Bible Topics
            </Link>
            <span className="text-primary-dark/20">|</span>
            <Link href="/characters" className="text-sm text-blue-600 hover:underline">
              Bible Characters
            </Link>
            <span className="text-primary-dark/20">|</span>
            <Link href="/bible-places" className="text-sm text-blue-600 hover:underline">
              Bible Places
            </Link>
            <span className="text-primary-dark/20">|</span>
            <Link href="/bible-quizzes" className="text-sm text-blue-600 hover:underline">
              Bible Quizzes
            </Link>
          </div>
        </section>

        {/* Browse All */}
        <div className="text-center py-4">
          <Link
            href="/bible-encyclopedia"
            className="inline-flex items-center gap-2 px-6 py-3 bg-scripture text-white rounded-lg hover:bg-scripture/90 transition-colors font-medium"
          >
            Browse All Encyclopedia Entries A-Z
          </Link>
        </div>
      </main>
    </div>
  );
}
