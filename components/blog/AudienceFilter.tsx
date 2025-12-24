'use client';

import type { AudienceType } from '@/lib/blog-types';

interface AudienceFilterProps {
  selected: AudienceType;
  onSelect: (audience: AudienceType) => void;
  counts: Record<AudienceType, number>;
}

const AUDIENCES: { key: AudienceType; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'estudiantes', label: 'Estudiantes' },
  { key: 'padres', label: 'Padres' },
  { key: 'profesores', label: 'Profesores' },
  { key: 'directivos', label: 'Directivos' },
];

export function AudienceFilter({ selected, onSelect, counts }: AudienceFilterProps) {
  return (
    <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
      {AUDIENCES.map(({ key, label }) => {
        const isActive = selected === key;
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="pb-1 transition-all duration-200"
            style={{
              background: 'none',
              border: 'none',
              borderBottom: isActive ? '2px solid var(--color-tint)' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'var(--color-tint)' : 'var(--color-label-secondary)',
              padding: '4px 0',
            }}
          >
            {label}
            <span
              className="ml-1.5"
              style={{
                fontSize: '13px',
                color: isActive ? 'var(--color-tint)' : 'var(--color-label-tertiary)',
                fontWeight: 400,
              }}
            >
              ({counts[key]})
            </span>
          </button>
        );
      })}
    </nav>
  );
}
