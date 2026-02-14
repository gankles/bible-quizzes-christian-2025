import { notFound } from "next/navigation";
import Link from "next/link";
import { getBookBySlug } from "@/lib/bibleData";
import { fetchChapter } from "@/lib/bibleApi";
import {
    SparklesIcon,
    BookOpenIcon,
    ArrowLeftIcon,
    BoltIcon,
    ArrowRightIcon,
    ChevronRightIcon
} from '@/components/icons';

interface ChapterPageProps {
    params: {
        book: string;
        chapter: string;
    };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
    const { book: slug, chapter } = params;
    const chapterNum = parseInt(chapter);
    const bookData = getBookBySlug(slug);

    if (!bookData || chapterNum < 1 || chapterNum > bookData.chapters) {
        notFound();
    }

    const verses = await fetchChapter(slug, chapterNum, "KJV");

    return (
        <div className="bg-gray-50 pb-32 min-h-screen selection:bg-amber-100 selection:text-amber-900">
            {/* SCHOLAR'S NAVIGATION */}
            <div className="bg-gray-50 border-b border-gray-500/10">
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/bible-quizzes" className="group flex items-center text-gray-500 hover:text-blue-600 transition-all text-[10px] font-bold uppercase">
                            <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            <span>Return to Library</span>
                        </Link>
                        <span className="w-px h-4 bg-gray-500/20" />
                        <div className="flex items-center space-x-2 text-[10px] font-bold uppercase text-gray-900/40">
                            <Link href={`/verses/${slug}`} className="hover:text-blue-600 transition-colors">{bookData.name}</Link>
                            <span>/</span>
                            <span className="text-gray-900">Chapter {chapter}</span>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-6 text-[10px] font-bold uppercase text-gray-900/40">
                        <span>Scholarly Chapter View</span>
                        <div className="w-1 h-1 bg-blue-600 rounded-full" />
                        <span className="text-gray-900">{verses.length} Active Verses</span>
                    </div>
                </div>
            </div>

            {/* HERO: CHAPTER STUDY */}
            <section className="relative py-24 overflow-hidden border-b border-gray-500/10 bg-white">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/felt-paper.png')] opacity-10" />
                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <div className="inline-flex items-center space-x-3 px-6 py-1.5 rounded-lg border border-gray-500/20 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase  mb-12 shadow-sm">
                        <SparklesIcon className="w-4 h-4" />
                        <span>Scriptural Study: {bookData.name}</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 tracking-tighter leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 uppercase italic">
                        Chapter <span className="text-blue-600 not-italic font-light">{chapter}</span>
                    </h1>
                    <p className="text-xl text-gray-900/40 font-medium uppercase  mb-16 italic">
                        {bookData.testament} Testament • Biblical Insight
                    </p>
                </div>
            </section>

            {/* VERSE SELECTION GRID */}
            <main className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {verses.length > 0 ? (
                        verses.map((v) => (
                            <Link
                                key={v.verse}
                                href={`/verses/${slug}/${chapter}/${v.verse}`}
                                className="group p-8 rounded-xl border border-gray-500/10 bg-white hover:bg-gray-900 hover:border-gray-900 shadow-xl hover:shadow-2xl transition-all duration-700 flex flex-col justify-between h-56 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 group-hover:bg-white/5 transition-colors -z-10 rounded-full -mr-12 -mt-12" />
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors uppercase italic">
                                        Verse {v.verse}
                                    </h3>
                                    <p className="text-sm text-gray-900/40 font-medium line-clamp-3 leading-relaxed italic pr-4">
                                        "{v.text}"
                                    </p>
                                </div>
                                <div className="flex items-center text-[10px] font-bold text-blue-600 uppercase opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                    Deep Study <ArrowRightIcon className="w-4 h-4 ml-3" />
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-40 text-center rounded-[64px] border-2 border-dashed border-gray-500/10 bg-white/30">
                            <div className="w-20 h-20 rounded-xl bg-gray-50 text-gray-500/40 flex items-center justify-center mx-auto mb-8">
                                <BookOpenIcon className="w-10 h-10" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight uppercase italic">Content Unavailable.</h3>
                            <p className="text-gray-900/40 font-medium italic mb-12 max-w-md mx-auto leading-relaxed">
                                "The requested scriptural records are currently being restored to our library."
                            </p>
                        </div>
                    )}
                </div>
            </main>

            {/* CHAPTER NAVIGATION: JUMP TO NEXT/PREV CHAPTER */}
            <section className="py-24 max-w-7xl mx-auto px-6 border-t border-gray-500/10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    {chapterNum > 1 ? (
                        <Link
                            href={`/verses/${slug}/${chapterNum - 1}`}
                            className="flex items-center gap-8 p-6 pr-10 rounded-xl border border-gray-500/10 bg-white hover:bg-gray-900 hover:text-white transition-all group shadow-lg hover:shadow-2xl"
                        >
                            <div className="w-14 h-14 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <ChevronRightIcon className="w-6 h-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase mb-1 group-hover:text-blue-600">Previous Chapter</div>
                                <div className="text-xl font-bold tracking-tight uppercase italic">Chapter {chapterNum - 1}</div>
                            </div>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-8 opacity-20 grayscale">
                            <div className="w-14 h-14 rounded-lg bg-gray-500/10 text-gray-500 flex items-center justify-center">
                                <ChevronRightIcon className="w-6 h-6 rotate-180" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Book Start</div>
                                <div className="text-xl font-bold tracking-tight">Origin</div>
                            </div>
                        </div>
                    )}

                    <Link href={`/bible-quizzes/${slug}`} className="px-12 py-6 bg-gray-900 text-white rounded-xl text-[10px] font-bold uppercase  shadow-2xl hover:bg-gray-500 transition-all">
                        Study Full Book
                    </Link>

                    {chapterNum < bookData.chapters ? (
                        <Link
                            href={`/verses/${slug}/${chapterNum + 1}`}
                            className="flex items-center gap-8 p-6 pl-10 rounded-xl border border-gray-500/10 bg-white hover:bg-gray-900 hover:text-white transition-all group shadow-lg hover:shadow-2xl"
                        >
                            <div className="text-right">
                                <div className="text-[10px] font-bold text-gray-500 uppercase mb-1 group-hover:text-blue-600">Next Chapter</div>
                                <div className="text-xl font-bold tracking-tight uppercase italic">Chapter {chapterNum + 1}</div>
                            </div>
                            <div className="w-14 h-14 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <ChevronRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-8 opacity-20 grayscale text-right">
                            <div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Book Conclusion</div>
                                <div className="text-xl font-bold tracking-tight">Terminal</div>
                            </div>
                            <div className="w-14 h-14 rounded-lg bg-gray-500/10 text-gray-500 flex items-center justify-center">
                                <ChevronRightIcon className="w-6 h-6" />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
