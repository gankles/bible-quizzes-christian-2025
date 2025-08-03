import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Matthew Chapters - Coming Soon | Bible Maximum',
  description: 'Browse all 28 chapters of Matthew with individual chapter quizzes. Coming soon.',
};

export default function MatthewChaptersPage() {
  return (
    <ComingSoon 
      title="Matthew Chapters Coming Soon"
      description="We're building chapter-by-chapter content for Matthew. All 28 chapters will have individual quizzes covering Jesus' teachings and ministry."
      expectedDate="June 2025"
    />
  );
}