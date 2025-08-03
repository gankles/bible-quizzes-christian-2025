import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Bible Quiz Difficulty Levels - Coming Soon | Bible Maximum',
  description: 'Choose your Bible quiz difficulty level. Easy, medium, and hard quizzes coming soon.',
};

export default function BibleQuizDifficultyPage() {
  return (
    <ComingSoon 
      title="Quiz Difficulty Levels Coming Soon"
      description="We're creating easy, medium, and hard difficulty levels for all our Bible quizzes, starting with Genesis content."
      expectedDate="March 2025"
    />
  );
}