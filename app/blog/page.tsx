import { Suspense } from 'react';
import { getAllPosts } from '@/lib/blog';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { BlogPostList } from '@/components/blog/BlogPostList';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { SITE_URL } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - SimplePAES',
  description: 'Consejos, estrategias y recursos para dominar matemáticas de enseñanza media y prepararte para la PAES.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Blog - SimplePAES',
    description: 'Consejos, estrategias y recursos para dominar matemáticas de enseñanza media y prepararte para la PAES.',
    type: 'website',
    url: `${SITE_URL}/blog`,
    siteName: 'SimplePAES',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog SimplePAES',
    description: 'Consejos, estrategias y recursos para dominar matemáticas de enseñanza media y prepararte para la PAES.',
    url: `${SITE_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'SimplePAES',
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
        <BlogHeader />

        {/* Hero */}
        <section className="py-12 px-4 text-center">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <div className="mb-8 flex justify-center">
              <Breadcrumbs items={[{ label: 'Blog' }]} />
            </div>

            <h1
              className="mb-4"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 700,
                lineHeight: 1.2,
                color: 'var(--color-label-primary)'
              }}
            >
              Blog
            </h1>
            <p
              className="mb-6"
              style={{
                fontSize: '18px',
                lineHeight: 1.6,
                color: 'var(--color-label-secondary)',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              Estrategias, consejos y recursos para dominar las matemáticas y mejorar tu puntaje PAES.
            </p>

          </div>
        </section>

        {/* Posts Grid */}
        <section className="px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            <Suspense fallback={<div className="text-center py-8" style={{ color: 'var(--color-label-secondary)' }}>Cargando...</div>}>
              <BlogPostList posts={posts} />
            </Suspense>
          </div>
        </section>
      </div>
    </>
  );
}
