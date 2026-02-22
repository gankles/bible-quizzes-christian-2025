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
      { name: 'Jesus Quiz', href: '/jesus-quiz' },
      { name: 'Moses Quiz', href: '/moses-quiz' },
      { name: 'David Quiz', href: '/david-quiz' },
      { name: 'Paul Quiz', href: '/paul-quiz' },
      { name: 'All Quizzes', href: '/bible-quizzes' },
      { name: 'Quiz Categories', href: '/bible-quiz-categories' }
    ]
  },
  {
    title: 'Study Resources',
    links: [
      { name: 'Bible Study Plans', href: '/bible-study-plans' },
      { name: 'Chapter Summaries', href: '/bible-chapter-summaries' },
      { name: 'Book Overviews', href: '/bible-book-overviews' },
      { name: 'Character Studies', href: '/bible-character-studies' },
      { name: 'Verse Explanations', href: '/bible-verses-explained' },
      { name: 'Memory Verses', href: '/bible-memory-verses' },
      { name: 'Discussion Questions', href: '/bible-discussion-questions' },
      { name: 'Bible Timeline', href: '/bible-timeline' },
      { name: 'Maps & Charts', href: '/bible-maps-charts' },
      { name: 'Printable Resources', href: '/printable-bible-resources' },
      { name: 'Teaching Materials', href: '/bible-teaching-materials' },
      { name: 'Study Guides', href: '/bible-study-guides' },
      { name: 'Interlinear Bible', href: '/interlinear' }
    ]
  },
  {
    title: 'Popular Topics',
    links: [
      { name: 'Ten Commandments', href: '/ten-commandments-quiz' },
      { name: "Lord's Prayer", href: '/lords-prayer-quiz' },
      { name: 'Miracles of Jesus', href: '/miracles-jesus-quiz' },
      { name: 'Parables', href: '/parables-quiz' },
      { name: 'Christmas', href: '/christmas-bible-quiz' },
      { name: 'Easter', href: '/easter-bible-quiz' },
      { name: 'Creation', href: '/creation-quiz' },
      { name: "Noah's Ark", href: '/noahs-ark-quiz' },
      { name: 'Exodus', href: '/exodus-quiz' },
      { name: 'Crucifixion', href: '/crucifixion-quiz' },
      { name: 'Resurrection', href: '/resurrection-quiz' },
      { name: 'All Topics', href: '/bible-quiz-topics' }
    ]
  },
  {
    title: 'Site Information',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'How It Works', href: '/how-bible-quiz-works' },
      { name: 'FAQ', href: '/bible-quiz-faq' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Sitemap', href: '/site-map' },
      { name: 'Newsletter', href: '/newsletter-signup' },
      { name: 'Submit Quiz', href: '/submit-quiz-questions' },
      { name: 'Feedback', href: '/feedback' },
      { name: 'Mobile App', href: '/bible-quiz-app' },
      { name: 'RSS Feed', href: '/rss' }
    ]
  }
];

const quizCategories = [
  { name: 'Easy Bible Quiz', href: '/easy-bible-quiz' },
  { name: 'Hard Bible Quiz', href: '/hard-bible-quiz' },
  { name: 'Kids Bible Quiz', href: '/kids-bible-quiz' },
  { name: 'Youth Bible Quiz', href: '/youth-bible-quiz' },
  { name: 'Adult Bible Quiz', href: '/adult-bible-quiz' },
  { name: 'Multiple Choice', href: '/multiple-choice-bible-quiz' },
  { name: 'True/False', href: '/true-false-bible-quiz' },
  { name: 'Fill in Blank', href: '/fill-in-blank-bible-quiz' },
  { name: 'Printable Quiz', href: '/printable-bible-quiz' },
  { name: 'Interactive Quiz', href: '/interactive-bible-quiz' },
  { name: 'Daily Bible Quiz', href: '/daily-bible-quiz' },
  { name: 'Quiz Games', href: '/bible-quiz-games' }
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
              <Link href="/sitemap" className="text-grace/70 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>

            {/* Social links */}
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-grace/70 hover:text-sacred transition-colors">
                Facebook
              </Link>
              <Link href="#" className="text-grace/70 hover:text-sacred transition-colors">
                Twitter
              </Link>
              <Link href="#" className="text-grace/70 hover:text-sacred transition-colors">
                YouTube
              </Link>
              <Link href="#" className="text-grace/70 hover:text-sacred transition-colors">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
