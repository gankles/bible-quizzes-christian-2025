import { cache } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCharacter as _getCharacter, getCharacterCombination, getAllCharacters, trackPageView } from '@/lib/database/queries';

const getCachedCharacter = cache(async (slug: string, includeVerses?: boolean) => {
    return _getCharacter(slug, includeVerses);
});
import { generatePageMetadata } from '@/lib/seo/metadata-generator';
import { StructuredData } from '@/components/StructuredData';
import { generateSchema } from '@/lib/seo/schema-generator';
import { ClockIcon, UserGroupIcon, AcademicCapIcon, SparklesIcon, BoltIcon, UsersIcon } from '@/components/icons';
import Link from 'next/link';

interface CharacterPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    // Generated on-demand via ISR — avoids API calls during build
    return [];
}

export async function generateMetadata({ params }: CharacterPageProps): Promise<Metadata> {
    const { slug } = await params;
    const isCombination = slug.includes('-and-');

    if (isCombination) {
        const parts = slug.split('-and-');
        const [name1, name2] = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' '));
        return {
            title: `${name1} and ${name2}: A Biblical Comparison & Study | Relationship, Shared History & Theological Significance | Bible Maximum`,
            description: `Explore the relationship, shared history, and theological significance of ${name1} and ${name2}. Compare their roles, key events, and lessons for believers today.`,
            alternates: { canonical: `/characters/${slug}` },
        };
    }

    const character = await getCachedCharacter(slug);
    if (!character) return {};

    return generatePageMetadata({
        type: 'character',
        data: character,
        url: `/characters/${slug}`,
    });
}

export default async function CharacterDetailPage({ params }: CharacterPageProps) {
    const { slug } = await params;
    const isCombination = slug.includes('-and-');

    if (isCombination) {
        return <CharacterCombinationView slug={slug} />;
    }

    const character = await getCachedCharacter(slug, true);

    if (!character) {
        notFound();
    }
    // ... existing single character logic ...

    const url = `/characters/${slug}`;
    trackPageView(url, 'character').catch(err => console.error('Analytics error:', err));

    const schemas = generateSchema({
        type: 'character',
        data: character,
        url,
    });

    return (
        <div className="min-h-screen bg-primary-light/30 dark:bg-dark-bg">
            <StructuredData data={schemas[0]} />

            {/* Pillar 1: Landing Page Style Hero */}
            <div className="bg-white dark:bg-dark-surface border-b border-grace dark:border-dark-border py-12 md:py-20 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/3 h-full blue-50 -skew-x-12 transform translate-x-20 hidden lg:block"></div>

                <div className="max-w-article mx-auto px-4 md:px-10 relative z-10">
                    <nav className="flex items-center gap-2 text-sm text-primary-dark/60 dark:text-gray-400 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/characters" className="hover:text-blue-600 transition-colors">Characters</Link>
                        <span>/</span>
                        <span className="text-scripture dark:text-white font-medium">{character.name}</span>
                    </nav>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl blue-600 text-white flex items-center justify-center text-4xl md:text-6xl font-bold shadow-xl shrink-0">
                            {character.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <div className="inline-block px-3 py-1 rounded-full blue-600/10 text-blue-600 text-xs font-bold uppercase mb-4">
                                {character.testament} Testament • {character.occupation || 'Biblical Figure'}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-scripture dark:text-white mb-6 font-display leading-tight">
                                {character.name}
                            </h1>
                            <p className="text-xl text-primary-dark/70 dark:text-gray-300 italic max-w-2xl leading-relaxed">
                                "{character.significance}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pillar 3: Tools Section - Interactive Interaction CTA */}
            <div className="max-w-article mx-auto px-4 md:px-10 mt-[-2rem] relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="blue-600 rounded-lg p-6 text-white shadow-lg flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-lg">Character Quiz</h3>
                            <p className="text-white/80 text-xs">Test your knowledge of {character.name}</p>
                        </div>
                        <Link href="/bible-quizzes" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase">Begin</Link>
                    </div>
                    <div className="bg-scripture dark:bg-dark-bg rounded-lg p-6 text-white shadow-lg flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-lg">Study Guide</h3>
                            <p className="text-white/80 text-xs">Download PDF Overview</p>
                        </div>
                        <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase transition-all">Get PDF</button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-article mx-auto px-4 md:px-10 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Biography & Timeline */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Biography - Pillar 2 */}
                        <section>
                            <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6 flex items-center gap-2">
                                <AcademicCapIcon className="w-6 h-6 text-blue-600" />
                                Biblical Biography
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none text-primary-dark/80 dark:text-gray-300 leading-relaxed">
                                {character.biography}
                            </div>
                        </section>

                        {/* Pillar 4: Visual Timeline Rich Media */}
                        {character.timeline && Array.isArray(character.timeline) && (
                            <section className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-8 shadow-sm">
                                <h2 className="text-xl font-bold text-scripture dark:text-white font-display mb-8 flex items-center gap-2">
                                    <ClockIcon className="w-5 h-5 text-blue-600" />
                                    Life Timeline
                                </h2>
                                <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-grace dark:before:bg-dark-border before:mt-2">
                                    {character.timeline.map((event: any, idx: number) => (
                                        <div key={idx} className="relative pl-12 group">
                                            <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-white dark:bg-dark-surface border-4 border-sacred group-hover:scale-110 transition-transform"></div>
                                            <div className="text-xs font-bold text-blue-600 uppercase mb-1">{event.date}</div>
                                            <h3 className="text-lg font-bold text-scripture dark:text-white mb-2">{event.event}</h3>
                                            <p className="text-sm text-primary-dark/60 dark:text-gray-400 leading-relaxed mb-3">{event.significance}</p>
                                            <div className="text-xs font-bold text-primary-dark/40 dark:text-gray-500 uppercase">Ref: {event.verses}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Scriptural Records */}
                        <section>
                            <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Key Scripture References</h2>
                            <div className="space-y-6">
                                {(character as any).verses?.map((verse: any, index: number) => (
                                    <div key={index} className="bg-grace/10 dark:bg-dark-surface/30 border border-grace dark:border-dark-border p-6 rounded-lg">
                                        <p className="text-lg text-scripture dark:text-white mb-4 leading-relaxed italic">"{verse.text}"</p>
                                        <Link href={`/verses/${verse.book}/${verse.chapter}/${verse.verse}`} className="text-sm font-bold text-blue-600 hover:underline">
                                            — {verse.bookName} {verse.chapter}:{verse.verse} ({verse.translation})
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Key Details & Relationships */}
                    <div className="space-y-8">
                        {/* Pillar 5: Personality / Life Lessons */}
                        <div className="bg-gradient-to-br from-sacred/5 to-sacred/10 dark:from-sacred/10 dark:to-sacred/20 rounded-lg p-8 border border-sacred/20">
                            <h3 className="text-xl font-bold text-blue-600 font-display mb-6 flex items-center gap-2">
                                <SparklesIcon className="w-5 h-5" />
                                Key Life Lessons
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full blue-600 mt-2 shrink-0"></span>
                                    <p className="text-sm text-primary-dark/80 dark:text-gray-300">Faithfulness in small things leads to God's hand in large things.</p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full blue-600 mt-2 shrink-0"></span>
                                    <p className="text-sm text-primary-dark/80 dark:text-gray-300">Courage is not the absence of fear, but trust in God's presence.</p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full blue-600 mt-2 shrink-0"></span>
                                    <p className="text-sm text-primary-dark/80 dark:text-gray-300">Restoration is always possible through sincere repentance.</p>
                                </li>
                            </ul>
                        </div>

                        {/* Pillar 4: Relationships Table Rich Media */}
                        {character.relationships && Array.isArray(character.relationships) && (
                            <div className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border overflow-hidden shadow-sm">
                                <div className="p-4 bg-grace/20 dark:bg-dark-surface border-b border-grace dark:border-dark-border">
                                    <h3 className="text-sm font-bold m-0 uppercase flex items-center gap-2">
                                        <UserGroupIcon className="w-4 h-4 text-blue-600" />
                                        Key Relationships
                                    </h3>
                                </div>
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-grace/10 dark:bg-dark-surface/50">
                                            <th className="p-3 text-[10px] font-bold uppercase text-primary-dark/40 border-b border-grace dark:border-dark-border">Person</th>
                                            <th className="p-3 text-[10px] font-bold uppercase text-primary-dark/40 border-b border-grace dark:border-dark-border">Relation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {character.relationships.map((rel: any, idx: number) => (
                                            <tr key={idx} className="border-b border-grace/50 dark:border-dark-border/50 last:border-0 hover:bg-grace/5 transition-colors">
                                                <td className="p-3 text-sm font-bold text-scripture dark:text-white">{rel.person}</td>
                                                <td className="p-3 text-xs text-primary-dark/60 dark:text-gray-400 font-medium italic">{rel.relationship}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Quick Facts Sidebar */}
                        <div className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-6 shadow-sm">
                            <h3 className="text-xs font-bold uppercase text-primary-dark/40 mb-4">Metadata Fast Facts</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-[10px] uppercase font-bold text-blue-600 mb-0.5 tracking-tighter">Lifespan / Era</div>
                                    <div className="text-sm font-bold text-scripture dark:text-white">{character.lifespan || 'Classic Biblical Era'}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase font-bold text-blue-600 mb-0.5 tracking-tighter">Primary Testament</div>
                                    <div className="text-sm font-bold text-scripture dark:text-white">{character.testament} Testament</div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase font-bold text-blue-600 mb-0.5 tracking-tighter">Notable Occupation</div>
                                    <div className="text-sm font-bold text-scripture dark:text-white">{character.occupation || 'N/A'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Internal Links */}
                <section className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3">Related Resources</h2>
                    <div className="grid gap-2 sm:grid-cols-2">
                        <Link href="/characters" className="text-blue-600 hover:underline text-sm">All Bible Characters</Link>
                        <Link href="/people" className="text-blue-600 hover:underline text-sm">Bible People Directory</Link>
                        <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">Bible Quizzes</Link>
                        <Link href="/bible-names" className="text-blue-600 hover:underline text-sm">Bible Name Meanings</Link>
                        <Link href="/nave-topics" className="text-blue-600 hover:underline text-sm">Nave&apos;s Topical Bible</Link>
                        <Link href="/timeline" className="text-blue-600 hover:underline text-sm">Bible Timeline</Link>
                        <Link href="/commandments" className="text-blue-600 hover:underline text-sm">613 Commandments</Link>
                        <Link href="/lexicon" className="text-blue-600 hover:underline text-sm">Greek &amp; Hebrew Lexicon</Link>
                    </div>
                </section>
            </main>
        </div>
    );
}

/**
 * Pillar-compliant view for character duos (e.g., David and Jonathan)
 */
async function CharacterCombinationView({ slug }: { slug: string }) {
    const parts = slug.split('-and-');
    const data = await getCharacterCombination(parts[0], parts[1]);

    if (!data) notFound();

    const char1 = data.char1;
    const char2 = data.char2;
    const relationshipType = "Biblical Duo";
    const analysis = `The connection between ${char1.name} and ${char2.name} is one of the most significant pairings in the Bible.`;

    const comparisonPoints = [
        { label: "Key Strength", c1: char1.name === 'David' ? 'Courage' : 'Faith', c2: char2.name === 'Jonathan' ? 'Loyalty' : 'Leadership' },
        { label: "Testament", c1: char1.testament, c2: char2.testament },
        { label: "Main Role", c1: char1.occupation || 'Leader', c2: char2.occupation || 'Prophet' }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-blue-950 rounded-xl p-8 md:p-16 text-white shadow-2xl mb-12 relative overflow-hidden">
                <div className="relative z-10 max-w-3xl">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-6 uppercase">
                        <UsersIcon className="w-4 h-4 mr-2" />
                        Biblical Duos
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        {char1.name} <span className="text-blue-500">&</span> {char2.name}
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed font-light">
                        Discover the interconnected lives of two of the Bible's most influential figures.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    <section className="bg-white dark:bg-dark-surface rounded-xl p-8 md:p-12 border border-gray-100 dark:border-dark-border shadow-sm">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                            <SparklesIcon className="w-8 h-8 mr-3 text-blue-500" />
                            Connection Insight
                        </h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                {analysis}
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                            <BoltIcon className="w-6 h-6 mr-2 text-yellow-500" />
                            Side-by-Side Comparison
                        </h2>
                        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface shadow-xl">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-dark-bg/50 border-b border-gray-200 dark:border-dark-border">
                                        <th className="px-8 py-6 font-bold text-gray-400 uppercase text-xs">Trait</th>
                                        <th className="px-8 py-6 font-bold text-gray-900 dark:text-white">{char1.name}</th>
                                        <th className="px-8 py-6 font-bold text-gray-900 dark:text-white">{char2.name}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                                    {comparisonPoints.map((point, i) => (
                                        <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="px-8 py-6 font-bold text-gray-500 text-sm">{point.label}</td>
                                            <td className="px-8 py-6 text-gray-700 dark:text-gray-300 font-medium">{point.c1}</td>
                                            <td className="px-8 py-6 text-gray-700 dark:text-gray-300 font-medium">{point.c2}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <div className="bg-blue-600 rounded-xl p-8 text-white shadow-xl text-center">
                        <UsersIcon className="w-16 h-16 text-white/20 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold mb-4">Interactive Study</h3>
                        <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-all">
                            Launch Duo Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
