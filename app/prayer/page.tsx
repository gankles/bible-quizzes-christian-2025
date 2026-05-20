import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';

const SITE_URL = 'https://biblemaximum.com';

export const metadata: Metadata = {
  title: 'What Is Prayer? — Complete Bible Guide to How, Why & When to Pray | Bible Maximum',
  description: 'What is prayer? A complete guide covering the biblical definition, types of prayer, how Jesus prayed, prayer in the Old and New Testament, Greek and Hebrew word study, famous prayers in the Bible, and practical tips for building a prayer life.',
  keywords: ['what is prayer', 'prayer', 'how to pray', 'prayer in the bible', 'types of prayer', 'biblical prayer', 'prayer meaning', 'why pray', 'prayer guide', 'how did Jesus pray', 'prayer examples bible', 'power of prayer', 'prayer life', 'prayer definition', 'christian prayer', 'prayer verses'],
  alternates: { canonical: '/prayer' },
  openGraph: {
    title: 'What Is Prayer? — The Complete Bible Guide',
    description: 'Everything the Bible teaches about prayer — definition, types, examples, Greek/Hebrew words, and how to build a prayer life that actually works.',
    url: `${SITE_URL}/prayer`,
    type: 'article',
    images: ['/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png'],
  },
};

// ─── Data Arrays ─────────────────────────────────────────────

const TYPES_OF_PRAYER = [
  { type: 'Adoration (Praise)', greek: 'proskuneō (προσκυνέω)', description: 'Worshiping God for who He is — not for what He gives. Praise focuses on His character: holy, loving, sovereign, faithful.', example: 'Psalm 145:3 — "Great is the Lord, and greatly to be praised; and his greatness is unsearchable."', color: 'blue' },
  { type: 'Confession', greek: 'exomologeō (ἐξομολογέω)', description: 'Agreeing with God about your sin. Not making excuses, not minimizing — just honest acknowledgment. Confession restores fellowship.', example: '1 John 1:9 — "If we confess our sins, he is faithful and just to forgive us our sins."', color: 'red' },
  { type: 'Thanksgiving', greek: 'eucharistia (εὐχαριστία)', description: 'Expressing gratitude for what God has done. Thanksgiving shifts your focus from problems to provision.', example: '1 Thessalonians 5:18 — "In every thing give thanks: for this is the will of God."', color: 'green' },
  { type: 'Supplication (Petition)', greek: 'deēsis (δέησις)', description: 'Asking God for specific needs — yours and others\'. God invites requests. He\'s not annoyed by your asking; He\'s honored by it.', example: 'Philippians 4:6 — "Let your requests be made known unto God."', color: 'amber' },
  { type: 'Intercession', greek: 'enteuxis (ἔντευξις)', description: 'Praying on behalf of others. Standing in the gap between someone else\'s need and God\'s power. Jesus does this for us right now (Romans 8:34).', example: '1 Timothy 2:1 — "I exhort therefore, that...supplications, prayers, intercessions...be made for all men."', color: 'purple' },
  { type: 'Lament', greek: 'thrēneō (θρηνέω)', description: 'Crying out to God in pain, grief, or confusion. Over a third of the Psalms are laments. God doesn\'t require polished prayers — He welcomes raw honesty.', example: 'Psalm 13:1 — "How long wilt thou forget me, O Lord? for ever?"', color: 'gray' },
];

const GREEK_HEBREW_WORDS = [
  { word: 'proseuche (προσευχή)', language: 'Greek', meaning: 'Prayer (general)', significance: 'The most common NT word for prayer. Used 36 times. Combines pros (toward) + euche (a wish/vow). Prayer is directing your deepest desires toward God.' },
  { word: 'deēsis (δέησις)', language: 'Greek', meaning: 'Petition, supplication', significance: 'Urgent, specific request arising from a felt need. Used when the situation is pressing — not casual prayer but desperate asking.' },
  { word: 'enteuxis (ἔντευξις)', language: 'Greek', meaning: 'Intercession, petition', significance: 'Originally meant "to meet with" a king to make a petition. Prayer is getting an audience with the King of the universe.' },
  { word: 'eucharistia (εὐχαριστία)', language: 'Greek', meaning: 'Thanksgiving, gratitude', significance: 'Root of "Eucharist." Every prayer should include thanksgiving. Paul says pray "with thanksgiving" (Philippians 4:6).' },
  { word: 'palal (פָּלַל)', language: 'Hebrew', meaning: 'To pray, intercede, judge', significance: 'The primary OT word for prayer. Literally means "to judge oneself" — prayer involves self-examination before God.' },
  { word: 'tephillah (תְּפִלָּה)', language: 'Hebrew', meaning: 'Prayer, hymn', significance: 'Used 77 times in the OT. The title of 5 psalms. Covers both spoken prayer and sung worship — the line between prayer and praise is thin.' },
  { word: 'shaal (שָׁאַל)', language: 'Hebrew', meaning: 'To ask, inquire, request', significance: 'Used when someone asks God for specific guidance or provision. Samuel\'s name comes from this root — Hannah "asked" God for a son.' },
];

const FAMOUS_PRAYERS = [
  { who: 'Moses', occasion: 'After the Golden Calf', ref: 'Exodus 32:11-14', summary: 'Moses talked God out of destroying Israel. He argued from God\'s own promises — and God relented. The boldest prayer in the OT.', result: 'God spared Israel' },
  { who: 'Hannah', occasion: 'Barren and desperate', ref: '1 Samuel 1:10-17', summary: 'She prayed so intensely that Eli thought she was drunk. God gave her Samuel — who became one of Israel\'s greatest prophets.', result: 'God gave her a son' },
  { who: 'Solomon', occasion: 'Temple dedication', ref: '1 Kings 8:22-53', summary: 'The longest recorded prayer in the Bible. Solomon asked God to hear every kind of prayer offered in the temple — from foreigners to sinners.', result: 'Fire fell from heaven' },
  { who: 'Elijah', occasion: 'Mount Carmel showdown', ref: '1 Kings 18:36-37', summary: 'A 63-word prayer that called fire from heaven in front of 850 false prophets. Short, direct, and devastatingly effective.', result: 'Fire consumed the sacrifice' },
  { who: 'Hezekiah', occasion: 'Facing Assyrian army', ref: '2 Kings 19:15-19', summary: 'Jerusalem was surrounded by the most powerful army on earth. Hezekiah spread the threatening letter before God and prayed. That night, 185,000 Assyrians died.', result: '185,000 enemies destroyed' },
  { who: 'Daniel', occasion: 'In captivity in Babylon', ref: 'Daniel 9:3-19', summary: 'Daniel confessed Israel\'s sins and pleaded for restoration. He prayed with fasting, sackcloth, and ashes. God sent the angel Gabriel in response.', result: 'Angel Gabriel sent with answer' },
  { who: 'Jesus', occasion: 'Gethsemane', ref: 'Matthew 26:39-42', summary: '"Not my will, but thine, be done." The most agonizing prayer ever prayed. Jesus sweat drops of blood — yet submitted to the Father\'s plan.', result: 'Submitted to the cross' },
  { who: 'Jesus', occasion: 'On the cross', ref: 'Luke 23:34', summary: '"Father, forgive them; for they know not what they do." He prayed for the people who were killing Him. That\'s what divine love looks like.', result: 'Forgiveness offered to killers' },
  { who: 'Stephen', occasion: 'Being stoned to death', ref: 'Acts 7:59-60', summary: 'The first Christian martyr echoed Jesus\' prayer: "Lord, lay not this sin to their charge." Saul of Tarsus was watching — and was later converted.', result: 'Died forgiving his killers' },
  { who: 'Paul & Silas', occasion: 'Beaten and jailed', ref: 'Acts 16:25-26', summary: 'At midnight, bloody and chained, they sang hymns and prayed. An earthquake broke every chain in the prison. The jailer got saved that night.', result: 'Earthquake, jailer saved' },
];

const LORDS_PRAYER_BREAKDOWN = [
  { phrase: 'Our Father which art in heaven', meaning: 'Prayer starts with relationship. God isn\'t a distant force — He\'s your Father. "Our" means prayer is communal, not just individual.', element: 'Relationship' },
  { phrase: 'Hallowed be thy name', meaning: 'Before asking for anything, honor God\'s name. "Hallowed" means set apart as holy. Prayer begins with worship, not requests.', element: 'Worship' },
  { phrase: 'Thy kingdom come', meaning: 'Pray for God\'s rule to advance — in your life, your community, the world. This is the biggest prayer you can pray.', element: 'God\'s Agenda' },
  { phrase: 'Thy will be done in earth, as it is in heaven', meaning: 'Surrender your plans to God\'s plans. In heaven, God\'s will is done perfectly. Pray for earth to match.', element: 'Surrender' },
  { phrase: 'Give us this day our daily bread', meaning: 'Ask for today\'s needs — not next year\'s. God provides one day at a time, teaching dependence.', element: 'Provision' },
  { phrase: 'And forgive us our debts, as we forgive our debtors', meaning: 'Confession and forgiveness are linked. You can\'t receive God\'s forgiveness while refusing to forgive others.', element: 'Forgiveness' },
  { phrase: 'And lead us not into temptation, but deliver us from evil', meaning: 'Ask God to guide you away from situations that would destroy you. Spiritual warfare is real — pray for protection.', element: 'Protection' },
  { phrase: 'For thine is the kingdom, and the power, and the glory, for ever', meaning: 'End where you started — with God. The kingdom is His, the power is His, the glory is His. Prayer is not about you.', element: 'Doxology' },
];

const PRAYER_VERSES = [
  { ref: 'Philippians 4:6-7', text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.' },
  { ref: '1 Thessalonians 5:17', text: 'Pray without ceasing.' },
  { ref: 'James 5:16', text: 'The effectual fervent prayer of a righteous man availeth much.' },
  { ref: 'Jeremiah 33:3', text: 'Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not.' },
  { ref: 'Matthew 7:7-8', text: 'Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you: For every one that asketh receiveth; and he that seeketh findeth; and to him that knocketh it shall be opened.' },
  { ref: 'Romans 8:26', text: 'Likewise the Spirit also helpeth our infirmities: for we know not what we should pray for as we ought: but the Spirit itself maketh intercession for us with groanings which cannot be uttered.' },
  { ref: 'Matthew 6:6', text: 'But thou, when thou prayest, enter into thy closet, and when thou hast shut thy door, pray to thy Father which is in secret; and thy Father which seeth in secret shall reward thee openly.' },
  { ref: 'Mark 11:24', text: 'Therefore I say unto you, What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them.' },
  { ref: 'Psalm 145:18', text: 'The Lord is nigh unto all them that call upon him, to all that call upon him in truth.' },
  { ref: 'John 15:7', text: 'If ye abide in me, and my words abide in you, ye shall ask what ye will, and it shall be done unto you.' },
  { ref: '1 John 5:14', text: 'And this is the confidence that we have in him, that, if we ask any thing according to his will, he heareth us.' },
  { ref: 'Hebrews 4:16', text: 'Let us therefore come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need.' },
];

const FAQ_ITEMS = [
  { question: 'What is prayer according to the Bible?', answer: 'Prayer is communication with God — talking to Him and listening for His response. The Bible uses multiple words for prayer: the Hebrew palal (to judge oneself before God), the Greek proseuche (directing desires toward God), and deēsis (urgent petition). Prayer includes praise, confession, thanksgiving, and requests. It\'s not a religious ritual but a relationship — a child talking to their Father (Matthew 6:9).' },
  { question: 'Why should I pray if God already knows everything?', answer: 'God doesn\'t need information from your prayers — He needs relationship. Prayer changes you, not God. It aligns your heart with His will, builds dependence on Him, and deepens intimacy. Jesus knew the Father\'s will perfectly yet prayed constantly (Mark 1:35). Prayer isn\'t about informing God; it\'s about connecting with Him.' },
  { question: 'How did Jesus pray?', answer: 'Jesus prayed early in the morning (Mark 1:35), alone on mountains (Luke 6:12), before major decisions (Luke 6:12-13), in crisis (Matthew 26:36-44), and on the cross (Luke 23:34, 46). He prayed with tears (Hebrews 5:7), with submission ("not my will but thine"), and with confidence ("Father, I thank thee that thou hast heard me" — John 11:41). He taught His disciples the Lord\'s Prayer as a model (Matthew 6:9-13).' },
  { question: 'Does God answer every prayer?', answer: 'God hears every prayer from His children (1 John 5:14), but He answers in three ways: yes, no, or wait. Paul prayed three times for his "thorn" to be removed — God said no, because "my grace is sufficient" (2 Corinthians 12:8-9). Sometimes God\'s "no" is better than your "yes." The key condition is praying "according to his will" (1 John 5:14) — not demanding your agenda but trusting His.' },
  { question: 'What is the Lord\'s Prayer?', answer: 'The Lord\'s Prayer (Matthew 6:9-13) is the prayer model Jesus gave His disciples. It contains 7 elements: relationship ("Our Father"), worship ("hallowed be thy name"), God\'s agenda ("thy kingdom come"), surrender ("thy will be done"), provision ("daily bread"), forgiveness ("forgive us our debts"), and protection ("deliver us from evil"). It\'s a template, not a script — Jesus intended for us to pray like this, not just recite these exact words.' },
  { question: 'Can I pray about anything?', answer: 'Yes. Philippians 4:6 says "in every thing by prayer...let your requests be made known unto God." No concern is too small and no request is too big. God cares about your job, your health, your relationships, your finances, and your fears. The only limitation is sin — if you\'re harboring unconfessed sin, it hinders prayer (Psalm 66:18). But the topic? Anything.' },
  { question: 'How long should I pray?', answer: 'The Bible gives no required length. Jesus criticized long prayers meant to impress others (Matthew 6:7) but also prayed all night Himself (Luke 6:12). Elijah\'s prayer on Mount Carmel was 63 words. The tax collector\'s prayer was 7 words: "God be merciful to me a sinner" (Luke 18:13). Quality matters more than quantity. A 30-second honest prayer beats a 30-minute distracted one.' },
  { question: 'Do I need to pray out loud?', answer: 'No. Hannah prayed silently and God heard her (1 Samuel 1:13). God knows your thoughts before you speak them (Psalm 139:4). However, praying out loud can help focus your mind, and corporate prayer requires spoken words. Both are valid — choose whatever helps you engage honestly with God.' },
  { question: 'What does "pray without ceasing" mean?', answer: '1 Thessalonians 5:17 doesn\'t mean you must be on your knees 24/7. It means maintaining a constant awareness of God\'s presence throughout your day — a running conversation. Quick prayers while driving, silent thanks during a meal, a moment of confession after losing your temper. Prayer becomes a posture, not just an event.' },
  { question: 'Why do some prayers seem unanswered?', answer: 'Several biblical reasons: unconfessed sin (Isaiah 59:2), wrong motives (James 4:3), lack of faith (James 1:6-7), God\'s timing differs from yours (Habakkuk 2:3), or God has a better plan (2 Corinthians 12:8-9). Also, some prayers ARE answered — just not the way you expected. God sometimes says "I have something better in mind."' },
  { question: 'Should I pray to Jesus, the Father, or the Holy Spirit?', answer: 'The normal biblical pattern is praying to the Father, through the Son, in the power of the Spirit (Ephesians 2:18). Jesus taught us to pray "Our Father" (Matthew 6:9). However, Stephen prayed directly to Jesus (Acts 7:59), and the Spirit intercedes for us (Romans 8:26). All three persons of the Trinity are God — you can address any of them. The Father is the most common biblical pattern.' },
  { question: 'What is intercessory prayer?', answer: 'Intercession is praying on behalf of someone else — standing in the gap between their need and God\'s power. Abraham interceded for Sodom (Genesis 18:23-32), Moses interceded for Israel (Exodus 32:11-14), and Jesus intercedes for all believers right now (Romans 8:34, Hebrews 7:25). Paul asked churches to intercede for him (Ephesians 6:19). It\'s one of the most powerful things you can do for another person.' },
];

function verseRefToPath(ref: string): string {
  const m = ref.match(/^(\d?\s*[A-Za-z]+)\s+(\d+):(\d+)/);
  if (!m) return '#';
  const book = m[1].trim().toLowerCase().replace(/\s+/g, '-');
  return `/cross-references/${book}/${m[2]}/${m[3]}`;
}


export default function PrayerPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    additionalType: 'https://schema.org/LearningResource',
    headline: 'What Is Prayer? — Complete Bible Guide',
    description: 'Everything the Bible teaches about prayer — definition, types, examples, word study, and practical guidance.',
    url: `${SITE_URL}/prayer`,
    datePublished: '2026-03-09',
    dateModified: '2026-03-09',
    wordCount: 12000,
    image: `${SITE_URL}/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png`,
    author: { '@type': 'Organization', name: 'Bible Maximum', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/prayer` },
    about: [
      { '@type': 'Thing', name: 'Prayer', sameAs: 'https://www.wikidata.org/wiki/Q40953' },
      { '@type': 'Thing', name: 'Christian prayer', sameAs: 'https://www.wikidata.org/wiki/Q2460317' },
    ],
    mentions: [
      { '@type': 'Thing', name: 'Lord\'s Prayer', sameAs: 'https://www.wikidata.org/wiki/Q51674' },
      { '@type': 'Thing', name: 'Jesus', sameAs: 'https://www.wikidata.org/wiki/Q302' },
      { '@type': 'Thing', name: 'Book of Psalms', sameAs: 'https://www.wikidata.org/wiki/Q41064' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Bible Study', item: `${SITE_URL}/bible-quizzes` },
      { '@type': 'ListItem', position: 3, name: 'Prayer', item: `${SITE_URL}/prayer` },
    ],
  };

  return (
    <div className="min-h-screen bg-primary-light/30 dark:bg-dark-bg">
      <StructuredData data={articleSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-dark-surface border-b border-grace dark:border-dark-border">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <ol className="flex items-center flex-wrap gap-y-1 text-sm">
            <li><Link href="/" className="text-sacred hover:underline">Home</Link></li>
            <li className="text-ink-light mx-2">/</li>
            <li><Link href="/bible-quizzes" className="text-sacred hover:underline">Bible Study</Link></li>
            <li className="text-ink-light mx-2">/</li>
            <li className="text-ink-muted font-medium">Prayer</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative bg-scripture dark:bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png"
            alt="What is prayer — a complete Bible guide to talking with God"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-sacred text-sm font-semibold tracking-wider uppercase mb-3">Complete Bible Study Guide</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-display leading-tight mb-4">What Is Prayer?</h1>
          <p className="text-lg md:text-xl text-sacred-light/90 max-w-2xl mx-auto leading-relaxed mb-6">
            Prayer isn&apos;t a religious obligation — it&apos;s a conversation with the God of the universe who actually listens. Here&apos;s everything the Bible says about how, why, and when to pray.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="#what-is-prayer" className="inline-block bg-white text-scripture font-bold px-6 py-3 rounded-lg hover:bg-sacred-light transition-colors">
              Start Reading
            </Link>
            <Link href="#lords-prayer" className="inline-block border-2 border-white/40 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              The Lord&apos;s Prayer
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-scripture dark:text-sacred">650+</p>
            <p className="text-xs text-ink-muted dark:text-ink-light mt-1">Prayers in the Bible</p>
          </div>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-scripture dark:text-sacred">6</p>
            <p className="text-xs text-ink-muted dark:text-ink-light mt-1">Types of Prayer</p>
          </div>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-scripture dark:text-sacred">7</p>
            <p className="text-xs text-ink-muted dark:text-ink-light mt-1">Greek/Hebrew Words</p>
          </div>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-scripture dark:text-sacred">10</p>
            <p className="text-xs text-ink-muted dark:text-ink-light mt-1">Famous Bible Prayers</p>
          </div>
        </div>

        {/* Table of Contents */}
        <nav id="toc" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm p-6 mb-10 scroll-mt-20">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-3">In This Guide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
            <Link href="#what-is-prayer" className="text-sacred hover:underline text-sm py-1">What Is Prayer?</Link>
            <Link href="#types" className="text-sacred hover:underline text-sm py-1">6 Types of Prayer</Link>
            <Link href="#lords-prayer" className="text-sacred hover:underline text-sm py-1">The Lord&apos;s Prayer Explained</Link>
            <Link href="#greek-hebrew" className="text-sacred hover:underline text-sm py-1">Greek &amp; Hebrew Word Study</Link>
            <Link href="#how-jesus-prayed" className="text-sacred hover:underline text-sm py-1">How Jesus Prayed</Link>
            <Link href="#famous-prayers" className="text-sacred hover:underline text-sm py-1">10 Famous Prayers in the Bible</Link>
            <Link href="#prayer-verses" className="text-sacred hover:underline text-sm py-1">12 Key Prayer Verses</Link>
            <Link href="#why-pray" className="text-sacred hover:underline text-sm py-1">Why Pray If God Knows Everything?</Link>
            <Link href="#build-prayer-life" className="text-sacred hover:underline text-sm py-1">How to Build a Prayer Life</Link>
            <Link href="#unanswered" className="text-sacred hover:underline text-sm py-1">When Prayer Feels Unanswered</Link>
            <Link href="#faq" className="text-sacred hover:underline text-sm py-1">Common Questions</Link>
            <Link href="#study-links" className="text-sacred hover:underline text-sm py-1">Continue Your Study</Link>
          </div>
        </nav>

        {/* What Is Prayer */}
        <section id="what-is-prayer" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">What Is Prayer?</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            Prayer is talking to God. That&apos;s it. Not a formula, not a ritual, not a performance for an audience. It&apos;s a child speaking to their Father — honestly, directly, about anything.
          </p>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            The Hebrew word <em>palal</em> literally means &ldquo;to judge oneself&rdquo; — prayer forces you to examine your own heart before a holy God. The Greek word <em>proseuche</em> combines <em>pros</em> (toward) and <em>euche</em> (a wish or vow) — directing your deepest desires toward God. Both definitions reveal something important: prayer changes <em>you</em> as much as it changes your circumstances.
          </p>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            The Bible records over 650 prayers — from Abraham bargaining with God over Sodom (<Link href="/cross-references/genesis/18/23" className="text-sacred hover:underline">Genesis 18:23-32</Link>) to Paul praying for churches he&apos;d never visit (<Link href="/cross-references/colossians/1/9" className="text-sacred hover:underline">Colossians 1:9</Link>). Some are formal hymns. Others are desperate one-liners. God heard them all.
          </p>
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
            <p className="text-scripture dark:text-ink-light text-sm leading-relaxed">
              <strong>Key insight:</strong> Prayer isn&apos;t about giving God information He doesn&apos;t have. He already knows everything (<Link href="/cross-references/matthew/6/8" className="text-sacred hover:underline">Matthew 6:8</Link>). Prayer is about <em>relationship</em> — the same way you talk to a friend even though they already know your situation. God wants the conversation, not just the request.
            </p>
          </div>
        </section>

        {/* 6 Types of Prayer */}
        <section id="types" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">6 Types of Prayer in the Bible</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm">The Bible describes different kinds of prayer for different situations. A healthy prayer life uses all six.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TYPES_OF_PRAYER.map((t, idx) => (
              <div key={idx} className={`bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-3 h-3 rounded-full bg-${t.color}-500 shrink-0`} />
                  <h3 className="font-bold text-scripture dark:text-white text-sm">{t.type}</h3>
                </div>
                <p className="text-xs text-sacred dark:text-sacred mb-2 italic">{t.greek}</p>
                <p className="text-ink-muted dark:text-ink-light text-sm leading-relaxed mb-2">{t.description}</p>
                <p className="text-ink-muted dark:text-ink-light text-xs border-t border-grace dark:border-dark-border pt-2 mt-2">{t.example}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Prayer in the Bible by the Numbers */}
        <section className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Prayer in the Bible by the Numbers</h2>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Statistic</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Number</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden sm:table-cell">Detail</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { stat: 'Recorded prayers in the Bible', num: '650+', detail: 'From Genesis 4 to Revelation 22 — prayer spans the entire biblical narrative.' },
                  { stat: 'Psalms that are prayers', num: '~100', detail: 'Nearly two-thirds of the Psalms are prayers — lament, praise, thanksgiving, and petition.' },
                  { stat: 'Times Jesus is recorded praying', num: '25+', detail: 'In the Gospels alone. He prayed at every major moment: baptism, choosing disciples, Gethsemane, the cross.' },
                  { stat: 'Longest prayer in the Bible', num: '~1,000 words', detail: 'Solomon\'s temple dedication prayer (1 Kings 8:22-53). Took about 5 minutes to read aloud.' },
                  { stat: 'Shortest prayer in the Bible', num: '3 words', detail: '"Lord, save me" — Peter sinking in the waves (Matthew 14:30). God answered immediately.' },
                  { stat: 'Books that mention prayer', num: '62 of 66', detail: 'Only Esther, Song of Solomon, Obadiah, and Nahum lack direct prayer references.' },
                  { stat: 'Paul\'s prayer requests in his letters', num: '40+', detail: 'Paul asked churches to pray for boldness, open doors, deliverance, and the spread of the gospel.' },
                  { stat: 'Answered prayers recorded', num: '450+', detail: 'Including healings, deliverances, military victories, provision, guidance, and resurrection.' },
                ].map((r, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border">
                    <td className="px-4 py-3 font-medium text-scripture dark:text-white">{r.stat}</td>
                    <td className="px-4 py-3 font-bold text-scripture dark:text-sacred whitespace-nowrap">{r.num}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light hidden sm:table-cell">{r.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* The Lord's Prayer */}
        <section id="lords-prayer" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">The Lord&apos;s Prayer — Explained Line by Line</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm">Matthew 6:9-13 — Jesus didn&apos;t just tell us to pray. He showed us how.</p>

          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Phrase</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden sm:table-cell">Element</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {LORDS_PRAYER_BREAKDOWN.map((line, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border">
                    <td className="px-4 py-3 font-medium text-scripture dark:text-white italic">{line.phrase}</td>
                    <td className="px-4 py-3 hidden sm:table-cell"><span className="bg-sacred/10 dark:bg-sacred-light0/30 text-scripture dark:text-sacred text-xs px-2 py-0.5 rounded-full">{line.element}</span></td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light">{line.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-sacred-light dark:bg-sacred-light0/20 border border-sacred/20 dark:border-sacred/20 rounded-lg p-4">
            <p className="text-scripture dark:text-ink-light text-sm leading-relaxed">
              <strong>Notice the order:</strong> The Lord&apos;s Prayer starts with God (His name, His kingdom, His will) before moving to human needs (bread, forgiveness, protection). Most of us pray in reverse — starting with our problems. Jesus says start with worship. Your perspective changes when you see God clearly before looking at your situation.
            </p>
          </div>
        </section>


        {/* Greek & Hebrew Word Study */}
        <section id="greek-hebrew" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Greek &amp; Hebrew Words for Prayer</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm">English has one word for &ldquo;prayer.&rdquo; The Bible has at least seven — each revealing a different dimension of talking to God.</p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Word</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden sm:table-cell">Language</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Meaning</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden md:table-cell">Significance</th>
                </tr>
              </thead>
              <tbody>
                {GREEK_HEBREW_WORDS.map((w, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border">
                    <td className="px-4 py-3 font-medium text-scripture dark:text-white italic text-xs">{w.word}</td>
                    <td className="px-4 py-3 hidden sm:table-cell"><span className={`text-xs px-2 py-0.5 rounded-full ${w.language === 'Greek' ? 'bg-sacred/10 dark:bg-sacred-light0/30 text-scripture dark:text-sacred' : 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300'}`}>{w.language}</span></td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light">{w.meaning}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light text-xs hidden md:table-cell">{w.significance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/greek-word/proseuche" className="text-xs bg-sacred/10 dark:bg-sacred-light0/20 text-scripture dark:text-sacred px-3 py-1 rounded-full hover:bg-sacred-light transition-colors">Greek: proseuche</Link>
            <Link href="/greek-word/deesis" className="text-xs bg-sacred/10 dark:bg-sacred-light0/20 text-scripture dark:text-sacred px-3 py-1 rounded-full hover:bg-sacred-light transition-colors">Greek: deēsis</Link>
            <Link href="/hebrew-word/H6419" className="text-xs bg-amber-100 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full hover:bg-amber-200 transition-colors">Hebrew: palal</Link>
            <Link href="/bible-topics/prayer" className="text-xs bg-green-100 dark:bg-green-950/20 text-green-700 dark:text-green-300 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">All Prayer Verses</Link>
          </div>
        </section>

        {/* How Jesus Prayed */}
        <section id="how-jesus-prayed" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">How Jesus Prayed</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            If anyone didn&apos;t need to pray, it was Jesus — He was God in human flesh. Yet He prayed more than anyone in the Gospels. That tells you something about prayer: it&apos;s not for the spiritually weak. It&apos;s for everyone who takes God seriously.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2 text-sm">Early Morning</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm leading-relaxed">&ldquo;Rising up a great while before day, he went out...and there prayed&rdquo; (<Link href="/cross-references/mark/1/35" className="text-sacred hover:underline">Mark 1:35</Link>). Jesus prioritized prayer before the demands of the day could crowd it out.</p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2 text-sm">All Night</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm leading-relaxed">Before choosing the 12 apostles, &ldquo;he went out into a mountain to pray, and continued all night in prayer&rdquo; (<Link href="/cross-references/luke/6/12" className="text-sacred hover:underline">Luke 6:12</Link>). Major decisions require extended prayer.</p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2 text-sm">In Crisis</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm leading-relaxed">In Gethsemane, facing the cross, Jesus prayed three times: &ldquo;Not my will, but thine, be done&rdquo; (<Link href="/cross-references/matthew/26/39" className="text-sacred hover:underline">Matthew 26:39</Link>). He sweat drops of blood — yet He submitted.</p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2 text-sm">For Others</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm leading-relaxed">In <Link href="/cross-references/john/17/20" className="text-sacred hover:underline">John 17:20</Link>, Jesus prayed for future believers — including you. He prayed for your faith to hold, your unity with other Christians, and your joy to be complete.</p>
            </div>
          </div>
        </section>

        {/* Old Testament vs New Testament Prayer */}
        <section className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Old Testament vs New Testament Prayer</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            Prayer didn&apos;t change between the testaments — but access did. Here&apos;s how the cross transformed the prayer life of God&apos;s people:
          </p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Aspect</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Old Testament</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">New Testament</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { aspect: 'Access to God', ot: 'Through priests and the temple (Leviticus 16)', nt: 'Direct access through Jesus (Hebrews 4:16)' },
                  { aspect: 'Address', ot: '"O Lord God of Israel" (formal, covenantal)', nt: '"Abba, Father" (intimate, relational — Romans 8:15)' },
                  { aspect: 'Mediator', ot: 'High priest offered sacrifices on your behalf', nt: 'Jesus is the one mediator (1 Timothy 2:5)' },
                  { aspect: 'The Holy Spirit\'s role', ot: 'Came upon specific people at specific times', nt: 'Indwells every believer, intercedes in prayer (Romans 8:26)' },
                  { aspect: 'Location', ot: 'Oriented toward the temple in Jerusalem (1 Kings 8:30)', nt: '"In spirit and truth" — any place, any time (John 4:24)' },
                  { aspect: 'Basis', ot: 'God\'s covenant faithfulness to Abraham and Israel', nt: 'The finished work of Christ on the cross (Ephesians 2:18)' },
                ].map((r, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border">
                    <td className="px-4 py-3 font-medium text-scripture dark:text-white">{r.aspect}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light">{r.ot}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light">{r.nt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Famous Prayers */}
        <section id="famous-prayers" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">10 Famous Prayers in the Bible</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm">These prayers changed nations, called fire from heaven, and moved the heart of God.</p>
          <div className="space-y-3">
            {FAMOUS_PRAYERS.map((p, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-scripture/10 dark:bg-sacred-light0/30 text-scripture dark:text-sacred text-xs font-bold px-2 py-0.5 rounded-full">{p.who}</span>
                    <span className="text-ink-light text-xs">{p.occasion}</span>
                  </div>
                  <Link href={verseRefToPath(p.ref)} className="text-sacred hover:underline text-xs">{p.ref}</Link>
                </div>
                <p className="text-scripture dark:text-ink-light text-sm leading-relaxed mb-2">{p.summary}</p>
                <p className="text-xs font-medium text-green-600 dark:text-green-400">Result: {p.result}</p>
              </div>
            ))}
          </div>
        </section>


        {/* Key Prayer Verses */}
        <section id="prayer-verses" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">12 Key Bible Verses About Prayer</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm">The Bible&apos;s clearest statements on what prayer is, how it works, and why it matters.</p>
          <div className="space-y-3">
            {PRAYER_VERSES.map((v, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
                <Link href={verseRefToPath(v.ref)} className="text-sacred hover:underline font-bold text-sm">{v.ref}</Link>
                <blockquote className="text-scripture dark:text-ink-light leading-relaxed italic mt-2 border-l-3 border-scripture/30 pl-4 text-sm">
                  &ldquo;{v.text}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>
        </section>

        {/* Why Pray */}
        <section id="why-pray" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Why Pray If God Already Knows Everything?</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            This is the most honest question anyone asks about prayer. If God is omniscient, why does He need me to tell Him what&apos;s happening? He doesn&apos;t. Prayer isn&apos;t about giving God data — it&apos;s about giving Him <em>you</em>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2 text-sm">Prayer Changes You</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm leading-relaxed">When you articulate your fears to God, they shrink. When you confess sin, guilt lifts. When you thank Him, gratitude rewires your brain. Prayer is transformative, not merely transactional.</p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2 text-sm">Prayer Builds Dependence</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm leading-relaxed">Self-sufficiency is the enemy of faith. Prayer forces you to admit: I can&apos;t handle this alone. That honest acknowledgment is the starting point of every breakthrough.</p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2 text-sm">God Chose to Work Through Prayer</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm leading-relaxed">James 4:2 says &ldquo;ye have not, because ye ask not.&rdquo; God has sovereignly decided that some things happen only when His people pray. He doesn&apos;t need prayer — but He uses it.</p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2 text-sm">Relationship Requires Communication</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm leading-relaxed">You don&apos;t stop talking to your spouse because they &ldquo;already know what you&apos;re thinking.&rdquo; Relationships require conversation. Prayer is how you maintain intimacy with God.</p>
            </div>
          </div>
        </section>

        {/* How to Build a Prayer Life */}
        <section id="build-prayer-life" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">How to Build a Prayer Life</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-6">
            Nobody wakes up one day with a thriving prayer life. It&apos;s built — one honest conversation with God at a time. Here&apos;s a practical framework.
          </p>
          <div className="space-y-0 mb-6">
            {[
              { step: '1', title: 'Set a Time', detail: 'Pick a consistent time — morning works best for most people (Mark 1:35). Even 10 minutes of focused prayer beats an hour of distracted prayer. Start small and build.' },
              { step: '2', title: 'Find a Place', detail: 'Jesus said pray in your "closet" — a private space (Matthew 6:6). It doesn\'t have to be a literal closet. A chair, a car, a park bench. Somewhere you won\'t be interrupted.' },
              { step: '3', title: 'Use the Lord\'s Prayer as a Template', detail: 'Start with worship, move to surrender, then requests, then confession, then protection. The Lord\'s Prayer gives you a structure so you don\'t just ramble.' },
              { step: '4', title: 'Pray Scripture', detail: 'Open a Psalm and pray it back to God. Turn Paul\'s prayers into your own (Ephesians 1:17-19, Colossians 1:9-12). God\'s word fuels your prayers and keeps them aligned with His will.' },
              { step: '5', title: 'Keep a Prayer Journal', detail: 'Write your prayers and God\'s answers. Over time, you\'ll see patterns — and your faith will grow as you look back and see how God has moved.' },
              { step: '6', title: 'Pray Throughout the Day', detail: '"Pray without ceasing" (1 Thessalonians 5:17) means a running conversation — quick prayers in traffic, silent thanks at meals, a breath prayer in a stressful meeting.' },
            ].map((s, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-scripture text-white flex items-center justify-center text-sm font-bold shrink-0">{s.step}</div>
                  {idx < 5 && <div className="w-0.5 flex-1 bg-grace dark:bg-dark-border min-h-[20px]" />}
                </div>
                <div className="pb-5 flex-1">
                  <h3 className="font-bold text-scripture dark:text-white text-sm mb-1">{s.title}</h3>
                  <p className="text-ink-muted dark:text-ink-light text-sm leading-relaxed">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* When Prayer Feels Unanswered */}
        <section id="unanswered" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">When Prayer Feels Unanswered</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            Every honest Christian has prayed and heard silence. It doesn&apos;t mean God isn&apos;t listening. The Bible gives several reasons prayers seem unanswered:
          </p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Reason</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Scripture</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden sm:table-cell">Explanation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { reason: 'Unconfessed sin', ref: 'Isaiah 59:2', explanation: 'Sin creates a barrier. Confession removes it. God isn\'t punishing you — He\'s waiting for honesty.' },
                  { reason: 'Wrong motives', ref: 'James 4:3', explanation: 'Praying to fuel selfish desires. God gives what you need, not always what you want.' },
                  { reason: 'Lack of faith', ref: 'James 1:6-7', explanation: 'Asking while doubting God can deliver. Faith isn\'t certainty — it\'s trusting God even with questions.' },
                  { reason: 'God\'s timing', ref: 'Habakkuk 2:3', explanation: 'The answer is coming but not yet. Abraham waited 25 years for Isaac. God is never late.' },
                  { reason: 'God has something better', ref: '2 Corinthians 12:8-9', explanation: 'Paul asked for healing; God gave grace. Sometimes "no" is the most loving answer.' },
                  { reason: 'Spiritual warfare', ref: 'Daniel 10:12-13', explanation: 'Daniel\'s prayer was heard instantly but the answer was delayed 21 days by spiritual opposition.' },
                ].map((r, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border">
                    <td className="px-4 py-3 font-medium text-scripture dark:text-white">{r.reason}</td>
                    <td className="px-4 py-3"><Link href={verseRefToPath(r.ref)} className="text-sacred hover:underline text-xs">{r.ref}</Link></td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light hidden sm:table-cell">{r.explanation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Gospel CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-scripture via-scripture/95 to-scripture/80 rounded-xl p-8 md:p-10 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">The Most Important Prayer You&apos;ll Ever Pray</h2>
            <p className="text-sacred-light/90 max-w-2xl mx-auto leading-relaxed mb-6">
              If you&apos;ve never spoken to God before, start here: &ldquo;God, I know I&apos;m a sinner. I believe Jesus died for me and rose again. I trust Him as my Savior. Forgive me and give me eternal life.&rdquo; That prayer — prayed honestly — changes everything.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/john-3-16" className="inline-block bg-white text-scripture font-bold px-6 py-3 rounded-lg hover:bg-sacred-light transition-colors">
                Read John 3:16 Explained
              </Link>
              <Link href="/bible-verses#salvation" className="inline-block border-2 border-white/40 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Salvation Verses
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Frequently Asked Questions About Prayer</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => (
              <details key={idx} className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm group">
                <summary className="px-5 py-4 cursor-pointer font-bold text-scripture dark:text-white text-sm flex items-center justify-between list-none">
                  {item.question}
                  <span className="text-ink-light group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <div className="px-5 pb-5 text-ink-muted dark:text-ink-light text-sm leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Study Path CTAs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Go Deeper</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/short-prayers" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm hover:border-sacred/50 transition-colors group">
              <p className="text-xs font-bold text-sacred uppercase tracking-wider mb-1">Practical Guide</p>
              <h3 className="font-bold text-scripture dark:text-white group-hover:text-gold-dark transition-colors">23 Powerful Short Prayers</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm mt-1">Quick, powerful prayers you can use daily for any situation.</p>
            </Link>
            <Link href="/bible-verses#prayer" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm hover:border-sacred/50 transition-colors group">
              <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Verse Collection</p>
              <h3 className="font-bold text-scripture dark:text-white group-hover:text-gold-dark transition-colors">Bible Verses About Prayer</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm mt-1">Every key verse on prayer with commentary and context.</p>
            </Link>
            <Link href="/bible-topics/prayer" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm hover:border-sacred/50 transition-colors group">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Topical Study</p>
              <h3 className="font-bold text-scripture dark:text-white group-hover:text-gold-dark transition-colors">Prayer — Complete Topical Study</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm mt-1">Every mention of prayer across all 66 books of the Bible.</p>
            </Link>
            <Link href="/jesus-christ" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm hover:border-sacred/50 transition-colors group">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Pillar Study</p>
              <h3 className="font-bold text-scripture dark:text-white group-hover:text-gold-dark transition-colors">Who Is Jesus Christ?</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm mt-1">The one who taught us how to pray — and who prays for us right now.</p>
            </Link>
          </div>
        </section>

        {/* Continue Your Study */}
        <section id="study-links" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/short-prayers" className="text-sacred hover:underline text-sm">23 Short Prayers for Daily Use</Link>
            <Link href="/bible-verses#prayer" className="text-sacred hover:underline text-sm">Bible Verses About Prayer</Link>
            <Link href="/bible-topics/prayer" className="text-sacred hover:underline text-sm">Topical Study: Prayer</Link>
            <Link href="/bible-topics/fasting" className="text-sacred hover:underline text-sm">Topical Study: Fasting</Link>
            <Link href="/bible-topics/worship" className="text-sacred hover:underline text-sm">Topical Study: Worship</Link>
            <Link href="/john-3-16" className="text-sacred hover:underline text-sm">John 3:16 Explained</Link>
            <Link href="/jesus-christ" className="text-sacred hover:underline text-sm">Who Is Jesus Christ?</Link>
            <Link href="/bible-verses" className="text-sacred hover:underline text-sm">100+ Bible Verses by Topic</Link>
            <Link href="/psalm-23" className="text-sacred hover:underline text-sm">Psalm 23 Study</Link>
            <Link href="/greek-word/proseuche" className="text-sacred hover:underline text-sm">Greek: Proseuche (Prayer)</Link>
            <Link href="/greek-word/deesis" className="text-sacred hover:underline text-sm">Greek: Deēsis (Petition)</Link>
            <Link href="/hebrew-word/H6419" className="text-sacred hover:underline text-sm">Hebrew: Palal (Pray)</Link>
            <Link href="/cross-references/matthew/6/9" className="text-sacred hover:underline text-sm">Matthew 6:9 Cross-References</Link>
            <Link href="/cross-references/philippians/4/6" className="text-sacred hover:underline text-sm">Philippians 4:6 Cross-References</Link>
            <Link href="/matthew-chapters" className="text-sacred hover:underline text-sm">Matthew Chapter Quizzes</Link>
            <Link href="/luke-chapters" className="text-sacred hover:underline text-sm">Luke Chapter Quizzes</Link>
            <Link href="/characters/moses" className="text-sacred hover:underline text-sm">Moses — Character Study</Link>
            <Link href="/characters/elijah" className="text-sacred hover:underline text-sm">Elijah — Character Study</Link>
            <Link href="/characters/daniel" className="text-sacred hover:underline text-sm">Daniel — Character Study</Link>
            <Link href="/characters/paul" className="text-sacred hover:underline text-sm">Paul — Character Study</Link>
            <Link href="/bible-quizzes" className="text-sacred hover:underline text-sm">All Bible Quizzes</Link>
          </div>
        </section>

      </main>
    </div>
  );
}
