import { Metadata } from 'next';
import QuizPage from '@/components/QuizPage';
import { generateMetaTags } from '@/lib/seo';

// Complete Genesis book quiz data (placeholder - would need full implementation)
const GENESIS_COMPLETE_QUIZ = {
  id: 'genesis-complete',
  title: 'Complete Genesis Quiz',
  description: 'Test your comprehensive knowledge of the entire book of Genesis with 30 challenging questions covering key chapters and themes.',
  type: 'book' as const,
  book: 'Genesis',
  totalQuestions: 30,
  estimatedTime: 18,
  difficulty: 'medium' as const,
  slug: 'genesis-quiz',
  tags: ['genesis', 'old testament', 'creation', 'abraham', 'isaac', 'jacob', 'joseph', 'complete book'],
  isBookQuiz: true,
  questions: [
    {
      id: 'gen-1',
      question: 'Complete this phrase: "And the evening and the morning were the ______ day."',
      type: 'multiple-choice' as const,
      options: ['first', 'second', 'third', 'sixth'],
      correctAnswer: 'first',
      explanation: 'This phrase appears at the end of each day of creation. The example given is from the first day when God created light.',
      verseReference: 'Genesis 1:5',
      difficulty: 'easy' as const
    },
    {
      id: 'gen-2', 
      question: 'Complete this phrase: "And God said, Let there be ______, and there was ______."',
      type: 'multiple-choice' as const,
      options: ['light; light', 'water; water', 'land; land', 'animals; animals'],
      correctAnswer: 'light; light',
      explanation: 'This was God\'s first spoken command during creation, bringing light into existence.',
      verseReference: 'Genesis 1:3',
      difficulty: 'easy' as const
    },
    {
      id: 'gen-3',
      question: 'Who was the first murderer mentioned in the Bible?',
      type: 'multiple-choice' as const,
      options: ['Abel', 'Cain', 'Seth', 'Enoch'],
      correctAnswer: 'Cain',
      explanation: 'Cain killed his brother Abel out of jealousy because God accepted Abel\'s offering.',
      verseReference: 'Genesis 4:8',
      difficulty: 'easy' as const
    },
    {
      id: 'gen-4',
      question: 'How old was Noah when the flood began?',
      type: 'multiple-choice' as const,
      options: ['500 years old', '600 years old', '700 years old', '800 years old'],
      correctAnswer: '600 years old',
      explanation: 'Noah was 600 years old when the floodwaters came upon the earth.',
      verseReference: 'Genesis 7:6',
      difficulty: 'medium' as const
    },
    {
      id: 'gen-5',
      question: 'Complete this phrase: "Be fruitful and ______, and fill the earth."',
      type: 'multiple-choice' as const,
      options: ['multiply', 'prosper', 'rejoice', 'grow'],
      correctAnswer: 'multiply',
      explanation: 'God blessed Noah and his sons with this command after the flood, similar to His original blessing to Adam and Eve.',
      verseReference: 'Genesis 9:1',
      difficulty: 'easy' as const
    },
    {
      id: 'gen-6',
      question: 'From which city was Abraham called by God?',
      type: 'multiple-choice' as const,
      options: ['Babylon', 'Ur of the Chaldees', 'Haran', 'Damascus'],
      correctAnswer: 'Ur of the Chaldees',
      explanation: 'The Lord called Abraham from Ur of the Chaldees to go to the land He would show him.',
      verseReference: 'Genesis 11:31, Acts 7:2-4',
      difficulty: 'medium' as const
    },
    {
      id: 'gen-7',
      question: 'What was the name of Abraham\'s nephew who chose to live in Sodom?',
      type: 'multiple-choice' as const,
      options: ['Isaac', 'Ishmael', 'Lot', 'Laban'],
      correctAnswer: 'Lot',
      explanation: 'Lot was Abraham\'s nephew who chose to dwell in the cities of the plain, including Sodom.',
      verseReference: 'Genesis 13:11-12',
      difficulty: 'easy' as const
    },
    {
      id: 'gen-8',
      question: 'How old was Abraham when Isaac was born?',
      type: 'multiple-choice' as const,
      options: ['90 years old', '100 years old', '110 years old', '120 years old'],
      correctAnswer: '100 years old',
      explanation: 'Abraham was 100 years old when his son Isaac was born to him.',
      verseReference: 'Genesis 21:5',
      difficulty: 'medium' as const
    },
    {
      id: 'gen-9',
      question: 'Complete this phrase: "My son, God will provide himself a ______ for a burnt offering."',
      type: 'multiple-choice' as const,
      options: ['lamb', 'ram', 'goat', 'dove'],
      correctAnswer: 'lamb',
      explanation: 'Abraham said this to Isaac when asked about the sacrifice. God indeed provided a ram caught in a thicket.',
      verseReference: 'Genesis 22:8',
      difficulty: 'medium' as const
    },
    {
      id: 'gen-10',
      question: 'What did Abraham\'s servant use as a test to find a wife for Isaac?',
      type: 'multiple-choice' as const,
      options: ['A ring', 'Water from a well', 'A golden bracelet', 'A camel'],
      correctAnswer: 'Water from a well',
      explanation: 'The servant asked God for a sign: the woman who would offer water to him and his camels would be the chosen one.',
      verseReference: 'Genesis 24:12-14',
      difficulty: 'medium' as const
    },
    {
      id: 'gen-11',
      question: 'Who was Isaac\'s wife?',
      type: 'multiple-choice' as const,
      options: ['Sarah', 'Rachel', 'Rebekah', 'Leah'],
      correctAnswer: 'Rebekah',
      explanation: 'Rebekah became Isaac\'s wife after Abraham\'s servant found her at the well.',
      verseReference: 'Genesis 24:67',
      difficulty: 'easy' as const
    },
    {
      id: 'gen-12',
      question: 'Which son did Isaac favor?',
      type: 'multiple-choice' as const,
      options: ['Jacob', 'Esau', 'Both equally', 'Neither'],
      correctAnswer: 'Esau',
      explanation: 'Isaac loved Esau because he was a skillful hunter, while Rebekah loved Jacob.',
      verseReference: 'Genesis 25:28',
      difficulty: 'easy' as const
    },
    {
      id: 'gen-13',
      question: 'For what did Esau sell his birthright?',
      type: 'multiple-choice' as const,
      options: ['Gold and silver', 'A bowl of stew', 'Land', 'Cattle'],
      correctAnswer: 'A bowl of stew',
      explanation: 'Esau sold his birthright to Jacob for red stew when he was famished.',
      verseReference: 'Genesis 25:29-34',
      difficulty: 'easy' as const
    },
    {
      id: 'gen-14',
      question: 'Complete this phrase: "Surely the Lord is in this ______; and I knew it not."',
      type: 'multiple-choice' as const,
      options: ['place', 'dream', 'vision', 'moment'],
      correctAnswer: 'place',
      explanation: 'Jacob said this when he awoke from his dream of the ladder, realizing the sacredness of Bethel.',
      verseReference: 'Genesis 28:16',
      difficulty: 'easy' as const
    },
    {
      id: 'gen-15',
      question: 'How many years did Jacob work for Laban to marry Rachel?',
      type: 'multiple-choice' as const,
      options: ['7 years', '14 years', '21 years', '28 years'],
      correctAnswer: '14 years',
      explanation: 'Jacob worked 7 years for Rachel, but was given Leah first, then worked another 7 years for Rachel.',
      verseReference: 'Genesis 29:18-30',
      difficulty: 'medium' as const
    },
    {
      id: 'gen-16',
      question: 'What new name did God give to Jacob?',
      type: 'multiple-choice' as const,
      options: ['Abraham', 'Israel', 'Isaac', 'Joseph'],
      correctAnswer: 'Israel',
      explanation: 'God changed Jacob\'s name to Israel after he wrestled with the angel.',
      verseReference: 'Genesis 32:28',
      difficulty: 'easy' as const
    },
    {
      id: 'gen-17',
      question: 'How many sons did Jacob have?',
      type: 'multiple-choice' as const,
      options: ['10', '11', '12', '13'],
      correctAnswer: '12',
      explanation: 'Jacob had 12 sons who became the patriarchs of the 12 tribes of Israel.',
      verseReference: 'Genesis 35:22',
      difficulty: 'easy' as const
    },
    {
      id: 'gen-18',
      question: 'Complete this phrase: "Behold, this ______ cometh."',
      type: 'multiple-choice' as const,
      options: ['dreamer', 'favorite', 'brother', 'son'],
      correctAnswer: 'dreamer',
      explanation: 'Joseph\'s brothers said this mockingly when they saw him coming, referring to his dreams.',
      verseReference: 'Genesis 37:19',
      difficulty: 'medium' as const
    },
    {
      id: 'gen-19',
      question: 'What did Joseph\'s brothers do with him when they sold him?',
      type: 'multiple-choice' as const,
      options: ['Sold him to Egyptians', 'Sold him to Ishmaelites', 'Sold him to Midianites', 'All of the above'],
      correctAnswer: 'Sold him to Ishmaelites',
      explanation: 'Joseph\'s brothers sold him to Ishmaelite traders who took him to Egypt.',
      verseReference: 'Genesis 37:28',
      difficulty: 'medium' as const
    },
    {
      id: 'gen-20',
      question: 'Who was Potiphar?',
      type: 'multiple-choice' as const,
      options: ['A priest', 'An officer of Pharaoh', 'A merchant', 'A shepherd'],
      correctAnswer: 'An officer of Pharaoh',
      explanation: 'Potiphar was an officer of Pharaoh and captain of the guard who bought Joseph.',
      verseReference: 'Genesis 39:1',
      difficulty: 'medium' as const
    },
    {
      id: 'gen-21',
      question: 'Complete this phrase: "God hath made me forget all my toil, and all my ______ house."',
      type: 'multiple-choice' as const,
      options: ['father\'s', 'mother\'s', 'brother\'s', 'master\'s'],
      correctAnswer: 'father\'s',
      explanation: 'Joseph said this when naming his son Manasseh, meaning \"making to forget.\"',
      verseReference: 'Genesis 41:51',
      difficulty: 'medium' as const
    },
    {
      id: 'gen-22',
      question: 'What did Joseph\'s brothers bring to Egypt to buy grain?',
      type: 'multiple-choice' as const,
      options: ['Gold', 'Silver', 'Livestock', 'Precious stones'],
      correctAnswer: 'Silver',
      explanation: 'Jacob\'s sons took silver in their hands to go down to Egypt to buy grain.',
      verseReference: 'Genesis 43:12',
      difficulty: 'medium' as const
    },
    {
      id: 'gen-23',
      question: 'Which brother did Joseph keep as a hostage in Egypt?',
      type: 'multiple-choice' as const,
      options: ['Reuben', 'Simeon', 'Levi', 'Judah'],
      correctAnswer: 'Simeon',
      explanation: 'Joseph bound Simeon before their eyes and kept him as a hostage until they brought Benjamin.',
      verseReference: 'Genesis 42:24',
      difficulty: 'medium' as const
    },
    {
      id: 'gen-24',
      question: 'How old was Jacob when he died?',
      type: 'multiple-choice' as const,
      options: ['130 years', '147 years', '175 years', '180 years'],
      correctAnswer: '147 years',
      explanation: 'Jacob lived 147 years and died in Egypt, blessing his sons before his death.',
      verseReference: 'Genesis 47:28',
      difficulty: 'medium' as const
    },
    {
      id: 'gen-25',
      question: 'Where was Jacob buried?',
      type: 'multiple-choice' as const,
      options: ['Egypt', 'Cave of Machpelah', 'Bethel', 'Hebron'],
      correctAnswer: 'Cave of Machpelah',
      explanation: 'Jacob was buried in the cave of Machpelah in the field that Abraham purchased, along with Abraham, Isaac, Sarah, Rebekah, and Leah.',
      verseReference: 'Genesis 50:13',
      difficulty: 'medium' as const
    },
    {
      id: 'gen-26',
      question: 'Complete this phrase: "And God said unto them, Be fruitful, and ______, and replenish the earth."',
      type: 'multiple-choice' as const,
      options: ['multiply', 'prosper', 'rejoice', 'grow'],
      correctAnswer: 'multiply',
      explanation: 'God blessed Adam and Eve with this command to fill the earth with their descendants.',
      verseReference: 'Genesis 1:28',
      difficulty: 'easy' as const
    },
    {
      id: 'gen-27',
      question: 'What did Adam name his wife?',
      type: 'multiple-choice' as const,
      options: ['Eve', 'Sarah', 'Mary', 'Ruth'],
      correctAnswer: 'Eve',
      explanation: 'Adam called his wife Eve because she was the mother of all living.',
      verseReference: 'Genesis 3:20',
      difficulty: 'easy' as const
    },
    {
      id: 'gen-28',
      question: 'How many people were saved in Noah\'s ark?',
      type: 'multiple-choice' as const,
      options: ['6', '8', '10', '12'],
      correctAnswer: '8',
      explanation: 'Noah, his wife, his three sons (Shem, Ham, and Japheth), and their wives - eight people total.',
      verseReference: 'Genesis 7:13, 1 Peter 3:20',
      difficulty: 'medium' as const
    },
    {
      id: 'gen-29',
      question: 'Complete this phrase: "While the earth remaineth, seedtime and harvest, and cold and heat, and summer and winter, and day and night shall not ______."',
      type: 'multiple-choice' as const,
      options: ['cease', 'fail', 'end', 'stop'],
      correctAnswer: 'cease',
      explanation: 'God promised this after the flood as part of His covenant with Noah.',
      verseReference: 'Genesis 8:22',
      difficulty: 'medium' as const
    },
    {
      id: 'gen-30',
      question: 'What was the name of Abraham\'s first son?',
      type: 'multiple-choice' as const,
      options: ['Isaac', 'Ishmael', 'Jacob', 'Esau'],
      correctAnswer: 'Ishmael',
      explanation: 'Ishmael was born to Abraham and Hagar before Isaac was born to Abraham and Sarah.',
      verseReference: 'Genesis 16:15',
      difficulty: 'medium' as const
    }
  ]
};

// Generate metadata for this specific quiz
export async function generateMetadata(): Promise<Metadata> {
  const url = '/genesis-quiz';
  const metaTags = generateMetaTags(GENESIS_COMPLETE_QUIZ, url);
  
  return {
    title: metaTags.title,
    description: metaTags.description,
    keywords: metaTags.keywords,
    openGraph: {
      title: metaTags.ogTitle,
      description: metaTags.ogDescription,
      url: metaTags.ogUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTags.twitterTitle,
      description: metaTags.twitterDescription,
    },
    alternates: {
      canonical: metaTags.canonical,
    },
  };
}

export default function GenesisCompleteQuizPage() {
  return (
    <QuizPage 
      quiz={GENESIS_COMPLETE_QUIZ} 
      url="https://biblemaximum.com/genesis-quiz"
    />
  );
}