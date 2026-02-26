import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCharactersForTopic, getAllCharacterTopicBridgeSlugs } from '@/lib/character-topic-bridge';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ topic: string }>;
}

function formatTopicName(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const characters = getCharactersForTopic(topic);
  if (characters.length < 2) return {};

  const name = formatTopicName(topic);
  const charNames = characters.slice(0, 5).map(c => c.name).join(', ');

  return {
    title: `Bible Characters Related to ${name} | Character Study by Topic | Bible Maximum`,
    description: `Explore ${characters.length} Bible characters connected to the topic of ${name.toLowerCase()}, including ${charNames}. Discover how biblical figures relate to this theme.`,
    keywords: [
      `${name} Bible characters`, `${name} biblical figures`, `Bible characters ${name}`,
      'Bible character study', 'topical Bible characters',
    ],
    openGraph: {
      title: `Bible Characters Related to ${name}`,
      description: `${characters.length} biblical figures connected to ${name.toLowerCase()}.`,
      url: `/characters-by-topic/${topic}`,
      type: 'website',
    },
    alternates: { canonical: `/characters-by-topic/${topic}` },
  };
}

export default async function CharactersByTopicPage({ params }: PageProps) {
  const { topic } = await params;
  const characters = getCharactersForTopic(topic);
  if (characters.length < 2) notFound();

  const name = formatTopicName(topic);

  // Get a few related bridge topics (different from current)
  const allSlugs = getAllCharacterTopicBridgeSlugs();
  const currentIdx = allSlugs.indexOf(topic);
  const relatedSlugs = allSlugs
    .filter((s, i) => s !== topic && Math.abs(i - currentIdx) <= 5)
    .slice(0, 4);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Bible Characters Related to ${name}`,
    description: `${characters.length} biblical figures connected to the topic of ${name.toLowerCase()}.`,
    url: `https://biblemaximum.com/characters-by-topic/${topic}`,
    publisher: {
      '@type': 'Organization',
      name: 'Bible Maximum',
      url: 'https://biblemaximum.com',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Characters', item: 'https://biblemaximum.com/characters' },
      { '@type': 'ListItem', position: 3, name: 'Characters by Topic', item: 'https://biblemaximum.com/characters-by-topic' },
      { '@type': 'ListItem', position: 4, name: name },
    ],
  };

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Breadcrumb */}
        <nav className="bg-white border-b border-grace">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <ol className="flex items-center flex-wrap gap-y-1 text-sm">
              <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
              <li className="text-primary-dark/40 mx-2">/</li>
              <li><Link href="/characters" className="text-blue-600 hover:underline">Characters</Link></li>
              <li className="text-primary-dark/40 mx-2">/</li>
              <li><Link href="/characters-by-topic" className="text-blue-600 hover:underline">By Topic</Link></li>
              <li className="text-primary-dark/40 mx-2">/</li>
              <li className="text-primary-dark/70">{name}</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="py-12 bg-gradient-to-b from-blue-50 to-primary-light/30">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-display text-scripture mb-3">
              Bible Characters Related to <span className="text-blue-600">{name}</span>
            </h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mx-auto">
              {characters.length} biblical figures whose lives, events, and significance
              connect to the topic of {name.toLowerCase()}.
            </p>
          </div>
        </section>

        {/* CTA Strip */}
        <div className="max-w-4xl mx-auto px-4 mt-[-1.5rem] relative z-20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href={`/topics/${topic}`}
              className="bg-blue-600 rounded-lg p-5 text-white shadow-lg flex items-center justify-between hover:bg-blue-700 transition-colors"
            >
              <div>
                <h3 className="font-bold text-lg">Study {name} in Scripture</h3>
                <p className="text-white/80 text-xs">Verses and commentary on this topic</p>
              </div>
              <span className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm uppercase shrink-0 ml-3">Study</span>
            </Link>
            <Link
              href="/character-quiz"
              className="bg-scripture rounded-lg p-5 text-white shadow-lg flex items-center justify-between hover:bg-scripture/90 transition-colors"
            >
              <div>
                <h3 className="font-bold text-lg">Character Quizzes</h3>
                <p className="text-white/80 text-xs">Test your knowledge of these characters</p>
              </div>
              <span className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-bold text-sm uppercase shrink-0 ml-3">Quiz</span>
            </Link>
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-4 pb-12">
          {/* Character Cards */}
          <section className="mb-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {characters.map((char) => (
                <div
                  key={char.slug}
                  className="bg-white border border-grace rounded-xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center text-lg font-bold shrink-0">
                      {char.name.charAt(0)}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-scripture">{char.name}</h3>
                      <span className="text-xs text-primary-dark/40">Relevance: {char.relevance}</span>
                    </div>
                  </div>
                  <p className="text-sm text-primary-dark/70 leading-relaxed mb-3 line-clamp-3">
                    {char.significance}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/characters/${char.slug}`}
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      Biography
                    </Link>
                    <span className="text-primary-dark/20">|</span>
                    <Link
                      href={`/character-quiz/${char.slug}`}
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      Take Quiz
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Engagement */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="font-semibold text-scripture">Deepen your understanding of {name}</p>
              <p className="text-sm text-primary-dark/60">Read what the Bible says about this topic.</p>
            </div>
            <Link
              href={`/topics/${topic}`}
              className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shrink-0"
            >
              Study {name}
            </Link>
          </div>

          {/* Internal Links */}
          <section className="bg-grace/10 border border-grace rounded-xl p-6">
            <h2 className="text-lg font-bold text-scripture mb-3">Related Resources</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              <Link href={`/topics/${topic}`} className="text-blue-600 hover:underline text-sm">
                {name} Topic Page
              </Link>
              <Link href="/character-quiz" className="text-blue-600 hover:underline text-sm">
                All Character Quizzes
              </Link>
              {relatedSlugs.map(rs => (
                <Link key={rs} href={`/characters-by-topic/${rs}`} className="text-blue-600 hover:underline text-sm">
                  Characters: {formatTopicName(rs)}
                </Link>
              ))}
              <Link href="/characters-by-topic" className="text-blue-600 hover:underline text-sm">
                All Characters by Topic
              </Link>
              <Link href="/characters" className="text-blue-600 hover:underline text-sm">
                Bible Characters
              </Link>
              <Link href="/commandments" className="text-blue-600 hover:underline text-sm">
                613 Commandments
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
