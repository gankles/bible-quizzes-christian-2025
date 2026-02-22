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
import { getWordStudyByStrongs } from '@/lib/word-studies-enhanced'
import {
    BookOpenIcon
} from '@/components/icons'

interface LexiconPageProps {
    params: Promise<{
        strongs: string
    }>
}

export async function generateMetadata({ params }: LexiconPageProps): Promise<Metadata> {
    const { strongs } = await params
    const entry = await getLexiconEntry(strongs)
    if (!entry) return { title: 'Word Study Not Found' }

    return generateLexiconMetadata(entry)
}

export async function generateStaticParams() {
    // 27K+ pages — generated on-demand via ISR, not at build time
    return []
}

export default async function LexiconDetailPage({ params }: LexiconPageProps) {
    const { strongs } = await params
    const entry = await getLexiconEntry(strongs)

    if (!entry) {
        notFound()
    }

    const schema = generateLexiconSchema(entry)
    const wordStudy = getWordStudyByStrongs(strongs.toUpperCase())

    // Resolve cross-reference entries for enriched Related Words display
    const crossRefEntries = await Promise.all(
        (entry.synergy?.crossReferences || []).slice(0, 15).map(async (ref: string) => {
            const e = await getLexiconEntry(ref)
            return e
                ? { strongs: ref, word: e.word, transliteration: e.transliteration }
                : { strongs: ref, word: '', transliteration: '' }
        })
    )

    return (
        <div className="min-h-screen bg-primary-light/30">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            {/* HERO */}
            <div className="bg-white border-b border-grace py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <nav className="flex items-center gap-2 text-sm text-primary-dark/60 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/lexicon" className="hover:text-blue-600 transition-colors">Lexicon</Link>
                        <span>/</span>
                        <span className="text-scripture font-medium">{entry.strongs}</span>
                    </nav>

                    <div className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase mb-4">
                        <BookOpenIcon className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                        {entry.language} Word Study
                    </div>

                    <h1 className="text-3xl md:text-4xl font-display font-bold text-scripture mb-5 tracking-tight leading-tight">
                        The meaning of{' '}
                        <span className="text-blue-600">&ldquo;{entry.word}&rdquo;</span>
                    </h1>

                    <p className="text-xl text-primary-dark/70 italic max-w-2xl leading-relaxed">
                        Understanding <span className="text-scripture font-semibold">{entry.transliteration}</span> reveals the original theological depth often simplified in translation.
                    </p>

                    {/* Inline definition preview */}
                    {entry.definitions.strongs && (
                        <div className="mt-4 bg-white border border-grace rounded-lg p-4">
                            <span className="text-xs font-bold uppercase text-blue-600 tracking-wider">Definition</span>
                            <p className="text-base text-primary-dark/80 mt-1 leading-relaxed">
                                {entry.definitions.strongs.length > 120
                                    ? entry.definitions.strongs.slice(0, 120) + '...'
                                    : entry.definitions.strongs}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* CTA STRIP */}
            <div className="max-w-7xl mx-auto px-6 mt-[-1.5rem] relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {entry.stats?.mostFrequentBook && (
                        <div className="bg-blue-600 rounded-lg p-6 text-white shadow-lg flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-lg">Explore {entry.stats.mostFrequentBook} Quizzes</h3>
                                <p className="text-white/80 text-xs">Test your knowledge of the book where this word appears most</p>
                            </div>
                            <Link href={`/${entry.stats.mostFrequentBook.toLowerCase().replace(/\s+/g, '-')}-chapters`} className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase shrink-0">Explore</Link>
                        </div>
                    )}
                    <div className="bg-scripture rounded-lg p-6 text-white shadow-lg flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-lg">Full Lexicon Index</h3>
                            <p className="text-white/80 text-xs">Browse all {entry.language} word studies</p>
                        </div>
                        <Link href="/lexicon" className="bg-white text-scripture px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase shrink-0">Browse</Link>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-16">
                <div>

                    {/* INTERACTIVE LEXICON STUDY TOOL */}
                    <LexiconTool entry={entry} crossRefEntries={crossRefEntries} />

                    {/* THEOLOGICAL WORD STUDY */}
                    {wordStudy && (
                        <section className="mt-16 border border-grace rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-scripture mb-6">
                                Theological Word Study: {wordStudy.word.charAt(0).toUpperCase() + wordStudy.word.slice(1)}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {wordStudy.otNote && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-primary-dark/60 uppercase tracking-wider mb-3">Old Testament Usage</h3>
                                        {wordStudy.otTerm && (
                                            <div className="mb-3 flex items-baseline gap-3">
                                                <span className="text-2xl font-serif text-scripture">{wordStudy.otTerm}</span>
                                                {wordStudy.otTransliteration && (
                                                    <span className="text-sm italic text-primary-dark/60">{wordStudy.otTransliteration}</span>
                                                )}
                                            </div>
                                        )}
                                        {wordStudy.otMeaning && (
                                            <p className="text-sm text-primary-dark/70 mb-3">Meaning: {wordStudy.otMeaning}</p>
                                        )}
                                        <p className="text-primary-dark/80 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: wordStudy.otNote }} />
                                    </div>
                                )}
                                {wordStudy.ntNote && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-primary-dark/60 uppercase tracking-wider mb-3">New Testament Usage</h3>
                                        {wordStudy.ntTerm && (
                                            <div className="mb-3 flex items-baseline gap-3">
                                                <span className="text-2xl font-serif text-scripture">{wordStudy.ntTerm}</span>
                                                {wordStudy.ntTransliteration && (
                                                    <span className="text-sm italic text-primary-dark/60">{wordStudy.ntTransliteration}</span>
                                                )}
                                            </div>
                                        )}
                                        {wordStudy.ntMeaning && (
                                            <p className="text-sm text-primary-dark/70 mb-3">Meaning: {wordStudy.ntMeaning}</p>
                                        )}
                                        <p className="text-primary-dark/80 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: wordStudy.ntNote }} />
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* RELATED STUDIES */}
                    <section className="mt-12 bg-primary-light/30 border border-grace rounded-xl p-6">
                        <h2 className="text-lg font-bold text-scripture mb-3">Related Resources</h2>
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
                    </section>
                </div>
            </main>
        </div>
    )
}
