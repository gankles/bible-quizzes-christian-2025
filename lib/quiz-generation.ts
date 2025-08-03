import { QuizQuestion, QuestionType, DifficultyLevel } from './types';

/**
 * Quiz Generation Utilities
 * 
 * IMPORTANT RULE: All fill-in-the-blank and complete-the-phrase questions 
 * should ALWAYS use radio button options (multiple-choice format) instead of text input.
 * This improves user experience and accessibility.
 */

export interface QuestionTemplate {
  questionText: string;
  correctAnswer: string;
  distractors: string[]; // Wrong answer options
  explanation: string;
  verseReference: string;
  difficulty: DifficultyLevel;
  questionType: 'complete-phrase' | 'fill-blank' | 'knowledge' | 'true-false';
}

/**
 * Ensures all questions follow the rule: fill-blank and complete-phrase questions use radio options
 */
export function standardizeQuestionFormat(question: QuizQuestion): QuizQuestion {
  // If it's a fill-blank or complete-phrase question, ensure it has multiple choice options
  if (question.type === 'fill-blank' || isCompletePhraseQuestion(question.question)) {
    return {
      ...question,
      type: 'multiple-choice',
      options: question.options || generateOptionsForFillBlank(question.correctAnswer, question.question)
    };
  }
  
  return question;
}

/**
 * Detects if a question is a "complete the phrase" type
 */
function isCompletePhraseQuestion(questionText: string): boolean {
  const completePhraseIndicators = [
    'complete this phrase',
    'complete this verse',
    'complete the phrase',
    'complete the verse',
    'fill in the blank',
    'complete this sentence'
  ];
  
  return completePhraseIndicators.some(indicator => 
    questionText.toLowerCase().includes(indicator.toLowerCase())
  );
}

/**
 * Generates appropriate multiple choice options for fill-blank questions
 */
function generateOptionsForFillBlank(correctAnswer: string, questionText: string): string[] {
  // For Bible verses, generate contextually appropriate distractors
  const options = [correctAnswer];
  
  // Generate distractors based on the type of answer
  const distractors = generateDistractionOptions(correctAnswer, questionText);
  options.push(...distractors.slice(0, 3)); // Limit to 4 total options
  
  // Shuffle options so correct answer isn't always first
  return shuffleArray(options);
}

/**
 * Generates distractor options based on the correct answer and context
 */
function generateDistractionOptions(correctAnswer: string, questionText: string): string[] {
  const lowerCorrect = correctAnswer.toLowerCase();
  
  // Common Biblical word categories for generating distractors
  const biblicalDistractions: Record<string, string[]> = {
    // Numbers and time
    'first': ['second', 'third', 'seventh'],
    'second': ['first', 'third', 'fourth'],
    'third': ['first', 'second', 'fourth'],
    'sixth': ['fourth', 'fifth', 'seventh'],
    'seventh': ['sixth', 'first', 'eighth'],
    
    // Common Biblical concepts
    'light': ['darkness', 'water', 'earth'],
    'good': ['perfect', 'beautiful', 'wonderful'],
    'image': ['likeness', 'spirit', 'form'],
    'heaven': ['paradise', 'glory', 'throne'],
    'earth': ['world', 'ground', 'land'],
    'multiply': ['prosper', 'rejoice', 'grow'],
    'place': ['land', 'house', 'dwelling'],
    'dreamer': ['prophet', 'son', 'brother'],
    
    // Biblical locations
    'moriah': ['sinai', 'carmel', 'horeb'],
    'egypt': ['babylon', 'assyria', 'canaan'],
    
    // Biblical characters
    'abraham': ['isaac', 'jacob', 'moses'],
    'moses': ['aaron', 'joshua', 'david'],
    'david': ['solomon', 'saul', 'samuel'],
    
    // Time periods
    'seven': ['five', 'ten', 'twelve'],
    'forty': ['thirty', 'fifty', 'sixty'],
    
    // Actions
    'created': ['formed', 'made', 'built'],
    'blessed': ['honored', 'praised', 'sanctified']
  };
  
  // Try to find contextual distractors
  let distractors = biblicalDistractions[lowerCorrect] || [];
  
  // If no specific distractors found, generate generic ones
  if (distractors.length === 0) {
    distractors = generateGenericDistractions(correctAnswer, questionText);
  }
  
  return distractors;
}

/**
 * Generates generic distractors when specific ones aren't available
 */
function generateGenericDistractions(correctAnswer: string, questionText: string): string[] {
  // Basic distractor patterns
  const genericOptions = [
    'good', 'great', 'holy', 'blessed', 'perfect',
    'light', 'truth', 'peace', 'love', 'grace',
    'first', 'second', 'third', 'last',
    'heaven', 'earth', 'water', 'fire',
    'day', 'night', 'morning', 'evening'
  ];
  
  // Filter out the correct answer and return 3 distractors
  return genericOptions
    .filter(option => option.toLowerCase() !== correctAnswer.toLowerCase())
    .slice(0, 3);
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Creates a complete phrase question with radio options
 */
export function createCompletePhraseQuestion(
  id: string,
  phraseTemplate: string,
  correctAnswer: string,
  explanation: string,
  verseReference: string,
  difficulty: DifficultyLevel = 'medium',
  customDistractors?: string[]
): QuizQuestion {
  const options = customDistractors 
    ? [correctAnswer, ...customDistractors.slice(0, 3)]
    : generateOptionsForFillBlank(correctAnswer, phraseTemplate);
  
  return {
    id,
    question: `Complete this phrase: "${phraseTemplate}"`,
    type: 'multiple-choice',
    options: shuffleArray(options),
    correctAnswer,
    explanation,
    verseReference,
    difficulty
  };
}

/**
 * Creates a fill-in-the-blank question with radio options
 */
export function createFillBlankQuestion(
  id: string,
  questionTemplate: string,
  correctAnswer: string,
  explanation: string,
  verseReference: string,
  difficulty: DifficultyLevel = 'medium',
  customDistractors?: string[]
): QuizQuestion {
  const options = customDistractors 
    ? [correctAnswer, ...customDistractors.slice(0, 3)]
    : generateOptionsForFillBlank(correctAnswer, questionTemplate);
  
  return {
    id,
    question: questionTemplate,
    type: 'multiple-choice',
    options: shuffleArray(options),
    correctAnswer,
    explanation,
    verseReference,
    difficulty
  };
}

/**
 * Validates and standardizes a quiz to ensure all questions follow the radio button rule
 */
export function standardizeQuiz(questions: QuizQuestion[]): QuizQuestion[] {
  return questions.map(standardizeQuestionFormat);
}

/**
 * Common Biblical phrase templates for quick quiz generation
 */
export const BIBLICAL_PHRASE_TEMPLATES = {
  creation: [
    {
      template: "And God said, Let there be ______, and there was ______.",
      answer: "light; light",
      distractors: ["water; water", "land; land", "plants; plants"],
      reference: "Genesis 1:3"
    },
    {
      template: "And the evening and the morning were the ______ day.",
      answer: "first",
      distractors: ["second", "third", "seventh"],
      reference: "Genesis 1:5"
    },
    {
      template: "And God saw every thing that he had made, and, behold, it was very ______.",
      answer: "good",
      distractors: ["perfect", "beautiful", "wonderful"],
      reference: "Genesis 1:31"
    }
  ],
  covenant: [
    {
      template: "Be fruitful and ______, and fill the earth.",
      answer: "multiply",
      distractors: ["prosper", "rejoice", "grow"],
      reference: "Genesis 9:1"
    }
  ],
  faith: [
    {
      template: "My son, God will provide himself a ______ for a burnt offering.",
      answer: "lamb",
      distractors: ["ram", "goat", "dove"],
      reference: "Genesis 22:8"
    }
  ]
};

export default {
  standardizeQuestionFormat,
  standardizeQuiz,
  createCompletePhraseQuestion,
  createFillBlankQuestion,
  BIBLICAL_PHRASE_TEMPLATES
};