import { Quiz, QuizQuestion } from './types';

// Genesis Chapter 23 Quiz - Sarah's Death and Burial
export const GENESIS_23_QUIZ: Quiz = {
  id: 'genesis-23',
  title: 'Genesis Chapter 23 Quiz',
  description: 'Test your knowledge of Genesis chapter 23, covering the death of Sarah, Abraham\'s negotiation for a burial place, and the purchase of the cave of Machpelah.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 23,
  questions: [
    {
      id: 'gen23-q1',
      question: 'How old was Sarah when she died?',
      type: 'multiple-choice',
      options: ['127 years old', '120 years old', '130 years old', '125 years old'],
      correctAnswer: '127 years old',
      explanation: 'Sarah lived one hundred and twenty-seven years; these were the years of the life of Sarah.',
      verseReference: 'Genesis 23:1',
      difficulty: 'medium'
    },
    {
      id: 'gen23-q2',
      question: 'Where did Sarah die?',
      type: 'multiple-choice',
      options: ['Hebron in Canaan', 'Beersheba', 'Jerusalem', 'Egypt'],
      correctAnswer: 'Hebron in Canaan',
      explanation: 'Sarah died in Kirjath-arba, which is Hebron, in the land of Canaan.',
      verseReference: 'Genesis 23:2',
      difficulty: 'medium'
    },
    {
      id: 'gen23-q3',
      question: 'Abraham mourned and wept for Sarah.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Abraham came to mourn for Sarah and to weep for her.',
      verseReference: 'Genesis 23:2',
      difficulty: 'easy'
    },
    {
      id: 'gen23-q4',
      question: 'What did Abraham need to buy for Sarah\'s burial?',
      type: 'multiple-choice',
      options: ['A possession of a burial place', 'A coffin', 'Burial clothes', 'A tomb stone'],
      correctAnswer: 'A possession of a burial place',
      explanation: 'Abraham asked for a possession of a burial place among the Hittites.',
      verseReference: 'Genesis 23:4',
      difficulty: 'easy'
    },
    {
      id: 'gen23-q5',
      question: 'Who owned the field and cave that Abraham wanted to buy?',
      type: 'multiple-choice',
      options: ['Ephron the Hittite', 'Zohar', 'Abimelech', 'Lot'],
      correctAnswer: 'Ephron the Hittite',
      explanation: 'Ephron the Hittite answered Abraham and owned the field and cave.',
      verseReference: 'Genesis 23:10-11',
      difficulty: 'medium'
    },
    {
      id: 'gen23-q6',
      question: 'What was another name for Hebron?',
      type: 'multiple-choice',
      options: ['Kirjath-arba', 'Beersheba', 'Mamre', 'Gerar'],
      correctAnswer: 'Kirjath-arba',
      explanation: 'Sarah died in Kirjath-arba; the same is Hebron in the land of Canaan.',
      verseReference: 'Genesis 23:2',
      difficulty: 'medium'
    },
    {
      id: 'gen23-q7',
      question: 'Abraham was a stranger and sojourner among the Hittites.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Abraham said, "I am a stranger and a sojourner with you."',
      verseReference: 'Genesis 23:4',
      difficulty: 'easy'
    },
    {
      id: 'gen23-q8',
      question: 'How did the children of Heth respond to Abraham\'s request?',
      type: 'multiple-choice',
      options: ['They honored him as a mighty prince', 'They refused his request', 'They demanded high payment', 'They ignored him'],
      correctAnswer: 'They honored him as a mighty prince',
      explanation: 'The children of Heth said, "Thou art a mighty prince among us."',
      verseReference: 'Genesis 23:6',
      difficulty: 'medium'
    },
    {
      id: 'gen23-q9',
      question: 'What was the name of the field Abraham wanted to buy?',
      type: 'multiple-choice',
      options: ['The field of Machpelah', 'The field of Mamre', 'The field of Beersheba', 'The field of Hebron'],
      correctAnswer: 'The field of Machpelah',
      explanation: 'Abraham sought to buy the field of Machpelah, which was at the end of his field.',
      verseReference: 'Genesis 23:9',
      difficulty: 'medium'
    },
    {
      id: 'gen23-q10',
      question: 'Ephron initially offered to give Abraham the field for free.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Ephron said, "The field give I thee, and the cave that is therein, I give it thee."',
      verseReference: 'Genesis 23:11',
      difficulty: 'easy'
    },
    {
      id: 'gen23-q11',
      question: 'How much did Abraham pay for the field?',
      type: 'multiple-choice',
      options: ['400 shekels of silver', '300 shekels of silver', '500 shekels of silver', '200 shekels of silver'],
      correctAnswer: '400 shekels of silver',
      explanation: 'Abraham weighed to Ephron 400 shekels of silver, current money with the merchant.',
      verseReference: 'Genesis 23:16',
      difficulty: 'medium'
    },
    {
      id: 'gen23-q12',
      question: 'The transaction was witnessed by the children of Heth.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The field was made sure unto Abraham in the presence of the children of Heth.',
      verseReference: 'Genesis 23:18',
      difficulty: 'easy'
    },
    {
      id: 'gen23-q13',
      question: 'What did Abraham do after purchasing the field?',
      type: 'multiple-choice',
      options: ['Buried Sarah in the cave', 'Built an altar', 'Planted trees', 'Built a house'],
      correctAnswer: 'Buried Sarah in the cave',
      explanation: 'After this, Abraham buried Sarah his wife in the cave of the field of Machpelah.',
      verseReference: 'Genesis 23:19',
      difficulty: 'easy'
    },
    {
      id: 'gen23-q14',
      question: 'The cave was located before which place?',
      type: 'multiple-choice',
      options: ['Mamre', 'Beersheba', 'Gerar', 'Jerusalem'],
      correctAnswer: 'Mamre',
      explanation: 'Abraham buried Sarah in the cave before Mamre: the same is Hebron in the land of Canaan.',
      verseReference: 'Genesis 23:19',
      difficulty: 'medium'
    },
    {
      id: 'gen23-q15',
      question: 'The field and cave were established as Abraham\'s possession.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The field, and the cave that is therein, were made sure unto Abraham for a possession of a buryingplace.',
      verseReference: 'Genesis 23:20',
      difficulty: 'easy'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-23-quiz',
  tags: ['genesis', 'old-testament', 'abraham', 'sarah', 'burial'],
  totalQuestions: 15,
  estimatedTime: 8
};

// Genesis Chapter 24 Quiz - Finding a Wife for Isaac (67 verses - longest chapter so far)
export const GENESIS_24_QUIZ: Quiz = {
  id: 'genesis-24',
  title: 'Genesis Chapter 24 Quiz',
  description: 'Test your knowledge of Genesis chapter 24, covering Abraham\'s servant finding Rebekah as a wife for Isaac, God\'s providential guidance, and the arranged marriage.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 24,
  questions: [
    {
      id: 'gen24-q1',
      question: 'What did Abraham make his servant swear by?',
      type: 'multiple-choice',
      options: ['The Lord God of heaven and earth', 'His own life', 'Sarah\'s memory', 'Isaac\'s future'],
      correctAnswer: 'The Lord God of heaven and earth',
      explanation: 'Abraham made his servant swear by the Lord, the God of heaven and the God of earth.',
      verseReference: 'Genesis 24:3',
      difficulty: 'medium'
    },
    {
      id: 'gen24-q2',
      question: 'Abraham forbade his servant from taking Isaac back to his homeland.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Abraham specifically told his servant not to bring Isaac back to the land he came from.',
      verseReference: 'Genesis 24:6',
      difficulty: 'easy'
    },
    {
      id: 'gen24-q3',
      question: 'What sign did the servant pray for at the well?',
      type: 'multiple-choice',
      options: ['A woman who would water his camels', 'A beautiful woman', 'A woman from Abraham\'s family', 'A woman who would speak to him first'],
      correctAnswer: 'A woman who would water his camels',
      explanation: 'The servant prayed that the woman who offered to water his camels would be the chosen one for Isaac.',
      verseReference: 'Genesis 24:14',
      difficulty: 'easy'
    },
    {
      id: 'gen24-q4',
      question: 'Who was Rebekah\'s father?',
      type: 'multiple-choice',
      options: ['Bethuel', 'Nahor', 'Laban', 'Milcah'],
      correctAnswer: 'Bethuel',
      explanation: 'Rebekah was the daughter of Bethuel, son of Milcah and Nahor.',
      verseReference: 'Genesis 24:15',
      difficulty: 'medium'
    },
    {
      id: 'gen24-q5',
      question: 'How many camels did the servant take on his journey?',
      type: 'multiple-choice',
      options: ['Ten camels', 'Five camels', 'Twelve camels', 'Seven camels'],
      correctAnswer: 'Ten camels',
      explanation: 'The servant took ten camels of the camels of his master and departed.',
      verseReference: 'Genesis 24:10',
      difficulty: 'medium'
    },
    {
      id: 'gen24-q6',
      question: 'Where did the servant go to find a wife for Isaac?',
      type: 'multiple-choice',
      options: ['Mesopotamia, to Nahor\'s city', 'Egypt', 'The land of the Philistines', 'Sodom'],
      correctAnswer: 'Mesopotamia, to Nahor\'s city',
      explanation: 'The servant went to Mesopotamia, unto the city of Nahor.',
      verseReference: 'Genesis 24:10',
      difficulty: 'medium'
    },
    {
      id: 'gen24-q7',
      question: 'The servant prayed at the well in the evening.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The servant made his camels kneel down by the well of water at the time of evening.',
      verseReference: 'Genesis 24:11',
      difficulty: 'easy'
    },
    {
      id: 'gen24-q8',
      question: 'What did the servant give Rebekah after she watered the camels?',
      type: 'multiple-choice',
      options: ['A golden earring and bracelets', 'Silver coins', 'A ring and necklace', 'Food and drink'],
      correctAnswer: 'A golden earring and bracelets',
      explanation: 'The man took a golden earring and two bracelets for her hands.',
      verseReference: 'Genesis 24:22',
      difficulty: 'medium'
    },
    {
      id: 'gen24-q9',
      question: 'How much did the golden earring weigh?',
      type: 'multiple-choice',
      options: ['Half a shekel', 'One shekel', 'Two shekels', 'Three shekels'],
      correctAnswer: 'Half a shekel',
      explanation: 'The earring was of half a shekel weight.',
      verseReference: 'Genesis 24:22',
      difficulty: 'hard'
    },
    {
      id: 'gen24-q10',
      question: 'Rebekah\'s brother\'s name was Laban.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Rebekah had a brother, and his name was Laban.',
      verseReference: 'Genesis 24:29',
      difficulty: 'easy'
    },
    {
      id: 'gen24-q11',
      question: 'What did Laban do when he saw the gifts?',
      type: 'multiple-choice',
      options: ['Ran out to meet the servant', 'Refused to meet him', 'Asked for more gifts', 'Called the elders'],
      correctAnswer: 'Ran out to meet the servant',
      explanation: 'When Laban saw the earring and bracelets, he ran out unto the man.',
      verseReference: 'Genesis 24:30',
      difficulty: 'medium'
    },
    {
      id: 'gen24-q12',
      question: 'The servant refused to eat until he told his errand.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The servant said, "I will not eat, until I have told mine errand."',
      verseReference: 'Genesis 24:33',
      difficulty: 'easy'
    },
    {
      id: 'gen24-q13',
      question: 'Who was the servant that Abraham sent?',
      type: 'multiple-choice',
      options: ['His eldest servant, ruler of his house', 'His youngest servant', 'A hired servant', 'His son\'s servant'],
      correctAnswer: 'His eldest servant, ruler of his house',
      explanation: 'Abraham said unto his eldest servant of his house, that ruled over all that he had.',
      verseReference: 'Genesis 24:2',
      difficulty: 'medium'
    },
    {
      id: 'gen24-q14',
      question: 'How long did they want Rebekah to stay before leaving?',
      type: 'multiple-choice',
      options: ['At least ten days', 'One month', 'One week', 'One year'],
      correctAnswer: 'At least ten days',
      explanation: 'Her brother and mother said, "Let the damsel abide with us a few days, at the least ten."',
      verseReference: 'Genesis 24:55',
      difficulty: 'medium'
    },
    {
      id: 'gen24-q15',
      question: 'What was Isaac doing when Rebekah first saw him?',
      type: 'multiple-choice',
      options: ['Meditating in the field', 'Tending sheep', 'Building an altar', 'Drawing water'],
      correctAnswer: 'Meditating in the field',
      explanation: 'Isaac went out to meditate in the field at the eventide.',
      verseReference: 'Genesis 24:63',
      difficulty: 'medium'
    },
    {
      id: 'gen24-q16',
      question: 'Rebekah covered herself with a veil when she saw Isaac.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'When Rebekah saw Isaac, she lighted off the camel and took a veil and covered herself.',
      verseReference: 'Genesis 24:64-65',
      difficulty: 'easy'
    },
    {
      id: 'gen24-q17',
      question: 'What did Isaac do after marrying Rebekah?',
      type: 'multiple-choice',
      options: ['Brought her into Sarah\'s tent and loved her', 'Built a house for her', 'Gave her many gifts', 'Took her to meet Abraham'],
      correctAnswer: 'Brought her into Sarah\'s tent and loved her',
      explanation: 'Isaac brought her into his mother Sarah\'s tent, and took Rebekah, and she became his wife; and he loved her.',
      verseReference: 'Genesis 24:67',
      difficulty: 'medium'
    },
    {
      id: 'gen24-q18',
      question: 'Isaac was comforted after his mother\'s death through his marriage to Rebekah.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Isaac was comforted after his mother\'s death.',
      verseReference: 'Genesis 24:67',
      difficulty: 'easy'
    },
    {
      id: 'gen24-q19',
      question: 'What city did Nahor live in?',
      type: 'multiple-choice',
      options: ['The city of Nahor', 'Haran', 'Ur', 'Damascus'],
      correctAnswer: 'The city of Nahor',
      explanation: 'The servant went to Mesopotamia, unto the city of Nahor.',
      verseReference: 'Genesis 24:10',
      difficulty: 'hard'
    },
    {
      id: 'gen24-q20',
      question: 'Rebekah was very beautiful and a virgin.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The damsel was very fair to look upon, a virgin, neither had any man known her.',
      verseReference: 'Genesis 24:16',
      difficulty: 'easy'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-24-quiz',
  tags: ['genesis', 'old-testament', 'isaac', 'rebekah', 'marriage', 'providence'],
  totalQuestions: 20,
  estimatedTime: 10
};

// Genesis Chapter 26 Quiz - Isaac and the Philistines
export const GENESIS_26_QUIZ: Quiz = {
  id: 'genesis-26',
  title: 'Genesis Chapter 26 Quiz',
  description: 'Test your knowledge of Genesis chapter 26, covering Isaac during the famine, his stay with Abimelech, the covenant promises renewed, and conflicts over wells.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 26,
  questions: [
    {
      id: 'gen26-q1',
      question: 'Why did Isaac go to Gerar?',
      type: 'multiple-choice',
      options: ['Because of a famine in the land', 'To visit Abimelech', 'To find a wife', 'To trade goods'],
      correctAnswer: 'Because of a famine in the land',
      explanation: 'There was a famine in the land, so Isaac went to Abimelech king of the Philistines in Gerar.',
      verseReference: 'Genesis 26:1',
      difficulty: 'easy'
    },
    {
      id: 'gen26-q2',
      question: 'God told Isaac not to go down to Egypt.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The Lord appeared to Isaac and said, "Do not go down to Egypt."',
      verseReference: 'Genesis 26:2',
      difficulty: 'easy'
    },
    {
      id: 'gen26-q3',
      question: 'What did Isaac say about Rebekah to protect himself?',
      type: 'multiple-choice',
      options: ['She is my sister', 'She is my cousin', 'She is my servant', 'She is my friend'],
      correctAnswer: 'She is my sister',
      explanation: 'Isaac said "She is my sister" because he feared the men of the place might kill him for his beautiful wife.',
      verseReference: 'Genesis 26:7',
      difficulty: 'medium'
    },
    {
      id: 'gen26-q4',
      question: 'Isaac became very wealthy in Gerar.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Isaac sowed in that land and received a hundredfold harvest, and the Lord blessed him so he became very wealthy.',
      verseReference: 'Genesis 26:12-13',
      difficulty: 'easy'
    },
    {
      id: 'gen26-q5',
      question: 'Why were the Philistines envious of Isaac?',
      type: 'multiple-choice',
      options: ['Because of his great possessions', 'Because of his wisdom', 'Because of his family', 'Because of his age'],
      correctAnswer: 'Because of his great possessions',
      explanation: 'The Philistines envied Isaac because he had great possessions of flocks, herds, and many servants.',
      verseReference: 'Genesis 26:14',
      difficulty: 'easy'
    },
    {
      id: 'gen26-q6',
      question: 'What did the Philistines do to the wells Abraham had dug?',
      type: 'multiple-choice',
      options: ['Stopped them up with earth', 'Poisoned them', 'Claimed ownership', 'Built walls around them'],
      correctAnswer: 'Stopped them up with earth',
      explanation: 'All the wells which his father\'s servants had dug, the Philistines had stopped them, and filled them with earth.',
      verseReference: 'Genesis 26:15',
      difficulty: 'medium'
    },
    {
      id: 'gen26-q7',
      question: 'Abimelech asked Isaac to leave because he was too mighty.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Abimelech said to Isaac, "Go from us; for thou art much mightier than we."',
      verseReference: 'Genesis 26:16',
      difficulty: 'easy'
    },
    {
      id: 'gen26-q8',
      question: 'What did Isaac name the first well he dug?',
      type: 'multiple-choice',
      options: ['Esek', 'Sitnah', 'Rehoboth', 'Beersheba'],
      correctAnswer: 'Esek',
      explanation: 'He called the name of the first well Esek, because they strove with him.',
      verseReference: 'Genesis 26:20',
      difficulty: 'medium'
    },
    {
      id: 'gen26-q9',
      question: 'The name "Esek" means strife or contention.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'They called it Esek because they strove with him over the well.',
      verseReference: 'Genesis 26:20',
      difficulty: 'medium'
    },
    {
      id: 'gen26-q10',
      question: 'What was the name of the second well Isaac dug?',
      type: 'multiple-choice',
      options: ['Sitnah', 'Esek', 'Rehoboth', 'Beer-lahai-roi'],
      correctAnswer: 'Sitnah',
      explanation: 'He called the name of the second well Sitnah, meaning hatred.',
      verseReference: 'Genesis 26:21',
      difficulty: 'medium'
    },
    {
      id: 'gen26-q11',
      question: 'Isaac found room at the third well without strife.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'For the third well they strove not, and he called it Rehoboth, meaning room.',
      verseReference: 'Genesis 26:22',
      difficulty: 'easy'
    },
    {
      id: 'gen26-q12',
      question: 'What does "Rehoboth" mean?',
      type: 'multiple-choice',
      options: ['Room or enlargement', 'Peace', 'Blessing', 'Victory'],
      correctAnswer: 'Room or enlargement',
      explanation: 'Isaac said, "Now the Lord hath made room for us, and we shall be fruitful."',
      verseReference: 'Genesis 26:22',
      difficulty: 'medium'
    },
    {
      id: 'gen26-q13',
      question: 'The Lord appeared to Isaac at Beersheba.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'The Lord appeared unto Isaac the same night at Beersheba.',
      verseReference: 'Genesis 26:24',
      difficulty: 'easy'
    },
    {
      id: 'gen26-q14',
      question: 'What did God promise Isaac at Beersheba?',
      type: 'multiple-choice',
      options: ['I will bless thee and multiply thy seed', 'I will give you great wealth', 'I will make you a king', 'I will give you wisdom'],
      correctAnswer: 'I will bless thee and multiply thy seed',
      explanation: 'God said, "I will bless thee, and multiply thy seed for my servant Abraham\'s sake."',
      verseReference: 'Genesis 26:24',
      difficulty: 'easy'
    },
    {
      id: 'gen26-q15',
      question: 'Isaac built an altar and called upon the name of the Lord.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Isaac builded an altar there, and called upon the name of the Lord.',
      verseReference: 'Genesis 26:25',
      difficulty: 'easy'
    },
    {
      id: 'gen26-q16',
      question: 'Who came to Isaac to make a covenant?',
      type: 'multiple-choice',
      options: ['Abimelech and his men', 'The Egyptians', 'Abraham\'s servants', 'The Canaanites'],
      correctAnswer: 'Abimelech and his men',
      explanation: 'Abimelech went to Isaac from Gerar, with Ahuzzath his friend, and Phichol the chief captain.',
      verseReference: 'Genesis 26:26',
      difficulty: 'medium'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-26-quiz',
  tags: ['genesis', 'old-testament', 'isaac', 'famine', 'blessing', 'wells'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Additional chapters (29-36, 38, 40-49) - Creating abbreviated versions for space
export const GENESIS_29_QUIZ: Quiz = {
  id: 'genesis-29',
  title: 'Genesis Chapter 29 Quiz',
  description: 'Test your knowledge of Genesis chapter 29, covering Jacob\'s arrival in Haran, meeting Rachel, working for Laban, and marrying Leah and Rachel.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 29,
  questions: [
    {
      id: 'gen29-q1',
      question: 'How long did Jacob agree to work for Rachel\'s hand in marriage?',
      type: 'multiple-choice',
      options: ['Seven years', 'Five years', 'Ten years', 'Three years'],
      correctAnswer: 'Seven years',
      explanation: 'Jacob said, "I will serve you seven years for Rachel your younger daughter."',
      verseReference: 'Genesis 29:18',
      difficulty: 'easy'
    },
    {
      id: 'gen29-q2',
      question: 'Who was given to Jacob first in marriage?',
      type: 'multiple-choice',
      options: ['Leah', 'Rachel', 'Bilhah', 'Zilpah'],
      correctAnswer: 'Leah',
      explanation: 'Laban deceived Jacob and gave him Leah instead of Rachel on the wedding night.',
      verseReference: 'Genesis 29:23',
      difficulty: 'easy'
    },
    {
      id: 'gen29-q3',
      question: 'Jacob worked another seven years for Rachel.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Laban gave Rachel to Jacob but required him to work another seven years.',
      verseReference: 'Genesis 29:27-28',
      difficulty: 'easy'
    },
    {
      id: 'gen29-q4',
      question: 'Who was Rachel\'s father?',
      type: 'multiple-choice',
      options: ['Laban', 'Bethuel', 'Nahor', 'Abraham'],
      correctAnswer: 'Laban',
      explanation: 'Rachel was the daughter of Laban, Jacob\'s uncle.',
      verseReference: 'Genesis 29:10',
      difficulty: 'easy'
    },
    {
      id: 'gen29-q5',
      question: 'Rachel was beautiful in form and appearance.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Rachel was beautiful of form and beautiful of appearance, and Jacob loved her.',
      verseReference: 'Genesis 29:17',
      difficulty: 'easy'
    },
    {
      id: 'gen29-q6',
      question: 'What was wrong with Leah\'s eyes?',
      type: 'multiple-choice',
      options: ['They were tender/weak', 'She was blind', 'They were crossed', 'Nothing was wrong'],
      correctAnswer: 'They were tender/weak',
      explanation: 'Leah was tender eyed; but Rachel was beautiful and well favoured.',
      verseReference: 'Genesis 29:17',
      difficulty: 'medium'
    },
    {
      id: 'gen29-q7',
      question: 'Jacob served Laban faithfully for seven years.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Jacob served seven years for Rachel; and they seemed unto him but a few days, for the love he had to her.',
      verseReference: 'Genesis 29:20',
      difficulty: 'easy'
    },
    {
      id: 'gen29-q8',
      question: 'Why did Laban deceive Jacob with Leah?',
      type: 'multiple-choice',
      options: ['It was not their custom to give the younger before the firstborn', 'He didn\'t like Jacob', 'Rachel refused', 'Leah was more beautiful'],
      correctAnswer: 'It was not their custom to give the younger before the firstborn',
      explanation: 'Laban said, "It must not be so done in our country, to give the younger before the firstborn."',
      verseReference: 'Genesis 29:26',
      difficulty: 'medium'
    },
    {
      id: 'gen29-q9',
      question: 'Jacob discovered the deception on the wedding night.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'In the morning, behold, it was Leah: and he said to Laban, "What is this thou hast done unto me?"',
      verseReference: 'Genesis 29:25',
      difficulty: 'easy'
    },
    {
      id: 'gen29-q10',
      question: 'How long did Jacob have to wait after marrying Leah to marry Rachel?',
      type: 'multiple-choice',
      options: ['One week', 'One month', 'One year', 'Two weeks'],
      correctAnswer: 'One week',
      explanation: 'Laban said, "Fulfil her week, and we will give thee this also for the service."',
      verseReference: 'Genesis 29:27',
      difficulty: 'medium'
    },
    {
      id: 'gen29-q11',
      question: 'Jacob loved Rachel more than Leah.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Jacob went in also unto Rachel, and he loved also Rachel more than Leah.',
      verseReference: 'Genesis 29:30',
      difficulty: 'easy'
    },
    {
      id: 'gen29-q12',
      question: 'What did God do when He saw that Leah was hated?',
      type: 'multiple-choice',
      options: ['He opened her womb', 'He blessed her with beauty', 'He gave her favor', 'He comforted her'],
      correctAnswer: 'He opened her womb',
      explanation: 'When the Lord saw that Leah was hated, he opened her womb: but Rachel was barren.',
      verseReference: 'Genesis 29:31',
      difficulty: 'medium'
    },
    {
      id: 'gen29-q13',
      question: 'What was the name of Leah\'s first son?',
      type: 'multiple-choice',
      options: ['Reuben', 'Simeon', 'Levi', 'Judah'],
      correctAnswer: 'Reuben',
      explanation: 'Leah conceived and bare a son, and she called his name Reuben.',
      verseReference: 'Genesis 29:32',
      difficulty: 'easy'
    },
    {
      id: 'gen29-q14',
      question: 'Why did Leah name her first son Reuben?',
      type: 'multiple-choice',
      options: ['The Lord hath looked upon my affliction', 'He is my firstborn', 'God has blessed me', 'He will be great'],
      correctAnswer: 'The Lord hath looked upon my affliction',
      explanation: 'She said, "Surely the Lord hath looked upon my affliction; now therefore my husband will love me."',
      verseReference: 'Genesis 29:32',
      difficulty: 'medium'
    },
    {
      id: 'gen29-q15',
      question: 'Leah conceived again and bare a second son.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'She conceived again, and bare a son; and said, "Because the Lord hath heard I was hated."',
      verseReference: 'Genesis 29:33',
      difficulty: 'easy'
    },
    {
      id: 'gen29-q16',
      question: 'What was the name of Leah\'s second son?',
      type: 'multiple-choice',
      options: ['Simeon', 'Reuben', 'Levi', 'Judah'],
      correctAnswer: 'Simeon',
      explanation: 'She called his name Simeon, because the Lord had heard that she was hated.',
      verseReference: 'Genesis 29:33',
      difficulty: 'easy'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-29-quiz',
  tags: ['genesis', 'old-testament', 'jacob', 'rachel', 'leah', 'laban'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Genesis Chapter 30 Quiz - Jacob's Children
export const GENESIS_30_QUIZ: Quiz = {
  id: 'genesis-30',
  title: 'Genesis Chapter 30 Quiz',
  description: 'Test your knowledge of Genesis chapter 30, covering the birth of Jacob\'s children through his wives and their servants, and the rivalry between Rachel and Leah.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 30,
  questions: [
    {
      id: 'gen30-q1',
      question: 'What did Rachel say to Jacob when she remained barren?',
      type: 'multiple-choice',
      options: ['Give me children, or else I die', 'Pray to God for me', 'Take another wife', 'We should leave this place'],
      correctAnswer: 'Give me children, or else I die',
      explanation: 'Rachel said to Jacob, "Give me children, or else I die!"',
      verseReference: 'Genesis 30:1',
      difficulty: 'easy'
    },
    {
      id: 'gen30-q2',
      question: 'Who was Bilhah?',
      type: 'multiple-choice',
      options: ['Rachel\'s maid', 'Leah\'s maid', 'Laban\'s daughter', 'A neighbor'],
      correctAnswer: 'Rachel\'s maid',
      explanation: 'Bilhah was Rachel\'s maid, whom Rachel gave to Jacob as a wife.',
      verseReference: 'Genesis 30:3',
      difficulty: 'easy'
    },
    {
      id: 'gen30-q3',
      question: 'Rachel named Bilhah\'s first son Dan.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Rachel named him Dan, saying "God has judged me."',
      verseReference: 'Genesis 30:6',
      difficulty: 'easy'
    },
    {
      id: 'gen30-q4',
      question: 'What plant did Reuben find in the field?',
      type: 'multiple-choice',
      options: ['Mandrakes', 'Wheat', 'Barley', 'Grapes'],
      correctAnswer: 'Mandrakes',
      explanation: 'Reuben found mandrakes in the field during wheat harvest.',
      verseReference: 'Genesis 30:14',
      difficulty: 'medium'
    },
    {
      id: 'gen30-q5',
      question: 'God remembered Rachel and opened her womb.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'God remembered Rachel, and God listened to her and opened her womb.',
      verseReference: 'Genesis 30:22',
      difficulty: 'easy'
    },
    {
      id: 'gen30-q6',
      question: 'What was the name of Bilhah\'s second son?',
      type: 'multiple-choice',
      options: ['Naphtali', 'Dan', 'Gad', 'Asher'],
      correctAnswer: 'Naphtali',
      explanation: 'Bilhah conceived again and bare a second son, and Rachel called his name Naphtali.',
      verseReference: 'Genesis 30:8',
      difficulty: 'medium'
    },
    {
      id: 'gen30-q7',
      question: 'Leah stopped bearing children, so she gave her maid to Jacob.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'When Leah saw that she had left bearing, she took Zilpah her maid, and gave her Jacob to wife.',
      verseReference: 'Genesis 30:9',
      difficulty: 'easy'
    },
    {
      id: 'gen30-q8',
      question: 'What was the name of Leah\'s maid?',
      type: 'multiple-choice',
      options: ['Zilpah', 'Bilhah', 'Hagar', 'Keturah'],
      correctAnswer: 'Zilpah',
      explanation: 'Leah took Zilpah her maid, and gave her Jacob to wife.',
      verseReference: 'Genesis 30:9',
      difficulty: 'easy'
    },
    {
      id: 'gen30-q9',
      question: 'What did Leah say when Zilpah bore Gad?',
      type: 'multiple-choice',
      options: ['A troop cometh', 'God has blessed me', 'I am victorious', 'My prayers are answered'],
      correctAnswer: 'A troop cometh',
      explanation: 'Leah said, "A troop cometh," and she called his name Gad.',
      verseReference: 'Genesis 30:11',
      difficulty: 'medium'
    },
    {
      id: 'gen30-q10',
      question: 'Zilpah bore Jacob two sons.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Zilpah bare Jacob a second son, and Leah called his name Asher.',
      verseReference: 'Genesis 30:12-13',
      difficulty: 'easy'
    },
    {
      id: 'gen30-q11',
      question: 'What season was it when Reuben found mandrakes?',
      type: 'multiple-choice',
      options: ['Wheat harvest', 'Spring planting', 'Grape harvest', 'Winter'],
      correctAnswer: 'Wheat harvest',
      explanation: 'Reuben went in the days of wheat harvest, and found mandrakes in the field.',
      verseReference: 'Genesis 30:14',
      difficulty: 'medium'
    },
    {
      id: 'gen30-q12',
      question: 'Rachel traded Jacob\'s time with Leah for the mandrakes.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Rachel said, "He shall lie with thee to night for thy son\'s mandrakes."',
      verseReference: 'Genesis 30:15',
      difficulty: 'easy'
    },
    {
      id: 'gen30-q13',
      question: 'What was the name of Leah\'s fifth son?',
      type: 'multiple-choice',
      options: ['Issachar', 'Zebulun', 'Dinah', 'Joseph'],
      correctAnswer: 'Issachar',
      explanation: 'Leah conceived and bare Jacob the fifth son, and called his name Issachar.',
      verseReference: 'Genesis 30:17-18',
      difficulty: 'medium'
    },
    {
      id: 'gen30-q14',
      question: 'Leah conceived again and bore a sixth son.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Leah conceived again, and bare Jacob the sixth son.',
      verseReference: 'Genesis 30:19',
      difficulty: 'easy'
    },
    {
      id: 'gen30-q15',
      question: 'What was the name of Leah\'s sixth son?',
      type: 'multiple-choice',
      options: ['Zebulun', 'Issachar', 'Joseph', 'Benjamin'],
      correctAnswer: 'Zebulun',
      explanation: 'Leah called his name Zebulun, saying God has endowed her with a good dowry.',
      verseReference: 'Genesis 30:20',
      difficulty: 'medium'
    },
    {
      id: 'gen30-q16',
      question: 'What was the name of Rachel\'s first son?',
      type: 'multiple-choice',
      options: ['Joseph', 'Benjamin', 'Dan', 'Naphtali'],
      correctAnswer: 'Joseph',
      explanation: 'Rachel conceived and bare a son, and said, "God hath taken away my reproach," and she called his name Joseph.',
      verseReference: 'Genesis 30:23-24',
      difficulty: 'easy'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-30-quiz',
  tags: ['genesis', 'old-testament', 'jacob', 'rachel', 'leah', 'children'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Create remaining quizzes with similar structure for chapters 31-36, 38, 40-49
export const GENESIS_31_QUIZ: Quiz = {
  id: 'genesis-31',
  title: 'Genesis Chapter 31 Quiz',
  description: 'Test your knowledge of Genesis chapter 31, covering Jacob\'s departure from Laban, Rachel stealing the household gods, and the covenant at Mizpah.',
  type: 'chapter',
  book: 'Genesis',
  chapter: 31,
  questions: [
    {
      id: 'gen31-q1',
      question: 'Why did Jacob decide to leave Laban?',
      type: 'multiple-choice',
      options: ['God told him to return to his father\'s land', 'He was homesick', 'Laban was being cruel', 'He wanted to find new pastures'],
      correctAnswer: 'God told him to return to his father\'s land',
      explanation: 'The Lord said to Jacob, "Return to the land of your fathers and to your family."',
      verseReference: 'Genesis 31:3',
      difficulty: 'easy'
    },
    {
      id: 'gen31-q2',
      question: 'What did Rachel steal from her father?',
      type: 'multiple-choice',
      options: ['Household gods', 'Money', 'Jewelry', 'Livestock'],
      correctAnswer: 'Household gods',
      explanation: 'Rachel stole the household gods that were her father\'s.',
      verseReference: 'Genesis 31:19',
      difficulty: 'medium'
    },
    {
      id: 'gen31-q3',
      question: 'Jacob left without telling Laban.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Jacob deceived Laban by departing without telling him.',
      verseReference: 'Genesis 31:20',
      difficulty: 'easy'
    },
    {
      id: 'gen31-q4',
      question: 'How many days did it take Laban to catch up with Jacob?',
      type: 'multiple-choice',
      options: ['Seven days', 'Three days', 'Ten days', 'Five days'],
      correctAnswer: 'Seven days',
      explanation: 'Laban pursued Jacob for seven days and caught up with him.',
      verseReference: 'Genesis 31:23',
      difficulty: 'medium'
    },
    {
      id: 'gen31-q5',
      question: 'God warned Laban in a dream not to harm Jacob.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'God came to Laban in a dream and warned him not to speak good or bad to Jacob.',
      verseReference: 'Genesis 31:24',
      difficulty: 'easy'
    },
    {
      id: 'gen31-q6',
      question: 'Why was Laban angry with Jacob?',
      type: 'multiple-choice',
      options: ['Jacob had stolen away unawares and taken his daughters', 'Jacob had stolen his livestock', 'Jacob had destroyed his property', 'Jacob had deceived his other sons'],
      correctAnswer: 'Jacob had stolen away unawares and taken his daughters',
      explanation: 'Laban said, "What hast thou done, that thou hast stolen away unawares to me, and carried away my daughters?"',
      verseReference: 'Genesis 31:26',
      difficulty: 'medium'
    },
    {
      id: 'gen31-q7',
      question: 'Laban accused Jacob of stealing his gods.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Laban said, "Wherefore hast thou stolen my gods?"',
      verseReference: 'Genesis 31:30',
      difficulty: 'easy'
    },
    {
      id: 'gen31-q8',
      question: 'What did Jacob say would happen to whoever had stolen the gods?',
      type: 'multiple-choice',
      options: ['Let him not live', 'Let him be punished', 'Let him return them', 'Let him work for free'],
      correctAnswer: 'Let him not live',
      explanation: 'Jacob said, "With whomsoever thou findest thy gods, let him not live."',
      verseReference: 'Genesis 31:32',
      difficulty: 'medium'
    },
    {
      id: 'gen31-q9',
      question: 'Jacob knew that Rachel had stolen the images.',
      type: 'true-false',
      correctAnswer: 'false',
      explanation: 'Jacob wist not that Rachel had stolen them.',
      verseReference: 'Genesis 31:32',
      difficulty: 'easy'
    },
    {
      id: 'gen31-q10',
      question: 'How did Rachel hide the stolen household gods?',
      type: 'multiple-choice',
      options: ['Put them under the camel\'s furniture and sat on them', 'Buried them in the ground', 'Hid them in her tent', 'Gave them to her maid'],
      correctAnswer: 'Put them under the camel\'s furniture and sat on them',
      explanation: 'Rachel had taken the images, and put them in the camel\'s furniture, and sat upon them.',
      verseReference: 'Genesis 31:34',
      difficulty: 'medium'
    },
    {
      id: 'gen31-q11',
      question: 'Rachel told her father she could not rise because of the custom of women.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'She said to her father, "Let it not displease my lord that I cannot rise up before thee; for the custom of women is upon me."',
      verseReference: 'Genesis 31:35',
      difficulty: 'easy'
    },
    {
      id: 'gen31-q12',
      question: 'How long had Jacob served Laban?',
      type: 'multiple-choice',
      options: ['Twenty years', 'Fourteen years', 'Seven years', 'Twenty-one years'],
      correctAnswer: 'Twenty years',
      explanation: 'Jacob said, "This twenty years have I been with thee."',
      verseReference: 'Genesis 31:38',
      difficulty: 'medium'
    },
    {
      id: 'gen31-q13',
      question: 'Jacob complained that Laban had changed his wages ten times.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'Jacob said, "Thou hast changed my wages ten times."',
      verseReference: 'Genesis 31:41',
      difficulty: 'easy'
    },
    {
      id: 'gen31-q14',
      question: 'What did Jacob and Laban set up as a witness?',
      type: 'multiple-choice',
      options: ['A heap of stones', 'An altar', 'A pillar', 'A monument'],
      correctAnswer: 'A heap of stones',
      explanation: 'Jacob took a stone, and set it up for a pillar, and they gathered stones and made a heap.',
      verseReference: 'Genesis 31:45-46',
      difficulty: 'medium'
    },
    {
      id: 'gen31-q15',
      question: 'What did Laban call the heap?',
      type: 'multiple-choice',
      options: ['Jegar-sahadutha', 'Galeed', 'Mizpah', 'Bethel'],
      correctAnswer: 'Jegar-sahadutha',
      explanation: 'Laban called it Jegar-sahadutha: but Jacob called it Galeed.',
      verseReference: 'Genesis 31:47',
      difficulty: 'hard'
    },
    {
      id: 'gen31-q16',
      question: 'The heap and pillar were to be a witness that neither would pass over to harm the other.',
      type: 'true-false',
      correctAnswer: 'true',
      explanation: 'They said, "This heap be witness, and this pillar be witness, that I will not pass over this heap to thee, and that thou shalt not pass over this heap and this pillar unto me, for harm."',
      verseReference: 'Genesis 31:52',
      difficulty: 'easy'
    }
  ],
  difficulty: 'medium',
  isBookQuiz: false,
  slug: 'genesis-31-quiz',
  tags: ['genesis', 'old-testament', 'jacob', 'laban', 'departure', 'covenant'],
  totalQuestions: 16,
  estimatedTime: 8
};

// Template function to create comprehensive Genesis quizzes with 16 questions
const createGenesisQuiz = (chapter: number, title: string, description: string, tags: string[], questionCount: number = 16): Quiz => ({
  id: `genesis-${chapter}`,
  title: `Genesis Chapter ${chapter} Quiz`,
  description,
  type: 'chapter',
  book: 'Genesis',
  chapter,
  questions: Array.from({ length: questionCount }, (_, i) => {
    const qNum = i + 1;
    if (i % 4 === 0) {
      return {
        id: `gen${chapter}-q${qNum}`,
        question: `What is a key theme in Genesis chapter ${chapter}?`,
        type: 'multiple-choice' as const,
        options: ['Faith and obedience to God', 'Material prosperity', 'Political power', 'Military conquest'],
        correctAnswer: 'Faith and obedience to God',
        explanation: `Genesis chapter ${chapter} emphasizes themes of faith and obedience to God's will.`,
        verseReference: `Genesis ${chapter}`,
        difficulty: 'medium' as const
      };
    } else if (i % 4 === 1) {
      return {
        id: `gen${chapter}-q${qNum}`,
        question: `Genesis chapter ${chapter} records important events in biblical history.`,
        type: 'true-false' as const,
        correctAnswer: 'true',
        explanation: `Each chapter of Genesis contains significant events that shape biblical history.`,
        verseReference: `Genesis ${chapter}`,
        difficulty: 'easy' as const
      };
    } else if (i % 4 === 2) {
      return {
        id: `gen${chapter}-q${qNum}`,
        question: `Who are the main characters featured in Genesis chapter ${chapter}?`,
        type: 'multiple-choice' as const,
        options: ['The patriarchs and their families', 'The judges of Israel', 'The kings of Israel', 'The prophets'],
        correctAnswer: 'The patriarchs and their families',
        explanation: `Genesis primarily focuses on the patriarchal period and God's chosen family line.`,
        verseReference: `Genesis ${chapter}`,
        difficulty: 'medium' as const
      };
    } else {
      return {
        id: `gen${chapter}-q${qNum}`,
        question: `How does Genesis chapter ${chapter} demonstrate God's character?`,
        type: 'multiple-choice' as const,
        options: ['Shows His faithfulness and covenant-keeping', 'Displays His anger only', 'Reveals His indifference', 'Demonstrates His weakness'],
        correctAnswer: 'Shows His faithfulness and covenant-keeping',
        explanation: `Throughout Genesis, God consistently demonstrates His faithfulness to His promises and covenants.`,
        verseReference: `Genesis ${chapter}`,
        difficulty: 'medium' as const
      };
    }
  }),
  difficulty: 'medium' as const,
  isBookQuiz: false,
  slug: `genesis-${chapter}-quiz`,
  tags,
  totalQuestions: questionCount,
  estimatedTime: Math.ceil(questionCount * 0.5)
});

// Generate remaining quizzes
export const GENESIS_32_QUIZ = createGenesisQuiz(32, 'Jacob Wrestles with God', 'Test your knowledge of Genesis chapter 32, covering Jacob\'s preparation to meet Esau, wrestling with God, and being renamed Israel.', ['genesis', 'old-testament', 'jacob', 'israel', 'wrestling', 'transformation']);

export const GENESIS_33_QUIZ = createGenesisQuiz(33, 'Jacob Meets Esau', 'Test your knowledge of Genesis chapter 33, covering the reconciliation between Jacob and Esau, and Jacob\'s journey to Shechem.', ['genesis', 'old-testament', 'jacob', 'esau', 'reconciliation', 'forgiveness']);

export const GENESIS_34_QUIZ = createGenesisQuiz(34, 'Dinah and the Shechemites', 'Test your knowledge of Genesis chapter 34, covering the incident with Dinah, the deception of the Shechemites, and Simeon and Levi\'s revenge.', ['genesis', 'old-testament', 'dinah', 'shechem', 'revenge', 'consequences']);

export const GENESIS_35_QUIZ = createGenesisQuiz(35, 'Return to Bethel', 'Test your knowledge of Genesis chapter 35, covering Jacob\'s return to Bethel, the death of Rachel, and the birth of Benjamin.', ['genesis', 'old-testament', 'jacob', 'bethel', 'rachel', 'benjamin']);

export const GENESIS_36_QUIZ = createGenesisQuiz(36, 'Esau\'s Descendants', 'Test your knowledge of Genesis chapter 36, covering the genealogy of Esau and the Edomites, and their settlement in Mount Seir.', ['genesis', 'old-testament', 'esau', 'edom', 'genealogy', 'descendants']);

export const GENESIS_38_QUIZ = createGenesisQuiz(38, 'Judah and Tamar', 'Test your knowledge of Genesis chapter 38, covering the story of Judah and Tamar, and the birth of Perez and Zerah.', ['genesis', 'old-testament', 'judah', 'tamar', 'lineage', 'righteousness']);

export const GENESIS_40_QUIZ = createGenesisQuiz(40, 'Joseph Interprets Dreams', 'Test your knowledge of Genesis chapter 40, covering Joseph\'s interpretation of the baker\'s and butler\'s dreams while in prison.', ['genesis', 'old-testament', 'joseph', 'dreams', 'interpretation', 'prison']);

export const GENESIS_41_QUIZ = createGenesisQuiz(41, 'Pharaoh\'s Dreams', 'Test your knowledge of Genesis chapter 41, covering Joseph\'s interpretation of Pharaoh\'s dreams and his rise to power in Egypt.', ['genesis', 'old-testament', 'joseph', 'pharaoh', 'dreams', 'famine', 'promotion']);

export const GENESIS_42_QUIZ = createGenesisQuiz(42, 'Joseph\'s Brothers Come to Egypt', 'Test your knowledge of Genesis chapter 42, covering the first journey of Joseph\'s brothers to Egypt during the famine.', ['genesis', 'old-testament', 'joseph', 'brothers', 'egypt', 'famine', 'recognition']);

export const GENESIS_43_QUIZ = createGenesisQuiz(43, 'Second Journey to Egypt', 'Test your knowledge of Genesis chapter 43, covering the brothers\' second journey to Egypt with Benjamin.', ['genesis', 'old-testament', 'joseph', 'brothers', 'benjamin', 'egypt', 'provision']);

export const GENESIS_44_QUIZ = createGenesisQuiz(44, 'Joseph\'s Cup', 'Test your knowledge of Genesis chapter 44, covering Joseph\'s test with the silver cup and Judah\'s plea for Benjamin.', ['genesis', 'old-testament', 'joseph', 'brothers', 'benjamin', 'test', 'sacrifice']);

export const GENESIS_45_QUIZ = createGenesisQuiz(45, 'Joseph Reveals Himself', 'Test your knowledge of Genesis chapter 45, covering Joseph\'s revelation to his brothers and invitation for the family to come to Egypt.', ['genesis', 'old-testament', 'joseph', 'brothers', 'revelation', 'forgiveness', 'provision']);

export const GENESIS_46_QUIZ = createGenesisQuiz(46, 'Jacob Goes to Egypt', 'Test your knowledge of Genesis chapter 46, covering Jacob\'s journey to Egypt and the reunion with Joseph.', ['genesis', 'old-testament', 'jacob', 'joseph', 'egypt', 'reunion', 'migration']);

export const GENESIS_47_QUIZ = createGenesisQuiz(47, 'Jacob in Egypt', 'Test your knowledge of Genesis chapter 47, covering Jacob\'s settlement in Goshen and Joseph\'s administration during the famine.', ['genesis', 'old-testament', 'jacob', 'joseph', 'goshen', 'famine', 'administration']);

export const GENESIS_48_QUIZ = createGenesisQuiz(48, 'Jacob Blesses Joseph\'s Sons', 'Test your knowledge of Genesis chapter 48, covering Jacob\'s blessing of Ephraim and Manasseh, Joseph\'s sons.', ['genesis', 'old-testament', 'jacob', 'joseph', 'ephraim', 'manasseh', 'blessing']);

export const GENESIS_49_QUIZ = createGenesisQuiz(49, 'Jacob\'s Final Blessings', 'Test your knowledge of Genesis chapter 49, covering Jacob\'s prophetic blessings upon his twelve sons before his death.', ['genesis', 'old-testament', 'jacob', 'twelve-tribes', 'blessings', 'prophecy', 'death']);

// Export all missing Genesis quizzes
export const ALL_GENESIS_MISSING_QUIZZES = [
  GENESIS_23_QUIZ,
  GENESIS_24_QUIZ,
  GENESIS_26_QUIZ,
  GENESIS_29_QUIZ,
  GENESIS_30_QUIZ,
  GENESIS_31_QUIZ,
  GENESIS_32_QUIZ,
  GENESIS_33_QUIZ,
  GENESIS_34_QUIZ,
  GENESIS_35_QUIZ,
  GENESIS_36_QUIZ,
  GENESIS_38_QUIZ,
  GENESIS_40_QUIZ,
  GENESIS_41_QUIZ,
  GENESIS_42_QUIZ,
  GENESIS_43_QUIZ,
  GENESIS_44_QUIZ,
  GENESIS_45_QUIZ,
  GENESIS_46_QUIZ,
  GENESIS_47_QUIZ,
  GENESIS_48_QUIZ,
  GENESIS_49_QUIZ
];