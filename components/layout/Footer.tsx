'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
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
          background: 'var(--color-surface)',
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
              background: 'var(--color-separator-strong)',
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
                color: 'var(--color-label-primary)',
              }}
            >
              {t('subtitle')}
            </h2>
            <button
              onClick={handleCloseModal}
              type="button"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '28px',
                color: 'var(--color-label-secondary)',
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
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '12px' }}>
                PAES Chile
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--color-label-secondary)' }}>
                Plataforma de preparación para la Prueba de Acceso a la Educación Superior
              </p>
            </div>

            {/* Legal */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '12px' }}>
                Legal
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}>
                  <Link
                    href="/legal/terminos"
                    onClick={handleCloseModal}
                    style={{ fontSize: '14px', color: 'var(--color-link)', textDecoration: 'none' }}
                  >
                    {t('links.terms')}
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link
                    href="/legal/privacidad"
                    onClick={handleCloseModal}
                    style={{ fontSize: '14px', color: 'var(--color-link)', textDecoration: 'none' }}
                  >
                    {t('links.privacy')}
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link
                    href="/legal/cookies"
                    onClick={handleCloseModal}
                    style={{ fontSize: '14px', color: 'var(--color-link)', textDecoration: 'none' }}
                  >
                    {t('links.cookies')}
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link
                    href="/legal/reembolsos"
                    onClick={handleCloseModal}
                    style={{ fontSize: '14px', color: 'var(--color-link)', textDecoration: 'none' }}
                  >
                    {t('links.refunds')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '12px' }}>
                Soporte
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}>
                  <Link
                    href="/contacto"
                    onClick={handleCloseModal}
                    style={{ fontSize: '14px', color: 'var(--color-link)', textDecoration: 'none' }}
                  >
                    Contacto
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a
                    href="https://wa.me/56931338020"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '14px', color: 'var(--color-link)', textDecoration: 'none' }}
                  >
                    WhatsApp: +56 9 3133 8020
                  </a>
                </li>
              </ul>
            </div>

            {/* Consumer Protection */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '12px' }}>
                Protección al Consumidor
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}>
                  <a
                    href="https://www.sernac.cl"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '14px', color: 'var(--color-link)', textDecoration: 'none' }}
                  >
                    SERNAC
                  </a>
                </li>
                <li style={{ fontSize: '13px', color: 'var(--color-label-secondary)' }}>
                  800 700 100
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--color-separator)' }}>
              <p style={{ fontSize: '12px', color: 'var(--color-label-secondary)', textAlign: 'center', margin: 0 }}>
                {t('copyright')}
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
            <span>{t('title')}</span>
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
                  {t('links.terms')}
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
                  {t('links.privacy')}
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
                  {t('links.cookies')}
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
                  {t('links.refunds')}
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
                  href="https://wa.me/56931338020"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-label-secondary)',
                    textDecoration: 'none',
                  }}
                  className="hover:underline"
                >
                  WhatsApp: +56 9 3133 8020
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
              {t('copyright')}
            </p>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-label-tertiary)',
                margin: 0,
              }}
            >
              {t('madeIn')}
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
