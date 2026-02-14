import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'How Bible Quiz Works - Coming Soon | Bible Maximum',
  description: 'Learn how our Bible quizzes work and how to get the most out of your study time. Coming soon.',
  alternates: { canonical: '/how-bible-quiz-works' },
};

export default function HowBibleQuizWorksPage() {
  return (
    <ComingSoon 
      title="How It Works Guide Coming Soon"
      description="We're creating a comprehensive guide explaining how to use our Bible quizzes effectively for study and growth."
      expectedDate="February 2025"
    />
  );
}