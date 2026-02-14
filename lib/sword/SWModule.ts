import { SWKey, VerseKey } from './SWKey';

/**
 * The most important core object in the API. 
 * Provides an interface for retrieving indexed scriptural data.
 */
export abstract class SWModule {
    protected name: string;
    protected description: string;
    protected key: SWKey;
    protected moduleType: string;

    constructor(name: string, description: string, type: string) {
        this.name = name;
        this.description = description;
        this.moduleType = type;
        this.key = this.createKey();
    }

    public abstract createKey(): SWKey;

    public setKey(k: string | SWKey): void {
        if (typeof k === 'string') {
            this.key.setText(k);
            if (this.key instanceof VerseKey) {
                this.key.parse(k);
            }
        } else {
            this.key = k.copy();
        }
    }

    public getKey(): SWKey {
        return this.key;
    }

    public getKeyText(): string {
        return this.key.getText();
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getType(): string {
        return this.moduleType;
    }

    /**
     * Retrieve the text at the current key position.
     */
    public abstract renderText(): Promise<string>;
}

/**
 * Specialized module type for Bible texts.
 */
export abstract class SWText extends SWModule {
    constructor(name: string, description: string) {
        super(name, description, "Biblical Texts");
    }

    public createKey(): VerseKey {
        return new VerseKey();
    }
}

/**
 * Specialized module type for Commentaries.
 */
export abstract class SWCom extends SWModule {
    constructor(name: string, description: string) {
        super(name, description, "Commentaries");
    }

    public createKey(): VerseKey {
        return new VerseKey();
    }
}

/**
 * Specialized module type for Lexicons and Dictionaries.
 */
export abstract class SWLD extends SWModule {
    constructor(name: string, description: string) {
        super(name, description, "Lexicons / Dictionaries");
    }

    public createKey(): SWKey {
        return new VerseKey(); // Lexicons might use different keys later
    }
}
