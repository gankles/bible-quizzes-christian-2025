import { Quiz, QuizQuestion } from './types';

// Genesis Chapter 22 Quiz - Sacrifice of Isaac
export const GENESIS_22_QUIZ: Quiz = {
  id: 'genesis-22',
  title: 'Genesis Chapter 22 Quiz',
  description: 'Test your knowledge of Genesis chapter 22, covering Abraham\'s ultimate test of faith, the sacrifice of Isaac, and God\'s provision of a ram.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 22,
  questions: [
    {
      id: 'gen22-q1',
      question: 'What did God ask Abraham to do with Isaac?',
      type: 'multiple-choice',
      options: ['Take him and offer him for a burnt offering', 'Send him away like Ishmael', 'Dedicate him to God\'s service', 'Teach him about God'],
      correctAnswer: 'Take him and offer him for a burnt offering',
      explanation: 'God said "Take now thy son, thine only son Isaac, whom thou lovest, and get thee into the land of Moriah; and offer him there for a burnt offering."',
      verseReference: 'Genesis 22:2',
      difficulty: 'easy'
    },
    {
      id: 'gen22-q2',
      question: 'Abraham rose up early in the morning to obey God.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Abraham rose up early in the morning and saddled his donkey and took two young men with him, and Isaac his son.',
      verseReference: 'Genesis 22:3',
      difficulty: 'easy'
    },
    {
      id: 'gen22-q3',
      question: 'How many days did Abraham journey before seeing the place?',
      type: 'multiple-choice',
      options: ['Three days', 'Two days', 'Four days', 'One day'],
      correctAnswer: 'Three days',
      explanation: 'On the third day Abraham lifted up his eyes and saw the place afar off.',
      verseReference: 'Genesis 22:4',
      difficulty: 'medium'
    },
    {
      id: 'gen22-q4',
      question: 'What did Abraham tell his young men to do?',
      type: 'multiple-choice',
      options: ['Abide here while I and the lad go worship', 'Come with us to the mountain', 'Return home and wait', 'Guard our possessions'],
      correctAnswer: 'Abide here while I and the lad go worship',
      explanation: 'Abraham said "Abide ye here with the ass; and I and the lad will go yonder and worship, and come again to you."',
      verseReference: 'Genesis 22:5',
      difficulty: 'medium'
    },
    {
      id: 'gen22-q5',
      question: 'Complete this phrase: "And Abraham took the wood of the burnt offering, and laid it upon ______ his son."',
      type: 'multiple-choice',
      options: ['Isaac', 'the donkey', 'his servants', 'himself'],
      correctAnswer: 'Isaac',
      explanation: 'Abraham laid the wood upon Isaac his son, while he himself took the fire and the knife.',
      verseReference: 'Genesis 22:6',
      difficulty: 'easy'
    },
    {
      id: 'gen22-q6',
      question: 'Isaac asked Abraham where the lamb for the burnt offering was.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Isaac said "My father: behold the fire and the wood: but where is the lamb for a burnt offering?"',
      verseReference: 'Genesis 22:7',
      difficulty: 'easy'
    },
    {
      id: 'gen22-q7',
      question: 'How did Abraham answer Isaac\'s question about the sacrifice?',
      type: 'multiple-choice',
      options: ['God will provide himself a lamb', 'We will find one on the mountain', 'You are the sacrifice', 'I have brought one'],
      correctAnswer: 'God will provide himself a lamb',
      explanation: 'Abraham said "My son, God will provide himself a lamb for a burnt offering."',
      verseReference: 'Genesis 22:8',
      difficulty: 'easy'
    },
    {
      id: 'gen22-q8',
      question: 'What did Abraham do when they reached the place?',
      type: 'multiple-choice',
      options: ['Built an altar and laid the wood in order', 'Prayed for guidance', 'Looked for a lamb', 'Sent Isaac away'],
      correctAnswer: 'Built an altar and laid the wood in order',
      explanation: 'Abraham built an altar there and laid the wood in order, and bound Isaac his son.',
      verseReference: 'Genesis 22:9',
      difficulty: 'medium'
    },
    {
      id: 'gen22-q9',
      question: 'Complete this phrase: "And Abraham stretched forth his hand, and took the ______ to slay his son."',
      type: 'multiple-choice',
      options: ['knife', 'sword', 'stone', 'fire'],
      correctAnswer: 'knife',
      explanation: 'Abraham took the knife to slay his son, showing his complete obedience to God.',
      verseReference: 'Genesis 22:10',
      difficulty: 'easy'
    },
    {
      id: 'gen22-q10',
      question: 'An angel of the Lord called to Abraham from heaven.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The angel of the Lord called unto him out of heaven and said "Abraham, Abraham."',
      verseReference: 'Genesis 22:11',
      difficulty: 'easy'
    },
    {
      id: 'gen22-q11',
      question: 'What did the angel tell Abraham not to do?',
      type: 'multiple-choice',
      options: ['Lay not thine hand upon the lad', 'Do not fear', 'Do not look back', 'Do not doubt'],
      correctAnswer: 'Lay not thine hand upon the lad',
      explanation: 'The angel said "Lay not thine hand upon the lad, neither do thou any thing unto him."',
      verseReference: 'Genesis 22:12',
      difficulty: 'easy'
    },
    {
      id: 'gen22-q12',
      question: 'Why did God stop Abraham from sacrificing Isaac?',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'God said "now I know that thou fearest God, seeing thou hast not withheld thy son, thine only son from me."',
      verseReference: 'Genesis 22:12',
      difficulty: 'medium'
    },
    {
      id: 'gen22-q13',
      question: 'What did Abraham see caught in a thicket?',
      type: 'multiple-choice',
      options: ['A ram caught by his horns', 'A lamb', 'A goat', 'A dove'],
      correctAnswer: 'A ram caught by his horns',
      explanation: 'Abraham lifted up his eyes and looked, and behold behind him a ram caught in a thicket by his horns.',
      verseReference: 'Genesis 22:13',
      difficulty: 'easy'
    },
    {
      id: 'gen22-q14',
      question: 'What name did Abraham give to the place?',
      type: 'fill-blank',
      correctAnswer: 'Jehovahjireh',
      explanation: 'Abraham called the name of that place Jehovahjireh, meaning "The Lord will provide."',
      verseReference: 'Genesis 22:14',
      difficulty: 'medium'
    },
    {
      id: 'gen22-q15',
      question: 'What did the angel promise about Abraham\'s seed?',
      type: 'fill-blank',
      correctAnswer: 'stars',
      explanation: 'The angel said "I will multiply thy seed as the stars of the heaven, and as the sand which is upon the sea shore."',
      verseReference: 'Genesis 22:17',
      difficulty: 'medium'
    },
    {
      id: 'gen22-q16',
      question: 'Through Abraham\'s seed, what would happen to all nations?',
      type: 'multiple-choice',
      options: ['All nations of the earth shall be blessed', 'All nations would serve them', 'All nations would fear them', 'All nations would know God'],
      correctAnswer: 'All nations of the earth shall be blessed',
      explanation: 'God promised "in thy seed shall all the nations of the earth be blessed; because thou hast obeyed my voice."',
      verseReference: 'Genesis 22:18',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-22-quiz',
  tags: ['abraham', 'isaac', 'sacrifice', 'faith', 'obedience', 'moriah', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 25 Quiz - Death of Abraham and Birth of Esau and Jacob
export const GENESIS_25_QUIZ: Quiz = {
  id: 'genesis-25',
  title: 'Genesis Chapter 25 Quiz',
  description: 'Test your knowledge of Genesis chapter 25, covering Abraham\'s death, the birth of Esau and Jacob, and Esau\'s sale of his birthright.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 25,
  questions: [
    {
      id: 'gen25-q1',
      question: 'Who did Abraham take as a wife after Sarah died?',
      type: 'multiple-choice',
      options: ['Keturah', 'Hagar', 'Rebekah', 'Rachel'],
      correctAnswer: 'Keturah',
      explanation: 'Then again Abraham took a wife, and her name was Keturah.',
      verseReference: 'Genesis 25:1',
      difficulty: 'medium'
    },
    {
      id: 'gen25-q2',
      question: 'Abraham had more children after Isaac.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Keturah bore Abraham several sons: Zimran, Jokshan, Medan, Midian, Ishbak, and Shuah.',
      verseReference: 'Genesis 25:2',
      difficulty: 'easy'
    },
    {
      id: 'gen25-q3',
      question: 'What did Abraham give to Isaac?',
      type: 'multiple-choice',
      options: ['All that he had', 'Half of his possessions', 'The land of Canaan', 'His blessing only'],
      correctAnswer: 'All that he had',
      explanation: 'Abraham gave all that he had unto Isaac.',
      verseReference: 'Genesis 25:5',
      difficulty: 'easy'
    },
    {
      id: 'gen25-q4',
      question: 'How old was Abraham when he died?',
      type: 'multiple-choice',
      options: ['175 years', '180 years', '170 years', '165 years'],
      correctAnswer: '175 years',
      explanation: 'These are the days of the years of Abraham\'s life which he lived, an hundred threescore and fifteen years.',
      verseReference: 'Genesis 25:7',
      difficulty: 'medium'
    },
    {
      id: 'gen25-q5',
      question: 'Complete this phrase about Abraham\'s death: "Then Abraham gave up the ghost, and died in a good ______, an old man, and full of years."',
      type: 'multiple-choice',
      options: ['old age', 'condition', 'spirit', 'state'],
      correctAnswer: 'old age',
      explanation: 'Abraham died in a good old age, an old man, and full of years, and was gathered to his people.',
      verseReference: 'Genesis 25:8',
      difficulty: 'easy'
    },
    {
      id: 'gen25-q6',
      question: 'Isaac and Ishmael buried Abraham together.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'His sons Isaac and Ishmael buried him in the cave of Machpelah.',
      verseReference: 'Genesis 25:9',
      difficulty: 'easy'
    },
    {
      id: 'gen25-q7',
      question: 'Where was Abraham buried?',
      type: 'multiple-choice',
      options: ['In the cave of Machpelah', 'In Hebron', 'In Beersheba', 'In the field of Mamre'],
      correctAnswer: 'In the cave of Machpelah',
      explanation: 'Abraham was buried in the cave of Machpelah, in the field of Ephron the son of Zohar the Hittite.',
      verseReference: 'Genesis 25:9',
      difficulty: 'medium'
    },
    {
      id: 'gen25-q8',
      question: 'How long was Rebekah barren before she conceived?',
      type: 'multiple-choice',
      options: ['20 years', '15 years', '10 years', '25 years'],
      correctAnswer: '20 years',
      explanation: 'Isaac was forty years old when he took Rebekah to wife, and sixty when she bore twins - 20 years of barrenness.',
      verseReference: 'Genesis 25:20, 26',
      difficulty: 'hard'
    },
    {
      id: 'gen25-q9',
      question: 'Complete this phrase about Rebekah\'s pregnancy: "And the children ______ together within her."',
      type: 'multiple-choice',
      options: ['struggled', 'moved', 'fought', 'played'],
      correctAnswer: 'struggled',
      explanation: 'The children struggled together within her, causing her to inquire of the Lord.',
      verseReference: 'Genesis 25:22',
      difficulty: 'easy'
    },
    {
      id: 'gen25-q10',
      question: 'God told Rebekah that two nations were in her womb.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The Lord said "Two nations are in thy womb, and two manner of people shall be separated from thy bowels."',
      verseReference: 'Genesis 25:23',
      difficulty: 'easy'
    },
    {
      id: 'gen25-q11',
      question: 'What did God say about the older and younger sons?',
      type: 'multiple-choice',
      options: ['The elder shall serve the younger', 'The younger shall serve the elder', 'They shall serve each other', 'They shall rule together'],
      correctAnswer: 'The elder shall serve the younger',
      explanation: 'God said "the elder shall serve the younger," reversing the normal order.',
      verseReference: 'Genesis 25:23',
      difficulty: 'medium'
    },
    {
      id: 'gen25-q12',
      question: 'The first twin was red and hairy all over.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The first came out red, all over like an hairy garment; and they called his name Esau.',
      verseReference: 'Genesis 25:25',
      difficulty: 'easy'
    },
    {
      id: 'gen25-q13',
      question: 'What was the second twin holding when he was born?',
      type: 'multiple-choice',
      options: ['Esau\'s heel', 'His brother\'s hand', 'A cord', 'Nothing special'],
      correctAnswer: 'Esau\'s heel',
      explanation: 'His hand took hold on Esau\'s heel; and his name was called Jacob.',
      verseReference: 'Genesis 25:26',
      difficulty: 'easy'
    },
    {
      id: 'gen25-q14',
      question: 'What were the occupations of Esau and Jacob?',
      type: 'fill-blank',
      correctAnswer: 'hunter',
      explanation: 'Esau was a cunning hunter, a man of the field; and Jacob was a plain man, dwelling in tents.',
      verseReference: 'Genesis 25:27',
      difficulty: 'medium'
    },
    {
      id: 'gen25-q15',
      question: 'For what did Esau sell his birthright?',
      type: 'fill-blank',
      correctAnswer: 'pottage',
      explanation: 'Esau said "sell me this day thy birthright" for a mess of red pottage (lentil stew).',
      verseReference: 'Genesis 25:31-34',
      difficulty: 'easy'
    },
    {
      id: 'gen25-q16',
      question: 'How did Esau regard his birthright?',
      type: 'multiple-choice',
      options: ['He despised his birthright', 'He valued it highly', 'He was unsure about it', 'He wanted to share it'],
      correctAnswer: 'He despised his birthright',
      explanation: 'Thus Esau despised his birthright, showing his lack of spiritual understanding.',
      verseReference: 'Genesis 25:34',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-25-quiz',
  tags: ['abraham', 'death', 'isaac', 'rebekah', 'esau', 'jacob', 'birthright', 'twins', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 27 Quiz - Jacob Steals Esau's Blessing
export const GENESIS_27_QUIZ: Quiz = {
  id: 'genesis-27',
  title: 'Genesis Chapter 27 Quiz',
  description: 'Test your knowledge of Genesis chapter 27, covering Isaac\'s blessing, Rebekah and Jacob\'s deception, and Esau\'s anger.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 27,
  questions: [
    {
      id: 'gen27-q1',
      question: 'Why did Isaac decide to bless Esau?',
      type: 'multiple-choice',
      options: ['He was old and his eyes were dim', 'Esau asked for the blessing', 'It was the appointed time', 'He was preparing to travel'],
      correctAnswer: 'He was old and his eyes were dim',
      explanation: 'Isaac was old, and his eyes were dim, so that he could not see, and he felt his death approaching.',
      verseReference: 'Genesis 27:1',
      difficulty: 'medium'
    },
    {
      id: 'gen27-q2',
      question: 'Isaac asked Esau to hunt venison and prepare savory meat.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Isaac said to Esau "go out to the field, and take me some venison; And make me savory meat."',
      verseReference: 'Genesis 27:3-4',
      difficulty: 'easy'
    },
    {
      id: 'gen27-q3',
      question: 'Who overheard Isaac\'s instructions to Esau?',
      type: 'multiple-choice',
      options: ['Rebekah', 'Jacob', 'A servant', 'No one'],
      correctAnswer: 'Rebekah',
      explanation: 'Rebekah heard when Isaac spoke to Esau his son.',
      verseReference: 'Genesis 27:5',
      difficulty: 'easy'
    },
    {
      id: 'gen27-q4',
      question: 'What did Rebekah tell Jacob to do?',
      type: 'multiple-choice',
      options: ['Fetch two good kids from the flock', 'Go hunting like Esau', 'Wait for the right time', 'Speak to his father directly'],
      correctAnswer: 'Fetch two good kids from the flock',
      explanation: 'Rebekah said "Go now to the flock, and fetch me from thence two good kids of the goats."',
      verseReference: 'Genesis 27:9',
      difficulty: 'medium'
    },
    {
      id: 'gen27-q5',
      question: 'Complete Jacob\'s concern: "My brother Esau is a ______ man, and I am a smooth man."',
      type: 'multiple-choice',
      options: ['hairy', 'strong', 'rough', 'wild'],
      correctAnswer: 'hairy',
      explanation: 'Jacob worried that his father would feel him and discover the deception because Esau was hairy.',
      verseReference: 'Genesis 27:11',
      difficulty: 'easy'
    },
    {
      id: 'gen27-q6',
      question: 'Jacob feared his father would curse him instead of blessing him.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Jacob said "I shall seem to him as a deceiver; and I shall bring a curse upon me, and not a blessing."',
      verseReference: 'Genesis 27:12',
      difficulty: 'easy'
    },
    {
      id: 'gen27-q7',
      question: 'How did Rebekah respond to Jacob\'s fear of being cursed?',
      type: 'multiple-choice',
      options: ['Upon me be thy curse, my son', 'Don\'t worry about it', 'God will protect you', 'Father won\'t curse you'],
      correctAnswer: 'Upon me be thy curse, my son',
      explanation: 'Rebekah said "Upon me be thy curse, my son: only obey my voice."',
      verseReference: 'Genesis 27:13',
      difficulty: 'medium'
    },
    {
      id: 'gen27-q8',
      question: 'How did Rebekah disguise Jacob\'s hands and neck?',
      type: 'multiple-choice',
      options: ['With the skins of the kids of the goats', 'With Esau\'s gloves', 'With animal fur', 'With rough cloth'],
      correctAnswer: 'With the skins of the kids of the goats',
      explanation: 'She put the skins of the kids of the goats upon his hands and upon the smooth of his neck.',
      verseReference: 'Genesis 27:16',
      difficulty: 'medium'
    },
    {
      id: 'gen27-q9',
      question: 'Complete Jacob\'s lie to his father: "I am ______ thy firstborn."',
      type: 'multiple-choice',
      options: ['Esau', 'thy son', 'thy heir', 'thy beloved'],
      correctAnswer: 'Esau',
      explanation: 'Jacob directly lied to his father, claiming to be Esau his firstborn.',
      verseReference: 'Genesis 27:19',
      difficulty: 'easy'
    },
    {
      id: 'gen27-q10',
      question: 'Isaac was suspicious about how quickly the venison was obtained.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Isaac said "How is it that thou hast found it so quickly, my son?"',
      verseReference: 'Genesis 27:20',
      difficulty: 'easy'
    },
    {
      id: 'gen27-q11',
      question: 'What did Jacob say when Isaac asked how he found the venison so quickly?',
      type: 'multiple-choice',
      options: ['The Lord thy God brought it to me', 'I was very lucky today', 'I am a skilled hunter', 'The animals were abundant'],
      correctAnswer: 'The Lord thy God brought it to me',
      explanation: 'Jacob blasphemously attributed his deception to God\'s help.',
      verseReference: 'Genesis 27:20',
      difficulty: 'medium'
    },
    {
      id: 'gen27-q12',
      question: 'Isaac felt Jacob\'s hands to test if he was really Esau.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Isaac said "Come near, I pray thee, that I may feel thee, my son, whether thou be my very son Esau or not."',
      verseReference: 'Genesis 27:21',
      difficulty: 'easy'
    },
    {
      id: 'gen27-q13',
      question: 'What did Isaac say about Jacob\'s voice and hands?',
      type: 'multiple-choice',
      options: ['The voice is Jacob\'s voice, but the hands are Esau\'s', 'Everything seems like Esau', 'The voice is different but hands are right', 'Something is not right'],
      correctAnswer: 'The voice is Jacob\'s voice, but the hands are Esau\'s',
      explanation: 'Isaac said "The voice is Jacob\'s voice, but the hands are the hands of Esau."',
      verseReference: 'Genesis 27:22',
      difficulty: 'easy'
    },
    {
      id: 'gen27-q14',
      question: 'What convinced Isaac that this was Esau?',
      type: 'fill-blank',
      correctAnswer: 'smell',
      explanation: 'Isaac smelled the smell of Esau\'s raiment and was convinced, saying "See, the smell of my son is as the smell of a field which the Lord hath blessed."',
      verseReference: 'Genesis 27:27',
      difficulty: 'medium'
    },
    {
      id: 'gen27-q15',
      question: 'What did Isaac promise Jacob in the blessing?',
      type: 'fill-blank',
      correctAnswer: 'nations',
      explanation: 'Isaac blessed him saying "let people serve thee, and nations bow down to thee: be lord over thy brethren."',
      verseReference: 'Genesis 27:29',
      difficulty: 'hard'
    },
    {
      id: 'gen27-q16',
      question: 'How did Esau react when he discovered Jacob had stolen his blessing?',
      type: 'multiple-choice',
      options: ['He cried with a great and exceeding bitter cry', 'He was quietly disappointed', 'He accepted it calmly', 'He laughed at the situation'],
      correctAnswer: 'He cried with a great and exceeding bitter cry',
      explanation: 'When Esau heard the words of his father, he cried with a great and exceeding bitter cry.',
      verseReference: 'Genesis 27:34',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-27-quiz',
  tags: ['isaac', 'jacob', 'esau', 'rebekah', 'blessing', 'deception', 'birthright', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 28 Quiz - Jacob's Ladder
export const GENESIS_28_QUIZ: Quiz = {
  id: 'genesis-28',
  title: 'Genesis Chapter 28 Quiz',
  description: 'Test your knowledge of Genesis chapter 28, covering Jacob\'s departure from home, his dream of the ladder to heaven, and God\'s promises to him.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 28,
  questions: [
    {
      id: 'gen28-q1',
      question: 'Why did Isaac send Jacob away?',
      type: 'multiple-choice',
      options: ['To find a wife from his mother\'s family', 'Because of Esau\'s anger', 'To escape Rebekah\'s influence', 'To learn about business'],
      correctAnswer: 'To find a wife from his mother\'s family',
      explanation: 'Isaac charged Jacob saying "Thou shalt not take a wife of the daughters of Canaan. Go to Padan-aram, to the house of Bethuel thy mother\'s father."',
      verseReference: 'Genesis 28:1-2',
      difficulty: 'medium'
    },
    {
      id: 'gen28-q2',
      question: 'Isaac blessed Jacob before he departed.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Isaac blessed Jacob and gave him the blessing of Abraham before sending him away.',
      verseReference: 'Genesis 28:3-4',
      difficulty: 'easy'
    },
    {
      id: 'gen28-q3',
      question: 'What did Esau do when he saw that Isaac had blessed Jacob?',
      type: 'multiple-choice',
      options: ['He took a wife from Ishmael\'s daughters', 'He pursued Jacob', 'He complained to his parents', 'He left home as well'],
      correctAnswer: 'He took a wife from Ishmael\'s daughters',
      explanation: 'Esau went unto Ishmael and took Mahalath the daughter of Ishmael to be his wife.',
      verseReference: 'Genesis 28:9',
      difficulty: 'medium'
    },
    {
      id: 'gen28-q4',
      question: 'Where did Jacob stop for the night on his journey?',
      type: 'multiple-choice',
      options: ['A certain place where the sun had set', 'An inn along the way', 'His relative\'s house', 'A city'],
      correctAnswer: 'A certain place where the sun had set',
      explanation: 'Jacob came to a certain place and tarried there all night because the sun was set.',
      verseReference: 'Genesis 28:11',
      difficulty: 'medium'
    },
    {
      id: 'gen28-q5',
      question: 'Complete this phrase: "And he took of the stones of that place, and put them for his ______, and lay down in that place to sleep."',
      type: 'multiple-choice',
      options: ['pillows', 'protection', 'altar', 'covering'],
      correctAnswer: 'pillows',
      explanation: 'Jacob used stones of that place for his pillows and lay down to sleep.',
      verseReference: 'Genesis 28:11',
      difficulty: 'easy'
    },
    {
      id: 'gen28-q6',
      question: 'Jacob dreamed of a ladder reaching to heaven.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Jacob dreamed, and behold a ladder set up on the earth, and the top of it reached to heaven.',
      verseReference: 'Genesis 28:12',
      difficulty: 'easy'
    },
    {
      id: 'gen28-q7',
      question: 'Who was ascending and descending on the ladder?',
      type: 'multiple-choice',
      options: ['The angels of God', 'People from earth', 'Jacob himself', 'Heavenly beings'],
      correctAnswer: 'The angels of God',
      explanation: 'Behold the angels of God ascending and descending on it.',
      verseReference: 'Genesis 28:12',
      difficulty: 'easy'
    },
    {
      id: 'gen28-q8',
      question: 'Who stood above the ladder and spoke to Jacob?',
      type: 'multiple-choice',
      options: ['The Lord', 'An angel', 'Abraham', 'Isaac'],
      correctAnswer: 'The Lord',
      explanation: 'Behold, the Lord stood above it and said "I am the Lord God of Abraham thy father, and the God of Isaac."',
      verseReference: 'Genesis 28:13',
      difficulty: 'easy'
    },
    {
      id: 'gen28-q9',
      question: 'Complete God\'s promise: "And thy seed shall be as the ______ of the earth."',
      type: 'multiple-choice',
      options: ['dust', 'stars', 'sand', 'stones'],
      correctAnswer: 'dust',
      explanation: 'God promised Jacob that his seed would be as the dust of the earth.',
      verseReference: 'Genesis 28:14',
      difficulty: 'easy'
    },
    {
      id: 'gen28-q10',
      question: 'God promised to be with Jacob wherever he went.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'God said "Behold, I am with thee, and will keep thee in all places whither thou goest."',
      verseReference: 'Genesis 28:15',
      difficulty: 'easy'
    },
    {
      id: 'gen28-q11',
      question: 'What was Jacob\'s reaction when he awoke from his dream?',
      type: 'multiple-choice',
      options: ['He was afraid and said this place is awesome', 'He was confused and puzzled', 'He was happy and rejoiced', 'He was skeptical about the dream'],
      correctAnswer: 'He was afraid and said this place is awesome',
      explanation: 'Jacob was afraid and said "How dreadful is this place! this is none other but the house of God, and this is the gate of heaven."',
      verseReference: 'Genesis 28:17',
      difficulty: 'medium'
    },
    {
      id: 'gen28-q12',
      question: 'Jacob set up the stone he had used as a pillow.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Jacob took the stone that he had put for his pillows and set it up for a pillar.',
      verseReference: 'Genesis 28:18',
      difficulty: 'easy'
    },
    {
      id: 'gen28-q13',
      question: 'What did Jacob pour on top of the stone pillar?',
      type: 'multiple-choice',
      options: ['Oil', 'Water', 'Wine', 'Honey'],
      correctAnswer: 'Oil',
      explanation: 'Jacob poured oil upon the top of it, consecrating the place.',
      verseReference: 'Genesis 28:18',
      difficulty: 'medium'
    },
    {
      id: 'gen28-q14',
      question: 'What name did Jacob give to the place?',
      type: 'fill-blank',
      correctAnswer: 'Bethel',
      explanation: 'Jacob called the name of that place Beth-el, meaning "house of God."',
      verseReference: 'Genesis 28:19',
      difficulty: 'easy'
    },
    {
      id: 'gen28-q15',
      question: 'What did Jacob vow to give to God?',
      type: 'fill-blank',
      correctAnswer: 'tenth',
      explanation: 'Jacob vowed "of all that thou shalt give me I will surely give the tenth unto thee."',
      verseReference: 'Genesis 28:22',
      difficulty: 'medium'
    },
    {
      id: 'gen28-q16',
      question: 'Jacob\'s vow was conditional on God\'s protection and provision.',
      type: 'multiple-choice',
      options: ['True', 'False', 'Partially true', 'Not mentioned'],
      correctAnswer: 'True',
      explanation: 'Jacob made his vow conditional: "If God will be with me, and will keep me in this way that I go, and will give me bread to eat, and raiment to put on..."',
      verseReference: 'Genesis 28:20-22',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-28-quiz',
  tags: ['jacob', 'ladder', 'dream', 'bethel', 'angels', 'gods-promise', 'vow', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 37 Quiz - Joseph's Dreams and Betrayal
export const GENESIS_37_QUIZ: Quiz = {
  id: 'genesis-37',
  title: 'Genesis Chapter 37 Quiz',
  description: 'Test your knowledge of Genesis chapter 37, covering Joseph\'s special coat, his dreams, and his brothers\' jealousy that led to selling him into slavery.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 37,
  questions: [
    {
      id: 'gen37-q1',
      question: 'Why did Jacob love Joseph more than all his children?',
      type: 'multiple-choice',
      options: ['He was the son of his old age', 'He was the most obedient', 'He was the strongest', 'He was the wisest'],
      correctAnswer: 'He was the son of his old age',
      explanation: 'Israel loved Joseph more than all his children, because he was the son of his old age.',
      verseReference: 'Genesis 37:3',
      difficulty: 'easy'
    },
    {
      id: 'gen37-q2',
      question: 'Jacob made Joseph a coat of many colors.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Jacob made him a coat of many colours, showing his special favor.',
      verseReference: 'Genesis 37:3',
      difficulty: 'easy'
    },
    {
      id: 'gen37-q3',
      question: 'How did Joseph\'s brothers react to their father\'s favoritism?',
      type: 'multiple-choice',
      options: ['They hated him and could not speak peaceably to him', 'They were slightly jealous', 'They accepted it graciously', 'They complained to their father'],
      correctAnswer: 'They hated him and could not speak peaceably to him',
      explanation: 'When his brothers saw that their father loved him more, they hated him and could not speak peaceably unto him.',
      verseReference: 'Genesis 37:4',
      difficulty: 'easy'
    },
    {
      id: 'gen37-q4',
      question: 'In Joseph\'s first dream, what bowed down to his sheaf?',
      type: 'multiple-choice',
      options: ['His brothers\' sheaves', 'Animals in the field', 'Trees', 'Stars'],
      correctAnswer: 'His brothers\' sheaves',
      explanation: 'Joseph dreamed that his brothers\' sheaves stood round about and made obeisance to his sheaf.',
      verseReference: 'Genesis 37:7',
      difficulty: 'easy'
    },
    {
      id: 'gen37-q5',
      question: 'Complete the brothers\' response: "Shalt thou indeed ______ over us? or shalt thou indeed have ______ over us?"',
      type: 'multiple-choice',
      options: ['reign; dominion', 'rule; power', 'lord; authority', 'king; control'],
      correctAnswer: 'reign; dominion',
      explanation: 'The brothers sarcastically questioned whether Joseph would reign over them or have dominion.',
      verseReference: 'Genesis 37:8',
      difficulty: 'medium'
    },
    {
      id: 'gen37-q6',
      question: 'Joseph\'s second dream made his brothers hate him even more.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'They hated him yet the more for his dreams and for his words.',
      verseReference: 'Genesis 37:8',
      difficulty: 'easy'
    },
    {
      id: 'gen37-q7',
      question: 'In Joseph\'s second dream, what bowed down to him?',
      type: 'multiple-choice',
      options: ['The sun, moon, and eleven stars', 'Twelve animals', 'Trees and plants', 'Rivers and mountains'],
      correctAnswer: 'The sun, moon, and eleven stars',
      explanation: 'Joseph dreamed that the sun and the moon and the eleven stars made obeisance to him.',
      verseReference: 'Genesis 37:9',
      difficulty: 'easy'
    },
    {
      id: 'gen37-q8',
      question: 'How did Jacob react to Joseph\'s second dream?',
      type: 'multiple-choice',
      options: ['He rebuked Joseph but observed the saying', 'He praised Joseph for the dream', 'He ignored the dream completely', 'He was angry and punished Joseph'],
      correctAnswer: 'He rebuked Joseph but observed the saying',
      explanation: 'His father rebuked him and said "What is this dream?" but his father observed the saying.',
      verseReference: 'Genesis 37:10-11',
      difficulty: 'medium'
    },
    {
      id: 'gen37-q9',
      question: 'Complete this phrase: "And his brethren ______ him; but his father observed the saying."',
      type: 'multiple-choice',
      options: ['envied', 'mocked', 'ignored', 'feared'],
      correctAnswer: 'envied',
      explanation: 'His brethren envied him, but his father kept the matter in mind.',
      verseReference: 'Genesis 37:11',
      difficulty: 'easy'
    },
    {
      id: 'gen37-q10',
      question: 'Jacob sent Joseph to check on his brothers who were feeding the flock.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Jacob sent Joseph to see whether it was well with his brothers and the flocks.',
      verseReference: 'Genesis 37:14',
      difficulty: 'easy'
    },
    {
      id: 'gen37-q11',
      question: 'Where did Joseph finally find his brothers?',
      type: 'multiple-choice',
      options: ['Dothan', 'Shechem', 'Hebron', 'Beersheba'],
      correctAnswer: 'Dothan',
      explanation: 'A man told Joseph his brothers had gone to Dothan, and Joseph found them there.',
      verseReference: 'Genesis 37:17',
      difficulty: 'medium'
    },
    {
      id: 'gen37-q12',
      question: 'The brothers plotted to kill Joseph when they saw him coming.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'When they saw him afar off, they conspired against him to slay him.',
      verseReference: 'Genesis 37:18',
      difficulty: 'easy'
    },
    {
      id: 'gen37-q13',
      question: 'What did the brothers mockingly call Joseph?',
      type: 'multiple-choice',
      options: ['This dreamer', 'The favorite son', 'The coat wearer', 'The young master'],
      correctAnswer: 'This dreamer',
      explanation: 'They said "Behold, this dreamer cometh."',
      verseReference: 'Genesis 37:19',
      difficulty: 'easy'
    },
    {
      id: 'gen37-q14',
      question: 'Which brother tried to save Joseph from being killed?',
      type: 'fill-blank',
      correctAnswer: 'Reuben',
      explanation: 'Reuben heard it and delivered him out of their hands, saying "Let us not kill him."',
      verseReference: 'Genesis 37:21',
      difficulty: 'medium'
    },
    {
      id: 'gen37-q15',
      question: 'What did the brothers put Joseph into instead of killing him?',
      type: 'fill-blank',
      correctAnswer: 'pit',
      explanation: 'They cast him into a pit that was empty with no water in it.',
      verseReference: 'Genesis 37:24',
      difficulty: 'easy'
    },
    {
      id: 'gen37-q16',
      question: 'For how much silver did the brothers sell Joseph?',
      type: 'multiple-choice',
      options: ['Twenty pieces', 'Thirty pieces', 'Fifteen pieces', 'Twenty-five pieces'],
      correctAnswer: 'Twenty pieces',
      explanation: 'They sold Joseph to the Ishmeelites for twenty pieces of silver.',
      verseReference: 'Genesis 37:28',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-37-quiz',
  tags: ['joseph', 'dreams', 'coat-of-colors', 'brothers', 'jealousy', 'betrayal', 'slavery', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 39 Quiz - Joseph in Potiphar's House
export const GENESIS_39_QUIZ: Quiz = {
  id: 'genesis-39',
  title: 'Genesis Chapter 39 Quiz',
  description: 'Test your knowledge of Genesis chapter 39, covering Joseph\'s service in Potiphar\'s house, his temptation by Potiphar\'s wife, and his imprisonment.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 39,
  questions: [
    {
      id: 'gen39-q1',
      question: 'Who bought Joseph in Egypt?',
      type: 'multiple-choice',
      options: ['Potiphar, an officer of Pharaoh', 'A merchant from Memphis', 'A priest of On', 'The captain of the prison'],
      correctAnswer: 'Potiphar, an officer of Pharaoh',
      explanation: 'Potiphar, an officer of Pharaoh, captain of the guard, an Egyptian, bought him.',
      verseReference: 'Genesis 39:1',
      difficulty: 'easy'
    },
    {
      id: 'gen39-q2',
      question: 'The Lord was with Joseph and made him prosperous.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The Lord was with Joseph, and he was a prosperous man in the house of his master.',
      verseReference: 'Genesis 39:2',
      difficulty: 'easy'
    },
    {
      id: 'gen39-q3',
      question: 'What did Potiphar observe about Joseph?',
      type: 'multiple-choice',
      options: ['The Lord was with him and made all he did prosper', 'He was very handsome and strong', 'He was well educated', 'He spoke Egyptian fluently'],
      correctAnswer: 'The Lord was with him and made all he did prosper',
      explanation: 'His master saw that the Lord was with him and made all that he did to prosper in his hand.',
      verseReference: 'Genesis 39:3',
      difficulty: 'medium'
    },
    {
      id: 'gen39-q4',
      question: 'What position did Potiphar give to Joseph?',
      type: 'multiple-choice',
      options: ['Overseer of his house', 'Personal servant', 'Field manager', 'Treasurer'],
      correctAnswer: 'Overseer of his house',
      explanation: 'Joseph found grace in his sight and made him overseer over his house.',
      verseReference: 'Genesis 39:4',
      difficulty: 'easy'
    },
    {
      id: 'gen39-q5',
      question: 'Complete this phrase: "And it came to pass from the time that he had made him overseer in his house... that the Lord ______ the Egyptian\'s house for Joseph\'s sake."',
      type: 'multiple-choice',
      options: ['blessed', 'prospered', 'protected', 'favored'],
      correctAnswer: 'blessed',
      explanation: 'The Lord blessed the Egyptian\'s house for Joseph\'s sake.',
      verseReference: 'Genesis 39:5',
      difficulty: 'easy'
    },
    {
      id: 'gen39-q6',
      question: 'Potiphar left everything in Joseph\'s care except his food.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'He left all that he had in Joseph\'s hand and knew not ought he had, save the bread which he did eat.',
      verseReference: 'Genesis 39:6',
      difficulty: 'medium'
    },
    {
      id: 'gen39-q7',
      question: 'How is Joseph described physically?',
      type: 'multiple-choice',
      options: ['Goodly person and well favoured', 'Tall and strong', 'Dark and handsome', 'Young and energetic'],
      correctAnswer: 'Goodly person and well favoured',
      explanation: 'Joseph was a goodly person and well favoured.',
      verseReference: 'Genesis 39:6',
      difficulty: 'medium'
    },
    {
      id: 'gen39-q8',
      question: 'Who tempted Joseph to sin?',
      type: 'multiple-choice',
      options: ['Potiphar\'s wife', 'Other servants', 'Egyptian officials', 'His fellow slaves'],
      correctAnswer: 'Potiphar\'s wife',
      explanation: 'His master\'s wife cast her eyes upon Joseph and said "Lie with me."',
      verseReference: 'Genesis 39:7',
      difficulty: 'easy'
    },
    {
      id: 'gen39-q9',
      question: 'Complete Joseph\'s refusal: "How then can I do this great ______, and sin against God?"',
      type: 'multiple-choice',
      options: ['wickedness', 'evil', 'transgression', 'offense'],
      correctAnswer: 'wickedness',
      explanation: 'Joseph recognized that this would be great wickedness and sin against God.',
      verseReference: 'Genesis 39:9',
      difficulty: 'easy'
    },
    {
      id: 'gen39-q10',
      question: 'Joseph\'s refusal was based primarily on loyalty to Potiphar.',
      type: 'true-false',
      correctAnswer: 'false',
      explanation: 'While Joseph mentioned loyalty to Potiphar, his primary reason was "How... can I... sin against God?"',
      verseReference: 'Genesis 39:9',
      difficulty: 'medium'
    },
    {
      id: 'gen39-q11',
      question: 'How often did Potiphar\'s wife tempt Joseph?',
      type: 'multiple-choice',
      options: ['Day by day', 'Once a week', 'Occasionally', 'Just once'],
      correctAnswer: 'Day by day',
      explanation: 'She spake to Joseph day by day, but he hearkened not unto her.',
      verseReference: 'Genesis 39:10',
      difficulty: 'medium'
    },
    {
      id: 'gen39-q12',
      question: 'Joseph avoided being alone with Potiphar\'s wife.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'He refused to lie by her or to be with her.',
      verseReference: 'Genesis 39:10',
      difficulty: 'easy'
    },
    {
      id: 'gen39-q13',
      question: 'What did Joseph leave behind when he fled from temptation?',
      type: 'multiple-choice',
      options: ['His garment', 'His sandals', 'His tools', 'His belt'],
      correctAnswer: 'His garment',
      explanation: 'He left his garment in her hand and fled, and got him out.',
      verseReference: 'Genesis 39:12',
      difficulty: 'easy'
    },
    {
      id: 'gen39-q14',
      question: 'What false accusation did Potiphar\'s wife make?',
      type: 'fill-blank',
      correctAnswer: 'mock',
      explanation: 'She accused Joseph saying "He came in unto me to mock me" - a false rape accusation.',
      verseReference: 'Genesis 39:17',
      difficulty: 'medium'
    },
    {
      id: 'gen39-q15',
      question: 'Where was Joseph put as punishment?',
      type: 'fill-blank',
      correctAnswer: 'prison',
      explanation: 'His master took him and put him into the prison, a place where the king\'s prisoners were bound.',
      verseReference: 'Genesis 39:20',
      difficulty: 'easy'
    },
    {
      id: 'gen39-q16',
      question: 'Even in prison, what happened to Joseph?',
      type: 'multiple-choice',
      options: ['The Lord was with him and gave him favor', 'He became bitter and angry', 'He planned his escape', 'He gave up hope'],
      correctAnswer: 'The Lord was with him and gave him favor',
      explanation: 'The Lord was with Joseph and showed him mercy, and gave him favour in the sight of the keeper of the prison.',
      verseReference: 'Genesis 39:21',
      difficulty: 'easy'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-39-quiz',
  tags: ['joseph', 'potiphar', 'temptation', 'integrity', 'false-accusation', 'prison', 'faithfulness', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 50 Quiz - Death of Jacob and Joseph
export const GENESIS_50_QUIZ: Quiz = {
  id: 'genesis-50',
  title: 'Genesis Chapter 50 Quiz',
  description: 'Test your knowledge of Genesis chapter 50, covering Jacob\'s death and burial, Joseph\'s forgiveness of his brothers, and Joseph\'s own death.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 50,
  questions: [
    {
      id: 'gen50-q1',
      question: 'What did Joseph do when his father died?',
      type: 'multiple-choice',
      options: ['He fell upon his face and wept and kissed him', 'He immediately called his brothers', 'He sent word to Pharaoh', 'He began funeral preparations'],
      correctAnswer: 'He fell upon his face and wept and kissed him',
      explanation: 'Joseph fell upon his father\'s face, and wept upon him, and kissed him.',
      verseReference: 'Genesis 50:1',
      difficulty: 'easy'
    },
    {
      id: 'gen50-q2',
      question: 'Joseph commanded the physicians to embalm his father.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Joseph commanded his servants the physicians to embalm his father: and the physicians embalmed Israel.',
      verseReference: 'Genesis 50:2',
      difficulty: 'easy'
    },
    {
      id: 'gen50-q3',
      question: 'How many days did the embalming process take?',
      type: 'multiple-choice',
      options: ['40 days', '30 days', '50 days', '70 days'],
      correctAnswer: '40 days',
      explanation: 'Forty days were fulfilled for him; for so are fulfilled the days of those which are embalmed.',
      verseReference: 'Genesis 50:3',
      difficulty: 'medium'
    },
    {
      id: 'gen50-q4',
      question: 'How long did the Egyptians mourn for Jacob?',
      type: 'multiple-choice',
      options: ['70 days', '40 days', '30 days', '60 days'],
      correctAnswer: '70 days',
      explanation: 'The Egyptians mourned for him threescore and ten days (70 days).',
      verseReference: 'Genesis 50:3',
      difficulty: 'medium'
    },
    {
      id: 'gen50-q5',
      question: 'Complete Joseph\'s request to Pharaoh: "My father made me swear, saying... in my grave which I have digged for me in the land of ______, there shalt thou bury me."',
      type: 'multiple-choice',
      options: ['Canaan', 'Egypt', 'Goshen', 'Hebron'],
      correctAnswer: 'Canaan',
      explanation: 'Jacob had made Joseph swear to bury him in Canaan, not in Egypt.',
      verseReference: 'Genesis 50:5',
      difficulty: 'easy'
    },
    {
      id: 'gen50-q6',
      question: 'Pharaoh granted Joseph permission to bury his father in Canaan.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Pharaoh said "Go up, and bury thy father, according as he made thee swear."',
      verseReference: 'Genesis 50:6',
      difficulty: 'easy'
    },
    {
      id: 'gen50-q7',
      question: 'Who went up with Joseph to bury his father?',
      type: 'multiple-choice',
      options: ['All Pharaoh\'s servants, elders of Egypt, and Joseph\'s house', 'Only Joseph\'s brothers', 'Just the immediate family', 'Egyptian officials only'],
      correctAnswer: 'All Pharaoh\'s servants, elders of Egypt, and Joseph\'s house',
      explanation: 'There went up with him all the servants of Pharaoh, the elders of his house, and all the elders of the land of Egypt, and all the house of Joseph.',
      verseReference: 'Genesis 50:7-8',
      difficulty: 'hard'
    },
    {
      id: 'gen50-q8',
      question: 'The funeral procession was described as very great.',
      type: 'multiple-choice',
      options: ['True', 'False', 'Only moderately large', 'Small and private'],
      correctAnswer: 'True',
      explanation: 'It was a very great company, and the Canaanites said "This is a grievous mourning to the Egyptians."',
      verseReference: 'Genesis 50:9, 11',
      difficulty: 'easy'
    },
    {
      id: 'gen50-q9',
      question: 'Complete this phrase: "And when the inhabitants of the land... saw the mourning... they said, This is a ______ mourning to the Egyptians."',
      type: 'multiple-choice',
      options: ['grievous', 'great', 'solemn', 'strange'],
      correctAnswer: 'grievous',
      explanation: 'The Canaanites recognized this as a grievous (severe) mourning.',
      verseReference: 'Genesis 50:11',
      difficulty: 'medium'
    },
    {
      id: 'gen50-q10',
      question: 'Jacob\'s sons buried him in the cave of Machpelah as he commanded.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'His sons did unto him according as he commanded them: for his sons carried him into the land of Canaan, and buried him in the cave of Machpelah.',
      verseReference: 'Genesis 50:12-13',
      difficulty: 'easy'
    },
    {
      id: 'gen50-q11',
      question: 'After Jacob\'s death, what did Joseph\'s brothers fear?',
      type: 'multiple-choice',
      options: ['Joseph will hate us and requite us all the evil we did', 'Joseph will send us away from Egypt', 'Joseph will no longer provide for us', 'Joseph will tell Pharaoh about our past'],
      correctAnswer: 'Joseph will hate us and requite us all the evil we did',
      explanation: 'The brothers said "Joseph will peradventure hate us, and will certainly requite us all the evil which we did unto him."',
      verseReference: 'Genesis 50:15',
      difficulty: 'medium'
    },
    {
      id: 'gen50-q12',
      question: 'The brothers sent a message claiming Jacob had commanded Joseph to forgive them.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'They sent a messenger saying "Thy father did command before he died, saying... forgive the trespass of thy brethren."',
      verseReference: 'Genesis 50:16-17',
      difficulty: 'medium'
    },
    {
      id: 'gen50-q13',
      question: 'How did Joseph respond when his brothers fell down before him?',
      type: 'multiple-choice',
      options: ['Fear not: for am I in the place of God?', 'Rise up, you are forgiven', 'You have nothing to fear from me', 'God has already judged this matter'],
      correctAnswer: 'Fear not: for am I in the place of God?',
      explanation: 'Joseph said "Fear not: for am I in the place of God?" showing humility and recognition of God\'s sovereignty.',
      verseReference: 'Genesis 50:19',
      difficulty: 'medium'
    },
    {
      id: 'gen50-q14',
      question: 'What famous statement did Joseph make about God\'s sovereignty?',
      type: 'fill-blank',
      correctAnswer: 'good',
      explanation: 'Joseph said "But as for you, ye thought evil against me; but God meant it unto good, to bring to pass, as it is this day, to save much people alive."',
      verseReference: 'Genesis 50:20',
      difficulty: 'easy'
    },
    {
      id: 'gen50-q15',
      question: 'How old was Joseph when he died?',
      type: 'fill-blank',
      correctAnswer: '110',
      explanation: 'Joseph lived an hundred and ten years and saw his great-grandchildren.',
      verseReference: 'Genesis 50:22-23',
      difficulty: 'medium'
    },
    {
      id: 'gen50-q16',
      question: 'What did Joseph make his brothers swear before he died?',
      type: 'multiple-choice',
      options: ['To carry his bones up from Egypt when God visits them', 'To remember him always', 'To tell their children about him', 'To build a monument in his honor'],
      correctAnswer: 'To carry his bones up from Egypt when God visits them',
      explanation: 'Joseph took an oath of the children of Israel, saying "God will surely visit you, and ye shall carry up my bones from hence."',
      verseReference: 'Genesis 50:25',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-50-quiz',
  tags: ['jacob', 'death', 'burial', 'joseph', 'forgiveness', 'gods-sovereignty', 'egypt', 'canaan', 'genesis', 'old-testament'],
  totalQuestions: 16,
  estimatedTime: 8
};

// All Part 2 Genesis chapter quizzes for export
export const ALL_GENESIS_PART2_QUIZZES = [
  GENESIS_22_QUIZ,
  GENESIS_25_QUIZ,
  GENESIS_27_QUIZ,
  GENESIS_28_QUIZ,
  GENESIS_37_QUIZ,
  GENESIS_39_QUIZ,
  GENESIS_50_QUIZ
];