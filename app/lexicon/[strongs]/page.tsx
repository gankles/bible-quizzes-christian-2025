import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
    getLexiconEntry,
    getAllLexiconEntries
} from '@/lib/database/queries'
import { generateLexiconMetadata } from '@/lib/seo/metadata-generator'
import { generateLexiconSchema } from '@/lib/seo/schema-generator'
import LexiconTool from '@/components/LexiconTool'
import {
    ChevronLeftIcon,
    SparklesIcon,
    HeartIcon,
    BookOpenIcon,
    SearchIcon,
    ArrowRightIcon,
    BoltIcon,
    FingerPrintIcon
} from '@/components/icons'

interface LexiconPageProps {
    params: {
        strongs: string
    }
}

export async function generateMetadata({ params }: LexiconPageProps): Promise<Metadata> {
    const entry = await getLexiconEntry(params.strongs)
    if (!entry) return { title: 'Word Study Not Found' }

    return generateLexiconMetadata(entry)
}

export async function generateStaticParams() {
    // 27K+ pages — generated on-demand via ISR, not at build time
    return []
}

export default async function LexiconDetailPage({ params }: LexiconPageProps) {
    const entry = await getLexiconEntry(params.strongs)

    if (!entry) {
        notFound()
    }

    const schema = generateLexiconSchema(entry)

    return (
        <div className="bg-white min-h-screen pb-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            {/* BREADCRUMBS */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <ChevronLeftIcon className="w-3 h-3 rotate-180 text-gray-300" />
                        <Link href="/lexicon" className="hover:text-blue-600 transition-colors">Lexicon</Link>
                        <ChevronLeftIcon className="w-3 h-3 rotate-180 text-gray-300" />
                        <span className="text-gray-900 font-semibold">{entry.strongs}</span>
                    </div>
                </div>
            </div>

            <main className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* HERO */}
                    <div className="max-w-4xl mb-20">
                        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-8">
                            <BookOpenIcon className="w-4 h-4" />
                            <span>Word Study</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight leading-tight">
                            The meaning of{' '}
                            <span className="text-blue-600">&ldquo;{entry.word}&rdquo;</span>
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl border-l-2 border-gray-200 pl-6">
                            Understanding <span className="text-gray-900 font-semibold">{entry.transliteration}</span> reveals the original theological depth often simplified in translation.
                        </p>
                    </div>

                    {/* INTERACTIVE LEXICON STUDY TOOL */}
                    <LexiconTool entry={entry} />

                    {/* RELATED STUDIES */}
                    <div className="mt-24">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                            <div>
                                <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold text-sm mb-4">
                                    <FingerPrintIcon className="w-4 h-4" />
                                    <span>Continue Studying</span>
                                </div>
                                <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Expand Your Study</h2>
                            </div>
                            <Link href="/lexicon" className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-blue-700 transition-colors flex items-center group">
                                <span>Full Lexicon Index</span>
                                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                            <div className="grid gap-2 sm:grid-cols-2">
                                <Link href="/lexicon" className="text-blue-600 hover:underline text-sm">Full Lexicon Index</Link>
                                <Link href="/lexicon/browse/greek" className="text-blue-600 hover:underline text-sm">Greek Lexicon</Link>
                                <Link href="/lexicon/browse/hebrew" className="text-blue-600 hover:underline text-sm">Hebrew Lexicon</Link>
                                <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">Bible Quizzes</Link>
                                <Link href="/nave-topics" className="text-blue-600 hover:underline text-sm">Nave&apos;s Topical Bible</Link>
                                <Link href="/people" className="text-blue-600 hover:underline text-sm">Bible People Directory</Link>
                                <Link href="/bible-names" className="text-blue-600 hover:underline text-sm">Bible Name Meanings</Link>
                                <Link href="/commandments" className="text-blue-600 hover:underline text-sm">613 Commandments</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
