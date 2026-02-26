import Link from 'next/link';

// ━━━ Reusable CRO Components for Study Pages ━━━

/** Gospel CTA — conversion-focused call to action */
export function GospelCTA({
  headline = 'Take the Next Step',
  body = 'The Bible isn\'t just information — it\'s an invitation. If you want to learn what God says about salvation, start here.',
  primaryHref = '/what-does-the-bible-say-about/salvation',
  primaryLabel = 'How to Be Saved',
  secondaryHref = '/what-does-the-bible-say-about/repentance',
  secondaryLabel = 'What Is Repentance?',
}: {
  headline?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="mb-12">
      <div className="bg-gradient-to-br from-scripture via-scripture/95 to-blue-950 rounded-xl p-8 md:p-10 text-white shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold font-display mb-4 text-center">{headline}</h2>
        <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-6 text-center">{body}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center bg-white text-scripture font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors text-sm uppercase tracking-wider"
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wider"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Study Path Cards — two-column CTA cards linking to next actions */
export function StudyPathCards({
  paths,
}: {
  paths: Array<{
    href: string;
    eyebrow: string;
    title: string;
    description: string;
    color?: 'blue' | 'scripture' | 'amber' | 'green' | 'indigo';
  }>;
}) {
  const colorMap = {
    blue: 'bg-blue-600 hover:bg-blue-700 text-blue-200 text-blue-100',
    scripture: 'bg-scripture hover:bg-scripture/90 text-blue-200 text-blue-100',
    amber: 'bg-amber-700 hover:bg-amber-800 text-amber-200 text-amber-100',
    green: 'bg-green-700 hover:bg-green-800 text-green-200 text-green-100',
    indigo: 'bg-indigo-700 hover:bg-indigo-800 text-indigo-200 text-indigo-100',
  };
  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paths.map((p, i) => {
          const c = colorMap[p.color || 'blue'];
          const [bg, eyebrowColor, descColor] = c.split(' ');
          return (
            <Link
              key={i}
              href={p.href}
              className={`${bg} rounded-xl p-6 text-white transition-colors shadow-lg group`}
            >
              <p className={`${eyebrowColor} text-xs font-bold uppercase tracking-wider mb-2`}>{p.eyebrow}</p>
              <h3 className="text-xl font-bold mb-1">{p.title}</h3>
              <p className={`${descColor} text-sm`}>{p.description}</p>
              <span className="inline-block mt-3 text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                Start Now &rarr;
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/** Inline CTA Banner — compact horizontal CTA for mid-page placement */
export function InlineCTA({
  text,
  href,
  label,
  variant = 'blue',
}: {
  text: string;
  href: string;
  label: string;
  variant?: 'blue' | 'amber' | 'green';
}) {
  const variants = {
    blue: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
    amber: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100',
    green: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100',
  };
  const btnVariants = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    amber: 'bg-amber-600 hover:bg-amber-700',
    green: 'bg-green-600 hover:bg-green-700',
  };
  return (
    <div className={`${variants[variant]} border rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3 mb-8`}>
      <p className="text-sm font-medium">{text}</p>
      <Link
        href={href}
        className={`${btnVariants[variant]} text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors whitespace-nowrap`}
      >
        {label} &rarr;
      </Link>
    </div>
  );
}

/** Related Studies Grid — internal cross-linking section */
export function RelatedStudies({
  title = 'Continue Your Study',
  links,
}: {
  title?: string;
  links: Array<{
    href: string;
    title: string;
    description: string;
    type: string;
  }>;
}) {
  const typeBadge = (type: string) => {
    const colors: Record<string, string> = {
      'word-study': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
      'topic': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      'quiz': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      'character': 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
      'chain': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      'cross-ref': 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300',
      'grammar': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300',
      'encyclopedia': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    };
    return colors[type] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className="bg-white dark:bg-dark-surface border border-grace dark:border-dark-border rounded-lg p-4 hover:shadow-md transition-shadow group"
          >
            <span className={`inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 ${typeBadge(link.type)}`}>
              {link.type.replace('-', ' ')}
            </span>
            <h3 className="font-bold text-scripture dark:text-white group-hover:text-blue-600 transition-colors text-sm">
              {link.title}
            </h3>
            <p className="text-primary-dark/60 dark:text-primary-dark/40 text-xs mt-1 line-clamp-2">{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** FAQ Accordion — for FAQ schema + featured snippets */
export function FAQAccordion({
  title,
  items,
}: {
  title: string;
  items: Array<{ question: string; answer: string }>;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-scripture dark:text-white font-display mb-6">{title}</h2>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <details
            key={idx}
            className="bg-white dark:bg-dark-surface rounded-lg border border-grace dark:border-dark-border shadow-sm group"
          >
            <summary className="p-5 cursor-pointer font-bold text-scripture dark:text-white text-lg flex items-center justify-between list-none">
              <span>{item.question}</span>
              <span className="text-blue-600 text-xl ml-4 shrink-0 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-5 pb-5 text-primary-dark/80 dark:text-primary-dark/40 leading-relaxed border-t border-grace dark:border-dark-border pt-4">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Quick Stats Bar — compact horizontal stats display */
export function QuickStats({
  stats,
}: {
  stats: Array<{ label: string; value: string | number }>;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {stats.map((s, i) => (
        <div key={i} className="bg-white dark:bg-dark-surface border border-grace dark:border-dark-border rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-scripture dark:text-white">{s.value}</p>
          <p className="text-xs text-primary-dark/60 dark:text-primary-dark/40 uppercase tracking-wider">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/** Letter Navigation — A-Z horizontal scroller */
export function LetterNav({
  letters,
  basePath,
  activeCount,
}: {
  letters: string[];
  basePath: string;
  activeCount?: Record<string, number>;
}) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  return (
    <nav className="flex flex-wrap gap-1 mb-8" aria-label="Alphabetical navigation">
      {alphabet.map(letter => {
        const isActive = letters.includes(letter);
        const count = activeCount?.[letter];
        return (
          <a
            key={letter}
            href={isActive ? `${basePath}#letter-${letter.toLowerCase()}` : undefined}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
              isActive
                ? 'bg-scripture text-white hover:bg-scripture/80 cursor-pointer'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-default'
            }`}
            title={count ? `${letter}: ${count} entries` : letter}
            aria-disabled={!isActive}
          >
            {letter}
          </a>
        );
      })}
    </nav>
  );
}

/** Breadcrumb Navigation — consistent across all study pages */
export function StudyBreadcrumb({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-primary-dark/60 dark:text-primary-dark/40">
        <li>
          <Link href="/" className="hover:text-scripture transition-colors">Home</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <span>/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-scripture transition-colors">{item.label}</Link>
            ) : (
              <span className="text-scripture dark:text-white font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
