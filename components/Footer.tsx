'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenModal = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setShowInfoModal(true);
  };

  const handleCloseModal = () => {
    setShowInfoModal(false);
  };

  // Modal content
  const modalContent = showInfoModal && mounted ? (
    <div
      className="fixed inset-0 flex items-end justify-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
      }}
      onClick={handleCloseModal}
    >
      <div
        className="w-full max-w-md max-h-[85vh] overflow-y-auto"
        style={{
          borderRadius: '24px 24px 0 0',
          boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.2)',
          background: 'white',
          animation: 'slideUp 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div
            style={{
              width: '36px',
              height: '4px',
              borderRadius: '2px',
              background: '#d1d1d6',
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6 pb-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h2
              style={{
                fontSize: '22px',
                fontWeight: 600,
                color: '#000',
              }}
            >
              Información Legal y Soporte
            </h2>
            <button
              onClick={handleCloseModal}
              type="button"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '28px',
                color: '#8e8e93',
                cursor: 'pointer',
                padding: 0,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          {/* Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Company Info */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#000', marginBottom: '12px' }}>
                PAES Chile
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#636366' }}>
                Plataforma de preparación para la Prueba de Acceso a la Educación Superior
              </p>
            </div>

            {/* Legal */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#000', marginBottom: '12px' }}>
                Legal
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}>
                  <Link
                    href="/legal/terminos"
                    onClick={handleCloseModal}
                    style={{ fontSize: '14px', color: '#007AFF', textDecoration: 'none' }}
                  >
                    Términos y Condiciones
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link
                    href="/legal/privacidad"
                    onClick={handleCloseModal}
                    style={{ fontSize: '14px', color: '#007AFF', textDecoration: 'none' }}
                  >
                    Política de Privacidad
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link
                    href="/legal/cookies"
                    onClick={handleCloseModal}
                    style={{ fontSize: '14px', color: '#007AFF', textDecoration: 'none' }}
                  >
                    Política de Cookies
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link
                    href="/legal/reembolsos"
                    onClick={handleCloseModal}
                    style={{ fontSize: '14px', color: '#007AFF', textDecoration: 'none' }}
                  >
                    Política de Reembolsos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#000', marginBottom: '12px' }}>
                Soporte
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}>
                  <Link
                    href="/contacto"
                    onClick={handleCloseModal}
                    style={{ fontSize: '14px', color: '#007AFF', textDecoration: 'none' }}
                  >
                    Contacto
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a
                    href="mailto:soporte@paeschile.cl"
                    style={{ fontSize: '14px', color: '#007AFF', textDecoration: 'none' }}
                  >
                    soporte@paeschile.cl
                  </a>
                </li>
              </ul>
            </div>

            {/* Consumer Protection */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#000', marginBottom: '12px' }}>
                Protección al Consumidor
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}>
                  <a
                    href="https://www.sernac.cl"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '14px', color: '#007AFF', textDecoration: 'none' }}
                  >
                    SERNAC
                  </a>
                </li>
                <li style={{ fontSize: '13px', color: '#8e8e93' }}>
                  800 700 100
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid #d1d1d6' }}>
              <p style={{ fontSize: '12px', color: '#8e8e93', textAlign: 'center', margin: 0 }}>
                © {currentYear} PAES Chile. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Mobile: Compact info icon */}
      <footer
        className="mt-auto py-4 px-5 border-t md:hidden"
        style={{
          borderColor: 'var(--color-separator)',
          background: 'var(--color-bg)',
        }}
      >
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={handleOpenModal}
            className="spring-motion flex items-center gap-2"
            type="button"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              color: 'var(--color-label-secondary)',
              padding: '12px',
              pointerEvents: 'auto',
              zIndex: 1000,
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                border: '1.5px solid var(--color-label-secondary)',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: 'serif',
              }}
            >
              i
            </span>
            <span>Legal, Soporte y Contacto</span>
          </button>
        </div>
      </footer>

      {/* Desktop: Full footer */}
      <footer
        className="hidden md:block mt-auto py-8 md:py-10 px-5 border-t"
        style={{
          borderColor: 'var(--color-separator)',
          background: 'var(--color-bg)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Company Info */}
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}
            >
              PAES Chile
            </h3>
            <p
              style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'var(--color-label-secondary)',
              }}
            >
              Plataforma de preparación para la Prueba de Acceso a la Educación Superior
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}
            >
              Legal
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                <Link
                  href="/legal/terminos"
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-label-secondary)',
                    textDecoration: 'none',
                  }}
                  className="hover:underline"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link
                  href="/legal/privacidad"
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-label-secondary)',
                    textDecoration: 'none',
                  }}
                  className="hover:underline"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link
                  href="/legal/cookies"
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-label-secondary)',
                    textDecoration: 'none',
                  }}
                  className="hover:underline"
                >
                  Política de Cookies
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link
                  href="/legal/reembolsos"
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-label-secondary)',
                    textDecoration: 'none',
                  }}
                  className="hover:underline"
                >
                  Política de Reembolsos
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}
            >
              Soporte
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                <Link
                  href="/contacto"
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-label-secondary)',
                    textDecoration: 'none',
                  }}
                  className="hover:underline"
                >
                  Contacto
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a
                  href="mailto:soporte@paeschile.cl"
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-label-secondary)',
                    textDecoration: 'none',
                  }}
                  className="hover:underline"
                >
                  soporte@paeschile.cl
                </a>
              </li>
            </ul>
          </div>

          {/* Consumer Protection */}
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}
            >
              Protección al Consumidor
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                <a
                  href="https://www.sernac.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-label-secondary)',
                    textDecoration: 'none',
                  }}
                  className="hover:underline"
                >
                  SERNAC
                </a>
              </li>
              <li style={{ marginBottom: '4px', fontSize: '13px', color: 'var(--color-label-tertiary)' }}>
                800 700 100
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 md:pt-6 border-t"
          style={{
            borderColor: 'var(--color-separator)',
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-label-tertiary)',
                margin: 0,
              }}
            >
              © {currentYear} PAES Chile. Todos los derechos reservados.
            </p>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-label-tertiary)',
                margin: 0,
              }}
            >
              Hecho con ❤️ en Chile
            </p>
          </div>
        </div>
      </div>
    </footer>

      {/* Mobile Info Modal - Rendered via Portal */}
      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}
