import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Bible Trivia Questions and Answers | 500+ Free Bible Trivia for Kids, Adults & Groups with Old Testament & New Testament Questions | Bible Maximum',
  description:
    'Explore 500+ free Bible trivia questions and answers covering the Old Testament and New Testament. Categories include easy Bible trivia for kids, hard Bible trivia for adults, and themed rounds for family game night, Sunday school, small groups, and personal study. Test your biblical knowledge today!',
  keywords: [
    'Bible trivia',
    'Bible trivia questions and answers',
    'Bible trivia for kids',
    'Bible trivia for adults',
    'easy Bible trivia',
    'hard Bible trivia',
    'Bible trivia questions',
    'free Bible trivia',
    'Old Testament trivia',
    'New Testament trivia',
    'Bible quiz questions',
    'Sunday school trivia',
    'Bible game night',
    'Christian trivia',
    'Bible knowledge quiz',
    'Bible trivia for small groups',
    'Bible trivia for families',
  ],
  openGraph: {
    title: 'Bible Trivia Questions and Answers | 500+ Free Questions',
    description:
      '500+ free Bible trivia questions and answers for kids, adults, and groups. Old Testament, New Testament, easy, and hard categories.',
    url: '/bible-trivia',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bible Trivia Questions and Answers | 500+ Free Questions',
    description:
      '500+ free Bible trivia questions and answers for kids, adults, and groups.',
  },
  alternates: {
    canonical: '/bible-trivia',
  },
};

// ---------------------------------------------------------------------------
// Sample Trivia Q&A Data
// ---------------------------------------------------------------------------

interface TriviaQuestion {
  question: string;
  answer: string;
  reference: string;
  referenceUrl: string;
}

const SAMPLE_QUESTIONS: TriviaQuestion[] = [
  {
    question: 'Who built the ark?',
    answer: 'Noah',
    reference: 'Genesis 6:14',
    referenceUrl: '/verses/genesis/6/14',
  },
  {
    question: 'How many days did God take to create the world?',
    answer: 'Six days, resting on the seventh',
    reference: 'Genesis 2:2',
    referenceUrl: '/verses/genesis/2/2',
  },
  {
    question: 'Who was the first king of Israel?',
    answer: 'Saul',
    reference: '1 Samuel 10:1',
    referenceUrl: '/verses/1-samuel/10/1',
  },
  {
    question: 'What are the four Gospels?',
    answer: 'Matthew, Mark, Luke, and John',
    reference: 'New Testament',
    referenceUrl: '/new-testament-quizzes',
  },
  {
    question: 'Who killed Goliath?',
    answer: 'David',
    reference: '1 Samuel 17:50',
    referenceUrl: '/verses/1-samuel/17/50',
  },
  {
    question: 'What is the shortest verse in the Bible?',
    answer: 'Jesus wept',
    reference: 'John 11:35',
    referenceUrl: '/verses/john/11/35',
  },
  {
    question: 'How many books are in the Bible?',
    answer: '66 (39 OT + 27 NT)',
    reference: 'Books of the Bible',
    referenceUrl: '/books-of-the-bible',
  },
  {
    question: 'Who was swallowed by a great fish?',
    answer: 'Jonah',
    reference: 'Jonah 1:17',
    referenceUrl: '/verses/jonah/1/17',
  },
  {
    question: 'What are the Ten Commandments found in?',
    answer: 'Exodus 20 and Deuteronomy 5',
    reference: 'Exodus 20',
    referenceUrl: '/verses/exodus/20/1',
  },
  {
    question: 'Who denied Jesus three times?',
    answer: 'Peter',
    reference: 'Matthew 26:75',
    referenceUrl: '/verses/matthew/26/75',
  },
];

// ---------------------------------------------------------------------------
// Quiz Category Data
// ---------------------------------------------------------------------------

interface QuizCategory {
  title: string;
  description: string;
  href: string;
  count: string;
}

const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    title: 'Old Testament Quizzes',
    description: 'Questions from Genesis through Malachi covering patriarchs, prophets, and the history of Israel.',
    href: '/old-testament-quizzes',
    count: '39 Books',
  },
  {
    title: 'New Testament Quizzes',
    description: 'Questions from the Gospels, Acts, Epistles, and Revelation about the life and teachings of Jesus.',
    href: '/new-testament-quizzes',
    count: '27 Books',
  },
  {
    title: 'Bible Book Quizzes',
    description: 'Comprehensive quizzes for every book of the Bible with chapter-by-chapter coverage.',
    href: '/bible-quizzes',
    count: '66 Books',
  },
  {
    title: 'Genesis Quiz',
    description: 'Creation, the Fall, the Flood, Abraham, Isaac, Jacob, and Joseph.',
    href: '/genesis-chapters',
    count: '50 Chapters',
  },
  {
    title: 'Psalms Quiz',
    description: 'Worship, praise, lament, and wisdom from the songbook of Israel.',
    href: '/psalms-chapters',
    count: '150 Chapters',
  },
  {
    title: 'Matthew Quiz',
    description: 'The life, ministry, death, and resurrection of Jesus Christ.',
    href: '/matthew-chapters',
    count: '28 Chapters',
  },
  {
    title: 'John Quiz',
    description: 'The deity of Christ, the seven signs, and the farewell discourses.',
    href: '/john-chapters',
    count: '21 Chapters',
  },
  {
    title: 'Revelation Quiz',
    description: 'Prophecy, the letters to the churches, and the new heaven and new earth.',
    href: '/revelation-chapters',
    count: '22 Chapters',
  },
];

// ---------------------------------------------------------------------------
// FAQ Data
// ---------------------------------------------------------------------------

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  {
    question: 'Where can I find free Bible trivia questions?',
    answer:
      'Bible Maximum offers over 500 free Bible trivia questions and answers organized by book, testament, and difficulty level. Every question includes a Scripture reference so you can verify the answer and study the passage in context. Our quizzes cover all 66 books of the Bible from Genesis to Revelation, with categories for easy, medium, hard, and theological questions. You can start with any book or testament and play as many rounds as you like -- everything is completely free with no account required.',
  },
  {
    question: 'What are good Bible trivia questions for kids?',
    answer:
      'Good Bible trivia questions for kids focus on well-known stories and characters: "Who built the ark?" (Noah), "Who defeated Goliath?" (David), "How many disciples did Jesus have?" (twelve), and "What is the first book of the Bible?" (Genesis). Keep questions short, use multiple-choice format when possible, and choose stories kids are already familiar with from Sunday school. Our easy-level quizzes are designed with younger audiences in mind, using clear language and familiar Bible narratives.',
  },
  {
    question: 'How many questions are in a typical Bible trivia game?',
    answer:
      'A typical Bible trivia game ranges from 10 to 25 questions per round. For a quick warm-up or icebreaker, 10 questions works well. A standard Sunday school or small group trivia round usually has 15 to 20 questions. For a full game night or competition, you might play multiple rounds of 15 questions each across different categories (Old Testament, New Testament, easy, hard). Bible Maximum chapter quizzes contain 15 questions each, and our comprehensive book quizzes contain 25 questions, so you can mix and match to fit your group.',
  },
];

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function BibleTriviaPage() {
  // --- Structured Data ---

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bible Trivia' },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Trivia Questions and Answers',
    description: metadata.description,
    url: 'https://biblemaximum.com/bible-trivia',
    numberOfItems: 500,
    publisher: {
      '@type': 'Organization',
      name: 'Bible Maximum',
      url: 'https://biblemaximum.com',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={collectionSchema} />
      <StructuredData data={faqSchema} />

      <Breadcrumb items={[{ label: 'Bible Trivia' }]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* ---------------------------------------------------------------- */}
        {/* Hero Section */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mt-6 mb-8">
              <div className="relative h-48 md:h-56 bg-gradient-to-r from-purple-600 to-purple-700">
                <Image
                  src="/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png"
                  alt="Bible Trivia Questions and Answers"
                  fill
                  className="object-cover opacity-20"
                  priority
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                    Bible Trivia Questions &amp; Answers
                  </h1>
                  <p className="text-purple-100 max-w-2xl">
                    500+ free Bible trivia questions covering the Old Testament, New
                    Testament, and every book from Genesis to Revelation. Perfect for
                    family game night, Sunday school, small groups, and personal study.
                  </p>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 divide-x divide-grace border-b border-grace">
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">500+</p>
                  <p className="text-sm text-primary-dark/70">Trivia Questions</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">66</p>
                  <p className="text-sm text-primary-dark/70">Bible Books</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">Free</p>
                  <p className="text-sm text-primary-dark/70">No Account Needed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Intro Paragraph */}
        {/* ---------------------------------------------------------------- */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-3">
              Welcome to Bible Maximum Trivia
            </h2>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              Whether you are preparing a Sunday school lesson, hosting a family game
              night, leading a small group icebreaker, or simply testing your own
              knowledge of Scripture, Bible Maximum has you covered. Our library of
              Bible trivia questions and answers spans every major section of the
              Bible -- from the creation account in Genesis to the apocalyptic visions
              of Revelation. Questions are organized by book, by testament, and by
              difficulty so you can find the perfect set for any audience.
            </p>
            <p className="text-primary-dark/80 leading-relaxed mb-3">
              Each trivia question comes with the correct answer and a verse
              reference, allowing you to look up every answer directly in Scripture.
              We offer multiple-choice, true/false, and fill-in-the-blank formats
              across easy, medium, hard, and theological difficulty levels. Easy
              questions focus on well-known stories and characters that are great for
              kids and newcomers to the Bible. Hard questions dig into genealogies,
              minor prophets, Pauline theology, and obscure details that will
              challenge even seasoned Bible scholars.
            </p>
            <p className="text-primary-dark/80 leading-relaxed">
              Browse our featured sample questions below to get a taste of what is
              available, then dive into one of our full quiz categories to start
              playing. All quizzes are completely free, require no sign-up, and can be
              taken as many times as you like. Let the trivia begin!
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Featured Sample Questions */}
        {/* ---------------------------------------------------------------- */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-xl font-display font-bold text-scripture mb-4">
            10 Sample Bible Trivia Questions
          </h2>
          <p className="text-sm text-primary-dark/70 mb-5">
            A quick taste of the kinds of questions you will find across our quizzes.
            Every answer includes a Scripture reference you can click to study further.
          </p>
          <ol className="space-y-4">
            {SAMPLE_QUESTIONS.map((q, idx) => (
              <li
                key={idx}
                className="bg-white rounded-xl border border-grace hover:border-blue-200 hover:shadow-sm transition-all overflow-hidden"
              >
                <div className="flex items-start gap-4 p-5 md:p-6">
                  {/* Number */}
                  <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-purple-50 text-purple-700 text-sm font-bold border border-purple-100">
                    {idx + 1}
                  </span>

                  <div className="flex-1 min-w-0">
                    {/* Question */}
                    <p className="text-lg font-display font-bold text-scripture mb-2">
                      {q.question}
                    </p>

                    {/* Answer */}
                    <p className="text-primary-dark/80 leading-relaxed mb-2">
                      <span className="font-semibold text-scripture">Answer:</span>{' '}
                      {q.answer}
                    </p>

                    {/* Reference Link */}
                    <Link
                      href={q.referenceUrl}
                      className="text-sm text-blue-600 hover:underline font-medium"
                    >
                      {q.reference}
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Quiz Category Grid */}
        {/* ---------------------------------------------------------------- */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-xl font-display font-bold text-scripture mb-4">
            Browse Bible Trivia by Category
          </h2>
          <p className="text-sm text-primary-dark/70 mb-5">
            Choose a category below to start a full trivia quiz with scored results
            and verse references for every answer.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUIZ_CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group bg-white rounded-xl border border-grace p-5 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <h3 className="font-display font-bold text-scripture group-hover:text-blue-600 transition-colors mb-1">
                  {cat.title}
                </h3>
                <p className="text-sm text-primary-dark/70 mb-3 leading-relaxed">
                  {cat.description}
                </p>
                <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100 font-medium">
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* How to Use Bible Trivia */}
        {/* ---------------------------------------------------------------- */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-3">
              How to Use Bible Trivia
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-scripture mb-2">Family Game Night</h3>
                <p className="text-primary-dark/80 leading-relaxed text-sm">
                  Print out a set of questions or read them aloud from your phone.
                  Split into teams, keep score, and award bonus points for naming the
                  Bible book or chapter where the answer is found. Start with easy
                  questions for younger children and work up to harder rounds as the
                  evening progresses. Bible trivia is a wonderful way to combine
                  fellowship, fun, and Scripture learning in one activity.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-2">Sunday School</h3>
                <p className="text-primary-dark/80 leading-relaxed text-sm">
                  Use trivia as a warm-up activity at the start of class or as a
                  review at the end. Pick questions that align with the lesson theme
                  for the week. For younger classes, stick to multiple-choice format so
                  every child can participate. For teens, try fill-in-the-blank or open
                  answer questions to encourage deeper recall and discussion about the
                  passage.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-2">Small Groups &amp; Bible Studies</h3>
                <p className="text-primary-dark/80 leading-relaxed text-sm">
                  Begin your weekly meeting with a quick five-question trivia round
                  related to the book you are studying. It breaks the ice, gets
                  everyone thinking about Scripture, and naturally transitions into
                  discussion. Use our chapter-specific quizzes to test retention from
                  the previous week&apos;s reading assignment and keep the group
                  accountable.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-2">Personal Study</h3>
                <p className="text-primary-dark/80 leading-relaxed text-sm">
                  Take a quiz after reading a chapter to test your comprehension.
                  Wrong answers highlight areas you may have skimmed over, prompting
                  you to re-read and study more carefully. Over time, regular trivia
                  practice builds a deep familiarity with the people, places, events,
                  and teachings of the Bible that enriches your daily walk with God.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* FAQ Section */}
        {/* ---------------------------------------------------------------- */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {FAQS.map((faq, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-scripture mb-1">{faq.question}</h3>
                  <p className="text-primary-dark/80 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Internal Links */}
        {/* ---------------------------------------------------------------- */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">
              Continue Exploring Scripture
            </h2>
            <p className="text-sm text-primary-dark/70 mb-5">
              Dive deeper into the Bible with quizzes, verse studies, and more.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              <Link
                href="/bible-quizzes"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">
                  Bible Quizzes
                </span>
              </Link>
              <Link
                href="/old-testament-quizzes"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">
                  Old Testament Quizzes
                </span>
              </Link>
              <Link
                href="/new-testament-quizzes"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">
                  New Testament Quizzes
                </span>
              </Link>
              <Link
                href="/books-of-the-bible"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">
                  Books of the Bible
                </span>
              </Link>
              <Link
                href="/famous-bible-verses"
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">
                  Famous Bible Verses
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
