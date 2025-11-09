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
      <div className="w-full max-w-5xl mx-auto px-4 py-8 relative z-10">
        <div className="max-w-2xl mx-auto">

          {/* Hero Section */}
          <div className="text-center mb-12 spring-motion">
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
              className="font-bold mb-4 spring-motion"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '56px',
                lineHeight: '1.05',
                letterSpacing: '-2px',
                color: 'var(--color-label-primary)',
              }}
            >
              deja de estresarte
              <br />
              con la PAES
            </h1>

            <p
              className="spring-motion mb-8"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '22px',
                lineHeight: '1.4',
                color: 'var(--color-label-secondary)',
                maxWidth: '500px',
                margin: '0 auto 32px',
              }}
            >
              practica mate, ve tu progreso, aprende de tus errores. sin dramas, sin precios raros.
            </p>

            {/* Quick Stats - Minimal */}
            <div className="flex justify-center gap-8 mb-8">
              {[
                { value: '500+', label: 'users' },
                { value: '10k+', label: 'ejercicios' }
              ].map((stat, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      color: 'var(--color-label-primary)',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: '13px',
                      color: 'var(--color-label-secondary)',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auth Component */}
          <div className="max-w-md mx-auto">
            <Auth
              onSuccess={() => {
                setUser(require('@/lib/auth').getCurrentUser());
                router.push('/dashboard');
              }}
            />
          </div>

          {/* What You Get - Simple */}
          <div
            className="mt-12 p-6 translucent spring-motion"
            style={{
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-separator)',
            }}
          >
            <h3
              className="text-center mb-6"
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
              }}
            >
              esto es lo que hay
            </h3>

            <div className="space-y-3">
              {[
                { emoji: '📝', text: 'ejercicios del temario real de PAES' },
                { emoji: '📊', text: 'ves tu progreso en tiempo real' },
                { emoji: '💡', text: 'explicaciones cuando te equivocas' },
                { emoji: '👥', text: 'practica con otros (en vivo)' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 spring-motion">
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>
                    {item.emoji}
                  </span>
                  <p
                    style={{
                      fontSize: '16px',
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

          {/* Real Talk - Testimonial */}
          <div
            className="mt-8 p-6 translucent spring-motion"
            style={{
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-separator)',
            }}
          >
            <p
              style={{
                fontSize: '16px',
                lineHeight: '1.5',
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
                fontStyle: 'italic',
              }}
            >
              "honestamente me salvó. entendí cosas que ni en clases ni con preu pude cachar. lo mejor es que ves al tiro donde estás fallando"
            </p>
            <div
              style={{
                fontSize: '14px',
                color: 'var(--color-label-secondary)',
              }}
            >
              — maría, 750pts en mate (2024)
            </div>
          </div>

          {/* Footer - Simple */}
          <div
            className="text-center mt-8 spring-motion"
            style={{
              fontSize: '13px',
              color: 'var(--color-label-secondary)',
            }}
          >
            <p>gratis • sin webeo • hecho para estudiantes que quieren entrar a la u</p>
          </div>
        </div>
      </div>
    </div>
  );
}
