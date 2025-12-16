'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BlogHeaderProps {
  backHref?: string;
  backLabel?: string;
}

export function BlogHeader({ backHref = '/', backLabel = 'volver' }: BlogHeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        borderBottom: '1px solid var(--color-separator)'
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href={backHref}
          className="flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-tint)' }}
        >
          <ArrowLeft size={20} />
          <span style={{ fontWeight: 500 }}>{backLabel}</span>
        </Link>
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '20px',
            fontWeight: 600,
            color: 'var(--color-label-primary)'
          }}
        >
          SimplePAES
        </Link>
        <Link
          href="/"
          className="transition-opacity hover:opacity-80"
          style={{
            padding: '8px 16px',
            background: 'var(--color-tint)',
            color: 'white',
            borderRadius: 'var(--radius-sm)',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          comenzar
        </Link>
      </div>
    </header>
  );
}
