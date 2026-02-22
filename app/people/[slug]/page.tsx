import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllPeople,
  getPersonBySlug,
  getPersonById,
} from '@/lib/people-data';
import { getBibleNameBySlug } from '@/lib/bible-names-data';
import { StructuredData } from '@/components/StructuredData';
import { findBiography } from '@/lib/biographies-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // 3K+ pages — generated on-demand via ISR, not at build time
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) return {};

  const desc = person.uniqueAttribute
    ? `${person.name} — ${person.uniqueAttribute}. `
    : `${person.name} in the Bible. `;

  return {
    title: `${person.name} in the Bible | Character Profile, Family Tree & Hebrew Name${person.tribe ? ` | Tribe of ${person.tribe}` : ''} | Complete Scripture Reference Guide | Bible Maximum`,
    description: `${desc}Discover ${person.name}'s family relationships, Hebrew and Greek names, tribal affiliation, and scripture references in this comprehensive Bible character profile.`,
    keywords: [
      `${person.name} Bible`, `${person.name} biblical character`,
      `who is ${person.name} in the Bible`, `${person.name} family tree`,
      'Bible characters', 'biblical people',
      ...(person.tribe ? [`tribe of ${person.tribe}`] : []),
    ],
    openGraph: {
      title: `${person.name} — Bible Character Profile`,
      description: desc,
      url: `/people/${person.slug}`,
      type: 'article',
    },
    alternates: { canonical: `/people/${person.slug}` },
  };
}

// Build a simple slug for name lookup
function nameSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default async function PersonPage({ params }: PageProps) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) notFound();

  const biography = findBiography(person.name);

  const allPeople = getAllPeople();
  const currentIndex = allPeople.findIndex(p => p.slug === person.slug);
  const prev = currentIndex > 0 ? allPeople[currentIndex - 1] : null;
  const next = currentIndex < allPeople.length - 1 ? allPeople[currentIndex + 1] : null;

  // Group relationships by type
  const relsByType: Record<string, typeof person.relationships> = {};
  for (const rel of person.relationships) {
    const type = rel.relationshipType || 'Other';
    if (!relsByType[type]) relsByType[type] = [];
    relsByType[type].push(rel);
  }

  // Cross-link to bible-names for name meaning
  const nameMeaning = getBibleNameBySlug(nameSlug(person.name));

  // Get first label's reference for scripture cross-link
  const firstRef = person.labels.find(l => l.reference)?.reference || '';
  const refMatch = firstRef.match(/^([A-Z0-9]+)\s+(\d+):?(\d+)?/);

  // Collect unique scripture references from labels
  const scriptureRefs = person.labels
    .filter(l => l.reference)
    .map(l => l.reference)
    .filter((ref, i, arr) => arr.indexOf(ref) === i)
    .slice(0, 5);

  // Count total verse mentions
  const totalRefs = person.labels.filter(l => l.reference).length + person.relationships.filter(r => r.reference).length;

  // Schema markup
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    description: person.uniqueAttribute || `${person.name} in the Bible`,
    url: `https://biblemaximum.com/people/${person.slug}`,
    ...(person.sex ? { gender: person.sex } : {}),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bible People', item: 'https://biblemaximum.com/people' },
      { '@type': 'ListItem', position: 3, name: person.name },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Who is ${person.name} in the Bible?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: biography
            ? `${biography.summary} ${biography.significance}`
            : person.uniqueAttribute
              ? `${person.name} is described in the Bible as ${person.uniqueAttribute}.${person.tribe ? ` ${person.name} belonged to the tribe of ${person.tribe}.` : ''}`
              : `${person.name} is a person mentioned in the Bible.${person.tribe ? ` ${person.name} belonged to the tribe of ${person.tribe}.` : ''}`,
        },
      },
      ...(nameMeaning ? [{
        '@type': 'Question',
        name: `What does the name ${person.name} mean?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The name ${person.name} means "${nameMeaning.meaning}" according to Hitchcock's Bible Names Dictionary.`,
        },
      }] : []),
    ],
  };

  return (
    <>
      <StructuredData data={personSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/people" className="hover:text-blue-600">Bible People</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">{person.name}</span>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {person.sex && (
              <span className={`w-10 h-10 flex items-center justify-center rounded-lg text-white font-bold text-lg ${
                person.sex === 'male' ? 'bg-blue-600' : 'bg-pink-600'
              }`}>
                {person.name.charAt(0)}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-display font-bold text-scripture">
              {person.name}
              {person.nameInstance > 1 && (
                <span className="text-lg text-primary-dark/40 ml-2">({person.nameInstance})</span>
              )}
            </h1>
          </div>
          {person.uniqueAttribute && (
            <p className="text-lg text-primary-dark/70 mt-2">{person.uniqueAttribute}</p>
          )}
          {nameMeaning && (
            <p className="text-sm text-primary-dark/60 mt-1">
              Name meaning: <Link href={`/bible-names/${nameMeaning.slug}`} className="text-blue-600 hover:underline">&ldquo;{nameMeaning.meaning}&rdquo;</Link>
            </p>
          )}
        </div>

        {/* Profile Summary — streamlined, no duplication */}
        <div className="bg-white border border-grace rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-scripture mb-4">Profile</h2>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {person.sex && (
              <div>
                <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">Gender</dt>
                <dd className="text-scripture capitalize">{person.sex}</dd>
              </div>
            )}
            {person.tribe && (
              <div>
                <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">Tribe</dt>
                <dd className="text-scripture">{person.tribe}</dd>
              </div>
            )}
            {person.surname && (
              <div>
                <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">Surname</dt>
                <dd className="text-scripture">{person.surname}</dd>
              </div>
            )}
            {totalRefs > 0 && (
              <div>
                <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">Scripture References</dt>
                <dd className="text-scripture">{totalRefs} reference{totalRefs !== 1 ? 's' : ''}</dd>
              </div>
            )}
            {person.labels.length > 0 && (
              <div>
                <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">Known Names</dt>
                <dd className="text-scripture">{person.labels.length} name{person.labels.length !== 1 ? 's' : ''}</dd>
              </div>
            )}
            {person.relationships.length > 0 && (
              <div>
                <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">Relationships</dt>
                <dd className="text-scripture">{person.relationships.length} connection{person.relationships.length !== 1 ? 's' : ''}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Biography */}
        {biography && (
          <div className="bg-white border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-4">Biography</h2>
            <p className="text-primary-dark/80 leading-relaxed mb-4">{biography.summary}</p>

            {biography.significance && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-primary-dark/60 uppercase tracking-wider mb-2">Significance</h3>
                <p className="text-primary-dark/80 leading-relaxed">{biography.significance}</p>
              </div>
            )}

            {biography.keyEvents.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-primary-dark/60 uppercase tracking-wider mb-3">Key Events</h3>
                <div className="space-y-2">
                  {biography.keyEvents.map((evt, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-400 mt-1.5" />
                      <div>
                        <span className="text-primary-dark/80">{evt.event}</span>
                        <span className="text-primary-dark/50 ml-2">({evt.verse})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hebrew/Greek Names (Labels) */}
        {person.labels.length > 0 && (
          <div className="bg-white border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-4">
              Names &amp; Labels ({person.labels.length})
            </h2>
            <div className="space-y-4">
              {person.labels.map((label, i) => (
                <div key={i} className="border-b border-grace/50 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-scripture">{label.labelName}</span>
                    {label.labelType && (
                      <span className="text-xs px-2 py-0.5 bg-grace/20 text-primary-dark/70 rounded">
                        {label.labelType}
                      </span>
                    )}
                    {label.givenByGod && (
                      <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded">
                        Given by God
                      </span>
                    )}
                  </div>
                  <dl className="grid gap-2 text-sm sm:grid-cols-2">
                    {label.meaningHe && (
                      <div>
                        <dt className="text-xs text-primary-dark/60">Hebrew</dt>
                        <dd className="text-scripture font-medium" dir="rtl">{label.meaningHe}</dd>
                      </div>
                    )}
                    {label.hebrewTransliterated && (
                      <div>
                        <dt className="text-xs text-primary-dark/60">Transliteration</dt>
                        <dd className="text-scripture italic">{label.hebrewTransliterated}</dd>
                      </div>
                    )}
                    {label.meaningEn && (
                      <div>
                        <dt className="text-xs text-primary-dark/60">Meaning</dt>
                        <dd className="text-scripture">{label.meaningEn}</dd>
                      </div>
                    )}
                    {label.greekLabel && (
                      <div>
                        <dt className="text-xs text-primary-dark/60">Greek</dt>
                        <dd className="text-scripture">{label.greekLabel}</dd>
                      </div>
                    )}
                    {label.reference && (
                      <div>
                        <dt className="text-xs text-primary-dark/60">Reference</dt>
                        <dd className="text-primary-dark/80">{label.reference}</dd>
                      </div>
                    )}
                    {label.hebrewStrongsNumber && (
                      <div>
                        <dt className="text-xs text-primary-dark/60">Strong&apos;s</dt>
                        <dd>
                          <Link
                            href={`/lexicon/${label.hebrewStrongsNumber}`}
                            className="text-blue-600 hover:underline"
                          >
                            {label.hebrewStrongsNumber}
                          </Link>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Relationships */}
        {person.relationships.length > 0 && (
          <div className="bg-white border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-4">
              Family &amp; Relationships ({person.relationships.length})
            </h2>
            {Object.entries(relsByType).map(([type, rels]) => (
              <div key={type} className="mb-4 last:mb-0">
                <h3 className="text-sm font-semibold text-primary-dark/80 mb-2 capitalize">{type}</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {rels.map((rel, i) => {
                    const otherPerson = getPersonById(rel.otherPersonId);
                    return (
                      <div key={i} className="flex items-center gap-2 bg-primary-light/30 rounded-lg px-3 py-2">
                        {otherPerson ? (
                          <Link
                            href={`/people/${otherPerson.slug}`}
                            className="font-medium text-blue-600 hover:underline"
                          >
                            {rel.otherPersonName}
                          </Link>
                        ) : (
                          <span className="font-medium text-scripture">{rel.otherPersonName}</span>
                        )}
                        {rel.reference && (
                          <span className="text-xs text-primary-dark/60">({rel.reference})</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notes */}
        {person.notes && (
          <div className="bg-primary-light/30 border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-3">Notes</h2>
            <p className="text-primary-dark/80 leading-relaxed whitespace-pre-line">{person.notes}</p>
          </div>
        )}

        {/* Prev/Next Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10">
          {prev ? (
            <Link
              href={`/people/${prev.slug}`}
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
              href={`/people/${next.slug}`}
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

        {/* FAQ Section */}
        <section className="bg-white border border-grace rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-scripture mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-scripture mb-1">
                Who is {person.name} in the Bible?
              </h3>
              <p className="text-primary-dark/80 text-sm leading-relaxed">
                {person.uniqueAttribute
                  ? <>{person.name} is described in the Bible as {person.uniqueAttribute}.{person.tribe ? ` ${person.name} belonged to the tribe of ${person.tribe}.` : ''}</>
                  : <>{person.name} is a person mentioned in the Bible.{person.tribe ? ` ${person.name} belonged to the tribe of ${person.tribe}.` : ''}</>
                }
              </p>
            </div>
            {nameMeaning && (
              <div className="border-t border-grace/50 pt-4">
                <h3 className="font-semibold text-scripture mb-1">
                  What does the name {person.name} mean?
                </h3>
                <p className="text-primary-dark/80 text-sm leading-relaxed">
                  The name {person.name} means &ldquo;{nameMeaning.meaning}&rdquo; according to Hitchcock&apos;s Bible Names Dictionary.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Contextual Internal Links */}
        <section className="bg-grace/10 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {nameMeaning && (
              <Link href={`/bible-names/${nameMeaning.slug}`} className="text-blue-600 hover:underline text-sm">
                Meaning of &ldquo;{person.name}&rdquo;
              </Link>
            )}
            <Link href="/people" className="text-blue-600 hover:underline text-sm">
              All Bible Characters
            </Link>
            <Link href="/bible-names" className="text-blue-600 hover:underline text-sm">
              Bible Name Meanings
            </Link>
            <Link href="/timeline" className="text-blue-600 hover:underline text-sm">
              Bible Timeline
            </Link>
            <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">
              Bible Quizzes
            </Link>
            <Link href="/topics" className="text-blue-600 hover:underline text-sm">
              Bible Topics
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
