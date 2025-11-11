'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { resetPassword } from '@/lib/auth';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      toast.error('Token de restablecimiento inválido');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!token) {
        toast.error('Token de restablecimiento inválido');
        setIsLoading(false);
        return;
      }

      if (!password || !confirmPassword) {
        toast.error('Por favor completa todos los campos');
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        toast.error('La contraseña debe tener al menos 6 caracteres');
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        toast.error('Las contraseñas no coinciden');
        setIsLoading(false);
        return;
      }

      const result = await resetPassword(token, password);

      if (result.success) {
        setResetSuccess(true);
        toast.success('Contraseña restablecida exitosamente');
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        toast.error(result.error || 'Error al restablecer la contraseña');
      }
    } catch (error) {
      toast.error('Error de conexión. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
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
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(24px, 5vw, 28px)',
              color: 'var(--color-label-primary)',
              marginBottom: 'var(--spacing-4)',
            }}
          >
            Enlace inválido
          </h1>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--color-label-secondary)',
              marginBottom: 'var(--spacing-8)',
            }}
          >
            El enlace de restablecimiento es inválido o ha expirado.
          </p>
          <button
            onClick={() => router.push('/forgot-password')}
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
          >
            Solicitar nuevo enlace
          </button>
        </div>
      </div>
    );
  }

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
            {resetSuccess ? '¡Listo!' : 'Nueva contraseña'}
          </h1>
          <p
            className="text-center"
            style={{
              fontSize: '15px',
              color: 'var(--color-label-secondary)',
            }}
          >
            {resetSuccess
              ? 'Tu contraseña ha sido restablecida exitosamente.'
              : 'Ingresa tu nueva contraseña.'}
          </p>
        </div>

        {!resetSuccess ? (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--color-label-primary)',
                    marginBottom: 'var(--spacing-2)',
                  }}
                >
                  Nueva contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
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
                  placeholder="Mínimo 6 caracteres"
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

              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--color-label-primary)',
                    marginBottom: 'var(--spacing-2)',
                  }}
                >
                  Confirmar contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
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
                  placeholder="Repite tu contraseña"
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

              {/* Password Requirements */}
              <div
                style={{
                  fontSize: '13px',
                  color: 'var(--color-label-secondary)',
                  background: 'var(--color-fill)',
                  padding: 'var(--spacing-4)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                La contraseña debe tener al menos 6 caracteres.
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
                {isLoading ? 'Restableciendo...' : 'Restablecer contraseña'}
              </button>
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
              ✓ Tu contraseña ha sido restablecida exitosamente. Serás redirigido al inicio de sesión...
            </div>

            {/* Manual Redirect Button */}
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
              Ir al inicio de sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-background)',
        }}
      >
        <div style={{ fontSize: '17px', color: 'var(--color-label-secondary)' }}>
          Cargando...
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
