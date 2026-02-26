import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { StructuredData } from '@/components/StructuredData';
import PillarQuiz from '@/components/PillarQuiz';

const SITE_URL = 'https://biblemaximum.com';

export const metadata: Metadata = {
  title: 'Psalm 23 Explained — The Lord is My Shepherd | Bible Maximum',
  description: 'What does Psalm 23 mean? A complete verse-by-verse study of The Lord is My Shepherd with key Hebrew words, David\'s shepherd background, cross-references, quiz, and FAQ.',
  keywords: ['psalm 23', 'psalm 23 meaning', 'the lord is my shepherd', 'psalm 23 explained', 'valley of the shadow of death', 'psalm 23 verse by verse', 'green pastures still waters', 'thy rod and thy staff', 'goodness and mercy', 'psalm 23 kjv'],
  alternates: {
    canonical: '/psalm-23',
  },
  openGraph: {
    title: 'Psalm 23 Explained — The Lord is My Shepherd',
    description: 'A complete verse-by-verse study of Psalm 23 with Hebrew word meanings, David\'s shepherd background, cross-references, quiz, and FAQ.',
    url: `${SITE_URL}/psalm-23`,
    type: 'article',
    images: ['/images/alex.iaquinto_4k_close_up_photo_of_man_praying_while_the_glory__281c620b-2697-4bce-88fc-db85b2e1c270.png'],
  },
};

function loadPsalm23Quiz() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'quizzes', 'psalm-23-pillar.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const VERSE_STUDY = [
  {
    verse: 1,
    text: 'The LORD is my shepherd; I shall not want.',
    hebrewWords: [
      { word: 'Yahweh (LORD)', meaning: 'The personal covenant name of God — not a generic deity but the God who made promises to Israel and keeps them.' },
      { word: 'Ro\'i (shepherd)', meaning: 'From ra\'ah, meaning to tend, pasture, or feed. A shepherd provides, protects, guides, and knows each sheep personally.' },
    ],
    explanation: 'David begins with the most personal statement imaginable: the eternal God of the universe is his shepherd. In the ancient world, kings called themselves shepherds of their people — but David reverses this. He, the king, declares himself a sheep under God\'s care. "I shall not want" is the logical conclusion: if the LORD Himself tends you, what could you possibly lack? This is not a promise of luxury but of sufficiency. God supplies every genuine need — spiritual rest, physical provision, emotional peace, and eternal security.',
  },
  {
    verse: 2,
    text: 'He maketh me to lie down in green pastures: he leadeth me beside the still waters.',
    hebrewWords: [
      { word: 'Deshe (green pastures)', meaning: 'Tender, fresh grass — the richest grazing land. Represents spiritual nourishment and abundant provision.' },
      { word: 'Menuchah (still/quiet)', meaning: 'Rest, quietness, ease. These are waters of rest — calm and safe for drinking.' },
    ],
    explanation: 'Sheep will not lie down unless they feel safe, well-fed, free from tension with other sheep, and free from pests. That the shepherd "maketh" David lie down implies God creates the conditions for true rest. "Green pastures" picture abundant spiritual nourishment — God\'s Word, His presence, His provision. "Still waters" are essential because sheep instinctively fear rushing water and will dehydrate rather than drink from a turbulent stream. God does not drive His people to drink — He gently leads them to quiet, refreshing places where they can be restored.',
  },
  {
    verse: 3,
    text: 'He restoreth my soul: he leadeth me in the paths of righteousness for his name\'s sake.',
    hebrewWords: [
      { word: 'Shub (restoreth)', meaning: 'To turn back, return, or bring back. Implies both revival of the weary and retrieval of the wandering.' },
      { word: 'Ma\'gal (paths)', meaning: 'Well-worn tracks, circular paths. Shepherds followed established routes known to be safe and well-watered.' },
    ],
    explanation: 'When a sheep wanders, the shepherd goes after it and brings it back. When a sheep is exhausted, the shepherd revives it. "He restoreth my soul" encompasses both — God recovers us when we stray and refreshes us when we are depleted. "Paths of righteousness" are not just morally right paths but the right paths — the safe, proven trails a shepherd knows from experience. And the reason God does this is not because we deserve it but "for his name\'s sake" — for His own reputation and glory. God\'s faithfulness to us is rooted in His character, not our worthiness.',
  },
  {
    verse: 4,
    text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.',
    hebrewWords: [
      { word: 'Tsalmaveth (shadow of death)', meaning: 'Deep darkness, the deepest gloom. A compound of tsel (shadow) and maveth (death). It describes the darkest possible valley.' },
      { word: 'Shebet (rod)', meaning: 'A short, heavy club used to fight off wolves, lions, and other predators. It represents God\'s active protection.' },
      { word: 'Mish\'eneth (staff)', meaning: 'A long pole with a crook, used to guide sheep, pull them from danger, and count them. It represents God\'s gentle guidance.' },
    ],
    explanation: 'This is the center of the psalm and its dramatic turning point. David does not say "if" but "though" — the valley is a certainty, not a possibility. Every believer will pass through seasons of deep darkness: grief, persecution, illness, and ultimately death itself. But notice: David walks through the valley, not into it with no exit. It is a passage, not a destination. The key phrase is "for thou art with me." In the first three verses, David speaks about God in the third person ("He"). Here he shifts to the second person ("thou") — in the darkest moment, the relationship becomes most intimate. The rod and staff are a shepherd\'s constant tools: the rod to defend against predators and the staff to gently guide and rescue. Together they represent God\'s power to protect and His tenderness to guide.',
  },
  {
    verse: 5,
    text: 'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.',
    hebrewWords: [
      { word: 'Shulchan (table)', meaning: 'A table spread with food. In shepherd imagery, it can refer to a tableland or plateau where sheep graze safely.' },
      { word: 'Dashanta (anointest)', meaning: 'To make fat, to anoint richly. Shepherds rubbed oil on sheep\'s heads to heal wounds and repel insects.' },
    ],
    explanation: 'The imagery shifts from shepherd-and-sheep to host-and-honored-guest, reflecting a second metaphor for God\'s care. God does not merely protect David from his enemies — He lavishes blessings on him right in front of them. The table "in the presence of mine enemies" is an act of bold, defiant provision: David feasts while his foes can only watch. "Thou anointest my head with oil" reflects the ancient custom of anointing an honored guest with perfumed oil — a sign of welcome, joy, and blessing. Shepherds also applied oil to sheep\'s heads to heal scrapes and ward off flies. "My cup runneth over" is the climactic image of abundance: God\'s generosity does not stop at enough — it overflows.',
  },
  {
    verse: 6,
    text: 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.',
    hebrewWords: [
      { word: 'Chesed (mercy)', meaning: 'Loyal love, covenant faithfulness, steadfast lovingkindness. One of the richest words in the Old Testament for God\'s character.' },
      { word: 'Radaph (follow)', meaning: 'To pursue, chase after, run after. This is not passive trailing — God\'s goodness and mercy actively hunt David down.' },
    ],
    explanation: 'David ends with absolute confidence. "Surely" is a word of certainty, not wishful thinking. The Hebrew word for "follow" is radaph — a word typically used for pursuing enemies in battle. David flips it: instead of enemies chasing him, God\'s goodness and chesed (covenant love) pursue him relentlessly. This pursuit is not for a season but "all the days of my life." And beyond this life, David declares "I will dwell in the house of the LORD for ever." The psalm that began with a shepherd\'s field ends in God\'s eternal presence. The sheep is not just cared for in this life — it is brought safely home forever. This is the ultimate hope of every believer: to be with God eternally.',
  },
];

const CROSS_REFERENCES = [
  { ref: 'Psalm 100:3', text: 'Know ye that the LORD he is God: it is he that hath made us, and not we ourselves; we are his people, and the sheep of his pasture.' },
  { ref: 'John 10:11', text: 'I am the good shepherd: the good shepherd giveth his life for the sheep.' },
  { ref: 'John 10:14', text: 'I am the good shepherd, and know my sheep, and am known of mine.' },
  { ref: 'Isaiah 40:11', text: 'He shall feed his flock like a shepherd: he shall gather the lambs with his arm, and carry them in his bosom, and shall gently lead those that are with young.' },
  { ref: 'Revelation 7:17', text: 'For the Lamb which is in the midst of the throne shall feed them, and shall lead them unto living fountains of waters: and God shall wipe away all tears from their eyes.' },
];

const FAQ_ITEMS = [
  {
    question: 'What does Psalm 23 mean?',
    answer: 'Psalm 23 is a declaration of trust in God as a personal shepherd who provides everything His people need. Using the metaphor of a shepherd caring for sheep, David describes God\'s provision (green pastures, still waters), restoration (restoring the soul), protection (rod and staff in the valley), honor (a table before enemies, anointed head, overflowing cup), and eternal promise (dwelling in God\'s house forever). The psalm moves from peaceful pastures through the darkest valley to a triumphant feast, showing that God is faithful in every season of life.',
  },
  {
    question: 'Who wrote Psalm 23 and when?',
    answer: 'Psalm 23 was written by King David, as indicated by its superscription "A Psalm of David." David was a literal shepherd before becoming king — he tended his father Jesse\'s flocks near Bethlehem and fought off lions and bears to protect the sheep (1 Samuel 17:34-36). The exact date of composition is unknown, but many scholars believe David wrote it later in life, reflecting on God\'s faithfulness through decades of triumph and trial — from shepherd boy to fugitive to king of Israel.',
  },
  {
    question: 'What is the valley of the shadow of death?',
    answer: 'The "valley of the shadow of death" (Hebrew: tsalmaveth) refers to the deepest, darkest experiences of life — including but not limited to physical death. It encompasses grief, severe illness, persecution, depression, and any circumstance that feels like walking through impenetrable darkness. The key truth is that it is a valley you walk through, not a place where you stay. And God is present even there. David does not say the valley is imaginary or that we avoid it — he says we need not fear because God walks with us through it.',
  },
  {
    question: 'Why is Psalm 23 read at funerals?',
    answer: 'Psalm 23 is the most commonly read Scripture at funerals because it directly addresses death and what lies beyond it with profound comfort. Verse 4 acknowledges the "valley of the shadow of death" while declaring fearlessness because of God\'s presence. Verse 6 promises dwelling "in the house of the LORD for ever." For grieving families, the psalm affirms that death is not the end — it is a passage through which God accompanies His people into eternal life. The entire psalm reassures mourners that their loved one who trusted in the Lord is now in the Shepherd\'s eternal care.',
  },
  {
    question: 'What do the rod and staff represent in Psalm 23?',
    answer: 'The rod and staff are the two essential tools of a shepherd. The rod (Hebrew: shebet) was a short, heavy club used to fight off predators like wolves and lions — it represents God\'s power to protect and defend His people against evil. The staff (Hebrew: mish\'eneth) was a long pole with a curved hook at the end, used to guide sheep along the right path and to pull them out of dangerous situations — it represents God\'s gentle guidance and rescue. Together, they picture the two sides of God\'s care: strength to defend and tenderness to direct.',
  },
  {
    question: 'How can I apply Psalm 23 to my life today?',
    answer: 'Psalm 23 applies to every season of life. In times of plenty, remember that God is the source of your green pastures and still waters — give Him thanks. In times of weariness, trust that He restores your soul. In times of fear and darkness, cling to the truth that He is with you in the valley and His rod and staff protect you. In times of conflict, know that God prepares a table for you even when enemies surround you. And at all times, live with the confidence that God\'s goodness and mercy are actively pursuing you, and that your eternal home with God is secure. Make Psalm 23 a regular prayer — personalize each verse and speak it back to God as an act of faith.',
  },
];

export default function Psalm23Page() {
  const quizData = loadPsalm23Quiz();

  // Build quiz object for the client component
  const quiz = quizData ? {
    ...quizData,
    difficulty: 'easy' as const,
    isBookQuiz: false,
    slug: 'psalm-23',
    tags: ['psalm 23', 'shepherd', 'david', 'comfort', 'trust in god'],
    totalQuestions: quizData.questions.length,
    estimatedTime: Math.ceil(quizData.questions.length * 0.5),
  } : null;

  // JSON-LD schemas
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Psalm 23 Explained — The Lord is My Shepherd',
    description: 'A complete verse-by-verse study of Psalm 23 with Hebrew word meanings, David\'s shepherd background, cross-references, quiz, and FAQ.',
    url: `${SITE_URL}/psalm-23`,
    author: { '@type': 'Organization', name: 'Bible Maximum' },
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: SITE_URL },
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/psalm-23` },
    about: [
      { '@type': 'Thing', name: 'Psalm 23' },
      { '@type': 'Thing', name: 'Book of Psalms' },
      { '@type': 'Thing', name: 'The Good Shepherd' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Bible Study', item: `${SITE_URL}/bible-quizzes` },
      { '@type': 'ListItem', position: 3, name: 'Psalms', item: `${SITE_URL}/psalms-chapters` },
      { '@type': 'ListItem', position: 4, name: 'Psalm 23 Explained', item: `${SITE_URL}/psalm-23` },
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
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li><Link href="/bible-quizzes" className="text-blue-600 hover:underline">Bible Study</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li><Link href="/psalms-chapters" className="text-blue-600 hover:underline">Psalms</Link></li>
            <li className="text-primary-dark/40 mx-2">/</li>
            <li className="text-primary-dark/70 font-medium">Psalm 23</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-scripture dark:bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/alex.iaquinto_4k_close_up_photo_of_man_praying_while_the_glory__281c620b-2697-4bce-88fc-db85b2e1c270.png"
            alt="Man praying in the presence of God's glory"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-blue-300 text-sm font-bold uppercase tracking-widest mb-4">The Most Beloved Psalm in the Bible</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-display leading-tight mb-8">
            Psalm 23 Explained
          </h1>
          <blockquote className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8">
            <p className="text-lg md:text-xl text-white leading-relaxed italic font-light">
              &ldquo;<sup className="text-blue-300 font-bold not-italic text-xs">1</sup> The LORD is my shepherd; I shall not want.
              <br /><sup className="text-blue-300 font-bold not-italic text-xs">2</sup> He maketh me to lie down in green pastures: he leadeth me beside the still waters.
              <br /><sup className="text-blue-300 font-bold not-italic text-xs">3</sup> He restoreth my soul: he leadeth me in the paths of righteousness for his name&apos;s sake.
              <br /><sup className="text-blue-300 font-bold not-italic text-xs">4</sup> Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.
              <br /><sup className="text-blue-300 font-bold not-italic text-xs">5</sup> Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.
              <br /><sup className="text-blue-300 font-bold not-italic text-xs">6</sup> Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.&rdquo;
            </p>
            <cite className="block mt-4 text-blue-200 text-sm font-bold not-italic">— Psalm 23 (KJV)</cite>
          </blockquote>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#quiz" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
              Take the Psalm 23 Quiz
            </a>
            <a href="#verse-study" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
              Read Verse-by-Verse Study
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">

        {/* Quick Summary / Value Proposition */}
        <section className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 mb-12 shadow-sm">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">What Does Psalm 23 Mean?</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-lg mb-4">
            Psalm 23 is the most beloved chapter in all of Scripture. In just six verses, David declares that <strong>God is his personal shepherd</strong> who provides everything he needs, restores his soul, walks with him through the darkest valleys, blesses him in the face of enemies, and guarantees his eternal home with God. It is a psalm of <strong>absolute trust</strong> in God&apos;s goodness, power, and faithfulness.
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
            Written by <Link href="/characters/david" className="text-blue-600 font-medium hover:underline">King David</Link>, who was himself a shepherd before becoming Israel&apos;s greatest king, Psalm 23 draws on firsthand experience with sheep and shepherding. Below, we study every verse, explore key Hebrew words, examine cross-references, and test your understanding with a focused quiz.
          </p>
        </section>

        {/* Verse-by-Verse Study */}
        <section id="verse-study" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Verse-by-Verse Study of Psalm 23</h2>
          <div className="space-y-6">
            {VERSE_STUDY.map((item) => (
              <div key={item.verse} className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-5 md:p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">v{item.verse}</span>
                  <div className="flex-1">
                    <blockquote className="text-lg font-medium text-scripture dark:text-white italic mb-3 border-l-4 border-blue-600 pl-4">
                      &ldquo;{item.text}&rdquo;
                    </blockquote>
                    <div className="mb-3 flex flex-wrap gap-2">
                      {item.hebrewWords.map((hw, hwIdx) => (
                        <div key={hwIdx} className="bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border flex-1 min-w-[200px]">
                          <p className="text-xs text-blue-600 font-bold mb-1">Hebrew: <em>{hw.word}</em></p>
                          <p className="text-xs text-primary-dark/70 dark:text-primary-dark/40">{hw.meaning}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed text-sm">{item.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Context Section: David as Shepherd-King */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Context: David the Shepherd-King</h2>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              Psalm 23 was written by <Link href="/characters/david" className="text-blue-600 font-medium hover:underline">David</Link>, the youngest son of Jesse, who spent his youth tending sheep in the hills near Bethlehem. Before he ever held a scepter, he held a shepherd&apos;s staff. He knew what it meant to lead flocks to green pastures, to find still water for frightened sheep, and to fight off lions and bears with his bare hands (1 Samuel 17:34-36).
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              This firsthand experience gives Psalm 23 its authenticity and depth. David is not using abstract poetry — he is describing what he literally did for his sheep, and then declaring that God does the same for him. The metaphor of God as shepherd was deeply meaningful in ancient Israel, where shepherding was a common and respected occupation. Kings and leaders were called &ldquo;shepherds&rdquo; of their people, and God Himself is called the Shepherd of Israel throughout the Old Testament (Genesis 49:24, Psalm 80:1).
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
              Many scholars believe David wrote Psalm 23 later in life, looking back on God&apos;s faithfulness through every season — from tending sheep as a boy, to fleeing from King Saul in the wilderness, to reigning as king over Israel, to enduring family betrayal and civil war. Every verse reflects real experience: the green pastures of plenty, the dark valleys of danger, the table prepared even while enemies surrounded him.
            </p>
            <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
              Psalm 23 is also a prophetic foreshadowing of Jesus Christ, who declared Himself &ldquo;the good shepherd&rdquo; in John 10:11. Where David wrote about a shepherd who protects and provides, Jesus revealed a shepherd who lays down His life for the sheep — the ultimate fulfillment of everything Psalm 23 describes.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/characters/david" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">D</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Study David</span>
              </Link>
              <Link href="/psalms-23-quiz" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">Q</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Psalm 23 Chapter Quiz</span>
              </Link>
              <Link href="/bible-chapter-summaries/psalms/23" className="flex items-center gap-2 bg-primary-light/30 dark:bg-dark-bg rounded-lg p-3 border border-grace dark:border-dark-border hover:border-blue-300 transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">S</span>
                <span className="text-sm font-medium text-scripture dark:text-white">Psalm 23 Summary</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Cross-References */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Cross-References: The Shepherd Theme in Scripture</h2>
          <div className="space-y-3">
            {CROSS_REFERENCES.map((verse, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-5 shadow-sm">
                <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed italic mb-2">&ldquo;{verse.text}&rdquo;</p>
                <p className="text-sm font-bold text-blue-600">— {verse.ref}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Embedded Quiz */}
        <section id="quiz" className="mb-12 scroll-mt-20">
          <div className="bg-white dark:bg-dark-surface rounded-xl border-2 border-blue-600/20 p-6 md:p-8 shadow-sm">
            <div className="text-center mb-6">
              <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">Test Your Knowledge</p>
              <h2 className="text-2xl font-bold text-scripture dark:text-white font-display">Psalm 23 Quiz</h2>
              <p className="text-primary-dark/60 dark:text-primary-dark/40 mt-2 text-sm">15 questions on The Lord is My Shepherd — every verse covered</p>
            </div>
            {quiz ? (
              <PillarQuiz quiz={quiz} />
            ) : (
              <p className="text-center text-primary-dark/60">Quiz loading...</p>
            )}
          </div>
        </section>

        {/* Gospel CTA — The Good Shepherd Knows You */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-scripture via-scripture/95 to-blue-950 rounded-xl p-8 md:p-10 text-white text-center shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">The Good Shepherd Knows You</h2>
            <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-6">
              Psalm 23 is not just beautiful poetry — it is a personal invitation. Jesus said, &ldquo;I am the good shepherd: the good shepherd giveth his life for the sheep&rdquo; (John 10:11). He laid down His life so that you could have the green pastures, the restored soul, and the eternal home David describes. Will you trust Him as your shepherd?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/topics/salvation" className="inline-flex items-center justify-center bg-white text-scripture font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors text-sm uppercase tracking-wider">
                How to Be Saved
              </Link>
              <Link href="/topics/gods-love" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
                Discover God&apos;s Love
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Frequently Asked Questions About Psalm 23</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <details key={idx} className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border shadow-sm group">
                <summary className="p-5 cursor-pointer font-bold text-scripture dark:text-white text-lg flex items-center justify-between list-none">
                  <span>{item.question}</span>
                  <span className="text-blue-600 text-xl ml-4 shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed border-t border-grace dark:border-dark-border pt-4">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Secondary CTA — Quiz + Study Paths */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/psalms-23-quiz" className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">60 Questions, 4 Difficulty Levels</p>
              <h3 className="text-xl font-bold mb-1">Complete Psalm 23 Chapter Quiz</h3>
              <p className="text-blue-100 text-sm">Test everything from green pastures to the house of the LORD.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Quiz &rarr;</span>
            </Link>
            <Link href="/psalms-quiz" className="bg-scripture hover:bg-scripture/90 rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">25 Questions Covering All 150 Psalms</p>
              <h3 className="text-xl font-bold mb-1">Complete Book of Psalms Quiz</h3>
              <p className="text-blue-100 text-sm">From Psalm 1 to Psalm 150 — praise, lament, wisdom, and prophecy.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Quiz &rarr;</span>
            </Link>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="bg-primary-light/30 dark:bg-dark-surface/30 border border-grace dark:border-dark-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-4">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/psalms-23-quiz" className="text-blue-600 hover:underline text-sm">Psalm 23 Chapter Quiz</Link>
            <Link href="/psalms-chapters" className="text-blue-600 hover:underline text-sm">All Psalms Chapter Quizzes</Link>
            <Link href="/psalms-quiz" className="text-blue-600 hover:underline text-sm">Complete Book of Psalms Quiz</Link>
            <Link href="/topics/comfort" className="text-blue-600 hover:underline text-sm">Bible Verses About Comfort</Link>
            <Link href="/topics/trust-in-god" className="text-blue-600 hover:underline text-sm">Bible Verses About Trust in God</Link>
            <Link href="/topics/gods-provision" className="text-blue-600 hover:underline text-sm">Bible Verses About God&apos;s Provision</Link>
            <Link href="/topics/gods-love" className="text-blue-600 hover:underline text-sm">Bible Verses About God&apos;s Love</Link>
            <Link href="/characters/david" className="text-blue-600 hover:underline text-sm">David Character Study</Link>
            <Link href="/topics/salvation" className="text-blue-600 hover:underline text-sm">Bible Verses About Salvation</Link>
            <Link href="/bible-chapter-summaries/psalms/23" className="text-blue-600 hover:underline text-sm">Psalm 23 Summary</Link>
            <Link href="/bible-geography/psalms/23" className="text-blue-600 hover:underline text-sm">Psalm 23 Places &amp; Map</Link>
            <Link href="/topics/death" className="text-blue-600 hover:underline text-sm">Bible Verses About Death</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
