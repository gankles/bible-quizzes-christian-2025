import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';

const SITE_URL = 'https://biblemaximum.com';

export const metadata: Metadata = {
  title: 'Who Is Jesus Christ? — Complete Guide to His Life, Teachings, Death & Resurrection | Bible Maximum',
  description: 'Who is Jesus Christ? Complete guide covering historical evidence, life timeline, teachings, miracles, death, resurrection, Messianic prophecies, Greek/Hebrew word study, and theological significance.',
  keywords: ['Jesus Christ', 'who is Jesus', 'Jesus Christ explained', 'life of Jesus', 'teachings of Jesus', 'miracles of Jesus', 'death and resurrection of Jesus', 'Jesus in the Bible', 'historical Jesus', 'Messianic prophecies', 'names of Jesus', 'Jesus Christ meaning', 'Yeshua', 'Christos', 'Son of God', 'Jesus Christ biography'],
  alternates: {
    canonical: '/jesus-christ',
  },
  openGraph: {
    title: 'Who Is Jesus Christ? — The Complete Bible Study Guide',
    description: 'Everything the Bible reveals about Jesus Christ — His life, teachings, miracles, death, resurrection, and why He matters today.',
    url: `${SITE_URL}/jesus-christ`,
    type: 'article',
    images: ['/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png'],
  },
};

// ─── Data Arrays ────────────────────────────────────────────────

const NAMES_AND_TITLES = [
  { name: 'Jesus (Yeshua)', greek: 'Ἰησοῦς (Iēsous)', hebrew: 'יֵשׁוּעַ (Yeshua)', meaning: '"Yahweh saves" — His personal name given by the angel Gabriel (Matthew 1:21). The Greek form of the Hebrew Joshua.', keyVerse: 'Matthew 1:21' },
  { name: 'Christ (Messiah)', greek: 'Χριστός (Christos)', hebrew: 'מָשִׁיחַ (Mashiach)', meaning: '"Anointed One" — Not a surname but a title. The long-awaited King whom God promised to send to rescue Israel and rule forever.', keyVerse: 'John 1:41' },
  { name: 'Son of God', greek: 'Υἱὸς τοῦ Θεοῦ', hebrew: '—', meaning: 'Unique divine relationship with the Father. Not "a" son but "the" Son — sharing God\'s nature and authority.', keyVerse: 'John 3:16' },
  { name: 'Son of Man', greek: 'Υἱὸς τοῦ Ἀνθρώπου', hebrew: 'בֶּן־אָדָם (Ben Adam)', meaning: 'Jesus\' favorite self-designation. Drawn from Daniel 7:13-14 — a divine figure who receives an eternal kingdom. Emphasizes both His humanity and His heavenly authority.', keyVerse: 'Daniel 7:13' },
  { name: 'Word (Logos)', greek: 'Λόγος (Logos)', hebrew: '—', meaning: 'The eternal, pre-existent second Person of the Trinity. "In the beginning was the Word, and the Word was with God, and the Word was God" (John 1:1).', keyVerse: 'John 1:1' },
  { name: 'Lamb of God', greek: 'Ἀμνὸς τοῦ Θεοῦ', hebrew: '—', meaning: 'The ultimate Passover sacrifice. As the Passover lamb\'s blood saved Israel from death in Egypt, Jesus\' blood saves believers from eternal death.', keyVerse: 'John 1:29' },
  { name: 'Lord (Kurios)', greek: 'Κύριος (Kurios)', hebrew: 'אֲדֹנָי (Adonai)', meaning: 'Supreme authority and deity. The Greek Old Testament (Septuagint) used Kurios to translate Yahweh — calling Jesus "Lord" is calling Him God.', keyVerse: 'Philippians 2:11' },
  { name: 'Immanuel', greek: 'Ἐμμανουήλ', hebrew: 'עִמָּנוּאֵל (Immanu-El)', meaning: '"God with us." The prophetic name from Isaiah 7:14, fulfilled in the incarnation — God didn\'t send a representative; He came Himself.', keyVerse: 'Isaiah 7:14' },
  { name: 'Alpha and Omega', greek: 'Ἄλφα καὶ Ὦ', hebrew: '—', meaning: 'The first and last letters of the Greek alphabet. Jesus is the beginning and end of all things — eternal, with no origin and no expiration.', keyVerse: 'Revelation 22:13' },
  { name: 'Good Shepherd', greek: 'Ποιμὴν ὁ Καλός', hebrew: '—', meaning: 'The one who lays down His life for the sheep. In the ancient world, a shepherd literally risked death fighting wolves and thieves to protect the flock.', keyVerse: 'John 10:11' },
  { name: 'High Priest', greek: 'Ἀρχιερεύς (Archiereus)', hebrew: 'כֹּהֵן גָּדוֹל (Kohen Gadol)', meaning: 'The mediator between God and humanity. Unlike Levitical priests who offered animal sacrifices repeatedly, Jesus offered Himself once for all.', keyVerse: 'Hebrews 4:14' },
  { name: 'King of Kings', greek: 'Βασιλεὺς Βασιλέων', hebrew: '—', meaning: 'Supreme ruler over every earthly and heavenly authority. Every king, emperor, and president is subordinate to Jesus Christ.', keyVerse: 'Revelation 19:16' },
];

const LIFE_TIMELINE = [
  { period: 'Pre-existence', date: 'Eternity past', event: 'The Word exists with God and as God', reference: 'John 1:1-2', detail: 'Jesus did not begin at Bethlehem. He is the eternal Son, present at creation, through whom all things were made.' },
  { period: 'Birth', date: '~6-4 BC', event: 'Born in Bethlehem to the virgin Mary', reference: 'Luke 2:1-7', detail: 'Born during the reign of Herod the Great. Laid in a manger because there was no room in the inn. Shepherds and later Magi visited.' },
  { period: 'Flight to Egypt', date: '~5-4 BC', event: 'Joseph flees with Mary and Jesus to Egypt', reference: 'Matthew 2:13-15', detail: 'Herod ordered the massacre of male infants in Bethlehem. The family returned after Herod\'s death, fulfilling Hosea 11:1.' },
  { period: 'Childhood', date: '~4 BC - AD 8', event: 'Grows up in Nazareth', reference: 'Luke 2:39-40', detail: 'Raised in a carpenter\'s household in Galilee. The Gospels record almost nothing about these years — the "silent years."' },
  { period: 'Temple Visit', date: '~AD 8', event: 'Found teaching in the Temple at age 12', reference: 'Luke 2:41-52', detail: 'The only recorded event from Jesus\' youth. He astonished the scholars and said, "I must be about my Father\'s business."' },
  { period: 'Baptism', date: '~AD 27', event: 'Baptized by John the Baptist in the Jordan River', reference: 'Matthew 3:13-17', detail: 'The Spirit descended like a dove. The Father spoke from heaven: "This is my beloved Son, in whom I am well pleased."' },
  { period: 'Temptation', date: '~AD 27', event: 'Tempted by Satan for 40 days in the wilderness', reference: 'Matthew 4:1-11', detail: 'Satan offered Jesus food, power, and glory. Jesus defeated every temptation with Scripture. Where Adam failed, the second Adam succeeded.' },
  { period: 'Early Ministry', date: '~AD 27-28', event: 'First disciples called, water turned to wine at Cana', reference: 'John 1:35-2:11', detail: 'Jesus began gathering disciples and performing signs. The wedding at Cana was His first public miracle.' },
  { period: 'Galilean Ministry', date: '~AD 28-29', event: 'Sermon on the Mount, miracles, parables', reference: 'Matthew 5-7', detail: 'The most intensive period of teaching and healing. Thousands followed Him. The Twelve were formally appointed.' },
  { period: 'Later Ministry', date: '~AD 29-30', event: 'Transfiguration, journey toward Jerusalem', reference: 'Luke 9:28-36', detail: 'Moses and Elijah appeared with Jesus on the mountain. His face shone like the sun. Peter, James, and John witnessed His glory.' },
  { period: 'Triumphal Entry', date: '~AD 30 (Sunday)', event: 'Enters Jerusalem riding a donkey', reference: 'Matthew 21:1-11', detail: 'Crowds shouted "Hosanna!" fulfilling Zechariah 9:9. Jesus wept over the city, knowing it would reject Him.' },
  { period: 'Last Supper', date: '~AD 30 (Thursday)', event: 'Institutes the Lord\'s Supper with the Twelve', reference: 'Luke 22:14-20', detail: 'Broke bread and shared the cup — "This is my body... This is my blood of the new covenant." Judas left to betray Him.' },
  { period: 'Crucifixion', date: '~AD 30 (Friday)', event: 'Crucified at Golgotha outside Jerusalem', reference: 'John 19:17-30', detail: 'Darkness covered the land. Jesus cried, "It is finished." The temple veil tore from top to bottom. He was buried in Joseph of Arimathea\'s tomb.' },
  { period: 'Resurrection', date: '~AD 30 (Sunday)', event: 'Rose from the dead on the third day', reference: 'Matthew 28:1-10', detail: 'The tomb was empty. Angels announced He had risen. He appeared to Mary Magdalene, the disciples, and over 500 witnesses.' },
  { period: 'Appearances', date: '~AD 30 (40 days)', event: 'Appeared to disciples over 40 days', reference: '1 Corinthians 15:3-8', detail: 'Ate with them, taught them, showed His wounds to Thomas. Commissioned them to take the gospel to all nations.' },
  { period: 'Ascension', date: '~AD 30', event: 'Ascended to heaven from the Mount of Olives', reference: 'Acts 1:9-11', detail: 'Taken up in a cloud while the disciples watched. Angels promised He would return the same way He left.' },
];

const MIRACLES = [
  { category: 'Nature', miracle: 'Turned water into wine', reference: 'John 2:1-11', significance: 'First sign — revealed His glory. Transformed the ordinary into the extraordinary.' },
  { category: 'Nature', miracle: 'Calmed the storm', reference: 'Mark 4:35-41', significance: 'Authority over creation. The disciples asked, "What manner of man is this, that even the wind and the sea obey him?"' },
  { category: 'Nature', miracle: 'Walked on water', reference: 'Matthew 14:22-33', significance: 'Only God treads on the waves (Job 9:8). Jesus demonstrated deity in the most visceral way possible.' },
  { category: 'Nature', miracle: 'Fed 5,000 with five loaves and two fish', reference: 'John 6:1-14', significance: 'The only miracle recorded in all four Gospels. Jesus is the Bread of Life who satisfies every hunger.' },
  { category: 'Healing', miracle: 'Healed a man born blind', reference: 'John 9:1-7', significance: 'No prophet had ever given sight to someone born blind. The Pharisees couldn\'t deny it — so they expelled the man instead.' },
  { category: 'Healing', miracle: 'Cleansed ten lepers', reference: 'Luke 17:11-19', significance: 'Leprosy made a person ritually unclean and socially dead. Jesus restored them physically and spiritually. Only one returned to give thanks.' },
  { category: 'Healing', miracle: 'Healed the paralytic lowered through the roof', reference: 'Mark 2:1-12', significance: 'Jesus first said "Your sins are forgiven" — then healed the paralysis to prove He had authority to forgive. The physical proved the spiritual.' },
  { category: 'Healing', miracle: 'Healed the woman with a 12-year hemorrhage', reference: 'Mark 5:25-34', significance: 'She was ritually unclean and had spent everything on doctors. One touch of Jesus\' garment healed what no physician could.' },
  { category: 'Resurrection', miracle: 'Raised Lazarus from the dead', reference: 'John 11:1-44', significance: 'Lazarus had been dead four days. Jesus wept, then commanded him out of the tomb. The ultimate preview of His own resurrection.' },
  { category: 'Resurrection', miracle: 'Raised the widow\'s son at Nain', reference: 'Luke 7:11-17', significance: 'A widow with no son had no provider and no future. Jesus gave her back both her son and her life.' },
  { category: 'Exorcism', miracle: 'Cast out Legion (Gerasene demoniac)', reference: 'Mark 5:1-20', significance: 'A man possessed by thousands of demons, living among tombs, cutting himself. Jesus freed him with a word. The man became an evangelist.' },
  { category: 'Exorcism', miracle: 'Freed the boy with seizures', reference: 'Mark 9:14-29', significance: 'The disciples couldn\'t help. The father cried, "I believe; help my unbelief." Jesus healed the boy and taught about faith and prayer.' },
];

const MESSIANIC_PROPHECIES = [
  { prophecy: 'Born of a virgin', ot: 'Isaiah 7:14', nt: 'Matthew 1:22-23', detail: 'Written ~700 BC. Fulfilled in Mary\'s miraculous conception by the Holy Spirit.' },
  { prophecy: 'Born in Bethlehem', ot: 'Micah 5:2', nt: 'Matthew 2:1-6', detail: 'Written ~700 BC. The Magi and Jewish scribes both confirmed this. Joseph and Mary traveled there for the census.' },
  { prophecy: 'From the tribe of Judah', ot: 'Genesis 49:10', nt: 'Matthew 1:2-3', detail: 'Written ~1400 BC. Both genealogies (Matthew 1, Luke 3) trace Jesus through Judah, not Levi, Benjamin, or any other tribe.' },
  { prophecy: 'Descendant of David', ot: '2 Samuel 7:12-13', nt: 'Romans 1:3', detail: 'Written ~1000 BC. The Messiah must sit on David\'s throne forever. Jesus is called "Son of David" 15 times in the Gospels.' },
  { prophecy: 'Preceded by a messenger', ot: 'Isaiah 40:3; Malachi 3:1', nt: 'Matthew 3:1-3', detail: 'Written ~700-400 BC. John the Baptist fulfilled this as the voice crying in the wilderness, preparing the way.' },
  { prophecy: 'Entered Jerusalem on a donkey', ot: 'Zechariah 9:9', nt: 'Matthew 21:1-9', detail: 'Written ~520 BC. Kings rode horses for war, donkeys for peace. Jesus came as the Prince of Peace.' },
  { prophecy: 'Betrayed for 30 pieces of silver', ot: 'Zechariah 11:12-13', nt: 'Matthew 26:14-15', detail: 'Written ~520 BC. The exact price Judas received. The money was later used to buy a potter\'s field — as prophesied.' },
  { prophecy: 'Silent before accusers', ot: 'Isaiah 53:7', nt: 'Matthew 27:12-14', detail: 'Written ~700 BC. "He opened not his mouth." Pilate was astonished that Jesus refused to defend Himself.' },
  { prophecy: 'Crucified (hands and feet pierced)', ot: 'Psalm 22:16', nt: 'John 20:25-27', detail: 'Written ~1000 BC — centuries before crucifixion was invented. David described a death he had never seen.' },
  { prophecy: 'Garments divided by lot', ot: 'Psalm 22:18', nt: 'John 19:23-24', detail: 'Written ~1000 BC. Roman soldiers unknowingly fulfilled this prophecy at the foot of the cross.' },
  { prophecy: 'No bones broken', ot: 'Psalm 34:20; Exodus 12:46', nt: 'John 19:33-36', detail: 'Soldiers broke the legs of the two criminals but found Jesus already dead. The Passover lamb\'s bones were never broken.' },
  { prophecy: 'Buried in a rich man\'s tomb', ot: 'Isaiah 53:9', nt: 'Matthew 27:57-60', detail: 'Written ~700 BC. Joseph of Arimathea, a wealthy member of the Sanhedrin, donated his own new tomb.' },
  { prophecy: 'Rose from the dead', ot: 'Psalm 16:10', nt: 'Acts 2:31-32', detail: 'Written ~1000 BC. "You will not let your Holy One see corruption." Peter cited this psalm on Pentecost as proof of the resurrection.' },
];

const GREEK_HEBREW_TERMS = [
  { word: 'Ἰησοῦς (Iēsous) / יֵשׁוּעַ (Yeshua)', meaning: 'Jesus — "Yahweh saves"', significance: 'His personal name carries the mission: God Himself saving humanity. The same name as Joshua who led Israel into the Promised Land — Jesus leads believers into eternal life.' },
  { word: 'Χριστός (Christos) / מָשִׁיחַ (Mashiach)', meaning: 'Christ — "Anointed One"', significance: 'Old Testament kings, priests, and prophets were anointed with oil. Jesus holds all three offices simultaneously — the ultimate Prophet, Priest, and King.' },
  { word: 'Κύριος (Kurios) / אֲדֹנָי (Adonai)', meaning: 'Lord — "Supreme Master"', significance: 'The Septuagint used Kurios to translate the sacred name YHWH. When Thomas said "My Lord and my God" (John 20:28), he was ascribing deity to Jesus without qualification.' },
  { word: 'Λόγος (Logos)', meaning: 'Word — "Divine Reason, Expression"', significance: 'In Greek philosophy, Logos meant the rational principle governing the universe. John hijacked the term: the Logos is not an abstract force — He is a Person who became flesh (John 1:14).' },
  { word: 'μονογενής (monogenēs)', meaning: 'One and Only — "Unique, One-of-a-kind"', significance: 'Not "only begotten" (as if created) but "one of a kind." Jesus is not one son among many. He is the unique Son who shares the Father\'s divine nature.' },
  { word: 'σωτήρ (Sōtēr)', meaning: 'Savior — "Deliverer, Rescuer"', significance: 'Used of God in the Old Testament (Isaiah 43:11). Applied to Jesus in the New Testament (Titus 2:13) — equating Him with Yahweh as the only Savior.' },
  { word: 'ἀρχιερεύς (Archiereus) / כֹּהֵן גָּדוֹל (Kohen Gadol)', meaning: 'High Priest — "Chief Priest"', significance: 'Jesus is both the priest who offers the sacrifice AND the sacrifice itself. He entered the heavenly Holy of Holies with His own blood (Hebrews 9:11-12).' },
];

const CROSS_REFERENCES = [
  { ref: 'John 1:1', text: 'In the beginning was the Word, and the Word was with God, and the Word was God.', theme: 'Deity', commentary: 'The opening of John\'s Gospel establishes Jesus\' eternal pre-existence and full deity. He was not created — He always was.' },
  { ref: 'John 14:6', text: 'I am the way, the truth, and the life: no man cometh unto the Father, but by me.', theme: 'Exclusivity', commentary: 'The most exclusive claim any religious figure ever made. Not "a" way but "the" way. Not partial truth but "the" truth.' },
  { ref: 'Philippians 2:5-8', text: 'Who, being in the form of God, thought it not robbery to be equal with God: But made himself of no reputation, and took upon him the form of a servant.', theme: 'Incarnation', commentary: 'The great self-emptying: God became a servant. He did not grasp His divine privileges but laid them down voluntarily.' },
  { ref: 'Colossians 1:15-17', text: 'Who is the image of the invisible God, the firstborn of every creature: For by him were all things created.', theme: 'Creator', commentary: '"Firstborn" means supreme heir, not first created. Everything that exists was made by Jesus, for Jesus, and holds together in Jesus.' },
  { ref: 'Hebrews 1:3', text: 'Who being the brightness of his glory, and the express image of his person, and upholding all things by the word of his power.', theme: 'Deity', commentary: 'Jesus is the exact representation of God\'s being. To see Jesus is to see God. He sustains the entire universe moment by moment.' },
  { ref: 'Isaiah 53:5', text: 'But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him.', theme: 'Atonement', commentary: 'Written 700 years before the cross. The Suffering Servant bears the punishment that belongs to others. This is substitutionary atonement.' },
  { ref: 'Romans 5:8', text: 'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.', theme: 'Grace', commentary: 'God didn\'t wait for humanity to improve. Christ died for sinners — not for the deserving. This is the scandal of grace.' },
  { ref: 'John 10:30', text: 'I and my Father are one.', theme: 'Deity', commentary: 'The Jews picked up stones to kill Him for blasphemy — they understood exactly what He was claiming: equality with God.' },
  { ref: 'Matthew 28:18-20', text: 'All power is given unto me in heaven and in earth. Go ye therefore, and teach all nations.', theme: 'Authority', commentary: 'The Great Commission. Jesus claims universal authority and sends His followers to every nation. The mission has not been rescinded.' },
  { ref: '1 Corinthians 15:3-4', text: 'Christ died for our sins according to the scriptures; And that he was buried, and that he rose again the third day.', theme: 'Gospel', commentary: 'The earliest creed of Christianity. Paul received this from eyewitnesses within years of the resurrection. This is the gospel in four lines.' },
  { ref: 'Revelation 1:8', text: 'I am Alpha and Omega, the beginning and the ending, saith the Lord, which is, and which was, and which is to come, the Almighty.', theme: 'Eternity', commentary: 'Jesus identifies Himself with titles that belong only to God — eternal, almighty, without beginning or end.' },
  { ref: 'John 11:25-26', text: 'I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live.', theme: 'Resurrection', commentary: 'Spoken to Martha before raising Lazarus. Jesus doesn\'t just give resurrection — He IS resurrection. Life and death answer to Him.' },
];

const FAQ_ITEMS = [
  {
    question: 'Did Jesus actually exist historically?',
    answer: 'Yes. Jesus\' existence is one of the best-attested facts of ancient history. Beyond the four Gospels and Paul\'s letters (written within 20-30 years of the crucifixion), Roman historian Tacitus (Annals 15.44), Jewish historian Josephus (Antiquities 18.63-64, 20.200), and Roman governor Pliny the Younger (Letters 10.96) all reference Jesus or early Christians. Virtually no credible historian — Christian or secular — denies that Jesus of Nazareth lived, taught, and was crucified under Pontius Pilate.',
  },
  {
    question: 'Did Jesus claim to be God?',
    answer: 'Yes — repeatedly and unmistakably. He said "I and my Father are one" (John 10:30) — the Jews tried to stone Him for blasphemy because they understood the claim. He said "Before Abraham was, I AM" (John 8:58), using God\'s personal name from Exodus 3:14. He accepted worship (Matthew 14:33, John 20:28). He forgave sins — something only God can do (Mark 2:5-7). He claimed the authority to judge all humanity (John 5:22). His enemies understood His claims perfectly — that\'s why they killed Him.',
  },
  {
    question: 'What is the Trinity? Is Jesus God or the Son of God?',
    answer: 'Both. The doctrine of the Trinity teaches that one God exists in three Persons: Father, Son, and Holy Spirit — distinct in person, identical in nature. Jesus is fully God and fully human. He is not a lesser God or a created being. John 1:1 says "the Word was God." Colossians 2:9 says "in him dwelleth all the fulness of the Godhead bodily." Jesus is the Son of God in the sense that He shares God\'s nature eternally — not that He was created or is subordinate in essence.',
  },
  {
    question: 'Why did Jesus have to die?',
    answer: 'Because sin separates humanity from a holy God, and the penalty for sin is death (Romans 6:23). God\'s justice requires that sin be punished. God\'s love desires that sinners be saved. The cross satisfies both: Jesus — the sinless Son of God — took the punishment that belonged to us (Isaiah 53:5, 2 Corinthians 5:21). He died as our substitute so that we could be forgiven without God compromising His justice. No one else could have done this because no one else was both fully God (to bear infinite wrath) and fully human (to represent humanity).',
  },
  {
    question: 'Did Jesus really rise from the dead?',
    answer: 'The evidence is substantial. The tomb was empty — even Jesus\' enemies never claimed the body was still there; they said the disciples stole it (Matthew 28:13). Over 500 people saw the risen Jesus at once (1 Corinthians 15:6). The disciples were transformed from terrified fugitives into bold preachers willing to die — people don\'t die for what they know is a lie. James, Jesus\' skeptical brother, became a believer and church leader after seeing the risen Christ. Paul, a violent persecutor of Christians, converted after encountering the risen Jesus. The resurrection is the best explanation for all the evidence.',
  },
  {
    question: 'How is Jesus different from other religious leaders?',
    answer: 'Every other religious founder said, "Follow my teachings." Jesus said, "Follow ME — I am the way" (John 14:6). Buddha pointed to enlightenment. Muhammad pointed to Allah. Moses pointed to the Law. Jesus pointed to Himself. He claimed to be God in the flesh, died as a sacrifice for sin, and rose from the dead — claims no other religious founder made or could verify. Christianity is not primarily a moral system; it is a relationship with a living Person who conquered death.',
  },
  {
    question: 'What did Jesus look like?',
    answer: 'The Bible never describes Jesus\' physical appearance. Isaiah 53:2 says "he hath no form nor comeliness" — suggesting He was ordinary-looking, not the European figure of Renaissance art. As a first-century Jewish man from Galilee, He would have had olive/brown skin, dark hair, and a beard. He was a carpenter (Mark 6:3), which means He worked with His hands. The Bible\'s silence on His appearance is likely intentional — what matters is who He is, not what He looked like.',
  },
  {
    question: 'Was Jesus actually born on December 25?',
    answer: 'Almost certainly not. The Bible does not give a date. Luke 2:8 mentions shepherds watching their flocks at night, which is more consistent with spring or fall than winter in Judea. December 25 was chosen by the early church in the 4th century, possibly to coincide with Roman winter solstice celebrations. The exact date doesn\'t matter theologically — what matters is that "the Word was made flesh, and dwelt among us" (John 1:14).',
  },
  {
    question: 'Did Jesus have brothers and sisters?',
    answer: 'Yes. Matthew 13:55-56 names Jesus\' brothers — James, Joses, Simon, and Judas — and mentions sisters (unnamed). Mark 6:3 confirms this. James became the leader of the Jerusalem church (Acts 15, Galatians 1:19) and wrote the Epistle of James. Jude (Judas) wrote the Epistle of Jude. They did not believe in Jesus during His ministry (John 7:5) but became followers after the resurrection.',
  },
  {
    question: 'What language did Jesus speak?',
    answer: 'Primarily Aramaic — the common language of first-century Palestine. Several of His words are preserved in Aramaic in the Gospels: "Talitha koum" (Mark 5:41), "Ephphatha" (Mark 7:34), "Eloi, Eloi, lema sabachthani" (Mark 15:34). He also knew Hebrew (He read from Isaiah in the synagogue — Luke 4:16-20) and likely understood some Greek, as it was the trade language of the Roman Empire.',
  },
  {
    question: 'Is Jesus coming back?',
    answer: 'Yes — this is one of the most frequently repeated promises in the New Testament. Jesus Himself said, "I will come again" (John 14:3). The angels at His ascension said, "This same Jesus...shall so come in like manner as ye have seen him go" (Acts 1:11). Revelation 22:20 records His final promise: "Surely I come quickly." The New Testament mentions the Second Coming over 300 times. Unlike the first coming in humility, the second will be in power and glory (Matthew 24:30).',
  },
  {
    question: 'How can I have a relationship with Jesus?',
    answer: 'The Bible says to repent (turn from sin) and believe (trust in Jesus as your Savior and Lord). Acts 16:31: "Believe on the Lord Jesus Christ, and thou shalt be saved." Romans 10:9: "If thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved." It is not about being good enough, performing rituals, or understanding theology perfectly. It starts with honesty before God and trust in what Jesus did on the cross.',
  },
];

function verseRefToPath(ref: string): string {
  const m = ref.match(/^(\d?\s*[A-Za-z]+)\s+(\d+):(\d+)/);
  if (!m) return '#';
  const book = m[1].trim().toLowerCase().replace(/\s+/g, '-');
  return `/cross-references/${book}/${m[2]}/${m[3]}`;
}

// ─── Component ──────────────────────────────────────────────────

export default function JesusChristPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    additionalType: 'https://schema.org/LearningResource',
    headline: 'Who Is Jesus Christ? — Complete Guide to His Life, Teachings, Death & Resurrection',
    description: 'Everything the Bible reveals about Jesus Christ — His life, teachings, miracles, death, resurrection, and why He matters today.',
    url: `${SITE_URL}/jesus-christ`,
    author: {
      '@type': 'Organization',
      name: 'Bible Maximum',
      url: SITE_URL,
      sameAs: ['https://facebook.com/biblemaximum', 'https://twitter.com/biblemaximum'],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bible Maximum',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    datePublished: '2026-03-09',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/jesus-christ` },
    about: [
      { '@type': 'Person', name: 'Jesus Christ', sameAs: 'https://www.wikidata.org/wiki/Q302' },
      { '@type': 'Thing', name: 'Christology', sameAs: 'https://www.wikidata.org/wiki/Q160398' },
      { '@type': 'CreativeWork', name: 'New Testament', sameAs: 'https://www.wikidata.org/wiki/Q36279' },
    ],
    mentions: [
      { '@type': 'Person', name: 'Pontius Pilate', sameAs: 'https://www.wikidata.org/wiki/Q17131' },
      { '@type': 'Person', name: 'Mary (mother of Jesus)', sameAs: 'https://www.wikidata.org/wiki/Q345' },
      { '@type': 'Person', name: 'Paul the Apostle', sameAs: 'https://www.wikidata.org/wiki/Q9200' },
      { '@type': 'Person', name: 'Moses', sameAs: 'https://www.wikidata.org/wiki/Q9077' },
      { '@type': 'Person', name: 'King David', sameAs: 'https://www.wikidata.org/wiki/Q41370' },
      { '@type': 'Thing', name: 'Crucifixion of Jesus', sameAs: 'https://www.wikidata.org/wiki/Q51636' },
      { '@type': 'Thing', name: 'Resurrection of Jesus', sameAs: 'https://www.wikidata.org/wiki/Q51668' },
    ],
    isPartOf: { '@type': 'WebSite', name: 'Bible Maximum', url: SITE_URL },
    inLanguage: 'en',
    wordCount: 18000,
    articleSection: 'Bible Study',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#who-is-jesus', 'blockquote'],
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
      { '@type': 'ListItem', position: 3, name: 'Jesus Christ', item: `${SITE_URL}/jesus-christ` },
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
            <li className="text-ink-muted font-medium">Jesus Christ</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-scripture dark:bg-dark-surface overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png"
            alt="Jesus Christ — the central figure of the Bible"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-sacred text-sm font-bold uppercase tracking-widest mb-4">The Central Figure of the Bible</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-display leading-tight mb-8">
            Who Is Jesus Christ?
          </h1>
          <blockquote className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8">
            <p className="text-xl md:text-2xl text-white leading-relaxed italic font-light">
              &ldquo;I am the way, the truth, and the life: no man cometh unto the Father, but by me.&rdquo;
            </p>
            <cite className="block mt-4 text-sacred text-sm font-bold not-italic">— John 14:6 (KJV)</cite>
          </blockquote>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#who-is-jesus" className="inline-flex items-center justify-center bg-scripture hover:bg-ink-muted text-white font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
              Start Reading
            </a>
            <a href="#life-timeline" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
              Life Timeline
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">

        {/* Table of Contents */}
        <nav id="toc" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 mb-12 shadow-sm scroll-mt-20">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
            <a href="#who-is-jesus" className="text-sacred hover:underline text-sm py-1">Who Is Jesus Christ?</a>
            <a href="#names-titles" className="text-sacred hover:underline text-sm py-1">Names and Titles of Jesus</a>
            <a href="#historical-evidence" className="text-sacred hover:underline text-sm py-1">Historical Evidence for Jesus</a>
            <a href="#life-timeline" className="text-sacred hover:underline text-sm py-1">Life of Jesus: Complete Timeline</a>
            <a href="#jewish-context" className="text-sacred hover:underline text-sm py-1">Jewish Palestine in Jesus&apos; Time</a>
            <a href="#teachings" className="text-sacred hover:underline text-sm py-1">What Did Jesus Teach?</a>
            <a href="#miracles" className="text-sacred hover:underline text-sm py-1">Miracles of Jesus</a>
            <a href="#death-resurrection" className="text-sacred hover:underline text-sm py-1">Death and Resurrection</a>
            <a href="#prophecies" className="text-sacred hover:underline text-sm py-1">Messianic Prophecies Fulfilled</a>
            <a href="#greek-hebrew" className="text-sacred hover:underline text-sm py-1">Greek &amp; Hebrew Word Study</a>
            <a href="#theology" className="text-sacred hover:underline text-sm py-1">Theological Significance</a>
            <a href="#jesus-and-law" className="text-sacred hover:underline text-sm py-1">Jesus and the Jewish Law</a>
            <a href="#why-it-matters" className="text-sacred hover:underline text-sm py-1">Why Jesus Still Matters</a>
            <a href="#honest-questions" className="text-sacred hover:underline text-sm py-1">Honest Questions People Ask</a>
            <a href="#cross-references" className="text-sacred hover:underline text-sm py-1">12 Key Cross-References</a>
            <a href="#faq" className="text-sacred hover:underline text-sm py-1">Frequently Asked Questions</a>
            <a href="#continue" className="text-sacred hover:underline text-sm py-1">Continue Your Study</a>
          </div>
        </nav>

        {/* Who Is Jesus Christ? */}
        <section id="who-is-jesus" className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 mb-12 shadow-sm scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-4">Who Is Jesus Christ?</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed text-lg mb-4">
            Jesus Christ is the central figure of the Christian faith and the most influential person in human history. He was a first-century Jewish man from Nazareth who claimed to be the Son of God, performed miracles, taught with unparalleled authority, was crucified under the Roman governor <Link href="/characters/pontius-pilate" className="text-sacred hover:underline">Pontius Pilate</Link>, and &mdash; according to over 500 eyewitnesses &mdash; rose from the dead three days later.
          </p>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            The name &ldquo;Jesus&rdquo; comes from the Hebrew <em>Yeshua</em>, meaning &ldquo;Yahweh saves.&rdquo; The title &ldquo;Christ&rdquo; comes from the Greek <em><Link href="/greek-word/christos" className="text-sacred hover:underline">Christos</Link></em>, meaning &ldquo;Anointed One&rdquo; &mdash; the Greek equivalent of the Hebrew <em>Mashiach</em> (Messiah). Jesus Christ is not a first and last name. It is a name and a title: Jesus, the Messiah.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="bg-sacred-light dark:bg-sacred-light0/20 border border-sacred/20 dark:border-sacred/20 rounded-lg p-4">
              <p className="text-sm font-bold text-scripture dark:text-sacred mb-1">Fully God</p>
              <p className="text-scripture dark:text-ink-light text-sm">&ldquo;In the beginning was the Word, and the Word was with God, and the Word was God&rdquo; (<Link href="/cross-references/john/1/1" className="text-sacred hover:underline">John 1:1</Link>).</p>
            </div>
            <div className="bg-sacred-light dark:bg-sacred-light0/20 border border-sacred/20 dark:border-sacred/20 rounded-lg p-4">
              <p className="text-sm font-bold text-scripture dark:text-sacred mb-1">Fully Human</p>
              <p className="text-scripture dark:text-ink-light text-sm">&ldquo;The Word was made flesh, and dwelt among us&rdquo; (<Link href="/cross-references/john/1/14" className="text-sacred hover:underline">John 1:14</Link>). He hungered, wept, slept, and suffered.</p>
            </div>
            <div className="bg-sacred-light dark:bg-sacred-light0/20 border border-sacred/20 dark:border-sacred/20 rounded-lg p-4">
              <p className="text-sm font-bold text-scripture dark:text-sacred mb-1">Died for Sinners</p>
              <p className="text-scripture dark:text-ink-light text-sm">&ldquo;While we were yet sinners, Christ died for us&rdquo; (<Link href="/cross-references/romans/5/8" className="text-sacred hover:underline">Romans 5:8</Link>). His death was substitutionary — He took our place.</p>
            </div>
            <div className="bg-sacred-light dark:bg-sacred-light0/20 border border-sacred/20 dark:border-sacred/20 rounded-lg p-4">
              <p className="text-sm font-bold text-scripture dark:text-sacred mb-1">Rose from the Dead</p>
              <p className="text-scripture dark:text-ink-light text-sm">&ldquo;He is not here: for he is risen, as he said&rdquo; (<Link href="/cross-references/matthew/28/6" className="text-sacred hover:underline">Matthew 28:6</Link>). The resurrection is the foundation of Christianity.</p>
            </div>
          </div>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-4">
            Every major religion acknowledges Jesus in some way. Islam calls Him a prophet. Judaism considers Him a historical figure. Secular historians confirm His existence. But the Bible makes a claim that no other source makes: Jesus is God incarnate &mdash; the Creator of the universe who entered His own creation to rescue it from sin and death.
          </p>
          <p className="text-scripture dark:text-ink-light leading-relaxed">
            This page examines everything the Bible reveals about Jesus Christ &mdash; His names, His life, His teachings, His miracles, His death, His resurrection, and why He still matters two thousand years later. Whether you are a skeptic, a seeker, or a lifelong believer, the evidence is here for you to weigh.
          </p>
        </section>

        {/* Names and Titles of Jesus */}
        <section id="names-titles" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Names and Titles of Jesus</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm">The Bible gives Jesus over 200 names and titles. Each one reveals a different facet of who He is.</p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary-light/30 dark:bg-dark-bg border-b border-grace dark:border-dark-border">
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Name / Title</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Greek / Hebrew</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Meaning</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Key Verse</th>
                </tr>
              </thead>
              <tbody>
                {NAMES_AND_TITLES.map((row, idx) => (
                  <tr key={idx} className="border-b border-grace/50 dark:border-dark-border/50 hover:bg-primary-light/10 dark:hover:bg-dark-bg/50">
                    <td className="p-3 font-medium text-scripture dark:text-white">{row.name}</td>
                    <td className="p-3 text-scripture dark:text-sacred text-xs">
                      <span className="block">{row.greek}</span>
                      {row.hebrew !== '—' && <span className="block">{row.hebrew}</span>}
                    </td>
                    <td className="p-3 text-scripture dark:text-ink-light">{row.meaning}</td>
                    <td className="p-3 text-sacred whitespace-nowrap"><Link href={verseRefToPath(row.keyVerse)} className="hover:underline">{row.keyVerse}</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Historical Evidence for Jesus */}
        <section id="historical-evidence" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Historical Evidence for Jesus</h2>
          <p className="text-scripture dark:text-ink-light leading-relaxed mb-6">
            The existence of Jesus of Nazareth is not a matter of faith alone. It is one of the best-attested facts of ancient history. Here are the primary sources &mdash; both Christian and non-Christian &mdash; that confirm Jesus lived, taught, and was crucified in first-century Palestine.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Christian</span>
                <h3 className="font-bold text-scripture dark:text-white">The Four Gospels</h3>
              </div>
              <p className="text-scripture dark:text-ink-light text-sm leading-relaxed">
                Matthew, Mark, Luke, and John &mdash; written between AD 50-90, within the lifetime of eyewitnesses. Mark is the earliest (~AD 50-60). Luke explicitly claims to have &ldquo;carefully investigated everything from the beginning&rdquo; (<Link href="/cross-references/luke/1/3" className="text-sacred hover:underline">Luke 1:3</Link>).
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Christian</span>
                <h3 className="font-bold text-scripture dark:text-white">Paul&apos;s Letters</h3>
              </div>
              <p className="text-scripture dark:text-ink-light text-sm leading-relaxed">
                Written AD 48-67 &mdash; the earliest Christian documents. <Link href="/characters/paul" className="text-sacred hover:underline">Paul</Link> personally knew Peter, James (Jesus&apos; brother), and other eyewitnesses. 1 Corinthians 15:3-8 contains a creed dating to within 3-5 years of the crucifixion.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">Roman</span>
                <h3 className="font-bold text-scripture dark:text-white">Tacitus (AD 116)</h3>
              </div>
              <p className="text-scripture dark:text-ink-light text-sm leading-relaxed">
                Roman historian. In <em>Annals</em> 15.44, he writes that &ldquo;Christus&rdquo; was executed under Pontius Pilate during the reign of Tiberius. Tacitus despised Christians &mdash; he had no motive to fabricate this.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">Jewish</span>
                <h3 className="font-bold text-scripture dark:text-white">Josephus (AD 93-94)</h3>
              </div>
              <p className="text-scripture dark:text-ink-light text-sm leading-relaxed">
                Jewish historian. In <em>Antiquities</em> 18.63-64, he mentions Jesus as a &ldquo;wise man&rdquo; who performed &ldquo;surprising deeds&rdquo; and was crucified under Pilate. In 20.200, he identifies James as &ldquo;the brother of Jesus, who was called Christ.&rdquo;
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">Roman</span>
                <h3 className="font-bold text-scripture dark:text-white">Pliny the Younger (AD 112)</h3>
              </div>
              <p className="text-scripture dark:text-ink-light text-sm leading-relaxed">
                Roman governor of Bithynia. In <em>Letters</em> 10.96, he describes Christians who &ldquo;sang hymns to Christ as to a god&rdquo; and refused to worship the emperor. He asked Emperor Trajan how to handle them.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">Jewish</span>
                <h3 className="font-bold text-scripture dark:text-white">Talmud (AD 200-500)</h3>
              </div>
              <p className="text-scripture dark:text-ink-light text-sm leading-relaxed">
                The Babylonian Talmud (Sanhedrin 43a) records that &ldquo;Yeshu&rdquo; was &ldquo;hanged on the eve of Passover&rdquo; for practicing sorcery and leading Israel astray. Hostile witness &mdash; confirms the crucifixion and that Jesus performed extraordinary acts.
              </p>
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <p className="text-sm text-amber-900 dark:text-amber-200">
              <strong>Key point:</strong> We have more historical evidence for Jesus of Nazareth than for most figures of antiquity. By comparison, the earliest surviving manuscript of Julius Caesar&apos;s <em>Gallic Wars</em> dates to ~900 years after it was written. The earliest New Testament manuscripts date to within 25-50 years of the originals.
            </p>
          </div>
        </section>

        {/* Life Timeline */}
        <section id="life-timeline" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Life of Jesus Christ: Complete Timeline</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm">From eternity past to His ascension &mdash; every major event in Jesus&apos; life.</p>

          {/* Visual Timeline */}
          <div className="space-y-0 mb-6">
            {LIFE_TIMELINE.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full shrink-0 ${item.period === 'Crucifixion' ? 'bg-red-600' : item.period === 'Resurrection' ? 'bg-green-600' : item.period === 'Pre-existence' ? 'bg-scripture/10' : 'bg-scripture'}`} />
                  {idx < LIFE_TIMELINE.length - 1 && <div className="w-0.5 flex-1 bg-grace dark:bg-dark-border min-h-[40px]" />}
                </div>
                {/* Content */}
                <div className="pb-6 flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-bold text-sacred dark:text-sacred uppercase tracking-wider">{item.date}</span>
                    <span className="text-xs text-ink-light">•</span>
                    <Link href={verseRefToPath(item.reference)} className="text-xs text-sacred hover:underline">{item.reference}</Link>
                  </div>
                  <h3 className="font-bold text-scripture dark:text-white text-sm mb-1">{item.event}</h3>
                  <p className="text-ink-muted dark:text-ink-light text-xs leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Jewish Palestine */}
        <section id="jewish-context" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Jewish Palestine in Jesus&apos; Time</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">The Political Situation</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                When Jesus was born, Israel had not been a sovereign nation for over 500 years. The Babylonians conquered Jerusalem in 586 BC. Then came the Persians, then the Greeks, then a brief period of independence under the Maccabees (164-63 BC), and finally Rome. By Jesus&apos; time, the Roman Empire controlled Palestine through a combination of client kings (like <Link href="/characters/herod-the-great" className="text-sacred hover:underline">Herod the Great</Link>) and direct governors (like Pontius Pilate).
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                The Jewish people were divided in their response. The <strong>Pharisees</strong> focused on strict Torah observance, believing faithfulness would hasten God&apos;s deliverance. The <strong>Sadducees</strong> cooperated with Rome to preserve their temple authority. The <strong>Zealots</strong> advocated armed revolt. The <strong>Essenes</strong> withdrew to the desert to wait for God to act. Into this fractured landscape walked a carpenter from Nazareth who fit none of their categories.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">Messianic Expectations</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                First-century Jews were waiting for a Messiah &mdash; but they expected a military conqueror, a second David who would overthrow Rome and restore Israel&apos;s kingdom. The Psalms of Solomon (a first-century Jewish text) describe the expected Messiah as one who would &ldquo;purge Jerusalem from the nations&rdquo; and &ldquo;shatter all their substance with an iron rod.&rdquo;
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                Jesus subverted every expectation. He came not on a warhorse but on a donkey. He conquered not with a sword but with a cross. His kingdom was &ldquo;not of this world&rdquo; (<Link href="/cross-references/john/18/36" className="text-sacred hover:underline">John 18:36</Link>). He offered not political liberation but spiritual rescue. This is why so many rejected Him &mdash; He wasn&apos;t the Messiah they wanted. He was the Messiah they needed.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">Economic and Social Conditions</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                Most people in Galilee were peasant farmers and fishermen, taxed heavily by both Rome and the temple system. Tax collectors like <Link href="/characters/matthew" className="text-sacred hover:underline">Matthew</Link> were despised as traitors. The wealthy priestly aristocracy controlled the Jerusalem temple &mdash; a massive economic engine that employed thousands and collected tithes from every Jewish male.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                Jesus chose His disciples from the working class: fishermen, a tax collector, a zealot. He touched lepers, ate with sinners, and taught that the last would be first. His message was dangerous not because it was otherworldly but because it upended every social hierarchy His listeners lived under.
              </p>
            </div>
          </div>
        </section>

        {/* What Did Jesus Teach? */}
        <section id="teachings" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">What Did Jesus Teach?</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">The Kingdom of God</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                The kingdom of God was the central theme of Jesus&apos; teaching. He began His ministry with the words: &ldquo;The time is fulfilled, and the kingdom of God is at hand: repent ye, and believe the gospel&rdquo; (<Link href="/cross-references/mark/1/15" className="text-sacred hover:underline">Mark 1:15</Link>). The kingdom is not a place you go when you die. It is God&apos;s rule breaking into the present world &mdash; wherever God&apos;s will is done, the kingdom is present.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                Jesus taught that the kingdom is both &ldquo;already&rdquo; and &ldquo;not yet.&rdquo; It has already arrived in Jesus&apos; person and ministry (Luke 17:21), but it will be consummated when He returns in glory (Matthew 25:31-34). Christians live in the overlap &mdash; the kingdom is here, but it is not yet complete.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">The Sermon on the Mount</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                The <Link href="/bible-chapter-summaries/matthew/5" className="text-sacred hover:underline">Sermon on the Mount</Link> (Matthew 5-7) is the most famous ethical teaching in history. It includes the Beatitudes (&ldquo;Blessed are the poor in spirit&rdquo;), the Lord&apos;s Prayer, the Golden Rule, and radical commands like loving your enemies, turning the other cheek, and not worrying about tomorrow.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                Jesus didn&apos;t abolish the Old Testament law &mdash; He intensified it. Murder starts with anger. Adultery starts with lust. The standard is not external compliance but internal transformation. No one can meet this standard on their own. That&apos;s the point: the Sermon on the Mount drives you to grace by showing you how far short you fall.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">The Parables</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                Jesus told over 30 parables &mdash; short stories drawn from everyday life that teach spiritual truths. The parable of the Prodigal Son (<Link href="/cross-references/luke/15/11" className="text-sacred hover:underline">Luke 15:11-32</Link>) reveals a father&apos;s unconditional love. The parable of the Good Samaritan (<Link href="/cross-references/luke/10/30" className="text-sacred hover:underline">Luke 10:30-37</Link>) redefines &ldquo;neighbor&rdquo; across ethnic boundaries. The parable of the Sower (Matthew 13) explains why people respond differently to the same message.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                Parables do something that direct teaching cannot: they bypass intellectual defenses and engage the heart. When the prophet Nathan needed to confront King David, he told a story (2 Samuel 12). Jesus used the same technique on an entire nation. Those who had ears to hear understood; those who refused to listen heard only stories.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">Love as the Supreme Ethic</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                When asked which commandment was the greatest, Jesus answered: &ldquo;Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind. This is the first and great commandment. And the second is like unto it, Thou shalt love thy neighbour as thyself&rdquo; (<Link href="/cross-references/matthew/22/37" className="text-sacred hover:underline">Matthew 22:37-39</Link>).
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                But Jesus&apos; definition of love was not sentimental. It was sacrificial: &ldquo;Greater love hath no man than this, that a man lay down his life for his friends&rdquo; (<Link href="/cross-references/john/15/13" className="text-sacred hover:underline">John 15:13</Link>). And He extended it beyond friends to enemies: &ldquo;Love your enemies, bless them that curse you&rdquo; (Matthew 5:44). Jesus didn&apos;t just teach this &mdash; He demonstrated it on the cross, praying for the soldiers who crucified Him: &ldquo;Father, forgive them; for they know not what they do&rdquo; (<Link href="/cross-references/luke/23/34" className="text-sacred hover:underline">Luke 23:34</Link>).
              </p>
            </div>
          </div>
        </section>

        {/* Miracles of Jesus */}
        <section id="miracles" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Miracles of Jesus</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm">The Gospels record over 35 specific miracles. Each one reveals something about who Jesus is and what He came to do.</p>

          {/* Miracle Category Chart */}
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 shadow-sm mb-6">
            <h3 className="text-lg font-bold text-scripture dark:text-white mb-4">Miracles by Category</h3>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="bg-sacred-light dark:bg-sacred-light0/20 rounded-lg p-4">
                <p className="text-3xl font-bold text-sacred">4</p>
                <p className="text-xs text-ink-muted dark:text-ink-light mt-1">Nature Miracles</p>
                <div className="w-full bg-sacred/20 dark:bg-scripture rounded-full h-2 mt-2"><div className="bg-scripture h-2 rounded-full" style={{ width: '33%' }} /></div>
              </div>
              <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4">
                <p className="text-3xl font-bold text-green-600">17+</p>
                <p className="text-xs text-ink-muted dark:text-ink-light mt-1">Healings</p>
                <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2 mt-2"><div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }} /></div>
              </div>
              <div className="bg-scripture/5 dark:bg-scripture/10/20 rounded-lg p-4">
                <p className="text-3xl font-bold text-scripture">3</p>
                <p className="text-xs text-ink-muted dark:text-ink-light mt-1">Resurrections</p>
                <div className="w-full bg-scripture/10 dark:bg-scripture/10 rounded-full h-2 mt-2"><div className="bg-scripture/10 h-2 rounded-full" style={{ width: '25%' }} /></div>
              </div>
              <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4">
                <p className="text-3xl font-bold text-red-600">6+</p>
                <p className="text-xs text-ink-muted dark:text-ink-light mt-1">Exorcisms</p>
                <div className="w-full bg-red-200 dark:bg-red-800 rounded-full h-2 mt-2"><div className="bg-red-600 h-2 rounded-full" style={{ width: '50%' }} /></div>
              </div>
            </div>
          </div>

          {/* Miracles Table */}
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary-light/30 dark:bg-dark-bg border-b border-grace dark:border-dark-border">
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Category</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Miracle</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Reference</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Significance</th>
                </tr>
              </thead>
              <tbody>
                {MIRACLES.map((row, idx) => (
                  <tr key={idx} className="border-b border-grace/50 dark:border-dark-border/50 hover:bg-primary-light/10 dark:hover:bg-dark-bg/50">
                    <td className="p-3">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${row.category === 'Nature' ? 'bg-sacred/10 text-scripture dark:bg-scripture dark:text-sacred' : row.category === 'Healing' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : row.category === 'Resurrection' ? 'bg-scripture/10 text-scripture dark:bg-scripture/10 dark:text-scripture' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'}`}>
                        {row.category}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-scripture dark:text-white">{row.miracle}</td>
                    <td className="p-3 text-sacred whitespace-nowrap"><Link href={verseRefToPath(row.reference)} className="hover:underline">{row.reference}</Link></td>
                    <td className="p-3 text-scripture dark:text-ink-light">{row.significance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-ink-muted dark:text-ink-light text-sm mt-4">
            The miracles were not magic tricks. They were signs &mdash; each one pointed to who Jesus is. He has authority over nature (Creator), disease (Healer), death (Life-giver), and demons (Conqueror). John called them &ldquo;signs&rdquo; because they signify something beyond themselves (<Link href="/cross-references/john/20/30" className="text-sacred hover:underline">John 20:30-31</Link>).
          </p>
        </section>

        {/* Death and Resurrection */}
        <section id="death-resurrection" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">The Death and Resurrection of Jesus Christ</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">The Crucifixion</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                Jesus was arrested in the Garden of Gethsemane after being betrayed by <Link href="/characters/judas-iscariot" className="text-sacred hover:underline">Judas Iscariot</Link> for 30 pieces of silver. He was tried before the Jewish Sanhedrin, then before Pontius Pilate, then Herod Antipas, then back to Pilate. He was flogged with a Roman scourge &mdash; a whip embedded with bone and metal that tore flesh to the bone. A crown of thorns was pressed into His scalp. He was forced to carry His own cross through the streets of Jerusalem.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                Crucifixion was Rome&apos;s most brutal form of execution, reserved for slaves, rebels, and the worst criminals. Iron nails were driven through the wrists and feet. Death came slowly from a combination of shock, blood loss, and asphyxiation as the victim could no longer push up to breathe. Jesus hung on the cross for approximately six hours.
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                From the cross, Jesus spoke seven times. He forgave His executioners (<Link href="/cross-references/luke/23/34" className="text-sacred hover:underline">Luke 23:34</Link>). He promised paradise to the repentant thief (<Link href="/cross-references/luke/23/43" className="text-sacred hover:underline">Luke 23:43</Link>). He entrusted His mother to <Link href="/characters/john-apostle" className="text-sacred hover:underline">John</Link>. He cried out, &ldquo;My God, my God, why hast thou forsaken me?&rdquo; &mdash; quoting <Link href="/cross-references/psalm/22/1" className="text-sacred hover:underline">Psalm 22:1</Link>, a prophecy of His own death. And finally: &ldquo;It is finished&rdquo; (<Link href="/cross-references/john/19/30" className="text-sacred hover:underline">John 19:30</Link>). The Greek word <em>tetelestai</em> was stamped on paid receipts. The debt of sin was paid in full.
              </p>
            </div>

            {/* Passion Week Timeline */}
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-4">Passion Week at a Glance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  { day: 'Sunday', event: 'Triumphal Entry', ref: 'Matt 21:1-11' },
                  { day: 'Monday', event: 'Temple Cleansed', ref: 'Mark 11:15-18' },
                  { day: 'Tuesday', event: 'Teaching & Debates', ref: 'Matt 21-25' },
                  { day: 'Wednesday', event: 'Judas Plots Betrayal', ref: 'Matt 26:14-16' },
                  { day: 'Thursday', event: 'Last Supper & Gethsemane', ref: 'Luke 22:14-46' },
                  { day: 'Friday', event: 'Trial, Crucifixion, Burial', ref: 'John 18-19' },
                  { day: 'Saturday', event: 'In the Tomb', ref: 'Matt 27:62-66' },
                  { day: 'Sunday', event: 'Resurrection', ref: 'Matt 28:1-10' },
                ].map((d, i) => (
                  <div key={i} className={`rounded-lg p-3 border ${d.day === 'Friday' ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800' : d.event === 'Resurrection' ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' : 'bg-primary-light/20 dark:bg-dark-bg border-grace dark:border-dark-border'}`}>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${d.day === 'Friday' ? 'text-red-700 dark:text-red-300' : d.event === 'Resurrection' ? 'text-green-700 dark:text-green-300' : 'text-scripture dark:text-sacred'}`}>{d.day}</p>
                    <p className="text-sm font-medium text-scripture dark:text-white">{d.event}</p>
                    <p className="text-xs text-ink-muted dark:text-ink-light mt-1">{d.ref}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">The Resurrection</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                On the third day, the tomb was empty. The stone had been rolled away. An angel announced: &ldquo;He is not here: for he is risen, as he said&rdquo; (<Link href="/cross-references/matthew/28/6" className="text-sacred hover:underline">Matthew 28:6</Link>). Jesus appeared first to <Link href="/characters/mary-magdalene" className="text-sacred hover:underline">Mary Magdalene</Link>, then to the other women, then to Peter, then to two disciples on the road to Emmaus, then to the Twelve, then to over 500 people at once (<Link href="/cross-references/1-corinthians/15/6" className="text-sacred hover:underline">1 Corinthians 15:6</Link>).
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                The resurrection is the single most important event in Christianity. <Link href="/characters/paul" className="text-sacred hover:underline">Paul</Link> said it plainly: &ldquo;If Christ be not risen, then is our preaching vain, and your faith is also vain&rdquo; (<Link href="/cross-references/1-corinthians/15/14" className="text-sacred hover:underline">1 Corinthians 15:14</Link>). If Jesus stayed dead, Christianity is a fraud. If He rose, He is who He claimed to be — and everything changes.
              </p>

              {/* Evidence Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <p className="text-xs font-bold text-green-800 dark:text-green-300 mb-1">Empty Tomb</p>
                  <p className="text-scripture dark:text-ink-light text-xs">Even Jesus&apos; enemies admitted the tomb was empty. They claimed the body was stolen (Matt 28:13) &mdash; they never denied it was gone.</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <p className="text-xs font-bold text-green-800 dark:text-green-300 mb-1">500+ Eyewitnesses</p>
                  <p className="text-scripture dark:text-ink-light text-xs">Paul names witnesses who were still alive when he wrote (1 Cor 15:6) &mdash; inviting verification. You don&apos;t do that if you&apos;re lying.</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <p className="text-xs font-bold text-green-800 dark:text-green-300 mb-1">Transformed Disciples</p>
                  <p className="text-scripture dark:text-ink-light text-xs">The same men who fled in terror at the arrest became bold preachers willing to die. Something happened. People don&apos;t die for known lies.</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <p className="text-xs font-bold text-green-800 dark:text-green-300 mb-1">Hostile Conversions</p>
                  <p className="text-scripture dark:text-ink-light text-xs">James (Jesus&apos; skeptical brother) and Paul (a violent persecutor) both converted after seeing the risen Christ. No other explanation fits.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Messianic Prophecies */}
        <section id="prophecies" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Messianic Prophecies Fulfilled by Jesus</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm">The Old Testament contains over 300 prophecies about the Messiah. Jesus fulfilled every one. Here are 13 of the most specific.</p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary-light/30 dark:bg-dark-bg border-b border-grace dark:border-dark-border">
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Prophecy</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Old Testament</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">New Testament</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Detail</th>
                </tr>
              </thead>
              <tbody>
                {MESSIANIC_PROPHECIES.map((row, idx) => (
                  <tr key={idx} className="border-b border-grace/50 dark:border-dark-border/50 hover:bg-primary-light/10 dark:hover:bg-dark-bg/50">
                    <td className="p-3 font-medium text-scripture dark:text-white">{row.prophecy}</td>
                    <td className="p-3 text-sacred whitespace-nowrap"><Link href={verseRefToPath(row.ot)} className="hover:underline">{row.ot}</Link></td>
                    <td className="p-3 text-sacred whitespace-nowrap"><Link href={verseRefToPath(row.nt)} className="hover:underline">{row.nt}</Link></td>
                    <td className="p-3 text-scripture dark:text-ink-light">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-4">
            <p className="text-sm text-amber-900 dark:text-amber-200">
              <strong>The mathematics:</strong> Mathematician Peter Stoner calculated that the probability of one person fulfilling just 8 of these prophecies by chance is 1 in 10<sup>17</sup> (1 in 100,000,000,000,000,000). Fulfilling 48 prophecies: 1 in 10<sup>157</sup>. Jesus fulfilled over 300. The prophetic evidence alone makes His identity as Messiah statistically undeniable.
            </p>
          </div>
        </section>

        {/* Greek & Hebrew Word Study */}
        <section id="greek-hebrew" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">Greek &amp; Hebrew Word Study: Key Terms for Understanding Jesus</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm">The original languages reveal depths of meaning that English translations can only approximate.</p>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary-light/30 dark:bg-dark-bg border-b border-grace dark:border-dark-border">
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Word</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Meaning</th>
                  <th className="text-left p-3 font-bold text-scripture dark:text-white">Significance</th>
                </tr>
              </thead>
              <tbody>
                {GREEK_HEBREW_TERMS.map((row, idx) => (
                  <tr key={idx} className="border-b border-grace/50 dark:border-dark-border/50 hover:bg-primary-light/10 dark:hover:bg-dark-bg/50">
                    <td className="p-3 text-scripture dark:text-sacred font-medium">{row.word}</td>
                    <td className="p-3 text-scripture dark:text-ink-light">{row.meaning}</td>
                    <td className="p-3 text-scripture dark:text-ink-light">{row.significance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-ink-muted dark:text-ink-light text-sm mt-4">
            Explore detailed word studies: <Link href="/greek-word/christos" className="text-sacred hover:underline font-medium">Christos</Link>, <Link href="/greek-word/kurios" className="text-sacred hover:underline font-medium">Kurios (Lord)</Link>, <Link href="/greek-word/logos" className="text-sacred hover:underline font-medium">Logos (Word)</Link>, <Link href="/greek-word/monogenes" className="text-sacred hover:underline font-medium">Monogenēs (One and Only)</Link>, <Link href="/greek-word/soter" className="text-sacred hover:underline font-medium">Sōtēr (Savior)</Link>.
          </p>
        </section>

        {/* Theological Significance */}
        <section id="theology" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Theological Significance of Jesus Christ</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">The Incarnation: God Became Man</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                The incarnation is the doctrine that the eternal Son of God took on human nature without ceasing to be God. &ldquo;The Word was made flesh, and dwelt among us&rdquo; (<Link href="/cross-references/john/1/14" className="text-sacred hover:underline">John 1:14</Link>). Jesus is not half God and half man. He is fully God and fully man in one Person &mdash; two natures united without confusion, change, division, or separation (the Chalcedonian Definition of AD 451).
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                Why does this matter? Because only someone who is fully God can bear the infinite weight of human sin. And only someone who is fully human can represent humanity before God. The incarnation makes salvation possible. Without it, the cross is either insufficient (if Jesus is merely human) or irrelevant (if He is merely God). He had to be both.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">The Atonement: Substitutionary Sacrifice</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                The atonement is the central act of Christianity: Jesus died in the place of sinners, bearing the punishment they deserved. <Link href="/cross-references/isaiah/53/5" className="text-sacred hover:underline">Isaiah 53:5</Link>: &ldquo;He was wounded for our transgressions, he was bruised for our iniquities.&rdquo; <Link href="/cross-references/2-corinthians/5/21" className="text-sacred hover:underline">2 Corinthians 5:21</Link>: &ldquo;He hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him.&rdquo;
              </p>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                This is substitutionary atonement: Jesus took what we deserved (death) so that we could receive what He deserved (life). The entire Old Testament sacrificial system &mdash; lambs, bulls, goats, the Day of Atonement &mdash; was a preview pointing to the one sacrifice that would actually remove sin permanently (<Link href="/cross-references/hebrews/10/12" className="text-sacred hover:underline">Hebrews 10:12</Link>).
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">Prophet, Priest, and King</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
                In the Old Testament, three offices were anointed: prophets (who spoke God&apos;s word), priests (who mediated between God and people), and kings (who ruled God&apos;s people). No one person held all three. Jesus holds all three simultaneously and perfectly:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-sacred-light dark:bg-sacred-light0/20 border border-sacred/20 dark:border-sacred/20 rounded-lg p-4 text-center">
                  <p className="text-sm font-bold text-scripture dark:text-sacred mb-1">Prophet</p>
                  <p className="text-scripture dark:text-ink-light text-xs">Speaks God&apos;s word with final authority. &ldquo;The Father who sent me gave me a command, what I should say&rdquo; (John 12:49).</p>
                </div>
                <div className="bg-sacred-light dark:bg-sacred-light0/20 border border-sacred/20 dark:border-sacred/20 rounded-lg p-4 text-center">
                  <p className="text-sm font-bold text-scripture dark:text-sacred mb-1">Priest</p>
                  <p className="text-scripture dark:text-ink-light text-xs">Mediates between God and man. Offers Himself as the sacrifice and intercedes for believers forever (Hebrews 7:25).</p>
                </div>
                <div className="bg-sacred-light dark:bg-sacred-light0/20 border border-sacred/20 dark:border-sacred/20 rounded-lg p-4 text-center">
                  <p className="text-sm font-bold text-scripture dark:text-sacred mb-1">King</p>
                  <p className="text-scripture dark:text-ink-light text-xs">Rules God&apos;s kingdom with absolute authority. &ldquo;All power is given unto me in heaven and in earth&rdquo; (Matthew 28:18).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Jesus and the Jewish Law */}
        <section id="jesus-and-law" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Jesus and the Jewish Law</h2>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm">
            <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
              Jesus&apos; relationship to the Jewish law is one of the most debated topics in New Testament scholarship. He appeared to both uphold and challenge the Torah. He said, &ldquo;Think not that I am come to destroy the law, or the prophets: I am not come to destroy, but to fulfil&rdquo; (<Link href="/cross-references/matthew/5/17" className="text-sacred hover:underline">Matthew 5:17</Link>). Yet He healed on the Sabbath, touched lepers, ate with sinners, and declared all foods clean.
            </p>
            <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
              The resolution lies in understanding what &ldquo;fulfil&rdquo; means. Jesus did not abolish the law &mdash; He completed it. The law pointed to Him the way a shadow points to the object casting it. The Sabbath rest foreshadowed the spiritual rest He offers (<Link href="/cross-references/hebrews/4/9" className="text-sacred hover:underline">Hebrews 4:9-10</Link>). The sacrificial system foreshadowed His once-for-all sacrifice. The purity laws foreshadowed the inner cleansing He provides.
            </p>
            <p className="text-scripture dark:text-ink-light leading-relaxed mb-3">
              When Jesus healed on the Sabbath (<Link href="/cross-references/mark/3/1" className="text-sacred hover:underline">Mark 3:1-5</Link>), He was not violating the law &mdash; He was demonstrating that He is Lord of the Sabbath (Mark 2:28). The Sabbath was made to serve people, not to enslave them. When He declared foods clean (<Link href="/cross-references/mark/7/19" className="text-sacred hover:underline">Mark 7:19</Link>), He was not contradicting Moses but signaling that the age of external ceremonial law was giving way to the age of internal spiritual transformation.
            </p>
            <p className="text-scripture dark:text-ink-light leading-relaxed">
              This is what infuriated the Pharisees: Jesus claimed the authority to interpret the law because He was the one who gave it in the first place. He didn&apos;t debate as a rabbi under the law. He taught as the Author of the law. That autonomy &mdash; that direct, personal authority &mdash; was what the religious establishment could not tolerate.
            </p>
          </div>
        </section>

        {/* Why Jesus Still Matters */}
        <section id="why-it-matters" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Why Jesus Christ Still Matters</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">The Most Influential Person in History</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                Two thousand years after a carpenter from Nazareth was executed by Rome, 2.4 billion people follow Him. The calendar is split by His birth. Hospitals, universities, and charitable organizations trace their origins to His teachings. The abolition of slavery, the development of human rights, and the rise of universal education were all driven by people who took His words seriously. No other person &mdash; king, philosopher, conqueror, or scientist &mdash; has shaped human civilization more profoundly than Jesus Christ.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">He Answers the Deepest Questions</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                Every human being asks: Does life have meaning? Is there something after death? Am I loved? Can I be forgiven? Jesus answered all four. Life has meaning because God created you with purpose. There is something after death because Jesus conquered the grave and promises <Link href="/topics/eternal-life" className="text-sacred hover:underline">eternal life</Link> to all who believe. You are loved &mdash; &ldquo;God so loved the world, that he gave his only begotten Son&rdquo; (<Link href="/john-3-16" className="text-sacred hover:underline">John 3:16</Link>). And yes, you can be forgiven &mdash; completely, permanently, starting right now.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-scripture dark:text-white mb-3">His Claims Demand a Response</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed">
                C.S. Lewis framed it this way: &ldquo;A man who was merely a man and said the sort of things Jesus said would not be a great moral teacher. He would either be a lunatic &mdash; on a level with the man who says he is a poached egg &mdash; or else he would be the Devil of Hell. You must make your choice.&rdquo; Jesus claimed to be God. He claimed to forgive sins. He claimed to be the only way to the Father. He claimed He would rise from the dead &mdash; and did. These are not the claims of a good teacher. They are the claims of someone who is either delusional, deceptive, or divine. Neutrality is not an option. As <Link href="/romans-8-28" className="text-sacred hover:underline">Romans 8:28</Link> reminds us, God works all things for the good of those who love Him &mdash; but that promise belongs to those who respond to Christ, not those who remain undecided.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Study Links */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/characters/jesus" className="flex items-center gap-2 bg-white dark:bg-dark-surface rounded-lg p-3 border border-grace dark:border-dark-border hover:border-sacred/50 transition-colors shadow-sm">
            <span className="w-8 h-8 rounded-full bg-scripture text-white flex items-center justify-center text-sm font-bold shrink-0">J</span>
            <span className="text-sm font-medium text-scripture dark:text-white">Jesus Character Study</span>
          </Link>
          <Link href="/john-chapters" className="flex items-center gap-2 bg-white dark:bg-dark-surface rounded-lg p-3 border border-grace dark:border-dark-border hover:border-sacred/50 transition-colors shadow-sm">
            <span className="w-8 h-8 rounded-full bg-scripture text-white flex items-center justify-center text-sm font-bold shrink-0">G</span>
            <span className="text-sm font-medium text-scripture dark:text-white">Gospel of John Quizzes</span>
          </Link>
          <Link href="/bible-topics/salvation" className="flex items-center gap-2 bg-white dark:bg-dark-surface rounded-lg p-3 border border-grace dark:border-dark-border hover:border-sacred/50 transition-colors shadow-sm">
            <span className="w-8 h-8 rounded-full bg-scripture text-white flex items-center justify-center text-sm font-bold shrink-0">S</span>
            <span className="text-sm font-medium text-scripture dark:text-white">Topical Study: Salvation</span>
          </Link>
        </div>

        {/* Honest Questions */}
        <section id="honest-questions" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Honest Questions People Ask About Jesus</h2>
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border p-6 md:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="font-bold text-scripture dark:text-white mb-2">&ldquo;If Jesus was God, how could He die?&rdquo;</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed text-sm">
                Jesus has two natures: divine and human. His divine nature cannot die. His human nature can &mdash; and did. On the cross, Jesus died as a man while remaining God. The Person who died was divine, which gives His death infinite value. That&apos;s why one death can pay for the sins of the entire world. God didn&apos;t cease to exist on Good Friday. The Son experienced physical death in His human nature while His divine nature sustained the universe.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-scripture dark:text-white mb-2">&ldquo;Why does God need a blood sacrifice? That sounds barbaric.&rdquo;</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed text-sm">
                God doesn&apos;t &ldquo;need&rdquo; anything. The sacrifice addresses our problem, not His. Sin is not a minor infraction &mdash; it is cosmic rebellion against an infinitely holy God. Justice requires that wrongs be addressed. In every legal system, crimes have consequences. The sacrificial system taught Israel that &ldquo;the life of the flesh is in the blood&rdquo; (<Link href="/cross-references/leviticus/17/11" className="text-sacred hover:underline">Leviticus 17:11</Link>) &mdash; that sin costs life. Jesus&apos; sacrifice was not God demanding blood for blood. It was God providing the payment Himself so that guilty people could go free.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-scripture dark:text-white mb-2">&ldquo;What about people who never heard of Jesus?&rdquo;</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed text-sm">
                The Bible teaches that God is just and will judge fairly (<Link href="/cross-references/genesis/18/25" className="text-sacred hover:underline">Genesis 18:25</Link>). Romans 1:20 says creation reveals enough about God that people are &ldquo;without excuse.&rdquo; Romans 2:14-15 says God&apos;s law is written on every human heart. The question of the unreached is ultimately in God&apos;s hands &mdash; and He is both perfectly just and perfectly merciful. But the fact that some haven&apos;t heard is not a reason for those who have heard to delay their response.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-scripture dark:text-white mb-2">&ldquo;Why are there so many different versions of Christianity?&rdquo;</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed text-sm">
                Denominational diversity is mostly about secondary issues: church governance, worship style, baptism mode, and end-times views. On the essentials &mdash; Jesus is God, He died for sinners, He rose from the dead, salvation is by grace through faith &mdash; virtually all historic Christian traditions agree. The Apostles&apos; Creed, Nicene Creed, and Chalcedonian Definition have been affirmed by Catholics, Orthodox, and Protestants for centuries. The core message about Jesus is remarkably unified across 2,000 years and every continent.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-scripture dark:text-white mb-2">&ldquo;Hasn&apos;t science disproved miracles and the resurrection?&rdquo;</h3>
              <p className="text-scripture dark:text-ink-light leading-relaxed text-sm">
                Science describes how nature normally operates. It cannot, by definition, rule out events that are caused by something outside nature. If God exists &mdash; if there is a being who created the laws of physics &mdash; then miracles are not violations of natural law; they are interventions by the Author of natural law. The question is not &ldquo;Can miracles happen?&rdquo; but &ldquo;Does God exist?&rdquo; If He does, the resurrection is not only possible but exactly what you would expect from a God who loves His creation enough to enter it, die for it, and conquer death.
              </p>
            </div>
          </div>
        </section>

        {/* Cross-References */}
        <section id="cross-references" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-2">12 Key Verses About Jesus Christ</h2>
          <p className="text-ink-muted dark:text-ink-light mb-6 text-sm">The Bible&apos;s testimony about Jesus, from Genesis to Revelation.</p>
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

        {/* Gospel CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-scripture via-scripture/95 to-scripture/80 rounded-xl p-8 md:p-10 text-white shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4 text-center">Jesus Is Still Asking the Same Question</h2>
            <p className="text-sacred-light max-w-2xl mx-auto leading-relaxed mb-3 text-center">
              &ldquo;Whom say ye that I am?&rdquo; (Matthew 16:15). Jesus asked His disciples this question 2,000 years ago. He is asking you the same question right now. Your answer determines everything.
            </p>
            <p className="text-sacred-light max-w-2xl mx-auto leading-relaxed mb-6 text-center">
              If you are ready to trust Him &mdash; to repent of going your own way and place your faith in what He did on the cross &mdash; eternal life begins today. Not after you fix yourself. Not after you understand everything. Today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/what-does-the-bible-say-about/salvation" className="inline-flex items-center justify-center bg-white text-scripture font-bold py-3 px-8 rounded-lg hover:bg-sacred-light transition-colors text-sm uppercase tracking-wider">
                How to Be Saved
              </Link>
              <Link href="/john-3-16" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider">
                John 3:16 Explained
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">Frequently Asked Questions About Jesus Christ</h2>
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

        {/* Study Path CTAs */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/matthew-chapters" className="bg-scripture hover:bg-ink-muted rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-sacred text-xs font-bold uppercase tracking-wider mb-2">The Life of Jesus in Detail</p>
              <h3 className="text-xl font-bold mb-1">Gospel of Matthew Quizzes</h3>
              <p className="text-sacred-light text-sm">28 chapter quizzes covering Jesus&apos; birth, teachings, miracles, death, and resurrection.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Studying &rarr;</span>
            </Link>
            <Link href="/john-chapters" className="bg-scripture hover:bg-scripture/90 rounded-xl p-6 text-white transition-colors shadow-lg group">
              <p className="text-sacred text-xs font-bold uppercase tracking-wider mb-2">The Theology of Jesus</p>
              <h3 className="text-xl font-bold mb-1">Gospel of John Quizzes</h3>
              <p className="text-sacred-light text-sm">21 chapter quizzes focused on Jesus&apos; deity, signs, and eternal life.</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Start Studying &rarr;</span>
            </Link>
          </div>
        </section>

        {/* Continue Your Study */}
        <section id="continue" className="bg-primary-light/30 dark:bg-dark-surface/30 border border-grace dark:border-dark-border rounded-xl p-6 scroll-mt-20">
          <h2 className="text-lg font-bold text-scripture dark:text-white mb-4">Continue Your Study</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/john-3-16" className="text-sacred hover:underline text-sm">John 3:16 Explained</Link>
            <Link href="/psalm-23" className="text-sacred hover:underline text-sm">Psalm 23 Explained</Link>
            <Link href="/romans-8-28" className="text-sacred hover:underline text-sm">Romans 8:28 Explained</Link>
            <Link href="/philippians-4-13" className="text-sacred hover:underline text-sm">Philippians 4:13 Explained</Link>
            <Link href="/isaiah-41-10" className="text-sacred hover:underline text-sm">Isaiah 41:10 Explained</Link>
            <Link href="/jeremiah-29-11" className="text-sacred hover:underline text-sm">Jeremiah 29:11 Explained</Link>
            <Link href="/proverbs-3-5-6" className="text-sacred hover:underline text-sm">Proverbs 3:5-6 Explained</Link>
            <Link href="/characters/jesus" className="text-sacred hover:underline text-sm">Jesus Character Study</Link>
            <Link href="/characters/paul" className="text-sacred hover:underline text-sm">Paul the Apostle</Link>
            <Link href="/characters/peter" className="text-sacred hover:underline text-sm">Simon Peter</Link>
            <Link href="/characters/mary-mother-of-jesus" className="text-sacred hover:underline text-sm">Mary, Mother of Jesus</Link>
            <Link href="/characters/john-apostle" className="text-sacred hover:underline text-sm">John the Apostle</Link>
            <Link href="/matthew-chapters" className="text-sacred hover:underline text-sm">Gospel of Matthew Quizzes</Link>
            <Link href="/mark-chapters" className="text-sacred hover:underline text-sm">Gospel of Mark Quizzes</Link>
            <Link href="/luke-chapters" className="text-sacred hover:underline text-sm">Gospel of Luke Quizzes</Link>
            <Link href="/john-chapters" className="text-sacred hover:underline text-sm">Gospel of John Quizzes</Link>
            <Link href="/bible-topics/salvation" className="text-sacred hover:underline text-sm">Topical Study: Salvation</Link>
            <Link href="/bible-topics/resurrection" className="text-sacred hover:underline text-sm">Topical Study: Resurrection</Link>
            <Link href="/bible-topics/atonement" className="text-sacred hover:underline text-sm">Topical Study: Atonement</Link>
            <Link href="/greek-word/christos" className="text-sacred hover:underline text-sm">Greek Word: Christos</Link>
            <Link href="/greek-word/kurios" className="text-sacred hover:underline text-sm">Greek Word: Kurios (Lord)</Link>
            <Link href="/greek-word/logos" className="text-sacred hover:underline text-sm">Greek Word: Logos (Word)</Link>
            <Link href="/greek-word/soter" className="text-sacred hover:underline text-sm">Greek Word: Sōtēr (Savior)</Link>
            <Link href="/cross-references/john/1/1" className="text-sacred hover:underline text-sm">John 1:1 Cross-References</Link>
            <Link href="/cross-references/john/14/6" className="text-sacred hover:underline text-sm">John 14:6 Cross-References</Link>
            <Link href="/bible-encyclopedia/jesus" className="text-sacred hover:underline text-sm">Jesus Encyclopedia Entry</Link>
            <Link href="/what-does-the-bible-say-about/salvation" className="text-sacred hover:underline text-sm">What the Bible Says About Salvation</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
