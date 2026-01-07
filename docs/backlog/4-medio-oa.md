# Cobertura OA - 4° Medio (Formación General)

Objetivos de Aprendizaje de 4° Medio y su mapeo a mini lecciones.

**Última actualización:** 2025-01-06

## Resumen

| Métrica | Valor |
|---------|-------|
| Total OA | 4 |
| OA con cobertura | 1 |
| OA sin cobertura | 3 |
| % Cobertura | 25% |
| Total lecciones mapeadas | 2 |

---

## FG-MATE-4M-OAC-01: Matemática financiera ✅
> Fundamentar decisiones en el ámbito financiero y económico personal o comunitario, a partir de modelos que consideren porcentajes, tasas de interés e índices económicos.

**Estado:** ✅ Cobertura parcial (2 lecciones)
**Tipo:** Basal (Formación General)

| Lección | Nivel | Título |
|---------|-------|--------|
| m1-num-004-a | M1 | Concepto y Cálculo de Porcentaje |
| m1-num-005-a | M1 | Problemas con Porcentajes |

**Análisis de cobertura:**
- ✅ Porcentajes básicos: Cubierto
- ✅ Problemas con porcentajes: Cubierto
- ❌ Interés simple: Pendiente
- ❌ Interés compuesto: Pendiente
- ❌ Índices económicos (IPC, UF, UTM): Pendiente

**Pendiente:**
- m2-num-003-a: Interés Simple
- m2-num-003-b: Interés Compuesto
- m2-num-003-c: Inflación e Índices Económicos

---

## FG-MATE-4M-OAC-02: Modelos binomial y normal ❌
> Fundamentar decisiones en situaciones de incerteza, a partir del análisis crítico de datos estadísticos y con base en los modelos binomial y normal.

**Estado:** ❌ Sin cobertura
**Tipo:** Basal (Formación General)

**Prerrequisitos cubiertos:**
- m1-prob-002-a: Tendencia Central
- m2-prob-001-a: Medidas de Dispersión
- m1-prob-005-a: Principio Multiplicativo

**Pendiente:**
- m2-prob-003-a: Factorial y Permutaciones
- m2-prob-003-b: Combinaciones
- m2-prob-004-a: Distribución Binomial
- m2-prob-004-b: Esperanza y Varianza
- fg-4m-prob-001: Distribución Normal

---

## FG-MATE-4M-OAC-03: Funciones potencia y trigonométricas ❌
> Construir modelos de situaciones o fenómenos de crecimiento, decrecimiento y periódicos que involucren funciones potencias de exponente entero y trigonométricas sen(x) y cos(x).

**Estado:** ❌ Sin cobertura
**Tipo:** Basal (Formación General)

**Prerrequisitos parciales:**
- m1-num-003-a/b/c: Potencias (base para función potencia)

**Pendiente:**
- m2-alg-002-a: Función Potencia
- m2-geo-002-a: Seno, Coseno y Tangente (prerrequisito)
- fg-4m-alg-001: Funciones Trigonométricas sen(x), cos(x)
- fg-4m-alg-002: Modelado con Funciones Periódicas

---

## FG-MATE-4M-OAC-04: Geometría analítica ❌
> Resolver problemas acerca de rectas y circunferencias en el plano, mediante su representación analítica.

**Estado:** ❌ Sin cobertura
**Tipo:** Basal (Formación General)

**Prerrequisitos cubiertos:**
- m1-geo-004-a: Sistema de Coordenadas Cartesianas
- m1-alg-009-a: Función Lineal y Afín
- m1-geo-002-a: Circunferencia y Área del Círculo

**Pendiente:**
- m1-geo-004-d: Distancia entre Puntos
- m1-geo-004-e: Punto Medio
- fg-4m-geo-001: Ecuación de la Recta (formas)
- fg-4m-geo-002: Ecuación de la Circunferencia
- fg-4m-geo-003: Intersección Recta-Circunferencia

---

## Análisis para 4° Medio

### Cobertura por Eje

| Eje | OA | Estado |
|-----|-----|--------|
| Números | FG-4M-OAC-01 | ⚠️ Parcial (falta finanzas) |
| Probabilidad | FG-4M-OAC-02 | ❌ Sin cobertura |
| Álgebra | FG-4M-OAC-03 | ❌ Sin cobertura |
| Geometría | FG-4M-OAC-04 | ❌ Sin cobertura |

### Dependencias Críticas

4° Medio tiene las mayores dependencias de contenido M2:

```
FG-4M-OAC-01 (Finanzas)
    └── Requiere: m2-num-003 (Finanzas M2)

FG-4M-OAC-02 (Binomial/Normal)
    └── Requiere: m2-prob-003 (Combinatoria M2)
    └── Requiere: m2-prob-004 (Modelos M2)

FG-4M-OAC-03 (Potencia/Trig)
    └── Requiere: m2-alg-002 (Función Potencia M2)
    └── Requiere: m2-geo-002 (Trigonometría M2)

FG-4M-OAC-04 (Geom. Analítica)
    └── Requiere: m1-geo-004 (Vectores M1) - INCOMPLETO
```

---

## Cross-Referencias con M1/M2

### Flujo de Prerrequisitos

```
┌────────────────────────────────────────────────────────────┐
│                    4° MEDIO (FG)                           │
├────────────────────────────────────────────────────────────┤
│  FG-4M-OAC-01  │  FG-4M-OAC-02  │  FG-4M-OAC-03  │  FG-4M │
│  Finanzas      │  Binomial      │  Potencia/Trig │  Geom  │
└────────────────────────────────────────────────────────────┘
         │               │               │             │
         ▼               ▼               ▼             ▼
┌────────────────────────────────────────────────────────────┐
│                    NIVEL M2 (Avanzado)                     │
├────────────────────────────────────────────────────────────┤
│  m2-num-003    │  m2-prob-003   │  m2-alg-002    │  N/A   │
│  m2-num-003    │  m2-prob-004   │  m2-geo-002    │        │
└────────────────────────────────────────────────────────────┘
         │               │               │             │
         ▼               ▼               ▼             ▼
┌────────────────────────────────────────────────────────────┐
│                    NIVEL M1 (Fundamental)                  │
├────────────────────────────────────────────────────────────┤
│  m1-num-004    │  m1-prob-002   │  m1-num-003    │ m1-geo │
│  m1-num-005    │  m1-prob-005   │                │ -004   │
└────────────────────────────────────────────────────────────┘
```

### Implicación

Para ofrecer contenido completo de 4° Medio, primero se necesita:
1. Completar unidades M1 pendientes (especialmente geometría)
2. Desarrollar unidades M2 (trigonometría, combinatoria, finanzas)
3. Crear lecciones específicas de Formación General

---

## Prioridades para 4° Medio

### Fase 1: Completar Prerrequisitos M1
1. m1-geo-004-d: Distancia entre Puntos
2. m1-geo-004-e: Punto Medio
3. m1-prob-005-b: Permutaciones
4. m1-prob-005-c: Combinaciones

### Fase 2: Desarrollar M2 Core
1. m2-geo-002-a/b/c: Trigonometría (3 lecciones)
2. m2-num-003-a/b/c: Finanzas (3 lecciones)
3. m2-prob-003-a/b: Combinatoria avanzada (2 lecciones)

### Fase 3: Lecciones FG Específicas
1. fg-4m-geo-001/002/003: Geometría analítica (3 lecciones)
2. fg-4m-prob-001: Distribución normal (1 lección)
3. fg-4m-alg-001/002: Funciones periódicas (2 lecciones)

---

## Notas

- 4° Medio representa el nivel más avanzado y tiene las mayores brechas
- Muchos OA de 4° Medio son extensiones de temas M2
- La prioridad actual del proyecto debería ser consolidar M1 antes de abordar 4° Medio
- Los estudiantes de 4° Medio que preparan PAES pueden usar lecciones M1/M2 como repaso
