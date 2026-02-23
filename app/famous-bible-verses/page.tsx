import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

// ---------------------------------------------------------------------------
// 50 Most Famous Bible Verses (KJV)
// ---------------------------------------------------------------------------

interface FamousVerse {
  reference: string;
  book: string;
  bookSlug: string;
  chapter: number;
  verse: number;
  endVerse?: number;
  text: string;
  theme: string;
}

const FAMOUS_VERSES: FamousVerse[] = [
  {
    reference: 'John 3:16',
    book: 'John', bookSlug: 'john', chapter: 3, verse: 16,
    text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
    theme: 'Salvation',
  },
  {
    reference: 'Jeremiah 29:11',
    book: 'Jeremiah', bookSlug: 'jeremiah', chapter: 29, verse: 11,
    text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.',
    theme: 'Hope',
  },
  {
    reference: 'Philippians 4:13',
    book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 13,
    text: 'I can do all things through Christ which strengtheneth me.',
    theme: 'Strength',
  },
  {
    reference: 'Romans 8:28',
    book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 28,
    text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
    theme: 'Providence',
  },
  {
    reference: 'Proverbs 3:5\u20136',
    book: 'Proverbs', bookSlug: 'proverbs', chapter: 3, verse: 5, endVerse: 6,
    text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
    theme: 'Trust',
  },
  {
    reference: 'Psalm 23:1',
    book: 'Psalms', bookSlug: 'psalms', chapter: 23, verse: 1,
    text: 'The LORD is my shepherd; I shall not want.',
    theme: 'Comfort',
  },
  {
    reference: 'Isaiah 41:10',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 41, verse: 10,
    text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.',
    theme: 'Courage',
  },
  {
    reference: 'Matthew 6:33',
    book: 'Matthew', bookSlug: 'matthew', chapter: 6, verse: 33,
    text: 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.',
    theme: 'Priorities',
  },
  {
    reference: 'Galatians 5:22\u201323',
    book: 'Galatians', bookSlug: 'galatians', chapter: 5, verse: 22, endVerse: 23,
    text: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law.',
    theme: 'Spiritual Fruit',
  },
  {
    reference: 'Ephesians 6:10\u201318',
    book: 'Ephesians', bookSlug: 'ephesians', chapter: 6, verse: 10, endVerse: 18,
    text: 'Finally, my brethren, be strong in the Lord, and in the power of his might. Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.',
    theme: 'Spiritual Warfare',
  },
  {
    reference: 'Romans 12:2',
    book: 'Romans', bookSlug: 'romans', chapter: 12, verse: 2,
    text: 'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.',
    theme: 'Transformation',
  },
  {
    reference: 'Psalm 46:1',
    book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 1,
    text: 'God is our refuge and strength, a very present help in trouble.',
    theme: 'Refuge',
  },
  {
    reference: 'Joshua 1:9',
    book: 'Joshua', bookSlug: 'joshua', chapter: 1, verse: 9,
    text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.',
    theme: 'Courage',
  },
  {
    reference: 'Philippians 4:6\u20137',
    book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 6, endVerse: 7,
    text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
    theme: 'Peace',
  },
  {
    reference: 'Isaiah 40:31',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 40, verse: 31,
    text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
    theme: 'Renewal',
  },
  {
    reference: '2 Timothy 1:7',
    book: '2 Timothy', bookSlug: '2-timothy', chapter: 1, verse: 7,
    text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.',
    theme: 'Power',
  },
  {
    reference: 'Psalm 119:105',
    book: 'Psalms', bookSlug: 'psalms', chapter: 119, verse: 105,
    text: 'Thy word is a lamp unto my feet, and a light unto my path.',
    theme: 'Guidance',
  },
  {
    reference: 'Proverbs 22:6',
    book: 'Proverbs', bookSlug: 'proverbs', chapter: 22, verse: 6,
    text: 'Train up a child in the way he should go: and when he is old, he will not depart from it.',
    theme: 'Parenting',
  },
  {
    reference: 'Matthew 28:19\u201320',
    book: 'Matthew', bookSlug: 'matthew', chapter: 28, verse: 19, endVerse: 20,
    text: 'Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.',
    theme: 'Great Commission',
  },
  {
    reference: 'John 14:6',
    book: 'John', bookSlug: 'john', chapter: 14, verse: 6,
    text: 'Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.',
    theme: 'Truth',
  },
  {
    reference: 'Romans 5:8',
    book: 'Romans', bookSlug: 'romans', chapter: 5, verse: 8,
    text: 'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.',
    theme: 'Love',
  },
  {
    reference: '1 Corinthians 13:4\u20137',
    book: '1 Corinthians', bookSlug: '1-corinthians', chapter: 13, verse: 4, endVerse: 7,
    text: 'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil; Rejoiceth not in iniquity, but rejoiceth in the truth; Beareth all things, believeth all things, hopeth all things, endureth all things.',
    theme: 'Love',
  },
  {
    reference: 'Hebrews 11:1',
    book: 'Hebrews', bookSlug: 'hebrews', chapter: 11, verse: 1,
    text: 'Now faith is the substance of things hoped for, the evidence of things not seen.',
    theme: 'Faith',
  },
  {
    reference: 'James 1:2\u20133',
    book: 'James', bookSlug: 'james', chapter: 1, verse: 2, endVerse: 3,
    text: 'My brethren, count it all joy when ye fall into divers temptations; Knowing this, that the trying of your faith worketh patience.',
    theme: 'Trials',
  },
  {
    reference: 'Matthew 11:28',
    book: 'Matthew', bookSlug: 'matthew', chapter: 11, verse: 28,
    text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.',
    theme: 'Rest',
  },
  {
    reference: 'John 1:1',
    book: 'John', bookSlug: 'john', chapter: 1, verse: 1,
    text: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
    theme: 'Deity of Christ',
  },
  {
    reference: 'Genesis 1:1',
    book: 'Genesis', bookSlug: 'genesis', chapter: 1, verse: 1,
    text: 'In the beginning God created the heaven and the earth.',
    theme: 'Creation',
  },
  {
    reference: 'Psalm 27:1',
    book: 'Psalms', bookSlug: 'psalms', chapter: 27, verse: 1,
    text: 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?',
    theme: 'Fearlessness',
  },
  {
    reference: 'Proverbs 18:10',
    book: 'Proverbs', bookSlug: 'proverbs', chapter: 18, verse: 10,
    text: 'The name of the LORD is a strong tower: the righteous runneth into it, and is safe.',
    theme: 'Protection',
  },
  {
    reference: 'Isaiah 53:5',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 53, verse: 5,
    text: 'But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.',
    theme: 'Atonement',
  },
  {
    reference: 'Romans 6:23',
    book: 'Romans', bookSlug: 'romans', chapter: 6, verse: 23,
    text: 'For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.',
    theme: 'Salvation',
  },
  {
    reference: 'John 8:32',
    book: 'John', bookSlug: 'john', chapter: 8, verse: 32,
    text: 'And ye shall know the truth, and the truth shall make you free.',
    theme: 'Freedom',
  },
  {
    reference: 'Matthew 5:16',
    book: 'Matthew', bookSlug: 'matthew', chapter: 5, verse: 16,
    text: 'Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.',
    theme: 'Witness',
  },
  {
    reference: 'Psalm 37:4',
    book: 'Psalms', bookSlug: 'psalms', chapter: 37, verse: 4,
    text: 'Delight thyself also in the LORD; and he shall give thee the desires of thine heart.',
    theme: 'Desire',
  },
  {
    reference: 'Colossians 3:23',
    book: 'Colossians', bookSlug: 'colossians', chapter: 3, verse: 23,
    text: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men.',
    theme: 'Work',
  },
  {
    reference: '1 Peter 5:7',
    book: '1 Peter', bookSlug: '1-peter', chapter: 5, verse: 7,
    text: 'Casting all your care upon him; for he careth for you.',
    theme: 'Anxiety',
  },
  {
    reference: 'Psalm 139:14',
    book: 'Psalms', bookSlug: 'psalms', chapter: 139, verse: 14,
    text: 'I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.',
    theme: 'Identity',
  },
  {
    reference: 'Proverbs 16:3',
    book: 'Proverbs', bookSlug: 'proverbs', chapter: 16, verse: 3,
    text: 'Commit thy works unto the LORD, and thy thoughts shall be established.',
    theme: 'Commitment',
  },
  {
    reference: 'Micah 6:8',
    book: 'Micah', bookSlug: 'micah', chapter: 6, verse: 8,
    text: 'He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?',
    theme: 'Righteousness',
  },
  {
    reference: 'Lamentations 3:22\u201323',
    book: 'Lamentations', bookSlug: 'lamentations', chapter: 3, verse: 22, endVerse: 23,
    text: 'It is of the LORD\u2019s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.',
    theme: 'Faithfulness',
  },
  {
    reference: '2 Corinthians 5:17',
    book: '2 Corinthians', bookSlug: '2-corinthians', chapter: 5, verse: 17,
    text: 'Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.',
    theme: 'New Life',
  },
  {
    reference: 'Ephesians 2:8\u20139',
    book: 'Ephesians', bookSlug: 'ephesians', chapter: 2, verse: 8, endVerse: 9,
    text: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.',
    theme: 'Grace',
  },
  {
    reference: 'John 16:33',
    book: 'John', bookSlug: 'john', chapter: 16, verse: 33,
    text: 'These things I have spoken unto you, that in me ye might have peace. In the world ye shall have tribulation: but be of good cheer; I have overcome the world.',
    theme: 'Overcoming',
  },
  {
    reference: 'Romans 10:9',
    book: 'Romans', bookSlug: 'romans', chapter: 10, verse: 9,
    text: 'That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.',
    theme: 'Confession',
  },
  {
    reference: 'Psalm 91:1',
    book: 'Psalms', bookSlug: 'psalms', chapter: 91, verse: 1,
    text: 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.',
    theme: 'Dwelling',
  },
  {
    reference: 'Matthew 6:34',
    book: 'Matthew', bookSlug: 'matthew', chapter: 6, verse: 34,
    text: 'Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof.',
    theme: 'Worry',
  },
  {
    reference: 'Isaiah 26:3',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 26, verse: 3,
    text: 'Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.',
    theme: 'Peace',
  },
  {
    reference: 'Proverbs 4:23',
    book: 'Proverbs', bookSlug: 'proverbs', chapter: 4, verse: 23,
    text: 'Keep thy heart with all diligence; for out of it are the issues of life.',
    theme: 'Heart',
  },
  {
    reference: '1 John 4:19',
    book: '1 John', bookSlug: '1-john', chapter: 4, verse: 19,
    text: 'We love him, because he first loved us.',
    theme: 'Love',
  },
  {
    reference: 'Revelation 21:4',
    book: 'Revelation', bookSlug: 'revelation', chapter: 21, verse: 4,
    text: 'And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.',
    theme: 'Eternity',
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function verseUrl(v: FamousVerse): string {
  return `/verses/${v.bookSlug}/${v.chapter}/${v.verse}`;
}

/** Collect unique themes for the category filter */
function getUniqueThemes(): string[] {
  const seen = new Set<string>();
  for (const v of FAMOUS_VERSES) {
    seen.add(v.theme);
  }
  return Array.from(seen);
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Famous Bible Verses | 50 Most Popular & Quoted Scriptures (KJV) | Bible Maximum',
  description:
    'Discover the 50 most famous Bible verses in the King James Version. From John 3:16 to Revelation 21:4, explore the most popular, well-known, and frequently quoted scriptures with full KJV text, themes, and study links.',
  keywords: [
    'famous Bible verses', 'popular Bible verses', 'most quoted Bible verses',
    'well-known Bible verses', 'best Bible verses', 'top Bible verses',
    'Bible verses about love', 'Bible verses about faith', 'Bible verses about strength',
    'KJV Bible verses', 'inspirational Bible verses', 'best known scriptures',
    'most popular scriptures', 'commonly quoted Bible passages',
  ],
  openGraph: {
    title: 'Famous Bible Verses | 50 Most Popular Scriptures (KJV)',
    description: 'The 50 most famous, popular, and frequently quoted Bible verses with full KJV text.',
    url: '/famous-bible-verses',
    type: 'website',
  },
  alternates: { canonical: '/famous-bible-verses' },
};

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function FamousBibleVersesPage() {
  const themes = getUniqueThemes();
  const otVerses = FAMOUS_VERSES.filter(v =>
    ['genesis', 'joshua', 'psalms', 'proverbs', 'isaiah', 'jeremiah', 'lamentations', 'micah'].includes(v.bookSlug)
  );
  const ntVerses = FAMOUS_VERSES.filter(v => !otVerses.includes(v));

  // --- Structured Data ---

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Famous Bible Verses',
    description: metadata.description,
    url: 'https://biblemaximum.com/famous-bible-verses',
    numberOfItems: FAMOUS_VERSES.length,
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
      { '@type': 'ListItem', position: 2, name: 'Famous Bible Verses' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the most famous Bible verses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The most famous Bible verses include John 3:16 ("For God so loved the world..."), Jeremiah 29:11 ("For I know the thoughts that I think toward you..."), Philippians 4:13 ("I can do all things through Christ..."), Romans 8:28 ("And we know that all things work together for good..."), and Proverbs 3:5\u20136 ("Trust in the LORD with all thine heart..."). These verses are among the most memorized, quoted, and referenced scriptures across all Christian traditions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the most quoted Bible verse?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'John 3:16 is widely considered the most quoted Bible verse in the world. It reads: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." This single verse summarizes the core message of the Christian gospel and appears on signs, banners, and in sermons across the globe.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many verses are in the Bible?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The King James Version of the Bible contains 31,102 verses across 66 books. The Old Testament has 23,145 verses and the New Testament has 7,957 verses. Among these, certain passages have become universally recognized and are quoted far more frequently than others.',
        },
      },
      {
        '@type': 'Question',
        name: 'What Bible version are these famous verses from?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All 50 famous Bible verses listed on this page are from the King James Version (KJV), first published in 1611. The KJV remains one of the most widely read and memorized English Bible translations, known for its literary beauty and enduring influence on the English language.',
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={collectionSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      <Breadcrumb items={[{ label: 'Famous Bible Verses' }]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mt-6 mb-8">
              <div className="relative h-48 md:h-56 bg-gradient-to-r from-amber-800 to-amber-900">
                <Image
                  src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png"
                  alt="Famous Bible Verses"
                  fill
                  className="object-cover opacity-25"
                  priority
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                    Famous Bible Verses
                  </h1>
                  <p className="text-amber-100 max-w-2xl">
                    The 50 most well-known, frequently quoted, and beloved scriptures from
                    the King James Bible -- verses that have shaped faith, inspired
                    generations, and proclaimed the gospel across the world.
                  </p>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 divide-x divide-grace border-b border-grace">
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">50</p>
                  <p className="text-sm text-primary-dark/70">Famous Verses</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{themes.length}</p>
                  <p className="text-sm text-primary-dark/70">Themes</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">KJV</p>
                  <p className="text-sm text-primary-dark/70">Translation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Paragraph (SEO) */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-3">
              Why These Verses Matter
            </h2>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              Out of more than 31,000 verses in the Bible, a handful stand apart as the
              most recognized passages in all of Scripture. These famous Bible verses
              capture the heart of God&apos;s message to humanity -- His love, His
              promises, and His plan of salvation through Jesus Christ. Whether you are
              memorizing Scripture for the first time or revisiting beloved passages,
              these 50 verses offer comfort in trial, strength in weakness, hope in
              despair, and guidance for daily living.
            </p>
            <p className="text-primary-dark/80 leading-relaxed">
              Each verse below is presented in the King James Version (KJV) and links
              to a full verse study page where you can explore cross-references,
              commentary, original language words, and related topics.
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
            {FAMOUS_VERSES.map((verse, idx) => (
              <li
                key={verse.reference}
                id={`theme-${verse.theme.toLowerCase().replace(/\s+/g, '-')}`}
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
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </main>

        {/* Old Testament vs New Testament Breakdown */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">
              Famous Verses by Testament
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
                <h3 className="font-bold text-scripture mb-1">What are the most famous Bible verses?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  The most famous Bible verses include John 3:16, Jeremiah 29:11,
                  Philippians 4:13, Romans 8:28, and Proverbs 3:5&ndash;6. These passages
                  are among the most memorized, preached, and shared scriptures in
                  Christian history. They address the foundational themes of the
                  faith -- salvation, hope, strength, providence, and trust in God.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What is the most quoted Bible verse?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  John 3:16 is widely recognized as the most quoted Bible verse in the
                  world: &ldquo;For God so loved the world, that he gave his only begotten
                  Son, that whosoever believeth in him should not perish, but have
                  everlasting life.&rdquo; This single verse encapsulates the gospel
                  message and is seen on signs, banners, and in sermons across every
                  continent.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">How many verses are in the Bible?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  The King James Version contains 31,102 verses across 66 books. The
                  Old Testament holds 23,145 verses and the New Testament holds 7,957
                  verses. Among these thousands, a relatively small number have become
                  universally recognized and frequently quoted.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What Bible version are these famous verses from?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  All 50 verses on this page are presented in the King James Version
                  (KJV), first published in 1611. The KJV remains one of the most widely
                  read and memorized English Bible translations, prized for its literary
                  beauty and enduring influence on the English language.
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
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Quizzes</span>
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
              <Link
                href="/people"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible People</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
