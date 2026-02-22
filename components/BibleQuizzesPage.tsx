'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BIBLE_BOOKS } from '@/lib/bible-data';

const difficultyFilters = [
  { value: 'all', label: 'All Levels', color: 'bg-grace/20 text-primary-dark/80' },
  { value: 'beginner', label: 'Beginner Friendly', color: 'bg-green-100 text-green-700' },
  { value: 'intermediate', label: 'Some Experience', color: 'bg-amber-100 text-amber-700' },
  { value: 'advanced', label: 'Bible Scholar', color: 'bg-red-100 text-red-700' },
];

const categoryFilters = [
  { value: 'all', label: 'All Categories' },
  { value: 'pentateuch', label: 'Pentateuch (Law)' },
  { value: 'history', label: 'Historical Books' },
  { value: 'wisdom', label: 'Wisdom & Poetry' },
  { value: 'prophets', label: 'Prophetic Books' },
  { value: 'gospels', label: 'Gospels' },
  { value: 'epistles', label: 'Epistles (Letters)' },
];

const bookCategories: Record<string, string> = {
  genesis: 'pentateuch', exodus: 'pentateuch', leviticus: 'pentateuch', numbers: 'pentateuch', deuteronomy: 'pentateuch',
  joshua: 'history', judges: 'history', ruth: 'history', '1-samuel': 'history', '2-samuel': 'history',
  '1-kings': 'history', '2-kings': 'history', '1-chronicles': 'history', '2-chronicles': 'history',
  ezra: 'history', nehemiah: 'history', esther: 'history',
  job: 'wisdom', psalms: 'wisdom', proverbs: 'wisdom', ecclesiastes: 'wisdom', 'song-of-solomon': 'wisdom',
  isaiah: 'prophets', jeremiah: 'prophets', lamentations: 'prophets', ezekiel: 'prophets', daniel: 'prophets',
  hosea: 'prophets', joel: 'prophets', amos: 'prophets', obadiah: 'prophets', jonah: 'prophets',
  micah: 'prophets', nahum: 'prophets', habakkuk: 'prophets', zephaniah: 'prophets', haggai: 'prophets',
  zechariah: 'prophets', malachi: 'prophets',
  matthew: 'gospels', mark: 'gospels', luke: 'gospels', john: 'gospels',
  acts: 'history',
  romans: 'epistles', '1-corinthians': 'epistles', '2-corinthians': 'epistles', galatians: 'epistles',
  ephesians: 'epistles', philippians: 'epistles', colossians: 'epistles', '1-thessalonians': 'epistles',
  '2-thessalonians': 'epistles', '1-timothy': 'epistles', '2-timothy': 'epistles', titus: 'epistles',
  philemon: 'epistles', hebrews: 'epistles', james: 'epistles', '1-peter': 'epistles', '2-peter': 'epistles',
  '1-john': 'epistles', '2-john': 'epistles', '3-john': 'epistles', jude: 'epistles', revelation: 'prophets',
};

const beginnerBooks = ['genesis', 'exodus', 'ruth', 'jonah', 'psalms', 'proverbs', 'matthew', 'mark', 'luke', 'john', 'acts', 'james', 'philippians'];
const advancedBooks = ['leviticus', 'numbers', 'ezekiel', 'daniel', 'revelation', 'hebrews', 'romans'];

export default function BibleQuizzesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTestament, setSelectedTestament] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

    if (selectedCategory !== 'all') {
      books = books.filter(book => bookCategories[book.slug] === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      books = books.filter(book => {
        if (selectedDifficulty === 'beginner') return beginnerBooks.includes(book.slug);
        if (selectedDifficulty === 'advanced') return advancedBooks.includes(book.slug);
        return !beginnerBooks.includes(book.slug) && !advancedBooks.includes(book.slug);
      });
    }

    return books;
  }, [searchTerm, selectedTestament, selectedDifficulty, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTestament('all');
    setSelectedDifficulty('all');
    setSelectedCategory('all');
  };

  const hasActiveFilters = searchTerm || selectedTestament !== 'all' || selectedDifficulty !== 'all' || selectedCategory !== 'all';

  return (
    <div className="min-h-screen bg-primary-light/30">
      <div className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white">
        <div className="absolute inset-0 bg-black/30" />
        <Image
          src="/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png"
          alt="Open Bible"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bible Quizzes</h1>
          <p className="text-xl text-blue-100 mb-2 max-w-2xl mx-auto">
            66 books. 1,189 chapters. Thousands of questions.
          </p>
          <p className="text-lg text-blue-200 mb-8 max-w-xl mx-auto">
            Whether you&apos;re new to the Bible or you&apos;ve read it a hundred times, 
            there&apos;s always something new to discover. Let&apos;s find out what you know.
          </p>
          
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-dark/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for a book... (try 'Genesis' or 'John')"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-0 rounded-lg text-scripture bg-white/95 backdrop-blur-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">66</div>
              <div className="text-sm text-blue-200">Books</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">{totalChapters.toLocaleString()}</div>
              <div className="text-sm text-blue-200">Chapters</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">1,200+</div>
              <div className="text-sm text-blue-200">Questions</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">Free</div>
              <div className="text-sm text-blue-200">Forever</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-primary-dark/80">Filter:</span>
            
            <div className="flex gap-1 p-1 bg-grace/20 rounded-lg">
              {['all', 'old', 'new'].map((testament) => (
                <button
                  key={testament}
                  onClick={() => setSelectedTestament(testament)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    selectedTestament === testament 
                      ? 'bg-white shadow text-scripture' 
                      : 'text-primary-dark/70 hover:text-scripture'
                  }`}
                >
                  {testament === 'all' ? 'All' : testament === 'old' ? 'OT' : 'NT'}
                </button>
              ))}
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 border border-grace rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500"
            >
              {categoryFilters.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-1.5 border border-grace rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500"
            >
              {difficultyFilters.map((diff) => (
                <option key={diff.value} value={diff.value}>{diff.label}</option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Clear filters
              </button>
            )}

            <span className="ml-auto text-sm text-primary-dark/60">
              {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {filteredBooks.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-scripture mb-2">No books match your filters</h3>
            <p className="text-primary-dark/70 mb-6">Try adjusting your search or filters to find what you&apos;re looking for.</p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Show All Books
            </button>
          </div>
        ) : hasActiveFilters ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredBooks.map((book) => (
              <Link
                key={book.slug}
                href={`/books/${book.slug}`}
                className="bg-white border border-grace rounded-xl p-5 hover:shadow-lg hover:border-blue-300 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-scripture group-hover:text-blue-600">{book.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    beginnerBooks.includes(book.slug) ? 'bg-green-100 text-green-700' :
                    advancedBooks.includes(book.slug) ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {beginnerBooks.includes(book.slug) ? 'Easy' :
                     advancedBooks.includes(book.slug) ? 'Hard' : 'Med'}
                  </span>
                </div>
                <p className="text-sm text-primary-dark/60 mb-3">{book.chapters} chapters</p>
                <div className="flex gap-2">
                  <span className="text-xs bg-grace/20 text-primary-dark/70 px-2 py-1 rounded">
                    {book.testament === 'old' ? 'Old Testament' : 'New Testament'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <>
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-scripture">Old Testament</h2>
                  <p className="text-primary-dark/70">39 books from Creation to the prophets</p>
                </div>
                <Link href="/old-testament-quizzes" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {oldTestamentBooks.map((book) => (
                  <Link
                    key={book.slug}
                    href={`/books/${book.slug}`}
                    className="bg-white border border-grace rounded-lg p-3 text-center hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
                  >
                    <div className="font-medium text-scripture group-hover:text-blue-600 text-sm truncate">
                      {book.name}
                    </div>
                    <div className="text-xs text-primary-dark/60 mt-1">
                      {book.chapters} ch
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-scripture">New Testament</h2>
                  <p className="text-primary-dark/70">27 books from the Gospels to Revelation</p>
                </div>
                <Link href="/new-testament-quizzes" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {newTestamentBooks.map((book) => (
                  <Link
                    key={book.slug}
                    href={`/books/${book.slug}`}
                    className="bg-white border border-grace rounded-lg p-3 text-center hover:shadow-md hover:border-purple-300 transition-all duration-200 group"
                  >
                    <div className="font-medium text-scripture group-hover:text-purple-600 text-sm truncate">
                      {book.name}
                    </div>
                    <div className="text-xs text-primary-dark/60 mt-1">
                      {book.chapters} ch
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Not Sure Where to Start?</h2>
          <p className="text-green-100 mb-6 text-lg">
            Here are our top picks for first-timers and returning champions.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Link
              href="/genesis-1-quiz"
              className="bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors"
            >
              <div className="font-semibold mb-1">Genesis 1</div>
              <div className="text-sm text-green-200">Start at the very beginning</div>
            </Link>
            <Link
              href="/john-3-quiz"
              className="bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors"
            >
              <div className="font-semibold mb-1">John 3</div>
              <div className="text-sm text-green-200">The heart of the Gospel</div>
            </Link>
            <Link
              href="/psalms-23-quiz"
              className="bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors"
            >
              <div className="font-semibold mb-1">Psalm 23</div>
              <div className="text-sm text-green-200">The Shepherd&apos;s Psalm</div>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-grace/20 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-scripture text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-white rounded-lg border border-grace p-4 group">
              <summary className="font-medium text-scripture cursor-pointer list-none flex justify-between items-center">
                How many questions are in each quiz?
                <span className="text-primary-dark/40 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-primary-dark/70">
                Chapter quizzes have 16 questions each. Book quizzes have 25 comprehensive questions covering the entire book. 
                All questions include detailed explanations and Bible verse references.
              </p>
            </details>
            <details className="bg-white rounded-lg border border-grace p-4 group">
              <summary className="font-medium text-scripture cursor-pointer list-none flex justify-between items-center">
                Are the quizzes free?
                <span className="text-primary-dark/40 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-primary-dark/70">
                Yes! All quizzes are completely free. No account required, no hidden fees. 
                We believe Bible education should be accessible to everyone.
              </p>
            </details>
            <details className="bg-white rounded-lg border border-grace p-4 group">
              <summary className="font-medium text-scripture cursor-pointer list-none flex justify-between items-center">
                What Bible version do you use?
                <span className="text-primary-dark/40 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-primary-dark/70">
                Questions are based primarily on the King James Version (KJV), but are written to be applicable 
                across most major translations. Verse references are provided so you can look up any version.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
