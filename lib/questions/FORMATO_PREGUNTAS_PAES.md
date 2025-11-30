# Formato de Preguntas PAES - Guía de Estilo

## Objetivo

Generar preguntas tipo PAES de Matemática que integren contextos cotidianos y realistas, manteniendo el rigor matemático y la coherencia semántica.

## Estructura Requerida

### 1. Operación base
- **Formato**: Operación matemática literal
- **Ejemplo**: `Operación base: 3x + 5x - 2x`
- **Propósito**: Identificar la operación fundamental que se está evaluando (útil para conexión futura con operaciones base)

### 2. Problema tipo PAES (contextualizado)

La pregunta debe:

- **Contexto realista**: Presentar una situación cotidiana coherente (clima, dinero, compras, juegos, transporte, educación, etc.)
- **Extensión**: 4 a 5 oraciones narrativas
- **Integración natural**: La pregunta debe estar integrada al final del mismo párrafo narrativo, de forma fluida (sin separarla con encabezado tipo "¿Cuánto...?")
- **Variables concretas**: Si se usa una variable algebraica (x, y, etc.), debe representar algo tangible y explicarse claramente
- **Sin pistas explícitas**: Evitar escribir operaciones matemáticas directamente en el texto (ej: no escribir "3x libros" sino "3 cajas de libros" donde x representa libros por caja)

### 3. Alternativas
- Cuatro opciones: A), B), C), D)
- Formato claro y consistente

### 4. Razonamiento esperado
- Explicar el proceso de resolución paso a paso
- Incluir las operaciones matemáticas necesarias
- Conectar con el contexto del problema

### 5. Respuesta correcta
- Indicar la alternativa correcta con su valor
- Formato: `Respuesta correcta: A) 6x`

## Ejemplo Completo

```
Operación base: 3x + 5x - 2x

Problema tipo PAES (contextualizado):

Andrés está organizando la biblioteca de su colegio y debe contar libros que vienen en cajas. Cada caja contiene la misma cantidad de libros, representada por x. En el primer estante encuentra 3 cajas de libros, en el segundo estante hay 5 cajas de libros, pero debe retirar 2 cajas porque los libros están dañados. El director le pide calcular una expresión que represente el total de libros útiles que quedan. ¿Cuál es la expresión simplificada?

Alternativas:
A) 6x
B) 10x
C) 8x
D) 5x

Razonamiento esperado: Sumamos los libros del primer y segundo estante (3x + 5x = 8x) y restamos los dañados (8x - 2x = 6x). Agrupando términos semejantes: 3x + 5x - 2x = (3 + 5 - 2)x = 6x, que representa 6 cajas con x libros cada una.

Respuesta correcta: A) 6x
```

## Principios Clave

### ✅ Hacer:
- Usar contextos cotidianos y realistas
- Explicar qué representa cada variable al introducirla
- Mantener coherencia semántica (cantidades razonables para el contexto)
- Integrar la pregunta naturalmente en la narrativa
- Usar tono formal y claro, similar a PAES oficial
- Mantener el concepto de variable (x, y) cuando sea apropiado
- Permitir que el estudiante traduzca el contexto a la operación matemática

### ❌ Evitar:
- Contextos inverosímiles o cantidades absurdas
- Separar la pregunta del contexto con encabezados
- Dar pistas explícitas escribiendo operaciones en el texto narrativo (ej: "3x manzanas", usar mejor "3 bolsas de manzanas" donde cada bolsa tiene x manzanas)
- Variables abstractas sin explicación
- Tono informal o ambiguo
- Preguntas sin contexto

## Tipos de Contextos Sugeridos

- **Educación**: bibliotecas, aulas, materiales escolares
- **Compras**: supermercados, tiendas, precios
- **Transporte**: distancias, velocidades, tiempos
- **Cocina**: recetas, ingredientes, porciones
- **Deportes**: puntajes, equipos, tiempos
- **Finanzas**: ahorros, gastos, inversiones
- **Naturaleza**: temperaturas, alturas, mediciones
- **Construcción**: materiales, medidas, áreas

## Niveles PAES: M1 y M2

### M1 (Matemática 1 - Competencia Matemática)
Prueba **obligatoria para todos** los postulantes. Evalúa competencias matemáticas generales.

### M2 (Matemática 2 - Competencia Científica)
Prueba **adicional** requerida por carreras científicas, técnicas e ingenierías. Los estudiantes que rinden M2 **también rinden M1**.

### Temario Oficial
El temario completo de cada nivel está definido en `backend/src/config/thematic-units.ts`.

**Importante sobre la organización en este software:**
- El **temario de M2 incluye todo M1 + contenidos adicionales** (logaritmos, trigonometría avanzada, probabilidad condicional, etc.)
- En nuestro banco de preguntas, las **preguntas etiquetadas como M2** corresponden únicamente al **temario específico de M2** (los contenidos adicionales que no están en M1)
- Si un estudiante practica M2, el sistema le mostrará preguntas de M1 + preguntas específicas de M2

## Notas de Implementación

El campo `operación base` es crítico para:
- Vincular preguntas con operaciones fundamentales
- Facilitar búsqueda y clasificación
- Permitir generación automática de variaciones futuras
- Conectar con el sistema de práctica de operaciones

## Visión del Banco de Preguntas

### Objetivo a Largo Plazo

El banco de preguntas está diseñado para escalar a **miles de preguntas** por unidad temática. La meta es que cada estudiante tenga una experiencia de práctica única, con suficientes variaciones para:

1. **Evitar memorización**: Con miles de variaciones, los estudiantes deben dominar el concepto, no memorizar respuestas específicas
2. **Práctica infinita**: Permitir que estudiantes practiquen el mismo tipo de problema múltiples veces con contextos diferentes
3. **Evaluación robusta**: Generar evaluaciones únicas para cada estudiante

### Estrategia de Variaciones

Es **intencional y deseable** tener múltiples preguntas que evalúen el mismo concepto matemático con:

- **Diferentes contextos**: El mismo problema de proporcionalidad puede presentarse como receta de cocina, mezcla de químicos, o dilución de pintura
- **Diferentes números**: Variaciones numéricas del mismo tipo de problema
- **Diferentes niveles de dificultad**: Versiones más simples y más complejas del mismo concepto
- **Diferentes formulaciones**: La misma operación presentada de distintas formas

### Ejemplos de Variaciones Válidas

| Concepto | Variación 1 | Variación 2 | Variación 3 |
|----------|-------------|-------------|-------------|
| Trabajo conjunto `1/a + 1/b = 1/t` | Pintar casa | Llenar tanque | Construir muro |
| Bayes (falsos positivos) | Test médico | Control de calidad | Filtro spam |
| Sistemas 2x2 | Edades padre-hijo | Mezcla soluciones | Precios tickets |
| Distancia-velocidad | Autos encontrándose | Ciclista alcanzando | Viaje ida y vuelta |

### Preguntas Similares Entre Niveles (M1/M2)

Es aceptable que existan preguntas similares entre M1 y M2 cuando:
- El concepto se refuerza en ambos niveles con diferente profundidad
- M2 agrega complejidad adicional (más variables, contextos más abstractos)
- El currículum oficial incluye el tema en ambos niveles

### Organización por Unidad Temática

Cada archivo de preguntas (`m1-xxx-###.ts`, `m2-xxx-###.ts`) corresponde a una unidad temática específica. Las preguntas deben:

1. Pertenecer conceptualmente a esa unidad temática
2. Usar las habilidades (skills) correspondientes
3. Cubrir las diferentes subsecciones definidas en el archivo

### Contribución de Nuevas Preguntas

Al agregar preguntas:
- Verificar que no sea un **duplicado exacto** (mismo contexto Y mismos números)
- Las **variaciones** del mismo concepto son bienvenidas
- Mantener balance entre dificultades (easy, medium, hard, extreme)
- Seguir el formato de `operacionBase` para facilitar clasificación futura
