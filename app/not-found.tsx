import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <p className="text-6xl font-bold text-sacred mb-4">404</p>
        <h1 className="text-2xl font-bold text-scripture mb-2">Page Not Found</h1>
        <p className="text-ink-muted mb-8">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            href="/"
            className="bg-scripture text-white px-6 py-3 rounded-lg font-medium hover:bg-ink-muted transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/bible-quizzes"
            className="border border-grace text-scripture px-6 py-3 rounded-lg font-medium hover:bg-primary-light/30 transition-colors"
          >
            Browse Quizzes
          </Link>
        </div>

        <div className="border-t border-grace pt-6">
          <p className="text-sm text-ink-muted mb-3">Popular starting points:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { href: '/genesis-chapters', label: 'Genesis' },
              { href: '/psalms-chapters', label: 'Psalms' },
              { href: '/matthew-chapters', label: 'Matthew' },
              { href: '/john-chapters', label: 'John' },
              { href: '/romans-chapters', label: 'Romans' },
              { href: '/topics', label: 'Topics' },
              { href: '/lexicon', label: 'Lexicon' },
              { href: '/characters', label: 'Characters' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-sacred hover:underline px-2 py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
