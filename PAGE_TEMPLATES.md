# Page Templates

All 157 page templates under `app/` (every `page.tsx`/`page.ts`), each with a real, working example live URL on `https://biblemaximum.com`. Static routes (104) just use the route path as-is. Dynamic routes (53, containing one or more `[param]` segments) were verified against the actual data source each page reads from (`generateStaticParams()`, the relevant `lib/*.ts` loader, or the underlying `data/*.json`/`.csv` file) — none of the example slugs/ids below were guessed.

---

## Quizzes & Chapter Quizzes (27 templates)

| Template File | URL Pattern | Example Live URL |
|---|---|---|
| `app/[slug]/page.tsx` | `/[slug]` | https://biblemaximum.com/exodus-1-quiz |
| `app/bible-geography-quiz/[book]/page.tsx` | `/bible-geography-quiz/[book]` | https://biblemaximum.com/bible-geography-quiz/genesis |
| `app/bible-geography-quiz/page.tsx` | `/bible-geography-quiz` | https://biblemaximum.com/bible-geography-quiz |
| `app/bible-quiz-categories/page.tsx` | `/bible-quiz-categories` | https://biblemaximum.com/bible-quiz-categories |
| `app/bible-quiz-difficulty/[level]/page.tsx` | `/bible-quiz-difficulty/[level]` | https://biblemaximum.com/bible-quiz-difficulty/easy |
| `app/bible-quiz-difficulty/page.tsx` | `/bible-quiz-difficulty` | https://biblemaximum.com/bible-quiz-difficulty |
| `app/bible-quiz-faq/page.tsx` | `/bible-quiz-faq` | https://biblemaximum.com/bible-quiz-faq |
| `app/bible-quizzes/page.tsx` | `/bible-quizzes` | https://biblemaximum.com/bible-quizzes |
| `app/bible-trivia/page.tsx` | `/bible-trivia` | https://biblemaximum.com/bible-trivia |
| `app/chapter-quizzes/page.tsx` | `/chapter-quizzes` | https://biblemaximum.com/chapter-quizzes |
| `app/character-quiz/[slug]/page.tsx` | `/character-quiz/[slug]` | https://biblemaximum.com/character-quiz/nehemiah |
| `app/character-quiz/page.tsx` | `/character-quiz` | https://biblemaximum.com/character-quiz |
| `app/david-quiz/page.tsx` | `/david-quiz` | https://biblemaximum.com/david-quiz |
| `app/genesis-1-quiz-research-based/page.tsx` | `/genesis-1-quiz-research-based` | https://biblemaximum.com/genesis-1-quiz-research-based |
| `app/genesis-1-quiz-tabbed/page.tsx` | `/genesis-1-quiz-tabbed` | https://biblemaximum.com/genesis-1-quiz-tabbed |
| `app/genesis-chapters/page.tsx` | `/genesis-chapters` | https://biblemaximum.com/genesis-chapters |
| `app/genesis-quiz/page.tsx` | `/genesis-quiz` | https://biblemaximum.com/genesis-quiz |
| `app/how-bible-quiz-works/page.tsx` | `/how-bible-quiz-works` | https://biblemaximum.com/how-bible-quiz-works |
| `app/jesus-quiz/page.tsx` | `/jesus-quiz` | https://biblemaximum.com/jesus-quiz |
| `app/kids-bible-quiz/page.tsx` | `/kids-bible-quiz` | https://biblemaximum.com/kids-bible-quiz |
| `app/mark-1-quiz/page.tsx` | `/mark-1-quiz` | https://biblemaximum.com/mark-1-quiz |
| `app/mark-2-quiz/page.tsx` | `/mark-2-quiz` | https://biblemaximum.com/mark-2-quiz |
| `app/mark-3-quiz/page.tsx` | `/mark-3-quiz` | https://biblemaximum.com/mark-3-quiz |
| `app/moses-quiz/page.tsx` | `/moses-quiz` | https://biblemaximum.com/moses-quiz |
| `app/new-testament-quizzes/page.tsx` | `/new-testament-quizzes` | https://biblemaximum.com/new-testament-quizzes |
| `app/old-testament-quizzes/page.tsx` | `/old-testament-quizzes` | https://biblemaximum.com/old-testament-quizzes |
| `app/paul-quiz/page.tsx` | `/paul-quiz` | https://biblemaximum.com/paul-quiz |

**Note on `app/[slug]/page.tsx`:** this catch-all handles chapter quizzes (`{book}-{n}-quiz`), book quizzes (`{book}-quiz`), generic quizzes (e.g. `{topic}-quiz`), and chapter-listing pages (`{book}-chapters`) — all resolved via `lib/quiz-loader.ts` against `data/quizzes/*.json`. `exodus-1-quiz` was picked (confirmed `data/quizzes/exodus-1-tabbed.json` exists) specifically because `exodus` has no literal static folder under `app/` that would shadow the catch-all, unlike `genesis`.

---

## Bible Books & Chapter Navigation (16 templates)

| Template File | URL Pattern | Example Live URL |
|---|---|---|
| `app/bible-chapter-summaries/[book]/[chapter]/page.tsx` | `/bible-chapter-summaries/[book]/[chapter]` | https://biblemaximum.com/bible-chapter-summaries/genesis/1 |
| `app/bible-chapter-summaries/[book]/page.tsx` | `/bible-chapter-summaries/[book]` | https://biblemaximum.com/bible-chapter-summaries/genesis |
| `app/bible-chapter-summaries/page.tsx` | `/bible-chapter-summaries` | https://biblemaximum.com/bible-chapter-summaries |
| `app/books/[book]/page.tsx` | `/books/[book]` | https://biblemaximum.com/books/genesis |
| `app/books-of-the-bible/new-testament/page.tsx` | `/books-of-the-bible/new-testament` | https://biblemaximum.com/books-of-the-bible/new-testament |
| `app/books-of-the-bible/old-testament/page.tsx` | `/books-of-the-bible/old-testament` | https://biblemaximum.com/books-of-the-bible/old-testament |
| `app/books-of-the-bible/page.tsx` | `/books-of-the-bible` | https://biblemaximum.com/books-of-the-bible |
| `app/books-of-the-bible-in-order/page.tsx` | `/books-of-the-bible-in-order` | https://biblemaximum.com/books-of-the-bible-in-order |
| `app/bible-book-names/page.tsx` | `/bible-book-names` | https://biblemaximum.com/bible-book-names |
| `app/chapters/[book]/[chapter]/page.tsx` | `/chapters/[book]/[chapter]` | https://biblemaximum.com/chapters/genesis/1 |
| `app/how-many-chapters-in-the-bible/page.tsx` | `/how-many-chapters-in-the-bible` | https://biblemaximum.com/how-many-chapters-in-the-bible |
| `app/how-to-read-the-bible/page.tsx` | `/how-to-read-the-bible` | https://biblemaximum.com/how-to-read-the-bible |
| `app/how-to-study-the-bible/page.tsx` | `/how-to-study-the-bible` | https://biblemaximum.com/how-to-study-the-bible |
| `app/bible-study-for-beginners/page.tsx` | `/bible-study-for-beginners` | https://biblemaximum.com/bible-study-for-beginners |
| `app/bible/page.tsx` | `/bible` | https://biblemaximum.com/bible |
| `app/who-wrote-the-bible/page.tsx` | `/who-wrote-the-bible` | https://biblemaximum.com/who-wrote-the-bible |

---

## Lexicon, Strong's & Word Studies (21 templates)

| Template File | URL Pattern | Example Live URL |
|---|---|---|
| `app/lexicon/page.tsx` | `/lexicon` | https://biblemaximum.com/lexicon |
| `app/lexicon/[strongs]/page.tsx` | `/lexicon/[strongs]` | https://biblemaximum.com/lexicon/H7225 |
| `app/lexicon/author/[name]/[language]/page.tsx` | `/lexicon/author/[name]/[language]` | https://biblemaximum.com/lexicon/author/paul/greek |
| `app/lexicon/browse/greek/page.tsx` | `/lexicon/browse/greek` | https://biblemaximum.com/lexicon/browse/greek |
| `app/lexicon/browse/hebrew/page.tsx` | `/lexicon/browse/hebrew` | https://biblemaximum.com/lexicon/browse/hebrew |
| `app/lexicon/compare/[comparison]/page.tsx` | `/lexicon/compare/[comparison]` | https://biblemaximum.com/lexicon/compare/G25-vs-G5368 |
| `app/lexicon/concept/[slug]/page.tsx` | `/lexicon/concept/[slug]` | https://biblemaximum.com/lexicon/concept/love |
| `app/greek-word/page.tsx` | `/greek-word` | https://biblemaximum.com/greek-word |
| `app/greek-word/[slug]/page.tsx` | `/greek-word/[slug]` | https://biblemaximum.com/greek-word/g5-abba |
| `app/greek-words/page.tsx` | `/greek-words` | https://biblemaximum.com/greek-words |
| `app/greek-grammar/page.tsx` | `/greek-grammar` | https://biblemaximum.com/greek-grammar |
| `app/greek-grammar/[slug]/page.tsx` | `/greek-grammar/[slug]` | https://biblemaximum.com/greek-grammar/perfect-active-indicative |
| `app/hebrew-word/page.tsx` | `/hebrew-word` | https://biblemaximum.com/hebrew-word |
| `app/hebrew-word/[slug]/page.tsx` | `/hebrew-word/[slug]` | https://biblemaximum.com/hebrew-word/h1-ab |
| `app/hebrew-words/page.tsx` | `/hebrew-words` | https://biblemaximum.com/hebrew-words |
| `app/word-studies/page.tsx` | `/word-studies` | https://biblemaximum.com/word-studies |
| `app/interlinear/page.tsx` | `/interlinear` | https://biblemaximum.com/interlinear |
| `app/interlinear/[book]/page.tsx` | `/interlinear/[book]` | https://biblemaximum.com/interlinear/genesis |
| `app/interlinear/[book]/[chapter]/page.tsx` | `/interlinear/[book]/[chapter]` | https://biblemaximum.com/interlinear/genesis/1 |
| `app/interlinear/[book]/[chapter]/[verse]/page.tsx` | `/interlinear/[book]/[chapter]/[verse]` | https://biblemaximum.com/interlinear/genesis/1/1 |
| `app/red-letter/page.tsx` | `/red-letter` | https://biblemaximum.com/red-letter |

Notes: `/lexicon/[strongs]` and `/lexicon/compare/[comparison]` confirmed against `data/lexicon.json` (13,633 entries — `H7225` and `G25` both present). `/lexicon/author/paul/greek` confirmed against `data/biblical-authors.json` (entry `{ name: "paul", language: "greek" }`). `/greek-word/g5-abba` and `/hebrew-word/h1-ab` confirmed against `data/strongs-greek-index.json` / `data/strongs-hebrew-index.json` `slugMap` keys. `/greek-grammar/perfect-active-indicative` confirmed as a hardcoded `slug` in `lib/grammar-data.ts`. `/lexicon/concept/love` confirmed in `data/lexicon-concepts.json`.

---

## Verses, Cross-References & Scripture Reading (18 templates)

| Template File | URL Pattern | Example Live URL |
|---|---|---|
| `app/verses/[book]/page.tsx` | `/verses/[book]` | https://biblemaximum.com/verses/genesis |
| `app/verses/[book]/[chapter]/page.tsx` | `/verses/[book]/[chapter]` | https://biblemaximum.com/verses/genesis/1 |
| `app/verses/[book]/[chapter]/[verse]/page.tsx` | `/verses/[book]/[chapter]/[verse]` | https://biblemaximum.com/verses/genesis/1/1 |
| `app/cross-references/page.tsx` | `/cross-references` | https://biblemaximum.com/cross-references |
| `app/cross-references/[book]/[chapter]/[verse]/page.tsx` | `/cross-references/[book]/[chapter]/[verse]` | https://biblemaximum.com/cross-references/john/3/16 |
| `app/bible-verses/page.tsx` | `/bible-verses` | https://biblemaximum.com/bible-verses |
| `app/bible-verse-of-the-day/page.tsx` | `/bible-verse-of-the-day` | https://biblemaximum.com/bible-verse-of-the-day |
| `app/random-bible-verse/page.tsx` | `/random-bible-verse` | https://biblemaximum.com/random-bible-verse |
| `app/popular-bible-verses/page.tsx` | `/popular-bible-verses` | https://biblemaximum.com/popular-bible-verses |
| `app/famous-bible-verses/page.tsx` | `/famous-bible-verses` | https://biblemaximum.com/famous-bible-verses |
| `app/short-bible-verses/page.tsx` | `/short-bible-verses` | https://biblemaximum.com/short-bible-verses |
| `app/inspirational-bible-verses/page.tsx` | `/inspirational-bible-verses` | https://biblemaximum.com/inspirational-bible-verses |
| `app/encouraging-bible-verses/page.tsx` | `/encouraging-bible-verses` | https://biblemaximum.com/encouraging-bible-verses |
| `app/christmas-bible-verses/page.tsx` | `/christmas-bible-verses` | https://biblemaximum.com/christmas-bible-verses |
| `app/bible-verses-about-anxiety/page.tsx` | `/bible-verses-about-anxiety` | https://biblemaximum.com/bible-verses-about-anxiety |
| `app/bible-verses-about-strength-in-hard-times/page.tsx` | `/bible-verses-about-strength-in-hard-times` | https://biblemaximum.com/bible-verses-about-strength-in-hard-times |
| `app/bible-verses-for-healing-and-strength/page.tsx` | `/bible-verses-for-healing-and-strength` | https://biblemaximum.com/bible-verses-for-healing-and-strength |
| `app/love-thy-neighbor-bible-verse/page.tsx` | `/love-thy-neighbor-bible-verse` | https://biblemaximum.com/love-thy-neighbor-bible-verse |

`/cross-references/john/3/16` was specifically chosen (rather than genesis/1/1) because `data/cross-references.json["john-3-16"]` contains a real, populated array of cross-reference entries (Romans 5:8, 1 John 4:9-10, etc.) — confirming the combination actually renders cross-reference content rather than an empty list.

---

## Standalone Famous-Verse Landing Pages (7 templates)

| Template File | URL Pattern | Example Live URL |
|---|---|---|
| `app/isaiah-41-10/page.tsx` | `/isaiah-41-10` | https://biblemaximum.com/isaiah-41-10 |
| `app/jeremiah-29-11/page.tsx` | `/jeremiah-29-11` | https://biblemaximum.com/jeremiah-29-11 |
| `app/john-3-16/page.tsx` | `/john-3-16` | https://biblemaximum.com/john-3-16 |
| `app/philippians-4-13/page.tsx` | `/philippians-4-13` | https://biblemaximum.com/philippians-4-13 |
| `app/proverbs-3-5-6/page.tsx` | `/proverbs-3-5-6` | https://biblemaximum.com/proverbs-3-5-6 |
| `app/psalm-23/page.tsx` | `/psalm-23` | https://biblemaximum.com/psalm-23 |
| `app/romans-8-28/page.tsx` | `/romans-8-28` | https://biblemaximum.com/romans-8-28 |

---

## Bible Places & Geography (11 templates)

| Template File | URL Pattern | Example Live URL |
|---|---|---|
| `app/bible-places/page.tsx` | `/bible-places` | https://biblemaximum.com/bible-places |
| `app/bible-places/[slug]/page.tsx` | `/bible-places/[slug]` | https://biblemaximum.com/bible-places/abana |
| `app/bible-places/[slug]/[verseRef]/page.tsx` | `/bible-places/[slug]/[verseRef]` | https://biblemaximum.com/bible-places/abana/2-kings-5-12 |
| `app/bible-places/era/page.tsx` | `/bible-places/era` | https://biblemaximum.com/bible-places/era |
| `app/bible-places/era/[era]/page.tsx` | `/bible-places/era/[era]` | https://biblemaximum.com/bible-places/era/primeval-history |
| `app/bible-places/near/[slug]/page.tsx` | `/bible-places/near/[slug]` | https://biblemaximum.com/bible-places/near/abana |
| `app/bible-places/type/[type]/page.tsx` | `/bible-places/type/[type]` | https://biblemaximum.com/bible-places/type/river |
| `app/bible-geography/page.tsx` | `/bible-geography` | https://biblemaximum.com/bible-geography |
| `app/bible-geography/[book]/page.tsx` | `/bible-geography/[book]` | https://biblemaximum.com/bible-geography/genesis |
| `app/bible-geography/[book]/[chapter]/page.tsx` | `/bible-geography/[book]/[chapter]` | https://biblemaximum.com/bible-geography/genesis/11 |
| `app/bible-maps/page.tsx` | `/bible-maps` | https://biblemaximum.com/bible-maps |

All geography examples verified against `data/geocoding/*.json`: `places-index.json` (slug `abana`), `nearby-places.json` (has an entry for `abana`), `places.json` (`abana`'s first verse is `2-kings-5-12`), `place-types.json` (key `river`), `places-by-chapter.json` (key `genesis-11`). `/bible-places/era/primeval-history` was derived from `data/kjvstudy/biblical_timeline.json`'s `"Primeval History (c. 4000 – c. 2100 BC)"` era (slugified by `lib/timeline-geography-bridge.ts`), and confirmed its events (Genesis 3, 4, 8, 11) resolve to real places via `places-by-chapter.json`.

---

## People & Characters (13 templates)

| Template File | URL Pattern | Example Live URL |
|---|---|---|
| `app/bible-characters/page.tsx` | `/bible-characters` | https://biblemaximum.com/bible-characters |
| `app/characters/page.tsx` | `/characters` | https://biblemaximum.com/characters |
| `app/characters/[slug]/page.tsx` | `/characters/[slug]` | https://biblemaximum.com/characters/david |
| `app/characters-by-topic/page.tsx` | `/characters-by-topic` | https://biblemaximum.com/characters-by-topic |
| `app/characters-by-topic/[topic]/page.tsx` | `/characters-by-topic/[topic]` | https://biblemaximum.com/characters-by-topic/bathsheba |
| `app/people/page.tsx` | `/people` | https://biblemaximum.com/people |
| `app/people/[slug]/page.tsx` | `/people/[slug]` | https://biblemaximum.com/people/adam |
| `app/bible-names/page.tsx` | `/bible-names` | https://biblemaximum.com/bible-names |
| `app/bible-names/[name]/page.tsx` | `/bible-names/[name]` | https://biblemaximum.com/bible-names/aaron |
| `app/family-tree/page.tsx` | `/family-tree` | https://biblemaximum.com/family-tree |
| `app/family-tree/[person]/page.tsx` | `/family-tree/[person]` | https://biblemaximum.com/family-tree/adam-1 |
| `app/jesus-christ/page.tsx` | `/jesus-christ` | https://biblemaximum.com/jesus-christ |
| `app/god/page.tsx` | `/god` | https://biblemaximum.com/god |

`/characters/david` confirmed in `data/characters.json`. `/characters-by-topic/bathsheba` was computed by reproducing the relevance-scoring logic in `lib/character-topic-bridge.ts` against `data/kjvstudy/biographies.json` + `data/topics.json` — the `bathsheba` topic matches David, Solomon, Bathsheba, Nathan and Adonijah (well above the 3-match threshold). `/people/adam` confirmed in `data/bible-data/BibleData-Person.csv`. `/bible-names/aaron` confirmed in `data/bible-data/HitchcocksBibleNamesDictionary.csv`. `/family-tree/adam-1` confirmed via `lib/family-tree.ts`'s `slugify()` — note the slug is `name + "-" + numericId` (from GEDCOM id `@I1@`), **not** plain `adam`.

---

## Commandments (6 templates)

| Template File | URL Pattern | Example Live URL |
|---|---|---|
| `app/commandments/page.tsx` | `/commandments` | https://biblemaximum.com/commandments |
| `app/commandments/[number]/page.tsx` | `/commandments/[number]` | https://biblemaximum.com/commandments/1 |
| `app/commandments/category/[slug]/page.tsx` | `/commandments/category/[slug]` | https://biblemaximum.com/commandments/category/sacrifices-and-offerings |
| `app/commandments/topic/page.tsx` | `/commandments/topic` | https://biblemaximum.com/commandments/topic |
| `app/commandments/topic/[topic]/page.tsx` | `/commandments/topic/[topic]` | https://biblemaximum.com/commandments/topic/idolatry |
| `app/ten-commandments/page.tsx` | `/ten-commandments` | https://biblemaximum.com/ten-commandments |

`sacrifices-and-offerings` confirmed as the largest category (96 entries) in `data/bible-data/BibleData-Commandments.csv` via `categorySlug()`. `/commandments/topic/idolatry` was computed by reproducing `lib/commandment-topic-bridge.ts`'s relevance scoring against `data/topics.json` + the commandments CSV — `idolatry` yields 25+ matching commandments, well above the 3-match threshold used by `generateStaticParams`/`notFound()`.

---

## Topics, Nave's Topical Bible & Encyclopedia (13 templates)

| Template File | URL Pattern | Example Live URL |
|---|---|---|
| `app/topics/page.tsx` | `/topics` | https://biblemaximum.com/topics |
| `app/topics/[slug]/page.tsx` | `/topics/[slug]` | https://biblemaximum.com/topics/10-commandments |
| `app/topics/[slug]/in/[book]/page.tsx` | `/topics/[slug]/in/[book]` | https://biblemaximum.com/topics/10-commandments/in/exodus |
| `app/nave-topics/page.tsx` | `/nave-topics` | https://biblemaximum.com/nave-topics |
| `app/nave-topics/[slug]/page.tsx` | `/nave-topics/[slug]` | https://biblemaximum.com/nave-topics/aaron |
| `app/nave-topics/[slug]/in/[book]/page.tsx` | `/nave-topics/[slug]/in/[book]` | https://biblemaximum.com/nave-topics/aaron/in/exodus |
| `app/bible-topics/page.tsx` | `/bible-topics` | https://biblemaximum.com/bible-topics |
| `app/bible-topics/[slug]/page.tsx` | `/bible-topics/[slug]` | https://biblemaximum.com/bible-topics/aaron |
| `app/bible-encyclopedia/page.tsx` | `/bible-encyclopedia` | https://biblemaximum.com/bible-encyclopedia |
| `app/bible-encyclopedia/[slug]/page.tsx` | `/bible-encyclopedia/[slug]` | https://biblemaximum.com/bible-encyclopedia/david |
| `app/what-does-the-bible-say-about/[topic]/page.tsx` | `/what-does-the-bible-say-about/[topic]` | https://biblemaximum.com/what-does-the-bible-say-about/love |
| `app/bible-quotes/page.tsx` | `/bible-quotes` | https://biblemaximum.com/bible-quotes |
| `app/bible-quotes/[slug]/page.tsx` | `/bible-quotes/[slug]` | https://biblemaximum.com/bible-quotes/god |

`10-commandments` confirmed in `data/topics.json` with `verseRefs` including `exodus-20-1`, so `/topics/10-commandments/in/exodus` is a real combination (verified against `lib/database/queries.ts`'s `resolveVerseRefs`, which derives the `book` field directly from the verse-ref prefix). `aaron` confirmed in `data/naves-topics.json`, used identically by `bible-topics/[slug]` and `nave-topics/[slug]`; `aaron`'s entries include many Exodus references, confirming `/nave-topics/aaron/in/exodus`. `bible-encyclopedia/[slug]` pulls from a merged slug space (Nave's + Hitchcock + `characters.json` + `topics.json`) — `david` (from `characters.json`) is a valid member. `bible-quotes`/`what-does-the-bible-say-about` share `lib/bible-quotes-data.ts` reading `data/bible-quotes.json`; both `god` and `love` are real topic slugs there.

---

## Devotionals, Study Guides, Reading Plans & Resources (17 templates)

| Template File | URL Pattern | Example Live URL |
|---|---|---|
| `app/devotionals/page.tsx` | `/devotionals` | https://biblemaximum.com/devotionals |
| `app/devotionals/[slug]/page.tsx` | `/devotionals/[slug]` | https://biblemaximum.com/devotionals/the-first-beginning |
| `app/bible-study-guides/page.tsx` | `/bible-study-guides` | https://biblemaximum.com/bible-study-guides |
| `app/bible-study-guides/[slug]/page.tsx` | `/bible-study-guides/[slug]` | https://biblemaximum.com/bible-study-guides/genesis |
| `app/reading-plans/page.tsx` | `/reading-plans` | https://biblemaximum.com/reading-plans |
| `app/reading-plans/[slug]/page.tsx` | `/reading-plans/[slug]` | https://biblemaximum.com/reading-plans/7-day-faith |
| `app/chain-study/page.tsx` | `/chain-study` | https://biblemaximum.com/chain-study |
| `app/chain-study/[slug]/page.tsx` | `/chain-study/[slug]` | https://biblemaximum.com/chain-study/abraham |
| `app/bible-stories/page.tsx` | `/bible-stories` | https://biblemaximum.com/bible-stories |
| `app/bible-stories/[slug]/page.tsx` | `/bible-stories/[slug]` | https://biblemaximum.com/bible-stories/god-creates-the-world |
| `app/timeline/page.tsx` | `/timeline` | https://biblemaximum.com/timeline |
| `app/timeline/[slug]/page.tsx` | `/timeline/[slug]` | https://biblemaximum.com/timeline/creation |
| `app/resources/page.tsx` | `/resources` | https://biblemaximum.com/resources |
| `app/resources/[slug]/page.tsx` | `/resources/[slug]` | https://biblemaximum.com/resources/names |
| `app/resources/[slug]/[item]/page.tsx` | `/resources/[slug]/[item]` | https://biblemaximum.com/resources/names/god-as-creator-and-judge |
| `app/short-prayers/page.tsx` | `/short-prayers` | https://biblemaximum.com/short-prayers |
| `app/prayer/page.tsx` | `/prayer` | https://biblemaximum.com/prayer |

`the-first-beginning` confirmed via `lib/devotionals-data.ts`'s slugify of the first entry's title in `data/kjvstudy/featured_verses.json`. `bible-study-guides/genesis` confirmed via the `slug` field directly in `data/bible-study-guides.json`. `reading-plans/7-day-faith` confirmed via the `slug` field in `data/study-plans.json`. `chain-study/abraham` was computed by reproducing `lib/chain-data.ts`'s book-count/testament-span filter (chains need 4+ books spanning both OT and NT) against `data/naves-topics.json` — `abraham` qualifies. `bible-stories/god-creates-the-world` confirmed via the `slug` field in `data/kjvstudy/stories/01_creation.json`. `timeline/creation` confirmed via `BibleData-Epoch.csv`'s `Creation` epoch (type `Unique`, included by `getAllEpochs()`). `resources/names` and the nested item slug were confirmed via `lib/resources-data.ts`'s `fileToSlug`/`titleToItemSlug` against `data/kjvstudy/resources/names.json` (entry titled "God as Creator and Judge").

---

## Utility & Static Pages (8 templates)

| Template File | URL Pattern | Example Live URL |
|---|---|---|
| `app/page.tsx` | `/` | https://biblemaximum.com/ |
| `app/about/page.tsx` | `/about` | https://biblemaximum.com/about |
| `app/contact/page.tsx` | `/contact` | https://biblemaximum.com/contact |
| `app/privacy-policy/page.tsx` | `/privacy-policy` | https://biblemaximum.com/privacy-policy |
| `app/terms-of-service/page.tsx` | `/terms-of-service` | https://biblemaximum.com/terms-of-service |
| `app/changelog/page.tsx` | `/changelog` | https://biblemaximum.com/changelog |
| `app/site-map/page.tsx` | `/site-map` | https://biblemaximum.com/site-map |
| `app/stats/page.tsx` | `/stats` | https://biblemaximum.com/stats |

---

### Totals

- 157 templates total
- 104 static routes (no `[param]` segments) — example URL = route path as-is
- 53 dynamic routes — every example above was verified against the real data source the page reads from (CSV/JSON files in `data/`, or the `lib/*.ts` loader function), not guessed
