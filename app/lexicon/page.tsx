import Link from 'next/link'
import { getAllLexiconEntries } from '@/lib/database/queries'
import LexiconSearch from '@/components/LexiconSearch'
import {
    BookOpenIcon,
    SearchIcon,
    SparklesIcon,
    ShieldCheckIcon,
    ChevronRightIcon,
    ArrowRightIcon,
    ChartBarIcon,
    BoltIcon,
    FingerPrintIcon
} from '@/components/icons'

export const metadata = {
    title: 'Bible Lexicon | 14,000+ Greek & Hebrew Word Studies with Strong\'s Concordance | Abbott-Smith, LSJ & BDB Definitions | Scripture References | Bible Maximum',
    description: 'Unlock the original languages of Scripture. Explore Strong\'s concordance, theological insights, and deep word studies for every Greek and Hebrew term in the Bible.',
}

export const revalidate = 86400 // 24 hours

export default async function LexiconHubPage() {
    const allEntries = await getAllLexiconEntries()

    // Single-pass filter: separate Greek and Hebrew with counts
    const greekEntries: any[] = [];
    const hebrewEntries: any[] = [];
    let totalGreek = 0;
    let totalHebrew = 0;

    for (const entry of allEntries) {
        const lang = (entry as any).language?.toLowerCase();
        if (lang === 'greek') {
            totalGreek++;
            if (greekEntries.length < 12) greekEntries.push(entry);
        } else if (lang === 'hebrew') {
            totalHebrew++;
            if (hebrewEntries.length < 12) hebrewEntries.push(entry);
        }
    }

    return (
        <div className="bg-white pb-32">
            {/* 1. HERO */}
            <section className="relative pt-32 pb-24 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-8">
                            <BookOpenIcon className="w-4 h-4" />
                            <span>14,000+ Word Studies</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                            Biblical Lexicon
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 mb-14 max-w-3xl mx-auto leading-relaxed">
                            Explore the depth of <span className="text-gray-900 font-bold">{(totalGreek + totalHebrew).toLocaleString()}</span> original biblical root words for scriptural clarity.
                        </p>

                        {/* SEARCH BAR */}
                        <LexiconSearch />

                        {/* STATS ROW */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
                                <div className="text-3xl font-bold text-gray-900 mb-1">{totalGreek.toLocaleString()}</div>
                                <div className="text-sm text-gray-500">Greek Entries</div>
                            </div>
                            <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
                                <div className="text-3xl font-bold text-gray-900 mb-1">{totalHebrew.toLocaleString()}</div>
                                <div className="text-sm text-gray-500">Hebrew Entries</div>
                            </div>
                            <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm col-span-2 md:col-span-1 border-t-4 border-t-blue-600">
                                <div className="text-3xl font-bold text-blue-600 mb-1">100%</div>
                                <div className="text-sm text-gray-500">Coverage</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. THEMATIC STUDIES */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <div>
                            <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold text-sm mb-4">
                                <SparklesIcon className="w-4 h-4" />
                                <span>Curated Themes</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Explore by Theme</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mt-4 leading-relaxed">
                                Word clusters grouped by theological significance. Explore core biblical concepts in their original context.
                            </p>
                        </div>
                        <div className="flex items-center">
                            <Link href="/lexicon/browse/greek" className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold shadow-sm flex items-center space-x-2 group hover:bg-blue-700 transition-colors">
                                <span>Browse Full Index</span>
                                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { slug: 'love', name: 'Love (Agape)', icon: <BookOpenIcon className="w-6 h-6" />, count: 6, flavor: 'Divine Charity' },
                            { slug: 'peace', name: 'Peace (Shalom)', icon: <ShieldCheckIcon className="w-6 h-6" />, count: 2, flavor: 'Wholeness' },
                            { slug: 'wisdom', name: 'Wisdom (Sophia)', icon: <SparklesIcon className="w-6 h-6" />, count: 4, flavor: 'Logos Logic' },
                            { slug: 'grace', name: 'Grace (Charis)', icon: <BoltIcon className="w-6 h-6" />, count: 3, flavor: 'Unmerited Gift' },
                        ].map((theme) => (
                            <Link
                                key={theme.slug}
                                href={`/lexicon/concept/${theme.slug}`}
                                className="group p-8 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    {theme.icon}
                                </div>
                                <div className="text-xs font-semibold text-blue-600 mb-3">
                                    Concept Study
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">{theme.name}</h3>
                                <p className="text-sm text-gray-500 mb-8">{theme.flavor}</p>

                                <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                                    <div className="text-xs text-gray-400">{theme.count} Word Studies</div>
                                    <div className="p-1.5 rounded-lg bg-gray-50 text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <ArrowRightIcon className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. AUTHOR ANALYSIS */}
            <section className="py-24 bg-gray-900 overflow-hidden relative rounded-lg mx-4 sm:mx-8 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <div className="inline-flex items-center space-x-2 text-blue-400 font-semibold text-sm mb-4">
                            <FingerPrintIcon className="w-4 h-4" />
                            <span>Literary Analysis</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Biblical Authors</h2>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            Analyze the unique theological style encoded in the original manuscripts. Compare vocabulary density across biblical authors.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'paul', lang: 'greek', display: 'St. Paul', desc: 'Theological Architect. High-density dialectical Greek with massive vocabulary range.', count: '13 Books' },
                            { name: 'john', lang: 'greek', display: 'St. John', desc: 'Lyrical Revelationist. Simple vocabulary layered with deep semantic dualism.', count: '5 Books' },
                            { name: 'moses', lang: 'hebrew', display: 'Moses', desc: 'The Lawgiver. Foundational Hebrew with high structural etymology.', count: '5 Books' }
                        ].map((author) => (
                            <Link
                                key={author.name}
                                href={`/lexicon/author/${author.name}/${author.lang}`}
                                className="group relative p-10 rounded-xl border border-gray-700 bg-gray-800/50 hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-xl bg-gray-700 border border-gray-600 flex items-center justify-center text-white mb-8 group-hover:bg-blue-600 transition-colors">
                                    <FingerPrintIcon className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{author.display}</h3>
                                <p className="text-gray-400 text-sm mb-8 leading-relaxed">{author.desc}</p>
                                <div className="mt-auto px-5 py-2 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-semibold group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    Analyze {author.count}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. SYNONYM COMPARISON */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 mb-16">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold text-sm mb-4">
                                <ChartBarIcon className="w-4 h-4" />
                                <span>Comparative Study</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Word Comparisons</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                English abstracts words that the original languages differentiate with profound precision. Compare related terms to find the specific scriptural meaning.
                            </p>
                        </div>
                        <div className="shrink-0">
                            <Link href="/lexicon/compare/G25-vs-G5368" className="px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-blue-700 transition-colors">
                                Open Study Tool
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { a: 'G25', b: 'G5368', title: 'Agapao vs Phileo', desc: 'Distinguishing the dual nature of "Love" in the original New Testament manuscripts.', color: 'bg-blue-600' },
                            { a: 'H7965', b: 'G1515', title: 'Shalom vs Eirene', desc: 'Mapping the concept of Peace across Hebrew and Greek scripture layers.', color: 'bg-blue-500' },
                            { a: 'G5485', b: 'G1656', title: 'Charis vs Eleos', desc: 'Study on the intersection of unmerited favor and active divine mercy.', color: 'bg-gray-900' }
                        ].map((comp) => (
                            <Link
                                key={`${comp.a}-${comp.b}`}
                                href={`/lexicon/compare/${comp.a}-vs-${comp.b}`}
                                className="group p-8 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex -space-x-3">
                                        <div className={`w-11 h-11 rounded-lg ${comp.color} shadow-sm flex items-center justify-center text-white text-xs font-bold border-2 border-white transition-transform group-hover:-rotate-6`}>
                                            {comp.a}
                                        </div>
                                        <div className="w-11 h-11 rounded-lg bg-gray-900 shadow-sm flex items-center justify-center text-white text-xs font-bold border-2 border-white transition-transform group-hover:rotate-6">
                                            {comp.b}
                                        </div>
                                    </div>
                                    <div className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                        Compare
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">{comp.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed mb-8">{comp.desc}</p>
                                <div className="flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                                    Compare Terms <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. COMPLETE INDEXES */}
            <section className="py-24 bg-gray-50 rounded-lg mx-4 sm:mx-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Complete Index</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Access the complete index of every unique word found in the biblical text. Direct entry to the full biblical dictionary.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <Link
                            href="/lexicon/browse/greek"
                            className="group relative p-10 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-blue-600">
                                <BookOpenIcon className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-8 shadow-sm group-hover:bg-blue-700 transition-colors">
                                    <BookOpenIcon className="w-7 h-7" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Greek Index</h3>
                                <p className="text-base text-gray-500 mb-8 leading-relaxed">
                                    Explore the full vocabulary of the Greek New Testament.
                                </p>
                                <div className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold group-hover:bg-blue-700 transition-colors">
                                    Browse Greek <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>

                        <Link
                            href="/lexicon/browse/hebrew"
                            className="group relative p-10 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-blue-600">
                                <BookOpenIcon className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-xl bg-gray-900 flex items-center justify-center text-white mb-8 shadow-sm group-hover:bg-blue-600 transition-colors">
                                    <BookOpenIcon className="w-7 h-7" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Hebrew Index</h3>
                                <p className="text-base text-gray-500 mb-8 leading-relaxed">
                                    Explore the original root words of the Hebrew Old Testament.
                                </p>
                                <div className="inline-flex items-center px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-semibold group-hover:bg-blue-600 transition-colors">
                                    Browse Hebrew <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 6. GREEK WORD GRID */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <div>
                            <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold text-sm mb-4">
                                <SparklesIcon className="w-4 h-4" />
                                <span>Greek Manuscript Study</span>
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">New Testament Greek</h2>
                        </div>
                        <div className="text-sm text-gray-500 border-l-2 border-gray-200 pl-5">
                            Lexicon <br />
                            <span className="text-gray-900 font-semibold">{totalGreek.toLocaleString()} Entries</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {greekEntries.map((entry: any) => (
                            <Link
                                key={entry.strongs}
                                href={`/lexicon/${entry.strongs}`}
                                className="group p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md hover:border-blue-300 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-5">
                                    <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                                        {entry.strongs}
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors">
                                    {entry.word}
                                </div>
                                <div className="text-sm text-gray-500 font-medium mb-1">{entry.transliteration}</div>
                                {entry.pronunciation && (
                                    <div className="text-xs text-gray-400">{entry.pronunciation}</div>
                                )}
                                <div className="mt-6 flex items-center text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-all translate-x-[-8px] group-hover:translate-x-0">
                                    Study Word <ArrowRightIcon className="w-4 h-4 ml-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* HEBREW WORD GRID */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <div>
                            <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold text-sm mb-4">
                                <SparklesIcon className="w-4 h-4" />
                                <span>Hebrew Scripture Study</span>
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Old Testament Hebrew</h2>
                        </div>
                        <div className="text-sm text-gray-500 border-l-2 border-gray-200 pl-5">
                            Lexicon <br />
                            <span className="text-gray-900 font-semibold">{totalHebrew.toLocaleString()} Entries</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {hebrewEntries.map((entry: any) => (
                            <Link
                                key={entry.strongs}
                                href={`/lexicon/${entry.strongs}`}
                                className="group p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md hover:border-blue-300 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-5">
                                    <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                                        {entry.strongs}
                                    </div>
                                </div>
                                <div className="text-4xl font-bold text-gray-900 mb-2 tracking-tight text-right group-hover:text-blue-600 transition-colors" dir="rtl">
                                    {entry.word}
                                </div>
                                <div className="text-sm text-gray-500 font-medium mb-1">{entry.transliteration}</div>
                                {entry.pronunciation && (
                                    <div className="text-xs text-gray-400">{entry.pronunciation}</div>
                                )}
                                <div className="mt-6 flex items-center text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-all translate-x-[-8px] group-hover:translate-x-0">
                                    Study Word <ArrowRightIcon className="w-4 h-4 ml-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. CTA */}
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto p-16 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-center relative overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1)_0%,_transparent_60%)]" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center space-x-2 text-blue-200 font-semibold text-sm mb-8">
                            <BookOpenIcon className="w-5 h-5" />
                            <span>Biblical Scholarship</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
                            Begin Your Study
                        </h2>

                        <p className="text-lg text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Navigate through Strong's definitions, concordances, and word-usage statistics for total scriptural clarity.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/lexicon/browse/greek" className="px-8 py-3.5 bg-white text-blue-600 rounded-xl text-sm font-semibold shadow-sm hover:bg-blue-50 transition-colors flex items-center group/btn">
                                <span>Greek Index</span>
                                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/lexicon/browse/hebrew" className="px-8 py-3.5 bg-blue-500 text-white border border-blue-400 rounded-xl text-sm font-semibold hover:bg-blue-400 transition-colors flex items-center group/btn">
                                <span>Hebrew Index</span>
                                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
