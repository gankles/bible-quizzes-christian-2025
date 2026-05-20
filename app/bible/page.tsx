import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';

const SITE_URL = 'https://biblemaximum.com';

export const metadata: Metadata = {
  title: 'The Bible — Complete Guide to All 66 Books, History, Translations & How to Study It | Bible Maximum',
  description: 'Everything you need to know about the Bible: all 66 books explained, history, authorship, ancient manuscripts, major translations compared, key people, timeline, and how to read it. The most comprehensive Bible guide online.',
  keywords: ['bible', 'the bible', 'holy bible', 'bible books', 'books of the bible', 'bible history', 'bible translations', 'how to read the bible', 'bible overview', 'bible guide', 'old testament', 'new testament', 'bible study', 'bible facts', 'who wrote the bible', 'is the bible reliable', 'bible manuscripts', 'king james bible', 'bible reading plan'],
  alternates: { canonical: '/bible' },
  openGraph: {
    title: 'The Bible — Complete Guide to All 66 Books, History & Translations',
    description: 'Everything you need to know about the Bible in one comprehensive guide.',
    url: `${SITE_URL}/bible`,
    type: 'article',
    images: ['/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png'],
  },
};

// ─── Old Testament Books ─────────────────────────────────────

const OT_BOOKS = [
  { name: 'Genesis', author: 'Moses', chapters: 50, category: 'Law', theme: 'Creation, the fall, and God\'s covenant with Abraham' },
  { name: 'Exodus', author: 'Moses', chapters: 40, category: 'Law', theme: 'Israel\'s deliverance from Egypt and the giving of the Law' },
  { name: 'Leviticus', author: 'Moses', chapters: 27, category: 'Law', theme: 'Holiness, sacrificial system, and how to approach God' },
  { name: 'Numbers', author: 'Moses', chapters: 36, category: 'Law', theme: 'Israel\'s wilderness wandering and census records' },
  { name: 'Deuteronomy', author: 'Moses', chapters: 34, category: 'Law', theme: 'Moses\' farewell speeches and renewal of the covenant' },
  { name: 'Joshua', author: 'Joshua', chapters: 24, category: 'History', theme: 'Conquest and settlement of the Promised Land' },
  { name: 'Judges', author: 'Samuel (tradition)', chapters: 21, category: 'History', theme: 'Cycles of sin, oppression, and deliverance through judges' },
  { name: 'Ruth', author: 'Unknown', chapters: 4, category: 'History', theme: 'A Moabite woman\'s loyalty and place in the line of David' },
  { name: '1 Samuel', author: 'Samuel / Nathan / Gad', chapters: 31, category: 'History', theme: 'Israel\'s transition from judges to monarchy — Saul and David' },
  { name: '2 Samuel', author: 'Nathan / Gad', chapters: 24, category: 'History', theme: 'David\'s reign, triumphs, and failures' },
  { name: '1 Kings', author: 'Jeremiah (tradition)', chapters: 22, category: 'History', theme: 'Solomon\'s glory, the divided kingdom, and Elijah' },
  { name: '2 Kings', author: 'Jeremiah (tradition)', chapters: 25, category: 'History', theme: 'The fall of Israel and Judah — exile to Babylon' },
  { name: '1 Chronicles', author: 'Ezra (tradition)', chapters: 29, category: 'History', theme: 'David\'s reign retold with focus on temple worship' },
  { name: '2 Chronicles', author: 'Ezra (tradition)', chapters: 36, category: 'History', theme: 'Judah\'s kings from Solomon to the exile' },
  { name: 'Ezra', author: 'Ezra', chapters: 10, category: 'History', theme: 'Return from exile and rebuilding the temple' },
  { name: 'Nehemiah', author: 'Nehemiah', chapters: 13, category: 'History', theme: 'Rebuilding Jerusalem\'s walls and national renewal' },
  { name: 'Esther', author: 'Unknown', chapters: 10, category: 'History', theme: 'God\'s hidden providence saving the Jews in Persia' },
  { name: 'Job', author: 'Unknown', chapters: 42, category: 'Wisdom', theme: 'Why do the righteous suffer? God\'s sovereignty over suffering' },
  { name: 'Psalms', author: 'David and others', chapters: 150, category: 'Wisdom', theme: 'Prayers, praises, laments — the hymnbook of Israel' },
  { name: 'Proverbs', author: 'Solomon and others', chapters: 31, category: 'Wisdom', theme: 'Practical wisdom for everyday life' },
  { name: 'Ecclesiastes', author: 'Solomon', chapters: 12, category: 'Wisdom', theme: '"Vanity of vanities" — life without God is meaningless' },
  { name: 'Song of Solomon', author: 'Solomon', chapters: 8, category: 'Wisdom', theme: 'Romantic love as a picture of God\'s love for His people' },
  { name: 'Isaiah', author: 'Isaiah', chapters: 66, category: 'Major Prophet', theme: 'Judgment and comfort — the coming Messiah and His kingdom' },
  { name: 'Jeremiah', author: 'Jeremiah', chapters: 52, category: 'Major Prophet', theme: 'Warning of judgment, the new covenant, and Jerusalem\'s fall' },
  { name: 'Lamentations', author: 'Jeremiah', chapters: 5, category: 'Major Prophet', theme: 'Grief over Jerusalem\'s destruction — "His mercies are new every morning"' },
  { name: 'Ezekiel', author: 'Ezekiel', chapters: 48, category: 'Major Prophet', theme: 'Visions of God\'s glory departing and returning to Israel' },
  { name: 'Daniel', author: 'Daniel', chapters: 12, category: 'Major Prophet', theme: 'Faithfulness in exile and prophecies of future kingdoms' },
  { name: 'Hosea', author: 'Hosea', chapters: 14, category: 'Minor Prophet', theme: 'God\'s faithful love despite Israel\'s spiritual adultery' },
  { name: 'Joel', author: 'Joel', chapters: 3, category: 'Minor Prophet', theme: 'The Day of the Lord and the outpouring of the Spirit' },
  { name: 'Amos', author: 'Amos', chapters: 9, category: 'Minor Prophet', theme: 'Social justice and judgment on complacent Israel' },
  { name: 'Obadiah', author: 'Obadiah', chapters: 1, category: 'Minor Prophet', theme: 'Judgment on Edom for betraying Israel' },
  { name: 'Jonah', author: 'Jonah', chapters: 4, category: 'Minor Prophet', theme: 'God\'s mercy extends even to Israel\'s enemies' },
  { name: 'Micah', author: 'Micah', chapters: 7, category: 'Minor Prophet', theme: 'Bethlehem prophecy — the Messiah\'s birthplace foretold' },
  { name: 'Nahum', author: 'Nahum', chapters: 3, category: 'Minor Prophet', theme: 'The fall of Nineveh — God judges oppressive empires' },
  { name: 'Habakkuk', author: 'Habakkuk', chapters: 3, category: 'Minor Prophet', theme: '"The just shall live by faith" — trusting God amid injustice' },
  { name: 'Zephaniah', author: 'Zephaniah', chapters: 3, category: 'Minor Prophet', theme: 'Coming judgment and a future restoration of the humble' },
  { name: 'Haggai', author: 'Haggai', chapters: 2, category: 'Minor Prophet', theme: 'Rebuild the temple — put God\'s house before your own' },
  { name: 'Zechariah', author: 'Zechariah', chapters: 14, category: 'Minor Prophet', theme: 'Messianic visions — the coming King riding on a donkey' },
  { name: 'Malachi', author: 'Malachi', chapters: 4, category: 'Minor Prophet', theme: 'God\'s final Old Testament message — "Return to me"' },
];

// ─── New Testament Books ─────────────────────────────────────

const NT_BOOKS = [
  { name: 'Matthew', author: 'Matthew', chapters: 28, category: 'Gospel', theme: 'Jesus as the promised Messiah and King of Israel' },
  { name: 'Mark', author: 'Mark', chapters: 16, category: 'Gospel', theme: 'Jesus the Servant — fast-paced action and miracles' },
  { name: 'Luke', author: 'Luke', chapters: 24, category: 'Gospel', theme: 'Jesus the Son of Man — compassion for the outcasts' },
  { name: 'John', author: 'John', chapters: 21, category: 'Gospel', theme: 'Jesus the Son of God — "that you might believe"' },
  { name: 'Acts', author: 'Luke', chapters: 28, category: 'History', theme: 'The Holy Spirit launches the Church from Jerusalem to Rome' },
  { name: 'Romans', author: 'Paul', chapters: 16, category: 'Pauline Epistle', theme: 'The gospel explained systematically — justification by faith' },
  { name: '1 Corinthians', author: 'Paul', chapters: 16, category: 'Pauline Epistle', theme: 'Church problems addressed: division, immorality, spiritual gifts' },
  { name: '2 Corinthians', author: 'Paul', chapters: 13, category: 'Pauline Epistle', theme: 'Paul\'s most personal letter — strength in weakness' },
  { name: 'Galatians', author: 'Paul', chapters: 6, category: 'Pauline Epistle', theme: 'Freedom from the law — saved by grace through faith alone' },
  { name: 'Ephesians', author: 'Paul', chapters: 6, category: 'Pauline Epistle', theme: 'The Church as the body of Christ — unity and spiritual warfare' },
  { name: 'Philippians', author: 'Paul', chapters: 4, category: 'Pauline Epistle', theme: 'Joy in every circumstance — even prison' },
  { name: 'Colossians', author: 'Paul', chapters: 4, category: 'Pauline Epistle', theme: 'Christ is supreme over all creation and philosophy' },
  { name: '1 Thessalonians', author: 'Paul', chapters: 5, category: 'Pauline Epistle', theme: 'Living in light of Christ\'s return' },
  { name: '2 Thessalonians', author: 'Paul', chapters: 3, category: 'Pauline Epistle', theme: 'Clarifying the Day of the Lord and calling to faithful work' },
  { name: '1 Timothy', author: 'Paul', chapters: 6, category: 'Pastoral Epistle', theme: 'Instructions for church leadership and sound doctrine' },
  { name: '2 Timothy', author: 'Paul', chapters: 4, category: 'Pastoral Epistle', theme: 'Paul\'s final letter — "I have fought the good fight"' },
  { name: 'Titus', author: 'Paul', chapters: 3, category: 'Pastoral Epistle', theme: 'Organizing churches in Crete — grace that teaches godliness' },
  { name: 'Philemon', author: 'Paul', chapters: 1, category: 'Pauline Epistle', theme: 'A runaway slave returns — the gospel transforms relationships' },
  { name: 'Hebrews', author: 'Unknown', chapters: 13, category: 'General Epistle', theme: 'Jesus is better than everything — don\'t go back to the old system' },
  { name: 'James', author: 'James', chapters: 5, category: 'General Epistle', theme: 'Faith without works is dead — practical Christian living' },
  { name: '1 Peter', author: 'Peter', chapters: 5, category: 'General Epistle', theme: 'Suffering with hope — living as strangers in a hostile world' },
  { name: '2 Peter', author: 'Peter', chapters: 3, category: 'General Epistle', theme: 'Warning against false teachers and the certainty of Christ\'s return' },
  { name: '1 John', author: 'John', chapters: 5, category: 'General Epistle', theme: 'Assurance of salvation — God is light, God is love' },
  { name: '2 John', author: 'John', chapters: 1, category: 'General Epistle', theme: 'Guard against false teaching — truth and love together' },
  { name: '3 John', author: 'John', chapters: 1, category: 'General Epistle', theme: 'Hospitality to traveling missionaries and church leadership' },
  { name: 'Jude', author: 'Jude', chapters: 1, category: 'General Epistle', theme: 'Contend for the faith against creeping apostasy' },
  { name: 'Revelation', author: 'John', chapters: 22, category: 'Prophecy', theme: 'The final victory of Christ — "Behold, I make all things new"' },
];


// ─── Translations ────────────────────────────────────────────

const TRANSLATIONS = [
  { name: 'King James Version (KJV)', year: 1611, type: 'Formal Equivalence', reading: 'Grade 12', best: 'Memorization, public reading, poetic beauty', notes: 'The most influential English translation. 400+ years old and still the bestselling Bible annually.' },
  { name: 'New International Version (NIV)', year: 1978, type: 'Dynamic Equivalence', reading: 'Grade 7', best: 'General reading, church use, accessibility', notes: 'The most popular modern translation. Balances readability with faithfulness to original languages.' },
  { name: 'English Standard Version (ESV)', year: 2001, type: 'Formal Equivalence', reading: 'Grade 10', best: 'Study, preaching, theological precision', notes: 'Preferred by Reformed and evangelical churches for its word-for-word accuracy.' },
  { name: 'New American Standard (NASB)', year: 1971, type: 'Formal Equivalence', reading: 'Grade 11', best: 'Deep study, word-for-word accuracy', notes: 'The most literally translated major version. Scholars\' favorite for precision.' },
  { name: 'New Living Translation (NLT)', year: 1996, type: 'Dynamic Equivalence', reading: 'Grade 6', best: 'New believers, devotional reading, teens', notes: 'Thought-for-thought translation. Excellent for understanding meaning on first read.' },
  { name: 'New King James Version (NKJV)', year: 1982, type: 'Formal Equivalence', reading: 'Grade 9', best: 'Those who love KJV but want modern English', notes: 'Updates KJV language while keeping its cadence and manuscript tradition.' },
  { name: 'Christian Standard Bible (CSB)', year: 2017, type: 'Optimal Equivalence', reading: 'Grade 7', best: 'Balance of accuracy and readability', notes: 'Newest major translation. Uses "optimal equivalence" — as literal as possible, as free as necessary.' },
  { name: 'The Message (MSG)', year: 2002, type: 'Paraphrase', reading: 'Grade 4', best: 'Devotional, hearing familiar passages freshly', notes: 'Not a translation but a paraphrase by Eugene Peterson. Best used alongside a literal version.' },
];

// ─── Key People ──────────────────────────────────────────────

const KEY_PEOPLE = [
  { name: 'Abraham', testament: 'OT', role: 'Father of faith', significance: 'God\'s covenant with Abraham launches the story of Israel and ultimately points to Christ (Galatians 3:16).', ref: 'Genesis 12-25' },
  { name: 'Moses', testament: 'OT', role: 'Lawgiver & deliverer', significance: 'Led Israel out of Egypt, received the Ten Commandments, wrote the first five books of the Bible.', ref: 'Exodus-Deuteronomy' },
  { name: 'David', testament: 'OT', role: 'King & psalmist', significance: 'Israel\'s greatest king. God promised his descendant would reign forever — fulfilled in Jesus.', ref: '1-2 Samuel, Psalms' },
  { name: 'Solomon', testament: 'OT', role: 'Wisest king', significance: 'Built the temple, wrote Proverbs, Ecclesiastes, and Song of Solomon. His reign was Israel\'s golden age.', ref: '1 Kings 1-11' },
  { name: 'Isaiah', testament: 'OT', role: 'Major prophet', significance: 'Predicted the virgin birth, suffering servant, and coming kingdom with stunning detail 700 years before Christ.', ref: 'Isaiah' },
  { name: 'Jeremiah', testament: 'OT', role: 'Weeping prophet', significance: 'Warned Judah for 40 years, predicted the new covenant (Jeremiah 31:31-34) that Jesus fulfilled.', ref: 'Jeremiah, Lamentations' },
  { name: 'Daniel', testament: 'OT', role: 'Prophet in exile', significance: 'Survived the lion\'s den, received apocalyptic visions of world empires and the coming "Son of Man."', ref: 'Daniel' },
  { name: 'Elijah', testament: 'OT', role: 'Prophet of fire', significance: 'Called fire from heaven on Mount Carmel, confronted Ahab and Jezebel, taken to heaven in a chariot of fire.', ref: '1 Kings 17-2 Kings 2' },
  { name: 'Jesus Christ', testament: 'NT', role: 'Son of God, Savior', significance: 'The central figure of the entire Bible. Every Old Testament story points forward to Him; every New Testament book flows from Him.', ref: 'Matthew-John' },
  { name: 'Mary', testament: 'NT', role: 'Mother of Jesus', significance: 'A virgin chosen by God to bear the Messiah. Her faith: "Be it unto me according to thy word" (Luke 1:38).', ref: 'Luke 1-2, John 2, Acts 1' },
  { name: 'Peter', testament: 'NT', role: 'Apostle, church leader', significance: 'Fisherman turned rock. Denied Jesus three times, then preached the first sermon of the Church at Pentecost.', ref: 'Gospels, Acts 1-12, 1-2 Peter' },
  { name: 'Paul', testament: 'NT', role: 'Apostle to the Gentiles', significance: 'Persecutor turned missionary. Wrote 13 New Testament letters, planted churches across the Roman Empire.', ref: 'Acts 9-28, Romans-Philemon' },
  { name: 'John', testament: 'NT', role: 'Beloved disciple', significance: 'Closest to Jesus. Wrote the Gospel of John, three epistles, and Revelation. Lived longest of all apostles.', ref: 'John, 1-3 John, Revelation' },
  { name: 'Noah', testament: 'OT', role: 'Ark builder', significance: 'The one righteous man in a corrupt world. Built the ark, survived the flood, received God\'s rainbow covenant.', ref: 'Genesis 6-9' },
  { name: 'Joseph', testament: 'OT', role: 'Dreamer, ruler of Egypt', significance: 'Betrayed by brothers, sold into slavery, rose to save nations. His life is the clearest Old Testament picture of Christ.', ref: 'Genesis 37-50' },
  { name: 'Ruth', testament: 'OT', role: 'Loyal daughter-in-law', significance: 'A Moabite who chose Israel\'s God. Became great-grandmother of David — and ancestor of Jesus.', ref: 'Ruth' },
  { name: 'Esther', testament: 'OT', role: 'Queen of Persia', significance: 'Risked her life to save the Jews from genocide. "For such a time as this" (Esther 4:14).', ref: 'Esther' },
  { name: 'John the Baptist', testament: 'NT', role: 'Forerunner of Christ', significance: 'Prepared the way for Jesus. Baptized Him in the Jordan. Jesus called him the greatest born of women.', ref: 'Matthew 3, Luke 1, John 1' },
  { name: 'Stephen', testament: 'NT', role: 'First Christian martyr', significance: 'Preached a sermon recounting all of Israel\'s history, then was stoned to death. Saul (Paul) watched.', ref: 'Acts 6-7' },
  { name: 'Timothy', testament: 'NT', role: 'Young pastor', significance: 'Paul\'s spiritual son. Led the church at Ephesus. Recipient of two pastoral letters on leadership.', ref: '1-2 Timothy, Acts 16' },
];

// ─── Major Events Timeline ───────────────────────────────────

const MAJOR_EVENTS = [
  { date: '~4000 BC', event: 'Creation', description: 'God creates the heavens, earth, and humanity in His image.', ref: 'Genesis 1-2' },
  { date: '~2350 BC', event: 'The Flood', description: 'Global judgment on sin. Noah, his family, and the animals are saved through the ark.', ref: 'Genesis 6-9' },
  { date: '~2000 BC', event: 'Call of Abraham', description: 'God makes a covenant with Abraham — a nation, a land, and a blessing to all peoples.', ref: 'Genesis 12' },
  { date: '~1446 BC', event: 'The Exodus', description: 'God delivers Israel from 400 years of Egyptian slavery through Moses and 10 plagues.', ref: 'Exodus 1-15' },
  { date: '~1446 BC', event: 'The Law at Sinai', description: 'God gives the Ten Commandments and the Law to Moses on Mount Sinai.', ref: 'Exodus 19-20' },
  { date: '~1406 BC', event: 'Conquest of Canaan', description: 'Under Joshua, Israel crosses the Jordan and takes the Promised Land.', ref: 'Joshua 1-12' },
  { date: '~1010 BC', event: 'David Becomes King', description: 'The shepherd boy anointed by Samuel becomes Israel\'s greatest king.', ref: '2 Samuel 5' },
  { date: '~960 BC', event: 'Solomon\'s Temple Built', description: 'The first permanent house of worship for Israel, built in Jerusalem.', ref: '1 Kings 6-8' },
  { date: '722 BC', event: 'Fall of Israel (Northern Kingdom)', description: 'Assyria conquers the 10 northern tribes. They never return as a nation.', ref: '2 Kings 17' },
  { date: '586 BC', event: 'Fall of Judah / Babylonian Exile', description: 'Babylon destroys Jerusalem and the temple. Judah taken into 70-year exile.', ref: '2 Kings 25' },
  { date: '516 BC', event: 'Second Temple Completed', description: 'The returning exiles rebuild the temple under Zerubbabel.', ref: 'Ezra 6' },
  { date: '~5 BC', event: 'Birth of Jesus Christ', description: 'The Word becomes flesh. God enters human history in a Bethlehem stable.', ref: 'Matthew 1-2, Luke 2' },
  { date: '~AD 30', event: 'Crucifixion and Resurrection', description: 'Jesus dies for the sins of the world and rises on the third day.', ref: 'Matthew 27-28' },
  { date: 'AD 30', event: 'Pentecost', description: 'The Holy Spirit descends. Peter preaches. 3,000 are saved. The Church is born.', ref: 'Acts 2' },
  { date: '~AD 47-57', event: 'Paul\'s Missionary Journeys', description: 'Paul plants churches across the Roman Empire — Galatia, Corinth, Ephesus, Philippi, Rome.', ref: 'Acts 13-28' },
  { date: '~AD 95', event: 'Revelation Written', description: 'John, exiled on Patmos, receives the final vision — Christ returns and makes all things new.', ref: 'Revelation' },
];

// ─── Manuscript Evidence ─────────────────────────────────────

const MANUSCRIPTS = [
  { name: 'Dead Sea Scrolls', date: '~250 BC - AD 70', found: '1947, Qumran caves', significance: 'Contains portions of every OT book except Esther. Confirmed the Hebrew text was transmitted with extraordinary accuracy over 1,000+ years.' },
  { name: 'Codex Sinaiticus', date: '~AD 350', found: '1844, St. Catherine\'s Monastery (Sinai)', significance: 'One of the oldest complete New Testaments. Written in Greek uncial script on parchment.' },
  { name: 'Codex Vaticanus', date: '~AD 325', found: 'Vatican Library (cataloged since 1481)', significance: 'Oldest nearly complete Bible manuscript. Foundation for modern critical Greek texts.' },
  { name: 'Chester Beatty Papyri', date: '~AD 200', found: '1930s, Egypt', significance: 'Contains portions of the Gospels, Acts, Paul\'s letters, and Revelation from just 100-150 years after writing.' },
  { name: 'Bodmer Papyri', date: '~AD 175-225', found: '1952, Egypt', significance: 'P66 contains most of John\'s Gospel from within ~100 years of the original. Remarkably close to later manuscripts.' },
  { name: 'Rylands Papyrus (P52)', date: '~AD 125', found: '1920, Egypt', significance: 'Oldest known NT fragment — a piece of John 18. Written within 30-40 years of the original Gospel of John.' },
  { name: 'Total NT Manuscripts', date: 'Various', found: 'Worldwide', significance: '5,800+ Greek manuscripts, 10,000+ Latin, 9,300+ in other languages. No other ancient text comes close — Homer\'s Iliad has ~1,800.' },
];

// ─── Misconceptions ──────────────────────────────────────────

const MISCONCEPTIONS = [
  { myth: 'The Bible was written by one person', reality: 'Written by 40+ authors across 1,500 years — kings, fishermen, doctors, shepherds, tax collectors, and prophets.', why: 'The diversity of authors with a unified message is one of the strongest arguments for divine inspiration.' },
  { myth: 'The Bible has been changed over centuries', reality: 'The Dead Sea Scrolls (250 BC) match modern Hebrew texts with 99.5% accuracy after 1,000+ years of copying.', why: 'Jewish scribes had meticulous copying rules — counting every letter. The manuscript evidence shows remarkable preservation.' },
  { myth: 'The books were chosen by a political council', reality: 'The 27 NT books were widely recognized by churches within 100-200 years of writing. Councils confirmed what was already accepted.', why: 'The Council of Carthage (AD 397) didn\'t choose the books — it recognized the books churches had been using for centuries.' },
  { myth: 'The Bible contradicts science', reality: 'The Bible isn\'t a science textbook, but its claims don\'t conflict with observable science. It described a round earth (Isaiah 40:22) and the water cycle (Ecclesiastes 1:7) millennia before modern discovery.', why: 'Most "conflicts" arise from reading poetry as science or science as theology. Genre matters.' },
  { myth: 'The Old Testament God is different from the New Testament God', reality: 'The same God shows both justice and mercy throughout both testaments. The OT has grace (Psalm 103:8-12); the NT has judgment (Revelation 20:11-15).', why: 'Reading selectively creates a false contrast. God\'s character is consistent — He is both holy and loving.' },
  { myth: '"Thou shalt not kill" means all killing is wrong', reality: 'The Hebrew word ratsach means "murder" — premeditated, unlawful killing. The same law prescribed capital punishment for certain crimes.', why: 'Translation nuance matters. The commandment prohibits murder, not all taking of life (self-defense, just war, capital punishment are treated separately).' },
  { myth: 'The Bible endorses slavery', reality: 'Biblical "slavery" in Israel was closer to indentured servitude with strict protections (Deuteronomy 15:12-15). The NT planted the seeds that dismantled slavery — Galatians 3:28, Philemon.', why: 'The Bible regulated an existing institution while introducing principles (all made in God\'s image, master and slave equal before God) that ultimately ended it.' },
  { myth: 'There are "lost books" the Church suppressed', reality: 'The so-called "lost gospels" (Thomas, Judas, etc.) were written 100-300 years after Christ by Gnostic groups. Early Church fathers rejected them as forgeries.', why: 'These weren\'t lost — they were known and rejected because they contradicted eyewitness testimony and were written too late to be authentic.' },
];


// ─── FAQ ─────────────────────────────────────────────────────

const FAQ_ITEMS = [
  { question: 'How many books are in the Bible?', answer: '66 books — 39 in the Old Testament and 27 in the New Testament. Written by 40+ authors over approximately 1,500 years, yet telling one unified story of God\'s redemption of humanity through Jesus Christ.' },
  { question: 'Who wrote the Bible?', answer: 'About 40 different authors including kings (David, Solomon), prophets (Isaiah, Jeremiah), fishermen (Peter, John), a doctor (Luke), a tax collector (Matthew), a tentmaker (Paul), and a shepherd (Amos). Christians believe God inspired each writer through the Holy Spirit (2 Timothy 3:16).' },
  { question: 'How old is the Bible?', answer: 'The oldest books (Job, portions of Genesis) may date to ~2000-1500 BC. The newest (Revelation) was written around AD 95. That means the Bible was composed over roughly 1,500 years.' },
  { question: 'What is the difference between the Old and New Testament?', answer: 'The Old Testament (39 books) covers creation through ~400 BC — God\'s covenant with Israel, the Law, the prophets, and the promise of a coming Messiah. The New Testament (27 books) records the life of Jesus, the birth of the Church, and instructions for believers. The OT promises; the NT fulfills.' },
  { question: 'What is the best Bible translation?', answer: 'There is no single "best" translation — it depends on your purpose. For word-for-word accuracy: NASB or ESV. For readable study: NIV or CSB. For devotional reading: NLT. For memorization and public reading: KJV. Many serious students use two or three translations together.' },
  { question: 'How many verses are in the Bible?', answer: '31,102 verses total — 23,145 in the Old Testament and 7,957 in the New Testament. The middle verse is Psalm 118:8: "It is better to trust in the Lord than to put confidence in man."' },
  { question: 'What is the longest book in the Bible?', answer: 'Psalms is the longest by chapter count (150 chapters) and word count. The longest single narrative book is Jeremiah. The shortest book is 3 John with just 219 words in Greek (or 2 John by verse count with 13 verses).' },
  { question: 'Is the Bible historically reliable?', answer: 'Yes. Archaeological discoveries consistently confirm biblical accounts — the Hittite civilization, the pool of Siloam, Pontius Pilate\'s inscription, and hundreds more. The New Testament has 5,800+ Greek manuscripts, more than any other ancient document by a factor of 10.' },
  { question: 'Why are there so many Bible translations?', answer: 'Languages evolve, and translation philosophy differs. Some translations aim for word-for-word accuracy (formal equivalence), others for thought-for-thought clarity (dynamic equivalence). Multiple translations help readers understand nuances that a single version might miss.' },
  { question: 'What are the Dead Sea Scrolls?', answer: 'Ancient Jewish manuscripts discovered in caves near the Dead Sea in 1947. They contain copies of nearly every Old Testament book dating to 250 BC-AD 70 — over 1,000 years older than the previously oldest Hebrew manuscripts. They proved the Old Testament text was preserved with remarkable accuracy.' },
  { question: 'Where should I start reading the Bible?', answer: 'For new readers: start with the Gospel of John (who Jesus is), then Romans (what He accomplished). For Old Testament context: Genesis gives the foundation. For daily encouragement: Psalms and Proverbs. Don\'t try to read it cover-to-cover on your first attempt.' },
  { question: 'What language was the Bible originally written in?', answer: 'Three languages: Hebrew (most of the Old Testament), Aramaic (portions of Daniel and Ezra), and Koine Greek (the entire New Testament). Koine Greek was the common language of the Roman Empire, which is why God chose it for the New Testament — maximum reach.' },
  { question: 'Do Catholics and Protestants have different Bibles?', answer: 'Catholic Bibles include 7 additional Old Testament books called the Deuterocanon (or Apocrypha): Tobit, Judith, 1-2 Maccabees, Wisdom, Sirach, and Baruch. Protestants follow the 66-book canon. Both agree on all 27 New Testament books.' },
  { question: 'How long does it take to read the entire Bible?', answer: 'About 70-80 hours at average reading speed. That\'s roughly 12-15 minutes per day for a year. The Old Testament takes about 52 hours; the New Testament about 18 hours. Audio Bibles typically run 70-75 hours.' },
  { question: 'What is the central message of the Bible?', answer: 'God created humanity for relationship with Himself. Humanity rebelled (sin). God promised a Savior. That Savior — Jesus Christ — came, lived perfectly, died for sin, and rose again. Everyone who trusts in Him receives forgiveness and eternal life. That\'s the Bible in four sentences.' },
];

// ─── Helper ──────────────────────────────────────────────────

function bookSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-');
}


// ─── Page Component ──────────────────────────────────────────

export default function BiblePage() {
  const totalOTChapters = OT_BOOKS.reduce((sum, b) => sum + b.chapters, 0);
  const totalNTChapters = NT_BOOKS.reduce((sum, b) => sum + b.chapters, 0);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Bible — Complete Guide to All 66 Books, History, Translations & How to Study It',
    description: 'Everything you need to know about the Bible: all 66 books explained, history, authorship, ancient manuscripts, major translations compared, key people, and how to read it.',
    url: `${SITE_URL}/bible`,
    datePublished: '2026-03-09',
    dateModified: '2026-03-09',
    author: { '@type': 'Organization', name: 'Bible Maximum', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/bible` },
    about: [
      { '@type': 'Thing', name: 'Bible', sameAs: 'https://www.wikidata.org/wiki/Q1845' },
      { '@type': 'Thing', name: 'Old Testament', sameAs: 'https://www.wikidata.org/wiki/Q51636' },
      { '@type': 'Thing', name: 'New Testament', sameAs: 'https://www.wikidata.org/wiki/Q36279' },
    ],
    keywords: ['bible', 'holy bible', 'books of the bible', 'bible history', 'bible translations', 'old testament', 'new testament'],
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
      { '@type': 'ListItem', position: 2, name: 'The Bible', item: `${SITE_URL}/bible` },
    ],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <StructuredData data={articleSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-scripture via-scripture/60 to-scripture/80 text-white overflow-hidden">
        <Image src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png" alt="The Holy Bible" fill className="object-cover opacity-15" priority />
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <nav className="text-sacred/70 text-xs mb-6">
            <Link href="/" className="hover:text-white">Home</Link> <span className="mx-1">/</span> <span className="text-white">The Bible</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold font-display mb-4 leading-tight">
            The Bible
          </h1>
          <p className="text-lg md:text-xl text-sacred-light/90 max-w-3xl mx-auto leading-relaxed mb-3">
            66 books. 40+ authors. 1,500 years. One story.
          </p>
          <p className="text-sacred/70 max-w-2xl mx-auto leading-relaxed">
            The complete guide to the most published, most translated, most quoted, and most debated book in human history.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-10">

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { num: '66', label: 'Books' },
            { num: '1,189', label: 'Chapters' },
            { num: '31,102', label: 'Verses' },
            { num: '40+', label: 'Authors' },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-scripture dark:text-sacred">{s.num}</p>
              <p className="text-xs text-ink-muted dark:text-ink-light mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table of Contents */}
        <nav className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm p-6 mb-10">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-3">In This Guide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
            {[
              { id: 'what-is', label: 'What Is the Bible?' },
              { id: 'numbers', label: 'Bible by the Numbers' },
              { id: 'ot-books', label: '39 Old Testament Books' },
              { id: 'nt-books', label: '27 New Testament Books' },
              { id: 'ot-vs-nt', label: 'OT vs NT Comparison' },
              { id: 'authorship', label: 'Who Wrote the Bible?' },
              { id: 'how-written', label: 'How It Was Written' },
              { id: 'manuscripts', label: 'Manuscript Evidence' },
              { id: 'translations', label: 'Translations Compared' },
              { id: 'key-people', label: 'Key People' },
              { id: 'timeline', label: 'Major Events Timeline' },
              { id: 'one-story', label: 'One Story in 66 Books' },
              { id: 'misconceptions', label: 'Common Misconceptions' },
              { id: 'reliable', label: 'Is the Bible Reliable?' },
              { id: 'influence', label: 'Influence on the World' },
              { id: 'how-to-read', label: 'How to Read the Bible' },
              { id: 'reading-plans', label: 'Reading Plans' },
              { id: 'faq', label: 'FAQ (15 Questions)' },
            ].map((item) => (
              <Link key={item.id} href={`#${item.id}`} className="text-sacred hover:underline text-sm py-1">
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* What Is the Bible? */}
        <section id="what-is" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">What Is the Bible?</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            The Bible is a collection of 66 books written over approximately 1,500 years by more than 40 different authors on three continents in three languages. It is divided into two main sections: the <strong>Old Testament</strong> (39 books, written mostly in Hebrew) and the <strong>New Testament</strong> (27 books, written in Greek).
          </p>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            The word &ldquo;Bible&rdquo; comes from the Greek <em>biblia</em>, meaning &ldquo;books.&rdquo; Christians believe the Bible is the inspired Word of God — that God worked through human authors to communicate exactly what He intended (<Link href="/cross-references/2-timothy/3/16" className="text-sacred hover:underline">2 Timothy 3:16</Link>). It&apos;s not a single book written in a single sitting. It&apos;s a library.
          </p>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            What makes the Bible unique is its unity despite its diversity. Shepherds, kings, fishermen, doctors, prophets, and prisoners all contributed — yet the narrative holds together with a single storyline: <strong>God creates, humanity falls, God rescues through Jesus Christ, and God restores all things.</strong>
          </p>
          <p className="text-scripture dark:text-ink-light leading-relaxed">
            The Bible has been translated into over 700 languages completely, with portions in over 3,500 languages. It remains the bestselling book every single year — estimated at 5 billion copies distributed worldwide. No other book in human history comes close.
          </p>
        </section>

        {/* Bible by the Numbers */}
        <section id="numbers" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Bible by the Numbers</h2>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Fact</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Old Testament</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">New Testament</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden sm:table-cell">Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { fact: 'Books', ot: '39', nt: '27', total: '66' },
                  { fact: 'Chapters', ot: String(totalOTChapters), nt: String(totalNTChapters), total: String(totalOTChapters + totalNTChapters) },
                  { fact: 'Verses', ot: '23,145', nt: '7,957', total: '31,102' },
                  { fact: 'Words (KJV)', ot: '~592,000', nt: '~181,000', total: '~783,000' },
                  { fact: 'Languages', ot: 'Hebrew + Aramaic', nt: 'Koine Greek', total: '3 languages' },
                  { fact: 'Time Span', ot: '~1,400-400 BC', nt: '~AD 45-95', total: '~1,500 years' },
                  { fact: 'Longest Book', ot: 'Psalms (150 ch.)', nt: 'Acts (28 ch.)', total: 'Psalms' },
                  { fact: 'Shortest Book', ot: 'Obadiah (1 ch.)', nt: '3 John (1 ch.)', total: '3 John (219 words)' },
                ].map((r, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border">
                    <td className="px-4 py-3 font-medium text-scripture dark:text-white">{r.fact}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light">{r.ot}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light">{r.nt}</td>
                    <td className="px-4 py-3 font-bold text-scripture dark:text-sacred hidden sm:table-cell">{r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 39 Old Testament Books */}
        <section id="ot-books" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">The 39 Books of the Old Testament</h2>
          <p className="text-ink-muted dark:text-ink-light mb-4 text-sm">From Creation to 400 years of silence before Christ. Click any book to explore its chapters.</p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Book</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden sm:table-cell">Author</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred w-14">Ch.</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden sm:table-cell">Category</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden md:table-cell">Theme</th>
                </tr>
              </thead>
              <tbody>
                {OT_BOOKS.map((book, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border hover:bg-sacred-light/50 dark:hover:bg-dark-border/20">
                    <td className="px-4 py-2"><Link href={`/${bookSlug(book.name)}-chapters`} className="text-sacred hover:underline font-medium">{book.name}</Link></td>
                    <td className="px-4 py-2 text-ink-muted dark:text-ink-light hidden sm:table-cell">{book.author}</td>
                    <td className="px-4 py-2 text-ink-muted dark:text-ink-light">{book.chapters}</td>
                    <td className="px-4 py-2 hidden sm:table-cell"><span className="bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 text-xs px-2 py-0.5 rounded-full">{book.category}</span></td>
                    <td className="px-4 py-2 text-ink-muted dark:text-ink-light text-xs hidden md:table-cell">{book.theme}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 27 New Testament Books */}
        <section id="nt-books" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">The 27 Books of the New Testament</h2>
          <p className="text-ink-muted dark:text-ink-light mb-4 text-sm">From the birth of Christ to the vision of His return. Click any book to explore its chapters.</p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Book</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden sm:table-cell">Author</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred w-14">Ch.</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden sm:table-cell">Category</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden md:table-cell">Theme</th>
                </tr>
              </thead>
              <tbody>
                {NT_BOOKS.map((book, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border hover:bg-sacred-light/50 dark:hover:bg-dark-border/20">
                    <td className="px-4 py-2"><Link href={`/${bookSlug(book.name)}-chapters`} className="text-sacred hover:underline font-medium">{book.name}</Link></td>
                    <td className="px-4 py-2 text-ink-muted dark:text-ink-light hidden sm:table-cell">{book.author}</td>
                    <td className="px-4 py-2 text-ink-muted dark:text-ink-light">{book.chapters}</td>
                    <td className="px-4 py-2 hidden sm:table-cell"><span className="bg-sacred/10 dark:bg-sacred-light0/30 text-scripture dark:text-sacred text-xs px-2 py-0.5 rounded-full">{book.category}</span></td>
                    <td className="px-4 py-2 text-ink-muted dark:text-ink-light text-xs hidden md:table-cell">{book.theme}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* OT vs NT Comparison */}
        <section id="ot-vs-nt" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Old Testament vs New Testament</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            People often ask: what&apos;s the difference? Think of the Old Testament as the setup and the New Testament as the payoff. The OT asks the question; the NT answers it.
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
                  { aspect: 'Central figure', ot: 'The coming Messiah (promised)', nt: 'Jesus Christ (arrived)' },
                  { aspect: 'Covenant', ot: 'Law given through Moses', nt: 'Grace given through Jesus (John 1:17)' },
                  { aspect: 'Sacrifice', ot: 'Animal sacrifices — temporary, repeated', nt: 'Christ\'s sacrifice — permanent, once for all (Hebrews 10:10)' },
                  { aspect: 'Access to God', ot: 'Through priests and the temple', nt: 'Direct access through Jesus (Hebrews 4:16)' },
                  { aspect: 'Holy Spirit', ot: 'Came upon specific people temporarily', nt: 'Indwells every believer permanently (John 14:17)' },
                  { aspect: 'Scope', ot: 'Primarily Israel as God\'s chosen nation', nt: 'All nations — "Go into all the world" (Mark 16:15)' },
                  { aspect: 'Theme', ot: '"Someone is coming"', nt: '"He\'s here — and He\'s coming back"' },
                  { aspect: 'Time span', ot: '~1,400 years of history', nt: '~50 years of history' },
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

        {/* Who Wrote the Bible? */}
        <section id="authorship" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Who Wrote the Bible?</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            Short answer: God used about 40 human authors. Long answer: it&apos;s more interesting than that.
          </p>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            The authors include a <strong>former prince of Egypt</strong> (Moses), a <strong>shepherd-turned-king</strong> (David), a <strong>tax collector</strong> (Matthew), a <strong>doctor</strong> (Luke), a <strong>tentmaker and former Pharisee</strong> (Paul), <strong>fishermen</strong> (Peter, John), a <strong>farmer</strong> (Amos), a <strong>cupbearer to a pagan king</strong> (Nehemiah), and a <strong>political prisoner on a remote island</strong> (John, when he wrote Revelation).
          </p>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            These men lived across 1,500 years on three continents (Africa, Asia, Europe), wrote in three languages (Hebrew, Aramaic, Greek), and came from every social class. Yet the Bible reads as one coherent story. Christians understand this through the doctrine of <strong>inspiration</strong>: &ldquo;All scripture is given by inspiration of God&rdquo; (<Link href="/cross-references/2-timothy/3/16" className="text-sacred hover:underline">2 Timothy 3:16</Link>). God didn&apos;t dictate — He guided each author&apos;s personality, vocabulary, and style while ensuring the result was exactly what He intended.
          </p>
          <p className="text-scripture dark:text-ink-light leading-relaxed">
            Peter put it this way: &ldquo;Holy men of God spake as they were moved by the Holy Ghost&rdquo; (<Link href="/cross-references/2-peter/1/21" className="text-sacred hover:underline">2 Peter 1:21</Link>). The word &ldquo;moved&rdquo; is the Greek <Link href="/greek-word/phero" className="text-sacred hover:underline"><em>phero</em></Link> — the same word used for wind carrying a ship. God carried the authors where He wanted the text to go.
          </p>
        </section>

        {/* How It Was Written & Preserved */}
        <section id="how-written" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">How the Bible Was Written and Preserved</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            The Bible wasn&apos;t dropped from heaven as a finished product. It was written over centuries, on scrolls of papyrus and parchment, then meticulously copied by hand for thousands of years before the printing press existed.
          </p>
          <div className="space-y-4 mb-6">
            {[
              { period: '~1400-400 BC', title: 'Old Testament Written', detail: 'Moses wrote the first five books (the Torah). Prophets, poets, and historians added the remaining 34 books over the next thousand years. Jewish scribes preserved these texts with obsessive precision — counting every letter of every line.' },
              { period: '~AD 45-95', title: 'New Testament Written', detail: 'Paul\'s letters came first (Galatians, ~AD 48). The Gospels followed (Mark ~AD 55-65, Matthew and Luke ~AD 60-70, John ~AD 85-95). Revelation, the final book, was written around AD 95.' },
              { period: 'AD 100-300', title: 'Early Copies Spread', detail: 'Churches copied and circulated the apostles\' letters. By AD 200, most churches recognized the same core collection. We have papyrus fragments from this period that match later manuscripts almost exactly.' },
              { period: 'AD 325-400', title: 'Canon Recognized', detail: 'Church councils at Hippo (AD 393) and Carthage (AD 397) formally recognized the 27 New Testament books. They didn\'t choose them — they confirmed what churches had been using for 200+ years.' },
              { period: 'AD 1455', title: 'Gutenberg Prints the Bible', detail: 'The first major book printed with movable type. The printing press ended hand-copying errors and made the Bible available to ordinary people for the first time in history.' },
              { period: 'AD 1611', title: 'King James Version Published', detail: '54 scholars produced the most influential English Bible translation. Its language shaped the English language itself — phrases like "the writing is on the wall" and "a drop in the bucket" come straight from the KJV.' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="w-8 h-8 rounded-full bg-scripture text-white flex items-center justify-center text-xs font-bold shrink-0">{idx + 1}</span>
                  {idx < 5 && <div className="w-0.5 flex-1 bg-scripture/20 mt-1" />}
                </div>
                <div className="pb-4">
                  <p className="text-xs text-scripture dark:text-sacred font-bold">{item.period}</p>
                  <p className="font-bold text-scripture dark:text-white text-sm">{item.title}</p>
                  <p className="text-ink-muted dark:text-ink-light text-sm leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Manuscript Evidence */}
        <section id="manuscripts" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Ancient Manuscript Evidence</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            How do we know the Bible we read today matches what was originally written? Manuscripts. The Bible has more manuscript evidence than any other ancient document — and it&apos;s not even close.
          </p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Manuscript</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden sm:table-cell">Date</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden md:table-cell">Discovered</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Significance</th>
                </tr>
              </thead>
              <tbody>
                {MANUSCRIPTS.map((m, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border">
                    <td className="px-4 py-3 font-medium text-scripture dark:text-white">{m.name}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light hidden sm:table-cell whitespace-nowrap">{m.date}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light hidden md:table-cell text-xs">{m.found}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light text-xs">{m.significance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Translations Compared */}
        <section id="translations" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Major Bible Translations Compared</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            With dozens of English translations available, which one should you use? Here&apos;s a straightforward comparison. There&apos;s no single &ldquo;best&rdquo; translation — the best Bible is the one you actually read.
          </p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Translation</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Year</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Type</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Reading Level</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Best For</th>
                </tr>
              </thead>
              <tbody>
                {TRANSLATIONS.map((t, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border">
                    <td className="px-4 py-3 font-medium text-scripture dark:text-white whitespace-nowrap">{t.name}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light">{t.year}</td>
                    <td className="px-4 py-3"><span className="bg-sacred/10 dark:bg-sacred-light0/30 text-scripture dark:text-sacred text-xs px-2 py-0.5 rounded-full whitespace-nowrap">{t.type}</span></td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light">{t.reading}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light text-xs">{t.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Key People */}
        <section id="key-people" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">20 Key People in the Bible</h2>
          <p className="text-ink-muted dark:text-ink-light mb-4 text-sm">The Bible features hundreds of named individuals. These 20 shaped the story most dramatically.</p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Person</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden sm:table-cell">Role</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden md:table-cell">Key Passage</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Significance</th>
                </tr>
              </thead>
              <tbody>
                {KEY_PEOPLE.map((p, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border hover:bg-sacred-light/50 dark:hover:bg-dark-border/20">
                    <td className="px-4 py-2">
                      <Link href={`/bible-characters/${bookSlug(p.name)}`} className="text-sacred hover:underline font-medium">{p.name}</Link>
                      <span className="ml-1 text-xs bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded-full">{p.testament}</span>
                    </td>
                    <td className="px-4 py-2 text-ink-muted dark:text-ink-light text-xs hidden sm:table-cell">{p.role}</td>
                    <td className="px-4 py-2 text-ink-muted dark:text-ink-light text-xs hidden md:table-cell">{p.ref}</td>
                    <td className="px-4 py-2 text-ink-muted dark:text-ink-light text-xs">{p.significance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-ink-muted dark:text-ink-light text-sm mt-3">
            Explore all biblical figures in our <Link href="/bible-characters" className="text-sacred hover:underline">Bible Characters directory</Link> or take a <Link href="/bible-quiz-categories" className="text-sacred hover:underline">Bible character quiz</Link>.
          </p>
        </section>

        {/* Major Events Timeline */}
        <section id="timeline" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Major Events in the Bible</h2>
          <p className="text-ink-muted dark:text-ink-light mb-4 text-sm">A chronological overview of the Bible&apos;s pivotal moments — from Creation to Revelation.</p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Date</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Event</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden sm:table-cell">Description</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden md:table-cell">Reference</th>
                </tr>
              </thead>
              <tbody>
                {MAJOR_EVENTS.map((e, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border">
                    <td className="px-4 py-2 text-scripture dark:text-sacred font-medium whitespace-nowrap text-xs">{e.date}</td>
                    <td className="px-4 py-2 font-medium text-scripture dark:text-white text-xs">{e.event}</td>
                    <td className="px-4 py-2 text-ink-muted dark:text-ink-light text-xs hidden sm:table-cell">{e.description}</td>
                    <td className="px-4 py-2 text-ink-muted dark:text-ink-light text-xs hidden md:table-cell">{e.ref}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-ink-muted dark:text-ink-light text-sm mt-3">
            See the full interactive timeline at our <Link href="/timeline" className="text-sacred hover:underline">Bible Timeline</Link> page.
          </p>
        </section>

        {/* One Story in 66 Books */}
        <section id="one-story" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">One Story in 66 Books</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            Here&apos;s what makes the Bible unlike any other book: 40 authors across 1,500 years didn&apos;t plan a meeting. They didn&apos;t share notes. Many never knew the others existed. Yet the Bible tells one continuous story with a beginning, a conflict, a climax, and a resolution.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { act: 'Act 1: Creation', detail: 'God creates a perfect world and places humanity in it. Everything is "very good" (Genesis 1:31). There is no death, no suffering, no separation from God.', books: 'Genesis 1-2' },
              { act: 'Act 2: The Fall', detail: 'Humanity rebels. Sin enters the world. Death follows. Every problem in human history — war, disease, injustice, death — traces back to this moment.', books: 'Genesis 3' },
              { act: 'Act 3: Rescue Begins', detail: 'God chooses Abraham, builds a nation (Israel), gives the Law, sends prophets. Every sacrifice, every prophecy, every king points forward to a coming Rescuer.', books: 'Genesis 12 - Malachi' },
              { act: 'Act 4: Jesus', detail: 'The promised Rescuer arrives. God Himself becomes human. Jesus lives the life we couldn\'t, dies the death we deserved, and rises to prove it worked.', books: 'Matthew - John' },
              { act: 'Act 5: The Church', detail: 'The Holy Spirit comes. The Church is born. The message spreads from Jerusalem to the ends of the earth. We are living in Act 5 right now.', books: 'Acts - Jude' },
              { act: 'Act 6: Restoration', detail: 'Jesus returns. Evil is finally destroyed. Death itself dies. God makes all things new. The story ends where it began — God dwelling with His people, face to face.', books: 'Revelation' },
            ].map((item) => (
              <div key={item.act} className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
                <h3 className="font-bold text-scripture dark:text-white mb-2">{item.act}</h3>
                <p className="text-ink-muted dark:text-ink-light text-sm leading-relaxed mb-2">{item.detail}</p>
                <p className="text-xs text-scripture dark:text-sacred font-medium">{item.books}</p>
              </div>
            ))}
          </div>
          <p className="text-scripture dark:text-ink-light leading-relaxed">
            That&apos;s the Bible in six acts. Every book fits somewhere in this arc. When you know the big story, individual verses stop being random quotes and start making sense as part of something much larger.
          </p>
        </section>

        {/* Common Misconceptions */}
        <section id="misconceptions" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">8 Common Misconceptions About the Bible</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            The Bible is the most quoted and most misquoted book in history. Here are claims you&apos;ve probably heard — and what the evidence actually shows.
          </p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">What People Say</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">What the Evidence Shows</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden md:table-cell">Why It Matters</th>
                </tr>
              </thead>
              <tbody>
                {MISCONCEPTIONS.map((m, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border">
                    <td className="px-4 py-3 font-medium text-red-700 dark:text-red-400 text-xs">{m.myth}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light text-xs">{m.reality}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light text-xs hidden md:table-cell">{m.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Is the Bible Reliable? */}
        <section id="reliable" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Is the Bible Reliable?</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            Fair question. Here are three categories of evidence — and you can verify all of them independently.
          </p>
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2">1. Manuscript Evidence</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm leading-relaxed">
                The New Testament has <strong>5,800+ Greek manuscripts</strong>, 10,000+ Latin manuscripts, and 9,300+ manuscripts in other languages. For comparison, Homer&apos;s <em>Iliad</em> has about 1,800 copies — the second-best attested ancient work. Caesar&apos;s <em>Gallic Wars</em>? About 10. The manuscript gap for the New Testament is closer to the original events than any other ancient document (some fragments within 30-40 years of the originals).
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2">2. Archaeological Evidence</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm leading-relaxed">
                Archaeology has confirmed hundreds of biblical details: the existence of the Hittites (once doubted), the <Link href="/bible-places/pool-of-siloam" className="text-sacred hover:underline">Pool of Siloam</Link>, Pontius Pilate&apos;s inscription found at Caesarea, the Tel Dan Stele mentioning the &ldquo;House of David,&rdquo; and Babylonian records of <Link href="/bible-places/jerusalem" className="text-sacred hover:underline">Jerusalem&apos;s</Link> fall in 586 BC. No archaeological discovery has ever contradicted a biblical account.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <h3 className="font-bold text-scripture dark:text-white mb-2">3. Prophetic Evidence</h3>
              <p className="text-ink-muted dark:text-ink-light text-sm leading-relaxed">
                The Old Testament contains over 300 prophecies about the Messiah — written centuries before Jesus was born. He fulfilled them all: born in <Link href="/bible-places/bethlehem" className="text-sacred hover:underline">Bethlehem</Link> (<Link href="/cross-references/micah/5/2" className="text-sacred hover:underline">Micah 5:2</Link>), born of a virgin (<Link href="/cross-references/isaiah/7/14" className="text-sacred hover:underline">Isaiah 7:14</Link>), betrayed for 30 pieces of silver (<Link href="/cross-references/zechariah/11/12" className="text-sacred hover:underline">Zechariah 11:12</Link>), crucified (<Link href="/cross-references/psalm/22/16" className="text-sacred hover:underline">Psalm 22:16</Link> — written 1,000 years before crucifixion was invented), buried in a rich man&apos;s tomb (<Link href="/cross-references/isaiah/53/9" className="text-sacred hover:underline">Isaiah 53:9</Link>).
              </p>
            </div>
          </div>
        </section>

        {/* Influence on the World */}
        <section id="influence" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">The Bible&apos;s Influence on the World</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            Whether you believe it&apos;s divinely inspired or not, the Bible&apos;s impact on civilization is beyond dispute. Here&apos;s a fraction of what it shaped:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { area: 'Law & Government', detail: 'The concept of equal justice, rule of law, and human rights as endowed by a Creator all trace to biblical principles. The U.S. Declaration of Independence echoes Genesis and Psalms.' },
              { area: 'Education', detail: 'Harvard, Yale, Princeton, and Oxford were all founded to train ministers and study Scripture. The first public schools in America were created so children could read the Bible.' },
              { area: 'Science', detail: 'The scientific revolution was launched by Christians who believed a rational God created an orderly universe worth studying. Copernicus, Galileo, Newton, Faraday, and Pasteur were all Bible believers.' },
              { area: 'Literature & Language', detail: 'The KJV alone contributed hundreds of English phrases: "eye for an eye," "the blind leading the blind," "a wolf in sheep\'s clothing," "the writing on the wall," "the salt of the earth."' },
              { area: 'Abolition of Slavery', detail: 'William Wilberforce, Harriet Tubman, and Frederick Douglass all cited the Bible as the foundation of their fight. "There is neither Jew nor Greek, there is neither bond nor free" (Galatians 3:28).' },
              { area: 'Healthcare & Charity', detail: 'The first hospitals, orphanages, and disaster relief organizations were founded by Christians following Jesus\' command to care for the sick, the poor, and the vulnerable.' },
            ].map((item) => (
              <div key={item.area} className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
                <h3 className="font-bold text-scripture dark:text-white text-sm mb-2">{item.area}</h3>
                <p className="text-ink-muted dark:text-ink-light text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Read the Bible */}
        <section id="how-to-read" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">How to Read the Bible (A Practical Guide)</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-6">
            The Bible is 66 books, 1,189 chapters, and 783,000 words. That&apos;s intimidating. Here&apos;s how to actually start — and stick with it.
          </p>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Don\'t Start at Page 1', detail: 'Genesis is great, but Leviticus will stop most first-time readers cold. Start with the Gospel of John — it was written specifically so people would believe (John 20:31). Then read Romans to understand what Jesus accomplished. After that, go back to Genesis.', link: '/john-chapters', linkText: 'Start the Gospel of John' },
              { step: '2', title: 'Read in Context, Not Random Verses', detail: 'Read whole chapters, not isolated verses. A verse pulled from context can mean the opposite of the author\'s intent. "Judas went and hanged himself" + "Go and do likewise" are both Bible verses — but they were never meant to go together.', link: '/bible-study-for-beginners', linkText: 'Bible Study for Beginners' },
              { step: '3', title: 'Use a Translation You Can Understand', detail: 'If the KJV\'s "thee" and "thou" slow you down, try the NIV, ESV, or NLT. You\'re not dishonoring God by reading a modern translation — you\'re understanding Him better. Use our translation comparison table above to choose.', link: '#translations', linkText: 'Compare Translations' },
              { step: '4', title: 'Read Consistently, Not Heroically', detail: '15 minutes a day beats 3 hours once a month. You can read the entire Bible in a year at just 12-15 minutes daily. Consistency builds understanding. Set a specific time — morning works best for most people.', link: '/reading-plans', linkText: 'See Reading Plans' },
              { step: '5', title: 'Ask Three Questions', detail: 'After every passage ask: (1) What does this teach me about God? (2) What does this teach me about myself? (3) What should I do about it? These three questions turn reading into study and study into life change.', link: '/how-to-study-the-bible', linkText: 'How to Study the Bible' },
              { step: '6', title: 'Use Study Tools', detail: 'Cross-references show you how verses connect. Word studies reveal what the original Hebrew or Greek actually said. Commentaries explain difficult passages. We\'ve built all of these into this site — use them.', link: '/cross-references/john/3/16', linkText: 'Try Cross-References' },
            ].map((item) => (
              <div key={item.step} className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="w-9 h-9 rounded-full bg-scripture text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</span>
                  <div>
                    <h3 className="font-bold text-scripture dark:text-white mb-1">{item.title}</h3>
                    <p className="text-ink-muted dark:text-ink-light text-sm leading-relaxed mb-2">{item.detail}</p>
                    <Link href={item.link} className="text-sacred hover:underline text-xs font-medium">{item.linkText} &rarr;</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reading Plans */}
        <section id="reading-plans" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Bible Reading Plans for Beginners</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            Not sure where to start? Pick the plan that matches your goal:
          </p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-scripture/5 dark:bg-dark-border/30">
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Plan</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Duration</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred hidden sm:table-cell">Daily Time</th>
                  <th className="px-4 py-3 text-left font-bold text-scripture dark:text-sacred">Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { plan: 'Gospel of John First', duration: '21 days', time: '10-15 min', best: 'Absolute beginners — learn who Jesus is first' },
                  { plan: 'New Testament in 90 Days', duration: '90 days', time: '15-20 min', best: 'New believers who want the full NT story' },
                  { plan: 'Bible in a Year (Chronological)', duration: '365 days', time: '12-15 min', best: 'Committed readers who want events in order' },
                  { plan: 'Psalms & Proverbs (Wisdom)', duration: '6 months', time: '10 min', best: 'Those seeking daily encouragement and wisdom' },
                  { plan: 'Genesis to Revelation (Cover to Cover)', duration: '365 days', time: '15-20 min', best: 'Experienced readers doing a comprehensive read-through' },
                  { plan: 'Topical Study', duration: 'Varies', time: '15-30 min', best: 'Those with specific questions (use our topic pages as guides)' },
                ].map((r, idx) => (
                  <tr key={idx} className="border-t border-grace dark:border-dark-border">
                    <td className="px-4 py-3 font-medium text-scripture dark:text-white">{r.plan}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light">{r.duration}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light hidden sm:table-cell">{r.time}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-light text-xs">{r.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-ink-muted dark:text-ink-light text-sm mt-3">
            Browse all available plans on our <Link href="/reading-plans" className="text-sacred hover:underline">Bible Reading Plans</Link> page.
          </p>
        </section>

        {/* Gospel CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-scripture via-scripture/95 to-scripture/80 rounded-xl p-8 md:p-10 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">The Bible&apos;s Central Message in Four Sentences</h2>
            <p className="text-sacred-light/90 max-w-2xl mx-auto leading-relaxed mb-6">
              God created you for a relationship with Himself. You broke that relationship through sin. Jesus Christ died to restore it. If you trust Him, you receive forgiveness and eternal life. That&apos;s the entire Bible — 66 books, 31,102 verses, one invitation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/john-3-16" className="inline-block bg-white text-scripture font-bold px-6 py-3 rounded-lg hover:bg-sacred-light transition-colors">
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
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Frequently Asked Questions About the Bible</h2>
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

        {/* Go Deeper */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Go Deeper</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Bible Verses', href: '/bible-verses', desc: '100+ popular verses organized by life topic' },
              { label: 'Books of the Bible', href: '/books-of-the-bible', desc: 'All 66 books with summaries and chapter links' },
              { label: 'Bible Characters', href: '/bible-characters', desc: 'Explore hundreds of biblical figures' },
              { label: 'Bible Places', href: '/bible-places', desc: 'Interactive maps of 1,300+ biblical locations' },
              { label: 'Greek Word Studies', href: '/greek-words', desc: '5,500+ Greek words with definitions and usage' },
              { label: 'Hebrew Word Studies', href: '/hebrew-words', desc: '8,600+ Hebrew words with definitions and usage' },
              { label: 'Cross-References', href: '/cross-references/john/3/16', desc: '29,000+ verse-to-verse connections' },
              { label: 'Bible Quizzes', href: '/bible-quizzes', desc: 'Test your knowledge with 1,000+ quiz questions' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-4 shadow-sm hover:border-scripture dark:hover:border-sacred/50 transition-colors group">
                <p className="font-bold text-scripture dark:text-white text-sm group-hover:underline">{item.label}</p>
                <p className="text-ink-muted dark:text-ink-light text-xs mt-1">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Continue Your Study */}
        <section id="study-links" className="mb-10 scroll-mt-20">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-3">Continue Your Study</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'John 3:16 Study', href: '/john-3-16' },
              { label: 'Psalm 23 Study', href: '/psalm-23' },
              { label: 'Romans 8:28 Study', href: '/romans-8-28' },
              { label: 'Jeremiah 29:11 Study', href: '/jeremiah-29-11' },
              { label: 'Proverbs 3:5-6 Study', href: '/proverbs-3-5-6' },
              { label: 'Philippians 4:13 Study', href: '/philippians-4-13' },
              { label: 'Isaiah 41:10 Study', href: '/isaiah-41-10' },
              { label: 'Jesus Christ', href: '/jesus-christ' },
              { label: 'What Is Prayer?', href: '/prayer' },
              { label: 'Short Prayers', href: '/short-prayers' },
              { label: 'Bible Topics', href: '/bible-topics/love' },
              { label: 'Bible Names', href: '/bible-names/jesus' },
              { label: 'Bible Encyclopedia', href: '/bible-encyclopedia/jerusalem' },
              { label: 'Bible Timeline', href: '/timeline' },
              { label: 'How to Study the Bible', href: '/how-to-study-the-bible' },
              { label: 'Bible Study for Beginners', href: '/bible-study-for-beginners' },
              { label: 'Books of the Bible in Order', href: '/books-of-the-bible-in-order' },
              { label: 'Who Wrote the Bible?', href: '/who-wrote-the-bible' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-xs bg-sacred-light dark:bg-sacred-light0/20 text-scripture dark:text-sacred px-3 py-1.5 rounded-full hover:bg-sacred-light dark:hover:bg-sacred-light/40 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
