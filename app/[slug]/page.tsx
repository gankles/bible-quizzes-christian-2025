import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { parseQuizSlug, parseBookQuizSlug, parseChaptersSlug, loadTabbedQuiz, loadQuiz, loadBookQuiz, loadGenericQuiz, getAllQuizSlugs, getAllBookQuizSlugs, getAllGenericQuizSlugs, getAllChaptersSlugs, BOOK_NAMES, getBookChapters } from '@/lib/quiz-loader';
import { BOOK_METADATA } from '@/lib/book-metadata';
import { generateMetaTags } from '@/lib/seo';
import TabbedQuizPage from '@/components/TabbedQuizPage';
import QuizPage from '@/components/QuizPage';
import BookChaptersClient from '@/components/BookChaptersClient';
import ChapterCommandments from '@/components/ChapterCommandments';
import { getCommandmentsByChapter } from '@/lib/commandments-data';
import { getBookIntroduction } from '@/lib/book-introductions';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Section color palette for book outlines
const SECTION_COLORS = [
  'bg-blue-100 border-blue-300 text-blue-800',
  'bg-emerald-100 border-emerald-300 text-emerald-800',
  'bg-amber-100 border-amber-300 text-amber-800',
  'bg-purple-100 border-purple-300 text-purple-800',
  'bg-rose-100 border-rose-300 text-rose-800',
  'bg-teal-100 border-teal-300 text-teal-800',
  'bg-orange-100 border-orange-300 text-orange-800',
  'bg-blue-100 border-blue-300 text-blue-800',
];

function parseOutlineChapterRange(reference: string, totalChapters: number, index: number, totalSections: number): { start: number; end: number } {
  // Try to parse "1:1-11:26" or "12:37-18:27" format
  const match = reference.match(/^(\d+):\d+[–-](\d+):\d+$/);
  if (match) {
    return { start: parseInt(match[1]), end: parseInt(match[2]) };
  }
  // Try "1:1-18" or "21:1-25" format (single chapter references)
  const singleMatch = reference.match(/^(\d+):\d+[–-]\d+$/);
  if (singleMatch) {
    return { start: parseInt(singleMatch[1]), end: parseInt(singleMatch[1]) };
  }
  // Try "1:1-20:31" format
  const crossMatch = reference.match(/^(\d+):\d+[–-](\d+):\d+$/);
  if (crossMatch) {
    return { start: parseInt(crossMatch[1]), end: parseInt(crossMatch[2]) };
  }
  // Fallback: divide chapters evenly across sections
  const chPerSection = Math.ceil(totalChapters / totalSections);
  const start = index * chPerSection + 1;
  const end = Math.min((index + 1) * chPerSection, totalChapters);
  return { start, end };
}

function loadChapterBreakdown(bookSlug: string): Record<string, { title: string; keyEvent: string; verses: number; difficulty: string }> | null {
  const filePath = path.join(process.cwd(), 'data', 'chapter-breakdowns', `${bookSlug}.json`);
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

// Hoisted outside DynamicPage to prevent re-creation per render
function ChapterQuizIntro({ book, chapter, bookDisplayName, chapterInfo, bookMeta }: {
  book: string;
  chapter: number;
  bookDisplayName: string;
  chapterInfo: { title: string; keyEvent: string } | null | undefined;
  bookMeta: { author: string; dateWritten: string; category: string; keyThemes: string[] } | null | undefined;
}) {
  return (
    <div className="bg-white border-b border-grace">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center flex-wrap gap-y-1 text-sm">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li><Link href="/bible-quizzes" className="text-blue-600 hover:underline">Bible Quizzes</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li><Link href={`/${book}-chapters`} className="text-blue-600 hover:underline">{bookDisplayName}</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li className="text-primary-dark/70">Chapter {chapter}</li>
          </ol>
        </nav>
      </div>
      <div className="max-w-4xl mx-auto px-4 pb-6 pt-2">
        <p className="text-primary-dark/70 leading-relaxed">
          {chapterInfo
            ? `${bookDisplayName} chapter ${chapter} covers ${chapterInfo.title.toLowerCase()}${chapterInfo.keyEvent ? ` — ${chapterInfo.keyEvent.toLowerCase()}` : ''}. `
            : `Test your knowledge of ${bookDisplayName} chapter ${chapter}. `}
          {bookMeta
            ? `${bookDisplayName}, written by ${bookMeta.author} (${bookMeta.dateWritten}), is part of the ${bookMeta.category} and centers on themes of ${bookMeta.keyThemes.slice(0, 3).join(', ').toLowerCase()}.`
            : `This quiz covers key people, events, and teachings from this chapter.`}
        </p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const chapterSlugs = getAllQuizSlugs().map(slug => ({ slug }));
  const bookSlugs = getAllBookQuizSlugs().map(slug => ({ slug }));
  const genericSlugs = getAllGenericQuizSlugs().map(slug => ({ slug }));
  const chaptersSlugs = getAllChaptersSlugs().map(slug => ({ slug }));
  return [...chapterSlugs, ...bookSlugs, ...genericSlugs, ...chaptersSlugs];
}

export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const url = `/${slug}`;

  // Check for book chapters page (e.g., "exodus-chapters")
  const chaptersBook = parseChaptersSlug(slug);
  if (chaptersBook) {
    const meta = BOOK_METADATA[chaptersBook];
    const bookName = meta?.name || BOOK_NAMES[chaptersBook] || chaptersBook;
    const totalChapters = getBookChapters(chaptersBook);
    const hebrewPart = meta?.hebrewTransliteration ? ` (${meta.hebrewTransliteration})` : '';
    const versePart = meta?.verseCount ? `, ${meta.verseCount.toLocaleString()} Verses` : '';
    const title = `${bookName}${hebrewPart} Quizzes | All ${totalChapters} Chapters${versePart} | Easy, Medium, Hard & Theological Difficulty Levels | Bible Maximum`;
    const description = `Test your knowledge of ${bookName}${meta?.hebrewName ? ` (Hebrew: ${meta.hebrewName}, "${meta.hebrewMeaning}")` : ''} with chapter-by-chapter quizzes. ${totalChapters} chapters${versePart}${meta ? ` covering ${meta.keyThemes.slice(0, 3).join(', ')}` : ''}. Start your ${bookName} study journey today.`;
    const keywordsArr = [
      `${bookName.toLowerCase()} quiz`, `${bookName.toLowerCase()} chapter quizzes`,
      `bible quiz ${bookName.toLowerCase()}`, `${bookName.toLowerCase()} bible study`,
      'bible quiz', 'scripture test', 'christian quiz',
    ];
    if (meta?.hebrewTransliteration) keywordsArr.push(meta.hebrewTransliteration, `${bookName.toLowerCase()} hebrew name`);
    if (meta?.greekTransliteration) keywordsArr.push(meta.greekTransliteration);
    const keywords = keywordsArr.join(', ');
    return {
      title,
      description,
      keywords,
      openGraph: { title, description, url, type: 'website' },
      twitter: { card: 'summary_large_image', title, description },
      alternates: { canonical: url },
    };
  }

  // Check for book quiz first (e.g., "genesis-quiz")
  const bookSlug = parseBookQuizSlug(slug);
  if (bookSlug) {
    const bookQuiz = loadBookQuiz(bookSlug);
    if (bookQuiz) {
      const bookName = BOOK_NAMES[bookSlug] || bookSlug;
      const bookMeta = BOOK_METADATA[bookSlug];
      const hebrewPart = bookMeta?.hebrewTransliteration ? ` (${bookMeta.hebrewTransliteration})` : '';
      const title = `${bookName}${hebrewPart} Quiz - ${bookQuiz.totalQuestions} Questions Covering the Entire Book | Free Bible Quiz with Answers | Bible Maximum`;
      const description = `Comprehensive ${bookName}${bookMeta?.hebrewName ? ` (${bookMeta.hebrewName})` : ''} quiz with ${bookQuiz.totalQuestions} questions covering all ${bookMeta?.chapters || bookQuiz.questions?.length || 25} chapters${bookMeta?.verseCount ? ` and ${bookMeta.verseCount.toLocaleString()} verses` : ''}. Multiple choice, true/false, and fill-in-the-blank. Free with instant results!`;
      return {
        title,
        description,
        openGraph: { title, description, url, type: 'website' },
        twitter: { card: 'summary_large_image', title, description },
        alternates: { canonical: url },
      };
    }
  }

  // Check for generic quiz (e.g., "ten-commandments-quiz")
  const genericQuiz = loadGenericQuiz(slug);
  if (genericQuiz) {
    const title = `${genericQuiz.title} | Free Bible Quiz with Answers and Verse Explanations | Bible Maximum`;
    const description = genericQuiz.description || `Take the ${genericQuiz.title} — ${genericQuiz.totalQuestions} questions with instant results.`;
    return {
      title,
      description,
      keywords: (genericQuiz.tags || []).join(', '),
      openGraph: { title, description, url, type: 'website' },
      twitter: { card: 'summary_large_image', title, description },
      alternates: { canonical: url },
    };
  }

  // Check for chapter quiz (e.g., "genesis-1-quiz")
  const parsed = parseQuizSlug(slug);
  if (!parsed) return {};

  const bookName = BOOK_NAMES[parsed.book] || parsed.book;

  // Try tabbed quiz first
  const tabbedQuiz = loadTabbedQuiz(parsed.book, parsed.chapter);
  if (tabbedQuiz) {
    const title = `${bookName} Chapter ${parsed.chapter} Quiz | 60 Questions Across Easy, Medium, Hard & Theological Levels | Free with Verse References | Bible Maximum`;
    const description = `Test your knowledge of ${bookName} chapter ${parsed.chapter} with 60 questions across 4 difficulty levels: Easy, Medium, Hard, and Theological. Free instant results with verse references!`;
    const keywords = [
      `${bookName.toLowerCase()} chapter ${parsed.chapter} quiz`,
      `${bookName.toLowerCase()} ${parsed.chapter} bible quiz`,
      'bible quiz', 'scripture test', 'bible knowledge', 'christian quiz',
      'easy bible quiz', 'hard bible quiz', 'theological quiz',
      parsed.book, `chapter-${parsed.chapter}`,
    ].join(', ');

    return {
      title,
      description,
      keywords,
      openGraph: { title, description, url, type: 'website' },
      twitter: { card: 'summary_large_image', title, description },
      alternates: { canonical: url },
    };
  }

  // Fall back to regular quiz metadata
  const quiz = loadQuiz(parsed.book, parsed.chapter);
  if (!quiz) return {};

  const metaTags = generateMetaTags(quiz, url);
  return {
    title: metaTags.title,
    description: metaTags.description,
    keywords: metaTags.keywords,
    openGraph: {
      title: metaTags.ogTitle,
      description: metaTags.ogDescription,
      url: metaTags.ogUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTags.twitterTitle,
      description: metaTags.twitterDescription,
    },
    alternates: { canonical: metaTags.canonical },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  // Check for book chapters page (e.g., "exodus-chapters")
  const chaptersBook = parseChaptersSlug(slug);
  if (chaptersBook) {
    const meta = BOOK_METADATA[chaptersBook];
    const bookName = meta?.name || BOOK_NAMES[chaptersBook] || chaptersBook;
    const totalChapters = getBookChapters(chaptersBook);
    const testament = meta?.testament || 'old';
    const chapterBreakdown = loadChapterBreakdown(chaptersBook);
    const bookIntro = getBookIntroduction(chaptersBook);

    // Build sections from outline
    const sections = (meta?.outline || []).map((item, i) => {
      const range = parseOutlineChapterRange(item.reference, totalChapters, i, meta?.outline?.length || 1);
      return {
        name: item.heading,
        chaptersRange: `${range.start}-${range.end}`,
        startChapter: range.start,
        endChapter: range.end,
        description: item.description,
        color: SECTION_COLORS[i % SECTION_COLORS.length],
      };
    });

    const questionsPerChapter = 60;
    const totalQuestions = totalChapters * questionsPerChapter;
    const readTimeHours = Math.ceil(totalChapters * 4 / 60);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${bookName} Chapters - Bible Quizzes`,
      description: `Complete collection of ${bookName} chapter quizzes covering all ${totalChapters} chapters.`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: totalChapters,
        itemListElement: Array.from({ length: Math.min(10, totalChapters) }, (_, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `https://biblemaximum.com/${chaptersBook}-${i + 1}-quiz`,
          name: `${bookName} ${i + 1} Quiz`,
        })),
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com' },
          { '@type': 'ListItem', position: 2, name: 'Bible Quizzes', item: 'https://biblemaximum.com/bible-quizzes' },
          { '@type': 'ListItem', position: 3, name: `${bookName} Chapters`, item: `https://biblemaximum.com/${slug}` },
        ],
      },
    };

    // Pick hero image based on testament
    const heroImage = testament === 'old'
      ? '/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png'
      : '/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png';

    const gradientClass = testament === 'old'
      ? 'bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-900'
      : 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900';

    const accentTextClass = testament === 'old' ? 'text-amber-200' : 'text-blue-200';
    const accentLightClass = testament === 'old' ? 'text-amber-100' : 'text-blue-100';
    const btnClass = testament === 'old' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700';

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero Section */}
        <section className={`relative ${gradientClass} text-white py-16 md:py-24`}>
          <div className="absolute inset-0 bg-black/40" />
          <Image
            src={heroImage}
            alt="Open Bible with light"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className={`flex items-center justify-center space-x-2 text-sm ${accentTextClass}`}>
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><span className="mx-2">/</span></li>
                <li><Link href="/bible-quizzes" className="hover:text-white">Bible Quizzes</Link></li>
                <li><span className="mx-2">/</span></li>
                <li className="text-white font-medium">{bookName} Chapters</li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {bookName} Chapter Quizzes
            </h1>
            {meta?.hebrewName && (
              <p className={`text-lg ${accentLightClass} mb-2`}>
                <span dir="rtl" lang="he">{meta.hebrewName}</span>
                {' '}<span className="opacity-75">({meta.hebrewTransliteration} &mdash; &ldquo;{meta.hebrewMeaning}&rdquo;)</span>
              </p>
            )}
            {meta && (
              <>
                <p className={`text-xl md:text-2xl ${accentLightClass} mb-4 max-w-3xl mx-auto`}>
                  {meta.summary.length > 120 ? meta.summary.slice(0, 120).replace(/\s+\S*$/, '') + '...' : meta.summary}
                </p>
                <p className={`text-lg ${accentTextClass} mb-8 max-w-2xl mx-auto`}>
                  Written by {meta.author} ({meta.dateWritten}). {meta.purpose.length > 100 ? meta.purpose.slice(0, 100).replace(/\s+\S*$/, '') + '...' : meta.purpose}
                </p>
              </>
            )}

            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">{totalChapters}</div>
                <div className={`${accentTextClass} text-sm`}>Chapters</div>
              </div>
              {meta?.verseCount && (
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold">{meta.verseCount.toLocaleString()}</div>
                  <div className={`${accentTextClass} text-sm`}>Verses</div>
                </div>
              )}
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">{totalQuestions.toLocaleString()}+</div>
                <div className={`${accentTextClass} text-sm`}>Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">~{readTimeHours}hrs</div>
                <div className={`${accentTextClass} text-sm`}>Total Read Time</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/books/${chaptersBook}`}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg transition-colors border border-white/20"
              >
                Learn About {bookName}
              </Link>
              <Link
                href={`/${chaptersBook}-quiz`}
                className={`${btnClass} px-6 py-3 rounded-lg transition-colors font-semibold`}
              >
                Take Complete Book Quiz
              </Link>
            </div>
          </div>
        </section>

        <BookChaptersClient
          bookSlug={chaptersBook}
          bookName={bookName}
          totalChapters={totalChapters}
          sections={sections}
          testament={testament}
        />

        {bookIntro && (
          <section className="py-12 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Introduction */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-scripture mb-4">About {bookName}</h2>
                <div className="text-primary-dark/80 leading-relaxed space-y-4">
                  {bookIntro.introduction.split('\n\n').slice(0, 3).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Key Themes */}
              {bookIntro.keyThemes.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-scripture mb-4">Key Themes</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {bookIntro.keyThemes.slice(0, 6).map((t, i) => (
                      <div key={i} className="border border-grace rounded-lg p-4">
                        <h3 className="font-semibold text-scripture mb-1">{t.theme}</h3>
                        <p className="text-sm text-primary-dark/70">{t.description.slice(0, 150)}{t.description.length > 150 ? '...' : ''}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Christ in Book */}
              {bookIntro.christInBook && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-scripture mb-4">Christ in {bookName}</h2>
                  <div className="text-primary-dark/80 leading-relaxed space-y-4">
                    {bookIntro.christInBook.split('\n\n').slice(0, 2).map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Verses */}
              {bookIntro.keyVerses.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-scripture mb-4">Key Verses</h2>
                  <div className="space-y-3">
                    {bookIntro.keyVerses.slice(0, 8).map((v, i) => (
                      <div key={i} className="border-l-2 border-blue-300 pl-4">
                        <p className="font-serif italic text-scripture">&ldquo;{v.text}&rdquo;</p>
                        <p className="text-sm text-primary-dark/60 mt-1">{v.reference}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Chapter-by-Chapter Breakdown */}
        {chapterBreakdown && Object.keys(chapterBreakdown).length > 0 && (
          <section className="py-12 md:py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-scripture mb-2">
                  Chapter-by-Chapter Breakdown
                </h2>
                <p className="text-primary-dark/70">
                  Pick your battles wisely. Here&apos;s what you&apos;re getting into.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-grace">
                <table className="w-full text-sm">
                  <thead className="bg-primary-light/30">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-primary-dark/80">Ch</th>
                      <th className="px-4 py-3 text-left font-semibold text-primary-dark/80">Title</th>
                      <th className="px-4 py-3 text-left font-semibold text-primary-dark/80">Key Event</th>
                      <th className="px-4 py-3 text-center font-semibold text-primary-dark/80">Verses</th>
                      <th className="px-4 py-3 text-center font-semibold text-primary-dark/80">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(chapterBreakdown).slice(0, 20).map(([ch, data]) => (
                      <tr key={ch} className={`border-t border-grace/50 ${testament === 'old' ? 'hover:bg-amber-50' : 'hover:bg-blue-50'} transition-colors`}>
                        <td className={`px-4 py-3 font-bold ${testament === 'old' ? 'text-amber-800' : 'text-blue-800'}`}>{ch}</td>
                        <td className="px-4 py-3 font-medium text-scripture">{data.title}</td>
                        <td className="px-4 py-3 text-primary-dark/70">{data.keyEvent}</td>
                        <td className="px-4 py-3 text-center text-primary-dark/60">{data.verses}</td>
                        <td className="px-4 py-3 text-center">
                          <Link
                            href={`/${chaptersBook}-${ch}-quiz`}
                            className={`${testament === 'old' ? 'text-amber-600 hover:text-amber-800' : 'text-blue-600 hover:text-blue-800'} font-medium hover:underline`}
                          >
                            Take Quiz
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {Object.keys(chapterBreakdown).length > 20 && (
                <div className="text-center mt-4">
                  <p className="text-sm text-primary-dark/60">Showing first 20 of {Object.keys(chapterBreakdown).length} chapters. Click any chapter above to see its quiz.</p>
                </div>
              )}
            </div>
          </section>
        )}
      </>
    );
  }

  // Check for book quiz first (e.g., "genesis-quiz")
  const bookSlug = parseBookQuizSlug(slug);
  if (bookSlug) {
    const bookQuiz = loadBookQuiz(bookSlug);
    if (bookQuiz) {
      return (
        <QuizPage
          quiz={bookQuiz}
          url={`https://biblemaximum.com/${slug}`}
        />
      );
    }
  }

  // Check for generic quiz (e.g., "ten-commandments-quiz")
  const genericQuiz = loadGenericQuiz(slug);
  if (genericQuiz) {
    return (
      <QuizPage
        quiz={genericQuiz}
        url={`https://biblemaximum.com/${slug}`}
      />
    );
  }

  // Check for chapter quiz (e.g., "genesis-1-quiz")
  const parsed = parseQuizSlug(slug);
  if (!parsed) notFound();

  // Try tabbed quiz first (AI-generated)
  // Load commandments for this chapter (if any exist)
  const chapterCommandments = getCommandmentsByChapter(parsed.book, parsed.chapter);
  const bookDisplayName = BOOK_NAMES[parsed.book] || parsed.book;

  // Load chapter breakdown for intro context
  const chapterData = loadChapterBreakdown(parsed.book);
  const chapterInfo = chapterData?.[String(parsed.chapter)];
  const bookMeta = BOOK_METADATA[parsed.book];

  const introProps = {
    book: parsed.book,
    chapter: parsed.chapter,
    bookDisplayName,
    chapterInfo,
    bookMeta,
  };

  const tabbedQuiz = loadTabbedQuiz(parsed.book, parsed.chapter);
  if (tabbedQuiz) {
    return (
      <>
        <ChapterQuizIntro {...introProps} />
        <TabbedQuizPage
          tabbedQuiz={tabbedQuiz}
          url={`https://biblemaximum.com/${slug}`}
        />
        <ChapterCommandments
          commandments={chapterCommandments}
          bookName={bookDisplayName}
          chapter={parsed.chapter}
        />
      </>
    );
  }

  // Fall back to regular quiz (regex-generated)
  const quiz = loadQuiz(parsed.book, parsed.chapter);
  if (!quiz) notFound();

  return (
    <>
      <ChapterQuizIntro {...introProps} />
      <QuizPage
        quiz={quiz}
        url={`https://biblemaximum.com/${slug}`}
      />
      <ChapterCommandments
        commandments={chapterCommandments}
        bookName={bookDisplayName}
        chapter={parsed.chapter}
      />
    </>
  );
}
