import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';
import { PopularVerse, ALL_POPULAR_VERSES } from '@/lib/popular-verses-data';

const OT_SLUGS = ['genesis','exodus','leviticus','numbers','deuteronomy','joshua','judges','ruth','1-samuel','2-samuel','1-kings','2-kings','1-chronicles','2-chronicles','ezra','nehemiah','esther','job','psalms','proverbs','ecclesiastes','song-of-solomon','isaiah','jeremiah','lamentations','ezekiel','daniel','hosea','joel','amos','obadiah','jonah','micah','nahum','habakkuk','zephaniah','haggai','zechariah','malachi'];

function verseUrl(v: PopularVerse): string {
  return `/verses/${v.bookSlug}/${v.chapter}/${v.verse}`;
}

function getUniqueThemes(verses: PopularVerse[]): string[] {
  const seen = new Set<string>();
  for (const v of verses) seen.add(v.theme);
  return Array.from(seen);
}

function getThemeGroups(verses: PopularVerse[]): Record<string, PopularVerse[]> {
  const groups: Record<string, PopularVerse[]> = {};
  for (const v of verses) {
    if (!groups[v.theme]) groups[v.theme] = [];
    groups[v.theme].push(v);
  }
  return groups;
}

export const metadata: Metadata = {
  title: '100 Most Popular Bible Verses \u2014 Most Searched, Quoted & Memorized Scriptures in the King James Bible (KJV) With Full Text',
  description:
    'The 100 most popular Bible verses ranked by search volume, memorization frequency, and citation data. Full KJV text for each scripture with study links, cross-references, and chapter quizzes. From John 3:16 to Hebrews 13:5 \u2014 every verse Christians search for, memorize, and share most.',
  keywords: [
    'most popular bible verses', 'most searched bible verses', 'most read bible verses',
    'most famous bible verses', 'top bible verses', 'best bible verses',
    'most quoted bible verses', 'most memorized scripture', 'top 100 bible verses',
    'popular scriptures KJV', 'bible verses everyone should know',
  ],
  openGraph: {
    title: '100 Most Popular Bible Verses (KJV) \u2014 Full Text & Study Links',
    description: 'The 100 most searched, quoted, and memorized Bible verses with full King James Version text.',
    url: '/popular-bible-verses',
    type: 'website',
  },
  alternates: { canonical: '/popular-bible-verses' },
};

export default function PopularBibleVersesPage() {
  const themes = getUniqueThemes(ALL_POPULAR_VERSES);
  const themeGroups = getThemeGroups(ALL_POPULAR_VERSES);
  const otVerses = ALL_POPULAR_VERSES.filter(v => OT_SLUGS.includes(v.bookSlug));
  const ntVerses = ALL_POPULAR_VERSES.filter(v => !OT_SLUGS.includes(v.bookSlug));
  const uniqueBooks = new Set(ALL_POPULAR_VERSES.map(v => v.bookSlug));

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bible Quotes', item: 'https://biblemaximum.com/bible-quotes' },
      { '@type': 'ListItem', position: 3, name: '100 Most Popular Bible Verses' },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '100 Most Popular Bible Verses',
    description: metadata.description,
    url: 'https://biblemaximum.com/popular-bible-verses',
    numberOfItems: ALL_POPULAR_VERSES.length,
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '100 Most Popular Bible Verses',
    numberOfItems: ALL_POPULAR_VERSES.length,
    itemListElement: ALL_POPULAR_VERSES.slice(0, 10).map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: v.reference,
      description: v.text,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question', name: 'What is the most popular verse in the Bible?',
        acceptedAnswer: { '@type': 'Answer', text: 'John 3:16 is the most popular Bible verse worldwide. It reads: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." It consistently ranks #1 on YouVersion, BibleGateway, and Google search data for Bible-related queries. This single verse encapsulates the gospel message of salvation through Jesus Christ.' },
      },
      {
        '@type': 'Question', name: 'What are the top 10 Bible verses everyone should know?',
        acceptedAnswer: { '@type': 'Answer', text: 'The top 10 most popular Bible verses are: (1) John 3:16 \u2014 Salvation, (2) Jeremiah 29:11 \u2014 Hope, (3) Philippians 4:13 \u2014 Strength, (4) John 10:10 \u2014 Abundant Life, (5) Proverbs 3:5\u20136 \u2014 Trust, (6) Matthew 28:19 \u2014 Great Commission, (7) Philippians 4:8 \u2014 Thought Life, (8) Philippians 4:6 \u2014 Prayer, (9) Romans 8:28 \u2014 Providence, and (10) Ephesians 2:8 \u2014 Grace. These verses cover the foundational themes of the Christian faith.' },
      },
      {
        '@type': 'Question', name: 'What is the most Googled Bible verse?',
        acceptedAnswer: { '@type': 'Answer', text: 'According to Google Trends and search volume data, John 3:16, Jeremiah 29:11, and Philippians 4:13 consistently rank as the most Googled Bible verses year after year. Search interest spikes around Easter (John 3:16), graduation season (Jeremiah 29:11, Philippians 4:13), and during times of national crisis.' },
      },
      {
        '@type': 'Question', name: 'What is the most memorized scripture?',
        acceptedAnswer: { '@type': 'Answer', text: 'John 3:16 is the most memorized scripture in Christianity, followed closely by Psalm 23:1 ("The LORD is my shepherd; I shall not want") and Romans 8:28 ("And we know that all things work together for good..."). These passages are often the first verses taught to children in Sunday school and Vacation Bible School programs.' },
      },
      {
        '@type': 'Question', name: 'How many verses are in the Bible?',
        acceptedAnswer: { '@type': 'Answer', text: 'The King James Version of the Bible contains 31,102 verses across 66 books \u2014 23,145 in the Old Testament and 7,957 in the New Testament. Among these, certain passages have become universally recognized through sermons, songs, memorization programs, and social media sharing.' },
      },
      {
        '@type': 'Question', name: 'What Bible translation are these verses from?',
        acceptedAnswer: { '@type': 'Answer', text: 'All 100 verses on this page are presented in the King James Version (KJV), first published in 1611. The KJV remains one of the most widely read, memorized, and quoted English Bible translations, prized for its literary beauty and its enduring influence on the English language, hymnody, and Christian devotional literature.' },
      },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={collectionSchema} />
      <StructuredData data={itemListSchema} />
      <StructuredData data={faqSchema} />

      <Breadcrumb items={[
        { label: 'Bible Quotes', href: '/bible-quotes' },
        { label: '100 Most Popular Bible Verses' },
      ]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero */}
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mt-6 mb-8">
              <div className="relative h-48 md:h-56 bg-gradient-to-r from-amber-800 to-amber-900">
                <Image
                  src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png"
                  alt="100 Most Popular Bible Verses"
                  fill
                  className="object-cover opacity-25"
                  priority
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                    100 Most Popular Bible Verses
                  </h1>
                  <p className="text-amber-100 max-w-2xl mb-4">
                    The most searched, quoted, and memorized scriptures in the King James Bible -- ranked by search volume, citation frequency, and devotional usage worldwide.
                  </p>
                  <Link
                    href="/bible-quizzes"
                    className="inline-flex items-center px-6 py-3 bg-white text-scripture font-bold rounded-lg hover:bg-sacred-light transition-colors shadow-md w-fit"
                  >
                    Test Your Knowledge -- Take a Quiz
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-4 divide-x divide-grace border-b border-grace">
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-sacred">100</p>
                  <p className="text-sm text-ink-muted">Popular Verses</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-sacred">{themes.length}</p>
                  <p className="text-sm text-ink-muted">Themes</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-sacred">KJV</p>
                  <p className="text-sm text-ink-muted">Translation</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-sacred">{uniqueBooks.size}</p>
                  <p className="text-sm text-ink-muted">Books</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NLP Article Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-3">
              What Are the Most Popular Bible Verses?
            </h2>
            <div className="text-scripture leading-relaxed space-y-3">
              <p>
                Out of more than 31,000 verses in Scripture, a small number of passages have risen to extraordinary prominence in the life of the Church and in popular culture. These are the <strong>most popular Bible verses</strong> -- the scriptures that Christians memorize first, preachers quote most often, and millions of people search for online every day. They represent the heart of God&apos;s Word: His love for the world, His plan of salvation through Jesus Christ, and His promises of comfort, strength, and eternal life.
              </p>
              <p>
                What makes a Bible verse &ldquo;popular&rdquo;? The ranking below draws on multiple data sources: Google search volume and trends, the YouVersion Bible App&apos;s most-bookmarked and most-shared passages, BibleGateway&apos;s annual top-searched-verses reports, academic citation studies, and social media sharing data analyzed by organizations like World Vision and Ahrefs. Verses like <strong>John 3:16</strong>, <strong>Psalm 23</strong>, and <strong>Romans 8:28</strong> appear at the top of virtually every list because they speak to universal human needs -- hope in suffering, assurance of God&apos;s love, and the promise of eternal life through faith in Christ.
              </p>
              <p>
                The <strong>King James Version</strong> (KJV) holds a unique place in shaping which verses are most widely quoted. Published in 1611, its majestic prose has influenced English hymnody, literature, law, and everyday speech for over four centuries. Phrases from the KJV -- &ldquo;the valley of the shadow of death,&rdquo; &ldquo;a lamp unto my feet,&rdquo; &ldquo;the truth shall make you free&rdquo; -- have entered the common vocabulary of the English-speaking world. Whether you are beginning a daily devotional practice, preparing a sermon, memorizing scripture for the first time, or seeking encouragement during a trial, these 100 passages offer a comprehensive cross-reference of the Old Testament and New Testament&apos;s most powerful words of faith, hope, love, grace, forgiveness, prayer, and the gospel message.
              </p>
            </div>
          </div>
        </section>

        {/* Theme Tags */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-lg font-bold text-scripture mb-3">Browse by Theme</h2>
          <div className="flex flex-wrap gap-2">
            {themes.map(theme => (
              <a
                key={theme}
                href={`#theme-${theme.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center px-3 py-1.5 bg-white border border-grace rounded-lg text-sm text-scripture hover:border-sacred/50 hover:text-gold-dark transition-colors"
              >
                {theme}
              </a>
            ))}
          </div>
        </section>

        {/* Main Verse List */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <ol className="space-y-4">
            {ALL_POPULAR_VERSES.map((verse, idx) => (
              <li
                key={verse.reference}
                id={idx === 0 ? `theme-${verse.theme.toLowerCase().replace(/\s+/g, '-')}` : undefined}
                className="bg-white rounded-xl border border-grace hover:border-sacred/50 hover:shadow-sm transition-all overflow-hidden"
              >
                <div className="flex items-start gap-4 p-5 md:p-6">
                  <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-sacred-light text-scripture text-sm font-bold border border-sacred/10">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Link href={verseUrl(verse)} className="text-lg font-display font-bold text-scripture hover:text-gold-dark transition-colors">
                        {verse.reference}
                      </Link>
                      <span className="inline-block px-2 py-0.5 bg-sacred-light text-scripture text-xs rounded-full border border-sacred/10">
                        {verse.theme}
                      </span>
                    </div>
                    <blockquote className="text-ink-muted leading-relaxed italic border-l-3 border-sacred/20 pl-4">
                      &ldquo;{verse.text}&rdquo;
                    </blockquote>
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                      <Link href={verseUrl(verse)} className="text-sacred hover:underline font-medium">Study this verse</Link>
                      <span className="text-ink-light">|</span>
                      <Link href={`/chapters/${verse.bookSlug}/${verse.chapter}`} className="text-sacred hover:underline">Chapter {verse.chapter}</Link>
                      <span className="text-ink-light">|</span>
                      <Link href={`/${verse.bookSlug}-chapters`} className="text-sacred hover:underline">{verse.book} Chapters</Link>
                      <span className="text-ink-light">|</span>
                      <Link href={`/${verse.bookSlug}-${verse.chapter}-quiz`} className="text-sacred hover:underline font-semibold">Chapter Quiz</Link>
                      <span className="text-ink-light">|</span>
                      <Link href={`/bible-quotes/${verse.themeSlug}`} className="text-sacred hover:underline">Bible Quotes About {verse.theme}</Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </main>

        {/* Mid-Content CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-scripture to-scripture/80 rounded-xl p-6 md:p-8 text-white">
            <h2 className="text-xl md:text-2xl font-display font-bold mb-2">
              Think You Know These Verses? Prove It.
            </h2>
            <p className="text-sacred-light mb-4 max-w-2xl">
              Take a chapter quiz from any book featured on this page. 15 questions per quiz with instant scoring and verse-by-verse explanations.
            </p>
            <Link href="/bible-quizzes" className="inline-flex items-center px-6 py-3 bg-white text-scripture font-bold rounded-lg hover:bg-sacred-light transition-colors shadow-md">
              Take a Quiz Now
            </Link>
          </div>
        </section>

        {/* Testament Breakdown */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">Popular Verses by Testament</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-scripture mb-2">Old Testament <span className="text-sm font-normal text-ink-muted ml-2">({otVerses.length} verses)</span></h3>
                <ul className="space-y-1">
                  {otVerses.map(v => (
                    <li key={v.reference}>
                      <Link href={verseUrl(v)} className="text-sm text-sacred hover:underline">{v.reference}</Link>
                      <span className="text-sm text-ink-muted ml-1">-- {v.book}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-2">New Testament <span className="text-sm font-normal text-ink-muted ml-2">({ntVerses.length} verses)</span></h3>
                <ul className="space-y-1">
                  {ntVerses.map(v => (
                    <li key={v.reference}>
                      <Link href={verseUrl(v)} className="text-sm text-sacred hover:underline">{v.reference}</Link>
                      <span className="text-sm text-ink-muted ml-1">-- {v.book}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Verses by Theme */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">Verses by Theme</h2>
            <p className="text-sm text-ink-muted mb-5">The 100 most popular Bible verses grouped by spiritual theme. Click any theme heading to explore more verses on that topic.</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Object.entries(themeGroups).map(([theme, verses]) => (
                <div key={theme} id={`theme-${theme.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Link href={`/bible-quotes/${verses[0].themeSlug}`} className="font-bold text-scripture hover:text-gold-dark transition-colors">
                    {theme}
                  </Link>
                  <span className="text-sm text-ink-muted ml-1">({verses.length})</span>
                  <ul className="mt-1 space-y-0.5">
                    {verses.map(v => (
                      <li key={v.reference}>
                        <Link href={verseUrl(v)} className="text-sm text-sacred hover:underline">{v.reference}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-scripture mb-1">What is the most popular verse in the Bible?</h3>
                <p className="text-scripture leading-relaxed">John 3:16 is the most popular Bible verse worldwide: &ldquo;For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.&rdquo; It consistently ranks #1 on YouVersion, BibleGateway, and Google search trends for Bible-related queries.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What are the top 10 Bible verses everyone should know?</h3>
                <p className="text-scripture leading-relaxed">The top 10 are: (1) John 3:16 -- Salvation, (2) Jeremiah 29:11 -- Hope, (3) Philippians 4:13 -- Strength, (4) John 10:10 -- Abundant Life, (5) Proverbs 3:5&ndash;6 -- Trust, (6) Matthew 28:19 -- Great Commission, (7) Philippians 4:8 -- Thought Life, (8) Philippians 4:6 -- Prayer, (9) Romans 8:28 -- Providence, (10) Ephesians 2:8 -- Grace.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What is the most Googled Bible verse?</h3>
                <p className="text-scripture leading-relaxed">John 3:16, Jeremiah 29:11, and Philippians 4:13 consistently rank as the most Googled Bible verses. Search interest spikes around Easter (John 3:16), graduation season (Jeremiah 29:11, Philippians 4:13), and during times of national crisis or uncertainty.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What is the most memorized scripture?</h3>
                <p className="text-scripture leading-relaxed">John 3:16 is the most memorized scripture in Christianity, followed by Psalm 23:1 (&ldquo;The LORD is my shepherd; I shall not want&rdquo;) and Romans 8:28. These passages are often the first verses taught to children in Sunday school and Vacation Bible School programs.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">How many verses are in the Bible?</h3>
                <p className="text-scripture leading-relaxed">The King James Version contains 31,102 verses across 66 books -- 23,145 in the Old Testament and 7,957 in the New Testament. Among these, certain passages have become universally recognized through sermons, songs, memorization programs, and social media sharing.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What Bible translation are these verses from?</h3>
                <p className="text-scripture leading-relaxed">All 100 verses on this page are from the King James Version (KJV), first published in 1611. The KJV remains one of the most widely read, memorized, and quoted English Bible translations, prized for its literary beauty and influence on the English language.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">Continue Exploring Scripture</h2>
            <p className="text-sm text-ink-muted mb-5">Deepen your Bible study with quizzes, devotionals, reading plans, and more.</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              <Link href="/bible-quizzes" className="flex items-center gap-3 px-4 py-3 bg-scripture text-white font-bold rounded-lg hover:bg-ink-muted hover:shadow-sm transition-all">
                <span>Bible Quizzes</span>
              </Link>
              <Link href="/bible-quotes" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-sacred/50 hover:shadow-sm transition-all group">
                <span className="font-medium text-scripture group-hover:text-gold-dark transition-colors">Bible Quotes Hub</span>
              </Link>
              <Link href="/famous-bible-verses" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-sacred/50 hover:shadow-sm transition-all group">
                <span className="font-medium text-scripture group-hover:text-gold-dark transition-colors">Famous Bible Verses</span>
              </Link>
              <Link href="/cross-references" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-sacred/50 hover:shadow-sm transition-all group">
                <span className="font-medium text-scripture group-hover:text-gold-dark transition-colors">Cross References</span>
              </Link>
              <Link href="/bible-study-guides" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-sacred/50 hover:shadow-sm transition-all group">
                <span className="font-medium text-scripture group-hover:text-gold-dark transition-colors">Study Guides</span>
              </Link>
              <Link href="/reading-plans" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-sacred/50 hover:shadow-sm transition-all group">
                <span className="font-medium text-scripture group-hover:text-gold-dark transition-colors">Reading Plans</span>
              </Link>
              <Link href="/devotionals" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-sacred/50 hover:shadow-sm transition-all group">
                <span className="font-medium text-scripture group-hover:text-gold-dark transition-colors">Daily Devotionals</span>
              </Link>
              <Link href="/topics" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-sacred/50 hover:shadow-sm transition-all group">
                <span className="font-medium text-scripture group-hover:text-gold-dark transition-colors">Bible Topics</span>
              </Link>
              <Link href="/bible-chapter-summaries" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-sacred/50 hover:shadow-sm transition-all group">
                <span className="font-medium text-scripture group-hover:text-gold-dark transition-colors">Chapter Summaries</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
