import { getAllPosts } from '@/lib/blog';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { SITE_URL } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - SimplePAES',
  description: 'Consejos, estrategias y recursos para mejorar en matemáticas y prepararte para la PAES.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Blog - SimplePAES',
    description: 'Consejos, estrategias y recursos para mejorar en matemáticas y prepararte para la PAES.',
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
    description: 'Consejos, estrategias y recursos para mejorar en matemáticas y prepararte para la PAES.',
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
        <section className="py-16 px-4 text-center">
          <div className="max-w-4xl mx-auto">
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
          <div className="max-w-4xl mx-auto">
            {posts.length === 0 ? (
              <div
                className="text-center py-16"
                style={{ color: 'var(--color-label-secondary)' }}
              >
                <p>Próximamente nuevos artículos...</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {posts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
