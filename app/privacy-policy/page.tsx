import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Bible Maximum',
  description: 'Privacy policy for Bible Maximum. Learn how we handle your data and protect your privacy.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAFAF9] min-h-screen pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: February 2026</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Overview</h2>
            <p>Bible Maximum (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This policy explains what information we collect and how we use it.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h2>
            <p className="mb-3">Bible Maximum is designed to work without requiring personal information. We do not require user accounts or logins.</p>
            <p className="mb-3"><strong className="text-gray-900">Automatically collected data:</strong> When you visit our site, our hosting provider may collect standard server logs including IP addresses, browser type, referring pages, and pages visited. This data is used solely for maintaining site performance and security.</p>
            <p><strong className="text-gray-900">Cookies:</strong> We may use cookies for basic site functionality and analytics. No advertising cookies or third-party tracking cookies are used.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Information</h2>
            <p>Any data collected is used exclusively to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Maintain and improve site performance</li>
              <li>Understand general usage patterns</li>
              <li>Ensure site security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Sharing</h2>
            <p>We do not sell, trade, or share your personal information with third parties. We do not serve targeted advertising.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Services</h2>
            <p>Our site may use third-party services for hosting and analytics. These services have their own privacy policies governing data collection.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Children&apos;s Privacy</h2>
            <p>Bible Maximum is suitable for users of all ages. We do not knowingly collect personal information from children under 13. Our quizzes and study tools can be used without providing any personal data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
            <p>If you have questions about this privacy policy, please visit our <a href="/contact" className="text-blue-600 hover:text-blue-700 underline">contact page</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
