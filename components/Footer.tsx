import Link from 'next/link';
import { BookOpenIcon } from './icons';
import { BIBLE_BOOKS } from '@/lib/bible-data';

const footerSections = [
  {
    title: 'Bible Quizzes',
    links: [
      { name: 'Genesis Quiz', href: '/genesis-chapters' },
      { name: 'Matthew Quiz', href: '/matthew-chapters' },
      { name: 'John Quiz', href: '/john-chapters' },
      { name: 'Romans Quiz', href: '/romans-chapters' },
      { name: 'Psalms Quiz', href: '/psalms-chapters' },
      { name: 'Revelation Quiz', href: '/revelation-chapters' },
      { name: 'Old Testament Quizzes', href: '/old-testament-quizzes' },
      { name: 'New Testament Quizzes', href: '/new-testament-quizzes' },
      { name: 'Jesus Quiz', href: '/jesus-quiz' },
      { name: 'Moses Quiz', href: '/moses-quiz' },
      { name: 'David Quiz', href: '/david-quiz' },
      { name: 'Paul Quiz', href: '/paul-quiz' },
      { name: 'Bible Trivia', href: '/bible-trivia' },
      { name: 'Quiz Categories', href: '/bible-quiz-categories' },
      { name: 'All Quizzes', href: '/bible-quizzes' },
      { name: 'How It Works', href: '/how-bible-quiz-works' }
    ]
  },
  {
    title: 'Study Resources',
    links: [
      { name: 'How to Study the Bible', href: '/how-to-study-the-bible' },
      { name: 'Bible Study for Beginners', href: '/bible-study-for-beginners' },
      { name: 'Chapter Summaries', href: '/bible-chapter-summaries' },
      { name: 'Books of the Bible', href: '/books-of-the-bible' },
      { name: 'Famous Bible Verses', href: '/famous-bible-verses' },
      { name: 'Study Guides', href: '/bible-study-guides' },
      { name: 'Reading Plans', href: '/reading-plans' },
      { name: 'Bible Timeline', href: '/timeline' },
      { name: 'Bible Maps', href: '/bible-maps' },
      { name: 'Interlinear Bible', href: '/interlinear' },
      { name: 'Bible Places', href: '/bible-places' },
      { name: 'Bible Geography', href: '/bible-geography' }
    ]
  },
  {
    title: 'Bible Tools',
    links: [
      { name: 'Hebrew Words', href: '/hebrew-words' },
      { name: 'Greek Words', href: '/greek-words' },
      { name: 'Hebrew Lexicon', href: '/lexicon/browse/hebrew' },
      { name: 'Greek Lexicon', href: '/lexicon/browse/greek' },
      { name: 'Word Studies', href: '/word-studies' },
      { name: 'Cross-References', href: '/cross-references' },
      { name: 'Bible Topics', href: '/topics' },
      { name: "Nave's Topical Bible", href: '/nave-topics' },
      { name: 'Bible Names', href: '/bible-names' },
      { name: 'Bible People', href: '/people' },
      { name: 'Bible Stories', href: '/bible-stories' },
      { name: 'Commandments', href: '/commandments' }
    ]
  },
  {
    title: 'Site Information',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'FAQ', href: '/bible-quiz-faq' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Sitemap', href: '/site-map' }
    ]
  }
];

const quizCategories = [
  { name: 'Easy Quizzes', href: '/bible-quiz-difficulty/easy' },
  { name: 'Medium Quizzes', href: '/bible-quiz-difficulty/medium' },
  { name: 'Hard Quizzes', href: '/bible-quiz-difficulty/hard' },
  { name: 'Theological Quizzes', href: '/bible-quiz-difficulty/theological' },
  { name: 'Kids Bible Quiz', href: '/kids-bible-quiz' },
  { name: 'Old Testament Quizzes', href: '/old-testament-quizzes' },
  { name: 'New Testament Quizzes', href: '/new-testament-quizzes' },
  { name: 'Bible Trivia', href: '/bible-trivia' },
  { name: 'Genesis Chapters', href: '/genesis-chapters' },
  { name: 'Psalms Chapters', href: '/psalms-chapters' },
  { name: 'Matthew Chapters', href: '/matthew-chapters' },
  { name: 'Revelation Chapters', href: '/revelation-chapters' }
];

export default function Footer() {
  const oldTestamentBooks = BIBLE_BOOKS.filter(book => book.testament === 'old');
  const newTestamentBooks = BIBLE_BOOKS.filter(book => book.testament === 'new');

  return (
    <footer className="bg-scripture text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 text-sacred">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-grace hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bible Books Section */}
        <div className="mt-12 pt-8 border-t border-primary-dark/20">
          <h3 className="text-lg font-semibold mb-6 text-sacred">Bible Books</h3>

          {/* Old Testament */}
          <div className="mb-6">
            <h4 className="text-md font-medium mb-3 text-grace">Old Testament:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-1 text-sm">
              {oldTestamentBooks.map((book) => (
                <Link
                  key={book.slug}
                  href={`/books/${book.slug}`}
                  className="text-grace/70 hover:text-sacred transition-colors duration-200"
                >
                  {book.name}
                </Link>
              ))}
            </div>
          </div>

          {/* New Testament */}
          <div className="mb-6">
            <h4 className="text-md font-medium mb-3 text-grace">New Testament:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-1 text-sm">
              {newTestamentBooks.map((book) => (
                <Link
                  key={book.slug}
                  href={`/books/${book.slug}`}
                  className="text-grace/70 hover:text-sacred transition-colors duration-200"
                >
                  {book.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Quiz Categories */}
        <div className="mt-8 pt-8 border-t border-primary-dark/20">
          <h3 className="text-lg font-semibold mb-4 text-sacred">Quiz Categories</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
            {quizCategories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-grace/70 hover:text-sacred text-sm transition-colors duration-200"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-primary-dark/20 bg-scripture/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo and copyright */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BookOpenIcon className="h-6 w-6 text-sacred" />
                <span className="text-lg font-bold">Bible Maximum</span>
              </div>
              <span className="text-grace/70 text-sm">
                © 2025 Bible Maximum. All rights reserved.
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy-policy" className="text-grace/70 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-grace/70 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-grace/70 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/site-map" className="text-grace/70 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
