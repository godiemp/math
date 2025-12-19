'use client';

import { Building2, Users, GraduationCap } from 'lucide-react';

const roles = [
  {
    icon: Building2,
    title: 'Director / Coordinador',
    subtitle: 'Visibilidad institucional',
    features: [
      'Dashboard de rendimiento por curso',
      'Comparativas entre secciones',
      'Reportes para apoderados',
    ],
  },
  {
    icon: Users,
    title: 'Jefe de Departamento',
    subtitle: 'Estandarización de la enseñanza',
    features: [
      'Material consistente entre profesores',
      'Seguimiento del avance curricular',
      'Identificación de brechas comunes',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Profesor de Aula',
    subtitle: 'Menos preparación, más impacto',
    features: [
      'Lecciones listas para proyectar',
      'Tareas que se corrigen solas',
      'Reportes individuales por alumno',
    ],
  },
];

export function DecisionMakersSection() {
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
          Diseñado para Tu Rol
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <div
              key={i}
              className="p-6 spring-motion"
              style={{
                background: 'white',
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
                <role.icon size={24} />
              </div>

              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--color-label-primary)',
                  marginBottom: '4px',
                }}
              >
                {role.title}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--color-tint)',
                  fontWeight: 500,
                  marginBottom: '16px',
                }}
              >
                {role.subtitle}
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {role.features.map((feature, j) => (
                  <li
                    key={j}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      fontSize: '14px',
                      color: 'var(--color-label-secondary)',
                      marginBottom: '8px',
                    }}
                  >
                    <span style={{ color: 'var(--color-tint)' }}>•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
