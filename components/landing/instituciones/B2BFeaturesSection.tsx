'use client';

import { BookOpen, Sparkles, ClipboardList, BarChart3, LineChart, Target } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Lecciones Listas para Proyectar',
    description: '40+ mini-lecciones interactivas. El profesor las proyecta en clase y enseña sin preparar material.',
  },
  {
    icon: Sparkles,
    title: 'Tutor AI para Cada Alumno',
    description: 'Después de clase, cada alumno practica con un tutor AI que lo guía cuando se traba.',
  },
  {
    icon: ClipboardList,
    title: 'Asignación de Tareas',
    description: 'Asigna práctica por tema o habilidad. Define fechas límite y ve quién la completó.',
  },
  {
    icon: BarChart3,
    title: 'Reportes por Estudiante',
    description: 'Precisión por tema, tiempo dedicado, áreas débiles. Identifica quién necesita ayuda.',
  },
  {
    icon: LineChart,
    title: 'Analytics de Curso',
    description: 'Tendencias grupales, temas problemáticos, comparativas entre secciones.',
  },
  {
    icon: Target,
    title: 'Práctica Adaptativa',
    description: 'El sistema detecta lagunas y refuerza automáticamente. Personalización a escala.',
  },
];

export function B2BFeaturesSection() {
  return (
    <section className="py-16 px-4" style={{ background: 'var(--color-fill)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-center mb-12"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 600,
            color: 'var(--color-label-primary)',
          }}
        >
          Herramientas para Educadores
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 spring-motion"
              style={{
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-separator)',
              }}
            >
              <div
                className="p-3 inline-flex mb-4"
                style={{
                  background: 'var(--color-tint)',
                  borderRadius: 'var(--radius-md)',
                  color: 'white',
                }}
              >
                <feature.icon size={24} />
              </div>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--color-label-primary)',
                  marginBottom: '8px',
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: 'var(--color-label-secondary)',
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
