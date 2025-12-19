'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';

const levels = [
  {
    id: 'm1',
    name: '1° Medio',
    topics: ['Números', 'Álgebra', 'Geometría', 'Probabilidad y Estadística'],
  },
  {
    id: 'm2',
    name: '2° Medio',
    topics: ['Números Racionales', 'Expresiones Algebraicas', 'Geometría Analítica', 'Funciones'],
  },
  {
    id: 'm3',
    name: '3° Medio',
    topics: ['Números Complejos', 'Funciones Cuadráticas', 'Trigonometría', 'Probabilidad'],
  },
  {
    id: 'm4',
    name: '4° Medio',
    topics: ['Logaritmos', 'Funciones Exponenciales', 'Límites', 'Derivadas'],
  },
];

export function CurriculumPreviewSection() {
  const [expandedLevel, setExpandedLevel] = useState<string | null>('m1');

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-center mb-4"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 600,
            color: 'var(--color-label-primary)',
          }}
        >
          Contenido Alineado al Currículo
        </h2>
        <p
          className="text-center mb-12"
          style={{
            fontSize: '17px',
            color: 'var(--color-label-secondary)',
          }}
        >
          Cubre matemáticas de 1° a 4° medio
        </p>

        <div
          style={{
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-separator)',
            overflow: 'hidden',
          }}
        >
          {levels.map((level) => (
            <div key={level.id}>
              <button
                onClick={() => setExpandedLevel(expandedLevel === level.id ? null : level.id)}
                className="w-full spring-motion"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: expandedLevel === level.id ? 'var(--color-fill)' : 'white',
                  border: 'none',
                  borderBottom: '1px solid var(--color-separator)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div className="flex items-center gap-3">
                  <BookOpen size={20} style={{ color: 'var(--color-tint)' }} />
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: 'var(--color-label-primary)',
                    }}
                  >
                    {level.name}
                  </span>
                </div>
                {expandedLevel === level.id ? (
                  <ChevronDown size={20} style={{ color: 'var(--color-label-tertiary)' }} />
                ) : (
                  <ChevronRight size={20} style={{ color: 'var(--color-label-tertiary)' }} />
                )}
              </button>

              {expandedLevel === level.id && (
                <div
                  style={{
                    padding: '16px 20px 16px 52px',
                    background: 'white',
                    borderBottom: '1px solid var(--color-separator)',
                  }}
                >
                  <div className="flex flex-wrap gap-2">
                    {level.topics.map((topic, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '6px 12px',
                          background: 'var(--color-fill)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '14px',
                          color: 'var(--color-label-secondary)',
                        }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
