import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StructuredData } from '@/components/StructuredData';
import { getAllPeople, getPersonBySlug, getRelations } from '@/lib/family-tree';
import { canonicalUrl } from '@/lib/site-config';

export const revalidate = 86400; // 24 hours

interface FamilyTreePersonPageProps {
  params: Promise<{ person: string }>;
}

export async function generateStaticParams() {
  return getAllPeople().map(p => ({ person: p.slug }));
}

export async function generateMetadata({ params }: FamilyTreePersonPageProps): Promise<Metadata> {
  const { person: slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) return {};

  const title = `${person.name} Family Tree: Parents, Spouse & Children | Bible Maximum`;
  const description = `${person.name}'s biblical family tree: parents, spouse(s), and children, with Scripture references for every relationship.`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(`/family-tree/${slug}`) },
  };
}

export default async function FamilyTreePersonPage({ params }: FamilyTreePersonPageProps) {
  const { person: slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) notFound();

  const { parents, spouses, children } = getRelations(person);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com' },
      { '@type': 'ListItem', position: 2, name: 'Family Tree', item: 'https://biblemaximum.com/family-tree' },
      { '@type': 'ListItem', position: 3, name: person.name, item: `https://biblemaximum.com/family-tree/${slug}` },
    ],
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    ...(parents.length ? { parent: parents.map(p => ({ '@type': 'Person', name: p.name })) } : {}),
    ...(children.length ? { children: children.map(c => ({ '@type': 'Person', name: c.name })) } : {}),
    ...(spouses.length ? { spouse: spouses.map(s => ({ '@type': 'Person', name: s.name })) } : {}),
  };

  return (
    <div className="min-h-screen bg-primary-light/30">
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={personSchema} />

      <nav className="bg-white border-b border-grace">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <ol className="flex items-center flex-wrap gap-y-1 text-sm">
            <li>
              <Link href="/" className="text-sacred hover:underline">Home</Link>
            </li>
            <li className="text-ink-light mx-2">/</li>
            <li>
              <Link href="/family-tree" className="text-sacred hover:underline">Family Tree</Link>
            </li>
            <li className="text-ink-light mx-2">/</li>
            <li className="text-ink-muted">{person.name}</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        <section>
          <h1 className="text-3xl md:text-4xl font-bold font-display text-scripture mb-3">
            {person.name}
          </h1>
          <p className="text-scripture leading-relaxed">
            {describeRelations(person.name, parents, spouses, children)}
          </p>
        </section>

        <section className="bg-white rounded-xl border border-grace p-6 md:p-8">
          <h2 className="text-2xl font-bold font-display text-scripture mb-4">Family</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <RelationGroup label="Parents" people={parents} />
            <RelationGroup label="Spouse(s)" people={spouses} />
            <RelationGroup label="Children" people={children} />
          </div>
        </section>

        {person.verseRefs.length > 0 && (
          <section className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-2xl font-bold font-display text-scripture mb-4">Scripture References</h2>
            <ul className="space-y-2">
              {person.verseRefs.map((ref, i) => (
                <li key={i}>
                  <Link
                    href={`/verses/${ref.book}/${ref.chapter}/${ref.verse}`}
                    className="text-sacred hover:underline text-sm"
                  >
                    {ref.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="bg-primary-light/30 border border-grace rounded-xl p-6">
          <h2 className="text-lg font-bold text-scripture mb-3">Related Resources</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/family-tree" className="text-sacred hover:underline text-sm">Family Tree Index</Link>
            <Link href="/characters" className="text-sacred hover:underline text-sm">All Bible Characters</Link>
            <Link href="/people" className="text-sacred hover:underline text-sm">Bible People Directory</Link>
            <Link href="/bible-encyclopedia" className="text-sacred hover:underline text-sm">Bible Encyclopedia</Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function RelationGroup({ label, people }: { label: string; people: { slug: string; name: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase text-ink-light mb-2">{label}</h3>
      {people.length === 0 ? (
        <p className="text-sm text-ink-muted">Not recorded</p>
      ) : (
        <ul className="space-y-1">
          {people.map(p => (
            <li key={p.slug}>
              <Link href={`/family-tree/${p.slug}`} className="text-sacred hover:underline text-sm">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function describeRelations(
  name: string,
  parents: { name: string }[],
  spouses: { name: string }[],
  children: { name: string }[]
): string {
  const parts: string[] = [];
  if (parents.length) parts.push(`child of ${parents.map(p => p.name).join(' and ')}`);
  if (spouses.length) parts.push(`spouse of ${spouses.map(s => s.name).join(' and ')}`);
  if (children.length) parts.push(`parent of ${children.length} ${children.length === 1 ? 'child' : 'children'}`);
  if (parts.length === 0) return `${name} appears in the biblical genealogical record.`;
  return `${name} is the ${parts.join(', ')}, as recorded in Scripture.`;
}
