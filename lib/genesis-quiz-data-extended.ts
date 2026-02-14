import { Quiz, QuizQuestion } from './types';

// Genesis Chapter 7 Quiz - The Great Flood
export const GENESIS_7_QUIZ: Quiz = {
  id: 'genesis-7',
  title: 'Genesis Chapter 7 Quiz',
  description: 'Test your knowledge of Genesis chapter 7, covering the beginning of the great flood, Noah entering the ark, and the destruction of all life on earth.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 7,
  questions: [
    {
      id: 'gen7-q1',
      question: 'How many days notice did Noah have before the flood began?',
      type: 'multiple-choice',
      options: ['7 days', '10 days', '14 days', '30 days'],
      correctAnswer: '7 days',
      explanation: 'God told Noah to enter the ark because in seven days He would cause it to rain upon the earth.',
      verseReference: 'Genesis 7:4',
      difficulty: 'medium'
    },
    {
      id: 'gen7-q2',
      question: 'Noah was 600 years old when the flood came upon the earth.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'In the six hundredth year of Noah\'s life, the fountains of the great deep were broken up.',
      verseReference: 'Genesis 7:6, 11',
      difficulty: 'easy'
    },
    {
      id: 'gen7-q3',
      question: 'How long did it rain during the flood?',
      type: 'multiple-choice',
      options: ['40 days and 40 nights', '30 days and 30 nights', '50 days and 50 nights', '60 days and 60 nights'],
      correctAnswer: '40 days and 40 nights',
      explanation: 'The rain was upon the earth forty days and forty nights.',
      verseReference: 'Genesis 7:12',
      difficulty: 'easy'
    },
    {
      id: 'gen7-q4',
      question: 'What caused the flood waters to come upon the earth?',
      type: 'multiple-choice',
      options: ['Fountains of the deep and windows of heaven', 'Only heavy rain', 'Melting ice', 'River overflows'],
      correctAnswer: 'Fountains of the deep and windows of heaven',
      explanation: 'The fountains of the great deep were broken up, and the windows of heaven were opened.',
      verseReference: 'Genesis 7:11',
      difficulty: 'medium'
    },
    {
      id: 'gen7-q5',
      question: 'Complete this phrase: "And every living substance was ______ which was upon the face of the ground."',
      type: 'multiple-choice',
      options: ['destroyed', 'saved', 'moved', 'changed'],
      correctAnswer: 'destroyed',
      explanation: 'Every living substance was destroyed from the face of the earth, both man and cattle.',
      verseReference: 'Genesis 7:23',
      difficulty: 'easy'
    },
    {
      id: 'gen7-q6',
      question: 'God shut Noah into the ark.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'After Noah and his family entered the ark, the Lord shut him in.',
      verseReference: 'Genesis 7:16',
      difficulty: 'easy'
    },
    {
      id: 'gen7-q7',
      question: 'How high did the flood waters rise above the mountains?',
      type: 'multiple-choice',
      options: ['15 cubits', '20 cubits', '10 cubits', '25 cubits'],
      correctAnswer: '15 cubits',
      explanation: 'Fifteen cubits upward did the waters prevail, and the mountains were covered.',
      verseReference: 'Genesis 7:20',
      difficulty: 'hard'
    },
    {
      id: 'gen7-q8',
      question: 'Who entered the ark with Noah?',
      type: 'multiple-choice',
      options: ['His wife, his three sons, and their wives', 'Only his immediate family', 'His extended family and servants', 'Just his wife and sons'],
      correctAnswer: 'His wife, his three sons, and their wives',
      explanation: 'Noah, his wife, his three sons Shem, Ham, and Japheth, and their three wives entered the ark.',
      verseReference: 'Genesis 7:13',
      difficulty: 'easy'
    },
    {
      id: 'gen7-q9',
      question: 'Complete this phrase: "Of fowls after their kind, and of cattle after their kind, of every ______ thing of the earth after his kind."',
      type: 'multiple-choice',
      options: ['creeping', 'living', 'moving', 'breathing'],
      correctAnswer: 'creeping',
      explanation: 'This describes the comprehensive nature of the animals that entered the ark according to their kinds.',
      verseReference: 'Genesis 7:14',
      difficulty: 'medium'
    },
    {
      id: 'gen7-q10',
      question: 'All the high hills under the whole heaven were covered by the flood.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The waters prevailed exceedingly and all the high hills under the whole heaven were covered.',
      verseReference: 'Genesis 7:19',
      difficulty: 'easy'
    },
    {
      id: 'gen7-q11',
      question: 'What happened to all flesh that moved upon the earth?',
      type: 'multiple-choice',
      options: ['They died', 'They were transformed', 'They migrated to high places', 'They adapted to water'],
      correctAnswer: 'They died',
      explanation: 'All flesh died that moved upon the earth - fowl, cattle, beast, and every man.',
      verseReference: 'Genesis 7:21',
      difficulty: 'easy'
    },
    {
      id: 'gen7-q12',
      question: 'The animals entered the ark two by two as God commanded.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'There went in two and two unto Noah into the ark, the male and female, as God had commanded.',
      verseReference: 'Genesis 7:9',
      difficulty: 'easy'
    },
    {
      id: 'gen7-q13',
      question: 'How many people were saved in the ark?',
      type: 'multiple-choice',
      options: ['8 people', '10 people', '12 people', '6 people'],
      correctAnswer: '8 people',
      explanation: 'Noah, his wife, his three sons, and their wives - a total of 8 people were saved.',
      verseReference: 'Genesis 7:13',
      difficulty: 'medium'
    },
    {
      id: 'gen7-q14',
      question: 'In what month did the flood begin?',
      type: 'fill-blank',
      correctAnswer: 'second',
      explanation: 'In the second month, on the seventeenth day of the month, the fountains of the great deep were broken up.',
      verseReference: 'Genesis 7:11',
      difficulty: 'hard'
    },
    {
      id: 'gen7-q15',
      question: 'What was the result for every living thing that had the breath of life?',
      type: 'fill-blank',
      correctAnswer: 'died',
      explanation: 'All in whose nostrils was the breath of life, of all that was in the dry land, died.',
      verseReference: 'Genesis 7:22',
      difficulty: 'medium'
    },
    {
      id: 'gen7-q16',
      question: 'How does Genesis 7 describe the extent of the flood?',
      type: 'multiple-choice',
      options: ['It covered the whole earth', 'It was limited to one region', 'It affected only populated areas', 'It was primarily coastal flooding'],
      correctAnswer: 'It covered the whole earth',
      explanation: 'The text describes the flood as covering all the high hills under the whole heaven and destroying all life on earth.',
      verseReference: 'Genesis 7:19-23',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-7-quiz',
  tags: ['flood', 'noah', 'ark', 'judgment', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 8 Quiz - After the Flood
export const GENESIS_8_QUIZ: Quiz = {
  id: 'genesis-8',
  title: 'Genesis Chapter 8 Quiz',
  description: 'Test your knowledge of Genesis chapter 8, covering the end of the flood, Noah\'s release from the ark, and the first sacrifice after the flood.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 8,
  questions: [
    {
      id: 'gen8-q1',
      question: 'How did God cause the flood waters to recede?',
      type: 'multiple-choice',
      options: ['He made a wind to pass over the earth', 'He opened tunnels in the earth', 'He caused the sun to evaporate it', 'He commanded the mountains to rise'],
      correctAnswer: 'He made a wind to pass over the earth',
      explanation: 'God made a wind to pass over the earth, and the waters assuaged.',
      verseReference: 'Genesis 8:1',
      difficulty: 'medium'
    },
    {
      id: 'gen8-q2',
      question: 'The fountains of the deep and windows of heaven were stopped.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The fountains of the deep and the windows of heaven were stopped, and the rain was restrained.',
      verseReference: 'Genesis 8:2',
      difficulty: 'easy'
    },
    {
      id: 'gen8-q3',
      question: 'On which mountain did the ark come to rest?',
      type: 'multiple-choice',
      options: ['Mountains of Ararat', 'Mount Sinai', 'Mount Moriah', 'Mount Carmel'],
      correctAnswer: 'Mountains of Ararat',
      explanation: 'The ark rested upon the mountains of Ararat in the seventh month.',
      verseReference: 'Genesis 8:4',
      difficulty: 'easy'
    },
    {
      id: 'gen8-q4',
      question: 'When were the tops of the mountains first seen?',
      type: 'multiple-choice',
      options: ['The tenth month', 'The eighth month', 'The ninth month', 'The eleventh month'],
      correctAnswer: 'The tenth month',
      explanation: 'In the tenth month, on the first day of the month, were the tops of the mountains seen.',
      verseReference: 'Genesis 8:5',
      difficulty: 'medium'
    },
    {
      id: 'gen8-q5',
      question: 'What was the first bird Noah sent out from the ark?',
      type: 'multiple-choice',
      options: ['A raven', 'A dove', 'An eagle', 'A hawk'],
      correctAnswer: 'A raven',
      explanation: 'Noah first sent forth a raven, which went forth to and fro until the waters dried up.',
      verseReference: 'Genesis 8:7',
      difficulty: 'easy'
    },
    {
      id: 'gen8-q6',
      question: 'The dove returned to Noah the first time because it found no rest.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The dove found no rest for the sole of her foot and returned to the ark.',
      verseReference: 'Genesis 8:9',
      difficulty: 'easy'
    },
    {
      id: 'gen8-q7',
      question: 'What did the dove bring back the second time?',
      type: 'multiple-choice',
      options: ['An olive leaf', 'A fig leaf', 'A grape vine', 'A flower'],
      correctAnswer: 'An olive leaf',
      explanation: 'The dove came back with an olive leaf plucked off, showing that the waters had abated.',
      verseReference: 'Genesis 8:11',
      difficulty: 'easy'
    },
    {
      id: 'gen8-q8',
      question: 'How long did Noah wait between sending out the dove the second and third times?',
      type: 'multiple-choice',
      options: ['7 days', '10 days', '14 days', '5 days'],
      correctAnswer: '7 days',
      explanation: 'Noah waited another seven days and sent forth the dove again, which did not return.',
      verseReference: 'Genesis 8:12',
      difficulty: 'medium'
    },
    {
      id: 'gen8-q9',
      question: 'Complete this phrase: "And Noah removed the covering of the ark, and looked, and, behold, the face of the ground was ______."',
      type: 'multiple-choice',
      options: ['dry', 'wet', 'muddy', 'covered'],
      correctAnswer: 'dry',
      explanation: 'When Noah removed the covering, he saw that the face of the ground was dry.',
      verseReference: 'Genesis 8:13',
      difficulty: 'easy'
    },
    {
      id: 'gen8-q10',
      question: 'God told Noah to leave the ark exactly one year after the flood began.',
      type: 'true-false',
      correctAnswer: 'false',
      explanation: 'The timeline was more complex - Noah entered in his 600th year and left in his 601st year, but it wasn\'t exactly one year.',
      verseReference: 'Genesis 8:13-14',
      difficulty: 'hard'
    },
    {
      id: 'gen8-q11',
      question: 'What was the first thing Noah did after leaving the ark?',
      type: 'multiple-choice',
      options: ['Built an altar and offered sacrifices', 'Planted a garden', 'Built a house', 'Gathered his family'],
      correctAnswer: 'Built an altar and offered sacrifices',
      explanation: 'Noah built an altar unto the Lord and offered burnt offerings of every clean beast and fowl.',
      verseReference: 'Genesis 8:20',
      difficulty: 'easy'
    },
    {
      id: 'gen8-q12',
      question: 'God was pleased with Noah\'s sacrifice.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The Lord smelled a sweet savor and was pleased with Noah\'s offering.',
      verseReference: 'Genesis 8:21',
      difficulty: 'easy'
    },
    {
      id: 'gen8-q13',
      question: 'What promise did God make after smelling Noah\'s sacrifice?',
      type: 'multiple-choice',
      options: ['Never again to curse the ground for man\'s sake', 'To make Noah rich', 'To give Noah a long life', 'To make Noah king'],
      correctAnswer: 'Never again to curse the ground for man\'s sake',
      explanation: 'God promised not to curse the ground again for man\'s sake, nor destroy every living thing as He had done.',
      verseReference: 'Genesis 8:21',
      difficulty: 'medium'
    },
    {
      id: 'gen8-q14',
      question: 'How many days total was Noah in the ark?',
      type: 'fill-blank',
      correctAnswer: '371',
      explanation: 'From entering the ark to leaving it, Noah was in the ark for approximately 371 days (over a year).',
      verseReference: 'Genesis 7:11, 8:14',
      difficulty: 'hard'
    },
    {
      id: 'gen8-q15',
      question: 'What did God promise about the cycles of nature?',
      type: 'fill-blank',
      correctAnswer: 'seedtime and harvest',
      explanation: 'God promised that while the earth remains, seedtime and harvest, cold and heat, summer and winter, day and night shall not cease.',
      verseReference: 'Genesis 8:22',
      difficulty: 'medium'
    },
    {
      id: 'gen8-q16',
      question: 'What does Genesis 8 reveal about God\'s attitude toward human nature?',
      type: 'multiple-choice',
      options: ['The imagination of man\'s heart is evil from his youth', 'Humans had become perfectly good', 'People would never sin again', 'Mankind was now without fault'],
      correctAnswer: 'The imagination of man\'s heart is evil from his youth',
      explanation: 'God acknowledged that the imagination of man\'s heart is evil from his youth, showing His understanding of human nature.',
      verseReference: 'Genesis 8:21',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-8-quiz',
  tags: ['flood', 'noah', 'ark', 'dove', 'sacrifice', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 9 Quiz - God's Covenant with Noah  
export const GENESIS_9_QUIZ: Quiz = {
  id: 'genesis-9',
  title: 'Genesis Chapter 9 Quiz',
  description: 'Test your knowledge of Genesis chapter 9, covering God\'s covenant with Noah, the rainbow sign, and the incident with Noah\'s drunkenness.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 9,
  questions: [
    {
      id: 'gen9-q1',
      question: 'What blessing did God give Noah and his sons after the flood?',
      type: 'multiple-choice',
      options: ['Be fruitful and multiply and replenish the earth', 'Live forever on the earth', 'Rule over all nations', 'Become wealthy beyond measure'],
      correctAnswer: 'Be fruitful and multiply and replenish the earth',
      explanation: 'God blessed Noah and his sons with the same blessing given to Adam - to be fruitful, multiply, and replenish the earth.',
      verseReference: 'Genesis 9:1',
      difficulty: 'easy'
    },
    {
      id: 'gen9-q2',
      question: 'Animals would now have fear and dread of mankind.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The fear and dread of man would be upon every beast, fowl, and fish - they were delivered into man\'s hand.',
      verseReference: 'Genesis 9:2',
      difficulty: 'easy'
    },
    {
      id: 'gen9-q3',
      question: 'What new permission did God give regarding food?',
      type: 'multiple-choice',
      options: ['Every moving thing that lives shall be meat for you', 'You may eat only fruits and vegetables', 'You may hunt only certain animals', 'You must fast one day each week'],
      correctAnswer: 'Every moving thing that lives shall be meat for you',
      explanation: 'God gave permission to eat meat for the first time, saying every moving thing that lives shall be food.',
      verseReference: 'Genesis 9:3',
      difficulty: 'medium'
    },
    {
      id: 'gen9-q4',
      question: 'What restriction did God place on eating meat?',
      type: 'multiple-choice',
      options: ['Do not eat flesh with the life (blood) still in it', 'Only eat it on certain days', 'Only eat animals that are white', 'Do not eat it raw'],
      correctAnswer: 'Do not eat flesh with the life (blood) still in it',
      explanation: 'God prohibited eating flesh with its life, which is the blood, still in it.',
      verseReference: 'Genesis 9:4',
      difficulty: 'medium'
    },
    {
      id: 'gen9-q5',
      question: 'Complete this commandment: "Whoso sheddeth man\'s blood, by man shall his ______ be shed."',
      type: 'multiple-choice',
      options: ['blood', 'life', 'honor', 'possessions'],
      correctAnswer: 'blood',
      explanation: 'This establishes the principle of capital punishment for murder - life for life.',
      verseReference: 'Genesis 9:6',
      difficulty: 'easy'
    },
    {
      id: 'gen9-q6',
      question: 'The reason for capital punishment is that man is made in God\'s image.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The text states that whoever sheds man\'s blood shall have his blood shed, for in the image of God made He man.',
      verseReference: 'Genesis 9:6',
      difficulty: 'medium'
    },
    {
      id: 'gen9-q7',
      question: 'What sign did God give of His covenant with Noah?',
      type: 'multiple-choice',
      options: ['The rainbow', 'A dove', 'An olive tree', 'The sun'],
      correctAnswer: 'The rainbow',
      explanation: 'God set His bow (rainbow) in the cloud as a token of the covenant between Him and the earth.',
      verseReference: 'Genesis 9:13',
      difficulty: 'easy'
    },
    {
      id: 'gen9-q8',
      question: 'What did God promise would never happen again?',
      type: 'multiple-choice',
      options: ['A flood to destroy all flesh', 'Earthquakes', 'Famines', 'Wars'],
      correctAnswer: 'A flood to destroy all flesh',
      explanation: 'God promised that never again would all flesh be cut off by flood waters, nor would there be a flood to destroy the earth.',
      verseReference: 'Genesis 9:11',
      difficulty: 'easy'
    },
    {
      id: 'gen9-q9',
      question: 'Complete this phrase: "And it shall come to pass, when I bring a cloud over the earth, that the ______ shall be seen in the cloud."',
      type: 'multiple-choice',
      options: ['bow', 'light', 'dove', 'sign'],
      correctAnswer: 'bow',
      explanation: 'God said when He brings clouds over the earth, the bow (rainbow) would be seen as a reminder of His covenant.',
      verseReference: 'Genesis 9:14',
      difficulty: 'easy'
    },
    {
      id: 'gen9-q10',
      question: 'The covenant with Noah was made with him alone.',
      type: 'true-false',
      correctAnswer: 'false',
      explanation: 'The covenant was established with Noah, his descendants, and every living creature that was with him.',
      verseReference: 'Genesis 9:9-10',
      difficulty: 'medium'
    },
    {
      id: 'gen9-q11',
      question: 'What did Noah do after the flood that led to his drunkenness?',
      type: 'multiple-choice',
      options: ['He planted a vineyard', 'He found fermented fruit', 'He discovered wine in a cave', 'He traded with merchants'],
      correctAnswer: 'He planted a vineyard',
      explanation: 'Noah became a farmer and planted a vineyard, drank of the wine, and became drunk.',
      verseReference: 'Genesis 9:20-21',
      difficulty: 'medium'
    },
    {
      id: 'gen9-q12',
      question: 'Ham saw his father\'s nakedness and told his brothers.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Ham saw the nakedness of his father and told his two brothers outside.',
      verseReference: 'Genesis 9:22',
      difficulty: 'easy'
    },
    {
      id: 'gen9-q13',
      question: 'How did Shem and Japheth respond to their father\'s condition?',
      type: 'multiple-choice',
      options: ['They covered him without looking', 'They laughed at him', 'They ignored the situation', 'They scolded him'],
      correctAnswer: 'They covered him without looking',
      explanation: 'Shem and Japheth took a garment, walked backward, and covered their father without seeing his nakedness.',
      verseReference: 'Genesis 9:23',
      difficulty: 'medium'
    },
    {
      id: 'gen9-q14',
      question: 'Who did Noah curse when he awoke?',
      type: 'fill-blank',
      correctAnswer: 'Canaan',
      explanation: 'Noah cursed Canaan, Ham\'s son, saying "Cursed be Canaan; a servant of servants shall he be."',
      verseReference: 'Genesis 9:25',
      difficulty: 'medium'
    },
    {
      id: 'gen9-q15',
      question: 'How old was Noah when he died?',
      type: 'fill-blank',
      correctAnswer: '950',
      explanation: 'Noah lived 950 years total - 350 years after the flood.',
      verseReference: 'Genesis 9:29',
      difficulty: 'hard'
    },
    {
      id: 'gen9-q16',
      question: 'What blessing did Noah pronounce on Shem?',
      type: 'multiple-choice',
      options: ['Blessed be the Lord God of Shem', 'Shem shall be the greatest', 'Shem shall rule the earth', 'Shem shall live forever'],
      correctAnswer: 'Blessed be the Lord God of Shem',
      explanation: 'Noah blessed Shem by saying "Blessed be the Lord God of Shem," linking him to the covenant line.',
      verseReference: 'Genesis 9:26',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-9-quiz',
  tags: ['covenant', 'rainbow', 'noah', 'ham-shem-japheth', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 11 Quiz - Tower of Babel
export const GENESIS_11_QUIZ: Quiz = {
  id: 'genesis-11',
  title: 'Genesis Chapter 11 Quiz',
  description: 'Test your knowledge of Genesis chapter 11, covering the Tower of Babel, the confusion of languages, and the genealogy from Shem to Abram.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 11,
  questions: [
    {
      id: 'gen11-q1',
      question: 'What was the condition of language on earth before Babel?',
      type: 'multiple-choice',
      options: ['The whole earth had one language and one speech', 'There were many different languages', 'People communicated through gestures', 'Each family had their own language'],
      correctAnswer: 'The whole earth had one language and one speech',
      explanation: 'The whole earth was of one language and of one speech before God confused the languages at Babel.',
      verseReference: 'Genesis 11:1',
      difficulty: 'easy'
    },
    {
      id: 'gen11-q2',
      question: 'The people settled in the land of Shinar.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'As they journeyed from the east, they found a plain in the land of Shinar and dwelt there.',
      verseReference: 'Genesis 11:2',
      difficulty: 'easy'
    },
    {
      id: 'gen11-q3',
      question: 'What materials did the people use to build their tower?',
      type: 'multiple-choice',
      options: ['Brick for stone and slime for mortar', 'Stone and clay', 'Wood and metal', 'Clay and straw'],
      correctAnswer: 'Brick for stone and slime for mortar',
      explanation: 'They said "let us make brick and burn them thoroughly" and used slime (bitumen) for mortar.',
      verseReference: 'Genesis 11:3',
      difficulty: 'medium'
    },
    {
      id: 'gen11-q4',
      question: 'What was the people\'s stated goal for their tower?',
      type: 'multiple-choice',
      options: ['To reach unto heaven and make a name for themselves', 'To worship God properly', 'To protect against floods', 'To store grain'],
      correctAnswer: 'To reach unto heaven and make a name for themselves',
      explanation: 'They wanted to build a tower whose top may reach unto heaven and make themselves a name.',
      verseReference: 'Genesis 11:4',
      difficulty: 'easy'
    },
    {
      id: 'gen11-q5',
      question: 'Complete this phrase: "Let us build us a city and a tower, whose top may reach unto heaven; and let us make us a ______, lest we be scattered abroad."',
      type: 'multiple-choice',
      options: ['name', 'kingdom', 'fortress', 'temple'],
      correctAnswer: 'name',
      explanation: 'They wanted to make themselves a name and avoid being scattered across the earth.',
      verseReference: 'Genesis 11:4',
      difficulty: 'easy'
    },
    {
      id: 'gen11-q6',
      question: 'God came down to see the city and tower.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The Lord came down to see the city and the tower which the children of men built.',
      verseReference: 'Genesis 11:5',
      difficulty: 'easy'
    },
    {
      id: 'gen11-q7',
      question: 'What was God\'s concern about the people\'s unity?',
      type: 'multiple-choice',
      options: ['Nothing would be restrained from them that they imagine to do', 'They would become too powerful', 'They would forget Him', 'They would start wars'],
      correctAnswer: 'Nothing would be restrained from them that they imagine to do',
      explanation: 'God said that as one people with one language, nothing would be restrained from them that they imagine to do.',
      verseReference: 'Genesis 11:6',
      difficulty: 'medium'
    },
    {
      id: 'gen11-q8',
      question: 'How did God stop the building of the tower?',
      type: 'multiple-choice',
      options: ['He confounded their language', 'He sent a great wind', 'He caused an earthquake', 'He sent wild beasts'],
      correctAnswer: 'He confounded their language',
      explanation: 'God confounded their language so they could not understand one another\'s speech.',
      verseReference: 'Genesis 11:7',
      difficulty: 'easy'
    },
    {
      id: 'gen11-q9',
      question: 'Complete this phrase: "Therefore is the name of it called ______, because the Lord did there confound the language of all the earth."',
      type: 'multiple-choice',
      options: ['Babel', 'Shinar', 'Confusion', 'Scatter'],
      correctAnswer: 'Babel',
      explanation: 'The name Babel means confusion, commemorating God\'s confounding of the languages there.',
      verseReference: 'Genesis 11:9',
      difficulty: 'easy'
    },
    {
      id: 'gen11-q10',
      question: 'God scattered the people from Babel across the face of all the earth.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The Lord scattered them abroad from there upon the face of all the earth.',
      verseReference: 'Genesis 11:8',
      difficulty: 'easy'
    },
    {
      id: 'gen11-q11',
      question: 'How old was Shem when he became the father of Arphaxad after the flood?',
      type: 'multiple-choice',
      options: ['100 years old', '150 years old', '200 years old', '75 years old'],
      correctAnswer: '100 years old',
      explanation: 'Shem was 100 years old when he became the father of Arphaxad, two years after the flood.',
      verseReference: 'Genesis 11:10',
      difficulty: 'medium'
    },
    {
      id: 'gen11-q12',
      question: 'The genealogy in Genesis 11 traces the line from Shem to Abram.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The chapter provides the genealogical line from Shem through to Terah and his son Abram.',
      verseReference: 'Genesis 11:10-26',
      difficulty: 'easy'
    },
    {
      id: 'gen11-q13',
      question: 'Who was Abram\'s father?',
      type: 'multiple-choice',
      options: ['Terah', 'Nahor', 'Serug', 'Peleg'],
      correctAnswer: 'Terah',
      explanation: 'Terah was the father of Abram, Nahor, and Haran.',
      verseReference: 'Genesis 11:26',
      difficulty: 'easy'
    },
    {
      id: 'gen11-q14',
      question: 'What was the name of Abram\'s wife?',
      type: 'fill-blank',
      correctAnswer: 'Sarai',
      explanation: 'Abram\'s wife was named Sarai, and she was barren with no children.',
      verseReference: 'Genesis 11:29',
      difficulty: 'medium'
    },
    {
      id: 'gen11-q15',
      question: 'Where did Terah take his family when they left Ur?',
      type: 'fill-blank',
      correctAnswer: 'Haran',
      explanation: 'Terah took Abram, Sarai, and Lot and went from Ur of the Chaldees to go to Canaan, but they came to Haran and dwelt there.',
      verseReference: 'Genesis 11:31',
      difficulty: 'medium'
    },
    {
      id: 'gen11-q16',
      question: 'How old was Terah when he died in Haran?',
      type: 'multiple-choice',
      options: ['205 years', '175 years', '200 years', '180 years'],
      correctAnswer: '205 years',
      explanation: 'Terah lived 205 years and died in Haran.',
      verseReference: 'Genesis 11:32',
      difficulty: 'hard'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-11-quiz',
  tags: ['tower-of-babel', 'languages', 'confusion', 'genealogy', 'abram', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 12 Quiz - The Call of Abram
export const GENESIS_12_QUIZ: Quiz = {
  id: 'genesis-12',
  title: 'Genesis Chapter 12 Quiz', 
  description: 'Test your knowledge of Genesis chapter 12, covering God\'s call to Abram, the promises given to him, and his journey to Canaan and Egypt.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 12,
  questions: [
    {
      id: 'gen12-q1',
      question: 'What did God tell Abram to leave behind?',
      type: 'multiple-choice',
      options: ['His country, kindred, and father\'s house', 'Only his possessions', 'His servants and livestock', 'His old way of life'],
      correctAnswer: 'His country, kindred, and father\'s house',
      explanation: 'God told Abram to leave his country, his kindred, and his father\'s house.',
      verseReference: 'Genesis 12:1',
      difficulty: 'easy'
    },
    {
      id: 'gen12-q2',
      question: 'God promised to make Abram a great nation.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'God promised "I will make of thee a great nation" as part of His covenant with Abram.',
      verseReference: 'Genesis 12:2',
      difficulty: 'easy'
    },
    {
      id: 'gen12-q3',
      question: 'How old was Abram when he departed from Haran?',
      type: 'multiple-choice',
      options: ['75 years old', '70 years old', '80 years old', '65 years old'],
      correctAnswer: '75 years old',
      explanation: 'Abram was seventy-five years old when he departed out of Haran.',
      verseReference: 'Genesis 12:4',
      difficulty: 'medium'
    },
    {
      id: 'gen12-q4',
      question: 'Complete God\'s promise: "And I will bless them that bless thee, and curse him that ______ thee."',
      type: 'multiple-choice',
      options: ['curseth', 'hates', 'opposes', 'fights'],
      correctAnswer: 'curseth',
      explanation: 'God promised to bless those who bless Abram and curse those who curse him.',
      verseReference: 'Genesis 12:3',
      difficulty: 'easy'
    },
    {
      id: 'gen12-q5',
      question: 'Who accompanied Abram when he left Haran?',
      type: 'multiple-choice',
      options: ['Sarai his wife and Lot his nephew', 'Only Sarai his wife', 'His entire extended family', 'Just his servants'],
      correctAnswer: 'Sarai his wife and Lot his nephew',
      explanation: 'Abram took Sarai his wife, Lot his brother\'s son, and all their possessions and people.',
      verseReference: 'Genesis 12:5',
      difficulty: 'easy'
    },
    {
      id: 'gen12-q6',
      question: 'The Canaanites were in the land when Abram arrived.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The text specifically notes that "the Canaanite was then in the land."',
      verseReference: 'Genesis 12:6',
      difficulty: 'easy'
    },
    {
      id: 'gen12-q7',
      question: 'Where did God first appear to Abram in Canaan?',
      type: 'multiple-choice',
      options: ['Sichem, at the plain of Moreh', 'Bethel', 'Hebron', 'Jerusalem'],
      correctAnswer: 'Sichem, at the plain of Moreh',
      explanation: 'The Lord appeared unto Abram at Sichem, unto the plain of Moreh.',
      verseReference: 'Genesis 12:6-7',
      difficulty: 'medium'
    },
    {
      id: 'gen12-q8',
      question: 'What did Abram build after God appeared to him?',
      type: 'multiple-choice',
      options: ['An altar unto the Lord', 'A house for his family', 'A well for water', 'A city'],
      correctAnswer: 'An altar unto the Lord',
      explanation: 'Abram built an altar unto the Lord, who appeared unto him.',
      verseReference: 'Genesis 12:7',
      difficulty: 'easy'
    },
    {
      id: 'gen12-q9',
      question: 'Complete this phrase: "And in thee shall all families of the ______ be blessed."',
      type: 'multiple-choice',
      options: ['earth', 'land', 'nation', 'world'],
      correctAnswer: 'earth',
      explanation: 'This messianic promise declares that all families of the earth would be blessed through Abram.',
      verseReference: 'Genesis 12:3',
      difficulty: 'easy'
    },
    {
      id: 'gen12-q10',
      question: 'Abram called upon the name of the Lord at Bethel.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'At Bethel, Abram built an altar and called upon the name of the Lord.',
      verseReference: 'Genesis 12:8',
      difficulty: 'easy'
    },
    {
      id: 'gen12-q11',
      question: 'What caused Abram to go down to Egypt?',
      type: 'multiple-choice',
      options: ['A famine in the land', 'God\'s direct command', 'War in Canaan', 'Trade opportunities'],
      correctAnswer: 'A famine in the land',
      explanation: 'There was a famine in the land, and it was grievous, so Abram went down to Egypt.',
      verseReference: 'Genesis 12:10',
      difficulty: 'easy'
    },
    {
      id: 'gen12-q12',
      question: 'Abram told Sarai to say she was his sister.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Abram asked Sarai to say she was his sister because he feared they would kill him for her beauty.',
      verseReference: 'Genesis 12:13',
      difficulty: 'easy'
    },
    {
      id: 'gen12-q13',
      question: 'What happened to Pharaoh\'s house because of Sarai?',
      type: 'multiple-choice',
      options: ['God plagued Pharaoh and his house', 'They became very wealthy', 'They were blessed abundantly', 'Nothing unusual happened'],
      correctAnswer: 'God plagued Pharaoh and his house',
      explanation: 'The Lord plagued Pharaoh and his house with great plagues because of Sarai.',
      verseReference: 'Genesis 12:17',
      difficulty: 'medium'
    },
    {
      id: 'gen12-q14',
      question: 'What did Pharaoh give Abram because of Sarai?',
      type: 'fill-blank',
      correctAnswer: 'livestock',
      explanation: 'Pharaoh entreated Abram well for her sake, giving him sheep, oxen, cattle, camels, and servants.',
      verseReference: 'Genesis 12:16',
      difficulty: 'medium'
    },
    {
      id: 'gen12-q15',
      question: 'How did Pharaoh respond when he learned the truth about Sarai?',
      type: 'fill-blank',
      correctAnswer: 'sent them away',
      explanation: 'Pharaoh called Abram, rebuked him for the deception, and sent him away with his wife and all his possessions.',
      verseReference: 'Genesis 12:18-20',
      difficulty: 'medium'
    },
    {
      id: 'gen12-q16',
      question: 'What was the ultimate promise God made about the land to Abram?',
      type: 'multiple-choice',
      options: ['To give it to his seed', 'To make him king over it', 'To make it the most fertile land', 'To protect it from enemies'],
      correctAnswer: 'To give it to his seed',
      explanation: 'God promised "Unto thy seed will I give this land" when He appeared to Abram.',
      verseReference: 'Genesis 12:7',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-12-quiz',
  tags: ['abraham', 'calling', 'covenant', 'canaan', 'egypt', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 10 Quiz - Nations and Genealogies
export const GENESIS_10_QUIZ: Quiz = {
  id: 'genesis-10',
  title: 'Genesis Chapter 10 Quiz',
  description: 'Test your knowledge of Genesis chapter 10, covering the table of nations, the descendants of Noah\'s sons, and the spread of humanity after the flood.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 10,
  questions: [
    {
      id: 'gen10-q1',
      question: 'What are the names of Noah\'s three sons?',
      type: 'multiple-choice',
      options: ['Shem, Ham, and Japheth', 'Abraham, Isaac, and Jacob', 'Cain, Abel, and Seth', 'Adam, Enoch, and Noah'],
      correctAnswer: 'Shem, Ham, and Japheth',
      explanation: 'These are the generations of the sons of Noah: Shem, Ham, and Japheth.',
      verseReference: 'Genesis 10:1',
      difficulty: 'easy'
    },
    {
      id: 'gen10-q2',
      question: 'Sons were born to Noah\'s sons after the flood.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Unto them were sons born after the flood, and these became the nations of the earth.',
      verseReference: 'Genesis 10:1',
      difficulty: 'easy'
    },
    {
      id: 'gen10-q3',
      question: 'Who was the mighty hunter before the Lord?',
      type: 'multiple-choice',
      options: ['Nimrod', 'Cush', 'Canaan', 'Mizraim'],
      correctAnswer: 'Nimrod',
      explanation: 'Nimrod was a mighty hunter before the Lord, and it became a saying "like Nimrod the mighty hunter before the Lord."',
      verseReference: 'Genesis 10:9',
      difficulty: 'easy'
    },
    {
      id: 'gen10-q4',
      question: 'What was the beginning of Nimrod\'s kingdom?',
      type: 'multiple-choice',
      options: ['Babel, Erech, Accad, and Calneh in Shinar', 'Egypt and Libya', 'Canaan and Syria', 'Assyria and Media'],
      correctAnswer: 'Babel, Erech, Accad, and Calneh in Shinar',
      explanation: 'The beginning of his kingdom was Babel, Erech, Accad, and Calneh, in the land of Shinar.',
      verseReference: 'Genesis 10:10',
      difficulty: 'medium'
    },
    {
      id: 'gen10-q5',
      question: 'Complete this phrase: "And Cush begat ______, he began to be a mighty one in the earth."',
      type: 'multiple-choice',
      options: ['Nimrod', 'Seba', 'Havilah', 'Sabtah'],
      correctAnswer: 'Nimrod',
      explanation: 'Cush became the father of Nimrod, who became a mighty one in the earth.',
      verseReference: 'Genesis 10:8',
      difficulty: 'easy'
    },
    {
      id: 'gen10-q6',
      question: 'The Philistines came from the descendants of Ham.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The Philistines came from Casluhim, who was a son of Mizraim (Egypt), who was a son of Ham.',
      verseReference: 'Genesis 10:14',
      difficulty: 'medium'
    },
    {
      id: 'gen10-q7',
      question: 'Who was the father of Canaan?',
      type: 'multiple-choice',
      options: ['Ham', 'Shem', 'Japheth', 'Noah'],
      correctAnswer: 'Ham',
      explanation: 'Ham was the father of Cush, Mizraim, Phut, and Canaan.',
      verseReference: 'Genesis 10:6',
      difficulty: 'easy'
    },
    {
      id: 'gen10-q8',
      question: 'Which brother is associated with the Semitic peoples?',
      type: 'multiple-choice',
      options: ['Shem', 'Ham', 'Japheth', 'All equally'],
      correctAnswer: 'Shem',
      explanation: 'Shem is the father of the Semitic peoples, including the Hebrews and Arabs.',
      verseReference: 'Genesis 10:21-31',
      difficulty: 'medium'
    },
    {
      id: 'gen10-q9',
      question: 'Complete this phrase: "By these were the isles of the Gentiles divided in their lands; every one after his ______, after their families, in their nations."',
      type: 'multiple-choice',
      options: ['tongue', 'custom', 'king', 'city'],
      correctAnswer: 'tongue',
      explanation: 'This describes how the descendants spread out according to their languages and families.',
      verseReference: 'Genesis 10:5',
      difficulty: 'medium'
    },
    {
      id: 'gen10-q10',
      question: 'Eber was one of the descendants of Shem.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Eber was descended from Shem through Arphaxad and Salah, and the Hebrews likely get their name from him.',
      verseReference: 'Genesis 10:24',
      difficulty: 'medium'
    },
    {
      id: 'gen10-q11',
      question: 'Who built Nineveh?',
      type: 'multiple-choice',
      options: ['Asshur', 'Nimrod', 'Cush', 'Shem'],
      correctAnswer: 'Asshur',
      explanation: 'Out of the land of Shinar went forth Asshur, and built Nineveh and other cities.',
      verseReference: 'Genesis 10:11',
      difficulty: 'hard'
    },
    {
      id: 'gen10-q12',
      question: 'The earth was divided in the days of Peleg.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Peleg was so named "for in his days was the earth divided" - likely referring to the division of languages at Babel.',
      verseReference: 'Genesis 10:25',
      difficulty: 'medium'
    },
    {
      id: 'gen10-q13',
      question: 'Which son of Noah is typically associated with European peoples?',
      type: 'multiple-choice',
      options: ['Japheth', 'Shem', 'Ham', 'All equally'],
      correctAnswer: 'Japheth',
      explanation: 'Japheth\'s descendants are generally associated with the peoples who settled in Europe and northern regions.',
      verseReference: 'Genesis 10:2-5',
      difficulty: 'medium'
    },
    {
      id: 'gen10-q14',
      question: 'What does the name "Peleg" mean?',
      type: 'fill-blank',
      correctAnswer: 'division',
      explanation: 'Peleg means "division" because in his days the earth was divided.',
      verseReference: 'Genesis 10:25',
      difficulty: 'hard'
    },
    {
      id: 'gen10-q15',
      question: 'Who was Eber\'s brother?',
      type: 'fill-blank',
      correctAnswer: 'Joktan',
      explanation: 'Eber had two sons: Peleg and Joktan, making Joktan his brother through their father Eber.',
      verseReference: 'Genesis 10:25',
      difficulty: 'hard'
    },
    {
      id: 'gen10-q16',
      question: 'Genesis 10 is known as what type of passage?',
      type: 'multiple-choice',
      options: ['The Table of Nations', 'The Tower of Babel', 'The Flood Account', 'The Creation Story'],
      correctAnswer: 'The Table of Nations',
      explanation: 'Genesis 10 is commonly called "The Table of Nations" because it lists the descendants of Noah and how the nations were formed.',
      verseReference: 'Genesis 10',
      difficulty: 'easy'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-10-quiz',
  tags: ['table-of-nations', 'nimrod', 'noah-sons', 'genealogy', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 13 Quiz - Abram and Lot Separate
export const GENESIS_13_QUIZ: Quiz = {
  id: 'genesis-13',
  title: 'Genesis Chapter 13 Quiz',
  description: 'Test your knowledge of Genesis chapter 13, covering Abram\'s return from Egypt, his separation from Lot, and God\'s renewal of His promises.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 13,
  questions: [
    {
      id: 'gen13-q1',
      question: 'Where did Abram go when he came up out of Egypt?',
      type: 'multiple-choice',
      options: ['Into the south (Negev)', 'To the north', 'To the east', 'To the west'],
      correctAnswer: 'Into the south (Negev)',
      explanation: 'Abram went up out of Egypt into the south, he and his wife and all that he had, and Lot with him.',
      verseReference: 'Genesis 13:1',
      difficulty: 'medium'
    },
    {
      id: 'gen13-q2',
      question: 'Abram was very rich in cattle, silver, and gold.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Abram was very rich in cattle, in silver, and in gold.',
      verseReference: 'Genesis 13:2',
      difficulty: 'easy'
    },
    {
      id: 'gen13-q3',
      question: 'Where did Abram pitch his tent when he returned to Canaan?',
      type: 'multiple-choice',
      options: ['Between Bethel and Hai', 'In Hebron', 'In Shechem', 'In Beersheba'],
      correctAnswer: 'Between Bethel and Hai',
      explanation: 'He went to the place where his tent had been at the beginning, between Bethel and Hai.',
      verseReference: 'Genesis 13:3',
      difficulty: 'medium'
    },
    {
      id: 'gen13-q4',
      question: 'What did Abram do at the altar he had built earlier?',
      type: 'multiple-choice',
      options: ['Called on the name of the Lord', 'Offered sacrifices', 'Prayed for rain', 'Blessed his family'],
      correctAnswer: 'Called on the name of the Lord',
      explanation: 'There Abram called on the name of the Lord at the altar which he had built.',
      verseReference: 'Genesis 13:4',
      difficulty: 'easy'
    },
    {
      id: 'gen13-q5',
      question: 'Complete this phrase: "And Lot also, which went with Abram, had flocks, and herds, and ______."',
      type: 'multiple-choice',
      options: ['tents', 'servants', 'gold', 'weapons'],
      correctAnswer: 'tents',
      explanation: 'Lot had flocks, herds, and tents, showing his own prosperity.',
      verseReference: 'Genesis 13:5',
      difficulty: 'easy'
    },
    {
      id: 'gen13-q6',
      question: 'The land was not able to bear both Abram and Lot together.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The land was not able to bear them, that they might dwell together, for their substance was great.',
      verseReference: 'Genesis 13:6',
      difficulty: 'easy'
    },
    {
      id: 'gen13-q7',
      question: 'What caused strife between Abram and Lot?',
      type: 'multiple-choice',
      options: ['Strife between their herdsmen', 'Religious differences', 'Family disputes', 'Trade disagreements'],
      correctAnswer: 'Strife between their herdsmen',
      explanation: 'There was strife between the herdsmen of Abram\'s cattle and the herdsmen of Lot\'s cattle.',
      verseReference: 'Genesis 13:7',
      difficulty: 'easy'
    },
    {
      id: 'gen13-q8',
      question: 'Who else was dwelling in the land at this time?',
      type: 'multiple-choice',
      options: ['The Canaanite and the Perizzite', 'The Egyptians and Philistines', 'The Assyrians and Babylonians', 'The Hittites and Jebusites'],
      correctAnswer: 'The Canaanite and the Perizzite',
      explanation: 'The Canaanite and the Perizzite dwelt then in the land, making the strife more problematic.',
      verseReference: 'Genesis 13:7',
      difficulty: 'medium'
    },
    {
      id: 'gen13-q9',
      question: 'Complete Abram\'s words to Lot: "Let there be no strife, I pray thee, between me and thee... for we be ______."',
      type: 'multiple-choice',
      options: ['brethren', 'partners', 'neighbors', 'friends'],
      correctAnswer: 'brethren',
      explanation: 'Abram appealed to their family relationship, saying "we be brethren."',
      verseReference: 'Genesis 13:8',
      difficulty: 'easy'
    },
    {
      id: 'gen13-q10',
      question: 'Abram gave Lot the first choice of land.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Abram generously told Lot to choose first, saying if he went left, Abram would go right, and vice versa.',
      verseReference: 'Genesis 13:9',
      difficulty: 'easy'
    },
    {
      id: 'gen13-q11',
      question: 'How is the plain of Jordan described?',
      type: 'multiple-choice',
      options: ['Well watered everywhere, like the garden of the Lord', 'Dry and barren', 'Rocky and mountainous', 'Filled with wild beasts'],
      correctAnswer: 'Well watered everywhere, like the garden of the Lord',
      explanation: 'The plain of Jordan was well watered everywhere, like the garden of the Lord, like the land of Egypt.',
      verseReference: 'Genesis 13:10',
      difficulty: 'medium'
    },
    {
      id: 'gen13-q12',
      question: 'Lot chose the plain of Jordan and journeyed east.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Lot chose the plain of Jordan and journeyed east, and they separated from each other.',
      verseReference: 'Genesis 13:11',
      difficulty: 'easy'
    },
    {
      id: 'gen13-q13',
      question: 'Where did Lot pitch his tent?',
      type: 'multiple-choice',
      options: ['Toward Sodom', 'Toward Gomorrah', 'Toward the mountains', 'Toward Egypt'],
      correctAnswer: 'Toward Sodom',
      explanation: 'Lot pitched his tent toward Sodom, which would later prove problematic.',
      verseReference: 'Genesis 13:12',
      difficulty: 'medium'
    },
    {
      id: 'gen13-q14',
      question: 'How are the men of Sodom described?',
      type: 'fill-blank',
      correctAnswer: 'wicked',
      explanation: 'The men of Sodom were wicked and sinners before the Lord exceedingly.',
      verseReference: 'Genesis 13:13',
      difficulty: 'easy'
    },
    {
      id: 'gen13-q15',
      question: 'What did God tell Abram to do after Lot departed?',
      type: 'fill-blank',
      correctAnswer: 'look',
      explanation: 'The Lord said to Abram "Lift up now thine eyes, and look from the place where thou art."',
      verseReference: 'Genesis 13:14',
      difficulty: 'medium'
    },
    {
      id: 'gen13-q16',
      question: 'What did God promise about Abram\'s seed?',
      type: 'multiple-choice',
      options: ['They would be like the dust of the earth in number', 'They would be like the stars in heaven', 'They would be like the sand of the sea', 'They would be few but mighty'],
      correctAnswer: 'They would be like the dust of the earth in number',
      explanation: 'God promised to make Abram\'s seed as the dust of the earth - innumerable.',
      verseReference: 'Genesis 13:16',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-13-quiz',
  tags: ['abraham', 'lot', 'separation', 'sodom', 'promise', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 14 Quiz - War of the Kings and Melchizedek
export const GENESIS_14_QUIZ: Quiz = {
  id: 'genesis-14',
  title: 'Genesis Chapter 14 Quiz',
  description: 'Test your knowledge of Genesis chapter 14, covering the war of the kings, Abram\'s rescue of Lot, and his encounter with Melchizedek.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 14,
  questions: [
    {
      id: 'gen14-q1',
      question: 'Who was the king of Shinar in the days of Abram?',
      type: 'multiple-choice',
      options: ['Amraphel', 'Arioch', 'Chedorlaomer', 'Tidal'],
      correctAnswer: 'Amraphel',
      explanation: 'Amraphel king of Shinar was one of the four kings who made war.',
      verseReference: 'Genesis 14:1',
      difficulty: 'hard'
    },
    {
      id: 'gen14-q2',
      question: 'The five kings served Chedorlaomer for twelve years.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Twelve years they served Chedorlaomer, and in the thirteenth year they rebelled.',
      verseReference: 'Genesis 14:4',
      difficulty: 'medium'
    },
    {
      id: 'gen14-q3',
      question: 'How long did the five kings rebel before the four kings came against them?',
      type: 'multiple-choice',
      options: ['One year', 'Two years', 'Three years', 'Five years'],
      correctAnswer: 'One year',
      explanation: 'In the thirteenth year they rebelled, and in the fourteenth year came Chedorlaomer and the kings with him.',
      verseReference: 'Genesis 14:4-5',
      difficulty: 'medium'
    },
    {
      id: 'gen14-q4',
      question: 'Where did the battle of the kings take place?',
      type: 'multiple-choice',
      options: ['Vale of Siddim (Salt Sea)', 'Valley of Shaveh', 'Plains of Mamre', 'Mount Moriah'],
      correctAnswer: 'Vale of Siddim (Salt Sea)',
      explanation: 'All these kings joined together in the vale of Siddim, which is the salt sea.',
      verseReference: 'Genesis 14:3',
      difficulty: 'hard'
    },
    {
      id: 'gen14-q5',
      question: 'Complete this phrase: "And they took Lot, Abram\'s brother\'s son, who dwelt in ______, and his goods, and departed."',
      type: 'multiple-choice',
      options: ['Sodom', 'Gomorrah', 'Zoar', 'Admah'],
      correctAnswer: 'Sodom',
      explanation: 'Lot was captured because he dwelt in Sodom when the city was taken.',
      verseReference: 'Genesis 14:12',
      difficulty: 'easy'
    },
    {
      id: 'gen14-q6',
      question: 'Someone escaped and told Abram about Lot\'s capture.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'One who had escaped came and told Abram the Hebrew what had happened.',
      verseReference: 'Genesis 14:13',
      difficulty: 'easy'
    },
    {
      id: 'gen14-q7',
      question: 'How many trained servants did Abram arm for battle?',
      type: 'multiple-choice',
      options: ['318', '300', '400', '500'],
      correctAnswer: '318',
      explanation: 'Abram armed his trained servants, born in his own house, three hundred and eighteen.',
      verseReference: 'Genesis 14:14',
      difficulty: 'medium'
    },
    {
      id: 'gen14-q8',
      question: 'Where did Abram pursue the kings?',
      type: 'multiple-choice',
      options: ['Even unto Dan', 'To the Jordan River', 'To Mount Sinai', 'To Egypt'],
      correctAnswer: 'Even unto Dan',
      explanation: 'Abram pursued them unto Dan, where he divided his forces by night and smote them.',
      verseReference: 'Genesis 14:14',
      difficulty: 'medium'
    },
    {
      id: 'gen14-q9',
      question: 'Complete this phrase: "And he brought back all the goods, and also brought again his brother ______ and his goods."',
      type: 'multiple-choice',
      options: ['Lot', 'Nahor', 'Haran', 'Terah'],
      correctAnswer: 'Lot',
      explanation: 'Abram successfully rescued Lot and recovered all the goods that had been taken.',
      verseReference: 'Genesis 14:16',
      difficulty: 'easy'
    },
    {
      id: 'gen14-q10',
      question: 'The king of Sodom came out to meet Abram after his victory.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The king of Sodom went out to meet Abram after his return from defeating Chedorlaomer.',
      verseReference: 'Genesis 14:17',
      difficulty: 'easy'
    },
    {
      id: 'gen14-q11',
      question: 'Who was Melchizedek?',
      type: 'multiple-choice',
      options: ['King of Salem and priest of the most high God', 'King of Sodom', 'One of the four kings', 'Abram\'s ally'],
      correctAnswer: 'King of Salem and priest of the most high God',
      explanation: 'Melchizedek king of Salem brought forth bread and wine: and he was the priest of the most high God.',
      verseReference: 'Genesis 14:18',
      difficulty: 'medium'
    },
    {
      id: 'gen14-q12',
      question: 'Melchizedek brought bread and wine to Abram.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Melchizedek brought forth bread and wine to refresh Abram after his victory.',
      verseReference: 'Genesis 14:18',
      difficulty: 'easy'
    },
    {
      id: 'gen14-q13',
      question: 'What did Melchizedek say about God in his blessing?',
      type: 'multiple-choice',
      options: ['Possessor of heaven and earth', 'Creator of all things', 'King of all nations', 'Judge of the world'],
      correctAnswer: 'Possessor of heaven and earth',
      explanation: 'Melchizedek blessed Abram by the most high God, possessor of heaven and earth.',
      verseReference: 'Genesis 14:19',
      difficulty: 'medium'
    },
    {
      id: 'gen14-q14',
      question: 'What did Abram give to Melchizedek?',
      type: 'fill-blank',
      correctAnswer: 'tithes',
      explanation: 'Abram gave him tithes of all - a tenth of everything he had recovered.',
      verseReference: 'Genesis 14:20',
      difficulty: 'medium'
    },
    {
      id: 'gen14-q15',
      question: 'What did the king of Sodom ask Abram to keep?',
      type: 'fill-blank',
      correctAnswer: 'goods',
      explanation: 'The king of Sodom said "Give me the persons, and take the goods to thyself."',
      verseReference: 'Genesis 14:21',
      difficulty: 'medium'
    },
    {
      id: 'gen14-q16',
      question: 'How did Abram respond to the king of Sodom\'s offer?',
      type: 'multiple-choice',
      options: ['He refused to take anything except what his men had eaten', 'He accepted all the goods', 'He took half the goods', 'He negotiated for a better deal'],
      correctAnswer: 'He refused to take anything except what his men had eaten',
      explanation: 'Abram refused to take anything so the king of Sodom could not say he had made Abram rich.',
      verseReference: 'Genesis 14:22-24',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-14-quiz',
  tags: ['abraham', 'lot', 'war', 'melchizedek', 'salem', 'tithes', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 15 Quiz - God's Covenant with Abram
export const GENESIS_15_QUIZ: Quiz = {
  id: 'genesis-15',
  title: 'Genesis Chapter 15 Quiz',
  description: 'Test your knowledge of Genesis chapter 15, covering God\'s covenant with Abram, the promise of a son, and the prophecy of Israel\'s bondage in Egypt.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 15,
  questions: [
    {
      id: 'gen15-q1',
      question: 'How did the word of the Lord come to Abram in Genesis 15?',
      type: 'multiple-choice',
      options: ['In a vision', 'In a dream', 'Through an angel', 'In an audible voice'],
      correctAnswer: 'In a vision',
      explanation: 'After these things the word of the Lord came unto Abram in a vision.',
      verseReference: 'Genesis 15:1',
      difficulty: 'easy'
    },
    {
      id: 'gen15-q2',
      question: 'God told Abram not to fear because He was his shield.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The Lord said "Fear not, Abram: I am thy shield, and thy exceeding great reward."',
      verseReference: 'Genesis 15:1',
      difficulty: 'easy'
    },
    {
      id: 'gen15-q3',
      question: 'What was Abram\'s concern about God\'s promises?',
      type: 'multiple-choice',
      options: ['He had no child and his heir would be his servant', 'He was too old', 'He had no land', 'He was afraid of his enemies'],
      correctAnswer: 'He had no child and his heir would be his servant',
      explanation: 'Abram said he was childless and the steward of his house was this Eliezer of Damascus.',
      verseReference: 'Genesis 15:2-3',
      difficulty: 'medium'
    },
    {
      id: 'gen15-q4',
      question: 'Who did God say would be Abram\'s heir?',
      type: 'multiple-choice',
      options: ['One who would come from his own body', 'Eliezer his servant', 'Lot his nephew', 'A stranger'],
      correctAnswer: 'One who would come from his own body',
      explanation: 'God said "he that shall come forth out of thine own bowels shall be thine heir."',
      verseReference: 'Genesis 15:4',
      difficulty: 'easy'
    },
    {
      id: 'gen15-q5',
      question: 'Complete this promise: "Look now toward heaven, and tell the stars, if thou be able to number them... So shall thy ______ be."',
      type: 'multiple-choice',
      options: ['seed', 'years', 'blessings', 'lands'],
      correctAnswer: 'seed',
      explanation: 'God promised that Abram\'s descendants would be as numerous as the stars in heaven.',
      verseReference: 'Genesis 15:5',
      difficulty: 'easy'
    },
    {
      id: 'gen15-q6',
      question: 'Abram believed in the Lord, and it was counted to him for righteousness.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'This is one of the most important verses in Scripture about faith and righteousness.',
      verseReference: 'Genesis 15:6',
      difficulty: 'easy'
    },
    {
      id: 'gen15-q7',
      question: 'What did God promise to give Abram to inherit?',
      type: 'multiple-choice',
      options: ['This land', 'Great riches', 'Many servants', 'Long life'],
      correctAnswer: 'This land',
      explanation: 'God said "I am the Lord that brought thee out of Ur of the Chaldees, to give thee this land to inherit it."',
      verseReference: 'Genesis 15:7',
      difficulty: 'easy'
    },
    {
      id: 'gen15-q8',
      question: 'What did Abram ask for as a sign?',
      type: 'multiple-choice',
      options: ['How he could know he would inherit the land', 'A confirmation of the promise of a son', 'Protection from his enemies', 'Guidance for his journey'],
      correctAnswer: 'How he could know he would inherit the land',
      explanation: 'Abram said "Lord God, whereby shall I know that I shall inherit it?"',
      verseReference: 'Genesis 15:8',
      difficulty: 'medium'
    },
    {
      id: 'gen15-q9',
      question: 'Complete this instruction: "Take me an heifer of three years old, and a she goat of three years old, and a ram of three years old, and a ______, and a young pigeon."',
      type: 'multiple-choice',
      options: ['turtledove', 'dove', 'sparrow', 'raven'],
      correctAnswer: 'turtledove',
      explanation: 'These animals were specified for the covenant ceremony.',
      verseReference: 'Genesis 15:9',
      difficulty: 'medium'
    },
    {
      id: 'gen15-q10',
      question: 'Abram divided the animals in the midst and laid each piece opposite the other.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Abram divided the animals and laid each piece one against another, but the birds he did not divide.',
      verseReference: 'Genesis 15:10',
      difficulty: 'medium'
    },
    {
      id: 'gen15-q11',
      question: 'What came down upon the carcasses?',
      type: 'multiple-choice',
      options: ['Fowls', 'Flies', 'Fire', 'Wind'],
      correctAnswer: 'Fowls',
      explanation: 'When the fowls came down upon the carcasses, Abram drove them away.',
      verseReference: 'Genesis 15:11',
      difficulty: 'medium'
    },
    {
      id: 'gen15-q12',
      question: 'A deep sleep fell upon Abram as the sun was going down.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'When the sun was going down, a deep sleep fell upon Abram; and a horror of great darkness fell upon him.',
      verseReference: 'Genesis 15:12',
      difficulty: 'easy'
    },
    {
      id: 'gen15-q13',
      question: 'How long did God say Abram\'s seed would be afflicted in a strange land?',
      type: 'multiple-choice',
      options: ['400 years', '300 years', '500 years', '200 years'],
      correctAnswer: '400 years',
      explanation: 'God said "thy seed shall be a stranger in a land that is not theirs, and shall serve them; and they shall afflict them four hundred years."',
      verseReference: 'Genesis 15:13',
      difficulty: 'medium'
    },
    {
      id: 'gen15-q14',
      question: 'What did God promise about the nation that would afflict Abram\'s seed?',
      type: 'fill-blank',
      correctAnswer: 'judge',
      explanation: 'God said "that nation, whom they shall serve, will I judge: and afterward shall they come out with great substance."',
      verseReference: 'Genesis 15:14',
      difficulty: 'medium'
    },
    {
      id: 'gen15-q15',
      question: 'In what generation would Abram\'s descendants return to the promised land?',
      type: 'fill-blank',
      correctAnswer: 'fourth',
      explanation: 'God said "in the fourth generation they shall come hither again: for the iniquity of the Amorites is not yet full."',
      verseReference: 'Genesis 15:16',
      difficulty: 'hard'
    },
    {
      id: 'gen15-q16',
      question: 'What passed between the pieces of the sacrifice?',
      type: 'multiple-choice',
      options: ['A smoking furnace and a burning lamp', 'A great wind', 'Lightning and thunder', 'A dove and raven'],
      correctAnswer: 'A smoking furnace and a burning lamp',
      explanation: 'When it was dark, a smoking furnace and a burning lamp passed between those pieces, representing God\'s presence.',
      verseReference: 'Genesis 15:17',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-15-quiz',
  tags: ['abraham', 'covenant', 'faith', 'righteousness', 'promise', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 16 Quiz - Hagar and Ishmael
export const GENESIS_16_QUIZ: Quiz = {
  id: 'genesis-16',
  title: 'Genesis Chapter 16 Quiz',
  description: 'Test your knowledge of Genesis chapter 16, covering Sarai\'s plan with Hagar, the birth of Ishmael, and the angel\'s message to Hagar.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 16,
  questions: [
    {
      id: 'gen16-q1',
      question: 'Why did Sarai remain barren?',
      type: 'multiple-choice',
      options: ['The Lord had restrained her from bearing', 'She was too old', 'She was ill', 'The text doesn\'t specify'],
      correctAnswer: 'The Lord had restrained her from bearing',
      explanation: 'The text specifically states that "the Lord had restrained her from bearing."',
      verseReference: 'Genesis 16:2',
      difficulty: 'medium'
    },
    {
      id: 'gen16-q2',
      question: 'Sarai had an Egyptian handmaid named Hagar.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Sarai, Abram\'s wife, had an handmaid, an Egyptian, whose name was Hagar.',
      verseReference: 'Genesis 16:1',
      difficulty: 'easy'
    },
    {
      id: 'gen16-q3',
      question: 'What was Sarai\'s suggestion to Abram?',
      type: 'multiple-choice',
      options: ['Go in unto my maid; it may be that I may obtain children by her', 'Pray to God for a child', 'Adopt a child from another family', 'Wait patiently for God\'s timing'],
      correctAnswer: 'Go in unto my maid; it may be that I may obtain children by her',
      explanation: 'Sarai said "go in unto my maid; it may be that I may obtain children by her."',
      verseReference: 'Genesis 16:2',
      difficulty: 'easy'
    },
    {
      id: 'gen16-q4',
      question: 'How did Abram respond to Sarai\'s suggestion?',
      type: 'multiple-choice',
      options: ['He hearkened to the voice of Sarai', 'He refused the suggestion', 'He prayed about it first', 'He sought counsel from others'],
      correctAnswer: 'He hearkened to the voice of Sarai',
      explanation: 'And Abram hearkened to the voice of Sarai, showing his compliance with her plan.',
      verseReference: 'Genesis 16:2',
      difficulty: 'easy'
    },
    {
      id: 'gen16-q5',
      question: 'Complete this phrase: "And Sarai Abram\'s wife took Hagar her maid the Egyptian, after Abram had dwelt ______ years in the land of Canaan."',
      type: 'multiple-choice',
      options: ['ten', 'five', 'fifteen', 'twenty'],
      correctAnswer: 'ten',
      explanation: 'This shows that they had waited ten years in Canaan before trying this solution.',
      verseReference: 'Genesis 16:3',
      difficulty: 'medium'
    },
    {
      id: 'gen16-q6',
      question: 'Hagar conceived after Abram went in unto her.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'And he went in unto Hagar, and she conceived.',
      verseReference: 'Genesis 16:4',
      difficulty: 'easy'
    },
    {
      id: 'gen16-q7',
      question: 'How did Hagar\'s attitude change after she conceived?',
      type: 'multiple-choice',
      options: ['Her mistress was despised in her eyes', 'She became more humble', 'She was filled with joy', 'She became afraid'],
      correctAnswer: 'Her mistress was despised in her eyes',
      explanation: 'When Hagar saw that she had conceived, her mistress was despised in her eyes.',
      verseReference: 'Genesis 16:4',
      difficulty: 'medium'
    },
    {
      id: 'gen16-q8',
      question: 'What did Sarai say to Abram about Hagar\'s behavior?',
      type: 'multiple-choice',
      options: ['My wrong be upon thee', 'You must discipline her', 'Send her away immediately', 'This was a mistake'],
      correctAnswer: 'My wrong be upon thee',
      explanation: 'Sarai said to Abram "My wrong be upon thee" - blaming him for the situation.',
      verseReference: 'Genesis 16:5',
      difficulty: 'medium'
    },
    {
      id: 'gen16-q9',
      question: 'Complete Abram\'s response: "Behold, thy maid is in thy hand; do to her as it ______ thee."',
      type: 'multiple-choice',
      options: ['pleaseth', 'seemeth good', 'is right', 'benefits'],
      correctAnswer: 'pleaseth',
      explanation: 'Abram gave Sarai full authority over Hagar, saying "do to her as it pleaseth thee."',
      verseReference: 'Genesis 16:6',
      difficulty: 'easy'
    },
    {
      id: 'gen16-q10',
      question: 'Sarai dealt harshly with Hagar, causing her to flee.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'When Sarai dealt hardly with her, she fled from her face.',
      verseReference: 'Genesis 16:6',
      difficulty: 'easy'
    },
    {
      id: 'gen16-q11',
      question: 'Where did the angel of the Lord find Hagar?',
      type: 'multiple-choice',
      options: ['By a fountain of water in the wilderness', 'In the mountains', 'By the seashore', 'In a city'],
      correctAnswer: 'By a fountain of water in the wilderness',
      explanation: 'The angel found her by a fountain of water in the wilderness, by the fountain in the way to Shur.',
      verseReference: 'Genesis 16:7',
      difficulty: 'medium'
    },
    {
      id: 'gen16-q12',
      question: 'The angel told Hagar to return to her mistress and submit herself.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The angel said "Return to thy mistress, and submit thyself under her hands."',
      verseReference: 'Genesis 16:9',
      difficulty: 'easy'
    },
    {
      id: 'gen16-q13',
      question: 'What did the angel promise about Hagar\'s seed?',
      type: 'multiple-choice',
      options: ['I will multiply thy seed exceedingly', 'Your son will be a great king', 'Your descendants will inherit the land', 'They will be few but mighty'],
      correctAnswer: 'I will multiply thy seed exceedingly',
      explanation: 'The angel promised "I will multiply thy seed exceedingly, that it shall not be numbered for multitude."',
      verseReference: 'Genesis 16:10',
      difficulty: 'medium'
    },
    {
      id: 'gen16-q14',
      question: 'What name did the angel say Hagar should call her son?',
      type: 'fill-blank',
      correctAnswer: 'Ishmael',
      explanation: 'The angel said "thou shalt call his name Ishmael; because the Lord hath heard thy affliction."',
      verseReference: 'Genesis 16:11',
      difficulty: 'easy'
    },
    {
      id: 'gen16-q15',
      question: 'How is Ishmael\'s character described?',
      type: 'fill-blank',
      correctAnswer: 'wild man',
      explanation: 'The angel said "he will be a wild man; his hand will be against every man, and every man\'s hand against him."',
      verseReference: 'Genesis 16:12',
      difficulty: 'medium'
    },
    {
      id: 'gen16-q16',
      question: 'What name did Hagar give to the Lord who spoke to her?',
      type: 'multiple-choice',
      options: ['Thou God seest me', 'El Shaddai', 'Jehovah Jireh', 'Adonai'],
      correctAnswer: 'Thou God seest me',
      explanation: 'Hagar called the name of the Lord that spake unto her "Thou God seest me."',
      verseReference: 'Genesis 16:13',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-16-quiz',
  tags: ['abraham', 'sarah', 'hagar', 'ishmael', 'angel', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 17 Quiz - Circumcision Covenant
export const GENESIS_17_QUIZ: Quiz = {
  id: 'genesis-17',
  title: 'Genesis Chapter 17 Quiz',
  description: 'Test your knowledge of Genesis chapter 17, covering God\'s covenant of circumcision with Abraham, the name changes from Abram to Abraham and Sarai to Sarah, and the promise of Isaac.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 17,
  questions: [
    {
      id: 'gen17-q1',
      question: 'How old was Abram when the Lord appeared to him in Genesis 17?',
      type: 'multiple-choice',
      options: ['99 years old', '100 years old', '90 years old', '95 years old'],
      correctAnswer: '99 years old',
      explanation: 'When Abram was ninety years old and nine, the Lord appeared to Abram.',
      verseReference: 'Genesis 17:1',
      difficulty: 'medium'
    },
    {
      id: 'gen17-q2',
      question: 'God told Abram to walk before Him and be perfect.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The Lord said to Abram "I am the Almighty God; walk before me, and be thou perfect."',
      verseReference: 'Genesis 17:1',
      difficulty: 'easy'
    },
    {
      id: 'gen17-q3',
      question: 'What new name did God give to Abram?',
      type: 'multiple-choice',
      options: ['Abraham', 'Israel', 'Isaac', 'Jacob'],
      correctAnswer: 'Abraham',
      explanation: 'God changed Abram\'s name to Abraham, meaning "father of many nations."',
      verseReference: 'Genesis 17:5',
      difficulty: 'easy'
    },
    {
      id: 'gen17-q4',
      question: 'What does the name Abraham mean?',
      type: 'multiple-choice',
      options: ['Father of many nations', 'Friend of God', 'Man of faith', 'Blessed one'],
      correctAnswer: 'Father of many nations',
      explanation: 'God said "thy name shall be Abraham; for a father of many nations have I made thee."',
      verseReference: 'Genesis 17:5',
      difficulty: 'medium'
    },
    {
      id: 'gen17-q5',
      question: 'Complete this promise: "And I will make thee exceeding ______, and I will make nations of thee, and kings shall come out of thee."',
      type: 'multiple-choice',
      options: ['fruitful', 'wealthy', 'powerful', 'wise'],
      correctAnswer: 'fruitful',
      explanation: 'God promised to make Abraham exceeding fruitful, with nations and kings coming from him.',
      verseReference: 'Genesis 17:6',
      difficulty: 'easy'
    },
    {
      id: 'gen17-q6',
      question: 'The covenant God made with Abraham was to last for how long?',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'God established His covenant as an everlasting covenant with Abraham and his seed after him.',
      verseReference: 'Genesis 17:7',
      difficulty: 'easy'
    },
    {
      id: 'gen17-q7',
      question: 'What land did God promise to give Abraham\'s descendants?',
      type: 'multiple-choice',
      options: ['All the land of Canaan', 'Only the city of Hebron', 'The land of Egypt', 'The land of Mesopotamia'],
      correctAnswer: 'All the land of Canaan',
      explanation: 'God promised to give unto Abraham and his seed all the land of Canaan for an everlasting possession.',
      verseReference: 'Genesis 17:8',
      difficulty: 'easy'
    },
    {
      id: 'gen17-q8',
      question: 'What was the token (sign) of the covenant between God and Abraham?',
      type: 'multiple-choice',
      options: ['Circumcision', 'A rainbow', 'An altar', 'A stone pillar'],
      correctAnswer: 'Circumcision',
      explanation: 'Circumcision was the token of the covenant between God and Abraham\'s descendants.',
      verseReference: 'Genesis 17:11',
      difficulty: 'easy'
    },
    {
      id: 'gen17-q9',
      question: 'Complete this command: "And ye shall circumcise the flesh of your foreskin; and it shall be a ______ of the covenant betwixt me and you."',
      type: 'multiple-choice',
      options: ['token', 'sign', 'seal', 'mark'],
      correctAnswer: 'token',
      explanation: 'Circumcision was to be a token (sign) of the covenant between God and Abraham\'s line.',
      verseReference: 'Genesis 17:11',
      difficulty: 'medium'
    },
    {
      id: 'gen17-q10',
      question: 'Male children were to be circumcised on the eighth day.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Every man child among Abraham\'s descendants was to be circumcised when he is eight days old.',
      verseReference: 'Genesis 17:12',
      difficulty: 'easy'
    },
    {
      id: 'gen17-q11',
      question: 'What would happen to an uncircumcised male?',
      type: 'multiple-choice',
      options: ['He would be cut off from his people', 'He would be banished from the land', 'He would lose his inheritance', 'He would be made a servant'],
      correctAnswer: 'He would be cut off from his people',
      explanation: 'The uncircumcised man child would be cut off from his people for breaking the covenant.',
      verseReference: 'Genesis 17:14',
      difficulty: 'medium'
    },
    {
      id: 'gen17-q12',
      question: 'What new name did God give to Sarai?',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'God changed Sarai\'s name to Sarah, saying she would be blessed and become a mother of nations.',
      verseReference: 'Genesis 17:15',
      difficulty: 'easy'
    },
    {
      id: 'gen17-q13',
      question: 'How did Abraham react when God promised him a son through Sarah?',
      type: 'multiple-choice',
      options: ['He fell on his face and laughed', 'He rejoiced immediately', 'He questioned God\'s power', 'He was afraid'],
      correctAnswer: 'He fell on his face and laughed',
      explanation: 'Abraham fell upon his face and laughed, thinking about their advanced ages.',
      verseReference: 'Genesis 17:17',
      difficulty: 'medium'
    },
    {
      id: 'gen17-q14',
      question: 'What name did God say the promised son should be called?',
      type: 'fill-blank',
      correctAnswer: 'Isaac',
      explanation: 'God said "Sarah thy wife shall bear thee a son indeed; and thou shalt call his name Isaac."',
      verseReference: 'Genesis 17:19',
      difficulty: 'easy'
    },
    {
      id: 'gen17-q15',
      question: 'What did Abraham ask God concerning Ishmael?',
      type: 'fill-blank',
      correctAnswer: 'live',
      explanation: 'Abraham said unto God "O that Ishmael might live before thee!" - asking for God\'s blessing on Ishmael.',
      verseReference: 'Genesis 17:18',
      difficulty: 'medium'
    },
    {
      id: 'gen17-q16',
      question: 'When did Abraham circumcise all the males in his household?',
      type: 'multiple-choice',
      options: ['That very same day', 'The next week', 'After Isaac was born', 'The following month'],
      correctAnswer: 'That very same day',
      explanation: 'Abraham circumcised all the males of his house in the selfsame day, as God had commanded.',
      verseReference: 'Genesis 17:23',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-17-quiz',
  tags: ['abraham', 'covenant', 'circumcision', 'isaac', 'sarah', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 18 Quiz - Three Visitors and Sodom's Judgment
export const GENESIS_18_QUIZ: Quiz = {
  id: 'genesis-18',
  title: 'Genesis Chapter 18 Quiz',
  description: 'Test your knowledge of Genesis chapter 18, covering the three visitors to Abraham, the promise of Isaac\'s birth, and Abraham\'s intercession for Sodom.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 18,
  questions: [
    {
      id: 'gen18-q1',
      question: 'Where was Abraham when the three men appeared to him?',
      type: 'multiple-choice',
      options: ['Sitting in his tent door in the heat of the day', 'Walking in his fields', 'By a well', 'Under a tree'],
      correctAnswer: 'Sitting in his tent door in the heat of the day',
      explanation: 'Abraham was sitting in the tent door in the heat of the day when he saw three men.',
      verseReference: 'Genesis 18:1',
      difficulty: 'medium'
    },
    {
      id: 'gen18-q2',
      question: 'Abraham ran to meet the visitors and bowed to the ground.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'When Abraham saw them, he ran to meet them and bowed himself toward the ground.',
      verseReference: 'Genesis 18:2',
      difficulty: 'easy'
    },
    {
      id: 'gen18-q3',
      question: 'What did Abraham first offer to the visitors?',
      type: 'multiple-choice',
      options: ['Water to wash their feet and rest under a tree', 'Food and drink', 'A place to sleep', 'Gifts of gold and silver'],
      correctAnswer: 'Water to wash their feet and rest under a tree',
      explanation: 'Abraham offered water to wash their feet and to rest under the tree while he prepared food.',
      verseReference: 'Genesis 18:4',
      difficulty: 'medium'
    },
    {
      id: 'gen18-q4',
      question: 'Abraham told Sarah to quickly make cakes from how much fine meal?',
      type: 'multiple-choice',
      options: ['Three measures', 'Two measures', 'Five measures', 'Ten measures'],
      correctAnswer: 'Three measures',
      explanation: 'Abraham told Sarah to make ready quickly three measures of fine meal and make cakes.',
      verseReference: 'Genesis 18:6',
      difficulty: 'hard'
    },
    {
      id: 'gen18-q5',
      question: 'Complete this question the visitors asked: "Where is ______ thy wife?"',
      type: 'multiple-choice',
      options: ['Sarah', 'Sarai', 'thy beloved', 'thy companion'],
      correctAnswer: 'Sarah',
      explanation: 'The visitors asked Abraham "Where is Sarah thy wife?" showing they knew her by her new name.',
      verseReference: 'Genesis 18:9',
      difficulty: 'easy'
    },
    {
      id: 'gen18-q6',
      question: 'Sarah was listening at the tent door behind the visitor.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Sarah heard the conversation as she was behind the tent door, which was behind the visitor.',
      verseReference: 'Genesis 18:10',
      difficulty: 'easy'
    },
    {
      id: 'gen18-q7',
      question: 'What promise did the Lord make about Sarah?',
      type: 'multiple-choice',
      options: ['She would have a son by the same time next year', 'She would live to be very old', 'She would become wealthy', 'She would have many daughters'],
      correctAnswer: 'She would have a son by the same time next year',
      explanation: 'The Lord said "I will certainly return unto thee according to the time of life; and, lo, Sarah thy wife shall have a son."',
      verseReference: 'Genesis 18:10',
      difficulty: 'easy'
    },
    {
      id: 'gen18-q8',
      question: 'Why did Sarah laugh when she heard about having a son?',
      type: 'multiple-choice',
      options: ['She and Abraham were old and past childbearing age', 'She thought it was impossible to believe', 'She was filled with joy', 'She was nervous about the responsibility'],
      correctAnswer: 'She and Abraham were old and past childbearing age',
      explanation: 'Sarah laughed within herself, thinking she was old and her lord (Abraham) was also old.',
      verseReference: 'Genesis 18:12',
      difficulty: 'medium'
    },
    {
      id: 'gen18-q9',
      question: 'Complete the Lord\'s response to Sarah\'s laughter: "Is any thing too ______ for the Lord?"',
      type: 'multiple-choice',
      options: ['hard', 'difficult', 'impossible', 'great'],
      correctAnswer: 'hard',
      explanation: 'The Lord asked "Is any thing too hard for the Lord?" demonstrating His unlimited power.',
      verseReference: 'Genesis 18:14',
      difficulty: 'easy'
    },
    {
      id: 'gen18-q10',
      question: 'Sarah denied that she laughed because she was afraid.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Then Sarah denied, saying "I laughed not;" for she was afraid. But the Lord knew she had laughed.',
      verseReference: 'Genesis 18:15',
      difficulty: 'easy'
    },
    {
      id: 'gen18-q11',
      question: 'What were the men looking toward as they rose up from Abraham?',
      type: 'multiple-choice',
      options: ['Sodom', 'Egypt', 'Canaan', 'The mountains'],
      correctAnswer: 'Sodom',
      explanation: 'The men rose up from thence and looked toward Sodom, and Abraham went with them.',
      verseReference: 'Genesis 18:16',
      difficulty: 'medium'
    },
    {
      id: 'gen18-q12',
      question: 'The Lord decided to hide from Abraham what He was going to do to Sodom.',
      type: 'true-false',
      correctAnswer: 'false',
      explanation: 'The Lord said "Shall I hide from Abraham that thing which I do?" and decided to tell him.',
      verseReference: 'Genesis 18:17',
      difficulty: 'medium'
    },
    {
      id: 'gen18-q13',
      question: 'What was the reason God planned to judge Sodom and Gomorrah?',
      type: 'multiple-choice',
      options: ['Their sin was very grievous', 'They worshipped idols', 'They oppressed the poor', 'They rejected God\'s messengers'],
      correctAnswer: 'Their sin was very grievous',
      explanation: 'The Lord said the cry of Sodom and Gomorrah was great, and their sin was very grievous.',
      verseReference: 'Genesis 18:20',
      difficulty: 'easy'
    },
    {
      id: 'gen18-q14',
      question: 'What was the smallest number of righteous people Abraham asked God to spare Sodom for?',
      type: 'fill-blank',
      correctAnswer: 'ten',
      explanation: 'Abraham interceded down to ten righteous people, and God said He would not destroy it for ten\'s sake.',
      verseReference: 'Genesis 18:32',
      difficulty: 'medium'
    },
    {
      id: 'gen18-q15',
      question: 'How did Abraham address God during his intercession?',
      type: 'fill-blank',
      correctAnswer: 'judge',
      explanation: 'Abraham said "Shall not the Judge of all the earth do right?" acknowledging God\'s perfect justice.',
      verseReference: 'Genesis 18:25',
      difficulty: 'medium'
    },
    {
      id: 'gen18-q16',
      question: 'What happened after Abraham finished speaking with the Lord?',
      type: 'multiple-choice',
      options: ['The Lord went His way and Abraham returned home', 'They continued talking', 'Abraham followed the Lord', 'The visitors stayed the night'],
      correctAnswer: 'The Lord went His way and Abraham returned home',
      explanation: 'The Lord went His way as soon as He had left communing with Abraham, and Abraham returned to his place.',
      verseReference: 'Genesis 18:33',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-18-quiz',
  tags: ['abraham', 'three-visitors', 'isaac-promise', 'sarah', 'sodom', 'intercession', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 19 Quiz - Destruction of Sodom and Gomorrah
export const GENESIS_19_QUIZ: Quiz = {
  id: 'genesis-19',
  title: 'Genesis Chapter 19 Quiz',
  description: 'Test your knowledge of Genesis chapter 19, covering Lot\'s encounter with the angels, the destruction of Sodom and Gomorrah, and Lot\'s escape to Zoar.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 19,
  questions: [
    {
      id: 'gen19-q1',
      question: 'Where was Lot when the two angels came to Sodom?',
      type: 'multiple-choice',
      options: ['Sitting in the gate of Sodom', 'In his house', 'In the marketplace', 'By the city well'],
      correctAnswer: 'Sitting in the gate of Sodom',
      explanation: 'Lot sat in the gate of Sodom when the two angels came at evening.',
      verseReference: 'Genesis 19:1',
      difficulty: 'medium'
    },
    {
      id: 'gen19-q2',
      question: 'Lot bowed with his face toward the ground when he saw the angels.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'When Lot saw them, he rose up to meet them and bowed himself with his face toward the ground.',
      verseReference: 'Genesis 19:1',
      difficulty: 'easy'
    },
    {
      id: 'gen19-q3',
      question: 'What did Lot first offer to the angels?',
      type: 'multiple-choice',
      options: ['To stay at his house and wash their feet', 'Food and drink', 'Money and gifts', 'Protection from enemies'],
      correctAnswer: 'To stay at his house and wash their feet',
      explanation: 'Lot said "turn in, I pray you, into your servant\'s house, and tarry all night, and wash your feet."',
      verseReference: 'Genesis 19:2',
      difficulty: 'medium'
    },
    {
      id: 'gen19-q4',
      question: 'How did the angels initially respond to Lot\'s invitation?',
      type: 'multiple-choice',
      options: ['They said they would stay in the street all night', 'They immediately accepted', 'They asked for directions to an inn', 'They said they must leave the city'],
      correctAnswer: 'They said they would stay in the street all night',
      explanation: 'The angels said "Nay; but we will abide in the street all night."',
      verseReference: 'Genesis 19:2',
      difficulty: 'medium'
    },
    {
      id: 'gen19-q5',
      question: 'Complete this phrase: "And he pressed upon them greatly; and they turned in unto him, and entered into his ______."',
      type: 'multiple-choice',
      options: ['house', 'tent', 'chamber', 'dwelling'],
      correctAnswer: 'house',
      explanation: 'Lot pressed them greatly until they turned in unto him and entered into his house.',
      verseReference: 'Genesis 19:3',
      difficulty: 'easy'
    },
    {
      id: 'gen19-q6',
      question: 'Lot prepared unleavened bread for the angels.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Lot made them a feast and did bake unleavened bread, and they did eat.',
      verseReference: 'Genesis 19:3',
      difficulty: 'easy'
    },
    {
      id: 'gen19-q7',
      question: 'Who surrounded Lot\'s house that night?',
      type: 'multiple-choice',
      options: ['The men of Sodom, both old and young', 'Only young men', 'Only the city leaders', 'Strangers from other cities'],
      correctAnswer: 'The men of Sodom, both old and young',
      explanation: 'The men of Sodom compassed the house round, both old and young, all the people from every quarter.',
      verseReference: 'Genesis 19:4',
      difficulty: 'medium'
    },
    {
      id: 'gen19-q8',
      question: 'What did the men of Sodom demand from Lot?',
      type: 'multiple-choice',
      options: ['Bring out the men so they could know them', 'Give them food and money', 'Allow them to search his house', 'Turn over his possessions'],
      correctAnswer: 'Bring out the men so they could know them',
      explanation: 'They called to Lot saying "Where are the men which came in to thee this night? bring them out unto us, that we may know them."',
      verseReference: 'Genesis 19:5',
      difficulty: 'easy'
    },
    {
      id: 'gen19-q9',
      question: 'Complete Lot\'s plea to the men: "I pray you, brethren, do not so ______."',
      type: 'multiple-choice',
      options: ['wickedly', 'violently', 'foolishly', 'hastily'],
      correctAnswer: 'wickedly',
      explanation: 'Lot went out and shut the door after him, and said "I pray you, brethren, do not so wickedly."',
      verseReference: 'Genesis 19:7',
      difficulty: 'easy'
    },
    {
      id: 'gen19-q10',
      question: 'The men of Sodom threatened to deal worse with Lot than with his guests.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'They said "now will we deal worse with thee, than with them" and pressed hard upon Lot.',
      verseReference: 'Genesis 19:9',
      difficulty: 'easy'
    },
    {
      id: 'gen19-q11',
      question: 'How did the angels rescue Lot from the mob?',
      type: 'multiple-choice',
      options: ['They pulled him into the house and struck the men with blindness', 'They called down fire from heaven', 'They caused a great wind to scatter the men', 'They made the men fall asleep'],
      correctAnswer: 'They pulled him into the house and struck the men with blindness',
      explanation: 'The men put forth their hand and pulled Lot into the house, and smote the men with blindness.',
      verseReference: 'Genesis 19:10-11',
      difficulty: 'medium'
    },
    {
      id: 'gen19-q12',
      question: 'The angels told Lot to gather all his family because they would destroy the place.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The angels asked Lot who else he had there and said "bring them out of this place: For we will destroy this place."',
      verseReference: 'Genesis 19:12-13',
      difficulty: 'easy'
    },
    {
      id: 'gen19-q13',
      question: 'How did Lot\'s sons-in-law react when he warned them?',
      type: 'multiple-choice',
      options: ['They thought he was joking', 'They immediately believed him', 'They became angry', 'They asked for proof'],
      correctAnswer: 'They thought he was joking',
      explanation: 'Lot seemed as one that mocked unto his sons in law - they didn\'t take him seriously.',
      verseReference: 'Genesis 19:14',
      difficulty: 'medium'
    },
    {
      id: 'gen19-q14',
      question: 'When did the angels urge Lot to leave the city?',
      type: 'fill-blank',
      correctAnswer: 'morning',
      explanation: 'When the morning arose, the angels hastened Lot, saying "Arise, take thy wife, and thy two daughters... lest thou be consumed."',
      verseReference: 'Genesis 19:15',
      difficulty: 'easy'
    },
    {
      id: 'gen19-q15',
      question: 'What did the angels command Lot not to do as he fled?',
      type: 'fill-blank',
      correctAnswer: 'look back',
      explanation: 'The angels said "Escape for thy life; look not behind thee, neither stay thou in all the plain."',
      verseReference: 'Genesis 19:17',
      difficulty: 'medium'
    },
    {
      id: 'gen19-q16',
      question: 'What happened to Lot\'s wife?',
      type: 'multiple-choice',
      options: ['She became a pillar of salt', 'She was consumed by fire', 'She fell into a pit', 'She was struck by lightning'],
      correctAnswer: 'She became a pillar of salt',
      explanation: 'Lot\'s wife looked back from behind him, and she became a pillar of salt.',
      verseReference: 'Genesis 19:26',
      difficulty: 'easy'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-19-quiz',
  tags: ['lot', 'sodom-gomorrah', 'angels', 'destruction', 'judgment', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 20 Quiz - Abraham and Abimelech
export const GENESIS_20_QUIZ: Quiz = {
  id: 'genesis-20',
  title: 'Genesis Chapter 20 Quiz',
  description: 'Test your knowledge of Genesis chapter 20, covering Abraham\'s deception about Sarah being his sister, Abimelech\'s encounter with God, and the restoration of Sarah.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 20,
  questions: [
    {
      id: 'gen20-q1',
      question: 'Where did Abraham journey from in Genesis 20?',
      type: 'multiple-choice',
      options: ['From there toward the south country', 'From Egypt to Canaan', 'From Hebron to Beersheba', 'From the east to the west'],
      correctAnswer: 'From there toward the south country',
      explanation: 'Abraham journeyed from there toward the south country and dwelt between Kadesh and Shur.',
      verseReference: 'Genesis 20:1',
      difficulty: 'medium'
    },
    {
      id: 'gen20-q2',
      question: 'Abraham told people that Sarah was his sister.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Abraham said of Sarah his wife "She is my sister" and Abimelech king of Gerar took her.',
      verseReference: 'Genesis 20:2',
      difficulty: 'easy'
    },
    {
      id: 'gen20-q3',
      question: 'Who was the king of Gerar who took Sarah?',
      type: 'multiple-choice',
      options: ['Abimelech', 'Pharaoh', 'Melchizedek', 'Lot'],
      correctAnswer: 'Abimelech',
      explanation: 'Abimelech king of Gerar sent and took Sarah after Abraham said she was his sister.',
      verseReference: 'Genesis 20:2',
      difficulty: 'easy'
    },
    {
      id: 'gen20-q4',
      question: 'How did God warn Abimelech about Sarah?',
      type: 'multiple-choice',
      options: ['In a dream by night', 'Through an angel', 'By a vision', 'Through a prophet'],
      correctAnswer: 'In a dream by night',
      explanation: 'God came to Abimelech in a dream by night and warned him about taking Sarah.',
      verseReference: 'Genesis 20:3',
      difficulty: 'medium'
    },
    {
      id: 'gen20-q5',
      question: 'Complete God\'s warning: "Behold, thou art but a ______ man for the woman which thou hast taken."',
      type: 'multiple-choice',
      options: ['dead', 'foolish', 'wicked', 'lost'],
      correctAnswer: 'dead',
      explanation: 'God said "thou art but a dead man" because Sarah was another man\'s wife.',
      verseReference: 'Genesis 20:3',
      difficulty: 'easy'
    },
    {
      id: 'gen20-q6',
      question: 'Abimelech had not come near Sarah when God warned him.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Abimelech had not come near her, so he pleaded his innocence to God.',
      verseReference: 'Genesis 20:4',
      difficulty: 'easy'
    },
    {
      id: 'gen20-q7',
      question: 'What did Abimelech claim about his actions?',
      type: 'multiple-choice',
      options: ['He acted with integrity of heart and innocency of hands', 'He was deceived by others', 'He thought Sarah was unmarried', 'He intended no harm'],
      correctAnswer: 'He acted with integrity of heart and innocency of hands',
      explanation: 'Abimelech said "in the integrity of my heart and innocency of my hands have I done this."',
      verseReference: 'Genesis 20:5',
      difficulty: 'medium'
    },
    {
      id: 'gen20-q8',
      question: 'God acknowledged that Abimelech acted in integrity of heart.',
      type: 'multiple-choice',
      options: ['True', 'False', 'Partially true', 'Not mentioned'],
      correctAnswer: 'True',
      explanation: 'God said "I know that thou didst this in the integrity of thy heart" and that He withheld Abimelech from sinning.',
      verseReference: 'Genesis 20:6',
      difficulty: 'easy'
    },
    {
      id: 'gen20-q9',
      question: 'Complete God\'s command: "Now therefore ______ the man his wife; for he is a prophet."',
      type: 'multiple-choice',
      options: ['restore', 'return', 'give', 'send'],
      correctAnswer: 'restore',
      explanation: 'God commanded Abimelech to restore Abraham\'s wife because Abraham was a prophet.',
      verseReference: 'Genesis 20:7',
      difficulty: 'easy'
    },
    {
      id: 'gen20-q10',
      question: 'God said Abraham would pray for Abimelech and he would live.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'God promised that Abraham would pray for Abimelech, and he would live.',
      verseReference: 'Genesis 20:7',
      difficulty: 'easy'
    },
    {
      id: 'gen20-q11',
      question: 'What would happen if Abimelech did not restore Sarah?',
      type: 'multiple-choice',
      options: ['He and all his would surely die', 'His kingdom would be destroyed', 'He would lose his wealth', 'He would become sick'],
      correctAnswer: 'He and all his would surely die',
      explanation: 'God warned "if thou restore her not, know thou that thou shalt surely die, thou, and all that are thine."',
      verseReference: 'Genesis 20:7',
      difficulty: 'medium'
    },
    {
      id: 'gen20-q12',
      question: 'Abimelech rose early in the morning and told his servants about the dream.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Abimelech rose early in the morning and called all his servants and told them all these things, and the men were very afraid.',
      verseReference: 'Genesis 20:8',
      difficulty: 'easy'
    },
    {
      id: 'gen20-q13',
      question: 'What question did Abimelech ask Abraham?',
      type: 'multiple-choice',
      options: ['What hast thou done unto us?', 'Why did you deceive me?', 'Are you really a prophet?', 'Where is your God?'],
      correctAnswer: 'What hast thou done unto us?',
      explanation: 'Abimelech said to Abraham "What hast thou done unto us? and what have I offended thee?"',
      verseReference: 'Genesis 20:9',
      difficulty: 'medium'
    },
    {
      id: 'gen20-q14',
      question: 'Abraham\'s explanation was that Sarah was actually his what?',
      type: 'fill-blank',
      correctAnswer: 'sister',
      explanation: 'Abraham said "she is my sister; she is the daughter of my father, but not the daughter of my mother."',
      verseReference: 'Genesis 20:12',
      difficulty: 'medium'
    },
    {
      id: 'gen20-q15',
      question: 'What did Abraham say was his reason for the deception?',
      type: 'fill-blank',
      correctAnswer: 'fear',
      explanation: 'Abraham said "Because I thought, Surely the fear of God is not in this place; and they will slay me for my wife\'s sake."',
      verseReference: 'Genesis 20:11',
      difficulty: 'hard'
    },
    {
      id: 'gen20-q16',
      question: 'What did Abimelech give to Abraham besides returning Sarah?',
      type: 'multiple-choice',
      options: ['Sheep, oxen, servants, and 1000 pieces of silver', 'Only gold and silver', 'Land and houses', 'Camels and donkeys'],
      correctAnswer: 'Sheep, oxen, servants, and 1000 pieces of silver',
      explanation: 'Abimelech took sheep, oxen, menservants, womenservants, and gave them unto Abraham, and gave him 1000 pieces of silver.',
      verseReference: 'Genesis 20:14, 16',
      difficulty: 'hard'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-20-quiz',
  tags: ['abraham', 'sarah', 'abimelech', 'deception', 'gerar', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 21 Quiz - Birth of Isaac
export const GENESIS_21_QUIZ: Quiz = {
  id: 'genesis-21',
  title: 'Genesis Chapter 21 Quiz',
  description: 'Test your knowledge of Genesis chapter 21, covering the birth of Isaac, Sarah\'s joy, the sending away of Hagar and Ishmael, and the covenant with Abimelech.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 21,
  questions: [
    {
      id: 'gen21-q1',
      question: 'The Lord visited Sarah as He had promised.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The Lord visited Sarah as he had said, and the Lord did unto Sarah as he had spoken.',
      verseReference: 'Genesis 21:1',
      difficulty: 'easy'
    },
    {
      id: 'gen21-q2',
      question: 'How old was Abraham when Isaac was born?',
      type: 'multiple-choice',
      options: ['100 years old', '99 years old', '101 years old', '90 years old'],
      correctAnswer: '100 years old',
      explanation: 'Abraham was an hundred years old when his son Isaac was born unto him.',
      verseReference: 'Genesis 21:5',
      difficulty: 'easy'
    },
    {
      id: 'gen21-q3',
      question: 'What did Sarah say about laughter when Isaac was born?',
      type: 'multiple-choice',
      options: ['God hath made me to laugh', 'I laughed at God\'s promise', 'Who would have believed I would laugh', 'Laughter fills my heart'],
      correctAnswer: 'God hath made me to laugh',
      explanation: 'Sarah said "God hath made me to laugh, so that all that hear will laugh with me."',
      verseReference: 'Genesis 21:6',
      difficulty: 'medium'
    },
    {
      id: 'gen21-q4',
      question: 'What question did Sarah ask about herself?',
      type: 'multiple-choice',
      options: ['Who would have said unto Abraham that Sarah should have given children suck?', 'Who would believe that I could bear a child?', 'Who would think that I could be a mother?', 'Who would have expected this miracle?'],
      correctAnswer: 'Who would have said unto Abraham that Sarah should have given children suck?',
      explanation: 'Sarah marveled that anyone would have predicted she would nurse children for Abraham.',
      verseReference: 'Genesis 21:7',
      difficulty: 'hard'
    },
    {
      id: 'gen21-q5',
      question: 'Complete this phrase: "And the child grew, and was ______, and Abraham made a great feast the same day that Isaac was ______."',
      type: 'multiple-choice',
      options: ['weaned; weaned', 'strong; born', 'healthy; circumcised', 'blessed; dedicated'],
      correctAnswer: 'weaned; weaned',
      explanation: 'The child grew and was weaned, and Abraham made a great feast on the day Isaac was weaned.',
      verseReference: 'Genesis 21:8',
      difficulty: 'medium'
    },
    {
      id: 'gen21-q6',
      question: 'Sarah saw Ishmael mocking at Isaac\'s weaning feast.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Sarah saw the son of Hagar the Egyptian mocking.',
      verseReference: 'Genesis 21:9',
      difficulty: 'easy'
    },
    {
      id: 'gen21-q7',
      question: 'What did Sarah demand Abraham do about Hagar and Ishmael?',
      type: 'multiple-choice',
      options: ['Cast out this bondwoman and her son', 'Send them to another land', 'Make them servants', 'Separate them from Isaac'],
      correctAnswer: 'Cast out this bondwoman and her son',
      explanation: 'Sarah said "Cast out this bondwoman and her son: for the son of this bondwoman shall not be heir with my son."',
      verseReference: 'Genesis 21:10',
      difficulty: 'easy'
    },
    {
      id: 'gen21-q8',
      question: 'How did Abraham feel about Sarah\'s demand regarding Ishmael?',
      type: 'multiple-choice',
      options: ['The thing was very grievous in Abraham\'s sight', 'He was angry with Sarah', 'He immediately agreed', 'He was indifferent'],
      correctAnswer: 'The thing was very grievous in Abraham\'s sight',
      explanation: 'The thing was very grievous in Abraham\'s sight because of his son.',
      verseReference: 'Genesis 21:11',
      difficulty: 'medium'
    },
    {
      id: 'gen21-q9',
      question: 'Complete God\'s instruction to Abraham: "Let it not be grievous in thy sight because of the lad, and because of thy bondwoman; in all that Sarah hath said unto thee, ______ unto her voice."',
      type: 'multiple-choice',
      options: ['hearken', 'listen', 'obey', 'yield'],
      correctAnswer: 'hearken',
      explanation: 'God told Abraham to hearken unto Sarah\'s voice in this matter.',
      verseReference: 'Genesis 21:12',
      difficulty: 'easy'
    },
    {
      id: 'gen21-q10',
      question: 'God promised to make Ishmael a great nation because he was Abraham\'s seed.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'God said "also of the son of the bondwoman will I make a nation, because he is thy seed."',
      verseReference: 'Genesis 21:13',
      difficulty: 'easy'
    },
    {
      id: 'gen21-q11',
      question: 'What did Abraham give to Hagar when he sent her away?',
      type: 'multiple-choice',
      options: ['Bread and a bottle of water', 'Gold and silver', 'Servants and animals', 'Clothes and food'],
      correctAnswer: 'Bread and a bottle of water',
      explanation: 'Abraham rose up early in the morning and took bread and a bottle of water and gave it unto Hagar.',
      verseReference: 'Genesis 21:14',
      difficulty: 'medium'
    },
    {
      id: 'gen21-q12',
      question: 'Hagar wandered in the wilderness of Beersheba.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'She departed and wandered in the wilderness of Beersheba.',
      verseReference: 'Genesis 21:14',
      difficulty: 'easy'
    },
    {
      id: 'gen21-q13',
      question: 'What happened when the water was spent?',
      type: 'multiple-choice',
      options: ['She cast the child under one of the shrubs', 'She cried out to God', 'She started looking for help', 'She returned to Abraham'],
      correctAnswer: 'She cast the child under one of the shrubs',
      explanation: 'When the water was spent, she cast the child under one of the shrubs.',
      verseReference: 'Genesis 21:15',
      difficulty: 'medium'
    },
    {
      id: 'gen21-q14',
      question: 'Why did Hagar sit away from Ishmael?',
      type: 'fill-blank',
      correctAnswer: 'death',
      explanation: 'She said "Let me not see the death of the child" and sat apart from him.',
      verseReference: 'Genesis 21:16',
      difficulty: 'medium'
    },
    {
      id: 'gen21-q15',
      question: 'From where did the angel of God call to Hagar?',
      type: 'fill-blank',
      correctAnswer: 'heaven',
      explanation: 'The angel of God called to Hagar out of heaven and comforted her.',
      verseReference: 'Genesis 21:17',
      difficulty: 'easy'
    },
    {
      id: 'gen21-q16',
      question: 'What did God open for Hagar when she was in distress?',
      type: 'multiple-choice',
      options: ['A well of water', 'A path through the wilderness', 'The heavens', 'Her understanding'],
      correctAnswer: 'A well of water',
      explanation: 'God opened her eyes and she saw a well of water.',
      verseReference: 'Genesis 21:19',
      difficulty: 'easy'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-21-quiz',
  tags: ['isaac', 'birth', 'sarah', 'ishmael', 'hagar', 'abraham', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// All available Genesis chapter quizzes for export
export const ALL_GENESIS_EXTENDED_QUIZZES = [
  GENESIS_7_QUIZ,
  GENESIS_8_QUIZ,
  GENESIS_9_QUIZ,
  GENESIS_10_QUIZ,
  GENESIS_11_QUIZ,
  GENESIS_12_QUIZ,
  GENESIS_13_QUIZ,
  GENESIS_14_QUIZ,
  GENESIS_15_QUIZ,
  GENESIS_16_QUIZ,
  GENESIS_17_QUIZ,
  GENESIS_18_QUIZ,
  GENESIS_19_QUIZ,
  GENESIS_20_QUIZ,
  GENESIS_21_QUIZ
];