// Bible API Integration Layer - Powered by SWORD Engine Architecture
import { SWMgr } from './sword/SWMgr';
import { VerseKey } from './sword/SWKey';

const sword = new SWMgr();

export type BibleTranslation = "KJV" | "ASV" | "WEB" | "YLT" | "BBE" | "DARBY";

interface VerseResponse {
    book: string;
    bookName: string;
    chapter: number;
    verse: number;
    text: string;
    translation: BibleTranslation;
    testament: string;
    copyright?: string;
}

/**
 * Fetch verse using SWORD Engine pattern
 */
export async function fetchVerseFromAPI(
    book: string,
    chapter: number,
    verse: number,
    translation: BibleTranslation
): Promise<VerseResponse | null> {
    const module = sword.getModule(translation);
    if (!module) return null;

    const key = new VerseKey();
    key.setBook(book);
    key.setChapter(chapter);
    key.setVerse(verse);

    module.setKey(key);
    const text = await module.renderText();

    return {
        book,
        bookName: book, // Note: Module could provide this later
        chapter,
        verse,
        text,
        translation,
        testament: "Old", // Mocked for now, module could provide
    };
}

/**
 * Fetch multiple verses at once (batch)
 */
export async function fetchVersesBatch(
    verses: Array<{ book: string; chapter: number; verse: number }>,
    translation: BibleTranslation
): Promise<VerseResponse[]> {
    const promises = verses.map((v) =>
        fetchVerseFromAPI(v.book, v.chapter, v.verse, translation)
    );
    const results = await Promise.all(promises);
    return results.filter((v): v is VerseResponse => v !== null);
}

/**
 * Fetch entire chapter using SWORD Engine pattern
 */
export async function fetchChapter(
    book: string,
    chapter: number,
    translation: BibleTranslation
): Promise<VerseResponse[]> {
    const module = sword.getModule(translation);
    if (!module) return [];

    const key = new VerseKey();
    key.setBook(book);
    key.setChapter(chapter);

    // In SWORD, we'd navigate and pull, but for web-api drivers we can still batch or use specific chapter methods
    // For now, maintain simple loop for consistency with legacy
    const verses: VerseResponse[] = [];
    for (let i = 1; i <= 100; i++) { // Max safety cap
        key.setVerse(i);
        module.setKey(key);
        const text = await module.renderText();
        if (text.includes("Scripture unavailable") || text.includes("not found")) break;

        verses.push({
            book,
            bookName: book,
            chapter,
            verse: i,
            text,
            translation,
            testament: "Unknown",
        });
    }

    return verses;
}

/**
 * Main function: Get verse with caching logic
 */
export async function getVerse(
    book: string,
    chapter: number,
    verse: number,
    translation: BibleTranslation = "KJV"
): Promise<VerseResponse | null> {
    // Note: Caching logic can be integrated into SWMgr or local drivers in the future
    return fetchVerseFromAPI(book, chapter, verse, translation);
}
