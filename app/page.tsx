'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Auth from "@/components/Auth";

export default function Home() {
  const { isAuthenticated, setUser } = useAuth();
  const router = useRouter();
  const [showInfoModal, setShowInfoModal] = useState(false);

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
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
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
      <div className="w-full max-w-md px-4 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 spring-motion">
          <div className="mb-6">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-4 spring-emphasized hover:scale-110"
              style={{
                background: 'var(--color-tint)',
                boxShadow: 'var(--shadow-raised)',
              }}
            >
              <svg
                className="w-10 h-10"
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
            className="font-semibold mb-3 spring-motion"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '44px',
              lineHeight: '1.1',
              letterSpacing: '-1px',
              color: 'var(--color-label-primary)',
            }}
          >
            PAES Chile
          </h1>

          <p
            className="spring-motion"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              lineHeight: '1.4',
              color: 'var(--color-label-secondary)',
            }}
          >
            Plataforma de Preparación Matemática
          </p>

          {/* Info Button */}
          <button
            onClick={() => setShowInfoModal(true)}
            className="spring-motion mt-4"
            style={{
              fontSize: '14px',
              color: 'var(--color-tint)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            cómo funciona
          </button>
        </div>

        {/* Auth Component */}
        <Auth
          onSuccess={() => {
            setUser(require('@/lib/auth').getCurrentUser());
            router.push('/dashboard');
          }}
        />

        {/* Footer Info */}
        <div
          className="text-center mt-8 spring-motion"
          style={{
            fontSize: '13px',
            color: 'var(--color-label-secondary)',
          }}
        >
          <p>Preparación para la Prueba de Acceso a la Educación Superior</p>
        </div>
      </div>

      {/* Info Modal */}
      {showInfoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={() => setShowInfoModal(false)}
        >
          <div
            className="translucent spring-motion max-w-lg w-full"
            style={{
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--spacing-16)',
              boxShadow: 'var(--shadow-raised)',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '24px',
                  fontWeight: 600,
                  color: 'var(--color-label-primary)',
                }}
              >
                cómo funciona esto
              </h2>
              <button
                onClick={() => setShowInfoModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  color: 'var(--color-label-secondary)',
                  cursor: 'pointer',
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="space-y-5">
              <div>
                <h3
                  style={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: 'var(--color-label-primary)',
                    marginBottom: '8px',
                  }}
                >
                  la idea
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: 'var(--color-label-secondary)',
                  }}
                >
                  práctica gratis de mate para la PAES. ejercicios reales del temario, feedback al tiro, y ves tu progreso en tiempo real. sin pagar, sin ads, sin webeo.
                </p>
              </div>

              <div>
                <h3
                  style={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: 'var(--color-label-primary)',
                    marginBottom: '8px',
                  }}
                >
                  qué puedes hacer
                </h3>
                <div className="space-y-2">
                  {[
                    'practicar con problemas del temario oficial',
                    'ver explicaciones cuando te equivocas',
                    'seguir tu progreso (ves dónde estás mejorando)',
                    'practicar en vivo con otros estudiantes',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span style={{ color: 'var(--color-tint)', marginTop: '4px', fontSize: '18px' }}>•</span>
                      <p
                        style={{
                          fontSize: '15px',
                          lineHeight: '1.6',
                          color: 'var(--color-label-secondary)',
                          margin: 0,
                        }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  style={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: 'var(--color-label-primary)',
                    marginBottom: '8px',
                  }}
                >
                  vale la pena
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: 'var(--color-label-secondary)',
                  }}
                >
                  cuando pagas por algo, lo usas de verdad. 8.000 al mes es menos que una salida al cine, pero puede ser la diferencia entre entrar o no entrar a la u que quieres.
                </p>
              </div>

              <div
                className="mt-6 p-4"
                style={{
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--color-fill)',
                  border: '1px solid var(--color-separator)',
                }}
              >
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.5',
                    color: 'var(--color-label-secondary)',
                    textAlign: 'center',
                  }}
                >
                  <strong>8.000 CLP/mes</strong> • 0 publicidad • cancelas cuando quieras
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowInfoModal(false)}
              className="spring-emphasized w-full mt-6"
              style={{
                height: '44px',
                padding: '0 var(--spacing-8)',
                fontSize: '16px',
                fontWeight: 600,
                color: 'white',
                background: 'var(--color-tint)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
              }}
            >
              ok, entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
