import fs from 'fs';
import path from 'path';

export interface ReadingDay {
  day: number;
  readings: string[];
  theme: string;
}

export interface ReadingPlan {
  title: string;
  slug: string;
  description: string;
  totalDays: number;
  category: 'Full Bible' | 'Old Testament' | 'New Testament';
  days: ReadingDay[];
}

// ── Title and description mapping ──

const PLAN_TITLES: Record<string, string> = {
  chronological_plan: 'Chronological Bible Reading Plan',
  one_year_plan: 'One Year Bible Reading Plan',
  pentateuch_40: 'Pentateuch in 40 Days',
  gospels_acts_30: 'Gospels & Acts in 30 Days',
  historical_45: 'Historical Books in 45 Days',
  minor_prophets_14: 'Minor Prophets in 14 Days',
  nt_90_days: 'New Testament in 90 Days',
  paul_epistles_30: "Paul's Epistles in 30 Days",
  prophets_60: 'Prophets in 60 Days',
  psalms_proverbs: 'Psalms & Proverbs in 31 Days',
  wisdom_30: 'Wisdom Literature in 30 Days',
  general_epistles_14: 'General Epistles in 14 Days',
};

const PLAN_DESCRIPTIONS: Record<string, string> = {
  chronological_plan:
    'Read the entire Bible in one year arranged in the order events occurred, from Creation through the early church.',
  one_year_plan:
    'A balanced daily plan pairing Old Testament, New Testament, and Psalms readings to cover the whole Bible in one year.',
  pentateuch_40:
    'Journey through the five books of Moses in 40 days, from Genesis through Deuteronomy.',
  gospels_acts_30:
    'Read all four Gospels and the book of Acts in 30 days, covering the life and ministry of Jesus and the birth of the church.',
  historical_45:
    'Walk through the Old Testament historical books in 45 days, from Joshua to Esther.',
  minor_prophets_14:
    'Study all twelve Minor Prophets in just 14 days, from Hosea to Malachi.',
  nt_90_days:
    'Read the entire New Testament in 90 days with a steady, manageable pace.',
  paul_epistles_30:
    "Cover all of Paul's letters in 30 days, from Romans through Philemon.",
  prophets_60:
    'Read through all the prophetic books in 60 days, including both major and minor prophets.',
  psalms_proverbs:
    'A month-long devotional plan through the Psalms and Proverbs, one chapter of Proverbs per day.',
  wisdom_30:
    'Explore the wisdom literature of the Bible in 30 days: Job, Psalms, Proverbs, Ecclesiastes, and Song of Solomon.',
  general_epistles_14:
    'Read the general epistles in 14 days: Hebrews, James, 1-2 Peter, 1-3 John, and Jude.',
};

const PLAN_CATEGORIES: Record<string, ReadingPlan['category']> = {
  chronological_plan: 'Full Bible',
  one_year_plan: 'Full Bible',
  pentateuch_40: 'Old Testament',
  historical_45: 'Old Testament',
  prophets_60: 'Old Testament',
  minor_prophets_14: 'Old Testament',
  wisdom_30: 'Old Testament',
  psalms_proverbs: 'Old Testament',
  gospels_acts_30: 'New Testament',
  nt_90_days: 'New Testament',
  paul_epistles_30: 'New Testament',
  general_epistles_14: 'New Testament',
};

// ── Cache ──

let cachedPlans: ReadingPlan[] | null = null;

function keyToSlug(key: string): string {
  return key.replace(/_/g, '-');
}

function loadAllPlans(): ReadingPlan[] {
  if (cachedPlans) return cachedPlans;

  const dir = path.join(process.cwd(), 'data', 'kjvstudy', 'reading_plans');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

  const plans: ReadingPlan[] = [];

  for (const file of files) {
    const key = file.replace('.json', '');
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const parsed = JSON.parse(raw);
    const days: ReadingDay[] = parsed[key] || [];

    plans.push({
      title: PLAN_TITLES[key] || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      slug: keyToSlug(key),
      description: PLAN_DESCRIPTIONS[key] || `A ${days.length}-day Bible reading plan.`,
      totalDays: days.length,
      category: PLAN_CATEGORIES[key] || 'Full Bible',
      days,
    });
  }

  // Sort: Full Bible first, then OT, then NT; within each category sort by totalDays desc
  const categoryOrder: Record<string, number> = { 'Full Bible': 0, 'Old Testament': 1, 'New Testament': 2 };
  plans.sort((a, b) => {
    const catDiff = (categoryOrder[a.category] ?? 9) - (categoryOrder[b.category] ?? 9);
    if (catDiff !== 0) return catDiff;
    return b.totalDays - a.totalDays;
  });

  cachedPlans = plans;
  return plans;
}

// ── Public API ──

export function getAllReadingPlans(): ReadingPlan[] {
  return loadAllPlans();
}

export function getReadingPlanBySlug(slug: string): ReadingPlan | undefined {
  return loadAllPlans().find(p => p.slug === slug);
}

export function getReadingPlansStats() {
  const plans = loadAllPlans();
  const totalReadings = plans.reduce(
    (sum, p) => sum + p.days.reduce((s, d) => s + d.readings.length, 0),
    0,
  );
  return {
    totalPlans: plans.length,
    totalDaysAcrossPlans: plans.reduce((s, p) => s + p.totalDays, 0),
    totalReadings,
    categories: [...new Set(plans.map(p => p.category))],
  };
}
