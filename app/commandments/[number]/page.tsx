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

  const chapterReaderSlug = cmd.book && cmd.chapter
    ? `chapters/${cmd.book}/${cmd.chapter}`
    : null;

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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: '613 Commandments', item: 'https://biblemaximum.com/commandments' },
      { '@type': 'ListItem', position: 3, name: `#${cmd.number}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is commandment #${cmd.number} of the 613 commandments?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Commandment #${cmd.number} is a ${polLabel.toLowerCase()} commandment from ${ref}: "${cmd.concept}." It belongs to the category of ${cmd.category}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Where is commandment #${cmd.number} found in the Bible?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `This commandment is found in ${ref}, in the book of ${cmd.book ? cmd.book.charAt(0).toUpperCase() + cmd.book.slice(1) : 'the Torah'}.`,
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={jsonLd} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/commandments" className="hover:text-blue-600">613 Commandments</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">#{cmd.number}</span>
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
            <p className="text-sm text-primary-dark/60 font-medium mb-1">
              {polLabel} Commandment #{cmd.number} of {all.length}
            </p>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-scripture">
              {cmd.concept}
            </h1>
            <p className="text-sm text-primary-dark/70 mt-2">
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
        <div className="bg-white rounded-xl border border-grace overflow-hidden">
          <div className="p-6 border-b border-grace">
            <div className="flex items-center gap-2 mb-3">
              <BookOpenIcon className="w-5 h-5 text-primary-dark/40" />
              <h2 className="text-lg font-bold text-scripture">Scripture</h2>
            </div>
            <blockquote className="text-scripture leading-relaxed border-l-4 border-blue-200 pl-4 italic">
              &ldquo;{cmd.scriptureEnglish}&rdquo;
            </blockquote>
            <p className="text-sm text-primary-dark/60 mt-2">&mdash; {ref}</p>
          </div>

          {cmd.scriptureHebrew && (
            <div className="p-6 border-b border-grace/50 bg-amber-50/50">
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">Hebrew</p>
              <p className="text-lg text-scripture leading-relaxed" dir="rtl" lang="he">
                {cmd.scriptureHebrew}
              </p>
            </div>
          )}

          {cmd.scriptureGreek && (
            <div className="p-6 bg-blue-50/50">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Greek (Septuagint)</p>
              <p className="text-lg text-scripture leading-relaxed" lang="el">
                {cmd.scriptureGreek}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Details */}
      <section className="max-w-4xl mx-auto px-4 pb-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-white rounded-xl border border-grace p-5">
            <h3 className="text-sm font-bold text-scripture mb-3 uppercase tracking-wider">Classification</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-primary-dark/60">Type</dt>
                <dd className={`font-medium ${cmd.polarity === 'P' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {polLabel} ({cmd.polarity === 'P' ? 'Thou Shalt' : 'Thou Shalt Not'})
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-primary-dark/60">Category</dt>
                <dd>
                  <Link href={`/commandments/category/${categorySlug(cmd.category)}`} className="text-blue-600 hover:underline font-medium">
                    {cmd.category}
                  </Link>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-primary-dark/60">Book</dt>
                <dd className="font-medium text-scripture capitalize">{cmd.book}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-primary-dark/60">Chapter</dt>
                <dd className="font-medium text-scripture">{cmd.chapter}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white rounded-xl border border-grace p-5">
            <h3 className="text-sm font-bold text-scripture mb-3 uppercase tracking-wider">Scholarly References</h3>
            <dl className="space-y-2 text-sm">
              {cmd.parashah && (
                <div className="flex justify-between">
                  <dt className="text-primary-dark/60">Parashah</dt>
                  <dd className="font-medium text-scripture">{cmd.parashah}</dd>
                </div>
              )}
              {cmd.seferHachinuchNumber > 0 && (
                <div className="flex justify-between">
                  <dt className="text-primary-dark/60">Sefer HaChinuch</dt>
                  <dd className="font-medium text-scripture">#{cmd.seferHachinuchNumber}</dd>
                </div>
              )}
              {cmd.mishnahTorahBookName && (
                <div className="flex justify-between">
                  <dt className="text-primary-dark/60">Mishneh Torah</dt>
                  <dd className="font-medium text-scripture text-right">
                    {cmd.mishnahTorahBookName}
                    {cmd.mishnahTorahCategory && (
                      <span className="block text-xs text-primary-dark/60">{cmd.mishnahTorahCategory}</span>
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
          <h2 className="text-lg font-bold text-scripture mb-4">
            Related Commandments in &ldquo;{cmd.category}&rdquo;
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {related.map(r => (
              <Link
                key={r.number}
                href={`/commandments/${r.number}`}
                className="bg-white border border-grace rounded-lg p-3 hover:shadow-sm hover:border-blue-300 transition-all flex items-start gap-2"
              >
                <span className={`shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
                  r.polarity === 'P' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {r.polarity === 'P' ? '+' : '\u2212'}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-scripture">#{r.number}: {r.concept}</p>
                  <p className="text-xs text-primary-dark/60">{formatReference(r.referenceId)}</p>
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
              className="flex-1 bg-white border border-grace rounded-lg p-4 hover:shadow-sm hover:border-blue-300 transition-all group"
            >
              <div className="flex items-center gap-2 text-sm text-primary-dark/60 mb-1">
                <ChevronLeftIcon className="w-4 h-4" />
                <span>Previous</span>
              </div>
              <p className="text-sm font-medium text-scripture group-hover:text-blue-600 transition-colors">
                #{prev.number}: {prev.concept}
              </p>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link
              href={`/commandments/${next.number}`}
              className="flex-1 bg-white border border-grace rounded-lg p-4 hover:shadow-sm hover:border-blue-300 transition-all text-right group"
            >
              <div className="flex items-center justify-end gap-2 text-sm text-primary-dark/60 mb-1">
                <span>Next</span>
                <ChevronRightIcon className="w-4 h-4" />
              </div>
              <p className="text-sm font-medium text-scripture group-hover:text-blue-600 transition-colors">
                #{next.number}: {next.concept}
              </p>
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </section>

      {/* Read Full Chapter + Quiz CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-1">Continue Studying</h2>
          <p className="text-sm text-primary-dark/70 mb-4">
            Read the full chapter for context, or test your knowledge with a quiz.
          </p>
          <div className="flex flex-wrap gap-3">
            {chapterReaderSlug && (
              <Link href={`/${chapterReaderSlug}`} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <BookOpenIcon className="w-4 h-4" />
                Read {ref.split(':')[0]} with Commentary
              </Link>
            )}
            <Link href="/ten-commandments-quiz" className="px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-primary-light transition-colors">
              Ten Commandments Quiz
            </Link>
            {quizSlug && (
              <Link href={`/${quizSlug}`} className="px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-primary-light transition-colors">
                {ref.split(' ').slice(0, -1).join(' ')} Quiz
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Contextual Internal Links */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-grace/10 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {chapterReaderSlug && (
              <Link href={`/${chapterReaderSlug}`} className="text-blue-600 hover:underline text-sm">
                Read {ref.split(':')[0]} Full Chapter
              </Link>
            )}
            <Link href={`/commandments/category/${categorySlug(cmd.category)}`} className="text-blue-600 hover:underline text-sm">
              {cmd.category} Commandments
            </Link>
            <Link href="/commandments" className="text-blue-600 hover:underline text-sm">
              All 613 Commandments
            </Link>
            <Link href="/nave-topics" className="text-blue-600 hover:underline text-sm">
              Nave&apos;s Topical Bible
            </Link>
            <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">
              Bible Quizzes
            </Link>
            <Link href="/topics" className="text-blue-600 hover:underline text-sm">
              Bible Topics
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
