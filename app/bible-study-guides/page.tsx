import { Metadata } from 'next';
import Link from 'next/link';
import { getAllStudyGuides, getStudyGuideCategories, getStudyGuidesByCategory } from '@/lib/study-guides-data';
import { StructuredData } from '@/components/StructuredData';

const allGuides = getAllStudyGuides();
const categories = getStudyGuideCategories();

export const metadata: Metadata = {
  title: `Bible Study Guides | ${allGuides.length} In-Depth Topical Studies | Bible Maximum`,
  description: `Browse ${allGuides.length} comprehensive Bible study guides covering foundational doctrines, Christian living, family, and biblical themes. Each guide includes key verses, in-depth sections, and discussion questions for personal or group study.`,
  keywords: [
    'Bible study guides', 'topical Bible study', 'Christian study guides',
    'Bible study topics', 'in-depth Bible study', 'group Bible study',
    'personal Bible study', 'doctrinal study', 'Bible study resources',
  ],
  openGraph: {
    title: `Bible Study Guides — ${allGuides.length} In-Depth Topical Studies`,
    description: `Browse ${allGuides.length} comprehensive Bible study guides for personal and group study.`,
    url: '/bible-study-guides',
    type: 'website',
  },
  alternates: { canonical: '/bible-study-guides' },
};

export default function BibleStudyGuidesPage() {
  const totalSections = allGuides.reduce((sum, g) => sum + g.sections.length, 0);
  const totalVerses = new Set(allGuides.flatMap(g => g.verses)).size;

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Study Guides',
    description: metadata.description,
    url: 'https://biblemaximum.com/bible-study-guides',
    numberOfItems: allGuides.length,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bible Study Guides' },
    ],
  };

  return (
    <>
      <StructuredData data={collectionSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">Bible Study Guides</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white border-b border-grace">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-scripture">
              Bible Study Guides
            </h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mb-6">
              {allGuides.length} in-depth topical studies for personal devotion and group Bible study.
              Each guide explores key scriptures, doctrinal insights, and practical application.
            </p>
            <div className="flex flex-wrap gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-scripture">{allGuides.length}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Study Guides</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{totalSections}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Sections</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{totalVerses}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Key Verses</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{categories.length}</p>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">Categories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Jump Links */}
      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <a
              key={cat}
              href={`#cat-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="px-3 py-1.5 bg-white border border-grace rounded-lg text-sm text-primary-dark/80 hover:bg-primary-light hover:border-blue-300 transition-colors"
            >
              {cat}
            </a>
          ))}
        </div>
      </section>

      {/* Guides by Category */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        {categories.map(cat => {
          const guides = getStudyGuidesByCategory(cat);
          return (
            <div
              key={cat}
              id={`cat-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="mb-10"
            >
              <h2 className="text-xl font-bold text-scripture mb-4">
                {cat}
                <span className="text-sm font-normal text-primary-dark/60 ml-2">
                  ({guides.length} {guides.length === 1 ? 'guide' : 'guides'})
                </span>
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {guides.map(guide => (
                  <Link
                    key={guide.slug}
                    href={`/bible-study-guides/${guide.slug}`}
                    className="bg-white border border-grace rounded-lg p-5 hover:shadow-md hover:border-blue-300 transition-all group"
                  >
                    <h3 className="font-semibold text-scripture group-hover:text-blue-600 transition-colors mb-1">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-primary-dark/60 mb-3 line-clamp-2">
                      {guide.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-primary-dark/50">
                      <span>{guide.sections.length} sections</span>
                      <span className="w-1 h-1 rounded-full bg-primary-dark/30" />
                      <span>{guide.verses.length} key verses</span>
                    </div>
                    {guide.verses.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {guide.verses.slice(0, 3).map((v, i) => (
                          <span
                            key={i}
                            className="text-xs bg-blue-50 text-blue-700 rounded px-2 py-0.5"
                          >
                            {v}
                          </span>
                        ))}
                        {guide.verses.length > 3 && (
                          <span className="text-xs text-primary-dark/40">
                            +{guide.verses.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Internal Links */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-grace/10 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/topics" className="text-blue-600 hover:underline text-sm">
              Bible Verses by Topic
            </Link>
            <Link href="/nave-topics" className="text-blue-600 hover:underline text-sm">
              Nave&apos;s Topical Bible
            </Link>
            <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">
              Bible Quizzes
            </Link>
            <Link href="/bible-stories" className="text-blue-600 hover:underline text-sm">
              Bible Stories
            </Link>
            <Link href="/people" className="text-blue-600 hover:underline text-sm">
              Bible Characters Directory
            </Link>
            <Link href="/lexicon" className="text-blue-600 hover:underline text-sm">
              Hebrew &amp; Greek Word Study
            </Link>
            <Link href="/cross-references" className="text-blue-600 hover:underline text-sm">
              Cross References
            </Link>
            <Link href="/commandments" className="text-blue-600 hover:underline text-sm">
              Biblical Commandments
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
