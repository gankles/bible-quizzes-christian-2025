'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Old Testament books data
interface BibleBook {
  name: string;
  chapters: number;
  slug: string;
  category: 'law' | 'history' | 'poetry' | 'major-prophets' | 'minor-prophets';
  description: string;
}

const OLD_TESTAMENT_BOOKS: BibleBook[] = [
  // Law (Torah)
  { name: 'Genesis', chapters: 50, slug: 'genesis', category: 'law', description: 'Creation, Abraham, Isaac, Jacob, and Joseph' },
  { name: 'Exodus', chapters: 40, slug: 'exodus', category: 'law', description: 'Moses and the deliverance from Egypt' },
  { name: 'Leviticus', chapters: 27, slug: 'leviticus', category: 'law', description: 'Laws for worship and holy living' },
  { name: 'Numbers', chapters: 36, slug: 'numbers', category: 'law', description: 'Wilderness wanderings and preparation' },
  { name: 'Deuteronomy', chapters: 34, slug: 'deuteronomy', category: 'law', description: 'Moses\' final speeches and the law' },
  
  // History
  { name: 'Joshua', chapters: 24, slug: 'joshua', category: 'history', description: 'Conquest of the Promised Land' },
  { name: 'Judges', chapters: 21, slug: 'judges', category: 'history', description: 'Israel\'s cycles of sin and deliverance' },
  { name: 'Ruth', chapters: 4, slug: 'ruth', category: 'history', description: 'A beautiful story of loyalty and redemption' },
  { name: '1 Samuel', chapters: 31, slug: '1-samuel', category: 'history', description: 'Samuel, Saul, and young David' },
  { name: '2 Samuel', chapters: 24, slug: '2-samuel', category: 'history', description: 'David\'s reign as king of Israel' },
  { name: '1 Kings', chapters: 22, slug: '1-kings', category: 'history', description: 'Solomon and the divided kingdom' },
  { name: '2 Kings', chapters: 25, slug: '2-kings', category: 'history', description: 'Fall of Israel and Judah' },
  { name: '1 Chronicles', chapters: 29, slug: '1-chronicles', category: 'history', description: 'David\'s reign retold' },
  { name: '2 Chronicles', chapters: 36, slug: '2-chronicles', category: 'history', description: 'Solomon through the exile' },
  { name: 'Ezra', chapters: 10, slug: 'ezra', category: 'history', description: 'Return from exile and temple rebuilding' },
  { name: 'Nehemiah', chapters: 13, slug: 'nehemiah', category: 'history', description: 'Rebuilding Jerusalem\'s walls' },
  { name: 'Esther', chapters: 10, slug: 'esther', category: 'history', description: 'God\'s providence in protecting His people' },
  
  // Poetry & Wisdom
  { name: 'Job', chapters: 42, slug: 'job', category: 'poetry', description: 'Suffering, faith, and God\'s sovereignty' },
  { name: 'Psalms', chapters: 150, slug: 'psalms', category: 'poetry', description: 'Songs of worship, praise, and lament' },
  { name: 'Proverbs', chapters: 31, slug: 'proverbs', category: 'poetry', description: 'Wisdom for daily living' },
  { name: 'Ecclesiastes', chapters: 12, slug: 'ecclesiastes', category: 'poetry', description: 'The meaning of life under the sun' },
  { name: 'Song of Solomon', chapters: 8, slug: 'song-of-solomon', category: 'poetry', description: 'Love, marriage, and devotion' },
  
  // Major Prophets
  { name: 'Isaiah', chapters: 66, slug: 'isaiah', category: 'major-prophets', description: 'Judgment, hope, and the coming Messiah' },
  { name: 'Jeremiah', chapters: 52, slug: 'jeremiah', category: 'major-prophets', description: 'The weeping prophet and judgment' },
  { name: 'Lamentations', chapters: 5, slug: 'lamentations', category: 'major-prophets', description: 'Mourning over Jerusalem\'s destruction' },
  { name: 'Ezekiel', chapters: 48, slug: 'ezekiel', category: 'major-prophets', description: 'Visions of judgment and restoration' },
  { name: 'Daniel', chapters: 12, slug: 'daniel', category: 'major-prophets', description: 'Faithfulness in exile and prophecy' },
  
  // Minor Prophets
  { name: 'Hosea', chapters: 14, slug: 'hosea', category: 'minor-prophets', description: 'God\'s faithful love despite unfaithfulness' },
  { name: 'Joel', chapters: 3, slug: 'joel', category: 'minor-prophets', description: 'The Day of the Lord and restoration' },
  { name: 'Amos', chapters: 9, slug: 'amos', category: 'minor-prophets', description: 'Justice, righteousness, and social reform' },
  { name: 'Obadiah', chapters: 1, slug: 'obadiah', category: 'minor-prophets', description: 'Judgment on Edom for pride' },
  { name: 'Jonah', chapters: 4, slug: 'jonah', category: 'minor-prophets', description: 'God\'s mercy to the nations' },
  { name: 'Micah', chapters: 7, slug: 'micah', category: 'minor-prophets', description: 'Justice, mercy, and humility' },
  { name: 'Nahum', chapters: 3, slug: 'nahum', category: 'minor-prophets', description: 'Judgment on Nineveh' },
  { name: 'Habakkuk', chapters: 3, slug: 'habakkuk', category: 'minor-prophets', description: 'Faith and trust in God\'s justice' },
  { name: 'Zephaniah', chapters: 3, slug: 'zephaniah', category: 'minor-prophets', description: 'The Day of the Lord approaches' },
  { name: 'Haggai', chapters: 2, slug: 'haggai', category: 'minor-prophets', description: 'Rebuilding the temple' },
  { name: 'Zechariah', chapters: 14, slug: 'zechariah', category: 'minor-prophets', description: 'Messianic visions and hope' },
  { name: 'Malachi', chapters: 4, slug: 'malachi', category: 'minor-prophets', description: 'The final Old Testament prophet' }
];

const CATEGORY_LABELS = {
  'law': 'Law (Torah)',
  'history': 'Historical Books',
  'poetry': 'Poetry & Wisdom',
  'major-prophets': 'Major Prophets',
  'minor-prophets': 'Minor Prophets'
};

const CATEGORY_COLORS = {
  'law': 'bg-blue-50 border-blue-200',
  'history': 'bg-green-50 border-green-200',
  'poetry': 'bg-purple-50 border-purple-200',
  'major-prophets': 'bg-orange-50 border-orange-200',
  'minor-prophets': 'bg-red-50 border-red-200'
};

export default function OldTestamentQuizzesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const totalChapters = OLD_TESTAMENT_BOOKS.reduce((sum, book) => sum + book.chapters, 0);

  const filteredBooks = useMemo(() => {
    let books = OLD_TESTAMENT_BOOKS;
    
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
    <div className="min-h-screen bg-primary-light/30">
      {/* Header */}
      <div className="bg-white border-b border-grace">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-scripture mb-4">Old Testament Bible Quizzes</h1>
          <p className="text-lg text-primary-dark/70 mb-8 max-w-2xl mx-auto">
            Explore the Hebrew Scriptures with comprehensive quizzes covering all 39 books from Genesis to Malachi.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder="Search Old Testament books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-grace rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-scripture">39</div>
              <div className="text-sm text-primary-dark/70">Books</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-scripture">{totalChapters.toLocaleString()}</div>
              <div className="text-sm text-primary-dark/70">Chapters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-scripture">15K+</div>
              <div className="text-sm text-primary-dark/70">Questions</div>
            </div>
          </div>

          {/* Ultimate Challenge Card */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <h2 className="text-xl font-bold text-scripture mb-4">
                ✨ Ultimate Old Testament Challenge
              </h2>
              <p className="text-primary-dark/70 mb-6 max-w-2xl mx-auto">
                Test your comprehensive knowledge of all 39 Old Testament books with our ultimate 30-question quiz covering the Law, History, Poetry, and Prophets.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/complete-old-testament-quiz"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Take 30-Question Old Testament Quiz
                </Link>
                <div className="flex items-center gap-4 text-sm text-primary-dark/70">
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
            <div className="bg-grace/20 p-1 rounded-lg">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-scripture text-white'
                    : 'text-primary-dark/70 hover:text-scripture'
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
                      : 'text-primary-dark/70 hover:text-scripture'
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
                <h2 className="text-2xl font-bold text-scripture mb-6">{categoryLabel} ({categoryBooks.length} Books)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryBooks.map((book) => (
                    <Link
                      key={book.slug}
                      href={`/${book.slug}-quiz`}
                      className="bg-white border border-grace rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200 hover:-translate-y-1"
                    >
                      <h3 className="font-semibold text-scripture mb-2">{book.name}</h3>
                      <p className="text-sm text-primary-dark/70 mb-2">{book.description}</p>
                      <p className="text-xs text-primary-dark/60">{book.chapters} chapters</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          // Show single category
          <div className={`p-6 rounded-lg border-2 ${CATEGORY_COLORS[selectedCategory as keyof typeof CATEGORY_COLORS]}`}>
            <h2 className="text-2xl font-bold text-scripture mb-6 text-center">
              {CATEGORY_LABELS[selectedCategory as keyof typeof CATEGORY_LABELS]} ({filteredBooks.length} Books)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBooks.map((book) => (
                <Link
                  key={book.slug}
                  href={`/${book.slug}-quiz`}
                  className="bg-white border border-grace rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200 hover:-translate-y-1"
                >
                  <h3 className="font-semibold text-scripture mb-2">{book.name}</h3>
                  <p className="text-sm text-primary-dark/70 mb-2">{book.description}</p>
                  <p className="text-xs text-primary-dark/60">{book.chapters} chapters</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-scripture mb-2">No books found</h3>
            <p className="text-primary-dark/70 mb-4">
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

      {/* Cross-Links to Other Study Resources */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-scripture mb-2">More Ways to Study the Old Testament</h2>
        <p className="text-primary-dark/60 mb-6">Go deeper with these complementary study tools.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
            { name: 'Chapter Summaries', href: '/bible-chapter-summaries', desc: 'Concise summaries for every chapter' },
            { name: 'Bible Geography', href: '/bible-geography', desc: 'Maps and locations in Scripture' },
            { name: 'Bible Places', href: '/bible-places', desc: 'Explore biblical locations' },
            { name: 'Interlinear Bible', href: '/interlinear', desc: 'Hebrew word-by-word analysis' },
            { name: 'Hebrew Lexicon', href: '/lexicon/browse/hebrew', desc: 'Study original Hebrew words' },
            { name: 'Bible Timeline', href: '/timeline', desc: 'Chronological events' },
            { name: 'Character Quizzes', href: '/bible-quiz-categories', desc: 'Jesus, Moses, David, Paul' },
            { name: 'New Testament Quizzes', href: '/new-testament-quizzes', desc: 'Continue with the NT' },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block p-4 bg-white rounded-lg border border-grace hover:border-blue-300 hover:shadow-md transition-all"
            >
              <span className="font-semibold text-scripture text-sm block mb-1">{link.name}</span>
              <span className="text-xs text-primary-dark/50">{link.desc}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Start Your Old Testament Journey</h2>
          <p className="text-xl text-blue-100 mb-8">
            Begin with the foundation of faith and explore God's covenant with His people.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/genesis-quiz"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors"
            >
              Start with Genesis
            </Link>
            <Link
              href="/psalms-quiz"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
            >
              Explore Psalms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}