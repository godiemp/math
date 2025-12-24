---
title: "Los 7 errores de geometría que más cuestan puntos en la PAES"
description: "Áreas, volúmenes y Pitágoras: los errores geométricos más frecuentes en la PAES M1 y cómo evitarlos."
date: "2025-12-19"
author: "SimplePAES"
tags: ["PAES", "geometría", "errores", "matemáticas", "Pitágoras", "áreas"]
published: true
---

Dibujaste la figura, aplicaste la fórmula, y obtuviste un número. Parecía correcto. Pero cuando revisaste, te diste cuenta: usaste el diámetro en vez del radio, olvidaste dividir por 2, o aplicaste Pitágoras donde no correspondía.

Geometría representa cerca del 21% de la PAES M1, y los errores más comunes no son por falta de conocimiento de las fórmulas—son por aplicarlas mal o en el contexto equivocado.

Aquí están los 7 errores de geometría que más puntos cuestan, con ejemplos claros y cómo evitarlos.

## 1. Confundir radio y diámetro

Este es probablemente el error más frecuente en problemas de círculos. El problema te da el diámetro, pero tú usas ese número directamente en la fórmula que requiere el radio.

**El error:**

Si el diámetro es 10 cm:

$$A = \pi \times 10^2 = 100\pi \text{ cm}^2$$ ❌

**Lo correcto:**

Si el diámetro es 10 cm, el radio es 5 cm:

$$A = \pi \times 5^2 = 25\pi \text{ cm}^2$$ ✓

**Por qué pasa:** Lees "el círculo tiene 10 cm" y usas 10 directamente. Pero las fórmulas de círculo usan el **radio**, no el diámetro.

**Recuerda:**
- **Radio** = distancia del centro al borde
- **Diámetro** = distancia de borde a borde = 2 × radio

**Cómo atraparlo:** Antes de usar cualquier fórmula de círculo, pregúntate: "¿Me dieron el radio o el diámetro?" Si te dieron el diámetro, divide por 2.

## 2. Olvidar dividir por 2 en el área del triángulo

La fórmula del área del triángulo es simple, pero bajo presión es fácil olvidar la mitad.

**El error:**

$$A_{\triangle} = b \times h = 6 \times 4 = 24 \text{ cm}^2$$ ❌

**Lo correcto:**

$$A_{\triangle} = \frac{b \times h}{2} = \frac{6 \times 4}{2} = 12 \text{ cm}^2$$ ✓

**Por qué pasa:** Estás acostumbrado a que área = base × altura (como en el rectángulo), y tu cerebro aplica eso automáticamente.

**Cómo recordarlo:** Un triángulo es literalmente la mitad de un rectángulo. Si cortas un rectángulo por la diagonal, obtienes dos triángulos. Por eso el área es la mitad.

**Cómo atraparlo:** Siempre que veas "triángulo", piensa "dividir por 2". Es una asociación que debes hacer automática.

## 3. Aplicar Pitágoras en triángulos que no son rectángulos

El teorema de Pitágoras es poderoso, pero **solo funciona en triángulos rectángulos**.

**El error:**

En un triángulo con lados 5, 6 y 7:

"Verifico si es rectángulo: $5^2 + 6^2 = 25 + 36 = 61$, y $7^2 = 49$. No son iguales, pero igual uso Pitágoras para encontrar la altura." ❌

**Lo correcto:**

Pitágoras solo aplica cuando hay un ángulo de 90°. Si no hay ángulo recto, necesitas otras herramientas (como la fórmula de Herón para el área, o trigonometría).

**Cómo identificar un triángulo rectángulo:**
- Te dicen explícitamente que tiene un ángulo de 90°
- Ves el símbolo de ángulo recto (□) en el dibujo
- Verificas con Pitágoras: si $a^2 + b^2 = c^2$, es rectángulo

**Ternas pitagóricas comunes** (memorízalas):
- 3, 4, 5 (y sus múltiplos: 6-8-10, 9-12-15)
- 5, 12, 13
- 8, 15, 17

## 4. Confundir cuál es la hipotenusa en Pitágoras

Sabes que $a^2 + b^2 = c^2$, pero ¿cuál lado es $c$?

**El error:**

En un triángulo rectángulo con catetos 3 y 4:

$$3^2 + h^2 = 4^2$$
$$9 + h^2 = 16$$
$$h^2 = 7$$ ❌

**Lo correcto:**

La hipotenusa es el lado más largo, frente al ángulo recto:

$$3^2 + 4^2 = h^2$$
$$9 + 16 = h^2$$
$$h^2 = 25$$
$$h = 5$$ ✓

**La regla:** La hipotenusa ($c$) es siempre:
- El lado **más largo**
- El lado **opuesto al ángulo recto**
- El que va **solo** en un lado de la ecuación

**Cómo atraparlo:** Antes de aplicar Pitágoras, identifica el ángulo recto. El lado opuesto a ese ángulo es la hipotenusa. Los otros dos son catetos.

## 5. Confundir perímetro con área

Este no es un error de cálculo—es un error de lectura. Te piden una cosa y calculas otra.

**El error:**

"Calcula el área de un cuadrado de lado 5 cm"

$$P = 4 \times 5 = 20 \text{ cm}$$ ❌ (calculaste perímetro)

**Lo correcto:**

$$A = 5^2 = 25 \text{ cm}^2$$ ✓

**La diferencia:**
- **Perímetro** = suma de todos los lados (se mide en cm, m, etc.)
- **Área** = espacio que cubre la figura (se mide en cm², m², etc.)

**Cómo atraparlo:**
1. Lee la pregunta dos veces
2. Verifica las unidades de tu respuesta: si te piden área y tu resultado está en "cm" (no "cm²"), algo está mal

## 6. Olvidar el factor 1/3 en conos y pirámides

Los volúmenes de cono y pirámide tienen un factor que es fácil olvidar.

**El error (cono):**

$$V = \pi r^2 h$$ ❌

**Lo correcto:**

$$V = \frac{1}{3} \pi r^2 h$$ ✓

**El error (pirámide):**

$$V = A_{base} \times h$$ ❌

**Lo correcto:**

$$V = \frac{1}{3} A_{base} \times h$$ ✓

**Por qué pasa:** Recuerdas la fórmula del cilindro ($V = \pi r^2 h$) y asumes que el cono es igual. Pero el cono es "puntiagudo"—tiene menos volumen que un cilindro de la misma base y altura.

**Cómo recordarlo:**
- Prisma/Cilindro = base × altura (figura "completa")
- Pirámide/Cono = $\frac{1}{3}$ × base × altura (figura "puntiaguda")

**Dato útil:** Un cono tiene exactamente 1/3 del volumen de un cilindro con la misma base y altura. Si llenas un cono de agua y lo viertes en el cilindro, necesitas hacerlo 3 veces para llenarlo.

## 7. Usar la fórmula incorrecta para el rombo

El rombo tiene una fórmula de área diferente a la del cuadrado, aunque ambos tienen 4 lados iguales.

**El error:**

"El rombo tiene lados de 5 cm, entonces el área es:"

$$A = 5^2 = 25 \text{ cm}^2$$ ❌

**Lo correcto:**

El área del rombo usa las **diagonales**, no los lados:

$$A = \frac{D \times d}{2}$$

donde $D$ es la diagonal mayor y $d$ es la diagonal menor.

**Por qué pasa:** Confundes el rombo con el cuadrado. Aunque ambos tienen 4 lados iguales, el cuadrado tiene ángulos rectos y el rombo no necesariamente.

**Cómo atraparlo:** Si te dan un rombo, busca las diagonales en el problema. Si solo te dan los lados, probablemente necesitas encontrar las diagonales primero (usando Pitágoras, ya que las diagonales del rombo se cortan en ángulo recto).

## Resumen de fórmulas clave

| Figura | Área | Perímetro/Circunferencia |
|--------|------|--------------------------|
| Cuadrado | $l^2$ | $4l$ |
| Rectángulo | $b \times h$ | $2(b + h)$ |
| Triángulo | $\frac{b \times h}{2}$ | $a + b + c$ |
| Círculo | $\pi r^2$ | $2\pi r$ |
| Trapecio | $\frac{(B + b) \times h}{2}$ | suma de lados |
| Rombo | $\frac{D \times d}{2}$ | $4l$ |

| Figura 3D | Volumen |
|-----------|---------|
| Cubo | $l^3$ |
| Prisma/Cilindro | $A_{base} \times h$ |
| Pirámide/Cono | $\frac{1}{3} A_{base} \times h$ |
| Esfera | $\frac{4}{3} \pi r^3$ |

## Cómo eliminar estos errores

La geometría tiene una ventaja: puedes verificar visualmente. Antes de marcar tu respuesta:

**1. Dibuja si no hay dibujo:** Muchos errores vienen de no visualizar el problema. Un dibujo rápido te ayuda a identificar qué fórmula usar.

**2. Verifica con sentido común:** Si el área de un triángulo pequeño te da 500 cm², algo está mal. Si el volumen de una esfera de radio 2 te da 1000 cm³, revisa.

**3. Revisa las unidades:** Área siempre es en unidades², volumen en unidades³. Si tus unidades no cuadran, hay un error.

Para más errores comunes que cuestan puntos, revisa:
- [Los 7 errores de álgebra más frecuentes en la PAES](/blog/errores-comunes-algebra-paes)
- [Los 7 errores de números más frecuentes en la PAES](/blog/errores-comunes-numeros-paes)
- [Los 7 errores de probabilidad y estadística más frecuentes en la PAES](/blog/errores-comunes-probabilidad-estadistica-paes)

---

*¿Quieres practicar geometría hasta que estos errores desaparezcan? SimplePAES te da retroalimentación instantánea que te muestra exactamente dónde te equivocaste—para que no repitas el mismo error dos veces.*
