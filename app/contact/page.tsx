import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Bible Maximum',
  description: 'Get in touch with the Bible Maximum team. Report issues, suggest improvements, or ask questions about our Bible quizzes and study tools.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="bg-[#FAFAF9] min-h-screen pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-500 mb-12">Have a question, found an error in a quiz, or want to suggest an improvement? We&apos;d love to hear from you.</p>

        <div className="space-y-8">
          <div className="p-8 rounded-xl border border-gray-200 bg-white">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong className="text-gray-900">Email:</strong>{' '}
                <a href="mailto:contact@biblemaximum.com" className="text-blue-600 hover:text-blue-700 underline">contact@biblemaximum.com</a>
              </p>
              <p>We typically respond within 48 hours.</p>
            </div>
          </div>

          <div className="p-8 rounded-xl border border-gray-200 bg-white">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Common Reasons to Reach Out</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900">Quiz errors</strong> &mdash; Found an incorrect answer or misleading question? Let us know the quiz name and question number.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900">Feature requests</strong> &mdash; Have an idea for a new quiz type, study tool, or feature? We welcome suggestions.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900">Technical issues</strong> &mdash; Pages not loading, broken links, or display problems on your device.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900">Partnership inquiries</strong> &mdash; Interested in collaborating on Bible study content or resources.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium text-sm">&larr; Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
