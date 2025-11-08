# Medidas de Tendencia Central

## Overview

Las medidas de tendencia central son valores que representan el "centro" o valor típico de un conjunto de datos. Las tres principales son la media, la mediana y la moda.

**Nivel**: M1 (Básico)
**Dificultad**: ⭐⭐ Medio
**Tiempo estimado**: 1-2 semanas

---

## Conceptos Clave

### Medidas de Tendencia Central

Valores que resumen un conjunto de datos en un solo número representativo.

**Las tres principales**:
1. **Media** (promedio)
2. **Mediana** (valor central)
3. **Moda** (valor más frecuente)

---

## Media Aritmética

### Definición

El **promedio** de todos los valores.

$$\bar{x} = \frac{\sum x_i}{n} = \frac{x_1 + x_2 + \cdots + x_n}{n}$$

donde:
- $\bar{x}$ = media (se lee "x barra")
- $n$ = número de datos
- $\sum$ = suma de todos los valores

### Cálculo

**Ejemplo**: Notas de un estudiante: 5, 6, 7, 6, 6

$$\bar{x} = \frac{5 + 6 + 7 + 6 + 6}{5} = \frac{30}{5} = 6$$

### Media Ponderada

Cuando los valores tienen diferentes "pesos" o importancias.

$$\bar{x} = \frac{\sum (x_i \cdot w_i)}{\sum w_i}$$

**Ejemplo**: Calificación final
- Examen 1 (30%): 6.0
- Examen 2 (30%): 5.5
- Proyecto (40%): 7.0

$$\bar{x} = \frac{6.0(0.30) + 5.5(0.30) + 7.0(0.40)}{1.0} = \frac{1.8 + 1.65 + 2.8}{1} = 6.25$$

### Media con Frecuencias

Cuando los datos están agrupados en una tabla de frecuencias:

$$\bar{x} = \frac{\sum (x_i \cdot f_i)}{n}$$

**Ejemplo**:

| Valor ($x_i$) | Frecuencia ($f_i$) | $x_i \cdot f_i$ |
|---------|-----------|----------|
| 2       | 3         | 6        |
| 4       | 5         | 20       |
| 6       | 2         | 12       |
| **Total** | **10** | **38**   |

$$\bar{x} = \frac{38}{10} = 3.8$$

### Propiedades de la Media

1. **Sensible a valores extremos**: Un valor muy alto o muy bajo afecta mucho la media
2. **Única**: Solo hay una media para un conjunto de datos
3. **Puede no ser un valor del conjunto**: La media puede ser decimal

---

## Mediana

### Definición

El valor que está en el **centro** cuando los datos se ordenan de menor a mayor.

**Ventaja**: No se ve afectada por valores extremos.

### Cálculo

**Paso 1**: Ordenar los datos de menor a mayor

**Paso 2**:
- Si $n$ es **impar**: La mediana es el valor central
- Si $n$ es **par**: La mediana es el promedio de los dos valores centrales

### Ejemplos

**Ejemplo 1** (n impar): Datos: 3, 7, 2, 9, 5

Ordenar: 2, 3, **5**, 7, 9

$$\text{Mediana} = 5$$

**Ejemplo 2** (n par): Datos: 4, 8, 2, 6, 10, 5

Ordenar: 2, 4, **5, 6**, 8, 10

$$\text{Mediana} = \frac{5 + 6}{2} = 5.5$$

### Fórmula de la Posición

Para $n$ datos ordenados:

- Si $n$ es impar: Posición $= \frac{n+1}{2}$
- Si $n$ es par: Posiciones $= \frac{n}{2}$ y $\frac{n}{2} + 1$

**Ejemplo**: 9 datos
$$\text{Posición} = \frac{9+1}{2} = 5$$

El 5° dato es la mediana.

---

## Moda

### Definición

El valor que aparece con **mayor frecuencia**.

### Casos

1. **Unimodal**: Un solo valor con máxima frecuencia
2. **Bimodal**: Dos valores con la misma frecuencia máxima
3. **Multimodal**: Tres o más valores con frecuencia máxima
4. **Sin moda**: Todos los valores tienen la misma frecuencia

### Ejemplos

**Ejemplo 1** (Unimodal): 2, 3, 4, 4, 4, 5, 6
$$\text{Moda} = 4$$

**Ejemplo 2** (Bimodal): 1, 2, 2, 3, 4, 4, 5
$$\text{Modas} = 2 \text{ y } 4$$

**Ejemplo 3** (Sin moda): 1, 2, 3, 4, 5
$$\text{No hay moda}$$

---

## Comparación de las Medidas

| Medida | Ventaja | Desventaja |
|--------|---------|-----------|
| **Media** | Usa todos los datos | Sensible a valores extremos |
| **Mediana** | No afectada por extremos | No usa todos los datos |
| **Moda** | Fácil de identificar | Puede no existir o no ser única |

### ¿Cuándo usar cada una?

**Media**:
- Datos simétricos sin valores extremos
- Cuando necesitas usar todos los datos

**Mediana**:
- Datos con valores extremos (outliers)
- Salarios, precios de casas

**Moda**:
- Datos categóricos
- Encontrar el valor más popular

---

## Ejemplos Tipo PAES

### Ejemplo 1: Calcular Media

**Pregunta**: ¿Cuál es la media de 3, 5, 7, 9, 11?

**Opciones**:
- A) 5
- B) 7
- C) 9
- D) 11

**Solución**:
$$\bar{x} = \frac{3 + 5 + 7 + 9 + 11}{5} = \frac{35}{5} = 7$$

**Respuesta**: B) 7

---

### Ejemplo 2: Calcular Mediana

**Pregunta**: Datos: 12, 8, 15, 10, 9. ¿Cuál es la mediana?

**Opciones**:
- A) 8
- B) 9
- C) 10
- D) 12

**Solución**:

Ordenar: 8, 9, **10**, 12, 15

$$\text{Mediana} = 10$$

**Respuesta**: C) 10

---

### Ejemplo 3: Identificar Moda

**Pregunta**: En el conjunto 2, 5, 3, 5, 7, 5, 8, ¿cuál es la moda?

**Opciones**:
- A) 2
- B) 3
- C) 5
- D) 8

**Solución**:

El 5 aparece 3 veces (más frecuente).

$$\text{Moda} = 5$$

**Respuesta**: C) 5

---

### Ejemplo 4: Media con Tabla

**Pregunta**: Dada la tabla:

| Nota | Frecuencia |
|------|-----------|
| 4    | 2         |
| 5    | 5         |
| 6    | 3         |

¿Cuál es la media?

**Opciones**:
- A) 4.5
- B) 5.0
- C) 5.1
- D) 5.5

**Solución**:
$$\bar{x} = \frac{4(2) + 5(5) + 6(3)}{2+5+3} = \frac{8 + 25 + 18}{10} = \frac{51}{10} = 5.1$$

**Respuesta**: C) 5.1

---

### Ejemplo 5: Efecto de Valor Extremo

**Pregunta**: Los salarios de 5 empleados son: $300, $320, $310, $330, $1000. ¿Qué medida representa mejor el salario típico?

**Opciones**:
- A) Media
- B) Mediana
- C) Moda
- D) Rango

**Solución**:

Media: $\frac{300+320+310+330+1000}{5} = 452$ (afectada por $1000)

Mediana: 300, 310, **320**, 330, 1000 = $320 (más representativa)

**Respuesta**: B) Mediana

---

## Relación entre Media, Mediana y Moda

### Distribución Simétrica

$$\text{Media} = \text{Mediana} = \text{Moda}$$

### Distribución Asimétrica Positiva (cola a la derecha)

$$\text{Moda} < \text{Mediana} < \text{Media}$$

### Distribución Asimétrica Negativa (cola a la izquierda)

$$\text{Media} < \text{Mediana} < \text{Moda}$$

---

## Errores Comunes

### ❌ No ordenar los datos para calcular mediana

Siempre ordenar primero.

### ❌ Olvidar promediar los dos valores centrales (n par)

Cuando $n$ es par, la mediana es el promedio de los dos centrales.

### ❌ Confundir frecuencia con valor en la moda

La moda es el **valor**, no la frecuencia.

**Ejemplo**: Si 5 aparece 7 veces, la moda es 5 (no 7).

### ❌ Usar media cuando hay valores extremos

Preferir mediana en estos casos.

---

## Datos Agrupados

Cuando los datos están en intervalos, se usa la **marca de clase** (punto medio del intervalo).

**Ejemplo**:

| Intervalo | Frecuencia | Marca de Clase |
|-----------|-----------|---------------|
| 10-20     | 5         | 15            |
| 20-30     | 8         | 25            |
| 30-40     | 3         | 35            |

$$\bar{x} = \frac{15(5) + 25(8) + 35(3)}{16} = \frac{75 + 200 + 105}{16} = \frac{380}{16} = 23.75$$

---

## Skills Relacionados

Este tema desarrolla las siguientes habilidades PAES:

- `estadistica-media`: Calcular e interpretar la media
- `estadistica-mediana`: Calcular e interpretar la mediana
- `estadistica-moda`: Identificar la moda
- `interpretar-datos`: Analizar conjuntos de datos

**Competencias**:
- ✓ Calcular medidas estadísticas
- ✓ Interpretar resultados
- ✓ Elegir medida apropiada
- ✓ Analizar datos reales

---

## Recursos Adicionales

### Práctica
- [Ver preguntas de práctica](/questions/m1/probabilidad/tendencia-central)
- [Quiz interactivo](/practice/m1/tendencia-central)

### Herramientas
- [Calculadora estadística](/calculator?mode=stats)
- [Analizador de datos](/tools/data-analyzer)

### Temas Relacionados
- ← [Tablas y Gráficos](/curriculum/m1/docs/probabilidad/tablas-graficos)
- [Medidas de Posición →](/curriculum/m1/docs/probabilidad/medidas-posicion)

---

## Referencias

- PAES Competencia M1: Probabilidad y Estadística
- Nivel de dificultad: Medio
- Tiempo de estudio recomendado: 1-2 semanas
- Número de preguntas en banco: ~18
