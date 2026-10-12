import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
    getLexiconEntry,
    getAllLexiconEntries
} from '@/lib/database/queries'
import { generateLexiconMetadata } from '@/lib/seo/metadata-generator'
import { generateLexiconSchema, generateLexiconFAQSchema } from '@/lib/seo/schema-generator'
import LexiconTool from '@/components/LexiconTool'
import { getWordStudyByStrongs } from '@/lib/word-studies-enhanced'
import { getWordStudyEssay } from '@/lib/word-study-essays'
import { getConcordanceStats, getConcordanceVerseSample, getLexiconConcordance } from '@/lib/lexicon-concordance'
import {
    BookOpenIcon
} from '@/components/icons'

export const revalidate = 86400 // 24 hours

/** "Genesis 1:1" -> "/verses/genesis/1/1" */
function refToVersePath(ref: string): string {
    const match = ref.match(/^(\d?\s*[A-Za-z]+)\s+(\d+):(\d+)$/)
    if (!match) return '/lexicon'
    const book = match[1].trim().toLowerCase().replace(/\s+/g, '-')
    return `/verses/${book}/${match[2]}/${match[3]}`
}

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

    // lexicon.json's own stats/verseSample are always-empty stubs — the real counts live in the concordance file
    const concordanceStats = getConcordanceStats(strongs)
    const concordance = getLexiconConcordance(strongs)
    const verseSample = await getConcordanceVerseSample(strongs, 10)
    const liveEntry = concordanceStats
        ? { ...entry, stats: concordanceStats, verseSample: verseSample.length > 0 ? verseSample : entry.verseSample }
        : entry

    const schema = generateLexiconSchema(entry)
    const wordStudy = getWordStudyByStrongs(strongs.toUpperCase())
    const essay = getWordStudyEssay(strongs)

    // Resolve cross-reference entries for enriched Related Words display
    const crossRefEntries = await Promise.all(
        (entry.synergy?.crossReferences || []).slice(0, 15).map(async (ref: string) => {
            const e = await getLexiconEntry(ref)
            return e
                ? { strongs: ref, word: e.word, transliteration: e.transliteration }
                : { strongs: ref, word: '', transliteration: '' }
        })
    )

    // Root-word entry, for interlinking from the essay section
    const rootEntry = entry.rootWord ? await getLexiconEntry(entry.rootWord) : null

    const faqSchema = generateLexiconFAQSchema(entry, rootEntry)

    return (
        <div className="min-h-screen bg-primary-light/30">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* HERO */}
            <div className="bg-white border-b border-grace py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <nav className="flex items-center gap-2 text-sm text-ink-muted font-sans mb-8">
                        <Link href="/" className="hover:text-sacred transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/lexicon" className="hover:text-sacred transition-colors">Lexicon</Link>
                        <span>/</span>
                        <span className="text-scripture font-medium">{entry.strongs}</span>
                    </nav>

                    <div className="inline-block px-3 py-1 rounded-full bg-sacred/10 text-sacred text-xs font-bold uppercase mb-4">
                        <BookOpenIcon className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                        {entry.language} Word Study
                    </div>

                    <h1 className="text-3xl md:text-4xl font-display font-bold text-scripture mb-5 tracking-tight leading-tight">
                        The meaning of{' '}
                        <span className="text-sacred">&ldquo;{entry.transliteration}&rdquo;</span>{' '}
                        ({entry.strongs}) — <span className="text-sacred">{entry.word}</span>
                    </h1>

                    <p className="text-xl font-serif italic text-ink-muted max-w-2xl leading-relaxed">
                        Understanding <span className="text-scripture font-semibold">{entry.transliteration}</span> reveals the original theological depth often simplified in translation.
                    </p>

                    {/* Inline definition preview */}
                    {entry.definitions.strongs && (
                        <div className="mt-4 bg-white border border-grace rounded-lg p-4">
                            <span className="text-xs font-bold uppercase text-sacred tracking-wider">Definition</span>
                            <p className="text-base text-scripture mt-1 leading-relaxed">
                                {entry.definitions.strongs.length > 120
                                    ? entry.definitions.strongs.slice(0, 120) + '...'
                                    : entry.definitions.strongs}
                            </p>
                        </div>
                    )}

                    <p className="mt-4 text-xs text-ink-muted">
                        Cross-referenced against{' '}
                        <Link href="/methodology#strongs-concordance" className="underline hover:text-scripture">Strong&apos;s Concordance</Link>
                        {entry.language === 'Hebrew' ? (
                            <> and <Link href="/methodology#bdb" className="underline hover:text-scripture">BDB</Link></>
                        ) : (
                            <> and <Link href="/methodology#lsj" className="underline hover:text-scripture">LSJ</Link></>
                        )}
                        {essay?.generatedAt && (
                            <> &middot; word study last updated {new Date(essay.generatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</>
                        )}
                        {' '}&middot;{' '}
                        <a href={`mailto:contact@biblemaximum.com?subject=${encodeURIComponent(`Error on ${entry.strongs} lexicon entry`)}`} className="underline hover:text-scripture">Report an error</a>
                    </p>
                </div>
            </div>

            {/* CTA STRIP */}
            <div className="max-w-7xl mx-auto px-6 mt-[-1.5rem] relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {liveEntry.stats?.mostFrequentBook && (
                        <div className="bg-scripture rounded-lg p-6 text-primary-light shadow-lg flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-lg">Explore {liveEntry.stats.mostFrequentBook} Quizzes</h3>
                                <p className="text-primary-light/80 text-xs">Test your knowledge of the book where this word appears most</p>
                            </div>
                            <Link href={`/${liveEntry.stats.mostFrequentBook.toLowerCase().replace(/\s+/g, '-')}-chapters`} className="bg-primary-light text-scripture px-4 py-2 rounded-lg font-bold text-sm tracking-wider uppercase shrink-0">Explore</Link>
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

                    {/* THEOLOGICAL WORD STUDY */}
                    {wordStudy && (
                        <section className="mt-8 border border-grace rounded-xl p-8">
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

                    {/* INTERACTIVE LEXICON STUDY TOOL */}
                    <div className="mt-16">
                        <LexiconTool
                            entry={liveEntry}
                            crossRefEntries={crossRefEntries}
                            essay={essay}
                            translationCounts={concordance?.translationCounts}
                            rootEntry={rootEntry}
                        />
                    </div>

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
