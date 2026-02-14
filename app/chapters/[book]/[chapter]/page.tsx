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
  BOOK_IDS
} from '@/lib/bolls-api';
import { BIBLE_BOOKS } from '@/lib/bible-data';

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
  const params: { book: string; chapter: string }[] = [];
  for (const book of BIBLE_BOOKS) {
    for (let ch = 1; ch <= book.chapters; ch++) {
      params.push({ book: book.slug, chapter: String(ch) });
    }
  }
  return params;
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

  const hasPrevChapter = chapterNum > 1;
  const hasNextChapter = chapterNum < data.totalChapters;

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
            <li className="text-gray-600">Chapter {chapter}</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-8">
            <p className="text-blue-100 text-sm font-medium mb-2">King James Version</p>
            <h1 className="text-3xl font-bold">{data.reference}</h1>
            <p className="text-blue-100 mt-2">{data.verses.length} verses with commentary</p>
          </header>

          <div className="p-6 md:p-8">
            <div className="space-y-6">
              {data.verses.map((verse) => (
                <div key={verse.pk} id={`verse-${verse.verse}`} className="group">
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
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        title={`Cross-references for ${data.bookName} ${chapter}:${verse.verse}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </Link>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg text-gray-800 leading-relaxed">
                        {stripHtml(verse.text)}
                      </p>

                      {verse.comment && (
                        <details className="mt-3">
                          <summary className="text-sm text-blue-600 cursor-pointer hover:underline">
                            View commentary
                          </summary>
                          <div
                            className="mt-2 pl-4 border-l-2 border-gray-200 text-sm text-gray-600 prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: verse.comment }}
                          />
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        <nav className="flex justify-between items-center mt-6">
          {hasPrevChapter ? (
            <Link
              href={`/chapters/${book}/${chapterNum - 1}`}
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="mr-2">&larr;</span>
              <span className="text-sm text-gray-600">Chapter {chapterNum - 1}</span>
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
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-600">Chapter {chapterNum + 1}</span>
              <span className="ml-2">&rarr;</span>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        <section className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Test Your Knowledge</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Link
              href={`/${book}-${chapter}-quiz`}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div>
                <span className="text-blue-600 font-semibold block">{data.reference} Quiz</span>
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
              description: `${data.reference} - ${data.verses.length} verses from the King James Version Bible`,
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
                '@id': `https://biblemaximum.com/chapters/${book}/${chapter}`,
              },
            }),
          }}
        />
      </main>
    </div>
  );
}
