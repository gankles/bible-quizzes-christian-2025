'use client';

import { useState, type ReactNode } from 'react';

interface ExpandableSectionProps {
  letter: string;
  totalCount: number;
  showingCount: number;
  hasEvenMore: boolean;
  children: ReactNode;
}

export default function ExpandableSection({
  letter,
  totalCount,
  showingCount,
  hasEvenMore,
  children,
}: ExpandableSectionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      {expanded && (
        <>
          {children}
          {hasEvenMore && (
            <p className="text-center text-xs text-primary-dark/50 mt-3">
              Showing {showingCount.toLocaleString()} of {totalCount.toLocaleString()} words.
              Browse individual word pages for the complete list.
            </p>
          )}
        </>
      )}
      <div className="mt-3 text-center">
        <button
          onClick={() => setExpanded(prev => !prev)}
          className="text-sm text-amber-700 hover:text-amber-900 font-medium hover:underline transition-colors"
        >
          {expanded
            ? 'Show fewer'
            : `Show more words starting with ${letter} (${totalCount.toLocaleString()} total)`}
        </button>
      </div>
    </div>
  );
}
