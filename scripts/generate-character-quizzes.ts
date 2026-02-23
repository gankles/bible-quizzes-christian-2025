#!/usr/bin/env npx tsx
/**
 * AI-Powered Bible Character Quiz Generator using OpenAI GPT-4.1-mini
 *
 * Generates 4-tab character quizzes (Easy/Medium/Hard/Theological × 15 questions = 60 per character)
 * for Jesus, Moses, David, Paul.
 *
 * Usage:
 *   npx tsx scripts/generate-character-quizzes.ts
 *   npx tsx scripts/generate-character-quizzes.ts --character jesus
 *   npx tsx scripts/generate-character-quizzes.ts --force
 *   npx tsx scripts/generate-character-quizzes.ts --dry-run
 */

import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';

// =============================================================================
// TYPES
// =============================================================================

type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank';
type DifficultyLevel = 'easy' | 'medium' | 'hard';
type TabLevel = 'easy' | 'medium' | 'hard' | 'theological';

interface QuizQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options: string[];
  correctAnswer: string;
  explanation: string;
  verseReference: string;
  difficulty: DifficultyLevel;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  type: 'character';
  character: string;
  questions: QuizQuestion[];
  difficulty: DifficultyLevel;
  isBookQuiz: false;
  slug: string;
  tags: string[];
  totalQuestions: number;
  estimatedTime: number;
}

interface TabbedQuiz {
  id: string;
  title: string;
  description: string;
  tabs: {
    easy: Quiz;
    medium: Quiz;
    hard: Quiz;
    theological: Quiz;
  };
}

interface CharacterConfig {
  slug: string;
  name: string;
  description: string;
  keyBooks: string;
  themes: string;
  tags: string[];
}

interface AIQuestion {
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options: string[];
  correctAnswer: string;
  explanation: string;
  verseReference: string;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const OUTPUT_DIR = path.resolve(SCRIPT_DIR, '..', 'data', 'quizzes');

const MAX_RETRIES = 3;
const INPUT_COST_PER_1M = 0.40;
const OUTPUT_COST_PER_1M = 1.60;
const OPENAI_RATE_LIMIT_MS = 500;

const CHARACTERS: CharacterConfig[] = [
  {
    slug: 'jesus',
    name: 'Jesus Christ',
    description: 'Test your knowledge about the life, ministry, teachings, miracles, death, and resurrection of Jesus Christ across the four Gospels and the New Testament.',
    keyBooks: 'Matthew, Mark, Luke, John, Acts, Hebrews, Revelation',
    themes: 'incarnation, miracles, parables, Sermon on the Mount, crucifixion, resurrection, ascension, Second Coming, teachings on the Kingdom of God, encounters with Pharisees, healing ministry, calling of disciples, Last Supper, Garden of Gethsemane, transfiguration',
    tags: ['jesus', 'christ', 'gospels', 'new testament', 'messiah', 'savior', 'son of god'],
  },
  {
    slug: 'moses',
    name: 'Moses',
    description: 'Test your knowledge about the life of Moses — from his birth in Egypt to leading Israel through the wilderness, receiving the Law at Sinai, and the journey to the Promised Land.',
    keyBooks: 'Exodus, Leviticus, Numbers, Deuteronomy, Acts 7, Hebrews 11',
    themes: 'birth and adoption by Pharaoh\'s daughter, burning bush, ten plagues, Passover, crossing the Red Sea, Mount Sinai and the Ten Commandments, golden calf, tabernacle, wilderness wanderings, rebellion of Korah, striking the rock, death on Mount Nebo, manna from heaven, bronze serpent',
    tags: ['moses', 'exodus', 'law', 'ten commandments', 'old testament', 'prophet', 'wilderness'],
  },
  {
    slug: 'david',
    name: 'King David',
    description: 'Test your knowledge about King David — the shepherd boy who became Israel\'s greatest king, a man after God\'s own heart, psalmist, and ancestor of the Messiah.',
    keyBooks: '1 Samuel 16-31, 2 Samuel, 1 Kings 1-2, 1 Chronicles 11-29, Psalms',
    themes: 'anointing by Samuel, defeating Goliath, friendship with Jonathan, fleeing from Saul, becoming king, conquest of Jerusalem, Ark of the Covenant, Bathsheba and Uriah, Absalom\'s rebellion, psalms of David, covenant with God, preparation for the temple, mighty men, numbering of Israel',
    tags: ['david', 'king', 'psalms', 'old testament', 'goliath', 'shepherd', 'israel'],
  },
  {
    slug: 'paul',
    name: 'Apostle Paul',
    description: 'Test your knowledge about the Apostle Paul — from his conversion on the Damascus Road to his missionary journeys, epistles, and imprisonment for the Gospel.',
    keyBooks: 'Acts 7-28, Romans, 1 & 2 Corinthians, Galatians, Ephesians, Philippians, Colossians, 1 & 2 Thessalonians, 1 & 2 Timothy, Titus, Philemon',
    themes: 'persecution of Christians as Saul, Damascus road conversion, ministry in Antioch, first missionary journey, Jerusalem Council, second and third missionary journeys, arrest in Jerusalem, trials before Felix/Festus/Agrippa, shipwreck on Malta, imprisonment in Rome, key doctrines (justification by faith, body of Christ, spiritual gifts, resurrection), thorn in the flesh',
    tags: ['paul', 'apostle', 'missionary', 'new testament', 'epistles', 'conversion', 'church'],
  },
];

// =============================================================================
// HELPERS
// =============================================================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// =============================================================================
// OPENAI API
// =============================================================================

let openaiClient: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('Error: OPENAI_API_KEY environment variable is required.');
      console.error('Set it with: export OPENAI_API_KEY=sk-your-key-here');
      process.exit(1);
    }
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

function buildPrompt(config: CharacterConfig, tab: TabLevel): string {
  const commonInstructions = `You are an expert Bible scholar and quiz creator. Generate exactly 15 quiz questions about ${config.name} in the Bible.

KEY BIBLE BOOKS: ${config.keyBooks}

THEMES TO COVER: ${config.themes}

IMPORTANT RULES:
- Every question MUST be directly grounded in specific Bible passages about ${config.name}.
- Every verseReference must cite a specific verse (e.g., "Exodus 3:2" or "Matthew 4:18-19").
- The correctAnswer MUST appear exactly in the options array.
- Multiple choice questions must have exactly 4 options.
- True/False questions must have exactly 2 options: ["True", "False"].
- Fill-in-the-blank questions must have exactly 4 options.
- Each explanation should cite the specific verse and briefly explain why the answer is correct.
- Cover a wide range of events and passages from ${config.name}'s life — do not cluster questions from one book or event.
- Do not repeat questions or verse references.

Return ONLY valid JSON in this exact format:
{
  "questions": [
    {
      "question": "The question text",
      "type": "multiple-choice",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "Explanation citing the verse",
      "verseReference": "Book Chapter:Verse"
    }
  ]
}`;

  switch (tab) {
    case 'easy':
      return `${commonInstructions}

DIFFICULTY: EASY — Basic Recognition & Simple Facts

Focus on:
- Simple factual recall about ${config.name}'s life
- "What/Who/Where/When" questions
- Basic events, locations, and people associated with ${config.name}
- Direct quotes and well-known facts

Question type distribution (STRICT):
- 10-11 multiple-choice questions (70%)
- 3 true/false questions (20%)
- 1-2 fill-in-the-blank questions (10%)`;

    case 'medium':
      return `${commonInstructions}

DIFFICULTY: MEDIUM — Practical Christian Application

Focus on traditional, practical Christian living grounded in ${config.name}'s life and teachings:
- Faith, trust in God, obedience to His Word
- Prayer, personal devotion, spiritual discipline
- Evangelism, sharing the Gospel, being a witness
- Marriage, family life, parenting with biblical wisdom
- Work ethic, honesty, integrity in daily life
- Generosity, stewardship, serving others
- Forgiveness, reconciliation, love for neighbors
- Dealing with temptation, perseverance through trials
- Humility, contentment, gratitude

Frame questions as: "How does ${config.name}'s example teach us about [biblical virtue]?"
Use scenarios like: "A fellow believer is struggling with [common challenge]. Based on ${config.name}'s experience in [passage], what biblical truth would you share?"

CRITICAL — DO NOT use these patterns:
- No social justice or activism framing
- No environmental activism language
- No "inherent worth/dignity" repetition
- No sensitivity-training scenarios
- No culture-war topics or politically charged framing

Question type distribution (STRICT):
- 12 multiple-choice questions (80%)
- 2 true/false questions (15%)
- 1 fill-in-the-blank question (5%)

Each explanation should reference 3-5 supporting Scripture verses.`;

    case 'hard':
      return `${commonInstructions}

DIFFICULTY: HARD — Analysis & Cross-Biblical Connections

Focus on:
- Cross-biblical connections: how ${config.name}'s life connects to other parts of Scripture
- Literary structure and devices (typology, foreshadowing, chiasm)
- Hebrew or Greek word studies related to ${config.name}
- Historical and cultural context
- How themes from ${config.name}'s life develop across Scripture
- Intertextual connections and allusions
- Specific details that require careful reading

Question type distribution (STRICT):
- 13-14 multiple-choice questions (90%)
- 1-2 true/false questions (10%)`;

    case 'theological':
      return `${commonInstructions}

DIFFICULTY: THEOLOGICAL — Advanced Biblical Theology

Focus on:
- Seminary-level doctrinal questions about ${config.name}'s significance
- Systematic theology: what does ${config.name}'s life teach about God, humanity, sin, salvation?
- Biblical theology: how does ${config.name} fit into the grand narrative of Scripture?
- Core Christian doctrines that all orthodox believers share
- Attributes of God revealed through ${config.name}'s life
- Christological connections and messianic themes
- Typological significance

CRITICAL — AVOID denominational controversies:
- Do not take sides on Reformed vs. Arminian debates
- Do not reference specific denominational distinctives
- Focus on truths affirmed across the historic Christian creeds

Question type distribution (STRICT):
- All 15 questions must be multiple-choice (100%)

Each explanation should reference 4-5 supporting Scripture verses showing biblical consistency across Old and New Testaments.`;

    default:
      throw new Error(`Unknown tab: ${tab}`);
  }
}

async function generateTabQuestions(
  config: CharacterConfig,
  tab: TabLevel
): Promise<{ questions: AIQuestion[]; cost: number }> {
  const client = getOpenAI();
  const prompt = buildPrompt(config, tab);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await client.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert Bible scholar and quiz creator. You always return valid JSON with exactly the structure requested. You never include markdown formatting or code fences in your response.'
          },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 5000,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('Empty response from OpenAI');

      const parsed = JSON.parse(content);
      let questions: AIQuestion[] = parsed.questions;

      // Normalize
      for (const q of questions) {
        if ((q.type as string) === 'fill-in-the-blank') q.type = 'fill-blank';
      }
      if (questions.length > 15) questions = questions.slice(0, 15);

      // Fix correctAnswer mismatches
      for (const q of questions) {
        if (q.options && !q.options.includes(q.correctAnswer)) {
          const match = q.options.find((o: string) =>
            o.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()
          );
          if (match) q.correctAnswer = match;
        }
      }

      const inputTokens = response.usage?.prompt_tokens || 0;
      const outputTokens = response.usage?.completion_tokens || 0;
      const cost = (inputTokens / 1_000_000) * INPUT_COST_PER_1M + (outputTokens / 1_000_000) * OUTPUT_COST_PER_1M;

      return { questions, cost };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);

      if (msg.includes('429') || msg.includes('rate_limit')) {
        const backoff = 5000 * attempt;
        console.warn(`    Rate limited, waiting ${backoff}ms...`);
        await sleep(backoff);
        continue;
      }

      if (attempt >= MAX_RETRIES) throw err;
      console.warn(`    Error: ${msg}, retrying...`);
      await sleep(2000 * attempt);
    }
  }

  throw new Error(`Failed after ${MAX_RETRIES} attempts`);
}

function assembleTabQuiz(
  config: CharacterConfig,
  tab: TabLevel,
  aiQuestions: AIQuestion[]
): Quiz {
  const difficultyMap: Record<TabLevel, DifficultyLevel> = {
    easy: 'easy', medium: 'medium', hard: 'hard', theological: 'hard',
  };

  const timeMap: Record<TabLevel, number> = {
    easy: 8, medium: 12, hard: 15, theological: 25,
  };

  const descriptionMap: Record<TabLevel, string> = {
    easy: `Perfect for beginners! Test your basic knowledge of ${config.name} in the Bible.`,
    medium: `Apply biblical truths from ${config.name}'s life to real-life situations.`,
    hard: `Challenge yourself with deep analysis and cross-biblical connections about ${config.name}.`,
    theological: `Deep biblical theology exploring ${config.name}'s significance in God's redemptive plan.`,
  };

  const questions: QuizQuestion[] = aiQuestions.map((q, i) => ({
    id: `${config.slug}-${tab}-q${i + 1}`,
    question: q.question,
    type: q.type,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    verseReference: q.verseReference,
    difficulty: difficultyMap[tab],
  }));

  return {
    id: `${config.slug}-character-${tab}`,
    title: `${config.name} Quiz - ${capitalize(tab)} Level`,
    description: descriptionMap[tab],
    type: 'character',
    character: config.name,
    questions,
    difficulty: difficultyMap[tab],
    isBookQuiz: false,
    slug: `${config.slug}-quiz`,
    tags: [...config.tags, tab],
    totalQuestions: questions.length,
    estimatedTime: timeMap[tab],
  };
}

async function generateFullCharacterQuiz(config: CharacterConfig): Promise<{ tabbedQuiz: TabbedQuiz; cost: number }> {
  const tabOrder: TabLevel[] = ['easy', 'medium', 'hard', 'theological'];
  const tabQuizzes: Record<string, Quiz> = {};
  let totalCost = 0;

  for (const tab of tabOrder) {
    console.log(`    Generating ${tab} tab...`);
    const { questions, cost } = await generateTabQuestions(config, tab);
    totalCost += cost;

    tabQuizzes[tab] = assembleTabQuiz(config, tab, questions);
    console.log(`    ${tab}: ${questions.length} questions — $${cost.toFixed(4)}`);
    await sleep(OPENAI_RATE_LIMIT_MS);
  }

  const tabbedQuiz: TabbedQuiz = {
    id: `${config.slug}-character-tabbed`,
    title: `${config.name} Quiz - Multi-Level`,
    description: config.description,
    tabs: {
      easy: tabQuizzes.easy,
      medium: tabQuizzes.medium,
      hard: tabQuizzes.hard,
      theological: tabQuizzes.theological,
    },
  };

  return { tabbedQuiz, cost: totalCost };
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const force = args.includes('--force');
  const charArg = args.indexOf('--character');
  const targetChar = charArg >= 0 ? args[charArg + 1]?.toLowerCase() : null;

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Bible Character Quiz Generator — Tabbed (GPT-4.1-mini)');
  console.log('=======================================================\n');

  const targets = targetChar
    ? CHARACTERS.filter(c => c.slug === targetChar)
    : CHARACTERS;

  if (targets.length === 0) {
    console.error(`Unknown character: ${targetChar}`);
    console.error(`Available: ${CHARACTERS.map(c => c.slug).join(', ')}`);
    process.exit(1);
  }

  console.log(`Generating ${targets.length} character(s) × 4 tabs × 15 questions = ${targets.length * 60} questions\n`);

  let totalCost = 0;

  for (const config of targets) {
    const outputPath = path.join(OUTPUT_DIR, `${config.slug}-character-tabbed.json`);
    const simplePath = path.join(OUTPUT_DIR, `${config.slug}-character.json`);

    if (fs.existsSync(outputPath) && !force) {
      console.log(`  ${config.name}: Already exists (use --force to regenerate)\n`);
      continue;
    }

    if (dryRun) {
      console.log(`  [DRY RUN] Would generate ${config.name} quiz (60 questions)\n`);
      continue;
    }

    console.log(`  Generating ${config.name} quiz (4 tabs × 15 questions)...`);
    const { tabbedQuiz, cost } = await generateFullCharacterQuiz(config);
    totalCost += cost;

    // Save tabbed version
    fs.writeFileSync(outputPath, JSON.stringify(tabbedQuiz, null, 2), 'utf-8');
    console.log(`  Saved: ${outputPath}`);

    // Also save the easy tab as the simple character quiz (for QuizPage compatibility)
    fs.writeFileSync(simplePath, JSON.stringify(tabbedQuiz.tabs.easy, null, 2), 'utf-8');
    console.log(`  Saved: ${simplePath}\n`);

    await sleep(1000);
  }

  console.log('=======================================================');
  console.log(`Total cost: $${totalCost.toFixed(4)}`);
  console.log('Done!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
