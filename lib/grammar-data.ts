// Greek Grammar Data Library
// Finite set of NT Greek grammatical forms with examples from famous Bible verses

export interface GrammarExample {
  greek: string;
  transliteration: string;
  english: string;
  verse: string;
  verseRef: string;
  strongsNumber: string;
  explanation: string;
}

export interface GrammarComparison {
  name: string;
  aspect: string;
  example: string;
}

export interface GrammarForm {
  slug: string;
  name: string;
  category: 'verb' | 'noun' | 'adjective' | 'participle' | 'infinitive';
  robinsonCode: string;
  description: string;
  whyItMatters: string;
  frequency: string;
  examples: GrammarExample[];
  comparison: GrammarComparison[];
  relatedForms: string[];
}

const grammarForms: GrammarForm[] = [
  {
    slug: 'present-active-indicative',
    name: 'Present Active Indicative',
    category: 'verb',
    robinsonCode: 'V-PAI',
    description: 'The Present Active Indicative describes an action that is currently happening or is ongoing in nature. The subject is performing the action (active voice), and the speaker presents it as a statement of fact (indicative mood). In Greek, the present tense emphasizes the continuous, repeated, or habitual nature of the action rather than simply when it occurs.',
    whyItMatters: 'When you see a present tense verb in the New Testament, the author is often emphasizing that an action is ongoing or continuous. For example, when Jesus says "I am the bread of life" (John 6:35), the present tense conveys that He is continually and perpetually the bread of life, not just at one moment. Recognizing this helps readers see the sustained, living nature of God\'s promises and commands.',
    frequency: '~11,607 occurrences in the NT',
    examples: [
      {
        greek: 'agapao',
        transliteration: 'agapao',
        english: 'I love',
        verse: 'For God so loved the world...',
        verseRef: 'John 3:16',
        strongsNumber: 'G25',
        explanation: 'While John 3:16 uses the aorist for "loved," the present active indicative of agapao appears throughout 1 John to describe God\'s ongoing love: "Everyone who loves (agapa) is born of God" (1 John 4:7). The present tense shows that loving is a continuous characteristic of the believer.'
      },
      {
        greek: 'pisteuo',
        transliteration: 'pisteuo',
        english: 'I believe',
        verse: 'Whoever believes in him shall not perish but have eternal life.',
        verseRef: 'John 3:16',
        strongsNumber: 'G4100',
        explanation: 'The present participle form "ho pisteuon" (the one believing) in John 3:16 emphasizes ongoing, continuous faith. It is not a one-time decision but a sustained trust in Christ that characterizes the believer\'s life.'
      },
      {
        greek: 'eimi',
        transliteration: 'eimi',
        english: 'I am',
        verse: 'I am the way, the truth, and the life.',
        verseRef: 'John 14:6',
        strongsNumber: 'G1510',
        explanation: 'Jesus uses the present indicative "eimi" (I am) to declare His eternal, unchanging nature. The present tense here is not just about the current moment but expresses a timeless truth about who He is.'
      },
      {
        greek: 'peripateo',
        transliteration: 'peripateo',
        english: 'I walk',
        verse: 'If we walk in the light, as he is in the light, we have fellowship with one another.',
        verseRef: '1 John 1:7',
        strongsNumber: 'G4043',
        explanation: 'The present subjunctive "peripatomen" conveys continuous walking. The Christian life is portrayed not as a single step but as an ongoing journey of obedience and fellowship.'
      }
    ],
    comparison: [
      { name: 'Present Active Indicative', aspect: 'Continuous/ongoing action now', example: '"I am writing" (grapho)' },
      { name: 'Aorist Active Indicative', aspect: 'Simple past fact, no duration implied', example: '"I wrote" (egrapsa)' },
      { name: 'Perfect Active Indicative', aspect: 'Completed action with lasting result', example: '"I have written and it stands" (gegrapa)' },
      { name: 'Imperfect Active Indicative', aspect: 'Ongoing action in the past', example: '"I was writing" (egraphon)' }
    ],
    relatedForms: ['aorist-active-indicative', 'perfect-active-indicative', 'imperfect-active-indicative', 'present-active-imperative']
  },
  {
    slug: 'aorist-active-indicative',
    name: 'Aorist Active Indicative',
    category: 'verb',
    robinsonCode: 'V-AAI',
    description: 'The Aorist Active Indicative is the most common verb form in the New Testament. It describes a past action viewed as a simple, complete event without focusing on its duration or repetition. The aorist looks at the action as a whole, like a snapshot rather than a video. The subject performs the action (active), and it is stated as fact (indicative).',
    whyItMatters: 'The aorist is the "default" past tense in Greek. When a NT author chooses the aorist, they are presenting an event as a simple historical fact. In John 3:16, "God so loved (egapesen) the world" uses the aorist to present God\'s love as a definitive, decisive act accomplished in sending His Son. It does not diminish the ongoing nature of God\'s love but highlights the once-for-all character of the saving event. Understanding the aorist prevents over-reading duration or repetition into passages where the author intended a simple statement of fact.',
    frequency: '~11,606 occurrences in the NT',
    examples: [
      {
        greek: 'egapesen',
        transliteration: 'egapesen',
        english: 'He loved',
        verse: 'For God so loved the world, that he gave his only begotten Son.',
        verseRef: 'John 3:16',
        strongsNumber: 'G25',
        explanation: 'The aorist "egapesen" presents God\'s love as a decisive, completed act. God\'s love was demonstrated conclusively in the giving of His Son. The aorist captures the totality of this act as one grand, definitive event.'
      },
      {
        greek: 'edoken',
        transliteration: 'edoken',
        english: 'He gave',
        verse: 'He gave his only begotten Son.',
        verseRef: 'John 3:16',
        strongsNumber: 'G1325',
        explanation: 'The aorist "edoken" (gave) treats the giving of the Son as a single, complete act of grace. It is not an ongoing process but a definitive moment in redemptive history.'
      },
      {
        greek: 'apesteilen',
        transliteration: 'apesteilen',
        english: 'He sent',
        verse: 'In this was manifested the love of God toward us, because that God sent his only begotten Son into the world.',
        verseRef: '1 John 4:9',
        strongsNumber: 'G649',
        explanation: 'The aorist "apesteilen" marks the sending of the Son as a completed historical event. The incarnation is viewed as a definitive act in God\'s plan of salvation.'
      },
      {
        greek: 'egerthe',
        transliteration: 'egerthe',
        english: 'He was raised',
        verse: 'He is not here: for he is risen, as he said.',
        verseRef: 'Matthew 28:6',
        strongsNumber: 'G1453',
        explanation: 'The aorist passive "egerthe" presents the resurrection as a single, decisive act of God. It is a completed fact of history that forms the foundation of Christian faith.'
      }
    ],
    comparison: [
      { name: 'Present Active Indicative', aspect: 'Continuous/ongoing action', example: '"I love" (agapo) - ongoing' },
      { name: 'Aorist Active Indicative', aspect: 'Simple completed fact', example: '"I loved" (egapesa) - snapshot' },
      { name: 'Perfect Active Indicative', aspect: 'Completed with lasting results', example: '"I have loved and still do" (egapeka)' },
      { name: 'Imperfect Active Indicative', aspect: 'Ongoing action in the past', example: '"I was loving" (egapon) - past process' }
    ],
    relatedForms: ['present-active-indicative', 'perfect-active-indicative', 'aorist-active-imperative', 'aorist-active-subjunctive']
  },
  {
    slug: 'perfect-active-indicative',
    name: 'Perfect Active Indicative',
    category: 'verb',
    robinsonCode: 'V-RAI',
    description: 'The Perfect Active Indicative describes an action that was completed in the past but whose results continue into the present. It combines the ideas of a past event and a present state. The subject performed the action (active), and it is presented as fact (indicative). This is one of the most theologically significant tenses in the New Testament because it emphasizes the enduring consequences of past actions.',
    whyItMatters: 'The perfect tense is a powerful theological tool in the NT. When Paul writes "By grace you have been saved" (Ephesians 2:8), the perfect tense "sesosmenoi" conveys that salvation happened at a point in the past and its effects are still fully in force now. Believers are in a permanent state of having been saved. Similarly, "It is written" (gegraptai) in the perfect tense means Scripture was written in the past and remains authoritative and binding today. Recognizing the perfect tense reveals the lasting, settled nature of God\'s work.',
    frequency: '~1,571 occurrences in the NT',
    examples: [
      {
        greek: 'gegraptai',
        transliteration: 'gegraptai',
        english: 'It has been written (and still stands)',
        verse: 'It is written, Man shall not live by bread alone.',
        verseRef: 'Matthew 4:4',
        strongsNumber: 'G1125',
        explanation: 'The perfect passive "gegraptai" is used over 60 times in the NT. It means "it was written in the past and remains written and authoritative now." Jesus uses this form to assert the enduring authority of Scripture against Satan\'s temptations.'
      },
      {
        greek: 'tetelestai',
        transliteration: 'tetelestai',
        english: 'It has been finished (and remains complete)',
        verse: 'It is finished.',
        verseRef: 'John 19:30',
        strongsNumber: 'G5055',
        explanation: 'Jesus\' cry from the cross, "tetelestai," is in the perfect tense. The work of redemption was completed at that moment and its effects endure forever. In commercial Greek, this word was written on receipts to mean "paid in full." The debt of sin was settled permanently.'
      },
      {
        greek: 'sesosmenoi este',
        transliteration: 'sesosmenoi este',
        english: 'You have been saved (and remain saved)',
        verse: 'For by grace are ye saved through faith.',
        verseRef: 'Ephesians 2:8',
        strongsNumber: 'G4982',
        explanation: 'The perfect participle "sesosmenoi" indicates a past completed action with abiding results. Salvation is not something that needs to be repeated or maintained by works. Believers exist in a settled state of having been saved by grace.'
      },
      {
        greek: 'egnoka',
        transliteration: 'egnoka',
        english: 'I have come to know (and still know)',
        verse: 'And we have known and believed the love that God hath to us.',
        verseRef: '1 John 4:16',
        strongsNumber: 'G1097',
        explanation: 'The perfect "egnokamen" (we have known) indicates that the believers came to know God\'s love at some point and continue in that knowledge. It is a settled, experiential knowledge that persists.'
      }
    ],
    comparison: [
      { name: 'Aorist Active Indicative', aspect: 'Simple past fact, no comment on results', example: '"He died" (apethanen)' },
      { name: 'Perfect Active Indicative', aspect: 'Past action with enduring present results', example: '"He has risen and is alive" (egegertai)' },
      { name: 'Present Active Indicative', aspect: 'Currently ongoing action', example: '"He lives" (ze)' },
      { name: 'Pluperfect', aspect: 'Past completed action with past results', example: '"He had known" (egnokeisan)' }
    ],
    relatedForms: ['aorist-active-indicative', 'present-active-indicative', 'imperfect-active-indicative', 'aorist-passive-indicative']
  },
  {
    slug: 'imperfect-active-indicative',
    name: 'Imperfect Active Indicative',
    category: 'verb',
    robinsonCode: 'V-IAI',
    description: 'The Imperfect Active Indicative describes an action that was ongoing, repeated, or habitual in the past. Unlike the aorist, which views a past action as a single event, the imperfect "opens up" the action to show it in progress. It is like watching a past event unfold in slow motion or seeing a repeated pattern of behavior.',
    whyItMatters: 'The imperfect tense brings past events to life by showing them as ongoing processes. When Mark writes that Jesus "was teaching" (edidasken) the crowds, the imperfect shows this was His habitual practice, not a one-time event. In Luke 15:1, the tax collectors and sinners "were drawing near" (esan enggizontes) to Jesus, painting a vivid picture of people continually streaming toward Him. The imperfect helps readers visualize scenes and understand patterns of behavior in the biblical narrative.',
    frequency: '~1,682 occurrences in the NT',
    examples: [
      {
        greek: 'edidasken',
        transliteration: 'edidasken',
        english: 'He was teaching',
        verse: 'And he taught them many things by parables.',
        verseRef: 'Mark 4:2',
        strongsNumber: 'G1321',
        explanation: 'The imperfect "edidasken" shows that Jesus was engaged in the ongoing activity of teaching. It was not a brief statement but a sustained period of instruction. Mark uses this to portray Jesus\' characteristic ministry activity.'
      },
      {
        greek: 'elegen',
        transliteration: 'elegen',
        english: 'He was saying',
        verse: 'And he said unto them, He that hath ears to hear, let him hear.',
        verseRef: 'Mark 4:9',
        strongsNumber: 'G3004',
        explanation: 'The imperfect "elegen" (He was saying/kept saying) is one of Mark\'s favorite forms. It suggests repeated teaching or a saying that Jesus delivered on multiple occasions, showing the persistence of His message.'
      },
      {
        greek: 'ekolouthoun',
        transliteration: 'ekolouthoun',
        english: 'They were following',
        verse: 'And there followed him great multitudes of people.',
        verseRef: 'Matthew 4:25',
        strongsNumber: 'G190',
        explanation: 'The imperfect "ekolouthoun" paints a picture of crowds continually following Jesus, not just on one occasion but as an ongoing response to His ministry. It conveys the sustained momentum of the early Galilean ministry.'
      }
    ],
    comparison: [
      { name: 'Imperfect Active Indicative', aspect: 'Ongoing/repeated past action', example: '"He was teaching" (edidasken)' },
      { name: 'Aorist Active Indicative', aspect: 'Simple past fact', example: '"He taught" (edidaxen)' },
      { name: 'Present Active Indicative', aspect: 'Currently ongoing action', example: '"He teaches" (didaskei)' },
      { name: 'Perfect Active Indicative', aspect: 'Past action with present results', example: '"He has taught and it remains" (dedidachen)' }
    ],
    relatedForms: ['present-active-indicative', 'aorist-active-indicative', 'perfect-active-indicative']
  },
  {
    slug: 'present-active-imperative',
    name: 'Present Active Imperative',
    category: 'verb',
    robinsonCode: 'V-PAM',
    description: 'The Present Active Imperative is a command that calls for continuous or habitual action. When a speaker uses the present imperative, they are telling someone to keep doing something, to make it a regular practice, or to adopt it as an ongoing lifestyle. The subject is to actively perform the action (active voice), and it is a direct command (imperative mood).',
    whyItMatters: 'The present imperative carries the force of "keep on doing this" or "make this your habit." When Jesus says "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you" (Matthew 7:7), all three imperatives are in the present tense: keep asking, keep seeking, keep knocking. This is not a command for a single request but for persistent, ongoing prayer. Similarly, "Rejoice in the Lord always" (Philippians 4:4) uses the present imperative to call for perpetual joy, not momentary happiness.',
    frequency: '~1,580 occurrences in the NT',
    examples: [
      {
        greek: 'aiteite',
        transliteration: 'aiteite',
        english: 'Keep asking',
        verse: 'Ask, and it shall be given you; seek, and ye shall find.',
        verseRef: 'Matthew 7:7',
        strongsNumber: 'G154',
        explanation: 'The present imperative "aiteite" means "keep on asking." Jesus is not commanding a single prayer but a lifestyle of persistent, continual prayer. The present tense transforms this from a tip into a spiritual discipline.'
      },
      {
        greek: 'chairete',
        transliteration: 'chairete',
        english: 'Keep rejoicing',
        verse: 'Rejoice in the Lord always: and again I say, Rejoice.',
        verseRef: 'Philippians 4:4',
        strongsNumber: 'G5463',
        explanation: 'The present imperative "chairete" calls for ongoing, habitual joy. Paul is not saying "be happy right now" but "make rejoicing your continuous state." The repetition ("again I say, Rejoice") reinforces the command for sustained joy.'
      },
      {
        greek: 'agapate',
        transliteration: 'agapate',
        english: 'Keep loving',
        verse: 'A new commandment I give unto you, That ye love one another.',
        verseRef: 'John 13:34',
        strongsNumber: 'G25',
        explanation: 'The present subjunctive "agapate" conveys continuous, ongoing love. Jesus is commanding a lifestyle of love, not a single act of kindness. It is to be the defining and perpetual mark of His disciples.'
      }
    ],
    comparison: [
      { name: 'Present Active Imperative', aspect: 'Continuous/habitual command', example: '"Keep praying" (proseuchesthe)' },
      { name: 'Aorist Active Imperative', aspect: 'Urgent/decisive single command', example: '"Pray (now)!" (proseuxasthe)' },
      { name: 'Present Active Indicative', aspect: 'Statement of ongoing fact', example: '"You are praying" (proseuchesthe)' }
    ],
    relatedForms: ['aorist-active-imperative', 'present-active-indicative', 'present-active-subjunctive']
  },
  {
    slug: 'aorist-active-imperative',
    name: 'Aorist Active Imperative',
    category: 'verb',
    robinsonCode: 'V-AAM',
    description: 'The Aorist Active Imperative is a command that calls for a specific, decisive action. Unlike the present imperative, which commands ongoing activity, the aorist imperative focuses on a particular act to be done, often with a sense of urgency. It views the commanded action as a whole, complete event. The subject is to perform the action (active), and it is a direct command (imperative).',
    whyItMatters: 'The aorist imperative often carries urgency or decisiveness. When Jesus tells the disciples "Follow me" (akolouthesate) in Matthew 4:19, the aorist imperative calls for a decisive break and commitment, not merely continued walking. When the angel tells Joseph "Take the young child and his mother, and flee into Egypt" (Matthew 2:13), the aorist imperatives convey urgency: act now, decisively. Understanding the difference between present and aorist imperatives reveals whether a command is about lifestyle (present) or decisive action (aorist).',
    frequency: '~1,631 occurrences in the NT',
    examples: [
      {
        greek: 'metanoesate',
        transliteration: 'metanoesate',
        english: 'Repent!',
        verse: 'Repent: for the kingdom of heaven is at hand.',
        verseRef: 'Matthew 4:17',
        strongsNumber: 'G3340',
        explanation: 'The aorist imperative "metanoesate" calls for a decisive, immediate change of mind and direction. It is not "keep repenting gradually" but "make a definitive turn now." The urgency matches the announcement of the kingdom.'
      },
      {
        greek: 'pisteuson',
        transliteration: 'pisteuson',
        english: 'Believe!',
        verse: 'Believe on the Lord Jesus Christ, and thou shalt be saved.',
        verseRef: 'Acts 16:31',
        strongsNumber: 'G4100',
        explanation: 'The aorist imperative "pisteuson" calls for a decisive act of faith. Paul is telling the Philippian jailer to make a definitive commitment to trust in Christ. It is the moment of decision.'
      },
      {
        greek: 'egeirai',
        transliteration: 'egeirai',
        english: 'Rise up!',
        verse: 'Rise, take up thy bed, and walk.',
        verseRef: 'John 5:8',
        strongsNumber: 'G1453',
        explanation: 'Jesus\' command to the paralytic uses the aorist imperative "egeirai" for a decisive, immediate act. After 38 years of illness, Jesus calls for a single, dramatic moment of rising. The aorist captures the decisiveness of the miracle.'
      }
    ],
    comparison: [
      { name: 'Aorist Active Imperative', aspect: 'Decisive/urgent single command', example: '"Repent!" (metanoesate)' },
      { name: 'Present Active Imperative', aspect: 'Ongoing/habitual command', example: '"Keep repenting" (metanoeite)' },
      { name: 'Aorist Active Indicative', aspect: 'Simple past fact', example: '"He repented" (metenoesen)' }
    ],
    relatedForms: ['present-active-imperative', 'aorist-active-indicative', 'aorist-active-subjunctive']
  },
  {
    slug: 'present-active-participle',
    name: 'Present Active Participle',
    category: 'participle',
    robinsonCode: 'V-PAP',
    description: 'The Present Active Participle is a verbal adjective that describes an ongoing action performed by its subject. It functions like adding "-ing" to an English verb: "believing," "loving," "walking." In Greek, it can serve as a noun ("the one believing"), an adjective ("the believing man"), or an adverb ("while believing"). The present tense indicates the action is concurrent with the main verb, ongoing, or characteristic.',
    whyItMatters: 'Present participles define identity and character in the NT. "The one believing" (ho pisteuon) in John 3:16 is not just someone who believed once but someone characterized by ongoing faith. When Jesus speaks of "those who are perishing" (hoi apollumenoi) versus "those who are being saved" (hoi sozomenoi) in 1 Corinthians 1:18, the present participles define two ongoing states of existence. Recognizing participles helps readers see how the NT authors define people by their continuous actions and states.',
    frequency: '~3,463 occurrences in the NT',
    examples: [
      {
        greek: 'ho pisteuon',
        transliteration: 'ho pisteuon',
        english: 'the one believing',
        verse: 'He that believeth on him is not condemned.',
        verseRef: 'John 3:18',
        strongsNumber: 'G4100',
        explanation: 'The present participle "ho pisteuon" (the one believing) defines the believer as someone in an ongoing state of faith. It is not a past event but a present identity. Those characterized by continuous belief are not condemned.'
      },
      {
        greek: 'peripatountes',
        transliteration: 'peripatountes',
        english: 'walking',
        verse: 'There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.',
        verseRef: 'Romans 8:1',
        strongsNumber: 'G4043',
        explanation: 'The present participle "peripatountes" (walking) describes the ongoing lifestyle of believers. Their characteristic pattern of life is directed by the Spirit, not the flesh. The present tense shows this is a continuous way of living.'
      },
      {
        greek: 'ho poion',
        transliteration: 'ho poion',
        english: 'the one doing',
        verse: 'He that doeth truth cometh to the light.',
        verseRef: 'John 3:21',
        strongsNumber: 'G4160',
        explanation: 'The present participle "ho poion" (the one doing) describes a person whose characteristic behavior is doing truth. It defines their ongoing identity, not a single isolated act.'
      }
    ],
    comparison: [
      { name: 'Present Active Participle', aspect: 'Ongoing action as description', example: '"the one believing" (ho pisteuon)' },
      { name: 'Aorist Active Participle', aspect: 'Completed prior action as description', example: '"having believed" (pisteusas)' },
      { name: 'Perfect Active Participle', aspect: 'Completed action with lasting state', example: '"the one who has believed" (ho pepisteukos)' },
      { name: 'Present Active Indicative', aspect: 'Statement of ongoing action', example: '"he believes" (pisteuei)' }
    ],
    relatedForms: ['aorist-active-participle', 'present-active-indicative', 'present-active-infinitive']
  },
  {
    slug: 'aorist-active-participle',
    name: 'Aorist Active Participle',
    category: 'participle',
    robinsonCode: 'V-AAP',
    description: 'The Aorist Active Participle describes a completed action that typically occurred before the main verb. It functions like "having done" in English. Unlike the present participle, which shows ongoing action, the aorist participle views the action as a simple, completed event. It is used to describe background actions, prior conditions, or the means by which the main action was accomplished.',
    whyItMatters: 'The aorist participle often shows the sequence of events or the basis for an action. In Matthew 28:19, "having gone" (poreuthentes) precedes "make disciples" (matheteusate). The going is the completed prior action that enables the discipling. In Acts 16:6, the apostles were "having been forbidden" (koluthentes) by the Holy Spirit. Understanding aorist participles reveals the logical and temporal sequence of events in biblical narrative, showing what happened first and what resulted from it.',
    frequency: '~2,275 occurrences in the NT',
    examples: [
      {
        greek: 'poreuthentes',
        transliteration: 'poreuthentes',
        english: 'having gone',
        verse: 'Go ye therefore, and teach all nations.',
        verseRef: 'Matthew 28:19',
        strongsNumber: 'G4198',
        explanation: 'The aorist participle "poreuthentes" (having gone) describes the prior action that enables the main command "make disciples." The Great Commission assumes that the disciples will first go to the nations. The aorist views the going as a completed prerequisite.'
      },
      {
        greek: 'pisteusas',
        transliteration: 'pisteusas',
        english: 'having believed',
        verse: 'In whom also after that ye believed, ye were sealed with that holy Spirit of promise.',
        verseRef: 'Ephesians 1:13',
        strongsNumber: 'G4100',
        explanation: 'The aorist participle "pisteusantes" (having believed) shows that belief preceded the sealing with the Holy Spirit. The completed act of faith is the basis upon which the sealing occurred.'
      },
      {
        greek: 'akousas',
        transliteration: 'akousas',
        english: 'having heard',
        verse: 'When Jesus heard it, he marvelled.',
        verseRef: 'Matthew 8:10',
        strongsNumber: 'G191',
        explanation: 'The aorist participle "akousas" (having heard) shows the completed prior action: Jesus heard the centurion\'s words, and then (as a result) He marveled. The hearing preceded and caused the marveling.'
      }
    ],
    comparison: [
      { name: 'Aorist Active Participle', aspect: 'Completed prior action', example: '"having believed" (pisteusas)' },
      { name: 'Present Active Participle', aspect: 'Ongoing concurrent action', example: '"believing" (pisteuon)' },
      { name: 'Perfect Active Participle', aspect: 'Completed with lasting state', example: '"having believed and still believing" (pepisteukos)' }
    ],
    relatedForms: ['present-active-participle', 'aorist-active-indicative', 'aorist-active-infinitive']
  },
  {
    slug: 'present-passive-indicative',
    name: 'Present Passive Indicative',
    category: 'verb',
    robinsonCode: 'V-PPI',
    description: 'The Present Passive Indicative describes an ongoing action being performed upon the subject. The subject receives the action (passive voice), the action is currently in progress or habitual (present tense), and it is stated as fact (indicative mood). In Greek, the passive voice often implies a divine agent, a concept scholars call the "divine passive," where God is the unstated actor.',
    whyItMatters: 'The passive voice in the NT often points to God as the hidden agent. When Jesus says "Blessed are those who are persecuted" (Matthew 5:10), the passive implies something is being done to them, but their blessing comes from God. In Romans 8:14, "as many as are led (agontai) by the Spirit of God" uses the present passive to show that believers are continuously being guided by God\'s Spirit. The combination of present tense and passive voice reveals both the ongoing nature of God\'s work and that He is the one doing it.',
    frequency: '~670 occurrences in the NT',
    examples: [
      {
        greek: 'agontai',
        transliteration: 'agontai',
        english: 'are being led',
        verse: 'For as many as are led by the Spirit of God, they are the sons of God.',
        verseRef: 'Romans 8:14',
        strongsNumber: 'G71',
        explanation: 'The present passive "agontai" (are being led) shows ongoing, continuous guidance by the Spirit. Believers are not leading themselves but are continually being directed by the Holy Spirit. The passive voice highlights divine initiative.'
      },
      {
        greek: 'sozomenois',
        transliteration: 'sozomenois',
        english: 'those being saved',
        verse: 'For the preaching of the cross is to them that perish foolishness; but unto us which are saved it is the power of God.',
        verseRef: '1 Corinthians 1:18',
        strongsNumber: 'G4982',
        explanation: 'The present passive participle "sozomenois" (those being saved) describes salvation as an ongoing experience. Believers are continuously being saved, rescued, and preserved by God\'s power. The passive voice shows that God is the agent of salvation.'
      },
      {
        greek: 'metamorphousthe',
        transliteration: 'metamorphousthe',
        english: 'you are being transformed',
        verse: 'Be ye transformed by the renewing of your mind.',
        verseRef: 'Romans 12:2',
        strongsNumber: 'G3339',
        explanation: 'The present passive imperative "metamorphousthe" commands believers to allow themselves to be continually transformed. The passive voice indicates that God is the one performing the transformation; the present tense shows it is an ongoing process, not a one-time event.'
      }
    ],
    comparison: [
      { name: 'Present Active Indicative', aspect: 'Subject does the action continuously', example: '"He leads" (agei)' },
      { name: 'Present Passive Indicative', aspect: 'Subject receives the action continuously', example: '"He is being led" (agetai)' },
      { name: 'Aorist Passive Indicative', aspect: 'Subject received the action (simple fact)', example: '"He was led" (echthe)' }
    ],
    relatedForms: ['present-active-indicative', 'aorist-passive-indicative', 'present-active-imperative']
  },
  {
    slug: 'aorist-passive-indicative',
    name: 'Aorist Passive Indicative',
    category: 'verb',
    robinsonCode: 'V-API',
    description: 'The Aorist Passive Indicative describes a completed action that was performed upon the subject. The subject received the action (passive), the action is viewed as a simple, whole event in the past (aorist), and it is stated as fact (indicative). This form frequently appears in theological statements about what God has done for believers and in descriptions of key redemptive events.',
    whyItMatters: 'The aorist passive is the form of divine accomplishment. When Paul writes "you were justified" (edikaiotheete, Romans 5:1 implied context) or "you were washed, you were sanctified" (1 Corinthians 6:11), the aorist passive shows that these are completed acts performed by God upon believers. The combination of aorist (completed) and passive (God did it) creates powerful theological statements: salvation is a finished work accomplished by divine power, not human effort.',
    frequency: '~1,452 occurrences in the NT',
    examples: [
      {
        greek: 'edikaiothe',
        transliteration: 'edikaiothe',
        english: 'was justified',
        verse: 'Was not Abraham our father justified by works, when he had offered Isaac his son upon the altar?',
        verseRef: 'James 2:21',
        strongsNumber: 'G1344',
        explanation: 'The aorist passive "edikaiothe" (was justified) presents Abraham\'s justification as a completed event in which he was declared righteous. The passive voice points to God as the one who justified him.'
      },
      {
        greek: 'esothe',
        transliteration: 'esothe',
        english: 'was saved',
        verse: 'Thy faith hath saved thee; go in peace.',
        verseRef: 'Luke 7:50',
        strongsNumber: 'G4982',
        explanation: 'The aorist "sesoken" (has saved) presents salvation as a completed act. The woman\'s faith was the instrument, but God was the agent who accomplished her salvation as a definitive, completed event.'
      },
      {
        greek: 'egerthe',
        transliteration: 'egerthe',
        english: 'He was raised',
        verse: 'He is risen; he is not here.',
        verseRef: 'Mark 16:6',
        strongsNumber: 'G1453',
        explanation: 'The aorist passive "egerthe" (was raised) is significant: Jesus did not merely "rise" on His own but "was raised" by God the Father. The passive voice attributes the resurrection to divine action, and the aorist presents it as a completed historical event.'
      }
    ],
    comparison: [
      { name: 'Aorist Passive Indicative', aspect: 'Completed action received by subject', example: '"He was raised" (egerthe)' },
      { name: 'Present Passive Indicative', aspect: 'Ongoing action received by subject', example: '"He is being raised" (egeiretai)' },
      { name: 'Perfect Passive Indicative', aspect: 'Completed action with lasting passive state', example: '"It has been written" (gegraptai)' },
      { name: 'Aorist Active Indicative', aspect: 'Completed action done by subject', example: '"He raised" (egeiren)' }
    ],
    relatedForms: ['present-passive-indicative', 'aorist-active-indicative', 'perfect-active-indicative']
  },
  {
    slug: 'present-active-subjunctive',
    name: 'Present Active Subjunctive',
    category: 'verb',
    robinsonCode: 'V-PAS',
    description: 'The Present Active Subjunctive expresses ongoing action that is potential, purposeful, or contingent rather than stated as fact. The subjunctive mood deals with possibility, purpose, exhortation, or condition. Combined with the present tense, it expresses continuous potential action. It often appears after "hina" (in order that), "ean" (if), or in hortatory contexts (let us...).',
    whyItMatters: 'The subjunctive mood appears in some of the most important theological statements about God\'s purposes. In John 3:16, "that whoever believes should not perish but have (eche) eternal life" uses the subjunctive to express God\'s purpose. In 1 John 1:7, "if we walk (peripatomen) in the light" uses the present subjunctive to set up a conditional reality. The present tense adds the nuance of continuous action: the ongoing walking, believing, or obeying is the condition for the promised result.',
    frequency: '~670 occurrences in the NT',
    examples: [
      {
        greek: 'eche',
        transliteration: 'eche',
        english: 'may have',
        verse: 'That whosoever believeth in him should not perish, but have everlasting life.',
        verseRef: 'John 3:16',
        strongsNumber: 'G2192',
        explanation: 'The present subjunctive "eche" (may have) expresses the purpose of God\'s gift: that believers may continuously possess eternal life. The subjunctive shows this is the intended result of faith, and the present tense emphasizes ongoing possession.'
      },
      {
        greek: 'peripatomen',
        transliteration: 'peripatomen',
        english: 'we may walk',
        verse: 'If we walk in the light, as he is in the light, we have fellowship with one another.',
        verseRef: '1 John 1:7',
        strongsNumber: 'G4043',
        explanation: 'The present subjunctive "peripatomen" (we may walk) sets up a conditional reality about the Christian life. The present tense shows that walking in the light is an ongoing condition, not a single step. Continuous walking leads to continuous fellowship.'
      },
      {
        greek: 'agapomen',
        transliteration: 'agapomen',
        english: 'let us love',
        verse: 'Beloved, let us love one another: for love is of God.',
        verseRef: '1 John 4:7',
        strongsNumber: 'G25',
        explanation: 'The hortatory subjunctive "agapomen" (let us love) is an exhortation to the community. The present tense calls for continuous, ongoing love as the defining mark of believers. It is both an encouragement and a gentle command.'
      }
    ],
    comparison: [
      { name: 'Present Active Subjunctive', aspect: 'Ongoing potential/purpose', example: '"that we may love" (hina agapomen)' },
      { name: 'Aorist Active Subjunctive', aspect: 'Decisive potential/purpose', example: '"that we may love (decisively)" (hina agapesomen)' },
      { name: 'Present Active Indicative', aspect: 'Ongoing stated fact', example: '"we love" (agapomen)' },
      { name: 'Present Active Imperative', aspect: 'Ongoing direct command', example: '"Love!" (agapate)' }
    ],
    relatedForms: ['aorist-active-subjunctive', 'present-active-indicative', 'present-active-imperative']
  },
  {
    slug: 'aorist-active-subjunctive',
    name: 'Aorist Active Subjunctive',
    category: 'verb',
    robinsonCode: 'V-AAS',
    description: 'The Aorist Active Subjunctive expresses a decisive or specific potential action. Like the present subjunctive, it deals with possibility, purpose, or condition, but the aorist aspect views the action as a complete, whole event rather than an ongoing process. It is the most common subjunctive form in the NT and appears frequently in purpose clauses, conditional statements, and prohibitions.',
    whyItMatters: 'The aorist subjunctive highlights decisive moments of divine purpose. In John 3:16, "that whoever believes should not perish (apoletai)" uses the aorist subjunctive to express God\'s purpose that believers not experience definitive destruction. The aorist views the potential perishing as a single, decisive event to be avoided. In Matthew 26:42, Jesus prays "thy will be done (genetheto)," using the aorist to express a single, decisive fulfillment of God\'s will. This form reveals the NT\'s emphasis on decisive divine action and definitive spiritual outcomes.',
    frequency: '~1,350 occurrences in the NT',
    examples: [
      {
        greek: 'apoletai',
        transliteration: 'apoletai',
        english: 'should perish',
        verse: 'That whosoever believeth in him should not perish, but have everlasting life.',
        verseRef: 'John 3:16',
        strongsNumber: 'G622',
        explanation: 'The aorist subjunctive "apoletai" (should perish) views perishing as a single, definitive event. God\'s purpose is that believers not face this decisive destruction. The aorist presents it as an all-or-nothing outcome.'
      },
      {
        greek: 'genetheto',
        transliteration: 'genetheto',
        english: 'let it be done',
        verse: 'O my Father, if this cup may not pass away from me, except I drink it, thy will be done.',
        verseRef: 'Matthew 26:42',
        strongsNumber: 'G1096',
        explanation: 'The aorist imperative "genetheto" (let it be done) expresses Jesus\' decisive submission to the Father\'s will. The aorist views the fulfillment of God\'s will as a single, complete act. This is not gradual compliance but total surrender.'
      },
      {
        greek: 'sothe',
        transliteration: 'sothe',
        english: 'might be saved',
        verse: 'For God sent not his Son into the world to condemn the world; but that the world through him might be saved.',
        verseRef: 'John 3:17',
        strongsNumber: 'G4982',
        explanation: 'The aorist subjunctive "sothe" (might be saved) expresses the purpose of Christ\'s mission: the decisive salvation of the world. The aorist views salvation as a complete, definitive act, not a gradual process.'
      }
    ],
    comparison: [
      { name: 'Aorist Active Subjunctive', aspect: 'Decisive potential/purpose', example: '"that he might save" (hina sose)' },
      { name: 'Present Active Subjunctive', aspect: 'Ongoing potential/purpose', example: '"that he may keep saving" (hina soze)' },
      { name: 'Aorist Active Indicative', aspect: 'Completed factual action', example: '"he saved" (esosen)' },
      { name: 'Aorist Active Imperative', aspect: 'Decisive direct command', example: '"Save!" (soson)' }
    ],
    relatedForms: ['present-active-subjunctive', 'aorist-active-indicative', 'aorist-active-imperative']
  },
  {
    slug: 'present-active-infinitive',
    name: 'Present Active Infinitive',
    category: 'infinitive',
    robinsonCode: 'V-PAN',
    description: 'The Present Active Infinitive expresses an ongoing or continuous action in its most basic verbal form ("to do," "to be," "to love"). It does not specify a subject or time but conveys the idea of continuous or repeated action. In Greek, infinitives are used to express purpose, result, indirect discourse, and as the subject or object of other verbs.',
    whyItMatters: 'The present infinitive emphasizes the continuous nature of the action. When Paul writes "to live is Christ" (Philippians 1:21), the present infinitive "to zen" (to live/to be living) presents life as an ongoing experience that is fully identified with Christ. When Jesus says "I came not to call the righteous but sinners to repentance" (Luke 5:32), the present infinitive "kalesai" (here actually aorist, but the concept applies) shows the nature of His mission. The present infinitive is especially important in passages about the ongoing purposes and activities of God and believers.',
    frequency: '~754 occurrences in the NT',
    examples: [
      {
        greek: 'to zen',
        transliteration: 'to zen',
        english: 'to live',
        verse: 'For to me to live is Christ, and to die is gain.',
        verseRef: 'Philippians 1:21',
        strongsNumber: 'G2198',
        explanation: 'The present infinitive "to zen" (to live) with the article presents ongoing life as a concept. Paul\'s entire continuous existence is equated with Christ. Every moment of living is Christ-centered.'
      },
      {
        greek: 'didaskein',
        transliteration: 'didaskein',
        english: 'to teach',
        verse: 'And he began again to teach by the sea side.',
        verseRef: 'Mark 4:1',
        strongsNumber: 'G1321',
        explanation: 'The present infinitive "didaskein" (to teach) presents Jesus\' teaching as an ongoing activity. He began a sustained period of instruction, not a brief remark. The present tense captures the extended, continuous nature of His teaching ministry.'
      },
      {
        greek: 'peripatein',
        transliteration: 'peripatein',
        english: 'to walk',
        verse: 'This I say then, Walk in the Spirit, and ye shall not fulfil the lust of the flesh.',
        verseRef: 'Galatians 5:16',
        strongsNumber: 'G4043',
        explanation: 'The present infinitive "peripatein" (to walk) emphasizes continuous, habitual walking by the Spirit. Paul is calling for an ongoing lifestyle, not a single spiritual experience.'
      }
    ],
    comparison: [
      { name: 'Present Active Infinitive', aspect: 'Ongoing action (to keep doing)', example: '"to be loving" (agapan)' },
      { name: 'Aorist Active Infinitive', aspect: 'Simple/decisive action (to do)', example: '"to love (decisively)" (agapesai)' },
      { name: 'Present Active Indicative', aspect: 'Ongoing factual statement', example: '"he loves" (agapa)' },
      { name: 'Present Active Participle', aspect: 'Ongoing action as description', example: '"loving" (agapon)' }
    ],
    relatedForms: ['aorist-active-infinitive', 'present-active-participle', 'present-active-indicative']
  },
  {
    slug: 'aorist-active-infinitive',
    name: 'Aorist Active Infinitive',
    category: 'infinitive',
    robinsonCode: 'V-AAN',
    description: 'The Aorist Active Infinitive expresses a simple or decisive action in its most basic verbal form. Unlike the present infinitive, which emphasizes ongoing action, the aorist infinitive views the action as a complete, whole event without implying duration or repetition. It is commonly used to express purpose, result, and the content of commands or desires.',
    whyItMatters: 'The aorist infinitive is about decisive, complete action. When Jesus says "The Son of Man came to seek and to save (sosai) that which was lost" (Luke 19:10), the aorist infinitive "sosai" presents salvation as a decisive, accomplished purpose. In Matthew 5:17, "I am not come to destroy (katalusai) the law but to fulfill (plerosai)," both aorist infinitives present these as definitive, complete acts. Understanding the aorist infinitive helps readers see when the NT authors are pointing to decisive events versus ongoing processes.',
    frequency: '~598 occurrences in the NT',
    examples: [
      {
        greek: 'sosai',
        transliteration: 'sosai',
        english: 'to save',
        verse: 'For the Son of man is come to seek and to save that which was lost.',
        verseRef: 'Luke 19:10',
        strongsNumber: 'G4982',
        explanation: 'The aorist infinitive "sosai" (to save) presents Jesus\' saving mission as a decisive, complete act. He came with a definitive purpose: to accomplish salvation as a finished work, not merely to begin an ongoing rescue.'
      },
      {
        greek: 'plerosai',
        transliteration: 'plerosai',
        english: 'to fulfill',
        verse: 'Think not that I am come to destroy the law, or the prophets: I am not come to destroy, but to fulfil.',
        verseRef: 'Matthew 5:17',
        strongsNumber: 'G4137',
        explanation: 'The aorist infinitive "plerosai" (to fulfill) presents the fulfillment of the Law as a complete, decisive act. Jesus\' purpose was not gradual compliance but total and definitive fulfillment of everything the Scriptures anticipated.'
      },
      {
        greek: 'dounai',
        transliteration: 'dounai',
        english: 'to give',
        verse: 'The Son of man came not to be ministered unto, but to minister, and to give his life a ransom for many.',
        verseRef: 'Mark 10:45',
        strongsNumber: 'G1325',
        explanation: 'The aorist infinitive "dounai" (to give) presents the giving of His life as a single, decisive act of sacrifice. It is not an ongoing giving but the once-for-all offering of Himself on the cross.'
      }
    ],
    comparison: [
      { name: 'Aorist Active Infinitive', aspect: 'Decisive/complete action (to do once)', example: '"to save" (sosai)' },
      { name: 'Present Active Infinitive', aspect: 'Ongoing action (to keep doing)', example: '"to be saving" (sozein)' },
      { name: 'Aorist Active Indicative', aspect: 'Completed factual action', example: '"he saved" (esosen)' },
      { name: 'Aorist Active Participle', aspect: 'Completed prior action', example: '"having saved" (sosas)' }
    ],
    relatedForms: ['present-active-infinitive', 'aorist-active-indicative', 'aorist-active-participle']
  },
  {
    slug: 'nominative',
    name: 'Nominative Case',
    category: 'noun',
    robinsonCode: 'N-NSM',
    description: 'The Nominative Case is the case of the subject. It identifies who or what is performing the action of the verb or being described. In Greek, the nominative ending signals that this noun is the main actor in the sentence. It is also used for predicate nominatives (statements of identity) and in forms of direct address.',
    whyItMatters: 'The nominative case tells you who is acting in a sentence, which is essential for understanding agency in theological statements. In John 1:1, "the Word was God" (theos en ho logos), "the Word" (ho logos) is nominative, identifying the subject. But "God" (theos) is also nominative, serving as the predicate. The presence or absence of the Greek article (ho) helps distinguish subject from predicate in such sentences, which is critical for understanding the deity of Christ. Getting the nominative right determines the entire meaning of key doctrinal passages.',
    frequency: '~24,618 occurrences in the NT',
    examples: [
      {
        greek: 'ho logos',
        transliteration: 'ho logos',
        english: 'the Word',
        verse: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
        verseRef: 'John 1:1',
        strongsNumber: 'G3056',
        explanation: 'The nominative "ho logos" (the Word) identifies the subject of the entire prologue. The Word is the one who existed from the beginning, who was with God, and who was God. The nominative case marks "the Word" as the central actor in creation and revelation.'
      },
      {
        greek: 'ho theos',
        transliteration: 'ho theos',
        english: 'God',
        verse: 'For God so loved the world.',
        verseRef: 'John 3:16',
        strongsNumber: 'G2316',
        explanation: 'The nominative "ho theos" (God) identifies God as the subject who performed the action of loving. In this verse, it is God Himself who initiates salvation. The nominative makes clear that the agent of love and giving is God the Father.'
      },
      {
        greek: 'agape',
        transliteration: 'agape',
        english: 'love',
        verse: 'Love never faileth.',
        verseRef: '1 Corinthians 13:8',
        strongsNumber: 'G26',
        explanation: 'The nominative "he agape" (love) is the subject of the verb "fails." Love is personified as an active agent that never fails, never falls, never collapses. The nominative case puts love in the position of the main actor throughout 1 Corinthians 13.'
      }
    ],
    comparison: [
      { name: 'Nominative', aspect: 'Subject: who/what acts', example: '"God (theos) loved" - God is the actor' },
      { name: 'Genitive', aspect: 'Possession/source: whose/from whom', example: '"of God (theou)" - belonging to God' },
      { name: 'Dative', aspect: 'Indirect object/means: to whom/by what', example: '"to God (theo)" - recipient' },
      { name: 'Accusative', aspect: 'Direct object: whom/what receives action', example: '"God (theon)" - object of action' }
    ],
    relatedForms: ['genitive', 'dative', 'accusative']
  },
  {
    slug: 'genitive',
    name: 'Genitive Case',
    category: 'noun',
    robinsonCode: 'N-GSM',
    description: 'The Genitive Case is the case of description, possession, and source. It defines, limits, or qualifies another noun, answering questions like "whose?", "what kind?", or "from where?" In Greek, the genitive has an enormous range of uses including possession, source, content, separation, comparison, and the important "genitive absolute" construction. It is the most versatile case in Greek grammar.',
    whyItMatters: 'The genitive case is behind many critical theological interpretations. When Paul writes about "the righteousness of God" (dikaiosune theou, Romans 1:17), the genitive "theou" (of God) could mean righteousness that belongs to God, righteousness that comes from God, or righteousness that God gives. When we read "the love of Christ" (2 Corinthians 5:14), it could be Christ\'s love for us or our love for Christ. Understanding the genitive and its subtypes unlocks the precise meaning of these foundational doctrinal phrases.',
    frequency: '~19,633 occurrences in the NT',
    examples: [
      {
        greek: 'theou',
        transliteration: 'theou',
        english: 'of God',
        verse: 'For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.',
        verseRef: 'Romans 6:23',
        strongsNumber: 'G2316',
        explanation: 'The genitive "theou" (of God) identifies God as the source of the gift. Eternal life is the gift that comes from God. The genitive of source shows that salvation originates with God, not human effort.'
      },
      {
        greek: 'Christou',
        transliteration: 'Christou',
        english: 'of Christ',
        verse: 'For the love of Christ constraineth us.',
        verseRef: '2 Corinthians 5:14',
        strongsNumber: 'G5547',
        explanation: 'The genitive "Christou" (of Christ) is debated: is it Christ\'s love for us (subjective genitive) or our love for Christ (objective genitive)? Context favors the subjective genitive: Christ\'s love for us is what compels us to live for Him. The genitive case creates this rich interpretive depth.'
      },
      {
        greek: 'tes hamartias',
        transliteration: 'tes hamartias',
        english: 'of sin',
        verse: 'For the wages of sin is death.',
        verseRef: 'Romans 6:23',
        strongsNumber: 'G266',
        explanation: 'The genitive "tes hamartias" (of sin) identifies sin as the source or employer that pays the wage of death. Sin is personified as a master who compensates its servants with death. The genitive reveals the causal relationship between sin and death.'
      }
    ],
    comparison: [
      { name: 'Nominative', aspect: 'Subject: who acts', example: '"God" (theos) as actor' },
      { name: 'Genitive', aspect: 'Description/possession/source', example: '"of God" (theou) - source, owner' },
      { name: 'Dative', aspect: 'Indirect object/instrument', example: '"to/by God" (theo)' },
      { name: 'Accusative', aspect: 'Direct object: receives action', example: '"God" (theon) as object' }
    ],
    relatedForms: ['nominative', 'dative', 'accusative']
  },
  {
    slug: 'dative',
    name: 'Dative Case',
    category: 'noun',
    robinsonCode: 'N-DSM',
    description: 'The Dative Case is the case of the indirect object, means, and location. It answers questions like "to whom?", "for whom?", "by what means?", and "where?" In the NT, the dative has absorbed the functions of the older locative (place) and instrumental (means) cases. It is used for the person affected by an action, the instrument or means used, and the sphere or location of an action.',
    whyItMatters: 'The dative case reveals the recipients and means of divine action. In Ephesians 2:8, "by grace (chariti) you have been saved through faith (pistei)," both "grace" and "faith" are in the dative case but function differently: grace is the means (instrumental dative) and faith is the channel. In Romans 8:28, "to those who love God" uses the dative to identify the recipients of God\'s promise. Understanding the dative reveals both who benefits from God\'s work and the means by which He accomplishes it.',
    frequency: '~12,173 occurrences in the NT',
    examples: [
      {
        greek: 'chariti',
        transliteration: 'chariti',
        english: 'by grace',
        verse: 'For by grace are ye saved through faith.',
        verseRef: 'Ephesians 2:8',
        strongsNumber: 'G5485',
        explanation: 'The dative "chariti" (by grace) functions as a dative of means or instrument. Grace is the means by which salvation is accomplished. It is not human effort or merit but God\'s undeserved favor that serves as the instrument of salvation.'
      },
      {
        greek: 'to theo',
        transliteration: 'to theo',
        english: 'to God',
        verse: 'And we know that all things work together for good to them that love God.',
        verseRef: 'Romans 8:28',
        strongsNumber: 'G2316',
        explanation: 'The dative "to theo" (God) in the phrase "tois agaposin ton theon" (to those loving God) identifies the recipients of the promise. The dative here marks the people to whom the promise applies: those who love God receive the assurance that all things work for good.'
      },
      {
        greek: 'logo',
        transliteration: 'logo',
        english: 'by the word',
        verse: 'Sanctify them through thy truth: thy word is truth.',
        verseRef: 'John 17:17',
        strongsNumber: 'G3056',
        explanation: 'The dative of means indicates the instrument of sanctification: God\'s truth/word. Believers are set apart by means of the word of God. The dative reveals the mechanism of spiritual growth and holiness.'
      }
    ],
    comparison: [
      { name: 'Nominative', aspect: 'Subject: who acts', example: '"God" (theos)' },
      { name: 'Genitive', aspect: 'Source/possession', example: '"of God" (theou)' },
      { name: 'Dative', aspect: 'Recipient/means/location', example: '"to/by God" (theo)' },
      { name: 'Accusative', aspect: 'Direct object', example: '"God" (theon) - receives action' }
    ],
    relatedForms: ['nominative', 'genitive', 'accusative']
  },
  {
    slug: 'accusative',
    name: 'Accusative Case',
    category: 'noun',
    robinsonCode: 'N-ASM',
    description: 'The Accusative Case is the case of the direct object. It identifies what or whom receives the action of the verb, answering "what?" or "whom?" It is also used for extent (how far, how long), the object of certain prepositions, and in some constructions as the subject of an infinitive. The accusative is the most straightforward case, directly connecting the verb to its object.',
    whyItMatters: 'The accusative case identifies what God acts upon and what believers are called to pursue. In John 3:16, "God so loved the world (ton kosmon)" uses the accusative to show that the entire world is the object of God\'s love. In Philippians 3:14, Paul presses toward "the goal (ton skopon)" in the accusative, marking it as the object of his pursuit. In 2 Timothy 4:7, "I have fought the good fight (ton kalon agona)," the accusative identifies what Paul accomplished. Understanding the accusative reveals the targets and objects of both divine and human action in Scripture.',
    frequency: '~23,105 occurrences in the NT',
    examples: [
      {
        greek: 'ton kosmon',
        transliteration: 'ton kosmon',
        english: 'the world',
        verse: 'For God so loved the world, that he gave his only begotten Son.',
        verseRef: 'John 3:16',
        strongsNumber: 'G2889',
        explanation: 'The accusative "ton kosmon" (the world) is the direct object of God\'s love. The entire world, not just a select group, is the recipient of God\'s love. The accusative makes the scope of divine love unmistakably clear and universal.'
      },
      {
        greek: 'ton agona ton kalon',
        transliteration: 'ton agona ton kalon',
        english: 'the good fight',
        verse: 'I have fought a good fight, I have finished my course, I have kept the faith.',
        verseRef: '2 Timothy 4:7',
        strongsNumber: 'G73',
        explanation: 'The accusative "ton kalon agona" (the good fight) identifies the object of Paul\'s lifelong struggle. The accusative case marks the fight, the course, and the faith as the things Paul acted upon and accomplished throughout his ministry.'
      },
      {
        greek: 'ton monogene huion',
        transliteration: 'ton monogene huion',
        english: 'the only begotten Son',
        verse: 'He gave his only begotten Son.',
        verseRef: 'John 3:16',
        strongsNumber: 'G5207',
        explanation: 'The accusative "ton huion ton monogene" (the only-begotten Son) marks the Son as the direct object of God\'s giving. The accusative makes explicit what God gave: His unique, one-of-a-kind Son. This is the most costly gift ever described in Scripture.'
      }
    ],
    comparison: [
      { name: 'Nominative', aspect: 'Subject: who acts', example: '"God" (theos) loves' },
      { name: 'Genitive', aspect: 'Possession/source', example: '"of God" (theou)' },
      { name: 'Dative', aspect: 'Indirect object/means', example: '"to God" (theo)' },
      { name: 'Accusative', aspect: 'Direct object: receives action', example: '"the world" (ton kosmon) is loved' }
    ],
    relatedForms: ['nominative', 'genitive', 'dative']
  },
];

export default grammarForms;

// Helper functions
export function getGrammarForm(slug: string): GrammarForm | undefined {
  return grammarForms.find(f => f.slug === slug);
}

export function getAllGrammarForms(): GrammarForm[] {
  return grammarForms;
}

export function getGrammarFormsByCategory(category: GrammarForm['category']): GrammarForm[] {
  return grammarForms.filter(f => f.category === category);
}

export function getRelatedForms(slugs: string[]): GrammarForm[] {
  return slugs.map(s => grammarForms.find(f => f.slug === s)).filter(Boolean) as GrammarForm[];
}
