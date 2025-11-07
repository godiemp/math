'use client';

import Link from 'next/link';

interface CurriculumSidebarProps {
  currentLevel: 'M1' | 'M2';
}

export function CurriculumSidebar({ currentLevel }: CurriculumSidebarProps) {
  const menuItems = [
    {
      level: 'M1',
      title: 'Matemática M1',
      description: 'Contenidos básicos',
      icon: '📐',
      href: '/curriculum/m1',
    },
    {
      level: 'M2',
      title: 'Matemática M2',
      description: 'Contenidos avanzados',
      icon: '🎓',
      href: '/curriculum/m2',
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-black/[0.12] dark:border-white/[0.16] bg-white/80 dark:bg-[#121212]/80 backdrop-blur-[20px]">
      <div className="p-6">
        <h2 className="text-sm font-semibold text-black/60 dark:text-white/60 uppercase tracking-wider mb-4">
          Currículos
        </h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = item.level === currentLevel;
            return (
              <Link
                key={item.level}
                href={item.href}
                className={`
                  block rounded-xl p-4 transition-all duration-200
                  ${isActive
                    ? 'bg-[#0A84FF] text-white shadow-lg shadow-[#0A84FF]/20'
                    : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.08] text-black/80 dark:text-white/80'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className={`font-semibold text-[15px] mb-1 ${isActive ? 'text-white' : 'text-black dark:text-white'}`}>
                      {item.title}
                    </div>
                    <div className={`text-xs ${isActive ? 'text-white/80' : 'text-black/60 dark:text-white/60'}`}>
                      {item.description}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
