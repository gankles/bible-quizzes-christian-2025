/**
 * Generate commandment-themed quiz JSON files from BibleData-Commandments.csv.
 *
 * Creates:
 *  - ten-commandments-quiz.json  (25 questions about Exodus 20)
 *  - 613-commandments-quiz.json  (25 questions across all 613)
 *  - Category quizzes for the top categories
 *
 * Usage: npx tsx scripts/generate-commandment-quizzes.ts
 */

import fs from 'fs';
import path from 'path';

interface Commandment {
  number: number;
  concept: string;
  polarity: 'P' | 'N';
  referenceId: string;
  scriptureEnglish: string;
  category: string;
  book: string;
  chapter: number;
  parashah: string;
  mishnahTorahCategory: string;
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

const USX_TO_SLUG: Record<string, string> = {
  GEN: 'genesis', EXO: 'exodus', LEV: 'leviticus', NUM: 'numbers', DEU: 'deuteronomy',
};
const USX_TO_NAME: Record<string, string> = {
  GEN: 'Genesis', EXO: 'Exodus', LEV: 'Leviticus', NUM: 'Numbers', DEU: 'Deuteronomy',
};

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
      parashah: r[7],
      mishnahTorahCategory: r[11],
    };
  });
}

function formatRef(refId: string): string {
  const match = refId.match(/^([A-Z0-9]+)\s+(.+)$/);
  if (!match) return refId;
  return `${USX_TO_NAME[match[1]] || match[1]} ${match[2]}`;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

function pickDistractors(correct: string, pool: string[], count: number): string[] {
  const filtered = pool.filter(x => x !== correct);
  return pickRandom(filtered, count);
}

// ── Question generators ──

function genConceptQuestion(cmd: Commandment, allCmds: Commandment[], id: string, difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion {
  const conceptPool = allCmds.map(c => c.concept);
  const distractors = pickDistractors(cmd.concept, conceptPool, 3);
  const options = shuffle([cmd.concept, ...distractors]);
  return {
    id,
    question: `According to ${formatRef(cmd.referenceId)}, which of the following is a biblical commandment?`,
    type: 'multiple-choice',
    options,
    correctAnswer: cmd.concept,
    explanation: `Commandment #${cmd.number}: "${cmd.concept}" is found in ${formatRef(cmd.referenceId)}.`,
    verseReference: formatRef(cmd.referenceId),
    difficulty,
  };
}

function genPolarityQuestion(cmd: Commandment, id: string, difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion {
  const isPositive = cmd.polarity === 'P';
  return {
    id,
    question: `"${cmd.concept}" is a positive commandment (something you should do).`,
    type: 'true-false',
    options: ['True', 'False'],
    correctAnswer: isPositive ? 'True' : 'False',
    explanation: `"${cmd.concept}" is a ${isPositive ? 'positive' : 'negative'} commandment (#${cmd.number}) — a "${isPositive ? 'thou shalt' : 'thou shalt not'}" command from ${formatRef(cmd.referenceId)}.`,
    verseReference: formatRef(cmd.referenceId),
    difficulty,
  };
}

function genBookQuestion(cmd: Commandment, allCmds: Commandment[], id: string, difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion {
  const correctBook = USX_TO_NAME[cmd.referenceId.split(' ')[0]] || cmd.book;
  const allBooks = [...new Set(allCmds.map(c => USX_TO_NAME[c.referenceId.split(' ')[0]] || c.book))];
  const distractors = pickDistractors(correctBook, allBooks, 3);
  const options = shuffle([correctBook, ...distractors]);
  return {
    id,
    question: `In which book of the Bible is the commandment "${cmd.concept}" found?`,
    type: 'multiple-choice',
    options,
    correctAnswer: correctBook,
    explanation: `"${cmd.concept}" (Commandment #${cmd.number}) is found in ${formatRef(cmd.referenceId)}.`,
    verseReference: formatRef(cmd.referenceId),
    difficulty,
  };
}

function genCategoryQuestion(cmd: Commandment, allCmds: Commandment[], id: string, difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion {
  const allCats = [...new Set(allCmds.map(c => c.category))];
  const distractors = pickDistractors(cmd.category, allCats, 3);
  const options = shuffle([cmd.category, ...distractors]);
  return {
    id,
    question: `The commandment "${cmd.concept}" falls under which category?`,
    type: 'multiple-choice',
    options,
    correctAnswer: cmd.category,
    explanation: `"${cmd.concept}" (#${cmd.number}) belongs to the "${cmd.category}" category of biblical commandments.`,
    verseReference: formatRef(cmd.referenceId),
    difficulty,
  };
}

function genNumberQuestion(cmd: Commandment, id: string, difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion {
  const correct = cmd.number;
  const distractors: number[] = [];
  while (distractors.length < 3) {
    const d = correct + Math.floor(Math.random() * 40) - 20;
    if (d > 0 && d <= 613 && d !== correct && !distractors.includes(d)) {
      distractors.push(d);
    }
  }
  const options = shuffle([correct, ...distractors]).map(String);
  return {
    id,
    question: `"${cmd.concept}" is traditionally listed as which commandment number?`,
    type: 'multiple-choice',
    options,
    correctAnswer: String(correct),
    explanation: `"${cmd.concept}" is Commandment #${cmd.number}, found in ${formatRef(cmd.referenceId)}.`,
    verseReference: formatRef(cmd.referenceId),
    difficulty,
  };
}

function genCountQuestion(pool: Commandment[], subject: string, id: string, difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion {
  const positive = pool.filter(c => c.polarity === 'P').length;
  const negative = pool.filter(c => c.polarity === 'N').length;
  const isPositive = Math.random() > 0.5;
  const correct = isPositive ? positive : negative;
  const distractors: number[] = [];
  while (distractors.length < 3) {
    const d = correct + Math.floor(Math.random() * 60) - 30;
    if (d > 0 && d !== correct && !distractors.includes(d)) {
      distractors.push(d);
    }
  }
  const options = shuffle([correct, ...distractors]).map(String);
  return {
    id,
    question: `How many ${isPositive ? 'positive ("thou shalt")' : 'negative ("thou shalt not")'} commandments are there in ${subject}?`,
    type: 'multiple-choice',
    options,
    correctAnswer: String(correct),
    explanation: `${subject} contains ${positive} positive and ${negative} negative commandments, for a total of ${pool.length}.`,
    verseReference: pool[0] ? formatRef(pool[0].referenceId) : '',
    difficulty,
  };
}

function genFillBlankQuestion(cmd: Commandment, id: string, difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion {
  // Extract a key word from the concept
  const words = cmd.concept.split(/\s+/);
  const keyWordIndex = words.length > 3 ? Math.min(3, words.length - 1) : words.length - 1;
  const keyWord = words[keyWordIndex].replace(/[^a-zA-Z'-]/g, '');
  const blanked = words.map((w, i) => i === keyWordIndex ? '____' : w).join(' ');

  return {
    id,
    question: `Fill in the blank: Commandment #${cmd.number} instructs to "${blanked}"`,
    type: 'fill-blank',
    options: [keyWord],
    correctAnswer: keyWord,
    explanation: `The full commandment is: "${cmd.concept}" (${formatRef(cmd.referenceId)}).`,
    verseReference: formatRef(cmd.referenceId),
    difficulty,
  };
}

// ── Quiz builder ──

function buildQuiz(
  pool: Commandment[],
  allCmds: Commandment[],
  quizId: string,
  title: string,
  description: string,
  slug: string,
  tags: string[],
  questionCount: number = 25,
) {
  // Distribution: 70% MC, 20% TF, 10% FB
  const mcCount = Math.round(questionCount * 0.7);
  const tfCount = Math.round(questionCount * 0.2);
  const fbCount = questionCount - mcCount - tfCount;

  // Difficulty: ~40% easy, ~40% medium, ~20% hard
  const difficulties: Array<'easy' | 'medium' | 'hard'> = [];
  for (let i = 0; i < questionCount; i++) {
    if (i < Math.round(questionCount * 0.4)) difficulties.push('easy');
    else if (i < Math.round(questionCount * 0.8)) difficulties.push('medium');
    else difficulties.push('hard');
  }

  const questions: QuizQuestion[] = [];
  const usedCmds = new Set<number>();

  function pickCmd(): Commandment {
    const available = pool.filter(c => !usedCmds.has(c.number));
    const cmd = available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : pool[Math.floor(Math.random() * pool.length)];
    usedCmds.add(cmd.number);
    return cmd;
  }

  // MC questions (varied generators)
  const mcGenerators = [genConceptQuestion, genBookQuestion, genCategoryQuestion, genNumberQuestion];
  for (let i = 0; i < mcCount; i++) {
    const cmd = pickCmd();
    const gen = mcGenerators[i % mcGenerators.length];
    const diff = difficulties[i];
    // For count questions, swap in occasionally
    if (i % 5 === 4 && pool.length > 5) {
      questions.push(genCountQuestion(pool, title.split(' - ')[0], `${quizId}-${i + 1}`, diff));
    } else {
      questions.push(gen(cmd, allCmds, `${quizId}-${i + 1}`, diff));
    }
  }

  // TF questions
  for (let i = 0; i < tfCount; i++) {
    const cmd = pickCmd();
    const diff = difficulties[mcCount + i];
    questions.push(genPolarityQuestion(cmd, `${quizId}-${mcCount + i + 1}`, diff));
  }

  // FB questions
  for (let i = 0; i < fbCount; i++) {
    const cmd = pickCmd();
    const diff = difficulties[mcCount + tfCount + i];
    questions.push(genFillBlankQuestion(cmd, `${quizId}-${mcCount + tfCount + i + 1}`, diff));
  }

  return {
    id: quizId,
    title,
    description,
    type: 'commandment',
    questions: shuffle(questions),
    difficulty: 'medium',
    isBookQuiz: false,
    slug,
    tags,
    totalQuestions: questions.length,
    estimatedTime: Math.ceil(questions.length * 1.2),
  };
}

// ── Main ──

function main() {
  const allCmds = loadCommandments();
  const outDir = path.join(process.cwd(), 'data', 'quizzes');
  let quizzesCreated = 0;

  // 1. Ten Commandments Quiz (Exodus 20)
  const tenCmds = allCmds.filter(c => c.book === 'exodus' && c.chapter === 20);
  const tenQuiz = buildQuiz(
    tenCmds, allCmds,
    'ten-commandments-quiz',
    'The Ten Commandments Quiz - Test Your Knowledge of Exodus 20',
    'How well do you know the Ten Commandments? Test your knowledge of the foundational commandments given by God to Moses at Mount Sinai in Exodus 20. Covers all ten commandments with their biblical context and meaning.',
    'ten-commandments-quiz',
    ['ten commandments', 'exodus 20', 'mount sinai', 'moses', 'gods law', 'bible commandments'],
    25,
  );
  fs.writeFileSync(path.join(outDir, 'ten-commandments-quiz.json'), JSON.stringify(tenQuiz, null, 2));
  console.log(`Created: ten-commandments-quiz.json (${tenQuiz.totalQuestions} questions from ${tenCmds.length} commandments)`);
  quizzesCreated++;

  // 2. 613 Commandments Quiz (all)
  const allQuiz = buildQuiz(
    allCmds, allCmds,
    '613-commandments-quiz',
    'The 613 Commandments Quiz - Complete Biblical Law Knowledge Test',
    'Test your knowledge of all 613 biblical commandments (mitzvot) from the Torah. 50 questions covering positive and negative commandments from Genesis through Deuteronomy, spanning categories from worship to food laws to justice.',
    '613-commandments-quiz',
    ['613 commandments', 'mitzvot', 'torah commandments', 'biblical law', 'gods commandments', 'bible quiz'],
    50,
  );
  fs.writeFileSync(path.join(outDir, '613-commandments-quiz.json'), JSON.stringify(allQuiz, null, 2));
  console.log(`Created: 613-commandments-quiz.json (${allQuiz.totalQuestions} questions from ${allCmds.length} commandments)`);
  quizzesCreated++;

  // 3. Positive vs Negative Commandments Quiz
  const polarityQuiz = buildQuiz(
    allCmds, allCmds,
    'positive-negative-commandments-quiz',
    'Positive vs Negative Commandments Quiz - Thou Shalt vs Thou Shalt Not',
    'Can you tell the difference between a positive commandment ("thou shalt") and a negative commandment ("thou shalt not")? Test your knowledge of the 248 positive and 365 negative commandments in the Bible.',
    'positive-negative-commandments-quiz',
    ['positive commandments', 'negative commandments', 'thou shalt', 'thou shalt not', 'bible quiz'],
    25,
  );
  fs.writeFileSync(path.join(outDir, 'positive-negative-commandments-quiz.json'), JSON.stringify(polarityQuiz, null, 2));
  console.log(`Created: positive-negative-commandments-quiz.json`);
  quizzesCreated++;

  // 4. Category quizzes (top categories with enough commandments)
  const categoryMap = new Map<string, Commandment[]>();
  for (const c of allCmds) {
    if (!categoryMap.has(c.category)) categoryMap.set(c.category, []);
    categoryMap.get(c.category)!.push(c);
  }

  const categoryQuizConfigs = [
    { cat: 'Sacrifices and Offerings', slug: 'sacrifices-commandments-quiz', name: 'Sacrifices & Offerings' },
    { cat: 'Courts, Crimes, and Punishments', slug: 'justice-commandments-quiz', name: 'Justice & Courts' },
    { cat: 'Appointed Times', slug: 'appointed-times-commandments-quiz', name: 'Appointed Times & Holy Days' },
    { cat: 'Idolatry', slug: 'idolatry-commandments-quiz', name: 'Idolatry' },
    { cat: 'Food', slug: 'food-commandments-quiz', name: 'Biblical Food Laws' },
    { cat: 'Marriage and Family', slug: 'marriage-commandments-quiz', name: 'Marriage & Family' },
    { cat: 'Levites & Priests', slug: 'priests-commandments-quiz', name: 'Priests & Levites' },
    { cat: 'Forbidden Sexual Relationships', slug: 'purity-commandments-quiz', name: 'Sexual Purity' },
    { cat: 'Love', slug: 'love-commandments-quiz', name: 'Love' },
    { cat: 'Providing for the Poor', slug: 'charity-commandments-quiz', name: 'Charity & Caring for the Poor' },
    { cat: 'War and Battles', slug: 'war-commandments-quiz', name: 'War & Battles' },
    { cat: 'Temple and Sacred Objects', slug: 'temple-commandments-quiz', name: 'The Temple' },
    { cat: 'G-d', slug: 'god-commandments-quiz', name: 'Knowing God' },
    { cat: 'Morality', slug: 'morality-commandments-quiz', name: 'Morality & Ethics' },
  ];

  for (const cfg of categoryQuizConfigs) {
    const pool = categoryMap.get(cfg.cat);
    if (!pool || pool.length < 8) {
      console.log(`SKIP: ${cfg.cat} (only ${pool?.length || 0} commandments — need at least 8)`);
      continue;
    }

    const qCount = Math.min(25, Math.max(15, pool.length));
    const quiz = buildQuiz(
      pool, allCmds,
      cfg.slug,
      `${cfg.name} Commandments Quiz - Biblical Commands About ${cfg.name}`,
      `Test your knowledge of the ${pool.length} biblical commandments related to ${cfg.name.toLowerCase()}. Covers ${pool.filter(c => c.polarity === 'P').length} positive and ${pool.filter(c => c.polarity === 'N').length} negative commandments from the Torah.`,
      cfg.slug,
      [cfg.name.toLowerCase(), 'commandments', 'bible quiz', 'torah', 'biblical law'],
      qCount,
    );
    fs.writeFileSync(path.join(outDir, `${cfg.slug}.json`), JSON.stringify(quiz, null, 2));
    console.log(`Created: ${cfg.slug}.json (${quiz.totalQuestions} questions from ${pool.length} commandments)`);
    quizzesCreated++;
  }

  console.log(`\nDone! Created ${quizzesCreated} commandment quizzes.`);
}

main();
