'use client';

import { useState } from 'react';
import Link from 'next/link';

const chapterData: Record<number, { title: string; readTime: number; verses: number; difficulty: 'easy' | 'medium' | 'hard'; keyEvent: string }> = {
  1: { title: 'Creation', readTime: 4, verses: 31, difficulty: 'easy', keyEvent: 'God creates the world in six days' },
  2: { title: 'Garden of Eden', readTime: 3, verses: 25, difficulty: 'easy', keyEvent: 'Adam and Eve in paradise' },
  3: { title: 'The Fall', readTime: 3, verses: 24, difficulty: 'medium', keyEvent: 'Sin enters the world' },
  4: { title: 'Cain and Abel', readTime: 3, verses: 26, difficulty: 'medium', keyEvent: 'First murder' },
  5: { title: 'Genealogy', readTime: 4, verses: 32, difficulty: 'hard', keyEvent: 'Adam to Noah lineage' },
  6: { title: 'Wickedness', readTime: 3, verses: 22, difficulty: 'medium', keyEvent: 'God decides to flood the earth' },
  7: { title: 'The Flood', readTime: 3, verses: 24, difficulty: 'easy', keyEvent: 'Noah enters the ark' },
  8: { title: 'Flood Ends', readTime: 3, verses: 22, difficulty: 'easy', keyEvent: 'The dove and olive branch' },
  9: { title: 'Noahic Covenant', readTime: 3, verses: 29, difficulty: 'medium', keyEvent: 'Rainbow covenant' },
  10: { title: 'Table of Nations', readTime: 4, verses: 32, difficulty: 'hard', keyEvent: 'Noah\'s descendants' },
  11: { title: 'Tower of Babel', readTime: 3, verses: 32, difficulty: 'medium', keyEvent: 'Languages confused' },
  12: { title: 'Call of Abram', readTime: 3, verses: 20, difficulty: 'easy', keyEvent: 'Abram leaves Ur' },
  13: { title: 'Lot Separates', readTime: 2, verses: 18, difficulty: 'easy', keyEvent: 'Abram and Lot part ways' },
  14: { title: 'War of Kings', readTime: 3, verses: 24, difficulty: 'hard', keyEvent: 'Melchizedek appears' },
  15: { title: 'Covenant', readTime: 2, verses: 21, difficulty: 'medium', keyEvent: 'Stars promise' },
  16: { title: 'Hagar & Ishmael', readTime: 2, verses: 16, difficulty: 'easy', keyEvent: 'Ishmael born' },
  17: { title: 'Circumcision', readTime: 3, verses: 27, difficulty: 'medium', keyEvent: 'Covenant sign given' },
  18: { title: 'Three Visitors', readTime: 4, verses: 33, difficulty: 'medium', keyEvent: 'Sarah laughs' },
  19: { title: 'Sodom Destroyed', readTime: 4, verses: 38, difficulty: 'medium', keyEvent: 'Lot\'s wife looks back' },
  20: { title: 'Abraham & Abimelech', readTime: 2, verses: 18, difficulty: 'easy', keyEvent: 'Sarah taken again' },
  21: { title: 'Isaac Born', readTime: 3, verses: 34, difficulty: 'easy', keyEvent: 'Promise fulfilled' },
  22: { title: 'Binding of Isaac', readTime: 3, verses: 24, difficulty: 'medium', keyEvent: 'Ultimate test of faith' },
  23: { title: 'Sarah Dies', readTime: 2, verses: 20, difficulty: 'easy', keyEvent: 'Cave of Machpelah' },
  24: { title: 'Wife for Isaac', readTime: 6, verses: 67, difficulty: 'medium', keyEvent: 'Rebekah found' },
  25: { title: 'Jacob & Esau', readTime: 4, verses: 34, difficulty: 'medium', keyEvent: 'Birthright sold' },
  26: { title: 'Isaac & Wells', readTime: 4, verses: 35, difficulty: 'easy', keyEvent: 'Conflicts over water' },
  27: { title: 'Stolen Blessing', readTime: 5, verses: 46, difficulty: 'medium', keyEvent: 'Jacob deceives Isaac' },
  28: { title: 'Jacob\'s Ladder', readTime: 3, verses: 22, difficulty: 'easy', keyEvent: 'Angels ascending' },
  29: { title: 'Jacob Marries', readTime: 4, verses: 35, difficulty: 'medium', keyEvent: 'Leah and Rachel' },
  30: { title: 'Jacob\'s Children', readTime: 5, verses: 43, difficulty: 'hard', keyEvent: 'Twelve tribes begin' },
  31: { title: 'Jacob Flees', readTime: 6, verses: 55, difficulty: 'medium', keyEvent: 'Leaving Laban' },
  32: { title: 'Wrestling God', readTime: 4, verses: 32, difficulty: 'medium', keyEvent: 'Jacob becomes Israel' },
  33: { title: 'Meeting Esau', readTime: 2, verses: 20, difficulty: 'easy', keyEvent: 'Brothers reunite' },
  34: { title: 'Dinah', readTime: 4, verses: 31, difficulty: 'hard', keyEvent: 'Shechem incident' },
  35: { title: 'Return to Bethel', readTime: 3, verses: 29, difficulty: 'medium', keyEvent: 'Rachel dies' },
  36: { title: 'Esau\'s Line', readTime: 5, verses: 43, difficulty: 'hard', keyEvent: 'Edom genealogy' },
  37: { title: 'Joseph Sold', readTime: 4, verses: 36, difficulty: 'easy', keyEvent: 'Coat of many colors' },
  38: { title: 'Judah & Tamar', readTime: 4, verses: 30, difficulty: 'hard', keyEvent: 'Unlikely ancestry' },
  39: { title: 'Joseph in Egypt', readTime: 3, verses: 23, difficulty: 'easy', keyEvent: 'Potiphar\'s house' },
  40: { title: 'Dreams in Prison', readTime: 3, verses: 23, difficulty: 'medium', keyEvent: 'Butler and baker' },
  41: { title: 'Pharaoh\'s Dreams', readTime: 6, verses: 57, difficulty: 'medium', keyEvent: 'Joseph rises to power' },
  42: { title: 'Brothers Come', readTime: 4, verses: 38, difficulty: 'medium', keyEvent: 'First trip to Egypt' },
  43: { title: 'Second Trip', readTime: 4, verses: 34, difficulty: 'medium', keyEvent: 'Benjamin goes' },
  44: { title: 'Silver Cup', readTime: 4, verses: 34, difficulty: 'medium', keyEvent: 'Judah\'s plea' },
  45: { title: 'Joseph Revealed', readTime: 3, verses: 28, difficulty: 'easy', keyEvent: 'I am Joseph!' },
  46: { title: 'Jacob to Egypt', readTime: 4, verses: 34, difficulty: 'medium', keyEvent: 'Family reunites' },
  47: { title: 'Settling Goshen', readTime: 4, verses: 31, difficulty: 'medium', keyEvent: 'Egypt during famine' },
  48: { title: 'Ephraim & Manasseh', readTime: 3, verses: 22, difficulty: 'medium', keyEvent: 'Crossed hands blessing' },
  49: { title: 'Jacob\'s Blessing', readTime: 4, verses: 33, difficulty: 'hard', keyEvent: 'Prophecies for twelve sons' },
  50: { title: 'Jacob\'s Death', readTime: 3, verses: 26, difficulty: 'easy', keyEvent: 'Coffin in Egypt' },
};

const genesisSections = [
  { name: 'Primeval History', chapters: '1-11', description: 'Creation, Fall, Flood, and Babel', color: 'bg-blue-100 border-blue-300 text-blue-800' },
  { name: 'Abraham\'s Story', chapters: '12-25', description: 'The father of faith and God\'s covenant', color: 'bg-emerald-100 border-emerald-300 text-emerald-800' },
  { name: 'Jacob\'s Journey', chapters: '25-36', description: 'Deception, transformation, and twelve sons', color: 'bg-amber-100 border-amber-300 text-amber-800' },
  { name: 'Joseph\'s Saga', chapters: '37-50', description: 'From pit to palace to providence', color: 'bg-purple-100 border-purple-300 text-purple-800' },
];

export default function GenesisChaptersClient() {
  const [studyDays, setStudyDays] = useState(7);
  const [showPlan, setShowPlan] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const totalChapters = 50;
  const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);
  const chaptersPerDay = Math.ceil(totalChapters / studyDays);

  const generateStudyPlan = () => {
    const plan: { day: number; chapters: number[]; focus: string }[] = [];
    let currentChapter = 1;
    
    for (let day = 1; day <= studyDays; day++) {
      const dayChapters: number[] = [];
      for (let i = 0; i < chaptersPerDay && currentChapter <= totalChapters; i++) {
        dayChapters.push(currentChapter);
        currentChapter++;
      }
      
      let focus = '';
      const firstCh = dayChapters[0];
      if (firstCh <= 11) focus = 'Primeval History';
      else if (firstCh <= 25) focus = 'Abraham\'s Story';
      else if (firstCh <= 36) focus = 'Jacob\'s Journey';
      else focus = 'Joseph\'s Saga';
      
      plan.push({ day, chapters: dayChapters, focus });
    }
    return plan;
  };

  const getFilteredChapters = () => {
    if (!selectedSection) return chapters;
    
    switch (selectedSection) {
      case 'Primeval History': return chapters.filter(c => c <= 11);
      case 'Abraham\'s Story': return chapters.filter(c => c >= 12 && c <= 25);
      case 'Jacob\'s Journey': return chapters.filter(c => c >= 25 && c <= 36);
      case 'Joseph\'s Saga': return chapters.filter(c => c >= 37);
      default: return chapters;
    }
  };

  const filteredChapters = getFilteredChapters();

  return (
    <>
      <section className="py-12 md:py-16 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-scripture mb-2">
              Build Your Genesis Study Plan
            </h2>
            <p className="text-primary-dark/70">
              Tell us how many days you have, and we&apos;ll create a personalized reading schedule. 
              No rush—God&apos;s Word isn&apos;t going anywhere.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <label className="font-medium text-primary-dark/80">I want to finish Genesis in</label>
              <select
                value={studyDays}
                onChange={(e) => setStudyDays(Number(e.target.value))}
                className="px-4 py-2 border border-amber-300 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value={7}>1 week (7 days)</option>
                <option value={14}>2 weeks (14 days)</option>
                <option value={30}>1 month (30 days)</option>
                <option value={50}>50 days (1 chapter/day)</option>
              </select>
              <button
                onClick={() => setShowPlan(!showPlan)}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {showPlan ? 'Hide Plan' : 'Generate Plan'}
              </button>
            </div>

            {showPlan && (
              <div className="bg-white rounded-lg border border-amber-200 overflow-hidden">
                <div className="bg-amber-100 px-4 py-2 border-b border-amber-200">
                  <h3 className="font-semibold text-amber-900">
                    Your {studyDays}-Day Genesis Journey ({chaptersPerDay} chapter{chaptersPerDay > 1 ? 's' : ''}/day)
                  </h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-primary-light/30 sticky top-0">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-primary-dark/70">Day</th>
                        <th className="px-4 py-2 text-left font-medium text-primary-dark/70">Chapters</th>
                        <th className="px-4 py-2 text-left font-medium text-primary-dark/70">Focus</th>
                        <th className="px-4 py-2 text-left font-medium text-primary-dark/70">Quiz Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generateStudyPlan().map((item) => (
                        <tr key={item.day} className="border-t border-grace/50 hover:bg-amber-50">
                          <td className="px-4 py-2 font-medium">Day {item.day}</td>
                          <td className="px-4 py-2">
                            {item.chapters.length === 1 
                              ? `Chapter ${item.chapters[0]}`
                              : `Chapters ${item.chapters[0]}-${item.chapters[item.chapters.length - 1]}`
                            }
                          </td>
                          <td className="px-4 py-2 text-primary-dark/70">{item.focus}</td>
                          <td className="px-4 py-2">
                            <Link 
                              href={`/genesis-${item.chapters[0]}-quiz`}
                              className="text-amber-600 hover:text-amber-800 hover:underline"
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

      <section className="py-8 bg-primary-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-scripture mb-4 text-center">Filter by Story Section</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setSelectedSection(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSection === null 
                  ? 'bg-scripture text-white' 
                  : 'bg-white border border-grace text-primary-dark/80 hover:border-primary-dark/40'
              }`}
            >
              All Chapters (50)
            </button>
            {genesisSections.map((section) => (
              <button
                key={section.name}
                onClick={() => setSelectedSection(section.name === selectedSection ? null : section.name)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors border ${
                  selectedSection === section.name 
                    ? section.color
                    : 'bg-white border-grace text-primary-dark/80 hover:border-primary-dark/40'
                }`}
              >
                {section.name} ({section.chapters})
              </button>
            ))}
          </div>

          {selectedSection && (
            <p className="text-center text-primary-dark/70 mb-6">
              {genesisSections.find(s => s.name === selectedSection)?.description}
            </p>
          )}

          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 md:gap-4">
            {filteredChapters.map((chapter) => {
              const data = chapterData[chapter];
              return (
                <Link
                  key={chapter}
                  href={`/genesis-${chapter}-quiz`}
                  className={`group relative aspect-square flex flex-col items-center justify-center rounded-lg transition-all duration-200 bg-white hover:bg-amber-50 border border-grace hover:border-amber-300 shadow-sm hover:shadow-md`}
                  title={data ? `Genesis ${chapter}: ${data.title} (${data.readTime} min read)` : `Genesis ${chapter} Quiz`}
                >
                  <span className="text-lg md:text-xl font-bold text-primary-dark/80 group-hover:text-amber-700">
                    {chapter}
                  </span>
                  {data && (
                    <span className={`absolute bottom-1 text-[10px] px-1 rounded ${
                      data.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      data.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {data.readTime}m
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center items-center gap-6 text-sm text-primary-dark/70">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">3m</span>
              <span>Easy</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">4m</span>
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">5m</span>
              <span>Hard</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-scripture mb-2">
              Chapter-by-Chapter Breakdown
            </h2>
            <p className="text-primary-dark/70">
              Pick your battles wisely. Here&apos;s what you&apos;re getting into.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-grace">
            <table className="w-full text-sm">
              <thead className="bg-primary-light/30">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-primary-dark/80">Ch</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-dark/80">Title</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary-dark/80">Key Event</th>
                  <th className="px-4 py-3 text-center font-semibold text-primary-dark/80">Verses</th>
                  <th className="px-4 py-3 text-center font-semibold text-primary-dark/80">Read</th>
                  <th className="px-4 py-3 text-center font-semibold text-primary-dark/80">Quiz</th>
                  <th className="px-4 py-3 text-center font-semibold text-primary-dark/80">Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(chapterData).slice(0, 15).map(([ch, data]) => (
                  <tr key={ch} className="border-t border-grace/50 hover:bg-amber-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-amber-800">{ch}</td>
                    <td className="px-4 py-3 font-medium text-scripture">{data.title}</td>
                    <td className="px-4 py-3 text-primary-dark/70">{data.keyEvent}</td>
                    <td className="px-4 py-3 text-center text-primary-dark/60">{data.verses}</td>
                    <td className="px-4 py-3 text-center text-primary-dark/60">{data.readTime}m</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        data.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                        data.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {data.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        href={`/genesis-${ch}-quiz`}
                        className="text-amber-600 hover:text-amber-800 font-medium hover:underline"
                      >
                        Take Quiz
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-primary-dark/60">Showing first 15 chapters. Click any chapter above to see its quiz.</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-br from-amber-800 to-amber-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            You&apos;ve Got This. Start Anywhere.
          </h2>
          <p className="text-amber-100 mb-4 text-lg">
            Whether you&apos;re a Genesis veteran or reading it for the first time, 
            these quizzes will deepen your understanding and surprise you with details you might have missed.
          </p>
          <p className="text-amber-200 mb-8">
            Pro tip: Start with Genesis 1 (Creation) or jump to Genesis 37 (Joseph&apos;s story) if you want drama.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/genesis-1-quiz"
              className="bg-white text-amber-900 hover:bg-amber-50 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Start with Creation (Ch 1)
            </Link>
            <Link
              href="/genesis-37-quiz"
              className="bg-amber-700 hover:bg-amber-600 border border-amber-500 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Jump to Joseph (Ch 37)
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-primary-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-scripture mb-8 text-center">
            Continue Your Old Testament Journey
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/exodus-chapters" className="p-6 bg-white rounded-xl hover:shadow-lg transition-shadow border border-grace/50">
              <h3 className="font-semibold text-scripture mb-2">Exodus Chapters</h3>
              <p className="text-sm text-primary-dark/70">The sequel: Moses, plagues, and freedom from Egypt</p>
            </Link>
            <Link href="/creation-quiz" className="p-6 bg-white rounded-xl hover:shadow-lg transition-shadow border border-grace/50">
              <h3 className="font-semibold text-scripture mb-2">Creation Deep Dive</h3>
              <p className="text-sm text-primary-dark/70">Focus quiz on the seven days of creation</p>
            </Link>
            <Link href="/noahs-ark-quiz" className="p-6 bg-white rounded-xl hover:shadow-lg transition-shadow border border-grace/50">
              <h3 className="font-semibold text-scripture mb-2">Noah&apos;s Ark Quiz</h3>
              <p className="text-sm text-primary-dark/70">Test your flood knowledge</p>
            </Link>
            <Link href="/books/genesis" className="p-6 bg-white rounded-xl hover:shadow-lg transition-shadow border border-grace/50">
              <h3 className="font-semibold text-scripture mb-2">Genesis Introduction</h3>
              <p className="text-sm text-primary-dark/70">Themes, outline, key verses, and historical context</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
