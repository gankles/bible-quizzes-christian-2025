import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Creation Quiz - Coming Soon | Bible Maximum',
  description: 'Test your knowledge of biblical creation from Genesis. Coming soon.',
};

export default function CreationQuizPage() {
  return (
    <ComingSoon 
      title="Creation Quiz Coming Soon"
      description="We're creating a comprehensive quiz about biblical creation, drawing from Genesis 1-2 and related scriptures."
      expectedDate="March 2025"
    />
  );
}