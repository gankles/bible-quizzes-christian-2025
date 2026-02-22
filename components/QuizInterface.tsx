'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Quiz, QuizQuestion, QuizResult, QuizProgress } from '@/lib/types';
import { generateRelatedLinks } from '@/lib/interlinks';
import { standardizeQuiz } from '@/lib/quiz-generation';
import { getVerseReferenceUrl } from '@/lib/verse-ref-utils';
import { ClockIcon, CheckCircleIcon, ArrowRightIcon, BookOpenIcon } from './icons';
import Link from 'next/link';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

interface QuizInterfaceProps {
  quiz: Quiz;
  onComplete: (result: QuizResult) => void;
}

interface UserAnswer {
  questionId: string;
  answer: string;
}

export default function QuizInterface({ quiz, onComplete }: QuizInterfaceProps) {
  const standardizedQuiz = useMemo(() => {
    const standardizedQuestions = standardizeQuiz(quiz.questions);
    return { ...quiz, questions: standardizedQuestions };
  }, [quiz]);

  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [startTime] = useState<Date>(new Date());
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Derive progress during render instead of useEffect
  const progress: QuizProgress = useMemo(() => {
    const answeredCount = userAnswers.length;
    const percentage = (answeredCount / standardizedQuiz.totalQuestions) * 100;
    const remainingQuestions = standardizedQuiz.totalQuestions - answeredCount;
    const estimatedTimeRemaining = Math.max(0, Math.ceil(remainingQuestions * 0.5));
    return {
      currentQuestion: answeredCount + 1,
      answeredQuestions: answeredCount,
      percentage,
      estimatedTimeRemaining
    };
  }, [userAnswers.length, standardizedQuiz.totalQuestions]);

  // Update timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime.getTime()) / 1000);
      setTimeElapsed(elapsed);
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleAnswerChange = useCallback((questionId: string, answer: string) => {
    setUserAnswers(prev => {
      const existingIndex = prev.findIndex(ua => ua.questionId === questionId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { questionId, answer };
        return updated;
      } else {
        return [...prev, { questionId, answer }];
      }
    });
  }, []);

  const handleSubmit = () => {
    const answeredQuestions = standardizedQuiz.questions.map(question => {
      const userAnswer = userAnswers.find(ua => ua.questionId === question.id);
      const isCorrect = userAnswer?.answer === question.correctAnswer;
      
      return {
        questionId: question.id,
        userAnswer: userAnswer?.answer || '',
        isCorrect
      };
    });

    const correctAnswers = answeredQuestions.filter(aq => aq.isCorrect).length;
    const score = correctAnswers;
    const percentage = Math.round((correctAnswers / standardizedQuiz.totalQuestions) * 100);

    const result: QuizResult = {
      quizId: standardizedQuiz.id,
      score,
      totalQuestions: standardizedQuiz.totalQuestions,
      percentage,
      answeredQuestions,
      completedAt: new Date(),
      timeSpent: timeElapsed
    };

    setIsSubmitted(true);
    onComplete(result);
  };

  const canSubmit = userAnswers.length === standardizedQuiz.totalQuestions;

  const relatedLinks = useMemo(() => generateRelatedLinks(standardizedQuiz), [standardizedQuiz]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Quiz Header */}
      <div className="bg-white rounded-lg shadow-sm border border-grace p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-scripture mb-2">
              {standardizedQuiz.title}
            </h1>
            <p className="text-primary-dark/70">
              {standardizedQuiz.description}
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-1 text-sm text-primary-dark/70">
              <ClockIcon className="h-4 w-4" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-primary-dark/70">
              <CheckCircleIcon className="h-4 w-4" />
              <span>{progress.answeredQuestions}/{standardizedQuiz.totalQuestions}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-grace/20 rounded-full h-2 mb-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-primary-dark/70">
          <span>{Math.round(progress.percentage)}% Complete</span>
          <span>Est. {progress.estimatedTimeRemaining} min remaining</span>
        </div>
      </div>

      {/* Quiz Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">Instructions</h2>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Answer all questions below and click Submit when complete</li>
          <li>• Choose the best answer for each question</li>
          <li>• Results will show immediately after submission</li>
          <li>• This quiz takes approximately {standardizedQuiz.estimatedTime} minutes</li>
          <li>• Test your biblical knowledge and learn from detailed explanations!</li>
        </ul>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {standardizedQuiz.questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionNumber={index + 1}
            userAnswer={userAnswers.find(ua => ua.questionId === question.id)?.answer}
            onAnswerChange={(answer) => handleAnswerChange(question.id, answer)}
            disabled={isSubmitted}
          />
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitted}
          className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 ${
            canSubmit && !isSubmitted
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
              : 'bg-grace/40 text-primary-dark/60 cursor-not-allowed'
          }`}
        >
          {isSubmitted ? 'Quiz Submitted' : canSubmit ? 'Submit Quiz' : `Answer All Questions (${userAnswers.length}/${standardizedQuiz.totalQuestions})`}
        </button>
        
        {!canSubmit && !isSubmitted && (
          <p className="text-sm text-primary-dark/70 mt-2">
            Please answer all questions before submitting.
          </p>
        )}
      </div>

      {/* Internal Links Section - MANDATORY: Under submit button */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Continue Your Bible Study Journey</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex-shrink-0">
                {link.type === 'quiz' && <ArrowRightIcon className="h-5 w-5 text-blue-600" />}
                {link.type === 'book' && <BookOpenIcon className="h-5 w-5 text-green-600" />}
                {link.type === 'theme' && <BookOpenIcon className="h-5 w-5 text-purple-600" />}
                {link.type === 'character' && <BookOpenIcon className="h-5 w-5 text-orange-600" />}
                {link.type === 'hub' && <BookOpenIcon className="h-5 w-5 text-primary-dark/70" />}
              </div>
              <div className="flex-1">
                <div className="font-medium text-scripture group-hover:text-blue-700">
                  {link.title}
                </div>
                <div className="text-sm text-primary-dark/70">
                  {link.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Individual Question Card Component
interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  userAnswer?: string;
  onAnswerChange: (answer: string) => void;
  disabled: boolean;
}

function QuestionCard({ question, questionNumber, userAnswer, onAnswerChange, disabled }: QuestionCardProps) {
  const renderQuestionInput = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => {
              const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
              return (
                <label
                  key={option}
                  className={`flex items-start space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    userAnswer === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-grace hover:border-blue-300 hover:bg-primary-light/50'
                  } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={userAnswer === option}
                    onChange={(e) => onAnswerChange(e.target.value)}
                    disabled={disabled}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-grace"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-scripture mr-2">{optionLetter})</span>
                    <span className="text-scripture">{option}</span>
                  </div>
                </label>
              );
            })}
          </div>
        );

      case 'true-false':
        return (
          <div className="space-y-3">
            {['True', 'False'].map((option) => (
              <label
                key={option}
                className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  userAnswer === option.toLowerCase()
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-grace hover:border-blue-300 hover:bg-primary-light/50'
                } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.toLowerCase()}
                  checked={userAnswer === option.toLowerCase()}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  disabled={disabled}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-grace"
                />
                <span className="text-scripture font-medium">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'fill-blank':
        return (
          <div>
            <input
              type="text"
              value={userAnswer || ''}
              onChange={(e) => onAnswerChange(e.target.value)}
              disabled={disabled}
              placeholder="Type your answer here..."
              className={`w-full p-3 border-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                disabled ? 'bg-grace/20 cursor-not-allowed' : 'border-grace'
              }`}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-grace p-6">
      <div className="mb-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-scripture flex-1">
            <span className="text-blue-600 mr-2">{questionNumber}.</span>
            {question.question}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ml-4 ${
            question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
            question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {question.difficulty}
          </span>
        </div>
        
        {question.verseReference && (
          <div className="text-sm text-primary-dark/70 mb-4">
            <strong>Reference:</strong>{' '}
            {(() => {
              const url = getVerseReferenceUrl(question.verseReference);
              return url ? (
                <Link href={url} className="text-blue-600 hover:underline">
                  {question.verseReference}
                </Link>
              ) : (
                <span>{question.verseReference}</span>
              );
            })()}
          </div>
        )}
      </div>

      {renderQuestionInput()}
    </div>
  );
}