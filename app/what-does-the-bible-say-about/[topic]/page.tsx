import { cache } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTopic as _getTopic } from '@/lib/database/queries';
import { StructuredData } from '@/components/StructuredData';
import Link from 'next/link';

const getCachedTopic = cache(async (slug: string, includeVerses?: boolean) => {
    return _getTopic(slug, includeVerses);
});

// ------------------------------------
// Static params: top 25 topics only
// ------------------------------------

const TOP_25_SLUGS = [
    'love', 'strength', 'faith', 'death', 'healing',
    'anxiety', 'prayer', 'forgiveness', 'hope', 'marriage',
    'peace', 'patience', 'money', 'friendship', 'worry',
    'jealousy', 'fear', 'anger', 'gratitude', 'humility',
    'pride', 'temptation', 'salvation', 'grace', 'joy',
] as const;

type TopicSlug = typeof TOP_25_SLUGS[number];

const TOP_25_SET = new Set<string>(TOP_25_SLUGS);

export async function generateStaticParams() {
    return TOP_25_SLUGS.map((topic) => ({ topic }));
}

// ------------------------------------
// Per-topic introductions
// ------------------------------------

const TOPIC_INTROS: Record<TopicSlug, string> = {
    love: 'Love is the greatest commandment and the defining mark of a follower of Christ. Scripture reveals that God Himself is love, and that every act of genuine love flows from His character. From the sacrificial love demonstrated at the cross to the everyday love we are called to show our neighbours, the Bible presents love as both a divine attribute and a practical command.',
    strength: 'The Bible teaches that true strength does not come from human effort but from the Lord who renews those who wait on Him. Whether facing persecution, grief, or daily trials, Scripture calls believers to find their courage and endurance in God alone. The testimony of both Old and New Testaments shows that divine power is made perfect in human weakness.',
    faith: 'Faith is the substance of things hoped for, the evidence of things not seen. Throughout Scripture, men and women were commended for trusting God even when circumstances seemed impossible. The Bible reveals faith as the foundation of our relationship with God and the means by which we receive His promises.',
    death: 'Death entered the world through sin, yet the Bible transforms our understanding of it through the resurrection of Jesus Christ. Scripture addresses death honestly, acknowledging its sting while proclaiming the victory believers have through the gospel. From the Psalms to Revelation, God promises comfort and eternal life to those who trust in Him.',
    healing: 'God reveals Himself throughout Scripture as Jehovah Rapha, the Lord who heals. The Bible records physical healings, spiritual restoration, and emotional renewal as expressions of divine compassion. From the Old Testament promises to the ministry of Jesus and the early church, healing stands as a testimony to the power and mercy of God.',
    anxiety: 'The Bible speaks directly to those burdened by worry and anxiety, offering both commands and comfort. Scripture calls believers to cast their cares upon the Lord and to trust in His sovereign provision. Through prayer, thanksgiving, and the renewing of the mind, God provides peace that surpasses understanding.',
    prayer: 'Prayer is the believer\'s lifeline to God, woven throughout every book of the Bible. Scripture teaches that prayer is both a privilege and a discipline, ranging from desperate cries to quiet communion. The Bible provides models, instructions, and encouragements for a life devoted to conversation with the Almighty.',
    forgiveness: 'Forgiveness lies at the heart of the gospel message. The Bible teaches that God freely forgives those who repent, and calls His people to extend that same forgiveness to others. From the sacrificial system of the Old Testament to the cross of Christ, Scripture demonstrates the costliness and the freedom of forgiveness.',
    hope: 'Biblical hope is not wishful thinking but a confident expectation grounded in the character and promises of God. Scripture describes hope as an anchor for the soul, sustaining believers through suffering, persecution, and uncertainty. The Bible presents an unshakeable hope that culminates in the return of Christ and the restoration of all things.',
    marriage: 'The Bible presents marriage as a sacred covenant ordained by God from the very beginning of creation. Scripture uses marriage as a picture of Christ\'s relationship with the church, elevating it far beyond a mere social contract. From Genesis to Ephesians, the Bible provides wisdom for building a marriage that honours God.',
    peace: 'The Bible reveals peace as both a gift from God and a fruit of the Spirit. Scripture distinguishes the peace of God, which guards the heart, from the peace the world offers. Through Christ, believers have peace with God and are called to be peacemakers in every sphere of life.',
    patience: 'Scripture presents patience as an essential virtue developed through trials and sustained by faith. The Bible points to God Himself as the ultimate example of patience, slow to anger and abounding in steadfast love. Believers are called to wait on the Lord, endure hardship, and bear with one another in patience.',
    money: 'The Bible addresses money and possessions more frequently than nearly any other topic, revealing its potential to become either a tool for generosity or an idol of the heart. Scripture teaches contentment, stewardship, and the danger of loving wealth above God. From Proverbs to the teachings of Jesus, the Bible provides timeless wisdom for managing finances.',
    friendship: 'Scripture values friendship as a gift from God, describing a faithful friend as a strong defence. The Bible presents models of godly friendship, such as David and Jonathan, and warns against companions who lead into sin. True friendship, according to Scripture, is marked by loyalty, honesty, and sacrificial love.',
    worry: 'The Bible directly addresses the human tendency to worry, calling believers to trust in the sovereign care of their heavenly Father. Jesus Himself commanded His followers not to be anxious about tomorrow. Scripture provides both practical wisdom and spiritual assurance for overcoming the burden of worry.',
    jealousy: 'The Bible distinguishes between godly jealousy, which protects what is precious, and sinful jealousy, which destroys from within. Scripture warns that envy rots the bones and leads to every form of evil. God calls His people to contentment and trust, guarding their hearts against the corrosive power of jealousy.',
    fear: 'The command "fear not" appears throughout Scripture, spoken by God to His people in their most vulnerable moments. The Bible distinguishes between the fear of the Lord, which is the beginning of wisdom, and the spirit of fear that God has not given. Through faith, believers are empowered to face every circumstance with courage.',
    anger: 'The Bible does not forbid anger but instructs believers to be slow to anger and to sin not in their wrath. Scripture reveals that uncontrolled anger leads to destruction, while righteous indignation can serve justice. God\'s own anger is always just, measured, and redemptive, providing the model for how believers should handle this powerful emotion.',
    gratitude: 'Scripture commands thanksgiving as a posture of the heart and a response to God\'s faithfulness. The Bible reveals that gratitude transforms perspective, deepens faith, and opens the door to God\'s presence. From the Psalms of David to Paul\'s epistles, gratitude is presented as essential to the life of every believer.',
    humility: 'The Bible exalts humility as one of the most honoured virtues before God. Scripture teaches that God opposes the proud but gives grace to the humble. From Moses, described as the meekest man on earth, to Jesus washing His disciples\' feet, the Bible provides powerful examples of humility in action.',
    pride: 'Scripture identifies pride as the root of many sins and a direct affront to the holiness of God. The Bible warns that pride goes before destruction and a haughty spirit before a fall. From the fall of Lucifer to the humbling of Nebuchadnezzar, Scripture demonstrates the consequences of exalting oneself above God.',
    temptation: 'The Bible teaches that temptation is a universal human experience, yet provides clear instruction for overcoming it. Scripture reveals that God is faithful and will not allow His children to be tempted beyond what they can bear. From the temptation of Eve to the temptation of Christ, the Bible demonstrates both the danger and the defeat of temptation.',
    salvation: 'Salvation is the central message of the entire Bible, spanning from Genesis to Revelation. Scripture reveals that salvation is by grace through faith, not by works, and is accomplished through the death and resurrection of Jesus Christ. The Bible calls every person to repent and believe, promising eternal life to all who trust in the Saviour.',
    grace: 'Grace is the unmerited favour of God, freely given to sinners who deserve judgment. The Bible reveals grace as the foundation of salvation, the fuel for sanctification, and the hope of glorification. From the covering of Adam and Eve to the final invitation in Revelation, Scripture overflows with the boundless grace of God.',
    joy: 'The Bible presents joy not as a fleeting emotion tied to circumstances but as a deep, abiding gladness rooted in the Lord. Scripture commands believers to rejoice always, even in suffering, because their joy is found in an unchanging God. From the songs of Israel to the fruit of the Spirit, joy permeates the pages of the Bible.',
};

// ------------------------------------
// Per-topic study tips
// ------------------------------------

function getStudyTips(topicName: string): string[] {
    return [
        `Begin by reading through every verse listed on this page, noting which ones speak most directly to your current season of life. Write them down and revisit them throughout the week.`,
        `Use a concordance or the search tools on this site to find additional passages about ${topicName.toLowerCase()}. Look for patterns across both the Old and New Testaments to gain a complete picture of what God reveals on this subject.`,
        `Study the context of each verse. Read the surrounding chapter to understand who was speaking, who the audience was, and what circumstances prompted the passage. Context prevents misapplication.`,
        `Memorise at least one key verse about ${topicName.toLowerCase()} and meditate on it daily. Scripture memory transforms thinking and equips you to apply God's Word in real-time situations.`,
    ];
}

// ------------------------------------
// Per-topic practical application
// ------------------------------------

function getPracticalApplication(topicName: string): string[] {
    return [
        `Identify one area of your life where the biblical teaching on ${topicName.toLowerCase()} needs to be applied more consistently. Write a specific, actionable step you can take this week.`,
        `Share what you have learned about ${topicName.toLowerCase()} with a fellow believer or in a small group setting. Teaching others solidifies your own understanding and encourages mutual growth.`,
        `Pray through the key verses about ${topicName.toLowerCase()}, asking God to reveal how His Word applies to your relationships, decisions, and daily habits.`,
    ];
}

// ------------------------------------
// Page props
// ------------------------------------

interface WhatDoesBibleSayPageProps {
    params: Promise<{
        topic: string;
    }>;
}

// ------------------------------------
// Metadata
// ------------------------------------

export async function generateMetadata({ params }: WhatDoesBibleSayPageProps): Promise<Metadata> {
    const { topic: slug } = await params;

    if (!TOP_25_SET.has(slug)) return {};

    const topic = await getCachedTopic(slug);
    if (!topic) return {};

    const topicName = topic.name as string;
    const verseCount = topic.verseCount as number;
    const canonical = `https://biblemaximum.com/what-does-the-bible-say-about/${slug}`;

    const title = `What Does the Bible Say About ${topicName}? | ${verseCount} Scripture References with Commentary | Complete Bible Study Guide | Bible Maximum`;
    const description = `What does the Bible say about ${topicName.toLowerCase()}? Discover ${verseCount} key Bible verses about ${topicName.toLowerCase()} with full text, commentary, study tips, and practical application from both Old and New Testament.`;

    return {
        title,
        description,
        keywords: [
            `what does the bible say about ${topicName.toLowerCase()}`,
            `bible verses about ${topicName.toLowerCase()}`,
            `${topicName.toLowerCase()} in the bible`,
            `scriptures about ${topicName.toLowerCase()}`,
            `${topicName.toLowerCase()} bible study`,
            'Bible study guide',
            'Scripture references',
            'KJV Bible',
        ].join(', '),
        alternates: {
            canonical,
        },
        openGraph: {
            title,
            description,
            url: canonical,
            type: 'article',
            siteName: 'Bible Maximum',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

// ------------------------------------
// Page component
// ------------------------------------

export default async function WhatDoesBibleSayAboutPage({ params }: WhatDoesBibleSayPageProps) {
    const { topic: slug } = await params;

    if (!TOP_25_SET.has(slug)) {
        notFound();
    }

    const topic = await getCachedTopic(slug, true);
    if (!topic) {
        notFound();
    }

    const topicName = topic.name as string;
    const verseCount = topic.verseCount as number;
    const description = topic.description as string;
    const verses: any[] = (topic as any).verses || [];
    const topicSlug = slug as TopicSlug;
    const url = `/what-does-the-bible-say-about/${slug}`;

    const intro = TOPIC_INTROS[topicSlug];
    const studyTips = getStudyTips(topicName);
    const practicalSteps = getPracticalApplication(topicName);

    // Breadcrumb schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
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
                name: 'Bible Topics',
                item: 'https://biblemaximum.com/topics',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: `What Does the Bible Say About ${topicName}?`,
                item: `https://biblemaximum.com${url}`,
            },
        ],
    };

    // Article schema
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `What Does the Bible Say About ${topicName}?`,
        description: description,
        url: `https://biblemaximum.com${url}`,
        author: {
            '@type': 'Organization',
            name: 'Bible Maximum',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Bible Maximum',
            logo: {
                '@type': 'ImageObject',
                url: 'https://biblemaximum.com/logo.png',
            },
        },
        datePublished: '2025-01-01T00:00:00Z',
        dateModified: new Date().toISOString(),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://biblemaximum.com${url}`,
        },
    };

    // FAQ schema
    const bestVerse = verses.length > 0
        ? `${verses[0].bookName} ${verses[0].chapter}:${verses[0].verse} - "${verses[0].text.length > 150 ? verses[0].text.substring(0, 150) + '...' : verses[0].text}"`
        : `See our complete collection of scriptures about ${topicName.toLowerCase()}.`;

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: `What does the Bible say about ${topicName.toLowerCase()}?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `${description} The Bible contains ${verseCount} key verses about ${topicName.toLowerCase()} spanning both Old and New Testaments.`,
                },
            },
            {
                '@type': 'Question',
                name: `How many verses about ${topicName.toLowerCase()} are in the Bible?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `There are ${verseCount} key Bible verses about ${topicName.toLowerCase()} compiled in this study guide, drawn from books across both the Old and New Testaments.`,
                },
            },
            {
                '@type': 'Question',
                name: `What is the best verse about ${topicName.toLowerCase()}?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `One of the most well-known and frequently cited verses about ${topicName.toLowerCase()} is ${bestVerse}`,
                },
            },
        ],
    };

    const top10 = verses.slice(0, 10);

    return (
        <div className="min-h-screen bg-primary-light/30">
            <StructuredData data={breadcrumbSchema} />
            <StructuredData data={articleSchema} />
            <StructuredData data={faqSchema} />

            {/* Breadcrumb */}
            <nav className="bg-white border-b border-grace">
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <ol className="flex items-center flex-wrap gap-y-1 text-sm">
                        <li>
                            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
                        </li>
                        <li className="text-primary-dark/40 mx-2">/</li>
                        <li>
                            <Link href="/topics" className="text-blue-600 hover:underline">Bible Topics</Link>
                        </li>
                        <li className="text-primary-dark/40 mx-2">/</li>
                        <li className="text-primary-dark/70">What Does the Bible Say About {topicName}?</li>
                    </ol>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-8">

                {/* Hero */}
                <header className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-10">
                        <p className="text-blue-100 text-sm font-medium mb-2 tracking-wide uppercase">Complete Bible Study Guide</p>
                        <h1 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                            What Does the Bible Say About {topicName}?
                        </h1>
                        <p className="text-blue-100 mt-3 text-lg">{verseCount} Scripture references with full text and commentary</p>
                        <div className="mt-4">
                          <Link
                            href="/bible-quizzes"
                            className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md"
                          >
                            Test Your Knowledge of {topicName}
                          </Link>
                        </div>
                    </div>
                </header>

                {/* Introduction */}
                <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-8">
                    <h2 className="text-xl font-display font-bold text-scripture mb-4">
                        Understanding {topicName} in the Bible
                    </h2>
                    <p className="text-primary-dark/80 leading-relaxed mb-4">{intro}</p>
                    <p className="text-primary-dark/70 leading-relaxed">{description}</p>
                </section>

                {/* Top 10 Verses */}
                {top10.length > 0 && (
                    <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-8">
                        <h2 className="text-xl font-display font-bold text-scripture mb-6">
                            Top {Math.min(10, top10.length)} Verses About {topicName}
                        </h2>
                        <ol className="space-y-5 list-none">
                            {top10.map((v: any, i: number) => (
                                <li key={i} className="border-b border-grace/50 pb-5 last:border-b-0 last:pb-0">
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                                            {i + 1}
                                        </span>
                                        <div className="min-w-0">
                                            <Link
                                                href={`/verses/${v.book}/${v.chapter}/${v.verse}`}
                                                className="font-display font-semibold text-blue-600 hover:underline"
                                            >
                                                {v.bookName} {v.chapter}:{v.verse}
                                            </Link>
                                            <blockquote className="mt-2 text-primary-dark/80 leading-relaxed border-l-4 border-blue-600 pl-4 italic">
                                                &ldquo;{v.text}&rdquo;
                                            </blockquote>
                                            <span className="inline-block mt-2 text-xs text-primary-dark/50">{v.translation || 'KJV'}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </section>
                )}

                {/* Full Verse List */}
                {verses.length > 10 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-display font-bold text-scripture mb-6">
                            All {verses.length} Bible Verses About {topicName}
                        </h2>
                        <div className="space-y-4">
                            {verses.slice(10).map((verse: any, index: number) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-sm border border-grace p-6 hover:shadow-md transition-shadow"
                                >
                                    <blockquote className="text-primary-dark/80 leading-relaxed mb-4 border-l-4 border-blue-600 pl-4 italic">
                                        &ldquo;{verse.text}&rdquo;
                                    </blockquote>
                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={`/verses/${verse.book}/${verse.chapter}/${verse.verse}`}
                                            className="text-blue-600 font-medium hover:underline"
                                        >
                                            {verse.bookName} {verse.chapter}:{verse.verse}
                                        </Link>
                                        <span className="text-xs text-primary-dark/40">{verse.translation || 'KJV'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* How to Study */}
                <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-8">
                    <h2 className="text-xl font-display font-bold text-scripture mb-4">
                        How to Study {topicName} in the Bible
                    </h2>
                    <ol className="space-y-4 list-none">
                        {studyTips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-light border border-grace text-scripture text-sm font-bold flex items-center justify-center mt-0.5">
                                    {i + 1}
                                </span>
                                <p className="text-primary-dark/80 leading-relaxed">{tip}</p>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* Practical Application */}
                <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-8">
                    <h2 className="text-xl font-display font-bold text-scripture mb-4">
                        Practical Application
                    </h2>
                    <p className="text-primary-dark/70 leading-relaxed mb-4">
                        Studying what the Bible says about {topicName.toLowerCase()} is only the beginning. Scripture is meant to be lived out in daily obedience and faith. Here are practical steps to apply these truths:
                    </p>
                    <ul className="space-y-3">
                        {practicalSteps.map((step, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5" />
                                <p className="text-primary-dark/80 leading-relaxed">{step}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Topic Quiz Challenge */}
                <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 md:p-8 text-white mb-8">
                    <h2 className="text-xl md:text-2xl font-display font-bold mb-2">
                        How Well Do You Know What the Bible Says About {topicName}?
                    </h2>
                    <p className="text-blue-100 mb-4 max-w-2xl">
                        You have studied {verseCount} verses about {topicName.toLowerCase()}. Now test your knowledge with chapter-by-chapter quizzes covering the books where these verses appear.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/bible-quizzes"
                            className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md"
                        >
                            Take a Bible Quiz
                        </Link>
                        <Link
                            href="/bible-quiz-difficulty/easy"
                            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-colors border border-white/30"
                        >
                            Start with Easy Level
                        </Link>
                    </div>
                </section>

                {/* FAQ Section (visible on page) */}
                <section className="bg-white rounded-xl shadow-sm border border-grace p-6 mb-8">
                    <h2 className="text-xl font-display font-bold text-scripture mb-6">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-display font-semibold text-scripture mb-2">
                                What does the Bible say about {topicName.toLowerCase()}?
                            </h3>
                            <p className="text-primary-dark/70 leading-relaxed">
                                {description} The Bible contains {verseCount} key verses about {topicName.toLowerCase()} spanning both Old and New Testaments.
                            </p>
                        </div>
                        <div className="border-t border-grace/50 pt-6">
                            <h3 className="font-display font-semibold text-scripture mb-2">
                                How many verses about {topicName.toLowerCase()} are in the Bible?
                            </h3>
                            <p className="text-primary-dark/70 leading-relaxed">
                                There are {verseCount} key Bible verses about {topicName.toLowerCase()} compiled in this study guide, drawn from books across both the Old and New Testaments.
                            </p>
                        </div>
                        <div className="border-t border-grace/50 pt-6">
                            <h3 className="font-display font-semibold text-scripture mb-2">
                                What is the best verse about {topicName.toLowerCase()}?
                            </h3>
                            <p className="text-primary-dark/70 leading-relaxed">
                                One of the most well-known and frequently cited verses about {topicName.toLowerCase()} is {bestVerse}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Internal Links */}
                <section className="bg-white rounded-xl shadow-sm border border-grace p-6">
                    <h2 className="text-xl font-display font-bold text-scripture mb-4">
                        Continue Studying
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <Link
                            href={`/topics/${slug}`}
                            className="flex items-start gap-3 p-4 rounded-lg border border-grace/50 hover:border-blue-300 hover:bg-primary-light transition-colors group"
                        >
                            <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary-dark/40 group-hover:text-blue-500 whitespace-nowrap">
                                Topic
                            </span>
                            <div className="min-w-0">
                                <div className="text-sm font-medium text-scripture group-hover:text-blue-600 truncate">
                                    Bible Verses About {topicName}
                                </div>
                                <div className="text-xs text-primary-dark/60 mt-0.5">
                                    {verseCount} key scriptures with commentary
                                </div>
                            </div>
                        </Link>

                        <Link
                            href={`/nave-topics/${slug}`}
                            className="flex items-start gap-3 p-4 rounded-lg border border-grace/50 hover:border-blue-300 hover:bg-primary-light transition-colors group"
                        >
                            <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary-dark/40 group-hover:text-blue-500 whitespace-nowrap">
                                Reference
                            </span>
                            <div className="min-w-0">
                                <div className="text-sm font-medium text-scripture group-hover:text-blue-600 truncate">
                                    Nave&apos;s Topical: {topicName}
                                </div>
                                <div className="text-xs text-primary-dark/60 mt-0.5">
                                    Classic topical Bible reference
                                </div>
                            </div>
                        </Link>

                        <Link
                            href="/bible-quizzes"
                            className="flex items-start gap-3 p-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors group"
                        >
                            <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-white/70 whitespace-nowrap">
                                Quiz
                            </span>
                            <div className="min-w-0">
                                <div className="text-sm font-medium text-white truncate">
                                    Bible Quizzes
                                </div>
                                <div className="text-xs text-blue-100 mt-0.5">
                                    Test your knowledge of {topicName}
                                </div>
                            </div>
                        </Link>

                        <Link
                            href="/lexicon"
                            className="flex items-start gap-3 p-4 rounded-lg border border-grace/50 hover:border-blue-300 hover:bg-primary-light transition-colors group"
                        >
                            <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary-dark/40 group-hover:text-blue-500 whitespace-nowrap">
                                Lexicon
                            </span>
                            <div className="min-w-0">
                                <div className="text-sm font-medium text-scripture group-hover:text-blue-600 truncate">
                                    Hebrew &amp; Greek Lexicon
                                </div>
                                <div className="text-xs text-primary-dark/60 mt-0.5">
                                    Original language word studies
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Related Topics */}
                    {topic.relatedTopics && topic.relatedTopics.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-grace/50">
                            <h3 className="text-sm font-display font-semibold text-scripture mb-3">
                                Related Topics
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {topic.relatedTopics.slice(0, 12).map((rel: string, idx: number) => {
                                    const relSlug = rel;
                                    const relName = rel.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
                                    const isTop25 = TOP_25_SET.has(relSlug);
                                    return (
                                        <Link
                                            key={idx}
                                            href={isTop25 ? `/what-does-the-bible-say-about/${relSlug}` : `/topics/${relSlug}`}
                                            className="px-3 py-1.5 bg-primary-light/30 border border-grace rounded-lg text-sm text-primary-dark/80 hover:border-blue-300 hover:text-blue-600 transition-colors"
                                        >
                                            {relName}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
