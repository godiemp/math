'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, Users, School, BarChart3, Target, TrendingUp, Clock, CheckCircle2, LineChart, Brain, Gauge, BookOpen, MessageCircle } from 'lucide-react';

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
            href="/signin"
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
          <div
            className="inline-block px-4 py-2 mb-6"
            style={{
              background: 'var(--color-tint)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            PREPARACIÓN BASADA EN DATOS
          </div>
          <h1
            className="mb-6"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: 'var(--color-label-primary)'
            }}
          >
            La PAES es una prueba estandarizada.<br />
            Aquí te preparamos exactamente para eso.
          </h1>
          <p
            className="mb-8"
            style={{
              fontSize: '18px',
              lineHeight: 1.6,
              color: 'var(--color-label-secondary)',
              maxWidth: '700px',
              margin: '0 auto'
            }}
          >
            No estudias "por si acaso". Estudias lo que realmente viene y mejoras donde importa.
            Así subes tu puntaje.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { number: '900+', label: 'ejercicios PAES' },
              { number: '20+', label: 'mini-lecciones' },
              { number: 'Tutor AI', label: 'disponible 24/7' },
              { number: '500+', label: 'habilidades medidas' }
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
                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-tint)' }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-label-secondary)' }}>
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
              fontSize: '28px',
              fontWeight: 600,
              color: 'var(--color-label-primary)'
            }}
          >
            Sube tu puntaje con datos, no con suerte
          </h2>
          <p
            className="mb-6"
            style={{
              fontSize: '16px',
              color: 'var(--color-label-secondary)'
            }}
          >
            Comienza a entrenar para la PAES con práctica personalizada y métricas reales
          </p>
          <Link
            href="/signin"
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
        SimplePAES - Preparación basada en datos para la PAES
      </footer>
    </div>
  );
}

function EstudiantesContent() {
  return (
    <div className="space-y-12">
      {/* Main Message */}
      <div
        className="p-8"
        style={{
          background: 'linear-gradient(135deg, var(--color-tint) 0%, #5E5CE6 100%)',
          borderRadius: 'var(--radius-lg)',
          color: 'white'
        }}
      >
        <h2
          className="mb-6"
          style={{
            fontSize: '28px',
            fontWeight: 700,
            lineHeight: 1.3
          }}
        >
          Aprende con explicaciones reales.<br />
          Un tutor AI que te guía, no que te da la respuesta.
        </h2>
        <p
          style={{
            fontSize: '17px',
            lineHeight: 1.7,
            opacity: 0.95
          }}
        >
          SimplePAES tiene <strong>mini-lecciones interactivas</strong> que te explican el por qué, no solo el cómo.
          Y cuando te trabas, el <strong>Tutor AI Socrático</strong> te hace preguntas que te guían a entender —sin darte la respuesta.
          Así entiendes de verdad, no solo memorizas.
        </p>
      </div>

      {/* Mini-lessons and Tutor AI */}
      <div className="grid md:grid-cols-2 gap-6">
        <div
          className="p-6"
          style={{
            background: 'var(--color-fill)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-separator)'
          }}
        >
          <div className="flex items-center gap-3 mb-4">
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
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
              Mini-Lecciones Interactivas
            </h3>
          </div>
          <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--color-label-secondary)', marginBottom: '12px' }}>
            No solo te dicen qué hacer —te explican por qué funciona. Así el conocimiento se queda.
          </p>
          <ul className="space-y-2">
            {['Te explican el por qué, no solo el cómo', 'Ejemplos interactivos', 'Práctica guiada con feedback', 'Quiz para verificar que entendiste'].map((item, i) => (
              <li key={i} className="flex items-center gap-2" style={{ fontSize: '14px', color: 'var(--color-label-primary)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-tint)' }} />
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
          <div className="flex items-center gap-3 mb-4">
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
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
              Tutor AI Socrático
            </h3>
          </div>
          <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--color-label-secondary)', marginBottom: '12px' }}>
            Disponible 24/7 en el Modo Zen. Te hace preguntas que te ayudan a pensar, no te da la respuesta directa.
          </p>
          <ul className="space-y-2">
            {['Metodología Socrática', 'Disponible cuando te trabas', 'Te guía sin resolver por ti', 'Desarrolla pensamiento crítico'].map((item, i) => (
              <li key={i} className="flex items-center gap-2" style={{ fontSize: '14px', color: 'var(--color-label-primary)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-tint)' }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* How it works */}
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
          <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            Práctica Personalizada con Datos
          </h3>
        </div>

        <div
          className="p-6"
          style={{
            background: 'var(--color-fill)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-separator)'
          }}
        >
          <p className="mb-6" style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--color-label-secondary)' }}>
            Cada sesión es <strong style={{ color: 'var(--color-label-primary)' }}>personalizada</strong>:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '📊', text: 'Si fallas en álgebra, te reforzamos álgebra' },
              { icon: '⚡', text: 'Si vas rápido en geometría, subimos la dificultad' },
              { icon: '🎯', text: 'Ensayas exactamente lo que viene en la PAES' },
              { icon: '📈', text: 'Ves tu progreso con números, no con intuición' }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                <span style={{ fontSize: '15px', color: 'var(--color-label-primary)', lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What you get */}
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
          <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            Métricas Reales de tu Desempeño
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Clock, title: 'Tiempo por pregunta', desc: 'Mide tu velocidad real vs. tiempo PAES' },
            { icon: Target, title: 'Temas débiles', desc: 'Identifica exactamente dónde fallas' },
            { icon: TrendingUp, title: 'Curva de progreso', desc: 'Ve tu mejora semana a semana' }
          ].map((item, i) => (
            <div
              key={i}
              className="p-5"
              style={{
                background: 'var(--color-fill)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-separator)'
              }}
            >
              <item.icon size={28} style={{ color: 'var(--color-tint)', marginBottom: '12px' }} />
              <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '6px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--color-label-secondary)', lineHeight: 1.5 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closing */}
      <div
        className="p-6 text-center"
        style={{
          background: '#DCFCE7',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid #BBF7D0'
        }}
      >
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#166534', marginBottom: '8px' }}>
          No estudias "por si acaso"
        </h3>
        <p style={{ fontSize: '16px', color: '#14532D', lineHeight: 1.6 }}>
          Estudias lo que realmente viene y mejoras donde importa. <strong>Así subes tu puntaje.</strong>
        </p>
      </div>
    </div>
  );
}

function PadresContent() {
  return (
    <div className="space-y-12">
      {/* Main Message */}
      <div
        className="p-8"
        style={{
          background: 'linear-gradient(135deg, var(--color-tint) 0%, #5E5CE6 100%)',
          borderRadius: 'var(--radius-lg)',
          color: 'white'
        }}
      >
        <h2
          className="mb-6"
          style={{
            fontSize: '28px',
            fontWeight: 700,
            lineHeight: 1.3
          }}
        >
          Cuando su hijo no entiende algo,<br />
          aquí le explican el por qué.
        </h2>
        <p
          style={{
            fontSize: '17px',
            lineHeight: 1.7,
            opacity: 0.95
          }}
        >
          SimplePAES no es solo ejercicios. Tiene <strong>mini-lecciones que explican el por qué</strong> de cada concepto,
          y un <strong>Tutor AI disponible 24/7</strong> que guía a su hijo cuando se traba —sin darle la respuesta,
          para que aprenda de verdad.
        </p>
      </div>

      {/* Mini-lessons and AI for parents */}
      <div className="grid md:grid-cols-2 gap-6">
        <div
          className="p-6"
          style={{
            background: 'var(--color-fill)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-separator)'
          }}
        >
          <div className="flex items-center gap-3 mb-4">
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
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
              Mini-Lecciones con Explicaciones
            </h3>
          </div>
          <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--color-label-secondary)' }}>
            Cuando su hijo no entiende un tema, las mini-lecciones le explican el por qué, no solo el procedimiento. Así el conocimiento se queda.
          </p>
        </div>

        <div
          className="p-6"
          style={{
            background: 'var(--color-fill)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-separator)'
          }}
        >
          <div className="flex items-center gap-3 mb-4">
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
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
              Tutor AI Disponible 24/7
            </h3>
          </div>
          <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--color-label-secondary)' }}>
            Cuando su hijo se traba, el Tutor AI lo guía con preguntas —sin darle la respuesta. Así desarrolla pensamiento crítico, no dependencia.
          </p>
        </div>
      </div>

      {/* No guessing */}
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
            <LineChart size={24} />
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            Métricas Claras, No Adivinanzas
          </h3>
        </div>

        <div
          className="p-6"
          style={{
            background: 'var(--color-fill)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-separator)'
          }}
        >
          <p className="mb-6" style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--color-label-secondary)' }}>
            <strong style={{ color: 'var(--color-label-primary)' }}>Usted no tiene que adivinar si su hijo va bien.</strong> Aquí verá:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Métricas claras de rendimiento',
              'Mejoras reales medibles',
              'Reportes detallados por tema',
              'Identificación automática de debilidades',
              'Ajuste automático de práctica',
              'Fortalecimiento de áreas específicas'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 size={18} style={{ color: 'var(--color-tint)', flexShrink: 0 }} />
                <span style={{ fontSize: '15px', color: 'var(--color-label-primary)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How platform identifies */}
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
          <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            Sistema Inteligente de Diagnóstico
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { step: '1', title: 'Analiza', desc: 'Detecta patrones de error en cada tema' },
            { step: '2', title: 'Identifica', desc: 'Encuentra habilidades débiles automáticamente' },
            { step: '3', title: 'Ajusta', desc: 'Personaliza práctica para fortalecer esas áreas' }
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 text-center"
              style={{
                background: 'var(--color-fill)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-separator)'
              }}
            >
              <div
                className="inline-flex items-center justify-center w-10 h-10 mb-3"
                style={{
                  background: 'var(--color-tint)',
                  color: 'white',
                  borderRadius: '50%',
                  fontWeight: 700,
                  fontSize: '18px'
                }}
              >
                {item.step}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '6px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--color-label-secondary)', lineHeight: 1.5 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closing */}
      <div
        className="p-6 text-center"
        style={{
          background: '#DCFCE7',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid #BBF7D0'
        }}
      >
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#166534', marginBottom: '8px' }}>
          No es estudiar más
        </h3>
        <p style={{ fontSize: '16px', color: '#14532D', lineHeight: 1.6 }}>
          Es estudiar <strong>mejor</strong>, con datos y personalización para subir el puntaje de verdad.
        </p>
      </div>
    </div>
  );
}

function ProfesoresContent() {
  return (
    <div className="space-y-12">
      {/* Main Message */}
      <div
        className="p-8"
        style={{
          background: 'linear-gradient(135deg, var(--color-tint) 0%, #5E5CE6 100%)',
          borderRadius: 'var(--radius-lg)',
          color: 'white'
        }}
      >
        <h2
          className="mb-6"
          style={{
            fontSize: '28px',
            fontWeight: 700,
            lineHeight: 1.3
          }}
        >
          SimplePAES enseña, no solo evalúa.<br />
          Mini-lecciones + Tutor AI para sus estudiantes.
        </h2>
        <p
          style={{
            fontSize: '17px',
            lineHeight: 1.7,
            opacity: 0.95
          }}
        >
          Las <strong>mini-lecciones explican el por qué</strong> de cada concepto matemático. Y cuando un estudiante se traba fuera de clases,
          el <strong>Tutor AI</strong> lo guía con preguntas —sin darle la respuesta. Así usted puede enfocarse en enseñar, no en repetir lo básico.
        </p>
      </div>

      {/* Mini-lessons and AI for teachers */}
      <div className="grid md:grid-cols-2 gap-6">
        <div
          className="p-6"
          style={{
            background: 'var(--color-fill)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-separator)'
          }}
        >
          <div className="flex items-center gap-3 mb-4">
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
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
              Mini-Lecciones que Enseñan
            </h3>
          </div>
          <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--color-label-secondary)' }}>
            No es solo un banco de preguntas. Las mini-lecciones explican conceptos con ejemplos y el por qué detrás de cada procedimiento.
          </p>
        </div>

        <div
          className="p-6"
          style={{
            background: 'var(--color-fill)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-separator)'
          }}
        >
          <div className="flex items-center gap-3 mb-4">
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
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
              Tutor AI Fuera de Clases
            </h3>
          </div>
          <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--color-label-secondary)' }}>
            Cuando sus estudiantes se traban en casa, el Tutor AI los guía con metodología Socrática —preguntas que desarrollan pensamiento crítico.
          </p>
        </div>
      </div>

      {/* Data-driven */}
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
          <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            El Estudio Convertido en Datos
          </h3>
        </div>

        <div
          className="p-6"
          style={{
            background: 'var(--color-fill)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-separator)'
          }}
        >
          <p className="mb-6" style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--color-label-secondary)' }}>
            La plataforma convierte el estudio en <strong style={{ color: 'var(--color-label-primary)' }}>datos accionables</strong>:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Clock, text: 'Tiempo por pregunta de cada estudiante' },
              { icon: Target, text: 'Porcentajes de acierto por contenido' },
              { icon: TrendingUp, text: 'Curvas de progreso individuales' },
              { icon: Gauge, text: 'Reportes listos para planificación' }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <item.icon size={20} style={{ color: 'var(--color-tint)', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '15px', color: 'var(--color-label-primary)', lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Complements pedagogy */}
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
            <School size={24} />
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-label-primary)' }}>
            Potencia tu Pedagogía
          </h3>
        </div>

        <div
          className="p-6"
          style={{
            background: '#FEF3C7',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid #FDE68A'
          }}
        >
          <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#78350F' }}>
            Todo esto <strong>sin reemplazar la pedagogía del profesor</strong>; la potencia.
            Los datos te permiten identificar exactamente dónde necesitan más apoyo tus estudiantes
            y ajustar tu enseñanza en consecuencia.
          </p>
        </div>
      </div>

      {/* Use cases */}
      <div>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '16px' }}>
          Cómo usar SimplePAES en tu planificación
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: 'Diagnóstico inicial', desc: 'Identifica nivel base de cada estudiante' },
            { title: 'Reforzamiento focalizado', desc: 'Asigna práctica por tema débil detectado' },
            { title: 'Seguimiento de curso', desc: 'Monitorea progreso grupal en tiempo real' },
            { title: 'Planificación informada', desc: 'Usa reportes para ajustar clases' }
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
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '4px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--color-label-secondary)' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closing */}
      <div
        className="p-6 text-center"
        style={{
          background: '#DCFCE7',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid #BBF7D0'
        }}
      >
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#166534', marginBottom: '8px' }}>
          En vez de preparar "en general"
        </h3>
        <p style={{ fontSize: '16px', color: '#14532D', lineHeight: 1.6 }}>
          SimplePAES prepara para la prueba que realmente rendirán, con <strong>precisión, datos y personalización</strong>.
        </p>
      </div>
    </div>
  );
}
