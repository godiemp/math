# Enteros y Racionales

## Overview

Los números enteros y racionales forman la base fundamental de las matemáticas. Este módulo cubre las operaciones, propiedades y aplicaciones de estos conjuntos numéricos.


---

<!-- section: conceptos-clave, importance: essential, collapsible: false -->
## Conceptos Clave

### Números Enteros ($\mathbb{Z}$)

Los números enteros incluyen:
- Números positivos: $1, 2, 3, \ldots$
- Números negativos: $-1, -2, -3, \ldots$
- El cero: $0$

**Conjunto**: $\mathbb{Z} = \{\ldots, -3, -2, -1, 0, 1, 2, 3, \ldots\}$

### Números Racionales ($\mathbb{Q}$)

Un número racional es cualquier número que puede expresarse como una fracción $\frac{a}{b}$ donde:
- $a$ es un entero (numerador)
- $b$ es un entero distinto de cero (denominador)
- La fracción puede ser propia, impropia o un número entero

**Conjunto**: $\mathbb{Q} = \left\{\frac{a}{b} \mid a \in \mathbb{Z}, b \in \mathbb{Z}, b \neq 0\right\}$

**Ejemplos**:
$$\frac{1}{2}, \quad \frac{3}{4}, \quad -\frac{5}{7}, \quad 8 = \frac{8}{1}, \quad -3 = \frac{-3}{1}, \quad 0.75 = \frac{3}{4}$$
<!-- /section -->

---

<!-- section: operaciones-fundamentales, importance: essential, collapsible: false -->
## Operaciones Fundamentales

### Suma de Fracciones

#### Mismo Denominador
<!-- formula-only -->
$$\frac{a}{c} + \frac{b}{c} = \frac{a + b}{c}$$
<!-- /formula-only -->

**Ejemplo**:
$$\frac{2}{5} + \frac{1}{5} = \frac{2 + 1}{5} = \frac{3}{5}$$

#### Diferente Denominador
1. Encontrar el mínimo común múltiplo (MCM)
2. Convertir fracciones al mismo denominador
3. Sumar numeradores

**Ejemplo**:
$$\frac{1}{3} + \frac{1}{4} = \,?$$

$$\text{MCM}(3, 4) = 12$$

$$\frac{1}{3} = \frac{4}{12}, \quad \frac{1}{4} = \frac{3}{12}$$

$$\frac{4}{12} + \frac{3}{12} = \frac{7}{12}$$

### Multiplicación de Fracciones

<!-- formula-only -->
$$\frac{a}{b} \times \frac{c}{d} = \frac{a \times c}{b \times d}$$
<!-- /formula-only -->

**Ejemplo**:
$$\frac{2}{3} \times \frac{3}{5} = \frac{2 \times 3}{3 \times 5} = \frac{6}{15} = \frac{2}{5}$$

**Tip**: Simplifica antes de multiplicar cuando sea posible:
$$\frac{2}{3} \times \frac{3}{5} = \frac{2 \times \cancel{3}}{\cancel{3} \times 5} = \frac{2}{5}$$

### División de Fracciones

<!-- formula-only -->
$$\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \times \frac{d}{c}$$
<!-- /formula-only -->

**Regla**: "Multiplica por el recíproco"

**Ejemplo**:
$$\frac{3}{4} \div \frac{2}{5} = \frac{3}{4} \times \frac{5}{2} = \frac{15}{8}$$
<!-- /section -->

---

<!-- section: propiedades-importantes, importance: important, collapsible: true -->
## Propiedades Importantes

### Orden en $\mathbb{Q}$

Para comparar fracciones:

**Método 1**: Mismo denominador
$$\frac{3}{7} < \frac{5}{7} \quad \text{(porque } 3 < 5\text{)}$$

**Método 2**: Producto cruzado
$$\text{¿Es } \frac{2}{3} < \frac{3}{4}\text{?}$$
$$2 \times 4 = 8$$
$$3 \times 3 = 9$$
$$8 < 9 \,\checkmark \quad \text{Entonces } \frac{2}{3} < \frac{3}{4}$$

**Método 3**: Convertir a decimal
$$\frac{2}{3} \approx 0.667$$
$$\frac{3}{4} = 0.75$$
$$0.667 < 0.75 \,\checkmark$$

### Máximo Común Divisor (MCD)

El MCD de dos números es el mayor número que divide a ambos.

**Uso**: Simplificar fracciones

**Ejemplo**:
$$\text{Simplificar } \frac{12}{18}$$

$$\text{MCD}(12, 18) = 6$$

$$\frac{12}{18} = \frac{12 \div 6}{18 \div 6} = \frac{2}{3}$$

**Método de Euclides**:
$$\text{MCD}(48, 18)$$
$$\begin{align}
48 &= 18 \times 2 + 12\\
18 &= 12 \times 1 + 6\\
12 &= 6 \times 2 + 0
\end{align}$$
$$\Rightarrow \text{MCD} = 6$$

### Mínimo Común Múltiplo (MCM)

El MCM de dos números es el menor múltiplo común.

**Uso**: Sumar/restar fracciones con diferente denominador

**Ejemplo**:
$$\text{MCM}(4, 6) = \,?$$

$$\begin{align}
\text{Múltiplos de 4:} &\quad 4, 8, 12, 16, 20, \ldots\\
\text{Múltiplos de 6:} &\quad 6, 12, 18, 24, \ldots
\end{align}$$

$$\text{MCM}(4, 6) = 12$$

<!-- formula-only -->
**Fórmula**:
$$\text{MCM}(a, b) = \frac{a \times b}{\text{MCD}(a, b)}$$
<!-- /formula-only -->
<!-- /section -->

---

<!-- section: ejemplos-paes, importance: essential, collapsible: false -->
## Ejemplos Tipo PAES

### Ejemplo 1: Operaciones Básicas

**Pregunta**: ¿Cuál es el resultado de $\frac{2}{3} + \frac{1}{4}$?

**Opciones**:
- A) $\frac{3}{7}$
- B) $\frac{11}{12}$
- C) $\frac{5}{12}$
- D) $\frac{3}{12}$

**Solución**:
$$\text{MCM}(3, 4) = 12$$

$$\frac{2}{3} = \frac{8}{12}, \quad \frac{1}{4} = \frac{3}{12}$$

$$\frac{8}{12} + \frac{3}{12} = \frac{11}{12}$$

**Respuesta**: B) $\frac{11}{12}$

---

### Ejemplo 2: MCD

**Pregunta**: ¿Cuál es el MCD de 12 y 18?

**Opciones**:
- A) $2$
- B) $3$
- C) $6$
- D) $36$

**Solución**:
$$\begin{align}
\text{Factores de 12:} &\quad 1, 2, 3, 4, 6, 12\\
\text{Factores de 18:} &\quad 1, 2, 3, 6, 9, 18
\end{align}$$

$$\text{Factores comunes: } 1, 2, 3, 6$$
$$\text{Mayor: } 6$$

**Respuesta**: C) $6$

---

### Ejemplo 3: Comparación

**Pregunta**: Ordena de menor a mayor: $\frac{1}{2}$, $\frac{2}{5}$, $\frac{3}{4}$

**Solución**:

Convertir a mismo denominador $(\text{MCM} = 20)$:

$$\frac{1}{2} = \frac{10}{20}, \quad \frac{2}{5} = \frac{8}{20}, \quad \frac{3}{4} = \frac{15}{20}$$

$$\frac{8}{20} < \frac{10}{20} < \frac{15}{20}$$

**Respuesta**: $\frac{2}{5} < \frac{1}{2} < \frac{3}{4}$
<!-- /section -->

---

<!-- section: errores-comunes, importance: important, collapsible: true -->
## Errores Comunes

### ❌ Sumar numeradores y denominadores
$$\text{❌} \quad \frac{1}{2} + \frac{1}{3} = \frac{2}{5} \quad \text{(INCORRECTO)}$$
$$\text{✓} \quad \frac{1}{2} + \frac{1}{3} = \frac{3}{6} + \frac{2}{6} = \frac{5}{6} \quad \text{(CORRECTO)}$$

### ❌ Olvidar simplificar
$$\text{❌} \quad \frac{6}{12} \quad \text{(puede simplificarse)}$$
$$\text{✓} \quad \frac{6}{12} = \frac{1}{2} \quad \text{(CORRECTO)}$$

### ❌ Confundir MCM y MCD
$$\text{Para sumar fracciones} \rightarrow \text{Usar MCM}$$
$$\text{Para simplificar} \rightarrow \text{Usar MCD}$$
<!-- /section -->

---

<!-- section: skills-relacionados, importance: advanced, collapsible: true -->
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
<!-- /section -->

---

<!-- section: recursos-adicionales, importance: advanced, collapsible: true -->
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
<!-- /section -->

---

## Referencias

- PAES Competencia M1: Números y Operaciones
- Nivel de dificultad: Básico
- Tiempo de estudio recomendado: 2-3 semanas
- Número de preguntas en banco: ~25
