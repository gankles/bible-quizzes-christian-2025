import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBookMetadata, getAllBookMetadata, BookMetadata } from '@/lib/book-metadata';
import BookTools from './BookTools';

interface BookPageProps {
  params: Promise<{
    book: string;
  }>;
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { book } = resolvedParams;
  
  const metadata = getBookMetadata(book);
  if (!metadata) {
    return { title: 'Book Not Found' };
  }
  
  const hebrewPart = metadata.hebrewTransliteration ? ` (${metadata.hebrewTransliteration})` : '';
  const title = `${metadata.name}${hebrewPart} - Bible Book Introduction & Study Guide | ${metadata.chapters} Chapters, ${metadata.verseCount.toLocaleString()} Verses | Author, Date, Outline & Key Themes | Bible Maximum`;
  const description = `Complete introduction to the Book of ${metadata.name}${metadata.hebrewName ? ` (Hebrew: ${metadata.hebrewName}, "${metadata.hebrewMeaning}")` : ''} (Greek: ${metadata.greekName}). Author: ${metadata.author}. Date: ${metadata.dateWritten}. ${metadata.chapters} chapters, ${metadata.verseCount.toLocaleString()} verses. Key themes: ${metadata.keyThemes.slice(0, 4).join(', ')}.`;

  const keywords = [
    `Book of ${metadata.name}`,
    `${metadata.name} Bible`,
    `${metadata.name} introduction`,
    `${metadata.name} overview`,
    `${metadata.name} study guide`,
    `${metadata.name} summary`,
    metadata.author,
    ...metadata.keyThemes,
    metadata.category,
    `${metadata.testament === 'old' ? 'Old' : 'New'} Testament`,
  ];
  if (metadata.hebrewTransliteration) keywords.push(metadata.hebrewTransliteration, `${metadata.name} Hebrew name`, `${metadata.name} meaning`);
  keywords.push(metadata.greekTransliteration, `${metadata.name} Greek name`);

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/books/${book}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/books/${book}`,
    },
  };
}

export async function generateStaticParams() {
  const allBooks = getAllBookMetadata();
  return allBooks.map((book) => ({
    book: book.slug,
  }));
}

function getBookImage(): string {
  return '/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png';
}

function OutlineSection({ outline }: { outline: BookMetadata['outline'] }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Book Outline
      </h2>
      <div className="space-y-4">
        {outline.map((section, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-900">{section.heading}</h3>
              <span className="text-sm text-blue-600 font-mono bg-blue-50 px-2 py-1 rounded">
                {section.reference}
              </span>
            </div>
            <p className="text-gray-600 text-sm mt-1">{section.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FamousVersesSection({ verses, bookSlug }: { verses: BookMetadata['famousVerses']; bookSlug: string }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        Key Verses
      </h2>
      <div className="space-y-4">
        {verses.map((verse, index) => {
          const refParts = verse.reference.match(/^(\w+)\s+(\d+):(\d+)/);
          const verseLink = refParts 
            ? `/verses/${bookSlug}/${refParts[2]}/${refParts[3]}`
            : null;
          
          return (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <blockquote className="text-gray-700 italic mb-2">
                &ldquo;{verse.text}&rdquo;
              </blockquote>
              <div className="flex items-center justify-between">
                <cite className="text-blue-600 font-medium text-sm not-italic">
                  {verse.reference}
                </cite>
                {verseLink && (
                  <Link 
                    href={verseLink}
                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Study this verse &rarr;
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ThemesSection({ themes }: { themes: string[] }) {
  const themeColors = [
    'bg-blue-100 text-blue-800 border-blue-200',
    'bg-emerald-100 text-emerald-800 border-emerald-200',
    'bg-amber-100 text-amber-800 border-amber-200',
    'bg-purple-100 text-purple-800 border-purple-200',
    'bg-rose-100 text-rose-800 border-rose-200',
    'bg-cyan-100 text-cyan-800 border-cyan-200',
  ];
  
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        Key Themes
      </h2>
      <div className="flex flex-wrap gap-2">
        {themes.map((theme, index) => (
          <span
            key={index}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border ${themeColors[index % themeColors.length]}`}
          >
            {theme}
          </span>
        ))}
      </div>
    </section>
  );
}

function ChapterGrid({ bookSlug, bookName, totalChapters }: { bookSlug: string; bookName: string; totalChapters: number }) {
  const maxPreviewChapters = 10;
  const displayChapters = Math.min(totalChapters, maxPreviewChapters);
  
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Chapters
        </h2>
        <Link 
          href={`/${bookSlug}-chapters`}
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          View all {totalChapters} chapters &rarr;
        </Link>
      </div>
      
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {Array.from({ length: displayChapters }, (_, i) => i + 1).map((chapter) => (
          <Link
            key={chapter}
            href={`/${bookSlug}-${chapter}-quiz`}
            className="aspect-square flex items-center justify-center bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 font-medium rounded-lg transition-colors text-sm"
          >
            {chapter}
          </Link>
        ))}
        {totalChapters > maxPreviewChapters && (
          <Link
            href={`/${bookSlug}-chapters`}
            className="aspect-square flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-xs"
          >
            +{totalChapters - maxPreviewChapters}
          </Link>
        )}
      </div>
    </section>
  );
}

function RelatedQuizzes({ bookSlug, bookName }: { bookSlug: string; bookName: string }) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-600 rounded-xl shadow-sm p-6 mb-6 text-white">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
        Test Your Knowledge
      </h2>
      <p className="text-blue-100 mb-4">
        Ready to test what you know about {bookName}? Take our comprehensive quizzes.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href={`/${bookSlug}-quiz`}
          className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          <div>
            <span className="font-semibold block">{bookName} Book Quiz</span>
            <span className="text-sm text-blue-200">25 comprehensive questions</span>
          </div>
          <span>&rarr;</span>
        </Link>
        <Link
          href={`/${bookSlug}-chapters`}
          className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          <div>
            <span className="font-semibold block">Chapter Quizzes</span>
            <span className="text-sm text-blue-200">Study chapter by chapter</span>
          </div>
          <span>&rarr;</span>
        </Link>
      </div>
    </section>
  );
}

export default async function BookPage({ params }: BookPageProps) {
  const resolvedParams = await params;
  const { book } = resolvedParams;
  
  const metadata = getBookMetadata(book);
  if (!metadata) {
    notFound();
  }
  
  const bookImage = getBookImage();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/bible-quizzes" className="text-blue-600 hover:underline">Bible</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link 
                href={metadata.testament === 'old' ? '/old-testament-quizzes' : '/new-testament-quizzes'} 
                className="text-blue-600 hover:underline"
              >
                {metadata.testament === 'old' ? 'Old Testament' : 'New Testament'}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600">{metadata.name}</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-600 to-blue-700">
            <Image
              src={bookImage}
              alt={`Book of ${metadata.name}`}
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded">
                  {metadata.testament === 'old' ? 'Old Testament' : 'New Testament'}
                </span>
                <span className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded">
                  {metadata.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Book of {metadata.name}
              </h1>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200 border-b border-gray-200">
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{metadata.chapters}</p>
              <p className="text-sm text-gray-600">Chapters</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{metadata.verseCount.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Verses</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-lg font-semibold text-gray-900">{metadata.author}</p>
              <p className="text-sm text-gray-600">Author</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-lg font-semibold text-gray-900">{metadata.dateRange}</p>
              <p className="text-sm text-gray-600">Date Written</p>
            </div>
          </div>
          
          {/* Summary */}
          <div className="p-6 md:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{metadata.summary}</p>
            
            <h3 className="text-md font-semibold text-gray-900 mb-2">Purpose</h3>
            <p className="text-gray-700 leading-relaxed mb-4">{metadata.purpose}</p>
            
            <h3 className="text-md font-semibold text-gray-900 mb-2">Historical Context</h3>
            <p className="text-gray-700 leading-relaxed">{metadata.historicalContext}</p>
          </div>
        </article>

        {/* Book Name Origins */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            Name Origins
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {metadata.hebrewName && (
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <p className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-1">Hebrew</p>
                <p className="text-2xl font-bold text-gray-900 mb-1" dir="rtl" lang="he">{metadata.hebrewName}</p>
                <p className="text-sm text-gray-700 italic mb-1">{metadata.hebrewTransliteration}</p>
                <p className="text-sm text-gray-600">&ldquo;{metadata.hebrewMeaning}&rdquo;</p>
              </div>
            )}
            <div className={`bg-blue-50 rounded-lg p-4 border border-blue-100 ${!metadata.hebrewName ? 'sm:col-span-2' : ''}`}>
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Greek</p>
              <p className="text-2xl font-bold text-gray-900 mb-1" lang="el">{metadata.greekName}</p>
              <p className="text-sm text-gray-700 italic mb-1">{metadata.greekTransliteration}</p>
              {metadata.greekMeaning && (
                <p className="text-sm text-gray-600">&ldquo;{metadata.greekMeaning}&rdquo;</p>
              )}
            </div>
          </div>
        </section>

        {/* Themes */}
        <ThemesSection themes={metadata.keyThemes} />

        {/* Reading Tools */}
        <BookTools 
          bookName={metadata.name}
          bookSlug={book}
          chapters={metadata.chapters}
          keyThemes={metadata.keyThemes}
        />

        {/* Book Outline */}
        <OutlineSection outline={metadata.outline} />

        {/* Famous Verses */}
        <FamousVersesSection verses={metadata.famousVerses} bookSlug={book} />

        {/* Chapter Grid */}
        <ChapterGrid 
          bookSlug={book} 
          bookName={metadata.name} 
          totalChapters={metadata.chapters} 
        />

        {/* Related Quizzes CTA */}
        <RelatedQuizzes bookSlug={book} bookName={metadata.name} />

        {/* Navigation to Other Books */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More Books</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href={metadata.testament === 'old' ? '/old-testament-quizzes' : '/new-testament-quizzes'}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div>
                <span className="text-blue-600 font-semibold block">
                  {metadata.testament === 'old' ? 'Old Testament' : 'New Testament'} Books
                </span>
                <span className="text-sm text-gray-500">
                  {metadata.testament === 'old' ? '39 books' : '27 books'} to explore
                </span>
              </div>
            </Link>
            <Link
              href="/bible-quizzes"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div>
                <span className="text-blue-600 font-semibold block">All Bible Quizzes</span>
                <span className="text-sm text-gray-500">Browse all quiz categories</span>
              </div>
            </Link>
          </div>
        </section>

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: `Book of ${metadata.name} - Bible Introduction & Study Guide`,
              description: metadata.summary,
              author: {
                '@type': 'Organization',
                name: 'Bible Maximum',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Bible Maximum',
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://biblemaximum.com/books/${book}`,
              },
              about: {
                '@type': 'Book',
                name: `Book of ${metadata.name}`,
                alternateName: [
                  metadata.hebrewName,
                  metadata.hebrewTransliteration,
                  metadata.greekName,
                  metadata.greekTransliteration,
                ].filter(Boolean),
                author: metadata.author,
                dateCreated: metadata.dateWritten,
                genre: metadata.category,
                numberOfPages: metadata.chapters,
                isPartOf: {
                  '@type': 'Book',
                  name: 'The Holy Bible',
                },
              },
              keywords: [
                ...metadata.keyThemes,
                metadata.hebrewTransliteration,
                metadata.greekTransliteration,
              ].filter(Boolean).join(', '),
            }),
          }}
        />
      </main>
    </div>
  );
}
