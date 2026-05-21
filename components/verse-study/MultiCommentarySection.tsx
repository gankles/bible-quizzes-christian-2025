'use client';

import { useState, useRef, useEffect, useMemo } from 'react';

interface CommentaryEntry {
  text: string;
  source: string;
  author: string;
  historical?: string;
  questions?: string[];
}

interface MultiCommentarySectionProps {
  commentaries: CommentaryEntry[];
}

const COLLAPSE_HEIGHT = 280;

function parseCommentaryText(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

/** Short display name for tabs */
function getShortName(source: string): string {
  if (source.includes('Ellicott')) return 'Ellicott';
  if (source.includes('Jamieson') || source.includes('JFB')) return 'JFB';
  if (source.includes('Matthew Henry') || source.includes('MHCC')) return 'Matthew Henry';
  if (source.includes('KJV Study')) return 'KJV Study';
  return source.split(' ').slice(0, 2).join(' ');
}

/** Era label under the tab name */
function getEraLabel(source: string): string {
  if (source.includes('Ellicott')) return '1878';
  if (source.includes('Jamieson') || source.includes('JFB')) return '1871';
  if (source.includes('Matthew Henry') || source.includes('MHCC')) return '1706';
  if (source.includes('KJV Study')) return 'Modern';
  return '';
}

/** Author badge details per commentary source */
function getAuthorDetails(source: string): { initials: string; fullName: string; description: string } {
  if (source.includes('Matthew Henry') || source.includes('MHCC')) {
    return { initials: 'MH', fullName: 'Matthew Henry (1662–1714)', description: 'Reformed Scholar & Exegete' };
  }
  if (source.includes('Ellicott')) {
    return { initials: 'CE', fullName: 'Charles John Ellicott (1819–1905)', description: 'Bishop of Gloucester' };
  }
  if (source.includes('Jamieson') || source.includes('JFB')) {
    return { initials: 'JF', fullName: 'Jamieson, Fausset & Brown (1871)', description: 'Critical & Explanatory Commentary' };
  }
  const words = source.split(' ');
  return { initials: words.map(w => w[0]).join('').substring(0, 2).toUpperCase(), fullName: source, description: 'Biblical Commentary' };
}

function SingleCommentary({ entry }: { entry: CommentaryEntry }) {
  const [expanded, setExpanded] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const parsedText = useMemo(() => parseCommentaryText(entry.text), [entry.text]);

  useEffect(() => {
    if (contentRef.current) {
      setNeedsTruncation(contentRef.current.scrollHeight > COLLAPSE_HEIGHT + 60);
    }
  }, [parsedText]);

  return (
    <div>
      <div className="relative">
        <div
          ref={contentRef}
          className="text-[15px] text-scripture leading-[1.8] whitespace-pre-line overflow-hidden transition-[max-height] duration-300"
          style={{ maxHeight: expanded || !needsTruncation ? 'none' : `${COLLAPSE_HEIGHT}px` }}
          dangerouslySetInnerHTML={{ __html: parsedText }}
        />
        {needsTruncation && !expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      {needsTruncation && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-sm text-sacred hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sacred focus-visible:ring-offset-2 rounded"
        >
          {expanded ? 'Show less' : 'Read full commentary'}
        </button>
      )}

      <p className="text-xs text-ink-light mt-3">
        {entry.author} &mdash; Public Domain
      </p>

      {entry.historical && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-scripture mb-3">Historical &amp; Cultural Context</h3>
          <div
            className="text-[15px] text-scripture leading-[1.8] prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: entry.historical }}
          />
        </div>
      )}

      {entry.questions && entry.questions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-scripture mb-3">Reflection Questions</h3>
          <ol className="list-decimal list-inside space-y-2 text-[15px] text-scripture leading-[1.8]">
            {entry.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default function MultiCommentarySection({ commentaries }: MultiCommentarySectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (commentaries.length === 0) return null;

  // Single commentary — simple display without tabs
  if (commentaries.length === 1) {
    const c = commentaries[0];
    const { initials, fullName, description } = getAuthorDetails(c.source);
    return (
      <section className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-semibold text-scripture">Commentary</h2>
          <span className="text-xs text-ink-light">{c.source}</span>
        </div>
        <SingleCommentary entry={c} />
        <div className="author-badge">
          <div className="author-avatar">{initials}</div>
          <div>Written by <strong>{fullName}</strong> &bull; {description}</div>
        </div>
        <hr className="border-grace mt-8" />
      </section>
    );
  }

  // Multiple commentaries — tabbed interface
  const active = commentaries[activeIdx];
  const activeAuthor = getAuthorDetails(active.source);

  return (
    <section className="mb-8">
      <div className="editorial-tabs">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-semibold text-scripture">
            Commentaries
            <span className="text-sm font-normal text-ink-light ml-2">
              {commentaries.length} scholars
            </span>
          </h2>
        </div>

        {/* Tab Selector */}
        <div className="tab-header-list">
          {commentaries.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`tab-btn ${i === activeIdx ? 'active' : ''}`}
            >
              <span className="block">{getShortName(c.source)}</span>
              {getEraLabel(c.source) && (
                <span className="tab-era">{getEraLabel(c.source)}</span>
              )}
            </button>
          ))}
        </div>

        {/* Active Commentary */}
        <div className="tab-pane-content">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold text-scripture">{active.source}</span>
            <span className="text-[10px] bg-grace/60 text-ink-muted px-2 py-0.5 rounded-full uppercase tracking-wider">
              Public Domain
            </span>
          </div>
          <SingleCommentary key={activeIdx} entry={active} />
          <div className="author-badge">
            <div className="author-avatar">{activeAuthor.initials}</div>
            <div>Written by <strong>{activeAuthor.fullName}</strong> &bull; {activeAuthor.description}</div>
          </div>
        </div>

        {/* Compare hint */}
        <p className="text-xs text-ink-light mt-3 text-center">
          Compare {commentaries.length} commentaries from different scholars and time periods for a richer understanding.
        </p>
      </div>

      <hr className="border-grace mt-8" />
    </section>
  );
}
