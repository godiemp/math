---
title: "Los 7 errores de álgebra que más cuestan puntos en la PAES"
description: "Descubre los errores algebraicos más frecuentes en la PAES M1 y aprende a evitarlos con ejemplos claros."
date: "2024-12-17"
author: "SimplePAES"
tags: ["PAES", "álgebra", "errores", "matemáticas", "consejos"]
published: true
---

Sabías cómo resolver el ejercicio. Hiciste los pasos correctos. Pero cuando revisaste la respuesta correcta, te diste cuenta: un signo mal puesto, un término olvidado, y perdiste el punto.

Si esto te suena familiar, no estás solo. El álgebra representa cerca del 40% de las preguntas en la PAES M1, y los errores más costosos no son por falta de conocimiento—son por descuidos que se pueden evitar.

Aquí están los 7 errores algebraicos que más puntos cuestan en la PAES, con ejemplos concretos y cómo atraparlos antes de que te atrapen a ti.

## 1. El término medio olvidado

Este es probablemente el error más común en álgebra. Aparece cada vez que tienes un binomio al cuadrado.

**El error:**

$$(a + b)^2 = a^2 + b^2$$ ❌

**Lo correcto:**

$$(a + b)^2 = a^2 + 2ab + b^2$$ ✓

**Ejemplo concreto:**

- ❌ $(x + 3)^2 = x^2 + 9$
- ✓ $(x + 3)^2 = x^2 + 6x + 9$

**Por qué pasa:** Tu cerebro busca atajos. Ve "algo al cuadrado" y eleva cada parte por separado. Pero $(a + b)^2$ significa $(a + b)(a + b)$, y cuando expandes eso, aparece el término $2ab$.

**Cómo atraparlo:** Cuando veas un binomio al cuadrado, expande paso a paso. O verifica con un número: si $x = 1$, entonces $(1 + 3)^2 = 16$, pero $1^2 + 9 = 10$. No cuadra.

## 2. El signo que cambia todo

Distribuir un signo negativo parece simple, pero bajo presión de tiempo es donde más se pierden puntos.

**El error:**

$$-(x - 3) = -x - 3$$ ❌

**Lo correcto:**

$$-(x - 3) = -x + 3$$ ✓

El signo negativo frente al paréntesis multiplica a **todos** los términos dentro, incluyendo el $-3$, que se convierte en $+3$.

**Cuando se pone feo:**

$$5x - [2x - (3x - 4)]$$

Aquí tienes que ir de adentro hacia afuera:

1. $(3x - 4)$ queda igual
2. $-( 3x - 4) = -3x + 4$
3. $2x - 3x + 4 = -x + 4$
4. $-[-x + 4] = x - 4$
5. $5x + x - 4 = 6x - 4$

**Cómo atraparlo:** Nunca hagas dos operaciones de signos a la vez. Ve término por término, y escribe cada paso.

## 3. Sumar lo que no se puede sumar

Este error delata una confusión fundamental sobre qué significa "simplificar".

**El error:**

$$3x + 2x^2 = 5x^3$$ ❌

**Lo correcto:**

$$3x + 2x^2$$ no se puede simplificar más ✓

Solo puedes sumar términos que tengan **exactamente** la misma parte literal. $3x$ y $2x^2$ son como manzanas y naranjas—no se combinan.

**Qué sí puedes sumar:**

- $3x + 5x = 8x$ ✓
- $2x^2 + 7x^2 = 9x^2$ ✓
- $4xy + 2xy = 6xy$ ✓

**Qué no puedes sumar:**

- $3x + 2y$ (variables distintas)
- $5x + 3x^2$ (exponentes distintos)
- $2xy + 3x$ (partes literales distintas)

**Cómo atraparlo:** Antes de sumar, pregúntate: "¿Tienen exactamente la misma variable con el mismo exponente?" Si no, déjalos separados.

## 4. La desigualdad invertida

Cuando resuelves una inecuación, hay una regla que muchos olvidan: al multiplicar o dividir por un número negativo, **el signo de la desigualdad se invierte**.

**El error:**

$-2x < 6 \quad \Rightarrow \quad x < -3$ ❌

**Lo correcto:**

$-2x < 6 \quad \Rightarrow \quad x > -3$ ✓

Al dividir ambos lados por $-2$, el $<$ se convierte en $>$.

**Por qué pasa:** Memorizaste el procedimiento pero no entiendes por qué funciona. Piénsalo así: si $-2x < 6$, significa que $-2x$ es un número pequeño (negativo grande). Para que eso pase, $x$ tiene que ser un número grande positivo—mayor que $-3$.

**Cómo atraparlo:** Después de resolver, verifica con un número. Si $x > -3$, entonces $x = 0$ debería funcionar: $-2(0) = 0 < 6$. ✓

## 5. La pendiente al revés

La fórmula de la pendiente es simple, pero bajo presión es fácil invertirla.

**El error:**

$$m = \frac{x_2 - x_1}{y_2 - y_1}$$ ❌

**Lo correcto:**

$$m = \frac{y_2 - y_1}{x_2 - x_1}$$ ✓

**Cómo recordarlo:** "y arriba, x abajo". La pendiente mide cuánto sube (cambio en $y$) por cada unidad que avanza (cambio en $x$).

**Error relacionado—pendientes perpendiculares:**

Si una recta tiene pendiente $m_1 = 3$, la perpendicular no tiene pendiente $-3$.

- ❌ $m_2 = -3$
- ✓ $m_2 = -\frac{1}{3}$

Las pendientes perpendiculares son **recíprocas negativas**: $m_1 \cdot m_2 = -1$.

## 6. El vértice mal calculado

Para encontrar el vértice de una parábola $f(x) = ax^2 + bx + c$, usas la fórmula:

$$x_v = \frac{-b}{2a}$$

**El error:** Olvidar el signo negativo.

**Ejemplo:**

Para $f(x) = x^2 - 6x + 5$:

- ❌ $x_v = \frac{-6}{2(1)} = -3$
- ✓ $x_v = \frac{-(-6)}{2(1)} = \frac{6}{2} = 3$

**Por qué pasa:** Ves el $-6$ y asumes que ya es negativo. Pero la fórmula dice $-b$, así que si $b = -6$, entonces $-b = 6$.

**Cómo atraparlo:** Siempre escribe la fórmula primero, luego sustituye con paréntesis: $x_v = \frac{-(-6)}{2(1)}$.

## 7. Factorizar a medias

A veces factorizas correctamente, pero no llegas hasta el final.

**El error:**

$$x^2 + 4x + 4 = \text{"no se puede factorizar"}$$ ❌

**Lo correcto:**

$$x^2 + 4x + 4 = (x + 2)^2$$ ✓

Este es un trinomio cuadrado perfecto. La pista está en que $4 = 2^2$ y $4x = 2 \cdot 2 \cdot x$.

**Otro ejemplo:**

$$x^3 + 4x^2 + 4x$$

No te detengas en $x(x^2 + 4x + 4)$. El factor interno también se factoriza:

$$x(x + 2)^2$$ ✓

**Cómo atraparlo:** Después de factorizar, mira cada factor y pregúntate: "¿Se puede factorizar más?" Busca especialmente:

- Cuadrados perfectos: $a^2 + 2ab + b^2 = (a + b)^2$
- Diferencias de cuadrados: $a^2 - b^2 = (a + b)(a - b)$

## Cómo evitar estos errores

La mejor defensa contra estos errores tiene dos partes:

**1. Verificación:** Después de resolver, sustituye tu respuesta en la expresión original. Si no cuadra, hay un error en algún paso.

**2. Práctica deliberada:** Cada uno de estos errores es un patrón. Cuando has resuelto 50 ejercicios de binomios al cuadrado, tu cerebro deja de tomar el atajo incorrecto. La velocidad viene de la práctica, no de saltar pasos.

Los errores no son señal de que "no eres bueno para matemáticas". Son información sobre qué patrones necesitas practicar más. Cada error que identificas y corriges es un punto que no vas a perder en la PAES.

Para más errores comunes que cuestan puntos, revisa:
- [Los 7 errores de números más frecuentes en la PAES](/blog/errores-comunes-numeros-paes)
- [Los 7 errores de geometría más frecuentes en la PAES](/blog/errores-comunes-geometria-paes)
- [Los 7 errores de probabilidad y estadística más frecuentes en la PAES](/blog/errores-comunes-probabilidad-estadistica-paes)

---

*¿Quieres practicar hasta que estos errores desaparezcan? SimplePAES te da retroalimentación instantánea que te muestra exactamente dónde te equivocaste—para que no repitas el mismo error dos veces.*
