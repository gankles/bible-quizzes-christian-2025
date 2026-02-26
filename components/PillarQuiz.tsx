'use client';

import { useState } from 'react';
import { Quiz, QuizQuestion } from '@/lib/types';

interface PillarQuizProps {
  quiz: Quiz;
}

export default function PillarQuiz({ quiz }: PillarQuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionId: string, answer: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = quiz.questions.length;

  const correctCount = submitted
    ? quiz.questions.filter(q => answers[q.id] === q.correctAnswer).length
    : 0;

  const percentage = submitted ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return (
    <div>
      {submitted && (
        <div className={`rounded-lg p-6 mb-6 text-center ${percentage >= 80 ? 'bg-green-50 border border-green-200' : percentage >= 60 ? 'bg-amber-50 border border-amber-200' : 'bg-red-50 border border-red-200'}`}>
          <p className="text-3xl font-bold mb-1">{correctCount}/{totalQuestions}</p>
          <p className="text-lg font-medium mb-1">{percentage}% Correct</p>
          <p className="text-sm text-primary-dark/60 mb-3">
            {percentage >= 90 ? 'Outstanding! You know John 3:16 deeply.' : percentage >= 70 ? 'Great job! Review the explanations below to strengthen your knowledge.' : 'Keep studying! Read through the word-by-word study above and try again.'}
          </p>
          <button onClick={handleRetake} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors text-sm uppercase tracking-wider">
            Retake Quiz
          </button>
        </div>
      )}

      {/* Progress bar */}
      {!submitted && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-primary-dark/50 mb-1">
            <span>{totalAnswered} of {totalQuestions} answered</span>
            <span>{Math.round((totalAnswered / totalQuestions) * 100)}%</span>
          </div>
          <div className="w-full bg-grace/30 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(totalAnswered / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="space-y-6">
        {quiz.questions.map((q: QuizQuestion, idx: number) => {
          const userAnswer = answers[q.id];
          const isCorrect = submitted && userAnswer === q.correctAnswer;
          const isWrong = submitted && userAnswer && userAnswer !== q.correctAnswer;

          return (
            <div key={q.id} className={`rounded-lg border p-4 ${submitted ? (isCorrect ? 'border-green-300 bg-green-50/50' : isWrong ? 'border-red-300 bg-red-50/50' : 'border-amber-300 bg-amber-50/50') : 'border-grace dark:border-dark-border'}`}>
              <p className="font-medium text-scripture dark:text-white mb-3">
                <span className="text-blue-600 font-bold mr-2">{idx + 1}.</span>
                {q.question}
              </p>

              {q.type === 'fill-in-blank' || q.type === 'fill-blank' ? (
                <div>
                  <input
                    type="text"
                    value={userAnswer || ''}
                    onChange={(e) => handleAnswer(q.id, e.target.value)}
                    disabled={submitted}
                    placeholder="Type your answer..."
                    className="w-full border border-grace dark:border-dark-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  {(q.options || []).map((option: string) => {
                    const isSelected = userAnswer === option;
                    const isThisCorrect = submitted && option === q.correctAnswer;
                    const isThisWrong = submitted && isSelected && option !== q.correctAnswer;

                    return (
                      <button
                        key={option}
                        onClick={() => handleAnswer(q.id, option)}
                        disabled={submitted}
                        className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                          isThisCorrect
                            ? 'border-green-400 bg-green-100 text-green-800 font-medium'
                            : isThisWrong
                            ? 'border-red-400 bg-red-100 text-red-800'
                            : isSelected
                            ? 'border-blue-400 bg-blue-50 text-blue-800'
                            : 'border-grace dark:border-dark-border hover:border-blue-300 hover:bg-blue-50/50'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}

              {submitted && (
                <div className="mt-3 text-sm">
                  {!userAnswer && (
                    <p className="text-amber-600 font-medium mb-1">Not answered — Correct answer: {q.correctAnswer}</p>
                  )}
                  <p className="text-primary-dark/70 dark:text-primary-dark/40 leading-relaxed">{q.explanation}</p>
                  <p className="text-xs text-blue-600 mt-1 font-medium">{q.verseReference}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            disabled={totalAnswered === 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-10 rounded-lg transition-colors text-sm uppercase tracking-wider"
          >
            Submit Answers ({totalAnswered}/{totalQuestions})
          </button>
          {totalAnswered < totalQuestions && totalAnswered > 0 && (
            <p className="text-xs text-primary-dark/50 mt-2">You can submit with unanswered questions — they will be marked incorrect.</p>
          )}
        </div>
      )}
    </div>
  );
}
