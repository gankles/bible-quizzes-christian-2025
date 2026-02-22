import Link from 'next/link';
import { SparklesIcon, ArrowRightIcon } from '@/components/icons';

interface VocabEntry {
    strongs: string;
    word: string;
    transliteration: string;
    authorUsage: number;
    definitions: any;
}

interface AuthorVocabularyFrequencyProps {
    vocab: VocabEntry[];
    authorName: string;
    language: string;
}

export default function AuthorVocabularyFrequency({ vocab, authorName, language }: AuthorVocabularyFrequencyProps) {
    if (vocab.length === 0) return null;

    const maxUsage = Math.max(...vocab.map(v => v.authorUsage));
    const mainColor = language === 'greek' ? 'indigo' : 'rose';

    return (
        <div className="relative group">
            {/* HEATMAP GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                {vocab.map((entry) => {
                    // Calculate intensity (0.1 to 1.0)
                    const intensity = entry.authorUsage / maxUsage;

                    return (
                        <Link
                            key={entry.strongs}
                            href={`/lexicon/${entry.strongs}`}
                            className="group/card relative flex flex-col items-center justify-center p-10 rounded-[40px] border border-white bg-white/40 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden text-center"
                        >
                            {/* INTENSITY OVERLAY */}
                            <div
                                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
                                style={{
                                    backgroundColor: '#2563EB',
                                    opacity: 0.05 + (intensity * 0.4)
                                }}
                            />

                            <div className="relative z-10">
                                <div className={`text-5xl font-bold mb-4 tracking-tighter text-scripture group-hover/card:text-blue-600 transition-colors ${language === 'hebrew' ? 'text-right' : ''}`} dir={language === 'hebrew' ? 'rtl' : 'ltr'}>
                                    {entry.word}
                                </div>
                                <div className="text-[10px] font-bold text-scripture/40 uppercase tracking-[0.2em] mb-2 italic">
                                    {entry.strongs}
                                </div>
                                <div className={`inline-flex items-center px-3 py-1 rounded-lg bg-primary-light/30 text-primary-dark/60 text-[9px] font-bold uppercase border border-primary-dark/5`}>
                                    {entry.authorUsage}x Frequency
                                </div>
                            </div>

                            {/* HOVER DETAILS: SCHOLARLY TOOLTIP */}
                            <div className="absolute inset-x-2 bottom-2 top-2 opacity-0 group-hover/card:opacity-100 transition-all duration-500 transform translate-y-4 group-hover/card:translate-y-0 z-20">
                                <div className="h-full w-full rounded-[32px] bg-scripture p-6 flex flex-col items-center justify-center text-white shadow-3xl">
                                    <div className="text-blue-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 italic">
                                        Scholarly Review Active
                                    </div>
                                    <div className="text-sm font-bold uppercase text-white/60 mb-2 italic">
                                        {entry.transliteration}
                                    </div>
                                    <p className="text-[11px] leading-relaxed text-white/40 italic mb-6 line-clamp-3 px-2">
                                        "{entry.definitions?.strongs?.split(';')[0] || 'Begin full manuscript study...'}"
                                    </p>
                                    <div className="flex items-center text-[9px] font-bold uppercase text-blue-600">
                                        View Study <ArrowRightIcon className="w-3 h-3 ml-2" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* LEGEND: FREQUENCY SCALE */}
            <div className="mt-20 flex flex-wrap gap-12 items-center justify-center border-t border-primary-dark/10 pt-12">
                <div className="text-[10px] font-bold text-scripture/40 uppercase italic">Frequency Scale:</div>
                <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-lg bg-primary-light/30" />
                    <span className="text-[10px] font-bold text-scripture/40 uppercase italic">Occasional</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-lg opacity-40 bg-blue-600 shadow-lg`} />
                    <span className="text-[10px] font-bold text-scripture/40 uppercase italic">Moderate</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-lg bg-blue-600 shadow-xl`} />
                    <span className="text-[10px] font-bold text-scripture/40 uppercase italic">Dominant Theme</span>
                </div>
            </div>
        </div>
    );
}
