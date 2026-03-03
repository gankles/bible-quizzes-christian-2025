/**
 * Filter geocoding thumbnails: copy usable (non-copyright) images to public/geo/
 * Run: npx tsx scripts/filter-geo-thumbnails.ts
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const THUMBNAILS_DIR = path.join(ROOT, 'thumbnails');
const OUTPUT_DIR = path.join(ROOT, 'public', 'geo');
const IMAGES_JSON = path.join(ROOT, 'data', 'geocoding', 'images.json');

// Load images.json to get license info
const images: Record<string, { id: string; license: string | null }> = JSON.parse(
  fs.readFileSync(IMAGES_JSON, 'utf-8')
);

// Build set of copyright image IDs
const copyrightImageIds = new Set<string>();
for (const [id, img] of Object.entries(images)) {
  if (img.license === 'copyright') {
    copyrightImageIds.add(id);
  }
}
console.log(`Copyright images to skip: ${copyrightImageIds.size}`);

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Process thumbnails
const files = fs.readdirSync(THUMBNAILS_DIR).filter(f => f.endsWith('.jpg'));
let copied = 0;
let skipped = 0;

for (const file of files) {
  // Parse filename: {placeId}.{imageId}.jpg or {placeId}.satellite.jpg
  const parts = file.replace('.jpg', '').split('.');
  if (parts.length < 2) {
    console.warn(`Unexpected filename format: ${file}`);
    skipped++;
    continue;
  }

  const imageId = parts[1]; // e.g. "i686f0d" or "satellite"

  // Satellite images are always sentinel license (usable)
  if (imageId === 'satellite') {
    fs.copyFileSync(
      path.join(THUMBNAILS_DIR, file),
      path.join(OUTPUT_DIR, file)
    );
    copied++;
    continue;
  }

  // Look up imageId in images.json
  if (copyrightImageIds.has(imageId)) {
    skipped++;
    continue;
  }

  // Usable — copy
  fs.copyFileSync(
    path.join(THUMBNAILS_DIR, file),
    path.join(OUTPUT_DIR, file)
  );
  copied++;
}

console.log(`\nDone!`);
console.log(`Total files: ${files.length}`);
console.log(`Copied:  ${copied}`);
console.log(`Skipped: ${skipped}`);
