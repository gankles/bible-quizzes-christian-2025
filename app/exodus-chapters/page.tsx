import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Exodus Chapters - Coming Soon | Bible Maximum',
  description: 'Browse all 40 chapters of Exodus with individual chapter quizzes. Coming soon.',
};

export default function ExodusChaptersPage() {
  return (
    <ComingSoon 
      title="Exodus Chapters Coming Soon"
      description="We're building chapter-by-chapter content for Exodus after completing Genesis. All 40 chapters will have individual quizzes and study materials."
      expectedDate="April 2025"
    />
  );
}