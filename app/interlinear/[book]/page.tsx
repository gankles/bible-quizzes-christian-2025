import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BIBLE_BOOKS } from '@/lib/bible-data';
import { getBookName, isOldTestament } from '@/lib/interlinear-data';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ book: string }>;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { book: bookSlug } = await params;
  const bookName = getBookName(bookSlug);
  if (!bookName) return {};

  const lang = isOldTestament(bookSlug) ? 'Hebrew' : 'Greek';
  const bookData = BIBLE_BOOKS.find(b => b.slug === bookSlug);
  const chapters = bookData?.chapters || 0;

  return {
    title: `${bookName} Interlinear Bible | Word-by-Word ${lang} Analysis | ${chapters} Chapters | Bible Maximum`,
    description: `Study ${bookName} with word-by-word ${lang} interlinear analysis. Explore Strong's numbers, transliterations, and definitions for all ${chapters} chapters.`,
    keywords: [
      `${bookName} interlinear`, `${bookName} ${lang.toLowerCase()}`,
      `${bookName} word study`, 'interlinear Bible', `${lang} interlinear`,
    ],
    openGraph: {
      title: `${bookName} Interlinear Bible — ${lang} Word-by-Word Analysis`,
      description: `Study ${bookName} with word-by-word ${lang} interlinear analysis across ${chapters} chapters.`,
      url: `/interlinear/${bookSlug}`,
      type: 'article',
    },
    alternates: { canonical: `/interlinear/${bookSlug}` },
  };
}

export default async function InterlinearBookPage({ params }: PageProps) {
  const { book: bookSlug } = await params;
  const bookName = getBookName(bookSlug);
  if (!bookName) notFound();

  const bookData = BIBLE_BOOKS.find(b => b.slug === bookSlug);
  if (!bookData) notFound();

  const isOT = isOldTestament(bookSlug);
  const lang = isOT ? 'Hebrew' : 'Greek';
  const testament = isOT ? 'Old' : 'New';

  const chapters = Array.from({ length: bookData.chapters }, (_, i) => i + 1);

  // Prev/next books
  const allBooks = BIBLE_BOOKS;
  const bookIdx = allBooks.findIndex(b => b.slug === bookSlug);
  const prevBook = bookIdx > 0 ? allBooks[bookIdx - 1] : null;
  const nextBook = bookIdx < allBooks.length - 1 ? allBooks[bookIdx + 1] : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${bookName} Interlinear Bible`,
    description: `Word-by-word ${lang} interlinear analysis for ${bookName}.`,
    url: `https://biblemaximum.com/interlinear/${bookSlug}`,
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Interlinear Bible', item: 'https://biblemaximum.com/interlinear' },
      { '@type': 'ListItem', position: 3, name: bookName },
    ],
  };

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero */}
        <div className="bg-white border-b border-grace py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-10">
            <nav className="flex items-center gap-2 text-sm text-primary-dark/60 mb-6 flex-wrap">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/interlinear" className="hover:text-blue-600 transition-colors">Interlinear Bible</Link>
              <span>/</span>
              <span className="text-scripture font-medium">{bookName}</span>
            </nav>

            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase mb-4">
              {testament} Testament &middot; {lang}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-scripture font-display mb-3">
              {bookName} Interlinear
            </h1>
            <p className="text-lg text-primary-dark/70">
              {bookData.chapters} chapter{bookData.chapters !== 1 ? 's' : ''} &middot; Word-by-word {lang} analysis
            </p>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="max-w-4xl mx-auto px-4 md:px-10 mt-[-1.5rem] relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href={`/${bookSlug}-chapters`}
              className="bg-blue-600 rounded-lg p-5 text-white shadow-lg flex items-center justify-between hover:bg-blue-700 transition-colors"
            >
              <div>
                <h3 className="font-bold text-lg">{bookName} Quizzes</h3>
                <p className="text-white/80 text-xs">Test your knowledge of {bookName}</p>
              </div>
              <span className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase">
                Start
              </span>
            </Link>
            <Link
              href={`/books/${bookSlug}`}
              className="bg-scripture rounded-lg p-5 text-white shadow-lg flex items-center justify-between hover:bg-scripture/90 transition-colors"
            >
              <div>
                <h3 className="font-bold text-lg">About {bookName}</h3>
                <p className="text-white/80 text-xs">Overview, author, themes</p>
              </div>
              <span className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase">
                View
              </span>
            </Link>
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-4 md:px-10 py-12">
          {/* Chapter Grid */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-scripture font-display mb-4">Chapters</h2>
            <div className="grid gap-3 grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
              {chapters.map(ch => (
                <Link
                  key={ch}
                  href={`/interlinear/${bookSlug}/${ch}`}
                  className="bg-white border border-grace rounded-lg px-3 py-4 text-center hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <span className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                    {bookName} {ch}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Prev/Next Navigation */}
          <div className="flex items-center justify-between gap-4 mb-10">
            {prevBook ? (
              <Link
                href={`/interlinear/${prevBook.slug}`}
                className="flex-1 bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="text-xs text-primary-dark/60">Previous Book</span>
                <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                  {prevBook.name}
                </span>
              </Link>
            ) : <div className="flex-1" />}
            {nextBook ? (
              <Link
                href={`/interlinear/${nextBook.slug}`}
                className="flex-1 text-right bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="text-xs text-primary-dark/60">Next Book</span>
                <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                  {nextBook.name}
                </span>
              </Link>
            ) : <div className="flex-1" />}
          </div>

          {/* Internal Links */}
          <section className="bg-grace/10 border border-grace rounded-xl p-6">
            <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              <Link href="/interlinear" className="text-blue-600 hover:underline text-sm">
                All Interlinear Books
              </Link>
              <Link href={`/${bookSlug}-chapters`} className="text-blue-600 hover:underline text-sm">
                {bookName} Chapter Quizzes
              </Link>
              <Link href={`/${bookSlug}-quiz`} className="text-blue-600 hover:underline text-sm">
                {bookName} Book Quiz
              </Link>
              <Link href={`/lexicon/browse/${isOT ? 'hebrew' : 'greek'}`} className="text-blue-600 hover:underline text-sm">
                {lang} Lexicon
              </Link>
              <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">
                Bible Quizzes
              </Link>
              <Link href="/word-studies" className="text-blue-600 hover:underline text-sm">
                Word Studies
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
