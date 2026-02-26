import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { StructuredData } from '@/components/StructuredData';
import PillarQuiz from '@/components/PillarQuiz';

const SITE_URL = 'https://biblemaximum.com';

export const metadata: Metadata = {
  title: 'John 3:16 Explained — Meaning, Context & Word-by-Word Study | Bible Maximum',
  description: 'What does John 3:16 mean? Whether you\'re curious, skeptical, or a lifelong believer, this guide breaks down every word of the most famous verse in the Bible with context, cross-references, and a quiz.',
  keywords: ['john 3:16', 'john 3 16 meaning', 'john 3:16 explained', 'for god so loved the world', 'what does john 3:16 mean', 'john 3:16 study', 'born again', 'nicodemus', 'everlasting life', 'only begotten son', 'is god real', 'does god love me', 'how to be saved'],
  alternates: {
    canonical: '/john-3-16',
  },
  openGraph: {
    title: 'John 3:16 Explained — The Most Famous Verse in the Bible',
    description: 'Whether you\'re curious, skeptical, or a lifelong believer — a complete breakdown of the verse that changed the world.',
    url: `${SITE_URL}/john-3-16`,
    type: 'article',
    images: ['/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png'],
  },
};

function loadJohn316Quiz() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'quizzes', 'john-3-16.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const WORD_STUDY = [
  {
    phrase: '"For God"',
    greek: 'houtos gar ho theos',
    explanation: 'The verse starts with God — not you, not your effort, not your merit. Everything begins with Him. If you\'ve ever wondered whether there\'s anyone out there who cares, this verse answers immediately: yes, and He moved first.',
  },
  {
    phrase: '"so loved"',
    greek: 'agapao (agape love)',
    explanation: 'This is agape — the Greek word for unconditional, self-giving love. Not feelings. Not attraction. Not "I love you if you love me back." This is love that acts. Love that gives at great cost. God didn\'t just feel love for the world — He did something about it.',
  },
  {
    phrase: '"the world"',
    greek: 'ton kosmon',
    explanation: 'Not just the religious. Not just the good. The world — every broken, rebellious, doubting, indifferent person in it. This includes people who don\'t believe in Him. It includes people who have actively rejected Him. That\'s what makes this verse so staggering: God loves a world that largely ignores or opposes Him.',
  },
  {
    phrase: '"that he gave"',
    greek: 'didomi (to give)',
    explanation: 'Love talks. God gave. He sent His Son into a world that would mock Him, betray Him, and kill Him. The cross was not an accident or a tragedy — it was the plan. God gave what was most precious to Him for people who deserved it least. That includes all of us.',
  },
  {
    phrase: '"his only begotten Son"',
    greek: 'monogenes (unique, one-of-a-kind)',
    explanation: '"Only begotten" doesn\'t mean Jesus was created — the Greek monogenes means "one and only," unique. Jesus is not one of many sons. He is the unique, eternal Son of God who shares the Father\'s nature (John 1:1). This sacrifice cannot be repeated because there is no one else like Him.',
  },
  {
    phrase: '"that whosoever believeth in him"',
    greek: 'pas ho pisteuon eis auton',
    explanation: 'This is the most democratic word in the Bible: "whosoever." It erases every barrier — race, education, background, criminal record, religious pedigree, past failures. And "believeth" doesn\'t mean just agreeing that God exists. It means trusting your life to Jesus — relying on Him the way you rely on a chair to hold you when you sit down. True belief includes repentance — turning away from sin and turning toward God (Acts 3:19). Faith and repentance are two sides of the same coin: you can\'t truly trust Christ as Savior while refusing to let go of what He died to save you from.',
  },
  {
    phrase: '"should not perish"',
    greek: 'apollymi (to destroy, to be lost)',
    explanation: 'This is the word Jesus used for why He came. "Perish" means eternal separation from God — the ultimate consequence of going your own way permanently. It\'s a hard word, but it\'s what makes the rescue meaningful. You don\'t need a savior if there\'s nothing to be saved from.',
  },
  {
    phrase: '"but have everlasting life"',
    greek: 'zoe aionios (life of the age to come)',
    explanation: 'Not just "living forever" — that could be terrifying. This is a new kind of life. Jesus defined it Himself: "This is life eternal, that they might know thee the only true God, and Jesus Christ" (John 17:3). It starts now, the moment you believe. It means knowing God personally — forgiveness, purpose, peace, and a future that death cannot end.',
  },
];

const CROSS_REFERENCES = [
  { ref: 'John 1:12', text: 'But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name.' },
  { ref: 'Romans 5:8', text: 'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.' },
  { ref: 'Romans 6:23', text: 'For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.' },
  { ref: 'Ephesians 2:8-9', text: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.' },
  { ref: '1 John 4:9-10', text: 'In this was manifested the love of God toward us, because that God sent his only begotten Son into the world, that we might live through him.' },
];

const FAQ_ITEMS = [
  {
    question: 'What does John 3:16 mean in plain language?',
    answer: 'In the simplest terms: God loves you. He proved it by sending Jesus to die in your place. If you trust in Jesus, you won\'t face eternal judgment — you\'ll have eternal life with God instead. That\'s the entire message of Christianity compressed into one sentence. It doesn\'t require you to clean up your life first, earn God\'s approval, or understand everything about the Bible. It starts with believing.',
  },
  {
    question: 'What does "only begotten Son" mean?',
    answer: 'The phrase comes from the Greek word monogenes, meaning "one and only" or "unique." It does not mean Jesus was created or had a beginning — John 1:1 says "the Word was God." It means Jesus has a relationship with God the Father that no one else shares. He is the unique, one-of-a-kind Son of God. That\'s what makes this sacrifice so staggering — God didn\'t send an angel or a prophet. He sent the only one who could actually save us.',
  },
  {
    question: 'What does "believeth" actually mean? Is it just agreeing God exists?',
    answer: 'No. The Greek word pisteuo means far more than intellectual agreement. Even demons "believe" God exists (James 2:19). Biblical belief means personal trust — placing your confidence in Jesus for your salvation the way you trust a parachute when you jump. It means relying on what He did on the cross rather than on your own goodness. It\'s a decision that changes how you live.',
  },
  {
    question: 'Why is John 3:16 the most famous Bible verse?',
    answer: 'Because it answers the four biggest questions humans ask: Does God love me? (Yes — "God so loved the world.") What did He do about it? (He "gave his only begotten Son.") What do I have to do? ("Whosoever believeth in him.") What happens then? ("Should not perish, but have everlasting life.") No other sentence in history covers that much ground. Martin Luther called it "the gospel in miniature."',
  },
  {
    question: 'What does "perish" mean? Is God threatening people?',
    answer: '"Perish" (Greek: apollymi) means eternal separation from God. It\'s the natural consequence of sin — not an angry punishment God inflicts on people who annoy Him. Think of it like gravity: if you step off a cliff, the fall isn\'t a punishment — it\'s a consequence. God is warning because He loves. The whole point of John 3:16 is that God doesn\'t want anyone to perish. That\'s why He sent Jesus.',
  },
  {
    question: 'I\'m not sure I believe. Does John 3:16 still apply to me?',
    answer: 'Yes — "whosoever" means the offer is open to you right now. You don\'t need to have perfect faith or zero doubts. The man who brought his sick son to Jesus said, "Lord, I believe; help thou mine unbelief" (Mark 9:24) — and Jesus healed his son anyway. God isn\'t looking for perfection. He\'s looking for honesty. If you\'re willing to trust Him even with your doubts, that\'s where faith begins.',
  },
  {
    question: 'What is eternal life — just living forever?',
    answer: 'Not exactly. Eternal life is a new quality of life, not just endless duration. Jesus defined it: "This is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent" (John 17:3). It\'s knowing God personally — experiencing forgiveness, purpose, peace, and the presence of the Holy Spirit. It starts the moment you believe, not after you die. And it continues forever because God Himself is eternal.',
  },
  {
    question: 'Does John 3:16 require repentance, or just belief?',
    answer: 'Both. Biblical belief is never separated from repentance. Jesus began His ministry with the words "Repent, and believe the gospel" (Mark 1:15). Repentance means a change of mind and direction — turning away from sin and turning toward God. It\'s not about being perfect; it\'s about being willing. Acts 3:19 says, "Repent ye therefore, and be converted, that your sins may be blotted out." Faith without repentance is mere intellectual agreement. Repentance without faith is self-effort. Together, they are the biblical response to the gospel that John 3:16 presents.',
  },
  {
    question: 'If God loves the whole world, why is there so much suffering?',
    answer: 'This is one of the hardest questions anyone can ask, and the Bible doesn\'t dodge it. Suffering entered the world through sin — humanity\'s rejection of God (Genesis 3). God didn\'t cause it; we did. But John 3:16 shows that God\'s response to a broken world wasn\'t to abandon it — it was to enter it. Jesus suffered, was betrayed, and was crucified. God knows suffering firsthand. And He offers a future where "God shall wipe away all tears" (Revelation 21:4).',
  },
];

export default function John316Page() {
  const quizData = loadJohn316Quiz();

  const quiz = quizData ? {
    ...quizData,
    difficulty: 'easy' as const,
    isBookQuiz: false,
    slug: 'john-3-16',
    tags: ['john 3:16', 'salvation', 'gospel', 'born again'],
    totalQuestions: quizData.questions.length,
    estimatedTime: Math.ceil(quizData.questions.length * 0.5),
  } : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'John 3:16 Explained — Meaning, Context & Word-by-Word Study',
    description: 'A complete word-by-word study of the most famous Bible verse with context, cross-references, quiz, and FAQ.',
    url: `${SITE_URL}/john-3-16`,
    author: { '@type': 'Organization', name: 'Bible Maximum' },
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: SITE_URL },
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/john-3-16` },
    about: [
      { '@type': 'Thing', name: 'John 3:16' },
      { '@type': 'Thing', name: 'Gospel of John' },
      { '@type': 'Thing', name: 'Salvation' },
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Bible Study', item: `${SITE_URL}/bible-quizzes` },
      { '@type': 'ListItem', position: 3, name: 'John 3:16 Explained', item: `${SITE_URL}/john-3-16` },
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
            <li><Link href="/john-chapters" className="text-blue-600 hover:underline">Gospel of John</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li className="text-primary-dark/70 font-medium">John 3:16</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-scripture dark:bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png"
            alt="Open Bible with light symbolizing God's word"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-blue-300 text-sm font-bold uppercase tracking-widest mb-4">The Most Famous Verse in the Bible</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-display leading-tight mb-8">
            John 3:16 Explained
          </h1>
          <blockquote className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8">
            <p className="text-xl md:text-2xl text-white leading-relaxed italic font-light">
              &ldquo;For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.&rdquo;
            </p>
            <cite className="block mt-4 text-blue-200 text-sm font-bold not-italic">— John 3:16 (KJV)</cite>
          </blockquote>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#what-it-means" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
              What Does This Mean?
            </a>
            <a href="#word-study" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
              Go Deeper — Word by Word
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">

        {/* Plain-Language Summary — For Everyone */}
        <section id="what-it-means" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 mb-12 shadow-sm scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">What Does John 3:16 Actually Mean?</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-lg mb-4">
            Strip away the religious language and John 3:16 says something remarkably simple: <strong>God loves you, He proved it, and He&apos;s offering you a way out of death and into life.</strong>
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            Here&apos;s the verse broken into four plain statements:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">The Motivation</p>
              <p className="text-primary-dark/80 dark:text-primary-dark/40 text-sm">&ldquo;God so loved the world&rdquo; — He loves everyone, including you, right now, as you are.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">The Action</p>
              <p className="text-primary-dark/80 dark:text-primary-dark/40 text-sm">&ldquo;He gave his only begotten Son&rdquo; — God sent Jesus to die in your place. This was the plan, not an accident.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">Your Part</p>
              <p className="text-primary-dark/80 dark:text-primary-dark/40 text-sm">&ldquo;Whosoever believeth in him&rdquo; — Anyone can receive this. The only requirement is trust — not perfection, not works.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">The Result</p>
              <p className="text-primary-dark/80 dark:text-primary-dark/40 text-sm">&ldquo;Should not perish, but have everlasting life&rdquo; — Eternal life with God instead of eternal separation from Him.</p>
            </div>
          </div>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
            Martin Luther called John 3:16 &ldquo;the gospel in miniature.&rdquo; Whether you&apos;re reading the Bible for the first time or the thousandth time, this verse is the foundation everything else is built on.
          </p>
        </section>

        {/* Who This Page Is For — Audience Segments */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Wherever You Are, This Verse Speaks to You</h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2">If you&apos;re curious and exploring</h3>
              <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-sm">
                You may have seen John 3:16 on a sign, a bumper sticker, or in a movie and wondered what it was about. You&apos;re in the right place. This page walks through every word of the verse, explains the backstory, and answers the questions people are actually asking — no assumptions, no jargon.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2">If you&apos;re skeptical</h3>
              <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-sm">
                That&apos;s fine. Nicodemus — the man Jesus was talking to when He said this — was a highly educated religious leader with hard questions and real doubts. Jesus didn&apos;t dismiss him. He gave him a direct answer. This page does the same. Read the context, weigh the claims, and decide for yourself what you think.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2">If you don&apos;t believe — or aren&apos;t sure</h3>
              <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-sm">
                John 3:16 was spoken to a man who didn&apos;t understand yet. You don&apos;t have to believe before you can investigate. The verse itself says &ldquo;whosoever&rdquo; — the invitation is for anyone, including you, right now. The Bible says the response is to repent (turn from going your own way) and believe (trust Jesus with your life). If something here resonates, that&apos;s worth paying attention to. <Link href="/what-does-the-bible-say-about/salvation" className="text-blue-600 hover:underline">How to Be Saved</Link> is a good next step.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2">If you&apos;re a new believer</h3>
              <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-sm">
                Welcome. John 3:16 is your foundation. Everything you&apos;ll learn about the Bible builds on what this verse says: God loves you, Jesus died for you, and your eternal life is secure through faith. When doubts come — and they will — come back to this verse. It&apos;s not complicated. God loved. God gave. You believed. You have life. That&apos;s settled.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2">If you&apos;ve known this verse for years</h3>
              <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-sm">
                Familiarity can dull the impact of the most powerful words ever spoken. The <a href="#word-study" className="text-blue-600 hover:underline">word-by-word study below</a> digs into the Greek, the Old Testament background (the bronze serpent in Numbers 21), and the theology that seasoned believers often skim past. Let this verse hit you again like it did the first time.
              </p>
            </div>
          </div>
        </section>

        {/* Word-by-Word Study */}
        <section id="word-study" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Word-by-Word Study of John 3:16</h2>
          <p className="text-primary-dark/60 dark:text-primary-dark/40 mb-6 text-sm">Every phrase carries weight. Here&apos;s what you&apos;re actually reading.</p>
          <div className="space-y-4">
            {WORD_STUDY.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-scripture dark:text-white mb-1">{item.phrase}</h3>
                    <p className="text-xs text-blue-600 font-medium mb-2">Greek: <em>{item.greek}</em></p>
                    <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-sm">{item.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Context Section: Nicodemus */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">The Backstory: Who Was Jesus Talking To?</h2>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              John 3:16 wasn&apos;t a sermon to a crowd. It was said during a private, late-night conversation with a man named <Link href="/characters/nicodemus" className="text-blue-600 font-medium hover:underline">Nicodemus</Link> — a Pharisee, a member of the Jewish ruling council, and by every measure a &ldquo;good&rdquo; religious man. He came to Jesus at night, probably because he didn&apos;t want his colleagues to know.
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              Jesus didn&apos;t ease into it. He told Nicodemus straight: <strong>&ldquo;Except a man be born again, he cannot see the kingdom of God&rdquo;</strong> (John 3:3). Nicodemus was confused — he was thinking physically. Jesus meant spiritually. Religion, education, and good behavior weren&apos;t enough. Something had to change on the inside.
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              Then Jesus used an illustration Nicodemus would recognize: just as Moses lifted up a bronze serpent in the wilderness so that anyone bitten by a snake could look at it and live (Numbers 21:8-9), Jesus Himself would be &ldquo;lifted up&rdquo; on a cross — and anyone who looks to Him in faith will live forever (John 3:14-15).
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
              That&apos;s the lead-in to John 3:16. It&apos;s not a greeting card sentiment. It&apos;s the climax of a conversation about the most important question a person can ask: <em>How can I have eternal life?</em>
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/characters/nicodemus" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">N</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Study Nicodemus</span>
              </Link>
              <Link href="/john-3-quiz" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">Q</span>
                <span className="text-sm font-medium text-scripture dark:text-white">John 3 Full Quiz</span>
              </Link>
              <Link href="/bible-chapter-summaries/john/3" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">S</span>
                <span className="text-sm font-medium text-scripture dark:text-white">John 3 Summary</span>
              </Link>
            </div>
          </div>
        </section>

        {/* The Hard Question — For Skeptics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Honest Questions People Ask</h2>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="font-bold text-scripture dark:text-white mb-2">&ldquo;If God loves the world, why is there so much suffering?&rdquo;</h3>
              <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-sm">
                Suffering entered the world through sin — humanity&apos;s choice to reject God (Genesis 3). God didn&apos;t cause it; we did. But John 3:16 shows His response: instead of abandoning a broken world, He entered it. Jesus suffered betrayal, injustice, torture, and death. God knows suffering firsthand. And He offers a future where &ldquo;God shall wipe away all tears from their eyes&rdquo; (Revelation 21:4). The cross doesn&apos;t explain all suffering — but it proves God hasn&apos;t left us alone in it.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-scripture dark:text-white mb-2">&ldquo;Why does it have to be about believing in Jesus? What about good people?&rdquo;</h3>
              <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-sm">
                Nicodemus was one of the most religiously educated, morally upright men alive — and Jesus told him he needed to be born again. The Bible&apos;s claim is that all people, regardless of how &ldquo;good&rdquo; they are, fall short of God&apos;s standard (Romans 3:23). Salvation isn&apos;t about being good enough. It&apos;s about receiving a gift you could never earn. That&apos;s what makes it grace — &ldquo;not of works, lest any man should boast&rdquo; (Ephesians 2:9).
              </p>
            </div>
            <div>
              <h3 className="font-bold text-scripture dark:text-white mb-2">&ldquo;What if I&apos;ve done too much wrong?&rdquo;</h3>
              <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-sm">
                The word &ldquo;whosoever&rdquo; exists specifically because of this question. It means <em>anyone</em> — no exceptions. The Apostle Paul called himself the &ldquo;chief of sinners&rdquo; (1 Timothy 1:15) and said Jesus saved him to prove that no one is beyond reach. If &ldquo;whosoever&rdquo; doesn&apos;t include your story, it doesn&apos;t mean anything. But it does.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-scripture dark:text-white mb-2">&ldquo;Do I have to change my life to be saved?&rdquo;</h3>
              <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-sm">
                You don&apos;t have to fix yourself before coming to God — but you do have to be willing to turn. The Bible calls this repentance. Jesus said &ldquo;Repent, and believe the gospel&rdquo; (Mark 1:15). Repentance isn&apos;t about becoming perfect overnight. It&apos;s an honest change of direction: admitting you&apos;ve been going your own way and choosing to follow God instead. You come as you are, but you don&apos;t stay as you are. God does the transforming — your job is to show up willing.
              </p>
            </div>
          </div>
        </section>

        {/* Cross-References */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Other Verses That Say the Same Thing</h2>
          <p className="text-primary-dark/60 dark:text-primary-dark/40 mb-6 text-sm">John 3:16 isn&apos;t a lone verse. The entire Bible points to this message.</p>
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
              <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">Test Your Understanding</p>
              <h2 className="text-2xl font-bold text-scripture dark:text-white font-display">John 3:16 Quiz</h2>
              <p className="text-primary-dark/60 dark:text-primary-dark/40 mt-2 text-sm">15 questions — see how well you understand the most famous verse in the Bible</p>
            </div>
            {quiz ? (
              <PillarQuiz quiz={quiz} />
            ) : (
              <p className="text-center text-primary-dark/60">Quiz loading...</p>
            )}
          </div>
        </section>

        {/* Gospel CTA — For Non-Believers & Seekers */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-scripture via-scripture/95 to-blue-950 rounded-xl p-8 md:p-10 text-white shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4 text-center">This Verse Is an Invitation</h2>
            <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-3 text-center">
              John 3:16 isn&apos;t information to file away. It&apos;s a question that requires an answer: <em>Will you repent and believe?</em>
            </p>
            <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-6 text-center">
              You don&apos;t need to understand everything. You don&apos;t need to fix yourself first. You just need to be honest with God about where you are and willing to turn toward Him. That turning — repentance — and that trust — faith — are how eternal life begins. If you want to take the next step:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/what-does-the-bible-say-about/salvation" className="inline-flex items-center justify-center bg-white text-scripture font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors text-sm uppercase tracking-wider">
                How to Be Saved
              </Link>
              <Link href="/what-does-the-bible-say-about/repentance" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
                What the Bible Says About Repentance
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Frequently Asked Questions About John 3:16</h2>
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
            <Link href="/john-3-quiz" className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">60 Questions, 4 Difficulty Levels</p>
              <h3 className="text-xl font-bold mb-1">Complete John Chapter 3 Quiz</h3>
              <p className="text-blue-100 text-sm">Test everything from Nicodemus to born again to eternal life.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Quiz &rarr;</span>
            </Link>
            <Link href="/john-quiz" className="bg-scripture hover:bg-scripture/90 rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">25 Questions Covering All 21 Chapters</p>
              <h3 className="text-xl font-bold mb-1">Complete Gospel of John Quiz</h3>
              <p className="text-blue-100 text-sm">From &ldquo;In the beginning was the Word&rdquo; to the risen Christ.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Quiz &rarr;</span>
            </Link>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="bg-primary-light/30 dark:bg-dark-surface/30 border border-grace dark:border-dark-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-4">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/john-3-quiz" className="text-blue-600 hover:underline text-sm">John Chapter 3 Quiz</Link>
            <Link href="/john-chapters" className="text-blue-600 hover:underline text-sm">All John Chapter Quizzes</Link>
            <Link href="/john-quiz" className="text-blue-600 hover:underline text-sm">Complete Gospel of John Quiz</Link>
            <Link href="/what-does-the-bible-say-about/salvation" className="text-blue-600 hover:underline text-sm">What the Bible Says About Salvation</Link>
            <Link href="/what-does-the-bible-say-about/repentance" className="text-blue-600 hover:underline text-sm">What the Bible Says About Repentance</Link>
            <Link href="/topics/born-again" className="text-blue-600 hover:underline text-sm">Bible Verses About Being Born Again</Link>
            <Link href="/topics/eternal-life" className="text-blue-600 hover:underline text-sm">Bible Verses About Eternal Life</Link>
            <Link href="/topics/gods-love" className="text-blue-600 hover:underline text-sm">Bible Verses About God&apos;s Love</Link>
            <Link href="/characters/nicodemus" className="text-blue-600 hover:underline text-sm">Nicodemus Character Study</Link>
            <Link href="/characters/john-apostle" className="text-blue-600 hover:underline text-sm">John the Apostle</Link>
            <Link href="/bible-chapter-summaries/john/3" className="text-blue-600 hover:underline text-sm">John Chapter 3 Summary</Link>
            <Link href="/bible-geography/john/3" className="text-blue-600 hover:underline text-sm">John 3 Places &amp; Map</Link>
            <Link href="/verses/john/3/16" className="text-blue-600 hover:underline text-sm">John 3:16 Verse Commentary</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
