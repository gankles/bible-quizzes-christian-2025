'use client';

import { Quiz, QuizResult } from '@/lib/types';
import { generateRelatedLinks } from '@/lib/interlinks';
import { CheckCircleIcon, XMarkIcon, ArrowLeftIcon, ArrowRightIcon, BookOpenIcon } from './icons';
import Link from 'next/link';

interface QuizResultsProps {
  quiz: Quiz;
  result: QuizResult;
  onRetake: () => void;
}

export default function QuizResults({ quiz, result, onRetake }: QuizResultsProps) {
  const getPerformanceMessage = (percentage: number): string => {
    if (percentage >= 90) return "Outstanding! You're a Bible scholar!";
    if (percentage >= 80) return "Excellent! You know your Scripture well!";
    if (percentage >= 70) return "Good job! Keep studying to improve!";
    if (percentage >= 60) return "Not bad! Review the study guide for better results.";
    return "Keep learning! Try our study guide first.";
  };

  const getPerformanceColor = (percentage: number): string => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    if (percentage >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  const internalLinks = generateRelatedLinks(quiz);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Results Header */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Results</h2>
        
        {/* Score Circle */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getPerformanceColor(result.percentage)}`}>
                  {result.percentage}%
                </div>
                <div className="text-sm text-gray-600">
                  {result.score}/{result.totalQuestions}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className={`text-xl font-semibold mb-4 ${getPerformanceColor(result.percentage)}`}>
          {getPerformanceMessage(result.percentage)}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{result.score}</div>
            <div className="text-sm text-gray-600">Correct Answers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{result.percentage}%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{formatTime(result.timeSpent)}</div>
            <div className="text-sm text-gray-600">Time Taken</div>
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Question Breakdown</h3>
        
        <div className="space-y-4">
          {quiz.questions.map((question, index) => {
            const userResult = result.answeredQuestions.find(aq => aq.questionId === question.id);
            const isCorrect = userResult?.isCorrect || false;
            
            return (
              <div key={question.id} className={`border rounded-lg p-4 ${
                isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {isCorrect ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    ) : (
                      <XMarkIcon className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {index + 1}. {question.question}
                    </h4>
                    
                    <div className="text-sm space-y-2">
                      <div>
                        <span className="font-medium text-gray-700">Your answer: </span>
                        <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                          {userResult?.userAnswer || 'No answer'}
                        </span>
                      </div>
                      
                      {!isCorrect && (
                        <div>
                          <span className="font-medium text-gray-700">Correct answer: </span>
                          <span className="text-green-700">{question.correctAnswer}</span>
                        </div>
                      )}
                      
                      <div className="bg-white rounded p-3 border border-gray-200">
                        <span className="font-medium text-gray-700">Explanation: </span>
                        <span className="text-gray-600">{question.explanation}</span>
                      </div>
                      
                      <div>
                        <span className="font-medium text-gray-700">Reference: </span>
                        <span className="text-blue-600">{question.verseReference}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Internal Links Section - MANDATORY */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Continue Your Bible Study Journey</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {internalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex-shrink-0">
                {link.type === 'quiz' && <BookOpenIcon className="h-5 w-5 text-blue-600" />}
                {link.type === 'book' && <BookOpenIcon className="h-5 w-5 text-green-600" />}
                {link.type === 'theme' && <BookOpenIcon className="h-5 w-5 text-purple-600" />}
                {link.type === 'character' && <BookOpenIcon className="h-5 w-5 text-orange-600" />}
                {link.type === 'hub' && <BookOpenIcon className="h-5 w-5 text-gray-600" />}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 group-hover:text-blue-700">
                  {link.title}
                </div>
                <div className="text-sm text-gray-600">
                  {link.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRetake}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>Retake Quiz</span>
        </button>
        
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
        >
          Back to Top
        </button>

        <Link
          href="/bible-quizzes"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 text-center"
        >
          More Quizzes
        </Link>
      </div>
    </div>
  );
}