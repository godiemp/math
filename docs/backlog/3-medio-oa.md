# Cobertura OA - 3° Medio (Formación General)

Objetivos de Aprendizaje de 3° Medio y su mapeo a mini lecciones.

**Última actualización:** 2025-01-06

## Resumen

| Métrica | Valor |
|---------|-------|
| Total OA | 4 |
| OA con cobertura | 2 |
| OA sin cobertura | 2 |
| % Cobertura | 50% |
| Total lecciones mapeadas | 4 |

---

## FG-MATE-3M-OAC-01: Números complejos ❌
> Resolver problemas de adición, sustracción, multiplicación y división de números complejos C.

**Estado:** ❌ Sin cobertura (fuera de alcance actual)
**Tipo:** Basal (Formación General)

**Nota:** Los números complejos no están contemplados en el curriculum M1/M2 de PAES actualmente. Este es un tema de Formación General específico de 3° Medio.

**Pendiente (futuro):**
- fg-3m-num-001: Introducción a Números Complejos
- fg-3m-num-002: Operaciones con Complejos
- fg-3m-num-003: Representación en el Plano Complejo

---

## FG-MATE-3M-OAC-02: Decisiones en incerteza ✅
> Tomar decisiones en situaciones de incerteza que involucren análisis de datos estadísticos con medidas de dispersión y probabilidades condicionales.

**Estado:** ✅ Cobertura parcial (3 lecciones)
**Tipo:** Basal (Formación General)

| Lección | Nivel | Título |
|---------|-------|--------|
| m2-prob-001-a | M2 | Medidas de Dispersión: Rango, Varianza y Desviación Estándar |
| m1-prob-003-a | M1 | Cuartiles, Percentiles y Diagramas de Caja |
| m1-prob-004-c | M1 | Probabilidad Condicional e Independencia |

**Análisis de cobertura:**
- ✅ Medidas de dispersión: Cubierto
- ✅ Cuartiles/Percentiles: Cubierto
- ✅ Probabilidad condicional: Cubierto
- ⚠️ Toma de decisiones con datos: Implícito en lecciones, podría reforzarse

---

## FG-MATE-3M-OAC-03: Funciones exponencial y logarítmica ❌
> Aplicar modelos matemáticos que describen fenómenos de crecimiento y decrecimiento exponencial y logarítmico.

**Estado:** ❌ Sin cobertura directa
**Tipo:** Basal (Formación General)

**Prerrequisitos cubiertos:**
- m2-num-004-a: Relación entre Potencias, Raíces y Logaritmos

**Pendiente:**
- m2-alg-002-c: Función Exponencial
- m2-alg-003-a: Crecimiento Exponencial
- m2-alg-003-b: Decrecimiento Exponencial
- m2-num-005-a: Propiedades de Logaritmos

---

## FG-MATE-3M-OAC-04: Geometría euclidiana (circunferencia) ✅
> Resolver problemas de geometría euclidiana que involucran relaciones métricas entre ángulos, arcos, cuerdas y secantes en la circunferencia.

**Estado:** ✅ Cobertura parcial (1 lección base)
**Tipo:** Basal (Formación General)

| Lección | Nivel | Título |
|---------|-------|--------|
| m1-geo-002-a | M1 | Circunferencia y Área del Círculo |
| m1-geo-002-c | M1 | Sectores Circulares y Longitud de Arco |

**Análisis de cobertura:**
- ✅ Conceptos básicos de circunferencia
- ✅ Arcos y sectores
- ❌ Relaciones métricas (cuerdas, secantes)
- ❌ Ángulos inscritos y centrales

**Pendiente:**
- fg-3m-geo-001: Ángulos en la Circunferencia
- fg-3m-geo-002: Cuerdas y Secantes
- fg-3m-geo-003: Teoremas de la Circunferencia

---

## Análisis para 3° Medio

### Cobertura por Eje

| Eje | OA | Estado |
|-----|-----|--------|
| Números | FG-3M-OAC-01 | ❌ Fuera de alcance |
| Probabilidad | FG-3M-OAC-02 | ✅ Buena cobertura |
| Álgebra | FG-3M-OAC-03 | ❌ Necesita lecciones |
| Geometría | FG-3M-OAC-04 | ⚠️ Parcial |

### Prioridades para 3° Medio

1. **Funciones exponencial/logarítmica** - Crítico para FG-3M-OAC-03
2. **Geometría de circunferencia avanzada** - Para completar FG-3M-OAC-04
3. **Números complejos** - Opcional, depende de prioridades del proyecto

---

## Cross-Referencias con M1/M2

Las lecciones de 3° Medio se construyen sobre fundamentos M1/M2:

```
┌────────────────────────────────────────────────────────────┐
│                    3° MEDIO (FG)                           │
├────────────────────────────────────────────────────────────┤
│  FG-3M-OAC-02      │  FG-3M-OAC-03     │  FG-3M-OAC-04    │
│  Decisiones        │  Exp/Log          │  Circunferencia  │
└────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌────────────────────────────────────────────────────────────┐
│                    FUNDAMENTOS M1/M2                       │
├────────────────────────────────────────────────────────────┤
│  m1-prob-003-a     │  m2-num-004-a     │  m1-geo-002-a    │
│  m1-prob-004-c     │  (Logaritmos)     │  m1-geo-002-c    │
│  m2-prob-001-a     │                   │                  │
└────────────────────────────────────────────────────────────┘
```

### Prerrequisitos recomendados

Para estudiantes de 3° Medio, se recomienda completar primero:
1. Todas las lecciones de probabilidad M1 (m1-prob-001 a m1-prob-006)
2. Lección de logaritmos M2 (m2-num-004-a)
3. Lecciones de círculo M1 (m1-geo-002-a/b/c)
