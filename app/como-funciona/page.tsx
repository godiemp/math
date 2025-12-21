'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FeatureSection } from '@/components/como-funciona/FeatureSection';
import { DemoShowcase } from '@/components/landing/DemoShowcase';
import { PracticeModesDemo } from '@/components/como-funciona/demos/PracticeModesDemo';
import { AITutorDemo } from '@/components/como-funciona/demos/AITutorDemo';
import { ProgressDemo } from '@/components/como-funciona/demos/ProgressDemo';
import { LivePracticeDemo } from '@/components/como-funciona/demos/LivePracticeDemo';

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          borderBottom: '1px solid var(--color-separator)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 spring-motion"
            style={{ color: 'var(--color-tint)' }}
          >
            <ArrowLeft size={20} />
            <span style={{ fontWeight: 500 }}>volver</span>
          </Link>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '20px',
              fontWeight: 600,
              color: 'var(--color-label-primary)',
            }}
          >
            SimplePAES
          </h1>
          <Link
            href="/signin"
            className="spring-motion"
            style={{
              padding: '8px 16px',
              background: 'var(--color-tint)',
              color: 'white',
              borderRadius: 'var(--radius-sm)',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            comenzar
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div
            className="inline-block px-4 py-2 mb-6"
            style={{
              background: 'var(--color-tint)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            CONOCE LA PLATAFORMA
          </div>
          <h1
            className="mb-6"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: 'var(--color-label-primary)',
            }}
          >
            Cada herramienta diseñada
            <br />
            para subir tu puntaje
          </h1>
          <p
            className="mb-8"
            style={{
              fontSize: '18px',
              lineHeight: 1.6,
              color: 'var(--color-label-secondary)',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            Explora las funcionalidades que te ayudarán a prepararte para la PAES
            con datos, no con suerte.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { number: '900+', label: 'ejercicios PAES' },
              { number: '20+', label: 'mini-lecciones' },
              { number: 'Tutor AI', label: 'disponible 24/7' },
              { number: '500+', label: 'habilidades medidas' },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4"
                style={{
                  background: 'var(--color-fill)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-separator)',
                }}
              >
                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-tint)' }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-label-secondary)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <FeatureSection
        title="Mini-Lecciones Interactivas"
        description="Cada lección te explica el por qué, no solo el cómo. Con visualizaciones animadas que hacen que los conceptos matemáticos cobren vida."
        bullets={[
          '5 pasos: problema, explora, explica, practica, verifica',
          'Visualizaciones interactivas de cada concepto',
          'Quiz al final para confirmar que entendiste',
        ]}
        demo={<DemoShowcase />}
      />

      <FeatureSection
        title="Dos Modos de Práctica"
        description="Elige cómo quieres entrenar: sin presión para aprender, o simulando las condiciones reales de la PAES."
        bullets={[
          'Modo Zen: A tu ritmo, sin límite de tiempo',
          'Desafío Contra el Reloj: Simula condiciones PAES',
          'El Tutor AI está disponible cuando te trabas',
        ]}
        demo={<PracticeModesDemo />}
        reversed
        bgColor="var(--color-fill)"
      />

      <FeatureSection
        title="Tutor AI Socrático"
        description="Cuando te trabas, el tutor te guía con preguntas. No te da la respuesta — te ayuda a pensar y desarrollar tu razonamiento."
        bullets={[
          'Disponible 24/7 en el Modo Zen',
          'Metodología Socrática: preguntas que guían',
          'Desarrolla pensamiento crítico, no dependencia',
        ]}
        demo={<AITutorDemo />}
      />

      <FeatureSection
        title="Métricas de Progreso"
        description="Ve exactamente dónde estás y qué necesitas mejorar. Sin adivinar, con datos reales de tu desempeño."
        bullets={[
          'Rendimiento detallado por tema',
          'Habilidades dominadas vs en progreso',
          'Predicción de tu puntaje PAES',
        ]}
        demo={<ProgressDemo />}
        reversed
        bgColor="var(--color-fill)"
      />

      <FeatureSection
        title="Ensayos en Vivo"
        description="Practica con otros estudiantes en sesiones grupales que simulan el día de la prueba. Competencia sana y resultados inmediatos."
        bullets={[
          'Sesiones programadas con otros estudiantes',
          'Competencia en tiempo real',
          'Ranking y resultados al terminar',
        ]}
        demo={<LivePracticeDemo />}
      />

      {/* CTA Section */}
      <section
        className="py-16 px-4 text-center"
        style={{ background: 'var(--color-fill)' }}
      >
        <div className="max-w-2xl mx-auto">
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '28px',
              fontWeight: 600,
              color: 'var(--color-label-primary)',
            }}
          >
            Sube tu puntaje con datos, no con suerte
          </h2>
          <p
            className="mb-6"
            style={{
              fontSize: '16px',
              color: 'var(--color-label-secondary)',
            }}
          >
            Comienza a entrenar para la PAES con práctica personalizada y métricas reales
          </p>
          <Link
            href="/signin"
            className="inline-block spring-emphasized"
            style={{
              padding: '14px 32px',
              background: 'var(--color-tint)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              fontSize: '17px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Comenzar ahora
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-4 text-center"
        style={{
          borderTop: '1px solid var(--color-separator)',
          color: 'var(--color-label-secondary)',
          fontSize: '14px',
        }}
      >
        SimplePAES - Preparación basada en datos para la PAES
      </footer>
    </div>
  );
}
