'use client';

import { Building2 } from 'lucide-react';

const openIntercomDemo = () => {
  if (typeof window !== 'undefined' && window.Intercom) {
    window.Intercom('showNewMessage', 'Hola, quiero solicitar una demo para mi colegio');
  }
};

export function B2BHeroSection() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div style={{ marginBottom: '24px' }}>
          <span
            className="inline-flex items-center gap-2"
            style={{
              padding: '8px 16px',
              background: 'var(--color-fill)',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--color-tint)',
              letterSpacing: '0.5px',
            }}
          >
            <Building2 size={16} />
            PARA COLEGIOS Y LICEOS
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 700,
            lineHeight: 1.1,
            color: 'var(--color-label-primary)',
            marginBottom: '24px',
          }}
        >
          Material Listo para Usar.
          <br />
          <span style={{ color: 'var(--color-tint)' }}>
            Resultados que Puedes Medir.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(17px, 2vw, 20px)',
            lineHeight: 1.6,
            color: 'var(--color-label-secondary)',
            maxWidth: '600px',
            margin: '0 auto 32px',
          }}
        >
          Lecciones interactivas de matemáticas para 1° a 4° medio.
          <br />
          Tus profesores enseñan, nosotros les damos el material.
        </p>

        {/* CTA */}
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
          Solicitar Demo
        </button>
      </div>
    </section>
  );
}
