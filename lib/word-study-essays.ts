import fs from 'fs';
import path from 'path';

export interface WordStudyUseCategory {
  category: string;
  explanation: string;
  verses: { ref: string; text: string }[];
}

export interface WordStudyEssay {
  strongs: string;
  word: string;
  transliteration: string;
  language: string;
  shortMeaning: string;
  definitionAndDerivation: {
    rootWords: string;
    literalMeaning: string;
    kjvTranslationSummary: string;
  };
  biblicalAndFigurativeUses: WordStudyUseCategory[];
  closingReflection: string;
  generatedAt: string;
}

const cache = new Map<string, WordStudyEssay | null>();

/** AI-generated deep word-study essay for a Strong's number, if one has been generated. */
export function getWordStudyEssay(strongsId: string): WordStudyEssay | null {
  const id = strongsId.toUpperCase();
  if (cache.has(id)) return cache.get(id)!;

  try {
    const filePath = path.join(process.cwd(), 'data', 'word-study-essays', `${id}.json`);
    const essay = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    cache.set(id, essay);
    return essay;
  } catch {
    cache.set(id, null);
    return null;
  }
}
