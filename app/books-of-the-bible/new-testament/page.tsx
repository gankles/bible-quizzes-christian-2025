import { Metadata } from 'next';
import Link from 'next/link';
import { getNewTestamentBooks, BIBLE_BOOKS } from '@/lib/bible-data';
import { getBookMetadata } from '@/lib/book-metadata';

export const metadata: Metadata = {
  title: '27 Books of the New Testament | Complete List with Authors, Chapters & Categories from Matthew to Revelation | Bible Maximum',
  description: 'Explore all 27 books of the New Testament organized by category: Gospels (Matthew-John), History (Acts), Pauline Epistles (Romans-Philemon), General Epistles (Hebrews-Jude), and Apocalyptic Prophecy (Revelation). Includes authors, chapter counts, and quiz links.',
  keywords: [
    'new testament books', 'books of the new testament', '27 books of the new testament',
    'new testament books in order', 'new testament book list', 'Gospels',
    'Pauline epistles', 'General epistles', 'books Paul wrote',
    'New Testament categories', 'New Testament authors',
    'how many books in the New Testament', 'epistles of the Bible',
  ],
  openGraph: {
    title: '27 Books of the New Testament | Complete Guide | Bible Maximum',
    description: 'Complete guide to all 27 New Testament books organized by category with authors, chapter counts, and quiz links.',
    type: 'website',
    url: '/books-of-the-bible/new-testament',
  },
  twitter: {
    card: 'summary_large_image',
    title: '27 Books of the New Testament | Complete Guide',
    description: 'Explore all 27 NT books: Gospels, Acts, Pauline Epistles, General Epistles, and Revelation with authors and chapter counts.',
  },
  alternates: { canonical: '/books-of-the-bible/new-testament' },
};

interface CategoryGroup {
  title: string;
  description: string;
  slugs: string[];
}

const NT_CATEGORIES: CategoryGroup[] = [
  {
    title: 'Gospels',
    description: 'Four accounts of the life, ministry, death, and resurrection of Jesus Christ. Each Gospel presents a unique perspective: Matthew for a Jewish audience, Mark with urgency, Luke with historical detail, and John with theological depth.',
    slugs: ['matthew', 'mark', 'luke', 'john'],
  },
  {
    title: 'History',
    description: 'The book of Acts, written by Luke as a sequel to his Gospel, records the birth and explosive growth of the early Church from Jerusalem to Rome, empowered by the Holy Spirit.',
    slugs: ['acts'],
  },
  {
    title: 'Pauline Epistles',
    description: 'Thirteen letters written by the Apostle Paul to churches and individuals across the Roman Empire. These epistles form the theological backbone of the New Testament, addressing doctrine, church life, and Christian conduct.',
    slugs: ['romans', '1-corinthians', '2-corinthians', 'galatians', 'ephesians', 'philippians', 'colossians', '1-thessalonians', '2-thessalonians', '1-timothy', '2-timothy', 'titus', 'philemon'],
  },
  {
    title: 'General Epistles',
    description: 'Eight letters written to the broader Christian community by various authors including the Apostles Peter and John, James the brother of Jesus, and Jude. These epistles address faith, perseverance, false teaching, and practical Christian living.',
    slugs: ['hebrews', 'james', '1-peter', '2-peter', '1-john', '2-john', '3-john', 'jude'],
  },
  {
    title: 'Apocalyptic / Prophecy',
    description: 'The book of Revelation, written by the Apostle John while exiled on Patmos, contains prophetic visions of the end times, the ultimate triumph of Christ, and the establishment of a new heaven and new earth.',
    slugs: ['revelation'],
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

export default function NewTestamentBooksPage() {
  const ntBooks = getNewTestamentBooks();
  const totalChapters = ntBooks.reduce((sum, b) => sum + b.chapters, 0);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Books of the Bible', item: 'https://biblemaximum.com/books-of-the-bible' },
      { '@type': 'ListItem', position: 3, name: 'New Testament', item: 'https://biblemaximum.com/books-of-the-bible/new-testament' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the 4 sections of the New Testament?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The New Testament is traditionally divided into 4 main sections: (1) Gospels (Matthew, Mark, Luke, John) - 4 accounts of Jesus\' life, ministry, death, and resurrection; (2) History (Acts) - the story of the early Church; (3) Epistles (Romans through Jude) - 21 letters divided into Pauline Epistles (13 letters by Paul) and General Epistles (8 letters by other apostles); and (4) Apocalyptic/Prophecy (Revelation) - prophetic visions of the end times and Christ\'s return.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many chapters are in the New Testament?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The New Testament contains ${totalChapters.toLocaleString()} chapters across its 27 books. The Gospels account for 89 chapters, Acts has 28 chapters, the Pauline Epistles have 87 chapters, the General Epistles have 34 chapters, and Revelation has 22 chapters. The longest NT book by chapters is Matthew and Acts (both 28 chapters).`,
        },
      },
      {
        '@type': 'Question',
        name: 'Who wrote the most New Testament books?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Apostle Paul wrote the most New Testament books, authoring 13 epistles: Romans, 1 & 2 Corinthians, Galatians, Ephesians, Philippians, Colossians, 1 & 2 Thessalonians, 1 & 2 Timothy, Titus, and Philemon. Paul\'s letters make up nearly half of the 27 New Testament books and form the doctrinal foundation of Christian theology. The Apostle John is the second most prolific NT author with 5 books (the Gospel of John, 1-3 John, and Revelation).',
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
            <li aria-current="page" className="text-primary-dark/70">New Testament</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mb-8">
          <div className="relative h-48 md:h-56 bg-gradient-to-r from-blue-800 to-blue-900">
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                Books of the New Testament
              </h1>
              <p className="text-blue-100 max-w-2xl mb-4">
                All 27 books of the New Testament organized by category. From the Gospels of Jesus Christ to the prophecy of Revelation, explore every book with authors, chapter counts, and chapter-by-chapter quizzes.
              </p>
              <Link
                href="/new-testament-quizzes"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md w-fit"
              >
                Take a New Testament Quiz
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 divide-x divide-grace border-b border-grace">
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">27</p>
              <p className="text-sm text-primary-dark/70">Books</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{totalChapters.toLocaleString()}</p>
              <p className="text-sm text-primary-dark/70">Chapters</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">4</p>
              <p className="text-sm text-primary-dark/70">Categories</p>
            </div>
          </div>
        </div>

        {/* Category Sections */}
        <div className="space-y-10">
          {NT_CATEGORIES.map((category) => {
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
                      {category.slugs.length} {category.slugs.length === 1 ? 'book' : 'books'} &middot; {categoryChapters} {categoryChapters === 1 ? 'chapter' : 'chapters'}
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
            Frequently Asked Questions About the New Testament
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-scripture mb-2">What are the 4 sections of the New Testament?</h3>
              <p className="text-primary-dark/70 leading-relaxed">
                The New Testament is traditionally divided into 4 main sections: (1) <strong>Gospels</strong> (Matthew, Mark, Luke, John) &mdash; 4 accounts of Jesus&rsquo; life, ministry, death, and resurrection; (2) <strong>History</strong> (Acts) &mdash; the story of the early Church&rsquo;s birth and growth; (3) <strong>Epistles</strong> (Romans through Jude) &mdash; 21 letters divided into Pauline Epistles (13 letters by Paul) and General Epistles (8 letters by other apostles); and (4) <strong>Apocalyptic / Prophecy</strong> (Revelation) &mdash; prophetic visions of the end times and Christ&rsquo;s return.
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold text-scripture mb-2">How many chapters are in the New Testament?</h3>
              <p className="text-primary-dark/70 leading-relaxed">
                The New Testament contains <strong>{totalChapters.toLocaleString()} chapters</strong> across its 27 books. The Gospels account for 89 chapters, <Link href="/acts-chapters" className="text-blue-600 hover:underline">Acts</Link> has 28 chapters, the Pauline Epistles have 87 chapters, the General Epistles have 34 chapters, and <Link href="/revelation-chapters" className="text-blue-600 hover:underline">Revelation</Link> has 22 chapters. The longest New Testament books by chapter count are <Link href="/matthew-chapters" className="text-blue-600 hover:underline">Matthew</Link> and Acts, both with 28 chapters.
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold text-scripture mb-2">Who wrote the most New Testament books?</h3>
              <p className="text-primary-dark/70 leading-relaxed">
                The Apostle <strong>Paul</strong> wrote the most New Testament books, authoring 13 epistles: <Link href="/romans-chapters" className="text-blue-600 hover:underline">Romans</Link>, <Link href="/1-corinthians-chapters" className="text-blue-600 hover:underline">1 Corinthians</Link>, <Link href="/2-corinthians-chapters" className="text-blue-600 hover:underline">2 Corinthians</Link>, <Link href="/galatians-chapters" className="text-blue-600 hover:underline">Galatians</Link>, <Link href="/ephesians-chapters" className="text-blue-600 hover:underline">Ephesians</Link>, <Link href="/philippians-chapters" className="text-blue-600 hover:underline">Philippians</Link>, <Link href="/colossians-chapters" className="text-blue-600 hover:underline">Colossians</Link>, 1 &amp; 2 Thessalonians, 1 &amp; 2 Timothy, <Link href="/titus-chapters" className="text-blue-600 hover:underline">Titus</Link>, and <Link href="/philemon-chapters" className="text-blue-600 hover:underline">Philemon</Link>. Paul&rsquo;s letters make up nearly half of the 27 New Testament books. The Apostle John is the second most prolific NT author with 5 books (the Gospel of John, 1-3 John, and Revelation).
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
            <Link href="/books-of-the-bible/old-testament" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Old Testament Books</span>
            </Link>
            <Link href="/new-testament-quizzes" className="flex items-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <span className="font-bold text-sm">Test Your Knowledge — New Testament Quizzes</span>
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
