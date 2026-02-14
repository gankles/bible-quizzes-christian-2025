#!/usr/bin/env npx tsx
/**
 * AI-Powered Commandment Quiz Generator using OpenAI GPT-4.1-mini
 *
 * Generates high-quality quizzes about the 613 biblical commandments.
 * Feeds actual commandment data (concepts, scripture, categories) to GPT
 * for much better question quality than the programmatic generator.
 *
 * Usage:
 *   npx tsx scripts/generate-commandment-quizzes-ai.ts --all
 *   npx tsx scripts/generate-commandment-quizzes-ai.ts --quiz ten-commandments
 *   npx tsx scripts/generate-commandment-quizzes-ai.ts --quiz 613-commandments
 *   npx tsx scripts/generate-commandment-quizzes-ai.ts --list
 *   npx tsx scripts/generate-commandment-quizzes-ai.ts --all --force
 */

import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';

// =============================================================================
// TYPES
// =============================================================================

interface Commandment {
  number: number;
  concept: string;
  polarity: 'P' | 'N';
  referenceId: string;
  scriptureEnglish: string;
  category: string;
  book: string;
  chapter: number;
}

interface AIQuestion {
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options: string[];
  correctAnswer: string;
  explanation: string;
  verseReference: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  verseReference: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizConfig {
  key: string;           // file name without .json
  title: string;
  description: string;
  slug: string;          // URL slug (key + '-quiz')
  tags: string[];
  questionCount: number;
  pool: 'all' | 'ten' | 'positive-negative' | string; // category name for category quizzes
}

// =============================================================================
// CONFIGURATION
// =============================================================================

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const OUTPUT_DIR = path.resolve(SCRIPT_DIR, '..', 'data', 'quizzes');
const PROGRESS_FILE = path.join(OUTPUT_DIR, '.commandment-quiz-progress.json');

const MAX_RETRIES = 3;
const INPUT_COST_PER_1M = 0.40;
const OUTPUT_COST_PER_1M = 1.60;

const USX_TO_SLUG: Record<string, string> = {
  GEN: 'genesis', EXO: 'exodus', LEV: 'leviticus', NUM: 'numbers', DEU: 'deuteronomy',
};
const USX_TO_NAME: Record<string, string> = {
  GEN: 'Genesis', EXO: 'Exodus', LEV: 'Leviticus', NUM: 'Numbers', DEU: 'Deuteronomy',
};

// =============================================================================
// HELPERS
// =============================================================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function formatRef(refId: string): string {
  const match = refId.match(/^([A-Z0-9]+)\s+(.+)$/);
  if (!match) return refId;
  return `${USX_TO_NAME[match[1]] || match[1]} ${match[2]}`;
}

// =============================================================================
// CSV LOADING
// =============================================================================

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

function loadCommandments(): Commandment[] {
  const csvPath = path.join(process.cwd(), 'data', 'bible-data', 'BibleData-Commandments.csv');
  const csv = fs.readFileSync(csvPath, 'utf-8');
  const clean = csv.charCodeAt(0) === 0xFEFF ? csv.slice(1) : csv;
  const lines = clean.trim().split('\n');

  return lines.slice(1).map(line => {
    const r = parseCSVLine(line);
    const refId = r[3] || '';
    const refMatch = refId.match(/^([A-Z0-9]+)\s+(\d+):/);
    const usxCode = refMatch ? refMatch[1] : '';
    return {
      number: parseInt(r[0], 10),
      concept: r[1],
      polarity: r[2] as 'P' | 'N',
      referenceId: refId,
      scriptureEnglish: r[4],
      category: r[12],
      book: USX_TO_SLUG[usxCode] || usxCode.toLowerCase(),
      chapter: refMatch ? parseInt(refMatch[2], 10) : 0,
    };
  });
}

// =============================================================================
// PROGRESS TRACKING
// =============================================================================

interface ProgressData {
  completed: Record<string, boolean>;
  lastUpdated: string;
  totalGenerated: number;
  totalCost: number;
}

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
// QUIZ DEFINITIONS
// =============================================================================

function buildQuizConfigs(allCmds: Commandment[]): QuizConfig[] {
  const configs: QuizConfig[] = [];

  // 1. Ten Commandments
  configs.push({
    key: 'ten-commandments',
    title: 'The Ten Commandments Quiz - Test Your Knowledge of Exodus 20',
    description: 'How well do you know the Ten Commandments? Test your knowledge of the foundational commandments given by God to Moses at Mount Sinai in Exodus 20.',
    slug: 'ten-commandments-quiz',
    tags: ['ten commandments', 'exodus 20', 'mount sinai', 'moses', 'gods law'],
    questionCount: 25,
    pool: 'ten',
  });

  // 2. All 613
  configs.push({
    key: '613-commandments',
    title: 'The 613 Commandments Quiz - Complete Biblical Law Knowledge Test',
    description: 'Test your knowledge of all 613 biblical commandments (mitzvot) from the Torah. 50 questions covering positive and negative commandments from Genesis through Deuteronomy.',
    slug: '613-commandments-quiz',
    tags: ['613 commandments', 'mitzvot', 'torah commandments', 'biblical law'],
    questionCount: 50,
    pool: 'all',
  });

  // 3. Positive vs Negative
  configs.push({
    key: 'positive-negative-commandments',
    title: 'Positive vs Negative Commandments Quiz - Thou Shalt vs Thou Shalt Not',
    description: 'Can you tell the difference between a positive commandment ("thou shalt") and a negative commandment ("thou shalt not")? Test your knowledge of the 248 positive and 365 negative commandments.',
    slug: 'positive-negative-commandments-quiz',
    tags: ['positive commandments', 'negative commandments', 'thou shalt', 'thou shalt not'],
    questionCount: 25,
    pool: 'positive-negative',
  });

  // 4. Category quizzes
  const categoryConfigs = [
    { cat: 'Sacrifices and Offerings', name: 'Sacrifices & Offerings' },
    { cat: 'Courts, Crimes, and Punishments', name: 'Justice & Courts' },
    { cat: 'Appointed Times', name: 'Appointed Times & Holy Days' },
    { cat: 'Idolatry', name: 'Idolatry' },
    { cat: 'Food', name: 'Biblical Food Laws' },
    { cat: 'Marriage and Family', name: 'Marriage & Family' },
    { cat: 'Levites & Priests', name: 'Priests & Levites' },
    { cat: 'Forbidden Sexual Relationships', name: 'Sexual Purity' },
    { cat: 'Love', name: 'Love' },
    { cat: 'Providing for the Poor', name: 'Charity & Caring for the Poor' },
    { cat: 'War and Battles', name: 'War & Battles' },
    { cat: 'Temple and Sacred Objects', name: 'The Temple' },
    { cat: 'G-d', name: 'Knowing God' },
    { cat: 'Morality', name: 'Morality & Ethics' },
  ];

  const categoryMap = new Map<string, Commandment[]>();
  for (const c of allCmds) {
    if (!categoryMap.has(c.category)) categoryMap.set(c.category, []);
    categoryMap.get(c.category)!.push(c);
  }

  for (const cfg of categoryConfigs) {
    const pool = categoryMap.get(cfg.cat);
    if (!pool || pool.length < 8) continue;

    const slugBase = cfg.name
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    configs.push({
      key: `${slugBase}-commandments`,
      title: `${cfg.name} Commandments Quiz - Biblical Commands About ${cfg.name}`,
      description: `Test your knowledge of the ${pool.length} biblical commandments related to ${cfg.name.toLowerCase()}. Covers ${pool.filter(c => c.polarity === 'P').length} positive and ${pool.filter(c => c.polarity === 'N').length} negative commandments from the Torah.`,
      slug: `${slugBase}-commandments-quiz`,
      tags: [cfg.name.toLowerCase(), 'commandments', 'bible quiz', 'torah', 'biblical law'],
      questionCount: Math.min(25, Math.max(15, pool.length)),
      pool: cfg.cat,
    });
  }

  return configs;
}

// =============================================================================
// PROMPT BUILDING
// =============================================================================

function buildCommandmentContext(cmds: Commandment[], maxItems: number = 100): string {
  const sample = cmds.length > maxItems
    ? cmds.filter((_, i) => i % Math.ceil(cmds.length / maxItems) === 0).slice(0, maxItems)
    : cmds;

  return sample.map(c =>
    `#${c.number} [${c.polarity === 'P' ? 'POSITIVE' : 'NEGATIVE'}] "${c.concept}" — ${formatRef(c.referenceId)} | Category: ${c.category} | Scripture: "${c.scriptureEnglish.slice(0, 150)}${c.scriptureEnglish.length > 150 ? '...' : ''}"`
  ).join('\n');
}

function buildPrompt(config: QuizConfig, poolCmds: Commandment[], allCmds: Commandment[]): string {
  const positive = poolCmds.filter(c => c.polarity === 'P').length;
  const negative = poolCmds.filter(c => c.polarity === 'N').length;
  const categories = [...new Set(poolCmds.map(c => c.category))];

  const mcCount = Math.round(config.questionCount * 0.7);
  const tfCount = Math.round(config.questionCount * 0.2);
  const fbCount = config.questionCount - mcCount - tfCount;

  let focusInstructions = '';

  if (config.pool === 'ten') {
    focusInstructions = `
FOCUS: The Ten Commandments (Exodus 20:2-17)
These are the most well-known commandments in the Bible. Questions should cover:
- What each commandment specifically says
- The order of the commandments
- The distinction between commandments about God (1-4) and about people (5-10)
- The context of Mount Sinai and Moses receiving them
- How the Ten Commandments relate to broader biblical law
- Key words and phrases in each commandment
- Common misconceptions about the Ten Commandments
`;
  } else if (config.pool === 'positive-negative') {
    focusInstructions = `
FOCUS: Distinguishing Positive vs Negative Commandments
The 613 commandments include ${positive} positive ("thou shalt") and ${negative} negative ("thou shalt not") commands.
Questions should heavily focus on:
- Identifying whether a specific commandment is positive or negative
- Understanding the difference between obligation and prohibition
- Counting how many positive vs negative exist in specific categories
- Identifying which book has the most positive/negative commandments
- Recognizing the traditional enumeration (248 positive = human bones, 365 negative = days of year)
`;
  } else if (config.pool === 'all') {
    focusInstructions = `
FOCUS: Comprehensive coverage of all 613 commandments
Spread questions across different books (Exodus, Leviticus, Numbers, Deuteronomy, Genesis).
Cover diverse categories: ${categories.slice(0, 8).join(', ')}, and more.
Include questions about:
- The overall structure (248 positive, 365 negative, why those numbers)
- Commandments from different categories
- Which book contains which commandments
- The relationship between commandments and their categories
- Famous/well-known commandments and obscure ones
- Scripture identification (matching commandments to their verses)
`;
  } else {
    // Category-specific
    focusInstructions = `
FOCUS: Commandments in the "${config.pool}" category
This category contains ${poolCmds.length} commandments (${positive} positive, ${negative} negative).
Questions should demonstrate deep knowledge of these specific commandments:
- What each commandment in this category says
- Which are positive vs negative
- Where they are found in Scripture
- How they relate to each other
- Practical understanding of what these commandments require
`;
  }

  const context = buildCommandmentContext(poolCmds);

  return `You are an expert Bible scholar creating a quiz about the biblical commandments (mitzvot).

Generate exactly ${config.questionCount} quiz questions based on the commandment data provided below.

${focusInstructions}

COMMANDMENT DATA (${poolCmds.length} commandments in this pool):
${context}

QUESTION DISTRIBUTION (STRICT):
- ${mcCount} multiple-choice questions (each with exactly 4 options)
- ${tfCount} true-false questions (options must be exactly ["True", "False"])
- ${fbCount} fill-in-the-blank questions (with exactly 4 options including the answer)

Mix difficulties: roughly 40% easy, 40% medium, 20% hard.

RULES:
- Every question MUST be directly grounded in the commandment data above.
- Every verseReference must cite a real biblical reference from the data (e.g., "Exodus 20:3").
- The correctAnswer MUST appear exactly in the options array.
- Multiple choice questions must have exactly 4 options.
- True/False questions must have exactly ["True", "False"] as options.
- Fill-in-the-blank questions must have exactly 4 options.
- Each explanation should be informative, citing the specific commandment number and verse.
- Do not repeat questions or focus on the same commandment for more than 2 questions.
- Questions should be varied: some about the commandment text, some about categories, some about polarity, some about the book/chapter location, some about the scripture itself.

Return ONLY valid JSON in this exact format:
{
  "questions": [
    {
      "question": "The question text",
      "type": "multiple-choice",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "Explanation citing the commandment",
      "verseReference": "Exodus 20:3"
    }
  ]
}`;
}

// =============================================================================
// OPENAI GENERATION
// =============================================================================

let _openai: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!_openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('Error: OPENAI_API_KEY not set');
      process.exit(1);
    }
    _openai = new OpenAI({ apiKey });
  }
  return _openai;
}

async function generateQuizQuestions(
  config: QuizConfig,
  poolCmds: Commandment[],
  allCmds: Commandment[]
): Promise<{ questions: AIQuestion[]; inputTokens: number; outputTokens: number; cost: number }> {

  const prompt = buildPrompt(config, poolCmds, allCmds);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await getOpenAI().chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert Bible scholar and quiz creator specializing in the 613 commandments (mitzvot). Always return valid JSON with exactly the structure requested. Never include markdown formatting or code fences.',
          },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: config.questionCount > 30 ? 16000 : 8000,
      });

      const content = response.choices[0]?.message?.content || '{}';
      const inputTokens = response.usage?.prompt_tokens || 0;
      const outputTokens = response.usage?.completion_tokens || 0;
      const cost = (inputTokens * INPUT_COST_PER_1M + outputTokens * OUTPUT_COST_PER_1M) / 1_000_000;

      let parsed: any;
      try {
        parsed = JSON.parse(content);
      } catch {
        if (attempt < MAX_RETRIES) { await sleep(2000); continue; }
        throw new Error('Failed to parse JSON from OpenAI');
      }

      let questions: AIQuestion[] = parsed.questions || [];

      // Auto-normalize common GPT mistakes
      for (const q of questions) {
        if ((q.type as string) === 'fill-in-the-blank') q.type = 'fill-blank';
        if ((q.type as string) === 'true/false') q.type = 'true-false';
      }

      // Trim if extra
      if (questions.length > config.questionCount) {
        questions = questions.slice(0, config.questionCount);
      }

      // Validate minimum
      if (questions.length >= config.questionCount * 0.8) {
        return { questions, inputTokens, outputTokens, cost };
      }

      if (attempt < MAX_RETRIES) {
        console.warn(`    Only got ${questions.length}/${config.questionCount} questions, retrying...`);
        await sleep(2000);
        continue;
      }

      return { questions, inputTokens, outputTokens, cost };
    } catch (err: any) {
      if (err.message?.includes('429') || err.message?.includes('rate_limit')) {
        const backoff = 5000 * attempt;
        console.warn(`    Rate limited, waiting ${backoff}ms...`);
        await sleep(backoff);
        continue;
      }
      if (attempt === MAX_RETRIES) throw err;
      await sleep(3000 * attempt);
    }
  }
  throw new Error('Failed after retries');
}

// =============================================================================
// QUIZ ASSEMBLY & OUTPUT
// =============================================================================

function assembleQuiz(config: QuizConfig, aiQuestions: AIQuestion[]) {
  const questions: QuizQuestion[] = aiQuestions.map((q, i) => ({
    id: `${config.key}-${i + 1}`,
    question: q.question,
    type: q.type,
    ...(q.type !== 'true-false' && q.options?.length ? { options: q.options } : { options: q.options }),
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    verseReference: q.verseReference,
    difficulty: i < Math.round(aiQuestions.length * 0.4) ? 'easy' as const
      : i < Math.round(aiQuestions.length * 0.8) ? 'medium' as const
      : 'hard' as const,
  }));

  return {
    id: config.key,
    title: config.title,
    description: config.description,
    type: 'commandment',
    questions,
    difficulty: 'medium',
    isBookQuiz: false,
    slug: config.slug,
    tags: config.tags,
    totalQuestions: questions.length,
    estimatedTime: Math.ceil(questions.length * 1.2),
  };
}

function writeQuiz(quiz: any, config: QuizConfig): string {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  const filePath = path.join(OUTPUT_DIR, `${config.key}.json`);
  fs.writeFileSync(filePath, JSON.stringify(quiz, null, 2), 'utf-8');
  return filePath;
}

// =============================================================================
// MAIN PIPELINE
// =============================================================================

async function generateOneQuiz(
  config: QuizConfig,
  allCmds: Commandment[],
  progress: ProgressData,
  force: boolean,
): Promise<number> {
  if (!force && progress.completed[config.key]) {
    console.log(`  Skipping ${config.key} (already generated, use --force to regenerate)`);
    return 0;
  }

  const startTime = Date.now();

  // Determine pool
  let poolCmds: Commandment[];
  if (config.pool === 'all') {
    poolCmds = allCmds;
  } else if (config.pool === 'ten') {
    poolCmds = allCmds.filter(c => c.book === 'exodus' && c.chapter === 20);
  } else if (config.pool === 'positive-negative') {
    poolCmds = allCmds;
  } else {
    poolCmds = allCmds.filter(c => c.category === config.pool);
  }

  console.log(`  Generating ${config.key} (${config.questionCount} questions from ${poolCmds.length} commandments)...`);

  const { questions, inputTokens, outputTokens, cost } = await generateQuizQuestions(config, poolCmds, allCmds);

  const quiz = assembleQuiz(config, questions);
  const filePath = writeQuiz(quiz, config);

  progress.completed[config.key] = true;
  progress.totalGenerated++;
  progress.totalCost += cost;
  saveProgress(progress);

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`  Done: ${config.key} (${elapsed}s, $${cost.toFixed(4)}, ${questions.length} questions, ${inputTokens} in / ${outputTokens} out)`);
  console.log(`    → ${filePath}`);

  return cost;
}

// =============================================================================
// CLI
// =============================================================================

function printUsage(): void {
  console.log(`
AI-Powered Commandment Quiz Generator (GPT-4.1-mini)
=====================================================

Usage:
  npx tsx scripts/generate-commandment-quizzes-ai.ts --all
  npx tsx scripts/generate-commandment-quizzes-ai.ts --quiz ten-commandments
  npx tsx scripts/generate-commandment-quizzes-ai.ts --quiz 613-commandments
  npx tsx scripts/generate-commandment-quizzes-ai.ts --list
  npx tsx scripts/generate-commandment-quizzes-ai.ts --all --force

Options:
  --all            Generate all commandment quizzes
  --quiz <key>     Generate a specific quiz by key
  --list           List all available quiz keys
  --force          Regenerate even if already completed
  --concurrency <n>  Parallel API calls (default: 1)
  -h, --help       Show this help message

Output:
  data/quizzes/{key}.json
`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('-h') || args.includes('--help')) {
    printUsage();
    return;
  }

  const allCmds = loadCommandments();
  const configs = buildQuizConfigs(allCmds);
  const force = args.includes('--force');

  if (args.includes('--list')) {
    console.log('Available commandment quizzes:');
    for (const c of configs) {
      console.log(`  ${c.key} (${c.questionCount} questions)`);
    }
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY not set');
    console.error('Set it with: export OPENAI_API_KEY=sk-your-key-here');
    process.exit(1);
  }

  const concurrencyIdx = args.indexOf('--concurrency');
  const concurrency = concurrencyIdx !== -1 && args[concurrencyIdx + 1]
    ? parseInt(args[concurrencyIdx + 1], 10) || 1
    : 1;

  const quizIdx = args.indexOf('--quiz');
  let targets: QuizConfig[];

  if (args.includes('--all')) {
    targets = configs;
  } else if (quizIdx !== -1 && args[quizIdx + 1]) {
    const key = args[quizIdx + 1];
    const found = configs.find(c => c.key === key);
    if (!found) {
      console.error(`Unknown quiz key: "${key}"`);
      console.error(`Available: ${configs.map(c => c.key).join(', ')}`);
      process.exit(1);
    }
    targets = [found];
  } else {
    printUsage();
    return;
  }

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const progress = loadProgress();

  console.log('AI Commandment Quiz Generator (GPT-4.1-mini)');
  console.log('=============================================');
  console.log(`${allCmds.length} commandments loaded`);
  console.log(`${targets.length} quizzes to generate (concurrency: ${concurrency})\n`);

  const startTime = Date.now();
  let totalCost = 0;
  let generated = 0;
  let failed = 0;

  // Process in concurrent batches
  for (let i = 0; i < targets.length; i += concurrency) {
    const batch = targets.slice(i, i + concurrency);
    const results = await Promise.allSettled(
      batch.map(async (config) => {
        const cost = await generateOneQuiz(config, allCmds, progress, force);
        return cost;
      })
    );

    for (const result of results) {
      if (result.status === 'fulfilled') {
        totalCost += result.value;
        if (result.value > 0) generated++;
      } else {
        console.error(`  FAILED: ${result.reason?.message || result.reason}`);
        failed++;
      }
    }

    if (i + concurrency < targets.length) await sleep(300);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('\n=============================================');
  console.log('Generation Complete!');
  console.log(`  Generated: ${generated} quizzes`);
  if (failed > 0) console.log(`  Failed: ${failed} quizzes`);
  console.log(`  Total cost: $${totalCost.toFixed(4)}`);
  console.log(`  Time elapsed: ${elapsed}s`);
  console.log(`  Cumulative cost: $${progress.totalCost.toFixed(4)}`);
  console.log('=============================================');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
