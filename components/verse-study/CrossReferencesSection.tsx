import Link from 'next/link';
import { FormattedCrossRef } from '@/lib/cross-references';

interface CrossReferencesSectionProps {
  crossRefs: FormattedCrossRef[];
  currentReference: string;
}

export default function CrossReferencesSection({
  crossRefs,
  currentReference
}: CrossReferencesSectionProps) {
  if (crossRefs.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-scripture mb-1">Cross-References</h2>
      <p className="text-sm text-primary-dark/40 mb-4">
        Verses related to {currentReference} from Treasury of Scripture Knowledge
      </p>

      <div className="grid gap-2 sm:grid-cols-2">
        {crossRefs.map((ref, index) => (
          <Link
            key={`${ref.bookSlug}-${ref.chapter}-${ref.verse}-${index}`}
            href={ref.url}
            className="group flex items-center justify-between p-3 border border-grace rounded-lg hover:border-blue-300 hover:bg-primary-light transition-all"
          >
            <span className="text-blue-600 font-medium text-sm group-hover:underline">
              {ref.reference}
            </span>
            <svg className="w-4 h-4 text-primary-dark/40 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
}
