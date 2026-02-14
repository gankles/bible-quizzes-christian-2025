import { Metadata } from 'next';
import QuizPage from '@/components/QuizPage';
import { GENESIS_1_QUIZ_RESEARCH_BASED } from '@/lib/genesis-1-quiz-research-based';
import { generateMetaTags } from '@/lib/seo';

// Generate metadata for this research-based quiz
export async function generateMetadata(): Promise<Metadata> {
  const url = '/genesis-1-quiz-research-based';
  const metaTags = generateMetaTags(GENESIS_1_QUIZ_RESEARCH_BASED, url);
  
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

export default function Genesis1QuizResearchBasedPage() {
  return (
    <QuizPage 
      quiz={GENESIS_1_QUIZ_RESEARCH_BASED} 
      url="https://biblemaximum.com/genesis-1-quiz-research-based"
    />
  );
}