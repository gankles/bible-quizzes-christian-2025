import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllCommandments,
  getCommandment,
  getCommandmentsByCategory,
  formatReference,
  referenceToQuizSlug,
  categorySlug,
} from '@/lib/commandments-data';
import { StructuredData } from '@/components/StructuredData';
import { ChevronLeftIcon, ChevronRightIcon, BookOpenIcon, ArrowRightIcon } from '@/components/icons';

interface PageProps {
  params: Promise<{ number: string }>;
}

export async function generateStaticParams() {
  return getAllCommandments().map(c => ({ number: String(c.number) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { number } = await params;
  const num = parseInt(number, 10);
  const cmd = getCommandment(num);
  if (!cmd) return {};

  const polLabel = cmd.polarity === 'P' ? 'Positive' : 'Negative';
  const ref = formatReference(cmd.referenceId);

  return {
    title: `What Is Commandment #${cmd.number} of the 613? | ${cmd.concept} — ${polLabel} Mitzvah from ${ref} | Bible Maximum`,
    description: `${polLabel} commandment #${cmd.number} of 613: "${cmd.concept}" — from ${ref}. Read the full scripture in English, Hebrew, and Greek. Category: ${cmd.category}.`,
    keywords: [
      `commandment ${cmd.number}`, cmd.concept, `${polLabel} commandment`,
      `${ref} commandment`, '613 commandments', 'biblical commandments',
      cmd.category, 'Torah commandments', 'mitzvot',
    ],
    openGraph: {
      title: `Commandment #${cmd.number}: ${cmd.concept}`,
      description: `${polLabel} commandment from ${ref}: ${cmd.concept}`,
      url: `/commandments/${cmd.number}`,
      type: 'article',
    },
    alternates: { canonical: `/commandments/${cmd.number}` },
  };
}

export default async function CommandmentPage({ params }: PageProps) {
  const { number } = await params;
  const num = parseInt(number, 10);
  const cmd = getCommandment(num);
  if (!cmd) notFound();

  const all = getAllCommandments();
  const prev = num > 1 ? getCommandment(num - 1) : null;
  const next = num < all.length ? getCommandment(num + 1) : null;
  const related = getCommandmentsByCategory(cmd.category)
    .filter(c => c.number !== cmd.number)
    .slice(0, 6);
  const ref = formatReference(cmd.referenceId);
  const quizSlug = referenceToQuizSlug(cmd.referenceId);
  const polLabel = cmd.polarity === 'P' ? 'Positive' : 'Negative';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: `Commandment #${cmd.number}: ${cmd.concept}`,
    description: `${polLabel} commandment from ${ref}`,
    url: `https://biblemaximum.com/commandments/${cmd.number}`,
    mainEntityOfPage: `https://biblemaximum.com/commandments/${cmd.number}`,
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
        <span className="text-gray-900 font-medium">#{cmd.number}</span>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-start gap-4 mb-4">
          <span className={`shrink-0 mt-1 inline-flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold ${
            cmd.polarity === 'P'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {cmd.polarity === 'P' ? '+' : '\u2212'}
          </span>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">
              {polLabel} Commandment #{cmd.number} of {all.length}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {cmd.concept}
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              {ref} &middot;{' '}
              <Link href={`/commandments/category/${categorySlug(cmd.category)}`} className="text-blue-600 hover:underline">
                {cmd.category}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Scripture */}
      <section className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <BookOpenIcon className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-bold text-gray-900">Scripture</h2>
            </div>
            <blockquote className="text-gray-800 leading-relaxed border-l-4 border-blue-200 pl-4 italic">
              &ldquo;{cmd.scriptureEnglish}&rdquo;
            </blockquote>
            <p className="text-sm text-gray-500 mt-2">&mdash; {ref}</p>
          </div>

          {cmd.scriptureHebrew && (
            <div className="p-6 border-b border-gray-100 bg-amber-50/50">
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">Hebrew</p>
              <p className="text-lg text-gray-900 leading-relaxed" dir="rtl" lang="he">
                {cmd.scriptureHebrew}
              </p>
            </div>
          )}

          {cmd.scriptureGreek && (
            <div className="p-6 bg-blue-50/50">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Greek (Septuagint)</p>
              <p className="text-lg text-gray-900 leading-relaxed" lang="el">
                {cmd.scriptureGreek}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Details */}
      <section className="max-w-4xl mx-auto px-4 pb-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Classification</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Type</dt>
                <dd className={`font-medium ${cmd.polarity === 'P' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {polLabel} ({cmd.polarity === 'P' ? 'Thou Shalt' : 'Thou Shalt Not'})
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Category</dt>
                <dd>
                  <Link href={`/commandments/category/${categorySlug(cmd.category)}`} className="text-blue-600 hover:underline font-medium">
                    {cmd.category}
                  </Link>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Book</dt>
                <dd className="font-medium text-gray-900 capitalize">{cmd.book}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Chapter</dt>
                <dd className="font-medium text-gray-900">{cmd.chapter}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Scholarly References</h3>
            <dl className="space-y-2 text-sm">
              {cmd.parashah && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Parashah</dt>
                  <dd className="font-medium text-gray-900">{cmd.parashah}</dd>
                </div>
              )}
              {cmd.seferHachinuchNumber > 0 && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Sefer HaChinuch</dt>
                  <dd className="font-medium text-gray-900">#{cmd.seferHachinuchNumber}</dd>
                </div>
              )}
              {cmd.mishnahTorahBookName && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Mishneh Torah</dt>
                  <dd className="font-medium text-gray-900 text-right">
                    {cmd.mishnahTorahBookName}
                    {cmd.mishnahTorahCategory && (
                      <span className="block text-xs text-gray-500">{cmd.mishnahTorahCategory}</span>
                    )}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      {/* Related Commandments */}
      {related.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 pb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Related Commandments in &ldquo;{cmd.category}&rdquo;
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {related.map(r => (
              <Link
                key={r.number}
                href={`/commandments/${r.number}`}
                className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm hover:border-blue-300 transition-all flex items-start gap-2"
              >
                <span className={`shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
                  r.polarity === 'P' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {r.polarity === 'P' ? '+' : '\u2212'}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900">#{r.number}: {r.concept}</p>
                  <p className="text-xs text-gray-500">{formatReference(r.referenceId)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Prev / Next Navigation */}
      <section className="max-w-4xl mx-auto px-4 pb-8">
        <div className="flex justify-between gap-4">
          {prev ? (
            <Link
              href={`/commandments/${prev.number}`}
              className="flex-1 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm hover:border-blue-300 transition-all group"
            >
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <ChevronLeftIcon className="w-4 h-4" />
                <span>Previous</span>
              </div>
              <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                #{prev.number}: {prev.concept}
              </p>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link
              href={`/commandments/${next.number}`}
              className="flex-1 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm hover:border-blue-300 transition-all text-right group"
            >
              <div className="flex items-center justify-end gap-2 text-sm text-gray-500 mb-1">
                <span>Next</span>
                <ChevronRightIcon className="w-4 h-4" />
              </div>
              <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                #{next.number}: {next.concept}
              </p>
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Test Your Knowledge</h2>
            <p className="text-sm text-gray-600">
              Think you know the 613 commandments? Take a quiz and find out.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/ten-commandments-quiz" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Ten Commandments Quiz
            </Link>
            {quizSlug && (
              <Link href={`/${quizSlug}`} className="px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors">
                {ref.split(' ').slice(0, -1).join(' ')} Quiz
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
