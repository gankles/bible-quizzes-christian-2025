import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllNaveTopicBookCombos,
  getNaveTopicInBook,
  getNaveTopicBySlug,
  USX_TO_NAME,
  USX_TO_SLUG,
} from '@/lib/naves-data';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ slug: string; book: string }>;
}

export async function generateStaticParams() {
  return getAllNaveTopicBookCombos().map(c => ({ slug: c.topic, book: c.book }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, book } = await params;
  const data = getNaveTopicInBook(slug, book);
  if (!data) return {};

  const name = data.topic.subject.charAt(0) + data.topic.subject.slice(1).toLowerCase();

  return {
    title: `${name} in ${data.bookName} | Nave's Topical Bible — ${data.refCount} Scripture References`,
    description: `Study ${name} in the book of ${data.bookName}. ${data.refCount} scripture references from Nave's Topical Bible. Browse verse-by-verse entries for focused Bible study.`,
    keywords: [
      `${name} in ${data.bookName}`, `${name} Bible verses`, `${data.bookName} ${name}`,
      "Nave's Topical Bible", `Bible study ${name}`, `${data.bookName} topics`,
    ],
    openGraph: {
      title: `${name} in ${data.bookName} — Nave's Topical Bible`,
      description: `${data.refCount} references about ${name} in ${data.bookName}.`,
      url: `/nave-topics/${slug}/in/${book}`,
      type: 'article',
    },
    alternates: { canonical: `/nave-topics/${slug}/in/${book}` },
  };
}

export default async function NaveTopicInBookPage({ params }: PageProps) {
  const { slug, book } = await params;
  const data = getNaveTopicInBook(slug, book);
  if (!data) notFound();

  const { topic, bookName, entries, refCount } = data;
  const name = topic.subject.charAt(0) + topic.subject.slice(1).toLowerCase();

  // Other books for this topic (for sidebar navigation)
  const otherBooks = topic.books
    .filter(b => (USX_TO_SLUG[b] || b.toLowerCase()) !== book)
    .map(b => ({
      code: b,
      slug: USX_TO_SLUG[b] || b.toLowerCase(),
      name: USX_TO_NAME[b] || b,
    }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: `${name} in ${bookName}`,
    description: `${refCount} scripture references about ${name} in ${bookName}`,
    url: `https://biblemaximum.com/nave-topics/${slug}/in/${book}`,
    isPartOf: {
      '@type': 'DefinedTermSet',
      name: "Nave's Topical Bible",
      url: 'https://biblemaximum.com/nave-topics',
    },
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 pt-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/nave-topics" className="hover:text-blue-600">Nave&apos;s Topical Bible</Link>
        <span className="mx-1.5">/</span>
        <Link href={`/nave-topics/${topic.slug}`} className="hover:text-blue-600 capitalize">
          {name}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900 font-medium">{bookName}</span>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              Section {topic.section}
            </span>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              {bookName}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 capitalize">
            {name} in {bookName}
          </h1>
          <p className="text-lg text-gray-600">
            {refCount} scripture references from Nave&apos;s Topical Bible
          </p>
        </div>

        {/* Entries */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Entries ({entries.length})
          </h2>
          <div className="space-y-3">
            {entries.map((entry, i) => (
              <div key={i} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {entry.text}
                </p>
                {entry.references.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {entry.references.map((ref, j) => (
                      <span
                        key={j}
                        className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded"
                      >
                        {ref.raw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Other books for this topic */}
        {otherBooks.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {name} in Other Books ({otherBooks.length})
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {otherBooks.map(b => (
                <Link
                  key={b.code}
                  href={`/nave-topics/${topic.slug}/in/${b.slug}`}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {b.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to full topic */}
        <div className="flex items-center justify-center mb-10">
          <Link
            href={`/nave-topics/${topic.slug}`}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All {name} References ({topic.refCount} total)
          </Link>
        </div>

        {/* Internal Links */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href={`/nave-topics/${topic.slug}`} className="text-blue-600 hover:underline text-sm capitalize">
              {name} — Full Topic
            </Link>
            <Link href="/nave-topics" className="text-blue-600 hover:underline text-sm">
              Nave&apos;s Topical Bible
            </Link>
            <Link href="/topics" className="text-blue-600 hover:underline text-sm">
              Bible Topics
            </Link>
            <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">
              Bible Quizzes
            </Link>
            <Link href="/people" className="text-blue-600 hover:underline text-sm">
              Bible People Directory
            </Link>
            <Link href="/bible-names" className="text-blue-600 hover:underline text-sm">
              Bible Name Meanings
            </Link>
            <Link href="/commandments" className="text-blue-600 hover:underline text-sm">
              613 Commandments
            </Link>
            <Link href="/timeline" className="text-blue-600 hover:underline text-sm">
              Bible Timeline
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
