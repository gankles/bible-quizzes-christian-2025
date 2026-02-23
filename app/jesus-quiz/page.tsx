import { Metadata } from 'next';
import { loadCharacterTabbedQuiz } from '@/lib/quiz-loader';
import TabbedQuizPage from '@/components/TabbedQuizPage';
import QuizPage from '@/components/QuizPage';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Jesus Christ Quiz | 60 Questions Across 4 Difficulty Levels — Life, Ministry, Miracles, Parables, Death & Resurrection | Free Bible Quiz with Verse References | Bible Maximum',
  description: 'Test your knowledge of Jesus Christ with 60 questions across Easy, Medium, Hard, and Theological levels. Covers the Gospels — miracles, parables, Sermon on the Mount, crucifixion, resurrection, and ascension. Free with instant results and verse references.',
  keywords: 'jesus quiz, jesus christ quiz, bible quiz jesus, gospels quiz, life of jesus, miracles of jesus, parables of jesus, sermon on the mount quiz, crucifixion quiz, resurrection quiz, bible trivia jesus',
  openGraph: {
    title: 'Jesus Christ Quiz — 60 Questions | Bible Maximum',
    description: 'Test your knowledge of Jesus Christ across 4 difficulty levels. Free with instant results.',
    url: '/jesus-quiz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jesus Christ Quiz — 60 Questions | Bible Maximum',
    description: 'Test your knowledge of Jesus Christ across 4 difficulty levels.',
  },
  alternates: { canonical: '/jesus-quiz' },
};

export default function JesusQuizPage() {
  const tabbedQuiz = loadCharacterTabbedQuiz('jesus');

  if (!tabbedQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary-dark/60">Quiz data not available. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-grace">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-y-1 text-sm">
              <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
              <li className="text-primary-dark/40 mx-2">/</li>
              <li><Link href="/bible-quizzes" className="text-blue-600 hover:underline">Bible Quizzes</Link></li>
              <li className="text-primary-dark/40 mx-2">/</li>
              <li className="text-primary-dark/70">Jesus Christ Quiz</li>
            </ol>
          </nav>
        </div>
        <div className="max-w-4xl mx-auto px-4 pb-6 pt-2">
          <p className="text-primary-dark/70 leading-relaxed">
            How well do you know Jesus Christ? This comprehensive quiz covers His birth, ministry, miracles, parables,
            teachings, death, resurrection, and ascension across the four Gospels (Matthew, Mark, Luke, John) and the New Testament.
            Choose your difficulty level and start testing your knowledge.
          </p>
        </div>
      </div>

      <TabbedQuizPage
        tabbedQuiz={tabbedQuiz}
        url="https://biblemaximum.com/jesus-quiz"
      />

      {/* Related Links */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-scripture mb-6">Related Quizzes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { name: 'Matthew Chapters', href: '/matthew-chapters' },
            { name: 'Mark Chapters', href: '/mark-chapters' },
            { name: 'Luke Chapters', href: '/luke-chapters' },
            { name: 'John Chapters', href: '/john-chapters' },
            { name: 'Paul Quiz', href: '/paul-quiz' },
            { name: 'Moses Quiz', href: '/moses-quiz' },
            { name: 'David Quiz', href: '/david-quiz' },
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
