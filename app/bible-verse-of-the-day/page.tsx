import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

interface DailyVerse {
  reference: string;
  book: string;
  bookSlug: string;
  chapter: number;
  verse: number;
  endVerse?: number;
  text: string;
  theme: string;
  themeSlug: string;
  month: number; // 1-12
}

const DAILY_VERSES: DailyVerse[] = [
  // ── January: New Beginnings & Hope ──
  { reference: 'Lamentations 3:22\u201323', book: 'Lamentations', bookSlug: 'lamentations', chapter: 3, verse: 22, endVerse: 23, text: 'It is of the LORD\u2019s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.', theme: 'Faithfulness', themeSlug: 'gods-promises', month: 1 },
  { reference: 'Isaiah 43:19', book: 'Isaiah', bookSlug: 'isaiah', chapter: 43, verse: 19, text: 'Behold, I will do a new thing; now it shall spring forth; shall ye not know it? I will even make a way in the wilderness, and rivers in the desert.', theme: 'New Beginnings', themeSlug: 'hope', month: 1 },
  { reference: 'Jeremiah 29:11', book: 'Jeremiah', bookSlug: 'jeremiah', chapter: 29, verse: 11, text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.', theme: 'Hope', themeSlug: 'hope', month: 1 },
  { reference: 'Philippians 3:13\u201314', book: 'Philippians', bookSlug: 'philippians', chapter: 3, verse: 13, endVerse: 14, text: 'Brethren, I count not myself to have apprehended: but this one thing I do, forgetting those things which are behind, and reaching forth unto those things which are before, I press toward the mark for the prize of the high calling of God in Christ Jesus.', theme: 'Perseverance', themeSlug: 'perseverance', month: 1 },
  { reference: 'Psalm 37:4', book: 'Psalms', bookSlug: 'psalms', chapter: 37, verse: 4, text: 'Delight thyself also in the LORD; and he shall give thee the desires of thine heart.', theme: 'Desire', themeSlug: 'faith', month: 1 },
  // ── February: Love ──
  { reference: 'John 3:16', book: 'John', bookSlug: 'john', chapter: 3, verse: 16, text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', theme: 'Salvation', themeSlug: 'salvation', month: 2 },
  { reference: '1 Corinthians 13:4\u20137', book: '1 Corinthians', bookSlug: '1-corinthians', chapter: 13, verse: 4, endVerse: 7, text: 'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil; Rejoiceth not in iniquity, but rejoiceth in the truth; Beareth all things, believeth all things, hopeth all things, endureth all things.', theme: 'Love', themeSlug: 'love', month: 2 },
  { reference: '1 John 4:19', book: '1 John', bookSlug: '1-john', chapter: 4, verse: 19, text: 'We love him, because he first loved us.', theme: 'Love', themeSlug: 'love', month: 2 },
  { reference: 'Romans 5:8', book: 'Romans', bookSlug: 'romans', chapter: 5, verse: 8, text: 'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.', theme: 'Love', themeSlug: 'love', month: 2 },
  { reference: 'Romans 8:38\u201339', book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 38, endVerse: 39, text: 'For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.', theme: 'Eternal Love', themeSlug: 'love', month: 2 },
  // ── March: Strength & Courage ──
  { reference: 'Philippians 4:13', book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 13, text: 'I can do all things through Christ which strengtheneth me.', theme: 'Strength', themeSlug: 'strength', month: 3 },
  { reference: 'Joshua 1:9', book: 'Joshua', bookSlug: 'joshua', chapter: 1, verse: 9, text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.', theme: 'Courage', themeSlug: 'courage', month: 3 },
  { reference: 'Isaiah 41:10', book: 'Isaiah', bookSlug: 'isaiah', chapter: 41, verse: 10, text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.', theme: 'Courage', themeSlug: 'courage', month: 3 },
  { reference: 'Deuteronomy 31:6', book: 'Deuteronomy', bookSlug: 'deuteronomy', chapter: 31, verse: 6, text: 'Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.', theme: 'Courage', themeSlug: 'courage', month: 3 },
  { reference: '2 Timothy 1:7', book: '2 Timothy', bookSlug: '2-timothy', chapter: 1, verse: 7, text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.', theme: 'Power', themeSlug: 'strength', month: 3 },
  // ── April: Resurrection & Salvation ──
  { reference: 'John 11:25\u201326', book: 'John', bookSlug: 'john', chapter: 11, verse: 25, endVerse: 26, text: 'Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live: And whosoever liveth and believeth in me shall never die.', theme: 'Resurrection', themeSlug: 'eternal-life', month: 4 },
  { reference: 'Romans 6:23', book: 'Romans', bookSlug: 'romans', chapter: 6, verse: 23, text: 'For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.', theme: 'Salvation', themeSlug: 'salvation', month: 4 },
  { reference: 'Ephesians 2:8\u20139', book: 'Ephesians', bookSlug: 'ephesians', chapter: 2, verse: 8, endVerse: 9, text: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.', theme: 'Grace', themeSlug: 'grace', month: 4 },
  { reference: 'Romans 10:9', book: 'Romans', bookSlug: 'romans', chapter: 10, verse: 9, text: 'That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.', theme: 'Confession', themeSlug: 'salvation', month: 4 },
  { reference: 'John 14:6', book: 'John', bookSlug: 'john', chapter: 14, verse: 6, text: 'Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.', theme: 'Truth', themeSlug: 'jesus', month: 4 },
  // ── May: Guidance & Wisdom ──
  { reference: 'Proverbs 3:5\u20136', book: 'Proverbs', bookSlug: 'proverbs', chapter: 3, verse: 5, endVerse: 6, text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.', theme: 'Trust', themeSlug: 'trust', month: 5 },
  { reference: 'Psalm 119:105', book: 'Psalms', bookSlug: 'psalms', chapter: 119, verse: 105, text: 'Thy word is a lamp unto my feet, and a light unto my path.', theme: 'Guidance', themeSlug: 'wisdom', month: 5 },
  { reference: 'James 1:5', book: 'James', bookSlug: 'james', chapter: 1, verse: 5, text: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.', theme: 'Wisdom', themeSlug: 'wisdom', month: 5 },
  { reference: 'Psalm 32:8', book: 'Psalms', bookSlug: 'psalms', chapter: 32, verse: 8, text: 'I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye.', theme: 'Guidance', themeSlug: 'wisdom', month: 5 },
  { reference: 'Matthew 6:33', book: 'Matthew', bookSlug: 'matthew', chapter: 6, verse: 33, text: 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.', theme: 'Priorities', themeSlug: 'faith', month: 5 },
  // ── June: Peace & Rest ──
  { reference: 'Philippians 4:6\u20137', book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 6, endVerse: 7, text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.', theme: 'Peace', themeSlug: 'peace', month: 6 },
  { reference: 'Matthew 11:28', book: 'Matthew', bookSlug: 'matthew', chapter: 11, verse: 28, text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.', theme: 'Rest', themeSlug: 'comfort', month: 6 },
  { reference: 'John 14:27', book: 'John', bookSlug: 'john', chapter: 14, verse: 27, text: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.', theme: 'Peace', themeSlug: 'peace', month: 6 },
  { reference: 'Isaiah 26:3', book: 'Isaiah', bookSlug: 'isaiah', chapter: 26, verse: 3, text: 'Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.', theme: 'Peace', themeSlug: 'peace', month: 6 },
  { reference: 'Psalm 46:10', book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 10, text: 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.', theme: 'Stillness', themeSlug: 'peace', month: 6 },
  // ── July: Faith & Trust ──
  { reference: 'Hebrews 11:1', book: 'Hebrews', bookSlug: 'hebrews', chapter: 11, verse: 1, text: 'Now faith is the substance of things hoped for, the evidence of things not seen.', theme: 'Faith', themeSlug: 'faith', month: 7 },
  { reference: 'Romans 8:28', book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 28, text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', theme: 'Providence', themeSlug: 'gods-promises', month: 7 },
  { reference: 'Mark 10:27', book: 'Mark', bookSlug: 'mark', chapter: 10, verse: 27, text: 'And Jesus looking upon them saith, With men it is impossible, but not with God: for with God all things are possible.', theme: 'Faith', themeSlug: 'faith', month: 7 },
  { reference: 'Psalm 56:3', book: 'Psalms', bookSlug: 'psalms', chapter: 56, verse: 3, text: 'What time I am afraid, I will trust in thee.', theme: 'Trust', themeSlug: 'trust', month: 7 },
  { reference: 'Hebrews 12:1\u20132', book: 'Hebrews', bookSlug: 'hebrews', chapter: 12, verse: 1, endVerse: 2, text: 'Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight, and the sin which doth so easily beset us, and let us run with patience the race that is set before us, Looking unto Jesus the author and finisher of our faith.', theme: 'Perseverance', themeSlug: 'perseverance', month: 7 },
  // ── August: Comfort & Protection ──
  { reference: 'Psalm 23:1', book: 'Psalms', bookSlug: 'psalms', chapter: 23, verse: 1, text: 'The LORD is my shepherd; I shall not want.', theme: 'Comfort', themeSlug: 'comfort', month: 8 },
  { reference: 'Psalm 23:4', book: 'Psalms', bookSlug: 'psalms', chapter: 23, verse: 4, text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.', theme: 'Comfort', themeSlug: 'comfort', month: 8 },
  { reference: 'Psalm 46:1', book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 1, text: 'God is our refuge and strength, a very present help in trouble.', theme: 'Refuge', themeSlug: 'comfort', month: 8 },
  { reference: 'Psalm 91:1', book: 'Psalms', bookSlug: 'psalms', chapter: 91, verse: 1, text: 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.', theme: 'Protection', themeSlug: 'protection', month: 8 },
  { reference: 'Isaiah 43:2', book: 'Isaiah', bookSlug: 'isaiah', chapter: 43, verse: 2, text: 'When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee: when thou walkest through the fire, thou shalt not be burned; neither shall the flame kindle upon thee.', theme: 'Protection', themeSlug: 'protection', month: 8 },
  // ── September: Prayer & Gratitude ──
  { reference: 'Matthew 7:7', book: 'Matthew', bookSlug: 'matthew', chapter: 7, verse: 7, text: 'Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.', theme: 'Prayer', themeSlug: 'prayer', month: 9 },
  { reference: '1 Thessalonians 5:16\u201318', book: '1 Thessalonians', bookSlug: '1-thessalonians', chapter: 5, verse: 16, endVerse: 18, text: 'Rejoice evermore. Pray without ceasing. In every thing give thanks: for this is the will of God in Christ Jesus concerning you.', theme: 'Gratitude', themeSlug: 'praise', month: 9 },
  { reference: 'Psalm 100:4\u20135', book: 'Psalms', bookSlug: 'psalms', chapter: 100, verse: 4, endVerse: 5, text: 'Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name. For the LORD is good; his mercy is everlasting; and his truth endureth to all generations.', theme: 'Thanksgiving', themeSlug: 'praise', month: 9 },
  { reference: '1 Peter 5:7', book: '1 Peter', bookSlug: '1-peter', chapter: 5, verse: 7, text: 'Casting all your care upon him; for he careth for you.', theme: 'Anxiety', themeSlug: 'worry', month: 9 },
  { reference: 'Psalm 118:24', book: 'Psalms', bookSlug: 'psalms', chapter: 118, verse: 24, text: 'This is the day which the LORD hath made; we will rejoice and be glad in it.', theme: 'Joy', themeSlug: 'joy', month: 9 },
  // ── October: God's Word & Scripture ──
  { reference: 'Hebrews 4:12', book: 'Hebrews', bookSlug: 'hebrews', chapter: 4, verse: 12, text: 'For the word of God is quick, and powerful, and sharper than any twoedged sword, piercing even to the dividing asunder of soul and spirit, and of the joints and marrow, and is a discerner of the thoughts and intents of the heart.', theme: 'Scripture', themeSlug: 'bible', month: 10 },
  { reference: 'Romans 12:2', book: 'Romans', bookSlug: 'romans', chapter: 12, verse: 2, text: 'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.', theme: 'Transformation', themeSlug: 'faith', month: 10 },
  { reference: 'Philippians 4:8', book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 8, text: 'Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things.', theme: 'Thought Life', themeSlug: 'wisdom', month: 10 },
  { reference: 'Psalm 139:14', book: 'Psalms', bookSlug: 'psalms', chapter: 139, verse: 14, text: 'I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.', theme: 'Identity', themeSlug: 'praise', month: 10 },
  { reference: 'John 1:1', book: 'John', bookSlug: 'john', chapter: 1, verse: 1, text: 'In the beginning was the Word, and the Word was with God, and the Word was God.', theme: 'Deity of Christ', themeSlug: 'jesus', month: 10 },
  // ── November: Forgiveness & Grace ──
  { reference: '1 John 1:9', book: '1 John', bookSlug: '1-john', chapter: 1, verse: 9, text: 'If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.', theme: 'Forgiveness', themeSlug: 'forgiveness', month: 11 },
  { reference: 'Ephesians 4:32', book: 'Ephesians', bookSlug: 'ephesians', chapter: 4, verse: 32, text: 'And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ\u2019s sake hath forgiven you.', theme: 'Forgiveness', themeSlug: 'forgiveness', month: 11 },
  { reference: 'Psalm 103:12', book: 'Psalms', bookSlug: 'psalms', chapter: 103, verse: 12, text: 'As far as the east is from the west, so far hath he removed our transgressions from us.', theme: 'Forgiveness', themeSlug: 'forgiveness', month: 11 },
  { reference: '2 Corinthians 12:9', book: '2 Corinthians', bookSlug: '2-corinthians', chapter: 12, verse: 9, text: 'And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me.', theme: 'Grace', themeSlug: 'grace', month: 11 },
  { reference: '2 Corinthians 5:17', book: '2 Corinthians', bookSlug: '2-corinthians', chapter: 5, verse: 17, text: 'Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.', theme: 'New Life', themeSlug: 'salvation', month: 11 },
  // ── December: Eternal Life & Promise ──
  { reference: 'John 10:10', book: 'John', bookSlug: 'john', chapter: 10, verse: 10, text: 'The thief cometh not, but for to steal, and to kill, and to destroy: I am come that they might have life, and that they might have it more abundantly.', theme: 'Abundant Life', themeSlug: 'life', month: 12 },
  { reference: 'Revelation 21:4', book: 'Revelation', bookSlug: 'revelation', chapter: 21, verse: 4, text: 'And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.', theme: 'Eternity', themeSlug: 'heaven', month: 12 },
  { reference: 'Philippians 1:6', book: 'Philippians', bookSlug: 'philippians', chapter: 1, verse: 6, text: 'Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ.', theme: 'Assurance', themeSlug: 'gods-promises', month: 12 },
  { reference: 'Psalm 23:6', book: 'Psalms', bookSlug: 'psalms', chapter: 23, verse: 6, text: 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.', theme: 'Blessing', themeSlug: 'gods-promises', month: 12 },
  { reference: 'Hebrews 13:8', book: 'Hebrews', bookSlug: 'hebrews', chapter: 13, verse: 8, text: 'Jesus Christ the same yesterday, and to day, and for ever.', theme: 'Unchanging God', themeSlug: 'jesus', month: 12 },
];
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTH_THEMES = ['New Beginnings & Hope','Love','Strength & Courage','Resurrection & Salvation','Guidance & Wisdom','Peace & Rest','Faith & Trust','Comfort & Protection','Prayer & Gratitude','God\u2019s Word & Scripture','Forgiveness & Grace','Eternal Life & Promise'];
const OT_SLUGS = ['genesis','exodus','leviticus','numbers','deuteronomy','joshua','judges','ruth','1-samuel','2-samuel','1-kings','2-kings','1-chronicles','2-chronicles','ezra','nehemiah','esther','job','psalms','proverbs','ecclesiastes','song-of-solomon','isaiah','jeremiah','lamentations','ezekiel','daniel','hosea','joel','amos','obadiah','jonah','micah','nahum','habakkuk','zephaniah','haggai','zechariah','malachi'];

function verseUrl(v: DailyVerse): string {
  return `/verses/${v.bookSlug}/${v.chapter}/${v.verse}`;
}

function getTodaysVerse(): DailyVerse {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
}

function getUniqueThemes(): string[] {
  const seen = new Set<string>();
  for (const v of DAILY_VERSES) seen.add(v.theme);
  return Array.from(seen);
}

export const metadata: Metadata = {
  title: 'Bible Verse of the Day \u2014 Today\u2019s Daily Scripture Reading, Devotional Verse & Inspirational KJV Passage for Every Day of the Year',
  description:
    'Get your Bible verse of the day with full KJV text. 60 curated daily scriptures organized by month for daily devotional reading, prayer, and memorization. Start each morning with God\u2019s Word \u2014 encouragement, comfort, and strength from the King James Bible.',
  keywords: [
    'bible verse of the day', 'daily bible verse', 'today bible verse', 'verse of the day',
    'daily scripture', 'daily devotional verse', 'morning bible verse', 'inspirational bible verse today',
    'KJV verse of the day', 'bible verse for today', 'scripture of the day', 'daily bible reading',
  ],
  openGraph: {
    title: 'Bible Verse of the Day \u2014 Daily KJV Scripture & Devotional Reading',
    description: 'Start each day with an inspirational Bible verse. 60 curated daily scriptures organized by month from the King James Version.',
    url: '/bible-verse-of-the-day',
    type: 'website',
  },
  alternates: { canonical: '/bible-verse-of-the-day' },
};

export default function BibleVerseOfTheDayPage() {
  const todaysVerse = getTodaysVerse();
  const themes = getUniqueThemes();
  const uniqueBooks = new Set(DAILY_VERSES.map(v => v.bookSlug));

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bible Quotes', item: 'https://biblemaximum.com/bible-quotes' },
      { '@type': 'ListItem', position: 3, name: 'Bible Verse of the Day' },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: 'Bible Verse of the Day', description: metadata.description,
    url: 'https://biblemaximum.com/bible-verse-of-the-day', numberOfItems: DAILY_VERSES.length,
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
  };

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is the Bible verse of the day?', acceptedAnswer: { '@type': 'Answer', text: 'The Bible verse of the day is a single scripture passage selected for daily devotional reading, prayer, and meditation. Popular apps like YouVersion and websites like BibleGateway feature a daily verse to encourage Christians to engage with God\u2019s Word every day. Our curated collection offers 60 verses organized by monthly themes from the King James Version.' } },
      { '@type': 'Question', name: 'How do I start reading a Bible verse every day?', acceptedAnswer: { '@type': 'Answer', text: 'Start by bookmarking this page and reading the featured verse each morning. Write the verse in a journal, meditate on its meaning during the day, and pray about how it applies to your life. Many Christians pair their daily verse with a short devotional reading or a chapter of the Bible for deeper study.' } },
      { '@type': 'Question', name: 'What is the best Bible verse to read every morning?', acceptedAnswer: { '@type': 'Answer', text: 'Lamentations 3:22\u201323 is one of the best morning scriptures: "It is of the LORD\u2019s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness." Psalm 118:24 and Psalm 119:105 are also powerful morning verses that set the tone for the day ahead.' } },
      { '@type': 'Question', name: 'What Bible version are these daily verses from?', acceptedAnswer: { '@type': 'Answer', text: 'All daily verses on this page are from the King James Version (KJV), first published in 1611. The KJV remains one of the most beloved and memorized English Bible translations, known for its literary beauty and faithfulness to the original manuscripts.' } },
      { '@type': 'Question', name: 'Can I use these verses for daily devotionals?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. These 60 verses are organized into 12 monthly themes \u2014 from New Beginnings in January to Eternal Promise in December. Each verse includes links to full study pages, chapter quizzes, and related Bible quotes so you can go deeper in your daily devotional practice.' } },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={collectionSchema} />
      <StructuredData data={faqSchema} />

      <Breadcrumb items={[
        { label: 'Bible Quotes', href: '/bible-quotes' },
        { label: 'Bible Verse of the Day' },
      ]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero */}
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mt-6 mb-8">
              <div className="relative h-48 md:h-56 bg-gradient-to-r from-amber-800 to-amber-900">
                <Image src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png" alt="Bible Verse of the Day" fill className="object-cover opacity-25" priority />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Bible Verse of the Day</h1>
                  <p className="text-amber-100 max-w-2xl mb-4">Start each day with an inspirational scripture from the King James Bible. 60 curated daily verses organized by monthly themes for year-round devotional reading.</p>
                  <Link href="/bible-quizzes" className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md w-fit">Test Your Knowledge -- Take a Quiz</Link>
                </div>
              </div>
              <div className="grid grid-cols-4 divide-x divide-grace border-b border-grace">
                <div className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">{DAILY_VERSES.length}</p><p className="text-sm text-primary-dark/70">Daily Verses</p></div>
                <div className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">12</p><p className="text-sm text-primary-dark/70">Monthly Themes</p></div>
                <div className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">KJV</p><p className="text-sm text-primary-dark/70">Translation</p></div>
                <div className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">{uniqueBooks.size}</p><p className="text-sm text-primary-dark/70">Books</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* Today's Featured Verse */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-200 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">Today&apos;s Verse</span>
              <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100">{todaysVerse.theme}</span>
            </div>
            <Link href={verseUrl(todaysVerse)} className="text-2xl font-display font-bold text-scripture hover:text-blue-600 transition-colors">{todaysVerse.reference}</Link>
            <blockquote className="text-lg text-primary-dark/85 leading-relaxed italic border-l-4 border-blue-300 pl-5 mt-3 mb-4">&ldquo;{todaysVerse.text}&rdquo;</blockquote>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Link href={verseUrl(todaysVerse)} className="text-blue-600 hover:underline font-medium">Study this verse</Link>
              <span className="text-primary-dark/30">|</span>
              <Link href={`/${todaysVerse.bookSlug}-chapters`} className="text-blue-600 hover:underline">{todaysVerse.book} Chapters</Link>
              <span className="text-primary-dark/30">|</span>
              <Link href={`/${todaysVerse.bookSlug}-${todaysVerse.chapter}-quiz`} className="text-blue-600 hover:underline font-semibold">Chapter Quiz</Link>
              <span className="text-primary-dark/30">|</span>
              <Link href={`/bible-quotes/${todaysVerse.themeSlug}`} className="text-blue-600 hover:underline">Bible Quotes About {todaysVerse.theme}</Link>
            </div>
          </div>
        </section>

        {/* NLP Article */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-3">Why Read a Bible Verse Every Day?</h2>
            <div className="text-primary-dark/80 leading-relaxed space-y-3">
              <p>Reading a <strong>Bible verse of the day</strong> is one of the most effective spiritual disciplines a Christian can practice. A daily scripture reading anchors your mind in God&apos;s Word before the demands of the day take over. Whether you spend five minutes or an hour, beginning each morning with a passage from the Old Testament or New Testament sets the tone for a day lived in faith, hope, and obedience to the gospel.</p>
              <p>Millions of believers worldwide use a <strong>daily Bible verse</strong> as the foundation of their devotional life. Apps like the YouVersion Bible App and websites like BibleGateway serve a daily verse to hundreds of millions of users each year. The practice is simple: read the verse, meditate on its meaning, memorize the passage if you can, and pray about how the scripture applies to your circumstances. Over time, this habit builds a reservoir of comfort, encouragement, and strength drawn directly from God&apos;s Word.</p>
              <p>The verses curated on this page are drawn from the <strong>King James Version</strong> (KJV) and organized into twelve monthly themes -- from New Beginnings in January through Eternal Promise in December. Each month focuses on a core biblical theme: salvation, love, courage, guidance, peace, faith, comfort, prayer, Scripture, forgiveness, and eternal life. Every verse links to a full study page with cross-references, original-language word studies, and a chapter quiz so you can go deeper in your daily devotional reading and memorization practice.</p>
            </div>
          </div>
        </section>

        {/* Theme Tags */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-lg font-bold text-scripture mb-3">Browse by Theme</h2>
          <div className="flex flex-wrap gap-2">
            {themes.map(theme => (
              <a key={theme} href={`#theme-${theme.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex items-center px-3 py-1.5 bg-white border border-grace rounded-lg text-sm text-primary-dark/80 hover:border-blue-300 hover:text-blue-600 transition-colors">{theme}</a>
            ))}
          </div>
        </section>

        {/* Monthly Verse Sections */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-10">
          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => {
            const monthVerses = DAILY_VERSES.filter(v => v.month === month);
            return (
              <section key={month} id={`month-${month}`}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-display font-bold text-scripture">{MONTH_NAMES[month - 1]}</h2>
                  <span className="text-sm text-primary-dark/60">-- {MONTH_THEMES[month - 1]}</span>
                </div>
                <ol className="space-y-4">
                  {monthVerses.map((verse, idx) => (
                    <li key={verse.reference} id={idx === 0 ? `theme-${verse.theme.toLowerCase().replace(/\s+/g, '-')}` : undefined} className="bg-white rounded-xl border border-grace hover:border-blue-200 hover:shadow-sm transition-all overflow-hidden">
                      <div className="flex items-start gap-4 p-5 md:p-6">
                        <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-700 text-sm font-bold border border-blue-100">{idx + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Link href={verseUrl(verse)} className="text-lg font-display font-bold text-scripture hover:text-blue-600 transition-colors">{verse.reference}</Link>
                            <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100">{verse.theme}</span>
                          </div>
                          <blockquote className="text-primary-dark/85 leading-relaxed italic border-l-3 border-blue-200 pl-4">&ldquo;{verse.text}&rdquo;</blockquote>
                          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                            <Link href={verseUrl(verse)} className="text-blue-600 hover:underline font-medium">Study this verse</Link>
                            <span className="text-primary-dark/30">|</span>
                            <Link href={`/chapters/${verse.bookSlug}/${verse.chapter}`} className="text-blue-600 hover:underline">Chapter {verse.chapter}</Link>
                            <span className="text-primary-dark/30">|</span>
                            <Link href={`/${verse.bookSlug}-chapters`} className="text-blue-600 hover:underline">{verse.book} Chapters</Link>
                            <span className="text-primary-dark/30">|</span>
                            <Link href={`/${verse.bookSlug}-${verse.chapter}-quiz`} className="text-blue-600 hover:underline font-semibold">Chapter Quiz</Link>
                            <span className="text-primary-dark/30">|</span>
                            <Link href={`/bible-quotes/${verse.themeSlug}`} className="text-blue-600 hover:underline">Quotes About {verse.theme}</Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
        </main>

        {/* Mid-Content CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 md:p-8 text-white">
            <h2 className="text-xl md:text-2xl font-display font-bold mb-2">Know These Verses by Heart? Prove It.</h2>
            <p className="text-blue-100 mb-4 max-w-2xl">Take a chapter quiz from any book featured on this page. 15 questions per quiz with instant scoring and verse-by-verse explanations.</p>
            <Link href="/bible-quizzes" className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md">Take a Quiz Now</Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-scripture mb-1">What is the Bible verse of the day?</h3>
                <p className="text-primary-dark/80 leading-relaxed">The Bible verse of the day is a single scripture passage selected for daily devotional reading, prayer, and meditation. Popular apps like the YouVersion Bible App and websites like BibleGateway serve a daily verse to hundreds of millions of users each year. Our curated collection offers {DAILY_VERSES.length} verses organized by monthly themes from the King James Version.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">How do I start reading a Bible verse every day?</h3>
                <p className="text-primary-dark/80 leading-relaxed">Start by bookmarking this page and reading the featured verse each morning. Write the verse in a journal, meditate on its meaning during the day, and pray about how it applies to your life. Many Christians pair their daily verse with a short devotional reading or a chapter from the Bible for deeper study.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What is the best Bible verse to read every morning?</h3>
                <p className="text-primary-dark/80 leading-relaxed">Lamentations 3:22&ndash;23 is one of the best morning scriptures: &ldquo;It is of the LORD&apos;s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.&rdquo; Psalm 118:24 and Psalm 119:105 are also powerful morning verses that set the tone for the day ahead.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What Bible version are these daily verses from?</h3>
                <p className="text-primary-dark/80 leading-relaxed">All daily verses on this page are from the King James Version (KJV), first published in 1611. The KJV remains one of the most beloved and memorized English Bible translations, known for its literary beauty and faithfulness to the original manuscripts.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">Can I use these verses for daily devotionals?</h3>
                <p className="text-primary-dark/80 leading-relaxed">Absolutely. These {DAILY_VERSES.length} verses are organized into 12 monthly themes -- from New Beginnings in January to Eternal Promise in December. Each verse includes links to full study pages, chapter quizzes, and related Bible quotes so you can go deeper in your daily devotional practice.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">Continue Exploring Scripture</h2>
            <p className="text-sm text-primary-dark/70 mb-5">Deepen your Bible study with quizzes, devotionals, reading plans, and more.</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              <Link href="/bible-quizzes" className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 hover:shadow-sm transition-all"><span>Bible Quizzes</span></Link>
              <Link href="/bible-quotes" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Quotes Hub</span></Link>
              <Link href="/popular-bible-verses" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">100 Most Popular Verses</span></Link>
              <Link href="/famous-bible-verses" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Famous Bible Verses</span></Link>
              <Link href="/devotionals" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Daily Devotionals</span></Link>
              <Link href="/reading-plans" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Reading Plans</span></Link>
              <Link href="/cross-references" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Cross References</span></Link>
              <Link href="/bible-study-guides" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Study Guides</span></Link>
              <Link href="/topics" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Topics</span></Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
