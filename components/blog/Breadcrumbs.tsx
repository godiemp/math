import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1 flex-wrap"
      style={{
        fontSize: '14px',
        color: 'var(--color-label-tertiary)',
      }}
    >
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
      >
        <Home size={14} />
        <span>Inicio</span>
      </Link>

      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <ChevronRight size={14} />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-indigo-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: 'var(--color-label-secondary)' }}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
