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
    <aside
      className="w-64 flex-shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r backdrop-blur-[20px]"
      style={{
        borderColor: 'var(--color-separator)',
        background: 'color-mix(in srgb, var(--color-surface) 80%, transparent)'
      }}
    >
      <div className="p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-label-secondary)' }}>
          Currículos
        </h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = item.level === currentLevel;
            return (
              <Link
                key={item.level}
                href={item.href}
                className="block rounded-xl p-4 transition-all duration-200"
                style={isActive
                  ? { background: 'var(--color-tint)', color: 'white' }
                  : { color: 'var(--color-label-primary)' }
                }
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-[15px] mb-1" style={{ color: isActive ? 'white' : 'var(--color-label-primary)' }}>
                      {item.title}
                    </div>
                    <div className="text-xs" style={{ color: isActive ? 'rgba(255,255,255,0.8)' : 'var(--color-label-secondary)' }}>
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
