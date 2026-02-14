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

    return (
        <div className="min-h-screen bg-gray-50">
            <StructuredData data={schemas[0]} />

            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <ol className="flex items-center flex-wrap gap-y-1 text-sm">
                        <li>
                            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
                        </li>
                        <li className="text-gray-400 mx-2">/</li>
                        <li>
                            <Link href="/topics" className="text-blue-600 hover:underline">Topics</Link>
                        </li>
                        <li className="text-gray-400 mx-2">/</li>
                        <li className="text-gray-600">{topic.name}</li>
                    </ol>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-8">
                <header className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-8">
                        <p className="text-blue-100 text-sm font-medium mb-2">{topic.category}</p>
                        <h1 className="text-3xl font-bold">Bible Verses About {topic.name}</h1>
                        <p className="text-blue-100 mt-2">{topic.verseCount} key scriptures</p>
                    </div>

                    <div className="p-6">
                        <p className="text-gray-600 leading-relaxed">{topic.description}</p>
                    </div>
                </header>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{topic.verseCount}</div>
                        <div className="text-xs text-gray-500 mt-1">Total Verses</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">High</div>
                        <div className="text-xs text-gray-500 mt-1">Study Depth</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">Daily</div>
                        <div className="text-xs text-gray-500 mt-1">Application</div>
                    </div>
                </div>

                {/* Translation Comparison */}
                {(topic as any).verses && (topic as any).verses.length > 0 && (
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Translation Comparison</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="pb-3 text-xs font-semibold text-gray-500 uppercase">Translation</th>
                                        <th className="pb-3 text-xs font-semibold text-gray-500 uppercase">
                                            Key Verse: {(topic as any).verses[0].bookName} {(topic as any).verses[0].chapter}:{(topic as any).verses[0].verse}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-4 pr-4 text-sm font-medium text-gray-900">King James (KJV)</td>
                                        <td className="py-4 text-gray-600 italic">&ldquo;{(topic as any).verses[0].text}&rdquo;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {/* Key Scriptures */}
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        {topic.verseCount} Key Scriptures
                    </h2>

                    <div className="space-y-4">
                        {(topic as any).verses?.map((verse: any, index: number) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                            >
                                <blockquote className="text-lg text-gray-700 leading-relaxed mb-4 border-l-4 border-blue-600 pl-4 italic">
                                    &ldquo;{verse.text}&rdquo;
                                </blockquote>
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={`/verses/${verse.book}/${verse.chapter}/${verse.verse}`}
                                        className="text-blue-600 font-medium hover:underline"
                                    >
                                        {verse.bookName} {verse.chapter}:{verse.verse}
                                    </Link>
                                    <span className="text-xs text-gray-400">{verse.translation}</span>
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
                        className="whitespace-nowrap px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Browse Quizzes
                    </Link>
                </section>

                {/* Cross-Pillar Links */}
                {crossLinks.length > 0 && (
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore Further</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {crossLinks.map((link: CrossPillarLink, idx: number) => (
                                <Link
                                    key={idx}
                                    href={link.href}
                                    className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                                >
                                    <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-gray-400 group-hover:text-blue-500 whitespace-nowrap">
                                        {link.type === 'word-study' ? 'Word Study' : link.type}
                                    </span>
                                    <div className="min-w-0">
                                        <div className="text-sm font-medium text-gray-800 group-hover:text-blue-600 truncate">{link.label}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">{link.description}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Related Topics */}
                {topic.relatedTopics && topic.relatedTopics.length > 0 && (
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Topics</h3>
                        <div className="flex flex-wrap gap-2">
                            {topic.relatedTopics.map((rel: string, idx: number) => (
                                <Link
                                    key={idx}
                                    href={`/topics/${rel}`}
                                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
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
