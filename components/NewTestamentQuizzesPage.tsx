'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// New Testament books data
interface BibleBook {
  name: string;
  chapters: number;
  slug: string;
  category: 'gospels' | 'history' | 'paul-letters' | 'general-letters' | 'prophecy';
  description: string;
}

const NEW_TESTAMENT_BOOKS: BibleBook[] = [
  // Gospels
  { name: 'Matthew', chapters: 28, slug: 'matthew', category: 'gospels', description: 'Jesus as the promised Messiah and King' },
  { name: 'Mark', chapters: 16, slug: 'mark', category: 'gospels', description: 'Jesus as the suffering servant' },
  { name: 'Luke', chapters: 24, slug: 'luke', category: 'gospels', description: 'Jesus as the perfect man and Savior' },
  { name: 'John', chapters: 21, slug: 'john', category: 'gospels', description: 'Jesus as the Son of God and eternal life' },
  
  // History
  { name: 'Acts', chapters: 28, slug: 'acts', category: 'history', description: 'The birth and growth of the early church' },
  
  // Paul's Letters
  { name: 'Romans', chapters: 16, slug: 'romans', category: 'paul-letters', description: 'Salvation by faith and Christian living' },
  { name: '1 Corinthians', chapters: 16, slug: '1-corinthians', category: 'paul-letters', description: 'Unity, love, and spiritual gifts' },
  { name: '2 Corinthians', chapters: 13, slug: '2-corinthians', category: 'paul-letters', description: 'Ministry, suffering, and comfort' },
  { name: 'Galatians', chapters: 6, slug: 'galatians', category: 'paul-letters', description: 'Freedom in Christ and grace vs. law' },
  { name: 'Ephesians', chapters: 6, slug: 'ephesians', category: 'paul-letters', description: 'Unity in Christ and spiritual warfare' },
  { name: 'Philippians', chapters: 4, slug: 'philippians', category: 'paul-letters', description: 'Joy and contentment in Christ' },
  { name: 'Colossians', chapters: 4, slug: 'colossians', category: 'paul-letters', description: 'The supremacy of Christ' },
  { name: '1 Thessalonians', chapters: 5, slug: '1-thessalonians', category: 'paul-letters', description: 'Hope and the Second Coming' },
  { name: '2 Thessalonians', chapters: 3, slug: '2-thessalonians', category: 'paul-letters', description: 'Perseverance and end times' },
  { name: '1 Timothy', chapters: 6, slug: '1-timothy', category: 'paul-letters', description: 'Church leadership and pastoral care' },
  { name: '2 Timothy', chapters: 4, slug: '2-timothy', category: 'paul-letters', description: 'Paul\'s final words and perseverance' },
  { name: 'Titus', chapters: 3, slug: 'titus', category: 'paul-letters', description: 'Church order and good works' },
  { name: 'Philemon', chapters: 1, slug: 'philemon', category: 'paul-letters', description: 'Forgiveness and reconciliation' },
  
  // General Letters
  { name: 'Hebrews', chapters: 13, slug: 'hebrews', category: 'general-letters', description: 'Christ\'s superiority and faith' },
  { name: 'James', chapters: 5, slug: 'james', category: 'general-letters', description: 'Faith in action and practical living' },
  { name: '1 Peter', chapters: 5, slug: '1-peter', category: 'general-letters', description: 'Hope and suffering for righteousness' },
  { name: '2 Peter', chapters: 3, slug: '2-peter', category: 'general-letters', description: 'Growing in grace and false teachers' },
  { name: '1 John', chapters: 5, slug: '1-john', category: 'general-letters', description: 'Love, light, and eternal life' },
  { name: '2 John', chapters: 1, slug: '2-john', category: 'general-letters', description: 'Truth and love in fellowship' },
  { name: '3 John', chapters: 1, slug: '3-john', category: 'general-letters', description: 'Hospitality and church leadership' },
  { name: 'Jude', chapters: 1, slug: 'jude', category: 'general-letters', description: 'Contending for the faith' },
  
  // Prophecy
  { name: 'Revelation', chapters: 22, slug: 'revelation', category: 'prophecy', description: 'The end times and Christ\'s victory' }
];

const CATEGORY_LABELS = {
  'gospels': 'The Gospels',
  'history': 'Church History',
  'paul-letters': 'Paul\'s Letters',
  'general-letters': 'General Letters',
  'prophecy': 'Prophecy'
};

const CATEGORY_COLORS = {
  'gospels': 'bg-blue-50 border-blue-200',
  'history': 'bg-green-50 border-green-200',
  'paul-letters': 'bg-purple-50 border-purple-200',
  'general-letters': 'bg-orange-50 border-orange-200',
  'prophecy': 'bg-red-50 border-red-200'
};

export default function NewTestamentQuizzesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const totalChapters = NEW_TESTAMENT_BOOKS.reduce((sum, book) => sum + book.chapters, 0);

  const filteredBooks = useMemo(() => {
    let books = NEW_TESTAMENT_BOOKS;
    
    if (selectedCategory !== 'all') {
      books = books.filter(book => book.category === selectedCategory);
    }

    if (searchTerm) {
      books = books.filter(book => 
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return books;
  }, [searchTerm, selectedCategory]);

  const booksByCategory = useMemo(() => {
    const grouped: Record<string, BibleBook[]> = {};
    filteredBooks.forEach(book => {
      if (!grouped[book.category]) {
        grouped[book.category] = [];
      }
      grouped[book.category].push(book);
    });
    return grouped;
  }, [filteredBooks]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">New Testament Bible Quizzes</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore the life of Jesus and the early Christian church with comprehensive quizzes covering all 27 books from Matthew to Revelation.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder="Search New Testament books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">27</div>
              <div className="text-sm text-gray-600">Books</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{totalChapters.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Chapters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">7K+</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
          </div>

          {/* Ultimate Challenge Card */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                ✨ Ultimate New Testament Challenge
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Test your comprehensive knowledge of all 27 New Testament books with our ultimate 30-question quiz covering the Gospels, Acts, Letters, and Revelation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/complete-new-testament-quiz"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Take 30-Question New Testament Quiz
                </Link>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>⏱️</span>
                    <span>~20 minutes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📊</span>
                    <span>Difficulty: Hard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Books
              </button>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                    selectedCategory === key 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {selectedCategory === 'all' ? (
          // Show all categories
          Object.entries(CATEGORY_LABELS).map(([categoryKey, categoryLabel]) => {
            const categoryBooks = booksByCategory[categoryKey] || [];
            if (categoryBooks.length === 0) return null;
            
            return (
              <div key={categoryKey} className={`mb-12 p-6 rounded-lg border-2 ${CATEGORY_COLORS[categoryKey as keyof typeof CATEGORY_COLORS]}`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{categoryLabel} ({categoryBooks.length} Books)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryBooks.map((book) => (
                    <Link
                      key={book.slug}
                      href={`/${book.slug}-quiz`}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200 hover:-translate-y-1"
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">{book.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{book.description}</p>
                      <p className="text-xs text-gray-500">{book.chapters} chapters</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          // Show single category
          <div className={`p-6 rounded-lg border-2 ${CATEGORY_COLORS[selectedCategory as keyof typeof CATEGORY_COLORS]}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {CATEGORY_LABELS[selectedCategory as keyof typeof CATEGORY_LABELS]} ({filteredBooks.length} Books)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBooks.map((book) => (
                <Link
                  key={book.slug}
                  href={`/${book.slug}-quiz`}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200 hover:-translate-y-1"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{book.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{book.description}</p>
                  <p className="text-xs text-gray-500">{book.chapters} chapters</p>
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
              Try searching for a different book name or adjust your category filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
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
          <h2 className="text-3xl font-bold mb-4">Discover the New Covenant</h2>
          <p className="text-xl text-blue-100 mb-8">
            Explore Jesus' life, teachings, and the birth of the Christian church.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/matthew-quiz"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start with Matthew
            </Link>
            <Link
              href="/john-quiz"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
            >
              Explore John
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}