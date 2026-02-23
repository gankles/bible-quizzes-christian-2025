import { Metadata } from 'next';
import { loadCharacterTabbedQuiz } from '@/lib/quiz-loader';
import TabbedQuizPage from '@/components/TabbedQuizPage';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Apostle Paul Quiz | 60 Questions Across 4 Difficulty Levels — Conversion, Missionary Journeys, Epistles & Theology | Free Bible Quiz with Verse References | Bible Maximum',
  description: 'Test your knowledge of the Apostle Paul with 60 questions across Easy, Medium, Hard, and Theological levels. Covers Damascus road conversion, missionary journeys, epistles, justification by faith, trials, and imprisonment. Free with instant results.',
  keywords: 'paul quiz, apostle paul quiz, bible quiz paul, missionary journeys quiz, epistles quiz, damascus road conversion, romans quiz, corinthians quiz, galatians quiz, bible trivia paul',
  openGraph: {
    title: 'Apostle Paul Quiz — 60 Questions | Bible Maximum',
    description: 'Test your knowledge of the Apostle Paul across 4 difficulty levels. Free with instant results.',
    url: '/paul-quiz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apostle Paul Quiz — 60 Questions | Bible Maximum',
    description: 'Test your knowledge of the Apostle Paul across 4 difficulty levels.',
  },
  alternates: { canonical: '/paul-quiz' },
};

export default function PaulQuizPage() {
  const tabbedQuiz = loadCharacterTabbedQuiz('paul');

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
              <li className="text-primary-dark/70">Apostle Paul Quiz</li>
            </ol>
          </nav>
        </div>
        <div className="max-w-4xl mx-auto px-4 pb-6 pt-2">
          <p className="text-primary-dark/70 leading-relaxed">
            How well do you know the Apostle Paul? This comprehensive quiz covers his persecution of Christians as Saul,
            Damascus road conversion, ministry in Antioch, missionary journeys, the Jerusalem Council, key epistles
            (Romans, Corinthians, Galatians, Ephesians), his trials before governors, shipwreck on Malta, and
            imprisonment in Rome.
          </p>
        </div>
      </div>

      <TabbedQuizPage
        tabbedQuiz={tabbedQuiz}
        url="https://biblemaximum.com/paul-quiz"
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-scripture mb-6">Related Quizzes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { name: 'Acts Chapters', href: '/acts-chapters' },
            { name: 'Romans Chapters', href: '/romans-chapters' },
            { name: '1 Corinthians Chapters', href: '/1-corinthians-chapters' },
            { name: 'Galatians Chapters', href: '/galatians-chapters' },
            { name: 'Ephesians Chapters', href: '/ephesians-chapters' },
            { name: 'Jesus Quiz', href: '/jesus-quiz' },
            { name: 'Moses Quiz', href: '/moses-quiz' },
            { name: 'David Quiz', href: '/david-quiz' },
            { name: 'All Quizzes', href: '/bible-quizzes' },
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
