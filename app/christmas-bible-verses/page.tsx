import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

// ---------------------------------------------------------------------------
// 50 Christmas Bible Verses (KJV)
// ---------------------------------------------------------------------------

interface ChristmasVerse {
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

const CHRISTMAS_VERSES: ChristmasVerse[] = [
  {
    reference: 'Luke 2:10\u201311',
    book: 'Luke', bookSlug: 'luke', chapter: 2, verse: 10, endVerse: 11,
    text: 'And the angel said unto them, Fear not: for, behold, I bring you good tidings of great joy, which shall be to all people. For unto you is born this day in the city of David a Saviour, which is Christ the Lord.',
    theme: 'Christmas', themeSlug: 'christmas',
  },
  {
    reference: 'Isaiah 9:6',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 9, verse: 6,
    text: 'For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder: and his name shall be called Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace.',
    theme: 'Prophecy', themeSlug: 'prophecy',
  },
  {
    reference: 'Matthew 1:21',
    book: 'Matthew', bookSlug: 'matthew', chapter: 1, verse: 21,
    text: 'And she shall bring forth a son, and thou shalt call his name JESUS: for he shall save his people from their sins.',
    theme: 'Salvation', themeSlug: 'salvation',
  },
  {
    reference: 'Luke 2:7',
    book: 'Luke', bookSlug: 'luke', chapter: 2, verse: 7,
    text: 'And she brought forth her firstborn son, and wrapped him in swaddling clothes, and laid him in a manger; because there was no room for them in the inn.',
    theme: 'Nativity', themeSlug: 'nativity',
  },
  {
    reference: 'John 3:16',
    book: 'John', bookSlug: 'john', chapter: 3, verse: 16,
    text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
    theme: 'God\'s Love', themeSlug: 'gods-love',
  },
  {
    reference: 'Luke 1:30\u201331',
    book: 'Luke', bookSlug: 'luke', chapter: 1, verse: 30, endVerse: 31,
    text: 'And the angel said unto her, Fear not, Mary: for thou hast found favour with God. And, behold, thou shalt conceive in thy womb, and bring forth a son, and shalt call his name JESUS.',
    theme: 'Annunciation', themeSlug: 'annunciation',
  },
  {
    reference: 'Matthew 2:1\u20132',
    book: 'Matthew', bookSlug: 'matthew', chapter: 2, verse: 1, endVerse: 2,
    text: 'Now when Jesus was born in Bethlehem of Judaea in the days of Herod the king, behold, there came wise men from the east to Jerusalem, Saying, Where is he that is born King of the Jews? for we have seen his star in the east, and are come to worship him.',
    theme: 'Epiphany', themeSlug: 'epiphany',
  },
  {
    reference: 'Luke 2:13\u201314',
    book: 'Luke', bookSlug: 'luke', chapter: 2, verse: 13, endVerse: 14,
    text: 'And suddenly there was with the angel a multitude of the heavenly host praising God, and saying, Glory to God in the highest, and on earth peace, good will toward men.',
    theme: 'Praise', themeSlug: 'praise',
  },
  {
    reference: 'Isaiah 7:14',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 7, verse: 14,
    text: 'Therefore the Lord himself shall give you a sign; Behold, a virgin shall conceive, and bear a son, and shall call his name Immanuel.',
    theme: 'Prophecy', themeSlug: 'prophecy',
  },
  {
    reference: 'Micah 5:2',
    book: 'Micah', bookSlug: 'micah', chapter: 5, verse: 2,
    text: 'But thou, Bethlehem Ephratah, though thou be little among the thousands of Judah, yet out of thee shall he come forth unto me that is to be ruler in Israel; whose goings forth have been from of old, from everlasting.',
    theme: 'Prophecy', themeSlug: 'prophecy',
  },
  {
    reference: 'Luke 2:4\u20135',
    book: 'Luke', bookSlug: 'luke', chapter: 2, verse: 4, endVerse: 5,
    text: 'And Joseph also went up from Galilee, out of the city of Nazareth, into Judaea, unto the city of David, which is called Bethlehem; (because he was of the house and lineage of David:) To be taxed with Mary his espoused wife, being great with child.',
    theme: 'Nativity', themeSlug: 'nativity',
  },
  {
    reference: 'Matthew 1:23',
    book: 'Matthew', bookSlug: 'matthew', chapter: 1, verse: 23,
    text: 'Behold, a virgin shall be with child, and shall bring forth a son, and they shall call his name Emmanuel, which being interpreted is, God with us.',
    theme: 'God\'s Presence', themeSlug: 'gods-presence',
  },
  {
    reference: 'Luke 2:8\u20139',
    book: 'Luke', bookSlug: 'luke', chapter: 2, verse: 8, endVerse: 9,
    text: 'And there were in the same country shepherds abiding in the field, keeping watch over their flock by night. And, lo, the angel of the Lord came upon them, and the glory of the Lord shone round about them: and they were sore afraid.',
    theme: 'Nativity', themeSlug: 'nativity',
  },
  {
    reference: 'Galatians 4:4\u20135',
    book: 'Galatians', bookSlug: 'galatians', chapter: 4, verse: 4, endVerse: 5,
    text: 'But when the fulness of the time was come, God sent forth his Son, made of a woman, made under the law, To redeem them that were under the law, that we might receive the adoption of sons.',
    theme: 'Incarnation', themeSlug: 'incarnation',
  },
  {
    reference: 'John 1:14',
    book: 'John', bookSlug: 'john', chapter: 1, verse: 14,
    text: 'And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.',
    theme: 'Incarnation', themeSlug: 'incarnation',
  },
  {
    reference: 'Luke 2:15\u201316',
    book: 'Luke', bookSlug: 'luke', chapter: 2, verse: 15, endVerse: 16,
    text: 'And it came to pass, as the angels were gone away from them into heaven, the shepherds said one to another, Let us now go even unto Bethlehem, and see this thing which is come to pass, which the Lord hath made known unto us. And they came with haste, and found Mary, and Joseph, and the babe lying in a manger.',
    theme: 'Nativity', themeSlug: 'nativity',
  },
  {
    reference: 'Matthew 2:10\u201311',
    book: 'Matthew', bookSlug: 'matthew', chapter: 2, verse: 10, endVerse: 11,
    text: 'When they saw the star, they rejoiced with exceeding great joy. And when they were come into the house, they saw the young child with Mary his mother, and fell down, and worshipped him: and when they had opened their treasures, they presented unto him gifts; gold, and frankincense, and myrrh.',
    theme: 'Worship', themeSlug: 'worship',
  },
  {
    reference: 'Luke 1:46\u201347',
    book: 'Luke', bookSlug: 'luke', chapter: 1, verse: 46, endVerse: 47,
    text: 'And Mary said, My soul doth magnify the Lord, And my spirit hath rejoiced in God my Saviour.',
    theme: 'Praise', themeSlug: 'praise',
  },
  {
    reference: 'Isaiah 11:1\u20132',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 11, verse: 1, endVerse: 2,
    text: 'And there shall come forth a rod out of the stem of Jesse, and a Branch shall grow out of his roots: And the spirit of the LORD shall rest upon him, the spirit of wisdom and understanding, the spirit of counsel and might, the spirit of knowledge and of the fear of the LORD.',
    theme: 'Prophecy', themeSlug: 'prophecy',
  },
  {
    reference: 'Luke 2:19',
    book: 'Luke', bookSlug: 'luke', chapter: 2, verse: 19,
    text: 'But Mary kept all these things, and pondered them in her heart.',
    theme: 'Reflection', themeSlug: 'reflection',
  },
  {
    reference: 'Titus 2:11',
    book: 'Titus', bookSlug: 'titus', chapter: 2, verse: 11,
    text: 'For the grace of God that bringeth salvation hath appeared to all men.',
    theme: 'Grace', themeSlug: 'grace',
  },
  {
    reference: 'Matthew 2:13\u201314',
    book: 'Matthew', bookSlug: 'matthew', chapter: 2, verse: 13, endVerse: 14,
    text: 'And when they were departed, behold, the angel of the Lord appeareth to Joseph in a dream, saying, Arise, and take the young child and his mother, and flee into Egypt, and be thou there until I bring thee word: for Herod will seek the young child to destroy him. When he arose, he took the young child and his mother by night, and departed into Egypt.',
    theme: 'Protection', themeSlug: 'protection',
  },
  {
    reference: 'Luke 1:68\u201369',
    book: 'Luke', bookSlug: 'luke', chapter: 1, verse: 68, endVerse: 69,
    text: 'Blessed be the Lord God of Israel; for he hath visited and redeemed his people, And hath raised up an horn of salvation for us in the house of his servant David.',
    theme: 'Prophecy', themeSlug: 'prophecy',
  },
  {
    reference: 'Isaiah 40:9',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 40, verse: 9,
    text: 'O Zion, that bringest good tidings, get thee up into the high mountain; O Jerusalem, that bringest good tidings, lift up thy voice with strength; lift it up, be not afraid; say unto the cities of Judah, Behold your God!',
    theme: 'Joy', themeSlug: 'joy',
  },
  {
    reference: 'Luke 2:20',
    book: 'Luke', bookSlug: 'luke', chapter: 2, verse: 20,
    text: 'And the shepherds returned, glorifying and praising God for all the things that they had heard and seen, as it was told unto them.',
    theme: 'Worship', themeSlug: 'worship',
  },
  {
    reference: 'John 1:9\u201310',
    book: 'John', bookSlug: 'john', chapter: 1, verse: 9, endVerse: 10,
    text: 'That was the true Light, which lighteth every man that cometh into the world. He was in the world, and the world was made by him, and the world knew him not.',
    theme: 'Light', themeSlug: 'light',
  },
  {
    reference: 'Philippians 2:6\u20137',
    book: 'Philippians', bookSlug: 'philippians', chapter: 2, verse: 6, endVerse: 7,
    text: 'Who, being in the form of God, thought it not robbery to be equal with God: But made himself of no reputation, and took upon him the form of a servant, and was made in the likeness of men.',
    theme: 'Incarnation', themeSlug: 'incarnation',
  },
  {
    reference: 'Luke 1:35',
    book: 'Luke', bookSlug: 'luke', chapter: 1, verse: 35,
    text: 'And the angel answered and said unto her, The Holy Ghost shall come upon thee, and the power of the Highest shall overshadow thee: therefore also that holy thing which shall be born of thee shall be called the Son of God.',
    theme: 'Divine Power', themeSlug: 'divine-power',
  },
  {
    reference: 'Colossians 1:15\u201316',
    book: 'Colossians', bookSlug: 'colossians', chapter: 1, verse: 15, endVerse: 16,
    text: 'Who is the image of the invisible God, the firstborn of every creature: For by him were all things created, that are in heaven, and that are in earth, visible and invisible, whether they be thrones, or dominions, or principalities, or powers: all things were created by him, and for him.',
    theme: 'Deity', themeSlug: 'deity',
  },
  {
    reference: 'Luke 2:29\u201332',
    book: 'Luke', bookSlug: 'luke', chapter: 2, verse: 29, endVerse: 32,
    text: 'Lord, now lettest thou thy servant depart in peace, according to thy word: For mine eyes have seen thy salvation, Which thou hast prepared before the face of all people; A light to lighten the Gentiles, and the glory of thy people Israel.',
    theme: 'Hope', themeSlug: 'hope',
  },
  {
    reference: 'Hebrews 1:1\u20132',
    book: 'Hebrews', bookSlug: 'hebrews', chapter: 1, verse: 1, endVerse: 2,
    text: 'God, who at sundry times and in divers manners spake in time past unto the fathers by the prophets, Hath in these last days spoken unto us by his Son, whom he hath appointed heir of all things, by whom also he made the worlds.',
    theme: 'Revelation', themeSlug: 'revelation',
  },
  {
    reference: '2 Corinthians 9:15',
    book: '2 Corinthians', bookSlug: '2-corinthians', chapter: 9, verse: 15,
    text: 'Thanks be unto God for his unspeakable gift.',
    theme: 'Gratitude', themeSlug: 'gratitude',
  },
  {
    reference: '1 Timothy 3:16',
    book: '1 Timothy', bookSlug: '1-timothy', chapter: 3, verse: 16,
    text: 'And without controversy great is the mystery of godliness: God was manifest in the flesh, justified in the Spirit, seen of angels, preached unto the Gentiles, believed on in the world, received up into glory.',
    theme: 'Incarnation', themeSlug: 'incarnation',
  },
  {
    reference: 'Matthew 2:6',
    book: 'Matthew', bookSlug: 'matthew', chapter: 2, verse: 6,
    text: 'And thou Bethlehem, in the land of Juda, art not the least among the princes of Juda: for out of thee shall come a Governor, that shall rule my people Israel.',
    theme: 'Prophecy', themeSlug: 'prophecy',
  },
  {
    reference: 'Luke 1:78\u201379',
    book: 'Luke', bookSlug: 'luke', chapter: 1, verse: 78, endVerse: 79,
    text: 'Through the tender mercy of our God; whereby the dayspring from on high hath visited us, To give light to them that sit in darkness and in the shadow of death, to guide our feet into the way of peace.',
    theme: 'Light', themeSlug: 'light',
  },
  {
    reference: 'Isaiah 60:1',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 60, verse: 1,
    text: 'Arise, shine; for thy light is come, and the glory of the LORD is risen upon thee.',
    theme: 'Light', themeSlug: 'light',
  },
  {
    reference: 'Romans 8:32',
    book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 32,
    text: 'He that spared not his own Son, but delivered him up for us all, how shall he not with him also freely give us all things?',
    theme: 'Sacrifice', themeSlug: 'sacrifice',
  },
  {
    reference: '1 John 4:9\u201310',
    book: '1 John', bookSlug: '1-john', chapter: 4, verse: 9, endVerse: 10,
    text: 'In this was manifested the love of God toward us, because that God sent his only begotten Son into the world, that we might live through him. Herein is love, not that we loved God, but that he loved us, and sent his Son to be the propitiation for our sins.',
    theme: 'God\'s Love', themeSlug: 'gods-love',
  },
  {
    reference: 'John 8:12',
    book: 'John', bookSlug: 'john', chapter: 8, verse: 12,
    text: 'Then spake Jesus unto them, saying, I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life.',
    theme: 'Light', themeSlug: 'light',
  },
  {
    reference: 'Matthew 1:18',
    book: 'Matthew', bookSlug: 'matthew', chapter: 1, verse: 18,
    text: 'Now the birth of Jesus Christ was on this wise: When as his mother Mary was espoused to Joseph, before they came together, she was found with child of the Holy Ghost.',
    theme: 'Nativity', themeSlug: 'nativity',
  },
  {
    reference: 'Luke 2:21',
    book: 'Luke', bookSlug: 'luke', chapter: 2, verse: 21,
    text: 'And when eight days were accomplished for the circumcising of the child, his name was called JESUS, which was so named of the angel before he was conceived in the womb.',
    theme: 'Obedience', themeSlug: 'obedience',
  },
  {
    reference: 'Isaiah 42:6',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 42, verse: 6,
    text: 'I the LORD have called thee in righteousness, and will hold thine hand, and will keep thee, and give thee for a covenant of the people, for a light of the Gentiles.',
    theme: 'Covenant', themeSlug: 'covenant',
  },
  {
    reference: 'Luke 2:34\u201335',
    book: 'Luke', bookSlug: 'luke', chapter: 2, verse: 34, endVerse: 35,
    text: 'And Simeon blessed them, and said unto Mary his mother, Behold, this child is set for the fall and rising again of many in Israel; and for a sign which shall be spoken against; (Yea, a sword shall pierce through thy own soul also,) that the thoughts of many hearts may be revealed.',
    theme: 'Prophecy', themeSlug: 'prophecy',
  },
  {
    reference: 'Psalm 98:1\u20133',
    book: 'Psalms', bookSlug: 'psalms', chapter: 98, verse: 1, endVerse: 3,
    text: 'O sing unto the LORD a new song; for he hath done marvellous things: his right hand, and his holy arm, hath gotten him the victory. The LORD hath made known his salvation: his righteousness hath he openly shewed in the sight of the heathen. He hath remembered his mercy and his truth toward the house of Israel: all the ends of the earth have seen the salvation of our God.',
    theme: 'Praise', themeSlug: 'praise',
  },
  {
    reference: 'Isaiah 52:7',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 52, verse: 7,
    text: 'How beautiful upon the mountains are the feet of him that bringeth good tidings, that publisheth peace; that bringeth good tidings of good, that publisheth salvation; that saith unto Zion, Thy God reigneth!',
    theme: 'Gospel', themeSlug: 'gospel',
  },
  {
    reference: 'Matthew 2:16',
    book: 'Matthew', bookSlug: 'matthew', chapter: 2, verse: 16,
    text: 'Then Herod, when he saw that he was mocked of the wise men, was exceeding wroth, and sent forth, and slew all the children that were in Bethlehem, and in all the coasts thereof, from two years old and under, according to the time which he had diligently enquired of the wise men.',
    theme: 'Persecution', themeSlug: 'persecution',
  },
  {
    reference: 'Luke 2:36\u201338',
    book: 'Luke', bookSlug: 'luke', chapter: 2, verse: 36, endVerse: 38,
    text: 'And there was one Anna, a prophetess, the daughter of Phanuel, of the tribe of Aser: she was of a great age, and had lived with an husband seven years from her virginity; And she was a widow of about fourscore and four years, which departed not from the temple, but served God with fastings and prayers night and day. And she coming in that instant gave thanks likewise unto the Lord, and spake of him to all them that looked for redemption in Jerusalem.',
    theme: 'Faith', themeSlug: 'faith',
  },
  {
    reference: 'John 1:1\u20133',
    book: 'John', bookSlug: 'john', chapter: 1, verse: 1, endVerse: 3,
    text: 'In the beginning was the Word, and the Word was with God, and the Word was God. The same was in the beginning with God. All things were made by him; and without him was not any thing made that was made.',
    theme: 'Deity', themeSlug: 'deity',
  },
  {
    reference: 'Revelation 22:16',
    book: 'Revelation', bookSlug: 'revelation', chapter: 22, verse: 16,
    text: 'I Jesus have sent mine angel to testify unto you these things in the churches. I am the root and the offspring of David, and the bright and morning star.',
    theme: 'Hope', themeSlug: 'hope',
  },
  {
    reference: 'Isaiah 9:2',
    book: 'Isaiah', bookSlug: 'isaiah', chapter: 9, verse: 2,
    text: 'The people that walked in darkness have seen a great light: they that dwell in the land of the shadow of death, upon them hath the light shined.',
    theme: 'Light', themeSlug: 'light',
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

function verseUrl(v: ChristmasVerse): string {
  return `/verses/${v.bookSlug}/${v.chapter}/${v.verse}`;
}

/** Collect unique themes for the category filter */
function getUniqueThemes(): string[] {
  const seen = new Set<string>();
  for (const v of CHRISTMAS_VERSES) {
    seen.add(v.theme);
  }
  return Array.from(seen);
}

/** Count unique books */
function getUniqueBooks(): number {
  const seen = new Set<string>();
  for (const v of CHRISTMAS_VERSES) {
    seen.add(v.bookSlug);
  }
  return seen.size;
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Christmas Bible Verses -- 50 KJV Scriptures About the Birth of Jesus Christ, the Nativity Story, Prophecies Fulfilled & Why God Sent His Son to Earth',
  description:
    'Christmas Bible Verses -- 50 KJV Scriptures About the Birth of Jesus Christ, the Nativity Story, Prophecies Fulfilled & Why God Sent His Son to Earth. From Isaiah 9:6 to Luke 2:10-11, explore the full arc of Christmas in Scripture.',
  keywords: [
    'christmas bible verses', 'christmas scripture', 'birth of Jesus bible verses',
    'nativity bible passages', 'christmas story in the bible', 'Luke 2 christmas',
    'bible readings for christmas', 'KJV christmas verses', 'advent scripture readings',
    'christmas eve bible reading', 'Isaiah 9:6', 'for unto us a child is born',
    'Luke 2:10-11', 'nativity story scripture', 'bible verses about christmas',
  ],
  openGraph: {
    title: 'Christmas Bible Verses | 50 KJV Scriptures About the Birth of Jesus & the Nativity Story',
    description: '50 Christmas Bible verses from the King James Version -- prophecy, the nativity, shepherds, wise men, and the incarnation of God in the flesh.',
    url: '/christmas-bible-verses',
    type: 'website',
  },
  alternates: { canonical: '/christmas-bible-verses' },
};

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function ChristmasBibleVersesPage() {
  const themes = getUniqueThemes();
  const booksCount = getUniqueBooks();
  const otVerses = CHRISTMAS_VERSES.filter(v => OT_SLUGS.includes(v.bookSlug));
  const ntVerses = CHRISTMAS_VERSES.filter(v => !OT_SLUGS.includes(v.bookSlug));

  // --- Structured Data ---
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Christmas Bible Verses',
    description: metadata.description,
    url: 'https://biblemaximum.com/christmas-bible-verses',
    numberOfItems: CHRISTMAS_VERSES.length,
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
      { '@type': 'ListItem', position: 3, name: 'Christmas Bible Verses' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the main Bible verses about the birth of Jesus?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The main Bible verses about the birth of Jesus are found in Luke 2:1-20 and Matthew 1:18-2:12. Luke 2:7 describes Jesus laid in a manger, Luke 2:10-11 records the angel\'s announcement to the shepherds, and Matthew 1:21 reveals why He was named Jesus -- "for he shall save his people from their sins." Isaiah 9:6 and Micah 5:2 are the most important Old Testament prophecies pointing to His birth. Together, these passages form the core nativity story that Christians read every Christmas season.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does the Bible say about Christmas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Bible does not mention the word "Christmas," but it records the events that Christmas celebrates -- the birth of Jesus Christ in Bethlehem. Luke chapters 1-2 and Matthew chapters 1-2 provide the fullest accounts of the nativity, including the angelic announcements, the virgin birth, the shepherds\' visit, and the wise men\'s journey. The theological meaning is stated in John 1:14 ("the Word was made flesh, and dwelt among us"), Galatians 4:4-5 (God sent His Son "to redeem them that were under the law"), and 1 Timothy 3:16 ("God was manifest in the flesh"). Christmas, at its biblical core, celebrates the incarnation -- God entering human history as a baby to accomplish salvation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What Old Testament prophecies did Jesus fulfill at birth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Jesus fulfilled numerous Old Testament prophecies at His birth. Isaiah 7:14 predicted a virgin would conceive and bear a son called Immanuel. Micah 5:2 named Bethlehem as the birthplace. Isaiah 9:6 described the child as "Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace." Isaiah 11:1-2 foretold He would come from the lineage of Jesse. Isaiah 42:6 prophesied He would be "a light of the Gentiles." Matthew repeatedly quotes these prophecies to show their fulfillment, stating "that it might be fulfilled which was spoken of the Lord by the prophet" (Matthew 1:22).',
        },
      },
      {
        '@type': 'Question',
        name: 'Where in the Bible does it talk about the wise men?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The wise men (also called Magi) appear in Matthew 2:1-12. They came "from the east to Jerusalem" following a star, asking "Where is he that is born King of the Jews?" (Matthew 2:1-2). Herod directed them to Bethlehem based on Micah 5:2. Matthew 2:10-11 describes their arrival: "When they saw the star, they rejoiced with exceeding great joy. And when they were come into the house, they saw the young child with Mary his mother, and fell down, and worshipped him: and when they had opened their treasures, they presented unto him gifts; gold, and frankincense, and myrrh." Warned in a dream, they returned home by a different route (Matthew 2:12). The Bible does not say there were three wise men -- only that three gifts were given.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the most quoted Christmas Bible verse?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The most quoted Christmas Bible verse is Luke 2:10-11: "And the angel said unto them, Fear not: for, behold, I bring you good tidings of great joy, which shall be to all people. For unto you is born this day in the city of David a Saviour, which is Christ the Lord." Isaiah 9:6 ("For unto us a child is born, unto us a son is given") is the most quoted Old Testament Christmas verse. John 3:16, while not strictly a nativity verse, is widely used at Christmas because it captures the reason God sent His Son. These three verses appear more than any others in Christmas cards, sermons, and holiday readings.',
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={collectionSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      <Breadcrumb items={[{ label: 'Bible Quotes', href: '/bible-quotes' }, { label: 'Christmas Bible Verses' }]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mt-6 mb-8">
              <div className="relative h-48 md:h-56 bg-gradient-to-r from-amber-800 to-amber-900">
                <Image
                  src="/images/bible-candle.jpg"
                  alt="Christmas Bible Verses - Open Bible with candlelight for the birth of Jesus Christ"
                  fill
                  className="object-cover opacity-25"
                  priority
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                    Christmas Bible Verses
                  </h1>
                  <p className="text-amber-100 max-w-2xl mb-4">
                    50 KJV scriptures on the birth of Jesus, Old Testament prophecy,
                    the nativity story, and the incarnation -- God&apos;s greatest gift
                    to mankind told through Scripture.
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
              The Christmas Story Didn&apos;t Start in a Manger
            </h2>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              Most people open their Bibles to Luke 2 on Christmas Eve. And that
              makes sense -- the manger, the shepherds, the angels singing over
              Bethlehem. Beautiful. But the christmas bible verses that actually
              launch this story? They were written roughly 700 years earlier by a
              prophet named Isaiah, sitting in a kingdom that was about to collapse.
              &ldquo;For unto us a child is born, unto us a son is given&rdquo;
              (Isaiah 9:6). That line was not a holiday card. It was a lifeline thrown
              to a people staring down an Assyrian invasion.
            </p>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              Think about that for a second. The nativity story bible readers love
              so much is actually the last chapter of a prophecy arc that stretches
              across the entire Old Testament. Micah pinpointed the town -- Bethlehem
              (Micah 5:2). Isaiah named the method -- a virgin birth (Isaiah 7:14).
              And the lineage? Traced all the way back through David to Jesse to
              Abraham. These were not vague predictions. They were an address, a
              method of arrival, and a family tree. Centuries before it happened.
            </p>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              Luke 2 is the most-read Bible chapter in December, and rightly so.
              Over 30 characters move through the nativity narrative -- Mary and
              Joseph, the innkeeper who said no room, shepherds on a hillside, an
              angel choir, aged Simeon holding the baby in the temple, Anna the
              prophetess who had waited decades for this moment. But here is the
              part that stops me cold every time I read it: the first people to hear
              the birth of jesus scripture announced in real time were not priests
              or scholars or royalty. They were shepherds. Working-class men out in a
              field at night. God bypassed the religious establishment and told the
              news to people who smelled like livestock. That was intentional. And
              it tells you everything about who this baby came for.
            </p>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              Then came the wise men from the east -- following a star, carrying gold,
              frankincense, and myrrh (Matthew 2:1&ndash;11). Foreigners. Gentiles.
              Men who had no covenant claim on the promises of Israel. Yet they
              traveled months to worship a Jewish infant. Matthew records it without
              fanfare, but the theological implication is staggering: this child was
              not just for Israel. He was for every nation. John would later put it
              in language that still echoes through every Christmas scripture reading:
              &ldquo;And the Word was made flesh, and dwelt among us&rdquo; (John
              1:14). God did not send a message. He came Himself.
            </p>
            <p className="text-primary-dark/80 leading-relaxed">
              The 50 christmas scripture passages below trace that full arc -- from
              the oldest messianic prophecies in Isaiah through the manger scene in
              Luke, the wise men in Matthew, and the apostolic reflections on what
              the incarnation means for you and me today. Whether you are planning
              advent bible verses for your family, looking for christmas eve bible
              readings, or searching for KJV christmas passages to memorize this
              season, these bible verses about christmas tell the complete story.
              Each one is presented in the King James Version with links to
              full verse studies, chapter quizzes, and cross-references.
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
            {CHRISTMAS_VERSES.map((verse, idx) => (
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
              How Well Do You Know the Christmas Story? Take a Quiz.
            </h2>
            <p className="text-blue-100 mb-4 max-w-2xl">
              Test your knowledge of the nativity narrative with chapter quizzes from Luke, Matthew, Isaiah, and more. 15 questions per quiz with instant scoring and verse-by-verse explanations.
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
            <h2 className="text-xl font-display font-bold text-scripture mb-2">
              Christmas Verses by Testament
            </h2>
            <p className="text-primary-dark/70 text-sm mb-4">
              The Christmas story is unique because the prophecies live in the Old Testament while their fulfillment unfolds in the New. Below you can see exactly how the two testaments work together -- ancient promises on the left, their realization on the right.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-scripture mb-2">
                  Old Testament -- Prophecy
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
                  New Testament -- Fulfillment
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
                <h3 className="font-bold text-scripture mb-1">What are the main Bible verses about the birth of Jesus?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  The main Bible verses about the birth of Jesus are found in Luke
                  2:1&ndash;20 and Matthew 1:18&ndash;2:12. Luke 2:7 describes Jesus
                  laid in a manger. Luke 2:10&ndash;11 records the angel&apos;s
                  announcement to the shepherds: &ldquo;Fear not: for, behold, I bring
                  you good tidings of great joy.&rdquo; Matthew 1:21 reveals why He was
                  named Jesus -- &ldquo;for he shall save his people from their
                  sins.&rdquo; Isaiah 9:6 and Micah 5:2 are the most significant Old
                  Testament prophecies pointing to His birth. Together, these passages
                  form the core nativity story that Christians read every Christmas
                  season.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What does the Bible say about Christmas?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  The Bible does not mention the word &ldquo;Christmas,&rdquo; but it
                  records the events that Christmas celebrates -- the birth of Jesus
                  Christ in Bethlehem. Luke chapters 1&ndash;2 and Matthew chapters
                  1&ndash;2 provide the fullest accounts of the nativity, including the
                  angelic announcements, the virgin birth, the shepherds&apos; visit,
                  and the wise men&apos;s journey. The theological meaning is stated in
                  John 1:14 (&ldquo;the Word was made flesh, and dwelt among
                  us&rdquo;), Galatians 4:4&ndash;5 (God sent His Son &ldquo;to redeem
                  them that were under the law&rdquo;), and 1 Timothy 3:16 (&ldquo;God
                  was manifest in the flesh&rdquo;). Christmas, at its biblical core,
                  celebrates the incarnation -- God entering human history as a baby to
                  accomplish salvation.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What Old Testament prophecies did Jesus fulfill at birth?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  Jesus fulfilled numerous Old Testament prophecies at His birth.
                  Isaiah 7:14 predicted a virgin would conceive and bear a son called
                  Immanuel. Micah 5:2 named Bethlehem as the birthplace. Isaiah 9:6
                  described the child as &ldquo;Wonderful, Counsellor, The mighty God,
                  The everlasting Father, The Prince of Peace.&rdquo; Isaiah 11:1&ndash;2
                  foretold He would come from the lineage of Jesse. Isaiah 42:6
                  prophesied He would be &ldquo;a light of the Gentiles.&rdquo; Matthew
                  repeatedly quotes these prophecies to show their fulfillment,
                  stating &ldquo;that it might be fulfilled which was spoken of the Lord
                  by the prophet&rdquo; (Matthew 1:22).
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">Where in the Bible does it talk about the wise men?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  The wise men (also called Magi) appear in Matthew 2:1&ndash;12. They
                  came &ldquo;from the east to Jerusalem&rdquo; following a star, asking
                  &ldquo;Where is he that is born King of the Jews?&rdquo; (Matthew
                  2:1&ndash;2). Herod directed them to Bethlehem based on Micah 5:2.
                  Matthew 2:10&ndash;11 describes their arrival: &ldquo;When they saw
                  the star, they rejoiced with exceeding great joy. And when they were
                  come into the house, they saw the young child with Mary his mother,
                  and fell down, and worshipped him: and when they had opened their
                  treasures, they presented unto him gifts; gold, and frankincense, and
                  myrrh.&rdquo; Warned in a dream, they returned home by a different
                  route (Matthew 2:12). The Bible does not say there were three wise
                  men -- only that three gifts were given.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What is the most quoted Christmas Bible verse?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  The most quoted Christmas Bible verse is Luke 2:10&ndash;11:
                  &ldquo;And the angel said unto them, Fear not: for, behold, I bring
                  you good tidings of great joy, which shall be to all people. For unto
                  you is born this day in the city of David a Saviour, which is Christ
                  the Lord.&rdquo; Isaiah 9:6 (&ldquo;For unto us a child is born, unto
                  us a son is given&rdquo;) is the most quoted Old Testament Christmas
                  verse. John 3:16, while not strictly a nativity verse, is widely used
                  at Christmas because it captures the reason God sent His Son. These
                  three verses appear more than any others in Christmas cards, sermons,
                  and holiday readings.
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
                href="/encouraging-bible-verses"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Encouraging Bible Verses</span>
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
