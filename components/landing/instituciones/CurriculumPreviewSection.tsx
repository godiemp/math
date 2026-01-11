'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';

const levels = [
  {
    id: 'b7',
    name: '7° Básico',
    objectives: [
      'Comprender adición y sustracción de números enteros',
      'Multiplicar y dividir fracciones y decimales',
      'Utilizar proporciones directas e inversas',
      'Calcular porcentajes en contextos diversos',
      'Aplicar propiedades del círculo',
      'Interpretar tablas de frecuencia y gráficos',
    ],
  },
  {
    id: 'b8',
    name: '8° Básico',
    objectives: [
      'Operar con números enteros y racionales',
      'Resolver ecuaciones e inecuaciones lineales',
      'Comprender y graficar funciones lineales y afines',
      'Aplicar teorema de Pitágoras',
      'Factorizar expresiones algebraicas',
      'Calcular probabilidades con principio multiplicativo',
    ],
  },
  {
    id: 'm1',
    name: '1° Medio',
    objectives: [
      'Resolver problemas con potencias de base racional y exponente entero',
      'Desarrollar productos notables',
      'Resolver sistemas de ecuaciones lineales (2x2)',
      'Aplicar homotecia y teorema de Tales',
      'Calcular áreas y volúmenes de conos',
      'Desarrollar reglas de probabilidad usando diagramas de árbol',
    ],
  },
  {
    id: 'm2',
    name: '2° Medio',
    objectives: [
      'Operar con números reales, raíces n-ésimas y logaritmos',
      'Comprender y graficar funciones cuadráticas',
      'Resolver ecuaciones cuadráticas de distintas formas',
      'Aplicar razones trigonométricas en triángulos rectángulos',
      'Calcular probabilidades usando permutaciones y combinaciones',
      'Comprender porcentaje de cambio e interés compuesto',
    ],
  },
  {
    id: 'm3',
    name: '3° Medio',
    objectives: [
      'Operar con números complejos (adición, multiplicación, división)',
      'Aplicar modelos de funciones exponenciales y logarítmicas',
      'Modelar fenómenos de crecimiento y decrecimiento',
      'Resolver problemas de relaciones métricas en la circunferencia',
      'Analizar datos con medidas de dispersión',
      'Aplicar probabilidad condicional en toma de decisiones',
    ],
  },
  {
    id: 'm4',
    name: '4° Medio',
    objectives: [
      'Tomar decisiones financieras usando porcentajes y tasas de interés',
      'Aplicar distribución binomial y normal en situaciones de incerteza',
      'Modelar fenómenos con funciones potencia y trigonométricas',
      'Resolver problemas de recta y circunferencia en el plano',
      'Analizar críticamente datos estadísticos',
      'Fundamentar decisiones en el ámbito económico personal',
    ],
  },
];

export function CurriculumPreviewSection() {
  const [expandedLevel, setExpandedLevel] = useState<string | null>('b7');

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
          Mini-lecciones alineadas a los OA de 7° Básico a 4° Medio
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
                  background: expandedLevel === level.id ? 'var(--color-fill)' : 'var(--color-surface)',
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
                    background: 'var(--color-surface)',
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
