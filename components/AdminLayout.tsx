'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/Button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  name: string;
  path: string;
  icon: string;
}

interface MenuGroup {
  name: string;
  icon: string;
  items: NavItem[];
}

const menuGroups: MenuGroup[] = [
  {
    name: 'Monitoring & Sessions',
    icon: '📊',
    items: [
      { name: 'Live Sessions', path: '/admin/live-sessions', icon: '📊' },
      { name: 'Analytics', path: '/admin/analytics', icon: '📈' },
      { name: 'AI Analytics', path: '/admin/ai-analytics', icon: '🤖' },
      { name: 'System Health', path: '/admin/system-health', icon: '💚' },
    ],
  },
  {
    name: 'User Management',
    icon: '👥',
    items: [
      { name: 'Users', path: '/admin/users', icon: '👥' },
    ],
  },
  {
    name: 'Content Management',
    icon: '📚',
    items: [
      { name: 'Problems', path: '/admin/problems', icon: '❓' },
      { name: 'Abstract Problems', path: '/admin/abstract-problems', icon: '📚' },
    ],
  },
  {
    name: 'Tools',
    icon: '🛠️',
    items: [
      { name: 'Generator', path: '/admin/qgen', icon: '🎲' },
      { name: 'Upload', path: '/admin/upload', icon: '📤' },
    ],
  },
  {
    name: 'Debug Tools',
    icon: '🔧',
    items: [
      { name: 'Study Buddy Debug', path: '/admin/study-buddy-debug', icon: '🧠' },
      { name: 'Rapid Fire Debug', path: '/admin/rapidfire-debug', icon: '⚡' },
      { name: 'Zen Debug', path: '/admin/zen-debug', icon: '🧘' },
    ],
  },
];

// Flatten all items for header title lookup
const allNavItems: NavItem[] = menuGroups.flatMap(group => group.items);

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(menuGroups.map(group => group.name))
  );

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupName)) {
        next.delete(groupName);
      } else {
        next.add(groupName);
      }
      return next;
    });
  };

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
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Panel
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
            <div className="space-y-2 px-2">
              {menuGroups.map((group) => {
                const isExpanded = expandedGroups.has(group.name);
                const hasActiveItem = group.items.some(item => pathname === item.path);

                return (
                  <div key={group.name} className="space-y-1">
                    {/* Group Header */}
                    <button
                      onClick={() => toggleGroup(group.name)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                        hasActiveItem
                          ? 'bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span className="text-lg">{group.icon}</span>
                      {sidebarOpen && (
                        <>
                          <span className="text-xs font-semibold uppercase tracking-wider flex-1 text-left">
                            {group.name}
                          </span>
                          <span className={`text-xs transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                            ▶
                          </span>
                        </>
                      )}
                    </button>

                    {/* Submenu Items */}
                    {isExpanded && (
                      <div className={`space-y-0.5 ${sidebarOpen ? 'ml-4' : ''}`}>
                        {group.items.map((item) => {
                          const isActive = pathname === item.path;
                          return (
                            <button
                              key={item.path}
                              onClick={() => router.push(item.path)}
                              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                                isActive
                                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                            >
                              <span className="text-lg">{item.icon}</span>
                              {sidebarOpen && (
                                <span className="text-sm">{item.name}</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={() => router.push('/')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-xl">🏠</span>
              {sidebarOpen && <span className="text-sm">Back to Home</span>}
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
                {allNavItems.find((item) => item.path === pathname)?.name || 'Admin'}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/live/lobby')}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Live Practice
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
