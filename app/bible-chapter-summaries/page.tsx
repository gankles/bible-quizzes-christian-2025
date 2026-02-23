import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BIBLE_BOOKS, getOldTestamentBooks, getNewTestamentBooks } from '@/lib/bible-data';
import { getBookMetadata } from '@/lib/book-metadata';

export const metadata: Metadata = {
  title: 'Bible Chapter Summaries | All 66 Books Chapter-by-Chapter | Bible Maximum',
  description: 'Complete chapter-by-chapter summaries for all 66 books of the Bible. Browse 1,189 chapters with titles, key events, and verse counts. Old Testament and New Testament overview.',
  keywords: [
    'Bible chapter summaries', 'Bible book summaries', 'chapter by chapter Bible',
    'Bible overview', 'Old Testament summaries', 'New Testament summaries',
    'Bible study guide', 'book of the Bible summary',
  ],
  openGraph: {
    title: 'Bible Chapter Summaries | All 66 Books | Bible Maximum',
    description: 'Complete chapter-by-chapter summaries for all 66 books of the Bible.',
    type: 'website',
    url: '/bible-chapter-summaries',
  },
  alternates: { canonical: '/bible-chapter-summaries' },
};

function BookCard({ name, slug, chapters, testament }: { name: string; slug: string; chapters: number; testament: string }) {
  const meta = getBookMetadata(slug);
  const category = meta?.category || (testament === 'old' ? 'Old Testament' : 'New Testament');

  return (
    <Link
      href={`/bible-chapter-summaries/${slug}`}
      className="group bg-white rounded-xl border border-grace hover:border-sacred/60 hover:shadow-md transition-all p-5"
    >
      <h3 className="font-display font-bold text-scripture group-hover:text-blue-700 transition-colors">
        {name}
      </h3>
      <p className="text-xs text-primary-dark/50 mt-1">{category}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="text-sm text-primary-dark/70">{chapters} {chapters === 1 ? 'chapter' : 'chapters'}</span>
        <span className="text-blue-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
      </div>
    </Link>
  );
}

function TestamentSection({ title, books, count }: { title: string; books: typeof BIBLE_BOOKS; count: number }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-2xl font-display font-bold text-scripture">{title}</h2>
        <span className="text-sm text-primary-dark/50">{count} books</span>
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

export default function BibleChapterSummariesPage() {
  const otBooks = getOldTestamentBooks();
  const ntBooks = getNewTestamentBooks();
  const totalChapters = BIBLE_BOOKS.reduce((sum, b) => sum + b.chapters, 0);

  return (
    <div className="min-h-screen bg-primary-light/30">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-grace">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li aria-hidden="true" className="text-primary-dark/40">/</li>
            <li aria-current="page" className="text-primary-dark/70">Bible Chapter Summaries</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mb-8">
          <div className="relative h-48 md:h-56 bg-gradient-to-r from-amber-800 to-amber-900">
            <Image
              src="/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png"
              alt="Bible Chapter Summaries"
              fill
              className="object-cover opacity-25"
              priority
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                Bible Chapter Summaries
              </h1>
              <p className="text-amber-100 max-w-2xl">
                Chapter-by-chapter overview of every book in the Bible. Explore titles, key events, and verse counts for all {totalChapters.toLocaleString()} chapters.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 divide-x divide-grace border-b border-grace">
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">66</p>
              <p className="text-sm text-primary-dark/70">Books</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{totalChapters.toLocaleString()}</p>
              <p className="text-sm text-primary-dark/70">Chapters</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">2</p>
              <p className="text-sm text-primary-dark/70">Testaments</p>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <TestamentSection title="Old Testament" books={otBooks} count={39} />
          <TestamentSection title="New Testament" books={ntBooks} count={27} />
        </div>

        {/* Internal Links */}
        <section className="mt-10 bg-white rounded-xl shadow-sm border border-grace p-6">
          <h2 className="text-xl font-bold text-scripture mb-4">More Bible Resources</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/bible-quizzes" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Bible Quizzes</span>
            </Link>
            <Link href="/old-testament-quizzes" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Old Testament Quizzes</span>
            </Link>
            <Link href="/new-testament-quizzes" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">New Testament Quizzes</span>
            </Link>
          </div>
        </section>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'Bible Chapter Summaries',
              description: `Complete chapter-by-chapter summaries for all 66 books of the Bible. ${totalChapters} chapters covered.`,
              url: 'https://biblemaximum.com/bible-chapter-summaries',
              datePublished: '2025-02-01',
              dateModified: '2025-02-22',
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
                  url: `https://biblemaximum.com/bible-chapter-summaries/${book.slug}`,
                })),
              },
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
                  { '@type': 'ListItem', position: 2, name: 'Bible Chapter Summaries', item: 'https://biblemaximum.com/bible-chapter-summaries' },
                ],
              },
            }),
          }}
        />
      </main>
    </div>
  );
}
