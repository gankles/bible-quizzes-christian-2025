/**
 * Parse UBS Bible Routes (raw GeoJSON, CC BY-SA 4.0 — see data/bible-routes/ATTRIBUTION.md)
 * into a single normalized data/bible-routes/routes.json.
 *
 * Source: data/bible-routes/raw/GeoJsonRoutes/*.geojson (179 files, vendored from
 * github.com/ubsicap/ubs-open-license). Each file is either a single Feature
 * (one LineString leg) or a FeatureCollection (multiple legs for the same journey).
 *
 * metadata.csv uses its own "narrative group" numbering (2-220, e.g. group 101 =
 * "Esther") that does NOT correspond to the geojson filename numbers (1-205) —
 * the two numbering systems are independent. We match routes to their narrative
 * group by normalizing and comparing the route title against metadata.csv's
 * image-filename column (169/179 match cleanly); that matched group title is the
 * most reliable signal for which era a route belongs to — more reliable than the
 * geojson id number alone, which can land in a numeric range that doesn't match
 * its actual content (e.g. geojson "154. Royal Road" sits in the 152-193 id range
 * that's mostly Gospel-era routes, but its real metadata.csv group is "Esther").
 * Era is therefore assigned by keyword match against the matched group title when
 * available, falling back to the route's own title, then to id-range as a last resort.
 *
 * Run: node node_modules/tsx/dist/cli.mjs scripts/parse-bible-routes.ts
 * (plain `npx tsx` is unreliable in this environment — an npx/rtk shell hook
 * intercepts it; calling the tsx CLI entry point directly sidesteps that.)
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const RAW_DIR = path.join(ROOT, 'data', 'bible-routes', 'raw', 'GeoJsonRoutes');
const METADATA_CSV = path.join(ROOT, 'data', 'bible-routes', 'raw', 'metadata.csv');
const OUT_PATH = path.join(ROOT, 'data', 'bible-routes', 'routes.json');

type LonLat = [number, number];

interface BibleRoute {
  id: string;
  slug: string;
  title: string;
  narrativeGroup: string | null; // real group title from metadata.csv, when matched
  era: string;
  legs: LonLat[][];
  pointCount: number;
  bbox: [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]
}

// Fallback only, for the ~10 routes with no metadata.csv match and no keyword hit.
const ERA_ID_RANGES: { max: number; era: string }[] = [
  { max: 37, era: 'patriarchs' },
  { max: 50, era: 'exodus' },
  { max: 66, era: 'conquest' },
  { max: 98, era: 'judges' },
  { max: 151, era: 'kingdom' },
  { max: 193, era: 'gospels' },
  { max: Infinity, era: 'acts-paul' },
];

function eraFromIdRange(numericId: number): string {
  for (const r of ERA_ID_RANGES) {
    if (numericId <= r.max) return r.era;
  }
  return 'acts-paul';
}

// Keyword -> era, checked against the real narrativeGroup title (preferred) or
// the route's own title (fallback). Keywords are drawn from the actual
// metadata.csv group titles observed in this dataset, not guessed.
const ERA_KEYWORDS: { era: string; words: string[] }[] = [
  {
    era: 'patriarchs',
    words: [
      'abram', 'abraham', 'isaac', 'jacob', 'joseph', 'rebecca', 'sodom',
      'moriah', 'haran', 'esau', 'laban', 'lot ', 'melchizedek',
    ],
  },
  {
    era: 'exodus',
    words: [
      'moses', 'exodus route', 'burning bush', 'slavery in egypt',
      'priestly blessing', 'twelve spies', 'balaam',
    ],
  },
  {
    era: 'conquest',
    words: [
      'jordan', 'jericho', ' ai', 'gerizim', 'ebal', 'conquest',
      'division of the land',
    ],
  },
  {
    era: 'judges',
    words: [
      'judges', 'ehud', 'deborah', 'barak', 'gideon', 'jephthah', 'samson',
      'ruth', 'saul', 'david and goliath', "david's wandering", 'tabernacle',
      'ark of the covenant', 'hannah', 'michmash',
    ],
  },
  {
    era: 'kingdom',
    words: [
      'david', 'solomon', 'rehoboam', 'jeroboam', 'shishak', 'zerah',
      'baasha', 'asa ', 'benhadad', 'elijah', 'elisha', 'samaria', 'ahab',
      'syria', 'jehu', 'assyria', 'samaritan', 'hezekiah', 'josiah',
      'jehoiakim', 'zedekiah', 'exile', 'persian empire', 'nehemiah',
      'return of jews', 'esther', 'sennacherib', 'nebuchadnezzar',
      'babylon', 'amaziah', 'uzziah', 'tiglath',
    ],
  },
  {
    era: 'gospels',
    words: [
      'mary', 'jesus', 'bethlehem', 'nazareth', 'john the baptist', 'cana',
      'capernaum', 'galilee', 'golgotha', 'emmaus', 'ascension', 'herod',
      'lazarus', 'samaritan woman', 'transfiguration', 'triumphal entry',
      'temple', 'annas', 'bethsaida', 'caesarea philippi', 'tyre', 'jonah',
    ],
  },
  {
    era: 'acts-paul',
    words: [
      'pentecost', 'acts', 'philip', 'paul', 'damascus', 'missionary journey',
      'rome', 'tarsus', 'antioch', 'peter in the coastal plain', 'ethiopian eunuch',
    ],
  },
];

function eraFromKeywords(text: string): string | null {
  const lower = text.toLowerCase();
  for (const { era, words } of ERA_KEYWORDS) {
    if (words.some(w => lower.includes(w))) return era;
  }
  return null;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeForMatch(s: string): string {
  return s
    .replace(/^\d+[a-z]?\.?\s*/i, '') // strip leading "042. " / "112." number prefix
    .replace(/\.(jpg|geojson)$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

// metadata.csv has no header: groupNum, groupTitle, subNum, imageFilename
// Returns two maps:
//  - byGroupNum: groupNum -> groupTitle (for the untitled-filename fallback)
//  - byImageTitle: normalized image-filename text -> groupTitle (for era matching)
function loadMetadata(): { byGroupNum: Map<string, string>; byImageTitle: Map<string, string> } {
  const byGroupNum = new Map<string, string>();
  const byImageTitle = new Map<string, string>();
  if (!fs.existsSync(METADATA_CSV)) return { byGroupNum, byImageTitle };
  const lines = fs.readFileSync(METADATA_CSV, 'utf-8').split('\n');
  for (const line of lines) {
    if (!line.trim()) continue;
    const cols = line.split('\t');
    if (cols.length < 4) continue;
    const groupNum = cols[0].trim();
    const groupTitle = cols[1].trim();
    const imageFilename = cols[3].trim();
    if (groupNum && groupTitle && !byGroupNum.has(groupNum)) {
      byGroupNum.set(groupNum, groupTitle);
    }
    if (imageFilename && groupTitle) {
      byImageTitle.set(normalizeForMatch(imageFilename), groupTitle);
    }
  }
  return { byGroupNum, byImageTitle };
}

function parseFilename(filename: string): { id: string; title: string } {
  const base = filename.replace(/\.geojson$/, '');
  // "001. Abram's Journey to Haran" / "112.Zerah the Ethiopian" / "100" (no title)
  const match = base.match(/^(\d+[a-z]?)\.?\s*(.*)$/i);
  if (!match) return { id: base, title: base };
  const id = match[1];
  const title = match[2].trim();
  return { id, title };
}

function extractLegs(geojson: any): LonLat[][] {
  const legs: LonLat[][] = [];
  const features =
    geojson.type === 'FeatureCollection' ? geojson.features : [geojson];
  for (const f of features) {
    if (f?.geometry?.type === 'LineString') {
      legs.push(f.geometry.coordinates as LonLat[]);
    } else if (f?.geometry?.type === 'MultiLineString') {
      for (const line of f.geometry.coordinates as LonLat[][]) {
        legs.push(line);
      }
    }
  }
  return legs;
}

function bboxOf(legs: LonLat[][]): [number, number, number, number] {
  let minLon = Infinity,
    minLat = Infinity,
    maxLon = -Infinity,
    maxLat = -Infinity;
  for (const leg of legs) {
    for (const [lon, lat] of leg) {
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }
  }
  return [minLon, minLat, maxLon, maxLat];
}

function main() {
  const { byGroupNum, byImageTitle } = loadMetadata();
  const files = fs.readdirSync(RAW_DIR).filter(f => f.endsWith('.geojson'));
  const routes: BibleRoute[] = [];
  const slugCounts = new Map<string, number>();
  let metadataMatches = 0;
  let keywordFallbacks = 0;
  let idRangeFallbacks = 0;

  for (const file of files.sort()) {
    const { id, title: filenameTitle } = parseFilename(file);
    const numericId = parseInt(id, 10);
    let title = filenameTitle;
    if (!title) {
      title = byGroupNum.get(id) || byGroupNum.get(String(numericId)) || `Route ${id}`;
    }

    const geojson = JSON.parse(fs.readFileSync(path.join(RAW_DIR, file), 'utf-8'));
    const legs = extractLegs(geojson);
    if (legs.length === 0) {
      console.warn(`No LineString geometry found in ${file}, skipping`);
      continue;
    }
    const pointCount = legs.reduce((sum, leg) => sum + leg.length, 0);

    const narrativeGroup = byImageTitle.get(normalizeForMatch(title)) || null;
    if (narrativeGroup) metadataMatches++;

    let era = narrativeGroup ? eraFromKeywords(narrativeGroup) : null;
    if (!era) {
      era = eraFromKeywords(title);
      if (era) keywordFallbacks++;
    } else {
      keywordFallbacks += 0; // matched via narrativeGroup, counted in metadataMatches
    }
    if (!era) {
      era = eraFromIdRange(numericId);
      idRangeFallbacks++;
    }

    let slug = slugify(`${title}`);
    const n = (slugCounts.get(slug) || 0) + 1;
    slugCounts.set(slug, n);
    if (n > 1) slug = `${slug}-${n}`;

    routes.push({
      id,
      slug,
      title,
      narrativeGroup,
      era,
      legs,
      pointCount,
      bbox: bboxOf(legs),
    });
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(routes, null, 1));

  const byEra: Record<string, number> = {};
  for (const r of routes) byEra[r.era] = (byEra[r.era] || 0) + 1;

  console.log(`Parsed ${routes.length} routes from ${files.length} source files`);
  console.log(`Matched to a real metadata.csv narrative group: ${metadataMatches}`);
  console.log(`Era via keyword fallback (no metadata match): ${keywordFallbacks}`);
  console.log(`Era via id-range last resort: ${idRangeFallbacks}`);
  console.log('By era:', byEra);
  console.log(`Wrote ${OUT_PATH}`);
}

main();
