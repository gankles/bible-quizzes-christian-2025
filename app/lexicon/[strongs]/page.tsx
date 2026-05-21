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

export const revalidate = 86400 // 24 hours

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
            <div className="bg-white border-b border-grace">
                <div className="max-w-[900px] mx-auto px-6 py-12">
                    {/* Breadcrumbs */}
                    <nav className="mb-8">
                        <ol className="editorial-breadcrumbs">
                            <li><Link href="/" className="hover:text-sacred transition-colors">Home</Link></li>
                            <li>/</li>
                            <li><Link href="/lexicon" className="hover:text-sacred transition-colors">Lexicon</Link></li>
                            <li>/</li>
                            <li className="text-scripture font-medium">{entry.strongs}</li>
                        </ol>
                    </nav>

                    {/* meta-eyebrow */}
                    <span className="meta-eyebrow">{entry.language} Word Study</span>

                    {/* lexicon-word-header: word info left, large script right */}
                    <div className="lexicon-word-header">
                        <div>
                            <h1 className="editorial-h1" style={{marginBottom:'0.5rem'}}>
                                {entry.transliteration} ({entry.strongs})
                            </h1>
                            <p className="font-sans text-base text-sacred font-bold">
                                {entry.partOfSpeech || entry.language}
                            </p>
                        </div>
                        <div className="lexicon-greek-hebrew">{entry.word}</div>
                    </div>

                    {/* Definition preview */}
                    {entry.definitions.strongs && (
                        <p className="editorial-deck">
                            {entry.definitions.strongs.length > 160
                                ? entry.definitions.strongs.slice(0, 160) + '...'
                                : entry.definitions.strongs}
                        </p>
                    )}
                </div>
            </div>

            {/* CTA STRIP */}
            <div className="max-w-7xl mx-auto px-6 mt-[-1.5rem] relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {entry.stats?.mostFrequentBook && (
                        <div className="bg-scripture rounded-lg p-6 text-primary-light shadow-lg flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-lg">Explore {entry.stats.mostFrequentBook} Quizzes</h3>
                                <p className="text-primary-light/80 text-xs">Test your knowledge of the book where this word appears most</p>
                            </div>
                            <Link href={`/${entry.stats.mostFrequentBook.toLowerCase().replace(/\s+/g, '-')}-chapters`} className="bg-primary-light text-scripture px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase shrink-0">Explore</Link>
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

                    {/* SUMMARY GRID */}
                    <div className="lexicon-summary-grid">
                        <div className="lexicon-data-card">
                            <h3 className="font-display text-xl font-bold text-scripture mb-4">Transliteration &amp; Phonetics</h3>
                            {entry.transliteration && (
                                <div className="lexicon-data-row">
                                    <span className="lexicon-data-label">Transliteration</span>
                                    <span className="lexicon-data-value">{entry.transliteration}</span>
                                </div>
                            )}
                            {entry.pronunciation && (
                                <div className="lexicon-data-row">
                                    <span className="lexicon-data-label">Pronunciation</span>
                                    <span className="lexicon-data-value">{entry.pronunciation}</span>
                                </div>
                            )}
                            {entry.partOfSpeech && (
                                <div className="lexicon-data-row">
                                    <span className="lexicon-data-label">Part of Speech</span>
                                    <span className="lexicon-data-value">{entry.partOfSpeech}</span>
                                </div>
                            )}
                            {entry.language && (
                                <div className="lexicon-data-row">
                                    <span className="lexicon-data-label">Language</span>
                                    <span className="lexicon-data-value">{entry.language}</span>
                                </div>
                            )}
                        </div>
                        <div className="lexicon-data-card">
                            <h3 className="font-display text-xl font-bold text-scripture mb-4">Usage Statistics</h3>
                            {entry.stats?.totalOccurrences && (
                                <div className="lexicon-data-row">
                                    <span className="lexicon-data-label">KJV Occurrences</span>
                                    <span className="lexicon-data-value">{entry.stats.totalOccurrences}</span>
                                </div>
                            )}
                            {entry.stats?.mostFrequentBook && (
                                <div className="lexicon-data-row">
                                    <span className="lexicon-data-label">Most Common In</span>
                                    <span className="lexicon-data-value">{entry.stats.mostFrequentBook}</span>
                                </div>
                            )}
                            {crossRefEntries?.length > 0 && (
                                <div className="lexicon-data-row">
                                    <span className="lexicon-data-label">Related Words</span>
                                    <span className="lexicon-data-value">{crossRefEntries.length} entries</span>
                                </div>
                            )}
                        </div>
                    </div>

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
                                        <h3 className="text-sm font-semibold text-ink-muted uppercase tracking-wider mb-3">Old Testament Usage</h3>
                                        {wordStudy.otTerm && (
                                            <div className="mb-3 flex items-baseline gap-3">
                                                <span className="text-2xl font-serif text-scripture">{wordStudy.otTerm}</span>
                                                {wordStudy.otTransliteration && (
                                                    <span className="text-sm italic text-ink-muted">{wordStudy.otTransliteration}</span>
                                                )}
                                            </div>
                                        )}
                                        {wordStudy.otMeaning && (
                                            <p className="text-sm text-ink-muted mb-3">Meaning: {wordStudy.otMeaning}</p>
                                        )}
                                        <p className="text-scripture leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: wordStudy.otNote }} />
                                    </div>
                                )}
                                {wordStudy.ntNote && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-ink-muted uppercase tracking-wider mb-3">New Testament Usage</h3>
                                        {wordStudy.ntTerm && (
                                            <div className="mb-3 flex items-baseline gap-3">
                                                <span className="text-2xl font-serif text-scripture">{wordStudy.ntTerm}</span>
                                                {wordStudy.ntTransliteration && (
                                                    <span className="text-sm italic text-ink-muted">{wordStudy.ntTransliteration}</span>
                                                )}
                                            </div>
                                        )}
                                        {wordStudy.ntMeaning && (
                                            <p className="text-sm text-ink-muted mb-3">Meaning: {wordStudy.ntMeaning}</p>
                                        )}
                                        <p className="text-scripture leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: wordStudy.ntNote }} />
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* RELATED STUDIES */}
                    <section className="mt-12 bg-primary-light/30 border border-grace rounded-xl p-6">
                        <h2 className="text-lg font-bold text-scripture mb-3">Related Resources</h2>
                        <div className="grid gap-2 sm:grid-cols-2">
                            <Link href="/lexicon" className="text-sacred hover:text-gold-dark hover:underline text-sm">Full Lexicon Index</Link>
                            <Link href="/lexicon/browse/greek" className="text-sacred hover:text-gold-dark hover:underline text-sm">Greek Lexicon</Link>
                            <Link href="/lexicon/browse/hebrew" className="text-sacred hover:text-gold-dark hover:underline text-sm">Hebrew Lexicon</Link>
                            <Link href="/bible-quizzes" className="text-sacred hover:text-gold-dark hover:underline text-sm">Bible Quizzes</Link>
                            <Link href="/nave-topics" className="text-sacred hover:text-gold-dark hover:underline text-sm">Nave&apos;s Topical Bible</Link>
                            <Link href="/people" className="text-sacred hover:text-gold-dark hover:underline text-sm">Bible People Directory</Link>
                            <Link href="/bible-names" className="text-sacred hover:text-gold-dark hover:underline text-sm">Bible Name Meanings</Link>
                            <Link href="/commandments" className="text-sacred hover:text-gold-dark hover:underline text-sm">613 Commandments</Link>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}
