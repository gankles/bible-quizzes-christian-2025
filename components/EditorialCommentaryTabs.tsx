'use client';

import { useState } from 'react';

interface CommentaryTab {
  id: string;
  label: string;
  shortLabel?: string;
  era?: string;
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
    <div className={`editorial-tabs ${className}`}>
      {/* Tab headers */}
      <div className="tab-header-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            <span className="hidden sm:block">{tab.label}</span>
            {tab.era && (
              <span className="tab-era">{tab.era}</span>
            )}
            <span className="sm:hidden">{tab.shortLabel ?? tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {active && (
        <div className="tab-pane-content">
          <p className="font-serif text-scripture leading-relaxed text-base whitespace-pre-wrap">
            {active.content}
          </p>
        </div>
      )}
    </div>
  );
}
