import fs from 'fs';
import path from 'path';

// ── Types ──────────────────────────────────────────────────────────

export interface ResourceVerse {
  reference: string;
  text: string;
}

export interface ResourceEntry {
  title: string;
  description: string;
  verses: ResourceVerse[];
}

export interface ResourceCategory {
  name: string;
  entries: { key: string; data: ResourceEntry }[];
}

export interface Resource {
  title: string;
  slug: string;
  subtitle?: string;
  introduction?: string;
  categories: ResourceCategory[];
  totalEntries: number;
  totalVerses: number;
}

export interface ResourcesStats {
  totalResources: number;
  totalCategories: number;
  totalEntries: number;
  totalVerses: number;
}

// ── Helpers ────────────────────────────────────────────────────────

const RESOURCES_DIR = path.join(process.cwd(), 'data', 'kjvstudy', 'resources');

const SPECIAL_TITLES: Record<string, string> = {
  i_am_statements: 'I AM Statements of Jesus',
  names_of_christ: 'Names of Christ',
  armor_of_god: 'Armor of God',
  fruits: 'Fruit of the Spirit',
  ten_commandments: 'Ten Commandments',
  types_and_shadows: 'Types and Shadows',
  spirits_and_demons: 'Spirits and Demons',
  law_and_gospel: 'Law and Gospel',
  kingdom_of_god: 'Kingdom of God',
  blood_in_scripture: 'Blood in Scripture',
  biblical_locations: 'Biblical Locations',
  theology_proper: 'Theology Proper',
  messianic_prophecies: 'Messianic Prophecies',
  names: 'Names of God',
};

function fileToTitle(filename: string): string {
  const name = filename.replace('.json', '');
  if (SPECIAL_TITLES[name]) return SPECIAL_TITLES[name];
  return name
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function fileToSlug(filename: string): string {
  return filename.replace('.json', '').replace(/_/g, '-');
}

function isResourceEntry(obj: unknown): boolean {
  if (!obj || typeof obj !== 'object') return false;
  const o = obj as Record<string, unknown>;
  // Some entries have title + description + verses; others have only
  // description + verses (e.g., biblical_locations). Both are valid.
  return typeof o.description === 'string' && Array.isArray(o.verses);
}

function toResourceEntry(key: string, obj: Record<string, unknown>): ResourceEntry {
  return {
    title: typeof obj.title === 'string' ? obj.title : key,
    description: obj.description as string,
    verses: obj.verses as ResourceVerse[],
  };
}

// ── Cache ──────────────────────────────────────────────────────────

let cachedResources: Resource[] | null = null;

function loadResources(): Resource[] {
  if (cachedResources) return cachedResources;

  const files = fs
    .readdirSync(RESOURCES_DIR)
    .filter((f) => f.endsWith('.json'))
    .sort();

  const resources: Resource[] = [];

  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(RESOURCES_DIR, file), 'utf-8');
      const json = JSON.parse(raw);
      const topKey = Object.keys(json)[0];
      const topData = json[topKey];

      const slug = fileToSlug(file);
      let title = fileToTitle(file);
      let subtitle: string | undefined;
      let introduction: string | undefined;

      // Determine the categories object. Some files have an extended format
      // with { title, subtitle, introduction, categories: { ... } }, while
      // others go directly to { category: { entry: { ... } } }.
      let categoriesObj: Record<string, Record<string, unknown>>;

      if (
        topData.categories &&
        typeof topData.categories === 'object' &&
        typeof topData.title === 'string'
      ) {
        // Extended format
        title = topData.title || title;
        subtitle = topData.subtitle;
        introduction = topData.introduction;
        categoriesObj = topData.categories;
      } else {
        // Simple format: topData IS the categories object
        categoriesObj = topData;
      }

      const categories: ResourceCategory[] = [];
      let totalEntries = 0;
      let totalVerses = 0;

      for (const [catName, catData] of Object.entries(categoriesObj)) {
        if (typeof catData !== 'object' || catData === null) continue;

        const entries: { key: string; data: ResourceEntry }[] = [];

        for (const [entryKey, entryData] of Object.entries(
          catData as Record<string, unknown>
        )) {
          if (isResourceEntry(entryData)) {
            const entry = toResourceEntry(entryKey, entryData as Record<string, unknown>);
            entries.push({ key: entryKey, data: entry });
            totalEntries++;
            totalVerses += entry.verses.length;
          }
        }

        if (entries.length > 0) {
          categories.push({ name: catName, entries });
        }
      }

      resources.push({
        title,
        slug,
        subtitle,
        introduction,
        categories,
        totalEntries,
        totalVerses,
      });
    } catch (err) {
      console.error(`Failed to parse resource file ${file}:`, err);
    }
  }

  resources.sort((a, b) => a.title.localeCompare(b.title));
  cachedResources = resources;
  return resources;
}

// ── Public API ─────────────────────────────────────────────────────

export function getAllResources(): Resource[] {
  return loadResources();
}

export function getResourceBySlug(slug: string): Resource | undefined {
  return loadResources().find((r) => r.slug === slug);
}

export function getResourcesStats(): ResourcesStats {
  const resources = loadResources();
  return {
    totalResources: resources.length,
    totalCategories: resources.reduce((sum, r) => sum + r.categories.length, 0),
    totalEntries: resources.reduce((sum, r) => sum + r.totalEntries, 0),
    totalVerses: resources.reduce((sum, r) => sum + r.totalVerses, 0),
  };
}

function titleToItemSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getResourceItem(
  resourceSlug: string,
  itemSlug: string
): { resource: Resource; category: string; item: ResourceEntry; categoryEntries: ResourceEntry[] } | undefined {
  const resource = getResourceBySlug(resourceSlug);
  if (!resource) return undefined;

  for (const cat of resource.categories) {
    for (const entry of cat.entries) {
      if (titleToItemSlug(entry.data.title) === itemSlug) {
        return {
          resource,
          category: cat.name,
          item: entry.data,
          categoryEntries: cat.entries.map((e) => e.data),
        };
      }
    }
  }
  return undefined;
}

export function getAllResourceItemSlugs(): { resourceSlug: string; itemSlug: string }[] {
  const resources = loadResources();
  const slugs: { resourceSlug: string; itemSlug: string }[] = [];

  for (const resource of resources) {
    for (const cat of resource.categories) {
      for (const entry of cat.entries) {
        slugs.push({
          resourceSlug: resource.slug,
          itemSlug: titleToItemSlug(entry.data.title),
        });
      }
    }
  }
  return slugs;
}

export { titleToItemSlug };
