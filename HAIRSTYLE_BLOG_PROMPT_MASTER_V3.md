# 🎯 HAIRSTYLE BLOG MASTER PROMPT V3
**The Complete Guide for Building a Programmatic SEO Hairstyle Blog**

> **Version:** 3.0  
> **Last Updated:** January 15, 2026  
> **Purpose:** Master prompt with actual HTML/CSS design specifications from stitch templates

---

##   PROJECT CONTEXT

### **Environment Setup**

**Project Location:** `C:\Users\Victoria\hairblog`  
**Operating System:** Windows (PowerShell)  
**Framework:** Next.js 15 with TypeScript  
**Styling:** Tailwind CSS (CDN in templates, will migrate to proper setup)  
**Fonts:** Google Fonts (Plus Jakarta Sans, Playfair Display)  
**Icons:** Material Symbols Outlined  

---

### **Important Notes for AI Implementation**

⚠️ **Windows PowerShell Commands:**
- Use `;` instead of `&&` for chaining commands
- Example: `cd hairblog ; npm run dev`
- Do NOT use `&&` symbols in command chains

⚠️ **TypeScript Strict Mode:**
- Define interfaces for all data structures (Article, ArticleTags, Quiz, etc.)
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Handle undefined/null cases explicitly
- Validate all dynamic data before rendering
- Check for missing properties before component initialization
- Fix ALL TypeScript compilation errors before deployment

⚠️ **Static Generation (ISR):**
- Use `generateStaticParams` for all dynamic routes
- Pre-generate all 1,710 article pages at build time
- Implement Incremental Static Regeneration for fast rebuilds
- Never confuse dynamic generation with static generation

⚠️ **Project Structure (No `src/` Directory):**
```
hairblog/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── [category]/        # Category pages
│   └── [category]/[slug]/ # Article pages
├── components/            # React components
├── lib/                   # Utility functions
├── public/               # Static assets
│   └── images/           # Image files
├── types/                # TypeScript interfaces
└── package.json
```

⚠️ **Common Error Patterns to Avoid:**
- Missing properties in article objects (tags, relatedArticles, images)
- Undefined variables accessed outside their scope
- Conditional rendering mismatches between server and client
- Browser API usage during SSR (window, document, localStorage)
- State initialization that differs between server and client renders

---

### **Data Sources**

**Image Database:**
- Location: `C:\Users\Victoria\flux-fal-ai\image-database.json`
- Contains: 2,389 analyzed images with AI-generated metadata
- Fields: filename, tags, colors, subjects, style, mood

**HTML Templates (Reference Only - DO NOT COPY DIRECTLY):**
- Homepage: `C:\Users\Victoria\Hairstyle Page Layout\stitch_hairstyle_blog_homepage_best\code.html`
- Category: `C:\Users\Victoria\Hairstyle Page Layout\stitch_hairstyle_catagory_best\code.html`
- Blog Article: `C:\Users\Victoria\Hairstyle Page Layout\stitch_hairstyle_blog_page_best\code.html`

**Note:** These templates use CDN Tailwind. You must convert to proper Next.js + Tailwind setup.

---

### **Build Requirements**

✅ **Programmatic SEO:**
- 1,710 pages targeting exact-match keywords
- Examples: "Short Hairstyles Over 60", "Pixie Cuts for Round Faces"
- Each page optimized for specific search intent

✅ **URL Structure:**
- No `/blog/` prefix
- Clean URLs: `/short-hairstyles/pixie-cuts-over-60`
- Category hubs: `/short-hairstyles`, `/bob-hairstyles`
- Tag pages: `/tags/low-maintenance`, `/tags/over-50`

✅ **Mobile-First Design:**
- Responsive design with no horizontal scrolling
- Mobile navigation max 70% screen width
- Preserve minimum 30% screen visibility for content behind menus
- Touch targets minimum 44px

✅ **Dark Mode:**
- Full support via Tailwind dark mode classes
- Toggle in header
- Persistent preference (localStorage)

✅ **Pinterest Integration:**
- Pin buttons on all images
- Pinterest-optimized image sizes (2:3 aspect ratio)
- Rich Pins with metadata

✅ **Internal Linking:**
- Max 5 contextual links per article
- Automatic link generation based on related content
- Breadcrumb navigation on all pages

✅ **Related Articles:**
- Dynamic algorithm based on tag overlap
- Weighted scoring system
- 4 related articles per page

✅ **Performance:**
- Lazy loading for images
- Optimized fonts (preload, subset)
- Minimal JavaScript bundle
- Fast page transitions

---

### **SEO Strategy**

**Exact-Match Keywords:**
- Target long-tail keywords with exact phrase matches
- Example: "30 Short Hairstyles for Women Over 60 in 2026"
- Google ranks pages with exact title matches higher

**Index Pages:**
- Category index: `/short-hairstyles` (lists all short hairstyle articles)
- Tag index: `/tags/low-maintenance` (lists all low-maintenance articles)
- Age index: `/over-50` (lists all over-50 articles)

**Programmatic Scale:**
- Each combination creates a unique page
- Short × Over 60 × Fine Hair = unique article
- 1,710 total pages covering all combinations

**Metadata:**
- Unique title tags (max 60 chars)
- Unique meta descriptions (max 160 chars)
- Structured data (Article schema)
- Open Graph tags for social sharing

---

### **Content Generation Workflow**

1. **Frontmatter Creation:** Generate YAML frontmatter with all tags
2. **Image Selection:** Query image database for relevant photos
3. **Content Writing:** AI-generated article content (3,000-4,000 words)
4. **Internal Linking:** Add 5 contextual links to related articles
5. **Related Articles:** Calculate top 4 related articles
6. **SEO Optimization:** Add meta tags, structured data
7. **Static Generation:** Build page with `generateStaticParams`

---

### **Quality Standards**

- **SEO Title:** Max 60 characters
- **Meta Description:** Max 160 characters
- **Word Count:** 3,000-4,000 words per article
- **Image Count:** 20-30 images per article
- **Read Time:** Calculate based on word count (200 words/min)
- **Related Articles:** Minimum 4 per article
- **Internal Links:** 3-5 contextual links per article

---

##  📚 TABLE OF CONTENTS

1. [Design System (From Stitch Templates)](#design-system-from-stitch-templates)
2. [Homepage Design](#homepage-design)
3. [Category Page Design](#category-page-design)
4. [Blog Article Design](#blog-article-design)
5. [Tagging & Interlinking System](#tagging--interlinking-system)
6. [AI Memory Management](#ai-memory-management)
7. [Project Overview](#project-overview)
8. [Navigation Structure](#navigation-structure)
9. [Pinterest Integration](#pinterest-integration)
10. [Enhanced Frontmatter & SEO](#enhanced-frontmatter--seo)
11. [Image Database Integration](#image-database-integration)
12. [Batch Article Generation](#batch-article-generation)
13. [Implementation Workflow](#implementation-workflow)

---

## 🎨 DESIGN SYSTEM (From Stitch Templates)

### **HTML Template Files Location**

```
C:\Users\Victoria\Hairstyle Page Layout\stitch_hairstyle_blog_homepage_best\code.html
C:\Users\Victoria\Hairstyle Page Layout\stitch_hairstyle_catagory_best\code.html
C:\Users\Victoria\Hairstyle Page Layout\stitch_hairstyle_blog_page_best\code.html
```

**IMPORTANT:** AI should view these HTML files to understand the exact implementation before building.

---

### **Technology Stack**

- **Framework:** Tailwind CSS (CDN)
- **Fonts:** 
  - Plus Jakarta Sans (display/body)
  - Playfair Display (serif/headings)
  - Material Symbols Outlined (icons)
- **Dark Mode:** Supported via `class="dark"`
- **Responsive:** Mobile-first approach

---

### **Color Palette**

```javascript
colors: {
  "primary": "#e88f68",              // Coral/peach primary color
  "primary-light": "#fdf3ef",        // Very light peach
  "background-light": "#ffffff",     // White
  "background-dark": "#2b333b",      // Dark gray-blue
  "surface-light": "#fbf9f8",        // Off-white/cream
  "rose-gold": "#eadad6",            // Rose gold accent
}
```

**Text Colors:**
- Light mode: `#1a120e` (dark brown-black)
- Dark mode: `white`
- Gray variations: `#946551`, `#f2ebe8`

---

### **Typography**

**Font Families:**
```css
font-display: Plus Jakarta Sans, sans-serif
font-serif: Playfair Display, serif
```

**Font Sizes:**
- H1: `text-4xl md:text-5xl lg:text-6xl` (36-60px)
- H2: `text-2xl md:text-3xl lg:text-4xl` (24-36px)
- H3: `text-xl` (20px)
- Body: `text-base` (16px)
- Small: `text-sm` (14px)
- Tiny: `text-xs` (12px)

**Font Weights:**
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Black: 800

---

### **Border Radius**

```javascript
borderRadius: {
  DEFAULT: "0.5rem",    // 8px
  lg: "1rem",           // 16px
  xl: "1.5rem",         // 24px
  "2xl": "2rem",        // 32px
  full: "9999px"        // Fully rounded
}
```

---

### **Spacing & Layout**

**Max Widths:**
- Content: `max-w-[1200px]` or `max-w-[1400px]`
- Article text: `max-w-[760px]` or `max-w-[1000px]`

**Padding:**
- Mobile: `px-4 py-10`
- Tablet: `md:px-10`
- Desktop: `lg:px-40`

**Grid Gaps:**
- Small: `gap-3` or `gap-4`
- Medium: `gap-6` or `gap-8`
- Large: `gap-10` or `gap-12`

---

### **Components**

#### **Buttons**

**Primary Button:**
```html
<button class="px-6 py-3 bg-[#1a120e] dark:bg-white text-white dark:text-[#1a120e] 
               font-bold rounded-full hover:bg-primary transition-colors">
  Button Text
</button>
```

**Secondary Button:**
```html
<button class="px-6 py-3 border border-gray-300 text-[#1a120e] rounded-full 
               font-bold hover:border-primary hover:text-primary transition-colors">
  Button Text
</button>
```

**Chip/Tag:**
```html
<button class="px-5 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 
               font-bold text-sm hover:bg-primary hover:text-white transition-all">
  All
</button>
```

---

#### **Cards**

**Article Card (3:4 aspect ratio):**
```html
<article class="group flex flex-col gap-4 cursor-pointer">
  <div class="relative overflow-hidden rounded-xl shadow-md">
    <div class="aspect-[3/4] w-full bg-cover bg-center transition-transform duration-500 
                group-hover:scale-105" style="background-image: url(...)"></div>
    <div class="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur 
                px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider 
                text-primary shadow-sm">
      Trend
    </div>
  </div>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
      <span class="material-symbols-outlined text-[16px]">schedule</span>
      <span>5 min read</span>
      <span>•</span>
      <span>Oct 24, 2024</span>
    </div>
    <h3 class="text-2xl font-bold font-serif text-[#1a120e] dark:text-white leading-tight 
               group-hover:text-primary transition-colors">
      Article Title
    </h3>
    <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
      Description text...
    </p>
  </div>
</article>
```

---

#### **Header (Sticky)**

```html
<header class="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap 
               border-b border-solid border-b-[#f2ebe8] bg-white/95 backdrop-blur-sm 
               px-6 lg:px-10 py-3 dark:bg-[#2b333b]/95 dark:border-b-gray-700">
  <div class="flex items-center gap-8 w-full max-w-[1400px] mx-auto">
    <!-- Logo -->
    <a class="flex items-center gap-4 text-[#1a120e] dark:text-white shrink-0 group" href="#">
      <div class="size-8 text-primary group-hover:scale-110 transition-transform">
        <span class="material-symbols-outlined" style="font-size: 32px;">content_cut</span>
      </div>
      <h2 class="text-lg font-bold leading-tight tracking-[-0.015em] font-serif">Hairstyle Blog</h2>
    </a>
    
    <!-- Desktop Nav -->
    <div class="hidden lg:flex items-center gap-6 xl:gap-8 overflow-x-auto no-scrollbar">
      <a class="text-[#1a120e] dark:text-gray-200 text-sm font-medium leading-normal 
                hover:text-primary transition-colors" href="#">Cuts</a>
      <a class="text-[#1a120e] dark:text-gray-200 text-sm font-medium leading-normal 
                hover:text-primary transition-colors" href="#">Styles</a>
      <!-- ... more nav items ... -->
    </div>
    
    <!-- Search + Mobile Menu -->
    <div class="flex flex-1 justify-end gap-4 md:gap-8 items-center">
      <label class="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
        <div class="flex w-full flex-1 items-stretch rounded-full h-full border border-transparent 
                    focus-within:border-primary/50 transition-colors">
          <div class="text-[#946551] flex border-none bg-[#f2ebe8] dark:bg-gray-700 
                      items-center justify-center pl-4 rounded-l-full border-r-0">
            <span class="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden 
                        rounded-full text-[#1a120e] dark:text-white focus:outline-0 focus:ring-0 
                        border-none bg-[#f2ebe8] dark:bg-gray-700 focus:border-none h-full 
                        placeholder:text-[#946551] px-4 rounded-l-none border-l-0 pl-2 
                        text-sm font-normal leading-normal" 
                 placeholder="Search" value=""/>
        </div>
      </label>
      <button class="lg:hidden p-2 text-[#1a120e] dark:text-white">
        <span class="material-symbols-outlined">menu</span>
      </button>
    </div>
  </div>
</header>
```

---

#### **Footer**

```html
<footer class="bg-background-dark text-white py-16 px-4 md:px-10 lg:px-40">
  <div class="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
    <!-- Brand Column -->
    <div class="flex flex-col gap-6">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary" style="font-size: 32px;">content_cut</span>
        <h2 class="text-xl font-bold font-serif">Hairstyle Blog</h2>
      </div>
      <p class="text-gray-400 text-sm leading-relaxed">
        Helping you find the perfect look tailored to your unique features. 
        Join our community of 2M+ monthly readers.
      </p>
      <div class="flex gap-4">
        <a class="text-gray-400 hover:text-primary transition-colors" href="#">
          <span class="material-symbols-outlined">public</span>
        </a>
        <a class="text-gray-400 hover:text-primary transition-colors" href="#">
          <span class="material-symbols-outlined">photo_camera</span>
        </a>
        <a class="text-gray-400 hover:text-primary transition-colors" href="#">
          <span class="material-symbols-outlined">play_circle</span>
        </a>
      </div>
    </div>
    
    <!-- Popular Searches -->
    <div class="flex flex-col gap-4">
      <h3 class="text-base font-bold text-white mb-2">Popular Searches</h3>
      <a class="text-gray-400 text-sm hover:text-primary transition-colors" href="#">
        Pixie Cuts for Round Faces
      </a>
      <!-- ... more links ... -->
    </div>
    
    <!-- Quick Help -->
    <div class="flex flex-col gap-4">
      <h3 class="text-base font-bold text-white mb-2">Quick Help</h3>
      <a class="text-gray-400 text-sm hover:text-primary transition-colors" href="#">
        Face Shape Quiz
      </a>
      <!-- ... more links ... -->
    </div>
    
    <!-- Search Column -->
    <div class="flex flex-col gap-4">
      <h3 class="text-base font-bold text-white mb-2">Still looking?</h3>
      <div class="flex w-full items-center rounded-lg h-10 bg-gray-700/50 border border-gray-600 
                  focus-within:border-primary transition-colors">
        <input class="w-full bg-transparent border-none text-sm text-white px-3 focus:ring-0 
                      placeholder:text-gray-500" placeholder="Search..."/>
        <button class="pr-3 text-primary">
          <span class="material-symbols-outlined text-[20px]">search</span>
        </button>
      </div>
      <p class="text-xs text-gray-500 mt-2">© 2024 Hairstyle Blog. All rights reserved.</p>
    </div>
  </div>
</footer>
```

---

## 🏠 HOMEPAGE DESIGN

**File:** `stitch_hairstyle_blog_homepage_best/code.html`

### **Layout Structure (Top to Bottom)**

#### **1. STICKY HEADER**
- Logo (scissors icon) + "Hairstyle Blog"
- Desktop nav: Cuts | Styles | Lengths | Bangs | Age | Texture | Colors | Men | Advice
- Search bar (rounded-full, hidden on mobile)
- Mobile hamburger menu

---

#### **2. HERO SECTION**
**Background:** `bg-surface-light` (#fbf9f8)

**Left Column (50%):**
- H1: "Find Your Perfect Hairstyle in 3 Clicks" (text-4xl to text-6xl, font-black)
- H2: Subtitle explaining value prop (text-base to text-lg)
- Large search bar with search button inside
- Quick-start chips:
  - "I want short hair" (scissors icon)
  - "I'm over 50" (account icon)
  - "I have curly hair" (bubble icon)
  - "Trending Now" (fire icon)

**Right Column (50%):**
- Hero image (aspect-[4/3], rounded-2xl, shadow-2xl)
- Gradient overlay (from-black/40 to-transparent)
- Floating badge (bottom-left): "Featured Style: The Modern Shag is back for 2024"

---

#### **3. EXPLORE BY CATEGORY**
**Grid:** 2 columns mobile, 3 columns desktop

**6 Category Cards:**
- Aspect ratio: 4:5 mobile, square desktop
- Image with hover scale effect (scale-110)
- Dark gradient overlay (to-black/70)
- Category name + article count at bottom
- Categories: Short Hairstyles, Over 50, Curly & Wavy, Bangs & Fringes, Color Inspiration, Men's Cuts

---

#### **4. TRENDING NOW**
**Background:** `bg-surface-light` or `bg-[#323b44]` (dark mode)

**Header:**
- Fire icon + "Trending Now" heading
- Left/right arrow buttons

**Horizontal Scroll:**
- 4+ cards (min-w-[280px])
- Aspect-[4/5] images
- Badge: "Hot" or save count
- Title + view count
- Snap scroll enabled

---

#### **5. FACE SHAPE HELPER**
**Background:** `bg-[#F2EBE8]/50` with border-y

**Left Column:**
- Badge: "Free Tool"
- H2: "Know your face shape, find your look."
- Description text
- CTA button: "Take the 30-second quiz"

**Right Column:**
- Abstract face shape illustrations (grid 3x2)
- Shapes: Oval, Round, Square, Heart, Oblong, Diamond
- Border-2 outlines with shape names

---

#### **6. LATEST INSPIRATION**
**Grid:** 1 column mobile, 2 tablet, 3 desktop

**Filter Tabs:**
- All | Tutorials | Products | Celebrity
- Active tab has border-bottom-2 border-primary

**6 Article Cards:**
- Aspect-[3/2] images (rounded-xl)
- Category badge (Tutorial, Products, Styles, Men's, Color, etc.)
- Title (text-xl font-bold)
- Excerpt (text-sm, line-clamp-2)
- Hover effect: bg-black/10 overlay

**Load More Button:**
- Border, rounded-lg, centered

---

#### **7. FOOTER**
(See Footer component above)

---

## 📂 CATEGORY PAGE DESIGN

**File:** `stitch_hairstyle_catagory_best/code.html`

### **Layout Structure**

#### **1. STICKY HEADER**
(Same as homepage)

---

#### **2. HERO SECTION**
**Background:** `bg-surface-light` with border-bottom

**Breadcrumb:**
```
Home / Cuts / Short Hairstyles
```

**Left Column:**
- H1: "Short Hairstyles" (text-5xl to text-7xl, font-bold, font-serif)
- Description paragraph (text-xl, text-gray-600)
- Two buttons:
  - "Trending Now" (bg-[#1a120e], text-white)
  - "View Galleries" (border, hover effects)

**Right Column:**
- Large hero image (aspect-[4/3], rounded-2xl, shadow-2xl)
- Gradient overlay + decorative blur circles

---

#### **3. STICKY FILTER BAR**
**Position:** `sticky top-[65px]` (below header)
**Background:** `bg-white/95 backdrop-blur-md`

**Filter Chips (Horizontal Scroll):**
- All (active: bg-primary/10, text-primary, border-primary/20)
- Pixie Cuts
- Bob Hairstyles
- Over 50
- Curly
- Fine Hair
- Thick Hair

---

#### **4. ARTICLE GRID**
**Grid:** 1 column mobile, 2 tablet, 3 desktop
**Gap:** gap-x-8 gap-y-12

**Each Article Card:**
- Aspect-[3/4] image (rounded-xl, shadow-md)
- Badge (top-right): "Trend", "Styling", "Color"
- Meta: Clock icon + "5 min read • Oct 24, 2024"
- H3: Title (text-2xl, font-bold, font-serif)
- Excerpt (text-sm, line-clamp-2)
- Hover: scale-105 on image

---

#### **5. PAGINATION**
**Centered buttons:**
- Previous/Next with arrow icons
- Page numbers (1-5)
- Active page: bg-primary text-white

---

#### **6. EXPLORE RELATED STYLES**
**Background:** `bg-surface-light` with border-top

**Grid:** 2 columns mobile, 4 desktop

**4 Related Category Cards:**
- Aspect-square images
- Dark gradient overlay
- Category name + style count
- Hover: scale-110 + fade-in count

---

#### **7. NEWSLETTER SECTION**
**Background:** `bg-[#f8f5f4]` (light warm gray)

**Centered Content:**
- Email icon (text-5xl, text-primary)
- H2: "Get Weekly Hairstyle Inspiration"
- Description
- Email input + Subscribe button (inline form)
- "No spam, unsubscribe anytime" disclaimer

---

#### **8. FOOTER**
(Same as homepage)

---

## 📝 BLOG ARTICLE DESIGN

**File:** `stitch_hairstyle_blog_page_best/code.html`

### **Layout Structure**

#### **1. STICKY HEADER**
(Same as homepage, but with save/heart icon button)

---

#### **2. ARTICLE HERO**
**Background:** `bg-surface-light` with border-bottom

**Breadcrumb:**
```
Home / Short Hairstyles / Article
```

**Centered Content:**
- H1: Article title (text-4xl to text-6xl, font-bold, font-serif, max-w-4xl)
- Subtitle/excerpt (text-xl, text-gray-600, max-w-2xl)
- Meta bar (border-top/bottom):
  - Author avatar (rounded-full, bg-primary/20)
  - "Hair Style Expert"
  - Calendar icon + "Updated Jan 14, 2026"
  - Heart icon + "Saved 12.5K times"

**Hero Image:**
- Aspect-[16/9] (max-w-[900px], rounded-2xl, shadow-2xl)
- Gradient overlay (from-black/40)
- Pinterest "Pin This" button (top-left, appears on hover)
- "Jump to Styles" button (bottom-center, bg-white/95)

---

#### **3. ARTICLE LAYOUT (3-column grid)**

**Left Sidebar (60px-80px, sticky):**
- Share buttons (vertical):
  - Facebook (bg-[#3b5998])
  - Pinterest (bg-[#E60023])
  - X/Twitter (bg-black)
  - Email (bg-gray-200)
- Divider line
- Share count: "12.5k Shares"

**Main Content (max-w-[760px]):**

**Intro:**
- Drop cap first letter (text-6xl, text-primary, float-left)
- 2-3 intro paragraphs (text-xl to text-2xl, font-serif)

**Hairstyle Entries:**
Each entry has:
- Number badge (w-12 h-12, rounded-full, bg-rose-100, border-rose-200)
- H2: Style name (text-2xl to text-4xl, font-bold, font-serif)
- Image (aspect-[2/3] or [3/4], rounded-xl, shadow-lg)
- Badge (bottom-right): "Reader Favorite"
- Tags (colored badges):
  - Styling: Easy (green)
  - Maintenance: Low (blue)
  - Best for: Oval, Heart (gray)
- Description paragraphs
- Pro Tip box (bg-surface-light, border-l-4 border-primary)

**FAQ Section:**
- H3: "Frequently Asked Questions"
- Accordion `<details>` elements:
  - bg-surface-light, rounded-xl
  - Hover: border-primary/30
  - Expand icon rotates on open

**Styling Toolkit:**
- bg-primary/5, rounded-2xl, border-primary/10
- Grid 2 columns
- Each item: icon (rounded-full, bg-white) + title + description

**Comments Section:**
- H3: "Discussion (4 Comments)"
- Comment cards: avatar + name + date + text + Reply button
- Comment textarea + Post Comment button

**Right Sidebar (280px-320px, sticky, hidden on mobile):**
- "Jump to a Style" navigation (numbered list 1-30)
- Newsletter signup box

---

#### **4. YOU MIGHT ALSO LIKE**
**Background:** `bg-[#f8f5f4]` with border-top

**Grid:** 1 column mobile, 2 tablet, 4 desktop

**4 Related Articles:**
- Aspect-[3/4] images (rounded-xl, shadow-md)
- Title only (text-lg, font-bold, font-serif)
- Hover: text-primary

---

#### **5. FOOTER**
(Same as homepage)

---

## 🔗 TAGGING & INTERLINKING SYSTEM

### **Overview**

The stitch HTML templates provide the UI structure for tags and related content, but require dynamic data to function. This section explains how to implement the tagging taxonomy and interlinking algorithms for your 1,710-page programmatic SEO site.

---

### **What's in the Templates (Static)**

✅ **UI Components Present:**
- "You Might Also Like" section (4 article cards)
- Tag badges on articles (Styling, Maintenance, Best For)
- "Explore Related Styles" section (4 category cards)
- Footer "Popular Searches" links
- Breadcrumb navigation structure

❌ **What's Missing (Needs Implementation):**
- Dynamic tag generation from frontmatter
- Related articles algorithm
- Tag page routes
- Contextual internal linking
- Breadcrumb dynamic URLs

---

### **Enhanced Frontmatter Structure**

Add comprehensive tagging to your article frontmatter:

```yaml
---
title: "30 Short Hairstyles for Women Over 60"
slug: "short-hairstyles-over-60"
category: "short-hairstyles"
subcategory: "age-specific"
publishDate: "2026-01-14"
updateDate: "2026-01-14"
excerpt: "Discover the perfect crop to frame your face..."

# Primary Tags (for filtering & related content)
tags:
  primary:
    - "short-hair"
    - "over-60"
    - "low-maintenance"
  
  # Hair Characteristics
  hairLength: "short"
  hairTexture: ["straight", "wavy", "curly"]
  hairThickness: ["fine", "medium", "thick"]
  
  # Demographics
  ageGroup: ["60-70", "70+"]
  faceShape: ["oval", "round", "square", "heart"]
  
  # Style Attributes
  styleType: ["pixie", "bob", "layered"]
  maintenance: "low"           # low, medium, high
  stylingTime: "5-10 minutes"
  difficulty: "easy"            # easy, moderate, advanced
  
  # Occasions
  occasions: ["everyday", "professional", "casual"]
  
  # Special Features
  features: ["volume-boosting", "anti-aging", "gray-friendly"]

# Related Content (auto-generated or manual)
relatedArticles:
  - "pixie-cuts-over-60"
  - "bob-hairstyles-over-50"
  - "fine-hair-short-styles"
  - "gray-hair-short-cuts"

relatedCategories:
  - "pixie-cuts"
  - "bob-hairstyles"
  - "over-50-hairstyles"

# SEO
seoTitle: "30 Short Hairstyles Over 60 | 2026 Guide"
metaDescription: "Discover 30 stunning short hairstyles perfect for women over 60..."
keywords: ["short hairstyles over 60", "pixie cuts seniors", "bob over 60"]

# Images
featuredImage: "/images/short-hairstyles-over-60-hero.jpg"
images:
  - id: "style-1"
    url: "/images/textured-pixie-silver.jpg"
    alt: "Textured pixie cut with silver frost"
    pinterest: true
  - id: "style-2"
    url: "/images/classic-bob-side-bangs.jpg"
    alt: "Classic bob with side-swept bangs"
    pinterest: true

# Analytics
readTime: 12
wordCount: 3500
imageCount: 30
---
```

---

### **TypeScript Interfaces**

Create type-safe interfaces for your article data:

```typescript
// types/article.ts

export interface ArticleTags {
  primary: string[];
  hairLength: 'short' | 'medium' | 'long';
  hairTexture: ('straight' | 'wavy' | 'curly' | 'coily')[];
  hairThickness: ('fine' | 'medium' | 'thick')[];
  ageGroup: string[];
  faceShape: ('oval' | 'round' | 'square' | 'heart' | 'diamond' | 'oblong')[];
  styleType: string[];
  maintenance: 'low' | 'medium' | 'high';
  stylingTime: string;
  difficulty: 'easy' | 'moderate' | 'advanced';
  occasions: string[];
  features: string[];
}

export interface Article {
  title: string;
  slug: string;
  category: string;
  subcategory?: string;
  publishDate: string;
  updateDate: string;
  excerpt: string;
  tags: ArticleTags;
  relatedArticles: string[];
  relatedCategories: string[];
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  featuredImage: string;
  images: ArticleImage[];
  readTime: number;
  wordCount: number;
  imageCount: number;
  content?: string;
}

export interface ArticleImage {
  id: string;
  url: string;
  alt: string;
  pinterest: boolean;
}

export interface RelatedArticle {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  tags: ArticleTags;
  readTime: number;
}
```

---

### **Related Articles Algorithm**

Implement intelligent related content suggestions:

```typescript
// lib/related-articles.ts

export function getRelatedArticles(
  currentArticle: Article,
  allArticles: Article[],
  limit: number = 4
): RelatedArticle[] {
  
  // Calculate relevance score for each article
  const scoredArticles = allArticles
    .filter(article => article.slug !== currentArticle.slug) // Exclude current
    .map(article => ({
      article,
      score: calculateRelevanceScore(currentArticle, article)
    }))
    .sort((a, b) => b.score - a.score) // Highest score first
    .slice(0, limit); // Take top N
  
  return scoredArticles.map(({ article }) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    featuredImage: article.featuredImage,
    category: article.category,
    tags: article.tags,
    readTime: article.readTime
  }));
}

function calculateRelevanceScore(
  current: Article,
  candidate: Article
): number {
  let score = 0;
  
  // Same category: +50 points
  if (current.category === candidate.category) {
    score += 50;
  }
  
  // Same subcategory: +30 points
  if (current.subcategory && current.subcategory === candidate.subcategory) {
    score += 30;
  }
  
  // Same hair length: +20 points
  if (current.tags.hairLength === candidate.tags.hairLength) {
    score += 20;
  }
  
  // Overlapping age groups: +15 points per match
  const ageOverlap = current.tags.ageGroup.filter(age =>
    candidate.tags.ageGroup.includes(age)
  );
  score += ageOverlap.length * 15;
  
  // Overlapping hair texture: +10 points per match
  const textureOverlap = current.tags.hairTexture.filter(texture =>
    candidate.tags.hairTexture.includes(texture)
  );
  score += textureOverlap.length * 10;
  
  // Overlapping style types: +15 points per match
  const styleOverlap = current.tags.styleType.filter(style =>
    candidate.tags.styleType.includes(style)
  );
  score += styleOverlap.length * 15;
  
  // Same maintenance level: +10 points
  if (current.tags.maintenance === candidate.tags.maintenance) {
    score += 10;
  }
  
  // Overlapping primary tags: +20 points per match
  const primaryOverlap = current.tags.primary.filter(tag =>
    candidate.tags.primary.includes(tag)
  );
  score += primaryOverlap.length * 20;
  
  // Overlapping features: +8 points per match
  const featureOverlap = current.tags.features.filter(feature =>
    candidate.tags.features.includes(feature)
  );
  score += featureOverlap.length * 8;
  
  // Recency bonus: +5 points if published within 30 days
  const daysSincePublish = Math.floor(
    (Date.now() - new Date(candidate.publishDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysSincePublish <= 30) {
    score += 5;
  }
  
  return score;
}
```

---

### **Tag Badge Rendering**

Replace static HTML with dynamic tag components:

```typescript
// components/TagBadge.tsx

interface TagBadgeProps {
  type: 'styling' | 'maintenance' | 'face-shape' | 'feature';
  value: string;
  clickable?: boolean;
}

export function TagBadge({ type, value, clickable = true }: TagBadgeProps) {
  const colorMap = {
    styling: {
      easy: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800',
      moderate: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800',
      advanced: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800'
    },
    maintenance: {
      low: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800',
      medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800',
      high: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-800'
    },
    'face-shape': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600',
    feature: 'bg-primary/10 text-primary border-primary/20'
  };
  
  const getColorClass = () => {
    if (type === 'styling' || type === 'maintenance') {
      return colorMap[type][value.toLowerCase()] || colorMap.feature;
    }
    return colorMap[type];
  };
  
  const Component = clickable ? 'a' : 'span';
  const href = clickable ? `/tags/${value.toLowerCase().replace(/\s+/g, '-')}` : undefined;
  
  return (
    <Component
      href={href}
      className={`px-3 py-1 rounded-md text-sm font-semibold border inline-block ${getColorClass()} ${
        clickable ? 'hover:opacity-80 transition-opacity cursor-pointer' : ''
      }`}
    >
      {type === 'styling' && 'Styling: '}
      {type === 'maintenance' && 'Maintenance: '}
      {type === 'face-shape' && 'Best for: '}
      {value}
    </Component>
  );
}
```

---

### **Dynamic Breadcrumbs**

Generate breadcrumbs from article metadata:

```typescript
// components/Breadcrumb.tsx

interface BreadcrumbProps {
  category: string;
  subcategory?: string;
  currentPage: string;
}

export function Breadcrumb({ category, subcategory, currentPage }: BreadcrumbProps) {
  const categoryMap = {
    'short-hairstyles': { label: 'Short Hairstyles', url: '/short-hairstyles' },
    'medium-hairstyles': { label: 'Medium Hairstyles', url: '/medium-hairstyles' },
    'long-hairstyles': { label: 'Long Hairstyles', url: '/long-hairstyles' },
    'pixie-cuts': { label: 'Pixie Cuts', url: '/pixie-cuts' },
    'bob-hairstyles': { label: 'Bob Hairstyles', url: '/bob-hairstyles' },
    // ... more categories
  };
  
  return (
    <nav className="flex mb-8 text-sm font-medium text-gray-500 dark:text-gray-400">
      <a className="hover:text-primary transition-colors" href="/">
        Home
      </a>
      <span className="mx-2">/</span>
      
      {category && categoryMap[category] && (
        <>
          <a className="hover:text-primary transition-colors" href={categoryMap[category].url}>
            {categoryMap[category].label}
          </a>
          <span className="mx-2">/</span>
        </>
      )}
      
      {subcategory && (
        <>
          <a className="hover:text-primary transition-colors" href={`/${category}/${subcategory}`}>
            {subcategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </a>
          <span className="mx-2">/</span>
        </>
      )}
      
      <span className="text-[#1a120e] dark:text-white font-bold">
        {currentPage}
      </span>
    </nav>
  );
}
```

---

### **"You Might Also Like" Component**

Replace static HTML with dynamic component:

```typescript
// components/RelatedArticles.tsx

import { RelatedArticle } from '@/types/article';

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <section className="w-full bg-[#f8f5f4] dark:bg-[#1f2937] py-16 px-4 md:px-10 border-t border-[#f2ebe8] dark:border-gray-700">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#1a120e] dark:text-white">
            You Might Also Like
          </h2>
          <a className="hidden sm:block text-primary font-bold text-sm hover:underline" href="/articles">
            View All Articles
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <article key={article.slug} className="group cursor-pointer">
              <a href={`/${article.category}/${article.slug}`}>
                <div className="relative overflow-hidden rounded-xl shadow-md mb-3">
                  <div 
                    className="aspect-[3/4] w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${article.featuredImage})` }}
                  />
                </div>
                <h3 className="text-lg font-bold font-serif leading-tight group-hover:text-primary transition-colors dark:text-white">
                  {article.title}
                </h3>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### **Internal Linking Strategy**

Add contextual links within article content:

```typescript
// lib/internal-linking.ts

interface InternalLink {
  keyword: string;
  url: string;
  title: string;
}

export function addInternalLinks(
  content: string,
  currentSlug: string,
  allArticles: Article[]
): string {
  // Build link opportunities from related articles
  const linkOpportunities: InternalLink[] = [];
  
  // Get top 10 related articles
  const relatedArticles = getRelatedArticles(
    allArticles.find(a => a.slug === currentSlug)!,
    allArticles,
    10
  );
  
  relatedArticles.forEach(article => {
    // Add primary keywords as link opportunities
    article.tags.primary.forEach(tag => {
      linkOpportunities.push({
        keyword: tag.replace(/-/g, ' '),
        url: `/${article.category}/${article.slug}`,
        title: article.title
      });
    });
    
    // Add style types
    article.tags.styleType.forEach(style => {
      linkOpportunities.push({
        keyword: style,
        url: `/${article.category}/${article.slug}`,
        title: article.title
      });
    });
  });
  
  // Sort by keyword length (longest first to avoid partial matches)
  linkOpportunities.sort((a, b) => b.keyword.length - a.keyword.length);
  
  // Track which keywords we've already linked (max 1 link per keyword)
  const linkedKeywords = new Set<string>();
  
  // Replace keywords with links (max 5 internal links per article)
  let linkedCount = 0;
  let modifiedContent = content;
  
  for (const opportunity of linkOpportunities) {
    if (linkedCount >= 5) break;
    if (linkedKeywords.has(opportunity.keyword)) continue;
    
    // Case-insensitive regex, but only match whole words
    const regex = new RegExp(`\\b${opportunity.keyword}\\b`, 'gi');
    
    // Only link the first occurrence
    if (regex.test(modifiedContent)) {
      modifiedContent = modifiedContent.replace(
        regex,
        (match) => {
          linkedKeywords.add(opportunity.keyword);
          linkedCount++;
          return `<a href="${opportunity.url}" class="text-primary hover:underline font-medium" title="${opportunity.title}">${match}</a>`;
        }
      );
    }
  }
  
  return modifiedContent;
}
```

---

### **Tag Pages (Dynamic Routes)**

Create tag archive pages:

```typescript
// app/tags/[tag]/page.tsx

import { getAllArticles } from '@/lib/articles';
import { ArticleCard } from '@/components/ArticleCard';

export async function generateStaticParams() {
  const articles = await getAllArticles();
  const tags = new Set<string>();
  
  articles.forEach(article => {
    article.tags.primary.forEach(tag => tags.add(tag));
    article.tags.styleType.forEach(tag => tags.add(tag));
    article.tags.features.forEach(tag => tags.add(tag));
  });
  
  return Array.from(tags).map(tag => ({
    tag: tag.toLowerCase().replace(/\s+/g, '-')
  }));
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const articles = await getAllArticles();
  const tagName = params.tag.replace(/-/g, ' ');
  
  // Filter articles by tag
  const taggedArticles = articles.filter(article => {
    const allTags = [
      ...article.tags.primary,
      ...article.tags.styleType,
      ...article.tags.features,
      article.tags.hairLength,
      article.tags.maintenance
    ].map(t => t.toLowerCase().replace(/\s+/g, '-'));
    
    return allTags.includes(params.tag);
  });
  
  return (
    <div className="w-full px-4 md:px-10 lg:px-40 py-16">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 capitalize">
          {tagName}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          {taggedArticles.length} articles tagged with "{tagName}"
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {taggedArticles.map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

### **Implementation Checklist**

**Phase 1: Frontmatter Enhancement**
- [ ] Update all article frontmatter with comprehensive tags
- [ ] Create TypeScript interfaces
- [ ] Validate frontmatter schema

**Phase 2: Related Content**
- [ ] Implement `getRelatedArticles()` algorithm
- [ ] Create `RelatedArticles` component
- [ ] Replace static "You Might Also Like" HTML

**Phase 3: Tag System**
- [ ] Create `TagBadge` component
- [ ] Implement tag page routes
- [ ] Generate tag archive pages

**Phase 4: Navigation**
- [ ] Create dynamic `Breadcrumb` component
- [ ] Update all page templates with breadcrumbs
- [ ] Ensure proper URL structure

**Phase 5: Internal Linking**
- [ ] Implement `addInternalLinks()` function
- [ ] Add contextual links to article content
- [ ] Limit to 5 links per article

**Phase 6: Testing**
- [ ] Test related articles accuracy
- [ ] Verify tag page generation
- [ ] Check internal link placement
- [ ] Validate breadcrumb URLs

---

### **SEO Benefits**

Implementing this system provides:

✅ **Improved Crawlability:** Internal links help search engines discover all 1,710 pages
✅ **Topic Clustering:** Tag pages create topical authority
✅ **Reduced Bounce Rate:** Related articles keep users engaged
✅ **Increased Page Views:** Internal links encourage exploration
✅ **Better UX:** Users find relevant content easily

---

## 🧠 AI MEMORY MANAGEMENT

### **Two Approaches for Different Use Cases**

#### **Approach 1: Manual Context Handoff** (For Planning & Iteration)

**When to use:**
- Planning and design sessions
- Iterative work with user feedback
- Conversations requiring review

**How it works:**
1. Ask: "Where are we in your context window?"
2. AI responds with token usage (e.g., "150K/200K tokens, 75% full")
3. At 75-80% capacity, ask: "Write a handoff prompt for a new conversation"
4. Copy prompt → Start fresh chat → Paste → Continue

---

#### **Approach 2: External File System** (For Batch Processing)

**When to use:**
- Generating 100+ articles in one session
- Processing large datasets (2,389 images)
- Automated batch operations

**How it works:**
1. AI creates 3 files: `context.md`, `todos.md`, `insights.md`
2. AI processes data iteratively
3. Before memory wipes, AI saves progress to files
4. After memory wipes, AI reads files to resume
5. Runs continuously until complete

---

## 🎯 PROJECT OVERVIEW

### **Core Concept**
A programmatic SEO hairstyle blog targeting women 40-70 with 1,710 auto-generated pages, powered by a 2,389-image database with AI-analyzed metadata.

### **Target Audience**
- **Primary:** Women aged 40-70
- **Secondary:** Women 20-40, Men (via dedicated section)
- **Demographics:** All hair textures, face shapes, maintenance preferences

### **Content Scale**
- **Total Pages:** 1,710 programmatic pages
- **Image Database:** 2,389 analyzed images
- **Categories:** 10 top-level navigation items

### **Traffic Strategy**
1. **Organic Search** - Programmatic SEO (1,710 keyword-targeted pages)
2. **Pinterest** - Primary traffic driver (Pin buttons on all images)
3. **Social Media** - Instagram, Facebook secondary channels
4. **Email** - Newsletter for retention

---

## 🧭 NAVIGATION STRUCTURE

### **Top-Level Navigation (10 Items)**

```
Cuts ▼ | Styles ▼ | Lengths ▼ | Bangs ▼ | Age ▼ | Texture ▼ | Colors ▼ | Men ▼ | Advice | About
```

(Full navigation structure from V2 remains the same - see HAIRSTYLE_BLOG_PROMPT_MASTER_V2.md lines 223-410)

---

## 📌 PINTEREST INTEGRATION

(Same as V2 - see HAIRSTYLE_BLOG_PROMPT_MASTER_V2.md lines 1100-1250)

---

## 🔍 ENHANCED FRONTMATTER & SEO

(Same as V2 - see HAIRSTYLE_BLOG_PROMPT_MASTER_V2.md lines 1251-1450)

---

## 💾 IMAGE DATABASE INTEGRATION

(Same as V2 - see HAIRSTYLE_BLOG_PROMPT_MASTER_V2.md lines 1451-1600)

---

## 📦 BATCH ARTICLE GENERATION

(Same as V2 - see HAIRSTYLE_BLOG_PROMPT_MASTER_V2.md lines 1601-1750)

---

## 🚀 IMPLEMENTATION WORKFLOW

### **Phase 1: Setup**
1. Initialize Next.js 15 project with TypeScript
2. Install Tailwind CSS
3. Add Google Fonts (Plus Jakarta Sans, Playfair Display)
4. Add Material Symbols icons
5. Configure dark mode

### **Phase 2: Core Components**
1. Create Header component (sticky, responsive)
2. Create Footer component
3. Create Button components (primary, secondary, chip)
4. Create Card components (article, category)
5. Create Search component

### **Phase 3: Pages**
1. Build Homepage (copy from stitch template)
2. Build Category Page template
3. Build Blog Article Page template
4. Add dark mode toggle

### **Phase 4: Content Integration**
1. Connect to image database
2. Generate article frontmatter
3. Create programmatic routes
4. Add Pinterest integration

### **Phase 5: SEO & Performance**
1. Add meta tags
2. Implement structured data
3. Optimize images (lazy loading)
4. Add sitemap.xml
5. Configure robots.txt

---

## 📞 SUPPORT & RESOURCES

### **Key Files**

- **This Prompt:** `HAIRSTYLE_BLOG_PROMPT_MASTER_V3.md`
- **HTML Templates:** `C:\Users\Victoria\Hairstyle Page Layout\stitch_hairstyle_*_best\code.html`
- **Image Database:** `C:\Users\Victoria\flux-fal-ai\image-database.json`

### **External Resources**

- **Tailwind CSS:** tailwindcss.com
- **Google Fonts:** fonts.google.com
- **Material Symbols:** fonts.google.com/icons
- **Pinterest Business:** business.pinterest.com

---

**END OF MASTER PROMPT V3**

*This document is based on actual HTML/CSS templates from stitch. Use the template files as the source of truth for implementation details.*

*Ready to build a stunning 1,710-page hairstyle blog!* 🚀
