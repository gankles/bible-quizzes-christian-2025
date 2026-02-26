import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  getHebrewLetterIndex,
  getHebrewEntryCount,
  getStrongsHebrew,
  parseKjvTranslations,
} from '@/lib/strongs-data';
import { StructuredData } from '@/components/StructuredData';
import ExpandableSection from './ExpandableSection';

export const metadata: Metadata = {
  title: "Hebrew Word Studies — Strong's Hebrew Dictionary A-Z | Biblical Hebrew Lexicon | Bible Maximum",
  description:
    "Browse all 8,674 Hebrew words in Strong's Exhaustive Concordance. Study original Hebrew and Aramaic word meanings, transliterations, pronunciations, and KJV translations for deeper Bible understanding.",
  keywords: [
    "strong's hebrew dictionary",
    "hebrew word study",
    "biblical hebrew words",
    "old testament hebrew",
    "hebrew lexicon",
    "strong's concordance hebrew",
    "hebrew bible words",
    "original hebrew meanings",
  ],
  openGraph: {
    title: "Hebrew Word Studies — Strong's Hebrew Dictionary A-Z",
    description: "Browse all 8,674 Hebrew words in Strong's Concordance. Study original Hebrew meanings for deeper Bible understanding.",
    url: '/hebrew-word',
    type: 'website',
    images: ['/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png'],
  },
  alternates: { canonical: '/hebrew-word' },
};

function WordCard({ slug, number, transliteration, lemma, primaryTranslation }: {
  slug: string; number: string; transliteration: string; lemma: string; primaryTranslation: string;
}) {
  return (
    <Link
      href={`/hebrew-word/${slug}`}
      className="bg-white border border-grace rounded-lg px-3 py-2.5 hover:shadow-md hover:border-amber-300 transition-all group"
    >
      <div className="flex items-center gap-2">
        <span className="text-lg font-serif text-amber-900 flex-shrink-0" dir="rtl">
          {lemma}
        </span>
        <div className="min-w-0 flex-1">
          <span className="font-semibold text-scripture group-hover:text-amber-700 transition-colors text-sm block truncate">
            {transliteration}
          </span>
          <span className="text-xs text-primary-dark/40">{number}</span>
        </div>
      </div>
      {primaryTranslation && (
        <span className="block text-xs text-primary-dark/60 mt-1 truncate">
          {primaryTranslation}
        </span>
      )}
    </Link>
  );
}

export default function HebrewWordIndexPage() {
  const letterIndex = getHebrewLetterIndex();
  const totalEntries = getHebrewEntryCount();
  const letters = Object.keys(letterIndex).sort();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Hebrew Word Studies' },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "Strong's Hebrew Dictionary — Complete A-Z Index",
    description: `Browse all ${totalEntries.toLocaleString()} Hebrew words in Strong's Exhaustive Concordance.`,
    url: 'https://biblemaximum.com/hebrew-word',
    numberOfItems: totalEntries,
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={collectionSchema} />

      {/* Breadcrumb */}
      <nav className="max-w-5xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-amber-700">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">Hebrew Word Studies</span>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Hero Section */}
        <header className="relative bg-gradient-to-br from-amber-50 to-amber-100/60 border border-amber-200/80 rounded-2xl overflow-hidden mb-10">
          <div className="absolute inset-0 opacity-[0.06]">
            <Image
              src="/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative px-6 py-10 md:px-10 md:py-14 text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-scripture mb-3">
              Hebrew Word Studies
            </h1>
            <p className="text-primary-dark/70 max-w-2xl mx-auto leading-relaxed mb-6">
              Explore the original Hebrew and Aramaic words of the Old Testament using Strong&apos;s
              Exhaustive Concordance. Study word meanings, etymology, and how each word is
              translated in the King James Version.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-center">
              <div>
                <span className="block text-2xl font-bold text-amber-800">{totalEntries.toLocaleString()}</span>
                <span className="text-xs text-primary-dark/50 uppercase tracking-wider">Hebrew Words</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-amber-800">{letters.length}</span>
                <span className="text-xs text-primary-dark/50 uppercase tracking-wider">Letters</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-amber-800">H1 &ndash; H8674</span>
                <span className="text-xs text-primary-dark/50 uppercase tracking-wider">Strong&apos;s Range</span>
              </div>
            </div>
          </div>
        </header>

        {/* Letter Navigation Bar */}
        <nav className="bg-white border border-grace rounded-xl p-4 mb-8 sticky top-0 z-10 shadow-sm" aria-label="Letter navigation">
          <div className="flex flex-wrap justify-center gap-1.5">
            {letters.map(letter => (
              <a
                key={letter}
                href={`#${letter.toLowerCase()}`}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold bg-amber-50 text-amber-800 border border-amber-200/60 hover:bg-amber-100 hover:border-amber-300 transition-all"
              >
                {letter}
              </a>
            ))}
          </div>
          <p className="text-center text-xs text-primary-dark/40 mt-2">
            {totalEntries.toLocaleString()} words across {letters.length} letters
          </p>
        </nav>

        {/* Letter Sections */}
        <div className="space-y-10 mb-10">
          {letters.map(letter => {
            const slugs = letterIndex[letter] || [];
            const count = slugs.length;
            const hasMore = count > 20;

            // Build preview entries (first 20)
            const previewCards = slugs.slice(0, 20).map(s => {
              const entry = getStrongsHebrew(s);
              if (!entry) return null;
              const trans = parseKjvTranslations(entry.kjvTranslations);
              return (
                <WordCard
                  key={entry.slug}
                  slug={entry.slug}
                  number={entry.number}
                  transliteration={entry.transliteration}
                  lemma={entry.lemma}
                  primaryTranslation={trans[0] || entry.definition.split(',')[0]?.trim() || ''}
                />
              );
            });

            // Build remaining entries (beyond 20) — cap at 80 more to keep page size manageable
            const EXPAND_LIMIT = 80;
            const expandSlice = hasMore ? slugs.slice(20, 20 + EXPAND_LIMIT) : [];
            const hasEvenMore = count > 20 + EXPAND_LIMIT;
            const remainingCards = hasMore ? expandSlice.map(s => {
              const entry = getStrongsHebrew(s);
              if (!entry) return null;
              const trans = parseKjvTranslations(entry.kjvTranslations);
              return (
                <WordCard
                  key={entry.slug}
                  slug={entry.slug}
                  number={entry.number}
                  transliteration={entry.transliteration}
                  lemma={entry.lemma}
                  primaryTranslation={trans[0] || entry.definition.split(',')[0]?.trim() || ''}
                />
              );
            }) : null;

            return (
              <section key={letter} id={letter.toLowerCase()}>
                {/* Letter Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-12 h-12 flex items-center justify-center bg-amber-100 border border-amber-200/80 rounded-xl text-xl font-bold text-amber-800">
                    {letter}
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-scripture">{letter}</h2>
                    <p className="text-sm text-primary-dark/50">
                      {count.toLocaleString()} word{count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Word Grid — first 20 always visible */}
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {previewCards}
                </div>

                {/* Expandable remaining words */}
                {hasMore && remainingCards && (
                  <ExpandableSection
                    letter={letter}
                    totalCount={count}
                    showingCount={Math.min(count, 20 + EXPAND_LIMIT)}
                    hasEvenMore={hasEvenMore}
                  >
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2">
                      {remainingCards}
                    </div>
                  </ExpandableSection>
                )}
              </section>
            );
          })}
        </div>

        {/* CTA to Greek Word Studies */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100/60 border border-blue-200/80 rounded-xl p-6 mb-8 text-center">
          <h2 className="text-lg font-bold text-scripture mb-2">
            Study New Testament Greek
          </h2>
          <p className="text-sm text-primary-dark/60 mb-4 max-w-lg mx-auto">
            Continue your word study with the 5,523 Greek words of the New Testament from
            Strong&apos;s Greek Dictionary.
          </p>
          <Link
            href="/greek-word"
            className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm"
          >
            Explore Greek Word Studies
          </Link>
        </section>

        {/* Internal Links */}
        <section className="bg-gray-50 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Related Study Tools</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/interlinear" className="text-amber-700 hover:underline text-sm">
              Interlinear Bible
            </Link>
            <Link href="/bible-names" className="text-amber-700 hover:underline text-sm">
              Bible Names &amp; Meanings
            </Link>
            <Link href="/topics" className="text-amber-700 hover:underline text-sm">
              Bible Topics
            </Link>
            <Link href="/bible-quizzes" className="text-amber-700 hover:underline text-sm">
              Bible Quizzes
            </Link>
            <Link href="/people" className="text-amber-700 hover:underline text-sm">
              Bible Characters
            </Link>
            <Link href="/bible-geography" className="text-amber-700 hover:underline text-sm">
              Bible Geography
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
