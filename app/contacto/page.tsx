'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ContactoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement actual contact form submission when backend endpoint is ready
    // For now, show a success message with the information

    setTimeout(() => {
      toast.success('Mensaje enviado', {
        description: 'Nos pondremos en contacto contigo dentro de 2 días hábiles.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)', padding: '40px 20px' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 spring-motion"
          style={{
            fontSize: '15px',
            color: 'var(--color-tint)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ← Volver
        </button>

        <div className="translucent" style={{
          padding: 'var(--spacing-16)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-raised)',
        }}>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '36px',
              fontWeight: 600,
              color: 'var(--color-label-primary)',
              marginBottom: '8px',
            }}
          >
            Contacto y Soporte
          </h1>
          <p style={{
            fontSize: '15px',
            color: 'var(--color-label-secondary)',
            marginBottom: '32px',
            lineHeight: '1.6',
          }}>
            ¿Tienes preguntas, sugerencias o necesitas ayuda? Estamos aquí para ayudarte.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '16px',
              }}>
                Envíanos un Mensaje
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--color-label-primary)',
                      marginBottom: '8px',
                    }}
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '15px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-separator)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-label-primary)',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--color-label-primary)',
                      marginBottom: '8px',
                    }}
                  >
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '15px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-separator)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-label-primary)',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--color-label-primary)',
                      marginBottom: '8px',
                    }}
                  >
                    Asunto
                  </label>
                  <select
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '15px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-separator)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-label-primary)',
                    }}
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="soporte">Soporte Técnico</option>
                    <option value="facturacion">Facturación y Pagos</option>
                    <option value="reembolso">Solicitud de Reembolso</option>
                    <option value="cuenta">Problemas con la Cuenta</option>
                    <option value="contenido">Consulta sobre Contenido</option>
                    <option value="sugerencia">Sugerencia o Feedback</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--color-label-primary)',
                      marginBottom: '8px',
                    }}
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '15px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-separator)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-label-primary)',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="spring-emphasized w-full"
                  style={{
                    height: '44px',
                    padding: '0 var(--spacing-8)',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'white',
                    background: isSubmitting ? 'var(--color-label-tertiary)' : 'var(--color-tint)',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>

              <p style={{
                marginTop: '16px',
                fontSize: '13px',
                color: 'var(--color-label-secondary)',
                lineHeight: '1.5',
              }}>
                Respondemos todas las consultas dentro de <strong>2 días hábiles</strong>.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '16px',
              }}>
                Información de Contacto
              </h2>

              <div className="space-y-6">
                {/* Email */}
                <div
                  className="p-4"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ color: 'var(--color-tint)', flexShrink: 0, marginTop: '2px' }}
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7l-10 7L2 7" />
                    </svg>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '4px' }}>
                        Correo Electrónico
                      </h3>
                      <a
                        href="mailto:soporte@paeschile.cl"
                        style={{ fontSize: '14px', color: 'var(--color-tint)', textDecoration: 'none' }}
                      >
                        soporte@paeschile.cl
                      </a>
                      <p style={{ fontSize: '13px', color: 'var(--color-label-secondary)', marginTop: '4px' }}>
                        Soporte general y consultas
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div
                  className="p-4"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ color: 'var(--color-tint)', flexShrink: 0, marginTop: '2px' }}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '4px' }}>
                        Tiempo de Respuesta
                      </h3>
                      <p style={{ fontSize: '14px', color: 'var(--color-label-secondary)', lineHeight: '1.5' }}>
                        Respondemos todas las consultas dentro de <strong>2 días hábiles</strong>.
                        Para consultas urgentes sobre facturación, respondemos el mismo día.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ Link */}
                <div
                  className="p-4"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ color: 'var(--color-tint)', flexShrink: 0, marginTop: '2px' }}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '4px' }}>
                        Preguntas Frecuentes
                      </h3>
                      <p style={{ fontSize: '14px', color: 'var(--color-label-secondary)', lineHeight: '1.5' }}>
                        Antes de contactarnos, revisa si tu pregunta ya está respondida en nuestra sección de preguntas frecuentes (próximamente).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Legal Info */}
                <div
                  className="p-4"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                  }}
                >
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '12px' }}>
                    Información Legal
                  </h3>
                  <ul style={{ fontSize: '14px', color: 'var(--color-label-secondary)', lineHeight: '1.8', paddingLeft: '20px' }}>
                    <li>
                      <a href="/legal/terminos" style={{ color: 'var(--color-tint)', textDecoration: 'none' }}>
                        Términos y Condiciones
                      </a>
                    </li>
                    <li>
                      <a href="/legal/privacidad" style={{ color: 'var(--color-tint)', textDecoration: 'none' }}>
                        Política de Privacidad
                      </a>
                    </li>
                    <li>
                      <a href="/legal/cookies" style={{ color: 'var(--color-tint)', textDecoration: 'none' }}>
                        Política de Cookies
                      </a>
                    </li>
                    <li>
                      <a href="/legal/reembolsos" style={{ color: 'var(--color-tint)', textDecoration: 'none' }}>
                        Política de Reembolsos
                      </a>
                    </li>
                  </ul>
                </div>

                {/* SERNAC Info */}
                <div
                  className="p-4"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                  }}
                >
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '8px' }}>
                    Protección al Consumidor
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-label-secondary)', lineHeight: '1.6', marginBottom: '12px' }}>
                    Para consultas o reclamos sobre protección al consumidor, puede contactar al SERNAC:
                  </p>
                  <ul style={{ fontSize: '14px', color: 'var(--color-label-secondary)', lineHeight: '1.8', paddingLeft: '20px' }}>
                    <li>
                      <strong>Web:</strong>{' '}
                      <a href="https://www.sernac.cl" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-tint)' }}>
                        www.sernac.cl
                      </a>
                    </li>
                    <li><strong>Teléfono:</strong> 800 700 100 (gratuito)</li>
                    <li><strong>WhatsApp:</strong> +56 9 9471 7777</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
