// Single source of truth for site-wide configuration
// Eliminates hardcoded domain references across 129+ files

export const SITE_CONFIG = {
  domain: 'https://biblemaximum.com',
  name: 'Bible Maximum',
  shortName: 'Bible Maximum',
  description: 'Comprehensive Bible study tools, quizzes, and resources for every book of the Bible.',
  contactEmail: 'contact@biblemaximum.com',
  defaultOgImage: '/images/og-default.jpg',
  logo: '/logo.png',
  social: {
    facebook: 'https://facebook.com/biblemaximum',
    twitter: 'https://twitter.com/biblemaximum',
  },
} as const

/** Build a full canonical URL from a path */
export function canonicalUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${SITE_CONFIG.domain}${clean}`
}

/** Organization schema — reusable across all pages */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.domain,
    logo: `${SITE_CONFIG.domain}${SITE_CONFIG.logo}`,
    description: SITE_CONFIG.description,
    sameAs: [SITE_CONFIG.social.facebook, SITE_CONFIG.social.twitter],
  }
}

/** Publisher object for Article schemas */
export function publisherSchema() {
  return {
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_CONFIG.domain}${SITE_CONFIG.logo}`,
    },
  }
}
