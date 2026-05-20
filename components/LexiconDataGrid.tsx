interface LexiconField {
  label: string;
  value: string | number | null | undefined;
}

interface LexiconDataGridProps {
  strongs: string;
  word: string;
  transliteration?: string | null;
  pronunciation?: string | null;
  partOfSpeech?: string | null;
  language: 'Hebrew' | 'Greek';
  fields?: LexiconField[];
  definition?: string | null;
  className?: string;
}

export default function LexiconDataGrid({
  strongs,
  word,
  transliteration,
  pronunciation,
  partOfSpeech,
  language,
  fields = [],
  definition,
  className = '',
}: LexiconDataGridProps) {
  return (
    <div className={`bg-white border border-sacred/20 rounded-lg shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-primary-light border-b border-sacred/20 px-5 py-4 flex items-start justify-between gap-4">
        <div>
          <div className="font-serif text-3xl text-scripture mb-1" dir={language === 'Hebrew' ? 'rtl' : 'ltr'}>
            {word}
          </div>
          {transliteration && (
            <div className="font-display text-base font-semibold text-sacred">{transliteration}</div>
          )}
          {pronunciation && (
            <div className="text-sm text-ink-muted italic">{pronunciation}</div>
          )}
        </div>
        <div className="text-right flex-shrink-0">
          <span className="inline-block bg-scripture text-primary-light text-xs font-semibold px-2 py-1 rounded mb-1">
            {strongs}
          </span>
          <div className="text-xs text-ink-muted">{language}</div>
          {partOfSpeech && <div className="text-xs text-ink-muted mt-0.5">{partOfSpeech}</div>}
        </div>
      </div>

      {/* Definition */}
      {definition && (
        <div className="px-5 py-4 border-b border-grace">
          <p className="font-serif text-scripture leading-relaxed">{definition}</p>
        </div>
      )}

      {/* Data fields grid */}
      {fields.length > 0 && (
        <div className="divide-y divide-grace">
          {fields.filter(f => f.value != null && f.value !== '').map((field) => (
            <div key={field.label} className="flex px-5 py-3 gap-4">
              <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide w-32 flex-shrink-0 pt-0.5">
                {field.label}
              </span>
              <span className="text-sm text-scripture flex-1">{field.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
