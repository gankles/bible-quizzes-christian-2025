import { Metadata } from 'next';
import { loadCharacterTabbedQuiz } from '@/lib/quiz-loader';
import TabbedQuizPage from '@/components/TabbedQuizPage';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'King David Quiz | 60 Questions Across 4 Difficulty Levels — Goliath, Psalms, Bathsheba, Absalom | Free Bible Quiz with Verse References | Bible Maximum',
  description: 'Test your knowledge of King David with 60 questions across Easy, Medium, Hard, and Theological levels. Covers anointing by Samuel, defeating Goliath, friendship with Jonathan, Bathsheba, Absalom\'s rebellion, and the Psalms. Free with instant results.',
  keywords: 'david quiz, king david quiz, bible quiz david, goliath quiz, psalms quiz, david and goliath, david and jonathan, bathsheba quiz, absalom quiz, bible trivia david',
  openGraph: {
    title: 'King David Quiz — 60 Questions | Bible Maximum',
    description: 'Test your knowledge of King David across 4 difficulty levels. Free with instant results.',
    url: '/david-quiz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'King David Quiz — 60 Questions | Bible Maximum',
    description: 'Test your knowledge of King David across 4 difficulty levels.',
  },
  alternates: { canonical: '/david-quiz' },
};

export default function DavidQuizPage() {
  const tabbedQuiz = loadCharacterTabbedQuiz('david');

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
              <li className="text-primary-dark/70">King David Quiz</li>
            </ol>
          </nav>
        </div>
        <div className="max-w-4xl mx-auto px-4 pb-6 pt-2">
          <p className="text-primary-dark/70 leading-relaxed">
            How well do you know King David? This comprehensive quiz covers his anointing by Samuel, defeating Goliath,
            friendship with Jonathan, fleeing from Saul, becoming king over Israel, the Ark of the Covenant,
            Bathsheba and Uriah, Absalom's rebellion, his psalms, and his legacy as ancestor of the Messiah.
          </p>
        </div>
      </div>

      <TabbedQuizPage
        tabbedQuiz={tabbedQuiz}
        url="https://biblemaximum.com/david-quiz"
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-scripture mb-6">Related Quizzes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { name: '1 Samuel Chapters', href: '/1-samuel-chapters' },
            { name: '2 Samuel Chapters', href: '/2-samuel-chapters' },
            { name: '1 Chronicles Chapters', href: '/1-chronicles-chapters' },
            { name: 'Psalms Chapters', href: '/psalms-chapters' },
            { name: 'Jesus Quiz', href: '/jesus-quiz' },
            { name: 'Moses Quiz', href: '/moses-quiz' },
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
