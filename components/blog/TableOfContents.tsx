'use client';

import { useState } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Only show if there are 3+ headings
  if (headings.length < 3) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className="mb-8"
      style={{
        background: 'var(--color-fill-tertiary)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--color-label-primary)',
        }}
      >
        <span className="flex items-center gap-2">
          <List size={16} />
          Contenido
        </span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <ul className="mt-3 space-y-1">
          {headings.map((heading, index) => (
            <li
              key={index}
              style={{
                paddingLeft: `${(heading.level - 2) * 12}px`,
              }}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className="text-left w-full py-1 px-2 rounded transition-colors hover:bg-white/50"
                style={{
                  fontSize: '14px',
                  color: 'var(--color-label-secondary)',
                }}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
