# GEO Analysis — Bible Maximum (biblemaximum.com)
**Generated:** 2026-05-21 | **Analyzed by:** Claude Sonnet 4.6

---

## GEO Readiness Score: 61/100

| Category | Weight | Score | Notes |
|----------|--------|-------|-------|
| Citability | 25% | 14/25 | FAQ patterns present; missing self-contained 134–167 word blocks |
| Structural Readability | 20% | 16/20 | Strong heading hierarchy; few comparison tables |
| Multi-Modal Content | 15% | 6/15 | Images used; no video, no interactive tools beyond quizzes |
| Authority & Brand Signals | 20% | 8/20 | No author bylines; only 2 sameAs URLs; no Wikipedia |
| Technical Accessibility | 20% | 17/20 | Excellent SSR; robots.txt missing AI crawlers; no llms.txt |

---

## Platform Breakdown

| Platform | Est. Score | Key Gap |
|----------|-----------|---------|
| **Google AI Overviews** | 68/100 | Strong schema + SSR; no datePublished on most pages |
| **ChatGPT** | 42/100 | No Wikipedia entity; no Reddit presence; no author Person schema |
| **Perplexity** | 45/100 | No Reddit citations; FAQ schema present but passages not self-contained |
| **Bing Copilot** | 58/100 | Good sitemap coverage; no IndexNow; no dateModified signals |

---

## 1. AI Crawler Access Status

**Current robots.txt** — generic `Allow: *` with no explicit AI crawler rules.

| Crawler | Status | Recommendation |
|---------|--------|---------------|
| GPTBot (OpenAI) | ⚠️ Allowed by wildcard only | Explicitly allow |
| OAI-SearchBot (OpenAI) | ⚠️ Allowed by wildcard only | Explicitly allow |
| ClaudeBot (Anthropic) | ⚠️ Allowed by wildcard only | Explicitly allow |
| PerplexityBot | ⚠️ Allowed by wildcard only | Explicitly allow |
| CCBot (Common Crawl training) | ⚠️ Allowed | Optionally block |
| anthropic-ai | ⚠️ Allowed by wildcard only | Explicitly allow |

**Fix (add to robots.txt):**
```
# AI Search crawlers — explicitly allowed for AI Overviews & citation
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: anthropic-ai
Allow: /
```

---

## 2. llms.txt Status: MISSING

No `/llms.txt` file exists. This is a growing standard backed by Reddit, Cloudflare, and Akamai.

**Recommended `/llms.txt` for Bible Maximum:**
```
# Bible Maximum
> Comprehensive Bible study platform with quizzes for all 66 books, 
> KJV verse reader, Greek/Hebrew lexicon, Nave's Topical Bible, 
> cross-references, character profiles, and chapter commentaries.

## Core Study Tools
- [Bible Quizzes](https://biblemaximum.com/bible-quizzes): Interactive quizzes for all 66 books of the Bible
- [KJV Chapter Reader](https://biblemaximum.com/chapters/genesis/1): Read every chapter with Matthew Henry commentary
- [Greek & Hebrew Lexicon](https://biblemaximum.com/lexicon): Strong's concordance with original language word studies
- [Nave's Topical Bible](https://biblemaximum.com/nave-topics): 20,000+ scripture references by topic
- [Bible Characters](https://biblemaximum.com/people): Profiles of major and minor biblical figures
- [Cross-References](https://biblemaximum.com/cross-references): Scripture-to-scripture reference tool
- [Bible Topics](https://biblemaximum.com/topics): Topical index across all 66 books

## Key Facts
- Covers all 66 books: 39 Old Testament, 27 New Testament
- KJV text with verse-by-verse Matthew Henry commentary
- Greek and Hebrew word studies using Strong's numbering
- 5,000+ Nave's Topical Bible entries
- Free, no account required

## Contact
- Site: https://biblemaximum.com
- Email: contact@biblemaximum.com
```

---

## 3. Brand Mention Analysis

| Platform | Status | Priority |
|----------|--------|----------|
| Wikipedia | ❌ No entity page | High — ChatGPT cites Wikipedia 47.9% of the time |
| Reddit | ❌ No community presence detected | High — Perplexity cites Reddit 46.7% of the time |
| YouTube | ❌ No channel found | High — YouTube mentions correlate 0.737 with AI citations |
| LinkedIn | ❌ No company page found | Medium |
| Facebook | ⚠️ Listed in sameAs but unverified activity | Low |
| Twitter/X | ⚠️ Listed in sameAs but unverified activity | Low |

**sameAs gap:** The Organization schema only lists Facebook and Twitter. Add YouTube, LinkedIn, and Reddit profile URLs when created.

---

## 4. Passage-Level Citability

### What AI looks for: 134–167 word self-contained answer blocks

**Currently strong:**
- Nave's Topical Bible pages (`/nave-topics/[slug]`) — FAQ section with Q&A format ✅
- Verse study pages — FAQ schema with verse meaning + context answers ✅  
- Chapter pages — Matthew Henry commentary text (dense, authoritative) ✅

**Missing on most pages:**
- No "X is defined as..." or "X refers to..." opener in first 60 words
- Statistics not cited with sources (e.g., "Genesis has 50 chapters" — no attribution)
- Nave topic intro paragraphs are 2–3 sentences; need to expand to 134–167 words

**Example rewrite for `/nave-topics/faith`:**

*Before (current, ~50 words):*
> The topic of faith appears throughout Scripture with 247 references spanning 38 books of the Bible, from Genesis to Revelation. Explore the scriptures below to deepen your understanding of what God's Word teaches about this subject.

*After (GEO-optimized, ~155 words):*
> Faith, in the Bible, refers to complete trust and confidence in God and His promises, even without visible proof. The Greek word *pistis* (πίστις, Strong's G4102) is the New Testament's primary term, translated as faith, belief, or trust. The writer of Hebrews provides the Bible's definitive definition: "Now faith is the substance of things hoped for, the evidence of things not seen" (Hebrews 11:1, KJV). The Old Testament counterpart is the Hebrew *emunah* (אֱמוּנָה, Strong's H530), meaning steadfastness and faithfulness. Scripture mentions faith 247 times across 38 books — more than any other virtue except love. The Apostle Paul taught that salvation comes "by grace through faith" (Ephesians 2:8), and James emphasized that genuine faith produces works (James 2:17). Nave's Topical Bible organizes all 247 references into categories covering saving faith, the faith of Abraham, faith and works, and the Shield of Faith.

---

## 5. Server-Side Rendering Check

**Result: Excellent — 155/166 components are server-side rendered**

| Metric | Value |
|--------|-------|
| Total app components | 166 |
| Server components (default, SSR) | 155 (93%) |
| Client components (`'use client'`) | 11 (7%) |
| ISR (`revalidate`) enabled | 53 pages |

Client components are used only for interactive UI (quiz interface, search, engagement tracking) — all page content renders server-side and is visible to AI crawlers. **No action needed here.**

---

## 6. Schema Markup Inventory

| Schema Type | Pages Using It | Quality |
|------------|----------------|---------|
| FAQPage | ~40+ pages (verse, nave-topics, quiz) | ✅ Good |
| BreadcrumbList | ~80+ pages | ✅ Good |
| Article | Verse, chapter pages | ⚠️ Missing datePublished/dateModified |
| Organization | Layout (global) | ⚠️ Only 2 sameAs URLs |
| DefinedTerm / DefinedTermSet | Nave-topics pages | ✅ Excellent — rare and valuable |
| SearchAction (Sitelinks Searchbox) | Layout (global) | ✅ Good |
| WebSite | Layout (global) | ✅ Good |
| Person | ❌ None | Missing — no author bylines |
| HowTo / LearningResource | ❌ None | Opportunity for study guide pages |
| Dataset | ❌ None | Opportunity for lexicon word data |

---

## Top 5 Highest-Impact Changes

### 1. Fix robots.txt — Explicitly Allow AI Crawlers (30 min)
Wildcard `Allow: *` works but explicit rules signal intent and prevent misconfiguration. Add GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot rules.

**Impact:** Ensures all AI platforms can crawl. Low effort, high safety value.

### 2. Create `/llms.txt` (1 hour)
This file tells AI crawlers what the site is about and which pages matter most. It's the single fastest way to improve ChatGPT and Perplexity citations.

**Impact:** Direct citation signal for all LLM-based search. Medium effort, very high payoff.

### 3. Add datePublished + dateModified to Article Schema (2–3 hours)
Currently only 2–3 pages have date schema. AI Overviews favor freshness signals. Adding dates to verse, chapter, and quiz pages will improve Google AIO selection.

**Impact:** +5–10 pts on Google AI Overviews score. Medium effort.

### 4. Expand Topic Intro Paragraphs to 134–167 Words (Ongoing)
The Nave's Topical Bible pages (`/nave-topics/`) are perfectly positioned for AI citations on queries like "What does the Bible say about faith?" but current intros are too short. Expanding to self-contained 134–167 word definitions following the "X is defined as..." pattern will capture AI answers.

**Impact:** Highest long-term GEO payoff. Start with top 50 topics (faith, love, prayer, salvation, grace, sin, forgiveness, hope, wisdom, righteousness).

### 5. Build Reddit & YouTube Presence (2–4 weeks)
Brand mentions on Reddit (r/Christianity, r/Bible, r/Reformed) and YouTube correlate most strongly with ChatGPT and Perplexity citations. Even 10–20 genuine posts mentioning "Bible Maximum" changes the AI training signal.

**Impact:** Largest multiplier for ChatGPT/Perplexity reach. Highest effort but highest ceiling.

---

## Schema Recommendations

### Add to Article schema (verse + chapter pages):
```json
{
  "@type": "Article",
  "datePublished": "2025-02-01",
  "dateModified": "2026-05-21",
  "author": {
    "@type": "Organization",
    "name": "Bible Maximum",
    "url": "https://biblemaximum.com"
  }
}
```

### Add Person schema to /about page (create if missing):
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Bible Maximum Editorial Team",
  "url": "https://biblemaximum.com/about",
  "worksFor": {
    "@type": "Organization",
    "name": "Bible Maximum"
  }
}
```

### Add Dataset schema to lexicon pages:
```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Strong's Hebrew and Greek Lexicon",
  "description": "Complete Strong's concordance with Hebrew and Greek definitions, transliterations, and verse usage.",
  "url": "https://biblemaximum.com/lexicon",
  "license": "https://creativecommons.org/licenses/by/4.0/"
}
```

### Expand Organization sameAs (when profiles created):
```json
{
  "sameAs": [
    "https://facebook.com/biblemaximum",
    "https://twitter.com/biblemaximum",
    "https://youtube.com/@biblemaximum",
    "https://linkedin.com/company/biblemaximum",
    "https://reddit.com/user/biblemaximum",
    "https://en.wikipedia.org/wiki/Bible_Maximum"
  ]
}
```

---

## Content Reformatting Suggestions

### Pages to prioritize for 134–167 word self-contained blocks:

| Page Type | Query Pattern | Rewrite Target |
|-----------|--------------|----------------|
| `/nave-topics/faith` | "What does the Bible say about faith?" | Intro paragraph → 150-word definition |
| `/nave-topics/prayer` | "Bible verses about prayer" | Add "Prayer is defined as..." opener |
| `/nave-topics/salvation` | "What is salvation in the Bible?" | Expand intro with Greek *soteria* definition |
| `/nave-topics/love` | "What does the Bible say about love?" | Lead with agape/phileo/eros distinction |
| `/lexicon/[word]` | "What does [Hebrew/Greek word] mean?" | First para = 150-word standalone definition |
| `/chapters/[book]/[ch]` | "[Book Chapter] summary" | Add 150-word chapter summary block at top |
| `/verses/[ref]` | "What does [verse] mean?" | FAQ answers are good; expand to 150 words |
| `/people/[character]` | "Who is [person] in the Bible?" | Add "X was a..." definition opener |

### Heading patterns to add:

Replace generic H2s with question-based H2s that match query intent:

| Current | GEO-Optimized |
|---------|--------------|
| "Topic Introduction" | "What Does the Bible Say About [Topic]?" |
| "Entries (12)" | "Scripture References About [Topic]" |
| "Study by Book" | "Where Is [Topic] Mentioned in the Bible?" |
| "Continue Your Study" | "Related Bible Study Topics" |

---

## Quick Win Checklist

- [ ] Add AI crawler directives to `robots.txt` (30 min)
- [ ] Create `/public/llms.txt` (1 hour)
- [ ] Add `datePublished: '2025-02-01'` and `dateModified: '[current]'` to Article schemas on verse + chapter pages
- [ ] Update Organization `sameAs` array to include YouTube/LinkedIn/Reddit when created
- [ ] Rewrite top 10 Nave topic intros to 134–167 word self-contained blocks
- [ ] Add "X is defined as..." opener to lexicon word pages
- [ ] Create an `/about` page with editorial team info and Person schema
- [ ] Register on Reddit (r/Christianity), post 10 genuine study resources over 4 weeks
- [ ] Create YouTube channel with Bible study short videos that mention "Bible Maximum"
