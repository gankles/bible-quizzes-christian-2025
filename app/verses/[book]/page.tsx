import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getVerseCombination } from '@/lib/database/queries'
import {
    AcademicCapIcon,
    BoltIcon,
    SparklesIcon,
    BarChartIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    BookOpenIcon
} from '@/components/icons'
import CombinationQuizWrapper from '@/components/CombinationQuizWrapper'
import { generateVerseCombinationSchema } from '@/lib/seo/schema-generator'
import { getBookBySlug } from "@/lib/bibleData";
import Link from 'next/link'

interface Props {
    params: {
        book: string
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { book: slug } = params;

    // Check if it's a combination
    if (slug.includes('-and-')) {
        const parts = slug.split('-and-')
        const data = await getVerseCombination(parts[0], parts[1])
        if (data) {
            return {
                title: `${data.verse1.bookName} ${data.verse1.chapter}:${data.verse1.verse} and ${data.verse2.bookName} ${data.verse2.chapter}:${data.verse2.verse} Synergy`,
                description: `Deep theological comparison between ${data.verse1.bookName} and ${data.verse2.bookName}.`,
                alternates: { canonical: `/verses/${slug}` },
            }
        }
    }

    // Check if it's a book
    const bookData = getBookBySlug(slug);
    if (bookData) {
        return {
            title: `${bookData.name} - Study & Analysis Hub | Bible Maximum`,
            description: `Complete study guide for the Book of ${bookData.name}. Featuring high-resolution chapter mappings and scholarly analysis.`,
            alternates: { canonical: `/verses/${slug}` },
        }
    }

    return { title: 'Scriptural Resolution' }
}

export default async function ScripturalSlugPage({ params }: Props) {
    const { book: slug } = params;

    // SCENARIO 1: SCRIPTURE SYNERGY (COMBINATION)
    if (slug.includes('-and-')) {
        const parts = slug.split('-and-')
        const data = await getVerseCombination(parts[0], parts[1])
        if (!data) notFound()

        const { verse1, verse2 } = data

        return (
            <div className="bg-[#FAFAF9] pb-32 min-h-screen">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(generateVerseCombinationSchema(data)) }}
                />

                {/* SCHOLAR'S NAVIGATION */}
                <div className="bg-primary-light/30 border-b border-grace/50 ">
                    <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/bible-quizzes" className="group flex items-center text-primary-dark/60 hover:text-blue-600 transition-all text-[10px] font-bold uppercase">
                                <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                <span>Return to Study Library</span>
                            </Link>
                            <span className="w-px h-4 bg-grace/30" />
                            <span className="text-[10px] font-bold uppercase text-scripture/40">
                                Scriptural Synergy
                            </span>
                        </div>
                    </div>
                </div>

                {/* HERO: SYNERGY SCAN */}
                <section className="relative py-24 overflow-hidden border-b border-grace/50 bg-white">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/felt-paper.png')] opacity-10" />
                    <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                        <div className="inline-flex items-center space-x-3 px-6 py-1.5 rounded-lg border border-grace bg-primary-light/30 text-primary-dark/60 text-[10px] font-bold uppercase  mb-12 shadow-sm">
                            <SparklesIcon className="w-4 h-4" />
                            <span>Scriptural Comparison</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-scripture mb-8 tracking-tighter leading-tight uppercase italic">
                            {verse1.bookName} {verse1.chapter}:{verse1.verse} <span className="text-blue-600 not-italic font-light">&</span> {verse2.bookName} {verse2.chapter}:{verse2.verse}
                        </h1>
                        <p className="text-xl text-scripture/40 font-medium max-w-3xl mx-auto mb-16 leading-relaxed italic">
                            Exploring the theological intersection between two powerful scriptural passages.
                            Uncovering the harmony of truth.
                        </p>
                    </div>
                </section>

                {/* SIDE-BY-SIDE: THE SYMMETRY CARDS */}
                <section className="py-24 max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
                        <div className="group p-12 md:p-16 rounded-xl border border-grace/50 bg-white shadow-xl relative overflow-hidden transition-all duration-700 hover:-translate-y-1">
                            <div className="text-[10px] font-bold text-primary-dark/60 uppercase  mb-10">Passage I: {verse1.bookName}</div>
                            <p className="text-2xl md:text-3xl font-bold text-scripture leading-[1.4] italic uppercase border-l-4 border-grace/50 group-hover:border-blue-600 transition-colors pl-10">
                                "{verse1.text}"
                            </p>
                            <div className="mt-12 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-scripture/20 uppercase">{verse1.translation} Standard</span>
                                <Link href={`/verses/${verse1.book}/${verse1.chapter}/${verse1.verse}`} className="text-[10px] font-bold text-blue-600 uppercase opacity-0 group-hover:opacity-100 transition-all flex items-center">
                                    Full Study <ArrowRightIcon className="w-4 h-4 ml-2" />
                                </Link>
                            </div>
                        </div>

                        <div className="group p-12 md:p-16 rounded-xl border border-grace/50 bg-white shadow-xl relative overflow-hidden transition-all duration-700 hover:-translate-y-1">
                            <div className="text-[10px] font-bold text-primary-dark/60 uppercase  mb-10">Passage II: {verse2.bookName}</div>
                            <p className="text-2xl md:text-3xl font-bold text-scripture leading-[1.4] italic uppercase border-l-4 border-grace/50 group-hover:border-blue-600 transition-colors pl-10">
                                "{verse2.text}"
                            </p>
                            <div className="mt-12 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-scripture/20 uppercase">{verse2.translation} Standard</span>
                                <Link href={`/verses/${verse2.book}/${verse2.chapter}/${verse2.verse}`} className="text-[10px] font-bold text-blue-600 uppercase opacity-0 group-hover:opacity-100 transition-all flex items-center">
                                    Full Study <ArrowRightIcon className="w-4 h-4 ml-2" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-8">
                            <div className="p-12 md:p-20 rounded-[48px] bg-scripture text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/felt-paper.png')] opacity-10" />
                                <div className="flex items-center space-x-6 mb-12">
                                    <div className="w-16 h-16 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-2xl group-hover:rotate-12 transition-transform">
                                        <AcademicCapIcon className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-4xl font-bold tracking-tighter uppercase italic">Scholarly <span className="text-blue-600/30 not-italic font-light">Insight.</span></h2>
                                </div>
                                <p className="text-2xl text-white/50 leading-[1.8] font-medium italic border-l-4 border-blue-600 pl-12">
                                    "When we hold these two scriptures together, we see a beautiful tapestry of God's character. While {verse1.bookName} {verse1.chapter}:{verse1.verse} provides the 'What' of our faith, {verse2.bookName} {verse2.chapter}:{verse2.verse} provides the 'How'. It's not just that God loves us; it's that His love is active, restorative, and sufficient for every trial."
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-4">
                            <div className="p-12 rounded-xl bg-white border border-grace/50 shadow-xl">
                                <h3 className="text-xl font-bold mb-8 uppercase text-blue-600 italic">Study Metadata</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b border-grace/50 pb-4">
                                        <span className="text-scripture/30 font-bold uppercase text-[10px]">Contextual Parity</span>
                                        <span className="text-scripture font-bold">Scholarly</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-grace/50 pb-4">
                                        <span className="text-scripture/30 font-bold uppercase text-[10px]">Theological Depth</span>
                                        <span className="text-blue-600 font-bold italic">Foundational</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    // SCENARIO 2: BOOK HUB (INDIVIDUAL BOOK)
    const bookData = getBookBySlug(slug);
    if (bookData) {
        return (
            <div className="bg-[#FAFAF9] pb-32 min-h-screen">
                {/* SCHOLAR'S NAVIGATION */}
                <div className="bg-primary-light/30 border-b border-grace/50 ">
                    <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/bible-quizzes" className="group flex items-center text-primary-dark/60 hover:text-blue-600 transition-all text-[10px] font-bold uppercase">
                                <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                <span>Return to Library</span>
                            </Link>
                            <span className="w-px h-4 bg-grace/30" />
                            <span className="text-[10px] font-bold uppercase text-scripture">
                                {bookData.name} Study Hub
                            </span>
                        </div>
                    </div>
                </div>

                {/* HERO: BOOK STUDY */}
                <section className="relative py-24 overflow-hidden border-b border-grace/50 bg-white">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/felt-paper.png')] opacity-10" />
                    <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                        <div className="inline-flex items-center space-x-3 px-6 py-1.5 rounded-lg border border-grace bg-primary-light/30 text-primary-dark/60 text-[10px] font-bold uppercase  mb-12 shadow-sm">
                            <SparklesIcon className="w-4 h-4" />
                            <span>Scriptural Study: {bookData.name}</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-bold text-scripture mb-8 tracking-tighter leading-tight uppercase italic">
                            The Book of <span className="text-blue-600 not-italic font-light">{bookData.name}</span>
                        </h1>
                        <p className="text-xl text-scripture/40 font-medium uppercase  mb-16 italic">
                            {bookData.testament} Testament • Canonical Study
                        </p>
                    </div>
                </section>

                {/* CHAPTER GRID */}
                <main className="max-w-7xl mx-auto px-6 py-24">
                    <div className="flex items-center justify-between mb-16">
                        <h2 className="text-4xl font-bold text-scripture tracking-tight uppercase italic">Navigate <span className="text-blue-600/30 not-italic font-light text-3xl">Chapters.</span></h2>
                        <span className="text-[10px] font-bold text-scripture/30 uppercase">
                            {bookData.chapters} Chapters
                        </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                        {Array.from({ length: bookData.chapters }, (_, i) => i + 1).map((chapterNum) => (
                            <Link
                                key={chapterNum}
                                href={`/verses/${slug}/${chapterNum}`}
                                className="group aspect-square flex flex-col items-center justify-center rounded-lg border border-grace/50 bg-white hover:bg-scripture hover:border-scripture transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl shadow-lg"
                            >
                                <span className="text-[9px] font-bold text-primary-dark/60 uppercase mb-1 group-hover:text-blue-600">CH</span>
                                <span className="text-3xl font-bold text-scripture group-hover:text-white transition-colors">{chapterNum}</span>
                            </Link>
                        ))}
                    </div>
                </main>
            </div>
        )
    }

    notFound()
}
