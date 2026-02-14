import { Metadata } from 'next';
import Link from 'next/link';
import { getAllWordStudies } from '@/lib/database/queries';

export const metadata: Metadata = {
    title: "Bible Word Studies | In-Depth Greek & Hebrew Analysis with Strong's Numbers | Etymology, Theological Significance & Cross-References | Bible Maximum",
    description:
        "Explore in-depth word studies of original Greek and Hebrew Bible words. Discover the meaning, etymology, and theological significance of key biblical terms with Strong's concordance references.",
    keywords: [
        'Bible word study',
        'Greek word study',
        'Hebrew word study',
        'Strong\'s concordance',
        'biblical Greek',
        'biblical Hebrew',
        'original language Bible study',
        'agape meaning',
        'hesed meaning',
    ],
    openGraph: {
        title: "Bible Word Studies | In-Depth Greek & Hebrew Analysis with Strong's Numbers | Etymology, Theological Significance & Cross-References | Bible Maximum",
        description:
            "Explore in-depth word studies of original Greek and Hebrew Bible words. Discover the meaning, etymology, and theological significance of key biblical terms.",
        type: 'website',
    },
};

export default async function WordStudiesPage() {
    const wordStudies = await getAllWordStudies();

    const totalWords = wordStudies.length;
    const greekWords = wordStudies.filter((w: any) => w.language === 'greek');
    const hebrewWords = wordStudies.filter((w: any) => w.language === 'hebrew');

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 md:px-10 pt-6">
                <ol className="flex items-center gap-2 text-sm text-gray-500">
                    <li>
                        <Link href="/" className="hover:text-blue-600 transition-colors">
                            Home
                        </Link>
                    </li>
                    <li aria-hidden="true">
                        <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900">Word Studies</span>
                    </li>
                </ol>
            </nav>

            {/* Hero Section */}
            <div className="bg-gray-50 py-16 md:py-24 border-b border-gray-200 mt-4">
                <div className="max-w-7xl mx-auto px-4 md:px-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                        </span>
                        Original Language Study
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Word <br />
                        <span className="text-blue-600">Studies</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
                        Unlock the deeper meaning of Scripture by studying the original Greek and Hebrew words.
                        Explore etymology, theological significance, and how each word shapes our understanding of God&rsquo;s message.
                    </p>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="max-w-7xl mx-auto px-4 md:px-10 -mt-8">
                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 text-center">
                        <div className="text-3xl font-bold text-gray-900">{totalWords}</div>
                        <div className="text-xs font-bold uppercase text-gray-400 mt-1">Total Words</div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 text-center">
                        <div className="text-3xl font-bold text-blue-600">{greekWords.length}</div>
                        <div className="text-xs font-bold uppercase text-gray-400 mt-1">Greek</div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 text-center">
                        <div className="text-3xl font-bold text-amber-600">{hebrewWords.length}</div>
                        <div className="text-xs font-bold uppercase text-gray-400 mt-1">Hebrew</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 md:px-10 py-16">
                {/* Section Header */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        All Word Studies
                    </h2>
                    <p className="text-gray-500 font-medium">
                        Browse every word study, from the Greek of the New Testament to the Hebrew of the Old.
                    </p>
                </div>

                {/* Language Section: Greek */}
                {greekWords.length > 0 && (
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase">
                                Greek (Koine)
                            </span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="text-sm text-gray-400 font-medium">{greekWords.length} words</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {greekWords.map((word: any) => (
                                <WordCard key={word.id} word={word} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Language Section: Hebrew */}
                {hebrewWords.length > 0 && (
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase">
                                Hebrew
                            </span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="text-sm text-gray-400 font-medium">{hebrewWords.length} words</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {hebrewWords.map((word: any) => (
                                <WordCard key={word.id} word={word} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {totalWords === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No word studies found</h3>
                        <p className="text-gray-500">Word studies are being prepared. Check back soon.</p>
                    </div>
                )}
            </main>

            {/* Internal Links Section */}
            <section className="bg-gray-50 border-t border-gray-200 py-16">
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Continue Your Study</h2>
                    <p className="text-gray-500 mb-8">Explore more resources for deeper Bible understanding.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link
                            href="/lexicon"
                            className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                                Biblical Lexicon
                            </h3>
                            <p className="text-sm text-gray-500">
                                Browse the full Strong&rsquo;s concordance with definitions and usage data.
                            </p>
                        </Link>
                        <Link
                            href="/commentary"
                            className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                                Commentary
                            </h3>
                            <p className="text-sm text-gray-500">
                                Verse-by-verse commentary and scholarly insights on every passage.
                            </p>
                        </Link>
                        <Link
                            href="/bible-study-guides"
                            className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                                Study Guides
                            </h3>
                            <p className="text-sm text-gray-500">
                                Structured guides for personal or group Bible study sessions.
                            </p>
                        </Link>
                        <Link
                            href="/topics"
                            className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                                Bible Topics
                            </h3>
                            <p className="text-sm text-gray-500">
                                Topical studies covering faith, salvation, prayer, and more.
                            </p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* JSON-LD Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        name: "Bible Word Studies | In-Depth Greek & Hebrew Analysis with Strong's Numbers | Etymology, Theological Significance & Cross-References | Bible Maximum",
                        description:
                            "Explore in-depth word studies of original Greek and Hebrew Bible words. Discover the meaning, etymology, and theological significance of key biblical terms.",
                        url: '/word-studies',
                        mainEntity: {
                            '@type': 'ItemList',
                            numberOfItems: totalWords,
                            itemListElement: wordStudies.slice(0, 50).map((word: any, index: number) => ({
                                '@type': 'ListItem',
                                position: index + 1,
                                name: `${word.transliteration} (${word.word})`,
                                url: `/word-studies/${word.language}/${word.slug}`,
                            })),
                        },
                        breadcrumb: {
                            '@type': 'BreadcrumbList',
                            itemListElement: [
                                {
                                    '@type': 'ListItem',
                                    position: 1,
                                    name: 'Home',
                                    item: '/',
                                },
                                {
                                    '@type': 'ListItem',
                                    position: 2,
                                    name: 'Word Studies',
                                    item: '/word-studies',
                                },
                            ],
                        },
                    }),
                }}
            />
        </div>
    );
}

/* ----------------------------------------
   Word Card - Server Component
   ---------------------------------------- */
function WordCard({ word }: { word: any }) {
    const isGreek = word.language === 'greek';
    const languageBadgeBg = isGreek ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700';
    const languageLabel = isGreek ? 'Greek' : 'Hebrew';

    // Truncate definition to roughly 2 lines
    const truncatedDefinition =
        word.definition && word.definition.length > 120
            ? word.definition.slice(0, 120).trimEnd() + '...'
            : word.definition;

    return (
        <Link
            href={`/word-studies/${word.language}/${word.slug}`}
            className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col"
        >
            {/* Language Badge */}
            <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${languageBadgeBg}`}>
                    {languageLabel}
                </span>
                <span className="text-xs font-mono text-gray-400">{word.strongsNumber}</span>
            </div>

            {/* Original Word */}
            <div className="mb-3">
                <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {word.word}
                </div>
            </div>

            {/* Transliteration & Pronunciation */}
            <div className="mb-4">
                <span className="text-sm font-semibold text-gray-700">{word.transliteration}</span>
                {word.pronunciation && (
                    <span className="text-sm text-gray-400 ml-2">/{word.pronunciation}/</span>
                )}
            </div>

            {/* Definition */}
            <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                {truncatedDefinition}
            </p>

            {/* Footer: Usage Count */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-400">
                    <span className="font-bold text-gray-600">{word.usageCount}</span> occurrences in Scripture
                </div>
                <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Study
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </span>
            </div>
        </Link>
    );
}
