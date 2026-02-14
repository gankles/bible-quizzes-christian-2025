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
import AdjacentVerses from '@/components/verse-study/AdjacentVerses';
import OriginalLanguage from '@/components/verse-study/OriginalLanguage';
import CrossReferencesSection from '@/components/verse-study/CrossReferencesSection';
import StudyTabs from '@/components/verse-study/StudyTabs';
import TopicalTags from '@/components/verse-study/TopicalTags';

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
  const title = `What Does ${data.reference} Mean? | Verse By Verse Commentary | Bible Maximum`;
  const description = `What does ${data.reference} mean? "${verseText.substring(0, 80)}" - Study this verse with Ellicott's commentary, cross-references, and original language analysis.${commentarySnippet}`;
  
  return {
    title,
    description,
    keywords: [
      data.reference,
      `${data.bookName} ${chapter}:${verse}`,
      'Bible verse study',
      'KJV',
      'scripture',
      'commentary',
      'cross-references',
      'Greek Hebrew study',
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
  // Generated on-demand via ISR — avoids Bolls API calls during build
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

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/bible-quizzes" className="text-blue-600 hover:underline">Bible</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href={`/${book}-chapters`} className="text-blue-600 hover:underline">
                {data.bookName}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href={`/chapters/${book}/${chapter}`} className="text-blue-600 hover:underline">
                Chapter {chapter}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600">Verse {verse}</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-8">
            <p className="text-blue-100 text-sm font-medium mb-2">King James Version</p>
            <h1 className="text-3xl font-bold">What Does {data.reference} Mean?</h1>
          </header>

          <div className="p-6 md:p-8">
            <blockquote className="text-2xl md:text-3xl leading-relaxed text-gray-800 italic border-l-4 border-blue-600 pl-6">
              &ldquo;{verseText}&rdquo;
            </blockquote>
          </div>
        </article>

        <AdjacentVerses
          verses={data.allVerses}
          currentVerse={verseNum}
          bookSlug={book}
          chapter={chapterNum}
          bookName={data.bookName}
        />

        <TopicalTags verseText={verseText} bookId={data.bookId} />

        {verseCommentary && (
          <section className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Commentary</h2>
              <span className="text-xs text-gray-500">{verseCommentary.source}</span>
            </div>
            <div className="p-5">
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {verseCommentary.text}
              </div>
              <p className="text-xs text-gray-400 mt-4">
                {verseCommentary.author}. Public Domain.
              </p>
            </div>
          </section>
        )}

        <OriginalLanguage verseText={verseText} bookId={data.bookId} />

        <StudyTabs
          reference={data.reference}
          verseText={verseText}
          commentary={data.verse.comment || null}
          bookName={data.bookName}
        />

        <CrossReferencesSection 
          crossRefs={crossRefs} 
          currentReference={data.reference} 
        />

        <nav className="flex justify-between items-center mt-6 mb-8">
          {data.prevVerse ? (
            <Link
              href={`/verses/${book}/${chapter}/${verseNum - 1}`}
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="mr-2">&larr;</span>
              <span className="text-sm text-gray-600">Verse {verseNum - 1}</span>
            </Link>
          ) : (
            <div />
          )}
          
          <Link
            href={`/chapters/${book}/${chapter}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Full Chapter
          </Link>
          
          {data.nextVerse ? (
            <Link
              href={`/verses/${book}/${chapter}/${verseNum + 1}`}
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-600">Verse {verseNum + 1}</span>
              <span className="ml-2">&rarr;</span>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Test Your Knowledge</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Link
              href={`/${book}-${chapter}-quiz`}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div>
                <span className="text-blue-600 font-semibold block">{data.bookName} {chapter} Quiz</span>
                <span className="text-sm text-gray-500">Test your knowledge of this chapter</span>
              </div>
            </Link>
            <Link
              href={`/${book}-quiz`}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div>
                <span className="text-blue-600 font-semibold block">{data.bookName} Book Quiz</span>
                <span className="text-sm text-gray-500">Comprehensive quiz for the entire book</span>
              </div>
            </Link>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: data.reference,
              description: verseText,
              author: {
                '@type': 'Organization',
                name: 'Bible Maximum',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Bible Maximum',
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://biblemaximum.com/verses/${book}/${chapter}/${verse}`,
              },
              about: {
                '@type': 'CreativeWork',
                name: 'King James Version Bible',
              },
            }),
          }}
        />
      </main>
    </div>
  );
}
