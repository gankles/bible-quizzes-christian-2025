'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BookToolsProps {
  bookName: string;
  bookSlug: string;
  chapters: number;
  keyThemes: string[];
}

const readingSpeedOptions = [
  { label: 'Slow & Meditative', wpm: 100, description: 'Taking time to reflect' },
  { label: 'Average Reader', wpm: 200, description: 'Comfortable pace' },
  { label: 'Fast Reader', wpm: 300, description: 'Quick comprehension' },
];

const avgVersesPerChapter: Record<string, number> = {
  genesis: 26, exodus: 28, leviticus: 25, numbers: 32, deuteronomy: 28,
  joshua: 20, judges: 21, ruth: 15, '1-samuel': 26, '2-samuel': 22,
  '1-kings': 30, '2-kings': 24, '1-chronicles': 25, '2-chronicles': 26,
  ezra: 20, nehemiah: 24, esther: 16, job: 26, psalms: 12, proverbs: 24,
  ecclesiastes: 14, 'song-of-solomon': 12, isaiah: 22, jeremiah: 30,
  lamentations: 19, ezekiel: 28, daniel: 18, hosea: 12, joel: 14,
  amos: 12, obadiah: 21, jonah: 11, micah: 12, nahum: 13, habakkuk: 14,
  zephaniah: 12, haggai: 14, zechariah: 15, malachi: 14,
  matthew: 33, mark: 27, luke: 36, john: 28, acts: 27, romans: 22,
  '1-corinthians': 27, '2-corinthians': 16, galatians: 19, ephesians: 22,
  philippians: 19, colossians: 19, '1-thessalonians': 17, '2-thessalonians': 12,
  '1-timothy': 14, '2-timothy': 14, titus: 10, philemon: 25, hebrews: 20,
  james: 17, '1-peter': 18, '2-peter': 15, '1-john': 16, '2-john': 13,
  '3-john': 14, jude: 25, revelation: 18,
};

export default function BookTools({ bookName, bookSlug, chapters, keyThemes }: BookToolsProps) {
  const [readingSpeed, setReadingSpeed] = useState(200);
  const [showCalculation, setShowCalculation] = useState(false);

  const avgVerses = avgVersesPerChapter[bookSlug] || 20;
  const totalVerses = avgVerses * chapters;
  const wordsPerVerse = 25;
  const totalWords = totalVerses * wordsPerVerse;
  const readingTimeMinutes = Math.round(totalWords / readingSpeed);
  const readingTimeHours = (readingTimeMinutes / 60).toFixed(1);

  const generateQuickPlan = () => {
    if (chapters <= 7) return `Read 1 chapter per day for ${chapters} days`;
    if (chapters <= 14) return `Read 2 chapters per day for ${Math.ceil(chapters / 2)} days`;
    if (chapters <= 30) return `Read 3 chapters per day for ${Math.ceil(chapters / 3)} days`;
    return `Read 5 chapters per day for ${Math.ceil(chapters / 5)} days`;
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-50 rounded-xl border border-blue-100 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Reading Time Calculator
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        How long will it take you to read {bookName}? Let&apos;s find out.
      </p>

      <div className="bg-white rounded-lg p-4 mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Your reading pace:</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {readingSpeedOptions.map((option) => (
            <button
              key={option.wpm}
              onClick={() => { setReadingSpeed(option.wpm); setShowCalculation(true); }}
              className={`p-3 rounded-lg border-2 transition-all text-left ${
                readingSpeed === option.wpm
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <span className="font-medium text-gray-900 block">{option.label}</span>
              <span className="text-xs text-gray-500">{option.description}</span>
            </button>
          ))}
        </div>
      </div>

      {showCalculation && (
        <div className="bg-white rounded-lg p-4 border border-blue-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{chapters}</div>
              <div className="text-xs text-gray-500">Chapters</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">~{totalVerses.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Verses</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{readingTimeMinutes}m</div>
              <div className="text-xs text-gray-500">Total Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{readingTimeHours}h</div>
              <div className="text-xs text-gray-500">Hours</div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-700">
              <strong>Quick plan:</strong> {generateQuickPlan()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              At {readingSpeed} words per minute, you&apos;ll finish {bookName} in about {readingTimeHours} hours of total reading.
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-blue-100">
        <h3 className="font-semibold text-gray-900 mb-3">Ready to test your knowledge?</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${bookSlug}-quiz`}
            className="bg-blue-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Take {bookName} Book Quiz
          </Link>
          <Link
            href={`/${bookSlug}-chapters`}
            className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Browse Chapter Quizzes
          </Link>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-blue-100">
        <h3 className="font-semibold text-gray-900 mb-2">Key themes to look for:</h3>
        <p className="text-sm text-gray-600">
          As you read {bookName}, watch for these recurring ideas: {keyThemes.slice(0, 4).join(', ')}.
          They&apos;ll come up in the quizzes!
        </p>
      </div>
    </section>
  );
}
