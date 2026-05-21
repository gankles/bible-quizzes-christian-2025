'use client';

import React, { useState } from 'react';
import {
    BookOpenIcon,
    BarChartIcon,
    ChevronLeftIcon,
    ArrowRightIcon,
    ShieldCheckIcon,
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

function refToPath(ref: string): string {
    // "Genesis 1:1" → "/verses/genesis/1/1"
    // "1 Samuel 2:3" → "/verses/1-samuel/2/3"
    const match = ref.match(/^(\d?\s*[A-Za-z]+)\s+(\d+):(\d+)$/);
    if (!match) return '/lexicon';
    const book = match[1].trim().toLowerCase().replace(/\s+/g, '-');
    return `/verses/${book}/${match[2]}/${match[3]}`;
}

interface CrossRefEntry {
    strongs: string;
    word: string;
    transliteration: string;
}

export default function LexiconTool({ entry, crossRefEntries }: { entry: LexiconEntry; crossRefEntries?: CrossRefEntry[] }) {
    const [activeLexicon, setActiveLexicon] = useState<'strongs' | 'bdb' | 'morph'>('strongs');

    const isHebrew = entry.language.toLowerCase() === 'hebrew';

    return (
        <div className="editorial-tabs">
            {/* STUDY TABS */}
            <div className="tab-header-list">
                {[
                    { id: 'strongs', name: "Strong's Exhaustive", icon: <SparklesIcon className="w-4 h-4" /> },
                    { id: 'bdb', name: isHebrew ? "BDB Hebrew" : "LSJ Classical", icon: <BookOpenIcon className="w-4 h-4" /> },
                    { id: 'morph', name: "Morphology", icon: <FingerPrintIcon className="w-4 h-4" /> },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeLexicon === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveLexicon(tab.id as any)}
                    >
                        {tab.icon}
                        <span>{tab.name}</span>
                    </button>
                ))}
            </div>

            {/* MAIN WORKSPACE */}
            <div className="tab-pane-content">
                {/* HEADER — editorial cream design */}
                <div className="p-6 md:p-8 border-b border-grace bg-white">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-3 py-1 rounded-full bg-sacred/10 text-sacred text-xs font-bold uppercase tracking-wider">
                                    {entry.strongs}
                                </span>
                                <span className="text-xs text-ink-muted font-sans">{entry.language} Text</span>
                            </div>
                            <h2
                                className={`font-display text-4xl md:text-5xl font-bold text-scripture mb-4 tracking-tight ${isHebrew ? 'text-right' : ''}`}
                                dir={isHebrew ? 'rtl' : 'ltr'}
                            >
                                {entry.word}
                            </h2>
                            <div className="flex flex-wrap items-center gap-3">
                                {entry.phonetic && (
                                    <div className="px-4 py-2 rounded-lg bg-primary-light border border-grace flex items-center gap-3">
                                        <span className="text-xs text-ink-light font-sans">Phonetic</span>
                                        <span className="text-base font-semibold text-scripture">{entry.phonetic}</span>
                                    </div>
                                )}
                                {entry.transliteration && (
                                    <div className="px-4 py-2 rounded-lg bg-primary-light border border-grace flex items-center gap-3">
                                        <span className="text-xs text-ink-light font-sans">Transliteration</span>
                                        <span className="text-base font-semibold text-scripture">{entry.transliteration}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* MORPHOLOGY BADGE */}
                        {entry.morphology?.code && (
                            <div className="p-4 rounded-xl border border-grace bg-primary-light/50 shrink-0">
                                <div className="text-xs text-ink-light font-sans mb-2 uppercase tracking-wider">Grammar Code</div>
                                <div className="text-2xl font-mono font-bold text-sacred mb-1 truncate max-w-[200px]">{entry.morphology.code}</div>
                                <div className="text-xs text-ink-muted max-w-[200px] leading-tight">{entry.morphology.explanation}</div>
                            </div>
                        )}
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
                                    <div className="inline-flex items-center space-x-2 text-sacred font-semibold text-sm mb-6">
                                        <BoltIcon className="w-4 h-4" />
                                        <span>Strong&apos;s Definition</span>
                                    </div>
                                    <div className="relative p-8 rounded-xl border border-grace bg-primary-light/30">
                                        <div className="absolute -top-3 left-6 px-3 py-1 rounded-md bg-scripture text-white text-xs font-semibold">
                                            Strong&apos;s Exhaustive Concordance
                                        </div>
                                        <p className="text-lg font-medium text-scripture leading-relaxed">
                                            {entry.definitions.strongs}
                                        </p>
                                    </div>
                                </section>
                            )}

                            {/* TAB: BDB/LSJ */}
                            {activeLexicon === 'bdb' && (
                                <section>
                                    <div className="inline-flex items-center space-x-2 text-sacred font-semibold text-sm mb-6">
                                        <BookOpenIcon className="w-4 h-4" />
                                        <span>{isHebrew ? 'Brown-Driver-Briggs' : 'Liddell-Scott-Jones'}</span>
                                    </div>
                                    {(entry.definitions.bdb || entry.definitions.lsj) ? (
                                        <div className="relative p-8 rounded-xl border border-grace bg-primary-light/30">
                                            <div className="absolute -top-3 left-6 px-3 py-1 rounded-md bg-scripture/80 text-white text-xs font-semibold">
                                                {isHebrew ? 'BDB Hebrew Lexicon' : 'LSJ Classical Greek'}
                                            </div>
                                            <p className="text-lg text-scripture leading-relaxed">
                                                {entry.definitions.lsj || entry.definitions.bdb}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="p-8 rounded-xl border border-grace bg-primary-light/30 text-center">
                                            <p className="text-ink-light">No {isHebrew ? 'BDB' : 'LSJ'} entry available for this word.</p>
                                        </div>
                                    )}
                                    {entry.definitions.abbottSmith && (
                                        <div className="relative p-8 rounded-xl border border-grace bg-white mt-6">
                                            <div className="absolute -top-3 left-6 px-3 py-1 rounded-md bg-grace/20 text-ink-muted text-xs font-semibold border border-grace">
                                                Abbott-Smith
                                            </div>
                                            <p className="text-base text-ink-muted leading-relaxed">
                                                {entry.definitions.abbottSmith}
                                            </p>
                                        </div>
                                    )}
                                </section>
                            )}

                            {/* TAB: MORPHOLOGY */}
                            {activeLexicon === 'morph' && (
                                <section>
                                    <div className="inline-flex items-center space-x-2 text-sacred font-semibold text-sm mb-6">
                                        <FingerPrintIcon className="w-4 h-4" />
                                        <span>Morphological Analysis</span>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="p-8 rounded-xl border border-grace bg-primary-light/30">
                                            <div className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">Grammar Code</div>
                                            <div className="text-3xl font-mono font-bold text-sacred mb-4">{entry.morphology.code}</div>
                                            <p className="text-base text-scripture leading-relaxed">{entry.morphology.explanation}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-6 rounded-xl border border-grace bg-white">
                                                <div className="text-xs font-semibold text-ink-light uppercase tracking-wider mb-2">Language</div>
                                                <div className="text-lg font-semibold text-scripture">{entry.language}</div>
                                            </div>
                                            <div className="p-6 rounded-xl border border-grace bg-white">
                                                <div className="text-xs font-semibold text-ink-light uppercase tracking-wider mb-2">Transliteration</div>
                                                <div className="text-lg font-semibold text-scripture">{entry.transliteration}</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* SCRIPTURE OCCURRENCES — visible when data exists */}
                            {entry.verseSample.length > 0 && <section>
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                                    <div>
                                        <div className="inline-flex items-center space-x-2 text-sacred font-semibold text-sm mb-3">
                                            <ShieldCheckIcon className="w-4 h-4" />
                                            <span>Scripture References</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-scripture tracking-tight">Occurrences in the Bible</h3>
                                    </div>
                                    <div className="text-sm text-ink-muted text-right">
                                        <span className="text-scripture font-semibold">{entry.stats.totalOccurrences}</span> total references
                                    </div>
                                </div>

                                <div className="overflow-hidden border border-grace bg-white rounded-xl shadow-sm">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-grace/50 bg-primary-light/30">
                                                <th className="px-6 py-4 text-xs font-semibold text-ink-muted uppercase tracking-wider">Reference</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-ink-muted uppercase tracking-wider">Text</th>
                                                <th className="px-6 py-4"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-grace/50">
                                            {entry.verseSample.map((v: any, i: number) => (
                                                <tr key={i} className="group hover:bg-primary-light/50 transition-colors">
                                                    <td className="px-6 py-5">
                                                        <Link href={refToPath(v.ref)} className="px-3 py-1.5 rounded-lg bg-scripture text-white text-xs font-semibold inline-block group-hover:bg-scripture/80 transition-colors">
                                                            {v.ref}
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <p className="text-ink-muted leading-relaxed border-l-2 border-grace pl-4 group-hover:border-sacred/50 transition-colors">
                                                            &ldquo;{v.text}&rdquo;
                                                        </p>
                                                        <span className="text-xs text-sacred font-semibold mt-1 block">Word: {entry.word} ({entry.transliteration})</span>
                                                    </td>
                                                    <td className="px-6 py-5 text-right">
                                                        <Link href={refToPath(v.ref)} className="p-2.5 rounded-lg bg-grace/20 text-ink-light hover:bg-scripture hover:text-white transition-all inline-block">
                                                            <ArrowRightIcon className="w-4 h-4" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </section>}
                        </div>

                        {/* RIGHT: METRICS SIDEBAR */}
                        <div className="space-y-8">
                            {/* USAGE STATS */}
                            <div className="p-8 rounded-xl border border-grace bg-scripture text-white shadow-sm">
                                <h3 className="text-lg font-bold mb-8 flex items-center space-x-2">
                                    <BarChartIcon className="w-5 h-5 text-sacred" />
                                    <span>Usage Statistics</span>
                                </h3>

                                <div className="space-y-6">
                                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                        <div className="text-xs text-white/40 mb-1">Total Occurrences</div>
                                        <div className="text-4xl font-bold text-sacred">{entry.stats.totalOccurrences}<span className="text-lg text-white/20 ml-1">x</span></div>
                                    </div>

                                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                        <div className="text-xs text-white/40 mb-2">Most Frequent Book</div>
                                        <div className="text-lg font-bold text-sacred">{entry.stats?.mostFrequentBook || 'N/A'}</div>
                                        <div className="w-full bg-white/10 rounded-full h-1 mt-4 overflow-hidden">
                                            <div className="bg-sacred h-full rounded-full" style={{ width: '75%' }} />
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <div className="text-xs text-white/30 mb-2">Book Distribution</div>
                                        {Object.entries(entry.stats.bookBreakdown || {}).map(([book, count]) => (
                                            <div key={book} className="group">
                                                <div className="flex justify-between text-xs mb-1 text-white/50 group-hover:text-white transition-colors">
                                                    <Link href={`/${book.toLowerCase().replace(/\s+/g, '-')}-chapters`} className="hover:text-sacred transition-colors">
                                                        {book}
                                                    </Link>
                                                    <span>{count as number}</span>
                                                </div>
                                                <div className="w-full bg-white/5 rounded-full h-1">
                                                    <div
                                                        className="bg-sacred/50 h-full rounded-full group-hover:bg-sacred transition-all"
                                                        style={{ width: `${((count as number) / (entry.stats.totalOccurrences || 1)) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* CROSS REFERENCES */}
                            {entry.synergy?.crossReferences && entry.synergy.crossReferences.length > 0 && (
                                <div className="p-8 rounded-xl border border-grace bg-scripture text-white shadow-sm">
                                    <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                                        <FingerPrintIcon className="w-5 h-5 text-sacred" />
                                        <span>Related Words</span>
                                    </h3>
                                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                                        Cross-referenced Strong&apos;s numbers with semantic or etymological connections.
                                    </p>
                                    <div className="word-grid">
                                        {crossRefEntries && crossRefEntries.length > 0
                                            ? crossRefEntries.map((ref) => (
                                                <Link key={ref.strongs} href={`/lexicon/${ref.strongs}`}>
                                                    <div className="word-item">
                                                        {ref.word && <span className="word-original">{ref.word}</span>}
                                                        {ref.transliteration && <span className="word-translit">{ref.transliteration}</span>}
                                                        <span className="word-meaning">{ref.strongs}</span>
                                                    </div>
                                                </Link>
                                            ))
                                            : entry.synergy.crossReferences.map((ref: string) => (
                                                <Link key={ref} href={`/lexicon/${ref}`}>
                                                    <div className="word-item">
                                                        <span className="word-meaning">{ref}</span>
                                                    </div>
                                                </Link>
                                            ))
                                        }
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
                        <div className="inline-flex items-center space-x-2 text-sacred font-semibold text-sm mb-4">
                            <SparklesIcon className="w-4 h-4" />
                            <span>Common Questions</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-scripture tracking-tight">People Also Ask</h3>
                    </div>
                    <div className="space-y-4">
                        {entry.synergy.peopleAlsoAsked.map((paa, idx) => (
                            <details key={idx} className="group rounded-xl border border-grace bg-white overflow-hidden transition-all hover:shadow-md shadow-sm">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <span className="text-lg font-semibold text-scripture pr-8">{paa.question}</span>
                                    <div className="w-8 h-8 rounded-lg bg-grace/20 text-ink-light flex items-center justify-center group-open:rotate-180 transition-all shrink-0">
                                        <ChevronLeftIcon className="w-4 h-4 rotate-270" />
                                    </div>
                                </summary>
                                <div className="px-6 pb-6">
                                    <div className="p-6 rounded-lg bg-primary-light/30 text-ink-muted text-base leading-relaxed border-l-4 border-sacred">
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
