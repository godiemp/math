'use client';

import { Suspense, useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Auth from "@/components/auth/Auth";
import { useTranslations } from 'next-intl';

// Small component that reads search params - isolated for Suspense boundary
function SearchParamsReader({ onWelcomeParam }: { onWelcomeParam: (hasWelcome: boolean) => void }) {
  const searchParams = useSearchParams();
  const hasWelcomeParam = searchParams.get('welcome') === 'true';

  useEffect(() => {
    onWelcomeParam(hasWelcomeParam);
  }, [hasWelcomeParam, onWelcomeParam]);

  return null;
}

// Inner component that handles the main UI
function SignInContent() {
  const t = useTranslations('landing');
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [hasWelcomeParam, setHasWelcomeParam] = useState(false);

  // Callback to receive welcome param from SearchParamsReader
  const handleWelcomeParam = useCallback((hasWelcome: boolean) => {
    setHasWelcomeParam(hasWelcome);
  }, []);

  useEffect(() => {
    // Redirect when authenticated
    if (!isLoading && isAuthenticated) {
      const targetPath = redirectPath || (hasWelcomeParam ? '/dashboard?welcome=true' : '/dashboard');
      router.push(targetPath);
    }
  }, [isAuthenticated, isLoading, redirectPath, hasWelcomeParam, router]);

  // If authenticated, don't show login (useEffect will redirect to dashboard)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: 'var(--color-bg)'
      }}
    >
      {/* Read search params in isolated Suspense boundary */}
      <Suspense fallback={null}>
        <SearchParamsReader onWelcomeParam={handleWelcomeParam} />
      </Suspense>

      {/* Gradient Background Layer */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at 30% 20%, var(--color-tint) 0%, transparent 50%), radial-gradient(circle at 70% 80%, var(--color-tint-alt) 0%, transparent 50%)',
        }}
      />

      {/* Content Container */}
      <div className="flex-grow flex md:items-center justify-center relative z-10 pt-8 md:pt-0">
        <div className="w-full max-w-md px-4 pb-8">
          {/* Hero Section */}
          <div className="text-center mb-6 md:mb-8 spring-motion">
            <div className="mb-4 mt-4">
              <div
                className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-3xl mb-3 spring-emphasized hover:scale-110"
                style={{
                  background: 'var(--color-tint)',
                  boxShadow: 'var(--shadow-raised)',
                }}
              >
                <svg
                  className="w-8 h-8 md:w-10 md:h-10"
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
              className="font-semibold mb-2 md:mb-3 spring-motion"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 8vw, 44px)',
                lineHeight: '1.1',
                letterSpacing: '-1px',
                color: 'var(--color-label-primary)',
              }}
            >
              {t('title')}
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
              {t('subtitle')}
            </p>

            {/* Back to Home Link */}
            <Link
              href="/"
              className="spring-motion mt-4 inline-block"
              style={{
                fontSize: '14px',
                color: 'var(--color-tint)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Volver al inicio
            </Link>
          </div>

          {/* Auth Component */}
          <Auth
            onSuccess={(isNewUser) => {
              if (isNewUser) {
                setRedirectPath('/dashboard?welcome=true');
              }
            }}
          />

          {/* Footer Info */}
          <div
            className="text-center mt-6 md:mt-8 spring-motion"
            style={{
              fontSize: '13px',
              color: 'var(--color-label-secondary)',
            }}
          >
            <p>{t('fullTitle')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapper component with Suspense boundary for useSearchParams
export default function SignIn() {
  return (
    <Suspense fallback={null}>
      <SignInContent />
    </Suspense>
  );
}
