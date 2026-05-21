'use client';

import { Quiz, QuizResult } from '@/lib/types';
import { generateRelatedLinks } from '@/lib/interlinks';
import { getVerseReferenceUrl, getCrossRefPageUrl } from '@/lib/verse-ref-utils';
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
    if (percentage >= 80) return "text-sacred";
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
      <span className="meta-eyebrow">Quiz Complete</span>
      <h1 className="editorial-h1">{quiz.title}</h1>
      <div className="hero-verse-block text-center mb-8">
        {/* Score display */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-8 border-grace flex items-center justify-center">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getPerformanceColor(result.percentage)}`}>
                  {result.percentage}%
                </div>
                <div className="text-sm text-ink-muted">
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
            <div className="text-2xl font-bold text-scripture">{result.score}</div>
            <div className="text-sm text-ink-muted">Correct Answers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-scripture">{result.percentage}%</div>
            <div className="text-sm text-ink-muted">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-scripture">{formatTime(result.timeSpent)}</div>
            <div className="text-sm text-ink-muted">Time Taken</div>
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="space-y-6 mb-8">
        <h3 className="quiz-question-ref">Question Breakdown</h3>

        {quiz.questions.map((question, index) => {
            const userResult = result.answeredQuestions.find(aq => aq.questionId === question.id);
            const isCorrect = userResult?.isCorrect || false;

            return (
              <div key={question.id} className="quiz-card">
                <div className="flex items-start justify-between mb-3">
                  <span className="quiz-question-ref">
                    Question {index + 1}{question.verseReference ? ` · ${question.verseReference}` : ''}
                  </span>
                  <span className={`difficulty-badge ${question.difficulty}`}>{question.difficulty}</span>
                </div>

                <h4 className="quiz-question-text">{question.question}</h4>

                {/* Answer review options */}
                <div className="space-y-2 mb-4">
                  <div className={`quiz-option ${isCorrect ? 'correct' : 'incorrect'}`} style={{cursor:'default'}}>
                    <span className="flex items-center gap-2">
                      <span className="option-letter">{isCorrect ? '✓' : '✗'}</span>
                      <span><strong className="font-sans text-xs uppercase tracking-wide mr-2">Your answer:</strong>{userResult?.userAnswer || 'No answer'}</span>
                    </span>
                    <span className="option-status-marker">{isCorrect ? 'Correct' : 'Incorrect'}</span>
                  </div>
                  {!isCorrect && (
                    <div className="quiz-option correct" style={{cursor:'default'}}>
                      <span className="flex items-center gap-2">
                        <span className="option-letter">✓</span>
                        <span><strong className="font-sans text-xs uppercase tracking-wide mr-2">Correct answer:</strong>{question.correctAnswer}</span>
                      </span>
                      <span className="option-status-marker">Answer</span>
                    </div>
                  )}
                </div>

                {question.explanation && (
                  <div className="explanation-box">
                    <div className="explanation-title">Explanation{question.verseReference ? ` (${question.verseReference})` : ''}</div>
                    <p className="text-sm text-scripture">{question.explanation}</p>
                  </div>
                )}

                {question.verseReference && (
                  <div className="flex items-center flex-wrap gap-2 mt-3">
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-ink-muted">Reference:</span>
                    {(() => {
                      const verseUrl = getVerseReferenceUrl(question.verseReference);
                      const crossRefUrl = getCrossRefPageUrl(question.verseReference);
                      return verseUrl ? (
                        <>
                          <Link href={verseUrl} className="text-sacred hover:text-gold-dark hover:underline text-sm font-semibold">
                            {question.verseReference}
                          </Link>
                          {crossRefUrl && (
                            <Link href={crossRefUrl} className="text-xs text-ink-muted hover:text-sacred hover:underline">
                              Cross-references →
                            </Link>
                          )}
                        </>
                      ) : (
                        <span className="text-sacred text-sm">{question.verseReference}</span>
                      );
                    })()}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Internal Links Section - MANDATORY */}
      <div className="bg-blue-50 border border-sacred/20 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-scripture mb-4">Continue Your Bible Study Journey</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {internalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-sacred/20 hover:border-sacred/50 hover:bg-sacred-light transition-all duration-200 group"
            >
              <div className="flex-shrink-0">
                {link.type === 'quiz' && <BookOpenIcon className="h-5 w-5 text-sacred" />}
                {link.type === 'book' && <BookOpenIcon className="h-5 w-5 text-green-600" />}
                {link.type === 'theme' && <BookOpenIcon className="h-5 w-5 text-scripture" />}
                {link.type === 'character' && <BookOpenIcon className="h-5 w-5 text-orange-600" />}
                {link.type === 'hub' && <BookOpenIcon className="h-5 w-5 text-ink-muted" />}
              </div>
              <div className="flex-1">
                <div className="font-medium text-scripture group-hover:text-gold-dark">
                  {link.title}
                </div>
                <div className="text-sm text-ink-muted">
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
          className="bg-scripture text-white px-6 py-3 rounded-lg font-semibold hover:bg-ink-muted transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>Retake Quiz</span>
        </button>
        
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="border border-grace text-scripture px-6 py-3 rounded-lg font-semibold hover:bg-primary-light/50 transition-colors duration-200"
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