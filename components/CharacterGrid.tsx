'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface Character {
    id: string;
    name: string;
    slug: string;
    testament: string;
    occupation?: string;
}

interface CharacterGridProps {
    initialCharacters: Character[];
}

export const CharacterGrid: React.FC<CharacterGridProps> = ({ initialCharacters }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [testamentFilter, setTestamentFilter] = useState<'all' | 'Old' | 'New'>('all');

    const filteredCharacters = useMemo(() => {
        const q = searchQuery.toLowerCase();
        return initialCharacters
            .filter(char => {
                const matchesSearch = !q || char.name.toLowerCase().includes(q);
                const matchesTestament = testamentFilter === 'all' || char.testament === testamentFilter;
                return matchesSearch && matchesTestament;
            })
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [initialCharacters, searchQuery, testamentFilter]);

    return (
        <div className="space-y-12">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between max-w-4xl mx-auto mb-16">
                <div className="relative flex-1 w-full">
                    <input
                        type="text"
                        placeholder="Search biblical figures (e.g. David, Paul, Esther)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-6 py-4 rounded-lg border-2 border-grace dark:border-dark-border bg-white dark:bg-dark-surface text-scripture dark:text-white focus:outline-none focus:border-sacred transition-colors shadow-sm"
                    />
                </div>
                <div className="flex p-1 bg-grace/30 dark:bg-dark-surface rounded-xl border border-grace dark:border-dark-border">
                    <button
                        onClick={() => setTestamentFilter('all')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${testamentFilter === 'all' ? 'bg-white dark:blue-600 text-blue-600 dark:text-white shadow-sm' : 'text-primary-dark/60 dark:text-gray-400'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setTestamentFilter('Old')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${testamentFilter === 'Old' ? 'bg-white dark:blue-600 text-blue-600 dark:text-white shadow-sm' : 'text-primary-dark/60 dark:text-gray-400'}`}
                    >
                        Old Testament
                    </button>
                    <button
                        onClick={() => setTestamentFilter('New')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${testamentFilter === 'New' ? 'bg-white dark:blue-600 text-blue-600 dark:text-white shadow-sm' : 'text-primary-dark/60 dark:text-gray-400'}`}
                    >
                        New Testament
                    </button>
                </div>
            </div>

            {/* Grid */}
            {filteredCharacters.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCharacters.map((char) => (
                        <Link
                            key={char.id}
                            href={`/characters/${char.slug}`}
                            className="group bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border p-6 hover:border-sacred hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full blue-600/10 flex items-center justify-center text-blue-600 text-xl font-bold">
                                    {char.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-scripture dark:text-white group-hover:text-blue-600 transition-colors">
                                        {char.name}
                                    </h3>
                                    <div className="text-xs font-bold text-primary-dark/40 dark:text-gray-500 uppercase">
                                        {char.testament} Testament • {char.occupation || 'Biblical Figure'}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <h3 className="text-2xl font-bold text-scripture dark:text-white mb-2">No people found</h3>
                    <p className="text-primary-dark/60 dark:text-gray-500">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
};
