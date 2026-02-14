import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllPeople,
  getPersonBySlug,
  getPersonById,
} from '@/lib/people-data';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPeople().map(p => ({ slug: p.slug }));
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

export default async function PersonPage({ params }: PageProps) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) notFound();

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    description: person.uniqueAttribute || `${person.name} in the Bible`,
    url: `https://biblemaximum.com/people/${person.slug}`,
    ...(person.sex ? { gender: person.sex } : {}),
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 pt-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/people" className="hover:text-blue-600">Bible People</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900 font-medium">{person.name}</span>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {person.sex && (
              <span className={`w-10 h-10 flex items-center justify-center rounded-lg text-white font-bold text-lg ${
                person.sex === 'male' ? 'bg-blue-600' : 'bg-pink-600'
              }`}>
                {person.sex === 'male' ? 'M' : 'F'}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {person.name}
              {person.nameInstance > 1 && (
                <span className="text-lg text-gray-400 ml-2">({person.nameInstance})</span>
              )}
            </h1>
          </div>
          {person.uniqueAttribute && (
            <p className="text-lg text-gray-600 mt-2">{person.uniqueAttribute}</p>
          )}
        </div>

        {/* Details Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Profile</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Name</dt>
              <dd className="text-lg font-semibold text-gray-900">{person.name}</dd>
            </div>
            {person.surname && (
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Surname</dt>
                <dd className="text-gray-900">{person.surname}</dd>
              </div>
            )}
            {person.sex && (
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Gender</dt>
                <dd className="text-gray-900 capitalize">{person.sex}</dd>
              </div>
            )}
            {person.tribe && (
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Tribe</dt>
                <dd className="text-gray-900">{person.tribe}</dd>
              </div>
            )}
            {person.uniqueAttribute && (
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Description</dt>
                <dd className="text-gray-900">{person.uniqueAttribute}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Hebrew/Greek Names (Labels) */}
        {person.labels.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Names &amp; Labels ({person.labels.length})
            </h2>
            <div className="space-y-4">
              {person.labels.map((label, i) => (
                <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">{label.labelName}</span>
                    {label.labelType && (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
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
                        <dt className="text-xs text-gray-500">Hebrew</dt>
                        <dd className="text-gray-900 font-medium" dir="rtl">{label.meaningHe}</dd>
                      </div>
                    )}
                    {label.hebrewTransliterated && (
                      <div>
                        <dt className="text-xs text-gray-500">Transliteration</dt>
                        <dd className="text-gray-900 italic">{label.hebrewTransliterated}</dd>
                      </div>
                    )}
                    {label.meaningEn && (
                      <div>
                        <dt className="text-xs text-gray-500">Meaning</dt>
                        <dd className="text-gray-900">{label.meaningEn}</dd>
                      </div>
                    )}
                    {label.greekLabel && (
                      <div>
                        <dt className="text-xs text-gray-500">Greek</dt>
                        <dd className="text-gray-900">{label.greekLabel}</dd>
                      </div>
                    )}
                    {label.reference && (
                      <div>
                        <dt className="text-xs text-gray-500">Reference</dt>
                        <dd className="text-gray-700">{label.reference}</dd>
                      </div>
                    )}
                    {label.hebrewStrongsNumber && (
                      <div>
                        <dt className="text-xs text-gray-500">Strong&apos;s</dt>
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
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Family &amp; Relationships ({person.relationships.length})
            </h2>
            {Object.entries(relsByType).map(([type, rels]) => (
              <div key={type} className="mb-4 last:mb-0">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 capitalize">{type}</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {rels.map((rel, i) => {
                    const otherPerson = getPersonById(rel.otherPersonId);
                    return (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        {otherPerson ? (
                          <Link
                            href={`/people/${otherPerson.slug}`}
                            className="font-medium text-blue-600 hover:underline"
                          >
                            {rel.otherPersonName}
                          </Link>
                        ) : (
                          <span className="font-medium text-gray-900">{rel.otherPersonName}</span>
                        )}
                        {rel.reference && (
                          <span className="text-xs text-gray-500">({rel.reference})</span>
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
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Notes</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{person.notes}</p>
          </div>
        )}

        {/* Prev/Next Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10">
          {prev ? (
            <Link
              href={`/people/${prev.slug}`}
              className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-gray-500">Previous</span>
              <span className="block font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {prev.name}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/people/${next.slug}`}
              className="flex-1 text-right bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-gray-500">Next</span>
              <span className="block font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {next.name}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>

        {/* Internal Links Section */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/people" className="text-blue-600 hover:underline text-sm">
              All Bible People
            </Link>
            <Link href="/bible-names" className="text-blue-600 hover:underline text-sm">
              Bible Name Meanings
            </Link>
            <Link href="/bible-stories" className="text-blue-600 hover:underline text-sm">
              Bible Stories for Children
            </Link>
            <Link href="/timeline" className="text-blue-600 hover:underline text-sm">
              Bible Timeline
            </Link>
            <Link href="/commandments" className="text-blue-600 hover:underline text-sm">
              613 Commandments
            </Link>
            <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">
              Bible Quizzes
            </Link>
            <Link href="/topics" className="text-blue-600 hover:underline text-sm">
              Bible Topics
            </Link>
            <Link href="/bible-book-names" className="text-blue-600 hover:underline text-sm">
              Bible Book Names &amp; Origins
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
