'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/como-funciona', label: 'Cómo Funciona' },
    { href: '/pricing', label: 'Precios' },
    { href: '/blog', label: 'Blog' },
    { href: '/contacto', label: 'Contacto' },
  ];

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        borderBottom: '1px solid var(--color-separator)'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 spring-motion"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: 'var(--color-tint)',
              }}
            >
              <svg
                className="w-5 h-5"
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
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '20px',
                fontWeight: 600,
                color: 'var(--color-label-primary)'
              }}
            >
              SimplePAES
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="spring-motion"
                style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'var(--color-label-secondary)',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/signin"
              className="spring-motion"
              style={{
                padding: '8px 16px',
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--color-tint)',
                background: 'transparent',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/signin"
              className="spring-emphasized"
              style={{
                padding: '8px 16px',
                fontSize: '15px',
                fontWeight: 600,
                color: 'white',
                background: 'var(--color-tint)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              Comenzar Gratis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-label-primary)'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 spring-motion">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2"
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'var(--color-label-primary)',
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4" style={{ borderTop: '1px solid var(--color-separator)' }}>
                <Link
                  href="/signin"
                  className="text-center py-3"
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'var(--color-tint)',
                    border: '1px solid var(--color-tint)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/signin"
                  className="text-center py-3"
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'white',
                    background: 'var(--color-tint)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Comenzar Gratis
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
