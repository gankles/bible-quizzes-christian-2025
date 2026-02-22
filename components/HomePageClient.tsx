'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { BIBLE_BOOKS } from '@/lib/bible-data';

const dailyVerses = [
  { reference: 'John 3:16', text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', quiz: '/john-3-quiz' },
  { reference: 'Psalm 23:1', text: 'The LORD is my shepherd; I shall not want.', quiz: '/psalms-23-quiz' },
  { reference: 'Genesis 1:1', text: 'In the beginning God created the heaven and the earth.', quiz: '/genesis-1-quiz' },
  { reference: 'Romans 8:28', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', quiz: '/romans-8-quiz' },
  { reference: 'Philippians 4:13', text: 'I can do all things through Christ which strengtheneth me.', quiz: '/philippians-quiz' },
  { reference: 'Proverbs 3:5-6', text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.', quiz: '/proverbs-quiz' },
  { reference: 'Isaiah 40:31', text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.', quiz: '/isaiah-quiz' },
];

interface SearchResult {
  type: 'book' | 'chapter' | 'topic';
  name: string;
  href: string;
  description: string;
}

const SEARCH_TOPICS = [
  { name: 'Creation', href: '/creation-quiz', description: 'Genesis 1-2' },
  { name: 'Noah\'s Ark', href: '/noahs-ark-quiz', description: 'The Flood story' },
  { name: 'Ten Commandments', href: '/ten-commandments-quiz', description: 'Exodus 20' },
  { name: 'Christmas', href: '/christmas-bible-quiz', description: 'Birth of Jesus' },
  { name: 'Easter', href: '/easter-bible-quiz', description: 'Resurrection' },
];

function getDailyVerse() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return dailyVerses[dayOfYear % dailyVerses.length];
}

export function DailyVerse() {
  const [verse, setVerse] = useState(dailyVerses[0]);

  useEffect(() => {
    setVerse(getDailyVerse());
  }, []);

  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-amber-600 mb-1">Verse of the Day</div>
          <blockquote className="text-scripture italic mb-2">
            &ldquo;{verse.text}&rdquo;
          </blockquote>
          <div className="flex items-center justify-between">
            <cite className="text-amber-700 font-semibold not-italic">{verse.reference}</cite>
            <Link 
              href={verse.quiz}
              className="text-sm text-amber-600 hover:text-amber-800 font-medium hover:underline"
            >
              Take the quiz →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SearchBox() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    
    const q = query.toLowerCase();
    const matches: SearchResult[] = [];

    BIBLE_BOOKS.forEach(book => {
      if (book.name.toLowerCase().includes(q)) {
        matches.push({
          type: 'book',
          name: book.name,
          href: `/books/${book.slug}`,
          description: `${book.chapters} chapters - ${book.testament === 'old' ? 'Old' : 'New'} Testament`
        });
      }
    });

    const chapterMatch = query.match(/^(\w+)\s*(\d+)$/i);
    if (chapterMatch) {
      const bookName = chapterMatch[1].toLowerCase();
      const chapter = parseInt(chapterMatch[2]);
      const book = BIBLE_BOOKS.find(b => b.name.toLowerCase().startsWith(bookName));
      if (book && chapter <= book.chapters) {
        matches.unshift({
          type: 'chapter',
          name: `${book.name} ${chapter} Quiz`,
          href: `/${book.slug}-${chapter}-quiz`,
          description: `Chapter ${chapter} of ${book.chapters}`
        });
      }
    }

    SEARCH_TOPICS.forEach(topic => {
      if (topic.name.toLowerCase().includes(q)) {
        matches.push({
          type: 'topic',
          name: topic.name,
          href: topic.href,
          description: topic.description
        });
      }
    });

    return matches.slice(0, 6);
  }, [query]);

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-dark/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search books, chapters, or topics... (try 'Genesis 1' or 'Christmas')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="block w-full pl-12 pr-4 py-4 border border-grace rounded-xl text-lg bg-white/95 backdrop-blur-sm placeholder-primary-dark/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg"
        />
      </div>

      {isFocused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-grace overflow-hidden z-50">
          {results.map((result, index) => (
            <Link
              key={index}
              href={result.href}
              className="flex items-center px-4 py-3 hover:bg-primary-light transition-colors border-b border-grace/50 last:border-0"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                result.type === 'book' ? 'bg-blue-100 text-blue-600' :
                result.type === 'chapter' ? 'bg-green-100 text-green-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                {result.type === 'book' ? 'B' : result.type === 'chapter' ? 'Ch' : 'T'}
              </div>
              <div>
                <div className="font-medium text-scripture">{result.name}</div>
                <div className="text-sm text-primary-dark/60">{result.description}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isFocused && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-grace p-4 text-center z-50">
          <p className="text-primary-dark/70">No results found for &ldquo;{query}&rdquo;</p>
          <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
            Browse all quizzes →
          </Link>
        </div>
      )}
    </div>
  );
}

export function QuickStartSection() {
  return (
    <div className="bg-white border border-grace rounded-xl p-6 shadow-sm">
      <h3 className="font-bold text-scripture mb-4">Quick Start: Pick Your Path</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          href="/genesis-chapters"
          className="p-4 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors text-center"
        >
          <div className="w-10 h-10 mx-auto mb-2 bg-amber-200 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <div className="font-medium text-scripture">From the Beginning</div>
          <div className="text-sm text-primary-dark/70">Start with Genesis</div>
        </Link>
        <Link
          href="/matthew-chapters"
          className="p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors text-center"
        >
          <div className="w-10 h-10 mx-auto mb-2 bg-blue-200 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" /></svg>
          </div>
          <div className="font-medium text-scripture">Meet Jesus</div>
          <div className="text-sm text-primary-dark/70">Start with Matthew</div>
        </Link>
        <Link
          href="/bible-quizzes"
          className="p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors text-center"
        >
          <div className="w-10 h-10 mx-auto mb-2 bg-purple-200 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
          </div>
          <div className="font-medium text-scripture">Browse Quizzes</div>
          <div className="text-sm text-primary-dark/70">All books and chapters</div>
        </Link>
      </div>
    </div>
  );
}
