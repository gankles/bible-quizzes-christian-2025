'use client';

import { useState, useRef, useEffect, useMemo } from 'react';

interface CommentarySectionProps {
  text: string;
  source: string;
  author: string;
  historical?: string;
  questions?: string[];
}

const COLLAPSE_HEIGHT = 240;

function parseCommentaryText(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

export default function CommentarySection({ text, source, author, historical, questions }: CommentarySectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const parsedText = useMemo(() => parseCommentaryText(text), [text]);

  useEffect(() => {
    if (contentRef.current) {
      setNeedsTruncation(contentRef.current.scrollHeight > COLLAPSE_HEIGHT + 60);
    }
  }, [parsedText]);

  return (
    <section className="mb-8">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-xl font-semibold text-scripture">Commentary</h2>
        <span className="text-xs text-primary-dark/40">{source}</span>
      </div>

      <div className="relative">
        <div
          ref={contentRef}
          className="text-[15px] text-primary-dark/80 leading-[1.8] whitespace-pre-line overflow-hidden transition-[max-height] duration-300"
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
          className="mt-3 text-sm text-blue-600 hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
        >
          {expanded ? 'Show less' : 'Read full commentary'}
        </button>
      )}

      <p className="text-xs text-primary-dark/40 mt-3">
        {author} &mdash; Public Domain
      </p>

      {historical && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-scripture mb-3">Historical &amp; Cultural Context</h3>
          <div
            className="text-[15px] text-primary-dark/80 leading-[1.8] prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: historical }}
          />
        </div>
      )}

      {questions && questions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-scripture mb-3">Reflection Questions</h3>
          <ol className="list-decimal list-inside space-y-2 text-[15px] text-primary-dark/80 leading-[1.8]">
            {questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ol>
        </div>
      )}

      <hr className="border-grace mt-8" />
    </section>
  );
}
