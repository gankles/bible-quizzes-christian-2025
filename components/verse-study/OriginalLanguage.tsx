'use client';

import { useState, useEffect } from 'react';
import { getStrongsDefinition, BollsDictionaryEntry } from '@/lib/bolls-api';

interface KeyWord {
  word: string;
  strongsNumber: string;
  type: 'hebrew' | 'greek';
}

interface OriginalLanguageProps {
  verseText: string;
  bookId: number;
}

const COMMON_WORDS: Record<string, KeyWord> = {
  'love': { word: 'love', strongsNumber: 'G25', type: 'greek' },
  'loved': { word: 'loved', strongsNumber: 'G25', type: 'greek' },
  'faith': { word: 'faith', strongsNumber: 'G4102', type: 'greek' },
  'believe': { word: 'believe', strongsNumber: 'G4100', type: 'greek' },
  'believed': { word: 'believed', strongsNumber: 'G4100', type: 'greek' },
  'believeth': { word: 'believeth', strongsNumber: 'G4100', type: 'greek' },
  'grace': { word: 'grace', strongsNumber: 'G5485', type: 'greek' },
  'peace': { word: 'peace', strongsNumber: 'G1515', type: 'greek' },
  'hope': { word: 'hope', strongsNumber: 'G1680', type: 'greek' },
  'joy': { word: 'joy', strongsNumber: 'G5479', type: 'greek' },
  'righteousness': { word: 'righteousness', strongsNumber: 'G1343', type: 'greek' },
  'salvation': { word: 'salvation', strongsNumber: 'G4991', type: 'greek' },
  'truth': { word: 'truth', strongsNumber: 'G225', type: 'greek' },
  'life': { word: 'life', strongsNumber: 'G2222', type: 'greek' },
  'eternal': { word: 'eternal', strongsNumber: 'G166', type: 'greek' },
  'everlasting': { word: 'everlasting', strongsNumber: 'G166', type: 'greek' },
  'world': { word: 'world', strongsNumber: 'G2889', type: 'greek' },
  'god': { word: 'God', strongsNumber: 'G2316', type: 'greek' },
  'lord': { word: 'Lord', strongsNumber: 'G2962', type: 'greek' },
  'spirit': { word: 'spirit', strongsNumber: 'G4151', type: 'greek' },
  'son': { word: 'Son', strongsNumber: 'G5207', type: 'greek' },
  'begotten': { word: 'begotten', strongsNumber: 'G3439', type: 'greek' },
  'perish': { word: 'perish', strongsNumber: 'G622', type: 'greek' },
  'gave': { word: 'gave', strongsNumber: 'G1325', type: 'greek' },
};

function extractKeyWords(text: string, bookId: number): KeyWord[] {
  const words = text.toLowerCase().split(/\s+/);
  const found: KeyWord[] = [];
  const seen = new Set<string>();
  
  for (const word of words) {
    const clean = word.replace(/[^a-z]/g, '');
    if (COMMON_WORDS[clean] && !seen.has(clean)) {
      seen.add(clean);
      const kw = { ...COMMON_WORDS[clean] };
      if (bookId <= 39) {
        kw.type = 'hebrew';
        kw.strongsNumber = kw.strongsNumber.replace('G', 'H');
      }
      found.push(kw);
    }
  }
  
  return found.slice(0, 4);
}

export default function OriginalLanguage({ verseText, bookId }: OriginalLanguageProps) {
  const [keyWords, setKeyWords] = useState<KeyWord[]>([]);
  const [definitions, setDefinitions] = useState<Record<string, BollsDictionaryEntry>>({});
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const words = extractKeyWords(verseText, bookId);
    setKeyWords(words);
  }, [verseText, bookId]);

  const loadDefinition = async (strongsNumber: string) => {
    if (definitions[strongsNumber]) {
      setExpanded(expanded === strongsNumber ? null : strongsNumber);
      return;
    }
    
    setLoading(true);
    try {
      const result = await getStrongsDefinition(strongsNumber);
      if (result.length > 0) {
        setDefinitions(prev => ({ ...prev, [strongsNumber]: result[0] }));
        setExpanded(strongsNumber);
      }
    } catch {
      console.error('Failed to load definition');
    } finally {
      setLoading(false);
    }
  };

  if (keyWords.length === 0) return null;

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Original Language Study
      </h3>
      
      <div className="space-y-3">
        {keyWords.map((kw) => {
          const def = definitions[kw.strongsNumber];
          const isExpanded = expanded === kw.strongsNumber;
          
          return (
            <div key={kw.strongsNumber} className="border-b border-gray-100 pb-3 last:border-0">
              <button
                onClick={() => loadDefinition(kw.strongsNumber)}
                className="w-full text-left flex items-center justify-between group"
                disabled={loading}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium text-gray-900 capitalize">
                    {kw.word}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    kw.type === 'hebrew' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {kw.type === 'hebrew' ? 'Hebrew' : 'Greek'} {kw.strongsNumber}
                  </span>
                </div>
                <span className="text-gray-400 group-hover:text-blue-600 transition-colors">
                  {isExpanded ? '−' : '+'}
                </span>
              </button>
              
              {isExpanded && def && (
                <div className="mt-3 pl-4 border-l-2 border-blue-200">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl">{def.lexeme}</span>
                    <span className="text-sm text-gray-500 italic">{def.transliteration}</span>
                    {def.pronunciation && (
                      <span className="text-xs text-gray-400">({def.pronunciation})</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Definition:</strong> {def.short_definition}
                  </p>
                  {def.definition && (
                    <details className="text-xs text-gray-600">
                      <summary className="cursor-pointer text-blue-600 hover:underline">
                        Full lexicon entry
                      </summary>
                      <div 
                        className="mt-2 prose prose-xs max-w-none"
                        dangerouslySetInnerHTML={{ __html: def.definition }}
                      />
                    </details>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
