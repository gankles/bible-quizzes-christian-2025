import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';

const SITE_URL = 'https://biblemaximum.com';

export const metadata: Metadata = {
  title: 'John 3:16 Explained — Meaning, Context & Word-by-Word Study | Bible Maximum',
  description: 'What does John 3:16 mean? Complete guide with Koine Greek analysis, historical context, translation comparison, word-by-word study, cross-references, and FAQ. From curious seekers to seminary students.',
  keywords: ['john 3:16', 'john 3 16 meaning', 'john 3:16 explained', 'for god so loved the world', 'what does john 3:16 mean', 'john 3:16 study', 'born again', 'nicodemus', 'everlasting life', 'only begotten son', 'is god real', 'does god love me', 'how to be saved', 'john 3:16 greek', 'monogenes meaning', 'john 3:16 context', 'bronze serpent john 3', 'john 3:16 theology', 'agape love john 3:16', 'john 3:16 cross references', 'five doctrines john 3:16'],
  alternates: {
    canonical: '/john-3-16',
  },
  openGraph: {
    title: 'John 3:16 Explained — The Most Famous Verse in the Bible',
    description: 'Whether you\'re curious, skeptical, or a lifelong believer — a complete breakdown of the verse that changed the world.',
    url: `${SITE_URL}/john-3-16`,
    type: 'article',
    images: ['/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png'],
  },
};

const WORD_STUDY = [
  {
    phrase: '"For God"',
    greek: 'houtos gar ho theos',
    explanation: 'The verse starts with God — not you, not your effort, not your merit. Everything begins with Him. If you\'ve ever wondered whether there\'s anyone out there who cares, this verse answers immediately: yes, and He moved first. The Greek word houtos (translated "so" or "for") is a demonstrative adverb pointing to the manner of God\'s love: "in this way" God loved the world. It answers the question HOW did God love us — by giving His Son. The emphasis is on action, not just feeling.',
  },
  {
    phrase: '"so loved"',
    greek: 'agapao (agape love)',
    explanation: 'This is agape — the Greek word for unconditional, self-giving love. Not feelings. Not attraction. Not "I love you if you love me back." This is love that acts. Love that gives at great cost. God didn\'t just feel love for the world — He did something about it. The verb ēgapēsen is in the aorist tense, pointing to a specific, decisive act — the sending of His Son. Greek has four words for love (agape, philia, storge, eros). John chose the one that means love as a deliberate choice to act for another\'s good regardless of the cost or the response. This is the kind of love that sent Jesus to a cross for people who were spitting in His face.',
  },
  {
    phrase: '"the world"',
    greek: 'ton kosmon',
    explanation: 'Not just the religious. Not just the good. The world — every broken, rebellious, doubting, indifferent person in it. This includes people who don\'t believe in Him. It includes people who have actively rejected Him. That\'s what makes this verse so staggering: God loves a world that largely ignores or opposes Him.',
  },
  {
    phrase: '"that he gave"',
    greek: 'didomi (to give)',
    explanation: 'Love talks. God gave. He sent His Son into a world that would mock Him, betray Him, and kill Him. The cross was not an accident or a tragedy — it was the plan. God gave what was most precious to Him for people who deserved it least. That includes all of us.',
  },
  {
    phrase: '"his only begotten Son"',
    greek: 'monogenes (unique, one-of-a-kind)',
    explanation: '"Only begotten" doesn\'t mean Jesus was created — the Greek monogenes means "one and only," unique. It comes from monos (only) and genos (kind, type), not from gennao (to beget/generate). Jesus is not one of many sons. He is the unique, eternal Son of God who shares the Father\'s nature (John 1:1). The same word is used of Isaac in Hebrews 11:17 — Abraham had other sons (Ishmael), but Isaac was his "one and only" in the sense of being unique and irreplaceable. This sacrifice cannot be repeated because there is no one else like Him in all of existence.',
  },
  {
    phrase: '"that whosoever believeth in him"',
    greek: 'pas ho pisteuon eis auton',
    explanation: 'This is the most democratic word in the Bible: "whosoever." It erases every barrier — race, education, background, criminal record, religious pedigree, past failures. And "believeth" doesn\'t mean just agreeing that God exists. It means trusting your life to Jesus — relying on Him the way you rely on a chair to hold you when you sit down. True belief includes repentance — turning away from sin and turning toward God (Acts 3:19). Faith and repentance are two sides of the same coin: you can\'t truly trust Christ as Savior while refusing to let go of what He died to save you from.',
  },
  {
    phrase: '"should not perish"',
    greek: 'apollymi (to destroy, to be lost)',
    explanation: 'This is the word Jesus used for why He came. "Perish" means eternal separation from God — the ultimate consequence of going your own way permanently. It\'s a hard word, but it\'s what makes the rescue meaningful. You don\'t need a savior if there\'s nothing to be saved from.',
  },
  {
    phrase: '"but have everlasting life"',
    greek: 'zoe aionios (life of the age to come)',
    explanation: 'Not just "living forever" — that could be terrifying. This is a new kind of life. The Greek zoe refers to life in its fullest, richest sense — not bios (biological existence) but the very life of God shared with believers. And aionios means "belonging to the age to come" — the quality of existence in God\'s eternal kingdom. Jesus defined it Himself: "This is life eternal, that they might know thee the only true God, and Jesus Christ" (John 17:3). It starts now, the moment you believe. It means knowing God personally — forgiveness, purpose, peace, and a future that death cannot end. The present tense "have" (echē) in the Greek means believers possess eternal life right now, not merely as a future hope.',
  },
];

const GREEK_PARSING = [
  { greek: 'Οὕτως', transliteration: 'houtōs', partOfSpeech: 'Adverb', parsing: 'Demonstrative adverb of manner', gloss: 'in this way, thus, so', significance: 'Sets the degree and manner of God\'s love — not merely "a lot" but "in this specific way": by giving His Son.' },
  { greek: 'γὰρ', transliteration: 'gar', partOfSpeech: 'Conjunction', parsing: 'Explanatory conjunction', gloss: 'for, because', significance: 'Connects John 3:16 to the preceding verses (3:14-15) about the bronze serpent. This verse explains WHY the Son of Man must be lifted up.' },
  { greek: 'ἠγάπησεν', transliteration: 'ēgapēsen', partOfSpeech: 'Verb', parsing: 'Aorist Active Indicative, 3rd person singular', gloss: 'loved', significance: 'Aorist tense points to a decisive, completed act — God\'s love expressed definitively at the cross. Not an ongoing process but a singular, historic action.' },
  { greek: 'ὁ Θεὸς', transliteration: 'ho Theos', partOfSpeech: 'Noun', parsing: 'Nominative masculine singular with article', gloss: 'God', significance: 'The definite article marks this as THE God — the God of Abraham, Isaac, and Jacob. The subject of the entire verse: God initiates everything.' },
  { greek: 'τὸν κόσμον', transliteration: 'ton kosmon', partOfSpeech: 'Noun', parsing: 'Accusative masculine singular', gloss: 'the world', significance: 'Object of God\'s love. In John, kosmos often carries a negative sense — the world system opposed to God. God loves even a world that rebels against Him.' },
  { greek: 'ὥστε', transliteration: 'hōste', partOfSpeech: 'Conjunction', parsing: 'Result clause marker', gloss: 'so that, with the result that', significance: 'Introduces the concrete result of God\'s love: He gave. Love is not abstract — it produces action.' },
  { greek: 'τὸν υἱὸν', transliteration: 'ton huion', partOfSpeech: 'Noun', parsing: 'Accusative masculine singular', gloss: 'the Son', significance: 'The direct object of "gave" — God gave His Son. The costliest gift in the universe.' },
  { greek: 'τὸν μονογενῆ', transliteration: 'ton monogenē', partOfSpeech: 'Adjective', parsing: 'Accusative masculine singular', gloss: 'the one and only, unique', significance: 'From monos (only) + genos (kind). Not "only begotten" (as if created) but "one of a kind." Jesus is unique — no other being shares His nature.' },
  { greek: 'ἔδωκεν', transliteration: 'edōken', partOfSpeech: 'Verb', parsing: 'Aorist Active Indicative, 3rd person singular', gloss: 'gave', significance: 'Another aorist — a decisive, completed act of giving. God didn\'t loan His Son or send Him temporarily. He gave Him — fully, permanently, sacrificially.' },
  { greek: 'πᾶς', transliteration: 'pas', partOfSpeech: 'Adjective', parsing: 'Nominative masculine singular', gloss: 'everyone, all, whosoever', significance: 'Universal scope — no one is excluded from the offer. Combined with the participle, it means "every single one who believes."' },
  { greek: 'ὁ πιστεύων', transliteration: 'ho pisteuōn', partOfSpeech: 'Participle', parsing: 'Present Active Participle, nominative masculine singular', gloss: 'the one believing', significance: 'Present tense = ongoing, continuous belief. Not a one-time decision that fades, but a present and continuing trust. The article makes it substantival: "the believing one."' },
  { greek: 'εἰς αὐτὸν', transliteration: 'eis auton', partOfSpeech: 'Preposition + Pronoun', parsing: 'Preposition + accusative masculine singular', gloss: 'in/into him', significance: 'The preposition eis (into) shows belief is directional — not just believing facts about Jesus, but placing trust INTO Him. It implies commitment and personal reliance.' },
  { greek: 'μὴ ἀπόληται', transliteration: 'mē apolētai', partOfSpeech: 'Verb', parsing: 'Aorist Middle Subjunctive, 3rd person singular', gloss: 'should not perish', significance: 'Subjunctive mood + negative = purpose clause: "in order that he might not perish." The middle voice suggests self-destruction — sin leads to one\'s own ruin.' },
  { greek: 'ἀλλὰ', transliteration: 'alla', partOfSpeech: 'Conjunction', parsing: 'Strong adversative', gloss: 'but, rather', significance: 'The strongest Greek contrast word. Not a mild "however" but a sharp reversal: NOT perishing BUT eternal life. Two radically different destinies.' },
  { greek: 'ζωὴν αἰώνιον', transliteration: 'zōēn aiōnion', partOfSpeech: 'Noun + Adjective', parsing: 'Accusative feminine singular', gloss: 'life eternal', significance: 'Zōē = life in its fullest sense (not bios, mere biological existence). Aiōnios = belonging to the age to come. This is qualitatively different life — God\'s own life shared with believers.' },
];

const KEY_GREEK_TERMS = [
  { word: 'ἀγαπάω (agapaō)', transliteration: 'agapaō', range: 'To love unconditionally, to value supremely, to act for another\'s highest good regardless of response', significance: 'God\'s love is not reactive or conditional. It is a deliberate choice to act sacrificially for a world that does not deserve it.' },
  { word: 'μονογενής (monogenēs)', transliteration: 'monogenēs', range: 'One and only, unique, one of a kind (NOT "only begotten" in the sense of origin)', significance: 'Jesus is not one son among many. He is the unique Son who shares the Father\'s divine nature. The sacrifice is irreplaceable.' },
  { word: 'πιστεύω (pisteuō)', transliteration: 'pisteuō', range: 'To trust, to rely upon, to commit oneself to, to have faith in', significance: 'Biblical belief is personal trust, not intellectual agreement. Demons "believe" God exists (James 2:19). Saving faith means relying on Christ for salvation.' },
  { word: 'ἀπόλλυμι (apollymi)', transliteration: 'apollymi', range: 'To destroy, to ruin, to lose, to perish', significance: 'The alternative to eternal life is not annihilation but ruin — eternal separation from God. This is what makes the rescue urgent.' },
  { word: 'ζωὴ αἰώνιος (zōē aiōnios)', transliteration: 'zōē aiōnios', range: 'Life of the coming age, eternal life, the life of God Himself', significance: 'Not just endless duration but a different quality of existence — knowing God personally (John 17:3). It begins at conversion, not at death.' },
];

const FIVE_DOCTRINES = [
  { doctrine: 'Theology Proper (God\'s Nature)', phrase: '"God so loved"', teaches: 'God is a personal being who loves. He is not distant, indifferent, or hostile. His fundamental posture toward humanity is love.' },
  { doctrine: 'Christology (The Son)', phrase: '"his only begotten Son"', teaches: 'Jesus is God\'s unique Son — not created, not one of many, but the one-of-a-kind eternal Son who shares the Father\'s nature.' },
  { doctrine: 'Soteriology (Salvation)', phrase: '"whosoever believeth in him"', teaches: 'Salvation is by faith alone in Christ alone. It is universally offered ("whosoever") and personally received ("believeth").' },
  { doctrine: 'Hamartiology (Sin)', phrase: '"should not perish"', teaches: 'Sin\'s consequence is perishing — eternal ruin and separation from God. Without intervention, this is every person\'s default destination.' },
  { doctrine: 'Eschatology (Eternal Life)', phrase: '"but have everlasting life"', teaches: 'Believers receive a new quality of life that begins now and extends forever — knowing God personally in an unending relationship.' },
];

const COMMON_MISREADINGS = [
  { thinks: 'God loves me so He\'ll never let anything bad happen', actual: 'God loved the world so much He gave His Son to die — love doesn\'t prevent suffering, it enters it', matters: 'Expecting a pain-free life leads to disillusionment when trials come. God\'s love is proven at the cross, not in comfortable circumstances.' },
  { thinks: '"Whosoever" means everyone is automatically saved', actual: '"Whosoever BELIEVETH" — the offer is universal, but the condition is faith', matters: 'Universalism removes the urgency of the gospel. The invitation is open to all, but it must be personally received.' },
  { thinks: '"Believe" means agreeing that God exists', actual: 'Pisteuō means trusting your life to Christ — personal reliance, not intellectual acknowledgment', matters: 'Even demons believe God exists (James 2:19). Saving faith means depending on Jesus alone for salvation, which includes repentance.' },
  { thinks: 'This verse means God loves everyone equally and unconditionally no matter what they do', actual: 'God loves the world enough to offer salvation — but the verse contains a warning ("perish") for those who reject the offer', matters: 'God\'s love provides an escape from judgment, but it does not eliminate judgment. The love and the warning are in the same verse.' },
  { thinks: '"Everlasting life" just means living forever after death', actual: 'Zōē aiōnios is a new quality of life that starts NOW, at the moment of faith (John 17:3)', matters: 'Eternal life isn\'t a future event you wait for. It begins the instant you believe — new purpose, new relationship with God, new identity.' },
];

const CROSS_REFERENCES = [
  { ref: 'John 1:12', text: 'But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name.', theme: 'Faith', commentary: 'Receiving Christ and believing on His name are the same act. Those who do become children of God — not by birth, works, or religion, but by faith.' },
  { ref: 'Romans 5:8', text: 'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.', theme: 'God\'s Love', commentary: 'God didn\'t wait for us to clean up. He proved His love while we were still in rebellion. This is what makes grace scandalous.' },
  { ref: 'Romans 6:23', text: 'For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.', theme: 'The Gift', commentary: 'Sin earns death. Eternal life is a gift. You can\'t earn a gift — you can only receive it. This verse is the clearest statement of grace in the Bible.' },
  { ref: 'Ephesians 2:8-9', text: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.', theme: 'Faith', commentary: 'Salvation is by grace through faith — and even the faith is God\'s gift. Works are excluded entirely as a basis for salvation.' },
  { ref: '1 John 4:9-10', text: 'In this was manifested the love of God toward us, because that God sent his only begotten Son into the world, that we might live through him.', theme: 'God\'s Love', commentary: 'John wrote his Gospel and his epistles with the same theme: God\'s love is not a feeling He keeps to Himself — it is demonstrated by sending His Son.' },
  { ref: 'John 3:14-15', text: 'And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up: That whosoever believeth in him should not perish, but have eternal life.', theme: 'Faith', commentary: 'The verse immediately before John 3:16. Jesus compares Himself to the bronze serpent: just as looking at the serpent saved from physical death, looking to Christ in faith saves from eternal death.' },
  { ref: '2 Corinthians 5:21', text: 'For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him.', theme: 'The Gift', commentary: 'The great exchange: Christ took our sin; we receive His righteousness. This is what "gave his only begotten Son" cost.' },
  { ref: 'John 10:28', text: 'And I give unto them eternal life; and they shall never perish, neither shall any man pluck them out of my hand.', theme: 'Eternal Life', commentary: 'Jesus Himself guarantees eternal security. Those who believe "shall never perish" — not because of their grip on God, but because of His grip on them.' },
  { ref: 'Titus 3:5', text: 'Not by works of righteousness which we have done, but according to his mercy he saved us, by the washing of regeneration, and renewing of the Holy Ghost.', theme: 'The Gift', commentary: 'Salvation is not earned by righteous acts. It comes through God\'s mercy, spiritual rebirth, and the Holy Spirit — exactly what Jesus told Nicodemus in John 3.' },
  { ref: 'Acts 16:31', text: 'Believe on the Lord Jesus Christ, and thou shalt be saved, and thy house.', theme: 'Faith', commentary: 'The simplest gospel invitation in Acts. Paul gave the Philippian jailer the same answer Jesus gave Nicodemus: believe, and you will be saved.' },
];

const TRANSLATION_COMPARISON = [
  { version: 'KJV (1611)', text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', notes: 'The classic rendering. "Only begotten" translates monogenēs. "Whosoever believeth" preserves the present participle. Formal equivalence.' },
  { version: 'ESV (2001)', text: 'For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.', notes: 'Drops "begotten" — reflecting modern scholarship that monogenēs means "one and only," not "only generated." Otherwise follows KJV structure closely.' },
  { version: 'NIV (2011)', text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.', notes: '"One and only" makes monogenēs explicit. "Shall not perish" is stronger than "should not" — more certainty in the promise.' },
  { version: 'NASB (2020)', text: 'For God so loved the world, that He gave His only Son, so that everyone who believes in Him will not perish, but have eternal life.', notes: '"Everyone who believes" replaces "whosoever" — same meaning, modern English. "Will not perish" expresses confident future reality.' },
  { version: 'NLT (2015)', text: 'For this is how God loved the world: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life.', notes: '"This is how" captures the demonstrative force of houtos — God loved the world IN THIS WAY. The only major translation that makes this distinction explicit.' },
  { version: 'Literal Rendering', text: 'For in this manner God loved the world, so that He gave the Son, the one-and-only, in order that everyone believing into Him should not perish but should have life eternal.', notes: 'Word-order follows the Greek. "Believing into" preserves pisteuōn eis (directional faith). "Life eternal" mirrors the Greek zōēn aiōnion word order.' },
];

const FAQ_ITEMS = [
  {
    question: 'What does John 3:16 mean in plain language?',
    answer: 'In the simplest terms: God loves you. He proved it by sending Jesus to die in your place. If you trust in Jesus, you won\'t face eternal judgment — you\'ll have eternal life with God instead. That\'s the entire message of Christianity compressed into one sentence. It doesn\'t require you to clean up your life first, earn God\'s approval, or understand everything about the Bible. It starts with believing.',
  },
  {
    question: 'What does "only begotten Son" mean?',
    answer: 'The phrase comes from the Greek word monogenes, meaning "one and only" or "unique." It does not mean Jesus was created or had a beginning — John 1:1 says "the Word was God." It means Jesus has a relationship with God the Father that no one else shares. He is the unique, one-of-a-kind Son of God. That\'s what makes this sacrifice so staggering — God didn\'t send an angel or a prophet. He sent the only one who could actually save us.',
  },
  {
    question: 'What does "believeth" actually mean? Is it just agreeing God exists?',
    answer: 'No. The Greek word pisteuo means far more than intellectual agreement. Even demons "believe" God exists (James 2:19). Biblical belief means personal trust — placing your confidence in Jesus for your salvation the way you trust a parachute when you jump. It means relying on what He did on the cross rather than on your own goodness. It\'s a decision that changes how you live.',
  },
  {
    question: 'Why is John 3:16 the most famous Bible verse?',
    answer: 'Because it answers the four biggest questions humans ask: Does God love me? (Yes — "God so loved the world.") What did He do about it? (He "gave his only begotten Son.") What do I have to do? ("Whosoever believeth in him.") What happens then? ("Should not perish, but have everlasting life.") No other sentence in history covers that much ground. Martin Luther called it "the gospel in miniature."',
  },
  {
    question: 'What does "perish" mean? Is God threatening people?',
    answer: '"Perish" (Greek: apollymi) means eternal separation from God. It\'s the natural consequence of sin — not an angry punishment God inflicts on people who annoy Him. Think of it like gravity: if you step off a cliff, the fall isn\'t a punishment — it\'s a consequence. God is warning because He loves. The whole point of John 3:16 is that God doesn\'t want anyone to perish. That\'s why He sent Jesus.',
  },
  {
    question: 'I\'m not sure I believe. Does John 3:16 still apply to me?',
    answer: 'Yes — "whosoever" means the offer is open to you right now. You don\'t need to have perfect faith or zero doubts. The man who brought his sick son to Jesus said, "Lord, I believe; help thou mine unbelief" (Mark 9:24) — and Jesus healed his son anyway. God isn\'t looking for perfection. He\'s looking for honesty. If you\'re willing to trust Him even with your doubts, that\'s where faith begins.',
  },
  {
    question: 'What is eternal life — just living forever?',
    answer: 'Not exactly. Eternal life is a new quality of life, not just endless duration. Jesus defined it: "This is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent" (John 17:3). It\'s knowing God personally — experiencing forgiveness, purpose, peace, and the presence of the Holy Spirit. It starts the moment you believe, not after you die. And it continues forever because God Himself is eternal.',
  },
  {
    question: 'Does John 3:16 require repentance, or just belief?',
    answer: 'Both. Biblical belief is never separated from repentance. Jesus began His ministry with the words "Repent, and believe the gospel" (Mark 1:15). Repentance means a change of mind and direction — turning away from sin and turning toward God. It\'s not about being perfect; it\'s about being willing. Acts 3:19 says, "Repent ye therefore, and be converted, that your sins may be blotted out." Faith without repentance is mere intellectual agreement. Repentance without faith is self-effort. Together, they are the biblical response to the gospel that John 3:16 presents.',
  },
  {
    question: 'If God loves the whole world, why is there so much suffering?',
    answer: 'This is one of the hardest questions anyone can ask, and the Bible doesn\'t dodge it. Suffering entered the world through sin — humanity\'s rejection of God (Genesis 3). God didn\'t cause it; we did. But John 3:16 shows that God\'s response to a broken world wasn\'t to abandon it — it was to enter it. Jesus suffered, was betrayed, and was crucified. God knows suffering firsthand. And He offers a future where "God shall wipe away all tears" (Revelation 21:4).',
  },
  {
    question: 'What is the connection between John 3:14-15 and John 3:16?',
    answer: 'John 3:14-15 is the setup. Jesus tells Nicodemus that just as Moses lifted up a bronze serpent in the wilderness so that anyone bitten by a snake could look at it and live (Numbers 21:4-9), the Son of Man must also be "lifted up" — a reference to the cross. Anyone who looks to Jesus in faith will not die but have eternal life. John 3:16 then explains WHY this must happen: because God loved the world so much that He gave His only Son. The word "for" (Greek: gar) at the beginning of verse 16 makes this an explanation of verses 14-15. Without understanding the bronze serpent, you miss the flow of Jesus\' argument.',
  },
  {
    question: 'What does the Greek word "houtos" (so) really mean in John 3:16?',
    answer: 'The Greek word houtos is often read as "so much" — as if it only describes the degree of God\'s love. But houtos is a demonstrative adverb meaning "in this manner" or "in this way." It points to HOW God loved the world: by giving His Son. The emphasis is not just on the intensity of God\'s love but on the specific way He expressed it. God loved the world IN THIS WAY — He gave His only begotten Son. Both the manner and the magnitude are in view.',
  },
  {
    question: 'Can someone lose their salvation after believing in John 3:16?',
    answer: 'John 3:16 says the one who believes "should not perish, but HAVE everlasting life." The verb "have" (echō) is in the present tense — the believer possesses eternal life right now. Jesus made this even clearer in John 10:28-29: "I give unto them eternal life; and they shall never perish, neither shall any man pluck them out of my hand. My Father, which gave them me, is greater than all; and no man is able to pluck them out of my Father\'s hand." Eternal life that can be lost is not eternal. The security of the believer rests not on human faithfulness but on God\'s faithfulness and the finished work of Christ.',
  },
];

function verseRefToPath(ref: string): string {
  const m = ref.match(/^(\d?\s*[A-Za-z]+)\s+(\d+):(\d+)/);
  if (!m) return '#';
  const book = m[1].trim().toLowerCase().replace(/\s+/g, '-');
  return `/cross-references/${book}/${m[2]}/${m[3]}`;
}

export default function John316Page() {
  const bibleStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    additionalType: 'https://schema.org/LearningResource',
    learningResourceType: 'Bible Study',
    educationalLevel: 'All levels',
    inLanguage: 'en',
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'John 3:16 Explained — Meaning, Context & Word-by-Word Study',
    description: 'A complete word-by-word study of the most famous Bible verse with Greek analysis, historical context, translation comparison, cross-references, and FAQ.',
    url: `${SITE_URL}/john-3-16`,
    author: {
      '@type': 'Organization',
      name: 'Bible Maximum',
      url: SITE_URL,
      sameAs: [
        'https://facebook.com/biblemaximum',
        'https://twitter.com/biblemaximum',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bible Maximum',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/john-3-16` },
    about: [
      { '@type': 'Thing', name: 'John 3:16', sameAs: 'https://www.wikidata.org/wiki/Q35744' },
      { '@type': 'CreativeWork', name: 'Gospel of John', sameAs: 'https://www.wikidata.org/wiki/Q36766' },
      { '@type': 'Thing', name: 'Salvation in Christianity', sameAs: 'https://www.wikidata.org/wiki/Q1425547' },
    ],
    mentions: [
      { '@type': 'Person', name: 'Nicodemus', sameAs: 'https://www.wikidata.org/wiki/Q234628' },
      { '@type': 'Person', name: 'Jesus', sameAs: 'https://www.wikidata.org/wiki/Q302' },
      { '@type': 'Person', name: 'Moses', sameAs: 'https://www.wikidata.org/wiki/Q9077' },
      { '@type': 'Thing', name: 'Koine Greek', sameAs: 'https://www.wikidata.org/wiki/Q35497' },
      { '@type': 'Thing', name: 'Agape', sameAs: 'https://www.wikidata.org/wiki/Q209008' },
    ],
    isPartOf: { '@type': 'WebSite', name: 'Bible Maximum', url: SITE_URL },
    inLanguage: 'en',
    wordCount: 13500,
    articleSection: 'Bible Study',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#what-it-means', 'blockquote'],
    },
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
      { '@type': 'ListItem', position: 3, name: 'John 3:16 Explained', item: `${SITE_URL}/john-3-16` },
    ],
  };

  return (
    <div className="min-h-screen bg-primary-light/30 dark:bg-dark-bg">
      <StructuredData data={articleSchema} />
      <StructuredData data={bibleStudySchema} />
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
            <li><Link href="/john-chapters" className="text-sacred hover:underline">Gospel of John</Link></li>
            <li className="text-ink-light mx-2">/</li>
            <li className="text-ink-muted font-medium">John 3:16</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-scripture dark:bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png"
            alt="Open Bible with light symbolizing God's word"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-sacred text-sm font-bold uppercase tracking-widest mb-4">The Most Famous Verse in the Bible</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-display leading-tight mb-8">
            John 3:16 Explained
          </h1>
          <blockquote className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8">
            <p className="text-xl md:text-2xl text-white leading-relaxed italic font-light">
              &ldquo;For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.&rdquo;
            </p>
            <cite className="block mt-4 text-sacred text-sm font-bold not-italic">— John 3:16 (KJV)</cite>
          </blockquote>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#what-it-means" className="inline-flex items-center justify-center bg-scripture hover:bg-ink-muted text-white font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
              What Does This Mean?
            </a>
            <a href="#word-study" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
              Go Deeper — Word by Word
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">

        {/* Table of Contents */}
        <nav id="toc" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 mb-12 shadow-sm scroll-mt-20">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
            <a href="#what-it-means" className="text-sacred hover:underline text-sm py-1">What Does John 3:16 Actually Mean?</a>
            <a href="#translations" className="text-sacred hover:underline text-sm py-1">Translation Comparison</a>
            <a href="#audience" className="text-sacred hover:underline text-sm py-1">Wherever You Are, This Verse Speaks to You</a>
            <a href="#historical-context" className="text-sacred hover:underline text-sm py-1">Historical Context</a>
            <a href="#literary-context" className="text-sacred hover:underline text-sm py-1">Literary Context in John&apos;s Gospel</a>
            <a href="#greek-deep-dive" className="text-sacred hover:underline text-sm py-1">Koine Greek Deep Dive</a>
            <a href="#clause-1" className="text-sacred hover:underline text-sm py-1">Clause 1: &ldquo;For God so loved the world&rdquo;</a>
            <a href="#clause-2" className="text-sacred hover:underline text-sm py-1">Clause 2: &ldquo;He gave his only begotten Son&rdquo;</a>
            <a href="#clause-3" className="text-sacred hover:underline text-sm py-1">Clause 3: &ldquo;Whosoever believeth in him&rdquo;</a>
            <a href="#clause-4" className="text-sacred hover:underline text-sm py-1">Clause 4: &ldquo;Should not perish but have everlasting life&rdquo;</a>
            <a href="#alternative-translations" className="text-sacred hover:underline text-sm py-1">Alternative Translations</a>
            <a href="#word-study" className="text-sacred hover:underline text-sm py-1">Word-by-Word Study</a>
            <a href="#theological-significance" className="text-sacred hover:underline text-sm py-1">Theological Significance</a>
            <a href="#why-it-matters" className="text-sacred hover:underline text-sm py-1">Why John 3:16 Still Matters</a>
            <a href="#application" className="text-sacred hover:underline text-sm py-1">Ancient &amp; Modern Application</a>
            <a href="#honest-questions" className="text-sacred hover:underline text-sm py-1">Honest Questions People Ask</a>
            <a href="#cross-references" className="text-sacred hover:underline text-sm py-1">Cross-References</a>
            <a href="#faq" className="text-sacred hover:underline text-sm py-1">Frequently Asked Questions</a>
            <a href="#continue" className="text-sacred hover:underline text-sm py-1">Continue Your Study</a>
          </div>
        </nav>

        {/* Plain-Language Summary — For Everyone */}
        <section id="what-it-means" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 mb-12 shadow-sm scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">What Does John 3:16 Actually Mean?</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed text-lg mb-4">
            Strip away the religious language and John 3:16 says something remarkably simple: <strong>God loves you, He proved it, and He&apos;s offering you a way out of death and into life.</strong>
          </p>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            Here&apos;s the verse broken into four plain statements:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="bg-sacred-light dark:bg-sacred-light0/20 border border-sacred/20 dark:border-sacred/20 rounded-lg p-4">
              <p className="text-sm font-bold text-scripture dark:text-sacred mb-1">The Motivation</p>
              <p className="text-scripture dark:text-ink-light text-sm">&ldquo;God so loved the world&rdquo; — He loves everyone, including you, right now, as you are.</p>
            </div>
            <div className="bg-sacred-light dark:bg-sacred-light0/20 border border-sacred/20 dark:border-sacred/20 rounded-lg p-4">
              <p className="text-sm font-bold text-scripture dark:text-sacred mb-1">The Action</p>
              <p className="text-scripture dark:text-ink-light text-sm">&ldquo;He gave his only begotten Son&rdquo; — God sent Jesus to die in your place. This was the plan, not an accident.</p>
            </div>
            <div className="bg-sacred-light dark:bg-sacred-light0/20 border border-sacred/20 dark:border-sacred/20 rounded-lg p-4">
              <p className="text-sm font-bold text-scripture dark:text-sacred mb-1">Your Part</p>
              <p className="text-scripture dark:text-ink-light text-sm">&ldquo;Whosoever believeth in him&rdquo; — Anyone can receive this. The only requirement is trust — not perfection, not works.</p>
            </div>
            <div className="bg-sacred-light dark:bg-sacred-light0/20 border border-sacred/20 dark:border-sacred/20 rounded-lg p-4">
              <p className="text-sm font-bold text-scripture dark:text-sacred mb-1">The Result</p>
              <p className="text-scripture dark:text-ink-light text-sm">&ldquo;Should not perish, but have everlasting life&rdquo; — Eternal life with God instead of eternal separation from Him.</p>
            </div>
          </div>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            Martin Luther called John 3:16 &ldquo;the gospel in miniature.&rdquo; Whether you&apos;re reading the Bible for the first time or the thousandth time, this verse is the foundation everything else is built on.
          </p>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            What makes this verse extraordinary is not just what it says but what it assumes. It assumes a God who is personal, not abstract. It assumes a world in trouble &mdash; not evolving toward perfection but perishing. It assumes that human effort cannot bridge the gap between sinful people and a holy God. And it assumes that love, real love, is measured not by what it feels but by what it gives.
          </p>
          <p className="text-scripture dark:text-ink-light leading-relaxed">
            Every major world religion asks some version of the question: &ldquo;What must I do to reach God?&rdquo; John 3:16 flips the question entirely. It says God has already reached down to you. The only question left is whether you will receive what He is offering. Below, we dig into every layer of this verse &mdash; its historical context, Greek grammar, theological significance, and modern application.
          </p>
        </section>

        {/* Translation Comparison */}
        <section id="translations" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">How John 3:16 Reads Across Major Translations</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm">Every English translation makes interpretive choices. Comparing them reveals nuances that a single version cannot capture.</p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary-light/30 dark:bg-dark-bg border-b border-grace dark:border-dark-border">
                  <th className="text-left p-3 font-bold text-scripture dark:text-white w-32">Version</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Text</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white w-64">Translation Notes</th>
                </tr>
              </thead>
              <tbody>
                {TRANSLATION_COMPARISON.map((row, idx) => (
                  <tr key={idx} className="border-b border-grace/50 dark:border-dark-border/50">
                    <td className="p-3 font-medium text-scripture dark:text-white whitespace-nowrap">{row.version}</td>
                    <td className="p-3 text-scripture dark:text-ink-light italic">{row.text}</td>
                    <td className="p-3 text-ink-muted dark:text-ink-light text-xs">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <p className="text-sm text-amber-900 dark:text-amber-200">
              <strong>Key takeaway:</strong> The NLT is the only major translation that renders <em>houtos</em> as &ldquo;this is how&rdquo; rather than &ldquo;so.&rdquo; Most English readers assume &ldquo;so&rdquo; means &ldquo;so much,&rdquo; but the Greek emphasizes <em>manner</em>: God loved the world <strong>in this way</strong> &mdash; by giving His Son. The degree of love is shown by the action, not stated by the adverb.
            </p>
          </div>
        </section>

        {/* Who This Page Is For — Audience Segments */}
        <section id="audience" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Wherever You Are, This Verse Speaks to You</h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2">If you&apos;re curious and exploring</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed text-sm">
                You may have seen John 3:16 on a sign, a bumper sticker, or in a movie and wondered what it was about. You&apos;re in the right place. This page walks through every word of the verse, explains the backstory, and answers the questions people are actually asking — no assumptions, no jargon.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2">If you&apos;re skeptical</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed text-sm">
                That&apos;s fine. Nicodemus — the man Jesus was talking to when He said this — was a highly educated religious leader with hard questions and real doubts. Jesus didn&apos;t dismiss him. He gave him a direct answer. This page does the same. Read the context, weigh the claims, and decide for yourself what you think.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2">If you don&apos;t believe — or aren&apos;t sure</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed text-sm">
                John 3:16 was spoken to a man who didn&apos;t understand yet. You don&apos;t have to believe before you can investigate. The verse itself says &ldquo;whosoever&rdquo; — the invitation is for anyone, including you, right now. The Bible says the response is to repent (turn from going your own way) and believe (trust Jesus with your life). If something here resonates, that&apos;s worth paying attention to. <Link href="/what-does-the-bible-say-about/salvation" className="text-sacred hover:underline">How to Be Saved</Link> is a good next step.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2">If you&apos;re a new believer</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed text-sm">
                Welcome. John 3:16 is your foundation. Everything you&apos;ll learn about the Bible builds on what this verse says: God loves you, Jesus died for you, and your eternal life is secure through faith. When doubts come — and they will — come back to this verse. It&apos;s not complicated. God loved. God gave. You believed. You have life. That&apos;s settled.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2">If you&apos;ve known this verse for years</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed text-sm">
                Familiarity can dull the impact of the most powerful words ever spoken. The <a href="#word-study" className="text-sacred hover:underline">word-by-word study below</a> digs into the Greek, the Old Testament background (the bronze serpent in Numbers 21), and the theology that seasoned believers often skim past. Let this verse hit you again like it did the first time.
              </p>
            </div>
          </div>
        </section>

        {/* Historical Context of John 3:16 */}
        <section id="historical-context" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Historical Context of John 3:16</h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-scripture dark:text-white mb-3">The Political Landscape: Roman-Occupied Judea</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                When Jesus spoke these words, Israel was not a free nation. Rome had occupied Judea since 63 BC, and by the time of Jesus&apos; ministry (approximately AD 27-30), the Jewish people lived under the shadow of the world&apos;s most powerful empire. Roman governors like Pontius Pilate enforced imperial law. Jewish kings like Herod Antipas ruled only at Rome&apos;s pleasure.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                The tension was suffocating. Jewish religious leaders walked a political tightrope &mdash; cooperate with Rome enough to keep their authority, resist enough to keep the people&apos;s loyalty. The common people longed for a Messiah, but most expected a military deliverer who would overthrow Rome and restore David&apos;s kingdom. Nobody expected what God actually sent.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                Into this pressure cooker walks a carpenter from Nazareth, performing miracles and claiming authority over the Sabbath. The Pharisees are alarmed. The Sadducees are suspicious. The crowds are fascinated. And one religious leader decides he needs to investigate for himself &mdash; quietly.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-scripture dark:text-white mb-3">Who Was Nicodemus?</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                <Link href="/characters/nicodemus" className="text-sacred font-medium hover:underline">Nicodemus</Link> was not a casual inquirer. He was a Pharisee &mdash; a member of the strictest religious sect in Judaism, devoted to meticulous obedience to the Law of Moses. He was also a &ldquo;ruler of the Jews&rdquo; (John 3:1), meaning he sat on the Sanhedrin &mdash; the 71-member supreme court that governed Jewish religious and civil life under Roman permission.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                Jesus called him &ldquo;a master of Israel&rdquo; (John 3:10) &mdash; literally &ldquo;THE teacher of Israel.&rdquo; The definite article suggests Nicodemus was not just any teacher but one of the most respected theological authorities in the nation. Think of the dean of the most prestigious seminary &mdash; that was Nicodemus.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                And Jesus told this man &mdash; this moral, educated, deeply religious man &mdash; that he needed to be born again. If Nicodemus wasn&apos;t good enough on his own, no one is.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-scripture dark:text-white mb-3">Why Did Nicodemus Come at Night?</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                John 3:2 specifies that Nicodemus came to Jesus &ldquo;by night.&rdquo; Commentators have debated why for centuries. The most natural reading is that Nicodemus was protecting his reputation. A Sanhedrin member publicly visiting this controversial rabbi from Galilee would have been career suicide. His Pharisee colleagues were already plotting against Jesus.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                But there may be more to it. In John&apos;s Gospel, darkness and light carry symbolic weight (John 1:5, 8:12, 12:46). Nicodemus came out of spiritual darkness toward the Light of the World. He arrived in the dark &mdash; but he came. That took courage. And the conversation that followed changed everything.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-scripture dark:text-white mb-3">The Conversation Before the Verse (John 3:3-15)</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                Nicodemus opened with a compliment: &ldquo;Rabbi, we know that thou art a teacher come from God: for no man can do these miracles that thou doest, except God be with him&rdquo; (John 3:2). He was testing the waters, feeling Jesus out intellectually.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                Jesus didn&apos;t engage the flattery. He cut straight to the issue: <strong>&ldquo;Except a man be <Link href="/topics/born-again" className="text-sacred hover:underline">born again</Link>, he cannot see the kingdom of God&rdquo;</strong> (John 3:3). The Greek word <em>anothen</em> means both &ldquo;again&rdquo; and &ldquo;from above&rdquo; &mdash; Nicodemus needed a birth from heaven, not just a moral upgrade.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                Nicodemus was baffled: &ldquo;How can a man be born when he is old?&rdquo; He was thinking physically. Jesus meant spiritually. The wind analogy in John 3:8 illustrates the mystery: you can hear the wind and see its effects, but you cannot control or predict it. Spiritual rebirth is God&apos;s sovereign work, not a human achievement.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                Then Jesus made the connection that sets up verse 16: &ldquo;As Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up: That whosoever believeth in him should not perish, but have eternal life&rdquo; (John 3:14-15).
              </p>
            </div>

            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-scripture dark:text-white mb-3">The Bronze Serpent Connection (Numbers 21:4-9)</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                This is the Old Testament story Nicodemus would have known by heart. During Israel&apos;s wilderness wanderings, the people grumbled against God. He sent venomous serpents among them as judgment, and many died. When they repented, God told <Link href="/characters/moses" className="text-sacred hover:underline">Moses</Link> to make a bronze serpent and set it on a pole. Anyone who was bitten could look at the bronze serpent and live (<Link href="/cross-references/numbers/21/8" className="text-sacred hover:underline">Numbers 21:8-9</Link>).
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                The parallels to the cross are precise. The serpent represented the curse of sin. The pole foreshadowed the cross. Looking at the serpent was an act of faith &mdash; not a magical cure but a response of trust in God&apos;s provided remedy. And the offer was universal: &ldquo;every one that is bitten, when he looketh upon it, shall live.&rdquo;
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                Jesus used this image because it captured every element of John 3:16 before He even said it. A deadly problem (sin). A God-provided solution (the Son lifted up). A simple condition (look/believe). A guaranteed result (life). John 3:16 is the theological explanation of what the bronze serpent pictured.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-scripture dark:text-white mb-3">Jewish Messianic Expectations: What Israel Was Waiting For</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                First-century Jews were not waiting for a suffering savior. They were waiting for a conquering king. The dominant Messianic expectation &mdash; fueled by passages like <Link href="/cross-references/isaiah/9/6" className="text-sacred hover:underline">Isaiah 9:6-7</Link> and Daniel 7:13-14 &mdash; was that God would send a royal descendant of David who would overthrow Rome, restore Israel&apos;s political sovereignty, and inaugurate an era of unbroken peace. The Messiah was supposed to come with a sword, not a cross.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                This is why John 3:16 was so radical. Jesus told Nicodemus &mdash; a scholar who knew every Messianic prophecy &mdash; that God&apos;s plan was not military conquest but sacrificial love. The Son would not be &ldquo;lifted up&rdquo; on a throne but on a cross. The kingdom would not come through force but through faith. And the beneficiaries would not be Israel alone but &ldquo;the world.&rdquo;
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                Nicodemus would have found this disorienting. The Psalms of Solomon (a first-century Jewish text) describe the expected Messiah as one who would &ldquo;purge Jerusalem from the nations that trample her&rdquo; and &ldquo;shatter all their substance with an iron rod.&rdquo; Jesus offered something entirely different: &ldquo;God sent not his Son into the world to condemn the world; but that the world through him might be saved&rdquo; (John 3:17). The Messiah came not to destroy the enemy but to die for them.
              </p>
            </div>
          </div>
        </section>

        {/* Literary Context in John's Gospel */}
        <section id="literary-context" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Literary Context: Where John 3:16 Fits in John&apos;s Gospel</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">The Structure of John&apos;s Gospel</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                John organized his Gospel differently from Matthew, Mark, and Luke. While the Synoptic Gospels follow a largely chronological narrative, John structures his account around seven miraculous &ldquo;signs&rdquo; and a series of theological discourses. Scholars typically divide John into two major sections: the <strong>Book of Signs</strong> (chapters 1&ndash;12), which records Jesus&apos; public ministry, and the <strong>Book of Glory</strong> (chapters 13&ndash;21), which focuses on the passion, resurrection, and post-resurrection appearances.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                John 3:16 falls in the <Link href="/bible-chapter-summaries/john/3" className="text-sacred hover:underline">Book of Signs</Link>, early in Jesus&apos; public ministry. It comes after the first sign &mdash; turning water into wine at Cana (John 2:1-11) &mdash; and the temple cleansing (John 2:13-22). These events established Jesus&apos; authority. The conversation with Nicodemus that contains John 3:16 is the first extended theological discourse in the Gospel, and it sets the interpretive framework for everything that follows.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">John 3:16 as the Gospel&apos;s Thesis Statement</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                If John&apos;s Gospel were an essay, John 3:16 would be the thesis sentence. Every major theme John develops over 21 chapters is compressed into this single verse. The <Link href="/john-chapters" className="text-sacred hover:underline">remaining chapters</Link> unpack what John 3:16 compresses:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="bg-sacred-light dark:bg-sacred-light0/20 border border-sacred/20 dark:border-sacred/20 rounded-lg p-3">
                  <p className="text-xs font-bold text-scripture dark:text-sacred mb-1">&ldquo;God so loved&rdquo;</p>
                  <p className="text-scripture dark:text-ink-light text-xs">Developed in the Bread of Life discourse (ch. 6), Good Shepherd (ch. 10), and the Farewell Discourse (chs. 14&ndash;17)</p>
                </div>
                <div className="bg-sacred-light dark:bg-sacred-light0/20 border border-sacred/20 dark:border-sacred/20 rounded-lg p-3">
                  <p className="text-xs font-bold text-scripture dark:text-sacred mb-1">&ldquo;He gave his Son&rdquo;</p>
                  <p className="text-scripture dark:text-ink-light text-xs">Culminates in the Passion narrative (chs. 18&ndash;19) where the &ldquo;giving&rdquo; becomes visible at Calvary</p>
                </div>
                <div className="bg-sacred-light dark:bg-sacred-light0/20 border border-sacred/20 dark:border-sacred/20 rounded-lg p-3">
                  <p className="text-xs font-bold text-scripture dark:text-sacred mb-1">&ldquo;Whosoever believeth&rdquo;</p>
                  <p className="text-scripture dark:text-ink-light text-xs">Explored through belief/unbelief contrasts: the Samaritan woman (ch. 4), the blind man (ch. 9), Thomas (ch. 20)</p>
                </div>
                <div className="bg-sacred-light dark:bg-sacred-light0/20 border border-sacred/20 dark:border-sacred/20 rounded-lg p-3">
                  <p className="text-xs font-bold text-scripture dark:text-sacred mb-1">&ldquo;Eternal life&rdquo;</p>
                  <p className="text-scripture dark:text-ink-light text-xs">Defined in John 17:3 and demonstrated in the resurrection of Lazarus (ch. 11) and of Jesus Himself (ch. 20)</p>
                </div>
              </div>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                John even tells us why he wrote his Gospel, and it echoes John 3:16 almost word for word: &ldquo;These are written, that ye might <strong>believe</strong> that Jesus is the Christ, the <strong>Son of God</strong>; and that believing ye might have <strong>life</strong> through his name&rdquo; (<Link href="/cross-references/john/20/31" className="text-sacred hover:underline">John 20:31</Link>). The entire book is an extended argument for what John 3:16 declares in a single breath.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">The Immediate Context: John 3:1-21</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                John 3:16 does not stand alone. It is the climax of a 21-verse unit that moves through three stages: the <em>need</em> for new birth (vv. 1-8), the <em>means</em> of new birth &mdash; the Son lifted up like the bronze serpent (vv. 9-15), and the <em>motivation</em> behind it all &mdash; God&apos;s love (vv. 16-21). Verses 17-21 continue the thought by explaining that God sent the Son not to condemn but to save, and that judgment falls on those who reject the light, not on those who come to it.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                Reading John 3:16 without verses 17-21 is like reading the headline without the article. Verse 17 (&ldquo;God sent not his Son into the world to condemn the world&rdquo;) corrects the assumption that God&apos;s posture is wrath. Verse 18 (&ldquo;he that believeth on him is not condemned&rdquo;) clarifies that faith removes condemnation immediately, not at some future judgment. And verse 19 (&ldquo;men loved darkness rather than light&rdquo;) explains why some reject the offer &mdash; not because the light is insufficient, but because they prefer the dark.
              </p>
            </div>
          </div>
        </section>

        {/* Koine Greek Deep Dive */}
        <section id="greek-deep-dive" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Koine Greek Deep Dive</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm">The original language reveals layers of meaning that English translations can only approximate.</p>

          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm mb-6">
            <p className="text-lg text-scripture dark:text-white font-medium mb-2">Greek Text (NA28):</p>
            <p className="text-xl text-scripture dark:text-sacred italic leading-relaxed mb-3" lang="grc">
              Οὕτως γὰρ ἠγάπησεν ὁ Θεὸς τὸν κόσμον, ὥστε τὸν υἱὸν τὸν μονογενῆ ἔδωκεν, ἵνα πᾶς ὁ πιστεύων εἰς αὐτὸν μὴ ἀπόληται ἀλλ᾽ ἔχῃ ζωὴν αἰώνιον.
            </p>
            <p className="text-sm text-ink-muted dark:text-ink-light italic mb-1">Transliteration: Houtōs gar ēgapēsen ho Theos ton kosmon, hōste ton huion ton monogenē edōken, hina pas ho pisteuōn eis auton mē apolētai all&apos; echē zōēn aiōnion.</p>
            <p className="text-sm text-ink-muted dark:text-ink-light">KJV: &ldquo;For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.&rdquo;</p>
          </div>

          {/* Greek Parsing Table */}
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm mb-6 overflow-x-auto">
            <h3 className="text-lg font-bold text-scripture dark:text-white p-5 pb-3">Complete Greek Parsing Table</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary-light/30 dark:bg-dark-bg border-b border-grace dark:border-dark-border">
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Greek</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Transliteration</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Part of Speech</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Parsing</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Gloss</th>
                </tr>
              </thead>
              <tbody>
                {GREEK_PARSING.map((row, idx) => (
                  <tr key={idx} className="border-b border-grace/50 dark:border-dark-border/50 hover:bg-primary-light/10 dark:hover:bg-dark-bg/50">
                    <td className="p-3 text-scripture dark:text-sacred font-medium" lang="grc">{row.greek}</td>
                    <td className="p-3 italic text-ink-muted dark:text-ink-light">{row.transliteration}</td>
                    <td className="p-3 text-ink-muted dark:text-ink-light">{row.partOfSpeech}</td>
                    <td className="p-3 text-ink-muted dark:text-ink-light text-xs">{row.parsing}</td>
                    <td className="p-3 text-scripture dark:text-ink-light">{row.gloss}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Key Greek Terms Table */}
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-x-auto">
            <h3 className="text-lg font-bold text-scripture dark:text-white p-5 pb-3">Key Greek Terms in John 3:16</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary-light/30 dark:bg-dark-bg border-b border-grace dark:border-dark-border">
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Word</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Range of Meaning</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Significance in John 3:16</th>
                </tr>
              </thead>
              <tbody>
                {KEY_GREEK_TERMS.map((row, idx) => (
                  <tr key={idx} className="border-b border-grace/50 dark:border-dark-border/50 hover:bg-primary-light/10 dark:hover:bg-dark-bg/50">
                    <td className="p-3 text-scripture dark:text-sacred font-medium">{row.word}</td>
                    <td className="p-3 text-ink-muted dark:text-ink-light">{row.range}</td>
                    <td className="p-3 text-scripture dark:text-ink-light">{row.significance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-ink-muted dark:text-ink-light text-sm mt-4">
            Explore full word studies for the key terms above: <Link href="/greek-word/agapao" className="text-sacred hover:underline font-medium">agapaō (love)</Link>, <Link href="/greek-word/monogenes" className="text-sacred hover:underline font-medium">monogenēs (one and only)</Link>, <Link href="/greek-word/pisteuo" className="text-sacred hover:underline font-medium">pisteuō (believe)</Link>, and <Link href="/greek-word/apollymi" className="text-sacred hover:underline font-medium">apollymi (perish)</Link>. Each includes every NT occurrence, lexical range, and theological significance.
          </p>
        </section>

        {/* Clause-by-Clause Greek Analysis */}
        <section id="clause-1" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Clause 1: Οὕτως γὰρ ἠγάπησεν ὁ Θεὸς τὸν κόσμον</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm italic">&ldquo;For God so loved the world&rdquo;</p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
            <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
              The verse opens with an explanatory conjunction (<em>gar</em>, &ldquo;for&rdquo;) tying it directly to John 3:14-15 and the bronze serpent typology. This is not a standalone declaration &mdash; it is the <em>reason</em> the Son of Man must be lifted up.
            </p>
            <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
              The adverb <em>houtos</em> (&ldquo;in this way / so&rdquo;) is demonstrative, not merely intensive. It points to the <em>manner</em> of God&apos;s love: He loved the world <strong>in this specific way</strong> &mdash; by giving His Son. English readers often read &ldquo;so&rdquo; as &ldquo;so much,&rdquo; which captures the intensity but misses the specificity. The NLT&apos;s rendering (&ldquo;This is how God loved the world&rdquo;) is arguably closer to the Greek.
            </p>
            <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
              The verb <Link href="/greek-word/agapao" className="text-sacred hover:underline"><em>ēgapēsen</em></Link> is aorist active indicative &mdash; a completed, decisive action. God&apos;s love is not presented here as an ongoing emotional state but as a historic act that reached its apex at the cross. The aorist tense captures a love that <em>did something</em>.
            </p>
            <p className="text-scripture dark:text-ink-light leading-relaxed">
              The object, <em>ton kosmon</em> (&ldquo;the world&rdquo;), carries weight in John&apos;s vocabulary. John uses <em>kosmos</em> 78 times &mdash; more than any other New Testament author. In this Gospel, the world is simultaneously the object of God&apos;s love and the system that opposes Him (John 1:10, 15:18-19). God loves what resists Him. That is the scandal of <Link href="/topics/gods-love" className="text-sacred hover:underline">agape</Link>.
            </p>
          </div>
        </section>

        <section id="clause-2" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Clause 2: ὥστε τὸν υἱὸν τὸν μονογενῆ ἔδωκεν</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm italic">&ldquo;that he gave his only begotten Son&rdquo;</p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
            <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
              The conjunction <em>hōste</em> introduces a result clause: God&apos;s love <em>resulted in</em> giving. Love is not passive in this verse. It produces the costliest action in history. The gap between &ldquo;loved&rdquo; and &ldquo;gave&rdquo; is zero &mdash; love and sacrifice are inseparable.
            </p>
            <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
              The adjective <Link href="/greek-word/monogenes" className="text-sacred hover:underline"><em>monogenē</em></Link> has been the subject of centuries of translation debate. The KJV&apos;s &ldquo;only begotten&rdquo; derives from the Latin <em>unigenitus</em> and suggests origin. Modern lexicography, however, traces <em>monogenēs</em> to <em>monos</em> (only) + <em>genos</em> (kind/type), not <em>gennao</em> (to beget). The meaning is &ldquo;one of a kind, unique&rdquo; &mdash; not that Jesus was created but that no one else shares His category of existence. Hebrews 11:17 uses the same word for Isaac, who was not Abraham&apos;s only son but his unique, promised son.
            </p>
            <p className="text-scripture dark:text-ink-light leading-relaxed">
              The verb <em>edōken</em> (&ldquo;gave&rdquo;) is again aorist &mdash; a decisive, completed act. The word choice is striking: God did not <em>loan</em> His Son, <em>send</em> Him on an errand, or <em>offer</em> Him tentatively. He <em>gave</em> Him. The same verb appears in John 6:32 where God &ldquo;gives&rdquo; the true bread from heaven. In John&apos;s theology, divine giving is permanent and sacrificial.
            </p>
          </div>
        </section>

        <section id="clause-3" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Clause 3: ἵνα πᾶς ὁ πιστεύων εἰς αὐτὸν</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm italic">&ldquo;that whosoever believeth in him&rdquo;</p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
            <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
              The conjunction <em>hina</em> introduces a purpose clause: this is <em>why</em> God gave His Son. The purpose is not judgment (John 3:17 makes that explicit) but salvation for &ldquo;everyone believing.&rdquo;
            </p>
            <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
              The adjective <em>pas</em> (&ldquo;every, all&rdquo;) combined with the articular participle <em>ho pisteuōn</em> (&ldquo;the one believing&rdquo;) creates a universal offer with a personal condition: <strong>every single person who believes</strong>. No ethnic, social, or moral boundary limits the offer. But the participle is present tense &mdash; indicating ongoing, continuous belief, not a one-time mental assent that fades into nothing.
            </p>
            <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
              The preposition <em>eis</em> (&ldquo;into&rdquo;) is directional. Greek has multiple words for &ldquo;in&rdquo; &mdash; <em>en</em> (static, inside), <em>epi</em> (upon), and <em>eis</em> (into, toward). John chose <em>eis</em>, the word that implies <em>movement</em>. <Link href="/greek-word/pisteuo" className="text-sacred hover:underline">Biblical faith</Link> is not standing still and nodding. It is stepping forward and committing yourself &mdash; placing your trust <em>into</em> Christ.
            </p>
            <p className="text-scripture dark:text-ink-light leading-relaxed">
              This is why &ldquo;believe&rdquo; in John 3:16 cannot mean merely acknowledging facts. Demons acknowledge facts about God (<Link href="/cross-references/james/2/19" className="text-sacred hover:underline">James 2:19</Link>). <em>Pisteuōn eis</em> means entrusting yourself to someone &mdash; the way you trust a surgeon when you lie down on the operating table. You are not just agreeing that surgery works. You are putting your life in the surgeon&apos;s hands.
            </p>
          </div>
        </section>

        <section id="clause-4" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Clause 4: μὴ ἀπόληται ἀλλ&apos; ἔχῃ ζωὴν αἰώνιον</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm italic">&ldquo;should not perish, but have everlasting life&rdquo;</p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
            <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
              The negated subjunctive <em>mē apolētai</em> (&ldquo;should not perish&rdquo;) is a purpose clause: the <em>goal</em> of God&apos;s giving is to prevent perishing. The middle voice of <Link href="/greek-word/apollymi" className="text-sacred hover:underline"><em>apollymi</em></Link> is significant &mdash; it carries the sense of self-destruction. Sin does not simply trigger an external punishment. It ruins the sinner from within. Perishing is not God doing something <em>to</em> you. It is what happens when you remove yourself from the source of life.
            </p>
            <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
              The conjunction <em>alla</em> (&ldquo;but&rdquo;) is the strongest adversative in Greek. It does not mean &ldquo;however&rdquo; or &ldquo;on the other hand.&rdquo; It means &ldquo;on the <em>contrary</em>.&rdquo; The contrast is absolute: not perishing BUT eternal life. Two destinies, no middle ground, separated by one conjunction. The starkness is intentional.
            </p>
            <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
              The phrase <em>zōēn aiōnion</em> (&ldquo;life eternal&rdquo;) uses <em>zōē</em>, not <em>bios</em>. In Greek, <em>bios</em> refers to biological existence &mdash; the kind of life you share with plants and animals. <em>Zōē</em> refers to life in its fullest, richest sense &mdash; the kind of life God Himself possesses. And <em>aiōnios</em> means not just &ldquo;unending&rdquo; but &ldquo;belonging to the age to come&rdquo; &mdash; the quality of existence in God&apos;s eternal kingdom.
            </p>
            <p className="text-scripture dark:text-ink-light leading-relaxed">
              The verb <em>echē</em> (&ldquo;have, possess&rdquo;) is present subjunctive. The believer <em>has</em> eternal life as a present possession, not merely a future promise. Jesus confirmed this in <Link href="/cross-references/john/5/24" className="text-sacred hover:underline">John 5:24</Link>: &ldquo;He that heareth my word, and believeth on him that sent me, <strong>hath</strong> everlasting life, and shall not come into condemnation; but <strong>is passed</strong> from death unto life.&rdquo; The transfer is already complete.
            </p>
          </div>
        </section>

        {/* Alternative Translations */}
        <section id="alternative-translations" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Alternative Translations of John 3:16</h2>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
            <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
              Every translation is an interpretation. No English rendering can capture every nuance of the Greek simultaneously. Here are three alternative translations that highlight different aspects of the original text:
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-sacred pl-4">
                <p className="text-scripture dark:text-ink-light italic mb-1">&ldquo;For this is how God loved the world: He gave the Son, His one-and-only, so that every person trusting in Him would not be destroyed but would possess the life of the age to come.&rdquo;</p>
                <p className="text-xs text-ink-muted dark:text-ink-light"><strong>Emphasis:</strong> Manner of love (houtos), uniqueness (monogenēs), directional faith (pisteuōn eis), quality of life (zōēn aiōnion)</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <p className="text-scripture dark:text-ink-light italic mb-1">&ldquo;For God loved the world in this way: He gave His unique Son, so that anyone who keeps on believing in Him will not come to ruin but will have eternal life as a present reality.&rdquo;</p>
                <p className="text-xs text-ink-muted dark:text-ink-light"><strong>Emphasis:</strong> Present continuous belief (participle), present possession of life (echē), self-destruction in perishing (apollymi middle voice)</p>
              </div>
              <div className="border-l-4 border-amber-600 pl-4">
                <p className="text-scripture dark:text-ink-light italic mb-1">&ldquo;Because of this &mdash; because God loved the world so intensely &mdash; He gave the one-of-a-kind Son, with the result that every believer in Him escapes destruction and gains the life that belongs to God&apos;s eternal kingdom.&rdquo;</p>
                <p className="text-xs text-ink-muted dark:text-ink-light"><strong>Emphasis:</strong> Connection to preceding verses (gar), intensity and manner combined, kingdom eschatology (aiōnios)</p>
              </div>
            </div>
            <p className="text-scripture dark:text-ink-light leading-relaxed mt-4">
              No single rendering is &ldquo;right&rdquo; and the others &ldquo;wrong.&rdquo; The Greek carries all of these nuances simultaneously. Reading multiple translations side by side &mdash; as shown in the <a href="#translations" className="text-sacred hover:underline">comparison table above</a> &mdash; gives you a fuller picture than any one version can provide.
            </p>
          </div>
        </section>

        {/* Word-by-Word Study */}
        <section id="word-study" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Word-by-Word Study of John 3:16</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm">Every phrase carries weight. Here&apos;s what you&apos;re actually reading.</p>
          <div className="space-y-4">
            {WORD_STUDY.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-scripture text-white flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-scripture dark:text-white mb-1">{item.phrase}</h3>
                    <p className="text-xs text-sacred font-medium mb-2">Greek: <em>{item.greek}</em></p>
                    <p className="text-scripture dark:text-ink-light leading-relaxed text-sm">{item.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Theological Significance */}
        <section id="theological-significance" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Theological Significance: Five Doctrines in 26 Words</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-6">
            John 3:16 packs five major Christian doctrines into a single sentence. Theologians have spent lifetimes unpacking what Jesus communicated in 26 words. Here is a summary of each doctrine and how this verse teaches it.
          </p>

          {/* Five Doctrines Table */}
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm mb-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary-light/30 dark:bg-dark-bg border-b border-grace dark:border-dark-border">
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Doctrine</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Phrase in John 3:16</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">What It Teaches</th>
                </tr>
              </thead>
              <tbody>
                {FIVE_DOCTRINES.map((row, idx) => (
                  <tr key={idx} className="border-b border-grace/50 dark:border-dark-border/50">
                    <td className="p-3 font-medium text-scripture dark:text-white">{row.doctrine}</td>
                    <td className="p-3 text-scripture dark:text-sacred italic">{row.phrase}</td>
                    <td className="p-3 text-scripture dark:text-ink-light">{row.teaches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">The Scope of God&apos;s Love: What Does &ldquo;the World&rdquo; Mean?</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                &ldquo;The world&rdquo; (<em>ton kosmon</em>) is one of the most debated phrases in theology. Some traditions restrict it to the elect. Others expand it to mean every person who has ever lived. The most natural reading of John&apos;s usage is that God&apos;s love extends to the entire human race &mdash; not just Israel, not just the morally upright, but the whole rebellious, broken world.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                This does not mean every person is automatically saved. The verse contains a condition: &ldquo;whosoever believeth.&rdquo; The offer is universal. The application is conditional on faith. God loves the world broadly and saves believers specifically. Both truths are in the same verse, and both must be held together. For more on what the Bible teaches about <Link href="/topics/eternal-life" className="text-sacred hover:underline">eternal life</Link> and <Link href="/topics/gods-love" className="text-sacred hover:underline">God&apos;s love</Link>, see the linked studies.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">Grace vs. Works: The Definitive Statement</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                Notice what John 3:16 does NOT say. It does not say &ldquo;whosoever is good enough.&rdquo; It does not say &ldquo;whosoever performs the right rituals.&rdquo; It does not say &ldquo;whosoever belongs to the right ethnic group.&rdquo; The sole condition is belief &mdash; personal trust in the Son of God.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                This was radical in Nicodemus&apos;s world, where <Link href="/what-does-the-bible-say-about/salvation" className="text-sacred hover:underline">salvation</Link> was assumed to come through Torah observance, circumcision, and ethnic identity. Jesus dismantled that entire framework with one sentence. Salvation is a gift received by faith, not a wage earned by works (<Link href="/cross-references/ephesians/2/8" className="text-sacred hover:underline">Ephesians 2:8-9</Link>). That&apos;s what separates Christianity from every other religious system on earth.
              </p>
            </div>

            {/* Common Misreadings Table */}
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-x-auto">
              <h3 className="text-lg font-bold text-scripture dark:text-white p-5 pb-3">What John 3:16 Doesn&apos;t Say: Common Misreadings</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary-light/30 dark:bg-dark-bg border-b border-grace dark:border-dark-border">
                    <th className="text-left p-3 font-bold text-scripture dark:text-white">What People Think It Says</th>
                    <th className="text-left p-3 font-bold text-scripture dark:text-white">What It Actually Says</th>
                    <th className="text-left p-3 font-bold text-scripture dark:text-white">Why It Matters</th>
                  </tr>
                </thead>
                <tbody>
                  {COMMON_MISREADINGS.map((row, idx) => (
                    <tr key={idx} className="border-b border-grace/50 dark:border-dark-border/50">
                      <td className="p-3 text-red-700 dark:text-red-400">{row.thinks}</td>
                      <td className="p-3 text-green-700 dark:text-green-400">{row.actual}</td>
                      <td className="p-3 text-scripture dark:text-ink-light">{row.matters}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why John 3:16 Still Matters */}
        <section id="why-it-matters" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Why John 3:16 Still Matters</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">In a Post-Christian Culture</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                We live in a time when biblical literacy is at an all-time low. Most people under 30 cannot name the four Gospels. Church attendance has declined every decade since the 1960s. And yet &mdash; John 3:16 remains the most recognized verse in Western civilization. It shows up on protest signs, eye black strips at football games, and even in court testimony. The verse persists because its message addresses something no cultural shift can erase: the human need for love, meaning, and rescue from death. Post-Christian culture has not produced a replacement for the gospel. It has only produced more noise to drown it out. Paired with promises like <Link href="/romans-8-28" className="text-sacred hover:underline">Romans 8:28</Link> and <Link href="/jeremiah-29-11" className="text-sacred hover:underline">Jeremiah 29:11</Link>, John 3:16 anchors a worldview that suffering, confusion, and cultural shifts cannot shake.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">When Suffering Makes It Hard to Believe</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                &ldquo;If God loves the world, why did my child die?&rdquo; &ldquo;If God gave His Son, why won&apos;t He give me a cure?&rdquo; These are not abstract theological problems. They are real agony. And John 3:16 does not pretend they don&apos;t exist. What it does is point to the cross &mdash; where God Himself entered human suffering and died. The cross does not explain every tragedy. But it proves that God is not sitting in heaven untouched by pain. He gave His Son. He knows loss. And He promises that suffering is temporary, but eternal life is not. <Link href="/psalm-23" className="text-sacred hover:underline">Psalm 23</Link> captures this same truth: &ldquo;though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me.&rdquo;
              </p>
            </div>

            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">For the Person Who Grew Up Hearing It but Never Felt It</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                If you were raised in church, John 3:16 may feel like wallpaper &mdash; always there, never noticed. You can recite it from memory without its words touching your heart. That numbness is not proof that the verse is empty. It is proof that familiarity can be the greatest enemy of the most powerful words ever spoken. Read it again &mdash; slowly, as if you had never heard it. A God exists. He loves you. He proved it at unimaginable cost. And He is offering you everything. The question is not whether you know the verse. The question is whether you know the God behind it.
              </p>
            </div>
          </div>
        </section>

        {/* Ancient and Modern Application */}
        <section id="application" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Ancient and Modern Application of John 3:16</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">First-Century Application</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                For <Link href="/characters/nicodemus" className="text-sacred hover:underline">Nicodemus</Link> and his contemporaries, John 3:16 dismantled three deeply held assumptions. First, that salvation was ethnic &mdash; reserved for Israel as God&apos;s covenant people. &ldquo;The world&rdquo; shattered that boundary. Second, that the Messiah would come in power to judge the nations. God &ldquo;gave&rdquo; His Son not to condemn but to save. Third, that righteousness was earned through Torah observance. The sole condition is faith.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                In a world where Gentiles were considered unclean, where Samaritans were despised, and where tax collectors were social outcasts, &ldquo;whosoever&rdquo; was a word that leveled every hierarchy. The Pharisee and the prostitute stood on equal footing before the cross: both needed to believe; neither could earn what was freely offered.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                The early church took this seriously. Within a generation, the gospel had crossed every boundary the first-century world considered impassable &mdash; Jew to Gentile, slave to free, male to female (<Link href="/cross-references/galatians/3/28" className="text-sacred hover:underline">Galatians 3:28</Link>). John 3:16 was the theological engine behind that expansion.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">Twenty-First-Century Application</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                Modern barriers to faith look different from Nicodemus&apos;s, but they are equally real. Where first-century Jews struggled with ethnic exclusivism, twenty-first-century people struggle with relativism (&ldquo;all paths lead to God&rdquo;), scientism (&ldquo;only measurable things are real&rdquo;), and moral autonomy (&ldquo;I define my own truth&rdquo;). John 3:16 confronts all three.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                It confronts relativism by naming a specific Savior (&ldquo;his only Son&rdquo;), not a generic spiritual force. It confronts scientism by asserting realities that transcend measurement &mdash; love, sacrifice, eternal life. And it confronts moral autonomy by presenting a binary: believe and live, or refuse and perish. There is no third option in this verse.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                At the same time, John 3:16 meets modern people exactly where first-century people were met: with an unconditional offer. You do not need to clean up first. You do not need a theology degree. You do not need to understand the aorist tense. You need to trust Christ. The invitation that crossed the Roman Empire still crosses every barrier the modern world puts up. As <Link href="/philippians-4-13" className="text-sacred hover:underline">Paul discovered in prison</Link>, the gospel is never chained &mdash; even when its messengers are.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Study Links */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/characters/nicodemus" className="flex items-center gap-2 bg-white dark:bg-dark-surface rounded-lg p-3 border border-grace dark:border-dark-border hover:border-sacred/50 transition-colors shadow-sm">
            <span className="w-8 h-8 rounded-full bg-scripture text-white flex items-center justify-center text-sm font-bold shrink-0">N</span>
            <span className="text-sm font-medium text-scripture dark:text-white">Study Nicodemus</span>
          </Link>
          <Link href="/john-3-quiz" className="flex items-center gap-2 bg-white dark:bg-dark-surface rounded-lg p-3 border border-grace dark:border-dark-border hover:border-sacred/50 transition-colors shadow-sm">
            <span className="w-8 h-8 rounded-full bg-scripture text-white flex items-center justify-center text-sm font-bold shrink-0">Q</span>
            <span className="text-sm font-medium text-scripture dark:text-white">John 3 Full Quiz</span>
          </Link>
          <Link href="/bible-chapter-summaries/john/3" className="flex items-center gap-2 bg-white dark:bg-dark-surface rounded-lg p-3 border border-grace dark:border-dark-border hover:border-sacred/50 transition-colors shadow-sm">
            <span className="w-8 h-8 rounded-full bg-scripture text-white flex items-center justify-center text-sm font-bold shrink-0">S</span>
            <span className="text-sm font-medium text-scripture dark:text-white">John 3 Summary</span>
          </Link>
        </div>

        {/* The Hard Question — For Skeptics */}
        <section id="honest-questions" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Honest Questions People Ask</h2>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="font-bold text-scripture dark:text-white mb-2">&ldquo;If God loves the world, why is there so much suffering?&rdquo;</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed text-sm">
                Suffering entered the world through sin — humanity&apos;s choice to reject God (Genesis 3). God didn&apos;t cause it; we did. But John 3:16 shows His response: instead of abandoning a broken world, He entered it. Jesus suffered betrayal, injustice, torture, and death. God knows suffering firsthand. And He offers a future where &ldquo;God shall wipe away all tears from their eyes&rdquo; (Revelation 21:4). The cross doesn&apos;t explain all suffering — but it proves God hasn&apos;t left us alone in it.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-scripture dark:text-white mb-2">&ldquo;Why does it have to be about believing in Jesus? What about good people?&rdquo;</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed text-sm">
                <Link href="/characters/nicodemus" className="text-sacred hover:underline">Nicodemus</Link> was one of the most religiously educated, morally upright men alive — and Jesus told him he needed to be born again. The Bible&apos;s claim is that all people, regardless of how &ldquo;good&rdquo; they are, fall short of God&apos;s standard (<Link href="/cross-references/romans/3/23" className="text-sacred hover:underline">Romans 3:23</Link>). Salvation isn&apos;t about being good enough. It&apos;s about receiving a gift you could never earn. That&apos;s what makes it grace — &ldquo;not of works, lest any man should boast&rdquo; (<Link href="/cross-references/ephesians/2/9" className="text-sacred hover:underline">Ephesians 2:9</Link>).
              </p>
            </div>
            <div>
              <h3 className="font-bold text-scripture dark:text-white mb-2">&ldquo;What if I&apos;ve done too much wrong?&rdquo;</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed text-sm">
                The word &ldquo;whosoever&rdquo; exists specifically because of this question. It means <em>anyone</em> — no exceptions. The Apostle <Link href="/characters/paul" className="text-sacred hover:underline">Paul</Link> called himself the &ldquo;chief of sinners&rdquo; (<Link href="/cross-references/1-timothy/1/15" className="text-sacred hover:underline">1 Timothy 1:15</Link>) and said Jesus saved him to prove that no one is beyond reach. If &ldquo;whosoever&rdquo; doesn&apos;t include your story, it doesn&apos;t mean anything. But it does.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-scripture dark:text-white mb-2">&ldquo;Do I have to change my life to be saved?&rdquo;</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed text-sm">
                You don&apos;t have to fix yourself before coming to God — but you do have to be willing to turn. The Bible calls this <Link href="/what-does-the-bible-say-about/repentance" className="text-sacred hover:underline">repentance</Link>. Jesus said &ldquo;Repent, and believe the gospel&rdquo; (<Link href="/cross-references/mark/1/15" className="text-sacred hover:underline">Mark 1:15</Link>). Repentance isn&apos;t about becoming perfect overnight. It&apos;s an honest change of direction: admitting you&apos;ve been going your own way and choosing to follow God instead. You come as you are, but you don&apos;t stay as you are. God does the transforming — your job is to show up willing.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-scripture dark:text-white mb-2">&ldquo;Aren&apos;t all religions basically saying the same thing?&rdquo;</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed text-sm">
                John 3:16 makes a claim that no other religion makes: that the infinite God loved the world enough to sacrifice His own Son, and that salvation is received as a free gift through faith &mdash; not earned through works, meditation, moral improvement, or religious performance. Every other religious system tells you what you must do to reach God. Christianity says God reached down to you. That is a fundamental, irreconcilable difference.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-scripture dark:text-white mb-2">&ldquo;What happened to Nicodemus after this conversation?&rdquo;</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed text-sm">
                Nicodemus appears twice more in John&apos;s Gospel. In John 7:50-51, he speaks up in the Sanhedrin to defend Jesus&apos; right to a fair hearing &mdash; a courageous act that drew his colleagues&apos; contempt. Then in John 19:39-40, after the crucifixion, Nicodemus brings 75 pounds of myrrh and aloes to prepare Jesus&apos; body for burial &mdash; an extravagant, public act of devotion. The man who first came in darkness ended up caring for the body of the Light of the World. His story is one of the most beautiful arcs of growing faith in all of Scripture.
              </p>
            </div>
          </div>
        </section>

        {/* Cross-References */}
        <section id="cross-references" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Cross-References: 10 Verses That Reinforce John 3:16</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm">John 3:16 isn&apos;t a lone verse. The entire Bible points to this message.</p>
          <div className="space-y-3">
            {CROSS_REFERENCES.map((verse, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sacred/10 text-scripture dark:bg-scripture dark:text-sacred">{verse.theme}</span>
                  <Link href={verseRefToPath(verse.ref)} className="text-sm font-bold text-sacred hover:underline">— {verse.ref}</Link>
                </div>
                <p className="text-scripture dark:text-ink-light leading-relaxed italic mb-2">&ldquo;{verse.text}&rdquo;</p>
                <p className="text-ink-muted dark:text-ink-light text-sm">{verse.commentary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gospel CTA — For Non-Believers & Seekers */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-scripture via-scripture/95 to-scripture/80 rounded-xl p-8 md:p-10 text-white shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4 text-center">This Verse Is an Invitation</h2>
            <p className="text-sacred-light max-w-2xl mx-auto leading-relaxed mb-3 text-center">
              John 3:16 isn&apos;t information to file away. It&apos;s a question that requires an answer: <em>Will you repent and believe?</em>
            </p>
            <p className="text-sacred-light max-w-2xl mx-auto leading-relaxed mb-6 text-center">
              You don&apos;t need to understand everything. You don&apos;t need to fix yourself first. You just need to be honest with God about where you are and willing to turn toward Him. That turning — repentance — and that trust — faith — are how eternal life begins. If you want to take the next step:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/what-does-the-bible-say-about/salvation" className="inline-flex items-center justify-center bg-white text-scripture font-bold py-3 px-8 rounded-lg hover:bg-sacred-light transition-colors text-sm uppercase tracking-wider">
                How to Be Saved
              </Link>
              <Link href="/what-does-the-bible-say-about/repentance" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
                What the Bible Says About Repentance
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Frequently Asked Questions About John 3:16</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <details key={idx} className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border shadow-sm group">
                <summary className="p-5 cursor-pointer font-bold text-scripture dark:text-white text-lg flex items-center justify-between list-none">
                  <span>{item.question}</span>
                  <span className="text-sacred text-xl ml-4 shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-scripture dark:text-ink-light leading-relaxed border-t border-grace dark:border-dark-border pt-4">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Secondary CTA — Study Paths */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/john-3-quiz" className="bg-scripture hover:bg-ink-muted rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-sacred text-xs font-bold uppercase tracking-wider mb-2">60 Questions, 4 Difficulty Levels</p>
              <h3 className="text-xl font-bold mb-1">Complete John Chapter 3 Quiz</h3>
              <p className="text-sacred-light text-sm">Test everything from Nicodemus to born again to eternal life.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Quiz &rarr;</span>
            </Link>
            <Link href="/john-quiz" className="bg-scripture hover:bg-scripture/90 rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-sacred text-xs font-bold uppercase tracking-wider mb-2">25 Questions Covering All 21 Chapters</p>
              <h3 className="text-xl font-bold mb-1">Complete Gospel of John Quiz</h3>
              <p className="text-sacred-light text-sm">From &ldquo;In the beginning was the Word&rdquo; to the risen Christ.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Quiz &rarr;</span>
            </Link>
          </div>
        </section>

        {/* Internal Links Section */}
        <section id="continue" className="bg-primary-light/30 dark:bg-dark-surface/30 border border-grace dark:border-dark-border rounded-xl p-6 scroll-mt-20">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-4">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/john-3-quiz" className="text-sacred hover:underline text-sm">John Chapter 3 Quiz</Link>
            <Link href="/john-chapters" className="text-sacred hover:underline text-sm">All John Chapter Quizzes</Link>
            <Link href="/john-quiz" className="text-sacred hover:underline text-sm">Complete Gospel of John Quiz</Link>
            <Link href="/what-does-the-bible-say-about/salvation" className="text-sacred hover:underline text-sm">What the Bible Says About Salvation</Link>
            <Link href="/what-does-the-bible-say-about/repentance" className="text-sacred hover:underline text-sm">What the Bible Says About Repentance</Link>
            <Link href="/topics/born-again" className="text-sacred hover:underline text-sm">Bible Verses About Being Born Again</Link>
            <Link href="/topics/eternal-life" className="text-sacred hover:underline text-sm">Bible Verses About Eternal Life</Link>
            <Link href="/topics/gods-love" className="text-sacred hover:underline text-sm">Bible Verses About God&apos;s Love</Link>
            <Link href="/characters/nicodemus" className="text-sacred hover:underline text-sm">Nicodemus Character Study</Link>
            <Link href="/characters/john-apostle" className="text-sacred hover:underline text-sm">John the Apostle</Link>
            <Link href="/bible-chapter-summaries/john/3" className="text-sacred hover:underline text-sm">John Chapter 3 Summary</Link>
            <Link href="/bible-geography/john/3" className="text-sacred hover:underline text-sm">John 3 Places &amp; Map</Link>
            <Link href="/verses/john/3/16" className="text-sacred hover:underline text-sm">John 3:16 Verse Commentary</Link>
            <Link href="/greek-word/agapao" className="text-sacred hover:underline text-sm">Greek Word Study: Agapao</Link>
            <Link href="/greek-word/monogenes" className="text-sacred hover:underline text-sm">Greek Word Study: Monogenes</Link>
            <Link href="/greek-word/pisteuo" className="text-sacred hover:underline text-sm">Greek Word Study: Pisteuo</Link>
            <Link href="/psalm-23" className="text-sacred hover:underline text-sm">Psalm 23 Explained</Link>
            <Link href="/romans-8-28" className="text-sacred hover:underline text-sm">Romans 8:28 Explained</Link>
            <Link href="/jeremiah-29-11" className="text-sacred hover:underline text-sm">Jeremiah 29:11 Explained</Link>
            <Link href="/philippians-4-13" className="text-sacred hover:underline text-sm">Philippians 4:13 Explained</Link>
            <Link href="/proverbs-3-5-6" className="text-sacred hover:underline text-sm">Proverbs 3:5-6 Explained</Link>
            <Link href="/isaiah-41-10" className="text-sacred hover:underline text-sm">Isaiah 41:10 Explained</Link>
            <Link href="/cross-references/john/3/16" className="text-sacred hover:underline text-sm">John 3:16 Cross-References</Link>
            <Link href="/bible-topics/salvation" className="text-sacred hover:underline text-sm">Topical Study: Salvation</Link>
            <Link href="/bible-topics/eternal-life" className="text-sacred hover:underline text-sm">Topical Study: Eternal Life</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
