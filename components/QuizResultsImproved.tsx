'use client';

import { Quiz, QuizResult } from '@/lib/types';
import { generateImprovedRelatedLinks } from '@/lib/improved-interlinks';
import { getVerseReferenceUrl, getCrossRefPageUrl } from '@/lib/verse-ref-utils';
import { CheckCircleIcon, XMarkIcon, ArrowLeftIcon, ArrowRightIcon, BookOpenIcon, UserIcon, LinkIcon, StarIcon } from './icons';
import Link from 'next/link';

interface QuizResultsImprovedProps {
  quiz: Quiz;
  result: QuizResult;
  onRetake: () => void;
}

export default function QuizResultsImproved({ quiz, result, onRetake }: QuizResultsImprovedProps) {
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

  // Get improved interlinks
  const improvedLinks = generateImprovedRelatedLinks(quiz);

  // Helper function to get icon based on link type
  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'sequential': return <ArrowRightIcon className="h-5 w-5 text-blue-600" />;
      case 'cross-reference': return <LinkIcon className="h-5 w-5 text-purple-600" />;
      case 'character': return <UserIcon className="h-5 w-5 text-orange-600" />;
      case 'popular': return <StarIcon className="h-5 w-5 text-yellow-600" />;
      case 'hub': return <BookOpenIcon className="h-5 w-5 text-gray-600" />;
      default: return <BookOpenIcon className="h-5 w-5 text-blue-600" />;
    }
  };

  // Helper function to get badge color based on link type
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'sequential': return 'bg-blue-100 text-blue-800';
      case 'cross-reference': return 'bg-purple-100 text-purple-800';
      case 'character': return 'bg-orange-100 text-orange-800';
      case 'popular': return 'bg-yellow-100 text-yellow-800';
      case 'hub': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

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
                      
                      {question.verseReference && (
                        <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
                          <span className="font-medium text-gray-700">Reference: </span>
                          {(() => {
                            const verseUrl = getVerseReferenceUrl(question.verseReference);
                            const crossRefUrl = getCrossRefPageUrl(question.verseReference);
                            return verseUrl ? (
                              <>
                                <Link href={verseUrl} className="text-blue-600 hover:underline font-medium">
                                  {question.verseReference}
                                </Link>
                                {crossRefUrl && (
                                  <Link href={crossRefUrl} className="text-xs text-purple-600 hover:underline">
                                    Cross-references
                                  </Link>
                                )}
                              </>
                            ) : (
                              <span className="text-blue-600">{question.verseReference}</span>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* IMPROVED Internal Links Section */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpenIcon className="h-6 w-6 text-green-600" />
          <h3 className="text-lg font-semibold text-green-900">What's Next in Your Bible Journey?</h3>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            SMART RECOMMENDATIONS
          </span>
        </div>
        
        <p className="text-sm text-green-700 mb-4">
          Based on your quiz completion, here are personalized next steps:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {improvedLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-green-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group shadow-sm"
            >
              <div className="flex-shrink-0">
                {getLinkIcon(link.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="font-medium text-gray-900 group-hover:text-green-700 truncate">
                    {link.title}
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBadgeColor(link.type)}`}>
                    {link.type === 'sequential' && 'Continue'}
                    {link.type === 'cross-reference' && 'Related'}
                    {link.type === 'character' && 'Character'}
                    {link.type === 'popular' && 'Popular'}
                    {link.type === 'hub' && 'Explore'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {link.description}
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Personalized Recommendation Based on Score */}
        <div className="mt-4 pt-4 border-t border-green-200">
          <div className="bg-white rounded-lg p-3 border border-green-200">
            <h4 className="text-sm font-semibold text-green-900 mb-1">💡 Personalized Tip:</h4>
            <p className="text-sm text-green-700">
              {result.percentage >= 80 
                ? "Great job! You're ready for more challenging quizzes. Try a cross-reference or character quiz next."
                : result.percentage >= 60
                ? "Good foundation! Consider reviewing the chapter and trying a related character quiz to deepen understanding."
                : "Keep studying! Start with the sequential next chapter or explore related themes to build your knowledge."}
            </p>
          </div>
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
          Explore More Quizzes
        </Link>
      </div>
    </div>
  );
}