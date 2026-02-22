import { Metadata } from 'next';
import Link from 'next/link';
import { getAllDevotionals, getDevotionalThemes, getDevotionalsStats } from '@/lib/devotionals-data';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Daily Bible Devotionals | 365 Scripture Meditations | Bible Maximum',
  description: 'Explore 365 daily Bible devotionals covering themes of faith, hope, love, guidance, and spiritual growth. Each devotional includes scripture meditation, personal application, and prayer.',
  keywords: [
    'daily Bible devotionals', 'scripture meditations', 'daily devotional',
    'Bible meditation', 'Christian devotional', 'prayer devotional',
    'faith devotional', 'hope devotional', 'love devotional',
    'spiritual growth', 'Bible study devotional',
  ],
  openGraph: {
    title: 'Daily Bible Devotionals | 365 Scripture Meditations',
    description: 'Explore 365 daily Bible devotionals with scripture meditation, application, and prayer.',
    url: '/devotionals',
    type: 'website',
  },
  alternates: { canonical: '/devotionals' },
};

function themeToId(theme: string): string {
  return theme.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s+\S*$/, '') + '...';
}

export default function DevotionalsPage() {
  const devotionals = getAllDevotionals();
  const themes = getDevotionalThemes();
  const stats = getDevotionalsStats();

  // Group devotionals by theme, preserving theme order from getDevotionalThemes
  const grouped = new Map<string, typeof devotionals>();
  for (const theme of themes) {
    grouped.set(theme.theme, []);
  }
  for (const d of devotionals) {
    grouped.get(d.theme)?.push(d);
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Daily Bible Devotionals',
    description: '365 daily Bible devotionals covering themes of faith, hope, love, guidance, and spiritual growth.',
    url: 'https://biblemaximum.com/devotionals',
    numberOfItems: stats.total,
    publisher: {
      '@type': 'Organization',
      name: 'Bible Maximum',
      url: 'https://biblemaximum.com',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Devotionals' },
    ],
  };

  return (
    <>
      <StructuredData data={collectionSchema} />
      <StructuredData data={breadcrumbSchema} />

      <Breadcrumb items={[{ label: 'Devotionals' }]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-blue-50 to-primary-light/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-scripture mb-4">
              Daily Bible <span className="text-blue-600">Devotionals</span>
            </h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mx-auto mb-8">
              365 scripture meditations to deepen your walk with God. Each devotional
              includes a focused meditation, practical application, and prayer drawn
              from the richness of God&apos;s Word.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-primary-dark/60">Devotionals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.themes}</div>
                <div className="text-sm text-primary-dark/60">Themes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.books}</div>
                <div className="text-sm text-primary-dark/60">Bible Books</div>
              </div>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Theme Filter Tags */}
          <section className="mb-12">
            <h2 className="text-lg font-bold text-scripture mb-4">Browse by Theme</h2>
            <div className="flex flex-wrap gap-2">
              {themes.map(({ theme, count }) => (
                <a
                  key={theme}
                  href={`#${themeToId(theme)}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-grace rounded-lg text-sm text-primary-dark/80 hover:border-blue-300 hover:text-blue-600 transition-colors"
                >
                  {theme}
                  <span className="text-xs text-primary-dark/40">({count})</span>
                </a>
              ))}
            </div>
          </section>

          {/* Devotionals Grouped by Theme */}
          {themes.map(({ theme }) => {
            const items = grouped.get(theme) || [];
            return (
              <section key={theme} id={themeToId(theme)} className="mb-12 scroll-mt-20">
                <div className="flex items-baseline justify-between mb-4">
                  <h2 className="text-2xl font-bold font-display text-scripture">
                    {theme}
                  </h2>
                  <span className="text-sm text-primary-dark/50">
                    {items.length} devotional{items.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/devotionals/${d.slug}`}
                      className="bg-white border border-grace rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all group"
                    >
                      <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded mb-2">
                        {d.theme}
                      </span>
                      <h3 className="text-lg font-semibold text-scripture group-hover:text-blue-600 transition-colors mb-1">
                        {d.title}
                      </h3>
                      <p className="text-sm text-primary-dark/60 mb-3">
                        {d.reference}
                      </p>
                      <p className="text-sm text-primary-dark/70 leading-relaxed">
                        {truncate(d.opening, 80)}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Internal Links Section */}
          <section className="bg-grace/10 border border-grace rounded-xl p-6 mt-8">
            <h2 className="text-lg font-bold text-scripture mb-3">Continue Your Study</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/bible-quizzes" className="text-blue-600 hover:underline text-sm">
                Bible Quizzes
              </Link>
              <Link href="/topics" className="text-blue-600 hover:underline text-sm">
                Bible Topics
              </Link>
              <Link href="/bible-stories" className="text-blue-600 hover:underline text-sm">
                Bible Stories
              </Link>
              <Link href="/people" className="text-blue-600 hover:underline text-sm">
                Bible People
              </Link>
              <Link href="/characters" className="text-blue-600 hover:underline text-sm">
                Bible Characters
              </Link>
              <Link href="/timeline" className="text-blue-600 hover:underline text-sm">
                Bible Timeline
              </Link>
              <Link href="/cross-references" className="text-blue-600 hover:underline text-sm">
                Cross References
              </Link>
              <Link href="/lexicon" className="text-blue-600 hover:underline text-sm">
                Greek and Hebrew Lexicon
              </Link>
              <Link href="/commandments" className="text-blue-600 hover:underline text-sm">
                Bible Commandments
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
