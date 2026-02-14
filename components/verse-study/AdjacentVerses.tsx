import Link from 'next/link';
import { BollsVerse, stripHtml } from '@/lib/bolls-api';

interface AdjacentVersesProps {
  verses: BollsVerse[];
  currentVerse: number;
  bookSlug: string;
  chapter: number;
  bookName: string;
}

export default function AdjacentVerses({
  verses,
  currentVerse,
  bookSlug,
  chapter,
  bookName,
}: AdjacentVersesProps) {
  const adjacentVerses = verses.filter(
    v => v.verse >= currentVerse - 2 && v.verse <= currentVerse + 2
  );

  if (adjacentVerses.length <= 1) return null;

  return (
    <section className="bg-gray-50 rounded-lg p-4 mb-6">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Context
      </h3>
      <div className="space-y-2">
        {adjacentVerses.map((v) => {
          const isCurrent = v.verse === currentVerse;
          return (
            <div
              key={v.verse}
              className={`flex gap-3 p-2 rounded ${
                isCurrent ? 'bg-blue-100 border-l-4 border-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              {isCurrent ? (
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {v.verse}
                </span>
              ) : (
                <Link
                  href={`/verses/${bookSlug}/${chapter}/${v.verse}`}
                  className="flex-shrink-0 w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium hover:bg-blue-200 hover:text-blue-700 transition-colors"
                >
                  {v.verse}
                </Link>
              )}
              <p className={`text-sm leading-relaxed ${isCurrent ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                {stripHtml(v.text)}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-3 text-center">
        <Link
          href={`/chapters/${bookSlug}/${chapter}`}
          className="text-sm text-blue-600 hover:underline"
        >
          Read full chapter &rarr;
        </Link>
      </div>
    </section>
  );
}
