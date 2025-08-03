import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Genesis Chapters - Coming Soon | Bible Maximum',
  description: 'Browse all 50 chapters of Genesis with individual chapter quizzes and study materials.',
};

export default function GenesisChaptersPage() {
  return (
    <ComingSoon 
      title="Genesis Chapters Coming Soon"
      description="We're building a comprehensive chapter-by-chapter experience for Genesis with quizzes, summaries, and study guides for all 50 chapters."
      expectedDate="February 2025"
    />
  );
}