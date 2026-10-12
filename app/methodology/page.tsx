import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Methodology | Bible Maximum',
  description: 'How Bible Maximum builds word studies and quiz content: real Strong\'s Concordance data, zero-hallucination verse citation, and the scholarly sources behind every entry.',
  alternates: { canonical: '/methodology' },
};

export default function MethodologyPage() {
  return (
    <div className="bg-[#FAFAF9] min-h-screen pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <h1 className="text-4xl font-bold font-display text-scripture mb-4">Our Methodology</h1>
        <p className="text-lg text-ink-muted mb-12">
          How we build word studies and quizzes, what&apos;s AI-assisted, and how we guard against errors.
        </p>

        <div className="prose prose-slate max-w-none">
          <h2 id="ai-process" className="text-2xl font-semibold text-scripture mt-10 mb-4">How word studies are written</h2>
          <p className="text-ink-muted leading-relaxed mb-4">
            Each Greek or Hebrew word study on this site is drafted with the help of AI, but the AI is never allowed to invent a Bible verse. Before any text is generated, we pull every real occurrence of that Strong&apos;s number from our concordance data &mdash; the actual KJV verse, reference, and translation &mdash; and hand that list to the model as the only material it&apos;s allowed to cite.
          </p>
          <p className="text-ink-muted leading-relaxed mb-6">
            After generation, every verse reference the AI selects is checked against that same list. Any reference that doesn&apos;t match a real occurrence exactly is discarded, and the verse text shown on the page is always the real text we fetched &mdash; never text the AI wrote itself. In practice, this means the AI&apos;s job is limited to categorizing and explaining usage patterns; it cannot fabricate a quotation.
          </p>

          <h2 id="sources" className="text-2xl font-semibold text-scripture mt-10 mb-4">Sources behind each entry</h2>
          <ul className="space-y-4 text-ink-muted mb-6">
            <li id="strongs-concordance" className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-scripture mt-2.5 shrink-0" />
              <span><strong className="text-scripture">Strong&apos;s Exhaustive Concordance</strong> &mdash; the original short gloss and KJV translation count for every Strong&apos;s number.</span>
            </li>
            <li id="bdb" className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-scripture mt-2.5 shrink-0" />
              <span><strong className="text-scripture">Brown-Driver-Briggs (BDB)</strong> &mdash; the standard scholarly Hebrew lexicon, used for Hebrew (H-numbered) entries.</span>
            </li>
            <li id="lsj" className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-scripture mt-2.5 shrink-0" />
              <span><strong className="text-scripture">Liddell-Scott-Jones (LSJ)</strong> &mdash; the standard classical Greek lexicon, used for Greek (G-numbered) entries.</span>
            </li>
            <li id="abbott-smith" className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-scripture mt-2.5 shrink-0" />
              <span><strong className="text-scripture">Abbott-Smith</strong> &mdash; a New Testament-focused Greek lexicon, cross-referenced alongside LSJ.</span>
            </li>
          </ul>
          <p className="text-ink-muted leading-relaxed mb-6">
            The &ldquo;KJV Translation Renderings&rdquo; and occurrence counts shown on every lexicon page are computed directly from the King James Version text itself, not estimated &mdash; they reflect every real occurrence of that word in the KJV.
          </p>

          <h2 className="text-2xl font-semibold text-scripture mt-10 mb-4">Quiz content</h2>
          <p className="text-ink-muted leading-relaxed mb-6">
            Quiz questions are grounded in the KJV text of the relevant chapter or book. Each question is checked against the source text before publishing, and we review flagged questions reported by readers (see below).
          </p>

          <h2 className="text-2xl font-semibold text-scripture mt-10 mb-4">Found a mistake?</h2>
          <p className="text-ink-muted leading-relaxed mb-6">
            No AI process is perfect. If a word study, quiz question, or verse reference looks wrong, please tell us &mdash; every report is reviewed by a person, not just re-run through the model.
          </p>
        </div>

        <div className="mt-12 flex gap-4 flex-wrap">
          <Link href="/contact" className="px-6 py-3 bg-scripture text-white rounded-lg font-semibold text-sm hover:bg-ink-muted transition-colors">
            Report an Error
          </Link>
          <Link href="/about" className="px-6 py-3 border border-grace text-scripture rounded-lg font-semibold text-sm hover:bg-primary-light/50 transition-colors">
            About Bible Maximum
          </Link>
          <Link href="/lexicon" className="px-6 py-3 border border-grace text-scripture rounded-lg font-semibold text-sm hover:bg-primary-light/50 transition-colors">
            Explore the Lexicon
          </Link>
        </div>
      </div>
    </div>
  );
}
