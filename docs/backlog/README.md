# Mini Lessons Backlog

Este directorio organiza el backlog de mini lecciones del proyecto SimplePAES.

## Estructura de Archivos

| Archivo | Descripción |
|---------|-------------|
| [m1-backlog.md](./m1-backlog.md) | Lecciones nivel PAES M1 (fundamental) |
| [m2-backlog.md](./m2-backlog.md) | Lecciones nivel PAES M2 (avanzado) |
| [7-basico-oa.md](./7-basico-oa.md) | Cobertura OA 7° Básico |
| [8-basico-oa.md](./8-basico-oa.md) | Cobertura OA 8° Básico |
| [1-medio-oa.md](./1-medio-oa.md) | Cobertura OA 1° Medio |
| [2-medio-oa.md](./2-medio-oa.md) | Cobertura OA 2° Medio |
| [3-medio-oa.md](./3-medio-oa.md) | Cobertura OA 3° Medio (Formación General) |
| [4-medio-oa.md](./4-medio-oa.md) | Cobertura OA 4° Medio (Formación General) |
| [lesson-complexity-analysis.md](./lesson-complexity-analysis.md) | Análisis de lecciones a dividir |

---

## Nomenclatura Importante

### Niveles de Competencia PAES vs Niveles Escolares

| Concepto | Significado | Ejemplo |
|----------|-------------|---------|
| **M1** | PAES Competencia Matemática 1 (fundamental) | Lecciones con `level: 'M1'` |
| **M2** | PAES Competencia Matemática 2 (avanzado) | Lecciones con `level: 'M2'` |
| **7B** | 7° Básico (7° grado) | 19 OA curriculares |
| **8B** | 8° Básico (8° grado) | 17 OA curriculares |
| **1M** | 1° Medio (9° grado) | 15 OA curriculares |
| **2M** | 2° Medio (10° grado) | 12 OA curriculares |
| **3M** | 3° Medio (11° grado) | 4 OA Formación General |
| **4M** | 4° Medio (12° grado) | 4 OA Formación General |

### Relación Cross-Referencial

Una lección puede mapear a múltiples OA de diferentes grados:

```
┌─────────────────────────────────────────────────────────────┐
│                    LECCIÓN m1-num-005-a                     │
│              "Problemas con Porcentajes"                    │
│                    (level: M1)                              │
└─────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
    ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
    │   2° Medio    │ │   4° Medio    │ │   PAES M1     │
    │  MA2M-OA-06   │ │FG-MATE-4M-01  │ │               │
    │   Cambio %    │ │ Mat. Financ.  │ │               │
    └───────────────┘ └───────────────┘ └───────────────┘
```

---

## Resumen Ejecutivo

### Estado Actual

| Nivel | Implementadas | Pendientes | Total Est. | % Cobertura |
|-------|---------------|------------|------------|-------------|
| M1    | 59            | ~36        | ~95        | 62%         |
| M2    | 3             | ~30        | ~33        | 9%          |
| **Total** | **62**    | **~66**    | **~128**   | **48%**     |

### Cobertura OA por Grado

| Grado | Total OA | OA con Lecciones | % Cobertura |
|-------|----------|------------------|-------------|
| 7° Básico | 19   | 11               | 58%         |
| 8° Básico | 17   | 13               | 76%         |
| 1° Medio | 15    | 10               | 67%         |
| 2° Medio | 12    | 5                | 42%         |
| 3° Medio | 4     | 2                | 50%         |
| 4° Medio | 4     | 1                | 25%         |

---

## Análisis Pedagógico

### Fortalezas Actuales

1. **Números Racionales** (M1-NUM-002): Cobertura completa con 7 lecciones progresivas
   - Concepto → Comparación → MCD → Suma/Resta → MCM → Operaciones mixtas
   - Excelente scaffolding pedagógico

2. **Productos Notables y Factorización** (M1-ALG-001): 10 lecciones exhaustivas
   - Cubre todos los casos de factorización necesarios para PAES
   - Buena progresión de complejidad

3. **Sistemas de Ecuaciones** (M1-ALG-008): 4 métodos completos
   - Gráfico → Sustitución → Igualación → Reducción
   - Permite al estudiante elegir su método preferido

4. **Probabilidad Básica** (M1-PROB-004): 3 lecciones que cubren fundamentos
   - Eventos → Reglas → Condicional/Independencia
   - Buena base para temas avanzados

### Brechas Críticas (Alta Prioridad)

#### 1. Función Cuadrática (M1-ALG-012, M1-ALG-013, M1-ALG-014)
**Impacto:** 15-20% de preguntas PAES

**Situación actual:**
- Solo existe "Completar el Cuadrado" (M1-ALG-011-a)
- Falta toda la unidad de función cuadrática

**Lecciones necesarias:**
| ID Propuesto | Título | Justificación |
|--------------|--------|---------------|
| m1-alg-011-b | Fórmula Cuadrática | Método algebraico esencial |
| m1-alg-012-a | Función Cuadrática: Concepto | Base para análisis gráfico |
| m1-alg-012-b | Gráfico de la Parábola | Interpretación visual |
| m1-alg-013-a | Vértice de la Parábola | Elemento clave en problemas |
| m1-alg-013-b | Ceros e Intersecciones | Conexión álgebra-geometría |
| m1-alg-014-a | Problemas de Optimización | Aplicación más frecuente en PAES |

#### 2. Inecuaciones (M1-ALG-006, M1-ALG-007)
**Impacto:** 5-10% de preguntas PAES

**Situación actual:**
- Solo ecuaciones lineales, faltan inecuaciones

**Lecciones necesarias:**
| ID Propuesto | Título | Justificación |
|--------------|--------|---------------|
| m1-alg-006-b | Inecuaciones Lineales | Concepto fundamental |
| m1-alg-007-a | Problemas con Inecuaciones | Aplicación contextualizada |

#### 3. Permutaciones y Combinaciones (M1-PROB-005)
**Impacto:** 5-8% de preguntas PAES

**Situación actual:**
- Solo "Principio Multiplicativo" como base

**Lecciones necesarias:**
| ID Propuesto | Título | Justificación |
|--------------|--------|---------------|
| m1-prob-005-b | Permutaciones | Conteo ordenado |
| m1-prob-005-c | Combinaciones | Conteo sin orden |

### Brechas Importantes (Media Prioridad)

#### 4. Vectores en el Plano (M1-GEO-004)
**Situación:** Unidad casi vacía (solo coordenadas cartesianas)

**Lecciones necesarias:**
| ID Propuesto | Título |
|--------------|--------|
| m1-geo-004-b | Vectores: Concepto y Notación |
| m1-geo-004-c | Operaciones con Vectores |
| m1-geo-004-d | Distancia entre Puntos |
| m1-geo-004-e | Punto Medio |

#### 5. Transformaciones Isométricas (M1-GEO-005)
**Situación:** Unidad completamente vacía

**Lecciones necesarias:**
| ID Propuesto | Título |
|--------------|--------|
| m1-geo-005-a | Traslación |
| m1-geo-005-b | Reflexión |
| m1-geo-005-c | Rotación |
| m1-geo-005-d | Composición de Transformaciones |

#### 6. Volúmenes (M1-GEO-003)
**Situación:** Solo cono, faltan cilindro y prismas

**Lecciones necesarias:**
| ID Propuesto | Título |
|--------------|--------|
| m1-geo-003-b | Volumen del Cilindro |
| m1-geo-003-c | Volumen de Prismas |
| m1-geo-003-d | Área de Superficies |

### Recomendaciones de Lecciones Adicionales

#### Lecciones de Síntesis/Integración

Pedagógicamente, algunas unidades se beneficiarían de lecciones que integren conceptos:

| ID Propuesto | Título | Justificación |
|--------------|--------|---------------|
| m1-alg-001-k | Factorización: Estrategias Combinadas | Después de 10 lecciones, un integrador |
| m1-alg-008-e | Problemas con Sistemas 2x2 | Aplicación contextualizada |
| m1-geo-001-d | Problemas con Pitágoras | Después de la teoría, problemas variados |

#### Lecciones de Prerrequisito

Algunos conceptos asumen conocimientos que podrían necesitar refuerzo:

| ID Propuesto | Título | Para qué unidad |
|--------------|--------|-----------------|
| m1-num-001-d | Operaciones Combinadas con Enteros | Antes de fracciones |
| m1-alg-002-b | Multiplicación de Polinomios | Antes de factorización avanzada |

---

## Plan de Priorización

### Fase 1: Core PAES M1 (Prioridad Alta)
Objetivo: Cubrir 80% de temas PAES M1

1. Función Cuadrática completa (6 lecciones)
2. Inecuaciones (2 lecciones)
3. Permutaciones y Combinaciones (2 lecciones)
4. Fórmula Cuadrática (1 lección)

**Total Fase 1:** 11 lecciones

### Fase 2: Completar M1 (Prioridad Media)
Objetivo: Cobertura completa de unidades M1

1. Vectores (4 lecciones)
2. Transformaciones (4 lecciones)
3. Volúmenes restantes (3 lecciones)
4. Integración/Problemas (3 lecciones)

**Total Fase 2:** 14 lecciones

### Fase 3: M2 Core (Prioridad Baja)
Objetivo: Cubrir temas M2 esenciales

1. Trigonometría (4 lecciones)
2. Logaritmos avanzados (3 lecciones)
3. Combinatoria avanzada (3 lecciones)

**Total Fase 3:** 10 lecciones

---

## Métricas de Seguimiento

### Definiciones
- **Implementada**: Lección con código funcional en `/components/lessons/`
- **En Desarrollo**: PR abierto o en branch
- **Pendiente**: Definida pero sin implementación
- **Propuesta**: Sugerida pero no confirmada

### Última Actualización
- **Fecha:** 2025-01-06
- **Implementadas:** 62
- **Pendientes confirmadas:** 36
- **Propuestas adicionales:** ~30

---

## Referencias

- [lib/lessons/lessons/](../../lib/lessons/lessons/) - Definiciones de lecciones
- [lib/curriculum/mineduc.ts](../../lib/curriculum/mineduc.ts) - Mapeo OA MINEDUC
- [lib/lessons/thematicUnits.ts](../../lib/lessons/thematicUnits.ts) - Unidades temáticas
