# Enteros y Racionales

## Overview

Los números enteros y racionales forman la base fundamental de las matemáticas. Este módulo cubre las operaciones, propiedades y aplicaciones de estos conjuntos numéricos.

**Nivel**: M1 (Básico)
**Dificultad**: ⭐⭐ Fácil a Medio
**Tiempo estimado**: 2-3 semanas

---

## Conceptos Clave

### Números Enteros (ℤ)

Los números enteros incluyen:
- Números positivos: 1, 2, 3, ...
- Números negativos: -1, -2, -3, ...
- El cero: 0

**Conjunto**: ℤ = {..., -3, -2, -1, 0, 1, 2, 3, ...}

### Números Racionales (ℚ)

Un número racional es cualquier número que puede expresarse como una fracción `a/b` donde:
- `a` es un entero (numerador)
- `b` es un entero distinto de cero (denominador)
- La fracción puede ser propia, impropia o un número entero

**Conjunto**: ℚ = {a/b | a ∈ ℤ, b ∈ ℤ, b ≠ 0}

**Ejemplos**:
```
1/2, 3/4, -5/7, 8 (= 8/1), -3 (= -3/1), 0.75 (= 3/4)
```

---

## Operaciones Fundamentales

### Suma de Fracciones

#### Mismo Denominador
```
a/c + b/c = (a + b)/c
```

**Ejemplo**:
```
2/5 + 1/5 = (2 + 1)/5 = 3/5
```

#### Diferente Denominador
1. Encontrar el mínimo común múltiplo (MCM)
2. Convertir fracciones al mismo denominador
3. Sumar numeradores

**Ejemplo**:
```
1/3 + 1/4 = ?

MCM(3, 4) = 12

1/3 = 4/12
1/4 = 3/12

4/12 + 3/12 = 7/12
```

### Multiplicación de Fracciones

```
a/b × c/d = (a × c)/(b × d)
```

**Ejemplo**:
```
2/3 × 3/5 = (2 × 3)/(3 × 5) = 6/15 = 2/5
```

**Tip**: Simplifica antes de multiplicar cuando sea posible:
```
2/3 × 3/5 = (2 × 3̶)/(3̶ × 5) = 2/5
```

### División de Fracciones

```
a/b ÷ c/d = a/b × d/c
```

**Regla**: "Multiplica por el recíproco"

**Ejemplo**:
```
3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8
```

---

## Propiedades Importantes

### Orden en ℚ

Para comparar fracciones:

**Método 1**: Mismo denominador
```
3/7 < 5/7  (porque 3 < 5)
```

**Método 2**: Producto cruzado
```
¿Es 2/3 < 3/4?
2 × 4 = 8
3 × 3 = 9
8 < 9 ✓ Entonces 2/3 < 3/4
```

**Método 3**: Convertir a decimal
```
2/3 ≈ 0.667
3/4 = 0.75
0.667 < 0.75 ✓
```

### Máximo Común Divisor (MCD)

El MCD de dos números es el mayor número que divide a ambos.

**Uso**: Simplificar fracciones

**Ejemplo**:
```
Simplificar 12/18

MCD(12, 18) = 6

12/18 = (12 ÷ 6)/(18 ÷ 6) = 2/3
```

**Método de Euclides**:
```
MCD(48, 18)
48 = 18 × 2 + 12
18 = 12 × 1 + 6
12 = 6 × 2 + 0
→ MCD = 6
```

### Mínimo Común Múltiplo (MCM)

El MCM de dos números es el menor múltiplo común.

**Uso**: Sumar/restar fracciones con diferente denominador

**Ejemplo**:
```
MCM(4, 6) = ?

Múltiplos de 4: 4, 8, 12, 16, 20...
Múltiplos de 6: 6, 12, 18, 24...

MCM(4, 6) = 12
```

**Fórmula**:
```
MCM(a, b) = (a × b) / MCD(a, b)
```

---

## Ejemplos Tipo PAES

### Ejemplo 1: Operaciones Básicas

**Pregunta**: ¿Cuál es el resultado de 2/3 + 1/4?

**Opciones**:
- A) 3/7
- B) 11/12
- C) 5/12
- D) 3/12

**Solución**:
```
MCM(3, 4) = 12

2/3 = 8/12
1/4 = 3/12

8/12 + 3/12 = 11/12
```

**Respuesta**: B) 11/12

---

### Ejemplo 2: MCD

**Pregunta**: ¿Cuál es el MCD de 12 y 18?

**Opciones**:
- A) 2
- B) 3
- C) 6
- D) 36

**Solución**:
```
Factores de 12: 1, 2, 3, 4, 6, 12
Factores de 18: 1, 2, 3, 6, 9, 18

Factores comunes: 1, 2, 3, 6
Mayor: 6
```

**Respuesta**: C) 6

---

### Ejemplo 3: Comparación

**Pregunta**: Ordena de menor a mayor: 1/2, 2/5, 3/4

**Solución**:
```
Convertir a mismo denominador (MCM = 20):

1/2 = 10/20
2/5 = 8/20
3/4 = 15/20

8/20 < 10/20 < 15/20
```

**Respuesta**: 2/5 < 1/2 < 3/4

---

## Errores Comunes

### ❌ Sumar numeradores y denominadores
```
❌ 1/2 + 1/3 = 2/5  (INCORRECTO)
✓ 1/2 + 1/3 = 3/6 + 2/6 = 5/6  (CORRECTO)
```

### ❌ Olvidar simplificar
```
❌ 6/12  (puede simplificarse)
✓ 6/12 = 1/2  (CORRECTO)
```

### ❌ Confundir MCM y MCD
```
Para sumar fracciones → Usar MCM
Para simplificar → Usar MCD
```

---

## Skills Relacionados

Este tema desarrolla las siguientes habilidades PAES:

- `numeros-fracciones`: Operaciones con fracciones
- `numeros-fracciones-suma`: Suma y resta de fracciones
- `numeros-mcd-mcm`: Cálculo de MCD y MCM
- `numeros-orden`: Comparación y orden de racionales

**Competencias**:
- ✓ Resolver problemas numéricos
- ✓ Argumentar resultados
- ✓ Representar en distintas formas

---

## Recursos Adicionales

### Práctica
- [Ver preguntas de práctica](/questions/m1/numeros/enteros-racionales)
- [Quiz interactivo](/practice/m1/numeros-enteros-racionales)

### Calculadora
- [Calculadora de fracciones](/calculator?mode=fractions)

### Prerequisitos
- Operaciones básicas con enteros
- Concepto de divisibilidad

### Siguiente Tema
- [Porcentajes →](/docs/curriculum/m1/numeros/porcentaje)

---

## Referencias

- PAES Competencia M1: Números y Operaciones
- Nivel de dificultad: Básico
- Tiempo de estudio recomendado: 2-3 semanas
- Número de preguntas en banco: ~25
