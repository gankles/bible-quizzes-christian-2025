import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';

const SITE_URL = 'https://biblemaximum.com';

export const metadata: Metadata = {
  title: '33 Short Prayers for Daily Life — Quick, Powerful, Scripture-Based Prayer | Bible Maximum',
  description: '33 short prayers for daily life — quick, powerful, Scripture-based prayers for morning, strength, peace, healing, anxiety, forgiveness, protection, guidance, work, family, and more. Ready to pray right now.',
  keywords: ['short prayers', 'daily prayers', 'powerful prayers', 'morning prayer', 'prayer for strength', 'prayer for peace', 'prayer for healing', 'prayer for anxiety', 'quick prayers', 'simple prayers', 'prayer for protection', 'prayer for guidance', 'bedtime prayer', 'prayer for forgiveness', 'prayer before meals', 'scripture based prayers', 'short daily prayers'],
  alternates: { canonical: '/short-prayers' },
  openGraph: {
    title: '33 Short Prayers for Daily Life — Quick, Powerful, Scripture-Based',
    description: 'Quick, powerful prayers for every situation — based on Scripture, ready to use right now.',
    url: `${SITE_URL}/short-prayers`,
    type: 'article',
    images: ['/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png'],
  },
};

// ─── 33 Prayers ──────────────────────────────────────────────

const PRAYERS = [
  {
    number: 1,
    title: 'A Morning Prayer',
    category: 'Morning',
    prayer: 'Father, this day belongs to You. Before I check my phone, before I start my list — I give this day to You. Order my steps, guard my words, and fill me with Your Holy Spirit so that everything I do brings glory to Jesus. In His name, amen.',
    scripture: 'Psalm 5:3',
    scriptureText: 'My voice shalt thou hear in the morning, O Lord; in the morning will I direct my prayer unto thee, and will look up.',
    why: 'Starting the day with surrender sets the tone for everything that follows. David prayed in the morning before the chaos hit.',
  },
  {
    number: 2,
    title: 'A Prayer for Strength',
    category: 'Strength',
    prayer: 'Father, I\'m running on empty. I don\'t have the strength for what today demands. But through Jesus I can do all things, and by Your Holy Spirit I receive power. Be my strength when mine is gone. Carry what I cannot carry. In Jesus\' name, amen.',
    scripture: 'Isaiah 40:31',
    scriptureText: 'But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles.',
    why: 'God doesn\'t expect you to be strong enough on your own. He specializes in renewing the strength of people who admit they have none.',
  },
  {
    number: 3,
    title: 'A Prayer for Peace',
    category: 'Peace',
    prayer: 'Father, God of peace, my mind won\'t stop racing. I\'m laying every worry at Your feet right now. Through the blood of Jesus I have access to Your throne. Holy Spirit, replace my anxiety with a peace that doesn\'t make sense but holds me together anyway. In Jesus\' name, amen.',
    scripture: 'Philippians 4:6-7',
    scriptureText: 'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
    why: 'Paul wrote this from prison. If he could have peace in chains, God can give you peace in whatever you\'re facing.',
  },
  {
    number: 4,
    title: 'A Prayer for Healing',
    category: 'Healing',
    prayer: 'Father, You are Jehovah Rapha — the God who heals. By the stripes of Jesus I ask for healing. Holy Spirit, touch this body, this pain, this diagnosis. Whether You heal instantly, gradually, or ultimately in eternity — I trust Your plan. In Jesus\' name, amen.',
    scripture: 'Psalm 147:3',
    scriptureText: 'He healeth the broken in heart, and bindeth up their wounds.',
    why: 'God heals physically, emotionally, and spiritually. This prayer submits the request while trusting the outcome to His wisdom.',
  },
  {
    number: 5,
    title: 'A Prayer for Anxiety',
    category: 'Anxiety',
    prayer: 'Father, I\'m anxious about things I can\'t control. Jesus said not to worry about tomorrow. Holy Spirit, help me release what I\'m gripping so tightly and trust that the Father is already working in the situation I\'m afraid of. In Jesus\' name, amen.',
    scripture: 'Matthew 6:34',
    scriptureText: 'Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself.',
    why: 'Jesus says deal with today. Tomorrow\'s problems aren\'t yours to solve yet. Anxiety borrows trouble from a future that may never happen.',
  },
  {
    number: 6,
    title: 'A Prayer for Forgiveness',
    category: 'Forgiveness',
    prayer: 'Father, I\'ve sinned — and I\'m not going to make excuses. I confess it and claim the blood of Jesus that covers every sin. Cleanse me by Your Holy Spirit and help me walk differently starting now. Thank You that Your mercy is new every morning. In Jesus\' name, amen.',
    scripture: '1 John 1:9',
    scriptureText: 'If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.',
    why: 'God doesn\'t require a lengthy explanation. He requires honesty. Confession is agreeing with God about what you did — and receiving His forgiveness.',
  },
  {
    number: 7,
    title: 'A Prayer for Guidance',
    category: 'Guidance',
    prayer: 'Father, I don\'t know which way to go. This decision feels bigger than me. I trust You instead of my own analysis. Holy Spirit, make the path clear. Jesus, You are the Way — lead me. Give me the courage to follow when You do. In Jesus\' name, amen.',
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
    prayer: 'Father, I ask You to surround me and my family with Your protection today. Cover us under the blood of Jesus. Holy Spirit, guard us from harm — seen and unseen, physical and spiritual. You are our refuge and fortress. In Jesus\' name, amen.',
    scripture: 'Psalm 91:1-2',
    scriptureText: 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.',
    why: 'God\'s protection isn\'t a magic shield against all difficulty — it\'s His presence with you in every situation.',
  },
  {
    number: 10,
    title: 'A Prayer Before a Difficult Conversation',
    category: 'Wisdom',
    prayer: 'Father, I need Your words, not mine. Jesus, You always spoke truth with grace — teach me. Holy Spirit, guard my tongue, help me listen more than I talk, and let this conversation honor God. In Jesus\' name, amen.',
    scripture: 'James 1:19',
    scriptureText: 'Let every man be swift to hear, slow to speak, slow to wrath.',
    why: 'Most conflicts escalate because someone speaks before thinking. This prayer puts God in the conversation before it starts.',
  },
  {
    number: 11,
    title: 'A Prayer for Your Marriage',
    category: 'Family',
    prayer: 'Father, protect this marriage. Help us love each other the way Jesus loves the church — sacrificially, patiently, without keeping score. Holy Spirit, heal what\'s broken and strengthen what\'s weak. Keep us fighting for each other, not against each other. In Jesus\' name, amen.',
    scripture: 'Ephesians 5:25',
    scriptureText: 'Husbands, love your wives, even as Christ also loved the church, and gave himself for it.',
    why: 'Every strong marriage is built on prayer. When you pray for your spouse, it\'s hard to stay angry at them.',
  },
  {
    number: 12,
    title: 'A Prayer for Your Children',
    category: 'Family',
    prayer: 'Father, I place my children in Your hands. Protect their hearts, shape their character, and draw them to Jesus. Holy Spirit, guide me to parent them well — with grace when they fail and encouragement when they grow. In Jesus\' name, amen.',
    scripture: 'Proverbs 22:6',
    scriptureText: 'Train up a child in the way he should go: and when he is old, he will not depart from it.',
    why: 'You can\'t control your children\'s choices, but you can pray for the One who can reach their hearts.',
  },
  {
    number: 13,
    title: 'A Prayer for Work',
    category: 'Daily Life',
    prayer: 'Father, help me work as if I\'m working for Jesus today — because I am. Whether anyone notices or not, let my effort honor You. Holy Spirit, give me focus, integrity, and patience with difficult people. In Jesus\' name, amen.',
    scripture: 'Colossians 3:23',
    scriptureText: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men.',
    why: 'Your job isn\'t just a paycheck. It\'s a platform for faithfulness. Praying before work transforms a mundane day into ministry.',
  },
  {
    number: 14,
    title: 'A Prayer for Grief',
    category: 'Comfort',
    prayer: 'Father, this loss is crushing me. I don\'t have words — just tears. Jesus, You wept at Lazarus\' tomb — You understand. Holy Spirit, be the Comforter You promised to be. Hold me together when I\'m falling apart. In Jesus\' name, amen.',
    scripture: 'Psalm 34:18',
    scriptureText: 'The Lord is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.',
    why: 'God doesn\'t ask you to pray eloquently in grief. He asks you to show up. Tears are a language He understands perfectly.',
  },
  {
    number: 15,
    title: 'A Prayer for Financial Needs',
    category: 'Provision',
    prayer: 'Father, You know what I need before I ask. I\'m trusting You with my finances through Jesus who said not to worry. Holy Spirit, give me wisdom to steward well what the Father provides. You\'ve never failed me. In Jesus\' name, amen.',
    scripture: 'Philippians 4:19',
    scriptureText: 'But my God shall supply all your need according to his riches in glory by Christ Jesus.',
    why: 'God promises to supply needs, not wants. This prayer acknowledges the difference while trusting His provision.',
  },
  {
    number: 16,
    title: 'A Prayer Before Meals',
    category: 'Daily Life',
    prayer: 'Father, thank You for this food and the hands that prepared it. We receive it with gratitude in Jesus\' name. Holy Spirit, bless this meal to nourish our bodies and our conversation to nourish our souls. Amen.',
    scripture: '1 Timothy 4:4-5',
    scriptureText: 'For every creature of God is good, and nothing to be refused, if it be received with thanksgiving.',
    why: 'A short, honest meal prayer beats a long, mindless one. Gratitude for daily bread is exactly what Jesus taught in the Lord\'s Prayer.',
  },
  {
    number: 17,
    title: 'A Bedtime Prayer',
    category: 'Evening',
    prayer: 'Father, as this day ends, I give You its failures and its victories. Forgive where I fell short through the blood of Jesus. Thank You for where Your grace carried me. Holy Spirit, watch over me as I sleep. I trust tomorrow to You. In Jesus\' name, amen.',
    scripture: 'Psalm 4:8',
    scriptureText: 'I will both lay me down in peace, and sleep: for thou, Lord, only makest me dwell in safety.',
    why: 'Reviewing the day with God before sleep settles your mind and releases tomorrow\'s worries to Him.',
  },
  {
    number: 18,
    title: 'A Prayer When You Don\'t Know What to Pray',
    category: 'Honesty',
    prayer: 'Holy Spirit, I don\'t even know what to ask for. My mind is blank and my heart is heavy. You know what I need better than I do. Pray through me right now. I trust Your intercession. In Jesus\' name, amen.',
    scripture: 'Romans 8:26',
    scriptureText: 'The Spirit itself maketh intercession for us with groanings which cannot be uttered.',
    why: 'When words fail, the Holy Spirit takes over. You don\'t need eloquence — you need honesty.',
  },
  {
    number: 19,
    title: 'A Prayer for Patience',
    category: 'Character',
    prayer: 'Father God, I\'m about to lose it. Fill me with the patience that only Your Holy Spirit can produce — the kind that comes from Your character, not my effort. Help me respond like Jesus would. Slow me down before I say something I can\'t take back. In His name, amen.',
    scripture: 'Galatians 5:22',
    scriptureText: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith.',
    why: 'Patience is a fruit of the Spirit, not a personality trait. You can\'t manufacture it — you have to ask for it.',
  },
  {
    number: 20,
    title: 'A Prayer for Someone Who Hurt You',
    category: 'Forgiveness',
    prayer: 'Father, You know what they did. I\'m angry and I have a right to be. But Jesus forgave me for worse — from a cross, while I was still sinning. Help me release this bitterness through the power of Your Holy Spirit. I choose to forgive. Help me mean it. In Jesus\' name, amen.',
    scripture: 'Matthew 6:14',
    scriptureText: 'For if ye forgive men their trespasses, your heavenly Father will also forgive you.',
    why: 'Forgiveness isn\'t a feeling — it\'s a decision. This prayer starts the process. The feelings will follow.',
  },
  {
    number: 21,
    title: 'A Prayer for Boldness',
    category: 'Faith',
    prayer: 'Lord Jesus, I\'m scared to speak up. Fear of rejection, fear of looking foolish — it\'s holding me back. Give me the boldness of Peter after Pentecost. Fill me with Your Holy Spirit so I care more about the Father\'s approval than anyone else\'s. Amen.',
    scripture: 'Acts 4:29',
    scriptureText: 'And now, Lord, behold their threatenings: and grant unto thy servants, that with all boldness they may speak thy word.',
    why: 'The early church didn\'t pray for safety — they prayed for boldness. Sometimes the most spiritual prayer is asking for courage.',
  },
  {
    number: 22,
    title: 'A Prayer of Surrender',
    category: 'Surrender',
    prayer: 'Father, I\'m done trying to control this. My plans haven\'t worked. I surrender this situation — completely, genuinely — to Your sovereign hands. Like Jesus in Gethsemane: not my will, but Yours. Holy Spirit, give me the strength to mean it. Amen.',
    scripture: 'Matthew 26:39',
    scriptureText: 'Not as I will, but as thou wilt.',
    why: 'If Jesus surrendered His will to the Father, so can you. Surrender isn\'t weakness — it\'s the ultimate act of trust.',
  },
  {
    number: 23,
    title: 'A Prayer for Wisdom at Work',
    category: 'Wisdom',
    prayer: 'Father, I face a decision I\'m not qualified to make. But You promise wisdom to anyone who asks. I\'m asking now — give me the mind of Christ, the guidance of Your Holy Spirit, and the discernment to choose rightly. In Jesus\' name, amen.',
    scripture: 'James 1:5',
    scriptureText: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not.',
    why: 'God gives wisdom generously and without making you feel stupid for asking. That\'s the kind of boss you wish you had — and He\'s available 24/7.',
  },
  {
    number: 24,
    title: 'A Prayer for a Friend in Pain',
    category: 'Intercession',
    prayer: 'Lord Jesus, my friend is hurting and I don\'t know how to help. I bring them before the Father right now. Send Your Holy Spirit to comfort them, strengthen them, and remind them they\'re not alone. Use me however You need to. Amen.',
    scripture: '1 Timothy 2:1',
    scriptureText: 'I exhort therefore, that...supplications, prayers, intercessions...be made for all men.',
    why: 'Intercessory prayer is standing in the gap for someone who may not have the strength to pray for themselves. It\'s one of the most loving things you can do.',
  },
  {
    number: 25,
    title: 'A Prayer Against Temptation',
    category: 'Spiritual Warfare',
    prayer: 'Father, I feel the pull right now. This temptation is strong and I\'m weak. But Jesus was tempted in every way and never sinned. By the power of Your Holy Spirit, give me a way of escape. I choose obedience over comfort. In Jesus\' name, amen.',
    scripture: '1 Corinthians 10:13',
    scriptureText: 'God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape.',
    why: 'God doesn\'t remove all temptation — He promises a way out every time. This prayer activates that promise.',
  },
  {
    number: 26,
    title: 'A Prayer for Your Church',
    category: 'Community',
    prayer: 'Lord Jesus, You love the church — You died for it. I pray for my church: protect our leaders, unite our members, and fill us with Your Holy Spirit. Let us be a light in our community that points people to the Father. Amen.',
    scripture: 'Ephesians 5:25',
    scriptureText: 'Christ also loved the church, and gave himself for it.',
    why: 'The church isn\'t a building — it\'s people. Praying for your church strengthens the body of Christ from the inside out.',
  },
  {
    number: 27,
    title: 'A Prayer for Contentment',
    category: 'Character',
    prayer: 'Father, I keep comparing my life to others and it\'s stealing my joy. Jesus had no home, no wealth, no status — and He was complete in You. Teach me that kind of contentment through Your Holy Spirit. Enough is enough when You are enough. Amen.',
    scripture: 'Philippians 4:11-12',
    scriptureText: 'I have learned, in whatsoever state I am, therewith to be content.',
    why: 'Paul wrote this from prison. Contentment isn\'t having everything — it\'s knowing the One who is everything.',
  },
  {
    number: 28,
    title: 'A Prayer for the Lost',
    category: 'Evangelism',
    prayer: 'Father, there are people I love who don\'t know Jesus yet. Open their eyes. Soften their hearts. Send Your Holy Spirit to convict and draw them. Use me to plant seeds — and give me boldness to speak when You open the door. In Jesus\' name, amen.',
    scripture: '2 Peter 3:9',
    scriptureText: 'The Lord is...not willing that any should perish, but that all should come to repentance.',
    why: 'God wants them saved more than you do. This prayer aligns your heart with His and invites Him to use you in the process.',
  },
  {
    number: 29,
    title: 'A Prayer of Praise',
    category: 'Worship',
    prayer: 'Father God, You are holy, sovereign, faithful, and good. Jesus, You are the King of Kings and my Savior. Holy Spirit, You are my Comforter and Guide. I don\'t need anything from You right now — I just want to tell You that You are worthy of all praise. Amen.',
    scripture: 'Psalm 145:3',
    scriptureText: 'Great is the Lord, and greatly to be praised; and his greatness is unsearchable.',
    why: 'Sometimes the best prayer asks for nothing. Pure praise — worshiping God for who He is — is the highest form of prayer.',
  },
  {
    number: 30,
    title: 'A Prayer for Restless Nights',
    category: 'Evening',
    prayer: 'Father, my mind won\'t shut off. Every worry is louder in the dark. I cast every anxious thought on You right now — because Jesus said You care for me. Let Your Holy Spirit bring the peace that lets me rest. I surrender this night to You. Amen.',
    scripture: '1 Peter 5:7',
    scriptureText: 'Casting all your care upon him; for he careth for you.',
    why: 'Insomnia often comes from carrying burdens God never intended you to hold overnight. This prayer transfers them.',
  },
  {
    number: 31,
    title: 'A Prayer Before Reading the Bible',
    category: 'Study',
    prayer: 'Holy Spirit, open my eyes as I read Your Word. Don\'t let me just scan pages — let me hear the Father speaking to me. Show me Jesus on every page. Give me understanding, conviction, and the courage to obey what I discover. Amen.',
    scripture: 'Psalm 119:18',
    scriptureText: 'Open thou mine eyes, that I may behold wondrous things out of thy law.',
    why: 'The Bible is a spiritual book that requires spiritual illumination. The Holy Spirit authored it — He\'s the best one to explain it.',
  },
  {
    number: 32,
    title: 'A Prayer for the Nation',
    category: 'Intercession',
    prayer: 'Father, I lift up this nation to You. We need Your mercy more than Your judgment. Turn hearts back to You. Raise up leaders who fear You and serve the people. Let the gospel of Jesus Christ go forward unhindered. Send revival by Your Holy Spirit. Amen.',
    scripture: '2 Chronicles 7:14',
    scriptureText: 'If my people, which are called by my name, shall humble themselves, and pray...then will I hear from heaven, and will forgive their sin, and will heal their land.',
    why: 'National transformation starts with God\'s people praying — not with politics, protests, or social media. Humble prayer moves God\'s hand.',
  },
  {
    number: 33,
    title: 'The Sinner\'s Prayer',
    category: 'Salvation',
    prayer: 'God the Father, I know I\'m a sinner. I believe Your Son Jesus Christ died on the cross for my sins and rose from the dead. I repent and put my trust in Him alone for my salvation. Holy Spirit, come into my life — forgive me, make me new, and seal me as Your own. I receive Jesus as my Lord and Savior. In His name, amen.',
    scripture: 'Romans 10:9',
    scriptureText: 'That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.',
    why: 'This is the most important prayer anyone can ever pray. It\'s not about the exact words — it\'s about an honest heart turning to the Father through faith in Jesus, sealed by the Holy Spirit. If you prayed this and meant it, your eternity just changed.',
  },
];

const FAQ_ITEMS = [
  { question: 'Can I use these prayers word-for-word?', answer: 'Absolutely. These prayers are meant to be starting points. Use them exactly as written, or let them spark your own words. God cares about your heart, not your vocabulary. Jesus gave the Lord\'s Prayer as a template — these work the same way.' },
  { question: 'How many times should I pray each day?', answer: 'The Bible says "pray without ceasing" (1 Thessalonians 5:17), which means maintaining an ongoing conversation with God throughout the day. Daniel prayed three times daily (Daniel 6:10). There\'s no required number — quality matters more than frequency. Even one honest prayer is better than ten distracted ones.' },
  { question: 'Do short prayers actually work?', answer: 'Yes. Elijah\'s prayer on Mount Carmel was 63 words — and fire fell from heaven (1 Kings 18:36-37). The tax collector\'s prayer was 7 words: "God be merciful to me a sinner" — and he went home justified (Luke 18:13). God responds to faith and sincerity, not length.' },
  { question: 'What if I don\'t feel anything when I pray?', answer: 'Feelings are unreliable. Prayer works by faith, not emotion. Some of the most powerful prayers in the Bible were prayed through tears, doubt, and exhaustion (Psalm 22, Matthew 26:39). Keep praying whether you feel it or not. Faithfulness in prayer, not feelings during prayer, is what God honors.' },
  { question: 'Should I pray to the Father, Jesus, or the Holy Spirit?', answer: 'The normal biblical pattern is praying to the Father, through Jesus the Son, in the power of the Holy Spirit (Ephesians 2:18). Jesus taught "Our Father" (Matthew 6:9). But Stephen prayed to Jesus directly (Acts 7:59), and the Spirit intercedes for us (Romans 8:26). All three are God — you can address any of them.' },
  { question: 'Is the "sinner\'s prayer" in the Bible?', answer: 'The exact phrase isn\'t, but the concept is everywhere. The tax collector prayed "God be merciful to me a sinner" (Luke 18:13). Romans 10:9-10 says confessing Jesus as Lord and believing in the resurrection leads to salvation. Prayer #33 puts those biblical truths into words.' },
  { question: 'Can I pray for myself or is that selfish?', answer: 'It\'s not selfish — it\'s biblical. Jesus prayed for Himself in Gethsemane (Matthew 26:39). Paul asked God to remove his thorn (2 Corinthians 12:8). Philippians 4:6 says "let YOUR requests be made known unto God." God wants to hear your needs. Just don\'t pray only for yourself.' },
  { question: 'What\'s the best prayer for anxiety?', answer: 'Prayers #3 and #5 address anxiety directly, based on Philippians 4:6-7 and Matthew 6:34. Prayer #30 covers restless nights. The key is specificity — name the worry, hand it to the Father, and thank Him in advance through Jesus Christ.' },
  { question: 'Why do these prayers mention the Father, Jesus, and the Holy Spirit?', answer: 'Because prayer is Trinitarian. The Father hears, Jesus mediates (1 Timothy 2:5), and the Holy Spirit empowers and intercedes (Romans 8:26). When you pray, all three persons of the Trinity are active. These prayers reflect that biblical reality.' },
];


export default function ShortPrayersPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    additionalType: 'https://schema.org/LearningResource',
    headline: '33 Short Prayers for Daily Life — Quick, Powerful, Scripture-Based',
    description: 'Quick, powerful prayers for every situation — based on Scripture, ready to use right now.',
    url: `${SITE_URL}/short-prayers`,
    datePublished: '2026-03-09',
    dateModified: '2026-03-09',
    wordCount: 10000,
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
            <li><Link href="/" className="text-sacred hover:underline">Home</Link></li>
            <li className="text-ink-light mx-2">/</li>
            <li><Link href="/prayer" className="text-sacred hover:underline">Prayer</Link></li>
            <li className="text-ink-light mx-2">/</li>
            <li className="text-ink-muted font-medium">Short Prayers</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative bg-scripture dark:bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png"
            alt="33 short prayers for daily life — quick, powerful, Scripture-based"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-sacred text-sm font-semibold tracking-wider uppercase mb-3">Daily Prayer Guide</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-display leading-tight mb-4">33 Short Prayers for Daily Life</h1>
          <p className="text-lg md:text-xl text-sacred-light/90 max-w-2xl mx-auto leading-relaxed mb-2">Quick, Powerful, Scripture-Based</p>
          <p className="text-base text-sacred-light/70 max-w-2xl mx-auto leading-relaxed mb-6">
            You don&apos;t need 30 minutes and perfect words. You need 30 seconds and an honest heart. Every prayer below mentions God the Father, Jesus the Son, and the Holy Spirit — because prayer is Trinitarian.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="#prayer-1" className="inline-block bg-white text-scripture font-bold px-6 py-3 rounded-lg hover:bg-sacred-light transition-colors">
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
            <p className="text-2xl font-bold text-scripture dark:text-sacred">33</p>
            <p className="text-xs text-ink-muted dark:text-ink-light mt-1">Prayers</p>
          </div>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-scripture dark:text-sacred">{categories.length}</p>
            <p className="text-xs text-ink-muted dark:text-ink-light mt-1">Life Situations</p>
          </div>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-scripture dark:text-sacred">30s</p>
            <p className="text-xs text-ink-muted dark:text-ink-light mt-1">Each Prayer</p>
          </div>
        </div>

        {/* Jump Links */}
        <nav className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm p-6 mb-10">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-3">Jump to a Prayer</h2>
          <div className="flex flex-wrap gap-2">
            {PRAYERS.map((p) => (
              <Link key={p.number} href={`#prayer-${p.number}`} className="text-xs bg-sacred-light dark:bg-sacred-light0/20 text-scripture dark:text-sacred px-3 py-1.5 rounded-full hover:bg-sacred-light transition-colors">
                {p.number}. {p.title.replace('A Prayer ', '').replace('The ', '')}
              </Link>
            ))}
          </div>
        </nav>

        {/* Intro */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Why Short Prayers Work</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            Elijah called fire from heaven with a 63-word prayer (<Link href="/cross-references/1-kings/18/36" className="text-sacred hover:underline">1 Kings 18:36-37</Link>). The tax collector got justified with 7 words: &ldquo;God be merciful to me a sinner&rdquo; (<Link href="/cross-references/luke/18/13" className="text-sacred hover:underline">Luke 18:13</Link>). Jesus Himself criticized long prayers meant to impress people (<Link href="/cross-references/matthew/6/7" className="text-sacred hover:underline">Matthew 6:7</Link>).
          </p>
          <p className="text-scripture dark:text-ink-light leading-relaxed">
            God responds to faith and honesty, not word count. Each prayer below is rooted in Scripture, addresses a real life situation, and takes less than 30 seconds. Every prayer is addressed to the Father, through Jesus the Son, in the power of the Holy Spirit — because that&apos;s how biblical prayer works (<Link href="/cross-references/ephesians/2/18" className="text-sacred hover:underline">Ephesians 2:18</Link>).
          </p>
        </section>

        {/* Prayer Simplicity */}
        <section className="mb-10 bg-scripture/5 dark:bg-dark-border/20 border border-scripture/20 dark:border-dark-border rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-scripture dark:text-white font-display mb-4">Five Types of Simple Prayer</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            We&apos;ve made prayer very complicated. Nobody has to tell you how to talk to a friend or a neighbor — it comes spontaneous, natural. You speak from your heart. Prayer works the same way:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { type: 'Prayer of Faith', example: '"Lord, I don\'t understand, but Thy will be done."' },
              { type: 'Prayer of Thanksgiving', example: '"Thank You, Lord."' },
              { type: 'Prayer of Hope', example: '"Lord, help me — I can\'t do anything about this."' },
              { type: 'Prayer of Patience', example: '"Lord, I accept this. Please help me."' },
              { type: 'Prayer of Desperation', example: '"Lord, I can\'t take one more thing."' },
            ].map((item) => (
              <div key={item.type} className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-4">
                <p className="font-bold text-scripture dark:text-sacred text-sm mb-1">{item.type}</p>
                <p className="text-ink-muted dark:text-ink-light text-sm italic">{item.example}</p>
              </div>
            ))}
          </div>
          <p className="text-ink-muted dark:text-ink-light text-sm mt-4 leading-relaxed">
            Every prayer below fits one of these five types. Some are three sentences. Some are two. God isn&apos;t counting your words — He&apos;s listening to your heart.
          </p>
        </section>

        {/* All 33 Prayers at a Glance — Summary Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">All 33 Prayers at a Glance</h2>
          <p className="text-ink-muted dark:text-ink-light mb-4 text-sm">Click any prayer to jump to the full text, Scripture reference, and explanation.</p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred w-10">#</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Prayer</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden sm:table-cell">Category</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden md:table-cell">Scripture</th>
                </tr>
              </thead>
              <tbody>
                {PRAYERS.map((p) => (
                  <tr key={p.number} className="border-t border-grace dark:border-dark-border hover:bg-sacred-light/50 dark:hover:bg-dark-border/20">
                    <td className="px-4 py-2 font-bold text-scripture dark:text-sacred">{p.number}</td>
                    <td className="px-4 py-2"><a href={`#prayer-${p.number}`} className="text-sacred hover:underline">{p.title}</a></td>
                    <td className="px-4 py-2 hidden sm:table-cell"><span className="bg-sacred/10 dark:bg-sacred-light0/30 text-scripture dark:text-sacred text-xs px-2 py-0.5 rounded-full">{p.category}</span></td>
                    <td className="px-4 py-2 text-ink-muted dark:text-ink-light hidden md:table-cell text-xs">{p.scripture}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* All 33 Prayers */}
        <div className="space-y-6 mb-12">
          {PRAYERS.map((p) => (
            <section key={p.number} id={`prayer-${p.number}`} className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden scroll-mt-20">
              <div className="bg-scripture/5 dark:bg-dark-border/30 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-scripture text-white flex items-center justify-center text-sm font-bold shrink-0">{p.number}</span>
                  <h2 className="font-bold text-scripture dark:text-white text-sm">{p.title}</h2>
                </div>
                <span className="text-xs bg-sacred/10 dark:bg-sacred-light0/30 text-scripture dark:text-sacred px-2 py-0.5 rounded-full">{p.category}</span>
              </div>
              <div className="p-5">
                <blockquote className="text-ink-muted dark:text-ink-light leading-relaxed italic border-l-3 border-scripture/30 pl-4 mb-4">
                  {p.prayer}
                </blockquote>
                <div className="bg-sacred-light dark:bg-sacred-light0/20 rounded-lg p-3 mb-3">
                  <p className="text-xs font-bold text-sacred dark:text-sacred mb-1">Based on {p.scripture}</p>
                  <p className="text-ink-muted dark:text-ink-light text-xs italic">&ldquo;{p.scriptureText}&rdquo;</p>
                </div>
                <p className="text-ink-muted dark:text-ink-light text-sm leading-relaxed"><strong>Why this prayer:</strong> {p.why}</p>
              </div>
            </section>
          ))}
        </div>

        {/* Gospel CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-scripture via-scripture/95 to-scripture/80 rounded-xl p-8 md:p-10 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">Prayer #33 Is the One That Matters Most</h2>
            <p className="text-sacred-light/90 max-w-2xl mx-auto leading-relaxed mb-6">
              Every other prayer on this list flows from prayer #33. If you&apos;ve never placed your trust in Jesus Christ, that&apos;s the prayer to start with. Everything changes when you go from praying <em>to</em> God to praying <em>as a child of</em> God.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="#prayer-33" className="inline-block bg-white text-scripture font-bold px-6 py-3 rounded-lg hover:bg-sacred-light transition-colors">
                Read Prayer #33
              </Link>
              <Link href="/john-3-16" className="inline-block border-2 border-white/40 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
                John 3:16 Explained
              </Link>
            </div>
          </div>
        </section>

        {/* ACTS Prayer Model */}
        <section className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">The ACTS Prayer Model</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            Not sure how to structure a prayer? The ACTS model gives you a simple framework that keeps prayer balanced and God-centered.
          </p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Letter</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Element</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden sm:table-cell">What It Means</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden md:table-cell">Example from This Page</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { letter: 'A', element: 'Adoration', meaning: 'Praise God for who He is — His character, His holiness, His power.', example: 'Prayer #30 (Praise)' },
                  { letter: 'C', element: 'Confession', meaning: 'Agree with God about your sin. Be specific and honest.', example: 'Prayer #6 (Forgiveness)' },
                  { letter: 'T', element: 'Thanksgiving', meaning: 'Thank God for what He has done — answered prayers, daily provision, salvation.', example: 'Prayer #8 (Gratitude)' },
                  { letter: 'S', element: 'Supplication', meaning: 'Bring your requests — for yourself and others. Be specific.', example: 'Prayer #4 (Healing)' },
                ].map((item) => (
                  <tr key={item.letter} className="border-t border-grace dark:border-dark-border">
                    <td className="px-4 py-3 font-bold text-2xl text-scripture dark:text-sacred">{item.letter}</td>
                    <td className="px-4 py-3 font-medium text-scripture dark:text-white">{item.element}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light hidden sm:table-cell">{item.meaning}</td>
                    <td className="px-4 py-3 hidden md:table-cell"><a href={`#prayer-${item.letter === 'A' ? '30' : item.letter === 'C' ? '6' : item.letter === 'T' ? '8' : '4'}`} className="text-sacred hover:underline text-xs">{item.example}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <Link href="/prayer" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm hover:border-sacred/50 transition-colors group">
              <p className="text-xs font-bold text-sacred uppercase tracking-wider mb-1">Complete Guide</p>
              <h3 className="font-bold text-scripture dark:text-white group-hover:text-gold-dark transition-colors">What Is Prayer?</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm mt-1">Types, Greek/Hebrew words, famous prayers, and how to build a prayer life.</p>
            </Link>
            <Link href="/bible-verses#prayer" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm hover:border-sacred/50 transition-colors group">
              <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Verse Collection</p>
              <h3 className="font-bold text-scripture dark:text-white group-hover:text-gold-dark transition-colors">Bible Verses About Prayer</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm mt-1">Every key verse on prayer with commentary.</p>
            </Link>
            <Link href="/bible-topics/prayer" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm hover:border-sacred/50 transition-colors group">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Topical Study</p>
              <h3 className="font-bold text-scripture dark:text-white group-hover:text-gold-dark transition-colors">Prayer — All Bible References</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm mt-1">Every mention of prayer across all 66 books.</p>
            </Link>
            <Link href="/jesus-christ" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm hover:border-sacred/50 transition-colors group">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Pillar Study</p>
              <h3 className="font-bold text-scripture dark:text-white group-hover:text-gold-dark transition-colors">Who Is Jesus Christ?</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm mt-1">The one who taught us to pray — and who prays for us now.</p>
            </Link>
          </div>
        </section>

        {/* Continue Your Study */}
        <section className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/prayer" className="text-sacred hover:underline text-sm">What Is Prayer? Complete Guide</Link>
            <Link href="/bible-verses" className="text-sacred hover:underline text-sm">100+ Bible Verses by Topic</Link>
            <Link href="/bible-verses#prayer" className="text-sacred hover:underline text-sm">Bible Verses About Prayer</Link>
            <Link href="/bible-verses#anxiety" className="text-sacred hover:underline text-sm">Bible Verses About Anxiety</Link>
            <Link href="/bible-verses#strength" className="text-sacred hover:underline text-sm">Bible Verses About Strength</Link>
            <Link href="/bible-verses#peace" className="text-sacred hover:underline text-sm">Bible Verses About Peace</Link>
            <Link href="/john-3-16" className="text-sacred hover:underline text-sm">John 3:16 Explained</Link>
            <Link href="/jesus-christ" className="text-sacred hover:underline text-sm">Who Is Jesus Christ?</Link>
            <Link href="/psalm-23" className="text-sacred hover:underline text-sm">Psalm 23 Study</Link>
            <Link href="/philippians-4-13" className="text-sacred hover:underline text-sm">Philippians 4:13 Study</Link>
            <Link href="/bible-topics/prayer" className="text-sacred hover:underline text-sm">Topical Study: Prayer</Link>
            <Link href="/bible-topics/forgiveness" className="text-sacred hover:underline text-sm">Topical Study: Forgiveness</Link>
            <Link href="/greek-word/proseuche" className="text-sacred hover:underline text-sm">Greek: Proseuche (Prayer)</Link>
            <Link href="/characters/elijah" className="text-sacred hover:underline text-sm">Elijah — Character Study</Link>
            <Link href="/characters/daniel" className="text-sacred hover:underline text-sm">Daniel — Character Study</Link>
            <Link href="/bible-quizzes" className="text-sacred hover:underline text-sm">All Bible Quizzes</Link>
          </div>
        </section>

      </main>
    </div>
  );
}
