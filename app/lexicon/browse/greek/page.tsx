import { Metadata } from 'next';
import { getLexiconPaginated } from '@/lib/database/queries';
import Link from 'next/link';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    SearchIcon,
    SparklesIcon,
    BookOpenIcon
} from '@/components/icons';

export const metadata: Metadata = {
    title: 'Greek Lexicon | Browse All 5,600+ New Testament Words with Strong\'s Numbers | Definitions from Abbott-Smith & Liddell-Scott-Jones | Bible Maximum',
    description: 'Explore every Greek word in the New Testament. A complete, paginated index of the Greek Lexicon with Strong\'s numbers, definitions, and usage stats.',
    alternates: { canonical: '/lexicon/browse/greek' },
};

export default async function GreekLexiconBrowsePage({
    searchParams
}: {
    searchParams: { page?: string }
}) {
    const currentPage = parseInt(searchParams.page || '1');
    const { entries, totalCount, totalPages } = await getLexiconPaginated('greek', currentPage, 100);

    return (
        <div className="bg-[#FAFAF9] pb-32 min-h-screen">
            {/* SCHOLAR'S NAVIGATION */}
            <div className="bg-white/40 border-b border-gray-200 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                    <Link href="/lexicon" className="group flex items-center text-gray-500 hover:text-amber-600 transition-all text-[11px] font-bold uppercase">
                        <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span>Return to Hub</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-6 text-[10px] font-bold uppercase text-gray-400">
                        <span>New Testament Corpus</span>
                        <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                        <span className="text-gray-900">Greek Strong's resolution index</span>
                    </div>
                </div>
            </div>

            {/* HERO: RESOLUTION INDEX */}
            <section className="py-20 bg-white/40 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center space-x-2 text-blue-600 font-bold text-[10px] uppercase mb-6">
                                <SparklesIcon className="w-4 h-4" />
                                <span>Manuscript Index Alpha-Index</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-950 tracking-tighter mb-6">
                                Greek <span className="text-blue-600 italic">Lexicon.</span>
                            </h1>
                            <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl">
                                Complete resolution of <span className="text-gray-950 font-bold">{totalCount.toLocaleString()}</span> unique Greek variables found in the New Testament manuscripts.
                            </p>
                        </div>
                        <div className="glass-panel p-10 rounded-[40px] border border-gray-100 bg-white/60 shadow-xl shrink-0 text-center md:text-left">
                            <div className="text-[10px] font-bold text-gray-400 uppercase mb-2">Inventory Count</div>
                            <div className="text-5xl font-bold text-gray-950">{totalCount.toLocaleString()}</div>
                            <div className="text-[9px] font-bold text-blue-500 uppercase mt-2">Active Data Points</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* RESULTS: DENSE SCHOLAR CARDS */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {entries.map((entry: any) => (
                            <Link
                                key={entry.strongs}
                                href={`/lexicon/${entry.strongs}`}
                                className="group glass-panel p-8 rounded-[40px] border border-white bg-white hover:border-blue-600/30 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="text-[11px] font-bold text-gray-300 uppercase group-hover:text-amber-600 transition-colors">{entry.strongs}</span>
                                        <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-200 group-hover:bg-blue-50 group-hover:text-blue-400 transition-all">
                                            <BookOpenIcon className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="text-4xl font-bold text-gray-950 mb-3 tracking-tighter group-hover:text-blue-600 transition-colors">
                                        {entry.word}
                                    </div>
                                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 opacity-70">
                                        {entry.transliteration}
                                    </div>
                                    <p className="text-gray-500 text-[13px] font-medium leading-relaxed mb-8 line-clamp-2">
                                        {entry.definitions?.strongs?.split(';')[0] || 'Execute full lexical breakdown...'}
                                    </p>
                                </div>
                                <div className="text-[10px] font-bold text-blue-600 uppercase opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 flex items-center">
                                    Execute Study <ArrowRightIcon className="w-4 h-4 ml-2" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* SCHOLAR'S PAGINATION */}
                    {totalPages > 1 && (
                        <div className="mt-24 flex items-center justify-center space-x-12">
                            {currentPage > 1 ? (
                                <Link
                                    href={`/lexicon/browse/greek?page=${currentPage - 1}`}
                                    className="group flex items-center text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-amber-600 transition-all"
                                >
                                    <ChevronLeftIcon className="w-5 h-5 mr-3 group-hover:-translate-x-2 transition-transform" />
                                    <span>Inverse Sequence</span>
                                </Link>
                            ) : (
                                <div className="w-40" />
                            )}

                            <div className="glass-panel px-10 py-5 rounded-full border border-gray-100 bg-white/60 shadow-lg flex items-center space-x-6">
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Sequence Layer</span>
                                <div className="text-xl font-bold text-gray-950">
                                    {currentPage} <span className="text-gray-300 font-medium">/ {totalPages}</span>
                                </div>
                            </div>

                            {currentPage < totalPages ? (
                                <Link
                                    href={`/lexicon/browse/greek?page=${currentPage + 1}`}
                                    className="group flex items-center text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-amber-600 transition-all"
                                >
                                    <span>Next Sequence</span>
                                    <ChevronRightIcon className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            ) : (
                                <div className="w-40" />
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* RESOLUTION SHIFT CTA */}
            <section className="py-32 px-4">
                <div className="max-w-5xl mx-auto glass-panel p-20 rounded-[64px] border border-gray-100 bg-gray-900 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-900/40 via-transparent to-transparent -z-10" />
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">Shift to <span className="text-rose-500 italic">Hebrew.</span></h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        Execute ancient textual analysis on the 8,674 Hebrew and Aramaic variables of the Old Testament layer.
                    </p>
                    <Link href="/lexicon/browse/hebrew" className="btn-premium px-12 py-6 bg-rose-600 text-white rounded-[32px] text-sm font-bold uppercase shadow-2xl hover:scale-105 transition-all inline-flex items-center group/btn">
                        <span>Launch Hebrew Index</span>
                        <ArrowRightIcon className="w-5 h-5 ml-3 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
