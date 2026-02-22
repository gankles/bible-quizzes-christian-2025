'use client';

import { getAllBooks } from '@/lib/bibleData';

interface BibleTimelineProps {
    currentBookSlug: string;
}

export function BibleTimeline({ currentBookSlug }: BibleTimelineProps) {
    const allBooks = getAllBooks();
    const currentIndex = allBooks.findIndex(b => b.slug === currentBookSlug);

    if (currentIndex === -1) return null;

    const currentBook = allBooks[currentIndex];
    const totalBooks = allBooks.length;
    const progress = (currentIndex / (totalBooks - 1)) * 100;

    // Groups for visual breaks
    const OTCount = 39;
    const NTCount = 27;

    return (
        <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-scripture dark:text-white font-display mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                Biblical Timeline
            </h2>

            <div className="relative">
                {/* Progress Line */}
                <div className="h-2 w-full bg-grace dark:bg-scripture/80 rounded-full overflow-hidden">
                    <div
                        className="h-full blue-600 transition-all duration-1000 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Markers */}
                <div className="flex justify-between mt-2 text-[10px] uppercase tracking-wider font-bold text-primary-dark/40 dark:text-primary-dark/60">
                    <span>Genesis</span>
                    <div className="flex flex-col items-center">
                        <div className="w-px h-2 bg-grace dark:bg-scripture/80 mb-1" />
                        <span>Prophets</span>
                    </div>
                    <span>Gospels</span>
                    <div className="flex flex-col items-center">
                        <div className="w-px h-2 bg-grace dark:bg-scripture/80 mb-1" />
                        <span>Letters</span>
                    </div>
                    <span>Revelation</span>
                </div>

                {/* Current Position Pointer */}
                <div
                    className="absolute top-0 -mt-1 transition-all duration-1000 ease-out"
                    style={{ left: `${progress}%` }}
                >
                    <div className="flex flex-col items-center -ml-4">
                        <div className="w-2 h-4 blue-600 rounded-full ring-4 ring-white dark:ring-dark-surface shadow-md" />
                        <div className="mt-4 blue-600 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap font-bold shadow-sm">
                            {currentBook.name}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border ${currentBook.testament === 'Old' ? 'border-sacred/30 blue-50' : 'border-grace dark:border-dark-border opacity-50'}`}>
                    <span className="text-xs font-bold text-primary-dark/60 dark:text-primary-dark/40 block mb-1">Testament</span>
                    <span className="font-bold text-scripture dark:text-white">Old Testament</span>
                </div>
                <div className={`p-4 rounded-xl border ${currentBook.testament === 'New' ? 'border-sacred/30 blue-50' : 'border-grace dark:border-dark-border opacity-50'}`}>
                    <span className="text-xs font-bold text-primary-dark/60 dark:text-primary-dark/40 block mb-1">Testament</span>
                    <span className="font-bold text-scripture dark:text-white">New Testament</span>
                </div>
            </div>
        </div>
    );
}
