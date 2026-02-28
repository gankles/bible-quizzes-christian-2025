'use client';

import { useState } from 'react';
import Link from 'next/link';

interface RandomVerse {
  reference: string;
  book: string;
  bookSlug: string;
  chapter: number;
  verse: number;
  endVerse?: number;
  text: string;
  theme: string;
  themeSlug: string;
}

function verseUrl(v: RandomVerse): string {
  return `/verses/${v.bookSlug}/${v.chapter}/${v.verse}`;
}

export default function RandomVerseClient({ verses }: { verses: RandomVerse[] }) {
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * verses.length));
  const verse = verses[currentIndex];

  const getNewVerse = () => {
    let next = currentIndex;
    while (next === currentIndex && verses.length > 1) {
      next = Math.floor(Math.random() * verses.length);
    }
    setCurrentIndex(next);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-200 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">Your Random Verse</span>
          <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100">{verse.theme}</span>
        </div>

        <Link href={verseUrl(verse)} className="text-2xl font-display font-bold text-scripture hover:text-blue-600 transition-colors">
          {verse.reference}
        </Link>

        <blockquote className="text-lg text-primary-dark/85 leading-relaxed italic border-l-4 border-blue-300 pl-5 mt-3 mb-4">
          &ldquo;{verse.text}&rdquo;
        </blockquote>

        <div className="flex flex-wrap items-center gap-3 text-sm mb-5">
          <Link href={verseUrl(verse)} className="text-blue-600 hover:underline font-medium">Study this verse</Link>
          <span className="text-primary-dark/30">|</span>
          <Link href={`/${verse.bookSlug}-chapters`} className="text-blue-600 hover:underline">{verse.book} Chapters</Link>
          <span className="text-primary-dark/30">|</span>
          <Link href={`/${verse.bookSlug}-${verse.chapter}-quiz`} className="text-blue-600 hover:underline font-semibold">Chapter Quiz</Link>
          <span className="text-primary-dark/30">|</span>
          <Link href={`/bible-quotes/${verse.themeSlug}`} className="text-blue-600 hover:underline">Quotes About {verse.theme}</Link>
        </div>

        <button
          onClick={getNewVerse}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          Get Another Verse
        </button>
      </div>
    </section>
  );
}
