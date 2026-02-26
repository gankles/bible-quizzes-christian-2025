import { Metadata } from 'next';
import Link from 'next/link';
import { getAllGrammarForms, getGrammarFormsByCategory } from '@/lib/grammar-data';
import { StructuredData } from '@/components/StructuredData';
import {
    BookOpenIcon,
    AcademicCapIcon,
    ArrowRightIcon,
    ChartBarIcon,
    SparklesIcon,
    BoltIcon,
} from '@/components/icons';

export const metadata: Metadata = {
    title: 'Greek Grammar in the New Testament | Biblical Greek Verb Tenses, Moods & Noun Cases | Bible Study Guide',
    description: 'Master New Testament Greek grammar: verb tenses (aorist, present, perfect, imperfect), moods (indicative, subjunctive, imperative), noun cases (nominative, genitive, dative, accusative), participles, and infinitives. See how Greek grammar illuminates famous Bible verses.',
    keywords: 'greek grammar bible, new testament greek, aorist tense, present tense greek, greek verb tenses, greek noun cases, biblical greek grammar, greek participles, koine greek',
    alternates: { canonical: '/greek-grammar' },
};

export default function GreekGrammarIndexPage() {
    const allForms = getAllGrammarForms();
    const verbs = allForms.filter(f => f.category === 'verb');
    const nouns = getGrammarFormsByCategory('noun');
    const participles = getGrammarFormsByCategory('participle');
    const infinitives = getGrammarFormsByCategory('infinitive');

    const totalExamples = allForms.reduce((sum, f) => sum + f.examples.length, 0);

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Greek Grammar in the New Testament',
        description: 'Comprehensive guide to Greek grammatical forms found in the New Testament with Bible verse examples.',
        url: 'https://biblemaximum.com/greek-grammar',
        numberOfItems: allForms.length,
        hasPart: allForms.map(f => ({
            '@type': 'DefinedTerm',
            name: f.name,
            description: f.description.slice(0, 200),
            url: `https://biblemaximum.com/greek-grammar/${f.slug}`,
        })),
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
            { '@type': 'ListItem', position: 2, name: 'Greek Grammar', item: 'https://biblemaximum.com/greek-grammar' },
        ],
    };

    // Group verbs by mood for organized display
    const indicatives = verbs.filter(v => v.robinsonCode.includes('I') && v.robinsonCode !== 'V-IAI' || v.slug.includes('indicative'));
    const imperatives = verbs.filter(v => v.slug.includes('imperative'));
    const subjunctives = verbs.filter(v => v.slug.includes('subjunctive'));
    const passives = verbs.filter(v => v.slug.includes('passive'));
    const activeIndicatives = verbs.filter(v => v.slug.includes('indicative') && !v.slug.includes('passive'));

    return (
        <div className="bg-white min-h-screen">
            <StructuredData data={schema} />
            <StructuredData data={breadcrumbSchema} />

            {/* Hero */}
            <section className="relative pt-24 pb-20 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
                            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-gray-900 font-medium">Greek Grammar</span>
                        </nav>

                        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-8">
                            <AcademicCapIcon className="w-4 h-4" />
                            <span>New Testament Greek</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                            Greek Grammar Guide
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 mb-14 max-w-3xl mx-auto leading-relaxed">
                            Understand how <span className="text-indigo-600 font-semibold">{allForms.length} grammatical forms</span> shape
                            the meaning of the New Testament, with {totalExamples}+ examples from famous Bible verses.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            <div className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
                                <div className="text-3xl font-bold text-gray-900 mb-1">{verbs.length}</div>
                                <div className="text-sm text-gray-500">Verb Forms</div>
                            </div>
                            <div className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
                                <div className="text-3xl font-bold text-gray-900 mb-1">{nouns.length}</div>
                                <div className="text-sm text-gray-500">Noun Cases</div>
                            </div>
                            <div className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
                                <div className="text-3xl font-bold text-gray-900 mb-1">{participles.length + infinitives.length}</div>
                                <div className="text-sm text-gray-500">Participles &amp; Infinitives</div>
                            </div>
                            <div className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm border-t-4 border-t-indigo-600">
                                <div className="text-3xl font-bold text-indigo-600 mb-1">{totalExamples}+</div>
                                <div className="text-sm text-gray-500">Verse Examples</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA: Start with Aorist */}
            <section className="py-12 bg-indigo-50 border-b border-indigo-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <p className="text-gray-700 mb-4">
                        New to Greek grammar? Start with the most common verb form in the New Testament:
                    </p>
                    <Link
                        href="/greek-grammar/aorist-active-indicative"
                        className="inline-flex items-center px-8 py-3.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-indigo-700 transition-colors group"
                    >
                        <span>Aorist Active Indicative</span>
                        <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* Verb Tenses Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <div className="inline-flex items-center space-x-2 text-indigo-600 font-semibold text-sm mb-4">
                            <BoltIcon className="w-4 h-4" />
                            <span>Verb Tenses</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Active Indicative Tenses</h2>
                        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
                            The indicative mood states facts. These four tenses show how Greek distinguishes
                            between different kinds of action: ongoing, completed, past ongoing, and completed with lasting results.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activeIndicatives.map((form) => (
                            <Link
                                key={form.slug}
                                href={`/greek-grammar/${form.slug}`}
                                className="group p-8 rounded-xl bg-white border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-5">
                                    <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-mono font-bold">
                                        {form.robinsonCode}
                                    </span>
                                    <span className="text-xs text-gray-400">{form.frequency}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">
                                    {form.name}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-2">
                                    {form.description.slice(0, 150)}...
                                </p>
                                <div className="flex items-center text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-all">
                                    Study this form <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Verb Moods Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <div className="inline-flex items-center space-x-2 text-indigo-600 font-semibold text-sm mb-4">
                            <SparklesIcon className="w-4 h-4" />
                            <span>Verb Moods</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Commands, Possibilities &amp; Passive Voice</h2>
                        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
                            Beyond stating facts, Greek verbs express commands (imperative), possibilities (subjunctive),
                            and actions received by the subject (passive voice).
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...imperatives, ...subjunctives, ...passives].map((form) => (
                            <Link
                                key={form.slug}
                                href={`/greek-grammar/${form.slug}`}
                                className="group p-8 rounded-xl bg-white border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-5">
                                    <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-mono font-bold">
                                        {form.robinsonCode}
                                    </span>
                                    <span className="text-xs text-gray-400">{form.frequency}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">
                                    {form.name}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                                    {form.description.slice(0, 120)}...
                                </p>
                                <div className="flex items-center text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-all">
                                    Study this form <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Noun Cases Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <div className="inline-flex items-center space-x-2 text-indigo-600 font-semibold text-sm mb-4">
                            <ChartBarIcon className="w-4 h-4" />
                            <span>Noun Cases</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">The Four Greek Noun Cases</h2>
                        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
                            Greek nouns change their endings to show their function in a sentence.
                            Understanding cases reveals who acts, who receives, and the relationships between words.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {nouns.map((form) => (
                            <Link
                                key={form.slug}
                                href={`/greek-grammar/${form.slug}`}
                                className="group p-8 rounded-xl bg-white border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-5">
                                    <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-mono font-bold">
                                        {form.robinsonCode}
                                    </span>
                                    <span className="text-xs text-gray-400">{form.frequency}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">
                                    {form.name}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-2">
                                    {form.description.slice(0, 150)}...
                                </p>
                                <div className="flex items-center text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-all">
                                    Study this case <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Participles & Infinitives Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <div className="inline-flex items-center space-x-2 text-indigo-600 font-semibold text-sm mb-4">
                            <BookOpenIcon className="w-4 h-4" />
                            <span>Verbal Nouns</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Participles &amp; Infinitives</h2>
                        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
                            Participles are verbal adjectives that describe ongoing or completed actions.
                            Infinitives express the basic idea of a verb without specifying a subject.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[...participles, ...infinitives].map((form) => (
                            <Link
                                key={form.slug}
                                href={`/greek-grammar/${form.slug}`}
                                className="group p-8 rounded-xl bg-white border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-5">
                                    <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-mono font-bold">
                                        {form.robinsonCode}
                                    </span>
                                    <span className="text-xs text-gray-400">{form.frequency}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">
                                    {form.name}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-2">
                                    {form.description.slice(0, 150)}...
                                </p>
                                <div className="flex items-center text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-all">
                                    Study this form <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto p-16 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-center relative overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1)_0%,_transparent_60%)]" />
                    <div className="relative z-10">
                        <div className="inline-flex items-center space-x-2 text-indigo-200 font-semibold text-sm mb-8">
                            <AcademicCapIcon className="w-5 h-5" />
                            <span>Deepen Your Study</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                            Go Deeper with Word Studies
                        </h2>
                        <p className="text-lg text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Combine grammar knowledge with individual word studies to unlock
                            the full meaning of the original Greek text.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/lexicon"
                                className="px-8 py-3.5 bg-white text-indigo-600 rounded-xl text-sm font-semibold shadow-sm hover:bg-gray-50 transition-colors flex items-center group"
                            >
                                <span>Greek Lexicon</span>
                                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/interlinear"
                                className="px-8 py-3.5 bg-indigo-500 text-white border border-indigo-400 rounded-xl text-sm font-semibold hover:bg-indigo-400 transition-colors flex items-center group"
                            >
                                <span>Interlinear Bible</span>
                                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Internal Links */}
            <section className="py-12 bg-gray-50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Related Resources</h2>
                    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                        <Link href="/lexicon" className="text-indigo-600 hover:underline text-sm">Greek &amp; Hebrew Lexicon</Link>
                        <Link href="/interlinear" className="text-indigo-600 hover:underline text-sm">Interlinear Bible</Link>
                        <Link href="/lexicon/browse/greek" className="text-indigo-600 hover:underline text-sm">Greek Word Index</Link>
                        <Link href="/bible-quizzes" className="text-indigo-600 hover:underline text-sm">Bible Quizzes</Link>
                        <Link href="/topics" className="text-indigo-600 hover:underline text-sm">Bible Topics</Link>
                        <Link href="/john-3-16" className="text-indigo-600 hover:underline text-sm">John 3:16 Study</Link>
                        <Link href="/romans-8-28" className="text-indigo-600 hover:underline text-sm">Romans 8:28 Study</Link>
                        <Link href="/bible-study-guides" className="text-indigo-600 hover:underline text-sm">Bible Study Guides</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
