import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'John Chapter 3 Quiz - Coming Soon | Bible Maximum',
  description: 'Test your knowledge of John 3, including the famous conversation with Nicodemus. Coming soon.',
  alternates: { canonical: '/john-3-quiz' },
};

export default function John3QuizPage() {
  return (
    <ComingSoon 
      title="John 3 Quiz Coming Soon"
      description="We're creating the John 3 quiz featuring Jesus' conversation with Nicodemus and John 3:16. Currently focusing on Genesis content first."
      expectedDate="May 2025"
    />
  );
}