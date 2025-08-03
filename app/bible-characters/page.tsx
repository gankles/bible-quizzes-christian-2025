import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Bible Characters - Coming Soon | Bible Maximum',
  description: 'Learn about Bible characters through interactive quizzes and study materials. Coming soon.',
};

export default function BibleCharactersPage() {
  return (
    <ComingSoon 
      title="Bible Characters Coming Soon"
      description="We're creating character studies and quizzes for Bible figures, starting with Genesis characters like Abraham, Isaac, and Jacob."
      expectedDate="March 2025"
    />
  );
}