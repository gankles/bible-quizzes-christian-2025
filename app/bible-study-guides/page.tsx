import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Bible Study Guides - Coming Soon | Bible Maximum',
  description: 'Comprehensive Bible study guides for personal and group study. Coming soon.',
  alternates: { canonical: '/bible-study-guides' },
};

export default function BibleStudyGuidesPage() {
  return (
    <ComingSoon 
      title="Bible Study Guides Coming Soon"
      description="We're developing comprehensive study guides for each Bible book, starting with Genesis study materials."
      expectedDate="March 2025"
    />
  );
}