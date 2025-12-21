'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { BlogPostCard } from './BlogPostCard';
import { AudienceFilter } from './AudienceFilter';
import { type BlogPostMeta, type AudienceType, getAudienceFromTags } from '@/lib/blog-types';

interface BlogPostListProps {
  posts: BlogPostMeta[];
}

export function BlogPostList({ posts }: BlogPostListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedAudience = (searchParams.get('audiencia') as AudienceType) || 'todos';

  // Calculate counts for each audience
  const counts = useMemo(() => {
    const result: Record<AudienceType, number> = {
      todos: posts.length,
      estudiantes: 0,
      padres: 0,
      profesores: 0,
      directivos: 0,
    };

    posts.forEach((post) => {
      const audience = getAudienceFromTags(post.tags);
      result[audience]++;
    });

    return result;
  }, [posts]);

  // Filter posts by selected audience
  const filteredPosts = useMemo(() => {
    if (selectedAudience === 'todos') {
      return posts;
    }
    return posts.filter((post) => getAudienceFromTags(post.tags) === selectedAudience);
  }, [posts, selectedAudience]);

  const handleAudienceChange = (audience: AudienceType) => {
    const params = new URLSearchParams(searchParams.toString());
    if (audience === 'todos') {
      params.delete('audiencia');
    } else {
      params.set('audiencia', audience);
    }
    const newUrl = params.toString() ? `/blog?${params.toString()}` : '/blog';
    router.replace(newUrl, { scroll: false });
  };

  return (
    <>
      {/* Filter */}
      <div className="mb-10">
        <AudienceFilter
          selected={selectedAudience}
          onSelect={handleAudienceChange}
          counts={counts}
        />
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div
          className="text-center py-16"
          style={{ color: 'var(--color-label-secondary)' }}
        >
          <p>No hay artículos disponibles para esta categoría.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
