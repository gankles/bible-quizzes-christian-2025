import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllNaveTopics, getNaveTopicBySlug, USX_TO_NAME, USX_TO_SLUG } from '@/lib/naves-data';
import { StructuredData } from '@/components/StructuredData';

export const revalidate = 86400 // 24 hours

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // 5K+ pages — generated on-demand via ISR, not at build time
  return [];
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
    alternates: { canonical: `/topics/${topic.slug}` },
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

  // Count references per book for the "Study by Book" grid
  const refCountByBook: Record<string, number> = {};
  for (const entry of topic.entries) {
    for (const ref of entry.references) {
      refCountByBook[ref.book] = (refCountByBook[ref.book] || 0) + 1;
    }
  }

  // Find related topics (same section or adjacent in list)
  const relatedTopics = allTopics
    .filter(t => t.slug !== topic.slug && t.section === topic.section)
    .slice(0, 6);

  // Cross-link to the /topics/ page if a matching slug exists
  const topicsCrossLink = `/topics/${topic.slug}`;

  // Schema markup
  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: topic.subject,
    description: `Bible topic: ${name} — ${topic.refCount} scripture references across ${topic.books.length} books`,
    url: `https://biblemaximum.com/nave-topics/${topic.slug}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: "Nave's Topical Bible",
      url: 'https://biblemaximum.com/nave-topics',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: "Nave's Topical Bible", item: 'https://biblemaximum.com/nave-topics' },
      { '@type': 'ListItem', position: 3, name: name },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What does the Bible say about ${name.toLowerCase()}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The Bible contains ${topic.refCount} references to ${name.toLowerCase()} across ${topic.books.length} books of the Bible. Nave's Topical Bible organizes these references for in-depth study.`,
        },
      },
      {
        '@type': 'Question',
        name: `Where is ${name.toLowerCase()} mentioned in the Bible?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${name} is referenced in ${topic.books.map(b => USX_TO_NAME[b] || b).join(', ')}. There are ${topic.refCount} total scripture references on this topic.`,
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={definedTermSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      <div className="max-w-[900px] mx-auto px-6 py-12">
        <ol className="editorial-breadcrumbs">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/nave-topics">Nave&apos;s Topical Bible</Link></li>
          <li>{name}</li>
        </ol>
        <span className="meta-eyebrow">Topical Scripture Guide</span>
        <h1 className="editorial-h1 capitalize">{name}</h1>
        <p className="editorial-deck">
          Explore {topic.refCount} scripture references about {name.toLowerCase()} from Nave&apos;s Topical Bible, spanning {topic.books.length} books of the Bible with categorized entries, verse text, and cross-references.
        </p>
      </div>

      <article className="max-w-[900px] mx-auto px-6 pb-16">

        {/* Topic Introduction */}
        <div className="bg-white border border-grace rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-scripture mb-3">
            What Does the Bible Say About {name}?
          </h2>
          <p className="text-scripture leading-relaxed">
            The topic of <strong>{name.toLowerCase()}</strong> appears throughout Scripture with{' '}
            <strong>{topic.refCount} references</strong> spanning{' '}
            <strong>{topic.books.length} books</strong> of the Bible, from{' '}
            {USX_TO_NAME[topic.books[0]] || topic.books[0]}
            {topic.books.length > 1 && <> to {USX_TO_NAME[topic.books[topic.books.length - 1]] || topic.books[topic.books.length - 1]}</>}.
            {' '}Explore the scriptures below to deepen your understanding of what God&apos;s Word teaches about this subject.
          </p>
        </div>

        {/* Browse by Book — with reference counts */}
        {topic.bookSlugs.length > 0 && (
          <div className="bg-white border border-grace rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-scripture mb-4">Study by Book</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {topic.books.map(bookCode => {
                const bookSlug = USX_TO_SLUG[bookCode] || bookCode.toLowerCase();
                const bookName = USX_TO_NAME[bookCode] || bookCode;
                const count = refCountByBook[bookCode] || 0;
                return (
                  <Link
                    key={bookCode}
                    href={`/nave-topics/${topic.slug}/in/${bookSlug}`}
                    className="bg-primary-light/30 border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-sacred/50 transition-all group flex items-center justify-between"
                  >
                    <span className="font-semibold text-scripture group-hover:text-gold-dark transition-colors">
                      {bookName}
                    </span>
                    <span className="text-xs text-ink-muted bg-grace/30 rounded-full px-2 py-0.5">
                      {count} ref{count !== 1 ? 's' : ''}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Entries */}
        <div className="mb-8">
          <h2 className="quiz-question-ref mb-6">Entries ({topic.entries.length})</h2>
          <div className="topical-verse-list">
            {topic.entries.map((entry, i) => (
              <div key={i} className="topical-verse-card">
                <p className="topical-verse-text">
                  {entry.text}
                </p>
                {entry.references.length > 0 && (
                  <div className="topical-verse-ref">
                    <div className="flex flex-wrap gap-2">
                    {entry.references.slice(0, 8).map((ref, j) => (
                      <Link
                        key={j}
                        href={`/chapters/${ref.bookSlug}/${ref.chapter}`}
                        className="text-xs font-bold uppercase tracking-wide text-sacred hover:underline"
                      >
                        {ref.raw}
                      </Link>
                    ))}
                    {entry.references.length > 8 && (
                      <span className="text-xs text-ink-light font-normal normal-case tracking-normal">+{entry.references.length - 8} more</span>
                    )}
                    </div>
                    <span className="text-xs text-ink-light font-normal normal-case tracking-normal">KJV</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quiz CTA — CRO */}
        <div className="bg-scripture rounded-2xl p-8 text-center mb-8">
          <span className="meta-eyebrow" style={{color:'#C9A961'}}>Keep Growing</span>
          <h2 className="font-display text-2xl font-bold text-white mb-3">Test Your Bible Knowledge</h2>
          <p className="text-white/80 text-sm mb-6">
            Take an interactive quiz to reinforce what you just studied about {name.toLowerCase()}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/bible-quizzes"
              className="px-6 py-3 bg-sacred text-scripture font-sans font-bold text-sm rounded-lg hover:bg-gold-dark transition-colors"
            >
              Browse All Quizzes →
            </Link>
            {topic.bookSlugs.length > 0 && (
              <Link
                href={`/${topic.bookSlugs[0]}-chapters`}
                className="px-6 py-3 bg-white/10 text-white font-sans font-semibold text-sm rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
              >
                {USX_TO_NAME[topic.books[0]] || topic.books[0]} Study
              </Link>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10">
          {prev ? (
            <Link
              href={`/nave-topics/${prev.slug}`}
              className="flex-1 bg-white border border-grace rounded-lg px-4 py-3 hover:border-sacred/50 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-ink-muted">Previous</span>
              <span className="block font-semibold text-scripture group-hover:text-gold-dark transition-colors capitalize">
                {prev.subject.toLowerCase()}
              </span>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link
              href={`/nave-topics/${next.slug}`}
              className="flex-1 text-right bg-white border border-grace rounded-lg px-4 py-3 hover:border-sacred/50 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-ink-muted">Next</span>
              <span className="block font-semibold text-scripture group-hover:text-gold-dark transition-colors capitalize">
                {next.subject.toLowerCase()}
              </span>
            </Link>
          ) : <div className="flex-1" />}
        </div>

        {/* Related Topics */}
        {relatedTopics.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-scripture mb-4">Related Topics</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTopics.map(t => {
                const tName = t.subject.charAt(0) + t.subject.slice(1).toLowerCase();
                return (
                  <Link
                    key={t.slug}
                    href={`/nave-topics/${t.slug}`}
                    className="bg-white border border-grace rounded-lg px-4 py-3 hover:shadow-md hover:border-sacred/50 transition-all group"
                  >
                    <span className="font-semibold text-scripture group-hover:text-gold-dark transition-colors capitalize">
                      {tName}
                    </span>
                    <span className="block text-xs text-ink-muted mt-0.5">
                      {t.refCount} reference{t.refCount !== 1 ? 's' : ''} in {t.books.length} book{t.books.length !== 1 ? 's' : ''}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="bg-white border border-grace rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-scripture mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-scripture mb-1">
                What does the Bible say about {name.toLowerCase()}?
              </h3>
              <p className="text-scripture text-sm leading-relaxed">
                The Bible contains {topic.refCount} references to {name.toLowerCase()} across {topic.books.length} books of the Bible. Nave&apos;s Topical Bible organizes these references for in-depth study.
              </p>
            </div>
            <div className="border-t border-grace/50 pt-4">
              <h3 className="font-semibold text-scripture mb-1">
                Where is {name.toLowerCase()} mentioned in the Bible?
              </h3>
              <p className="text-scripture text-sm leading-relaxed">
                {name} is referenced in {topic.books.slice(0, 5).map(b => USX_TO_NAME[b] || b).join(', ')}
                {topic.books.length > 5 && `, and ${topic.books.length - 5} more books`}.
                There are {topic.refCount} total scripture references on this topic.
              </p>
            </div>
          </div>
        </section>

        {/* Contextual Internal Links */}
        <section className="bg-grace/10 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href={topicsCrossLink} className="text-sacred hover:underline text-sm">
              {name} — Bible Topics
            </Link>
            <Link href="/nave-topics" className="text-sacred hover:underline text-sm">
              Nave&apos;s Topical Bible
            </Link>
            <Link href="/topics" className="text-sacred hover:underline text-sm">
              All Bible Topics
            </Link>
            <Link href="/people" className="text-sacred hover:underline text-sm">
              Bible Characters Directory
            </Link>
            <Link href="/bible-quizzes" className="text-sacred hover:underline text-sm">
              Bible Quizzes
            </Link>
            <Link href="/lexicon" className="text-sacred hover:underline text-sm">
              Hebrew &amp; Greek Word Study
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
