#!/usr/bin/env npx tsx
/**
 * AI Topic Essay Generator using OpenAI GPT-4.1-mini
 *
 * The live /bible-quotes/[slug] page is backed by data/bible-quotes.json (a
 * consolidation of topics.json + other legacy topic sources, keyed by its own
 * slug space — e.g. topics.json's "10-commandments" is consolidated under
 * "ten-commandments" here). Essays MUST be keyed by bible-quotes.json's own
 * slugs or the live page will never find them.
 *
 * This grounds each essay in the topic's REAL resolved KJV verse text (never
 * lets the model invent verses or quote anything not actually fetched), plus
 * (for the 36 topics that have one) data/kjvstudy/topics/*.json as EXTRA
 * grounding only — folded into fresh prose, never copied verbatim, since that
 * file is a verbatim mirror of kjvstudy.org.
 *
 * Output: data/topic-essays/{slug}.json
 *
 * Usage:
 *   npx tsx scripts/generate-topic-essays-ai.ts --slugs ten-commandments,faith
 *   npx tsx scripts/generate-topic-essays-ai.ts --all
 *   npx tsx scripts/generate-topic-essays-ai.ts --all --force --concurrency 3
 */

import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';
import { getVerses, getBookName, stripHtml, getBookId } from '../lib/bolls-api';
import { getKjvStudyTopic } from '../lib/kjvstudy-topics';
import { getQuoteTopic, getAllQuoteSlugs, QuoteTopic } from '../lib/bible-quotes-data';

// =============================================================================
// TYPES
// =============================================================================

type TopicEntry = QuoteTopic;

interface TopicEssay {
  slug: string;
  name: string;
  overview: string;
  generatedAt: string;
}

interface ProgressData {
  completed: Record<string, boolean>;
  lastUpdated: string;
  totalGenerated: number;
  totalCost: number;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const OUTPUT_DIR = path.resolve(SCRIPT_DIR, '..', 'data', 'topic-essays');
const PROGRESS_FILE = path.join(OUTPUT_DIR, '.progress.json');

const OPENAI_RATE_LIMIT_MS = 300;
const OPENAI_TIMEOUT_MS = 120000;
const MAX_RETRIES = 3;
const MAX_VERSES_PER_TOPIC = 6;

// GPT-4.1-mini pricing (per 1M tokens)
const INPUT_COST_PER_1M = 0.40;
const OUTPUT_COST_PER_1M = 1.60;

// =============================================================================
// HELPERS
// =============================================================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseRef(ref: string): { bookSlug: string; chapter: number; verse: number } | null {
  const parts = ref.split('-');
  if (parts.length < 3) return null;
  const verse = parseInt(parts.pop()!);
  const chapter = parseInt(parts.pop()!);
  const bookSlug = parts.join('-');
  if (!bookSlug || isNaN(chapter) || isNaN(verse)) return null;
  return { bookSlug, chapter, verse };
}

// =============================================================================
// PROGRESS TRACKING
// =============================================================================

function loadProgress(): ProgressData {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
  }
  return { completed: {}, lastUpdated: new Date().toISOString(), totalGenerated: 0, totalCost: 0 };
}

function saveProgress(progress: ProgressData): void {
  progress.lastUpdated = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2), 'utf-8');
}

// =============================================================================
// GROUNDING DATA
// =============================================================================

interface ResolvedVerse {
  ref: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
}

interface Grounding {
  topic: TopicEntry;
  verses: ResolvedVerse[];
  kjvOverview: string | null;
  kjvSubtopicTitles: string[];
}

async function resolveTopicVerses(refs: string[]): Promise<ResolvedVerse[]> {
  const parsed = refs
    .slice(0, MAX_VERSES_PER_TOPIC)
    .map(ref => ({ ref, loc: parseRef(ref) }))
    .filter((r): r is { ref: string; loc: { bookSlug: string; chapter: number; verse: number } } => r.loc !== null);

  const groups = new Map<string, { bookId: number; bookSlug: string; chapter: number; verses: number[] }>();
  for (const { loc } of parsed) {
    const bookId = getBookId(loc.bookSlug);
    if (!bookId) continue;
    const key = `${loc.bookSlug}-${loc.chapter}`;
    if (!groups.has(key)) {
      groups.set(key, { bookId, bookSlug: loc.bookSlug, chapter: loc.chapter, verses: [] });
    }
    groups.get(key)!.verses.push(loc.verse);
  }

  if (groups.size === 0) return [];

  const requests = Array.from(groups.values()).map(g => ({
    translation: 'KJV',
    book: g.bookId,
    chapter: g.chapter,
    verses: g.verses,
  }));

  const results = await getVerses(requests);

  const resolved: ResolvedVerse[] = [];
  const groupList = Array.from(groups.values());
  results.forEach((verseList, i) => {
    const g = groupList[i];
    for (const v of verseList) {
      resolved.push({
        ref: `${g.bookSlug}-${g.chapter}-${v.verse}`,
        bookName: getBookName(g.bookSlug),
        chapter: g.chapter,
        verse: v.verse,
        text: stripHtml(v.text).trim(),
      });
    }
  });

  return resolved;
}

async function buildGrounding(slug: string): Promise<Grounding | null> {
  const topic = getQuoteTopic(slug);
  if (!topic) return null;

  const verses = await resolveTopicVerses(topic.verseRefs || []);
  if (verses.length === 0) return null;

  const kjvTopic = getKjvStudyTopic(slug);

  return {
    topic,
    verses,
    kjvOverview: kjvTopic?.overview || null,
    kjvSubtopicTitles: kjvTopic ? kjvTopic.subtopics.map(s => s.name) : [],
  };
}

// =============================================================================
// PROMPT
// =============================================================================

function buildPrompt(g: Grounding): string {
  const { topic, verses, kjvOverview, kjvSubtopicTitles } = g;

  const facts = {
    topicName: topic.name,
    category: topic.category,
    totalVerseCount: topic.verseCount,
    subtopics: topic.subtopics.length > 0 ? topic.subtopics : null,
    sampleVerses: verses.map(v => ({ ref: `${v.bookName} ${v.chapter}:${v.verse}`, text: v.text })),
    // Extra grounding ONLY — reflect in your own words, never copy wording
    priorReferenceOverview: kjvOverview,
    priorReferenceSubtopics: kjvSubtopicTitles.length > 0 ? kjvSubtopicTitles : null,
  };

  return `You are a Bible scholar writing a short topical study introduction for "${topic.name}" in an evangelical, conservative, Christ-centered Bible study resource.

FACTS (the ONLY information you may use — do not invent verses, quotes, or claims beyond what is given here):
${JSON.stringify(facts, null, 2)}

Return ONLY valid JSON with exactly this key:
{
  "overview": "2-4 sentences introducing what Scripture teaches about this topic, grounded specifically in the sampleVerses given (you may paraphrase or lightly quote them) and, if present, priorReferenceOverview/priorReferenceSubtopics synthesized into fresh original wording. Avoid generic filler like 'this is a recurring theme in Scripture' — say something substantive about what the actual verses show."
}

REQUIREMENTS:
- Every claim must trace back to a fact listed above. Do not cite verses other than those in sampleVerses.
- Write in original prose — if priorReferenceOverview is present, do not copy its wording, synthesize the same facts freshly.
- Do not use social-justice framing, environmental activism, or modern political language.`;
}

// =============================================================================
// AI GENERATION
// =============================================================================

async function generateEssay(client: OpenAI, g: Grounding): Promise<{ essay: TopicEssay; cost: number }> {
  const prompt = buildPrompt(g);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`  Calling GPT-4.1-mini for ${g.topic.slug} (attempt ${attempt})...`);
      const response = await client.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: 'You are a Bible scholar. Return ONLY valid JSON, no markdown, no code fences.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.5,
        max_tokens: 600,
        response_format: { type: 'json_object' },
      }, { timeout: OPENAI_TIMEOUT_MS });

      const content = response.choices[0]?.message?.content?.trim();
      if (!content) throw new Error('Empty API response');

      const parsed = JSON.parse(content);
      if (!parsed.overview) throw new Error('Response missing required fields');

      const inputTokens = response.usage?.prompt_tokens || 0;
      const outputTokens = response.usage?.completion_tokens || 0;
      const cost = (inputTokens * INPUT_COST_PER_1M / 1_000_000) + (outputTokens * OUTPUT_COST_PER_1M / 1_000_000);

      const essay: TopicEssay = {
        slug: g.topic.slug,
        name: g.topic.name,
        overview: parsed.overview,
        generatedAt: new Date().toISOString(),
      };

      await sleep(OPENAI_RATE_LIMIT_MS);
      return { essay, cost };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`  Attempt ${attempt} failed: ${msg}`);
      if (attempt >= MAX_RETRIES) throw err;
      await sleep(3000 * attempt);
    }
  }

  throw new Error(`Failed after ${MAX_RETRIES} retries`);
}

// =============================================================================
// BATCH PROCESSING
// =============================================================================

async function processEntry(
  client: OpenAI,
  progress: ProgressData,
  slug: string,
  force: boolean,
  dryRun: boolean,
): Promise<void> {
  if (!force && progress.completed[slug]) {
    console.log(`  [SKIP] ${slug} (already generated)`);
    return;
  }

  const g = await buildGrounding(slug);
  if (!g) {
    console.warn(`  [SKIP] ${slug}: no topic entry or no resolvable verses`);
    return;
  }

  if (dryRun) {
    console.log(`  [DRY-RUN] Would generate ${slug} (${g.topic.name}) — ${g.verses.length} verses, kjvTopic: ${!!g.kjvOverview}`);
    return;
  }

  console.log(`\n[GEN] ${slug} (${g.topic.name})...`);

  const { essay, cost } = await generateEssay(client, g);

  const outFile = path.join(OUTPUT_DIR, `${slug}.json`);
  fs.writeFileSync(outFile, JSON.stringify(essay, null, 2), 'utf-8');

  progress.completed[slug] = true;
  progress.totalGenerated++;
  progress.totalCost += cost;
  saveProgress(progress);

  console.log(`  [OK] ${slug} saved ($${cost.toFixed(4)})`);
}

async function processBatch(
  client: OpenAI,
  slugs: string[],
  concurrency: number,
  force: boolean,
  dryRun: boolean,
): Promise<void> {
  const progress = loadProgress();

  console.log(`\nTopic Essay Generation`);
  console.log(`Total topics: ${slugs.length}`);
  console.log(`Already done: ${Object.keys(progress.completed).length}`);
  console.log(`Concurrency: ${concurrency}`);
  console.log(`Force: ${force}`);
  console.log(`Dry run: ${dryRun}`);
  console.log(`Total cost so far: $${progress.totalCost.toFixed(4)}\n`);

  let idx = 0;
  const total = slugs.length;

  async function worker(): Promise<void> {
    while (idx < total) {
      const i = idx++;
      const slug = slugs[i];
      try {
        await processEntry(client, progress, slug, force, dryRun);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`  [FAIL] ${slug}: ${msg}`);
      }
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  console.log(`\n=== COMPLETE ===`);
  console.log(`Generated: ${progress.totalGenerated}`);
  console.log(`Total cost: $${progress.totalCost.toFixed(4)}`);
}

// =============================================================================
// CLI
// =============================================================================

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage:
  npx tsx scripts/generate-topic-essays-ai.ts --slugs 10-commandments,faith
  npx tsx scripts/generate-topic-essays-ai.ts --all

Options:
  --concurrency <n>   Parallel workers (default: 2)
  --force             Regenerate even if already completed
  --dry-run           Show what would be generated without calling any API
`);
    process.exit(0);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const dryRun = args.includes('--dry-run');
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey && !dryRun) {
    console.error('Error: OPENAI_API_KEY environment variable is required');
    process.exit(1);
  }

  const client = new OpenAI({ apiKey: apiKey || 'dry-run' });
  const force = args.includes('--force');
  const concurrencyIdx = args.indexOf('--concurrency');
  const concurrency = concurrencyIdx !== -1 ? parseInt(args[concurrencyIdx + 1]) || 2 : 2;

  let slugs: string[] = [];

  if (args.includes('--slugs')) {
    const i = args.indexOf('--slugs');
    slugs = args[i + 1].split(',').map(s => s.trim().toLowerCase());
  } else if (args.includes('--all')) {
    slugs = getAllQuoteSlugs();
  }

  if (slugs.length === 0) {
    console.error('No slugs specified');
    process.exit(1);
  }

  await processBatch(client, slugs, concurrency, force, dryRun);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
