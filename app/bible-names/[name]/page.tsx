import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllBibleNames,
  getBibleNameBySlug,
  getBibleNamesForLetter,
} from '@/lib/bible-names-data';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  return getAllBibleNames().map(n => ({ name: n.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name: slug } = await params;
  const entry = getBibleNameBySlug(slug);
  if (!entry) return {};

  return {
    title: `${entry.name} — Biblical Name Meaning & Origin | What Does ${entry.name} Mean in the Bible? | Hebrew Definition & Scriptural Context | Bible Maximum`,
    description: `The biblical name ${entry.name} means "${entry.meaning}". Discover the origin, significance, and scriptural context of the name ${entry.name} in the Bible.`,
    keywords: [
      `${entry.name} meaning`, `${entry.name} Bible meaning`, `what does ${entry.name} mean`,
      `${entry.name} biblical name`, `${entry.name} name origin`, 'Bible name meaning',
      'biblical baby names', 'Hebrew name meaning',
    ],
    openGraph: {
      title: `${entry.name} — Biblical Name Meaning`,
      description: `${entry.name} means "${entry.meaning}" in the Bible.`,
      url: `/bible-names/${entry.slug}`,
      type: 'article',
    },
    alternates: { canonical: `/bible-names/${entry.slug}` },
  };
}

export default async function BibleNamePage({ params }: PageProps) {
  const { name: slug } = await params;
  const entry = getBibleNameBySlug(slug);
  if (!entry) notFound();

  const allNames = getAllBibleNames();
  const currentIndex = allNames.findIndex(n => n.slug === entry.slug);
  const prev = currentIndex > 0 ? allNames[currentIndex - 1] : null;
  const next = currentIndex < allNames.length - 1 ? allNames[currentIndex + 1] : null;

  const sameLetterNames = getBibleNamesForLetter(entry.firstLetter)
    .filter(n => n.slug !== entry.slug)
    .slice(0, 12);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: entry.name,
    description: entry.meaning,
    url: `https://biblemaximum.com/bible-names/${entry.slug}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Hitchcock\'s Bible Names Dictionary',
      url: 'https://biblemaximum.com/bible-names',
    },
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 pt-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/bible-names" className="hover:text-blue-600">Bible Names</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900 font-medium">{entry.name}</span>
      </nav>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
              {entry.firstLetter}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {entry.name}
            </h1>
          </div>
          <p className="text-lg text-gray-600 mt-2">
            Biblical name meaning: <span className="font-semibold text-gray-900">&ldquo;{entry.meaning}&rdquo;</span>
          </p>
        </div>

        {/* Meaning Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Name Details</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Name</dt>
              <dd className="text-lg font-semibold text-gray-900">{entry.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Meaning</dt>
              <dd className="text-gray-900">{entry.meaning}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">First Letter</dt>
              <dd className="text-gray-900">{entry.firstLetter}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Source</dt>
              <dd className="text-gray-900">Hitchcock&apos;s Bible Names Dictionary</dd>
            </div>
          </dl>
        </div>

        {/* About Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            What Does &ldquo;{entry.name}&rdquo; Mean in the Bible?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The name <strong>{entry.name}</strong> is a biblical name meaning{' '}
            <strong>&ldquo;{entry.meaning}&rdquo;</strong>. In the Bible, names carried deep
            significance, often reflecting a person&apos;s character, destiny, or the
            circumstances of their birth. Understanding the meaning of biblical names enriches
            our reading of Scripture and reveals layers of significance in the biblical narrative.
          </p>
        </div>

        {/* Prev/Next Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10">
          {prev ? (
            <Link
              href={`/bible-names/${prev.slug}`}
              className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-gray-500">Previous</span>
              <span className="block font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {prev.name}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/bible-names/${next.slug}`}
              className="flex-1 text-right bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-gray-500">Next</span>
              <span className="block font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {next.name}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>

        {/* More Names Starting With Same Letter */}
        {sameLetterNames.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              More Names Starting with &ldquo;{entry.firstLetter}&rdquo;
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {sameLetterNames.map(n => (
                <Link
                  key={n.slug}
                  href={`/bible-names/${n.slug}`}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {n.name}
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5 line-clamp-1">
                    {n.meaning}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Internal Links Section */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/bible-names" className="text-blue-600 hover:underline text-sm">
              All Bible Names &amp; Meanings
            </Link>
            <Link href="/people" className="text-blue-600 hover:underline text-sm">
              Bible People Directory
            </Link>
            <Link href="/bible-stories" className="text-blue-600 hover:underline text-sm">
              Bible Stories for Children
            </Link>
            <Link href="/timeline" className="text-blue-600 hover:underline text-sm">
              Bible Timeline
            </Link>
            <Link href="/commandments" className="text-blue-600 hover:underline text-sm">
              613 Commandments
            </Link>
            <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">
              Bible Quizzes
            </Link>
            <Link href="/topics" className="text-blue-600 hover:underline text-sm">
              Bible Topics
            </Link>
            <Link href="/bible-book-names" className="text-blue-600 hover:underline text-sm">
              Bible Book Names &amp; Origins
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
