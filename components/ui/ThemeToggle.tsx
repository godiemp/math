'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const getIcon = () => {
    if (theme === 'system') return <Monitor size={18} />;
    if (resolvedTheme === 'dark') return <Moon size={18} />;
    return <Sun size={18} />;
  };

  const getLabel = () => {
    if (theme === 'system') return 'Sistema';
    if (theme === 'dark') return 'Oscuro';
    return 'Claro';
  };

  return (
    <button
      onClick={cycleTheme}
      className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-[var(--color-label-secondary)] hover:text-[var(--color-label-primary)] hover:bg-[var(--color-fill)] transition-colors"
      aria-label={`Tema actual: ${getLabel()}. Clic para cambiar.`}
      title={getLabel()}
    >
      {getIcon()}
      <span className="hidden sm:inline">{getLabel()}</span>
    </button>
  );
}
