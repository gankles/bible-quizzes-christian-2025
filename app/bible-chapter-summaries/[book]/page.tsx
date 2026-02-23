import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BIBLE_BOOKS, getBookBySlug } from '@/lib/bible-data';
import { getBookMetadata } from '@/lib/book-metadata';
import { loadChapterBreakdown, getTotalVerses } from '@/lib/chapter-breakdowns';
import { getBookIntroduction } from '@/lib/book-introductions';

interface BookSummaryPageProps {
  params: Promise<{ book: string }>;
}

export async function generateStaticParams() {
  return BIBLE_BOOKS.map((book) => ({ book: book.slug }));
}

export async function generateMetadata({ params }: BookSummaryPageProps): Promise<Metadata> {
  const { book } = await params;
  const bookData = getBookBySlug(book);
  if (!bookData) return { title: 'Book Not Found' };

  const meta = getBookMetadata(book);
  const chapters = bookData.chapters;
  const title = `${bookData.name} Chapter Summaries | All ${chapters} Chapters Overview | Bible Maximum`;
  const description = `Complete chapter-by-chapter summary of ${bookData.name}. Overview of all ${chapters} chapters with titles, key events, and verse counts. Author: ${meta?.author || 'Unknown'}. ${meta?.keyThemes?.slice(0, 3).join(', ') || ''}.`;

  return {
    title,
    description,
    keywords: [
      `${bookData.name} chapter summaries`, `${bookData.name} overview`, `${bookData.name} Bible summary`,
      `${bookData.name} chapters`, `Book of ${bookData.name}`, `${bookData.name} study guide`,
      ...(meta?.keyThemes?.slice(0, 4) || []),
    ],
    openGraph: { title, description, type: 'article', url: `/bible-chapter-summaries/${book}` },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: `/bible-chapter-summaries/${book}` },
  };
}

export default async function BookSummaryPage({ params }: BookSummaryPageProps) {
  const { book } = await params;
  const bookData = getBookBySlug(book);
  if (!bookData) notFound();

  const meta = getBookMetadata(book);
  const breakdowns = loadChapterBreakdown(book);
  const intro = getBookIntroduction(book);

  if (!breakdowns) notFound();

  const totalVerses = getTotalVerses(breakdowns);
  const chapterNumbers = Object.keys(breakdowns).map(Number).sort((a, b) => a - b);

  // Find which outline section a chapter belongs to
  function getOutlineForChapter(chapter: number): string | null {
    if (!meta?.outline) return null;
    for (const section of meta.outline) {
      const match = section.reference.match(/^(\d+)/);
      const endMatch = section.reference.match(/[-–](\d+)/);
      if (match) {
        const start = parseInt(match[1]);
        const end = endMatch ? parseInt(endMatch[1]) : start;
        if (chapter >= start && chapter <= end) return section.heading;
      }
    }
    return null;
  }

  // Group chapters by outline section
  const groupedChapters: { heading: string; chapters: number[] }[] = [];
  let currentHeading = '';
  for (const ch of chapterNumbers) {
    const heading = getOutlineForChapter(ch) || '';
    if (heading !== currentHeading) {
      currentHeading = heading;
      groupedChapters.push({ heading, chapters: [] });
    }
    groupedChapters[groupedChapters.length - 1].chapters.push(ch);
  }

  const themeColors = [
    'bg-blue-100 text-blue-800 border-blue-200',
    'bg-emerald-100 text-emerald-800 border-emerald-200',
    'bg-amber-100 text-amber-800 border-amber-200',
    'bg-purple-100 text-purple-800 border-purple-200',
    'bg-rose-100 text-rose-800 border-rose-200',
    'bg-cyan-100 text-cyan-800 border-cyan-200',
  ];

  return (
    <div className="min-h-screen bg-primary-light/30">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-grace">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li aria-hidden="true" className="text-primary-dark/40">/</li>
            <li><Link href="/bible-chapter-summaries" className="text-blue-600 hover:underline">Chapter Summaries</Link></li>
            <li aria-hidden="true" className="text-primary-dark/40">/</li>
            <li aria-current="page" className="text-primary-dark/70">{bookData.name}</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero */}
        <article className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mb-6">
          <div className="relative h-48 md:h-56 bg-gradient-to-r from-amber-800 to-amber-900">
            <Image
              src="/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png"
              alt={`${bookData.name} Chapter Summaries`}
              fill
              className="object-cover opacity-25"
              priority
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded">
                  {bookData.testament === 'old' ? 'Old Testament' : 'New Testament'}
                </span>
                {meta?.category && (
                  <span className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded">
                    {meta.category}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
                {bookData.name} Chapter Summaries
              </h1>
              {meta?.summary && (
                <p className="text-amber-100/90 mt-2 max-w-2xl line-clamp-2 text-sm md:text-base">
                  {meta.summary}
                </p>
              )}
            </div>
          </div>

          {/* Stats Row */}
          {(() => {
            const statCount = 2 + (meta?.author ? 1 : 0) + (meta?.dateRange ? 1 : 0);
            const gridCols = statCount <= 2 ? 'grid-cols-2' : statCount === 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4';
            return (
              <div className={`grid ${gridCols} divide-x divide-grace border-b border-grace`}>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{bookData.chapters}</p>
                  <p className="text-sm text-primary-dark/70">{bookData.chapters === 1 ? 'Chapter' : 'Chapters'}</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{totalVerses.toLocaleString()}</p>
                  <p className="text-sm text-primary-dark/70">Total Verses</p>
                </div>
                {meta?.author && (
                  <div className="p-4 text-center">
                    <p className="text-lg font-semibold text-scripture">{meta.author}</p>
                    <p className="text-sm text-primary-dark/70">Author</p>
                  </div>
                )}
                {meta?.dateRange && (
                  <div className="p-4 text-center">
                    <p className="text-lg font-semibold text-scripture">{meta.dateRange}</p>
                    <p className="text-sm text-primary-dark/70">Date Written</p>
                  </div>
                )}
              </div>
            );
          })()}
        </article>

        {/* Book Outline */}
        {meta?.outline && meta.outline.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h2 className="text-xl font-bold text-scripture mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Book Outline
            </h2>
            <div className="space-y-3">
              {meta.outline.map((section, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-scripture">{section.heading}</h3>
                    <span className="text-xs text-blue-600 font-mono bg-blue-50 px-2 py-1 rounded whitespace-nowrap">
                      {section.reference}
                    </span>
                  </div>
                  <p className="text-primary-dark/70 text-sm mt-1">{section.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Chapter-by-Chapter Listing */}
        <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
          <h2 className="text-xl font-bold text-scripture mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-amber-600" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {bookData.chapters === 1 ? 'Chapter Overview' : `All ${bookData.chapters} Chapters`}
          </h2>

          <div className="space-y-8">
            {groupedChapters.map((group) => (
              <div key={group.heading || 'ungrouped'}>
                {group.heading && (
                  <h3 className="text-lg font-semibold text-scripture mb-3 pb-2 border-b border-grace">
                    {group.heading}
                  </h3>
                )}
                <div className="space-y-3">
                  {group.chapters.map((ch) => {
                    const data = breakdowns[String(ch)];
                    if (!data) return null;
                    return (
                      <Link
                        key={ch}
                        href={`/bible-chapter-summaries/${book}/${ch}`}
                        className="group flex items-start gap-4 p-4 rounded-lg border border-grace hover:border-blue-300 hover:bg-primary-light/30 transition-all"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                          {ch}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-scripture group-hover:text-blue-700 transition-colors">
                              {bookData.name} {ch}: {data.title}
                            </h4>
                            <span className="flex-shrink-0 text-xs text-primary-dark/50 bg-grace/40 px-2 py-0.5 rounded">
                              {data.verses} verses
                            </span>
                          </div>
                          <p className="text-sm text-primary-dark/70 mt-1">{data.keyEvent}</p>
                        </div>
                        <span className="flex-shrink-0 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity self-center">
                          &rarr;
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz CTA Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-blue-800 text-center sm:text-left">
            Now that you have read the overview, test your {bookData.name} knowledge.
          </p>
          <div className="flex gap-2">
            <Link
              href={`/${book}-chapters`}
              className="flex-shrink-0 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            >
              Chapter Quizzes
            </Link>
            <Link
              href={`/${book}-quiz`}
              className="flex-shrink-0 text-sm font-semibold text-blue-700 bg-white border border-blue-300 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
            >
              Book Quiz
            </Link>
          </div>
        </div>

        {/* Key Themes */}
        {meta?.keyThemes && meta.keyThemes.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h2 className="text-xl font-bold text-scripture mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-emerald-600" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Key Themes
            </h2>
            <div className="flex flex-wrap gap-2">
              {meta.keyThemes.map((theme, index) => (
                <span key={index} className={`px-3 py-1.5 rounded-full text-sm font-medium border ${themeColors[index % themeColors.length]}`}>
                  {theme}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Famous Verses */}
        {meta?.famousVerses && meta.famousVerses.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h2 className="text-xl font-bold text-scripture mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-amber-500" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              Key Verses
            </h2>
            <div className="space-y-3">
              {meta.famousVerses.map((verse, index) => (
                <div key={index} className="bg-primary-light/30 rounded-lg p-4">
                  <blockquote className="text-primary-dark/80 italic mb-2">
                    &ldquo;{verse.text}&rdquo;
                  </blockquote>
                  <cite className="text-blue-600 font-medium text-sm not-italic">{verse.reference}</cite>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Internal Links */}
        <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
          <h2 className="text-xl font-bold text-scripture mb-4">Explore {bookData.name}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href={`/${book}-quiz`}
              className="flex items-center justify-between p-4 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors"
            >
              <div>
                <span className="text-blue-600 font-semibold block">{bookData.name} Book Quiz</span>
                <span className="text-sm text-primary-dark/60">25 comprehensive questions</span>
              </div>
              <span className="text-blue-600">&rarr;</span>
            </Link>
            <Link
              href={`/${book}-chapters`}
              className="flex items-center justify-between p-4 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors"
            >
              <div>
                <span className="text-blue-600 font-semibold block">Chapter Quizzes</span>
                <span className="text-sm text-primary-dark/60">Study chapter by chapter</span>
              </div>
              <span className="text-blue-600">&rarr;</span>
            </Link>
            <Link
              href={`/books/${book}`}
              className="flex items-center justify-between p-4 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors"
            >
              <div>
                <span className="text-blue-600 font-semibold block">Book Introduction</span>
                <span className="text-sm text-primary-dark/60">Author, themes, and study guide</span>
              </div>
              <span className="text-blue-600">&rarr;</span>
            </Link>
            <Link
              href="/bible-chapter-summaries"
              className="flex items-center justify-between p-4 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors"
            >
              <div>
                <span className="text-blue-600 font-semibold block">All Book Summaries</span>
                <span className="text-sm text-primary-dark/60">Browse all 66 books</span>
              </div>
              <span className="text-blue-600">&rarr;</span>
            </Link>
          </div>
        </section>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: `${bookData.name} Chapter Summaries - All ${bookData.chapters} Chapters`,
              description: meta?.summary || `Chapter-by-chapter summary of ${bookData.name}.`,
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
                '@id': `https://biblemaximum.com/bible-chapter-summaries/${book}`,
              },
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
                  { '@type': 'ListItem', position: 2, name: 'Chapter Summaries', item: 'https://biblemaximum.com/bible-chapter-summaries' },
                  { '@type': 'ListItem', position: 3, name: bookData.name, item: `https://biblemaximum.com/bible-chapter-summaries/${book}` },
                ],
              },
            }),
          }}
        />
      </main>
    </div>
  );
}
