# Abstract Problems Generation System

Sistema completo para generar y poblar la base de datos con ~1000 problemas abstractos organizados por unidades temáticas de PAES M1 y M2.

## 📋 Contenido

1. [Estructura](#estructura)
2. [Taxonomía de Unidades](#taxonomía-de-unidades)
3. [Uso del Sistema](#uso-del-sistema)
4. [Ejemplos](#ejemplos)
5. [Configuración](#configuración)

## 🏗️ Estructura

### Archivos Principales

- **`thematic-units.ts`**: Taxonomía completa de todas las unidades temáticas PAES M1 y M2
- **`seed-abstract-problems.ts`**: Script para generar ~1000 problemas abstractos usando OpenAI
- **`abstractProblemService.ts`**: Servicio de base de datos para CRUD de problemas abstractos
- **`abstractProblemGenerator.ts`**: Generador de problemas usando OpenAI

### Base de Datos

Tabla principal: `abstract_problems`
- **id**: UUID único
- **essence**: La esencia matemática del problema (texto abstracto)
- **cognitive_level**: Nivel cognitivo (remember, understand, apply, analyze, evaluate, create)
- **level**: M1 o M2
- **subject**: números, álgebra, geometría, probabilidad
- **unit**: Nombre de la unidad temática
- **difficulty**: easy, medium, hard, extreme
- **difficulty_score**: 1-100 (granularidad fina)
- **primary_skills**: Array de habilidades principales
- **answer_type**: multiple_choice, numeric, algebraic, true_false
- **status**: draft, reviewed, active, deprecated

## 📚 Taxonomía de Unidades

### M1 (33 unidades temáticas)

#### 1. NÚMEROS (8 unidades)
- Operaciones y orden en el conjunto de los números enteros
- Operaciones y comparación entre números racionales
- Problemas con números enteros y racionales en distintos contextos
- Concepto y cálculo de porcentaje
- Problemas que involucren porcentajes en diversos contextos
- Propiedades de potencias de base y exponente racional
- Descomposición y propiedades de raíces enésimas
- Problemas con potencias y raíces enésimas en números reales

#### 2. ÁLGEBRA Y FUNCIONES (14 unidades)
- Productos notables, factorizaciones y desarrollo
- Operatoria con expresiones algebraicas
- Problemas algebraicos en distintos contextos
- Proporción directa e inversa y sus representaciones
- Problemas con proporcionalidad directa e inversa
- Resolución de ecuaciones e inecuaciones lineales
- Problemas con ecuaciones e inecuaciones en distintos contextos
- Resolución y aplicación de sistemas de ecuaciones lineales (2x2)
- Función lineal y afín: concepto, tablas y gráficos
- Aplicaciones de función lineal y afín en problemas reales
- Resolución de ecuaciones de segundo grado
- Función cuadrática: tablas y gráficos según parámetros
- Función cuadrática: vértice, ceros e intersecciones
- Aplicaciones de función cuadrática en distintos contextos

#### 3. GEOMETRÍA (5 unidades)
- Teorema de Pitágoras
- Perímetros y áreas de triángulos, paralelogramos, trapecios y círculos
- Área y volumen de prismas rectos y cilindros
- Puntos y vectores en el plano
- Rotación, traslación y reflexión de figuras geométricas

#### 4. PROBABILIDAD Y ESTADÍSTICA (5 unidades)
- Tablas de frecuencia y gráficos estadísticos
- Media, mediana, moda y rango de uno o más grupos de datos
- Cuartiles, percentiles y diagramas de caja
- Probabilidad de eventos
- Reglas aditiva y multiplicativa de probabilidad

### M2 (13 unidades adicionales)

#### 1. NÚMEROS (6 unidades)
- Operaciones en el conjunto de los números reales
- Problemas que involucren números reales en diversos contextos
- Problemas aplicados a finanzas: AFP, jubilación, créditos
- Relación entre potencias, raíces y logaritmos
- Propiedades de los logaritmos
- Problemas con logaritmos en distintos contextos

#### 2. ÁLGEBRA Y FUNCIONES (3 unidades)
- Análisis de sistemas con única solución, infinitas soluciones o sin solución
- Función potencia: representación gráfica
- Problemas que involucren la función potencia en distintos contextos

#### 3. GEOMETRÍA (3 unidades)
- Problemas con homotecia en diversos contextos
- Seno, coseno y tangente en triángulos rectángulos
- Aplicaciones de razones trigonométricas en problemas cotidianos

#### 4. PROBABILIDAD Y ESTADÍSTICA (4 unidades)
- Cálculo y comparación de medidas de dispersión
- Aplicaciones y propiedades de la probabilidad condicional
- Conceptos y resolución de problemas de conteo (permutación y combinatoria)
- Problemas que involucren el modelo binomial y otros modelos probabilísticos

### Total: 46 unidades temáticas

## 🚀 Uso del Sistema

### 1. Requisitos Previos

```bash
# Configurar OpenAI API Key en .env
OPENAI_API_KEY=sk-...
```

### 2. Generar Todos los Problemas (~1000)

```bash
cd backend
npm run seed:abstract-problems
```

Esto generará:
- **8 unidades clave** con 30 problemas cada una = 240 problemas
- **38 unidades estándar** con 15 problemas cada una = 570 problemas
- **Total estimado: ~810 problemas base + variaciones = ~1000 problemas**

Distribución por dificultad (por unidad estándar):
- Easy: 6 problemas (3 understand + 3 apply)
- Medium: 6 problemas (3 apply + 3 analyze)
- Hard: 3 problemas (2 analyze + 1 evaluate)

### 3. Modo Dry Run (Prueba sin generar)

```bash
npm run seed:abstract-problems -- --dry-run
```

Esto muestra qué se generaría sin hacer llamadas a OpenAI ni guardar en la DB.

### 4. Generar Solo para M1

```bash
npm run seed:abstract-problems -- --level=M1
```

### 5. Generar Solo para una Materia

```bash
npm run seed:abstract-problems -- --subject=números
npm run seed:abstract-problems -- --subject=álgebra
npm run seed:abstract-problems -- --subject=geometría
npm run seed:abstract-problems -- --subject=probabilidad
```

### 6. Generar Solo Primeras N Unidades (Testing)

```bash
npm run seed:abstract-problems -- --limit=3
```

### 7. Combinación de Filtros

```bash
# Solo álgebra M1, primeras 5 unidades
npm run seed:abstract-problems -- --level=M1 --subject=álgebra --limit=5

# Dry run de geometría M2
npm run seed:abstract-problems -- --level=M2 --subject=geometría --dry-run
```

## 📊 Ejemplos de Problemas Generados

### Ejemplo 1: Números Enteros - Easy/Understand
```
Essence: "Ordena de menor a mayor: -5, 3, 0, -1, 2"
Unit: "Operaciones y orden en el conjunto de los números enteros"
Level: M1
Subject: números
Difficulty: easy
Cognitive Level: understand
Answer Type: multiple_choice
```

### Ejemplo 2: Álgebra - Medium/Apply
```
Essence: "Resuelve la ecuación: 2x - 5 = 3"
Unit: "Resolución de ecuaciones e inecuaciones lineales"
Level: M1
Subject: álgebra
Difficulty: medium
Cognitive Level: apply
Answer Type: multiple_choice
```

### Ejemplo 3: Geometría - Hard/Analyze
```
Essence: "En un triángulo rectángulo, la hipotenusa mide 10 cm y un cateto mide 6 cm. Calcula el área del triángulo."
Unit: "Teorema de Pitágoras"
Level: M1
Subject: geometría
Difficulty: hard
Cognitive Level: analyze
Answer Type: numeric
```

### Ejemplo 4: Probabilidad - Extreme/Evaluate
```
Essence: "Determina si dos eventos A y B son independientes dado que P(A)=0.4, P(B)=0.3, P(A∩B)=0.15"
Unit: "Reglas aditiva y multiplicativa de probabilidad"
Level: M1
Subject: probabilidad
Difficulty: extreme
Cognitive Level: evaluate
Answer Type: true_false
```

## ⚙️ Configuración Avanzada

### Modificar Distribución de Problemas

Edita `seed-abstract-problems.ts`:

```typescript
// Cambiar número de problemas por unidad estándar
const standardDistribution = [
  { difficulty: 'easy', cognitive_level: 'understand', count: 3 },
  { difficulty: 'easy', cognitive_level: 'apply', count: 3 },
  // ... modificar aquí
];

// Agregar más unidades clave (30 problemas en lugar de 15)
const keyUnits = [
  'M1-NUM-001',
  'M1-ALG-006',
  // ... agregar más códigos de unidad
];
```

### Agregar Nuevas Unidades Temáticas

Edita `thematic-units.ts`:

```typescript
export const THEMATIC_UNITS: ThematicUnit[] = [
  // ... unidades existentes
  {
    code: 'M1-NUM-009',
    name: 'Nueva unidad temática',
    level: 'M1',
    subject: 'números',
  },
];
```

## 🎯 Unidades Clave (30 problemas cada una)

Estas unidades tienen distribución extendida por ser fundamentales:

1. **M1-NUM-001**: Operaciones y orden en números enteros
2. **M1-NUM-002**: Operaciones y comparación en racionales
3. **M1-NUM-005**: Problemas de porcentajes
4. **M1-ALG-006**: Ecuaciones e inecuaciones lineales
5. **M1-ALG-011**: Ecuaciones de segundo grado
6. **M1-GEO-002**: Áreas y perímetros
7. **M1-PROB-002**: Medidas de tendencia central
8. **M1-PROB-004**: Probabilidad de eventos

## 📈 Estadísticas Esperadas

Al completar la generación:

```
Total unidades: 46
Total problemas: ~1000

Por nivel:
- M1: ~660 problemas (33 unidades)
- M2: ~195 problemas (13 unidades)

Por materia:
- Números: ~300 problemas
- Álgebra: ~405 problemas
- Geometría: ~180 problemas
- Probabilidad: ~180 problemas

Por dificultad:
- Easy: ~300 problemas (30%)
- Medium: ~300 problemas (30%)
- Hard: ~250 problemas (25%)
- Extreme: ~150 problemas (15%)
```

## 🔍 Verificar Resultados

```bash
# Conectar a la base de datos
psql -U your_user -d your_database

# Ver resumen de problemas generados
SELECT
  level,
  subject,
  difficulty,
  COUNT(*) as count
FROM abstract_problems
GROUP BY level, subject, difficulty
ORDER BY level, subject, difficulty;

# Ver problemas por unidad
SELECT
  unit,
  COUNT(*) as count
FROM abstract_problems
GROUP BY unit
ORDER BY count DESC;
```

## 🛠️ Troubleshooting

### Error: OPENAI_API_KEY not set
```bash
# Agregar en .env
OPENAI_API_KEY=sk-your-key-here
```

### Error: Rate limit exceeded
El script incluye delays de 1 segundo entre llamadas. Si aún así hay problemas:
- Usa `--limit` para generar en lotes pequeños
- Espera y continúa después

### Problemas con la base de datos
```bash
# Verificar que la tabla existe
psql -U your_user -d your_database -c "\d abstract_problems"

# Ejecutar migraciones si es necesario
# (verificar con tu equipo el proceso de migraciones)
```

## 📝 Notas

- Todos los problemas generados comienzan con status `draft`
- Se pueden revisar y cambiar a `active` manualmente o mediante otro script
- Los problemas incluyen `expected_steps` y `common_errors` generados por OpenAI
- El `difficulty_score` (1-100) se calcula automáticamente basado en nivel cognitivo y habilidades

## 🎓 Próximos Pasos

1. **Generar problemas**: Ejecutar el seed para poblar la DB
2. **Revisar problemas**: Cambiar status de `draft` a `reviewed` o `active`
3. **Generar contextos**: Usar los abstract problems para generar context problems con diferentes escenarios
4. **Validar con estudiantes**: Probar los problemas y ajustar difficulty_scores basado en métricas reales
