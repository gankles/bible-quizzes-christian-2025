'use client';

import { useState } from 'react';
import { getStrongsDefinition, BollsDictionaryEntry } from '@/lib/bolls-api';

interface StrongsLookupProps {
  initialQuery?: string;
}

export default function StrongsLookup({ initialQuery = '' }: StrongsLookupProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<BollsDictionaryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const data = await getStrongsDefinition(query.trim());
      setResults(data);
    } catch {
      setError('Failed to fetch definition. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Strong&apos;s Concordance Lookup
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Enter a Strong&apos;s number (H157, G25), Hebrew/Greek word, or English word
      </p>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., H157, G25, love, agape"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-4">
          {error}
        </div>
      )}

      {searched && !loading && results.length === 0 && !error && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
          No definitions found for &quot;{query}&quot;
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((entry, index) => (
            <div 
              key={`${entry.topic}-${index}`}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-200 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-sm font-mono rounded mr-2">
                    {entry.topic}
                  </span>
                  <span className="text-2xl">{entry.lexeme}</span>
                </div>
                {entry.weight > 0 && (
                  <span className="text-xs text-gray-400">
                    {Math.round(entry.weight * 100)}% match
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                <div>
                  <span className="font-medium">Transliteration:</span>{' '}
                  {entry.transliteration}
                </div>
                <div>
                  <span className="font-medium">Pronunciation:</span>{' '}
                  {entry.pronunciation}
                </div>
              </div>

              <div className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Short definition:</span>{' '}
                {entry.short_definition}
              </div>

              <details className="mt-2">
                <summary className="text-sm text-blue-600 cursor-pointer hover:underline">
                  Full definition
                </summary>
                <div 
                  className="mt-2 text-sm text-gray-700 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: entry.definition }}
                />
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
