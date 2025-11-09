'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Auth from "@/components/Auth";

export default function Home() {
  const { isAuthenticated, setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'var(--color-bg)'
      }}
    >
      {/* Gradient Background Layer */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at 30% 20%, var(--color-tint) 0%, transparent 50%), radial-gradient(circle at 70% 80%, var(--color-tint-alt) 0%, transparent 50%)',
        }}
      />

      {/* Content Container */}
      <div className="w-full max-w-6xl mx-auto px-4 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left Column: Value Proposition & Trust Signals */}
          <div className="space-y-8 lg:sticky lg:top-12">

            {/* Hero Section */}
            <div className="spring-motion">
              <div className="mb-6">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 spring-emphasized"
                  style={{
                    background: 'var(--color-tint)',
                    boxShadow: 'var(--shadow-raised)',
                  }}
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>

              <h1
                className="font-semibold mb-4 spring-motion"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '48px',
                  lineHeight: '1.1',
                  letterSpacing: '-1.5px',
                  color: 'var(--color-label-primary)',
                }}
              >
                Prepara tu PAES Matemática con Confianza
              </h1>

              <p
                className="spring-motion mb-6"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '20px',
                  lineHeight: '1.5',
                  color: 'var(--color-label-secondary)',
                }}
              >
                Tu camino hacia la universidad empieza aquí. Practica con ejercicios reales, recibe retroalimentación inmediata y mejora tus resultados paso a paso.
              </p>

              {/* Value Props */}
              <div className="space-y-3">
                {[
                  { icon: '✓', text: 'Ejercicios alineados 100% con el temario PAES' },
                  { icon: '✓', text: 'Retroalimentación detallada en cada pregunta' },
                  { icon: '✓', text: 'Seguimiento de tu progreso en tiempo real' },
                  { icon: '✓', text: 'Sesiones de práctica en vivo con otros estudiantes' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 spring-motion">
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'var(--color-tint)',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </span>
                    <p
                      style={{
                        fontSize: '16px',
                        lineHeight: '1.5',
                        color: 'var(--color-label-primary)',
                        margin: 0,
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Signals */}
            <div
              className="translucent spring-motion p-6"
              style={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-separator)',
              }}
            >
              <p
                className="mb-4"
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-label-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Confían en Nosotros
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: '500+', label: 'Estudiantes activos' },
                  { value: '10K+', label: 'Ejercicios resueltos' },
                  { value: '85%', label: 'Mejora promedio' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div
                      style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        color: 'var(--color-tint)',
                        fontFamily: 'var(--font-heading)',
                        lineHeight: '1.2',
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        color: 'var(--color-label-secondary)',
                        marginTop: '4px',
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div
              className="translucent spring-motion p-6"
              style={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-separator)',
              }}
            >
              <div className="flex items-start gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: 'var(--color-tint)', fontSize: '16px' }}>★</span>
                ))}
              </div>
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: '1.6',
                  color: 'var(--color-label-primary)',
                  marginBottom: '12px',
                }}
              >
                "Esta plataforma me ayudó a entender conceptos que nunca pude dominar en clases. La práctica constante y la retroalimentación clara marcaron la diferencia en mi puntaje."
              </p>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-label-secondary)',
                }}
              >
                — María González, estudiante PAES 2024
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-2 spring-motion">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-label-secondary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-label-secondary)',
                }}
              >
                Tus datos están protegidos y seguros
              </p>
            </div>
          </div>

          {/* Right Column: Auth Form */}
          <div className="lg:pt-8">
            <Auth
              onSuccess={() => {
                setUser(require('@/lib/auth').getCurrentUser());
                router.push('/dashboard');
              }}
            />

            {/* Additional Info */}
            <div
              className="text-center mt-6 spring-motion"
              style={{
                fontSize: '13px',
                color: 'var(--color-label-secondary)',
              }}
            >
              <p>
                Preparación oficial para la Prueba de Acceso a la Educación Superior (PAES) de Chile
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-20 pt-12 border-t" style={{ borderColor: 'var(--color-separator)' }}>
          <h2
            className="text-center mb-12 spring-motion"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '32px',
              fontWeight: 600,
              letterSpacing: '-0.5px',
              color: 'var(--color-label-primary)',
            }}
          >
            Cómo Funciona
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Crea tu cuenta gratis',
                description: 'Regístrate en segundos y accede inmediatamente a todos los ejercicios y recursos.'
              },
              {
                step: '2',
                title: 'Practica a tu ritmo',
                description: 'Resuelve ejercicios del temario oficial, recibe feedback detallado y aprende de cada error.'
              },
              {
                step: '3',
                title: 'Mejora continuamente',
                description: 'Sigue tu progreso, identifica áreas débiles y observa cómo tus habilidades crecen día a día.'
              }
            ].map((step, i) => (
              <div key={i} className="text-center spring-motion">
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4"
                  style={{
                    background: 'var(--color-tint)',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {step.step}
                </div>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--color-label-primary)',
                    marginBottom: '8px',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: 'var(--color-label-secondary)',
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
