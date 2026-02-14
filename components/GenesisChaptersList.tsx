'use client';

import { useState } from 'react';
import Link from 'next/link';

// Genesis chapters with brief descriptions for list format
const GENESIS_CHAPTERS_LIST = [
  { chapter: 1, title: 'Creation of the World', description: 'In the beginning God created the heavens and the earth' },
  { chapter: 2, title: 'Garden of Eden', description: 'God forms man and woman, places them in Eden' },
  { chapter: 3, title: 'The Fall', description: 'Temptation, sin enters the world, expulsion from Eden' },
  { chapter: 4, title: 'Cain and Abel', description: 'First murder, offerings, descendants of Cain' },
  { chapter: 5, title: 'Genealogies to Noah', description: 'Long lifespans, Enoch\'s translation, lineage to Noah' },
  { chapter: 6, title: 'Wickedness and the Ark', description: 'God\'s grief over sin, Noah builds the ark' },
  { chapter: 7, title: 'The Great Flood Begins', description: 'Animals enter ark, flood destroys the earth' },
  { chapter: 8, title: 'Waters Recede', description: 'Dove and raven, waters dry up, Noah\'s sacrifice' },
  { chapter: 9, title: 'Rainbow Covenant', description: 'God\'s covenant with Noah, new permissions and laws' },
  { chapter: 10, title: 'Nations Divided', description: 'Table of nations, descendants of Noah\'s sons' },
  { chapter: 11, title: 'Tower of Babel', description: 'Language confusion, scattering, genealogy to Abram' },
  { chapter: 12, title: 'The Call of Abram', description: 'Leave your country, God\'s promises, journey to Egypt' },
  { chapter: 13, title: 'Abram and Lot Separate', description: 'Choose your land, Lot chooses Sodom' },
  { chapter: 14, title: 'War of the Kings', description: 'Abram rescues Lot, meets Melchizedek' },
  { chapter: 15, title: 'God\'s Covenant', description: 'Stars in the sky, righteousness by faith' },
  { chapter: 16, title: 'Hagar and Ishmael', description: 'Sarai\'s plan, angel visits Hagar' },
  { chapter: 17, title: 'Circumcision Covenant', description: 'Abraham and Sarah\'s new names, circumcision sign' },
  { chapter: 18, title: 'Three Visitors', description: 'Promise of Isaac, intercession for Sodom' },
  { chapter: 19, title: 'Sodom and Gomorrah', description: 'Angels rescue Lot, cities destroyed' },
  { chapter: 20, title: 'Abraham and Abimelech', description: 'Sarah taken, God protects her' },
  { chapter: 21, title: 'Birth of Isaac', description: 'Promise fulfilled, Hagar and Ishmael sent away' },
  { chapter: 22, title: 'Sacrifice of Isaac', description: 'Ultimate test of faith, God provides a ram' },
  { chapter: 23, title: 'Death of Sarah', description: 'Abraham buys burial place, mourns Sarah' },
  { chapter: 24, title: 'Isaac and Rebekah', description: 'Abraham\'s servant finds wife for Isaac' },
  { chapter: 25, title: 'Death of Abraham', description: 'Abraham dies, Esau and Jacob born' },
  { chapter: 26, title: 'Isaac and Abimelech', description: 'Isaac in Gerar, disputes over wells' },
  { chapter: 27, title: 'Jacob Steals the Blessing', description: 'Deception with goat skins, Esau\'s anger' },
  { chapter: 28, title: 'Jacob\'s Ladder', description: 'Dream at Bethel, angels ascending and descending' },
  { chapter: 29, title: 'Jacob\'s Marriages', description: 'Works for Rachel, receives Leah first' },
  { chapter: 30, title: 'Birth of Jacob\'s Children', description: 'Rivalry between wives, sons born' },
  { chapter: 31, title: 'Jacob Flees from Laban', description: 'Secret departure, Laban pursues' },
  { chapter: 32, title: 'Wrestling with God', description: 'Jacob becomes Israel, prepares to meet Esau' },
  { chapter: 33, title: 'Jacob Meets Esau', description: 'Reconciliation, gifts, brothers part peacefully' },
  { chapter: 34, title: 'Dinah and Shechem', description: 'Defilement and revenge by Simeon and Levi' },
  { chapter: 35, title: 'Return to Bethel', description: 'Worship at Bethel, Rachel dies, Isaac dies' },
  { chapter: 36, title: 'Descendants of Esau', description: 'Genealogies of Esau and Edomite kings' },
  { chapter: 37, title: 'Joseph\'s Dreams', description: 'Coat of many colors, sold into slavery' },
  { chapter: 38, title: 'Judah and Tamar', description: 'Judah\'s story intertwined with Joseph\'s' },
  { chapter: 39, title: 'Joseph in Egypt', description: 'Potiphar\'s house, false accusation, prison' },
  { chapter: 40, title: 'Dreams in Prison', description: 'Butler and baker, Joseph interprets dreams' },
  { chapter: 41, title: 'Pharaoh\'s Dreams', description: 'Seven years plenty, seven years famine' },
  { chapter: 42, title: 'First Trip to Egypt', description: 'Brothers come for grain, don\'t recognize Joseph' },
  { chapter: 43, title: 'Second Trip to Egypt', description: 'Benjamin comes, feast with Joseph' },
  { chapter: 44, title: 'The Silver Cup', description: 'Test with Benjamin, Judah\'s plea' },
  { chapter: 45, title: 'Joseph Reveals Himself', description: 'I am Joseph, God sent me before you' },
  { chapter: 46, title: 'Jacob\'s Family to Egypt', description: 'God appears to Jacob, family moves to Egypt' },
  { chapter: 47, title: 'Jacob Blesses Pharaoh', description: 'Jacob meets Pharaoh, famine continues' },
  { chapter: 48, title: 'Jacob Blesses Joseph\'s Sons', description: 'Ephraim and Manasseh blessed' },
  { chapter: 49, title: 'Jacob\'s Prophecy', description: 'Blessings and prophecies over twelve sons' },
  { chapter: 50, title: 'Death of Jacob and Joseph', description: 'Burial in Canaan, Joseph\'s final words' }
];

export default function GenesisChaptersList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChapters = GENESIS_CHAPTERS_LIST.filter(item => 
    item.chapter.toString().includes(searchTerm) ||
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Genesis Chapter Quizzes</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore every chapter of Genesis from creation to Joseph's death. Each quiz focuses on the key events and lessons of that chapter.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder="Search chapters, titles, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">50</div>
              <div className="text-sm text-gray-600">Chapters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">1,533</div>
              <div className="text-sm text-gray-600">Verses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">800+</div>
              <div className="text-sm text-gray-600">Quiz Questions</div>
            </div>
          </div>

          {/* Ultimate Genesis Challenge */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                ✨ Ultimate Genesis Challenge
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Test your comprehensive knowledge of all 50 Genesis chapters with our ultimate 25-question quiz covering Creation, the Patriarchs, and the foundations of faith.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/genesis-quiz"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Take 25-Question Genesis Quiz
                </Link>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>⏱️</span>
                    <span>~15 minutes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📊</span>
                    <span>Difficulty: Medium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content - List Format */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Genesis Chapters ({filteredChapters.length} chapters)
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredChapters.map((item) => (
              <Link
                key={item.chapter}
                href={`/genesis-${item.chapter}-quiz`}
                className="block p-6 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                        Genesis {item.chapter} Quiz
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredChapters.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No chapters found</h3>
              <p className="text-gray-600 mb-4">
                Try searching for a different chapter number, title, or description.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Begin Your Genesis Study</h2>
          <p className="text-xl text-blue-100 mb-8">
            Start with any chapter or follow the complete narrative from beginning to end.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/genesis-1-quiz"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Begin with Creation
            </Link>
            <Link
              href="/genesis-quiz"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
            >
              Complete Genesis Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}