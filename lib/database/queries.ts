// JSON-only query layer — no Prisma/SQLite dependency
// All data loaded from JSON files in data/ directory

import { cache, cacheKeys, cacheTTL } from './cache'
import { fetchVerseFromAPI, BibleTranslation } from '../bibleApi'
import { getBookBySlug } from '../bible-data'
import { getChapterWithCommentary, stripHtml, getBookName } from '../bolls-api'

// ============================================
// JSON Loaders (cached in memory)
// ============================================

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

let _topicsCache: any[] | null = null;
function loadTopicsJSON(): any[] {
    if (_topicsCache) return _topicsCache;
    try {
        const fs = require('fs');
        const path = require('path');
        const filePath = path.join(process.cwd(), 'data', 'topics.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        _topicsCache = parsed.topics || parsed || [];
        return _topicsCache!;
    } catch {
        return [];
    }
}

let _charactersCache: any[] | null = null;
function loadCharactersJSON(): any[] {
    if (_charactersCache) return _charactersCache;
    try {
        const fs = require('fs');
        const path = require('path');
        const filePath = path.join(process.cwd(), 'data', 'characters.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        _charactersCache = parsed.characters || parsed || [];
        return _charactersCache!;
    } catch {
        return [];
    }
}

// ============================================
// Verse Queries (via Bolls API)
// ============================================

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
        return await cache.getOrSet(
            cacheKeys.verse(book, chapter, verse, translation),
            async () => {
                const result = await fetchVerseFromAPI(book, chapter, verse, translation as BibleTranslation)
                if (result) {
                    const bookData = getBookBySlug(book)
                    return {
                        ...result,
                        bookName: bookData?.name || book,
                        testament: bookData?.testament || 'old'
                    }
                }
                return null
            },
            cacheTTL.verse
        )
    } catch (error) {
        console.error('Error fetching verse:', error)
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
                const verses = await getChapterWithCommentary(translation, book, chapter)
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
        const bookData = getBookBySlug(book)
        if (!bookData) return null
        return {
            book,
            chapter,
            bookName: bookData.name,
            totalChapters: bookData.chapters,
        }
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
        const bookData = getBookBySlug(slug)
        if (!bookData) return null
        return {
            slug,
            name: bookData.name,
            testament: bookData.testament,
            chapters: bookData.chapters,
            order: bookData.order,
        }
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
        const cacheKey = `verse-combo:${slug1}:${slug2}`

        return await cache.getOrSet(
            cacheKey,
            async () => {
                const parseRef = (slug: string) => {
                    const parts = slug.split('-')
                    const verse = parseInt(parts.pop() || '0')
                    const chapter = parseInt(parts.pop() || '0')
                    const book = parts.join('-')
                    return { book, chapter, verse }
                }

                const ref1 = parseRef(slug1)
                const ref2 = parseRef(slug2)

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

// ============================================
// Topic Queries (JSON)
// ============================================

/**
 * Helper to resolve verse references using Bolls API with chapter-level batching
 */
async function resolveVerseRefs(refs: string[]) {
    const sliced = refs.slice(0, 50)

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
                            testament: bookData?.testament || 'old',
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
 * Get topic with verses
 */
export async function getTopic(slug: string, includeVerses: boolean = false) {
    try {
        return await cache.getOrSet(
            `${cacheKeys.topic(slug)}${includeVerses ? ':with-verses' : ''}`,
            async () => {
                const topics = loadTopicsJSON()
                const topic = topics.find((t: any) => t.slug === slug) || null
                if (!topic) return null

                const verseRefs = typeof topic.verseRefs === 'string' ? JSON.parse(topic.verseRefs) : topic.verseRefs
                if (includeVerses && verseRefs?.length > 0) {
                    const verses = await resolveVerseRefs(verseRefs)
                    return { ...topic, verses }
                }

                return topic
            },
            cacheTTL.topic
        )
    } catch (error) {
        console.error('Error fetching topic:', error)
        return null
    }
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
                const topics = loadTopicsJSON()
                const groups: Record<string, any[]> = {}
                topics.forEach((topic: any) => {
                    if (!groups[topic.category]) groups[topic.category] = []
                    groups[topic.category].push(topic)
                })
                return groups
            },
            cacheTTL.topic
        )
    } catch (error) {
        console.error('Error fetching all topics:', error)
        return {}
    }
}

// ============================================
// Character Queries (JSON)
// ============================================

/**
 * Get character biography
 */
export async function getCharacter(slug: string, includeVerses: boolean = false) {
    try {
        return await cache.getOrSet(
            `${cacheKeys.character(slug)}${includeVerses ? ':with-verses' : ''}`,
            async () => {
                const characters = loadCharactersJSON()
                const character = characters.find((c: any) => c.slug === slug) || null
                if (!character) return null

                const verseRefs = typeof character.verseRefs === 'string' ? JSON.parse(character.verseRefs) : character.verseRefs
                if (includeVerses && verseRefs?.length > 0) {
                    const verses = await resolveVerseRefs(verseRefs)
                    return { ...character, verses }
                }

                return character
            },
            cacheTTL.character
        )
    } catch (error) {
        console.error('Error fetching character:', error)
        return null
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
                const characters = loadCharactersJSON()
                return [...characters].sort((a: any, b: any) => (a.name || '').localeCompare(b.name || ''))
            },
            cacheTTL.character
        )
    } catch (error) {
        console.error('Error fetching all characters:', error)
        return []
    }
}

// ============================================
// Analytics (no-ops without database)
// ============================================

/**
 * Track page view — no-op without database
 */
export async function trackPageView(_url: string, _pageType: string) {
    // No-op: analytics tracking requires a database
}

/**
 * Check for duplicate content — no-op without database
 */
export async function checkDuplicateContent(
    _url: string,
    _title: string,
    _description: string,
    _content: string
) {
    return { isDuplicate: false }
}

/**
 * Get popular verses — returns empty without database
 */
export async function getPopularVerses(_limit: number = 1000) {
    return []
}

// ============================================
// Study Resources Queries (JSON)
// ============================================

import type { StudyPlanFilters, SermonIllustration, WordStudy, BibleStudyGuide } from '../types'

/**
 * Get study plan
 */
export async function getStudyPlan(slug: string) {
    try {
        return await cache.getOrSet(
            cacheKeys.studyPlan(slug),
            async () => {
                const plansModule = await import('@/data/study-plans.json')
                const plans = (plansModule.default || plansModule).studyPlans
                return (plans.find((p: any) => p.slug === slug) as any) || null
            },
            cacheTTL.studyPlan
        )
    } catch (error) {
        console.error('Error fetching study plan:', error)
        return null
    }
}

/**
 * Get all study plans with optional filters
 */
export async function getAllStudyPlans(filters?: StudyPlanFilters) {
    try {
        const cacheKey = `study-plans:${JSON.stringify(filters || {})}`

        return await cache.getOrSet(
            cacheKey,
            async () => {
                const plansModule = await import('@/data/study-plans.json')
                let plans = (plansModule.default || plansModule).studyPlans as any[]

                if (filters) {
                    if (filters.topic) plans = plans.filter(p => p.topic === filters.topic)
                    if (filters.duration) plans = plans.filter(p => p.duration === filters.duration)
                    if (filters.difficulty) plans = plans.filter(p => p.difficulty === filters.difficulty)
                }

                return plans
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
                const module = await import('@/data/sermon-illustrations.json')
                const items = (module.default || module).sermonIllustrations
                return (items.find((i: any) => i.slug === slug) || null) as any
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
                const module = await import('@/data/sermon-illustrations.json')
                const allItems = (module.default || module).sermonIllustrations
                return allItems.filter((i: any) => i.topic === topic) as any[]
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
                const module = await import('@/data/word-studies.json')
                const items = (module.default || module).wordStudies
                return (items.find((i: any) => i.slug === word && i.language === language) || null) as any
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
                const module = await import('@/data/word-studies.json')
                return (module.default || module).wordStudies as any[]
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
                const module = await import('@/data/sermon-illustrations.json')
                return (module.default || module).sermonIllustrations as any[]
            },
            cacheTTL.topic
        )
    } catch (error) {
        console.error('Error fetching all sermon illustrations:', error)
        return []
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
                const module = await import('@/data/bible-study-guides.json')
                return (module.default || module).bibleStudyGuides as any[]
            },
            cacheTTL.topic
        )
    } catch (error) {
        console.error('Error fetching all bible study guides:', error)
        return []
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
                const module = await import('@/data/bible-study-guides.json')
                const items = (module.default || module).bibleStudyGuides
                return (items.find((i: any) => i.slug === slug) || null) as any
            },
            cacheTTL.topic
        )
    } catch (error) {
        console.error('Error fetching bible study guide:', error)
        return null
    }
}

// ============================================
// Q&A System Queries (JSON)
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
// Prayer Library Queries (JSON)
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
// Lexicon Queries (JSON)
// ============================================

export async function getLexiconEntry(strongs: string) {
    try {
        const arr = loadLexiconJSON();
        return arr.find((e: any) => e.strongs?.toUpperCase() === strongs.toUpperCase()) || null;
    } catch {
        return null;
    }
}

export async function getAllLexiconEntries() {
    try {
        const arr = loadLexiconJSON();
        return [...arr].sort((a: any, b: any) => (a.strongs || '').localeCompare(b.strongs || ''));
    } catch {
        return [];
    }
}

export async function getLexiconConcept(slug: string) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const data = require('../../data/lexicon-concepts.json');
        const concept = data.find((c: any) => c.slug === slug.toLowerCase()) || null;

        if (!concept) return null;

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
        // eslint-disable-next-line @typescript-eslint/no-require-imports
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

        const arr = loadLexiconJSON();
        const family = arr.filter((e: any) =>
            e.strongs?.toUpperCase() === rootStrongs.toUpperCase() ||
            e.rootWord?.toUpperCase() === rootStrongs.toUpperCase()
        );

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

        const arr = loadLexiconJSON();
        const allEntries = arr.filter((e: any) => e.language?.toLowerCase() === language.toLowerCase());

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

        return { entryA, entryB };
    } catch (error) {
        console.error('Error fetching lexicon comparison:', error);
        return null;
    }
}

export async function getLexiconPaginated(language: string, page: number = 1, pageSize: number = 100) {
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
