import Link from 'next/link';

interface InterlinearWord {
  position: number;
  original: string;
  transliteration: string;
  strongs: string;
  english: string;
  parsing: string;
  definition: string;
}

interface OriginalLanguageProps {
  words: InterlinearWord[] | null;
  isOldTestament: boolean;
  bookSlug: string;
}

export default function OriginalLanguage({ words, isOldTestament, bookSlug }: OriginalLanguageProps) {
  if (!words || words.length === 0) return null;

  const language = isOldTestament ? 'Hebrew' : 'Greek';
  const langColorClass = isOldTestament
    ? 'bg-amber-50 text-amber-700 border-amber-200'
    : 'bg-sacred/10 text-scripture border-sacred/20';

  return (
    <div className="word-breakdown-card">
      <section className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-semibold text-scripture">Original Language Analysis</h2>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${langColorClass}`}>
            {language} &middot; {words.length} words
          </span>
        </div>

        <div className="word-grid">
          {words.map((word) => (
            <div
              key={`${word.position}-${word.strongs}`}
              className="word-item"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="word-original" dir={isOldTestament ? 'rtl' : 'ltr'}>
                  {word.original}
                </div>
                <span className="text-[10px] text-ink-light whitespace-nowrap mt-1">
                  {word.position} of {words.length}
                </span>
              </div>

              {word.english && (
                <p className="text-sm font-medium text-scripture mb-1">
                  &ldquo;{word.english}&rdquo;
                </p>
              )}

              {word.transliteration && (
                <div className="word-translit">
                  {word.transliteration}
                </div>
              )}

              <Link
                href={`/lexicon/${word.strongs}`}
                className={`inline-block text-[11px] px-1.5 py-0.5 rounded font-medium border mb-1.5 hover:underline ${langColorClass}`}
              >
                {word.strongs}
              </Link>

              {word.definition && (
                <div className="word-meaning">
                  {word.definition}
                </div>
              )}
            </div>
          ))}
        </div>

        <hr className="border-grace mt-8" />
      </section>
    </div>
  );
}
