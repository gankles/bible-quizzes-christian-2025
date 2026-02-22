import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllReadingPlans, getReadingPlanBySlug } from '@/lib/reading-plans-data';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ── Helpers ──

function bookNameToSlug(bookName: string): string {
  return bookName.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Parse a reading like "Genesis 1-3" or "1 Samuel 4" or "Psalm 119"
 * and return the book slug for linking to the chapters page.
 */
function parseReadingBookSlug(reading: string): string | null {
  // Match book name (may start with a digit, e.g. "1 Samuel") followed by chapter info
  const match = reading.match(/^(\d?\s*[A-Za-z]+(?:\s+(?:of\s+)?[A-Za-z]+)*)\s+\d/);
  if (match) {
    return bookNameToSlug(match[1].trim());
  }
  // Fallback: the entire string is a book name (e.g. "Obadiah")
  return bookNameToSlug(reading.trim());
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const plan = getReadingPlanBySlug(slug);
  if (!plan) return {};

  return {
    title: `${plan.title} | ${plan.totalDays}-Day Bible Reading Plan | Bible Maximum`,
    description: plan.description,
    keywords: [
      plan.title, 'Bible reading plan', 'daily Bible reading',
      `${plan.totalDays} day plan`, 'Bible study schedule',
    ],
    openGraph: {
      title: `${plan.title} -- ${plan.totalDays}-Day Plan`,
      description: plan.description,
      url: `/reading-plans/${plan.slug}`,
      type: 'article',
    },
    alternates: { canonical: `/reading-plans/${plan.slug}` },
  };
}

export default async function ReadingPlanDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const plan = getReadingPlanBySlug(slug);
  if (!plan) notFound();

  const allPlans = getAllReadingPlans();
  const currentIndex = allPlans.findIndex(p => p.slug === plan.slug);
  const prev = currentIndex > 0 ? allPlans[currentIndex - 1] : null;
  const next = currentIndex < allPlans.length - 1 ? allPlans[currentIndex + 1] : null;

  const totalReadings = plan.days.reduce((s, d) => s + d.readings.length, 0);

  // Group days by week for long plans
  const isLongPlan = plan.totalDays > 60;
  const weeks: { weekNumber: number; days: typeof plan.days }[] = [];
  if (isLongPlan) {
    for (let i = 0; i < plan.days.length; i += 7) {
      weeks.push({
        weekNumber: Math.floor(i / 7) + 1,
        days: plan.days.slice(i, i + 7),
      });
    }
  }

  // Schema markup
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: plan.title,
    description: plan.description,
    url: `https://biblemaximum.com/reading-plans/${plan.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Bible Maximum',
      url: 'https://biblemaximum.com',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Reading Plans', item: 'https://biblemaximum.com/reading-plans' },
      { '@type': 'ListItem', position: 3, name: plan.title },
    ],
  };

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/reading-plans" className="hover:text-blue-600">Reading Plans</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">{plan.title}</span>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-3">
            {plan.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-scripture mb-2">
            {plan.title}
          </h1>
          <p className="text-lg text-primary-dark/70 max-w-2xl mb-6">
            {plan.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-grace rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{plan.totalDays}</div>
              <div className="text-xs text-primary-dark/60 mt-1">Days</div>
            </div>
            <div className="bg-white border border-grace rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{totalReadings}</div>
              <div className="text-xs text-primary-dark/60 mt-1">Total Readings</div>
            </div>
            <div className="bg-white border border-grace rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.ceil(totalReadings / plan.totalDays)}
              </div>
              <div className="text-xs text-primary-dark/60 mt-1">Avg per Day</div>
            </div>
          </div>
        </div>

        {/* Day-by-Day Schedule */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-scripture mb-4">Daily Reading Schedule</h2>

          {isLongPlan ? (
            /* Week-by-week grouping for long plans */
            <div className="space-y-6">
              {weeks.map(week => (
                <details
                  key={week.weekNumber}
                  className="bg-white border border-grace rounded-xl overflow-hidden group"
                  open={week.weekNumber === 1}
                >
                  <summary className="px-5 py-4 cursor-pointer select-none hover:bg-primary-light/30 transition-colors">
                    <span className="font-semibold text-scripture">
                      Week {week.weekNumber}
                    </span>
                    <span className="text-sm text-primary-dark/60 ml-2">
                      Days {week.days[0].day}--{week.days[week.days.length - 1].day}
                    </span>
                  </summary>
                  <div className="border-t border-grace">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-grace bg-primary-light/20">
                          <th className="px-5 py-2.5 text-xs font-semibold text-primary-dark/60 uppercase tracking-wider w-16">Day</th>
                          <th className="px-5 py-2.5 text-xs font-semibold text-primary-dark/60 uppercase tracking-wider">Theme</th>
                          <th className="px-5 py-2.5 text-xs font-semibold text-primary-dark/60 uppercase tracking-wider">Readings</th>
                        </tr>
                      </thead>
                      <tbody>
                        {week.days.map(day => (
                          <tr key={day.day} className="border-b border-grace/50 last:border-b-0">
                            <td className="px-5 py-3 text-sm font-mono font-semibold text-scripture">{day.day}</td>
                            <td className="px-5 py-3 text-sm text-primary-dark/70">{day.theme}</td>
                            <td className="px-5 py-3 text-sm">
                              <div className="flex flex-wrap gap-1.5">
                                {day.readings.map((reading, i) => {
                                  const bookSlug = parseReadingBookSlug(reading);
                                  return (
                                    <Link
                                      key={i}
                                      href={bookSlug ? `/${bookSlug}-chapters` : '/reading-plans'}
                                      className="text-blue-600 hover:underline whitespace-nowrap"
                                    >
                                      {reading}
                                    </Link>
                                  );
                                })}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </details>
              ))}
            </div>
          ) : (
            /* Full table for shorter plans */
            <div className="bg-white border border-grace rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-grace bg-primary-light/20">
                    <th className="px-5 py-3 text-xs font-semibold text-primary-dark/60 uppercase tracking-wider w-16">Day</th>
                    <th className="px-5 py-3 text-xs font-semibold text-primary-dark/60 uppercase tracking-wider">Theme</th>
                    <th className="px-5 py-3 text-xs font-semibold text-primary-dark/60 uppercase tracking-wider">Readings</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.days.map(day => (
                    <tr key={day.day} className="border-b border-grace/50 last:border-b-0">
                      <td className="px-5 py-3 text-sm font-mono font-semibold text-scripture">{day.day}</td>
                      <td className="px-5 py-3 text-sm text-primary-dark/70">{day.theme}</td>
                      <td className="px-5 py-3 text-sm">
                        <div className="flex flex-wrap gap-1.5">
                          {day.readings.map((reading, i) => {
                            const bookSlug = parseReadingBookSlug(reading);
                            return (
                              <Link
                                key={i}
                                href={bookSlug ? `/${bookSlug}-chapters` : '/reading-plans'}
                                className="text-blue-600 hover:underline whitespace-nowrap"
                              >
                                {reading}
                              </Link>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10">
          {prev ? (
            <Link
              href={`/reading-plans/${prev.slug}`}
              className="flex-1 bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-primary-dark/60">Previous Plan</span>
              <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link
              href={`/reading-plans/${next.slug}`}
              className="flex-1 text-right bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-primary-dark/60">Next Plan</span>
              <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                {next.title}
              </span>
            </Link>
          ) : <div className="flex-1" />}
        </div>

        {/* Other Plans */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-scripture mb-4">Other Reading Plans</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {allPlans
              .filter(p => p.slug !== plan.slug)
              .slice(0, 6)
              .map(p => (
                <Link
                  key={p.slug}
                  href={`/reading-plans/${p.slug}`}
                  className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <span className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                    {p.title}
                  </span>
                  <span className="block text-xs text-primary-dark/60 mt-0.5">
                    {p.totalDays} days -- {p.category}
                  </span>
                </Link>
              ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="bg-grace/10 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/reading-plans" className="text-blue-600 hover:underline text-sm">
              All Reading Plans
            </Link>
            <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">
              Bible Quizzes
            </Link>
            <Link href="/topics" className="text-blue-600 hover:underline text-sm">
              Bible Topics
            </Link>
            <Link href="/timeline" className="text-blue-600 hover:underline text-sm">
              Bible Timeline
            </Link>
            <Link href="/bible-stories" className="text-blue-600 hover:underline text-sm">
              Bible Stories
            </Link>
            <Link href="/people" className="text-blue-600 hover:underline text-sm">
              Bible Characters
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
