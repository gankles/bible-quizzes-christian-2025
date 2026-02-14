import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllStories, getStoryBySlug, getStoriesByBook } from '@/lib/bible-stories-data';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllStories().map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};

  return {
    title: `${story.title} | Bible Story for Children — ${story.reference} | Easy-to-Read Retelling for Kids & Families | Bible Maximum`,
    description: `Read the Bible story "${story.title}" from ${story.reference}. A classic children's Bible story from the book of ${story.book} for kids and families.`,
    keywords: [
      story.title, `${story.book} Bible story`, `${story.title} for kids`,
      "children's Bible story", 'Bible story', story.reference,
      'kids Bible stories', 'family Bible reading',
    ],
    openGraph: {
      title: `${story.title} — Bible Story`,
      description: `Bible story from ${story.reference}: ${story.title}`,
      url: `/bible-stories/${story.slug}`,
      type: 'article',
    },
    alternates: { canonical: `/bible-stories/${story.slug}` },
  };
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const allStories = getAllStories();
  const currentIndex = allStories.findIndex(s => s.slug === story.slug);
  const prev = currentIndex > 0 ? allStories[currentIndex - 1] : null;
  const next = currentIndex < allStories.length - 1 ? allStories[currentIndex + 1] : null;

  const sameBookStories = getStoriesByBook(story.bookSlug)
    .filter(s => s.slug !== story.slug)
    .slice(0, 8);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: story.title,
    description: `Bible story from ${story.reference}`,
    url: `https://biblemaximum.com/bible-stories/${story.slug}`,
    isPartOf: {
      '@type': 'CollectionPage',
      name: "Children's Bible Stories",
      url: 'https://biblemaximum.com/bible-stories',
    },
  };

  // Build chapter quiz slug for interlinking
  const chapterQuizSlug = story.bookSlug && story.chapter
    ? `${story.bookSlug}-${story.chapter}-quiz`
    : null;

  // Build book chapters slug
  const bookChaptersSlug = story.bookSlug ? `${story.bookSlug}-chapters` : null;

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 pt-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/bible-stories" className="hover:text-blue-600">Bible Stories</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900 font-medium">{story.title}</span>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full mb-3">
            {story.book}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {story.title}
          </h1>
          <p className="text-lg text-gray-600">{story.reference}</p>
        </div>

        {/* Story Details */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Story Details</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Title</dt>
              <dd className="text-lg font-semibold text-gray-900">{story.title}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Scripture</dt>
              <dd className="text-gray-900">{story.reference}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Book</dt>
              <dd className="text-gray-900">{story.book}</dd>
            </div>
            {story.chapter > 0 && (
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Chapter</dt>
                <dd className="text-gray-900">{story.chapter}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Read the Scripture */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Read the Scripture</h2>
          <p className="text-sm text-gray-600 mb-4">
            Open your Bible and read {story.reference} to enjoy this story in full.
          </p>
          <div className="flex flex-wrap gap-3">
            {chapterQuizSlug && (
              <Link
                href={`/${chapterQuizSlug}`}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Take the {story.book} {story.chapter} Quiz
              </Link>
            )}
            {bookChaptersSlug && (
              <Link
                href={`/${bookChaptersSlug}`}
                className="px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors"
              >
                All {story.book} Chapters
              </Link>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10">
          {prev ? (
            <Link
              href={`/bible-stories/${prev.slug}`}
              className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-gray-500">Previous Story</span>
              <span className="block font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link
              href={`/bible-stories/${next.slug}`}
              className="flex-1 text-right bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-gray-500">Next Story</span>
              <span className="block font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {next.title}
              </span>
            </Link>
          ) : <div className="flex-1" />}
        </div>

        {/* More Stories from Same Book */}
        {sameBookStories.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              More Stories from {story.book}
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {sameBookStories.map(s => (
                <Link
                  key={s.slug}
                  href={`/bible-stories/${s.slug}`}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {s.title}
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5">{s.reference}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Internal Links Section */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/bible-stories" className="text-blue-600 hover:underline text-sm">
              All Bible Stories
            </Link>
            {bookChaptersSlug && (
              <Link href={`/${bookChaptersSlug}`} className="text-blue-600 hover:underline text-sm">
                {story.book} Chapter Quizzes
              </Link>
            )}
            <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">
              Bible Quizzes
            </Link>
            <Link href="/people" className="text-blue-600 hover:underline text-sm">
              Bible People Directory
            </Link>
            <Link href="/bible-names" className="text-blue-600 hover:underline text-sm">
              Bible Name Meanings
            </Link>
            <Link href="/timeline" className="text-blue-600 hover:underline text-sm">
              Bible Timeline
            </Link>
            <Link href="/commandments" className="text-blue-600 hover:underline text-sm">
              613 Commandments
            </Link>
            <Link href="/topics" className="text-blue-600 hover:underline text-sm">
              Bible Topics
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
