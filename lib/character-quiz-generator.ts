import { getAllBiographies, getBiography, Biography } from './biographies-data';

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-in-blank';
  options: string[];
  correctAnswer: string;
  explanation: string;
  verseReference: string;
  difficulty: string;
}

// Deterministic seeded random for consistent quiz generation
function seededRandom(seed: number, i: number): number {
  const x = Math.sin(seed + i * 9301 + 49297) * 10000;
  return x - Math.floor(x);
}

function seedFromName(name: string): number {
  return name.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
}

export function getCharacterQuizSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getAllCharacterQuizSlugs(): string[] {
  return getAllBiographies().map(b => getCharacterQuizSlug(b.name));
}

export function getCharacterNameFromSlug(slug: string): string | null {
  const bio = getAllBiographies().find(b => getCharacterQuizSlug(b.name) === slug);
  return bio ? bio.name : null;
}

function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed, i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function extractBookFromVerse(verse: string): string {
  // "Genesis 2:7" → "Genesis"
  const match = verse.match(/^(.+?)\s+\d/);
  return match ? match[1] : '';
}

export function generateCharacterQuiz(name: string): QuizQuestion[] | null {
  const bio = getBiography(name);
  if (!bio) return null;

  const allBios = getAllBiographies();
  const otherCharacters = allBios.filter(b => b.name !== name);
  const seed = seedFromName(name);
  const questions: QuizQuestion[] = [];
  let qId = 0;

  // === Multiple Choice Questions (target: ~10-11 = 70%) ===

  // Q1: Significance question
  if (bio.significance) {
    const wrongAnswers = shuffleWithSeed(otherCharacters, seed + 1)
      .slice(0, 3)
      .map(b => b.significance.length > 120 ? b.significance.slice(0, 120) + '...' : b.significance);
    const correct = bio.significance.length > 120 ? bio.significance.slice(0, 120) + '...' : bio.significance;
    const options = shuffleWithSeed([correct, ...wrongAnswers], seed + 2);
    questions.push({
      id: `char-${getCharacterQuizSlug(name)}-${++qId}`,
      question: `What is the primary biblical significance of ${name}?`,
      type: 'multiple-choice',
      options,
      correctAnswer: correct,
      explanation: bio.significance,
      verseReference: bio.keyEvents[0]?.verse || '',
      difficulty: 'medium',
    });
  }

  // Q2-Q5: Key events questions
  for (let i = 0; i < Math.min(4, bio.keyEvents.length); i++) {
    const event = bio.keyEvents[i];
    const wrongEvents = shuffleWithSeed(
      otherCharacters.flatMap(b => b.keyEvents).filter(e => e.event !== event.event),
      seed + 10 + i
    ).slice(0, 3).map(e => e.event);
    if (wrongEvents.length < 3) continue;

    const options = shuffleWithSeed([event.event, ...wrongEvents], seed + 20 + i);
    questions.push({
      id: `char-${getCharacterQuizSlug(name)}-${++qId}`,
      question: `Which of the following is a key event in the life of ${name}?`,
      type: 'multiple-choice',
      options,
      correctAnswer: event.event,
      explanation: `${event.event} is recorded in ${event.verse}.`,
      verseReference: event.verse,
      difficulty: 'easy',
    });
  }

  // Q6: "In which book does [event] occur?"
  if (bio.keyEvents.length > 0) {
    const event = bio.keyEvents[0];
    const correctBook = extractBookFromVerse(event.verse);
    if (correctBook) {
      const allBooks = ['Genesis', 'Exodus', 'Numbers', 'Judges', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings',
        'Isaiah', 'Jeremiah', 'Daniel', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans'];
      const wrongs = shuffleWithSeed(allBooks.filter(b => b !== correctBook), seed + 30).slice(0, 3);
      if (wrongs.length >= 3) {
        const options = shuffleWithSeed([correctBook, ...wrongs], seed + 31);
        questions.push({
          id: `char-${getCharacterQuizSlug(name)}-${++qId}`,
          question: `In which book of the Bible is "${event.event}" recorded for ${name}?`,
          type: 'multiple-choice',
          options,
          correctAnswer: correctBook,
          explanation: `This event is found in ${event.verse}.`,
          verseReference: event.verse,
          difficulty: 'medium',
        });
      }
    }
  }

  // Q7: "Which verse references [event]?"
  for (let i = 0; i < Math.min(2, bio.keyEvents.length); i++) {
    const event = bio.keyEvents[i];
    const wrongVerses = shuffleWithSeed(
      bio.keyEvents.filter((_, idx) => idx !== i).map(e => e.verse),
      seed + 40 + i
    ).slice(0, 2);
    // Add a verse from another character
    if (otherCharacters.length > 0) {
      const otherEvent = otherCharacters[Math.floor(seededRandom(seed + 50, i) * otherCharacters.length)].keyEvents[0];
      if (otherEvent) wrongVerses.push(otherEvent.verse);
    }
    if (wrongVerses.length < 3) continue;

    const options = shuffleWithSeed([event.verse, ...wrongVerses.slice(0, 3)], seed + 60 + i);
    questions.push({
      id: `char-${getCharacterQuizSlug(name)}-${++qId}`,
      question: `Which Scripture reference records the event: "${event.event}" in the life of ${name}?`,
      type: 'multiple-choice',
      options,
      correctAnswer: event.verse,
      explanation: `${event.event} is found in ${event.verse}.`,
      verseReference: event.verse,
      difficulty: 'hard',
    });
  }

  // Q8: Summary identification
  if (bio.summary) {
    const wrongSummaries = shuffleWithSeed(otherCharacters, seed + 70)
      .slice(0, 3)
      .map(b => b.name);
    const options = shuffleWithSeed([name, ...wrongSummaries], seed + 71);
    const snippet = bio.summary.length > 100 ? bio.summary.slice(0, 100) + '...' : bio.summary;
    questions.push({
      id: `char-${getCharacterQuizSlug(name)}-${++qId}`,
      question: `Which Bible character does this description refer to: "${snippet}"?`,
      type: 'multiple-choice',
      options,
      correctAnswer: name,
      explanation: bio.summary,
      verseReference: bio.keyEvents[0]?.verse || '',
      difficulty: 'medium',
    });
  }

  // === True/False Questions (target: ~3 = 20%) ===

  // TF1: Key event true
  if (bio.keyEvents.length > 1) {
    const event = bio.keyEvents[Math.floor(seededRandom(seed + 80, 0) * bio.keyEvents.length)];
    questions.push({
      id: `char-${getCharacterQuizSlug(name)}-${++qId}`,
      question: `True or False: ${name} is recorded in Scripture as having "${event.event.toLowerCase()}."`,
      type: 'true-false',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: `This is recorded in ${event.verse}.`,
      verseReference: event.verse,
      difficulty: 'easy',
    });
  }

  // TF2: False event from another character
  if (otherCharacters.length > 0) {
    const otherIdx = Math.floor(seededRandom(seed + 90, 0) * otherCharacters.length);
    const other = otherCharacters[otherIdx];
    if (other.keyEvents.length > 0) {
      const falseEvent = other.keyEvents[0];
      questions.push({
        id: `char-${getCharacterQuizSlug(name)}-${++qId}`,
        question: `True or False: ${name} is known for "${falseEvent.event.toLowerCase()}."`,
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: `This event is actually associated with ${other.name}, not ${name}. See ${falseEvent.verse}.`,
        verseReference: falseEvent.verse,
        difficulty: 'easy',
      });
    }
  }

  // TF3: About their significance
  if (bio.significance) {
    questions.push({
      id: `char-${getCharacterQuizSlug(name)}-${++qId}`,
      question: `True or False: ${name}'s biblical significance includes representing ${bio.significance.split('.')[0].toLowerCase().replace(/^.*?(the |a |an )/i, '$1').trim()}.`,
      type: 'true-false',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: bio.significance,
      verseReference: bio.keyEvents[0]?.verse || '',
      difficulty: 'medium',
    });
  }

  // === Fill-in-the-Blank Questions (target: ~1-2 = 10%) ===

  // FB1: Verse reference fill
  if (bio.keyEvents.length > 0) {
    const event = bio.keyEvents[0];
    const book = extractBookFromVerse(event.verse);
    if (book) {
      questions.push({
        id: `char-${getCharacterQuizSlug(name)}-${++qId}`,
        question: `Complete: ${name}'s story of "${event.event.toLowerCase()}" is first recorded in the book of ______.`,
        type: 'fill-in-blank',
        options: [],
        correctAnswer: book,
        explanation: `${event.event} is recorded in ${event.verse}.`,
        verseReference: event.verse,
        difficulty: 'medium',
      });
    }
  }

  // FB2: Name from description
  if (bio.summary) {
    const firstSentence = bio.summary.split('.')[0];
    questions.push({
      id: `char-${getCharacterQuizSlug(name)}-${++qId}`,
      question: `Fill in the blank: ______ is described as: "${firstSentence}."`,
      type: 'fill-in-blank',
      options: [],
      correctAnswer: name,
      explanation: bio.summary,
      verseReference: bio.keyEvents[0]?.verse || '',
      difficulty: 'hard',
    });
  }

  // Return exactly 15 questions (or as many as generated)
  return questions.slice(0, 15);
}
