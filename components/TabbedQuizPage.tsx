'use client';

import { useState, useCallback } from 'react';
import { Quiz, QuizResult } from '@/lib/types';
import { TabbedQuiz } from '@/lib/genesis-1-quiz-tabbed-system';
import QuizInterface from './QuizInterface';
import QuizResults from './QuizResults';

type TabKey = 'easy' | 'medium' | 'hard' | 'theological';

const TABS = [
  {
    key: 'easy' as const,
    label: 'Easy',
    description: 'Perfect for beginners',
    icon: '🌱',
    color: 'bg-green-500 text-white',
    hoverColor: 'hover:bg-green-600',
    time: '8 min',
    questions: 15
  },
  {
    key: 'medium' as const,
    label: 'Medium',
    description: 'Apply biblical truths',
    icon: '🏃',
    color: 'bg-blue-500 text-white',
    hoverColor: 'hover:bg-blue-600',
    time: '12 min',
    questions: 15
  },
  {
    key: 'hard' as const,
    label: 'Hard',
    description: 'Deep analysis required',
    icon: '🧗',
    color: 'bg-orange-500 text-white',
    hoverColor: 'hover:bg-orange-600',
    time: '15 min',
    questions: 15
  },
  {
    key: 'theological' as const,
    label: 'Theological',
    description: 'Deep biblical truths',
    icon: '🎓',
    color: 'bg-purple-500 text-white',
    hoverColor: 'hover:bg-purple-600',
    time: '25 min',
    questions: 15
  }
] as const;

const TABS_BY_KEY = new Map(TABS.map(t => [t.key, t]));

interface TabbedQuizPageProps {
  tabbedQuiz: TabbedQuiz;
  url: string;
}

export default function TabbedQuizPage({ tabbedQuiz, url }: TabbedQuizPageProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('easy');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleTabChange = useCallback((newTab: TabKey) => {
    setActiveTab(newTab);
    setQuizResult(null);
    setShowResults(false);
  }, []);

  const handleQuizComplete = useCallback((result: QuizResult) => {
    setQuizResult(result);
    setShowResults(true);

    setTimeout(() => {
      document.getElementById('quiz-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const handleRetake = useCallback(() => {
    setQuizResult(null);
    setShowResults(false);
    document.getElementById('quiz-content')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const activeTabData = TABS_BY_KEY.get(activeTab)!;
  const currentQuiz = tabbedQuiz.tabs[activeTab];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {tabbedQuiz.title}
          </h1>
          <p className="text-gray-600 mb-6">
            {tabbedQuiz.description}
          </p>

          {/* Tab Navigation - Option 1: 2x2 grid on mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`
                  relative p-2 sm:p-4 rounded-lg border-2 transition-all duration-200 text-left
                  ${activeTab === tab.key 
                    ? `${tab.color} border-transparent shadow-lg transform scale-105` 
                    : `bg-white border-gray-200 ${tab.hoverColor} hover:border-gray-300 hover:shadow-md`
                  }
                `}
              >
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                  <span className="text-xl sm:text-2xl">{tab.icon}</span>
                  <span className={`font-semibold text-sm sm:text-lg ${
                    activeTab === tab.key ? 'text-white' : 'text-gray-900'
                  }`}>
                    {tab.label}
                  </span>
                </div>
                
                <p className={`text-xs sm:text-sm mb-2 sm:mb-3 ${
                  activeTab === tab.key ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {tab.description}
                </p>
                
                <div className={`flex justify-between items-center text-xs ${
                  activeTab === tab.key ? 'text-white/80' : 'text-gray-500'
                }`}>
                  <span>{tab.questions} questions</span>
                  <span>{tab.time}</span>
                </div>

                {/* Active indicator */}
                {activeTab === tab.key && (
                  <div className="absolute top-2 right-2">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Level Description */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">
                {activeTabData.icon}
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  {activeTabData.label} Level Selected
                </h3>
                <p className="text-blue-800 text-sm">
                  {getLevelDescription(activeTab)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="max-w-4xl mx-auto pt-8" id="quiz-content">
        {showResults ? (
          <div id="quiz-results">
            <QuizResults 
              quiz={currentQuiz}
              result={quizResult!} 
              onRetake={handleRetake}
            />
          </div>
        ) : (
          <QuizInterface 
            quiz={currentQuiz} 
            onComplete={handleQuizComplete}
          />
        )}
      </div>
    </div>
  );
}

function getLevelDescription(level: 'easy' | 'medium' | 'hard' | 'theological'): string {
  const descriptions = {
    easy: 'Perfect for new Christians and beginners. Basic facts and recognition questions to build confidence.',
    medium: 'Great for regular church members. Apply biblical truths to real-life situations and modern Christian living.',
    hard: 'Designed for mature Christians and Bible students. Analyze patterns and make cross-biblical connections.',
    theological: 'For seminary students and church leaders. Advanced doctrine, apologetics, and systematic theology.'
  };
  
  return descriptions[level];
}