'use client';

import Link from 'next/link';
import { Calendar, Clock, Tag } from 'lucide-react';
import type { BlogPostMeta } from '@/lib/blog';

interface BlogPostCardProps {
  post: BlogPostMeta;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      style={{
        background: 'var(--color-bg-elevated)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-separator)',
        padding: '24px',
      }}
    >
      <h2
        className="mb-2"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '24px',
          fontWeight: 600,
          color: 'var(--color-label-primary)',
        }}
      >
        {post.title}
      </h2>
      <p
        className="mb-4"
        style={{
          fontSize: '16px',
          lineHeight: 1.6,
          color: 'var(--color-label-secondary)',
        }}
      >
        {post.description}
      </p>
      <div
        className="flex flex-wrap items-center gap-4"
        style={{
          fontSize: '14px',
          color: 'var(--color-label-tertiary)',
        }}
      >
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          {new Date(post.date).toLocaleDateString('es-CL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {post.readingTime} min de lectura
        </span>
        {post.tags.length > 0 && (
          <span className="flex items-center gap-1">
            <Tag size={14} />
            {post.tags.slice(0, 2).join(', ')}
          </span>
        )}
      </div>
    </Link>
  );
}
