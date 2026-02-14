import { Metadata } from 'next';
import Link from 'next/link';
import { getAllStories, getStoriesStats, getStoryBooks, getStoriesByBook } from '@/lib/bible-stories-data';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: "Children's Bible Stories | 400+ Bible Stories for Kids & Families | Complete Collection",
  description: "Browse over 400 Bible stories for children and families organized by book. From Creation to the early Church — classic stories from Genesis, Exodus, Samuel, the Gospels, and more.",
  keywords: [
    "children's Bible stories", 'Bible stories for kids', 'kids Bible stories',
    'Bible stories by book', 'Old Testament stories for children', 'New Testament stories for kids',
    'family Bible stories', 'Bible story list', 'Genesis stories for children',
    'Jesus stories for kids', 'Bible stories collection',
  ],
  openGraph: {
    title: "Children's Bible Stories — 400+ Stories for Kids & Families",
    description: 'Browse over 400 Bible stories organized by book for children and families.',
    url: '/bible-stories',
    type: 'website',
  },
  alternates: { canonical: '/bible-stories' },
};

export default function BibleStoriesPage() {
  const stats = getStoriesStats();
  const books = getStoryBooks();
  const allStories = getAllStories();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "Children's Bible Stories",
    description: metadata.description,
    url: 'https://biblemaximum.com/bible-stories',
    numberOfItems: stats.total,
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900 font-medium">Bible Stories</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Bible Stories for Children &amp; Families
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mb-6">
              Discover over {stats.total} classic Bible stories from {stats.books} books of the Bible,
              organized chronologically for easy reading and learning.
            </p>
            <div className="flex flex-wrap gap-6 text-center">
              <div>
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Stories</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.books}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Books</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Jump Links */}
      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="flex flex-wrap gap-2">
          {books.map(book => (
            <a
              key={book}
              href={`#book-${book.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              {book}
            </a>
          ))}
        </div>
      </section>

      {/* Stories by Book */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        {books.map(book => {
          const stories = getStoriesByBook(book.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
          if (stories.length === 0) return null;
          return (
            <div key={book} id={`book-${book.toLowerCase().replace(/\s+/g, '-')}`} className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {book}
                <span className="text-sm font-normal text-gray-500 ml-2">({stories.length} stories)</span>
              </h2>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {stories.map(story => (
                  <Link
                    key={story.slug}
                    href={`/bible-stories/${story.slug}`}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
                  >
                    <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {story.title}
                    </span>
                    <span className="block text-xs text-gray-500 mt-0.5">
                      {story.reference}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Related */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Keep Learning</h2>
          <p className="text-sm text-gray-600 mb-4">
            Test your knowledge of these stories with our Bible quizzes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/bible-quizzes" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Bible Quizzes
            </Link>
            <Link href="/people" className="px-5 py-2.5 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors">
              Bible People
            </Link>
            <Link href="/bible-names" className="px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              Bible Names
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
