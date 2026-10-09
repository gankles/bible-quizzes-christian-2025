import { Metadata } from 'next';
import Link from 'next/link';
import { StructuredData } from '@/components/StructuredData';
import { getAllPeople, getNotableLineagePeople } from '@/lib/family-tree';
import { canonicalUrl } from '@/lib/site-config';

export const revalidate = 86400; // 24 hours

export const metadata: Metadata = {
  title: 'Bible Family Tree: Genealogy from Adam to David | Bible Maximum',
  description: 'Explore biblical genealogy from Adam to David and beyond. Trace lineages, parents, spouses, and children with Scripture references for every person.',
  alternates: { canonical: canonicalUrl('/family-tree') },
};

export default function FamilyTreeIndexPage() {
  const notable = getNotableLineagePeople();
  const allPeople = [...getAllPeople()].sort((a, b) => a.name.localeCompare(b.name));

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com' },
      { '@type': 'ListItem', position: 2, name: 'Family Tree', item: 'https://biblemaximum.com/family-tree' },
    ],
  };

  return (
    <div className="min-h-screen bg-primary-light/30">
      <StructuredData data={breadcrumbSchema} />

      <nav className="bg-white border-b border-grace">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <ol className="flex items-center flex-wrap gap-y-1 text-sm">
            <li>
              <Link href="/" className="text-sacred hover:underline">Home</Link>
            </li>
            <li className="text-ink-light mx-2">/</li>
            <li className="text-ink-muted">Family Tree</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        <section>
          <h1 className="text-3xl md:text-4xl font-bold font-display text-scripture mb-3">
            Bible Family Tree
          </h1>
          <p className="text-scripture leading-relaxed">
            Trace biblical genealogy across {allPeople.length} people and {notable.length ? 'the generations between them' : 'their families'},
            from Adam through the line of David. Each person page lists parents, spouse(s), children, and the Scripture
            references where they appear.
          </p>
        </section>

        <section className="bg-white rounded-xl border border-grace p-6 md:p-8">
          <h2 className="text-2xl font-bold font-display text-scripture mb-4">Notable Lineage</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {notable.map(person => (
              <Link
                key={person.id}
                href={`/family-tree/${person.slug}`}
                className="border border-grace rounded-lg p-4 hover:border-sacred/50 transition-colors"
              >
                <span className="font-semibold text-scripture">{person.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl border border-grace p-6 md:p-8">
          <h2 className="text-2xl font-bold font-display text-scripture mb-4">All People</h2>
          <div className="grid gap-x-6 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
            {allPeople.map(person => (
              <Link
                key={person.id}
                href={`/family-tree/${person.slug}`}
                className="text-sacred hover:underline text-sm truncate"
              >
                {person.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-primary-light/30 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Related Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/characters" className="text-sacred hover:underline text-sm">All Bible Characters</Link>
            <Link href="/people" className="text-sacred hover:underline text-sm">Bible People Directory</Link>
            <Link href="/bible-encyclopedia" className="text-sacred hover:underline text-sm">Bible Encyclopedia</Link>
            <Link href="/timeline" className="text-sacred hover:underline text-sm">Bible Timeline</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
