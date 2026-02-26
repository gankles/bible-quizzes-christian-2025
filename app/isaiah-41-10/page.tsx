import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { StructuredData } from '@/components/StructuredData';
import PillarQuiz from '@/components/PillarQuiz';

const SITE_URL = 'https://biblemaximum.com';

export const metadata: Metadata = {
  title: 'Isaiah 41:10 Explained — Fear Not, For I Am With Thee | Bible Maximum',
  description: 'What does Isaiah 41:10 mean? A complete word-by-word study of God\'s promise to strengthen, help, and uphold His people, with context from Isaiah\'s prophecy, cross-references, quiz, and FAQ.',
  keywords: ['isaiah 41:10', 'isaiah 41 10 meaning', 'fear not for i am with thee', 'isaiah 41:10 explained', 'be not dismayed', 'i will strengthen thee', 'right hand of my righteousness', 'isaiah fear not', 'god is with me bible verse', 'isaiah 41:10 study'],
  alternates: {
    canonical: '/isaiah-41-10',
  },
  openGraph: {
    title: 'Isaiah 41:10 Explained — Fear Not, For I Am With Thee',
    description: 'A complete word-by-word study of Isaiah 41:10 with context, cross-references, quiz, and FAQ.',
    url: `${SITE_URL}/isaiah-41-10`,
    type: 'article',
    images: ['/images/thienphan9495_Close-up_of_a_womans_hand_holding_a_wooden_rosary_5747c7bd-b033-4a27-9bef-669a2366e489.png'],
  },
};

function loadIsaiah4110Quiz() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'quizzes', 'isaiah-41-10.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const WORD_STUDY = [
  {
    phrase: '"Fear thou not"',
    hebrew: 'al-tira (do not fear)',
    explanation: 'God opens with a direct command: stop fearing. The Hebrew al-tira is not a gentle suggestion but a divine imperative. Fear is the natural human response to danger, but God overrides it with a command grounded in His own character. Throughout Isaiah, God repeats this command (41:10, 41:13, 43:1, 44:2) — because His people needed to hear it again and again as they faced the threat of Babylonian exile.',
  },
  {
    phrase: '"for I am with thee"',
    hebrew: 'ki imm\'ka ani (for with you, I)',
    explanation: 'The reason we must not fear is not the absence of danger but the presence of God. "I am with thee" is the foundational promise of the entire Bible — from God walking with Adam in the garden to Christ\'s final words: "Lo, I am with you alway" (Matthew 28:20). God does not promise to remove the trial; He promises to be present in it.',
  },
  {
    phrase: '"be not dismayed"',
    hebrew: 'al-tishta (do not gaze about anxiously)',
    explanation: 'The Hebrew word sha\'ah means to look around anxiously, scanning the horizon in terror for threats. It describes the frantic, darting gaze of someone who feels utterly alone and overwhelmed. God\'s command cuts through this panic: stop looking around in dread. The antidote to dismay is the next phrase.',
  },
  {
    phrase: '"for I am thy God"',
    hebrew: 'ki ani Eloheka (for I am your God)',
    explanation: 'This is the covenant declaration. God does not merely say "I am God" — He says "I am THY God." This is personal. The God who created the heavens and the earth, who rules over all nations, who holds history in His hand, claims a personal covenant relationship with His people. Dismay dissolves when we remember whose we are.',
  },
  {
    phrase: '"I will strengthen thee"',
    hebrew: 'immatstika (I will make you strong)',
    explanation: 'The first of three escalating promises. God does not merely tell His people to be strong — He promises to personally supply the strength they lack. The Hebrew carries the sense of making firm, hardening, establishing. When God strengthens, the weak become immovable. Isaiah 40:29 confirms: "He giveth power to the faint; and to them that have no might he increaseth strength."',
  },
  {
    phrase: '"yea, I will help thee"',
    hebrew: 'af azartika (indeed, I will help you)',
    explanation: 'The word "yea" (Hebrew: af) intensifies the promise — "indeed!" God is not merely strong on our behalf from a distance; He actively intervenes as our helper. The Hebrew azar means to surround, to aid, to succor. God comes alongside His people in their specific situation and provides the exact help they need.',
  },
  {
    phrase: '"yea, I will uphold thee"',
    hebrew: 'af t\'maktika (indeed, I will sustain you)',
    explanation: 'The third and climactic promise. "Uphold" (tamak) means to grasp, to hold fast, to sustain. When a person is falling, God catches them. When they cannot stand, God holds them up. This is not temporary support — it is the sustained grip of the Almighty who never lets go. Psalm 37:24 echoes this: "Though he fall, he shall not be utterly cast down: for the LORD upholdeth him with his hand."',
  },
  {
    phrase: '"with the right hand of my righteousness"',
    hebrew: 'bimin tsidki (with the right hand of My righteousness)',
    explanation: 'The right hand is the hand of power, authority, and honor throughout Scripture (Psalm 118:16). But this is not just any right hand — it is the right hand of God\'s RIGHTEOUSNESS. God upholds His people not because they deserve it but because His own righteous character demands it. He made a covenant promise, and His righteousness ensures He will keep it. The basis of our security is not our faithfulness but His.',
  },
];

const CROSS_REFERENCES = [
  { ref: 'Isaiah 41:13', text: 'For I the LORD thy God will hold thy right hand, saying unto thee, Fear not; I will help thee.' },
  { ref: 'Isaiah 40:31', text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.' },
  { ref: 'Isaiah 43:1-2', text: 'Fear not: for I have redeemed thee, I have called thee by thy name; thou art mine. When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee.' },
  { ref: 'Deuteronomy 31:6', text: 'Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.' },
  { ref: 'Psalm 46:1', text: 'God is our refuge and strength, a very present help in trouble.' },
];

const FAQ_ITEMS = [
  {
    question: 'What does Isaiah 41:10 mean?',
    answer: 'Isaiah 41:10 is God\'s personal promise to be present with His people and to actively support them through every trial. It contains two commands (fear not, be not dismayed) and three promises (I will strengthen you, I will help you, I will uphold you). The verse was originally spoken to Israel as they faced the terror of Babylonian exile, assuring them that God had not abandoned them. For believers today, it remains one of the most powerful declarations of divine faithfulness in all of Scripture.',
  },
  {
    question: 'What does "Fear not, for I am with thee" mean?',
    answer: '"Fear not, for I am with thee" is God\'s foundational answer to human anxiety: His presence. God does not promise to remove every danger or difficulty — He promises something far greater: that He Himself will be present with His people through it. The command "fear not" is not a dismissal of real threats but a redirection of our attention from the threat to the God who stands with us. This is the same promise God gave to Abraham (Genesis 26:24), Moses (Exodus 3:12), Joshua (Joshua 1:9), and every generation of His people.',
  },
  {
    question: 'Who was Isaiah speaking to in Isaiah 41:10?',
    answer: 'Isaiah 41:10 was originally addressed to the nation of Israel — specifically to the faithful remnant who would face the Babylonian exile. In Isaiah 41:8-9, God calls Israel "my servant" and "my chosen," reminding them that He called Abraham and chose their nation for His purposes. The message was meant to comfort a people facing national catastrophe: even though Babylon would destroy Jerusalem and carry them into captivity, God would remain with them, strengthen them, and ultimately restore them.',
  },
  {
    question: 'How can I apply Isaiah 41:10 to my life today?',
    answer: 'Isaiah 41:10 applies to every believer who faces fear, anxiety, or overwhelming circumstances. To apply it: (1) Identify the specific fear — name what is causing you dread or dismay. (2) Remind yourself of God\'s presence — "I am with thee" is a present-tense reality for all who belong to Christ. (3) Ask God for strength, help, and support — the three promises are available to you through prayer. (4) Trust His righteousness, not your own — your security rests on God\'s faithful character, not your performance. Memorizing this verse equips you to fight fear with truth in the moment of trial.',
  },
  {
    question: 'What does "the right hand of my righteousness" mean?',
    answer: 'The "right hand" in Scripture symbolizes power, authority, and favor (Psalm 118:16). The "right hand of my righteousness" means that God upholds His people with His own sovereign power, and He does so on the basis of His righteous character — His covenant faithfulness. It is not our righteousness that secures God\'s help, but HIS righteousness. He made a promise to His people, and His perfect, unchanging nature guarantees He will keep it. This phrase assures believers that God\'s support is as unshakable as His own character.',
  },
  {
    question: 'Does Isaiah 41:10 apply to Christians today?',
    answer: 'Yes. While Isaiah 41:10 was originally spoken to Israel, the New Testament confirms that all of God\'s promises find their "Yes" in Christ (2 Corinthians 1:20). Christians are grafted into God\'s covenant people (Romans 11:17) and are heirs of the promises made to Abraham (Galatians 3:29). The God who promised to be with Israel is the same God who promises believers: "I will never leave thee, nor forsake thee" (Hebrews 13:5). Jesus Himself echoed this promise: "Lo, I am with you alway, even unto the end of the world" (Matthew 28:20).',
  },
];

export default function Isaiah4110Page() {
  const quizData = loadIsaiah4110Quiz();

  // Build quiz object for the client component
  const quiz = quizData ? {
    ...quizData,
    difficulty: 'easy' as const,
    isBookQuiz: false,
    slug: 'isaiah-41-10',
    tags: ['isaiah 41:10', 'fear not', 'god is with me', 'strength'],
    totalQuestions: quizData.questions.length,
    estimatedTime: Math.ceil(quizData.questions.length * 0.5),
  } : null;

  // JSON-LD schemas
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Isaiah 41:10 Explained — Fear Not, For I Am With Thee',
    description: 'A complete word-by-word study of Isaiah 41:10 with context, cross-references, quiz, and FAQ.',
    url: `${SITE_URL}/isaiah-41-10`,
    author: { '@type': 'Organization', name: 'Bible Maximum' },
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: SITE_URL },
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/isaiah-41-10` },
    about: [
      { '@type': 'Thing', name: 'Isaiah 41:10' },
      { '@type': 'Thing', name: 'Book of Isaiah' },
      { '@type': 'Thing', name: 'Fear Not' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Bible Study', item: `${SITE_URL}/bible-quizzes` },
      { '@type': 'ListItem', position: 3, name: 'Isaiah', item: `${SITE_URL}/isaiah-chapters` },
      { '@type': 'ListItem', position: 4, name: 'Isaiah 41:10 Explained', item: `${SITE_URL}/isaiah-41-10` },
    ],
  };

  return (
    <div className="min-h-screen bg-primary-light/30 dark:bg-dark-bg">
      <StructuredData data={articleSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-dark-surface border-b border-grace dark:border-dark-border">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <ol className="flex items-center flex-wrap gap-y-1 text-sm">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li><Link href="/bible-quizzes" className="text-blue-600 hover:underline">Bible Study</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li><Link href="/isaiah-chapters" className="text-blue-600 hover:underline">Isaiah</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li className="text-primary-dark/70 font-medium">Isaiah 41:10</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-scripture dark:bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/thienphan9495_Close-up_of_a_womans_hand_holding_a_wooden_rosary_5747c7bd-b033-4a27-9bef-669a2366e489.png"
            alt="Hands clasped in prayer with rosary beads symbolizing trust in God"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-blue-300 text-sm font-bold uppercase tracking-widest mb-4">God&apos;s Promise to Strengthen, Help, and Uphold</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-display leading-tight mb-8">
            Isaiah 41:10 Explained
          </h1>
          <blockquote className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8">
            <p className="text-xl md:text-2xl text-white leading-relaxed italic font-light">
              &ldquo;Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.&rdquo;
            </p>
            <cite className="block mt-4 text-blue-200 text-sm font-bold not-italic">— Isaiah 41:10 (KJV)</cite>
          </blockquote>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#quiz" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
              Take the Isaiah 41:10 Quiz
            </a>
            <a href="#word-study" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
              Read Word-by-Word Study
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">

        {/* Quick Summary / Value Proposition */}
        <section className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 mb-12 shadow-sm">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">What Does Isaiah 41:10 Mean?</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-lg mb-4">
            Isaiah 41:10 is one of the most comforting verses in the entire Bible. In a single sentence, God delivers <strong>two commands</strong> (fear not, be not dismayed) and <strong>three promises</strong> (I will strengthen you, I will help you, I will uphold you). It is God&apos;s personal declaration that His people are never alone, never abandoned, and never without His sovereign support.
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
            God spoke these words through the prophet <Link href="/characters/isaiah" className="text-blue-600 font-medium hover:underline">Isaiah</Link> to comfort Israel as they faced the terrifying prospect of Babylonian exile. The message was clear: the same God who called Abraham, who parted the Red Sea, and who rules over every nation on earth was personally committed to strengthening, helping, and upholding His people. Below, we break down every phrase, explore the context, and test your understanding with a focused quiz.
          </p>
        </section>

        {/* Word-by-Word Study */}
        <section id="word-study" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Word-by-Word Study of Isaiah 41:10</h2>
          <div className="space-y-4">
            {WORD_STUDY.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-scripture dark:text-white mb-1">{item.phrase}</h3>
                    <p className="text-xs text-blue-600 font-medium mb-2">Hebrew: <em>{item.hebrew}</em></p>
                    <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-sm">{item.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Context Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Context: Isaiah&apos;s Prophecy and Israel Facing Exile</h2>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              Isaiah 41:10 does not stand in isolation — it is part of a sweeping prophetic message known as the &ldquo;Book of Comfort&rdquo; (Isaiah 40-66). The prophet Isaiah, writing during the reigns of Judah&apos;s kings around 740-680 BC, looked forward to a time when Babylon would conquer Jerusalem, destroy the temple, and carry God&apos;s people into exile. This was the darkest chapter in Israel&apos;s history.
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              In Isaiah 40, God begins His message of comfort: <strong>&ldquo;Comfort ye, comfort ye my people, saith your God&rdquo;</strong> (Isaiah 40:1). He declares that Israel&apos;s punishment will end, that a voice will cry in the wilderness to prepare the way of the Lord, and that those who wait upon the LORD will renew their strength (40:31).
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              In Isaiah 41, God turns to address the nations. He challenges the coastlands and peoples to present their case (41:1). He declares His sovereignty over history — raising up conquerors, toppling kingdoms, directing the course of empires (41:2-4). Then, in stark contrast to the trembling nations, God turns to His own people with tender reassurance: <strong>&ldquo;But thou, Israel, art my servant, Jacob whom I have chosen&rdquo;</strong> (41:8).
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
              It is in this context — with empires rising and falling, with exile looming, with God demonstrating His absolute authority over all nations — that He speaks the words of Isaiah 41:10. The God who holds the destiny of Babylon in His hand is the same God who holds your hand and says: &ldquo;Fear thou not; for I am with thee.&rdquo;
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/characters/isaiah" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">I</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Study Isaiah the Prophet</span>
              </Link>
              <Link href="/isaiah-41-quiz" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">Q</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Isaiah 41 Full Quiz</span>
              </Link>
              <Link href="/bible-chapter-summaries/isaiah/41" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">S</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Isaiah 41 Summary</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Cross-References */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Cross-References: Verses That Reinforce Isaiah 41:10</h2>
          <div className="space-y-3">
            {CROSS_REFERENCES.map((verse, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-5 shadow-sm">
                <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed italic mb-2">&ldquo;{verse.text}&rdquo;</p>
                <p className="text-sm font-bold text-blue-600">— {verse.ref}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Embedded Quiz */}
        <section id="quiz" className="mb-12 scroll-mt-20">
          <div className="bg-white dark:bg-dark-surface rounded-xl border-2 border-blue-600/20 p-6 md:p-8 shadow-sm">
            <div className="text-center mb-6">
              <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">Test Your Knowledge</p>
              <h2 className="text-2xl font-bold text-scripture dark:text-white font-display">Isaiah 41:10 Quiz</h2>
              <p className="text-primary-dark/60 dark:text-primary-dark/40 mt-2 text-sm">15 questions on God&apos;s promise to strengthen, help, and uphold His people</p>
            </div>
            {quiz ? (
              <PillarQuiz quiz={quiz} />
            ) : (
              <p className="text-center text-primary-dark/60">Quiz loading...</p>
            )}
          </div>
        </section>

        {/* Gospel CTA — Conversion Optimized */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-scripture via-scripture/95 to-blue-950 rounded-xl p-8 md:p-10 text-white text-center shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">God Says: Fear Not</h2>
            <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-6">
              The God who spoke to Israel through Isaiah speaks the same words to you today. He promises His presence, His strength, His help, and His unfailing support. If fear and anxiety have gripped your heart, the answer is not a technique — it is a Person. Come to the God who says &ldquo;Fear not&rdquo; and discover the peace that only He can give.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/topics/salvation" className="inline-flex items-center justify-center bg-white text-scripture font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors text-sm uppercase tracking-wider">
                How to Be Saved
              </Link>
              <Link href="/topics/hope" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
                Bible Verses About Hope
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Frequently Asked Questions About Isaiah 41:10</h2>
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

        {/* Secondary CTA — Quiz + Study Paths */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/isaiah-41-quiz" className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">60 Questions, 4 Difficulty Levels</p>
              <h3 className="text-xl font-bold mb-1">Complete Isaiah Chapter 41 Quiz</h3>
              <p className="text-blue-100 text-sm">Test everything from God&apos;s sovereignty over nations to His tender care for His people.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Quiz &rarr;</span>
            </Link>
            <Link href="/isaiah-quiz" className="bg-scripture hover:bg-scripture/90 rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">25 Questions Covering All 66 Chapters</p>
              <h3 className="text-xl font-bold mb-1">Complete Book of Isaiah Quiz</h3>
              <p className="text-blue-100 text-sm">From Isaiah&apos;s calling to the Suffering Servant to the new heavens and new earth.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Quiz &rarr;</span>
            </Link>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="bg-primary-light/30 dark:bg-dark-surface/30 border border-grace dark:border-dark-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-4">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/isaiah-41-quiz" className="text-blue-600 hover:underline text-sm">Isaiah Chapter 41 Quiz</Link>
            <Link href="/isaiah-chapters" className="text-blue-600 hover:underline text-sm">All Isaiah Chapter Quizzes</Link>
            <Link href="/isaiah-quiz" className="text-blue-600 hover:underline text-sm">Complete Book of Isaiah Quiz</Link>
            <Link href="/topics/fear" className="text-blue-600 hover:underline text-sm">Bible Verses About Fear</Link>
            <Link href="/topics/strength" className="text-blue-600 hover:underline text-sm">Bible Verses About Strength</Link>
            <Link href="/topics/faith" className="text-blue-600 hover:underline text-sm">Bible Verses About Faith</Link>
            <Link href="/topics/hope" className="text-blue-600 hover:underline text-sm">Bible Verses About Hope</Link>
            <Link href="/topics/salvation" className="text-blue-600 hover:underline text-sm">Bible Verses About Salvation</Link>
            <Link href="/characters/isaiah" className="text-blue-600 hover:underline text-sm">Isaiah Character Study</Link>
            <Link href="/bible-chapter-summaries/isaiah/41" className="text-blue-600 hover:underline text-sm">Isaiah Chapter 41 Summary</Link>
            <Link href="/bible-geography/isaiah/41" className="text-blue-600 hover:underline text-sm">Isaiah 41 Places &amp; Map</Link>
            <Link href="/john-3-16" className="text-blue-600 hover:underline text-sm">John 3:16 Explained</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
