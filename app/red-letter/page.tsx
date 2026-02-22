import { Metadata } from 'next';
import Link from 'next/link';
import { getAllRedLetterVerses, getRedLetterStats } from '@/lib/red-letter';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Words of Jesus Christ | Red Letter Verses | All 2,000+ Verses Where Jesus Speaks | Bible Maximum',
  description: 'Browse every verse where Jesus speaks in the Bible, organized by book. Over 2,000 red letter verses from the Gospels and Revelation with direct links to verse studies.',
  keywords: ['red letter Bible', 'words of Jesus', 'Jesus quotes', 'red letter verses', 'words of Christ', 'Jesus said', 'sayings of Jesus'],
  openGraph: {
    title: 'Words of Jesus Christ — Red Letter Verses',
    description: 'Browse every verse where Jesus speaks in the Bible. Over 2,000 red letter verses organized by book.',
    url: '/red-letter',
    type: 'website',
  },
  alternates: { canonical: '/red-letter' },
};

function refToLink(ref: string): string | null {
  const match = ref.match(/^(.+?)\s+(\d+):(\d+)$/);
  if (!match) return null;
  const bookSlug = match[1].toLowerCase().replace(/\s+/g, '-');
  return `/verses/${bookSlug}/${match[2]}/${match[3]}`;
}

function refToBookName(ref: string): string | null {
  const match = ref.match(/^(.+?)\s+\d/);
  return match ? match[1] : null;
}

export default function RedLetterPage() {
  const allVerses = getAllRedLetterVerses();
  const stats = getRedLetterStats();

  // Group verses by book
  const bookGroups: Map<string, { reference: string; text: string }[]> = new Map();
  for (const verse of allVerses) {
    const book = refToBookName(verse.reference);
    if (!book) continue;
    if (!bookGroups.has(book)) bookGroups.set(book, []);
    bookGroups.get(book)!.push(verse);
  }

  const books = Array.from(bookGroups.keys());

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Red Letter Verses' },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Words of Jesus Christ — Red Letter Verses',
    description: `Browse all ${stats.totalVerses} verses where Jesus speaks in the Bible, organized across ${stats.books.length} books.`,
    url: 'https://biblemaximum.com/red-letter',
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={collectionSchema} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Breadcrumb */}
        <nav className="bg-white border-b border-grace">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <ol className="flex items-center text-sm">
              <li>
                <Link href="/" className="text-blue-600 hover:underline">Home</Link>
              </li>
              <li className="text-primary-dark/40 mx-2">/</li>
              <li className="text-primary-dark/70">Red Letter Verses</li>
            </ol>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Hero */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-scripture mb-3">
              Words of Jesus Christ
            </h1>
            <p className="text-lg text-primary-dark/70 leading-relaxed max-w-3xl">
              Every verse where Jesus speaks in the Bible, organized by book. These {stats.totalVerses.toLocaleString()} red letter verses
              span {stats.books.length} books from the Gospels through Revelation.
            </p>
          </header>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-grace rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.totalVerses.toLocaleString()}</div>
              <div className="text-xs text-primary-dark/60 mt-1">Total Verses</div>
            </div>
            <div className="bg-white border border-grace rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.books.length}</div>
              <div className="text-xs text-primary-dark/60 mt-1">Books</div>
            </div>
            <div className="bg-white border border-grace rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">KJV</div>
              <div className="text-xs text-primary-dark/60 mt-1">Translation</div>
            </div>
          </div>

          {/* Jump Links */}
          <div className="bg-white border border-grace rounded-xl p-4 mb-8">
            <h2 className="text-sm font-semibold text-primary-dark/60 uppercase tracking-wider mb-3">Jump to Book</h2>
            <div className="flex flex-wrap gap-2">
              {books.map(book => (
                <a
                  key={book}
                  href={`#${book.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  {book}
                  <span className="ml-1 text-red-400 text-xs">({bookGroups.get(book)!.length})</span>
                </a>
              ))}
            </div>
          </div>

          {/* Verses by Book */}
          <div className="space-y-8">
            {books.map(book => {
              const verses = bookGroups.get(book)!;
              const bookSlug = book.toLowerCase().replace(/\s+/g, '-');
              return (
                <section key={book} id={bookSlug}>
                  <div className="sticky top-0 z-10 bg-primary-light/95 backdrop-blur-sm py-2 mb-3">
                    <h2 className="text-xl font-bold text-scripture flex items-baseline gap-3">
                      {book}
                      <span className="text-sm font-normal text-primary-dark/50">
                        {verses.length} {verses.length === 1 ? 'verse' : 'verses'}
                      </span>
                    </h2>
                  </div>
                  <div className="bg-white border border-grace rounded-xl overflow-hidden">
                    <div className="divide-y divide-grace/50">
                      {verses.map((verse, i) => {
                        const link = refToLink(verse.reference);
                        const displayText = verse.text === 'full'
                          ? '(entire verse — words of Jesus)'
                          : verse.text.length > 100
                            ? verse.text.slice(0, 100) + '...'
                            : verse.text;
                        return (
                          <div key={i} className="px-4 py-2.5 flex items-baseline gap-3 hover:bg-red-50/30 transition-colors">
                            {link ? (
                              <Link
                                href={link}
                                className="text-red-600 font-medium text-sm flex-shrink-0 hover:underline"
                              >
                                {verse.reference}
                              </Link>
                            ) : (
                              <span className="text-red-600 font-medium text-sm flex-shrink-0">
                                {verse.reference}
                              </span>
                            )}
                            <span className="text-primary-dark/60 text-sm truncate">
                              {displayText}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          {/* Internal Links */}
          <section className="mt-10 bg-white rounded-xl shadow-sm border border-grace p-6">
            <h2 className="text-lg font-bold text-scripture mb-4">Continue Your Study</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              <Link href="/topics" className="text-blue-600 hover:underline text-sm">
                Bible Topics
              </Link>
              <Link href="/lexicon" className="text-blue-600 hover:underline text-sm">
                Greek and Hebrew Lexicon
              </Link>
              <Link href="/people" className="text-blue-600 hover:underline text-sm">
                Bible Characters Directory
              </Link>
              <Link href="/bible-stories" className="text-blue-600 hover:underline text-sm">
                Bible Stories
              </Link>
              <Link href="/cross-references" className="text-blue-600 hover:underline text-sm">
                Cross References
              </Link>
              <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">
                Bible Quizzes
              </Link>
              <Link href="/timeline" className="text-blue-600 hover:underline text-sm">
                Bible Timeline
              </Link>
              <Link href="/commandments" className="text-blue-600 hover:underline text-sm">
                613 Commandments
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
