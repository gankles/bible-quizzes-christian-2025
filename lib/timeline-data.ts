import fs from 'fs';
import path from 'path';

export interface BibleEpoch {
  id: string;
  name: string;
  description: string;
  type: string;
  personId: string;
  startYear: number | null;
  endYear: number | null;
  periodLength: number | null;
  startReference: string;
  endReference: string;
  notes: string;
  slug: string;
}

// ── CSV handling ──

function parseCSVLine(line: string): string[] {
  const row: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      row.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  row.push(current.trim());
  return row;
}

function splitCSVRows(text: string): string[] {
  const rows: string[] = [];
  const lines = text.split('\n');
  let currentRow = '';
  let inQuotes = false;

  for (const line of lines) {
    currentRow = currentRow === '' ? line : currentRow + '\n' + line;

    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') { i++; }
        else { inQuotes = !inQuotes; }
      }
    }

    if (!inQuotes) {
      const trimmed = currentRow.trim();
      if (trimmed.length > 0) rows.push(trimmed);
      currentRow = '';
    }
  }

  if (currentRow.trim().length > 0) rows.push(currentRow.trim());
  return rows;
}

function stripBOM(text: string): string {
  return text.charCodeAt(0) === 0xFEFF ? text.slice(1) : text;
}

function toSlug(id: string): string {
  return id
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ── Cache ──

let _cache: BibleEpoch[] | null = null;

function loadAll(): BibleEpoch[] {
  if (_cache) return _cache;

  const csvPath = path.join(process.cwd(), 'data', 'bible-data', 'BibleData-Epoch.csv');
  if (!fs.existsSync(csvPath)) return [];

  const csv = stripBOM(fs.readFileSync(csvPath, 'utf-8'));
  const rows = splitCSVRows(csv);

  const seen = new Set<string>();
  const epochs: BibleEpoch[] = [];

  // Columns: epoch_id(0), epoch_name(1), epoch_description(2), epoch_type(3),
  // person_id(4), start_year_ah(5), end_year_ah(6), period_length(7),
  // start_year_calculation(8), start_year_offset(9), start_year_reference_id(10),
  // end_year_calculation(11), end_year_reference_id(12), period_length_reference_id(13),
  // epoch_notes(14)
  for (let i = 1; i < rows.length; i++) {
    const r = parseCSVLine(rows[i]);
    if (r.length < 5) continue;

    const epochId = r[0] || '';
    if (!epochId || seen.has(epochId)) continue;
    seen.add(epochId);

    const type = r[3] || '';
    // Filter to meaningful epoch types
    if (!type || !['Life', 'Reign', 'Unique', 'Judgeship', 'Period'].includes(type)) continue;

    epochs.push({
      id: epochId,
      name: r[1] || epochId,
      description: r[2] || '',
      type,
      personId: r[4] || '',
      startYear: r[5] ? parseInt(r[5], 10) || null : null,
      endYear: r[6] ? parseInt(r[6], 10) || null : null,
      periodLength: r[7] ? parseInt(r[7], 10) || null : null,
      startReference: r[10] || '',
      endReference: r[12] || '',
      notes: r[14] || '',
      slug: toSlug(epochId),
    });
  }

  // Sort by start year
  epochs.sort((a, b) => (a.startYear || 0) - (b.startYear || 0));

  _cache = epochs;
  return _cache;
}

// ── Public API ──

export function getAllEpochs(): BibleEpoch[] {
  return loadAll();
}

export function getEpochBySlug(slug: string): BibleEpoch | undefined {
  return loadAll().find(e => e.slug === slug);
}

export function getEpochsByType(type: string): BibleEpoch[] {
  return loadAll().filter(e => e.type === type);
}

export function getEpochTypes(): string[] {
  const types = new Set<string>();
  for (const e of loadAll()) {
    if (e.type) types.add(e.type);
  }
  return Array.from(types).sort();
}

export function getTimelineStats() {
  const all = loadAll();
  return {
    total: all.length,
    types: getEpochTypes().length,
    earliestYear: all[0]?.startYear || 0,
    latestYear: all[all.length - 1]?.endYear || 0,
  };
}
