import Link from 'next/link'

export interface ResourceLink {
  href: string
  title: string
  description: string
  /** Optional type badge text */
  type?: string
}

interface RelatedResourcesGridProps {
  /** Section heading */
  title?: string
  links: ResourceLink[]
  /** Number of grid columns at lg breakpoint (default: 3) */
  columns?: 2 | 3 | 4
  /** Visual variant for the section background */
  variant?: 'default' | 'gray' | 'gradient'
  className?: string
}

const columnClasses = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
}

const typeBadgeColors: Record<string, string> = {
  'word-study': 'bg-indigo-100 text-indigo-700',
  'topic': 'bg-green-100 text-green-700',
  'quiz': 'bg-blue-100 text-blue-700',
  'character': 'bg-amber-100 text-amber-700',
  'chain': 'bg-purple-100 text-purple-700',
  'cross-ref': 'bg-rose-100 text-rose-700',
  'grammar': 'bg-cyan-100 text-cyan-700',
  'encyclopedia': 'bg-orange-100 text-orange-700',
  'place': 'bg-emerald-100 text-emerald-700',
  'verse': 'bg-sky-100 text-sky-700',
}

export default function RelatedResourcesGrid({
  title = 'Continue Your Study',
  links,
  columns = 3,
  variant = 'default',
  className = '',
}: RelatedResourcesGridProps) {
  if (links.length === 0) return null

  const bgClass =
    variant === 'gray'
      ? 'bg-gray-50 rounded-xl p-6'
      : variant === 'gradient'
        ? 'bg-gradient-to-br from-primary-light/50 to-primary-light/30 rounded-xl p-6'
        : ''

  return (
    <section className={`mb-12 ${bgClass} ${className}`}>
      <h2 className="text-2xl font-bold text-scripture font-display mb-6">{title}</h2>
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${columnClasses[columns]} gap-3`}>
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className="bg-white border border-grace rounded-lg p-4 hover:shadow-md transition-shadow group"
          >
            {link.type && (
              <span
                className={`inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 ${
                  typeBadgeColors[link.type] || 'bg-gray-100 text-gray-700'
                }`}
              >
                {link.type.replace(/-/g, ' ')}
              </span>
            )}
            <h3 className="font-bold text-scripture group-hover:text-blue-600 transition-colors text-sm">
              {link.title}
            </h3>
            <p className="text-primary-dark/60 text-xs mt-1 line-clamp-2">{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
