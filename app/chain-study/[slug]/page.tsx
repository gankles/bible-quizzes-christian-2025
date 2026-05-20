import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { StructuredData } from '@/components/StructuredData';
import {
  getChainStudy,
  getAllChainStudies,
  getRelatedChains,
  ChainStudy,
  ChainBookGroup,
} from '@/lib/chain-data';
import { buildChainStudyMetadata } from '@/lib/seo/metadata-builder';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/seo/schema-builders';

export const revalidate = 86400 // 24 hours

interface ChainPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllChainStudies().map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: ChainPageProps): Promise<Metadata> {
  const { slug } = await params;
  const chain = getChainStudy(slug);
  if (!chain) return {};
  return buildChainStudyMetadata(chain);
}

function getTestamentColor(testament: 'OT' | 'NT'): {
  badge: string;
  border: string;
  bg: string;
  dot: string;
  text: string;
} {
  return testament === 'OT'
    ? {
        badge: 'bg-amber-100 text-amber-800 border-amber-200',
        border: 'border-amber-200',
        bg: 'bg-amber-50',
        dot: 'bg-amber-400',
        text: 'text-amber-700',
      }
    : {
        badge: 'bg-sacred/10 text-scripture border-sacred/20',
        border: 'border-sacred/20',
        bg: 'bg-blue-50',
        dot: 'bg-sacred',
        text: 'text-scripture',
      };
}

function generateChainInsights(chain: ChainStudy): string[] {
  const insights: string[] = [];
  const firstBook = chain.bookGroups[0];
  const lastBook = chain.bookGroups[chain.bookGroups.length - 1];

  if (firstBook && lastBook) {
    insights.push(
      `This theme first appears in ${firstBook.book} and continues through to ${lastBook.book}, spanning the full scope of Scripture.`
    );
  }

  if (chain.otBookCount > 0 && chain.ntBookCount > 0) {
    insights.push(
      `The chain bridges both testaments with ${chain.otBookCount} Old Testament and ${chain.ntBookCount} New Testament books, showing continuity of God's revelation.`
    );
  }

  const lawBooks = chain.bookGroups.filter(g => g.bookOrder <= 5);
  const prophets = chain.bookGroups.filter(g => g.bookOrder >= 23 && g.bookOrder <= 39);
  const gospels = chain.bookGroups.filter(g => g.bookOrder >= 40 && g.bookOrder <= 43);
  const epistles = chain.bookGroups.filter(g => g.bookOrder >= 45 && g.bookOrder <= 65);

  if (lawBooks.length > 0 && gospels.length > 0) {
    insights.push(
      `${chain.subject} is established in the Law (Torah) and fulfilled in the Gospels, tracing God's redemptive plan from promise to fulfillment.`
    );
  } else if (prophets.length > 0 && epistles.length > 0) {
    insights.push(
      `The prophetic foundations of ${chain.subject} find their theological development in the apostolic epistles.`
    );
  }

  if (chain.subTopics.length > 5) {
    insights.push(
      `With ${chain.subTopics.length} distinct sub-topics, this chain reveals the multifaceted nature of ${chain.subject} in biblical theology.`
    );
  }

  return insights.slice(0, 4);
}

export default async function ChainStudyDetailPage({ params }: ChainPageProps) {
  const { slug } = await params;
  const chain = getChainStudy(slug);

  if (!chain) {
    notFound();
  }

  const related = getRelatedChains(slug, 6);
  const insights = generateChainInsights(chain);

  const articleSchema = buildArticleSchema({
    headline: `${chain.subject}: A Chain Study Through the Bible`,
    description: `Trace ${chain.subject} through ${chain.bookCount} books of the Bible with ${chain.totalVerses} verse references.`,
    url: `/chain-study/${slug}`,
    about: chain.subject,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Chain Studies', url: '/chain-study' },
    { name: chain.subject, url: `/chain-study/${slug}` },
  ]);

  // Group book groups into OT and NT sections
  const otGroups = chain.bookGroups.filter(g => g.testament === 'OT');
  const ntGroups = chain.bookGroups.filter(g => g.testament === 'NT');

  return (
    <div className="min-h-screen bg-primary-light/30">
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-grace">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <ol className="flex items-center flex-wrap gap-y-1 text-sm">
            <li>
              <Link href="/" className="text-sacred hover:underline">Home</Link>
            </li>
            <li className="text-ink-light mx-2">/</li>
            <li>
              <Link href="/chain-study" className="text-sacred hover:underline">Chain Studies</Link>
            </li>
            <li className="text-ink-light mx-2">/</li>
            <li className="text-ink-muted">{chain.subject}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-white border-b border-grace">
        <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
          <p className="text-sm font-medium text-sacred uppercase tracking-wider mb-2">
            Chain Study Through the Bible
          </p>
          <h1 className="text-3xl md:text-4xl font-bold font-display text-scripture mb-4">
            {chain.subject}
          </h1>
          <p className="text-lg text-ink-muted max-w-2xl mb-6">
            Trace the theme of <strong>{chain.subject}</strong> chronologically through
            Scripture -- from {chain.bookGroups[0]?.book} to{' '}
            {chain.bookGroups[chain.bookGroups.length - 1]?.book}.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-scripture">{chain.totalVerses.toLocaleString()}</p>
              <p className="text-xs text-ink-muted uppercase tracking-wider">Verses</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-scripture">{chain.bookCount}</p>
              <p className="text-xs text-ink-muted uppercase tracking-wider">Books</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-600">{chain.otBookCount}</p>
              <p className="text-xs text-ink-muted uppercase tracking-wider">Old Testament</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-sacred">{chain.ntBookCount}</p>
              <p className="text-xs text-ink-muted uppercase tracking-wider">New Testament</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-scripture">{chain.subTopics.length}</p>
              <p className="text-xs text-ink-muted uppercase tracking-wider">Sub-topics</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">

        {/* Chain Visualization */}
        <section>
          <h2 className="text-2xl font-bold font-display text-scripture mb-6">
            The Chain of {chain.subject} Through Scripture
          </h2>

          {/* Old Testament Section */}
          {otGroups.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 border border-amber-200">
                  Old Testament
                </span>
                <span className="text-sm text-ink-muted">
                  {otGroups.length} books
                </span>
              </div>
              <div className="space-y-3">
                {otGroups.map((group, idx) => (
                  <BookGroupCard key={group.book} group={group} index={idx} />
                ))}
              </div>
            </div>
          )}

          {/* Testament Divider */}
          {otGroups.length > 0 && ntGroups.length > 0 && (
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-gradient-to-r from-amber-300 to-scripture/80"></div>
              <span className="text-sm font-medium text-ink-muted whitespace-nowrap">
                400 Years of Silence
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-scripture to-scripture/80"></div>
            </div>
          )}

          {/* New Testament Section */}
          {ntGroups.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sacred/10 text-scripture border border-sacred/20">
                  New Testament
                </span>
                <span className="text-sm text-ink-muted">
                  {ntGroups.length} books
                </span>
              </div>
              <div className="space-y-3">
                {ntGroups.map((group, idx) => (
                  <BookGroupCard key={group.book} group={group} index={otGroups.length + idx} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* What This Chain Teaches */}
        {insights.length > 0 && (
          <section className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-2xl font-bold font-display text-scripture mb-4">
              What This Chain Teaches
            </h2>
            <ul className="space-y-3">
              {insights.map((insight, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sacred/10 text-scripture text-sm font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-scripture leading-relaxed">{insight}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Sub-topics Overview */}
        {chain.subTopics.length > 0 && (
          <section className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-2xl font-bold font-display text-scripture mb-4">
              Sub-Topics in This Chain
            </h2>
            <p className="text-ink-muted text-sm mb-4">
              {chain.subTopics.length} aspects of {chain.subject} found in Scripture
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {chain.subTopics.slice(0, 20).map((st, i) => (
                <div key={i} className="flex items-start gap-2 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sacred mt-2 flex-shrink-0"></span>
                  <div>
                    <span className="text-sm text-scripture">{st.title}</span>
                    <span className="text-xs text-ink-light ml-1.5">
                      ({st.verses.length} {st.verses.length === 1 ? 'verse' : 'verses'})
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {chain.subTopics.length > 20 && (
              <p className="text-sm text-ink-muted mt-3">
                ... and {chain.subTopics.length - 20} more sub-topics
              </p>
            )}
          </section>
        )}

        {/* CRO: Continue Your Study */}
        <section className="bg-gradient-to-br from-scripture to-white rounded-xl border border-sacred/20 p-6 md:p-8">
          <h2 className="text-xl font-bold font-display text-scripture mb-4">
            Continue Your Study
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href={`/topics/${slug}`}
              className="block bg-white rounded-lg border border-grace p-4 hover:border-sacred/50 hover:shadow-sm transition-all group"
            >
              <p className="font-semibold text-scripture group-hover:text-gold-dark transition-colors">
                {chain.subject} Topic Study
              </p>
              <p className="text-sm text-ink-muted mt-1">
                Deep-dive into this topic with verse text and commentary
              </p>
            </Link>

            <Link
              href={`/bible-encyclopedia/${slug}`}
              className="block bg-white rounded-lg border border-grace p-4 hover:border-sacred/50 hover:shadow-sm transition-all group"
            >
              <p className="font-semibold text-scripture group-hover:text-gold-dark transition-colors">
                Encyclopedia Entry
              </p>
              <p className="text-sm text-ink-muted mt-1">
                Etymology, definitions, and cross-references
              </p>
            </Link>

            <Link
              href={`/bible-quizzes`}
              className="block bg-white rounded-lg border border-grace p-4 hover:border-sacred/50 hover:shadow-sm transition-all group"
            >
              <p className="font-semibold text-scripture group-hover:text-gold-dark transition-colors">
                Test Your Knowledge
              </p>
              <p className="text-sm text-ink-muted mt-1">
                Take a Bible quiz to reinforce your understanding
              </p>
            </Link>
          </div>
        </section>

        {/* Related Chain Studies */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold font-display text-scripture mb-4">
              Related Chain Studies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/chain-study/${r.slug}`}
                  className="block bg-white rounded-lg border border-grace p-4 hover:border-sacred/50 hover:shadow-sm transition-all group"
                >
                  <p className="font-semibold text-scripture group-hover:text-gold-dark transition-colors">
                    {r.subject}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-ink-muted">
                    <span>{r.bookCount} books</span>
                    <span className="w-1 h-1 rounded-full bg-scripture/20"></span>
                    <span>{r.totalVerses} verses</span>
                    <span className="w-1 h-1 rounded-full bg-scripture/20"></span>
                    <span className="text-amber-600">{r.otBookCount} OT</span>
                    <span className="text-sacred">{r.ntBookCount} NT</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Browse All */}
        <div className="text-center py-4">
          <Link
            href="/chain-study"
            className="inline-flex items-center gap-2 px-6 py-3 bg-scripture text-white rounded-lg hover:bg-scripture/90 transition-colors font-medium"
          >
            Browse All Chain Studies A-Z
          </Link>
        </div>
      </main>
    </div>
  );
}

// ── Book Group Card Component ──

function BookGroupCard({ group, index }: { group: ChainBookGroup; index: number }) {
  const colors = getTestamentColor(group.testament);
  // Show up to 5 verses, then indicate more
  const displayVerses = group.verses.slice(0, 5);
  const remaining = group.verses.length - displayVerses.length;

  return (
    <div className={`bg-white rounded-lg border ${colors.border} overflow-hidden`}>
      <div className="flex items-start gap-4 p-4">
        {/* Chain line indicator */}
        <div className="flex flex-col items-center pt-1">
          <span className={`w-3 h-3 rounded-full ${colors.dot} flex-shrink-0`}></span>
          {index > 0 && (
            <div className={`w-0.5 h-full ${colors.dot} opacity-30 -mt-1`}></div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Book header */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="font-semibold text-scripture">{group.book}</h3>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors.badge}`}>
              {group.testament === 'OT' ? 'Old Testament' : 'New Testament'}
            </span>
            <span className="text-xs text-ink-light">
              {group.verses.length} {group.verses.length === 1 ? 'reference' : 'references'}
            </span>
          </div>

          {/* Verses */}
          <div className="space-y-1">
            {displayVerses.map((v, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-ink-light font-mono text-xs mt-0.5 whitespace-nowrap">
                  {v.reference}
                </span>
                {v.subTopicTitle && (
                  <span className="text-ink-muted italic text-xs mt-0.5">
                    -- {v.subTopicTitle}
                  </span>
                )}
              </div>
            ))}
            {remaining > 0 && (
              <p className="text-xs text-ink-light pl-0">
                + {remaining} more {remaining === 1 ? 'reference' : 'references'}
              </p>
            )}
          </div>

          {/* Sub-topics for this book */}
          {group.subTopics.length > 1 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {group.subTopics.slice(0, 4).map((st, i) => (
                <span
                  key={i}
                  className={`inline-block px-2 py-0.5 rounded text-xs ${colors.bg} ${colors.text}`}
                >
                  {st}
                </span>
              ))}
              {group.subTopics.length > 4 && (
                <span className="text-xs text-ink-light">
                  +{group.subTopics.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
