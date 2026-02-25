import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BIBLE_BOOKS } from '@/lib/bible-data';
import {
  getInterlinearVerse,
  getBookName,
  isOldTestament,
  getInterlinearChapterVerses,
} from '@/lib/interlinear-data';
import { StructuredData } from '@/components/StructuredData';
import { getVersePlaces, formatPlaceTypeSingular } from '@/lib/geocoding-data';

interface PageProps {
  params: Promise<{ book: string; chapter: string; verse: string }>;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { book: bookSlug, chapter: chapterStr, verse: verseStr } = await params;
  const bookName = getBookName(bookSlug);
  const chapter = parseInt(chapterStr, 10);
  const verse = parseInt(verseStr, 10);
  if (!bookName || isNaN(chapter) || isNaN(verse)) return {};

  const lang = isOldTestament(bookSlug) ? 'Hebrew' : 'Greek';

  return {
    title: `${bookName} ${chapter}:${verse} Interlinear Bible - Word by Word ${lang} Analysis | Bible Maximum`,
    description: `Study ${bookName} ${chapter}:${verse} with word-by-word ${lang} interlinear analysis. Each word includes the original ${lang}, Strong's number, transliteration, English translation, parsing, and definition.`,
    keywords: [
      `${bookName} ${chapter}:${verse} interlinear`, `${bookName} ${chapter}:${verse} ${lang.toLowerCase()}`,
      'interlinear Bible', `${lang} word study`, `Strong's numbers ${bookName}`,
      'word by word Bible', `${bookName} ${lang.toLowerCase()} analysis`,
    ],
    openGraph: {
      title: `${bookName} ${chapter}:${verse} Interlinear — ${lang} Word-by-Word`,
      description: `Word-by-word ${lang} interlinear analysis of ${bookName} ${chapter}:${verse}.`,
      url: `/interlinear/${bookSlug}/${chapter}/${verse}`,
      type: 'article',
    },
    alternates: { canonical: `/interlinear/${bookSlug}/${chapter}/${verse}` },
  };
}

export default async function InterlinearVersePage({ params }: PageProps) {
  const { book: bookSlug, chapter: chapterStr, verse: verseStr } = await params;
  const bookName = getBookName(bookSlug);
  const chapter = parseInt(chapterStr, 10);
  const verse = parseInt(verseStr, 10);
  if (!bookName || isNaN(chapter) || isNaN(verse)) notFound();

  const bookData = BIBLE_BOOKS.find(b => b.slug === bookSlug);
  if (!bookData || chapter < 1 || chapter > bookData.chapters) notFound();

  const words = getInterlinearVerse(bookSlug, chapter, verse);
  if (!words || words.length === 0) notFound();

  const isOT = isOldTestament(bookSlug);
  const lang = isOT ? 'Hebrew' : 'Greek';

  // Build KJV text from English words
  const kjvText = words.map(w => w.english).join(' ');

  // Adjacent verses
  const chapterVerses = getInterlinearChapterVerses(bookSlug, chapter);
  const verseIdx = chapterVerses.findIndex(v => v.verse === verse);
  const prevVerse = verseIdx > 0 ? chapterVerses[verseIdx - 1] : null;
  const nextVerse = verseIdx < chapterVerses.length - 1 ? chapterVerses[verseIdx + 1] : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${bookName} ${chapter}:${verse} Interlinear Bible`,
    description: `Word-by-word ${lang} interlinear analysis of ${bookName} ${chapter}:${verse}.`,
    url: `https://biblemaximum.com/interlinear/${bookSlug}/${chapter}/${verse}`,
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Interlinear Bible', item: 'https://biblemaximum.com/interlinear' },
      { '@type': 'ListItem', position: 3, name: bookName, item: `https://biblemaximum.com/interlinear/${bookSlug}` },
      { '@type': 'ListItem', position: 4, name: `Chapter ${chapter}`, item: `https://biblemaximum.com/interlinear/${bookSlug}/${chapter}` },
      { '@type': 'ListItem', position: 5, name: `Verse ${verse}` },
    ],
  };

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero */}
        <div className="bg-white border-b border-grace py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-10">
            <nav className="flex items-center gap-2 text-sm text-primary-dark/60 mb-6 flex-wrap">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/interlinear" className="hover:text-blue-600 transition-colors">Interlinear</Link>
              <span>/</span>
              <Link href={`/interlinear/${bookSlug}`} className="hover:text-blue-600 transition-colors">{bookName}</Link>
              <span>/</span>
              <Link href={`/interlinear/${bookSlug}/${chapter}`} className="hover:text-blue-600 transition-colors">Chapter {chapter}</Link>
              <span>/</span>
              <span className="text-scripture font-medium">Verse {verse}</span>
            </nav>

            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase mb-4">
              {lang} Interlinear
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-scripture font-display mb-3">
              {bookName} {chapter}:{verse} Interlinear
            </h1>
            <p className="text-primary-dark/70 text-sm mb-4 max-w-2xl">
              Word-by-word {lang} interlinear analysis of {bookName} {chapter}:{verse}, showing the original {lang} text with Strong&apos;s numbers, transliteration, and English translation for each word.
            </p>
            <blockquote className="text-lg text-primary-dark/70 italic border-l-4 border-blue-400 pl-4 py-1">
              &ldquo;{kjvText}&rdquo;
            </blockquote>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="max-w-4xl mx-auto px-4 md:px-10 mt-[-1.5rem] relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href={`/${bookSlug}-${chapter}-quiz`}
              className="bg-blue-600 rounded-lg p-5 text-white shadow-lg flex items-center justify-between hover:bg-blue-700 transition-colors"
            >
              <div>
                <h3 className="font-bold text-lg">Take the {bookName} {chapter} Quiz</h3>
                <p className="text-white/80 text-xs">Test your knowledge of this chapter</p>
              </div>
              <span className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase shrink-0 ml-3">
                Begin
              </span>
            </Link>
            <Link
              href={`/chapters/${bookSlug}/${chapter}`}
              className="bg-scripture rounded-lg p-5 text-white shadow-lg flex items-center justify-between hover:bg-scripture/90 transition-colors"
            >
              <div>
                <h3 className="font-bold text-lg">Full Chapter Reading</h3>
                <p className="text-white/80 text-xs">{bookName} {chapter} with commentary</p>
              </div>
              <span className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase shrink-0 ml-3">
                Read
              </span>
            </Link>
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-4 md:px-10 py-12">
          {/* Word-by-word Table */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-scripture font-display mb-4">
              Word-by-Word Analysis
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-grace rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-grace/20 border-b border-grace">
                    <th className="px-3 py-3 text-left text-[10px] font-bold uppercase text-primary-dark/50">#</th>
                    <th className="px-3 py-3 text-left text-[10px] font-bold uppercase text-primary-dark/50">Original</th>
                    {words.some(w => w.transliteration) && (
                      <th className="px-3 py-3 text-left text-[10px] font-bold uppercase text-primary-dark/50">Transliteration</th>
                    )}
                    <th className="px-3 py-3 text-left text-[10px] font-bold uppercase text-primary-dark/50">Strong&apos;s</th>
                    <th className="px-3 py-3 text-left text-[10px] font-bold uppercase text-primary-dark/50">English</th>
                    {words.some(w => w.parsing) && (
                      <th className="px-3 py-3 text-left text-[10px] font-bold uppercase text-primary-dark/50">Parsing</th>
                    )}
                    <th className="px-3 py-3 text-left text-[10px] font-bold uppercase text-primary-dark/50">Definition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-grace/50">
                  {words.map((word, i) => (
                    <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-3 py-3 text-sm text-primary-dark/40 font-mono">{word.position}</td>
                      <td className="px-3 py-3 text-lg font-bold text-scripture" dir={isOT ? 'rtl' : 'ltr'}>
                        {word.original}
                      </td>
                      {words.some(w => w.transliteration) && (
                        <td className="px-3 py-3 text-sm text-primary-dark/70 italic">
                          {word.transliteration}
                        </td>
                      )}
                      <td className="px-3 py-3">
                        {word.strongs ? (
                          <Link
                            href={`/lexicon/${word.strongs}`}
                            className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-mono font-semibold rounded hover:bg-blue-200 transition-colors"
                          >
                            {word.strongs}
                          </Link>
                        ) : (
                          <span className="text-primary-dark/40 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-sm font-medium text-scripture">
                        {word.english}
                      </td>
                      {words.some(w => w.parsing) && (
                        <td className="px-3 py-3 text-xs text-primary-dark/60 font-mono">
                          {word.parsing || '—'}
                        </td>
                      )}
                      <td className="px-3 py-3 text-sm text-primary-dark/70 max-w-xs">
                        {word.definition}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Geographic Context */}
          {(() => {
            const versePlaces = getVersePlaces(`${bookSlug}-${chapter}-${verse}`);
            if (versePlaces.length === 0) return null;
            return (
              <section className="mb-10">
                <h2 className="text-lg font-bold text-scripture mb-4">Geographic Context</h2>
                <div className="flex flex-wrap gap-2">
                  {versePlaces.map((place) => (
                    <Link
                      key={place.slug}
                      href={`/bible-places/${place.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-800 border border-green-200 rounded-full text-sm hover:bg-green-100 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {place.name}
                      <span className="text-green-600/60 text-xs">({formatPlaceTypeSingular(place.type)})</span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* Verse Context */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-scripture mb-4">Verse Context</h2>
            <div className="space-y-2">
              {prevVerse && (
                <Link
                  href={`/interlinear/${bookSlug}/${chapter}/${prevVerse.verse}`}
                  className="block bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 transition-all group"
                >
                  <span className="text-xs text-primary-dark/50">{bookName} {chapter}:{prevVerse.verse}</span>
                  <span className="block text-sm text-primary-dark/70 group-hover:text-blue-600 transition-colors">
                    {prevVerse.preview}...
                  </span>
                </Link>
              )}
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                <span className="text-xs font-bold text-blue-600">{bookName} {chapter}:{verse} (current)</span>
                <span className="block text-sm text-scripture font-medium">
                  {kjvText}
                </span>
              </div>
              {nextVerse && (
                <Link
                  href={`/interlinear/${bookSlug}/${chapter}/${nextVerse.verse}`}
                  className="block bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 transition-all group"
                >
                  <span className="text-xs text-primary-dark/50">{bookName} {chapter}:{nextVerse.verse}</span>
                  <span className="block text-sm text-primary-dark/70 group-hover:text-blue-600 transition-colors">
                    {nextVerse.preview}...
                  </span>
                </Link>
              )}
            </div>
          </section>

          {/* Prev/Next Verse Navigation */}
          <div className="flex items-center justify-between gap-4 mb-10">
            {prevVerse ? (
              <Link
                href={`/interlinear/${bookSlug}/${chapter}/${prevVerse.verse}`}
                className="flex-1 bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="text-xs text-primary-dark/60">Previous Verse</span>
                <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                  {bookName} {chapter}:{prevVerse.verse}
                </span>
              </Link>
            ) : <div className="flex-1" />}
            {nextVerse ? (
              <Link
                href={`/interlinear/${bookSlug}/${chapter}/${nextVerse.verse}`}
                className="flex-1 text-right bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="text-xs text-primary-dark/60">Next Verse</span>
                <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                  {bookName} {chapter}:{nextVerse.verse}
                </span>
              </Link>
            ) : <div className="flex-1" />}
          </div>

          {/* Internal Links */}
          <section className="bg-grace/10 border border-grace rounded-xl p-6">
            <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              <Link href={`/interlinear/${bookSlug}/${chapter}`} className="text-blue-600 hover:underline text-sm">
                {bookName} {chapter} Interlinear (all verses)
              </Link>
              <Link href={`/${bookSlug}-${chapter}-quiz`} className="text-blue-600 hover:underline text-sm">
                {bookName} {chapter} Quiz
              </Link>
              <Link href={`/verses/${bookSlug}/${chapter}/${verse}`} className="text-blue-600 hover:underline text-sm">
                {bookName} {chapter}:{verse} Verse Study
              </Link>
              <Link href={`/cross-references/${bookSlug}/${chapter}/${verse}`} className="text-blue-600 hover:underline text-sm">
                {bookName} {chapter}:{verse} Cross References
              </Link>
              <Link href={`/chapters/${bookSlug}/${chapter}`} className="text-blue-600 hover:underline text-sm">
                Read {bookName} {chapter}
              </Link>
              <Link href={`/lexicon/browse/${isOT ? 'hebrew' : 'greek'}`} className="text-blue-600 hover:underline text-sm">
                Browse {lang} Lexicon
              </Link>
              <Link href={`/interlinear/${bookSlug}`} className="text-blue-600 hover:underline text-sm">
                {bookName} Interlinear
              </Link>
              <Link href="/interlinear" className="text-blue-600 hover:underline text-sm">
                Interlinear Bible
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
