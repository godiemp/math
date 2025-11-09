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
            ¿Qué es esto?
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
                Sobre esta plataforma
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
            <div className="space-y-4">
              <div>
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--color-label-primary)',
                    marginBottom: '8px',
                  }}
                >
                  ¿Qué es PAES Chile?
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: 'var(--color-label-secondary)',
                  }}
                >
                  Una plataforma para practicar matemáticas de la PAES. Ejercicios alineados con el temario oficial, retroalimentación inmediata y seguimiento de tu progreso.
                </p>
              </div>

              <div>
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--color-label-primary)',
                    marginBottom: '8px',
                  }}
                >
                  ¿Qué puedes hacer aquí?
                </h3>
                <div className="space-y-2">
                  {[
                    'Practicar con ejercicios del temario PAES',
                    'Ver explicaciones detalladas de cada problema',
                    'Seguir tu progreso en tiempo real',
                    'Practicar en vivo con otros estudiantes',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span style={{ color: 'var(--color-tint)', marginTop: '2px' }}>•</span>
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
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--color-label-primary)',
                    marginBottom: '8px',
                  }}
                >
                  ¿Por qué usar esto?
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: 'var(--color-label-secondary)',
                  }}
                >
                  Porque la práctica constante es clave. Esta plataforma te ayuda a identificar tus debilidades y mejorar específicamente en esas áreas. Todo gratis, sin trampas.
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
                  <strong>100% gratis</strong> • Sin publicidad • Hecho para estudiantes
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
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
