import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import GenesisChaptersClient from './GenesisChaptersClient';

export const metadata: Metadata = {
  title: 'Genesis Quizzes | All 50 Chapters from Creation to Joseph in Egypt | Easy, Medium, Hard & Theological Difficulty Levels | Bible Maximum',
  description: 'Test your knowledge of Genesis with chapter-by-chapter quizzes. 50 chapters covering Creation, the Patriarchs, Joseph in Egypt, and more. Start your Genesis study journey today.',
  keywords: [
    'Genesis quiz', 'Genesis chapter quizzes', 'Bible quiz Genesis',
    'Genesis 1 quiz', 'Creation quiz', 'Adam and Eve quiz',
    'Abraham quiz', 'Joseph quiz', 'Jacob quiz', 'Noah quiz',
    'Old Testament quiz', 'Bible study Genesis', 'Genesis Bible study'
  ],
  openGraph: {
    title: 'Genesis Quizzes | All 50 Chapters from Creation to Joseph in Egypt | Easy, Medium, Hard & Theological Difficulty Levels | Bible Maximum',
    description: 'Test your knowledge of Genesis with chapter-by-chapter quizzes covering Creation, the Patriarchs, and Joseph in Egypt.',
    type: 'website',
  },
  alternates: { canonical: '/genesis-chapters' },
};

export default function GenesisChaptersPage() {
  const totalChapters = 50;
  const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Genesis Chapters - Bible Quizzes',
    description: 'Complete collection of Genesis chapter quizzes covering all 50 chapters.',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: totalChapters,
      itemListElement: chapters.slice(0, 10).map((chapter, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://biblemaximum.com/genesis-${chapter}-quiz`,
        name: `Genesis ${chapter} Quiz`,
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com' },
        { '@type': 'ListItem', position: 2, name: 'Bible Quizzes', item: 'https://biblemaximum.com/bible-quizzes' },
        { '@type': 'ListItem', position: 3, name: 'Genesis Chapters', item: 'https://biblemaximum.com/genesis-chapters' },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-900 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-black/40" />
        <Image
          src="/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png"
          alt="Open Bible with light"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center justify-center space-x-2 text-sm text-amber-200">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><span className="mx-2">/</span></li>
              <li><Link href="/bible-quizzes" className="hover:text-white">Bible Quizzes</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-white font-medium">Genesis Chapters</li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Genesis Chapter Quizzes
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 mb-4 max-w-3xl mx-auto">
            Welcome to the beginning of everything.
          </p>
          <p className="text-lg text-amber-200 mb-8 max-w-2xl mx-auto">
            Genesis isn&apos;t just ancient history—it&apos;s the foundation of faith, the origin of God&apos;s promises, 
            and where we meet Abraham, Jacob, Joseph, and the roots of redemption. Ready to dive in?
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">50</div>
              <div className="text-amber-200 text-sm">Chapters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">800+</div>
              <div className="text-amber-200 text-sm">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">~3hrs</div>
              <div className="text-amber-200 text-sm">Total Read Time</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/books/genesis"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              Learn About Genesis
            </Link>
            <Link
              href="/genesis-quiz"
              className="bg-amber-600 hover:bg-amber-700 px-6 py-3 rounded-lg transition-colors font-semibold"
            >
              Take Complete Book Quiz
            </Link>
          </div>
        </div>
      </section>

      <GenesisChaptersClient />
    </>
  );
}
