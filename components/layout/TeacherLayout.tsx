'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

interface TeacherLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  name: string;
  path: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/teacher', icon: '🏠' },
  { name: 'Estudiantes', path: '/teacher/students', icon: '👥' },
  { name: 'Mis Clases', path: '/teacher/classes', icon: '📚' },
  { name: 'Mini-Lecciones', path: '/mini-lessons', icon: '📖' },
  { name: 'Configuración', path: '/teacher/settings', icon: '⚙️' },
];

export default function TeacherLayout({ children }: TeacherLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="h-full flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
          {/* Logo & Toggle */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
            {sidebarOpen && (
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Portal Profesor
              </h1>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {navItems.map((item) => {
                const isActive = pathname === item.path ||
                  (item.path !== '/teacher' && pathname.startsWith(item.path));
                return (
                  <button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {sidebarOpen && <span className="text-sm">{item.name}</span>}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
            <button
              onClick={() => router.push('/teacher/classes/new')}
              className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors ${
                !sidebarOpen ? 'px-2' : ''
              }`}
            >
              <span className="text-lg">+</span>
              {sidebarOpen && <span className="text-sm">Nueva Clase</span>}
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-xl">🚪</span>
              {sidebarOpen && <span className="text-sm">Salir</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
          <div className="h-full px-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {navItems.find((item) =>
                  pathname === item.path ||
                  (item.path !== '/teacher' && pathname.startsWith(item.path))
                )?.name || 'Portal Profesor'}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right mr-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Profesor Demo
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Plan Profesor
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-sm font-medium">
                P
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
