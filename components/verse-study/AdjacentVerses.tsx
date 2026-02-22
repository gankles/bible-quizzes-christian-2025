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
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-scripture mb-4">Context</h2>
      <div className="space-y-1">
        {adjacentVerses.map((v) => {
          const isCurrent = v.verse === currentVerse;
          return (
            <div
              key={v.verse}
              className={`flex gap-3 py-2.5 px-3 rounded-lg ${
                isCurrent ? 'bg-blue-50' : ''
              }`}
            >
              {isCurrent ? (
                <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                  {v.verse}
                </span>
              ) : (
                <Link
                  href={`/verses/${bookSlug}/${chapter}/${v.verse}`}
                  className="flex-shrink-0 w-7 h-7 text-primary-dark/40 hover:text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5 transition-colors"
                >
                  {v.verse}
                </Link>
              )}
              <p className={`text-[15px] leading-relaxed ${isCurrent ? 'text-scripture' : 'text-primary-dark/60'}`}>
                {stripHtml(v.text)}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-3">
        <Link
          href={`/chapters/${bookSlug}/${chapter}`}
          className="text-sm text-blue-600 hover:underline"
        >
          Read {bookName} {chapter} full chapter
        </Link>
      </div>
      <hr className="border-grace mt-8" />
    </section>
  );
}
