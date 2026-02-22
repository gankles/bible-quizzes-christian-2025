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
    : 'bg-blue-50 text-blue-700 border-blue-200';

  return (
    <section className="mb-8">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-xl font-semibold text-scripture">Original Language Analysis</h2>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${langColorClass}`}>
          {language} &middot; {words.length} words
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {words.map((word) => (
          <div
            key={`${word.position}-${word.strongs}`}
            className="border border-grace rounded-lg p-3 hover:bg-primary-light/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <span className={`text-xl leading-tight ${isOldTestament ? 'font-serif' : ''}`} dir={isOldTestament ? 'rtl' : 'ltr'}>
                {word.original}
              </span>
              <span className="text-[10px] text-primary-dark/40 whitespace-nowrap mt-1">
                {word.position} of {words.length}
              </span>
            </div>

            {word.english && (
              <p className="text-sm font-medium text-scripture mb-1">
                &ldquo;{word.english}&rdquo;
              </p>
            )}

            {word.transliteration && (
              <p className="text-xs text-primary-dark/50 italic mb-1">
                {word.transliteration}
              </p>
            )}

            <Link
              href={`/lexicon/${word.strongs}`}
              className={`inline-block text-[11px] px-1.5 py-0.5 rounded font-medium border mb-1.5 hover:underline ${langColorClass}`}
            >
              {word.strongs}
            </Link>

            {word.definition && (
              <p className="text-xs text-primary-dark/60 leading-relaxed line-clamp-2">
                {word.definition}
              </p>
            )}
          </div>
        ))}
      </div>

      <hr className="border-grace mt-8" />
    </section>
  );
}
