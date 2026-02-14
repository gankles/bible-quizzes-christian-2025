#!/usr/bin/env npx tsx
/**
 * Topic Generator
 *
 * Reads topic-scores.txt from OpenBible.info (CC-BY) and outputs data/topics.json.
 * Each topic gets top 20 verses sorted by quality score, auto-categorization,
 * template descriptions, related topics via verse co-occurrence, and subtopics
 * via hierarchical name matching.
 *
 * Input: topic-scores.txt (TSV: Topic  OSIS  QualityScore)
 * Output: data/topics.json (~6,700 topics)
 *
 * Usage:
 *   npx tsx scripts/generate-topics.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// =============================================================================
// CONFIGURATION
// =============================================================================

const INPUT_PATH = path.resolve(__dirname, '..', 'topic-scores.txt');
const OUTPUT_PATH = path.resolve(__dirname, '..', 'data', 'topics.json');
const MAX_VERSES_PER_TOPIC = 20;
const MAX_RELATED_TOPICS = 10;
const MAX_RELATED_AFTER_BACKFILL = 14; // allow extra slots for bidirectional backlinks
const MAX_SUBTOPICS = 6;

// =============================================================================
// OSIS ABBREVIATION → BOOK SLUG (reused from generate-cross-references.ts)
// =============================================================================

const OSIS_MAP: Record<string, { slug: string; name: string }> = {
  'Gen': { slug: 'genesis', name: 'Genesis' },
  'Exod': { slug: 'exodus', name: 'Exodus' },
  'Lev': { slug: 'leviticus', name: 'Leviticus' },
  'Num': { slug: 'numbers', name: 'Numbers' },
  'Deut': { slug: 'deuteronomy', name: 'Deuteronomy' },
  'Josh': { slug: 'joshua', name: 'Joshua' },
  'Judg': { slug: 'judges', name: 'Judges' },
  'Ruth': { slug: 'ruth', name: 'Ruth' },
  '1Sam': { slug: '1-samuel', name: '1 Samuel' },
  '2Sam': { slug: '2-samuel', name: '2 Samuel' },
  '1Kgs': { slug: '1-kings', name: '1 Kings' },
  '2Kgs': { slug: '2-kings', name: '2 Kings' },
  '1Chr': { slug: '1-chronicles', name: '1 Chronicles' },
  '2Chr': { slug: '2-chronicles', name: '2 Chronicles' },
  'Ezra': { slug: 'ezra', name: 'Ezra' },
  'Neh': { slug: 'nehemiah', name: 'Nehemiah' },
  'Esth': { slug: 'esther', name: 'Esther' },
  'Job': { slug: 'job', name: 'Job' },
  'Ps': { slug: 'psalms', name: 'Psalms' },
  'Prov': { slug: 'proverbs', name: 'Proverbs' },
  'Eccl': { slug: 'ecclesiastes', name: 'Ecclesiastes' },
  'Song': { slug: 'song-of-solomon', name: 'Song of Solomon' },
  'Isa': { slug: 'isaiah', name: 'Isaiah' },
  'Jer': { slug: 'jeremiah', name: 'Jeremiah' },
  'Lam': { slug: 'lamentations', name: 'Lamentations' },
  'Ezek': { slug: 'ezekiel', name: 'Ezekiel' },
  'Dan': { slug: 'daniel', name: 'Daniel' },
  'Hos': { slug: 'hosea', name: 'Hosea' },
  'Joel': { slug: 'joel', name: 'Joel' },
  'Amos': { slug: 'amos', name: 'Amos' },
  'Obad': { slug: 'obadiah', name: 'Obadiah' },
  'Jonah': { slug: 'jonah', name: 'Jonah' },
  'Mic': { slug: 'micah', name: 'Micah' },
  'Nah': { slug: 'nahum', name: 'Nahum' },
  'Hab': { slug: 'habakkuk', name: 'Habakkuk' },
  'Zeph': { slug: 'zephaniah', name: 'Zephaniah' },
  'Hag': { slug: 'haggai', name: 'Haggai' },
  'Zech': { slug: 'zechariah', name: 'Zechariah' },
  'Mal': { slug: 'malachi', name: 'Malachi' },
  'Matt': { slug: 'matthew', name: 'Matthew' },
  'Mark': { slug: 'mark', name: 'Mark' },
  'Luke': { slug: 'luke', name: 'Luke' },
  'John': { slug: 'john', name: 'John' },
  'Acts': { slug: 'acts', name: 'Acts' },
  'Rom': { slug: 'romans', name: 'Romans' },
  '1Cor': { slug: '1-corinthians', name: '1 Corinthians' },
  '2Cor': { slug: '2-corinthians', name: '2 Corinthians' },
  'Gal': { slug: 'galatians', name: 'Galatians' },
  'Eph': { slug: 'ephesians', name: 'Ephesians' },
  'Phil': { slug: 'philippians', name: 'Philippians' },
  'Col': { slug: 'colossians', name: 'Colossians' },
  '1Thess': { slug: '1-thessalonians', name: '1 Thessalonians' },
  '2Thess': { slug: '2-thessalonians', name: '2 Thessalonians' },
  '1Tim': { slug: '1-timothy', name: '1 Timothy' },
  '2Tim': { slug: '2-timothy', name: '2 Timothy' },
  'Titus': { slug: 'titus', name: 'Titus' },
  'Phlm': { slug: 'philemon', name: 'Philemon' },
  'Heb': { slug: 'hebrews', name: 'Hebrews' },
  'Jas': { slug: 'james', name: 'James' },
  '1Pet': { slug: '1-peter', name: '1 Peter' },
  '2Pet': { slug: '2-peter', name: '2 Peter' },
  '1John': { slug: '1-john', name: '1 John' },
  '2John': { slug: '2-john', name: '2 John' },
  '3John': { slug: '3-john', name: '3 John' },
  'Jude': { slug: 'jude', name: 'Jude' },
  'Rev': { slug: 'revelation', name: 'Revelation' },
};

// =============================================================================
// CATEGORY DEFINITIONS (keyword-based assignment)
// =============================================================================

interface CategoryDef {
  name: string;
  keywords: string[];
}

const CATEGORIES: CategoryDef[] = [
  {
    name: 'Theology & Doctrine',
    keywords: [
      // Core theology
      'god', 'trinity', 'holy spirit', 'jesus', 'christ', 'salvation', 'redemption',
      'atonement', 'justification', 'sanctification', 'predestination', 'sovereignty',
      'omnipotent', 'omniscient', 'incarnation', 'resurrection', 'ascension', 'divinity',
      'deity', 'doctrine', 'theology', 'gospel', 'covenant', 'grace', 'righteousness',
      'blood of christ', 'cross', 'crucifixion', 'born again', 'new birth', 'regeneration',
      'election', 'calling',
      // Spiritual concepts
      'anointing', 'anoint', 'blessing', 'bless', 'holy', 'sacred', 'consecrat',
      'sanctif', 'glorif', 'righteous', 'unrighteous', 'justified', 'redeemed',
      'saved', 'savior', 'messiah', 'lamb of god', 'son of god', 'word of god',
      'scripture', 'bible', 'testament', 'apostle', 'disciple', 'gentile',
      'chosen', 'elect', 'remnant', 'body of christ', 'bride of christ',
      'new covenant', 'old covenant', 'kingdom of god', 'kingdom of heaven',
      'will of god', 'plan of god', 'presence of god', 'power of god',
      'glory of god', 'word of the lord', 'name of god', 'fear of god',
      'image of god', 'wrath of god', 'spirit of god', 'son of man',
      // Spiritual life & growth
      'spiritual', 'soul', 'spirit', 'conscience', 'abide', 'dwell',
      'eternal life', 'everlasting', 'immortal', 'mortal', 'flesh',
      'carnal', 'worldly', 'divine', 'heavenly', 'earthly',
      'mature', 'grow', 'fruit', 'vine', 'branch', 'seed',
      'born of god', 'child of god', 'man of god', 'woman of god',
      'being a christian', 'walk with god', 'relationship with god',
      'knowing god', 'seeking god', 'finding god', 'obeying god',
      'hearing god', 'trusting god', 'serving god', 'pleasing god',
      'glorifying god', 'loving god', 'praising god', 'worshipping god',
      'following god', 'following jesus', 'following christ',
      // Religion & false doctrine
      'religion', 'heresy', 'false teacher', 'false prophet', 'false doctrine',
      'cult', 'apostasy', 'backslid', 'unbeliever', 'atheism', 'agnostic',
      'pagan', 'occult', 'witchcraft', 'sorcery', 'necromancy', 'divination',
      'astrology', 'horoscope', 'new age', 'reincarnation', 'karma',
      'mormon', 'islam', 'hindu', 'buddhis', 'scientology', 'jehovah witness',
      'santeria', 'voodoo', 'yoga', 'meditation practice',
      // Conversion & witness
      'convert', 'conversion', 'testimony', 'witness', 'confess',
      'accept christ', 'accepting christ', 'receiving christ',
      // "gods X" patterns
      'gods will', 'gods plan', 'gods love', 'gods grace', 'gods mercy',
      'gods word', 'gods promise', 'gods power', 'gods glory',
      'gods presence', 'gods protection', 'gods provision', 'gods timing',
      'gods purpose', 'gods faithfulness', 'gods sovereignty',
      'gods anger', 'gods wrath', 'gods judgment', 'gods justice',
      'gods creation', 'gods design', 'gods law', 'gods command',
      'gods kingdom', 'gods throne', 'gods hand', 'gods voice',
      // Religious practices & concepts
      'sabbath', 'sabbath day', 'lords day', 'sunday',
      'last supper', 'lords supper', 'breaking bread',
      'communion table', 'eucharist',
      'lent', 'advent', 'ash wednesday',
      'confession of faith', 'statement of faith',
      'catechism', 'creed', 'canon',
      'laying on of hands', 'laying on hands', 'laying of hands',
      'anointing oil', 'anointing with oil',
      'speaking in tongues', 'gift of tongues', 'tongues',
      'cessationism', 'continuationism',
      'dispensation', 'dispensationalism',
      'calvinism', 'arminianism',
      'free mason', 'mason', 'freemasonry', 'illuminati',
      'mark of god', 'seal of god', 'armor of god',
      'lampstand', 'candlestick', 'menorah',
      'sackcloth', 'ashes', 'mourning garment',
      // Broad theology catch-alls
      'iniquity', 'transgression', 'trespass',
      'predestined', 'foreknow', 'foreordained',
      'propitiation', 'expiation', 'mediator', 'intercessor',
      'parable', 'beatitude', 'sermon on the mount',
      'good samaritan', 'prodigal son', 'sower', 'mustard seed',
      'talents', 'wedding feast', 'wise and foolish',
      'narrow gate', 'narrow path', 'broad way',
      'wheat and tares', 'sheep and goats',
      'triumphal entry', 'transfiguration', 'gethsemane',
      'pentecost', 'ascension of christ',
      'henotheism', 'monotheism', 'polytheism', 'theism',
      'humanism', 'secularism', 'pluralism', 'relativism',
      'denomination', 'orthodox', 'catholic', 'protestant',
      'awakening', 'revival', 'reformation', 'renewal',
      // More religious terms
      'allah', 'quran', 'koran', 'muslim', 'buddhist', 'hindu',
      'shinto', 'taoism', 'confucian', 'zoroastrian',
      'atheist', 'agnostic', 'deist', 'pantheist',
      'infidel', 'heathen', 'pagan', 'heretic',
      'lordship', 'lordship of christ', 'lordship salvation',
      'reverend', 'clergy', 'minister', 'chaplain',
      'ephesians', 'colossians', 'philippians', 'galatians',
      'romans', 'corinthians', 'thessalonians', 'hebrews',
      'vessel', 'vessels', 'chosen vessel',
      'rescue', 'rescuer', 'deliverer', 'liberator',
      'warfare', 'battle', 'fight the good fight',
      'pressed', 'pressed down', 'oppressed',
      'candle', 'candles', 'burning candle',
    ],
  },
  {
    name: 'Prayer & Worship',
    keywords: [
      'prayer', 'pray', 'worship', 'praise', 'thanksgiving', 'hymn', 'song',
      'singing', 'altar', 'offering', 'tithe', 'tithing', 'sacrifice', 'devotion',
      'meditation', 'fasting', 'intercession', 'supplication', 'adoration',
      'glorify', 'hallelujah', 'psalm', 'music', 'instrument', 'trumpet',
      'harp', 'drum', 'flute', 'choir', 'dance before the lord',
      'lifting hands', 'kneeling', 'bowing', 'prostrate',
    ],
  },
  {
    name: 'Faith & Trust',
    keywords: [
      'faith', 'trust', 'belief', 'believe', 'hope', 'confidence', 'assurance',
      'doubt', 'faithfulness', 'reliance', 'dependence', 'certainty', 'conviction',
      'never give up', 'overcoming', 'overcome', 'victory', 'conquer',
      'stand firm', 'hold fast', 'press on', 'pressing on', 'endure',
      'waiting on god', 'waiting on the lord', 'waiting for god',
      'trusting god', 'faith in god', 'faith in jesus',
      'new beginning', 'new beginnings', 'starting over', 'fresh start',
      'second chance', 'restoration', 'renew', 'renewal', 'revive',
      'purpose', 'calling', 'destiny', 'future', 'plans',
    ],
  },
  {
    name: 'Love & Relationships',
    keywords: [
      // Core relationships
      'love', 'marriage', 'married', 'marrying', 'husband', 'wife', 'wives',
      'family', 'children', 'child', 'parent', 'mother', 'father', 'friendship',
      'friend', 'brother', 'sister', 'neighbor', 'compassion', 'mercy', 'kindness',
      'forgiveness', 'reconciliation', 'unity', 'fellowship', 'community',
      'dating', 'romance', 'divorce', 'wedding', 'bride', 'groom',
      // Extended family
      'baby', 'infant', 'newborn', 'toddler', 'teenager', 'teen', 'adolescent',
      'son', 'daughter', 'siblings', 'twin', 'orphan', 'widow', 'widower',
      'grandparent', 'grandfather', 'grandmother', 'grandchild',
      'in-law', 'mother-in-law', 'father-in-law', 'stepmother', 'stepfather',
      'adoption', 'adopt', 'foster', 'guardian', 'custody',
      'single mom', 'single dad', 'single parent', 'single', 'singleness',
      'firstborn', 'prodigal', 'sibling', 'nephew', 'niece', 'cousin',
      'aunt', 'uncle',
      // Relationship dynamics
      'spouse', 'partner', 'relationship', 'togetherness', 'together',
      'helping others', 'caring', 'nurturing', 'protecting',
      'accepting others', 'loving others', 'serving others',
      'forgiving others', 'encouraging others', 'supporting',
      'conflict resolution', 'communication', 'boundaries',
      'intimacy', 'affection', 'devotion', 'loyalty',
      'engagement', 'courtship', 'betrothal',
      'interracial', 'unequally yoked', 'mixed marriage',
      'nagging', 'quarrel', 'arguing',
      // Home & household
      'home', 'house', 'household', 'domestic', 'homemaker',
      'raising children', 'parenting', 'upbringing', 'training children',
      // Treating people
      'how to treat', 'treating others', 'treat people', 'treat others',
      'loving others', 'helping others', 'serving others', 'forgiving others',
      'accepting others', 'caring for others', 'encouraging others',
      'respecting others', 'honoring others',
      'one another', 'each other', 'brotherly',
      'hospitality', 'welcoming', 'stranger', 'visitor', 'guest',
      // Relational struggles
      'enemies', 'enemy', 'rival', 'opponent', 'adversary',
      'betrayal', 'betrayed', 'abandoned', 'abandonment', 'rejection',
      'rejected', 'neglect', 'neglected', 'ignored',
      'toxic', 'abusive', 'manipulation', 'manipulate', 'control',
      'codependent', 'boundaries', 'distance', 'estranged',
    ],
  },
  {
    name: 'Character & Virtues',
    keywords: [
      'patience', 'humility', 'integrity', 'honesty', 'honest', 'courage',
      'wisdom', 'discernment', 'self-control', 'discipline', 'perseverance',
      'endurance', 'gentleness', 'meekness', 'purity', 'pure', 'holiness',
      'obedience', 'obey', 'diligence', 'diligent', 'contentment', 'content',
      'gratitude', 'thankful', 'joy', 'joyful', 'peace', 'peaceful',
      'goodness', 'virtue', 'character', 'fruit of the spirit',
      // Additional virtues
      'respect', 'respectful', 'responsibility', 'responsible', 'accountability',
      'noble', 'excellence', 'maturity', 'self-discipline', 'moderation',
      'temperance', 'sobriety', 'sober', 'modesty', 'modest',
      'loyal', 'loyalty', 'faithful', 'dedication', 'commitment',
      'determined', 'determination', 'persistence', 'resilience', 'fortitude',
      'compassionate', 'merciful', 'generous', 'generosity', 'giving',
      'dependable', 'reliable', 'trustworthy', 'sincere', 'sincerity',
      'being good', 'doing good', 'doing right', 'being right',
      'being strong', 'strong woman', 'strong man', 'strength',
      'being wise', 'being brave', 'being kind', 'being gentle',
      'being patient', 'being humble', 'being honest', 'being faithful',
      'being thankful', 'being grateful', 'being joyful', 'being peaceful',
      'being a good', 'being an example', 'good example', 'role model',
      'reputation', 'influence', 'legacy', 'testimony',
      'hard work', 'work ethic', 'laziness', 'lazy', 'idle', 'idleness',
      'self improvement', 'self esteem', 'self worth', 'self image',
      'identity', 'confidence', 'boldness', 'bold', 'assertive',
      // "being X" virtue patterns
      'being a leader', 'being a servant', 'being a blessing',
      'being a man', 'being a woman', 'being a dad', 'being a mom',
      'being a friend', 'being a mentor', 'being a disciple',
      'being a light', 'being a vessel', 'being a steward',
      'being a pillar', 'being a warrior', 'being a champion',
      'being a gentleman', 'being a lady', 'being a hero',
      'being a rock', 'being a saint', 'being a guide',
      'being a peacemaker', 'being a role model',
      'leading by example', 'lead by example',
      // Speech & communication virtues
      'word', 'words', 'tongue', 'speech', 'speak', 'speaking',
      'listen', 'listening', 'silence', 'quiet', 'gentle words',
      'kind words', 'harsh words', 'power of words', 'power of the tongue',
      'taming the tongue', 'watching your mouth', 'guard your tongue',
      'encouragement', 'encouraging', 'uplift', 'edify',
      'compliment', 'affirm', 'affirmation',
      // Appearance & dress
      'dress', 'dressing', 'clothing', 'attire', 'wearing',
      'modesty', 'modest', 'makeup', 'cosmetics', 'jewelry',
      'fashion', 'appearance', 'beauty', 'beautiful',
      'head covering', 'covering', 'veil',
      // Mind & thought life
      'thought', 'thoughts', 'thinking', 'mind', 'mindset',
      'meditation', 'contemplate', 'focus', 'attention',
      'imagination', 'creativity', 'intellect', 'intelligence',
      'knowledge', 'understanding', 'learning', 'education',
      'teach', 'learn', 'study', 'student', 'lesson',
      'curiosity', 'wonder', 'amazement',
      // Broad "being X" catch-all for virtues/character topics
      'being', 'becoming', 'godly', 'ungodly', 'worldly',
      'dignity', 'honor', 'honorable', 'worthy', 'worthiness',
      'manhood', 'womanhood', 'adulthood', 'childhood',
      'priorities', 'priority', 'balance', 'order',
      'consistency', 'consistent', 'habit', 'habits',
      'success', 'failure', 'victory', 'defeat',
      'struggle', 'fighting', 'warrior', 'conqueror',
      'champion', 'hero', 'heroic', 'valiant', 'valor',
      'unique', 'special', 'gifted', 'talented', 'ability',
      'potential', 'capable', 'competent', 'excellent',
      'deeds', 'actions', 'behavior', 'conduct',
      'example', 'model', 'standard', 'benchmark',
      'improving', 'improvement', 'progress', 'advancing',
      'transform', 'transformation', 'renewing', 'changing',
      'quit', 'quitting', 'giving up', 'persevere',
      'sorry', 'apology', 'apologize', 'remorse',
      'respect', 'disrespect', 'courtesy', 'etiquette',
      'manners', 'politeness', 'civility',
      'self sufficient', 'self reliant', 'independent', 'independence',
      'self care', 'self love', 'self awareness',
      // More character catch-alls
      'boast', 'boasting', 'brag', 'bragging',
      'fool', 'fools', 'foolish', 'folly', 'stupidity',
      'sloth', 'slothful', 'sluggard', 'procrastinat',
      'submissive', 'submission', 'submissiveness',
      'obedient', 'obey', 'comply', 'compliance',
      'tolerance', 'tolerant', 'intolerant',
      'grudge', 'grudges', 'resentful',
      'sensitivity', 'sensitive', 'insensitive',
      'shyness', 'shy', 'introvert', 'extrovert',
      'perfectionism', 'perfectionist',
      'mediocrity', 'mediocre', 'average',
      'conformity', 'conform', 'nonconformist',
      'convenience', 'convenient', 'inconvenient',
      'appreciation', 'appreciate', 'unappreciated',
      'weariness', 'weary', 'tired', 'exhausted',
      'embarrass', 'embarrassment', 'humiliation',
      'offend', 'offended', 'offense', 'offensive',
      'disagreement', 'disagree', 'dispute',
      'opportunity', 'seize', 'moment',
      'promote', 'promotion', 'advance', 'advancement',
      'stand', 'standing firm', 'stand up',
      'sharing', 'share', 'giving', 'generous',
      'pleasure', 'enjoyment', 'delight', 'satisfaction',
      'humor', 'laughter', 'laugh', 'laughing', 'joke',
      'best', 'doing your best', 'excelling',
      'chastity', 'chaste', 'abstinent',
      'depravity', 'depraved', 'debased',
      'testing', 'test', 'tested', 'tried',
      'reaping', 'sowing', 'reap what you sow',
      'turning the other cheek', 'other cheek',
      'yelling', 'shouting', 'screaming',
      'threatening', 'threat', 'intimidation', 'bully',
    ],
  },
  {
    name: 'Sin & Temptation',
    keywords: [
      'sin', 'temptation', 'evil', 'wickedness', 'wicked', 'lust', 'greed',
      'pride', 'anger', 'angry', 'wrath', 'jealousy', 'jealous', 'envy',
      'envious', 'gossip', 'lying', 'liar', 'deceit', 'deceitful', 'deception',
      'adultery', 'idolatry', 'idol', 'rebellion', 'disobedience', 'repentance',
      'repent', 'confession', 'guilt', 'guilty', 'shame', 'addiction', 'addict',
      'drunkenness', 'drunk', 'covet', 'coveting', 'blasphemy', 'curse',
      'cursing', 'profanity', 'swearing',
      // Extended sin categories
      'stealing', 'theft', 'thief', 'robber', 'murder', 'kill', 'killing',
      'violence', 'violent', 'abuse', 'abusive', 'molest', 'rape',
      'pornography', 'masturbat', 'fornication', 'sexual immorality',
      'homosexual', 'sodomy', 'perversion', 'unclean', 'impure', 'impurity',
      'corrupt', 'corruption', 'bribery', 'fraud', 'cheating', 'cheat',
      'hatred', 'hate', 'hateful', 'malice', 'spite', 'revenge', 'vengeance',
      'slander', 'backbiting', 'talebearing', 'false witness', 'perjury',
      'hypocrisy', 'hypocrite', 'pharisee', 'self righteous',
      'unforgiveness', 'unforgiving', 'bitterness', 'bitter', 'resentment',
      'selfish', 'selfishness', 'vanity', 'conceit', 'arrogance', 'arrogant',
      'stubbornness', 'stubborn', 'stiff-necked', 'hard heart', 'hardened heart',
      'gluttony', 'glutton', 'overindulge', 'excess',
      'gambling', 'gamble', 'game of chance',
      'drugs', 'marijuana', 'smoking', 'tobacco', 'alcohol',
      'witchcraft', 'sorcery', 'magic', 'occult', 'satanism',
      'bad habit', 'bad influence', 'bad company', 'bad friend',
      'bad language', 'bad word', 'crude', 'vulgar', 'obscene',
      'unfaithful', 'betrayal', 'betray', 'treachery',
      'worldliness', 'materialism', 'hedonism', 'pleasure seeking',
      'pornography', 'sexual sin', 'immoral', 'immorality',
      'abortion', 'euthanasia', 'suicide',
      'necrophilia', 'bestiality', 'incest',
      // "being X" sin patterns
      'being mean', 'being rude', 'being cruel', 'being harsh',
      'being greedy', 'being selfish', 'being vain', 'being proud',
      'being jealous', 'being envious', 'being hateful',
      'being unfaithful', 'being dishonest', 'being ungrateful',
      'being judgmental', 'being critical', 'being negative',
      'hating', 'hateful', 'harm', 'harming',
    ],
  },
  {
    name: 'Life Circumstances',
    keywords: [
      // Hardship & suffering
      'suffering', 'trial', 'tribulation', 'grief', 'sorrow', 'death', 'dying',
      'healing', 'sickness', 'sick', 'disease', 'health', 'anxiety', 'anxious',
      'worry', 'worried', 'fear', 'afraid', 'scared', 'depression', 'depressed',
      'loneliness', 'lonely', 'stress', 'comfort', 'rest', 'sleep', 'insomnia',
      'aging', 'old age', 'youth', 'young', 'pregnancy', 'pregnant', 'birth',
      'loss', 'mourning', 'pain', 'hardship', 'trouble', 'adversity',
      'persecution', 'persecuted', 'refugee', 'homeless', 'poverty', 'hunger',
      'disability', 'disabled', 'handicap',
      // Mental health & emotions
      'mental health', 'mental illness', 'schizophrenia', 'bipolar',
      'panic attack', 'panic', 'phobia', 'trauma', 'ptsd',
      'sad', 'sadness', 'weeping', 'crying', 'tears',
      'heartbreak', 'heartbroken', 'broken heart', 'disappointment',
      'frustrated', 'frustration', 'overwhelmed', 'burnout',
      'despair', 'hopeless', 'hopelessness', 'helpless',
      'regret', 'remorse', 'resentment',
      'happy', 'happiness', 'emotion', 'emotional', 'feeling',
      'attitude', 'mindset', 'positive', 'negative', 'negativity',
      'optimism', 'pessimism', 'self esteem', 'insecure', 'insecurity',
      'nervous', 'nervousness', 'mood', 'sensitive',
      'hurt', 'wounded', 'bruised', 'scars',
      'nightmare', 'bad dream', 'sleepless',
      // Physical body & health
      'body', 'physical', 'cancer', 'blind', 'blindness', 'deaf', 'deafness',
      'lame', 'cripple', 'barren', 'infertil', 'miscarriage', 'stillborn',
      'blood', 'blood pressure', 'brain', 'organ',
      'weight', 'fat', 'obese', 'anorexia', 'bulimia', 'eating disorder',
      'medicine', 'medical', 'doctor', 'hospital', 'surgery',
      'plague', 'leprosy', 'fever', 'wound',
      'tattoo', 'piercing', 'hair', 'bald', 'beard', 'cutting',
      'circumcision', 'foreskin',
      // Life events
      'accident', 'disaster', 'tragedy', 'emergency', 'crisis',
      'moving', 'relocating', 'transition', 'change',
      'retirement', 'graduation', 'milestone',
      'funeral', 'burial', 'grave', 'cemetery', 'tomb',
      'new home', 'new job', 'new baby', 'new life', 'new beginning',
      'safe', 'safety', 'protection', 'security', 'danger',
      'waiting', 'patience in', 'enduring',
      'getting older', 'middle age', 'senior',
      'infirmity', 'chronic', 'terminal',
      'sanity', 'crazy', 'madness',
      // Body parts & physical
      'hand', 'hands', 'feet', 'foot', 'eye', 'eyes', 'ear', 'ears',
      'head', 'face', 'nose', 'mouth', 'lip', 'neck', 'shoulder',
      'arm', 'leg', 'knee', 'back', 'chest', 'stomach', 'belly',
      'womb', 'bone', 'muscle', 'heart', 'brain',
      'skin', 'flesh', 'naked', 'nakedness', 'nude',
      'virgin', 'virginity', 'celibacy', 'abstinence',
      'sex', 'sexual', 'intimacy', 'reproduction',
      'breastfeeding', 'nursing', 'lactation',
      // General life
      'life', 'living', 'alive', 'dead', 'death', 'afterlife',
      'purpose of life', 'meaning of life', 'quality of life',
      'daily life', 'everyday', 'routine', 'schedule',
      'time', 'past', 'present', 'future', 'eternity',
      'age', 'grow', 'growth', 'mature', 'maturity',
      'experience', 'journey', 'path', 'road', 'direction',
      'choice', 'decision', 'free will', 'destiny',
      'promise', 'promises', 'fulfill', 'fulfillment',
      'abundance', 'abundant', 'prosperity', 'bless',
      'lack', 'want', 'need', 'needy', 'provision',
      'letting go', 'let go', 'move on', 'moving on',
      'starting over', 'fresh start', 'new start',
      'challenge', 'obstacle', 'difficulty',
      'strength', 'weakness', 'power', 'powerless',
      'help', 'helping', 'support', 'care', 'caring',
      'counsel', 'advice', 'guidance', 'direction',
      'motivation', 'inspire', 'inspiration',
      'leisure', 'recreation', 'play', 'games', 'sport',
      'travel', 'journey', 'pilgrimage', 'sojourn',
      'clean', 'cleanliness', 'hygiene', 'wash',
      'color', 'colors', 'white', 'black', 'red', 'blue',
      'number', 'numbers', 'seven', 'twelve', 'forty',
      'symbol', 'symbolism', 'meaning', 'significance',
      // Modern life issues
      'technology', 'internet', 'social media', 'phone',
      'television', 'movie', 'video', 'gaming',
      'harry potter', 'halloween', 'yoga',
      'tattoo', 'piercing', 'body modification',
      'cloning', 'genetic', 'dna', 'evolution',
      'climate', 'pollution', 'recycle',
      // More nature/seasons
      'autumn', 'winter', 'summer', 'spring',
      'morning', 'evening', 'night', 'day', 'dawn', 'dusk',
      'sunrise', 'sunset', 'midnight', 'noon',
      'cold', 'heat', 'warm', 'cool', 'freeze',
      'drought', 'hurricane', 'tornado', 'tsunami', 'typhoon',
      'beer', 'ale', 'liquor', 'spirits', 'drink', 'drinking',
      'tea', 'coffee', 'beverage',
      'swimming', 'fishing', 'hunting', 'camping',
      'fox', 'foxes', 'frog', 'frogs', 'willow',
      'pot', 'pots', 'clay', 'potter', 'brick', 'bricks',
      'key', 'keys', 'gate', 'door', 'window',
      'image', 'images', 'picture', 'painting', 'art',
      'girl', 'girls', 'boy', 'boys', 'men', 'women', 'man', 'woman',
    ],
  },
  {
    name: 'Money & Work',
    keywords: [
      'money', 'wealth', 'wealthy', 'riches', 'rich', 'poverty', 'poor',
      'giving', 'generosity', 'generous', 'stewardship', 'steward',
      'work', 'working', 'labor', 'business', 'success', 'successful',
      'prosperity', 'prosper', 'debt', 'finance', 'financial', 'treasure',
      'reward', 'wages', 'salary', 'employment', 'employ', 'career',
      'retirement', 'inheritance', 'inherit',
      // Extended finance
      'profit', 'gain', 'earnings', 'income', 'saving', 'savings',
      'invest', 'investment', 'loan', 'borrow', 'lending', 'lend',
      'interest', 'usury', 'mortgage', 'property', 'land',
      'buying', 'selling', 'trade', 'merchant', 'commerce',
      'provision', 'provide', 'provider', 'provision',
      'abundance', 'abundant', 'plenty', 'enough',
      'get rich', 'materialism', 'greed', 'covetous',
      // Work & vocation
      'occupation', 'profession', 'job', 'hiring', 'boss', 'employee',
      'employer', 'manager', 'leader', 'leadership',
      'entrepreneur', 'enterprise', 'market', 'sales',
      'tax', 'taxes', 'render unto caesar',
      'farming', 'farmer', 'shepherd', 'fisherman', 'carpenter',
      'accountancy', 'accounting',
    ],
  },
  {
    name: 'Church & Ministry',
    keywords: [
      'church', 'ministry', 'pastor', 'elder', 'deacon', 'preaching', 'preach',
      'preacher', 'teaching', 'teach', 'teacher', 'evangelism', 'evangelist',
      'mission', 'missionary', 'baptism', 'baptize', 'communion', 'sacrament',
      'ordination', 'discipleship', 'mentoring', 'mentor', 'leadership',
      'servant', 'service', 'serving', 'spiritual gifts', 'apostle', 'prophet',
      'congregation', 'assembly',
      // Extended church life
      'worship leader', 'worship team', 'sunday school', 'bible study',
      'small group', 'cell group', 'fellowship', 'gathering',
      'denomination', 'seminary', 'theological', 'ordain',
      'missionary work', 'outreach', 'witnessing', 'soul winning',
      'church planting', 'church growth', 'church leadership',
      'accountability partner', 'spiritual father', 'spiritual mother',
      'confirmation', 'catechism',
    ],
  },
  {
    name: 'End Times & Prophecy',
    keywords: [
      'end times', 'end of the world', 'end of days', 'prophecy', 'prophetic',
      'rapture', 'tribulation', 'antichrist', 'revelation', 'apocalypse',
      'second coming', 'return of christ', 'millennium', 'judgment day',
      'heaven', 'hell', 'eternal', 'afterlife', 'resurrection of the dead',
      'new heaven', 'new earth', 'armageddon', 'mark of the beast', 'last days',
      '666', 'beast', 'false prophet',
      'lake of fire', 'bottomless pit', 'abyss', 'hades', 'sheol',
      'paradise', 'new jerusalem', 'great white throne',
      'signs of the times', 'birth pangs', 'great tribulation',
      'one world government', 'one world religion',
      'israel prophecy', 'daniel prophecy',
      '2012', 'doomsday', 'catastrophe',
    ],
  },
  {
    name: 'Old Testament History',
    keywords: [
      // People
      'moses', 'abraham', 'david', 'solomon', 'israel', 'egypt', 'exodus',
      'conquest', 'promised land', 'exile', 'babylon', 'temple', 'tabernacle',
      'ark', 'law of moses', 'ten commandments', 'passover', 'circumcision',
      'tribe', 'kingdom', 'prophet', 'judge',
      // More OT people
      'adam', 'eve', 'noah', 'lot', 'jacob', 'esau', 'joseph', 'isaac',
      'sarah', 'rebecca', 'rachel', 'leah', 'ruth', 'naomi', 'boaz',
      'esther', 'deborah', 'gideon', 'samson', 'delilah', 'samuel',
      'saul', 'jonathan', 'absalom', 'elijah', 'elisha', 'daniel',
      'ezekiel', 'jeremiah', 'isaiah', 'nehemiah', 'ezra', 'job',
      'joshua', 'caleb', 'rahab', 'goliath', 'pharaoh', 'cain', 'abel',
      'enoch', 'melchizedek', 'balaam', 'jezebel',
      'abigail', 'abijah', 'abishag', 'achitophel', 'ahab',
      'aaron', 'miriam', 'hagar', 'ishmael', 'dinah', 'tamar',
      'bathsheba', 'uriah', 'habakkuk', 'haggai', 'hosea', 'joel',
      'amos', 'obadiah', 'jonah', 'micah', 'nahum', 'zephaniah',
      'zechariah', 'malachi',
      // NT people that should also be captured
      'mary', 'martha', 'lazarus', 'peter', 'paul', 'john', 'james',
      'barnabas', 'timothy', 'stephen', 'zacchaeus', 'nicodemus',
      'pilate', 'herod', 'judas', 'thomas', 'matthew', 'luke', 'mark',
      'gabriel', 'cornelius', 'lydia', 'priscilla', 'aquila',
      'apollos', 'silas', 'titus', 'philemon', 'onesimus',
      // OT events & places
      'garden of eden', 'tower of babel', 'red sea', 'mount sinai',
      'jordan river', 'jericho', 'sodom', 'gomorrah', 'nineveh',
      'bethlehem', 'nazareth', 'jerusalem', 'zion', 'galilee',
      'samaria', 'assyria', 'persia', 'philistine', 'canaan',
      'genesis', 'creation account', 'the flood', 'the exodus',
      'golden calf', 'manna', 'burning bush', 'plagues of egypt',
      'parting of the sea', 'walls of jericho',
      'sanhedrin', 'sadducee', 'zealot',
      // More people
      'levi', 'benjamin', 'reuben', 'simeon', 'judah', 'dan', 'naphtali',
      'gad', 'asher', 'issachar', 'zebulun', 'manasseh', 'ephraim',
      'eli', 'jethro', 'potiphar', 'asenath', 'mordecai', 'haman',
      'belshazzar', 'nebuchadnezzar', 'cyrus', 'darius',
      'benaiah', 'joab', 'abner', 'hushai',
      'legion', 'legions', 'centurion',
      'pharisee', 'scribe', 'publican',
      'cupbearer', 'armor bearer', 'standard bearer',
    ],
  },
  {
    name: 'Creation & Nature',
    keywords: [
      'creation', 'nature', 'earth', 'sky', 'sea', 'ocean', 'mountain',
      'river', 'animal', 'plant', 'tree', 'garden', 'flood', 'rainbow',
      'star', 'sun', 'moon', 'season', 'harvest', 'rain', 'weather',
      'environment', 'stewardship of creation',
      // Animals
      'bird', 'lion', 'lamb', 'sheep', 'goat', 'ox', 'bull', 'horse',
      'donkey', 'camel', 'serpent', 'snake', 'dragon', 'eagle', 'dove',
      'raven', 'sparrow', 'fish', 'whale', 'bear', 'wolf', 'fox', 'dog',
      'cat', 'pig', 'swine', 'locust', 'bee', 'ant', 'spider', 'scorpion',
      'deer', 'leopard', 'behemoth', 'leviathan', 'cattle', 'flock',
      'herd', 'gazelle', 'rooster', 'hen', 'cock', 'vulture', 'hawk',
      'owl', 'stork', 'pelican',
      // Nature elements
      'wilderness', 'desert', 'forest', 'field', 'vine', 'vineyard',
      'seed', 'flower', 'rose', 'lily', 'thorn', 'crop', 'farm',
      'soil', 'land', 'island', 'earthquake', 'storm', 'thunder',
      'lightning', 'wind', 'cloud', 'snow', 'ice', 'fire', 'smoke',
      'dust', 'sand', 'rock', 'stone', 'cave', 'valley', 'hill',
      'lake', 'well', 'spring', 'fountain', 'brook', 'stream',
      'waterfall', 'volcano',
      // Food & drink (natural)
      'bread', 'wine', 'water', 'fruit', 'meat', 'grain', 'wheat',
      'barley', 'olive', 'grape', 'fig', 'honey', 'milk', 'salt',
      'feast', 'famine', 'manna', 'leaven', 'food', 'eating',
      'hunger', 'thirst', 'diet', 'vegetarian', 'vegan',
      // Space & cosmos
      'outer space', 'universe', 'cosmos', 'planets', 'galaxy',
      'big bang', 'evolution', 'intelligent design', 'creationism',
      'dinosaur', 'fossil', 'age of the earth',
      'neanderthal', 'gap theory', 'young earth',
    ],
  },
  {
    name: 'Government & Society',
    keywords: [
      'government', 'authority', 'king', 'queen', 'ruler', 'law', 'justice',
      'judgment', 'judging', 'nation', 'war', 'peace', 'soldier', 'army',
      'politics', 'political', 'citizenship', 'freedom', 'liberty', 'slavery',
      'slave', 'oppression', 'rights', 'voting', 'taxes', 'tax',
      // Extended governance
      'president', 'leader', 'governor', 'mayor', 'senator', 'congress',
      'democracy', 'republic', 'constitution', 'patriot', 'patriotism',
      'military', 'navy', 'marines', 'veterans', 'draft',
      'police', 'officer', 'prison', 'jail', 'imprisonment', 'captive',
      'crime', 'criminal', 'punishment', 'penalty', 'death penalty',
      'capital punishment', 'execution', 'self defense',
      'immigration', 'immigrant', 'alien', 'stranger', 'foreigner',
      'refugee', 'asylum', 'border',
      'discrimination', 'racism', 'race', 'races', 'racial',
      'segregation', 'inequality', 'civil rights',
      'poverty', 'welfare', 'charity', 'aid', 'relief',
      'corruption', 'tyranny', 'dictator', 'anarchy',
      'rebel', 'revolution', 'protest', 'riot',
      'treaty', 'diplomacy', 'ambassador',
      'court', 'trial', 'verdict', 'sentence',
      'america', 'united states', 'israel nation', 'gaza',
      'empire', 'rome', 'roman', 'greek', 'persian',
      'genocide', 'holocaust', 'slavery in the bible',
      'weapons', 'nuclear', 'gun', 'firearms', 'violence',
      '4th of july', 'independence day', 'memorial day',
      'flag', 'pledge', 'anthem',
      // Social issues
      'gender role', 'feminism', 'equality',
      'homosexuality', 'gay', 'lesbian', 'lgbtq', 'same sex',
      'transgender', 'gender identity',
      'interracial', 'mixed race', 'ethnic',
      'class', 'caste', 'social status',
      'education', 'school', 'college', 'university',
      'science', 'technology', 'artificial intelligence',
      'cloning', 'genetic engineering', 'stem cell',
      'media', 'internet', 'social media', 'television', 'movies',
      'culture', 'cultural', 'society', 'civilization',
      'tradition', 'custom', 'ceremony',
      'gang', 'gang violence', 'terrorism', 'terrorist',
      // Legal
      'lawsuit', 'suing', 'lawyer', 'attorney', 'court', 'legal',
      'separation', 'arbitration', 'mediation',
      // More social issues
      'bullying', 'bully', 'harassment', 'stalking',
      'trafficking', 'exploitation', 'injustice',
      'poverty', 'homelessness', 'hunger', 'welfare',
      'environment', 'climate change', 'pollution',
      'globalism', 'nationalism', 'communism', 'socialism', 'capitalism',
      'liberal', 'conservative',
      // Misc social
      'people', 'person', 'human', 'mankind', 'humanity',
      'community', 'society', 'civilization', 'culture',
      'right and wrong', 'good and evil', 'truth and lies',
      // More social
      'affair', 'affairs', 'scandal',
      'hazing', 'initiation', 'fraternity',
      'martial art', 'karate', 'boxing', 'wrestling', 'mma',
      'lottery', 'sweepstakes', 'raffle',
      'equal', 'equality', 'equity', 'fairness',
      'racist', 'racism', 'prejudice', 'bigotry', 'bias',
      'lynching', 'hate crime', 'supremacy',
      'secret society', 'secret societies', 'illuminati',
      'psychic', 'medium', 'palm read', 'fortune tell', 'soothsay',
      'numerology', 'tarot', 'crystal', 'rune', 'spell',
      'mysticism', 'mystic', 'esoteric', 'gnostic',
      'darwin', 'darwinism', 'evolution theory',
      'economics', 'economy', 'inflation', 'recession',
      'physics', 'quantum', 'relativity',
      'invention', 'inventor', 'discovery',
      'promotion', 'advertising', 'marketing',
    ],
  },
  {
    name: 'Angels & Spiritual Warfare',
    keywords: [
      'angel', 'demon', 'satan', 'devil', 'spiritual warfare', 'armor of god',
      'principalities', 'powers', 'darkness', 'light', 'supernatural',
      'miracle', 'sign', 'wonder', 'vision', 'dream', 'discernment of spirits',
      'exorcism', 'possession', 'possessed',
      // Extended spiritual realm
      'archangel', 'seraphim', 'cherubim', 'guardian angel',
      'fallen angel', 'nephilim', 'giants', 'watchers',
      'demonic', 'deliverance', 'casting out', 'rebuke',
      'binding', 'loosing', 'stronghold', 'fortress',
      'shield of faith', 'sword of the spirit', 'helmet of salvation',
      'breastplate of righteousness', 'belt of truth', 'shoes of peace',
      'ghost', 'apparition', 'poltergeist', 'haunted',
      'near death', 'out of body', 'supernatural experience',
      'spiritual attack', 'spiritual battle', 'spiritual protection',
      'evil spirit', 'unclean spirit', 'familiar spirit',
      'lucifer', 'beelzebub', 'leviathan spirit', 'jezebel spirit',
      'territorial spirit', 'prince of darkness',
      'heaven and hell', 'cloud of witnesses',
      'azrael', 'abaddon', 'apollyon',
    ],
  },
  {
    name: 'Miscellaneous',
    keywords: [], // fallback
  },
];

// =============================================================================
// OSIS PARSER
// =============================================================================

/**
 * Parse an OSIS reference like "Exod.20.1" or range "Exod.20.1-Exod.20.26"
 * into a verse ref like "exodus-20-1". For ranges, takes the first verse.
 */
function parseOsisRef(osis: string): string | null {
  // Take first part if range (before the hyphen connecting two OSIS refs)
  // Ranges look like: Exod.20.1-Exod.20.26 or Rom.13.8-Rom.13.10
  const firstRef = osis.split('-')[0];

  // But handle cases like "1Cor.7.39" where the book starts with a number
  // The split on '-' might break "1Cor" → "1Cor" is fine since the dash is between refs
  // Actually, ranges have the pattern Book.Ch.V-Book.Ch.V, so split on the dash
  // that comes after a digit: e.g., "Exod.20.1-Exod.20.26"
  // Let's use a smarter approach: find the first complete OSIS ref
  const match = osis.match(/^(\d?[A-Za-z]+)\.(\d+)\.(\d+)/);
  if (!match) return null;

  const [, bookAbbr, chapter, verse] = match;
  const bookInfo = OSIS_MAP[bookAbbr];
  if (!bookInfo) return null;

  return `${bookInfo.slug}-${chapter}-${verse}`;
}

// =============================================================================
// SLUG GENERATOR
// =============================================================================

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, '')           // remove apostrophes
    .replace(/[^a-z0-9\s-]/g, '')   // strip special chars
    .replace(/\s+/g, '-')           // spaces to hyphens
    .replace(/-+/g, '-')            // collapse multiple hyphens
    .replace(/^-|-$/g, '');         // trim leading/trailing hyphens
}

// =============================================================================
// CATEGORY CLASSIFIER
// =============================================================================

function classifyTopic(topicName: string): string {
  const lower = topicName.toLowerCase();

  // Multi-pass: check longest keywords first (multi-word phrases are more specific)
  // Pass 1: phrases with 3+ words
  for (const cat of CATEGORIES) {
    if (cat.keywords.length === 0) continue;
    for (const kw of cat.keywords) {
      if (kw.includes(' ') && kw.split(' ').length >= 3 && lower.includes(kw)) {
        return cat.name;
      }
    }
  }

  // Pass 2: two-word phrases
  for (const cat of CATEGORIES) {
    if (cat.keywords.length === 0) continue;
    for (const kw of cat.keywords) {
      if (kw.includes(' ') && kw.split(' ').length === 2 && lower.includes(kw)) {
        return cat.name;
      }
    }
  }

  // Pass 3: single words (with word boundary awareness for short keywords)
  for (const cat of CATEGORIES) {
    if (cat.keywords.length === 0) continue;
    for (const kw of cat.keywords) {
      if (!kw.includes(' ')) {
        // For very short keywords (<=3 chars), require word boundary match
        if (kw.length <= 3) {
          const regex = new RegExp(`\\b${kw}\\b`, 'i');
          if (regex.test(lower)) return cat.name;
        } else {
          if (lower.includes(kw)) return cat.name;
        }
      }
    }
  }

  return 'Miscellaneous';
}

// =============================================================================
// DESCRIPTION / DEFINITION GENERATORS
// =============================================================================

function generateDescription(name: string, category: string, verseCount: number): string {
  const templates = [
    `Explore what the Bible says about ${name.toLowerCase()}. This collection of ${verseCount} key Scripture passages reveals God's wisdom and guidance on this important theme.`,
    `Discover ${verseCount} powerful Bible verses about ${name.toLowerCase()}. Study what Scripture teaches about this essential ${category.toLowerCase()} topic.`,
    `What does the Bible say about ${name.toLowerCase()}? Browse ${verseCount} carefully selected verses that illuminate this biblical theme.`,
  ];

  // Deterministic selection based on name length
  return templates[name.length % templates.length];
}

function generateDefinition(name: string, category: string): string {
  const templates: Record<string, string> = {
    'Theology & Doctrine': `${name} is a foundational biblical doctrine that shapes Christian understanding of God and His purposes.`,
    'Prayer & Worship': `${name} in the Bible encompasses the believer's communion with God through devotion and spiritual practice.`,
    'Faith & Trust': `Biblical ${name.toLowerCase()} involves wholehearted reliance on God's character, promises, and sovereign plan.`,
    'Love & Relationships': `${name} in Scripture reflects God's design for human connection, rooted in His own love for His people.`,
    'Character & Virtues': `${name} is a quality cultivated by the Holy Spirit in the life of a believer, reflecting the character of Christ.`,
    'Sin & Temptation': `The Bible addresses ${name.toLowerCase()} honestly, offering both warning and the hope of redemption through Christ.`,
    'Life Circumstances': `Scripture speaks directly to ${name.toLowerCase()}, offering comfort, wisdom, and the assurance of God's presence.`,
    'Money & Work': `The Bible provides practical wisdom about ${name.toLowerCase()}, emphasizing stewardship and eternal perspective.`,
    'Church & Ministry': `${name} is central to the life and mission of the body of Christ as described in Scripture.`,
    'End Times & Prophecy': `${name} is a prophetic theme that reveals God's ultimate plan for creation and redemption.`,
    'Old Testament History': `${name} is part of the rich historical narrative of God's dealings with His people in the Old Testament.`,
    'Creation & Nature': `${name} in the Bible points to God's creative power and His ongoing sustenance of the world He made.`,
    'Government & Society': `Scripture addresses ${name.toLowerCase()} within God's sovereign ordering of nations and human authority.`,
    'Angels & Spiritual Warfare': `${name} relates to the unseen spiritual realm that Scripture reveals is active and consequential.`,
    'Miscellaneous': `${name} is a recurring theme in Scripture with relevance to the Christian life and biblical understanding.`,
  };

  return templates[category] || templates['Miscellaneous'];
}

// =============================================================================
// MAIN
// =============================================================================

interface RawEntry {
  topic: string;
  verseRef: string;
  score: number;
}

interface TopicData {
  name: string;
  slug: string;
  category: string;
  description: string;
  definition: string;
  verseRefs: string[];
  verseCount: number;
  subtopics: string[];
  relatedTopics: string[];
  keywords: string[];
}

function main() {
  console.log('Reading topic-scores.txt...');
  const raw = fs.readFileSync(INPUT_PATH, 'utf-8');
  const lines = raw.split('\n');

  // Skip header line
  const dataLines = lines.slice(1).filter(l => l.trim().length > 0);
  console.log(`Found ${dataLines.length} verse associations.`);

  // Step 1: Parse all entries
  const entries: RawEntry[] = [];
  let parseErrors = 0;

  for (const line of dataLines) {
    const parts = line.split('\t');
    if (parts.length < 3) { parseErrors++; continue; }

    const topic = parts[0].trim();
    const osis = parts[1].trim();
    const score = parseInt(parts[2].trim(), 10);

    if (!topic || !osis || isNaN(score)) { parseErrors++; continue; }

    const verseRef = parseOsisRef(osis);
    if (!verseRef) { parseErrors++; continue; }

    entries.push({ topic, verseRef, score });
  }

  console.log(`Parsed ${entries.length} valid entries (${parseErrors} parse errors).`);

  // Step 2: Group by topic, sort verses by score desc, keep top N
  const topicMap = new Map<string, { refs: { ref: string; score: number }[] }>();

  for (const entry of entries) {
    let data = topicMap.get(entry.topic);
    if (!data) {
      data = { refs: [] };
      topicMap.set(entry.topic, data);
    }
    data.refs.push({ ref: entry.verseRef, score: entry.score });
  }

  console.log(`Found ${topicMap.size} unique topics.`);

  // Step 3: Build topic objects
  const topics: TopicData[] = [];
  const slugSet = new Set<string>();

  // Build a verse → topics index for related topic detection
  const verseToTopics = new Map<string, Set<string>>();

  for (const [name, data] of topicMap) {
    const slug = generateSlug(name);

    // Handle duplicate slugs by appending a counter
    let finalSlug = slug;
    let counter = 2;
    while (slugSet.has(finalSlug)) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }
    slugSet.add(finalSlug);

    // Sort by score descending, deduplicate verse refs, keep top N
    data.refs.sort((a, b) => b.score - a.score);
    const seen = new Set<string>();
    const uniqueRefs: string[] = [];
    for (const r of data.refs) {
      if (!seen.has(r.ref)) {
        seen.add(r.ref);
        uniqueRefs.push(r.ref);
        if (uniqueRefs.length >= MAX_VERSES_PER_TOPIC) break;
      }
    }

    // Index verse→topic for related topics
    for (const ref of uniqueRefs) {
      let set = verseToTopics.get(ref);
      if (!set) {
        set = new Set();
        verseToTopics.set(ref, set);
      }
      set.add(finalSlug);
    }

    const category = classifyTopic(name);

    // Generate keywords from the topic name
    const keywords = name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2);

    topics.push({
      name,
      slug: finalSlug,
      category,
      description: generateDescription(name, category, uniqueRefs.length),
      definition: generateDefinition(name, category),
      verseRefs: uniqueRefs,
      verseCount: uniqueRefs.length,
      subtopics: [],       // filled in step 4
      relatedTopics: [],   // filled in step 5
      keywords: [...new Set(keywords)],
    });
  }

  // Step 4: Find subtopics via hierarchical name matching
  // e.g., "prayer" finds "morning prayer", "intercessory prayer", etc.
  console.log('Finding subtopics...');
  const slugToTopic = new Map<string, TopicData>();
  for (const t of topics) {
    slugToTopic.set(t.slug, t);
  }

  for (const topic of topics) {
    const lowerName = topic.name.toLowerCase();
    const subtopics: string[] = [];

    for (const other of topics) {
      if (other.slug === topic.slug) continue;
      const otherLower = other.name.toLowerCase();

      // "other" is a subtopic of "topic" if it contains topic's name as a word
      // and is longer (e.g., "morning prayer" contains "prayer")
      if (
        otherLower.length > lowerName.length &&
        otherLower.includes(lowerName) &&
        // Make sure it's a word boundary match, not a substring like "prayer" in "sprayer"
        (otherLower.startsWith(lowerName + ' ') ||
         otherLower.endsWith(' ' + lowerName) ||
         otherLower.includes(' ' + lowerName + ' ') ||
         otherLower.includes(' ' + lowerName + 's') ||
         otherLower.startsWith(lowerName + 's'))
      ) {
        subtopics.push(other.name);
        if (subtopics.length >= MAX_SUBTOPICS) break;
      }
    }

    topic.subtopics = subtopics;
  }

  // Step 5: Find related topics via verse co-occurrence + enforce bidirectional links
  console.log('Finding related topics...');

  // 5a: Compute co-occurrence scores for every topic pair
  const coScores = new Map<string, Map<string, number>>();
  for (const topic of topics) {
    const scores = new Map<string, number>();
    for (const ref of topic.verseRefs) {
      const coTopics = verseToTopics.get(ref);
      if (!coTopics) continue;
      for (const otherSlug of coTopics) {
        if (otherSlug === topic.slug) continue;
        scores.set(otherSlug, (scores.get(otherSlug) || 0) + 1);
      }
    }
    coScores.set(topic.slug, scores);
  }

  // 5b: Initial assignment — top N by co-occurrence
  for (const topic of topics) {
    const scores = coScores.get(topic.slug) || new Map();
    topic.relatedTopics = [...scores.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_RELATED_TOPICS)
      .map(([slug]) => slug);
  }

  // 5c: Enforce bidirectional — if A→B then ensure B→A (multi-pass)
  console.log('Enforcing bidirectional links...');
  const slugIndex = new Map<string, TopicData>();
  for (const t of topics) slugIndex.set(t.slug, t);

  let totalAdded = 0;
  for (let pass = 0; pass < 3; pass++) {
    let added = 0;
    for (const topic of topics) {
      for (const relSlug of [...topic.relatedTopics]) {
        const other = slugIndex.get(relSlug);
        if (!other) continue;
        if (!other.relatedTopics.includes(topic.slug)) {
          if (other.relatedTopics.length < MAX_RELATED_AFTER_BACKFILL) {
            other.relatedTopics.push(topic.slug);
            added++;
          } else {
            // Replace weakest non-bidirectional link
            const otherScores = coScores.get(other.slug) || new Map();
            const myScore = otherScores.get(topic.slug) || 0;
            let weakestIdx = -1;
            let weakestScore = Infinity;
            for (let i = 0; i < other.relatedTopics.length; i++) {
              const existingSlug = other.relatedTopics[i];
              const existingScore = otherScores.get(existingSlug) || 0;
              const existingTopic = slugIndex.get(existingSlug);
              const isBidirectional = existingTopic?.relatedTopics.includes(other.slug);
              if (!isBidirectional && existingScore < weakestScore) {
                weakestScore = existingScore;
                weakestIdx = i;
              }
            }
            if (weakestIdx >= 0 && myScore >= weakestScore) {
              other.relatedTopics[weakestIdx] = topic.slug;
              added++;
            }
          }
        }
      }
    }
    totalAdded += added;
    console.log(`  Pass ${pass + 1}: added ${added} backlinks`);
    if (added === 0) break;
  }
  console.log(`  Total: ${totalAdded} backlinks added.`);

  // Step 6: Output
  const output = { topics };
  const json = JSON.stringify(output, null, 2);

  fs.writeFileSync(OUTPUT_PATH, json);
  console.log(`\nWrote ${topics.length} topics to ${OUTPUT_PATH}`);
  console.log(`File size: ${(Buffer.byteLength(json) / 1024 / 1024).toFixed(1)} MB`);

  // Stats
  const catCounts: Record<string, number> = {};
  for (const t of topics) {
    catCounts[t.category] = (catCounts[t.category] || 0) + 1;
  }

  console.log('\nCategory distribution:');
  Object.entries(catCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count}`);
    });

  // Verify no duplicate slugs
  const allSlugs = topics.map(t => t.slug);
  const uniqueSlugs = new Set(allSlugs);
  if (allSlugs.length !== uniqueSlugs.size) {
    console.error(`WARNING: ${allSlugs.length - uniqueSlugs.size} duplicate slugs found!`);
  } else {
    console.log(`\nNo duplicate slugs (${uniqueSlugs.size} unique).`);
  }

  // Count topics with 0 verses (shouldn't happen)
  const emptyTopics = topics.filter(t => t.verseRefs.length === 0);
  if (emptyTopics.length > 0) {
    console.error(`WARNING: ${emptyTopics.length} topics have 0 verses!`);
  } else {
    console.log('All topics have at least 1 verse reference.');
  }
}

main();
