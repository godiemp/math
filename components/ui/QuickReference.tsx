interface QuickReferenceProps {
  title?: string;
  items: {
    label: string;
    formula: string;
    description?: string;
  }[];
}

export function QuickReference({ title = "📌 Referencia Rápida", items }: QuickReferenceProps) {
  return (
    <div className="not-prose my-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-950/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700"
          >
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
              {item.label}
            </div>
            <div className="font-mono text-sm text-slate-900 dark:text-slate-100 mb-2">
              {item.formula}
            </div>
            {item.description && (
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {item.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
