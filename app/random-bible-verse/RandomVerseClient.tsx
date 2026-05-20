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
      <div className="bg-gradient-to-br from-scripture to-white rounded-xl border-2 border-sacred/20 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-3 py-1 bg-scripture text-white text-xs font-bold rounded-full uppercase tracking-wide">Your Random Verse</span>
          <span className="inline-block px-2 py-0.5 bg-sacred-light text-scripture text-xs rounded-full border border-sacred/10">{verse.theme}</span>
        </div>

        <Link href={verseUrl(verse)} className="text-2xl font-display font-bold text-scripture hover:text-gold-dark transition-colors">
          {verse.reference}
        </Link>

        <blockquote className="text-lg text-ink-muted leading-relaxed italic border-l-4 border-sacred/50 pl-5 mt-3 mb-4">
          &ldquo;{verse.text}&rdquo;
        </blockquote>

        <div className="flex flex-wrap items-center gap-3 text-sm mb-5">
          <Link href={verseUrl(verse)} className="text-sacred hover:underline font-medium">Study this verse</Link>
          <span className="text-ink-light">|</span>
          <Link href={`/${verse.bookSlug}-chapters`} className="text-sacred hover:underline">{verse.book} Chapters</Link>
          <span className="text-ink-light">|</span>
          <Link href={`/${verse.bookSlug}-${verse.chapter}-quiz`} className="text-sacred hover:underline font-semibold">Chapter Quiz</Link>
          <span className="text-ink-light">|</span>
          <Link href={`/bible-quotes/${verse.themeSlug}`} className="text-sacred hover:underline">Quotes About {verse.theme}</Link>
        </div>

        <button
          onClick={getNewVerse}
          className="inline-flex items-center px-6 py-3 bg-scripture text-white font-bold rounded-lg hover:bg-ink-muted transition-colors shadow-md"
        >
          Get Another Verse
        </button>
      </div>
    </section>
  );
}
