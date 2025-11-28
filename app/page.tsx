'use client';

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Auth from "@/components/auth/Auth";
import Footer from "@/components/layout/Footer";
import { useTranslations } from 'next-intl';

// Inner component that uses useSearchParams (requires Suspense boundary)
function HomeContent() {
  const t = useTranslations('landing');
  const tCommon = useTranslations('common');
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  // Check URL for welcome flag (middleware preserves query params when redirecting)
  const hasWelcomeParam = searchParams.get('welcome') === 'true';

  useEffect(() => {
    // Redirect when authenticated - uses redirectPath state, URL welcome param, or default
    if (!isLoading && isAuthenticated) {
      // Priority: redirectPath state > URL welcome param > default dashboard
      const targetPath = redirectPath || (hasWelcomeParam ? '/dashboard?welcome=true' : '/dashboard');
      router.push(targetPath);
    }
  }, [isAuthenticated, isLoading, redirectPath, hasWelcomeParam, router]);

  // While loading auth or if authenticated, don't show login
  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
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
      <div className="flex-grow flex md:items-center justify-center relative z-10 pt-8 md:pt-0">
        <div className="w-full max-w-md px-4 pb-8">
          {/* Hero Section */}
          <div className="text-center mb-6 md:mb-8 spring-motion">
            <div className="mb-4">
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

            {/* Info Button */}
            <Link
              href="/como-funciona"
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
              {t('sections.howItWorks')}
            </Link>
          </div>

          {/* Auth Component */}
          <Auth
            onSuccess={(isNewUser) => {
              // Set redirect path for new users (welcome flow)
              // NextAuth session is automatically updated after signIn()
              // The useEffect will handle navigation once isAuthenticated becomes true
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
              className="translucent spring-motion max-w-lg w-full p-6 md:p-8"
              style={{
                borderRadius: 'var(--radius-xl)',
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
                  {t('sections.howItWorks')}
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
                    {t('sections.whatIsThis')}
                  </h3>
                  <p
                    style={{
                      fontSize: '15px',
                      lineHeight: '1.6',
                      color: 'var(--color-label-secondary)',
                    }}
                  >
                    {t('hero.subtitle')}
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
                    {t('sections.whatIncludes')}
                  </h3>
                  <div className="space-y-2">
                    {(t.raw('whatIncludes.items') as string[]).map((item: string, i: number) => (
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
                    {t('sections.pricing')}
                  </h3>
                  <p
                    style={{
                      fontSize: '15px',
                      lineHeight: '1.6',
                      color: 'var(--color-label-secondary)',
                    }}
                  >
                    {t('description')}
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
                    {t('pricingSection.details')}
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
                {t('sections.okUnderstood')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Wrapper component with Suspense boundary for useSearchParams
export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
