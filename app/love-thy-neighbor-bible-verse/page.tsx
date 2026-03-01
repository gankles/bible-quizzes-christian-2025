import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

// ---------------------------------------------------------------------------
// Love Thy Neighbor Bible Verse -- NLP-Optimized Study Page
// Target keyword: "love thy neighbor bible verse" (9,900 vol, KD 40)
// ---------------------------------------------------------------------------

interface NeighborVerse {
  number: number;
  reference: string;
  label: string;
  book: string;
  bookSlug: string;
  chapter: number;
  verse: number;
  endVerse?: number;
  text: string;
  category: string;
}

const NEIGHBOR_VERSES: NeighborVerse[] = [
  {
    number: 1,
    reference: 'Leviticus 19:18',
    label: 'The Original Command',
    book: 'Leviticus', bookSlug: 'leviticus', chapter: 19, verse: 18,
    text: 'Thou shalt not avenge, nor bear any grudge against the children of thy people, but thou shalt love thy neighbour as thyself: I am the LORD.',
    category: 'love',
  },
  {
    number: 2,
    reference: 'Matthew 22:37\u201339',
    label: 'Greatest Commandment',
    book: 'Matthew', bookSlug: 'matthew', chapter: 22, verse: 37, endVerse: 39,
    text: 'Jesus said unto him, Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind. This is the first and great commandment. And the second is like unto it, Thou shalt love thy neighbour as thyself.',
    category: 'love',
  },
  {
    number: 3,
    reference: 'Mark 12:30\u201331',
    label: 'Greatest Commandment',
    book: 'Mark', bookSlug: 'mark', chapter: 12, verse: 30, endVerse: 31,
    text: 'And thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind, and with all thy strength: this is the first commandment. And the second is like, namely this, Thou shalt love thy neighbour as thyself. There is none other commandment greater than these.',
    category: 'love',
  },
  {
    number: 4,
    reference: 'Luke 10:27',
    label: 'The Lawyer\u2019s Answer',
    book: 'Luke', bookSlug: 'luke', chapter: 10, verse: 27,
    text: 'And he answering said, Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy strength, and with all thy mind; and thy neighbour as thyself.',
    category: 'love',
  },
  {
    number: 5,
    reference: 'Romans 13:9',
    label: 'Love Fulfills the Law',
    book: 'Romans', bookSlug: 'romans', chapter: 13, verse: 9,
    text: 'For this, Thou shalt not commit adultery, Thou shalt not kill, Thou shalt not steal, Thou shalt not bear false witness, Thou shalt not covet; and if there be any other commandment, it is briefly comprehended in this saying, namely, Thou shalt love thy neighbour as thyself.',
    category: 'love',
  },
  {
    number: 6,
    reference: 'Romans 13:10',
    label: 'Love Does No Harm',
    book: 'Romans', bookSlug: 'romans', chapter: 13, verse: 10,
    text: 'Love worketh no ill to his neighbour: therefore love is the fulfilling of the law.',
    category: 'love',
  },
  {
    number: 7,
    reference: 'Galatians 5:14',
    label: 'Whole Law Fulfilled',
    book: 'Galatians', bookSlug: 'galatians', chapter: 5, verse: 14,
    text: 'For all the law is fulfilled in one word, even in this; Thou shalt love thy neighbour as thyself.',
    category: 'love',
  },
  {
    number: 8,
    reference: 'James 2:8',
    label: 'Royal Law',
    book: 'James', bookSlug: 'james', chapter: 2, verse: 8,
    text: 'If ye fulfil the royal law according to the scripture, Thou shalt love thy neighbour as thyself, ye do well:',
    category: 'love',
  },
  {
    number: 9,
    reference: 'Luke 10:30\u201337',
    label: 'Good Samaritan',
    book: 'Luke', bookSlug: 'luke', chapter: 10, verse: 30, endVerse: 37,
    text: 'And Jesus answering said, A certain man went down from Jerusalem to Jericho, and fell among thieves, which stripped him of his raiment, and wounded him, and departed, leaving him half dead. And by chance there came down a certain priest that way: and when he saw him, he passed by on the other side. And likewise a Levite, when he was at the place, came and looked on him, and passed by on the other side. But a certain Samaritan, as he journeyed, came where he was: and when he saw him, he had compassion on him, And went to him, and bound up his wounds, pouring in oil and wine, and set him on his own beast, and brought him to an inn, and took care of him. And on the morrow when he departed, he took out two pence, and gave them to the host, and said unto him, Take care of him; and whatsoever thou spendest more, when I come again, I will repay thee. Which now of these three, thinkest thou, was neighbour unto him that fell among the thieves? And he said, He that shewed mercy on him. Then said Jesus unto him, Go, and do thou likewise.',
    category: 'compassion',
  },
  {
    number: 10,
    reference: 'John 13:34\u201335',
    label: 'New Commandment',
    book: 'John', bookSlug: 'john', chapter: 13, verse: 34, endVerse: 35,
    text: 'A new commandment I give unto you, That ye love one another; as I have loved you, that ye also love one another. By this shall all men know that ye are my disciples, if ye have love one to another.',
    category: 'love',
  },
  {
    number: 11,
    reference: '1 John 4:7\u20138',
    label: 'God Is Love',
    book: '1 John', bookSlug: '1-john', chapter: 4, verse: 7, endVerse: 8,
    text: 'Beloved, let us love one another: for love is of God; and every one that loveth is born of God, and knoweth God. He that loveth not knoweth not God; for God is love.',
    category: 'gods-love',
  },
  {
    number: 12,
    reference: '1 John 4:20\u201321',
    label: 'Love in Action',
    book: '1 John', bookSlug: '1-john', chapter: 4, verse: 20, endVerse: 21,
    text: 'If a man say, I love God, and hateth his brother, he is a liar: for he that loveth not his brother whom he hath seen, how can he love God whom he hath not seen? And this commandment have we from him, That he who loveth God love his brother also.',
    category: 'love',
  },
  {
    number: 13,
    reference: 'Matthew 5:43\u201344',
    label: 'Love Your Enemies',
    book: 'Matthew', bookSlug: 'matthew', chapter: 5, verse: 43, endVerse: 44,
    text: 'Ye have heard that it hath been said, Thou shalt love thy neighbour, and hate thine enemy. But I say unto you, Love your enemies, bless them that curse you, do good to them that hate you, and pray for them which despitefully use you, and persecute you;',
    category: 'love',
  },
  {
    number: 14,
    reference: 'Romans 12:10',
    label: 'Brotherly Love',
    book: 'Romans', bookSlug: 'romans', chapter: 12, verse: 10,
    text: 'Be kindly affectioned one to another with brotherly love; in honour preferring one another;',
    category: 'love',
  },
  {
    number: 15,
    reference: '1 Peter 4:8',
    label: 'Fervent Love',
    book: '1 Peter', bookSlug: '1-peter', chapter: 4, verse: 8,
    text: 'And above all things have fervent charity among yourselves: for charity shall cover the multitude of sins.',
    category: 'love',
  },
  {
    number: 16,
    reference: 'Hebrews 13:1\u20132',
    label: 'Hospitality',
    book: 'Hebrews', bookSlug: 'hebrews', chapter: 13, verse: 1, endVerse: 2,
    text: 'Let brotherly love continue. Be not forgetful to entertain strangers: for thereby some have entertained angels unawares.',
    category: 'hospitality',
  },
  {
    number: 17,
    reference: '1 Thessalonians 3:12',
    label: 'Abounding Love',
    book: '1 Thessalonians', bookSlug: '1-thessalonians', chapter: 3, verse: 12,
    text: 'And the Lord make you to increase and abound in love one toward another, and toward all men, even as we do toward you:',
    category: 'love',
  },
  {
    number: 18,
    reference: 'Colossians 3:14',
    label: 'Bond of Perfectness',
    book: 'Colossians', bookSlug: 'colossians', chapter: 3, verse: 14,
    text: 'And above all these things put on charity, which is the bond of perfectness.',
    category: 'love',
  },
  {
    number: 19,
    reference: 'Proverbs 17:17',
    label: 'Faithful Friend',
    book: 'Proverbs', bookSlug: 'proverbs', chapter: 17, verse: 17,
    text: 'A friend loveth at all times, and a brother is born for adversity.',
    category: 'friendship',
  },
  {
    number: 20,
    reference: '1 Corinthians 13:4\u20137',
    label: 'Love Chapter',
    book: '1 Corinthians', bookSlug: '1-corinthians', chapter: 13, verse: 4, endVerse: 7,
    text: 'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil; Rejoiceth not in iniquity, but rejoiceth in the truth; Beareth all things, believeth all things, hopeth all things, endureth all things.',
    category: 'love',
  },
];

// OT book slugs for detecting testament
const OT_SLUGS = ['genesis','exodus','leviticus','numbers','deuteronomy','joshua','judges','ruth','1-samuel','2-samuel','1-kings','2-kings','1-chronicles','2-chronicles','ezra','nehemiah','esther','job','psalms','proverbs','ecclesiastes','song-of-solomon','isaiah','jeremiah','lamentations','ezekiel','daniel','hosea','joel','amos','obadiah','jonah','micah','nahum','habakkuk','zephaniah','haggai','zechariah','malachi'];

function verseUrl(v: NeighborVerse): string {
  return `/verses/${v.bookSlug}/${v.chapter}/${v.verse}`;
}

function isOT(slug: string): boolean {
  return OT_SLUGS.includes(slug);
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Love Thy Neighbor Bible Verse -- Full KJV Text of Leviticus 19:18, Where Jesus Commands It in Matthew 22:39, What It Means & How to Live It Today',
  description:
    'Love Thy Neighbor Bible Verse -- Full KJV Text of Leviticus 19:18, Where Jesus Commands It in Matthew 22:39, What It Means & How to Live It Today. 20 Scripture passages on loving your neighbor with the Good Samaritan parable, the Royal Law, and practical application.',
  keywords: [
    'love thy neighbor bible verse',
    'love thy neighbour as thyself',
    'love your neighbor as yourself',
    'leviticus 19:18',
    'matthew 22:39',
    'second greatest commandment',
    'what does love thy neighbor mean',
    'who is my neighbor',
    'good samaritan',
    'golden rule',
    'royal law james 2:8',
    'love one another bible verse',
    'love your neighbor KJV',
  ],
  openGraph: {
    title: 'Love Thy Neighbor Bible Verse | Leviticus 19:18 & Matthew 22:39 (KJV)',
    description: 'The complete "love thy neighbor" verse from Leviticus 19:18 and Matthew 22:39 with meaning, context, the Good Samaritan parable, and 20 related Scripture passages.',
    url: '/love-thy-neighbor-bible-verse',
    type: 'article',
  },
  alternates: { canonical: '/love-thy-neighbor-bible-verse' },
};

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function LoveThyNeighborPage() {
  const otVerses = NEIGHBOR_VERSES.filter(v => isOT(v.bookSlug));
  const ntVerses = NEIGHBOR_VERSES.filter(v => !isOT(v.bookSlug));

  // --- Structured Data ---

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bible Study', item: 'https://biblemaximum.com/bible-study-guides' },
      { '@type': 'ListItem', position: 3, name: 'Love Thy Neighbor Bible Verse' },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Love Thy Neighbor Bible Verse -- Full Text, Meaning & Context',
    description: 'A deep-dive study into the "love thy neighbor" command from Leviticus 19:18 and Matthew 22:39 -- what it means, where it appears, and how Jesus expanded it with the Parable of the Good Samaritan.',
    url: 'https://biblemaximum.com/love-thy-neighbor-bible-verse',
    datePublished: '2026-02-28',
    dateModified: '2026-02-28',
    author: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://biblemaximum.com/love-thy-neighbor-bible-verse' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where in the Bible does it say "love thy neighbor"?',
        acceptedAnswer: { '@type': 'Answer', text: 'The phrase "love thy neighbour as thyself" first appears in Leviticus 19:18 in the Old Testament, where God gave it to Israel as part of the Holiness Code. Jesus quoted it in Matthew 22:39 and Mark 12:31 as the second greatest commandment. It also appears in Luke 10:27, Romans 13:9, Galatians 5:14, and James 2:8. The command runs through both Testaments as one of the most repeated instructions in all of Scripture.' },
      },
      {
        '@type': 'Question',
        name: 'What does "love thy neighbor as thyself" mean?',
        acceptedAnswer: { '@type': 'Answer', text: 'To "love thy neighbour as thyself" means to extend the same care, concern, and protection to others that you naturally give to yourself. The Hebrew word for love in Leviticus 19:18 is ahab -- it describes active, deliberate care, not a feeling. The standard is "as thyself": your own instinct for self-preservation and well-being, turned outward toward others. Jesus demonstrated this by connecting the command to sacrificial action in the Parable of the Good Samaritan (Luke 10:25-37).' },
      },
      {
        '@type': 'Question',
        name: 'Who is my neighbor according to Jesus?',
        acceptedAnswer: { '@type': 'Answer', text: 'When a lawyer asked Jesus "Who is my neighbour?" (Luke 10:29), Jesus responded with the Parable of the Good Samaritan. A man was beaten and left for dead on the road from Jerusalem to Jericho. A priest and a Levite both passed by, but a Samaritan -- someone despised by the Jewish audience -- stopped to help. Jesus then asked which one "was neighbour unto him that fell among the thieves." The answer: your neighbor is anyone in need, regardless of nationality, religion, or social standing.' },
      },
      {
        '@type': 'Question',
        name: 'Is "love thy neighbor" in the Old Testament or New Testament?',
        acceptedAnswer: { '@type': 'Answer', text: 'It appears in both. The original command is found in Leviticus 19:18 in the Old Testament, spoken by God to Moses as part of the Law given to Israel. Jesus quoted it in the New Testament in Matthew 22:39, Mark 12:31, and Luke 10:27. The apostle Paul referenced it in Romans 13:9 and Galatians 5:14, and James called it "the royal law" in James 2:8. It is one of the few Old Testament commands that the New Testament writers cite repeatedly.' },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between the Golden Rule and "love thy neighbor"?',
        acceptedAnswer: { '@type': 'Answer', text: 'The Golden Rule -- "Therefore all things whatsoever ye would that men should do to you, do ye even so to them" (Matthew 7:12) -- focuses on treating others as you wish to be treated. "Love thy neighbour as thyself" (Leviticus 19:18) sets a higher standard: love others with the same intensity you naturally love yourself. The Golden Rule is about reciprocal fairness; "love thy neighbor" is about sacrificial devotion. Jesus treated both as summaries of the Law, and together they form the ethical heartbeat of the New Testament.' },
      },
      {
        '@type': 'Question',
        name: 'What is the "Royal Law" in James 2:8?',
        acceptedAnswer: { '@type': 'Answer', text: 'James 2:8 says: "If ye fulfil the royal law according to the scripture, Thou shalt love thy neighbour as thyself, ye do well." James calls "love thy neighbor" the "royal law" because it is the supreme command that governs all human relationships. The word "royal" (basilikos in Greek) means "belonging to the king." Since Jesus, the King of kings, elevated this command as the second greatest commandment, James affirms that obeying it is obeying the King himself.' },
      },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={articleSchema} />
      <StructuredData data={faqSchema} />

      <Breadcrumb items={[
        { label: 'Bible Study', href: '/bible-study-guides' },
        { label: 'Love Thy Neighbor Bible Verse' },
      ]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* ================================================================
            HERO SECTION
        ================================================================ */}
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mt-6 mb-8">
              <div className="relative h-48 md:h-56 bg-gradient-to-r from-amber-800 to-amber-900">
                <Image
                  src="/images/daasianaxe_can_you_give_me_a_extrem_close_up_of_two_hands_openi_a36524ce-8e97-4a05-a528-000bbec1e819.png"
                  alt="Two hands reaching toward each other -- love thy neighbor bible verse"
                  fill
                  className="object-cover opacity-25"
                  priority
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                    Love Thy Neighbor Bible Verse
                  </h1>
                  <p className="text-amber-100 max-w-2xl">
                    The Second Greatest Commandment &mdash; Leviticus 19:18 &amp; Matthew 22:39 (KJV)
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-4 divide-x divide-grace border-b border-grace">
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">20</p>
                  <p className="text-sm text-primary-dark/70">Verses</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">2</p>
                  <p className="text-sm text-primary-dark/70">Testaments</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">KJV</p>
                  <p className="text-sm text-primary-dark/70">Translation</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">14</p>
                  <p className="text-sm text-primary-dark/70">Books</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            FEATURED VERSE -- Leviticus 19:18
        ================================================================ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-5">
              The Love Thy Neighbor Bible Verse &mdash; Leviticus 19:18 (KJV)
            </h2>

            <blockquote className="text-lg md:text-xl text-primary-dark/90 leading-relaxed italic border-l-4 border-amber-400 pl-5 py-3 bg-amber-50/50 rounded-r-lg mb-4">
              &ldquo;Thou shalt not avenge, nor bear any grudge against the children of thy people, but thou shalt love thy neighbour as thyself: I am the LORD.&rdquo;
            </blockquote>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Link href="/verses/leviticus/19/18" className="text-blue-600 hover:underline font-medium">
                Study Leviticus 19:18
              </Link>
              <span className="text-primary-dark/30">|</span>
              <Link href="/chapters/leviticus/19" className="text-blue-600 hover:underline">
                Read Leviticus 19
              </Link>
              <span className="text-primary-dark/30">|</span>
              <Link href="/leviticus-19-quiz" className="text-blue-600 hover:underline font-semibold">
                Take the Leviticus 19 Quiz
              </Link>
              <span className="text-primary-dark/30">|</span>
              <Link href="/cross-references/leviticus/19/18" className="text-blue-600 hover:underline">
                Cross References
              </Link>
            </div>

            <div className="border-t border-grace mt-5 pt-5">
              <div className="flex items-center gap-2 mb-2">
                <Link href="/verses/matthew/22/39" className="text-lg font-display font-bold text-scripture hover:text-blue-600 transition-colors">
                  Matthew 22:39
                </Link>
                <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100">
                  Jesus Quotes It
                </span>
              </div>
              <blockquote className="text-lg md:text-xl text-primary-dark/90 leading-relaxed italic border-l-4 border-amber-400 pl-5 py-3 bg-amber-50/50 rounded-r-lg mb-3">
                &ldquo;And the second is like unto it, Thou shalt love thy neighbour as thyself.&rdquo;
              </blockquote>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Link href="/verses/matthew/22/39" className="text-blue-600 hover:underline font-medium">
                  Study Matthew 22:39
                </Link>
                <span className="text-primary-dark/30">|</span>
                <Link href="/matthew-22-quiz" className="text-blue-600 hover:underline font-semibold">
                  Take the Matthew 22 Quiz
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            NLP ARTICLE (~800 words)
        ================================================================ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">
              What &ldquo;Love Thy Neighbor&rdquo; Actually Means (It&apos;s Not What You Think)
            </h2>
            <div className="text-primary-dark/80 leading-relaxed space-y-4">
              <p>
                &ldquo;Love thy neighbor&rdquo; doesn&apos;t mean what most people think. The original Hebrew word for &ldquo;neighbor&rdquo; in Leviticus 19:18 is <em>rea</em> &mdash; and it meant something far more radical than the family next door. <em>Rea</em> covered fellow Israelites, yes, but also the <em>ger</em> (the foreign sojourner living among them). God made that explicit just two verses later: &ldquo;The stranger that dwelleth with you shall be unto you as one born among you, and thou shalt love him as thyself&rdquo; (Leviticus 19:34). From the very beginning, this command was designed to shatter tribal boundaries.
              </p>
              <p>
                Here is the part that trips people up. The love thy neighbor bible verse doesn&apos;t appear in isolation. It sits inside the Holiness Code &mdash; Leviticus chapters 17 through 26 &mdash; a dense block of legislation that covers everything from sacrificial purity to honest business practices. Verse 18 lands at the end of a section forbidding revenge and grudge-bearing. The logic flows like this: don&apos;t avenge, don&apos;t hold grudges, and instead &mdash; love. The command isn&apos;t soft sentimentality. It&apos;s the hard alternative to retaliation.
              </p>
              <p>
                When Jesus was asked which commandment was the greatest, He reached straight back to the Torah. First: &ldquo;Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind&rdquo; (Deuteronomy 6:5, quoted in Matthew 22:37). Then, without being asked for a second, He volunteered one: &ldquo;And the second is like unto it, Thou shalt love thy neighbour as thyself&rdquo; (Matthew 22:39). The Greek word He used &mdash; <em>homoios</em>, translated &ldquo;like unto it&rdquo; &mdash; doesn&apos;t mean &ldquo;similar.&rdquo; It means &ldquo;of the same nature.&rdquo; In other words, loving your neighbor is not a lesser version of loving God. They are the same kind of love. You cannot do one without the other.
              </p>
              <p>
                This second greatest commandment appears in three of the four Gospels: Matthew 22:39, Mark 12:31, and Luke 10:27. Each time the stakes are identical. A religious expert tests Jesus, and Jesus responds by collapsing the entire Old Testament into two sentences. &ldquo;On these two commandments hang all the law and the prophets&rdquo; (Matthew 22:40). Six hundred and thirteen commandments in the Torah. All of them, Jesus says, are held up by these two.
              </p>
              <p>
                But then came the follow-up question that changed everything. A lawyer, &ldquo;willing to justify himself,&rdquo; asked Jesus: &ldquo;And who is my neighbour?&rdquo; (Luke 10:29). The answer was the Parable of the Good Samaritan &mdash; and Jesus chose that story deliberately. Samaritans were despised by first-century Jews. They were considered half-breeds, heretics, spiritually unclean. By making a Samaritan the hero of a story about neighborly love, Jesus obliterated every category His audience used to define who deserved their care. Your neighbor isn&apos;t someone who shares your background. Your neighbor is whoever is bleeding on the side of the road.
              </p>
              <p>
                The apostle Paul drove the point home. In Romans 13:9, he argued that every commandment &mdash; do not commit adultery, do not kill, do not steal, do not covet &mdash; &ldquo;is briefly comprehended in this saying, namely, Thou shalt love thy neighbour as thyself.&rdquo; Then he added the summary that makes the whole teaching land: &ldquo;Love worketh no ill to his neighbour: therefore love is the fulfilling of the law&rdquo; (Romans 13:10). Not the partial fulfilling. The <em>whole</em> fulfilling. Paul saw this command as the single thread that holds every moral instruction in Scripture together.
              </p>
              <p>
                Galatians 5:14 echoes the same point with even sharper brevity: &ldquo;For all the law is fulfilled in one word, even in this; Thou shalt love thy neighbour as thyself.&rdquo; James goes further still, calling it &ldquo;the royal law&rdquo; (James 2:8) &mdash; <em>basilikos nomos</em> in Greek, the law that belongs to the King. And the apostle John, writing decades after the others, distilled everything into an unflinching test: &ldquo;If a man say, I love God, and hateth his brother, he is a liar&rdquo; (1 John 4:20). No qualifications. No wiggle room. No exceptions.
              </p>
              <p>
                The early church took this literally. They shared meals across ethnic lines. They pooled resources so that no one among them lacked anything (Acts 4:34). They visited prisoners, cared for widows, and took in orphans &mdash; not because it was culturally expected, but because the love thy neighbor bible verse had restructured their entire understanding of obligation. To love your neighbor as yourself meant that someone else&apos;s hunger was your hunger. Someone else&apos;s grief was your grief. That was the revolution.
              </p>
              <p>
                And the standard has not changed. &ldquo;As thyself&rdquo; is still the measure. Not &ldquo;when convenient.&rdquo; Not &ldquo;when reciprocated.&rdquo; As thyself &mdash; with the same urgency, the same protectiveness, the same instinctive care you bring to your own life. That is the second greatest commandment. That is the love thy neighbor bible verse. And it is still the hardest command in all of Scripture to actually obey.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================
            20 VERSES SECTION
        ================================================================ */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <section className="mb-10">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">
              Every Time Scripture Says &ldquo;Love Thy Neighbor&rdquo; &mdash; 20 Verses (KJV)
            </h2>

            {/* OT Verses */}
            {otVerses.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-display font-bold text-scripture mb-3">
                  Old Testament ({otVerses.length})
                </h3>
                <div className="space-y-4">
                  {otVerses.map((v) => (
                    <div key={v.number} className="bg-white rounded-xl shadow-sm border border-grace p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="inline-flex items-center justify-center w-7 h-7 bg-blue-600 text-white text-sm font-bold rounded-full">{v.number}</span>
                        <Link href={verseUrl(v)} className="text-lg font-display font-bold text-scripture hover:text-blue-600 transition-colors">
                          {v.reference}
                        </Link>
                        <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-200">
                          {v.label}
                        </span>
                      </div>
                      <blockquote className="text-primary-dark/80 leading-relaxed italic border-l-4 border-amber-400 pl-4 mb-3">
                        &ldquo;{v.text}&rdquo;
                      </blockquote>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <Link href={verseUrl(v)} className="text-blue-600 hover:underline font-medium">Study this verse</Link>
                        <span className="text-primary-dark/30">|</span>
                        <Link href={`/${v.bookSlug}-chapters`} className="text-blue-600 hover:underline">{v.book} Chapters</Link>
                        <span className="text-primary-dark/30">|</span>
                        <Link href={`/${v.bookSlug}-${v.chapter}-quiz`} className="text-blue-600 hover:underline font-semibold">{v.book} {v.chapter} Quiz</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* NT Verses */}
            {ntVerses.length > 0 && (
              <div>
                <h3 className="text-lg font-display font-bold text-scripture mb-3">
                  New Testament ({ntVerses.length})
                </h3>
                <div className="space-y-4">
                  {ntVerses.map((v) => (
                    <div key={v.number} className="bg-white rounded-xl shadow-sm border border-grace p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="inline-flex items-center justify-center w-7 h-7 bg-blue-600 text-white text-sm font-bold rounded-full">{v.number}</span>
                        <Link href={verseUrl(v)} className="text-lg font-display font-bold text-scripture hover:text-blue-600 transition-colors">
                          {v.reference}
                        </Link>
                        <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100">
                          {v.label}
                        </span>
                      </div>
                      <blockquote className="text-primary-dark/80 leading-relaxed italic border-l-4 border-blue-400 pl-4 mb-3">
                        &ldquo;{v.text}&rdquo;
                      </blockquote>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <Link href={verseUrl(v)} className="text-blue-600 hover:underline font-medium">Study this verse</Link>
                        <span className="text-primary-dark/30">|</span>
                        <Link href={`/${v.bookSlug}-chapters`} className="text-blue-600 hover:underline">{v.book} Chapters</Link>
                        <span className="text-primary-dark/30">|</span>
                        <Link href={`/${v.bookSlug}-${v.chapter}-quiz`} className="text-blue-600 hover:underline font-semibold">{v.book} {v.chapter} Quiz</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </main>

        {/* ================================================================
            THE GOOD SAMARITAN SECTION
        ================================================================ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">
              The Good Samaritan: Jesus Defines &ldquo;Neighbor&rdquo;
            </h2>
            <div className="text-primary-dark/80 leading-relaxed space-y-4">
              <p>
                A lawyer stood up to test Jesus. Not a sincere question &mdash; a trap. &ldquo;Master, what shall I do to inherit eternal life?&rdquo; (Luke 10:25). Jesus turned it back on him: &ldquo;What is written in the law? how readest thou?&rdquo; The lawyer answered correctly, quoting the two greatest commandments. Jesus said, &ldquo;Thou hast answered right: this do, and thou shalt live&rdquo; (Luke 10:28).
              </p>
              <p>
                But the lawyer wasn&apos;t satisfied. He wanted boundaries. Limits. A definition he could manage. So he asked the question that has echoed through twenty centuries of church history: &ldquo;And who is my neighbour?&rdquo; (Luke 10:29).
              </p>
              <p>
                Jesus answered with a story. A man was traveling from Jerusalem to Jericho &mdash; a notoriously dangerous seventeen-mile road that descended over 3,000 feet through rocky desert wilderness. Thieves attacked him, stripped him, beat him, and left him &ldquo;half dead&rdquo; (Luke 10:30).
              </p>
              <p>
                A priest came down the road. He saw the man and &ldquo;passed by on the other side&rdquo; (Luke 10:31). Then a Levite &mdash; a temple worker, someone whose entire vocation was serving God &mdash; did exactly the same thing. Two religious professionals. Both looked. Both walked away. The audience would have expected the third character to be an ordinary Israelite, completing a familiar three-part structure. Instead, Jesus said it was a Samaritan.
              </p>
              <p>
                That detail was a shock. Jews and Samaritans had centuries of mutual hatred. Samaritans were considered unclean, heretical, racially impure. A Jewish audience hearing this story would have flinched. But the Samaritan &ldquo;had compassion on him, and went to him, and bound up his wounds, pouring in oil and wine, and set him on his own beast, and brought him to an inn, and took care of him&rdquo; (Luke 10:33&ndash;34). He paid the innkeeper. He promised to cover any additional expenses.
              </p>
              <p>
                Then came the question that reframed everything. Jesus didn&apos;t ask, &ldquo;Who was the injured man&apos;s neighbor?&rdquo; He asked, &ldquo;Which now of these three, thinkest thou, was neighbour unto him that fell among the thieves?&rdquo; (Luke 10:36). The lawyer answered, &ldquo;He that shewed mercy on him.&rdquo; And Jesus said, &ldquo;Go, and do thou likewise&rdquo; (Luke 10:37).
              </p>
              <p>
                The reversal is the whole point. The lawyer wanted to know who qualified as his neighbor &mdash; who deserved his love. Jesus turned the question inside out. Stop asking who your neighbor is. Start asking whether <em>you</em> are being a neighbor. The love thy neighbor bible verse is not about identifying the right recipients. It is about becoming the right kind of person.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-5 text-sm border-t border-grace pt-4">
              <Link href="/chapters/luke/10" className="text-blue-600 hover:underline font-medium">Read Luke 10</Link>
              <span className="text-primary-dark/30">|</span>
              <Link href="/luke-10-quiz" className="text-blue-600 hover:underline font-semibold">Take the Luke 10 Quiz</Link>
              <span className="text-primary-dark/30">|</span>
              <Link href="/bible-quotes/compassion" className="text-blue-600 hover:underline">Bible Quotes About Compassion</Link>
            </div>
          </div>
        </section>

        {/* ================================================================
            HOW THE APOSTLES TAUGHT THIS COMMAND
        ================================================================ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">
              How the Apostles Taught This Command
            </h2>
            <div className="text-primary-dark/80 leading-relaxed space-y-4">
              <p>
                <strong>Paul</strong> &mdash; The apostle Paul did not merely repeat the love thy neighbor bible verse. He explained <em>why</em> it works. In Romans 13:8&ndash;10, he argued that love is the &ldquo;fulfilling of the law&rdquo; because every prohibition &mdash; against adultery, murder, theft, covetousness &mdash; is automatically satisfied when you genuinely love someone. You don&apos;t need a list of rules for people you truly care about. &ldquo;Love worketh no ill to his neighbour&rdquo; (Romans 13:10). In Galatians 5:14, he compressed the entire Torah into a single phrase: &ldquo;For all the law is fulfilled in one word, even in this; Thou shalt love thy neighbour as thyself.&rdquo; For Paul, this was not a simplification of the Law. It was the Law&apos;s deepest intention, finally stated plainly.
              </p>
              <p>
                <strong>James</strong> &mdash; James, the brother of Jesus and leader of the Jerusalem church, gave the command a title no other writer used: &ldquo;the royal law&rdquo; (James 2:8). The Greek <em>basilikos nomos</em> means the law belonging to the King. James placed this verse in the middle of an argument against favoritism &mdash; showing partiality to the rich while dishonoring the poor. His point was direct: if you show preference to someone because of their status, you are violating the royal law. You cannot love your neighbor as yourself while simultaneously ranking which neighbors deserve your attention. The royal law doesn&apos;t bend for status.
              </p>
              <p>
                <strong>John</strong> &mdash; The apostle John, writing near the end of the first century, made the most confrontational claim of all. &ldquo;If a man say, I love God, and hateth his brother, he is a liar: for he that loveth not his brother whom he hath seen, how can he love God whom he hath not seen?&rdquo; (1 John 4:20). John didn&apos;t qualify the statement. He didn&apos;t say &ldquo;he may be deceived&rdquo; or &ldquo;he is mistaken.&rdquo; He said &ldquo;he is a liar.&rdquo; For John, love for neighbor was not a secondary virtue. It was the visible proof that someone actually knows God. &ldquo;He that loveth not knoweth not God; for God is love&rdquo; (1 John 4:8). No love for people, no knowledge of God. Period.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-5 text-sm border-t border-grace pt-4">
              <Link href="/romans-chapters" className="text-blue-600 hover:underline">Romans Chapters</Link>
              <span className="text-primary-dark/30">|</span>
              <Link href="/galatians-chapters" className="text-blue-600 hover:underline">Galatians Chapters</Link>
              <span className="text-primary-dark/30">|</span>
              <Link href="/james-chapters" className="text-blue-600 hover:underline">James Chapters</Link>
              <span className="text-primary-dark/30">|</span>
              <Link href="/1-john-chapters" className="text-blue-600 hover:underline">1 John Chapters</Link>
            </div>
          </div>
        </section>

        {/* ================================================================
            CTA
        ================================================================ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 md:p-8 text-white">
            <h2 className="text-xl md:text-2xl font-display font-bold mb-2">Test Your Knowledge of These Verses</h2>
            <p className="text-blue-100 mb-4 max-w-2xl">Chapter-by-chapter quizzes for Leviticus, Matthew, Luke, Romans, and every other book of the Bible with instant scoring and verse-by-verse explanations.</p>
            <Link href="/bible-quizzes" className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md">Take a Bible Quiz</Link>
          </div>
        </section>

        {/* ================================================================
            FAQ SECTION
        ================================================================ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-scripture mb-1">Where in the Bible does it say &ldquo;love thy neighbor&rdquo;?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  The phrase &ldquo;love thy neighbour as thyself&rdquo; first appears in <Link href="/verses/leviticus/19/18" className="text-blue-600 hover:underline font-medium">Leviticus 19:18</Link>, where God gave it to Moses as part of the Holiness Code. Jesus quoted it in <Link href="/verses/matthew/22/39" className="text-blue-600 hover:underline font-medium">Matthew 22:39</Link> and <Link href="/verses/mark/12/31" className="text-blue-600 hover:underline font-medium">Mark 12:31</Link> as the second greatest commandment. It also appears in Luke 10:27, Romans 13:9, Galatians 5:14, and James 2:8. No other Old Testament command is quoted this many times in the New Testament.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What does &ldquo;love thy neighbor as thyself&rdquo; mean?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  It means extending the same active care to others that you instinctively give to yourself. The Hebrew word for love here &mdash; <em>ahab</em> &mdash; is not a warm feeling. It describes deliberate, protective action. The standard &ldquo;as thyself&rdquo; is what makes the command so demanding: you know exactly how much effort you put into your own well-being. Now do that for someone else. Jesus demonstrated the meaning through the <Link href="/chapters/luke/10" className="text-blue-600 hover:underline">Parable of the Good Samaritan</Link>, where love was defined by sacrifice, not sentiment.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">Who is my neighbor according to Jesus?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  When a lawyer asked &ldquo;Who is my neighbour?&rdquo; (Luke 10:29), Jesus told the Parable of the Good Samaritan. A man was beaten and left for dead. A priest passed by. A Levite passed by. A Samaritan &mdash; someone despised by the Jewish audience &mdash; stopped, bandaged his wounds, paid for his care, and promised to return. Jesus then asked which of the three was a neighbor. The answer: anyone willing to show mercy. Your neighbor is not defined by proximity or ethnicity. Your neighbor is whoever needs help &mdash; and you become a neighbor by helping.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">Is &ldquo;love thy neighbor&rdquo; in the Old Testament or New Testament?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  Both. The original command appears in Leviticus 19:18 in the Old Testament, given by God to Israel through Moses. Jesus quoted it in the New Testament in Matthew 22:39, Mark 12:31, and Luke 10:27. Paul referenced it in Romans 13:9 and Galatians 5:14. James called it the &ldquo;royal law&rdquo; in James 2:8. It is one of the few Old Testament commands repeated across nearly every genre of New Testament writing &mdash; Gospels, epistles, and practical instruction.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What is the difference between the Golden Rule and &ldquo;love thy neighbor&rdquo;?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  The Golden Rule &mdash; &ldquo;Therefore all things whatsoever ye would that men should do to you, do ye even so to them&rdquo; (<Link href="/verses/matthew/7/12" className="text-blue-600 hover:underline">Matthew 7:12</Link>) &mdash; focuses on reciprocal fairness: treat others the way you want to be treated. &ldquo;Love thy neighbour as thyself&rdquo; sets a higher bar: love others with the same intensity you love yourself. One is about fair treatment. The other is about sacrificial devotion. Jesus taught both, and together they form the ethical foundation of the New Testament. Paul connected them in Romans 13:9&ndash;10, showing that genuine love automatically fulfills every rule about how to treat people.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What is the &ldquo;Royal Law&rdquo; in James 2:8?</h3>
                <p className="text-primary-dark/80 leading-relaxed">
                  James 2:8 says: &ldquo;If ye fulfil the royal law according to the scripture, Thou shalt love thy neighbour as thyself, ye do well.&rdquo; James calls this command the &ldquo;royal law&rdquo; because it belongs to the King. The Greek word <em>basilikos</em> means &ldquo;kingly&rdquo; or &ldquo;belonging to the king.&rdquo; Since Jesus &mdash; the King of kings &mdash; elevated &ldquo;love thy neighbor&rdquo; as the second greatest commandment, obeying it is obeying the King Himself. James invoked this verse while arguing against showing favoritism to the rich, proving that the royal law applies to everyone equally, without partiality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            INTERNAL LINKS
        ================================================================ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">Continue Exploring Scripture</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              <Link href="/bible-quizzes" className="flex items-center px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"><span>Bible Quizzes</span></Link>
              <Link href="/bible-quotes/love" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Quotes About Love</span></Link>
              <Link href="/bible-quotes/compassion" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Quotes About Compassion</span></Link>
              <Link href="/bible-quotes/friendship" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Quotes About Friendship</span></Link>
              <Link href="/leviticus-chapters" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Leviticus Chapters</span></Link>
              <Link href="/matthew-chapters" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Matthew Chapters</span></Link>
              <Link href="/luke-chapters" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Luke Chapters</span></Link>
              <Link href="/popular-bible-verses" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">100 Most Popular Verses</span></Link>
              <Link href="/bible-study-guides" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Study Guides</span></Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
