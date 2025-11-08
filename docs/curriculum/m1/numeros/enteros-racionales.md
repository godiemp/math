# Enteros y Racionales

## Overview

Los números enteros y racionales forman la base fundamental de las matemáticas. Este módulo cubre las operaciones, propiedades y aplicaciones de estos conjuntos numéricos.


---

<!-- section: conceptos-clave, importance: essential, collapsible: true, defaultOpen: true -->
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

### 🎓 Nota Pedagógica: Visualizando Fracciones

Una fracción representa **partes de un todo**. Piensa en una pizza:
- $\frac{1}{4}$ significa 1 pedazo de 4 pedazos totales
- $\frac{3}{4}$ significa 3 pedazos de 4 pedazos totales

**Relación con decimales:**
Toda fracción puede convertirse a decimal dividiendo el numerador por el denominador:
$$\frac{1}{4} = 1 \div 4 = 0.25$$

**¿Por qué son importantes los racionales?**
- Permiten expresar cantidades que no son enteras (como $2.5$ kg de manzanas)
- Son necesarios para resolver ecuaciones (como $2x = 3$, donde $x = \frac{3}{2}$)
- Aparecen en probabilidades, porcentajes, proporciones, etc.

**Diferencia clave con decimales:**
- Algunos racionales tienen expansión decimal **finita**: $\frac{1}{4} = 0.25$
- Otros tienen expansión decimal **infinita periódica**: $\frac{1}{3} = 0.333...$
- Los números con expansión decimal infinita **no periódica** (como $\pi$ o $\sqrt{2}$) NO son racionales

<!-- /section -->

---

## Operaciones Fundamentales

<!-- section: suma-fracciones, importance: essential, collapsible: true, defaultOpen: true -->
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

#### ⚡ Estrategia Rápida: Suma de Fracciones

**¿Cuándo usar cada método?**

1. **Mismo denominador** → Suma directo (más rápido)
2. **Denominadores son múltiplos** → Convertir al mayor
   - Ejemplo: $\frac{1}{3} + \frac{1}{6} \rightarrow \frac{2}{6} + \frac{1}{6} = \frac{3}{6} = \frac{1}{2}$
3. **Denominadores pequeños** → MCM mental
   - Para 2, 3, 4, 5, 6 puedes calcular MCM rápidamente
4. **Denominadores grandes** → Producto cruzado

**Truco del producto cruzado (cuando MCM es difícil):**
$$\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}$$

Ejemplo:
$$\frac{2}{7} + \frac{3}{11} = \frac{(2 \times 11) + (3 \times 7)}{7 \times 11} = \frac{22 + 21}{77} = \frac{43}{77}$$

⚠️ **Advertencia**: Siempre simplifica el resultado final.

**Ejemplos adicionales para practicar:**

1. $\frac{3}{8} + \frac{1}{4} = \frac{3}{8} + \frac{2}{8} = \frac{5}{8}$ (múltiplos)

2. $\frac{2}{5} + \frac{1}{3} = \frac{6}{15} + \frac{5}{15} = \frac{11}{15}$ (MCM = 15)

3. $\frac{5}{6} - \frac{1}{4} = \frac{10}{12} - \frac{3}{12} = \frac{7}{12}$ (resta igual que suma)

<!-- /section -->

<!-- section: multiplicacion-fracciones, importance: essential, collapsible: true, defaultOpen: true -->
### Multiplicación de Fracciones

<!-- formula-only -->
$$\frac{a}{b} \times \frac{c}{d} = \frac{a \times c}{b \times d}$$
<!-- /formula-only -->

**Ejemplo**:
$$\frac{2}{3} \times \frac{3}{5} = \frac{2 \times 3}{3 \times 5} = \frac{6}{15} = \frac{2}{5}$$

**Tip**: Simplifica antes de multiplicar cuando sea posible:
$$\frac{2}{3} \times \frac{3}{5} = \frac{2 \times \cancel{3}}{\cancel{3} \times 5} = \frac{2}{5}$$
<!-- /section -->

<!-- section: division-fracciones, importance: essential, collapsible: true, defaultOpen: true -->
### División de Fracciones

<!-- formula-only -->
$$\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \times \frac{d}{c}$$
<!-- /formula-only -->

**Regla**: "Multiplica por el recíproco"

**Ejemplo**:
$$\frac{3}{4} \div \frac{2}{5} = \frac{3}{4} \times \frac{5}{2} = \frac{15}{8}$$

#### 🌍 Aplicaciones Prácticas

**Situación 1: Repartir pizza**
Tienes $\frac{3}{4}$ de una pizza y quieres repartirla entre 3 amigos. ¿Cuánto recibe cada uno?

$$\frac{3}{4} \div 3 = \frac{3}{4} \times \frac{1}{3} = \frac{3}{12} = \frac{1}{4}$$

Cada amigo recibe $\frac{1}{4}$ de pizza.

**Situación 2: Duplicar una receta**
Una receta necesita $\frac{2}{3}$ de taza de azúcar. Si quieres hacer el doble, ¿cuánto necesitas?

$$\frac{2}{3} \times 2 = \frac{2 \times 2}{3} = \frac{4}{3} = 1\frac{1}{3} \text{ tazas}$$

**Situación 3: Calcular descuentos**
Un producto cuesta $\$12.000$ y tiene $\frac{1}{4}$ de descuento. ¿Cuánto pagas?

$$\text{Descuento} = 12.000 \times \frac{1}{4} = 3.000$$
$$\text{Precio final} = 12.000 - 3.000 = 9.000$$

O más directo: $12.000 \times \frac{3}{4} = 9.000$

**¿Por qué funciona "multiplica por el recíproco"?**

Dividir entre una fracción es como preguntar: "¿Cuántas veces cabe esta fracción en el número?"

$$\frac{3}{4} \div \frac{1}{2} = \text{¿Cuántas mitades hay en } \frac{3}{4}\text{?}$$

La respuesta es $\frac{3}{2} = 1.5$ (una mitad y media).

**Tip de verificación**: El resultado de dividir $\frac{a}{b} \div \frac{c}{d}$ siempre es mayor que $\frac{a}{b}$ si $\frac{c}{d} < 1$, y menor si $\frac{c}{d} > 1$.

<!-- /section -->

---

## Propiedades Importantes

<!-- section: orden-racionales, importance: important, collapsible: true -->
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
<!-- /section -->

<!-- section: mcd, importance: important, collapsible: true -->
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
<!-- /section -->

<!-- section: mcm, importance: important, collapsible: true -->
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

### 🔍 Estrategias Avanzadas: MCD y MCM

**Método alternativo: Factorización prima**

Para encontrar MCD y MCM de forma eficiente:

**Ejemplo**: Encontrar MCD y MCM de 24 y 36

1. **Factorizar**:
   $$24 = 2^3 \times 3^1$$
   $$36 = 2^2 \times 3^2$$

2. **MCD**: Tomar el **menor exponente** de cada factor común:
   $$\text{MCD} = 2^2 \times 3^1 = 4 \times 3 = 12$$

3. **MCM**: Tomar el **mayor exponente** de todos los factores:
   $$\text{MCM} = 2^3 \times 3^2 = 8 \times 9 = 72$$

**Verificación**:
$$\text{MCD}(24, 36) \times \text{MCM}(24, 36) = 12 \times 72 = 864 = 24 \times 36 \,\checkmark$$

**Casos especiales importantes**:

1. **Números primos entre sí** (no comparten factores):
   - MCD = 1
   - MCM = producto de ambos
   - Ejemplo: MCD(7, 11) = 1, MCM(7, 11) = 77

2. **Uno es múltiplo del otro**:
   - MCD = el menor
   - MCM = el mayor
   - Ejemplo: MCD(12, 36) = 12, MCM(12, 36) = 36

3. **Números iguales**:
   - MCD = MCM = el número mismo

**Atajos mentales para MCM de números pequeños**:

- MCM(2, 3) = 6
- MCM(2, 4) = 4
- MCM(3, 4) = 12
- MCM(3, 6) = 6
- MCM(4, 6) = 12
- MCM(5, 10) = 10

¡Memoriza estos para resolver más rápido en la PAES!

<!-- /section -->

---

## Ejemplos Tipo PAES

<!-- section: ejemplo-1-paes, importance: essential, collapsible: true, defaultOpen: false -->
#### Ejemplo 1: Operaciones Básicas

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
<!-- /section -->

<!-- section: ejemplo-2-paes, importance: essential, collapsible: true, defaultOpen: false -->
#### Ejemplo 2: MCD

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
<!-- /section -->

<!-- section: ejemplo-3-paes, importance: essential, collapsible: true, defaultOpen: false -->
#### Ejemplo 3: Comparación

**Pregunta**: Ordena de menor a mayor: $\frac{1}{2}$, $\frac{2}{5}$, $\frac{3}{4}$

**Solución**:

Convertir a mismo denominador $(\text{MCM} = 20)$:

$$\frac{1}{2} = \frac{10}{20}, \quad \frac{2}{5} = \frac{8}{20}, \quad \frac{3}{4} = \frac{15}{20}$$

$$\frac{8}{20} < \frac{10}{20} < \frac{15}{20}$$

**Respuesta**: $\frac{2}{5} < \frac{1}{2} < \frac{3}{4}$

#### 🎯 Análisis de Distractores (Trampas Comunes en PAES)

**¿Por qué las otras opciones están mal?**

En el **Ejemplo 1** ($\frac{2}{3} + \frac{1}{4}$):

- **Opción A: $\frac{3}{7}$**
  - ❌ Trampa: Sumar numeradores y denominadores directamente
  - Error común: $\frac{2+1}{3+4} = \frac{3}{7}$

- **Opción C: $\frac{5}{12}$**
  - ❌ Trampa: Olvidar multiplicar el numerador al amplificar
  - Error: $\frac{2}{3} = \frac{2}{12}$ (mal), debería ser $\frac{8}{12}$

- **Opción D: $\frac{3}{12}$**
  - ❌ Trampa: Solo sumar un numerador correctamente
  - Error: Amplificar solo una fracción

**Estrategia anti-trampa**:
1. ✓ Encuentra MCM correctamente
2. ✓ Amplifica **ambas** fracciones
3. ✓ Verifica que ambas tengan el mismo denominador
4. ✓ Suma solo los numeradores
5. ✓ Simplifica si es posible

**Ejemplo adicional con análisis completo**:

**Pregunta**: ¿Cuál es el resultado de $\frac{3}{5} - \frac{1}{3}$?

**Opciones**:
- A) $\frac{2}{2}$
- B) $\frac{4}{15}$  ← Correcta
- C) $\frac{2}{8}$
- D) $\frac{9}{15}$

**Solución paso a paso**:
$$\text{MCM}(5, 3) = 15$$
$$\frac{3}{5} = \frac{9}{15}, \quad \frac{1}{3} = \frac{5}{15}$$
$$\frac{9}{15} - \frac{5}{15} = \frac{4}{15}$$

**Análisis de errores**:
- **A** ($\frac{2}{2}$): Restar numeradores y denominadores → $\frac{3-1}{5-3}$
- **C** ($\frac{2}{8}$): MCM incorrecto, usar $5+3=8$ en lugar de $5 \times 3 = 15$
- **D** ($\frac{9}{15}$): Solo amplificó la primera fracción

**Tip PAES**: Si tu respuesta no aparece en las opciones, revisa:
1. ¿Calculaste bien el MCM?
2. ¿Amplificaste ambas fracciones?
3. ¿Simplificaste correctamente?

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

### 🔬 ¿Por qué ocurren estos errores?

**Error 1: Sumar numeradores y denominadores**

**Explicación psicológica**: Es tentador porque la suma "parece" simétrica:
$$\frac{1}{2} + \frac{1}{3} \stackrel{\text{mal}}{\rightarrow} \frac{1+1}{2+3} = \frac{2}{5}$$

**Prueba de que está mal**: Si esto fuera correcto, tendríamos:
$$\frac{1}{2} + \frac{1}{3} = \frac{2}{5}$$

Pero en decimales:
$$0.5 + 0.333... = 0.833... \neq 0.4$$

¡No coincide! El error viene de no entender que las fracciones representan **proporciones**, no números independientes.

**Contraejemplo extremo**:
$$\frac{1}{2} + \frac{1}{2} \stackrel{\text{mal}}{\rightarrow} \frac{2}{4} = \frac{1}{2}$$

¡Estaríamos diciendo que $\frac{1}{2} + \frac{1}{2} = \frac{1}{2}$! Obviamente, la respuesta correcta es $1$.

---

**Error 2: No simplificar**

**¿Por qué importa?**
- En la PAES, las respuestas siempre están **simplificadas**
- Si calculaste $\frac{6}{12}$ pero las opciones son $\frac{1}{2}$, $\frac{2}{3}$, etc., necesitas simplificar

**Cómo evitarlo**:
1. Siempre pregúntate: "¿Tienen factores comunes?"
2. Si ambos son pares, divide por 2
3. Si terminan en 0 o 5, revisa divisibilidad por 5
4. Calcula el MCD y divide

**Ejemplo de simplificación paso a paso**:
$$\frac{48}{72} = \frac{48 \div 24}{72 \div 24} = \frac{2}{3}$$

---

**Error 3: Confundir MCM con MCD**

**Regla mnemotécnica**:
- **MCM** → **M**ultiplicar, **M**ayor → Para **s**u**M**ar fracciones (misma letra M)
- **MCD** → **D**ividir, **D**ivisor → Para **D**ivi**D**ir/simplificar (misma letra D)

**Tabla de ayuda**:

| Operación | Necesitas | Recuerda |
|-----------|-----------|----------|
| $\frac{1}{4} + \frac{1}{6}$ | MCM(4,6)=12 | Denominador **común** → MCM |
| $\frac{12}{18}$ simplificar | MCD(12,18)=6 | **Di**vidir → MC**D** |

---

**Error 4 (Bonus): Dividir mal**

Error frecuente:
$$\frac{3}{4} \div 2 \stackrel{\text{mal}}{\rightarrow} \frac{3}{4 \div 2} = \frac{3}{2}$$

Correcto:
$$\frac{3}{4} \div 2 = \frac{3}{4} \times \frac{1}{2} = \frac{3}{8}$$

**Recuerda**: Dividir entre un número es lo mismo que multiplicar por su inverso:
$$\div 2 = \times \frac{1}{2}$$

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
