import { SWModule } from './SWModule';
import { LocalKjvModule, WldehBibleModule } from './BibleModules';

/**
 * High level factory to access all installed modules.
 */
export class SWMgr {
    public Modules: Map<string, SWModule> = new Map();

    constructor() {
        this.initializeDefaultModules();
    }

    private initializeDefaultModules(): void {
        // Register standard Bible versions
        this.addModule(new LocalKjvModule());
        this.addModule(new WldehBibleModule("ASV", "American Standard Version", "en-asv"));
        this.addModule(new WldehBibleModule("WEB", "World English Bible", "en-web"));
        this.addModule(new WldehBibleModule("YLT", "Young's Literal Translation", "en-ylt"));
        this.addModule(new WldehBibleModule("BBE", "Bible in Basic English", "en-bbe"));
        this.addModule(new WldehBibleModule("DARBY", "Darby Translation", "en-darby"));
    }

    public addModule(module: SWModule): void {
        this.Modules.set(module.getName(), module);
    }

    public getModule(name: string): SWModule | null {
        return this.Modules.get(name) || null;
    }

    public getModulesByType(type: string): SWModule[] {
        return Array.from(this.Modules.values()).filter(mod => mod.getType() === type);
    }
}
