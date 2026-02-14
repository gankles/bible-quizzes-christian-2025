import { Quiz } from './types';
import { BIBLE_BOOKS, BIBLE_THEMES, BIBLE_CHARACTERS } from './bible-data';

export interface ImprovedInternalLink {
  title: string;
  href: string;
  description: string;
  type: 'sequential' | 'cross-reference' | 'character' | 'popular' | 'hub';
  priority: number; // 1-5, 1 being highest priority
}

// Improved formula:
// 1. Previous/Next Chapter (if exists)
// 2. Cross-reference quiz (different book, same theme)
// 3. Related character quiz (if prominent in chapter)
// 4. Popular quiz from same book
// 5. Browse all quizzes hub
export function generateImprovedRelatedLinks(quiz: Quiz): ImprovedInternalLink[] {
  const links: ImprovedInternalLink[] = [];

  if (quiz.type === 'chapter' && quiz.book && quiz.chapter) {
    const book = BIBLE_BOOKS.find(b => b.name === quiz.book);
    if (!book) return links;

    const bookSlug = book.slug;
    const currentChapter = quiz.chapter;

    // 1. SEQUENTIAL NAVIGATION (Previous/Next chapter)
    
    // Next chapter (higher priority than previous for forward progression)
    if (currentChapter < book.chapters) {
      links.push({
        title: `${quiz.book} Chapter ${currentChapter + 1} Quiz`,
        href: `/${bookSlug}-${currentChapter + 1}-quiz`,
        description: `Continue to chapter ${currentChapter + 1}`,
        type: 'sequential',
        priority: 1
      });
    }

    // Previous chapter (if user wants to review)
    if (currentChapter > 1) {
      links.push({
        title: `${quiz.book} Chapter ${currentChapter - 1} Quiz`,
        href: `/${bookSlug}-${currentChapter - 1}-quiz`,
        description: `Review chapter ${currentChapter - 1}`,
        type: 'sequential',
        priority: 2
      });
    }

    // 2. SCRIPTURE CROSS-REFERENCES for this chapter
    links.push({
      title: `${quiz.book} ${currentChapter} Cross-References`,
      href: `/cross-references/${bookSlug}/${currentChapter}/1`,
      description: `Explore related scriptures for ${quiz.book} ${currentChapter}`,
      type: 'cross-reference',
      priority: 3
    });

    // 3. CROSS-REFERENCE (Different book, same theme)
    const crossReference = getCrossReference(quiz.book, currentChapter);
    if (crossReference) {
      links.push({
        title: crossReference.title,
        href: crossReference.href,
        description: crossReference.description,
        type: 'cross-reference',
        priority: 3
      });
    }

    // 3. CHARACTER FOCUS (If prominent character in chapter)
    const characterQuiz = getCharacterQuiz(quiz.book, currentChapter);
    if (characterQuiz) {
      links.push({
        title: characterQuiz.title,
        href: characterQuiz.href,
        description: characterQuiz.description,
        type: 'character',
        priority: 4
      });
    }

    // 4. POPULAR QUIZ FROM SAME BOOK
    const popularQuiz = getPopularQuizFromBook(quiz.book, currentChapter);
    if (popularQuiz) {
      links.push({
        title: popularQuiz.title,
        href: popularQuiz.href,
        description: popularQuiz.description,
        type: 'popular',
        priority: 5
      });
    }

  } else if (quiz.type === 'book' && quiz.book) {
    // For book quizzes, focus on related books and key chapters
    const relatedBooks = getRelatedBooks(quiz.book);
    const keyChapters = getKeyChaptersFromBook(quiz.book);

    relatedBooks.slice(0, 2).forEach((book, index) => {
      links.push({
        title: `${book.name} Quiz`,
        href: `/${book.slug}-quiz`,
        description: `Explore ${book.name}`,
        type: 'cross-reference',
        priority: index + 1
      });
    });

    keyChapters.slice(0, 2).forEach((chapter, index) => {
      links.push({
        title: chapter.title,
        href: chapter.href,
        description: chapter.description,
        type: 'popular',
        priority: index + 3
      });
    });
  }

  // 5. ALWAYS ADD HUB (Browse all quizzes)
  links.push({
    title: 'Browse All Bible Quizzes',
    href: '/bible-quizzes',
    description: 'Explore our complete collection',
    type: 'hub',
    priority: 6
  });

  // Sort by priority and limit to 5 links
  return links.sort((a, b) => a.priority - b.priority).slice(0, 5);
}

// Cross-reference mapping (different books, same themes)
function getCrossReference(book: string, chapter: number): ImprovedInternalLink | null {
  const crossReferenceMap: Record<string, Record<number, ImprovedInternalLink>> = {
    'Genesis': {
      1: { title: 'John Chapter 1 Quiz', href: '/john-1-quiz', description: 'The Word creates all things', type: 'cross-reference', priority: 3 },
      2: { title: 'Revelation 22 Quiz', href: '/revelation-22-quiz', description: 'Return to Paradise', type: 'cross-reference', priority: 3 },
      3: { title: 'Romans 5 Quiz', href: '/romans-5-quiz', description: 'Adam and sin entering the world', type: 'cross-reference', priority: 3 },
      6: { title: '2 Peter 3 Quiz', href: '/2-peter-3-quiz', description: 'God\'s judgment by water and fire', type: 'cross-reference', priority: 3 },
      12: { title: 'Romans 4 Quiz', href: '/romans-4-quiz', description: 'Abraham\'s faith and righteousness', type: 'cross-reference', priority: 3 },
      22: { title: 'Hebrews 11 Quiz', href: '/hebrews-11-quiz', description: 'Abraham\'s ultimate test of faith', type: 'cross-reference', priority: 3 }
    },
    'Matthew': {
      1: { title: 'Luke 2 Quiz', href: '/luke-2-quiz', description: 'The birth of Jesus Christ', type: 'cross-reference', priority: 3 },
      5: { title: 'Luke 6 Quiz', href: '/luke-6-quiz', description: 'Jesus\' teachings on the plain', type: 'cross-reference', priority: 3 },
      28: { title: 'Luke 24 Quiz', href: '/luke-24-quiz', description: 'Resurrection appearances', type: 'cross-reference', priority: 3 }
    },
    'John': {
      1: { title: 'Genesis 1 Quiz', href: '/genesis-1-quiz', description: 'In the beginning was the Word', type: 'cross-reference', priority: 3 },
      3: { title: 'Romans 10 Quiz', href: '/romans-10-quiz', description: 'Salvation by faith', type: 'cross-reference', priority: 3 },
      14: { title: 'Philippians 4 Quiz', href: '/philippians-4-quiz', description: 'Peace and comfort in Christ', type: 'cross-reference', priority: 3 }
    },
    'Romans': {
      8: { title: 'Galatians 5 Quiz', href: '/galatians-5-quiz', description: 'Walking in the Spirit', type: 'cross-reference', priority: 3 },
      12: { title: '1 Corinthians 12 Quiz', href: '/1-corinthians-12-quiz', description: 'Body of Christ and spiritual gifts', type: 'cross-reference', priority: 3 }
    }
  };

  return crossReferenceMap[book]?.[chapter] || null;
}

// Character-focused quizzes for chapters with prominent characters
function getCharacterQuiz(book: string, chapter: number): ImprovedInternalLink | null {
  const characterMap: Record<string, Record<number, ImprovedInternalLink>> = {
    'Genesis': {
      1: { title: 'God the Creator Quiz', href: '/god-creator-quiz', description: 'Learn about God\'s creative power', type: 'character', priority: 4 },
      3: { title: 'Adam and Eve Quiz', href: '/adam-eve-quiz', description: 'The first humans and the fall', type: 'character', priority: 4 },
      6: { title: 'Noah Quiz', href: '/noah-quiz', description: 'The righteous man and the ark', type: 'character', priority: 4 },
      12: { title: 'Abraham Quiz', href: '/abraham-quiz', description: 'The father of faith', type: 'character', priority: 4 },
      37: { title: 'Joseph Quiz', href: '/joseph-quiz', description: 'Dreams, trials, and God\'s providence', type: 'character', priority: 4 }
    },
    'Matthew': {
      1: { title: 'Jesus Christ Quiz', href: '/jesus-christ-quiz', description: 'The promised Messiah', type: 'character', priority: 4 },
      3: { title: 'John the Baptist Quiz', href: '/john-baptist-quiz', description: 'The forerunner of Christ', type: 'character', priority: 4 }
    },
    'John': {
      3: { title: 'Nicodemus Quiz', href: '/nicodemus-quiz', description: 'The teacher who met Jesus at night', type: 'character', priority: 4 },
      11: { title: 'Mary and Martha Quiz', href: '/mary-martha-quiz', description: 'Sisters of Lazarus', type: 'character', priority: 4 }
    }
  };

  return characterMap[book]?.[chapter] || null;
}

// Popular quizzes from the same book (data-driven or manually curated)
function getPopularQuizFromBook(book: string, currentChapter: number): ImprovedInternalLink | null {
  const popularQuizzes: Record<string, ImprovedInternalLink[]> = {
    'Genesis': [
      { title: 'Genesis 22 Quiz', href: '/genesis-22-quiz', description: 'Abraham\'s test - most popular Genesis quiz', type: 'popular', priority: 5 },
      { title: 'Genesis 37 Quiz', href: '/genesis-37-quiz', description: 'Joseph\'s dreams and colorful coat', type: 'popular', priority: 5 },
      { title: 'Complete Genesis Quiz', href: '/genesis-quiz', description: 'Full book quiz with 50 questions', type: 'popular', priority: 5 }
    ],
    'Matthew': [
      { title: 'Matthew 5 Quiz', href: '/matthew-5-quiz', description: 'The Beatitudes - most popular', type: 'popular', priority: 5 },
      { title: 'Matthew 28 Quiz', href: '/matthew-28-quiz', description: 'The Great Commission', type: 'popular', priority: 5 },
      { title: 'Complete Matthew Quiz', href: '/matthew-quiz', description: 'Full Gospel quiz', type: 'popular', priority: 5 }
    ],
    'John': [
      { title: 'John 3 Quiz', href: '/john-3-quiz', description: 'Most popular - John 3:16', type: 'popular', priority: 5 },
      { title: 'John 14 Quiz', href: '/john-14-quiz', description: 'Jesus comforts His disciples', type: 'popular', priority: 5 },
      { title: 'Complete John Quiz', href: '/john-quiz', description: 'Full Gospel quiz', type: 'popular', priority: 5 }
    ],
    'Romans': [
      { title: 'Romans 8 Quiz', href: '/romans-8-quiz', description: 'Most popular - Life in the Spirit', type: 'popular', priority: 5 },
      { title: 'Romans 3 Quiz', href: '/romans-3-quiz', description: 'All have sinned', type: 'popular', priority: 5 },
      { title: 'Complete Romans Quiz', href: '/romans-quiz', description: 'Full epistle quiz', type: 'popular', priority: 5 }
    ]
  };

  const bookQuizzes = popularQuizzes[book] || [];
  // Return first quiz that's not the current chapter
  return bookQuizzes.find(quiz => 
    !quiz.href.includes(`${book.toLowerCase()}-${currentChapter}-quiz`)
  ) || bookQuizzes[0] || null;
}

// Helper function to get related books (same testament, similar themes)
function getRelatedBooks(bookName: string): typeof BIBLE_BOOKS[number][] {
  const currentBook = BIBLE_BOOKS.find(b => b.name === bookName);
  if (!currentBook) return [];

  // Get books from same testament, exclude current book
  const relatedBooks = BIBLE_BOOKS
    .filter(book => book.testament === currentBook.testament && book.name !== bookName)
    .slice(0, 3);

  return relatedBooks;
}

// Helper function to get key chapters from a book
function getKeyChaptersFromBook(bookName: string): ImprovedInternalLink[] {
  const keyChapters: Record<string, ImprovedInternalLink[]> = {
    'Genesis': [
      { title: 'Genesis 1 Quiz', href: '/genesis-1-quiz', description: 'Creation account', type: 'popular', priority: 3 },
      { title: 'Genesis 22 Quiz', href: '/genesis-22-quiz', description: 'Abraham\'s test', type: 'popular', priority: 3 }
    ],
    'Matthew': [
      { title: 'Matthew 5 Quiz', href: '/matthew-5-quiz', description: 'The Beatitudes', type: 'popular', priority: 3 },
      { title: 'Matthew 28 Quiz', href: '/matthew-28-quiz', description: 'Great Commission', type: 'popular', priority: 3 }
    ]
  };

  return keyChapters[bookName] || [];
}