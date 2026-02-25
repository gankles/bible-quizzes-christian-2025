'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Bars3Icon,
  XMarkIcon,
  BookOpenIcon,
  AcademicCapIcon,
  UserGroupIcon,
  InformationCircleIcon,
  ChevronDownIcon
} from './icons';

const navigation = [
  {
    name: 'Bible Quizzes',
    href: '/bible-quizzes',
    icon: BookOpenIcon,
    children: [
      { name: 'All Bible Quizzes', href: '/bible-quizzes' },
      { name: 'Old Testament', href: '/old-testament-quizzes' },
      { name: 'New Testament', href: '/new-testament-quizzes' },
      { name: 'By Difficulty', href: '/bible-quiz-difficulty' },
      { name: 'Quiz Categories', href: '/bible-quiz-categories' },
      { name: 'Bible Trivia', href: '/bible-trivia' }
    ]
  },
  {
    name: 'Bible Books',
    href: '/bible-quizzes',
    icon: BookOpenIcon,
    children: [
      { name: 'Genesis', href: '/genesis-chapters' },
      { name: 'Exodus', href: '/exodus-chapters' },
      { name: 'Psalms', href: '/psalms-chapters' },
      { name: 'Proverbs', href: '/proverbs-chapters' },
      { name: 'Isaiah', href: '/isaiah-chapters' },
      { name: 'Matthew', href: '/matthew-chapters' },
      { name: 'John', href: '/john-chapters' },
      { name: 'Romans', href: '/romans-chapters' },
      { name: 'Revelation', href: '/revelation-chapters' },
      { name: 'All 66 Books', href: '/books-of-the-bible' }
    ]
  },
  {
    name: 'Characters',
    href: '/bible-quiz-categories',
    icon: UserGroupIcon,
    children: [
      { name: 'Jesus Quiz', href: '/jesus-quiz' },
      { name: 'Moses Quiz', href: '/moses-quiz' },
      { name: 'David Quiz', href: '/david-quiz' },
      { name: 'Paul Quiz', href: '/paul-quiz' },
      { name: 'Bible People', href: '/people' },
      { name: 'Bible Names', href: '/bible-names' }
    ]
  },
  {
    name: 'Study',
    href: '/how-to-study-the-bible',
    icon: AcademicCapIcon,
    children: [
      { name: 'Chapter Summaries', href: '/bible-chapter-summaries' },
      { name: 'Bible Places', href: '/bible-places' },
      { name: 'Bible Geography', href: '/bible-geography' },
      { name: 'Bible Maps', href: '/bible-maps' },
      { name: 'Interlinear Bible', href: '/interlinear' },
      { name: 'Bible Timeline', href: '/timeline' },
      { name: 'How to Study', href: '/how-to-study-the-bible' }
    ]
  },
  {
    name: 'Tools',
    href: '/lexicon',
    children: [
      { name: 'Hebrew Lexicon', href: '/lexicon/browse/hebrew' },
      { name: 'Greek Lexicon', href: '/lexicon/browse/greek' },
      { name: 'Hebrew Words', href: '/hebrew-words' },
      { name: 'Greek Words', href: '/greek-words' },
      { name: 'Word Studies', href: '/word-studies' },
      { name: "Nave's Topics", href: '/nave-topics' },
      { name: 'Cross-References', href: '/cross-references' }
    ]
  },
  {
    name: 'About',
    href: '/about',
    icon: InformationCircleIcon
  }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="bg-white border-b border-grace shadow-sm relative z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpenIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-scripture">Bible Maximum</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <div className="group">
                    <button
                      type="button"
                      className="flex items-center space-x-1 text-primary-dark/80 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <span>{item.name}</span>
                      <ChevronDownIcon className="h-4 w-4" />
                    </button>

                    {/* Dropdown menu */}
                    <div
                      className={`absolute left-0 top-full mt-1 w-64 bg-white rounded-md shadow-lg border border-grace transition-all duration-200 ${
                        activeDropdown === item.name
                          ? 'opacity-100 visible transform translate-y-0'
                          : 'opacity-0 invisible transform -translate-y-2'
                      }`}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-primary-dark/80 hover:bg-primary-light hover:text-blue-600 transition-colors duration-150"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-primary-dark/80 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="text-primary-dark/80 hover:text-blue-600 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation - CRITICAL: MAX 70% screen width */}
        <div
          className={`lg:hidden fixed inset-y-0 right-0 z-50 w-[70%] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-grace">
            <span className="text-lg font-semibold text-scripture">Menu</span>
            <button
              type="button"
              className="text-primary-dark/60 hover:text-primary-dark/80 p-1"
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="px-4 py-6 space-y-1 overflow-y-auto h-full">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full text-left px-3 py-2 text-base font-medium text-scripture hover:bg-primary-light/50 rounded-lg"
                      onClick={() => toggleDropdown(item.name)}
                    >
                      <span className="flex items-center space-x-2">
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span>{item.name}</span>
                      </span>
                      <ChevronDownIcon
                        className={`h-4 w-4 transform transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <div className={`ml-4 space-y-1 transition-all duration-200 ${
                      activeDropdown === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-primary-dark/70 hover:text-blue-600 hover:bg-primary-light rounded-lg"
                          onClick={closeMobileMenu}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-scripture hover:bg-primary-light/50 rounded-lg"
                    onClick={closeMobileMenu}
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    <span>{item.name}</span>
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-grace">
              <Link
                href="/login"
                className="block w-full bg-blue-600 text-white text-center px-3 py-2 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu backdrop - preserves 30% content visibility */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-25"
            onClick={closeMobileMenu}
          />
        )}
      </nav>
    </header>
  );
}
