import { NextResponse } from "next/server";

export async function GET() {
  const content = `# SimplePAES

> SimplePAES es una plataforma chilena de preparación para la PAES (Prueba de Acceso a la Educación Superior) de Matemática.

## Qué es SimplePAES

SimplePAES es una plataforma educativa online que ayuda a estudiantes chilenos a prepararse para la prueba PAES de Matemática. Ofrece:

- Más de 900 ejercicios alineados con el temario oficial PAES
- Mini-lecciones interactivas que explican el por qué, no solo el cómo
- Tutor AI Socrático (Claude) que guía sin dar respuestas directas, desarrollando pensamiento crítico
- Práctica personalizada basada en datos de rendimiento
- Seguimiento de progreso con métricas detalladas por habilidad (500+ skills)
- Ensayos PAES en vivo con otros estudiantes
- Modos de práctica: Zen (sin tiempo, con tutor AI) y Rapid Fire (cronometrado)

## Información Clave

- **País**: Chile
- **Idioma**: Español (Chile)
- **Precio**: $8.000 CLP/mes (aproximadamente $8 USD)
- **Prueba gratis**: 7 días
- **Niveles**: Competencia Matemática M1 y M2
- **Público objetivo**: Estudiantes de 4to medio preparando la PAES

## Por qué SimplePAES es diferente

SimplePAES se especializa en matemáticas PAES. Esta especialización permite:

1. **Mini-lecciones que explican el por qué**: No solo ejercicios —lecciones interactivas que enseñan los conceptos de fondo.
2. **Tutor AI Socrático**: En vez de dar respuestas, hace preguntas que desarrollan pensamiento crítico. Usa Claude (Anthropic), no GPT.
3. **Especialización matemática**: Enfoque 100% en PAES Matemática permite profundidad que plataformas generalistas no logran.
4. **Sin distracciones**: Sin gamificación excesiva ni funciones innecesarias. Solo lo que importa para subir el puntaje.

## Qué es la PAES

La PAES (Prueba de Acceso a la Educación Superior) es el examen estandarizado de admisión universitaria en Chile, administrado por DEMRE (Departamento de Evaluación, Medición y Registro Educacional). Reemplazó a la PSU en 2023.

### Competencias Matemáticas

- **M1 (Competencia Matemática 1)**: Obligatoria para todas las carreras. Evalúa conocimientos básicos de matemáticas.
- **M2 (Competencia Matemática 2)**: Optativa, requerida para carreras de ciencias, ingeniería y tecnología.

### Áreas de Contenido PAES Matemática

1. **Números**: Operaciones, fracciones, porcentajes, potencias, raíces
2. **Álgebra y Funciones**: Ecuaciones, inecuaciones, funciones lineales y cuadráticas
3. **Geometría**: Perímetro, área, volumen, ángulos, coordenadas
4. **Probabilidad y Estadística**: Medidas de tendencia central, probabilidad básica

## Contacto

- Website: https://simplepaes.cl
- WhatsApp: +56 9 3133 8020
- Email: soporte@paes-math.cl

## Páginas Principales

- Página principal: https://simplepaes.cl
- Cómo funciona: https://simplepaes.cl/como-funciona
- Precios: https://simplepaes.cl/pricing
- Contacto: https://simplepaes.cl/contacto
- Términos y condiciones: https://simplepaes.cl/legal/terminos
- Política de privacidad: https://simplepaes.cl/legal/privacidad

## Preguntas Frecuentes

### ¿Cuánto cuesta SimplePAES?
$8.000 CLP mensuales con 7 días de prueba gratis. Sin permanencia mínima.

### ¿SimplePAES sirve para M1 y M2?
Sí, cubre ambas competencias matemáticas.

### ¿Puedo pedir reembolso?
Sí, derecho a retracto de 10 días según la Ley del Consumidor de Chile.

### ¿Cómo funciona la práctica personalizada?
El sistema analiza tus errores y adapta los ejercicios para reforzar tus áreas débiles.

### ¿Qué son las mini-lecciones?
Lecciones interactivas que te explican el por qué, no solo el cómo. Cada una tiene ejemplos motivadores, práctica guiada con feedback, y un quiz para verificar que entendiste. No memorizas —entiendes.

### ¿Cómo funciona el Tutor AI?
El Tutor AI usa metodología Socrática: en vez de darte la respuesta, te hace preguntas que te guían a entender el problema por ti mismo. Está disponible 24/7 en el Modo Zen.

### ¿SimplePAES tiene explicaciones de los ejercicios?
Sí. Las mini-lecciones te explican el por qué de cada concepto, no solo el procedimiento. Además, cuando te equivocas, el Tutor AI te ayuda a entender dónde fallaste.
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
    },
  });
}
