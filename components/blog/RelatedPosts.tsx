import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import type { BlogPostMeta } from '@/lib/blog';

interface RelatedPostsProps {
  posts: BlogPostMeta[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div
      className="mt-12"
      style={{
        background: 'var(--color-bg-elevated)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-separator)',
        padding: '24px',
      }}
    >
      <h3
        className="mb-6"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '20px',
          fontWeight: 600,
          color: 'var(--color-label-primary)',
        }}
      >
        Artículos relacionados
      </h3>
      <div className="grid gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-4 rounded-lg transition-colors hover:bg-slate-50"
            style={{
              border: '1px solid var(--color-separator)',
            }}
          >
            <h4
              className="mb-2"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
              }}
            >
              {post.title}
            </h4>
            <p
              className="mb-2 line-clamp-2"
              style={{
                fontSize: '14px',
                color: 'var(--color-label-secondary)',
              }}
            >
              {post.description}
            </p>
            <div
              className="flex items-center gap-3"
              style={{
                fontSize: '12px',
                color: 'var(--color-label-tertiary)',
              }}
            >
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {new Date(post.date).toLocaleDateString('es-CL', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {post.readingTime} min
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
