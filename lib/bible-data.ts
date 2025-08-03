import { BibleBook } from './types';

// Complete list of 66 Bible books
export const BIBLE_BOOKS: BibleBook[] = [
  // Old Testament (39 books)
  { name: 'Genesis', slug: 'genesis', testament: 'old', chapters: 50, order: 1 },
  { name: 'Exodus', slug: 'exodus', testament: 'old', chapters: 40, order: 2 },
  { name: 'Leviticus', slug: 'leviticus', testament: 'old', chapters: 27, order: 3 },
  { name: 'Numbers', slug: 'numbers', testament: 'old', chapters: 36, order: 4 },
  { name: 'Deuteronomy', slug: 'deuteronomy', testament: 'old', chapters: 34, order: 5 },
  { name: 'Joshua', slug: 'joshua', testament: 'old', chapters: 24, order: 6 },
  { name: 'Judges', slug: 'judges', testament: 'old', chapters: 21, order: 7 },
  { name: 'Ruth', slug: 'ruth', testament: 'old', chapters: 4, order: 8 },
  { name: '1 Samuel', slug: '1-samuel', testament: 'old', chapters: 31, order: 9 },
  { name: '2 Samuel', slug: '2-samuel', testament: 'old', chapters: 24, order: 10 },
  { name: '1 Kings', slug: '1-kings', testament: 'old', chapters: 22, order: 11 },
  { name: '2 Kings', slug: '2-kings', testament: 'old', chapters: 25, order: 12 },
  { name: '1 Chronicles', slug: '1-chronicles', testament: 'old', chapters: 29, order: 13 },
  { name: '2 Chronicles', slug: '2-chronicles', testament: 'old', chapters: 36, order: 14 },
  { name: 'Ezra', slug: 'ezra', testament: 'old', chapters: 10, order: 15 },
  { name: 'Nehemiah', slug: 'nehemiah', testament: 'old', chapters: 13, order: 16 },
  { name: 'Esther', slug: 'esther', testament: 'old', chapters: 10, order: 17 },
  { name: 'Job', slug: 'job', testament: 'old', chapters: 42, order: 18 },
  { name: 'Psalms', slug: 'psalms', testament: 'old', chapters: 150, order: 19 },
  { name: 'Proverbs', slug: 'proverbs', testament: 'old', chapters: 31, order: 20 },
  { name: 'Ecclesiastes', slug: 'ecclesiastes', testament: 'old', chapters: 12, order: 21 },
  { name: 'Song of Solomon', slug: 'song-of-solomon', testament: 'old', chapters: 8, order: 22 },
  { name: 'Isaiah', slug: 'isaiah', testament: 'old', chapters: 66, order: 23 },
  { name: 'Jeremiah', slug: 'jeremiah', testament: 'old', chapters: 52, order: 24 },
  { name: 'Lamentations', slug: 'lamentations', testament: 'old', chapters: 5, order: 25 },
  { name: 'Ezekiel', slug: 'ezekiel', testament: 'old', chapters: 48, order: 26 },
  { name: 'Daniel', slug: 'daniel', testament: 'old', chapters: 12, order: 27 },
  { name: 'Hosea', slug: 'hosea', testament: 'old', chapters: 14, order: 28 },
  { name: 'Joel', slug: 'joel', testament: 'old', chapters: 3, order: 29 },
  { name: 'Amos', slug: 'amos', testament: 'old', chapters: 9, order: 30 },
  { name: 'Obadiah', slug: 'obadiah', testament: 'old', chapters: 1, order: 31 },
  { name: 'Jonah', slug: 'jonah', testament: 'old', chapters: 4, order: 32 },
  { name: 'Micah', slug: 'micah', testament: 'old', chapters: 7, order: 33 },
  { name: 'Nahum', slug: 'nahum', testament: 'old', chapters: 3, order: 34 },
  { name: 'Habakkuk', slug: 'habakkuk', testament: 'old', chapters: 3, order: 35 },
  { name: 'Zephaniah', slug: 'zephaniah', testament: 'old', chapters: 3, order: 36 },
  { name: 'Haggai', slug: 'haggai', testament: 'old', chapters: 2, order: 37 },
  { name: 'Zechariah', slug: 'zechariah', testament: 'old', chapters: 14, order: 38 },
  { name: 'Malachi', slug: 'malachi', testament: 'old', chapters: 4, order: 39 },

  // New Testament (27 books)
  { name: 'Matthew', slug: 'matthew', testament: 'new', chapters: 28, order: 40 },
  { name: 'Mark', slug: 'mark', testament: 'new', chapters: 16, order: 41 },
  { name: 'Luke', slug: 'luke', testament: 'new', chapters: 24, order: 42 },
  { name: 'John', slug: 'john', testament: 'new', chapters: 21, order: 43 },
  { name: 'Acts', slug: 'acts', testament: 'new', chapters: 28, order: 44 },
  { name: 'Romans', slug: 'romans', testament: 'new', chapters: 16, order: 45 },
  { name: '1 Corinthians', slug: '1-corinthians', testament: 'new', chapters: 16, order: 46 },
  { name: '2 Corinthians', slug: '2-corinthians', testament: 'new', chapters: 13, order: 47 },
  { name: 'Galatians', slug: 'galatians', testament: 'new', chapters: 6, order: 48 },
  { name: 'Ephesians', slug: 'ephesians', testament: 'new', chapters: 6, order: 49 },
  { name: 'Philippians', slug: 'philippians', testament: 'new', chapters: 4, order: 50 },
  { name: 'Colossians', slug: 'colossians', testament: 'new', chapters: 4, order: 51 },
  { name: '1 Thessalonians', slug: '1-thessalonians', testament: 'new', chapters: 5, order: 52 },
  { name: '2 Thessalonians', slug: '2-thessalonians', testament: 'new', chapters: 3, order: 53 },
  { name: '1 Timothy', slug: '1-timothy', testament: 'new', chapters: 6, order: 54 },
  { name: '2 Timothy', slug: '2-timothy', testament: 'new', chapters: 4, order: 55 },
  { name: 'Titus', slug: 'titus', testament: 'new', chapters: 3, order: 56 },
  { name: 'Philemon', slug: 'philemon', testament: 'new', chapters: 1, order: 57 },
  { name: 'Hebrews', slug: 'hebrews', testament: 'new', chapters: 13, order: 58 },
  { name: 'James', slug: 'james', testament: 'new', chapters: 5, order: 59 },
  { name: '1 Peter', slug: '1-peter', testament: 'new', chapters: 5, order: 60 },
  { name: '2 Peter', slug: '2-peter', testament: 'new', chapters: 3, order: 61 },
  { name: '1 John', slug: '1-john', testament: 'new', chapters: 5, order: 62 },
  { name: '2 John', slug: '2-john', testament: 'new', chapters: 1, order: 63 },
  { name: '3 John', slug: '3-john', testament: 'new', chapters: 1, order: 64 },
  { name: 'Jude', slug: 'jude', testament: 'new', chapters: 1, order: 65 },
  { name: 'Revelation', slug: 'revelation', testament: 'new', chapters: 22, order: 66 },
];

// Helper functions
export const getBookBySlug = (slug: string): BibleBook | undefined => {
  return BIBLE_BOOKS.find(book => book.slug === slug);
};

export const getOldTestamentBooks = (): BibleBook[] => {
  return BIBLE_BOOKS.filter(book => book.testament === 'old');
};

export const getNewTestamentBooks = (): BibleBook[] => {
  return BIBLE_BOOKS.filter(book => book.testament === 'new');
};

export const generateChapterQuizSlugs = (bookSlug: string, totalChapters: number): string[] => {
  return Array.from({ length: totalChapters }, (_, i) => `${bookSlug}-${i + 1}-quiz`);
};

export const generateBookQuizSlug = (bookSlug: string): string => {
  return `${bookSlug}-quiz`;
};

// Popular Bible characters for character quizzes
export const BIBLE_CHARACTERS = [
  'abraham', 'moses', 'david', 'jesus', 'paul', 'mary', 'noah', 'solomon',
  'daniel', 'esther', 'ruth', 'joshua', 'peter', 'john', 'mary-magdalene',
  'gideon', 'rahab', 'timothy', 'lydia', 'joseph', 'elijah', 'deborah'
];

// Popular Bible themes for thematic quizzes
export const BIBLE_THEMES = [
  'miracles-of-jesus', 'parables', 'ten-commandments', 'fruits-of-spirit',
  'armor-of-god', 'biblical-prophecy', 'prayer-in-bible', 'love-in-scripture',
  'creation', 'exodus', 'resurrection', 'christmas', 'easter', 'salvation'
];