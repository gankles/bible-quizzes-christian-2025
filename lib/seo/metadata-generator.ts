// Centralized Metadata Generator for All Page Types
// Ensures unique, SEO-optimized metadata across 100K+ pages

import { Metadata } from 'next'
import crypto from 'crypto'

export interface PageMetadataParams {
    type: 'verse' | 'chapter' | 'book' | 'topic' | 'character' | 'study-plan' | 'home' | 'question' | 'prayer' | 'lexicon'
    data: any
    url: string
    translation?: string
}

export interface SEOMetadata extends Metadata {
    canonical: string
    uniquenessHash: string
}

/**
 * Generate comprehensive metadata for any page type
 * Ensures uniqueness and SEO best practices
 */
export function generatePageMetadata(params: PageMetadataParams): SEOMetadata {
    const { type, data, url, translation = 'KJV' } = params

    let metadata: Metadata
    let uniquenessHash: string

    switch (type) {
        case 'verse':
            metadata = generateVerseMetadata(data, translation)
            break
        case 'chapter':
            metadata = generateChapterMetadata(data)
            break
        case 'book':
            metadata = generateBookMetadata(data)
            break
        case 'topic':
            metadata = generateTopicMetadata(data)
            break
        case 'character':
            metadata = generateCharacterMetadata(data)
            break
        case 'study-plan':
            metadata = generateStudyPlanMetadata(data)
            break
        case 'question':
            metadata = generateQuestionMetadata(data)
            break
        case 'prayer':
            metadata = generatePrayerMetadata(data)
            break
        case 'home':
            metadata = generateHomeMetadata()
            break
        default:
            metadata = generateDefaultMetadata()
    }

    // Add canonical URL
    const canonical = `https://biblemaximum.com${url}`

    // Generate uniqueness hash for deduplication
    const title = typeof metadata.title === 'string' ? metadata.title : 'Bible Study Hub'
    const description = metadata.description || ''
    uniquenessHash = generateContentHash(title + description)

    return {
        ...metadata,
        canonical,
        uniquenessHash,
        alternates: {
            canonical,
        },
    }
}

/**
 * Verse Page Metadata
 * Format: "{Book} {Chapter}:{Verse} - {First 8 words} | Bible Study"
 */
function generateVerseMetadata(data: {
    book: string
    bookName: string
    chapter: number
    verse: number
    text: string
}, translation: string): Metadata {
    const { bookName, chapter, verse, text } = data

    // Get first 8 words for title
    const words = text.split(' ').slice(0, 8).join(' ')
    const title = truncate(`${bookName} ${chapter}:${verse} - ${words}... | ${translation} Bible`, 60)

    // Description: Full verse text + context
    const description = truncate(
        `Read ${bookName} ${chapter}:${verse} in the ${translation} Bible: "${text}" Study this verse with commentary, cross-references, and multiple translations.`,
        160
    )

    return {
        title,
        description,
        keywords: [
            `${bookName} ${chapter}:${verse}`,
            `${bookName} ${chapter} ${verse}`,
            translation,
            'Bible verse',
            'Scripture',
            ...extractKeywords(text),
        ].join(', '),
        openGraph: {
            title,
            description,
            type: 'article',
            images: [
                {
                    url: `/og-images/verse/${data.book}-${chapter}-${verse}.jpg`,
                    width: 1200,
                    height: 630,
                    alt: `${bookName} ${chapter}:${verse}`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    }
}

/**
 * Chapter Page Metadata
 */
function generateChapterMetadata(data: {
    bookName: string
    chapter: number
    summary: string
    keyThemes: string[]
}): Metadata {
    const { bookName, chapter, summary, keyThemes } = data

    const title = `${bookName} Chapter ${chapter} Summary & Study Guide | KJV Bible`
    const description = truncate(
        `${bookName} Chapter ${chapter}: ${summary} Study key themes including ${keyThemes.slice(0, 3).join(', ')} with verse-by-verse analysis.`,
        160
    )

    return {
        title,
        description,
        keywords: [
            `${bookName} chapter ${chapter}`,
            `${bookName} ${chapter}`,
            ...keyThemes,
            'Bible study',
            'chapter summary',
        ].join(', '),
        openGraph: {
            title,
            description,
            type: 'article',
        },
        twitter: {
            card: 'summary',
            title,
            description,
        },
    }
}

/**
 * Book Page Metadata
 */
function generateBookMetadata(data: {
    name: string
    summary: string
    author: string
    keyThemes: string[]
}): Metadata {
    const { name, summary, author, keyThemes } = data

    const title = `Book of ${name}: Complete Study Guide & Summary | Bible`
    const description = truncate(
        `The Book of ${name} written by ${author}. ${summary} Explore ${keyThemes.slice(0, 3).join(', ')} with chapter-by-chapter analysis.`,
        160
    )

    return {
        title,
        description,
        keywords: [
            `Book of ${name}`,
            name,
            author,
            ...keyThemes,
            'Bible book',
            'study guide',
        ].join(', '),
        openGraph: {
            title,
            description,
            type: 'article',
        },
        twitter: {
            card: 'summary',
            title,
            description,
        },
    }
}

/**
 * Topic Page Metadata
 */
function generateTopicMetadata(data: {
    name: string
    description: string
    verseCount: number
    category: string
}): Metadata {
    const { name, description, verseCount, category } = data

    const title = `Bible Verses About ${name} - Complete Scripture Guide (${verseCount} Verses) | Old & New Testament References with Commentary | Bible Maximum`
    const descriptionText = truncate(
        `What does the Bible say about ${name}? ${description} Explore ${verseCount} Bible verses about ${name} from both Old and New Testament.`,
        160
    )

    return {
        title,
        description: descriptionText,
        keywords: [
            `${name} Bible verses`,
            `Bible about ${name}`,
            category,
            'Scripture',
            'Biblical teaching',
        ].join(', '),
        openGraph: {
            title,
            description: descriptionText,
            type: 'article',
        },
        twitter: {
            card: 'summary',
            title,
            description: descriptionText,
        },
    }
}

/**
 * Character Page Metadata
 */
function generateCharacterMetadata(data: {
    name: string
    biography: string
    significance: string
    testament: string
}): Metadata {
    const { name, biography, significance, testament } = data

    const title = `${name} in the Bible: Biography & Life Lessons | ${testament} Testament Character Study with Key Scriptures | Bible Maximum`
    const description = truncate(
        `${name} in the Bible: ${biography.substring(0, 100)}... ${significance} Study the life, lessons, and significance of ${name}.`,
        160
    )

    return {
        title,
        description,
        keywords: [
            `${name} Bible`,
            `${name} biography`,
            `Biblical ${name}`,
            testament,
            'Bible character',
        ].join(', '),
        openGraph: {
            title,
            description,
            type: 'article',
        },
        twitter: {
            card: 'summary',
            title,
            description,
        },
    }
}

/**
 * Study Plan Page Metadata
 */
function generateStudyPlanMetadata(data: {
    title: string
    description: string
    duration: number
    topic: string
}): Metadata {
    const { title, description, duration, topic } = data

    const metaTitle = `${duration}-Day Bible Study Plan: ${topic} | Free Guide`
    const metaDescription = truncate(
        `${title}: ${description} Complete this ${duration}-day Bible study plan with daily readings, questions, and commentary.`,
        160
    )

    return {
        title: metaTitle,
        description: metaDescription,
        keywords: [
            `${topic} Bible study`,
            `${duration} day study plan`,
            'Bible reading plan',
            'devotional',
        ].join(', '),
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            type: 'article',
        },
        twitter: {
            card: 'summary',
            title: metaTitle,
            description: metaDescription,
        },
    }
}

/**
 * Home Page Metadata
 */
function generateHomeMetadata(): Metadata {
    return {
        title: 'Bible Study Hub - Free Bible Study Tools, Verses & Study Plans',
        description: 'Explore the Bible with free study tools, verse search, study plans, and resources. Access 31,000+ verses, character studies, and topical guides.',
        keywords: 'Bible study, Bible verses, Scripture, KJV, study plans, Bible characters, topics',
        openGraph: {
            title: 'Bible Study Hub',
            description: 'Free Bible study tools and resources',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Bible Study Hub',
            description: 'Free Bible study tools and resources',
        },
    }
}

/**
 * Default Metadata Fallback
 */
function generateDefaultMetadata(): Metadata {
    return {
        title: 'Bible Study Hub',
        description: 'Bible study resources and tools',
    }
}

/**
 * Utility: Truncate text to max length
 */
function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength - 3) + '...'
}

/**
 * Utility: Extract keywords from text
 */
function extractKeywords(text: string): string[] {
    // Remove common words and extract meaningful keywords
    const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'that', 'this', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'them', 'their', 'what', 'which', 'who', 'when', 'where', 'why', 'how'])

    const words = text.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3 && !commonWords.has(word))

    // Get unique words
    return Array.from(new Set(words)).slice(0, 10)
}

/**
 * Generate content hash for deduplication
 */
export function generateContentHash(content: string): string {
    return crypto.createHash('md5').update(content).digest('hex')
}

/**
 * Validate metadata uniqueness
 */
export async function validateMetadataUniqueness(
    metadata: SEOMetadata,
    existingHashes: Set<string>
): Promise<{
    isUnique: boolean
    duplicateHash?: string
}> {
    const hash = metadata.uniquenessHash

    if (existingHashes.has(hash)) {
        return {
            isUnique: false,
            duplicateHash: hash,
        }
    }

    return {
        isUnique: true,
    }
}

/**
 * Question Page Metadata
 */
function generateQuestionMetadata(data: {
    question: string
    answer: string
    category: string
    tags: string[]
}): Metadata {
    const { question, answer, category, tags } = data

    const title = truncate(`${question} - Biblical Answers | Bible Study Hub`, 60)
    const description = truncate(
        `Answer to "${question}" - ${answer.substring(0, 140)}...`,
        160
    )

    return {
        title,
        description,
        keywords: [
            question,
            category,
            ...tags,
            'Bible questions',
            'Christian answers',
            'Scripture explanation',
        ].join(', '),
        openGraph: {
            title,
            description,
            type: 'article',
        },
        twitter: {
            card: 'summary',
            title,
            description,
        },
    }
}

/**
 * Prayer Page Metadata
 */
function generatePrayerMetadata(data: {
    title: string
    content: string
    category: string
    tags: string[]
}): Metadata {
    const { title, content, category, tags } = data

    const metaTitle = truncate(`${title} - Daily Bible Prayer | Bible Study Hub`, 60)
    const metaDescription = truncate(
        `Read "${title}": ${content.substring(0, 140)}...`,
        160
    )

    return {
        title: metaTitle,
        description: metaDescription,
        keywords: [
            title,
            category,
            ...tags,
            'Bible prayers',
            'daily devotional',
            'Christian prayer',
            'healing prayer',
        ].join(', '),
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            type: 'article',
        },
        twitter: {
            card: 'summary',
            title: metaTitle,
            description: metaDescription,
        },
    }
}

export function generateLexiconMetadata(entry: any) {
    const title = `What Does the ${entry.language} Word ${entry.word} (${entry.strongs}) Mean? | Definition from Strong's Concordance and Classical Lexicons | Bible Maximum`;
    const mainDef = entry.definitions.strongs.substring(0, 100);
    const description = truncate(`Discover the ${entry.language} meaning, Scriptural morphology, and multi-source study (Strong's, ${entry.language === 'Greek' ? 'LSJ, Abbott-Smith' : 'BDB'}) for ${entry.word}. "${mainDef}..."`, 160);

    return {
        title,
        description,
        openGraph: {
            title: `Biblical Word Study: ${entry.word} (${entry.strongs}) - Lexical Alignment`,
            description,
            type: 'article',
            images: [
                {
                    url: '/images/lexicon-og-default.png',
                    width: 1200,
                    height: 630,
                    alt: `Manuscript Verification: ${entry.word}`,
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
        alternates: { canonical: `/lexicon/${entry.strongs}` },
    };
}
