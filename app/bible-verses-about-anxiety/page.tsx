import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

// ---------------------------------------------------------------------------
// 50 Bible Verses About Anxiety (KJV)
// ---------------------------------------------------------------------------

interface AnxietyVerse {
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

const ANXIETY_VERSES: AnxietyVerse[] = [
  {
    reference: 'Philippians 4:6\u20137',
    book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 6, endVerse: 7,
    text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
    theme: 'Peace', themeSlug: 'peace',
  },
  {
    reference: '1 Peter 5:7',
    book: '1 Peter', bookSlug: '1-peter', chapter: 5, verse: 7,
    text: 'Casting all your care upon him; for he careth for you.',
    theme: 'Casting Care', themeSlug: 'casting-care',
  },
  {
    reference: 'Matthew 6:25\u201327',
    book: 'Matthew', bookSlug: 'matthew', chapter: 6, verse: 25, endVerse: 27,
    text: 'Therefore I say unto you, Take no thought for your life, what ye shall eat, or what ye shall drink; nor yet for your body, what ye shall put on. Is not the life more than meat, and the body than raiment? Behold the fowls of the air: for they sow not, neither do they reap, nor gather into barns; yet your heavenly Father feedeth them. Are ye not much better than they? Which of you by taking thought can add one cubit unto his stature?',
    theme: 'Trust', themeSlug: 'trust',
  },
  {
    reference: 'Isaiah 41:10',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 41, verse: 10,
    text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.',
    theme: 'God\'s Presence', themeSlug: 'gods-presence',
  },
  {
    reference: 'Psalm 55:22',
    book: 'Psalms', bookSlug: 'psalms', chapter: 55, verse: 22,
    text: 'Cast thy burden upon the LORD, and he shall sustain thee: he shall never suffer the righteous to be moved.',
    theme: 'Casting Care', themeSlug: 'casting-care',
  },
  {
    reference: 'Psalm 94:19',
    book: 'Psalms', bookSlug: 'psalms', chapter: 94, verse: 19,
    text: 'In the multitude of my thoughts within me thy comforts delight my soul.',
    theme: 'Comfort', themeSlug: 'comfort',
  },
  {
    reference: 'Psalm 34:4',
    book: 'Psalms', bookSlug: 'psalms', chapter: 34, verse: 4,
    text: 'I sought the LORD, and he heard me, and delivered me from all my fears.',
    theme: 'Deliverance', themeSlug: 'deliverance',
  },
  {
    reference: 'Matthew 11:28\u201330',
    book: 'Matthew', bookSlug: 'matthew', chapter: 11, verse: 28, endVerse: 30,
    text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls. For my yoke is easy, and my burden is light.',
    theme: 'Rest', themeSlug: 'rest',
  },
  {
    reference: 'John 14:27',
    book: 'John', bookSlug: 'john', chapter: 14, verse: 27,
    text: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.',
    theme: 'Peace', themeSlug: 'peace',
  },
  {
    reference: '2 Timothy 1:7',
    book: '2 Timothy', bookSlug: '2-timothy', chapter: 1, verse: 7,
    text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.',
    theme: 'Courage', themeSlug: 'courage',
  },
  {
    reference: 'Psalm 23:4',
    book: 'Psalms', bookSlug: 'psalms', chapter: 23, verse: 4,
    text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.',
    theme: 'God\'s Presence', themeSlug: 'gods-presence',
  },
  {
    reference: 'Romans 8:28',
    book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 28,
    text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
    theme: 'God\'s Plan', themeSlug: 'gods-plan',
  },
  {
    reference: 'Proverbs 12:25',
    book: 'Proverbs', bookSlug: 'proverbs', chapter: 12, verse: 25,
    text: 'Heaviness in the heart of man maketh it stoop: but a good word maketh it glad.',
    theme: 'Encouragement', themeSlug: 'encouragement',
  },
  {
    reference: 'Isaiah 26:3',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 26, verse: 3,
    text: 'Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.',
    theme: 'Peace', themeSlug: 'peace',
  },
  {
    reference: 'Psalm 46:1\u20132',
    book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 1, endVerse: 2,
    text: 'God is our refuge and strength, a very present help in trouble. Therefore will not we fear, though the earth be removed, and though the mountains be carried into the midst of the sea;',
    theme: 'Refuge', themeSlug: 'refuge',
  },
  {
    reference: 'Psalm 56:3',
    book: 'Psalms', bookSlug: 'psalms', chapter: 56, verse: 3,
    text: 'What time I am afraid, I will trust in thee.',
    theme: 'Trust', themeSlug: 'trust',
  },
  {
    reference: 'Matthew 6:34',
    book: 'Matthew', bookSlug: 'matthew', chapter: 6, verse: 34,
    text: 'Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof.',
    theme: 'Trust', themeSlug: 'trust',
  },
  {
    reference: 'Jeremiah 29:11',
    book: 'Jeremiah', bookSlug: 'jeremiah', chapter: 29, verse: 11,
    text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.',
    theme: 'Hope', themeSlug: 'hope',
  },
  {
    reference: 'Psalm 27:1',
    book: 'Psalms', bookSlug: 'psalms', chapter: 27, verse: 1,
    text: 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?',
    theme: 'Courage', themeSlug: 'courage',
  },
  {
    reference: 'Romans 8:38\u201339',
    book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 38, endVerse: 39,
    text: 'For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.',
    theme: 'God\'s Love', themeSlug: 'gods-love',
  },
  {
    reference: 'Psalm 121:1\u20132',
    book: 'Psalms', bookSlug: 'psalms', chapter: 121, verse: 1, endVerse: 2,
    text: 'I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the LORD, which made heaven and earth.',
    theme: 'Help', themeSlug: 'help',
  },
  {
    reference: 'Joshua 1:9',
    book: 'Joshua', bookSlug: 'joshua', chapter: 1, verse: 9,
    text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.',
    theme: 'Courage', themeSlug: 'courage',
  },
  {
    reference: 'Psalm 91:1\u20132',
    book: 'Psalms', bookSlug: 'psalms', chapter: 91, verse: 1, endVerse: 2,
    text: 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty. I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.',
    theme: 'Refuge', themeSlug: 'refuge',
  },
  {
    reference: 'Isaiah 43:1\u20132',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 43, verse: 1, endVerse: 2,
    text: 'But now thus saith the LORD that created thee, O Jacob, and he that formed thee, O Israel, Fear not: for I have redeemed thee, I have called thee by thy name; thou art mine. When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee: when thou walkest through the fire, thou shalt not be burned; neither shall the flame kindle upon thee.',
    theme: 'God\'s Presence', themeSlug: 'gods-presence',
  },
  {
    reference: 'Deuteronomy 31:6',
    book: 'Deuteronomy', bookSlug: 'deuteronomy', chapter: 31, verse: 6,
    text: 'Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.',
    theme: 'Courage', themeSlug: 'courage',
  },
  {
    reference: 'Luke 12:22\u201324',
    book: 'Luke', bookSlug: 'luke', chapter: 12, verse: 22, endVerse: 24,
    text: 'And he said unto his disciples, Therefore I say unto you, Take no thought for your life, what ye shall eat; neither for the body, what ye shall put on. The life is more than meat, and the body is more than raiment. Consider the ravens: for they neither sow nor reap; which neither have storehouse nor barn; and God feedeth them: how much more are ye better than the fowls?',
    theme: 'Trust', themeSlug: 'trust',
  },
  {
    reference: 'Psalm 37:5',
    book: 'Psalms', bookSlug: 'psalms', chapter: 37, verse: 5,
    text: 'Commit thy way unto the LORD; trust also in him; and he shall bring it to pass.',
    theme: 'Trust', themeSlug: 'trust',
  },
  {
    reference: 'Psalm 46:10',
    book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 10,
    text: 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.',
    theme: 'Peace', themeSlug: 'peace',
  },
  {
    reference: 'Proverbs 3:5\u20136',
    book: 'Proverbs', bookSlug: 'proverbs', chapter: 3, verse: 5, endVerse: 6,
    text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
    theme: 'Trust', themeSlug: 'trust',
  },
  {
    reference: '2 Corinthians 4:8\u20139',
    book: '2 Corinthians', bookSlug: '2-corinthians', chapter: 4, verse: 8, endVerse: 9,
    text: 'We are troubled on every side, yet not distressed; we are perplexed, but not in despair; Persecuted, but not forsaken; cast down, but not destroyed;',
    theme: 'Perseverance', themeSlug: 'perseverance',
  },
  {
    reference: 'Hebrews 13:5\u20136',
    book: 'Hebrews', bookSlug: 'hebrews', chapter: 13, verse: 5, endVerse: 6,
    text: 'Let your conversation be without covetousness; and be content with such things as ye have: for he hath said, I will never leave thee, nor forsake thee. So that we may boldly say, The Lord is my helper, and I will not fear what man shall do unto me.',
    theme: 'God\'s Presence', themeSlug: 'gods-presence',
  },
  {
    reference: 'Psalm 118:6',
    book: 'Psalms', bookSlug: 'psalms', chapter: 118, verse: 6,
    text: 'The LORD is on my side; I will not fear: what can man do unto me?',
    theme: 'Courage', themeSlug: 'courage',
  },
  {
    reference: 'Nahum 1:7',
    book: 'Nahum', bookSlug: 'nahum', chapter: 1, verse: 7,
    text: 'The LORD is good, a strong hold in the day of trouble; and he knoweth them that trust in him.',
    theme: 'Refuge', themeSlug: 'refuge',
  },
  {
    reference: 'Psalm 62:1\u20132',
    book: 'Psalms', bookSlug: 'psalms', chapter: 62, verse: 1, endVerse: 2,
    text: 'Truly my soul waiteth upon God: from him cometh my salvation. He only is my rock and my salvation; he is my defence; I shall not be greatly moved.',
    theme: 'Rest', themeSlug: 'rest',
  },
  {
    reference: 'Isaiah 40:31',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 40, verse: 31,
    text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
    theme: 'Renewed Strength', themeSlug: 'renewed-strength',
  },
  {
    reference: 'Psalm 34:17\u201318',
    book: 'Psalms', bookSlug: 'psalms', chapter: 34, verse: 17, endVerse: 18,
    text: 'The righteous cry, and the LORD heareth, and delivereth them out of all their troubles. The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.',
    theme: 'Comfort', themeSlug: 'comfort',
  },
  {
    reference: 'Lamentations 3:22\u201323',
    book: 'Lamentations', bookSlug: 'lamentations', chapter: 3, verse: 22, endVerse: 23,
    text: 'It is of the LORD\u2019s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.',
    theme: 'God\'s Faithfulness', themeSlug: 'gods-faithfulness',
  },
  {
    reference: 'Romans 15:13',
    book: 'Romans', bookSlug: 'romans', chapter: 15, verse: 13,
    text: 'Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.',
    theme: 'Hope', themeSlug: 'hope',
  },
  {
    reference: 'Psalm 139:23\u201324',
    book: 'Psalms', bookSlug: 'psalms', chapter: 139, verse: 23, endVerse: 24,
    text: 'Search me, O God, and know my heart: try me, and know my thoughts: And see if there be any wicked way in me, and lead me in the way everlasting.',
    theme: 'Self-Examination', themeSlug: 'self-examination',
  },
  {
    reference: 'Colossians 3:15',
    book: 'Colossians', bookSlug: 'colossians', chapter: 3, verse: 15,
    text: 'And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful.',
    theme: 'Peace', themeSlug: 'peace',
  },
  {
    reference: 'James 1:2\u20134',
    book: 'James', bookSlug: 'james', chapter: 1, verse: 2, endVerse: 4,
    text: 'My brethren, count it all joy when ye fall into divers temptations; Knowing this, that the trying of your faith worketh patience. But let patience have her perfect work, that ye may be perfect and entire, wanting nothing.',
    theme: 'Perseverance', themeSlug: 'perseverance',
  },
  {
    reference: '1 John 4:18',
    book: '1 John', bookSlug: '1-john', chapter: 4, verse: 18,
    text: 'There is no fear in love; but perfect love casteth out fear: because fear hath torment. He that feareth is not made perfect in love.',
    theme: 'Love', themeSlug: 'love',
  },
  {
    reference: 'Psalm 42:11',
    book: 'Psalms', bookSlug: 'psalms', chapter: 42, verse: 11,
    text: 'Why art thou cast down, O my soul? and why art thou disquieted within me? hope thou in God: for I shall yet praise him, who is the health of my countenance, and my God.',
    theme: 'Hope', themeSlug: 'hope',
  },
  {
    reference: 'Mark 4:39\u201340',
    book: 'Mark', bookSlug: 'mark', chapter: 4, verse: 39, endVerse: 40,
    text: 'And he arose, and rebuked the wind, and said unto the sea, Peace, be still. And the wind ceased, and there was a great calm. And he said unto them, Why are ye so fearful? how is it that ye have no faith?',
    theme: 'Faith', themeSlug: 'faith',
  },
  {
    reference: '2 Thessalonians 3:16',
    book: '2 Thessalonians', bookSlug: '2-thessalonians', chapter: 3, verse: 16,
    text: 'Now the Lord of peace himself give you peace always by all means. The Lord be with you all.',
    theme: 'Peace', themeSlug: 'peace',
  },
  {
    reference: 'Psalm 103:1\u20135',
    book: 'Psalms', bookSlug: 'psalms', chapter: 103, verse: 1, endVerse: 5,
    text: 'Bless the LORD, O my soul: and all that is within me, bless his holy name. Bless the LORD, O my soul, and forget not all his benefits: Who forgiveth all thine iniquities; who healeth all thy diseases; Who redeemeth thy life from destruction; who crowneth thee with lovingkindness and tender mercies; Who satisfieth thy mouth with good things; so that thy youth is renewed like the eagle\u2019s.',
    theme: 'Gratitude', themeSlug: 'gratitude',
  },
  {
    reference: 'Psalm 4:8',
    book: 'Psalms', bookSlug: 'psalms', chapter: 4, verse: 8,
    text: 'I will both lay me down in peace, and sleep: for thou, LORD, only makest me dwell in safety.',
    theme: 'Rest', themeSlug: 'rest',
  },
  {
    reference: 'Isaiah 35:4',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 35, verse: 4,
    text: 'Say to them that are of a fearful heart, Be strong, fear not: behold, your God will come with vengeance, even God with a recompence; he will come and save you.',
    theme: 'Courage', themeSlug: 'courage',
  },
  {
    reference: 'Philippians 4:8',
    book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 8,
    text: 'Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things.',
    theme: 'Peace of Mind', themeSlug: 'peace-of-mind',
  },
  {
    reference: 'Psalm 9:9\u201310',
    book: 'Psalms', bookSlug: 'psalms', chapter: 9, verse: 9, endVerse: 10,
    text: 'The LORD also will be a refuge for the oppressed, a refuge in times of trouble. And they that know thy name will put their trust in thee: for thou, LORD, hast not forsaken them that seek thee.',
    theme: 'Refuge', themeSlug: 'refuge',
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

function verseUrl(v: AnxietyVerse): string {
  return `/verses/${v.bookSlug}/${v.chapter}/${v.verse}`;
}

function getUniqueThemes(verses: AnxietyVerse[]): string[] {
  return [...new Set(verses.map(v => v.theme))];
}

/** Count unique books */
function getUniqueBooks(): number {
  const seen = new Set<string>();
  for (const v of ANXIETY_VERSES) {
    seen.add(v.bookSlug);
  }
  return seen.size;
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Bible Verses About Anxiety \u2014 50 KJV Scriptures for When Worry Won\u2019t Stop, Fear Takes Over & You Need God\u2019s Peace That Passes Understanding',
  description:
    'Find 50 Bible verses about anxiety in the King James Version. Scriptures for worry, fear, panic, and anxious thoughts \u2014 from Philippians 4:6\u20137 to Psalm 55:22. Full KJV text, themes, study links, and chapter quizzes for every verse.',
  keywords: [
    'bible verses about anxiety', 'scriptures for anxiety and fear', 'bible verses for worry',
    'peace of mind bible verses', 'anxiety bible verses KJV', 'God\'s peace', 'casting your cares',
    'do not worry scripture', 'bible verses about fear', 'calming bible verses',
    'scriptures for anxious thoughts', 'what does the bible say about worry',
    'bible verses for panic attacks', 'Christian anxiety help', 'KJV verses for anxiety',
  ],
  openGraph: {
    title: 'Bible Verses About Anxiety | 50 Calming KJV Scriptures for Worry, Fear & Peace',
    description: '50 Bible verses about anxiety from the King James Version. Scriptures for worry, fear, panic, and anxious thoughts that won\'t stop.',
    url: '/bible-verses-about-anxiety',
    type: 'website',
  },
  alternates: { canonical: '/bible-verses-about-anxiety' },
};

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function BibleVersesAboutAnxietyPage() {
  const themes = getUniqueThemes(ANXIETY_VERSES);
  const booksCount = getUniqueBooks();
  const otVerses = ANXIETY_VERSES.filter(v => OT_SLUGS.includes(v.bookSlug));
  const ntVerses = ANXIETY_VERSES.filter(v => !OT_SLUGS.includes(v.bookSlug));

  // --- Structured Data ---

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Verses About Anxiety',
    description: metadata.description,
    url: 'https://biblemaximum.com/bible-verses-about-anxiety',
    numberOfItems: ANXIETY_VERSES.length,
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
      { '@type': 'ListItem', position: 3, name: 'Bible Verses About Anxiety' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best Bible verse for anxiety?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Philippians 4:6\u20137 is widely considered the most directly applicable Bible verse for anxiety: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus." It names the problem (anxious care), gives the solution (prayer with thanksgiving), and promises the result (supernatural peace). Other top verses include 1 Peter 5:7, Psalm 55:22, Isaiah 41:10, and Psalm 56:3.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the Bible say anxiety is a sin?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Bible never labels anxiety as a sin in the way it labels lying, stealing, or idolatry. Philippians 4:6 commands believers to "be careful for nothing," but the context is pastoral encouragement, not condemnation. David, Elijah, and even Jesus experienced intense anguish and anxiety. The Bible treats anxiety as a real human struggle and consistently points believers toward God as the remedy \u2014 through prayer, trust, and meditating on His promises \u2014 rather than heaping guilt on those who experience it.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does "casting all your care upon him" mean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '1 Peter 5:7 says "Casting all your care upon him; for he careth for you." The Greek word for "casting" (epirrhipto) means to throw upon, like throwing a heavy pack off your back onto someone stronger. It is a deliberate, active choice to transfer your worries, fears, and anxieties to God through prayer. The reason you can do this, Peter says, is that God genuinely cares about what you are carrying. It is not passive denial. It is an act of faith that says: "I cannot carry this, but You can."',
        },
      },
      {
        '@type': 'Question',
        name: 'How many times does the Bible say "do not fear"?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The exact count varies by translation and how you count variations like "fear not," "be not afraid," "do not be afraid," and "be not dismayed." In the King James Version, the phrase "fear not" appears over 60 times, and when you include related commands like "be not afraid" and "be not dismayed," the total climbs above 100. The popular claim of 365 times (one for each day) is an approximation that includes all variations and related phrases across all translations. The point remains: God repeatedly tells His people not to be afraid.',
        },
      },
      {
        '@type': 'Question',
        name: 'What Psalm helps with anxiety?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Several Psalms directly address anxiety and fear. Psalm 23 is the most well-known, with its promise of God\u2019s presence even in "the valley of the shadow of death." Psalm 46 declares God is "a very present help in trouble." Psalm 55:22 instructs you to "cast thy burden upon the LORD." Psalm 56:3 offers one of the shortest, most powerful prayers for anxious moments: "What time I am afraid, I will trust in thee." Psalm 94:19 speaks directly to racing thoughts: "In the multitude of my thoughts within me thy comforts delight my soul." And Psalm 34:4 is a testimony of answered prayer: "I sought the LORD, and he heard me, and delivered me from all my fears."',
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={collectionSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      <Breadcrumb items={[{ label: 'Bible Quotes', href: '/bible-quotes' }, { label: 'Bible Verses About Anxiety' }]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mt-6 mb-8">
              <div className="relative h-48 md:h-56 bg-gradient-to-r from-slate-800 to-slate-900">
                <Image
                  src="/images/peaceful-bible.jpg"
                  alt="Bible Verses About Anxiety — Open Bible with peaceful light"
                  fill
                  className="object-cover opacity-25"
                  priority
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                    Bible Verses About Anxiety
                  </h1>
                  <p className="text-slate-200 max-w-2xl mb-4">
                    50 KJV scriptures for worry, fear, panic, and anxious thoughts -- God&apos;s
                    peace that passes understanding, right when you need it most.
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
              When Anxiety Won&apos;t Let Go, Scripture Can
            </h2>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              It&apos;s 2:47 AM. Your mind is racing through tomorrow&apos;s problems
              -- the meeting you&apos;re not prepared for, the bill you&apos;re not sure
              you can cover, the relationship that feels like it&apos;s unraveling one
              awkward silence at a time. You&apos;ve tried deep breathing. You&apos;ve
              tried counting backward from a hundred. Your chest is still tight. Sound
              familiar? You&apos;re not alone. Not even close.
            </p>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              Anxiety affects roughly 40 million American adults every year, according to
              the National Institute of Mental Health. That&apos;s nearly 1 in 5 people.
              And here&apos;s the thing -- the Bible addresses worry, fear, and anxious
              thoughts over 365 times across both Testaments. God clearly knew we&apos;d
              need the reminder. Repeatedly. The <em>bible verses about anxiety</em>{' '}
              gathered on this page are not a substitute for professional help when you
              need it (and sometimes you do -- there is no shame in that). But they are
              something medicine cannot provide: the direct words of the God who made you,
              spoken into the exact thing that keeps you up at night.
            </p>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              There&apos;s a difference between everyday worry and clinical anxiety
              disorder, and Scripture does not dismiss either one. David wrote Psalm 56:3
              while enemy soldiers were hunting him down in real time. Elijah collapsed
              under a tree begging God to end his life -- right after the greatest victory
              of his ministry. Jesus sweat drops of blood in Gethsemane. These are not
              people who lacked faith. They were the heroes of it. And they were terrified.
            </p>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              And honestly? Modern research is catching up to what believers have known for
              centuries. A Duke University study on prayer and meditation found that focused
              scriptural meditation activates the parasympathetic nervous system -- the
              body&apos;s built-in &ldquo;rest and digest&rdquo; response. When you read
              {' '}<em>scriptures for anxiety and fear</em> and deliberately meditate on them,
              your heart rate slows, your cortisol levels drop, and the panic loosens its grip.
              Paul wrote &ldquo;Be careful for nothing&rdquo; two thousand years before
              anyone had a word for the parasympathetic nervous system. But the mechanism
              God designed into your body was already there, waiting for His Word to
              activate it.
            </p>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              The 50 <em>anxiety bible verses KJV</em> below cover every angle. Some are
              about <em>casting your cares</em> onto a God who is strong enough to carry
              them. Some are about the <em>peace of mind bible verses</em> that promise
              a calm you cannot manufacture on your own. Some are raw, honest cries from
              people in the middle of the storm -- and those might be the ones that help
              the most, because they prove that faith and fear can exist in the same heart
              at the same time.
            </p>
            <p className="text-primary-dark/80 leading-relaxed">
              Each verse links to a full study page with cross-references, original
              language insights, and a chapter quiz so you can test how well you know the
              passage. Whether it&apos;s the middle of the night or you&apos;re sitting
              in a parking lot trying to breathe before you walk inside, these are the{' '}
              <em>do not worry scriptures</em> God gave you. Read them slowly. Pray them
              back to Him. Let them do what they were written to do.
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
            {ANXIETY_VERSES.map((verse, idx) => (
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
              How Well Do You Know These Anxiety Verses? Take a Quiz.
            </h2>
            <p className="text-blue-100 mb-4 max-w-2xl">
              Put your Bible knowledge to the test with chapter quizzes from Psalms,
              Philippians, Matthew, Isaiah, and more. 15 questions per quiz with
              instant scoring and verse-by-verse explanations.
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
              Anxiety Verses by Testament
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
                <h3 className="font-bold text-scripture mb-1">What is the best Bible verse for anxiety?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  If you need one verse to hold onto when anxiety hits, Philippians
                  4:6&ndash;7 is the one most Christians reach for: &ldquo;Be careful
                  for nothing; but in every thing by prayer and supplication with
                  thanksgiving let your requests be made known unto God. And the peace
                  of God, which passeth all understanding, shall keep your hearts and
                  minds through Christ Jesus.&rdquo; It names the problem, gives the
                  solution, and promises the result -- all in two verses. But honestly,
                  the &ldquo;best&rdquo; verse depends on what you are feeling right now.
                  At 2 AM when you cannot sleep, Psalm 4:8 might hit harder. When raw
                  fear is the dominant emotion, Psalm 56:3 is only eight words long and
                  you can whisper it in a single breath. When you feel completely alone,
                  1 Peter 5:7 reminds you that God genuinely cares about what you are
                  carrying.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">Does the Bible say anxiety is a sin?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  No. The Bible never categorizes anxiety the way it categorizes lying,
                  theft, or idolatry. Philippians 4:6 tells believers to &ldquo;be
                  careful for nothing,&rdquo; but the context is pastoral care, not
                  condemnation. Paul is writing to friends from a Roman prison. He is
                  comforting them, not scolding them. Think about the people in Scripture
                  who experienced anxiety: David hiding in caves, Elijah begging God to
                  let him die, Jesus sweating blood in Gethsemane. God never rebuked any
                  of them for feeling afraid. He met them in it. He fed Elijah and let
                  him sleep. He sent an angel to strengthen Jesus. He wrote David&apos;s
                  raw, anxious prayers into the Bible and preserved them for three
                  thousand years so that you could read them tonight and know you are
                  not alone. That is not how God treats sin. That is how God treats
                  suffering.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What does &ldquo;casting all your care upon him&rdquo; mean?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  1 Peter 5:7 says &ldquo;Casting all your care upon him; for he careth
                  for you.&rdquo; The Greek word for &ldquo;casting&rdquo; is{' '}
                  <em>epirrhipto</em>. It means to throw something onto someone else --
                  like heaving a heavy pack off your shoulders and onto someone far
                  stronger. It is the same word used in Luke 19:35 when the disciples
                  threw their garments on the donkey for Jesus to ride. So this is not
                  passive. It is not &ldquo;try not to think about it.&rdquo; It is a
                  deliberate, physical act of faith: handing your worries, your fears,
                  your 2 AM spirals to a God who says He can carry them. And the reason
                  you can do it? Peter gives it right there: &ldquo;for he careth for
                  you.&rdquo; He is not indifferent to what you are going through. He
                  invites you to throw it on Him because He genuinely cares.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">How many times does the Bible say &ldquo;do not fear&rdquo;?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  You have probably heard the claim that the Bible says &ldquo;do not
                  fear&rdquo; 365 times -- one for every day of the year. That number
                  is an approximation. The exact count depends on which translation you
                  use and how broadly you define the phrase. In the King James Version,
                  &ldquo;fear not&rdquo; appears over 60 times. Add in &ldquo;be not
                  afraid,&rdquo; &ldquo;be not dismayed,&rdquo; &ldquo;be of good
                  courage,&rdquo; and similar commands, and the total climbs past 100.
                  Factor in every passage where God comforts, reassures, or promises His
                  presence in the face of danger, and 365 becomes a reasonable
                  estimate. The exact number matters less than the pattern: God tells
                  His people not to be afraid over and over and over again. He knew we
                  would need to hear it that many times. Every single time.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What Psalm helps with anxiety?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  Several Psalms speak directly into anxiety and fear. Psalm 23 is the
                  most well-known -- &ldquo;though I walk through the valley of the
                  shadow of death, I will fear no evil: for thou art with me.&rdquo;
                  Psalm 46 opens with &ldquo;God is our refuge and strength, a very
                  present help in trouble&rdquo; and later commands, &ldquo;Be still,
                  and know that I am God.&rdquo; Psalm 55:22 gives a direct instruction:
                  &ldquo;Cast thy burden upon the LORD, and he shall sustain thee.&rdquo;
                  Psalm 56:3 is one of the shortest prayers in the Bible -- eight words
                  you can say in a breath: &ldquo;What time I am afraid, I will trust
                  in thee.&rdquo; Psalm 94:19 names the experience of racing thoughts:
                  &ldquo;In the multitude of my thoughts within me thy comforts delight
                  my soul.&rdquo; And Psalm 34:4 is a testimony of answered prayer:
                  &ldquo;I sought the LORD, and he heard me, and delivered me from all
                  my fears.&rdquo; Start with whichever one meets you where you are
                  right now.
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
              Deepen your Bible study with quizzes, verse collections, devotionals, and more.
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
                href="/bible-verses-about-strength-in-hard-times"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Verses About Strength</span>
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
