import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGrammarForm, getAllGrammarForms, getRelatedForms } from '@/lib/grammar-data';
import { StructuredData } from '@/components/StructuredData';
import {
    BookOpenIcon,
    AcademicCapIcon,
    ArrowRightIcon,
    ChartBarIcon,
    SparklesIcon,
    BoltIcon,
} from '@/components/icons';

interface GrammarPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return [];
}

export async function generateMetadata({ params }: GrammarPageProps): Promise<Metadata> {
    const { slug } = await params;
    const form = getGrammarForm(slug);
    if (!form) return { title: 'Grammar Form Not Found' };

    const categoryLabel = form.category === 'noun' ? 'Noun Case' :
        form.category === 'participle' ? 'Greek Participle' :
        form.category === 'infinitive' ? 'Greek Infinitive' : 'Greek Verb Form';

    return {
        title: `${form.name} -- Greek Grammar in the New Testament | Bible Study Guide`,
        description: `Learn the ${form.name} (${form.robinsonCode}) in New Testament Greek. ${form.frequency}. See how this form appears in famous Bible verses like ${form.examples[0]?.verseRef || 'John 3:16'} and why it matters for Bible study.`,
        keywords: `${form.name.toLowerCase()} greek, greek grammar bible, ${form.name.toLowerCase()} new testament, biblical greek ${form.name.toLowerCase()}, ${form.robinsonCode}, ${categoryLabel.toLowerCase()}`,
        alternates: { canonical: `/greek-grammar/${slug}` },
    };
}

export default async function GrammarDetailPage({ params }: GrammarPageProps) {
    const { slug } = await params;
    const form = getGrammarForm(slug);

    if (!form) {
        notFound();
    }

    const allForms = getAllGrammarForms();
    const related = getRelatedForms(form.relatedForms);

    const categoryLabel = form.category === 'noun' ? 'Noun Case' :
        form.category === 'participle' ? 'Participle' :
        form.category === 'infinitive' ? 'Infinitive' : 'Verb Form';

    // Group all forms by category for the browse section
    const verbForms = allForms.filter(f => f.category === 'verb');
    const nounForms = allForms.filter(f => f.category === 'noun');
    const participleInfForms = allForms.filter(f => f.category === 'participle' || f.category === 'infinitive');

    // JSON-LD schemas
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${form.name} -- Greek Grammar in the New Testament`,
        description: form.description.slice(0, 300),
        url: `https://biblemaximum.com/greek-grammar/${slug}`,
        author: { '@type': 'Organization', name: 'Bible Maximum' },
        publisher: { '@type': 'Organization', name: 'Bible Maximum' },
        mainEntityOfPage: `https://biblemaximum.com/greek-grammar/${slug}`,
    };

    const definedTermSchema = {
        '@context': 'https://schema.org',
        '@type': 'DefinedTerm',
        name: form.name,
        description: form.description,
        inDefinedTermSet: {
            '@type': 'DefinedTermSet',
            name: 'New Testament Greek Grammar',
            url: 'https://biblemaximum.com/greek-grammar',
        },
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
            { '@type': 'ListItem', position: 2, name: 'Greek Grammar', item: 'https://biblemaximum.com/greek-grammar' },
            { '@type': 'ListItem', position: 3, name: form.name, item: `https://biblemaximum.com/greek-grammar/${slug}` },
        ],
    };

    return (
        <div className="bg-white min-h-screen">
            <StructuredData data={articleSchema} />
            <StructuredData data={definedTermSchema} />
            <StructuredData data={breadcrumbSchema} />

            {/* 1. Hero */}
            <section className="relative pt-16 pb-14 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/greek-grammar" className="hover:text-indigo-600 transition-colors">Greek Grammar</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{form.name}</span>
                    </nav>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase">
                            {categoryLabel}
                        </span>
                        <span className="px-3 py-1 rounded-lg bg-gray-900 text-white text-xs font-mono font-bold tracking-wider">
                            {form.robinsonCode}
                        </span>
                        <span className="px-3 py-1 rounded-lg bg-gray-50 text-gray-600 text-xs font-medium border border-gray-200">
                            {form.frequency}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                        {form.name}
                    </h1>

                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                        {form.description.split('.')[0]}.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

                {/* 2. Plain-language explanation */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <BookOpenIcon className="w-4 h-4" />
                        </span>
                        What is the {form.name}?
                    </h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        <p>{form.description}</p>
                    </div>
                </section>

                {/* 3. Why it matters */}
                <section className="bg-indigo-50 rounded-xl p-8 md:p-10 border border-indigo-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                            <SparklesIcon className="w-4 h-4" />
                        </span>
                        Why This Matters for Bible Study
                    </h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        <p>{form.whyItMatters}</p>
                    </div>
                </section>

                {/* 4. Famous verse examples */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <BoltIcon className="w-4 h-4" />
                        </span>
                        Famous Verses Using the {form.name}
                    </h2>

                    <div className="space-y-8">
                        {form.examples.map((ex, i) => (
                            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold">
                                        {ex.verseRef}
                                    </span>
                                    <Link
                                        href={`/lexicon/${ex.strongsNumber}`}
                                        className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-mono font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                    >
                                        {ex.strongsNumber}
                                    </Link>
                                </div>

                                <div className="mb-4">
                                    <span className="text-2xl font-bold text-indigo-700 font-mono tracking-wide">
                                        {ex.greek}
                                    </span>
                                    <span className="text-sm text-gray-500 ml-3 italic">
                                        ({ex.transliteration})
                                    </span>
                                    <span className="text-sm text-gray-500 ml-2">
                                        = &quot;{ex.english}&quot;
                                    </span>
                                </div>

                                <blockquote className="border-l-4 border-indigo-200 pl-4 mb-4 text-gray-700 italic leading-relaxed">
                                    &quot;{ex.verse}&quot;
                                </blockquote>

                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {ex.explanation}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Comparison table */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <ChartBarIcon className="w-4 h-4" />
                        </span>
                        How It Compares to Related Forms
                    </h2>

                    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 tracking-wider">Form</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 tracking-wider">Aspect / Function</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 tracking-wider">Example</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {form.comparison.map((comp, i) => {
                                    const isCurrentForm = comp.name === form.name;
                                    return (
                                        <tr
                                            key={i}
                                            className={isCurrentForm ? 'bg-indigo-50' : 'hover:bg-gray-50 transition-colors'}
                                        >
                                            <td className={`px-6 py-4 text-sm font-semibold ${isCurrentForm ? 'text-indigo-700' : 'text-gray-900'}`}>
                                                {comp.name}
                                                {isCurrentForm && (
                                                    <span className="ml-2 text-[10px] uppercase font-bold text-indigo-500 bg-indigo-100 px-1.5 py-0.5 rounded">
                                                        current
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{comp.aspect}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 font-mono">{comp.example}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 6. CRO - Apply What You've Learned */}
                <section className="bg-gray-900 rounded-xl p-8 md:p-10 text-white">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Apply What You Have Learned
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Put your knowledge of the {form.name} into practice with these resources.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* CTA: Word study */}
                        {form.examples[0] && (
                            <Link
                                href={`/lexicon/${form.examples[0].strongsNumber}`}
                                className="group p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                            >
                                <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center mb-4">
                                    <BookOpenIcon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-bold text-white mb-1">Word Study</h3>
                                <p className="text-gray-400 text-sm mb-3">
                                    Study {form.examples[0].greek} ({form.examples[0].strongsNumber})
                                </p>
                                <span className="text-indigo-400 text-sm font-medium flex items-center">
                                    Open study <ArrowRightIcon className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        )}

                        {/* CTA: Quiz */}
                        <Link
                            href="/bible-quizzes"
                            className="group p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                        >
                            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center mb-4">
                                <AcademicCapIcon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-bold text-white mb-1">Test Your Knowledge</h3>
                            <p className="text-gray-400 text-sm mb-3">
                                Quiz yourself on the verses discussed above
                            </p>
                            <span className="text-indigo-400 text-sm font-medium flex items-center">
                                Take a quiz <ArrowRightIcon className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>

                        {/* CTA: Related forms */}
                        {related[0] && (
                            <Link
                                href={`/greek-grammar/${related[0].slug}`}
                                className="group p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                            >
                                <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center mb-4">
                                    <SparklesIcon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-bold text-white mb-1">Related Form</h3>
                                <p className="text-gray-400 text-sm mb-3">
                                    Compare with the {related[0].name}
                                </p>
                                <span className="text-indigo-400 text-sm font-medium flex items-center">
                                    Explore <ArrowRightIcon className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        )}
                    </div>
                </section>

                {/* Related Forms Links */}
                {related.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Grammar Forms</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {related.map(r => (
                                <Link
                                    key={r.slug}
                                    href={`/greek-grammar/${r.slug}`}
                                    className="group flex items-center justify-between p-5 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition-all bg-white"
                                >
                                    <div>
                                        <span className="text-xs font-mono text-indigo-600 font-bold">{r.robinsonCode}</span>
                                        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{r.name}</h3>
                                    </div>
                                    <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* 7. Browse All Forms */}
                <section className="bg-gray-50 rounded-xl p-8 md:p-10 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse All Greek Grammar Forms</h2>

                    {/* Verbs */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider mb-4">Verb Forms ({verbForms.length})</h3>
                        <div className="flex flex-wrap gap-2">
                            {verbForms.map(f => (
                                <Link
                                    key={f.slug}
                                    href={`/greek-grammar/${f.slug}`}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                                        f.slug === slug
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                                    }`}
                                >
                                    {f.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Nouns */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider mb-4">Noun Cases ({nounForms.length})</h3>
                        <div className="flex flex-wrap gap-2">
                            {nounForms.map(f => (
                                <Link
                                    key={f.slug}
                                    href={`/greek-grammar/${f.slug}`}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                                        f.slug === slug
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                                    }`}
                                >
                                    {f.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Participles & Infinitives */}
                    <div>
                        <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider mb-4">Participles &amp; Infinitives ({participleInfForms.length})</h3>
                        <div className="flex flex-wrap gap-2">
                            {participleInfForms.map(f => (
                                <Link
                                    key={f.slug}
                                    href={`/greek-grammar/${f.slug}`}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                                        f.slug === slug
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                                    }`}
                                >
                                    {f.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 8. Internal Links */}
                <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Related Resources</h2>
                    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                        <Link href="/greek-grammar" className="text-indigo-600 hover:underline text-sm">All Greek Grammar Forms</Link>
                        <Link href="/lexicon" className="text-indigo-600 hover:underline text-sm">Greek &amp; Hebrew Lexicon</Link>
                        <Link href="/interlinear" className="text-indigo-600 hover:underline text-sm">Interlinear Bible</Link>
                        <Link href="/lexicon/browse/greek" className="text-indigo-600 hover:underline text-sm">Greek Word Index</Link>
                        <Link href="/john-3-16" className="text-indigo-600 hover:underline text-sm">John 3:16 Study</Link>
                        <Link href="/romans-8-28" className="text-indigo-600 hover:underline text-sm">Romans 8:28 Study</Link>
                        <Link href="/bible-quizzes" className="text-indigo-600 hover:underline text-sm">Bible Quizzes</Link>
                        <Link href="/topics" className="text-indigo-600 hover:underline text-sm">Bible Topics</Link>
                        <Link href="/bible-study-guides" className="text-indigo-600 hover:underline text-sm">Bible Study Guides</Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
