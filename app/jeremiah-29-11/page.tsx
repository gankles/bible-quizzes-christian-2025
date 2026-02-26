import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { StructuredData } from '@/components/StructuredData';
import PillarQuiz from '@/components/PillarQuiz';

const SITE_URL = 'https://biblemaximum.com';

export const metadata: Metadata = {
  title: 'Jeremiah 29:11 Explained — Meaning, Context & Word-by-Word Study | Bible Maximum',
  description: 'What does Jeremiah 29:11 mean? A complete word-by-word study of "For I know the plans I have for you" with context from the Babylonian exile, cross-references, quiz, and FAQ.',
  keywords: ['jeremiah 29:11', 'jeremiah 29 11 meaning', 'jeremiah 29:11 explained', 'for i know the thoughts', 'what does jeremiah 29:11 mean', 'jeremiah 29:11 study', 'expected end', 'thoughts of peace', 'babylonian exile', 'hope and a future'],
  alternates: {
    canonical: '/jeremiah-29-11',
  },
  openGraph: {
    title: 'Jeremiah 29:11 Explained — God\'s Promise of Hope and a Future',
    description: 'A complete word-by-word study of Jeremiah 29:11 with context from the Babylonian exile, cross-references, quiz, and FAQ.',
    url: `${SITE_URL}/jeremiah-29-11`,
    type: 'article',
    images: ['/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png'],
  },
};

function loadJeremiah2911Quiz() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'quizzes', 'jeremiah-29-11.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const WORD_STUDY = [
  {
    phrase: '"For I know"',
    hebrew: 'ki anokhi yada\'ti',
    explanation: 'God begins with absolute certainty. The Hebrew yada means intimate, personal knowledge — not mere awareness. God does not guess or hope for the best; He knows with sovereign omniscience exactly what He has planned. This is a declaration of divine authority over the future, spoken to people in the darkest chapter of their national history.',
  },
  {
    phrase: '"the thoughts"',
    hebrew: 'machashavoth',
    explanation: 'The Hebrew machashavoth means plans, purposes, or intentions. It implies deliberate, considered thought — not random impulses. God\'s plans for Israel were not reactive or accidental. He had a design from before the exile began. This word reassures the captives that their suffering was not outside God\'s purposeful governance.',
  },
  {
    phrase: '"that I think toward you"',
    hebrew: 'asher anokhi choshev aleykhem',
    explanation: 'The phrase "toward you" is deeply personal. God is not thinking about Israel in the abstract — He is thinking toward them, directing His purposes at them specifically. The emphasis on "I" (anokhi) stresses God\'s personal involvement. He is not a distant deity; He actively directs His thoughts toward His covenant people even in judgment.',
  },
  {
    phrase: '"saith the LORD"',
    hebrew: 'ne\'um YHWH',
    explanation: 'This prophetic formula — "saith the LORD" (ne\'um YHWH) — marks these words as a direct divine oracle, not Jeremiah\'s personal opinion. It carries the full weight and authority of God\'s covenant name, YHWH (the LORD). When false prophets were saying the opposite, this phrase anchored the promise in God\'s unchangeable character.',
  },
  {
    phrase: '"thoughts of peace"',
    hebrew: 'machashavoth shalom',
    explanation: 'Shalom means far more than the absence of conflict. It encompasses wholeness, completeness, welfare, health, and restoration. God\'s thoughts toward His people are for their total well-being. Even while they endured the discipline of exile, His ultimate intention was shalom — full restoration to right relationship with Himself and to their land.',
  },
  {
    phrase: '"and not of evil"',
    hebrew: 'v\'lo l\'ra\'ah',
    explanation: 'Ra\'ah means calamity, disaster, or harm. God explicitly contrasts His intentions: peace, not destruction. This was crucial for the exiles to hear, because they could have concluded that God had abandoned them or turned permanently hostile. The exile was discipline, not abandonment. God\'s purposes were corrective, not destructive.',
  },
  {
    phrase: '"to give you"',
    hebrew: 'lathet lakhem',
    explanation: 'God\'s plan is not passive — He actively gives. The future He has designed is a gift, not something the exiles earn through their own effort. This echoes the grace that runs throughout Scripture: God is the giver, and man is the recipient. The exiles could not engineer their own return; God would give it to them in His time.',
  },
  {
    phrase: '"an expected end"',
    hebrew: 'acharith v\'tikvah',
    explanation: 'The KJV renders this "an expected end." The Hebrew acharith means "latter end" or "future," and tikvah means "hope." Together they form a powerful promise: a hopeful future, an outcome worth waiting for. Modern translations render it "a future and a hope." This was not a promise of no suffering — it was a promise that suffering would not be the final word.',
  },
];

const CROSS_REFERENCES = [
  { ref: 'Jeremiah 29:10', text: 'For thus saith the LORD, That after seventy years be accomplished at Babylon I will visit you, and perform my good word toward you, in causing you to return to this place.' },
  { ref: 'Jeremiah 29:12-13', text: 'Then shall ye call upon me, and ye shall go and pray unto me, and I will hearken unto you. And ye shall seek me, and find me, when ye shall search for me with all your heart.' },
  { ref: 'Romans 8:28', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.' },
  { ref: 'Psalm 138:8', text: 'The LORD will perfect that which concerneth me: thy mercy, O LORD, endureth for ever: forsake not the works of thine own hands.' },
  { ref: 'Proverbs 3:5-6', text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.' },
];

const FAQ_ITEMS = [
  {
    question: 'What does Jeremiah 29:11 mean?',
    answer: 'Jeremiah 29:11 is God\'s declaration to the Jewish exiles in Babylon that He has not forgotten them. Despite 70 years of captivity as discipline for their disobedience, God\'s ultimate plan for them is peace (shalom) — wholeness, restoration, and a hopeful future. It assures them that their suffering is not the end of the story. God has a purposeful design that includes their return to the land and renewal of relationship with Him.',
  },
  {
    question: 'What is the context of Jeremiah 29:11?',
    answer: 'Jeremiah 29:11 is part of a letter Jeremiah sent from Jerusalem to the Jewish exiles in Babylon after the deportation of 597 BC. False prophets were telling the captives they would return home quickly, but Jeremiah told them to settle down — build houses, plant gardens, marry — because the exile would last 70 years (Jeremiah 29:10). Verse 11 comes after this sobering timeline, assuring them that even a 70-year wait is part of God\'s good plan.',
  },
  {
    question: 'Is Jeremiah 29:11 commonly misused?',
    answer: 'Yes. Jeremiah 29:11 is one of the most frequently quoted — and most frequently decontextualized — verses in the Bible. It is often used as a prosperity gospel proof text or a generic promise that God will make life comfortable. In its original context, it was spoken to people in the middle of divine judgment (exile), promising restoration only after 70 years of suffering. The verse promises God\'s sovereignty and good purposes, not the absence of hardship.',
  },
  {
    question: 'Does Jeremiah 29:11 support the prosperity gospel?',
    answer: 'No. The prosperity gospel claims that God\'s will for every believer is immediate health, wealth, and comfort. Jeremiah 29:11 was spoken to people who would endure 70 years of exile before seeing the promise fulfilled. God\'s "thoughts of peace" included decades of captivity, the destruction of the temple, and the deaths of an entire generation in a foreign land. The verse teaches that God\'s good plan may include suffering, patience, and long waiting — the opposite of the prosperity gospel\'s message.',
  },
  {
    question: 'How should Christians apply Jeremiah 29:11 today?',
    answer: 'Christians can rightly draw the principle that God is sovereign, purposeful, and good — even in seasons of suffering and uncertainty. The application is not "God will make my life easy" but rather "God has not lost control, and His purposes will prevail." Like the exiles, believers should be faithful where God has placed them (build, plant, pray, seek the welfare of their community) while trusting that God\'s plan will unfold in His perfect timing.',
  },
  {
    question: 'What does "expected end" mean in Jeremiah 29:11 (KJV)?',
    answer: 'The KJV phrase "an expected end" translates the Hebrew acharith v\'tikvah, which literally means "an end (or future) and a hope." It describes an outcome that can be anticipated with confidence — a hopeful future. Modern translations often render it "a future and a hope." The word acharith (latter end, future) assures the exiles that there is an endpoint to their suffering, and tikvah (hope) assures them that this ending is good.',
  },
];

export default function Jeremiah2911Page() {
  const quizData = loadJeremiah2911Quiz();

  // Build quiz object for the client component
  const quiz = quizData ? {
    ...quizData,
    difficulty: 'easy' as const,
    isBookQuiz: false,
    slug: 'jeremiah-29-11',
    tags: ['jeremiah 29:11', 'hope', 'future', 'babylonian exile', 'god\'s plan'],
    totalQuestions: quizData.questions.length,
    estimatedTime: Math.ceil(quizData.questions.length * 0.5),
  } : null;

  // JSON-LD schemas
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Jeremiah 29:11 Explained — Meaning, Context & Word-by-Word Study',
    description: 'A complete word-by-word study of Jeremiah 29:11 with context from the Babylonian exile, cross-references, quiz, and FAQ.',
    url: `${SITE_URL}/jeremiah-29-11`,
    author: { '@type': 'Organization', name: 'Bible Maximum' },
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: SITE_URL },
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/jeremiah-29-11` },
    about: [
      { '@type': 'Thing', name: 'Jeremiah 29:11' },
      { '@type': 'Thing', name: 'Book of Jeremiah' },
      { '@type': 'Thing', name: 'Babylonian Exile' },
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
      { '@type': 'ListItem', position: 3, name: 'Jeremiah', item: `${SITE_URL}/jeremiah-chapters` },
      { '@type': 'ListItem', position: 4, name: 'Jeremiah 29:11 Explained', item: `${SITE_URL}/jeremiah-29-11` },
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
            <li><Link href="/jeremiah-chapters" className="text-blue-600 hover:underline">Jeremiah</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li className="text-primary-dark/70 font-medium">Jeremiah 29:11</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-scripture dark:bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png"
            alt="Open Bible with light symbolizing God's word and promise"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-blue-300 text-sm font-bold uppercase tracking-widest mb-4">God&apos;s Promise of Hope and a Future</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-display leading-tight mb-8">
            Jeremiah 29:11 Explained
          </h1>
          <blockquote className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8">
            <p className="text-xl md:text-2xl text-white leading-relaxed italic font-light">
              &ldquo;For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.&rdquo;
            </p>
            <cite className="block mt-4 text-blue-200 text-sm font-bold not-italic">&mdash; Jeremiah 29:11 (KJV)</cite>
          </blockquote>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#quiz" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
              Take the Jeremiah 29:11 Quiz
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
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">What Does Jeremiah 29:11 Mean?</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-lg mb-4">
            Jeremiah 29:11 is one of the most beloved and most misquoted verses in the Bible. In a single sentence, God declares to His exiled people that <strong>He has not abandoned them</strong>, that <strong>His plans are for their peace</strong>, and that <strong>their story does not end in Babylon</strong>. The promise is not instant prosperity — it is sovereign assurance that God&apos;s purposes will prevail.
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
            Jeremiah wrote these words in a letter to the Jewish captives in Babylon after the deportation of 597 BC. False prophets were promising a quick return, but God told His people to settle in for 70 years — and then gave them this extraordinary promise. Below, we break down every phrase, explore the historical context, and test your understanding with a focused quiz.
          </p>
        </section>

        {/* Word-by-Word Study */}
        <section id="word-study" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Word-by-Word Study of Jeremiah 29:11</h2>
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

        {/* Context Section: Babylonian Exile */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Context: The Letter to the Exiles in Babylon (Jeremiah 29)</h2>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              Jeremiah 29:11 is not a standalone inspirational quote — it is embedded in one of the most important letters in the Old Testament. After King Nebuchadnezzar carried away the first wave of Jewish captives to Babylon in 597 BC (including King Jeconiah, craftsmen, and nobility), Jeremiah sent a letter from Jerusalem to the exiles with instructions from God.
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              The exiles were desperate and confused. <strong>False prophets like Hananiah</strong> (Jeremiah 28) had promised a quick deliverance — that within two years, the temple vessels and the captives would return. But Jeremiah delivered God&apos;s true word: the exile would last <strong>70 years</strong> (Jeremiah 29:10). God told them to settle down, build houses, plant gardens, marry and have children, and even <em>pray for the welfare of Babylon</em> (Jeremiah 29:5-7).
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              Then comes the promise of verse 11: after the 70 years are complete, God will visit them, bring them home, and fulfill His good word. The promise was not that suffering would end immediately — it was that suffering had a purpose and an expiration date. God&apos;s thoughts toward them were thoughts of <em>shalom</em>, not destruction.
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
              The verses that follow (29:12-14) complete the promise: God would hear their prayers, let them find Him when they sought Him wholeheartedly, and gather them from all the nations where He had scattered them. The fulfillment began under Cyrus the Great in 539 BC, exactly 70 years after the first deportation.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/jeremiah-29-quiz" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">Q</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Jeremiah 29 Quiz</span>
              </Link>
              <Link href="/bible-chapter-summaries/jeremiah/29" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">S</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Jeremiah 29 Summary</span>
              </Link>
              <Link href="/characters/jeremiah" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">J</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Study Jeremiah</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Cross-References */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Cross-References: Verses That Reinforce Jeremiah 29:11</h2>
          <div className="space-y-3">
            {CROSS_REFERENCES.map((verse, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-5 shadow-sm">
                <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed italic mb-2">&ldquo;{verse.text}&rdquo;</p>
                <p className="text-sm font-bold text-blue-600">&mdash; {verse.ref}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Embedded Quiz */}
        <section id="quiz" className="mb-12 scroll-mt-20">
          <div className="bg-white dark:bg-dark-surface rounded-xl border-2 border-blue-600/20 p-6 md:p-8 shadow-sm">
            <div className="text-center mb-6">
              <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">Test Your Knowledge</p>
              <h2 className="text-2xl font-bold text-scripture dark:text-white font-display">Jeremiah 29:11 Quiz</h2>
              <p className="text-primary-dark/60 dark:text-primary-dark/40 mt-2 text-sm">15 questions on God&apos;s promise of hope and the Babylonian exile context</p>
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
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">God Has a Plan for You</h2>
            <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-6">
              The same God who had plans of peace for Israel in their darkest hour has plans for you. He is not distant or indifferent. Through Jesus Christ, God offers forgiveness, new life, and an eternal hope that no circumstance can take away. If you are in a difficult season, know this: God has not forgotten you, and He is working all things together for your good.
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
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Frequently Asked Questions About Jeremiah 29:11</h2>
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
            <Link href="/jeremiah-29-quiz" className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">60 Questions, 4 Difficulty Levels</p>
              <h3 className="text-xl font-bold mb-1">Complete Jeremiah Chapter 29 Quiz</h3>
              <p className="text-blue-100 text-sm">Test everything from the letter to the exiles to the 70-year prophecy.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Quiz &rarr;</span>
            </Link>
            <Link href="/jeremiah-quiz" className="bg-scripture hover:bg-scripture/90 rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">25 Questions Covering All 52 Chapters</p>
              <h3 className="text-xl font-bold mb-1">Complete Book of Jeremiah Quiz</h3>
              <p className="text-blue-100 text-sm">From the call of Jeremiah to the fall of Jerusalem and beyond.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Quiz &rarr;</span>
            </Link>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="bg-primary-light/30 dark:bg-dark-surface/30 border border-grace dark:border-dark-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-4">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/jeremiah-29-quiz" className="text-blue-600 hover:underline text-sm">Jeremiah Chapter 29 Quiz</Link>
            <Link href="/jeremiah-chapters" className="text-blue-600 hover:underline text-sm">All Jeremiah Chapter Quizzes</Link>
            <Link href="/jeremiah-quiz" className="text-blue-600 hover:underline text-sm">Complete Book of Jeremiah Quiz</Link>
            <Link href="/topics/hope" className="text-blue-600 hover:underline text-sm">Bible Verses About Hope</Link>
            <Link href="/topics/salvation" className="text-blue-600 hover:underline text-sm">Bible Verses About Salvation</Link>
            <Link href="/topics/gods-faithfulness" className="text-blue-600 hover:underline text-sm">Bible Verses About God&apos;s Faithfulness</Link>
            <Link href="/topics/trust-in-god" className="text-blue-600 hover:underline text-sm">Bible Verses About Trusting God</Link>
            <Link href="/characters/jeremiah" className="text-blue-600 hover:underline text-sm">Jeremiah Character Study</Link>
            <Link href="/john-3-16" className="text-blue-600 hover:underline text-sm">John 3:16 Explained</Link>
            <Link href="/bible-chapter-summaries/jeremiah/29" className="text-blue-600 hover:underline text-sm">Jeremiah Chapter 29 Summary</Link>
            <Link href="/bible-geography/jeremiah/29" className="text-blue-600 hover:underline text-sm">Jeremiah 29 Places &amp; Map</Link>
            <Link href="/verses/jeremiah/29/11" className="text-blue-600 hover:underline text-sm">Jeremiah 29:11 Verse Commentary</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
