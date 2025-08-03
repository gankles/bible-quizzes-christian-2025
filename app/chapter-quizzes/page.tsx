import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Chapter Quizzes - Coming Soon | Bible Maximum',
  description: 'Individual chapter quizzes for every chapter in the Bible. Currently focusing on Genesis.',
};

export default function ChapterQuizzesPage() {
  return (
    <ComingSoon 
      title="Chapter Quizzes Coming Soon"
      description="We're building individual quizzes for every chapter in the Bible. Starting with Genesis chapters and expanding from there."
      expectedDate="March 2025"
    />
  );
}