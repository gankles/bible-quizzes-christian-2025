import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLexiconComparison } from '@/lib/database/queries';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    ChartBarIcon,
    BookOpenIcon,
    BoltIcon,
    SparklesIcon
} from '@/components/icons';

interface ComparePageProps {
    params: Promise<{ comparison: string }>;
}

// Predefined comparisons from the hub
const COMPARISONS = [
    { slug: 'G25-vs-G5368', a: 'G25', b: 'G5368', title: 'Agapao vs Phileo', subtitle: 'Two Greek Words for Love' },
    { slug: 'H7965-vs-G1515', a: 'H7965', b: 'G1515', title: 'Shalom vs Eirene', subtitle: 'Peace Across Testaments' },
    { slug: 'G5485-vs-G1656', a: 'G5485', b: 'G1656', title: 'Charis vs Eleos', subtitle: 'Grace and Mercy Compared' },
];

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
    const { comparison } = await params;
    const compDef = COMPARISONS.find(c => c.slug === comparison);
    if (!compDef) {
        // Try to parse the URL pattern
        const match = comparison.match(/^([GH]\d+)-vs-([GH]\d+)$/i);
        if (!match) return { title: 'Comparison Not Found' };
    }

    const match = comparison.match(/^([GH]\d+)-vs-([GH]\d+)$/i);
    if (!match) return { title: 'Comparison Not Found' };

    const data = await getLexiconComparison(match[1].toUpperCase(), match[2].toUpperCase());
    if (!data) return { title: 'Comparison Not Found' };

    const title = compDef
        ? `${compDef.title}: ${data.entryA.language} Word Study Comparison | Bible Maximum`
        : `${data.entryA.word} vs ${data.entryB.word}: Biblical Word Comparison | Bible Maximum`;

    const description = `Compare ${data.entryA.word} (${data.entryA.strongs}) and ${data.entryB.word} (${data.entryB.strongs}). Side-by-side definitions, morphology, and usage statistics from Strong's concordance.`;

    return {
        title,
        description,
        openGraph: { title, description, type: 'article' },
    };
}

export async function generateStaticParams() {
    return COMPARISONS.map(c => ({ comparison: c.slug }));
}

export default async function ComparisonPage({ params }: ComparePageProps) {
    const { comparison } = await params;
    const match = comparison.match(/^([GH]\d+)-vs-([GH]\d+)$/i);
    if (!match) notFound();

    const strongsA = match[1].toUpperCase();
    const strongsB = match[2].toUpperCase();
    const data = await getLexiconComparison(strongsA, strongsB);
    if (!data) notFound();

    const { entryA, entryB } = data;
    const compDef = COMPARISONS.find(c => c.slug === comparison);

    return (
        <div className="bg-[#FAFAF9] pb-32 min-h-screen">
            {/* NAVIGATION */}
            <div className="bg-white/40 border-b border-gray-200 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                    <Link href="/lexicon" className="group flex items-center text-gray-500 hover:text-blue-600 transition-all text-[11px] font-bold uppercase">
                        <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span>Lexicon Hub</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-6 text-[10px] font-bold uppercase text-gray-400">
                        <span>Word Comparison</span>
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        <span className="text-gray-900">{entryA.strongs} vs {entryB.strongs}</span>
                    </div>
                </div>
            </div>

            {/* HERO */}
            <section className="py-20 bg-white/40 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center space-x-2 text-blue-600 font-bold text-[10px] uppercase mb-6">
                            <ChartBarIcon className="w-4 h-4" />
                            <span>Comparative Word Study</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-950 tracking-tighter mb-6">
                            {compDef ? compDef.title : `${entryA.word} vs ${entryB.word}`}
                        </h1>
                        {compDef && (
                            <p className="text-xl text-gray-600 font-medium leading-relaxed">
                                {compDef.subtitle}. Side-by-side analysis of these biblical terms in their original languages.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* SIDE-BY-SIDE WORD CARDS */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[entryA, entryB].map((entry) => {
                            const isGreek = entry.language?.toLowerCase() === 'greek';
                            const accentColor = isGreek ? 'indigo' : 'rose';

                            return (
                                <div key={entry.strongs} className={`p-10 rounded-[32px] border border-gray-200 bg-white shadow-lg`}>
                                    <div className="flex items-center justify-between mb-8">
                                        <span className={`px-5 py-2 rounded-lg bg-${accentColor}-50 text-${accentColor}-600 text-[10px] font-bold uppercase`}>
                                            {entry.strongs}
                                        </span>
                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${isGreek ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'}`}>
                                            {entry.language}
                                        </span>
                                    </div>

                                    <div className={`text-5xl font-bold text-gray-950 mb-3 tracking-tighter ${!isGreek ? 'text-right' : ''}`} dir={!isGreek ? 'rtl' : 'ltr'}>
                                        {entry.word}
                                    </div>
                                    <div className="text-sm text-gray-500 font-medium mb-1">{entry.transliteration}</div>
                                    {entry.pronunciation && (
                                        <div className="text-xs text-gray-400 mb-6">{entry.pronunciation}</div>
                                    )}

                                    <div className="space-y-6">
                                        {/* Strong's Definition */}
                                        <div className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                                            <div className="text-[10px] font-bold text-gray-400 uppercase mb-3">Strong&apos;s Definition</div>
                                            <p className="text-gray-700 text-sm leading-relaxed">
                                                {entry.definitions?.strongs || 'N/A'}
                                            </p>
                                        </div>

                                        {/* Secondary Definition */}
                                        {(entry.definitions?.lsj || entry.definitions?.bdb) && (
                                            <div className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                                                <div className="text-[10px] font-bold text-gray-400 uppercase mb-3">
                                                    {isGreek ? 'LSJ Classical' : 'BDB Hebrew'}
                                                </div>
                                                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                                                    {entry.definitions?.lsj || entry.definitions?.bdb}
                                                </p>
                                            </div>
                                        )}

                                        {/* Morphology */}
                                        <div className="flex items-center space-x-4">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">Morphology:</span>
                                            <span className="font-mono text-sm font-bold text-gray-700">{entry.morphology?.code || 'N/A'}</span>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div>
                                                <div className="text-[10px] font-bold text-gray-400 uppercase">Occurrences</div>
                                                <div className="text-2xl font-bold text-gray-900">{entry.stats?.totalOccurrences || 0}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] font-bold text-gray-400 uppercase">Most Frequent</div>
                                                <div className="text-sm font-bold text-gray-700">{entry.stats?.mostFrequentBook || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/lexicon/${entry.strongs}`}
                                        className={`mt-8 w-full py-4 rounded-xl text-white text-[10px] font-bold uppercase flex items-center justify-center transition-all ${isGreek ? 'bg-blue-600 hover:bg-blue-700' : 'bg-rose-600 hover:bg-rose-700'}`}
                                    >
                                        Full {entry.strongs} Study <ArrowRightIcon className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* COMPARISON TABLE */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-12">
                        <div className="inline-flex items-center space-x-2 text-blue-600 font-bold text-[10px] uppercase mb-4">
                            <BoltIcon className="w-4 h-4" />
                            <span>At a Glance</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-950 tracking-tighter">Direct Comparison</h2>
                    </div>

                    <div className="overflow-x-auto rounded-[32px] border border-gray-200 bg-white shadow-lg">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase">Attribute</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase">{entryA.strongs}</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase">{entryB.strongs}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5 text-sm font-bold text-gray-600">Word</td>
                                    <td className="px-8 py-5 text-xl font-bold text-gray-900">{entryA.word}</td>
                                    <td className="px-8 py-5 text-xl font-bold text-gray-900" dir={entryB.language?.toLowerCase() === 'hebrew' ? 'rtl' : 'ltr'}>{entryB.word}</td>
                                </tr>
                                <tr className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5 text-sm font-bold text-gray-600">Transliteration</td>
                                    <td className="px-8 py-5 text-sm text-gray-700">{entryA.transliteration}</td>
                                    <td className="px-8 py-5 text-sm text-gray-700">{entryB.transliteration}</td>
                                </tr>
                                <tr className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5 text-sm font-bold text-gray-600">Language</td>
                                    <td className="px-8 py-5 text-sm text-gray-700">{entryA.language}</td>
                                    <td className="px-8 py-5 text-sm text-gray-700">{entryB.language}</td>
                                </tr>
                                <tr className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5 text-sm font-bold text-gray-600">Strong&apos;s Definition</td>
                                    <td className="px-8 py-5 text-sm text-gray-600 max-w-xs">{entryA.definitions?.strongs || 'N/A'}</td>
                                    <td className="px-8 py-5 text-sm text-gray-600 max-w-xs">{entryB.definitions?.strongs || 'N/A'}</td>
                                </tr>
                                <tr className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5 text-sm font-bold text-gray-600">Morphology</td>
                                    <td className="px-8 py-5 font-mono text-sm text-gray-700">{entryA.morphology?.code || 'N/A'}</td>
                                    <td className="px-8 py-5 font-mono text-sm text-gray-700">{entryB.morphology?.code || 'N/A'}</td>
                                </tr>
                                <tr className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5 text-sm font-bold text-gray-600">Total Occurrences</td>
                                    <td className="px-8 py-5 text-lg font-bold text-gray-900">{entryA.stats?.totalOccurrences || 0}</td>
                                    <td className="px-8 py-5 text-lg font-bold text-gray-900">{entryB.stats?.totalOccurrences || 0}</td>
                                </tr>
                                <tr className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5 text-sm font-bold text-gray-600">Most Frequent Book</td>
                                    <td className="px-8 py-5 text-sm text-gray-700">{entryA.stats?.mostFrequentBook || 'N/A'}</td>
                                    <td className="px-8 py-5 text-sm text-gray-700">{entryB.stats?.mostFrequentBook || 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* OTHER COMPARISONS */}
            {COMPARISONS.filter(c => c.slug !== comparison).length > 0 && (
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-950 tracking-tighter mb-12">More Comparisons</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {COMPARISONS.filter(c => c.slug !== comparison).map((comp) => (
                                <Link
                                    key={comp.slug}
                                    href={`/lexicon/compare/${comp.slug}`}
                                    className="group p-8 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                                >
                                    <div className="flex items-center space-x-3 mb-4">
                                        <span className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold">{comp.a}</span>
                                        <span className="text-gray-400 text-xs font-bold">vs</span>
                                        <span className="px-3 py-1 rounded-lg bg-gray-900 text-white text-xs font-bold">{comp.b}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{comp.title}</h3>
                                    <p className="text-sm text-gray-500">{comp.subtitle}</p>
                                    <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-all">
                                        Compare <ArrowRightIcon className="w-4 h-4 ml-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: compDef
                            ? `${compDef.title}: Biblical Word Study Comparison`
                            : `${entryA.word} vs ${entryB.word}: Biblical Word Comparison`,
                        description: `Compare ${entryA.word} (${entryA.strongs}) and ${entryB.word} (${entryB.strongs}) in their original biblical languages.`,
                        author: { '@type': 'Organization', name: 'Bible Maximum' },
                        publisher: { '@type': 'Organization', name: 'Bible Maximum' },
                        mainEntityOfPage: {
                            '@type': 'WebPage',
                            '@id': `https://biblemaximum.com/lexicon/compare/${comparison}`
                        }
                    })
                }}
            />
        </div>
    );
}
