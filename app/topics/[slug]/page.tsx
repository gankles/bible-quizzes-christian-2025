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
import { getCharactersForTopic } from '@/lib/character-topic-bridge';
import { getCommandmentsForTopic } from '@/lib/commandment-topic-bridge';
import { formatReference } from '@/lib/commandments-data';
import { getKjvStudyTopic } from '@/lib/kjvstudy-topics';
import Link from 'next/link';

export const revalidate = 86400 // 24 hours

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
                            <Link href="/" className="text-sacred hover:underline">Home</Link>
                        </li>
                        <li className="text-ink-light mx-2">/</li>
                        <li>
                            <Link href="/topics" className="text-sacred hover:underline">Topics</Link>
                        </li>
                        <li className="text-ink-light mx-2">/</li>
                        <li className="text-ink-muted">{topic.name}</li>
                    </ol>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-8">
                <header className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-scripture to-scripture/80 text-white px-6 py-8">
                        <p className="text-sacred-light text-sm font-medium mb-2">{topic.category}</p>
                        <h1 className="text-3xl font-display font-bold">Bible Verses About {topic.name}</h1>
                        <p className="text-sacred-light mt-2 max-w-xl">
                            {topic.verseCount} key scriptures about {topic.name.toLowerCase()} from across the Old and New Testaments, with verse text, commentary, and cross-references for deeper Bible study.
                        </p>
                    </div>

                    <div className="p-6">
                        <p className="text-ink-muted leading-relaxed">{topic.description}</p>
                    </div>
                </header>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white border border-grace rounded-lg shadow-sm p-4 text-center">
                        <div className="text-2xl font-bold text-sacred">{topic.verseCount}</div>
                        <div className="text-xs text-ink-muted mt-1">Total Verses</div>
                    </div>
                    <div className="bg-white border border-grace rounded-lg shadow-sm p-4 text-center">
                        <div className="text-2xl font-bold text-sacred">High</div>
                        <div className="text-xs text-ink-muted mt-1">Study Depth</div>
                    </div>
                    <div className="bg-white border border-grace rounded-lg shadow-sm p-4 text-center">
                        <div className="text-2xl font-bold text-sacred">Daily</div>
                        <div className="text-xs text-ink-muted mt-1">Application</div>
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
                                <li key={i} className="text-sm leading-relaxed text-scripture">
                                    <Link
                                        href={`/verses/${v.book}/${v.chapter}/${v.verse}`}
                                        className="font-semibold text-sacred hover:underline"
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
                                        <th className="pb-3 text-xs font-semibold text-ink-muted uppercase">Translation</th>
                                        <th className="pb-3 text-xs font-semibold text-ink-muted uppercase">
                                            Key Verse: {(topic as any).verses[0].bookName} {(topic as any).verses[0].chapter}:{(topic as any).verses[0].verse}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-grace/50">
                                        <td className="py-4 pr-4 text-sm font-medium text-scripture">King James (KJV)</td>
                                        <td className="py-4 text-ink-muted italic">&ldquo;{(topic as any).verses[0].text}&rdquo;</td>
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
                                <blockquote className="text-lg text-scripture leading-relaxed mb-4 border-l-4 border-sacred pl-4 italic">
                                    &ldquo;{verse.text}&rdquo;
                                </blockquote>
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={`/verses/${verse.book}/${verse.chapter}/${verse.verse}`}
                                        className="text-sacred font-medium hover:underline"
                                    >
                                        {verse.bookName} {verse.chapter}:{verse.verse}
                                    </Link>
                                    <span className="text-xs text-ink-light">{verse.translation}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Quiz CTA */}
                <section className="bg-scripture rounded-xl p-6 mb-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold">Test Your Knowledge of {topic.name}</h3>
                        <p className="text-sacred-light text-sm">See how well you know what the Bible says about this topic.</p>
                    </div>
                    <Link
                        href="/bible-quizzes"
                        className="whitespace-nowrap px-6 py-3 bg-white text-sacred rounded-lg font-semibold hover:bg-grace/20 transition-colors"
                    >
                        Browse Quizzes
                    </Link>
                </section>

                {/* KJV Study Subtopics */}
                {kjvstudyTopic && kjvstudyTopic.subtopics.length > 0 && (
                    <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
                        <h2 className="text-xl font-bold text-scripture mb-4">Study Subtopics</h2>
                        {kjvstudyTopic.overview && (
                            <p className="text-ink-muted mb-6 text-sm leading-relaxed"
                               dangerouslySetInnerHTML={{ __html: kjvstudyTopic.overview.replace(/<[^>]*>/g, '').slice(0, 300) + (kjvstudyTopic.overview.length > 300 ? '...' : '') }} />
                        )}
                        <div className="space-y-6">
                            {kjvstudyTopic.subtopics.map((sub, i) => (
                                <div key={i} className="border border-grace rounded-lg p-4">
                                    <h3 className="font-semibold text-scripture mb-1">{sub.name}</h3>
                                    <p className="text-sm text-ink-muted mb-3">{sub.description}</p>
                                    <div className="space-y-1">
                                        {sub.verses.slice(0, 6).map((v, j) => (
                                            <div key={j} className="flex items-baseline gap-2 text-sm">
                                                <span className="text-sacred font-medium flex-shrink-0">{v.ref}</span>
                                                <span className="text-ink-muted">{v.note}</span>
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
                                    className="flex items-start gap-3 p-3 rounded-lg border border-grace/50 hover:border-sacred/50 hover:bg-primary-light transition-colors group"
                                >
                                    <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-ink-light group-hover:text-gold-dark whitespace-nowrap">
                                        {link.type === 'word-study' ? 'Word Study' : link.type}
                                    </span>
                                    <div className="min-w-0">
                                        <div className="text-sm font-medium text-scripture group-hover:text-gold-dark truncate">{link.label}</div>
                                        <div className="text-xs text-ink-muted mt-0.5">{link.description}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Related Characters */}
                {(() => {
                    const relatedCharacters = getCharactersForTopic(slug).slice(0, 6);
                    if (relatedCharacters.length === 0) return null;
                    return (
                        <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
                            <h3 className="text-lg font-bold text-scripture mb-4">Related Bible Characters</h3>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {relatedCharacters.map(char => (
                                    <Link
                                        key={char.slug}
                                        href={`/characters/${char.slug}`}
                                        className="flex items-center gap-3 p-3 rounded-lg border border-grace/50 hover:border-sacred/50 hover:bg-primary-light transition-colors group"
                                    >
                                        <span className="w-8 h-8 rounded-lg bg-scripture text-white flex items-center justify-center text-sm font-bold shrink-0">
                                            {char.name.charAt(0)}
                                        </span>
                                        <div className="min-w-0">
                                            <div className="text-sm font-medium text-scripture group-hover:text-gold-dark truncate">{char.name}</div>
                                            <div className="text-xs text-ink-muted mt-0.5 line-clamp-1">{char.significance}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <Link
                                href={`/characters-by-topic/${slug}`}
                                className="block mt-3 text-sm text-sacred hover:underline font-medium"
                            >
                                View all characters related to {topic.name}
                            </Link>
                        </section>
                    );
                })()}

                {/* Related Commandments */}
                {(() => {
                    const relatedCmds = getCommandmentsForTopic(slug).slice(0, 6);
                    if (relatedCmds.length === 0) return null;
                    return (
                        <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
                            <h3 className="text-lg font-bold text-scripture mb-4">Related Commandments</h3>
                            <div className="space-y-2">
                                {relatedCmds.map(cmd => (
                                    <Link
                                        key={cmd.number}
                                        href={`/commandments/${cmd.number}`}
                                        className="flex items-center gap-3 p-3 rounded-lg border border-grace/50 hover:border-sacred/50 hover:bg-primary-light transition-colors group"
                                    >
                                        <span className={`w-8 h-8 rounded-lg text-white flex items-center justify-center text-xs font-bold shrink-0 ${cmd.polarity === 'P' ? 'bg-green-600' : 'bg-red-600'}`}>
                                            #{cmd.number}
                                        </span>
                                        <div className="min-w-0">
                                            <div className="text-sm font-medium text-scripture group-hover:text-gold-dark truncate">{cmd.concept}</div>
                                            <div className="text-xs text-ink-muted mt-0.5">{formatReference(cmd.referenceId)}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <Link
                                href={`/commandments/topic/${slug}`}
                                className="block mt-3 text-sm text-sacred hover:underline font-medium"
                            >
                                View all commandments related to {topic.name}
                            </Link>
                        </section>
                    );
                })()}

                {/* Related Topics */}
                {topic.relatedTopics && topic.relatedTopics.length > 0 && (
                    <section className="bg-white rounded-xl shadow-sm border border-grace p-6">
                        <h3 className="text-lg font-bold text-scripture mb-4">Related Topics</h3>
                        <div className="flex flex-wrap gap-2">
                            {topic.relatedTopics.map((rel: string, idx: number) => (
                                <Link
                                    key={idx}
                                    href={`/topics/${rel}`}
                                    className="px-4 py-2 bg-primary-light/30 border border-grace rounded-lg text-sm text-scripture hover:border-sacred/50 hover:text-gold-dark transition-colors"
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
