import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import {
    BookOpenIcon,
    ChevronRightIcon,
    ArrowRightIcon,
} from '@/components/icons'

const wordStudiesPath = path.join(process.cwd(), 'data/kjvstudy/word_studies.json')
const wordStudies: Record<string, any> = JSON.parse(fs.readFileSync(wordStudiesPath, 'utf-8'))

export const metadata = {
    title: "Hebrew Words in the Bible | 100+ Biblical Hebrew Words with Meaning, Pronunciation & Strong's Numbers | Bible Maximum",
    description: "Complete guide to Hebrew words used in the Old Testament with original scripts, transliterations, meanings, and Strong's concordance numbers. Study the original language of Scripture.",
    alternates: { canonical: '/hebrew-words' },
    keywords: [
        'Hebrew words in the Bible',
        'biblical Hebrew words',
        'Hebrew words and meanings',
        'Old Testament Hebrew',
        'Hebrew word study',
        'Strongs concordance Hebrew',
        'Hebrew Bible vocabulary',
        'original Hebrew words',
        'Hebrew language Bible',
        'learn biblical Hebrew words',
    ],
}

// Build Hebrew entries at module level (cached)
const hebrewEntries = Object.entries(wordStudies)
    .filter(([_, data]) => data.ot_term && data.ot_strongs)
    .map(([slug, data]) => ({
        slug,
        term: data.ot_term,
        transliteration: data.ot_transliteration,
        meaning: data.ot_meaning,
        strongs: data.ot_strongs as string[],
        note: data.ot_note,
    }))
    .sort((a, b) => a.transliteration.localeCompare(b.transliteration))

// Group alphabetically by first letter of transliteration
const grouped: Record<string, typeof hebrewEntries> = {}
for (const entry of hebrewEntries) {
    const letter = entry.transliteration.charAt(0).toUpperCase()
    if (!grouped[letter]) grouped[letter] = []
    grouped[letter].push(entry)
}
const sortedLetters = Object.keys(grouped).sort()

const faqs = [
    {
        question: 'How many Hebrew words are in the Old Testament?',
        answer: 'The Old Testament contains approximately 8,674 unique Hebrew root words (as cataloged by Strong\'s Concordance), though the total word count across all 39 books is around 304,901 words. Many of these roots branch into multiple derived forms, giving the Hebrew Bible an incredibly rich and layered vocabulary that rewards careful study.',
    },
    {
        question: 'What is the most common Hebrew word for God?',
        answer: 'The most common Hebrew word for God is Elohim (אֱלֹהִים, Strong\'s H430), appearing over 2,600 times in the Old Testament. Though grammatically plural, it takes singular verbs when referring to the one true God, reflecting the majesty and fullness of deity. The personal covenant name YHWH (יְהוָה, Strong\'s H3068), rendered "LORD" in English Bibles, appears nearly 6,800 times and is the most sacred name of God in Hebrew Scripture.',
    },
    {
        question: 'Do I need to learn Hebrew to study the Bible?',
        answer: 'No, you do not need to become fluent in Hebrew to study the Bible effectively. However, learning key Hebrew words greatly enriches your understanding of the Old Testament. Tools like Strong\'s Concordance, interlinear Bibles, and word study resources (like this page) allow you to access the depth of the original language without formal language training. Even learning 50-100 key Hebrew words can transform your Bible study by revealing nuances lost in translation.',
    },
]

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                },
            })),
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://biblemaximum.com',
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Hebrew Words',
                    item: 'https://biblemaximum.com/hebrew-words',
                },
            ],
        },
    ],
}

export default function HebrewWordsPage() {
    return (
        <div className="bg-white pb-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* BREADCRUMB */}
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm text-primary-dark/50">
                    <li><Link href="/" className="hover:text-scripture transition-colors">Home</Link></li>
                    <li><ChevronRightIcon className="w-3 h-3" /></li>
                    <li className="text-scripture font-semibold">Hebrew Words</li>
                </ol>
            </nav>

            {/* HERO */}
            <section className="relative pt-20 pb-20 bg-gradient-to-br from-amber-700 to-amber-800 text-white">
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-semibold mb-8">
                            <BookOpenIcon className="w-4 h-4" />
                            <span>{hebrewEntries.length} Hebrew Word Studies</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 tracking-tight leading-tight">
                            Hebrew Words in the Bible
                        </h1>

                        <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Explore the original language of the Old Testament. Each Hebrew word unlocks layers of meaning that enrich your understanding of God's Word.
                        </p>

                        {/* STATS */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                            <div className="p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                                <div className="text-3xl font-bold mb-1">{hebrewEntries.length}</div>
                                <div className="text-sm text-white/70">Word Studies</div>
                            </div>
                            <div className="p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                                <div className="text-3xl font-bold mb-1">{hebrewEntries.reduce((n, e) => n + e.strongs.length, 0)}</div>
                                <div className="text-sm text-white/70">Strong's Numbers</div>
                            </div>
                            <div className="p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 col-span-2 md:col-span-1">
                                <div className="text-3xl font-bold mb-1">39</div>
                                <div className="text-sm text-white/70">OT Books Covered</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTRO PARAGRAPH */}
            <section className="py-16 bg-primary-light/30 border-b border-grace">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none text-primary-dark/70 leading-relaxed">
                        <p>
                            Hebrew is the original language of the Old Testament, spoken and written by the patriarchs, prophets, and poets of ancient Israel over a span of roughly one thousand years. Unlike modern Western languages, biblical Hebrew is a Semitic language that reads right to left, uses a consonantal alphabet of 22 letters, and conveys meaning through a system of three-letter root words. Each root carries a core idea that branches into dozens of related forms -- verbs, nouns, adjectives -- all interconnected by a shared semantic thread.
                        </p>
                        <p>
                            This interconnected root system means that studying even a single Hebrew word often reveals connections across the entire Old Testament. For example, the root <em>sh-l-m</em> (שׁלם) gives us <strong>shalom</strong> (peace, wholeness), <strong>shalem</strong> (complete), and <strong>Yerushalayim</strong> (Jerusalem, "city of peace"). Understanding these relationships transforms your reading of Scripture from surface-level comprehension to deep, layered insight into the mind of God as expressed through His chosen language.
                        </p>
                        <p>
                            The Hebrew words cataloged below represent the most theologically significant vocabulary in the Old Testament. Each entry includes the original Hebrew script, a transliteration for pronunciation, the English meaning, and links to the corresponding Strong's Concordance numbers for further study. Whether you are a seminary student, a pastor preparing sermons, or a devoted believer seeking deeper understanding, these word studies will open windows into the richness of God's revelation in His original tongue.
                        </p>
                    </div>
                </div>
            </section>

            {/* ALPHABET NAV */}
            <section className="py-8 bg-white border-b border-grace sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {sortedLetters.map((letter) => (
                            <a
                                key={letter}
                                href={`#letter-${letter}`}
                                className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold text-amber-800 bg-amber-50 hover:bg-amber-700 hover:text-white transition-colors"
                            >
                                {letter}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* WORD CARDS BY LETTER */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {sortedLetters.map((letter) => (
                        <div key={letter} id={`letter-${letter}`} className="mb-16 scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-amber-700 text-white flex items-center justify-center text-xl font-bold font-display">
                                    {letter}
                                </div>
                                <div className="h-px flex-1 bg-grace" />
                                <span className="text-sm text-primary-dark/40 font-medium">{grouped[letter].length} words</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {grouped[letter].map((entry) => (
                                    <div
                                        key={entry.slug}
                                        className="group p-6 rounded-xl bg-white border border-grace hover:border-amber-300 hover:shadow-md transition-all duration-300"
                                    >
                                        {/* Hebrew Script */}
                                        <div className="text-3xl font-bold text-scripture mb-2 leading-tight" dir="rtl">
                                            {entry.term}
                                        </div>

                                        {/* Transliteration */}
                                        <div className="text-lg font-semibold text-amber-800 mb-1 italic">
                                            {entry.transliteration}
                                        </div>

                                        {/* English Meaning */}
                                        <div className="text-primary-dark/70 mb-4">
                                            {entry.meaning}
                                        </div>

                                        {/* Strong's Numbers */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {entry.strongs.map((sn: string) => (
                                                <Link
                                                    key={sn}
                                                    href={`/lexicon/${sn}`}
                                                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-semibold hover:bg-amber-700 hover:text-white transition-colors"
                                                >
                                                    {sn}
                                                </Link>
                                            ))}
                                        </div>

                                        {/* Concept Study Link */}
                                        <Link
                                            href={`/lexicon/concept/${entry.slug}`}
                                            className="inline-flex items-center text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors group/link"
                                        >
                                            <span>Full Word Study</span>
                                            <ArrowRightIcon className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-20 bg-primary-light/30 border-t border-grace">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-scripture mb-12 text-center tracking-tight">
                        Frequently Asked Questions about Biblical Hebrew
                    </h2>

                    <div className="space-y-8">
                        {faqs.map((faq, i) => (
                            <div key={i} className="p-8 rounded-xl bg-white border border-grace">
                                <h3 className="text-xl font-bold text-scripture mb-4">{faq.question}</h3>
                                <p className="text-primary-dark/70 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* INTERNAL LINKS */}
            <section className="py-16 border-t border-grace">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold font-display text-scripture mb-8 text-center tracking-tight">
                        Continue Your Study
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { href: '/lexicon', title: 'Bible Lexicon', desc: 'Full Greek & Hebrew lexicon with 14,000+ entries' },
                            { href: '/greek-words', title: 'Greek Words in the Bible', desc: 'Explore New Testament Greek vocabulary and meanings' },
                            { href: '/interlinear', title: 'Interlinear Bible', desc: 'Read Scripture with original Hebrew and Greek' },
                            { href: '/lexicon/browse/hebrew', title: 'Browse Hebrew Index', desc: "Complete A-Z index of Hebrew Strong's entries" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="group p-6 rounded-xl bg-white border border-grace hover:border-amber-300 hover:shadow-md transition-all duration-300"
                            >
                                <h3 className="text-lg font-bold text-scripture mb-2 group-hover:text-amber-700 transition-colors">
                                    {link.title}
                                </h3>
                                <p className="text-sm text-primary-dark/60 mb-4">{link.desc}</p>
                                <div className="flex items-center text-amber-700 text-sm font-semibold">
                                    <span>Explore</span>
                                    <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
