import Link from 'next/link';

interface TopicalTagsProps {
  verseText: string;
  bookId: number;
}

interface Topic {
  name: string;
  slug: string;
  color: string;
}

const TOPIC_KEYWORDS: Record<string, Topic> = {
  'love': { name: 'Love', slug: 'love', color: 'bg-pink-100 text-pink-700 hover:bg-pink-200' },
  'loved': { name: 'Love', slug: 'love', color: 'bg-pink-100 text-pink-700 hover:bg-pink-200' },
  'faith': { name: 'Faith', slug: 'faith', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
  'believe': { name: 'Faith', slug: 'faith', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
  'believed': { name: 'Faith', slug: 'faith', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
  'believeth': { name: 'Faith', slug: 'faith', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
  'grace': { name: 'Grace', slug: 'grace', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
  'salvation': { name: 'Salvation', slug: 'salvation', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
  'saved': { name: 'Salvation', slug: 'salvation', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
  'save': { name: 'Salvation', slug: 'salvation', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
  'hope': { name: 'Hope', slug: 'hope', color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200' },
  'peace': { name: 'Peace', slug: 'peace', color: 'bg-teal-100 text-teal-700 hover:bg-teal-200' },
  'joy': { name: 'Joy', slug: 'joy', color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' },
  'prayer': { name: 'Prayer', slug: 'prayer', color: 'bg-blue-100 text-blue-700 hover:bg-indigo-200' },
  'pray': { name: 'Prayer', slug: 'prayer', color: 'bg-blue-100 text-blue-700 hover:bg-indigo-200' },
  'prayed': { name: 'Prayer', slug: 'prayer', color: 'bg-blue-100 text-blue-700 hover:bg-indigo-200' },
  'forgive': { name: 'Forgiveness', slug: 'forgiveness', color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
  'forgiven': { name: 'Forgiveness', slug: 'forgiveness', color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
  'forgiveness': { name: 'Forgiveness', slug: 'forgiveness', color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
  'eternal': { name: 'Eternal Life', slug: 'eternal-life', color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' },
  'everlasting': { name: 'Eternal Life', slug: 'eternal-life', color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' },
  'spirit': { name: 'Holy Spirit', slug: 'holy-spirit', color: 'bg-violet-100 text-violet-700 hover:bg-violet-200' },
  'truth': { name: 'Truth', slug: 'truth', color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
  'wisdom': { name: 'Wisdom', slug: 'wisdom', color: 'bg-amber-100 text-amber-700 hover:bg-amber-200' },
  'strength': { name: 'Strength', slug: 'strength', color: 'bg-red-100 text-red-700 hover:bg-red-200' },
  'comfort': { name: 'Comfort', slug: 'comfort', color: 'bg-rose-100 text-rose-700 hover:bg-rose-200' },
  'fear': { name: 'Fear & Courage', slug: 'fear-courage', color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
  'afraid': { name: 'Fear & Courage', slug: 'fear-courage', color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
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

export default function TopicalTags({ verseText, bookId }: TopicalTagsProps) {
  const topics = extractTopics(verseText);
  
  if (topics.length === 0) return null;

  return (
    <section className="mb-6">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Topics in This Verse
      </h3>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/topics/${topic.slug}`}
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${topic.color}`}
          >
            {topic.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
