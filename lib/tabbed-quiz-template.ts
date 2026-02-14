import { Quiz, QuizQuestion } from './types';

// Tabbed Quiz Template - Use this for all future chapter quizzes
export interface TabbedQuiz {
  id: string;
  title: string;
  description: string;
  tabs: {
    easy: Quiz;
    medium: Quiz;
    hard: Quiz;
    theological: Quiz;
  };
}

/**
 * Template for creating tabbed quiz systems
 * This follows the successful pattern established in Genesis 1
 * 
 * DIFFICULTY GUIDELINES:
 * 
 * EASY: Basic Recognition & Simple Facts
 * - Simple factual questions
 * - "What did God create on day X?"
 * - True/false about basic events
 * - Recognition of key characters/places
 * 
 * MEDIUM: Application & Comprehension - "Apply biblical truths"
 * - Practical Christian living grounded in the chapter's teaching
 * - Focus areas: faith, obedience, prayer, evangelism, marriage, parenting,
 *   work ethic, honesty, generosity, stewardship, church life, personal
 *   devotion, spiritual discipline, forgiveness, perseverance, humility
 * - Frame as: "How does this passage teach us about [biblical virtue]?"
 * - Pattern: "A fellow believer is [common challenge]. Based on [passage], what biblical truth would you share?"
 * - Multiple Scripture references in explanations (3-5 verses minimum)
 * - Categories: Faith & Obedience, Prayer & Devotion, Family & Marriage,
 *   Work & Stewardship, Evangelism, Church Life, Forgiveness, Perseverance
 * - AVOID: social justice framing, environmental activism language,
 *   "inherent worth/dignity" repetition, sensitivity-training scenarios,
 *   culture-war topics, politically charged framing
 * 
 * HARD: Analysis & Synthesis - "Deep analysis and cross-biblical connections"
 * - Literary structure analysis
 * - Cross-referencing with other biblical passages
 * - Understanding cultural/historical context
 * - Theological implications and connections
 * - "How does X relate to Y throughout Scripture?"
 * 
 * THEOLOGICAL: Advanced Biblical Theology - "Deep biblical truths that unite believers"
 * - Seminary-level questions that avoid denominational divisions
 * - Focus on core Christian doctrines all believers share
 * - Trinity, Creation, Image of God, Stewardship themes
 * - Avoid: Reformed vs Catholic, Young Earth vs Old Earth, denominational distinctives
 * - Multiple Scripture support showing biblical consistency
 * 
 * QUESTION DISTRIBUTION:
 * - Easy: 70% Multiple Choice, 20% True/False, 10% Fill-in-blank
 * - Medium: 80% Multiple Choice, 15% True/False, 5% Fill-in-blank  
 * - Hard: 90% Multiple Choice, 10% True/False
 * - Theological: 100% Multiple Choice (complex scenarios)
 * 
 * All levels should have exactly 15 questions each (60 total)
 */

export const TABBED_QUIZ_TEMPLATE = {
  // Use this structure for all future tabbed quizzes
  structure: {
    easy: {
      description: "Perfect for beginners! Test your basic knowledge of [chapter topic].",
      estimatedTime: 8, // minutes
      questionCount: 15,
      focusAreas: ["Basic facts", "Simple recognition", "Key events", "Main characters"]
    },
    medium: {
      description: "Ready for more? Apply biblical truths to real-life situations.",
      estimatedTime: 12, // minutes  
      questionCount: 15,
      focusAreas: ["Faith & Obedience", "Prayer & Devotion", "Family & Marriage", "Work & Stewardship", "Evangelism", "Church Life"]
    },
    hard: {
      description: "Challenge yourself with deep analysis and cross-biblical connections.",
      estimatedTime: 15, // minutes
      questionCount: 15,
      focusAreas: ["Literary analysis", "Cross-references", "Theological connections", "Cultural context"]
    },
    theological: {
      description: "Deep biblical theology that unites all believers. Explore foundational truths about God, creation, and humanity.",
      estimatedTime: 25, // minutes
      questionCount: 15,
      focusAreas: ["Core doctrines", "Biblical theology", "Unifying truths", "Advanced concepts"]
    }
  },
  
  // Example question patterns for each level
  questionPatterns: {
    easy: [
      "What did [character] do in verse X?",
      "True or False: [basic fact about the chapter]",
      "On which day/when did [event] happen?",
      "Complete this verse: '[partial verse]'",
      "Who said '[quote from chapter]'?"
    ],
    medium: [
      "A fellow believer is going through [trial/challenge]. Based on [passage], what biblical truth would you share?",
      "How does [passage] teach us to approach [faith/obedience/prayer/generosity] in our daily walk with God?",
      "You are seeking to honor God in your [marriage/parenting/workplace/finances]. How does [passage] guide you?",
      "A new Christian asks how to grow in [biblical virtue]. Using [passage], what practical counsel would you give?"
    ],
    hard: [
      "Analyze the [literary device] in [passage]. How does this relate to [other biblical book]?",
      "Compare [chapter] with [other passage]. What theological theme emerges?",
      "How does the [Hebrew/Greek word] in [verse] connect to [theological concept]?",
      "Examine [cultural context]. How does this illuminate [verse]'s meaning?"
    ],
    theological: [
      "How does [chapter] establish [major doctrine] and what implications does this have for [theological topic]?",
      "Evaluate [chapter]'s teaching about [theological concept]. How does this relate to [other Scripture]?",
      "Analyze [theological issue] using [chapter]. How does this inform [practical application]?",
      "How does [chapter] reveal [attribute of God] and what does this mean for [Christian living]?"
    ]
  }
};

/**
 * Helper function to generate proper verse references
 * Always include multiple supporting verses for Medium and above levels
 */
export function generateVerseReferences(level: 'easy' | 'medium' | 'hard' | 'theological', primaryVerse: string): string {
  const base = primaryVerse;
  
  switch (level) {
    case 'easy':
      return base; // Single verse usually sufficient
    case 'medium':
      return `${base}; [add 3-4 supporting verses]`; // Multiple verses for application
    case 'hard':
      return `${base}; [add 2-3 cross-references]`; // Cross-biblical connections
    case 'theological':
      return `${base}; [add 4-5 theological support verses]`; // Strong theological foundation
    default:
      return base;
  }
}

/**
 * SEO Template for Tabbed Quiz Pages
 */
export function generateTabbedQuizMetadata(bookName: string, chapterNumber: number) {
  const title = `${bookName} Chapter ${chapterNumber} Quiz - Multi-Level Bible Study | Bible Maximum`;
  const description = `An enhanced quiz on ${bookName} chapter ${chapterNumber} with deeper theological insights, pattern recognition, and application questions. Choose your difficulty level and dive into the chapter at your comfort zone. Perfect for Bible study and Christian education.`;
  
  return {
    title,
    description,
    keywords: `${bookName} ${chapterNumber} quiz, Bible quiz, multi-level quiz, Christian education, Bible study, ${bookName} chapter ${chapterNumber}, interactive Bible quiz, biblical theology`,
    openGraph: {
      title: `${bookName} Chapter ${chapterNumber} Quiz - Multi-Level Bible Study`,
      description: `Master ${bookName} ${chapterNumber} with our comprehensive multi-level quiz. From beginner-friendly to advanced theological questions.`,
      url: `https://biblemaximum.com/${bookName.toLowerCase()}-${chapterNumber}-quiz`,
      type: 'website',
      images: [
        {
          url: `/images/bible-quiz-${bookName.toLowerCase()}-${chapterNumber}.jpg`,
          width: 1200,
          height: 630,
          alt: `${bookName} Chapter ${chapterNumber} Multi-Level Bible Quiz`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${bookName} ${chapterNumber} Quiz - Multi-Level Bible Study`,
      description: `Test your ${bookName} ${chapterNumber} knowledge with Easy, Medium, Hard, and Theological levels.`,
    },
    alternates: {
      canonical: `https://biblemaximum.com/${bookName.toLowerCase()}-${chapterNumber}-quiz`,
    },
  };
}

// Export the Genesis 1 template as the gold standard
export { GENESIS_1_TABBED_QUIZ } from './genesis-1-quiz-tabbed-system';