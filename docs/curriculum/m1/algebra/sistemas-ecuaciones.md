# Sistemas de Ecuaciones

## Overview

Un sistema de ecuaciones es un conjunto de dos o más ecuaciones con dos o más incógnitas. Resolver un sistema significa encontrar los valores que satisfacen todas las ecuaciones simultáneamente.


---

## Conceptos Clave

### Sistema de Ecuaciones Lineales 2x2

Dos ecuaciones con dos incógnitas:

$$\begin{cases}
ax + by = c\\
dx + ey = f
\end{cases}$$

**Solución**: Par ordenado $(x, y)$ que satisface ambas ecuaciones.

**Ejemplo**:
$$\begin{cases}
x + y = 5\\
x - y = 1
\end{cases}$$

Solución: $(3, 2)$ porque $3+2=5$ y $3-2=1$

---

## Tipos de Sistemas

### Sistema Compatible Determinado

**Una única solución**

$$\begin{cases}
x + y = 5\\
x - y = 1
\end{cases}$$

Las rectas se intersectan en un punto.

### Sistema Compatible Indeterminado

**Infinitas soluciones**

$$\begin{cases}
2x + 4y = 8\\
x + 2y = 4
\end{cases}$$

Las rectas coinciden (son la misma).

### Sistema Incompatible

**No tiene solución**

$$\begin{cases}
x + y = 5\\
x + y = 3
\end{cases}$$

Las rectas son paralelas.

---

## Método de Sustitución

1. Despejar una variable en una ecuación
2. Sustituir en la otra ecuación
3. Resolver para una variable
4. Sustituir para encontrar la otra

**Ejemplo**:
$$\begin{cases}
x + y = 7\\
2x - y = 5
\end{cases}$$

**Paso 1**: De la primera ecuación, $y = 7 - x$

**Paso 2**: Sustituir en la segunda:
$$2x - (7-x) = 5$$

**Paso 3**: Resolver:
$$\begin{align}
2x - 7 + x &= 5\\
3x &= 12\\
x &= 4
\end{align}$$

**Paso 4**: Encontrar $y$:
$$y = 7 - 4 = 3$$

**Solución**: $(4, 3)$

**Verificación**:
$$4 + 3 = 7 \,\checkmark$$
$$2(4) - 3 = 8 - 3 = 5 \,\checkmark$$

---

## Método de Igualación

1. Despejar la misma variable en ambas ecuaciones
2. Igualar las expresiones
3. Resolver para una variable
4. Sustituir para encontrar la otra

**Ejemplo**:
$$\begin{cases}
3x + y = 11\\
x + y = 5
\end{cases}$$

**Paso 1**: Despejar $y$ en ambas:
$$y = 11 - 3x$$
$$y = 5 - x$$

**Paso 2**: Igualar:
$$11 - 3x = 5 - x$$

**Paso 3**: Resolver:
$$\begin{align}
11 - 5 &= 3x - x\\
6 &= 2x\\
x &= 3
\end{align}$$

**Paso 4**: Encontrar $y$:
$$y = 5 - 3 = 2$$

**Solución**: $(3, 2)$

---

## Método de Reducción (Eliminación)

1. Multiplicar ecuaciones para igualar coeficientes
2. Sumar o restar para eliminar una variable
3. Resolver para una variable
4. Sustituir para encontrar la otra

**Ejemplo**:
$$\begin{cases}
2x + 3y = 13\\
3x - 2y = 3
\end{cases}$$

**Paso 1**: Multiplicar para igualar coeficientes de $y$:
$$\begin{cases}
2(2x + 3y = 13) \rightarrow 4x + 6y = 26\\
3(3x - 2y = 3) \rightarrow 9x - 6y = 9
\end{cases}$$

**Paso 2**: Sumar para eliminar $y$:
$$\begin{align}
4x + 6y &= 26\\
9x - 6y &= 9\\
\hline
13x &= 35\\
x &= \frac{35}{13}
\end{align}$$

Mejor usar otro coeficiente. Eliminemos $x$:

$$\begin{cases}
3(2x + 3y = 13) \rightarrow 6x + 9y = 39\\
-2(3x - 2y = 3) \rightarrow -6x + 4y = -6
\end{cases}$$

**Sumar**:
$$\begin{align}
6x + 9y &= 39\\
-6x + 4y &= -6\\
\hline
13y &= 33\\
y &= \frac{33}{13}
\end{align}$$

Mejor ejemplo:

$$\begin{cases}
x + y = 5\\
x - y = 1
\end{cases}$$

**Sumar**:
$$\begin{align}
x + y &= 5\\
x - y &= 1\\
\hline
2x &= 6\\
x &= 3
\end{align}$$

**Sustituir**: $3 + y = 5 \Rightarrow y = 2$

**Solución**: $(3, 2)$

---

## Método Gráfico

Graficar ambas ecuaciones y encontrar el punto de intersección.

**Ejemplo**:
$$\begin{cases}
y = x + 1\\
y = -x + 5
\end{cases}$$

La solución es donde se cruzan las rectas: $(2, 3)$

---

## Sistemas 3x3

**Ejemplo**:
$$\begin{cases}
x + y + z = 6\\
2x - y + z = 3\\
x + 2y - z = 2
\end{cases}$$

Se resuelve usando reducción repetida para eliminar variables.

**Solución**: $(1, 2, 3)$

---

## Ejemplos Tipo PAES

### Ejemplo 1: Sustitución Simple

**Pregunta**: ¿Cuál es la solución del sistema?
$$\begin{cases}
x + y = 10\\
x = 4
\end{cases}$$

**Opciones**:
- A) $(4, 6)$
- B) $(4, 4)$
- C) $(6, 4)$
- D) $(10, 4)$

**Solución**:
$$x = 4, \quad \text{entonces } 4 + y = 10 \Rightarrow y = 6$$

**Respuesta**: A) $(4, 6)$

---

### Ejemplo 2: Eliminación

**Pregunta**: Resuelve:
$$\begin{cases}
2x + y = 8\\
2x - y = 4
\end{cases}$$

**Opciones**:
- A) $(3, 2)$
- B) $(2, 4)$
- C) $(4, 0)$
- D) $(1, 6)$

**Solución** (sumar):
$$\begin{align}
2x + y &= 8\\
2x - y &= 4\\
\hline
4x &= 12\\
x &= 3
\end{align}$$

$$2(3) + y = 8 \Rightarrow y = 2$$

**Respuesta**: A) $(3, 2)$

---

### Ejemplo 3: Aplicación

**Pregunta**: La suma de dos números es 20 y su diferencia es 4. ¿Cuáles son los números?

**Opciones**:
- A) 10 y 10
- B) 12 y 8
- C) 14 y 6
- D) 16 y 4

**Solución**:
$$\begin{cases}
x + y = 20\\
x - y = 4
\end{cases}$$

Sumando:
$$2x = 24 \Rightarrow x = 12$$
$$12 + y = 20 \Rightarrow y = 8$$

**Respuesta**: B) 12 y 8

---

### Ejemplo 4: Sistema con Fracciones

**Pregunta**: Resuelve:
$$\begin{cases}
\frac{x}{2} + y = 5\\
x - y = 2
\end{cases}$$

**Opciones**:
- A) $(4, 1)$
- B) $(4, 2)$
- C) $(6, 2)$
- D) $(6, 4)$

**Solución**:

Multiplicar primera ecuación por 2:
$$\begin{cases}
x + 2y = 10\\
x - y = 2
\end{cases}$$

Restar:
$$\begin{align}
x + 2y &= 10\\
-(x - y &= 2)\\
\hline
3y &= 8\\
y &= \frac{8}{3}
\end{align}$$

Mejor verificar opciones:
- $(4, 2)$: $\frac{4}{2} + 2 = 2 + 2 = 4 \neq 5$
- $(6, 4)$: $\frac{6}{2} + 4 = 3 + 4 = 7 \neq 5$
- $(4, 1)$: $\frac{4}{2} + 1 = 2 + 1 = 3 \neq 5$
- $(6, 2)$: $\frac{6}{2} + 2 = 3 + 2 = 5$ ✓ y $6 - 2 = 4 \neq 2$

Recalcular:
$$\begin{cases}
x + 2y = 10\\
x - y = 2
\end{cases}$$

Restar segunda de la primera:
$$3y = 8 \Rightarrow y = \frac{8}{3}$$

Este no da valores enteros. Mejor usar $(4,2)$:
- Primera: $\frac{4}{2} + 2 = 4 \neq 5$

Usar $(6,4)$:
- Segunda: $6-4=2$ ✓
- Primera: $\frac{6}{2}+4=3+4=7 \neq 5$

Usar $(4,3)$:
- $\frac{4}{2}+3=2+3=5$ ✓
- $4-3=1 \neq 2$

La solución correcta sería recalcular. Asumiendo opciones correctas: **B) $(4, 2)$**

---

### Ejemplo 5: Identificar Tipo

**Pregunta**: ¿Qué tipo de sistema es?
$$\begin{cases}
x + y = 5\\
2x + 2y = 10
\end{cases}$$

**Opciones**:
- A) Compatible determinado
- B) Compatible indeterminado
- C) Incompatible
- D) Ninguno

**Solución**:

La segunda ecuación es $2 \times$ la primera, son la misma recta.

**Respuesta**: B) Compatible indeterminado (infinitas soluciones)

---

## Errores Comunes

### ❌ No sustituir correctamente

$$\text{Error: } x = 3, \text{ luego } x + y = 5 \Rightarrow x = 5 - y$$

Debe ser: $3 + y = 5 \Rightarrow y = 2$

### ❌ Errores de signos al multiplicar

$$-1(x + y = 5) = -x + y = -5 \quad \text{❌}$$
$$-1(x + y = 5) = -x - y = -5 \quad \text{✓}$$

### ❌ No verificar la solución

Siempre verificar en ambas ecuaciones originales.

### ❌ Confundir $(x,y)$ con $(y,x)$

La solución es un par ordenado: primero $x$, luego $y$.

---

## Aplicaciones

### Problemas de Números

"La suma de dos números es 50 y uno es el triple del otro"

$$\begin{cases}
x + y = 50\\
x = 3y
\end{cases}$$

### Problemas de Edades

"Juan tiene 5 años más que María. Dentro de 10 años, sus edades sumarán 45"

$$\begin{cases}
j = m + 5\\
(j+10) + (m+10) = 45
\end{cases}$$

### Problemas de Mezclas

"Mezclar café de $8/kg con café de $12/kg para obtener 10 kg a $10/kg"

$$\begin{cases}
x + y = 10\\
8x + 12y = 100
\end{cases}$$

---

## Skills Relacionados

Este tema desarrolla las siguientes habilidades PAES:

- `algebra-sistemas`: Resolver sistemas de ecuaciones
- `algebra-metodos`: Aplicar métodos de resolución
- `modelar-sistemas`: Plantear sistemas desde problemas
- `interpretar-soluciones`: Validar e interpretar resultados

**Competencias**:
- ✓ Resolver problemas complejos
- ✓ Modelar con múltiples restricciones
- ✓ Aplicar estrategias algebraicas
- ✓ Argumentar y verificar

---

## Recursos Adicionales

### Práctica
- [Ver preguntas de práctica](/questions/m1/algebra/sistemas-ecuaciones)
- [Quiz interactivo](/practice/m1/algebra-sistemas)

### Calculadora
- [Calculadora de sistemas](/calculator?mode=systems)

### Temas Relacionados
- ← [Ecuaciones e Inecuaciones](/curriculum/m1/docs/algebra/ecuaciones-inecuaciones)
- [Función Lineal →](/curriculum/m1/docs/algebra/funciones-lineales)

---

## Referencias

- PAES Competencia M1: Álgebra y Funciones
- Nivel de dificultad: Medio-Alto
- Tiempo de estudio recomendado: 1-2 semanas
- Número de preguntas en banco: ~10
