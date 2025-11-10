'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 spring-motion"
      style={{
        animation: 'slideUp 0.3s ease-out',
      }}
    >
      <div
        className="translucent mx-4 mb-4 md:mx-8 md:mb-8 p-4 md:p-6 max-w-5xl md:mx-auto"
        style={{
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-raised)',
          border: '1px solid var(--color-separator)',
        }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Icon */}
          <div
            className="flex-shrink-0"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-tint)',
              display: 'flex',
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
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '8px',
              }}
            >
              Uso de Cookies
            </h3>
            <p
              style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'var(--color-label-secondary)',
              }}
            >
              Utilizamos cookies esenciales para que la plataforma funcione correctamente, y cookies de análisis para mejorar tu experiencia.
              {' '}
              <Link
                href="/legal/cookies"
                style={{
                  color: 'var(--color-tint)',
                  textDecoration: 'underline',
                }}
              >
                Más información
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
              Solo Esenciales
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
              Aceptar Todas
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
