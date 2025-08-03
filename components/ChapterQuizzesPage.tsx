'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Bible books data with chapter counts
interface BibleBook {
  name: string;
  chapters: number;
  slug: string;
  testament: 'old' | 'new';
}

const OLD_TESTAMENT_BOOKS: BibleBook[] = [
  { name: 'Genesis', chapters: 50, slug: 'genesis', testament: 'old' },
  { name: 'Exodus', chapters: 40, slug: 'exodus', testament: 'old' },
  { name: 'Leviticus', chapters: 27, slug: 'leviticus', testament: 'old' },
  { name: 'Numbers', chapters: 36, slug: 'numbers', testament: 'old' },
  { name: 'Deuteronomy', chapters: 34, slug: 'deuteronomy', testament: 'old' },
  { name: 'Joshua', chapters: 24, slug: 'joshua', testament: 'old' },
  { name: 'Judges', chapters: 21, slug: 'judges', testament: 'old' },
  { name: 'Ruth', chapters: 4, slug: 'ruth', testament: 'old' },
  { name: '1 Samuel', chapters: 31, slug: '1-samuel', testament: 'old' },
  { name: '2 Samuel', chapters: 24, slug: '2-samuel', testament: 'old' },
  { name: '1 Kings', chapters: 22, slug: '1-kings', testament: 'old' },
  { name: '2 Kings', chapters: 25, slug: '2-kings', testament: 'old' },
  { name: '1 Chronicles', chapters: 29, slug: '1-chronicles', testament: 'old' },
  { name: '2 Chronicles', chapters: 36, slug: '2-chronicles', testament: 'old' },
  { name: 'Ezra', chapters: 10, slug: 'ezra', testament: 'old' },
  { name: 'Nehemiah', chapters: 13, slug: 'nehemiah', testament: 'old' },
  { name: 'Esther', chapters: 10, slug: 'esther', testament: 'old' },
  { name: 'Job', chapters: 42, slug: 'job', testament: 'old' },
  { name: 'Psalms', chapters: 150, slug: 'psalms', testament: 'old' },
  { name: 'Proverbs', chapters: 31, slug: 'proverbs', testament: 'old' },
  { name: 'Ecclesiastes', chapters: 12, slug: 'ecclesiastes', testament: 'old' },
  { name: 'Song of Solomon', chapters: 8, slug: 'song-of-solomon', testament: 'old' },
  { name: 'Isaiah', chapters: 66, slug: 'isaiah', testament: 'old' },
  { name: 'Jeremiah', chapters: 52, slug: 'jeremiah', testament: 'old' },
  { name: 'Lamentations', chapters: 5, slug: 'lamentations', testament: 'old' },
  { name: 'Ezekiel', chapters: 48, slug: 'ezekiel', testament: 'old' },
  { name: 'Daniel', chapters: 12, slug: 'daniel', testament: 'old' },
  { name: 'Hosea', chapters: 14, slug: 'hosea', testament: 'old' },
  { name: 'Joel', chapters: 3, slug: 'joel', testament: 'old' },
  { name: 'Amos', chapters: 9, slug: 'amos', testament: 'old' },
  { name: 'Obadiah', chapters: 1, slug: 'obadiah', testament: 'old' },
  { name: 'Jonah', chapters: 4, slug: 'jonah', testament: 'old' },
  { name: 'Micah', chapters: 7, slug: 'micah', testament: 'old' },
  { name: 'Nahum', chapters: 3, slug: 'nahum', testament: 'old' },
  { name: 'Habakkuk', chapters: 3, slug: 'habakkuk', testament: 'old' },
  { name: 'Zephaniah', chapters: 3, slug: 'zephaniah', testament: 'old' },
  { name: 'Haggai', chapters: 2, slug: 'haggai', testament: 'old' },
  { name: 'Zechariah', chapters: 14, slug: 'zechariah', testament: 'old' },
  { name: 'Malachi', chapters: 4, slug: 'malachi', testament: 'old' }
];

const NEW_TESTAMENT_BOOKS: BibleBook[] = [
  { name: 'Matthew', chapters: 28, slug: 'matthew', testament: 'new' },
  { name: 'Mark', chapters: 16, slug: 'mark', testament: 'new' },
  { name: 'Luke', chapters: 24, slug: 'luke', testament: 'new' },
  { name: 'John', chapters: 21, slug: 'john', testament: 'new' },
  { name: 'Acts', chapters: 28, slug: 'acts', testament: 'new' },
  { name: 'Romans', chapters: 16, slug: 'romans', testament: 'new' },
  { name: '1 Corinthians', chapters: 16, slug: '1-corinthians', testament: 'new' },
  { name: '2 Corinthians', chapters: 13, slug: '2-corinthians', testament: 'new' },
  { name: 'Galatians', chapters: 6, slug: 'galatians', testament: 'new' },
  { name: 'Ephesians', chapters: 6, slug: 'ephesians', testament: 'new' },
  { name: 'Philippians', chapters: 4, slug: 'philippians', testament: 'new' },
  { name: 'Colossians', chapters: 4, slug: 'colossians', testament: 'new' },
  { name: '1 Thessalonians', chapters: 5, slug: '1-thessalonians', testament: 'new' },
  { name: '2 Thessalonians', chapters: 3, slug: '2-thessalonians', testament: 'new' },
  { name: '1 Timothy', chapters: 6, slug: '1-timothy', testament: 'new' },
  { name: '2 Timothy', chapters: 4, slug: '2-timothy', testament: 'new' },
  { name: 'Titus', chapters: 3, slug: 'titus', testament: 'new' },
  { name: 'Philemon', chapters: 1, slug: 'philemon', testament: 'new' },
  { name: 'Hebrews', chapters: 13, slug: 'hebrews', testament: 'new' },
  { name: 'James', chapters: 5, slug: 'james', testament: 'new' },
  { name: '1 Peter', chapters: 5, slug: '1-peter', testament: 'new' },
  { name: '2 Peter', chapters: 3, slug: '2-peter', testament: 'new' },
  { name: '1 John', chapters: 5, slug: '1-john', testament: 'new' },
  { name: '2 John', chapters: 1, slug: '2-john', testament: 'new' },
  { name: '3 John', chapters: 1, slug: '3-john', testament: 'new' },
  { name: 'Jude', chapters: 1, slug: 'jude', testament: 'new' },
  { name: 'Revelation', chapters: 22, slug: 'revelation', testament: 'new' }
];

const ALL_BOOKS = [...OLD_TESTAMENT_BOOKS, ...NEW_TESTAMENT_BOOKS];

export default function ChapterQuizzesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'old' | 'new'>('all');

  const totalChapters = ALL_BOOKS.reduce((sum, book) => sum + book.chapters, 0);

  const filteredBooks = useMemo(() => {
    let books = ALL_BOOKS;
    
    if (activeTab === 'old') {
      books = OLD_TESTAMENT_BOOKS;
    } else if (activeTab === 'new') {
      books = NEW_TESTAMENT_BOOKS;
    }

    if (searchTerm) {
      books = books.filter(book => 
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return books;
  }, [searchTerm, activeTab]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bible Chapter Quizzes</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore every chapter of the Bible with focused quizzes designed for deep study and understanding.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder="Search for any Bible book..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">66</div>
              <div className="text-sm text-gray-600">Books</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{totalChapters.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Chapters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">20K+</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${
                  activeTab === 'all' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Books
              </button>
              <button
                onClick={() => setActiveTab('old')}
                className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${
                  activeTab === 'old' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Old Testament (39)
              </button>
              <button
                onClick={() => setActiveTab('new')}
                className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${
                  activeTab === 'new' 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                New Testament (27)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Old Testament Section */}
        {(activeTab === 'all' || activeTab === 'old') && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Old Testament ({OLD_TESTAMENT_BOOKS.filter(book => 
                !searchTerm || book.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).length} Books)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {OLD_TESTAMENT_BOOKS.filter(book => 
                !searchTerm || book.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((book) => (
                <Link
                  key={book.slug}
                  href={`/${book.slug}-quiz`}
                  className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md hover:border-blue-300 transition-all duration-200 hover:-translate-y-1"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{book.name}</h3>
                  <p className="text-sm text-gray-600">{book.chapters} chapters</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* New Testament Section */}
        {(activeTab === 'all' || activeTab === 'new') && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              New Testament ({NEW_TESTAMENT_BOOKS.filter(book => 
                !searchTerm || book.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).length} Books)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {NEW_TESTAMENT_BOOKS.filter(book => 
                !searchTerm || book.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((book) => (
                <Link
                  key={book.slug}
                  href={`/${book.slug}-quiz`}
                  className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md hover:border-blue-300 transition-all duration-200 hover:-translate-y-1"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{book.name}</h3>
                  <p className="text-sm text-gray-600">{book.chapters} chapters</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600 mb-4">
              Try searching for a different book name.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Start Your Chapter Study</h2>
          <p className="text-xl text-blue-100 mb-8">
            Choose any book to explore its chapters and deepen your biblical understanding.
          </p>
          <Link
            href="/genesis-quiz"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            Start with Genesis
          </Link>
        </div>
      </div>
    </div>
  );
}