import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BIBLE_BOOKS, getBookBySlug } from '@/lib/bible-data';
import { getBookMetadata } from '@/lib/book-metadata';
import { loadChapterBreakdown, getChapterBreakdown, loadChapterSummary } from '@/lib/chapter-breakdowns';
import { getBookIntroduction } from '@/lib/book-introductions';
import { getDevotionalsByBook } from '@/lib/devotionals-data';

interface ChapterSummaryPageProps {
  params: Promise<{ book: string; chapter: string }>;
}

export async function generateStaticParams() {
  const params: { book: string; chapter: string }[] = [];
  for (const book of BIBLE_BOOKS) {
    const breakdowns = loadChapterBreakdown(book.slug);
    if (!breakdowns) continue;
    for (const ch of Object.keys(breakdowns)) {
      params.push({ book: book.slug, chapter: ch });
    }
  }
  return params;
}

export async function generateMetadata({ params }: ChapterSummaryPageProps): Promise<Metadata> {
  const { book, chapter } = await params;
  const bookData = getBookBySlug(book);
  const chapterNum = parseInt(chapter);
  if (!bookData || isNaN(chapterNum)) return { title: 'Not Found' };

  const breakdown = getChapterBreakdown(book, chapterNum);
  if (!breakdown) return { title: 'Not Found' };

  const summary = loadChapterSummary(book, chapterNum);
  const meta = getBookMetadata(book);
  const chTitle = summary?.title || breakdown.title;
  const title = `${bookData.name} ${chapterNum} Summary: ${chTitle} | Bible Study Guide | Bible Maximum`;
  const desc = summary?.shortSummary || `${bookData.name} chapter ${chapterNum} - "${breakdown.title}." ${breakdown.keyEvent}.`;
  const description = `${desc} ${breakdown.verses} verses. Author: ${meta?.author || 'Unknown'}.`;

  return {
    title,
    description,
    keywords: [
      `${bookData.name} ${chapterNum} summary`, `${bookData.name} chapter ${chapterNum}`,
      `${bookData.name} ${chapterNum} Bible study`, `${bookData.name} ${chapterNum} explained`,
      chTitle, `${bookData.name} overview`,
    ],
    openGraph: { title, description, type: 'article', url: `/bible-chapter-summaries/${book}/${chapter}` },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: `/bible-chapter-summaries/${book}/${chapter}` },
  };
}

function getReadingTime(verses: number): number {
  return Math.max(1, Math.round(verses * 0.15));
}

export default async function ChapterSummaryPage({ params }: ChapterSummaryPageProps) {
  const { book, chapter } = await params;
  const chapterNum = parseInt(chapter);
  const bookData = getBookBySlug(book);
  if (!bookData || isNaN(chapterNum)) notFound();

  const breakdowns = loadChapterBreakdown(book);
  const currentChapter = breakdowns?.[String(chapterNum)];
  if (!breakdowns || !currentChapter) notFound();

  const meta = getBookMetadata(book);
  const intro = getBookIntroduction(book);
  const summary = loadChapterSummary(book, chapterNum);

  // Previous and next chapters
  const prevChapter = chapterNum > 1 ? breakdowns[String(chapterNum - 1)] : null;
  const nextChapter = breakdowns[String(chapterNum + 1)] || null;

  // Find the outline section this chapter belongs to (from book-level metadata)
  let outlineSection: { heading: string; reference: string; description: string } | null = null;
  if (meta?.outline) {
    for (const section of meta.outline) {
      const match = section.reference.match(/^(\d+)/);
      const endMatch = section.reference.match(/[-–](\d+)/);
      if (match) {
        const start = parseInt(match[1]);
        const end = endMatch ? parseInt(endMatch[1]) : start;
        if (chapterNum >= start && chapterNum <= end) {
          outlineSection = section;
          break;
        }
      }
    }
  }

  // Fallback: detailed outline from book introduction
  let detailedOutline: { section: string; chapters: string; description: string } | null = null;
  if (!summary && intro?.outline) {
    for (const section of intro.outline) {
      const rangeMatch = section.chapters.match(/^(\d+)/);
      const endRangeMatch = section.chapters.match(/[-–](\d+)/);
      if (rangeMatch) {
        const start = parseInt(rangeMatch[1]);
        const end = endRangeMatch ? parseInt(endRangeMatch[1]) : start;
        if (chapterNum >= start && chapterNum <= end) {
          detailedOutline = section;
          break;
        }
      }
    }
  }

  // Key verses: prefer from rich summary, fall back to book-level famous verses
  const keyVerses = summary?.keyVerses || [];
  const bookLevelVerses = (!summary && meta?.famousVerses?.filter((v) => {
    const match = v.reference.match(/(\d+):/);
    return match && parseInt(match[1]) === chapterNum;
  })) || [];

  // Nearby chapters
  const nearbyChapters: { num: number; title: string }[] = [];
  for (let i = Math.max(1, chapterNum - 2); i <= Math.min(bookData.chapters, chapterNum + 2); i++) {
    if (i === chapterNum) continue;
    const ch = breakdowns[String(i)];
    if (ch) nearbyChapters.push({ num: i, title: ch.title });
  }

  const readTime = getReadingTime(currentChapter.verses);
  const chTitle = summary?.title || currentChapter.title;

  return (
    <div className="min-h-screen bg-primary-light/30">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-grace">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm flex-wrap">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li aria-hidden="true" className="text-primary-dark/40">/</li>
            <li><Link href="/bible-chapter-summaries" className="text-blue-600 hover:underline">Chapter Summaries</Link></li>
            <li aria-hidden="true" className="text-primary-dark/40">/</li>
            <li><Link href={`/bible-chapter-summaries/${book}`} className="text-blue-600 hover:underline">{bookData.name}</Link></li>
            <li aria-hidden="true" className="text-primary-dark/40">/</li>
            <li aria-current="page" className="text-primary-dark/70">Chapter {chapterNum}</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Prev/Next Navigation (top) */}
        {(prevChapter || nextChapter) && (
          <div className="flex items-center justify-between mb-4">
            {prevChapter ? (
              <Link href={`/bible-chapter-summaries/${book}/${chapterNum - 1}`} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Chapter {chapterNum - 1}
              </Link>
            ) : <div />}
            {nextChapter ? (
              <Link href={`/bible-chapter-summaries/${book}/${chapterNum + 1}`} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                Chapter {chapterNum + 1}
                <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            ) : <div />}
          </div>
        )}

        {/* Hero */}
        <article className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mb-6">
          <div className="relative h-44 md:h-52 bg-gradient-to-r from-amber-800 to-amber-900">
            <Image
              src="/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png"
              alt={`${bookData.name} ${chapterNum} - ${chTitle}`}
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded">
                  {bookData.testament === 'old' ? 'Old Testament' : 'New Testament'}
                </span>
                {outlineSection && (
                  <span className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded">
                    {outlineSection.heading}
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
                {bookData.name} {chapterNum}: {chTitle}
              </h1>
              <p className="text-amber-100/90 mt-1 text-sm md:text-base">
                {summary?.shortSummary || currentChapter.keyEvent}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className={`grid ${summary?.timeline ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'} divide-x divide-grace`}>
            <div className="p-3 md:p-4 text-center">
              <p className="text-xl font-bold text-blue-600">{currentChapter.verses}</p>
              <p className="text-xs text-primary-dark/70">Verses</p>
            </div>
            <div className="p-3 md:p-4 text-center">
              <p className="text-xl font-bold text-blue-600">~{readTime} min</p>
              <p className="text-xs text-primary-dark/70">Read Time</p>
            </div>
            <div className="p-3 md:p-4 text-center">
              <p className="text-lg font-semibold text-scripture">{meta?.author || 'Unknown'}</p>
              <p className="text-xs text-primary-dark/70">Author</p>
            </div>
            {summary?.timeline && (
              <div className="hidden md:block p-3 md:p-4 text-center">
                <p className="text-sm font-semibold text-scripture leading-tight">{summary.timeline}</p>
                <p className="text-xs text-primary-dark/70">Timeline</p>
              </div>
            )}
          </div>
        </article>

        {/* Timeline (mobile, only if rich data exists) */}
        {summary?.timeline && (
          <div className="md:hidden bg-white rounded-xl shadow-sm border border-grace p-4 mb-6 flex items-center gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-xs text-primary-dark/50 uppercase tracking-wide">Timeline</p>
              <p className="text-sm font-medium text-scripture">{summary.timeline}</p>
            </div>
          </div>
        )}

        {/* === RICH CONTENT (when AI data exists) === */}

        {/* Key Characters */}
        {summary?.keyCharacters && summary.keyCharacters.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h2 className="text-xl font-bold text-scripture mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-600" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Key Characters
            </h2>
            <div className="space-y-3">
              {summary.keyCharacters.map((char, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                    {char.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-scripture text-sm">{char.name}</h3>
                    <p className="text-sm text-primary-dark/70">{char.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Definitions */}
        {summary?.definitions && summary.definitions.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h2 className="text-xl font-bold text-scripture mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-emerald-600" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Key Terms
            </h2>
            <dl className="space-y-3">
              {summary.definitions.map((def, i) => (
                <div key={i} className="border-l-4 border-emerald-400 pl-3">
                  <dt className="font-semibold text-scripture text-sm">{def.term}</dt>
                  <dd className="text-sm text-primary-dark/70">{def.definition}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Detailed Chapter Outline (rich data) */}
        {summary?.outline && summary.outline.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h2 className="text-xl font-bold text-scripture mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Chapter Outline
            </h2>
            <div className="space-y-4">
              {summary.outline.map((section, i) => (
                <div key={i} className="border-l-4 border-blue-500 pl-4 py-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-scripture text-sm">{section.heading}</h3>
                    <span className="flex-shrink-0 text-xs text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                      {section.verseRange}
                    </span>
                  </div>
                  <p className="text-sm text-primary-dark/70 leading-relaxed">{section.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Fallback: Book-level summary when no rich data */}
        {!summary && detailedOutline && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h2 className="text-xl font-bold text-scripture mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Summary
            </h2>
            <div className="border-l-4 border-blue-500 pl-4 mb-4">
              <h3 className="font-semibold text-scripture mb-1">{detailedOutline.section}</h3>
              <span className="text-xs text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                {bookData.name} {detailedOutline.chapters}
              </span>
            </div>
            <p className="text-primary-dark/80 leading-relaxed">{detailedOutline.description}</p>
          </section>
        )}

        {/* Fallback: Book-level outline context */}
        {!summary && !detailedOutline && outlineSection && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h2 className="text-xl font-bold text-scripture mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Where This Chapter Fits
            </h2>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-scripture mb-1">{outlineSection.heading}</h3>
              <span className="text-xs text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                {bookData.name} {outlineSection.reference}
              </span>
              <p className="text-primary-dark/70 text-sm mt-2">{outlineSection.description}</p>
            </div>
          </section>
        )}

        {/* Key Verses (rich data) */}
        {keyVerses.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h2 className="text-xl font-bold text-scripture mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-amber-500" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              Key Verses
            </h2>
            <div className="space-y-3">
              {keyVerses.map((verse, index) => {
                const refParts = verse.reference.match(/(\d+):(\d+)/);
                const verseLink = refParts ? `/verses/${book}/${refParts[1]}/${refParts[2]}` : null;
                return (
                  <div key={index} className="bg-primary-light/30 rounded-lg p-4">
                    <blockquote className="text-primary-dark/80 italic mb-2 font-serif">
                      &ldquo;{verse.text}&rdquo;
                    </blockquote>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <cite className="text-blue-600 font-medium text-sm not-italic">{verse.reference}</cite>
                      <div className="flex items-center gap-3">
                        {'significance' in verse && (
                          <span className="text-xs text-primary-dark/60">{verse.significance}</span>
                        )}
                        {verseLink && (
                          <Link href={verseLink} className="text-xs text-blue-600 hover:text-blue-800 hover:underline whitespace-nowrap">
                            Study this verse &rarr;
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Fallback: Book-level famous verses in this chapter */}
        {keyVerses.length === 0 && bookLevelVerses.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h2 className="text-xl font-bold text-scripture mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-amber-500" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              Key Verses in This Chapter
            </h2>
            <div className="space-y-3">
              {bookLevelVerses.map((verse, index) => (
                <div key={index} className="bg-primary-light/30 rounded-lg p-4">
                  <blockquote className="text-primary-dark/80 italic mb-2 font-serif">&ldquo;{verse.text}&rdquo;</blockquote>
                  <cite className="text-blue-600 font-medium text-sm not-italic">{verse.reference}</cite>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Mid-Content Quiz CTA */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-blue-800">
            How well do you know {bookData.name} {chapterNum}?
          </p>
          <Link
            href={`/${book}-${chapterNum}-quiz`}
            className="flex-shrink-0 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            Take the Quiz
          </Link>
        </div>

        {/* Application (rich data) */}
        {summary?.application && summary.application.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h2 className="text-xl font-bold text-scripture mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-rose-600" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Practical Application
            </h2>
            <ul className="space-y-3">
              {summary.application.map((point, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-primary-dark/80 leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Key Themes (book-level, always shown) */}
        {meta?.keyThemes && meta.keyThemes.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h2 className="text-xl font-bold text-scripture mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-emerald-600" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Themes in {bookData.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {meta.keyThemes.slice(0, 6).map((theme, index) => {
                const colors = [
                  'bg-blue-100 text-blue-800 border-blue-200',
                  'bg-emerald-100 text-emerald-800 border-emerald-200',
                  'bg-amber-100 text-amber-800 border-amber-200',
                  'bg-purple-100 text-purple-800 border-purple-200',
                  'bg-rose-100 text-rose-800 border-rose-200',
                  'bg-cyan-100 text-cyan-800 border-cyan-200',
                ];
                return (
                  <span key={index} className={`px-3 py-1 rounded-full text-sm font-medium border ${colors[index % colors.length]}`}>
                    {theme}
                  </span>
                );
              })}
            </div>
          </section>
        )}

        {/* Test Your Knowledge CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-sm p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Test Your Knowledge
          </h2>
          <p className="text-blue-100 mb-4">
            You just read the summary of {bookData.name} {chapterNum}. See how much you retained with our free quiz.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/${book}-${chapterNum}-quiz`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Take the {bookData.name} {chapterNum} Quiz
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
            <Link
              href={`/${book}-quiz`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors text-sm"
            >
              Full {bookData.name} Book Quiz (25 Questions)
            </Link>
          </div>
        </section>

        {/* Related Chapters */}
        {nearbyChapters.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h2 className="text-xl font-bold text-scripture mb-4">Related Chapters</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {nearbyChapters.map((ch) => (
                <Link
                  key={ch.num}
                  href={`/bible-chapter-summaries/${book}/${ch.num}`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-grace hover:border-blue-300 hover:bg-primary-light/30 transition-all"
                >
                  <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    {ch.num}
                  </span>
                  <div className="min-w-0">
                    <span className="font-medium text-scripture text-sm block">{bookData.name} {ch.num}</span>
                    <span className="text-xs text-primary-dark/60 truncate block">{ch.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Internal Links */}
        <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
          <h2 className="text-xl font-bold text-scripture mb-4">More on {bookData.name}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href={`/${book}-${chapterNum}-quiz`} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all">
              <div>
                <span className="text-blue-700 font-semibold text-sm block">Take the Chapter {chapterNum} Quiz</span>
                <span className="text-xs text-blue-600/70">Test your knowledge with 60 questions</span>
              </div>
              <span className="text-blue-600">&rarr;</span>
            </Link>
            <Link href={`/bible-geography/${book}/${chapterNum}`} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg hover:border-green-400 hover:shadow-sm transition-all">
              <div>
                <span className="text-green-700 font-semibold text-sm block">Chapter {chapterNum} Places & Map</span>
                <span className="text-xs text-green-600/70">Explore locations in this chapter</span>
              </div>
              <span className="text-green-600">&rarr;</span>
            </Link>
            <Link href={`/bible-chapter-summaries/${book}`} className="flex items-center justify-between p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <div>
                <span className="text-blue-600 font-semibold text-sm block">All Chapter Summaries</span>
                <span className="text-xs text-primary-dark/60">{bookData.chapters} chapters overview</span>
              </div>
              <span className="text-blue-600">&rarr;</span>
            </Link>
            <Link href={`/${book}-chapters`} className="flex items-center justify-between p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <div>
                <span className="text-blue-600 font-semibold text-sm block">All Chapter Quizzes</span>
                <span className="text-xs text-primary-dark/60">Browse all {bookData.name} quizzes</span>
              </div>
              <span className="text-blue-600">&rarr;</span>
            </Link>
            <Link href={`/${book}-quiz`} className="flex items-center justify-between p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <div>
                <span className="text-blue-600 font-semibold text-sm block">{bookData.name} Book Quiz</span>
                <span className="text-xs text-primary-dark/60">25 comprehensive questions</span>
              </div>
              <span className="text-blue-600">&rarr;</span>
            </Link>
            <Link href={`/books/${book}`} className="flex items-center justify-between p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <div>
                <span className="text-blue-600 font-semibold text-sm block">Book Introduction</span>
                <span className="text-xs text-primary-dark/60">Author, themes, study guide</span>
              </div>
              <span className="text-blue-600">&rarr;</span>
            </Link>
          </div>
        </section>

        {/* Cross-Template Links */}
        <section className="bg-grace/10 border border-grace rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Explore Related Content</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href={`/bible-geography/${book}/${chapterNum}`} className="text-blue-600 hover:underline text-sm">
              {bookData.name} {chapterNum} Geography &amp; Map
            </Link>
            <Link href={`/bible-geography-quiz/${book}`} className="text-blue-600 hover:underline text-sm">
              {bookData.name} Geography Quiz
            </Link>
            <Link href="/character-quiz" className="text-blue-600 hover:underline text-sm">
              Bible Character Quizzes
            </Link>
            <Link href="/characters-by-topic" className="text-blue-600 hover:underline text-sm">
              Characters by Topic
            </Link>
            <Link href="/commandments/topic" className="text-blue-600 hover:underline text-sm">
              Commandments by Topic
            </Link>
            {(() => {
              const devs = getDevotionalsByBook(book).slice(0, 1);
              return devs.length > 0 ? (
                <Link href={`/devotionals/${devs[0].slug}`} className="text-blue-600 hover:underline text-sm">
                  {bookData.name} Devotional
                </Link>
              ) : null;
            })()}
            <Link href="/devotionals" className="text-blue-600 hover:underline text-sm">
              Daily Devotionals
            </Link>
            <Link href="/bible-places/era" className="text-blue-600 hover:underline text-sm">
              Places by Historical Era
            </Link>
          </div>
        </section>

        {/* Prev/Next Navigation (bottom) */}
        {(prevChapter || nextChapter) && (
          <div className="flex items-center justify-between gap-4">
            {prevChapter ? (
              <Link href={`/bible-chapter-summaries/${book}/${chapterNum - 1}`} className="flex-1 flex items-center gap-3 p-4 bg-white border border-grace rounded-xl hover:border-blue-300 transition-colors">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                <div className="min-w-0">
                  <span className="text-xs text-primary-dark/50 block">Previous</span>
                  <span className="font-medium text-scripture text-sm block truncate">Ch. {chapterNum - 1}: {prevChapter.title}</span>
                </div>
              </Link>
            ) : <div className="flex-1" />}
            {nextChapter ? (
              <Link href={`/bible-chapter-summaries/${book}/${chapterNum + 1}`} className="flex-1 flex items-center justify-end gap-3 p-4 bg-white border border-grace rounded-xl hover:border-blue-300 transition-colors text-right">
                <div className="min-w-0">
                  <span className="text-xs text-primary-dark/50 block">Next</span>
                  <span className="font-medium text-scripture text-sm block truncate">Ch. {chapterNum + 1}: {nextChapter.title}</span>
                </div>
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            ) : <div className="flex-1" />}
          </div>
        )}

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: `${bookData.name} ${chapterNum}: ${chTitle} - Chapter Summary & Study Guide`,
              description: summary?.shortSummary || currentChapter.keyEvent,
              datePublished: '2025-02-01',
              dateModified: '2025-02-22',
              author: { '@type': 'Organization', name: 'Bible Maximum' },
              publisher: {
                '@type': 'Organization',
                name: 'Bible Maximum',
                logo: { '@type': 'ImageObject', url: 'https://biblemaximum.com/images/logo.png' },
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://biblemaximum.com/bible-chapter-summaries/${book}/${chapter}`,
              },
              isPartOf: {
                '@type': 'Article',
                name: `${bookData.name} Chapter Summaries`,
                url: `https://biblemaximum.com/bible-chapter-summaries/${book}`,
              },
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
                  { '@type': 'ListItem', position: 2, name: 'Chapter Summaries', item: 'https://biblemaximum.com/bible-chapter-summaries' },
                  { '@type': 'ListItem', position: 3, name: bookData.name, item: `https://biblemaximum.com/bible-chapter-summaries/${book}` },
                  { '@type': 'ListItem', position: 4, name: `Chapter ${chapterNum}`, item: `https://biblemaximum.com/bible-chapter-summaries/${book}/${chapter}` },
                ],
              },
            }),
          }}
        />
      </main>
    </div>
  );
}
