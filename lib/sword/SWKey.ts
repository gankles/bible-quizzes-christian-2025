/**
 * Base class for all keys into SWModule objects.
 */
export abstract class SWKey {
    protected text: string = "";

    constructor(text: string = "") {
        this.setText(text);
    }

    public setText(text: string): void {
        this.text = text;
    }

    public getText(): string {
        return this.text;
    }

    public abstract copy(): SWKey;

    public toString(): string {
        return this.getText();
    }
}

/**
 * A specialized key that understands Bible books, chapters, and verses.
 */
export class VerseKey extends SWKey {
    private book: string = "";
    private chapter: number = 1;
    private verse: number = 1;

    constructor(text: string = "") {
        super(text);
        if (text) {
            this.parse(text);
        }
    }

    public parse(text: string): void {
        this.text = text;
        // Simple regex-based parser for "Book Chapter:Verse" or "Book Chapter-Verse"
        const regex = /^(.+?)\s+(\d+)(?:[:\-](\d+))?$/i;
        const match = text.match(regex);

        if (match) {
            this.book = match[1].trim();
            this.chapter = parseInt(match[2], 10);
            this.verse = match[3] ? parseInt(match[3], 10) : 1;
        } else {
            // Fallback for just "Book" or "Book Chapter"
            const simpleMatch = text.match(/^(.+?)\s*(\d+)?$/i);
            if (simpleMatch) {
                this.book = simpleMatch[1].trim();
                this.chapter = simpleMatch[2] ? parseInt(simpleMatch[2], 10) : 1;
                this.verse = 1;
            }
        }
    }

    public getBook(): string { return this.book; }
    public getChapter(): number { return this.chapter; }
    public getVerse(): number { return this.verse; }

    public setBook(book: string): void { this.book = book; this.updateText(); }
    public setChapter(chapter: number): void { this.chapter = chapter; this.updateText(); }
    public setVerse(verse: number): void { this.verse = verse; this.updateText(); }

    private updateText(): void {
        this.text = `${this.book} ${this.chapter}:${this.verse}`;
    }

    public copy(): VerseKey {
        const k = new VerseKey();
        k.book = this.book;
        k.chapter = this.chapter;
        k.verse = this.verse;
        k.text = this.text;
        return k;
    }

    public increment(): void {
        this.verse++;
        this.updateText();
    }

    public decrement(): void {
        if (this.verse > 1) {
            this.verse--;
            this.updateText();
        }
    }
}
