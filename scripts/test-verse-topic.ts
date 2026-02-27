import fs from 'fs';
import path from 'path';

interface QuoteTopic {
  slug: string;
  name: string;
  verseRefs: string[];
  verseCount: number;
  category: string;
}

const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'bible-quotes.json'), 'utf-8'));
const topics: QuoteTopic[] = data.topics;

// Priority topic names — common Bible themes people actually search for
const PRIORITY_TOPICS = new Set([
  'Love', 'Faith', 'Hope', 'Prayer', 'Salvation', 'Grace', 'Forgiveness',
  'Peace', 'Strength', 'Courage', 'Wisdom', 'Joy', 'Healing', 'Patience',
  'Trust', 'Mercy', 'Obedience', 'Righteousness', 'Humility', 'Truth',
  'Worship', 'Gratitude', 'Comfort', 'Protection', 'Guidance', 'Provision',
  'Marriage', 'Family', 'Children', 'Friendship', 'Unity', 'Generosity',
  'Holiness', 'Repentance', 'Eternal Life', 'Heaven', 'Hell', 'Sin',
  'Temptation', 'Anxiety', 'Fear', 'Anger', 'Pride', 'Jealousy',
  'Money', 'Work', 'Leadership', 'Servanthood', 'Evangelism', 'Discipleship',
  'Creation', 'Prophecy', 'Resurrection', 'Redemption', 'Covenant',
  'Blessing', 'Judgment', 'Justice', 'Compassion', 'Contentment',
  'Perseverance', 'Faithfulness', 'Kindness', 'Goodness', 'Self-Control',
  'Death', 'Suffering', 'Trials', 'Victory', 'Freedom', 'Praise',
  'Thanksgiving', 'Fasting', 'Tithing', 'Baptism', 'Holy Spirit',
  'Charity', 'Godly Living', 'Born Again', 'Atonement', 'Sacrifice',
]);

// Skip these — too generic to be useful in a title
const SKIP_NAMES = new Set([
  'God', 'Jesus', 'Christ', 'Bible', 'Psalms', 'Scripture', 'Readings Select',
  'Israel', 'Word Of God', 'Lord', 'Spirit',
]);

const verseToTopic = new Map<string, string>();

// Pass 1: Priority topics only (sorted by specificity — smaller = more specific)
const priorityTopics = topics
  .filter(t => PRIORITY_TOPICS.has(t.name))
  .sort((a, b) => a.verseCount - b.verseCount);

for (const topic of priorityTopics) {
  for (const ref of topic.verseRefs) {
    if (!verseToTopic.has(ref)) {
      verseToTopic.set(ref, topic.name);
    }
  }
}

// Pass 2: Non-skip, non-priority topics in mid-range (10-500 verses = good specificity)
const midTopics = topics
  .filter(t => !PRIORITY_TOPICS.has(t.name) && !SKIP_NAMES.has(t.name) && t.verseCount >= 10 && t.verseCount <= 500)
  .sort((a, b) => a.verseCount - b.verseCount);

for (const topic of midTopics) {
  for (const ref of topic.verseRefs) {
    if (!verseToTopic.has(ref)) {
      verseToTopic.set(ref, topic.name);
    }
  }
}

// Pass 3: Everything else (fill remaining)
const remaining = topics
  .filter(t => !SKIP_NAMES.has(t.name))
  .sort((a, b) => a.verseCount - b.verseCount);

for (const topic of remaining) {
  for (const ref of topic.verseRefs) {
    if (!verseToTopic.has(ref)) {
      verseToTopic.set(ref, topic.name);
    }
  }
}

// Pass 4: Even skip names for any still unmapped
for (const topic of topics) {
  for (const ref of topic.verseRefs) {
    if (!verseToTopic.has(ref)) {
      verseToTopic.set(ref, topic.name);
    }
  }
}

console.log('Total unique verses covered:', verseToTopic.size);
console.log('\nSample mappings:');
const samples = [
  'john-3-16', 'psalms-1-3', 'romans-8-28', 'genesis-1-1', 'proverbs-3-5',
  'matthew-6-33', 'isaiah-41-10', 'philippians-4-13', 'jeremiah-29-11',
  'psalms-23-1', 'revelation-21-4', 'ephesians-2-8', 'matthew-28-19',
  'john-14-6', 'hebrews-11-1', 'galatians-5-22', 'james-1-2',
  '1-corinthians-13-4', 'romans-3-23', 'romans-6-23', 'john-1-1',
  'matthew-5-44', 'proverbs-22-6', 'joshua-1-9', 'deuteronomy-31-6',
];
for (const s of samples) {
  console.log(`  ${s.padEnd(25)} -> ${verseToTopic.get(s) || 'NOT FOUND'}`);
}
