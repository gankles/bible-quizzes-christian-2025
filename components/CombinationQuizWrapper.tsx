'use client'

import { Quiz, QuizResult } from '@/lib/types'
import QuizInterface from './QuizInterface'
import { useState } from 'react'

interface Props {
    quiz: Quiz
}

export default function CombinationQuizWrapper({ quiz }: Props) {
    const [result, setResult] = useState<QuizResult | null>(null)

    const handleComplete = (res: QuizResult) => {
        setResult(res)
        console.log('Combination quiz completed:', res)
    }

    if (result) {
        return (
            <div className="bg-white/10 rounded-lg p-6 text-center animate-in fade-in zoom-in duration-300">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold mb-2 text-white">Great job!</h3>
                <p className="text-blue-100 mb-4">You scored {result.score} out of {result.totalQuestions}</p>
                <button
                    onClick={() => setResult(null)}
                    className="bg-white text-blue-600 font-bold py-2 px-6 rounded-xl hover:bg-blue-50 transition-colors"
                >
                    Try Again
                </button>
            </div>
        )
    }

    return (
        <QuizInterface
            quiz={quiz}
            onComplete={handleComplete}
        />
    )
}
