import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import { DocsContentWrapper } from '@/components/DocsContentWrapper';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ModuleAccessGuard } from '@/components/ModuleAccessGuard';
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
        <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#000000] print:bg-white">
        {/* Navbar */}
        <nav className="sticky top-0 z-30 h-14 backdrop-blur-[20px] bg-white/80 dark:bg-[#121212]/80 border-b border-black/[0.12] dark:border-white/[0.16] print:hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link
                href="/curriculum/m1"
                className="text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
              >
                ← Volver a Curriculum
              </Link>
              <h1 className="text-lg font-semibold text-[#0A84FF]">
                M1 - Documentación
              </h1>
            </div>
            <Link
              href="/dashboard"
              className="text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </nav>

        {/* Main layout */}
        <div className="flex">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-64 bg-white dark:bg-[#121212] border-r border-black/[0.12] dark:border-white/[0.16] h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto print:hidden">
            <div className="p-6">
              <Link
                href="/curriculum/m1/docs"
                className={`block mb-3 text-sm font-semibold ${
                  currentSlug === ''
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                📚 Inicio
              </Link>

              <Link
                href="/curriculum/m1/docs-export-all"
                className="block mb-6 text-sm font-semibold text-[#0A84FF] hover:text-[#0A84FF]/80 transition-colors"
              >
                📥 Exportar Todo
              </Link>

              {docsStructure.sections.map((section) => (
                <div key={section.path} className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/curriculum/m1/docs/${item.slug}`}
                          className={`block px-3 py-1.5 rounded text-sm ${
                            currentSlug === item.slug
                              ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <DocsContentWrapper content={content} title={pageTitle} />
        </div>
      </div>
      </ModuleAccessGuard>
    </ProtectedRoute>
  );
}
