import React from 'react';

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
