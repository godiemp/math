'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, Users, School, Bot, Clock, Target, Trophy, BookOpen, BarChart3, Shield, Zap, MessageCircle, Brain, CheckCircle2 } from 'lucide-react';

type AudienceType = 'estudiantes' | 'padres' | 'profesores';

export default function ComoFuncionaPage() {
  const [activeTab, setActiveTab] = useState<AudienceType>('estudiantes');

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          borderBottom: '1px solid var(--color-separator)'
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 spring-motion"
            style={{ color: 'var(--color-tint)' }}
          >
            <ArrowLeft size={20} />
            <span style={{ fontWeight: 500 }}>volver</span>
          </Link>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '20px',
              fontWeight: 600,
              color: 'var(--color-label-primary)'
            }}
          >
            SimplePAES
          </h1>
          <Link
            href="/dashboard"
            className="spring-motion"
            style={{
              padding: '8px 16px',
              background: 'var(--color-tint)',
              color: 'white',
              borderRadius: 'var(--radius-sm)',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            comenzar
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1
            className="mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(36px, 6vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: 'var(--color-label-primary)'
            }}
          >
            Tu compañero inteligente para dominar la PAES
          </h1>
          <p
            className="mb-8"
            style={{
              fontSize: '18px',
              lineHeight: 1.6,
              color: 'var(--color-label-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            Inteligencia artificial + metodología Socrática + 616 problemas reales =
            la preparación matemática más completa de Chile
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { number: '616', label: 'problemas' },
              { number: '500+', label: 'habilidades' },
              { number: '24/7', label: 'disponible' },
              { number: 'IA', label: 'Socrática' }
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4"
                style={{
                  background: 'var(--color-fill)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-separator)'
                }}
              >
                <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-tint)' }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--color-label-secondary)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Tabs */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div
            className="flex justify-center gap-2 p-1"
            style={{
              background: 'var(--color-fill)',
              borderRadius: 'var(--radius-md)',
              width: 'fit-content',
              margin: '0 auto'
            }}
          >
            {[
              { id: 'estudiantes' as AudienceType, icon: GraduationCap, label: 'Estudiantes' },
              { id: 'padres' as AudienceType, icon: Users, label: 'Padres' },
              { id: 'profesores' as AudienceType, icon: School, label: 'Profesores' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2 spring-motion"
                style={{
                  background: activeTab === tab.id ? 'white' : 'transparent',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  color: activeTab === tab.id ? 'var(--color-tint)' : 'var(--color-label-secondary)',
                  boxShadow: activeTab === tab.id ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content for Each Audience */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {activeTab === 'estudiantes' && <EstudiantesContent />}
          {activeTab === 'padres' && <PadresContent />}
          {activeTab === 'profesores' && <ProfesoresContent />}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 px-4 text-center"
        style={{ background: 'var(--color-fill)' }}
      >
        <div className="max-w-2xl mx-auto">
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '32px',
              fontWeight: 600,
              color: 'var(--color-label-primary)'
            }}
          >
            Empieza a dominar la PAES hoy
          </h2>
          <p
            className="mb-6"
            style={{
              fontSize: '16px',
              color: 'var(--color-label-secondary)'
            }}
          >
            Regístrate gratis y descubre por qué SimplePAES es la mejor preparación matemática
          </p>
          <Link
            href="/"
            className="inline-block spring-emphasized"
            style={{
              padding: '14px 32px',
              background: 'var(--color-tint)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              fontSize: '17px',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            Comenzar ahora
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-4 text-center"
        style={{
          borderTop: '1px solid var(--color-separator)',
          color: 'var(--color-label-secondary)',
          fontSize: '14px'
        }}
      >
        SimplePAES - Preparando estudiantes chilenos para el éxito universitario
      </footer>
    </div>
  );
}

function EstudiantesContent() {
  return (
    <div className="space-y-12">
      {/* AI Tutor Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-3"
            style={{
              background: 'var(--color-tint)',
              borderRadius: 'var(--radius-md)',
              color: 'white'
            }}
          >
            <Bot size={24} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            Tutor IA que Realmente Enseña
          </h2>
        </div>

        <div
          className="p-6"
          style={{
            background: 'var(--color-fill)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-separator)'
          }}
        >
          <p className="mb-4" style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--color-label-secondary)' }}>
            <strong style={{ color: 'var(--color-label-primary)' }}>Metodología Socrática</strong> - No te damos la respuesta, te ayudamos a descubrirla.
          </p>

          <div className="space-y-3 mb-4">
            {[
              'Te pregunta sobre tu razonamiento - "¿Por qué elegiste esa opción?"',
              'Te guía con preguntas - "¿Qué pasaría si...?"',
              'Construye tu comprensión paso a paso',
              'Se adapta a tu nivel de entendimiento'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 size={18} style={{ color: 'var(--color-tint)', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '15px', color: 'var(--color-label-secondary)' }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Example conversation */}
          <div
            className="p-4 mt-4"
            style={{
              background: 'white',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-separator)'
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-label-secondary)', marginBottom: '12px' }}>
              EJEMPLO DE CONVERSACIÓN
            </div>
            <div className="space-y-3">
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-label-secondary)' }}>Estudiante:</div>
                <div style={{ fontSize: '14px', color: 'var(--color-label-primary)' }}>No entiendo por qué la respuesta es 9 días</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-tint)' }}>Tutor IA:</div>
                <div style={{ fontSize: '14px', color: 'var(--color-label-primary)' }}>
                  ¿Qué tipo de relación ves entre el número de obreros y los días necesarios?
                  Si aumentan los obreros, ¿qué crees que pasa con el tiempo?
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-label-secondary)' }}>Estudiante:</div>
                <div style={{ fontSize: '14px', color: 'var(--color-label-primary)' }}>¿Disminuye?</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-tint)' }}>Tutor IA:</div>
                <div style={{ fontSize: '14px', color: 'var(--color-label-primary)' }}>
                  ¡Exacto! Es una proporción inversa. Ahora, si 3 obreros tardan 12 días,
                  el trabajo total es 3×12 = 36 "días-obrero". Con 4 obreros, ¿cómo calcularías los días?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Modes */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-3"
            style={{
              background: 'var(--color-tint)',
              borderRadius: 'var(--radius-md)',
              color: 'white'
            }}
          >
            <Target size={24} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            Dos Modos de Práctica
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div
            className="p-6"
            style={{
              background: 'var(--color-fill)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-separator)'
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px', color: 'var(--color-label-primary)' }}>
              Modo Zen
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-tint)', marginBottom: '12px', fontWeight: 500 }}>
              Aprende sin presión
            </p>
            <ul className="space-y-2">
              {[
                'Sin límite de tiempo',
                'Explicaciones inmediatas',
                'Tutor IA disponible siempre',
                'Enfócate en entender'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2" style={{ fontSize: '14px', color: 'var(--color-label-secondary)' }}>
                  <Clock size={14} style={{ color: 'var(--color-tint)' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="p-6"
            style={{
              background: 'var(--color-fill)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-separator)'
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px', color: 'var(--color-label-primary)' }}>
              Modo Rapid Fire
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-tint)', marginBottom: '12px', fontWeight: 500 }}>
              Simula el examen real
            </p>
            <ul className="space-y-2">
              {[
                '10 preguntas cronometradas',
                'Dificultad: 25/20/15/10 min',
                'Navega entre preguntas',
                'Mide tu velocidad'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2" style={{ fontSize: '14px', color: 'var(--color-label-secondary)' }}>
                  <Zap size={14} style={{ color: 'var(--color-tint)' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Question Bank */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-3"
            style={{
              background: 'var(--color-tint)',
              borderRadius: 'var(--radius-md)',
              color: 'white'
            }}
          >
            <BookOpen size={24} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            616 Problemas que Cubren Todo
          </h2>
        </div>

        <div
          className="overflow-x-auto"
          style={{
            background: 'var(--color-fill)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-separator)'
          }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-separator)' }}>
                <th className="p-4 text-left" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-label-primary)' }}>Área</th>
                <th className="p-4 text-center" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-label-primary)' }}>M1 (Básico)</th>
                <th className="p-4 text-center" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-label-primary)' }}>M2 (Avanzado)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { area: 'Números', m1: 91, m2: 88 },
                { area: 'Álgebra', m1: 109, m2: 31 },
                { area: 'Geometría', m1: 106, m2: 37 },
                { area: 'Probabilidad', m1: 100, m2: 54 },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-separator)' }}>
                  <td className="p-4" style={{ fontSize: '14px', color: 'var(--color-label-primary)', fontWeight: 500 }}>{row.area}</td>
                  <td className="p-4 text-center" style={{ fontSize: '14px', color: 'var(--color-label-secondary)' }}>{row.m1}</td>
                  <td className="p-4 text-center" style={{ fontSize: '14px', color: 'var(--color-label-secondary)' }}>{row.m2}</td>
                </tr>
              ))}
              <tr style={{ background: 'white' }}>
                <td className="p-4" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-label-primary)' }}>Total</td>
                <td className="p-4 text-center" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-tint)' }}>406</td>
                <td className="p-4 text-center" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-tint)' }}>210</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Gamification */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-3"
            style={{
              background: 'var(--color-tint)',
              borderRadius: 'var(--radius-md)',
              color: 'white'
            }}
          >
            <Trophy size={24} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            Mantén tu Motivación
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: 'Rachas Diarias', desc: 'Días consecutivos de práctica', icon: '🔥' },
            { title: '500+ Habilidades', desc: 'Tracking de maestría detallado', icon: '🎯' },
            { title: 'Sesiones en Vivo', desc: 'Practica con otros estudiantes', icon: '🏆' }
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 text-center"
              style={{
                background: 'var(--color-fill)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-separator)'
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '4px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-label-secondary)' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PadresContent() {
  return (
    <div className="space-y-12">
      {/* Real Learning */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-3"
            style={{
              background: 'var(--color-tint)',
              borderRadius: 'var(--radius-md)',
              color: 'white'
            }}
          >
            <Brain size={24} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            Aprendizaje Real, No Memorización
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div
            className="p-6"
            style={{
              background: '#FEE2E2',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid #FECACA'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#991B1B' }}>
              Métodos Tradicionales
            </h3>
            <ul className="space-y-2">
              {[
                'Memorizar fórmulas sin entenderlas',
                'Practicar sin retroalimentación útil',
                'No saber dónde están las debilidades',
                'Estudiar solo sin guía personalizada'
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '14px', color: '#7F1D1D' }}>• {item}</li>
              ))}
            </ul>
          </div>

          <div
            className="p-6"
            style={{
              background: '#DCFCE7',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid #BBF7D0'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#166534' }}>
              Con SimplePAES
            </h3>
            <ul className="space-y-2">
              {[
                'Metodología Socrática - aprende a PENSAR',
                'Tutor IA personalizado 24/7',
                'Retroalimentación inmediata en cada error',
                'Diagnóstico preciso de áreas débiles'
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '14px', color: '#14532D' }}>✓ {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Technology */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-3"
            style={{
              background: 'var(--color-tint)',
              borderRadius: 'var(--radius-md)',
              color: 'white'
            }}
          >
            <Bot size={24} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            Tecnología de Punta
          </h2>
        </div>

        <div
          className="p-6"
          style={{
            background: 'var(--color-fill)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-separator)'
          }}
        >
          <p className="mb-4" style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--color-label-secondary)' }}>
            Usamos <strong style={{ color: 'var(--color-label-primary)' }}>Claude Sonnet 4.5</strong> de Anthropic,
            la inteligencia artificial más avanzada del mundo. No es un chatbot simple:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Entiende el contexto de cada problema',
              'Adapta explicaciones al nivel de comprensión',
              'Hace preguntas inteligentes para guiar',
              'Nunca se frustra ni se cansa',
              'Disponible 24/7 cuando necesite ayuda',
              'Registra progreso para análisis'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 size={18} style={{ color: 'var(--color-tint)', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: 'var(--color-label-secondary)' }}>{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-4" style={{ fontSize: '15px', fontStyle: 'italic', color: 'var(--color-tint)' }}>
            Es como tener un tutor particular de matemáticas siempre disponible
          </p>
        </div>
      </div>

      {/* Transparency */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-3"
            style={{
              background: 'var(--color-tint)',
              borderRadius: 'var(--radius-md)',
              color: 'white'
            }}
          >
            <BarChart3 size={24} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            Transparencia Total del Progreso
          </h2>
        </div>

        <div
          className="p-6"
          style={{
            background: 'var(--color-fill)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-separator)'
          }}
        >
          <p className="mb-4" style={{ fontSize: '15px', color: 'var(--color-label-secondary)' }}>
            Como padre, puedes ver:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Cuántas sesiones ha completado',
              'Qué temas domina y cuáles reforzar',
              'Tiempo dedicado al estudio',
              'Racha de días consecutivos',
              'Evolución del rendimiento',
              'Predicción de puntaje PAES'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-tint)' }} />
                <span style={{ fontSize: '14px', color: 'var(--color-label-primary)' }}>{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-4" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-tint)' }}>
            No más "¿Estudiaste hoy?" - los datos hablan
          </p>
        </div>
      </div>

      {/* Security */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-3"
            style={{
              background: 'var(--color-tint)',
              borderRadius: 'var(--radius-md)',
              color: 'white'
            }}
          >
            <Shield size={24} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            Seguridad y Privacidad
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: 'Autenticación JWT', desc: 'Estándar bancario de seguridad' },
            { title: 'Contraseñas encriptadas', desc: 'Con bcryptjs industrial' },
            { title: 'Datos en Chile', desc: 'Servidor y pagos locales' },
            { title: 'Sin publicidad', desc: 'Experiencia limpia de estudio' },
            { title: 'HTTPS en todo', desc: 'Conexiones 100% encriptadas' },
            { title: 'MercadoPago', desc: 'Plataforma de pagos confiable' }
          ].map((item, i) => (
            <div
              key={i}
              className="p-4"
              style={{
                background: 'var(--color-fill)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-separator)'
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '4px' }}>
                ✓ {item.title}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-label-secondary)' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Value Comparison */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-3"
            style={{
              background: 'var(--color-tint)',
              borderRadius: 'var(--radius-md)',
              color: 'white'
            }}
          >
            <Target size={24} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            Valor Incomparable
          </h2>
        </div>

        <div
          className="overflow-x-auto"
          style={{
            background: 'var(--color-fill)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-separator)'
          }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-separator)' }}>
                <th className="p-4 text-left" style={{ fontSize: '14px', fontWeight: 600 }}>Servicio</th>
                <th className="p-4 text-center" style={{ fontSize: '14px', fontWeight: 600 }}>Costo/mes</th>
                <th className="p-4 text-center" style={{ fontSize: '14px', fontWeight: 600 }}>Disponibilidad</th>
                <th className="p-4 text-center" style={{ fontSize: '14px', fontWeight: 600 }}>Personalización</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--color-separator)' }}>
                <td className="p-4" style={{ fontSize: '14px' }}>Preuniversitario</td>
                <td className="p-4 text-center" style={{ fontSize: '14px' }}>$150.000+</td>
                <td className="p-4 text-center" style={{ fontSize: '14px' }}>Horarios fijos</td>
                <td className="p-4 text-center" style={{ fontSize: '14px' }}>1 prof / 30 alumnos</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-separator)' }}>
                <td className="p-4" style={{ fontSize: '14px' }}>Clases particulares</td>
                <td className="p-4 text-center" style={{ fontSize: '14px' }}>$200.000+</td>
                <td className="p-4 text-center" style={{ fontSize: '14px' }}>Coordinar agendas</td>
                <td className="p-4 text-center" style={{ fontSize: '14px' }}>Depende del tutor</td>
              </tr>
              <tr style={{ background: '#DCFCE7' }}>
                <td className="p-4" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-tint)' }}>SimplePAES</td>
                <td className="p-4 text-center" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-tint)' }}>$8.000</td>
                <td className="p-4 text-center" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-tint)' }}>24/7</td>
                <td className="p-4 text-center" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-tint)' }}>IA adapta cada sesión</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center" style={{ fontSize: '15px', fontStyle: 'italic', color: 'var(--color-label-secondary)' }}>
          Más barato que un preuniversitario, más disponible que un tutor particular, más inteligente que ambos
        </p>
      </div>
    </div>
  );
}

function ProfesoresContent() {
  return (
    <div className="space-y-12">
      {/* Pedagogical Foundation */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-3"
            style={{
              background: 'var(--color-tint)',
              borderRadius: 'var(--radius-md)',
              color: 'white'
            }}
          >
            <BookOpen size={24} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            Fundamento Pedagógico Sólido
          </h2>
        </div>

        <div
          className="p-6"
          style={{
            background: 'var(--color-fill)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-separator)'
          }}
        >
          <p className="mb-4" style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--color-label-secondary)' }}>
            <strong style={{ color: 'var(--color-label-primary)' }}>Metodología Socrática + Inteligencia Artificial:</strong>
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              'No damos respuestas directas - el estudiante construye conocimiento',
              'Preguntas adaptativas según respuestas del alumno',
              'Metacognición - reflexión sobre el propio razonamiento',
              'Transferencia de conocimiento - aplicar, no memorizar'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div style={{ color: 'var(--color-tint)', marginTop: '2px' }}>{i + 1}.</div>
                <span style={{ fontSize: '14px', color: 'var(--color-label-secondary)' }}>{item}</span>
              </div>
            ))}
          </div>
          <div
            className="p-4"
            style={{
              background: 'white',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-separator)'
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-label-secondary)', marginBottom: '8px' }}>
              BASE TEÓRICA
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'Constructivismo (Piaget, Vygotsky)',
                'Zona de Desarrollo Próximo',
                'Aprendizaje significativo (Ausubel)',
                'Taxonomía de Bloom'
              ].map((item, i) => (
                <div key={i} style={{ fontSize: '12px', color: 'var(--color-label-primary)' }}>• {item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Alignment */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-3"
            style={{
              background: 'var(--color-tint)',
              borderRadius: 'var(--radius-md)',
              color: 'white'
            }}
          >
            <Target size={24} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            Alineación Curricular PAES
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div
            className="p-6"
            style={{
              background: 'var(--color-fill)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-separator)'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: 'var(--color-tint)' }}>
              Competencia Matemática 1 (M1)
            </h3>
            <ul className="space-y-2">
              {[
                'Números: Enteros, racionales, porcentajes, potencias, raíces',
                'Álgebra: Expresiones, ecuaciones, funciones lineales, sistemas',
                'Geometría: Perímetro, área, volumen, transformaciones',
                'Probabilidad: Tablas, gráficos, tendencia central, reglas'
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '13px', color: 'var(--color-label-secondary)' }}>• {item}</li>
              ))}
            </ul>
          </div>

          <div
            className="p-6"
            style={{
              background: 'var(--color-fill)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-separator)'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: 'var(--color-tint)' }}>
              Competencia Matemática 2 (M2)
            </h3>
            <ul className="space-y-2">
              {[
                'Operaciones avanzadas con números reales',
                'Funciones cuadráticas y exponenciales',
                'Geometría analítica y transformaciones complejas',
                'Probabilidad condicional y distribuciones'
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '13px', color: 'var(--color-label-secondary)' }}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-4 p-4 text-center"
          style={{
            background: 'var(--color-tint)',
            color: 'white',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <strong>46 unidades temáticas</strong> organizadas según taxonomía PAES oficial
        </div>
      </div>

      {/* Analytics */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-3"
            style={{
              background: 'var(--color-tint)',
              borderRadius: 'var(--radius-md)',
              color: 'white'
            }}
          >
            <BarChart3 size={24} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            Analytics Educativo Avanzado
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div
            className="p-6"
            style={{
              background: 'var(--color-fill)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-separator)'
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: 'var(--color-label-primary)' }}>
              Para el Estudiante Individual
            </h3>
            <ul className="space-y-2">
              {[
                'Rendimiento por eje temático',
                'Habilidades dominadas vs. en desarrollo',
                'Patrones de error comunes',
                'Tiempo de respuesta por dificultad',
                'Evolución temporal del aprendizaje'
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '13px', color: 'var(--color-label-secondary)' }}>• {item}</li>
              ))}
            </ul>
          </div>

          <div
            className="p-6"
            style={{
              background: 'var(--color-fill)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-separator)'
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: 'var(--color-label-primary)' }}>
              Para el Grupo
            </h3>
            <ul className="space-y-2">
              {[
                'Distribución de rendimiento del curso',
                'Temas más desafiantes colectivamente',
                'Comparativa con otros grupos',
                'Identificación de estudiantes en riesgo',
                'Efectividad de intervenciones'
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '13px', color: 'var(--color-label-secondary)' }}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-4 p-4"
          style={{
            background: '#FEF3C7',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #FDE68A'
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#92400E', marginBottom: '4px' }}>
            EJEMPLO DE INSIGHT
          </div>
          <div style={{ fontSize: '14px', color: '#78350F', fontStyle: 'italic' }}>
            "El 73% de los estudiantes tiene dificultades con proporcionalidad inversa, pero domina proporcionalidad directa.
            Recomendación: Sesión de contraste conceptual."
          </div>
        </div>
      </div>

      {/* Admin Tools */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-3"
            style={{
              background: 'var(--color-tint)',
              borderRadius: 'var(--radius-md)',
              color: 'white'
            }}
          >
            <MessageCircle size={24} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            Integración con Práctica Docente
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { step: '1', title: 'Diagnóstico inicial', desc: 'Asigna práctica para identificar nivel base' },
            { step: '2', title: 'Tarea diferenciada', desc: 'Modo Zen para aprender, Rapid Fire para evaluar' },
            { step: '3', title: 'Flipped Classroom', desc: 'Estudian en casa, clase para profundizar' },
            { step: '4', title: 'Refuerzo específico', desc: 'Asigna temas según debilidades identificadas' },
            { step: '5', title: 'Ensayos simulados', desc: 'Sesiones en vivo como preparación final' },
            { step: '6', title: 'Análisis de errores', desc: 'Revisa patrones comunes en sesiones grupales' }
          ].map((item, i) => (
            <div
              key={i}
              className="p-4"
              style={{
                background: 'var(--color-fill)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-separator)'
              }}
            >
              <div
                className="inline-block px-2 py-1 mb-2"
                style={{
                  background: 'var(--color-tint)',
                  color: 'white',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                Paso {item.step}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '4px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-label-secondary)' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Assistant */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-3"
            style={{
              background: 'var(--color-tint)',
              borderRadius: 'var(--radius-md)',
              color: 'white'
            }}
          >
            <Bot size={24} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            El Tutor IA Como Asistente Docente
          </h2>
        </div>

        <div
          className="p-6"
          style={{
            background: 'var(--color-fill)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-separator)'
          }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Responde 24/7 las dudas fuera de clase',
              'No reemplaza al profesor, lo complementa',
              'Identifica patrones de error',
              'Escala personalmente a cada estudiante',
              'Registra interacciones para análisis',
              'Libera tiempo para enseñanza de alto valor'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 size={18} style={{ color: 'var(--color-tint)', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: 'var(--color-label-secondary)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
