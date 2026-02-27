import Link from 'next/link';
import Image from 'next/image';
import { getChapterWithCommentary, stripHtml, getBookName, formatReference } from '@/lib/bolls-api';
import { getCrossReferences } from '@/lib/cross-references';
import { getBookBySlug } from '@/lib/bible-data';
import { getVerseTopic } from '@/lib/kjv-verse-data';
import { StructuredData } from '@/components/StructuredData';

interface KjvVersePageProps {
  bookSlug: string;
  chapter: number;
  verse: number;
  bookName: string;
}

export default async function KjvVersePage({ bookSlug, chapter, verse, bookName }: KjvVersePageProps) {
  // Load verse text
  let verseText = '';
  let prevVerse: { text: string; verse: number } | null = null;
  let nextVerse: { text: string; verse: number } | null = null;

  try {
    const chapterVerses = await getChapterWithCommentary('KJV', bookSlug, chapter);
    const found = chapterVerses.find((v: any) => v.verse === verse);
    if (found) {
      verseText = stripHtml(found.text);
    }
    const prev = chapterVerses.find((v: any) => v.verse === verse - 1);
    if (prev) prevVerse = { text: stripHtml(prev.text), verse: prev.verse };
    const next = chapterVerses.find((v: any) => v.verse === verse + 1);
    if (next) nextVerse = { text: stripHtml(next.text), verse: next.verse };
  } catch {}

  if (!verseText) return null;

  // Cross-references
  const crossRefKey = `${bookSlug}-${chapter}-${verse}`;
  const crossRefs = getCrossReferences(crossRefKey);
  const bookData = getBookBySlug(bookSlug);
  const topic = getVerseTopic(bookSlug, chapter, verse);
  const reference = `${bookName} ${chapter}:${verse}`;
  const slug = `${bookSlug}-${chapter}-${verse}-kjv`;
  const canonical = `https://biblemaximum.com/${slug}`;

  // Truncate verse text for title (aim for ~60 chars of excerpt)
  const titleExcerpt = verseText.length > 60 ? verseText.substring(0, 57) + '...' : verseText;

  // Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com' },
      { '@type': 'ListItem', position: 2, name: `${bookName}`, item: `https://biblemaximum.com/${bookSlug}-chapters` },
      { '@type': 'ListItem', position: 3, name: `${bookName} ${chapter}`, item: `https://biblemaximum.com/chapters/${bookSlug}/${chapter}` },
      { '@type': 'ListItem', position: 4, name: reference, item: canonical },
    ],
  };

  const verseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `KJV ${reference} - ${titleExcerpt}`,
    description: verseText,
    url: canonical,
    datePublished: '2026-02-27',
    dateModified: '2026-02-27',
    author: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
    about: [
      { '@type': 'Thing', name: reference },
      { '@type': 'Thing', name: topic },
    ],
  };

  return (
    <div className="min-h-screen bg-primary-light/30">
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={verseSchema} />

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-grace">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <ol className="flex items-center flex-wrap gap-y-1 text-sm">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li><Link href={`/${bookSlug}-chapters`} className="text-blue-600 hover:underline">{bookName}</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li><Link href={`/chapters/${bookSlug}/${chapter}`} className="text-blue-600 hover:underline">Chapter {chapter}</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li className="text-primary-dark/70">Verse {verse}</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero with verse text */}
        <header className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mb-6">
          <div className="relative bg-gradient-to-r from-blue-700 to-blue-800 text-white px-6 py-10">
            <div className="absolute inset-0 opacity-10">
              <Image
                src="/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="relative">
              <p className="text-blue-200 text-sm font-medium mb-2 tracking-wide uppercase">King James Version</p>
              <h1 className="text-2xl md:text-3xl font-display font-bold mb-4">
                {reference} KJV
              </h1>
              <blockquote className="text-xl md:text-2xl leading-relaxed italic text-blue-50">
                &ldquo;{verseText}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-medium">{topic}</span>
                {crossRefs.length > 0 && (
                  <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-medium">
                    {crossRefs.length} Cross-References
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Context — Previous and Next Verses */}
        <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
          <h2 className="text-lg font-bold text-scripture mb-4">{bookName} {chapter} — Context</h2>
          <div className="space-y-3">
            {prevVerse && (
              <div className="text-primary-dark/60 text-sm leading-relaxed">
                <Link href={`/${bookSlug}-${chapter}-${prevVerse.verse}-kjv`} className="font-semibold text-blue-600 hover:underline">
                  {bookName} {chapter}:{prevVerse.verse}
                </Link>
                {' '}&mdash; &ldquo;{prevVerse.text.substring(0, 120)}{prevVerse.text.length > 120 ? '...' : ''}&rdquo;
              </div>
            )}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
              <span className="font-bold text-scripture">{reference}</span>
              {' '}&mdash; &ldquo;{verseText}&rdquo;
            </div>
            {nextVerse && (
              <div className="text-primary-dark/60 text-sm leading-relaxed">
                <Link href={`/${bookSlug}-${chapter}-${nextVerse.verse}-kjv`} className="font-semibold text-blue-600 hover:underline">
                  {bookName} {chapter}:{nextVerse.verse}
                </Link>
                {' '}&mdash; &ldquo;{nextVerse.text.substring(0, 120)}{nextVerse.text.length > 120 ? '...' : ''}&rdquo;
              </div>
            )}
          </div>
        </section>

        {/* Cross-References */}
        {crossRefs.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h2 className="text-lg font-bold text-scripture mb-4">
              Cross-References for {reference} ({crossRefs.length})
            </h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {crossRefs.slice(0, 20).map((ref: string, i: number) => {
                const parts = ref.split('-');
                const v = parseInt(parts.pop() || '0');
                const ch = parseInt(parts.pop() || '0');
                const bk = parts.join('-');
                const refBookName = getBookName(bk);
                return (
                  <Link
                    key={i}
                    href={`/${bk}-${ch}-${v}-kjv`}
                    className="px-3 py-2 rounded-lg border border-grace/50 hover:border-blue-300 hover:bg-primary-light transition-colors text-sm text-blue-600 hover:text-blue-700"
                  >
                    {refBookName} {ch}:{v}
                  </Link>
                );
              })}
            </div>
            {crossRefs.length > 20 && (
              <p className="text-xs text-primary-dark/50 mt-3">
                + {crossRefs.length - 20} more cross-references
              </p>
            )}
          </section>
        )}

        {/* Internal Links */}
        <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
          <h2 className="text-lg font-bold text-scripture mb-4">Study {reference}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href={`/verses/${bookSlug}/${chapter}/${verse}`}
              className="flex items-start gap-3 p-3 rounded-lg border border-grace/50 hover:border-blue-300 hover:bg-primary-light transition-colors group"
            >
              <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary-dark/40 group-hover:text-blue-500 whitespace-nowrap">
                Commentary
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-scripture group-hover:text-blue-600">
                  {reference} — Verse Study
                </div>
                <div className="text-xs text-primary-dark/60 mt-0.5">Commentary, Hebrew/Greek, cross-references</div>
              </div>
            </Link>
            <Link
              href={`/bible-quotes/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="flex items-start gap-3 p-3 rounded-lg border border-grace/50 hover:border-blue-300 hover:bg-primary-light transition-colors group"
            >
              <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary-dark/40 group-hover:text-blue-500 whitespace-nowrap">
                Quotes
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-scripture group-hover:text-blue-600">
                  Bible Quotes About {topic}
                </div>
                <div className="text-xs text-primary-dark/60 mt-0.5">More verses on this topic</div>
              </div>
            </Link>
            <Link
              href={`/${bookSlug}-${chapter}-quiz`}
              className="flex items-start gap-3 p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors group"
            >
              <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-white/70 whitespace-nowrap">
                Quiz
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-white">
                  {bookName} Chapter {chapter} Quiz
                </div>
                <div className="text-xs text-blue-100 mt-0.5">Test your knowledge</div>
              </div>
            </Link>
            <Link
              href={`/what-does-the-bible-say-about/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="flex items-start gap-3 p-3 rounded-lg border border-grace/50 hover:border-blue-300 hover:bg-primary-light transition-colors group"
            >
              <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary-dark/40 group-hover:text-blue-500 whitespace-nowrap">
                Study
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-scripture group-hover:text-blue-600">
                  What Does the Bible Say About {topic}?
                </div>
                <div className="text-xs text-primary-dark/60 mt-0.5">Complete study guide</div>
              </div>
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          {prevVerse ? (
            <Link href={`/${bookSlug}-${chapter}-${prevVerse.verse}-kjv`} className="text-blue-600 hover:underline text-sm">
              ← {bookName} {chapter}:{prevVerse.verse}
            </Link>
          ) : <span />}
          <Link href={`/chapters/${bookSlug}/${chapter}`} className="text-blue-600 hover:underline text-sm">
            {bookName} {chapter}
          </Link>
          {nextVerse ? (
            <Link href={`/${bookSlug}-${chapter}-${nextVerse.verse}-kjv`} className="text-blue-600 hover:underline text-sm">
              {bookName} {chapter}:{nextVerse.verse} →
            </Link>
          ) : <span />}
        </div>
      </main>
    </div>
  );
}
