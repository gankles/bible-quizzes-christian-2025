import { Quiz, QuizQuestion } from './types';

// Sample quiz data for Genesis Chapter 1
export const GENESIS_1_QUIZ: Quiz = {
  id: 'genesis-1',
  title: 'Genesis Chapter 1 Quiz',
  description: 'Test your knowledge of the creation account in Genesis chapter 1. This quiz covers the seven days of creation, the order of events, and key theological concepts.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 1,
  questions: [
    {
      id: 'gen1-q1',
      question: 'What did God create on the first day?',
      type: 'multiple-choice',
      options: ['Light and darkness', 'Heaven and earth', 'Sun and moon', 'Plants and trees'],
      correctAnswer: 'Light and darkness',
      explanation: 'On the first day, God said "Let there be light," and there was light. He separated the light from the darkness, calling the light Day and the darkness Night.',
      verseReference: 'Genesis 1:3-5',
      difficulty: 'easy'
    },
    {
      id: 'gen1-q2',
      question: 'God created the heavens and the earth in the beginning.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The very first verse of the Bible states: "In the beginning God created the heaven and the earth."',
      verseReference: 'Genesis 1:1',
      difficulty: 'easy'
    },
    {
      id: 'gen1-q3',
      question: 'On which day did God create man?',
      type: 'multiple-choice',
      options: ['Fifth day', 'Sixth day', 'Seventh day', 'Fourth day'],
      correctAnswer: 'Sixth day',
      explanation: 'God created man on the sixth day, after creating the land animals. He created man in His own image, both male and female.',
      verseReference: 'Genesis 1:26-27',
      difficulty: 'medium'
    },
    {
      id: 'gen1-q4',
      question: 'Complete this verse: "And God said, Let us make man in our ______, after our likeness."',
      type: 'multiple-choice',
      options: ['image', 'likeness', 'spirit', 'form'],
      correctAnswer: 'image',
      explanation: 'This verse shows that humans are created in God\'s image, which sets them apart from all other creatures.',
      verseReference: 'Genesis 1:26',
      difficulty: 'medium'
    },
    {
      id: 'gen1-q5',
      question: 'What did God create on the third day?',
      type: 'multiple-choice',
      options: ['Fish and birds', 'Dry land and plants', 'Sun, moon, and stars', 'Animals and humans'],
      correctAnswer: 'Dry land and plants',
      explanation: 'On the third day, God gathered the waters and let dry land appear, then created grass, herbs, and fruit trees.',
      verseReference: 'Genesis 1:9-13',
      difficulty: 'medium'
    },
    {
      id: 'gen1-q6',
      question: 'The sun was created before the light.',
      type: 'true-false',
      correctAnswer: 'false',
      explanation: 'Light was created on the first day, but the sun, moon, and stars were not created until the fourth day.',
      verseReference: 'Genesis 1:3-5, 14-19',
      difficulty: 'medium'
    },
    {
      id: 'gen1-q7',
      question: 'What did God do on the seventh day?',
      type: 'multiple-choice',
      options: ['Created more animals', 'Rested from His work', 'Created the Garden of Eden', 'Blessed the animals'],
      correctAnswer: 'Rested from His work',
      explanation: 'On the seventh day, God ended His work of creation and rested. He blessed the seventh day and sanctified it.',
      verseReference: 'Genesis 2:2-3',
      difficulty: 'easy'
    },
    {
      id: 'gen1-q8',
      question: 'Complete this phrase: "And God saw every thing that he had made, and, behold, it was very ______."',
      type: 'multiple-choice',
      options: ['good', 'beautiful', 'perfect', 'wonderful'],
      correctAnswer: 'good',
      explanation: 'After completing creation, God looked at everything He had made and declared it "very good."',
      verseReference: 'Genesis 1:31',
      difficulty: 'easy'
    },
    {
      id: 'gen1-q9',
      question: 'On which day were the sun, moon, and stars created?',
      type: 'multiple-choice',
      options: ['First day', 'Second day', 'Third day', 'Fourth day'],
      correctAnswer: 'Fourth day',
      explanation: 'God created the sun, moon, and stars on the fourth day to give light and to separate day from night.',
      verseReference: 'Genesis 1:14-19',
      difficulty: 'medium'
    },
    {
      id: 'gen1-q10',
      question: 'God created fish and birds on the same day.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'On the fifth day, God created great sea creatures and every living thing that moves in the waters, and every winged bird.',
      verseReference: 'Genesis 1:20-23',
      difficulty: 'easy'
    },
    {
      id: 'gen1-q11',
      question: 'Complete this phrase: "In the beginning God created the ______ and the ______."',
      type: 'multiple-choice',
      options: ['heaven; earth', 'light; darkness', 'sun; moon', 'land; sea'],
      correctAnswer: 'heaven; earth',
      explanation: 'The very first verse states "In the beginning God created the heaven and the earth," making this the opening declaration of creation.',
      verseReference: 'Genesis 1:1',
      difficulty: 'easy'
    },
    {
      id: 'gen1-q12',
      question: 'God gave humans dominion over all other creatures.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'God told humans to have dominion over the fish, birds, and every living thing that moves on the earth.',
      verseReference: 'Genesis 1:28',
      difficulty: 'easy'
    },
    {
      id: 'gen1-q13',
      question: 'How many times does the phrase "And God said" appear in Genesis 1?',
      type: 'multiple-choice',
      options: ['Seven times', 'Eight times', 'Nine times', 'Ten times'],
      correctAnswer: 'Ten times',
      explanation: 'The phrase "And God said" appears ten times in Genesis 1, emphasizing God\'s power to create through His word.',
      verseReference: 'Genesis 1',
      difficulty: 'hard'
    },
    {
      id: 'gen1-q14',
      question: 'Complete this phrase: "And the evening and the morning were the ______ day."',
      type: 'multiple-choice',
      options: ['first', 'second', 'third', 'seventh'],
      correctAnswer: 'first',
      explanation: 'This phrase (with the appropriate day number) concludes each day of creation, establishing the pattern of evening and morning defining a day.',
      verseReference: 'Genesis 1:5',
      difficulty: 'medium'
    },
    {
      id: 'gen1-q15',
      question: 'Complete this phrase: "And God said, Let there be ______, and there was ______."',
      type: 'multiple-choice',
      options: ['light; light', 'water; water', 'land; land', 'plants; plants'],
      correctAnswer: 'light; light',
      explanation: 'This was God\'s first spoken command during creation, demonstrating His power to create through His word.',
      verseReference: 'Genesis 1:3',
      difficulty: 'easy'
    },
    {
      id: 'gen1-q16',
      question: 'The Spirit of God moved upon the face of the waters.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Genesis 1:2 describes the initial state where "the Spirit of God moved upon the face of the waters."',
      verseReference: 'Genesis 1:2',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-1-quiz',
  tags: ['creation', 'genesis', 'old-testament', 'beginnings'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 3 Quiz - The Fall
export const GENESIS_3_QUIZ: Quiz = {
  id: 'genesis-3',
  title: 'Genesis Chapter 3 Quiz',
  description: 'Test your knowledge of the Fall of Man in Genesis chapter 3. This quiz covers the serpent\'s temptation, the forbidden fruit, and the consequences of sin.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 3,
  questions: [
    {
      id: 'gen3-q1',
      question: 'Which creature was more subtil than any beast of the field?',
      type: 'multiple-choice',
      options: ['The serpent', 'The lion', 'The eagle', 'The fox'],
      correctAnswer: 'The serpent',
      explanation: 'The serpent was more subtil than any beast of the field which the LORD God had made.',
      verseReference: 'Genesis 3:1',
      difficulty: 'easy'
    },
    {
      id: 'gen3-q2',
      question: 'The serpent told Eve that she would surely die if she ate the fruit.',
      type: 'true-false',
      correctAnswer: 'false',
      explanation: 'The serpent said "Ye shall not surely die" - contradicting God\'s warning.',
      verseReference: 'Genesis 3:4',
      difficulty: 'easy'
    },
    {
      id: 'gen3-q3',
      question: 'What did the serpent say would happen if Eve ate the fruit?',
      type: 'multiple-choice',
      options: ['Your eyes shall be opened, and ye shall be as gods', 'You will become immortal', 'You will gain great wealth', 'You will rule over Adam'],
      correctAnswer: 'Your eyes shall be opened, and ye shall be as gods',
      explanation: 'The serpent promised that their eyes would be opened and they would be as gods, knowing good and evil.',
      verseReference: 'Genesis 3:5',
      difficulty: 'medium'
    },
    {
      id: 'gen3-q4',
      question: 'Eve saw that the tree was good for food and pleasant to the eyes.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'When the woman saw that the tree was good for food, and pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit.',
      verseReference: 'Genesis 3:6',
      difficulty: 'easy'
    },
    {
      id: 'gen3-q5',
      question: 'Who did Eve give the fruit to after she ate it?',
      type: 'multiple-choice',
      options: ['Her husband with her', 'The serpent', 'No one', 'Her children'],
      correctAnswer: 'Her husband with her',
      explanation: 'She took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat.',
      verseReference: 'Genesis 3:6',
      difficulty: 'easy'
    },
    {
      id: 'gen3-q6',
      question: 'What happened to Adam and Eve after they ate the fruit?',
      type: 'multiple-choice',
      options: ['Their eyes were opened and they knew they were naked', 'They immediately died', 'They became gods', 'Nothing happened'],
      correctAnswer: 'Their eyes were opened and they knew they were naked',
      explanation: 'The eyes of them both were opened, and they knew that they were naked.',
      verseReference: 'Genesis 3:7',
      difficulty: 'easy'
    },
    {
      id: 'gen3-q7',
      question: 'Adam and Eve made themselves coverings from fig leaves.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'They sewed fig leaves together, and made themselves aprons.',
      verseReference: 'Genesis 3:7',
      difficulty: 'easy'
    },
    {
      id: 'gen3-q8',
      question: 'When did Adam and Eve hear the voice of the LORD God in the garden?',
      type: 'multiple-choice',
      options: ['In the cool of the day', 'At midnight', 'At dawn', 'At noon'],
      correctAnswer: 'In the cool of the day',
      explanation: 'They heard the voice of the LORD God walking in the garden in the cool of the day.',
      verseReference: 'Genesis 3:8',
      difficulty: 'medium'
    },
    {
      id: 'gen3-q9',
      question: 'Adam and Eve hid themselves from God.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Adam and his wife hid themselves from the presence of the LORD God amongst the trees of the garden.',
      verseReference: 'Genesis 3:8',
      difficulty: 'easy'
    },
    {
      id: 'gen3-q10',
      question: 'Who did Adam blame for eating the fruit?',
      type: 'multiple-choice',
      options: ['The woman whom thou gavest to be with me', 'The serpent', 'Himself', 'No one'],
      correctAnswer: 'The woman whom thou gavest to be with me',
      explanation: 'Adam said, "The woman whom thou gavest to be with me, she gave me of the tree, and I did eat."',
      verseReference: 'Genesis 3:12',
      difficulty: 'medium'
    },
    {
      id: 'gen3-q11',
      question: 'The serpent was cursed above all cattle and every beast of the field.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'God said to the serpent, "Thou art cursed above all cattle, and above every beast of the field."',
      verseReference: 'Genesis 3:14',
      difficulty: 'easy'
    },
    {
      id: 'gen3-q12',
      question: 'What would the serpent eat according to God\'s curse?',
      type: 'multiple-choice',
      options: ['Dust', 'Grass', 'Insects', 'Nothing'],
      correctAnswer: 'Dust',
      explanation: 'God told the serpent, "Dust shalt thou eat all the days of thy life."',
      verseReference: 'Genesis 3:14',
      difficulty: 'medium'
    },
    {
      id: 'gen3-q13',
      question: 'God said there would be enmity between the serpent and the woman.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'God said, "I will put enmity between thee and the woman, and between thy seed and her seed."',
      verseReference: 'Genesis 3:15',
      difficulty: 'easy'
    },
    {
      id: 'gen3-q14',
      question: 'What would be multiplied for Eve as part of her consequence?',
      type: 'multiple-choice',
      options: ['Sorrow in conception and childbirth', 'Her wealth', 'Her children', 'Her knowledge'],
      correctAnswer: 'Sorrow in conception and childbirth',
      explanation: 'God said to Eve, "I will greatly multiply thy sorrow and thy conception; in sorrow thou shalt bring forth children."',
      verseReference: 'Genesis 3:16',
      difficulty: 'medium'
    },
    {
      id: 'gen3-q15',
      question: 'What did God make for Adam and Eve to clothe them?',
      type: 'multiple-choice',
      options: ['Coats of skins', 'Robes of linen', 'Fig leaf garments', 'Wool garments'],
      correctAnswer: 'Coats of skins',
      explanation: 'Unto Adam also and to his wife did the LORD God make coats of skins, and clothed them.',
      verseReference: 'Genesis 3:21',
      difficulty: 'medium'
    },
    {
      id: 'gen3-q16',
      question: 'What was placed at the east of the Garden of Eden to guard the way to the tree of life?',
      type: 'multiple-choice',
      options: ['Cherubims and a flaming sword', 'Angels', 'A wall of fire', 'A great beast'],
      correctAnswer: 'Cherubims and a flaming sword',
      explanation: 'God placed Cherubims, and a flaming sword which turned every way, to keep the way of the tree of life.',
      verseReference: 'Genesis 3:24',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-3-quiz',
  tags: ['fall', 'sin', 'genesis', 'old-testament', 'serpent', 'temptation'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 4 Quiz - Cain and Abel
export const GENESIS_4_QUIZ: Quiz = {
  id: 'genesis-4',
  title: 'Genesis Chapter 4 Quiz',
  description: 'Test your knowledge of Genesis chapter 4, covering Cain and Abel, the first murder, and the line of Cain.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 4,
  questions: [
    {
      id: 'gen4-q1',
      question: 'Who was the firstborn son of Adam and Eve?',
      type: 'multiple-choice',
      options: ['Cain', 'Abel', 'Seth', 'Enoch'],
      correctAnswer: 'Cain',
      explanation: 'Eve conceived and bare Cain, saying "I have gotten a man from the LORD."',
      verseReference: 'Genesis 4:1',
      difficulty: 'easy'
    },
    {
      id: 'gen4-q2',
      question: 'Abel was a keeper of sheep.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Abel was a keeper of sheep, but Cain was a tiller of the ground.',
      verseReference: 'Genesis 4:2',
      difficulty: 'easy'
    },
    {
      id: 'gen4-q3',
      question: 'What was Cain\'s occupation?',
      type: 'multiple-choice',
      options: ['Tiller of the ground', 'Keeper of sheep', 'Hunter', 'Builder'],
      correctAnswer: 'Tiller of the ground',
      explanation: 'Cain was a tiller of the ground.',
      verseReference: 'Genesis 4:2',
      difficulty: 'easy'
    },
    {
      id: 'gen4-q4',
      question: 'What offering did Abel bring to the LORD?',
      type: 'multiple-choice',
      options: ['Firstlings of his flock and the fat thereof', 'Fruit of the ground', 'Gold and silver', 'Grain and wine'],
      correctAnswer: 'Firstlings of his flock and the fat thereof',
      explanation: 'Abel brought of the firstlings of his flock and of the fat thereof.',
      verseReference: 'Genesis 4:4',
      difficulty: 'medium'
    },
    {
      id: 'gen4-q5',
      question: 'The LORD had respect unto Abel and his offering.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The LORD had respect unto Abel and to his offering.',
      verseReference: 'Genesis 4:4',
      difficulty: 'easy'
    },
    {
      id: 'gen4-q6',
      question: 'How did Cain react when God rejected his offering?',
      type: 'multiple-choice',
      options: ['He was very wroth, and his countenance fell', 'He repented', 'He brought a better offering', 'He thanked God'],
      correctAnswer: 'He was very wroth, and his countenance fell',
      explanation: 'Cain was very wroth, and his countenance fell.',
      verseReference: 'Genesis 4:5',
      difficulty: 'easy'
    },
    {
      id: 'gen4-q7',
      question: 'God told Cain that sin lieth at the door.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'God said, "If thou doest not well, sin lieth at the door."',
      verseReference: 'Genesis 4:7',
      difficulty: 'medium'
    },
    {
      id: 'gen4-q8',
      question: 'Where did Cain kill Abel?',
      type: 'multiple-choice',
      options: ['In the field', 'At home', 'By the altar', 'In the garden'],
      correctAnswer: 'In the field',
      explanation: 'When they were in the field, Cain rose up against Abel his brother, and slew him.',
      verseReference: 'Genesis 4:8',
      difficulty: 'medium'
    },
    {
      id: 'gen4-q9',
      question: 'What did Cain say when God asked where Abel was?',
      type: 'multiple-choice',
      options: ['I know not: Am I my brother\'s keeper?', 'He went to the field', 'I have not seen him', 'He is with the sheep'],
      correctAnswer: 'I know not: Am I my brother\'s keeper?',
      explanation: 'Cain said, "I know not: Am I my brother\'s keeper?"',
      verseReference: 'Genesis 4:9',
      difficulty: 'easy'
    },
    {
      id: 'gen4-q10',
      question: 'God said Abel\'s blood cried unto Him from the ground.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'God said, "The voice of thy brother\'s blood crieth unto me from the ground."',
      verseReference: 'Genesis 4:10',
      difficulty: 'easy'
    },
    {
      id: 'gen4-q11',
      question: 'What was Cain\'s punishment?',
      type: 'multiple-choice',
      options: ['A fugitive and a vagabond in the earth', 'Death', 'Imprisonment', 'Exile to Egypt'],
      correctAnswer: 'A fugitive and a vagabond in the earth',
      explanation: 'God said Cain would be a fugitive and a vagabond in the earth.',
      verseReference: 'Genesis 4:12',
      difficulty: 'medium'
    },
    {
      id: 'gen4-q12',
      question: 'God set a mark upon Cain to protect him.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The LORD set a mark upon Cain, lest any finding him should kill him.',
      verseReference: 'Genesis 4:15',
      difficulty: 'easy'
    },
    {
      id: 'gen4-q13',
      question: 'Where did Cain dwell after leaving God\'s presence?',
      type: 'multiple-choice',
      options: ['The land of Nod', 'The land of Egypt', 'The land of Canaan', 'The land of Ur'],
      correctAnswer: 'The land of Nod',
      explanation: 'Cain went out from the presence of the LORD, and dwelt in the land of Nod, on the east of Eden.',
      verseReference: 'Genesis 4:16',
      difficulty: 'medium'
    },
    {
      id: 'gen4-q14',
      question: 'Cain built a city and named it after his son.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Cain builded a city, and called the name of the city after the name of his son, Enoch.',
      verseReference: 'Genesis 4:17',
      difficulty: 'medium'
    },
    {
      id: 'gen4-q15',
      question: 'Who was the son Adam and Eve had after Abel died?',
      type: 'multiple-choice',
      options: ['Seth', 'Enoch', 'Lamech', 'Noah'],
      correctAnswer: 'Seth',
      explanation: 'Adam knew his wife again; and she bare a son, and called his name Seth.',
      verseReference: 'Genesis 4:25',
      difficulty: 'easy'
    },
    {
      id: 'gen4-q16',
      question: 'Men began to call upon the name of the LORD during Seth\'s son\'s time.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'To Seth was born Enos: then began men to call upon the name of the LORD.',
      verseReference: 'Genesis 4:26',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-4-quiz',
  tags: ['cain', 'abel', 'murder', 'genesis', 'old-testament', 'seth'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 5 Quiz - Genealogy from Adam to Noah
export const GENESIS_5_QUIZ: Quiz = {
  id: 'genesis-5',
  title: 'Genesis Chapter 5 Quiz',
  description: 'Test your knowledge of Genesis chapter 5, covering the genealogy from Adam to Noah and the remarkable lifespans of the patriarchs.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 5,
  questions: [
    {
      id: 'gen5-q1',
      question: 'This chapter is called the book of the generations of whom?',
      type: 'multiple-choice',
      options: ['Adam', 'Noah', 'Seth', 'Enoch'],
      correctAnswer: 'Adam',
      explanation: 'This is the book of the generations of Adam.',
      verseReference: 'Genesis 5:1',
      difficulty: 'easy'
    },
    {
      id: 'gen5-q2',
      question: 'God created man in His own likeness.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'In the day that God created man, in the likeness of God made he him.',
      verseReference: 'Genesis 5:1',
      difficulty: 'easy'
    },
    {
      id: 'gen5-q3',
      question: 'How old was Adam when Seth was born?',
      type: 'multiple-choice',
      options: ['130 years', '100 years', '150 years', '200 years'],
      correctAnswer: '130 years',
      explanation: 'Adam lived an hundred and thirty years, and begat a son in his own likeness.',
      verseReference: 'Genesis 5:3',
      difficulty: 'medium'
    },
    {
      id: 'gen5-q4',
      question: 'How many years did Adam live in total?',
      type: 'multiple-choice',
      options: ['930 years', '900 years', '950 years', '850 years'],
      correctAnswer: '930 years',
      explanation: 'All the days that Adam lived were nine hundred and thirty years: and he died.',
      verseReference: 'Genesis 5:5',
      difficulty: 'medium'
    },
    {
      id: 'gen5-q5',
      question: 'Enoch walked with God.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Enoch walked with God after he begat Methuselah three hundred years.',
      verseReference: 'Genesis 5:22',
      difficulty: 'easy'
    },
    {
      id: 'gen5-q6',
      question: 'How many years did Enoch live?',
      type: 'multiple-choice',
      options: ['365 years', '300 years', '400 years', '500 years'],
      correctAnswer: '365 years',
      explanation: 'All the days of Enoch were three hundred sixty and five years.',
      verseReference: 'Genesis 5:23',
      difficulty: 'medium'
    },
    {
      id: 'gen5-q7',
      question: 'Enoch died like all the other patriarchs.',
      type: 'true-false',
      correctAnswer: 'false',
      explanation: 'Enoch walked with God: and he was not; for God took him. He did not die.',
      verseReference: 'Genesis 5:24',
      difficulty: 'easy'
    },
    {
      id: 'gen5-q8',
      question: 'Who lived the longest of all the patriarchs?',
      type: 'multiple-choice',
      options: ['Methuselah', 'Adam', 'Noah', 'Jared'],
      correctAnswer: 'Methuselah',
      explanation: 'All the days of Methuselah were nine hundred sixty and nine years.',
      verseReference: 'Genesis 5:27',
      difficulty: 'easy'
    },
    {
      id: 'gen5-q9',
      question: 'How many years did Methuselah live?',
      type: 'multiple-choice',
      options: ['969 years', '950 years', '930 years', '912 years'],
      correctAnswer: '969 years',
      explanation: 'All the days of Methuselah were nine hundred sixty and nine years: and he died.',
      verseReference: 'Genesis 5:27',
      difficulty: 'medium'
    },
    {
      id: 'gen5-q10',
      question: 'Lamech was Noah\'s father.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Lamech lived an hundred eighty and two years, and begat a son: And he called his name Noah.',
      verseReference: 'Genesis 5:28-29',
      difficulty: 'easy'
    },
    {
      id: 'gen5-q11',
      question: 'Why did Lamech name his son Noah?',
      type: 'multiple-choice',
      options: ['He shall comfort us concerning our work and toil', 'He was righteous', 'God told him to', 'It was a family name'],
      correctAnswer: 'He shall comfort us concerning our work and toil',
      explanation: 'He called his name Noah, saying, "This same shall comfort us concerning our work and toil of our hands."',
      verseReference: 'Genesis 5:29',
      difficulty: 'medium'
    },
    {
      id: 'gen5-q12',
      question: 'Who were Noah\'s three sons?',
      type: 'multiple-choice',
      options: ['Shem, Ham, and Japheth', 'Cain, Abel, and Seth', 'Enoch, Lamech, and Noah', 'Adam, Seth, and Enos'],
      correctAnswer: 'Shem, Ham, and Japheth',
      explanation: 'Noah begat Shem, Ham, and Japheth.',
      verseReference: 'Genesis 5:32',
      difficulty: 'easy'
    },
    {
      id: 'gen5-q13',
      question: 'Noah was 500 years old when his sons were born.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Noah was five hundred years old: and Noah begat Shem, Ham, and Japheth.',
      verseReference: 'Genesis 5:32',
      difficulty: 'medium'
    },
    {
      id: 'gen5-q14',
      question: 'Who was Seth\'s son?',
      type: 'multiple-choice',
      options: ['Enos', 'Cainan', 'Mahalaleel', 'Jared'],
      correctAnswer: 'Enos',
      explanation: 'Seth lived an hundred and five years, and begat Enos.',
      verseReference: 'Genesis 5:6',
      difficulty: 'medium'
    },
    {
      id: 'gen5-q15',
      question: 'How old was Seth when he died?',
      type: 'multiple-choice',
      options: ['912 years', '905 years', '930 years', '895 years'],
      correctAnswer: '912 years',
      explanation: 'All the days of Seth were nine hundred and twelve years: and he died.',
      verseReference: 'Genesis 5:8',
      difficulty: 'hard'
    },
    {
      id: 'gen5-q16',
      question: 'Jared was Enoch\'s father.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Jared lived an hundred sixty and two years, and he begat Enoch.',
      verseReference: 'Genesis 5:18',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-5-quiz',
  tags: ['genealogy', 'patriarchs', 'genesis', 'old-testament', 'adam', 'noah', 'enoch', 'methuselah'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 6 Quiz - Corruption and Noah
export const GENESIS_6_QUIZ: Quiz = {
  id: 'genesis-6',
  title: 'Genesis Chapter 6 Quiz',
  description: 'Test your knowledge of Genesis chapter 6, covering the corruption of mankind, God\'s grief, Noah finding grace, and the instructions for building the ark.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 6,
  questions: [
    {
      id: 'gen6-q1',
      question: 'What happened when men began to multiply on the face of the earth?',
      type: 'multiple-choice',
      options: ['The sons of God saw the daughters of men that they were fair', 'They built great cities', 'They worshipped God', 'They stopped having children'],
      correctAnswer: 'The sons of God saw the daughters of men that they were fair',
      explanation: 'The sons of God saw the daughters of men that they were fair; and they took them wives.',
      verseReference: 'Genesis 6:2',
      difficulty: 'medium'
    },
    {
      id: 'gen6-q2',
      question: 'God said His Spirit would not always strive with man.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The LORD said, "My spirit shall not always strive with man."',
      verseReference: 'Genesis 6:3',
      difficulty: 'easy'
    },
    {
      id: 'gen6-q3',
      question: 'How many years did God give mankind?',
      type: 'multiple-choice',
      options: ['120 years', '100 years', '150 years', '70 years'],
      correctAnswer: '120 years',
      explanation: 'God said man\'s days shall be an hundred and twenty years.',
      verseReference: 'Genesis 6:3',
      difficulty: 'medium'
    },
    {
      id: 'gen6-q4',
      question: 'There were giants in the earth in those days.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'There were giants in the earth in those days.',
      verseReference: 'Genesis 6:4',
      difficulty: 'easy'
    },
    {
      id: 'gen6-q5',
      question: 'How did God view the wickedness of man?',
      type: 'multiple-choice',
      options: ['Every imagination of his heart was only evil continually', 'Some were good and some were evil', 'Most were righteous', 'They were improving'],
      correctAnswer: 'Every imagination of his heart was only evil continually',
      explanation: 'God saw that the wickedness of man was great, and every imagination of the thoughts of his heart was only evil continually.',
      verseReference: 'Genesis 6:5',
      difficulty: 'easy'
    },
    {
      id: 'gen6-q6',
      question: 'It repented the LORD that He had made man on the earth.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'It repented the LORD that he had made man on the earth, and it grieved him at his heart.',
      verseReference: 'Genesis 6:6',
      difficulty: 'easy'
    },
    {
      id: 'gen6-q7',
      question: 'What did God decide to do about mankind?',
      type: 'multiple-choice',
      options: ['Destroy man from the face of the earth', 'Give them another chance', 'Send prophets to warn them', 'Leave them alone'],
      correctAnswer: 'Destroy man from the face of the earth',
      explanation: 'The LORD said, "I will destroy man whom I have created from the face of the earth."',
      verseReference: 'Genesis 6:7',
      difficulty: 'easy'
    },
    {
      id: 'gen6-q8',
      question: 'Noah found grace in the eyes of the LORD.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'But Noah found grace in the eyes of the LORD.',
      verseReference: 'Genesis 6:8',
      difficulty: 'easy'
    },
    {
      id: 'gen6-q9',
      question: 'How was Noah described?',
      type: 'multiple-choice',
      options: ['A just man and perfect in his generations', 'A wealthy man', 'A mighty hunter', 'A powerful king'],
      correctAnswer: 'A just man and perfect in his generations',
      explanation: 'Noah was a just man and perfect in his generations, and Noah walked with God.',
      verseReference: 'Genesis 6:9',
      difficulty: 'medium'
    },
    {
      id: 'gen6-q10',
      question: 'The earth was corrupt and filled with violence.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The earth also was corrupt before God, and the earth was filled with violence.',
      verseReference: 'Genesis 6:11',
      difficulty: 'easy'
    },
    {
      id: 'gen6-q11',
      question: 'What material was the ark to be made from?',
      type: 'multiple-choice',
      options: ['Gopher wood', 'Cedar wood', 'Oak wood', 'Pine wood'],
      correctAnswer: 'Gopher wood',
      explanation: 'Make thee an ark of gopher wood.',
      verseReference: 'Genesis 6:14',
      difficulty: 'medium'
    },
    {
      id: 'gen6-q12',
      question: 'The ark was to be pitched within and without.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Make thee an ark of gopher wood; rooms shalt thou make in the ark, and shalt pitch it within and without with pitch.',
      verseReference: 'Genesis 6:14',
      difficulty: 'easy'
    },
    {
      id: 'gen6-q13',
      question: 'What were the dimensions of the ark in cubits?',
      type: 'multiple-choice',
      options: ['300 long, 50 wide, 30 high', '400 long, 60 wide, 40 high', '200 long, 40 wide, 20 high', '500 long, 80 wide, 50 high'],
      correctAnswer: '300 long, 50 wide, 30 high',
      explanation: 'The length of the ark shall be three hundred cubits, the breadth fifty cubits, and the height thirty cubits.',
      verseReference: 'Genesis 6:15',
      difficulty: 'hard'
    },
    {
      id: 'gen6-q14',
      question: 'How many stories was the ark to have?',
      type: 'multiple-choice',
      options: ['Three stories', 'Two stories', 'One story', 'Four stories'],
      correctAnswer: 'Three stories',
      explanation: 'With lower, second, and third stories shalt thou make it.',
      verseReference: 'Genesis 6:16',
      difficulty: 'medium'
    },
    {
      id: 'gen6-q15',
      question: 'God established His covenant with Noah.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'But with thee will I establish my covenant.',
      verseReference: 'Genesis 6:18',
      difficulty: 'easy'
    },
    {
      id: 'gen6-q16',
      question: 'How many of each kind of animal was Noah to bring?',
      type: 'multiple-choice',
      options: ['Two of every sort', 'Seven of every sort', 'One of every sort', 'Five of every sort'],
      correctAnswer: 'Two of every sort',
      explanation: 'Of every living thing of all flesh, two of every sort shalt thou bring into the ark.',
      verseReference: 'Genesis 6:19',
      difficulty: 'easy'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-6-quiz',
  tags: ['flood', 'noah', 'ark', 'genesis', 'old-testament', 'judgment', 'corruption'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Sample book quiz for Genesis
export const GENESIS_BOOK_QUIZ: Quiz = {
  id: 'genesis-book',
  title: 'Genesis Quiz',
  description: 'Comprehensive quiz covering the entire book of Genesis, from creation to the story of Joseph in Egypt. Test your knowledge of all 50 chapters.',
  type: 'book',
  book: 'Genesis',
  questions: [
    {
      id: 'gen-book-q1',
      question: 'Who was the first person to be born according to the Bible?',
      type: 'multiple-choice',
      options: ['Adam', 'Eve', 'Cain', 'Abel'],
      correctAnswer: 'Cain',
      explanation: 'Cain was the first person born to Adam and Eve, making him the first human birth recorded in the Bible.',
      verseReference: 'Genesis 4:1',
      difficulty: 'medium'
    },
    {
      id: 'gen-book-q2',
      question: 'Abraham was originally called Abram.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'God changed Abram\'s name to Abraham when He established His covenant with him.',
      verseReference: 'Genesis 17:5',
      difficulty: 'easy'
    },
    {
      id: 'gen-book-q3',
      question: 'How many sons did Jacob have?',
      type: 'multiple-choice',
      options: ['10', '11', '12', '13'],
      correctAnswer: '12',
      explanation: 'Jacob had twelve sons who became the heads of the twelve tribes of Israel.',
      verseReference: 'Genesis 35:22-26',
      difficulty: 'easy'
    },
    {
      id: 'gen-book-q4',
      question: 'What was the name of the place where Jacob wrestled with God?',
      type: 'fill-blank',
      correctAnswer: 'Peniel',
      explanation: 'Jacob called the place Peniel, saying "I have seen God face to face, and my life is preserved."',
      verseReference: 'Genesis 32:30',
      difficulty: 'hard'
    },
    {
      id: 'gen-book-q5',
      question: 'Joseph was sold into slavery by his brothers.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Joseph\'s brothers sold him to Ishmaelite traders who took him to Egypt, where he was sold as a slave.',
      verseReference: 'Genesis 37:28',
      difficulty: 'easy'
    }
    // Additional questions would be added here for a complete 25-question book quiz
  ],
  difficulty: 'medium',
  isBookQuiz: true,
  slug: 'genesis-quiz',
  tags: ['genesis', 'old-testament', 'patriarchs', 'creation', 'abraham', 'jacob', 'joseph'],
  totalQuestions: 5,
  estimatedTime: 3
};

// Function to get quiz by slug
export const getQuizBySlug = (slug: string): Quiz | undefined => {
  const quizzes = [GENESIS_1_QUIZ, GENESIS_3_QUIZ, GENESIS_4_QUIZ, GENESIS_5_QUIZ, GENESIS_6_QUIZ, GENESIS_BOOK_QUIZ];
  return quizzes.find(quiz => quiz.slug === slug);
};

// Function to get random questions by type distribution
export const generateMixedQuestions = (
  allQuestions: QuizQuestion[],
  totalCount: number
): QuizQuestion[] => {
  const multipleChoiceCount = Math.floor(totalCount * 0.7); // 70%
  const trueFalseCount = Math.floor(totalCount * 0.2); // 20%
  const fillBlankCount = totalCount - multipleChoiceCount - trueFalseCount; // 10%

  const mcQuestions = allQuestions.filter(q => q.type === 'multiple-choice').slice(0, multipleChoiceCount);
  const tfQuestions = allQuestions.filter(q => q.type === 'true-false').slice(0, trueFalseCount);
  const fbQuestions = allQuestions.filter(q => q.type === 'fill-blank').slice(0, fillBlankCount);

  return [...mcQuestions, ...tfQuestions, ...fbQuestions];
};

// Function to calculate quiz statistics
export const calculateQuizStats = (totalQuestions: number) => {
  const estimatedTime = Math.ceil(totalQuestions * 0.5); // ~30 seconds per question
  const difficulty = totalQuestions <= 16 ? 'easy' : totalQuestions <= 20 ? 'medium' : 'hard';
  
  return {
    estimatedTime,
    difficulty
  };
};