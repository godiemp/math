'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { requestPasswordReset } from '@/lib/auth';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email) {
        toast.error('Por favor ingresa tu correo electrónico');
        setIsLoading(false);
        return;
      }

      const result = await requestPasswordReset(email);

      if (result.success) {
        setEmailSent(true);
        toast.success('Revisa tu correo para restablecer tu contraseña');
      } else {
        toast.error(result.error || 'Error al enviar el correo de recuperación');
      }
    } catch (error) {
      toast.error('Error de conexión. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-8)',
        background: 'var(--color-background)',
      }}
    >
      <div
        className="translucent spring-motion"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: 'clamp(24px, 5vw, 40px)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-ambient)',
        }}
      >
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1
            className="text-center font-semibold mb-2"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(24px, 5vw, 28px)',
              lineHeight: '1.2',
              letterSpacing: '-0.5px',
              color: 'var(--color-label-primary)',
            }}
          >
            {emailSent ? 'Revisa tu correo' : 'Recuperar contraseña'}
          </h1>
          <p
            className="text-center"
            style={{
              fontSize: '15px',
              color: 'var(--color-label-secondary)',
            }}
          >
            {emailSent
              ? 'Si existe una cuenta con ese correo, te hemos enviado un enlace para restablecer tu contraseña.'
              : 'Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.'}
          </p>
        </div>

        {!emailSent ? (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--color-label-primary)',
                    marginBottom: 'var(--spacing-2)',
                  }}
                >
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="spring-motion"
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 var(--spacing-6)',
                    fontSize: '17px',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-label-primary)',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-separator)',
                    borderRadius: 'var(--radius-sm)',
                    outline: 'none',
                  }}
                  placeholder="tu@email.com"
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-tint)';
                    e.target.style.borderWidth = '2px';
                    e.target.style.boxShadow = 'var(--shadow-ambient)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--color-separator)';
                    e.target.style.borderWidth = '1px';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="spring-emphasized"
                style={{
                  width: '100%',
                  height: '44px',
                  marginTop: 'var(--spacing-4)',
                  padding: '0 var(--spacing-8)',
                  fontSize: '17px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                  color: 'white',
                  background: isLoading ? 'var(--color-separator)' : 'var(--color-tint)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: 'var(--shadow-ambient)',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-raised)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-ambient)';
                  }
                }}
                onMouseDown={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'scale(0.98)';
                  }
                }}
                onMouseUp={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }
                }}
              >
                {isLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
              </button>

              {/* Back to Login Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="spring-motion"
                  style={{
                    fontWeight: 500,
                    fontSize: '15px',
                    color: 'var(--color-link)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  ← Volver al inicio de sesión
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div>
            {/* Success Message */}
            <div
              className="spring-motion"
              style={{
                fontSize: '15px',
                textAlign: 'center',
                color: 'var(--color-success)',
                background: 'var(--color-fill)',
                padding: 'var(--spacing-8)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-success)',
                marginBottom: 'var(--spacing-8)',
              }}
            >
              ✓ Si existe una cuenta con el correo {email}, recibirás un enlace para restablecer tu contraseña.
              El enlace expirará en 1 hora.
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
              <button
                onClick={() => router.push('/')}
                className="spring-emphasized"
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '0 var(--spacing-8)',
                  fontSize: '17px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                  color: 'white',
                  background: 'var(--color-tint)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: 'var(--shadow-ambient)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-raised)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-ambient)';
                }}
              >
                Volver al inicio
              </button>

              <button
                onClick={() => setEmailSent(false)}
                className="spring-motion"
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '0 var(--spacing-8)',
                  fontSize: '15px',
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-label-secondary)',
                  background: 'transparent',
                  border: '1px solid var(--color-separator)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-tint)';
                  e.currentTarget.style.color = 'var(--color-tint)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-separator)';
                  e.currentTarget.style.color = 'var(--color-label-secondary)';
                }}
              >
                Enviar de nuevo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
