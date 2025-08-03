import { Metadata } from 'next';
import QuizPage from '@/components/QuizPage';
import { GENESIS_1_QUIZ } from '@/lib/quiz-data';
import { generateMetaTags } from '@/lib/seo';

// Generate metadata for this specific quiz
export async function generateMetadata(): Promise<Metadata> {
  const url = '/genesis-1-quiz';
  const metaTags = generateMetaTags(GENESIS_1_QUIZ, url);
  
  return {
    title: metaTags.title,
    description: metaTags.description,
    keywords: metaTags.keywords,
    openGraph: {
      title: metaTags.ogTitle,
      description: metaTags.ogDescription,
      url: metaTags.ogUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTags.twitterTitle,
      description: metaTags.twitterDescription,
    },
    alternates: {
      canonical: metaTags.canonical,
    },
  };
}

export default function Genesis1QuizPage() {
  return (
    <QuizPage 
      quiz={GENESIS_1_QUIZ} 
      url="https://biblemaximum.com/genesis-1-quiz"
    />
  );
}