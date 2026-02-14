import Link from 'next/link';
import { Commandment, formatReference } from '@/lib/commandments-data';

interface ChapterCommandmentsProps {
  commandments: Commandment[];
  bookName: string;
  chapter: number;
}

export default function ChapterCommandments({ commandments, bookName, chapter }: ChapterCommandmentsProps) {
  if (commandments.length === 0) return null;

  const positive = commandments.filter(c => c.polarity === 'P');
  const negative = commandments.filter(c => c.polarity === 'N');

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Commandments in {bookName} {chapter}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            This chapter contains <strong>{commandments.length}</strong> of the 613 biblical commandments
            {positive.length > 0 && negative.length > 0 && (
              <> &mdash; {positive.length} positive and {negative.length} negative</>
            )}
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {commandments.map(cmd => (
            <div key={cmd.number} className="px-6 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors">
              <span className={`shrink-0 mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                cmd.polarity === 'P'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {cmd.polarity === 'P' ? '+' : '\u2212'}
              </span>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/commandments/${cmd.number}`}
                  className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                >
                  #{cmd.number}: {cmd.concept}
                </Link>
                <p className="text-xs text-gray-500 mt-0.5">
                  {formatReference(cmd.referenceId)} &middot; {cmd.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-wrap gap-3">
          <Link
            href="/commandments"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            View all 613 commandments
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/ten-commandments-quiz"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            Ten Commandments Quiz
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/613-commandments-quiz"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            613 Commandments Quiz
          </Link>
        </div>
      </div>
    </section>
  );
}
