import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import { DocsContentWrapper } from '@/components/content/DocsContentWrapper';
import { DocsPageWithNav } from '@/components/content/DocsPageWithNav';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { ModuleAccessGuard } from '@/components/auth/ModuleAccessGuard';
import { notFound } from 'next/navigation';
import { m1DocsStructure, getAllDocSlugs } from '@/docs';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

// Use the centralized docs structure
const docsStructure = m1DocsStructure;

async function getMarkdownContent(slug: string[]): Promise<string | null> {
  try {
    const docsPath = path.join(process.cwd(), 'docs', 'curriculum', 'm1');

    // If no slug, load the main README
    if (!slug || slug.length === 0) {
      const readmePath = path.join(docsPath, 'README.md');
      const content = await fs.readFile(readmePath, 'utf8');
      return content;
    }

    // Build the file path from the slug
    const filePath = path.join(docsPath, ...slug) + '.md';
    const content = await fs.readFile(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return null;
  }
}

// Generate static params for all docs pages
export async function generateStaticParams() {
  const slugs = getAllDocSlugs(m1DocsStructure);
  return slugs.map((slug) => ({ slug }));
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params;
  const content = await getMarkdownContent(slug || []);

  if (!content) {
    notFound();
  }

  // Determine current page for sidebar highlighting and title
  const currentSlug = slug ? slug.join('/') : '';

  // Determine page title for PDF export
  let pageTitle = 'M1 - Documentación';
  if (currentSlug) {
    // Find the title from docsStructure
    for (const section of docsStructure.sections) {
      const item = section.items.find(i => i.slug === currentSlug);
      if (item) {
        pageTitle = item.title;
        break;
      }
    }
  }

  return (
    <ProtectedRoute>
      <ModuleAccessGuard moduleName="Documentación M1">
        <div className="min-h-screen bg-white dark:bg-[#000000] print:bg-white">
          {/* Navbar */}
          <nav className="sticky top-0 z-30 min-h-14 backdrop-blur-[20px] bg-white/80 dark:bg-[#121212]/80 border-b border-black/[0.12] dark:border-white/[0.16] print:hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-0 sm:h-14 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                <Link
                  href="/curriculum/m1"
                  className="text-xs sm:text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors whitespace-nowrap"
                >
                  ← Curriculum
                </Link>
                <h1 className="text-sm sm:text-base lg:text-lg font-semibold text-[#0A84FF]">
                  M1 - Documentación
                </h1>
              </div>
              <Link
                href="/dashboard"
                className="text-xs sm:text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </nav>

          {/* Main layout */}
          <div className="flex">
            <DocsPageWithNav
              docsStructure={docsStructure}
              currentSlug={currentSlug}
              level="M1"
            >
              <DocsContentWrapper content={content} title={pageTitle} isInicio={currentSlug === ''} />
            </DocsPageWithNav>
          </div>
        </div>
      </ModuleAccessGuard>
    </ProtectedRoute>
  );
}
