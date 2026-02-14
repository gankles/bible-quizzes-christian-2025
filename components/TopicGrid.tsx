'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface Topic {
    id: string;
    name: string;
    slug: string;
    category: string;
    verseCount: number;
}

interface TopicGridProps {
    initialGroups: Record<string, Topic[]>;
}

export const TopicGrid: React.FC<TopicGridProps> = ({ initialGroups }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredGroups = useMemo(() => {
        const q = searchQuery.toLowerCase();
        return Object.entries(initialGroups).reduce((acc, [category, topics]) => {
            const filtered = !q
                ? topics
                : topics.filter(topic => topic.name.toLowerCase().includes(q));
            if (filtered.length > 0) {
                acc[category] = filtered;
            }
            return acc;
        }, {} as Record<string, Topic[]>);
    }, [initialGroups, searchQuery]);

    return (
        <div className="space-y-10">
            <div className="relative max-w-xl mx-auto mb-8">
                <input
                    type="text"
                    placeholder="Search topics (e.g. Love, Grace, Prayer)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-5 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-400"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {Object.entries(filteredGroups).length > 0 ? (
                Object.entries(filteredGroups).sort(([a], [b]) => a.localeCompare(b)).map(([category, topics]) => (
                    <section key={category}>
                        <div className="flex items-center gap-4 mb-4">
                            <h3 className="text-lg font-bold text-gray-900">
                                {category}
                            </h3>
                            <div className="h-px bg-gray-200 flex-1"></div>
                            <span className="text-xs text-gray-500">
                                {topics.length} topics
                            </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {topics.sort((a, b) => a.name.localeCompare(b.name)).map((topic) => (
                                <Link
                                    key={topic.id}
                                    href={`/topics/${topic.slug}`}
                                    className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                                >
                                    <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {topic.name}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {topic.verseCount} verses
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))
            ) : (
                <div className="text-center py-16">
                    <p className="text-gray-500 text-lg">No topics found for &ldquo;{searchQuery}&rdquo;</p>
                    <p className="text-gray-400 text-sm mt-2">Try a different search term.</p>
                </div>
            )}
        </div>
    );
};
