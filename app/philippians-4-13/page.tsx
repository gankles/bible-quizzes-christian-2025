import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { StructuredData } from '@/components/StructuredData';
import PillarQuiz from '@/components/PillarQuiz';

const SITE_URL = 'https://biblemaximum.com';

export const metadata: Metadata = {
  title: 'Philippians 4:13 Explained — I Can Do All Things Through Christ | Bible Maximum',
  description: 'What does Philippians 4:13 really mean? A complete study of "I can do all things through Christ which strengtheneth me" — its true meaning about contentment, Paul\'s prison context, cross-references, quiz, and FAQ.',
  keywords: ['philippians 4:13', 'philippians 4 13 meaning', 'i can do all things through christ', 'philippians 4:13 explained', 'what does philippians 4:13 mean', 'through christ who strengthens me', 'paul contentment', 'philippians 4:13 context', 'strength in christ', 'philippians 4:13 study'],
  alternates: {
    canonical: '/philippians-4-13',
  },
  openGraph: {
    title: 'Philippians 4:13 Explained — I Can Do All Things Through Christ',
    description: 'A complete study of Philippians 4:13 with its true meaning about contentment, context, cross-references, quiz, and FAQ.',
    url: `${SITE_URL}/philippians-4-13`,
    type: 'article',
    images: ['/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png'],
  },
};

function loadPhilippians413Quiz() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'quizzes', 'philippians-4-13.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const WORD_STUDY = [
  {
    phrase: '"I can do"',
    greek: 'ischuo (to be strong, to have power)',
    explanation: 'Paul uses the word ischuo, meaning "I am strong" or "I have strength." This is not a boast of self-sufficiency — the rest of the verse reveals the source. Paul is declaring that he possesses a strength, but it is not his own. It is a received power that enables him to face every situation life throws at him.',
  },
  {
    phrase: '"all things"',
    greek: 'panta (all, every kind)',
    explanation: 'This is the most misunderstood phrase in the verse. "All things" does not mean unlimited ability to achieve any personal ambition. In context (verses 11-12), "all things" refers to all circumstances — being abased or abounding, being full or hungry, having plenty or suffering need. Paul can endure every situation with contentment because of Christ\'s power in him.',
  },
  {
    phrase: '"through Christ"',
    greek: 'en Christo (in Christ, by means of Christ)',
    explanation: 'The preposition "through" (en) indicates the channel and source of Paul\'s strength. Everything Paul can do is because of his union with Christ. Apart from Christ, Paul has no special power. This echoes Jesus\' words in John 15:5: "Without me ye can do nothing." Christ is not an assistant to Paul\'s plans — He is the source of all Paul\'s endurance.',
  },
  {
    phrase: '"which strengtheneth me"',
    greek: 'endunamoo (to empower, to infuse strength)',
    explanation: 'The Greek endunamoo means "to pour power into" or "to make strong inwardly." It is a present participle, meaning Christ is continually, actively strengthening Paul — not just a one-time event. This is spiritual empowerment for endurance and contentment, not physical superpowers or guaranteed success in worldly pursuits.',
  },
  {
    phrase: '"I have learned to be content" (v11)',
    greek: 'autarkes (self-sufficient, content)',
    explanation: 'The word autarkes was used by Stoic philosophers to mean self-sufficiency. But Paul radically redefines it: his sufficiency comes not from himself but from Christ. He "learned" contentment — it was a process of spiritual growth through hardship, not an instant gift. True Christian contentment is Christ-dependent, not self-dependent.',
  },
  {
    phrase: '"to be abased... to abound" (v12)',
    greek: 'tapeinoo / perisseuein',
    explanation: 'Paul lists the full spectrum of human experience: humiliation and abundance, hunger and fullness, surplus and deprivation. He has personally experienced them all. "Abased" (tapeinoo) means to be brought low, humbled, even humiliated. "Abound" (perisseuein) means to have more than enough. Paul claims mastery over both extremes — not in his own strength, but through Christ.',
  },
];

const CROSS_REFERENCES = [
  { ref: 'Philippians 4:11-12', text: 'Not that I speak in respect of want: for I have learned, in whatsoever state I am, therewith to be content. I know both how to be abased, and I know how to abound: every where and in all things I am instructed both to be full and to be hungry, both to abound and to suffer need.' },
  { ref: 'Philippians 4:19', text: 'But my God shall supply all your need according to his riches in glory by Christ Jesus.' },
  { ref: '2 Corinthians 12:9-10', text: 'And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me.' },
  { ref: 'Isaiah 40:31', text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.' },
  { ref: '2 Timothy 4:17', text: 'Notwithstanding the Lord stood with me, and strengthened me; that by me the preaching might be fully known, and that all the Gentiles might hear: and I was delivered out of the mouth of the lion.' },
];

const FAQ_ITEMS = [
  {
    question: 'What does Philippians 4:13 mean?',
    answer: 'Philippians 4:13 means that through the power of Christ living in him, the Apostle Paul can endure any circumstance with contentment — whether poverty or prosperity, hunger or abundance, suffering or comfort. It is a declaration of Christ-dependent strength for every situation in life, not a blank check for achieving personal ambitions.',
  },
  {
    question: 'What does "all things" mean in Philippians 4:13?',
    answer: '"All things" in context refers to all the circumstances Paul described in verses 11-12: being abased and abounding, being full and being hungry, having plenty and suffering need. Paul is saying he can face every kind of situation — both hardship and abundance — because Christ empowers him. It does not mean Christians can accomplish any personal goal simply by claiming this verse.',
  },
  {
    question: 'How is Philippians 4:13 commonly misused?',
    answer: 'Philippians 4:13 is one of the most misquoted verses in the Bible. It is frequently used on sports jerseys, motivational posters, and prosperity sermons to mean "I can achieve anything I want through God." But Paul was not talking about winning games, getting promotions, or achieving personal success. He was writing from a Roman prison about learning to be content whether he had much or little. The verse is about endurance and contentment, not worldly achievement.',
  },
  {
    question: 'What was Paul\'s situation when he wrote Philippians 4:13?',
    answer: 'Paul was a prisoner, likely in Rome, when he wrote this letter. He was chained to Roman guards (Phil 1:13), facing an uncertain future, and dependent on the financial gifts of the Philippian church for basic needs. Yet from this place of suffering and deprivation, Paul wrote one of the most joyful letters in the New Testament. His contentment was not based on his circumstances but on Christ\'s strength within him.',
  },
  {
    question: 'How should Christians apply Philippians 4:13 today?',
    answer: 'Christians should apply Philippians 4:13 by trusting Christ for the strength to be content in every circumstance — good or bad. When facing financial difficulty, illness, loss, or hardship, this verse promises that Christ will empower you to endure with peace and contentment. When experiencing abundance and success, it reminds you that your sufficiency is still in Christ, not in your possessions. It is a call to Christ-centered contentment in all seasons of life.',
  },
  {
    question: 'How does Christ strengthen believers according to Philippians 4:13?',
    answer: 'The Greek word endunamoo means "to pour strength into" or "to empower inwardly." Christ strengthens believers not by removing their difficulties but by giving them the internal spiritual power to endure, to remain faithful, and to find peace in the midst of trials. This is a present, ongoing empowerment — Christ continually infuses strength into those who are united with Him by faith. Paul experienced this daily in his chains.',
  },
];

export default function Philippians413Page() {
  const quizData = loadPhilippians413Quiz();

  // Build quiz object for the client component
  const quiz = quizData ? {
    ...quizData,
    difficulty: 'easy' as const,
    isBookQuiz: false,
    slug: 'philippians-4-13',
    tags: ['philippians 4:13', 'contentment', 'strength in christ', 'paul'],
    totalQuestions: quizData.questions.length,
    estimatedTime: Math.ceil(quizData.questions.length * 0.5),
  } : null;

  // JSON-LD schemas
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Philippians 4:13 Explained — I Can Do All Things Through Christ',
    description: 'A complete study of Philippians 4:13 with its true meaning about contentment, Paul\'s prison context, cross-references, quiz, and FAQ.',
    url: `${SITE_URL}/philippians-4-13`,
    author: { '@type': 'Organization', name: 'Bible Maximum' },
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: SITE_URL },
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/philippians-4-13` },
    about: [
      { '@type': 'Thing', name: 'Philippians 4:13' },
      { '@type': 'Thing', name: 'Epistle to the Philippians' },
      { '@type': 'Thing', name: 'Contentment' },
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
      { '@type': 'ListItem', position: 3, name: 'Philippians', item: `${SITE_URL}/philippians-chapters` },
      { '@type': 'ListItem', position: 4, name: 'Philippians 4:13 Explained', item: `${SITE_URL}/philippians-4-13` },
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
            <li><Link href="/philippians-chapters" className="text-blue-600 hover:underline">Philippians</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li className="text-primary-dark/70 font-medium">Philippians 4:13</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-scripture dark:bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png"
            alt="Open Bible with light pouring down, symbolizing strength through Christ"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-blue-300 text-sm font-bold uppercase tracking-widest mb-4">One of the Most Quoted Verses in the Bible</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-display leading-tight mb-8">
            Philippians 4:13 Explained
          </h1>
          <blockquote className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8">
            <p className="text-xl md:text-2xl text-white leading-relaxed italic font-light">
              &ldquo;I can do all things through Christ which strengtheneth me.&rdquo;
            </p>
            <cite className="block mt-4 text-blue-200 text-sm font-bold not-italic">&mdash; Philippians 4:13 (KJV)</cite>
          </blockquote>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#quiz" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
              Take the Philippians 4:13 Quiz
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
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">What Does Philippians 4:13 Mean?</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-lg mb-4">
            Philippians 4:13 is one of the most quoted &mdash; and most misunderstood &mdash; verses in the Bible. It is <strong>not</strong> a promise of unlimited achievement, athletic victory, or financial prosperity. In context, it is Paul&apos;s declaration that <strong>Christ gives him the strength to be content in every circumstance</strong> &mdash; whether in poverty or abundance, hunger or fullness, suffering or comfort.
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
            The Apostle <Link href="/characters/paul" className="text-blue-600 font-medium hover:underline">Paul</Link> wrote these words from a Roman prison, chained to guards, facing an uncertain future. Yet he declared himself content &mdash; not because his circumstances were good, but because Christ was his strength. Below, we study every phrase, explore the context, and test your understanding with a focused quiz.
          </p>
        </section>

        {/* Word-by-Word Study */}
        <section id="word-study" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Word-by-Word Study of Philippians 4:13</h2>
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

        {/* Context Section: Paul in Prison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Context: Paul in Prison, Writing to the Philippians</h2>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              Philippians 4:13 is not an isolated motivational quote &mdash; it is the climax of Paul&apos;s teaching on contentment in chapters 4:10-20. Paul was writing from prison, likely in Rome around A.D. 61-63. He was chained to Roman guards (Philippians 1:13), dependent on the generosity of the Philippian church for his basic needs, and facing the real possibility of execution.
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              Yet from this place of suffering, Paul wrote the most joyful letter in the New Testament. The words &ldquo;joy&rdquo; and &ldquo;rejoice&rdquo; appear over 16 times in Philippians. Paul&apos;s command in 4:4 &mdash; <strong>&ldquo;Rejoice in the Lord alway: and again I say, Rejoice&rdquo;</strong> &mdash; was not written from a comfortable study but from a cold prison cell. This is what makes Philippians 4:13 so powerful: it was tested under fire.
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              The Philippian church had sent a financial gift to Paul through <Link href="/characters/epaphroditus" className="text-blue-600 font-medium hover:underline">Epaphroditus</Link> (Phil 4:18). In thanking them, Paul reveals his secret: he has learned to be content in any circumstance. He has been hungry and full, poor and rich, humiliated and honored. Through it all, Christ gave him the strength to endure with joy.
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
              This context transforms Philippians 4:13 from a motivational slogan into a profound theological truth: <strong>Christ&apos;s power is sufficient for every trial, and His strength is most visible when we are at our weakest.</strong> Paul echoed this in 2 Corinthians 12:10: &ldquo;When I am weak, then am I strong.&rdquo;
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/characters/paul" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">P</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Study Paul</span>
              </Link>
              <Link href="/philippians-4-quiz" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">Q</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Philippians 4 Quiz</span>
              </Link>
              <Link href="/bible-chapter-summaries/philippians/4" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">S</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Philippians 4 Summary</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Cross-References */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Cross-References: Verses That Reinforce Philippians 4:13</h2>
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
              <h2 className="text-2xl font-bold text-scripture dark:text-white font-display">Philippians 4:13 Quiz</h2>
              <p className="text-primary-dark/60 dark:text-primary-dark/40 mt-2 text-sm">15 questions on one of the most quoted verses in the Bible and its context</p>
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
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">Find Your Strength in Christ</h2>
            <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-6">
              Philippians 4:13 is not a motivational slogan &mdash; it is a promise for those who belong to Christ. Paul&apos;s strength came from a living relationship with Jesus. If you want to experience this same strength and contentment in every season of life, it begins with faith in Christ.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/topics/salvation" className="inline-flex items-center justify-center bg-white text-scripture font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors text-sm uppercase tracking-wider">
                How to Be Saved
              </Link>
              <Link href="/topics/faith" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
                What Is Faith in Christ?
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Frequently Asked Questions About Philippians 4:13</h2>
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
            <Link href="/philippians-4-quiz" className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">60 Questions, 4 Difficulty Levels</p>
              <h3 className="text-xl font-bold mb-1">Complete Philippians 4 Quiz</h3>
              <p className="text-blue-100 text-sm">Test everything from contentment to the peace of God to supply of every need.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Quiz &rarr;</span>
            </Link>
            <Link href="/philippians-quiz" className="bg-scripture hover:bg-scripture/90 rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">25 Questions Covering All 4 Chapters</p>
              <h3 className="text-xl font-bold mb-1">Complete Philippians Quiz</h3>
              <p className="text-blue-100 text-sm">From the mind of Christ to pressing toward the mark to the peace that passes understanding.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Quiz &rarr;</span>
            </Link>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="bg-primary-light/30 dark:bg-dark-surface/30 border border-grace dark:border-dark-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-4">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/philippians-4-quiz" className="text-blue-600 hover:underline text-sm">Philippians Chapter 4 Quiz</Link>
            <Link href="/philippians-chapters" className="text-blue-600 hover:underline text-sm">All Philippians Chapter Quizzes</Link>
            <Link href="/philippians-quiz" className="text-blue-600 hover:underline text-sm">Complete Philippians Quiz</Link>
            <Link href="/topics/contentment" className="text-blue-600 hover:underline text-sm">Bible Verses About Contentment</Link>
            <Link href="/topics/strength" className="text-blue-600 hover:underline text-sm">Bible Verses About Strength</Link>
            <Link href="/topics/faith" className="text-blue-600 hover:underline text-sm">Bible Verses About Faith</Link>
            <Link href="/topics/joy" className="text-blue-600 hover:underline text-sm">Bible Verses About Joy</Link>
            <Link href="/topics/salvation" className="text-blue-600 hover:underline text-sm">Bible Verses About Salvation</Link>
            <Link href="/characters/paul" className="text-blue-600 hover:underline text-sm">Paul Character Study</Link>
            <Link href="/bible-chapter-summaries/philippians/4" className="text-blue-600 hover:underline text-sm">Philippians 4 Summary</Link>
            <Link href="/bible-geography/philippians/4" className="text-blue-600 hover:underline text-sm">Philippians 4 Places &amp; Map</Link>
            <Link href="/john-3-16" className="text-blue-600 hover:underline text-sm">John 3:16 Explained</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
