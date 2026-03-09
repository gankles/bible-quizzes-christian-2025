import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';

const SITE_URL = 'https://biblemaximum.com';

export const metadata: Metadata = {
  title: 'God — Who Is God? The One True God of Christianity Explained | Bible Maximum',
  description: 'Who is God? A comprehensive guide to the God of the Bible: His names, attributes, the Trinity, arguments for His existence, why the Christian God is the one true God, and what scholars and theologians say. With 200+ Scripture references.',
  keywords: ['god', 'who is god', 'God of the Bible', 'one true God', 'Christian God', 'attributes of God', 'names of God', 'Trinity', 'is God real', 'arguments for God', 'nature of God', 'God the Father', 'God is love', 'does God exist', 'proof of God', 'theology of God', 'holy trinity', 'YHWH', 'Elohim'],
  alternates: { canonical: '/god' },
  openGraph: {
    title: 'God — Who Is God? The One True God of Christianity Explained',
    description: 'Everything the Bible teaches about God: His names, nature, attributes, the Trinity, and why He alone is the one true God.',
    url: `${SITE_URL}/god`,
    type: 'article',
    images: ['/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png'],
  },
};

// ─── Names of God ────────────────────────────────────────────

const NAMES_OF_GOD = [
  { name: 'YHWH (Yahweh)', transliteration: 'יהוה', language: 'Hebrew', meaning: 'I AM WHO I AM — the self-existent, eternal, covenant-keeping God', ref: 'Exodus 3:14', significance: 'God\'s personal name, revealed to Moses at the burning bush. Appears 6,828 times in the OT. So sacred that Jews would not speak it aloud.' },
  { name: 'Elohim', transliteration: 'אלהים', language: 'Hebrew', meaning: 'God (plural majesty) — the mighty Creator', ref: 'Genesis 1:1', significance: 'The first name for God in the Bible. The plural form hints at the Trinity even in the opening verse. Used 2,600+ times.' },
  { name: 'El Shaddai', transliteration: 'אל שדי', language: 'Hebrew', meaning: 'God Almighty — the all-sufficient one', ref: 'Genesis 17:1', significance: 'The name God used when making His covenant with Abraham. Emphasizes God\'s power to do what is humanly impossible.' },
  { name: 'Adonai', transliteration: 'אדני', language: 'Hebrew', meaning: 'Lord, Master — sovereign ruler', ref: 'Psalm 110:1', significance: 'Used when Jews read Scripture aloud in place of YHWH. Emphasizes God\'s authority and lordship over all creation.' },
  { name: 'El Elyon', transliteration: 'אל עליון', language: 'Hebrew', meaning: 'God Most High — supreme over all', ref: 'Genesis 14:18-20', significance: 'Used by Melchizedek, the priest-king of Salem, when blessing Abraham. Declares God\'s supremacy over every power and authority.' },
  { name: 'Yahweh Rapha', transliteration: 'יהוה רפא', language: 'Hebrew', meaning: 'The LORD Who Heals', ref: 'Exodus 15:26', significance: 'God reveals Himself as healer — physically, emotionally, and spiritually. The root rapha means to mend, cure, or make whole.' },
  { name: 'Yahweh Jireh', transliteration: 'יהוה יראה', language: 'Hebrew', meaning: 'The LORD Will Provide', ref: 'Genesis 22:14', significance: 'Abraham named the place where God provided a ram in place of Isaac. God sees the need before you do and provides before you ask.' },
  { name: 'Yahweh Nissi', transliteration: 'יהוה נסי', language: 'Hebrew', meaning: 'The LORD Is My Banner', ref: 'Exodus 17:15', significance: 'After victory over Amalek, Moses built an altar with this name. God is the rallying point and source of victory in spiritual warfare.' },
  { name: 'Yahweh Shalom', transliteration: 'יהוה שלום', language: 'Hebrew', meaning: 'The LORD Is Peace', ref: 'Judges 6:24', significance: 'Gideon named his altar this after encountering the Angel of the Lord. God Himself is the source of peace — not circumstances.' },
  { name: 'Yahweh Tsidkenu', transliteration: 'יהוה צדקנו', language: 'Hebrew', meaning: 'The LORD Our Righteousness', ref: 'Jeremiah 23:6', significance: 'A messianic title. We have no righteousness of our own — God Himself becomes our righteousness through Christ.' },
  { name: 'Theos', transliteration: 'Θεός', language: 'Greek', meaning: 'God — the supreme divine being', ref: 'John 1:1', significance: 'The primary Greek word for God in the New Testament. Used over 1,300 times. "In the beginning was the Word, and the Word was with God, and the Word was God."' },
  { name: 'Kyrios', transliteration: 'Κύριος', language: 'Greek', meaning: 'Lord — sovereign ruler and master', ref: 'Philippians 2:11', significance: 'The Greek equivalent of Adonai. Applied to Jesus over 700 times in the NT — a direct claim to deity, since Kyrios was used for YHWH in the Septuagint.' },
];

// ─── Attributes of God ──────────────────────────────────────

const ATTRIBUTES = [
  { attribute: 'Omnipotent', meaning: 'All-powerful — God can do anything consistent with His nature', ref: 'Jeremiah 32:17', category: 'Greatness', detail: '"Ah Lord God! Behold, thou hast made the heaven and the earth by thy great power... there is nothing too hard for thee."' },
  { attribute: 'Omniscient', meaning: 'All-knowing — God knows everything past, present, and future', ref: 'Psalm 147:5', category: 'Greatness', detail: '"Great is our Lord, and of great power: his understanding is infinite." God never learns, is never surprised, and never needs advice (Romans 11:34).' },
  { attribute: 'Omnipresent', meaning: 'Present everywhere at all times', ref: 'Psalm 139:7-10', category: 'Greatness', detail: '"Whither shall I go from thy spirit? Or whither shall I flee from thy presence?" David found this both terrifying and comforting.' },
  { attribute: 'Eternal', meaning: 'Without beginning or end — God exists outside of time', ref: 'Psalm 90:2', category: 'Greatness', detail: '"Before the mountains were brought forth, or ever thou hadst formed the earth and the world, even from everlasting to everlasting, thou art God."' },
  { attribute: 'Immutable', meaning: 'Unchanging in character, purposes, and promises', ref: 'Malachi 3:6', category: 'Greatness', detail: '"For I am the Lord, I change not." In a world where everything shifts, God\'s nature is the one constant. What He was, He is. What He is, He will be.' },
  { attribute: 'Sovereign', meaning: 'Supreme ruler over all creation — nothing happens outside His will', ref: 'Psalm 103:19', category: 'Greatness', detail: '"The Lord hath prepared his throne in the heavens; and his kingdom ruleth over all." God doesn\'t react to events — He ordains them.' },
  { attribute: 'Holy', meaning: 'Morally perfect, set apart, utterly pure', ref: 'Isaiah 6:3', category: 'Moral', detail: 'The seraphim cry "Holy, holy, holy" — the only attribute of God repeated three times for emphasis. Holiness is not one attribute among many; it is the atmosphere in which all other attributes exist.' },
  { attribute: 'Just', meaning: 'Perfectly fair — He always does what is right', ref: 'Deuteronomy 32:4', category: 'Moral', detail: '"He is the Rock, his work is perfect: for all his ways are judgment: a God of truth and without iniquity, just and right is he."' },
  { attribute: 'Love', meaning: 'Self-giving, sacrificial, unconditional goodness toward His creation', ref: '1 John 4:8', category: 'Moral', detail: '"God is love." Not just that God has love or shows love — love is who He is at the core. The cross is the ultimate demonstration (Romans 5:8).' },
  { attribute: 'Merciful', meaning: 'Compassionate — He does not give us the punishment we deserve', ref: 'Lamentations 3:22-23', category: 'Moral', detail: '"It is of the Lord\'s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness."' },
  { attribute: 'Faithful', meaning: 'He keeps every promise without exception', ref: 'Deuteronomy 7:9', category: 'Moral', detail: '"The faithful God, which keepeth covenant and mercy with them that love him and keep his commandments to a thousand generations."' },
  { attribute: 'Wrathful', meaning: 'Holy anger against sin — not capricious, but just and measured', ref: 'Romans 1:18', category: 'Moral', detail: '"For the wrath of God is revealed from heaven against all ungodliness and unrighteousness of men." God\'s wrath is not a flaw — it is the necessary response of a holy God to evil.' },
];


// ─── Arguments for God's Existence ───────────────────────────

const ARGUMENTS = [
  {
    name: 'The Cosmological Argument (First Cause)',
    scholars: 'Thomas Aquinas (Summa Theologica, 13th c.), William Lane Craig (Kalām Cosmological Argument, 1979)',
    summary: 'Everything that begins to exist has a cause. The universe began to exist. Therefore, the universe has a cause. That cause must be outside space, time, and matter — and must be unimaginably powerful. This matches the biblical description of God.',
    keyPoint: 'Modern science confirms the universe had a beginning (Big Bang). Whatever caused the universe cannot be part of the universe. An eternal, uncaused, personal Creator is the most coherent explanation.',
    ref: 'Genesis 1:1; Hebrews 11:3',
  },
  {
    name: 'The Teleological Argument (Design)',
    scholars: 'William Paley (Natural Theology, 1802), Michael Behe (Darwin\'s Black Box, 1996), Stephen Meyer (Signature in the Cell, 2009)',
    summary: 'The universe displays extraordinary fine-tuning and complexity that points to an intelligent Designer. The constants of physics are calibrated to an accuracy of 1 in 10^60 — change any one of them slightly and life is impossible.',
    keyPoint: 'DNA contains information — a language of 3.2 billion letters precisely arranged. Information always comes from a mind, never from random processes. The genetic code is the strongest evidence of intelligent design in nature.',
    ref: 'Psalm 19:1; Romans 1:20',
  },
  {
    name: 'The Moral Argument',
    scholars: 'C.S. Lewis (Mere Christianity, 1952), William Lane Craig (The Absurdity of Life Without God, 1994)',
    summary: 'Objective moral values exist (we all know some things are genuinely wrong, not just culturally unpopular). If objective moral values exist, there must be a moral lawgiver who transcends humanity. That moral lawgiver is God.',
    keyPoint: 'Even atheists appeal to objective morality when they call something "evil." But without God, "evil" is just a personal preference — like preferring chocolate over vanilla. The moral argument says: your moral outrage proves God exists.',
    ref: 'Romans 2:14-15; Romans 1:19',
  },
  {
    name: 'The Ontological Argument',
    scholars: 'Anselm of Canterbury (Proslogion, 1078), Alvin Plantinga (The Nature of Necessity, 1974)',
    summary: 'If it is even possible that a maximally great being exists, then a maximally great being exists. A being that exists in all possible worlds (including the actual world) is greater than one that exists in only some. Since the concept of God is coherent, God must exist in reality.',
    keyPoint: 'Plantinga\'s modal version is considered one of the strongest formulations. Even critics acknowledge the argument is logically valid — the debate is whether the key premise (that a maximally great being is possible) is true.',
    ref: 'Psalm 14:1; Acts 17:28',
  },
  {
    name: 'The Argument from Consciousness',
    scholars: 'J.P. Moreland (Consciousness and the Existence of God, 2008), David Chalmers (The Hard Problem, 1995)',
    summary: 'Consciousness — subjective experience, awareness, the feeling of "what it\'s like" to be you — cannot be explained by purely physical processes. Matter doesn\'t produce minds unless mind came first. A personal God explains why a material universe produces personal beings.',
    keyPoint: 'Science can describe the brain\'s neurons and chemicals but cannot explain why there is an inner experience at all. This is called "the hard problem of consciousness" — and it points directly to a conscious Creator.',
    ref: 'Genesis 2:7; Job 33:4',
  },
  {
    name: 'The Argument from the Resurrection',
    scholars: 'Gary Habermas (The Historical Jesus, 1996), N.T. Wright (The Resurrection of the Son of God, 2003), William Lane Craig (The Son Rises, 1981)',
    summary: 'The resurrection of Jesus Christ is the most historically verifiable miracle in history. Virtually all scholars — including skeptics — accept these minimal facts: (1) Jesus died by crucifixion, (2) His disciples believed they saw Him alive afterward, (3) The early Church exploded in hostile territory. The best explanation is that God raised Jesus from the dead.',
    keyPoint: 'N.T. Wright argues that no other hypothesis explains all the evidence: the empty tomb, the post-mortem appearances, and the origin of Christian belief. The resurrection doesn\'t just prove God exists — it proves the Christian God exists.',
    ref: '1 Corinthians 15:3-8; Romans 1:4',
  },
];

// ─── Theologian Quotes ───────────────────────────────────────

const THEOLOGIAN_QUOTES = [
  { name: 'Augustine of Hippo', era: 'AD 354-430', work: 'Confessions', quote: 'Thou hast made us for Thyself, O Lord, and our hearts are restless until they rest in Thee.', significance: 'The most influential Church father. His theology shaped Western Christianity for 1,600 years.' },
  { name: 'Thomas Aquinas', era: 'AD 1225-1274', work: 'Summa Theologica', quote: 'To one who has faith, no explanation is necessary. To one without faith, no explanation is possible.', significance: 'Developed the Five Ways — the most systematic philosophical arguments for God\'s existence in the medieval period.' },
  { name: 'Martin Luther', era: 'AD 1483-1546', work: 'The Large Catechism', quote: 'A god means that from which we are to expect all good and in which we are to take refuge in all distress.', significance: 'The father of the Protestant Reformation. Rediscovered that salvation is by grace through faith alone.' },
  { name: 'John Calvin', era: 'AD 1509-1564', work: 'Institutes of the Christian Religion', quote: 'There is within the human mind, and indeed by natural instinct, an awareness of divinity. This we take to be beyond controversy.', significance: 'Argued that knowledge of God is innate in every human being — the sensus divinitatis. Modern philosopher Alvin Plantinga built on this concept.' },
  { name: 'Blaise Pascal', era: 'AD 1623-1662', work: 'Pensées', quote: 'There is a God-shaped vacuum in the heart of every man which cannot be filled by any created thing, but only by God the Creator.', significance: 'Mathematician, physicist, and Christian apologist. His "Pascal\'s Wager" remains one of the most famous arguments for believing in God.' },
  { name: 'Jonathan Edwards', era: 'AD 1703-1758', work: 'The End for Which God Created the World', quote: 'God is the highest good of the reasonable creature, and the enjoyment of Him is the only happiness with which our souls can be satisfied.', significance: 'America\'s greatest theologian. Led the First Great Awakening and articulated God\'s glory as the purpose of all creation.' },
  { name: 'A.W. Tozer', era: 'AD 1897-1963', work: 'The Knowledge of the Holy', quote: 'What comes into our minds when we think about God is the most important thing about us.', significance: 'Warned that the Church\'s greatest danger is a low view of God. His writings call believers back to awe, wonder, and reverence.' },
  { name: 'C.S. Lewis', era: 'AD 1898-1963', work: 'Mere Christianity', quote: 'I believe in Christianity as I believe that the Sun has risen: not only because I see it, but because by it I see everything else.', significance: 'Oxford professor, former atheist. His moral argument for God and defense of Christian theism have influenced millions.' },
  { name: 'J.I. Packer', era: 'AD 1926-2020', work: 'Knowing God', quote: 'Knowing about God is crucially important for the living of our lives. Disregard the study of God and you sentence yourself to stumble through life blindfolded.', significance: 'His book Knowing God has sold over 1.5 million copies. Argued that theology is not academic but deeply personal and practical.' },
  { name: 'William Lane Craig', era: 'AD 1949-present', work: 'Reasonable Faith', quote: 'The person who follows the evidence where it leads will be led to belief in God.', significance: 'Philosopher and apologist. His Kalām Cosmological Argument and debates with atheists have made the intellectual case for God accessible to modern audiences.' },
  { name: 'N.T. Wright', era: 'AD 1948-present', work: 'The Resurrection of the Son of God', quote: 'The Christian claim is that the Creator of the world has acted within his creation, in the person of Jesus of Nazareth, to rescue it from its corruption.', significance: 'Leading New Testament scholar. His 800-page defense of the resurrection is considered the most thorough academic treatment of the subject.' },
  { name: 'Alvin Plantinga', era: 'AD 1932-present', work: 'Warranted Christian Belief', quote: 'It is entirely rational to believe in God, even without evidence or argument.', significance: 'Revolutionized philosophy of religion. His modal ontological argument and "evolutionary argument against naturalism" reshaped the academic debate.' },
];

// ─── What God Is NOT ─────────────────────────────────────────

const MISCONCEPTIONS = [
  { myth: 'God is an old man in the sky', reality: 'God is spirit (John 4:24). He has no physical body. Biblical language about God\'s "hand" or "eyes" is anthropomorphic — human language describing a being beyond human comprehension.', source: 'John 4:24; 1 Timothy 1:17' },
  { myth: 'God is the universe (pantheism)', reality: 'God created the universe but is distinct from it. He is transcendent (above creation) and immanent (active within it), but He is not the universe itself. The painting is not the painter.', source: 'Isaiah 40:22; Acts 17:24-25' },
  { myth: 'God is one of many gods (polytheism)', reality: '"I am the Lord, and there is none else, there is no God beside me" (Isaiah 45:5). The Bible claims absolute monotheism — not that YHWH is the strongest god, but that He is the only God.', source: 'Isaiah 45:5; Deuteronomy 6:4' },
  { myth: 'God created the world and left (deism)', reality: 'God is actively involved in His creation every second. He sustains all things by the word of His power (Hebrews 1:3). He numbers the hairs on your head (Matthew 10:30). Deism\'s absent watchmaker is not the God of the Bible.', source: 'Hebrews 1:3; Colossians 1:17' },
  { myth: 'God is angry and vengeful', reality: 'God\'s wrath against sin is real — but it is always just, measured, and aimed at evil, never at innocent people. And His default posture is mercy: "slow to anger, and plenteous in mercy" (Psalm 103:8). The cross is where justice and mercy met.', source: 'Psalm 103:8; Exodus 34:6-7' },
  { myth: 'All religions worship the same God', reality: 'The Christian God is Trinitarian (Father, Son, Holy Spirit), claims exclusivity ("no man cometh unto the Father but by me" — John 14:6), and offers salvation by grace. Islam denies the Trinity. Hinduism has millions of deities. Buddhism has no personal Creator. These are fundamentally different concepts.', source: 'John 14:6; 1 Timothy 2:5' },
  { myth: 'God needs us', reality: 'God is self-sufficient. He didn\'t create because He was lonely. The Trinity means God has always existed in perfect, loving relationship — Father, Son, and Spirit. He created us not out of need but out of overflow.', source: 'Acts 17:25; John 17:5, 24' },
  { myth: 'God is too loving to send anyone to hell', reality: 'God\'s love doesn\'t cancel His justice — it fulfills it. He loved the world enough to send His Son to die (John 3:16). Rejecting that gift is a choice God respects. Hell is not God sending people away; it is people choosing to remain separated from Him.', source: 'John 3:16-18; 2 Peter 3:9; Romans 6:23' },
];


// ─── FAQ ─────────────────────────────────────────────────────

const FAQ_ITEMS = [
  { question: 'Who is God?', answer: 'God is the eternal, self-existent Creator of all things. He is spirit (John 4:24), infinite in power, knowledge, and presence, and exists eternally as three persons — Father, Son, and Holy Spirit. He revealed His personal name as YHWH ("I AM WHO I AM") to Moses in Exodus 3:14.' },
  { question: 'Does God exist?', answer: 'Multiple lines of evidence point to God\'s existence: the beginning of the universe (cosmological argument), the fine-tuning of physical constants (teleological argument), the existence of objective morality (moral argument), the reality of consciousness, and the historical resurrection of Jesus Christ. Philosophers like Thomas Aquinas, Alvin Plantinga, and William Lane Craig have formulated rigorous philosophical arguments that remain unrefuted.' },
  { question: 'What is the Trinity?', answer: 'The Trinity is the Christian doctrine that one God eternally exists in three distinct persons: Father, Son (Jesus Christ), and Holy Spirit. They are not three gods (that would be tritheism) or one God wearing three masks (that would be modalism). They are one divine essence in three co-equal, co-eternal persons — each fully God, yet distinct in relationship.' },
  { question: 'Is Jesus God?', answer: 'Yes. The Bible explicitly identifies Jesus as God. John 1:1 — "The Word was God." Thomas called Him "My Lord and my God" (John 20:28). Jesus accepted worship (Matthew 14:33), forgave sins (Mark 2:5-7 — something only God can do), and claimed equality with the Father (John 10:30). The early Church affirmed this at the Council of Nicaea (AD 325).' },
  { question: 'Is God real or just a concept?', answer: 'The God of Christianity claims to be real — not a human concept but an actual being who created the universe, acts in history, speaks through Scripture, and can be known personally. The evidence — cosmological, moral, historical (especially the resurrection), and experiential — supports this claim. As C.S. Lewis noted, the question is not whether God is useful but whether He is true.' },
  { question: 'Why does God allow suffering?', answer: 'The Bible gives several reasons: suffering is a consequence of humanity\'s rebellion against God (Genesis 3), it can produce character and perseverance (Romans 5:3-4), it can draw people to God (Psalm 119:71), and God ultimately uses all suffering for good in the lives of believers (Romans 8:28). The cross proves God doesn\'t stand aloof from suffering — He entered it Himself.' },
  { question: 'What does God look like?', answer: 'God is spirit and does not have a physical body (John 4:24). When the Bible describes God\'s "hands," "eyes," or "face," it is using human language (anthropomorphism) to communicate spiritual realities. The closest we get to seeing God is Jesus Christ: "He that hath seen me hath seen the Father" (John 14:9).' },
  { question: 'What are the names of God?', answer: 'God has many names in the Bible, each revealing an aspect of His character: YHWH (the self-existent one), Elohim (the mighty Creator), El Shaddai (God Almighty), Adonai (Lord and Master), Yahweh Jireh (the Lord who provides), Yahweh Rapha (the Lord who heals), and Yahweh Shalom (the Lord our peace), among others.' },
  { question: 'Is the God of the Old Testament different from the New Testament?', answer: 'No. The same God shows both justice and mercy in both testaments. The OT has extraordinary grace (Psalm 103:8-12, Micah 7:18). The NT has fierce judgment (Revelation 20:11-15, Acts 5:1-11). The cross is where OT justice and NT mercy meet — God punishes sin fully (justice) by bearing it Himself in Christ (mercy).' },
  { question: 'Why is Christianity right and other religions wrong?', answer: 'Christianity makes historically verifiable claims that other religions do not: Jesus died, was buried, and rose from the dead — confirmed by hostile and neutral sources. No other religion offers a founder who claimed to be God, died publicly, and was verified alive afterward. The resurrection is the linchpin: if it happened, Christianity is true (1 Corinthians 15:14-17).' },
  { question: 'Can God do anything?', answer: 'God is omnipotent — He can do all things consistent with His nature (Jeremiah 32:17). He cannot lie (Titus 1:2), cannot deny Himself (2 Timothy 2:13), and cannot be tempted by evil (James 1:13). These are not limitations of power but expressions of perfect character. God cannot do what is logically incoherent (create a square circle) because incoherence is not a "thing" to be done.' },
  { question: 'Where is God?', answer: 'God is omnipresent — He is everywhere at all times (Psalm 139:7-10). He is not contained in any building, planet, or dimension. Yet He is also described as dwelling in heaven (Matthew 6:9) and in the hearts of believers through the Holy Spirit (1 Corinthians 3:16). He is both transcendent (above all) and immanent (intimately present).' },
  { question: 'How can I know God personally?', answer: 'The Bible says knowing God begins with receiving Jesus Christ. "This is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent" (John 17:3). It starts with believing that Jesus died for your sins and rose again, trusting Him as your Savior, and beginning a relationship through prayer and Scripture (John 3:16, Romans 10:9-10).' },
  { question: 'Why did God create the world?', answer: 'God created the world for His glory (Isaiah 43:7) and to share His goodness with beings who could know and enjoy Him. The Trinity means God was not lonely — Father, Son, and Spirit existed in perfect love before creation. Creation is an overflow of God\'s nature, not a response to a need. As Jonathan Edwards wrote, God\'s purpose is to communicate His own fullness.' },
  { question: 'Is God male?', answer: 'God is spirit and does not have biological sex (John 4:24). However, God consistently reveals Himself using masculine language — Father, King, Shepherd, Husband. Jesus called God "Father" and instructed us to do the same (Matthew 6:9). This language reflects relational roles (authority, protection, provision), not physical anatomy. The Bible also uses feminine imagery for God\'s care (Isaiah 49:15, Matthew 23:37).' },
];


// ─── Page Component ──────────────────────────────────────────

export default function GodPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'God — Who Is God? The One True God of Christianity Explained',
    description: 'Everything the Bible teaches about God: His names, nature, attributes, the Trinity, and why He alone is the one true God.',
    url: `${SITE_URL}/god`,
    datePublished: '2026-03-09',
    dateModified: '2026-03-09',
    author: { '@type': 'Organization', name: 'Bible Maximum', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/god` },
    about: [
      { '@type': 'Thing', name: 'God in Christianity', sameAs: 'https://www.wikidata.org/wiki/Q190' },
      { '@type': 'Thing', name: 'Trinity', sameAs: 'https://www.wikidata.org/wiki/Q9842' },
      { '@type': 'Thing', name: 'Existence of God', sameAs: 'https://www.wikidata.org/wiki/Q468740' },
    ],
    keywords: ['god', 'who is god', 'Christian God', 'attributes of God', 'names of God', 'Trinity', 'arguments for God'],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
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
      { '@type': 'ListItem', position: 2, name: 'God', item: `${SITE_URL}/god` },
    ],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <StructuredData data={articleSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-scripture via-blue-900 to-blue-950 text-white overflow-hidden">
        <Image src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png" alt="God — the one true God of Christianity" fill className="object-cover opacity-15" priority />
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <nav className="text-blue-200/70 text-xs mb-6">
            <Link href="/" className="hover:text-white">Home</Link> <span className="mx-1">/</span> <span className="text-white">God</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold font-display mb-4 leading-tight">
            Who Is God?
          </h1>
          <p className="text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed mb-3">
            The most important question you will ever ask — and the Bible&apos;s answer.
          </p>
          <p className="text-blue-200/70 max-w-2xl mx-auto leading-relaxed">
            &ldquo;What comes into our minds when we think about God is the most important thing about us.&rdquo; — A.W. Tozer, <em>The Knowledge of the Holy</em>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-10">

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { num: '12+', label: 'Names of God' },
            { num: '12', label: 'Key Attributes' },
            { num: '6,828', label: 'Times YHWH Appears' },
            { num: '200+', label: 'Scripture Refs' },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-scripture dark:text-blue-400">{s.num}</p>
              <p className="text-xs text-primary-dark/60 dark:text-primary-dark/40 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table of Contents */}
        <nav className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm p-6 mb-10">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-3">In This Guide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
            {[
              { id: 'who-is-god', label: 'Who Is God?' },
              { id: 'names', label: 'Names of God' },
              { id: 'attributes', label: 'Attributes of God' },
              { id: 'trinity', label: 'The Holy Trinity' },
              { id: 'why-christianity', label: 'Why the Christian God?' },
              { id: 'arguments', label: 'Arguments for God' },
              { id: 'creator', label: 'God as Creator' },
              { id: 'redeemer', label: 'God as Redeemer' },
              { id: 'what-god-is-not', label: 'What God Is NOT' },
              { id: 'theologians', label: 'What Theologians Say' },
              { id: 'ot-nt', label: 'OT vs NT God' },
              { id: 'faq', label: 'FAQ (15 Questions)' },
            ].map((item) => (
              <Link key={item.id} href={`#${item.id}`} className="text-blue-600 hover:underline text-sm py-1">
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Who Is God? */}
        <section id="who-is-god" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Who Is God?</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            The Bible doesn&apos;t argue for God&apos;s existence. It assumes it. The very first verse — &ldquo;In the beginning God created the heaven and the earth&rdquo; (<Link href="/cross-references/genesis/1/1" className="text-blue-600 hover:underline">Genesis 1:1</Link>) — doesn&apos;t offer proof. It offers a Person. And everything that follows is His self-revelation.
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            When Moses asked God for His name, God answered: <strong>&ldquo;I AM WHO I AM&rdquo;</strong> (<Link href="/cross-references/exodus/3/14" className="text-blue-600 hover:underline">Exodus 3:14</Link>). In Hebrew: <em>Ehyeh Asher Ehyeh</em>. God doesn&apos;t derive His existence from anything. He doesn&apos;t depend on anything. He simply <em>is</em>. Every other being in the universe exists because God made it. God exists because God is God.
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            The Christian understanding of God can be stated in one sentence: <strong>God is the eternal, self-existent, all-powerful, all-knowing, perfectly holy, perfectly loving Creator and Sustainer of all things, who exists eternally in three persons — Father, Son, and Holy Spirit.</strong>
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
            That sentence takes about 10 seconds to read. The Bible takes 66 books to unpack it. This page is an attempt to cover the essentials — who God is, what He&apos;s like, why the God of Christianity is the one true God, and how you can know Him personally. We&apos;ll draw from Scripture, church history, and the best theological and philosophical scholarship available.
          </p>
        </section>

        {/* Names of God */}
        <section id="names" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">The Names of God</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            In the ancient world, a name wasn&apos;t just a label — it revealed character. God has many names in the Bible, and each one discloses something about who He is. Here are the major names in the original Hebrew and Greek:
          </p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400">Name</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400">Original</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400">Meaning</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400 hidden md:table-cell">Key Verse</th>
                </tr>
              </thead>
              <tbody>
                {NAMES_OF_GOD.map((n, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border hover:bg-blue-50/50 dark:hover:bg-dark-border/20">
                    <td className="px-4 py-2 font-medium text-scripture dark:text-white whitespace-nowrap">{n.name}</td>
                    <td className="px-4 py-2 text-primary-dark/70 dark:text-primary-dark/40 font-serif">{n.transliteration} <span className="text-xs text-primary-dark/40">({n.language})</span></td>
                    <td className="px-4 py-2 text-primary-dark/70 dark:text-primary-dark/40 text-xs">{n.meaning}</td>
                    <td className="px-4 py-2 text-xs hidden md:table-cell"><Link href={`/cross-references/${n.ref.toLowerCase().replace(/\s+/g, '/').replace(/:/g, '/')}`} className="text-blue-600 hover:underline">{n.ref}</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-primary-dark/60 dark:text-primary-dark/40 text-sm mt-3">
            For deeper study of each name, explore our <Link href="/hebrew-words" className="text-blue-600 hover:underline">Hebrew Word Studies</Link> and <Link href="/greek-words" className="text-blue-600 hover:underline">Greek Word Studies</Link>.
          </p>
        </section>

        {/* Attributes of God */}
        <section id="attributes" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">The 12 Attributes of God</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            Theologians traditionally divide God&apos;s attributes into two categories: <strong>attributes of greatness</strong> (what makes God God — His power, knowledge, presence, eternality) and <strong>moral attributes</strong> (His character — holiness, justice, love, mercy). Both are equally essential. A God who is all-powerful but not good would be a tyrant. A God who is all-loving but not just would be a pushover. The God of the Bible is both — perfectly.
          </p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400">Attribute</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400">Meaning</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400 hidden sm:table-cell">Category</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400 hidden md:table-cell">Key Scripture</th>
                </tr>
              </thead>
              <tbody>
                {ATTRIBUTES.map((a, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border">
                    <td className="px-4 py-3 font-medium text-scripture dark:text-white">{a.attribute}</td>
                    <td className="px-4 py-3 text-primary-dark/70 dark:text-primary-dark/40 text-xs">{a.meaning}</td>
                    <td className="px-4 py-3 hidden sm:table-cell"><span className={`text-xs px-2 py-0.5 rounded-full ${a.category === 'Greatness' ? 'bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300' : 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300'}`}>{a.category}</span></td>
                    <td className="px-4 py-3 text-xs hidden md:table-cell"><Link href={`/cross-references/${a.ref.toLowerCase().replace(/\s+/g, '/').replace(/:/g, '/').replace(/-/g, '/')}`} className="text-blue-600 hover:underline">{a.ref}</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 space-y-4">
            {ATTRIBUTES.map((a) => (
              <div key={a.attribute} className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-scripture dark:text-white">{a.attribute}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${a.category === 'Greatness' ? 'bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300' : 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300'}`}>{a.category}</span>
                </div>
                <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed">{a.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Holy Trinity */}
        <section id="trinity" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">The Holy Trinity — One God in Three Persons</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            The Trinity is the most distinctive doctrine of Christianity. It separates the Christian God from every other conception of deity in history. And it&apos;s not a later invention — it&apos;s woven into the fabric of Scripture from Genesis 1:26 (&ldquo;Let <strong>us</strong> make man in <strong>our</strong> image&rdquo;) to Matthew 28:19 (&ldquo;baptizing them in the name of the Father, and of the Son, and of the Holy Ghost&rdquo;).
          </p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400">Person</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400">Called God</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400 hidden sm:table-cell">Role in Salvation</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400 hidden md:table-cell">Key Verse</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { person: 'God the Father', calledGod: '1 Corinthians 8:6 — "one God, the Father"', role: 'Plans salvation, sends the Son, draws sinners to Christ (John 6:44)', verse: 'John 3:16' },
                  { person: 'God the Son (Jesus)', calledGod: 'John 1:1 — "the Word was God"; John 20:28 — "My Lord and my God"', role: 'Accomplishes salvation — lives, dies, rises in our place (2 Corinthians 5:21)', verse: 'Colossians 2:9' },
                  { person: 'God the Holy Spirit', calledGod: 'Acts 5:3-4 — lying to the Spirit = lying to God', role: 'Applies salvation — convicts of sin, regenerates, indwells, seals believers (Titus 3:5)', verse: 'John 14:16-17' },
                ].map((t, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border">
                    <td className="px-4 py-3 font-medium text-scripture dark:text-white">{t.person}</td>
                    <td className="px-4 py-3 text-primary-dark/70 dark:text-primary-dark/40 text-xs">{t.calledGod}</td>
                    <td className="px-4 py-3 text-primary-dark/70 dark:text-primary-dark/40 text-xs hidden sm:table-cell">{t.role}</td>
                    <td className="px-4 py-3 text-xs hidden md:table-cell">{t.verse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            <strong>Why does the Trinity matter?</strong> Because it answers a question no other religion can: how can God be love <em>eternally</em>? Love requires a subject (one who loves), an object (one who is loved), and a bond (the love between them). In the Trinity, the Father loves the Son, the Son loves the Father, and the Spirit is the bond of that love — all before creation ever existed. God didn&apos;t need to create the universe to experience love. He <em>is</em> love, within Himself, from all eternity (<Link href="/cross-references/1-john/4/8" className="text-blue-600 hover:underline">1 John 4:8</Link>).
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
            Augustine of Hippo first articulated this in <em>De Trinitate</em> (AD 400-416). Thomas Aquinas expanded it in <em>Summa Theologica</em> (13th century). Theologian Colin Gunton called it &ldquo;the most distinctive contribution of Christianity to human thought&rdquo; (<em>The Promise of Trinitarian Theology</em>, 1991). The Trinity is not a puzzle to solve — it&apos;s a reality to worship.
          </p>
        </section>

        {/* Why the Christian God? */}
        <section id="why-christianity" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Why the God of Christianity Is the One True God</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            This is a bold claim. It&apos;s also the claim Christianity makes — not arrogantly, but because Jesus Himself made it: &ldquo;I am the way, the truth, and the life: no man cometh unto the Father, but by me&rdquo; (<Link href="/cross-references/john/14/6" className="text-blue-600 hover:underline">John 14:6</Link>). Here are the reasons, both theological and scholarly:
          </p>
          <div className="space-y-4">
            {[
              { title: '1. God Entered History', detail: 'Unlike the gods of other religions, the Christian God didn\'t remain distant. He entered human history as a real person — Jesus of Nazareth — in a specific place (Roman Judea), at a specific time (~4 BC - AD 30), under a specific governor (Pontius Pilate), documented by hostile sources (Tacitus, Josephus, Pliny the Younger). No other religion makes a claim this historically verifiable.', sources: 'Tacitus, Annals 15.44 | Josephus, Antiquities 18.3.3 | Pliny, Letters 10.96' },
              { title: '2. The Resurrection Is Historically Verifiable', detail: 'The resurrection of Jesus is not a myth or a metaphor — it is a historical claim that can be tested. Virtually all scholars (including skeptics like Bart Ehrman and Gerd Lüdemann) accept three minimal facts: Jesus died by crucifixion, His followers sincerely believed He appeared to them alive, and the early Church exploded in hostile territory. N.T. Wright, former Bishop of Durham and Oxford professor, argues in his 800-page The Resurrection of the Son of God (2003) that no other hypothesis adequately explains all the evidence.', sources: 'N.T. Wright, The Resurrection of the Son of God (2003) | Gary Habermas, The Historical Jesus (1996) | William Lane Craig, Reasonable Faith (2008)' },
              { title: '3. Fulfilled Prophecy', detail: 'The Old Testament contains over 300 prophecies about the Messiah — written 400-1,400 years before Jesus was born. He fulfilled them all: born in Bethlehem (Micah 5:2), born of a virgin (Isaiah 7:14), entering Jerusalem on a donkey (Zechariah 9:9), betrayed for 30 silver coins (Zechariah 11:12), crucified — described in detail in Psalm 22, written 1,000 years before crucifixion existed — and buried in a rich man\'s tomb (Isaiah 53:9). Mathematician Peter Stoner calculated the probability of one person fulfilling just 8 of these prophecies by chance at 1 in 10^17.', sources: 'Peter Stoner, Science Speaks (1958) | Alfred Edersheim, Life and Times of Jesus the Messiah (1883)' },
              { title: '4. Moral Coherence — The Cross Solves the Dilemma', detail: 'Every serious religion faces a problem: how can God be both perfectly just AND perfectly merciful? Justice demands that sin is punished. Mercy demands that sinners are forgiven. You can\'t have both — unless someone pays the penalty on behalf of the sinner. That\'s exactly what the cross accomplishes. God doesn\'t compromise His justice or abandon His mercy. He satisfies both at once. As Paul wrote: "That he might be just, and the justifier of him which believeth in Jesus" (Romans 3:26). No other religion solves this dilemma.', sources: 'Romans 3:21-26 | J.I. Packer, Knowing God (1973) | John Stott, The Cross of Christ (1986)' },
              { title: '5. Philosophical Coherence — The Trinity Grounds Love', detail: 'If God is unitarian (one person, as in Islam or deism), then God could not have been loving before He created anything — because love requires an object. He would have needed creation to experience love, making Him dependent on His own creation. But the Trinitarian God — Father, Son, and Spirit — has been loving within Himself for all eternity. Love is not something God does; it is who He is. This is philosophically superior to every other concept of God.', sources: 'Augustine, De Trinitate (AD 400-416) | Richard of St. Victor, De Trinitate (12th c.) | Colin Gunton, The Promise of Trinitarian Theology (1991)' },
              { title: '6. Transformed Lives Across 2,000 Years', detail: 'The early Christians transformed the Roman Empire — not by force but by dying for their faith, caring for the sick during plagues, and treating slaves as brothers. They ended gladiatorial games, founded the first hospitals, created the first universities, and launched the abolition of slavery. Today, Christianity spans every nation, every language, every ethnic group on earth — the most diverse movement in human history. Sociologist Rodney Stark documented this in The Rise of Christianity (1996).', sources: 'Rodney Stark, The Rise of Christianity (1996) | Alvin Schmidt, How Christianity Changed the World (2004)' },
            ].map((item) => (
              <div key={item.title} className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
                <h3 className="font-bold text-scripture dark:text-white mb-2">{item.title}</h3>
                <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed mb-2">{item.detail}</p>
                <p className="text-xs text-primary-dark/40 italic">Sources: {item.sources}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Arguments for God's Existence */}
        <section id="arguments" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">6 Arguments for God&apos;s Existence</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            The Bible says the evidence for God is obvious: &ldquo;The heavens declare the glory of God&rdquo; (<Link href="/cross-references/psalm/19/1" className="text-blue-600 hover:underline">Psalm 19:1</Link>) and &ldquo;the invisible things of him from the creation of the world are clearly seen&rdquo; (<Link href="/cross-references/romans/1/20" className="text-blue-600 hover:underline">Romans 1:20</Link>). Philosophers and scholars have formalized these intuitions into rigorous arguments:
          </p>
          <div className="space-y-4">
            {ARGUMENTS.map((arg, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
                <h3 className="font-bold text-scripture dark:text-white mb-1">{arg.name}</h3>
                <p className="text-xs text-primary-dark/40 mb-3"><strong>Key scholars:</strong> {arg.scholars}</p>
                <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed mb-2">{arg.summary}</p>
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3">
                  <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed"><strong>The key point:</strong> {arg.keyPoint}</p>
                </div>
                <p className="text-xs text-blue-600 mt-2">{arg.ref}</p>
              </div>
            ))}
          </div>
        </section>

        {/* God as Creator */}
        <section id="creator" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">God as Creator</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            &ldquo;In the beginning God created the heaven and the earth&rdquo; (<Link href="/cross-references/genesis/1/1" className="text-blue-600 hover:underline">Genesis 1:1</Link>). That sentence changes everything. If God made you, then you belong to Him. You&apos;re not an accident of chemistry. You&apos;re not a random mutation that happened to survive. You were designed, on purpose, by a Person.
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            God spoke the universe into existence out of nothing — <em>ex nihilo</em> (<Link href="/cross-references/hebrews/11/3" className="text-blue-600 hover:underline">Hebrews 11:3</Link>). He didn&apos;t reshape existing material. He created matter, energy, space, and time by the power of His word. &ldquo;By the word of the Lord were the heavens made; and all the host of them by the breath of his mouth&rdquo; (<Link href="/cross-references/psalm/33/6" className="text-blue-600 hover:underline">Psalm 33:6</Link>).
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
            And He didn&apos;t just create and leave. He sustains every atom in existence every second: &ldquo;upholding all things by the word of his power&rdquo; (<Link href="/cross-references/hebrews/1/3" className="text-blue-600 hover:underline">Hebrews 1:3</Link>). If God withdrew His sustaining power for one moment, the entire universe would cease to exist. You are alive right now because God is actively holding you in existence.
          </p>
        </section>

        {/* God as Redeemer — The Gospel */}
        <section id="redeemer" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">God as Redeemer — The Gospel</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            Here is the heart of the Bible. Here is the reason God revealed Himself at all. Everything you&apos;ve read on this page leads to this:
          </p>

          <div className="space-y-6 mb-6">
            <div className="bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-900/40 p-5">
              <h3 className="font-bold text-red-800 dark:text-red-300 mb-2">The Problem: Sin</h3>
              <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed mb-2">
                God created humanity in His image — perfect, sinless, in unbroken fellowship with Him (<Link href="/cross-references/genesis/1/27" className="text-blue-600 hover:underline">Genesis 1:27</Link>). But Adam and Eve chose rebellion. Sin entered the world. And every human being born since has inherited that rebellion: &ldquo;For all have sinned, and come short of the glory of God&rdquo; (<Link href="/cross-references/romans/3/23" className="text-blue-600 hover:underline">Romans 3:23</Link>).
              </p>
              <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed">
                Sin isn&apos;t just &ldquo;making mistakes.&rdquo; It&apos;s cosmic treason — setting yourself up as god of your own life instead of bowing to the God who made you. And it carries a death sentence: &ldquo;The wages of sin is death&rdquo; (<Link href="/cross-references/romans/6/23" className="text-blue-600 hover:underline">Romans 6:23</Link>). Not just physical death, but eternal separation from God — what the Bible calls hell.
              </p>
            </div>

            <div className="bg-scripture/5 dark:bg-blue-950/20 rounded-xl border border-scripture/20 dark:border-blue-900/40 p-5">
              <h3 className="font-bold text-scripture dark:text-blue-300 mb-2">God&apos;s Love: He Didn&apos;t Leave Us There</h3>
              <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed mb-2">
                Here is the staggering part. God could have justly condemned every sinner — and He would have been perfectly righteous to do so. Instead, He chose to rescue us. Not because we deserved it. Not because we asked for it. Because <strong>He is love</strong>.
              </p>
              <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed">
                &ldquo;But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us&rdquo; (<Link href="/cross-references/romans/5/8" className="text-blue-600 hover:underline">Romans 5:8</Link>). God didn&apos;t wait for us to clean up. He didn&apos;t wait for us to earn it. He loved us at our worst.
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/40 p-5">
              <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2">The Solution: Jesus Christ</h3>
              <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed mb-2">
                God the Son — the second person of the Trinity — left heaven, took on human flesh, was born of a virgin, lived a sinless life for 33 years, and then <strong>voluntarily</strong> went to the cross to pay the penalty for our sin. He died in our place. The righteous for the unrighteous. The innocent for the guilty.
              </p>
              <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed mb-2">
                &ldquo;For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life&rdquo; (<Link href="/john-3-16" className="text-blue-600 hover:underline">John 3:16</Link>). This is the most famous verse in the Bible because it is the most important truth in the Bible.
              </p>
              <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed">
                Three days later, He rose from the dead — proving He was who He claimed to be, proving His sacrifice was accepted, and proving that death itself had been defeated (<Link href="/cross-references/1-corinthians/15/3" className="text-blue-600 hover:underline">1 Corinthians 15:3-4</Link>).
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200 dark:border-green-900/40 p-5">
              <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">The Response: Repentance and Faith</h3>
              <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed mb-2">
                God offers this salvation as a free gift — but a gift must be received. The Bible calls for two responses: <strong>repentance</strong> and <strong>faith</strong>.
              </p>
              <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed mb-2">
                <strong>Repentance</strong> means turning around. It&apos;s agreeing with God that you are a sinner, that your sin is serious, and that you want to go a different direction. Jesus began His ministry with these words: &ldquo;Repent: for the kingdom of heaven is at hand&rdquo; (<Link href="/cross-references/matthew/4/17" className="text-blue-600 hover:underline">Matthew 4:17</Link>). Peter echoed it at Pentecost: &ldquo;Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins&rdquo; (<Link href="/cross-references/acts/2/38" className="text-blue-600 hover:underline">Acts 2:38</Link>).
              </p>
              <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed">
                <strong>Faith</strong> means trusting Jesus — not just believing He existed, but putting your entire weight on Him for your salvation. &ldquo;For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast&rdquo; (<Link href="/cross-references/ephesians/2/8" className="text-blue-600 hover:underline">Ephesians 2:8-9</Link>). You cannot earn this. You can only receive it.
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/20 rounded-xl border border-purple-200 dark:border-purple-900/40 p-5">
              <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-2">The Result: Forgiveness and Eternal Life</h3>
              <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed mb-2">
                When you trust Christ, everything changes in an instant. Your sins — past, present, and future — are forgiven completely: &ldquo;As far as the east is from the west, so far hath he removed our transgressions from us&rdquo; (<Link href="/cross-references/psalm/103/12" className="text-blue-600 hover:underline">Psalm 103:12</Link>). &ldquo;If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness&rdquo; (<Link href="/cross-references/1-john/1/9" className="text-blue-600 hover:underline">1 John 1:9</Link>).
              </p>
              <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed mb-2">
                You receive <strong>eternal life</strong> — not just an extension of this life, but a new quality of life that begins now and continues forever in the presence of God: &ldquo;And this is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent&rdquo; (<Link href="/cross-references/john/17/3" className="text-blue-600 hover:underline">John 17:3</Link>).
              </p>
              <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed">
                You are adopted into God&apos;s family as His child (<Link href="/cross-references/john/1/12" className="text-blue-600 hover:underline">John 1:12</Link>), sealed by the Holy Spirit (<Link href="/cross-references/ephesians/1/13" className="text-blue-600 hover:underline">Ephesians 1:13</Link>), and nothing — absolutely nothing — can separate you from God&apos;s love (<Link href="/cross-references/romans/8/38" className="text-blue-600 hover:underline">Romans 8:38-39</Link>).
              </p>
            </div>
          </div>
        </section>

        {/* What God Is NOT */}
        <section id="what-god-is-not" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">What God Is NOT — 8 Misconceptions Corrected</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            People carry assumptions about God that don&apos;t come from the Bible. Some come from movies, some from other religions, some from bad experiences with churches. Here&apos;s what the evidence actually says:
          </p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400">What People Say</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400">What the Bible Says</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400 hidden md:table-cell">Source</th>
                </tr>
              </thead>
              <tbody>
                {MISCONCEPTIONS.map((m, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border">
                    <td className="px-4 py-3 font-medium text-red-700 dark:text-red-400 text-xs">{m.myth}</td>
                    <td className="px-4 py-3 text-primary-dark/70 dark:text-primary-dark/40 text-xs">{m.reality}</td>
                    <td className="px-4 py-3 text-primary-dark/60 dark:text-primary-dark/40 text-xs hidden md:table-cell">{m.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* What Theologians Say */}
        <section id="theologians" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">What 12 Theologians and Scholars Say About God</h2>
          <p className="text-primary-dark/60 dark:text-primary-dark/40 mb-4 text-sm">From the early Church fathers to modern philosophers — 2,000 years of the best minds reflecting on God.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {THEOLOGIAN_QUOTES.map((t, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
                <blockquote className="text-primary-dark/80 dark:text-primary-dark/30 italic text-sm leading-relaxed mb-3 border-l-3 border-scripture/30 pl-4">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-scripture dark:text-white text-sm">{t.name}</p>
                    <p className="text-primary-dark/40 text-xs">{t.era} · <em>{t.work}</em></p>
                  </div>
                </div>
                <p className="text-primary-dark/60 dark:text-primary-dark/40 text-xs mt-2 leading-relaxed">{t.significance}</p>
              </div>
            ))}
          </div>
        </section>

        {/* OT vs NT God */}
        <section id="ot-nt" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Is God Different in the Old and New Testaments?</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            One of the most common objections: &ldquo;The OT God is angry and the NT God is loving.&rdquo; But is that true? Let&apos;s compare:
          </p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400">Quality</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400">Old Testament</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400">New Testament</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { quality: 'Love & Mercy', ot: '"The Lord is merciful and gracious, slow to anger, and plenteous in mercy" (Psalm 103:8)', nt: '"God is love" (1 John 4:8)' },
                  { quality: 'Judgment & Wrath', ot: 'Flood, Sodom, Egyptian plagues', nt: 'Ananias & Sapphira struck dead (Acts 5), final judgment in Revelation' },
                  { quality: 'Patience', ot: 'Waited 400 years before judging the Amorites (Genesis 15:16)', nt: '"Not willing that any should perish" (2 Peter 3:9)' },
                  { quality: 'Forgiveness', ot: 'Forgave David after murder and adultery (Psalm 51)', nt: 'Forgave the thief on the cross in his final hour (Luke 23:43)' },
                  { quality: 'Grace', ot: 'Saved Noah, chose Abraham, redeemed Israel from slavery', nt: '"By grace are ye saved through faith" (Ephesians 2:8)' },
                  { quality: 'Holiness', ot: 'Seraphim cry "Holy, holy, holy" (Isaiah 6:3)', nt: '"Be ye holy; for I am holy" (1 Peter 1:16 — quoting Leviticus)' },
                ].map((r, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border">
                    <td className="px-4 py-3 font-medium text-scripture dark:text-white">{r.quality}</td>
                    <td className="px-4 py-3 text-primary-dark/70 dark:text-primary-dark/40 text-xs">{r.ot}</td>
                    <td className="px-4 py-3 text-primary-dark/70 dark:text-primary-dark/40 text-xs">{r.nt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
            The verdict: <strong>same God, same character, both testaments</strong>. The difference isn&apos;t God&apos;s nature — it&apos;s the stage of His plan. The OT shows God preparing the world for the Messiah. The NT shows God sending Him. As Augustine wrote: &ldquo;The New Testament is in the Old Testament concealed; the Old Testament is in the New Testament revealed.&rdquo;
          </p>
        </section>

        {/* God's Love for You — Personal Section */}
        <section className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">God&apos;s Love for You — Personally</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            Everything on this page — the names, the attributes, the arguments, the scholarship — points to one reality: <strong>God wants to be known by you</strong>. Not just known about. Known personally.
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            Jesus told a parable about a shepherd who had 100 sheep. When one wandered off, he left the 99 to search for the one (<Link href="/cross-references/luke/15/4" className="text-blue-600 hover:underline">Luke 15:4-7</Link>). That&apos;s not a God who is distant or uninterested. That&apos;s a God who pursues.
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            He knows the number of hairs on your head (<Link href="/cross-references/matthew/10/30" className="text-blue-600 hover:underline">Matthew 10:30</Link>). He collects your tears in a bottle (<Link href="/cross-references/psalm/56/8" className="text-blue-600 hover:underline">Psalm 56:8</Link>). He knew you before you were born (<Link href="/cross-references/jeremiah/1/5" className="text-blue-600 hover:underline">Jeremiah 1:5</Link>). And He loved you enough to die for you while you were still running from Him (<Link href="/cross-references/romans/5/8" className="text-blue-600 hover:underline">Romans 5:8</Link>).
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
            If you&apos;ve read this far, that&apos;s not an accident. God is drawing you. The fact that you&apos;re asking &ldquo;Who is God?&rdquo; may be the beginning of the most important relationship of your life.
          </p>
        </section>

        {/* Gospel CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-scripture via-scripture/95 to-blue-950 rounded-xl p-8 md:p-10 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">How to Know God Personally</h2>
            <p className="text-blue-100/90 max-w-2xl mx-auto leading-relaxed mb-4">
              Knowing God starts with one step: trusting Jesus Christ. Here is the gospel in four truths:
            </p>
            <div className="max-w-xl mx-auto text-left mb-6 space-y-3">
              {[
                { num: '1', text: 'God loves you and created you for a relationship with Him (John 3:16).' },
                { num: '2', text: 'Your sin has separated you from God. Every person has sinned (Romans 3:23).' },
                { num: '3', text: 'Jesus Christ died on the cross to pay the penalty for your sin and rose again (1 Corinthians 15:3-4).' },
                { num: '4', text: 'If you repent and trust Jesus as your Savior, you are forgiven and receive eternal life (Romans 10:9-10).' },
              ].map((s) => (
                <div key={s.num} className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center text-sm font-bold shrink-0">{s.num}</span>
                  <p className="text-blue-100/90 text-sm leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
            <p className="text-blue-100/80 text-sm mb-6 italic max-w-xl mx-auto">
              &ldquo;Father, I know I am a sinner. I believe Jesus died for me and rose again. I repent of my sin and trust Jesus Christ as my Lord and Savior. Forgive me and give me eternal life. In Jesus&apos; name, amen.&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/john-3-16" className="inline-block bg-white text-scripture font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Read John 3:16 Explained
              </Link>
              <Link href="/bible-verses#salvation" className="inline-block border-2 border-white/40 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Bible Verses About Salvation
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Frequently Asked Questions About God</h2>
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

        {/* Go Deeper */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Go Deeper</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'The Bible', href: '/bible', desc: 'Complete guide to all 66 books' },
              { label: 'Jesus Christ', href: '/jesus-christ', desc: 'Who Jesus is — fully God, fully man' },
              { label: 'John 3:16 Explained', href: '/john-3-16', desc: 'The most famous verse, unpacked word by word' },
              { label: 'What Is Prayer?', href: '/prayer', desc: 'How to talk to God — a complete guide' },
              { label: 'Bible Verses About God', href: '/bible-topics/god', desc: 'What the Bible says about God\'s nature' },
              { label: 'Names of God', href: '/bible-topics/names-of-god', desc: 'Every name God uses to reveal Himself' },
              { label: 'Hebrew Word Studies', href: '/hebrew-words', desc: '8,600+ Hebrew words with original meanings' },
              { label: 'Greek Word Studies', href: '/greek-words', desc: '5,500+ Greek words with original meanings' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-4 shadow-sm hover:border-scripture dark:hover:border-blue-500 transition-colors group">
                <p className="font-bold text-scripture dark:text-white text-sm group-hover:underline">{item.label}</p>
                <p className="text-primary-dark/60 dark:text-primary-dark/40 text-xs mt-1">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Continue Your Study */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-3">Continue Your Study</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Romans 8:28 Study', href: '/romans-8-28' },
              { label: 'Psalm 23 Study', href: '/psalm-23' },
              { label: 'Isaiah 41:10 Study', href: '/isaiah-41-10' },
              { label: 'Philippians 4:13 Study', href: '/philippians-4-13' },
              { label: 'Proverbs 3:5-6 Study', href: '/proverbs-3-5-6' },
              { label: 'Jeremiah 29:11 Study', href: '/jeremiah-29-11' },
              { label: 'Bible Verses', href: '/bible-verses' },
              { label: 'Short Prayers', href: '/short-prayers' },
              { label: 'Bible Characters', href: '/bible-characters' },
              { label: 'Bible Places', href: '/bible-places' },
              { label: 'Cross-References', href: '/cross-references/john/3/16' },
              { label: 'Bible Encyclopedia', href: '/bible-encyclopedia/god' },
              { label: 'Bible Quizzes', href: '/bible-quizzes' },
              { label: 'Bible Timeline', href: '/timeline' },
              { label: 'Books of the Bible', href: '/books-of-the-bible' },
              { label: 'Bible Study for Beginners', href: '/bible-study-for-beginners' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-xs bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-950/40 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
