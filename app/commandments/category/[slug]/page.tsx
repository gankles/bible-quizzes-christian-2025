import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllCategories,
  getCategoryBySlug,
  getCommandmentsByCategorySlug,
  formatReference,
  referenceToQuizSlug,
  categorySlug as toCatSlug,
} from '@/lib/commandments-data';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCategories().map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};

  return {
    title: `${cat.name} Commandments | ${cat.count} Biblical Commands — ${cat.positive} Positive, ${cat.negative} Negative | 613 Commandments`,
    description: `Explore all ${cat.count} biblical commandments in the "${cat.name}" category — ${cat.positive} positive and ${cat.negative} negative commands with scripture references in English, Hebrew, and Greek.`,
    keywords: [
      `${cat.name} commandments`, `${cat.name} Bible commands`, '613 commandments',
      'biblical commandments', 'Torah commandments', `${cat.name} mitzvot`,
      'positive commandments', 'negative commandments',
    ],
    openGraph: {
      title: `${cat.name} Commandments — ${cat.count} Biblical Commands`,
      description: `${cat.count} commandments related to ${cat.name} in the Torah.`,
      url: `/commandments/category/${slug}`,
      type: 'website',
    },
    alternates: { canonical: `/commandments/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const commandments = getCommandmentsByCategorySlug(slug);
  const positive = commandments.filter(c => c.polarity === 'P');
  const negative = commandments.filter(c => c.polarity === 'N');
  const allCategories = getAllCategories();
  const relatedCategories = allCategories.filter(c => c.slug !== slug).slice(0, 6);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cat.name} Commandments`,
    description: `${cat.count} biblical commandments in the ${cat.name} category`,
    url: `https://biblemaximum.com/commandments/category/${slug}`,
    numberOfItems: cat.count,
    isPartOf: {
      '@type': 'CollectionPage',
      name: 'The 613 Commandments of the Bible',
      url: 'https://biblemaximum.com/commandments',
    },
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 pt-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/commandments" className="hover:text-blue-600">613 Commandments</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900 font-medium">{cat.name}</span>
      </nav>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {cat.name} Commandments
        </h1>
        <p className="text-gray-600 mb-4">
          There are <strong>{cat.count}</strong> biblical commandments in the &ldquo;{cat.name}&rdquo;
          category &mdash; <span className="text-emerald-600 font-medium">{cat.positive} positive</span> and{' '}
          <span className="text-red-600 font-medium">{cat.negative} negative</span>.
        </p>

        {/* Stats bar */}
        <div className="h-2 rounded-full overflow-hidden bg-gray-200 max-w-md">
          <div
            className="h-full bg-emerald-500 float-left"
            style={{ width: `${(cat.positive / cat.count) * 100}%` }}
          />
          <div
            className="h-full bg-red-500 float-left"
            style={{ width: `${(cat.negative / cat.count) * 100}%` }}
          />
        </div>
      </section>

      {/* Positive Commandments */}
      {positive.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 pb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">+</span>
            Positive Commandments ({positive.length})
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
            {positive.map(cmd => {
              const quizSlug = referenceToQuizSlug(cmd.referenceId);
              return (
                <div key={cmd.number} className="px-5 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors">
                  <span className="text-xs text-gray-400 font-mono mt-0.5 w-8 shrink-0">{cmd.number}</span>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/commandments/${cmd.number}`}
                      className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {cmd.concept}
                    </Link>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {quizSlug ? (
                        <Link href={`/${quizSlug}`} className="hover:text-blue-600 hover:underline">
                          {formatReference(cmd.referenceId)}
                        </Link>
                      ) : (
                        formatReference(cmd.referenceId)
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Negative Commandments */}
      {negative.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 pb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-bold">{'\u2212'}</span>
            Negative Commandments ({negative.length})
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
            {negative.map(cmd => {
              const quizSlug = referenceToQuizSlug(cmd.referenceId);
              return (
                <div key={cmd.number} className="px-5 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors">
                  <span className="text-xs text-gray-400 font-mono mt-0.5 w-8 shrink-0">{cmd.number}</span>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/commandments/${cmd.number}`}
                      className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {cmd.concept}
                    </Link>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {quizSlug ? (
                        <Link href={`/${quizSlug}`} className="hover:text-blue-600 hover:underline">
                          {formatReference(cmd.referenceId)}
                        </Link>
                      ) : (
                        formatReference(cmd.referenceId)
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Related Categories */}
      <section className="max-w-4xl mx-auto px-4 pb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Other Categories</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {relatedCategories.map(rc => (
            <Link
              key={rc.slug}
              href={`/commandments/category/${rc.slug}`}
              className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm hover:border-blue-300 transition-all group"
            >
              <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {rc.name}
              </p>
              <p className="text-xs text-gray-500">
                {rc.count} commandments &middot; {rc.positive}+ / {rc.negative}&minus;
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Test Your Knowledge</h2>
          <p className="text-sm text-gray-600 mb-4">
            How well do you know the biblical commandments?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/ten-commandments-quiz" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Ten Commandments Quiz
            </Link>
            <Link href="/613-commandments-quiz" className="px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors">
              All 613 Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/commandments" className="text-blue-600 hover:underline text-sm">All 613 Commandments</Link>
            <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">Bible Quizzes</Link>
            <Link href="/nave-topics" className="text-blue-600 hover:underline text-sm">Nave&apos;s Topical Bible</Link>
            <Link href="/topics" className="text-blue-600 hover:underline text-sm">Bible Topics</Link>
            <Link href="/people" className="text-blue-600 hover:underline text-sm">Bible People Directory</Link>
            <Link href="/bible-names" className="text-blue-600 hover:underline text-sm">Bible Name Meanings</Link>
            <Link href="/timeline" className="text-blue-600 hover:underline text-sm">Bible Timeline</Link>
            <Link href="/lexicon" className="text-blue-600 hover:underline text-sm">Greek &amp; Hebrew Lexicon</Link>
          </div>
        </div>
      </section>
    </>
  );
}
