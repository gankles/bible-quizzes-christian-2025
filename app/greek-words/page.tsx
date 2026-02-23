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
    title: "Greek Words in the Bible | 100+ Biblical Greek Words with Meaning, Pronunciation & Strong's Numbers | Bible Maximum",
    description: "Complete guide to Greek words used in the New Testament with original scripts, transliterations, meanings, and Strong's concordance numbers. Study the original language of Scripture.",
    alternates: { canonical: '/greek-words' },
    keywords: [
        'Greek words in the Bible',
        'biblical Greek words',
        'Greek words and meanings',
        'New Testament Greek',
        'Koine Greek words',
        'Strongs concordance Greek',
        'Greek Bible vocabulary',
        'original Greek words',
        'Greek language Bible',
        'learn biblical Greek words',
    ],
}

// Build Greek entries at module level (cached)
const greekEntries = Object.entries(wordStudies)
    .filter(([_, data]) => data.nt_term && data.nt_strongs)
    .map(([slug, data]) => ({
        slug,
        term: data.nt_term,
        transliteration: data.nt_transliteration,
        meaning: data.nt_meaning,
        strongs: data.nt_strongs as string[],
        note: data.nt_note,
    }))
    .sort((a, b) => a.transliteration.localeCompare(b.transliteration))

// Group alphabetically by first letter of transliteration
const grouped: Record<string, typeof greekEntries> = {}
for (const entry of greekEntries) {
    const letter = entry.transliteration.charAt(0).toUpperCase()
    if (!grouped[letter]) grouped[letter] = []
    grouped[letter].push(entry)
}
const sortedLetters = Object.keys(grouped).sort()

const faqs = [
    {
        question: 'What kind of Greek was the New Testament written in?',
        answer: 'The New Testament was written in Koine Greek (also called "common" Greek), the everyday language spoken throughout the Roman Empire from roughly 300 BC to AD 300. Unlike Classical Greek used by philosophers like Plato and Aristotle, Koine was the language of merchants, soldiers, and ordinary people. God chose this widely understood language so that the Gospel could spread rapidly across the ancient world. Koine Greek is simpler in grammar than Classical Greek but remarkably precise in its theological vocabulary, with words like agape (love), pistis (faith), and charis (grace) carrying rich spiritual significance.',
    },
    {
        question: 'What are the 4 Greek words for love?',
        answer: 'The four Greek words commonly associated with love are: (1) Agape (ἀγάπη) -- selfless, sacrificial, unconditional love, the highest form used to describe God\'s love for humanity (John 3:16); (2) Phileo (φιλέω) -- brotherly love, warm affection between friends, the root of "Philadelphia" (city of brotherly love); (3) Storge (στοργή) -- natural family affection, the bond between parents and children (used in compound form in Romans 12:10); and (4) Eros (ἔρως) -- romantic, passionate love, which does not appear in the New Testament but is found in Greek literature. The New Testament primarily uses agape and phileo, with agape becoming the defining word for Christian love.',
    },
    {
        question: 'Do I need to learn Greek to study the Bible?',
        answer: 'No, fluency in Greek is not required for effective Bible study. Millions of faithful believers have grown in deep knowledge of Scripture through quality English translations. However, learning key Greek words adds tremendous value to your study. Tools like Strong\'s Concordance, interlinear Bibles, and word study guides (like this page) give you access to the original language without years of formal study. Understanding even 50-100 core Greek words -- such as logos (word), pneuma (spirit), and dikaiosyne (righteousness) -- will reveal nuances that no single English translation can fully capture.',
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
                    name: 'Greek Words',
                    item: 'https://biblemaximum.com/greek-words',
                },
            ],
        },
    ],
}

export default function GreekWordsPage() {
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
                    <li className="text-scripture font-semibold">Greek Words</li>
                </ol>
            </nav>

            {/* HERO */}
            <section className="relative pt-20 pb-20 bg-gradient-to-br from-blue-700 to-blue-800 text-white">
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-semibold mb-8">
                            <BookOpenIcon className="w-4 h-4" />
                            <span>{greekEntries.length} Greek Word Studies</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 tracking-tight leading-tight">
                            Greek Words in the Bible
                        </h1>

                        <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Discover the original language of the New Testament. Each Greek word opens a deeper understanding of the Gospel and the apostolic writings.
                        </p>

                        {/* STATS */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                            <div className="p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                                <div className="text-3xl font-bold mb-1">{greekEntries.length}</div>
                                <div className="text-sm text-white/70">Word Studies</div>
                            </div>
                            <div className="p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                                <div className="text-3xl font-bold mb-1">{greekEntries.reduce((n, e) => n + e.strongs.length, 0)}</div>
                                <div className="text-sm text-white/70">Strong's Numbers</div>
                            </div>
                            <div className="p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 col-span-2 md:col-span-1">
                                <div className="text-3xl font-bold mb-1">27</div>
                                <div className="text-sm text-white/70">NT Books Covered</div>
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
                            The New Testament was written in Koine Greek, the common dialect that served as the lingua franca of the Roman Empire during the first century. Unlike the literary Classical Greek of Homer and Plato, Koine was the language of the marketplace, the harbor, and the household -- precisely the kind of language God chose to communicate the good news of Jesus Christ to the widest possible audience. The 27 books of the New Testament, composed by apostles and their associates between roughly AD 45 and AD 95, employ a vocabulary of about 5,420 unique Greek words.
                        </p>
                        <p>
                            Greek is especially well-suited to theological precision. Where English has a single word "love," Greek distinguishes between <strong>agape</strong> (selfless, divine love), <strong>phileo</strong> (brotherly affection), and other nuanced terms. Where English says "word," Greek offers both <strong>logos</strong> (the rational, abiding Word -- as in John 1:1) and <strong>rhema</strong> (a specific spoken utterance). These distinctions are not academic trivialities; they carry profound theological weight. Understanding the original Greek vocabulary of the New Testament gives you direct access to the precise shades of meaning that the Holy Spirit inspired the apostolic writers to use.
                        </p>
                        <p>
                            The Greek word studies below cover the most theologically important terms in the New Testament. Each entry presents the original Greek script, a transliteration to guide pronunciation, the English meaning, and links to the corresponding Strong's Concordance numbers for in-depth research. Whether you are studying for personal devotion, academic work, or sermon preparation, these entries will help you engage with the New Testament at the level of its original language.
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
                                className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold text-blue-800 bg-blue-50 hover:bg-blue-700 hover:text-white transition-colors"
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
                                <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center text-xl font-bold font-display">
                                    {letter}
                                </div>
                                <div className="h-px flex-1 bg-grace" />
                                <span className="text-sm text-primary-dark/40 font-medium">{grouped[letter].length} words</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {grouped[letter].map((entry) => (
                                    <div
                                        key={entry.slug}
                                        className="group p-6 rounded-xl bg-white border border-grace hover:border-blue-300 hover:shadow-md transition-all duration-300"
                                    >
                                        {/* Greek Script */}
                                        <div className="text-3xl font-bold text-scripture mb-2 leading-tight">
                                            {entry.term}
                                        </div>

                                        {/* Transliteration */}
                                        <div className="text-lg font-semibold text-blue-800 mb-1 italic">
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
                                                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold hover:bg-blue-700 hover:text-white transition-colors"
                                                >
                                                    {sn}
                                                </Link>
                                            ))}
                                        </div>

                                        {/* Concept Study Link */}
                                        <Link
                                            href={`/lexicon/concept/${entry.slug}`}
                                            className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors group/link"
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
                        Frequently Asked Questions about Biblical Greek
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
                            { href: '/hebrew-words', title: 'Hebrew Words in the Bible', desc: 'Explore Old Testament Hebrew vocabulary and meanings' },
                            { href: '/interlinear', title: 'Interlinear Bible', desc: 'Read Scripture with original Hebrew and Greek' },
                            { href: '/lexicon/browse/greek', title: 'Browse Greek Index', desc: "Complete A-Z index of Greek Strong's entries" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="group p-6 rounded-xl bg-white border border-grace hover:border-blue-300 hover:shadow-md transition-all duration-300"
                            >
                                <h3 className="text-lg font-bold text-scripture mb-2 group-hover:text-blue-700 transition-colors">
                                    {link.title}
                                </h3>
                                <p className="text-sm text-primary-dark/60 mb-4">{link.desc}</p>
                                <div className="flex items-center text-blue-700 text-sm font-semibold">
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
