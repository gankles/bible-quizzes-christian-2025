import fs from 'fs';
import path from 'path';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface VerseRef {
  bookSlug: string;
  chapter: number;
  verse: number;
  ref: string;
  readable: string;
  osis: string;
}

export interface GeocodingPlace {
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

export interface NearbyEntry {
  slug: string;
  name: string;
  distanceKm: number;
}

export interface ImageEntry {
  id: string;
  credit: string | null;
  creditUrl: string | null;
  license: string | null;
  description: string | null;
  file: string | null;
  placeholder: string | null;
}

// ─── Cache ─────────────────────────────────────────────────────────────────

let _places: GeocodingPlace[] | null = null;
let _placesIndex: Record<string, number> | null = null;
let _placesByBook: Record<string, string[]> | null = null;
let _placesByChapter: Record<string, string[]> | null = null;
let _versePlaces: Record<string, string[]> | null = null;
let _placeTypes: Record<string, string[]> | null = null;
let _nearbyPlaces: Record<string, NearbyEntry[]> | null = null;
let _images: Record<string, ImageEntry> | null = null;

function loadJson<T>(filename: string): T {
  const filePath = path.join(process.cwd(), 'data', 'geocoding', filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Geocoding data file not found: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function loadPlaces(): GeocodingPlace[] {
  if (!_places) _places = loadJson<GeocodingPlace[]>('places.json');
  return _places;
}

function loadPlacesIndex(): Record<string, number> {
  if (!_placesIndex) _placesIndex = loadJson<Record<string, number>>('places-index.json');
  return _placesIndex;
}

// ─── Public API ────────────────────────────────────────────────────────────

export function getAllPlaces(): GeocodingPlace[] {
  return loadPlaces();
}

export function getAllPlaceSlugs(): string[] {
  return Object.keys(loadPlacesIndex());
}

export function getPlaceBySlug(slug: string): GeocodingPlace | null {
  const index = loadPlacesIndex();
  const i = index[slug];
  if (i === undefined) return null;
  return loadPlaces()[i] || null;
}

export function getPlacesForBook(bookSlug: string): GeocodingPlace[] {
  if (!_placesByBook) _placesByBook = loadJson<Record<string, string[]>>('places-by-book.json');
  const slugs = _placesByBook[bookSlug] || [];
  return slugs.map(s => getPlaceBySlug(s)).filter((p): p is GeocodingPlace => p !== null);
}

export function getPlacesForChapter(bookSlug: string, chapter: number): GeocodingPlace[] {
  if (!_placesByChapter) _placesByChapter = loadJson<Record<string, string[]>>('places-by-chapter.json');
  const key = `${bookSlug}-${chapter}`;
  const slugs = _placesByChapter[key] || [];
  return slugs.map(s => getPlaceBySlug(s)).filter((p): p is GeocodingPlace => p !== null);
}

export function getNearbyPlaces(slug: string): NearbyEntry[] {
  if (!_nearbyPlaces) _nearbyPlaces = loadJson<Record<string, NearbyEntry[]>>('nearby-places.json');
  return _nearbyPlaces[slug] || [];
}

export function getPlacesByType(type: string): GeocodingPlace[] {
  if (!_placeTypes) _placeTypes = loadJson<Record<string, string[]>>('place-types.json');
  const slugs = _placeTypes[type] || [];
  return slugs.map(s => getPlaceBySlug(s)).filter((p): p is GeocodingPlace => p !== null);
}

export function getAllPlaceTypes(): string[] {
  if (!_placeTypes) _placeTypes = loadJson<Record<string, string[]>>('place-types.json');
  return Object.keys(_placeTypes).sort();
}

export function getPlaceTypeWithCount(): { type: string; count: number }[] {
  if (!_placeTypes) _placeTypes = loadJson<Record<string, string[]>>('place-types.json');
  return Object.entries(_placeTypes)
    .map(([type, slugs]) => ({ type, count: slugs.length }))
    .sort((a, b) => b.count - a.count);
}

export function getVersePlaces(verseRef: string): GeocodingPlace[] {
  if (!_versePlaces) _versePlaces = loadJson<Record<string, string[]>>('verse-places.json');
  const slugs = _versePlaces[verseRef] || [];
  return slugs.map(s => getPlaceBySlug(s)).filter((p): p is GeocodingPlace => p !== null);
}

export function getAllVersePlaceKeys(): string[] {
  if (!_versePlaces) _versePlaces = loadJson<Record<string, string[]>>('verse-places.json');
  return Object.keys(_versePlaces);
}

export function getImageData(imageId: string): ImageEntry | null {
  if (!_images) _images = loadJson<Record<string, ImageEntry>>('images.json');
  return _images[imageId] || null;
}

export function getPlacesByBookChapterKeys(): string[] {
  if (!_placesByChapter) _placesByChapter = loadJson<Record<string, string[]>>('places-by-chapter.json');
  return Object.keys(_placesByChapter);
}

export function getBooksWithPlaces(): string[] {
  if (!_placesByBook) _placesByBook = loadJson<Record<string, string[]>>('places-by-book.json');
  return Object.keys(_placesByBook);
}

/** Type label for display — capitalizes and pluralizes */
export function formatPlaceType(type: string): string {
  const labels: Record<string, string> = {
    'settlement': 'Settlements',
    'mountain': 'Mountains',
    'river': 'Rivers',
    'region': 'Regions',
    'valley': 'Valleys',
    'body of water': 'Bodies of Water',
    'island': 'Islands',
    'hill': 'Hills',
    'spring': 'Springs',
    'gate': 'Gates',
    'well': 'Wells',
    'wadi': 'Wadis',
    'pool': 'Pools',
    'campsite': 'Campsites',
    'mountain range': 'Mountain Ranges',
    'road': 'Roads',
    'structure': 'Structures',
    'natural area': 'Natural Areas',
    'garden': 'Gardens',
    'altar': 'Altars',
    'people group': 'People Groups',
    'forest': 'Forests',
    'field': 'Fields',
    'cliff': 'Cliffs',
    'rock': 'Rocks',
    'ford': 'Fords',
    'canal': 'Canals',
    'tree': 'Trees',
    'hall': 'Halls',
    'room': 'Rooms',
    'fortification': 'Fortifications',
    'mine': 'Mines',
    'promontory': 'Promontories',
    'district in settlement': 'Districts',
    'mountain pass': 'Mountain Passes',
    'mountain ridge': 'Mountain Ridges',
    'stone heap': 'Stone Heaps',
    'special': 'Special Places',
  };
  return labels[type] || type.charAt(0).toUpperCase() + type.slice(1) + 's';
}

/** Singular label for display */
export function formatPlaceTypeSingular(type: string): string {
  const labels: Record<string, string> = {
    'body of water': 'Body of Water',
    'people group': 'People Group',
    'natural area': 'Natural Area',
    'mountain range': 'Mountain Range',
    'mountain pass': 'Mountain Pass',
    'mountain ridge': 'Mountain Ridge',
    'district in settlement': 'District',
    'stone heap': 'Stone Heap',
    'special': 'Special Place',
  };
  return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

export function getGeocodingStats() {
  const places = loadPlaces();
  const types = getAllPlaceTypes();
  const verseKeys = getAllVersePlaceKeys();
  return {
    totalPlaces: places.length,
    withCoordinates: places.filter(p => p.lat !== null).length,
    withThumbnails: places.filter(p => p.thumbnailFile !== null).length,
    totalTypes: types.length,
    totalVerseRefs: verseKeys.length,
    totalBooks: getBooksWithPlaces().length,
  };
}
