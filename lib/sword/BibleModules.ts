import { SWText } from './SWModule';
import { VerseKey } from './SWKey';
import { getBookBySlug } from '../bibleData';

/**
 * Driver for local KJV data.
 */
export class LocalKjvModule extends SWText {
    constructor() {
        super("KJV", "King James Version (Local)");
    }

    public async renderText(): Promise<string> {
        const key = this.key as VerseKey;
        try {
            const kjvModule = await import("@/data/kjv.json");
            const kjvData = kjvModule.default || kjvModule;
            const verseKey = `${key.getBook().toLowerCase()}-${key.getChapter()}-${key.getVerse()}`;
            const verses = kjvData.verses as Record<string, string>;
            return verses[verseKey] || "Verse not found (Local KJV)";
        } catch (error) {
            console.error("Error loading KJV data in SWORD driver:", error);
            return "Error loading scripture";
        }
    }
}

/**
 * Driver for wldeh/bible-api (Remote JSON).
 */
export class WldehBibleModule extends SWText {
    private versionId: string;

    constructor(name: string, description: string, versionId: string) {
        super(name, description);
        this.versionId = versionId;
    }

    public async renderText(): Promise<string> {
        const key = this.key as VerseKey;
        try {
            const url = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/${this.versionId}/books/${key.getBook().toLowerCase()}/chapters/${key.getChapter()}/verses/${key.getVerse()}.json`;
            const response = await fetch(url);

            if (!response.ok) {
                return `Scripture unavailable (${response.status})`;
            }

            const data = await response.json();
            return data.text || data.verse || "";
        } catch (error) {
            console.error(`Error fetching from SWORD Wldeh driver (${this.name}):`, error);
            return "Connection error";
        }
    }
}
