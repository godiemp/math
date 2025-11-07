'use client';

import { useState } from 'react';
import { registerUser, loginUser } from '@/lib/auth';

interface AuthProps {
  onSuccess: () => void;
}

export default function Auth({ onSuccess }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login
        if (!username || !password) {
          setError('Por favor completa todos los campos');
          setIsLoading(false);
          return;
        }

        const result = await loginUser(username, password);
        if (result.success) {
          onSuccess();
        } else {
          setError(result.error || 'Error al iniciar sesión');
        }
      } else {
        // Register
        if (!username || !email || !password || !displayName) {
          setError('Por favor completa todos los campos');
          setIsLoading(false);
          return;
        }

        if (password.length < 6) {
          setError('La contraseña debe tener al menos 6 caracteres');
          setIsLoading(false);
          return;
        }

        const result = await registerUser(username, email, password, displayName);
        if (result.success) {
          onSuccess();
        } else {
          setError(result.error || 'Error al registrarse');
        }
      }
    } catch (err) {
      setError('Error de conexión. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full translucent spring-motion"
      style={{
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--spacing-16)',
        boxShadow: 'var(--shadow-ambient)',
      }}
    >
      {/* Header */}
      <div className="mb-8">
        <h2
          className="text-center font-semibold mb-2"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '28px',
            lineHeight: '1.2',
            letterSpacing: '-0.5px',
            color: 'var(--color-label-primary)',
          }}
        >
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h2>
        <p
          className="text-center"
          style={{
            fontSize: '15px',
            color: 'var(--color-label-secondary)',
          }}
        >
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          {' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="spring-motion"
            style={{
              fontWeight: 500,
              color: 'var(--color-link)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            {isLogin ? 'Regístrate gratis' : 'Inicia sesión'}
          </button>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--color-label-primary)',
                marginBottom: 'var(--spacing-2)',
              }}
            >
              {isLogin ? 'Usuario o Email' : 'Nombre de Usuario'}
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              placeholder={isLogin ? 'usuario o email@ejemplo.com' : 'usuario123'}
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
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              placeholder={isLogin ? 'Tu contraseña' : 'Mínimo 6 caracteres'}
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

          {/* Email Input (Register Only) */}
          {!isLogin && (
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
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="email@ejemplo.com"
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
          )}

          {/* Display Name Input (Register Only) */}
          {!isLogin && (
            <div>
              <label
                htmlFor="displayName"
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--color-label-primary)',
                  marginBottom: 'var(--spacing-2)',
                }}
              >
                Nombre para Mostrar
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
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
                placeholder="Tu Nombre"
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
          )}

          {/* Error Message */}
          {error && (
            <div
              className="spring-motion"
              style={{
                fontSize: '15px',
                textAlign: 'center',
                color: 'var(--color-danger)',
                background: 'var(--color-fill)',
                padding: 'var(--spacing-6)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-danger)',
              }}
            >
              {error}
            </div>
          )}

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
            {isLoading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta Gratis')}
          </button>

          {/* Footer Text */}
          {!isLogin && (
            <p
              className="text-center"
              style={{
                fontSize: '13px',
                color: 'var(--color-label-secondary)',
                marginTop: 'var(--spacing-4)',
              }}
            >
              Al crear una cuenta, aceptas practicar con otros estudiantes en sesiones en vivo
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
