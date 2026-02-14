'use client';

import React, { useState } from 'react';
import {
    BookOpenIcon,
    BarChartIcon,
    ChevronLeftIcon,
    PlayIcon,
    ArrowRightIcon,
    ShieldCheckIcon,
    SunIcon,
    SparklesIcon,
    BoltIcon,
    FingerPrintIcon
} from './icons';
import Link from 'next/link';

interface LexiconEntry {
    strongs: string;
    word: string;
    transliteration: string;
    phonetic: string;
    language: string;
    pronunciation: string;
    colorCode: string;
    definitions: {
        strongs: string;
        lsj?: string;
        bdb?: string;
        abbottSmith?: string;
        briefLexicon?: string;
    };
    morphology: {
        code: string;
        explanation: string;
    };
    stats: {
        totalOccurrences: number;
        mostFrequentBook: string;
        bookBreakdown: Record<string, number>;
    };
    synergy?: {
        crossReferences: string[];
        devotional: string;
        peopleAlsoAsked?: { question: string; answer: string }[];
    };
    rootWord?: string;
    verseSample: { ref: string; text: string }[];
}

export default function LexiconTool({ entry }: { entry: LexiconEntry }) {
    const [expanded, setExpanded] = useState(false);
    const [activeLexicon, setActiveLexicon] = useState<'strongs' | 'bdb' | 'morph' | 'stats'>('strongs');

    const displayVerses = expanded
        ? [...entry.verseSample, ...entry.verseSample, ...entry.verseSample].slice(0, 10)
        : entry.verseSample;

    const isHebrew = entry.language.toLowerCase() === 'hebrew';

    return (
        <div className="relative">
            {/* STUDY TABS */}
            <div className="flex items-center space-x-2 mb-8 overflow-x-auto pb-4 no-scrollbar">
                {[
                    { id: 'strongs', name: "Strong's Exhaustive", icon: <SparklesIcon className="w-4 h-4" /> },
                    { id: 'bdb', name: isHebrew ? "BDB Hebrew" : "LSJ Classical", icon: <BookOpenIcon className="w-4 h-4" /> },
                    { id: 'morph', name: "Morphology", icon: <FingerPrintIcon className="w-4 h-4" /> },
                    { id: 'stats', name: "Usage Statistics", icon: <BarChartIcon className="w-4 h-4" /> },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        className={`px-6 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all flex items-center space-x-2 border ${activeLexicon === tab.id
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        onClick={() => setActiveLexicon(tab.id as any)}
                    >
                        {tab.icon}
                        <span>{tab.name}</span>
                    </button>
                ))}
            </div>

            {/* MAIN WORKSPACE */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                {/* HEADER */}
                <div className="p-8 md:p-12 border-b border-gray-200 bg-gray-900 text-white">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div className="flex items-center space-x-4">
                            <div className="px-4 py-1.5 rounded-lg border border-white/20 bg-white/10 text-white text-xs font-semibold">
                                {entry.strongs}
                            </div>
                            <div className="h-4 w-px bg-white/20 hidden md:block" />
                            <div className="text-xs font-medium text-white/50">
                                {entry.language} Text
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 text-xs font-medium text-blue-400">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                            <span>Strong&apos;s Concordance</span>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                        <div>
                            <h2
                                className={`text-6xl md:text-8xl font-bold mb-6 tracking-tight ${isHebrew ? 'text-right' : ''}`}
                                dir={isHebrew ? 'rtl' : 'ltr'}
                            >
                                {entry.word}
                            </h2>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-4">
                                    <span className="text-xs text-white/40">Phonetic</span>
                                    <span className="text-lg font-semibold">{entry.phonetic}</span>
                                    <button className="p-2 rounded-lg bg-white/10 hover:bg-blue-600 text-white transition-all">
                                        <PlayIcon className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-4">
                                    <span className="text-xs text-white/40">Transliteration</span>
                                    <span className="text-lg font-semibold">{entry.transliteration}</span>
                                </div>
                            </div>
                        </div>

                        {/* MORPHOLOGY BADGE */}
                        <div className="p-6 rounded-xl border border-white/10 bg-white/5 shrink-0">
                            <div className="text-xs text-white/40 mb-2">Grammar Code</div>
                            <div className="text-2xl font-mono font-bold text-blue-400 mb-1 truncate max-w-[200px]">{entry.morphology.code}</div>
                            <div className="text-xs text-white/60 max-w-[200px] leading-tight">{entry.morphology.explanation}</div>
                        </div>
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div className="p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* LEFT: TAB CONTENT */}
                        <div className="lg:col-span-2 space-y-16">

                            {/* TAB: STRONG'S */}
                            {activeLexicon === 'strongs' && (
                                <section>
                                    <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold text-sm mb-6">
                                        <BoltIcon className="w-4 h-4" />
                                        <span>Strong&apos;s Definition</span>
                                    </div>
                                    <div className="relative p-8 rounded-xl border border-gray-200 bg-gray-50">
                                        <div className="absolute -top-3 left-6 px-3 py-1 rounded-md bg-blue-600 text-white text-xs font-semibold">
                                            Strong&apos;s Exhaustive Concordance
                                        </div>
                                        <p className="text-lg font-medium text-gray-900 leading-relaxed">
                                            {entry.definitions.strongs}
                                        </p>
                                    </div>
                                </section>
                            )}

                            {/* TAB: BDB/LSJ */}
                            {activeLexicon === 'bdb' && (
                                <section>
                                    <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold text-sm mb-6">
                                        <BookOpenIcon className="w-4 h-4" />
                                        <span>{isHebrew ? 'Brown-Driver-Briggs' : 'Liddell-Scott-Jones'}</span>
                                    </div>
                                    {(entry.definitions.bdb || entry.definitions.lsj) ? (
                                        <div className="relative p-8 rounded-xl border border-gray-200 bg-gray-50">
                                            <div className="absolute -top-3 left-6 px-3 py-1 rounded-md bg-gray-700 text-white text-xs font-semibold">
                                                {isHebrew ? 'BDB Hebrew Lexicon' : 'LSJ Classical Greek'}
                                            </div>
                                            <p className="text-lg text-gray-700 leading-relaxed">
                                                {entry.definitions.lsj || entry.definitions.bdb}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="p-8 rounded-xl border border-gray-200 bg-gray-50 text-center">
                                            <p className="text-gray-400">No {isHebrew ? 'BDB' : 'LSJ'} entry available for this word.</p>
                                        </div>
                                    )}
                                    {entry.definitions.abbottSmith && (
                                        <div className="relative p-8 rounded-xl border border-gray-200 bg-white mt-6">
                                            <div className="absolute -top-3 left-6 px-3 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-semibold border border-gray-200">
                                                Abbott-Smith
                                            </div>
                                            <p className="text-base text-gray-600 leading-relaxed">
                                                {entry.definitions.abbottSmith}
                                            </p>
                                        </div>
                                    )}
                                </section>
                            )}

                            {/* TAB: MORPHOLOGY */}
                            {activeLexicon === 'morph' && (
                                <section>
                                    <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold text-sm mb-6">
                                        <FingerPrintIcon className="w-4 h-4" />
                                        <span>Morphological Analysis</span>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="p-8 rounded-xl border border-gray-200 bg-gray-50">
                                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Grammar Code</div>
                                            <div className="text-3xl font-mono font-bold text-blue-600 mb-4">{entry.morphology.code}</div>
                                            <p className="text-base text-gray-700 leading-relaxed">{entry.morphology.explanation}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-6 rounded-xl border border-gray-200 bg-white">
                                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Language</div>
                                                <div className="text-lg font-semibold text-gray-900">{entry.language}</div>
                                            </div>
                                            <div className="p-6 rounded-xl border border-gray-200 bg-white">
                                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Transliteration</div>
                                                <div className="text-lg font-semibold text-gray-900">{entry.transliteration}</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* TAB: USAGE STATISTICS */}
                            {activeLexicon === 'stats' && (
                                <section>
                                    <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold text-sm mb-6">
                                        <BarChartIcon className="w-4 h-4" />
                                        <span>Usage Statistics</span>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-6 rounded-xl border border-gray-200 bg-gray-50">
                                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Total Occurrences</div>
                                                <div className="text-4xl font-bold text-blue-600">{entry.stats.totalOccurrences}</div>
                                            </div>
                                            <div className="p-6 rounded-xl border border-gray-200 bg-gray-50">
                                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Most Frequent Book</div>
                                                <div className="text-xl font-bold text-gray-900">{entry.stats?.mostFrequentBook || 'N/A'}</div>
                                            </div>
                                        </div>
                                        <div className="p-6 rounded-xl border border-gray-200 bg-white">
                                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Book Distribution</div>
                                            <div className="space-y-3">
                                                {Object.entries(entry.stats.bookBreakdown || {}).map(([book, count]) => (
                                                    <div key={book}>
                                                        <div className="flex justify-between text-sm mb-1">
                                                            <span className="text-gray-700 font-medium">{book}</span>
                                                            <span className="text-gray-500">{count as number}x</span>
                                                        </div>
                                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                                            <div
                                                                className="bg-blue-500 h-full rounded-full transition-all"
                                                                style={{ width: `${Math.max(((count as number) / (entry.stats.totalOccurrences || 1)) * 100, 2)}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* SCRIPTURE OCCURRENCES — visible when data exists */}
                            {displayVerses.length > 0 && <section>
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                                    <div>
                                        <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold text-sm mb-3">
                                            <ShieldCheckIcon className="w-4 h-4" />
                                            <span>Scripture References</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Occurrences in the Bible</h3>
                                    </div>
                                    <div className="text-sm text-gray-500 text-right">
                                        <span className="text-gray-900 font-semibold">{entry.stats.totalOccurrences}</span> total references
                                    </div>
                                </div>

                                <div className="overflow-hidden border border-gray-200 bg-white rounded-xl shadow-sm">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-100 bg-gray-50">
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reference</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Text</th>
                                                <th className="px-6 py-4"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {displayVerses.map((v: any, i: number) => (
                                                <tr key={i} className="group hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-5">
                                                        <span className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold inline-block group-hover:bg-blue-700 transition-colors">
                                                            {v.ref}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <p className="text-gray-600 leading-relaxed border-l-2 border-gray-200 pl-4 group-hover:border-blue-400 transition-colors">
                                                            &ldquo;{v.text}&rdquo;
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-5 text-right">
                                                        <Link href={`/bible/${v.ref.replace(' ', '-')}`} className="p-2.5 rounded-lg bg-gray-100 text-gray-400 hover:bg-blue-600 hover:text-white transition-all inline-block">
                                                            <ArrowRightIcon className="w-4 h-4" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {!expanded && entry.stats.totalOccurrences > entry.verseSample.length && (
                                    <button
                                        onClick={() => setExpanded(true)}
                                        className="mt-6 w-full py-4 rounded-xl border border-gray-200 bg-white text-gray-600 font-semibold text-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
                                    >
                                        Browse All {entry.stats.totalOccurrences} References
                                    </button>
                                )}
                            </section>}
                        </div>

                        {/* RIGHT: METRICS SIDEBAR */}
                        <div className="space-y-8">
                            {/* USAGE STATS */}
                            <div className="p-8 rounded-xl border border-gray-200 bg-gray-900 text-white shadow-sm">
                                <h3 className="text-lg font-bold mb-8 flex items-center space-x-2">
                                    <BarChartIcon className="w-5 h-5 text-blue-400" />
                                    <span>Usage Statistics</span>
                                </h3>

                                <div className="space-y-6">
                                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                        <div className="text-xs text-white/40 mb-1">Total Occurrences</div>
                                        <div className="text-4xl font-bold text-blue-400">{entry.stats.totalOccurrences}<span className="text-lg text-white/20 ml-1">x</span></div>
                                    </div>

                                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                        <div className="text-xs text-white/40 mb-2">Most Frequent Book</div>
                                        <div className="text-lg font-bold text-blue-400">{entry.stats?.mostFrequentBook || 'N/A'}</div>
                                        <div className="w-full bg-white/10 rounded-full h-1 mt-4 overflow-hidden">
                                            <div className="bg-blue-400 h-full rounded-full" style={{ width: '75%' }} />
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <div className="text-xs text-white/30 mb-2">Book Distribution</div>
                                        {Object.entries(entry.stats.bookBreakdown || {}).map(([book, count]) => (
                                            <div key={book} className="group">
                                                <div className="flex justify-between text-xs mb-1 text-white/50 group-hover:text-white transition-colors">
                                                    <span>{book}</span>
                                                    <span>{count as number}</span>
                                                </div>
                                                <div className="w-full bg-white/5 rounded-full h-1">
                                                    <div
                                                        className="bg-blue-500/50 h-full rounded-full group-hover:bg-blue-400 transition-all"
                                                        style={{ width: `${((count as number) / (entry.stats.totalOccurrences || 1)) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* REFLECTION */}
                            <div className="p-8 rounded-xl border border-gray-200 bg-white shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity text-blue-600">
                                    <SunIcon className="w-24 h-24" />
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-6">
                                    <SunIcon className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-4">Devotional Reflection</h4>
                                <p className="text-gray-500 leading-relaxed mb-8 border-l-2 border-gray-200 pl-4">
                                    How does the original {entry.language} meaning of <span className="text-gray-900 font-semibold">&apos;{entry.word}&apos;</span> deepen your understanding of {entry.verseSample[0]?.ref || 'Scripture'}?
                                </p>
                                <button className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all flex items-center justify-center group/btn">
                                    <span>Journal This Study</span>
                                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* CROSS REFERENCES */}
                            {entry.synergy?.crossReferences && entry.synergy.crossReferences.length > 0 && (
                                <div className="p-8 rounded-xl border border-gray-200 bg-gray-900 text-white shadow-sm">
                                    <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                                        <FingerPrintIcon className="w-5 h-5 text-blue-400" />
                                        <span>Related Words</span>
                                    </h3>
                                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                                        Cross-referenced Strong&apos;s numbers with semantic or etymological connections.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {entry.synergy.crossReferences.map((ref: string) => (
                                            <Link
                                                key={ref}
                                                href={`/lexicon/${ref}`}
                                                className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white text-xs font-semibold hover:bg-blue-600 hover:border-blue-600 transition-all"
                                            >
                                                {ref}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* PEOPLE ALSO ASKED */}
            {entry.synergy?.peopleAlsoAsked && entry.synergy.peopleAlsoAsked.length > 0 && (
                <section className="mt-20 max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold text-sm mb-4">
                            <SparklesIcon className="w-4 h-4" />
                            <span>Common Questions</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">People Also Ask</h3>
                    </div>
                    <div className="space-y-4">
                        {entry.synergy.peopleAlsoAsked.map((paa, idx) => (
                            <details key={idx} className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition-all hover:shadow-md shadow-sm">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <span className="text-lg font-semibold text-gray-900 pr-8">{paa.question}</span>
                                    <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-400 flex items-center justify-center group-open:rotate-180 transition-all shrink-0">
                                        <ChevronLeftIcon className="w-4 h-4 rotate-270" />
                                    </div>
                                </summary>
                                <div className="px-6 pb-6">
                                    <div className="p-6 rounded-lg bg-gray-50 text-gray-600 text-base leading-relaxed border-l-4 border-blue-600">
                                        {paa.answer}
                                    </div>
                                </div>
                            </details>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
