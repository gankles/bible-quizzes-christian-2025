import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllStudyGuides, getStudyGuideBySlug } from '@/lib/study-guides-data';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getStudyGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: `${guide.title} - Bible Study Guide | ${guide.sections.length} Sections | Bible Maximum`,
    description: `${guide.description}. An in-depth Bible study guide with ${guide.sections.length} sections covering key scriptures including ${guide.verses.slice(0, 3).join(', ')}${guide.verses.length > 3 ? ' and more' : ''}.`,
    keywords: [
      `${guide.title} Bible study`, `${guide.title} study guide`,
      'Bible study guide', 'topical Bible study', guide.category,
      ...guide.verses.slice(0, 5),
    ],
    openGraph: {
      title: `${guide.title} — Bible Study Guide`,
      description: `${guide.description}. ${guide.sections.length} in-depth sections with key verse references.`,
      url: `/bible-study-guides/${guide.slug}`,
      type: 'article',
    },
    alternates: { canonical: `/bible-study-guides/${guide.slug}` },
  };
}

/**
 * Split content on <br><br> to get paragraphs.
 * Also strips lone <br> tags within paragraphs.
 */
function splitParagraphs(text: string): string[] {
  return text
    .split(/<br\s*\/?>\s*<br\s*\/?>/)
    .map(p => p.replace(/<br\s*\/?>/g, ' ').trim())
    .filter(Boolean);
}

export default async function StudyGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getStudyGuideBySlug(slug);
  if (!guide) notFound();

  const allGuides = getAllStudyGuides();
  const currentIndex = allGuides.findIndex(g => g.slug === guide.slug);
  const prev = currentIndex > 0 ? allGuides[currentIndex - 1] : null;
  const next = currentIndex < allGuides.length - 1 ? allGuides[currentIndex + 1] : null;

  // Related guides in same category
  const relatedGuides = allGuides
    .filter(g => g.category === guide.category && g.slug !== guide.slug)
    .slice(0, 4);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${guide.title} — Bible Study Guide`,
    description: guide.description,
    url: `https://biblemaximum.com/bible-study-guides/${guide.slug}`,
    author: {
      '@type': 'Organization',
      name: 'Bible Maximum',
      url: 'https://biblemaximum.com',
    },
    isPartOf: {
      '@type': 'CollectionPage',
      name: 'Bible Study Guides',
      url: 'https://biblemaximum.com/bible-study-guides',
    },
    about: guide.verses.map(v => ({
      '@type': 'Thing',
      name: v,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bible Study Guides', item: 'https://biblemaximum.com/bible-study-guides' },
      { '@type': 'ListItem', position: 3, name: guide.title },
    ],
  };

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/bible-study-guides" className="hover:text-blue-600">Bible Study Guides</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">{guide.title}</span>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-3">
            {guide.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-scripture mb-2">
            {guide.title}
          </h1>
          <p className="text-lg text-primary-dark/70">{guide.description}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-primary-dark/60">
            <span>{guide.sections.length} sections</span>
            <span className="w-1 h-1 rounded-full bg-primary-dark/30 self-center" />
            <span>{guide.verses.length} key verses</span>
          </div>
        </div>

        {/* Key Verses */}
        {guide.verses.length > 0 && (
          <section className="bg-white border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-4">Key Verses</h2>
            <div className="flex flex-wrap gap-2">
              {guide.verses.map((v, i) => (
                <span
                  key={i}
                  className="text-sm bg-blue-50 text-blue-700 rounded-lg px-3 py-1"
                >
                  {v}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Table of Contents */}
        <nav className="bg-white border border-grace rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-scripture mb-4">Table of Contents</h2>
          <ol className="space-y-2">
            {guide.sections.map((section, i) => (
              <li key={i}>
                <a
                  href={`#section-${i}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {i + 1}. {section.title}
                </a>
                {section.verses.length > 0 && (
                  <span className="text-xs text-primary-dark/40 ml-2">
                    ({section.verses.slice(0, 2).join(', ')}{section.verses.length > 2 ? ', ...' : ''})
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        {guide.sections.map((section, i) => (
          <section
            key={i}
            id={`section-${i}`}
            className="bg-white border border-grace rounded-xl p-6 mb-6"
          >
            <h2 className="text-xl font-bold text-scripture mb-2">
              {section.title}
            </h2>

            {section.verses.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {section.verses.map((v, j) => (
                  <span
                    key={j}
                    className="text-xs bg-blue-50 text-blue-700 rounded px-2 py-0.5"
                  >
                    {v}
                  </span>
                ))}
              </div>
            )}

            <div className="space-y-4 text-primary-dark/80 leading-relaxed">
              {splitParagraphs(section.content).map((paragraph, pi) => (
                <p key={pi}>{paragraph}</p>
              ))}
            </div>

            {section.discussionQuestions && section.discussionQuestions.length > 0 && (
              <div className="mt-6 bg-primary-light/30 border border-grace rounded-lg p-5">
                <h3 className="text-sm font-bold text-scripture mb-3">Discussion Questions</h3>
                <ol className="space-y-2 text-sm text-primary-dark/70">
                  {section.discussionQuestions.map((q, qi) => (
                    <li key={qi} className="pl-1">
                      {qi + 1}. {q}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </section>
        ))}

        {/* Quiz CTA */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-scripture mb-2">Test Your Knowledge</h2>
          <p className="text-sm text-primary-dark/70 mb-4">
            How well do you know what the Bible teaches about {guide.title.toLowerCase()}? Explore related quizzes and topics.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/bible-quizzes"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Bible Quizzes
            </Link>
            <Link
              href="/topics"
              className="px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-primary-light transition-colors"
            >
              Bible Topics
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10">
          {prev ? (
            <Link
              href={`/bible-study-guides/${prev.slug}`}
              className="flex-1 bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-primary-dark/60">Previous Guide</span>
              <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link
              href={`/bible-study-guides/${next.slug}`}
              className="flex-1 text-right bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-primary-dark/60">Next Guide</span>
              <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                {next.title}
              </span>
            </Link>
          ) : <div className="flex-1" />}
        </div>

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-scripture mb-4">
              More {guide.category} Guides
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {relatedGuides.map(g => (
                <Link
                  key={g.slug}
                  href={`/bible-study-guides/${g.slug}`}
                  className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <span className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                    {g.title}
                  </span>
                  <span className="block text-xs text-primary-dark/60 mt-0.5">
                    {g.sections.length} sections
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Internal Links */}
        <section className="bg-grace/10 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/bible-study-guides" className="text-blue-600 hover:underline text-sm">
              All Bible Study Guides
            </Link>
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
          </div>
        </section>
      </article>
    </>
  );
}
