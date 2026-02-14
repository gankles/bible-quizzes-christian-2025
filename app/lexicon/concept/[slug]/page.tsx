import { cache } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    getAllLexiconConcepts,
    getLexiconConcept as _getLexiconConcept
} from '@/lib/database/queries';

const getCachedConcept = cache(async (slug: string) => {
    return _getLexiconConcept(slug);
});
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    SparklesIcon,
    BookOpenIcon,
    BoltIcon
} from '@/components/icons';

interface ConceptPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ConceptPageProps): Promise<Metadata> {
    const { slug } = await params;
    const concept = await getCachedConcept(slug);
    if (!concept) return { title: 'Concept Not Found' };

    return {
        title: `${concept.title} | Bible Maximum Lexicon`,
        description: concept.description,
        openGraph: {
            title: concept.title,
            description: concept.description,
            type: 'article',
        },
    };
}

export async function generateStaticParams() {
    // Generated on-demand via ISR
    return [];
}

export default async function ConceptStudyPage({ params }: ConceptPageProps) {
    const { slug } = await params;
    const concept = await getCachedConcept(slug);
    if (!concept) notFound();

    const allConcepts = await getAllLexiconConcepts();
    const relatedConcepts = allConcepts.filter((c: any) => c.slug !== slug).slice(0, 4);

    // Separate Greek and Hebrew entries
    const greekEntries = concept.entries.filter((e: any) => e.language?.toLowerCase() === 'greek');
    const hebrewEntries = concept.entries.filter((e: any) => e.language?.toLowerCase() === 'hebrew');

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
                        <span>Concept Study</span>
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        <span className="text-gray-900">{concept.name}</span>
                    </div>
                </div>
            </div>

            {/* HERO */}
            <section className="py-20 bg-white/40 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center space-x-2 text-blue-600 font-bold text-[10px] uppercase mb-6">
                            <SparklesIcon className="w-4 h-4" />
                            <span>Theological Concept Study</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-950 tracking-tighter mb-6">
                            {concept.name} <span className="text-blue-600 italic">in Scripture.</span>
                        </h1>
                        <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-3xl">
                            {concept.description}
                        </p>
                        <div className="mt-8 flex items-center space-x-4">
                            <span className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold uppercase">
                                {concept.strongs.length} Word Studies
                            </span>
                            <span className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold uppercase">
                                {concept.category}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* WORD STUDY CARDS */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Greek entries */}
                    {greekEntries.length > 0 && (
                        <div className="mb-20">
                            <div className="flex items-center space-x-3 mb-12">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                                    <BookOpenIcon className="w-5 h-5" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-950 tracking-tighter">Greek Terms</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {greekEntries.map((entry: any) => (
                                    <Link
                                        key={entry.strongs}
                                        href={`/lexicon/${entry.strongs}`}
                                        className="group p-8 rounded-[32px] border border-gray-200 bg-white hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="px-4 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold uppercase">
                                                {entry.strongs}
                                            </span>
                                            <span className="text-[10px] font-bold text-gray-300 uppercase">
                                                {entry.stats?.totalOccurrences || 0}x
                                            </span>
                                        </div>
                                        <div className="text-4xl font-bold text-gray-950 mb-2 tracking-tighter group-hover:text-blue-600 transition-colors">
                                            {entry.word}
                                        </div>
                                        <div className="text-sm text-gray-500 font-medium mb-1">{entry.transliteration}</div>
                                        {entry.pronunciation && (
                                            <div className="text-xs text-gray-400 mb-4">{entry.pronunciation}</div>
                                        )}
                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
                                            {entry.definitions?.strongs?.split(';')[0] || 'View full definition...'}
                                        </p>
                                        <div className="flex items-center text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-all">
                                            Full Word Study <ArrowRightIcon className="w-4 h-4 ml-2" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Hebrew entries */}
                    {hebrewEntries.length > 0 && (
                        <div className="mb-20">
                            <div className="flex items-center space-x-3 mb-12">
                                <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white">
                                    <BookOpenIcon className="w-5 h-5" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-950 tracking-tighter">Hebrew Terms</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {hebrewEntries.map((entry: any) => (
                                    <Link
                                        key={entry.strongs}
                                        href={`/lexicon/${entry.strongs}`}
                                        className="group p-8 rounded-[32px] border border-gray-200 bg-white hover:border-rose-300 hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="px-4 py-1.5 rounded-lg bg-rose-50 text-rose-600 text-[10px] font-bold uppercase">
                                                {entry.strongs}
                                            </span>
                                            <span className="text-[10px] font-bold text-gray-300 uppercase">
                                                {entry.stats?.totalOccurrences || 0}x
                                            </span>
                                        </div>
                                        <div className="text-4xl font-bold text-gray-950 mb-2 tracking-tighter group-hover:text-rose-600 transition-colors text-right" dir="rtl">
                                            {entry.word}
                                        </div>
                                        <div className="text-sm text-gray-500 font-medium mb-1">{entry.transliteration}</div>
                                        {entry.pronunciation && (
                                            <div className="text-xs text-gray-400 mb-4">{entry.pronunciation}</div>
                                        )}
                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
                                            {entry.definitions?.strongs?.split(';')[0] || 'View full definition...'}
                                        </p>
                                        <div className="flex items-center text-sm font-semibold text-rose-600 opacity-0 group-hover:opacity-100 transition-all">
                                            Full Word Study <ArrowRightIcon className="w-4 h-4 ml-2" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* DEFINITIONS COMPARISON TABLE */}
            {concept.entries.length > 1 && (
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-12">
                            <div className="inline-flex items-center space-x-2 text-blue-600 font-bold text-[10px] uppercase mb-4">
                                <BoltIcon className="w-4 h-4" />
                                <span>Side-by-Side Comparison</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-950 tracking-tighter">
                                Definition Comparison
                            </h2>
                        </div>

                        <div className="overflow-x-auto rounded-[32px] border border-gray-200 bg-white shadow-lg">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/50">
                                        <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase">Strong&apos;s</th>
                                        <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase">Word</th>
                                        <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase">Language</th>
                                        <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase">Definition</th>
                                        <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase">Occurrences</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {concept.entries.map((entry: any) => (
                                        <tr key={entry.strongs} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-5">
                                                <Link href={`/lexicon/${entry.strongs}`} className="text-blue-600 font-bold hover:underline">
                                                    {entry.strongs}
                                                </Link>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="text-xl font-bold text-gray-900" dir={entry.language?.toLowerCase() === 'hebrew' ? 'rtl' : 'ltr'}>
                                                    {entry.word}
                                                </span>
                                                <span className="block text-xs text-gray-400 mt-1">{entry.transliteration}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${entry.language?.toLowerCase() === 'greek'
                                                    ? 'bg-blue-50 text-blue-600'
                                                    : 'bg-rose-50 text-rose-600'
                                                    }`}>
                                                    {entry.language}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 max-w-md">
                                                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                                    {entry.definitions?.strongs || 'N/A'}
                                                </p>
                                            </td>
                                            <td className="px-8 py-5 text-sm font-bold text-gray-900">
                                                {entry.stats?.totalOccurrences || 0}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            )}

            {/* RELATED CONCEPTS */}
            {relatedConcepts.length > 0 && (
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-950 tracking-tighter mb-12">Related Concepts</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedConcepts.map((c: any) => (
                                <Link
                                    key={c.slug}
                                    href={`/lexicon/concept/${c.slug}`}
                                    className="group p-8 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                                >
                                    <div className="text-xs font-semibold text-blue-600 mb-3">Concept Study</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">{c.name}</h3>
                                    <p className="text-sm text-gray-500 mb-6 line-clamp-2">{c.description}</p>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <span className="text-xs text-gray-400">{c.strongs.length} Words</span>
                                        <ArrowRightIcon className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
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
                        headline: concept.title,
                        description: concept.description,
                        author: { '@type': 'Organization', name: 'Bible Maximum' },
                        publisher: { '@type': 'Organization', name: 'Bible Maximum' },
                        mainEntityOfPage: {
                            '@type': 'WebPage',
                            '@id': `https://biblemaximum.com/lexicon/concept/${slug}`
                        }
                    })
                }}
            />
        </div>
    );
}
