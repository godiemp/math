import { Calendar, Clock, Tag, User } from 'lucide-react';
import { getPostBySlug, getAllSlugs, getRelatedPosts, extractHeadings } from '@/lib/blog';
import { MarkdownViewer } from '@/components/content/MarkdownViewer';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SITE_URL } from '@/lib/constants';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post no encontrado - SimplePAES',
    };
  }

  const url = `${SITE_URL}/blog/${slug}`;

  return {
    title: `${post.title} - SimplePAES Blog`,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      siteName: 'SimplePAES',
      ...(post.image && { images: [{ url: post.image }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      ...(post.image && { images: [post.image] }),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const url = `${SITE_URL}/blog/${slug}`;
  const relatedPosts = getRelatedPosts(slug, post.tags);
  const headings = extractHeadings(post.content);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    ...(post.image && { image: post.image }),
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SimplePAES',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
        <BlogHeader backHref="/blog" backLabel="blog" />

        {/* Article */}
        <article className="px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumbs */}
            <div className="mb-6">
              <Breadcrumbs
                items={[
                  { label: 'Blog', href: '/blog' },
                  { label: post.title },
                ]}
              />
            </div>

            {/* Meta */}
            <div
              className="flex flex-wrap items-center gap-4 mb-6"
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
              <span className="flex items-center gap-1">
                <User size={14} />
                {post.author}
              </span>
            </div>

            {/* Title */}
            <h1
              className="mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 5vw, 42px)',
                fontWeight: 700,
                lineHeight: 1.2,
                color: 'var(--color-label-primary)'
              }}
            >
              {post.title}
            </h1>

            {/* Description */}
            <p
              className="mb-8"
              style={{
                fontSize: '20px',
                lineHeight: 1.6,
                color: 'var(--color-label-secondary)',
              }}
            >
              {post.description}
            </p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1"
                    style={{
                      padding: '4px 12px',
                      background: 'var(--color-fill-tertiary)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      color: 'var(--color-label-secondary)',
                    }}
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Table of Contents */}
            <TableOfContents headings={headings} />

            {/* Content */}
            <div
              style={{
                background: 'var(--color-bg-elevated)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-separator)',
                padding: 'clamp(24px, 5vw, 48px)',
              }}
            >
              <MarkdownViewer content={post.content} />
            </div>

            {/* Share */}
            <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--color-separator)' }}>
              <ShareButtons url={url} title={post.title} description={post.description} />
            </div>

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} />

            {/* CTA */}
            <div
              className="mt-12 text-center"
              style={{
                background: 'var(--color-fill-tertiary)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
              }}
            >
              <h3
                className="mb-3"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '24px',
                  fontWeight: 600,
                  color: 'var(--color-label-primary)',
                }}
              >
                Mejora tu puntaje PAES
              </h3>
              <p
                className="mb-6"
                style={{
                  fontSize: '16px',
                  color: 'var(--color-label-secondary)',
                }}
              >
                Practica con ejercicios adaptativos y recibe retroalimentación inmediata.
              </p>
              <Link
                href="/"
                className="inline-block transition-opacity hover:opacity-80"
                style={{
                  padding: '12px 24px',
                  background: 'var(--color-tint)',
                  color: 'white',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              >
                Comenzar gratis
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
