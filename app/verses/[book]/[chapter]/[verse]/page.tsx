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
  BollsVerse
} from '@/lib/bolls-api';
import { getCrossReferences } from '@/lib/cross-references';
import { getVerseCommentary } from '@/lib/commentary-loader';
import { getInterlinearVerse, isOldTestament } from '@/lib/interlinear-data';
import AdjacentVerses from '@/components/verse-study/AdjacentVerses';
import OriginalLanguage from '@/components/verse-study/OriginalLanguage';
import CrossReferencesSection from '@/components/verse-study/CrossReferencesSection';
import CommentarySection from '@/components/verse-study/CommentarySection';
import StudyTabs from '@/components/verse-study/StudyTabs';
import TopicalTags from '@/components/verse-study/TopicalTags';
import { getVersePlaces, formatPlaceTypeSingular } from '@/lib/geocoding-data';

interface VersePageProps {
  params: Promise<{
    book: string;
    chapter: string;
    verse: string;
  }>;
}

interface VerseData {
  verse: BollsVerse;
  allVerses: BollsVerse[];
  prevVerse: BollsVerse | undefined;
  nextVerse: BollsVerse | undefined;
  totalVerses: number;
  bookName: string;
  reference: string;
  bookId: number;
}

const getVerseData = cache(async function getVerseData(book: string, chapter: number, verse: number): Promise<VerseData | null> {
  const bookId = getBookId(book);
  if (!bookId) return null;

  try {
    const verses = await getChapterWithCommentary('KJV', book, chapter);
    const verseData = verses.find(v => v.verse === verse);
    if (!verseData) return null;

    const prevVerse = verses.find(v => v.verse === verse - 1);
    const nextVerse = verses.find(v => v.verse === verse + 1);

    return {
      verse: verseData,
      allVerses: verses,
      prevVerse,
      nextVerse,
      totalVerses: verses.length,
      bookName: getBookName(book),
      reference: formatReference(book, chapter, verse),
      bookId,
    };
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }: VersePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { book, chapter, verse } = resolvedParams;
  const chapterNum = parseInt(chapter, 10);
  const verseNum = parseInt(verse, 10);

  const data = await getVerseData(book, chapterNum, verseNum);
  if (!data) {
    return { title: 'Verse Not Found' };
  }

  const verseText = stripHtml(data.verse.text);
  const commentary = getVerseCommentary(book, chapterNum, verseNum);
  const commentarySnippet = commentary ? ` ${commentary.text.substring(0, 100).replace(/\n/g, ' ')}...` : '';
  const title = `What Does ${data.reference} Mean? | Verse Study with Commentary & Cross-References | Bible Maximum`;
  const description = `What does ${data.reference} mean? "${verseText.substring(0, 80)}" - Study this verse with Ellicott's commentary, cross-references, and original language analysis.${commentarySnippet}`;

  return {
    title,
    description,
    keywords: [
      data.reference,
      `${data.bookName} ${chapter}:${verse}`,
      `${data.reference} meaning`,
      `${data.reference} commentary`,
      'Bible verse study',
      'KJV',
      'scripture commentary',
      'cross-references',
      'Greek Hebrew word study',
      data.bookName,
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/verses/${book}/${chapter}/${verse}`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: `/verses/${book}/${chapter}/${verse}`,
    },
  };
}

export async function generateStaticParams() {
  return [];
}

export default async function VersePage({ params }: VersePageProps) {
  const resolvedParams = await params;
  const { book, chapter, verse } = resolvedParams;
  const chapterNum = parseInt(chapter, 10);
  const verseNum = parseInt(verse, 10);

  if (isNaN(chapterNum) || isNaN(verseNum) || !getBookId(book)) {
    notFound();
  }

  const data = await getVerseData(book, chapterNum, verseNum);
  if (!data) {
    notFound();
  }

  const verseText = stripHtml(data.verse.text);
  const crossRefs = getCrossReferences(book, chapterNum, verseNum, 6);
  const verseCommentary = getVerseCommentary(book, chapterNum, verseNum);
  const interlinearWords = getInterlinearVerse(book, chapterNum, verseNum);
  const isOT = isOldTestament(book);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      {/* Breadcrumb */}
      <nav className="py-4">
        <ol className="flex items-center gap-1.5 text-sm text-primary-dark/40 flex-wrap">
          <li><Link href="/" className="hover:text-primary-dark/80 transition-colors">Home</Link></li>
          <li>/</li>
          <li><Link href={`/${book}-chapters`} className="hover:text-primary-dark/80 transition-colors">{data.bookName}</Link></li>
          <li>/</li>
          <li><Link href={`/chapters/${book}/${chapter}`} className="hover:text-primary-dark/80 transition-colors">{data.bookName} {chapter}</Link></li>
          <li>/</li>
          <li className="text-primary-dark/80">Verse {verse}</li>
        </ol>
      </nav>

      {/* Verse Hero */}
      <article className="pt-6 pb-10">
        <div className="text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-primary-dark/60 mb-3">
            King James Version
          </p>
          <h1 className="text-xl sm:text-2xl font-semibold font-display text-scripture">
            What Does {data.reference} Mean?
          </h1>
          <p className="mt-3 text-primary-dark/70 text-sm max-w-xl mx-auto">
            {data.reference} in the King James Version says &ldquo;{verseText.substring(0, 120)}{verseText.length > 120 ? '...' : ''}&rdquo;{' '}
            — study this verse from {data.bookName} chapter {chapter} with commentary, cross-references, and original {isOT ? 'Hebrew' : 'Greek'} word analysis.
          </p>
        </div>

        <blockquote className="mt-8 font-serif text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] leading-[1.6] text-scripture italic text-center">
          &ldquo;{verseText}&rdquo;
        </blockquote>

        <p className="text-center mt-5 text-sm text-primary-dark/60 font-medium">
          {data.reference} &middot; KJV
        </p>
      </article>

      <TopicalTags verseText={verseText} bookId={data.bookId} />

      <hr className="border-grace mt-8 mb-8" />

      {/* Context: Adjacent Verses */}
      <AdjacentVerses
        verses={data.allVerses}
        currentVerse={verseNum}
        bookSlug={book}
        chapter={chapterNum}
        bookName={data.bookName}
      />

      {/* Commentary */}
      {verseCommentary && (
        <CommentarySection
          text={verseCommentary.text}
          source={verseCommentary.source}
          author={verseCommentary.author}
          historical={verseCommentary.historical}
          questions={verseCommentary.questions}
        />
      )}

      {/* Original Language Analysis */}
      <OriginalLanguage
        words={interlinearWords}
        isOldTestament={isOT}
        bookSlug={book}
      />

      {/* Study Guide Tabs */}
      <StudyTabs
        reference={data.reference}
        verseText={verseText}
        commentary={data.verse.comment || null}
        bookName={data.bookName}
      />

      {/* Cross-References */}
      <CrossReferencesSection
        crossRefs={crossRefs}
        currentReference={data.reference}
      />

      {/* Places in This Verse */}
      {(() => {
        const versePlaces = getVersePlaces(`${book}-${chapterNum}-${verseNum}`);
        if (versePlaces.length === 0) return null;
        return (
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-scripture mb-4">Places in This Verse</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {versePlaces.map((place) => (
                <Link
                  key={place.slug}
                  href={`/bible-places/${place.slug}`}
                  className="group flex items-start gap-3 p-4 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors"
                >
                  <div className="flex-shrink-0 w-9 h-9 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors block">
                      {place.name}
                    </span>
                    <span className="text-xs text-primary-dark/60 block mt-0.5">
                      {formatPlaceTypeSingular(place.type)}
                      {place.modernName ? ` · Modern: ${place.modernName}` : ''}
                      {place.lat !== null ? ` · ${place.lat.toFixed(2)}°N, ${place.lon!.toFixed(2)}°E` : ''}
                    </span>
                    <span className="text-xs text-primary-dark/40 mt-1 block">
                      {place.verseCount} verse{place.verseCount !== 1 ? 's' : ''} across {place.books.length} book{place.books.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-3 text-right">
              <Link
                href={`/bible-geography/${book}/${chapterNum}`}
                className="text-sm text-blue-600 hover:underline"
              >
                View all places in {data.bookName} {chapterNum} &rarr;
              </Link>
            </div>
          </section>
        );
      })()}

      {/* Verse Navigation */}
      <nav className="flex items-center justify-between py-6 border-t border-grace mt-4">
        {data.prevVerse ? (
          <Link
            href={`/verses/${book}/${chapter}/${verseNum - 1}`}
            className="group flex items-center gap-2 text-sm text-primary-dark/60 hover:text-scripture transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span><span className="text-primary-dark/40">Previous:</span> Verse {verseNum - 1}</span>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href={`/chapters/${book}/${chapter}`}
          className="px-5 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-primary-light transition-colors"
        >
          Full Chapter
        </Link>

        {data.nextVerse ? (
          <Link
            href={`/verses/${book}/${chapter}/${verseNum + 1}`}
            className="group flex items-center gap-2 text-sm text-primary-dark/60 hover:text-scripture transition-colors"
          >
            <span><span className="text-primary-dark/40">Next:</span> Verse {verseNum + 1}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </nav>

      {/* Quiz CTA */}
      <section className="py-8">
        <h2 className="text-lg font-semibold text-scripture mb-4">Test Your Knowledge</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href={`/${book}-${chapter}-quiz`}
            className="group p-4 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-all"
          >
            <span className="text-blue-600 font-semibold group-hover:underline">{data.bookName} {chapter} Quiz</span>
            <span className="block text-sm text-primary-dark/60 mt-0.5">Test your knowledge of this chapter</span>
          </Link>
          <Link
            href={`/${book}-quiz`}
            className="group p-4 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-all"
          >
            <span className="text-blue-600 font-semibold group-hover:underline">{data.bookName} Book Quiz</span>
            <span className="block text-sm text-primary-dark/60 mt-0.5">Comprehensive quiz for the entire book</span>
          </Link>
        </div>
      </section>

      {/* Continue Your Study */}
      <section className="py-6 bg-grace/10 border border-grace rounded-xl p-6">
        <h2 className="text-sm font-semibold text-primary-dark/40 uppercase tracking-wide mb-4">Continue Your Study</h2>
        <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2 text-sm">
          <Link href={`/chapters/${book}/${chapter}`} className="text-blue-600 hover:underline">
            Read {data.bookName} {chapter} with Commentary
          </Link>
          <Link href={`/${book}-chapters`} className="text-blue-600 hover:underline">
            All {data.bookName} Chapters
          </Link>
          <Link href={`/${book}-quiz`} className="text-blue-600 hover:underline">
            Complete {data.bookName} Quiz
          </Link>
          <Link href="/people" className="text-blue-600 hover:underline">
            Bible Characters
          </Link>
          <Link href="/nave-topics" className="text-blue-600 hover:underline">
            Nave&apos;s Topical Bible
          </Link>
          <Link href="/bible-quizzes" className="text-blue-600 hover:underline">
            All Bible Quizzes
          </Link>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `What Does ${data.reference} Mean? — Commentary, Cross-References & Word Study`,
            description: verseText.substring(0, 200),
            author: { '@type': 'Organization', name: 'Bible Maximum' },
            publisher: { '@type': 'Organization', name: 'Bible Maximum' },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://biblemaximum.com/verses/${book}/${chapter}/${verse}`,
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `What does ${data.reference} mean?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: verseCommentary
                    ? `${data.reference} says: "${verseText.substring(0, 150)}${verseText.length > 150 ? '...' : ''}" ${verseCommentary.text.substring(0, 300).replace(/\n/g, ' ')}${verseCommentary.text.length > 300 ? '...' : ''}`
                    : `${data.reference} in the King James Version reads: "${verseText.substring(0, 200)}${verseText.length > 200 ? '...' : ''}" This verse is found in ${data.bookName}, chapter ${chapter}, verse ${verse}.`,
                },
              },
              {
                '@type': 'Question',
                name: `What is the context of ${data.reference}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `${data.reference} is part of ${data.bookName} chapter ${chapter}, which contains ${data.totalVerses} verses. ${crossRefs.length > 0 ? `This verse has ${crossRefs.length} cross-references to other scriptures, showing its connections throughout the Bible.` : 'Study this verse with commentary and original language analysis for deeper understanding.'}`,
                },
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
              { '@type': 'ListItem', position: 2, name: data.bookName, item: `https://biblemaximum.com/${book}-chapters` },
              { '@type': 'ListItem', position: 3, name: `${data.bookName} ${chapter}`, item: `https://biblemaximum.com/chapters/${book}/${chapter}` },
              { '@type': 'ListItem', position: 4, name: `Verse ${verse}` },
            ],
          }),
        }}
      />
    </div>
  );
}
