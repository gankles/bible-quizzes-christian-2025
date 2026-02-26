'use client';

import QuizPage from '@/components/QuizPage';

export default function CharacterQuizClient({ quiz }: { quiz: any }) {
  return <QuizPage quiz={quiz} url={`/character-quiz/${quiz.slug || ''}`} />;
}
