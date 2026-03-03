// Unified Metadata Builder for All Page Types
// Wraps and extends metadata-generator.ts for the full site (100k+ pages)
// Usage: return buildMetadata({ type: 'hebrew-word', ... }) from generateMetadata()

import { Metadata } from 'next'
import { SITE_CONFIG, canonicalUrl } from '@/lib/site-config'

// ─── Types ───

export type PageType =
  // Original types (from metadata-generator.ts)
  | 'verse' | 'chapter' | 'book' | 'topic' | 'character'
  | 'study-plan' | 'home' | 'question' | 'prayer' | 'lexicon'
  // New high-volume study types
  | 'hebrew-word' | 'greek-word' | 'bible-topic' | 'chain-study'
  | 'encyclopedia' | 'bible-quote' | 'what-does-bible-say'
  // Quiz types
  | 'quiz-chapter' | 'quiz-book' | 'quiz-character' | 'quiz-theme'
  // Geography types
  | 'bible-place' | 'bible-geography'

export interface MetadataInput {
  title: string
  description: string
  path: string
  keywords?: string[]
  ogImage?: string
  ogTitle?: string
  ogType?: 'article' | 'website'
  noIndex?: boolean
  type?: PageType
}

// ─── Core Builder ───

/**
 * Build Next.js Metadata from a simple input object.
 * Handles canonical URLs, OpenGraph, Twitter, keywords, and noIndex.
 */
export function buildMetadata(input: MetadataInput): Metadata {
  const {
    title,
    description,
    path,
    keywords,
    ogImage,
    ogTitle,
    ogType = 'article',
    noIndex,
  } = input

  const canonical = canonicalUrl(path)
  const truncatedTitle = truncate(title, 70)
  const truncatedDesc = truncate(description, 300)
  const ogDesc = truncate(description, 200)

  const metadata: Metadata = {
    title: truncatedTitle,
    description: truncatedDesc,
    alternates: { canonical },
    openGraph: {
      title: ogTitle || truncatedTitle,
      description: ogDesc,
      url: canonical,
      type: ogType,
      siteName: SITE_CONFIG.name,
      ...(ogImage ? {
        images: [{
          url: ogImage,
          width: 1200,
          height: 630,
          alt: truncatedTitle,
        }],
      } : {}),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title: truncatedTitle,
      description: ogDesc,
    },
  }

  if (keywords && keywords.length > 0) {
    metadata.keywords = keywords
  }

  if (noIndex) {
    metadata.robots = { index: false, follow: true }
  }

  return metadata
}

// ─── Per-Type Helpers ───

/** Hebrew Word Study page metadata */
export function buildHebrewWordMetadata(entry: {
  number: string
  lemma: string
  transliteration: string
  definition: string
  kjvTranslations: string
  slug: string
}): Metadata {
  const primaryTranslation = parseFirstTranslation(entry.kjvTranslations, entry.definition)
  const shortDef = truncate(entry.definition, 120)

  return buildMetadata({
    title: `${entry.transliteration} (${entry.number}) — Hebrew Word Study | "${primaryTranslation}" in the Bible | Bible Maximum`,
    description: `Strong's ${entry.number}: ${entry.transliteration} (${entry.lemma}) means "${shortDef}" in Biblical Hebrew. Study this word's KJV translations, derivation, and related Hebrew words.`,
    path: `/hebrew-word/${entry.slug}`,
    keywords: [
      `${entry.transliteration} meaning`,
      `strong's ${entry.number.toLowerCase()}`,
      `hebrew word for ${primaryTranslation.toLowerCase()}`,
      `${entry.number} strongs`,
      `${entry.lemma} hebrew`,
      `biblical hebrew word study`,
      `old testament hebrew words`,
    ],
    ogImage: '/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png',
    ogTitle: `${entry.transliteration} (${entry.number}) — Hebrew Word Study`,
    type: 'hebrew-word',
  })
}

/** Greek Word Study page metadata */
export function buildGreekWordMetadata(entry: {
  number: string
  lemma: string
  transliteration: string
  definition: string
  kjvTranslations: string
  slug: string
}): Metadata {
  const primaryTranslation = parseFirstTranslation(entry.kjvTranslations, entry.definition)
  const shortDef = truncate(entry.definition, 120)

  return buildMetadata({
    title: `${entry.transliteration} (${entry.number}) -- Greek Word Study | "${primaryTranslation}" in the Bible | Bible Maximum`,
    description: `Study the Greek word ${entry.transliteration} (${entry.lemma}), Strong's ${entry.number}. Definition: "${shortDef}". KJV translations, derivation, and related Greek words.`,
    path: `/greek-word/${entry.slug}`,
    keywords: [
      `${entry.transliteration} meaning`,
      `strong's ${entry.number.toLowerCase()}`,
      `greek word for ${primaryTranslation.toLowerCase()}`,
      `${entry.number} strongs`,
      `${entry.lemma} greek`,
      `biblical greek word study`,
      `koine greek`,
      `new testament greek words`,
    ],
    ogTitle: `${entry.transliteration} (${entry.number}) -- Greek Word Study`,
    type: 'greek-word',
  })
}

/** Nave's Bible Topics page metadata */
export function buildBibleTopicMetadata(topic: {
  subject: string
  slug: string
  refCount: number
  entries: { length: number }
  books: { length: number }
}): Metadata {
  return buildMetadata({
    title: `${topic.subject} in the Bible -- Every Verse and Sub-Topic | Nave's Topical Study`,
    description: `Explore ${topic.refCount} Bible verse references about ${topic.subject} organized into ${topic.entries.length} sub-topics. Nave's Topical Bible study covering ${topic.books.length} books of Scripture.`,
    path: `/bible-topics/${topic.slug}`,
    keywords: [
      `${topic.subject} bible verses`,
      `${topic.subject} in the bible`,
      `${topic.subject} scripture references`,
      `${topic.subject.toLowerCase()} topical study`,
      `nave's topical bible ${topic.subject.toLowerCase()}`,
    ],
    type: 'bible-topic',
  })
}

/** Chain Study page metadata */
export function buildChainStudyMetadata(chain: {
  subject: string
  slug: string
  bookCount: number
  totalVerses: number
  bookGroups: Array<{ book: string }>
}): Metadata {
  const firstBook = chain.bookGroups[0]?.book || 'Genesis'
  const lastBook = chain.bookGroups[chain.bookGroups.length - 1]?.book || 'Revelation'

  return buildMetadata({
    title: `${chain.subject}: A Chain Study Through the Bible | ${chain.bookCount} Books, ${chain.totalVerses} Verses | Bible Maximum`,
    description: `Trace the theme of ${chain.subject} through ${chain.bookCount} books of the Bible, from ${firstBook} to ${lastBook}. ${chain.totalVerses} verse references across both testaments.`,
    path: `/chain-study/${chain.slug}`,
    keywords: [
      `${chain.subject} in the Bible`,
      `${chain.subject} chain study`,
      `${chain.subject} Bible theme`,
      'Thompson Chain Reference',
      'Bible chain study',
      'topical Bible study',
      `${chain.subject} Old Testament`,
      `${chain.subject} New Testament`,
    ],
    ogTitle: `${chain.subject} -- Chain Study Through the Bible`,
    type: 'chain-study',
  })
}

/** Bible Encyclopedia page metadata (generic entries) */
export function buildEncyclopediaMetadata(entry: {
  title: string
  slug: string
  type: string
  definition?: string | null
  description?: string | null
  etymology?: string[] | null
  totalVerseRefs: number
  booksReferenced: string[]
  keywords: string[]
}): Metadata {
  const typeLabel = entry.type.charAt(0).toUpperCase() + entry.type.slice(1)
  const etymologyNote = entry.etymology?.length
    ? ` The name means "${entry.etymology[0]}".`
    : ''
  const description = entry.description
    || entry.definition
    || `${entry.title} in the Bible.${etymologyNote} ${entry.totalVerseRefs} verse references across ${entry.booksReferenced.length} books. Comprehensive encyclopedia entry with definitions, cross-references, and study resources.`

  return buildMetadata({
    title: `${entry.title} -- Bible Encyclopedia | ${typeLabel} in the Bible | Bible Maximum`,
    description: description.slice(0, 300),
    path: `/bible-encyclopedia/${entry.slug}`,
    keywords: [
      `${entry.title} in the Bible`,
      `${entry.title} meaning`,
      `${entry.title} definition`,
      `${entry.title} Bible encyclopedia`,
      `what is ${entry.title} in the Bible`,
      ...(entry.etymology ? entry.etymology.map(m => `${entry.title} means ${m}`) : []),
      ...entry.keywords.slice(0, 5),
    ],
    ogTitle: `${entry.title} -- Bible Encyclopedia`,
    type: 'encyclopedia',
  })
}

/** Bible Encyclopedia page metadata (Bible book entries) */
export function buildEncyclopediaBookMetadata(bookMeta: {
  name: string
  author: string
  dateWritten: string
  chapters: number
  verseCount: number
  keyThemes: string[]
  category: string
}, slug: string): Metadata {
  return buildMetadata({
    title: `Book of ${bookMeta.name} -- Bible Encyclopedia | Summary, Themes, Author & Outline | Bible Maximum`,
    description: `Complete guide to the Book of ${bookMeta.name}. Written by ${bookMeta.author} (${bookMeta.dateWritten}), ${bookMeta.chapters} chapters, ${bookMeta.verseCount.toLocaleString()} verses. Key themes: ${bookMeta.keyThemes.slice(0, 4).join(', ')}. Part of the ${bookMeta.category}.`,
    path: `/bible-encyclopedia/${slug}`,
    keywords: [
      `Book of ${bookMeta.name}`,
      `${bookMeta.name} Bible summary`,
      `${bookMeta.name} author`,
      `${bookMeta.name} themes`,
      `${bookMeta.name} outline`,
      `${bookMeta.name} overview`,
      `who wrote ${bookMeta.name}`,
      ...bookMeta.keyThemes.slice(0, 4).map(t => `${bookMeta.name} ${t.toLowerCase()}`),
    ],
    ogTitle: `Book of ${bookMeta.name} -- Bible Encyclopedia`,
    type: 'encyclopedia',
  })
}

/** Bible Quotes page metadata */
export function buildBibleQuoteMetadata(topic: {
  name: string
  slug: string
  verseCount: number
  keywords: string[]
}): Metadata {
  return buildMetadata({
    title: `${topic.verseCount} Bible Quotes About ${topic.name} — Scripture Verses (KJV)`,
    description: `Discover ${topic.verseCount} Bible quotes about ${topic.name.toLowerCase()} from the King James Version. Read, study, and meditate on what the Bible says about ${topic.name.toLowerCase()}.`,
    path: `/bible-quotes/${topic.slug}`,
    keywords: [
      `bible quotes about ${topic.name.toLowerCase()}`,
      `${topic.name.toLowerCase()} bible verses`,
      `${topic.name.toLowerCase()} scripture`,
      `what does the bible say about ${topic.name.toLowerCase()}`,
      `bible verses on ${topic.name.toLowerCase()}`,
      `${topic.name.toLowerCase()} in the bible`,
      ...topic.keywords.slice(0, 4),
    ],
    type: 'bible-quote',
  })
}

/** "What Does the Bible Say About" page metadata */
export function buildWhatDoesBibleSayMetadata(topic: {
  name: string
  slug: string
  description: string
  verseCount: number
}): Metadata {
  return buildMetadata({
    title: `What Does the Bible Say About ${topic.name}? — ${topic.verseCount} Scripture References | Complete Study Guide`,
    description: `What does the Bible say about ${topic.name.toLowerCase()}? Discover ${topic.verseCount} key Bible verses about ${topic.name.toLowerCase()} with full text, study tips, and practical application from both Old and New Testament.`,
    path: `/what-does-the-bible-say-about/${topic.slug}`,
    keywords: [
      `what does the bible say about ${topic.name.toLowerCase()}`,
      `bible verses about ${topic.name.toLowerCase()}`,
      `${topic.name.toLowerCase()} in the bible`,
      `scriptures about ${topic.name.toLowerCase()}`,
      `${topic.name.toLowerCase()} bible study`,
    ],
    type: 'what-does-bible-say',
  })
}

/** Bible Place page metadata */
export function buildBiblePlaceMetadata(place: {
  name: string
  slug: string
  description?: string
  verseCount?: number
  lat?: number
  lon?: number
}): Metadata {
  const desc = place.description
    || `${place.name} in the Bible. Explore the geography, history, and biblical significance of ${place.name} with maps, verse references, and study resources.`

  return buildMetadata({
    title: `${place.name} — Bible Place | Map, Verses & History | Bible Maximum`,
    description: desc,
    path: `/bible-places/${place.slug}`,
    keywords: [
      `${place.name} in the Bible`,
      `${place.name} biblical`,
      `${place.name} map`,
      'Bible geography',
      'biblical places',
    ],
    type: 'bible-place',
  })
}

// ─── Utilities ───

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 3) + '...'
}

function parseFirstTranslation(kjvTranslations: string, definition: string): string {
  if (kjvTranslations && kjvTranslations !== '--') {
    const first = kjvTranslations.split(',')[0]?.trim().replace(/^--\s*/, '')
    if (first) return first
  }
  return definition.split(',')[0]?.trim() || ''
}
