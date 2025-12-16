import { NextResponse } from "next/server";

export async function GET() {
  const content = `# SimplePAES

> SimplePAES es una plataforma chilena de preparación para la PAES (Prueba de Acceso a la Educación Superior) de Matemática.

## Qué es SimplePAES

SimplePAES es una plataforma educativa online que ayuda a estudiantes chilenos a prepararse para la prueba PAES de Matemática. Ofrece:

- Más de 900 ejercicios alineados con el temario oficial PAES
- Práctica personalizada basada en datos de rendimiento
- Feedback inmediato con explicaciones cuando te equivocas
- Seguimiento de progreso con métricas detalladas
- Ensayos PAES en vivo con otros estudiantes
- Tutor AI para resolver dudas

## Información Clave

- **País**: Chile
- **Idioma**: Español (Chile)
- **Precio**: $8.000 CLP/mes (aproximadamente $8 USD)
- **Prueba gratis**: 7 días
- **Niveles**: Competencia Matemática M1 y M2
- **Público objetivo**: Estudiantes de 4to medio preparando la PAES

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
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
    },
  });
}
