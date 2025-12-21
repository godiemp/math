'use client';

import Link from 'next/link';
import { GraduationCap, Building2 } from 'lucide-react';

type Audience = 'b2c' | 'b2b';

interface HeroSectionProps {
  audience: Audience;
  onAudienceChange: (audience: Audience) => void;
}

const openIntercomDemo = () => {
  if (typeof window !== 'undefined' && window.Intercom) {
    window.Intercom('showNewMessage', 'Hola, quiero solicitar una demo para mi colegio');
  }
};

export function HeroSection({ audience, onAudienceChange }: HeroSectionProps) {
  const content = {
    b2c: {
      badge: 'PARA ESTUDIANTES',
      title: 'Prepara la PAES con Datos, No con Suerte',
      subtitle: 'Mini-lecciones que te explican el por qué. Tutor AI que te guía cuando te trabas. Práctica personalizada que se adapta a ti.',
      cta: 'Comenzar Gratis',
    },
    b2b: {
      badge: 'PARA COLEGIOS',
      title: 'Contenido Interactivo Listo para Proyectar y Practicar',
      subtitle: 'Tus profesores enseñan proyectando nuestras lecciones interactivas. Sin preparar material. Con reportes automáticos de cada alumno.',
      cta: 'Solicitar Demo',
    },
  };

  const current = content[audience];

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Audience Toggle */}
        <div className="mb-8">
          <div
            className="inline-flex gap-1 p-1"
            style={{
              background: 'var(--color-fill)',
              borderRadius: 'var(--radius-md)',
            }}
          >
          <button
            onClick={() => onAudienceChange('b2c')}
            className="flex items-center gap-2 px-4 py-2 spring-motion"
            style={{
              background: audience === 'b2c' ? 'var(--color-surface)' : 'transparent',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: audience === 'b2c' ? 600 : 400,
              color: audience === 'b2c' ? 'var(--color-tint)' : 'var(--color-label-secondary)',
              boxShadow: audience === 'b2c' ? 'var(--shadow-sm)' : 'none',
              fontSize: '14px',
            }}
          >
            <GraduationCap size={18} />
            Estudiantes
          </button>
          <button
            onClick={() => onAudienceChange('b2b')}
            className="flex items-center gap-2 px-4 py-2 spring-motion"
            style={{
              background: audience === 'b2b' ? 'var(--color-surface)' : 'transparent',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: audience === 'b2b' ? 600 : 400,
              color: audience === 'b2b' ? 'var(--color-tint)' : 'var(--color-label-secondary)',
              boxShadow: audience === 'b2b' ? 'var(--shadow-sm)' : 'none',
              fontSize: '14px',
            }}
          >
            <Building2 size={18} />
            Colegios
          </button>
          </div>
        </div>

        {/* Badge */}
        <div className="mb-6">
          <span
            className="inline-block px-4 py-2"
            style={{
              background: 'var(--color-tint)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}
          >
            {current.badge}
          </span>
        </div>

        {/* Title */}
        <h1
          className="mb-6 spring-motion"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: 'var(--color-label-primary)',
            letterSpacing: '-1px',
          }}
        >
          {current.title}
        </h1>

        {/* Subtitle */}
        <p
          className="mb-8 spring-motion"
          style={{
            fontSize: '18px',
            lineHeight: 1.6,
            color: 'var(--color-label-secondary)',
            maxWidth: '600px',
            margin: '0 auto 32px',
          }}
        >
          {current.subtitle}
        </p>

        {/* CTA */}
        {audience === 'b2c' ? (
          <Link
            href="/signin"
            className="inline-block spring-emphasized"
            style={{
              padding: '16px 40px',
              background: 'var(--color-tint)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              fontSize: '17px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            {current.cta}
          </Link>
        ) : (
          <button
            onClick={openIntercomDemo}
            className="spring-emphasized"
            style={{
              padding: '16px 40px',
              background: 'var(--color-tint)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              fontSize: '17px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {current.cta}
          </button>
        )}
      </div>
    </section>
  );
}
