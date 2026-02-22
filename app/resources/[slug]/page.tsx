import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllResources, getResourceBySlug, titleToItemSlug } from '@/lib/resources-data';
import { StructuredData } from '@/components/StructuredData';

// ── Helpers ────────────────────────────────────────────────────────

function referenceToLink(ref: string): string | null {
  // Match patterns like "John 1:1-3", "1 John 4:8", "Genesis 1:26-27", "Psalms 145:9"
  const match = ref.match(
    /^(\d?\s?[A-Za-z]+(?:\s[A-Za-z]+)*)\s+(\d+):(\d+)/
  );
  if (!match) return null;
  const bookSlug = match[1].toLowerCase().replace(/\s+/g, '-');
  return `/verses/${bookSlug}/${match[2]}/${match[3]}`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Render description that may contain HTML (br tags, label/input/span for
// sidenotes, em/strong tags). We strip sidenote markup and render as
// plain paragraphs split on double newlines.
function renderDescription(desc: string): string[] {
  // Remove sidenote labels, inputs, and spans (use [\s\S] instead of
  // dotAll flag for broader TS target compatibility)
  let cleaned = desc
    .replace(/<label[^>]*>[\s\S]*?<\/label>/gi, '')
    .replace(/<input[^>]*\/?>/gi, '')
    .replace(/<span\s+class="sidenote"[^>]*>[\s\S]*?<\/span>/gi, '')
    .replace(/<span\s+class="margin-toggle[^"]*"[^>]*>[\s\S]*?<\/span>/gi, '');

  // Convert br tags to newlines
  cleaned = cleaned.replace(/<br\s*\/?>/gi, '\n\n');

  // Convert em/strong to plain text
  cleaned = cleaned.replace(/<\/?em>/gi, '');
  cleaned = cleaned.replace(/<\/?strong>/gi, '');

  // Remove any remaining tags
  cleaned = cleaned.replace(/<[^>]+>/g, '');

  // Split into paragraphs on double newlines
  return cleaned
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

// ── Static Params ──────────────────────────────────────────────────

export async function generateStaticParams() {
  return [];
}

// ── Metadata ───────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};

  const desc = resource.introduction
    ? resource.introduction.slice(0, 155)
    : `Study ${resource.title} with ${resource.totalVerses} KJV verse references across ${resource.categories.length} categories.`;

  return {
    title: `${resource.title} - Bible Resource | ${resource.totalVerses} Verse References & Study Notes | Bible Maximum`,
    description: desc,
    keywords: [
      resource.title,
      'Bible study',
      'Bible resource',
      'KJV study',
      'Bible verses',
      'theology',
      'doctrine',
    ],
    openGraph: {
      title: `${resource.title} — Bible Study Resource`,
      description: desc,
      url: `/resources/${slug}`,
      type: 'article',
    },
    alternates: { canonical: `/resources/${slug}` },
  };
}

// ── Page ───────────────────────────────────────────────────────────

export default async function ResourcePage({ params }: PageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  const allResources = getAllResources();
  const currentIndex = allResources.findIndex((r) => r.slug === slug);
  const prev = currentIndex > 0 ? allResources[currentIndex - 1] : null;
  const next =
    currentIndex < allResources.length - 1
      ? allResources[currentIndex + 1]
      : null;

  // Schema markup
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: resource.title,
    description:
      resource.introduction ||
      `${resource.title} Bible study resource with ${resource.totalVerses} verse references.`,
    url: `https://biblemaximum.com/resources/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Bible Maximum',
      url: 'https://biblemaximum.com',
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Bible Maximum',
      url: 'https://biblemaximum.com',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://biblemaximum.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Resources',
        item: 'https://biblemaximum.com/resources',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: resource.title,
      },
    ],
  };

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <Link href="/resources" className="hover:text-blue-600">
          Resources
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">{resource.title}</span>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          {resource.subtitle && (
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-3">
              {resource.subtitle}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-display font-bold text-scripture mb-2">
            {resource.title}
          </h1>
          <p className="text-lg text-primary-dark/70">
            {resource.categories.length}{' '}
            {resource.categories.length === 1 ? 'category' : 'categories'},{' '}
            {resource.totalEntries}{' '}
            {resource.totalEntries === 1 ? 'entry' : 'entries'},{' '}
            {resource.totalVerses} verse{' '}
            {resource.totalVerses === 1 ? 'reference' : 'references'}
          </p>
        </div>

        {/* Introduction */}
        {resource.introduction && (
          <div className="bg-white border border-grace rounded-xl p-6 mb-8">
            <p className="text-primary-dark/80 leading-relaxed">
              {resource.introduction}
            </p>
          </div>
        )}

        {/* Table of Contents */}
        {resource.categories.length > 1 && (
          <nav className="bg-white border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-4">
              Table of Contents
            </h2>
            <ol className="space-y-2">
              {resource.categories.map((cat, i) => (
                <li key={i}>
                  <a
                    href={`#${slugify(cat.name)}`}
                    className="text-blue-600 hover:underline"
                  >
                    {cat.name}
                  </a>
                  <span className="text-xs text-primary-dark/50 ml-2">
                    ({cat.entries.length}{' '}
                    {cat.entries.length === 1 ? 'entry' : 'entries'})
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Categories & Entries */}
        {resource.categories.map((cat, catIdx) => (
          <section key={catIdx} className="mb-10" id={slugify(cat.name)}>
            <h2 className="text-2xl font-bold font-display text-scripture mb-6 pb-2 border-b border-grace">
              {cat.name}
            </h2>

            <div className="space-y-8">
              {cat.entries.map((entry, entryIdx) => (
                <div
                  key={entryIdx}
                  className="bg-white border border-grace rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold text-scripture mb-1">
                    <Link
                      href={`/resources/${slug}/${titleToItemSlug(entry.data.title)}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {entry.data.title}
                    </Link>
                  </h3>
                  {entry.key !== entry.data.title && (
                    <p className="text-sm text-primary-dark/50 mb-3">
                      {entry.key}
                    </p>
                  )}

                  {/* Description */}
                  <div className="mb-5 space-y-3">
                    {renderDescription(entry.data.description).map(
                      (paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-primary-dark/80 leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      )
                    )}
                  </div>

                  {/* Verses */}
                  {entry.data.verses.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-primary-dark/60 uppercase tracking-wider">
                        Scripture References
                      </h4>
                      {entry.data.verses.map((verse, vIdx) => {
                        const link = referenceToLink(verse.reference);
                        return (
                          <div
                            key={vIdx}
                            className="border-l-2 border-blue-200 pl-4 py-1"
                          >
                            <blockquote className="text-primary-dark/70 font-serif italic leading-relaxed">
                              &ldquo;{verse.text}&rdquo;
                            </blockquote>
                            <p className="text-sm mt-1">
                              {link ? (
                                <Link
                                  href={link}
                                  className="text-blue-600 font-medium hover:underline"
                                >
                                  {verse.reference}
                                </Link>
                              ) : (
                                <span className="text-blue-600 font-medium">
                                  {verse.reference}
                                </span>
                              )}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Prev / Next Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10">
          {prev ? (
            <Link
              href={`/resources/${prev.slug}`}
              className="flex-1 bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-primary-dark/60">
                Previous Resource
              </span>
              <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/resources/${next.slug}`}
              className="flex-1 text-right bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-primary-dark/60">
                Next Resource
              </span>
              <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                {next.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>

        {/* Internal Links */}
        <section className="bg-grace/10 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">
            Continue Your Study
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link
              href="/resources"
              className="text-blue-600 hover:underline text-sm"
            >
              All Bible Resources
            </Link>
            <Link
              href="/topics"
              className="text-blue-600 hover:underline text-sm"
            >
              Bible Topics
            </Link>
            <Link
              href="/nave-topics"
              className="text-blue-600 hover:underline text-sm"
            >
              Nave&apos;s Topical Bible
            </Link>
            <Link
              href="/lexicon"
              className="text-blue-600 hover:underline text-sm"
            >
              Hebrew &amp; Greek Word Study
            </Link>
            <Link
              href="/commandments"
              className="text-blue-600 hover:underline text-sm"
            >
              613 Commandments
            </Link>
            <Link
              href="/bible-quizzes"
              className="text-blue-600 hover:underline text-sm"
            >
              Bible Quizzes
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
