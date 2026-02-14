import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Load .env manually
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
  }
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const OUTPUT_DIR = path.join(process.cwd(), 'data', 'chapter-breakdowns');
const PROGRESS_FILE = path.join(OUTPUT_DIR, '.progress.json');

const BOOKS: Record<string, { name: string; chapters: number }> = {
  'genesis': { name: 'Genesis', chapters: 50 },
  'exodus': { name: 'Exodus', chapters: 40 },
  'leviticus': { name: 'Leviticus', chapters: 27 },
  'numbers': { name: 'Numbers', chapters: 36 },
  'deuteronomy': { name: 'Deuteronomy', chapters: 34 },
  'joshua': { name: 'Joshua', chapters: 24 },
  'judges': { name: 'Judges', chapters: 21 },
  'ruth': { name: 'Ruth', chapters: 4 },
  '1-samuel': { name: '1 Samuel', chapters: 31 },
  '2-samuel': { name: '2 Samuel', chapters: 24 },
  '1-kings': { name: '1 Kings', chapters: 22 },
  '2-kings': { name: '2 Kings', chapters: 25 },
  '1-chronicles': { name: '1 Chronicles', chapters: 29 },
  '2-chronicles': { name: '2 Chronicles', chapters: 36 },
  'ezra': { name: 'Ezra', chapters: 10 },
  'nehemiah': { name: 'Nehemiah', chapters: 13 },
  'esther': { name: 'Esther', chapters: 10 },
  'job': { name: 'Job', chapters: 42 },
  'psalms': { name: 'Psalms', chapters: 150 },
  'proverbs': { name: 'Proverbs', chapters: 31 },
  'ecclesiastes': { name: 'Ecclesiastes', chapters: 12 },
  'song-of-solomon': { name: 'Song of Solomon', chapters: 8 },
  'isaiah': { name: 'Isaiah', chapters: 66 },
  'jeremiah': { name: 'Jeremiah', chapters: 52 },
  'lamentations': { name: 'Lamentations', chapters: 5 },
  'ezekiel': { name: 'Ezekiel', chapters: 48 },
  'daniel': { name: 'Daniel', chapters: 12 },
  'hosea': { name: 'Hosea', chapters: 14 },
  'joel': { name: 'Joel', chapters: 3 },
  'amos': { name: 'Amos', chapters: 9 },
  'obadiah': { name: 'Obadiah', chapters: 1 },
  'jonah': { name: 'Jonah', chapters: 4 },
  'micah': { name: 'Micah', chapters: 7 },
  'nahum': { name: 'Nahum', chapters: 3 },
  'habakkuk': { name: 'Habakkuk', chapters: 3 },
  'zephaniah': { name: 'Zephaniah', chapters: 3 },
  'haggai': { name: 'Haggai', chapters: 2 },
  'zechariah': { name: 'Zechariah', chapters: 14 },
  'malachi': { name: 'Malachi', chapters: 4 },
  'matthew': { name: 'Matthew', chapters: 28 },
  'mark': { name: 'Mark', chapters: 16 },
  'luke': { name: 'Luke', chapters: 24 },
  'john': { name: 'John', chapters: 21 },
  'acts': { name: 'Acts', chapters: 28 },
  'romans': { name: 'Romans', chapters: 16 },
  '1-corinthians': { name: '1 Corinthians', chapters: 16 },
  '2-corinthians': { name: '2 Corinthians', chapters: 13 },
  'galatians': { name: 'Galatians', chapters: 6 },
  'ephesians': { name: 'Ephesians', chapters: 6 },
  'philippians': { name: 'Philippians', chapters: 4 },
  'colossians': { name: 'Colossians', chapters: 4 },
  '1-thessalonians': { name: '1 Thessalonians', chapters: 5 },
  '2-thessalonians': { name: '2 Thessalonians', chapters: 3 },
  '1-timothy': { name: '1 Timothy', chapters: 6 },
  '2-timothy': { name: '2 Timothy', chapters: 4 },
  'titus': { name: 'Titus', chapters: 3 },
  'philemon': { name: 'Philemon', chapters: 1 },
  'hebrews': { name: 'Hebrews', chapters: 13 },
  'james': { name: 'James', chapters: 5 },
  '1-peter': { name: '1 Peter', chapters: 5 },
  '2-peter': { name: '2 Peter', chapters: 3 },
  '1-john': { name: '1 John', chapters: 5 },
  '2-john': { name: '2 John', chapters: 1 },
  '3-john': { name: '3 John', chapters: 1 },
  'jude': { name: 'Jude', chapters: 1 },
  'revelation': { name: 'Revelation', chapters: 22 },
};

function loadProgress(): Record<string, boolean> {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
    }
  } catch {}
  return {};
}

function saveProgress(progress: Record<string, boolean>) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

async function generateBreakdown(bookSlug: string, bookName: string, totalChapters: number): Promise<Record<string, any>> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: 'You are a Bible scholar. Always respond with valid JSON containing a "chapters" object.'
      },
      {
        role: 'user',
        content: `Generate a chapter-by-chapter breakdown for ${bookName} (KJV Bible). The book has ${totalChapters} chapter${totalChapters > 1 ? 's' : ''}.

For EACH chapter (1 through ${totalChapters}), provide:
- "title": A short 2-4 word title summarizing the chapter (e.g., "Creation", "The Flood", "Sermon on the Mount")
- "keyEvent": A brief 5-12 word description of the main event or teaching (e.g., "God creates the world in six days")
- "verses": The actual number of verses in that chapter (be accurate to the KJV)

Return as JSON: {"chapters": {"1": {"title": "...", "keyEvent": "...", "verses": 31}, "2": {"title": "...", "keyEvent": "...", "verses": 25}, ...}}

Be accurate with verse counts. Use traditional, conservative Christian interpretations.`
      }
    ],
    temperature: 0.3,
    max_tokens: totalChapters <= 30 ? 4000 : totalChapters <= 60 ? 8000 : 16000,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('Empty response');

  const parsed = JSON.parse(content);
  return parsed.chapters || parsed;
}

async function processBook(bookSlug: string, progress: Record<string, boolean>) {
  const book = BOOKS[bookSlug];
  if (!book) {
    console.error(`Unknown book: ${bookSlug}`);
    return;
  }

  const outFile = path.join(OUTPUT_DIR, `${bookSlug}.json`);
  if (fs.existsSync(outFile)) {
    console.log(`  [skip] ${book.name} already exists`);
    progress[bookSlug] = true;
    return;
  }

  console.log(`  Generating ${book.name} (${book.chapters} chapters)...`);
  const start = Date.now();

  try {
    const breakdown = await generateBreakdown(bookSlug, book.name, book.chapters);
    const chapterCount = Object.keys(breakdown).length;

    if (chapterCount < book.chapters) {
      console.warn(`  [warn] ${book.name}: got ${chapterCount}/${book.chapters} chapters`);
    }

    fs.writeFileSync(outFile, JSON.stringify(breakdown, null, 2));
    progress[bookSlug] = true;
    saveProgress(progress);

    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`  [done] ${book.name}: ${chapterCount} chapters in ${elapsed}s`);
  } catch (err: any) {
    console.error(`  [error] ${book.name}: ${err.message}`);
  }
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const args = process.argv.slice(2);
  const concurrency = parseInt(args.find(a => a.startsWith('--concurrency='))?.split('=')[1] || '5');
  const bookArg = args.find(a => a.startsWith('--book='))?.split('=')[1];
  const all = args.includes('--all');

  const progress = loadProgress();

  let booksToProcess: string[];

  if (bookArg) {
    booksToProcess = [bookArg];
  } else if (all) {
    booksToProcess = Object.keys(BOOKS).filter(slug => !progress[slug]);
  } else {
    console.log('Usage: npx tsx scripts/generate-chapter-breakdowns.ts --all [--concurrency=5]');
    console.log('       npx tsx scripts/generate-chapter-breakdowns.ts --book=genesis');
    return;
  }

  const completed = Object.keys(progress).filter(k => progress[k]).length;
  console.log(`\nChapter Breakdown Generator`);
  console.log(`Progress: ${completed}/${Object.keys(BOOKS).length} books complete`);
  console.log(`Remaining: ${booksToProcess.length} books`);
  console.log(`Concurrency: ${concurrency}\n`);

  // Process in parallel batches
  for (let i = 0; i < booksToProcess.length; i += concurrency) {
    const batch = booksToProcess.slice(i, i + concurrency);
    console.log(`Batch ${Math.floor(i / concurrency) + 1}: ${batch.join(', ')}`);
    await Promise.all(batch.map(slug => processBook(slug, progress)));
  }

  const finalCompleted = Object.keys(progress).filter(k => progress[k]).length;
  console.log(`\nDone! ${finalCompleted}/${Object.keys(BOOKS).length} books complete.`);
}

main().catch(console.error);
