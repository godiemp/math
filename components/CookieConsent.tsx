'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';

export default function CookieConsent() {
  const t = useTranslations('cookies');
  const [showBanner, setShowBanner] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Wait for auth to finish loading
    if (isLoading) {
      return;
    }

    // For authenticated users, sync from backend if available
    if (isAuthenticated && user?.cookieConsent) {
      // Sync backend preference to localStorage
      localStorage.setItem('cookie-consent', user.cookieConsent);
      return; // Don't show banner if user already has a preference
    }

    // Check localStorage for existing consent
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, [isAuthenticated, user, isLoading]);

  const updateBackendConsent = async (consent: 'accepted' | 'declined') => {
    if (!isAuthenticated) {
      return; // Only sync to backend if user is authenticated
    }

    try {
      const response = await fetch('/api/user/cookie-consent', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify({ cookieConsent: consent }),
      });

      if (!response.ok) {
        console.error('Failed to update cookie consent in backend');
      }
    } catch (error) {
      console.error('Error updating cookie consent:', error);
    }
  };

  const handleAccept = async () => {
    // Save to localStorage immediately
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);

    // Sync to backend if authenticated
    await updateBackendConsent('accepted');

    // Reload page to initialize analytics
    window.location.reload();
  };

  const handleDecline = async () => {
    // Save to localStorage immediately
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);

    // Sync to backend if authenticated
    await updateBackendConsent('declined');
  };

  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 spring-motion"
      style={{
        animation: 'slideUp 0.3s ease-out',
        pointerEvents: 'none',
      }}
    >
      <div
        className="translucent mx-4 mb-4 md:mx-8 md:mb-8 p-3 md:p-6 max-w-5xl md:mx-auto"
        style={{
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-raised)',
          border: '1px solid var(--color-separator)',
          pointerEvents: 'auto',
        }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          {/* Icon - hidden on mobile */}
          <div
            className="hidden md:flex flex-shrink-0"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-tint)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a10 10 0 1 0 9 14" />
              <circle cx="12" cy="12" r="2" />
              <path d="M12 2v2" />
              <path d="M12 18v2" />
              <path d="M4.93 4.93l1.41 1.41" />
              <path d="M17.66 17.66l1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M18 12h2" />
              <path d="M4.93 19.07l1.41-1.41" />
              <path d="M17.66 6.34l1.41-1.41" />
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1">
            <p
              style={{
                fontSize: '14px',
                lineHeight: '1.5',
                color: 'var(--color-label-secondary)',
              }}
            >
              {t('message')}{' '}
              <Link
                href="/legal/cookies"
                style={{
                  color: 'var(--color-tint)',
                  textDecoration: 'underline',
                }}
              >
                {t('moreInfo')}
              </Link>
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={handleDecline}
              className="spring-emphasized flex-1 md:flex-none"
              style={{
                height: '40px',
                padding: '0 20px',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                background: 'var(--color-fill)',
                border: '1px solid var(--color-separator)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {t('essentialOnly')}
            </button>
            <button
              onClick={handleAccept}
              className="spring-emphasized flex-1 md:flex-none"
              style={{
                height: '40px',
                padding: '0 20px',
                fontSize: '14px',
                fontWeight: 600,
                color: 'white',
                background: 'var(--color-tint)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {t('acceptAll')}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
