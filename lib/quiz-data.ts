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
  totalQuestions: 25,
  estimatedTime: 15
};

// Function to get quiz by slug
export const getQuizBySlug = (slug: string): Quiz | undefined => {
  const quizzes = [GENESIS_1_QUIZ, GENESIS_BOOK_QUIZ];
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