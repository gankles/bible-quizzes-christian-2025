# Bible Quiz Website - Design System

## Project Overview
A comprehensive Bible quiz and study platform with 50+ page templates covering quizzes, lexicon, verses, characters, and study guides.

---

## 1. Visual Theme & Atmosphere

**Overall Mood:** Scholarly yet accessible, reverent but modern
**Design Philosophy:** Clean, content-focused, with subtle biblical theming
**Density:** Medium - balanced whitespace with rich content areas
**Character:** Academic precision meets warm accessibility

---

## 2. Color Palette & Roles

### Primary Colors
- **Deep Navy/Slate (#2C3E50):** Primary text, headers, strong emphasis
- **Royal Blue (#3B82F6 / blue-600):** Primary actions, links, active states
- **Warm Gold/Amber (#C9A961):** Accents, highlights, special callouts

### Secondary Colors
- **Soft Cream (#F5F1E8):** Alternative backgrounds, warm sections
- **Light Gray (#F8FAF9):** Page backgrounds, cards
- **Medium Gray (#64748B / slate-500):** Secondary text, muted content

### Semantic Colors
- **Indigo (#4F46E5):** Greek lexicon, New Testament themes
- **Rose/Pink (#E11D48):** Hebrew lexicon, Old Testament themes
- **Green (#10B981):** Success states, easy difficulty
- **Yellow (#F59E0B):** Medium difficulty, warnings
- **Red (#EF4444):** Hard difficulty, errors

### Usage Patterns
- Use navy for primary headings and important text
- Use blue for interactive elements and navigation
- Use gold for verse references, highlights, and special metrics
- Use indigo/rose to distinguish Greek vs Hebrew content
- Use cream backgrounds for study and reading sections

---

## 3. Typography Rules

### Font Families
- **Headings:** System sans-serif with tight tracking (-0.025em)
- **Body:** System sans-serif, comfortable line-height (1.6-1.8)
- **Scripture/Quotes:** Serif font, italic style for verse text
- **Labels/Tags:** All caps, wide tracking (0.1em), small size

### Hierarchy
- **H1:** 48-72px, font-black, tight tracking, navy color
- **H2:** 30-48px, font-bold, section headers
- **H3:** 20-24px, font-semibold, card titles
- **Body:** 16-18px, slate-600, comfortable reading
- **Small/Labels:** 10-12px, uppercase, tracking-widest

### Special Typography Patterns
- Use italic serif for Bible verse quotations
- Use uppercase with wide tracking for category badges
- Use mono font for Strong's numbers and references

---

## 4. Component Stylings

### Buttons
- **Primary:** bg-blue-600, white text, rounded-lg, hover:bg-blue-700
- **Secondary:** border border-blue-600, text-blue-600, hover:bg-blue-50
- **Ghost:** transparent, text only with hover underline
- **CTA:** Larger padding (px-8 py-4), shadow on hover

### Cards
- **Standard:** bg-white, rounded-xl (16px), border border-slate-200, shadow-sm
- **Hover State:** hover:shadow-md hover:border-blue-300
- **Featured:** Larger border-radius (24-40px), prominent shadow
- **Dark:** bg-slate-900, text-white, for contrast sections

### Badges/Tags
- **Category:** px-3 py-1, rounded-full, bg-blue-50 text-blue-600
- **Difficulty:** 
  - Easy: bg-green-100 text-green-800
  - Medium: bg-yellow-100 text-yellow-800
  - Hard: bg-red-100 text-red-800
- **Language:** 
  - Greek: bg-indigo-50 text-indigo-600
  - Hebrew: bg-rose-50 text-rose-600

### Navigation
- **Header:** Clean, minimal, sticky optional
- **Breadcrumbs:** text-sm, blue links, gray separators
- **Footer:** Multi-column, organized by category

### Tables
- **Headers:** bg-slate-50, uppercase tracking-widest, small text
- **Rows:** hover:bg-slate-50, border-b between rows
- **Rounded:** overflow-hidden with rounded-xl container

---

## 5. Layout Principles

### Container Widths
- **Max-width:** max-w-7xl (1280px) for main content
- **Article:** max-w-4xl (896px) for reading-focused pages
- **Narrow:** max-w-3xl (768px) for forms and simple content

### Spacing Scale
- **Section padding:** py-16 to py-24 (64-96px)
- **Component gaps:** gap-6 to gap-8 (24-32px)
- **Card padding:** p-6 to p-8 (24-32px)

### Grid Patterns
- **Cards:** grid-cols-1 md:grid-cols-2 lg:grid-cols-3 or 4
- **Book grid:** grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8
- **Chapter grid:** grid-cols-5 sm:grid-cols-10

### Responsive Breakpoints
- Mobile-first approach
- **sm:** 640px - 2 column layouts
- **md:** 768px - Enhanced layouts
- **lg:** 1024px - Full desktop layouts
- **xl:** 1280px - Maximum content width

---

## 6. Design System Notes for Stitch Generation

### Key Visual Elements to Include
1. **Hero sections** with gradient backgrounds or subtle images
2. **Stats cards** with large numbers and small labels
3. **Quiz cards** with images, difficulty badges, and CTAs
4. **Grid layouts** for chapters, books, and lexicon entries
5. **Navigation bars** with breadcrumbs and return links
6. **Study cards** with cream backgrounds and scripture quotes
7. **Comparison tables** for side-by-side content
8. **Lexicon cards** with original language text and transliteration

### Important Styling Details
- Use backdrop-blur for navigation overlays
- Use rounded-[32px] to rounded-[64px] for premium card feels
- Include felt-paper texture patterns for scholarly atmosphere
- Use directional shadows (shadow-xl, shadow-2xl) for depth
- Include animated transitions (hover:translate-y, group-hover effects)

### Content Patterns
- Always include breadcrumb navigation for deep pages
- Use "Study" CTAs with book/verse references
- Include JSON-LD schema markup sections
- Add cross-reference links between related content
- Use verse quotation styling with decorative elements

---

## 7. Page-Specific Design Notes

### Homepage
- Large hero with Bible imagery background
- Stats row with 4 key metrics
- Featured quiz cards in 4-column grid
- Bible books grid (Old & New Testament sections)
- Features section with icon highlights
- Blue gradient CTA section at bottom

### Quiz Pages
- Clean layout with quiz title and description
- Question cards with radio buttons
- Progress indicator
- Submit button at bottom
- Results section with score and explanations

### Chapter Listing Pages
- Hero with book title and chapter count
- Grid of chapter links (1-50+)
- Book info sidebar
- Link to complete book quiz

### Lexicon Pages
- Search bar prominently displayed
- Greek/Hebrew split with color coding
- Word cards with original script, transliteration, definition
- Author/concept comparison layouts
- Tables for detailed analysis

### Character Pages
- Large avatar with initial
- Timeline layout for life events
- Scripture reference cards
- Relationships table
- Key lessons sidebar

### Verse Pages
- Large verse display with serif font
- Commentary section
- Cross-references list
- Original language analysis
- Prev/Next verse navigation
