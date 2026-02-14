'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BookSection {
  name: string;
  chaptersRange: string;
  startChapter: number;
  endChapter: number;
  description: string;
  color: string;
}

interface BookChaptersClientProps {
  bookSlug: string;
  bookName: string;
  totalChapters: number;
  sections: BookSection[];
  testament: 'old' | 'new';
}

export default function BookChaptersClient({
  bookSlug,
  bookName,
  totalChapters,
  sections,
  testament,
}: BookChaptersClientProps) {
  const [studyDays, setStudyDays] = useState(7);
  const [showPlan, setShowPlan] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);
  const chaptersPerDay = Math.ceil(totalChapters / studyDays);

  const accentColor = testament === 'old' ? 'amber' : 'blue';

  const studyDayOptions = totalChapters <= 5
    ? [
        { value: totalChapters, label: `${totalChapters} days (1 chapter/day)` },
        { value: Math.max(1, Math.ceil(totalChapters / 2)), label: `${Math.max(1, Math.ceil(totalChapters / 2))} days` },
        { value: 1, label: '1 day (all at once)' },
      ]
    : totalChapters <= 15
    ? [
        { value: 7, label: '1 week (7 days)' },
        { value: totalChapters, label: `${totalChapters} days (1 chapter/day)` },
        { value: 3, label: '3 days' },
      ]
    : [
        { value: 7, label: '1 week (7 days)' },
        { value: 14, label: '2 weeks (14 days)' },
        { value: 30, label: '1 month (30 days)' },
        { value: totalChapters, label: `${totalChapters} days (1 chapter/day)` },
      ];

  const generateStudyPlan = () => {
    const plan: { day: number; chapters: number[]; focus: string }[] = [];
    let currentChapter = 1;

    for (let day = 1; day <= studyDays; day++) {
      const dayChapters: number[] = [];
      for (let i = 0; i < chaptersPerDay && currentChapter <= totalChapters; i++) {
        dayChapters.push(currentChapter);
        currentChapter++;
      }
      if (dayChapters.length === 0) break;

      let focus = bookName;
      const firstCh = dayChapters[0];
      for (const section of sections) {
        if (firstCh >= section.startChapter && firstCh <= section.endChapter) {
          focus = section.name;
          break;
        }
      }

      plan.push({ day, chapters: dayChapters, focus });
    }
    return plan;
  };

  const getFilteredChapters = () => {
    if (!selectedSection) return chapters;
    const section = sections.find(s => s.name === selectedSection);
    if (!section) return chapters;
    return chapters.filter(c => c >= section.startChapter && c <= section.endChapter);
  };

  const filteredChapters = getFilteredChapters();

  // Determine grid columns based on chapter count
  const gridCols = totalChapters <= 10
    ? 'grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-10'
    : totalChapters <= 30
    ? 'grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10'
    : 'grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10';

  return (
    <>
      {/* Study Plan Section */}
      <section className="py-12 md:py-16 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Build Your {bookName} Study Plan
            </h2>
            <p className="text-gray-600">
              Tell us how many days you have, and we&apos;ll create a personalized reading schedule.
              No rush—God&apos;s Word isn&apos;t going anywhere.
            </p>
          </div>

          <div className={`${testament === 'old' ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'} border rounded-xl p-6`}>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <label className="font-medium text-gray-700">I want to finish {bookName} in</label>
              <select
                value={studyDays}
                onChange={(e) => setStudyDays(Number(e.target.value))}
                className={`px-4 py-2 border rounded-lg bg-white focus:ring-2 ${
                  testament === 'old'
                    ? 'border-amber-300 focus:ring-amber-500 focus:border-amber-500'
                    : 'border-blue-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              >
                {studyDayOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <button
                onClick={() => setShowPlan(!showPlan)}
                className={`${
                  testament === 'old'
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white px-6 py-2 rounded-lg font-medium transition-colors`}
              >
                {showPlan ? 'Hide Plan' : 'Generate Plan'}
              </button>
            </div>

            {showPlan && (
              <div className={`bg-white rounded-lg border ${testament === 'old' ? 'border-amber-200' : 'border-blue-200'} overflow-hidden`}>
                <div className={`${testament === 'old' ? 'bg-amber-100' : 'bg-blue-100'} px-4 py-2 border-b ${testament === 'old' ? 'border-amber-200' : 'border-blue-200'}`}>
                  <h3 className={`font-semibold ${testament === 'old' ? 'text-amber-900' : 'text-blue-900'}`}>
                    Your {studyDays}-Day {bookName} Journey ({chaptersPerDay} chapter{chaptersPerDay > 1 ? 's' : ''}/day)
                  </h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Day</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Chapters</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Focus</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Quiz Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generateStudyPlan().map((item) => (
                        <tr key={item.day} className={`border-t border-gray-100 ${testament === 'old' ? 'hover:bg-amber-50' : 'hover:bg-blue-50'}`}>
                          <td className="px-4 py-2 font-medium">Day {item.day}</td>
                          <td className="px-4 py-2">
                            {item.chapters.length === 1
                              ? `Chapter ${item.chapters[0]}`
                              : `Chapters ${item.chapters[0]}-${item.chapters[item.chapters.length - 1]}`
                            }
                          </td>
                          <td className="px-4 py-2 text-gray-600">{item.focus}</td>
                          <td className="px-4 py-2">
                            <Link
                              href={`/${bookSlug}-${item.chapters[0]}-quiz`}
                              className={`${testament === 'old' ? 'text-amber-600 hover:text-amber-800' : 'text-blue-600 hover:text-blue-800'} hover:underline`}
                            >
                              Start Quiz &rarr;
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Chapter Grid Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sections.length > 1 && (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Filter by Section</h2>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <button
                  onClick={() => setSelectedSection(null)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedSection === null
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  All Chapters ({totalChapters})
                </button>
                {sections.map((section) => (
                  <button
                    key={section.name}
                    onClick={() => setSelectedSection(section.name === selectedSection ? null : section.name)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors border ${
                      selectedSection === section.name
                        ? section.color
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {section.name} ({section.chaptersRange})
                  </button>
                ))}
              </div>

              {selectedSection && (
                <p className="text-center text-gray-600 mb-6">
                  {sections.find(s => s.name === selectedSection)?.description}
                </p>
              )}
            </>
          )}

          <div className={`grid ${gridCols} gap-3 md:gap-4`}>
            {filteredChapters.map((chapter) => (
              <div
                key={chapter}
                className="flex flex-col rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <Link
                  href={`/${bookSlug}-${chapter}-quiz`}
                  className={`group flex-1 flex flex-col items-center justify-center py-3 transition-colors ${
                    testament === 'old' ? 'hover:bg-amber-50' : 'hover:bg-blue-50'
                  }`}
                  title={`${bookName} ${chapter} Quiz`}
                >
                  <span className={`text-lg md:text-xl font-bold text-gray-700 ${
                    testament === 'old' ? 'group-hover:text-amber-700' : 'group-hover:text-blue-700'
                  }`}>
                    {chapter}
                  </span>
                </Link>
                <Link
                  href={`/chapters/${bookSlug}/${chapter}`}
                  className={`text-center text-xs py-1.5 border-t border-gray-100 transition-colors ${
                    testament === 'old'
                      ? 'text-amber-600 hover:bg-amber-50'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                  title={`Read ${bookName} ${chapter}`}
                >
                  Read
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-12 md:py-16 ${
        testament === 'old'
          ? 'bg-gradient-to-br from-amber-800 to-amber-900'
          : 'bg-gradient-to-br from-blue-800 to-blue-900'
      } text-white`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            You&apos;ve Got This. Start Anywhere.
          </h2>
          <p className={`${testament === 'old' ? 'text-amber-100' : 'text-blue-100'} mb-4 text-lg`}>
            Whether you&apos;re a {bookName} veteran or reading it for the first time,
            these quizzes will deepen your understanding and surprise you with details you might have missed.
          </p>
          <p className={`${testament === 'old' ? 'text-amber-200' : 'text-blue-200'} mb-8`}>
            Pro tip: Start with Chapter 1 and work your way through, or jump to any chapter that interests you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${bookSlug}-1-quiz`}
              className={`${
                testament === 'old'
                  ? 'bg-white text-amber-900 hover:bg-amber-50'
                  : 'bg-white text-blue-900 hover:bg-blue-50'
              } px-8 py-3 rounded-lg font-semibold transition-colors`}
            >
              Start with Chapter 1
            </Link>
            <Link
              href={`/${bookSlug}-quiz`}
              className={`${
                testament === 'old'
                  ? 'bg-amber-700 hover:bg-amber-600 border-amber-500'
                  : 'bg-blue-700 hover:bg-blue-600 border-blue-500'
              } border px-8 py-3 rounded-lg font-semibold transition-colors`}
            >
              Take Complete Book Quiz
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
