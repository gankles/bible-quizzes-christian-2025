import { Metadata } from 'next';
import Link from 'next/link';
import { getAllEpochs, getTimelineStats, getEpochTypes, getEpochsByType } from '@/lib/timeline-data';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Bible Timeline | Complete Chronology of Biblical Events, People & Eras',
  description: 'Explore the complete Bible timeline from Creation to the New Testament. Browse biblical epochs, lifespans, reigns, and key events with scripture references and chronological data.',
  keywords: [
    'Bible timeline', 'biblical chronology', 'Bible history timeline',
    'Old Testament timeline', 'biblical events chronology', 'Bible dates',
    'when did Bible events happen', 'biblical timeline chart', 'Bible epoch',
    'Creation to Christ timeline', 'Bible genealogy timeline',
  ],
  openGraph: {
    title: 'Bible Timeline — Complete Biblical Chronology',
    description: 'Explore the complete chronology of biblical events from Creation to the New Testament.',
    url: '/timeline',
    type: 'website',
  },
  alternates: { canonical: '/timeline' },
};

export default function TimelinePage() {
  const stats = getTimelineStats();
  const types = getEpochTypes();
  const allEpochs = getAllEpochs();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Timeline',
    description: metadata.description,
    url: 'https://biblemaximum.com/timeline',
    numberOfItems: stats.total,
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">Bible Timeline</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="rounded-2xl overflow-hidden bg-white border-b border-grace">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold font-display text-scripture mb-3">Bible Timeline</h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mb-6">
              A chronological journey through the Bible — from Creation through the patriarchs,
              judges, kings, and prophets. Explore the lifespans, reigns, and pivotal events of
              biblical history.
            </p>
            <div className="flex flex-wrap gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.total}</p>
                <p className="text-xs text-primary-dark/40 uppercase tracking-wider">Epochs</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.types}</p>
                <p className="text-xs text-primary-dark/40 uppercase tracking-wider">Types</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Epoch Types Filter */}
      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="flex flex-wrap gap-2">
          {types.map(type => {
            const count = getEpochsByType(type).length;
            return (
              <a
                key={type}
                href={`#type-${type.toLowerCase()}`}
                className="px-3 py-1.5 bg-white border border-grace rounded-lg text-sm text-primary-dark/80 hover:bg-primary-light hover:border-blue-300 transition-colors"
              >
                {type} ({count})
              </a>
            );
          })}
        </div>
      </section>

      {/* Timeline List */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        {types.map(type => {
          const epochs = getEpochsByType(type);
          return (
            <div key={type} id={`type-${type.toLowerCase()}`} className="mb-10">
              <h2 className="text-xl font-bold text-scripture mb-4">
                {type} ({epochs.length})
              </h2>
              <div className="space-y-2">
                {epochs.map(epoch => (
                  <Link
                    key={epoch.id}
                    href={`/timeline/${epoch.slug}`}
                    className="block bg-white border border-grace rounded-lg px-5 py-4 hover:shadow-md hover:border-blue-300 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                          {epoch.name}
                        </h3>
                        {epoch.description && (
                          <p className="text-sm text-primary-dark/60 mt-1 line-clamp-2">
                            {epoch.description}
                          </p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        {epoch.startYear !== null && (
                          <span className="text-sm font-mono text-primary-dark/70">
                            {epoch.startYear} AH
                            {epoch.endYear !== null && ` — ${epoch.endYear} AH`}
                          </span>
                        )}
                        {epoch.periodLength !== null && (
                          <span className="block text-xs text-primary-dark/40">
                            {epoch.periodLength} years
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Related */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-scripture mb-2">Explore More</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/people" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Bible People
            </Link>
            <Link href="/bible-names" className="px-5 py-2.5 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-primary-light transition-colors">
              Bible Names
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
