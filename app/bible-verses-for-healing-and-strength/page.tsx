import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

// ---------------------------------------------------------------------------
// 50 Bible Verses for Healing and Strength (KJV)
// ---------------------------------------------------------------------------

interface HealingVerse {
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

const HEALING_VERSES: HealingVerse[] = [
  {
    reference: 'Jeremiah 17:14',
    book: 'Jeremiah', bookSlug: 'jeremiah', chapter: 17, verse: 14,
    text: 'Heal me, O LORD, and I shall be healed; save me, and I shall be saved: for thou art my praise.',
    theme: 'Healing Prayer', themeSlug: 'healing-prayer',
  },
  {
    reference: 'Psalm 103:2\u20133',
    book: 'Psalms', bookSlug: 'psalms', chapter: 103, verse: 2, endVerse: 3,
    text: 'Bless the LORD, O my soul, and forget not all his benefits: Who forgiveth all thine iniquities; who healeth all thy diseases;',
    theme: 'God\'s Healing', themeSlug: 'gods-healing',
  },
  {
    reference: 'Isaiah 53:5',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 53, verse: 5,
    text: 'But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.',
    theme: 'Healing Through Christ', themeSlug: 'healing-through-christ',
  },
  {
    reference: 'James 5:14\u201315',
    book: 'James', bookSlug: 'james', chapter: 5, verse: 14, endVerse: 15,
    text: 'Is any sick among you? let him call for the elders of the church; and let them pray over him, anointing him with oil in the name of the Lord: And the prayer of faith shall save the sick, and the Lord shall raise him up; and if he have committed sins, they shall be forgiven him.',
    theme: 'Prayer for Healing', themeSlug: 'prayer-for-healing',
  },
  {
    reference: '3 John 1:2',
    book: '3 John', bookSlug: '3-john', chapter: 1, verse: 2,
    text: 'Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth.',
    theme: 'Health', themeSlug: 'health',
  },
  {
    reference: 'Exodus 15:26',
    book: 'Exodus', bookSlug: 'exodus', chapter: 15, verse: 26,
    text: 'And said, If thou wilt diligently hearken to the voice of the LORD thy God, and wilt do that which is right in his sight, and wilt give ear to his commandments, and keep all his statutes, I will put none of these diseases upon thee, which I have brought upon the Egyptians: for I am the LORD that healeth thee.',
    theme: 'God the Healer', themeSlug: 'god-the-healer',
  },
  {
    reference: 'Psalm 147:3',
    book: 'Psalms', bookSlug: 'psalms', chapter: 147, verse: 3,
    text: 'He healeth the broken in heart, and bindeth up their wounds.',
    theme: 'Comfort', themeSlug: 'comfort',
  },
  {
    reference: 'Proverbs 4:20\u201322',
    book: 'Proverbs', bookSlug: 'proverbs', chapter: 4, verse: 20, endVerse: 22,
    text: 'My son, attend to my words; incline thine ear unto my sayings. Let them not depart from thine eyes; keep them in the midst of thine heart. For they are life unto those that find them, and health to all their flesh.',
    theme: 'God\'s Word as Medicine', themeSlug: 'gods-word-as-medicine',
  },
  {
    reference: 'Isaiah 41:10',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 41, verse: 10,
    text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.',
    theme: 'Strength', themeSlug: 'strength',
  },
  {
    reference: 'Psalm 30:2',
    book: 'Psalms', bookSlug: 'psalms', chapter: 30, verse: 2,
    text: 'O LORD my God, I cried unto thee, and thou hast healed me.',
    theme: 'Healing Testimony', themeSlug: 'healing-testimony',
  },
  {
    reference: 'Malachi 4:2',
    book: 'Malachi', bookSlug: 'malachi', chapter: 4, verse: 2,
    text: 'But unto you that fear my name shall the Sun of righteousness arise with healing in his wings; and ye shall go forth, and grow up as calves of the stall.',
    theme: 'Healing', themeSlug: 'healing',
  },
  {
    reference: 'Matthew 9:35',
    book: 'Matthew', bookSlug: 'matthew', chapter: 9, verse: 35,
    text: 'And Jesus went about all the cities and villages, teaching in their synagogues, and preaching the gospel of the kingdom, and healing every sickness and every disease among the people.',
    theme: 'Jesus\' Healing', themeSlug: 'jesus-healing',
  },
  {
    reference: 'Psalm 41:3',
    book: 'Psalms', bookSlug: 'psalms', chapter: 41, verse: 3,
    text: 'The LORD will strengthen him upon the bed of languishing: thou wilt make all his bed in his sickness.',
    theme: 'Recovery', themeSlug: 'recovery',
  },
  {
    reference: 'Isaiah 40:29',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 40, verse: 29,
    text: 'He giveth power to the faint; and to them that have no might he increaseth strength.',
    theme: 'Renewed Strength', themeSlug: 'renewed-strength',
  },
  {
    reference: 'Psalm 107:20',
    book: 'Psalms', bookSlug: 'psalms', chapter: 107, verse: 20,
    text: 'He sent his word, and healed them, and delivered them from their destructions.',
    theme: 'God\'s Word', themeSlug: 'gods-word',
  },
  {
    reference: 'Mark 5:34',
    book: 'Mark', bookSlug: 'mark', chapter: 5, verse: 34,
    text: 'And he said unto her, Daughter, thy faith hath made thee whole; go in peace, and be whole of thy plague.',
    theme: 'Faith Healing', themeSlug: 'faith-healing',
  },
  {
    reference: 'Philippians 4:13',
    book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 13,
    text: 'I can do all things through Christ which strengtheneth me.',
    theme: 'Strength', themeSlug: 'strength',
  },
  {
    reference: '2 Chronicles 7:14',
    book: '2 Chronicles', bookSlug: '2-chronicles', chapter: 7, verse: 14,
    text: 'If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land.',
    theme: 'National Healing', themeSlug: 'national-healing',
  },
  {
    reference: 'Psalm 6:2',
    book: 'Psalms', bookSlug: 'psalms', chapter: 6, verse: 2,
    text: 'Have mercy upon me, O LORD; for I am weak: O LORD, heal me; for my bones are vexed.',
    theme: 'Mercy', themeSlug: 'mercy',
  },
  {
    reference: 'Deuteronomy 7:15',
    book: 'Deuteronomy', bookSlug: 'deuteronomy', chapter: 7, verse: 15,
    text: 'And the LORD will take away from thee all sickness, and will put none of the evil diseases of Egypt, which thou knowest, upon thee; but will lay them upon all them that hate thee.',
    theme: 'Protection', themeSlug: 'protection',
  },
  {
    reference: 'Isaiah 58:8',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 58, verse: 8,
    text: 'Then shall thy light break forth as the morning, and thine health shall spring forth speedily: and thy righteousness shall go before thee; the glory of the LORD shall be thy rereward.',
    theme: 'Restoration', themeSlug: 'restoration',
  },
  {
    reference: 'Psalm 34:19\u201320',
    book: 'Psalms', bookSlug: 'psalms', chapter: 34, verse: 19, endVerse: 20,
    text: 'Many are the afflictions of the righteous: but the LORD delivereth him out of them all. He keepeth all his bones: not one of them is broken.',
    theme: 'Deliverance', themeSlug: 'deliverance',
  },
  {
    reference: 'Luke 6:19',
    book: 'Luke', bookSlug: 'luke', chapter: 6, verse: 19,
    text: 'And the whole multitude sought to touch him: for there went virtue out of him, and healed them all.',
    theme: 'Jesus\' Power', themeSlug: 'jesus-power',
  },
  {
    reference: 'Psalm 91:9\u201310',
    book: 'Psalms', bookSlug: 'psalms', chapter: 91, verse: 9, endVerse: 10,
    text: 'Because thou hast made the LORD, which is my refuge, even the most High, thy habitation; There shall no evil befall thee, neither shall any plague come nigh thy dwelling.',
    theme: 'Protection', themeSlug: 'protection',
  },
  {
    reference: 'Proverbs 17:22',
    book: 'Proverbs', bookSlug: 'proverbs', chapter: 17, verse: 22,
    text: 'A merry heart doeth good like a medicine: but a broken spirit drieth the bones.',
    theme: 'Joy', themeSlug: 'joy',
  },
  {
    reference: 'Matthew 4:23',
    book: 'Matthew', bookSlug: 'matthew', chapter: 4, verse: 23,
    text: 'And Jesus went about all Galilee, teaching in their synagogues, and preaching the gospel of the kingdom, and healing all manner of sickness and all manner of disease among the people.',
    theme: 'Gospel Healing', themeSlug: 'gospel-healing',
  },
  {
    reference: 'Psalm 23:1\u20133',
    book: 'Psalms', bookSlug: 'psalms', chapter: 23, verse: 1, endVerse: 3,
    text: 'The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul: he leadeth me in the paths of righteousness for his name\u2019s sake.',
    theme: 'Restoration', themeSlug: 'restoration',
  },
  {
    reference: '2 Corinthians 12:9',
    book: '2 Corinthians', bookSlug: '2-corinthians', chapter: 12, verse: 9,
    text: 'And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me.',
    theme: 'Grace', themeSlug: 'grace',
  },
  {
    reference: 'Romans 8:28',
    book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 28,
    text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
    theme: 'God\'s Plan', themeSlug: 'gods-plan',
  },
  {
    reference: 'Isaiah 40:31',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 40, verse: 31,
    text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
    theme: 'Renewed Strength', themeSlug: 'renewed-strength',
  },
  {
    reference: 'Acts 10:38',
    book: 'Acts', bookSlug: 'acts', chapter: 10, verse: 38,
    text: 'How God anointed Jesus of Nazareth with the Holy Ghost and with power: who went about doing good, and healing all that were oppressed of the devil; for God was with him.',
    theme: 'Jesus\' Ministry', themeSlug: 'jesus-ministry',
  },
  {
    reference: 'Psalm 118:17',
    book: 'Psalms', bookSlug: 'psalms', chapter: 118, verse: 17,
    text: 'I shall not die, but live, and declare the works of the LORD.',
    theme: 'Life', themeSlug: 'life',
  },
  {
    reference: 'Numbers 12:13',
    book: 'Numbers', bookSlug: 'numbers', chapter: 12, verse: 13,
    text: 'And Moses cried unto the LORD, saying, Heal her now, O God, I beseech thee.',
    theme: 'Intercession', themeSlug: 'intercession',
  },
  {
    reference: 'Psalm 73:26',
    book: 'Psalms', bookSlug: 'psalms', chapter: 73, verse: 26,
    text: 'My flesh and my heart faileth: but God is the strength of my heart, and my portion for ever.',
    theme: 'Heart Strength', themeSlug: 'heart-strength',
  },
  {
    reference: 'Matthew 8:16\u201317',
    book: 'Matthew', bookSlug: 'matthew', chapter: 8, verse: 16, endVerse: 17,
    text: 'When the even was come, they brought unto him many that were possessed with devils: and he cast out the spirits with his word, and healed all that were sick: That it might be fulfilled which was spoken by Esaias the prophet, saying, Himself took our infirmities, and bare our sicknesses.',
    theme: 'Fulfilled Prophecy', themeSlug: 'fulfilled-prophecy',
  },
  {
    reference: 'Psalm 46:1',
    book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 1,
    text: 'God is our refuge and strength, a very present help in trouble.',
    theme: 'Refuge', themeSlug: 'refuge',
  },
  {
    reference: 'Nahum 1:7',
    book: 'Nahum', bookSlug: 'nahum', chapter: 1, verse: 7,
    text: 'The LORD is good, a strong hold in the day of trouble; and he knoweth them that trust in him.',
    theme: 'God\'s Goodness', themeSlug: 'gods-goodness',
  },
  {
    reference: '1 Peter 2:24',
    book: '1 Peter', bookSlug: '1-peter', chapter: 2, verse: 24,
    text: 'Who his own self bare our sins in his own body on the tree, that we, being dead to sins, should live unto righteousness: by whose stripes ye were healed.',
    theme: 'Redemptive Healing', themeSlug: 'redemptive-healing',
  },
  {
    reference: 'Psalm 138:3',
    book: 'Psalms', bookSlug: 'psalms', chapter: 138, verse: 3,
    text: 'In the day when I cried thou answeredst me, and strengthenedst me with strength in my soul.',
    theme: 'Inner Strength', themeSlug: 'inner-strength',
  },
  {
    reference: '2 Timothy 4:17',
    book: '2 Timothy', bookSlug: '2-timothy', chapter: 4, verse: 17,
    text: 'Notwithstanding the Lord stood with me, and strengthened me; that by me the preaching might be fully known, and that all the Gentiles might hear: and I was delivered out of the mouth of the lion.',
    theme: 'God\'s Strength', themeSlug: 'gods-strength',
  },
  {
    reference: 'Revelation 21:4',
    book: 'Revelation', bookSlug: 'revelation', chapter: 21, verse: 4,
    text: 'And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.',
    theme: 'Eternal Healing', themeSlug: 'eternal-healing',
  },
  {
    reference: 'Psalm 28:7',
    book: 'Psalms', bookSlug: 'psalms', chapter: 28, verse: 7,
    text: 'The LORD is my strength and my shield; my heart trusted in him, and I am helped: therefore my heart greatly rejoiceth; and with my song will I praise him.',
    theme: 'Trust', themeSlug: 'trust',
  },
  {
    reference: 'Isaiah 35:3\u20134',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 35, verse: 3, endVerse: 4,
    text: 'Strengthen ye the weak hands, and confirm the feeble knees. Say to them that are of a fearful heart, Be strong, fear not: behold, your God will come with vengeance, even God with a recompence; he will come and save you.',
    theme: 'Encouragement', themeSlug: 'encouragement',
  },
  {
    reference: 'Joshua 1:9',
    book: 'Joshua', bookSlug: 'joshua', chapter: 1, verse: 9,
    text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.',
    theme: 'Courage', themeSlug: 'courage',
  },
  {
    reference: 'Psalm 119:50',
    book: 'Psalms', bookSlug: 'psalms', chapter: 119, verse: 50,
    text: 'This is my comfort in my affliction: for thy word hath quickened me.',
    theme: 'Comfort', themeSlug: 'comfort',
  },
  {
    reference: 'Matthew 14:14',
    book: 'Matthew', bookSlug: 'matthew', chapter: 14, verse: 14,
    text: 'And Jesus went forth, and saw a great multitude, and was moved with compassion toward them, and he healed their sick.',
    theme: 'Compassion', themeSlug: 'compassion',
  },
  {
    reference: 'Psalm 55:22',
    book: 'Psalms', bookSlug: 'psalms', chapter: 55, verse: 22,
    text: 'Cast thy burden upon the LORD, and he shall sustain thee: he shall never suffer the righteous to be moved.',
    theme: 'Casting Care', themeSlug: 'casting-care',
  },
  {
    reference: '2 Kings 20:5',
    book: '2 Kings', bookSlug: '2-kings', chapter: 20, verse: 5,
    text: 'Turn again, and tell Hezekiah the captain of my people, Thus saith the LORD, the God of David thy father, I have heard thy prayer, I have seen thy tears: behold, I will heal thee: on the third day thou shalt go up unto the house of the LORD.',
    theme: 'Answered Prayer', themeSlug: 'answered-prayer',
  },
  {
    reference: 'Job 5:18',
    book: 'Job', bookSlug: 'job', chapter: 5, verse: 18,
    text: 'For he maketh sore, and bindeth up: he woundeth, and his hands make whole.',
    theme: 'God\'s Discipline', themeSlug: 'gods-discipline',
  },
  {
    reference: 'Habakkuk 3:19',
    book: 'Habakkuk', bookSlug: 'habakkuk', chapter: 3, verse: 19,
    text: 'The LORD God is my strength, and he will make my feet like hinds\u2019 feet, and he will make me to walk upon mine high places. To the chief singer on my stringed instruments.',
    theme: 'Strength', themeSlug: 'strength',
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

function verseUrl(v: HealingVerse): string {
  return `/verses/${v.bookSlug}/${v.chapter}/${v.verse}`;
}

/** Collect unique themes for the category filter */
function getUniqueThemes(): string[] {
  const seen = new Set<string>();
  for (const v of HEALING_VERSES) {
    seen.add(v.theme);
  }
  return Array.from(seen);
}

/** Count unique books */
function getUniqueBooks(): number {
  const seen = new Set<string>();
  for (const v of HEALING_VERSES) {
    seen.add(v.bookSlug);
  }
  return seen.size;
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Bible Verses for Healing and Strength \u2014 50 KJV Scriptures for Physical Recovery, Emotional Restoration & Spiritual Renewal When You Need God\u2019s Touch',
  description:
    'Find 50 Bible verses for healing and strength in the King James Version. Healing scriptures for recovery from illness, surgery, grief, and burnout \u2014 from Jeremiah 17:14 to Revelation 21:4, discover God\'s healing power and promises of strength with full KJV text and study links.',
  keywords: [
    'bible verses for healing and strength', 'healing scriptures', 'prayers for healing',
    'bible verses about recovery', 'God\'s healing power', 'scriptures for the sick',
    'KJV healing verses', 'bible verses for strength during illness',
    'healing bible verses KJV', 'scriptures for healing the sick',
    'bible promises for healing', 'strength in weakness bible verses',
    'comfort during sickness', 'bible verses about healing',
  ],
  openGraph: {
    title: 'Bible Verses for Healing and Strength | 50 KJV Scriptures for Recovery & Renewal',
    description: '50 Bible verses for healing and strength from the King James Version for physical recovery, emotional restoration, and spiritual renewal.',
    url: '/bible-verses-for-healing-and-strength',
    type: 'website',
  },
  alternates: { canonical: '/bible-verses-for-healing-and-strength' },
};

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function BibleVersesForHealingPage() {
  const themes = getUniqueThemes();
  const booksCount = getUniqueBooks();
  const otVerses = HEALING_VERSES.filter(v => OT_SLUGS.includes(v.bookSlug));
  const ntVerses = HEALING_VERSES.filter(v => !OT_SLUGS.includes(v.bookSlug));

  // --- Structured Data ---

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Verses for Healing and Strength',
    description: metadata.description,
    url: 'https://biblemaximum.com/bible-verses-for-healing-and-strength',
    numberOfItems: HEALING_VERSES.length,
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
      { '@type': 'ListItem', position: 3, name: 'Bible Verses for Healing and Strength' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the most powerful Bible verse for healing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Isaiah 53:5 is widely regarded as the most powerful healing verse in all of Scripture: "But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed." This verse connects physical healing directly to the atoning work of Christ on the cross. It is quoted in 1 Peter 2:24 and fulfilled in Matthew 8:17. Other deeply powerful healing verses include Jeremiah 17:14, Psalm 103:2-3, and Exodus 15:26 where God reveals Himself as "the LORD that healeth thee." Each of these speaks to a different dimension of God\'s healing power \u2014 spiritual, physical, and covenantal.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does God still heal today?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Scripture presents God as unchanging. Exodus 15:26 declares "I am the LORD that healeth thee" \u2014 a statement about His nature, not a one-time event. Malachi 3:6 says "I am the LORD, I change not." Hebrews 13:8 affirms "Jesus Christ the same yesterday, and to day, and for ever." James 5:14-15 gives the church active instructions for praying over the sick, promising "the prayer of faith shall save the sick, and the Lord shall raise him up." These are not past-tense instructions. They are present-tense commands for the ongoing life of the church. While God is sovereign in His timing, Scripture never suggests He has stopped healing His people.',
        },
      },
      {
        '@type': 'Question',
        name: 'What scripture to pray for someone who is sick?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Jeremiah 17:14 is a direct healing prayer you can pray word-for-word: "Heal me, O LORD, and I shall be healed; save me, and I shall be saved: for thou art my praise." Psalm 6:2 cries out "Have mercy upon me, O LORD; for I am weak: O LORD, heal me; for my bones are vexed." Numbers 12:13 records Moses\' five-word prayer for Miriam: "Heal her now, O God, I beseech thee." James 5:14-15 instructs believers to call the elders for prayer and anointing, promising "the prayer of faith shall save the sick." Psalm 107:20 declares "He sent his word, and healed them." These scriptures can be prayed directly over a sick loved one.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between healing and being cured in the Bible?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Bible uses healing in a broader sense than modern medicine uses "cure." In Scripture, healing encompasses the whole person \u2014 body, soul, and spirit. Isaiah 53:5 connects physical healing ("with his stripes we are healed") to spiritual restoration from sin. Psalm 147:3 says God "healeth the broken in heart, and bindeth up their wounds" \u2014 emotional healing. Psalm 23 speaks of restoring the soul. The Greek word "sozo" used in the Gospels means both "to save" and "to heal" simultaneously. When Jesus told the woman in Mark 5:34 "thy faith hath made thee whole," the word "whole" carries physical healing, spiritual salvation, and complete restoration all at once. A cure removes a disease. Biblical healing restores a person.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you pray for healing according to James 5?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'James 5:14-15 lays out a specific process: "Is any sick among you? let him call for the elders of the church; and let them pray over him, anointing him with oil in the name of the Lord: And the prayer of faith shall save the sick, and the Lord shall raise him up." The steps are clear. First, the sick person takes initiative by calling for the elders. Second, the elders come and pray over them with anointing oil. Third, they pray in faith \u2014 not in doubt, not as a formality, but trusting that God hears and acts. The promise is twofold: the Lord will raise up the sick, and if sins are involved, they will be forgiven. James connects physical healing to the faith of the community and the authority of Christ\'s name.',
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={collectionSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      <Breadcrumb items={[{ label: 'Bible Quotes', href: '/bible-quotes' }, { label: 'Bible Verses for Healing and Strength' }]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mt-6 mb-8">
              <div className="relative h-48 md:h-56 bg-gradient-to-r from-amber-800 to-amber-900">
                <Image
                  src="/images/bible-light.jpg"
                  alt="Bible Verses for Healing and Strength"
                  fill
                  className="object-cover opacity-25"
                  priority
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                    Bible Verses for Healing and Strength
                  </h1>
                  <p className="text-amber-100 max-w-2xl mb-4">
                    50 KJV scriptures for physical recovery, emotional restoration,
                    and spiritual renewal &mdash; God&apos;s promises for when your
                    body and spirit need His touch.
                  </p>
                  <Link
                    href="/bible-quizzes"
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md w-fit"
                  >
                    Test Your Knowledge &mdash; Take a Quiz
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
              When Your Body Fails, These Words Don&apos;t
            </h2>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              Nobody plans to need healing scriptures. They find you in hospital
              waiting rooms, in 3 AM Google searches when the pain won&apos;t let
              you sleep, in the parking lot after a diagnosis that rearranges
              everything. You weren&apos;t looking for a Bible study. You were
              looking for something to hold onto. And honestly? That&apos;s
              exactly how these verses have worked for three thousand years.
              Not as theology homework. As lifelines.
            </p>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              The word &ldquo;heal&rdquo; appears over 80 times in the King
              James Bible. That&apos;s not a footnote in Scripture. It&apos;s a
              theme. God healing bodies, healing hearts, healing nations, healing
              the land itself. And the Bible never reduces healing to just one
              thing. Physical recovery, yes &mdash; but also emotional
              restoration when grief has hollowed you out, and spiritual renewal
              when you&apos;ve drifted so far you forgot the way back. Isaiah
              53:5 sits at the center of all of it: &ldquo;with his stripes we
              are healed.&rdquo; That verse reaches across the wound of sin and
              the wound of the body in the same breath. It&apos;s the
              cornerstone of biblical healing theology, quoted by Peter in his
              first epistle, fulfilled by Matthew in his Gospel.
            </p>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              Here&apos;s the thing. The strength side of these scriptures is
              just as staggering. The Hebrew word for strength &mdash;
              <em> oz</em>, <em>chayil</em> &mdash; doesn&apos;t mean
              willpower or positive thinking. It means force. Might. The kind
              of strength that holds a wall up during a siege. Isaiah 40:31
              promises renewed strength for those who wait on God &mdash; like a
              battery that recharges not by doing more but by being still.
              Psalm 73:26 gets even more specific: &ldquo;My flesh and my heart
              faileth: but God is the strength of my heart.&rdquo; When your own
              body turns against you, God becomes the strength your heart
              runs on.
            </p>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              Think of a woman reading Jeremiah 17:14 during chemo treatments,
              pinning the verse to her IV pole: &ldquo;Heal me, O LORD, and I
              shall be healed.&rdquo; That&apos;s not wishful thinking.
              That&apos;s a woman grabbing hold of something bigger than her
              diagnosis. Think of a man whispering Psalm 41:3 the night before
              surgery: &ldquo;The LORD will strengthen him upon the bed of
              languishing.&rdquo; He doesn&apos;t know what tomorrow holds. But
              he knows who holds it.
            </p>
            <p className="text-primary-dark/80 leading-relaxed">
              The 50 bible verses for healing and strength gathered below span
              both testaments and cover prayers for healing, God&apos;s healing
              power, scriptures for the sick, KJV healing verses for recovery,
              and the raw strength promises that have carried believers through
              illness, surgery, grief, and burnout for millennia. Each verse is
              presented in full KJV text with links to in-depth study pages,
              cross-references, and chapter quizzes. Whether you need bible
              verses about recovery for yourself or scriptures to pray over
              someone you love &mdash; start here.
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
            {HEALING_VERSES.map((verse, idx) => (
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
              How Well Do You Know These Healing and Strength Verses? Take a Quiz.
            </h2>
            <p className="text-blue-100 mb-4 max-w-2xl">
              Put your Bible knowledge to the test with chapter quizzes from Psalms, Isaiah, James, and more. 15 questions per quiz with instant scoring and verse-by-verse explanations.
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
              Healing and Strength Verses by Testament
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
                      <span className="text-sm text-primary-dark/50 ml-1">&mdash; {v.book}</span>
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
                      <span className="text-sm text-primary-dark/50 ml-1">&mdash; {v.book}</span>
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
                <h3 className="font-bold text-scripture mb-1">What is the most powerful Bible verse for healing?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  Isaiah 53:5 is the one most Christians reach for first:
                  &ldquo;But he was wounded for our transgressions, he was
                  bruised for our iniquities: the chastisement of our peace was
                  upon him; and with his stripes we are healed.&rdquo; It ties
                  physical healing directly to Christ&apos;s atoning work on the
                  cross. Peter quotes it. Matthew fulfills it. But powerful
                  healing verses show up in unexpected places too. Jeremiah
                  17:14 is a raw, five-second prayer: &ldquo;Heal me, O LORD,
                  and I shall be healed.&rdquo; Exodus 15:26 reveals God&apos;s
                  identity as healer: &ldquo;I am the LORD that healeth
                  thee.&rdquo; Psalm 103:2&ndash;3 pairs forgiveness and healing
                  in the same breath. The most powerful verse is often the one
                  that meets you exactly where you are.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">Does God still heal today?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  Look at how God describes Himself. &ldquo;I am the LORD that
                  healeth thee&rdquo; (Exodus 15:26). That&apos;s a statement
                  of identity, not a report on a past event. Malachi 3:6 says
                  &ldquo;I am the LORD, I change not.&rdquo; Hebrews 13:8
                  affirms that Jesus Christ is &ldquo;the same yesterday, and
                  to day, and for ever.&rdquo; James 5:14&ndash;15 doesn&apos;t
                  read like a historical footnote. It reads like instructions
                  for the church in every generation: call the elders, anoint
                  with oil, pray in faith. &ldquo;The prayer of faith shall
                  save the sick, and the Lord shall raise him up.&rdquo;
                  God&apos;s timing is sovereign, always. But the idea that He
                  stopped healing at some point in history? Scripture never
                  says that. Not once.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What scripture to pray for someone who is sick?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  Start with Jeremiah 17:14 &mdash; you can pray it word for
                  word: &ldquo;Heal me, O LORD, and I shall be healed; save me,
                  and I shall be saved: for thou art my praise.&rdquo; Change
                  &ldquo;me&rdquo; to their name. Psalm 6:2 cries out,
                  &ldquo;Have mercy upon me, O LORD; for I am weak: O LORD,
                  heal me; for my bones are vexed.&rdquo; Numbers 12:13 records
                  the shortest healing prayer in the Bible &mdash; Moses
                  pleading for Miriam in five words: &ldquo;Heal her now, O
                  God, I beseech thee.&rdquo; And James 5:14&ndash;15 gives the
                  church a specific pattern: elders, oil, prayer in faith.
                  The promise? &ldquo;The prayer of faith shall save the
                  sick.&rdquo; These are not generic wishes. They&apos;re
                  scriptures you can pray out loud, over someone&apos;s bed,
                  right now.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What is the difference between healing and being cured in the Bible?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  Modern medicine separates the two. The Bible doesn&apos;t. In
                  Scripture, healing is always bigger than removing a disease.
                  Isaiah 53:5 connects physical healing to spiritual restoration
                  in the same verse. Psalm 147:3 says God &ldquo;healeth the
                  broken in heart, and bindeth up their wounds&rdquo; &mdash;
                  emotional healing. Psalm 23 speaks of restoring the soul.
                  Here&apos;s what&apos;s remarkable: the Greek word
                  <em> sozo</em> in the Gospels means &ldquo;to save&rdquo; and
                  &ldquo;to heal&rdquo; at the same time. When Jesus told the
                  woman with the issue of blood &ldquo;thy faith hath made thee
                  whole&rdquo; (Mark 5:34), the word &ldquo;whole&rdquo; carries
                  physical healing, spiritual salvation, and complete
                  restoration all at once. A cure removes a condition. Biblical
                  healing restores a person.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">How do you pray for healing according to James 5?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  James 5:14&ndash;15 lays it out step by step. First, the sick
                  person calls for the elders of the church. Not the other way
                  around. The sick person initiates. Second, the elders come,
                  pray over them, and anoint them with oil in the name of the
                  Lord. Third &mdash; and this is where the weight falls &mdash;
                  they pray &ldquo;the prayer of faith.&rdquo; Not a prayer of
                  doubt, not a prayer hedged with qualifiers, but a prayer that
                  trusts God hears and God acts. The promise is twofold:
                  &ldquo;The Lord shall raise him up&rdquo; and &ldquo;if he
                  have committed sins, they shall be forgiven him.&rdquo;
                  Physical and spiritual restoration, together. James ties
                  healing to the faith of the community and the authority of
                  Christ&apos;s name. It is not a solo endeavor. It is the
                  church doing what the church was designed to do.
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
                href="/bible-verses-about-anxiety"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Verses About Anxiety</span>
              </Link>
              <Link
                href="/bible-verses-about-strength-in-hard-times"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Strength in Hard Times</span>
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
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
