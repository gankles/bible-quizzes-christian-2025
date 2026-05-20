import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllDevotionals,
  getDevotionalBySlug,
  getDevotionalsByTheme,
} from '@/lib/devotionals-data';
import { findBiography } from '@/lib/biographies-data';
import { getCharacterQuizSlug } from '@/lib/character-quiz-generator';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

export const revalidate = 86400 // 24 hours

interface PageProps {
  params: Promise<{ slug: string }>;
}

function bookToSlug(book: string): string {
  return book.toLowerCase().replace(/\s+/g, '-');
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const devotional = getDevotionalBySlug(slug);
  if (!devotional) return {};

  return {
    title: `${devotional.title} - Daily Devotional | ${devotional.reference} | Bible Maximum`,
    description: `${devotional.opening} A daily devotional meditation on ${devotional.reference} exploring the theme of ${devotional.theme}.`,
    keywords: [
      devotional.title, devotional.theme, devotional.reference,
      'daily devotional', 'Bible meditation', 'scripture devotional',
      `${devotional.book} devotional`, 'Christian devotional', 'prayer',
    ],
    openGraph: {
      title: `${devotional.title} - Daily Devotional | ${devotional.reference}`,
      description: devotional.opening,
      url: `/devotionals/${slug}`,
      type: 'article',
    },
    alternates: { canonical: `/devotionals/${slug}` },
  };
}

export default async function DevotionalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const devotional = getDevotionalBySlug(slug);

  if (!devotional) {
    notFound();
  }

  const allDevotionals = getAllDevotionals();
  const currentIndex = allDevotionals.findIndex(d => d.slug === devotional.slug);
  const prev = currentIndex > 0 ? allDevotionals[currentIndex - 1] : null;
  const next = currentIndex < allDevotionals.length - 1 ? allDevotionals[currentIndex + 1] : null;

  // Related devotionals: same theme, exclude current, max 4
  const related = getDevotionalsByTheme(devotional.theme)
    .filter(d => d.slug !== devotional.slug)
    .slice(0, 4);

  const bookSlug = bookToSlug(devotional.book);
  const verseUrl = `/verses/${bookSlug}/${devotional.chapter}/${devotional.verse}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${devotional.title} - Daily Devotional`,
    description: devotional.opening,
    url: `https://biblemaximum.com/devotionals/${slug}`,
    about: {
      '@type': 'Thing',
      name: devotional.theme,
    },
    isPartOf: {
      '@type': 'CollectionPage',
      name: 'Daily Bible Devotionals',
      url: 'https://biblemaximum.com/devotionals',
    },
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
      { '@type': 'ListItem', position: 2, name: 'Devotionals', item: 'https://biblemaximum.com/devotionals' },
      { '@type': 'ListItem', position: 3, name: devotional.title },
    ],
  };

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />

      <Breadcrumb items={[
        { label: 'Devotionals', href: '/devotionals' },
        { label: devotional.title },
      ]} />

      <article className="max-w-article mx-auto px-4 py-10">
        {/* Header */}
        <header className="mb-10">
          <span className="inline-block px-3 py-1 bg-blue-50 text-sacred text-xs font-medium rounded-full mb-3">
            {devotional.theme}
          </span>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-scripture mb-3">
            {devotional.title}
          </h1>
          <Link
            href={verseUrl}
            className="text-lg text-sacred hover:underline font-medium"
          >
            {devotional.reference}
          </Link>
        </header>

        {/* CTA Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 mt-[-0.5rem] relative z-20">
          <Link
            href={`/${bookSlug}-${devotional.chapter}-quiz`}
            className="bg-scripture rounded-lg p-5 text-white shadow-lg flex items-center justify-between hover:bg-ink-muted transition-colors"
          >
            <div>
              <h3 className="font-bold text-lg">Take the {devotional.book} {devotional.chapter} Quiz</h3>
              <p className="text-white/80 text-xs">Test your knowledge of this chapter</p>
            </div>
            <span className="bg-white text-sacred px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase shrink-0 ml-3">
              Begin
            </span>
          </Link>
          <Link
            href={`/chapters/${bookSlug}/${devotional.chapter}`}
            className="bg-scripture rounded-lg p-5 text-white shadow-lg flex items-center justify-between hover:bg-scripture/90 transition-colors"
          >
            <div>
              <h3 className="font-bold text-lg">Read {devotional.book} {devotional.chapter}</h3>
              <p className="text-white/80 text-xs">Full chapter with commentary</p>
            </div>
            <span className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase shrink-0 ml-3">
              Read
            </span>
          </Link>
        </div>

        {/* Scripture Reference Card */}
        <Link
          href={verseUrl}
          className="block mb-8 bg-white border border-grace rounded-xl p-6 hover:shadow-md hover:border-sacred/50 transition-all group"
        >
          <div className="flex items-start gap-4">
            <span className="inline-flex items-center justify-center w-12 h-12 bg-sacred/10 text-scripture rounded-xl text-lg font-bold shrink-0 group-hover:bg-sacred-light transition-colors">
              {devotional.chapter}:{devotional.verse}
            </span>
            <div>
              <h2 className="text-lg font-bold text-scripture group-hover:text-gold-dark transition-colors mb-1">
                {devotional.book} {devotional.chapter}:{devotional.verse}
              </h2>
              <p className="text-sm text-ink-muted">
                Read this verse in depth with cross-references and study notes
              </p>
            </div>
          </div>
        </Link>

        {/* Opening */}
        <p className="text-xl text-scripture leading-relaxed mb-8 font-serif">
          {devotional.opening}
        </p>

        {/* Meditation */}
        <section className="mb-10">
          <div className="text-ink-muted text-lg leading-relaxed space-y-4">
            {devotional.meditation.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Application */}
        <section className="mb-10 bg-white border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">
            Apply This Today
          </h2>
          <p className="text-ink-muted leading-relaxed">
            {devotional.application}
          </p>
        </section>

        {/* Prayer */}
        <section className="mb-12 border-l-4 border-sacred pl-6 py-2">
          <h2 className="text-lg font-bold text-scripture mb-3">
            Prayer
          </h2>
          <p className="text-ink-muted leading-relaxed italic text-lg font-serif">
            {devotional.prayer}
          </p>
        </section>

        {/* Engagement Prompt */}
        <div className="bg-blue-50 border border-sacred/20 rounded-xl p-5 mb-12 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="font-semibold text-scripture">Continue your study of {devotional.book}</p>
            <p className="text-sm text-ink-muted">Deepen your understanding with a chapter quiz.</p>
          </div>
          <Link
            href={`/${bookSlug}-${devotional.chapter}-quiz`}
            className="px-5 py-2.5 bg-scripture text-white text-sm font-medium rounded-lg hover:bg-ink-muted transition-colors shrink-0"
          >
            {devotional.book} {devotional.chapter} Quiz
          </Link>
        </div>

        {/* Prev/Next Navigation */}
        <div className="flex items-stretch justify-between gap-4 mb-12">
          {prev ? (
            <Link
              href={`/devotionals/${prev.slug}`}
              className="flex-1 bg-white border border-grace rounded-lg px-4 py-3 hover:border-sacred/50 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-ink-muted">Previous</span>
              <span className="block font-semibold text-scripture group-hover:text-gold-dark transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link
              href={`/devotionals/${next.slug}`}
              className="flex-1 text-right bg-white border border-grace rounded-lg px-4 py-3 hover:border-sacred/50 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-ink-muted">Next</span>
              <span className="block font-semibold text-scripture group-hover:text-gold-dark transition-colors">
                {next.title}
              </span>
            </Link>
          ) : <div className="flex-1" />}
        </div>

        {/* Related Devotionals */}
        {related.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-scripture mb-4">
              More on {devotional.theme}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map(d => (
                <Link
                  key={d.slug}
                  href={`/devotionals/${d.slug}`}
                  className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-sacred/50 transition-all group"
                >
                  <span className="font-semibold text-scripture group-hover:text-gold-dark transition-colors">
                    {d.title}
                  </span>
                  <span className="block text-xs text-ink-muted mt-0.5">
                    {d.reference}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Internal Links */}
        <section className="bg-grace/10 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href={verseUrl} className="text-sacred hover:underline text-sm">
              Study {devotional.reference} in Depth
            </Link>
            <Link href={`/chapters/${bookSlug}/${devotional.chapter}`} className="text-sacred hover:underline text-sm">
              Read {devotional.book} {devotional.chapter}
            </Link>
            <Link href={`/bible-chapter-summaries/${bookSlug}/${devotional.chapter}`} className="text-sacred hover:underline text-sm">
              {devotional.book} {devotional.chapter} Summary
            </Link>
            <Link href={`/${bookSlug}-chapters`} className="text-sacred hover:underline text-sm">
              All {devotional.book} Chapters
            </Link>
            <Link href={`/${bookSlug}-quiz`} className="text-sacred hover:underline text-sm">
              {devotional.book} Quiz
            </Link>
            <Link href="/devotionals" className="text-sacred hover:underline text-sm">
              All Devotionals
            </Link>
            <Link href="/bible-quizzes" className="text-sacred hover:underline text-sm">
              Bible Quizzes
            </Link>
            <Link href="/character-quiz" className="text-sacred hover:underline text-sm">
              Character Quizzes
            </Link>
            <Link href="/topics" className="text-sacred hover:underline text-sm">
              Bible Topics
            </Link>
            <Link href="/reading-plans" className="text-sacred hover:underline text-sm">
              Reading Plans
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
