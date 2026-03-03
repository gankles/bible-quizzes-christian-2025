import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  BookOpenIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
} from '@/components/icons'
import {
  getStrongsGreek,
  getAllGreekEntries,
  getGreekLetterIndex,
  getGreekByNumber,
  getGreekNeighbors,
  getGreekEntryCount,
  StrongsEntry,
} from '@/lib/strongs-data'
import { buildGreekWordMetadata } from '@/lib/seo/metadata-builder'
import { buildWordStudySchema, buildBreadcrumbSchema } from '@/lib/seo/schema-builders'
import { StructuredData } from '@/components/StructuredData'
import PrevNextNav from '@/components/page-sections/PrevNextNav'

export const revalidate = 86400 // 24 hours

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Parse KJV translations string into array of {translation, parenthetical?} */
function parseKjvTranslations(raw: string): { translation: string; raw: string }[] {
  if (!raw || raw === '--') return []
  return raw.split(',').map((t) => {
    const trimmed = t.trim().replace(/^--\s*/, '').replace(/\s+/g, ' ')
    return { translation: trimmed, raw: trimmed }
  }).filter((t) => t.translation.length > 0)
}

/** Extract Strong's number references from derivation text */
function parseDerivationRefs(derivation: string): { greekRefs: string[]; hebrewRefs: string[] } {
  const greekRefs: string[] = []
  const hebrewRefs: string[] = []
  const matches = derivation.match(/[GH]\d+/g) || []
  for (const m of matches) {
    if (m.startsWith('G')) greekRefs.push(m)
    else if (m.startsWith('H')) hebrewRefs.push(m)
  }
  return { greekRefs, hebrewRefs }
}

/** Find the slug for a given Strong's number like "G25" */
function findSlugByNumber(number: string): string | null {
  const entry = getGreekByNumber(number)
  return entry ? entry.slug : null
}

/** Get the first letter of the transliteration for grouping */
function getFirstLetter(transliteration: string): string {
  return transliteration.charAt(0).toUpperCase()
}

/** Get same-letter words (up to 12, excluding current) */
function getSameLetterWords(slug: string, transliteration: string): StrongsEntry[] {
  const letter = getFirstLetter(transliteration)
  const letterIndex = getGreekLetterIndex()
  const slugsInLetter = letterIndex[letter] || []
  const results: StrongsEntry[] = []
  for (const s of slugsInLetter) {
    if (s === slug) continue
    const entry = getStrongsGreek(s)
    if (entry) results.push(entry)
    if (results.length >= 12) break
  }
  return results
}

/** Build related Greek words from derivation refs */
function getRelatedGreekWords(derivation: string, currentSlug: string): StrongsEntry[] {
  const { greekRefs } = parseDerivationRefs(derivation)
  const allData = getAllGreekEntries()
  const results: StrongsEntry[] = []
  const seen = new Set<string>()
  seen.add(currentSlug)

  for (const ref of greekRefs) {
    const entry = getGreekByNumber(ref)
    if (entry && !seen.has(entry.slug)) {
      results.push(entry)
      seen.add(entry.slug)
    }
  }

  const currentNumber = getStrongsGreek(currentSlug)?.number
  if (currentNumber) {
    const pattern = new RegExp(`\\b${currentNumber}\\b`)
    for (const entry of allData) {
      if (seen.has(entry.slug)) continue
      if (pattern.test(entry.derivation)) {
        results.push(entry)
        seen.add(entry.slug)
        if (results.length >= 10) break
      }
    }
  }

  return results.slice(0, 10)
}

/** Capitalize first letter */
function capitalize(s: string): string {
  if (!s) return s
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  // ISR: generate on demand
  return []
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const entry = getStrongsGreek(slug)
  if (!entry) return { title: 'Greek Word Study Not Found' }
  return buildGreekWordMetadata(entry)
}

export default async function GreekWordStudyPage({ params }: PageProps) {
  const { slug } = await params
  const entry = getStrongsGreek(slug)
  if (!entry) notFound()

  const translations = parseKjvTranslations(entry.kjvTranslations)
  const { greekRefs, hebrewRefs } = parseDerivationRefs(entry.derivation)
  const relatedWords = getRelatedGreekWords(entry.derivation, slug)
  const { prev, next } = getGreekNeighbors(entry)
  const sameLetterWords = getSameLetterWords(slug, entry.transliteration)
  const letter = getFirstLetter(entry.transliteration)
  const letterIndex = getGreekLetterIndex()
  const letterCount = (letterIndex[letter] || []).length
  const hasHebrewOrigin = hebrewRefs.length > 0 || entry.derivation.toLowerCase().includes('hebrew origin')
  const primaryTranslation = translations[0]?.translation || entry.definition.split(',')[0].trim()

  // Clean derivation text by stripping inline Strong's references for display
  const derivationDisplay = entry.derivation
    .replace(/\(([^)]+)\)/g, (match, inner) => {
      // Keep the text inside parens but strip it if it's just a Greek/Hebrew word
      return `(${inner})`
    })

  // JSON-LD Schema
  const definedTermSchema = buildWordStudySchema({
    word: entry.transliteration,
    number: entry.number,
    definition: entry.definition,
    slug: entry.slug,
    language: 'Greek',
  })
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Greek Word Studies', url: '/greek-word' },
    { name: entry.transliteration },
  ])

  return (
    <div className="bg-white pb-32">
      <StructuredData data={definedTermSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* BREADCRUMB */}
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2 text-sm text-primary-dark/50">
          <li>
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
          </li>
          <li><ChevronRightIcon className="w-3 h-3" /></li>
          <li>
            <Link href="/greek-word" className="hover:text-indigo-600 transition-colors">
              Greek Word Studies
            </Link>
          </li>
          <li><ChevronRightIcon className="w-3 h-3" /></li>
          <li className="text-indigo-700 font-semibold">{entry.transliteration}</li>
        </ol>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 bg-gradient-to-br from-indigo-700 via-indigo-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        {/* Decorative Greek letter watermark */}
        <div className="absolute top-1/2 right-8 -translate-y-1/2 text-[20rem] font-bold text-white/[0.04] leading-none select-none pointer-events-none hidden lg:block">
          {letter}
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-semibold mb-6">
              <BookOpenIcon className="w-4 h-4" />
              <span>Greek Word Study</span>
            </div>

            {/* Greek Lemma */}
            <div className="text-5xl md:text-7xl font-bold mb-4 tracking-tight leading-tight">
              {entry.lemma}
            </div>

            {/* Transliteration */}
            <div className="text-2xl md:text-3xl font-semibold text-indigo-200 italic mb-2">
              {entry.transliteration}
            </div>

            {/* Pronunciation */}
            {entry.pronunciation && (
              <div className="text-lg text-indigo-300 mb-4">
                /{entry.pronunciation}/
              </div>
            )}

            {/* Strong's number badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 text-white font-mono text-lg mt-2">
              {entry.number}
            </div>
          </div>
        </div>
      </section>

      {/* QUICK FACTS CARD */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-lg border border-grace p-6 md:p-8">
          <h2 className="text-sm font-bold text-scripture mb-4 uppercase tracking-wider">
            Quick Facts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Strong's Number */}
            <div>
              <div className="text-xs font-bold uppercase text-indigo-600 tracking-wider mb-1">
                Strong&apos;s Number
              </div>
              <div className="text-xl font-bold text-scripture font-mono">
                {entry.number}
              </div>
            </div>

            {/* KJV Translations */}
            <div>
              <div className="text-xs font-bold uppercase text-indigo-600 tracking-wider mb-1">
                KJV Translations
              </div>
              <div className="flex flex-wrap gap-1.5">
                {translations.length > 0 ? translations.map((t, i) => (
                  <span
                    key={i}
                    className="inline-block px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-800 text-sm font-medium"
                  >
                    {t.translation}
                  </span>
                )) : (
                  <span className="text-primary-dark/60 text-sm">{entry.kjvTranslations || 'N/A'}</span>
                )}
              </div>
            </div>

            {/* Derivation */}
            <div>
              <div className="text-xs font-bold uppercase text-indigo-600 tracking-wider mb-1">
                Derivation / Root
              </div>
              <div className="text-sm text-primary-dark/70 leading-relaxed">
                {derivationDisplay || 'Primary root word'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL DEFINITION SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-bold font-display text-scripture mb-6 tracking-tight">
          Definition of {entry.transliteration}
        </h2>
        <div className="prose prose-lg max-w-none">
          <div className="bg-indigo-50/50 border-l-4 border-indigo-600 rounded-r-lg p-6 mb-6">
            <p className="text-primary-dark/80 leading-relaxed text-lg">
              <span className="font-bold text-indigo-800">{entry.lemma}</span>{' '}
              (<span className="italic">{entry.transliteration}</span>){' '}
              &mdash; {entry.definition}
            </p>
          </div>

          {/* Derivation Detail */}
          {entry.derivation && entry.derivation !== '--' && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-scripture mb-3">
                Word Origin
              </h3>
              <p className="text-primary-dark/70 leading-relaxed">
                This word comes {entry.derivation}{' '}
                {greekRefs.length > 0 && (
                  <span>
                    See the root word{greekRefs.length > 1 ? 's' : ''}:{' '}
                    {greekRefs.map((ref, i) => {
                      const refSlug = findSlugByNumber(ref)
                      const refEntry = refSlug ? getStrongsGreek(refSlug) : null
                      return (
                        <span key={ref}>
                          {i > 0 && ', '}
                          {refSlug ? (
                            <Link
                              href={`/greek-word/${refSlug}`}
                              className="text-indigo-600 hover:text-indigo-800 font-semibold underline decoration-indigo-300"
                            >
                              {ref}{refEntry ? ` (${refEntry.lemma})` : ''}
                            </Link>
                          ) : (
                            <span className="font-mono text-indigo-600">{ref}</span>
                          )}
                        </span>
                      )
                    })}
                    .
                  </span>
                )}
              </p>
              {hasHebrewOrigin && (
                <p className="text-sm text-primary-dark/60 mt-2 italic">
                  This word has Hebrew origin{hebrewRefs.length > 0 ? ` (${hebrewRefs.join(', ')})` : ''}, connecting the Old and New Testaments through shared vocabulary.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* KJV TRANSLATION VARIANTS TABLE */}
      {translations.length > 1 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-2xl font-bold font-display text-scripture mb-6 tracking-tight">
            KJV Translation Variants
          </h2>
          <p className="text-primary-dark/60 mb-6">
            The Greek word <strong className="text-indigo-700">{entry.lemma}</strong> ({entry.transliteration}) is translated into the following English words in the King James Version:
          </p>
          <div className="overflow-hidden rounded-xl border border-grace">
            <table className="w-full">
              <thead>
                <tr className="bg-indigo-50">
                  <th className="text-left px-6 py-3 text-sm font-bold text-indigo-800 uppercase tracking-wider">
                    English Translation
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-bold text-indigo-800 uppercase tracking-wider">
                    Strong&apos;s Ref
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-grace">
                {translations.map((t, i) => (
                  <tr key={i} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-6 py-4 text-primary-dark/80 font-medium">
                      {t.translation}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/lexicon/${entry.number}`}
                        className="font-mono text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        {entry.number}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-primary-dark/40 mt-3">
            Translation data from Strong&apos;s Exhaustive Concordance of the Bible.
          </p>
        </section>
      )}

      {/* RELATED GREEK WORDS */}
      {relatedWords.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-2xl font-bold font-display text-scripture mb-2 tracking-tight">
            Related Greek Words
          </h2>
          <p className="text-primary-dark/60 mb-6">
            Words sharing the same root or derived from <strong>{entry.lemma}</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedWords.map((rw) => (
              <Link
                key={rw.slug}
                href={`/greek-word/${rw.slug}`}
                className="group p-5 rounded-xl bg-white border border-grace hover:border-indigo-300 hover:shadow-md transition-all duration-300"
              >
                <div className="text-2xl font-bold text-scripture mb-1 group-hover:text-indigo-700 transition-colors">
                  {rw.lemma}
                </div>
                <div className="text-sm font-semibold text-indigo-600 italic mb-1">
                  {rw.transliteration}
                </div>
                <div className="text-xs font-mono text-primary-dark/40 mb-2">
                  {rw.number}
                </div>
                <div className="text-sm text-primary-dark/60 line-clamp-2">
                  {rw.definition}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CRO SECTION — "Continue Your Word Study" */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-br from-indigo-700 to-blue-800 rounded-2xl p-8 md:p-10 text-white">
          <h2 className="text-2xl md:text-3xl font-bold font-display mb-6 tracking-tight">
            Continue Your Word Study
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Hebrew equivalent CTA */}
            {hasHebrewOrigin && (
              <Link
                href="/hebrew-words"
                className="group p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="text-sm font-bold uppercase tracking-wider text-indigo-200 mb-2">
                  Old Testament Connection
                </div>
                <div className="text-lg font-bold mb-2">
                  Explore the Hebrew Equivalent
                </div>
                <p className="text-sm text-indigo-200 mb-3">
                  This word has Hebrew origin. Discover the Old Testament roots and usage.
                </p>
                <div className="flex items-center text-white text-sm font-semibold">
                  <span>Study Hebrew Words</span>
                  <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )}

            {/* Quiz CTA */}
            <Link
              href="/bible-quiz-difficulty/theological"
              className="group p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
            >
              <div className="text-sm font-bold uppercase tracking-wider text-indigo-200 mb-2">
                Test Your Knowledge
              </div>
              <div className="text-lg font-bold mb-2">
                Take a Theological Quiz
              </div>
              <p className="text-sm text-indigo-200 mb-3">
                Challenge yourself with questions on Greek vocabulary, word meanings, and biblical theology.
              </p>
              <div className="flex items-center text-white text-sm font-semibold">
                <span>Start Quiz</span>
                <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Browse CTA */}
            <Link
              href="/greek-word"
              className="group p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
            >
              <div className="text-sm font-bold uppercase tracking-wider text-indigo-200 mb-2">
                Full Index
              </div>
              <div className="text-lg font-bold mb-2">
                Browse All Greek Words
              </div>
              <p className="text-sm text-indigo-200 mb-3">
                Explore the complete Strong&apos;s Greek concordance with {getGreekEntryCount().toLocaleString()} entries.
              </p>
              <div className="flex items-center text-white text-sm font-semibold">
                <span>Browse A-Z</span>
                <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* PREVIOUS / NEXT NAVIGATION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <PrevNextNav
          prev={prev ? { href: `/greek-word/${prev.slug}`, label: prev.lemma, sublabel: `${prev.transliteration} (${prev.number})` } : null}
          next={next ? { href: `/greek-word/${next.slug}`, label: next.lemma, sublabel: `${next.transliteration} (${next.number})` } : null}
          variant="indigo"
          prevTitle="Previous Word"
          nextTitle="Next Word"
        />
      </section>

      {/* SAME LETTER BROWSE GRID */}
      {sameLetterWords.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-indigo-700 text-white flex items-center justify-center text-lg font-bold">
              {letter}
            </div>
            <div>
              <h2 className="text-xl font-bold text-scripture tracking-tight">
                More Greek Words Starting with &ldquo;{letter}&rdquo;
              </h2>
              <p className="text-sm text-primary-dark/50">{letterCount} words in this section</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {sameLetterWords.map((w) => (
              <Link
                key={w.slug}
                href={`/greek-word/${w.slug}`}
                className="group p-4 rounded-lg bg-white border border-grace hover:border-indigo-300 hover:shadow-sm transition-all"
              >
                <div className="text-lg font-bold text-scripture group-hover:text-indigo-700 transition-colors leading-tight mb-0.5">
                  {w.lemma}
                </div>
                <div className="text-xs text-indigo-600 italic truncate">
                  {w.transliteration}
                </div>
                <div className="text-[10px] font-mono text-primary-dark/30 mt-0.5">
                  {w.number}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              href={`/greek-word#letter-${letter}`}
              className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              View all {letterCount} words starting with &ldquo;{letter}&rdquo;
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </section>
      )}

      {/* INTERNAL LINKS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6 md:p-8">
          <h2 className="text-lg font-bold text-scripture mb-4">
            Related Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link
              href="/greek-word"
              className="px-4 py-3 bg-white border border-grace rounded-lg text-sm hover:border-indigo-300 transition-colors font-medium text-primary-dark/80"
            >
              Browse All Greek Words
            </Link>
            <Link
              href="/hebrew-words"
              className="px-4 py-3 bg-white border border-grace rounded-lg text-sm hover:border-indigo-300 transition-colors font-medium text-primary-dark/80"
            >
              Hebrew Word Studies
            </Link>
            <Link
              href={`/lexicon/${entry.number}`}
              className="px-4 py-3 bg-white border border-grace rounded-lg text-sm hover:border-indigo-300 transition-colors font-medium text-primary-dark/80"
            >
              {entry.number} in the Lexicon
            </Link>
            <Link
              href="/lexicon/browse/greek"
              className="px-4 py-3 bg-white border border-grace rounded-lg text-sm hover:border-indigo-300 transition-colors font-medium text-primary-dark/80"
            >
              Greek Strong&apos;s Index
            </Link>
            <Link
              href="/interlinear"
              className="px-4 py-3 bg-white border border-grace rounded-lg text-sm hover:border-indigo-300 transition-colors font-medium text-primary-dark/80"
            >
              Interlinear Bible
            </Link>
            <Link
              href="/greek-words"
              className="px-4 py-3 bg-white border border-grace rounded-lg text-sm hover:border-indigo-300 transition-colors font-medium text-primary-dark/80"
            >
              Key Greek Words Overview
            </Link>
            <Link
              href="/bible-quizzes"
              className="px-4 py-3 bg-white border border-grace rounded-lg text-sm hover:border-indigo-300 transition-colors font-medium text-primary-dark/80"
            >
              Bible Quizzes
            </Link>
            <Link
              href="/word-studies"
              className="px-4 py-3 bg-white border border-grace rounded-lg text-sm hover:border-indigo-300 transition-colors font-medium text-primary-dark/80"
            >
              Word Studies Hub
            </Link>
            <Link
              href="/bible-study-guides"
              className="px-4 py-3 bg-white border border-grace rounded-lg text-sm hover:border-indigo-300 transition-colors font-medium text-primary-dark/80"
            >
              Bible Study Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
