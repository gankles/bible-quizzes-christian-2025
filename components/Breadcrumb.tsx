import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="bg-white border-b border-grace" aria-label="Breadcrumb">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <ol className="flex items-center flex-wrap gap-y-1 text-sm">
          <li>
            <Link href="/" className="text-blue-600 hover:underline transition-colors">Home</Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center">
              <span className="text-primary-dark/40 mx-2">/</span>
              {item.href ? (
                <Link href={item.href} className="text-blue-600 hover:underline transition-colors">{item.label}</Link>
              ) : (
                <span className="text-scripture font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
