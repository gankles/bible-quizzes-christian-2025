import { Quiz } from './types';
import { BIBLE_BOOKS, BIBLE_THEMES, BIBLE_CHARACTERS } from './bible-data';

export interface InternalLink {
  title: string;
  href: string;
  description: string;
  type: 'quiz' | 'book' | 'hub' | 'theme' | 'character';
}

// Generate smart related links with SEQUENTIAL CHAPTER PRIORITY:
// 1. Next 4 consecutive chapters (e.g., Genesis 2, 3, 4, 5)
// 2. Complete book quiz (e.g., Complete Genesis Quiz)
// 3. Related topic/theme quiz (if space available)
// This creates natural Bible study progression through consecutive chapters
export function generateRelatedLinks(quiz: Quiz): InternalLink[] {
  const links: InternalLink[] = [];

  if (quiz.type === 'chapter' && quiz.book && quiz.chapter) {
    const book = BIBLE_BOOKS.find(b => b.name === quiz.book);
    if (!book) return links;

    const bookSlug = book.slug;
    const currentChapter = quiz.chapter;

    // 1. SEQUENTIAL CHAPTER PROGRESSION (Priority 1-4: Next 4 consecutive chapters)
    for (let i = 1; i <= 4; i++) {
      const nextChapter = currentChapter + i;
      if (nextChapter <= book.chapters) {
        links.push({
          title: `${quiz.book} Chapter ${nextChapter} Quiz`,
          href: `/${bookSlug}-${nextChapter}-quiz`,
          description: `Continue to chapter ${nextChapter}`,
          type: 'quiz'
        });
      }
    }

    // 2. Chapter Summary (Priority 5)
    links.push({
      title: `${quiz.book} ${currentChapter} Summary`,
      href: `/bible-chapter-summaries/${bookSlug}/${currentChapter}`,
      description: `Read the full summary of ${quiz.book} chapter ${currentChapter}`,
      type: 'study-guide' as any
    });

    // 3. Chapter Geography (Priority 6)
    links.push({
      title: `${quiz.book} ${currentChapter} Places & Map`,
      href: `/bible-geography/${bookSlug}/${currentChapter}`,
      description: `Explore locations mentioned in ${quiz.book} ${currentChapter}`,
      type: 'study-guide' as any
    });

    // 4. Cross-references for this chapter (Priority 7)
    links.push({
      title: `${quiz.book} ${currentChapter} Cross-References`,
      href: `/cross-references/${bookSlug}/${currentChapter}/1`,
      description: `Explore related scriptures for ${quiz.book} ${currentChapter}`,
      type: 'study-guide' as any
    });

    // 5. Complete book quiz (Priority 8)
    links.push({
      title: `Complete ${quiz.book} Quiz`,
      href: `/${bookSlug}-quiz`,
      description: `Take the full ${quiz.book} book quiz with 25-30 questions`,
      type: 'book'
    });

    // 6. Related topic/theme quiz if we still need more links (Priority 9)
    if (links.length < 6) {
      const relatedTheme = getRelatedTheme(quiz.book, currentChapter);
      if (relatedTheme) {
        links.push({
          title: relatedTheme.title,
          href: relatedTheme.href,
          description: relatedTheme.description,
          type: 'theme'
        });
      }
    }

  } else if (quiz.type === 'book' && quiz.book) {
    // For book quizzes, add chapter quizzes and related themes
    const book = BIBLE_BOOKS.find(b => b.name === quiz.book);
    
    if (book) {
      // Add some popular chapter quizzes from this book
      const popularChapters = getPopularChaptersForBook(quiz.book);
      popularChapters.forEach(chapter => {
        links.push({
          title: chapter.title,
          href: chapter.href,
          description: chapter.description,
          type: 'quiz'
        });
      });
    }

    // Add related themes for this book
    const relatedThemes = getRelatedThemesForBook(quiz.book);
    relatedThemes.forEach(theme => {
      links.push({
        title: theme.title,
        href: theme.href,
        description: theme.description,
        type: 'theme'
      });
    });

    // Add related books from same testament
    const relatedBooks = getRelatedBooks(quiz.book);
    relatedBooks.slice(0, 2).forEach(book => {
      links.push({
        title: `${book.name} Quiz`,
        href: `/${book.slug}-quiz`,
        description: `Explore ${book.name}`,
        type: 'book'
      });
    });

  } else if (quiz.type === 'character' && quiz.character) {
    // For character quizzes, link to related characters and books they appear in
    const relatedCharacters = getRelatedCharacters(quiz.character);
    const relatedBooks = getBooksWithCharacter(quiz.character);

    relatedCharacters.forEach(character => {
      links.push({
        title: `${character} Bible Quiz`,
        href: `/${character.toLowerCase()}-quiz`,
        description: `Learn about ${character}`,
        type: 'character'
      });
    });

    relatedBooks.forEach(book => {
      links.push({
        title: `${book.name} Quiz`,
        href: `/${book.slug}-quiz`,
        description: `${quiz.character} appears in ${book.name}`,
        type: 'book'
      });
    });

  } else if (quiz.type === 'theme' && quiz.theme) {
    // For theme quizzes, link to related themes and relevant books
    const relatedThemes = getRelatedThemesByTopic(quiz.theme);
    const relatedBooks = getBooksWithTheme(quiz.theme);

    relatedThemes.forEach(theme => {
      links.push({
        title: theme.title,
        href: theme.href,
        description: theme.description,
        type: 'theme'
      });
    });

    relatedBooks.forEach(book => {
      links.push({
        title: `${book.name} Quiz`,
        href: `/${book.slug}-quiz`,
        description: `${quiz.theme} themes in ${book.name}`,
        type: 'book'
      });
    });
  }

  // Always add the main hub link
  links.push({
    title: 'Browse All Bible Quizzes',
    href: '/bible-quizzes',
    description: 'Explore our complete collection',
    type: 'hub'
  });

  // If we don't have enough links, add popular general quizzes to reach 6
  while (links.length < 6) {
    const fallbackLinks: InternalLink[] = [
      { title: 'John 3:16 Explained', href: '/john-3-16', description: 'The most famous Bible verse', type: 'theme' },
      { title: 'Psalm 23 Explained', href: '/psalm-23', description: 'The Lord is my shepherd', type: 'theme' },
      { title: 'Jeremiah 29:11 Explained', href: '/jeremiah-29-11', description: 'God\'s plan for you', type: 'theme' },
      { title: 'Romans 8:28 Explained', href: '/romans-8-28', description: 'All things for good', type: 'theme' },
      { title: 'Philippians 4:13 Explained', href: '/philippians-4-13', description: 'Strength through Christ', type: 'theme' },
      { title: 'Jesus Christ Quiz', href: '/jesus-christ-quiz', description: 'Learn about the Savior', type: 'character' },
      { title: 'Salvation Quiz', href: '/salvation-quiz', description: 'How to be saved', type: 'theme' },
      { title: 'Prayer Quiz', href: '/prayer-quiz', description: 'Talking with God', type: 'theme' },
      { title: 'Faith Quiz', href: '/faith-quiz', description: 'Trusting God', type: 'theme' },
      { title: 'Love Quiz', href: '/love-quiz', description: 'God\'s greatest gift', type: 'theme' },
      { title: 'Bible Characters Quiz', href: '/bible-characters-quiz', description: 'Heroes of faith', type: 'character' }
    ];
    
    // Find a fallback link that's not already in our list
    const availableLink = fallbackLinks.find(fallback => 
      !links.some(existing => existing.href === fallback.href)
    );
    
    if (availableLink) {
      links.push(availableLink);
    } else {
      break; // Prevent infinite loop if we somehow can't find any more links
    }
  }

  // Return exactly 8 links total for consistent UI across all quiz pages
  return links.slice(0, 8);
}

// Helper function to get related theme based on book and chapter content
function getRelatedTheme(book: string, chapter: number): InternalLink | null {
  const themeMap: Record<string, Record<number, InternalLink>> = {
    'Genesis': {
      1: { title: 'Creation Quiz', href: '/creation-quiz', description: 'Explore biblical creation', type: 'theme' },
      2: { title: 'Creation Quiz', href: '/creation-quiz', description: 'Garden of Eden themes', type: 'theme' },
      3: { title: 'Biblical Sin Quiz', href: '/sin-quiz', description: 'Fall of mankind', type: 'theme' },
      6: { title: 'Noah\'s Ark Quiz', href: '/noahs-ark-quiz', description: 'The great flood', type: 'theme' },
      12: { title: 'Abraham Quiz', href: '/abraham-quiz', description: 'Father of faith', type: 'character' },
      22: { title: 'Faith Quiz', href: '/faith-quiz', description: 'Abraham\'s sacrifice', type: 'theme' },
      37: { title: 'Joseph Quiz', href: '/joseph-quiz', description: 'Dreams and forgiveness', type: 'character' }
    },
    'Matthew': {
      1: { title: 'Christmas Quiz', href: '/christmas-bible-quiz', description: 'Birth of Jesus', type: 'theme' },
      5: { title: 'Sermon on the Mount Quiz', href: '/sermon-mount-quiz', description: 'Beatitudes and teachings', type: 'theme' },
      6: { title: 'Lord\'s Prayer Quiz', href: '/lords-prayer-quiz', description: 'How to pray', type: 'theme' },
      13: { title: 'Parables Quiz', href: '/parables-quiz', description: 'Jesus\' parables', type: 'theme' },
      28: { title: 'Resurrection Quiz', href: '/resurrection-quiz', description: 'Christ\'s victory', type: 'theme' }
    },
    'John': {
      3: { title: 'John 3:16 Explained', href: '/john-3-16', description: 'Word-by-word study of the most famous verse', type: 'theme' },
      14: { title: 'Jesus\' Promises Quiz', href: '/jesus-promises-quiz', description: 'Comfort and hope', type: 'theme' },
      20: { title: 'Resurrection Quiz', href: '/resurrection-quiz', description: 'Easter morning', type: 'theme' }
    },
    'Romans': {
      8: { title: 'Romans 8:28 Explained', href: '/romans-8-28', description: 'All things work together for good', type: 'theme' },
      12: { title: 'Christian Living Quiz', href: '/christian-living-quiz', description: 'Practical faith', type: 'theme' }
    },
    'Psalms': {
      23: { title: 'Psalm 23 Explained', href: '/psalm-23', description: 'The Lord is my shepherd — verse-by-verse', type: 'theme' },
      1: { title: 'Blessed Life Quiz', href: '/blessed-life-quiz', description: 'Tree by the water', type: 'theme' }
    },
    'Jeremiah': {
      29: { title: 'Jeremiah 29:11 Explained', href: '/jeremiah-29-11', description: 'God\'s plan of hope and a future', type: 'theme' }
    },
    'Philippians': {
      4: { title: 'Philippians 4:13 Explained', href: '/philippians-4-13', description: 'I can do all things through Christ', type: 'theme' }
    },
    'Proverbs': {
      3: { title: 'Proverbs 3:5-6 Explained', href: '/proverbs-3-5-6', description: 'Trust in the Lord with all your heart', type: 'theme' }
    },
    'Isaiah': {
      41: { title: 'Isaiah 41:10 Explained', href: '/isaiah-41-10', description: 'Fear not, for I am with thee', type: 'theme' }
    }
  };

  return themeMap[book]?.[chapter] || null;
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

// Helper function to get related themes for a book
function getRelatedThemesForBook(bookName: string): InternalLink[] {
  const themesByBook: Record<string, InternalLink[]> = {
    'Genesis': [
      { title: 'Creation Quiz', href: '/creation-quiz', description: 'Biblical creation account', type: 'theme' },
      { title: 'Abraham Quiz', href: '/abraham-quiz', description: 'Father of faith', type: 'character' },
      { title: 'Joseph Quiz', href: '/joseph-quiz', description: 'Dreams and providence', type: 'character' },
      { title: 'Noah Quiz', href: '/noah-quiz', description: 'The ark and covenant', type: 'character' }
    ],
    'Exodus': [
      { title: 'Moses Quiz', href: '/moses-quiz', description: 'Deliverer of Israel', type: 'character' },
      { title: 'Ten Commandments Quiz', href: '/ten-commandments-quiz', description: 'God\'s moral law', type: 'theme' },
      { title: 'Passover Quiz', href: '/passover-quiz', description: 'God\'s deliverance', type: 'theme' }
    ],
    'Leviticus': [
      { title: 'Sacrifices Quiz', href: '/sacrifices-quiz', description: 'Old Testament offerings', type: 'theme' },
      { title: 'Holiness Quiz', href: '/holiness-quiz', description: 'Be holy as I am holy', type: 'theme' }
    ],
    'Numbers': [
      { title: 'Wilderness Quiz', href: '/wilderness-quiz', description: '40 years in the desert', type: 'theme' },
      { title: 'Faith Quiz', href: '/faith-quiz', description: 'Trusting God\'s promises', type: 'theme' }
    ],
    'Deuteronomy': [
      { title: 'Obedience Quiz', href: '/obedience-quiz', description: 'Following God\'s commands', type: 'theme' },
      { title: 'Promised Land Quiz', href: '/promised-land-quiz', description: 'God\'s inheritance', type: 'theme' }
    ],
    'Psalms': [
      { title: 'Psalm 23 Explained', href: '/psalm-23', description: 'The Lord is My Shepherd study', type: 'theme' },
      { title: 'Worship Quiz', href: '/worship-quiz', description: 'Praising the Lord', type: 'theme' },
      { title: 'David Quiz', href: '/david-quiz', description: 'Man after God\'s heart', type: 'character' },
      { title: 'Prayer Quiz', href: '/prayer-quiz', description: 'Talking with God', type: 'theme' }
    ],
    'Proverbs': [
      { title: 'Proverbs 3:5-6 Explained', href: '/proverbs-3-5-6', description: 'Trust in the Lord with all your heart', type: 'theme' },
      { title: 'Wisdom Quiz', href: '/wisdom-quiz', description: 'Fear of the Lord', type: 'theme' },
      { title: 'Solomon Quiz', href: '/solomon-quiz', description: 'Wisest king', type: 'character' }
    ],
    'Isaiah': [
      { title: 'Isaiah 41:10 Explained', href: '/isaiah-41-10', description: 'Fear not, for I am with thee', type: 'theme' },
      { title: 'Prophecy Quiz', href: '/prophecy-quiz', description: 'Messianic prophecies', type: 'theme' }
    ],
    'Jeremiah': [
      { title: 'Jeremiah 29:11 Explained', href: '/jeremiah-29-11', description: 'God\'s plan of hope and a future', type: 'theme' }
    ],
    'Philippians': [
      { title: 'Philippians 4:13 Explained', href: '/philippians-4-13', description: 'I can do all things through Christ', type: 'theme' }
    ],
    'Matthew': [
      { title: 'Parables Quiz', href: '/parables-quiz', description: 'Jesus\' teaching stories', type: 'theme' },
      { title: 'Miracles Quiz', href: '/miracles-jesus-quiz', description: 'Signs and wonders', type: 'theme' },
      { title: 'Sermon on Mount Quiz', href: '/sermon-mount-quiz', description: 'Greatest sermon', type: 'theme' },
      { title: 'Jesus Christ Quiz', href: '/jesus-christ-quiz', description: 'Son of God', type: 'character' }
    ],
    'John': [
      { title: 'John 3:16 Explained', href: '/john-3-16', description: 'The most famous verse in the Bible', type: 'theme' },
      { title: 'Eternal Life Quiz', href: '/eternal-life-quiz', description: 'Gift of salvation', type: 'theme' },
      { title: 'Love Quiz', href: '/love-quiz', description: 'God\'s greatest commandment', type: 'theme' },
      { title: 'Jesus Christ Quiz', href: '/jesus-christ-quiz', description: 'I Am statements', type: 'character' }
    ],
    'Romans': [
      { title: 'Romans 8:28 Explained', href: '/romans-8-28', description: 'All things work together for good', type: 'theme' },
      { title: 'Salvation Quiz', href: '/salvation-quiz', description: 'Saved by grace', type: 'theme' },
      { title: 'Paul Quiz', href: '/paul-quiz', description: 'Apostle to Gentiles', type: 'character' },
      { title: 'Grace Quiz', href: '/grace-quiz', description: 'Unmerited favor', type: 'theme' }
    ],
    'Revelation': [
      { title: 'Second Coming Quiz', href: '/second-coming-quiz', description: 'Return of Christ', type: 'theme' },
      { title: 'Heaven Quiz', href: '/heaven-quiz', description: 'Eternal home', type: 'theme' },
      { title: 'Prophecy Quiz', href: '/prophecy-quiz', description: 'End times', type: 'theme' }
    ]
  };

  return themesByBook[bookName] || [];
}

// Helper function to get popular chapters for a book
function getPopularChaptersForBook(bookName: string): InternalLink[] {
  const popularChapters: Record<string, InternalLink[]> = {
    'Genesis': [
      { title: 'Genesis Chapter 1 Quiz', href: '/genesis-1-quiz', description: 'Creation account', type: 'quiz' },
      { title: 'Genesis Chapter 3 Quiz', href: '/genesis-3-quiz', description: 'The fall of mankind', type: 'quiz' },
      { title: 'Genesis Chapter 22 Quiz', href: '/genesis-22-quiz', description: 'Abraham\'s greatest test', type: 'quiz' },
      { title: 'Genesis Chapter 37 Quiz', href: '/genesis-37-quiz', description: 'Joseph\'s dreams', type: 'quiz' }
    ],
    'Exodus': [
      { title: 'Exodus Chapter 20 Quiz', href: '/exodus-20-quiz', description: 'The Ten Commandments', type: 'quiz' },
      { title: 'Exodus Chapter 14 Quiz', href: '/exodus-14-quiz', description: 'Crossing the Red Sea', type: 'quiz' },
      { title: 'Exodus Chapter 3 Quiz', href: '/exodus-3-quiz', description: 'Burning bush', type: 'quiz' },
      { title: 'Exodus Chapter 12 Quiz', href: '/exodus-12-quiz', description: 'The Passover', type: 'quiz' }
    ],
    'Leviticus': [
      { title: 'Leviticus Chapter 16 Quiz', href: '/leviticus-16-quiz', description: 'Day of Atonement', type: 'quiz' },
      { title: 'Leviticus Chapter 23 Quiz', href: '/leviticus-23-quiz', description: 'Feasts of the Lord', type: 'quiz' }
    ],
    'Numbers': [
      { title: 'Numbers Chapter 14 Quiz', href: '/numbers-14-quiz', description: 'Spies in the land', type: 'quiz' },
      { title: 'Numbers Chapter 22 Quiz', href: '/numbers-22-quiz', description: 'Balaam and his donkey', type: 'quiz' }
    ],
    'Deuteronomy': [
      { title: 'Deuteronomy Chapter 6 Quiz', href: '/deuteronomy-6-quiz', description: 'The Shema', type: 'quiz' },
      { title: 'Deuteronomy Chapter 30 Quiz', href: '/deuteronomy-30-quiz', description: 'Choose life', type: 'quiz' }
    ],
    'Psalms': [
      { title: 'Psalms Chapter 23 Quiz', href: '/psalms-23-quiz', description: 'The Shepherd\'s Psalm', type: 'quiz' },
      { title: 'Psalms Chapter 1 Quiz', href: '/psalms-1-quiz', description: 'Blessed is the man', type: 'quiz' },
      { title: 'Psalms Chapter 91 Quiz', href: '/psalms-91-quiz', description: 'Under His wings', type: 'quiz' }
    ],
    'Proverbs': [
      { title: 'Proverbs Chapter 31 Quiz', href: '/proverbs-31-quiz', description: 'The virtuous woman', type: 'quiz' },
      { title: 'Proverbs Chapter 3 Quiz', href: '/proverbs-3-quiz', description: 'Trust in the Lord', type: 'quiz' }
    ],
    'Matthew': [
      { title: 'Matthew Chapter 5 Quiz', href: '/matthew-5-quiz', description: 'The Beatitudes', type: 'quiz' },
      { title: 'Matthew Chapter 28 Quiz', href: '/matthew-28-quiz', description: 'The Great Commission', type: 'quiz' },
      { title: 'Matthew Chapter 6 Quiz', href: '/matthew-6-quiz', description: 'The Lord\'s Prayer', type: 'quiz' },
      { title: 'Matthew Chapter 2 Quiz', href: '/matthew-2-quiz', description: 'The wise men', type: 'quiz' }
    ],
    'John': [
      { title: 'John Chapter 3 Quiz', href: '/john-3-quiz', description: 'Born again message', type: 'quiz' },
      { title: 'John Chapter 14 Quiz', href: '/john-14-quiz', description: 'Jesus comforts disciples', type: 'quiz' },
      { title: 'John Chapter 1 Quiz', href: '/john-1-quiz', description: 'The Word made flesh', type: 'quiz' },
      { title: 'John Chapter 11 Quiz', href: '/john-11-quiz', description: 'Lazarus raised', type: 'quiz' }
    ],
    'Romans': [
      { title: 'Romans Chapter 8 Quiz', href: '/romans-8-quiz', description: 'Life in the Spirit', type: 'quiz' },
      { title: 'Romans Chapter 3 Quiz', href: '/romans-3-quiz', description: 'All have sinned', type: 'quiz' },
      { title: 'Romans Chapter 12 Quiz', href: '/romans-12-quiz', description: 'Living sacrifice', type: 'quiz' }
    ],
    'Revelation': [
      { title: 'Revelation Chapter 21 Quiz', href: '/revelation-21-quiz', description: 'New heaven and earth', type: 'quiz' },
      { title: 'Revelation Chapter 1 Quiz', href: '/revelation-1-quiz', description: 'Vision of Christ', type: 'quiz' }
    ]
  };

  return popularChapters[bookName] || [];
}

// Helper function to get related characters
function getRelatedCharacters(characterName: string): string[] {
  const characterGroups: Record<string, string[]> = {
    'Abraham': ['Isaac', 'Jacob', 'Moses'],
    'Moses': ['Aaron', 'Joshua', 'David'],
    'David': ['Solomon', 'Samuel', 'Jonathan'],
    'Jesus': ['John Baptist', 'Peter', 'Paul'],
    'Paul': ['Timothy', 'Barnabas', 'Silas'],
    'Peter': ['John', 'James', 'Andrew']
  };

  return characterGroups[characterName] || [];
}

// Helper function to get books where a character appears
function getBooksWithCharacter(characterName: string): typeof BIBLE_BOOKS[number][] {
  const characterBooks: Record<string, string[]> = {
    'Abraham': ['Genesis', 'Romans', 'Hebrews'],
    'Moses': ['Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'],
    'David': ['1 Samuel', '2 Samuel', '1 Kings', 'Psalms'],
    'Jesus': ['Matthew', 'Mark', 'Luke', 'John'],
    'Paul': ['Acts', 'Romans', '1 Corinthians', '2 Corinthians']
  };

  const bookNames = characterBooks[characterName] || [];
  return BIBLE_BOOKS.filter(book => bookNames.includes(book.name));
}

// Helper function to get related themes by topic
function getRelatedThemesByTopic(themeName: string): InternalLink[] {
  const relatedThemes: Record<string, InternalLink[]> = {
    'creation': [
      { title: 'Noah\'s Ark Quiz', href: '/noahs-ark-quiz', description: 'God\'s judgment and mercy', type: 'theme' },
      { title: 'Psalms Creation Quiz', href: '/psalms-creation-quiz', description: 'Praising the Creator', type: 'theme' }
    ],
    'miracles': [
      { title: 'Faith Quiz', href: '/faith-quiz', description: 'Power of believing', type: 'theme' },
      { title: 'Prayer Quiz', href: '/prayer-quiz', description: 'Talking to God', type: 'theme' }
    ]
  };

  return relatedThemes[themeName] || [];
}

// Helper function to get books that contain a specific theme
function getBooksWithTheme(themeName: string): typeof BIBLE_BOOKS[number][] {
  const themeBooks: Record<string, string[]> = {
    'creation': ['Genesis', 'Psalms', 'Job'],
    'miracles': ['Matthew', 'Mark', 'Luke', 'John', 'Acts'],
    'prophecy': ['Isaiah', 'Jeremiah', 'Ezekiel', 'Daniel', 'Revelation'],
    'wisdom': ['Proverbs', 'Ecclesiastes', 'Job', 'Psalms']
  };

  const bookNames = themeBooks[themeName] || [];
  return BIBLE_BOOKS.filter(book => bookNames.includes(book.name));
}

// ━━━ Cross-Page-Type Linking for 7 Study Page Types ━━━
// Generates related links across all page types for maximum internal mesh

export type StudyPageType = 'word-study' | 'topic' | 'chain' | 'cross-ref' | 'encyclopedia' | 'bible-names' | 'grammar';

export interface StudyLink extends InternalLink {
  type: 'quiz' | 'book' | 'hub' | 'theme' | 'character' | 'word-study' | 'topic' | 'chain' | 'cross-ref' | 'encyclopedia' | 'bible-names' | 'grammar';
}

/** Generate cross-page-type links for any study page */
export function generateStudyLinks(
  pageType: StudyPageType,
  context: {
    slug?: string;
    subject?: string;
    testament?: 'old' | 'new' | 'both';
    relatedStrongs?: string[];
    relatedTopics?: string[];
    relatedBooks?: string[];
  }
): StudyLink[] {
  const links: StudyLink[] = [];
  const { slug, subject, testament, relatedStrongs, relatedTopics, relatedBooks } = context;

  // 1. Link to word studies if Strong's numbers are available
  if (relatedStrongs && relatedStrongs.length > 0 && pageType !== 'word-study') {
    const firstStrongs = relatedStrongs[0];
    const isHebrew = firstStrongs.startsWith('H');
    links.push({
      title: `${isHebrew ? 'Hebrew' : 'Greek'} Word Study`,
      href: `/${isHebrew ? 'hebrew' : 'greek'}-word/${firstStrongs.toLowerCase()}`,
      description: `Explore the original ${isHebrew ? 'Hebrew' : 'Greek'} word`,
      type: 'word-study',
    });
  }

  // 2. Link to Nave's topic if available
  if (relatedTopics && relatedTopics.length > 0 && pageType !== 'topic') {
    links.push({
      title: `${relatedTopics[0]} in the Bible`,
      href: `/bible-topics/${relatedTopics[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      description: `Every verse about ${relatedTopics[0]}`,
      type: 'topic',
    });
  }

  // 3. Link to chain study for major themes
  if (subject && pageType !== 'chain') {
    const chainSlug = subject.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    links.push({
      title: `${subject} — Chain Study`,
      href: `/chain-study/${chainSlug}`,
      description: `Trace ${subject} from Genesis to Revelation`,
      type: 'chain',
    });
  }

  // 4. Link to encyclopedia entry
  if (subject && pageType !== 'encyclopedia') {
    const encSlug = subject.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    links.push({
      title: `${subject} — Bible Encyclopedia`,
      href: `/bible-encyclopedia/${encSlug}`,
      description: `Comprehensive entry on ${subject}`,
      type: 'encyclopedia',
    });
  }

  // 5. Link to Bible names if it's a person/place
  if (subject && pageType !== 'bible-names') {
    const nameSlug = subject.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    links.push({
      title: `${subject} — Name Meaning`,
      href: `/bible-names/${nameSlug}`,
      description: `Origin and meaning of the name ${subject}`,
      type: 'bible-names',
    });
  }

  // 6. Link to grammar pages for Greek word studies
  if (pageType === 'word-study' && testament !== 'old') {
    links.push({
      title: 'Greek Grammar Guide',
      href: '/greek-grammar',
      description: 'Understand how Greek grammar shapes meaning',
      type: 'grammar',
    });
  }

  // 7. Link to relevant quizzes
  if (relatedBooks && relatedBooks.length > 0) {
    const bookSlug = relatedBooks[0].toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    links.push({
      title: `${relatedBooks[0]} Quiz`,
      href: `/${bookSlug}-quiz`,
      description: `Test your knowledge of ${relatedBooks[0]}`,
      type: 'quiz',
    });
  }

  // 8. Link to pillar pages based on testament
  const pillarLinks: StudyLink[] = [
    { title: 'John 3:16 Explained', href: '/john-3-16', description: 'The most famous verse', type: 'theme' },
    { title: 'Psalm 23 Study', href: '/psalm-23', description: 'The Lord is my shepherd', type: 'theme' },
    { title: 'Romans 8:28 Study', href: '/romans-8-28', description: 'All things for good', type: 'theme' },
  ];
  const unusedPillar = pillarLinks.find(p => !links.some(l => l.href === p.href));
  if (unusedPillar && links.length < 8) {
    links.push(unusedPillar);
  }

  // 9. Browse hub links
  const browseLinks: StudyLink[] = [
    { title: 'Hebrew Word Studies', href: '/hebrew-word', description: '8,674 Hebrew words', type: 'word-study' },
    { title: 'Greek Word Studies', href: '/greek-word', description: '5,523 Greek words', type: 'word-study' },
    { title: 'Bible Topics A-Z', href: '/bible-topics', description: '5,319 topical studies', type: 'topic' },
    { title: 'Bible Names A-Z', href: '/bible-names', description: '2,623 name meanings', type: 'bible-names' },
    { title: 'Chain Studies', href: '/chain-study', description: 'Themes through Scripture', type: 'chain' },
    { title: 'Bible Encyclopedia', href: '/bible-encyclopedia', description: 'Comprehensive entries', type: 'encyclopedia' },
    { title: 'Bible Quotes', href: '/bible-quotes', description: '7,700+ topics with verses', type: 'topic' },
    { title: 'What Does the Bible Say?', href: '/what-does-the-bible-say-about', description: '7,700+ study guides', type: 'topic' },
    { title: 'Greek Grammar', href: '/greek-grammar', description: 'NT grammar guide', type: 'grammar' },
    { title: 'All Bible Quizzes', href: '/bible-quizzes', description: 'Test your knowledge', type: 'hub' },
  ];

  // Add 2-3 browse links that aren't for the current page type
  const relevantBrowse = browseLinks.filter(b => {
    if (pageType === 'word-study' && (b.href === '/hebrew-word' || b.href === '/greek-word')) return false;
    if (pageType === 'topic' && b.href === '/bible-topics') return false;
    if (pageType === 'chain' && b.href === '/chain-study') return false;
    if (pageType === 'encyclopedia' && b.href === '/bible-encyclopedia') return false;
    if (pageType === 'bible-names' && b.href === '/bible-names') return false;
    if (pageType === 'grammar' && b.href === '/greek-grammar') return false;
    return true;
  });

  while (links.length < 8 && relevantBrowse.length > 0) {
    const next = relevantBrowse.shift();
    if (next && !links.some(l => l.href === next.href)) {
      links.push(next);
    }
  }

  return links.slice(0, 10);
}