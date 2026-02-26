import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllNaveTopics,
  getNaveTopicBySlug,
  getNaveTopicsBySection,
  getNavesStats,
  USX_TO_NAME,
  USX_TO_SLUG,
  NaveTopic,
  NaveEntry,
  NaveReference,
} from '@/lib/naves-data';
import { StructuredData } from '@/components/StructuredData';

// ISR: build none at build time, generate on first request
export async function generateStaticParams() {
  return [];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* ─── helpers ─── */

function titleCase(s: string): string {
  return s
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

/** Build a readable name from a USX book code */
function bookName(code: string): string {
  return USX_TO_NAME[code] || code;
}

/** Compute book distribution as sorted array */
function getBookDistribution(topic: NaveTopic): { book: string; name: string; slug: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const entry of topic.entries) {
    for (const ref of entry.references) {
      counts[ref.book] = (counts[ref.book] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([book, count]) => ({
      book,
      name: bookName(book),
      slug: USX_TO_SLUG[book] || book.toLowerCase(),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

/** Find related topics from same section + fuzzy slug match */
function getRelatedTopics(topic: NaveTopic, limit = 12): NaveTopic[] {
  const sectionTopics = getNaveTopicsBySection(topic.section);
  const slugWords = new Set(topic.slug.split('-'));

  const slugWordsArr = Array.from(slugWords);
  const scored = sectionTopics
    .filter(t => t.slug !== topic.slug)
    .map(t => {
      const tWords = new Set(t.slug.split('-'));
      let overlap = 0;
      for (let i = 0; i < slugWordsArr.length; i++) {
        if (tWords.has(slugWordsArr[i])) overlap++;
      }
      return { topic: t, score: overlap };
    })
    .sort((a, b) => b.score - a.score || b.topic.refCount - a.topic.refCount);

  return scored.slice(0, limit).map(s => s.topic);
}

/** Get adjacent topics alphabetically */
function getAdjacentTopics(topic: NaveTopic): { prev: NaveTopic | null; next: NaveTopic | null } {
  const all = getAllNaveTopics();
  const idx = all.findIndex(t => t.slug === topic.slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

/** Topics starting with the same letter */
function getSameLetterTopics(topic: NaveTopic, limit = 8): NaveTopic[] {
  const letter = topic.section;
  return getNaveTopicsBySection(letter)
    .filter(t => t.slug !== topic.slug && t.refCount > 0)
    .sort((a, b) => b.refCount - a.refCount)
    .slice(0, limit);
}

/** Build overview text from entries */
function buildOverview(topic: NaveTopic): string {
  const entryTexts = topic.entries
    .filter(e => e.text.length > 10 && e.references.length > 0)
    .slice(0, 3)
    .map(e => {
      // Clean up: remove reference codes, keep readable text
      const cleaned = e.text
        .replace(/\b(GEN|EXO|LEV|NUM|DEU|JOS|JDG|RUT|1SA|2SA|1KI|2KI|1CH|2CH|EZR|NEH|EST|JOB|PSA|PRO|ECC|SNG|ISA|JER|LAM|EZK|DAN|HOS|JOL|AMO|OBA|JON|MIC|NAH|HAB|ZEP|HAG|ZEC|MAL|MAT|MRK|LUK|JHN|ACT|ROM|1CO|2CO|GAL|EPH|PHP|COL|1TH|2TH|1TI|2TI|TIT|PHM|HEB|JAS|1PE|2PE|1JN|2JN|3JN|JUD|REV)\s+\d+:\d+[^;,.]*/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
      if (cleaned.length > 5) return cleaned;
      return null;
    })
    .filter(Boolean);

  if (entryTexts.length === 0) {
    return `The topic "${topic.subject}" is referenced ${topic.refCount} times across ${topic.books.length} books of the Bible. This Nave's Topical Bible entry collects every sub-topic and verse reference for comprehensive study.`;
  }

  const subTopicList = entryTexts.slice(0, 3).join('; ');
  return `Nave's Topical Bible covers "${topic.subject}" through ${topic.entries.length} sub-topics including ${subTopicList}. With ${topic.refCount} verse references spanning ${topic.books.length} books, this is one of the most thorough topical indexes available for Bible study.`;
}

/* ─── Metadata ─── */

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getNaveTopicBySlug(slug);
  if (!topic) return {};

  const title = `${topic.subject} in the Bible -- Every Verse and Sub-Topic | Nave's Topical Study`;
  const description = `Explore ${topic.refCount} Bible verse references about ${topic.subject} organized into ${topic.entries.length} sub-topics. Nave's Topical Bible study covering ${topic.books.length} books of Scripture.`;

  return {
    title,
    description,
    keywords: [
      `${topic.subject} bible verses`,
      `${topic.subject} in the bible`,
      `${topic.subject} scripture references`,
      `${topic.subject.toLowerCase()} topical study`,
      `nave's topical bible ${topic.subject.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      type: 'article',
    },
    alternates: { canonical: `/bible-topics/${slug}` },
  };
}

/* ─── Page ─── */

export default async function NaveTopicDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getNaveTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const bookDist = getBookDistribution(topic);
  const relatedTopics = getRelatedTopics(topic);
  const { prev, next } = getAdjacentTopics(topic);
  const sameLetterTopics = getSameLetterTopics(topic);
  const overview = buildOverview(topic);
  const maxBookCount = bookDist.length > 0 ? bookDist[0].count : 1;
  const topBook = bookDist.length > 0 ? bookDist[0] : null;

  // JSON-LD structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${topic.subject} in the Bible`,
    description: overview,
    url: `https://biblemaximum.com/bible-topics/${slug}`,
    author: {
      '@type': 'Organization',
      name: 'Bible Maximum',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bible Maximum',
    },
    about: {
      '@type': 'Thing',
      name: topic.subject,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://biblemaximum.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Bible Topics',
        item: 'https://biblemaximum.com/bible-topics',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: topic.subject,
        item: `https://biblemaximum.com/bible-topics/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-primary-light/30">
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-grace">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <ol className="flex items-center flex-wrap gap-y-1 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            </li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li>
              <Link href="/bible-topics" className="text-blue-600 hover:underline">Bible Topics</Link>
            </li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li className="text-primary-dark/70 font-medium">{topic.subject}</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">

        {/* Hero Section */}
        <header className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-amber-700 to-amber-800 text-white px-6 py-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 text-lg font-bold">
                {topic.section}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-semibold">
                {topic.refCount.toLocaleString()} verse references
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold leading-tight">
              {topic.subject} in the Bible
            </h1>
            <p className="text-amber-100 mt-2 text-sm">
              Nave&apos;s Topical Bible &mdash; {topic.entries.length} sub-topics across {topic.books.length} books
            </p>
          </div>

          {/* Quick Overview */}
          <div className="p-6">
            <p className="text-primary-dark/70 leading-relaxed">{overview}</p>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-grace rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-amber-700">{topic.entries.length}</div>
            <div className="text-xs text-primary-dark/60 mt-1 font-medium">Sub-Topics</div>
          </div>
          <div className="bg-white border border-grace rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-amber-700">{topic.refCount.toLocaleString()}</div>
            <div className="text-xs text-primary-dark/60 mt-1 font-medium">Verse References</div>
          </div>
          <div className="bg-white border border-grace rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-amber-700">{topic.books.length}</div>
            <div className="text-xs text-primary-dark/60 mt-1 font-medium">Books</div>
          </div>
        </div>

        {/* Sub-Topics with Verses */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-scripture mb-4">
            Sub-Topics and Verse References
          </h2>
          <div className="space-y-3">
            {topic.entries.map((entry, index) => (
              <SubTopicCard key={index} entry={entry} index={index} />
            ))}
          </div>
        </section>

        {/* Book Distribution Chart */}
        {bookDist.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-8">
            <h2 className="text-xl font-bold text-scripture mb-4">
              Book Distribution
            </h2>
            <p className="text-sm text-primary-dark/60 mb-6">
              Which books of the Bible reference &ldquo;{topic.subject}&rdquo; most frequently.
            </p>
            <div className="space-y-2">
              {bookDist.slice(0, 15).map(item => (
                <div key={item.book} className="flex items-center gap-3">
                  <Link
                    href={`/bible-geography/${item.slug}`}
                    className="w-28 text-sm text-blue-600 hover:underline font-medium truncate flex-shrink-0"
                  >
                    {item.name}
                  </Link>
                  <div className="flex-1 bg-grace/50 rounded-full h-5 overflow-hidden">
                    <div
                      className="bg-amber-600 h-5 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(4, (item.count / maxBookCount) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-primary-dark/60 font-medium w-10 text-right flex-shrink-0">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
            {bookDist.length > 15 && (
              <p className="text-xs text-primary-dark/40 mt-4">
                And {bookDist.length - 15} more books...
              </p>
            )}
          </section>
        )}

        {/* CRO Section: Go Deeper */}
        <section className="bg-gradient-to-br from-amber-700 to-amber-800 rounded-xl p-6 mb-8 text-white">
          <h2 className="text-xl font-bold mb-4">Go Deeper</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href={`/topics/${slug}`}
              className="block bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors"
            >
              <div className="text-sm font-bold mb-1">Take a Quiz on {topic.subject}</div>
              <div className="text-amber-200 text-xs">
                Test your knowledge with interactive questions
              </div>
            </Link>
            {topBook && (
              <Link
                href={`/bible-geography/${topBook.slug}`}
                className="block bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors"
              >
                <div className="text-sm font-bold mb-1">
                  Explore {topic.subject} in {topBook.name}
                </div>
                <div className="text-amber-200 text-xs">
                  {topBook.count} references in this book
                </div>
              </Link>
            )}
            <Link
              href="/word-studies"
              className="block bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors"
            >
              <div className="text-sm font-bold mb-1">Study Related Greek/Hebrew Words</div>
              <div className="text-amber-200 text-xs">
                Explore original-language word meanings
              </div>
            </Link>
            <Link
              href="/bible-quizzes"
              className="block bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors"
            >
              <div className="text-sm font-bold mb-1">Browse All Bible Quizzes</div>
              <div className="text-amber-200 text-xs">
                Hundreds of quizzes on every book and topic
              </div>
            </Link>
          </div>
        </section>

        {/* Related Topics */}
        {relatedTopics.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-8">
            <h2 className="text-xl font-bold text-scripture mb-4">Related Topics</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTopics.map(rt => (
                <Link
                  key={rt.slug}
                  href={`/bible-topics/${rt.slug}`}
                  className="px-4 py-2 bg-primary-light/50 border border-grace rounded-lg text-sm text-primary-dark/80 hover:border-amber-400 hover:text-amber-700 transition-colors"
                >
                  {rt.subject}
                  <span className="ml-1 text-xs text-primary-dark/40">({rt.refCount})</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Browse: Same letter + prev/next */}
        <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-8">
          <h2 className="text-xl font-bold text-scripture mb-4">
            Browse Topics Starting with &ldquo;{topic.section}&rdquo;
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {sameLetterTopics.map(t => (
              <Link
                key={t.slug}
                href={`/bible-topics/${t.slug}`}
                className="px-3 py-1.5 bg-primary-light/50 border border-grace rounded text-sm text-primary-dark/70 hover:border-amber-400 hover:text-amber-700 transition-colors"
              >
                {t.subject}
              </Link>
            ))}
          </div>

          {/* Prev/Next navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-grace">
            {prev ? (
              <Link
                href={`/bible-topics/${prev.slug}`}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                {prev.subject}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/bible-topics/${next.slug}`}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                {next.subject}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </section>

        {/* Internal Links / Cross-linking */}
        <section className="bg-primary-light/50 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-4">Continue Your Bible Study</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link
              href={`/topics/${slug}`}
              className="group bg-white rounded-lg border border-grace p-4 hover:border-amber-400 hover:shadow-sm transition-all"
            >
              <div className="text-sm font-bold text-scripture group-hover:text-amber-700 mb-1">
                {topic.subject} Verses with Text
              </div>
              <div className="text-xs text-primary-dark/60">
                Read full verse text and commentary
              </div>
            </Link>
            <Link
              href="/word-studies"
              className="group bg-white rounded-lg border border-grace p-4 hover:border-amber-400 hover:shadow-sm transition-all"
            >
              <div className="text-sm font-bold text-scripture group-hover:text-amber-700 mb-1">
                Greek and Hebrew Word Studies
              </div>
              <div className="text-xs text-primary-dark/60">
                Explore original-language meanings
              </div>
            </Link>
            <Link
              href="/characters"
              className="group bg-white rounded-lg border border-grace p-4 hover:border-amber-400 hover:shadow-sm transition-all"
            >
              <div className="text-sm font-bold text-scripture group-hover:text-amber-700 mb-1">
                Bible Characters
              </div>
              <div className="text-xs text-primary-dark/60">
                Study the people of Scripture
              </div>
            </Link>
            <Link
              href="/bible-topics"
              className="group bg-white rounded-lg border border-grace p-4 hover:border-amber-400 hover:shadow-sm transition-all"
            >
              <div className="text-sm font-bold text-scripture group-hover:text-amber-700 mb-1">
                Browse All 5,000+ Topics
              </div>
              <div className="text-xs text-primary-dark/60">
                A-Z index of Nave&apos;s Topical Bible
              </div>
            </Link>
            <Link
              href="/bible-quizzes"
              className="group bg-white rounded-lg border border-grace p-4 hover:border-amber-400 hover:shadow-sm transition-all"
            >
              <div className="text-sm font-bold text-scripture group-hover:text-amber-700 mb-1">
                Bible Quizzes
              </div>
              <div className="text-xs text-primary-dark/60">
                Test your knowledge on every book
              </div>
            </Link>
            <Link
              href="/devotionals"
              className="group bg-white rounded-lg border border-grace p-4 hover:border-amber-400 hover:shadow-sm transition-all"
            >
              <div className="text-sm font-bold text-scripture group-hover:text-amber-700 mb-1">
                Daily Devotionals
              </div>
              <div className="text-xs text-primary-dark/60">
                Reflections for spiritual growth
              </div>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}

/* ─── SubTopicCard (server component) ─── */

function SubTopicCard({ entry, index }: { entry: NaveEntry; index: number }) {
  // Clean display text: strip bare reference codes but keep readable prose
  const displayText = entry.text
    .replace(/\b(GEN|EXO|LEV|NUM|DEU|JOS|JDG|RUT|1SA|2SA|1KI|2KI|1CH|2CH|EZR|NEH|EST|JOB|PSA|PRO|ECC|SNG|ISA|JER|LAM|EZK|DAN|HOS|JOL|AMO|OBA|JON|MIC|NAH|HAB|ZEP|HAG|ZEC|MAL|MAT|MRK|LUK|JHN|ACT|ROM|1CO|2CO|GAL|EPH|PHP|COL|1TH|2TH|1TI|2TI|TIT|PHM|HEB|JAS|1PE|2PE|1JN|2JN|3JN|JUD|REV)\s+\d+:\d+/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  const hasText = displayText.length > 3;
  const refs = entry.references;
  const showAllRefs = refs.length <= 10;
  const visibleRefs = showAllRefs ? refs : refs.slice(0, 8);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden">
      <div className="p-5">
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded bg-amber-100 text-amber-800 text-xs font-bold">
            {index + 1}
          </span>
          <div className="flex-1 min-w-0">
            {hasText && (
              <p className="text-sm text-primary-dark/80 leading-relaxed mb-3">
                {displayText}
              </p>
            )}
            {refs.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {visibleRefs.map((ref, i) => (
                  <ReferenceLink key={`${ref.raw}-${i}`} reference={ref} />
                ))}
                {!showAllRefs && (
                  <span className="px-2 py-0.5 bg-primary-light/60 rounded text-xs text-primary-dark/50 font-medium">
                    +{refs.length - 8} more
                  </span>
                )}
              </div>
            )}
            {refs.length === 0 && !hasText && (
              <p className="text-xs text-primary-dark/40 italic">No verse references for this sub-topic</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ReferenceLink ─── */

function ReferenceLink({ reference }: { reference: NaveReference }) {
  const name = USX_TO_NAME[reference.book] || reference.book;
  const label = `${name} ${reference.chapter}`;

  return (
    <Link
      href={`/bible-geography/${reference.bookSlug}/${reference.chapter}`}
      className="inline-flex items-center px-2 py-0.5 bg-amber-50 border border-amber-200/60 rounded text-xs text-amber-800 hover:bg-amber-100 hover:border-amber-300 transition-colors font-medium"
    >
      {label}
    </Link>
  );
}
