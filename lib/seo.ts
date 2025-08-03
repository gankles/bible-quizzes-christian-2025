import { Quiz } from './types';

// Generate JSON-LD schema for Quiz pages
export const generateQuizSchema = (quiz: Quiz, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": quiz.title,
    "description": quiz.description,
    "about": {
      "@type": "Thing",
      "name": quiz.book ? `${quiz.book}${quiz.chapter ? ` Chapter ${quiz.chapter}` : ''}` : quiz.theme || quiz.character
    },
    "educationalLevel": quiz.difficulty === 'easy' ? 'Beginner' : quiz.difficulty === 'medium' ? 'Intermediate' : 'Advanced',
    "assesses": "Bible Knowledge",
    "typicalAgeRange": "13-99",
    "timeRequired": `PT${quiz.estimatedTime}M`,
    "interactivityType": "active",
    "learningResourceType": "assessment",
    "url": url,
    "numberOfQuestions": quiz.totalQuestions,
    "hasPart": quiz.questions.slice(0, 3).map((question, index) => ({
      "@type": "Question",
      "name": `Question ${index + 1}`,
      "text": question.question,
      "answerCount": question.options?.length || 2,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": question.correctAnswer
      }
    }))
  };
};

// Generate LearningResource schema
export const generateLearningResourceSchema = (quiz: Quiz, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": quiz.title,
    "description": quiz.description,
    "educationalLevel": [quiz.difficulty],
    "teaches": `Biblical knowledge of ${quiz.book ? `${quiz.book}${quiz.chapter ? ` chapter ${quiz.chapter}` : ''}` : quiz.theme || quiz.character}`,
    "assesses": `Biblical knowledge of ${quiz.book ? `${quiz.book}${quiz.chapter ? ` chapter ${quiz.chapter}` : ''}` : quiz.theme || quiz.character}`,
    "typicalAgeRange": "13-99",
    "timeRequired": `PT${quiz.estimatedTime}M`,
    "url": url,
    "interactivityType": "active",
    "learningResourceType": "assessment"
  };
};

// Generate WebPage schema
export const generateWebPageSchema = (quiz: Quiz, url: string) => {
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Bible Quizzes",
      "item": "/bible-quizzes"
    }
  ];

  if (quiz.book) {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "name": `${quiz.book} Quizzes`,
      "item": `/${quiz.book.toLowerCase().replace(/\s+/g, '-')}-quiz`
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": quiz.title,
    "description": quiz.description,
    "url": url,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    },
    "mainEntity": {
      "@type": "Quiz",
      "name": quiz.title
    }
  };
};

// Generate Organization schema
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bible Maximum",
    "url": "/",
    "logo": "/logo.png",
    "description": "Comprehensive Bible quizzes for all 66 books with 16-25 questions each. Test your biblical knowledge with our interactive quizzes covering Old and New Testament.",
    "sameAs": [
      "https://facebook.com/biblemaximum",
      "https://twitter.com/biblemaximum"
    ]
  };
};

// Generate FAQ schema for quiz pages
export const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many questions are in each Bible quiz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Each Bible quiz contains 16-25 carefully crafted questions with multiple choice answers and detailed explanations. Chapter quizzes have 16-20 questions, while book quizzes have 20-25 questions."
        }
      },
      {
        "@type": "Question",
        "name": "Are the Bible quizzes suitable for beginners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our quizzes are designed for all skill levels with clear difficulty indicators and explanations for each answer. We offer easy, medium, and hard difficulty levels."
        }
      },
      {
        "@type": "Question",
        "name": "Do the quizzes include Bible verse references?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Every question includes the specific Bible verse reference and detailed explanations to help you learn and understand the context."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to complete a quiz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most quizzes take 5-15 minutes to complete, depending on the number of questions and difficulty level. Chapter quizzes average 8-12 minutes, while book quizzes take 12-18 minutes."
        }
      }
    ]
  };
};

// Generate meta tags for SEO
export const generateMetaTags = (quiz: Quiz, url: string) => {
  const title = quiz.type === 'chapter' 
    ? `${quiz.book} Chapter ${quiz.chapter} Quiz - Test Your Bible Knowledge | Bible Maximum`
    : quiz.type === 'book'
    ? `${quiz.book} Quiz - Complete Bible Book Quiz | Bible Maximum`
    : quiz.type === 'character'
    ? `${quiz.character} Bible Quiz - Test Your Knowledge | Bible Maximum`
    : `${quiz.theme} Bible Quiz - Scripture Knowledge Test | Bible Maximum`;

  const description = quiz.type === 'chapter'
    ? `Test your knowledge of ${quiz.book} chapter ${quiz.chapter} with this interactive Bible quiz. ${quiz.totalQuestions} questions covering key verses, characters, and themes. Free instant results!`
    : quiz.type === 'book'
    ? `Challenge yourself with this comprehensive ${quiz.book} Bible quiz! ${quiz.totalQuestions} questions covering the entire book with detailed explanations and Bible references.`
    : quiz.type === 'character'
    ? `Challenge yourself with this ${quiz.character} Bible quiz! ${quiz.totalQuestions} questions about their life, faith journey, and key biblical moments. Test your knowledge now!`
    : `Explore ${quiz.theme} in Scripture with this comprehensive Bible quiz. ${quiz.totalQuestions} questions from Old and New Testament passages. Perfect for Bible study groups!`;

  const keywords = [
    quiz.book?.toLowerCase(),
    quiz.chapter ? `chapter ${quiz.chapter}` : '',
    'bible quiz',
    'scripture test',
    'bible knowledge',
    'christian quiz',
    quiz.character?.toLowerCase(),
    quiz.theme?.toLowerCase(),
    ...(quiz.tags || [])
  ].filter(Boolean);

  return {
    title,
    description,
    keywords: keywords.join(', '),
    canonical: url,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description
  };
};

// Generate all schemas for a quiz page
export const generateAllSchemas = (quiz: Quiz, url: string) => {
  return [
    generateQuizSchema(quiz, url),
    generateLearningResourceSchema(quiz, url),
    generateWebPageSchema(quiz, url),
    generateOrganizationSchema(),
    generateFAQSchema()
  ];
};