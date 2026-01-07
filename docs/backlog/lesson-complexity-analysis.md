# Análisis de Complejidad de Lecciones

Este documento analiza si las lecciones existentes están bien dimensionadas o necesitan dividirse.

**Última actualización:** 2025-01-06

## Metodología de Evaluación

### Criterios Cuantitativos (Banderas Iniciales)
| Criterio | Umbral | Bandera |
|----------|--------|---------|
| `estimatedMinutes` | ≤ 15 min | > 15 min |
| `skills` | ≤ 3 | > 3 |

### Criterios Cualitativos (Evaluación Contextual)
| Pregunta | Si "Sí" → Mantener unida |
|----------|---------------------------|
| ¿La comparación entre conceptos ES el objetivo de aprendizaje? | ✓ |
| ¿Los conceptos son matemáticamente sinónimos o jerárquicos? | ✓ |
| ¿Es una lección de aplicación/síntesis después de lecciones fundacionales? | ✓ |
| ¿Separar destruiría la narrativa pedagógica unificadora? | ✓ |

---

## Resumen Ejecutivo

| Métrica | Valor |
|---------|-------|
| Lecciones analizadas | 62 |
| Realmente necesitan división | **1** |
| Parecen complejas pero están bien | 11 |
| Claramente bien dimensionadas | 50 |

---

## Lección que SÍ Necesita División

### m1-num-002-g: "Multiplicación y División de Fracciones"
**Duración:** 15 min | **Skills:** 4

**Por qué SÍ dividir:**

| Aspecto | Multiplicación | División |
|---------|----------------|----------|
| Modelo mental | Área (visual/espacial) | Recíproco (transformación) |
| Dificultad | Intuitiva | Abstracta |
| Errores comunes | Pocos | "¿Por qué invertir?" |

**Problema pedagógico:**
- La división por fracciones es históricamente donde más fallan los estudiantes
- El concepto de recíproco merece su propia exploración
- El paso Explain debe cubrir dos operaciones conceptualmente diferentes

**Propuesta de división:**

| Nueva Lección | Contenido | Duración |
|---------------|-----------|----------|
| m1-num-002-g | Multiplicación de Fracciones (modelo de área) | 10-12 min |
| m1-num-002-h | División de Fracciones (el recíproco) | 12-14 min |

**Impacto:** +1 lección (de 62 a 63)

---

## Lecciones que Parecen Complejas Pero Están Bien Diseñadas

### 1. m1-alg-001-c: "Productos Notables" (17 min, 3 skills)

**Por qué está BIEN:**
- Cubre 3 fórmulas de **expansión** (mismo tipo de operación)
- Las **factorizaciones inversas** YA están separadas:
  - m1-alg-001-g: Diferencia de Cuadrados
  - m1-alg-001-h: Trinomios Cuadráticos Perfectos
- La estructura de 10 lecciones en M1-ALG-001 es excelente

**Diseño curricular:**
```
EXPANSIÓN (operación directa)
├── m1-alg-001-c: 3 productos notables juntos ← apropiado
└── m1-alg-001-d: Cubos (separados por complejidad)

FACTORIZACIÓN (operación inversa) ← cada caso separado
├── m1-alg-001-g: Diferencia de cuadrados
├── m1-alg-001-h: Trinomios perfectos
└── ...otros casos
```

---

### 2. m1-num-005-a: "Problemas con Porcentajes" (16 min, 4 skills)

**Por qué está BIEN:**
- Es una lección de **aplicación** después de m1-num-004-a (concepto)
- Los 4 tipos de problemas son variantes del **mismo modelo**:
  - Encontrar la parte
  - Encontrar el porcentaje
  - Encontrar el total
  - Aumentos/descuentos
- El skill principal es **clasificar qué tipo de problema es**
- Separar fragmentaría esta habilidad unificadora

**Patrón curricular:** Similar a m1-alg-003-a (problemas con ecuaciones) - lecciones de "problemas" son intencionalmente integradoras.

---

### 3. m1-prob-002-a: "Tendencia Central" (15 min, 4 skills)

**Por qué está BIEN:**
- La **comparación** entre media, mediana y moda ES el objetivo
- "¿Cuándo usar cada una?" solo se responde mostrando sus diferencias
- El paso "Efecto del Outlier" requiere comparar las tres
- Enseñarlas por separado crearía el misconception de que son alternativas independientes

**Insight pedagógico:** Los estadísticos eligen la medida correcta COMPARANDO sus propiedades.

---

### 4. m1-prob-003-a: "Cuartiles, Percentiles y Diagramas de Caja" (15 min, 4 skills)

**Por qué está BIEN:**
- Estos conceptos son **matemáticamente sinónimos**:
  - Cuartiles = percentiles en 25%, 50%, 75%
  - Boxplot = visualización de cuartiles
- Históricamente, el boxplot se inventó PARA visualizar cuartiles
- No puedes enseñar boxplot sin entender cuartiles
- No puedes enseñar cuartiles sin el boxplot como visualización

**Jerarquía conceptual:** Cuartiles → Percentiles (generalización) → Boxplot (representación)

---

### 5. m1-prob-001-a: "Tablas de Frecuencia y Gráficos" (12 min, 4 skills)

**Por qué está BIEN:**
- Enseña **equivalencia representacional**: tabla = barras = circular
- Es una lección fundacional que introduce el campo de estadística
- Los gráficos de barras y circulares muestran los MISMOS datos diferente
- Separar destruiría el insight de "múltiples representaciones del mismo fenómeno"

---

### 6. m1-alg-009-a: "Función Lineal y Afín" (18 min, 4 skills)

**Por qué está BIEN (aunque parece compleja):**
- Esta lección marca la **transición** de "resolver ecuaciones" a "entender funciones"
- y = mx necesita y = mx + b como contexto para entender "qué cambia"
- La pendiente solo tiene sentido comparando diferentes interceptos
- Las 4 skills forman una progresión lógica:
  1. ¿Qué es una función?
  2. Función lineal (y = mx)
  3. Función afín y pendiente (y = mx + b, rol de m)
  4. Graficación

**Desglose de 18 min:**
- 2 min: Hook
- 4 min: Descubrimiento de patrón
- 5 min: Explicación conceptual (4 tabs comparativos)
- 3 min: Clasificación
- 4 min: Práctica de graficación

---

### 7. m1-alg-005-b: "Proporcionalidad Compuesta" (18 min, 3 skills)

**Por qué está BIEN:**
- Es la lección **culminante** de proporcionalidad después de:
  - m1-alg-004-a: Proporción directa e inversa (conceptos)
  - m1-alg-005-a: Problemas de proporcionalidad (simple)
- La complejidad está en combinar directa + inversa, que ES el tema
- 18 min es apropiado para síntesis de nivel avanzado

---

### 8. m1-prob-006-b: "Comprender el Azar" (16 min, 4 skills)

**Por qué está BIEN:**
- La Tabla de Galton DEMUESTRA la Ley de los Grandes Números
- Son conceptos inseparables: el experimento prueba la teoría
- La distribución normal emerge de la Tabla de Galton
- Separar destruiría la conexión experimento → teoría → aplicación

---

## Conclusiones

### Tipos de Lecciones en el Curriculum

| Tipo | Características | Duración Típica |
|------|-----------------|-----------------|
| **Fundacional** | Un concepto, una habilidad | 10-14 min |
| **Integración** | Muestra relaciones entre conceptos | 15-18 min |
| **Aplicación** | Múltiples escenarios de un tipo de problema | 15-18 min |
| **Síntesis** | Combina habilidades previas | 16-18 min |

### Lecciones Modelo (Buen Dimensionamiento)

| Lección | Duración | Por qué funciona |
|---------|----------|------------------|
| m1-num-001-a | 10 min | Un concepto (orden), una habilidad (valor absoluto) |
| m1-geo-001-a | 12 min | Un teorema, enfoque claro |
| m1-alg-001-g | 14 min | Una fórmula de factorización |
| m1-prob-004-a | 12 min | Un concepto (probabilidad básica) |

### Acción Requerida

**Solo 1 división necesaria:**
- m1-num-002-g → separar multiplicación de división de fracciones

**No dividir las demás** - el análisis inicial confundió "múltiples componentes" con "demasiado complejo". En lecciones de integración y síntesis, múltiples componentes es el diseño correcto.

---

## Aprendizajes para Futuras Lecciones

1. **Lecciones de 15-18 min son apropiadas** para temas de integración
2. **4 skills está bien** si los skills están jerárquicamente relacionados
3. **Separar por operación** (ej: + vs ×) solo si los modelos mentales son diferentes
4. **Mantener unidas** cuando la comparación ES el objetivo de aprendizaje
5. **Las lecciones fundacionales** deben ser simples (10-14 min, 2-3 skills)
6. **Las lecciones de aplicación** pueden ser más complejas porque integran
