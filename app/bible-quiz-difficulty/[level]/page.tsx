import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BIBLE_BOOKS } from '@/lib/bible-data';

type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'theological';

interface LevelConfig {
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  questionBreakdown: string;
  color: string;
  accentColor: string;
  textColor: string;
  bgColor: string;
  badgeColor: string;
  tips: { title: string; text: string }[];
}

const LEVEL_CONFIG: Record<DifficultyLevel, LevelConfig> = {
  easy: {
    title: 'Easy Bible Quizzes',
    metaTitle: 'Easy Bible Quizzes | Beginner-Friendly Questions for Kids, New Christians & Sunday School | Bible Maximum',
    metaDescription: 'Easy Bible quizzes perfect for beginners, children, and Sunday school classes. 70% multiple choice, 20% true/false, 10% fill-in-the-blank questions covering all 66 books of the Bible with verse references and clear explanations.',
    heroDescription: 'Beginner-friendly Bible quizzes designed for kids, new Christians, and Sunday school classes. Each quiz features 15 straightforward questions drawn directly from Scripture with clear verse references and easy-to-understand explanations.',
    questionBreakdown: '70% multiple choice, 20% true/false, 10% fill-in-the-blank',
    color: 'from-green-500 to-green-600',
    accentColor: 'text-green-600',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    badgeColor: 'bg-green-100 text-green-700',
    tips: [
      { title: 'Read the chapter first', text: 'Before taking the quiz, read through the Bible chapter once. Easy questions test basic comprehension, so a single reading is usually enough.' },
      { title: 'Focus on key facts', text: 'Pay attention to who, what, where, and when. Easy questions typically ask about the main characters, events, and locations in each chapter.' },
      { title: 'Use the explanations', text: 'After submitting, review every explanation carefully. Each one includes a verse reference so you can look up the passage and deepen your understanding.' },
      { title: 'Try fill-in-the-blank last', text: 'If you get stuck on a fill-in-the-blank question, skip it and come back. The multiple choice and true/false questions may remind you of the answer.' },
    ],
  },
  medium: {
    title: 'Medium Bible Quizzes',
    metaTitle: 'Medium Bible Quizzes | Intermediate Questions on Application, Context & Christian Living | Bible Maximum',
    metaDescription: 'Medium difficulty Bible quizzes for regular Bible readers. Deeper questions about application, context, faith, obedience, prayer, and Christian living. 80% multiple choice, 15% true/false, 5% fill-in-the-blank across all 66 books.',
    heroDescription: 'Intermediate Bible quizzes for regular Scripture readers and small group study. Questions go beyond basic facts to explore application, context, and connections to Christian living including faith, obedience, prayer, and evangelism.',
    questionBreakdown: '80% multiple choice, 15% true/false, 5% fill-in-the-blank',
    color: 'from-amber-500 to-amber-600',
    accentColor: 'text-amber-600',
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
    badgeColor: 'bg-amber-100 text-amber-700',
    tips: [
      { title: 'Think about application', text: 'Medium questions often ask how a passage applies to daily life. Consider what each chapter teaches about faith, obedience, prayer, and relationships.' },
      { title: 'Notice the context', text: 'Pay attention to the historical and literary context of each chapter. Who is speaking? To whom? Why? This background helps answer application questions.' },
      { title: 'Connect to other passages', text: 'Some medium questions reference themes that appear throughout the Bible. Think about parallel passages and recurring themes as you answer.' },
      { title: 'Study with a group', text: 'Medium quizzes work well for small group discussion. Take the quiz together and discuss the explanations to gain different perspectives on application.' },
    ],
  },
  hard: {
    title: 'Hard Bible Quizzes',
    metaTitle: 'Hard Bible Quizzes | Advanced Questions on Specific Verses, People, Places & Events | Bible Maximum',
    metaDescription: 'Hard Bible quizzes that challenge serious students with detailed questions about specific verses, people, places, and events. 90% multiple choice, 10% true/false. Ideal for Bible bowl preparation and advanced study across all 66 books.',
    heroDescription: 'Advanced Bible quizzes that test detailed knowledge of specific verses, people, places, numbers, and events. Designed for serious Bible students, Bible bowl competitors, and anyone who wants to master the fine details of Scripture.',
    questionBreakdown: '90% multiple choice, 10% true/false',
    color: 'from-red-500 to-red-600',
    accentColor: 'text-red-600',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    badgeColor: 'bg-red-100 text-red-700',
    tips: [
      { title: 'Study specific details', text: 'Hard questions focus on precise details: exact names, numbers, locations, and sequences. Read carefully and note details that are easy to overlook.' },
      { title: 'Know the genealogies and lists', text: 'Many hard questions come from genealogies, census numbers, measurements, and lists of names. These sections are goldmines for challenging questions.' },
      { title: 'Pay attention to dialogue', text: 'Exact quotes and who said what to whom are common in hard quizzes. Note the specific words used in conversations and speeches.' },
      { title: 'Review multiple times', text: 'Hard quizzes often require multiple readings of a chapter. Consider reading the passage three times: once for overview, once for details, and once for connections.' },
    ],
  },
  theological: {
    title: 'Theological Bible Quizzes',
    metaTitle: 'Theological Bible Quizzes | Advanced Doctrine, Hebrew & Greek Studies, Cross-References | Bible Maximum',
    metaDescription: 'Theological Bible quizzes featuring advanced doctrine, Hebrew and Greek word studies, cross-reference analysis, and systematic theology questions. 100% multiple choice for all 66 books. Designed for seminary students, pastors, and scholars.',
    heroDescription: 'Expert-level Bible quizzes exploring doctrine, systematic theology, Hebrew and Greek word studies, typology, and cross-reference analysis. Built for seminary students, pastors, scholars, and anyone seeking the deepest understanding of Scripture.',
    questionBreakdown: '100% multiple choice',
    color: 'from-purple-500 to-purple-600',
    accentColor: 'text-purple-600',
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
    badgeColor: 'bg-purple-100 text-purple-700',
    tips: [
      { title: 'Study original languages', text: 'Theological questions often reference Hebrew and Greek terms. Familiarize yourself with key words in the original languages and how they shape the meaning of passages.' },
      { title: 'Know systematic theology', text: 'Questions may ask about doctrines like soteriology, Christology, eschatology, and pneumatology. Understanding theological frameworks helps you connect individual passages to larger themes.' },
      { title: 'Trace cross-references', text: 'Theological questions frequently involve connections between Old and New Testament passages. Use cross-reference tools to trace how themes and prophecies develop across Scripture.' },
      { title: 'Understand typology', text: 'Many theological questions explore how Old Testament events, people, and institutions foreshadow New Testament realities. Look for types and antitypes as you study.' },
    ],
  },
};

const VALID_LEVELS: DifficultyLevel[] = ['easy', 'medium', 'hard', 'theological'];

function isValidLevel(level: string): level is DifficultyLevel {
  return VALID_LEVELS.includes(level as DifficultyLevel);
}

export function generateStaticParams() {
  return [
    { level: 'easy' },
    { level: 'medium' },
    { level: 'hard' },
    { level: 'theological' },
  ];
}

export async function generateMetadata({ params }: { params: { level: string } }): Promise<Metadata> {
  const { level } = params;
  if (!isValidLevel(level)) return {};

  const config = LEVEL_CONFIG[level];
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: [
      `${level} bible quiz`, `${level} bible questions`, `bible quiz ${level} level`,
      'bible quiz difficulty', 'bible trivia', 'scripture quiz', 'bible study quiz',
    ],
    openGraph: {
      title: config.title + ' | Bible Maximum',
      description: config.metaDescription,
      type: 'website',
      url: `/bible-quiz-difficulty/${level}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title + ' | Bible Maximum',
      description: config.metaDescription,
    },
    alternates: { canonical: `/bible-quiz-difficulty/${level}` },
  };
}

function BookCard({ name, slug, chapters, testament, levelConfig }: {
  name: string;
  slug: string;
  chapters: number;
  testament: string;
  levelConfig: LevelConfig;
}) {
  return (
    <Link
      href={`/${slug}-1-quiz`}
      className="group bg-white rounded-xl border border-grace hover:border-sacred/60 hover:shadow-md transition-all p-4"
    >
      <h3 className="font-display font-bold text-scripture group-hover:text-blue-700 transition-colors text-sm sm:text-base">
        {name}
      </h3>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-primary-dark/60">
          {chapters} {chapters === 1 ? 'chapter' : 'chapters'}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${testament === 'old' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>
          {testament === 'old' ? 'OT' : 'NT'}
        </span>
      </div>
      <span className="block text-blue-600 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        Start Quiz &rarr;
      </span>
    </Link>
  );
}

export default function BibleQuizDifficultyLevelPage({ params }: { params: { level: string } }) {
  const { level } = params;
  if (!isValidLevel(level)) notFound();

  const config = LEVEL_CONFIG[level];
  const otBooks = BIBLE_BOOKS.filter((b) => b.testament === 'old');
  const ntBooks = BIBLE_BOOKS.filter((b) => b.testament === 'new');
  const totalChapters = BIBLE_BOOKS.reduce((sum, b) => sum + b.chapters, 0);

  const levelLabel = level.charAt(0).toUpperCase() + level.slice(1);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Quiz Difficulty', item: 'https://biblemaximum.com/bible-quiz-difficulty' },
      { '@type': 'ListItem', position: 3, name: `${levelLabel} Quizzes`, item: `https://biblemaximum.com/bible-quiz-difficulty/${level}` },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: config.title,
    description: config.metaDescription,
    url: `https://biblemaximum.com/bible-quiz-difficulty/${level}`,
    datePublished: '2025-02-01',
    dateModified: '2026-02-23',
    publisher: {
      '@type': 'Organization',
      name: 'Bible Maximum',
      logo: { '@type': 'ImageObject', url: 'https://biblemaximum.com/images/logo.png' },
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: 66,
      itemListElement: BIBLE_BOOKS.map((book, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${book.name} - ${levelLabel} Quiz`,
        url: `https://biblemaximum.com/${book.slug}-1-quiz`,
      })),
    },
    breadcrumb: breadcrumbSchema,
  };

  return (
    <div className="min-h-screen bg-primary-light/30">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-grace">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li aria-hidden="true" className="text-primary-dark/40">/</li>
            <li><Link href="/bible-quiz-difficulty" className="text-blue-600 hover:underline">Quiz Difficulty</Link></li>
            <li aria-hidden="true" className="text-primary-dark/40">/</li>
            <li aria-current="page" className="text-primary-dark/70">{levelLabel}</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mb-8">
          <div className={`relative h-48 md:h-56 bg-gradient-to-r ${config.color}`}>
            <Image
              src="/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png"
              alt={config.title}
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                {config.title}
              </h1>
              <p className="text-white/90 max-w-2xl text-sm md:text-base">
                {config.heroDescription}
              </p>
              <Link
                href="/genesis-1-quiz"
                className="inline-flex items-center px-6 py-3 bg-white text-green-700 font-bold rounded-lg hover:bg-green-50 transition-colors shadow-md w-fit mt-4"
              >
                Start with Genesis Chapter 1
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 divide-x divide-grace border-b border-grace">
            <div className="p-4 text-center">
              <p className={`text-2xl font-bold ${config.accentColor}`}>66</p>
              <p className="text-sm text-primary-dark/70">Bible Books</p>
            </div>
            <div className="p-4 text-center">
              <p className={`text-2xl font-bold ${config.accentColor}`}>{totalChapters.toLocaleString()}</p>
              <p className="text-sm text-primary-dark/70">Chapter Quizzes</p>
            </div>
            <div className="p-4 text-center">
              <p className={`text-2xl font-bold ${config.accentColor}`}>15</p>
              <p className="text-sm text-primary-dark/70">Questions per Quiz</p>
            </div>
          </div>
        </div>

        {/* Question Format */}
        <div className={`${config.bgColor} border ${config.textColor === 'text-green-700' ? 'border-green-200' : config.textColor === 'text-amber-700' ? 'border-amber-200' : config.textColor === 'text-red-700' ? 'border-red-200' : 'border-purple-200'} rounded-xl p-5 mb-8`}>
          <p className={`font-display font-bold ${config.textColor} mb-1`}>Question Format</p>
          <p className="text-primary-dark/70 text-sm">{config.questionBreakdown}</p>
        </div>

        {/* Motivational Banner */}
        <div className="bg-white border-2 border-green-200 rounded-xl p-4 mb-6 text-center">
          <p className="text-scripture font-display font-bold">Choose any book to begin. Each quiz has 15 questions with instant scoring.</p>
        </div>

        {/* Old Testament Books */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-display font-bold text-scripture">Old Testament</h2>
              <span className="text-sm text-primary-dark/50">39 books</span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {otBooks.map((book) => (
              <BookCard
                key={book.slug}
                name={book.name}
                slug={book.slug}
                chapters={book.chapters}
                testament={book.testament}
                levelConfig={config}
              />
            ))}
          </div>
        </section>

        {/* New Testament Books */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-display font-bold text-scripture">New Testament</h2>
              <span className="text-sm text-primary-dark/50">27 books</span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {ntBooks.map((book) => (
              <BookCard
                key={book.slug}
                name={book.name}
                slug={book.slug}
                chapters={book.chapters}
                testament={book.testament}
                levelConfig={config}
              />
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-10 bg-white rounded-xl shadow-sm border border-grace p-6 md:p-8">
          <h2 className="text-2xl font-display font-bold text-scripture mb-6">
            Tips for {levelLabel} Bible Quizzes
          </h2>
          <div className="space-y-5">
            {config.tips.map((tip, i) => (
              <div key={i} className="flex gap-4">
                <div className={`flex-shrink-0 w-8 h-8 ${config.bgColor} rounded-full flex items-center justify-center`}>
                  <span className={`${config.textColor} font-bold text-sm`}>{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-scripture">{tip.title}</h3>
                  <p className="text-primary-dark/70 text-sm mt-1 leading-relaxed">{tip.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="bg-white rounded-xl shadow-sm border border-grace p-6">
          <h2 className="text-xl font-bold text-scripture mb-4">Explore More</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/bible-quiz-difficulty" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">All Difficulty Levels</span>
            </Link>
            {VALID_LEVELS.filter((l) => l !== level).map((l) => (
              <Link key={l} href={`/bible-quiz-difficulty/${l}`} className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
                <span className="text-blue-600 font-medium text-sm">{l.charAt(0).toUpperCase() + l.slice(1)} Quizzes</span>
              </Link>
            ))}
            <Link href="/bible-quizzes" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">All Bible Quizzes</span>
            </Link>
            <Link href="/old-testament-quizzes" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">Old Testament Quizzes</span>
            </Link>
            <Link href="/new-testament-quizzes" className="flex items-center p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-colors">
              <span className="text-blue-600 font-medium text-sm">New Testament Quizzes</span>
            </Link>
          </div>
        </section>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />
      </main>
    </div>
  );
}
