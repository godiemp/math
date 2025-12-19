'use client';

import Link from 'next/link';

type Audience = 'b2c' | 'b2b';

interface CTASectionProps {
  audience: Audience;
}

export function CTASection({ audience }: CTASectionProps) {
  const content = {
    b2c: {
      title: 'Comienza tu preparación hoy',
      subtitle: 'Practica con datos, no con suerte. Sube tu puntaje PAES.',
      cta: 'Comenzar Gratis',
      ctaHref: '/signin',
    },
    b2b: {
      title: 'Mejora los resultados de tu institución',
      subtitle: 'Reportes detallados, seguimiento en tiempo real, datos para tomar decisiones.',
      cta: 'Solicitar Demo',
      ctaHref: '/contacto',
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
        <Link
          href={current.ctaHref}
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
      </div>
    </section>
  );
}
