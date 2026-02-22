'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    BookOpenIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@/components/icons';

interface VerseNavigationProps {
    currentBook: string;
    currentChapter: number;
    currentVerse: number;
    bookName: string;
}

interface VerseLink {
    book: string;
    chapter: number;
    verse: number;
    label: string;
    disabled?: boolean;
}

export function VerseNavigation({ currentBook, currentChapter, currentVerse, bookName }: VerseNavigationProps) {
    const [prevVerse, setPrevVerse] = useState<VerseLink | null>(null);
    const [nextVerse, setNextVerse] = useState<VerseLink | null>(null);

    useEffect(() => {
        // Calculate previous verse
        if (currentVerse > 1) {
            setPrevVerse({
                book: currentBook,
                chapter: currentChapter,
                verse: currentVerse - 1,
                label: `${bookName} ${currentChapter}:${currentVerse - 1}`,
            });
        } else if (currentChapter > 1) {
            setPrevVerse({
                book: currentBook,
                chapter: currentChapter - 1,
                verse: 1,
                label: `${bookName} ${currentChapter - 1}`,
            });
        } else {
            setPrevVerse({
                book: currentBook,
                chapter: currentChapter,
                verse: currentVerse,
                label: 'Genesis',
                disabled: true,
            });
        }

        // Calculate next verse
        setNextVerse({
            book: currentBook,
            chapter: currentChapter,
            verse: currentVerse + 1,
            label: `${bookName} ${currentChapter}:${currentVerse + 1}`,
        });

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            if (e.key === 'ArrowLeft' && prevVerse && !prevVerse.disabled) {
                window.location.href = `/verses/${prevVerse.book}/${prevVerse.chapter}/${prevVerse.verse}`;
            } else if (e.key === 'ArrowRight' && nextVerse && !nextVerse.disabled) {
                window.location.href = `/verses/${nextVerse.book}/${nextVerse.chapter}/${nextVerse.verse}`;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentBook, currentChapter, currentVerse, bookName, prevVerse, nextVerse]);

    return (
        <nav className="flex flex-col md:flex-row items-center justify-between gap-6 py-12 border-t border-grace/50 mt-20" aria-label="Study Navigation">
            {/* PREVIOUS NODE */}
            {prevVerse && !prevVerse.disabled ? (
                <Link
                    href={`/verses/${prevVerse.book}/${prevVerse.chapter}/${prevVerse.verse}`}
                    className="w-full md:w-auto flex items-center gap-6 glass-panel p-6 pr-10 rounded-[32px] border border-white bg-white/60 hover:bg-white hover:border-blue-600/30 hover:shadow-2xl transition-all duration-500 group"
                >
                    <div className="w-12 h-12 rounded-lg bg-scripture text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-lg">
                        <ChevronLeftIcon className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <div className="text-left">
                        <div className="text-[10px] font-bold text-primary-dark/40 uppercase mb-1">Previous Verse</div>
                        <div className="text-lg font-bold text-scripture tracking-tight">{prevVerse.label}</div>
                    </div>
                </Link>
            ) : (
                <div className="w-full md:w-auto flex items-center gap-6 glass-panel p-6 pr-10 rounded-[32px] border border-dashed border-grace bg-primary-light/30 opacity-40 grayscale">
                    <div className="w-12 h-12 rounded-lg bg-grace/30 text-primary-dark/40 flex items-center justify-center">
                        <ChevronLeftIcon className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <div className="text-[10px] font-bold text-primary-dark/40 uppercase mb-1">First Verse</div>
                        <div className="text-lg font-bold text-primary-dark/40 tracking-tight">Genesis 1:1</div>
                    </div>
                </div>
            )}

            {/* CHAPTER RESOLUTION */}
            <Link
                href={`/verses/${currentBook}/${currentChapter}`}
                className="btn-premium px-10 py-5 bg-scripture text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all flex items-center group"
            >
                <BookOpenIcon className="w-5 h-5 mr-3 text-amber-500" />
                <span>Study Chapter {currentChapter}</span>
            </Link>

            {/* NEXT NODE */}
            {nextVerse && !nextVerse.disabled ? (
                <Link
                    href={`/verses/${nextVerse.book}/${nextVerse.chapter}/${nextVerse.verse}`}
                    className="w-full md:w-auto flex items-center justify-end gap-6 glass-panel p-6 pl-10 rounded-[32px] border border-white bg-white/60 hover:bg-white hover:border-blue-600/30 hover:shadow-2xl transition-all duration-500 group"
                >
                    <div className="text-right">
                        <div className="text-[10px] font-bold text-primary-dark/40 uppercase mb-1">Next Verse</div>
                        <div className="text-lg font-bold text-scripture tracking-tight">{nextVerse.label}</div>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-scripture text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-lg">
                        <ChevronRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </div>
                </Link>
            ) : (
                <div className="w-full md:w-auto flex items-center justify-end gap-6 glass-panel p-6 pl-10 rounded-[32px] border border-dashed border-grace bg-primary-light/30 opacity-40 grayscale">
                    <div className="text-right">
                        <div className="text-[10px] font-bold text-primary-dark/40 uppercase mb-1">Last Verse</div>
                        <div className="text-lg font-bold text-primary-dark/40 tracking-tight">Canon End</div>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-grace/30 text-primary-dark/40 flex items-center justify-center">
                        <ChevronRightIcon className="w-6 h-6" />
                    </div>
                </div>
            )}
        </nav>
    );
}
