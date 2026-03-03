// Unified JSON-LD Schema Builders
// Consolidates inline schema patterns across 100+ pages into reusable functions.
// Use with <StructuredData data={schema} /> from components/StructuredData.tsx

import { SITE_CONFIG, canonicalUrl, publisherSchema } from '@/lib/site-config'

// ─── Breadcrumb Schema ───

export interface BreadcrumbItem {
  name: string
  url?: string
}

/**
 * Build BreadcrumbList JSON-LD schema.
 * Always includes Home as position 1.
 *
 * @example
 *   buildBreadcrumbSchema([
 *     { name: 'Hebrew Word Studies', url: '/hebrew-word' },
 *     { name: entry.transliteration },
 *   ])
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_CONFIG.domain,
      },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        ...(item.url ? { item: canonicalUrl(item.url) } : {}),
      })),
    ],
  }
}

// ─── Article Schema ───

export interface ArticleSchemaInput {
  headline: string
  description: string
  url: string
  about?: string
  datePublished?: string
  dateModified?: string
  wordCount?: number
}

/**
 * Build Article JSON-LD schema.
 * Used for study pages, topic pages, encyclopedia entries, etc.
 */
export function buildArticleSchema(input: ArticleSchemaInput): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    url: canonicalUrl(input.url),
    author: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.domain,
    },
    publisher: publisherSchema(),
    ...(input.about ? { about: { '@type': 'Thing', name: input.about } } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    ...(input.wordCount ? { wordCount: input.wordCount } : {}),
  }
}

// ─── FAQ Schema ───

export interface FAQItem {
  question: string
  answer: string
}

/**
 * Build FAQPage JSON-LD schema from question/answer pairs.
 * Supports Google's FAQ rich result.
 */
export function buildFAQSchema(items: FAQItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

// ─── Word Study Schema (DefinedTerm) ───

export interface WordStudySchemaInput {
  word: string
  number: string
  definition: string
  slug: string
  language: 'Hebrew' | 'Greek'
}

/**
 * Build DefinedTerm JSON-LD schema for Hebrew/Greek word study pages.
 */
export function buildWordStudySchema(input: WordStudySchemaInput): object {
  const basePath = input.language === 'Hebrew' ? '/hebrew-word' : '/greek-word'
  const termSetName = input.language === 'Hebrew'
    ? "Strong's Exhaustive Concordance — Hebrew and Chaldee Dictionary"
    : "Strong's Exhaustive Concordance — Greek Dictionary of the New Testament"

  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: `${input.word} (${input.number})`,
    description: input.definition,
    url: canonicalUrl(`${basePath}/${input.slug}`),
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: termSetName,
      url: canonicalUrl(basePath),
    },
    termCode: input.number,
  }
}

// ─── Place Schema ───

export interface PlaceSchemaInput {
  name: string
  description: string
  slug: string
  lat?: number
  lon?: number
}

/**
 * Build Place JSON-LD schema with optional GeoCoordinates.
 */
export function buildPlaceSchema(input: PlaceSchemaInput): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: input.name,
    description: input.description,
    url: canonicalUrl(`/bible-places/${input.slug}`),
    ...(input.lat != null && input.lon != null ? {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: input.lat,
        longitude: input.lon,
      },
    } : {}),
  }
}

// ─── Quiz Schema ───

export interface QuizSchemaInput {
  name: string
  description: string
  url: string
  numberOfQuestions: number
  educationalLevel?: string
  timeRequired?: number
  questions?: Array<{ text: string; answer: string }>
}

/**
 * Build Quiz JSON-LD schema for quiz pages.
 */
export function buildQuizSchema(input: QuizSchemaInput): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    numberOfQuestions: input.numberOfQuestions,
    educationalLevel: input.educationalLevel || 'Intermediate',
    typicalAgeRange: '13-99',
    ...(input.timeRequired ? { timeRequired: `PT${input.timeRequired}M` } : {}),
    interactivityType: 'active',
    learningResourceType: 'assessment',
    ...(input.questions?.length ? {
      hasPart: input.questions.slice(0, 3).map((q, i) => ({
        '@type': 'Question',
        name: `Question ${i + 1}`,
        text: q.text,
        acceptedAnswer: { '@type': 'Answer', text: q.answer },
      })),
    } : {}),
  }
}

// ─── ItemList Schema ───

export interface ItemListSchemaInput {
  name: string
  numberOfItems: number
  items?: Array<{
    name: string
    url?: string
    position?: number
  }>
}

/**
 * Build ItemList JSON-LD schema for verse lists, topic lists, etc.
 */
export function buildItemListSchema(input: ItemListSchemaInput): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: input.name,
    numberOfItems: input.numberOfItems,
    ...(input.items?.length ? {
      itemListElement: input.items.map((item, i) => ({
        '@type': 'ListItem',
        position: item.position ?? i + 1,
        name: item.name,
        ...(item.url ? { url: canonicalUrl(item.url) } : {}),
      })),
    } : {}),
  }
}

// ─── SearchAction Schema ───

/**
 * Build WebSite + SearchAction JSON-LD schema.
 * Add to root layout for sitewide search box in Google.
 */
export function buildSearchActionSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.domain,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.domain}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ─── Person Schema ───

export interface PersonSchemaInput {
  name: string
  description: string
  url: string
  jobTitle?: string
}

/**
 * Build Person JSON-LD schema for Bible character pages.
 */
export function buildPersonSchema(input: PersonSchemaInput): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    ...(input.jobTitle ? { jobTitle: input.jobTitle } : {}),
  }
}

// ─── Course Schema ───

export interface CourseSchemaInput {
  name: string
  description: string
  url: string
  duration: number
}

/**
 * Build Course JSON-LD schema for study plan pages.
 */
export function buildCourseSchema(input: CourseSchemaInput): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: input.name,
    description: input.description,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
    timeRequired: `P${input.duration}D`,
    url: canonicalUrl(input.url),
  }
}
