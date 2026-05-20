import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getStrongsHebrew,
  getHebrewByNumber,
  getRelatedEntries,
  getHebrewNeighbors,
  getHebrewLetterIndex,
  parseKjvTranslations,
  StrongsEntry,
} from '@/lib/strongs-data';
import { StructuredData } from '@/components/StructuredData';
import { buildHebrewWordMetadata } from '@/lib/seo/metadata-builder';
import { buildWordStudySchema, buildBreadcrumbSchema } from '@/lib/seo/schema-builders';
import PrevNextNav from '@/components/page-sections/PrevNextNav';

export const revalidate = 86400 // 24 hours

export async function generateStaticParams() {
  // 8,674 pages — generated on-demand via ISR
  return [];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getStrongsHebrew(slug);
  if (!entry) return {};
  return buildHebrewWordMetadata(entry);
}

export default async function HebrewWordPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getStrongsHebrew(slug);
  if (!entry) notFound();

  const translations = parseKjvTranslations(entry.kjvTranslations);
  const relatedEntries = getRelatedEntries(entry);
  const { prev, next } = getHebrewNeighbors(entry);

  // Get same-letter words for browse section
  const firstLetter = entry.transliteration.charAt(0).toUpperCase();
  const letterIndex = getHebrewLetterIndex();
  const sameLetterSlugs = (letterIndex[firstLetter] || [])
    .filter(s => s !== entry.slug)
    .slice(0, 12);
  const sameLetterEntries: StrongsEntry[] = [];
  for (const s of sameLetterSlugs) {
    const e = getStrongsHebrew(s);
    if (e) sameLetterEntries.push(e);
  }

  // Extract cross-reference numbers from derivation
  const derivationRefs: string[] = [];
  const hRefPattern = /H(\d+)/g;
  let hMatch;
  while ((hMatch = hRefPattern.exec(entry.derivation)) !== null) {
    derivationRefs.push(`H${hMatch[1]}`);
  }

  // Primary translation for display
  const primaryTranslation = translations[0] || entry.definition.split(',')[0]?.trim() || '';

  // Determine if this is a proper noun (name) vs common word
  const isProperNoun = entry.definition.includes(', a ') ||
    entry.definition.includes('; a ') ||
    (entry.transliteration.charAt(0) === entry.transliteration.charAt(0).toUpperCase() &&
      entry.transliteration.length > 2 &&
      !entry.definition.includes('a primitive'));

  // JSON-LD
  const definedTermSchema = buildWordStudySchema({
    word: entry.transliteration,
    number: entry.number,
    definition: entry.definition,
    slug: entry.slug,
    language: 'Hebrew',
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Hebrew Word Studies', url: '/hebrew-word' },
    { name: entry.transliteration },
  ]);

  return (
    <>
      <StructuredData data={definedTermSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 pt-4 text-sm text-ink-muted">
        <Link href="/" className="hover:text-amber-700">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/hebrew-word" className="hover:text-amber-700">Hebrew Word Studies</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">{entry.transliteration}</span>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-8">

        {/* Hero Section */}
        <header className="relative bg-gradient-to-br from-amber-50 to-amber-100/60 border border-amber-200/80 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 opacity-[0.07]">
            <Image
              src="/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative px-6 py-10 md:px-10 md:py-14">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Hebrew letter and lemma */}
              <div className="flex-shrink-0 text-center">
                <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center bg-white/80 border border-amber-300/60 rounded-2xl shadow-sm mx-auto">
                  <span className="text-5xl md:text-6xl font-serif text-amber-900 leading-none" dir="rtl">
                    {entry.lemma}
                  </span>
                </div>
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700/70 mb-1">
                  Strong&apos;s {entry.number}
                </p>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-scripture mb-2">
                  {entry.transliteration}
                </h1>
                {entry.pronunciation && (
                  <p className="text-lg text-ink-muted mb-3">
                    /{entry.pronunciation}/
                  </p>
                )}
                <p className="text-scripture leading-relaxed max-w-xl">
                  {entry.definition}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Quick Facts Card */}
        <section className="bg-white border border-grace rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-scripture mb-4">Quick Facts</h2>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <dt className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-1">
                Strong&apos;s Number
              </dt>
              <dd className="text-scripture font-semibold">{entry.number}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-1">
                Hebrew
              </dt>
              <dd className="text-xl font-serif text-scripture" dir="rtl">{entry.lemma}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-1">
                Transliteration
              </dt>
              <dd className="text-scripture font-medium">{entry.transliteration}</dd>
            </div>
            {entry.pronunciation && (
              <div>
                <dt className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-1">
                  Pronunciation
                </dt>
                <dd className="text-scripture">/{entry.pronunciation}/</dd>
              </div>
            )}
            <div>
              <dt className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-1">
                KJV Translations
              </dt>
              <dd className="text-scripture text-sm">{translations.length} distinct rendering{translations.length !== 1 ? 's' : ''}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-1">
                Language
              </dt>
              <dd className="text-scripture">
                {entry.derivation.includes('(Aramaic)') ? 'Aramaic (Biblical)' : 'Biblical Hebrew'}
              </dd>
            </div>
          </dl>
        </section>

        {/* Definition & Etymology */}
        <section className="bg-white border border-grace rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-scripture mb-3">
            Definition &amp; Etymology
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-ink-muted uppercase tracking-wider mb-2">
                Full Definition
              </h3>
              <p className="text-scripture leading-relaxed text-base">
                {entry.definition}
              </p>
            </div>
            <div className="border-t border-grace/50 pt-4">
              <h3 className="text-sm font-semibold text-ink-muted uppercase tracking-wider mb-2">
                Derivation
              </h3>
              <p className="text-scripture leading-relaxed">
                {entry.derivation}
                {derivationRefs.length > 0 && (
                  <span className="block mt-2 text-sm">
                    {derivationRefs.map((ref) => {
                      const data = getHebrewByNumber(ref);
                      if (!data) return null;
                      return (
                        <Link
                          key={ref}
                          href={`/hebrew-word/${data.slug}`}
                          className="inline-block mr-3 mb-1 text-amber-700 hover:text-amber-900 hover:underline"
                        >
                          {ref} ({data.transliteration})
                        </Link>
                      );
                    })}
                  </span>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* KJV Translation Breakdown */}
        {translations.length > 0 && (
          <section className="bg-white border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-4">
              KJV Translation Breakdown
            </h2>
            <p className="text-sm text-ink-muted mb-4">
              This Hebrew word is translated as the following in the King James Version:
            </p>
            <div className="flex flex-wrap gap-2">
              {translations.map((t, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-3 py-1.5 bg-amber-50 border border-amber-200/80 rounded-lg text-sm text-amber-900 font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
            {entry.kjvTranslations.toLowerCase().includes('compare') && (
              <p className="text-xs text-ink-muted mt-3 italic">
                {entry.kjvTranslations.match(/Compare.*/i)?.[0] || ''}
              </p>
            )}
          </section>
        )}

        {/* Related Words */}
        {relatedEntries.length > 0 && (
          <section className="bg-white border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-4">
              Related Hebrew Words
            </h2>
            <p className="text-sm text-ink-muted mb-4">
              Words sharing the same root or referenced in the derivation of {entry.transliteration}:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedEntries.map(rel => {
                const relTranslations = parseKjvTranslations(rel.kjvTranslations);
                const relPrimary = relTranslations[0] || rel.definition.split(',')[0]?.trim() || '';
                return (
                  <Link
                    key={rel.slug}
                    href={`/hebrew-word/${rel.slug}`}
                    className="flex items-start gap-3 bg-amber-50/50 border border-amber-200/60 rounded-lg px-4 py-3 hover:shadow-md hover:border-amber-300 transition-all group"
                  >
                    <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-white border border-amber-200/60 rounded-lg text-lg font-serif text-amber-900" dir="rtl">
                      {rel.lemma}
                    </span>
                    <div className="min-w-0">
                      <span className="font-semibold text-scripture group-hover:text-amber-700 transition-colors block">
                        {rel.transliteration}
                      </span>
                      <span className="text-xs text-ink-muted block">{rel.number}</span>
                      <span className="text-sm text-ink-muted line-clamp-1 block mt-0.5">
                        &ldquo;{relPrimary}&rdquo;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* CRO Section — Deepen Your Study */}
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-scripture mb-2">Deepen Your Study</h2>
          <p className="text-sm text-ink-muted mb-5">
            Continue exploring the Hebrew language and biblical concepts connected to {entry.transliteration}.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/topics"
              className="flex items-center gap-3 bg-white border border-amber-200/60 rounded-lg px-4 py-3 hover:shadow-md hover:border-amber-300 transition-all group"
            >
              <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-amber-100 rounded-lg text-amber-700 font-bold text-sm">T</span>
              <div>
                <span className="font-semibold text-scripture group-hover:text-amber-700 transition-colors block text-sm">
                  Bible Topics
                </span>
                <span className="text-xs text-ink-muted">Study key biblical themes</span>
              </div>
            </Link>
            <Link
              href="/bible-quizzes"
              className="flex items-center gap-3 bg-white border border-amber-200/60 rounded-lg px-4 py-3 hover:shadow-md hover:border-amber-300 transition-all group"
            >
              <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-amber-100 rounded-lg text-amber-700 font-bold text-sm">Q</span>
              <div>
                <span className="font-semibold text-scripture group-hover:text-amber-700 transition-colors block text-sm">
                  Bible Quizzes
                </span>
                <span className="text-xs text-ink-muted">Test your knowledge</span>
              </div>
            </Link>
            <Link
              href={`/hebrew-word#${firstLetter.toLowerCase()}`}
              className="flex items-center gap-3 bg-white border border-amber-200/60 rounded-lg px-4 py-3 hover:shadow-md hover:border-amber-300 transition-all group"
            >
              <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-amber-100 rounded-lg text-amber-700 font-bold text-sm">{firstLetter}</span>
              <div>
                <span className="font-semibold text-scripture group-hover:text-amber-700 transition-colors block text-sm">
                  Hebrew Words: {firstLetter}
                </span>
                <span className="text-xs text-ink-muted">Browse all words starting with {firstLetter}</span>
              </div>
            </Link>
            {isProperNoun && (
              <Link
                href="/bible-names"
                className="flex items-center gap-3 bg-white border border-amber-200/60 rounded-lg px-4 py-3 hover:shadow-md hover:border-amber-300 transition-all group"
              >
                <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-amber-100 rounded-lg text-amber-700 font-bold text-sm">N</span>
                <div>
                  <span className="font-semibold text-scripture group-hover:text-amber-700 transition-colors block text-sm">
                    Bible Names
                  </span>
                  <span className="text-xs text-ink-muted">Explore biblical name meanings</span>
                </div>
              </Link>
            )}
            {!isProperNoun && (
              <Link
                href="/interlinear"
                className="flex items-center gap-3 bg-white border border-amber-200/60 rounded-lg px-4 py-3 hover:shadow-md hover:border-amber-300 transition-all group"
              >
                <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-amber-100 rounded-lg text-amber-700 font-bold text-sm">I</span>
                <div>
                  <span className="font-semibold text-scripture group-hover:text-amber-700 transition-colors block text-sm">
                    Interlinear Bible
                  </span>
                  <span className="text-xs text-ink-muted">See Hebrew words in context</span>
                </div>
              </Link>
            )}
          </div>
        </section>

        {/* Prev / Next Navigation */}
        <PrevNextNav
          prev={prev ? { href: `/hebrew-word/${prev.slug}`, label: prev.transliteration, detail: prev.number } : null}
          next={next ? { href: `/hebrew-word/${next.slug}`, label: next.transliteration, detail: next.number } : null}
          variant="amber"
        />

        {/* Browse — Same Letter Words */}
        {sameLetterEntries.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-scripture mb-4">
              More Hebrew Words Starting with &ldquo;{firstLetter}&rdquo;
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {sameLetterEntries.map(e => {
                const eTrans = parseKjvTranslations(e.kjvTranslations);
                return (
                  <Link
                    key={e.slug}
                    href={`/hebrew-word/${e.slug}`}
                    className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-amber-300 transition-all group"
                  >
                    <span className="font-semibold text-scripture group-hover:text-amber-700 transition-colors">
                      {e.transliteration}
                    </span>
                    <span className="text-xs text-ink-light ml-2">{e.number}</span>
                    <span className="block text-xs text-ink-muted mt-0.5 line-clamp-1">
                      {eTrans[0] || e.definition.split(',')[0]?.trim() || ''}
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 text-center">
              <Link
                href={`/hebrew-word#${firstLetter.toLowerCase()}`}
                className="text-sm text-amber-700 hover:text-amber-900 hover:underline font-medium"
              >
                View all Hebrew words starting with {firstLetter}
              </Link>
            </div>
          </section>
        )}

        {/* Internal Links Footer */}
        <section className="bg-gray-50 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/hebrew-word" className="text-amber-700 hover:underline text-sm">
              Hebrew Word Studies (A-Z Index)
            </Link>
            <Link href="/bible-names" className="text-amber-700 hover:underline text-sm">
              Bible Names &amp; Meanings
            </Link>
            <Link href="/topics" className="text-amber-700 hover:underline text-sm">
              Bible Topics
            </Link>
            <Link href="/interlinear" className="text-amber-700 hover:underline text-sm">
              Interlinear Bible
            </Link>
            <Link href="/bible-quizzes" className="text-amber-700 hover:underline text-sm">
              Bible Quizzes
            </Link>
            <Link href="/people" className="text-amber-700 hover:underline text-sm">
              Bible Characters
            </Link>
          </div>
        </section>

      </article>
    </>
  );
}
