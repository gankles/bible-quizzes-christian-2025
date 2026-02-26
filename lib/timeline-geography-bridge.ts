import { getKjvStudyTimeline, TimelineEra, TimelineEvent } from './timeline-data';
import { getPlacesForChapter, GeocodingPlace } from './geocoding-data';

interface EraGeography {
  eraName: string;
  eraSlug: string;
  places: { slug: string; name: string; lat: number | null; lon: number | null; type: string }[];
  events: { title: string; date: string; places: string[]; scriptureRefs: string[] }[];
}

let _cache: Map<string, EraGeography> | null = null;

function slugifyEra(name: string): string {
  return name
    .replace(/\(.*?\)/g, '') // Remove parenthetical date ranges
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Convert "Genesis 12:1" → { bookSlug: "genesis", chapter: 12 }
function parseScriptureRef(ref: string): { bookSlug: string; chapter: number } | null {
  const match = ref.match(/^(\d?\s*[A-Za-z]+)\s+(\d+)/);
  if (!match) return null;
  const bookSlug = match[1].trim().toLowerCase().replace(/\s+/g, '-');
  const chapter = parseInt(match[2], 10);
  return { bookSlug, chapter };
}

function buildBridge(): void {
  if (_cache) return;
  _cache = new Map();

  const { eras } = getKjvStudyTimeline();

  for (const era of eras) {
    const eraSlug = slugifyEra(era.name);
    const placesMap = new Map<string, GeocodingPlace>();
    const eventEntries: EraGeography['events'] = [];

    for (const event of era.events) {
      const eventPlaces: string[] = [];

      for (const ref of event.scriptureRefs) {
        const parsed = parseScriptureRef(ref);
        if (!parsed) continue;

        const chapterPlaces = getPlacesForChapter(parsed.bookSlug, parsed.chapter);
        for (const place of chapterPlaces) {
          if (!placesMap.has(place.slug)) {
            placesMap.set(place.slug, place);
          }
          if (!eventPlaces.includes(place.name)) {
            eventPlaces.push(place.name);
          }
        }
      }

      eventEntries.push({
        title: event.title,
        date: event.date,
        places: eventPlaces,
        scriptureRefs: event.scriptureRefs,
      });
    }

    if (placesMap.size > 0) {
      _cache.set(eraSlug, {
        eraName: era.name,
        eraSlug,
        places: Array.from(placesMap.values()).map(p => ({
          slug: p.slug,
          name: p.name,
          lat: p.lat,
          lon: p.lon,
          type: p.type,
        })),
        events: eventEntries,
      });
    }
  }
}

export function getGeographyForEra(eraSlug: string): EraGeography | null {
  buildBridge();
  return _cache!.get(eraSlug) || null;
}

export function getAllEraGeographySlugs(): string[] {
  buildBridge();
  return Array.from(_cache!.keys());
}

export function getAllEraGeographies(): EraGeography[] {
  buildBridge();
  return Array.from(_cache!.values());
}

export function getTimelineGeographyStats(): {
  totalEras: number;
  totalPlaces: number;
  totalEvents: number;
} {
  buildBridge();
  const allPlaces = new Set<string>();
  let totalEvents = 0;
  for (const era of _cache!.values()) {
    for (const p of era.places) allPlaces.add(p.slug);
    totalEvents += era.events.length;
  }
  return {
    totalEras: _cache!.size,
    totalPlaces: allPlaces.size,
    totalEvents,
  };
}
