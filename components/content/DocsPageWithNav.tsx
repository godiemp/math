'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
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

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentSlug]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navigationContent = (
    <>
      <Link
        href={`/curriculum/${level.toLowerCase()}/docs`}
        className={`block px-3 py-2 rounded-lg text-sm mb-2 transition-colors ${
          currentSlug === ''
            ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        📚 Inicio
      </Link>

      <Link
        href={`/curriculum/${level.toLowerCase()}/docs-export-all`}
        className="block px-3 py-2 rounded-lg text-sm mb-4 text-[#0A84FF] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        📄 Exportar Todo
      </Link>

      {docsStructure.sections.map((section) => (
        <div key={section.path} className="mb-4">
          <h3 className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">
            {section.title}
          </h3>
          <ul className="space-y-0.5">
            {section.items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/curriculum/${level.toLowerCase()}/docs/${item.slug}`}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
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
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed bottom-6 right-4 z-50 p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition-all duration-200 print:hidden"
        aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 print:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-[280px] bg-white dark:bg-[#121212] shadow-xl z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto print:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Navegación</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {navigationContent}
        </div>
      </div>

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
