import Link from 'next/link'

export interface PrevNextItem {
  href: string
  label: string
  sublabel?: string
  /** Optional secondary line (e.g. Strong's number) */
  detail?: string
}

interface PrevNextNavProps {
  prev: PrevNextItem | null
  next: PrevNextItem | null
  /** Visual variant matching the page's color scheme */
  variant?: 'amber' | 'indigo' | 'blue' | 'default'
  /** Label for previous link (default: "Previous") */
  prevTitle?: string
  /** Label for next link (default: "Next") */
  nextTitle?: string
  className?: string
}

const variantStyles = {
  amber: {
    border: 'hover:border-amber-300',
    text: 'group-hover:text-amber-700',
  },
  indigo: {
    border: 'hover:border-indigo-300',
    text: 'group-hover:text-indigo-700',
  },
  blue: {
    border: 'hover:border-sacred/50',
    text: 'group-hover:text-gold-dark',
  },
  default: {
    border: 'hover:border-gray-300',
    text: 'group-hover:text-gold-dark',
  },
}

export default function PrevNextNav({
  prev,
  next,
  variant = 'default',
  prevTitle = 'Previous',
  nextTitle = 'Next',
  className = '',
}: PrevNextNavProps) {
  const styles = variantStyles[variant]

  return (
    <div className={`flex items-center justify-between gap-4 mb-8 ${className}`}>
      {prev ? (
        <Link
          href={prev.href}
          className={`flex-1 bg-white border border-grace rounded-lg px-4 py-3 ${styles.border} hover:shadow-sm transition-all group`}
        >
          <span className="text-xs text-ink-muted">{prevTitle}</span>
          <span className={`block font-semibold text-scripture ${styles.text} transition-colors`}>
            {prev.label}
          </span>
          {prev.sublabel && (
            <span className="block text-xs text-ink-muted italic">{prev.sublabel}</span>
          )}
          {prev.detail && (
            <span className="block text-xs text-ink-muted">{prev.detail}</span>
          )}
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={next.href}
          className={`flex-1 text-right bg-white border border-grace rounded-lg px-4 py-3 ${styles.border} hover:shadow-sm transition-all group`}
        >
          <span className="text-xs text-ink-muted">{nextTitle}</span>
          <span className={`block font-semibold text-scripture ${styles.text} transition-colors`}>
            {next.label}
          </span>
          {next.sublabel && (
            <span className="block text-xs text-ink-muted italic">{next.sublabel}</span>
          )}
          {next.detail && (
            <span className="block text-xs text-ink-muted">{next.detail}</span>
          )}
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}
