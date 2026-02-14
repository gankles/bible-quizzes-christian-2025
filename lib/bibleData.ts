// Bible Data Management Utilities

import { Verse, Chapter, Book, Topic, Character } from "@/types/bible";

/**
 * Bible Books Data
 * Complete list of all 66 books of the Bible
 */
export const BIBLE_BOOKS = {
    oldTestament: [
        { name: "Genesis", slug: "genesis", chapters: 50, testament: "Old" as const, id: "GEN" },
        { name: "Exodus", slug: "exodus", chapters: 40, testament: "Old" as const, id: "EXO" },
        { name: "Leviticus", slug: "leviticus", chapters: 27, testament: "Old" as const, id: "LEV" },
        { name: "Numbers", slug: "numbers", chapters: 36, testament: "Old" as const, id: "NUM" },
        { name: "Deuteronomy", slug: "deuteronomy", chapters: 34, testament: "Old" as const, id: "DEU" },
        { name: "Joshua", slug: "joshua", chapters: 24, testament: "Old" as const, id: "JOS" },
        { name: "Judges", slug: "judges", chapters: 21, testament: "Old" as const, id: "JDG" },
        { name: "Ruth", slug: "ruth", chapters: 4, testament: "Old" as const, id: "RUT" },
        { name: "1 Samuel", slug: "1-samuel", chapters: 31, testament: "Old" as const, id: "1SA" },
        { name: "2 Samuel", slug: "2-samuel", chapters: 24, testament: "Old" as const, id: "2SA" },
        { name: "1 Kings", slug: "1-kings", chapters: 22, testament: "Old" as const, id: "1KI" },
        { name: "2 Kings", slug: "2-kings", chapters: 25, testament: "Old" as const, id: "2KI" },
        { name: "1 Chronicles", slug: "1-chronicles", chapters: 29, testament: "Old" as const, id: "1CH" },
        { name: "2 Chronicles", slug: "2-chronicles", chapters: 36, testament: "Old" as const, id: "2CH" },
        { name: "Ezra", slug: "ezra", chapters: 10, testament: "Old" as const, id: "EZR" },
        { name: "Nehemiah", slug: "nehemiah", chapters: 13, testament: "Old" as const, id: "NEH" },
        { name: "Esther", slug: "esther", chapters: 10, testament: "Old" as const, id: "EST" },
        { name: "Job", slug: "job", chapters: 42, testament: "Old" as const, id: "JOB" },
        { name: "Psalms", slug: "psalms", chapters: 150, testament: "Old" as const, id: "PSA" },
        { name: "Proverbs", slug: "proverbs", chapters: 31, testament: "Old" as const, id: "PRO" },
        { name: "Ecclesiastes", slug: "ecclesiastes", chapters: 12, testament: "Old" as const, id: "ECC" },
        { name: "Song of Solomon", slug: "song-of-solomon", chapters: 8, testament: "Old" as const, id: "SNG" },
        { name: "Isaiah", slug: "isaiah", chapters: 66, testament: "Old" as const, id: "ISA" },
        { name: "Jeremiah", slug: "jeremiah", chapters: 52, testament: "Old" as const, id: "JER" },
        { name: "Lamentations", slug: "lamentations", chapters: 5, testament: "Old" as const, id: "LAM" },
        { name: "Ezekiel", slug: "ezekiel", chapters: 48, testament: "Old" as const, id: "EZK" },
        { name: "Daniel", slug: "daniel", chapters: 12, testament: "Old" as const, id: "DAN" },
        { name: "Hosea", slug: "hosea", chapters: 14, testament: "Old" as const, id: "HOS" },
        { name: "Joel", slug: "joel", chapters: 3, testament: "Old" as const, id: "JOE" },
        { name: "Amos", slug: "amos", chapters: 9, testament: "Old" as const, id: "AMO" },
        { name: "Obadiah", slug: "obadiah", chapters: 1, testament: "Old" as const, id: "OBA" },
        { name: "Jonah", slug: "jonah", chapters: 4, testament: "Old" as const, id: "JON" },
        { name: "Micah", slug: "micah", chapters: 7, testament: "Old" as const, id: "MIC" },
        { name: "Nahum", slug: "nahum", chapters: 3, testament: "Old" as const, id: "NAM" },
        { name: "Habakkuk", slug: "habakkuk", chapters: 3, testament: "Old" as const, id: "HAB" },
        { name: "Zephaniah", slug: "zephaniah", chapters: 3, testament: "Old" as const, id: "ZEP" },
        { name: "Haggai", slug: "haggai", chapters: 2, testament: "Old" as const, id: "HAG" },
        { name: "Zechariah", slug: "zechariah", chapters: 14, testament: "Old" as const, id: "ZEC" },
        { name: "Malachi", slug: "malachi", chapters: 4, testament: "Old" as const, id: "MAL" },
    ],
    newTestament: [
        { name: "Matthew", slug: "matthew", chapters: 28, testament: "New" as const, id: "MAT" },
        { name: "Mark", slug: "mark", chapters: 16, testament: "New" as const, id: "MRK" },
        { name: "Luke", slug: "luke", chapters: 24, testament: "New" as const, id: "LUK" },
        { name: "John", slug: "john", chapters: 21, testament: "New" as const, id: "JHN" },
        { name: "Acts", slug: "acts", chapters: 28, testament: "New" as const, id: "ACT" },
        { name: "Romans", slug: "romans", chapters: 16, testament: "New" as const, id: "ROM" },
        { name: "1 Corinthians", slug: "1-corinthians", chapters: 16, testament: "New" as const, id: "1CO" },
        { name: "2 Corinthians", slug: "2-corinthians", chapters: 13, testament: "New" as const, id: "2CO" },
        { name: "Galatians", slug: "galatians", chapters: 6, testament: "New" as const, id: "GAL" },
        { name: "Ephesians", slug: "ephesians", chapters: 6, testament: "New" as const, id: "EPH" },
        { name: "Philippians", slug: "philippians", chapters: 4, testament: "New" as const, id: "PHP" },
        { name: "Colossians", slug: "colossians", chapters: 4, testament: "New" as const, id: "COL" },
        { name: "1 Thessalonians", slug: "1-thessalonians", chapters: 5, testament: "New" as const, id: "1TH" },
        { name: "2 Thessalonians", slug: "2-thessalonians", chapters: 3, testament: "New" as const, id: "2TH" },
        { name: "1 Timothy", slug: "1-timothy", chapters: 6, testament: "New" as const, id: "1TI" },
        { name: "2 Timothy", slug: "2-timothy", chapters: 4, testament: "New" as const, id: "2TI" },
        { name: "Titus", slug: "titus", chapters: 3, testament: "New" as const, id: "TIT" },
        { name: "Philemon", slug: "philemon", chapters: 1, testament: "New" as const, id: "PHM" },
        { name: "Hebrews", slug: "hebrews", chapters: 13, testament: "New" as const, id: "HEB" },
        { name: "James", slug: "james", chapters: 5, testament: "New" as const, id: "JAS" },
        { name: "1 Peter", slug: "1-peter", chapters: 5, testament: "New" as const, id: "1PE" },
        { name: "2 Peter", slug: "2-peter", chapters: 3, testament: "New" as const, id: "2PE" },
        { name: "1 John", slug: "1-john", chapters: 5, testament: "New" as const, id: "1JN" },
        { name: "2 John", slug: "2-john", chapters: 1, testament: "New" as const, id: "2JN" },
        { name: "3 John", slug: "3-john", chapters: 1, testament: "New" as const, id: "3JN" },
        { name: "Jude", slug: "jude", chapters: 1, testament: "New" as const, id: "JUD" },
        { name: "Revelation", slug: "revelation", chapters: 22, testament: "New" as const, id: "REV" },
    ],
};

/**
 * Get all Bible books as a flat array
 */
export function getAllBooks() {
    return [...BIBLE_BOOKS.oldTestament, ...BIBLE_BOOKS.newTestament];
}

/**
 * Get book by slug
 */
export function getBookBySlug(slug: string) {
    return getAllBooks().find((book) => book.slug === slug);
}

/**
 * Format verse reference
 * Example: formatVerseRef("john", 3, 16) => "John 3:16"
 */
export function formatVerseRef(book: string, chapter: number, verse: number): string {
    const bookData = getBookBySlug(book);
    const bookName = bookData?.name || book;
    return `${bookName} ${chapter}:${verse}`;
}

/**
 * Parse verse reference string
 * Example: parseVerseRef("John 3:16") => { book: "john", chapter: 3, verse: 16 }
 */
export function parseVerseRef(ref: string): { book: string; chapter: number; verse: number } | null {
    const match = ref.match(/^(\d?\s?[A-Za-z]+)\s+(\d+):(\d+)$/);
    if (!match) return null;

    const bookName = match[1].trim();
    const book = getAllBooks().find(
        (b) => b.name.toLowerCase() === bookName.toLowerCase()
    );

    if (!book) return null;

    return {
        book: book.slug,
        chapter: parseInt(match[2]),
        verse: parseInt(match[3]),
    };
}

/**
 * Calculate related content score
 * Used for "Related Articles" algorithm
 */
export function calculateRelatedScore(
    page1: { tags: string[]; topics: string[]; testament?: string },
    page2: { tags: string[]; topics: string[]; testament?: string }
): number {
    let score = 0;

    // Tag overlap (40% weight)
    const tagOverlap = page1.tags.filter((tag) => page2.tags.includes(tag)).length;
    score += tagOverlap * 40;

    // Topic similarity (30% weight)
    const topicOverlap = page1.topics.filter((topic) => page2.topics.includes(topic)).length;
    score += topicOverlap * 30;

    // Testament match (30% weight)
    if (page1.testament && page2.testament && page1.testament === page2.testament) {
        score += 30;
    }

    return score;
}

/**
 * Get related pages sorted by relevance
 */
export function getRelatedPages<T extends { tags: string[]; topics: string[]; testament?: string }>(
    currentPage: T,
    allPages: T[],
    limit: number = 4
): T[] {
    return allPages
        .filter((page) => page !== currentPage)
        .map((page) => ({
            page,
            score: calculateRelatedScore(currentPage, page),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((item) => item.page);
}

/**
 * Generate SEO-friendly title
 * Max 60 characters for optimal SEO
 */
export function generateSEOTitle(base: string, suffix: string = "Bible Study Hub"): string {
    const maxLength = 60;
    const combined = `${base} | ${suffix}`;

    if (combined.length <= maxLength) {
        return combined;
    }

    // Truncate base to fit
    const availableLength = maxLength - suffix.length - 3; // 3 for " | "
    return `${base.substring(0, availableLength)}... | ${suffix}`;
}

/**
 * Generate SEO-friendly meta description
 * Max 160 characters for optimal SEO
 */
export function generateMetaDescription(content: string): string {
    const maxLength = 160;

    if (content.length <= maxLength) {
        return content;
    }

    // Truncate at last complete word before maxLength
    const truncated = content.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");

    return truncated.substring(0, lastSpace) + "...";
}

/**
 * Calculate reading time
 * Based on 200 words per minute
 */
export function calculateReadingTime(wordCount: number): string {
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

/**
 * Popular Bible Topics
 * Used for topic pages and navigation
 */
export const POPULAR_TOPICS = [
    { name: "Love", slug: "love", category: "Emotions" as const },
    { name: "Faith", slug: "faith", category: "Theology" as const },
    { name: "Hope", slug: "hope", category: "Emotions" as const },
    { name: "Prayer", slug: "prayer", category: "Theology" as const },
    { name: "Salvation", slug: "salvation", category: "Theology" as const },
    { name: "Grace", slug: "grace", category: "Theology" as const },
    { name: "Forgiveness", slug: "forgiveness", category: "Relationships" as const },
    { name: "Peace", slug: "peace", category: "Emotions" as const },
    { name: "Joy", slug: "joy", category: "Emotions" as const },
    { name: "Wisdom", slug: "wisdom", category: "Character Traits" as const },
];

/**
 * Popular Bible Characters
 */
export const POPULAR_CHARACTERS = [
    { name: "Jesus Christ", slug: "jesus-christ", testament: "New" as const },
    { name: "David", slug: "david", testament: "Old" as const },
    { name: "Moses", slug: "moses", testament: "Old" as const },
    { name: "Paul", slug: "paul", testament: "New" as const },
    { name: "Abraham", slug: "abraham", testament: "Old" as const },
    { name: "Peter", slug: "peter", testament: "New" as const },
    { name: "Mary", slug: "mary", testament: "New" as const },
    { name: "Joseph", slug: "joseph", testament: "Old" as const },
];
