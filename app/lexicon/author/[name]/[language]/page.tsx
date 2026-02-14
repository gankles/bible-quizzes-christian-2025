import { Metadata } from 'next';
import { getAuthorLexicon } from '@/lib/database/queries';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AuthorVocabularyFrequency from '@/components/AuthorVocabularyFrequency';
import {
    ArrowLeftIcon,
    ChartBarIcon,
    BookOpenIcon,
    SparklesIcon,
    FingerPrintIcon,
    ArrowRightIcon,
    BoltIcon
} from '@/components/icons';

export async function generateMetadata({ params }: { params: Promise<{ name: string; language: string }> }): Promise<Metadata> {
    const { name, language } = await params;
    const authorName = name.charAt(0).toUpperCase() + name.slice(1);
    return {
        title: `${authorName}'s ${language.charAt(0).toUpperCase() + language.slice(1)} Vocabulary | Bible Maximum`,
        description: `Analyze the high-frequency vocabulary and linguistic style of ${authorName} in the original ${language} text. Discover their most emphasized theological terms.`,
        alternates: { canonical: `/lexicon/author/${name}/${language}` },
    };
}

export default async function LexiconAuthorPage({ params }: { params: Promise<{ name: string; language: string }> }) {
    const { name, language } = await params;
    const data = await getAuthorLexicon(name, language);

    if (!data) {
        notFound();
    }

    const { author, topVocab, totalWordsCount } = data;

    const mainColorClass = author.language === 'greek' ? 'indigo' : 'rose';

    return (
        <div className="bg-[#FAFAF9] pb-32 min-h-screen">
            {/* SCHOLAR'S NAVIGATION */}
            <div className="bg-gray-50 border-b border-gray-500/10">
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                    <Link href="/lexicon" className="group flex items-center text-gray-500 hover:text-blue-600 transition-all text-[10px] font-bold uppercase">
                        <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span>Return to Lexicon Hub</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-6 text-[10px] font-bold uppercase text-gray-900/40">
                        <span>Authorial Vocabulary Study</span>
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        <span className="text-gray-900">Manuscript Style Analysis</span>
                    </div>
                </div>
            </div>

            {/* HERO: SCHOLARLY FOCUS */}
            <section className={`relative py-32 overflow-hidden bg-gray-900 text-white`}>
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt-paper.png')]" />

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center space-x-3 text-blue-600 font-bold text-[10px] uppercase  mb-12">
                        <FingerPrintIcon className="w-4 h-4" />
                        <span>Authorial Study Standard</span>
                    </div>

                    <h1 className="text-6xl md:text-9xl font-bold mb-12 tracking-tighter leading-tight uppercase italic animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {author.displayName}<span className="text-blue-600">.</span>
                    </h1>

                    <p className="text-2xl md:text-3xl text-white/50 max-w-4xl mx-auto leading-relaxed mb-16 font-medium italic">
                        "{author.description}"
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        <div className="p-10 rounded-xl border border-white/10 bg-white/5 shadow-2xl">
                            <div className="text-4xl font-bold text-white mb-2">{totalWordsCount.toLocaleString()}</div>
                            <div className="text-[10px] font-bold uppercase text-white/30 italic">Unique Word Set</div>
                        </div>
                        <div className="p-10 rounded-xl border border-white/10 bg-white/5 shadow-2xl">
                            <div className="text-4xl font-bold text-white mb-2">{author.books.length}</div>
                            <div className="text-[10px] font-bold uppercase text-white/30 italic">Biblical Books</div>
                        </div>
                        <div className="p-10 rounded-xl border border-white/10 bg-white/5 shadow-2xl">
                            <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
                            <div className="text-[10px] font-bold uppercase text-white/30 italic">Style Consistency</div>
                        </div>
                        <div className="p-10 rounded-xl border border-white/10 bg-white/5 shadow-2xl">
                            <div className="text-4xl font-bold text-blue-600 mb-2">Top 50</div>
                            <div className="text-[10px] font-bold uppercase text-white/30 italic">Emphasis Points</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STUDY: VOCABULARY FREQUENCY */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                        <div>
                            <div className="inline-flex items-center space-x-2 text-gray-900/40 font-bold text-[10px] uppercase mb-6">
                                <ChartBarIcon className="w-4 h-4 text-blue-600" />
                                <span>Word Frequency Study</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tighter uppercase italic">Vocabulary <span className="text-gray-500/40 not-italic font-light text-4xl">Concentration.</span></h2>
                        </div>
                        <div className="text-[11px] font-bold text-gray-500/40 uppercase border-l-2 border-gray-500/10 pl-8 italic">
                            Manuscript Word Base <br />
                            <span className="text-gray-900 not-italic">{author.language.charAt(0).toUpperCase() + author.language.slice(1)} Vocabulary Index</span>
                        </div>
                    </div>

                    <div className="p-12 md:p-20 rounded-[64px] border border-gray-500/10 bg-white shadow-3xl">
                        <AuthorVocabularyFrequency
                            vocab={topVocab}
                            authorName={author.displayName}
                            language={author.language}
                        />
                    </div>
                </div>
            </section>

            {/* THEMATIC SIGNATURE: WORD STUDIES */}
            <section className="py-32 bg-gray-50 relative overflow-hidden rounded-[80px] mx-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tighter uppercase italic">Theological <span className="text-gray-500/40 not-italic">Signature.</span></h2>
                        <p className="text-xl text-gray-900/60 max-w-2xl mx-auto font-medium leading-relaxed italic">
                            Analyzing the {author.displayName} manuscript signature. These are the core terms that define their scriptural legacy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {topVocab.map((entry: any) => (
                            <Link
                                key={entry.strongs}
                                href={`/lexicon/${entry.strongs}`}
                                className="group p-12 rounded-[48px] border border-gray-500/10 bg-white hover:border-blue-600/30 hover:shadow-2xl transition-all duration-700 h-full flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-start justify-between mb-10">
                                        <div className={`px-4 py-1.5 rounded-lg bg-gray-50 border border-gray-500/5 text-blue-600 text-[10px] font-bold uppercase`}>
                                            {entry.strongs}
                                        </div>
                                        <div className="text-[10px] font-bold text-gray-900/20 uppercase group-hover:text-gray-900 transition-colors italic">
                                            Usage Frequency: {entry.authorUsage}x
                                        </div>
                                    </div>
                                    <div className={`text-6xl font-bold text-gray-900 mb-4 tracking-tighter uppercase italic group-hover:text-blue-600 transition-colors ${author.language === 'hebrew' ? 'text-right' : ''}`} dir={author.language === 'hebrew' ? 'rtl' : 'ltr'}>
                                        {entry.word}
                                    </div>
                                    <div className="text-[11px] font-bold text-gray-900/40 uppercase tracking-[0.2em] mb-6 italic">
                                        {entry.transliteration}
                                    </div>
                                    <p className="text-gray-900/60 font-medium leading-relaxed text-base mb-12 italic border-l-2 border-gray-50 pl-6">
                                        {entry.definitions?.strongs?.split(';')[0] || 'Uncovering deep theological insights...'}
                                    </p>
                                </div>
                                <div className={`flex items-center text-[10px] font-bold text-blue-600 uppercase opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0`}>
                                    Begin study <ArrowRightIcon className="w-4 h-4 ml-2" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* SCHOLARLY SUMMARY CTA */}
            <section className="py-40 relative px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className={`p-8 rounded-xl bg-white border border-gray-500/10 shadow-2xl inline-block mb-10`}>
                        <BookOpenIcon className={`w-12 h-12 text-blue-600`} />
                    </div>
                    <h3 className="text-4xl md:text-6xl font-bold text-gray-900 mb-10 tracking-tighter uppercase italic">Scholarly <span className="text-gray-500/40 not-italic font-light">Focus.</span></h3>
                    <p className="text-xl text-gray-900/60 mb-16 max-w-2xl mx-auto font-medium leading-relaxed italic border-l-4 border-gray-50 pl-8">
                        "While the frequency of a word is measurable, the **scriptural context** defines the soul of the apostolic message."
                    </p>
                    <Link href="/lexicon" className="px-12 py-6 bg-gray-900 text-white rounded-xl text-[10px] font-bold uppercase shadow-2xl hover:bg-gray-500 transition-all inline-flex items-center group">
                        <span>Explore Lexicon Hub</span>
                        <ArrowRightIcon className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
