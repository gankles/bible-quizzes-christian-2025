export interface ChangelogEntry {
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    date: '2026-10-08',
    title: 'Deeper book summaries, family tree, and OG images',
    description: 'Rebuilt every /books/[book] page with AI-rewritten depth (Christ in the book, theological significance, literary style, practical application). Added a biblical family tree covering 479 people from Adam through David, PDF export via print stylesheets, and dynamic social preview images across book, chapter, and verse pages.',
  },
  {
    date: '2026-06-10',
    title: 'Faster, more reliable builds',
    description: 'Quiz data for all 1,189 chapters now downloads from GitHub Releases at build time instead of shipping in the repo, keeping deploys fast.',
  },
  {
    date: '2026-06-07',
    title: 'All 1,189 chapter quizzes completed',
    description: 'Finished generating quizzes for every chapter of the Bible, with improved rate-limit handling and question quality.',
  },
  {
    date: '2026-06-06',
    title: 'Quiz quality overhaul',
    description: 'Reworked question generation rules for better coverage and retention, fixed fill-in-the-blank formatting, and applied the same quality bar to full-book quizzes.',
  },
  {
    date: '2026-06-02',
    title: 'Sitemap fixes',
    description: 'Fixed the sitemap index stylesheet and removed thousands of stale redirect URLs.',
  },
  {
    date: '2026-05-21',
    title: 'GEO optimization for AI search',
    description: 'Added llms.txt and AI crawler access so the site is discoverable by AI-powered search and assistants.',
  },
  {
    date: '2026-05-20',
    title: 'Editorial design system',
    description: 'Migrated the entire site to a consistent editorial brand palette across quizzes, verses, and lexicon pages, and added SWORD commentary (Ellicott, JFB, Matthew Henry) to every verse and chapter.',
  },
];
