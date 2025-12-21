'use client';

import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { type BlogPostMeta, getAudienceFromTags, type AudienceType } from '@/lib/blog-types';

interface BlogPostCardProps {
  post: BlogPostMeta;
}

const AUDIENCE_STYLES: Record<Exclude<AudienceType, 'todos'>, { label: string; bg: string; color: string }> = {
  estudiantes: {
    label: 'Estudiantes',
    bg: 'rgba(59, 130, 246, 0.1)',
    color: 'rgb(59, 130, 246)',
  },
  padres: {
    label: 'Padres',
    bg: 'rgba(236, 72, 153, 0.1)',
    color: 'rgb(236, 72, 153)',
  },
  profesores: {
    label: 'Profesores',
    bg: 'rgba(34, 197, 94, 0.1)',
    color: 'rgb(34, 197, 94)',
  },
  directivos: {
    label: 'Directivos',
    bg: 'rgba(249, 115, 22, 0.1)',
    color: 'rgb(249, 115, 22)',
  },
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  const audience = getAudienceFromTags(post.tags);
  const audienceStyle = AUDIENCE_STYLES[audience];

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
      {/* Audience Badge */}
      <span
        className="inline-block mb-3"
        style={{
          fontSize: '12px',
          fontWeight: 500,
          padding: '4px 10px',
          borderRadius: '999px',
          background: audienceStyle.bg,
          color: audienceStyle.color,
        }}
      >
        {audienceStyle.label}
      </span>

      <h2
        className="mb-2"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '20px',
          fontWeight: 600,
          color: 'var(--color-label-primary)',
          lineHeight: 1.3,
        }}
      >
        {post.title}
      </h2>
      <p
        className="mb-4"
        style={{
          fontSize: '15px',
          lineHeight: 1.6,
          color: 'var(--color-label-secondary)',
        }}
      >
        {post.description}
      </p>
      <div
        className="flex flex-wrap items-center gap-3"
        style={{
          fontSize: '13px',
          color: 'var(--color-label-tertiary)',
        }}
      >
        <span className="flex items-center gap-1">
          <Calendar size={13} />
          {new Date(post.date).toLocaleDateString('es-CL', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={13} />
          {post.readingTime} min
        </span>
      </div>
    </Link>
  );
}
