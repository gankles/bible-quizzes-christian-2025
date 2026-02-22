import { cache } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllStories, getStoryBySlug, getStoriesByCategory } from '@/lib/bible-stories-data';
import { getChapter, stripHtml, getBookId } from '@/lib/bolls-api';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Parse verse range from reference like "Genesis 1:1-25" or "Genesis 3"
function parseVerseRange(reference: string): { startVerse: number; endVerse: number } | null {
  const rangeMatch = reference.match(/:(\d+)-(\d+)/);
  if (rangeMatch) return { startVerse: parseInt(rangeMatch[1]), endVerse: parseInt(rangeMatch[2]) };
  const singleMatch = reference.match(/:(\d+)$/);
  if (singleMatch) {
    const v = parseInt(singleMatch[1]);
    return { startVerse: v, endVerse: v };
  }
  return null;
}

const getStoryVerses = cache(async function (bookSlug: string, chapter: number, reference: string) {
  if (!chapter || !getBookId(bookSlug)) return null;
  try {
    const allVerses = await getChapter('KJV', bookSlug, chapter);
    const range = parseVerseRange(reference);
    if (range) {
      return allVerses.filter(v => v.verse >= range.startVerse && v.verse <= range.endVerse);
    }
    return allVerses;
  } catch {
    return null;
  }
});

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};

  const verseList = story.verses.join(', ');

  return {
    title: `${story.title} — Bible Story | ${verseList} | Full Narrative & Kids Version | Bible Maximum`,
    description: story.description,
    keywords: [
      story.title, `${story.book} Bible story`, `${story.title} for kids`,
      "Bible story", story.category, verseList,
      'kids Bible stories', 'family Bible reading', `${story.book} stories`,
      ...story.themes.slice(0, 4),
    ],
    openGraph: {
      title: `${story.title} — Bible Story from ${verseList}`,
      description: story.description,
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

  const sameCategoryStories = getStoriesByCategory(story.categorySlug)
    .filter(s => s.slug !== story.slug)
    .slice(0, 8);

  // Fetch actual scripture text from first verse reference
  const verses = story.chapter > 0
    ? await getStoryVerses(story.bookSlug, story.chapter, story.verses[0])
    : null;

  // Build slugs for interlinking
  const chapterQuizSlug = story.bookSlug && story.chapter
    ? `${story.bookSlug}-${story.chapter}-quiz`
    : null;
  const bookChaptersSlug = story.bookSlug ? `${story.bookSlug}-chapters` : null;
  const chapterReaderSlug = story.bookSlug && story.chapter
    ? `chapters/${story.bookSlug}/${story.chapter}`
    : null;

  // Memory verse: first verse of the passage
  const memoryVerse = verses && verses.length > 0 ? verses[0] : null;

  const verseList = story.verses.join(', ');

  // Schema markup
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: story.title,
    headline: `${story.title} — Bible Story from ${verseList}`,
    description: story.description,
    url: `https://biblemaximum.com/bible-stories/${story.slug}`,
    isPartOf: {
      '@type': 'CollectionPage',
      name: "Bible Stories",
      url: 'https://biblemaximum.com/bible-stories',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bible Stories', item: 'https://biblemaximum.com/bible-stories' },
      { '@type': 'ListItem', position: 3, name: story.title },
    ],
  };

  const themesText = story.themes.length > 0
    ? story.themes.join(', ')
    : 'faith, obedience, and trust in God';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the story of "${story.title}" in the Bible?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${story.description} This story is found in ${verseList}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Where is "${story.title}" found in the Bible?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `"${story.title}" is found in ${verseList}, in the book of ${story.book}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What can children learn from "${story.title}"?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `This story teaches children about ${themesText}. ${story.kidsDescription || story.description}`,
        },
      },
    ],
  };

  // Split narrative into paragraphs for clean rendering
  const narrativeParagraphs = story.narrative.split('\n').filter(p => p.trim());
  const kidsNarrativeParagraphs = story.kidsNarrative.split('\n').filter(p => p.trim());

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      {/* 1. Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/bible-stories" className="hover:text-blue-600">Bible Stories</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">{story.title}</span>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* 2. Header */}
        <div className="mb-8">
          <Link
            href={`/bible-stories#cat-${story.categorySlug}`}
            className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full mb-3 hover:bg-amber-200 transition-colors"
          >
            {story.category}
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-scripture mb-2">
            {story.title}
          </h1>
          <p className="text-lg text-primary-dark/70 mb-3">{story.description}</p>
          <p className="text-sm text-primary-dark/50">{verseList}</p>
        </div>

        {/* CTA Strip */}
        {(chapterQuizSlug || bookChaptersSlug) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 mt-[-0.5rem] relative z-20">
            {chapterQuizSlug && (
              <Link
                href={`/${chapterQuizSlug}`}
                className="bg-blue-600 rounded-lg p-5 text-white shadow-lg flex items-center justify-between hover:bg-blue-700 transition-colors"
              >
                <div>
                  <h3 className="font-bold text-lg">Take the {story.book} {story.chapter} Quiz</h3>
                  <p className="text-white/80 text-xs">Test your knowledge of this chapter</p>
                </div>
                <span className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase shrink-0 ml-3">
                  Begin
                </span>
              </Link>
            )}
            {bookChaptersSlug && (
              <Link
                href={`/${bookChaptersSlug}`}
                className="bg-scripture rounded-lg p-5 text-white shadow-lg flex items-center justify-between hover:bg-scripture/90 transition-colors"
              >
                <div>
                  <h3 className="font-bold text-lg">Explore {story.book} Chapters</h3>
                  <p className="text-white/80 text-xs">Study all chapters of {story.book}</p>
                </div>
                <span className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase shrink-0 ml-3">
                  View
                </span>
              </Link>
            )}
          </div>
        )}

        {/* 3. Themes */}
        {story.themes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {story.themes.map(theme => (
              <span
                key={theme}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
              >
                {theme}
              </span>
            ))}
          </div>
        )}

        {/* 4. Main Narrative (Adult Version) */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-scripture mb-4">The Story</h2>
          <div className="prose prose-scripture max-w-none">
            {narrativeParagraphs.map((para, i) => (
              <p key={i} className="text-scripture leading-relaxed mb-4">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* 5. Kids Version */}
        <section className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-bold text-scripture mb-1">{story.kidsTitle}</h2>
          <p className="text-xs text-primary-dark/50 mb-4">Kids Version</p>
          <div className="prose prose-scripture max-w-none">
            {kidsNarrativeParagraphs.map((para, i) => (
              <p key={i} className="text-scripture leading-relaxed mb-3 text-[15px]">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Post-Kids CTA */}
        {chapterQuizSlug && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="font-semibold text-scripture">Ready to test your knowledge?</p>
              <p className="text-sm text-primary-dark/60">See how well you know this story from {story.book}.</p>
            </div>
            <Link
              href={`/${chapterQuizSlug}`}
              className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shrink-0"
            >
              {story.book} {story.chapter} Quiz
            </Link>
          </div>
        )}

        {/* 6. Characters in This Story */}
        {story.characters.length > 0 && (
          <section className="bg-white border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-4">Characters in This Story</h2>
            <div className="flex flex-wrap gap-2">
              {story.characters.map(character => {
                const charSlug = toSlug(character);
                return (
                  <Link
                    key={character}
                    href={`/people/${charSlug}`}
                    className="inline-flex items-center gap-2 bg-primary-light/30 rounded-lg px-4 py-2 hover:bg-primary-light hover:border-blue-300 border border-grace transition-all group"
                  >
                    <span className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold flex-shrink-0">
                      {character.charAt(0)}
                    </span>
                    <span className="font-medium text-sm text-scripture group-hover:text-blue-600 transition-colors">
                      {character}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* 7. Scripture Text */}
        {verses && verses.length > 0 ? (
          <section className="bg-white border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-4">
              Scripture — {story.verses[0]} (KJV)
            </h2>
            <div className="space-y-3">
              {verses.map(verse => (
                <p key={verse.pk} className="text-scripture leading-relaxed">
                  <Link
                    href={`/verses/${story.bookSlug}/${story.chapter}/${verse.verse}`}
                    className="inline-flex items-center justify-center w-7 h-7 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mr-2 hover:bg-blue-200 transition-colors flex-shrink-0"
                  >
                    {verse.verse}
                  </Link>
                  {stripHtml(verse.text)}
                </p>
              ))}
            </div>
            {chapterReaderSlug && (
              <div className="mt-4 pt-4 border-t border-grace/50">
                <Link
                  href={`/${chapterReaderSlug}`}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Read {story.book} {story.chapter} with full commentary
                </Link>
              </div>
            )}
          </section>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-2">Read the Scripture</h2>
            <p className="text-sm text-primary-dark/70 mb-4">
              Open your Bible to {verseList} to read this story in full.
            </p>
            {chapterReaderSlug && (
              <Link
                href={`/${chapterReaderSlug}`}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors inline-block"
              >
                Read {story.book} {story.chapter} Online
              </Link>
            )}
          </div>
        )}

        {/* 8. Memory Verse */}
        {memoryVerse && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-3">Memory Verse</h2>
            <blockquote className="text-scripture italic text-lg leading-relaxed border-l-4 border-amber-400 pl-4">
              &ldquo;{stripHtml(memoryVerse.text)}&rdquo;
            </blockquote>
            <p className="text-sm text-primary-dark/70 mt-2 font-medium">
              — {story.book} {story.chapter}:{memoryVerse.verse} (KJV)
            </p>
          </div>
        )}

        {/* 9. Quiz CTA */}
        {chapterQuizSlug && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-2">Test Your Knowledge</h2>
            <p className="text-sm text-primary-dark/70 mb-4">
              How well do you know the story of &ldquo;{story.title}&rdquo;? Take the quiz to find out.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${chapterQuizSlug}`}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                {story.book} {story.chapter} Quiz
              </Link>
              {bookChaptersSlug && (
                <Link
                  href={`/${bookChaptersSlug}`}
                  className="px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-300 hover:bg-primary-light transition-colors"
                >
                  All {story.book} Chapters
                </Link>
              )}
            </div>
          </div>
        )}

        {/* 10. Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10">
          {prev ? (
            <Link
              href={`/bible-stories/${prev.slug}`}
              className="flex-1 bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-primary-dark/60">Previous Story</span>
              <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link
              href={`/bible-stories/${next.slug}`}
              className="flex-1 text-right bg-white border border-grace rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-primary-dark/60">Next Story</span>
              <span className="block font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                {next.title}
              </span>
            </Link>
          ) : <div className="flex-1" />}
        </div>

        {/* 11. More Stories from Same Category */}
        {sameCategoryStories.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-scripture mb-4">
              More from {story.category}
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {sameCategoryStories.map(s => (
                <Link
                  key={s.slug}
                  href={`/bible-stories/${s.slug}`}
                  className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <span className="font-semibold text-scripture group-hover:text-blue-600 transition-colors">
                    {s.title}
                  </span>
                  <span className="block text-xs text-primary-dark/60 mt-0.5">{s.verses.join(', ')}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 12. FAQ Section */}
        <section className="bg-white border border-grace rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-scripture mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-scripture mb-1">
                What is the story of &ldquo;{story.title}&rdquo; in the Bible?
              </h3>
              <p className="text-primary-dark/80 text-sm leading-relaxed">
                {story.description} This story is found in {verseList}.
              </p>
            </div>
            <div className="border-t border-grace/50 pt-4">
              <h3 className="font-semibold text-scripture mb-1">
                Where is &ldquo;{story.title}&rdquo; found in the Bible?
              </h3>
              <p className="text-primary-dark/80 text-sm leading-relaxed">
                &ldquo;{story.title}&rdquo; is found in {verseList}, in the book of {story.book}.
              </p>
            </div>
            <div className="border-t border-grace/50 pt-4">
              <h3 className="font-semibold text-scripture mb-1">
                What can children learn from &ldquo;{story.title}&rdquo;?
              </h3>
              <p className="text-primary-dark/80 text-sm leading-relaxed">
                This story teaches children about {themesText}. {story.kidsDescription || story.description}
              </p>
            </div>
          </div>
        </section>

        {/* 13. Contextual Internal Links */}
        <section className="bg-grace/10 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {chapterReaderSlug && (
              <Link href={`/${chapterReaderSlug}`} className="text-blue-600 hover:underline text-sm">
                Read {story.book} {story.chapter} with Commentary
              </Link>
            )}
            {chapterQuizSlug && (
              <Link href={`/${chapterQuizSlug}`} className="text-blue-600 hover:underline text-sm">
                {story.book} {story.chapter} Quiz
              </Link>
            )}
            {bookChaptersSlug && (
              <Link href={`/${bookChaptersSlug}`} className="text-blue-600 hover:underline text-sm">
                All {story.book} Chapters
              </Link>
            )}
            <Link href={`/${story.bookSlug}-quiz`} className="text-blue-600 hover:underline text-sm">
              Complete {story.book} Quiz
            </Link>
            <Link href="/bible-stories" className="text-blue-600 hover:underline text-sm">
              All Bible Stories
            </Link>
            <Link href="/people" className="text-blue-600 hover:underline text-sm">
              Bible Characters Directory
            </Link>
            <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">
              Bible Quizzes
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
