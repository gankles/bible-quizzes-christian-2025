import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

// ---------------------------------------------------------------------------
// 50 Short Bible Verses Easy to Memorize (KJV)
// ---------------------------------------------------------------------------

interface ShortVerse {
  reference: string;
  book: string;
  bookSlug: string;
  chapter: number;
  verse: number;
  endVerse?: number;
  text: string;
  theme: string;
  themeSlug: string;
}

const SHORT_VERSES: ShortVerse[] = [
  {
    reference: 'John 11:35',
    book: 'John', bookSlug: 'john', chapter: 11, verse: 35,
    text: 'Jesus wept.',
    theme: 'Compassion', themeSlug: 'compassion',
  },
  {
    reference: '1 Thessalonians 5:17',
    book: '1 Thessalonians', bookSlug: '1-thessalonians', chapter: 5, verse: 17,
    text: 'Pray without ceasing.',
    theme: 'Prayer', themeSlug: 'prayer',
  },
  {
    reference: '1 Thessalonians 5:16',
    book: '1 Thessalonians', bookSlug: '1-thessalonians', chapter: 5, verse: 16,
    text: 'Rejoice evermore.',
    theme: 'Joy', themeSlug: 'joy',
  },
  {
    reference: 'Psalm 118:24',
    book: 'Psalms', bookSlug: 'psalms', chapter: 118, verse: 24,
    text: 'This is the day which the LORD hath made; we will rejoice and be glad in it.',
    theme: 'Joy', themeSlug: 'joy',
  },
  {
    reference: 'Psalm 56:3',
    book: 'Psalms', bookSlug: 'psalms', chapter: 56, verse: 3,
    text: 'What time I am afraid, I will trust in thee.',
    theme: 'Trust', themeSlug: 'trust',
  },
  {
    reference: 'Psalm 46:10',
    book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 10,
    text: 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.',
    theme: 'Stillness', themeSlug: 'stillness',
  },
  {
    reference: 'Proverbs 3:5',
    book: 'Proverbs', bookSlug: 'proverbs', chapter: 3, verse: 5,
    text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.',
    theme: 'Trust', themeSlug: 'trust',
  },
  {
    reference: '1 John 4:19',
    book: '1 John', bookSlug: '1-john', chapter: 4, verse: 19,
    text: 'We love him, because he first loved us.',
    theme: 'Love', themeSlug: 'love',
  },
  {
    reference: 'Romans 12:12',
    book: 'Romans', bookSlug: 'romans', chapter: 12, verse: 12,
    text: 'Rejoicing in hope; patient in tribulation; continuing instant in prayer.',
    theme: 'Hope', themeSlug: 'hope',
  },
  {
    reference: 'Philippians 4:4',
    book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 4,
    text: 'Rejoice in the Lord alway: and again I say, Rejoice.',
    theme: 'Joy', themeSlug: 'joy',
  },
  {
    reference: '1 John 4:8',
    book: '1 John', bookSlug: '1-john', chapter: 4, verse: 8,
    text: 'He that loveth not knoweth not God; for God is love.',
    theme: 'Love', themeSlug: 'love',
  },
  {
    reference: 'Genesis 1:1',
    book: 'Genesis', bookSlug: 'genesis', chapter: 1, verse: 1,
    text: 'In the beginning God created the heaven and the earth.',
    theme: 'Creation', themeSlug: 'creation',
  },
  {
    reference: 'Psalm 23:1',
    book: 'Psalms', bookSlug: 'psalms', chapter: 23, verse: 1,
    text: 'The LORD is my shepherd; I shall not want.',
    theme: 'Comfort', themeSlug: 'comfort',
  },
  {
    reference: 'Romans 8:28',
    book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 28,
    text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
    theme: 'Providence', themeSlug: 'providence',
  },
  {
    reference: 'Ephesians 4:32',
    book: 'Ephesians', bookSlug: 'ephesians', chapter: 4, verse: 32,
    text: 'And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ\'s sake hath forgiven you.',
    theme: 'Kindness', themeSlug: 'kindness',
  },
  {
    reference: 'Philippians 4:13',
    book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 13,
    text: 'I can do all things through Christ which strengtheneth me.',
    theme: 'Strength', themeSlug: 'strength',
  },
  {
    reference: '1 Peter 5:7',
    book: '1 Peter', bookSlug: '1-peter', chapter: 5, verse: 7,
    text: 'Casting all your care upon him; for he careth for you.',
    theme: 'Anxiety', themeSlug: 'anxiety',
  },
  {
    reference: 'Proverbs 18:10',
    book: 'Proverbs', bookSlug: 'proverbs', chapter: 18, verse: 10,
    text: 'The name of the LORD is a strong tower: the righteous runneth into it, and is safe.',
    theme: 'Protection', themeSlug: 'protection',
  },
  {
    reference: 'Matthew 5:16',
    book: 'Matthew', bookSlug: 'matthew', chapter: 5, verse: 16,
    text: 'Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.',
    theme: 'Witness', themeSlug: 'witness',
  },
  {
    reference: 'John 8:32',
    book: 'John', bookSlug: 'john', chapter: 8, verse: 32,
    text: 'And ye shall know the truth, and the truth shall make you free.',
    theme: 'Freedom', themeSlug: 'freedom',
  },
  {
    reference: 'Psalm 27:1',
    book: 'Psalms', bookSlug: 'psalms', chapter: 27, verse: 1,
    text: 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?',
    theme: 'Fearlessness', themeSlug: 'fearlessness',
  },
  {
    reference: 'James 4:7',
    book: 'James', bookSlug: 'james', chapter: 4, verse: 7,
    text: 'Submit yourselves therefore to God. Resist the devil, and he will flee from you.',
    theme: 'Spiritual Warfare', themeSlug: 'spiritual-warfare',
  },
  {
    reference: 'Hebrews 13:8',
    book: 'Hebrews', bookSlug: 'hebrews', chapter: 13, verse: 8,
    text: 'Jesus Christ the same yesterday, and to day, and for ever.',
    theme: 'Unchanging God', themeSlug: 'unchanging-god',
  },
  {
    reference: 'Mark 10:27',
    book: 'Mark', bookSlug: 'mark', chapter: 10, verse: 27,
    text: 'With men it is impossible, but not with God: for with God all things are possible.',
    theme: 'Faith', themeSlug: 'faith',
  },
  {
    reference: 'Psalm 119:105',
    book: 'Psalms', bookSlug: 'psalms', chapter: 119, verse: 105,
    text: 'Thy word is a lamp unto my feet, and a light unto my path.',
    theme: 'Guidance', themeSlug: 'guidance',
  },
  {
    reference: 'Colossians 3:2',
    book: 'Colossians', bookSlug: 'colossians', chapter: 3, verse: 2,
    text: 'Set your affection on things above, not on things on the earth.',
    theme: 'Priorities', themeSlug: 'priorities',
  },
  {
    reference: '1 Thessalonians 5:18',
    book: '1 Thessalonians', bookSlug: '1-thessalonians', chapter: 5, verse: 18,
    text: 'In every thing give thanks: for this is the will of God in Christ Jesus concerning you.',
    theme: 'Gratitude', themeSlug: 'gratitude',
  },
  {
    reference: 'Proverbs 16:3',
    book: 'Proverbs', bookSlug: 'proverbs', chapter: 16, verse: 3,
    text: 'Commit thy works unto the LORD, and thy thoughts shall be established.',
    theme: 'Commitment', themeSlug: 'commitment',
  },
  {
    reference: 'Psalm 37:4',
    book: 'Psalms', bookSlug: 'psalms', chapter: 37, verse: 4,
    text: 'Delight thyself also in the LORD; and he shall give thee the desires of thine heart.',
    theme: 'Desire', themeSlug: 'desire',
  },
  {
    reference: 'Romans 6:23',
    book: 'Romans', bookSlug: 'romans', chapter: 6, verse: 23,
    text: 'For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.',
    theme: 'Salvation', themeSlug: 'salvation',
  },
  {
    reference: 'Proverbs 4:23',
    book: 'Proverbs', bookSlug: 'proverbs', chapter: 4, verse: 23,
    text: 'Keep thy heart with all diligence; for out of it are the issues of life.',
    theme: 'Heart', themeSlug: 'heart',
  },
  {
    reference: 'Psalm 34:8',
    book: 'Psalms', bookSlug: 'psalms', chapter: 34, verse: 8,
    text: 'O taste and see that the LORD is good: blessed is the man that trusteth in him.',
    theme: 'Goodness', themeSlug: 'goodness',
  },
  {
    reference: 'Matthew 6:33',
    book: 'Matthew', bookSlug: 'matthew', chapter: 6, verse: 33,
    text: 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.',
    theme: 'Priorities', themeSlug: 'priorities',
  },
  {
    reference: 'Colossians 3:23',
    book: 'Colossians', bookSlug: 'colossians', chapter: 3, verse: 23,
    text: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men.',
    theme: 'Work', themeSlug: 'work',
  },
  {
    reference: 'Psalm 139:14',
    book: 'Psalms', bookSlug: 'psalms', chapter: 139, verse: 14,
    text: 'I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.',
    theme: 'Identity', themeSlug: 'identity',
  },
  {
    reference: 'John 1:1',
    book: 'John', bookSlug: 'john', chapter: 1, verse: 1,
    text: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
    theme: 'Deity of Christ', themeSlug: 'deity-of-christ',
  },
  {
    reference: 'Hebrews 11:1',
    book: 'Hebrews', bookSlug: 'hebrews', chapter: 11, verse: 1,
    text: 'Now faith is the substance of things hoped for, the evidence of things not seen.',
    theme: 'Faith', themeSlug: 'faith',
  },
  {
    reference: 'Psalm 46:1',
    book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 1,
    text: 'God is our refuge and strength, a very present help in trouble.',
    theme: 'Refuge', themeSlug: 'refuge',
  },
  {
    reference: '2 Timothy 1:7',
    book: '2 Timothy', bookSlug: '2-timothy', chapter: 1, verse: 7,
    text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.',
    theme: 'Power', themeSlug: 'power',
  },
  {
    reference: 'Galatians 2:20',
    book: 'Galatians', bookSlug: 'galatians', chapter: 2, verse: 20,
    text: 'I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me.',
    theme: 'New Life', themeSlug: 'new-life',
  },
  {
    reference: 'Psalm 103:12',
    book: 'Psalms', bookSlug: 'psalms', chapter: 103, verse: 12,
    text: 'As far as the east is from the west, so far hath he removed our transgressions from us.',
    theme: 'Forgiveness', themeSlug: 'forgiveness',
  },
  {
    reference: '1 John 1:9',
    book: '1 John', bookSlug: '1-john', chapter: 1, verse: 9,
    text: 'If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.',
    theme: 'Forgiveness', themeSlug: 'forgiveness',
  },
  {
    reference: 'Nahum 1:7',
    book: 'Nahum', bookSlug: 'nahum', chapter: 1, verse: 7,
    text: 'The LORD is good, a strong hold in the day of trouble; and he knoweth them that trust in him.',
    theme: 'Goodness', themeSlug: 'goodness',
  },
  {
    reference: 'Psalm 16:11',
    book: 'Psalms', bookSlug: 'psalms', chapter: 16, verse: 11,
    text: 'Thou wilt shew me the path of life: in thy presence is fulness of joy; at thy right hand there are pleasures for evermore.',
    theme: 'Joy', themeSlug: 'joy',
  },
  {
    reference: 'Psalm 51:10',
    book: 'Psalms', bookSlug: 'psalms', chapter: 51, verse: 10,
    text: 'Create in me a clean heart, O God; and renew a right spirit within me.',
    theme: 'Repentance', themeSlug: 'repentance',
  },
  {
    reference: 'Ecclesiastes 3:1',
    book: 'Ecclesiastes', bookSlug: 'ecclesiastes', chapter: 3, verse: 1,
    text: 'To every thing there is a season, and a time to every purpose under the heaven.',
    theme: 'Seasons', themeSlug: 'seasons',
  },
  {
    reference: 'Matthew 11:28',
    book: 'Matthew', bookSlug: 'matthew', chapter: 11, verse: 28,
    text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.',
    theme: 'Rest', themeSlug: 'rest',
  },
  {
    reference: 'John 14:6',
    book: 'John', bookSlug: 'john', chapter: 14, verse: 6,
    text: 'Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.',
    theme: 'Truth', themeSlug: 'truth',
  },
  {
    reference: 'Romans 12:2',
    book: 'Romans', bookSlug: 'romans', chapter: 12, verse: 2,
    text: 'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.',
    theme: 'Transformation', themeSlug: 'transformation',
  },
  {
    reference: 'Joshua 1:9',
    book: 'Joshua', bookSlug: 'joshua', chapter: 1, verse: 9,
    text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.',
    theme: 'Courage', themeSlug: 'courage',
  },
];

// ---------------------------------------------------------------------------
// OT Book Slugs (for testament filtering)
// ---------------------------------------------------------------------------

const OT_SLUGS = [
  'genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy',
  'joshua', 'judges', 'ruth', '1-samuel', '2-samuel',
  '1-kings', '2-kings', '1-chronicles', '2-chronicles',
  'ezra', 'nehemiah', 'esther', 'job', 'psalms', 'proverbs',
  'ecclesiastes', 'song-of-solomon', 'isaiah', 'jeremiah',
  'lamentations', 'ezekiel', 'daniel', 'hosea', 'joel',
  'amos', 'obadiah', 'jonah', 'micah', 'nahum', 'habakkuk',
  'zephaniah', 'haggai', 'zechariah', 'malachi',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function verseUrl(v: ShortVerse): string {
  return `/verses/${v.bookSlug}/${v.chapter}/${v.verse}`;
}

/** Collect unique themes for the category filter */
function getUniqueThemes(): string[] {
  const seen = new Set<string>();
  for (const v of SHORT_VERSES) {
    seen.add(v.theme);
  }
  return Array.from(seen);
}

/** Count unique books */
function getUniqueBooks(): string[] {
  const seen = new Set<string>();
  for (const v of SHORT_VERSES) {
    seen.add(v.book);
  }
  return Array.from(seen);
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Short Bible Verses -- 50 Powerful Scriptures That Are Easy to Memorize | Brief KJV Passages for Daily Encouragement & Quick Study',
  description:
    'Discover 50 short Bible verses that are easy to memorize from the King James Version. From "Jesus wept" to "Pray without ceasing," these brief KJV scriptures are perfect for memorization, daily encouragement, scripture cards, children\'s Bible study, and quick devotional reading.',
  keywords: [
    'short bible verses', 'short scripture', 'brief bible passages',
    'easy to memorize bible verses', 'short KJV verses', 'bible verses for memorization',
    'quick scripture', 'short bible quotes', 'shortest bible verse',
    'easy bible verses for kids', 'short verses to memorize',
    'brief bible verses', 'simple bible verses', 'short inspirational bible verses',
  ],
  openGraph: {
    title: 'Short Bible Verses | 50 Easy-to-Memorize Scriptures (KJV)',
    description: '50 short, powerful Bible verses from the King James Version -- perfect for memorization, encouragement, and daily devotion.',
    url: '/short-bible-verses',
    type: 'website',
  },
  alternates: { canonical: '/short-bible-verses' },
};

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function ShortBibleVersesPage() {
  const themes = getUniqueThemes();
  const books = getUniqueBooks();
  const otVerses = SHORT_VERSES.filter(v => OT_SLUGS.includes(v.bookSlug));
  const ntVerses = SHORT_VERSES.filter(v => !OT_SLUGS.includes(v.bookSlug));

  // --- Structured Data ---

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Short Bible Verses',
    description: metadata.description,
    url: 'https://biblemaximum.com/short-bible-verses',
    numberOfItems: SHORT_VERSES.length,
    publisher: {
      '@type': 'Organization',
      name: 'Bible Maximum',
      url: 'https://biblemaximum.com',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bible Quotes', item: 'https://biblemaximum.com/bible-quotes' },
      { '@type': 'ListItem', position: 3, name: 'Short Bible Verses' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the shortest verse in the Bible?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The shortest verse in the King James Version of the Bible is John 11:35, which reads simply: "Jesus wept." It contains only two words and nine letters, making it the easiest Bible verse to memorize. Despite its brevity, this verse reveals the deep compassion and humanity of Jesus Christ as He wept at the tomb of His friend Lazarus.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are good short Bible verses to memorize?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Some of the best short Bible verses to memorize include: "Pray without ceasing" (1 Thessalonians 5:17), "Rejoice evermore" (1 Thessalonians 5:16), "We love him, because he first loved us" (1 John 4:19), "The LORD is my shepherd; I shall not want" (Psalm 23:1), and "I can do all things through Christ which strengtheneth me" (Philippians 4:13). These verses are brief enough to commit to memory quickly while carrying powerful spiritual truths.',
        },
      },
      {
        '@type': 'Question',
        name: 'What short Bible verse is good for encouragement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For encouragement, some of the best short Bible verses include: "Casting all your care upon him; for he careth for you" (1 Peter 5:7), "God is our refuge and strength, a very present help in trouble" (Psalm 46:1), "Be still, and know that I am God" (Psalm 46:10), and "Come unto me, all ye that labour and are heavy laden, and I will give you rest" (Matthew 11:28). These brief passages offer comfort and strength during difficult seasons.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many words is the shortest Bible verse?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The shortest Bible verse in the King James Version, John 11:35, contains exactly two words: "Jesus wept." In the original Greek text, the verse is also very brief, reading "edakrusen ho Iesous" (three words). The next shortest verses include "Rejoice evermore" (1 Thessalonians 5:16) at two words and "Pray without ceasing" (1 Thessalonians 5:17) at three words.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are easy Bible verses for kids to learn?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The easiest Bible verses for children to learn are the shortest ones with simple language: "Jesus wept" (John 11:35), "Pray without ceasing" (1 Thessalonians 5:17), "Rejoice evermore" (1 Thessalonians 5:16), "God is love" from 1 John 4:8, "We love him, because he first loved us" (1 John 4:19), and "The LORD is my shepherd; I shall not want" (Psalm 23:1). Starting with these brief verses helps children build confidence in scripture memorization before progressing to longer passages.',
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={collectionSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      <Breadcrumb items={[{ label: 'Bible Quotes', href: '/bible-quotes' }, { label: 'Short Bible Verses' }]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mt-6 mb-8">
              <div className="relative h-48 md:h-56 bg-gradient-to-r from-amber-800 to-amber-900">
                <Image
                  src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png"
                  alt="Short Bible Verses Easy to Memorize"
                  fill
                  className="object-cover opacity-25"
                  priority
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                    Short Bible Verses
                  </h1>
                  <p className="text-amber-100 max-w-2xl mb-4">
                    50 powerful, brief scriptures from the King James Bible that are
                    easy to memorize -- perfect for daily encouragement, scripture
                    memory cards, and quick devotional reading.
                  </p>
                  <Link
                    href="/bible-quizzes"
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md w-fit"
                  >
                    Test Your Scripture Memory -- Take a Quiz
                  </Link>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-4 divide-x divide-grace border-b border-grace">
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">50</p>
                  <p className="text-sm text-primary-dark/70">Short Verses</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{themes.length}</p>
                  <p className="text-sm text-primary-dark/70">Themes</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">KJV</p>
                  <p className="text-sm text-primary-dark/70">Translation</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{books.length}</p>
                  <p className="text-sm text-primary-dark/70">Books</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NLP Article Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-3">
              Why Short Bible Verses Are So Powerful
            </h2>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              Short Bible verses are among the most powerful passages in all of
              Scripture. Their brevity makes them the easiest scriptures to memorize
              and meditate on throughout the day. When you can carry a verse in your
              heart without needing to look it up, it becomes a ready source of
              strength, comfort, and guidance in every situation. Many of the most
              famous and frequently quoted scriptures in the Bible are remarkably
              short -- from the two-word declaration &ldquo;Jesus wept&rdquo; (John
              11:35) to the three-word command &ldquo;Pray without ceasing&rdquo; (1
              Thessalonians 5:17).
            </p>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              Brief Bible passages are ideal for scripture memory cards, phone
              wallpapers, journal entries, and even tattoos. They serve as anchors for
              the soul -- short enough to recall instantly yet deep enough to sustain a
              lifetime of reflection. For children&apos;s Bible study, short KJV
              verses provide the perfect starting point for building a habit of
              scripture memorization. A child who memorizes &ldquo;God is love&rdquo;
              or &ldquo;Rejoice evermore&rdquo; has planted a seed that the Holy Spirit
              can water for decades to come.
            </p>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              The shortest verse in the entire Bible is John 11:35: &ldquo;Jesus
              wept.&rdquo; Though only two words, it reveals the deep compassion of
              Christ and His willingness to enter into human grief. This proves that
              the power of Scripture is not measured by length but by divine
              inspiration. Every verse below, whether three words or a single sentence,
              carries the full weight and authority of God&apos;s Word.
            </p>
            <p className="text-primary-dark/80 leading-relaxed">
              These 50 short scriptures are presented in the King James Version and
              span both the Old and New Testaments. Each one links to a full verse
              study page where you can explore cross-references, original language
              words, commentary, and related Bible topics. Whether you are looking for
              easy Bible verses for memorization, quick scripture for daily
              encouragement, or brief KJV passages to share with others, this
              collection will serve you well.
            </p>
          </div>
        </section>

        {/* Theme Tags (Jump Links) */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-lg font-bold text-scripture mb-3">Browse by Theme</h2>
          <div className="flex flex-wrap gap-2">
            {themes.map(theme => (
              <a
                key={theme}
                href={`#theme-${theme.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center px-3 py-1.5 bg-white border border-grace rounded-lg text-sm text-primary-dark/80 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {theme}
              </a>
            ))}
          </div>
        </section>

        {/* Main Verse List */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <ol className="space-y-4">
            {SHORT_VERSES.map((verse, idx) => (
              <li
                key={verse.reference}
                id={`theme-${verse.themeSlug}`}
                className="bg-white rounded-xl border border-grace hover:border-blue-200 hover:shadow-sm transition-all overflow-hidden"
              >
                <div className="flex items-start gap-4 p-5 md:p-6">
                  {/* Number */}
                  <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-700 text-sm font-bold border border-blue-100">
                    {idx + 1}
                  </span>

                  <div className="flex-1 min-w-0">
                    {/* Reference & Theme */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Link
                        href={verseUrl(verse)}
                        className="text-lg font-display font-bold text-scripture hover:text-blue-600 transition-colors"
                      >
                        {verse.reference}
                      </Link>
                      <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100">
                        {verse.theme}
                      </span>
                    </div>

                    {/* Verse Text */}
                    <blockquote className="text-primary-dark/85 leading-relaxed italic border-l-3 border-blue-200 pl-4">
                      &ldquo;{verse.text}&rdquo;
                    </blockquote>

                    {/* Action Row */}
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                      <Link
                        href={verseUrl(verse)}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Study this verse
                      </Link>
                      <span className="text-primary-dark/30">|</span>
                      <Link
                        href={`/chapters/${verse.bookSlug}/${verse.chapter}`}
                        className="text-blue-600 hover:underline"
                      >
                        {verse.book} {verse.chapter}
                      </Link>
                      <span className="text-primary-dark/30">|</span>
                      <Link
                        href={`/${verse.bookSlug}-chapters`}
                        className="text-blue-600 hover:underline"
                      >
                        {verse.book} Chapters
                      </Link>
                      <span className="text-primary-dark/30">|</span>
                      <Link
                        href={`/${verse.bookSlug}-${verse.chapter}-quiz`}
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        {verse.book} {verse.chapter} Quiz
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </main>

        {/* Mid-Content CTA Banner */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 md:p-8 text-white">
            <h2 className="text-xl md:text-2xl font-display font-bold mb-2">
              How Many of These Short Verses Can You Recall?
            </h2>
            <p className="text-blue-100 mb-4 max-w-2xl">
              Put your Scripture memory to the test. Take a chapter quiz from any book featured on this page -- 15 questions per quiz with instant scoring and verse-by-verse explanations.
            </p>
            <Link
              href="/bible-quizzes"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md"
            >
              Take a Quiz Now
            </Link>
          </div>
        </section>

        {/* Old Testament vs New Testament Breakdown */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">
              Short Verses by Testament
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-scripture mb-2">
                  Old Testament
                  <span className="text-sm font-normal text-primary-dark/60 ml-2">({otVerses.length} verses)</span>
                </h3>
                <ul className="space-y-1">
                  {otVerses.map(v => (
                    <li key={v.reference}>
                      <Link href={verseUrl(v)} className="text-sm text-blue-600 hover:underline">
                        {v.reference}
                      </Link>
                      <span className="text-sm text-primary-dark/50 ml-1">-- {v.book}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-2">
                  New Testament
                  <span className="text-sm font-normal text-primary-dark/60 ml-2">({ntVerses.length} verses)</span>
                </h3>
                <ul className="space-y-1">
                  {ntVerses.map(v => (
                    <li key={v.reference}>
                      <Link href={verseUrl(v)} className="text-sm text-blue-600 hover:underline">
                        {v.reference}
                      </Link>
                      <span className="text-sm text-primary-dark/50 ml-1">-- {v.book}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-scripture mb-1">What is the shortest verse in the Bible?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  The shortest verse in the King James Version is John 11:35:
                  &ldquo;Jesus wept.&rdquo; It contains only two words and nine
                  letters. Despite its brevity, this verse powerfully reveals the
                  compassion of Jesus Christ as He grieved at the tomb of His friend
                  Lazarus. In the original Greek, the verse reads &ldquo;edakrusen ho
                  Iesous,&rdquo; which is also remarkably brief at just three words.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What are good short Bible verses to memorize?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  Some of the best short Bible verses for memorization include
                  &ldquo;Pray without ceasing&rdquo; (1 Thessalonians 5:17),
                  &ldquo;Rejoice evermore&rdquo; (1 Thessalonians 5:16), &ldquo;We
                  love him, because he first loved us&rdquo; (1 John 4:19),
                  &ldquo;The LORD is my shepherd; I shall not want&rdquo; (Psalm
                  23:1), and &ldquo;I can do all things through Christ which
                  strengtheneth me&rdquo; (Philippians 4:13). These verses are
                  brief enough to commit to memory quickly while carrying deep
                  spiritual truth.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What short Bible verse is good for encouragement?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  For encouragement, consider memorizing &ldquo;Casting all your care
                  upon him; for he careth for you&rdquo; (1 Peter 5:7), &ldquo;God is
                  our refuge and strength, a very present help in trouble&rdquo;
                  (Psalm 46:1), &ldquo;Be still, and know that I am God&rdquo; (Psalm
                  46:10), and &ldquo;Come unto me, all ye that labour and are heavy
                  laden, and I will give you rest&rdquo; (Matthew 11:28). Each of
                  these brief passages offers immediate comfort and strength during
                  difficult seasons of life.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">How many words is the shortest Bible verse?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  The shortest Bible verse in the King James Version, John 11:35,
                  contains exactly two words: &ldquo;Jesus wept.&rdquo; The next
                  shortest verses include &ldquo;Rejoice evermore&rdquo; (1
                  Thessalonians 5:16) at two words and &ldquo;Pray without
                  ceasing&rdquo; (1 Thessalonians 5:17) at three words. These
                  ultra-short verses demonstrate that God&apos;s truth does not require
                  lengthy explanation to transform the heart.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What are easy Bible verses for kids to learn?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  The easiest Bible verses for children are the shortest ones with
                  simple vocabulary: &ldquo;Jesus wept&rdquo; (John 11:35),
                  &ldquo;Pray without ceasing&rdquo; (1 Thessalonians 5:17),
                  &ldquo;Rejoice evermore&rdquo; (1 Thessalonians 5:16), &ldquo;He
                  that loveth not knoweth not God; for God is love&rdquo; (1 John
                  4:8), &ldquo;We love him, because he first loved us&rdquo; (1 John
                  4:19), and &ldquo;The LORD is my shepherd; I shall not want&rdquo;
                  (Psalm 23:1). Starting with these brief verses helps children build
                  confidence in scripture memorization before progressing to longer
                  passages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">
              Continue Exploring Scripture
            </h2>
            <p className="text-sm text-primary-dark/70 mb-5">
              Deepen your Bible study with quizzes, devotionals, reading plans, and more.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              <Link
                href="/bible-quizzes"
                className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 hover:shadow-sm transition-all"
              >
                <span>Bible Quizzes</span>
              </Link>
              <Link
                href="/famous-bible-verses"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Famous Bible Verses</span>
              </Link>
              <Link
                href="/devotionals"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Daily Devotionals</span>
              </Link>
              <Link
                href="/reading-plans"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Reading Plans</span>
              </Link>
              <Link
                href="/topics"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Topics</span>
              </Link>
              <Link
                href="/bible-study-guides"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Study Guides</span>
              </Link>
              <Link
                href="/cross-references"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Cross References</span>
              </Link>
              <Link
                href="/bible-chapter-summaries"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Chapter Summaries</span>
              </Link>
              <Link
                href="/bible-stories"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Stories</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
