import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';

const SITE_URL = 'https://biblemaximum.com';

export const metadata: Metadata = {
  title: '23 Powerful Short Prayers to Use Daily — Quick Prayers for Every Situation | Bible Maximum',
  description: '23 powerful short prayers for daily use — morning prayers, prayers for strength, peace, healing, anxiety, gratitude, protection, guidance, and more. Each prayer includes the Scripture it\'s based on.',
  keywords: ['short prayers', 'daily prayers', 'powerful prayers', 'morning prayer', 'prayer for strength', 'prayer for peace', 'prayer for healing', 'prayer for anxiety', 'quick prayers', 'simple prayers', 'prayer for protection', 'prayer for guidance', 'bedtime prayer', 'prayer for forgiveness', 'prayer before meals'],
  alternates: { canonical: '/short-prayers' },
  openGraph: {
    title: '23 Powerful Short Prayers to Use Daily',
    description: 'Quick, powerful prayers for every situation — based on Scripture, ready to use right now.',
    url: `${SITE_URL}/short-prayers`,
    type: 'article',
    images: ['/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png'],
  },
};

// ─── Prayer Data ──────────────────────────────────────────────

const PRAYERS = [
  {
    number: 1,
    title: 'A Morning Prayer',
    category: 'Morning',
    prayer: 'Father, this day belongs to You. Before I check my phone, before I start my list — I give this day to You. Order my steps, guard my words, and let everything I do bring You glory. In Jesus\' name, amen.',
    scripture: 'Psalm 5:3',
    scriptureText: 'My voice shalt thou hear in the morning, O Lord; in the morning will I direct my prayer unto thee, and will look up.',
    why: 'Starting the day with surrender sets the tone for everything that follows. David prayed in the morning before the chaos hit.',
  },
  {
    number: 2,
    title: 'A Prayer for Strength',
    category: 'Strength',
    prayer: 'Lord, I\'m running on empty. I don\'t have the strength for what today demands. But You do. Be my strength when mine is gone. Carry what I cannot carry. I trust You. Amen.',
    scripture: 'Isaiah 40:31',
    scriptureText: 'But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles.',
    why: 'God doesn\'t expect you to be strong enough on your own. He specializes in renewing the strength of people who admit they have none.',
  },
  {
    number: 3,
    title: 'A Prayer for Peace',
    category: 'Peace',
    prayer: 'God of peace, my mind won\'t stop racing. Worries pile up faster than I can process them. I\'m laying every one of them at Your feet right now. Replace my anxiety with Your peace — the kind that doesn\'t make sense but holds me together anyway. Amen.',
    scripture: 'Philippians 4:6-7',
    scriptureText: 'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
    why: 'Paul wrote this from prison. If he could have peace in chains, God can give you peace in whatever you\'re facing.',
  },
  {
    number: 4,
    title: 'A Prayer for Healing',
    category: 'Healing',
    prayer: 'Lord, You are Jehovah Rapha — the God who heals. I bring this body, this pain, this diagnosis to You. I ask for healing according to Your will. Whether You heal instantly, gradually, or ultimately in eternity — I trust Your plan. Amen.',
    scripture: 'Psalm 147:3',
    scriptureText: 'He healeth the broken in heart, and bindeth up their wounds.',
    why: 'God heals physically, emotionally, and spiritually. This prayer submits the request while trusting the outcome to His wisdom.',
  },
  {
    number: 5,
    title: 'A Prayer for Anxiety',
    category: 'Anxiety',
    prayer: 'Father, I\'m anxious about things I can\'t control. I know worrying doesn\'t add a single hour to my life. Help me release what I\'m gripping so tightly and trust that You\'re already working in the situation I\'m afraid of. Amen.',
    scripture: 'Matthew 6:34',
    scriptureText: 'Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself.',
    why: 'Jesus says deal with today. Tomorrow\'s problems aren\'t yours to solve yet. Anxiety borrows trouble from a future that may never happen.',
  },
  {
    number: 6,
    title: 'A Prayer for Forgiveness',
    category: 'Forgiveness',
    prayer: 'God, I\'ve sinned — and I\'m not going to make excuses. I confess it, I own it, and I ask You to forgive me. Cleanse me and help me walk differently starting now. Thank You that Your mercy is new every morning. Amen.',
    scripture: '1 John 1:9',
    scriptureText: 'If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.',
    why: 'God doesn\'t require a lengthy explanation. He requires honesty. Confession is agreeing with God about what you did — and receiving His forgiveness.',
  },
  {
    number: 7,
    title: 'A Prayer for Guidance',
    category: 'Guidance',
    prayer: 'Lord, I don\'t know which way to go. This decision feels bigger than me. I\'m choosing to trust You instead of my own analysis. Make the path clear — and give me the courage to walk it when You do. Amen.',
    scripture: 'Proverbs 3:5-6',
    scriptureText: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
    why: 'God doesn\'t promise to show you the entire road. He promises to direct your next step. That\'s enough.',
  },
  {
    number: 8,
    title: 'A Prayer of Gratitude',
    category: 'Gratitude',
    prayer: 'Father, I have more than I deserve. Before I ask for anything else, I want to thank You — for breath, for grace, for another day, for the people You\'ve placed in my life, and for a salvation I didn\'t earn. You are good. Amen.',
    scripture: 'Psalm 107:1',
    scriptureText: 'O give thanks unto the Lord, for he is good: for his mercy endureth for ever.',
    why: 'Gratitude rewires your perspective. Starting with thanks before requests keeps prayer from becoming a complaint list.',
  },
  {
    number: 9,
    title: 'A Prayer for Protection',
    category: 'Protection',
    prayer: 'Lord, I ask You to surround me and my family with Your protection today. Guard us from harm — seen and unseen, physical and spiritual. You are our refuge and fortress. We trust in You. Amen.',
    scripture: 'Psalm 91:1-2',
    scriptureText: 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.',
    why: 'God\'s protection isn\'t a magic shield against all difficulty — it\'s His presence with you in every situation.',
  },
  {
    number: 10,
    title: 'A Prayer Before a Difficult Conversation',
    category: 'Wisdom',
    prayer: 'God, I need Your words, not mine. Give me wisdom to speak truth with grace. Help me listen more than I talk. Guard my tongue from saying things I\'ll regret. Let this conversation honor You. Amen.',
    scripture: 'James 1:19',
    scriptureText: 'Let every man be swift to hear, slow to speak, slow to wrath.',
    why: 'Most conflicts escalate because someone speaks before thinking. This prayer puts God in the conversation before it starts.',
  },
  {
    number: 11,
    title: 'A Prayer for Your Marriage',
    category: 'Family',
    prayer: 'Lord, protect this marriage. Help us love each other the way You love the church — sacrificially, patiently, without keeping score. Heal what\'s broken. Strengthen what\'s weak. Keep us fighting for each other, not against each other. Amen.',
    scripture: 'Ephesians 5:25',
    scriptureText: 'Husbands, love your wives, even as Christ also loved the church, and gave himself for it.',
    why: 'Every strong marriage is built on prayer. When you pray for your spouse, it\'s hard to stay angry at them.',
  },
  {
    number: 12,
    title: 'A Prayer for Your Children',
    category: 'Family',
    prayer: 'Father, I place my children in Your hands. Protect their hearts, shape their character, and draw them to Yourself. Give me wisdom to parent them well — with grace when they fail and encouragement when they grow. Amen.',
    scripture: 'Proverbs 22:6',
    scriptureText: 'Train up a child in the way he should go: and when he is old, he will not depart from it.',
    why: 'You can\'t control your children\'s choices, but you can pray for the One who can reach their hearts.',
  },
  {
    number: 13,
    title: 'A Prayer for Work',
    category: 'Daily Life',
    prayer: 'Lord, help me work as if I\'m working for You today — because I am. Whether anyone notices or not, let my effort honor You. Give me focus, integrity, and patience with difficult people. Amen.',
    scripture: 'Colossians 3:23',
    scriptureText: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men.',
    why: 'Your job isn\'t just a paycheck. It\'s a platform for faithfulness. Praying before work transforms a mundane day into ministry.',
  },
  {
    number: 14,
    title: 'A Prayer for Grief',
    category: 'Comfort',
    prayer: 'God, this loss is crushing me. I don\'t have words — just tears. You said You\'re close to the brokenhearted. Please be close right now. Don\'t let this pain destroy my faith. Hold me together when I\'m falling apart. Amen.',
    scripture: 'Psalm 34:18',
    scriptureText: 'The Lord is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.',
    why: 'God doesn\'t ask you to pray eloquently in grief. He asks you to show up. Tears are a language He understands perfectly.',
  },
  {
    number: 15,
    title: 'A Prayer for Financial Needs',
    category: 'Provision',
    prayer: 'Father, You know what I need before I ask. I\'m trusting You with my finances — the bills, the uncertainty, the fear of not having enough. You\'ve never failed to provide. Help me steward well what You give. Amen.',
    scripture: 'Philippians 4:19',
    scriptureText: 'But my God shall supply all your need according to his riches in glory by Christ Jesus.',
    why: 'God promises to supply needs, not wants. This prayer acknowledges the difference while trusting His provision.',
  },
  {
    number: 16,
    title: 'A Prayer Before Meals',
    category: 'Daily Life',
    prayer: 'Lord, thank You for this food. Thank You for the hands that prepared it. Bless it to nourish our bodies and bless our conversation to nourish our souls. Amen.',
    scripture: '1 Timothy 4:4-5',
    scriptureText: 'For every creature of God is good, and nothing to be refused, if it be received with thanksgiving.',
    why: 'A short, honest meal prayer beats a long, mindless one. Gratitude for daily bread is exactly what Jesus taught in the Lord\'s Prayer.',
  },
  {
    number: 17,
    title: 'A Bedtime Prayer',
    category: 'Evening',
    prayer: 'Father, as this day ends, I give You its failures and its victories. Forgive where I fell short. Thank You for where Your grace carried me. Watch over me as I sleep. I trust tomorrow to You. Amen.',
    scripture: 'Psalm 4:8',
    scriptureText: 'I will both lay me down in peace, and sleep: for thou, Lord, only makest me dwell in safety.',
    why: 'Reviewing the day with God before sleep settles your mind and releases tomorrow\'s worries to Him.',
  },
  {
    number: 18,
    title: 'A Prayer When You Don\'t Know What to Pray',
    category: 'Honesty',
    prayer: 'Holy Spirit, I don\'t even know what to ask for. My mind is blank and my heart is heavy. You know what I need better than I do. Pray through me right now. I trust Your intercession. Amen.',
    scripture: 'Romans 8:26',
    scriptureText: 'The Spirit itself maketh intercession for us with groanings which cannot be uttered.',
    why: 'This might be the most honest prayer on this list. When words fail, the Holy Spirit takes over. You don\'t need eloquence — you need honesty.',
  },
  {
    number: 19,
    title: 'A Prayer for Patience',
    category: 'Character',
    prayer: 'Lord, I\'m about to lose it. Give me patience I don\'t naturally have — the kind that comes from Your Spirit, not my effort. Help me respond instead of react. Slow me down before I say something I can\'t take back. Amen.',
    scripture: 'Galatians 5:22',
    scriptureText: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith.',
    why: 'Patience is a fruit of the Spirit, not a personality trait. You can\'t manufacture it — you have to ask for it.',
  },
  {
    number: 20,
    title: 'A Prayer for Someone Who Hurt You',
    category: 'Forgiveness',
    prayer: 'God, You know what they did. I\'m angry and I have a right to be. But You forgave me for worse. Help me release this — not because they deserve it, but because holding onto bitterness is destroying me. I choose to forgive. Help me mean it. Amen.',
    scripture: 'Matthew 6:14',
    scriptureText: 'For if ye forgive men their trespasses, your heavenly Father will also forgive you.',
    why: 'Forgiveness isn\'t a feeling — it\'s a decision. This prayer starts the process. The feelings will follow.',
  },
  {
    number: 21,
    title: 'A Prayer for Boldness',
    category: 'Faith',
    prayer: 'Lord, I\'m scared to speak up. Fear of rejection, fear of looking foolish, fear of conflict — it\'s all holding me back. Give me the boldness of Peter after Pentecost. Help me care more about Your approval than anyone else\'s. Amen.',
    scripture: 'Acts 4:29',
    scriptureText: 'And now, Lord, behold their threatenings: and grant unto thy servants, that with all boldness they may speak thy word.',
    why: 'The early church didn\'t pray for safety — they prayed for boldness. Sometimes the most spiritual prayer is asking for courage.',
  },
  {
    number: 22,
    title: 'A Prayer of Surrender',
    category: 'Surrender',
    prayer: 'Father, I\'m done trying to control this. My plans haven\'t worked. My timing hasn\'t worked. I surrender this situation — completely, genuinely, without a backup plan. Your will, not mine. I mean it this time. Amen.',
    scripture: 'Matthew 26:39',
    scriptureText: 'Not as I will, but as thou wilt.',
    why: 'Jesus prayed this in Gethsemane, facing the cross. If the Son of God surrendered His will, so can you. Surrender isn\'t weakness — it\'s the ultimate act of trust.',
  },
  {
    number: 23,
    title: 'The Sinner\'s Prayer',
    category: 'Salvation',
    prayer: 'God, I know I\'m a sinner. I believe Jesus Christ died on the cross for my sins and rose from the dead. I repent of my sins and put my trust in Him alone for my salvation. Come into my life, forgive me, and make me new. I receive You as my Lord and Savior. In Jesus\' name, amen.',
    scripture: 'Romans 10:9',
    scriptureText: 'That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.',
    why: 'This is the most important prayer anyone can ever pray. It\'s not about the exact words — it\'s about an honest heart turning to God in faith. If you prayed this and meant it, your eternity just changed.',
  },
];

const FAQ_ITEMS = [
  { question: 'Can I use these prayers word-for-word?', answer: 'Absolutely. These prayers are meant to be starting points. Use them exactly as written, or let them spark your own words. God cares about your heart, not your vocabulary. Jesus gave the Lord\'s Prayer as a template — these work the same way.' },
  { question: 'How many times should I pray each day?', answer: 'The Bible says "pray without ceasing" (1 Thessalonians 5:17), which means maintaining an ongoing conversation with God throughout the day. Daniel prayed three times daily (Daniel 6:10). There\'s no required number — quality matters more than frequency. Even one honest prayer is better than ten distracted ones.' },
  { question: 'Do short prayers actually work?', answer: 'Yes. Elijah\'s prayer on Mount Carmel was 63 words — and fire fell from heaven (1 Kings 18:36-37). The tax collector\'s prayer was 7 words: "God be merciful to me a sinner" — and he went home justified (Luke 18:13). God responds to faith and sincerity, not length.' },
  { question: 'What if I don\'t feel anything when I pray?', answer: 'Feelings are unreliable. Prayer works by faith, not emotion. Some of the most powerful prayers in the Bible were prayed through tears, doubt, and exhaustion (Psalm 22, Matthew 26:39). Keep praying whether you feel it or not. Faithfulness in prayer, not feelings during prayer, is what God honors.' },
  { question: 'Should I pray out loud or silently?', answer: 'Both are valid. Hannah prayed silently and God heard her (1 Samuel 1:13). Jesus prayed out loud in Gethsemane (Matthew 26:39). Praying out loud can help focus your mind. Silent prayer works anywhere — in meetings, in traffic, in bed. Use whatever helps you be honest with God.' },
  { question: 'Is the "sinner\'s prayer" in the Bible?', answer: 'The exact phrase "sinner\'s prayer" isn\'t in the Bible, but the concept is everywhere. The tax collector prayed "God be merciful to me a sinner" (Luke 18:13). Romans 10:9-10 says confessing Jesus as Lord and believing in the resurrection leads to salvation. The prayer is simply putting those biblical principles into words.' },
  { question: 'Can I pray for myself or is that selfish?', answer: 'It\'s not selfish — it\'s biblical. Jesus prayed for Himself in Gethsemane (Matthew 26:39). Paul asked God to remove his thorn (2 Corinthians 12:8). Philippians 4:6 says "let YOUR requests be made known unto God." God wants to hear about your needs. Just don\'t pray only for yourself — include others too.' },
  { question: 'What\'s the best prayer for anxiety?', answer: 'Prayer #3 and #5 on this list address anxiety directly, based on Philippians 4:6-7 and Matthew 6:34. The key is specificity — don\'t just pray "help me not be anxious." Name the specific worry, hand it to God, and thank Him in advance for handling it. Thanksgiving is the biblical antidote to anxiety.' },
];


export default function ShortPrayersPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    additionalType: 'https://schema.org/LearningResource',
    headline: '23 Powerful Short Prayers to Use Daily',
    description: 'Quick, powerful prayers for every situation — morning, strength, peace, healing, anxiety, gratitude, and more.',
    url: `${SITE_URL}/short-prayers`,
    datePublished: '2026-03-09',
    dateModified: '2026-03-09',
    wordCount: 8000,
    image: `${SITE_URL}/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png`,
    author: { '@type': 'Organization', name: 'Bible Maximum', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/short-prayers` },
    about: { '@type': 'Thing', name: 'Christian prayer', sameAs: 'https://www.wikidata.org/wiki/Q2460317' },
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
      { '@type': 'ListItem', position: 2, name: 'Prayer Guide', item: `${SITE_URL}/prayer` },
      { '@type': 'ListItem', position: 3, name: 'Short Prayers', item: `${SITE_URL}/short-prayers` },
    ],
  };

  const categories = [...new Set(PRAYERS.map(p => p.category))];

  return (
    <div className="min-h-screen bg-primary-light/30 dark:bg-dark-bg">
      <StructuredData data={articleSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-dark-surface border-b border-grace dark:border-dark-border">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <ol className="flex items-center flex-wrap gap-y-1 text-sm">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li><Link href="/prayer" className="text-blue-600 hover:underline">Prayer</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li className="text-primary-dark/70 font-medium">Short Prayers</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative bg-scripture dark:bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png"
            alt="23 powerful short prayers for daily use"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-blue-200 text-sm font-semibold tracking-wider uppercase mb-3">Daily Prayer Guide</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-display leading-tight mb-4">23 Powerful Short Prayers to Use Daily</h1>
          <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed mb-6">
            You don&apos;t need 30 minutes and perfect words. You need 30 seconds and an honest heart. These prayers are short, Scripture-based, and ready to use right now.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="#prayer-1" className="inline-block bg-white text-scripture font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
              Start Praying
            </Link>
            <Link href="/prayer" className="inline-block border-2 border-white/40 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              Full Prayer Guide
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-scripture dark:text-blue-400">23</p>
            <p className="text-xs text-primary-dark/60 dark:text-primary-dark/40 mt-1">Prayers</p>
          </div>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-scripture dark:text-blue-400">{categories.length}</p>
            <p className="text-xs text-primary-dark/60 dark:text-primary-dark/40 mt-1">Life Situations</p>
          </div>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-scripture dark:text-blue-400">30s</p>
            <p className="text-xs text-primary-dark/60 dark:text-primary-dark/40 mt-1">Each Prayer</p>
          </div>
        </div>

        {/* Jump Links */}
        <nav className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm p-6 mb-10">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-3">Jump to a Prayer</h2>
          <div className="flex flex-wrap gap-2">
            {PRAYERS.map((p) => (
              <Link key={p.number} href={`#prayer-${p.number}`} className="text-xs bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
                {p.number}. {p.title.replace('A Prayer ', '').replace('The ', '')}
              </Link>
            ))}
          </div>
        </nav>

        {/* Intro */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Why Short Prayers Work</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            Elijah called fire from heaven with a 63-word prayer (<Link href="/cross-references/1-kings/18/36" className="text-blue-600 hover:underline">1 Kings 18:36-37</Link>). The tax collector got justified with 7 words: &ldquo;God be merciful to me a sinner&rdquo; (<Link href="/cross-references/luke/18/13" className="text-blue-600 hover:underline">Luke 18:13</Link>). Jesus Himself criticized long prayers meant to impress people (<Link href="/cross-references/matthew/6/7" className="text-blue-600 hover:underline">Matthew 6:7</Link>).
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
            God responds to faith and honesty, not word count. Each prayer below is based on a specific Scripture, addresses a specific life situation, and takes less than 30 seconds to pray. Use them as they are, or let them spark your own words.
          </p>
        </section>

        {/* All 23 Prayers */}
        <div className="space-y-6 mb-12">
          {PRAYERS.map((p) => (
            <section key={p.number} id={`prayer-${p.number}`} className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden scroll-mt-20">
              <div className="bg-scripture/5 dark:bg-dark-border/30 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-scripture text-white flex items-center justify-center text-sm font-bold shrink-0">{p.number}</span>
                  <h2 className="font-bold text-scripture dark:text-white text-sm">{p.title}</h2>
                </div>
                <span className="text-xs bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">{p.category}</span>
              </div>
              <div className="p-5">
                <blockquote className="text-primary-dark/90 dark:text-primary-dark/30 leading-relaxed italic border-l-3 border-scripture/30 pl-4 mb-4">
                  {p.prayer}
                </blockquote>
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 mb-3">
                  <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">Based on {p.scripture}</p>
                  <p className="text-primary-dark/70 dark:text-primary-dark/40 text-xs italic">&ldquo;{p.scriptureText}&rdquo;</p>
                </div>
                <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed"><strong>Why this prayer:</strong> {p.why}</p>
              </div>
            </section>
          ))}
        </div>

        {/* Gospel CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-scripture via-scripture/95 to-blue-950 rounded-xl p-8 md:p-10 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">Prayer #23 Is the One That Matters Most</h2>
            <p className="text-blue-100/90 max-w-2xl mx-auto leading-relaxed mb-6">
              Every other prayer on this list flows from prayer #23. If you&apos;ve never placed your trust in Jesus Christ, that&apos;s the prayer to start with. Everything changes when you go from praying <em>to</em> God to praying <em>as a child of</em> God.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="#prayer-23" className="inline-block bg-white text-scripture font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Read Prayer #23
              </Link>
              <Link href="/john-3-16" className="inline-block border-2 border-white/40 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
                John 3:16 Explained
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => (
              <details key={idx} className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm group">
                <summary className="px-5 py-4 cursor-pointer font-bold text-scripture dark:text-white text-sm flex items-center justify-between list-none">
                  {item.question}
                  <span className="text-primary-dark/30 group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <div className="px-5 pb-5 text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed">
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
            <Link href="/prayer" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm hover:border-blue-300 transition-colors group">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Complete Guide</p>
              <h3 className="font-bold text-scripture dark:text-white group-hover:text-blue-600 transition-colors">What Is Prayer?</h3>
              <p className="text-primary-dark/60 dark:text-primary-dark/40 text-sm mt-1">Types, Greek/Hebrew words, famous prayers, and how to build a prayer life.</p>
            </Link>
            <Link href="/bible-verses#prayer" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm hover:border-blue-300 transition-colors group">
              <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Verse Collection</p>
              <h3 className="font-bold text-scripture dark:text-white group-hover:text-blue-600 transition-colors">Bible Verses About Prayer</h3>
              <p className="text-primary-dark/60 dark:text-primary-dark/40 text-sm mt-1">Every key verse on prayer with commentary.</p>
            </Link>
            <Link href="/bible-topics/prayer" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm hover:border-blue-300 transition-colors group">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Topical Study</p>
              <h3 className="font-bold text-scripture dark:text-white group-hover:text-blue-600 transition-colors">Prayer — All Bible References</h3>
              <p className="text-primary-dark/60 dark:text-primary-dark/40 text-sm mt-1">Every mention of prayer across all 66 books.</p>
            </Link>
            <Link href="/jesus-christ" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm hover:border-blue-300 transition-colors group">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Pillar Study</p>
              <h3 className="font-bold text-scripture dark:text-white group-hover:text-blue-600 transition-colors">Who Is Jesus Christ?</h3>
              <p className="text-primary-dark/60 dark:text-primary-dark/40 text-sm mt-1">The one who taught us to pray — and who prays for us now.</p>
            </Link>
          </div>
        </section>

        {/* Continue Your Study */}
        <section className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/prayer" className="text-blue-600 hover:underline text-sm">What Is Prayer? Complete Guide</Link>
            <Link href="/bible-verses" className="text-blue-600 hover:underline text-sm">100+ Bible Verses by Topic</Link>
            <Link href="/bible-verses#prayer" className="text-blue-600 hover:underline text-sm">Bible Verses About Prayer</Link>
            <Link href="/bible-verses#anxiety" className="text-blue-600 hover:underline text-sm">Bible Verses About Anxiety</Link>
            <Link href="/bible-verses#strength" className="text-blue-600 hover:underline text-sm">Bible Verses About Strength</Link>
            <Link href="/bible-verses#peace" className="text-blue-600 hover:underline text-sm">Bible Verses About Peace</Link>
            <Link href="/john-3-16" className="text-blue-600 hover:underline text-sm">John 3:16 Explained</Link>
            <Link href="/jesus-christ" className="text-blue-600 hover:underline text-sm">Who Is Jesus Christ?</Link>
            <Link href="/psalm-23" className="text-blue-600 hover:underline text-sm">Psalm 23 Study</Link>
            <Link href="/philippians-4-13" className="text-blue-600 hover:underline text-sm">Philippians 4:13 Study</Link>
            <Link href="/bible-topics/prayer" className="text-blue-600 hover:underline text-sm">Topical Study: Prayer</Link>
            <Link href="/bible-topics/forgiveness" className="text-blue-600 hover:underline text-sm">Topical Study: Forgiveness</Link>
            <Link href="/greek-word/proseuche" className="text-blue-600 hover:underline text-sm">Greek: Proseuche (Prayer)</Link>
            <Link href="/characters/elijah" className="text-blue-600 hover:underline text-sm">Elijah — Character Study</Link>
            <Link href="/characters/daniel" className="text-blue-600 hover:underline text-sm">Daniel — Character Study</Link>
            <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">All Bible Quizzes</Link>
          </div>
        </section>

      </main>
    </div>
  );
}
