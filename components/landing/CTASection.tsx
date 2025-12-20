'use client';

import Link from 'next/link';

type Audience = 'b2c' | 'b2b';

interface CTASectionProps {
  audience: Audience;
}

const openIntercomDemo = () => {
  if (typeof window !== 'undefined' && window.Intercom) {
    window.Intercom('showNewMessage', 'Hola, quiero solicitar una demo para mi colegio');
  }
};

export function CTASection({ audience }: CTASectionProps) {
  const content = {
    b2c: {
      title: 'Comienza tu preparación hoy',
      subtitle: 'Practica con datos, no con suerte. Sube tu puntaje PAES.',
      cta: 'Comenzar Gratis',
    },
    b2b: {
      title: 'Potencia el aprendizaje en tu colegio',
      subtitle: 'Plataforma de matemáticas para educación media con reportes y seguimiento.',
      cta: 'Solicitar Demo',
    },
  };

  const current = content[audience];

  return (
    <section
      className="py-16 px-4"
      style={{
        background: 'linear-gradient(135deg, var(--color-tint) 0%, #5E5CE6 100%)',
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="mb-4"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 600,
            color: 'white',
          }}
        >
          {current.title}
        </h2>
        <p
          className="mb-8"
          style={{
            fontSize: '17px',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          {current.subtitle}
        </p>
        {audience === 'b2c' ? (
          <Link
            href="/signin"
            className="inline-block spring-emphasized"
            style={{
              padding: '16px 40px',
              background: 'white',
              color: 'var(--color-tint)',
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
              background: 'white',
              color: 'var(--color-tint)',
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
