import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { StructuredData } from '@/components/StructuredData';
import PillarQuiz from '@/components/PillarQuiz';

const SITE_URL = 'https://biblemaximum.com';

export const metadata: Metadata = {
  title: 'Romans 8:28 Explained — All Things Work Together for Good | Bible Maximum',
  description: 'What does Romans 8:28 mean? A complete word-by-word study of "all things work together for good," with context from Romans 8, the golden chain, cross-references, quiz, and FAQ.',
  keywords: ['romans 8:28', 'romans 8 28 meaning', 'all things work together for good', 'romans 8:28 explained', 'called according to his purpose', 'romans 8 study', 'golden chain of redemption', 'more than conquerors', 'nothing can separate us', 'gods purpose'],
  alternates: {
    canonical: '/romans-8-28',
  },
  openGraph: {
    title: 'Romans 8:28 Explained — All Things Work Together for Good',
    description: 'A complete word-by-word study of Romans 8:28 with context, cross-references, quiz, and FAQ.',
    url: `${SITE_URL}/romans-8-28`,
    type: 'article',
    images: ['/images/delightful_dolphin_55571_A_senior_person_in_silhouette_against__7cbab45f-3b0a-4356-9a4b-8d17e7adb0a5.png'],
  },
};

function loadRomans828Quiz() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'quizzes', 'romans-8-28.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const WORD_STUDY = [
  {
    phrase: '"And we know"',
    greek: 'oidamen (settled, certain knowledge)',
    explanation: 'Paul does not say "we hope" or "we guess" — he says "we know." The Greek oidamen conveys settled, confident assurance based on revealed truth. This is not wishful thinking; it is a conviction grounded in the character of God and confirmed by the indwelling Holy Spirit. Every believer can have this certainty.',
  },
  {
    phrase: '"that all things"',
    greek: 'panta (all, every kind)',
    explanation: '"All things" is breathtakingly comprehensive. It includes suffering, loss, persecution, sickness, betrayal, disappointment, and every trial a believer faces. Paul does not exclude anything. The "all" here encompasses not only good circumstances but the worst imaginable events — and insists that even these are under God\'s sovereign direction.',
  },
  {
    phrase: '"work together"',
    greek: 'synergei (work in concert, cooperate)',
    explanation: 'The Greek synergei means to work in combination, to cooperate toward a shared end. No single event in isolation tells the full story. Like individual ingredients in a recipe — some bitter, some sweet — God blends every circumstance together to produce a result that is good. This is divine providence at work.',
  },
  {
    phrase: '"for good"',
    greek: 'eis agathon (unto good, toward good)',
    explanation: '"Good" here is not defined by human comfort or earthly prosperity. Romans 8:29 defines it: to be "conformed to the image of his Son." The ultimate good God is working toward is Christlikeness. Everything God allows in the believer\'s life serves this supreme purpose — shaping us into the likeness of Jesus Christ.',
  },
  {
    phrase: '"to them that love God"',
    greek: 'tois agaposin ton theon',
    explanation: 'This is the crucial condition. The promise of Romans 8:28 is not for everyone indiscriminately — it is for "them that love God." This describes genuine believers whose love for God is the evidence of their faith. To love God is to trust Him, obey Him, and delight in His will even when circumstances are painful.',
  },
  {
    phrase: '"to them who are"',
    greek: 'tois ousin (the ones being)',
    explanation: 'Paul now restates the same group from God\'s perspective. Those who love God are not self-made saints — they are people whom God Himself has acted upon. The shift from "them that love God" to "the called" shows that our love for God is itself the fruit of His prior work in our hearts (1 John 4:19).',
  },
  {
    phrase: '"the called"',
    greek: 'kletois (called ones, summoned)',
    explanation: '"The called" refers to God\'s effectual calling — not merely hearing the gospel, but being inwardly drawn and enabled by the Holy Spirit to respond in faith. This calling is part of the golden chain of Romans 8:30: foreknew, predestinated, called, justified, glorified. God\'s call is powerful and purposeful.',
  },
  {
    phrase: '"according to his purpose"',
    greek: 'kata prothesin (according to a predetermined plan)',
    explanation: 'God does not improvise. The word prothesis means a plan set forth in advance. God\'s purpose for believers was established before the foundation of the world (Ephesians 1:4-5). Every event in the believer\'s life — joyful or agonizing — serves this eternal, unchanging purpose. Nothing is random; nothing is wasted.',
  },
];

const CROSS_REFERENCES = [
  { ref: 'Romans 8:29-30', text: 'For whom he did foreknow, he also did predestinate to be conformed to the image of his Son, that he might be the firstborn among many brethren. Moreover whom he did predestinate, them he also called: and whom he called, them he also justified: and whom he justified, them he also glorified.' },
  { ref: 'Romans 8:31', text: 'What shall we then say to these things? If God be for us, who can be against us?' },
  { ref: 'Romans 8:37-39', text: 'Nay, in all these things we are more than conquerors through him that loved us. For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.' },
  { ref: 'Genesis 50:20', text: 'But as for you, ye thought evil against me; but God meant it unto good, to bring to pass, as it is this day, to save much people alive.' },
  { ref: 'Jeremiah 29:11', text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.' },
];

const FAQ_ITEMS = [
  {
    question: 'What does Romans 8:28 mean?',
    answer: 'Romans 8:28 teaches that God sovereignly orchestrates every circumstance in a believer\'s life — including suffering, loss, and hardship — so that they ultimately produce a good result. The "good" is defined in verse 29: being conformed to the image of Christ. This is not a promise that everything will feel good or turn out the way we want, but that God\'s eternal purpose for His children will be accomplished through all things.',
  },
  {
    question: 'Does Romans 8:28 mean God causes suffering?',
    answer: 'Romans 8:28 does not say God causes all things — it says He works all things together for good. God is not the author of evil (James 1:13), but He is sovereign over it. He permits suffering in a fallen world and masterfully weaves even the darkest events into His redemptive plan. Joseph\'s words in Genesis 50:20 illustrate this perfectly: "ye thought evil against me; but God meant it unto good."',
  },
  {
    question: 'Who is Romans 8:28 for? Does it apply to everyone?',
    answer: 'The promise of Romans 8:28 is specifically for "them that love God, to them who are the called according to his purpose." It is addressed to genuine believers — those who have trusted Christ by faith. This is not a blanket promise for all humanity. However, it is a glorious assurance for every true Christian, regardless of their circumstances.',
  },
  {
    question: 'What does "all things" include in Romans 8:28?',
    answer: '"All things" is as comprehensive as it sounds. It includes persecution (Romans 8:35), tribulation, distress, famine, nakedness, peril, and the sword. It includes sickness, financial loss, broken relationships, and the death of loved ones. Nothing is excluded. The promise is not that each individual event is good, but that God works the totality of a believer\'s experiences together toward His good purpose.',
  },
  {
    question: 'How can I trust Romans 8:28 when I am suffering?',
    answer: 'Trust begins with understanding what the verse actually promises. It does not promise comfort, ease, or immediate answers. It promises that God is working — even now, even in your pain — toward an outcome that is ultimately good. Paul himself suffered immensely (2 Corinthians 11:23-28) and still wrote these words with conviction. The proof of God\'s commitment is Romans 8:32: He "spared not his own Son" — if He gave His greatest treasure for you, He will not abandon you now.',
  },
  {
    question: 'What does "called according to his purpose" mean?',
    answer: '"Called according to his purpose" means that believers are not saved by accident or by their own initiative. God called them — effectually, powerfully, personally — according to a plan He established before the world began. This calling is part of the "golden chain" of Romans 8:29-30: foreknew, predestinated, called, justified, glorified. Every link in the chain is God\'s work, guaranteeing that His purpose will be accomplished.',
  },
];

export default function Romans828Page() {
  const quizData = loadRomans828Quiz();

  // Build quiz object for the client component
  const quiz = quizData ? {
    ...quizData,
    difficulty: 'easy' as const,
    isBookQuiz: false,
    slug: 'romans-8-28',
    tags: ['romans 8:28', 'sovereignty', 'providence', 'all things work together'],
    totalQuestions: quizData.questions.length,
    estimatedTime: Math.ceil(quizData.questions.length * 0.5),
  } : null;

  // JSON-LD schemas
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Romans 8:28 Explained — All Things Work Together for Good',
    description: 'A complete word-by-word study of Romans 8:28 with context, cross-references, quiz, and FAQ.',
    url: `${SITE_URL}/romans-8-28`,
    author: { '@type': 'Organization', name: 'Bible Maximum' },
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: SITE_URL },
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/romans-8-28` },
    about: [
      { '@type': 'Thing', name: 'Romans 8:28' },
      { '@type': 'Thing', name: 'Epistle to the Romans' },
      { '@type': 'Thing', name: 'Providence of God' },
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
      { '@type': 'ListItem', position: 3, name: 'Romans', item: `${SITE_URL}/romans-chapters` },
      { '@type': 'ListItem', position: 4, name: 'Romans 8:28 Explained', item: `${SITE_URL}/romans-8-28` },
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
            <li><Link href="/romans-chapters" className="text-blue-600 hover:underline">Romans</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li className="text-primary-dark/70 font-medium">Romans 8:28</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-scripture dark:bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/delightful_dolphin_55571_A_senior_person_in_silhouette_against__7cbab45f-3b0a-4356-9a4b-8d17e7adb0a5.png"
            alt="Person in silhouette against a radiant sky symbolizing God's sovereign purpose"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-blue-300 text-sm font-bold uppercase tracking-widest mb-4">The Believer&apos;s Greatest Assurance</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-display leading-tight mb-8">
            Romans 8:28 Explained
          </h1>
          <blockquote className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8">
            <p className="text-xl md:text-2xl text-white leading-relaxed italic font-light">
              &ldquo;And we know that all things work together for good to them that love God, to them who are the called according to his purpose.&rdquo;
            </p>
            <cite className="block mt-4 text-blue-200 text-sm font-bold not-italic">— Romans 8:28 (KJV)</cite>
          </blockquote>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#quiz" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
              Take the Romans 8:28 Quiz
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
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">What Does Romans 8:28 Mean?</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-lg mb-4">
            Romans 8:28 is one of the most beloved and most misunderstood verses in all of Scripture. It declares that <strong>God sovereignly works every circumstance</strong> — good and bad, joyful and painful — <strong>together for the ultimate good</strong> of those who love Him. It is not a promise that life will be easy, but a guarantee that nothing in the believer&apos;s life is wasted or meaningless.
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
            Paul wrote these words in the context of Romans 8, which many scholars consider the greatest chapter in the Bible. It begins with <strong>no condemnation</strong> (v1), moves through the <strong>Spirit&apos;s indwelling work</strong> (v9-17), addresses <strong>suffering and glory</strong> (v18), and culminates in the unshakable truth that <strong>nothing can separate us from the love of God</strong> (v38-39). Below, we break down every phrase, explore the context, and test your understanding with a focused quiz.
          </p>
        </section>

        {/* Word-by-Word Study */}
        <section id="word-study" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Word-by-Word Study of Romans 8:28</h2>
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

        {/* Context Section: Romans 8 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Context: Romans 8 — The Pinnacle of Paul&apos;s Theology</h2>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              Romans 8 is widely regarded as the greatest single chapter in the entire Bible. It sits at the climax of Paul&apos;s argument in the book of Romans, where he has systematically laid out the problem of sin (chapters 1-3), the solution of justification by faith (chapters 3-5), and the believer&apos;s freedom from sin&apos;s power (chapters 6-7). Romans 8 answers the question: <strong>what is the believer&apos;s standing before God, and how secure is it?</strong>
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              The chapter opens with a thundering declaration: <strong>&ldquo;There is therefore now no condemnation to them which are in Christ Jesus&rdquo;</strong> (v1). No condemnation — not some, not most, but none. From there, Paul describes the Spirit&apos;s indwelling work in the believer&apos;s life (v9-17), the promise that present suffering cannot compare to coming glory (v18), and the entire creation groaning for redemption (v19-22).
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              Verse 28 is the turning point where Paul shifts from the reality of suffering to the certainty of God&apos;s purpose. It leads directly into the &ldquo;golden chain&rdquo; of redemption (v29-30) — foreknew, predestinated, called, justified, glorified — an unbreakable sequence of divine actions that guarantees every believer&apos;s final salvation.
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
              The chapter reaches its climax in verses 31-39, where Paul issues a series of triumphant rhetorical questions: &ldquo;If God be for us, who can be against us?&rdquo; (v31), &ldquo;Who shall separate us from the love of Christ?&rdquo; (v35), and concludes that absolutely nothing &ldquo;shall be able to separate us from the love of God, which is in Christ Jesus our Lord&rdquo; (v39).
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/characters/paul" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">P</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Study Paul</span>
              </Link>
              <Link href="/romans-8-quiz" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">Q</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Romans 8 Full Quiz</span>
              </Link>
              <Link href="/bible-chapter-summaries/romans/8" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">S</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Romans 8 Summary</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Cross-References */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Cross-References: Verses That Reinforce Romans 8:28</h2>
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
              <h2 className="text-2xl font-bold text-scripture dark:text-white font-display">Romans 8:28 Quiz</h2>
              <p className="text-primary-dark/60 dark:text-primary-dark/40 mt-2 text-sm">15 questions on God&apos;s sovereign promise and the glorious context of Romans 8</p>
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
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">God Is Working for Your Good</h2>
            <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-6">
              Romans 8:28 is not just a comforting idea — it is a promise rooted in the finished work of Christ. If God spared not His own Son, but delivered Him up for us all, how shall He not with Him also freely give us all things? If you want to know this God who works all things for good, start here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/topics/salvation" className="inline-flex items-center justify-center bg-white text-scripture font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors text-sm uppercase tracking-wider">
                How to Be Saved
              </Link>
              <Link href="/topics/gods-love" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
                Discover God&apos;s Love
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Frequently Asked Questions About Romans 8:28</h2>
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
            <Link href="/romans-8-quiz" className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">60 Questions, 4 Difficulty Levels</p>
              <h3 className="text-xl font-bold mb-1">Complete Romans Chapter 8 Quiz</h3>
              <p className="text-blue-100 text-sm">Test everything from no condemnation to more than conquerors.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Quiz &rarr;</span>
            </Link>
            <Link href="/romans-quiz" className="bg-scripture hover:bg-scripture/90 rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">25 Questions Covering All 16 Chapters</p>
              <h3 className="text-xl font-bold mb-1">Complete Book of Romans Quiz</h3>
              <p className="text-blue-100 text-sm">From justification by faith to the mercies of God.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Quiz &rarr;</span>
            </Link>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="bg-primary-light/30 dark:bg-dark-surface/30 border border-grace dark:border-dark-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-4">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/romans-8-quiz" className="text-blue-600 hover:underline text-sm">Romans Chapter 8 Quiz</Link>
            <Link href="/romans-chapters" className="text-blue-600 hover:underline text-sm">All Romans Chapter Quizzes</Link>
            <Link href="/romans-quiz" className="text-blue-600 hover:underline text-sm">Complete Book of Romans Quiz</Link>
            <Link href="/topics/salvation" className="text-blue-600 hover:underline text-sm">Bible Verses About Salvation</Link>
            <Link href="/topics/gods-love" className="text-blue-600 hover:underline text-sm">Bible Verses About God&apos;s Love</Link>
            <Link href="/topics/suffering" className="text-blue-600 hover:underline text-sm">Bible Verses About Suffering</Link>
            <Link href="/topics/sovereignty-of-god" className="text-blue-600 hover:underline text-sm">Bible Verses About God&apos;s Sovereignty</Link>
            <Link href="/characters/paul" className="text-blue-600 hover:underline text-sm">Paul the Apostle Study</Link>
            <Link href="/characters/joseph" className="text-blue-600 hover:underline text-sm">Joseph Character Study</Link>
            <Link href="/bible-chapter-summaries/romans/8" className="text-blue-600 hover:underline text-sm">Romans Chapter 8 Summary</Link>
            <Link href="/bible-geography/romans/8" className="text-blue-600 hover:underline text-sm">Romans 8 Places &amp; Map</Link>
            <Link href="/john-3-16" className="text-blue-600 hover:underline text-sm">John 3:16 Explained</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
