import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { StructuredData } from '@/components/StructuredData';
import PillarQuiz from '@/components/PillarQuiz';

const SITE_URL = 'https://biblemaximum.com';

export const metadata: Metadata = {
  title: 'Proverbs 3:5-6 Explained — Trust in the Lord with All Your Heart | Bible Maximum',
  description: 'What does Proverbs 3:5-6 mean? A complete word-by-word study of "Trust in the LORD with all thine heart" with context from Solomon\'s wisdom, cross-references, quiz, and FAQ.',
  keywords: ['proverbs 3:5-6', 'proverbs 3 5 6 meaning', 'trust in the lord with all your heart', 'lean not on your own understanding', 'acknowledge him in all your ways', 'he shall direct thy paths', 'proverbs 3:5-6 explained', 'solomon wisdom', 'trusting god', 'proverbs 3 study'],
  alternates: {
    canonical: '/proverbs-3-5-6',
  },
  openGraph: {
    title: 'Proverbs 3:5-6 Explained — Trust in the Lord with All Your Heart',
    description: 'A complete word-by-word study of Proverbs 3:5-6 with context, cross-references, quiz, and FAQ.',
    url: `${SITE_URL}/proverbs-3-5-6`,
    type: 'article',
    images: ['/images/veneeth_john_Close-up_of_hands_clasped_in_prayer_over_an_old_wo_4102fcf6-a02b-451e-978c-3a8e1f9fa12d.png'],
  },
};

function loadProverbs356Quiz() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'quizzes', 'proverbs-3-5-6.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const WORD_STUDY = [
  {
    phrase: '"Trust in the LORD"',
    hebrew: 'batach b\'Yahweh',
    explanation: 'The Hebrew word batach means to lie face down in total dependence and vulnerability. It conveys complete reliance — not casual optimism, but a deliberate casting of oneself upon God. The object of trust is Yahweh (LORD, in all capitals), the covenant-keeping God who revealed Himself to Israel. This is not trust in a principle or philosophy, but in the living, personal God.',
  },
  {
    phrase: '"with all thine heart"',
    hebrew: 'b\'kol libbeka',
    explanation: 'In Hebrew thought, the heart (leb) is not merely the seat of emotions — it is the center of the entire inner life: will, intellect, and affection. "All thine heart" means undivided, wholehearted trust. There is no room for partial reliance on God and partial reliance on self. Half-hearted trust is no trust at all.',
  },
  {
    phrase: '"and lean not"',
    hebrew: 'v\'al tishshaen',
    explanation: 'The word "lean" (sha\'an) means to support oneself upon, as a person leans on a staff for support. The command is negative: do not support yourself upon your own reasoning as though it were a reliable staff. Human understanding is a broken reed that will pierce the hand of anyone who leans on it (Isaiah 36:6).',
  },
  {
    phrase: '"unto thine own understanding"',
    hebrew: 'el-binateka',
    explanation: 'The Hebrew binah refers to insight, discernment, and the ability to distinguish between things. This is not a command against thinking — God created the mind and commands us to reason (Isaiah 1:18). Rather, it forbids elevating human reasoning to the place of supreme authority. Our understanding is limited, fallen, and easily deceived. God\'s wisdom is infinite and perfect.',
  },
  {
    phrase: '"In all thy ways"',
    hebrew: 'b\'kol d\'rakeka',
    explanation: '"Ways" (derek) refers to the road, path, or course of life — every decision, relationship, vocation, and circumstance. "All" leaves no category excluded. Acknowledging God is not reserved for Sunday mornings or crisis moments. It encompasses the mundane and the monumental, the ordinary Tuesday and the life-altering crossroad.',
  },
  {
    phrase: '"acknowledge him"',
    hebrew: 'da\'ehu (from yada\')',
    explanation: 'The Hebrew yada\' means to know personally and intimately — the same word used for the deepest relational knowledge in Scripture. To "acknowledge" God means far more than intellectual belief in His existence. It means to recognize His lordship, consult His Word, seek His will in prayer, and submit every decision to His authority.',
  },
  {
    phrase: '"and he shall"',
    hebrew: 'v\'hu',
    explanation: 'This is the hinge of the promise. The subject shifts from man\'s responsibility to God\'s response. After the conditions of trust, dependence, and acknowledgment, God Himself acts. The "he" is emphatic in Hebrew — it is God Himself, not circumstances or luck, who intervenes. The promise is personal and certain.',
  },
  {
    phrase: '"direct thy paths"',
    hebrew: 'y\'yasher orhoteka',
    explanation: 'The Hebrew yashar means to make straight, smooth, or level. God does not merely point in a direction — He actively straightens the road before us, removing obstacles and establishing our steps. "Paths" (orach) refers to a well-worn track or established route. God takes the crooked, uncertain road of life and makes it straight for those who trust Him completely.',
  },
];

const CROSS_REFERENCES = [
  { ref: 'Proverbs 3:7-8', text: 'Be not wise in thine own eyes: fear the LORD, and depart from evil. It shall be health to thy navel, and marrow to thy bones.' },
  { ref: 'Psalm 37:5', text: 'Commit thy way unto the LORD; trust also in him; and he shall bring it to pass.' },
  { ref: 'Psalm 32:8', text: 'I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye.' },
  { ref: 'Isaiah 30:21', text: 'And thine ears shall hear a word behind thee, saying, This is the way, walk ye in it, when ye turn to the right hand, and when ye turn to the left.' },
  { ref: 'James 1:5', text: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.' },
];

const FAQ_ITEMS = [
  {
    question: 'What does Proverbs 3:5-6 mean?',
    answer: 'Proverbs 3:5-6 is a call to complete, wholehearted dependence on God rather than self-reliance. Verse 5 commands us to trust the LORD with our entire inner being and to stop leaning on our own limited reasoning. Verse 6 promises that when we acknowledge God as Lord over every area of life, He will personally straighten and direct the path ahead of us. Together, these verses present the foundational principle of the Christian life: surrender your will to God, and He will guide you.',
  },
  {
    question: 'How do I practically trust God with all my heart?',
    answer: 'Trusting God with all your heart begins with daily surrender in prayer — telling God that you submit your plans, fears, and desires to Him. It means reading His Word consistently so you know His character and promises. It means obeying what He has already revealed, even when it is difficult. It means choosing faith over anxiety when circumstances are uncertain. Practically, it looks like making decisions based on Scripture rather than popular opinion, and choosing obedience to God even when human logic says otherwise.',
  },
  {
    question: 'What does "lean not unto thine own understanding" mean?',
    answer: '"Lean not unto thine own understanding" means do not treat your own reasoning, experience, or intellect as the final authority in your life. This does not mean God forbids thinking or planning — Proverbs itself is a book about using wisdom. Rather, it warns against the arrogance of trusting your own judgment above God\'s revealed will. Human understanding is limited, biased, and corrupted by sin. God\'s wisdom is perfect, infinite, and always trustworthy.',
  },
  {
    question: 'What does it mean to acknowledge God in all your ways?',
    answer: 'To acknowledge God in all your ways means to recognize His lordship and seek His guidance in every area of life — not just the "spiritual" parts. It means consulting His Word before making decisions, praying for direction in your work, relationships, finances, and daily routines, and submitting your plans to His will. The Hebrew word for "acknowledge" (yada\') implies deep, personal, intimate knowledge — not mere intellectual assent but an ongoing relationship of dependence and communion.',
  },
  {
    question: 'What does "he shall direct thy paths" promise?',
    answer: '"He shall direct thy paths" is God\'s promise to actively guide and straighten the course of life for those who trust Him completely. The Hebrew word yashar means to make straight or level — God removes obstacles, opens doors, and establishes the steps of the faithful. This does not guarantee a pain-free life, but it guarantees that God is sovereign over the direction of your life. Even detours and difficulties are part of His purposeful leading (Romans 8:28).',
  },
  {
    question: 'How can I trust God when it is hard to understand what He is doing?',
    answer: 'Trusting God in seasons of confusion is exactly what Proverbs 3:5-6 addresses — the command to "lean not unto thine own understanding" presupposes that there will be times when you cannot make sense of God\'s plan. Trust is most genuine when it costs something. Remember that God sees the end from the beginning (Isaiah 46:10), that His ways are higher than ours (Isaiah 55:8-9), and that He works all things together for good to those who love Him (Romans 8:28). Look back at His past faithfulness, hold onto His promises, and choose to trust His character even when you cannot trace His hand.',
  },
];

export default function Proverbs356Page() {
  const quizData = loadProverbs356Quiz();

  // Build quiz object for the client component
  const quiz = quizData ? {
    ...quizData,
    difficulty: 'easy' as const,
    isBookQuiz: false,
    slug: 'proverbs-3-5-6',
    tags: ['proverbs 3:5-6', 'trust in the lord', 'wisdom', 'guidance'],
    totalQuestions: quizData.questions.length,
    estimatedTime: Math.ceil(quizData.questions.length * 0.5),
  } : null;

  // JSON-LD schemas
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Proverbs 3:5-6 Explained — Trust in the Lord with All Your Heart',
    description: 'A complete word-by-word study of Proverbs 3:5-6 with context from Solomon\'s wisdom, cross-references, quiz, and FAQ.',
    url: `${SITE_URL}/proverbs-3-5-6`,
    author: { '@type': 'Organization', name: 'Bible Maximum' },
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: SITE_URL },
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/proverbs-3-5-6` },
    about: [
      { '@type': 'Thing', name: 'Proverbs 3:5-6' },
      { '@type': 'Thing', name: 'Book of Proverbs' },
      { '@type': 'Thing', name: 'Trusting God' },
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
      { '@type': 'ListItem', position: 3, name: 'Proverbs', item: `${SITE_URL}/proverbs-chapters` },
      { '@type': 'ListItem', position: 4, name: 'Proverbs 3:5-6 Explained', item: `${SITE_URL}/proverbs-3-5-6` },
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
            <li><Link href="/proverbs-chapters" className="text-blue-600 hover:underline">Proverbs</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li className="text-primary-dark/70 font-medium">Proverbs 3:5-6</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-scripture dark:bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/veneeth_john_Close-up_of_hands_clasped_in_prayer_over_an_old_wo_4102fcf6-a02b-451e-978c-3a8e1f9fa12d.png"
            alt="Hands clasped in prayer over an open Bible"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-blue-300 text-sm font-bold uppercase tracking-widest mb-4">The Foundation of the Trusting Life</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-display leading-tight mb-8">
            Proverbs 3:5-6 Explained
          </h1>
          <blockquote className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8">
            <p className="text-xl md:text-2xl text-white leading-relaxed italic font-light mb-4">
              &ldquo;Trust in the LORD with all thine heart; and lean not unto thine own understanding.&rdquo;
            </p>
            <p className="text-xl md:text-2xl text-white leading-relaxed italic font-light">
              &ldquo;In all thy ways acknowledge him, and he shall direct thy paths.&rdquo;
            </p>
            <cite className="block mt-4 text-blue-200 text-sm font-bold not-italic">— Proverbs 3:5-6 (KJV)</cite>
          </blockquote>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#quiz" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
              Take the Proverbs 3:5-6 Quiz
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
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">What Does Proverbs 3:5-6 Mean?</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-lg mb-4">
            Proverbs 3:5-6 is one of the most beloved passages in all of Scripture. In two verses, Solomon presents the <strong>complete formula for the God-directed life</strong>: <strong>trust</strong> (rely wholly on God), <strong>surrender</strong> (stop leaning on your own limited insight), <strong>acknowledge</strong> (recognize God&apos;s lordship in every decision), and <strong>receive</strong> (God Himself will straighten your path).
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
            These verses are part of a father&apos;s instruction to his son in <Link href="/proverbs-chapters" className="text-blue-600 font-medium hover:underline">Proverbs chapter 3</Link>, where <Link href="/characters/solomon" className="text-blue-600 font-medium hover:underline">Solomon</Link> lays out the blessings of wisdom, obedience, and wholehearted trust in God. Below, we break down every phrase, explore the surrounding context, and test your understanding with a focused quiz.
          </p>
        </section>

        {/* Word-by-Word Study */}
        <section id="word-study" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Word-by-Word Study of Proverbs 3:5-6</h2>
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

        {/* Context Section: Solomon's Wisdom */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Context: Solomon&apos;s Wisdom and Proverbs 3</h2>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              Proverbs 3:5-6 is not an isolated fortune-cookie motto — it sits at the heart of a carefully structured chapter of fatherly instruction. <Link href="/characters/solomon" className="text-blue-600 font-medium hover:underline">Solomon</Link>, the wisest man who ever lived (1 Kings 3:12), wrote the book of Proverbs as practical wisdom for daily life. In chapter 3, he addresses his son with a series of commands and promises that build toward a single theme: <strong>the fear of the LORD is the foundation of everything</strong>.
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              The chapter opens with a call to remember God&apos;s law and keep His commandments (Proverbs 3:1-2), promising length of days and peace. Verses 3-4 instruct the son to bind mercy and truth to his heart. Then come verses 5-6 — the climactic command to trust God completely. The passage continues with a warning against self-reliance: <strong>&ldquo;Be not wise in thine own eyes: fear the LORD, and depart from evil&rdquo;</strong> (Proverbs 3:7).
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              Solomon then addresses honouring God with material possessions (Proverbs 3:9-10), accepting God&apos;s correction (3:11-12), and the surpassing value of wisdom itself (3:13-18). The entire chapter paints a portrait of the life lived in full surrender to God — a life marked by trust, obedience, generosity, and humility.
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
              The fear of the LORD — reverential awe and submission to God — is the golden thread running through all of Proverbs. It is called &ldquo;the beginning of wisdom&rdquo; (Proverbs 9:10) and &ldquo;the beginning of knowledge&rdquo; (Proverbs 1:7). Without it, trust in the LORD as described in 3:5-6 is impossible.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/characters/solomon" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">S</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Study Solomon</span>
              </Link>
              <Link href="/proverbs-3-quiz" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">Q</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Proverbs 3 Full Quiz</span>
              </Link>
              <Link href="/bible-chapter-summaries/proverbs/3" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">S</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Proverbs 3 Summary</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Cross-References */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Cross-References: Verses That Reinforce Proverbs 3:5-6</h2>
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
              <h2 className="text-2xl font-bold text-scripture dark:text-white font-display">Proverbs 3:5-6 Quiz</h2>
              <p className="text-primary-dark/60 dark:text-primary-dark/40 mt-2 text-sm">15 questions on trusting the LORD with all your heart and its context</p>
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
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">Trust God With Your Life</h2>
            <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-6">
              Proverbs 3:5-6 is not just a verse to frame on your wall — it is a call to surrender your entire life to God. Trusting Him with all your heart begins with trusting Him for your salvation. If you have never placed your faith in Jesus Christ, the path to trusting God starts at the cross.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/topics/salvation" className="inline-flex items-center justify-center bg-white text-scripture font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors text-sm uppercase tracking-wider">
                How to Be Saved
              </Link>
              <Link href="/topics/faith" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
                What Does the Bible Say About Faith?
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Frequently Asked Questions About Proverbs 3:5-6</h2>
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
            <Link href="/proverbs-3-quiz" className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">60 Questions, 4 Difficulty Levels</p>
              <h3 className="text-xl font-bold mb-1">Complete Proverbs Chapter 3 Quiz</h3>
              <p className="text-blue-100 text-sm">Test everything from trust and wisdom to mercy and the fear of the LORD.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Quiz &rarr;</span>
            </Link>
            <Link href="/proverbs-quiz" className="bg-scripture hover:bg-scripture/90 rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">25 Questions Covering All 31 Chapters</p>
              <h3 className="text-xl font-bold mb-1">Complete Book of Proverbs Quiz</h3>
              <p className="text-blue-100 text-sm">From the fear of the LORD to the virtuous woman of Proverbs 31.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Quiz &rarr;</span>
            </Link>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="bg-primary-light/30 dark:bg-dark-surface/30 border border-grace dark:border-dark-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-4">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/proverbs-3-quiz" className="text-blue-600 hover:underline text-sm">Proverbs Chapter 3 Quiz</Link>
            <Link href="/proverbs-chapters" className="text-blue-600 hover:underline text-sm">All Proverbs Chapter Quizzes</Link>
            <Link href="/proverbs-quiz" className="text-blue-600 hover:underline text-sm">Complete Book of Proverbs Quiz</Link>
            <Link href="/topics/trust" className="text-blue-600 hover:underline text-sm">Bible Verses About Trust</Link>
            <Link href="/topics/wisdom" className="text-blue-600 hover:underline text-sm">Bible Verses About Wisdom</Link>
            <Link href="/topics/faith" className="text-blue-600 hover:underline text-sm">Bible Verses About Faith</Link>
            <Link href="/topics/guidance" className="text-blue-600 hover:underline text-sm">Bible Verses About God&apos;s Guidance</Link>
            <Link href="/characters/solomon" className="text-blue-600 hover:underline text-sm">Solomon Character Study</Link>
            <Link href="/john-3-16" className="text-blue-600 hover:underline text-sm">John 3:16 Explained</Link>
            <Link href="/bible-chapter-summaries/proverbs/3" className="text-blue-600 hover:underline text-sm">Proverbs Chapter 3 Summary</Link>
            <Link href="/bible-geography/proverbs/3" className="text-blue-600 hover:underline text-sm">Proverbs 3 Places &amp; Map</Link>
            <Link href="/topics/salvation" className="text-blue-600 hover:underline text-sm">Bible Verses About Salvation</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
