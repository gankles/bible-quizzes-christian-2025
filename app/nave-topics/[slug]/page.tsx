import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllNaveTopics, getNaveTopicBySlug, USX_TO_NAME, USX_TO_SLUG } from '@/lib/naves-data';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllNaveTopics().map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getNaveTopicBySlug(slug);
  if (!topic) return {};

  const name = topic.subject.charAt(0) + topic.subject.slice(1).toLowerCase();

  return {
    title: `What Does the Bible Say About ${name}? | ${topic.refCount} References Across ${topic.books.length} Books from Nave's Topical Bible | Bible Maximum`,
    description: `Study everything the Bible says about ${name}. ${topic.refCount} scripture references across ${topic.books.length} books. Browse by book for focused study. From Nave's Topical Bible.`,
    keywords: [
      `${name} in the Bible`, `${name} Bible verses`, `${name} scripture references`,
      "Nave's Topical Bible", `Bible study ${name}`, 'topical Bible study',
    ],
    openGraph: {
      title: `${name} — Nave's Topical Bible`,
      description: `${topic.refCount} Bible references about ${name} across ${topic.books.length} books.`,
      url: `/nave-topics/${topic.slug}`,
      type: 'article',
    },
    alternates: { canonical: `/nave-topics/${topic.slug}` },
  };
}

export default async function NaveTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getNaveTopicBySlug(slug);
  if (!topic) notFound();

  const name = topic.subject.charAt(0) + topic.subject.slice(1).toLowerCase();

  const allTopics = getAllNaveTopics();
  const currentIndex = allTopics.findIndex(t => t.slug === topic.slug);
  const prev = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const next = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: topic.subject,
    description: `Bible topic: ${name} — ${topic.refCount} scripture references`,
    url: `https://biblemaximum.com/nave-topics/${topic.slug}`,
    inDefinedTermSet: {
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
        <span className="text-gray-900 font-medium">{name}</span>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-3">
            Section {topic.section}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 capitalize">
            {name}
          </h1>
          <p className="text-lg text-gray-600">
            {topic.refCount} scripture references across {topic.books.length} books of the Bible
          </p>
        </div>

        {/* Browse by Book */}
        {topic.bookSlugs.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Study by Book</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {topic.books.map(bookCode => {
                const bookSlug = USX_TO_SLUG[bookCode] || bookCode.toLowerCase();
                const bookName = USX_TO_NAME[bookCode] || bookCode;
                return (
                  <Link
                    key={bookCode}
                    href={`/nave-topics/${topic.slug}/in/${bookSlug}`}
                    className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
                  >
                    <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {bookName}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Entries */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Entries ({topic.entries.length})
          </h2>
          <div className="space-y-3">
            {topic.entries.map((entry, i) => (
              <div key={i} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {entry.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10">
          {prev ? (
            <Link
              href={`/nave-topics/${prev.slug}`}
              className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-gray-500">Previous</span>
              <span className="block font-semibold text-gray-900 group-hover:text-blue-600 transition-colors capitalize">
                {prev.subject.toLowerCase()}
              </span>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link
              href={`/nave-topics/${next.slug}`}
              className="flex-1 text-right bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-gray-500">Next</span>
              <span className="block font-semibold text-gray-900 group-hover:text-blue-600 transition-colors capitalize">
                {next.subject.toLowerCase()}
              </span>
            </Link>
          ) : <div className="flex-1" />}
        </div>

        {/* Internal Links */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2">
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
            <Link href="/bible-stories" className="text-blue-600 hover:underline text-sm">
              Bible Stories for Children
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
