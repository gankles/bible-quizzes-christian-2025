import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTopicInBook, getBook } from '@/lib/database/queries'
import Link from 'next/link'
import topicsData from '@/data/topics.json'

interface Props {
    params: Promise<{
        slug: string
        book: string
    }>
}

export async function generateStaticParams() {
    // 10K+ pages — generated on-demand via ISR, not at build time
    return []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, book } = await params
    const [data, bookData] = await Promise.all([
        getTopicInBook(slug, book),
        getBook(book)
    ])
    const topicName = data?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    const bookName = bookData?.name || book.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    const count = data?.verses?.length || 0
    const chapterCount = count > 0 ? new Set(data.verses.map((v: any) => v.chapter)).size : 0

    return {
        title: `${topicName} in ${bookName} — ${count} Bible Verses Across ${chapterCount} Chapters | Bible Maximum`,
        description: `Study ${count} Bible verses about ${topicName} in ${bookName}, spanning ${chapterCount} chapters. Read each verse in context with cross-references and chapter quizzes.`,
        alternates: { canonical: `/topics/${slug}/in/${book}` },
    }
}

export default async function TopicInBookPage({ params }: Props) {
    const { slug, book } = await params
    const [data, bookData] = await Promise.all([
        getTopicInBook(slug, book),
        getBook(book)
    ])

    if (!data || !bookData) notFound()

    const { name: topicName, verses, category, relatedTopics } = data
    const { name: bookName } = bookData

    const frequency = verses.length

    // Chapter distribution analysis
    const chapterMap: Record<number, number> = {}
    verses.forEach((v: any) => {
        chapterMap[v.chapter] = (chapterMap[v.chapter] || 0) + 1
    })
    const chapters = Object.entries(chapterMap)
        .sort(([a], [b]) => Number(a) - Number(b))
    const topChapter = chapters.reduce((max, cur) =>
        Number(cur[1]) > Number(max[1]) ? cur : max, chapters[0]
    )
    const chapterSpan = chapters.length

    return (
        <div className="min-h-screen bg-primary-light/30">
            <nav className="bg-white border-b border-grace">
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <ol className="flex items-center flex-wrap gap-y-1 text-sm">
                        <li>
                            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
                        </li>
                        <li className="text-primary-dark/40 mx-2">/</li>
                        <li>
                            <Link href="/topics" className="text-blue-600 hover:underline">Topics</Link>
                        </li>
                        <li className="text-primary-dark/40 mx-2">/</li>
                        <li>
                            <Link href={`/topics/${slug}`} className="text-blue-600 hover:underline">{topicName}</Link>
                        </li>
                        <li className="text-primary-dark/40 mx-2">/</li>
                        <li className="text-primary-dark/70">{bookName}</li>
                    </ol>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-8">
                <header className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-8">
                        {category && (
                            <p className="text-blue-100 text-sm font-medium mb-2">{category}</p>
                        )}
                        <h1 className="text-3xl font-display font-bold">
                            {topicName} in <span className="text-blue-100">{bookName}</span>
                        </h1>
                        <p className="text-blue-100 mt-2">
                            {frequency} verse{frequency !== 1 ? 's' : ''} across {chapterSpan} chapter{chapterSpan !== 1 ? 's' : ''} of {bookName}
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white border border-grace rounded-lg shadow-sm p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{frequency}</div>
                        <div className="text-xs text-primary-dark/60 mt-1">Verses Found</div>
                    </div>
                    <div className="bg-white border border-grace rounded-lg shadow-sm p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{chapterSpan}</div>
                        <div className="text-xs text-primary-dark/60 mt-1">Chapters Covered</div>
                    </div>
                    <div className="bg-white border border-grace rounded-lg shadow-sm p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{bookData.testament === 'old' ? 'OT' : 'NT'}</div>
                        <div className="text-xs text-primary-dark/60 mt-1">{bookData.testament === 'old' ? 'Old' : 'New'} Testament</div>
                    </div>
                </div>

                {/* Chapter Distribution */}
                <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
                    <h2 className="text-lg font-bold text-scripture mb-4">Chapter Distribution</h2>
                    <p className="text-primary-dark/70 leading-relaxed mb-4">
                        References to {topicName} appear in {chapterSpan} of {bookData.chapters} chapters in {bookName}.
                        {topChapter && Number(topChapter[1]) > 1 && (
                            <> Chapter {topChapter[0]} contains the highest concentration with {topChapter[1]} verse{Number(topChapter[1]) !== 1 ? 's' : ''}.</>
                        )}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {chapters.map(([ch, count]) => (
                            <Link
                                key={ch}
                                href={`/${book}-${ch}-quiz`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100 transition-colors"
                            >
                                <span className="font-medium">Ch. {ch}</span>
                                <span className="text-blue-500 text-xs">({count})</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Highlighted Verse */}
                {verses.length > 0 && (
                    <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
                        <h2 className="text-lg font-bold text-scripture mb-3">Key Verse</h2>
                        <blockquote className="text-lg text-primary-dark/80 leading-relaxed border-l-4 border-blue-600 pl-4 italic mb-3">
                            &ldquo;{verses[0].text}&rdquo;
                        </blockquote>
                        <Link
                            href={`/verses/${verses[0].book}/${verses[0].chapter}/${verses[0].verse}`}
                            className="text-blue-600 font-medium hover:underline text-sm"
                        >
                            {bookName} {verses[0].chapter}:{verses[0].verse}
                        </Link>
                    </section>
                )}

                {/* Related Topics */}
                {relatedTopics && relatedTopics.length > 0 && (
                    <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-6">
                        <h2 className="text-lg font-bold text-scripture mb-3">Related Topics</h2>
                        <div className="flex flex-wrap gap-2">
                            {relatedTopics.slice(0, 10).map((rt: string) => (
                                <Link
                                    key={rt}
                                    href={`/topics/${rt}`}
                                    className="px-3 py-1.5 bg-primary-light/50 border border-grace rounded-full text-sm text-primary-dark/70 hover:border-blue-300 hover:text-blue-600 transition-colors capitalize"
                                >
                                    {rt.replace(/-/g, ' ')}
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* All Verses */}
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-scripture mb-4">
                        All {frequency} Verses on {topicName} in {bookName}
                    </h2>

                    <div className="space-y-4">
                        {verses.map((verse: any, i: number) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl shadow-sm border border-grace p-6 hover:shadow-md transition-shadow"
                            >
                                <blockquote className="text-lg text-primary-dark/80 leading-relaxed mb-4 border-l-4 border-blue-600 pl-4 italic">
                                    &ldquo;{verse.text}&rdquo;
                                </blockquote>
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={`/verses/${verse.book}/${verse.chapter}/${verse.verse}`}
                                        className="text-blue-600 font-medium hover:underline"
                                    >
                                        {bookName} {verse.chapter}:{verse.verse}
                                    </Link>
                                    <Link
                                        href={`/cross-references/${verse.book}/${verse.chapter}/${verse.verse}`}
                                        className="text-sm text-primary-dark/60 hover:text-blue-600"
                                    >
                                        Cross-references
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Study CTA */}
                <section className="bg-blue-600 rounded-xl p-6 mb-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold">Study the Book of {bookName}</h3>
                        <p className="text-blue-100 text-sm">Take quizzes and explore every chapter in depth.</p>
                    </div>
                    <Link
                        href={`/${book}-chapters`}
                        className="whitespace-nowrap px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-grace/20 transition-colors"
                    >
                        {bookName} Chapters
                    </Link>
                </section>

                {/* Internal Links */}
                <section className="bg-grace/10 border border-grace rounded-xl p-6">
                    <h3 className="text-lg font-bold text-scripture mb-3">Related Resources</h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                        <Link href={`/topics/${slug}`} className="text-blue-600 hover:underline text-sm">
                            All {topicName} Verses
                        </Link>
                        <Link href="/topics" className="text-blue-600 hover:underline text-sm">Browse All Topics</Link>
                        <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">Bible Quizzes</Link>
                        <Link href="/nave-topics" className="text-blue-600 hover:underline text-sm">Nave&apos;s Topical Bible</Link>
                        <Link href="/people" className="text-blue-600 hover:underline text-sm">Bible People Directory</Link>
                        <Link href="/bible-names" className="text-blue-600 hover:underline text-sm">Bible Name Meanings</Link>
                        <Link href="/commandments" className="text-blue-600 hover:underline text-sm">613 Commandments</Link>
                        <Link href="/timeline" className="text-blue-600 hover:underline text-sm">Bible Timeline</Link>
                    </div>
                </section>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Article',
                            headline: `${topicName} in ${bookName}`,
                            description: `${frequency} Bible verses about ${topicName} in the Book of ${bookName}`,
                            url: `https://biblemaximum.com/topics/${slug}/in/${book}`,
                            isPartOf: {
                                '@type': 'CollectionPage',
                                name: `Bible Topics`,
                                url: 'https://biblemaximum.com/topics',
                            },
                        }),
                    }}
                />
            </main>
        </div>
    )
}
