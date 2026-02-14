import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getChapterWithCommentary,
  getBookId,
  getBookName,
  formatReference,
  stripHtml,
  BOOK_NAMES,
} from '@/lib/bolls-api';
import {
  getCrossReferences,
  getAllCrossReferenceKeys,
  FormattedCrossRef,
} from '@/lib/cross-references';
import { getVerseContext, VerseContext } from '@/lib/verse-context';

interface CrossRefPageProps {
  params: Promise<{
    book: string;
    chapter: string;
    verse: string;
  }>;
}

function parseKey(key: string): { book: string; chapter: number; verse: number } | null {
  const parts = key.split('-');
  const verse = parseInt(parts.pop()!, 10);
  const chapter = parseInt(parts.pop()!, 10);
  const book = parts.join('-');
  if (!book || isNaN(chapter) || isNaN(verse)) return null;
  return { book, chapter, verse };
}

async function getSourceVerseText(
  bookSlug: string,
  chapter: number,
  verse: number
): Promise<string | null> {
  try {
    const verses = await getChapterWithCommentary('KJV', bookSlug, chapter);
    const v = verses.find((v) => v.verse === verse);
    return v ? stripHtml(v.text) : null;
  } catch {
    return null;
  }
}

function getAdjacentVerses(
  bookSlug: string,
  chapter: number,
  verse: number,
  allKeys: Set<string>
): { prev: { book: string; chapter: number; verse: number } | null; next: { book: string; chapter: number; verse: number } | null } {
  const prevKey = `${bookSlug}-${chapter}-${verse - 1}`;
  const nextKey = `${bookSlug}-${chapter}-${verse + 1}`;
  return {
    prev: allKeys.has(prevKey) ? { book: bookSlug, chapter, verse: verse - 1 } : null,
    next: allKeys.has(nextKey) ? { book: bookSlug, chapter, verse: verse + 1 } : null,
  };
}

export async function generateMetadata({ params }: CrossRefPageProps): Promise<Metadata> {
  const { book, chapter, verse } = await params;
  const chapterNum = parseInt(chapter, 10);
  const verseNum = parseInt(verse, 10);

  if (!getBookId(book) || isNaN(chapterNum) || isNaN(verseNum)) {
    return { title: 'Cross-References Not Found' };
  }

  const bookName = getBookName(book);
  const crossRefs = getCrossReferences(book, chapterNum, verseNum, 20);
  const verseText = await getSourceVerseText(book, chapterNum, verseNum);
  const snippet = verseText ? verseText.substring(0, 80) + (verseText.length > 80 ? '...' : '') : '';
  const context = getVerseContext(book, chapterNum, verseNum);

  const contextParts: string[] = [];
  if (context?.persons.length) contextParts.push(`mentions ${context.persons.map(p => p.label).join(', ')}`);
  if (context?.places.length) contextParts.push(`set in ${context.places.map(p => p.name).join(', ')}`);
  const contextSnippet = contextParts.length ? ` This verse ${contextParts.join(' and ')}.` : '';

  const title = `${bookName} ${chapter}:${verse} Cross-References | ${crossRefs.length} Related Scriptures from Treasury of Scripture Knowledge | Compare Parallel Passages | Bible Maximum`;
  const description = `Explore ${crossRefs.length} cross-references for ${bookName} ${chapter}:${verse} - "${snippet}".${contextSnippet} Compare related scriptures from across the Bible.`;

  return {
    title,
    description,
    keywords: [
      `${bookName} ${chapter}:${verse} cross references`,
      'scripture cross references',
      'treasury of scripture knowledge',
      `${bookName} cross references`,
      'Bible cross-reference',
      bookName,
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/cross-references/${book}/${chapter}/${verse}`,
    },
    alternates: {
      canonical: `/cross-references/${book}/${chapter}/${verse}`,
    },
  };
}

export async function generateStaticParams() {
  // 23K+ pages — generated on-demand via ISR, not at build time
  return [];
}

export default async function CrossReferencePage({ params }: CrossRefPageProps) {
  const { book, chapter, verse } = await params;
  const chapterNum = parseInt(chapter, 10);
  const verseNum = parseInt(verse, 10);

  if (isNaN(chapterNum) || isNaN(verseNum) || !getBookId(book)) {
    notFound();
  }

  const bookName = getBookName(book);
  const reference = formatReference(book, chapterNum, verseNum);
  const crossRefs = getCrossReferences(book, chapterNum, verseNum, 20);
  const verseText = await getSourceVerseText(book, chapterNum, verseNum);

  if (!verseText && crossRefs.length === 0) {
    notFound();
  }

  const allKeys = new Set(getAllCrossReferenceKeys());
  const { prev, next } = getAdjacentVerses(book, chapterNum, verseNum, allKeys);
  const context = getVerseContext(book, chapterNum, verseNum);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <ol className="flex items-center flex-wrap gap-y-1 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            </li>
            <li className="text-gray-400 mx-2">/</li>
            <li>
              <Link href="/cross-references" className="text-blue-600 hover:underline">Cross-References</Link>
            </li>
            <li className="text-gray-400 mx-2">/</li>
            <li>
              <Link href={`/${book}-chapters`} className="text-blue-600 hover:underline">{bookName}</Link>
            </li>
            <li className="text-gray-400 mx-2">/</li>
            <li>
              <Link href={`/chapters/${book}/${chapter}`} className="text-blue-600 hover:underline">Chapter {chapter}</Link>
            </li>
            <li className="text-gray-400 mx-2">/</li>
            <li className="text-gray-600">Verse {verse}</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <header className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-8">
            <p className="text-blue-100 text-sm font-medium mb-2">Treasury of Scripture Knowledge</p>
            <h1 className="text-3xl font-bold">{reference} Cross-References</h1>
            <p className="text-blue-100 mt-2">
              {crossRefs.length} related scripture{crossRefs.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {verseText && (
            <div className="p-6">
              <blockquote className="text-xl leading-relaxed text-gray-800 italic border-l-4 border-blue-600 pl-6">
                &ldquo;{verseText}&rdquo;
              </blockquote>
              <p className="mt-3 text-sm text-gray-500">{reference} (KJV)</p>
            </div>
          )}
        </header>

        {context && (context.persons.length > 0 || context.places.length > 0 || context.events.length > 0) && (
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Historical Context for {reference}
            </h2>

            {context.persons.length > 0 && (
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">People Mentioned</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {context.persons.map((person) => (
                    <div key={person.id} className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                      <div className="flex-shrink-0 w-9 h-9 bg-amber-200 text-amber-800 rounded-full flex items-center justify-center text-sm font-bold">
                        {person.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-gray-900 block">{person.label}</span>
                        {person.attribute && (
                          <span className="text-xs text-gray-600 block mt-0.5">{person.attribute}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {context.places.length > 0 && (
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Places Mentioned</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {context.places.map((place) => (
                    <div key={place.id} className="flex items-start gap-3 p-3 bg-green-50 border border-green-100 rounded-lg">
                      <div className="flex-shrink-0 w-9 h-9 bg-green-200 text-green-800 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-gray-900 block">{place.name}</span>
                        {(place.type || place.modern) && (
                          <span className="text-xs text-gray-600 block mt-0.5">
                            {place.type}{place.type && place.modern ? ' · ' : ''}{place.modern && `Modern: ${place.modern}`}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {context.events.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Events</h3>
                <div className="space-y-3">
                  {context.events.map((event) => (
                    <div key={event.id} className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{event.name}</span>
                        {event.year && (
                          <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">{event.year}</span>
                        )}
                        {event.type && (
                          <span className="text-xs text-gray-500">{event.type}</span>
                        )}
                      </div>
                      {event.description && (
                        <p className="text-sm text-gray-600">{event.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {crossRefs.length > 0 ? (
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Cross-References for {reference}
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Ranked by relevance from Treasury of Scripture Knowledge
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {crossRefs.map((ref: FormattedCrossRef, index: number) => (
                <Link
                  key={`${ref.bookSlug}-${ref.chapter}-${ref.verse}-${index}`}
                  href={ref.url}
                  className="group flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-blue-600 font-medium group-hover:underline block">
                      {ref.reference}
                    </span>
                    <span className="text-xs text-gray-400">
                      {ref.votes} vote{ref.votes !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <span className="text-gray-400 group-hover:text-blue-600 transition-colors">
                    &rarr;
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 text-center">
              <span className="text-xs text-gray-500">
                Cross-references sourced from Treasury of Scripture Knowledge
              </span>
            </div>
          </section>
        ) : (
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 text-center">
            <p className="text-gray-500">No cross-references found for this verse.</p>
          </section>
        )}

        <nav className="flex justify-between items-center mb-6">
          {prev ? (
            <Link
              href={`/cross-references/${prev.book}/${prev.chapter}/${prev.verse}`}
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="mr-2">&larr;</span>
              <span className="text-sm text-gray-600">{bookName} {prev.chapter}:{prev.verse}</span>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href={`/chapters/${book}/${chapter}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Read Full Chapter
          </Link>

          {next ? (
            <Link
              href={`/cross-references/${next.book}/${next.chapter}/${next.verse}`}
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-600">{bookName} {next.chapter}:{next.verse}</span>
              <span className="ml-2">&rarr;</span>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Continue Studying</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Link
              href={`/verses/${book}/${chapter}/${verse}`}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div>
                <span className="text-blue-600 font-semibold block">{reference} Verse Study</span>
                <span className="text-sm text-gray-500">Commentary, original language, and more</span>
              </div>
            </Link>
            <Link
              href={`/${book}-${chapter}-quiz`}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div>
                <span className="text-blue-600 font-semibold block">{bookName} {chapter} Quiz</span>
                <span className="text-sm text-gray-500">Test your knowledge of this chapter</span>
              </div>
            </Link>
            <Link
              href={`/${book}-chapters`}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div>
                <span className="text-blue-600 font-semibold block">{bookName} Chapters</span>
                <span className="text-sm text-gray-500">Browse all chapters in {bookName}</span>
              </div>
            </Link>
            <Link
              href={`/${book}-quiz`}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div>
                <span className="text-blue-600 font-semibold block">{bookName} Book Quiz</span>
                <span className="text-sm text-gray-500">Comprehensive quiz for the entire book</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Cross-Pillar Internal Links */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/cross-references" className="text-blue-600 hover:underline text-sm">Cross-References Index</Link>
            <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">Bible Quizzes</Link>
            <Link href="/nave-topics" className="text-blue-600 hover:underline text-sm">Nave&apos;s Topical Bible</Link>
            <Link href="/people" className="text-blue-600 hover:underline text-sm">Bible People Directory</Link>
            <Link href="/bible-names" className="text-blue-600 hover:underline text-sm">Bible Name Meanings</Link>
            <Link href="/commandments" className="text-blue-600 hover:underline text-sm">613 Commandments</Link>
            <Link href="/timeline" className="text-blue-600 hover:underline text-sm">Bible Timeline</Link>
            <Link href="/lexicon" className="text-blue-600 hover:underline text-sm">Greek &amp; Hebrew Lexicon</Link>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: `${reference} Cross-References`,
              description: `${crossRefs.length} cross-references for ${reference} from Treasury of Scripture Knowledge`,
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
                '@id': `https://biblemaximum.com/cross-references/${book}/${chapter}/${verse}`,
              },
              about: {
                '@type': 'CreativeWork',
                name: 'Treasury of Scripture Knowledge',
              },
            }),
          }}
        />
      </main>
    </div>
  );
}
