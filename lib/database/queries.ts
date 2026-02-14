import prisma from './client'
import { cache, cacheKeys, cacheTTL } from './cache'
import { fetchVerseFromAPI, BibleTranslation } from '../bibleApi'
import { getBookBySlug } from '../bible-data'
import { getChapterWithCommentary, stripHtml, getBookName } from '../bolls-api'

/**
 * Get a single verse by reference
 */
export async function getVerse(
    book: string,
    chapter: number,
    verse: number,
    translation: string = 'KJV'
) {
    try {
        const cached = await cache.getOrSet(
            cacheKeys.verse(book, chapter, verse, translation),
            async () => {
                const result = await prisma.verse.findUnique({
                    where: {
                        book_chapter_verse_translation: {
                            book,
                            chapter,
                            verse,
                            translation,
                        },
                    },
                })
                return result
            },
            cacheTTL.verse
        )

        if (cached) return cached

        // Fallback to API/Local JSON if not in DB
        const fallback = await fetchVerseFromAPI(book, chapter, verse, translation as BibleTranslation)
        if (fallback) {
            const bookData = getBookBySlug(book)
            return {
                ...fallback,
                bookName: bookData?.name || book,
                testament: bookData?.testament || (parseInt(chapter.toString()) > 0 ? 'Old' : 'New') // Simple guess
            }
        }

        return null
    } catch (error) {
        console.error('Error fetching verse:', error)
        try {
            const fallback = await fetchVerseFromAPI(book, chapter, verse, translation as BibleTranslation)
            if (fallback) {
                const bookData = getBookBySlug(book)
                return {
                    ...fallback,
                    bookName: bookData?.name || book
                }
            }
        } catch { }
        return null
    }
}

/**
 * Get all verses in a chapter
 */
export async function getChapterVerses(
    book: string,
    chapter: number,
    translation: string = 'KJV'
) {
    try {
        return await cache.getOrSet(
            `chapter-verses:${book}:${chapter}:${translation}`,
            async () => {
                const verses = await prisma.verse.findMany({
                    where: {
                        book,
                        chapter,
                        translation,
                    },
                    orderBy: {
                        verse: 'asc',
                    },
                })
                return verses
            },
            cacheTTL.chapter
        )
    } catch (error) {
        console.error('Error fetching chapter verses:', error)
        return []
    }
}

/**
 * Get chapter metadata
 */
export async function getChapter(book: string, chapter: number) {
    try {
        return await cache.getOrSet(
            cacheKeys.chapter(book, chapter),
            async () => {
                const result = await prisma.chapter.findUnique({
                    where: {
                        book_chapter: {
                            book,
                            chapter,
                        },
                    },
                })
                return result
            },
            cacheTTL.chapter
        )
    } catch (error) {
        console.error('Error fetching chapter:', error)
        return null
    }
}

/**
 * Get book metadata
 */
export async function getBook(slug: string) {
    try {
        return await cache.getOrSet(
            cacheKeys.book(slug),
            async () => {
                const result = await prisma.book.findUnique({
                    where: { slug },
                })
                return result
            },
            cacheTTL.book
        )
    } catch (error) {
        console.error('Error fetching book:', error)
        return null
    }
}

/**
 * Get two verses for a combination page
 */
export async function getVerseCombination(slug1: string, slug2: string) {
    try {
        const [v1Parts, v2Parts] = [slug1.split('-'), slug2.split('-')]

        // Use a composite key for caching combinations
        const cacheKey = `verse-combo:${slug1}:${slug2}`

        return await cache.getOrSet(
            cacheKey,
            async () => {
                const parseRef = (parts: string[]) => {
                    const verse = parseInt(parts.pop() || '0')
                    const chapter = parseInt(parts.pop() || '0')
                    const book = parts.join('-')
                    return { book, chapter, verse }
                }

                const ref1 = parseRef(v1Parts)
                const ref2 = parseRef(v2Parts)

                const [verse1, verse2] = await Promise.all([
                    getVerse(ref1.book, ref1.chapter, ref1.verse),
                    getVerse(ref2.book, ref2.chapter, ref2.verse)
                ])

                if (!verse1 || !verse2) return null

                return { verse1, verse2 }
            },
            cacheTTL.verse
        )
    } catch (error) {
        console.error('Error fetching verse combination:', error)
        return null
    }
}

/**
 * Get topic with verses
 */
export async function getTopic(slug: string, includeVerses: boolean = false) {
    try {
        const topic = await cache.getOrSet(
            `${cacheKeys.topic(slug)}${includeVerses ? ':with-verses' : ''}`,
            async () => {
                let topic = await prisma.topic.findUnique({
                    where: { slug },
                })

                // Fallback to JSON if DB fails or is empty
                if (!topic) {
                    const topicsModule = await import('@/data/topics.json')
                    const topics = (topicsModule.default || topicsModule).topics
                    topic = (topics.find((t: any) => t.slug === slug) as any) || null
                }

                if (!topic) return null;
                const verseRefs = typeof topic.verseRefs === 'string' ? JSON.parse(topic.verseRefs) : topic.verseRefs
                if (includeVerses && verseRefs?.length > 0) {
                    const verses = await resolveVerseRefs(verseRefs)
                    return { ...topic, verses }
                }

                return topic
            },
            cacheTTL.topic
        )
        return topic
    } catch (error) {
        console.error('Error fetching topic:', error)
        try {
            const topicsModule = await import('@/data/topics.json')
            const topics = (topicsModule.default || topicsModule).topics
            const topic = (topics.find((t: any) => t.slug === slug) as any) || null

            const verseRefs = typeof topic.verseRefs === 'string' ? JSON.parse(topic.verseRefs) : topic.verseRefs
            if (topic && includeVerses && verseRefs?.length > 0) {
                const verses = await resolveVerseRefs(verseRefs)
                return { ...topic, verses }
            }
            return topic
        } catch {
            return null
        }
    }
}

/**
 * Helper to resolve verse references using Bolls API with chapter-level batching
 */
async function resolveVerseRefs(refs: string[]) {
    const sliced = refs.slice(0, 50)

    // Group refs by book-chapter to batch API calls
    const chapterGroups = new Map<string, { book: string; chapter: number; verses: number[]; refIndices: number[] }>()
    sliced.forEach((ref, idx) => {
        const parts = ref.split('-')
        const verse = parseInt(parts.pop() || '0')
        const chapter = parseInt(parts.pop() || '0')
        const book = parts.join('-')
        const key = `${book}-${chapter}`
        if (!chapterGroups.has(key)) {
            chapterGroups.set(key, { book, chapter, verses: [], refIndices: [] })
        }
        chapterGroups.get(key)!.verses.push(verse)
        chapterGroups.get(key)!.refIndices.push(idx)
    })

    // Fetch each chapter once from Bolls API
    const results: (any | null)[] = new Array(sliced.length).fill(null)
    await Promise.all(
        Array.from(chapterGroups.values()).map(async ({ book, chapter, verses, refIndices }) => {
            try {
                const chapterVerses = await getChapterWithCommentary('KJV', book, chapter)
                const bookName = getBookName(book)
                const bookData = getBookBySlug(book)
                verses.forEach((verseNum, i) => {
                    const found = chapterVerses.find(v => v.verse === verseNum)
                    if (found) {
                        results[refIndices[i]] = {
                            book,
                            bookName,
                            chapter,
                            verse: verseNum,
                            text: stripHtml(found.text),
                            translation: 'KJV',
                            testament: bookData?.testament || 'Old',
                        }
                    }
                })
            } catch (err) {
                console.error(`Error fetching ${book} ${chapter} from Bolls:`, err)
            }
        })
    )

    return results.filter(Boolean)
}

/**
 * Get verses for a specific topic within a specific book
 */
export async function getTopicInBook(topicSlug: string, bookSlug: string) {
    try {
        const cacheKey = `topic-in-book:${topicSlug}:${bookSlug}`

        return await cache.getOrSet(
            cacheKey,
            async () => {
                const topic = await getTopic(topicSlug, true)
                if (!topic || !topic.verses) return null

                // Filter verses by book
                const filteredVerses = topic.verses.filter((v: any) => v.book === bookSlug)

                if (filteredVerses.length === 0) return null

                return {
                    ...topic,
                    verses: filteredVerses,
                    bookSlug
                }
            },
            cacheTTL.topic
        )
    } catch (error) {
        console.error('Error fetching topic in book:', error)
        return null
    }
}

/**
 * Get all topics grouped by category
 */
export async function getAllTopics() {
    try {
        return await cache.getOrSet(
            'all-topics',
            async () => {
                let topics = await prisma.topic.findMany({
                    orderBy: { name: 'asc' },
                })

                if (topics.length === 0) {
                    const topicsModule = await import('@/data/topics.json')
                    topics = (topicsModule.default || topicsModule).topics as any
                }

                // Group by category
                const groups: Record<string, any[]> = {}
                topics.forEach(topic => {
                    if (!groups[topic.category]) groups[topic.category] = []
                    groups[topic.category].push(topic)
                })

                return groups
            },
            cacheTTL.topic
        )
    } catch (error) {
        console.error('Error fetching all topics:', error)
        try {
            const topicsModule = await import('@/data/topics.json')
            const topics = (topicsModule.default || topicsModule).topics
            const groups: Record<string, any[]> = {}
            topics.forEach((topic: any) => {
                if (!groups[topic.category]) groups[topic.category] = []
                groups[topic.category].push(topic)
            })
            return groups
        } catch {
            return {}
        }
    }
}

/**
 * Get character biography
 */
export async function getCharacter(slug: string, includeVerses: boolean = false) {
    try {
        const character = await cache.getOrSet(
            `${cacheKeys.character(slug)}${includeVerses ? ':with-verses' : ''}`,
            async () => {
                let character = await prisma.character.findUnique({
                    where: { slug },
                })

                if (!character) {
                    const charModule = await import('@/data/characters.json')
                    const characters = (charModule.default || charModule).characters
                    character = (characters.find((c: any) => c.slug === slug) as any) || null
                }

                if (!character) return null;
                const verseRefs = typeof character.verseRefs === 'string' ? JSON.parse(character.verseRefs) : character.verseRefs
                if (includeVerses && verseRefs?.length > 0) {
                    const verses = await resolveVerseRefs(verseRefs)
                    return { ...character, verses }
                }

                return character
            },
            cacheTTL.character
        )
        return character
    } catch (error) {
        console.error('Error fetching character:', error)
        try {
            const charModule = await import('@/data/characters.json')
            const characters = (charModule.default || charModule).characters
            const character = (characters.find((c: any) => c.slug === slug) as any) || null

            const verseRefs = typeof character.verseRefs === 'string' ? JSON.parse(character.verseRefs) : character.verseRefs
            if (character && includeVerses && verseRefs?.length > 0) {
                const verses = await resolveVerseRefs(verseRefs)
                return { ...character, verses }
            }
            return character
        } catch {
            return null
        }
    }
}

/**
 * Get two characters for a combination page
 */
export async function getCharacterCombination(slug1: string, slug2: string) {
    try {
        const cacheKey = `char-combo:${slug1}:${slug2}`

        return await cache.getOrSet(
            cacheKey,
            async () => {
                const [char1, char2] = await Promise.all([
                    getCharacter(slug1, true),
                    getCharacter(slug2, true)
                ])

                if (!char1 || !char2) return null

                return { char1, char2 }
            },
            cacheTTL.character
        )
    } catch (error) {
        console.error('Error fetching character combination:', error)
        return null
    }
}

/**
 * Get all characters
 */
export async function getAllCharacters() {
    try {
        return await cache.getOrSet(
            'all-characters',
            async () => {
                let characters = await prisma.character.findMany({
                    orderBy: { name: 'asc' },
                })

                if (characters.length === 0) {
                    const charModule = await import('@/data/characters.json')
                    characters = (charModule.default || charModule).characters as any
                }

                return characters
            },
            cacheTTL.character
        )
    } catch (error) {
        console.error('Error fetching all characters:', error)
        try {
            const charModule = await import('@/data/characters.json')
            return (charModule.default || charModule).characters
        } catch {
            return []
        }
    }
}

/**
 * Get study plan
 */
export async function getStudyPlan(slug: string) {
    try {
        return await cache.getOrSet(
            cacheKeys.studyPlan(slug),
            async () => {
                let result = null
                try {
                    // @ts-ignore - StudyPlan model might not exist in client yet
                    result = await prisma.studyPlan.findUnique({
                        where: { slug },
                    })
                } catch { }

                if (!result) {
                    const plansModule = await import('@/data/study-plans.json')
                    const plans = (plansModule.default || plansModule).studyPlans
                    result = (plans.find((p: any) => p.slug === slug) as any) || null
                }

                return result
            },
            cacheTTL.studyPlan
        )
    } catch (error) {
        console.error('Error fetching study plan:', error)
        try {
            const plansModule = await import('@/data/study-plans.json')
            const plans = (plansModule.default || plansModule).studyPlans
            return (plans.find((p: any) => p.slug === slug) as any) || null
        } catch {
            return null
        }
    }
}

/**
 * Get popular verses for static generation
 */
export async function getPopularVerses(limit: number = 1000) {
    try {
        return await cache.getOrSet(
            cacheKeys.popularVerses(limit),
            async () => {
                const verses = await prisma.verse.findMany({
                    where: {
                        translation: 'KJV',
                    },
                    orderBy: {
                        popularity: 'desc',
                    },
                    take: limit,
                    select: {
                        book: true,
                        chapter: true,
                        verse: true,
                    },
                })
                return verses
            },
            cacheTTL.analytics
        )
    } catch (error) {
        console.error('Error fetching popular verses:', error)
        return []
    }
}

/**
 * Track page view for analytics
 */
export async function trackPageView(url: string, pageType: string) {
    try {
        await prisma.pageView.upsert({
            where: { url },
            update: {
                views: { increment: 1 },
                uniqueViews: { increment: 1 },
                lastView: new Date(),
            },
            create: {
                url,
                pageType,
                views: 1,
                uniqueViews: 1,
            },
        })
    } catch (error) {
        console.error('Error tracking page view:', error)
    }
}

/**
 * Check for duplicate content
 */
export async function checkDuplicateContent(
    url: string,
    title: string,
    description: string,
    content: string
) {
    try {
        const crypto = await import('crypto')
        const titleHash = crypto.createHash('md5').update(title).digest('hex')
        const descHash = crypto.createHash('md5').update(description).digest('hex')
        const contentHash = crypto.createHash('md5').update(content).digest('hex')

        const existing = await prisma.contentHash.findFirst({
            where: {
                OR: [
                    { titleHash },
                    { descHash },
                    { contentHash },
                ],
                url: { not: url },
            },
        })

        if (existing) {
            return {
                isDuplicate: true,
                duplicateOf: existing.url,
            }
        }

        // Store hash for this page
        await prisma.contentHash.upsert({
            where: { url },
            update: { titleHash, descHash, contentHash },
            create: { url, titleHash, descHash, contentHash },
        })

        return { isDuplicate: false }
    } catch (error) {
        console.error('Error checking duplicate content:', error)
        return { isDuplicate: false }
    }
}


// ============================================
// PHASE 3: Study Resources Queries
// ============================================

import type { StudyPlanFilters, SermonIllustration, WordStudy, BibleStudyGuide } from '../types'
/**
 * Get all study plans with optional filters
 */
export async function getAllStudyPlans(filters?: StudyPlanFilters) {
    try {
        const cacheKey = `study-plans:${JSON.stringify(filters || {})}`

        return await cache.getOrSet(
            cacheKey,
            async () => {
                let plans: unknown[] = []
                try {
                    // @ts-ignore
                    plans = await prisma.studyPlan.findMany()
                } catch { }

                if (plans.length === 0) {
                    const plansModule = await import('@/data/study-plans.json')
                    plans = (plansModule.default || plansModule).studyPlans
                }

                // Apply filters
                let filteredPlans = plans as any[]
                if (filters) {
                    if (filters.topic) filteredPlans = filteredPlans.filter(p => p.topic === filters.topic)
                    if (filters.duration) filteredPlans = filteredPlans.filter(p => p.duration === filters.duration)
                    if (filters.difficulty) filteredPlans = filteredPlans.filter(p => p.difficulty === filters.difficulty)
                }

                return filteredPlans
            },
            cacheTTL.topic
        )
    } catch (error) {
        console.error('Error fetching study plans:', error)
        return []
    }
}

/**
 * Get a sermon illustration by slug
 */
export async function getSermonIllustration(slug: string): Promise<SermonIllustration | null> {
    try {
        const cacheKey = `sermon-illustration:${slug}`

        return await cache.getOrSet(
            cacheKey,
            async () => {
                let result = null
                try {
                    // @ts-ignore
                    result = await prisma.sermonIllustration.findUnique({ where: { slug } })
                } catch { }

                if (!result) {
                    const module = await import('@/data/sermon-illustrations.json')
                    const items = (module.default || module).sermonIllustrations
                    result = items.find((i: any) => i.slug === slug) || null
                }
                return result as any
            },
            cacheTTL.topic
        )
    } catch (error) {
        console.error('Error fetching sermon illustration:', error)
        return null
    }
}

/**
 * Get sermon illustrations by topic
 */
export async function getSermonIllustrationsByTopic(topic: string): Promise<SermonIllustration[]> {
    try {
        const cacheKey = `sermon-illustrations:topic:${topic}`

        return await cache.getOrSet(
            cacheKey,
            async () => {
                let items: any[] = []
                try {
                    // @ts-ignore
                    items = await prisma.sermonIllustration.findMany({ where: { topic } })
                } catch { }

                if (items.length === 0) {
                    const module = await import('@/data/sermon-illustrations.json')
                    const allItems = (module.default || module).sermonIllustrations
                    items = allItems.filter((i: any) => i.topic === topic)
                }
                return items as any[]
            },
            cacheTTL.topic
        )
    } catch (error) {
        console.error('Error fetching sermon illustrations:', error)
        return []
    }
}

/**
 * Get a word study by word and language
 */
export async function getWordStudy(word: string, language: string): Promise<WordStudy | null> {
    try {
        const cacheKey = `word-study:${language}:${word}`

        return await cache.getOrSet(
            cacheKey,
            async () => {
                let result = null
                try {
                    // @ts-ignore
                    result = await prisma.wordStudy.findFirst({
                        where: { slug: word, language: language as any }
                    })
                } catch { }

                if (!result) {
                    const module = await import('@/data/word-studies.json')
                    const items = (module.default || module).wordStudies
                    result = items.find((i: any) => i.slug === word && i.language === language) || null
                }
                return result as any
            },
            cacheTTL.verse
        )
    } catch (error) {
        console.error('Error fetching word study:', error)
        return null
    }
}

/**
 * Get all word studies
 */
export async function getAllWordStudies() {
    try {
        return await cache.getOrSet(
            'all-word-studies',
            async () => {
                let items: any[] = []
                try {
                    // @ts-ignore
                    items = await prisma.wordStudy.findMany({ orderBy: { slug: 'asc' } })
                } catch { }

                if (items.length === 0) {
                    const module = await import('@/data/word-studies.json')
                    items = (module.default || module).wordStudies as any[]
                }
                return items
            },
            cacheTTL.topic
        )
    } catch (error) {
        console.error('Error fetching all word studies:', error)
        return []
    }
}

/**
 * Get all sermon illustrations
 */
export async function getAllSermonIllustrations(): Promise<SermonIllustration[]> {
    try {
        return await cache.getOrSet(
            'all-sermon-illustrations',
            async () => {
                let items: any[] = []
                try {
                    // @ts-ignore
                    items = await prisma.sermonIllustration.findMany({ orderBy: { title: 'asc' } })
                } catch { }

                if (items.length === 0) {
                    const module = await import('@/data/sermon-illustrations.json')
                    items = (module.default || module).sermonIllustrations as any[]
                }
                return items
            },
            cacheTTL.topic
        )
    } catch (error) {
        console.error('Error fetching all sermon illustrations:', error)
        try {
            const module = await import('@/data/sermon-illustrations.json')
            return (module.default || module).sermonIllustrations as any[]
        } catch {
            return []
        }
    }
}

/**
 * Get all bible study guides
 */
export async function getAllBibleStudyGuides(): Promise<BibleStudyGuide[]> {
    try {
        return await cache.getOrSet(
            'all-bible-study-guides',
            async () => {
                let items: any[] = []
                try {
                    // @ts-ignore
                    items = await prisma.bibleStudyGuide.findMany({ orderBy: { title: 'asc' } })
                } catch { }

                if (items.length === 0) {
                    const module = await import('@/data/bible-study-guides.json')
                    items = (module.default || module).bibleStudyGuides as any[]
                }
                return items
            },
            cacheTTL.topic
        )
    } catch (error) {
        console.error('Error fetching all bible study guides:', error)
        try {
            const module = await import('@/data/bible-study-guides.json')
            return (module.default || module).bibleStudyGuides as any[]
        } catch {
            return []
        }
    }
}

/**
 * Get a single bible study guide by slug
 */
export async function getBibleStudyGuide(slug: string): Promise<BibleStudyGuide | null> {
    try {
        const cacheKey = `bible-study-guide:${slug}`

        return await cache.getOrSet(
            cacheKey,
            async () => {
                let result = null
                try {
                    // @ts-ignore
                    result = await prisma.bibleStudyGuide.findUnique({ where: { slug } })
                } catch { }

                if (!result) {
                    const module = await import('@/data/bible-study-guides.json')
                    const items = (module.default || module).bibleStudyGuides
                    result = items.find((i: any) => i.slug === slug) || null
                }
                return result as any
            },
            cacheTTL.topic
        )
    } catch (error) {
        console.error('Error fetching bible study guide:', error)
        return null
    }
}

// ============================================
// PHASE 4: Q&A System Queries
// ============================================

export async function getQuestions() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const data = require('../../data/questions.json');
        return data.questions;
    } catch {
        return [];
    }
}

export async function getQuestionBySlug(slug: string) {
    try {
        const questions = await getQuestions();
        return questions.find((q: any) => q.slug === slug) || null;
    } catch {
        return null;
    }
}

export async function getQuestionCategories() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const data = require('../../data/questions.json');
        return data.categories;
    } catch {
        return [];
    }
}

export async function getQuestionsByCategory(categorySlug: string) {
    try {
        const categories = await getQuestionCategories();
        const category = categories.find((c: any) => c.slug === categorySlug);
        if (!category) return [];

        const questions = await getQuestions();
        return questions.filter((q: any) => q.category === category.name);
    } catch {
        return [];
    }
}

export async function getRelatedQuestions(questionSlug: string, limit = 3) {
    try {
        const current = await getQuestionBySlug(questionSlug);
        if (!current) return [];

        const questions = await getQuestions();
        return questions
            .filter((q: any) => q.slug !== questionSlug && (q.category === current.category || q.tags.some((t: string) => current.tags.includes(t))))
            .slice(0, limit);
    } catch {
        return [];
    }
}

// ============================================
// PHASE 4B: Prayer Library Queries
// ============================================

export async function getPrayers() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const data = require('@/data/prayers.json');
        return data.prayers;
    } catch {
        return [];
    }
}

export async function getPrayerBySlug(slug: string) {
    try {
        const prayers = await getPrayers();
        return prayers.find((p: any) => p.slug === slug) || null;
    } catch {
        return null;
    }
}

export async function getPrayerCategories() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const data = require('@/data/prayers.json');
        return data.categories;
    } catch {
        return [];
    }
}

export async function getPrayersByCategory(categorySlug: string) {
    try {
        const categories = await getPrayerCategories();
        const category = categories.find((c: any) => c.slug === categorySlug);
        if (!category) return [];

        const prayers = await getPrayers();
        return prayers.filter((p: any) => p.category === category.name);
    } catch {
        return [];
    }
}

export async function getRelatedPrayers(prayerSlug: string, limit = 3) {
    try {
        const current = await getPrayerBySlug(prayerSlug);
        if (!current) return [];

        const prayers = await getPrayers();
        return prayers
            .filter((p: any) => p.slug !== prayerSlug && (p.category === current.category || p.tags.some((t: string) => current.tags.includes(t))))
            .slice(0, limit);
    } catch {
        return [];
    }
}

// ============================================
// PHASE 4F: Lexicon Pillar Queries
// ============================================

// Cached lexicon loader — reads 23MB JSON file once via fs, not import()
let _lexiconCache: any[] | null = null;
function loadLexiconJSON(): any[] {
    if (_lexiconCache) return _lexiconCache;
    try {
        const fs = require('fs');
        const path = require('path');
        const filePath = path.join(process.cwd(), 'data', 'lexicon.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        _lexiconCache = parsed.entries || parsed || [];
        return _lexiconCache!;
    } catch {
        return [];
    }
}

export async function getLexiconEntry(strongs: string) {
    try {
        const entry = await (prisma as any).lexiconEntry.findUnique({
            where: { strongs: strongs.toUpperCase() }
        });

        if (!entry) throw new Error('Not found in DB');

        // Parse JSON strings back to objects
        return {
            ...entry,
            definitions: entry.definitions ? JSON.parse(entry.definitions) : {},
            morphology: entry.morphology ? JSON.parse(entry.morphology) : {},
            stats: entry.stats ? JSON.parse(entry.stats) : {},
            synergy: entry.synergy ? JSON.parse(entry.synergy) : {},
            verseSample: entry.verseSample ? JSON.parse(entry.verseSample) : []
        };
    } catch {
        // JSON fallback
        try {
            const arr = loadLexiconJSON();
            const found = arr.find((e: any) => e.strongs?.toUpperCase() === strongs.toUpperCase());
            return found || null;
        } catch {
            return null;
        }
    }
}

export async function getAllLexiconEntries() {
    try {
        const entries = await (prisma as any).lexiconEntry.findMany({
            orderBy: { strongs: 'asc' }
        });

        if (!entries || entries.length === 0) throw new Error('No DB entries');

        // Parse JSON strings back to objects for all entries
        return entries.map((entry: any) => ({
            ...entry,
            definitions: entry.definitions ? JSON.parse(entry.definitions) : {},
            morphology: entry.morphology ? JSON.parse(entry.morphology) : {},
            stats: entry.stats ? JSON.parse(entry.stats) : {},
            synergy: entry.synergy ? JSON.parse(entry.synergy) : {},
            verseSample: entry.verseSample ? JSON.parse(entry.verseSample) : []
        }));
    } catch {
        // JSON fallback
        try {
            const arr = loadLexiconJSON();
            return [...arr].sort((a: any, b: any) => (a.strongs || '').localeCompare(b.strongs || ''));
        } catch {
            return [];
        }
    }
}

// ============================================
// PHASE 4H: Keyword Scaling Queries
// ============================================

export async function getLexiconConcept(slug: string) {
    try {
        const data = require('../../data/lexicon-concepts.json');
        const concept = data.find((c: any) => c.slug === slug.toLowerCase()) || null;

        if (!concept) return null;

        // Fetch all the Strong's entries for this concept
        const entries = await Promise.all(
            concept.strongs.map((s: string) => getLexiconEntry(s))
        );

        return {
            ...concept,
            entries: entries.filter(Boolean)
        };
    } catch {
        return null;
    }
}

export async function getAllLexiconConcepts() {
    try {
        const data = require('../../data/lexicon-concepts.json');
        return data;
    } catch {
        return [];
    }
}

export async function getLexiconFamily(strongs: string) {
    try {
        const entry = await getLexiconEntry(strongs);
        if (!entry) return null;

        const rootStrongs = entry.rootWord || entry.strongs;

        // Try Prisma first, fall back to JSON
        let family: any[] = [];
        try {
            family = await (prisma as any).lexiconEntry.findMany({
                where: {
                    OR: [
                        { strongs: rootStrongs },
                        { rootWord: rootStrongs }
                    ]
                }
            });
            family = family.map((e: any) => ({
                ...e,
                definitions: e.definitions ? JSON.parse(e.definitions) : {},
                morphology: e.morphology ? JSON.parse(e.morphology) : {},
                stats: e.stats ? JSON.parse(e.stats) : {},
                synergy: e.synergy ? JSON.parse(e.synergy) : {},
                verseSample: e.verseSample ? JSON.parse(e.verseSample) : []
            }));
        } catch {
            // JSON fallback — find entries sharing the root
            const arr = loadLexiconJSON();
            family = arr.filter((e: any) =>
                e.strongs?.toUpperCase() === rootStrongs.toUpperCase() ||
                e.rootWord?.toUpperCase() === rootStrongs.toUpperCase()
            );
        }

        return {
            root: await getLexiconEntry(rootStrongs),
            members: family
        };
    } catch {
        return null;
    }
}

export async function getAuthorLexicon(authorName: string, language: string) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const authorsData = require('../../data/biblical-authors.json');
        const author = authorsData.find((a: any) => a.name === authorName && a.language === language);

        if (!author) return null;

        // Try Prisma first, fall back to JSON
        let allEntries: any[] = [];
        try {
            allEntries = await (prisma as any).lexiconEntry.findMany({
                where: { language: language }
            });
            // Parse JSON strings from Prisma
            allEntries = allEntries.map((e: any) => ({
                ...e,
                definitions: e.definitions ? JSON.parse(e.definitions) : {},
                stats: e.stats ? JSON.parse(e.stats) : {},
            }));
        } catch {
            // JSON fallback
            const arr = loadLexiconJSON();
            allEntries = arr.filter((e: any) => e.language?.toLowerCase() === language.toLowerCase());
        }

        // Filter and aggregate stats for the author's books
        const vocab = allEntries.map((e: any) => {
            const stats = e.stats || {};
            const bookBreakdown = stats.bookBreakdown || {};

            let authorUsage = 0;
            author.books.forEach((book: string) => {
                authorUsage += bookBreakdown[book] || 0;
            });

            return {
                ...e,
                definitions: e.definitions || {},
                authorUsage
            };
        })
            .filter((e: any) => e.authorUsage > 0)
            .sort((a: any, b: any) => b.authorUsage - a.authorUsage);

        return {
            author,
            topVocab: vocab.slice(0, 24),
            totalWordsCount: vocab.length
        };
    } catch (error) {
        console.error('Error fetching author lexicon:', error);
        return null;
    }
}

export async function getLexiconComparison(strongsA: string, strongsB: string) {
    try {
        const [entryA, entryB] = await Promise.all([
            getLexiconEntry(strongsA),
            getLexiconEntry(strongsB)
        ]);

        if (!entryA || !entryB) return null;

        return {
            entryA,
            entryB
        };
    } catch (error) {
        console.error('Error fetching lexicon comparison:', error);
        return null;
    }
}

export async function getLexiconPaginated(language: string, page: number = 1, pageSize: number = 100) {
    try {
        const skip = (page - 1) * pageSize;

        const [entries, totalCount] = await Promise.all([
            (prisma as any).lexiconEntry.findMany({
                where: { language: language.toLowerCase() },
                orderBy: { strongs: 'asc' },
                skip,
                take: pageSize
            }),
            (prisma as any).lexiconEntry.count({
                where: { language: language.toLowerCase() }
            })
        ]);

        if (!entries || entries.length === 0) throw new Error('No DB entries');

        return {
            entries: entries.map((e: any) => ({
                ...e,
                definitions: e.definitions ? JSON.parse(e.definitions) : {},
                stats: e.stats ? JSON.parse(e.stats) : {}
            })),
            totalCount,
            totalPages: Math.ceil(totalCount / pageSize),
            currentPage: page
        };
    } catch {
        // JSON fallback with case-insensitive language filter
        try {
            const arr = loadLexiconJSON();
            const filtered = arr
                .filter((e: any) => e.language?.toLowerCase() === language.toLowerCase())
                .sort((a: any, b: any) => (a.strongs || '').localeCompare(b.strongs || ''));

            const totalCount = filtered.length;
            const skip = (page - 1) * pageSize;
            const entries = filtered.slice(skip, skip + pageSize);

            return {
                entries,
                totalCount,
                totalPages: Math.ceil(totalCount / pageSize),
                currentPage: page
            };
        } catch {
            return { entries: [], totalCount: 0, totalPages: 0, currentPage: page };
        }
    }
}
