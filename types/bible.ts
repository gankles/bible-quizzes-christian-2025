// Core Bible Data Types

export type Testament = "Old" | "New";
export type Translation = "KJV" | "NIV" | "ESV" | "NLT" | "NASB" | "MSG" | "AMP";
export type TopicCategory = "Theology" | "Emotions" | "Life Situations" | "Character Traits" | "Relationships" | "Spiritual Warfare";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type AgeGroup = "Children" | "Teens" | "Adults" | "Seniors";

// Verse Interface
export interface Verse {
    id: string;
    book: string;
    bookSlug: string;
    chapter: number;
    verse: number;
    text: string;
    translation: Translation;
    tags: string[];
    topics: string[];
    crossReferences: string[];
    strongsNumbers?: string[];
    testament: Testament;
}

// Chapter Interface
export interface Chapter {
    id: string;
    book: string;
    bookSlug: string;
    chapter: number;
    verses: Verse[];
    verseCount: number;
    summary: string;
    keyThemes: string[];
    relatedChapters: string[];
    testament: Testament;
}

// Book Interface
export interface Book {
    id: string;
    name: string;
    slug: string;
    testament: Testament;
    author: string;
    dateWritten: string;
    chapters: number;
    verses: number;
    summary: string;
    keyThemes: string[];
    outline: BookOutline[];
    genre: string;
}

export interface BookOutline {
    section: string;
    chapters: string;
    description: string;
}

// Topic Interface
export interface Topic {
    id: string;
    name: string;
    slug: string;
    description: string;
    verses: string[];
    verseCount: number;
    relatedTopics: string[];
    subtopics: string[];
    category: TopicCategory;
    testament?: Testament;
}

// Character Interface
export interface Character {
    id: string;
    name: string;
    slug: string;
    biography: string;
    verses: string[];
    timeline: TimelineEvent[];
    relationships: Relationship[];
    keyEvents: string[];
    lessons: string[];
    testament: Testament;
    occupation?: string;
    lifespan?: string;
}

export interface TimelineEvent {
    event: string;
    date: string;
    verses: string[];
    significance: string;
}

export interface Relationship {
    person: string;
    relationship: string;
    description: string;
}

// Devotional Interface
export interface Devotional {
    id: string;
    date: string;
    title: string;
    verse: string;
    verseText: string;
    reflection: string;
    prayer: string;
    applicationQuestions: string[];
    tags: string[];
    author?: string;
}

// Study Plan Interface
export interface StudyPlan {
    id: string;
    title: string;
    slug: string;
    topic: string;
    duration: number; // in days
    description: string;
    dailyReadings: DailyReading[];
    difficulty: Difficulty;
    targetAudience: AgeGroup[];
    tags: string[];
}

export interface DailyReading {
    day: number;
    title: string;
    passages: string[];
    studyQuestions: string[];
    commentary: string;
    keyVerses: string[];
}

// Cross-Reference Interface
export interface CrossReference {
    primaryVerse: string;
    relatedVerses: RelatedVerse[];
    thematicGroups: ThematicGroup[];
    commentary: string;
}

export interface RelatedVerse {
    verse: string;
    verseText: string;
    relationship: string; // "parallel", "fulfillment", "contrast", etc.
    strength: number; // 1-10
}

export interface ThematicGroup {
    theme: string;
    verses: string[];
}

// Word Study Interface
export interface WordStudy {
    id: string;
    word: string;
    slug: string;
    language: "Hebrew" | "Greek" | "Aramaic";
    strongsNumber: string;
    transliteration: string;
    pronunciation: string;
    definition: string;
    occurrences: number;
    verses: string[];
    relatedWords: string[];
    theologicalSignificance: string;
}

// Question & Answer Interface
export interface Question {
    id: string;
    question: string;
    slug: string;
    category: string;
    answer: string;
    verses: string[];
    perspectives: Perspective[];
    relatedQuestions: string[];
    tags: string[];
}

export interface Perspective {
    viewpoint: string;
    description: string;
    supportingVerses: string[];
}

// Prayer Interface
export interface Prayer {
    id: string;
    topic: string;
    slug: string;
    samplePrayers: string[];
    verses: string[];
    guide: string;
    biblicalExamples: string[];
    tags: string[];
}

// Sermon Illustration Interface
export interface SermonIllustration {
    id: string;
    topic: string;
    slug: string;
    title: string;
    illustration: string;
    verses: string[];
    modernApplications: string[];
    quotes: string[];
    tags: string[];
}

// Memory Verse Interface
export interface MemoryVerse {
    id: string;
    verse: string;
    verseText: string;
    topic: string;
    difficulty: Difficulty;
    memoryTips: string[];
    relatedVerses: string[];
    tags: string[];
}

// Location/Geography Interface
export interface Location {
    id: string;
    name: string;
    slug: string;
    biblicalSignificance: string;
    verses: string[];
    timeline: TimelineEvent[];
    modernLocation: string;
    archaeologicalFindings: string[];
    relatedLocations: string[];
    mapCoordinates?: {
        lat: number;
        lng: number;
    };
}

// Prophecy Interface
export interface Prophecy {
    id: string;
    title: string;
    slug: string;
    prophecyVerses: string[];
    fulfillmentVerses: string[];
    timeBetween: string;
    significance: string;
    multipleFulfillments?: string[];
    futureFulfillments?: string[];
    commentary: string;
}

// Parable Interface
export interface Parable {
    id: string;
    title: string;
    slug: string;
    verses: string[];
    context: string;
    meaning: string;
    application: string;
    relatedParables: string[];
    discussionQuestions: string[];
}

// Miracle Interface
export interface Miracle {
    id: string;
    title: string;
    slug: string;
    verses: string[];
    context: string;
    significance: string;
    lessons: string[];
    relatedMiracles: string[];
    discussionQuestions: string[];
}

// Theological Concept Interface
export interface TheologicalConcept {
    id: string;
    concept: string;
    slug: string;
    definition: string;
    verses: string[];
    historicalDevelopment: string;
    perspectives: Perspective[];
    practicalImplications: string[];
    misconceptions: string[];
    resources: string[];
}

// User Testimony Interface
export interface Testimony {
    id: string;
    username: string;
    slug: string;
    topic: string;
    story: string;
    verses: string[];
    lessonsLearned: string[];
    relatedTestimonies: string[];
    tags: string[];
    dateSubmitted: string;
    approved: boolean;
}

// Reading Challenge Interface
export interface ReadingChallenge {
    id: string;
    title: string;
    slug: string;
    description: string;
    duration: number; // in days
    dailyReadings: string[];
    milestones: Milestone[];
    tags: string[];
}

export interface Milestone {
    day: number;
    achievement: string;
    badge?: string;
}

// SEO Metadata Interface
export interface SEOMetadata {
    title: string;
    description: string;
    keywords: string[];
    canonicalUrl: string;
    ogImage?: string;
    structuredData: any; // JSON-LD structured data
}

// Page Interface (Generic)
export interface BiblePage {
    id: string;
    type: PageType;
    slug: string;
    title: string;
    content: string;
    tags: string[];
    topics: string[];
    relatedPages: string[];
    seo: SEOMetadata;
    createdAt: string;
    updatedAt: string;
}

export type PageType =
    | "verse"
    | "chapter"
    | "book"
    | "topic"
    | "character"
    | "devotional"
    | "study-plan"
    | "cross-reference"
    | "word-study"
    | "question"
    | "prayer"
    | "sermon-illustration"
    | "memory-verse"
    | "location"
    | "prophecy"
    | "parable"
    | "miracle"
    | "theological-concept"
    | "testimony"
    | "reading-challenge"
    | "verse-combination";
