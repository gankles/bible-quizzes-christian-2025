import { Metadata } from 'next';
import TabbedQuizPage from '@/components/TabbedQuizPage';
import { GENESIS_1_TABBED_QUIZ } from '@/lib/genesis-1-quiz-tabbed-system';

export const metadata: Metadata = {
  title: 'Genesis Chapter 1 Quiz - Multi-Level Learning | Bible Maximum',
  description: 'Choose your difficulty level: Easy, Medium, Hard, or Theological. Perfect for beginners to seminary students.',
  keywords: 'genesis quiz, bible difficulty levels, easy bible quiz, hard bible quiz, theological quiz, multi-level learning',
  openGraph: {
    title: 'Genesis Chapter 1 Quiz - Multi-Level Learning',
    description: 'Choose your difficulty level: Easy, Medium, Hard, or Theological. Perfect for beginners to seminary students.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Genesis Chapter 1 Quiz - Multi-Level Learning',
    description: 'Choose your difficulty level: Easy, Medium, Hard, or Theological. Perfect for beginners to seminary students.',
  },
};

export default function Genesis1TabbedQuizPage() {
  return (
    <TabbedQuizPage 
      tabbedQuiz={GENESIS_1_TABBED_QUIZ}
      url="https://biblemaximum.com/genesis-1-quiz-tabbed"
    />
  );
}