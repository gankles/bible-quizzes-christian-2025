import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Who Wrote the Bible? \u2014 Complete Guide to the Authors of All 66 Books, From Moses to the Apostle John (With Timeline & Dates)',
  description:
    'Discover who wrote the Bible: all 40+ authors of the 66 books from Genesis to Revelation. Learn about Moses, David, Solomon, Isaiah, Paul, Peter, John, and every other biblical author with dates, historical context, and the doctrine of divine inspiration.',
  keywords: [
    'who wrote the bible', 'authors of the bible', 'who wrote the books of the bible',
    'bible authors', 'who wrote genesis', 'who wrote psalms', 'who wrote revelation',
    'how many authors wrote the bible', 'bible authorship', 'divine inspiration of scripture',
    'who wrote the new testament', 'who wrote the old testament',
  ],
  openGraph: {
    title: 'Who Wrote the Bible? \u2014 All 40+ Authors of the 66 Books',
    description: 'Complete guide to every author of the Bible with dates, books written, and historical context.',
    url: '/who-wrote-the-bible',
    type: 'article',
  },
  alternates: { canonical: '/who-wrote-the-bible' },
};

interface BibleAuthor {
  name: string;
  books: string[];
  bookSlugs: string[];
  period: string;
  description: string;
}

const AUTHORS: BibleAuthor[] = [
  { name: 'Moses', books: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'], bookSlugs: ['genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy'], period: 'c. 1446\u20131406 BC', description: 'The great lawgiver and prophet who led Israel out of Egypt. Moses wrote the Pentateuch (the five books of the Law), which form the foundation of the Old Testament and contain the Ten Commandments, the sacrificial system, and the covenant between God and Israel.' },
  { name: 'Joshua', books: ['Joshua'], bookSlugs: ['joshua'], period: 'c. 1400 BC', description: 'Moses\u2019 successor who led Israel into the Promised Land. He recorded the conquest and division of Canaan.' },
  { name: 'Samuel / Nathan / Gad', books: ['Judges', 'Ruth', '1 Samuel', '2 Samuel'], bookSlugs: ['judges', 'ruth', '1-samuel', '2-samuel'], period: 'c. 1050\u2013930 BC', description: 'The prophets Samuel, Nathan, and Gad are traditionally credited with compiling the historical records of Israel\u2019s judges and early monarchy.' },
  { name: 'David', books: ['Psalms (73+ psalms)'], bookSlugs: ['psalms'], period: 'c. 1010\u2013970 BC', description: 'Israel\u2019s greatest king and a man after God\u2019s own heart. David wrote at least 73 of the 150 Psalms, including Psalm 23 (\u201cThe LORD is my shepherd\u201d) and many messianic prophecies.' },
  { name: 'Solomon', books: ['Proverbs', 'Ecclesiastes', 'Song of Solomon'], bookSlugs: ['proverbs', 'ecclesiastes', 'song-of-solomon'], period: 'c. 970\u2013930 BC', description: 'David\u2019s son, the wisest man who ever lived. Solomon wrote over 3,000 proverbs and 1,005 songs, composing the Bible\u2019s primary wisdom literature.' },
  { name: 'Isaiah', books: ['Isaiah'], bookSlugs: ['isaiah'], period: 'c. 740\u2013680 BC', description: 'The greatest of the writing prophets, called \u201cthe evangelical prophet\u201d for his detailed messianic prophecies, including the suffering servant passage (Isaiah 53).' },
  { name: 'Jeremiah', books: ['Jeremiah', 'Lamentations'], bookSlugs: ['jeremiah', 'lamentations'], period: 'c. 627\u2013580 BC', description: 'The \u201cweeping prophet\u201d who warned Judah of coming judgment, witnessed the fall of Jerusalem, and prophesied the new covenant (Jeremiah 31:31\u201334).' },
  { name: 'Ezekiel', books: ['Ezekiel'], bookSlugs: ['ezekiel'], period: 'c. 593\u2013571 BC', description: 'A priest and prophet who ministered to the Jewish exiles in Babylon, recording visions of God\u2019s glory and the future temple.' },
  { name: 'Daniel', books: ['Daniel'], bookSlugs: ['daniel'], period: 'c. 605\u2013530 BC', description: 'A Jewish exile who rose to power in the Babylonian and Persian courts, recording apocalyptic visions of future kingdoms and the coming Messiah.' },
  { name: 'Ezra', books: ['Ezra', '1 Chronicles', '2 Chronicles'], bookSlugs: ['ezra', '1-chronicles', '2-chronicles'], period: 'c. 450\u2013400 BC', description: 'A priest and scribe who led the second return from Babylonian exile and compiled the historical records of Israel\u2019s kings.' },
  { name: 'Nehemiah', books: ['Nehemiah'], bookSlugs: ['nehemiah'], period: 'c. 445\u2013420 BC', description: 'The cupbearer to the Persian king who led the rebuilding of Jerusalem\u2019s walls and the restoration of covenant faithfulness.' },
  { name: 'Unknown / Mordecai', books: ['Esther'], bookSlugs: ['esther'], period: 'c. 470\u2013460 BC', description: 'The author of Esther is uncertain; Mordecai or a Persian-court Jew is the most common attribution. The book records God\u2019s providential protection of the Jewish people.' },
  { name: 'Job (uncertain)', books: ['Job'], bookSlugs: ['job'], period: 'c. 2000\u20131500 BC (events)', description: 'The authorship and date of Job are debated. Some attribute it to Moses or Job himself. It is one of the oldest books in the Bible, addressing the mystery of innocent suffering.' },
  { name: 'Hosea', books: ['Hosea'], bookSlugs: ['hosea'], period: 'c. 755\u2013715 BC', description: 'A prophet whose marriage to an unfaithful wife illustrated God\u2019s steadfast love for wayward Israel.' },
  { name: 'Joel', books: ['Joel'], bookSlugs: ['joel'], period: 'c. 835\u2013800 BC', description: 'A prophet who called Judah to repentance through a devastating locust plague and foretold the outpouring of the Holy Spirit.' },
  { name: 'Amos', books: ['Amos'], bookSlugs: ['amos'], period: 'c. 760\u2013750 BC', description: 'A shepherd from Tekoa called by God to prophesy against Israel\u2019s social injustice and religious hypocrisy.' },
  { name: 'Obadiah', books: ['Obadiah'], bookSlugs: ['obadiah'], period: 'c. 586\u2013550 BC', description: 'The author of the shortest Old Testament book, pronouncing judgment on Edom for its betrayal of Israel.' },
  { name: 'Jonah', books: ['Jonah'], bookSlugs: ['jonah'], period: 'c. 780\u2013750 BC', description: 'A reluctant prophet who fled from God\u2019s call, was swallowed by a great fish, and ultimately preached repentance to Nineveh.' },
  { name: 'Micah', books: ['Micah'], bookSlugs: ['micah'], period: 'c. 735\u2013700 BC', description: 'A prophet who foretold the Messiah\u2019s birth in Bethlehem (Micah 5:2) and summarized God\u2019s requirements: do justly, love mercy, walk humbly.' },
  { name: 'Nahum', books: ['Nahum'], bookSlugs: ['nahum'], period: 'c. 663\u2013612 BC', description: 'A prophet who announced the destruction of Nineveh and the fall of the Assyrian Empire.' },
  { name: 'Habakkuk', books: ['Habakkuk'], bookSlugs: ['habakkuk'], period: 'c. 609\u2013598 BC', description: 'A prophet who questioned God about evil and received the answer: \u201cThe just shall live by his faith\u201d (Habakkuk 2:4).' },
  { name: 'Zephaniah', books: ['Zephaniah'], bookSlugs: ['zephaniah'], period: 'c. 640\u2013620 BC', description: 'A royal prophet who warned of the great Day of the LORD and the coming judgment on all nations.' },
  { name: 'Haggai', books: ['Haggai'], bookSlugs: ['haggai'], period: 'c. 520 BC', description: 'A post-exilic prophet who stirred the returned exiles to resume building the second temple.' },
  { name: 'Zechariah', books: ['Zechariah'], bookSlugs: ['zechariah'], period: 'c. 520\u2013480 BC', description: 'A prophetic contemporary of Haggai whose messianic visions include the triumphal entry (Zechariah 9:9) and the piercing of the Messiah (12:10).' },
  { name: 'Malachi', books: ['Malachi'], bookSlugs: ['malachi'], period: 'c. 440\u2013430 BC', description: 'The last Old Testament prophet, who rebuked Israel\u2019s spiritual apathy and foretold the coming of Elijah before the Day of the LORD.' },
  { name: 'Matthew (Levi)', books: ['Matthew'], bookSlugs: ['matthew'], period: 'c. AD 55\u201370', description: 'A former tax collector and one of the twelve apostles. Matthew wrote his Gospel primarily for a Jewish audience, demonstrating that Jesus is the promised Messiah who fulfills Old Testament prophecy.' },
  { name: 'Mark (John Mark)', books: ['Mark'], bookSlugs: ['mark'], period: 'c. AD 55\u201365', description: 'A companion of Peter and Paul. Mark\u2019s Gospel is the shortest and most action-oriented, emphasizing Jesus as the suffering Servant.' },
  { name: 'Luke', books: ['Luke', 'Acts'], bookSlugs: ['luke', 'acts'], period: 'c. AD 60\u201362', description: 'A physician and historian who traveled with Paul. Luke wrote the most detailed Gospel account and recorded the spread of the early Church in Acts.' },
  { name: 'John (Apostle)', books: ['John', '1 John', '2 John', '3 John', 'Revelation'], bookSlugs: ['john', '1-john', '2-john', '3-john', 'revelation'], period: 'c. AD 85\u201395', description: 'The \u201cbeloved disciple\u201d who wrote five New Testament books. His Gospel emphasizes the deity of Christ (\u201cIn the beginning was the Word\u201d), and Revelation contains the apocalyptic visions of the end times.' },
  { name: 'Paul (Apostle)', books: ['Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon'], bookSlugs: ['romans', '1-corinthians', '2-corinthians', 'galatians', 'ephesians', 'philippians', 'colossians', '1-thessalonians', '2-thessalonians', '1-timothy', '2-timothy', 'titus', 'philemon'], period: 'c. AD 49\u201367', description: 'The former Pharisee who persecuted the Church until his dramatic conversion on the road to Damascus. Paul wrote 13 epistles that form the theological backbone of the New Testament, articulating justification by faith, life in the Spirit, and the nature of the Church.' },
  { name: 'Unknown (traditionally Paul)', books: ['Hebrews'], bookSlugs: ['hebrews'], period: 'c. AD 64\u201370', description: 'The author of Hebrews is debated; Paul, Apollos, Barnabas, and Luke have all been suggested. The book demonstrates the supremacy of Christ over the old covenant.' },
  { name: 'James (brother of Jesus)', books: ['James'], bookSlugs: ['james'], period: 'c. AD 45\u201349', description: 'A leader of the Jerusalem church and half-brother of Jesus. James wrote the most practical epistle in the New Testament, insisting that \u201cfaith without works is dead.\u201d' },
  { name: 'Peter (Apostle)', books: ['1 Peter', '2 Peter'], bookSlugs: ['1-peter', '2-peter'], period: 'c. AD 64\u201368', description: 'The lead apostle and eyewitness of Christ\u2019s ministry. Peter wrote to scattered believers about hope through suffering and warned against false teachers.' },
  { name: 'Jude (brother of Jesus)', books: ['Jude'], bookSlugs: ['jude'], period: 'c. AD 65\u201380', description: 'A half-brother of Jesus who urged believers to \u201cearnestly contend for the faith\u201d against false teachers who turned God\u2019s grace into licence for sin.' },
];

export default function WhoWroteTheBiblePage() {
  const otAuthors = AUTHORS.filter((_, i) => i < 25);
  const ntAuthors = AUTHORS.filter((_, i) => i >= 25);

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Books of the Bible', item: 'https://biblemaximum.com/books-of-the-bible' },
      { '@type': 'ListItem', position: 3, name: 'Who Wrote the Bible?' },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: 'Who Wrote the Bible?',
    description: metadata.description,
    url: 'https://biblemaximum.com/who-wrote-the-bible',
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
  };

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Who wrote the Bible?', acceptedAnswer: { '@type': 'Answer', text: 'The Bible was written by approximately 40 different authors over a period of roughly 1,500 years (c. 1446 BC \u2013 AD 95). Authors include kings (David, Solomon), prophets (Isaiah, Jeremiah, Ezekiel), priests (Ezra), a physician (Luke), a tax collector (Matthew), fishermen (Peter, John), a Pharisee (Paul), and others. Christians believe that all Scripture was divinely inspired by the Holy Spirit (2 Timothy 3:16).' } },
      { '@type': 'Question', name: 'How many authors wrote the Bible?', acceptedAnswer: { '@type': 'Answer', text: 'The Bible was written by approximately 40 authors. Some books have disputed or unknown authorship (such as Hebrews and Job), so the exact number varies slightly depending on scholarly consensus. These authors came from diverse backgrounds \u2014 shepherds, kings, prophets, fishermen, a physician, a tax collector, and a tentmaker \u2014 yet their writings form a unified narrative of God\u2019s redemptive plan.' } },
      { '@type': 'Question', name: 'Who wrote the most books of the Bible?', acceptedAnswer: { '@type': 'Answer', text: 'The apostle Paul wrote the most New Testament books \u2014 13 epistles from Romans to Philemon. Moses wrote the most foundational books \u2014 the five books of the Pentateuch (Genesis through Deuteronomy). If Hebrews is attributed to Paul, his total rises to 14. The apostle John wrote five books (the Gospel of John, 1\u20133 John, and Revelation).' } },
      { '@type': 'Question', name: 'When was the Bible written?', acceptedAnswer: { '@type': 'Answer', text: 'The Bible was written over approximately 1,500 years. The earliest books (the Pentateuch) were written by Moses around 1446\u20131406 BC. The last book (Revelation) was written by the apostle John around AD 90\u201395. The Old Testament was completed by roughly 400 BC with Malachi, and the New Testament was written entirely in the first century AD.' } },
      { '@type': 'Question', name: 'Is the Bible the word of God or the word of man?', acceptedAnswer: { '@type': 'Answer', text: 'Christians hold that the Bible is the inspired Word of God written through human authors. 2 Timothy 3:16 states: "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness." The doctrine of divine inspiration teaches that the Holy Spirit guided the biblical authors so that what they wrote was exactly what God intended, while preserving each author\u2019s unique voice, style, and historical context.' } },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={articleSchema} />
      <StructuredData data={faqSchema} />

      <Breadcrumb items={[
        { label: 'Books of the Bible', href: '/books-of-the-bible' },
        { label: 'Who Wrote the Bible?' },
      ]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero */}
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mt-6 mb-8">
              <div className="relative h-48 md:h-56 bg-gradient-to-r from-amber-800 to-amber-900">
                <Image src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png" alt="Who Wrote the Bible" fill className="object-cover opacity-25" priority />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Who Wrote the Bible?</h1>
                  <p className="text-amber-100 max-w-2xl">A complete guide to the 40+ authors of all 66 books of the Bible -- from Moses and the Pentateuch to the apostle John and Revelation -- with dates, historical context, and the doctrine of divine inspiration.</p>
                </div>
              </div>
              <div className="grid grid-cols-4 divide-x divide-grace border-b border-grace">
                <div className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">40+</p><p className="text-sm text-primary-dark/70">Authors</p></div>
                <div className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">66</p><p className="text-sm text-primary-dark/70">Books</p></div>
                <div className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">1,500</p><p className="text-sm text-primary-dark/70">Years Span</p></div>
                <div className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">3</p><p className="text-sm text-primary-dark/70">Languages</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* NLP Article */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-3">How Was the Bible Written?</h2>
            <div className="text-primary-dark/80 leading-relaxed space-y-3">
              <p>The Bible is not a single book written by one person; it is a collection of 66 books composed by approximately <strong>40 different authors</strong> over a period of roughly 1,500 years. These authors came from remarkably diverse backgrounds: Moses was a prince raised in Egypt, David was a shepherd who became king, Amos was a fig farmer, Daniel was a political exile in Babylon, Matthew was a tax collector, Luke was a physician, Peter and John were fishermen, and Paul was a Pharisee trained at the feet of Gamaliel.</p>
              <p>Despite this diversity, Christians believe the Bible is unified by a single divine Author. The doctrine of <strong>divine inspiration</strong> holds that &ldquo;all scripture is given by inspiration of God&rdquo; (2 Timothy 3:16, KJV). The Holy Spirit guided each human author so that what they wrote was exactly what God intended to communicate, while preserving each writer&apos;s unique voice, literary style, and historical context. The result is a single coherent narrative of creation, fall, redemption, and restoration that runs from Genesis 1:1 to Revelation 22:21.</p>
              <p>The Old Testament was written primarily in <strong>Hebrew</strong>, with portions of Ezra and Daniel in <strong>Aramaic</strong>. The New Testament was written entirely in <strong>Koine Greek</strong>, the common language of the Roman Empire. Together, these 66 books contain 1,189 chapters and 31,102 verses in the King James Version -- the most printed, translated, and read book in human history.</p>
            </div>
          </div>
        </section>

        {/* Author List - OT */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <section className="mb-10">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">Old Testament Authors</h2>
            <div className="space-y-4">
              {otAuthors.map(author => (
                <div key={author.name} className="bg-white rounded-xl border border-grace hover:border-blue-200 hover:shadow-sm transition-all p-5 md:p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-display font-bold text-scripture">{author.name}</h3>
                    <span className="text-sm text-primary-dark/50">{author.period}</span>
                  </div>
                  <p className="text-primary-dark/80 text-sm leading-relaxed mb-3">{author.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {author.bookSlugs.map((slug, i) => (
                      <Link key={slug} href={`/${slug}-chapters`} className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">{author.books[i]}</Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-scripture mb-4">New Testament Authors</h2>
            <div className="space-y-4">
              {ntAuthors.map(author => (
                <div key={author.name} className="bg-white rounded-xl border border-grace hover:border-blue-200 hover:shadow-sm transition-all p-5 md:p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-display font-bold text-scripture">{author.name}</h3>
                    <span className="text-sm text-primary-dark/50">{author.period}</span>
                  </div>
                  <p className="text-primary-dark/80 text-sm leading-relaxed mb-3">{author.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {author.bookSlugs.map((slug, i) => (
                      <Link key={slug} href={`/${slug}-chapters`} className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">{author.books[i]}</Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 md:p-8 text-white">
            <h2 className="text-xl md:text-2xl font-display font-bold mb-2">Test Your Bible Knowledge</h2>
            <p className="text-blue-100 mb-4 max-w-2xl">Chapter quizzes for all 66 books with instant scoring and verse-by-verse explanations.</p>
            <Link href="/bible-quizzes" className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md">Take a Quiz Now</Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-scripture mb-1">Who wrote the Bible?</h3>
                <p className="text-primary-dark/80 leading-relaxed">The Bible was written by approximately 40 different authors over a period of roughly 1,500 years (c. 1446 BC &ndash; AD 95). Authors include kings (David, Solomon), prophets (Isaiah, Jeremiah), priests (Ezra), a physician (Luke), a tax collector (Matthew), fishermen (Peter, John), and a Pharisee (Paul). Christians believe all Scripture was divinely inspired by the Holy Spirit.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">How many authors wrote the Bible?</h3>
                <p className="text-primary-dark/80 leading-relaxed">Approximately 40 authors. The exact number varies slightly because some books have disputed or unknown authorship (such as Hebrews and Job). These authors came from diverse backgrounds yet produced a unified narrative of God&apos;s redemptive plan.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">Who wrote the most books of the Bible?</h3>
                <p className="text-primary-dark/80 leading-relaxed">The apostle Paul wrote the most New Testament books -- 13 epistles from Romans to Philemon. Moses wrote the most foundational books -- the five books of the Pentateuch. The apostle John wrote five books (the Gospel of John, 1&ndash;3 John, and Revelation).</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">When was the Bible written?</h3>
                <p className="text-primary-dark/80 leading-relaxed">The Bible was written over approximately 1,500 years. The earliest books (the Pentateuch) date to around 1446&ndash;1406 BC. The last book (Revelation) was written around AD 90&ndash;95. The Old Testament was completed by roughly 400 BC; the entire New Testament was written in the first century AD.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">Is the Bible the word of God or the word of man?</h3>
                <p className="text-primary-dark/80 leading-relaxed">Christians hold that the Bible is the inspired Word of God written through human authors. 2 Timothy 3:16 states: &ldquo;All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness.&rdquo; The Holy Spirit guided each author so that what they wrote was exactly what God intended.</p>
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
              <Link href="/bible-chapter-summaries" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Chapter Summaries</span></Link>
              <Link href="/popular-bible-verses" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">100 Most Popular Verses</span></Link>
              <Link href="/bible-quotes" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Quotes Hub</span></Link>
              <Link href="/bible-study-guides" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Study Guides</span></Link>
              <Link href="/cross-references" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Cross References</span></Link>
              <Link href="/reading-plans" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Reading Plans</span></Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
