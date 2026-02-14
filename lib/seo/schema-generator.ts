// Schema Markup Generator for Structured Data
// Generates JSON-LD for Article, FAQ, Breadcrumb, Person, Course schemas

export interface SchemaParams {
    type: 'verse' | 'chapter' | 'book' | 'topic' | 'character' | 'study-plan' | 'verse-combination' | 'question' | 'prayer' | 'lexicon'
    data: any
    url: string
}

/**
 * Generate appropriate schema markup for page type
 */
export function generateSchema(params: SchemaParams): object[] {
    const { type, data, url } = params

    const schemas: object[] = []

    // Add breadcrumb schema for all pages
    schemas.push(generateBreadcrumbSchema(params.data, params.url))

    // Add type-specific schemas
    switch (type) {
        case 'verse':
            schemas.push(generateVerseArticleSchema(data, url))
            schemas.push(generateVerseFAQSchema(data))
            break
        case 'chapter':
            schemas.push(generateChapterArticleSchema(data, url))
            schemas.push(generateChapterFAQSchema(data))
            schemas.push(generateChapterItemListSchema(data))
            break
        case 'book':
            schemas.push(generateBookArticleSchema(data, url))
            schemas.push(generateBookFAQSchema(data))
            break
        case 'topic':
            schemas.push(generateTopicArticleSchema(data, url))
            schemas.push(generateTopicItemListSchema(data))
            break
        case 'character':
            schemas.push(generateCharacterPersonSchema(data, url))
            schemas.push(generateCharacterArticleSchema(data, url))
            break
        case 'study-plan':
            schemas.push(generateStudyPlanCourseSchema(data, url))
            break
        case 'verse-combination':
            schemas.push(generateVerseCombinationSchema(data, url))
            break
        case 'question':
            schemas.push(generateQuestionFAQSchema(data))
            schemas.push(generateQuestionArticleSchema(data, url))
            break
        case 'prayer':
            schemas.push(generatePrayerArticleSchema(data, url))
            break
        case 'lexicon':
            schemas.push(generateLexiconSchema(data))
            break
    }

    return schemas
}

/**
 * Breadcrumb Schema (all pages)
 */
function generateBreadcrumbSchema(data: any, url: string): object {
    const pathSegments = url.split('/').filter(Boolean)

    const itemListElement = pathSegments.map((segment, index) => {
        const position = index + 2 // +1 for home, +1 for 1-indexed
        const itemUrl = `https://biblemaximum.com/${pathSegments.slice(0, index + 1).join('/')}`
        const name = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

        return {
            '@type': 'ListItem',
            position,
            name,
            item: itemUrl,
        }
    })

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://biblemaximum.com',
            },
            ...itemListElement,
        ],
    }
}

/**
 * Verse Article Schema
 */
function generateVerseArticleSchema(data: {
    bookName: string
    chapter: number
    verse: number
    text: string
}, url: string): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${data.bookName} ${data.chapter}:${data.verse}`,
        description: data.text,
        url: `https://biblemaximum.com${url}`,
        author: {
            '@type': 'Organization',
            name: 'Bible Study Hub',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Bible Study Hub',
            logo: {
                '@type': 'ImageObject',
                url: 'https://biblemaximum.com/logo.png',
            },
        },
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
    }
}

/**
 * Verse FAQ Schema
 */
function generateVerseFAQSchema(data: {
    bookName: string
    chapter: number
    verse: number
    text: string
}): object {
    const { bookName, chapter, verse, text } = data

    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: `What does ${bookName} ${chapter}:${verse} say?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `${bookName} ${chapter}:${verse} says: "${text}"`,
                },
            },
            {
                '@type': 'Question',
                name: `What is the meaning of ${bookName} ${chapter}:${verse}?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `${bookName} ${chapter}:${verse} teaches us about [context-specific meaning]. This verse is part of the broader context of ${bookName} chapter ${chapter}.`,
                },
            },
            {
                '@type': 'Question',
                name: `How can I apply ${bookName} ${chapter}:${verse} to my life?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `You can apply ${bookName} ${chapter}:${verse} by [practical application]. Reflect on how this verse speaks to your current situation.`,
                },
            },
        ],
    }
}

/**
 * Chapter Article Schema
 */
function generateChapterArticleSchema(data: {
    bookName: string
    chapter: number
    summary: string
}, url: string): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${data.bookName} Chapter ${data.chapter} Summary`,
        description: data.summary,
        url: `https://biblemaximum.com${url}`,
        author: {
            '@type': 'Organization',
            name: 'Bible Study Hub',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Bible Study Hub',
        },
        datePublished: new Date().toISOString(),
    }
}

/**
 * Chapter FAQ Schema
 */
function generateChapterFAQSchema(data: {
    bookName: string
    chapter: number
    keyThemes: string[]
}): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: `What is ${data.bookName} chapter ${data.chapter} about?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `${data.bookName} chapter ${data.chapter} covers ${data.keyThemes.join(', ')}.`,
                },
            },
        ],
    }
}

/**
 * Chapter ItemList Schema (list of verses)
 */
function generateChapterItemListSchema(data: {
    bookName: string
    chapter: number
    verseCount: number
}): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `${data.bookName} Chapter ${data.chapter} Verses`,
        numberOfItems: data.verseCount,
        itemListElement: Array.from({ length: data.verseCount }, (_, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: `${data.bookName} ${data.chapter}:${i + 1}`,
            url: `https://biblemaximum.com/verses/${data.bookName.toLowerCase()}/${data.chapter}/${i + 1}`,
        })),
    }
}

/**
 * Book Article Schema
 */
function generateBookArticleSchema(data: {
    name: string
    summary: string
    author: string
}, url: string): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `Book of ${data.name}`,
        description: data.summary,
        url: `https://biblemaximum.com${url}`,
        author: {
            '@type': 'Person',
            name: data.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Bible Study Hub',
        },
    }
}

/**
 * Book FAQ Schema
 */
function generateBookFAQSchema(data: {
    name: string
    author: string
}): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: `Who wrote the Book of ${data.name}?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `The Book of ${data.name} was written by ${data.author}.`,
                },
            },
        ],
    }
}

/**
 * Topic Article Schema
 */
function generateTopicArticleSchema(data: {
    name: string
    description: string
}, url: string): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `Bible Verses About ${data.name}`,
        description: data.description,
        url: `https://biblemaximum.com${url}`,
        publisher: {
            '@type': 'Organization',
            name: 'Bible Study Hub',
        },
    }
}

/**
 * Topic ItemList Schema
 */
function generateTopicItemListSchema(data: {
    name: string
    verseRefs?: string[]
}): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `Bible Verses About ${data.name}`,
        numberOfItems: data.verseRefs?.length || 0,
    }
}

/**
 * Character Person Schema
 */
function generateCharacterPersonSchema(data: {
    name: string
    biography: string
    occupation?: string
}, url: string): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: data.name,
        description: data.biography,
        jobTitle: data.occupation,
        url: `https://biblemaximum.com${url}`,
    }
}

/**
 * Character Article Schema
 */
function generateCharacterArticleSchema(data: {
    name: string
    biography: string
}, url: string): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${data.name} in the Bible`,
        description: data.biography,
        url: `https://biblemaximum.com${url}`,
        publisher: {
            '@type': 'Organization',
            name: 'Bible Study Hub',
        },
    }
}

/**
 * Study Plan Course Schema
 */
function generateStudyPlanCourseSchema(data: {
    title: string
    description: string
    duration: number
}, url: string): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: data.title,
        description: data.description,
        provider: {
            '@type': 'Organization',
            name: 'Bible Study Hub',
        },
        timeRequired: `P${data.duration}D`,
        url: `https://biblemaximum.com${url}`,
    }
}
/**
 * Verse Combination Article Schema
 */
export function generateVerseCombinationSchema(data: {
    verse1: any
    verse2: any
}, url: string = ''): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${data.verse1.bookName} ${data.verse1.chapter}:${data.verse1.verse} and ${data.verse2.bookName} ${data.verse2.chapter}:${data.verse2.verse} Comparison`,
        description: `Comparative study and theological synergy between ${data.verse1.bookName} ${data.verse1.chapter}:${data.verse1.verse} and ${data.verse2.bookName} ${data.verse2.chapter}:${data.verse2.verse}.`,
        url: `https://biblemaximum.com${url}`,
        author: {
            '@type': 'Organization',
            name: 'Bible Study Hub',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Bible Study Hub',
        },
    }
}

/**
 * Question FAQ Schema
 */
function generateQuestionFAQSchema(data: {
    question: string
    answer: string
}): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: data.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: data.answer,
                },
            },
        ],
    }
}

/**
 * Question Article Schema
 */
function generateQuestionArticleSchema(data: {
    question: string
    answer: string
    category: string
}, url: string): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.question,
        description: data.answer.substring(0, 160),
        url: `https://biblemaximum.com${url}`,
        articleSection: data.category,
        publisher: {
            '@type': 'Organization',
            name: 'Bible Study Hub',
        },
    }
}

/**
 * Prayer Article Schema
 */
function generatePrayerArticleSchema(data: {
    title: string
    content: string
    category: string
}, url: string): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.content.substring(0, 160),
        url: `https://biblemaximum.com${url}`,
        articleSection: data.category,
        publisher: {
            '@type': 'Organization',
            name: 'Bible Study Hub',
        },
    }
}

export function generateLexiconSchema(entry: any) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': `What does the ${entry.language} word ${entry.word} (${entry.strongs}) mean?`,
        'description': entry.definition,
        'author': {
            '@type': 'Organization',
            'name': 'Bible Maximum'
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'Bible Maximum'
        },
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': `https://biblemaximum.com/lexicon/${entry.strongs}`
        }
    };
}
