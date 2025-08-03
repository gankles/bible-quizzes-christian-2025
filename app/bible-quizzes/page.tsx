import { Metadata } from 'next';
import BibleQuizzesPage from '@/components/BibleQuizzesPage';

export const metadata: Metadata = {
  title: 'Bible Quizzes - Complete Collection | Bible Maximum',
  description: 'Comprehensive Bible quizzes for all 66 books of the Bible. Test your biblical knowledge with interactive quizzes covering Old and New Testament. Perfect for Bible study groups and personal growth.',
  keywords: 'bible quiz, scripture test, bible knowledge, christian quiz, bible study, old testament, new testament, bible trivia, biblical education',
  openGraph: {
    title: 'Bible Quizzes - Complete Collection',
    description: 'Comprehensive Bible quizzes for all 66 books of the Bible. Test your biblical knowledge with interactive quizzes.',
    url: '/bible-quizzes',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bible Quizzes - Complete Collection',
    description: 'Comprehensive Bible quizzes for all 66 books of the Bible.',
  },
  alternates: {
    canonical: '/bible-quizzes',
  },
};

export default function BibleQuizzesPageRoute() {
  return <BibleQuizzesPage />;
}