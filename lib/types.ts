// Core interfaces for Bible Quiz application

export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank' | 'fill-in-blank';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type QuizType = 'chapter' | 'book' | 'character' | 'theme';

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[]; // For multiple choice questions
  correctAnswer: string;
  explanation: string;
  verseReference: string;
  difficulty: DifficultyLevel;
  cognitiveLevel?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  type: QuizType;
  book?: string;
  chapter?: number;
  character?: string;
  theme?: string;
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
  difficulty: DifficultyLevel;
  isBookQuiz: boolean;
  slug: string;
  tags: string[];
  totalQuestions: number;
  estimatedTime: number; // in minutes
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  answeredQuestions: {
    questionId: string;
    userAnswer: string;
    isCorrect: boolean;
  }[];
  completedAt: Date;
  timeSpent: number; // in seconds
}

export interface BibleBook {
  name: string;
  slug: string;
  testament: 'old' | 'new';
  chapters: number;
  order: number;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage?: string;
  jsonLd?: Record<string, any>;
}

export interface InternalLink {
  title: string;
  href: string;
  description: string;
  type: 'study-guide' | 'quiz' | 'character' | 'book' | 'hub' | 'theme';
}

// Progress tracking
export interface QuizProgress {
  currentQuestion: number;
  answeredQuestions: number;
  percentage: number;
  estimatedTimeRemaining: number;
}

// User preferences
export interface UserPreferences {
  fontSize: 'small' | 'medium' | 'large';
  theme: 'light' | 'dark' | 'auto';
  showTimer: boolean;
  showProgress: boolean;
  autoAdvance: boolean;
}

// Quiz statistics
export interface QuizStats {
  totalQuizzes: number;
  completedQuizzes: number;
  averageScore: number;
  totalTimeSpent: number;
  favoriteTopics: string[];
}

// Database query types
export interface StudyPlanFilters {
  topic?: string;
  duration?: string;
  difficulty?: string;
}

export interface SermonIllustration {
  slug: string;
  title: string;
  topic: string;
  content: string;
  [key: string]: unknown;
}

export interface WordStudy {
  word: string;
  language: string;
  definition: string;
  [key: string]: unknown;
}

export interface BibleStudyGuide {
  slug: string;
  title: string;
  topic: string;
  [key: string]: unknown;
}