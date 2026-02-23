import { Metadata } from 'next';
import { loadCharacterTabbedQuiz } from '@/lib/quiz-loader';
import TabbedQuizPage from '@/components/TabbedQuizPage';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Moses Quiz | 60 Questions Across 4 Difficulty Levels — Exodus, Ten Commandments, Wilderness, Red Sea | Free Bible Quiz with Verse References | Bible Maximum',
  description: 'Test your knowledge of Moses with 60 questions across Easy, Medium, Hard, and Theological levels. Covers the burning bush, ten plagues, Passover, crossing the Red Sea, Ten Commandments, tabernacle, and wilderness wanderings. Free with instant results.',
  keywords: 'moses quiz, bible quiz moses, exodus quiz, ten commandments quiz, red sea crossing, burning bush quiz, ten plagues quiz, wilderness quiz, mount sinai quiz, bible trivia moses',
  openGraph: {
    title: 'Moses Quiz — 60 Questions | Bible Maximum',
    description: 'Test your knowledge of Moses across 4 difficulty levels. Free with instant results.',
    url: '/moses-quiz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moses Quiz — 60 Questions | Bible Maximum',
    description: 'Test your knowledge of Moses across 4 difficulty levels.',
  },
  alternates: { canonical: '/moses-quiz' },
};

export default function MosesQuizPage() {
  const tabbedQuiz = loadCharacterTabbedQuiz('moses');

  if (!tabbedQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary-dark/60">Quiz data not available. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white border-b border-grace">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-y-1 text-sm">
              <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
              <li className="text-primary-dark/40 mx-2">/</li>
              <li><Link href="/bible-quizzes" className="text-blue-600 hover:underline">Bible Quizzes</Link></li>
              <li className="text-primary-dark/40 mx-2">/</li>
              <li className="text-primary-dark/70">Moses Quiz</li>
            </ol>
          </nav>
        </div>
        <div className="max-w-4xl mx-auto px-4 pb-6 pt-2">
          <p className="text-primary-dark/70 leading-relaxed">
            How well do you know Moses? This comprehensive quiz covers his birth and rescue by Pharaoh's daughter,
            the burning bush, ten plagues, Passover, crossing the Red Sea, receiving the Ten Commandments at Sinai,
            the golden calf, the tabernacle, wilderness wanderings, and his death on Mount Nebo.
          </p>
        </div>
      </div>

      <TabbedQuizPage
        tabbedQuiz={tabbedQuiz}
        url="https://biblemaximum.com/moses-quiz"
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-scripture mb-6">Related Quizzes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { name: 'Exodus Chapters', href: '/exodus-chapters' },
            { name: 'Leviticus Chapters', href: '/leviticus-chapters' },
            { name: 'Numbers Chapters', href: '/numbers-chapters' },
            { name: 'Deuteronomy Chapters', href: '/deuteronomy-chapters' },
            { name: 'Jesus Quiz', href: '/jesus-quiz' },
            { name: 'David Quiz', href: '/david-quiz' },
            { name: 'Paul Quiz', href: '/paul-quiz' },
            { name: 'All Quizzes', href: '/bible-quizzes' },
            { name: 'Bible Trivia', href: '/bible-trivia' },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block p-3 bg-white rounded-lg border border-grace hover:border-blue-300 hover:shadow-sm transition-all text-sm text-blue-600 hover:text-blue-700"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
