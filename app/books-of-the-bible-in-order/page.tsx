import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BIBLE_BOOKS, getOldTestamentBooks, getNewTestamentBooks } from '@/lib/bible-data';
import { getBookMetadata } from '@/lib/book-metadata';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Books of the Bible in Order \u2014 Complete List of All 66 Books From Genesis to Revelation With Authors, Chapters & Summaries (KJV)',
  description:
    'The complete list of all 66 books of the Bible in order from Genesis to Revelation. Includes author, chapter count, category (Law, History, Poetry, Prophecy, Gospel, Epistle), and one-line summary for every book in the Old Testament and New Testament. King James Version reference.',
  keywords: [
    'books of the bible in order', 'list of books in the bible', 'all 66 books of the bible in order',
    'bible books list', 'books of the bible in order with authors', 'old testament books in order',
    'new testament books in order', 'how many books are in the bible', 'bible book order',
    'books of the bible KJV', 'complete bible book list',
  ],
  openGraph: {
    title: 'Books of the Bible in Order \u2014 All 66 Books, Genesis to Revelation',
    description: 'Complete ordered list of all 66 books of the Bible with authors, chapters, and categories.',
    url: '/books-of-the-bible-in-order',
    type: 'website',
  },
  alternates: { canonical: '/books-of-the-bible-in-order' },
};

const BOOK_SUMMARIES: Record<string, string> = {
  genesis: 'Creation, the Fall, the Flood, and the patriarchs Abraham, Isaac, Jacob, and Joseph.',
  exodus: 'Israel\u2019s deliverance from Egypt, the Ten Commandments, and the tabernacle.',
  leviticus: 'Laws for worship, sacrifice, holiness, and the priesthood of Israel.',
  numbers: 'Israel\u2019s wilderness wanderings, census records, and journey toward Canaan.',
  deuteronomy: 'Moses\u2019 farewell speeches restating the Law before Israel enters the Promised Land.',
  joshua: 'The conquest and division of the Promised Land under Joshua\u2019s leadership.',
  judges: 'Cycles of sin, oppression, and deliverance through twelve judges of Israel.',
  ruth: 'A Moabite woman\u2019s loyalty to Naomi and God\u2019s providence in the line of David.',
  '1-samuel': 'The transition from judges to monarchy: Samuel, Saul, and the rise of David.',
  '2-samuel': 'David\u2019s reign as king of Israel, his victories, and his failures.',
  '1-kings': 'Solomon\u2019s glory, the divided kingdom, and the prophet Elijah.',
  '2-kings': 'The decline of Israel and Judah, the ministry of Elisha, and exile to Babylon.',
  '1-chronicles': 'Genealogies and David\u2019s reign retold with emphasis on temple worship.',
  '2-chronicles': 'Solomon\u2019s temple, the kings of Judah, and the exile.',
  ezra: 'The return from Babylonian exile and the rebuilding of the temple.',
  nehemiah: 'Rebuilding Jerusalem\u2019s walls and renewing the covenant under Nehemiah.',
  esther: 'A Jewish queen\u2019s courage saves her people from annihilation in Persia.',
  job: 'A righteous man\u2019s suffering, dialogue with friends, and God\u2019s sovereign answer.',
  psalms: '150 songs and prayers expressing praise, lament, thanksgiving, and trust in God.',
  proverbs: 'Practical wisdom for godly living: morality, relationships, and the fear of the LORD.',
  ecclesiastes: 'The Preacher\u2019s search for meaning and the conclusion to fear God and keep His commandments.',
  'song-of-solomon': 'A poetic celebration of love between a bride and bridegroom.',
  isaiah: 'Prophecies of judgment and salvation, the coming Messiah, and Israel\u2019s restoration.',
  jeremiah: 'Warnings of judgment against Judah, the fall of Jerusalem, and a new covenant promise.',
  lamentations: 'Jeremiah\u2019s poetic grief over the destruction of Jerusalem.',
  ezekiel: 'Visions of God\u2019s glory, judgment on nations, and the future temple.',
  daniel: 'Faithfulness in Babylonian captivity and apocalyptic visions of future kingdoms.',
  hosea: 'God\u2019s unfailing love for unfaithful Israel portrayed through Hosea\u2019s marriage.',
  joel: 'A plague of locusts, a call to repentance, and the outpouring of the Spirit.',
  amos: 'God\u2019s justice and judgment against Israel and the surrounding nations.',
  obadiah: 'Judgment against Edom for its hostility toward Israel.',
  jonah: 'A reluctant prophet, a great fish, and God\u2019s mercy toward Nineveh.',
  micah: 'Justice, mercy, and the promise of a ruler from Bethlehem.',
  nahum: 'The fall of Nineveh and God\u2019s judgment on Assyria.',
  habakkuk: 'A prophet\u2019s questions about evil and God\u2019s sovereign plan through Babylon.',
  zephaniah: 'The day of the LORD\u2019s judgment and the promise of a faithful remnant.',
  haggai: 'A call to rebuild the temple after the Babylonian exile.',
  zechariah: 'Messianic visions and a call to repentance during the temple rebuilding.',
  malachi: 'God\u2019s final Old Testament message: repentance, tithing, and the coming messenger.',
  matthew: 'Jesus as the promised Messiah and King, fulfilling Old Testament prophecy.',
  mark: 'The servant ministry of Jesus: action-packed miracles, death, and resurrection.',
  luke: 'A careful historical account of Jesus\u2019 life, emphasizing compassion for all people.',
  john: 'The deity of Christ: "In the beginning was the Word, and the Word was God."',
  acts: 'The birth and spread of the early Church through the Holy Spirit\u2019s power.',
  romans: 'Paul\u2019s theological masterpiece: justification by faith and life in the Spirit.',
  '1-corinthians': 'Paul addresses divisions, immorality, spiritual gifts, and the resurrection.',
  '2-corinthians': 'Paul\u2019s defense of his apostleship and the ministry of reconciliation.',
  galatians: 'Freedom in Christ: salvation by grace through faith, not by works of the Law.',
  ephesians: 'God\u2019s eternal purpose, the Church as Christ\u2019s body, and the armor of God.',
  philippians: 'Joy in Christ regardless of circumstances, and the mind of Christ.',
  colossians: 'The supremacy and sufficiency of Christ over all things.',
  '1-thessalonians': 'Encouragement for a young church and the second coming of Christ.',
  '2-thessalonians': 'Correction about the Day of the Lord and a call to faithful living.',
  '1-timothy': 'Instructions to a young pastor on church leadership, doctrine, and godliness.',
  '2-timothy': 'Paul\u2019s final letter: endure hardship, preach the Word, finish the race.',
  titus: 'Godly leadership and sound doctrine for the church in Crete.',
  philemon: 'Paul\u2019s appeal for the forgiveness and restoration of a runaway slave.',
  hebrews: 'The superiority of Christ over the old covenant: a better priest, sacrifice, and hope.',
  james: 'Practical Christian living: faith without works is dead.',
  '1-peter': 'Hope and endurance through suffering for believers scattered abroad.',
  '2-peter': 'Warnings against false teachers and encouragement to grow in grace.',
  '1-john': 'God is love: walking in the light, testing the spirits, and assurance of salvation.',
  '2-john': 'A brief letter on truth, love, and guarding against false teaching.',
  '3-john': 'Commendation for hospitality and a warning against Diotrephes\u2019 pride.',
  jude: 'A call to contend for the faith against false teachers who corrupt grace.',
  revelation: 'Apocalyptic visions of the end times, Christ\u2019s return, and the new heaven and earth.',
};

const CATEGORY_COLORS: Record<string, string> = {
  'Pentateuch / Law': 'bg-amber-50 text-amber-700 border-amber-200',
  'Historical': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'History': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Poetry / Wisdom': 'bg-purple-50 text-purple-700 border-purple-200',
  'Major Prophets': 'bg-red-50 text-red-700 border-red-200',
  'Minor Prophets': 'bg-orange-50 text-orange-700 border-orange-200',
  'Gospel': 'bg-blue-50 text-blue-700 border-blue-200',
  'Pauline Epistle': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'General Epistle': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Apocalyptic / Prophecy': 'bg-rose-50 text-rose-700 border-rose-200',
};

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || 'bg-gray-50 text-gray-700 border-gray-200';
}

export default function BooksOfTheBibleInOrderPage() {
  const otBooks = getOldTestamentBooks();
  const ntBooks = getNewTestamentBooks();
  const totalChapters = BIBLE_BOOKS.reduce((sum, b) => sum + b.chapters, 0);

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Books of the Bible', item: 'https://biblemaximum.com/books-of-the-bible' },
      { '@type': 'ListItem', position: 3, name: 'Books of the Bible in Order' },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: 'Books of the Bible in Order', description: metadata.description,
    url: 'https://biblemaximum.com/books-of-the-bible-in-order', numberOfItems: 66,
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
  };

  const itemListSchema = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    name: 'All 66 Books of the Bible in Order',
    numberOfItems: 66,
    itemListElement: BIBLE_BOOKS.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How many books are in the Bible?', acceptedAnswer: { '@type': 'Answer', text: 'The Bible contains 66 books: 39 in the Old Testament and 27 in the New Testament. These 66 books contain 1,189 chapters and 31,102 verses in the King James Version. The Old Testament was written primarily in Hebrew with portions in Aramaic, while the New Testament was written in Greek.' } },
      { '@type': 'Question', name: 'What are the books of the Bible in order?', acceptedAnswer: { '@type': 'Answer', text: 'The 66 books of the Bible in order are: Genesis, Exodus, Leviticus, Numbers, Deuteronomy, Joshua, Judges, Ruth, 1 Samuel, 2 Samuel, 1 Kings, 2 Kings, 1 Chronicles, 2 Chronicles, Ezra, Nehemiah, Esther, Job, Psalms, Proverbs, Ecclesiastes, Song of Solomon, Isaiah, Jeremiah, Lamentations, Ezekiel, Daniel, Hosea, Joel, Amos, Obadiah, Jonah, Micah, Nahum, Habakkuk, Zephaniah, Haggai, Zechariah, Malachi, Matthew, Mark, Luke, John, Acts, Romans, 1 Corinthians, 2 Corinthians, Galatians, Ephesians, Philippians, Colossians, 1 Thessalonians, 2 Thessalonians, 1 Timothy, 2 Timothy, Titus, Philemon, Hebrews, James, 1 Peter, 2 Peter, 1 John, 2 John, 3 John, Jude, and Revelation.' } },
      { '@type': 'Question', name: 'What is the first and last book of the Bible?', acceptedAnswer: { '@type': 'Answer', text: 'The first book of the Bible is Genesis, meaning "beginning" or "origin," written by Moses. It covers creation, the fall of man, the flood, and the patriarchs. The last book is Revelation (also called the Apocalypse), written by the apostle John, containing prophetic visions of the end times, the return of Christ, and the new heaven and new earth.' } },
      { '@type': 'Question', name: 'What are the categories of books in the Bible?', acceptedAnswer: { '@type': 'Answer', text: 'The Old Testament books are grouped into: Law/Pentateuch (Genesis\u2013Deuteronomy), Historical Books (Joshua\u2013Esther), Poetry and Wisdom (Job\u2013Song of Solomon), Major Prophets (Isaiah\u2013Daniel), and Minor Prophets (Hosea\u2013Malachi). The New Testament is grouped into: Gospels (Matthew\u2013John), History (Acts), Pauline Epistles (Romans\u2013Philemon), General Epistles (Hebrews\u2013Jude), and Apocalyptic Prophecy (Revelation).' } },
      { '@type': 'Question', name: 'What is the longest and shortest book of the Bible?', acceptedAnswer: { '@type': 'Answer', text: 'The longest book of the Bible by chapter count is Psalms with 150 chapters. By word count, Jeremiah is the longest book. The shortest book by verse count is 3 John with just 14 verses, followed by 2 John with 13 verses and Obadiah with 21 verses in a single chapter.' } },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={collectionSchema} />
      <StructuredData data={itemListSchema} />
      <StructuredData data={faqSchema} />

      <Breadcrumb items={[
        { label: 'Books of the Bible', href: '/books-of-the-bible' },
        { label: 'Books of the Bible in Order' },
      ]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero */}
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mt-6 mb-8">
              <div className="relative h-48 md:h-56 bg-gradient-to-r from-amber-800 to-amber-900">
                <Image src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png" alt="Books of the Bible in Order" fill className="object-cover opacity-25" priority />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Books of the Bible in Order</h1>
                  <p className="text-amber-100 max-w-2xl">The complete list of all 66 books from Genesis to Revelation -- with author, chapter count, category, and a one-line summary for every book in the Old and New Testament.</p>
                </div>
              </div>
              <div className="grid grid-cols-4 divide-x divide-grace border-b border-grace">
                <div className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">66</p><p className="text-sm text-primary-dark/70">Books</p></div>
                <div className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">{totalChapters.toLocaleString()}</p><p className="text-sm text-primary-dark/70">Chapters</p></div>
                <div className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">39 OT</p><p className="text-sm text-primary-dark/70">Old Testament</p></div>
                <div className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">27 NT</p><p className="text-sm text-primary-dark/70">New Testament</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* NLP Article */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-3">Understanding the Order of the Books of the Bible</h2>
            <div className="text-primary-dark/80 leading-relaxed space-y-3">
              <p>The Bible is a library of 66 books written by approximately 40 authors over a span of roughly 1,500 years. The <strong>books of the Bible in order</strong> follow an arrangement that is partly chronological and partly thematic. The Old Testament opens with the five books of the Law (the Pentateuch, written by Moses) and moves through history, poetry, and prophecy. The New Testament begins with the four Gospels -- Matthew, Mark, Luke, and John -- which record the life, death, and resurrection of Jesus Christ, then continues through the early Church history in Acts, the apostolic letters (Epistles), and the prophetic visions of Revelation.</p>
              <p>Knowing the order of the books of the Bible is foundational for effective Bible study, sermon preparation, and scripture memorization. When you can navigate from Genesis to Revelation with confidence, you unlock the ability to trace themes across the entire canon: creation and fall in Genesis, redemption foreshadowed in the prophets, fulfillment in the Gospels, and consummation in Revelation. The King James Version (KJV) follows the same 66-book ordering used by virtually all Protestant Bibles today.</p>
              <p>Below you will find every book listed in canonical order with its author, number of chapters, literary category, and a brief summary. Each book links to its chapter listing page where you can explore chapter-by-chapter quizzes, summaries, and verse studies. Whether you are a new believer learning the books for the first time or a seasoned student refreshing your knowledge, this complete reference covers the full sweep of Scripture from &ldquo;In the beginning&rdquo; to &ldquo;Even so, come, Lord Jesus.&rdquo;</p>
            </div>
          </div>
        </section>

        {/* Jump Links */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-wrap gap-2">
            <a href="#old-testament" className="inline-flex items-center px-3 py-1.5 bg-white border border-grace rounded-lg text-sm text-primary-dark/80 hover:border-blue-300 hover:text-blue-600 transition-colors font-medium">Old Testament (39)</a>
            <a href="#new-testament" className="inline-flex items-center px-3 py-1.5 bg-white border border-grace rounded-lg text-sm text-primary-dark/80 hover:border-blue-300 hover:text-blue-600 transition-colors font-medium">New Testament (27)</a>
          </div>
        </section>

        {/* Old Testament */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <section id="old-testament" className="mb-10">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">Old Testament <span className="text-sm font-normal text-primary-dark/60 ml-2">(39 books)</span></h2>
            <ol className="space-y-3">
              {otBooks.map((book) => {
                const meta = getBookMetadata(book.slug);
                const category = meta?.category || 'Old Testament';
                const author = meta?.author || 'Unknown';
                const summary = BOOK_SUMMARIES[book.slug] || '';
                return (
                  <li key={book.slug} className="bg-white rounded-xl border border-grace hover:border-blue-200 hover:shadow-sm transition-all overflow-hidden">
                    <div className="flex items-start gap-4 p-5 md:p-6">
                      <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-700 text-sm font-bold border border-blue-100">{book.order}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Link href={`/${book.slug}-chapters`} className="text-lg font-display font-bold text-scripture hover:text-blue-600 transition-colors">{book.name}</Link>
                          <span className={`inline-block px-2 py-0.5 text-xs rounded-full border ${getCategoryColor(category)}`}>{category}</span>
                        </div>
                        <p className="text-sm text-primary-dark/60 mb-1">{author} &middot; {book.chapters} chapters</p>
                        {summary && <p className="text-primary-dark/80 text-sm leading-relaxed">{summary}</p>}
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                          <Link href={`/${book.slug}-chapters`} className="text-blue-600 hover:underline font-medium">All Chapters</Link>
                          <span className="text-primary-dark/30">|</span>
                          <Link href={`/${book.slug}-quiz`} className="text-blue-600 hover:underline">Book Quiz</Link>
                          <span className="text-primary-dark/30">|</span>
                          <Link href={`/${book.slug}-1-quiz`} className="text-blue-600 hover:underline font-semibold">Chapter 1 Quiz</Link>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* New Testament */}
          <section id="new-testament">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">New Testament <span className="text-sm font-normal text-primary-dark/60 ml-2">(27 books)</span></h2>
            <ol className="space-y-3" start={40}>
              {ntBooks.map((book) => {
                const meta = getBookMetadata(book.slug);
                const category = meta?.category || 'New Testament';
                const author = meta?.author || 'Unknown';
                const summary = BOOK_SUMMARIES[book.slug] || '';
                return (
                  <li key={book.slug} className="bg-white rounded-xl border border-grace hover:border-blue-200 hover:shadow-sm transition-all overflow-hidden">
                    <div className="flex items-start gap-4 p-5 md:p-6">
                      <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-700 text-sm font-bold border border-blue-100">{book.order}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Link href={`/${book.slug}-chapters`} className="text-lg font-display font-bold text-scripture hover:text-blue-600 transition-colors">{book.name}</Link>
                          <span className={`inline-block px-2 py-0.5 text-xs rounded-full border ${getCategoryColor(category)}`}>{category}</span>
                        </div>
                        <p className="text-sm text-primary-dark/60 mb-1">{author} &middot; {book.chapters} chapters</p>
                        {summary && <p className="text-primary-dark/80 text-sm leading-relaxed">{summary}</p>}
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                          <Link href={`/${book.slug}-chapters`} className="text-blue-600 hover:underline font-medium">All Chapters</Link>
                          <span className="text-primary-dark/30">|</span>
                          <Link href={`/${book.slug}-quiz`} className="text-blue-600 hover:underline">Book Quiz</Link>
                          <span className="text-primary-dark/30">|</span>
                          <Link href={`/${book.slug}-1-quiz`} className="text-blue-600 hover:underline font-semibold">Chapter 1 Quiz</Link>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        </main>

        {/* Mid-Content CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 md:p-8 text-white">
            <h2 className="text-xl md:text-2xl font-display font-bold mb-2">Can You Name All 66 Books? Take a Quiz.</h2>
            <p className="text-blue-100 mb-4 max-w-2xl">Test your knowledge of every book of the Bible. Chapter quizzes for all 1,189 chapters with instant scoring and verse-by-verse explanations.</p>
            <Link href="/bible-quizzes" className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md">Take a Quiz Now</Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-scripture mb-1">How many books are in the Bible?</h3>
                <p className="text-primary-dark/80 leading-relaxed">The Bible contains 66 books: 39 in the Old Testament and 27 in the New Testament. Together they contain {totalChapters.toLocaleString()} chapters and 31,102 verses in the King James Version. These books were written by approximately 40 authors over a period of roughly 1,500 years.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What are the books of the Bible in order?</h3>
                <p className="text-primary-dark/80 leading-relaxed">The 66 books in order are: Genesis, Exodus, Leviticus, Numbers, Deuteronomy, Joshua, Judges, Ruth, 1&nbsp;Samuel, 2&nbsp;Samuel, 1&nbsp;Kings, 2&nbsp;Kings, 1&nbsp;Chronicles, 2&nbsp;Chronicles, Ezra, Nehemiah, Esther, Job, Psalms, Proverbs, Ecclesiastes, Song of Solomon, Isaiah, Jeremiah, Lamentations, Ezekiel, Daniel, Hosea, Joel, Amos, Obadiah, Jonah, Micah, Nahum, Habakkuk, Zephaniah, Haggai, Zechariah, Malachi, Matthew, Mark, Luke, John, Acts, Romans, 1&nbsp;Corinthians, 2&nbsp;Corinthians, Galatians, Ephesians, Philippians, Colossians, 1&nbsp;Thessalonians, 2&nbsp;Thessalonians, 1&nbsp;Timothy, 2&nbsp;Timothy, Titus, Philemon, Hebrews, James, 1&nbsp;Peter, 2&nbsp;Peter, 1&nbsp;John, 2&nbsp;John, 3&nbsp;John, Jude, and Revelation.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What is the first and last book of the Bible?</h3>
                <p className="text-primary-dark/80 leading-relaxed">The first book is Genesis (&ldquo;beginning&rdquo;), written by Moses, covering creation through the patriarchs. The last book is Revelation, written by the apostle John, containing prophetic visions of the end times and Christ&apos;s return.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What are the categories of books in the Bible?</h3>
                <p className="text-primary-dark/80 leading-relaxed">The Old Testament is grouped into Law (Genesis&ndash;Deuteronomy), History (Joshua&ndash;Esther), Poetry &amp; Wisdom (Job&ndash;Song of Solomon), Major Prophets (Isaiah&ndash;Daniel), and Minor Prophets (Hosea&ndash;Malachi). The New Testament is grouped into Gospels, History (Acts), Pauline Epistles, General Epistles, and Apocalyptic Prophecy (Revelation).</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What is the longest and shortest book of the Bible?</h3>
                <p className="text-primary-dark/80 leading-relaxed">By chapter count, Psalms is the longest with 150 chapters. By word count, Jeremiah is the longest. The shortest books are 3&nbsp;John (14 verses), 2&nbsp;John (13 verses), and Obadiah (21 verses in a single chapter).</p>
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
              <Link href="/bible-chapter-summaries" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Chapter Summaries</span></Link>
              <Link href="/popular-bible-verses" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">100 Most Popular Verses</span></Link>
              <Link href="/bible-quotes" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Quotes Hub</span></Link>
              <Link href="/reading-plans" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Reading Plans</span></Link>
              <Link href="/bible-study-guides" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Study Guides</span></Link>
              <Link href="/cross-references" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Cross References</span></Link>
              <Link href="/topics" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Topics</span></Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
