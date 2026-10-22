import fs from 'fs';
import path from 'path';
import { getAllPlaces } from './geocoding-data';

export type LonLat = [number, number];

export interface BibleRoute {
  id: string;
  slug: string;
  title: string;
  narrativeGroup: string | null;
  era: string;
  legs: LonLat[][];
  pointCount: number;
  bbox: [number, number, number, number];
}

export interface NearbyRoutePlace {
  slug: string;
  name: string;
  distanceKm: number;
}

export const ERA_LABELS: Record<string, string> = {
  patriarchs: 'The Patriarchs',
  exodus: 'The Exodus',
  conquest: 'Conquest of Canaan',
  judges: 'Judges & the United Monarchy',
  kingdom: 'The Divided Kingdom & Exile',
  gospels: 'The Gospels',
  'acts-paul': "Acts & Paul's Journeys",
};

export const ERA_ORDER = ['patriarchs', 'exodus', 'conquest', 'judges', 'kingdom', 'gospels', 'acts-paul'];

export const ERA_COLORS: Record<string, { color: string; dashed?: boolean }> = {
  patriarchs: { color: '#7c5cbf' },
  exodus: { color: '#c97d1a' },
  conquest: { color: '#2f855a' },
  judges: { color: '#8a6d3b' },
  kingdom: { color: '#2b6cb0' },
  gospels: { color: '#b5384a' },
  'acts-paul': { color: '#1f7a8c', dashed: true },
};

/**
 * narrativeGroup (preferred) or title (for the ~10 routes with no metadata.csv
 * group) -> the book(s) of the Bible that actually narrate that story.
 *
 * This is a factual classification of named biblical events to the book that
 * records them (e.g. "Esther" / "Royal Road" is narrated in the Book of
 * Esther; "Paul's Third Missionary Journey" is narrated in Acts) — not a
 * geographic guess. A proximity-based alternative (matching route coordinates
 * to nearby geocoded places and their book lists) was tried first and
 * rejected: major hub places like "Chaldea" are cross-referenced in a dozen
 * unrelated books, which made ~90% of routes "match" Genesis, Matthew, and
 * Acts regardless of actual content.
 *
 * Keys are lowercased/trimmed narrativeGroup text from data/bible-routes/routes.json
 * (see scripts/parse-bible-routes.ts for how narrativeGroup itself was matched
 * against data/bible-routes/raw/metadata.csv). Multi-book entries reflect
 * genuine synoptic overlap (the same event narrated in more than one Gospel).
 */
const BOOK_BY_NARRATIVE: Record<string, string[]> = {
  // Patriarchs (Genesis)
  'abram in the land': ['genesis'],
  'the separation of abram and lot': ['genesis'],
  'the campaigns of the kings of the north': ['genesis'],
  'the destruction of sodom and gomorrah, and the cities of the plain': ['genesis'],
  'abraham goes to mount moriah to sacrifice his son isaac': ['genesis'],
  "jacob's journeys from beersheba to haran and back to the land": ['genesis'],
  'rebecca at the well': ['genesis'],
  'joseph and his brothers': ['genesis'],
  'jacob prepares a present for joseph': ['genesis'],
  'jacob buried in the promised land': ['genesis'],
  'israelites live in the land of goshen': ['genesis'],
  "jesus meets samaritan woman at jacob's well": ['john'],

  // Exodus & Numbers
  'moses at the burning bush': ['exodus'],
  'the exodus route': ['exodus'],
  'the second part of the exodus route and the twelve spies searching out the land': ['numbers'],
  '38 years wandering': ['numbers'],
  'balaam the false prophet and view from mount nebo': ['numbers'],

  // Conquest (Joshua)
  'crossing the jordan': ['joshua'],
  'the conquest of jericho': ['joshua'],
  'the conquest of ai': ['joshua'],
  'blessings and curses pronounced respectively on mount gerizim and mount ebal.': ['joshua'],
  "joshua's conquest": ['joshua'],
  'israelitas go the gibeonites': ['joshua'],

  // Judges & early monarchy
  'the judges': ['judges'],
  'ehud': ['judges'],
  'deborah and barak': ['judges'],
  'gideon': ['judges'],
  'jephthah': ['judges'],
  'samson': ['judges'],
  'the tabernacle and the ark of the covenant': ['1-samuel'],
  "saul's battles": ['1-samuel'],
  "saul's donkey": ['1-samuel'],
  'david and goliath': ['1-samuel'],
  'keeping the feast of tabernacles (shelters)': ['john'],
  'saul on the road to damascus': ['acts'],

  // Gospels (and a few OT stories the UBS set groups with them)
  'bethlehem and moab': ['ruth'],
  'mary visits elizabeth': ['luke'],
  'birth of jesus in bethlehem': ['luke', 'matthew'],
  'jonah': ['jonah'],
  'escape to egypt': ['matthew'],
  'living in nazareth': ['matthew'],
  'preaching of john the baptist': ['john'],
  'herod antipas imprisons john the baptist': ['matthew', 'mark'],
  'first miracle in cana': ['john'],
  'rejection in nazareth': ['luke'],
  'second miracle in cana': ['john'],
  'jesus makes his home in capernaum': ['matthew'],
  'fishermen called to be disciples': ['luke'],
  'preaching in the synagogues of galilee.': ['mark'],
  'nain': ['luke'],
  'sign of jonah, a storm on the sea of galilee, and visits to tyre and the cities of the decapolis': ['matthew', 'mark'],
  'the transfiguration': ['matthew', 'mark', 'luke'],
  'feast of dedication': ['john'],
  'raising of lazarus': ['john'],
  'jesus went to a city called ephraim': ['john'],
  'last journey to jerusalem': ['luke'],
  'the road to emmaus': ['luke'],
  'the ascension in bethany': ['luke', 'acts'],

  // Kingdom era
  "david's wanderings in the desert": ['1-samuel'],
  "david's kingdom": ['2-samuel'],
  'david': ['2-samuel'],
  "solomon's jerusalem": ['1-kings'],
  "solomon's temple": ['1-kings'],
  'route 100': ['1-kings'],
  "solomon's trade routes": ['1-kings'],
  'what the queen of sheba saw.': ['1-kings'],
  'the divided kingdom': ['1-kings'],
  'jeroboam': ['1-kings'],
  'campaigns of shishak': ['1-kings'],
  'campaign of benhadad': ['1-kings'],
  'campaign of zerah the ethiopian': ['2-chronicles'],
  'ministry of elijah': ['1-kings'],
  'the siege of samaria': ['1-kings'],
  'ahab': ['1-kings'],
  'wars with syria': ['1-kings'],
  'ministry of elijah (contd)': ['1-kings'],
  'ministry of elisha': ['2-kings'],
  'moabite revolt': ['2-kings'],
  'wars between israel, syria and judah': ['2-kings'],
  'jehu': ['2-kings'],
  'the assyrian empire': ['2-kings'],
  'samaritans': ['2-kings'],
  'hezekiah': ['2-kings'],
  'jehoiakim': ['2-kings'],
  'josiah': ['2-kings'],
  'zedekiah': ['2-kings'],
  'return of jews from exile': ['ezra'],
  'babylonian exile': ['jeremiah'],
  'esther': ['esther'],
  'philip in samaria and simon the sorcerer': ['acts'],

  // Acts & Paul's journeys
  'philip and the ethiopian eunuch': ['acts'],
  "paul's journey to tarsus and antioch and return to jerusalem": ['acts'],
  'paul to tarsus': ['acts'],
  'peter in the coastal plain': ['acts'],
  'first missionary journey': ['acts'],
  "paul's first missionary journey": ['acts'],
  'thessalonians': ['acts'],
  "paul's third missionary journey": ['acts'],
  "paul's voyage to rome": ['acts'],
};

function normalizeNarrative(s: string): string {
  return s.trim().toLowerCase();
}

let _routes: BibleRoute[] | null = null;
let _routesIndex: Map<string, number> | null = null;
let _routesByBook: Map<string, string[]> | null = null;
let _nearbyPlacesByRoute: Map<string, NearbyRoutePlace[]> | null = null;

function loadRoutes(): BibleRoute[] {
  if (!_routes) {
    const filePath = path.join(process.cwd(), 'data', 'bible-routes', 'routes.json');
    const routes: BibleRoute[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    _routes = routes;
    _routesIndex = new Map(routes.map((r, i) => [r.slug, i]));
  }
  return _routes;
}

export function getAllRoutes(): BibleRoute[] {
  return loadRoutes();
}

export function getAllRouteSlugs(): string[] {
  return loadRoutes().map(r => r.slug);
}

export function getRouteBySlug(slug: string): BibleRoute | null {
  loadRoutes();
  const i = _routesIndex?.get(slug);
  if (i === undefined) return null;
  return _routes?.[i] || null;
}

export function getRoutesByEra(era: string): BibleRoute[] {
  return loadRoutes().filter(r => r.era === era);
}

/** Real book(s) that narrate this route's story, per BOOK_BY_NARRATIVE — [] if unmapped. */
export function getBooksForRoute(route: BibleRoute): string[] {
  const key = normalizeNarrative(route.narrativeGroup || route.title);
  return BOOK_BY_NARRATIVE[key] || [];
}

function buildRoutesByBookIndex(): Map<string, string[]> {
  const index = new Map<string, string[]>();
  for (const route of loadRoutes()) {
    for (const book of getBooksForRoute(route)) {
      const existing = index.get(book);
      if (existing) existing.push(route.slug);
      else index.set(book, [route.slug]);
    }
  }
  return index;
}

/** Routes whose narrative is actually narrated in the given book — see BOOK_BY_NARRATIVE. */
export function getRoutesForBook(bookSlug: string): BibleRoute[] {
  if (!_routesByBook) _routesByBook = buildRoutesByBookIndex();
  const slugs = _routesByBook.get(bookSlug) || [];
  return slugs.map(s => getRouteBySlug(s)).filter((r): r is BibleRoute => r !== null);
}

const HAVERSINE_R_KM = 6371;
function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return HAVERSINE_R_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Downsample leg points before the proximity scan — a stride of 4 still catches
// any place within PROXIMITY_KM of the route's actual drawn shape.
function sampledRoutePoints(route: BibleRoute): LonLat[] {
  const pts: LonLat[] = [];
  for (const leg of route.legs) {
    for (let i = 0; i < leg.length; i += 4) pts.push(leg[i]);
    const last = leg[leg.length - 1];
    if (last) pts.push(last);
  }
  return pts;
}

const PROXIMITY_KM = 10;
const MAX_NEARBY_PLACES = 8;

function buildNearbyPlacesIndex(): Map<string, NearbyRoutePlace[]> {
  const places = getAllPlaces().filter(
    (p): p is typeof p & { lat: number; lon: number } => p.lat !== null && p.lon !== null
  );
  const result = new Map<string, NearbyRoutePlace[]>();

  for (const route of loadRoutes()) {
    const points = sampledRoutePoints(route);
    const [minLon, minLat, maxLon, maxLat] = route.bbox;
    const nearby = new Map<string, NearbyRoutePlace>();

    for (const place of places) {
      // Cheap bbox prefilter (~0.3deg margin) before any haversine calls.
      if (place.lat < minLat - 0.3 || place.lat > maxLat + 0.3 || place.lon < minLon - 0.3 || place.lon > maxLon + 0.3) {
        continue;
      }
      let best = Infinity;
      for (const [lon, lat] of points) {
        const d = haversineKm(lat, lon, place.lat, place.lon);
        if (d < best) best = d;
        if (best < PROXIMITY_KM) break;
      }
      if (best <= PROXIMITY_KM) {
        const existing = nearby.get(place.slug);
        if (!existing || best < existing.distanceKm) {
          nearby.set(place.slug, { slug: place.slug, name: place.name, distanceKm: best });
        }
      }
    }

    result.set(
      route.slug,
      Array.from(nearby.values()).sort((a, b) => a.distanceKm - b.distanceKm).slice(0, MAX_NEARBY_PLACES)
    );
  }
  return result;
}

/** Geocoded places within ~10km of this route's path, closest first — for display on the route page, not book association. */
export function getNearbyPlacesForRoute(slug: string): NearbyRoutePlace[] {
  if (!_nearbyPlacesByRoute) _nearbyPlacesByRoute = buildNearbyPlacesIndex();
  return _nearbyPlacesByRoute.get(slug) || [];
}

export function getRouteStats() {
  const routes = loadRoutes();
  const byEra: Record<string, number> = {};
  for (const r of routes) byEra[r.era] = (byEra[r.era] || 0) + 1;
  return {
    totalRoutes: routes.length,
    totalPoints: routes.reduce((sum, r) => sum + r.pointCount, 0),
    byEra,
  };
}
