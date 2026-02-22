'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from './icons';

export default function LexiconSearch() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) return;

        // If input matches Strong's pattern (G/H + digits), go to word page
        if (/^[GHgh]\d+$/i.test(trimmed)) {
            router.push(`/lexicon/${trimmed.toUpperCase()}`);
        } else {
            // Text search — go to Greek browse with query
            router.push(`/lexicon/browse/greek?q=${encodeURIComponent(trimmed)}`);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mb-16">
            <form onSubmit={handleSearch} className="bg-white p-2 rounded-xl border border-grace shadow-sm focus-within:ring-2 ring-blue-600/20 focus-within:border-blue-300 transition-all">
                <div className="flex items-center">
                    <div className="pl-5 text-primary-dark/40">
                        <SearchIcon className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter Strong's Number (G25, H7965) or Word..."
                        className="w-full py-4 px-4 text-scripture focus:outline-none text-lg bg-transparent placeholder:text-primary-dark/40"
                    />
                    <button
                        type="submit"
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-blue-700 transition-colors mr-1"
                    >
                        Search
                    </button>
                </div>
            </form>
            <div className="mt-4 flex items-center justify-center space-x-6 flex-wrap gap-y-2">
                <span className="text-sm text-primary-dark/40">Quick links:</span>
                <a href="/lexicon/G25" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">G25 (Agape)</a>
                <a href="/lexicon/H7965" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">H7965 (Shalom)</a>
                <a href="/lexicon/G5485" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">G5485 (Charis)</a>
            </div>
        </div>
    );
}
