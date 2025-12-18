'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  nameKey: string;
  path: string;
  icon: string;
}

interface MenuGroup {
  nameKey: string;
  icon: string;
  items: NavItem[];
}

const menuGroupsConfig: MenuGroup[] = [
  {
    nameKey: 'monitoring',
    icon: '📊',
    items: [
      { nameKey: 'liveSessions', path: '/admin/live-sessions', icon: '📊' },
      { nameKey: 'certificates', path: '/admin/certificates', icon: '🎓' },
      { nameKey: 'analytics', path: '/admin/analytics', icon: '📈' },
      { nameKey: 'pmfMetrics', path: '/admin/pmf-metrics', icon: '🎯' },
      { nameKey: 'aiAnalytics', path: '/admin/ai-analytics', icon: '🤖' },
      { nameKey: 'systemHealth', path: '/admin/system-health', icon: '💚' },
    ],
  },
  {
    nameKey: 'userManagement',
    icon: '👥',
    items: [
      { nameKey: 'users', path: '/admin/users', icon: '👥' },
    ],
  },
  {
    nameKey: 'contentManagement',
    icon: '📚',
    items: [
      { nameKey: 'problems', path: '/admin/problems', icon: '❓' },
      { nameKey: 'abstractProblems', path: '/admin/abstract-problems', icon: '📚' },
    ],
  },
  {
    nameKey: 'tools',
    icon: '🛠️',
    items: [
      { nameKey: 'generator', path: '/admin/qgen', icon: '🎲' },
      { nameKey: 'upload', path: '/admin/upload', icon: '📤' },
    ],
  },
  {
    nameKey: 'sales',
    icon: '💼',
    items: [
      { nameKey: 'schools', path: '/admin/schools', icon: '🏫' },
    ],
  },
  {
    nameKey: 'debugTools',
    icon: '🔧',
    items: [
      { nameKey: 'studyBuddyDebug', path: '/admin/study-buddy-debug', icon: '🧠' },
      { nameKey: 'rapidFireDebug', path: '/admin/rapidfire-debug', icon: '⚡' },
      { nameKey: 'zenDebug', path: '/admin/zen-debug', icon: '🧘' },
      { nameKey: 'liveSessionDebug', path: '/admin/live-session-debug', icon: '🎮' },
    ],
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const tGroups = useTranslations('admin.groups');
  const tItems = useTranslations('admin.items');
  const tButton = useTranslations('admin.button');
  const tSidebar = useTranslations('admin.sidebar');
  const tHeader = useTranslations('admin.header');
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(menuGroupsConfig.map(group => group.nameKey))
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
                {tSidebar('title')}
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
              {menuGroupsConfig.map((group) => {
                const isExpanded = expandedGroups.has(group.nameKey);
                const hasActiveItem = group.items.some(item => pathname === item.path);

                return (
                  <div key={group.nameKey} className="space-y-1">
                    {/* Group Header */}
                    <button
                      onClick={() => toggleGroup(group.nameKey)}
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
                            {tGroups(group.nameKey)}
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
                                <span className="text-sm">{tItems(item.nameKey)}</span>
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
              {sidebarOpen && <span className="text-sm">{tButton('backToHome')}</span>}
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
                {(() => {
                  const foundItem = menuGroupsConfig
                    .flatMap(group => group.items)
                    .find(item => item.path === pathname);
                  return foundItem ? tItems(foundItem.nameKey) : tHeader('defaultTitle');
                })()}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/live/lobby')}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {tButton('livePractice')}
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
