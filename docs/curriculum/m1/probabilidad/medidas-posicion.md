# Medidas de Posición

## Overview

Las medidas de posición dividen un conjunto de datos ordenados en partes iguales, permitiendo ubicar valores específicos dentro de la distribución. Las más importantes son los cuartiles, deciles y percentiles.


---

## Conceptos Clave

### Medidas de Posición

Valores que dividen un conjunto de datos ordenados en partes específicas.

**Principales medidas**:
- **Cuartiles** (4 partes)
- **Deciles** (10 partes)
- **Percentiles** (100 partes)

---

## Cuartiles

### Definición

Los cuartiles dividen los datos ordenados en **4 partes iguales** (25% cada una).

**Tres cuartiles**:
- $Q_1$ = **Primer cuartil** (25% de los datos son menores)
- $Q_2$ = **Segundo cuartil** = Mediana (50% de los datos son menores)
- $Q_3$ = **Tercer cuartil** (75% de los datos son menores)

### Visualización

```
    ├────────┼────────┼────────┼────────┤
  Mínimo    Q₁       Q₂       Q₃     Máximo
           25%      50%      75%
```

### Cálculo

**Paso 1**: Ordenar los datos de menor a mayor

**Paso 2**: Encontrar la mediana ($Q_2$)

**Paso 3**:
- $Q_1$ = mediana de la mitad inferior
- $Q_3$ = mediana de la mitad superior

**Ejemplo**: Datos ordenados: 2, 4, 6, 8, 10, 12, 14, 16, 18

**Mediana** ($Q_2$): 10 (5° valor)

**Mitad inferior**: 2, 4, 6, 8
$$Q_1 = \frac{4 + 6}{2} = 5$$

**Mitad superior**: 12, 14, 16, 18
$$Q_3 = \frac{14 + 16}{2} = 15$$

**Resultado**: $Q_1 = 5$, $Q_2 = 10$, $Q_3 = 15$

---

## Rango Intercuartílico (IQR)

### Definición

Medida de dispersión que indica la amplitud del 50% central de los datos.

$$IQR = Q_3 - Q_1$$

### Uso

- Indica la **dispersión** de los datos
- Ayuda a identificar **valores atípicos** (outliers)

**Ejemplo anterior**:
$$IQR = 15 - 5 = 10$$

### Valores Atípicos

**Criterio**:
- **Atípico inferior**: $< Q_1 - 1.5 \times IQR$
- **Atípico superior**: $> Q_3 + 1.5 \times IQR$

**Ejemplo**: Con $Q_1 = 5$, $Q_3 = 15$, $IQR = 10$

Límite inferior: $5 - 1.5(10) = -10$
Límite superior: $15 + 1.5(10) = 30$

Valores fuera de $[-10, 30]$ son atípicos.

---

## Diagrama de Caja (Boxplot)

Representación visual de los cuartiles.

```
        |────────┬───┼───┬────────|
      Mínimo    Q₁  Q₂  Q₃     Máximo
```

**Componentes**:
- Caja: De $Q_1$ a $Q_3$ (IQR)
- Línea central: $Q_2$ (mediana)
- Bigotes: Hasta el mínimo y máximo (sin atípicos)
- Puntos: Valores atípicos

---

## Percentiles

### Definición

Los percentiles dividen los datos en **100 partes iguales**.

**Notación**: $P_k$ donde $k$ es el porcentaje

**Ejemplos**:
- $P_{25} = Q_1$ (25% de los datos son menores)
- $P_{50} = Q_2$ = Mediana
- $P_{75} = Q_3$
- $P_{90}$ (90% de los datos son menores)

### Interpretación

$P_{80} = 45$ significa:
- El 80% de los datos son menores o iguales a 45
- El 20% de los datos son mayores que 45

### Cálculo (Método Simple)

Para encontrar $P_k$ en $n$ datos ordenados:

**Posición**: $\frac{k(n+1)}{100}$

**Ejemplo**: $P_{30}$ de 10 datos

$$\text{Posición} = \frac{30(10+1)}{100} = \frac{330}{100} = 3.3$$

Interpolar entre el 3° y 4° valor.

Si 3° valor = 15 y 4° valor = 20:
$$P_{30} = 15 + 0.3(20-15) = 15 + 1.5 = 16.5$$

---

## Deciles

### Definición

Los deciles dividen los datos en **10 partes iguales** (10% cada una).

**Notación**: $D_k$ donde $k = 1, 2, \ldots, 9$

**Relación con percentiles**:
$$D_1 = P_{10}, \quad D_2 = P_{20}, \quad \ldots, \quad D_5 = P_{50} = Q_2$$

**Ejemplo**:
- $D_3 = P_{30}$ (30% de los datos son menores)
- $D_7 = P_{70}$ (70% de los datos son menores)

---

## Ejemplos Tipo PAES

### Ejemplo 1: Identificar Cuartiles

**Pregunta**: Datos ordenados: 10, 15, 20, 25, 30, 35, 40. ¿Cuál es $Q_1$?

**Opciones**:
- A) 10
- B) 15
- C) 20
- D) 25

**Solución**:

$n = 7$ (impar), mediana = 25

Mitad inferior: 10, 15, 20
$$Q_1 = 15$$

**Respuesta**: B) 15

---

### Ejemplo 2: Calcular IQR

**Pregunta**: Si $Q_1 = 20$ y $Q_3 = 50$, ¿cuál es el rango intercuartílico?

**Opciones**:
- A) 20
- B) 30
- C) 35
- D) 50

**Solución**:
$$IQR = Q_3 - Q_1 = 50 - 20 = 30$$

**Respuesta**: B) 30

---

### Ejemplo 3: Interpretar Percentil

**Pregunta**: Si Juan obtuvo $P_{85} = 700$ en un test, ¿qué significa?

**Opciones**:
- A) El 85% obtuvo 700 puntos
- B) Juan obtuvo 85% de respuestas correctas
- C) El 85% obtuvo menos o igual que Juan
- D) El 85% obtuvo más que Juan

**Solución**:

$P_{85}$ significa que el 85% de los participantes obtuvo menos o igual que Juan.

**Respuesta**: C) El 85% obtuvo menos o igual que Juan

---

### Ejemplo 4: Diagrama de Caja

**Pregunta**: En un diagrama de caja, la caja va desde 30 hasta 60. ¿Qué representa?

**Opciones**:
- A) El rango total
- B) El rango intercuartílico
- C) Los percentiles 10 y 90
- D) La media

**Solución**:

La caja va de $Q_1$ a $Q_3$, que es el IQR.

**Respuesta**: B) El rango intercuartílico

---

### Ejemplo 5: Aplicación

**Pregunta**: Los salarios están: $Q_1 = 400$, $Q_2 = 550$, $Q_3 = 800$. ¿Qué porcentaje gana entre $400 y $800?

**Opciones**:
- A) 25%
- B) 50%
- C) 75%
- D) 100%

**Solución**:

Entre $Q_1$ y $Q_3$ está el 50% central de los datos.

**Respuesta**: B) 50%

---

## Aplicaciones Prácticas

### Educación

Interpretar resultados de pruebas estandarizadas:
- "Estás en el percentil 90" = Superaste al 90% de los participantes

### Salud

Gráficos de crecimiento infantil usan percentiles:
- Peso en percentil 50 = peso promedio para la edad

### Economía

Analizar distribución de salarios, ingresos, precios.

### Deporte

Rendimiento atlético comparado con la población.

---

## Medidas de Dispersión vs Posición

**Dispersión** (cuánto varían los datos):
- Rango
- IQR
- Desviación estándar

**Posición** (dónde están los datos):
- Cuartiles
- Percentiles
- Deciles

---

## Errores Comunes

### ❌ No ordenar los datos primero

Siempre ordenar antes de calcular cuartiles.

### ❌ Confundir percentil con porcentaje

$P_{80} = 45$ NO significa 80% de 45.

Significa que el 80% de los datos son ≤ 45.

### ❌ Incluir la mediana en ambas mitades

Al calcular $Q_1$ y $Q_3$, si $n$ es impar, NO incluir la mediana en las mitades.

### ❌ Pensar que hay 4 cuartiles

Solo hay 3 cuartiles ($Q_1, Q_2, Q_3$), que crean 4 partes.

---

## Relación entre Medidas

$$\begin{align}
Q_1 &= P_{25} = D_{2.5}\\
Q_2 &= P_{50} = D_5 = \text{Mediana}\\
Q_3 &= P_{75} = D_{7.5}
\end{align}$$

---

## Interpretación del Diagrama de Caja

**Caja simétrica**: Distribución simétrica
**Caja alargada a la derecha**: Asimetría positiva
**Caja alargada a la izquierda**: Asimetría negativa
**Caja pequeña**: Datos poco dispersos
**Caja grande**: Datos muy dispersos

---

## Skills Relacionados

Este tema desarrolla las siguientes habilidades PAES:

- `estadistica-cuartiles`: Calcular e interpretar cuartiles
- `estadistica-percentiles`: Trabajar con percentiles
- `estadistica-boxplot`: Interpretar diagramas de caja
- `interpretar-posicion`: Ubicar datos en distribuciones

**Competencias**:
- ✓ Analizar distribuciones de datos
- ✓ Identificar valores atípicos
- ✓ Interpretar medidas de posición
- ✓ Comparar conjuntos de datos

---

## Recursos Adicionales

### Práctica
- [Ver preguntas de práctica](/questions/m1/probabilidad/medidas-posicion)
- [Quiz interactivo](/practice/m1/medidas-posicion)

### Herramientas
- [Calculadora de cuartiles](/calculator?mode=quartiles)
- [Generador de boxplot](/tools/boxplot-maker)

### Temas Relacionados
- ← [Medidas de Tendencia Central](/curriculum/m1/docs/probabilidad/tendencia-central)
- [Reglas de Probabilidad →](/curriculum/m1/docs/probabilidad/reglas-probabilidad)

---

## Referencias

- PAES Competencia M1: Probabilidad y Estadística
- Nivel de dificultad: Medio-Alto
- Tiempo de estudio recomendado: 1 semana
- Número de preguntas en banco: ~15
