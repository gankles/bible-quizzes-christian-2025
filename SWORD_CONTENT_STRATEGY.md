# SWORD Data Content Strategy

How CrossWire SWORD modules can enrich existing pages and create new ones.

---

## Commentary Data (Already Converted)

9 commentaries converted to JSON in `data/commentaries/`:

| Commentary | Verses | Avg Length | Size | Testament | License |
|---|---|---|---|---|---|
| **JFB** (Jamieson-Fausset-Brown) | 23,706 | 622 chars | 14.6 MB | OT + NT | Public Domain |
| **MHCC** (Matthew Henry Concise) | 27,547 | 1,123 chars | 30.1 MB | OT + NT | Public Domain |
| **Wesley** (John Wesley Notes) | 17,064 | 315 chars | 5.5 MB | OT + NT | Public Domain |
| **Clarke** (Adam Clarke) | 19,978 | 967 chars | 19.1 MB | OT + NT | Public Domain |
| **Barnes** (Albert Barnes NT) | 7,188 | 1,919 chars | 13.4 MB | NT only | Public Domain |
| **RWP** (Robertson's Word Pictures) | 6,951 | 717 chars | 5.3 MB | NT only | Public Domain |
| **KD** (Keil & Delitzsch) | 21,863 | 3,611 chars | 77.6 MB | OT only | Public Domain |
| **MHC** (Matthew Henry Complete) | 30,967 | 11,761 chars | 348.8 MB | OT + NT | Public Domain |
| **Calvin** (Calvin's Commentaries) | 12,971 | 4,151 chars | 52.3 MB | OT + NT | Public Domain |

### Recommended for Display (Short Verse-by-Verse)

1. **Primary: JFB** — 76% coverage, 622 avg chars, both testaments
2. **Fallback: MHCC** — 89% coverage, 1,123 avg chars, fills JFB gaps

### Universally Respected (Non-Divisive)

- MHCC (Matthew Henry) — beloved across all denominations
- JFB (Jamieson-Fausset-Brown) — scholarly, balanced
- RWP (Robertson's Word Pictures) — NT Greek word studies
- KD (Keil & Delitzsch) — OT scholarly standard

### Skip for Main Pages (Denominationally Divisive)

- Calvin — Reformed/Calvinist bias
- Wesley — Arminian/Methodist bias
- Scofield — Dispensationalist

---

## Dictionary & Encyclopedia Modules (Not Yet Converted)

Available on CrossWire for download and conversion:

### Tier 1 — Highest Impact

| Module | Description | License | Entries | Best For |
|---|---|---|---|---|
| **ISBE** | International Standard Bible Encyclopedia | Public Domain | 1000s of articles | People, places, doctrines, customs |
| **Easton** | Easton's Bible Dictionary | Public Domain | ~4,000 entries | Concise Bible term definitions |
| **Smith** | Smith's Bible Dictionary (1884) | Public Domain | ~4,500 entries | Complementary definitions |
| **Hitchcock** | Hitchcock's Bible Names | Public Domain | 2,500+ names | Name meanings and etymology |
| **StrongsGreek** | Strong's Greek Dictionary | Public Domain | ~5,600 entries | Greek word definitions |
| **StrongsHebrew** | Strong's Hebrew Dictionary | Public Domain | ~8,600 entries | Hebrew word definitions |
| **AbbottSmithStrongs** | Abbott-Smith Greek Lexicon | Public Domain | ~5,000 entries | Scholarly Greek definitions |
| **BDBGlosses_Strongs** | Brown-Driver-Briggs Hebrew | Public Domain | ~8,000 entries | Gold standard Hebrew lexicon |

### Tier 2 — Topical & Cross-Reference

| Module | Description | License | Best For |
|---|---|---|---|
| **Nave** | Nave's Topical Bible | Public Domain | 20,000+ topics, 100,000+ references |
| **Torrey** | R.A. Torrey's Topical Textbook | Public Domain | Additional topical references |
| **TCR** | Thompson Chain References | Public Domain | Chain-reference cross-linking |

### Tier 3 — Supplementary Content

| Module | Description | License | Best For |
|---|---|---|---|
| **Josephus** | Complete Works of Josephus | Public Domain | Historical context for Bible events |
| **Webster1828** | Webster's 1828 Dictionary | CC BY-SA 4.0 | KJV-era English word meanings |
| **AmTract** | American Tract Society Dictionary | Public Domain | Additional Bible definitions |
| **CBC** | Condensed Biblical Cyclopedia | Public Domain | Compact encyclopedia summaries |
| **SME** | Spurgeon's Morning & Evening | Public Domain | Daily devotional content |
| **SAOA** | Scripture Alphabet of Animals | Public Domain | Animals mentioned in Scripture |

### Not Available from SWORD

- Maps/images: The SWORD Maps category exists but has **zero modules** listed
- For visual content, source from OpenBible.info Geo data or Wikimedia Commons

---

## Enriching Existing Pages

### `/bible-names/[name]` — 2,623 pages (currently THIN)

**Problem:** Short name meaning, one paragraph description.

**Fix with:**
- Hitchcock → name etymology and Hebrew meaning
- Easton → concise dictionary definition
- ISBE → full encyclopedia article
- Smith → alternative scholarly perspective

**Result:** Each name page shows 3-4 sources of unique content. Goes from thin to rich.

---

### `/lexicon/[strongs]` — 16,413 pages (currently decent)

**Problem:** Has basic Strong's definition but could be deeper.

**Fix with:**
- AbbottSmith → scholarly Greek lexicon entries (NT words)
- BDB → Brown-Driver-Briggs Hebrew definitions (OT words)
- Webster1828 → KJV-era English meaning of translated word

**Result:** Multi-source word study page with scholarly depth.

---

### `/people/[slug]` — 3,009 pages (currently medium)

**Problem:** Has character profile but lacks scholarly depth.

**Fix with:**
- ISBE → encyclopedia articles about that person
- Josephus → historical account from Antiquities/Wars
- JFB → commentary on key verses about that person

**Result:** Full scholarly character profile with historical context.

---

### `/topics/[slug]` and `/nave-topics/[slug]` — ~26,000 pages (variable quality)

**Problem:** Some are just verse lists, others have boilerplate content.

**Fix with:**
- Torrey → additional verse references from a second topical source
- TCR → Thompson Chain cross-references
- ISBE → encyclopedia articles on doctrines and concepts
- JFB → commentary snippets for cited verses

**Result:** Multi-source topical study with scholarly commentary.

---

### `/chapters/[book]/[chapter]` — 1,189 pages (just verse text)

**Problem:** Plain Bible text with no interpretation.

**Fix with:**
- JFB → short verse-by-verse commentary displayed inline (622 avg chars)
- Webster1828 → definitions for archaic KJV words
- ISBE → articles for people/places mentioned in that chapter

**Result:** Full chapter study page with inline commentary.

---

### `/verses/[book]/[chapter]/[verse]` — 31,102 pages (mostly thin)

**Problem:** Only 10 pre-generated, rest have minimal content.

**Fix with:**
- JFB → commentary snippet (avg 622 chars)
- MHCC → fallback for missing JFB entries (avg 1,123 chars)
- Cross-reference data already added (persons, places, events)

**Result:** Every verse page has unique scholarly commentary.

---

### `/cross-references/[book]/[chapter]/[verse]` — ~31,000 pages

**Problem:** Has verse context (persons/places/events) but still thin.

**Fix with:**
- JFB → commentary explaining why the cross-references matter
- ISBE → encyclopedia context for people/places in the verse

**Result:** Cross-reference pages with scholarly explanation.

---

### `/nave-topics/[slug]/in/[book]` — ~21,000 pages (filtered lists)

**Problem:** Just a list of verse references, no actual content.

**Fix with:**
- JFB → pull commentary for each cited verse
- Show what each verse actually says about the topic in that book

**Result:** Mini-commentary on that topic in that specific book.

---

### `/topics/[slug]/in/[book]` — ~5,000 pages (template boilerplate)

**Problem:** Same Literary Context paragraph on every page.

**Fix with:**
- JFB → commentary for key cited verses
- ISBE → book-specific context article

**Result:** Unique content per topic-in-book combination.

---

## Creating New Pages

### Commentary Comparison Pages — ~31,000 new pages

**Route:** `/verses/[book]/[chapter]/[verse]/commentary`

- Show JFB + MHCC + Wesley side-by-side for the same verse
- 3 different scholars interpreting the same verse = unique content
- **Target keyword:** "Genesis 3:15 commentary", "John 3:16 explanation"

---

### Chapter Commentary Pages — 1,189 new pages

**Route:** `/chapters/[book]/[chapter]/commentary`

- Full chapter with JFB verse-by-verse commentary inline
- Longer, richer content than the reading page
- **Target keyword:** "Genesis 1 commentary", "Matthew 5 commentary"

---

### Book Commentary Overview Pages — 66 new pages

**Route:** `/books/[book]/commentary`

- Summary of how JFB/MHCC treat each book
- Key themes, chapter-by-chapter highlights
- **Target keyword:** "Genesis commentary", "Romans commentary overview"

---

### Bible Dictionary Pages — ~6,000 new pages

**Route:** `/dictionary/[term]`

- Merge Easton + Smith + ISBE + AmTract definitions
- Show 2-4 dictionary definitions side-by-side per term
- **Target keyword:** "what does [term] mean in the Bible"

---

### Word Study + Commentary Pages — ~13,000 new pages

**Route:** `/lexicon/[strongs]/commentary`

- Every verse using that Strong's number with JFB/RWP commentary
- RWP focuses on Greek word meanings — perfect for this
- **Target keyword:** "agape love meaning Bible", "ruach Holy Spirit Hebrew"

---

### People + Commentary Pages — ~3,000 new pages

**Route:** `/people/[slug]/commentary`

- Every verse mentioning that person with JFB commentary
- Creates a narrative commentary about Abraham, Moses, David etc.

---

### Topic Commentary Pages — ~5,000 new pages

**Route:** `/topics/[slug]/commentary`

- All verses on that topic with scholarly commentary from JFB + MHCC
- **Target keyword:** "what the Bible says about prayer commentary"

---

## Impact Summary

| Action | Pages | Type |
|---|---|---|
| Enrich bible-names pages | 2,623 | Fix thin |
| Enrich lexicon pages | 16,413 | Fix thin |
| Enrich people pages | 3,009 | Fix thin |
| Enrich topic/nave pages | ~26,000 | Fix thin |
| Enrich chapter reading | 1,189 | Fix thin |
| Enrich verse pages | 31,102 | Fix thin |
| Enrich cross-reference pages | ~31,000 | Fix thin |
| **New** commentary comparison | ~31,000 | New pages |
| **New** chapter commentary | 1,189 | New pages |
| **New** book commentary | 66 | New pages |
| **New** dictionary pages | ~6,000 | New pages |
| **New** word study + commentary | ~13,000 | New pages |
| **New** people commentary | ~3,000 | New pages |
| **New** topic commentary | ~5,000 | New pages |
| **TOTAL** | **~170K pages** | **~111K enriched + ~59K new** |

**Current site: ~55-60K pages → After: ~115-120K quality pages**

---

## Priority Order

1. **Chapter reading + JFB inline** (1,189 pages) — highest impact per page, targets "[chapter] commentary" keywords
2. **Verse pages + JFB snippet** (31K pages) — fixes biggest thin content bucket
3. **Download & convert dictionary modules** (ISBE, Easton, Smith, Hitchcock) — unlocks bible-names and dictionary enrichment
4. **Bible-names enrichment** (2,623 pages) — Hitchcock + Easton + ISBE turns thin pages rich
5. **Commentary comparison pages** (31K new) — unique content Google can't find elsewhere
6. **Dictionary pages** (~6K new) — new route targeting "what does X mean in the Bible"
7. **Lexicon enrichment** (16K pages) — AbbottSmith + BDB adds scholarly depth
8. **People enrichment** (3K pages) — ISBE + Josephus
9. **Topic enrichment** (~26K pages) — Torrey + TCR + commentary
10. **Everything else** — word study commentary, people commentary, topic commentary

---

## Files & Locations

- Converted commentaries: `data/commentaries/*.json`
- SWORD source modules: `data/sword-modules/`
- Converter script: `scripts/convert-sword-commentaries.py`
- Verse context data: `data/verse-context.json`
- Quiz data: `data/quizzes/`
- Lexicon data: `data/lexicon.json`
- Topics data: `data/topics.json`
- Cross-references: `data/cross-references.json`
