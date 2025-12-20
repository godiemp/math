'use client';

import { Clock, XCircle, Users, BarChart3 } from 'lucide-react';

const painPoints = [
  {
    icon: Clock,
    title: 'Preparar material toma horas',
    description: 'Los profesores dedican demasiado tiempo creando presentaciones y ejercicios en vez de enseñando.',
  },
  {
    icon: XCircle,
    title: 'Material desactualizado o genérico',
    description: 'Los libros de texto no se adaptan al currículo actual ni ofrecen interactividad.',
  },
  {
    icon: Users,
    title: 'Imposible personalizar para 35 alumnos',
    description: 'Cada estudiante tiene lagunas distintas. Atenderlas individualmente es inviable.',
  },
  {
    icon: BarChart3,
    title: 'Sin visibilidad del progreso real',
    description: 'Las notas llegan muy tarde. No hay datos para intervenir a tiempo.',
  },
];

export function PainPointsSection() {
  return (
    <section className="py-16 px-4" style={{ background: 'var(--color-fill)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-center mb-4"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 600,
            color: 'var(--color-label-primary)',
          }}
        >
          ¿Te suena familiar?
        </h2>
        <p
          className="text-center"
          style={{
            fontSize: '17px',
            color: 'var(--color-label-secondary)',
            maxWidth: '500px',
            margin: '0 auto 48px',
          }}
        >
          Estos son los problemas que enfrentan los educadores todos los días.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {painPoints.map((point, i) => (
            <div
              key={i}
              className="p-6 spring-motion"
              style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-separator)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-3 flex-shrink-0"
                  style={{
                    background: 'rgba(255, 59, 48, 0.1)',
                    borderRadius: 'var(--radius-md)',
                    color: '#FF3B30',
                  }}
                >
                  <point.icon size={24} />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: 'var(--color-label-primary)',
                      marginBottom: '8px',
                    }}
                  >
                    {point.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.6,
                      color: 'var(--color-label-secondary)',
                    }}
                  >
                    {point.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
