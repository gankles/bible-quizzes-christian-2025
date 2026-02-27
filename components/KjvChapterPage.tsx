import Link from 'next/link';
import Image from 'next/image';
import { getChapterWithCommentary, stripHtml, getBookName } from '@/lib/bolls-api';
import { getCrossReferences } from '@/lib/cross-references';
import { getVerseTopic } from '@/lib/kjv-verse-data';
import { StructuredData } from '@/components/StructuredData';

interface KjvChapterPageProps {
  bookSlug: string;
  chapter: number;
  bookName: string;
  totalChapters: number;
}

export default async function KjvChapterPage({ bookSlug, chapter, bookName, totalChapters }: KjvChapterPageProps) {
  // Load all verses for this chapter
  let verses: { verse: number; text: string }[] = [];

  try {
    const chapterVerses = await getChapterWithCommentary('KJV', bookSlug, chapter);
    verses = chapterVerses.map((v: any) => ({
      verse: v.verse,
      text: stripHtml(v.text),
    }));
  } catch {}

  if (verses.length === 0) return null;

  const reference = `${bookName} ${chapter}`;
  const slug = `${bookSlug}-${chapter}-kjv`;
  const canonical = `https://biblemaximum.com/${slug}`;

  // First verse excerpt for schema
  const firstVerseText = verses[0]?.text || '';
  const excerpt = firstVerseText.length > 55 ? firstVerseText.substring(0, 52) + '...' : firstVerseText;

  // Get topic from first verse for the chapter theme
  const chapterTopic = getVerseTopic(bookSlug, chapter, 1);

  // Prev/next chapter links
  const prevChapter = chapter > 1 ? chapter - 1 : null;
  const nextChapter = chapter < totalChapters ? chapter + 1 : null;

  // Compute cross-references per verse once (reused in hero count + key verses)
  const verseCrossRefs = verses.map((v) => {
    const refs = getCrossReferences(`${bookSlug}-${chapter}-${v.verse}`);
    return { ...v, crossRefCount: refs.length };
  });
  const totalCrossRefs = verseCrossRefs.reduce((sum, v) => sum + v.crossRefCount, 0);
  const keyVerses = verseCrossRefs
    .filter((v) => v.crossRefCount > 0)
    .sort((a, b) => b.crossRefCount - a.crossRefCount)
    .slice(0, 5);

  // Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com' },
      { '@type': 'ListItem', position: 2, name: bookName, item: `https://biblemaximum.com/${bookSlug}-chapters` },
      { '@type': 'ListItem', position: 3, name: reference, item: canonical },
    ],
  };

  const chapterSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `KJV ${reference} - ${excerpt}`,
    description: `Read ${reference} KJV (King James Version). ${verses.length} verses starting with: "${excerpt}"`,
    url: canonical,
    datePublished: '2026-02-27',
    dateModified: '2026-02-27',
    author: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
    about: [
      { '@type': 'Thing', name: reference },
      { '@type': 'Thing', name: chapterTopic },
    ],
  };

  return (
    <div className="min-h-screen bg-primary-light/30">
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={chapterSchema} />

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-grace">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <ol className="flex items-center flex-wrap gap-y-1 text-sm">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li><Link href={`/${bookSlug}-chapters`} className="text-blue-600 hover:underline">{bookName}</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li className="text-primary-dark/70">Chapter {chapter}</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero */}
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
              <h1 className="text-2xl md:text-3xl font-display font-bold mb-3">
                {reference} KJV
              </h1>
              <p className="text-lg text-blue-100 italic">
                &ldquo;{excerpt}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-medium">{verses.length} Verses</span>
                <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-medium">{chapterTopic}</span>
                {totalCrossRefs > 0 && (
                  <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-medium">
                    {totalCrossRefs} Cross-References
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Full Chapter Text */}
        <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
          <h2 className="text-lg font-bold text-scripture mb-4">{reference} — Full Text (KJV)</h2>
          <div className="space-y-3">
            {verses.map((v) => (
              <p key={v.verse} className="text-primary-dark/80 leading-relaxed">
                <Link
                  href={`/${bookSlug}-${chapter}-${v.verse}-kjv`}
                  className="font-bold text-blue-600 hover:underline text-sm mr-1"
                >
                  {v.verse}
                </Link>
                {v.text}
              </p>
            ))}
          </div>
        </section>

        {/* Key Verses — top 5 verses with most cross-references */}
        {keyVerses.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
            <h2 className="text-lg font-bold text-scripture mb-4">Key Verses in {reference}</h2>
            <div className="space-y-3">
              {keyVerses.map((v) => (
                <div key={v.verse} className="border-l-4 border-blue-300 pl-4">
                  <Link
                    href={`/${bookSlug}-${chapter}-${v.verse}-kjv`}
                    className="font-semibold text-blue-600 hover:underline text-sm"
                  >
                    {bookName} {chapter}:{v.verse}
                  </Link>
                  <span className="text-xs text-primary-dark/50 ml-2">({v.crossRefCount} cross-refs)</span>
                  <p className="text-primary-dark/70 text-sm mt-1 italic">
                    &ldquo;{v.text.substring(0, 150)}{v.text.length > 150 ? '...' : ''}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Internal Links */}
        <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
          <h2 className="text-lg font-bold text-scripture mb-4">Study {reference}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href={`/chapters/${bookSlug}/${chapter}`}
              className="flex items-start gap-3 p-3 rounded-lg border border-grace/50 hover:border-blue-300 hover:bg-primary-light transition-colors group"
            >
              <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary-dark/40 group-hover:text-blue-500 whitespace-nowrap">
                Commentary
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-scripture group-hover:text-blue-600">
                  {reference} — Verse-by-Verse Commentary
                </div>
                <div className="text-xs text-primary-dark/60 mt-0.5">Study notes, Hebrew/Greek, cross-references</div>
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
                  {reference} Quiz
                </div>
                <div className="text-xs text-blue-100 mt-0.5">Test your knowledge of this chapter</div>
              </div>
            </Link>
            <Link
              href={`/bible-chapter-summaries/${bookSlug}/${chapter}`}
              className="flex items-start gap-3 p-3 rounded-lg border border-grace/50 hover:border-blue-300 hover:bg-primary-light transition-colors group"
            >
              <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary-dark/40 group-hover:text-blue-500 whitespace-nowrap">
                Summary
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-scripture group-hover:text-blue-600">
                  {reference} Summary
                </div>
                <div className="text-xs text-primary-dark/60 mt-0.5">Chapter overview and key themes</div>
              </div>
            </Link>
            <Link
              href={`/bible-quotes/${chapterTopic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="flex items-start gap-3 p-3 rounded-lg border border-grace/50 hover:border-blue-300 hover:bg-primary-light transition-colors group"
            >
              <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary-dark/40 group-hover:text-blue-500 whitespace-nowrap">
                Quotes
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-scripture group-hover:text-blue-600">
                  Bible Quotes About {chapterTopic}
                </div>
                <div className="text-xs text-primary-dark/60 mt-0.5">More verses on this topic</div>
              </div>
            </Link>
          </div>
        </section>

        {/* Verse Index */}
        <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
          <h2 className="text-lg font-bold text-scripture mb-4">{reference} — All Verses</h2>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {verses.map((v) => (
              <Link
                key={v.verse}
                href={`/${bookSlug}-${chapter}-${v.verse}-kjv`}
                className="text-center px-2 py-1.5 rounded border border-grace/50 hover:border-blue-300 hover:bg-primary-light transition-colors text-sm text-blue-600 hover:text-blue-700"
              >
                {v.verse}
              </Link>
            ))}
          </div>
        </section>

        {/* Chapter Navigation */}
        <div className="flex items-center justify-between">
          {prevChapter ? (
            <Link href={`/${bookSlug}-${prevChapter}-kjv`} className="text-blue-600 hover:underline text-sm">
              &larr; {bookName} {prevChapter}
            </Link>
          ) : <span />}
          <Link href={`/${bookSlug}-chapters`} className="text-blue-600 hover:underline text-sm">
            All {bookName} Chapters
          </Link>
          {nextChapter ? (
            <Link href={`/${bookSlug}-${nextChapter}-kjv`} className="text-blue-600 hover:underline text-sm">
              {bookName} {nextChapter} &rarr;
            </Link>
          ) : <span />}
        </div>
      </main>
    </div>
  );
}
