import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Romans 8 Quiz - Coming Soon | Bible Maximum',
  description: 'Test your knowledge of life in the Spirit and God\'s love in Christ Jesus. Coming soon.',
};

export default function Romans8QuizPage() {
  return (
    <ComingSoon 
      title="Romans 8 Quiz Coming Soon"
      description="We're creating a comprehensive quiz on Romans 8, covering life in the Spirit and God's love. Currently focusing on Genesis content first."
      expectedDate="June 2025"
    />
  );
}