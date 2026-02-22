import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BIBLE_BOOKS } from '@/lib/bible-data';
import { getBookName, isOldTestament, getInterlinearChapterVerses } from '@/lib/interlinear-data';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ book: string; chapter: string }>;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { book: bookSlug, chapter: chapterStr } = await params;
  const bookName = getBookName(bookSlug);
  const chapter = parseInt(chapterStr, 10);
  if (!bookName || isNaN(chapter)) return {};

  const lang = isOldTestament(bookSlug) ? 'Hebrew' : 'Greek';

  return {
    title: `${bookName} ${chapter} Interlinear | Word-by-Word ${lang} Analysis | Bible Maximum`,
    description: `Study ${bookName} chapter ${chapter} with word-by-word ${lang} interlinear analysis. Every verse with Strong's numbers, transliterations, and definitions.`,
    keywords: [
      `${bookName} ${chapter} interlinear`, `${bookName} chapter ${chapter} ${lang.toLowerCase()}`,
      'interlinear Bible', `${lang} interlinear`, 'word by word Bible',
    ],
    openGraph: {
      title: `${bookName} ${chapter} Interlinear — ${lang} Word-by-Word`,
      url: `/interlinear/${bookSlug}/${chapter}`,
      type: 'article',
    },
    alternates: { canonical: `/interlinear/${bookSlug}/${chapter}` },
  };
}

export default async function InterlinearChapterPage({ params }: PageProps) {
  const { book: bookSlug, chapter: chapterStr } = await params;
  const bookName = getBookName(bookSlug);
  const chapter = parseInt(chapterStr, 10);
  if (!bookName || isNaN(chapter)) notFound();

  const bookData = BIBLE_BOOKS.find(b => b.slug === bookSlug);
  if (!bookData || chapter < 1 || chapter > bookData.chapters) notFound();

  const isOT = isOldTestament(bookSlug);
  const lang = isOT ? 'Hebrew' : 'Greek';

  const verses = getInterlinearChapterVerses(bookSlug, chapter);
  if (verses.length === 0) notFound();

  // Prev/next chapter
  const prevChapter = chapter > 1 ? chapter - 1 : null;
  const nextChapter = chapter < bookData.chapters ? chapter + 1 : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${bookName} ${chapter} Interlinear Bible`,
    description: `Word-by-word ${lang} interlinear for ${bookName} chapter ${chapter}.`,
    url: `https://biblemaximum.com/interlinear/${bookSlug}/${chapter}`,
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Interlinear Bible', item: 'https://biblemaximum.com/interlinear' },
      { '@type': 'ListItem', position: 3, name: bookName, item: `https://biblemaximum.com/interlinear/${bookSlug}` },
      { '@type': 'ListItem', position: 4, name: `Chapter ${chapter}` },
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
              <Link href="/interlinear" className="hover:text-blue-600 transition-colors">Interlinear</Link>
              <span>/</span>
              <Link href={`/interlinear/${bookSlug}`} className="hover:text-blue-600 transition-colors">{bookName}</Link>
              <span>/</span>
              <span className="text-scripture font-medium">Chapter {chapter}</span>
            </nav>

            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase mb-4">
              {lang} Interlinear
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-scripture font-display mb-3">
              {bookName} {chapter} Interlinear
            </h1>
            <p className="text-lg text-primary-dark/70">
              {verses.length} verse{verses.length !== 1 ? 's' : ''} &middot; Word-by-word {lang} analysis
            </p>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="max-w-4xl mx-auto px-4 md:px-10 mt-[-1.5rem] relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href={`/${bookSlug}-${chapter}-quiz`}
              className="bg-blue-600 rounded-lg p-5 text-white shadow-lg flex items-center justify-between hover:bg-blue-700 transition-colors"
            >
              <div>
                <h3 className="font-bold text-lg">{bookName} {chapter} Quiz</h3>
                <p className="text-white/80 text-xs">Test your knowledge</p>
              </div>
              <span className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase">
                Start
              </span>
            </Link>
            <Link
              href={`/chapters/${bookSlug}/${chapter}`}
              className="bg-scripture rounded-lg p-5 text-white shadow-lg flex items-center justify-between hover:bg-scripture/90 transition-colors"
            >
              <div>
                <h3 className="font-bold text-lg">Read {bookName} {chapter}</h3>
                <p className="text-white/80 text-xs">Full chapter with commentary</p>
              </div>
              <span className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase">
                Read
              </span>
            </Link>
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-4 md:px-10 py-12">
          {/* Verse List */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-scripture font-display mb-4">Verses</h2>
            <div className="space-y-2">
              {verses.map(v => (
                <Link
                  key={v.verse}
                  href={`/interlinear/${bookSlug}/${chapter}/${v.verse}`}
                  className="flex items-start gap-3 bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full text-sm font-bold shrink-0 group-hover:bg-blue-200 transition-colors">
                    {v.verse}
                  </span>
                  <div>
                    <span className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                      {bookName} {chapter}:{v.verse}
                    </span>
                    <span className="block text-sm text-primary-dark/60 mt-0.5">
                      {v.preview}...
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Prev/Next Navigation */}
          <div className="flex items-center justify-between gap-4 mb-10">
            {prevChapter ? (
              <Link
                href={`/interlinear/${bookSlug}/${prevChapter}`}
                className="flex-1 bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="text-xs text-primary-dark/60">Previous Chapter</span>
                <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                  {bookName} {prevChapter}
                </span>
              </Link>
            ) : <div className="flex-1" />}
            {nextChapter ? (
              <Link
                href={`/interlinear/${bookSlug}/${nextChapter}`}
                className="flex-1 text-right bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="text-xs text-primary-dark/60">Next Chapter</span>
                <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                  {bookName} {nextChapter}
                </span>
              </Link>
            ) : <div className="flex-1" />}
          </div>

          {/* Internal Links */}
          <section className="bg-grace/10 border border-grace rounded-xl p-6">
            <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              <Link href={`/interlinear/${bookSlug}`} className="text-blue-600 hover:underline text-sm">
                All {bookName} Interlinear Chapters
              </Link>
              <Link href={`/${bookSlug}-${chapter}-quiz`} className="text-blue-600 hover:underline text-sm">
                {bookName} {chapter} Quiz
              </Link>
              <Link href={`/${bookSlug}-chapters`} className="text-blue-600 hover:underline text-sm">
                {bookName} Chapter Quizzes
              </Link>
              <Link href={`/chapters/${bookSlug}/${chapter}`} className="text-blue-600 hover:underline text-sm">
                Read {bookName} {chapter}
              </Link>
              <Link href={`/lexicon/browse/${isOT ? 'hebrew' : 'greek'}`} className="text-blue-600 hover:underline text-sm">
                {lang} Lexicon
              </Link>
              <Link href="/interlinear" className="text-blue-600 hover:underline text-sm">
                Interlinear Bible
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
