# Transformaciones Isométricas

## Overview

Las transformaciones isométricas son movimientos de figuras en el plano que preservan la forma y el tamaño. Son fundamentales para comprender simetría, patrones y geometría analítica.


---

## Conceptos Clave

### Isometría

**Definición**: Transformación que preserva:
- Las **distancias** entre puntos
- Los **ángulos**
- El **tamaño** y la **forma**

La figura transformada es **congruente** a la original.

### Tipos de Transformaciones Isométricas

1. **Traslación** (desplazamiento)
2. **Reflexión** (simetría especular)
3. **Rotación** (giro)
4. **Composición** (combinación de transformaciones)

---

## Traslación

**Definición**: Desplazamiento de una figura en una dirección y distancia específicas.

### Vector de Traslación

Se describe mediante un vector $\vec{v} = (a, b)$:
- $a$ = desplazamiento horizontal
- $b$ = desplazamiento vertical

### Fórmula

Si $(x, y)$ es un punto, su imagen bajo traslación por $\vec{v} = (a, b)$ es:

$$(x', y') = (x + a, y + b)$$

**Ejemplo**: Trasladar el punto $(3, 2)$ por $\vec{v} = (4, -1)$

$$(x', y') = (3 + 4, 2 + (-1)) = (7, 1)$$

### Propiedades

- Todos los puntos se mueven en la **misma dirección** y la **misma distancia**
- Las rectas paralelas siguen siendo paralelas
- La orientación no cambia

---

## Reflexión (Simetría)

**Definición**: "Espejo" de una figura respecto a una recta (eje de simetría).

### Tipos Comunes

#### Reflexión respecto al eje X

$$(x, y) \rightarrow (x, -y)$$

**Ejemplo**: $(3, 4) \rightarrow (3, -4)$

#### Reflexión respecto al eje Y

$$(x, y) \rightarrow (-x, y)$$

**Ejemplo**: $(3, 4) \rightarrow (-3, 4)$

#### Reflexión respecto al origen

$$(x, y) \rightarrow (-x, -y)$$

**Ejemplo**: $(3, 4) \rightarrow (-3, -4)$

#### Reflexión respecto a $y = x$

$$(x, y) \rightarrow (y, x)$$

**Ejemplo**: $(3, 4) \rightarrow (4, 3)$

#### Reflexión respecto a $y = -x$

$$(x, y) \rightarrow (-y, -x)$$

**Ejemplo**: $(3, 4) \rightarrow (-4, -3)$

### Propiedades

- La distancia de cada punto al eje es igual a la distancia de su imagen al eje
- La figura cambia de **orientación** (como si se volteara)
- Dos reflexiones sucesivas respecto al mismo eje devuelven la figura original

---

## Rotación

**Definición**: Giro de una figura alrededor de un punto fijo (centro de rotación) por un ángulo determinado.

### Elementos

- **Centro de rotación**: Punto fijo
- **Ángulo de rotación**: Medida del giro
- **Sentido**: Horario o antihorario (positivo = antihorario)

### Rotación con Centro en el Origen

#### Rotación de 90° antihorario

$$(x, y) \rightarrow (-y, x)$$

**Ejemplo**: $(3, 4) \rightarrow (-4, 3)$

#### Rotación de 180°

$$(x, y) \rightarrow (-x, -y)$$

**Ejemplo**: $(3, 4) \rightarrow (-3, -4)$

#### Rotación de 270° antihorario (= 90° horario)

$$(x, y) \rightarrow (y, -x)$$

**Ejemplo**: $(3, 4) \rightarrow (4, -3)$

### Propiedades

- Todos los puntos giran el **mismo ángulo**
- La distancia de cada punto al centro se mantiene
- La orientación se preserva (pero la posición cambia)

---

## Composición de Transformaciones

Aplicar dos o más transformaciones sucesivamente.

**Ejemplo**: Trasladar $(2, 3)$ por $(1, 1)$ y luego reflejar respecto al eje X

**Paso 1** (traslación):
$$(2, 3) \rightarrow (2+1, 3+1) = (3, 4)$$

**Paso 2** (reflexión):
$$(3, 4) \rightarrow (3, -4)$$

---

## Simetría en Figuras

### Simetría Axial

Una figura tiene simetría axial si existe una recta (eje de simetría) que la divide en dos partes que son reflexiones una de la otra.

**Ejemplos**:
- **Círculo**: Infinitos ejes de simetría
- **Cuadrado**: 4 ejes de simetría
- **Rectángulo**: 2 ejes de simetría
- **Triángulo equilátero**: 3 ejes de simetría
- **Triángulo isósceles**: 1 eje de simetría

### Simetría Central (Puntual)

Una figura tiene simetría central si existe un punto tal que al rotar 180° la figura coincide consigo misma.

**Ejemplos**:
- Círculo
- Cuadrado
- Paralelogramo

---

## Ejemplos Tipo PAES

### Ejemplo 1: Traslación

**Pregunta**: Si el punto $(5, 3)$ se traslada por el vector $(−2, 4)$, ¿cuáles son las coordenadas de la imagen?

**Opciones**:
- A) $(3, 7)$
- B) $(7, 7)$
- C) $(3, -1)$
- D) $(7, -1)$

**Solución**:
$$(x', y') = (5 + (-2), 3 + 4) = (3, 7)$$

**Respuesta**: A) $(3, 7)$

---

### Ejemplo 2: Reflexión

**Pregunta**: ¿Cuál es la imagen del punto $(4, -3)$ al reflejarlo respecto al eje X?

**Opciones**:
- A) $(4, 3)$
- B) $(-4, -3)$
- C) $(-4, 3)$
- D) $(4, -3)$

**Solución**:

Reflexión respecto al eje X: $(x, y) \rightarrow (x, -y)$

$$(4, -3) \rightarrow (4, -(-3)) = (4, 3)$$

**Respuesta**: A) $(4, 3)$

---

### Ejemplo 3: Rotación

**Pregunta**: Si el punto $(2, 0)$ rota 90° antihorario con centro en el origen, ¿cuál es su imagen?

**Opciones**:
- A) $(0, 2)$
- B) $(0, -2)$
- C) $(-2, 0)$
- D) $(2, 0)$

**Solución**:

Rotación 90° antihorario: $(x, y) \rightarrow (-y, x)$

$$(2, 0) \rightarrow (0, 2)$$

**Respuesta**: A) $(0, 2)$

---

### Ejemplo 4: Simetría

**Pregunta**: ¿Cuántos ejes de simetría tiene un cuadrado?

**Opciones**:
- A) 2
- B) 4
- C) 6
- D) 8

**Solución**:

Un cuadrado tiene:
- 2 ejes a través de los puntos medios de lados opuestos
- 2 ejes a través de las diagonales

Total: 4 ejes

**Respuesta**: B) 4

---

### Ejemplo 5: Composición

**Pregunta**: El punto $(3, 2)$ se traslada por $(1, -1)$ y luego se refleja respecto al eje Y. ¿Cuál es la imagen final?

**Opciones**:
- A) $(-4, 1)$
- B) $(4, 1)$
- C) $(-4, -1)$
- D) $(4, -1)$

**Solución**:

**Paso 1** (traslación):
$$(3, 2) \rightarrow (3+1, 2+(-1)) = (4, 1)$$

**Paso 2** (reflexión respecto al eje Y):
$$(4, 1) \rightarrow (-4, 1)$$

**Respuesta**: A) $(-4, 1)$

---

## Tesela ciones

**Teselación**: Patrón que cubre el plano sin huecos ni superposiciones usando transformaciones isométricas.

**Ejemplos**:
- Azulejos en pisos
- Panales de abejas (hexágonos)
- Arte islámico

---

## Vectores y Traslaciones

Un vector se puede representar como:
$$\vec{v} = \begin{pmatrix} a \\ b \end{pmatrix}$$

**Magnitud** (longitud):
$$|\vec{v}| = \sqrt{a^2 + b^2}$$

**Ejemplo**: Vector $(3, 4)$
$$|\vec{v}| = \sqrt{3^2 + 4^2} = \sqrt{25} = 5$$

---

## Errores Comunes

### ❌ Confundir traslación con rotación

Traslación: todos los puntos se mueven en línea recta.
Rotación: los puntos giran alrededor de un centro.

### ❌ Aplicar mal las fórmulas de reflexión

$$\text{Reflexión eje X: } (x, y) \rightarrow (x, -y) \quad \text{NO } (-x, y)$$

### ❌ Olvidar el signo en rotaciones

Rotación 90° antihorario: $(x, y) \rightarrow (-y, x)$

El signo negativo es crucial.

### ❌ Cambiar el orden en composiciones

El orden importa:
- Trasladar luego reflejar ≠ Reflejar luego trasladar

---

## Coordenadas y Transformaciones

### Matriz de Transformación

Las transformaciones se pueden representar con matrices:

**Reflexión eje X**:
$$\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$$

**Rotación 90° antihorario**:
$$\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$$

(Nivel avanzado, opcional para M1)

---

## Skills Relacionados

Este tema desarrolla las siguientes habilidades PAES:

- `geometria-transformaciones`: Aplicar transformaciones
- `geometria-simetria`: Identificar simetrías
- `geometria-coordenadas`: Trabajar en el plano cartesiano
- `geometria-vectores`: Usar vectores (básico)

**Competencias**:
- ✓ Visualizar transformaciones
- ✓ Aplicar fórmulas de transformación
- ✓ Identificar patrones
- ✓ Componer transformaciones

---

## Recursos Adicionales

### Práctica
- [Ver preguntas de práctica](/questions/m1/geometria/transformaciones)
- [Quiz interactivo](/practice/m1/transformaciones)

### Herramientas
- [Visualizador de transformaciones](/tools/transformations)
- [Editor interactivo](/tools/isometry-explorer)

### Temas Relacionados
- ← [Volumen](/curriculum/m1/docs/geometria/volumen)
- [Tablas y Gráficos →](/curriculum/m1/docs/probabilidad/tablas-graficos)

---

## Referencias

- PAES Competencia M1: Geometría
- Nivel de dificultad: Medio-Alto
- Tiempo de estudio recomendado: 1 semana
- Número de preguntas en banco: ~5
