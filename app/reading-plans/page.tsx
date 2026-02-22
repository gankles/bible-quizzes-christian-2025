import { Metadata } from 'next';
import Link from 'next/link';
import { getAllReadingPlans, getReadingPlansStats } from '@/lib/reading-plans-data';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Bible Reading Plans | 12 Structured Plans | Bible Maximum',
  description:
    'Choose from 12 structured Bible reading plans covering the full Bible, Old Testament, and New Testament. Plans range from 14 days to a full year with daily themes and scripture assignments.',
  keywords: [
    'Bible reading plan', 'daily Bible reading', 'one year Bible plan',
    'chronological Bible reading', 'New Testament reading plan',
    'Old Testament reading plan', 'Bible study schedule',
  ],
  openGraph: {
    title: 'Bible Reading Plans -- 12 Structured Plans',
    description: 'Choose from 12 structured Bible reading plans with daily themes and scripture assignments.',
    url: '/reading-plans',
    type: 'website',
  },
  alternates: { canonical: '/reading-plans' },
};

export default function ReadingPlansPage() {
  const plans = getAllReadingPlans();
  const stats = getReadingPlansStats();

  const grouped: Record<string, typeof plans> = {};
  for (const plan of plans) {
    if (!grouped[plan.category]) grouped[plan.category] = [];
    grouped[plan.category].push(plan);
  }

  const categoryOrder = ['Full Bible', 'Old Testament', 'New Testament'];
  const categoryDescriptions: Record<string, string> = {
    'Full Bible': 'Plans that cover the entire Bible from Genesis to Revelation.',
    'Old Testament': 'Focused plans for the Law, History, Wisdom, and Prophets.',
    'New Testament': 'Plans covering the Gospels, Epistles, and Revelation.',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Reading Plans',
    description: metadata.description,
    url: 'https://biblemaximum.com/reading-plans',
    numberOfItems: stats.totalPlans,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Reading Plans' },
    ],
  };

  return (
    <>
      <StructuredData data={jsonLd} />
      <StructuredData data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">Reading Plans</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="rounded-2xl overflow-hidden bg-white border-b border-grace">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold font-display text-scripture mb-3">
              Bible Reading Plans
            </h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mb-6">
              Structured daily reading schedules to guide you through Scripture. Choose a plan
              that fits your goals and pace -- from a two-week focus on the Minor Prophets
              to a full year through the entire Bible.
            </p>
            <div className="flex flex-wrap gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.totalPlans}</p>
                <p className="text-xs text-primary-dark/40 uppercase tracking-wider">Plans</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.totalReadings.toLocaleString()}</p>
                <p className="text-xs text-primary-dark/40 uppercase tracking-wider">Total Readings</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.categories.length}</p>
                <p className="text-xs text-primary-dark/40 uppercase tracking-wider">Categories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans by Category */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        {categoryOrder.map(category => {
          const categoryPlans = grouped[category];
          if (!categoryPlans || categoryPlans.length === 0) return null;

          return (
            <div key={category} className="mb-10">
              <h2 className="text-xl font-bold text-scripture mb-1">
                {category} ({categoryPlans.length})
              </h2>
              <p className="text-sm text-primary-dark/60 mb-4">
                {categoryDescriptions[category]}
              </p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryPlans.map(plan => (
                  <Link
                    key={plan.slug}
                    href={`/reading-plans/${plan.slug}`}
                    className="block bg-white border border-grace rounded-xl p-6 hover:shadow-md hover:border-blue-300 transition-all group"
                  >
                    <h3 className="font-semibold text-scripture group-hover:text-blue-600 transition-colors mb-2">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-primary-dark/60 mb-4 line-clamp-2">
                      {plan.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                        {plan.totalDays} {plan.totalDays === 1 ? 'day' : 'days'}
                      </span>
                      <span className="text-xs text-primary-dark/40">
                        {plan.days.reduce((s, d) => s + d.readings.length, 0)} readings
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Internal Links */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-scripture mb-2">Continue Your Study</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/bible-quizzes"
              className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Bible Quizzes
            </Link>
            <Link
              href="/topics"
              className="px-5 py-2.5 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-primary-light transition-colors"
            >
              Bible Topics
            </Link>
            <Link
              href="/timeline"
              className="px-5 py-2.5 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-primary-light transition-colors"
            >
              Bible Timeline
            </Link>
            <Link
              href="/bible-stories"
              className="px-5 py-2.5 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-primary-light transition-colors"
            >
              Bible Stories
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
