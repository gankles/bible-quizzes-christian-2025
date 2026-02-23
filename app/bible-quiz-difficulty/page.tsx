import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Bible Quiz by Difficulty Level | Easy, Medium, Hard & Theological Bible Quizzes for All Ages | Bible Maximum',
  description: 'Choose your Bible quiz difficulty level. From easy beginner-friendly questions for kids and new Christians, to medium application questions, hard detail-oriented challenges, and advanced theological studies with Hebrew and Greek word analysis. 60 questions per chapter across 1,189 chapters.',
  keywords: [
    'bible quiz difficulty', 'easy bible quiz', 'hard bible quiz', 'bible quiz for kids',
    'bible quiz for beginners', 'advanced bible quiz', 'theological bible quiz',
    'bible trivia difficulty levels', 'bible quiz medium', 'bible study quiz',
  ],
  openGraph: {
    title: 'Bible Quiz by Difficulty Level | Easy, Medium, Hard & Theological | Bible Maximum',
    description: 'Choose your Bible quiz difficulty. From beginner-friendly to advanced theological studies across all 66 books.',
    type: 'website',
    url: '/bible-quiz-difficulty',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bible Quiz by Difficulty Level | Bible Maximum',
    description: 'Choose your Bible quiz difficulty. From beginner-friendly to advanced theological studies across all 66 books.',
  },
  alternates: { canonical: '/bible-quiz-difficulty' },
};

const DIFFICULTY_LEVELS = [
  {
    level: 'easy',
    title: 'Easy Bible Quizzes',
    subtitle: 'Beginner Friendly',
    description: 'Perfect for beginners and children. 70% multiple choice, 20% true/false, 10% fill-in-the-blank. Great for Sunday school, family devotions, and anyone starting their Bible journey.',
    challenge: 'Most beginners score 12/15 — can you beat the average?',
    color: 'from-green-500 to-green-600',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    audience: 'Kids, New Christians, Sunday School',
  },
  {
    level: 'medium',
    title: 'Medium Bible Quizzes',
    subtitle: 'Intermediate',
    description: 'For regular Bible readers. Deeper questions about application and context. Covers faith, obedience, prayer, evangelism, and Christian living with 80% multiple choice, 15% true/false, 5% fill-in-the-blank.',
    challenge: 'Only 40% of quiz takers pass on the first try',
    color: 'from-amber-500 to-amber-600',
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    audience: 'Regular Bible Readers, Small Groups',
  },
  {
    level: 'hard',
    title: 'Hard Bible Quizzes',
    subtitle: 'Advanced',
    description: 'Challenge yourself with detailed questions about specific verses, people, and events. 90% multiple choice, 10% true/false. Requires strong familiarity with Scripture passages.',
    challenge: 'Think you know the Bible? This will test your limits.',
    color: 'from-red-500 to-red-600',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    audience: 'Serious Students, Bible Bowl Prep',
  },
  {
    level: 'theological',
    title: 'Theological Bible Quizzes',
    subtitle: 'Expert Level',
    description: 'Advanced doctrine, Hebrew/Greek word studies, and cross-reference analysis. 100% multiple choice with in-depth explanations. For seminary students, pastors, and scholars.',
    challenge: 'For serious students of the Word',
    color: 'from-purple-500 to-purple-600',
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    audience: 'Seminary, Pastors, Scholars',
  },
];

export default function BibleQuizDifficultyPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What difficulty should I start with?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If you are new to Bible study or quizzing with children, start with Easy level. Easy quizzes focus on straightforward facts from the text with 70% multiple choice, 20% true/false, and 10% fill-in-the-blank questions. As you build confidence, progress to Medium for application-based questions, then Hard for detailed verse-specific challenges, and finally Theological for doctrine and original language analysis.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many questions are in each quiz?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each chapter quiz contains 60 questions total, divided equally across four difficulty levels: 15 Easy questions, 15 Medium questions, 15 Hard questions, and 15 Theological questions. This provides comprehensive coverage of every chapter in the Bible at every skill level.',
        },
      },
      {
        '@type': 'Question',
        name: 'What question types are used at each difficulty level?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Easy: 70% multiple choice, 20% true/false, 10% fill-in-the-blank. Medium: 80% multiple choice, 15% true/false, 5% fill-in-the-blank. Hard: 90% multiple choice, 10% true/false. Theological: 100% multiple choice. Higher difficulty levels use more multiple choice to handle the complexity of the questions and answer options.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I switch difficulty levels during a quiz?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Each chapter quiz page features tabs for all four difficulty levels. You can switch between Easy, Medium, Hard, and Theological at any time to find the challenge level that suits you best.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bible Quiz Difficulty', item: 'https://biblemaximum.com/bible-quiz-difficulty' },
    ],
  };

  return (
    <div className="min-h-screen bg-primary-light/30">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-grace">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li aria-hidden="true" className="text-primary-dark/40">/</li>
            <li aria-current="page" className="text-primary-dark/70">Bible Quiz Difficulty</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mb-8">
          <div className="relative h-48 md:h-56 bg-gradient-to-r from-green-600 to-green-700">
            <Image
              src="/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png"
              alt="Bible Quizzes by Difficulty Level"
              fill
              className="object-cover opacity-25"
              priority
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                Bible Quizzes by Difficulty Level
              </h1>
              <p className="text-green-100 max-w-2xl">
                Choose the right challenge for your Bible knowledge. From beginner-friendly questions to advanced theological analysis, find your level and grow in Scripture.
              </p>
              <Link
                href="/bible-quiz-difficulty/easy"
                className="inline-flex items-center px-6 py-3 bg-white text-green-700 font-bold rounded-lg hover:bg-green-50 transition-colors shadow-md w-fit mt-4"
              >
                Start with Easy — Recommended for Beginners
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 divide-x divide-grace border-b border-grace">
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">4</p>
              <p className="text-sm text-primary-dark/70">Difficulty Levels</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">60</p>
              <p className="text-sm text-primary-dark/70">Questions per Chapter</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">1,189</p>
              <p className="text-sm text-primary-dark/70">Chapters Covered</p>
            </div>
          </div>
        </div>

        {/* Difficulty Level Cards */}
        <section className="mb-10">
          <h2 className="text-2xl font-display font-bold text-scripture mb-6">Choose Your Difficulty Level</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {DIFFICULTY_LEVELS.map((d) => (
              <Link
                key={d.level}
                href={`/bible-quiz-difficulty/${d.level}`}
                className={`group bg-white rounded-xl border ${d.borderColor} hover:shadow-md transition-all overflow-hidden`}
              >
                <div className={`bg-gradient-to-r ${d.color} px-6 py-4`}>
                  <h3 className="text-xl font-display font-bold text-white">{d.title}</h3>
                  <p className="text-white/80 text-sm">{d.subtitle}</p>
                </div>
                <div className="p-5">
                  <p className="text-primary-dark/70 text-sm leading-relaxed mb-3">{d.description}</p>
                  <p className="text-xs mt-2 opacity-80">{d.challenge}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className={`text-xs font-medium ${d.textColor} ${d.bgColor} px-2 py-1 rounded-full`}>
                      {d.audience}
                    </span>
                    <span className="text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Browse Quizzes &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-10 bg-white rounded-xl shadow-sm border border-grace p-6 md:p-8">
          <h2 className="text-2xl font-display font-bold text-scripture mb-6">How Bible Quiz Difficulty Works</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-700 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-scripture">Pick a Difficulty Level</h3>
                <p className="text-primary-dark/70 text-sm mt-1">Choose from Easy, Medium, Hard, or Theological based on your experience and goals.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-700 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-scripture">Select a Bible Book</h3>
                <p className="text-primary-dark/70 text-sm mt-1">Browse all 66 books of the Bible and choose the one you want to study.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-700 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-scripture">Answer 15 Questions</h3>
                <p className="text-primary-dark/70 text-sm mt-1">Each difficulty tab has 15 carefully crafted questions with verse references and explanations.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-700 font-bold text-sm">4</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-scripture">Learn and Progress</h3>
                <p className="text-primary-dark/70 text-sm mt-1">Review explanations for every answer and move up in difficulty as you grow in knowledge.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10 bg-white rounded-xl shadow-sm border border-grace p-6 md:p-8">
          <h2 className="text-2xl font-display font-bold text-scripture mb-6">
            Frequently Asked Questions About Bible Quiz Difficulty
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-scripture mb-2">What difficulty should I start with?</h3>
              <p className="text-primary-dark/70 leading-relaxed">
                If you are new to Bible study or quizzing with children, start with <Link href="/bible-quiz-difficulty/easy" className="text-blue-600 hover:underline">Easy level</Link>. Easy quizzes focus on straightforward facts from the text with 70% multiple choice, 20% true/false, and 10% fill-in-the-blank questions. As you build confidence, progress to <Link href="/bible-quiz-difficulty/medium" className="text-blue-600 hover:underline">Medium</Link> for application-based questions, then <Link href="/bible-quiz-difficulty/hard" className="text-blue-600 hover:underline">Hard</Link> for detailed verse-specific challenges, and finally <Link href="/bible-quiz-difficulty/theological" className="text-blue-600 hover:underline">Theological</Link> for doctrine and original language analysis.
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold text-scripture mb-2">How many questions are in each quiz?</h3>
              <p className="text-primary-dark/70 leading-relaxed">
                Each chapter quiz contains 60 questions total, divided equally across four difficulty levels: 15 Easy questions, 15 Medium questions, 15 Hard questions, and 15 Theological questions. This provides comprehensive coverage of every chapter in the Bible at every skill level.
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold text-scripture mb-2">What question types are used at each difficulty level?</h3>
              <p className="text-primary-dark/70 leading-relaxed">
                Easy: 70% multiple choice, 20% true/false, 10% fill-in-the-blank. Medium: 80% multiple choice, 15% true/false, 5% fill-in-the-blank. Hard: 90% multiple choice, 10% true/false. Theological: 100% multiple choice. Higher difficulty levels use more multiple choice to handle the complexity of the questions and answer options.
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold text-scripture mb-2">Can I switch difficulty levels during a quiz?</h3>
              <p className="text-primary-dark/70 leading-relaxed">
                Yes. Each chapter quiz page features tabs for all four difficulty levels. You can switch between Easy, Medium, Hard, and Theological at any time to find the challenge level that suits you best.
              </p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="bg-white rounded-xl shadow-sm border border-grace p-6">
          <h2 className="text-xl font-bold text-scripture mb-4">More Bible Quiz Resources</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/bible-quizzes" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">All Bible Quizzes</span>
            </Link>
            <Link href="/old-testament-quizzes" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Old Testament Quizzes</span>
            </Link>
            <Link href="/new-testament-quizzes" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">New Testament Quizzes</span>
            </Link>
            <Link href="/books-of-the-bible" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Books of the Bible</span>
            </Link>
            <Link href="/bible-chapter-summaries" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Bible Chapter Summaries</span>
            </Link>
            <Link href="/bible-study-guides" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Bible Study Guides</span>
            </Link>
          </div>
        </section>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </main>
    </div>
  );
}
