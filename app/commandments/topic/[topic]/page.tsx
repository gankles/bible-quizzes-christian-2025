import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCommandmentsForTopic, getAllCommandmentTopicSlugs } from '@/lib/commandment-topic-bridge';
import { formatReference } from '@/lib/commandments-data';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ topic: string }>;
}

function formatTopicName(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const commandments = getCommandmentsForTopic(topic);
  if (commandments.length < 2) return {};

  const name = formatTopicName(topic);
  const positive = commandments.filter(c => c.polarity === 'P').length;
  const negative = commandments.filter(c => c.polarity === 'N').length;

  return {
    title: `Commandments About ${name} | ${commandments.length} Biblical Commands | Bible Maximum`,
    description: `Explore ${commandments.length} biblical commandments related to ${name.toLowerCase()} (${positive} positive, ${negative} negative). Scripture references from the Torah with English text.`,
    keywords: [
      `commandments ${name}`, `biblical commands ${name}`, `Torah ${name}`,
      '613 commandments', 'biblical law',
    ],
    openGraph: {
      title: `Commandments About ${name}`,
      description: `${commandments.length} biblical commandments related to ${name.toLowerCase()}.`,
      url: `/commandments/topic/${topic}`,
      type: 'website',
    },
    alternates: { canonical: `/commandments/topic/${topic}` },
  };
}

export default async function CommandmentsByTopicPage({ params }: PageProps) {
  const { topic } = await params;
  const commandments = getCommandmentsForTopic(topic);
  if (commandments.length < 2) notFound();

  const name = formatTopicName(topic);
  const positive = commandments.filter(c => c.polarity === 'P');
  const negative = commandments.filter(c => c.polarity === 'N');

  const allSlugs = getAllCommandmentTopicSlugs();
  const currentIdx = allSlugs.indexOf(topic);
  const relatedSlugs = allSlugs
    .filter((s, i) => s !== topic && Math.abs(i - currentIdx) <= 5)
    .slice(0, 4);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Commandments About ${name}`,
    description: `${commandments.length} biblical commandments related to ${name.toLowerCase()}.`,
    url: `https://biblemaximum.com/commandments/topic/${topic}`,
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Commandments', item: 'https://biblemaximum.com/commandments' },
      { '@type': 'ListItem', position: 3, name: 'By Topic', item: 'https://biblemaximum.com/commandments/topic' },
      { '@type': 'ListItem', position: 4, name: name },
    ],
  };

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />

      <div className="min-h-screen bg-primary-light/30">
        <nav className="bg-white border-b border-grace">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <ol className="flex items-center flex-wrap gap-y-1 text-sm">
              <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
              <li className="text-primary-dark/40 mx-2">/</li>
              <li><Link href="/commandments" className="text-blue-600 hover:underline">Commandments</Link></li>
              <li className="text-primary-dark/40 mx-2">/</li>
              <li><Link href="/commandments/topic" className="text-blue-600 hover:underline">By Topic</Link></li>
              <li className="text-primary-dark/40 mx-2">/</li>
              <li className="text-primary-dark/70">{name}</li>
            </ol>
          </div>
        </nav>

        <section className="py-12 bg-gradient-to-b from-blue-50 to-primary-light/30">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-display text-scripture mb-3">
              Commandments About <span className="text-blue-600">{name}</span>
            </h1>
            <p className="text-lg text-primary-dark/70 max-w-2xl mx-auto">
              {commandments.length} biblical commandments from the Torah related to {name.toLowerCase()}.
            </p>
          </div>
        </section>

        {/* Stats */}
        <div className="max-w-4xl mx-auto px-4 mt-[-1.5rem] relative z-20 mb-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-grace rounded-lg shadow-sm p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{commandments.length}</div>
              <div className="text-xs text-primary-dark/60 mt-1">Total</div>
            </div>
            <div className="bg-white border border-grace rounded-lg shadow-sm p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{positive.length}</div>
              <div className="text-xs text-primary-dark/60 mt-1">Positive</div>
            </div>
            <div className="bg-white border border-grace rounded-lg shadow-sm p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{negative.length}</div>
              <div className="text-xs text-primary-dark/60 mt-1">Negative</div>
            </div>
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-4 pb-12">
          {/* CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link href={`/topics/${topic}`} className="bg-blue-600 rounded-lg p-5 text-white shadow-lg flex items-center justify-between hover:bg-blue-700 transition-colors">
              <div>
                <h3 className="font-bold text-lg">Study {name} in Scripture</h3>
                <p className="text-white/80 text-xs">Verses and commentary</p>
              </div>
              <span className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm uppercase shrink-0 ml-3">Study</span>
            </Link>
            <Link href={`/characters-by-topic/${topic}`} className="bg-scripture rounded-lg p-5 text-white shadow-lg flex items-center justify-between hover:bg-scripture/90 transition-colors">
              <div>
                <h3 className="font-bold text-lg">Characters: {name}</h3>
                <p className="text-white/80 text-xs">Biblical figures related to this topic</p>
              </div>
              <span className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-bold text-sm uppercase shrink-0 ml-3">View</span>
            </Link>
          </div>

          {/* Commandment Cards */}
          <section className="mb-8">
            <div className="space-y-3">
              {commandments.map(cmd => (
                <Link
                  key={cmd.number}
                  href={`/commandments/${cmd.number}`}
                  className="block bg-white border border-grace rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-white text-sm font-bold shrink-0 ${cmd.polarity === 'P' ? 'bg-green-600' : 'bg-red-600'}`}>
                      #{cmd.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-scripture group-hover:text-blue-600 transition-colors mb-1">
                        {cmd.concept}
                      </h3>
                      <p className="text-xs text-primary-dark/60 mb-2">{formatReference(cmd.referenceId)}</p>
                      <p className="text-sm text-primary-dark/70 leading-relaxed line-clamp-2">
                        {cmd.scriptureEnglish}
                      </p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${cmd.polarity === 'P' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {cmd.polarity === 'P' ? 'Positive' : 'Negative'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Internal Links */}
          <section className="bg-grace/10 border border-grace rounded-xl p-6">
            <h2 className="text-lg font-bold text-scripture mb-3">Related Resources</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              <Link href={`/topics/${topic}`} className="text-blue-600 hover:underline text-sm">{name} Topic Page</Link>
              <Link href={`/characters-by-topic/${topic}`} className="text-blue-600 hover:underline text-sm">Characters: {name}</Link>
              {relatedSlugs.map(rs => (
                <Link key={rs} href={`/commandments/topic/${rs}`} className="text-blue-600 hover:underline text-sm">
                  Commandments: {formatTopicName(rs)}
                </Link>
              ))}
              <Link href="/commandments/topic" className="text-blue-600 hover:underline text-sm">All Commandments by Topic</Link>
              <Link href="/commandments" className="text-blue-600 hover:underline text-sm">All 613 Commandments</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
