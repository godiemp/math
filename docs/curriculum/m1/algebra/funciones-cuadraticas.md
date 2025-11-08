# Función Cuadrática

## Overview

La función cuadrática es una función polinomial de grado 2 que se representa gráficamente como una parábola. Es fundamental para modelar situaciones con aceleración, áreas, trayectorias y optimización.


---

## Conceptos Clave

### Definición

Una función cuadrática tiene la forma:

$$f(x) = ax^2 + bx + c$$

donde:
- $a \neq 0$ (coeficiente cuadrático)
- $b$ = coeficiente lineal
- $c$ = término independiente

### Gráfica: La Parábola

La gráfica de una función cuadrática es una **parábola**.

**Orientación**:
- Si $a > 0$: Parábola abre **hacia arriba** (∪)
- Si $a < 0$: Parábola abre **hacia abajo** (∩)

**Ancho**:
- $|a|$ grande: Parábola **estrecha**
- $|a|$ pequeño: Parábola **ancha**

---

## Vértice

El **vértice** es el punto máximo o mínimo de la parábola.

### Coordenadas del Vértice

$$V = \left( h, k \right) = \left( -\frac{b}{2a}, f\left(-\frac{b}{2a}\right) \right)$$

**Fórmulas**:
$$h = -\frac{b}{2a}$$
$$k = f(h) = ah^2 + bh + c$$

**Ejemplo**: $f(x) = x^2 - 4x + 3$

$$h = -\frac{-4}{2(1)} = \frac{4}{2} = 2$$
$$k = (2)^2 - 4(2) + 3 = 4 - 8 + 3 = -1$$

$$V = (2, -1)$$

### Interpretación

- Si $a > 0$: El vértice es el **mínimo** (punto más bajo)
- Si $a < 0$: El vértice es el **máximo** (punto más alto)

---

## Eje de Simetría

La parábola es simétrica respecto a una recta vertical que pasa por el vértice.

$$\text{Eje de simetría: } x = h = -\frac{b}{2a}$$

---

## Raíces o Ceros

Las **raíces** son los valores de $x$ donde $f(x) = 0$ (donde la parábola cruza el eje $x$).

### Fórmula Cuadrática

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

### Discriminante

$$\Delta = b^2 - 4ac$$

**Casos**:
- $\Delta > 0$: **Dos raíces reales** distintas (cruza el eje $x$ dos veces)
- $\Delta = 0$: **Una raíz real** doble (toca el eje $x$ en el vértice)
- $\Delta < 0$: **No hay raíces reales** (no cruza el eje $x$)

**Ejemplo**: $f(x) = x^2 - 5x + 6$

$$\Delta = (-5)^2 - 4(1)(6) = 25 - 24 = 1 > 0$$

Dos raíces:
$$x = \frac{5 \pm 1}{2} = \begin{cases} 3 \\ 2 \end{cases}$$

---

## Intercepto con el Eje Y

Cuando $x = 0$:

$$f(0) = c$$

El punto es $(0, c)$

---

## Formas de la Ecuación Cuadrática

### Forma Estándar

$$f(x) = ax^2 + bx + c$$

**Ventaja**: Se ve el intercepto $y$ directamente: $c$

### Forma Factorizada

$$f(x) = a(x - r_1)(x - r_2)$$

donde $r_1$ y $r_2$ son las raíces.

**Ventaja**: Se ven las raíces directamente.

**Ejemplo**:
$$f(x) = (x - 2)(x - 3) = x^2 - 5x + 6$$

Raíces: $x = 2$ y $x = 3$

### Forma Canónica (Vértice)

$$f(x) = a(x - h)^2 + k$$

donde $(h, k)$ es el vértice.

**Ventaja**: Se ve el vértice directamente.

**Ejemplo**:
$$f(x) = 2(x - 3)^2 + 1$$

Vértice: $(3, 1)$, $a = 2$ (abre hacia arriba)

---

## Conversión entre Formas

### De Estándar a Vértice

**Completar el cuadrado**:

$$f(x) = x^2 - 6x + 5$$

$$\begin{align}
&= x^2 - 6x + 9 - 9 + 5\\
&= (x - 3)^2 - 4
\end{align}$$

Vértice: $(3, -4)$

### De Vértice a Estándar

**Expandir**:

$$f(x) = 2(x - 1)^2 + 3$$

$$\begin{align}
&= 2(x^2 - 2x + 1) + 3\\
&= 2x^2 - 4x + 2 + 3\\
&= 2x^2 - 4x + 5
\end{align}$$

---

## Dominio y Recorrido

### Dominio

$$\text{Dom}(f) = \mathbb{R} = (-\infty, +\infty)$$

### Recorrido

Depende de la orientación:

**Si $a > 0$** (abre hacia arriba):
$$\text{Rec}(f) = [k, +\infty)$$

**Si $a < 0$** (abre hacia abajo):
$$\text{Rec}(f) = (-\infty, k]$$

donde $k$ es la coordenada $y$ del vértice.

---

## Ejemplos Tipo PAES

### Ejemplo 1: Identificar Vértice

**Pregunta**: ¿Cuál es el vértice de $f(x) = x^2 - 6x + 5$?

**Opciones**:
- A) $(3, -4)$
- B) $(3, 4)$
- C) $(-3, -4)$
- D) $(6, 5)$

**Solución**:
$$h = -\frac{-6}{2(1)} = 3$$
$$k = (3)^2 - 6(3) + 5 = 9 - 18 + 5 = -4$$

$$V = (3, -4)$$

**Respuesta**: A) $(3, -4)$

---

### Ejemplo 2: Número de Raíces

**Pregunta**: ¿Cuántas raíces tiene $f(x) = x^2 + 4x + 4$?

**Opciones**:
- A) 0
- B) 1
- C) 2
- D) 3

**Solución**:
$$\Delta = 4^2 - 4(1)(4) = 16 - 16 = 0$$

Una raíz doble.

**Respuesta**: B) 1

---

### Ejemplo 3: Forma Factorizada

**Pregunta**: Si $f(x) = (x - 2)(x + 3)$, ¿cuáles son las raíces?

**Opciones**:
- A) $x = 2$ y $x = 3$
- B) $x = -2$ y $x = -3$
- C) $x = 2$ y $x = -3$
- D) $x = -2$ y $x = 3$

**Solución**:
$$(x - 2) = 0 \Rightarrow x = 2$$
$$(x + 3) = 0 \Rightarrow x = -3$$

**Respuesta**: C) $x = 2$ y $x = -3$

---

### Ejemplo 4: Mínimo/Máximo

**Pregunta**: ¿Cuál es el valor mínimo de $f(x) = 2x^2 - 8x + 10$?

**Opciones**:
- A) 2
- B) 4
- C) 6
- D) 10

**Solución**:

$a = 2 > 0$, tiene mínimo en el vértice.

$$h = -\frac{-8}{2(2)} = 2$$
$$k = 2(2)^2 - 8(2) + 10 = 8 - 16 + 10 = 2$$

Valor mínimo: $k = 2$

**Respuesta**: A) 2

---

### Ejemplo 5: Intercepto Y

**Pregunta**: ¿En qué punto la función $f(x) = 3x^2 - 2x + 5$ corta el eje $y$?

**Opciones**:
- A) $(0, 3)$
- B) $(0, -2)$
- C) $(0, 5)$
- D) $(5, 0)$

**Solución**:
$$f(0) = 3(0)^2 - 2(0) + 5 = 5$$

**Respuesta**: C) $(0, 5)$

---

## Aplicaciones

### Movimiento Parabólico

Trayectoria de un proyectil:
$$h(t) = -5t^2 + 20t + 2$$

Altura máxima en el vértice.

### Área Máxima

Maximizar el área de un rectángulo con perímetro fijo:
$$A(x) = x(50 - x) = -x^2 + 50x$$

### Ingresos y Costos

Maximizar ganancia:
$$G(x) = -2x^2 + 100x - 200$$

### Puentes y Arcos

Forma de cables en puentes colgantes.

---

## Errores Comunes

### ❌ Confundir máximo con mínimo

Ver el signo de $a$:
- $a > 0 \Rightarrow$ mínimo
- $a < 0 \Rightarrow$ máximo

### ❌ Olvidar el signo en la fórmula del vértice

$$h = -\frac{b}{2a} \quad \text{(NO } \frac{b}{2a}\text{)}$$

### ❌ Pensar que $c$ es el vértice

$c$ es el intercepto $y$, NO el vértice.

### ❌ No simplificar antes de factorizar

$$x^2 + 6x + 9 = (x + 3)^2$$

No dejar como $x^2 + 6x + 9$.

---

## Completar el Cuadrado

Técnica para convertir a forma canónica:

**Ejemplo**: $f(x) = x^2 + 8x + 10$

**Paso 1**: Tomar la mitad del coeficiente de $x$, elevar al cuadrado:
$$\left(\frac{8}{2}\right)^2 = 16$$

**Paso 2**: Sumar y restar:
$$x^2 + 8x + 16 - 16 + 10$$

**Paso 3**: Factorizar:
$$(x + 4)^2 - 6$$

Vértice: $(-4, -6)$

---

## Skills Relacionados

Este tema desarrolla las siguientes habilidades PAES:

- `funciones-cuadraticas`: Trabajar con funciones cuadráticas
- `funciones-parabola`: Graficar e interpretar parábolas
- `algebra-cuadratica`: Resolver ecuaciones cuadráticas
- `modelar-optimizacion`: Problemas de máximo y mínimo

**Competencias**:
- ✓ Representar gráficamente
- ✓ Modelar situaciones de optimización
- ✓ Interpretar parámetros
- ✓ Resolver problemas contextualizados

---

## Recursos Adicionales

### Práctica
- [Ver preguntas de práctica](/questions/m1/algebra/funciones-cuadraticas)
- [Quiz interactivo](/practice/m1/funciones-cuadraticas)

### Herramientas
- [Graficador de parábolas](/calculator?mode=quadratic)
- [Calculadora de vértice](/calculator?mode=vertex)

### Temas Relacionados
- ← [Función Lineal](/curriculum/m1/docs/algebra/funciones-lineales)
- [Perímetro y Área →](/curriculum/m1/docs/geometria/perimetro-area)

---

## Referencias

- PAES Competencia M1: Álgebra y Funciones
- Nivel de dificultad: Medio-Alto
- Tiempo de estudio recomendado: 2-3 semanas
- Número de preguntas en banco: ~12
