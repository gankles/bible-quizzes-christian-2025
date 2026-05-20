'use client';

import { useState } from 'react';

interface CommentaryTab {
  id: string;
  label: string;
  shortLabel?: string;
  content: string;
}

interface EditorialCommentaryTabsProps {
  tabs: CommentaryTab[];
  className?: string;
}

export default function EditorialCommentaryTabs({ tabs, className = '' }: EditorialCommentaryTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? '');

  const active = tabs.find(t => t.id === activeTab);

  return (
    <div className={`bg-white border border-sacred/20 rounded-lg overflow-hidden shadow-sm ${className}`}>
      {/* Tab headers */}
      <div className="flex border-b border-sacred/20 bg-primary-light/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-semibold transition-all duration-150 border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-sacred text-scripture bg-white'
                : 'border-transparent text-ink-muted hover:text-scripture hover:border-sacred/40'
            }`}
          >
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.shortLabel ?? tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {active && (
        <div className="p-5">
          <p className="font-serif text-scripture leading-relaxed text-base whitespace-pre-wrap">
            {active.content}
          </p>
        </div>
      )}
    </div>
  );
}
