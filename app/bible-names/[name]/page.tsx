import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllBibleNames,
  getBibleNameBySlug,
  getBibleNamesForLetter,
} from '@/lib/bible-names-data';
import { searchPeople } from '@/lib/people-data';
import { StructuredData } from '@/components/StructuredData';
import { getAllPersonsByName, getBiography } from '@/lib/enrichment-data';

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  // 2.6K+ pages — generated on-demand via ISR, not at build time
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name: slug } = await params;
  const entry = getBibleNameBySlug(slug);
  if (!entry) return {};

  return {
    title: `${entry.name} — Biblical Name Meaning & Origin | What Does ${entry.name} Mean in the Bible? | Hebrew Definition & Scriptural Context | Bible Maximum`,
    description: `The biblical name ${entry.name} means "${entry.meaning}". Discover the origin, significance, and scriptural context of the name ${entry.name} in the Bible.`,
    keywords: [
      `${entry.name} meaning`, `${entry.name} Bible meaning`, `what does ${entry.name} mean`,
      `${entry.name} biblical name`, `${entry.name} name origin`, 'Bible name meaning',
      'biblical baby names', 'Hebrew name meaning',
    ],
    openGraph: {
      title: `${entry.name} — Biblical Name Meaning`,
      description: `${entry.name} means "${entry.meaning}" in the Bible.`,
      url: `/bible-names/${entry.slug}`,
      type: 'article',
    },
    alternates: { canonical: `/bible-names/${entry.slug}` },
  };
}

export default async function BibleNamePage({ params }: PageProps) {
  const { name: slug } = await params;
  const entry = getBibleNameBySlug(slug);
  if (!entry) notFound();

  const allNames = getAllBibleNames();
  const currentIndex = allNames.findIndex(n => n.slug === entry.slug);
  const prev = currentIndex > 0 ? allNames[currentIndex - 1] : null;
  const next = currentIndex < allNames.length - 1 ? allNames[currentIndex + 1] : null;

  const sameLetterNames = getBibleNamesForLetter(entry.firstLetter)
    .filter(n => n.slug !== entry.slug)
    .slice(0, 12);

  // Cross-link to matching people entries
  const matchingPeople = searchPeople(entry.name)
    .filter(p => p.name.toLowerCase() === entry.name.toLowerCase())
    .slice(0, 8);

  // Enrichment data from persons CSV
  const enrichedPersons = getAllPersonsByName(entry.name);
  const biography = getBiography(entry.name);

  // Collect unique etymology labels across all person matches
  const etymologyLabels: Array<{
    english: string; hebrew: string; hebrewTranslit: string; hebrewMeaning: string;
    hebrewStrongs: string; greek: string; greekTranslit: string; greekMeaning: string;
    greekStrongs: string; firstRef: string; type: string; givenByGod: boolean;
  }> = [];
  const seenLabels = new Set<string>();
  for (const person of enrichedPersons) {
    for (const label of person.labels || []) {
      const key = `${label.english}-${label.hebrew}-${label.greek}`;
      if (!seenLabels.has(key) && (label.hebrew || label.greek)) {
        seenLabels.add(key);
        etymologyLabels.push(label);
      }
    }
  }

  // Collect unique relationships across all person matches
  const relationships = enrichedPersons.flatMap(p => (p.relationships || []).map(r => ({ ...r, personId: p.id })));

  // Group relationships by type for family tree display
  const relByType: Record<string, Array<{ relatedName: string; ref: string }>> = {};
  for (const rel of relationships) {
    const type = rel.type || 'unknown';
    if (!relByType[type]) relByType[type] = [];
    // Avoid duplicates
    if (!relByType[type].find(r => r.relatedName === rel.relatedName)) {
      relByType[type].push({ relatedName: rel.relatedName, ref: rel.ref });
    }
  }

  // Find names with similar meanings (share a key word in the meaning)
  const meaningWords = entry.meaning.toLowerCase().split(/[;,\s]+/).filter(w => w.length > 3);
  const similarNames = meaningWords.length > 0
    ? allNames
        .filter(n => n.slug !== entry.slug && meaningWords.some(w => n.meaning.toLowerCase().includes(w)))
        .slice(0, 6)
    : [];

  // Schema markup
  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: entry.name,
    description: entry.meaning,
    url: `https://biblemaximum.com/bible-names/${entry.slug}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Hitchcock\'s Bible Names Dictionary',
      url: 'https://biblemaximum.com/bible-names',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bible Names', item: 'https://biblemaximum.com/bible-names' },
      { '@type': 'ListItem', position: 3, name: entry.name },
    ],
  };

  // Build richer FAQ answers using enrichment data
  const hebrewEtymology = etymologyLabels.find(l => l.hebrew);
  const etymologyNote = hebrewEtymology
    ? ` In Hebrew, it is written as ${hebrewEtymology.hebrew}${hebrewEtymology.hebrewTranslit ? ` (${hebrewEtymology.hebrewTranslit})` : ''}${hebrewEtymology.hebrewMeaning ? `, meaning "${hebrewEtymology.hebrewMeaning}"` : ''}.`
    : '';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What does ${entry.name} mean in the Bible?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The biblical name ${entry.name} means "${entry.meaning}."${etymologyNote} This name comes from Hitchcock's Bible Names Dictionary and reflects the deep significance that names held in biblical culture.`,
        },
      },
      {
        '@type': 'Question',
        name: `Who was ${entry.name} in the Bible?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: matchingPeople.length > 0
            ? `${entry.name} appears in the Bible as ${matchingPeople.map(p => p.uniqueAttribute || 'a biblical figure').join('; ')}. The name means "${entry.meaning}."`
            : biography?.summary
              ? `${biography.summary} The name ${entry.name} means "${entry.meaning}."`
              : `${entry.name} is a biblical name meaning "${entry.meaning}." Names in the Bible often reflected a person's character, destiny, or the circumstances of their birth.`,
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={definedTermSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/bible-names" className="hover:text-blue-600">Bible Names</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">{entry.name}</span>
      </nav>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
              {entry.firstLetter}
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-scripture">
              {entry.name}
            </h1>
          </div>
          <p className="text-lg text-primary-dark/70 mt-2">
            Biblical name meaning: <span className="font-semibold text-scripture">&ldquo;{entry.meaning}&rdquo;</span>
          </p>
        </div>

        {/* Name Meaning — unique content per name */}
        <div className="bg-white border border-grace rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-scripture mb-3">
            What Does &ldquo;{entry.name}&rdquo; Mean in the Bible?
          </h2>
          <p className="text-primary-dark/80 leading-relaxed mb-3">
            The name <strong>{entry.name}</strong> is a biblical name meaning{' '}
            <strong>&ldquo;{entry.meaning}&rdquo;</strong>.
            {matchingPeople.length > 0 ? (
              <> In Scripture, {matchingPeople.length === 1 ? 'this name belongs to' : 'this name is shared by'}{' '}
              {matchingPeople.map((p, i) => (
                <span key={p.slug}>
                  {i > 0 && (i === matchingPeople.length - 1 ? ' and ' : ', ')}
                  <Link href={`/people/${p.slug}`} className="text-blue-600 hover:underline">
                    {p.name}{p.uniqueAttribute ? `, ${p.uniqueAttribute.toLowerCase()}` : ''}
                  </Link>
                </span>
              ))}.
              </>
            ) : (
              <> This name from Hitchcock&apos;s Bible Names Dictionary reflects the deep significance that names held in biblical culture, often revealing a person&apos;s character, calling, or the circumstances surrounding their birth.</>
            )}
          </p>
          <dl className="grid gap-3 sm:grid-cols-2 mt-4 pt-4 border-t border-grace/50">
            <div>
              <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">Meaning</dt>
              <dd className="text-scripture font-medium">{entry.meaning}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">Source</dt>
              <dd className="text-scripture">Hitchcock&apos;s Bible Names Dictionary</dd>
            </div>
            {enrichedPersons.length > 0 && enrichedPersons[0].sex && (
              <div>
                <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">Gender</dt>
                <dd className="text-scripture capitalize">{enrichedPersons[0].sex}</dd>
              </div>
            )}
            {enrichedPersons.length > 0 && enrichedPersons[0].tribe && (
              <div>
                <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">Tribe</dt>
                <dd className="text-scripture">{enrichedPersons[0].tribe}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Hebrew & Greek Etymology — from enrichment data */}
        {etymologyLabels.length > 0 && (
          <section className="bg-white border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-4">
              Hebrew &amp; Greek Etymology
            </h2>
            <div className="space-y-4">
              {etymologyLabels.map((label, i) => (
                <div key={i} className={i > 0 ? 'border-t border-grace/50 pt-4' : ''}>
                  {label.english && (
                    <p className="font-semibold text-scripture mb-2">{label.english}</p>
                  )}
                  <dl className="grid gap-3 sm:grid-cols-2">
                    {label.hebrew && (
                      <div>
                        <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">Hebrew</dt>
                        <dd>
                          <span className="text-xl font-serif text-scripture">{label.hebrew}</span>
                          {label.hebrewTranslit && (
                            <span className="text-sm text-primary-dark/60 ml-2">({label.hebrewTranslit})</span>
                          )}
                        </dd>
                        {label.hebrewMeaning && (
                          <dd className="text-sm text-primary-dark/70 mt-1">&ldquo;{label.hebrewMeaning}&rdquo;</dd>
                        )}
                        {label.hebrewStrongs && (
                          <dd className="mt-1">
                            <Link
                              href={`/lexicon/hebrew/${label.hebrewStrongs.replace(/^H/, '')}`}
                              className="text-xs text-blue-600 hover:underline"
                            >
                              Strong&apos;s {label.hebrewStrongs}
                            </Link>
                          </dd>
                        )}
                      </div>
                    )}
                    {label.greek && (
                      <div>
                        <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">Greek</dt>
                        <dd>
                          <span className="text-xl font-serif text-scripture">{label.greek}</span>
                          {label.greekTranslit && (
                            <span className="text-sm text-primary-dark/60 ml-2">({label.greekTranslit})</span>
                          )}
                        </dd>
                        {label.greekMeaning && (
                          <dd className="text-sm text-primary-dark/70 mt-1">&ldquo;{label.greekMeaning}&rdquo;</dd>
                        )}
                        {label.greekStrongs && (
                          <dd className="mt-1">
                            <Link
                              href={`/lexicon/greek/${label.greekStrongs.replace(/^G/, '')}`}
                              className="text-xs text-blue-600 hover:underline"
                            >
                              Strong&apos;s {label.greekStrongs}
                            </Link>
                          </dd>
                        )}
                      </div>
                    )}
                  </dl>
                  {label.firstRef && (
                    <p className="text-xs text-primary-dark/50 mt-2">
                      First referenced: {label.firstRef}
                    </p>
                  )}
                  {label.givenByGod && (
                    <p className="text-xs text-blue-600 font-medium mt-1">Name given by God</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Family Relationships — from enrichment data */}
        {Object.keys(relByType).length > 0 && (
          <section className="bg-white border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-4">
              Family &amp; Relationships
            </h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              {Object.entries(relByType).map(([type, rels]) => (
                <div key={type}>
                  <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">
                    {type.replace(/_/g, ' ')}
                  </dt>
                  <dd className="space-y-1">
                    {rels.map((rel, i) => (
                      <span key={i} className="block text-scripture text-sm">
                        {rel.relatedName}
                        {rel.ref && (
                          <span className="text-xs text-primary-dark/40 ml-1">({rel.ref})</span>
                        )}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Biography — from kjvstudy.org */}
        {biography && (
          <section className="bg-white border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-3">
              {entry.name} in Scripture
            </h2>
            {biography.summary && (
              <p className="text-primary-dark/80 leading-relaxed mb-4">{biography.summary}</p>
            )}
            {biography.significance && (
              <div className="mb-4">
                <h3 className="font-semibold text-scripture mb-1">Significance</h3>
                <p className="text-primary-dark/80 text-sm leading-relaxed">{biography.significance}</p>
              </div>
            )}
            {biography.key_events && biography.key_events.length > 0 && (
              <div>
                <h3 className="font-semibold text-scripture mb-2">Key Life Events</h3>
                <div className="space-y-2">
                  {biography.key_events.slice(0, 10).map((evt: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <span className="flex-shrink-0 w-16 text-xs text-primary-dark/50 pt-0.5">
                        {evt.age ? `Age ${evt.age}` : ''}
                      </span>
                      <div className="flex-1">
                        <span className="text-primary-dark/80">{evt.event}</span>
                        {evt.verse && (
                          <span className="text-xs text-blue-600 ml-1">({evt.verse})</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <p className="text-xs text-primary-dark/40 mt-4">Source: kjvstudy.org</p>
          </section>
        )}

        {/* People with This Name */}
        {matchingPeople.length > 0 && (
          <section className="bg-white border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-4">
              {entry.name} in the Bible
            </h2>
            <div className="space-y-3">
              {matchingPeople.map(person => (
                <Link
                  key={person.slug}
                  href={`/people/${person.slug}`}
                  className="flex items-center gap-3 bg-primary-light/30 rounded-lg px-4 py-3 hover:bg-primary-light border border-grace hover:border-blue-300 transition-all group block"
                >
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-xs font-bold flex-shrink-0 ${
                    person.sex === 'male' ? 'bg-blue-600' : person.sex === 'female' ? 'bg-pink-600' : 'bg-primary-dark/60'
                  }`}>
                    {person.name.charAt(0)}
                  </span>
                  <div>
                    <span className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                      {person.name}
                      {person.nameInstance > 1 && <span className="text-primary-dark/40 text-sm ml-1">({person.nameInstance})</span>}
                    </span>
                    {person.uniqueAttribute && (
                      <span className="block text-sm text-primary-dark/60">{person.uniqueAttribute}</span>
                    )}
                    {person.tribe && (
                      <span className="text-xs text-primary-dark/40">Tribe of {person.tribe}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Names with Similar Meanings */}
        {similarNames.length > 0 && (
          <section className="bg-white border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-4">Names with Similar Meanings</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {similarNames.map(n => (
                <Link
                  key={n.slug}
                  href={`/bible-names/${n.slug}`}
                  className="bg-primary-light/30 border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
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
          </section>
        )}

        {/* Prev/Next Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10">
          {prev ? (
            <Link
              href={`/bible-names/${prev.slug}`}
              className="flex-1 bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-primary-dark/60">Previous</span>
              <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                {prev.name}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/bible-names/${next.slug}`}
              className="flex-1 text-right bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-primary-dark/60">Next</span>
              <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                {next.name}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>

        {/* More Names Starting With Same Letter */}
        {sameLetterNames.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-scripture mb-4">
              More Names Starting with &ldquo;{entry.firstLetter}&rdquo;
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {sameLetterNames.map(n => (
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
          </section>
        )}

        {/* FAQ Section */}
        <section className="bg-white border border-grace rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-scripture mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-scripture mb-1">
                What does {entry.name} mean in the Bible?
              </h3>
              <p className="text-primary-dark/80 text-sm leading-relaxed">
                The biblical name {entry.name} means &ldquo;{entry.meaning}&rdquo;.
                {hebrewEtymology && (
                  <> In Hebrew, it is written as {hebrewEtymology.hebrew}
                  {hebrewEtymology.hebrewTranslit && <> ({hebrewEtymology.hebrewTranslit})</>}
                  {hebrewEtymology.hebrewMeaning && <>, meaning &ldquo;{hebrewEtymology.hebrewMeaning}&rdquo;</>}.</>
                )}
                {' '}This name comes from Hitchcock&apos;s Bible Names Dictionary and reflects the deep significance that names held in biblical culture.
              </p>
            </div>
            <div className="border-t border-grace/50 pt-4">
              <h3 className="font-semibold text-scripture mb-1">
                Who was {entry.name} in the Bible?
              </h3>
              <p className="text-primary-dark/80 text-sm leading-relaxed">
                {matchingPeople.length > 0
                  ? <>{entry.name} appears in the Bible as {matchingPeople.map((p, i) => (
                      <span key={p.slug}>
                        {i > 0 && (i === matchingPeople.length - 1 ? ' and ' : ', ')}
                        {p.uniqueAttribute || 'a biblical figure'}
                      </span>
                    ))}. The name means &ldquo;{entry.meaning}&rdquo;.</>
                  : biography?.summary
                    ? <>{biography.summary} The name {entry.name} means &ldquo;{entry.meaning}&rdquo;.</>
                    : <>{entry.name} is a biblical name meaning &ldquo;{entry.meaning}&rdquo;. Names in the Bible often reflected a person&apos;s character, destiny, or the circumstances of their birth.</>
                }
              </p>
            </div>
          </div>
        </section>

        {/* Contextual Internal Links */}
        <section className="bg-grace/10 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/bible-names" className="text-blue-600 hover:underline text-sm">
              All Bible Names &amp; Meanings
            </Link>
            <Link href="/people" className="text-blue-600 hover:underline text-sm">
              Bible Characters Directory
            </Link>
            <Link href={`/bible-names#${entry.firstLetter.toLowerCase()}`} className="text-blue-600 hover:underline text-sm">
              Names Starting with {entry.firstLetter}
            </Link>
            <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">
              Bible Quizzes
            </Link>
            <Link href="/topics" className="text-blue-600 hover:underline text-sm">
              Bible Topics
            </Link>
            <Link href="/lexicon" className="text-blue-600 hover:underline text-sm">
              Hebrew &amp; Greek Word Study
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
