import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Bible Maximum | Bible Quizzes & Word Studies',
  description: 'Bible Maximum provides free Bible quizzes, Greek and Hebrew lexicon tools, and verse-by-verse study resources to help Christians grow in biblical knowledge.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAFAF9] min-h-screen pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Bible Maximum</h1>
        <p className="text-lg text-gray-500 mb-12">Helping Christians deepen their understanding of Scripture through quizzes, word studies, and verse-by-verse resources.</p>

        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Bible Maximum exists to make in-depth Bible study accessible to everyone. We believe that understanding the original languages, historical context, and theological richness of Scripture transforms how believers read and apply God&apos;s Word.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">What We Offer</h2>
          <ul className="space-y-4 text-gray-600 mb-6">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />
              <span><strong className="text-gray-900">Chapter Quizzes</strong> &mdash; Test your knowledge of every chapter in the Bible with multiple-choice, true/false, and fill-in-the-blank questions across easy, medium, hard, and theological difficulty levels.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />
              <span><strong className="text-gray-900">Book Quizzes</strong> &mdash; Comprehensive quizzes covering entire books of the Bible, with 25 questions spanning key themes, characters, and events.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />
              <span><strong className="text-gray-900">Greek &amp; Hebrew Lexicon</strong> &mdash; Browse over 13,000 Strong&apos;s Concordance entries with definitions from multiple scholarly sources including Abbott-Smith, Liddell-Scott-Jones, and Brown-Driver-Briggs.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />
              <span><strong className="text-gray-900">Verse-by-Verse Study</strong> &mdash; Explore Scripture with cross-references, original language word studies, and commentary resources.</span>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Our Approach</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            All quiz content is grounded in the text of Scripture. We use the King James Version as our primary English text and reference Strong&apos;s Concordance numbers for original language studies. Our quizzes are designed to encourage careful reading and faithful interpretation of the Bible.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Free to Use</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Bible Maximum is completely free. No account required, no paywalls. We believe Bible study resources should be available to every believer.
          </p>
        </div>

        <div className="mt-12 flex gap-4">
          <Link href="/bible-quizzes" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors">
            Browse Quizzes
          </Link>
          <Link href="/lexicon" className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
            Explore Lexicon
          </Link>
        </div>
      </div>
    </div>
  );
}
