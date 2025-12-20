---
title: "Los 7 errores de probabilidad y estadística que más cuestan puntos en la PAES"
description: "Media, mediana, probabilidad y gráficos: los errores más frecuentes en la PAES M1 y cómo evitarlos."
date: "2024-12-19"
author: "SimplePAES"
tags: ["PAES", "probabilidad", "estadística", "errores", "matemáticas", "gráficos"]
published: true
---

Leíste el gráfico, calculaste el promedio, y marcaste tu respuesta. Parecía directo. Pero después te diste cuenta: confundiste la media con la mediana, leíste mal el eje, o no consideraste todos los casos posibles.

Probabilidad y Estadística representa cerca del 24% de la PAES M1. Es considerado el eje "más fácil" porque no requiere álgebra compleja—pero eso mismo hace que los errores sean más frustrantes. Son puntos que deberías tener asegurados.

Aquí están los 7 errores de probabilidad y estadística que más puntos cuestan, con ejemplos claros y cómo evitarlos.

## 1. Confundir media con mediana

Este es el error más común. Ambas son "promedios" en el lenguaje cotidiano, pero en matemáticas son completamente diferentes.

**El error:**

Datos: 2, 3, 4, 5, 100

"El promedio es el del medio, entonces es 4" ❌ (eso es la mediana)

O al revés: "La mediana es $(2+3+4+5+100)/5 = 22.8$" ❌ (eso es la media)

**Lo correcto:**

- **Media** = suma de todos ÷ cantidad = $(2+3+4+5+100)/5 = 22.8$
- **Mediana** = el valor del medio cuando están ordenados = 4

**Cuándo importa la diferencia:**

En el ejemplo anterior, la media (22.8) está muy lejos de la mayoría de los datos porque el 100 la "arrastra". La mediana (4) representa mejor al grupo típico.

**Cómo atraparlo:** Lee la pregunta con cuidado. "Promedio" generalmente significa media. "Valor central" o "mediana" es otra cosa. Si hay valores extremos, probablemente te preguntarán cuál medida es más representativa.

## 2. Calcular probabilidad sin contar todos los casos

La fórmula es simple: $P = \frac{\text{casos favorables}}{\text{casos totales}}$. El problema es contar mal.

**El error:**

"Si lanzo dos dados, ¿cuál es la probabilidad de que sumen 7?"

"Hay 6 formas de sumar 7 (1+6, 2+5, 3+4, 4+3, 5+2, 6+1) y hay 12 resultados posibles (6+6), entonces $P = 6/12 = 1/2$" ❌

**Lo correcto:**

Con dos dados hay $6 \times 6 = 36$ resultados posibles, no 12.

$$P = \frac{6}{36} = \frac{1}{6}$$ ✓

**Por qué pasa:** Confundes el número de caras (6) con el número de combinaciones posibles. Cada dado tiene 6 caras, y son independientes, así que hay $6 \times 6 = 36$ pares posibles.

**Cómo atraparlo:** Cuando hay dos eventos (dos dados, dos monedas, sacar dos cartas), multiplica las posibilidades. Un dado: 6 opciones. Dos dados: $6 \times 6 = 36$ opciones.

## 3. Olvidar la probabilidad complementaria

A veces es más fácil calcular lo que NO quieres y restarlo de 1.

**El error:**

"Si lanzo una moneda 3 veces, ¿cuál es la probabilidad de obtener al menos una cara?"

Intentar contar: "1 cara, 2 caras, 3 caras..." (se complica rápido) ❌

**Lo correcto:**

"Al menos una cara" = 1 - "ninguna cara"

P(ninguna cara) = P(sello, sello, sello) = $(1/2)^3 = 1/8$

P(al menos una cara) = $1 - 1/8 = 7/8$ ✓

**Cuándo usar el complemento:**

Siempre que veas "al menos uno", "como mínimo", o cuando calcular directamente requiere sumar muchos casos.

**La fórmula:**

$$P(A) = 1 - P(\text{no } A)$$

## 4. Confundir frecuencia absoluta con frecuencia relativa

En tablas de datos, estos dos conceptos aparecen constantemente—y confundirlos cambia completamente tu respuesta.

**El error:**

| Nota | Frecuencia |
|------|------------|
| 4 | 5 |
| 5 | 8 |
| 6 | 7 |
| 7 | 5 |
| **Total** | **25** |

"La frecuencia relativa de la nota 5 es 8" ❌

**Lo correcto:**

- **Frecuencia absoluta** de nota 5 = 8 (cuántas veces aparece)
- **Frecuencia relativa** de nota 5 = $8/25 = 0.32$ o 32% (qué proporción del total)

**Cómo recordarlo:**
- **Absoluta** = número entero (cuenta)
- **Relativa** = decimal o porcentaje (proporción)

**Cómo atraparlo:** Si tu respuesta es un número grande cuando te piden frecuencia relativa, algo está mal. La frecuencia relativa siempre está entre 0 y 1 (o entre 0% y 100%).

## 5. Leer mal los ejes de un gráfico

Este error no es de cálculo—es de lectura. Y en la PAES, muchas preguntas de gráficos son esencialmente comprensión lectora.

**El error:**

En un gráfico de barras donde el eje Y empieza en 50 (no en 0):

"La barra de 80 es el doble de la barra de 65" ❌

**Lo correcto:**

Si el eje Y empieza en 50, la barra de 80 representa solo 30 unidades sobre la base, y la de 65 representa 15 unidades. La proporción es 30/15 = 2, pero eso no significa que 80 sea el doble de 65.

**Trampas comunes en gráficos:**
- Ejes que no empiezan en cero (exageran diferencias)
- Escalas no lineales
- Gráficos de torta donde los porcentajes no suman 100%
- Gráficos de línea donde el tiempo no está espaciado uniformemente

**Cómo atraparlo:** Antes de responder, mira:
1. ¿Dónde empieza cada eje?
2. ¿Cuál es la escala?
3. ¿Qué representa cada eje?

## 6. Multiplicar probabilidades cuando debería sumar (o viceversa)

Esta es la diferencia entre "y" y "o" en probabilidad.

**El error:**

"¿Cuál es la probabilidad de sacar un rey O un corazón de una baraja?"

P(rey) × P(corazón) = $(4/52) \times (13/52)$ ❌

**Lo correcto:**

Para "O" (unión), sumas y restas la intersección:

$$P(\text{rey o corazón}) = P(\text{rey}) + P(\text{corazón}) - P(\text{rey de corazón})$$
$$= \frac{4}{52} + \frac{13}{52} - \frac{1}{52} = \frac{16}{52} = \frac{4}{13}$$ ✓

**La regla:**
- **"Y"** (ambas cosas) → generalmente multiplicas
- **"O"** (una u otra) → generalmente sumas (y restas la intersección si hay)

**Cuidado con eventos independientes vs. dependientes:**

Si sacas DOS cartas sin reposición:
- Primera carta rey: $P = 4/52$
- Segunda carta rey: $P = 3/51$ (no 4/52, porque ya sacaste un rey)

## 7. Calcular mal los cuartiles

Los cuartiles dividen los datos ordenados en 4 partes iguales. El error más común es no ordenar primero o ubicar mal Q1 y Q3.

**El error:**

Datos: 8, 2, 5, 9, 3, 7, 4, 6, 1

"Q2 (mediana) es 3 porque está en el medio de la lista" ❌

**Lo correcto:**

Primero ordena: 1, 2, 3, 4, 5, 6, 7, 8, 9

Ahora Q2 (mediana) es 5, el valor central ✓

Para 9 datos:
- Q1 está en la posición 2.5 → promedio entre posición 2 y 3 → $(2+3)/2 = 2.5$
- Q2 está en la posición 5 → valor = 5
- Q3 está en la posición 7.5 → promedio entre posición 7 y 8 → $(7+8)/2 = 7.5$

**Rango intercuartílico:**

$$RIC = Q3 - Q1 = 7.5 - 2.5 = 5$$

**Cómo atraparlo:**
1. Siempre ordena los datos primero
2. Q2 es la mediana (el del medio)
3. Q1 es la mediana de la mitad inferior
4. Q3 es la mediana de la mitad superior

## Resumen de fórmulas clave

| Concepto | Fórmula |
|----------|---------|
| Media | $\bar{x} = \frac{\sum x_i}{n}$ |
| Mediana | Valor central (ordenar primero) |
| Moda | Valor más frecuente |
| Rango | Máximo - Mínimo |
| Rango intercuartílico | Q3 - Q1 |
| Probabilidad | $P(A) = \frac{\text{casos favorables}}{\text{casos totales}}$ |
| Complemento | $P(\text{no } A) = 1 - P(A)$ |
| Frecuencia relativa | $f_r = \frac{\text{frecuencia absoluta}}{n}$ |

## Cómo eliminar estos errores

Probabilidad y Estadística tiene una ventaja: casi todo se puede verificar con sentido común.

**1. Las probabilidades siempre están entre 0 y 1:** Si tu resultado es mayor que 1 o negativo, hay un error.

**2. Los porcentajes deben sumar 100%:** Si estás calculando frecuencias relativas de todas las categorías, deben sumar 1 (o 100%).

**3. La mediana debe estar "cerca" de los datos:** Si tus datos van de 10 a 50 y tu mediana es 200, algo está mal.

**4. Lee la pregunta dos veces:** Muchos errores son de lectura, no de cálculo. ¿Te piden media o mediana? ¿Probabilidad de "y" o de "o"?

Para más errores comunes que cuestan puntos, revisa:
- [Los 7 errores de álgebra más frecuentes en la PAES](/blog/errores-comunes-algebra-paes)
- [Los 7 errores de números más frecuentes en la PAES](/blog/errores-comunes-numeros-paes)
- [Los 7 errores de geometría más frecuentes en la PAES](/blog/errores-comunes-geometria-paes)

---

*¿Quieres practicar probabilidad y estadística hasta que estos errores desaparezcan? SimplePAES te da retroalimentación instantánea que te muestra exactamente dónde te equivocaste—para que no repitas el mismo error dos veces.*
