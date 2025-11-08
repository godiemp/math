interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'tip' | 'formula' | 'example';
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = {
    info: {
      container: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
      icon: '💡',
      title: 'text-blue-900 dark:text-blue-100',
      content: 'text-blue-800 dark:text-blue-200'
    },
    warning: {
      container: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
      icon: '⚠️',
      title: 'text-amber-900 dark:text-amber-100',
      content: 'text-amber-800 dark:text-amber-200'
    },
    success: {
      container: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800',
      icon: '✓',
      title: 'text-emerald-900 dark:text-emerald-100',
      content: 'text-emerald-800 dark:text-emerald-200'
    },
    tip: {
      container: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
      icon: '⚡',
      title: 'text-purple-900 dark:text-purple-100',
      content: 'text-purple-800 dark:text-purple-200'
    },
    formula: {
      container: 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700',
      icon: '📐',
      title: 'text-slate-900 dark:text-slate-100',
      content: 'text-slate-800 dark:text-slate-200'
    },
    example: {
      container: 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800',
      icon: '📝',
      title: 'text-indigo-900 dark:text-indigo-100',
      content: 'text-indigo-800 dark:text-indigo-200'
    }
  };

  const style = styles[type];

  return (
    <div className={`border-l-4 rounded-r-lg p-4 my-4 ${style.container}`}>
      {title && (
        <div className={`flex items-center gap-2 font-semibold mb-2 ${style.title}`}>
          <span className="text-lg">{style.icon}</span>
          <span>{title}</span>
        </div>
      )}
      <div className={style.content}>
        {children}
      </div>
    </div>
  );
}
