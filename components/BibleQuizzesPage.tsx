'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BIBLE_BOOKS } from '@/lib/bible-data';

export default function BibleQuizzesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTestament, setSelectedTestament] = useState<string>('all');

  const oldTestamentBooks = BIBLE_BOOKS.filter(book => book.testament === 'old');
  const newTestamentBooks = BIBLE_BOOKS.filter(book => book.testament === 'new');
  const totalChapters = BIBLE_BOOKS.reduce((sum, book) => sum + book.chapters, 0);

  const filteredBooks = useMemo(() => {
    let books = BIBLE_BOOKS;
    
    if (selectedTestament !== 'all') {
      books = books.filter(book => book.testament === selectedTestament);
    }

    if (searchTerm) {
      books = books.filter(book => 
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return books;
  }, [searchTerm, selectedTestament]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bible Quizzes</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Comprehensive Bible quizzes for all 66 books. Test your biblical knowledge with interactive quizzes covering Old and New Testament.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder="Search Bible books..."
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
              <div className="text-3xl font-bold text-gray-900">1,200+</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
          </div>

          {/* Currently Available */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-green-800 mb-2">🎯 Currently Available</h2>
            <p className="text-green-700 mb-4">Genesis content is live! More books coming soon.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/genesis-quiz"
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Genesis Quiz
              </Link>
              <Link
                href="/genesis-1-quiz"
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Genesis Chapter 1
              </Link>
              <Link
                href="/genesis-chapters"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Genesis Chapters
              </Link>
            </div>
          </div>

          {/* Testament Filter */}
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setSelectedTestament('all')}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  selectedTestament === 'all' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Books
              </button>
              <button
                onClick={() => setSelectedTestament('old')}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  selectedTestament === 'old' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Old Testament
              </button>
              <button
                onClick={() => setSelectedTestament('new')}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  selectedTestament === 'new' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                New Testament
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {selectedTestament === 'all' ? (
          // Show both testaments
          <>
            {/* Old Testament Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Old Testament ({oldTestamentBooks.length} Books)</h2>
                <Link
                  href="/old-testament-quizzes"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {oldTestamentBooks.slice(0, 8).map((book) => (
                  <Link
                    key={book.slug}
                    href={`/${book.slug}-quiz`}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200 hover:-translate-y-1"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{book.name}</h3>
                    <p className="text-xs text-gray-500">{book.chapters} chapters</p>
                    {book.slug === 'genesis' && (
                      <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Available Now
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* New Testament Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">New Testament ({newTestamentBooks.length} Books)</h2>
                <Link
                  href="/new-testament-quizzes"
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                >
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {newTestamentBooks.slice(0, 8).map((book) => (
                  <Link
                    key={book.slug}
                    href={`/${book.slug}-quiz`}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-purple-300 transition-all duration-200 hover:-translate-y-1"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{book.name}</h3>
                    <p className="text-xs text-gray-500">{book.chapters} chapters</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      Coming Soon
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          // Show filtered books
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {selectedTestament === 'old' ? 'Old Testament' : 'New Testament'} Books ({filteredBooks.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredBooks.map((book) => (
                <Link
                  key={book.slug}
                  href={`/${book.slug}-quiz`}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200 hover:-translate-y-1"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{book.name}</h3>
                  <p className="text-xs text-gray-500">{book.chapters} chapters</p>
                  {book.slug === 'genesis' ? (
                    <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Available Now
                    </span>
                  ) : (
                    <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      Coming Soon
                    </span>
                  )}
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
              Try searching for a different book name or adjust your filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTestament('all');
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Start Your Bible Journey</h2>
          <p className="text-xl text-blue-100 mb-8">
            Begin with Genesis and explore the foundation of biblical faith.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/genesis-quiz"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start with Genesis
            </Link>
            <Link
              href="/genesis-1-quiz"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
            >
              Try Genesis Chapter 1
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}