import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  getAllCommandments,
  getAllCategories,
  getCommandmentStats,
  formatReference,
  referenceToQuizSlug,
  categorySlug,
} from '@/lib/commandments-data';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'All 613 Commandments in the Bible | Complete List of Biblical Commandments (Mitzvot) with Scripture References and Categories',
  description: 'Explore all 613 commandments (mitzvot) found in the Torah — 248 positive and 365 negative commands. Browse by category, book, or polarity with full scripture references in English, Hebrew, and Greek.',
  keywords: [
    '613 commandments', '613 mitzvot', 'biblical commandments', 'Torah commandments',
    'commandments in the Bible', 'list of commandments', 'positive commandments',
    'negative commandments', '248 positive commandments', '365 negative commandments',
    'Ten Commandments', 'mitzvot list', 'Bible commandments complete list',
    'Leviticus commandments', 'Deuteronomy commandments', 'Exodus commandments',
  ],
  openGraph: {
    title: 'All 613 Commandments in the Bible — Complete Reference',
    description: 'Browse all 613 biblical commandments organized by category with full scripture references.',
    url: '/commandments',
    type: 'website',
  },
  alternates: { canonical: '/commandments' },
};

export default function CommandmentsPage() {
  const stats = getCommandmentStats();
  const categories = getAllCategories();
  const all = getAllCommandments();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All 613 Commandments in the Bible',
    description: metadata.description,
    url: 'https://biblemaximum.com/commandments',
    numberOfItems: stats.total,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: stats.total,
      itemListElement: all.slice(0, 10).map((cmd, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `Commandment #${cmd.number}: ${cmd.concept}`,
        url: `https://biblemaximum.com/commandments/${cmd.number}`,
      })),
    },
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900 font-medium">613 Commandments</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          <Image
            src="/images/bible-study-wide.webp"
            alt="Bible study"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="relative z-10 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              The 613 Commandments of the Bible
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mb-6">
              The Torah contains 613 commandments (mitzvot) — 248 positive (&ldquo;thou shalt&rdquo;)
              and 365 negative (&ldquo;thou shalt not&rdquo;) — spanning the books of
              Exodus, Leviticus, Numbers, and Deuteronomy.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 text-center">
              <div>
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Total</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-400">{stats.positive}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Positive</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-400">{stats.negative}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Negative</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.categories}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Categories</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.books}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Books</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Test Your Knowledge</h2>
            <p className="text-sm text-gray-600">
              How well do you know the biblical commandments? Take a quiz and find out.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/ten-commandments-quiz"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ten Commandments Quiz
            </Link>
            <Link
              href="/613-commandments-quiz"
              className="px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors"
            >
              All 613 Quiz (50 Questions)
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/commandments/category/${cat.slug}`}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">
                  {cat.name}
                </h3>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {cat.count}
                </span>
              </div>
              <div className="flex gap-3 text-xs text-gray-500">
                <span className="text-emerald-600">{cat.positive} positive</span>
                <span className="text-red-600">{cat.negative} negative</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Full Commandments Table */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All 613 Commandments</h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 w-12">#</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Commandment</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 w-16">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 w-40">Reference</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 w-36">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {all.map(cmd => {
                  const quizSlug = referenceToQuizSlug(cmd.referenceId);
                  return (
                    <tr key={cmd.number} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2.5 text-gray-500 font-mono text-xs">{cmd.number}</td>
                      <td className="px-4 py-2.5">
                        <Link
                          href={`/commandments/${cmd.number}`}
                          className="text-gray-900 hover:text-blue-600 transition-colors font-medium"
                        >
                          {cmd.concept}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
                          cmd.polarity === 'P'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {cmd.polarity === 'P' ? '+' : '\u2212'}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-gray-600 text-xs">
                        {quizSlug ? (
                          <Link href={`/${quizSlug}`} className="hover:text-blue-600 hover:underline">
                            {formatReference(cmd.referenceId)}
                          </Link>
                        ) : (
                          formatReference(cmd.referenceId)
                        )}
                      </td>
                      <td className="px-4 py-2.5">
                        <Link
                          href={`/commandments/category/${categorySlug(cmd.category)}`}
                          className="text-xs text-gray-500 hover:text-blue-600 hover:underline"
                        >
                          {cmd.category}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom Quiz CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Ready to Test Your Knowledge?
          </h2>
          <p className="text-sm text-gray-600 mb-4 max-w-lg mx-auto">
            From the Ten Commandments to all 613 mitzvot — put your biblical knowledge to the test.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/ten-commandments-quiz" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Ten Commandments Quiz
            </Link>
            <Link href="/613-commandments-quiz" className="px-5 py-2.5 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors">
              All 613 Quiz
            </Link>
            <Link href="/positive-negative-commandments-quiz" className="px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              Positive vs Negative Quiz
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
