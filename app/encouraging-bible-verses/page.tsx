import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

// ---------------------------------------------------------------------------
// 50 Encouraging Bible Verses (KJV)
// ---------------------------------------------------------------------------

interface EncouragingVerse {
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

const ENCOURAGING_VERSES: EncouragingVerse[] = [
  {
    reference: 'Isaiah 41:10',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 41, verse: 10,
    text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.',
    theme: 'Courage', themeSlug: 'courage',
  },
  {
    reference: 'Philippians 4:13',
    book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 13,
    text: 'I can do all things through Christ which strengtheneth me.',
    theme: 'Strength', themeSlug: 'strength',
  },
  {
    reference: 'Joshua 1:9',
    book: 'Joshua', bookSlug: 'joshua', chapter: 1, verse: 9,
    text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.',
    theme: 'Courage', themeSlug: 'courage',
  },
  {
    reference: 'Deuteronomy 31:6',
    book: 'Deuteronomy', bookSlug: 'deuteronomy', chapter: 31, verse: 6,
    text: 'Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.',
    theme: 'Courage', themeSlug: 'courage',
  },
  {
    reference: 'Romans 8:28',
    book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 28,
    text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
    theme: 'God\'s Promises', themeSlug: 'gods-promises',
  },
  {
    reference: 'Psalm 23:1',
    book: 'Psalms', bookSlug: 'psalms', chapter: 23, verse: 1,
    text: 'The LORD is my shepherd; I shall not want.',
    theme: 'Comfort', themeSlug: 'comfort',
  },
  {
    reference: 'Psalm 46:1',
    book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 1,
    text: 'God is our refuge and strength, a very present help in trouble.',
    theme: 'Strength', themeSlug: 'strength',
  },
  {
    reference: 'Isaiah 40:31',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 40, verse: 31,
    text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
    theme: 'Perseverance', themeSlug: 'perseverance',
  },
  {
    reference: '2 Timothy 1:7',
    book: '2 Timothy', bookSlug: '2-timothy', chapter: 1, verse: 7,
    text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.',
    theme: 'Overcoming Fear', themeSlug: 'overcoming-fear',
  },
  {
    reference: 'Jeremiah 29:11',
    book: 'Jeremiah', bookSlug: 'jeremiah', chapter: 29, verse: 11,
    text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.',
    theme: 'Hope', themeSlug: 'hope',
  },
  {
    reference: 'Matthew 11:28',
    book: 'Matthew', bookSlug: 'matthew', chapter: 11, verse: 28,
    text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.',
    theme: 'Comfort', themeSlug: 'comfort',
  },
  {
    reference: 'John 16:33',
    book: 'John', bookSlug: 'john', chapter: 16, verse: 33,
    text: 'These things I have spoken unto you, that in me ye might have peace. In the world ye shall have tribulation: but be of good cheer; I have overcome the world.',
    theme: 'Peace', themeSlug: 'peace',
  },
  {
    reference: 'Romans 15:13',
    book: 'Romans', bookSlug: 'romans', chapter: 15, verse: 13,
    text: 'Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.',
    theme: 'Hope', themeSlug: 'hope',
  },
  {
    reference: '1 Peter 5:7',
    book: '1 Peter', bookSlug: '1-peter', chapter: 5, verse: 7,
    text: 'Casting all your care upon him; for he careth for you.',
    theme: 'Comfort', themeSlug: 'comfort',
  },
  {
    reference: 'Psalm 27:1',
    book: 'Psalms', bookSlug: 'psalms', chapter: 27, verse: 1,
    text: 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?',
    theme: 'Overcoming Fear', themeSlug: 'overcoming-fear',
  },
  {
    reference: 'Psalm 34:18',
    book: 'Psalms', bookSlug: 'psalms', chapter: 34, verse: 18,
    text: 'The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.',
    theme: 'Comfort', themeSlug: 'comfort',
  },
  {
    reference: 'Isaiah 43:2',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 43, verse: 2,
    text: 'When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee: when thou walkest through the fire, thou shalt not be burned; neither shall the flame kindle upon thee.',
    theme: 'God\'s Promises', themeSlug: 'gods-promises',
  },
  {
    reference: '2 Corinthians 12:9',
    book: '2 Corinthians', bookSlug: '2-corinthians', chapter: 12, verse: 9,
    text: 'And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me.',
    theme: 'Strength', themeSlug: 'strength',
  },
  {
    reference: 'Psalm 55:22',
    book: 'Psalms', bookSlug: 'psalms', chapter: 55, verse: 22,
    text: 'Cast thy burden upon the LORD, and he shall sustain thee: he shall never suffer the righteous to be moved.',
    theme: 'Comfort', themeSlug: 'comfort',
  },
  {
    reference: 'Nahum 1:7',
    book: 'Nahum', bookSlug: 'nahum', chapter: 1, verse: 7,
    text: 'The LORD is good, a strong hold in the day of trouble; and he knoweth them that trust in him.',
    theme: 'God\'s Promises', themeSlug: 'gods-promises',
  },
  {
    reference: 'Romans 8:31',
    book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 31,
    text: 'What shall we then say to these things? If God be for us, who can be against us?',
    theme: 'Courage', themeSlug: 'courage',
  },
  {
    reference: 'Psalm 121:1\u20132',
    book: 'Psalms', bookSlug: 'psalms', chapter: 121, verse: 1, endVerse: 2,
    text: 'I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the LORD, which made heaven and earth.',
    theme: 'Hope', themeSlug: 'hope',
  },
  {
    reference: 'Hebrews 13:5\u20136',
    book: 'Hebrews', bookSlug: 'hebrews', chapter: 13, verse: 5, endVerse: 6,
    text: 'Let your conversation be without covetousness; and be content with such things as ye have: for he hath said, I will never leave thee, nor forsake thee. So that we may boldly say, The Lord is my helper, and I will not fear what man shall do unto me.',
    theme: 'God\'s Promises', themeSlug: 'gods-promises',
  },
  {
    reference: 'Isaiah 41:13',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 41, verse: 13,
    text: 'For I the LORD thy God will hold thy right hand, saying unto thee, Fear not; I will help thee.',
    theme: 'Overcoming Fear', themeSlug: 'overcoming-fear',
  },
  {
    reference: 'Psalm 46:10',
    book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 10,
    text: 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.',
    theme: 'Peace', themeSlug: 'peace',
  },
  {
    reference: 'Matthew 6:34',
    book: 'Matthew', bookSlug: 'matthew', chapter: 6, verse: 34,
    text: 'Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof.',
    theme: 'Peace', themeSlug: 'peace',
  },
  {
    reference: 'Philippians 4:6\u20137',
    book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 6, endVerse: 7,
    text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
    theme: 'Peace', themeSlug: 'peace',
  },
  {
    reference: '2 Thessalonians 3:3',
    book: '2 Thessalonians', bookSlug: '2-thessalonians', chapter: 3, verse: 3,
    text: 'But the Lord is faithful, who shall stablish you, and keep you from evil.',
    theme: 'God\'s Promises', themeSlug: 'gods-promises',
  },
  {
    reference: 'Psalm 94:19',
    book: 'Psalms', bookSlug: 'psalms', chapter: 94, verse: 19,
    text: 'In the multitude of my thoughts within me thy comforts delight my soul.',
    theme: 'Comfort', themeSlug: 'comfort',
  },
  {
    reference: 'Isaiah 35:4',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 35, verse: 4,
    text: 'Say to them that are of a fearful heart, Be strong, fear not: behold, your God will come with vengeance, even God with a recompence; he will come and save you.',
    theme: 'Overcoming Fear', themeSlug: 'overcoming-fear',
  },
  {
    reference: 'Psalm 23:4',
    book: 'Psalms', bookSlug: 'psalms', chapter: 23, verse: 4,
    text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.',
    theme: 'Comfort', themeSlug: 'comfort',
  },
  {
    reference: '2 Corinthians 4:16\u201317',
    book: '2 Corinthians', bookSlug: '2-corinthians', chapter: 4, verse: 16, endVerse: 17,
    text: 'For which cause we faint not; but though our outward man perish, yet the inward man is renewed day by day. For our light affliction, which is but for a moment, worketh for us a far more exceeding and eternal weight of glory.',
    theme: 'Perseverance', themeSlug: 'perseverance',
  },
  {
    reference: 'Romans 12:12',
    book: 'Romans', bookSlug: 'romans', chapter: 12, verse: 12,
    text: 'Rejoicing in hope; patient in tribulation; continuing instant in prayer.',
    theme: 'Perseverance', themeSlug: 'perseverance',
  },
  {
    reference: 'Psalm 56:3',
    book: 'Psalms', bookSlug: 'psalms', chapter: 56, verse: 3,
    text: 'What time I am afraid, I will trust in thee.',
    theme: 'Overcoming Fear', themeSlug: 'overcoming-fear',
  },
  {
    reference: 'Psalm 118:6',
    book: 'Psalms', bookSlug: 'psalms', chapter: 118, verse: 6,
    text: 'The LORD is on my side; I will not fear: what can man do unto me?',
    theme: 'Overcoming Fear', themeSlug: 'overcoming-fear',
  },
  {
    reference: 'James 1:2\u20133',
    book: 'James', bookSlug: 'james', chapter: 1, verse: 2, endVerse: 3,
    text: 'My brethren, count it all joy when ye fall into divers temptations; Knowing this, that the trying of your faith worketh patience.',
    theme: 'Perseverance', themeSlug: 'perseverance',
  },
  {
    reference: '1 Chronicles 16:11',
    book: '1 Chronicles', bookSlug: '1-chronicles', chapter: 16, verse: 11,
    text: 'Seek the LORD and his strength, seek his face continually.',
    theme: 'Strength', themeSlug: 'strength',
  },
  {
    reference: 'Psalm 31:24',
    book: 'Psalms', bookSlug: 'psalms', chapter: 31, verse: 24,
    text: 'Be of good courage, and he shall strengthen your heart, all ye that hope in the LORD.',
    theme: 'Hope', themeSlug: 'hope',
  },
  {
    reference: 'Psalm 138:7',
    book: 'Psalms', bookSlug: 'psalms', chapter: 138, verse: 7,
    text: 'Though I walk in the midst of trouble, thou wilt revive me: thou shalt stretch forth thine hand against the wrath of mine enemies, and thy right hand shall save me.',
    theme: 'God\'s Promises', themeSlug: 'gods-promises',
  },
  {
    reference: 'Zephaniah 3:17',
    book: 'Zephaniah', bookSlug: 'zephaniah', chapter: 3, verse: 17,
    text: 'The LORD thy God in the midst of thee is mighty; he will save, he will rejoice over thee with joy; he will rest in his love, he will joy over thee with singing.',
    theme: 'Comfort', themeSlug: 'comfort',
  },
  {
    reference: 'Lamentations 3:22\u201323',
    book: 'Lamentations', bookSlug: 'lamentations', chapter: 3, verse: 22, endVerse: 23,
    text: 'It is of the LORD\u2019s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.',
    theme: 'Hope', themeSlug: 'hope',
  },
  {
    reference: 'Psalm 9:9\u201310',
    book: 'Psalms', bookSlug: 'psalms', chapter: 9, verse: 9, endVerse: 10,
    text: 'The LORD also will be a refuge for the oppressed, a refuge in times of trouble. And they that know thy name will put their trust in thee: for thou, LORD, hast not forsaken them that seek thee.',
    theme: 'God\'s Promises', themeSlug: 'gods-promises',
  },
  {
    reference: 'Psalm 46:5',
    book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 5,
    text: 'God is in the midst of her; she shall not be moved: God shall help her, and that right early.',
    theme: 'Strength', themeSlug: 'strength',
  },
  {
    reference: 'Isaiah 54:17',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 54, verse: 17,
    text: 'No weapon that is formed against thee shall prosper; and every tongue that shall rise against thee in judgment thou shalt condemn. This is the heritage of the servants of the LORD, and their righteousness is of me, saith the LORD.',
    theme: 'God\'s Promises', themeSlug: 'gods-promises',
  },
  {
    reference: 'Psalm 73:26',
    book: 'Psalms', bookSlug: 'psalms', chapter: 73, verse: 26,
    text: 'My flesh and my heart faileth: but God is the strength of my heart, and my portion for ever.',
    theme: 'Strength', themeSlug: 'strength',
  },
  {
    reference: 'Romans 8:38\u201339',
    book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 38, endVerse: 39,
    text: 'For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.',
    theme: 'God\'s Promises', themeSlug: 'gods-promises',
  },
  {
    reference: 'Deuteronomy 31:8',
    book: 'Deuteronomy', bookSlug: 'deuteronomy', chapter: 31, verse: 8,
    text: 'And the LORD, he it is that doth go before thee; he will be with thee, he will not fail thee, neither forsake thee: fear not, neither be dismayed.',
    theme: 'Courage', themeSlug: 'courage',
  },
  {
    reference: 'Psalm 147:3',
    book: 'Psalms', bookSlug: 'psalms', chapter: 147, verse: 3,
    text: 'He healeth the broken in heart, and bindeth up their wounds.',
    theme: 'Comfort', themeSlug: 'comfort',
  },
  {
    reference: 'Isaiah 40:29',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 40, verse: 29,
    text: 'He giveth power to the faint; and to them that have no might he increaseth strength.',
    theme: 'Strength', themeSlug: 'strength',
  },
  {
    reference: 'John 14:27',
    book: 'John', bookSlug: 'john', chapter: 14, verse: 27,
    text: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.',
    theme: 'Peace', themeSlug: 'peace',
  },
];

// OT book slugs for testament filtering
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

function verseUrl(v: EncouragingVerse): string {
  return `/verses/${v.bookSlug}/${v.chapter}/${v.verse}`;
}

/** Collect unique themes for the category filter */
function getUniqueThemes(): string[] {
  const seen = new Set<string>();
  for (const v of ENCOURAGING_VERSES) {
    seen.add(v.theme);
  }
  return Array.from(seen);
}

/** Count unique books */
function getUniqueBooks(): number {
  const seen = new Set<string>();
  for (const v of ENCOURAGING_VERSES) {
    seen.add(v.bookSlug);
  }
  return seen.size;
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Encouraging Bible Verses -- 50 Scriptures for Comfort, Hope & Strength in Hard Times | Full KJV Text With Study Links',
  description:
    'Find 50 encouraging Bible verses in the King James Version for comfort, hope, strength, and perseverance. From Isaiah 41:10 to John 14:27, discover God\'s promises for hard times with full KJV text, themes, and verse study links.',
  keywords: [
    'encouraging Bible verses', 'encouraging scripture', 'comforting Bible passages',
    'verses for hard times', 'Bible verses about hope', 'Bible verses about strength',
    'Bible verses about comfort', 'God\'s promises Bible verses', 'KJV encouraging verses',
    'Bible verses for encouragement', 'scriptures for difficult times',
    'Bible verses about perseverance', 'Bible verses about peace', 'overcoming fear Bible verses',
  ],
  openGraph: {
    title: 'Encouraging Bible Verses | 50 Scriptures for Comfort, Hope & Strength (KJV)',
    description: '50 encouraging Bible verses from the King James Version for comfort, hope, strength, and peace during hard times.',
    url: '/encouraging-bible-verses',
    type: 'website',
  },
  alternates: { canonical: '/encouraging-bible-verses' },
};

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function EncouragingBibleVersesPage() {
  const themes = getUniqueThemes();
  const booksCount = getUniqueBooks();
  const otVerses = ENCOURAGING_VERSES.filter(v => OT_SLUGS.includes(v.bookSlug));
  const ntVerses = ENCOURAGING_VERSES.filter(v => !OT_SLUGS.includes(v.bookSlug));

  // --- Structured Data ---

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Encouraging Bible Verses',
    description: metadata.description,
    url: 'https://biblemaximum.com/encouraging-bible-verses',
    numberOfItems: ENCOURAGING_VERSES.length,
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
      { '@type': 'ListItem', position: 3, name: 'Encouraging Bible Verses' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the most encouraging Bible verses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The most encouraging Bible verses include Isaiah 41:10 ("Fear thou not; for I am with thee"), Philippians 4:13 ("I can do all things through Christ which strengtheneth me"), Joshua 1:9 ("Be strong and of a good courage"), Romans 8:28 ("All things work together for good"), and Psalm 46:1 ("God is our refuge and strength, a very present help in trouble"). These verses remind believers that God is present, faithful, and sufficient in every circumstance.',
        },
      },
      {
        '@type': 'Question',
        name: 'What Bible verse is best for hard times?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Isaiah 41:10 is one of the best Bible verses for hard times: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness." Other verses frequently turned to during trials include Psalm 23:4, 2 Corinthians 4:16-17, Romans 8:28, and Matthew 11:28, each offering assurance of God\'s presence and provision through suffering.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does the Bible say about encouragement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Bible presents encouragement as both a command and a spiritual gift. Romans 12:8 lists encouragement (exhortation) among the gifts of the Spirit. Hebrews 3:13 instructs believers to "exhort one another daily." The Psalms are filled with passages where David encourages himself in the Lord (1 Samuel 30:6). Throughout Scripture, God repeatedly tells His people to "fear not" and "be of good courage," grounding encouragement in His unchanging character and promises.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where in the Bible does it say do not be discouraged?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The command not to be discouraged appears throughout Scripture. Deuteronomy 31:8 says, "Fear not, neither be dismayed." Joshua 1:9 commands, "Be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest." Isaiah 41:10 declares, "Be not dismayed; for I am thy God." 2 Chronicles 20:15 adds, "Be not afraid nor dismayed by reason of this great multitude; for the battle is not yours, but God\'s." The consistent message is that discouragement is overcome by trusting in God\'s presence and power.',
        },
      },
      {
        '@type': 'Question',
        name: 'What Psalm is for encouragement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Several Psalms are especially known for encouragement. Psalm 23 ("The LORD is my shepherd") is perhaps the most beloved psalm of comfort. Psalm 27 declares confidence in God as "my light and my salvation." Psalm 46 proclaims God as "our refuge and strength, a very present help in trouble." Psalm 121 lifts the eyes to the Lord as the source of all help. Psalm 34:18 promises that "the LORD is nigh unto them that are of a broken heart." The book of Psalms as a whole is the most encouraging book of the Bible, covering every human emotion and consistently pointing back to God\'s faithfulness.',
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={collectionSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      <Breadcrumb items={[{ label: 'Bible Quotes', href: '/bible-quotes' }, { label: 'Encouraging Bible Verses' }]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mt-6 mb-8">
              <div className="relative h-48 md:h-56 bg-gradient-to-r from-amber-800 to-amber-900">
                <Image
                  src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png"
                  alt="Encouraging Bible Verses"
                  fill
                  className="object-cover opacity-25"
                  priority
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                    Encouraging Bible Verses
                  </h1>
                  <p className="text-amber-100 max-w-2xl mb-4">
                    50 scriptures of comfort, hope, and strength from the King James
                    Bible -- God&apos;s promises for hard times, grief, anxiety, and every
                    season of trial.
                  </p>
                  <Link
                    href="/bible-quizzes"
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md w-fit"
                  >
                    Test Your Knowledge -- Take a Quiz
                  </Link>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-4 divide-x divide-grace border-b border-grace">
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">50</p>
                  <p className="text-sm text-primary-dark/70">Verses</p>
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
                  <p className="text-2xl font-bold text-blue-600">{booksCount}</p>
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
              Why We Need Encouraging Bible Verses
            </h2>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              Every believer faces seasons of trial, grief, and anxiety when the weight
              of the world feels overwhelming. In those moments, encouraging Bible
              verses become an anchor for the soul. Christians have turned to
              comforting Bible passages for centuries -- not as mere motivational
              slogans, but as the living words of a God who promises to be present in
              every hardship. When we open the Scriptures in search of hope, we find a
              God who speaks directly to our fear, our weariness, and our doubt.
            </p>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              The book of Psalms stands as the most encouraging book in the entire
              Bible. David and the other psalmists pour out raw emotion -- despair,
              loneliness, anger, grief -- and yet consistently return to declarations
              of trust in God&apos;s faithfulness. Psalm 34:18 assures us that the Lord
              is near to the brokenhearted. Psalm 46:1 proclaims Him a very present
              help in trouble. These are not empty words; they are the tested
              testimonies of men and women who walked through fire and flood and found
              God sufficient. The prophets echo this encouragement: Isaiah&apos;s
              repeated command to &ldquo;fear not&rdquo; (Isaiah 41:10, 13; 43:2) and
              Jeremiah&apos;s promise of an expected end (Jeremiah 29:11) have carried
              God&apos;s people through exile, persecution, and loss.
            </p>
            <p className="text-primary-dark/80 leading-relaxed">
              Scripture also teaches that encouragement is itself a spiritual gift.
              Romans 12:8 lists exhortation among the gifts given by the Holy Spirit
              for the building up of the church. God intends for His Word to be shared
              -- spoken aloud, written in letters, memorized and recalled in the dark
              hours. The 50 verses for hard times gathered below cover the core themes
              of biblical encouragement: comfort in suffering, hope for the future,
              strength in weakness, perseverance through trials, God&apos;s unbreakable
              promises, overcoming fear, and the peace that surpasses all
              understanding. Each verse is presented in the King James Version and
              links to a full study page with cross-references, commentary, and
              original language insights.
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
                href={`#theme-${theme.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`}
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
            {ENCOURAGING_VERSES.map((verse, idx) => (
              <li
                key={verse.reference}
                id={`theme-${verse.theme.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`}
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
                        Chapter {verse.chapter}
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
                        Chapter Quiz
                      </Link>
                      <span className="text-primary-dark/30">|</span>
                      <Link
                        href={`/bible-quotes/${verse.themeSlug}`}
                        className="text-blue-600 hover:underline"
                      >
                        Bible Quotes About {verse.theme}
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
              How Well Do You Know These Encouraging Verses? Take a Quiz.
            </h2>
            <p className="text-blue-100 mb-4 max-w-2xl">
              Put your Bible knowledge to the test with chapter quizzes from Psalms, Isaiah, Romans, and more. 15 questions per quiz with instant scoring and verse-by-verse explanations.
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
              Encouraging Verses by Testament
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
                <h3 className="font-bold text-scripture mb-1">What are the most encouraging Bible verses?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  The most encouraging Bible verses include Isaiah 41:10 (&ldquo;Fear
                  thou not; for I am with thee&rdquo;), Philippians 4:13 (&ldquo;I can
                  do all things through Christ which strengtheneth me&rdquo;), Joshua
                  1:9 (&ldquo;Be strong and of a good courage&rdquo;), Romans 8:28
                  (&ldquo;All things work together for good to them that love
                  God&rdquo;), and Psalm 46:1 (&ldquo;God is our refuge and strength, a
                  very present help in trouble&rdquo;). These passages remind believers
                  that God is present, faithful, and sufficient in every circumstance.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What Bible verse is best for hard times?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  Isaiah 41:10 is widely regarded as one of the best Bible verses for
                  hard times: &ldquo;Fear thou not; for I am with thee: be not dismayed;
                  for I am thy God: I will strengthen thee; yea, I will help thee; yea,
                  I will uphold thee with the right hand of my righteousness.&rdquo;
                  Other verses frequently turned to during trials include Psalm 23:4,
                  2 Corinthians 4:16&ndash;17, Romans 8:28, and Matthew 11:28, each
                  offering assurance of God&apos;s presence and provision through suffering.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What does the Bible say about encouragement?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  The Bible presents encouragement as both a command and a spiritual
                  gift. Romans 12:8 lists exhortation (encouragement) among the gifts
                  of the Holy Spirit. Hebrews 3:13 instructs believers to &ldquo;exhort
                  one another daily.&rdquo; David encouraged himself in the Lord
                  (1 Samuel 30:6), and the Psalms model honest lament that always
                  returns to trust. Throughout Scripture, God repeatedly tells His
                  people to &ldquo;fear not&rdquo; and &ldquo;be of good courage,&rdquo;
                  grounding encouragement in His unchanging character and promises.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">Where in the Bible does it say do not be discouraged?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  The command not to be discouraged appears throughout Scripture.
                  Deuteronomy 31:8 says, &ldquo;Fear not, neither be dismayed.&rdquo;
                  Joshua 1:9 commands, &ldquo;Be not afraid, neither be thou dismayed:
                  for the LORD thy God is with thee whithersoever thou goest.&rdquo;
                  Isaiah 41:10 declares, &ldquo;Be not dismayed; for I am thy
                  God.&rdquo; 2 Chronicles 20:15 adds, &ldquo;Be not afraid nor
                  dismayed by reason of this great multitude; for the battle is not
                  yours, but God&apos;s.&rdquo; The consistent message is that
                  discouragement is overcome by trusting in God&apos;s presence and power.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What Psalm is for encouragement?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  Several Psalms are especially known for encouragement. Psalm 23
                  (&ldquo;The LORD is my shepherd&rdquo;) is perhaps the most beloved
                  psalm of comfort. Psalm 27 declares confidence in God as &ldquo;my
                  light and my salvation.&rdquo; Psalm 46 proclaims God as &ldquo;our
                  refuge and strength, a very present help in trouble.&rdquo; Psalm 121
                  lifts the eyes to the Lord as the source of all help. Psalm 34:18
                  promises that &ldquo;the LORD is nigh unto them that are of a broken
                  heart.&rdquo; The book of Psalms as a whole is the most encouraging
                  book in the Bible, covering every human emotion and consistently
                  pointing back to God&apos;s faithfulness.
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
                href="/bible-quotes"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Quotes Hub</span>
              </Link>
              <Link
                href="/popular-bible-verses"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Popular Bible Verses</span>
              </Link>
              <Link
                href="/famous-bible-verses"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Famous Bible Verses</span>
              </Link>
              <Link
                href="/verse-of-the-day"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Verse of the Day</span>
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
                href="/cross-references"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Cross References</span>
              </Link>
              <Link
                href="/topics"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Topics</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
