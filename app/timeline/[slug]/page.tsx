import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllEpochs, getEpochBySlug, getEpochsByType, getKjvStudyTimeline } from '@/lib/timeline-data';
import { getPersonBySlug } from '@/lib/people-data';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Convert AH (Anno Hominis) to approximate BC
// AH year 1 ≈ 4004 BC (Ussher chronology)
function ahToBC(ahYear: number): string {
  const bc = 4004 - ahYear;
  if (bc > 0) return `~${bc} BC`;
  if (bc === 0) return '~1 AD';
  return `~${Math.abs(bc)} AD`;
}

// Build a slug from personId like "Adam_1" -> "adam"
function personIdToSlug(personId: string): string {
  return personId
    .replace(/_\d+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Format personId for display: "Adam_1" -> "Adam"
function personIdToName(personId: string): string {
  return personId.replace(/_\d+$/, '').replace(/_/g, ' ');
}

export async function generateStaticParams() {
  return getAllEpochs().map(e => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const epoch = getEpochBySlug(slug);
  if (!epoch) return {};

  const yearStr = epoch.startYear !== null
    ? `${ahToBC(epoch.startYear)}${epoch.endYear ? ` to ${ahToBC(epoch.endYear)}` : ''}`
    : '';

  return {
    title: `${epoch.name} | Bible Timeline — ${epoch.type}${yearStr ? ` (${yearStr})` : ''} | Key Events, Scripture References & Historical Context | Bible Maximum`,
    description: `${epoch.description || epoch.name} — ${epoch.type} in the Bible timeline.${yearStr ? ` Period: ${yearStr}.` : ''} Explore the chronological context and scripture references.`,
    keywords: [
      epoch.name, 'Bible timeline', 'biblical chronology', epoch.type,
      'Bible history', 'biblical events', 'Old Testament timeline',
    ],
    openGraph: {
      title: `${epoch.name} — Bible Timeline`,
      description: epoch.description || `${epoch.name} in biblical history`,
      url: `/timeline/${epoch.slug}`,
      type: 'article',
    },
    alternates: { canonical: `/timeline/${epoch.slug}` },
  };
}

export default async function EpochPage({ params }: PageProps) {
  const { slug } = await params;
  const epoch = getEpochBySlug(slug);
  if (!epoch) notFound();

  const allEpochs = getAllEpochs();
  const currentIndex = allEpochs.findIndex(e => e.slug === epoch.slug);
  const prev = currentIndex > 0 ? allEpochs[currentIndex - 1] : null;
  const next = currentIndex < allEpochs.length - 1 ? allEpochs[currentIndex + 1] : null;

  const relatedEpochs = getEpochsByType(epoch.type)
    .filter(e => e.slug !== epoch.slug)
    .slice(0, 6);

  // Try to resolve person link
  const personSlug = epoch.personId ? personIdToSlug(epoch.personId) : null;
  const linkedPerson = personSlug ? getPersonBySlug(personSlug) : null;
  const personDisplayName = epoch.personId ? personIdToName(epoch.personId) : null;

  // Find matching KJV Study timeline events by keyword matching
  const kjvstudyTimeline = getKjvStudyTimeline();
  const epochName = epoch.name.toLowerCase();
  const matchingEvents = kjvstudyTimeline.eras.flatMap(era =>
    era.events.filter(e => {
      const titleLower = e.title.toLowerCase();
      const keywords = epochName.split(/\s+/).filter(w => w.length > 3);
      return keywords.some(kw => titleLower.includes(kw));
    })
  ).slice(0, 5);

  // Schema markup
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: epoch.name,
    description: epoch.description || epoch.name,
    url: `https://biblemaximum.com/timeline/${epoch.slug}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Timeline', item: 'https://biblemaximum.com/timeline' },
      { '@type': 'ListItem', position: 3, name: epoch.name },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `When did ${epoch.name} occur in Bible history?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: epoch.startYear !== null
            ? `${epoch.name} occurred approximately ${ahToBC(epoch.startYear)}${epoch.endYear !== null ? ` to ${ahToBC(epoch.endYear)}` : ''} (${epoch.startYear}${epoch.endYear !== null ? `-${epoch.endYear}` : ''} AH, Anno Hominis — years from Creation).${epoch.periodLength !== null ? ` This period lasted ${epoch.periodLength} years.` : ''}`
            : `${epoch.name} is an event in Bible history. The exact dates are not specified.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What does "AH" mean in Bible chronology?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AH stands for "Anno Hominis" (Year of Man), a chronological system that counts years from Creation. Under the Ussher chronology, Year 1 AH corresponds to approximately 4004 BC.',
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={eventSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/timeline" className="hover:text-blue-600">Timeline</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">{epoch.name}</span>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-3">
            {epoch.type}
          </span>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-scripture mb-2">
            {epoch.name}
          </h1>
          <p className="text-primary-dark/70 mb-3">
            {epoch.description
              ? epoch.description.substring(0, 160).replace(/\n/g, ' ') + (epoch.description.length > 160 ? '...' : '')
              : `${epoch.name} is a period in the Bible timeline`}
            {epoch.periodLength !== null ? `, spanning ${epoch.periodLength} years` : ''}
            {epoch.personId ? ` associated with ${epoch.personId.replace(/_\d+$/, '').replace(/_/g, ' ')}` : ''}.
          </p>
          {epoch.startYear !== null && (
            <div className="text-lg text-primary-dark/70">
              <span>{ahToBC(epoch.startYear)}</span>
              {epoch.endYear !== null && <span> — {ahToBC(epoch.endYear)}</span>}
              {epoch.periodLength !== null && <span className="text-primary-dark/40"> ({epoch.periodLength} years)</span>}
              <span className="block text-sm text-primary-dark/40 mt-1">
                {epoch.startYear} AH{epoch.endYear !== null && `–${epoch.endYear} AH`}
                {' '}(Anno Hominis — years from Creation)
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        {epoch.description && (
          <div className="bg-white border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-3">Description</h2>
            <p className="text-primary-dark/80 leading-relaxed whitespace-pre-line">{epoch.description}</p>
          </div>
        )}

        {/* Details */}
        <div className="bg-white border border-grace rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-scripture mb-4">Details</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">Type</dt>
              <dd className="text-scripture">{epoch.type}</dd>
            </div>
            {personDisplayName && (
              <div>
                <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">Person</dt>
                <dd>
                  {linkedPerson ? (
                    <Link href={`/people/${linkedPerson.slug}`} className="text-blue-600 hover:underline font-medium">
                      {personDisplayName}
                    </Link>
                  ) : (
                    <span className="text-scripture">{personDisplayName}</span>
                  )}
                </dd>
              </div>
            )}
            {epoch.startYear !== null && (
              <div>
                <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">Start</dt>
                <dd className="text-scripture">
                  <span className="font-medium">{ahToBC(epoch.startYear)}</span>
                  <span className="text-primary-dark/40 text-sm ml-1">({epoch.startYear} AH)</span>
                </dd>
              </div>
            )}
            {epoch.endYear !== null && (
              <div>
                <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">End</dt>
                <dd className="text-scripture">
                  <span className="font-medium">{ahToBC(epoch.endYear)}</span>
                  <span className="text-primary-dark/40 text-sm ml-1">({epoch.endYear} AH)</span>
                </dd>
              </div>
            )}
            {epoch.periodLength !== null && (
              <div>
                <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">Duration</dt>
                <dd className="text-scripture">{epoch.periodLength} years</dd>
              </div>
            )}
            {epoch.startReference && (
              <div>
                <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">Start Reference</dt>
                <dd className="text-primary-dark/80">{epoch.startReference}</dd>
              </div>
            )}
            {epoch.endReference && (
              <div>
                <dt className="text-xs font-medium text-primary-dark/60 uppercase tracking-wider mb-1">End Reference</dt>
                <dd className="text-primary-dark/80">{epoch.endReference}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Notes */}
        {epoch.notes && (
          <div className="bg-primary-light/30 border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-3">Notes</h2>
            <p className="text-primary-dark/80 leading-relaxed whitespace-pre-line">{epoch.notes}</p>
          </div>
        )}

        {/* Historical Dating from KJV Study */}
        {matchingEvents.length > 0 && (
          <section className="mt-8 bg-white border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-4">Historical Dating</h2>
            <div className="space-y-4">
              {matchingEvents.map((evt, i) => (
                <div key={i} className="border-b border-grace/50 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-semibold text-scripture">{evt.title}</h3>
                    <span className="text-sm text-primary-dark/60">{evt.date}</span>
                  </div>
                  <p className="text-sm text-primary-dark/70 mt-1">{evt.description.replace(/<[^>]*>/g, '').slice(0, 200)}{evt.description.length > 200 ? '...' : ''}</p>
                  {evt.sidenote && (
                    <p className="text-xs text-primary-dark/50 mt-1 italic">{evt.sidenote.slice(0, 150)}{evt.sidenote.length > 150 ? '...' : ''}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10">
          {prev ? (
            <Link
              href={`/timeline/${prev.slug}`}
              className="flex-1 bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-primary-dark/60">Previous</span>
              <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                {prev.name}
              </span>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link
              href={`/timeline/${next.slug}`}
              className="flex-1 text-right bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-primary-dark/60">Next</span>
              <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                {next.name}
              </span>
            </Link>
          ) : <div className="flex-1" />}
        </div>

        {/* Related Epochs */}
        {relatedEpochs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-scripture mb-4">
              Related {epoch.type} Epochs
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {relatedEpochs.map(e => (
                <Link
                  key={e.id}
                  href={`/timeline/${e.slug}`}
                  className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <span className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                    {e.name}
                  </span>
                  {e.startYear !== null && (
                    <span className="block text-xs text-primary-dark/60 mt-0.5">
                      {ahToBC(e.startYear)}{e.periodLength ? ` (${e.periodLength} years)` : ''}
                    </span>
                  )}
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
                When did {epoch.name} occur in Bible history?
              </h3>
              <p className="text-primary-dark/80 text-sm leading-relaxed">
                {epoch.startYear !== null
                  ? <>{epoch.name} occurred approximately {ahToBC(epoch.startYear)}{epoch.endYear !== null && <> to {ahToBC(epoch.endYear)}</>}. This is {epoch.startYear}{epoch.endYear !== null && <>–{epoch.endYear}</>} AH (Anno Hominis — years from Creation using the Ussher chronology, where Year 1 = ~4004 BC).{epoch.periodLength !== null && <> This period lasted {epoch.periodLength} years.</>}</>
                  : <>{epoch.name} is an event in Bible history. The exact dates are not specified.</>
                }
              </p>
            </div>
            <div className="border-t border-grace/50 pt-4">
              <h3 className="font-semibold text-scripture mb-1">
                What does &ldquo;AH&rdquo; mean in Bible chronology?
              </h3>
              <p className="text-primary-dark/80 text-sm leading-relaxed">
                AH stands for &ldquo;Anno Hominis&rdquo; (Year of Man), a chronological system that counts years from Creation. Under the Ussher chronology, Year 1 AH corresponds to approximately 4004 BC.
              </p>
            </div>
          </div>
        </section>

        {/* Contextual Internal Links */}
        <section className="bg-grace/10 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {linkedPerson && (
              <Link href={`/people/${linkedPerson.slug}`} className="text-blue-600 hover:underline text-sm">
                {personDisplayName} — Character Profile
              </Link>
            )}
            <Link href="/timeline" className="text-blue-600 hover:underline text-sm">
              Full Bible Timeline
            </Link>
            <Link href="/people" className="text-blue-600 hover:underline text-sm">
              Bible Characters Directory
            </Link>
            <Link href="/bible-stories" className="text-blue-600 hover:underline text-sm">
              Bible Stories
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
