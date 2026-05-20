import { Metadata } from 'next';
import Link from 'next/link';
import { getStoriesStats, getCategories, getStoriesByCategory } from '@/lib/bible-stories-data';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: "Bible Stories | Complete Collection for Kids & Families | Bible Maximum",
  description: "Browse 234 Bible stories with full narratives for adults and kids. From Creation to Revelation — organized by category with themes, characters, and verse references.",
  keywords: [
    "Bible stories", 'Bible stories for kids', 'kids Bible stories',
    'Bible stories by category', 'Old Testament stories', 'New Testament stories',
    'family Bible stories', 'Bible story collection', 'Genesis stories',
    'Jesus stories', 'Bible narratives', 'children Bible stories',
  ],
  openGraph: {
    title: "Bible Stories — Complete Collection for Kids & Families",
    description: 'Browse 234 Bible stories organized by category with full narratives for adults and kids.',
    url: '/bible-stories',
    type: 'website',
  },
  alternates: { canonical: '/bible-stories' },
};

export default function BibleStoriesPage() {
  const stats = getStoriesStats();
  const categories = getCategories();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "Bible Stories",
    description: metadata.description,
    url: 'https://biblemaximum.com/bible-stories',
    numberOfItems: stats.total,
  };

  return (
    <>
      <StructuredData data={jsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-ink-muted">
        <Link href="/" className="hover:text-gold-dark">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">Bible Stories</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white border-b border-grace">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-scripture">
              Bible Stories for Families
            </h1>
            <p className="text-lg text-ink-muted max-w-2xl mb-6">
              {stats.total} Bible stories with full narratives, kids versions, themes,
              and character guides — organized across {stats.categories} categories
              from Creation to Revelation.
            </p>
            <div className="flex flex-wrap gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.total}</p>
                <p className="text-xs text-ink-muted uppercase tracking-wider">Stories</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.categories}</p>
                <p className="text-xs text-ink-muted uppercase tracking-wider">Categories</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-scripture">{stats.books}</p>
                <p className="text-xs text-ink-muted uppercase tracking-wider">Books</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Jump Links */}
      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <a
              key={cat.slug}
              href={`#cat-${cat.slug}`}
              className="px-3 py-1.5 bg-white border border-grace rounded-lg text-sm text-scripture hover:bg-primary-light hover:border-sacred/50 transition-colors"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </section>

      {/* Stories by Category */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        {categories.map(cat => {
          const stories = getStoriesByCategory(cat.slug);
          if (stories.length === 0) return null;
          return (
            <div key={cat.slug} id={`cat-${cat.slug}`} className="mb-12">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-scripture">
                  {cat.name}
                  <span className="text-sm font-normal text-ink-muted ml-2">
                    ({stories.length} {stories.length === 1 ? 'story' : 'stories'})
                  </span>
                </h2>
                <p className="text-sm text-ink-muted mt-1">{cat.description}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {stories.map(story => (
                  <Link
                    key={story.slug}
                    href={`/bible-stories/${story.slug}`}
                    className="bg-white border border-grace rounded-lg px-4 py-4 hover:shadow-md hover:border-sacred/50 transition-all group"
                  >
                    <span className="font-semibold text-scripture group-hover:text-gold-dark transition-colors block mb-1">
                      {story.title}
                    </span>
                    <span className="block text-xs text-ink-muted mb-2 line-clamp-2">
                      {story.description}
                    </span>
                    <span className="block text-xs text-ink-muted mb-2">
                      {story.verses.join(', ')}
                    </span>
                    {story.themes.length > 0 && (
                      <span className="flex flex-wrap gap-1">
                        {story.themes.slice(0, 3).map(theme => (
                          <span
                            key={theme}
                            className="inline-block px-2 py-0.5 bg-blue-50 text-scripture text-[10px] rounded-full"
                          >
                            {theme}
                          </span>
                        ))}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Related */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 border border-grace rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-scripture mb-2">Keep Learning</h2>
          <p className="text-sm text-ink-muted mb-4">
            Test your knowledge of these stories with our Bible quizzes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/bible-quizzes" className="px-5 py-2.5 bg-scripture text-white text-sm font-medium rounded-lg hover:bg-ink-muted transition-colors">
              Bible Quizzes
            </Link>
            <Link href="/people" className="px-5 py-2.5 bg-white text-sacred text-sm font-medium rounded-lg border border-sacred/50 hover:bg-primary-light transition-colors">
              Bible People
            </Link>
            <Link href="/bible-names" className="px-5 py-2.5 bg-white text-scripture text-sm font-medium rounded-lg border border-grace hover:bg-primary-light/50 transition-colors">
              Bible Names
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
