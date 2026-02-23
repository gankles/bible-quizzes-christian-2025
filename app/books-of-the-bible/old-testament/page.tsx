import { Metadata } from 'next';
import Link from 'next/link';
import { getOldTestamentBooks, BIBLE_BOOKS } from '@/lib/bible-data';
import { getBookMetadata } from '@/lib/book-metadata';

export const metadata: Metadata = {
  title: '39 Books of the Old Testament | Complete List with Authors, Chapters & Categories from Genesis to Malachi | Bible Maximum',
  description: 'Explore all 39 books of the Old Testament organized by category: Law/Pentateuch (Genesis-Deuteronomy), History (Joshua-Esther), Poetry & Wisdom (Job-Song of Solomon), Major Prophets (Isaiah-Daniel), and Minor Prophets (Hosea-Malachi). Includes authors, chapter counts, and quiz links.',
  keywords: [
    'old testament books', 'books of the old testament', '39 books of the old testament',
    'old testament books in order', 'old testament book list', 'Pentateuch',
    'books of the Law', 'historical books of the Bible', 'wisdom books',
    'major prophets', 'minor prophets', 'Old Testament categories',
    'Old Testament authors', 'how many books in the Old Testament',
  ],
  openGraph: {
    title: '39 Books of the Old Testament | Complete Guide | Bible Maximum',
    description: 'Complete guide to all 39 Old Testament books organized by category with authors, chapter counts, and quiz links.',
    type: 'website',
    url: '/books-of-the-bible/old-testament',
  },
  twitter: {
    card: 'summary_large_image',
    title: '39 Books of the Old Testament | Complete Guide',
    description: 'Explore all 39 OT books: Law, History, Poetry, Major Prophets, and Minor Prophets with authors and chapter counts.',
  },
  alternates: { canonical: '/books-of-the-bible/old-testament' },
};

interface CategoryGroup {
  title: string;
  description: string;
  slugs: string[];
}

const OT_CATEGORIES: CategoryGroup[] = [
  {
    title: 'Law / Pentateuch',
    description: 'The five books of Moses form the foundation of the Old Testament, covering creation, the patriarchs, the Exodus, the Law given at Sinai, and Israel\'s preparation to enter the Promised Land.',
    slugs: ['genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy'],
  },
  {
    title: 'Historical Books',
    description: 'Twelve books spanning over 1,000 years of Israel\'s history, from the conquest of Canaan under Joshua through the united and divided kingdoms to the return from Babylonian exile.',
    slugs: ['joshua', 'judges', 'ruth', '1-samuel', '2-samuel', '1-kings', '2-kings', '1-chronicles', '2-chronicles', 'ezra', 'nehemiah', 'esther'],
  },
  {
    title: 'Poetry & Wisdom',
    description: 'Five books of Hebrew poetry and wisdom literature that explore the deepest questions of human existence: suffering, worship, practical living, the meaning of life, and romantic love.',
    slugs: ['job', 'psalms', 'proverbs', 'ecclesiastes', 'song-of-solomon'],
  },
  {
    title: 'Major Prophets',
    description: 'Five prophetic books called "major" due to their length, containing powerful messages of judgment and hope from God\'s greatest prophets during Israel\'s darkest hours.',
    slugs: ['isaiah', 'jeremiah', 'lamentations', 'ezekiel', 'daniel'],
  },
  {
    title: 'Minor Prophets',
    description: 'Twelve shorter prophetic books (also called "The Twelve") spanning from the 9th to the 5th century BC, each delivering urgent messages of repentance, judgment, and restoration.',
    slugs: ['hosea', 'joel', 'amos', 'obadiah', 'jonah', 'micah', 'nahum', 'habakkuk', 'zephaniah', 'haggai', 'zechariah', 'malachi'],
  },
];

function BookCard({ slug }: { slug: string }) {
  const book = BIBLE_BOOKS.find((b) => b.slug === slug);
  if (!book) return null;
  const meta = getBookMetadata(slug);
  const author = meta?.author || 'Unknown';

  return (
    <Link
      href={`/${slug}-chapters`}
      className="group bg-white rounded-xl border border-grace hover:border-sacred/60 hover:shadow-md transition-all p-5"
    >
      <h3 className="font-display font-bold text-scripture group-hover:text-blue-700 transition-colors">
        {book.name}
      </h3>
      <div className="flex items-center justify-between mt-3">
        <span className="text-sm text-primary-dark/70">{book.chapters} {book.chapters === 1 ? 'chapter' : 'chapters'}</span>
        <span className="text-xs text-primary-dark/50">{author}</span>
      </div>
      <span className="block text-blue-600 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        View Chapters &rarr;
      </span>
    </Link>
  );
}

export default function OldTestamentBooksPage() {
  const otBooks = getOldTestamentBooks();
  const totalChapters = otBooks.reduce((sum, b) => sum + b.chapters, 0);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Books of the Bible', item: 'https://biblemaximum.com/books-of-the-bible' },
      { '@type': 'ListItem', position: 3, name: 'Old Testament', item: 'https://biblemaximum.com/books-of-the-bible/old-testament' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the 5 sections of the Old Testament?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Old Testament is traditionally divided into 5 sections: (1) Law/Pentateuch (Genesis-Deuteronomy) - 5 books written by Moses covering creation through Israel\'s preparation to enter the Promised Land; (2) Historical Books (Joshua-Esther) - 12 books recording Israel\'s history from conquest to exile; (3) Poetry & Wisdom (Job-Song of Solomon) - 5 books of Hebrew poetry, worship, and wisdom literature; (4) Major Prophets (Isaiah-Daniel) - 5 longer prophetic books; and (5) Minor Prophets (Hosea-Malachi) - 12 shorter prophetic books.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many chapters are in the Old Testament?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The Old Testament contains ${totalChapters.toLocaleString()} chapters across its 39 books. The longest book is Psalms with 150 chapters, while the shortest books (Obadiah) have only 1 chapter. The Pentateuch has 187 chapters, the Historical Books have 249, Poetry & Wisdom has 243, Major Prophets have 183, and the Minor Prophets have 67 chapters.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Who wrote the most Old Testament books?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Moses is traditionally credited with writing the most Old Testament books, authoring the first five books of the Bible (the Pentateuch): Genesis, Exodus, Leviticus, Numbers, and Deuteronomy. He is also associated with Psalm 90. Other prolific Old Testament authors include David (many of the Psalms), Solomon (Proverbs, Ecclesiastes, Song of Solomon), and the prophet Jeremiah (Jeremiah and Lamentations).',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-primary-light/30">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-grace">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li aria-hidden="true" className="text-primary-dark/40">/</li>
            <li><Link href="/books-of-the-bible" className="text-blue-600 hover:underline">Books of the Bible</Link></li>
            <li aria-hidden="true" className="text-primary-dark/40">/</li>
            <li aria-current="page" className="text-primary-dark/70">Old Testament</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mb-8">
          <div className="relative h-48 md:h-56 bg-gradient-to-r from-amber-800 to-amber-900">
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                Books of the Old Testament
              </h1>
              <p className="text-amber-100 max-w-2xl mb-4">
                All 39 books of the Old Testament organized by category. From the Law of Moses to the Minor Prophets, explore every book with authors, chapter counts, and chapter-by-chapter quizzes.
              </p>
              <Link
                href="/old-testament-quizzes"
                className="inline-flex items-center px-6 py-3 bg-white text-amber-900 font-bold rounded-lg hover:bg-amber-50 transition-colors shadow-md w-fit"
              >
                Take an Old Testament Quiz
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 divide-x divide-grace border-b border-grace">
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">39</p>
              <p className="text-sm text-primary-dark/70">Books</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{totalChapters.toLocaleString()}</p>
              <p className="text-sm text-primary-dark/70">Chapters</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">5</p>
              <p className="text-sm text-primary-dark/70">Categories</p>
            </div>
          </div>
        </div>

        {/* Category Sections */}
        <div className="space-y-10">
          {OT_CATEGORIES.map((category) => {
            const categoryChapters = category.slugs.reduce((sum, slug) => {
              const book = BIBLE_BOOKS.find((b) => b.slug === slug);
              return sum + (book?.chapters || 0);
            }, 0);

            return (
              <section key={category.title}>
                <div className="mb-5">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-display font-bold text-scripture">{category.title}</h2>
                    <span className="text-sm text-primary-dark/50">
                      {category.slugs.length} {category.slugs.length === 1 ? 'book' : 'books'} &middot; {categoryChapters} chapters
                    </span>
                  </div>
                  <p className="text-primary-dark/70 leading-relaxed max-w-3xl">{category.description}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {category.slugs.map((slug) => (
                    <BookCard key={slug} slug={slug} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* FAQ Section */}
        <section className="mt-10 bg-white rounded-xl shadow-sm border border-grace p-6 md:p-8">
          <h2 className="text-2xl font-display font-bold text-scripture mb-6">
            Frequently Asked Questions About the Old Testament
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-scripture mb-2">What are the 5 sections of the Old Testament?</h3>
              <p className="text-primary-dark/70 leading-relaxed">
                The Old Testament is traditionally divided into 5 sections: (1) <strong>Law / Pentateuch</strong> (Genesis-Deuteronomy) &mdash; 5 books written by Moses covering creation through Israel&rsquo;s preparation to enter the Promised Land; (2) <strong>Historical Books</strong> (Joshua-Esther) &mdash; 12 books recording Israel&rsquo;s history from conquest to exile; (3) <strong>Poetry &amp; Wisdom</strong> (Job-Song of Solomon) &mdash; 5 books of Hebrew poetry, worship, and wisdom literature; (4) <strong>Major Prophets</strong> (Isaiah-Daniel) &mdash; 5 longer prophetic books; and (5) <strong>Minor Prophets</strong> (Hosea-Malachi) &mdash; 12 shorter prophetic books.
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold text-scripture mb-2">How many chapters are in the Old Testament?</h3>
              <p className="text-primary-dark/70 leading-relaxed">
                The Old Testament contains <strong>{totalChapters.toLocaleString()} chapters</strong> across its 39 books. The longest book is <Link href="/psalms-chapters" className="text-blue-600 hover:underline">Psalms</Link> with 150 chapters, while <Link href="/obadiah-chapters" className="text-blue-600 hover:underline">Obadiah</Link> is the shortest with only 1 chapter. The Pentateuch accounts for 187 chapters, the Historical Books for 249, Poetry &amp; Wisdom for 243, Major Prophets for 183, and the Minor Prophets for 67 chapters.
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold text-scripture mb-2">Who wrote the most Old Testament books?</h3>
              <p className="text-primary-dark/70 leading-relaxed">
                <strong>Moses</strong> is traditionally credited with writing the most Old Testament books, authoring the first five books of the Bible (the Pentateuch): <Link href="/genesis-chapters" className="text-blue-600 hover:underline">Genesis</Link>, <Link href="/exodus-chapters" className="text-blue-600 hover:underline">Exodus</Link>, <Link href="/leviticus-chapters" className="text-blue-600 hover:underline">Leviticus</Link>, <Link href="/numbers-chapters" className="text-blue-600 hover:underline">Numbers</Link>, and <Link href="/deuteronomy-chapters" className="text-blue-600 hover:underline">Deuteronomy</Link>. He is also associated with Psalm 90. Other prolific Old Testament authors include David (many of the Psalms), Solomon (Proverbs, Ecclesiastes, Song of Solomon), and the prophet Jeremiah (Jeremiah and Lamentations).
              </p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mt-8 bg-white rounded-xl shadow-sm border border-grace p-6">
          <h2 className="text-xl font-bold text-scripture mb-4">Explore More</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/books-of-the-bible" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">All 66 Books of the Bible</span>
            </Link>
            <Link href="/books-of-the-bible/new-testament" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">New Testament Books</span>
            </Link>
            <Link href="/old-testament-quizzes" className="flex items-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <span className="font-bold text-sm">Test Your Knowledge — Old Testament Quizzes</span>
            </Link>
            <Link href="/bible-chapter-summaries" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Bible Chapter Summaries</span>
            </Link>
            <Link href="/bible-quizzes" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Bible Quizzes</span>
            </Link>
            <Link href="/bible-study-guides" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Bible Study Guides</span>
            </Link>
          </div>
        </section>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </main>
    </div>
  );
}
