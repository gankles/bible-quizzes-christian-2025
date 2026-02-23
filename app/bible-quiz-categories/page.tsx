import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bible Quiz Categories | Character Quizzes, Difficulty Levels, Book Quizzes & More | Find Your Perfect Quiz | Bible Maximum',
  description: 'Browse all Bible quiz categories: quizzes by character (Jesus, Moses, David, Paul), by difficulty level (Easy, Medium, Hard, Theological), by testament, and by book. Find the perfect quiz for your Bible study.',
  keywords: 'bible quiz categories, bible character quiz, jesus quiz, moses quiz, david quiz, paul quiz, easy bible quiz, hard bible quiz, old testament quiz, new testament quiz',
  alternates: { canonical: '/bible-quiz-categories' },
};

const characterQuizzes = [
  {
    name: 'Jesus Christ',
    slug: '/jesus-quiz',
    description: 'Life, ministry, miracles, parables, death & resurrection',
    questions: 60,
    books: 'Matthew, Mark, Luke, John',
  },
  {
    name: 'Moses',
    slug: '/moses-quiz',
    description: 'Exodus, Ten Commandments, Red Sea, wilderness wanderings',
    questions: 60,
    books: 'Exodus, Leviticus, Numbers, Deuteronomy',
  },
  {
    name: 'King David',
    slug: '/david-quiz',
    description: 'Goliath, Psalms, kingship, Bathsheba, Absalom',
    questions: 60,
    books: '1 Samuel, 2 Samuel, 1 Chronicles, Psalms',
  },
  {
    name: 'Apostle Paul',
    slug: '/paul-quiz',
    description: 'Conversion, missionary journeys, epistles & theology',
    questions: 60,
    books: 'Acts, Romans, Corinthians, Galatians, Ephesians',
  },
];

const difficultyLevels = [
  {
    name: 'Easy Quizzes',
    slug: '/bible-quiz-difficulty/easy',
    description: 'Perfect for beginners and new Christians',
    color: 'bg-green-50 border-green-200 hover:border-green-400',
    textColor: 'text-green-800',
  },
  {
    name: 'Medium Quizzes',
    slug: '/bible-quiz-difficulty/medium',
    description: 'Apply biblical truths to real-life situations',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    textColor: 'text-blue-800',
  },
  {
    name: 'Hard Quizzes',
    slug: '/bible-quiz-difficulty/hard',
    description: 'Deep analysis and cross-biblical connections',
    color: 'bg-orange-50 border-orange-200 hover:border-orange-400',
    textColor: 'text-orange-800',
  },
  {
    name: 'Theological Quizzes',
    slug: '/bible-quiz-difficulty/theological',
    description: 'Seminary-level doctrine and systematic theology',
    color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
    textColor: 'text-purple-800',
  },
];

const testamentQuizzes = [
  {
    name: 'Old Testament Quizzes',
    slug: '/old-testament-quizzes',
    description: '39 books from Genesis to Malachi — Law, History, Poetry, Prophets',
    books: 39,
  },
  {
    name: 'New Testament Quizzes',
    slug: '/new-testament-quizzes',
    description: '27 books from Matthew to Revelation — Gospels, Acts, Epistles, Prophecy',
    books: 27,
  },
];

const popularBookQuizzes = [
  { name: 'Genesis', href: '/genesis-chapters', chapters: 50 },
  { name: 'Exodus', href: '/exodus-chapters', chapters: 40 },
  { name: 'Psalms', href: '/psalms-chapters', chapters: 150 },
  { name: 'Proverbs', href: '/proverbs-chapters', chapters: 31 },
  { name: 'Isaiah', href: '/isaiah-chapters', chapters: 66 },
  { name: 'Matthew', href: '/matthew-chapters', chapters: 28 },
  { name: 'John', href: '/john-chapters', chapters: 21 },
  { name: 'Acts', href: '/acts-chapters', chapters: 28 },
  { name: 'Romans', href: '/romans-chapters', chapters: 16 },
  { name: 'Revelation', href: '/revelation-chapters', chapters: 22 },
];

export default function BibleQuizCategoriesPage() {
  return (
    <div className="bg-[#FAFAF9] min-h-screen pb-24">
      <div className="max-w-5xl mx-auto px-6 pt-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center text-sm">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li><Link href="/bible-quizzes" className="text-blue-600 hover:underline">Bible Quizzes</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li className="text-primary-dark/70">Categories</li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold font-display text-scripture mb-4">Bible Quiz Categories</h1>
        <p className="text-lg text-primary-dark/60 mb-12">
          Find the perfect quiz for your Bible study. Browse by character, difficulty level, testament, or individual book.
        </p>

        {/* Character Quizzes */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-scripture mb-2">Character Quizzes</h2>
          <p className="text-primary-dark/60 mb-6">Deep-dive quizzes focused on major Bible characters — 60 questions each across 4 difficulty levels.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {characterQuizzes.map(quiz => (
              <Link
                key={quiz.slug}
                href={quiz.slug}
                className="block p-6 bg-white rounded-xl border border-grace hover:border-blue-300 hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-bold text-scripture mb-2">{quiz.name}</h3>
                <p className="text-primary-dark/70 text-sm mb-3">{quiz.description}</p>
                <div className="flex items-center gap-4 text-xs text-primary-dark/50">
                  <span>{quiz.questions} questions</span>
                  <span>4 difficulty levels</span>
                </div>
                <p className="text-xs text-primary-dark/40 mt-2">Books: {quiz.books}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* By Difficulty */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-scripture mb-2">By Difficulty Level</h2>
          <p className="text-primary-dark/60 mb-6">Every chapter quiz has 4 difficulty levels. Choose the one that matches your Bible knowledge.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {difficultyLevels.map(level => (
              <Link
                key={level.slug}
                href={level.slug}
                className={`block p-5 rounded-xl border-2 transition-all ${level.color}`}
              >
                <h3 className={`text-lg font-bold mb-1 ${level.textColor}`}>{level.name}</h3>
                <p className="text-primary-dark/70 text-sm">{level.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* By Testament */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-scripture mb-2">By Testament</h2>
          <p className="text-primary-dark/60 mb-6">Browse quizzes organized by Old and New Testament.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {testamentQuizzes.map(t => (
              <Link
                key={t.slug}
                href={t.slug}
                className="block p-6 bg-white rounded-xl border border-grace hover:border-blue-300 hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-bold text-scripture mb-2">{t.name}</h3>
                <p className="text-primary-dark/70 text-sm mb-2">{t.description}</p>
                <span className="text-xs text-primary-dark/50">{t.books} books</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Book Quizzes */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-scripture mb-2">Popular Book Quizzes</h2>
          <p className="text-primary-dark/60 mb-6">Chapter-by-chapter quizzes for the most-studied Bible books.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {popularBookQuizzes.map(book => (
              <Link
                key={book.href}
                href={book.href}
                className="block p-4 bg-white rounded-lg border border-grace hover:border-blue-300 hover:shadow-sm transition-all text-center"
              >
                <span className="font-semibold text-scripture text-sm block">{book.name}</span>
                <span className="text-xs text-primary-dark/50">{book.chapters} chapters</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/bible-quizzes"
              className="inline-block px-6 py-3 bg-scripture text-white rounded-lg hover:bg-scripture/90 transition-colors font-medium"
            >
              Browse All 66 Books
            </Link>
          </div>
        </section>

        {/* Other Quizzes */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-scripture mb-2">More Quizzes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { name: 'Bible Trivia', href: '/bible-trivia' },
              { name: 'Kids Bible Quiz', href: '/kids-bible-quiz' },
              { name: 'Genesis Complete Quiz', href: '/genesis-quiz' },
              { name: 'How It Works', href: '/how-bible-quiz-works' },
              { name: 'FAQ', href: '/bible-quiz-faq' },
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
        </section>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'Bible Quiz Categories',
              description: 'Browse all Bible quiz categories on Bible Maximum.',
              url: 'https://biblemaximum.com/bible-quiz-categories',
              hasPart: characterQuizzes.map(q => ({
                '@type': 'Quiz',
                name: `${q.name} Quiz`,
                url: `https://biblemaximum.com${q.slug}`,
                numberOfQuestions: q.questions,
              })),
            }),
          }}
        />
      </div>
    </div>
  );
}
