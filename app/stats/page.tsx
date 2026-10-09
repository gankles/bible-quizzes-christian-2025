import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import Link from 'next/link';
import { canonicalUrl } from '@/lib/site-config';

export const revalidate = 86400; // 24 hours

export const metadata: Metadata = {
  title: 'Site Stats | Bible Maximum',
  description: 'How much Bible study content Bible Maximum covers: quizzes, chapter summaries, lexicon entries, and more.',
  alternates: { canonical: canonicalUrl('/stats') },
};

function countJsonFiles(dir: string): number {
  try {
    return fs.readdirSync(dir).filter(f => f.endsWith('.json') && !f.startsWith('.')).length;
  } catch {
    return 0;
  }
}

function countJsonFilesRecursive(dir: string): number {
  let count = 0;
  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) count += countJsonFilesRecursive(full);
      else if (entry.name.endsWith('.json')) count += 1;
    }
  } catch {
    // directory not found - count stays 0
  }
  return count;
}

function countLexiconEntries(): number {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'data', 'lexicon.json'), 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data.entries) ? data.entries.length : 0;
  } catch {
    return 0;
  }
}

function countFamilyTreePeople(): number {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'data', 'family-tree', 'people.json'), 'utf-8');
    return JSON.parse(raw).length;
  } catch {
    return 0;
  }
}

export default function StatsPage() {
  const quizCount = countJsonFiles(path.join(process.cwd(), 'data', 'quizzes'));
  const chapterSummaryCount = countJsonFilesRecursive(path.join(process.cwd(), 'data', 'chapter-summaries'));
  const bookIntroductionCount = countJsonFiles(path.join(process.cwd(), 'data', 'book-introductions'));
  const lexiconCount = countLexiconEntries();
  const familyTreeCount = countFamilyTreePeople();

  const stats = [
    { label: 'Bible Quizzes', value: quizCount },
    { label: 'Chapter Summaries', value: chapterSummaryCount },
    { label: 'Book Study Guides', value: bookIntroductionCount },
    { label: 'Lexicon Entries', value: lexiconCount },
    { label: 'Family Tree People', value: familyTreeCount },
  ];

  return (
    <div className="min-h-screen bg-primary-light/30">
      <nav className="bg-white border-b border-grace">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <ol className="flex items-center flex-wrap gap-y-1 text-sm">
            <li>
              <Link href="/" className="text-sacred hover:underline">Home</Link>
            </li>
            <li className="text-ink-light mx-2">/</li>
            <li className="text-ink-muted">Stats</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold font-display text-scripture mb-3">
          Site Stats
        </h1>
        <p className="text-scripture leading-relaxed mb-10">
          How much Bible study content Bible Maximum covers, updated automatically as content is added.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white rounded-xl border border-grace p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-sacred">{stat.value.toLocaleString()}</div>
              <div className="text-sm text-ink-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-primary-light/30 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Explore</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/bible-quizzes" className="text-sacred hover:underline text-sm">All Bible Quizzes</Link>
            <Link href="/bible-chapter-summaries" className="text-sacred hover:underline text-sm">Chapter Summaries</Link>
            <Link href="/books-of-the-bible" className="text-sacred hover:underline text-sm">Books of the Bible</Link>
            <Link href="/lexicon" className="text-sacred hover:underline text-sm">Greek &amp; Hebrew Lexicon</Link>
            <Link href="/family-tree" className="text-sacred hover:underline text-sm">Family Tree</Link>
            <Link href="/changelog" className="text-sacred hover:underline text-sm">Changelog</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
