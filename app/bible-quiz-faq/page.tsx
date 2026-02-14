import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Bible Quiz FAQ - Coming Soon | Bible Maximum',
  description: 'Frequently asked questions about our Bible quizzes and study materials. Coming soon.',
  alternates: { canonical: '/bible-quiz-faq' },
};

export default function BibleQuizFAQPage() {
  return (
    <ComingSoon 
      title="FAQ Coming Soon"
      description="We're compiling frequently asked questions to help you get the most out of Bible Maximum."
      expectedDate="February 2025"
    />
  );
}