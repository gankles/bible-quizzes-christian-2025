import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Psalm 23 Quiz - Coming Soon | Bible Maximum',
  description: 'Test your knowledge of the beloved Shepherd\'s Psalm. Coming soon.',
};

export default function Psalms23QuizPage() {
  return (
    <ComingSoon 
      title="Psalm 23 Quiz Coming Soon"
      description="We're creating a detailed quiz on the beloved Shepherd's Psalm. Currently focusing on Genesis content first."
      expectedDate="May 2025"
    />
  );
}