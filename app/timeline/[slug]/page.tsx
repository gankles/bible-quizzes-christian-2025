import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllEpochs, getEpochBySlug, getEpochsByType } from '@/lib/timeline-data';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllEpochs().map(e => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const epoch = getEpochBySlug(slug);
  if (!epoch) return {};

  const yearStr = epoch.startYear !== null
    ? `${epoch.startYear}${epoch.endYear ? `–${epoch.endYear}` : ''} AH`
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: epoch.name,
    description: epoch.description || epoch.name,
    url: `https://biblemaximum.com/timeline/${epoch.slug}`,
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 pt-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/timeline" className="hover:text-blue-600">Timeline</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900 font-medium">{epoch.name}</span>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-3">
            {epoch.type}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {epoch.name}
          </h1>
          {epoch.startYear !== null && (
            <p className="text-lg text-gray-600">
              {epoch.startYear} AH
              {epoch.endYear !== null && ` — ${epoch.endYear} AH`}
              {epoch.periodLength !== null && ` (${epoch.periodLength} years)`}
            </p>
          )}
        </div>

        {/* Description */}
        {epoch.description && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{epoch.description}</p>
          </div>
        )}

        {/* Details */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Details</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Type</dt>
              <dd className="text-gray-900">{epoch.type}</dd>
            </div>
            {epoch.personId && (
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Person</dt>
                <dd className="text-gray-900">{epoch.personId.replace(/_\d+$/, '')}</dd>
              </div>
            )}
            {epoch.startYear !== null && (
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Start Year</dt>
                <dd className="text-gray-900 font-mono">{epoch.startYear} AH</dd>
              </div>
            )}
            {epoch.endYear !== null && (
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">End Year</dt>
                <dd className="text-gray-900 font-mono">{epoch.endYear} AH</dd>
              </div>
            )}
            {epoch.periodLength !== null && (
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Duration</dt>
                <dd className="text-gray-900">{epoch.periodLength} years</dd>
              </div>
            )}
            {epoch.startReference && (
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Start Reference</dt>
                <dd className="text-gray-700">{epoch.startReference}</dd>
              </div>
            )}
            {epoch.endReference && (
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">End Reference</dt>
                <dd className="text-gray-700">{epoch.endReference}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Notes */}
        {epoch.notes && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Notes</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{epoch.notes}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10">
          {prev ? (
            <Link
              href={`/timeline/${prev.slug}`}
              className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-gray-500">Previous</span>
              <span className="block font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {prev.name}
              </span>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link
              href={`/timeline/${next.slug}`}
              className="flex-1 text-right bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-gray-500">Next</span>
              <span className="block font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {next.name}
              </span>
            </Link>
          ) : <div className="flex-1" />}
        </div>

        {/* Related Epochs */}
        {relatedEpochs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Related {epoch.type} Epochs
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {relatedEpochs.map(e => (
                <Link
                  key={e.id}
                  href={`/timeline/${e.slug}`}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {e.name}
                  </span>
                  {e.startYear !== null && (
                    <span className="block text-xs text-gray-500 mt-0.5">
                      {e.startYear} AH{e.periodLength ? ` (${e.periodLength} years)` : ''}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Internal Links Section */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/timeline" className="text-blue-600 hover:underline text-sm">
              Full Bible Timeline
            </Link>
            <Link href="/people" className="text-blue-600 hover:underline text-sm">
              Bible People Directory
            </Link>
            <Link href="/bible-names" className="text-blue-600 hover:underline text-sm">
              Bible Name Meanings
            </Link>
            <Link href="/bible-stories" className="text-blue-600 hover:underline text-sm">
              Bible Stories for Children
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
