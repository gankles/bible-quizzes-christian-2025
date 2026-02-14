import { Metadata } from 'next';
import QuizPage from '@/components/QuizPage';
import { generateMetaTags } from '@/lib/seo';
import { Quiz } from '@/lib/types';
import quizData from '@/data/quizzes/mark-3.json';

const quiz = quizData as Quiz;

export async function generateMetadata(): Promise<Metadata> {
    const url = '/mark-3-quiz';
    const metaTags = generateMetaTags(quiz, url);

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

export default function Mark3QuizPage() {
    return (
        <QuizPage
            quiz={quiz}
            url="https://biblemaximum.com/mark-3-quiz"
        />
    );
}
