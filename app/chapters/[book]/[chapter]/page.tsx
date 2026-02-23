import { cache } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getChapterWithCommentary,
  getBookId,
  getBookName,
  formatReference,
  stripHtml,
} from '@/lib/bolls-api';
import { BIBLE_BOOKS } from '@/lib/bible-data';
import { BOOK_METADATA } from '@/lib/book-metadata';
import { StructuredData } from '@/components/StructuredData';
import { getKjvStudyChapterCommentary } from '@/lib/commentary-loader';
import { getChapterHeadings } from '@/lib/section-headings';
import { isRedLetter } from '@/lib/red-letter';
import { isPoetryChapter } from '@/lib/poetry-formatting';
import { getPlacesForChapter, formatPlaceTypeSingular } from '@/lib/geocoding-data';

interface ChapterPageProps {
  params: Promise<{
    book: string;
    chapter: string;
  }>;
}

const getChapterData = cache(async function getChapterData(book: string, chapter: number) {
  const bookId = getBookId(book);
  if (!bookId) return null;

  const bookInfo = BIBLE_BOOKS.find(b => b.slug === book);
  if (!bookInfo || chapter < 1 || chapter > bookInfo.chapters) return null;

  try {
    const verses = await getChapterWithCommentary('KJV', book, chapter);

    return {
      verses,
      bookName: getBookName(book),
      bookSlug: book,
      chapter,
      totalChapters: bookInfo.chapters,
      reference: formatReference(book, chapter),
    };
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { book, chapter } = resolvedParams;
  const chapterNum = parseInt(chapter, 10);

  const data = await getChapterData(book, chapterNum);
  if (!data) {
    return { title: 'Chapter Not Found' };
  }

  const meta = BOOK_METADATA[book];
  const title = `Read ${data.reference} | ${data.verses.length} Verses with Commentary and Cross-References | Bible Maximum`;
  const description = `Read ${data.reference} in the King James Version with verse-by-verse commentary, cross-references, and study notes. ${data.verses.length} verses with Matthew Henry commentary.`;

  return {
    title,
    description,
    keywords: [
      data.reference,
      `${data.bookName} chapter ${chapter}`,
      'Bible chapter',
      'KJV',
      'commentary',
      'cross-references',
      data.bookName,
      ...(meta?.keyThemes?.slice(0, 3) || []),
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/chapters/${book}/${chapter}`,
    },
    alternates: {
      canonical: `/chapters/${book}/${chapter}`,
    },
  };
}

export async function generateStaticParams() {
  // 1,189 pages each requiring external API call — generated on-demand via ISR
  return [];
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const resolvedParams = await params;
  const { book, chapter } = resolvedParams;
  const chapterNum = parseInt(chapter, 10);

  if (isNaN(chapterNum) || !getBookId(book)) {
    notFound();
  }

  const data = await getChapterData(book, chapterNum);
  if (!data) {
    notFound();
  }

  const kjvstudyCommentary = getKjvStudyChapterCommentary(book, chapterNum);
  const sectionHeadings = getChapterHeadings(book, chapterNum);
  const isPoetry = isPoetryChapter(book, chapterNum);

  const hasPrevChapter = chapterNum > 1;
  const hasNextChapter = chapterNum < data.totalChapters;
  const meta = BOOK_METADATA[book];

  // Estimate reading time (~200 words per minute, ~25 words per verse)
  const estimatedWords = data.verses.length * 25;
  const readingTime = Math.max(1, Math.round(estimatedWords / 200));

  // Schema markup
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.reference,
    description: `${data.reference} - ${data.verses.length} verses from the King James Version Bible`,
    author: { '@type': 'Organization', name: 'Bible Maximum' },
    publisher: { '@type': 'Organization', name: 'Bible Maximum' },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://biblemaximum.com/chapters/${book}/${chapter}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: data.bookName, item: `https://biblemaximum.com/${book}-chapters` },
      { '@type': 'ListItem', position: 3, name: `Chapter ${chapter}` },
    ],
  };

  return (
    <div className="min-h-screen bg-primary-light/30">
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />

      <nav className="bg-white border-b border-grace">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            </li>
            <li className="text-primary-dark/40">/</li>
            <li>
              <Link href={`/${book}-chapters`} className="text-blue-600 hover:underline">
                {data.bookName}
              </Link>
            </li>
            <li className="text-primary-dark/40">/</li>
            <li className="text-primary-dark/70">Chapter {chapter}</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Chapter Introduction */}
        {meta && (
          <div className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h2 className="text-lg font-bold text-scripture mb-2">About {data.bookName}</h2>
            <p className="text-primary-dark/80 text-sm leading-relaxed mb-3">
              {meta.summary}
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-primary-dark/60">
              <span>Author: <strong className="text-primary-dark/80">{meta.author}</strong></span>
              <span>Written: <strong className="text-primary-dark/80">{meta.dateWritten}</strong></span>
              <span>Reading time: <strong className="text-primary-dark/80">~{readingTime} min</strong></span>
              <span>Verses: <strong className="text-primary-dark/80">{data.verses.length}</strong></span>
            </div>
            {meta.keyThemes.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {meta.keyThemes.map(theme => (
                  <span key={theme} className="text-xs bg-blue-50 text-blue-700 rounded-full px-2 py-0.5">
                    {theme}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Geographic Context */}
        {(() => {
          const chapterPlaces = getPlacesForChapter(book, chapterNum);
          if (chapterPlaces.length === 0) return null;
          return (
            <div className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-scripture flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Places in This Chapter
                </h2>
                <Link
                  href={`/bible-geography/${book}/${chapterNum}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  View map &rarr;
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {chapterPlaces.slice(0, 8).map((place) => (
                  <Link
                    key={place.slug}
                    href={`/bible-places/${place.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-800 border border-green-200 rounded-full text-sm hover:bg-green-100 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {place.name}
                    <span className="text-green-600/60 text-xs">({formatPlaceTypeSingular(place.type)})</span>
                  </Link>
                ))}
                {chapterPlaces.length > 8 && (
                  <Link
                    href={`/bible-geography/${book}/${chapterNum}`}
                    className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm hover:bg-blue-100 transition-colors"
                  >
                    +{chapterPlaces.length - 8} more
                  </Link>
                )}
              </div>
            </div>
          );
        })()}

        <article className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden">
          <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-8">
            <p className="text-blue-100 text-sm font-medium mb-2">King James Version</p>
            <h1 className="text-3xl font-bold font-display">{data.reference}</h1>
            <p className="text-blue-100 mt-2">{data.verses.length} verses with commentary</p>
          </header>

          <div className="p-6 md:p-8">
            <div className="space-y-6">
              {data.verses.map((verse, index) => {
                const heading = sectionHeadings[verse.verse];
                const redLetter = isRedLetter(book, chapterNum, verse.verse);
                const isFirstHeading = heading && index === 0;

                return (
                  <div key={verse.pk}>
                    {heading && (
                      <h3 className={`text-lg font-bold text-scripture mb-3 ${isFirstHeading ? 'mt-0' : 'mt-8 pt-4 border-t border-grace/50'}`}>
                        {heading}
                      </h3>
                    )}
                    <div id={`verse-${verse.verse}`} className="group">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 flex flex-col items-center gap-1">
                          <Link
                            href={`/verses/${book}/${chapter}/${verse.verse}`}
                            className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm hover:bg-blue-200 transition-colors"
                            title={`Study ${data.bookName} ${chapter}:${verse.verse}`}
                          >
                            {verse.verse}
                          </Link>
                          <Link
                            href={`/cross-references/${book}/${chapter}/${verse.verse}`}
                            className="text-primary-dark/40 hover:text-blue-600 transition-colors"
                            title={`Cross-references for ${data.bookName} ${chapter}:${verse.verse}`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          </Link>
                        </div>
                        <div className="flex-1">
                          <p className={`text-lg leading-relaxed ${redLetter ? 'text-red-700' : 'text-scripture'} ${isPoetry ? 'pl-4 italic' : ''}`}>
                            {stripHtml(verse.text)}
                          </p>

                          {(kjvstudyCommentary?.[verse.verse] || verse.comment) && (
                            <details className="mt-3">
                              <summary className="text-sm text-blue-600 cursor-pointer hover:underline">
                                View commentary
                              </summary>
                              <div
                                className="mt-2 pl-4 border-l-2 border-grace text-sm text-primary-dark/70 prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: kjvstudyCommentary?.[verse.verse]?.analysis || verse.comment || '' }}
                              />
                            </details>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </article>

        <nav className="flex justify-between items-center mt-6">
          {hasPrevChapter ? (
            <Link
              href={`/chapters/${book}/${chapterNum - 1}`}
              className="flex items-center px-4 py-2 bg-white border border-grace rounded-lg hover:bg-primary-light/50 transition-colors"
            >
              <span className="mr-2">&larr;</span>
              <span className="text-sm text-primary-dark/70">Chapter {chapterNum - 1}</span>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href={`/${book}-chapters`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            All Chapters
          </Link>

          {hasNextChapter ? (
            <Link
              href={`/chapters/${book}/${chapterNum + 1}`}
              className="flex items-center px-4 py-2 bg-white border border-grace rounded-lg hover:bg-primary-light/50 transition-colors"
            >
              <span className="text-sm text-primary-dark/70">Chapter {chapterNum + 1}</span>
              <span className="ml-2">&rarr;</span>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {/* Test Your Knowledge */}
        <section className="mt-8 bg-white rounded-xl shadow-sm border border-grace p-6">
          <h2 className="text-lg font-bold text-scripture mb-4">Test Your Knowledge</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Link
              href={`/${book}-${chapter}-quiz`}
              className="flex items-center p-4 border border-grace rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div>
                <span className="text-blue-600 font-semibold block">{data.reference} Quiz</span>
                <span className="text-sm text-primary-dark/60">Test your knowledge of this chapter</span>
              </div>
            </Link>
            <Link
              href={`/${book}-quiz`}
              className="flex items-center p-4 border border-grace rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div>
                <span className="text-blue-600 font-semibold block">{data.bookName} Book Quiz</span>
                <span className="text-sm text-primary-dark/60">Comprehensive quiz for the entire book</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="mt-8 bg-grace/10 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {hasNextChapter && (
              <Link href={`/chapters/${book}/${chapterNum + 1}`} className="text-blue-600 hover:underline text-sm">
                Read {data.bookName} {chapterNum + 1}
              </Link>
            )}
            <Link href={`/${book}-chapters`} className="text-blue-600 hover:underline text-sm">
              All {data.bookName} Chapters
            </Link>
            <Link href={`/${book}-${chapter}-quiz`} className="text-blue-600 hover:underline text-sm">
              {data.reference} Quiz
            </Link>
            <Link href={`/${book}-quiz`} className="text-blue-600 hover:underline text-sm">
              Complete {data.bookName} Quiz
            </Link>
            <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">
              All Bible Quizzes
            </Link>
            <Link href="/people" className="text-blue-600 hover:underline text-sm">
              Bible Characters
            </Link>
            <Link href="/topics" className="text-blue-600 hover:underline text-sm">
              Bible Topics
            </Link>
            <Link href="/nave-topics" className="text-blue-600 hover:underline text-sm">
              Nave&apos;s Topical Bible
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
