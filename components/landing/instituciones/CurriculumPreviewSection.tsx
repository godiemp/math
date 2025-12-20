'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';

const levels = [
  {
    id: 'm1',
    name: '1° Medio',
    objectives: [
      'Resolver problemas con potencias de base racional y exponente entero',
      'Operar con raíces cuadradas y cúbicas',
      'Modelar situaciones con expresiones algebraicas',
      'Resolver ecuaciones lineales con una incógnita',
      'Aplicar teorema de Pitágoras y sus recíprocos',
      'Calcular probabilidades usando diagrama de árbol',
    ],
  },
  {
    id: 'm2',
    name: '2° Medio',
    objectives: [
      'Operar con números racionales y resolver ecuaciones',
      'Factorizar expresiones algebraicas',
      'Resolver sistemas de ecuaciones lineales (2x2)',
      'Representar funciones lineales y afines',
      'Aplicar semejanza de triángulos',
      'Analizar datos con medidas de posición y dispersión',
    ],
  },
  {
    id: 'm3',
    name: '3° Medio',
    objectives: [
      'Resolver ecuaciones cuadráticas y analizar discriminante',
      'Modelar con funciones cuadráticas y analizar sus gráficos',
      'Aplicar razones trigonométricas en triángulos rectángulos',
      'Resolver problemas con ley de senos y cosenos',
      'Calcular probabilidades con regla multiplicativa',
      'Aplicar distribución normal y binomial',
    ],
  },
  {
    id: 'm4',
    name: '4° Medio',
    objectives: [
      'Operar con logaritmos y resolver ecuaciones exponenciales',
      'Modelar crecimiento y decrecimiento exponencial',
      'Aplicar muestreo y analizar representatividad',
      'Calcular intervalos de confianza y margen de error',
      'Resolver problemas de combinatoria (permutaciones y combinaciones)',
      'Aplicar probabilidad condicional e independencia',
    ],
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
          Objetivos de Aprendizaje del Currículo
        </h2>
        <p
          className="text-center mb-12"
          style={{
            fontSize: '17px',
            color: 'var(--color-label-secondary)',
          }}
        >
          Mini-lecciones alineadas a los OA de 1° a 4° medio
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
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {level.objectives.map((objective, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontSize: '14px',
                          lineHeight: 1.5,
                          color: 'var(--color-label-secondary)',
                          marginBottom: i < level.objectives.length - 1 ? '10px' : 0,
                        }}
                      >
                        <span style={{ color: 'var(--color-tint)', flexShrink: 0 }}>•</span>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
