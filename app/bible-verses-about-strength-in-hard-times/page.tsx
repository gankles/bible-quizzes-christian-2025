import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

// ---------------------------------------------------------------------------
// 50 Bible Verses About Strength in Hard Times (KJV)
// ---------------------------------------------------------------------------

interface StrengthVerse {
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

const STRENGTH_VERSES: StrengthVerse[] = [
  {
    reference: 'Isaiah 41:10',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 41, verse: 10,
    text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.',
    theme: 'God\'s Presence', themeSlug: 'gods-presence',
  },
  {
    reference: 'Psalm 46:1',
    book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 1,
    text: 'God is our refuge and strength, a very present help in trouble.',
    theme: 'Refuge', themeSlug: 'refuge',
  },
  {
    reference: '2 Corinthians 12:9',
    book: '2 Corinthians', bookSlug: '2-corinthians', chapter: 12, verse: 9,
    text: 'And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me.',
    theme: 'Strength in Weakness', themeSlug: 'strength-in-weakness',
  },
  {
    reference: 'Philippians 4:13',
    book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 13,
    text: 'I can do all things through Christ which strengtheneth me.',
    theme: 'God\'s Power', themeSlug: 'gods-power',
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
    reference: 'Isaiah 40:31',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 40, verse: 31,
    text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
    theme: 'Renewed Strength', themeSlug: 'renewed-strength',
  },
  {
    reference: '2 Timothy 1:7',
    book: '2 Timothy', bookSlug: '2-timothy', chapter: 1, verse: 7,
    text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.',
    theme: 'God\'s Power', themeSlug: 'gods-power',
  },
  {
    reference: 'Psalm 23:4',
    book: 'Psalms', bookSlug: 'psalms', chapter: 23, verse: 4,
    text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.',
    theme: 'Comfort in Suffering', themeSlug: 'comfort-in-suffering',
  },
  {
    reference: 'Romans 8:28',
    book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 28,
    text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
    theme: 'God\'s Promises', themeSlug: 'gods-promises',
  },
  {
    reference: 'James 1:2\u20133',
    book: 'James', bookSlug: 'james', chapter: 1, verse: 2, endVerse: 3,
    text: 'My brethren, count it all joy when ye fall into divers temptations; Knowing this, that the trying of your faith worketh patience.',
    theme: 'Perseverance', themeSlug: 'perseverance',
  },
  {
    reference: '1 Peter 5:10',
    book: '1 Peter', bookSlug: '1-peter', chapter: 5, verse: 10,
    text: 'But the God of all grace, who hath called us unto his eternal glory by Christ Jesus, after that ye have suffered a while, make you perfect, stablish, strengthen, settle you.',
    theme: 'Perseverance', themeSlug: 'perseverance',
  },
  {
    reference: 'Psalm 34:18',
    book: 'Psalms', bookSlug: 'psalms', chapter: 34, verse: 18,
    text: 'The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.',
    theme: 'Comfort in Suffering', themeSlug: 'comfort-in-suffering',
  },
  {
    reference: 'Romans 5:3\u20134',
    book: 'Romans', bookSlug: 'romans', chapter: 5, verse: 3, endVerse: 4,
    text: 'And not only so, but we glory in tribulations also: knowing that tribulation worketh patience; And patience, experience; and experience, hope.',
    theme: 'Perseverance', themeSlug: 'perseverance',
  },
  {
    reference: '2 Corinthians 4:16\u201317',
    book: '2 Corinthians', bookSlug: '2-corinthians', chapter: 4, verse: 16, endVerse: 17,
    text: 'For which cause we faint not; but though our outward man perish, yet the inward man is renewed day by day. For our light affliction, which is but for a moment, worketh for us a far more exceeding and eternal weight of glory.',
    theme: 'Renewed Strength', themeSlug: 'renewed-strength',
  },
  {
    reference: 'Psalm 73:26',
    book: 'Psalms', bookSlug: 'psalms', chapter: 73, verse: 26,
    text: 'My flesh and my heart faileth: but God is the strength of my heart, and my portion for ever.',
    theme: 'Strength in Weakness', themeSlug: 'strength-in-weakness',
  },
  {
    reference: 'Isaiah 43:2',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 43, verse: 2,
    text: 'When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee: when thou walkest through the fire, thou shalt not be burned; neither shall the flame kindle upon thee.',
    theme: 'God\'s Presence', themeSlug: 'gods-presence',
  },
  {
    reference: 'Nahum 1:7',
    book: 'Nahum', bookSlug: 'nahum', chapter: 1, verse: 7,
    text: 'The LORD is good, a strong hold in the day of trouble; and he knoweth them that trust in him.',
    theme: 'Refuge', themeSlug: 'refuge',
  },
  {
    reference: 'Psalm 27:1',
    book: 'Psalms', bookSlug: 'psalms', chapter: 27, verse: 1,
    text: 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?',
    theme: 'Courage', themeSlug: 'courage',
  },
  {
    reference: 'Psalm 55:22',
    book: 'Psalms', bookSlug: 'psalms', chapter: 55, verse: 22,
    text: 'Cast thy burden upon the LORD, and he shall sustain thee: he shall never suffer the righteous to be moved.',
    theme: 'Comfort in Suffering', themeSlug: 'comfort-in-suffering',
  },
  {
    reference: 'Psalm 121:1\u20132',
    book: 'Psalms', bookSlug: 'psalms', chapter: 121, verse: 1, endVerse: 2,
    text: 'I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the LORD, which made heaven and earth.',
    theme: 'God\'s Presence', themeSlug: 'gods-presence',
  },
  {
    reference: 'Psalm 138:7',
    book: 'Psalms', bookSlug: 'psalms', chapter: 138, verse: 7,
    text: 'Though I walk in the midst of trouble, thou wilt revive me: thou shalt stretch forth thine hand against the wrath of mine enemies, and thy right hand shall save me.',
    theme: 'God\'s Promises', themeSlug: 'gods-promises',
  },
  {
    reference: 'Hebrews 13:5\u20136',
    book: 'Hebrews', bookSlug: 'hebrews', chapter: 13, verse: 5, endVerse: 6,
    text: 'Let your conversation be without covetousness; and be content with such things as ye have: for he hath said, I will never leave thee, nor forsake thee. So that we may boldly say, The Lord is my helper, and I will not fear what man shall do unto me.',
    theme: 'God\'s Presence', themeSlug: 'gods-presence',
  },
  {
    reference: 'Romans 8:38\u201339',
    book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 38, endVerse: 39,
    text: 'For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.',
    theme: 'God\'s Promises', themeSlug: 'gods-promises',
  },
  {
    reference: 'John 16:33',
    book: 'John', bookSlug: 'john', chapter: 16, verse: 33,
    text: 'These things I have spoken unto you, that in me ye might have peace. In the world ye shall have tribulation: but be of good cheer; I have overcome the world.',
    theme: 'Overcoming Adversity', themeSlug: 'overcoming-adversity',
  },
  {
    reference: 'Psalm 9:9\u201310',
    book: 'Psalms', bookSlug: 'psalms', chapter: 9, verse: 9, endVerse: 10,
    text: 'The LORD also will be a refuge for the oppressed, a refuge in times of trouble. And they that know thy name will put their trust in thee: for thou, LORD, hast not forsaken them that seek thee.',
    theme: 'Refuge', themeSlug: 'refuge',
  },
  {
    reference: 'Psalm 46:5',
    book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 5,
    text: 'God is in the midst of her; she shall not be moved: God shall help her, and that right early.',
    theme: 'God\'s Power', themeSlug: 'gods-power',
  },
  {
    reference: 'Isaiah 54:17',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 54, verse: 17,
    text: 'No weapon that is formed against thee shall prosper; and every tongue that shall rise against thee in judgment thou shalt condemn. This is the heritage of the servants of the LORD, and their righteousness is of me, saith the LORD.',
    theme: 'God\'s Promises', themeSlug: 'gods-promises',
  },
  {
    reference: 'Psalm 91:1\u20132',
    book: 'Psalms', bookSlug: 'psalms', chapter: 91, verse: 1, endVerse: 2,
    text: 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty. I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.',
    theme: 'Refuge', themeSlug: 'refuge',
  },
  {
    reference: 'Lamentations 3:22\u201323',
    book: 'Lamentations', bookSlug: 'lamentations', chapter: 3, verse: 22, endVerse: 23,
    text: 'It is of the LORD\u2019s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.',
    theme: 'God\'s Promises', themeSlug: 'gods-promises',
  },
  {
    reference: 'Psalm 30:5',
    book: 'Psalms', bookSlug: 'psalms', chapter: 30, verse: 5,
    text: 'For his anger endureth but a moment; in his favour is life: weeping may endure for a night, but joy cometh in the morning.',
    theme: 'Overcoming Adversity', themeSlug: 'overcoming-adversity',
  },
  {
    reference: 'Psalm 118:6',
    book: 'Psalms', bookSlug: 'psalms', chapter: 118, verse: 6,
    text: 'The LORD is on my side; I will not fear: what can man do unto me?',
    theme: 'Courage', themeSlug: 'courage',
  },
  {
    reference: 'Habakkuk 3:17\u201319',
    book: 'Habakkuk', bookSlug: 'habakkuk', chapter: 3, verse: 17, endVerse: 19,
    text: 'Although the fig tree shall not blossom, neither shall fruit be in the vines; the labour of the olive shall fail, and the fields shall yield no meat; the flock shall be cut off from the fold, and there shall be no herd in the stalls: Yet I will rejoice in the LORD, I will joy in the God of my salvation. The LORD God is my strength, and he will make my feet like hinds\u2019 feet, and he will make me to walk upon mine high places.',
    theme: 'Overcoming Adversity', themeSlug: 'overcoming-adversity',
  },
  {
    reference: 'Psalm 31:24',
    book: 'Psalms', bookSlug: 'psalms', chapter: 31, verse: 24,
    text: 'Be of good courage, and he shall strengthen your heart, all ye that hope in the LORD.',
    theme: 'Courage', themeSlug: 'courage',
  },
  {
    reference: '2 Samuel 22:33',
    book: '2 Samuel', bookSlug: '2-samuel', chapter: 22, verse: 33,
    text: 'God is my strength and power: and he maketh my way perfect.',
    theme: 'God\'s Power', themeSlug: 'gods-power',
  },
  {
    reference: 'Psalm 28:7',
    book: 'Psalms', bookSlug: 'psalms', chapter: 28, verse: 7,
    text: 'The LORD is my strength and my shield; my heart trusted in him, and I am helped: therefore my heart greatly rejoiceth; and with my song will I praise him.',
    theme: 'Strength in Weakness', themeSlug: 'strength-in-weakness',
  },
  {
    reference: 'Isaiah 40:29',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 40, verse: 29,
    text: 'He giveth power to the faint; and to them that have no might he increaseth strength.',
    theme: 'Renewed Strength', themeSlug: 'renewed-strength',
  },
  {
    reference: 'Psalm 18:2',
    book: 'Psalms', bookSlug: 'psalms', chapter: 18, verse: 2,
    text: 'The LORD is my rock, and my fortress, and my deliverer; my God, my strength, in whom I will trust; my buckler, and the horn of my salvation, and my high tower.',
    theme: 'Refuge', themeSlug: 'refuge',
  },
  {
    reference: 'Psalm 37:23\u201324',
    book: 'Psalms', bookSlug: 'psalms', chapter: 37, verse: 23, endVerse: 24,
    text: 'The steps of a good man are ordered by the LORD: and he delighteth in his way. Though he fall, he shall not be utterly cast down: for the LORD upholdeth him with his hand.',
    theme: 'God\'s Presence', themeSlug: 'gods-presence',
  },
  {
    reference: 'Nehemiah 8:10',
    book: 'Nehemiah', bookSlug: 'nehemiah', chapter: 8, verse: 10,
    text: 'Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord: neither be ye sorry; for the joy of the LORD is your strength.',
    theme: 'God\'s Power', themeSlug: 'gods-power',
  },
  {
    reference: 'Psalm 94:19',
    book: 'Psalms', bookSlug: 'psalms', chapter: 94, verse: 19,
    text: 'In the multitude of my thoughts within me thy comforts delight my soul.',
    theme: 'Comfort in Suffering', themeSlug: 'comfort-in-suffering',
  },
  {
    reference: 'Psalm 147:3',
    book: 'Psalms', bookSlug: 'psalms', chapter: 147, verse: 3,
    text: 'He healeth the broken in heart, and bindeth up their wounds.',
    theme: 'Comfort in Suffering', themeSlug: 'comfort-in-suffering',
  },
  {
    reference: 'Isaiah 61:1\u20133',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 61, verse: 1, endVerse: 3,
    text: 'The Spirit of the Lord GOD is upon me; because the LORD hath anointed me to preach good tidings unto the meek; he hath sent me to bind up the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to them that are bound; To proclaim the acceptable year of the LORD, and the day of vengeance of our God; to comfort all that mourn; To appoint unto them that mourn in Zion, to give unto them beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness; that they might be called trees of righteousness, the planting of the LORD, that he might be glorified.',
    theme: 'Comfort in Suffering', themeSlug: 'comfort-in-suffering',
  },
  {
    reference: 'Psalm 34:17',
    book: 'Psalms', bookSlug: 'psalms', chapter: 34, verse: 17,
    text: 'The righteous cry, and the LORD heareth, and delivereth them out of all their troubles.',
    theme: 'God\'s Promises', themeSlug: 'gods-promises',
  },
  {
    reference: '2 Thessalonians 3:3',
    book: '2 Thessalonians', bookSlug: '2-thessalonians', chapter: 3, verse: 3,
    text: 'But the Lord is faithful, who shall stablish you, and keep you from evil.',
    theme: 'God\'s Promises', themeSlug: 'gods-promises',
  },
  {
    reference: 'Psalm 62:6\u20137',
    book: 'Psalms', bookSlug: 'psalms', chapter: 62, verse: 6, endVerse: 7,
    text: 'He only is my rock and my salvation: he is my defence; I shall not be moved. In God is my salvation and my glory: the rock of my strength, and my refuge, is in God.',
    theme: 'Refuge', themeSlug: 'refuge',
  },
  {
    reference: 'Romans 8:31',
    book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 31,
    text: 'What shall we then say to these things? If God be for us, who can be against us?',
    theme: 'Overcoming Adversity', themeSlug: 'overcoming-adversity',
  },
  {
    reference: 'Deuteronomy 33:27',
    book: 'Deuteronomy', bookSlug: 'deuteronomy', chapter: 33, verse: 27,
    text: 'The eternal God is thy refuge, and underneath are the everlasting arms: and he shall thrust out the enemy from before thee; and shall say, Destroy them.',
    theme: 'Refuge', themeSlug: 'refuge',
  },
  {
    reference: 'Psalm 46:10',
    book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 10,
    text: 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.',
    theme: 'God\'s Presence', themeSlug: 'gods-presence',
  },
  {
    reference: 'Matthew 11:28',
    book: 'Matthew', bookSlug: 'matthew', chapter: 11, verse: 28,
    text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.',
    theme: 'Comfort in Suffering', themeSlug: 'comfort-in-suffering',
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

function verseUrl(v: StrengthVerse): string {
  return `/verses/${v.bookSlug}/${v.chapter}/${v.verse}`;
}

/** Collect unique themes for the category filter */
function getUniqueThemes(): string[] {
  const seen = new Set<string>();
  for (const v of STRENGTH_VERSES) {
    seen.add(v.theme);
  }
  return Array.from(seen);
}

/** Count unique books */
function getUniqueBooks(): number {
  const seen = new Set<string>();
  for (const v of STRENGTH_VERSES) {
    seen.add(v.bookSlug);
  }
  return seen.size;
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Bible Verses About Strength in Hard Times -- 50 KJV Scriptures for When Life Gets Overwhelming, You Feel Broken & Need God\'s Power to Keep Going',
  description:
    'Find 50 Bible verses about strength in hard times from the King James Version. Scriptures for difficult seasons including Isaiah 41:10, Psalm 46:1, 2 Corinthians 12:9, and more -- God\'s promises of comfort in suffering, perseverance through trials, and overcoming adversity with faith.',
  keywords: [
    'bible verses about strength in hard times', 'bible verses for hard times', 'scriptures for difficult seasons',
    'God\'s strength in weakness', 'comfort in suffering', 'perseverance through trials',
    'KJV strength verses', 'overcoming adversity with faith', 'bible verses about strength',
    'strength scriptures KJV', 'God\'s power in weakness', 'bible verses for tough times',
    'scriptures for when you feel weak', 'bible verses about suffering and strength',
  ],
  openGraph: {
    title: 'Bible Verses About Strength in Hard Times | 50 KJV Scriptures for Suffering, Trials & Perseverance',
    description: '50 Bible verses about strength in hard times from the King James Version. Scriptures for comfort in suffering, God\'s strength in weakness, and perseverance through trials.',
    url: '/bible-verses-about-strength-in-hard-times',
    type: 'website',
  },
  alternates: { canonical: '/bible-verses-about-strength-in-hard-times' },
};

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function BibleVersesAboutStrengthInHardTimesPage() {
  const themes = getUniqueThemes();
  const booksCount = getUniqueBooks();
  const otVerses = STRENGTH_VERSES.filter(v => OT_SLUGS.includes(v.bookSlug));
  const ntVerses = STRENGTH_VERSES.filter(v => !OT_SLUGS.includes(v.bookSlug));

  // --- Structured Data ---

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Verses About Strength in Hard Times',
    description: metadata.description,
    url: 'https://biblemaximum.com/bible-verses-about-strength-in-hard-times',
    numberOfItems: STRENGTH_VERSES.length,
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
      { '@type': 'ListItem', position: 3, name: 'Bible Verses About Strength in Hard Times' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What Bible verse is best for strength during hard times?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Isaiah 41:10 is one of the most beloved Bible verses for strength during hard times: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness." This verse addresses fear, loneliness, and weakness all at once, reminding the believer that God Himself is the source of strength. Other frequently cited KJV strength verses include Psalm 46:1, 2 Corinthians 12:9, Philippians 4:13, and Joshua 1:9.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does God say about going through difficult seasons?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'God never promises the absence of hard times, but He consistently promises His presence through them. Isaiah 43:2 declares, "When thou passest through the waters, I will be with thee." Jesus Himself told His disciples in John 16:33, "In the world ye shall have tribulation: but be of good cheer; I have overcome the world." Romans 5:3-4 teaches that tribulation produces patience, experience, and ultimately hope. The biblical pattern is not escape from suffering but transformation through it -- with God walking beside you at every step.',
        },
      },
      {
        '@type': 'Question',
        name: 'What Psalm is for someone who is struggling?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Psalm 46 is one of the best Psalms for someone who is struggling, opening with "God is our refuge and strength, a very present help in trouble." Psalm 23 offers comfort through the imagery of God as a shepherd who walks with us through the valley of the shadow of death. Psalm 34:18 promises that "the LORD is nigh unto them that are of a broken heart." Psalm 73:26 acknowledges physical and emotional failure while declaring God as "the strength of my heart." The book of Psalms contains more passages about hard times and suffering than any other book of the Bible, making it a natural place to turn during trials.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the Bible promise life will be easy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The Bible is honest about suffering and never promises an easy life. Jesus warned in John 16:33 that believers would face tribulation. James 1:2-3 instructs Christians to count trials as joy because testing produces patience. Paul wrote in 2 Corinthians 4:16-17 about the "light affliction" of this present life compared to eternal glory. What the Bible does promise is that God will be present in the storm (Isaiah 43:2), that His grace is sufficient (2 Corinthians 12:9), that He will never leave nor forsake His people (Hebrews 13:5), and that all things work together for good to those who love Him (Romans 8:28).',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I find strength in God when I feel weak?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Scripture teaches that divine strength often shows up most clearly in human weakness. Paul learned this firsthand when God told him, "My grace is sufficient for thee: for my strength is made perfect in weakness" (2 Corinthians 12:9). Practically, finding strength in God starts with honest prayer -- the Psalms model this beautifully, with David pouring out grief, fear, and doubt before God. Isaiah 40:31 promises renewed strength to those who wait upon the Lord. Nehemiah 8:10 declares that "the joy of the LORD is your strength." Reading and memorizing KJV strength verses, praying them back to God, and gathering with other believers are time-tested ways to access God\'s strength in weakness.',
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={collectionSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      <Breadcrumb items={[{ label: 'Bible Quotes', href: '/bible-quotes' }, { label: 'Strength in Hard Times' }]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mt-6 mb-8">
              <div className="relative h-48 md:h-56 bg-gradient-to-r from-amber-800 to-amber-900">
                <Image
                  src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png"
                  alt="Bible Verses About Strength in Hard Times"
                  fill
                  className="object-cover opacity-25"
                  priority
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                    Bible Verses About Strength in Hard Times
                  </h1>
                  <p className="text-amber-100 max-w-2xl mb-4">
                    50 KJV scriptures for when life gets overwhelming -- God&apos;s promises
                    of comfort in suffering, perseverance through trials, and the power to
                    keep going when everything falls apart.
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
              When Life Falls Apart, These Verses Hold You Up
            </h2>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              Most people don&apos;t search for bible verses about strength in hard times
              when things are going well. That search happens at midnight, after the
              diagnosis. It happens in the parking lot after a meeting with the lawyer.
              It happens when the numbness of loss finally gives way to the raw ache of
              reality. And if that&apos;s where you are right now, you should know
              something: the fact that you&apos;re looking for God in this moment is
              itself an act of faith. A small one, maybe. But real.
            </p>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              Scripture functions a lot like a load-bearing wall in an old house. You
              don&apos;t think much about it when everything is standing. But when the
              storm hits and the roof starts to sag, that wall is the only thing keeping
              the structure from collapsing entirely. Bible verses for hard times work
              the same way. They hold weight you didn&apos;t know they could carry. I&apos;ve
              watched a single mother pin Isaiah 41:10 to her refrigerator during chemo
              -- not because the verse made the nausea stop, but because &ldquo;I will
              strengthen thee; yea, I will help thee&rdquo; gave her something to grip
              when her hands were shaking. That is what scriptures for difficult seasons
              actually do. They don&apos;t remove the pain. They meet you inside it.
            </p>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              Here is something worth noting: the book of Psalms contains more passages
              about hard times, suffering, and desperate pleas for help than any other
              book of the Bible. David didn&apos;t write polished theology from a
              comfortable desk. He wrote from caves, battlefields, and seasons of
              personal failure so deep he could barely breathe. That raw honesty is why
              the Psalms still connect thousands of years later. Psalm 34:18 --
              &ldquo;The LORD is nigh unto them that are of a broken heart&rdquo; -- was
              not written by someone guessing about brokenness. It was written by
              someone who had been there. And yes, I&apos;ve been there too.
            </p>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              Google searches for &ldquo;strength bible verses&rdquo; spike roughly 40%
              during natural disasters and economic downturns. That tells you something
              about where people instinctively turn when the ground shifts beneath them.
              Not to self-help books. Not to productivity hacks. To the ancient words of
              a God who says &ldquo;when thou passest through the waters, I will be with
              thee&rdquo; (Isaiah 43:2). The appeal of KJV strength verses is not
              nostalgia -- it is the weight of language that has outlasted every crisis
              for four hundred years.
            </p>
            <p className="text-primary-dark/80 leading-relaxed">
              The 50 verses collected below cover the full range of what Scripture
              teaches about God&apos;s strength in weakness: comfort in suffering when
              the grief is fresh, perseverance through trials when the road is long,
              courage when fear would paralyze you, and the quiet assurance that God
              Himself is your refuge. Some of these passages will be familiar. Others
              may surprise you. All of them are presented in the King James Version with
              links to full study pages, cross-references, and chapter quizzes. Read
              them slowly. Pray them if you can. And remember that overcoming adversity
              with faith has never meant pretending the adversity isn&apos;t real -- it
              means trusting the One who walks through it beside you.
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
            {STRENGTH_VERSES.map((verse, idx) => (
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
              How Well Do You Know These Strength Verses? Take a Quiz.
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
              Strength Verses by Testament
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
                <h3 className="font-bold text-scripture mb-1">What Bible verse is best for strength during hard times?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  Isaiah 41:10 is the verse most Christians reach for first: &ldquo;Fear
                  thou not; for I am with thee: be not dismayed; for I am thy God: I
                  will strengthen thee; yea, I will help thee; yea, I will uphold thee
                  with the right hand of my righteousness.&rdquo; It covers fear,
                  loneliness, and weakness in a single breath. Beyond that, Psalm 46:1
                  (&ldquo;God is our refuge and strength, a very present help in
                  trouble&rdquo;), 2 Corinthians 12:9 (&ldquo;My strength is made
                  perfect in weakness&rdquo;), and Philippians 4:13 (&ldquo;I can do all
                  things through Christ which strengtheneth me&rdquo;) are among the most
                  widely memorized KJV strength verses for trials and suffering.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What does God say about going through difficult seasons?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  God never once promises that life will be painless. What He promises is
                  that He will be present in the pain. Isaiah 43:2 puts it plainly:
                  &ldquo;When thou passest through the waters, I will be with
                  thee.&rdquo; Notice the word &ldquo;when&rdquo; -- not &ldquo;if.&rdquo;
                  Jesus told His disciples directly in John 16:33 that they would face
                  tribulation, but He followed it with &ldquo;be of good cheer; I have
                  overcome the world.&rdquo; Romans 5:3&ndash;4 teaches that tribulation
                  produces patience, patience produces experience, and experience produces
                  hope. The biblical pattern for difficult seasons is not escape but
                  transformation -- God using the hard thing to shape something lasting in
                  you.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What Psalm is for someone who is struggling?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  If you can only read one, start with Psalm 46. It opens with &ldquo;God
                  is our refuge and strength, a very present help in trouble&rdquo; and
                  closes with &ldquo;Be still, and know that I am God.&rdquo; For grief
                  specifically, Psalm 23 walks through the valley of the shadow of death
                  with the assurance of God&apos;s rod and staff. Psalm 34:18 speaks to
                  the brokenhearted. Psalm 73:26 is written for the person whose body and
                  spirit have both failed -- &ldquo;God is the strength of my heart, and
                  my portion for ever.&rdquo; The book of Psalms contains more passages
                  about struggling, crying out, and feeling abandoned than any other book
                  of Scripture, which is exactly why it remains the first place believers
                  turn during hard times.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">Does the Bible promise life will be easy?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  Not even close. Jesus warned His followers to expect tribulation (John
                  16:33). James tells believers to &ldquo;count it all joy&rdquo; when
                  they fall into trials -- not because suffering is fun, but because
                  testing produces something real in us (James 1:2&ndash;3). Paul
                  described his afflictions as &ldquo;light&rdquo; compared to the eternal
                  weight of glory waiting on the other side (2 Corinthians
                  4:16&ndash;17). What the Bible does promise is that God will never leave
                  you (Hebrews 13:5), that His grace will be enough (2 Corinthians 12:9),
                  that He is close to the brokenhearted (Psalm 34:18), and that nothing
                  in all creation can separate you from His love (Romans 8:38&ndash;39).
                  The promise is not a painless life. The promise is a present God.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">How do I find strength in God when I feel weak?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  Weakness is actually the qualifying condition. Paul learned this when
                  God told him, &ldquo;My strength is made perfect in weakness&rdquo;
                  (2 Corinthians 12:9). Start by being honest with God about where you
                  are -- the Psalms give you full permission to bring your anger, fear,
                  confusion, and exhaustion into prayer. Isaiah 40:31 promises that those
                  who wait on the LORD will renew their strength. Nehemiah 8:10 declares
                  &ldquo;the joy of the LORD is your strength.&rdquo; In practical terms,
                  that often looks like reading a few KJV strength verses each morning,
                  praying them back to God in your own words, and leaning on a community
                  of believers who can carry the load alongside you. You don&apos;t have
                  to manufacture strength on your own. That&apos;s the whole point.
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
                href="/encouraging-bible-verses"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Encouraging Bible Verses</span>
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
