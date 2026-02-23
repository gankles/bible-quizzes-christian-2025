/**
 * Bible Geocoding Data Ingestion Script
 *
 * Reads raw JSONL files from openbibleinfo/Bible-Geocoding-Data (already downloaded
 * to data/geocoding/raw/) and produces pre-processed JSON for the Next.js site.
 *
 * Usage:  npx tsx scripts/ingest-geocoding-data.ts
 */

import fs from 'fs';
import path from 'path';

// ─── OSIS book code → site slug mapping ────────────────────────────────────
const OSIS_TO_SLUG: Record<string, string> = {
  'Gen': 'genesis', 'Exod': 'exodus', 'Lev': 'leviticus', 'Num': 'numbers',
  'Deut': 'deuteronomy', 'Josh': 'joshua', 'Judg': 'judges', 'Ruth': 'ruth',
  '1Sam': '1-samuel', '2Sam': '2-samuel', '1Kgs': '1-kings', '2Kgs': '2-kings',
  '1Chr': '1-chronicles', '2Chr': '2-chronicles', 'Ezra': 'ezra', 'Neh': 'nehemiah',
  'Esth': 'esther', 'Job': 'job', 'Ps': 'psalms', 'Prov': 'proverbs',
  'Eccl': 'ecclesiastes', 'Song': 'song-of-solomon', 'Isa': 'isaiah',
  'Jer': 'jeremiah', 'Lam': 'lamentations', 'Ezek': 'ezekiel', 'Dan': 'daniel',
  'Hos': 'hosea', 'Joel': 'joel', 'Amos': 'amos', 'Obad': 'obadiah',
  'Jonah': 'jonah', 'Mic': 'micah', 'Nah': 'nahum', 'Hab': 'habakkuk',
  'Zeph': 'zephaniah', 'Hag': 'haggai', 'Zech': 'zechariah', 'Mal': 'malachi',
  'Matt': 'matthew', 'Mark': 'mark', 'Luke': 'luke', 'John': 'john',
  'Acts': 'acts', 'Rom': 'romans', '1Cor': '1-corinthians', '2Cor': '2-corinthians',
  'Gal': 'galatians', 'Eph': 'ephesians', 'Phil': 'philippians', 'Col': 'colossians',
  '1Thess': '1-thessalonians', '2Thess': '2-thessalonians', '1Tim': '1-timothy',
  '2Tim': '2-timothy', 'Titus': 'titus', 'Phlm': 'philemon', 'Heb': 'hebrews',
  'Jas': 'james', '1Pet': '1-peter', '2Pet': '2-peter', '1John': '1-john',
  '2John': '2-john', '3John': '3-john', 'Jude': 'jude', 'Rev': 'revelation',
};

// ─── Types ─────────────────────────────────────────────────────────────────

interface VerseRef {
  bookSlug: string;
  chapter: number;
  verse: number;
  ref: string;          // "genesis-14-18"
  readable: string;     // "Genesis 14:18"
  osis: string;         // "Gen.14.18"
}

interface GeocodingPlace {
  id: string;
  slug: string;
  name: string;
  type: string;
  types: string[];
  lat: number | null;
  lon: number | null;
  confidenceScore: number;
  verseCount: number;
  verses: VerseRef[];
  books: string[];
  wikipedia: string | null;
  wikidata: string | null;
  thumbnailFile: string | null;
  credit: string | null;
  creditUrl: string | null;
  description: string | null;
  modernName: string | null;
  placeholder: string | null;
}

interface NearbyEntry {
  slug: string;
  name: string;
  distanceKm: number;
}

interface ImageEntry {
  id: string;
  credit: string | null;
  creditUrl: string | null;
  license: string | null;
  description: string | null;
  file: string | null;
  placeholder: string | null;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

const SLUG_TO_NAME: Record<string, string> = {
  'genesis': 'Genesis', 'exodus': 'Exodus', 'leviticus': 'Leviticus',
  'numbers': 'Numbers', 'deuteronomy': 'Deuteronomy', 'joshua': 'Joshua',
  'judges': 'Judges', 'ruth': 'Ruth', '1-samuel': '1 Samuel', '2-samuel': '2 Samuel',
  '1-kings': '1 Kings', '2-kings': '2 Kings', '1-chronicles': '1 Chronicles',
  '2-chronicles': '2 Chronicles', 'ezra': 'Ezra', 'nehemiah': 'Nehemiah',
  'esther': 'Esther', 'job': 'Job', 'psalms': 'Psalms', 'proverbs': 'Proverbs',
  'ecclesiastes': 'Ecclesiastes', 'song-of-solomon': 'Song of Solomon',
  'isaiah': 'Isaiah', 'jeremiah': 'Jeremiah', 'lamentations': 'Lamentations',
  'ezekiel': 'Ezekiel', 'daniel': 'Daniel', 'hosea': 'Hosea', 'joel': 'Joel',
  'amos': 'Amos', 'obadiah': 'Obadiah', 'jonah': 'Jonah', 'micah': 'Micah',
  'nahum': 'Nahum', 'habakkuk': 'Habakkuk', 'zephaniah': 'Zephaniah',
  'haggai': 'Haggai', 'zechariah': 'Zechariah', 'malachi': 'Malachi',
  'matthew': 'Matthew', 'mark': 'Mark', 'luke': 'Luke', 'john': 'John',
  'acts': 'Acts', 'romans': 'Romans', '1-corinthians': '1 Corinthians',
  '2-corinthians': '2 Corinthians', 'galatians': 'Galatians', 'ephesians': 'Ephesians',
  'philippians': 'Philippians', 'colossians': 'Colossians',
  '1-thessalonians': '1 Thessalonians', '2-thessalonians': '2 Thessalonians',
  '1-timothy': '1 Timothy', '2-timothy': '2 Timothy', 'titus': 'Titus',
  'philemon': 'Philemon', 'hebrews': 'Hebrews', 'james': 'James',
  '1-peter': '1 Peter', '2-peter': '2 Peter', '1-john': '1 John',
  '2-john': '2 John', '3-john': '3 John', 'jude': 'Jude', 'revelation': 'Revelation',
};

function parseOsis(osis: string): VerseRef | null {
  // Format: "Gen.14.18" or "2Kgs.5.12"
  const m = osis.match(/^(\d?\w+)\.(\d+)\.(\d+)$/);
  if (!m) return null;
  const bookCode = m[1];
  const chapter = parseInt(m[2], 10);
  const verse = parseInt(m[3], 10);
  const bookSlug = OSIS_TO_SLUG[bookCode];
  if (!bookSlug) return null;
  const bookName = SLUG_TO_NAME[bookSlug] || bookSlug;
  return {
    bookSlug,
    chapter,
    verse,
    ref: `${bookSlug}-${chapter}-${verse}`,
    readable: `${bookName} ${chapter}:${verse}`,
    osis,
  };
}

function stripXmlTags(text: string): string {
  return text.replace(/<[^>]+>/g, '').trim();
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function readJsonl<T>(filePath: string): T[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content
    .split('\n')
    .filter(line => line.trim())
    .map(line => JSON.parse(line));
}

// ─── Main ──────────────────────────────────────────────────────────────────

function main() {
  const rawDir = path.join(process.cwd(), 'data', 'geocoding', 'raw');
  const outDir = path.join(process.cwd(), 'data', 'geocoding');

  console.log('Reading raw JSONL files...');
  const ancientRecords = readJsonl<any>(path.join(rawDir, 'ancient.jsonl'));
  const modernRecords = readJsonl<any>(path.join(rawDir, 'modern.jsonl'));
  const imageRecords = readJsonl<any>(path.join(rawDir, 'image.jsonl'));

  // Build lookup maps
  const modernById = new Map<string, any>();
  for (const m of modernRecords) {
    modernById.set(m.id, m);
  }

  const imageById = new Map<string, any>();
  for (const img of imageRecords) {
    imageById.set(img.id, img);
  }

  console.log(`Loaded ${ancientRecords.length} ancient, ${modernRecords.length} modern, ${imageRecords.length} images`);

  // ── Process ancient places into our GeocodingPlace format ──
  const places: GeocodingPlace[] = [];
  const slugCounts = new Map<string, number>();

  for (const ancient of ancientRecords) {
    const name = ancient.friendly_id || 'Unknown';
    let slug = ancient.url_slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Deduplicate slugs
    const count = (slugCounts.get(slug) || 0) + 1;
    slugCounts.set(slug, count);
    if (count > 1) slug = `${slug}-${count}`;

    // Parse verse references
    const verses: VerseRef[] = [];
    for (const v of (ancient.verses || [])) {
      const parsed = parseOsis(v.osis);
      if (parsed) verses.push(parsed);
    }

    // Get best identification coordinates + thumbnail
    let lat: number | null = null;
    let lon: number | null = null;
    let confidenceScore = 0;
    let thumbnailFile: string | null = null;
    let credit: string | null = null;
    let creditUrl: string | null = null;
    let description: string | null = null;
    let modernName: string | null = null;
    let placeholder: string | null = null;

    // First check top-level media
    if (ancient.media?.thumbnail) {
      const t = ancient.media.thumbnail;
      thumbnailFile = t.file || null;
      credit = t.credit || null;
      creditUrl = t.credit_url || null;
      description = t.description ? stripXmlTags(t.description) : null;
      placeholder = t.placeholder || null;
    }

    // Find best resolution from identifications
    const ids = ancient.identifications || [];
    let bestScore = -1;
    for (const identification of ids) {
      const score = identification.score?.time_total || identification.score?.vote_total || 0;

      for (const resolution of (identification.resolutions || [])) {
        if (resolution.lonlat && score > bestScore) {
          const [lonStr, latStr] = resolution.lonlat.split(',');
          lat = parseFloat(latStr);
          lon = parseFloat(lonStr);
          bestScore = score;
          confidenceScore = score;

          // Get modern name
          if (resolution.modern_basis_id) {
            const modern = modernById.get(resolution.modern_basis_id);
            if (modern) modernName = modern.friendly_id || null;
          }

          // Get thumbnail from resolution if not already set
          if (!thumbnailFile && resolution.media?.thumbnail) {
            const t = resolution.media.thumbnail;
            thumbnailFile = t.file || null;
            credit = t.credit || null;
            creditUrl = t.credit_url || null;
            description = t.description ? stripXmlTags(t.description) : null;
            placeholder = t.placeholder || null;
          }
        }
      }

      // Also check identification-level thumbnail
      if (!thumbnailFile && identification.media?.thumbnail) {
        const t = identification.media.thumbnail;
        thumbnailFile = t.file || null;
        credit = t.credit || null;
        creditUrl = t.credit_url || null;
        description = t.description ? stripXmlTags(t.description) : null;
        placeholder = t.placeholder || null;
      }
    }

    // Also resolve from modern_associations for better coordinates
    if (ancient.modern_associations) {
      const assocEntries = Object.entries(ancient.modern_associations) as [string, any][];
      const bestAssoc = assocEntries.sort((a, b) => (b[1].score || 0) - (a[1].score || 0))[0];
      if (bestAssoc) {
        const modern = modernById.get(bestAssoc[0]);
        if (modern && modern.lonlat) {
          const [lonStr, latStr] = modern.lonlat.split(',');
          const newLat = parseFloat(latStr);
          const newLon = parseFloat(lonStr);
          if (!lat || (bestAssoc[1].score || 0) > confidenceScore) {
            lat = newLat;
            lon = newLon;
            confidenceScore = bestAssoc[1].score || confidenceScore;
            modernName = modern.friendly_id || modernName;
          }
          // Get thumbnail from modern if not already set
          if (!thumbnailFile && modern.media?.thumbnail) {
            const t = modern.media.thumbnail;
            thumbnailFile = t.file || null;
            credit = t.credit || null;
            creditUrl = t.credit_url || null;
            description = t.description ? stripXmlTags(t.description) : null;
            placeholder = t.placeholder || null;
          }
        }
      }
    }

    // Find wikipedia/wikidata from linked_data
    let wikipedia: string | null = null;
    let wikidata: string | null = null;
    if (ancient.linked_data) {
      for (const [sourceId, ld] of Object.entries(ancient.linked_data) as [string, any][]) {
        if (ld.url && ld.url.includes('wikipedia.org') && !wikipedia) {
          wikipedia = ld.url;
        }
        if (ld.url && ld.url.includes('wikidata.org') && !wikidata) {
          wikidata = ld.url;
        }
        if (ld.id && typeof ld.id === 'string' && ld.id.startsWith('Q') && !wikidata) {
          wikidata = `https://www.wikidata.org/wiki/${ld.id}`;
        }
      }
    }

    // Collect all types
    const types: string[] = [];
    for (const identification of ids) {
      for (const t of (identification.types || [])) {
        if (!types.includes(t)) types.push(t);
      }
    }
    // Also check root types
    if (ancient.types) {
      for (const t of ancient.types) {
        if (!types.includes(t)) types.push(t);
      }
    }

    // Unique books
    const bookSet = new Set<string>();
    for (const v of verses) bookSet.add(v.bookSlug);
    const books = Array.from(bookSet);

    places.push({
      id: ancient.id,
      slug,
      name,
      type: types[0] || 'unknown',
      types,
      lat,
      lon,
      confidenceScore,
      verseCount: verses.length,
      verses,
      books,
      wikipedia,
      wikidata,
      thumbnailFile,
      credit,
      creditUrl,
      description,
      modernName,
      placeholder,
    });
  }

  // Sort by name
  places.sort((a, b) => a.name.localeCompare(b.name));

  console.log(`Processed ${places.length} places`);
  console.log(`  With coordinates: ${places.filter(p => p.lat !== null).length}`);
  console.log(`  With thumbnails: ${places.filter(p => p.thumbnailFile !== null).length}`);
  console.log(`  With verses: ${places.filter(p => p.verseCount > 0).length}`);

  // ── Build index maps ──

  // places-index.json: slug → array index
  const placesIndex: Record<string, number> = {};
  for (let i = 0; i < places.length; i++) {
    placesIndex[places[i].slug] = i;
  }

  // places-by-book.json: { "genesis": ["jerusalem", "bethel", ...] }
  const placesByBook: Record<string, string[]> = {};
  for (const place of places) {
    for (const book of place.books) {
      if (!placesByBook[book]) placesByBook[book] = [];
      if (!placesByBook[book].includes(place.slug)) {
        placesByBook[book].push(place.slug);
      }
    }
  }

  // places-by-chapter.json: { "genesis-12": ["ur", "haran", ...] }
  const placesByChapter: Record<string, string[]> = {};
  for (const place of places) {
    const chapSet = new Set<string>();
    for (const v of place.verses) {
      const key = `${v.bookSlug}-${v.chapter}`;
      chapSet.add(key);
    }
    for (const key of chapSet) {
      if (!placesByChapter[key]) placesByChapter[key] = [];
      placesByChapter[key].push(place.slug);
    }
  }

  // verse-places.json: { "genesis-14-18": ["jerusalem"] }
  const versePlaces: Record<string, string[]> = {};
  for (const place of places) {
    for (const v of place.verses) {
      if (!versePlaces[v.ref]) versePlaces[v.ref] = [];
      if (!versePlaces[v.ref].includes(place.slug)) {
        versePlaces[v.ref].push(place.slug);
      }
    }
  }

  // place-types.json: { "settlement": ["jerusalem", ...] }
  const placeTypes: Record<string, string[]> = {};
  for (const place of places) {
    for (const t of place.types) {
      if (!placeTypes[t]) placeTypes[t] = [];
      placeTypes[t].push(place.slug);
    }
  }

  // nearby-places.json: top 10 per place by haversine distance
  console.log('Computing nearby places...');
  const nearbyPlaces: Record<string, NearbyEntry[]> = {};
  const placesWithCoords = places.filter(p => p.lat !== null && p.lon !== null);
  for (const place of placesWithCoords) {
    const distances: NearbyEntry[] = [];
    for (const other of placesWithCoords) {
      if (other.slug === place.slug) continue;
      const dist = haversineKm(place.lat!, place.lon!, other.lat!, other.lon!);
      distances.push({ slug: other.slug, name: other.name, distanceKm: Math.round(dist * 10) / 10 });
    }
    distances.sort((a, b) => a.distanceKm - b.distanceKm);
    nearbyPlaces[place.slug] = distances.slice(0, 10);
  }

  // images.json: image metadata
  const images: Record<string, ImageEntry> = {};
  for (const img of imageRecords) {
    images[img.id] = {
      id: img.id,
      credit: img.credit || null,
      creditUrl: img.credit_url || img.url || null,
      license: img.license || null,
      description: img.descriptions ? stripXmlTags(Object.values(img.descriptions as Record<string, string>)[0] || '') : null,
      file: img.thumbnails ? (Object.values(img.thumbnails as Record<string, any>)[0] as any)?.file || null : null,
      placeholder: null,
    };
  }

  // ── Write output files ──
  console.log('Writing output files...');

  const write = (name: string, data: any) => {
    const filePath = path.join(outDir, name);
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
    const sizeMb = (fs.statSync(filePath).size / 1024 / 1024).toFixed(2);
    console.log(`  ${name}: ${sizeMb} MB`);
  };

  write('places.json', places);
  write('places-index.json', placesIndex);
  write('places-by-book.json', placesByBook);
  write('places-by-chapter.json', placesByChapter);
  write('verse-places.json', versePlaces);
  write('place-types.json', placeTypes);
  write('nearby-places.json', nearbyPlaces);
  write('images.json', images);

  // ── Summary stats ──
  const totalVerseRefs = Object.keys(versePlaces).length;
  const totalTypes = Object.keys(placeTypes).length;
  const totalBooks = Object.keys(placesByBook).length;
  const totalChapters = Object.keys(placesByChapter).length;

  console.log('\n=== Summary ===');
  console.log(`Places: ${places.length}`);
  console.log(`Verse-place combos: ${totalVerseRefs}`);
  console.log(`Place types: ${totalTypes}`);
  console.log(`Books with places: ${totalBooks}`);
  console.log(`Chapters with places: ${totalChapters}`);
  console.log(`Nearby place lists: ${Object.keys(nearbyPlaces).length}`);
}

main();
