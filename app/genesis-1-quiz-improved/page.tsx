import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Genesis 1 Quiz Improved - Coming Soon | Bible Maximum',
  description: 'Enhanced version of the Genesis 1 quiz with improved features coming soon.',
  alternates: { canonical: '/genesis-1-quiz-improved' },
};

export default function Genesis1QuizImprovedPage() {
  return (
    <ComingSoon 
      title="Enhanced Genesis 1 Quiz Coming Soon"
      description="We're working on an improved version of the Genesis 1 quiz with enhanced features and better interactivity."
      expectedDate="February 2025"
    />
  );
}