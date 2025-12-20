'use client';

import { BookOpen, Users, LineChart } from 'lucide-react';

const steps = [
  {
    icon: BookOpen,
    number: '1',
    title: 'Proyecta en clase',
    description: 'El profesor proyecta la mini-lección y enseña con material interactivo listo. Sin preparar nada.',
  },
  {
    icon: Users,
    number: '2',
    title: 'Los alumnos practican',
    description: 'Después de la clase, cada alumno practica a su ritmo. El tutor AI los guía cuando se traban.',
  },
  {
    icon: LineChart,
    number: '3',
    title: 'Recibe reportes automáticos',
    description: 'Ve qué temas domina cada alumno y dónde necesita refuerzo. Interviene a tiempo con datos reales.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 px-4">
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
          Cómo Funciona SimplePAES para Colegios
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="text-center spring-motion"
            >
              {/* Icon with number */}
              <div
                className="relative inline-flex items-center justify-center mb-6"
                style={{ width: '80px', height: '80px' }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'var(--color-tint)',
                    borderRadius: 'var(--radius-lg)',
                    opacity: 0.1,
                  }}
                />
                <step.icon
                  size={32}
                  style={{ color: 'var(--color-tint)' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    width: '24px',
                    height: '24px',
                    background: 'var(--color-tint)',
                    borderRadius: 'var(--radius-full)',
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {step.number}
                </span>
              </div>

              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--color-label-primary)',
                  marginBottom: '12px',
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: 'var(--color-label-secondary)',
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
