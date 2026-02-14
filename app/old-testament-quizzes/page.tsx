import { Metadata } from 'next';
import OldTestamentQuizzesPage from '@/components/OldTestamentQuizzesPage';

export const metadata: Metadata = {
  title: 'Old Testament Bible Quizzes | All 39 Books from Genesis to Malachi | Free Chapter-by-Chapter Questions with Answers | Bible Maximum',
  description: 'Explore comprehensive Old Testament Bible quizzes covering all 39 books from Genesis to Malachi. Test your knowledge with detailed questions and explanations.',
  keywords: 'old testament quizzes, hebrew bible, genesis, exodus, psalms, isaiah, biblical history, moses, david, prophets',
  openGraph: {
    title: 'Old Testament Bible Quizzes - Test Your Scripture Knowledge',
    description: 'Explore comprehensive Old Testament Bible quizzes covering all 39 books from Genesis to Malachi.',
    url: '/old-testament-quizzes',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Old Testament Bible Quizzes - Test Your Scripture Knowledge',
    description: 'Explore comprehensive Old Testament Bible quizzes covering all 39 books from Genesis to Malachi.',
  },
  alternates: {
    canonical: '/old-testament-quizzes',
  },
};

export default function OldTestamentQuizzesPageRoute() {
  return <OldTestamentQuizzesPage />;
}