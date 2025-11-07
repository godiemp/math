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
    </div>
  );
}
