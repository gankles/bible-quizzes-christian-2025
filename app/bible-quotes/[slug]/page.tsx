import { cache } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getQuoteTopic, getRelatedQuoteTopics, QuoteTopic } from '@/lib/bible-quotes-data';
import { getChapterWithCommentary, stripHtml, getBookName } from '@/lib/bolls-api';
import { getBookBySlug } from '@/lib/bible-data';
import { StructuredData } from '@/components/StructuredData';

export async function generateStaticParams() {
  return [];
}

interface Props {
  params: Promise<{ slug: string }>;
}

// ============================================
// Verse resolution (chapter-batched, same pattern as queries.ts)
// ============================================

async function resolveVerseRefs(refs: string[], limit: number = 100) {
  const sliced = refs.slice(0, limit);
  const chapterGroups = new Map<string, { book: string; chapter: number; verses: number[]; refIndices: number[] }>();

  sliced.forEach((ref, idx) => {
    const parts = ref.split('-');
    const verse = parseInt(parts.pop() || '0');
    const chapter = parseInt(parts.pop() || '0');
    const book = parts.join('-');
    if (!book || !chapter || !verse) return;
    const key = `${book}-${chapter}`;
    if (!chapterGroups.has(key)) {
      chapterGroups.set(key, { book, chapter, verses: [], refIndices: [] });
    }
    chapterGroups.get(key)!.verses.push(verse);
    chapterGroups.get(key)!.refIndices.push(idx);
  });

  const results: (any | null)[] = new Array(sliced.length).fill(null);

  await Promise.all(
    Array.from(chapterGroups.values()).map(async ({ book, chapter, verses, refIndices }) => {
      try {
        const chapterVerses = await getChapterWithCommentary('KJV', book, chapter);
        const bookNameStr = getBookName(book);
        const bookData = getBookBySlug(book);
        verses.forEach((verseNum, i) => {
          const found = chapterVerses.find((v: any) => v.verse === verseNum);
          if (found) {
            results[refIndices[i]] = {
              book,
              bookName: bookNameStr,
              chapter,
              verse: verseNum,
              text: stripHtml(found.text),
              translation: 'KJV',
              testament: bookData?.testament || 'old',
            };
          }
        });
      } catch (err) {
        // Skip chapters that fail to load
      }
    })
  );

  return results.filter(Boolean);
}

// Cached data loading
const getCachedTopic = cache((slug: string): QuoteTopic | undefined => {
  return getQuoteTopic(slug);
});

const getCachedVerses = cache(async (refs: string[]) => {
  return resolveVerseRefs(refs, 100);
});

// ============================================
// Metadata
// ============================================

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = getCachedTopic(slug);
  if (!topic) return {};

  const title = `${topic.verseCount} Bible Quotes About ${topic.name} — Scripture Verses (KJV)`;
  const description = `Discover ${topic.verseCount} Bible quotes about ${topic.name.toLowerCase()} from the King James Version. Read, study, and meditate on what the Bible says about ${topic.name.toLowerCase()}.`;

  return {
    title,
    description,
    keywords: [
      `bible quotes about ${topic.name.toLowerCase()}`,
      `${topic.name.toLowerCase()} bible verses`,
      `${topic.name.toLowerCase()} scripture`,
      `what does the bible say about ${topic.name.toLowerCase()}`,
      `bible verses on ${topic.name.toLowerCase()}`,
      `${topic.name.toLowerCase()} in the bible`,
      ...topic.keywords.slice(0, 4),
    ],
    alternates: {
      canonical: `https://biblemaximum.com/bible-quotes/${slug}`,
    },
    openGraph: {
      title: `Bible Quotes About ${topic.name}`,
      description,
      url: `https://biblemaximum.com/bible-quotes/${slug}`,
      type: 'article',
    },
  };
}

// ============================================
// FAQ data
// ============================================

function generateFAQs(topic: QuoteTopic) {
  return [
    {
      question: `What does the Bible say about ${topic.name.toLowerCase()}?`,
      answer: `The Bible contains ${topic.verseCount} verses about ${topic.name.toLowerCase()}, covering this topic from Genesis to Revelation. Scripture provides guidance, instruction, and comfort regarding ${topic.name.toLowerCase()} through both the Old and New Testaments.`,
    },
    {
      question: `How many Bible verses are about ${topic.name.toLowerCase()}?`,
      answer: `There are ${topic.verseCount} Bible verses about ${topic.name.toLowerCase()} in the King James Version. These verses span multiple books of the Bible and cover various aspects of this topic.`,
    },
    {
      question: `What is the best Bible verse about ${topic.name.toLowerCase()}?`,
      answer: `While many verses address ${topic.name.toLowerCase()}, the most well-known passages come from various books of the Bible. The best verse depends on your specific situation and what aspect of ${topic.name.toLowerCase()} you are studying.`,
    },
    {
      question: `Where in the Bible does it talk about ${topic.name.toLowerCase()}?`,
      answer: `${topic.name} is discussed throughout the Bible in both the Old and New Testaments. You can find ${topic.verseCount} references to this topic across multiple books including the Psalms, Proverbs, the Gospels, and the Epistles.`,
    },
  ];
}

// ============================================
// Page Component
// ============================================

export default async function BibleQuoteDetailPage({ params }: Props) {
  const { slug } = await params;
  const topic = getCachedTopic(slug);

  if (!topic) {
    notFound();
  }

  const verses = await getCachedVerses(topic.verseRefs);
  const related = getRelatedQuoteTopics(slug, 8);
  const faqs = generateFAQs(topic);

  // Group verses by testament for display
  const otVerses = verses.filter((v: any) => v.testament === 'old');
  const ntVerses = verses.filter((v: any) => v.testament === 'new');

  // Schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com' },
      { '@type': 'ListItem', position: 2, name: 'Bible Quotes', item: 'https://biblemaximum.com/bible-quotes' },
      { '@type': 'ListItem', position: 3, name: `Bible Quotes About ${topic.name}`, item: `https://biblemaximum.com/bible-quotes/${slug}` },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${topic.verseCount} Bible Quotes About ${topic.name}`,
    description: topic.description,
    url: `https://biblemaximum.com/bible-quotes/${slug}`,
    datePublished: '2026-02-27',
    dateModified: '2026-02-27',
    author: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
    about: { '@type': 'Thing', name: topic.name },
    wordCount: verses.reduce((sum: number, v: any) => sum + (v.text?.split(' ').length || 0), 0),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Bible Quotes About ${topic.name}`,
    numberOfItems: verses.length,
    itemListElement: verses.slice(0, 10).map((v: any, i: number) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Quotation',
        text: v.text,
        spokenByCharacter: 'Bible',
        isPartOf: {
          '@type': 'Book',
          name: `${v.bookName} ${v.chapter}:${v.verse}`,
        },
      },
    })),
  };

  return (
    <div className="min-h-screen bg-primary-light/30">
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={articleSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={itemListSchema} />

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-grace">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <ol className="flex items-center flex-wrap gap-y-1 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            </li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li>
              <Link href="/bible-quotes" className="text-blue-600 hover:underline">Bible Quotes</Link>
            </li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li className="text-primary-dark/70">{topic.name}</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mb-6">
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-8">
            <div className="absolute inset-0 opacity-10">
              <Image
                src="/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="relative">
              <p className="text-blue-200 text-sm font-medium mb-2">{topic.category}</p>
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                Bible Quotes About {topic.name}
              </h1>
              <p className="text-blue-100 mt-3 max-w-xl">
                {topic.verseCount} Scripture verses about {topic.name.toLowerCase()} from the King James
                Version, with full verse text for study and meditation.
              </p>
            </div>
          </div>

          <div className="p-6">
            <p className="text-primary-dark/70 leading-relaxed">{topic.description}</p>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-grace rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{topic.verseCount}</div>
            <div className="text-xs text-primary-dark/60 mt-1">Total Verses</div>
          </div>
          <div className="bg-white border border-grace rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{otVerses.length}</div>
            <div className="text-xs text-primary-dark/60 mt-1">Old Testament</div>
          </div>
          <div className="bg-white border border-grace rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{ntVerses.length}</div>
            <div className="text-xs text-primary-dark/60 mt-1">New Testament</div>
          </div>
        </div>

        {/* Top 10 Verses — Featured Snippet Optimized */}
        {verses.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h2 className="text-lg font-bold text-scripture mb-4">
              Top {Math.min(10, verses.length)} Bible Quotes About {topic.name}
            </h2>
            <ol className="space-y-3 list-decimal list-inside">
              {verses.slice(0, 10).map((v: any, i: number) => (
                <li key={i} className="text-sm leading-relaxed text-primary-dark/80">
                  <Link
                    href={`/verses/${v.book}/${v.chapter}/${v.verse}`}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {v.bookName} {v.chapter}:{v.verse}
                  </Link>
                  {' '}&mdash; &ldquo;{v.text.length > 200 ? v.text.substring(0, 200) + '...' : v.text}&rdquo;
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Subtopics */}
        {topic.subtopics.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h2 className="text-lg font-bold text-scripture mb-4">
              Subtopics of {topic.name}
            </h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {topic.subtopics.map((sub, i) => (
                <div
                  key={i}
                  className="px-3 py-2 bg-primary-light/30 rounded-lg text-sm text-primary-dark/80"
                >
                  {sub}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Old Testament Verses */}
        {otVerses.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-scripture mb-4">
              Old Testament Quotes About {topic.name} ({otVerses.length})
            </h2>
            <div className="space-y-4">
              {otVerses.map((verse: any, index: number) => (
                <div
                  key={`ot-${index}`}
                  className="bg-white rounded-xl shadow-sm border border-grace p-6 hover:shadow-md transition-shadow"
                >
                  <blockquote className="text-lg text-primary-dark/80 leading-relaxed mb-4 border-l-4 border-blue-600 pl-4 italic">
                    &ldquo;{verse.text}&rdquo;
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/verses/${verse.book}/${verse.chapter}/${verse.verse}`}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      {verse.bookName} {verse.chapter}:{verse.verse}
                    </Link>
                    <span className="text-xs text-primary-dark/40">{verse.translation}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* New Testament Verses */}
        {ntVerses.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-scripture mb-4">
              New Testament Quotes About {topic.name} ({ntVerses.length})
            </h2>
            <div className="space-y-4">
              {ntVerses.map((verse: any, index: number) => (
                <div
                  key={`nt-${index}`}
                  className="bg-white rounded-xl shadow-sm border border-grace p-6 hover:shadow-md transition-shadow"
                >
                  <blockquote className="text-lg text-primary-dark/80 leading-relaxed mb-4 border-l-4 border-green-600 pl-4 italic">
                    &ldquo;{verse.text}&rdquo;
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/verses/${verse.book}/${verse.chapter}/${verse.verse}`}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      {verse.bookName} {verse.chapter}:{verse.verse}
                    </Link>
                    <span className="text-xs text-primary-dark/40">{verse.translation}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
          <h2 className="text-lg font-bold text-scripture mb-4">
            Frequently Asked Questions About {topic.name} in the Bible
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-grace rounded-lg">
                <summary className="cursor-pointer p-4 font-medium text-primary-dark/80 hover:text-blue-600 transition-colors">
                  {faq.question}
                </summary>
                <div className="px-4 pb-4 text-sm text-primary-dark/70 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Quiz CTA */}
        <section className="bg-blue-600 rounded-xl p-6 mb-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">Test Your Knowledge of {topic.name}</h3>
            <p className="text-blue-100 text-sm">See how well you know what the Bible says about this topic.</p>
          </div>
          <Link
            href="/bible-quizzes"
            className="whitespace-nowrap px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Browse Quizzes
          </Link>
        </section>

        {/* Related Topics */}
        {related.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h3 className="text-lg font-bold text-scripture mb-4">Related Bible Quotes</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/bible-quotes/${rel.slug}`}
                  className="flex items-start gap-3 p-3 rounded-lg border border-grace/50 hover:border-blue-300 hover:bg-primary-light transition-colors group"
                >
                  <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary-dark/40 group-hover:text-blue-500 whitespace-nowrap">
                    {rel.category}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-scripture group-hover:text-blue-600 truncate">
                      Bible Quotes About {rel.name}
                    </div>
                    <div className="text-xs text-primary-dark/60 mt-0.5">{rel.verseCount} verses</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Cross-linking to other study pages */}
        <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
          <h3 className="text-lg font-bold text-scripture mb-4">Continue Studying {topic.name}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href={`/what-does-the-bible-say-about/${slug}`}
              className="flex items-start gap-3 p-3 rounded-lg border border-grace/50 hover:border-blue-300 hover:bg-primary-light transition-colors group"
            >
              <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary-dark/40 group-hover:text-blue-500 whitespace-nowrap">
                Study Guide
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-scripture group-hover:text-blue-600">
                  What Does the Bible Say About {topic.name}?
                </div>
                <div className="text-xs text-primary-dark/60 mt-0.5">Study guide with application</div>
              </div>
            </Link>
            <Link
              href={`/bible-topics/${slug}`}
              className="flex items-start gap-3 p-3 rounded-lg border border-grace/50 hover:border-blue-300 hover:bg-primary-light transition-colors group"
            >
              <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary-dark/40 group-hover:text-blue-500 whitespace-nowrap">
                Nave&apos;s Topical
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-scripture group-hover:text-blue-600">
                  {topic.name} — Nave&apos;s Topical Bible
                </div>
                <div className="text-xs text-primary-dark/60 mt-0.5">Exhaustive topical reference</div>
              </div>
            </Link>
            <Link
              href="/bible-quizzes"
              className="flex items-start gap-3 p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors group"
            >
              <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-white/70 whitespace-nowrap">
                Quiz
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-white">
                  Bible Quizzes
                </div>
                <div className="text-xs text-blue-100 mt-0.5">Test your knowledge of {topic.name}</div>
              </div>
            </Link>
            <Link
              href="/bible-quotes"
              className="flex items-start gap-3 p-3 rounded-lg border border-grace/50 hover:border-blue-300 hover:bg-primary-light transition-colors group"
            >
              <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary-dark/40 group-hover:text-blue-500 whitespace-nowrap">
                Browse
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-scripture group-hover:text-blue-600">
                  All Bible Quotes by Topic
                </div>
                <div className="text-xs text-primary-dark/60 mt-0.5">Browse 8,400+ topics</div>
              </div>
            </Link>
          </div>
        </section>

        {/* Source Topics (shows what was consolidated) */}
        {topic.sourceTopics.length > 1 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6">
            <h3 className="text-lg font-bold text-scripture mb-3">Topics Included</h3>
            <p className="text-sm text-primary-dark/60 mb-3">
              This page consolidates Bible verses from {topic.sourceTopics.length} related topics:
            </p>
            <div className="flex flex-wrap gap-2">
              {topic.sourceTopics
                .filter(s => !s.startsWith('metav:'))
                .slice(0, 15)
                .map((src, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary-light/30 border border-grace rounded-lg text-xs text-primary-dark/60"
                  >
                    {src.replace(/-/g, ' ')}
                  </span>
                ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
