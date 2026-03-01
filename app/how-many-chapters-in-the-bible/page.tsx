import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BIBLE_BOOKS, getOldTestamentBooks, getNewTestamentBooks } from '@/lib/bible-data';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'How Many Chapters Are in the Bible? -- 1,189 Chapters Across 66 Books: A Complete Breakdown by Book, Testament & Category (KJV)',
  description:
    'The Bible contains 1,189 chapters across 66 books. The Old Testament has 929 chapters in 39 books, and the New Testament has 260 chapters in 27 books. See a complete chapter count for every book of the Bible with reading time estimates and fascinating statistics.',
  keywords: [
    'how many chapters are in the bible', 'chapters in the bible', 'total bible chapters',
    'how many chapters KJV', 'bible chapter count', 'longest book of the bible',
    'shortest book of the bible', 'how many chapters in the old testament',
    'how many chapters in the new testament', 'bible book chapter count',
    'bible by the numbers', '1189 chapters',
  ],
  openGraph: {
    title: 'How Many Chapters Are in the Bible? -- 1,189 Across 66 Books',
    description: 'Complete chapter count for every book of the Bible, broken down by testament, with reading time estimates and quick-reference stats.',
    url: '/how-many-chapters-in-the-bible',
    type: 'article',
  },
  alternates: { canonical: '/how-many-chapters-in-the-bible' },
};

export default function HowManyChaptersInTheBiblePage() {
  const otBooks = getOldTestamentBooks();
  const ntBooks = getNewTestamentBooks();

  const totalChapters = BIBLE_BOOKS.reduce((sum, book) => sum + book.chapters, 0);
  const otChapters = otBooks.reduce((sum, book) => sum + book.chapters, 0);
  const ntChapters = ntBooks.reduce((sum, book) => sum + book.chapters, 0);

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Books of the Bible', item: 'https://biblemaximum.com/books-of-the-bible' },
      { '@type': 'ListItem', position: 3, name: 'How Many Chapters?' },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: 'How Many Chapters Are in the Bible?',
    description: metadata.description,
    url: 'https://biblemaximum.com/how-many-chapters-in-the-bible',
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
  };

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How many chapters are in the Bible?', acceptedAnswer: { '@type': 'Answer', text: 'The Bible contains 1,189 chapters across 66 books. The Old Testament has 929 chapters in 39 books, and the New Testament has 260 chapters in 27 books. This count is based on the King James Version (KJV) and is consistent across all major Protestant Bible translations.' } },
      { '@type': 'Question', name: 'How many chapters are in the Old Testament?', acceptedAnswer: { '@type': 'Answer', text: 'The Old Testament contains 929 chapters across 39 books. The longest Old Testament book by chapter count is Psalms with 150 chapters, followed by Isaiah with 66 chapters and Jeremiah with 52 chapters. The shortest Old Testament book is Obadiah with just 1 chapter.' } },
      { '@type': 'Question', name: 'How many chapters are in the New Testament?', acceptedAnswer: { '@type': 'Answer', text: 'The New Testament contains 260 chapters across 27 books. The longest New Testament books are Matthew and Acts, each with 28 chapters. Four New Testament books have only 1 chapter: Philemon, 2 John, 3 John, and Jude.' } },
      { '@type': 'Question', name: 'What is the longest book of the Bible?', acceptedAnswer: { '@type': 'Answer', text: 'The longest book of the Bible by chapter count is Psalms with 150 chapters. By verse count, Psalms is also the longest with 2,461 verses. The longest single chapter in the entire Bible is Psalm 119, which contains 176 verses and is structured as an acrostic poem organized around the 22 letters of the Hebrew alphabet.' } },
      { '@type': 'Question', name: 'How long does it take to read the entire Bible?', acceptedAnswer: { '@type': 'Answer', text: 'At a pace of 3 chapters per day, you can read the entire Bible in about 396 days (just over 13 months). At 4 chapters per day, it takes roughly 297 days -- just under 10 months. Most Bible-in-a-year reading plans assign 3 to 4 chapters daily. The total reading time at an average spoken pace is approximately 70 hours.' } },
    ],
  };

  // Running totals for the table
  let otRunning = 0;
  let ntRunning = 0;

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={articleSchema} />
      <StructuredData data={faqSchema} />

      <Breadcrumb items={[
        { label: 'Books of the Bible', href: '/books-of-the-bible' },
        { label: 'How Many Chapters?' },
      ]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero */}
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mt-6 mb-8">
              <div className="relative h-48 md:h-56 bg-gradient-to-r from-blue-900 to-blue-950">
                <Image src="/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png" alt="Open Bible with light pouring down, representing the 1,189 chapters of Scripture" fill className="object-cover opacity-25" priority />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">How Many Chapters Are in the Bible?</h1>
                  <p className="text-blue-100 max-w-2xl">A complete breakdown of all 1,189 chapters across 66 books -- by testament, by book, and by the numbers that make Scripture the most remarkable volume ever compiled.</p>
                </div>
              </div>
              <div className="grid grid-cols-4 divide-x divide-grace border-b border-grace">
                <div className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">{totalChapters.toLocaleString()}</p><p className="text-sm text-primary-dark/70">Chapters</p></div>
                <div className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">66</p><p className="text-sm text-primary-dark/70">Books</p></div>
                <div className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">31,102</p><p className="text-sm text-primary-dark/70">Verses</p></div>
                <div className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">39 / 27</p><p className="text-sm text-primary-dark/70">OT / NT</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Snippet Box */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border-2 border-blue-200 p-6 md:p-8">
            <p className="text-lg md:text-xl text-primary-dark/90 leading-relaxed">
              The Bible contains <strong className="text-blue-600">{totalChapters.toLocaleString()} chapters</strong> across 66 books. The Old Testament has <strong className="text-blue-600">{otChapters} chapters</strong> in 39 books. The New Testament has <strong className="text-blue-600">{ntChapters} chapters</strong> in 27 books.
            </p>
          </div>
        </section>

        {/* NLP Article */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-3">The Numbers Behind the World&apos;s Most Printed Book</h2>
            <div className="text-primary-dark/80 leading-relaxed space-y-3">
              <p>If you read 3 chapters a day, you&apos;d finish the entire Bible in just under 13 months. Most people assume it takes years. It doesn&apos;t. The total Bible chapter count -- <strong>1,189 chapters</strong> -- is far more manageable than it first appears, especially once you realize that many chapters take less than three minutes to read aloud.</p>

              <p>Those 1,189 chapters split unevenly between the two testaments. The Old Testament accounts for the lion&apos;s share: <strong>929 chapters</strong> spread across 39 books, covering everything from creation in Genesis to the final prophetic warning in Malachi. The New Testament is more compact -- <strong>260 chapters</strong> in 27 books -- yet it carries the full weight of Christ&apos;s ministry, the birth of the Church, and the apocalyptic visions of Revelation.</p>

              <p>Some books are marathons. Psalms towers over everything else with <strong>150 chapters</strong>, making it the longest book of the Bible by chapter count. Isaiah follows at 66 chapters, and Jeremiah rounds out the top three with 52. Think of Psalms as the hymnbook of ancient Israel -- 150 individual songs, prayers, and poems that believers have leaned on for over three thousand years.</p>

              <p>Other books are sprints. Obadiah, Philemon, 2 John, 3 John, and Jude each contain just <strong>a single chapter</strong>. You could read all five in a single sitting and still have time for coffee. These are the shortest books of the Bible, but brevity does not mean insignificance -- Philemon&apos;s one chapter reshaped how the early Church thought about slavery and brotherhood in Christ.</p>

              <p>The extremes within individual chapters are just as striking. <strong>Psalm 119</strong>, the longest chapter in the Bible, runs to 176 verses -- an elaborate acrostic poem celebrating the Word of God through every letter of the Hebrew alphabet. The shortest chapter? <strong>Psalm 117</strong>, at only 2 verses. It also happens to be the middle chapter of the entire Bible, a tiny hinge on which the whole of Scripture pivots. Something almost poetic about that.</p>

              <p>Here is a stat that surprises most people: the five books of the Pentateuch alone -- Genesis, Exodus, Leviticus, Numbers, and Deuteronomy -- contain <strong>187 chapters</strong>. That is nearly one-sixth of the entire Bible packed into just five books written by Moses. The foundation is substantial.</p>

              <p>For practical reading, the pace matters more than the total. At 4 chapters per day, you&apos;re looking at roughly <strong>297 days -- just under 10 months</strong>. Most Bible-in-a-year reading plans assign 3 to 4 chapters daily, mixing Old and New Testament passages to keep the reading varied. The total spoken reading time for the entire Bible is approximately 70 hours -- less time than the average American spends on their phone in two weeks. The difference is that one of those investments compounds eternally.</p>
            </div>
          </div>
        </section>

        {/* Complete Chapter Count Table - Old Testament */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <section className="mb-10">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-xl font-display font-bold text-scripture">Old Testament -- {otChapters} Chapters in {otBooks.length} Books</h2>
            </div>
            <div className="bg-white rounded-xl border border-grace overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-blue-50 border-b border-grace text-sm font-bold text-scripture">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-5">Book</div>
                <div className="col-span-3 text-center">Chapters</div>
                <div className="col-span-3 text-center">Running Total</div>
              </div>
              {/* Rows */}
              {otBooks.map((book) => {
                otRunning += book.chapters;
                return (
                  <div key={book.slug} className="grid grid-cols-12 gap-2 px-4 py-2.5 border-b border-grace/50 hover:bg-blue-50/30 transition-colors text-sm">
                    <div className="col-span-1 text-center text-primary-dark/50">{book.order}</div>
                    <div className="col-span-5">
                      <Link href={`/${book.slug}-chapters`} className="text-blue-600 hover:underline font-medium">{book.name}</Link>
                    </div>
                    <div className="col-span-3 text-center font-semibold text-scripture">{book.chapters}</div>
                    <div className="col-span-3 text-center text-primary-dark/60">{otRunning}</div>
                  </div>
                );
              })}
              {/* OT Total */}
              <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-blue-50 border-t border-grace text-sm font-bold text-scripture">
                <div className="col-span-1"></div>
                <div className="col-span-5">Old Testament Total</div>
                <div className="col-span-3 text-center text-blue-600">{otChapters}</div>
                <div className="col-span-3 text-center text-blue-600">{otChapters}</div>
              </div>
            </div>
          </section>

          {/* New Testament */}
          <section className="mb-10">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-xl font-display font-bold text-scripture">New Testament -- {ntChapters} Chapters in {ntBooks.length} Books</h2>
            </div>
            <div className="bg-white rounded-xl border border-grace overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-blue-50 border-b border-grace text-sm font-bold text-scripture">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-5">Book</div>
                <div className="col-span-3 text-center">Chapters</div>
                <div className="col-span-3 text-center">Running Total</div>
              </div>
              {/* Rows */}
              {ntBooks.map((book) => {
                ntRunning += book.chapters;
                return (
                  <div key={book.slug} className="grid grid-cols-12 gap-2 px-4 py-2.5 border-b border-grace/50 hover:bg-blue-50/30 transition-colors text-sm">
                    <div className="col-span-1 text-center text-primary-dark/50">{book.order}</div>
                    <div className="col-span-5">
                      <Link href={`/${book.slug}-chapters`} className="text-blue-600 hover:underline font-medium">{book.name}</Link>
                    </div>
                    <div className="col-span-3 text-center font-semibold text-scripture">{book.chapters}</div>
                    <div className="col-span-3 text-center text-primary-dark/60">{otChapters + ntRunning}</div>
                  </div>
                );
              })}
              {/* NT Total */}
              <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-blue-50 border-t border-grace text-sm font-bold text-scripture">
                <div className="col-span-1"></div>
                <div className="col-span-5">New Testament Total</div>
                <div className="col-span-3 text-center text-blue-600">{ntChapters}</div>
                <div className="col-span-3 text-center text-blue-600">{totalChapters.toLocaleString()}</div>
              </div>
            </div>
          </section>
        </main>

        {/* Bible by the Numbers */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-6">Bible by the Numbers -- Quick Reference</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-primary-light/30 rounded-lg p-4 border border-grace">
                <p className="text-sm text-primary-dark/60 mb-1">Total Books</p>
                <p className="text-2xl font-bold text-scripture">66</p>
              </div>
              <div className="bg-primary-light/30 rounded-lg p-4 border border-grace">
                <p className="text-sm text-primary-dark/60 mb-1">Old Testament Books</p>
                <p className="text-2xl font-bold text-scripture">39</p>
              </div>
              <div className="bg-primary-light/30 rounded-lg p-4 border border-grace">
                <p className="text-sm text-primary-dark/60 mb-1">New Testament Books</p>
                <p className="text-2xl font-bold text-scripture">27</p>
              </div>
              <div className="bg-primary-light/30 rounded-lg p-4 border border-grace">
                <p className="text-sm text-primary-dark/60 mb-1">Total Chapters</p>
                <p className="text-2xl font-bold text-blue-600">{totalChapters.toLocaleString()}</p>
              </div>
              <div className="bg-primary-light/30 rounded-lg p-4 border border-grace">
                <p className="text-sm text-primary-dark/60 mb-1">OT Chapters</p>
                <p className="text-2xl font-bold text-scripture">{otChapters}</p>
              </div>
              <div className="bg-primary-light/30 rounded-lg p-4 border border-grace">
                <p className="text-sm text-primary-dark/60 mb-1">NT Chapters</p>
                <p className="text-2xl font-bold text-scripture">{ntChapters}</p>
              </div>
              <div className="bg-primary-light/30 rounded-lg p-4 border border-grace">
                <p className="text-sm text-primary-dark/60 mb-1">Total Verses</p>
                <p className="text-2xl font-bold text-scripture">31,102</p>
              </div>
              <div className="bg-primary-light/30 rounded-lg p-4 border border-grace">
                <p className="text-sm text-primary-dark/60 mb-1">Longest Book (by Chapters)</p>
                <p className="text-2xl font-bold text-scripture">Psalms</p>
                <p className="text-sm text-primary-dark/60">150 chapters</p>
              </div>
              <div className="bg-primary-light/30 rounded-lg p-4 border border-grace">
                <p className="text-sm text-primary-dark/60 mb-1">Shortest Books (1 Chapter)</p>
                <p className="text-sm font-bold text-scripture leading-relaxed">Obadiah, Philemon, 2 John, 3 John, Jude</p>
              </div>
              <div className="bg-primary-light/30 rounded-lg p-4 border border-grace">
                <p className="text-sm text-primary-dark/60 mb-1">Longest Chapter</p>
                <p className="text-2xl font-bold text-scripture">Psalm 119</p>
                <p className="text-sm text-primary-dark/60">176 verses</p>
              </div>
              <div className="bg-primary-light/30 rounded-lg p-4 border border-grace">
                <p className="text-sm text-primary-dark/60 mb-1">Shortest Chapter</p>
                <p className="text-2xl font-bold text-scripture">Psalm 117</p>
                <p className="text-sm text-primary-dark/60">2 verses</p>
              </div>
              <div className="bg-primary-light/30 rounded-lg p-4 border border-grace">
                <p className="text-sm text-primary-dark/60 mb-1">Middle Chapter</p>
                <p className="text-2xl font-bold text-scripture">Psalm 117</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mid-Content CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 md:p-8 text-white">
            <h2 className="text-xl md:text-2xl font-display font-bold mb-2">Test Your Knowledge of Every Book</h2>
            <p className="text-blue-100 mb-4 max-w-2xl">Chapter-by-chapter quizzes for all 66 books of the Bible with instant scoring and verse-by-verse explanations. See how well you really know Scripture.</p>
            <Link href="/bible-quizzes" className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md">Take a Bible Quiz</Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-scripture mb-1">How many chapters are in the Bible?</h3>
                <p className="text-primary-dark/80 leading-relaxed">The Bible contains <strong>1,189 chapters</strong> across 66 books. This total is consistent across all major Protestant Bible translations, including the King James Version, the English Standard Version, and the New International Version. The chapter divisions we use today were introduced by Stephen Langton, the Archbishop of Canterbury, in the early 1200s.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">How many chapters are in the Old Testament?</h3>
                <p className="text-primary-dark/80 leading-relaxed">The Old Testament has <strong>929 chapters</strong> in 39 books. It makes up roughly 78% of the Bible&apos;s total chapter count. Psalms alone contributes 150 of those chapters -- more than the entire New Testament&apos;s 260 combined. The Old Testament covers the history of creation, the patriarchs, the Law, the monarchy, the prophets, and Israel&apos;s exile and return.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">How many chapters are in the New Testament?</h3>
                <p className="text-primary-dark/80 leading-relaxed">The New Testament has <strong>260 chapters</strong> across 27 books. Though it is shorter than the Old Testament, it contains the four Gospel accounts of Christ&apos;s life, the history of the early Church in Acts, the doctrinal epistles of Paul and others, and the prophetic visions of Revelation. Matthew and Acts tie for the longest New Testament books at 28 chapters each.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What is the longest book of the Bible?</h3>
                <p className="text-primary-dark/80 leading-relaxed">By chapter count, <strong>Psalms</strong> is the longest book of the Bible with 150 chapters. By verse count, Psalms also leads with 2,461 verses. The longest single chapter is Psalm 119 at 176 verses. Among narrative books, Jeremiah is the longest (52 chapters), and in the New Testament, Matthew and Acts share the lead at 28 chapters each.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">How long does it take to read the entire Bible?</h3>
                <p className="text-primary-dark/80 leading-relaxed">At 3 chapters a day, you can read the entire Bible in about <strong>396 days</strong> -- roughly 13 months. At 4 chapters daily, that drops to about 297 days, or just under 10 months. The total audio reading time for the Bible is approximately 70 hours. Most Bible-in-a-year plans mix Old and New Testament readings to keep the content varied and assign 3 to 4 chapters per day.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">Continue Exploring Scripture</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              <Link href="/bible-quizzes" className="flex items-center px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"><span>Bible Quizzes</span></Link>
              <Link href="/books-of-the-bible" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Books of the Bible</span></Link>
              <Link href="/books-of-the-bible-in-order" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Books in Order</span></Link>
              <Link href="/who-wrote-the-bible" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Who Wrote the Bible?</span></Link>
              <Link href="/bible-chapter-summaries" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Chapter Summaries</span></Link>
              <Link href="/popular-bible-verses" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">100 Most Popular Verses</span></Link>
              <Link href="/bible-quotes" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Quotes Hub</span></Link>
              <Link href="/reading-plans" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Reading Plans</span></Link>
              <Link href="/bible-study-guides" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Study Guides</span></Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
