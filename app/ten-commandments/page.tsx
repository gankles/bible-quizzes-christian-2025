import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

const SITE_URL = 'https://biblemaximum.com';

export const metadata: Metadata = {
  title: 'The Ten Commandments — Complete KJV Text, Meaning & Study | Bible Maximum',
  description:
    'The Ten Commandments — Complete KJV Text From Exodus 20:1-17, What Each Commandment Means, Where Jesus Taught Them & How They Apply to Your Life Today. Includes Deuteronomy 5 parallels, two tablets breakdown, 15 supporting verses, and FAQ.',
  keywords: [
    'ten commandments', '10 commandments', 'ten commandments in order',
    'what are the 10 commandments', 'exodus 20', 'ten commandments kjv',
    'ten commandments list', 'mosaic law', 'gods law', 'mount sinai',
    'tablets of stone', 'ten commandments meaning', 'deuteronomy 5',
    'thou shalt not', 'commandments of god', 'ten commandments bible',
  ],
  alternates: { canonical: '/ten-commandments' },
  openGraph: {
    title: 'The Ten Commandments — Complete KJV Text & Study Guide',
    description: 'Full KJV text of all 10 commandments from Exodus 20:1-17 with meaning, Jesus\' teaching on each, supporting verses, and FAQ.',
    url: `${SITE_URL}/ten-commandments`,
    type: 'article',
    images: ['/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png'],
  },
};

interface Commandment {
  number: number;
  shortName: string;
  kjvText: string;
  exodusRef: string;
  deutRef: string;
  explanation: string;
  jesusRefs: { ref: string; note: string }[];
  supportingVerse: { ref: string; text: string };
}

const COMMANDMENTS: Commandment[] = [
  {
    number: 1,
    shortName: 'No Other Gods',
    kjvText: 'Thou shalt have no other gods before me.',
    exodusRef: 'Exodus 20:3',
    deutRef: 'Deuteronomy 5:7',
    explanation: 'This is the foundation of everything. Before any rule about behavior, God establishes priority. He is first. Not alongside other things. Not one option among many. First. Anything that occupies that top position in your life — money, career, a relationship, your own comfort — is functioning as a god. And God says that slot belongs to Him alone.',
    jesusRefs: [
      { ref: 'Matthew 4:10', note: 'Jesus rebukes Satan: "Thou shalt worship the Lord thy God, and him only shalt thou serve."' },
      { ref: 'Matthew 22:37', note: 'The greatest commandment: "Thou shalt love the Lord thy God with all thy heart."' },
    ],
    supportingVerse: { ref: 'Isaiah 45:5', text: 'I am the LORD, and there is none else, there is no God beside me.' },
  },
  {
    number: 2,
    shortName: 'No Graven Images',
    kjvText: 'Thou shalt not make unto thee any graven image, or any likeness of any thing that is in heaven above, or that is in the earth beneath, or that is in the water under the earth: Thou shalt not bow down thyself to them, nor serve them: for I the LORD thy God am a jealous God, visiting the iniquity of the fathers upon the children unto the third and fourth generation of them that hate me; And shewing mercy unto thousands of them that love me, and keep my commandments.',
    exodusRef: 'Exodus 20:4-6',
    deutRef: 'Deuteronomy 5:8-10',
    explanation: 'The first commandment says who to worship. This one says how. God refuses to be reduced to something you can carve, paint, or control. Every surrounding culture had images of their gods. Israel was told: your God is different. He is spirit. He will not be contained in wood or stone. The moment you try to represent Him, you shrink Him.',
    jesusRefs: [
      { ref: 'John 4:24', note: '"God is a Spirit: and they that worship him must worship him in spirit and in truth."' },
    ],
    supportingVerse: { ref: 'Acts 17:29', text: 'We ought not to think that the Godhead is like unto gold, or silver, or stone, graven by art and man\'s device.' },
  },
  {
    number: 3,
    shortName: 'Do Not Take God\'s Name in Vain',
    kjvText: 'Thou shalt not take the name of the LORD thy God in vain; for the LORD will not hold him guiltless that taketh his name in vain.',
    exodusRef: 'Exodus 20:7',
    deutRef: 'Deuteronomy 5:11',
    explanation: 'This goes far beyond casual profanity. To take God\'s name "in vain" means to carry it emptily — to invoke it in false oaths, to claim His authority for your agenda, to call yourself a Christian while living as though He does not exist. God\'s name represents His character. Misusing it is not a small thing. He says so directly.',
    jesusRefs: [
      { ref: 'Matthew 6:9', note: 'Jesus teaches us to pray: "Our Father which art in heaven, Hallowed be thy name."' },
    ],
    supportingVerse: { ref: 'Psalm 111:9', text: 'He sent redemption unto his people: he hath commanded his covenant for ever: holy and reverend is his name.' },
  },
  {
    number: 4,
    shortName: 'Remember the Sabbath',
    kjvText: 'Remember the sabbath day, to keep it holy. Six days shalt thou labour, and do all thy work: But the seventh day is the sabbath of the LORD thy God: in it thou shalt not do any work, thou, nor thy son, nor thy daughter, thy manservant, nor thy maidservant, nor thy cattle, nor thy stranger that is within thy gates: For in six days the LORD made heaven and earth, the sea, and all that in them is, and rested the seventh day: wherefore the LORD blessed the sabbath day, and hallowed it.',
    exodusRef: 'Exodus 20:8-11',
    deutRef: 'Deuteronomy 5:12-15',
    explanation: 'This is the only commandment that begins with "remember." God worked six days and rested on the seventh — not because He was tired, but to set a pattern. Rest is not laziness. It is trust. It says: God provides even when I stop working. The Sabbath was a weekly declaration that Israel belonged to a God who sustains them, not to Pharaoh who drove them.',
    jesusRefs: [
      { ref: 'Mark 2:27-28', note: '"The sabbath was made for man, and not man for the sabbath: Therefore the Son of man is Lord also of the sabbath."' },
    ],
    supportingVerse: { ref: 'Hebrews 4:9-10', text: 'There remaineth therefore a rest to the people of God. For he that is entered into his rest, he also hath ceased from his own works, as God did from his.' },
  },
  {
    number: 5,
    shortName: 'Honor Thy Father and Mother',
    kjvText: 'Honour thy father and thy mother: that thy days may be long upon the land which the LORD thy God giveth thee.',
    exodusRef: 'Exodus 20:12',
    deutRef: 'Deuteronomy 5:16',
    explanation: 'The first commandment about human relationships. And it comes with a promise. Notice it does not say "honor your parents if they deserve it." Obedience in childhood. Respect in adulthood. Care in their old age. Paul called this the first commandment with a promise (Ephesians 6:2-3). The health of a society can be measured by how it treats parents.',
    jesusRefs: [
      { ref: 'Matthew 15:4', note: 'Jesus rebukes the Pharisees for using religious loopholes to avoid caring for their parents.' },
      { ref: 'Ephesians 6:1-3', note: 'Paul restates: "Children, obey your parents in the Lord: for this is right."' },
    ],
    supportingVerse: { ref: 'Proverbs 1:8', text: 'My son, hear the instruction of thy father, and forsake not the law of thy mother.' },
  },
  {
    number: 6,
    shortName: 'Thou Shalt Not Kill',
    kjvText: 'Thou shalt not kill.',
    exodusRef: 'Exodus 20:13',
    deutRef: 'Deuteronomy 5:17',
    explanation: 'Four words. No qualifiers needed. The Hebrew word is "ratsach" — unlawful killing, murder. Human life is sacred because humans bear the image of God (Genesis 9:6). But Jesus did not stop at the act. He went to the root.',
    jesusRefs: [
      { ref: 'Matthew 5:21-22', note: 'Jesus extends this to anger: "Whosoever is angry with his brother without a cause shall be in danger of the judgment."' },
    ],
    supportingVerse: { ref: 'Genesis 9:6', text: 'Whoso sheddeth man\'s blood, by man shall his blood be shed: for in the image of God made he man.' },
  },
  {
    number: 7,
    shortName: 'Thou Shalt Not Commit Adultery',
    kjvText: 'Thou shalt not commit adultery.',
    exodusRef: 'Exodus 20:14',
    deutRef: 'Deuteronomy 5:18',
    explanation: 'Marriage is a covenant, not a contract. Adultery doesn\'t just break a rule — it shatters trust, destroys families, and violates a bond that God Himself established (Genesis 2:24). This commandment protects the most intimate human relationship. And again, Jesus raised the bar.',
    jesusRefs: [
      { ref: 'Matthew 5:27-28', note: 'Jesus extends this to lust: "Whosoever looketh on a woman to lust after her hath committed adultery with her already in his heart."' },
    ],
    supportingVerse: { ref: 'Hebrews 13:4', text: 'Marriage is honourable in all, and the bed undefiled: but whoremongers and adulterers God will judge.' },
  },
  {
    number: 8,
    shortName: 'Thou Shalt Not Steal',
    kjvText: 'Thou shalt not steal.',
    exodusRef: 'Exodus 20:15',
    deutRef: 'Deuteronomy 5:19',
    explanation: 'Three words that assume something radical: you have a right to own things, and nobody has the right to take them. This commandment protects property, establishes honest labor, and condemns fraud, deception, and exploitation. The opposite of stealing is not just "not taking." It is giving.',
    jesusRefs: [
      { ref: 'Matthew 19:18', note: 'Jesus lists "Thou shalt not steal" when teaching the rich young ruler.' },
      { ref: 'Ephesians 4:28', note: '"Let him that stole steal no more: but rather let him labour, working with his hands."' },
    ],
    supportingVerse: { ref: 'Proverbs 11:1', text: 'A false balance is abomination to the LORD: but a just weight is his delight.' },
  },
  {
    number: 9,
    shortName: 'Thou Shalt Not Bear False Witness',
    kjvText: 'Thou shalt not bear false witness against thy neighbour.',
    exodusRef: 'Exodus 20:16',
    deutRef: 'Deuteronomy 5:20',
    explanation: 'Originally aimed at courtroom perjury — lying under oath could destroy an innocent person\'s life. But the principle extends to all dishonesty: gossip, slander, half-truths, strategic omissions. A community that cannot trust its members\' word cannot function. Truth is not optional. It is structural.',
    jesusRefs: [
      { ref: 'Matthew 15:19', note: 'Jesus identifies "false witness" as one of the evils that proceed from the heart.' },
      { ref: 'John 8:44', note: 'Jesus calls the devil "the father of lies" — dishonesty has a spiritual source.' },
    ],
    supportingVerse: { ref: 'Proverbs 12:22', text: 'Lying lips are abomination to the LORD: but they that deal truly are his delight.' },
  },
  {
    number: 10,
    shortName: 'Thou Shalt Not Covet',
    kjvText: 'Thou shalt not covet thy neighbour\'s house, thou shalt not covet thy neighbour\'s wife, nor his manservant, nor his maidservant, nor his ox, nor his ass, nor any thing that is thy neighbour\'s.',
    exodusRef: 'Exodus 20:17',
    deutRef: 'Deuteronomy 5:21',
    explanation: 'The tenth commandment is different from all the others. It targets the inside. You cannot arrest someone for coveting. No court can prove it. But God sees the heart, and He knows that coveting is the root of nearly every other sin on this list. Theft starts with wanting what isn\'t yours. Adultery starts with wanting who isn\'t yours. Murder starts with envy. Paul said this commandment convicted him more than any other (Romans 7:7).',
    jesusRefs: [
      { ref: 'Luke 12:15', note: '"Take heed, and beware of covetousness: for a man\'s life consisteth not in the abundance of the things which he possesseth."' },
      { ref: 'Matthew 6:19-21', note: '"Lay not up for yourselves treasures upon earth... For where your treasure is, there will your heart be also."' },
    ],
    supportingVerse: { ref: '1 Timothy 6:10', text: 'For the love of money is the root of all evil: which while some coveted after, they have erred from the faith, and pierced themselves through with many sorrows.' },
  },
];

const SUPPORTING_VERSES = [
  { ref: 'Psalm 19:7', text: 'The law of the LORD is perfect, converting the soul: the testimony of the LORD is sure, making wise the simple.', label: 'God\'s Law', topic: 'gods-law' },
  { ref: 'Romans 13:9-10', text: 'For this, Thou shalt not commit adultery, Thou shalt not kill, Thou shalt not steal, Thou shalt not bear false witness, Thou shalt not covet; and if there be any other commandment, it is briefly comprehended in this saying, namely, Thou shalt love thy neighbour as thyself. Love worketh no ill to his neighbour: therefore love is the fulfilling of the law.', label: 'Love Fulfills Law', topic: 'love' },
  { ref: 'Matthew 5:17-18', text: 'Think not that I am come to destroy the law, or the prophets: I am not come to destroy, but to fulfil. For verily I say unto you, Till heaven and earth pass, one jot or one tittle shall in no wise pass from the law, till all be fulfilled.', label: 'Jesus Fulfills Law', topic: 'fulfillment' },
  { ref: 'James 2:10-11', text: 'For whosoever shall keep the whole law, and yet offend in one point, he is guilty of all. For he that said, Do not commit adultery, said also, Do not kill. Now if thou commit no adultery, yet if thou kill, thou art become a transgressor of the law.', label: 'Keep All the Law', topic: 'obedience' },
  { ref: 'Romans 3:20', text: 'Therefore by the deeds of the law there shall no flesh be justified in his sight: for by the law is the knowledge of sin.', label: 'Purpose of Law', topic: 'law' },
  { ref: 'Galatians 3:24', text: 'Wherefore the law was our schoolmaster to bring us unto Christ, that we might be justified by faith.', label: 'Law as Schoolmaster', topic: 'law' },
  { ref: 'Psalm 119:105', text: 'Thy word is a lamp unto my feet, and a light unto my path.', label: 'God\'s Word', topic: 'gods-word' },
  { ref: 'Deuteronomy 6:4-5', text: 'Hear, O Israel: The LORD our God is one LORD: And thou shalt love the LORD thy God with all thine heart, and with all thy soul, and with all thy might.', label: 'The Shema', topic: 'love' },
  { ref: 'Matthew 22:37-40', text: 'Jesus said unto him, Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind. This is the first and great commandment. And the second is like unto it, Thou shalt love thy neighbour as thyself. On these two commandments hang all the law and the prophets.', label: 'Greatest Commandment', topic: 'love' },
  { ref: 'John 14:15', text: 'If ye love me, keep my commandments.', label: 'If You Love Me', topic: 'obedience' },
  { ref: '1 John 5:3', text: 'For this is the love of God, that we keep his commandments: and his commandments are not grievous.', label: 'Not Grievous', topic: 'obedience' },
  { ref: 'Psalm 1:1-2', text: 'Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful. But his delight is in the law of the LORD; and in his law doth he meditate day and night.', label: 'Blessed Is the Man', topic: 'blessing' },
  { ref: 'Romans 7:12', text: 'Wherefore the law is holy, and the commandment holy, and just, and good.', label: 'The Law Is Holy', topic: 'law' },
  { ref: 'Micah 6:8', text: 'He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?', label: 'What God Requires', topic: 'obedience' },
  { ref: 'Psalm 119:11', text: 'Thy word have I hid in mine heart, that I might not sin against thee.', label: 'Word Hidden in Heart', topic: 'gods-word' },
];

const FAQ_ITEMS = [
  {
    question: 'What are the Ten Commandments in order?',
    answer: 'The Ten Commandments in order, from Exodus 20:1-17 (KJV), are: (1) Thou shalt have no other gods before me, (2) Thou shalt not make unto thee any graven image, (3) Thou shalt not take the name of the LORD thy God in vain, (4) Remember the sabbath day to keep it holy, (5) Honour thy father and thy mother, (6) Thou shalt not kill, (7) Thou shalt not commit adultery, (8) Thou shalt not steal, (9) Thou shalt not bear false witness against thy neighbour, and (10) Thou shalt not covet. The first four address our relationship with God; the last six address our relationship with other people.',
  },
  {
    question: 'Where are the Ten Commandments found in the Bible?',
    answer: 'The Ten Commandments appear in two primary locations: Exodus 20:1-17, where God first spoke them directly to Israel at Mount Sinai, and Deuteronomy 5:6-21, where Moses restated them about forty years later to the next generation before they entered the Promised Land. Jesus referenced and summarized them in Matthew 22:37-40. Paul discussed their purpose in Romans 13:8-10 and Galatians 3:24. Jesus deepened their meaning in the Sermon on the Mount (Matthew 5:21-48).',
  },
  {
    question: 'Did Jesus follow the Ten Commandments?',
    answer: 'Yes. Jesus kept the entire law perfectly — He is the only person in history who never broke a single commandment. But He did far more than follow them. He fulfilled them (Matthew 5:17). In the Sermon on the Mount, He revealed that the commandments address not just actions but the heart behind them. Murder includes unjust anger. Adultery includes lust. He did not lower the standard. He showed us what perfect obedience actually looks like — and then died for everyone who falls short of it.',
  },
  {
    question: 'What is the difference between the Exodus and Deuteronomy versions?',
    answer: 'Both Exodus 20:1-17 and Deuteronomy 5:6-21 contain the same Ten Commandments with nearly identical wording. The most notable difference is in the Sabbath commandment: Exodus 20:11 grounds rest in creation ("For in six days the LORD made heaven and earth"), while Deuteronomy 5:15 grounds it in redemption ("Remember that thou wast a servant in the land of Egypt"). Both reasons are true. Exodus was given to the generation that left Egypt; Deuteronomy was restated to their children forty years later, on the border of the Promised Land.',
  },
  {
    question: 'Are Christians still under the Ten Commandments?',
    answer: 'Christians are not under the Mosaic law as a covenant system — Paul is clear about that in Galatians 3:24-25 and Romans 6:14. However, the moral principles reflected in the Ten Commandments reveal God\'s unchanging character. Jesus did not abolish them; He fulfilled them and deepened them (Matthew 5:17-20). Nine of the ten commandments are restated in the New Testament. The Sabbath commandment is the exception, with the New Testament treating rest as fulfilled in Christ (Hebrews 4:9-10). Christians obey not to earn salvation, but because they love the God who saved them (John 14:15).',
  },
  {
    question: 'What is the punishment for breaking the Ten Commandments?',
    answer: 'Under the Mosaic covenant, penalties varied by commandment. Idolatry, murder, adultery, and Sabbath-breaking carried the death penalty. False witness received the punishment the accused would have faced. But the deeper answer is found in Romans 6:23: "The wages of sin is death." Every violation of God\'s law carries an eternal consequence — separation from God. That is precisely why the gospel matters. Jesus bore the penalty for lawbreakers on the cross, so that "whosoever believeth in him should not perish, but have everlasting life" (John 3:16). The commandments show us our need. Christ meets it.',
  },
];

export default function TenCommandmentsPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Bible Study', item: `${SITE_URL}/bible-study` },
      { '@type': 'ListItem', position: 3, name: 'The Ten Commandments', item: `${SITE_URL}/ten-commandments` },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Ten Commandments — Complete KJV Text, Meaning & Study',
    description: metadata.description,
    url: `${SITE_URL}/ten-commandments`,
    author: { '@type': 'Organization', name: 'Bible Maximum' },
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: SITE_URL },
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/ten-commandments` },
    about: [
      { '@type': 'Thing', name: 'Ten Commandments' },
      { '@type': 'Thing', name: 'Exodus 20' },
      { '@type': 'Thing', name: 'Mosaic Law' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'The Ten Commandments',
    numberOfItems: 10,
    itemListElement: COMMANDMENTS.map(c => ({
      '@type': 'ListItem',
      position: c.number,
      name: `${c.number}. ${c.shortName}`,
      description: c.kjvText,
    })),
  };

  return (
    <div className="min-h-screen bg-primary-light/30 dark:bg-dark-bg">
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={articleSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={itemListSchema} />

      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Bible Study', href: '/bible-study' },
        { label: 'The Ten Commandments' },
      ]} />

      {/* Hero Section */}
      <header className="relative bg-scripture dark:bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png"
            alt="Open Bible with light representing God's eternal law"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-blue-300 text-sm font-bold uppercase tracking-widest mb-4">Complete Study Guide</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-display leading-tight mb-4">
            The Ten Commandments
          </h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            God&apos;s Moral Law — Exodus 20:1-17 | Deuteronomy 5:6-21 (King James Version)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3">
              <p className="text-2xl font-bold text-white">10</p>
              <p className="text-blue-200 text-xs">Commandments</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3">
              <p className="text-2xl font-bold text-white">2</p>
              <p className="text-blue-200 text-xs">Tablets</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3">
              <p className="text-2xl font-bold text-white">4</p>
              <p className="text-blue-200 text-xs">About God</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3">
              <p className="text-2xl font-bold text-white">6</p>
              <p className="text-blue-200 text-xs">About People</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#commandments" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
              Read All Ten
            </a>
            <a href="#jesus-and-the-law" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
              Jesus &amp; the Commandments
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">

        {/* NLP Article Section */}
        <section className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 mb-12 shadow-sm">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Ten Rules That Changed Everything</h2>
          <div className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed space-y-4">
            <p>
              The Ten Commandments weren&apos;t the first laws in human history. But they were the first that applied to everyone equally — king and slave, rich and poor. Before Sinai, law codes like Hammurabi&apos;s protected the ruling class. God&apos;s law protected the widow, the orphan, and the stranger. That was new. That was radical.
            </p>
            <p>
              Here is what happened. Israel had spent four centuries in Egyptian slavery. They had no legal system, no written moral code, no national identity beyond shared suffering. God delivered them through Moses, parted the Red Sea, and led them into the wilderness. Three months later, they arrived at the base of Mount Sinai.
            </p>
            <p>
              The mountain shook. Thunder rolled. A thick cloud covered the summit and a trumpet blast grew louder and louder until the people trembled (Exodus 19:16-19). Then God spoke. Not through an angel. Not through a priest. Directly. Ten statements. Ten boundaries. Ten pillars for an entire civilization.
            </p>
            <p>
              Moses went up the mountain and received two tablets of stone, written by the finger of God (Exodus 31:18). When he came back down and found Israel worshipping a golden calf, he shattered them. God wrote them again. Same words. Same stone. Grace after failure. That pattern runs through the entire Bible.
            </p>
            <p>
              The structure of the <strong>ten commandments list</strong> reveals God&apos;s priorities. The first four commandments address the vertical relationship — how you relate to God. No other gods. No idols. Honor His name. Keep His Sabbath. The last six commandments address the horizontal — how you relate to people. Honor parents. Don&apos;t murder, commit adultery, steal, lie, or covet. Vertical first. Then horizontal. You cannot love people rightly until you love God first.
            </p>
            <p>
              Jesus confirmed this when asked which commandment was greatest. His answer compressed all ten into two: &ldquo;Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind&rdquo; — that covers commandments one through four. &ldquo;And the second is like unto it, Thou shalt love thy neighbour as thyself&rdquo; — that covers five through ten (Matthew 22:37-40). He wasn&apos;t replacing them. He was revealing the thread that held them together all along.
            </p>
            <p>
              And here is what changes how you read the entire passage. The <strong>ten commandments in order</strong> don&apos;t start with &ldquo;Thou shalt not.&rdquo; They start with this: <em>&ldquo;I am the LORD thy God, which have brought thee out of the land of Egypt, out of the house of bondage&rdquo;</em> (Exodus 20:2). Identity before instruction. Rescue before rules. God didn&apos;t hand these laws to strangers. He gave them to a people He had already saved.
            </p>
            <p>
              The <strong>Deuteronomy 5</strong> parallel matters too. Forty years later, Moses restated the <strong>10 commandments</strong> to a new generation standing on the edge of the Promised Land. Same laws. New audience. The Sabbath commandment even shifts its reasoning — from creation in Exodus to redemption in Deuteronomy. Both are true. Rest is woven into the fabric of the universe and into the story of salvation.
            </p>
            <p>
              Did Jesus abolish the <strong>mosaic law</strong>? He answered that directly: &ldquo;Think not that I am come to destroy the law, or the prophets: I am not come to destroy, but to fulfil&rdquo; (Matthew 5:17). In the Sermon on the Mount, He did not lower the bar. He raised it. Murder became anger. Adultery became lust. The <strong>ten commandments meaning</strong> goes deeper than behavior. It reaches the heart. Always has.
            </p>
            <p>
              Paul later wrote that the law was a &ldquo;schoolmaster to bring us unto Christ&rdquo; (Galatians 3:24). Not a ladder to climb. A mirror. The <strong>ten commandments kjv</strong> readers encounter in Exodus 20 do not exist to make you feel good about yourself. They exist to show you what God&apos;s standard actually looks like — and then to drive you to the only person who ever met it. That is the function of the <strong>tablets of stone</strong>. They are not a self-help program. They are a diagnosis. And the cure is found in the one who said, &ldquo;Come unto me, all ye that labour and are heavy laden, and I will give you rest&rdquo; (Matthew 11:28).
            </p>
            <p>
              Whether you are reading the <strong>what are the 10 commandments</strong> for the first time or the hundredth — whether you came here for a school assignment or a personal conviction — what follows is the full text of every commandment, exactly as God spoke them, with the context most people miss.
            </p>
          </div>
        </section>

        {/* Exodus 20 Preamble */}
        <section className="mb-8">
          <div className="bg-amber-50/50 dark:bg-amber-950/10 border-2 border-amber-200 dark:border-amber-800/30 rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-scripture dark:text-white font-display mb-3">Before the First Commandment</h2>
            <blockquote className="border-l-4 border-amber-400 dark:border-amber-600 pl-4 mb-4">
              <p className="text-primary-dark/90 dark:text-primary-dark/50 italic leading-relaxed text-lg">
                &ldquo;And God spake all these words, saying, I am the LORD thy God, which have brought thee out of the land of Egypt, out of the house of bondage.&rdquo;
              </p>
              <cite className="block mt-2 text-amber-700 dark:text-amber-400 text-xs font-bold not-italic">— Exodus 20:1-2 (KJV)</cite>
            </blockquote>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-sm">
              This preamble is easily overlooked, but it changes how you read everything that follows. God does not introduce Himself as a lawgiver. He introduces Himself as a rescuer. &ldquo;I brought you out.&rdquo; Before He asks anything of Israel, He reminds them of what He has already done. The commandments are not conditions for God&apos;s love. They are the response to it. Obedience flows from gratitude, not from fear. This is the pattern of the entire Bible: grace first, then instruction.
            </p>
          </div>
        </section>

        {/* The Ten Commandments — Individual Sections */}
        <section id="commandments" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">The Ten Commandments — Full KJV Text &amp; Study</h2>
          <p className="text-primary-dark/60 dark:text-primary-dark/40 mb-6 text-sm">Each commandment with the complete King James Version text from Exodus 20, Deuteronomy 5 parallel, explanation, and where Jesus teaches it in the New Testament.</p>

          <div className="space-y-6">
            {COMMANDMENTS.map(cmd => (
              <div key={cmd.number} id={`commandment-${cmd.number}`} className="bg-white dark:bg-dark-surface rounded-xl border-2 border-grace dark:border-dark-border hover:border-blue-200 dark:hover:border-blue-800 transition-all p-5 md:p-6 shadow-sm scroll-mt-20">
                {/* Header */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white text-lg font-bold rounded-full shrink-0">{cmd.number}</span>
                  <div>
                    <h3 className="text-xl font-bold text-scripture dark:text-white font-display">{cmd.shortName}</h3>
                    <p className="text-xs text-primary-dark/50 dark:text-primary-dark/30">{cmd.exodusRef} | {cmd.deutRef}</p>
                  </div>
                </div>

                {/* KJV Blockquote */}
                <blockquote className="border-l-4 border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/20 rounded-r-lg pl-4 pr-4 py-3 mb-4">
                  <p className="text-primary-dark/90 dark:text-primary-dark/50 italic leading-relaxed">
                    &ldquo;{cmd.kjvText}&rdquo;
                  </p>
                  <cite className="block mt-2 text-blue-600 dark:text-blue-400 text-xs font-bold not-italic">
                    — {cmd.exodusRef} (KJV)
                  </cite>
                </blockquote>

                {/* Explanation */}
                <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
                  {cmd.explanation}
                </p>

                {/* Jesus References */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-scripture dark:text-white uppercase tracking-wider mb-2">Where Jesus Teaches This</p>
                  <div className="space-y-2">
                    {cmd.jesusRefs.map((jr, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border">
                        <Link href={`/verses/${jr.ref.toLowerCase().replace(/\s+/g, '/').replace(/:/g, '/')}`} className="text-blue-600 dark:text-blue-400 text-sm font-bold whitespace-nowrap hover:underline shrink-0">
                          {jr.ref}
                        </Link>
                        <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed">{jr.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Supporting Verse */}
                <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-800/30 rounded-lg p-3">
                  <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm italic leading-relaxed">
                    &ldquo;{cmd.supportingVerse.text}&rdquo;
                  </p>
                  <p className="text-amber-700 dark:text-amber-400 text-xs font-bold mt-1">— {cmd.supportingVerse.ref}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Jesus and the Ten Commandments */}
        <section id="jesus-and-the-law" className="mb-12 scroll-mt-20">
          <div className="bg-gradient-to-br from-scripture via-scripture/95 to-blue-950 rounded-xl p-6 md:p-8 text-white shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-6 text-center">Jesus and the Ten Commandments</h2>
            <div className="max-w-3xl mx-auto space-y-4 text-blue-100 leading-relaxed">
              <p>
                People assume Jesus softened the law. The opposite is true. He sharpened it.
              </p>
              <p>
                &ldquo;Think not that I am come to destroy the law, or the prophets: I am not come to destroy, but to fulfil&rdquo; (Matthew 5:17). That word &ldquo;fulfil&rdquo; is important. Jesus did not erase the commandments. He filled them to their fullest meaning. He showed what perfect obedience looks like — not just in action, but in the hidden places of the human heart.
              </p>
              <p>
                In the Sermon on the Mount (Matthew 5-7), Jesus took commandment after commandment and drove them deeper. &ldquo;Thou shalt not kill&rdquo; became: don&apos;t even harbor anger without cause. &ldquo;Thou shalt not commit adultery&rdquo; became: don&apos;t even look with lust. The Pharisees had reduced the commandments to a behavioral checklist — as long as you didn&apos;t physically murder or physically steal, you passed. Jesus said: wrong. God has always cared about what happens on the inside.
              </p>
              <p>
                This is what makes the gospel necessary. If the standard were merely external, some people might achieve it. But Jesus revealed that the standard is internal — perfect love for God and perfect love for people, in thought, desire, and motivation. No one meets that standard. No one except Him. And that is precisely why He went to the cross.
              </p>
              <p>
                &ldquo;Christ is the end of the law for righteousness to every one that believeth&rdquo; (Romans 10:4). Not the end as in abolition. The end as in destination. The commandments pointed forward to someone who would keep them perfectly and then bear the penalty for everyone who couldn&apos;t. That someone is Jesus.
              </p>
              <p>
                Consider the scope of what He did. He never placed anything above the Father — commandment one, kept. He worshipped in spirit and truth — commandment two, kept. He hallowed His Father&apos;s name in every prayer — commandment three, kept. He observed the Sabbath rightly, healing on it even when the religious leaders objected — commandment four, kept and corrected. He honored His mother from the cross (John 19:26-27) — commandment five, kept to His last breath. He never hated without cause, never lusted, never took what wasn&apos;t His, never spoke a false word, never envied. Ten for ten. The spotless record that no human being has ever achieved.
              </p>
              <p>
                And then He offered that record to anyone who would trust Him. &ldquo;For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him&rdquo; (2 Corinthians 5:21). The commandments diagnose the disease. Jesus provides the cure. That is the relationship between law and gospel. They are not enemies. They are partners in the same rescue.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/what-does-the-bible-say-about/salvation" className="inline-flex items-center justify-center bg-white text-scripture font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors text-sm uppercase tracking-wider">
                How to Be Saved
              </Link>
              <Link href="/matthew-5-quiz" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
                Sermon on the Mount Quiz
              </Link>
            </div>
          </div>
        </section>

        {/* Two Tablets Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Two Tablets, Two Relationships</h2>
          <p className="text-primary-dark/60 dark:text-primary-dark/40 mb-6 text-sm">
            God wrote the Ten Commandments on two tablets of stone (Exodus 31:18). Tradition holds that the division reflects two categories of relationship.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tablet 1 */}
            <div className="bg-white dark:bg-dark-surface rounded-xl border-2 border-blue-200 dark:border-blue-800 p-6 shadow-sm">
              <div className="text-center mb-4">
                <span className="inline-block bg-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full">Tablet 1 — Commandments 1-4</span>
                <h3 className="text-xl font-bold text-scripture dark:text-white font-display mt-3">Love God</h3>
                <p className="text-primary-dark/60 dark:text-primary-dark/40 text-sm mt-1">
                  &ldquo;Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind.&rdquo; — Matthew 22:37
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                  <div>
                    <p className="font-bold text-scripture dark:text-white text-sm">No Other Gods</p>
                    <p className="text-primary-dark/60 dark:text-primary-dark/40 text-xs">God alone holds first place</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                  <div>
                    <p className="font-bold text-scripture dark:text-white text-sm">No Graven Images</p>
                    <p className="text-primary-dark/60 dark:text-primary-dark/40 text-xs">Worship God as He is, not as we imagine</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs font-bold shrink-0">3</span>
                  <div>
                    <p className="font-bold text-scripture dark:text-white text-sm">Honor God&apos;s Name</p>
                    <p className="text-primary-dark/60 dark:text-primary-dark/40 text-xs">His name carries His character</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs font-bold shrink-0">4</span>
                  <div>
                    <p className="font-bold text-scripture dark:text-white text-sm">Keep the Sabbath</p>
                    <p className="text-primary-dark/60 dark:text-primary-dark/40 text-xs">Rest in God&apos;s provision</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tablet 2 */}
            <div className="bg-white dark:bg-dark-surface rounded-xl border-2 border-amber-200 dark:border-amber-800 p-6 shadow-sm">
              <div className="text-center mb-4">
                <span className="inline-block bg-amber-600 text-white text-sm font-bold px-4 py-1 rounded-full">Tablet 2 — Commandments 5-10</span>
                <h3 className="text-xl font-bold text-scripture dark:text-white font-display mt-3">Love Your Neighbor</h3>
                <p className="text-primary-dark/60 dark:text-primary-dark/40 text-sm mt-1">
                  &ldquo;Thou shalt love thy neighbour as thyself.&rdquo; — Matthew 22:39
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">5</span>
                  <div>
                    <p className="font-bold text-scripture dark:text-white text-sm">Honor Parents</p>
                    <p className="text-primary-dark/60 dark:text-primary-dark/40 text-xs">Respect begins at home</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">6</span>
                  <div>
                    <p className="font-bold text-scripture dark:text-white text-sm">Do Not Murder</p>
                    <p className="text-primary-dark/60 dark:text-primary-dark/40 text-xs">Protect the image of God in every person</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">7</span>
                  <div>
                    <p className="font-bold text-scripture dark:text-white text-sm">Do Not Commit Adultery</p>
                    <p className="text-primary-dark/60 dark:text-primary-dark/40 text-xs">Guard the marriage covenant</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">8</span>
                  <div>
                    <p className="font-bold text-scripture dark:text-white text-sm">Do Not Steal</p>
                    <p className="text-primary-dark/60 dark:text-primary-dark/40 text-xs">Honor honest labor and property</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">9</span>
                  <div>
                    <p className="font-bold text-scripture dark:text-white text-sm">Do Not Bear False Witness</p>
                    <p className="text-primary-dark/60 dark:text-primary-dark/40 text-xs">Truth holds community together</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">10</span>
                  <div>
                    <p className="font-bold text-scripture dark:text-white text-sm">Do Not Covet</p>
                    <p className="text-primary-dark/60 dark:text-primary-dark/40 text-xs">Guard your heart — sin starts on the inside</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
            <p className="text-primary-dark/80 dark:text-primary-dark/40 text-sm leading-relaxed">
              Jesus summarized both tablets: <strong>&ldquo;On these two commandments hang all the law and the prophets&rdquo;</strong> (Matthew 22:40). Every commandment is an expression of love — love for God, or love for neighbor.
            </p>
          </div>
        </section>

        {/* How They Apply Today */}
        <section className="mb-12">
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">How the Ten Commandments Apply Today</h2>
            <div className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed space-y-4">
              <p>
                You might wonder whether laws given to a nomadic nation 3,400 years ago have anything to say to someone scrolling on a phone. Short answer: yes. Long answer: look around.
              </p>
              <p>
                The first commandment — no other gods — confronts every form of idolatry that modern culture barely recognizes. Career worship. Status obsession. The relentless pursuit of approval on social media. None of these are carved statues. All of them function the same way. They promise fulfillment they cannot deliver, and they demand more than they return.
              </p>
              <p>
                The ninth commandment — no false witness — addresses a world drowning in misinformation, slander, and half-truths shared at the speed of light. Every time you pass along something you know is misleading, you break this commandment. Every time you assassinate someone&apos;s character behind their back, you stand in violation of a law older than any nation on earth.
              </p>
              <p>
                The tenth commandment — do not covet — reads like it was written for an economy built on making you feel inadequate. Advertising is the industrialization of covetousness. You are shown what your neighbor has, told you deserve it too, and offered easy credit to acquire it. Moses would recognize the pattern instantly.
              </p>
              <p>
                The Ten Commandments are not outdated. They are ahead of us. Every generation thinks it has evolved past the need for these boundaries. Every generation proves it hasn&apos;t. These laws persist because human nature persists — and because the God who spoke them does not change (Malachi 3:6).
              </p>
            </div>
          </div>
        </section>

        {/* Where Else They Appear */}
        <section className="mb-12">
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Where Else the Ten Commandments Appear in Scripture</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg border border-blue-100 dark:border-blue-800 whitespace-nowrap shrink-0">Exodus 20:1-17</span>
                <p className="text-primary-dark/80 dark:text-primary-dark/40 text-sm leading-relaxed">The primary giving at Mount Sinai, spoken directly by God to Israel.</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg border border-blue-100 dark:border-blue-800 whitespace-nowrap shrink-0">Deuteronomy 5:6-21</span>
                <p className="text-primary-dark/80 dark:text-primary-dark/40 text-sm leading-relaxed">Moses restates the Ten Commandments to the new generation before entering the Promised Land.</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg border border-blue-100 dark:border-blue-800 whitespace-nowrap shrink-0">Matthew 22:37-40</span>
                <p className="text-primary-dark/80 dark:text-primary-dark/40 text-sm leading-relaxed">Jesus summarizes all the commandments into two: love God with all your heart, and love your neighbor as yourself.</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg border border-blue-100 dark:border-blue-800 whitespace-nowrap shrink-0">Romans 13:8-10</span>
                <p className="text-primary-dark/80 dark:text-primary-dark/40 text-sm leading-relaxed">Paul writes that love is the fulfillment of the law — the person who loves their neighbor has kept every commandment.</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg border border-blue-100 dark:border-blue-800 whitespace-nowrap shrink-0">Matthew 5:21-48</span>
                <p className="text-primary-dark/80 dark:text-primary-dark/40 text-sm leading-relaxed">In the Sermon on the Mount, Jesus deepens the commandments, showing that God judges the heart, not just outward behavior.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Ten Commandments Quick Reference</h2>
          <p className="text-primary-dark/60 dark:text-primary-dark/40 mb-6 text-sm">All ten commandments at a glance with Exodus and Deuteronomy references.</p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-4 md:p-6 shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-grace dark:border-dark-border">
                  <th className="text-left py-3 pr-3 font-bold text-scripture dark:text-white">#</th>
                  <th className="text-left py-3 pr-3 font-bold text-scripture dark:text-white">Commandment</th>
                  <th className="text-left py-3 pr-3 font-bold text-scripture dark:text-white">Exodus</th>
                  <th className="text-left py-3 pr-3 font-bold text-scripture dark:text-white">Deuteronomy</th>
                  <th className="text-left py-3 font-bold text-scripture dark:text-white">Tablet</th>
                </tr>
              </thead>
              <tbody>
                {COMMANDMENTS.map(c => (
                  <tr key={c.number} className="border-b border-grace/60 dark:border-dark-border/60 hover:bg-blue-50/30 dark:hover:bg-blue-950/10 transition-colors">
                    <td className="py-3 pr-3 font-bold text-blue-600 dark:text-blue-400">{c.number}</td>
                    <td className="py-3 pr-3 text-primary-dark/80 dark:text-primary-dark/40 font-medium">
                      <a href={`#commandment-${c.number}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{c.shortName}</a>
                    </td>
                    <td className="py-3 pr-3 text-primary-dark/70 dark:text-primary-dark/30 whitespace-nowrap">{c.exodusRef}</td>
                    <td className="py-3 pr-3 text-primary-dark/70 dark:text-primary-dark/30 whitespace-nowrap">{c.deutRef}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${c.number <= 4 ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800' : 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-800'}`}>
                        {c.number <= 4 ? 'Love God' : 'Love Neighbor'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Supporting Verses */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">15 Bible Verses About God&apos;s Law</h2>
          <p className="text-primary-dark/60 dark:text-primary-dark/40 mb-6 text-sm">The Ten Commandments are part of a larger biblical theme. These verses illuminate God&apos;s purpose for His law.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SUPPORTING_VERSES.map((verse, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-4 shadow-sm hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full shrink-0">{idx + 1}</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{verse.ref}</span>
                  <span className="text-xs bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-800">{verse.label}</span>
                </div>
                <p className="text-primary-dark/80 dark:text-primary-dark/40 text-sm italic leading-relaxed">
                  &ldquo;{verse.text}&rdquo;
                </p>
                <div className="mt-2">
                  <Link href={`/topics/${verse.topic}`} className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    Study &ldquo;{verse.label}&rdquo; &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Frequently Asked Questions About the Ten Commandments</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <details key={idx} className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border shadow-sm group">
                <summary className="p-5 cursor-pointer font-bold text-scripture dark:text-white text-lg flex items-center justify-between list-none">
                  <span>{item.question}</span>
                  <span className="text-blue-600 text-xl ml-4 shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed border-t border-grace dark:border-dark-border pt-4">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Secondary CTA — Study Paths */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/exodus-20-quiz" className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">60 Questions, 4 Difficulty Levels</p>
              <h3 className="text-xl font-bold mb-1">Exodus 20 Quiz</h3>
              <p className="text-blue-100 text-sm">Test your knowledge of the chapter where God speaks the Ten Commandments.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Quiz &rarr;</span>
            </Link>
            <Link href="/exodus-chapters" className="bg-scripture hover:bg-scripture/90 rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">40 Chapters From Slavery to Sinai</p>
              <h3 className="text-xl font-bold mb-1">All Exodus Chapter Quizzes</h3>
              <p className="text-blue-100 text-sm">Walk through the entire book of Exodus chapter by chapter.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Browse Chapters &rarr;</span>
            </Link>
          </div>
        </section>

        {/* Gospel CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-scripture via-scripture/95 to-blue-950 rounded-xl p-8 md:p-10 text-white shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4 text-center">The Commandments Show Our Need. Christ Meets It.</h2>
            <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-3 text-center">
              &ldquo;By the law is the knowledge of sin&rdquo; (Romans 3:20). The Ten Commandments were never a ladder to climb into heaven. They were a mirror — to show us that we fall short of God&apos;s standard.
            </p>
            <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-6 text-center">
              But God did not leave us there. &ldquo;The wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord&rdquo; (Romans 6:23). Jesus kept the law perfectly and paid the penalty for everyone who couldn&apos;t. If you want to understand what that means for you:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/what-does-the-bible-say-about/salvation" className="inline-flex items-center justify-center bg-white text-scripture font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors text-sm uppercase tracking-wider">
                How to Be Saved
              </Link>
              <Link href="/john-3-16" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
                John 3:16 Explained
              </Link>
            </div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="bg-primary-light/30 dark:bg-dark-surface/30 border border-grace dark:border-dark-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-4">Continue Your Study</h2>

          <div className="mb-4">
            <p className="text-xs font-bold text-primary-dark/50 dark:text-primary-dark/30 uppercase tracking-wider mb-2">Quizzes</p>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              <Link href="/exodus-20-quiz" className="text-blue-600 hover:underline text-sm">Exodus 20 Quiz</Link>
              <Link href="/deuteronomy-5-quiz" className="text-blue-600 hover:underline text-sm">Deuteronomy 5 Quiz</Link>
              <Link href="/matthew-5-quiz" className="text-blue-600 hover:underline text-sm">Sermon on the Mount Quiz</Link>
              <Link href="/exodus-chapters" className="text-blue-600 hover:underline text-sm">Exodus Chapter Quizzes</Link>
              <Link href="/deuteronomy-chapters" className="text-blue-600 hover:underline text-sm">Deuteronomy Chapter Quizzes</Link>
              <Link href="/exodus-quiz" className="text-blue-600 hover:underline text-sm">Complete Exodus Quiz</Link>
              <Link href="/deuteronomy-quiz" className="text-blue-600 hover:underline text-sm">Complete Deuteronomy Quiz</Link>
              <Link href="/romans-quiz" className="text-blue-600 hover:underline text-sm">Complete Romans Quiz</Link>
              <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">All Bible Quizzes</Link>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs font-bold text-primary-dark/50 dark:text-primary-dark/30 uppercase tracking-wider mb-2">Related Topics</p>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              <Link href="/what-does-the-bible-say-about/salvation" className="text-blue-600 hover:underline text-sm">What the Bible Says About Salvation</Link>
              <Link href="/topics/obedience" className="text-blue-600 hover:underline text-sm">Bible Verses About Obedience</Link>
              <Link href="/topics/gods-law" className="text-blue-600 hover:underline text-sm">Bible Verses About God&apos;s Law</Link>
              <Link href="/topics/love" className="text-blue-600 hover:underline text-sm">Bible Verses About Love</Link>
              <Link href="/topics/gods-word" className="text-blue-600 hover:underline text-sm">Bible Verses About God&apos;s Word</Link>
              <Link href="/topics/sin" className="text-blue-600 hover:underline text-sm">Bible Verses About Sin</Link>
              <Link href="/topics/repentance" className="text-blue-600 hover:underline text-sm">Bible Verses About Repentance</Link>
              <Link href="/topics/grace" className="text-blue-600 hover:underline text-sm">Bible Verses About Grace</Link>
              <Link href="/john-3-16" className="text-blue-600 hover:underline text-sm">John 3:16 Explained</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-primary-dark/50 dark:text-primary-dark/30 uppercase tracking-wider mb-2">Study Resources</p>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              <Link href="/characters/moses" className="text-blue-600 hover:underline text-sm">Moses Character Study</Link>
              <Link href="/bible-geography/exodus" className="text-blue-600 hover:underline text-sm">Exodus Places &amp; Map</Link>
              <Link href="/bible-chapter-summaries/exodus/20" className="text-blue-600 hover:underline text-sm">Exodus 20 Summary</Link>
              <Link href="/cross-references/exodus/20/1" className="text-blue-600 hover:underline text-sm">Exodus 20 Cross-References</Link>
              <Link href="/books-of-the-bible" className="text-blue-600 hover:underline text-sm">Books of the Bible</Link>
              <Link href="/bible-study-guides" className="text-blue-600 hover:underline text-sm">Study Guides</Link>
              <Link href="/popular-bible-verses" className="text-blue-600 hover:underline text-sm">100 Most Popular Verses</Link>
              <Link href="/who-wrote-the-bible" className="text-blue-600 hover:underline text-sm">Who Wrote the Bible?</Link>
              <Link href="/bible-quotes" className="text-blue-600 hover:underline text-sm">Bible Quotes Hub</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
