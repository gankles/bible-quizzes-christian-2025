import Link from 'next/link';

interface TopicalTagsProps {
  verseText: string;
  bookId: number;
}

interface Topic {
  name: string;
  slug: string;
}

const TOPIC_KEYWORDS: Record<string, Topic> = {
  'love': { name: 'Love', slug: 'love' },
  'loved': { name: 'Love', slug: 'love' },
  'faith': { name: 'Faith', slug: 'faith' },
  'believe': { name: 'Faith', slug: 'faith' },
  'believed': { name: 'Faith', slug: 'faith' },
  'believeth': { name: 'Faith', slug: 'faith' },
  'grace': { name: 'Grace', slug: 'grace' },
  'salvation': { name: 'Salvation', slug: 'salvation' },
  'saved': { name: 'Salvation', slug: 'salvation' },
  'save': { name: 'Salvation', slug: 'salvation' },
  'saviour': { name: 'Salvation', slug: 'salvation' },
  'redeemed': { name: 'Salvation', slug: 'salvation' },
  'redeemer': { name: 'Salvation', slug: 'salvation' },
  'perish': { name: 'Salvation', slug: 'salvation' },
  'begotten': { name: 'Salvation', slug: 'salvation' },
  'delivered': { name: 'Salvation', slug: 'salvation' },
  'hope': { name: 'Hope', slug: 'hope' },
  'peace': { name: 'Peace', slug: 'peace' },
  'joy': { name: 'Joy', slug: 'joy' },
  'prayer': { name: 'Prayer', slug: 'prayer' },
  'pray': { name: 'Prayer', slug: 'prayer' },
  'prayed': { name: 'Prayer', slug: 'prayer' },
  'forgive': { name: 'Forgiveness', slug: 'forgiveness' },
  'forgiven': { name: 'Forgiveness', slug: 'forgiveness' },
  'forgiveness': { name: 'Forgiveness', slug: 'forgiveness' },
  'eternal': { name: 'Eternal Life', slug: 'eternal-life' },
  'everlasting': { name: 'Eternal Life', slug: 'eternal-life' },
  'spirit': { name: 'Holy Spirit', slug: 'holy-spirit' },
  'truth': { name: 'Truth', slug: 'truth' },
  'wisdom': { name: 'Wisdom', slug: 'wisdom' },
  'strength': { name: 'Strength', slug: 'strength' },
  'comfort': { name: 'Comfort', slug: 'comfort' },
  'fear': { name: 'Fear & Courage', slug: 'fear-courage' },
  'afraid': { name: 'Fear & Courage', slug: 'fear-courage' },
};

function extractTopics(text: string): Topic[] {
  const words = text.toLowerCase().split(/\s+/);
  const found: Topic[] = [];
  const seen = new Set<string>();

  for (const word of words) {
    const clean = word.replace(/[^a-z]/g, '');
    const topic = TOPIC_KEYWORDS[clean];
    if (topic && !seen.has(topic.slug)) {
      seen.add(topic.slug);
      found.push(topic);
    }
  }

  return found.slice(0, 5);
}

export default function TopicalTags({ verseText }: TopicalTagsProps) {
  const topics = extractTopics(verseText);

  if (topics.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      {topics.map((topic) => (
        <Link
          key={topic.slug}
          href={`/topics/${topic.slug}`}
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-grace text-primary-dark/70 hover:text-scripture hover:border-grace transition-colors"
        >
          {topic.name}
        </Link>
      ))}
    </div>
  );
}
