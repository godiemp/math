'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface DocItem {
  title: string;
  slug: string;
}

interface DocSection {
  title: string;
  path: string;
  items: DocItem[];
}

interface DocsStructure {
  sections: DocSection[];
}

interface DocsPageWithNavProps {
  docsStructure: DocsStructure;
  currentSlug: string;
  level: 'M1' | 'M2';
  children: React.ReactNode;
}

export function DocsPageWithNav({ docsStructure, currentSlug, level, children }: DocsPageWithNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationContent = (
    <>
      <Link
        href={`/curriculum/${level.toLowerCase()}/docs`}
        className={`block px-3 py-1.5 rounded text-sm mb-3 ${
          currentSlug === ''
            ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Inicio
      </Link>

      <Link
        href={`/curriculum/${level.toLowerCase()}/docs-export-all`}
        className="block px-3 py-1.5 rounded text-sm mb-6 text-[#0A84FF] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Exportar Todo
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
                  href={`/curriculum/${level.toLowerCase()}/docs/${item.slug}`}
                  className={`block px-3 py-1.5 rounded text-sm ${
                    currentSlug === item.slug
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <div className="lg:hidden sticky top-14 z-20 bg-white dark:bg-[#121212] border-b border-black/[0.12] dark:border-white/[0.16] print:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center gap-2 px-4 py-3 w-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          {isMobileMenuOpen ? 'Cerrar Menú' : 'Navegación'}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[7.5rem] z-10 bg-white dark:bg-[#121212] overflow-y-auto print:hidden">
          <div className="p-6">
            {navigationContent}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white dark:bg-[#121212] border-r border-black/[0.12] dark:border-white/[0.16] h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto print:hidden">
        <div className="p-6">
          {navigationContent}
        </div>
      </aside>

      {/* Main Content */}
      {children}
    </>
  );
}
