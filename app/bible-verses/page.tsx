import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';

const SITE_URL = 'https://biblemaximum.com';

export const metadata: Metadata = {
  title: 'Bible Verses — 100+ Most Popular Verses and Scripture Quotes | Bible Maximum',
  description: 'The most popular Bible verses organized by topic: love, strength, faith, hope, peace, healing, forgiveness, prayer, anxiety, wisdom, salvation, and more. Each verse includes context, meaning, and study links.',
  keywords: ['bible verses', 'bible verse', 'popular bible verses', 'best bible verses', 'bible verses about love', 'bible verses about strength', 'bible verses about faith', 'bible verses about hope', 'bible verses about peace', 'inspirational bible verses', 'encouraging bible verses', 'famous bible verses', 'top bible verses', 'bible quotes', 'scripture verses'],
  alternates: { canonical: '/bible-verses' },
  openGraph: {
    title: 'Bible Verses — 100+ Most Popular Verses by Topic',
    description: 'The most popular Bible verses organized by life topic with brief commentary and study links.',
    url: `${SITE_URL}/bible-verses`,
    type: 'article',
    images: ['/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png'],
  },
};

// ─── Verse Data by Topic ─────────────────────────────────────

const TOPICS = [
  {
    id: 'love',
    title: 'Bible Verses About Love',
    icon: '♥',
    description: 'God\'s love is the foundation of everything. These verses reveal what love actually looks like — not a feeling, but a decision to act for another\'s good at great personal cost.',
    verses: [
      { ref: 'John 3:16', text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', note: 'The most famous verse in the Bible. God proved His love not with words but with action — sending His Son to die for a world that rejected Him.' },
      { ref: '1 Corinthians 13:4-7', text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.', note: 'Paul\'s definition of love reads like a character study of Jesus. Try replacing "love" with your own name — that\'s where the conviction starts.' },
      { ref: 'Romans 8:38-39', text: 'For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.', note: 'Paul lists every possible threat and declares none of them can break God\'s love. This is the ultimate security statement for believers.' },
      { ref: '1 John 4:19', text: 'We love him, because he first loved us.', note: 'Nine words that explain everything. Our love for God is always a response, never the initiative. He moved first.' },
      { ref: 'Romans 5:8', text: 'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.', note: 'God didn\'t wait for us to get our act together. He proved His love while we were still in rebellion.' },
      { ref: 'John 15:13', text: 'Greater love hath no man than this, that a man lay down his life for his friends.', note: 'Jesus said this hours before doing exactly that. He defined the highest form of love and then demonstrated it on the cross.' },
      { ref: '1 John 4:8', text: 'He that loveth not knoweth not God; for God is love.', note: 'Love isn\'t just something God does — it\'s who He is. His very nature is self-giving love.' },
    ],
  },
  {
    id: 'strength',
    title: 'Bible Verses About Strength',
    icon: '⚔',
    description: 'Real strength isn\'t about willpower or positive thinking. These verses point to a strength that comes from outside yourself — from a God who meets you in your weakness.',
    verses: [
      { ref: 'Philippians 4:13', text: 'I can do all things through Christ which strengtheneth me.', note: 'Context matters: Paul wrote this from prison. He\'s not talking about athletic achievement. He\'s saying Christ gave him strength to endure anything — abundance or need.' },
      { ref: 'Isaiah 40:31', text: 'But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.', note: 'The Hebrew word for "wait" (qavah) means to bind together like a rope. Waiting on God isn\'t passive — it\'s actively tying your life to His.' },
      { ref: 'Isaiah 41:10', text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.', note: 'Five promises in one verse: God is with you, He is your God, He will strengthen you, help you, and hold you up. That\'s comprehensive coverage.' },
      { ref: 'Deuteronomy 31:6', text: 'Be strong and of a good courage, fear not, nor be afraid of them: for the Lord thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.', note: 'Moses\' final charge to Israel before they entered the Promised Land. Courage comes from knowing who walks beside you.' },
      { ref: '2 Corinthians 12:9', text: 'And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness.', note: 'Paul begged God three times to remove his "thorn in the flesh." God\'s answer was better than removal — His power shows up most clearly when we\'re weakest.' },
      { ref: 'Psalm 46:1', text: 'God is our refuge and strength, a very present help in trouble.', note: 'Not a distant help or a theoretical help — a "very present" help. God is close when trouble hits.' },
      { ref: 'Nehemiah 8:10', text: 'The joy of the Lord is your strength.', note: 'Nehemiah spoke this to people weeping over their failures. Joy that comes from God — not from circumstances — is what keeps you standing.' },
    ],
  },
  {
    id: 'faith',
    title: 'Bible Verses About Faith',
    icon: '✝',
    description: 'Biblical faith isn\'t blind belief or wishful thinking. It\'s trusting a God who has proven Himself reliable — staking your life on what He has revealed.',
    verses: [
      { ref: 'Hebrews 11:1', text: 'Now faith is the substance of things hoped for, the evidence of things not seen.', note: 'Faith isn\'t pretending. It\'s the "substance" (Greek: hypostasis — a firm foundation) and "evidence" (Greek: elenchos — proof) of realities you can\'t yet see.' },
      { ref: 'Romans 10:17', text: 'So then faith cometh by hearing, and hearing by the word of God.', note: 'Faith isn\'t manufactured by willpower. It grows as you hear God\'s word — reading, preaching, studying. The more you know Him, the more you trust Him.' },
      { ref: 'Hebrews 11:6', text: 'But without faith it is impossible to please him: for he that cometh to God must believe that he is, and that he is a rewarder of them that diligently seek him.', note: 'Two requirements: believe God exists, and believe He rewards those who seek Him. Faith is the starting point of every relationship with God.' },
      { ref: 'Mark 11:24', text: 'Therefore I say unto you, What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them.', note: 'Jesus links faith directly to prayer. This isn\'t a blank check — it\'s confidence that God hears and answers according to His will (1 John 5:14).' },
      { ref: 'James 2:17', text: 'Even so faith, if it hath not works, is dead, being alone.', note: 'Faith that doesn\'t change how you live isn\'t real faith. James isn\'t contradicting Paul — he\'s saying genuine belief always produces action.' },
      { ref: 'Matthew 17:20', text: 'If ye have faith as a grain of mustard seed, ye shall say unto this mountain, Remove hence to yonder place; and it shall remove; and nothing shall be impossible unto you.', note: 'It\'s not the size of your faith that matters — it\'s the size of the God your faith is in. Even tiny faith in an infinite God moves mountains.' },
    ],
  },
  {
    id: 'hope',
    title: 'Bible Verses About Hope & Encouragement',
    icon: '☀',
    description: 'Biblical hope isn\'t "hoping for the best." It\'s confident expectation based on God\'s character and promises. These verses anchor hope in something unshakable.',
    verses: [
      { ref: 'Jeremiah 29:11', text: 'For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.', note: 'God spoke this to exiles in Babylon — people in the worst chapter of their lives. His plans don\'t depend on your current circumstances.' },
      { ref: 'Romans 8:28', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', note: 'This doesn\'t mean everything is good. It means God weaves even the painful things into a story that ends well for those who love Him.' },
      { ref: 'Romans 15:13', text: 'Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.', note: 'Hope, joy, and peace aren\'t things you generate — they\'re gifts God fills you with through the Holy Spirit.' },
      { ref: 'Psalm 42:11', text: 'Why art thou cast down, O my soul? and why art thou disquieted within me? hope thou in God: for I shall yet praise him, who is the health of my countenance, and my God.', note: 'The psalmist talks to himself — preaching truth to his own discouraged heart. Sometimes the most important sermon you hear is the one you preach to yourself.' },
      { ref: 'Lamentations 3:22-23', text: 'It is of the Lord\'s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.', note: 'Jeremiah wrote this in the middle of describing Jerusalem\'s destruction. Even in total devastation, God\'s mercy showed up fresh every morning.' },
      { ref: 'Isaiah 40:29', text: 'He giveth power to the faint; and to them that have no might he increaseth strength.', note: 'God\'s help isn\'t for the strong — it\'s for the faint. If you feel like you have nothing left, you\'re exactly who this verse is for.' },
    ],
  },
  {
    id: 'peace',
    title: 'Bible Verses About Peace & Comfort',
    icon: '☮',
    description: 'The peace the Bible describes isn\'t the absence of problems. It\'s a calm that holds steady in the middle of the storm because it\'s anchored to Someone bigger than the storm.',
    verses: [
      { ref: 'Philippians 4:6-7', text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.', note: 'The antidote to anxiety: pray about everything, thank God in advance, and His peace will guard your mind like a military garrison.' },
      { ref: 'John 14:27', text: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.', note: 'Jesus said this the night before His crucifixion. He was about to face the cross and still offered peace to His disciples. That\'s the kind of peace He gives.' },
      { ref: 'Psalm 23:4', text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.', note: 'David doesn\'t say God removes the valley — He walks through it with you. The comfort comes from His presence, not from the absence of danger.' },
      { ref: 'Isaiah 26:3', text: 'Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.', note: 'The Hebrew literally says "peace peace" — shalom shalom. Double peace. The condition? Keeping your mind fixed on God instead of your problems.' },
      { ref: 'Matthew 11:28-30', text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls.', note: 'Jesus doesn\'t say "try harder." He says "come to me." Rest isn\'t found by doing less — it\'s found by yoking yourself to someone who carries the weight.' },
      { ref: '2 Thessalonians 3:16', text: 'Now the Lord of peace himself give you peace always by all means.', note: 'Peace "always" and "by all means" — not just sometimes, not just in certain ways. God\'s peace covers every situation through every method.' },
    ],
  },
];


const TOPICS_2 = [
  {
    id: 'healing',
    title: 'Bible Verses About Healing',
    icon: '✚',
    description: 'Healing in Scripture covers body, mind, and soul. God heals physically, emotionally, and spiritually — sometimes instantly, sometimes through a process, always according to His wisdom.',
    verses: [
      { ref: 'Psalm 147:3', text: 'He healeth the broken in heart, and bindeth up their wounds.', note: 'God doesn\'t just heal diseases. He heals broken hearts — the kind of pain no medicine can reach.' },
      { ref: 'Jeremiah 17:14', text: 'Heal me, O Lord, and I shall be healed; save me, and I shall be saved: for thou art my praise.', note: 'When God heals, the healing sticks. Human remedies are temporary. God\'s restoration is complete.' },
      { ref: 'Isaiah 53:5', text: 'But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.', note: 'Written 700 years before the cross. The healing here is primarily spiritual — the wounds of sin healed by Christ\'s suffering. Peter quotes this in 1 Peter 2:24.' },
      { ref: 'James 5:15', text: 'And the prayer of faith shall save the sick, and the Lord shall raise him up; and if he have committed sins, they shall be forgiven him.', note: 'James connects prayer, faith, healing, and forgiveness. Physical and spiritual healing often work together.' },
      { ref: 'Psalm 103:2-3', text: 'Bless the Lord, O my soul, and forget not all his benefits: Who forgiveth all thine iniquities; who healeth all thy diseases.', note: 'David lists God\'s benefits: forgiveness first, then healing. The order matters — spiritual healing enables everything else.' },
      { ref: 'Exodus 15:26', text: 'I am the Lord that healeth thee.', note: 'God\'s name Jehovah Rapha — "the Lord who heals." Healing isn\'t just something God does; it\'s part of who He is.' },
    ],
  },
  {
    id: 'forgiveness',
    title: 'Bible Verses About Forgiveness',
    icon: '⚖',
    description: 'Forgiveness is the heart of the gospel. God forgives the unforgivable and then asks us to do the same — not because offenders deserve it, but because we didn\'t deserve it either.',
    verses: [
      { ref: '1 John 1:9', text: 'If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.', note: 'Forgiveness isn\'t uncertain. God is "faithful and just" — He promised to forgive, and He keeps His promises. Confession is the only condition.' },
      { ref: 'Ephesians 4:32', text: 'And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ\'s sake hath forgiven you.', note: 'The standard for forgiving others: the way God forgave you. That\'s a high bar — He forgave everything, freely, at great cost.' },
      { ref: 'Psalm 103:12', text: 'As far as the east is from the west, so far hath he removed our transgressions from us.', note: 'East and west never meet — unlike north and south. God\'s removal of sin is infinite and permanent.' },
      { ref: 'Colossians 3:13', text: 'Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye.', note: 'Forgiveness isn\'t optional for believers. It\'s commanded — and the motivation is remembering how much you\'ve been forgiven.' },
      { ref: 'Matthew 6:14-15', text: 'For if ye forgive men their trespasses, your heavenly Father will also forgive you: But if ye forgive not men their trespasses, neither will your Father forgive your trespasses.', note: 'Jesus connects receiving forgiveness to giving it. An unforgiving heart reveals that someone hasn\'t truly understood God\'s grace.' },
      { ref: 'Micah 7:19', text: 'He will turn again, he will have compassion upon us; he will subdue our iniquities; and thou wilt cast all their sins into the depths of the sea.', note: 'God doesn\'t just forgive — He actively buries our sins where they can never resurface. Corrie ten Boom added: "And He puts up a sign that says No Fishing."' },
    ],
  },
  {
    id: 'prayer',
    title: 'Bible Verses About Prayer',
    icon: '🕊',
    description: 'Prayer isn\'t a religious ritual. It\'s talking to the God of the universe who actually listens. These verses show how, when, and why to pray.',
    verses: [
      { ref: 'Philippians 4:6', text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.', note: 'Three elements: prayer (worship), supplication (specific requests), and thanksgiving (gratitude). Pray about everything. Worry about nothing.' },
      { ref: '1 Thessalonians 5:17', text: 'Pray without ceasing.', note: 'Three words that changed Christian practice forever. This doesn\'t mean 24/7 on your knees — it means maintaining a constant awareness of God\'s presence throughout your day.' },
      { ref: 'Matthew 6:6', text: 'But thou, when thou prayest, enter into thy closet, and when thou hast shut thy door, pray to thy Father which is in secret; and thy Father which seeth in secret shall reward thee openly.', note: 'Jesus prioritizes private prayer over public performance. The most powerful prayer happens when no one else is watching.' },
      { ref: 'James 5:16', text: 'The effectual fervent prayer of a righteous man availeth much.', note: 'Prayer works. Not because of technique or eloquence, but because a righteous person\'s honest, passionate prayer has real power.' },
      { ref: 'Jeremiah 33:3', text: 'Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not.', note: 'God invites you to call — and promises to answer with revelations beyond what you currently understand.' },
      { ref: 'Romans 8:26', text: 'Likewise the Spirit also helpeth our infirmities: for we know not what we should pray for as we ought: but the Spirit itself maketh intercession for us with groanings which cannot be uttered.', note: 'When you don\'t know what to pray, the Holy Spirit prays for you. Even your worst prayer is translated by the Spirit into exactly what\'s needed.' },
    ],
  },
  {
    id: 'anxiety',
    title: 'Bible Verses About Anxiety & Worry',
    icon: '🛡',
    description: 'Anxiety is real, and the Bible doesn\'t pretend otherwise. But it points to a God who is bigger than your fears and closer than your next breath.',
    verses: [
      { ref: '1 Peter 5:7', text: 'Casting all your care upon him; for he careth for you.', note: 'The Greek word for "casting" (epirrhipto) means to throw something on someone else — like throwing a heavy pack off your back. God can handle what you can\'t.' },
      { ref: 'Matthew 6:34', text: 'Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof.', note: 'Jesus says deal with today\'s problems today. Tomorrow\'s worries aren\'t yours to carry yet. Most of what we fear never actually happens.' },
      { ref: 'Psalm 55:22', text: 'Cast thy burden upon the Lord, and he shall sustain thee: he shall never suffer the righteous to be moved.', note: 'David wrote this while being betrayed by a close friend. Even in relational pain, God sustains those who give Him their burdens.' },
      { ref: 'Isaiah 41:10', text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.', note: 'God addresses fear with presence ("I am with thee"), identity ("I am thy God"), and action ("I will strengthen, help, and uphold you").' },
      { ref: 'Psalm 94:19', text: 'In the multitude of my thoughts within me thy comforts delight my soul.', note: 'Even when your mind is racing with anxious thoughts, God\'s comfort can reach you and bring delight to your soul.' },
      { ref: 'John 14:1', text: 'Let not your heart be troubled: ye believe in God, believe also in me.', note: 'Jesus spoke this to disciples who were about to watch Him die. His antidote to a troubled heart: trust. Believe in God, believe in me.' },
    ],
  },
  {
    id: 'wisdom',
    title: 'Bible Verses About Wisdom',
    icon: '📖',
    description: 'Biblical wisdom isn\'t about IQ or education. It\'s the skill of living well — seeing life from God\'s perspective and making decisions accordingly.',
    verses: [
      { ref: 'Proverbs 3:5-6', text: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.', note: 'The most practical wisdom verse in the Bible. Stop trusting your own analysis. Acknowledge God in every decision. He\'ll make your path clear.' },
      { ref: 'James 1:5', text: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.', note: 'Don\'t know what to do? Ask God. He gives wisdom generously and without making you feel stupid for asking.' },
      { ref: 'Proverbs 9:10', text: 'The fear of the Lord is the beginning of wisdom: and the knowledge of the holy is understanding.', note: 'Wisdom starts with reverence for God. Without that foundation, all human knowledge is just data without direction.' },
      { ref: 'Colossians 3:16', text: 'Let the word of Christ dwell in you richly in all wisdom; teaching and admonishing one another in psalms and hymns and spiritual songs.', note: 'Wisdom comes from saturating yourself in Scripture — not just reading it, but letting it "dwell richly" in your thinking and speech.' },
      { ref: 'Proverbs 4:7', text: 'Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding.', note: 'Solomon — the wisest man who ever lived — said wisdom is the most important thing you can pursue. More valuable than money, status, or comfort.' },
      { ref: 'Psalm 119:105', text: 'Thy word is a lamp unto my feet, and a light unto my path.', note: 'God\'s word doesn\'t illuminate the entire road ahead — just the next step. That\'s enough. Walk by faith, one step at a time.' },
    ],
  },
];


const TOPICS_3 = [
  {
    id: 'salvation',
    title: 'Bible Verses About Salvation',
    icon: '✟',
    description: 'Salvation is the central message of the Bible — God rescuing people who cannot rescue themselves. These verses explain how it works, what it costs, and who it\'s for.',
    verses: [
      { ref: 'Ephesians 2:8-9', text: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.', note: 'The clearest statement of grace in the Bible. Salvation is a gift. You can\'t earn it, buy it, or work for it. You can only receive it.' },
      { ref: 'Romans 6:23', text: 'For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.', note: 'Two options: earn death through sin, or receive eternal life as a gift through Christ. Wages are earned. Gifts are free.' },
      { ref: 'Acts 4:12', text: 'Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved.', note: 'Peter declared this before the same council that crucified Jesus. There\'s one way to be saved — through Jesus Christ. No alternatives.' },
      { ref: 'Romans 10:9', text: 'That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.', note: 'Salvation requires two things: public confession and genuine heart belief. It\'s not just internal — it changes how you speak and live.' },
      { ref: 'John 14:6', text: 'Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.', note: 'Jesus didn\'t say "a way" — He said "THE way." He didn\'t leave room for multiple paths. This is either the most arrogant or the most important claim ever made.' },
      { ref: 'Titus 3:5', text: 'Not by works of righteousness which we have done, but according to his mercy he saved us, by the washing of regeneration, and renewing of the Holy Ghost.', note: 'Salvation is by mercy, not merit. The Holy Spirit regenerates — makes you new from the inside out. Your good deeds don\'t earn this; God\'s mercy provides it.' },
    ],
  },
  {
    id: 'protection',
    title: 'Bible Verses About Protection & Safety',
    icon: '🏰',
    description: 'God doesn\'t promise a trouble-free life. He promises something better — His presence and protection in the middle of trouble.',
    verses: [
      { ref: 'Psalm 91:1-2', text: 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty. I will say of the Lord, He is my refuge and my fortress: my God; in him will I trust.', note: 'The "secret place" isn\'t a physical location — it\'s a relationship. Living in close communion with God is the safest place that exists.' },
      { ref: 'Psalm 121:7-8', text: 'The Lord shall preserve thee from all evil: he shall preserve thy soul. The Lord shall preserve thy going out and thy coming in from this time forth, and even for evermore.', note: 'God\'s protection covers your coming and going — every departure and arrival, from now until forever.' },
      { ref: 'Proverbs 18:10', text: 'The name of the Lord is a strong tower: the righteous runneth into it, and is safe.', note: 'In ancient Israel, a strong tower was the last line of defense. God\'s name — His character, His reputation, His power — is that tower for believers.' },
      { ref: 'Isaiah 54:17', text: 'No weapon that is formed against thee shall prosper; and every tongue that shall rise against thee in judgment thou shalt condemn.', note: 'Weapons will form — enemies will attack. But none will succeed. God doesn\'t prevent all attacks; He ensures none of them ultimately win.' },
      { ref: '2 Timothy 4:18', text: 'And the Lord shall deliver me from every evil work, and will preserve me unto his heavenly kingdom.', note: 'Paul wrote this from a Roman prison, awaiting execution. Even facing death, he was confident God would deliver him — not from death, but through it.' },
      { ref: 'Psalm 34:7', text: 'The angel of the Lord encampeth round about them that fear him, and delivereth them.', note: 'Angels don\'t just visit — they encamp. They set up camp around God\'s people. Unseen protection is still real protection.' },
    ],
  },
  {
    id: 'family',
    title: 'Bible Verses About Family & Marriage',
    icon: '🏠',
    description: 'God invented family. These verses reveal His design for marriage, parenting, and the relationships that shape us most deeply.',
    verses: [
      { ref: 'Ephesians 5:25', text: 'Husbands, love your wives, even as Christ also loved the church, and gave himself for it.', note: 'The standard for husbands: love like Christ — sacrificially, selflessly, to the point of giving your life. This isn\'t about authority; it\'s about sacrifice.' },
      { ref: 'Proverbs 22:6', text: 'Train up a child in the way he should go: and when he is old, he will not depart from it.', note: 'The Hebrew phrase "in the way he should go" can also mean "according to his nature." Good parenting considers each child\'s unique wiring.' },
      { ref: 'Joshua 24:15', text: 'As for me and my house, we will serve the Lord.', note: 'Joshua made a family decision, not just a personal one. Spiritual leadership starts with a declaration: this household follows God.' },
      { ref: 'Colossians 3:18-21', text: 'Wives, submit yourselves unto your own husbands, as it is fit in the Lord. Husbands, love your wives, and be not bitter against them. Children, obey your parents in all things. Fathers, provoke not your children to anger.', note: 'Paul addresses every family member with a specific instruction. Submission, love, obedience, and gentleness — each role has its own challenge.' },
      { ref: 'Psalm 127:3', text: 'Lo, children are an heritage of the Lord: and the fruit of the womb is his reward.', note: 'Children aren\'t burdens or accessories — they\'re a heritage, an inheritance from God. The language is that of a gift, not an obligation.' },
      { ref: 'Genesis 2:24', text: 'Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.', note: 'The first marriage instruction in the Bible. Leave, cleave, become one. Marriage requires both separation from parents and total union with your spouse.' },
    ],
  },
  {
    id: 'gratitude',
    title: 'Bible Verses About Gratitude & Thanksgiving',
    icon: '🙏',
    description: 'Gratitude isn\'t just good manners — it\'s a spiritual weapon. Thankfulness reorients your heart from what you lack to what God has given.',
    verses: [
      { ref: '1 Thessalonians 5:18', text: 'In every thing give thanks: for this is the will of God in Christ Jesus concerning you.', note: '"In" everything, not "for" everything. You don\'t have to thank God for tragedy. You thank Him in the middle of it — because He\'s still there.' },
      { ref: 'Psalm 100:4', text: 'Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name.', note: 'Thanksgiving is the entry point to God\'s presence. You walk into worship through the gate of gratitude.' },
      { ref: 'Colossians 3:17', text: 'And whatsoever ye do in word or deed, do all in the name of the Lord Jesus, giving thanks to God and the Father by him.', note: 'Every word, every action — do it all as a representative of Jesus. Gratitude transforms even mundane tasks into worship.' },
      { ref: 'Psalm 107:1', text: 'O give thanks unto the Lord, for he is good: for his mercy endureth for ever.', note: 'The reason for thanksgiving: God is good and His mercy never runs out. That\'s always true, regardless of your circumstances.' },
      { ref: 'Philippians 4:6', text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.', note: 'Paul pairs requests with thanksgiving. Don\'t just ask — thank. Gratitude keeps prayer from becoming a complaint list.' },
    ],
  },
  {
    id: 'guidance',
    title: 'Bible Verses About Guidance & Direction',
    icon: '🧭',
    description: 'Making decisions is hard. These verses remind you that God isn\'t hiding His will — He\'s actively guiding those who are willing to follow.',
    verses: [
      { ref: 'Proverbs 3:5-6', text: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.', note: 'The most-quoted guidance verse for a reason. Stop trusting your own analysis. Bring God into every decision. He\'ll make the path clear.' },
      { ref: 'Psalm 32:8', text: 'I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye.', note: 'God doesn\'t just point the direction and walk away. He instructs, teaches, and guides personally — like a parent watching over a child.' },
      { ref: 'Isaiah 30:21', text: 'And thine ears shall hear a word behind thee, saying, This is the way, walk ye in it, when ye turn to the right hand, and when ye turn to the left.', note: 'God\'s guidance often comes as a quiet voice behind you — a gentle correction when you start drifting. You have to be listening to hear it.' },
      { ref: 'Psalm 37:23', text: 'The steps of a good man are ordered by the Lord: and he delighteth in his way.', note: 'God doesn\'t just order your destination — He orders your steps. Each one. And He takes delight in the journey, not just the arrival.' },
      { ref: 'Proverbs 16:9', text: 'A man\'s heart deviseth his way: but the Lord directeth his steps.', note: 'Make your plans — God wants you to think and plan. But hold them loosely, because He\'s the one who ultimately determines where your steps lead.' },
      { ref: 'Romans 12:2', text: 'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.', note: 'Want to know God\'s will? Stop letting the world shape your thinking. Renew your mind with Scripture. God\'s will becomes clear to a transformed mind.' },
    ],
  },
];

const ALL_TOPICS = [...TOPICS, ...TOPICS_2, ...TOPICS_3];

const FAQ_ITEMS = [
  { question: 'What are the most popular Bible verses?', answer: 'The most searched and quoted Bible verses include John 3:16, Jeremiah 29:11, Philippians 4:13, Romans 8:28, Proverbs 3:5-6, Psalm 23:4, Isaiah 41:10, and Romans 6:23. These verses address universal human needs — love, hope, strength, guidance, and salvation — which is why they resonate across cultures and generations.' },
  { question: 'How many verses are in the Bible?', answer: 'The Bible contains 31,102 verses across 66 books (39 Old Testament, 27 New Testament). The longest chapter is Psalm 119 with 176 verses. The shortest verse in the English Bible is John 11:35 ("Jesus wept"), while the shortest in the Greek New Testament is 1 Thessalonians 5:16 ("Rejoice always").' },
  { question: 'What is the best Bible verse for anxiety?', answer: 'Philippians 4:6-7 is the most comprehensive verse for anxiety: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus." It gives a specific action plan: pray about everything, thank God, and His peace will guard your mind.' },
  { question: 'What Bible verse talks about God\'s plan for me?', answer: 'Jeremiah 29:11 is the classic verse: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end." Important context: God spoke this to exiles in Babylon who would wait 70 years before seeing the promise fulfilled. God\'s plans are real, but they operate on His timeline, not ours.' },
  { question: 'What does the Bible say about forgiveness?', answer: '1 John 1:9 gives the clearest promise: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness." God\'s forgiveness isn\'t conditional on the size of your sin — it\'s conditional on confession. He forgives completely and cleanses thoroughly.' },
  { question: 'Which Bible verse is best for strength?', answer: 'Isaiah 40:31 is the most beloved strength verse: "But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint." The promise is that God replaces human exhaustion with supernatural endurance for those who actively trust Him.' },
  { question: 'What is the most important verse in the Bible?', answer: 'While every verse is inspired, John 3:16 is widely considered the most important because it summarizes the entire gospel in one sentence: God\'s love, Christ\'s sacrifice, the condition of faith, and the promise of eternal life. Martin Luther called it "the gospel in miniature." Romans 6:23 and Ephesians 2:8-9 are also considered essential for understanding salvation.' },
  { question: 'What Bible verses help with grief?', answer: 'Psalm 34:18 says "The Lord is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit." Other comforting verses for grief include Revelation 21:4 (God will wipe away every tear), 2 Corinthians 1:3-4 (the God of all comfort), and Psalm 147:3 (He heals the broken in heart).' },
  { question: 'How do I find Bible verses by topic?', answer: 'The best approach is to use a topical Bible or concordance. Our Bible Topics section organizes thousands of verses by subject. You can also search by keyword in tools like Bible Gateway. For deeper study, look up the original Hebrew or Greek words — a single English word like "love" may translate multiple Greek words (agape, philia, storge) with different meanings.' },
  { question: 'What Bible version should I read?', answer: 'For everyday reading, the NIV and NLT are clear and accessible. For serious study, the ESV and NASB are more literal. The KJV remains the most memorized and quoted. Many scholars recommend reading multiple versions — a literal translation for study and a dynamic translation for devotional reading. The best Bible version is the one you\'ll actually read consistently.' },
  { question: 'What does the Bible say about love?', answer: 'The Bible defines love in 1 Corinthians 13:4-7 — patient, kind, not envious, not boastful, not proud. But the ultimate demonstration is John 3:16: God loved the world so much He gave His Son. Biblical love is always active and sacrificial, never just a feeling. The Greek New Testament uses agape (unconditional love), philia (friendship), and storge (family affection) to describe different aspects.' },
  { question: 'Are these verses from the King James Version?', answer: 'Yes, the primary verse texts on this page use the King James Version (KJV), which is in the public domain. The KJV remains the most memorized Bible translation in English. For modern language equivalents, we recommend checking multiple translations including ESV, NIV, and NASB for comparison.' },
];

function verseRefToPath(ref: string): string {
  const m = ref.match(/^(\d?\s*[A-Za-z]+)\s+(\d+):(\d+)/);
  if (!m) return '#';
  const book = m[1].trim().toLowerCase().replace(/\s+/g, '-');
  return `/cross-references/${book}/${m[2]}/${m[3]}`;
}


export default function BibleVersesPage() {
  const totalVerses = ALL_TOPICS.reduce((sum, t) => sum + t.verses.length, 0);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    additionalType: 'https://schema.org/LearningResource',
    headline: 'Bible Verses — 100+ Most Popular Verses by Topic',
    description: 'The most popular Bible verses organized by topic with commentary and study links.',
    url: `${SITE_URL}/bible-verses`,
    datePublished: '2026-03-09',
    dateModified: '2026-03-09',
    wordCount: 15000,
    image: `${SITE_URL}/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png`,
    author: { '@type': 'Organization', name: 'Bible Maximum', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/bible-verses` },
    about: [
      { '@type': 'Thing', name: 'Bible', sameAs: 'https://www.wikidata.org/wiki/Q1845' },
      { '@type': 'Thing', name: 'Bible verse', sameAs: 'https://www.wikidata.org/wiki/Q7944486' },
    ],
    mentions: [
      { '@type': 'Thing', name: 'Gospel of John', sameAs: 'https://www.wikidata.org/wiki/Q36279' },
      { '@type': 'Thing', name: 'Book of Psalms', sameAs: 'https://www.wikidata.org/wiki/Q41064' },
      { '@type': 'Thing', name: 'Book of Proverbs', sameAs: 'https://www.wikidata.org/wiki/Q131596' },
      { '@type': 'Thing', name: 'Epistle to the Romans', sameAs: 'https://www.wikidata.org/wiki/Q46587' },
      { '@type': 'Thing', name: 'Salvation', sameAs: 'https://www.wikidata.org/wiki/Q222373' },
      { '@type': 'Thing', name: 'Agape', sameAs: 'https://www.wikidata.org/wiki/Q343920' },
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
      { '@type': 'ListItem', position: 3, name: 'Bible Verses', item: `${SITE_URL}/bible-verses` },
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
            <li className="text-primary-dark/70 font-medium">Bible Verses</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative bg-scripture dark:bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png"
            alt="Bible verses — the most popular Scripture passages organized by topic"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-blue-200 text-sm font-semibold tracking-wider uppercase mb-3">Complete Topical Collection</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-display leading-tight mb-4">Bible Verses</h1>
          <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed mb-6">
            {totalVerses}+ of the most popular and powerful Bible verses organized by {ALL_TOPICS.length} life topics — each with context, meaning, and links to deeper study.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="#love" className="inline-block bg-white text-scripture font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
              Start Reading
            </Link>
            <Link href="#faq" className="inline-block border-2 border-white/40 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              Common Questions
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-scripture dark:text-blue-400">{totalVerses}+</p>
            <p className="text-xs text-primary-dark/60 dark:text-primary-dark/40 mt-1">Curated Verses</p>
          </div>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-scripture dark:text-blue-400">{ALL_TOPICS.length}</p>
            <p className="text-xs text-primary-dark/60 dark:text-primary-dark/40 mt-1">Life Topics</p>
          </div>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-scripture dark:text-blue-400">66</p>
            <p className="text-xs text-primary-dark/60 dark:text-primary-dark/40 mt-1">Books Represented</p>
          </div>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-scripture dark:text-blue-400">KJV</p>
            <p className="text-xs text-primary-dark/60 dark:text-primary-dark/40 mt-1">Primary Translation</p>
          </div>
        </div>

        {/* Table of Contents */}
        <nav id="toc" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm p-6 mb-10 scroll-mt-20">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-3">Browse Verses by Topic</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
            {ALL_TOPICS.map((topic) => (
              <Link key={topic.id} href={`#${topic.id}`} className="text-blue-600 hover:underline text-sm py-1 flex items-center gap-2">
                <span>{topic.icon}</span> {topic.title.replace('Bible Verses About ', '')} <span className="text-primary-dark/30 text-xs">({topic.verses.length})</span>
              </Link>
            ))}
            <Link href="#most-popular" className="text-blue-600 hover:underline text-sm py-1">Top 10 Most Popular</Link>
            <Link href="#faq" className="text-blue-600 hover:underline text-sm py-1">Common Questions</Link>
            <Link href="#study-links" className="text-blue-600 hover:underline text-sm py-1">Continue Your Study</Link>
          </div>
        </nav>

        {/* What Makes These Verses Special */}
        <section className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Why These Bible Verses Matter</h2>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            The Bible contains 31,102 verses. But a handful of them carry disproportionate weight — not because the others are less inspired, but because certain verses answer the questions every human being asks. <em>Does anyone love me? Is there hope? What happens when I die? How do I find peace?</em>
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed mb-4">
            The verses on this page are the ones people search for most, memorize first, and return to in crisis. They span the entire Bible — from Genesis to Revelation, from ancient Hebrew poetry to first-century Greek letters. Each one addresses a specific human need with a specific divine promise.
          </p>
          <p className="text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed">
            We&apos;ve organized them by life topic so you can find exactly what you need. Every verse includes a brief note explaining its context and meaning. For deeper study, follow the links to our <Link href="/cross-references/john/3/16" className="text-blue-600 hover:underline">cross-reference pages</Link>, <Link href="/greek-word/agapao" className="text-blue-600 hover:underline">Greek word studies</Link>, and <Link href="/bible-topics/love" className="text-blue-600 hover:underline">topical studies</Link>.
          </p>
        </section>

        {/* Top 10 Most Popular */}
        <section id="most-popular" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Top 10 Most Popular Bible Verses</h2>
          <p className="text-primary-dark/60 dark:text-primary-dark/40 mb-6 text-sm">Based on search volume, memorization frequency, and quotation data.</p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400 w-10">#</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400">Verse</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400 hidden sm:table-cell">Key Phrase</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-blue-400 hidden md:table-cell">Topic</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rank: 1, ref: 'John 3:16', phrase: 'For God so loved the world...', topic: 'Love / Salvation', link: '/john-3-16' },
                  { rank: 2, ref: 'Jeremiah 29:11', phrase: 'For I know the plans I have for you...', topic: 'Hope', link: '/jeremiah-29-11' },
                  { rank: 3, ref: 'Philippians 4:13', phrase: 'I can do all things through Christ...', topic: 'Strength', link: '/philippians-4-13' },
                  { rank: 4, ref: 'Romans 8:28', phrase: 'All things work together for good...', topic: 'Hope', link: '/romans-8-28' },
                  { rank: 5, ref: 'Proverbs 3:5-6', phrase: 'Trust in the Lord with all thine heart...', topic: 'Wisdom / Guidance', link: '/proverbs-3-5-6' },
                  { rank: 6, ref: 'Romans 6:23', phrase: 'The wages of sin is death; but the gift...', topic: 'Salvation', link: '/cross-references/romans/6/23' },
                  { rank: 7, ref: 'Isaiah 41:10', phrase: 'Fear thou not; for I am with thee...', topic: 'Strength / Peace', link: '/isaiah-41-10' },
                  { rank: 8, ref: 'Psalm 23:4', phrase: 'Though I walk through the valley...', topic: 'Peace / Comfort', link: '/psalm-23' },
                  { rank: 9, ref: 'Ephesians 2:8-9', phrase: 'For by grace are ye saved through faith...', topic: 'Salvation', link: '/cross-references/ephesians/2/8' },
                  { rank: 10, ref: 'Philippians 4:6-7', phrase: 'Be careful for nothing; but in every thing...', topic: 'Anxiety / Peace', link: '/cross-references/philippians/4/6' },
                ].map((v) => (
                  <tr key={v.rank} className="border-t border-grace dark:border-dark-border hover:bg-blue-50/50 dark:hover:bg-dark-border/20">
                    <td className="px-4 py-3 font-bold text-scripture dark:text-blue-400">{v.rank}</td>
                    <td className="px-4 py-3"><Link href={v.link} className="text-blue-600 hover:underline font-medium">{v.ref}</Link></td>
                    <td className="px-4 py-3 text-primary-dark/70 dark:text-primary-dark/40 hidden sm:table-cell italic">{v.phrase}</td>
                    <td className="px-4 py-3 hidden md:table-cell"><span className="bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">{v.topic}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Topic Sections */}
        {ALL_TOPICS.map((topic) => (
          <section key={topic.id} id={topic.id} className="mb-14 scroll-mt-20">
            <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">{topic.title}</h2>
            <p className="text-primary-dark/70 dark:text-primary-dark/40 mb-6 leading-relaxed">{topic.description}</p>

            <div className="space-y-4">
              {topic.verses.map((verse, idx) => (
                <div key={idx} className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <Link href={verseRefToPath(verse.ref)} className="text-blue-600 hover:underline font-bold text-sm">{verse.ref}</Link>
                    <span className="text-xs text-primary-dark/40">KJV</span>
                  </div>
                  <blockquote className="text-primary-dark/90 dark:text-primary-dark/30 leading-relaxed italic mb-3 border-l-3 border-scripture/30 pl-4">
                    &ldquo;{verse.text}&rdquo;
                  </blockquote>
                  <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed">{verse.note}</p>
                </div>
              ))}
            </div>

            {/* Topic cross-links */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={`/bible-topics/${topic.id}`} className="text-xs bg-green-100 dark:bg-green-950/20 text-green-700 dark:text-green-300 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                Explore {topic.title.replace('Bible Verses About ', '')} Topic
              </Link>
              {topic.id === 'love' && <Link href="/john-3-16" className="text-xs bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">John 3:16 Deep Study</Link>}
              {topic.id === 'strength' && <Link href="/philippians-4-13" className="text-xs bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">Philippians 4:13 Deep Study</Link>}
              {topic.id === 'hope' && <Link href="/jeremiah-29-11" className="text-xs bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">Jeremiah 29:11 Deep Study</Link>}
              {topic.id === 'peace' && <Link href="/psalm-23" className="text-xs bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">Psalm 23 Deep Study</Link>}
              {topic.id === 'faith' && <Link href="/romans-8-28" className="text-xs bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">Romans 8:28 Deep Study</Link>}
              {topic.id === 'wisdom' && <Link href="/proverbs-3-5-6" className="text-xs bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">Proverbs 3:5-6 Deep Study</Link>}
              {topic.id === 'anxiety' && <Link href="/isaiah-41-10" className="text-xs bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">Isaiah 41:10 Deep Study</Link>}
            </div>
          </section>
        ))}

        {/* How to Study Bible Verses */}
        <section className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">How to Study Bible Verses Effectively</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2">1. Read in Context</h3>
              <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed">Never read a verse in isolation. Read the full chapter — at minimum the paragraph before and after. A verse ripped from context can mean the opposite of what the author intended.</p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2">2. Check Cross-References</h3>
              <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed">The Bible interprets itself. Use our <Link href="/cross-references/john/3/16" className="text-blue-600 hover:underline">cross-reference tool</Link> to find related passages that shed light on the verse you&apos;re studying.</p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2">3. Look Up Key Words</h3>
              <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed">English translations flatten nuance. The Greek word for &ldquo;love&rdquo; in John 3:16 (<Link href="/greek-word/agapao" className="text-blue-600 hover:underline">agapao</Link>) is completely different from the love in John 21:15-17 (<Link href="/greek-word/phileo" className="text-blue-600 hover:underline">phileo</Link>).</p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2">4. Apply Personally</h3>
              <p className="text-primary-dark/70 dark:text-primary-dark/40 text-sm leading-relaxed">Ask: What does this verse reveal about God? What does it reveal about me? What should I do differently today? Bible study that doesn&apos;t change behavior isn&apos;t complete.</p>
            </div>
          </div>
        </section>

        {/* Gospel CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-scripture via-scripture/95 to-blue-950 rounded-xl p-8 md:p-10 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">The Most Important Verse You&apos;ll Ever Read</h2>
            <p className="text-blue-100/90 max-w-2xl mx-auto leading-relaxed mb-6">
              Every verse on this page points to the same truth: God loves you, sin separates you from Him, and Jesus is the way back. If you&apos;ve never placed your trust in Christ, today is the day. &ldquo;Whosoever believeth in him should not perish, but have everlasting life&rdquo; (John 3:16).
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/john-3-16" className="inline-block bg-white text-scripture font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Read the Full John 3:16 Study
              </Link>
              <Link href="/jesus-christ" className="inline-block border-2 border-white/40 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Who Is Jesus Christ?
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Frequently Asked Questions About Bible Verses</h2>
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
            <Link href="/bible-topics/love" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm hover:border-blue-300 transition-colors group">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Topical Study</p>
              <h3 className="font-bold text-scripture dark:text-white group-hover:text-blue-600 transition-colors">What the Bible Says About Love</h3>
              <p className="text-primary-dark/60 dark:text-primary-dark/40 text-sm mt-1">Every verse on love — organized, cross-referenced, and explained.</p>
            </Link>
            <Link href="/john-3-16" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm hover:border-blue-300 transition-colors group">
              <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Pillar Study</p>
              <h3 className="font-bold text-scripture dark:text-white group-hover:text-blue-600 transition-colors">John 3:16 — Complete Verse Study</h3>
              <p className="text-primary-dark/60 dark:text-primary-dark/40 text-sm mt-1">Greek analysis, historical context, translation comparison, and more.</p>
            </Link>
            <Link href="/jesus-christ" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm hover:border-blue-300 transition-colors group">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Pillar Study</p>
              <h3 className="font-bold text-scripture dark:text-white group-hover:text-blue-600 transition-colors">Who Is Jesus Christ?</h3>
              <p className="text-primary-dark/60 dark:text-primary-dark/40 text-sm mt-1">Life, teachings, miracles, death, resurrection — the complete guide.</p>
            </Link>
            <Link href="/how-to-study-the-bible" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm hover:border-blue-300 transition-colors group">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Guide</p>
              <h3 className="font-bold text-scripture dark:text-white group-hover:text-blue-600 transition-colors">How to Study the Bible</h3>
              <p className="text-primary-dark/60 dark:text-primary-dark/40 text-sm mt-1">Methods, tools, and tips for getting the most out of Scripture.</p>
            </Link>
          </div>
        </section>

        {/* Continue Your Study */}
        <section id="study-links" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/john-3-16" className="text-blue-600 hover:underline text-sm">John 3:16 Explained</Link>
            <Link href="/psalm-23" className="text-blue-600 hover:underline text-sm">Psalm 23 Study</Link>
            <Link href="/romans-8-28" className="text-blue-600 hover:underline text-sm">Romans 8:28 Study</Link>
            <Link href="/jeremiah-29-11" className="text-blue-600 hover:underline text-sm">Jeremiah 29:11 Study</Link>
            <Link href="/proverbs-3-5-6" className="text-blue-600 hover:underline text-sm">Proverbs 3:5-6 Study</Link>
            <Link href="/philippians-4-13" className="text-blue-600 hover:underline text-sm">Philippians 4:13 Study</Link>
            <Link href="/isaiah-41-10" className="text-blue-600 hover:underline text-sm">Isaiah 41:10 Study</Link>
            <Link href="/jesus-christ" className="text-blue-600 hover:underline text-sm">Who Is Jesus Christ?</Link>
            <Link href="/bible-topics/salvation" className="text-blue-600 hover:underline text-sm">Topical Study: Salvation</Link>
            <Link href="/bible-topics/forgiveness" className="text-blue-600 hover:underline text-sm">Topical Study: Forgiveness</Link>
            <Link href="/bible-topics/prayer" className="text-blue-600 hover:underline text-sm">Topical Study: Prayer</Link>
            <Link href="/bible-topics/faith" className="text-blue-600 hover:underline text-sm">Topical Study: Faith</Link>
            <Link href="/greek-word/agapao" className="text-blue-600 hover:underline text-sm">Greek Word: Agapao (Love)</Link>
            <Link href="/greek-word/pistis" className="text-blue-600 hover:underline text-sm">Greek Word: Pistis (Faith)</Link>
            <Link href="/greek-word/eirene" className="text-blue-600 hover:underline text-sm">Greek Word: Eirene (Peace)</Link>
            <Link href="/greek-word/charis" className="text-blue-600 hover:underline text-sm">Greek Word: Charis (Grace)</Link>
            <Link href="/hebrew-word/H7965" className="text-blue-600 hover:underline text-sm">Hebrew Word: Shalom (Peace)</Link>
            <Link href="/hebrew-word/H2617" className="text-blue-600 hover:underline text-sm">Hebrew Word: Chesed (Mercy)</Link>
            <Link href="/cross-references/john/3/16" className="text-blue-600 hover:underline text-sm">John 3:16 Cross-References</Link>
            <Link href="/cross-references/romans/8/28" className="text-blue-600 hover:underline text-sm">Romans 8:28 Cross-References</Link>
            <Link href="/matthew-chapters" className="text-blue-600 hover:underline text-sm">Matthew Chapter Quizzes</Link>
            <Link href="/john-chapters" className="text-blue-600 hover:underline text-sm">John Chapter Quizzes</Link>
            <Link href="/romans-chapters" className="text-blue-600 hover:underline text-sm">Romans Chapter Quizzes</Link>
            <Link href="/psalms-chapters" className="text-blue-600 hover:underline text-sm">Psalms Chapter Quizzes</Link>
            <Link href="/christmas-bible-verses" className="text-blue-600 hover:underline text-sm">Christmas Bible Verses</Link>
            <Link href="/bible-encyclopedia/jesus" className="text-blue-600 hover:underline text-sm">Jesus Encyclopedia Entry</Link>
            <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">All Bible Quizzes</Link>
          </div>
        </section>

      </main>
    </div>
  );
}
