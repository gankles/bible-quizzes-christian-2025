'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Quiz, QuizResult } from '@/lib/types';
import { generateAllSchemas, generateMetaTags } from '@/lib/seo';
import QuizInterfaceImproved from './QuizInterfaceImproved';
import Script from 'next/script';

const QuizResultsImproved = dynamic(() => import('./QuizResultsImproved'));

interface QuizPageImprovedProps {
  quiz: Quiz;
  url?: string;
}

export default function QuizPageImproved({ quiz, url = '' }: QuizPageImprovedProps) {
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setShowResults(true);
    
    // Scroll to results
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleRetake = () => {
    setQuizResult(null);
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate all schemas for this quiz
  const schemas = generateAllSchemas(quiz, url);
  const metaTags = generateMetaTags(quiz, url);

  return (
    <>
      {/* JSON-LD Schema Markup */}
      {schemas.map((schema, index) => (
        <Script
          key={index}
          id={`quiz-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}

      <div className="min-h-screen relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/thundermifflin_A_close-up_of_a_persons_torso_and_hands_holding__78ccfb79-5831-4d53-acd9-1442c31345d4.png"
            alt="Close-up of person holding Bible during study"
            className="w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-primary-light/95"></div>
        </div>
        
        {/* Improved Interlinks Demo Banner */}
        <div className="relative z-10 bg-blue-600 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-semibold">🚀 IMPROVED INTERLINKS DEMO - Enhanced Navigation & User Experience</p>
          </div>
        </div>
        
        <div className="relative z-10 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {showResults && quizResult ? (
              <QuizResultsImproved
                quiz={quiz}
                result={quizResult}
                onRetake={handleRetake}
              />
            ) : (
              <QuizInterfaceImproved
                quiz={quiz}
                onComplete={handleQuizComplete}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}