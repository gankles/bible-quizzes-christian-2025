import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getResourceItem, getAllResourceItemSlugs, titleToItemSlug } from '@/lib/resources-data';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ slug: string; item: string }>;
}

function referenceToLink(ref: string): string | null {
  const match = ref.match(/^(\d?\s?[A-Za-z]+(?:\s[A-Za-z]+)*)\s+(\d+):(\d+)/);
  if (!match) return null;
  const bookSlug = match[1].toLowerCase().replace(/\s+/g, '-');
  return `/verses/${bookSlug}/${match[2]}/${match[3]}`;
}

function renderDescription(desc: string): string[] {
  let cleaned = desc
    .replace(/<label[^>]*>[\s\S]*?<\/label>/gi, '')
    .replace(/<input[^>]*\/?>/gi, '')
    .replace(/<span\s+class="sidenote"[^>]*>[\s\S]*?<\/span>/gi, '')
    .replace(/<span\s+class="margin-toggle[^"]*"[^>]*>[\s\S]*?<\/span>/gi, '');
  cleaned = cleaned.replace(/<br\s*\/?>/gi, '\n\n');
  cleaned = cleaned.replace(/<\/?em>/gi, '');
  cleaned = cleaned.replace(/<\/?strong>/gi, '');
  cleaned = cleaned.replace(/<[^>]+>/g, '');
  return cleaned.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, item: itemSlug } = await params;
  const result = getResourceItem(slug, itemSlug);
  if (!result) return {};

  const descText = renderDescription(result.item.description)[0] || '';
  const desc = descText.length > 155 ? descText.slice(0, 152) + '...' : descText;

  return {
    title: `${result.item.title} - ${result.resource.title} | Bible Study Resource | Bible Maximum`,
    description: desc || `Study ${result.item.title} from ${result.resource.title} with ${result.item.verses.length} KJV verse references.`,
    keywords: [
      result.item.title, result.resource.title, result.category,
      'Bible study', 'KJV', 'Bible resource', 'theology',
    ],
    openGraph: {
      title: `${result.item.title} - ${result.resource.title}`,
      description: desc,
      url: `/resources/${slug}/${itemSlug}`,
      type: 'article',
    },
    alternates: { canonical: `/resources/${slug}/${itemSlug}` },
  };
}

export default async function ResourceItemPage({ params }: PageProps) {
  const { slug, item: itemSlug } = await params;
  const result = getResourceItem(slug, itemSlug);
  if (!result) notFound();

  const { resource, category, item, categoryEntries } = result;

  const relatedItems = categoryEntries
    .filter(e => titleToItemSlug(e.title) !== itemSlug)
    .slice(0, 6);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${item.title} - ${resource.title}`,
    description: renderDescription(item.description)[0] || item.title,
    url: `https://biblemaximum.com/resources/${slug}/${itemSlug}`,
    isPartOf: {
      '@type': 'CollectionPage',
      name: resource.title,
      url: `https://biblemaximum.com/resources/${slug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bible Maximum',
      url: 'https://biblemaximum.com',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://biblemaximum.com/resources' },
      { '@type': 'ListItem', position: 3, name: resource.title, item: `https://biblemaximum.com/resources/${slug}` },
      { '@type': 'ListItem', position: 4, name: item.title },
    ],
  };

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />

      <div className="min-h-screen bg-primary-light/30 dark:bg-dark-bg">
        {/* Hero */}
        <div className="bg-white dark:bg-dark-surface border-b border-grace dark:border-dark-border py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-10">
            <nav className="flex items-center gap-2 text-sm text-primary-dark/60 dark:text-primary-dark/40 mb-6 flex-wrap">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/resources" className="hover:text-blue-600 transition-colors">Resources</Link>
              <span>/</span>
              <Link href={`/resources/${slug}`} className="hover:text-blue-600 transition-colors">{resource.title}</Link>
              <span>/</span>
              <span className="text-scripture dark:text-white font-medium">{item.title}</span>
            </nav>

            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase mb-4">
              {category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-scripture dark:text-white font-display mb-3">
              {item.title}
            </h1>
            <p className="text-lg text-primary-dark/70 dark:text-primary-dark/40">
              {resource.title} &middot; {item.verses.length} verse{item.verses.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="max-w-4xl mx-auto px-4 md:px-10 mt-[-1.5rem] relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-600 rounded-lg p-6 text-white shadow-lg flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Take a Bible Quiz</h3>
                <p className="text-white/80 text-xs">Test your scripture knowledge</p>
              </div>
              <Link href="/bible-quizzes" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase">
                Start
              </Link>
            </div>
            <div className="bg-scripture dark:bg-dark-surface rounded-lg p-6 text-white shadow-lg flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Browse {resource.title}</h3>
                <p className="text-white/80 text-xs">{resource.totalEntries} entries to explore</p>
              </div>
              <Link href={`/resources/${slug}`} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase transition-all">
                View
              </Link>
            </div>
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-4 md:px-10 py-12">
          {/* Content */}
          <section className="mb-10">
            <div className="space-y-4">
              {renderDescription(item.description).map((paragraph, i) => (
                <p key={i} className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Scripture References */}
          {item.verses.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">
                Scripture References
              </h2>
              <div className="space-y-4">
                {item.verses.map((verse, i) => {
                  const link = referenceToLink(verse.reference);
                  return (
                    <div key={i} className="bg-white dark:bg-dark-surface border border-grace dark:border-dark-border rounded-xl p-5">
                      <div className="mb-2">
                        {link ? (
                          <Link href={link} className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-lg hover:bg-blue-200 transition-colors">
                            {verse.reference}
                          </Link>
                        ) : (
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-lg">
                            {verse.reference}
                          </span>
                        )}
                      </div>
                      <blockquote className="text-primary-dark/70 dark:text-primary-dark/40 font-serif italic leading-relaxed">
                        &ldquo;{verse.text}&rdquo;
                      </blockquote>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Related Items from Same Category */}
          {relatedItems.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-scripture dark:text-white font-display mb-4">
                More from {category}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {relatedItems.map((entry, i) => (
                  <Link
                    key={i}
                    href={`/resources/${slug}/${titleToItemSlug(entry.title)}`}
                    className="bg-white dark:bg-dark-surface border border-grace dark:border-dark-border rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
                  >
                    <span className="font-semibold text-scripture dark:text-white group-hover:text-blue-600 transition-colors">
                      {entry.title}
                    </span>
                    <span className="block text-xs text-primary-dark/60 dark:text-primary-dark/40 mt-0.5">
                      {entry.verses.length} verse{entry.verses.length !== 1 ? 's' : ''}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Internal Links */}
          <section className="bg-grace/10 dark:bg-dark-surface/30 border border-grace dark:border-dark-border rounded-xl p-6">
            <h2 className="text-lg font-bold text-scripture dark:text-white mb-3">Continue Your Study</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              <Link href={`/resources/${slug}`} className="text-blue-600 hover:underline text-sm">
                {resource.title}
              </Link>
              <Link href="/resources" className="text-blue-600 hover:underline text-sm">
                All Bible Resources
              </Link>
              <Link href="/lexicon" className="text-blue-600 hover:underline text-sm">
                Hebrew &amp; Greek Lexicon
              </Link>
              <Link href="/topics" className="text-blue-600 hover:underline text-sm">
                Bible Topics
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
              <Link href="/commandments" className="text-blue-600 hover:underline text-sm">
                613 Commandments
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
