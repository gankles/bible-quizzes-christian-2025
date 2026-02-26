import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getCharacterNameFromSlug,
  generateCharacterQuiz,
  getCharacterQuizSlug,
  getAllCharacterQuizSlugs,
} from '@/lib/character-quiz-generator';
import { getBiography } from '@/lib/biographies-data';
import { StructuredData } from '@/components/StructuredData';
import CharacterQuizClient from './CharacterQuizClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const name = getCharacterNameFromSlug(slug);
  if (!name) return {};

  const title = `${name} Quiz | Bible Character Quiz | Test Your Knowledge | Bible Maximum`;
  const description = `How well do you know ${name} from the Bible? Take this 15-question quiz covering key events, scripture references, and the biblical significance of ${name}.`;

  return {
    title,
    description,
    keywords: [
      `${name} quiz`, `${name} Bible quiz`, `${name} trivia`,
      'Bible character quiz', 'biblical quiz', 'Bible knowledge test',
    ],
    openGraph: {
      title: `${name} Quiz | Bible Character Quiz`,
      description,
      url: `/character-quiz/${slug}`,
      type: 'website',
    },
    alternates: { canonical: `/character-quiz/${slug}` },
  };
}

export default async function CharacterQuizPage({ params }: PageProps) {
  const { slug } = await params;
  const name = getCharacterNameFromSlug(slug);
  if (!name) notFound();

  const bio = getBiography(name);
  if (!bio) notFound();

  const questions = generateCharacterQuiz(name);
  if (!questions || questions.length === 0) notFound();

  const quiz = {
    id: `character-quiz-${slug}`,
    title: `${name} Quiz`,
    description: `Test your knowledge of ${name} with ${questions.length} questions about key events, significance, and scripture references.`,
    type: 'theme' as const,
    book: '',
    totalQuestions: questions.length,
    estimatedTime: Math.ceil(questions.length * 0.75),
    difficulty: 'medium' as const,
    slug: `character-quiz/${slug}`,
    tags: [name.toLowerCase(), 'character', 'Bible character'],
    isBookQuiz: false,
    questions,
  };

  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: `${name} Quiz`,
    description: quiz.description,
    url: `https://biblemaximum.com/character-quiz/${slug}`,
    educationalLevel: 'beginner',
    about: {
      '@type': 'Person',
      name,
      description: bio.significance,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bible Quizzes', item: 'https://biblemaximum.com/bible-quizzes' },
      { '@type': 'ListItem', position: 3, name: 'Character Quizzes', item: 'https://biblemaximum.com/character-quiz' },
      { '@type': 'ListItem', position: 4, name: `${name} Quiz` },
    ],
  };

  // Find related characters for interlinking
  const allSlugs = getAllCharacterQuizSlugs();
  const currentIdx = allSlugs.indexOf(slug);
  const relatedSlugs = allSlugs
    .filter((s, i) => s !== slug && Math.abs(i - currentIdx) <= 3)
    .slice(0, 3);

  // Extract book from first verse for chapter link
  const firstVerse = bio.keyEvents[0]?.verse || '';
  const bookMatch = firstVerse.match(/^(.+?)\s+(\d+)/);
  const bookSlug = bookMatch ? bookMatch[1].toLowerCase().replace(/\s+/g, '-') : '';
  const chapterNum = bookMatch ? bookMatch[2] : '';

  return (
    <>
      <StructuredData data={quizSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/bible-quizzes" className="hover:text-blue-600">Bible Quizzes</Link>
        <span className="mx-1.5">/</span>
        <Link href="/character-quiz" className="hover:text-blue-600">Character Quizzes</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">{name} Quiz</span>
      </nav>

      {/* Quiz Section */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <CharacterQuizClient quiz={quiz} />
      </section>

      {/* Internal Links (below quiz per CLAUDE.md) */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Related Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href={`/characters/${slug}`} className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              {name} Biography
            </Link>
            {bookSlug && chapterNum && (
              <Link href={`/${bookSlug}-${chapterNum}-quiz`} className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
                {bookMatch?.[1]} {chapterNum} Quiz
              </Link>
            )}
            {relatedSlugs.map((rs) => {
              const rName = getCharacterNameFromSlug(rs);
              return rName ? (
                <Link key={rs} href={`/character-quiz/${rs}`} className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
                  {rName} Quiz
                </Link>
              ) : null;
            })}
            <Link href="/character-quiz" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              All Character Quizzes
            </Link>
            <Link href="/bible-quizzes" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              More Bible Quizzes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
