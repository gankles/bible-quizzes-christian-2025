'use client';

import QuizPage from '@/components/QuizPage';

export default function GeographyQuizClient({ quiz }: { quiz: any }) {
  return <QuizPage quiz={quiz} url={`/bible-geography-quiz/${quiz.book?.toLowerCase().replace(/\s+/g, '-') || ''}`} />;
}
