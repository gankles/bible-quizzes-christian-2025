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
    <section className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Cross-References
      </h3>
      <p className="text-xs text-gray-500 mb-4">
        Verses related to {currentReference}
      </p>
      
      <div className="grid gap-2 sm:grid-cols-2">
        {crossRefs.map((ref, index) => (
          <Link
            key={`${ref.bookSlug}-${ref.chapter}-${ref.verse}-${index}`}
            href={ref.url}
            className="group flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-blue-600 font-medium group-hover:underline">
                {ref.reference}
              </span>
            </div>
            <span className="text-gray-400 group-hover:text-blue-600 transition-colors">
              &rarr;
            </span>
          </Link>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 text-center">
        <span className="text-xs text-gray-500">
          Cross-references from Treasury of Scripture Knowledge
        </span>
      </div>
    </section>
  );
}
