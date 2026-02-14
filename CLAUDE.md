# General
- The user is working from the directory `bible-christian-quiz-test` - when the user mentions a file name or when viewing output from shell commands, it is likely relative to `bible-christian-quiz-test`.
- When creating, deleting, viewing or editing files, first try prepending `bible-christian-quiz-test` to the path.
- When running shell commands, do not prepend `bible-christian-quiz-test` to the path.
- User prefers modern, simplistic design with clean typography, minimal visual elements, and no decorative colored boxes or complex icons.

# Bible Quiz Website Requirements
- MANDATORY linear quiz format: All questions displayed on one page with submit button at bottom, NO quiz landing pages - go directly to linear quiz with all questions displayed immediately upon page load. Linear quiz format must follow example from "E:\Website Designs\Screenshot 2025-07-22 at 03-07-01 Quiz Christian Love - Bible Quiz & Study.png" - all questions on one page with submit at bottom and internal links section underneath.
- Bible quiz website uses linear format with all questions on one page, no landing pages for chapter quizzes, or any other quizzes
- Book chapter listing pages at /[book]-chapters/ URLs.
- Book chapter listing pages at /[book]-chapters/ URLs should show grid of all chapter quizzes that lead directly to individual chapter quizzes like /genesis-1-quiz/, following example from "E:\Website Designs\Screenshot 2025-07-27 at 14-39-51 Genesis Quiz - Complete Bible Book Quiz SalvationCall SalvationCall.png".
- Comprehensive book quizzes at /[book]-quiz/ URLs (e.g., /genesis-quiz/) should contain 25 questions covering the entire book with proper question distribution: 70% Multiple Choice, 20% True/False, 10% Fill-in-blank.
- All Bible book links should go to chapter listing pages (e.g., /genesis-chapters/) not book quizzes, and search functionality should direct users to chapters pages for better navigation flow.
- Search functionality should show book chapters pages for any book-related search (e.g., "Genesis" → Genesis Chapters page) rather than individual chapter quizzes, creating a cleaner user experience.
- Bible quiz pages require comprehensive SEO optimization including metadata, JSON-LD schema markup, breadcrumbs, and keyword-rich content for search engine visibility.
- For SEO optimization, chapter links should use "Genesis 1 Quiz" format instead of just "Chapter 1" to capture specific search terms and improve rankings.
- MANDATORY: Use beautiful Bible-themed images from /public/images/ folder for hero sections, quiz cards, backgrounds, and navigation elements - NO emoji or default Next.js logos allowed anywhere on the site.

# Quiz Page Interlinking
- Internal links section should be displayed on the quiz page at the bottom, under the submit button, not at the top or before the quiz questions.
- Chapter quiz pages should have consistent interlink sections with related chapters (next 2-3 chapters), a related topic quiz, a strategic chapter (every 5th), and the complete book quiz, using the same styling as the book quiz pages.

# Next.js App Router & JSX Error Prevention
- Next.js App Router: Server components are default (no hooks, has metadata), Client components need 'use client' directive (no metadata export) - separate server metadata from client interactivity to prevent build errors.

## CRITICAL JSX Structure Error Prevention (FIXED: Bible Quizzes Page Syntax Error)
**Problem Solved:** Fixed "Unexpected token `div`. Expected jsx identifier" build error in `/app/bible-quizzes/page.tsx`

**Root Cause:** Missing closing `</div>` tag for text-center container on line 77, causing JSX structure mismatch.

**Solution Applied:**
- Added missing closing `</div>` for the `<div className="text-center mb-12">` container
- Properly nested the statistics grid inside the text-center container
- Maintained consistent JSX indentation and structure

**Prevention Rules for Future Development:**
1. **Always match opening and closing tags** - use a code editor with JSX bracket matching
2. **Maintain consistent indentation** - helps visually identify structure issues
3. **Close containers before starting new sections** - don't nest unrelated content
4. **Use TypeScript strict mode** - catches structural errors during development
5. **Test build frequently** - run `npm run build` after major changes to catch syntax errors early

**JSX Structure Checklist:**
- ✅ Every `<div>` has a matching `</div>`
- ✅ Proper nesting: containers close before siblings start
- ✅ Consistent indentation for visual verification
- ✅ No mixing of server/client component patterns
- ✅ All React fragments properly closed