import { Metadata } from 'next';
import NewTestamentQuizzesPage from '@/components/NewTestamentQuizzesPage';

export const metadata: Metadata = {
  title: 'New Testament Bible Quizzes | All 27 Books from Matthew to Revelation | Free Chapter Quizzes on Jesus, Paul & the Early Church | Bible Maximum',
  description: 'Explore comprehensive New Testament Bible quizzes covering all 27 books from Matthew to Revelation. Test your knowledge of Jesus, Paul, and the early church.',
  keywords: 'new testament quizzes, gospel quizzes, jesus, paul, apostles, christian church, matthew, john, romans, revelation',
  openGraph: {
    title: 'New Testament Bible Quizzes - Test Your Scripture Knowledge',
    description: 'Explore comprehensive New Testament Bible quizzes covering all 27 books from Matthew to Revelation.',
    url: '/new-testament-quizzes',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Testament Bible Quizzes - Test Your Scripture Knowledge',
    description: 'Explore comprehensive New Testament Bible quizzes covering all 27 books from Matthew to Revelation.',
  },
  alternates: {
    canonical: '/new-testament-quizzes',
  },
};

export default function NewTestamentQuizzesPageRoute() {
  return <NewTestamentQuizzesPage />;
}