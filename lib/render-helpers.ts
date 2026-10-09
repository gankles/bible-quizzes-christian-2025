import React from 'react';
import Link from 'next/link';
import { BIBLE_BOOKS } from './bible-data';

/**
 * Splits text on **bold** markdown patterns and returns React elements.
 * No full markdown library needed — just handles bold text.
 */
export function renderWithBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return React.createElement('strong', { key: i }, part.slice(2, -2));
    }
    return React.createElement('span', { key: i }, part);
  });
}

// Longest book names first so "Song of Solomon" matches before a shorter partial would.
const BOOKS_BY_NAME_LENGTH = [...BIBLE_BOOKS].sort((a, b) => b.name.length - a.name.length);
const BOOK_SLUG_BY_NAME = new Map(BIBLE_BOOKS.map(b => [b.name, b.slug]));
const BOOK_NAMES_PATTERN = BOOKS_BY_NAME_LENGTH.map(b => b.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');

// Matches citations like "Genesis 1:1", "Romans 5:12-21", "1 Corinthians 1:20", "Genesis 1:1-2:3", or "Genesis 1".
const VERSE_PATTERN_SOURCE = `\\b(${BOOK_NAMES_PATTERN})\\s+(\\d{1,3})(?::(\\d{1,3})(?:-(?:\\d{1,3}:)?\\d{1,3})?)?\\b`;

function linkifyVerses(text: string, keyPrefix: string): React.ReactNode[] {
  const regex = new RegExp(VERSE_PATTERN_SOURCE, 'g');
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = regex.exec(text)) !== null) {
    const [full, bookName, chapter, verseStart] = match;
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const slug = BOOK_SLUG_BY_NAME.get(bookName);
    if (slug) {
      const href = verseStart
        ? `/verses/${slug}/${chapter}/${verseStart}`
        : `/bible-chapter-summaries/${slug}/${chapter}`;
      nodes.push(
        React.createElement(
          Link,
          { key: `${keyPrefix}-${i++}`, href, className: 'text-sacred hover:underline' },
          full
        )
      );
    } else {
      nodes.push(full);
    }
    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

/**
 * Renders **bold** markdown and links inline Bible verse citations
 * (e.g. "Genesis 1:1", "1 Corinthians 13:4-7") to their verse/chapter pages.
 */
export function renderBiblicalText(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  const nodes: React.ReactNode[] = [];

  parts.forEach((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      nodes.push(
        React.createElement('strong', { key: `b-${i}` }, ...linkifyVerses(part.slice(2, -2), `b-${i}`))
      );
    } else {
      nodes.push(...linkifyVerses(part, `p-${i}`));
    }
  });

  return nodes;
}
