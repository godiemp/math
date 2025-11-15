# M2 Problems - Gap Analysis

## Executive Summary

This analysis identifies missing curriculum subsections and topic areas in the M2 (Educación Media 2) question bank by comparing it with M1 structure and the PAES curriculum scope.

---

## Critical Gaps by Category

### 1. ALGEBRA (M2-ALG-###)

#### Missing Curriculum Files
- **m2-alg-004** - Not found (M1 has m1-alg-004: Sistemas de ecuaciones lineales 2x2)
- **m2-alg-005** - Not found (M1 has m1-alg-005: Concepto de función)
- **m2-alg-006** - Not found (M1 has m1-alg-006: Función lineal y afín)
- **m2-alg-007** - Not found (M1 has m1-alg-007: Función cuadrática)
- **m2-alg-008** - Not found (M1 has m1-alg-008: Función potencia, raíz, valor absoluto - placeholder)

**Current:** Only m2-alg-001, m2-alg-002, m2-alg-003
**Expected:** Should have at least 8 subsections like M1

#### Missing Topic Files (compared to M1)
M1 has these topics that M2 lacks:
- `factorizacion.ts` - Factoring techniques
- `productos-notables.ts` - Notable products/special binomial products
- `polinomios.ts` - Polynomials
- `expresiones-racionales.ts` - Rational expressions

**M2 Should Have:** More advanced versions of these topics since M2 is higher level than M1

---

### 2. GEOMETRÍA (M2-GEO-###)

#### Missing Curriculum Files
- **m2-geo-004** - Not found (M1 has m1-geo-004: Puntos y vectores en el plano)
- **m2-geo-005** - Not found (M1 has m1-geo-005: Rotación, traslación y reflexión de figuras geométricas)

**Current:** Only m2-geo-001, m2-geo-002, m2-geo-003
**Expected:** Should have at least 5 subsections like M1

#### Topic Coverage
M2 has these topics:
- perimetro-area.ts ✓
- volumen.ts ✓
- teorema-pitagoras.ts ✓
- transformaciones.ts ✓
- plano-cartesiano.ts ✓
- area-circulo.ts ✓

**Gap:** Missing vectors/coordinate geometry subsections (m2-geo-004, m2-geo-005)

---

### 3. NÚMEROS (M2-NUM-###)

#### Missing Curriculum Files
- **m2-num-007** - Not found (M1 has M1-NUM-007)
- **m2-num-008** - Not found (M1 has M1-NUM-008)

**Current:** m2-num-001 through m2-num-006
**Expected:** Should have 8 subsections like M1

#### Topic Coverage
M2 has these topics:
- enteros-racionales.ts ✓
- porcentaje.ts ✓
- potencias-raices.ts ✓
- proporcionalidad.ts ✓
- mcd-mcm.ts ✓
- raices-racionalizacion.ts ✓

**Gap:** Need 2 more curriculum subsections (possibly covering number theory, sequences, or more advanced operations)

---

### 4. PROBABILIDAD (M2-PROB-###)

#### Missing Curriculum Files
- **m2-prob-005** - Not found (M1 has m1-prob-005)

**Current:** m2-prob-001 through m2-prob-004
**Expected:** Should have at least 5 subsections like M1

#### Topic Coverage
M2 has these topics:
- tendencia-central.ts ✓
- medidas-posicion.ts ✓
- reglas-probabilidad.ts ✓
- tablas-graficos.ts ✓
- medidas-dispersion.ts ✓
- combinatoria.ts ✓

**Gap:** Need 1 more curriculum subsection (possibly covering conditional probability or advanced combinatorics)

---

## Summary Table

| Category | Has | Should Have | Missing |
|----------|-----|-------------|---------|
| **Algebra** | 3 | 8+ | 5+ files |
| **Geometría** | 3 | 5+ | 2 files |
| **Números** | 6 | 8 | 2 files |
| **Probabilidad** | 4 | 5+ | 1 file |
| **TOTAL** | **16** | **26+** | **10+ files** |

---

## Recommended Priorities (Based on PAES Curriculum)

### High Priority - Create These First:

1. **m2-alg-004**: Sistemas de ecuaciones más complejos (sistemas 3x3 o no lineales)
2. **m2-alg-005**: Funciones exponenciales y logarítmicas básicas
3. **m2-alg-006**: Funciones compuestas e inversas
4. **m2-alg-007**: Ecuaciones exponenciales y logarítmicas
5. **m2-geo-004**: Vectores en el plano y operaciones
6. **m2-prob-005**: Probabilidad condicional avanzada

### Medium Priority:

7. **m2-num-007**: Sucesiones y progresiones (arithmetic/geometric sequences)
8. **m2-num-008**: Números irracionales y aproximaciones
9. **m2-geo-005**: Geometría analítica avanzada (cónicas básicas)

### Lower Priority (Topic Files):

10. Add `factorizacion.ts` to m2/algebra (advanced factoring techniques)
11. Add `productos-notables.ts` to m2/algebra (complex notable products)
12. Add `expresiones-racionales.ts` to m2/algebra (advanced rational expressions)

---

## Implementation Notes

- **M1 vs M2 Difference**: M2 should cover the SAME topics as M1 but at a more advanced/complex level
- **PAES Curriculum Alignment**: Reference `/home/user/math/docs/content/paes-curriculum-scope.md` for official content scope
- **Naming Convention**: Follow pattern `m2-{category abbrev}-{number}.ts` (e.g., m2-alg-004.ts)
- **Content Format**: Follow `/home/user/math/lib/questions/FORMATO_PREGUNTAS_PAES.md` for question format

---

## Next Steps

1. Review this gap analysis with curriculum experts
2. Prioritize which subsections to create first based on PAES exam frequency
3. Create placeholder files for missing curriculum subsections
4. Populate with contextual PAES-style questions following the established format
5. Ensure M2 questions are more challenging than M1 equivalents

---

## References

- PAES Curriculum Scope: `/home/user/math/docs/content/paes-curriculum-scope.md`
- Question Format Guide: `/home/user/math/lib/questions/FORMATO_PREGUNTAS_PAES.md`
- M1 Algebra Index: `/home/user/math/lib/questions/m1/algebra/index.ts` (shows all 8 subsections)
- M2 Algebra Index: `/home/user/math/lib/questions/m2/algebra/index.ts` (currently only 3 subsections)
