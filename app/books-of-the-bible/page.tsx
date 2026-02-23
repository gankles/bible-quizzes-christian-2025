import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BIBLE_BOOKS, getOldTestamentBooks, getNewTestamentBooks } from '@/lib/bible-data';
import { getBookMetadata } from '@/lib/book-metadata';

export const metadata: Metadata = {
  title: 'All 66 Books of the Bible | Complete List of Old Testament & New Testament Books with Authors, Chapters & Categories | Bible Maximum',
  description: 'Complete guide to all 66 books of the Bible organized by testament and category. Explore every book from Genesis to Revelation with author, chapter count, category (Law, History, Poetry, Prophecy, Gospel, Epistle), and links to chapter-by-chapter quizzes and summaries.',
  keywords: [
    'books of the Bible', 'all 66 books of the Bible', 'Bible book list',
    'Old Testament books', 'New Testament books', 'Bible books in order',
    'how many books in the Bible', 'books of the Bible list', 'Bible book categories',
    'Pentateuch', 'Gospels', 'Epistles', 'Prophets', 'Bible study',
  ],
  openGraph: {
    title: 'All 66 Books of the Bible | Complete Guide | Bible Maximum',
    description: 'Complete guide to all 66 books of the Bible with authors, chapter counts, and categories. Old Testament and New Testament.',
    type: 'website',
    url: '/books-of-the-bible',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All 66 Books of the Bible | Complete Guide',
    description: 'Explore all 66 books of the Bible with authors, chapter counts, categories, and quiz links.',
  },
  alternates: { canonical: '/books-of-the-bible' },
};

const CATEGORY_LABELS: Record<string, string> = {
  'Pentateuch / Law': 'Law',
  'Historical': 'History',
  'History': 'History',
  'Poetry / Wisdom': 'Poetry',
  'Major Prophets': 'Prophecy',
  'Minor Prophets': 'Prophecy',
  'Gospel': 'Gospel',
  'Pauline Epistle': 'Epistle',
  'General Epistle': 'Epistle',
  'Apocalyptic / Prophecy': 'Prophecy',
};

function getShortCategory(category: string): string {
  return CATEGORY_LABELS[category] || category;
}

function BookCard({ name, slug, chapters, testament }: { name: string; slug: string; chapters: number; testament: string }) {
  const meta = getBookMetadata(slug);
  const author = meta?.author || 'Unknown';
  const rawCategory = meta?.category || (testament === 'old' ? 'Old Testament' : 'New Testament');
  const category = getShortCategory(rawCategory);

  return (
    <Link
      href={`/${slug}-chapters`}
      className="group bg-white rounded-xl border border-grace hover:border-sacred/60 hover:shadow-md transition-all p-5"
    >
      <h3 className="font-display font-bold text-scripture group-hover:text-blue-700 transition-colors">
        {name}
      </h3>
      <p className="text-xs text-primary-dark/50 mt-1">{category}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="text-sm text-primary-dark/70">{chapters} {chapters === 1 ? 'chapter' : 'chapters'}</span>
        <span className="text-xs text-primary-dark/50">{author}</span>
      </div>
      <span className="block text-blue-600 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        View Chapters &rarr;
      </span>
    </Link>
  );
}

function TestamentSection({ title, books, count, linkTo }: { title: string; books: typeof BIBLE_BOOKS; count: number; linkTo: string }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-display font-bold text-scripture">{title}</h2>
          <span className="text-sm text-primary-dark/50">{count} books</span>
        </div>
        <Link href={linkTo} className="text-sm text-blue-600 hover:underline">
          View All &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {books.map((book) => (
          <BookCard
            key={book.slug}
            name={book.name}
            slug={book.slug}
            chapters={book.chapters}
            testament={book.testament}
          />
        ))}
      </div>
    </section>
  );
}

export default function BooksOfTheBiblePage() {
  const otBooks = getOldTestamentBooks();
  const ntBooks = getNewTestamentBooks();
  const totalChapters = BIBLE_BOOKS.reduce((sum, b) => sum + b.chapters, 0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many books are in the Bible?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Bible contains 66 books in total: 39 books in the Old Testament and 27 books in the New Testament. These books were written by approximately 40 different authors over a period of about 1,500 years.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the first book of the Bible?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The first book of the Bible is Genesis, written by Moses around 1445-1405 BC. Genesis means "beginning" and covers the creation of the world, the fall of man, the flood, and the story of the patriarchs Abraham, Isaac, Jacob, and Joseph.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the last book of the Bible?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The last book of the Bible is Revelation, written by the Apostle John around 95 AD while exiled on the island of Patmos. Revelation contains prophetic visions about the end times, the return of Christ, and the establishment of a new heaven and earth.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the shortest book of the Bible?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'By chapter count, Obadiah, Philemon, 2 John, 3 John, and Jude each have only 1 chapter, making them the shortest books. By verse count, 2 John is often considered the shortest with only 13 verses, followed by 3 John with 14 verses.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the longest book of the Bible?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The longest book of the Bible is Psalms with 150 chapters and 2,461 verses. By word count, Jeremiah is often considered the longest book. The longest single chapter in the Bible is Psalm 119 with 176 verses.',
        },
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All 66 Books of the Bible',
    description: `Complete guide to all 66 books of the Bible with ${totalChapters.toLocaleString()} total chapters across Old and New Testaments.`,
    url: 'https://biblemaximum.com/books-of-the-bible',
    datePublished: '2025-02-01',
    dateModified: '2026-02-23',
    publisher: {
      '@type': 'Organization',
      name: 'Bible Maximum',
      logo: { '@type': 'ImageObject', url: 'https://biblemaximum.com/images/logo.png' },
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: 66,
      itemListElement: BIBLE_BOOKS.map((book, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: book.name,
        url: `https://biblemaximum.com/${book.slug}-chapters`,
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
        { '@type': 'ListItem', position: 2, name: 'Books of the Bible', item: 'https://biblemaximum.com/books-of-the-bible' },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-primary-light/30">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-grace">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li aria-hidden="true" className="text-primary-dark/40">/</li>
            <li aria-current="page" className="text-primary-dark/70">Books of the Bible</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mb-8">
          <div className="relative h-48 md:h-56 bg-gradient-to-r from-amber-800 to-amber-900">
            <Image
              src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png"
              alt="All 66 Books of the Bible"
              fill
              className="object-cover opacity-25"
              priority
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                Books of the Bible
              </h1>
              <p className="text-amber-100 max-w-2xl">
                Complete guide to all 66 books of the Bible. Explore every book from Genesis to Revelation with authors, chapter counts, and categories.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 divide-x divide-grace border-b border-grace">
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">66</p>
              <p className="text-sm text-primary-dark/70">Books</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{totalChapters.toLocaleString()}</p>
              <p className="text-sm text-primary-dark/70">Chapters</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">39</p>
              <p className="text-sm text-primary-dark/70">Old Testament</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">27</p>
              <p className="text-sm text-primary-dark/70">New Testament</p>
            </div>
          </div>
        </div>

        {/* Testament Navigation */}
        <div className="flex gap-3 mb-8">
          <Link
            href="/books-of-the-bible/old-testament"
            className="flex-1 bg-white border border-grace rounded-xl p-4 hover:border-sacred/60 hover:shadow-md transition-all text-center"
          >
            <p className="font-display font-bold text-scripture">Old Testament</p>
            <p className="text-sm text-primary-dark/60 mt-1">39 Books &middot; Genesis to Malachi</p>
          </Link>
          <Link
            href="/books-of-the-bible/new-testament"
            className="flex-1 bg-white border border-grace rounded-xl p-4 hover:border-sacred/60 hover:shadow-md transition-all text-center"
          >
            <p className="font-display font-bold text-scripture">New Testament</p>
            <p className="text-sm text-primary-dark/60 mt-1">27 Books &middot; Matthew to Revelation</p>
          </Link>
        </div>

        {/* Book Grids */}
        <div className="space-y-10">
          <TestamentSection title="Old Testament" books={otBooks} count={39} linkTo="/books-of-the-bible/old-testament" />
          <TestamentSection title="New Testament" books={ntBooks} count={27} linkTo="/books-of-the-bible/new-testament" />
        </div>

        {/* FAQ Section */}
        <section className="mt-10 bg-white rounded-xl shadow-sm border border-grace p-6 md:p-8">
          <h2 className="text-2xl font-display font-bold text-scripture mb-6">
            Frequently Asked Questions About the Books of the Bible
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-scripture mb-2">How many books are in the Bible?</h3>
              <p className="text-primary-dark/70 leading-relaxed">
                The Bible contains 66 books in total: 39 books in the Old Testament and 27 books in the New Testament. These books were written by approximately 40 different authors over a period of about 1,500 years, from roughly 1400 BC to 95 AD.
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold text-scripture mb-2">What is the first book of the Bible?</h3>
              <p className="text-primary-dark/70 leading-relaxed">
                The first book of the Bible is <Link href="/genesis-chapters" className="text-blue-600 hover:underline">Genesis</Link>, written by Moses around 1445-1405 BC. Genesis means &ldquo;beginning&rdquo; and covers the creation of the world, the fall of man, the flood, and the stories of the patriarchs Abraham, Isaac, Jacob, and Joseph.
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold text-scripture mb-2">What is the last book of the Bible?</h3>
              <p className="text-primary-dark/70 leading-relaxed">
                The last book of the Bible is <Link href="/revelation-chapters" className="text-blue-600 hover:underline">Revelation</Link>, written by the Apostle John around 95 AD while exiled on the island of Patmos. Revelation contains prophetic visions about the end times, the return of Christ, and the new heaven and earth.
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold text-scripture mb-2">What is the shortest book of the Bible?</h3>
              <p className="text-primary-dark/70 leading-relaxed">
                By chapter count, <Link href="/obadiah-chapters" className="text-blue-600 hover:underline">Obadiah</Link>, <Link href="/philemon-chapters" className="text-blue-600 hover:underline">Philemon</Link>, <Link href="/2-john-chapters" className="text-blue-600 hover:underline">2 John</Link>, <Link href="/3-john-chapters" className="text-blue-600 hover:underline">3 John</Link>, and <Link href="/jude-chapters" className="text-blue-600 hover:underline">Jude</Link> each have only 1 chapter. By verse count, 2 John is the shortest with 13 verses, followed by 3 John with 14 verses.
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold text-scripture mb-2">What is the longest book of the Bible?</h3>
              <p className="text-primary-dark/70 leading-relaxed">
                The longest book of the Bible is <Link href="/psalms-chapters" className="text-blue-600 hover:underline">Psalms</Link> with 150 chapters and 2,461 verses. By word count, Jeremiah is often considered the longest. The longest single chapter is Psalm 119 with 176 verses.
              </p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mt-8 bg-white rounded-xl shadow-sm border border-grace p-6">
          <h2 className="text-xl font-bold text-scripture mb-4">More Bible Resources</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/bible-chapter-summaries" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Bible Chapter Summaries</span>
            </Link>
            <Link href="/bible-quizzes" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Bible Quizzes</span>
            </Link>
            <Link href="/old-testament-quizzes" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Old Testament Quizzes</span>
            </Link>
            <Link href="/new-testament-quizzes" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">New Testament Quizzes</span>
            </Link>
            <Link href="/bible-study-guides" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Bible Study Guides</span>
            </Link>
            <Link href="/reading-plans" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Reading Plans</span>
            </Link>
            <Link href="/bible-stories" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Bible Stories</span>
            </Link>
            <Link href="/timeline" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Bible Timeline</span>
            </Link>
            <Link href="/bible-places" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Bible Places</span>
            </Link>
          </div>
        </section>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />
      </main>
    </div>
  );
}
