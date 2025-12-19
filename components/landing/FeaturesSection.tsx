'use client';

import { BookOpen, MessageCircle, Target, BarChart3, Users, ClipboardList, LineChart, PieChart } from 'lucide-react';

type Audience = 'b2c' | 'b2b';

interface FeaturesSectionProps {
  audience: Audience;
}

export function FeaturesSection({ audience }: FeaturesSectionProps) {
  const features = {
    b2c: [
      {
        icon: BookOpen,
        title: 'Mini-Lecciones Interactivas',
        description: 'Te explican el por qué, no solo el cómo. Así el conocimiento se queda.',
      },
      {
        icon: MessageCircle,
        title: 'Tutor AI Socrático',
        description: 'Te guía con preguntas cuando te trabas —sin darte la respuesta directa.',
      },
      {
        icon: Target,
        title: 'Práctica Personalizada',
        description: 'Se adapta a tus debilidades. Si fallas en álgebra, te refuerza álgebra.',
      },
      {
        icon: BarChart3,
        title: 'Métricas Reales',
        description: 'Ve tu progreso con datos: tiempo por pregunta, temas débiles, curva de mejora.',
      },
    ],
    b2b: [
      {
        icon: Users,
        title: 'Reportes por Estudiante',
        description: 'Conoce el nivel exacto de cada alumno con métricas detalladas por tema.',
      },
      {
        icon: ClipboardList,
        title: 'Asignación de Tareas',
        description: 'Asigna práctica dirigida por tema o habilidad específica a tu curso.',
      },
      {
        icon: LineChart,
        title: 'Seguimiento en Tiempo Real',
        description: 'Monitorea el progreso grupal e individual mientras tus estudiantes practican.',
      },
      {
        icon: PieChart,
        title: 'Analytics Institucional',
        description: 'Datos agregados para toma de decisiones y planificación pedagógica.',
      },
    ],
  };

  const currentFeatures = features[audience];
  const sectionTitle = audience === 'b2c'
    ? 'Todo lo que necesitas para subir tu puntaje'
    : 'Herramientas para potenciar tu institución';

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
          {sectionTitle}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {currentFeatures.map((feature, i) => (
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
                    background: 'var(--color-tint)',
                    borderRadius: 'var(--radius-md)',
                    color: 'white',
                  }}
                >
                  <feature.icon size={24} />
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
