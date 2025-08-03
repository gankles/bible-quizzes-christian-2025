import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Kids Bible Quiz - Coming Soon | Bible Maximum',
  description: 'Fun and engaging Bible quizzes designed specifically for children. Coming soon.',
};

export default function KidsBibleQuizPage() {
  return (
    <ComingSoon 
      title="Kids Bible Quiz Coming Soon"
      description="We're creating fun, age-appropriate Bible quizzes for children, starting with Genesis stories."
      expectedDate="April 2025"
    />
  );
}