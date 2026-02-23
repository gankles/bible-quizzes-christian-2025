import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sitemap | Bible Maximum',
  description: 'Browse all pages on Bible Maximum including Bible quizzes, lexicon tools, verse studies, and more.',
  alternates: { canonical: '/site-map' },
};

const OT_BOOKS = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
  'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
  'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations',
  'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah',
  'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai',
  'Zechariah', 'Malachi',
];

const NT_BOOKS = [
  'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans',
  '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
  'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews',
  'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
  'Jude', 'Revelation',
];

function bookToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export default function SitemapPage() {
  return (
    <div className="bg-[#FAFAF9] min-h-screen pb-24">
      <div className="max-w-5xl mx-auto px-6 pt-16">
        <h1 className="text-4xl font-bold font-display text-scripture mb-4">Sitemap</h1>
        <p className="text-lg text-primary-dark/60 mb-12">Browse all pages and resources on Bible Maximum.</p>

        <div className="space-y-12">
          {/* Main Pages */}
          <section>
            <h2 className="text-2xl font-semibold text-scripture mb-4">Main Pages</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Bible Quizzes', href: '/bible-quizzes' },
                { name: 'Lexicon', href: '/lexicon' },
                { name: 'Greek Lexicon', href: '/lexicon/browse/greek' },
                { name: 'Hebrew Lexicon', href: '/lexicon/browse/hebrew' },
                { name: 'Bible Chapter Summaries', href: '/bible-chapter-summaries' },
                { name: 'Bible Places', href: '/bible-places' },
                { name: 'Bible Geography', href: '/bible-geography' },
                { name: 'Bible Maps', href: '/bible-maps' },
                { name: 'Books of the Bible', href: '/books-of-the-bible' },
                { name: 'Old Testament Books', href: '/books-of-the-bible/old-testament' },
                { name: 'New Testament Books', href: '/books-of-the-bible/new-testament' },
                { name: 'Famous Bible Verses', href: '/famous-bible-verses' },
                { name: 'How to Study the Bible', href: '/how-to-study-the-bible' },
                { name: 'Bible Study for Beginners', href: '/bible-study-for-beginners' },
                { name: 'Bible Trivia', href: '/bible-trivia' },
                { name: 'Hebrew Words', href: '/hebrew-words' },
                { name: 'Greek Words', href: '/greek-words' },
                { name: 'Quiz Difficulty Levels', href: '/bible-quiz-difficulty' },
                { name: 'Easy Quizzes', href: '/bible-quiz-difficulty/easy' },
                { name: 'Medium Quizzes', href: '/bible-quiz-difficulty/medium' },
                { name: 'Hard Quizzes', href: '/bible-quiz-difficulty/hard' },
                { name: 'Theological Quizzes', href: '/bible-quiz-difficulty/theological' },
                { name: 'Jesus Quiz', href: '/jesus-quiz' },
                { name: 'Moses Quiz', href: '/moses-quiz' },
                { name: 'David Quiz', href: '/david-quiz' },
                { name: 'Paul Quiz', href: '/paul-quiz' },
                { name: 'Quiz Categories', href: '/bible-quiz-categories' },
                { name: 'About', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms of Service', href: '/terms-of-service' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-600 hover:text-blue-700 text-sm hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Old Testament */}
          <section>
            <h2 className="text-2xl font-semibold text-scripture mb-4">Old Testament Chapter Quizzes</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {OT_BOOKS.map(book => (
                <Link
                  key={book}
                  href={`/${bookToSlug(book)}-chapters`}
                  className="text-blue-600 hover:text-blue-700 text-sm hover:underline"
                >
                  {book}
                </Link>
              ))}
            </div>
          </section>

          {/* New Testament */}
          <section>
            <h2 className="text-2xl font-semibold text-scripture mb-4">New Testament Chapter Quizzes</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {NT_BOOKS.map(book => (
                <Link
                  key={book}
                  href={`/${bookToSlug(book)}-chapters`}
                  className="text-blue-600 hover:text-blue-700 text-sm hover:underline"
                >
                  {book}
                </Link>
              ))}
            </div>
          </section>

          {/* Old Testament Chapter Summaries */}
          <section>
            <h2 className="text-2xl font-semibold text-scripture mb-4">Old Testament Chapter Summaries</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {OT_BOOKS.map(book => (
                <Link
                  key={`summary-${book}`}
                  href={`/bible-chapter-summaries/${bookToSlug(book)}`}
                  className="text-blue-600 hover:text-blue-700 text-sm hover:underline"
                >
                  {book} Summaries
                </Link>
              ))}
            </div>
          </section>

          {/* New Testament Chapter Summaries */}
          <section>
            <h2 className="text-2xl font-semibold text-scripture mb-4">New Testament Chapter Summaries</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {NT_BOOKS.map(book => (
                <Link
                  key={`summary-${book}`}
                  href={`/bible-chapter-summaries/${bookToSlug(book)}`}
                  className="text-blue-600 hover:text-blue-700 text-sm hover:underline"
                >
                  {book} Summaries
                </Link>
              ))}
            </div>
          </section>

          {/* What Does the Bible Say About */}
          <section>
            <h2 className="text-2xl font-semibold text-scripture mb-4">What Does the Bible Say About...</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {[
                'Love', 'Strength', 'Faith', 'Death', 'Healing',
                'Anxiety', 'Prayer', 'Forgiveness', 'Hope', 'Marriage',
                'Peace', 'Patience', 'Money', 'Friendship', 'Worry',
                'Jealousy', 'Fear', 'Anger', 'Gratitude', 'Humility',
                'Pride', 'Temptation', 'Salvation', 'Grace', 'Joy',
              ].map(topic => (
                <Link
                  key={topic}
                  href={`/what-does-the-bible-say-about/${topic.toLowerCase()}`}
                  className="text-blue-600 hover:text-blue-700 text-sm hover:underline"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </section>

          {/* Bible Geography */}
          <section>
            <h2 className="text-2xl font-semibold text-scripture mb-4">Bible Geography</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { name: 'Bible Places A-Z', href: '/bible-places' },
                { name: 'Bible Geography by Book', href: '/bible-geography' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-600 hover:text-blue-700 text-sm hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold text-scripture mt-4 mb-2">Geography by Book</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {[...OT_BOOKS, ...NT_BOOKS].map(book => (
                <Link
                  key={`geo-${book}`}
                  href={`/bible-geography/${bookToSlug(book)}`}
                  className="text-blue-600 hover:text-blue-700 text-sm hover:underline"
                >
                  {book} Places
                </Link>
              ))}
            </div>
          </section>

          {/* XML Sitemap */}
          <section>
            <h2 className="text-2xl font-semibold text-scripture mb-4">For Search Engines</h2>
            <p className="text-primary-dark/70 text-sm">
              Looking for the XML sitemap?{' '}
              <a href="/sitemap.xml" className="text-blue-600 hover:text-blue-700 underline">View sitemap.xml</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
