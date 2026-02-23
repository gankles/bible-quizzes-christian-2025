import { cache } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTopic as _getTopic, trackPageView } from '@/lib/database/queries';

const getCachedTopic = cache(async (slug: string, includeVerses?: boolean) => {
    return _getTopic(slug, includeVerses);
});
import { generatePageMetadata } from '@/lib/seo/metadata-generator';
import { StructuredData } from '@/components/StructuredData';
import { generateSchema } from '@/lib/seo/schema-generator';
import { getCrossPillarLinks, CrossPillarLink } from '@/lib/cross-pillar-links';
import { getKjvStudyTopic } from '@/lib/kjvstudy-topics';
import Link from 'next/link';

export async function generateStaticParams() {
    // Generated on-demand via ISR — avoids Bolls API calls during build
    return [];
}

interface TopicPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
    const { slug } = await params;
    const topic = await getCachedTopic(slug);
    if (!topic) return {};

    return generatePageMetadata({
        type: 'topic',
        data: topic,
        url: `/topics/${slug}`,
    });
}

export default async function TopicDetailPage({ params }: TopicPageProps) {
    const { slug } = await params;
    const topic = await getCachedTopic(slug, true);

    if (!topic) {
        notFound();
    }

    const url = `/topics/${slug}`;
    trackPageView(url, 'topic').catch(err => console.error('Analytics error:', err));

    const schemas = generateSchema({
        type: 'topic',
        data: {
            name: topic.name,
            description: topic.description,
            verseCount: topic.verseCount,
        },
        url,
    });

    const crossLinks = getCrossPillarLinks({
        name: topic.name,
        slug: topic.slug || slug,
        category: topic.category || '',
        verseRefs: topic.verseRefs || [],
        keywords: topic.keywords || [],
    });

    const kjvstudyTopic = getKjvStudyTopic(slug);

    return (
        <div className="min-h-screen bg-primary-light/30">
            <StructuredData data={schemas[0]} />

            <nav className="bg-white border-b border-grace">
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <ol className="flex items-center flex-wrap gap-y-1 text-sm">
                        <li>
                            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
                        </li>
                        <li className="text-primary-dark/40 mx-2">/</li>
                        <li>
                            <Link href="/topics" className="text-blue-600 hover:underline">Topics</Link>
                        </li>
                        <li className="text-primary-dark/40 mx-2">/</li>
                        <li className="text-primary-dark/70">{topic.name}</li>
                    </ol>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-8">
                <header className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-8">
                        <p className="text-blue-100 text-sm font-medium mb-2">{topic.category}</p>
                        <h1 className="text-3xl font-display font-bold">Bible Verses About {topic.name}</h1>
                        <p className="text-blue-100 mt-2">{topic.verseCount} key scriptures</p>
                    </div>

                    <div className="p-6">
                        <p className="text-primary-dark/70 leading-relaxed">{topic.description}</p>
                    </div>
                </header>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white border border-grace rounded-lg shadow-sm p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{topic.verseCount}</div>
                        <div className="text-xs text-primary-dark/60 mt-1">Total Verses</div>
                    </div>
                    <div className="bg-white border border-grace rounded-lg shadow-sm p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">High</div>
                        <div className="text-xs text-primary-dark/60 mt-1">Study Depth</div>
                    </div>
                    <div className="bg-white border border-grace rounded-lg shadow-sm p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">Daily</div>
                        <div className="text-xs text-primary-dark/60 mt-1">Application</div>
                    </div>
                </div>

                {/* Top 10 Verses — Featured Snippet Optimized */}
                {(topic as any).verses && (topic as any).verses.length > 0 && (
                    <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
                        <h2 className="text-lg font-bold text-scripture mb-4">
                            Top {Math.min(10, (topic as any).verses.length)} Bible Verses About {topic.name}
                        </h2>
                        <ol className="space-y-3 list-decimal list-inside">
                            {(topic as any).verses.slice(0, 10).map((v: any, i: number) => (
                                <li key={i} className="text-sm leading-relaxed text-primary-dark/80">
                                    <Link
                                        href={`/verses/${v.book}/${v.chapter}/${v.verse}`}
                                        className="font-semibold text-blue-600 hover:underline"
                                    >
                                        {v.bookName} {v.chapter}:{v.verse}
                                    </Link>
                                    {' '}&mdash; &ldquo;{v.text.length > 200 ? v.text.substring(0, 200) + '...' : v.text}&rdquo;
                                </li>
                            ))}
                        </ol>
                    </section>
                )}

                {/* Translation Comparison */}
                {(topic as any).verses && (topic as any).verses.length > 0 && (
                    <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
                        <h2 className="text-lg font-bold text-scripture mb-4">Translation Comparison</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-grace">
                                        <th className="pb-3 text-xs font-semibold text-primary-dark/60 uppercase">Translation</th>
                                        <th className="pb-3 text-xs font-semibold text-primary-dark/60 uppercase">
                                            Key Verse: {(topic as any).verses[0].bookName} {(topic as any).verses[0].chapter}:{(topic as any).verses[0].verse}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-grace/50">
                                        <td className="py-4 pr-4 text-sm font-medium text-scripture">King James (KJV)</td>
                                        <td className="py-4 text-primary-dark/70 italic">&ldquo;{(topic as any).verses[0].text}&rdquo;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {/* Key Scriptures */}
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-scripture mb-4">
                        {topic.verseCount} Key Scriptures
                    </h2>

                    <div className="space-y-4">
                        {(topic as any).verses?.map((verse: any, index: number) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm border border-grace p-6 hover:shadow-md transition-shadow"
                            >
                                <blockquote className="text-lg text-primary-dark/80 leading-relaxed mb-4 border-l-4 border-blue-600 pl-4 italic">
                                    &ldquo;{verse.text}&rdquo;
                                </blockquote>
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={`/verses/${verse.book}/${verse.chapter}/${verse.verse}`}
                                        className="text-blue-600 font-medium hover:underline"
                                    >
                                        {verse.bookName} {verse.chapter}:{verse.verse}
                                    </Link>
                                    <span className="text-xs text-primary-dark/40">{verse.translation}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Quiz CTA */}
                <section className="bg-blue-600 rounded-xl p-6 mb-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold">Test Your Knowledge of {topic.name}</h3>
                        <p className="text-blue-100 text-sm">See how well you know what the Bible says about this topic.</p>
                    </div>
                    <Link
                        href="/bible-quizzes"
                        className="whitespace-nowrap px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-grace/20 transition-colors"
                    >
                        Browse Quizzes
                    </Link>
                </section>

                {/* KJV Study Subtopics */}
                {kjvstudyTopic && kjvstudyTopic.subtopics.length > 0 && (
                    <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
                        <h2 className="text-xl font-bold text-scripture mb-4">Study Subtopics</h2>
                        {kjvstudyTopic.overview && (
                            <p className="text-primary-dark/70 mb-6 text-sm leading-relaxed"
                               dangerouslySetInnerHTML={{ __html: kjvstudyTopic.overview.replace(/<[^>]*>/g, '').slice(0, 300) + (kjvstudyTopic.overview.length > 300 ? '...' : '') }} />
                        )}
                        <div className="space-y-6">
                            {kjvstudyTopic.subtopics.map((sub, i) => (
                                <div key={i} className="border border-grace rounded-lg p-4">
                                    <h3 className="font-semibold text-scripture mb-1">{sub.name}</h3>
                                    <p className="text-sm text-primary-dark/60 mb-3">{sub.description}</p>
                                    <div className="space-y-1">
                                        {sub.verses.slice(0, 6).map((v, j) => (
                                            <div key={j} className="flex items-baseline gap-2 text-sm">
                                                <span className="text-blue-600 font-medium flex-shrink-0">{v.ref}</span>
                                                <span className="text-primary-dark/60">{v.note}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Cross-Pillar Links */}
                {crossLinks.length > 0 && (
                    <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
                        <h3 className="text-lg font-bold text-scripture mb-4">Explore Further</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {crossLinks.map((link: CrossPillarLink, idx: number) => (
                                <Link
                                    key={idx}
                                    href={link.href}
                                    className="flex items-start gap-3 p-3 rounded-lg border border-grace/50 hover:border-blue-300 hover:bg-primary-light transition-colors group"
                                >
                                    <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary-dark/40 group-hover:text-blue-500 whitespace-nowrap">
                                        {link.type === 'word-study' ? 'Word Study' : link.type}
                                    </span>
                                    <div className="min-w-0">
                                        <div className="text-sm font-medium text-scripture group-hover:text-blue-600 truncate">{link.label}</div>
                                        <div className="text-xs text-primary-dark/60 mt-0.5">{link.description}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Related Topics */}
                {topic.relatedTopics && topic.relatedTopics.length > 0 && (
                    <section className="bg-white rounded-xl shadow-sm border border-grace p-6">
                        <h3 className="text-lg font-bold text-scripture mb-4">Related Topics</h3>
                        <div className="flex flex-wrap gap-2">
                            {topic.relatedTopics.map((rel: string, idx: number) => (
                                <Link
                                    key={idx}
                                    href={`/topics/${rel}`}
                                    className="px-4 py-2 bg-primary-light/30 border border-grace rounded-lg text-sm text-primary-dark/80 hover:border-blue-300 hover:text-blue-600 transition-colors"
                                >
                                    {rel.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
