import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBooksWithPlaces, getPlacesForBook } from '@/lib/geocoding-data';
import { BOOK_NAMES } from '@/lib/bolls-api';
import { StructuredData } from '@/components/StructuredData';
import GeoAttribution from '@/components/GeoAttribution';
import GeographyQuizClient from './GeographyQuizClient';

interface PageProps {
  params: Promise<{ book: string }>;
}

export async function generateStaticParams() {
  return getBooksWithPlaces().map(book => ({ book }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { book } = await params;
  const bookName = BOOK_NAMES[book];
  if (!bookName) return {};

  const title = `${bookName} Geography Quiz | Test Your Knowledge of Places in ${bookName} | Bible Geography Quiz | Bible Maximum`;
  const description = `Test your knowledge of biblical places mentioned in ${bookName}. Multiple choice and true/false questions about locations, geography, and maps from the Book of ${bookName}.`;

  return {
    title,
    description,
    keywords: [
      `${bookName} geography quiz`, `${bookName} places quiz`, `${bookName} Bible quiz`,
      'Bible geography quiz', 'biblical places quiz', 'Bible map quiz',
    ],
    openGraph: {
      title: `${bookName} Geography Quiz`,
      description,
      url: `/bible-geography-quiz/${book}`,
      type: 'website',
    },
    alternates: { canonical: `/bible-geography-quiz/${book}` },
  };
}

function generateQuizQuestions(book: string, bookName: string) {
  const places = getPlacesForBook(book);
  if (places.length === 0) return [];

  // Sort by verse count to focus on most important places
  const sorted = [...places]
    .filter(p => p.verseCount > 0)
    .sort((a, b) => b.verseCount - a.verseCount);

  const questions: any[] = [];
  let qId = 0;

  // Deterministic shuffle based on book name
  const seed = book.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  function seededRandom(i: number) {
    const x = Math.sin(seed + i) * 10000;
    return x - Math.floor(x);
  }

  // Q type 1: "Which place is mentioned in [Book]?" (MC)
  for (let i = 0; i < Math.min(5, sorted.length); i++) {
    const correct = sorted[i];
    // Pick 3 wrong answers from places NOT in this book
    const allPlaces = getPlacesForBook(book === 'genesis' ? 'revelation' : 'genesis');
    const wrongs = allPlaces
      .filter(p => !places.some(bp => bp.slug === p.slug))
      .slice(0, 3)
      .map(p => p.name);
    if (wrongs.length < 3) continue;

    const options = [correct.name, ...wrongs];
    // Shuffle with seed
    const shuffled = options.sort((a, b) => seededRandom(qId + a.charCodeAt(0)) - 0.5);

    questions.push({
      id: `geo-${book}-${++qId}`,
      question: `Which of these places is mentioned in the Book of ${bookName}?`,
      type: 'multiple-choice',
      options: shuffled,
      correctAnswer: correct.name,
      explanation: `${correct.name} is mentioned ${correct.verses.filter(v => v.bookSlug === book).length} time(s) in ${bookName}.`,
      verseReference: correct.verses.filter(v => v.bookSlug === book)[0]?.readable || '',
      difficulty: 'easy',
    });
  }

  // Q type 2: "What type of place is [X]?" (MC)
  for (let i = 0; i < Math.min(5, sorted.length); i++) {
    const place = sorted[i];
    if (place.type === 'special' || place.type === 'settlement') continue;
    const correctType = place.type.charAt(0).toUpperCase() + place.type.slice(1);
    const wrongTypes = ['Settlement', 'Mountain', 'River', 'Region', 'Valley', 'Island']
      .filter(t => t.toLowerCase() !== place.type);
    const options = [correctType, ...wrongTypes.slice(0, 3)];
    const shuffled = options.sort((a, b) => seededRandom(qId + a.charCodeAt(0)) - 0.5);

    questions.push({
      id: `geo-${book}-${++qId}`,
      question: `What type of geographical feature is ${place.name} in the Bible?`,
      type: 'multiple-choice',
      options: shuffled,
      correctAnswer: correctType,
      explanation: `${place.name} is classified as a ${place.type} in biblical geography.`,
      verseReference: place.verses.filter(v => v.bookSlug === book)[0]?.readable || '',
      difficulty: 'medium',
    });
    if (questions.length >= 10) break;
  }

  // Q type 3: True/False questions
  for (let i = 0; i < Math.min(4, sorted.length); i++) {
    const place = sorted[i];
    const isTrue = seededRandom(qId + i) > 0.5;
    const bookVerseCount = place.verses.filter(v => v.bookSlug === book).length;

    if (isTrue) {
      questions.push({
        id: `geo-${book}-${++qId}`,
        question: `True or False: ${place.name} is mentioned in the Book of ${bookName}.`,
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: `${place.name} appears ${bookVerseCount} time(s) in ${bookName}.`,
        verseReference: place.verses.filter(v => v.bookSlug === book)[0]?.readable || '',
        difficulty: 'easy',
      });
    } else {
      // Pick a place NOT in this book
      const otherBook = book === 'genesis' ? 'revelation' : 'genesis';
      const otherPlaces = getPlacesForBook(otherBook).filter(p => !places.some(bp => bp.slug === p.slug));
      if (otherPlaces.length > 0) {
        const wrong = otherPlaces[Math.floor(seededRandom(qId) * otherPlaces.length)];
        questions.push({
          id: `geo-${book}-${++qId}`,
          question: `True or False: ${wrong.name} is mentioned in the Book of ${bookName}.`,
          type: 'true-false',
          options: ['True', 'False'],
          correctAnswer: 'False',
          explanation: `${wrong.name} is not specifically mentioned in ${bookName}.`,
          verseReference: '',
          difficulty: 'easy',
        });
      }
    }
    if (questions.length >= 15) break;
  }

  // Q type 4: "In which chapter of [Book] is [Place] first mentioned?" (MC)
  for (let i = 0; i < Math.min(3, sorted.length); i++) {
    const place = sorted[i];
    const bookVerses = place.verses.filter(v => v.bookSlug === book);
    if (bookVerses.length === 0) continue;
    const firstChapter = bookVerses[0].chapter;
    const wrongChapters = [firstChapter + 2, firstChapter + 5, firstChapter + 10]
      .filter(c => c > 0 && c !== firstChapter)
      .map(c => `Chapter ${c}`);
    if (wrongChapters.length < 3) continue;

    const options = [`Chapter ${firstChapter}`, ...wrongChapters.slice(0, 3)];
    const shuffled = options.sort((a, b) => seededRandom(qId + a.charCodeAt(0)) - 0.5);

    questions.push({
      id: `geo-${book}-${++qId}`,
      question: `In which chapter of ${bookName} is ${place.name} first mentioned?`,
      type: 'multiple-choice',
      options: shuffled,
      correctAnswer: `Chapter ${firstChapter}`,
      explanation: `${place.name} first appears in ${bookName} ${firstChapter}:${bookVerses[0].verse}.`,
      verseReference: bookVerses[0].readable,
      difficulty: 'hard',
    });
    if (questions.length >= 20) break;
  }

  return questions.slice(0, 20);
}

export default async function GeographyQuizPage({ params }: PageProps) {
  const { book } = await params;
  const bookName = BOOK_NAMES[book];
  if (!bookName) notFound();

  const places = getPlacesForBook(book);
  if (places.length === 0) notFound();

  const questions = generateQuizQuestions(book, bookName);
  if (questions.length === 0) notFound();

  const quiz = {
    id: `geography-quiz-${book}`,
    title: `${bookName} Geography Quiz`,
    description: `Test your knowledge of ${places.length} biblical places mentioned in ${bookName}`,
    type: 'theme' as const,
    book: bookName,
    totalQuestions: questions.length,
    estimatedTime: Math.ceil(questions.length * 0.75),
    difficulty: 'medium' as const,
    slug: `bible-geography-quiz/${book}`,
    tags: [book, 'geography', 'Bible places', 'Bible map'],
    isBookQuiz: false,
    questions,
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: quiz.title,
    description: quiz.description,
    url: `https://biblemaximum.com/bible-geography-quiz/${book}`,
    educationalLevel: 'beginner',
    about: {
      '@type': 'Thing',
      name: `Places in ${bookName}`,
    },
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/bible-geography" className="hover:text-blue-600">Bible Geography</Link>
        <span className="mx-1.5">/</span>
        <Link href={`/bible-geography/${book}`} className="hover:text-blue-600">{bookName}</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">Geography Quiz</span>
      </nav>

      {/* Quiz */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <GeographyQuizClient quiz={quiz} />
      </section>

      {/* Internal Links (below quiz per CLAUDE.md) */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Related Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href={`/bible-geography/${book}`} className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              {bookName} Geography Map
            </Link>
            <Link href={`/${book}-chapters`} className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              {bookName} Chapter Quizzes
            </Link>
            <Link href={`/${book}-quiz`} className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              {bookName} Book Quiz
            </Link>
            <Link href="/bible-geography-quiz" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              All Geography Quizzes
            </Link>
            <Link href="/bible-places" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              All Bible Places
            </Link>
            <Link href="/bible-places/era" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              Places by Era
            </Link>
            <Link href="/bible-quizzes" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              More Bible Quizzes
            </Link>
            <Link href="/character-quiz" className="px-4 py-2.5 bg-white border border-grace rounded-lg text-sm hover:border-blue-300 transition-colors">
              Character Quizzes
            </Link>
          </div>
        </div>
        <GeoAttribution compact />
      </section>
    </>
  );
}
