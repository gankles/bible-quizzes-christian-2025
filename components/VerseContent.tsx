'use client';

import { useState, useEffect } from 'react';
import { VoiceSelector } from './VoiceSelector';
import {
    BookOpenIcon,
    SparklesIcon,
    FingerPrintIcon,
    BoltIcon,
    HeartIcon,
    ShieldCheckIcon,
    ArrowRightIcon
} from '@/components/icons';

type Voice = 'scholarly' | 'devotional' | 'practical';

interface VerseContentProps {
    verseKey: string;
    generatedContent: any;
}

export function VerseContent({ verseKey, generatedContent }: VerseContentProps) {
    const [selectedVoice, setSelectedVoice] = useState<Voice>('devotional');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedVoice = localStorage.getItem('preferredVoice') as Voice;
        if (savedVoice && ['scholarly', 'devotional', 'practical'].includes(savedVoice)) {
            setSelectedVoice(savedVoice);
        }
    }, []);

    const handleVoiceChange = (voice: Voice) => {
        setSelectedVoice(voice);
        localStorage.setItem('preferredVoice', voice);
    };

    if (!generatedContent) {
        return (
            <div className="p-12 rounded-[48px] border border-gray-500/10 bg-white text-center shadow-xl">
                <p className="text-gray-900/40 font-medium italic">
                    "Scriptural study currently preparing... Accessing manuscript records."
                </p>
            </div>
        );
    }

    const content = generatedContent[selectedVoice];

    if (!isMounted) {
        return (
            <div className="space-y-12">
                <div className="h-14 w-full bg-white/5 animate-pulse rounded-full" />
                <div className="h-[400px] w-full bg-white/5 animate-pulse rounded-[64px]" />
            </div>
        );
    }

    if (!content) return null;

    const accentColor =
        selectedVoice === 'scholarly' ? 'indigo' :
            selectedVoice === 'devotional' ? 'rose' : 'emerald';

    return (
        <div className="space-y-16">
            {/* RESOLUTION SELECTOR */}
            <div className="flex justify-center">
                <VoiceSelector
                    selectedVoice={selectedVoice}
                    onChange={handleVoiceChange}
                />
            </div>

            <div role="status" className="sr-only">
                {selectedVoice === 'scholarly' && 'Showing scholarly scriptural analysis'}
                {selectedVoice === 'devotional' && 'Showing devotional reflection focus'}
                {selectedVoice === 'practical' && 'Showing practical application guidance'}
            </div>

            {/* RESOLUTION PANEL */}
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* 1. SCHOLARLY INSIGHT */}
                {selectedVoice === 'scholarly' && (
                    <div className="space-y-16">
                        {/* THEOLOGICAL CONTEXT */}
                        {content.context && (
                            <div className="p-12 md:p-20 rounded-[64px] border border-gray-500/10 bg-white shadow-3xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -z-10" />
                                <div className="flex items-center space-x-4 mb-10">
                                    <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center text-blue-600 shadow-xl">
                                        <BookOpenIcon className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-bold tracking-tighter uppercase italic">Historical <span className="text-gray-500/40 not-italic font-light">Focus.</span></h2>
                                </div>
                                <p className="text-xl text-gray-900/60 leading-[1.8] font-medium italic border-l-4 border-blue-600/30 pl-10">
                                    {content.context}
                                </p>
                            </div>
                        )}

                        {/* WORD ANALYSIS TABLE */}
                        {content.textualAnalysis && content.textualAnalysis.length > 0 && (
                            <div className="rounded-[64px] border border-gray-500/10 bg-white shadow-3xl overflow-hidden">
                                <div className="p-12 border-b border-gray-500/10 bg-gray-50/30">
                                    <div className="flex items-center space-x-4">
                                        <FingerPrintIcon className="w-8 h-8 text-blue-600" />
                                        <h2 className="text-3xl font-bold tracking-tighter uppercase italic">Scholarly <span className="text-gray-500/40 not-italic font-light">Terms.</span></h2>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-500/10">
                                                <th className="px-12 py-8 text-[11px] font-bold text-gray-500 uppercase italic">Manuscript Term</th>
                                                <th className="px-12 py-8 text-[11px] font-bold text-gray-500 uppercase italic">Source Origin</th>
                                                <th className="px-12 py-8 text-[11px] font-bold text-gray-500 uppercase italic">Linguistic Meaning</th>
                                                <th className="px-12 py-8 text-[11px] font-bold text-gray-500 uppercase italic">Theological Weight</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-500/5">
                                            {content.textualAnalysis.map((word: any, index: number) => (
                                                <tr key={index} className="group hover:bg-gray-50/20 transition-all">
                                                    <td className="px-12 py-10">
                                                        <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase italic">
                                                            {word.phrase || word.originalWord}
                                                        </span>
                                                    </td>
                                                    <td className="px-12 py-10">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-blue-600 italic">{word.originalWord}</span>
                                                            <span className="text-[10px] text-gray-900/40 uppercase mt-1">({word.transliteration})</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-12 py-10">
                                                        <p className="text-sm text-gray-900/60 leading-relaxed max-w-xs font-medium italic">
                                                            {word.definition}
                                                        </p>
                                                    </td>
                                                    <td className="px-12 py-10">
                                                        <p className="text-sm text-gray-900/60 leading-relaxed font-medium italic">
                                                            {word.significance || word.analysis}
                                                        </p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* CROSS REFERENCES */}
                        {content.crossReferences && content.crossReferences.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {content.crossReferences.map((ref: any, index: number) => (
                                    <div key={index} className="p-10 rounded-[48px] border border-gray-500/10 bg-white group hover:shadow-2xl transition-all">
                                        <div className="flex items-center justify-between mb-8">
                                            <span className="px-4 py-1.5 rounded-lg bg-gray-900 text-blue-600 text-[10px] font-bold uppercase shadow-xl">
                                                {ref.reference || ref.verse}
                                            </span>
                                            <BoltIcon className="w-5 h-5 text-blue-600 group-hover:rotate-12 transition-transform" />
                                        </div>
                                        <p className="text-lg text-gray-900/60 font-medium leading-relaxed italic border-l-2 border-gray-50 pl-8">
                                            {ref.explanation || ref.connection}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* 2. DEVOTIONAL FOCUS */}
                {selectedVoice === 'devotional' && (
                    <div className="space-y-16">
                        {/* OPENING MEDITATION */}
                        {content.opening && (
                            <div className="p-12 md:p-24 rounded-[80px] border border-gray-500/10 bg-white text-center relative overflow-hidden shadow-3xl">
                                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/5 blur-[100px] -z-10" />
                                <HeartIcon className="w-16 h-16 text-blue-600/30 mx-auto mb-12 animate-pulse" />
                                <p className="text-3xl md:text-4xl text-gray-900 leading-[1.6] font-bold italic tracking-tight uppercase">
                                    "{content.opening}"
                                </p>
                            </div>
                        )}

                        {/* THEMATIC REFLECTIONS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {content.reflections?.map((reflection: any, index: number) => (
                                <div key={index} className="p-12 rounded-[56px] border border-gray-500/10 bg-white hover:border-blue-600/20 transition-all group">
                                    <div className="flex items-center space-x-4 mb-10">
                                        <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xl">
                                            <SparklesIcon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl font-bold tracking-tighter group-hover:text-blue-600 transition-colors uppercase italic">{reflection.theme}</h3>
                                    </div>
                                    <p className="text-lg text-gray-900/60 leading-relaxed font-medium mb-10 italic">
                                        {reflection.content}
                                    </p>
                                    {reflection.personalApplication && (
                                        <div className="p-8 rounded-[32px] bg-gray-50/50 border border-gray-500/5 italic text-gray-500 font-medium">
                                            <span className="text-[10px] font-bold uppercase block mb-1 opacity-60">Reflection Pulse</span>
                                            "{reflection.personalApplication}"
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* SCRIPTURAL RESPONSE CARD */}
                        {content.prayerPrompt && (
                            <div className="p-16 rounded-[64px] border border-gray-500/10 bg-gray-50/30 shadow-3xl text-center">
                                <h3 className="text-xl font-bold text-blue-600 uppercase tracking-[0.4em] mb-12 italic">Scriptural Response Guidance</h3>
                                <p className="text-2xl md:text-3xl text-gray-900/60 leading-relaxed italic px-12">
                                    "{content.prayerPrompt}"
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* 3. PRACTICAL APPLICATION */}
                {selectedVoice === 'practical' && (
                    <div className="space-y-16">
                        {/* APPLICATION Q&A */}
                        <div className="rounded-[64px] border border-gray-500/10 bg-white shadow-3xl overflow-hidden">
                            <div className="p-12 border-b border-gray-500/10 bg-gray-50/30">
                                <div className="flex items-center space-x-4">
                                    <BoltIcon className="w-8 h-8 text-blue-600" />
                                    <h2 className="text-3xl font-bold tracking-tighter uppercase italic">Scriptural <span className="text-gray-500/40 not-italic font-light">Application.</span></h2>
                                </div>
                            </div>
                            <div className="p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                                {content.keyQuestions?.map((q: any, index: number) => (
                                    <div key={index} className="p-10 rounded-[48px] border border-gray-500/5 bg-gray-50/20">
                                        <h3 className="text-xl font-bold text-blue-600 mb-6 italic tracking-tight uppercase">Q: {q.question}</h3>
                                        <p className="text-lg text-gray-900/60 font-medium leading-relaxed mb-8 italic">
                                            <span className="text-gray-900 font-bold mr-2 not-italic">A:</span> {q.answer}
                                        </p>
                                        {q.application && (
                                            <div className="pt-6 border-t border-gray-500/10 text-gray-500 text-sm font-medium italic">
                                                <span className="text-[10px] font-bold uppercase block mb-1 opacity-60">Practical Step</span>
                                                {q.application}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* NEXT STEPS */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {content.nextSteps?.map((step: any, index: number) => (
                                <div key={index} className="p-10 rounded-[48px] border border-gray-500/10 bg-white flex flex-col items-center text-center group hover:shadow-2xl transition-all">
                                    <div className="w-16 h-16 rounded-xl bg-gray-900 text-blue-600 flex items-center justify-center font-bold text-2xl mb-8 shadow-2xl group-hover:scale-110 transition-transform">
                                        {step.step || index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight uppercase italic">{step.title}</h3>
                                    <p className="text-gray-900/60 font-medium leading-relaxed italic">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
