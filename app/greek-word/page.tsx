import { Metadata } from 'next'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import {
  BookOpenIcon,
  ArrowRightIcon,
  ChevronRightIcon,
} from '@/components/icons'

// ---------------------------------------------------------------------------
// Data loading
// ---------------------------------------------------------------------------

interface StrongsGreekEntry {
  number: string
  lemma: string
  transliteration: string
  pronunciation: string
  derivation: string
  definition: string
  kjvTranslations: string
  slug: string
}

interface StrongsGreekIndex {
  totalEntries: number
  slugMap: Record<string, string>
  letterIndex: Record<string, string[]>
}

let _dataCache: StrongsGreekEntry[] | null = null
let _indexCache: StrongsGreekIndex | null = null

function loadAllGreek(): StrongsGreekEntry[] {
  if (_dataCache) return _dataCache
  const filePath = path.join(process.cwd(), 'data/strongs-greek.json')
  _dataCache = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as StrongsGreekEntry[]
  return _dataCache
}

function loadIndex(): StrongsGreekIndex {
  if (_indexCache) return _indexCache
  const filePath = path.join(process.cwd(), 'data/strongs-greek-index.json')
  _indexCache = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as StrongsGreekIndex
  return _indexCache
}

// NOTE: When lib/strongs-data.ts is available, replace with:
//   import { getGreekLetterIndex } from '@/lib/strongs-data'

function getGreekLetterIndex(): Record<string, string[]> {
  return loadIndex().letterIndex
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Greek Word Studies | Strong's Greek Concordance — 5,500+ New Testament Words | Bible Maximum",
  description:
    "Browse the complete Strong's Greek Concordance with 5,500+ entries. Study every Greek word in the New Testament with definitions, KJV translations, derivations, and related words. A-Z index for in-depth biblical Greek study.",
  keywords: [
    "Strong's Greek concordance",
    'Greek word study',
    'New Testament Greek words',
    'biblical Greek dictionary',
    'Koine Greek vocabulary',
    'Greek Bible words',
    "Strong's numbers Greek",
    'Greek word meanings Bible',
    'learn biblical Greek',
    'NT Greek lexicon',
  ],
  alternates: { canonical: '/greek-word' },
  openGraph: {
    title: "Greek Word Studies | Strong's Greek Concordance",
    description:
      "Complete A-Z index of 5,500+ Greek words from the New Testament with definitions, translations, and word origins.",
    url: '/greek-word',
    type: 'website',
  },
}

// ---------------------------------------------------------------------------
// Featured words — theologically significant Greek words to highlight
// ---------------------------------------------------------------------------

const FEATURED_SLUGS = [
  'g26-agape',       // love
  'g4102-pistis',    // faith
  'g5485-charis',    // grace
  'g1680-elpis',     // hope
  'g3056-logos',     // word
  'g4151-pneuma',    // spirit
  'g1343-dikaiosyne', // righteousness
  'g3341-metanoia',  // repentance
  'g4991-soteria',   // salvation
  'g1391-doxa',      // glory
  'g32-angelos',     // angel
  'g2316-theos',     // God
]

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function GreekWordIndexPage() {
  const index = loadIndex()
  const data = loadAllGreek()
  const letterIndex = getGreekLetterIndex()
  const sortedLetters = Object.keys(letterIndex).sort()

  // Load featured entries
  const featuredEntries = FEATURED_SLUGS
    .map((slug) => data.find((e) => e.slug === slug))
    .filter(Boolean) as StrongsGreekEntry[]

  // Stats
  const totalEntries = index.totalEntries
  const totalLetters = sortedLetters.length
  const hebrewOriginCount = data.filter(
    (e) => e.derivation.toLowerCase().includes('hebrew origin')
  ).length

  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: "Strong's Greek Concordance — Greek Word Studies",
        description: `Browse ${totalEntries.toLocaleString()} Greek words from the New Testament with definitions, translations, and etymological analysis.`,
        url: 'https://biblemaximum.com/greek-word',
        numberOfItems: totalEntries,
        isPartOf: {
          '@type': 'WebSite',
          name: 'Bible Maximum',
          url: 'https://biblemaximum.com',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://biblemaximum.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Greek Word Studies',
          },
        ],
      },
    ],
  }

  return (
    <div className="bg-white pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* BREADCRUMB */}
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2 text-sm text-primary-dark/50">
          <li>
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
          </li>
          <li><ChevronRightIcon className="w-3 h-3" /></li>
          <li className="text-indigo-700 font-semibold">Greek Word Studies</li>
        </ol>
      </nav>

      {/* HERO */}
      <section className="relative pt-20 pb-20 bg-gradient-to-br from-indigo-700 via-indigo-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        {/* Decorative alpha/omega watermark */}
        <div className="absolute bottom-0 right-0 text-[18rem] font-bold text-white/[0.03] leading-none select-none pointer-events-none hidden lg:block translate-x-10 translate-y-16">
          A-Z
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-semibold mb-8">
              <BookOpenIcon className="w-4 h-4" />
              <span>{totalEntries.toLocaleString()} Greek Word Studies</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 tracking-tight leading-tight">
              Greek Word Studies
            </h1>

            <p className="text-xl md:text-2xl text-indigo-200 mb-10 max-w-3xl mx-auto leading-relaxed">
              The complete Strong&apos;s Greek Concordance. Study every word of the New Testament in its original Koine Greek with definitions, KJV translations, word origins, and related terms.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
              <div className="p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-3xl font-bold mb-1">{totalEntries.toLocaleString()}</div>
                <div className="text-sm text-indigo-200">Greek Words</div>
              </div>
              <div className="p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-3xl font-bold mb-1">{totalLetters}</div>
                <div className="text-sm text-indigo-200">Letter Sections</div>
              </div>
              <div className="p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-3xl font-bold mb-1">{hebrewOriginCount.toLocaleString()}</div>
                <div className="text-sm text-indigo-200">Hebrew-Origin Words</div>
              </div>
              <div className="p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-3xl font-bold mb-1">27</div>
                <div className="text-sm text-indigo-200">NT Books</div>
              </div>
            </div>

            <Link
              href="/hebrew-words"
              className="inline-flex items-center px-6 py-3 bg-white text-indigo-900 font-bold rounded-lg hover:bg-indigo-50 transition-colors shadow-md"
            >
              Explore Hebrew Word Studies
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 bg-primary-light/30 border-b border-grace">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-primary-dark/70 leading-relaxed">
            <p>
              The New Testament was written in Koine Greek, the common language of the first-century Roman Empire. The 27 books composed by the apostles and their associates employ approximately 5,500 unique Greek words, each carrying precise theological meaning. Strong&apos;s Concordance, compiled by James Strong in 1890, assigns a unique reference number to every Hebrew and Greek word in the King James Bible, making it possible to trace each English translation back to its original language.
            </p>
            <p>
              This index presents every Greek word in Strong&apos;s Concordance with its original script (lemma), transliteration, pronunciation guide, full definition, KJV translation variants, and etymological derivation. Whether you are a pastor preparing a sermon, a student working through a Greek exegesis assignment, or a believer who simply wants to understand what the apostle Paul actually wrote, these word studies provide direct access to the language of the New Testament.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED WORDS */}
      {featuredEntries.length > 0 && (
        <section className="py-16 border-b border-grace">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-display text-scripture mb-2 text-center tracking-tight">
              Key Greek Words in the New Testament
            </h2>
            <p className="text-center text-primary-dark/60 mb-10 max-w-2xl mx-auto">
              These theologically significant words form the foundation of New Testament doctrine. Study each one to deepen your understanding of Scripture.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {featuredEntries.map((entry) => {
                const shortDef = entry.definition.length > 80
                  ? entry.definition.slice(0, 80) + '...'
                  : entry.definition
                return (
                  <Link
                    key={entry.slug}
                    href={`/greek-word/${entry.slug}`}
                    className="group p-6 rounded-xl bg-white border border-grace hover:border-indigo-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-3xl font-bold text-scripture mb-1 group-hover:text-indigo-700 transition-colors leading-tight">
                      {entry.lemma}
                    </div>
                    <div className="text-base font-semibold text-indigo-600 italic mb-0.5">
                      {entry.transliteration}
                    </div>
                    <div className="text-xs font-mono text-primary-dark/40 mb-3">
                      {entry.number}
                    </div>
                    <div className="text-sm text-primary-dark/60 mb-4 line-clamp-2">
                      {shortDef}
                    </div>
                    <div className="flex items-center text-indigo-600 text-sm font-semibold">
                      <span>Study this word</span>
                      <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ALPHABET NAV */}
      <section className="py-8 bg-white border-b border-grace sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {sortedLetters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold text-indigo-800 bg-indigo-50 hover:bg-indigo-700 hover:text-white transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* A-Z WORD LISTING */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedLetters.map((letter) => {
            const slugsInLetter = letterIndex[letter] || []
            // Show first 20 entries per letter, with link to see more
            const entriesToShow = slugsInLetter.slice(0, 20).map((slug) =>
              data.find((e) => e.slug === slug)
            ).filter(Boolean) as StrongsGreekEntry[]
            const hasMore = slugsInLetter.length > 20

            return (
              <div key={letter} id={`letter-${letter}`} className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-indigo-700 text-white flex items-center justify-center text-xl font-bold font-display">
                    {letter}
                  </div>
                  <div className="h-px flex-1 bg-grace" />
                  <span className="text-sm text-primary-dark/40 font-medium">
                    {slugsInLetter.length} words
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {entriesToShow.map((entry) => (
                    <Link
                      key={entry.slug}
                      href={`/greek-word/${entry.slug}`}
                      className="group p-4 rounded-xl bg-white border border-grace hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                    >
                      <div className="text-xl font-bold text-scripture group-hover:text-indigo-700 transition-colors leading-tight mb-0.5">
                        {entry.lemma}
                      </div>
                      <div className="text-sm font-semibold text-indigo-600 italic mb-0.5">
                        {entry.transliteration}
                      </div>
                      <div className="text-[10px] font-mono text-primary-dark/30 mb-2">
                        {entry.number}
                      </div>
                      <div className="text-xs text-primary-dark/50 line-clamp-2">
                        {entry.definition}
                      </div>
                    </Link>
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-4 text-center">
                    <span className="text-sm text-primary-dark/40">
                      Showing 20 of {slugsInLetter.length} words.{' '}
                      Browse individual word study pages for the complete list.
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* CRO — QUIZ CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-700 to-blue-800 rounded-xl p-6 md:p-8 text-white text-center">
          <h2 className="text-2xl font-bold font-display mb-3">
            Test Your Knowledge of Biblical Greek
          </h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Our theological-level quizzes include questions on Greek word meanings, New Testament vocabulary, and the original language behind key doctrines.
          </p>
          <Link
            href="/bible-quiz-difficulty/theological"
            className="inline-flex items-center px-8 py-4 bg-white text-indigo-800 font-bold rounded-lg hover:bg-indigo-50 transition-colors shadow-lg text-lg"
          >
            Take a Theological Quiz
          </Link>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="py-16 border-t border-grace">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold font-display text-scripture mb-8 text-center tracking-tight">
            Continue Your Study
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/bible-quiz-difficulty/theological"
              className="group p-6 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-lg font-bold mb-2">
                Test Your Greek Knowledge
              </h3>
              <p className="text-sm text-indigo-100 mb-4">
                Take a theological quiz on Greek word studies and New Testament vocabulary.
              </p>
              <div className="flex items-center text-white text-sm font-semibold">
                <span>Take Quiz</span>
                <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            {[
              {
                href: '/hebrew-words',
                title: 'Hebrew Word Studies',
                desc: 'Explore Old Testament Hebrew vocabulary, meanings, and roots.',
              },
              {
                href: '/lexicon',
                title: 'Bible Lexicon',
                desc: 'Full Greek and Hebrew lexicon with comprehensive entries.',
              },
              {
                href: '/interlinear',
                title: 'Interlinear Bible',
                desc: 'Read Scripture with the original Hebrew and Greek alongside English.',
              },
              {
                href: '/lexicon/browse/greek',
                title: "Greek Strong's Index",
                desc: "Browse the complete Strong's Greek index by number.",
              },
              {
                href: '/greek-words',
                title: 'Key Greek Words',
                desc: 'Curated overview of the most important Greek words in the NT.',
              },
              {
                href: '/word-studies',
                title: 'Word Studies Hub',
                desc: 'Theological word studies combining Hebrew and Greek analysis.',
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group p-6 rounded-xl bg-white border border-grace hover:border-indigo-300 hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-scripture mb-2 group-hover:text-indigo-700 transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-primary-dark/60 mb-4">{link.desc}</p>
                <div className="flex items-center text-indigo-600 text-sm font-semibold">
                  <span>Explore</span>
                  <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
