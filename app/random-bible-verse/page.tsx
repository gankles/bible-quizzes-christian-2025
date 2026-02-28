import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';
import RandomVerseClient from './RandomVerseClient';

interface RandomVerse {
  reference: string;
  book: string;
  bookSlug: string;
  chapter: number;
  verse: number;
  endVerse?: number;
  text: string;
  theme: string;
  themeSlug: string;
}

const VERSE_POOL: RandomVerse[] = [
  { reference: 'John 3:16', book: 'John', bookSlug: 'john', chapter: 3, verse: 16, text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', theme: 'Salvation', themeSlug: 'salvation' },
  { reference: 'Jeremiah 29:11', book: 'Jeremiah', bookSlug: 'jeremiah', chapter: 29, verse: 11, text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.', theme: 'Hope', themeSlug: 'hope' },
  { reference: 'Philippians 4:13', book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 13, text: 'I can do all things through Christ which strengtheneth me.', theme: 'Strength', themeSlug: 'strength' },
  { reference: 'Proverbs 3:5\u20136', book: 'Proverbs', bookSlug: 'proverbs', chapter: 3, verse: 5, endVerse: 6, text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.', theme: 'Trust', themeSlug: 'trust' },
  { reference: 'Romans 8:28', book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 28, text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', theme: 'Providence', themeSlug: 'gods-promises' },
  { reference: 'Isaiah 41:10', book: 'Isaiah', bookSlug: 'isaiah', chapter: 41, verse: 10, text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.', theme: 'Courage', themeSlug: 'courage' },
  { reference: 'Psalm 23:1', book: 'Psalms', bookSlug: 'psalms', chapter: 23, verse: 1, text: 'The LORD is my shepherd; I shall not want.', theme: 'Comfort', themeSlug: 'comfort' },
  { reference: 'Matthew 11:28', book: 'Matthew', bookSlug: 'matthew', chapter: 11, verse: 28, text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.', theme: 'Rest', themeSlug: 'comfort' },
  { reference: 'Ephesians 2:8\u20139', book: 'Ephesians', bookSlug: 'ephesians', chapter: 2, verse: 8, endVerse: 9, text: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.', theme: 'Grace', themeSlug: 'grace' },
  { reference: 'John 14:6', book: 'John', bookSlug: 'john', chapter: 14, verse: 6, text: 'Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.', theme: 'Truth', themeSlug: 'jesus' },
  { reference: 'Romans 12:2', book: 'Romans', bookSlug: 'romans', chapter: 12, verse: 2, text: 'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.', theme: 'Transformation', themeSlug: 'faith' },
  { reference: 'Joshua 1:9', book: 'Joshua', bookSlug: 'joshua', chapter: 1, verse: 9, text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.', theme: 'Courage', themeSlug: 'courage' },
  { reference: 'Psalm 46:1', book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 1, text: 'God is our refuge and strength, a very present help in trouble.', theme: 'Refuge', themeSlug: 'comfort' },
  { reference: 'Isaiah 40:31', book: 'Isaiah', bookSlug: 'isaiah', chapter: 40, verse: 31, text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.', theme: 'Renewal', themeSlug: 'strength' },
  { reference: 'Romans 5:8', book: 'Romans', bookSlug: 'romans', chapter: 5, verse: 8, text: 'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.', theme: 'Love', themeSlug: 'love' },
  { reference: '1 Corinthians 13:4\u20137', book: '1 Corinthians', bookSlug: '1-corinthians', chapter: 13, verse: 4, endVerse: 7, text: 'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil; Rejoiceth not in iniquity, but rejoiceth in the truth; Beareth all things, believeth all things, hopeth all things, endureth all things.', theme: 'Love', themeSlug: 'love' },
  { reference: 'Hebrews 11:1', book: 'Hebrews', bookSlug: 'hebrews', chapter: 11, verse: 1, text: 'Now faith is the substance of things hoped for, the evidence of things not seen.', theme: 'Faith', themeSlug: 'faith' },
  { reference: 'Galatians 5:22\u201323', book: 'Galatians', bookSlug: 'galatians', chapter: 5, verse: 22, endVerse: 23, text: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law.', theme: 'Spiritual Fruit', themeSlug: 'holy-spirit' },
  { reference: 'Romans 6:23', book: 'Romans', bookSlug: 'romans', chapter: 6, verse: 23, text: 'For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.', theme: 'Salvation', themeSlug: 'salvation' },
  { reference: '2 Timothy 1:7', book: '2 Timothy', bookSlug: '2-timothy', chapter: 1, verse: 7, text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.', theme: 'Power', themeSlug: 'strength' },
  { reference: 'Psalm 119:105', book: 'Psalms', bookSlug: 'psalms', chapter: 119, verse: 105, text: 'Thy word is a lamp unto my feet, and a light unto my path.', theme: 'Guidance', themeSlug: 'wisdom' },
  { reference: 'Matthew 6:33', book: 'Matthew', bookSlug: 'matthew', chapter: 6, verse: 33, text: 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.', theme: 'Priorities', themeSlug: 'faith' },
  { reference: 'Philippians 4:6\u20137', book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 6, endVerse: 7, text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.', theme: 'Peace', themeSlug: 'peace' },
  { reference: 'John 8:32', book: 'John', bookSlug: 'john', chapter: 8, verse: 32, text: 'And ye shall know the truth, and the truth shall make you free.', theme: 'Freedom', themeSlug: 'freedom' },
  { reference: 'Genesis 1:1', book: 'Genesis', bookSlug: 'genesis', chapter: 1, verse: 1, text: 'In the beginning God created the heaven and the earth.', theme: 'Creation', themeSlug: 'creation' },
  { reference: 'Psalm 27:1', book: 'Psalms', bookSlug: 'psalms', chapter: 27, verse: 1, text: 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?', theme: 'Fearlessness', themeSlug: 'courage' },
  { reference: 'Isaiah 53:5', book: 'Isaiah', bookSlug: 'isaiah', chapter: 53, verse: 5, text: 'But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.', theme: 'Atonement', themeSlug: 'salvation' },
  { reference: 'Psalm 37:4', book: 'Psalms', bookSlug: 'psalms', chapter: 37, verse: 4, text: 'Delight thyself also in the LORD; and he shall give thee the desires of thine heart.', theme: 'Desire', themeSlug: 'faith' },
  { reference: 'Romans 10:9', book: 'Romans', bookSlug: 'romans', chapter: 10, verse: 9, text: 'That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.', theme: 'Confession', themeSlug: 'salvation' },
  { reference: 'Colossians 3:23', book: 'Colossians', bookSlug: 'colossians', chapter: 3, verse: 23, text: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men.', theme: 'Work', themeSlug: 'faith' },
  { reference: '1 Peter 5:7', book: '1 Peter', bookSlug: '1-peter', chapter: 5, verse: 7, text: 'Casting all your care upon him; for he careth for you.', theme: 'Anxiety', themeSlug: 'worry' },
  { reference: 'Lamentations 3:22\u201323', book: 'Lamentations', bookSlug: 'lamentations', chapter: 3, verse: 22, endVerse: 23, text: 'It is of the LORD\u2019s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.', theme: 'Faithfulness', themeSlug: 'gods-promises' },
  { reference: 'Psalm 139:14', book: 'Psalms', bookSlug: 'psalms', chapter: 139, verse: 14, text: 'I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.', theme: 'Identity', themeSlug: 'praise' },
  { reference: '2 Corinthians 5:17', book: '2 Corinthians', bookSlug: '2-corinthians', chapter: 5, verse: 17, text: 'Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.', theme: 'New Life', themeSlug: 'salvation' },
  { reference: 'John 16:33', book: 'John', bookSlug: 'john', chapter: 16, verse: 33, text: 'These things I have spoken unto you, that in me ye might have peace. In the world ye shall have tribulation: but be of good cheer; I have overcome the world.', theme: 'Overcoming', themeSlug: 'peace' },
  { reference: 'Matthew 28:19', book: 'Matthew', bookSlug: 'matthew', chapter: 28, verse: 19, text: 'Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost.', theme: 'Great Commission', themeSlug: 'evangelism' },
  { reference: 'Psalm 91:1', book: 'Psalms', bookSlug: 'psalms', chapter: 91, verse: 1, text: 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.', theme: 'Dwelling', themeSlug: 'protection' },
  { reference: 'Isaiah 26:3', book: 'Isaiah', bookSlug: 'isaiah', chapter: 26, verse: 3, text: 'Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.', theme: 'Peace', themeSlug: 'peace' },
  { reference: 'James 1:5', book: 'James', bookSlug: 'james', chapter: 1, verse: 5, text: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.', theme: 'Wisdom', themeSlug: 'wisdom' },
  { reference: 'Proverbs 18:10', book: 'Proverbs', bookSlug: 'proverbs', chapter: 18, verse: 10, text: 'The name of the LORD is a strong tower: the righteous runneth into it, and is safe.', theme: 'Protection', themeSlug: 'protection' },
  { reference: '1 John 1:9', book: '1 John', bookSlug: '1-john', chapter: 1, verse: 9, text: 'If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.', theme: 'Forgiveness', themeSlug: 'forgiveness' },
  { reference: 'Psalm 118:24', book: 'Psalms', bookSlug: 'psalms', chapter: 118, verse: 24, text: 'This is the day which the LORD hath made; we will rejoice and be glad in it.', theme: 'Joy', themeSlug: 'joy' },
  { reference: 'Hebrews 13:5', book: 'Hebrews', bookSlug: 'hebrews', chapter: 13, verse: 5, text: 'Let your conversation be without covetousness; and be content with such things as ye have: for he hath said, I will never leave thee, nor forsake thee.', theme: 'Contentment', themeSlug: 'trust' },
  { reference: 'Psalm 23:4', book: 'Psalms', bookSlug: 'psalms', chapter: 23, verse: 4, text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.', theme: 'Comfort', themeSlug: 'comfort' },
  { reference: 'Mark 10:27', book: 'Mark', bookSlug: 'mark', chapter: 10, verse: 27, text: 'And Jesus looking upon them saith, With men it is impossible, but not with God: for with God all things are possible.', theme: 'Faith', themeSlug: 'faith' },
  { reference: 'Deuteronomy 31:6', book: 'Deuteronomy', bookSlug: 'deuteronomy', chapter: 31, verse: 6, text: 'Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.', theme: 'Courage', themeSlug: 'courage' },
  { reference: 'Ephesians 4:32', book: 'Ephesians', bookSlug: 'ephesians', chapter: 4, verse: 32, text: 'And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ\u2019s sake hath forgiven you.', theme: 'Forgiveness', themeSlug: 'forgiveness' },
  { reference: 'Romans 8:38\u201339', book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 38, endVerse: 39, text: 'For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.', theme: 'Eternal Love', themeSlug: 'love' },
  { reference: 'Psalm 46:10', book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 10, text: 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.', theme: 'Stillness', themeSlug: 'peace' },
  { reference: 'Matthew 7:7', book: 'Matthew', bookSlug: 'matthew', chapter: 7, verse: 7, text: 'Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.', theme: 'Prayer', themeSlug: 'prayer' },
];

function getUniqueThemes(): string[] {
  const seen = new Set<string>();
  for (const v of VERSE_POOL) seen.add(v.theme);
  return Array.from(seen);
}

export const metadata: Metadata = {
  title: 'Random Bible Verse Generator \u2014 Get a Random Scripture Passage From the King James Bible (KJV) Instantly',
  description:
    'Generate a random Bible verse instantly from a curated pool of 50 powerful KJV scriptures. Click the button for a new random scripture about faith, hope, love, strength, comfort, salvation, and more. Perfect for daily devotionals, Bible study, and memorization.',
  keywords: [
    'random bible verse', 'random bible verse generator', 'random scripture',
    'random bible passage', 'bible verse generator', 'random KJV verse',
    'give me a random bible verse', 'surprise me bible verse', 'random scripture generator',
    'bible verse picker', 'random daily verse', 'bible verse randomizer',
  ],
  openGraph: {
    title: 'Random Bible Verse Generator \u2014 Instant KJV Scripture',
    description: 'Get a random Bible verse from 50 curated KJV scriptures. Perfect for daily devotionals and Bible study.',
    url: '/random-bible-verse',
    type: 'website',
  },
  alternates: { canonical: '/random-bible-verse' },
};

export default function RandomBibleVersePage() {
  const themes = getUniqueThemes();

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bible Quotes', item: 'https://biblemaximum.com/bible-quotes' },
      { '@type': 'ListItem', position: 3, name: 'Random Bible Verse' },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: 'Random Bible Verse Generator',
    description: metadata.description,
    url: 'https://biblemaximum.com/random-bible-verse',
    applicationCategory: 'ReligiousApplication',
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
  };

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How does the random Bible verse generator work?', acceptedAnswer: { '@type': 'Answer', text: 'Our random Bible verse generator selects a scripture at random from a curated pool of 50 powerful, well-known Bible verses from the King James Version. Each time you click the "Get Another Verse" button, a new passage is displayed with its full KJV text, theme, and links to study pages, chapter quizzes, and related quotes.' } },
      { '@type': 'Question', name: 'What Bible version are the random verses from?', acceptedAnswer: { '@type': 'Answer', text: 'All random verses are from the King James Version (KJV), first published in 1611. The KJV is one of the most widely read, memorized, and quoted English Bible translations, prized for its literary beauty and faithfulness to the original Hebrew and Greek manuscripts.' } },
      { '@type': 'Question', name: 'Can I use the random verse for daily devotionals?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. Many Christians use a random Bible verse as a starting point for daily devotional reading, prayer, and meditation. Click the button each morning for a fresh scripture, then use the study links to explore cross-references, commentary, and original-language word studies for deeper understanding.' } },
      { '@type': 'Question', name: 'What topics do the random verses cover?', acceptedAnswer: { '@type': 'Answer', text: 'The curated verse pool covers the core themes of Scripture: salvation, faith, hope, love, strength, courage, comfort, peace, prayer, guidance, grace, forgiveness, protection, joy, and more. Every major spiritual theme is represented to ensure each random verse offers meaningful encouragement.' } },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={collectionSchema} />
      <StructuredData data={faqSchema} />

      <Breadcrumb items={[
        { label: 'Bible Quotes', href: '/bible-quotes' },
        { label: 'Random Bible Verse' },
      ]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero */}
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mt-6 mb-8">
              <div className="relative h-48 md:h-56 bg-gradient-to-r from-amber-800 to-amber-900">
                <Image src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png" alt="Random Bible Verse Generator" fill className="object-cover opacity-25" priority />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Random Bible Verse Generator</h1>
                  <p className="text-amber-100 max-w-2xl">Get a random scripture passage from the King James Bible instantly. {VERSE_POOL.length} curated verses covering salvation, faith, hope, love, strength, comfort, and more.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Random Verse Client Component */}
        <RandomVerseClient verses={VERSE_POOL} />

        {/* NLP Article */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-3">Why Use a Random Bible Verse Generator?</h2>
            <div className="text-primary-dark/80 leading-relaxed space-y-3">
              <p>A <strong>random Bible verse generator</strong> is a simple yet powerful tool for Christians looking to discover new scripture passages or break out of familiar reading patterns. While many believers return to the same well-known verses -- John 3:16, Psalm 23, Romans 8:28 -- a random scripture picker introduces you to passages you may have overlooked, sparking fresh insight and deeper devotional engagement with God&apos;s Word.</p>
              <p>The concept is rooted in the conviction that all Scripture is &ldquo;given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness&rdquo; (2 Timothy 3:16, KJV). Every verse in the Bible carries divine truth. A random verse generator simply removes the decision fatigue of choosing where to read next, making it especially useful for daily devotionals, prayer time, Bible journaling, or scripture memorization challenges.</p>
              <p>Our curated pool of {VERSE_POOL.length} verses is drawn from the <strong>King James Version</strong> and spans the full breadth of biblical themes: salvation and the gospel message, faith and trust in God, hope and encouragement, love and forgiveness, strength and courage, peace and comfort, prayer and worship, wisdom and guidance. Each verse links to a full study page with cross-references, original-language word studies from the Hebrew and Greek, and a chapter quiz so you can test your knowledge after reading.</p>
            </div>
          </div>
        </section>

        {/* Browse All Verses */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">All {VERSE_POOL.length} Verses in the Pool</h2>
            <p className="text-sm text-primary-dark/70 mb-5">Browse the complete curated collection. Click any verse to study it in depth.</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {VERSE_POOL.map(v => (
                <Link key={v.reference} href={`/verses/${v.bookSlug}/${v.chapter}/${v.verse}`} className="text-sm text-blue-600 hover:underline py-1">{v.reference} <span className="text-primary-dark/40">-- {v.theme}</span></Link>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-Content CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 md:p-8 text-white">
            <h2 className="text-xl md:text-2xl font-display font-bold mb-2">Know These Verses? Prove It.</h2>
            <p className="text-blue-100 mb-4 max-w-2xl">Take a chapter quiz from any book of the Bible. 15 questions per quiz with instant scoring and verse-by-verse explanations.</p>
            <Link href="/bible-quizzes" className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md">Take a Quiz Now</Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-scripture mb-1">How does the random Bible verse generator work?</h3>
                <p className="text-primary-dark/80 leading-relaxed">Our random Bible verse generator selects a scripture at random from a curated pool of {VERSE_POOL.length} powerful, well-known Bible verses from the King James Version. Each time you click &ldquo;Get Another Verse,&rdquo; a new passage is displayed with its full KJV text, theme, and links to study pages, chapter quizzes, and related Bible quotes.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What Bible version are the random verses from?</h3>
                <p className="text-primary-dark/80 leading-relaxed">All random verses are from the King James Version (KJV), first published in 1611. The KJV is one of the most widely read, memorized, and quoted English Bible translations, known for its literary beauty and faithfulness to the original manuscripts.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">Can I use the random verse for daily devotionals?</h3>
                <p className="text-primary-dark/80 leading-relaxed">Absolutely. Many Christians use a random Bible verse as a starting point for daily devotional reading, prayer, and meditation. Click the button each morning for a fresh scripture, then use the study links to explore cross-references, commentary, and original-language word studies.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What topics do the random verses cover?</h3>
                <p className="text-primary-dark/80 leading-relaxed">The curated verse pool covers the core themes of Scripture: salvation, faith, hope, love, strength, courage, comfort, peace, prayer, guidance, grace, forgiveness, protection, joy, and more. Every major spiritual theme is represented.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">Continue Exploring Scripture</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              <Link href="/bible-quizzes" className="flex items-center px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"><span>Bible Quizzes</span></Link>
              <Link href="/bible-verse-of-the-day" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Verse of the Day</span></Link>
              <Link href="/popular-bible-verses" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">100 Most Popular Verses</span></Link>
              <Link href="/famous-bible-verses" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Famous Bible Verses</span></Link>
              <Link href="/bible-quotes" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Quotes Hub</span></Link>
              <Link href="/devotionals" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Daily Devotionals</span></Link>
              <Link href="/reading-plans" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Reading Plans</span></Link>
              <Link href="/cross-references" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Cross References</span></Link>
              <Link href="/topics" className="flex items-center px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 transition-all group"><span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Topics</span></Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
