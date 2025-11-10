'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createPortal } from 'react-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showInfoModal, setShowInfoModal] = useState(false);

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
            onClick={(e) => {
              e.preventDefault();
              setShowInfoModal(true);
            }}
            className="spring-motion flex items-center gap-2"
            type="button"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              color: 'var(--color-label-secondary)',
              padding: '4px',
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

      {/* Mobile Info Modal */}
      {showInfoModal && typeof window !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 flex items-end justify-center"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
          onClick={() => setShowInfoModal(false)}
        >
          <div
            className="translucent spring-motion w-full max-w-md max-h-[85vh] overflow-y-auto"
            style={{
              borderRadius: '24px 24px 0 0',
              boxShadow: 'var(--shadow-raised)',
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
                  background: 'var(--color-separator)',
                }}
              />
            </div>

            {/* Content */}
            <div className="p-6 pb-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '22px',
                    fontWeight: 600,
                    color: 'var(--color-label-primary)',
                  }}
                >
                  Información Legal y Soporte
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

              {/* Sections */}
              <div className="space-y-6">
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
                        onClick={() => setShowInfoModal(false)}
                        style={{
                          fontSize: '14px',
                          color: 'var(--color-link)',
                          textDecoration: 'none',
                        }}
                      >
                        Términos y Condiciones
                      </Link>
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                      <Link
                        href="/legal/privacidad"
                        onClick={() => setShowInfoModal(false)}
                        style={{
                          fontSize: '14px',
                          color: 'var(--color-link)',
                          textDecoration: 'none',
                        }}
                      >
                        Política de Privacidad
                      </Link>
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                      <Link
                        href="/legal/cookies"
                        onClick={() => setShowInfoModal(false)}
                        style={{
                          fontSize: '14px',
                          color: 'var(--color-link)',
                          textDecoration: 'none',
                        }}
                      >
                        Política de Cookies
                      </Link>
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                      <Link
                        href="/legal/reembolsos"
                        onClick={() => setShowInfoModal(false)}
                        style={{
                          fontSize: '14px',
                          color: 'var(--color-link)',
                          textDecoration: 'none',
                        }}
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
                        onClick={() => setShowInfoModal(false)}
                        style={{
                          fontSize: '14px',
                          color: 'var(--color-link)',
                          textDecoration: 'none',
                        }}
                      >
                        Contacto
                      </Link>
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                      <a
                        href="mailto:soporte@paeschile.cl"
                        style={{
                          fontSize: '14px',
                          color: 'var(--color-link)',
                          textDecoration: 'none',
                        }}
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
                          color: 'var(--color-link)',
                          textDecoration: 'none',
                        }}
                      >
                        SERNAC
                      </a>
                    </li>
                    <li style={{ marginBottom: '4px', fontSize: '13px', color: 'var(--color-label-tertiary)' }}>
                      800 700 100
                    </li>
                  </ul>
                </div>

                {/* Copyright */}
                <div
                  className="pt-4 border-t"
                  style={{
                    borderColor: 'var(--color-separator)',
                  }}
                >
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-label-tertiary)',
                      textAlign: 'center',
                      margin: 0,
                    }}
                  >
                    © {currentYear} PAES Chile. Todos los derechos reservados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
