import { Quiz, QuizQuestion } from './types';

// Research-Based Genesis Chapter 1 Quiz
// Based on educational psychology research and Bible pedagogy best practices
export const GENESIS_1_QUIZ_RESEARCH_BASED: Quiz = {
  id: 'genesis-1-research-based',
  title: 'Genesis Chapter 1 Quiz - Research-Based Design',
  description: 'A scientifically-designed quiz on Genesis 1 using proven educational psychology principles for maximum learning and spiritual growth.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 1,
  questions: [
    // KNOWLEDGE LEVEL (30%) - Foundation Building
    {
      id: 'gen1-research-q1',
      question: 'According to Genesis 1:26, what phrase indicates the Trinity\'s involvement in human creation?',
      type: 'multiple-choice',
      options: ['"Let us make man"', '"I will create"', '"God formed"', '"The Lord said"'],
      correctAnswer: '"Let us make man"',
      explanation: 'The plural "us" suggests the Trinity in consultation, distinguishing human creation from all other creative acts which use singular commands.',
      verseReference: 'Genesis 1:26',
      difficulty: 'easy',
      cognitiveLevel: 'knowledge'
    },

    {
      id: 'gen1-research-q2',
      question: 'The phrase "And God saw that it was good" appears exactly seven times in Genesis 1.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'This sevenfold repetition emphasizes God\'s complete satisfaction with creation. The number seven represents perfection and completion in Hebrew thought.',
      verseReference: 'Genesis 1',
      difficulty: 'medium',
      cognitiveLevel: 'comprehension'
    },

    // APPLICATION LEVEL (25%) - Real-world connections
    {
      id: 'gen1-research-q3',
      question: 'A Christian environmental scientist argues that Genesis 1:28\'s "dominion" command supports aggressive industrial development. How should this be understood biblically?',
      type: 'multiple-choice',
      options: [
        'Dominion means unlimited exploitation of natural resources',
        'Dominion means responsible stewardship reflecting God\'s care for creation',
        'The command only applied to ancient times',
        'Environmental concerns are not biblical issues'
      ],
      correctAnswer: 'Dominion means responsible stewardship reflecting God\'s care for creation',
      explanation: 'Biblical dominion reflects God\'s own character - He creates, sustains, and cares for His creation. Human dominion should mirror His loving oversight, not destructive exploitation.',
      verseReference: 'Genesis 1:28',
      difficulty: 'hard',
      cognitiveLevel: 'application'
    },

    {
      id: 'gen1-research-q4',
      question: 'Your friend says, "If God is all-powerful, why did creation take six days instead of instantly?" How does Genesis 1 help answer this?',
      type: 'multiple-choice',
      options: [
        'God was actually limited in His power',
        'The six-day pattern establishes rhythm, order, and rest as divine principles',
        'Genesis 1 is purely symbolic, not describing real events',
        'God needed time to plan each step'
      ],
      correctAnswer: 'The six-day pattern establishes rhythm, order, and rest as divine principles',
      explanation: 'The creation pattern teaches us about work, rest, and divine order. God\'s rest on day seven becomes the foundation for the Sabbath principle throughout Scripture.',
      verseReference: 'Genesis 1:31-2:3',
      difficulty: 'hard',
      cognitiveLevel: 'application'
    },

    // ANALYSIS LEVEL (25%) - Breaking down concepts
    {
      id: 'gen1-research-q5',
      question: 'Compare God\'s creation of light (day 1) with His creation of sun/moon/stars (day 4). What theological truth does this sequence reveal?',
      type: 'multiple-choice',
      options: [
        'The Bible contains scientific errors about the order of creation',
        'God Himself is the ultimate source of light, independent of created objects',
        'Ancient people didn\'t understand astronomy',
        'The sequence is random with no particular meaning'
      ],
      correctAnswer: 'God Himself is the ultimate source of light, independent of created objects',
      explanation: 'This pattern reveals that God is the source of all light and energy. John 1:5 and 1 John 1:5 build on this theme, showing God as eternal light.',
      verseReference: 'Genesis 1:3-5, 14-19; cf. John 1:5',
      difficulty: 'hard',
      cognitiveLevel: 'analysis'
    },

    {
      id: 'gen1-research-q6',
      question: 'What pattern do you notice in how Genesis 1 describes each day of creation?',
      type: 'multiple-choice',
      options: [
        'Random descriptions with no consistent structure',
        'A consistent pattern: command, fulfillment, evaluation, and time marker',
        'Only the final result is described for each day',
        'Each day focuses solely on God\'s emotions'
      ],
      correctAnswer: 'A consistent pattern: command, fulfillment, evaluation, and time marker',
      explanation: 'Each day follows the pattern: "And God said" (command), "and it was so" (fulfillment), "God saw that it was good" (evaluation), "evening and morning" (time marker). This structure emphasizes God\'s sovereign word and perfect work.',
      verseReference: 'Genesis 1',
      difficulty: 'medium',
      cognitiveLevel: 'analysis'
    },

    // SYNTHESIS/EVALUATION LEVEL (20%) - Connecting themes
    {
      id: 'gen1-research-q7',
      question: 'How does the creation account in Genesis 1 relate to Jesus as described in John 1:1-3?',
      type: 'multiple-choice',
      options: [
        'They describe completely different events with no connection',
        'John 1 identifies Jesus as the Word through whom all creation occurred',
        'John 1 contradicts the Genesis account',
        'Only the Father was involved in creation, not Jesus'
      ],
      correctAnswer: 'John 1 identifies Jesus as the Word through whom all creation occurred',
      explanation: 'John 1:3 states "All things were made through him." When Genesis records "And God said," John reveals this Word as Jesus Christ, the eternal Son through whom creation occurred.',
      verseReference: 'Genesis 1:3; John 1:1-3; Colossians 1:16',
      difficulty: 'hard',
      cognitiveLevel: 'synthesis'
    },

    // FILL-IN-BLANK (10%) - Key terms and specific recall
    {
      id: 'gen1-research-q8',
      question: 'Complete this foundational verse: "In the _______ God _______ the _______ and the _______."',
      type: 'fill-in-blank',
      correctAnswer: 'beginning; created; heaven; earth',
      explanation: 'This opening verse establishes God as the eternal Creator who exists before and beyond His creation. It\'s the foundation for all biblical theology.',
      verseReference: 'Genesis 1:1',
      difficulty: 'easy',
      cognitiveLevel: 'knowledge'
    },

    // MISCONCEPTION IDENTIFICATION (True/False format)
    {
      id: 'gen1-research-q9',
      question: 'True or False: Genesis 1 teaches that humans and animals were created in the same way and have equal value.',
      type: 'true-false',
      correctAnswer: 'false',
      explanation: 'While both humans and animals are God\'s creation, humans alone are made "in God\'s image" (v.27) and given dominion (v.28). This unique status carries both privilege and responsibility.',
      verseReference: 'Genesis 1:26-28',
      difficulty: 'medium',
      cognitiveLevel: 'evaluation'
    },

    // PROGRESSIVE DIFFICULTY - Building complexity
    {
      id: 'gen1-research-q10',
      question: 'A Muslim friend says, "Christians believe in three gods because Genesis 1:26 says \'Let us make man.\'" How would you respond biblically?',
      type: 'multiple-choice',
      options: [
        'You\'re right, this verse proves Christians worship multiple gods',
        'The plural shows one God existing in three persons - Father, Son, and Holy Spirit',
        'This verse has nothing to do with God\'s nature',
        'The Hebrew language always uses plurals for God'
      ],
      correctAnswer: 'The plural shows one God existing in three persons - Father, Son, and Holy Spirit',
      explanation: 'The Hebrew "Elohim" (God) is plural, yet used with singular verbs, suggesting unity in plurality. The Trinity is one God in three persons, not three separate gods.',
      verseReference: 'Genesis 1:26; Deuteronomy 6:4; Matthew 28:19',
      difficulty: 'hard',
      cognitiveLevel: 'evaluation'
    },

    // SPIRITUAL FORMATION FOCUS
    {
      id: 'gen1-research-q11',
      question: 'What does it mean practically for your daily life that you are created "in God\'s image"?',
      type: 'multiple-choice',
      options: [
        'It means I look physically similar to God',
        'It means I have inherent dignity and should reflect God\'s character in my actions',
        'It means I am equal to God in power and authority',
        'It only matters for theological study, not daily living'
      ],
      correctAnswer: 'It means I have inherent dignity and should reflect God\'s character in my actions',
      explanation: 'Being made in God\'s image means we bear His moral, rational, and relational nature. This gives us dignity and responsibility to reflect His character in creativity, relationships, and stewardship.',
      verseReference: 'Genesis 1:26-27; Ephesians 4:24',
      difficulty: 'medium',
      cognitiveLevel: 'application'
    },

    // CROSS-REFERENCE INTEGRATION
    {
      id: 'gen1-research-q12',
      question: 'How does God\'s rest on the seventh day (Genesis 2:2-3) connect to Jesus\' invitation in Matthew 11:28?',
      type: 'multiple-choice',
      options: [
        'There is no connection between these passages',
        'Both show God\'s desire to provide rest - physical rest through Sabbath, spiritual rest through Jesus',
        'They contradict each other about the nature of rest',
        'Only the Genesis passage is about literal rest'
      ],
      correctAnswer: 'Both show God\'s desire to provide rest - physical rest through Sabbath, spiritual rest through Jesus',
      explanation: 'God\'s rest establishes the pattern of Sabbath rest for physical restoration. Jesus offers deeper spiritual rest from sin and striving, fulfilling the true meaning of Sabbath rest.',
      verseReference: 'Genesis 2:2-3; Matthew 11:28; Hebrews 4:9-10',
      difficulty: 'hard',
      cognitiveLevel: 'synthesis'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-1-quiz-research-based',
  tags: ['creation', 'genesis', 'old-testament', 'theology', 'application'],
  totalQuestions: 12,
  estimatedTime: 10
};