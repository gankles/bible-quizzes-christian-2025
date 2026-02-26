import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBiographies } from '@/lib/biographies-data';
import { getCharacterQuizSlug } from '@/lib/character-quiz-generator';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Bible Character Quizzes | Test Your Knowledge of 127 Biblical Figures | Bible Maximum',
  description: 'Take quizzes on 127 Bible characters including Abraham, Moses, David, Paul, and more. Each quiz has 15 questions covering key events, significance, and scripture references.',
  keywords: [
    'Bible character quiz', 'biblical character quiz', 'Bible people quiz',
    'Abraham quiz', 'Moses quiz', 'David quiz', 'Paul quiz', 'Jesus quiz',
    'Bible trivia characters', 'Bible knowledge test',
  ],
  openGraph: {
    title: 'Bible Character Quizzes | 127 Biblical Figures',
    description: 'Test your knowledge of 127 Bible characters with 15-question quizzes covering key events, significance, and scripture.',
    url: '/character-quiz',
    type: 'website',
  },
  alternates: { canonical: '/character-quiz' },
};

export default function CharacterQuizHubPage() {
  const bios = getAllBiographies();

  // Group into OT and NT (rough heuristic based on key events)
  const ntBooks = ['matthew', 'mark', 'luke', 'john', 'acts', 'romans', 'corinthians', 'galatians',
    'ephesians', 'philippians', 'colossians', 'thessalonians', 'timothy', 'titus', 'philemon',
    'hebrews', 'james', 'peter', 'jude', 'revelation'];

  function isNT(bio: typeof bios[0]): boolean {
    return bio.keyEvents.some(e =>
      ntBooks.some(b => e.verse.toLowerCase().includes(b))
    );
  }

  const otCharacters = bios.filter(b => !isNT(b));
  const ntCharacters = bios.filter(b => isNT(b));

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Character Quizzes',
    description: 'Test your knowledge of 127 Bible characters with interactive quizzes.',
    url: 'https://biblemaximum.com/character-quiz',
    numberOfItems: bios.length,
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
      { '@type': 'ListItem', position: 2, name: 'Bible Quizzes', item: 'https://biblemaximum.com/bible-quizzes' },
      { '@type': 'ListItem', position: 3, name: 'Character Quizzes' },
    ],
  };

  function CharacterGrid({ characters, title }: { characters: typeof bios; title: string }) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-display text-scripture mb-6">{title}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {characters.map((bio) => {
            const slug = getCharacterQuizSlug(bio.name);
            return (
              <Link
                key={bio.name}
                href={`/character-quiz/${slug}`}
                className="bg-white border border-grace rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center text-lg font-bold shrink-0">
                    {bio.name.charAt(0)}
                  </span>
                  <h3 className="text-lg font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                    {bio.name}
                  </h3>
                </div>
                <p className="text-sm text-primary-dark/60 leading-relaxed line-clamp-2">
                  {bio.significance}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-primary-dark/40">{bio.keyEvents.length} key events</span>
                  <span className="text-xs font-medium text-blue-600">15 Questions</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <>
      <StructuredData data={collectionSchema} />
      <StructuredData data={breadcrumbSchema} />

      <Breadcrumb items={[
        { label: 'Bible Quizzes', href: '/bible-quizzes' },
        { label: 'Character Quizzes' },
      ]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-blue-50 to-primary-light/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-scripture mb-4">
              Bible Character <span className="text-blue-600">Quizzes</span>
            </h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mx-auto mb-8">
              Test your knowledge of {bios.length} biblical figures. Each quiz features
              15 questions covering key events, significance, and scripture references.
            </p>

            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{bios.length}</div>
                <div className="text-sm text-primary-dark/60">Characters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">15</div>
                <div className="text-sm text-primary-dark/60">Questions Each</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{bios.length * 15}</div>
                <div className="text-sm text-primary-dark/60">Total Questions</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-2rem] relative z-20 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/characters" className="bg-blue-600 rounded-lg p-6 text-white shadow-lg flex items-center justify-between hover:bg-blue-700 transition-colors">
              <div>
                <h3 className="font-bold text-lg">Study Characters First</h3>
                <p className="text-white/80 text-xs">Read biographies before taking quizzes</p>
              </div>
              <span className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase shrink-0 ml-3">Browse</span>
            </Link>
            <Link href="/bible-quizzes" className="bg-scripture rounded-lg p-6 text-white shadow-lg flex items-center justify-between hover:bg-scripture/90 transition-colors">
              <div>
                <h3 className="font-bold text-lg">More Bible Quizzes</h3>
                <p className="text-white/80 text-xs">Chapter quizzes, book quizzes, and more</p>
              </div>
              <span className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase shrink-0 ml-3">Explore</span>
            </Link>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <CharacterGrid characters={otCharacters} title="Old Testament Characters" />
          <CharacterGrid characters={ntCharacters} title="New Testament Characters" />

          {/* Internal Links */}
          <section className="bg-grace/10 border border-grace rounded-xl p-6 mt-8">
            <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">Bible Quizzes</Link>
              <Link href="/characters" className="text-blue-600 hover:underline text-sm">Bible Characters</Link>
              <Link href="/bible-stories" className="text-blue-600 hover:underline text-sm">Bible Stories</Link>
              <Link href="/people" className="text-blue-600 hover:underline text-sm">Bible People Directory</Link>
              <Link href="/topics" className="text-blue-600 hover:underline text-sm">Bible Topics</Link>
              <Link href="/timeline" className="text-blue-600 hover:underline text-sm">Bible Timeline</Link>
              <Link href="/devotionals" className="text-blue-600 hover:underline text-sm">Daily Devotionals</Link>
              <Link href="/commandments" className="text-blue-600 hover:underline text-sm">613 Commandments</Link>
              <Link href="/bible-geography-quiz" className="text-blue-600 hover:underline text-sm">Geography Quizzes</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
