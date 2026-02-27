/**
 * process-bible-quotes.ts
 *
 * Merges three data sources into consolidated data/bible-quotes.json:
 * 1. data/topics.json — 6,700 topics with curated verse refs
 * 2. data/naves-topics.json — 5,319 Nave's topics with exhaustive verse refs
 * 3. MetaV CSVs — 92,610 verse-topic mappings from Torrey's + Nave's
 *
 * Consolidates duplicate/near-duplicate topics (e.g., worry + anxiety + anxious → one page)
 *
 * Run: npx tsx scripts/process-bible-quotes.ts
 */

import fs from 'fs';
import path from 'path';

// ============================================
// VERSE ID MAPPING (MetaV uses sequential IDs)
// ============================================

const BOOKS: [string, string, number[]][] = [
  ['genesis', 'Genesis', [31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26]],
  ['exodus', 'Exodus', [22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38]],
  ['leviticus', 'Leviticus', [17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34]],
  ['numbers', 'Numbers', [54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13]],
  ['deuteronomy', 'Deuteronomy', [46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12]],
  ['joshua', 'Joshua', [18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33]],
  ['judges', 'Judges', [36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25]],
  ['ruth', 'Ruth', [22,23,18,22]],
  ['1-samuel', '1 Samuel', [28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13]],
  ['2-samuel', '2 Samuel', [27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25]],
  ['1-kings', '1 Kings', [53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53]],
  ['2-kings', '2 Kings', [18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30]],
  ['1-chronicles', '1 Chronicles', [54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30]],
  ['2-chronicles', '2 Chronicles', [17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23]],
  ['ezra', 'Ezra', [11,70,13,24,17,22,28,36,15,44]],
  ['nehemiah', 'Nehemiah', [11,20,32,23,19,19,73,18,38,39,36,47,31]],
  ['esther', 'Esther', [22,23,15,17,14,14,10,17,32,3]],
  ['job', 'Job', [22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17]],
  ['psalms', 'Psalms', [6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,10,12,20,72,13,19,16,8,18,12,13,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6]],
  ['proverbs', 'Proverbs', [33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31]],
  ['ecclesiastes', 'Ecclesiastes', [18,26,22,16,20,12,29,17,18,20,10,14]],
  ['song-of-solomon', 'Song of Solomon', [17,17,11,16,16,13,13,14]],
  ['isaiah', 'Isaiah', [31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24]],
  ['jeremiah', 'Jeremiah', [19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34]],
  ['lamentations', 'Lamentations', [22,22,66,22,22]],
  ['ezekiel', 'Ezekiel', [28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35]],
  ['daniel', 'Daniel', [21,49,30,37,31,28,28,27,27,21,45,13]],
  ['hosea', 'Hosea', [11,23,5,19,15,11,16,14,17,15,12,14,16,9]],
  ['joel', 'Joel', [20,32,21]],
  ['amos', 'Amos', [15,16,15,13,27,14,17,14,15]],
  ['obadiah', 'Obadiah', [21]],
  ['jonah', 'Jonah', [17,10,10,11]],
  ['micah', 'Micah', [16,13,12,13,15,16,20]],
  ['nahum', 'Nahum', [15,13,19]],
  ['habakkuk', 'Habakkuk', [17,20,19]],
  ['zephaniah', 'Zephaniah', [18,15,20]],
  ['haggai', 'Haggai', [15,23]],
  ['zechariah', 'Zechariah', [21,13,10,14,11,15,14,23,17,12,17,14,9,21]],
  ['malachi', 'Malachi', [14,17,18,6]],
  ['matthew', 'Matthew', [25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20]],
  ['mark', 'Mark', [45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20]],
  ['luke', 'Luke', [80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53]],
  ['john', 'John', [51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25]],
  ['acts', 'Acts', [26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31]],
  ['romans', 'Romans', [32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27]],
  ['1-corinthians', '1 Corinthians', [31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24]],
  ['2-corinthians', '2 Corinthians', [24,17,18,18,21,18,16,24,15,18,33,21,14]],
  ['galatians', 'Galatians', [24,21,29,31,26,18]],
  ['ephesians', 'Ephesians', [23,22,21,32,33,24]],
  ['philippians', 'Philippians', [30,30,21,23]],
  ['colossians', 'Colossians', [29,23,25,18]],
  ['1-thessalonians', '1 Thessalonians', [10,20,13,18,28]],
  ['2-thessalonians', '2 Thessalonians', [12,17,18]],
  ['1-timothy', '1 Timothy', [20,15,16,16,25,21]],
  ['2-timothy', '2 Timothy', [18,26,17,22]],
  ['titus', 'Titus', [16,15,15]],
  ['philemon', 'Philemon', [25]],
  ['hebrews', 'Hebrews', [14,18,19,16,14,20,28,13,28,39,40,29,25]],
  ['james', 'James', [27,26,18,17,20]],
  ['1-peter', '1 Peter', [25,25,22,19,14]],
  ['2-peter', '2 Peter', [21,22,18]],
  ['1-john', '1 John', [10,29,24,21,21]],
  ['2-john', '2 John', [13]],
  ['3-john', '3 John', [14]],
  ['jude', 'Jude', [25]],
  ['revelation', 'Revelation', [20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21]],
];

// Build MetaV VerseID → book-chapter-verse reference mapping
function buildVerseIdMap(): Map<number, string> {
  const map = new Map<number, string>();
  let vid = 1;
  for (const [slug, , chapters] of BOOKS) {
    for (let ch = 0; ch < chapters.length; ch++) {
      for (let v = 1; v <= chapters[ch]; v++) {
        map.set(vid, `${slug}-${ch + 1}-${v}`);
        vid++;
      }
    }
  }
  return map;
}

// ============================================
// CONSOLIDATION RULES — map many slugs to one canonical
// ============================================

const CONSOLIDATION_MAP: Record<string, { canonical: string; name: string; category: string }> = {};

// Helper to register a consolidation group
function registerGroup(canonical: string, name: string, category: string, slugs: string[]) {
  for (const s of slugs) {
    CONSOLIDATION_MAP[s] = { canonical, name, category };
  }
}

// Emotional & Mental Health
registerGroup('love', 'Love', 'Emotions & Relationships', [
  'love', 'loving', 'gods-love', 'love-of-god', 'loving-god', 'love-one-another',
  'loving-one-another', 'loving-others', 'unconditional-love', 'agape-love',
  'christian-love', 'brotherly-love', 'love-your-neighbor', 'loving-your-neighbor',
  'love-thy-neighbor', 'love-your-enemies', 'loving-your-enemies', 'a-time-for-love',
  'the-love-of-god', 'the-love', 'love-bible-verses', 'love-scripture',
]);

registerGroup('faith', 'Faith', 'Christian Living', [
  'faith', 'faithfulness', 'having-faith', 'faith-in-god', 'faith-in-jesus',
  'faith-and-works', 'growing-in-faith', 'lack-of-faith', 'little-faith',
  'strong-faith', 'weak-faith', 'faith-over-fear', 'mustard-seed-faith',
  'the-faith', 'faith-bible-verses', 'faith-scripture',
]);

registerGroup('hope', 'Hope', 'Emotions & Relationships', [
  'hope', 'hoping', 'hopelessness', 'hope-in-god', 'hope-in-christ',
  'losing-hope', 'finding-hope', 'hope-for-the-future', 'the-hope',
]);

registerGroup('peace', 'Peace', 'Emotions & Relationships', [
  'peace', 'peacemaking', 'peace-of-mind', 'peace-of-god', 'inner-peace',
  'finding-peace', 'peace-in-the-storm', 'the-peace',
]);

registerGroup('joy', 'Joy', 'Emotions & Relationships', [
  'joy', 'joyful', 'joyfulness', 'happiness', 'happy', 'being-happy',
  'gladness', 'rejoicing', 'rejoice', 'the-joy',
]);

registerGroup('worry', 'Worry & Anxiety', 'Emotions & Relationships', [
  'worry', 'worrying', 'anxiety', 'anxious', 'being-anxious',
  'overcoming-anxiety', 'dealing-with-anxiety', 'anxiety-relief',
  'worry-and-anxiety', 'worries', 'the-anxiety', 'the-worry',
]);

registerGroup('fear', 'Fear', 'Emotions & Relationships', [
  'fear', 'fears', 'fearful', 'being-afraid', 'overcoming-fear',
  'the-fear',
]);

registerGroup('anger', 'Anger', 'Emotions & Relationships', [
  'anger', 'angry', 'being-angry', 'rage', 'anger-management',
  'overcoming-anger', 'the-anger',
]);

registerGroup('grief', 'Grief & Loss', 'Emotions & Relationships', [
  'grief', 'grieving', 'bereavement', 'mourning', 'loss',
  'loss-of-a-loved-one', 'losing-a-loved-one', 'coping-with-loss',
  'overcoming-grief', 'grief-and-loss', 'the-grief',
]);

registerGroup('depression', 'Depression', 'Emotions & Relationships', [
  'depression', 'depressed', 'feeling-depressed', 'overcoming-depression',
  'dealing-with-depression', 'sadness', 'sorrow', 'despair',
]);

registerGroup('loneliness', 'Loneliness', 'Emotions & Relationships', [
  'loneliness', 'lonely', 'being-alone', 'isolation', 'feeling-alone',
  'abandoned', 'abandonment',
]);

registerGroup('courage', 'Courage', 'Character & Virtues', [
  'courage', 'courageous', 'bravery', 'brave', 'boldness', 'bold',
  'fearless', 'fearlessness',
]);

registerGroup('strength', 'Strength', 'Character & Virtues', [
  'strength', 'strong', 'being-strong', 'inner-strength', 'gods-strength',
  'strength-in-hard-times', 'strength-in-weakness', 'spiritual-strength',
  'finding-strength', 'the-strength',
]);

// Spiritual Life
registerGroup('prayer', 'Prayer', 'Spiritual Life', [
  'prayer', 'praying', 'prayers', 'power-of-prayer', 'prayer-life',
  'how-to-pray', 'praying-for-others', 'praying-together',
  'answered-prayer', 'answered-prayers', 'unanswered-prayers',
  'morning-prayer', 'evening-prayer', 'night-prayer', 'the-prayer',
]);

registerGroup('forgiveness', 'Forgiveness', 'Spiritual Life', [
  'forgiveness', 'forgiving', 'forgiving-others', 'forgiving-yourself',
  'gods-forgiveness', 'forgiveness-of-sins', 'unforgiveness',
  'asking-for-forgiveness', 'the-forgiveness',
]);

registerGroup('healing', 'Healing', 'Spiritual Life', [
  'healing', 'gods-healing', 'divine-healing', 'spiritual-healing',
  'emotional-healing', 'healing-prayer', 'healing-scriptures',
  'physical-healing', 'healing-the-sick', 'the-healing',
]);

registerGroup('salvation', 'Salvation', 'Theology & Doctrine', [
  'salvation', 'saved', 'being-saved', 'born-again', 'accepting-christ',
  'accepting-jesus', 'getting-saved', 'the-salvation',
]);

registerGroup('grace', 'Grace', 'Theology & Doctrine', [
  'grace', 'gods-grace', 'grace-of-god', 'amazing-grace',
  'saving-grace', 'unmerited-favor', 'the-grace',
]);

registerGroup('repentance', 'Repentance', 'Spiritual Life', [
  'repentance', 'repenting', 'repent', 'turning-from-sin',
  'confession', 'confessing-sins', 'the-repentance',
]);

registerGroup('worship', 'Worship', 'Spiritual Life', [
  'worship', 'worshipping', 'worshiping', 'praise', 'praising',
  'praising-god', 'praise-and-worship', 'worship-music', 'the-worship',
]);

registerGroup('trust', 'Trust in God', 'Christian Living', [
  'trust', 'trusting', 'trusting-god', 'trust-in-god', 'trust-in-the-lord',
  'trusting-in-god', 'trusting-the-lord', 'trusting-gods-plan', 'the-trust',
]);

registerGroup('patience', 'Patience', 'Character & Virtues', [
  'patience', 'patient', 'being-patient', 'impatience', 'waiting',
  'waiting-on-god', 'waiting-on-the-lord', 'gods-timing',
  'divine-timing', 'perfect-timing', 'the-patience',
]);

registerGroup('wisdom', 'Wisdom', 'Character & Virtues', [
  'wisdom', 'wise', 'discernment', 'godly-wisdom', 'wisdom-of-god',
  'seeking-wisdom', 'the-wisdom',
]);

registerGroup('humility', 'Humility', 'Character & Virtues', [
  'humility', 'humble', 'being-humble', 'meekness', 'meek',
  'lowliness', 'modesty', 'the-humility',
]);

// Family & Relationships
registerGroup('marriage', 'Marriage', 'Family & Relationships', [
  'marriage', 'a-healthy-marriage', 'christian-marriage', 'marriage-problems',
  'marriage-restoration', 'saving-your-marriage', 'husband-and-wife',
  'the-marriage',
]);

registerGroup('children', 'Children & Parenting', 'Family & Relationships', [
  'children', 'child', 'raising-children', 'parenting', 'parents',
  'parenthood', 'being-a-parent', 'training-children', 'disciplining-children',
  'the-children',
]);

registerGroup('friendship', 'Friendship', 'Family & Relationships', [
  'friendship', 'friends', 'true-friendship', 'good-friends', 'bad-friends',
  'choosing-friends', 'christian-friendship', 'the-friendship',
]);

// Sin & Temptation
registerGroup('temptation', 'Temptation', 'Sin & Temptation', [
  'temptation', 'tempted', 'being-tempted', 'overcoming-temptation',
  'resisting-temptation', 'the-temptation',
]);

registerGroup('sin', 'Sin', 'Sin & Temptation', [
  'sin', 'sinning', 'sinful', 'sinner', 'sinners', 'original-sin',
  'falling-into-sin', 'overcoming-sin', 'sin-nature', 'the-sin',
]);

registerGroup('pride', 'Pride', 'Sin & Temptation', [
  'pride', 'proud', 'arrogance', 'arrogant', 'haughty', 'boasting',
  'bragging', 'conceit', 'vanity', 'vain', 'self-righteousness', 'the-pride',
]);

registerGroup('jealousy', 'Jealousy & Envy', 'Sin & Temptation', [
  'jealousy', 'jealous', 'envy', 'envious', 'covetousness', 'coveting',
  'covet', 'the-jealousy', 'the-envy',
]);

registerGroup('lying', 'Lying & Deception', 'Sin & Temptation', [
  'lying', 'lies', 'liar', 'liars', 'dishonesty', 'deception', 'deceit',
  'false-witness', 'the-lying',
]);

registerGroup('gossip', 'Gossip', 'Sin & Temptation', [
  'gossip', 'gossiping', 'slander', 'rumors', 'backbiting',
  'speaking-ill', 'taming-the-tongue', 'the-gossip',
]);

// Theology
registerGroup('heaven', 'Heaven', 'Theology & Doctrine', [
  'heaven', 'heavenly', 'paradise', 'kingdom-of-heaven', 'kingdom-of-god',
  'the-heaven',
]);

registerGroup('hell', 'Hell', 'Theology & Doctrine', [
  'hell', 'hades', 'sheol', 'lake-of-fire', 'eternal-punishment',
  'damnation', 'perdition', 'the-hell',
]);

registerGroup('holy-spirit', 'Holy Spirit', 'Theology & Doctrine', [
  'holy-spirit', 'the-holy-spirit', 'holy-ghost', 'spirit-of-god',
  'gifts-of-the-spirit', 'fruit-of-the-spirit', 'fruits-of-the-spirit',
]);

registerGroup('eternal-life', 'Eternal Life', 'Theology & Doctrine', [
  'eternal-life', 'afterlife', 'life-after-death', 'the-eternal-life',
]);

registerGroup('death', 'Death', 'Life Events', [
  'death', 'dying', 'death-of-a-loved-one', 'death-of-a-child',
  'death-of-a-parent', 'death-of-a-spouse', 'fear-of-death',
  'death-and-resurrection', 'the-death',
]);

// Life & Practical
registerGroup('money', 'Money & Finances', 'Practical Living', [
  'money', 'wealth', 'riches', 'prosperity', 'financial-blessings',
  'financial-stress', 'financial-wisdom', 'debt', 'greed', 'the-money',
  'the-wealth',
]);

registerGroup('giving', 'Giving & Generosity', 'Practical Living', [
  'giving', 'generosity', 'tithing', 'tithes', 'offering',
  'stewardship', 'the-giving',
]);

registerGroup('work', 'Work & Diligence', 'Practical Living', [
  'work', 'working', 'hard-work', 'work-ethic', 'laziness', 'lazy',
  'diligence', 'diligent', 'the-work',
]);

registerGroup('self-control', 'Self-Control', 'Character & Virtues', [
  'self-control', 'self-discipline', 'discipline', 'self-restraint',
  'temperance', 'moderation', 'the-self-control',
]);

registerGroup('gratitude', 'Gratitude & Thanksgiving', 'Character & Virtues', [
  'gratitude', 'thankfulness', 'thankful', 'thanksgiving', 'being-thankful',
  'giving-thanks', 'the-gratitude',
]);

registerGroup('obedience', 'Obedience', 'Christian Living', [
  'obedience', 'obedient', 'obeying-god', 'disobedience', 'rebellion',
  'rebellious', 'the-obedience',
]);

registerGroup('comfort', 'Comfort', 'Emotions & Relationships', [
  'comfort', 'comforting', 'consolation', 'gods-comfort',
  'finding-comfort', 'the-comfort',
]);

registerGroup('protection', 'God\'s Protection', 'Christian Living', [
  'protection', 'gods-protection', 'divine-protection', 'safety',
  'security', 'refuge', 'shelter', 'shield', 'the-protection',
]);

registerGroup('blessings', 'Blessings', 'Christian Living', [
  'blessings', 'blessed', 'being-blessed', 'gods-blessings',
  'counting-blessings', 'blessing-others', 'the-blessings',
]);

registerGroup('suffering', 'Suffering & Trials', 'Life Events', [
  'suffering', 'pain', 'trials', 'tribulation', 'tribulations',
  'hardship', 'hardships', 'adversity', 'persecution', 'endurance',
  'perseverance', 'enduring', 'the-suffering',
]);

registerGroup('doubt', 'Doubt', 'Spiritual Life', [
  'doubt', 'doubting', 'doubting-god', 'unbelief', 'questioning-god',
  'the-doubt',
]);

registerGroup('addiction', 'Addiction & Recovery', 'Life Events', [
  'addiction', 'addictions', 'drug-addiction', 'alcohol', 'alcoholism',
  'drunkenness', 'sobriety', 'recovery', 'overcoming-addiction',
  'the-addiction',
]);

registerGroup('divorce', 'Divorce', 'Family & Relationships', [
  'divorce', 'divorced', 'remarriage', 'remarrying', 'separation',
  'the-divorce',
]);

registerGroup('fasting', 'Fasting', 'Spiritual Life', [
  'fasting', 'fast', 'fasting-and-prayer', 'the-fasting',
]);

registerGroup('baptism', 'Baptism', 'Theology & Doctrine', [
  'baptism', 'baptized', 'being-baptized', 'water-baptism',
  'baptism-of-the-holy-spirit', 'the-baptism',
]);

registerGroup('wrath-of-god', 'Wrath of God', 'Theology & Doctrine', [
  'wrath', 'wrath-of-god', 'gods-anger', 'gods-wrath', 'the-wrath',
]);

registerGroup('fear-of-god', 'Fear of the Lord', 'Spiritual Life', [
  'fear-of-god', 'fear-of-the-lord', 'fearing-god', 'fear-god',
  'the-fear-of-god', 'the-fear-of-the-lord',
]);

registerGroup('lust', 'Lust', 'Sin & Temptation', [
  'lust', 'lustful', 'sexual-temptation', 'sexual-immorality',
  'pornography', 'the-lust',
]);

registerGroup('ten-commandments', 'Ten Commandments', 'Theology & Doctrine', [
  '10-commandments', 'ten-commandments', 'living-by-the-ten-commandments',
  'the-10-commandments', 'the-ten-commandments',
]);

// ============================================
// REFERENCE NORMALIZER
// ============================================

const NAME_TO_SLUG: Record<string, string> = {};
for (const [slug, name] of BOOKS) {
  NAME_TO_SLUG[name.toLowerCase()] = slug;
  // Also handle common variants
  NAME_TO_SLUG[slug] = slug;
}
// Additional name variants
const EXTRA_NAMES: Record<string, string> = {
  'gen': 'genesis', 'exod': 'exodus', 'lev': 'leviticus', 'num': 'numbers',
  'deut': 'deuteronomy', 'josh': 'joshua', 'judg': 'judges',
  'psa': 'psalms', 'psalm': 'psalms', 'pro': 'proverbs', 'prov': 'proverbs',
  'ecc': 'ecclesiastes', 'eccles': 'ecclesiastes',
  'isa': 'isaiah', 'jer': 'jeremiah', 'lam': 'lamentations',
  'ezek': 'ezekiel', 'dan': 'daniel', 'hos': 'hosea',
  'obad': 'obadiah', 'mic': 'micah', 'nah': 'nahum',
  'hab': 'habakkuk', 'zeph': 'zephaniah', 'hag': 'haggai',
  'zech': 'zechariah', 'mal': 'malachi',
  'matt': 'matthew', 'mat': 'matthew',
  'luk': 'luke', 'joh': 'john', 'jhn': 'john',
  'rom': 'romans', 'gal': 'galatians', 'eph': 'ephesians',
  'phil': 'philippians', 'col': 'colossians', 'tit': 'titus',
  'phm': 'philemon', 'philem': 'philemon',
  'heb': 'hebrews', 'jas': 'james', 'jam': 'james',
  'rev': 'revelation',
  'song of songs': 'song-of-solomon', 'canticles': 'song-of-solomon',
  'song of solomon': 'song-of-solomon',
  '1 samuel': '1-samuel', '2 samuel': '2-samuel',
  '1 kings': '1-kings', '2 kings': '2-kings',
  '1 chronicles': '1-chronicles', '2 chronicles': '2-chronicles',
  '1 corinthians': '1-corinthians', '2 corinthians': '2-corinthians',
  '1 thessalonians': '1-thessalonians', '2 thessalonians': '2-thessalonians',
  '1 timothy': '1-timothy', '2 timothy': '2-timothy',
  '1 peter': '1-peter', '2 peter': '2-peter',
  '1 john': '1-john', '2 john': '2-john', '3 john': '3-john',
  'i samuel': '1-samuel', 'ii samuel': '2-samuel',
  'i kings': '1-kings', 'ii kings': '2-kings',
  'i chronicles': '1-chronicles', 'ii chronicles': '2-chronicles',
  'i corinthians': '1-corinthians', 'ii corinthians': '2-corinthians',
  'i thessalonians': '1-thessalonians', 'ii thessalonians': '2-thessalonians',
  'i timothy': '1-timothy', 'ii timothy': '2-timothy',
  'i peter': '1-peter', 'ii peter': '2-peter',
  'i john': '1-john', 'ii john': '2-john', 'iii john': '3-john',
};
for (const [k, v] of Object.entries(EXTRA_NAMES)) {
  NAME_TO_SLUG[k] = v;
}

/**
 * Normalize any verse reference to slug format: book-chapter-verse
 * Handles: "Exodus 20:6", "1 Corinthians 13:4", "Deuteronomy 11:1,13,22",
 *          "genesis-1-1", "GEN 1:1", etc.
 * Returns array (multiple refs if comma-separated verses)
 */
function normalizeRef(ref: string): string[] {
  // Already in slug format?
  if (/^[a-z0-9]+-\d+-\d+$/.test(ref)) {
    return [ref];
  }

  // Try "Book Chapter:Verse" format
  const match = ref.match(/^(.+?)\s+(\d+):(.+)$/);
  if (match) {
    const bookName = match[1].toLowerCase().trim();
    const chapter = parseInt(match[2]);
    const versePart = match[3];
    const bookSlug = NAME_TO_SLUG[bookName];
    if (!bookSlug) return [];

    // Handle comma-separated verses: "11:1,13,22"
    const verseNums = versePart.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
    return verseNums.map(v => `${bookSlug}-${chapter}-${v}`);
  }

  // Try "Book Chapter" format (no verse — skip)
  return [];
}

// ============================================
// MAIN PROCESSING
// ============================================

interface QuoteTopic {
  slug: string;
  name: string;
  category: string;
  description: string;
  verseRefs: string[];      // Deduplicated, sorted canonical refs
  verseCount: number;
  sourceTopics: string[];   // Original slugs that were merged
  subtopics: string[];      // Subtopic labels from Nave's/MetaV
  relatedSlugs: string[];   // Related consolidated slugs
  keywords: string[];
}

async function main() {
  console.log('=== Processing Bible Quotes Data ===\n');

  // 1. Build MetaV verse ID mapping
  const verseIdMap = buildVerseIdMap();
  console.log(`Built verse ID map: ${verseIdMap.size} entries`);

  // 2. Load MetaV topics + index
  const metavTopicsRaw = fs.readFileSync('/tmp/metav-topics.csv', 'utf-8');
  const metavIndexRaw = fs.readFileSync('/tmp/metav-topicindex.csv', 'utf-8');

  // Parse MetaV topics CSV
  const metavTopics = new Map<number, { topic: string; subtopic: string }>();
  for (const line of metavTopicsRaw.split('\n').slice(1)) {
    const match = line.match(/"(\d+)","([^"]+)","([^"]*)"/);
    if (match) {
      metavTopics.set(parseInt(match[1]), { topic: match[2], subtopic: match[3] });
    }
  }
  console.log(`Loaded MetaV topics: ${metavTopics.size} entries`);

  // Parse MetaV topic index CSV
  const metavIndex = new Map<number, number[]>(); // topicId → verseIds
  for (const line of metavIndexRaw.split('\n').slice(1)) {
    const match = line.match(/"(\d+)","(\d+)"/);
    if (match) {
      const tid = parseInt(match[1]);
      const vid = parseInt(match[2]);
      if (!metavIndex.has(tid)) metavIndex.set(tid, []);
      metavIndex.get(tid)!.push(vid);
    }
  }
  console.log(`Loaded MetaV index: ${metavIndex.size} topic-verse groups`);

  // Group MetaV by top-level topic slug
  const metavBySlug = new Map<string, { subtopics: string[]; verseRefs: Set<string> }>();
  for (const [tid, entry] of metavTopics) {
    const slug = entry.topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (!metavBySlug.has(slug)) {
      metavBySlug.set(slug, { subtopics: [], verseRefs: new Set() });
    }
    const group = metavBySlug.get(slug)!;

    if (entry.subtopic) {
      group.subtopics.push(entry.subtopic);
    }

    const verseIds = metavIndex.get(tid) || [];
    for (const vid of verseIds) {
      const ref = verseIdMap.get(vid);
      if (ref) group.verseRefs.add(ref);
    }
  }
  console.log(`MetaV grouped into ${metavBySlug.size} topic slugs`);

  // 3. Load topics.json
  const topicsRaw = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'topics.json'), 'utf-8'));
  const topics: any[] = topicsRaw.topics || topicsRaw;
  console.log(`Loaded topics.json: ${topics.length} topics`);

  // 4. Load naves-topics.json
  const navesRaw = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'naves-topics.json'), 'utf-8'));
  const naves: any[] = Array.isArray(navesRaw) ? navesRaw : navesRaw.topics || [];
  console.log(`Loaded naves-topics.json: ${naves.length} topics`);

  // Build Nave's slug → refs map
  const navesBySlug = new Map<string, { refs: Set<string>; subtopics: string[] }>();
  for (const n of naves) {
    const slug = n.slug;
    const refs = new Set<string>();
    const subtopicNames: string[] = [];

    // Extract refs from subTopics
    if (n.subTopics && Array.isArray(n.subTopics)) {
      for (const sub of n.subTopics) {
        if (sub.title) subtopicNames.push(sub.title);
        if (sub.verses && Array.isArray(sub.verses)) {
          for (const v of sub.verses) {
            // Nave's verse format varies — normalize all to slug format
            if (typeof v === 'string') {
              for (const nr of normalizeRef(v)) refs.add(nr);
            } else if (v.book && v.chapter && v.verse) {
              for (const nr of normalizeRef(`${v.book}-${v.chapter}-${v.verse}`)) refs.add(nr);
            } else if (v.ref) {
              for (const nr of normalizeRef(v.ref)) refs.add(nr);
            }
          }
        }
      }
    }

    // Also try entries format from naves-data.ts
    if (n.entries && Array.isArray(n.entries)) {
      for (const entry of n.entries) {
        if (entry.references && Array.isArray(entry.references)) {
          for (const r of entry.references) {
            if (r.bookSlug && r.chapter) {
              refs.add(`${r.bookSlug}-${r.chapter}-${r.verse || 1}`);
            }
          }
        }
      }
    }

    navesBySlug.set(slug, { refs, subtopics: subtopicNames });
  }
  console.log(`Nave's grouped into ${navesBySlug.size} topic slugs`);

  // 5. Now merge everything into consolidated topics
  const consolidated = new Map<string, QuoteTopic>();

  // Helper to get or create a consolidated topic
  function getOrCreate(slug: string): QuoteTopic {
    // Check if this slug should be consolidated
    const mapping = CONSOLIDATION_MAP[slug];
    const canonSlug = mapping ? mapping.canonical : slug;

    if (!consolidated.has(canonSlug)) {
      const name = mapping ? mapping.name : slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const cat = mapping ? mapping.category : 'Miscellaneous';
      consolidated.set(canonSlug, {
        slug: canonSlug,
        name,
        category: cat,
        description: '',
        verseRefs: [],
        verseCount: 0,
        sourceTopics: [],
        subtopics: [],
        relatedSlugs: [],
        keywords: [],
      });
    }
    return consolidated.get(canonSlug)!;
  }

  // 5a. Process topics.json
  const verseRefSets = new Map<string, Set<string>>(); // canonSlug → Set of verse refs

  for (const t of topics) {
    const entry = getOrCreate(t.slug);
    entry.sourceTopics.push(t.slug);

    if (!verseRefSets.has(entry.slug)) verseRefSets.set(entry.slug, new Set());
    const refSet = verseRefSets.get(entry.slug)!;

    // Add verse refs (normalize to slug format)
    const refs = typeof t.verseRefs === 'string' ? JSON.parse(t.verseRefs) : (t.verseRefs || []);
    for (const ref of refs) {
      for (const nr of normalizeRef(ref)) refSet.add(nr);
    }

    // Use the best description (prefer longer)
    if (t.description && t.description.length > entry.description.length) {
      entry.description = t.description;
    }

    // Collect keywords
    if (t.keywords && Array.isArray(t.keywords)) {
      for (const kw of t.keywords) {
        if (!entry.keywords.includes(kw)) entry.keywords.push(kw);
      }
    }

    // Collect related topics (will convert to consolidated slugs later)
    if (t.relatedTopics && Array.isArray(t.relatedTopics)) {
      for (const rel of t.relatedTopics) {
        const mapping = CONSOLIDATION_MAP[rel];
        const canonRel = mapping ? mapping.canonical : rel;
        if (canonRel !== entry.slug && !entry.relatedSlugs.includes(canonRel)) {
          entry.relatedSlugs.push(canonRel);
        }
      }
    }

    // Subtopics from topics.json
    if (t.subtopics && Array.isArray(t.subtopics)) {
      for (const sub of t.subtopics) {
        const label = typeof sub === 'string' ? sub : sub.name || sub.title || '';
        if (label && !entry.subtopics.includes(label)) {
          entry.subtopics.push(label);
        }
      }
    }
  }

  // 5b. Process Nave's data
  for (const [slug, data] of navesBySlug) {
    const entry = getOrCreate(slug);
    if (!entry.sourceTopics.includes(slug)) entry.sourceTopics.push(slug);

    if (!verseRefSets.has(entry.slug)) verseRefSets.set(entry.slug, new Set());
    const refSet = verseRefSets.get(entry.slug)!;

    for (const ref of data.refs) {
      for (const nr of normalizeRef(ref)) refSet.add(nr);
    }

    for (const sub of data.subtopics) {
      if (sub && !entry.subtopics.includes(sub)) {
        entry.subtopics.push(sub);
      }
    }
  }

  // 5c. Process MetaV data
  for (const [slug, data] of metavBySlug) {
    const entry = getOrCreate(slug);
    if (!entry.sourceTopics.includes(`metav:${slug}`)) {
      entry.sourceTopics.push(`metav:${slug}`);
    }

    if (!verseRefSets.has(entry.slug)) verseRefSets.set(entry.slug, new Set());
    const refSet = verseRefSets.get(entry.slug)!;

    for (const ref of data.verseRefs) {
      refSet.add(ref);
    }

    for (const sub of data.subtopics) {
      if (sub && !entry.subtopics.includes(sub)) {
        entry.subtopics.push(sub);
      }
    }
  }

  // 6. Finalize: sort refs, compute counts, write descriptions
  const result: QuoteTopic[] = [];

  for (const [canonSlug, entry] of consolidated) {
    const refSet = verseRefSets.get(canonSlug) || new Set();

    // Sort refs by canonical Bible order
    const sortedRefs = Array.from(refSet).sort((a, b) => {
      const partsA = a.split('-');
      const verseA = parseInt(partsA.pop() || '0');
      const chapA = parseInt(partsA.pop() || '0');
      const bookA = partsA.join('-');

      const partsB = b.split('-');
      const verseB = parseInt(partsB.pop() || '0');
      const chapB = parseInt(partsB.pop() || '0');
      const bookB = partsB.join('-');

      const orderA = BOOKS.findIndex(([s]) => s === bookA);
      const orderB = BOOKS.findIndex(([s]) => s === bookB);

      if (orderA !== orderB) return orderA - orderB;
      if (chapA !== chapB) return chapA - chapB;
      return verseA - verseB;
    });

    entry.verseRefs = sortedRefs;
    entry.verseCount = sortedRefs.length;

    // Generate a better description if current is generic
    if (!entry.description || entry.description.includes('recurring theme in Scripture')) {
      entry.description = `Discover ${entry.verseCount} Bible verses about ${entry.name.toLowerCase()}. This comprehensive collection of Scripture quotes reveals God's wisdom and guidance on ${entry.name.toLowerCase()}, with verses from across the Old and New Testaments.`;
    }

    // Trim subtopics to max 20
    entry.subtopics = entry.subtopics.slice(0, 20);

    // Only keep topics with at least 3 verses
    if (entry.verseCount >= 3) {
      result.push(entry);
    }
  }

  // Sort by verse count (descending) — most-referenced topics first
  result.sort((a, b) => b.verseCount - a.verseCount);

  console.log(`\n=== Results ===`);
  console.log(`Consolidated topics: ${result.length}`);
  console.log(`Total verse references: ${result.reduce((sum, t) => sum + t.verseCount, 0)}`);
  console.log(`\nTop 20 by verse count:`);
  for (const t of result.slice(0, 20)) {
    console.log(`  ${t.slug.padEnd(30)} ${String(t.verseCount).padStart(5)} verses  ${t.category}  (${t.sourceTopics.length} sources)`);
  }

  // Add unconsolidated topics from topics.json that weren't in any group
  // These are standalone topics that don't have duplicates
  const coveredSlugs = new Set<string>();
  for (const t of result) {
    coveredSlugs.add(t.slug);
    for (const src of t.sourceTopics) {
      coveredSlugs.add(src.replace('metav:', ''));
    }
  }

  console.log(`\nTopics in final output: ${result.length}`);

  // 7. Write output
  const outputPath = path.join(process.cwd(), 'data', 'bible-quotes.json');
  fs.writeFileSync(outputPath, JSON.stringify({ topics: result, generatedAt: new Date().toISOString(), totalVerseRefs: result.reduce((s, t) => s + t.verseCount, 0) }, null, 2));
  console.log(`\nWritten to ${outputPath}`);
  console.log(`File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(1)} MB`);
}

main().catch(console.error);
