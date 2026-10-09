import { Metadata } from 'next';
import Link from 'next/link';
import { CHANGELOG } from '@/data/changelog';
import { canonicalUrl } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Changelog | Bible Maximum',
  description: 'What\'s new on Bible Maximum: recent features, fixes, and improvements to our Bible study tools, quizzes, and resources.',
  alternates: { canonical: canonicalUrl('/changelog') },
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-primary-light/30">
      <nav className="bg-white border-b border-grace">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <ol className="flex items-center flex-wrap gap-y-1 text-sm">
            <li>
              <Link href="/" className="text-sacred hover:underline">Home</Link>
            </li>
            <li className="text-ink-light mx-2">/</li>
            <li className="text-ink-muted">Changelog</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold font-display text-scripture mb-3">
          Changelog
        </h1>
        <p className="text-scripture leading-relaxed mb-10">
          What&apos;s new on Bible Maximum — recent features, fixes, and improvements.
        </p>

        <div className="space-y-8">
          {CHANGELOG.map((entry, i) => (
            <article key={i} className="bg-white rounded-xl border border-grace p-6">
              <time dateTime={entry.date} className="text-xs font-bold uppercase text-ink-light tracking-wide">
                {new Date(entry.date + 'T00:00:00Z').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h2 className="text-xl font-bold text-scripture mt-2 mb-2">{entry.title}</h2>
              <p className="text-scripture leading-relaxed">{entry.description}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
