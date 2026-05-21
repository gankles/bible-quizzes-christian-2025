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
import { getKjvStudyChapterCommentary, getAllVerseCommentaries } from '@/lib/commentary-loader';
import { getChapterHeadings } from '@/lib/section-headings';
import { isRedLetter } from '@/lib/red-letter';
import { isPoetryChapter } from '@/lib/poetry-formatting';
import { getPlacesForChapter, formatPlaceTypeSingular } from '@/lib/geocoding-data';

export const revalidate = 86400 // 24 hours

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
    <div className="min-h-screen" style={{background: 'var(--bg-cream)'}}>
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />

      <nav className="bg-white border-b border-grace">
        <ol className="editorial-breadcrumbs">
          <li>
            <Link href="/" className="text-sacred hover:underline">Home</Link>
          </li>
          <li className="text-ink-light">/</li>
          <li>
            <Link href={`/${book}-chapters`} className="text-sacred hover:underline">
              {data.bookName}
            </Link>
          </li>
          <li className="text-ink-light">/</li>
          <li className="text-ink-muted">Chapter {chapter}</li>
        </ol>
      </nav>

      {/* Editorial Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <span className="meta-eyebrow">{data.bookName} · Chapter {chapter}</span>
        <h1 className="editorial-h1">{data.reference}</h1>
        {meta && <p className="editorial-deck">{meta.summary?.substring(0, 160)}{meta.summary?.length > 160 ? '...' : ''}</p>}
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-16">
        <div className="chapter-grid">

          {/* LEFT COLUMN: verses */}
          <div className="chapter-main-text">
            <article>
              {data.verses.map((verse, index) => {
                const heading = sectionHeadings[verse.verse];
                const redLetter = isRedLetter(book, chapterNum, verse.verse);
                const isFirstHeading = heading && index === 0;
                const verseCommentaries = getAllVerseCommentaries(book, chapterNum, verse.verse);
                const kjvStudyEntry = kjvstudyCommentary?.[verse.verse];

                return (
                  <div key={verse.pk}>
                    {heading && (
                      <h3 className={`text-lg font-bold text-scripture mb-3 ${isFirstHeading ? 'mt-0' : 'mt-8 pt-4 border-t border-grace/50'}`}>
                        {heading}
                      </h3>
                    )}
                    <div id={`verse-${verse.verse}`} className={`chapter-verse-row${isPoetry ? ' poetry' : ''}`}>
                      <span className="chapter-verse-number">
                        <Link
                          href={`/verses/${book}/${chapter}/${verse.verse}`}
                          className="hover:text-sacred transition-colors"
                          title={`Study ${data.bookName} ${chapter}:${verse.verse}`}
                        >
                          {verse.verse}
                        </Link>
                      </span>
                      <div className="flex-1">
                        <p className={`chapter-verse-body${redLetter ? ' text-red-600' : ''}`}>
                          {stripHtml(verse.text)}
                        </p>
                        <Link
                          href={`/cross-references/${book}/${chapter}/${verse.verse}`}
                          className="inline-block mt-1 text-ink-light hover:text-sacred transition-colors"
                          title={`Cross-references for ${data.bookName} ${chapter}:${verse.verse}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        </Link>

                        {(kjvStudyEntry || verseCommentaries.length > 0 || verse.comment) && (
                          <details className="mt-3">
                            <summary className="text-sm text-sacred cursor-pointer hover:underline">
                              View commentary{verseCommentaries.length > 1 ? ` (${verseCommentaries.length} sources)` : ''}
                            </summary>
                            <div className="mt-2 space-y-4">
                              {/* KJV Study (inline, if available and not already in verseCommentaries) */}
                              {kjvStudyEntry && !verseCommentaries.some(c => c.source === 'KJV Study Commentary') && (
                                <div className="pl-4 border-l-2 border-sacred/20">
                                  <p className="text-xs font-semibold text-sacred mb-1">KJV Study Commentary</p>
                                  <div
                                    className="text-sm text-ink-muted prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: kjvStudyEntry.analysis }}
                                  />
                                </div>
                              )}
                              {/* SWORD commentaries */}
                              {verseCommentaries.map((c, ci) => (
                                <div key={ci} className="pl-4 border-l-2 border-grace">
                                  <p className="text-xs font-semibold text-ink-muted mb-1">{c.source}</p>
                                  <div className="text-sm text-ink-muted leading-relaxed whitespace-pre-line">
                                    {c.text.length > 400 ? c.text.substring(0, 400) + '...' : c.text}
                                  </div>
                                  {c.text.length > 400 && (
                                    <Link
                                      href={`/verses/${book}/${chapter}/${verse.verse}`}
                                      className="text-xs text-sacred hover:underline mt-1 inline-block"
                                    >
                                      Read full commentary →
                                    </Link>
                                  )}
                                </div>
                              ))}
                              {/* Bolls API commentary fallback */}
                              {verseCommentaries.length === 0 && !kjvStudyEntry && verse.comment && (
                                <div
                                  className="pl-4 border-l-2 border-grace text-sm text-ink-muted prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{ __html: verse.comment }}
                                />
                              )}
                            </div>
                          </details>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </article>

            {/* Chapter navigation */}
            <nav className="flex justify-between items-center mt-10">
              {hasPrevChapter ? (
                <Link
                  href={`/chapters/${book}/${chapterNum - 1}`}
                  className="flex items-center px-4 py-2 bg-white border border-grace rounded-lg hover:bg-primary-light/50 transition-colors"
                >
                  <span className="mr-2">&larr;</span>
                  <span className="text-sm text-ink-muted">Chapter {chapterNum - 1}</span>
                </Link>
              ) : (
                <div />
              )}

              <Link
                href={`/${book}-chapters`}
                className="px-4 py-2 bg-scripture text-white rounded-lg hover:bg-scripture/80 transition-colors"
              >
                All Chapters
              </Link>

              {hasNextChapter ? (
                <Link
                  href={`/chapters/${book}/${chapterNum + 1}`}
                  className="flex items-center px-4 py-2 bg-white border border-grace rounded-lg hover:bg-primary-light/50 transition-colors"
                >
                  <span className="text-sm text-ink-muted">Chapter {chapterNum + 1}</span>
                  <span className="ml-2">&rarr;</span>
                </Link>
              ) : (
                <div />
              )}
            </nav>

            {/* Internal Links Section */}
            <section className="mt-8 bg-grace/10 border border-grace rounded-xl p-6">
              <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {hasNextChapter && (
                  <Link href={`/chapters/${book}/${chapterNum + 1}`} className="text-sacred hover:underline text-sm">
                    Read {data.bookName} {chapterNum + 1}
                  </Link>
                )}
                <Link href={`/${book}-chapters`} className="text-sacred hover:underline text-sm">
                  All {data.bookName} Chapters
                </Link>
                <Link href={`/${book}-${chapter}-quiz`} className="text-sacred hover:underline text-sm">
                  {data.reference} Quiz
                </Link>
                <Link href={`/${book}-quiz`} className="text-sacred hover:underline text-sm">
                  Complete {data.bookName} Quiz
                </Link>
                <Link href="/bible-quizzes" className="text-sacred hover:underline text-sm">
                  All Bible Quizzes
                </Link>
                <Link href="/people" className="text-sacred hover:underline text-sm">
                  Bible Characters
                </Link>
                <Link href="/topics" className="text-sacred hover:underline text-sm">
                  Bible Topics
                </Link>
                <Link href="/nave-topics" className="text-sacred hover:underline text-sm">
                  Nave&apos;s Topical Bible
                </Link>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: sidebar */}
          <div className="chapter-sidebar">
            {meta && (
              <div className="sidebar-widget">
                <h4 className="sidebar-title">Book Overview</h4>
                <p className="text-sm text-ink-muted mb-3">{meta.summary}</p>
                <p className="text-xs text-ink-muted">Author: <strong className="text-scripture">{meta.author}</strong></p>
                <p className="text-xs text-ink-muted mt-1">Written: <strong className="text-scripture">{meta.dateWritten}</strong></p>
                <p className="text-xs text-ink-muted mt-1">Reading time: <strong className="text-scripture">~{readingTime} min</strong></p>
                <p className="text-xs text-ink-muted mt-1">Verses: <strong className="text-scripture">{data.verses.length}</strong></p>
              </div>
            )}

            {meta?.keyThemes?.length > 0 && (
              <div className="sidebar-widget">
                <h4 className="sidebar-title">Key Themes</h4>
                <div className="flex flex-wrap gap-2">
                  {meta.keyThemes.map(theme => (
                    <span key={theme} className="theme-tag">{theme}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Geographic Context */}
            {(() => {
              const chapterPlaces = getPlacesForChapter(book, chapterNum);
              if (chapterPlaces.length === 0) return null;
              return (
                <div className="sidebar-widget">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="sidebar-title mb-0">Places in This Chapter</h4>
                    <Link
                      href={`/bible-geography/${book}/${chapterNum}`}
                      className="text-xs text-sacred hover:underline"
                    >
                      View map &rarr;
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {chapterPlaces.slice(0, 8).map((place) => (
                      <Link
                        key={place.slug}
                        href={`/bible-places/${place.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sacred-light text-scripture border border-sacred/20 rounded-full text-sm hover:bg-primary-light transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {place.name}
                        <span className="text-sacred/60 text-xs">({formatPlaceTypeSingular(place.type)})</span>
                      </Link>
                    ))}
                    {chapterPlaces.length > 8 && (
                      <Link
                        href={`/bible-geography/${book}/${chapterNum}`}
                        className="inline-flex items-center px-3 py-1.5 bg-sacred-light text-scripture border border-sacred/20 rounded-full text-sm hover:bg-primary-light transition-colors"
                      >
                        +{chapterPlaces.length - 8} more
                      </Link>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Quiz CTA */}
            <div className="sidebar-widget">
              <h4 className="sidebar-title">Take the Quiz</h4>
              <Link href={`/${book}-${chapter}-quiz`} className="block text-sm text-sacred hover:text-gold-dark font-semibold mt-1">
                {data.bookName} {chapter} Quiz →
              </Link>
              <Link href={`/${book}-quiz`} className="block text-sm text-sacred hover:text-gold-dark font-semibold mt-2">
                Complete {data.bookName} Quiz →
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
