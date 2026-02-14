import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Bible Maximum',
  description: 'Terms of service for Bible Maximum. Understand the guidelines for using our Bible quizzes and study tools.',
  alternates: { canonical: '/terms-of-service' },
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-[#FAFAF9] min-h-screen pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: February 2026</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Acceptance of Terms</h2>
            <p>By accessing and using Bible Maximum, you agree to these terms of service. If you do not agree, please do not use the site.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Use of Service</h2>
            <p className="mb-3">Bible Maximum provides free Bible quizzes, lexicon tools, and study resources. You may use these resources for personal study, education, church groups, and other non-commercial purposes.</p>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Scrape or bulk-download content for redistribution</li>
              <li>Attempt to disrupt or overload the service</li>
              <li>Use automated tools to access the site in a way that degrades performance for others</li>
              <li>Misrepresent Bible Maximum content as your own</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Content &amp; Accuracy</h2>
            <p className="mb-3">We strive for accuracy in all quiz questions, lexicon definitions, and study materials. Bible text is sourced from the King James Version (public domain). Lexicon data draws from established scholarly works.</p>
            <p>While we take care to ensure correctness, Bible Maximum is an educational resource and should not be treated as a substitute for pastoral guidance or formal theological study.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Intellectual Property</h2>
            <p>Original content created by Bible Maximum (quiz questions, interface design, study notes) is our intellectual property. Bible text from the KJV is in the public domain. Lexicon definitions sourced from public domain or open-license scholarly works are attributed accordingly.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Disclaimer of Warranties</h2>
            <p>Bible Maximum is provided &quot;as is&quot; without warranties of any kind. We do not guarantee uninterrupted access or that the site will be error-free.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h2>
            <p>Bible Maximum shall not be liable for any damages arising from the use or inability to use this service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Changes to Terms</h2>
            <p>We may update these terms at any time. Continued use of the site after changes constitutes acceptance of the revised terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
            <p>Questions about these terms? Visit our <a href="/contact" className="text-blue-600 hover:text-blue-700 underline">contact page</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
