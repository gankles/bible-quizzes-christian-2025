import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

// ---------------------------------------------------------------------------
// 50 Inspirational Bible Verses (KJV)
// ---------------------------------------------------------------------------

interface InspirationalVerse {
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

const INSPIRATIONAL_VERSES: InspirationalVerse[] = [
  {
    reference: 'Philippians 4:13',
    book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 13,
    text: 'I can do all things through Christ which strengtheneth me.',
    theme: 'Strength', themeSlug: 'strength',
  },
  {
    reference: 'Isaiah 40:31',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 40, verse: 31,
    text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
    theme: 'Renewal', themeSlug: 'strength',
  },
  {
    reference: 'Jeremiah 29:11',
    book: 'Jeremiah', bookSlug: 'jeremiah', chapter: 29, verse: 11,
    text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.',
    theme: 'Hope', themeSlug: 'hope',
  },
  {
    reference: 'Romans 8:28',
    book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 28,
    text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
    theme: 'Providence', themeSlug: 'gods-promises',
  },
  {
    reference: 'Joshua 1:9',
    book: 'Joshua', bookSlug: 'joshua', chapter: 1, verse: 9,
    text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.',
    theme: 'Courage', themeSlug: 'courage',
  },
  {
    reference: 'Proverbs 3:5\u20136',
    book: 'Proverbs', bookSlug: 'proverbs', chapter: 3, verse: 5, endVerse: 6,
    text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
    theme: 'Trust', themeSlug: 'trust',
  },
  {
    reference: 'Isaiah 41:10',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 41, verse: 10,
    text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.',
    theme: 'Courage', themeSlug: 'courage',
  },
  {
    reference: 'Matthew 19:26',
    book: 'Matthew', bookSlug: 'matthew', chapter: 19, verse: 26,
    text: 'But Jesus beheld them, and said unto them, With men this is impossible; but with God all things are possible.',
    theme: 'Faith', themeSlug: 'faith',
  },
  {
    reference: '2 Timothy 1:7',
    book: '2 Timothy', bookSlug: '2-timothy', chapter: 1, verse: 7,
    text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.',
    theme: 'Power', themeSlug: 'strength',
  },
  {
    reference: 'Philippians 4:8',
    book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 8,
    text: 'Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things.',
    theme: 'Thought Life', themeSlug: 'wisdom',
  },
  {
    reference: 'Psalm 37:4',
    book: 'Psalms', bookSlug: 'psalms', chapter: 37, verse: 4,
    text: 'Delight thyself also in the LORD; and he shall give thee the desires of thine heart.',
    theme: 'Desire', themeSlug: 'faith',
  },
  {
    reference: 'Romans 12:2',
    book: 'Romans', bookSlug: 'romans', chapter: 12, verse: 2,
    text: 'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.',
    theme: 'Transformation', themeSlug: 'faith',
  },
  {
    reference: 'Matthew 6:33',
    book: 'Matthew', bookSlug: 'matthew', chapter: 6, verse: 33,
    text: 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.',
    theme: 'Priorities', themeSlug: 'faith',
  },
  {
    reference: 'Hebrews 12:1\u20132',
    book: 'Hebrews', bookSlug: 'hebrews', chapter: 12, verse: 1, endVerse: 2,
    text: 'Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight, and the sin which doth so easily beset us, and let us run with patience the race that is set before us, Looking unto Jesus the author and finisher of our faith; who for the joy that was set before him endured the cross, despising the shame, and is set down at the right hand of the throne of God.',
    theme: 'Perseverance', themeSlug: 'perseverance',
  },
  {
    reference: 'Galatians 5:22\u201323',
    book: 'Galatians', bookSlug: 'galatians', chapter: 5, verse: 22, endVerse: 23,
    text: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law.',
    theme: 'Spiritual Fruit', themeSlug: 'holy-spirit',
  },
  {
    reference: '1 Corinthians 10:13',
    book: '1 Corinthians', bookSlug: '1-corinthians', chapter: 10, verse: 13,
    text: 'There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape, that ye may be able to bear it.',
    theme: 'Faithfulness', themeSlug: 'perseverance',
  },
  {
    reference: 'Colossians 3:23',
    book: 'Colossians', bookSlug: 'colossians', chapter: 3, verse: 23,
    text: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men.',
    theme: 'Purpose', themeSlug: 'faith',
  },
  {
    reference: 'Philippians 1:6',
    book: 'Philippians', bookSlug: 'philippians', chapter: 1, verse: 6,
    text: 'Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ.',
    theme: 'Assurance', themeSlug: 'gods-promises',
  },
  {
    reference: 'Ephesians 3:20',
    book: 'Ephesians', bookSlug: 'ephesians', chapter: 3, verse: 20,
    text: 'Now unto him that is able to do exceeding abundantly above all that we ask or think, according to the power that worketh in us.',
    theme: 'Abundance', themeSlug: 'gods-promises',
  },
  {
    reference: 'Psalm 46:1',
    book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 1,
    text: 'God is our refuge and strength, a very present help in trouble.',
    theme: 'Refuge', themeSlug: 'comfort',
  },
  {
    reference: 'Romans 8:31',
    book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 31,
    text: 'What shall we then say to these things? If God be for us, who can be against us?',
    theme: 'Confidence', themeSlug: 'faith',
  },
  {
    reference: 'Isaiah 43:19',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 43, verse: 19,
    text: 'Behold, I will do a new thing; now it shall spring forth; shall ye not know it? I will even make a way in the wilderness, and rivers in the desert.',
    theme: 'New Beginnings', themeSlug: 'hope',
  },
  {
    reference: 'Habakkuk 2:3',
    book: 'Habakkuk', bookSlug: 'habakkuk', chapter: 2, verse: 3,
    text: 'For the vision is yet for an appointed time, but at the end it shall speak, and not lie: though it tarry, wait for it; because it will surely come, it will not tarry.',
    theme: 'Patience', themeSlug: 'perseverance',
  },
  {
    reference: 'Ecclesiastes 3:1',
    book: 'Ecclesiastes', bookSlug: 'ecclesiastes', chapter: 3, verse: 1,
    text: 'To every thing there is a season, and a time to every purpose under the heaven.',
    theme: 'Seasons', themeSlug: 'wisdom',
  },
  {
    reference: 'Proverbs 16:3',
    book: 'Proverbs', bookSlug: 'proverbs', chapter: 16, verse: 3,
    text: 'Commit thy works unto the LORD, and thy thoughts shall be established.',
    theme: 'Commitment', themeSlug: 'faith',
  },
  {
    reference: 'Mark 10:27',
    book: 'Mark', bookSlug: 'mark', chapter: 10, verse: 27,
    text: 'And Jesus looking upon them saith, With men it is impossible, but not with God: for with God all things are possible.',
    theme: 'Faith', themeSlug: 'faith',
  },
  {
    reference: 'Matthew 5:16',
    book: 'Matthew', bookSlug: 'matthew', chapter: 5, verse: 16,
    text: 'Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.',
    theme: 'Witness', themeSlug: 'evangelism',
  },
  {
    reference: 'John 8:32',
    book: 'John', bookSlug: 'john', chapter: 8, verse: 32,
    text: 'And ye shall know the truth, and the truth shall make you free.',
    theme: 'Freedom', themeSlug: 'freedom',
  },
  {
    reference: '2 Corinthians 5:17',
    book: '2 Corinthians', bookSlug: '2-corinthians', chapter: 5, verse: 17,
    text: 'Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.',
    theme: 'New Life', themeSlug: 'salvation',
  },
  {
    reference: 'Galatians 6:9',
    book: 'Galatians', bookSlug: 'galatians', chapter: 6, verse: 9,
    text: 'And let us not be weary in well doing: for in due season we shall reap, if we faint not.',
    theme: 'Perseverance', themeSlug: 'perseverance',
  },
  {
    reference: 'Romans 15:13',
    book: 'Romans', bookSlug: 'romans', chapter: 15, verse: 13,
    text: 'Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.',
    theme: 'Hope', themeSlug: 'hope',
  },
  {
    reference: 'Psalm 139:14',
    book: 'Psalms', bookSlug: 'psalms', chapter: 139, verse: 14,
    text: 'I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.',
    theme: 'Identity', themeSlug: 'praise',
  },
  {
    reference: 'Micah 6:8',
    book: 'Micah', bookSlug: 'micah', chapter: 6, verse: 8,
    text: 'He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?',
    theme: 'Righteousness', themeSlug: 'righteousness',
  },
  {
    reference: 'Hebrews 11:1',
    book: 'Hebrews', bookSlug: 'hebrews', chapter: 11, verse: 1,
    text: 'Now faith is the substance of things hoped for, the evidence of things not seen.',
    theme: 'Faith', themeSlug: 'faith',
  },
  {
    reference: 'James 1:2\u20133',
    book: 'James', bookSlug: 'james', chapter: 1, verse: 2, endVerse: 3,
    text: 'My brethren, count it all joy when ye fall into divers temptations; Knowing this, that the trying of your faith worketh patience.',
    theme: 'Trials', themeSlug: 'perseverance',
  },
  {
    reference: '1 Peter 2:9',
    book: '1 Peter', bookSlug: '1-peter', chapter: 2, verse: 9,
    text: 'But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light.',
    theme: 'Calling', themeSlug: 'salvation',
  },
  {
    reference: 'Psalm 23:1',
    book: 'Psalms', bookSlug: 'psalms', chapter: 23, verse: 1,
    text: 'The LORD is my shepherd; I shall not want.',
    theme: 'Comfort', themeSlug: 'comfort',
  },
  {
    reference: 'John 3:16',
    book: 'John', bookSlug: 'john', chapter: 3, verse: 16,
    text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
    theme: 'Salvation', themeSlug: 'salvation',
  },
  {
    reference: 'Romans 5:8',
    book: 'Romans', bookSlug: 'romans', chapter: 5, verse: 8,
    text: 'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.',
    theme: 'Love', themeSlug: 'love',
  },
  {
    reference: 'Ephesians 2:8\u20139',
    book: 'Ephesians', bookSlug: 'ephesians', chapter: 2, verse: 8, endVerse: 9,
    text: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.',
    theme: 'Grace', themeSlug: 'grace',
  },
  {
    reference: 'John 10:10',
    book: 'John', bookSlug: 'john', chapter: 10, verse: 10,
    text: 'The thief cometh not, but for to steal, and to kill, and to destroy: I am come that they might have life, and that they might have it more abundantly.',
    theme: 'Abundant Life', themeSlug: 'life',
  },
  {
    reference: 'Acts 1:8',
    book: 'Acts', bookSlug: 'acts', chapter: 1, verse: 8,
    text: 'But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.',
    theme: 'Holy Spirit', themeSlug: 'holy-spirit',
  },
  {
    reference: 'Isaiah 55:8\u20139',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 55, verse: 8, endVerse: 9,
    text: 'For my thoughts are not your thoughts, neither are your ways my ways, saith the LORD. For as the heavens are higher than the earth, so are my ways higher than your ways, and my thoughts than your thoughts.',
    theme: 'Sovereignty', themeSlug: 'trust',
  },
  {
    reference: 'Psalm 121:1\u20132',
    book: 'Psalms', bookSlug: 'psalms', chapter: 121, verse: 1, endVerse: 2,
    text: 'I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the LORD, which made heaven and earth.',
    theme: 'Help', themeSlug: 'comfort',
  },
  {
    reference: 'Deuteronomy 31:6',
    book: 'Deuteronomy', bookSlug: 'deuteronomy', chapter: 31, verse: 6,
    text: 'Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.',
    theme: 'Courage', themeSlug: 'courage',
  },
  {
    reference: 'Lamentations 3:22\u201323',
    book: 'Lamentations', bookSlug: 'lamentations', chapter: 3, verse: 22, endVerse: 23,
    text: 'It is of the LORD\u2019s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.',
    theme: 'Mercy', themeSlug: 'gods-promises',
  },
  {
    reference: 'Psalm 118:24',
    book: 'Psalms', bookSlug: 'psalms', chapter: 118, verse: 24,
    text: 'This is the day which the LORD hath made; we will rejoice and be glad in it.',
    theme: 'Joy', themeSlug: 'joy',
  },
  {
    reference: 'Philippians 2:3\u20134',
    book: 'Philippians', bookSlug: 'philippians', chapter: 2, verse: 3, endVerse: 4,
    text: 'Let nothing be done through strife or vainglory; but in lowliness of mind let each esteem other better than themselves. Look not every man on his own things, but every man also on the things of others.',
    theme: 'Humility', themeSlug: 'humility',
  },
  {
    reference: 'Matthew 28:19\u201320',
    book: 'Matthew', bookSlug: 'matthew', chapter: 28, verse: 19, endVerse: 20,
    text: 'Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.',
    theme: 'Great Commission', themeSlug: 'evangelism',
  },
  {
    reference: 'Revelation 21:4',
    book: 'Revelation', bookSlug: 'revelation', chapter: 21, verse: 4,
    text: 'And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.',
    theme: 'Eternity', themeSlug: 'heaven',
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const OT_SLUGS = ['genesis','exodus','leviticus','numbers','deuteronomy','joshua','judges','ruth','1-samuel','2-samuel','1-kings','2-kings','1-chronicles','2-chronicles','ezra','nehemiah','esther','job','psalms','proverbs','ecclesiastes','song-of-solomon','isaiah','jeremiah','lamentations','ezekiel','daniel','hosea','joel','amos','obadiah','jonah','micah','nahum','habakkuk','zephaniah','haggai','zechariah','malachi'];

function verseUrl(v: InspirationalVerse): string {
  return `/verses/${v.bookSlug}/${v.chapter}/${v.verse}`;
}

function getUniqueThemes(): string[] {
  const seen = new Set<string>();
  for (const v of INSPIRATIONAL_VERSES) {
    seen.add(v.theme);
  }
  return Array.from(seen);
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Inspirational Bible Verses \u2014 50 Motivating Scriptures to Uplift Your Faith, Ignite Your Purpose & Strengthen Your Walk With God (KJV)',
  description:
    'Discover 50 inspirational Bible verses from the King James Version that motivate action, uplift your spirit, and strengthen your faith. From Philippians 4:13 to Revelation 21:4, explore the most powerful and inspiring scriptures with full KJV text, themes, and study links.',
  keywords: [
    'inspirational bible verses', 'inspiring scripture', 'motivational bible passages',
    'uplifting verses', 'bible verses for motivation', 'scriptures that inspire',
    'powerful bible verses', 'faith-building scripture', 'encouraging bible verses',
    'bible verses about strength', 'KJV inspirational verses', 'motivating scriptures',
    'bible verses for encouragement', 'uplifting bible passages',
  ],
  openGraph: {
    title: 'Inspirational Bible Verses | 50 Motivating Scriptures (KJV)',
    description: '50 inspirational Bible verses from the King James Version that uplift, motivate, and strengthen your faith.',
    url: '/inspirational-bible-verses',
    type: 'website',
  },
  alternates: { canonical: '/inspirational-bible-verses' },
};

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function InspirationalBibleVersesPage() {
  const themes = getUniqueThemes();
  const otVerses = INSPIRATIONAL_VERSES.filter(v => OT_SLUGS.includes(v.bookSlug));
  const ntVerses = INSPIRATIONAL_VERSES.filter(v => !OT_SLUGS.includes(v.bookSlug));
  const uniqueBooks = new Set(INSPIRATIONAL_VERSES.map(v => v.bookSlug));

  // --- Structured Data ---

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bible Quotes', item: 'https://biblemaximum.com/bible-quotes' },
      { '@type': 'ListItem', position: 3, name: 'Inspirational Bible Verses' },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Inspirational Bible Verses',
    description: metadata.description,
    url: 'https://biblemaximum.com/inspirational-bible-verses',
    numberOfItems: INSPIRATIONAL_VERSES.length,
    publisher: {
      '@type': 'Organization',
      name: 'Bible Maximum',
      url: 'https://biblemaximum.com',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the most inspirational Bible verses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The most inspirational Bible verses include Philippians 4:13 ("I can do all things through Christ which strengtheneth me"), Isaiah 40:31 ("But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles"), Jeremiah 29:11 ("For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end"), Joshua 1:9 ("Be strong and of a good courage"), and Romans 8:28 ("And we know that all things work together for good to them that love God"). These verses have inspired countless believers to persevere in faith and pursue God\'s calling on their lives.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the most powerful verse in the Bible?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'While many scriptures carry tremendous power, Romans 8:31 ("If God be for us, who can be against us?") and Philippians 4:13 ("I can do all things through Christ which strengtheneth me") are often cited as the most powerful verses in the Bible. These passages declare the sufficiency of God\'s strength working through believers and have emboldened missionaries, martyrs, and ordinary Christians to accomplish extraordinary things for the kingdom of God.',
        },
      },
      {
        '@type': 'Question',
        name: 'What Bible verse is good for motivation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Colossians 3:23 is one of the best Bible verses for motivation: "And whatsoever ye do, do it heartily, as to the Lord, and not unto men." Other highly motivating scriptures include Galatians 6:9 ("And let us not be weary in well doing: for in due season we shall reap, if we faint not"), Hebrews 12:1\u20132 (running the race of faith with patience), and Proverbs 16:3 ("Commit thy works unto the LORD, and thy thoughts shall be established"). These verses remind believers that their labor in the Lord is never in vain.',
        },
      },
      {
        '@type': 'Question',
        name: 'What scripture is good for a new beginning?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '2 Corinthians 5:17 is the definitive scripture for new beginnings: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new." Isaiah 43:19 also speaks powerfully to fresh starts: "Behold, I will do a new thing; now it shall spring forth; shall ye not know it?" Lamentations 3:22\u201323 declares that God\'s mercies "are new every morning: great is thy faithfulness," offering hope that each day is a new opportunity to walk with God.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does the Bible say about being inspired by God?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '2 Timothy 1:7 teaches that God gives believers "the spirit of power, and of love, and of a sound mind" rather than fear. Acts 1:8 promises that the Holy Spirit empowers believers to be witnesses for Christ throughout the earth. Ephesians 3:20 declares that God "is able to do exceeding abundantly above all that we ask or think, according to the power that worketh in us." The Bible presents inspiration not as a fleeting emotion but as the ongoing work of the Holy Spirit who strengthens, guides, and empowers believers to live out God\'s purposes with boldness and confidence.',
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={collectionSchema} />
      <StructuredData data={faqSchema} />

      <Breadcrumb items={[
        { label: 'Bible Quotes', href: '/bible-quotes' },
        { label: 'Inspirational Bible Verses' },
      ]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mt-6 mb-8">
              <div className="relative h-48 md:h-56 bg-gradient-to-r from-amber-800 to-amber-900">
                <Image
                  src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png"
                  alt="Inspirational Bible Verses"
                  fill
                  className="object-cover opacity-25"
                  priority
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                    Inspirational Bible Verses
                  </h1>
                  <p className="text-amber-100 max-w-2xl mb-4">
                    50 motivating scriptures from the King James Bible that uplift
                    your spirit, ignite your purpose, and strengthen your walk with
                    God -- verses that have inspired faith and action for centuries.
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
                  <p className="text-sm text-primary-dark/70">Inspiring Verses</p>
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
                  <p className="text-2xl font-bold text-blue-600">{uniqueBooks.size}</p>
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
              How Inspirational Bible Verses Can Transform Your Life
            </h2>
            <div className="text-primary-dark/80 leading-relaxed space-y-3">
              <p>
                Throughout history, <strong>inspirational Bible verses</strong> have served as the foundation upon which believers build lives of purpose, courage, and enduring faith. These are not merely ancient words on a page -- they are living, active declarations from God that have moved entire nations, fueled the boldness of missionaries on foreign shores, and sustained martyrs in their darkest hours. When William Wilberforce fought to abolish the slave trade, he drew strength from scripture. When missionaries like Hudson Taylor pressed into the interior of China, <strong>motivational bible passages</strong> like Philippians 4:13 and Joshua 1:9 were the bedrock beneath their feet. The power of these <strong>uplifting verses</strong> lies not in sentiment but in the character of the God who spoke them.
              </p>
              <p>
                Modern Christians continue to find that <strong>scriptures that inspire</strong> are essential tools for daily living. Pastors weave <strong>faith-building scripture</strong> into sermons to awaken conviction in the hearts of their congregations. Believers copy <strong>bible verses for motivation</strong> into journals and prayer notebooks, returning to them during seasons of doubt, transition, and grief. Parents teach their children <strong>powerful bible verses</strong> like Proverbs 3:5&ndash;6 and Isaiah 41:10 so that the next generation will stand firm when trials come. The discipline of memorizing <strong>inspiring scripture</strong> transforms the mind, shapes the will, and produces a faith that does not waver when circumstances shift.
              </p>
              <p>
                The 50 <strong>inspirational Bible verses</strong> collected on this page represent the most enduring, widely memorized, and frequently quoted <strong>motivational bible passages</strong> in the King James Version. They span both Testaments and cover themes of strength, courage, hope, purpose, renewal, and the promises of God. Whether you are beginning a new chapter in life, pressing through a season of hardship, or simply seeking <strong>uplifting verses</strong> for your morning devotions, these scriptures point to the unchanging faithfulness of the Lord and the power He makes available to every believer through His Spirit.
              </p>
            </div>
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
            {INSPIRATIONAL_VERSES.map((verse, idx) => (
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
              Think You Know These Verses? Prove It.
            </h2>
            <p className="text-blue-100 mb-4 max-w-2xl">
              Take a chapter quiz from any book featured on this page. 15 questions per quiz with instant scoring and verse-by-verse explanations.
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
              Inspirational Verses by Testament
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
                <h3 className="font-bold text-scripture mb-1">What are the most inspirational Bible verses?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  The most inspirational Bible verses include Philippians 4:13
                  (&ldquo;I can do all things through Christ which strengtheneth
                  me&rdquo;), Isaiah 40:31 (&ldquo;But they that wait upon the LORD
                  shall renew their strength&rdquo;), Jeremiah 29:11 (&ldquo;For I
                  know the thoughts that I think toward you&rdquo;), Joshua 1:9
                  (&ldquo;Be strong and of a good courage&rdquo;), and Romans 8:28
                  (&ldquo;All things work together for good&rdquo;). These verses
                  have inspired countless believers to persevere in faith and pursue
                  God&apos;s calling on their lives.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What is the most powerful verse in the Bible?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  While many scriptures carry tremendous power, Romans 8:31
                  (&ldquo;If God be for us, who can be against us?&rdquo;) and
                  Philippians 4:13 (&ldquo;I can do all things through Christ which
                  strengtheneth me&rdquo;) are often cited as the most powerful
                  verses in the Bible. These passages declare the sufficiency of
                  God&apos;s strength working through believers and have emboldened
                  missionaries, martyrs, and ordinary Christians to accomplish
                  extraordinary things for the kingdom of God.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What Bible verse is good for motivation?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  Colossians 3:23 is one of the best Bible verses for motivation:
                  &ldquo;And whatsoever ye do, do it heartily, as to the Lord, and
                  not unto men.&rdquo; Other highly motivating scriptures include
                  Galatians 6:9 (&ldquo;Let us not be weary in well doing: for in
                  due season we shall reap, if we faint not&rdquo;), Hebrews
                  12:1&ndash;2 (running the race of faith with patience), and
                  Proverbs 16:3 (&ldquo;Commit thy works unto the LORD, and thy
                  thoughts shall be established&rdquo;). These verses remind
                  believers that their labor in the Lord is never in vain.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What scripture is good for a new beginning?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  2 Corinthians 5:17 is the definitive scripture for new beginnings:
                  &ldquo;Therefore if any man be in Christ, he is a new creature: old
                  things are passed away; behold, all things are become new.&rdquo;
                  Isaiah 43:19 also speaks powerfully to fresh starts: &ldquo;Behold,
                  I will do a new thing; now it shall spring forth; shall ye not know
                  it?&rdquo; Lamentations 3:22&ndash;23 declares that God&apos;s
                  mercies &ldquo;are new every morning: great is thy
                  faithfulness,&rdquo; offering hope that each day is a new
                  opportunity to walk with God.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What does the Bible say about being inspired by God?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  2 Timothy 1:7 teaches that God gives believers &ldquo;the spirit of
                  power, and of love, and of a sound mind&rdquo; rather than fear.
                  Acts 1:8 promises that the Holy Spirit empowers believers to be
                  witnesses for Christ throughout the earth. Ephesians 3:20 declares
                  that God &ldquo;is able to do exceeding abundantly above all that we
                  ask or think, according to the power that worketh in us.&rdquo; The
                  Bible presents inspiration not as a fleeting emotion but as the
                  ongoing work of the Holy Spirit who strengthens, guides, and
                  empowers believers to live out God&apos;s purposes with boldness and
                  confidence.
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
                href="/famous-bible-verses"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Famous Bible Verses</span>
              </Link>
              <Link
                href="/popular-bible-verses"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Popular Bible Verses</span>
              </Link>
              <Link
                href="/cross-references"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Cross References</span>
              </Link>
              <Link
                href="/bible-study-guides"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Study Guides</span>
              </Link>
              <Link
                href="/devotionals"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Daily Devotionals</span>
              </Link>
              <Link
                href="/topics"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Topics</span>
              </Link>
              <Link
                href="/bible-chapter-summaries"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Chapter Summaries</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
