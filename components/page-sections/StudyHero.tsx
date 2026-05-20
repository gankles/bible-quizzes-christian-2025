import Image from 'next/image'

interface StudyHeroBadge {
  text: string
  className?: string
}

interface StudyHeroProps {
  /** The page title (renders as h1) */
  title: string
  /** Subtitle or description below the title */
  subtitle?: string
  /** Optional badges rendered above the title */
  badges?: StudyHeroBadge[]
  /** Background gradient class (e.g. "from-amber-50 to-amber-100/60") */
  gradient?: string
  /** Border color class (e.g. "border-amber-200/80") */
  borderColor?: string
  /** Optional background image path for faint overlay */
  bgImage?: string
  /** Large decorative text displayed on the right side */
  featureText?: string
  /** Additional className for the header element */
  className?: string
  /** Stats row rendered below the title */
  stats?: Array<{ label: string; value: string | number }>
  children?: React.ReactNode
}

export default function StudyHero({
  title,
  subtitle,
  badges,
  gradient = 'from-amber-50 to-amber-100/60',
  borderColor = 'border-amber-200/80',
  bgImage,
  featureText,
  className = '',
  stats,
  children,
}: StudyHeroProps) {
  return (
    <header
      className={`relative bg-gradient-to-br ${gradient} border ${borderColor} rounded-2xl overflow-hidden mb-8 ${className}`}
    >
      {bgImage && (
        <div className="absolute inset-0 opacity-[0.07]">
          <Image src={bgImage} alt="" fill className="object-cover" priority />
        </div>
      )}

      <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-6 p-6 md:p-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {badges.map((badge, i) => (
                <span
                  key={i}
                  className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${badge.className || 'bg-white/60 text-scripture'}`}
                >
                  {badge.text}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-scripture mb-2">
            {title}
          </h1>

          {subtitle && (
            <p className="text-ink-muted text-sm md:text-base leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}

          {stats && stats.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <span className="block text-xl font-bold text-scripture">{stat.value}</span>
                  <span className="text-xs text-ink-muted uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          )}

          {children}
        </div>

        {/* Feature text (e.g. Hebrew/Greek lemma) */}
        {featureText && (
          <div className="hidden lg:flex items-center justify-center w-24 h-24 md:w-28 md:h-28 bg-white/80 rounded-xl border border-white shadow-sm shrink-0">
            <span className="text-4xl md:text-5xl font-bold text-scripture/80 select-all" dir="auto">
              {featureText}
            </span>
          </div>
        )}
      </div>
    </header>
  )
}
