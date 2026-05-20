import Link from 'next/link';

interface EditorialVerseCardProps {
  reference: string;
  text: string;
  href?: string;
  translation?: string;
  className?: string;
}

export default function EditorialVerseCard({ reference, text, href, translation = 'KJV', className = '' }: EditorialVerseCardProps) {
  return (
    <div className={`bg-white border border-sacred/20 rounded-lg p-8 shadow-sm text-center ${className}`}>
      <p className="font-serif text-xl text-scripture leading-relaxed mb-4 italic">
        &ldquo;{text}&rdquo;
      </p>
      <div className="flex items-center justify-center gap-3">
        {href ? (
          <Link href={href} className="font-display text-sm font-semibold text-sacred hover:text-gold-dark transition-colors">
            {reference}
          </Link>
        ) : (
          <span className="font-display text-sm font-semibold text-sacred">{reference}</span>
        )}
        <span className="text-xs text-ink-muted bg-grace/40 px-2 py-0.5 rounded-full">{translation}</span>
        {href && (
          <Link href={href} className="text-xs text-ink-muted hover:text-scripture transition-colors">
            Read context →
          </Link>
        )}
      </div>
    </div>
  );
}
