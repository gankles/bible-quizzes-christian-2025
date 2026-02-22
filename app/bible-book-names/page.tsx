import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBookMetadata, getBooksByTestament, BookMetadata } from '@/lib/book-metadata';

export const metadata: Metadata = {
  title: 'Bible Book Names & Meanings | Hebrew and Greek Origins of All 66 Books | Complete Reference Guide with Transliterations',
  description: 'Discover the original Hebrew and Greek names of all 66 Bible books with their meanings and transliterations. From Genesis (Bereshit - "In the Beginning") to Revelation (Apokalupsis - "Disclosure"). Complete reference with author, date, and verse counts.',
  keywords: [
    'Bible book names', 'Hebrew names of Bible books', 'Greek names of Bible books',
    'Bible book meanings', 'what does Genesis mean in Hebrew', 'Bereshit meaning',
    'Bible book name origins', 'Hebrew Bible book names', 'Greek New Testament book names',
    'original Bible book names', 'Bible book etymology', 'Bible book transliteration',
    'Old Testament Hebrew names', 'New Testament Greek names', 'Bible book name list',
  ],
  openGraph: {
    title: 'Bible Book Names & Meanings - Hebrew and Greek Origins of All 66 Books',
    description: 'Complete reference of all 66 Bible book names with original Hebrew and Greek names, transliterations, and meanings.',
    url: '/bible-book-names',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bible Book Names & Meanings - Hebrew and Greek Origins',
    description: 'Discover the original Hebrew and Greek names of all 66 Bible books with their meanings.',
  },
  alternates: {
    canonical: '/bible-book-names',
  },
};

function BookNameCard({ book }: { book: BookMetadata }) {
  const isOT = book.testament === 'old';

  return (
    <div className="bg-white rounded-lg border border-grace p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <Link
            href={`/books/${book.slug}`}
            className="text-lg font-bold text-scripture hover:text-blue-600 transition-colors"
          >
            {book.name}
          </Link>
          <p className="text-xs text-primary-dark/60 mt-0.5">
            {book.chapters} chapters &middot; {book.verseCount.toLocaleString()} verses &middot; {book.author}
          </p>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded ${
          isOT ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {book.category}
        </span>
      </div>

      <div className={`grid gap-3 ${book.hebrewName ? 'sm:grid-cols-2' : ''}`}>
        {book.hebrewName && (
          <div className="bg-amber-50 rounded-md p-3 border border-amber-100">
            <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider mb-1">Hebrew</p>
            <p className="text-xl font-bold text-scripture leading-tight" dir="rtl" lang="he">{book.hebrewName}</p>
            <p className="text-sm text-primary-dark/80 italic">{book.hebrewTransliteration}</p>
            <p className="text-sm text-primary-dark/70 mt-1">&ldquo;{book.hebrewMeaning}&rdquo;</p>
          </div>
        )}
        <div className={`bg-blue-50 rounded-md p-3 border border-blue-100 ${!book.hebrewName ? 'col-span-full' : ''}`}>
          <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider mb-1">Greek</p>
          <p className="text-xl font-bold text-scripture leading-tight" lang="el">{book.greekName}</p>
          <p className="text-sm text-primary-dark/80 italic">{book.greekTransliteration}</p>
          {book.greekMeaning && (
            <p className="text-sm text-primary-dark/70 mt-1">&ldquo;{book.greekMeaning}&rdquo;</p>
          )}
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <Link
          href={`/${book.slug}-chapters`}
          className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
        >
          Chapter Quizzes
        </Link>
        <span className="text-primary-dark/40">|</span>
        <Link
          href={`/${book.slug}-quiz`}
          className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
        >
          Book Quiz
        </Link>
        <span className="text-primary-dark/40">|</span>
        <Link
          href={`/books/${book.slug}`}
          className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
        >
          Study Guide
        </Link>
      </div>
    </div>
  );
}

function TestamentSection({ testament, label, books, accentColor, bgGradient }: {
  testament: 'old' | 'new';
  label: string;
  books: BookMetadata[];
  accentColor: string;
  bgGradient: string;
}) {
  const totalVerses = books.reduce((sum, b) => sum + b.verseCount, 0);
  const totalChapters = books.reduce((sum, b) => sum + b.chapters, 0);

  // Group by category
  const categories = new Map<string, BookMetadata[]>();
  for (const book of books) {
    const cat = book.category;
    if (!categories.has(cat)) categories.set(cat, []);
    categories.get(cat)!.push(book);
  }

  return (
    <section className="mb-12">
      <div className={`${bgGradient} rounded-xl p-6 mb-6 text-white`}>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">{label}</h2>
        <p className="text-white/80 mb-4">
          {testament === 'old'
            ? 'Originally written in Hebrew and Aramaic. The Hebrew names often reflect the first word(s) of each book.'
            : 'Originally written in Greek (Koine). The names are drawn from the Septuagint tradition and early church usage.'}
        </p>
        <div className="flex gap-8">
          <div>
            <p className="text-2xl font-bold">{books.length}</p>
            <p className="text-sm text-white/70">Books</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{totalChapters.toLocaleString()}</p>
            <p className="text-sm text-white/70">Chapters</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{totalVerses.toLocaleString()}</p>
            <p className="text-sm text-white/70">Verses</p>
          </div>
        </div>
      </div>

      {Array.from(categories.entries()).map(([category, catBooks]) => (
        <div key={category} className="mb-8">
          <h3 className={`text-lg font-bold ${accentColor} mb-3 flex items-center`}>
            <span className={`w-2 h-2 rounded-full ${testament === 'old' ? 'bg-amber-500' : 'bg-blue-500'} mr-2`} />
            {category}
            <span className="text-sm font-normal text-primary-dark/60 ml-2">({catBooks.length} books)</span>
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {catBooks.map((book) => (
              <BookNameCard key={book.slug} book={book} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default function BibleBookNamesPage() {
  const otBooks = getBooksByTestament('old');
  const ntBooks = getBooksByTestament('new');
  const allBooks = getAllBookMetadata();

  const totalVerses = allBooks.reduce((sum, b) => sum + b.verseCount, 0);
  const totalChapters = allBooks.reduce((sum, b) => sum + b.chapters, 0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Bible Book Names & Meanings - Hebrew and Greek Origins of All 66 Books',
    description: 'Complete reference guide to the original Hebrew and Greek names of all 66 Bible books with transliterations and meanings.',
    author: { '@type': 'Organization', name: 'Bible Maximum' },
    publisher: { '@type': 'Organization', name: 'Bible Maximum' },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://biblemaximum.com/bible-book-names',
    },
    about: {
      '@type': 'ItemList',
      name: 'Bible Book Names',
      numberOfItems: 66,
      itemListElement: allBooks.slice(0, 20).map((book, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: book.name,
        alternateName: [book.hebrewName, book.hebrewTransliteration, book.greekName, book.greekTransliteration].filter(Boolean),
        url: `https://biblemaximum.com/books/${book.slug}`,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-primary-light/30">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-grace">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li className="text-primary-dark/40">/</li>
            <li><Link href="/bible-quizzes" className="text-blue-600 hover:underline">Bible Quizzes</Link></li>
            <li className="text-primary-dark/40">/</li>
            <li className="text-primary-dark/70">Bible Book Names & Meanings</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <header className="relative bg-white border-b border-grace rounded-xl overflow-hidden mb-8">
          <Image
            src="/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png"
            alt="Open Bible"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="relative p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4 text-scripture">
              Bible Book Names & Meanings
            </h1>
            <p className="text-lg md:text-xl text-primary-dark/70 max-w-3xl mb-6">
              The original Hebrew and Greek names of all 66 books of the Bible with their transliterations and meanings. Discover what each book was called in its original language and what that name reveals about its content.
            </p>
            <div className="flex flex-wrap gap-6 md:gap-10">
              <div>
                <p className="text-3xl font-bold text-scripture">66</p>
                <p className="text-sm text-primary-dark/60">Books</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{totalChapters.toLocaleString()}</p>
                <p className="text-sm text-primary-dark/60">Chapters</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{totalVerses.toLocaleString()}</p>
                <p className="text-sm text-primary-dark/60">Verses</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">39 / 27</p>
                <p className="text-sm text-primary-dark/60">OT / NT</p>
              </div>
            </div>
          </div>
        </header>

        {/* Quick explanation */}
        <section className="bg-white rounded-xl border border-grace p-6 mb-8">
          <h2 className="text-xl font-bold text-scripture mb-3">Why Do Bible Books Have Different Names?</h2>
          <div className="grid gap-4 md:grid-cols-2 text-primary-dark/80 text-sm leading-relaxed">
            <div>
              <h3 className="font-semibold text-scripture mb-1">Old Testament &mdash; Hebrew Tradition</h3>
              <p>
                In the Hebrew Bible (Tanakh), books are named after their opening word or phrase. Genesis is called <strong>Bereshit</strong> (&ldquo;In the Beginning&rdquo;) because that is the first word of the book. Exodus is <strong>Shemot</strong> (&ldquo;Names&rdquo;) from its opening line &ldquo;These are the names of the sons of Israel.&rdquo; The English names come from the Greek Septuagint translation, which used descriptive titles instead.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-scripture mb-1">New Testament &mdash; Greek Tradition</h3>
              <p>
                The New Testament was written in Koine Greek, and its book names come directly from that language. The Gospels are named after their authors (Matthaios, Markos, Loukas, Ioannes). Paul&apos;s letters are named after their recipients (Korinthios, Galatēs, Ephesios). The English names are anglicized forms of these Greek originals.
              </p>
            </div>
          </div>
        </section>

        {/* Old Testament */}
        <TestamentSection
          testament="old"
          label="Old Testament (39 Books)"
          books={otBooks}
          accentColor="text-amber-800"
          bgGradient="bg-gradient-to-r from-amber-800 to-amber-700"
        />

        {/* New Testament */}
        <TestamentSection
          testament="new"
          label="New Testament (27 Books)"
          books={ntBooks}
          accentColor="text-blue-800"
          bgGradient="bg-gradient-to-r from-blue-800 to-blue-700"
        />

        {/* Quick Reference Table */}
        <section className="bg-white rounded-xl border border-grace overflow-hidden mb-8">
          <div className="p-6 border-b border-grace">
            <h2 className="text-xl font-bold text-scripture">Quick Reference Table</h2>
            <p className="text-sm text-primary-dark/70 mt-1">All 66 books at a glance</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-primary-light/30">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-primary-dark/80">#</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-dark/80">Book</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-dark/80">Hebrew</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-dark/80">Meaning</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-dark/80">Greek</th>
                  <th className="px-4 py-3 text-center font-semibold text-primary-dark/80">Ch</th>
                  <th className="px-4 py-3 text-center font-semibold text-primary-dark/80">Verses</th>
                </tr>
              </thead>
              <tbody>
                {allBooks.map((book, i) => (
                  <tr key={book.slug} className={`border-t border-grace/50 ${
                    book.testament === 'old' ? 'hover:bg-amber-50' : 'hover:bg-primary-light'
                  } transition-colors`}>
                    <td className="px-4 py-2 text-primary-dark/40 font-mono text-xs">{i + 1}</td>
                    <td className="px-4 py-2">
                      <Link href={`/books/${book.slug}`} className="font-medium text-scripture hover:text-blue-600">
                        {book.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      {book.hebrewTransliteration ? (
                        <span className="text-primary-dark/80">{book.hebrewTransliteration}</span>
                      ) : (
                        <span className="text-primary-dark/40">&mdash;</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-primary-dark/70">
                      {book.hebrewMeaning || (book.greekMeaning ? book.greekMeaning : '')}
                    </td>
                    <td className="px-4 py-2 text-primary-dark/80">{book.greekTransliteration}</td>
                    <td className="px-4 py-2 text-center text-primary-dark/70">{book.chapters}</td>
                    <td className="px-4 py-2 text-center text-primary-dark/70">{book.verseCount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-primary-light/30 font-semibold">
                <tr className="border-t border-grace">
                  <td className="px-4 py-3" colSpan={5}>Total</td>
                  <td className="px-4 py-3 text-center">{totalChapters.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">{totalVerses.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <h2 className="text-xl font-bold mb-2">Ready to Test Your Knowledge?</h2>
          <p className="text-blue-100 mb-4">
            Now that you know the original names, put your Bible knowledge to the test with our chapter-by-chapter quizzes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/old-testament-quizzes"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-lg transition-colors border border-white/20 text-sm font-medium"
            >
              Old Testament Quizzes
            </Link>
            <Link
              href="/new-testament-quizzes"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-lg transition-colors border border-white/20 text-sm font-medium"
            >
              New Testament Quizzes
            </Link>
            <Link
              href="/bible-quizzes"
              className="bg-white text-blue-700 hover:bg-primary-light px-5 py-2.5 rounded-lg transition-colors text-sm font-semibold"
            >
              All Bible Quizzes
            </Link>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
