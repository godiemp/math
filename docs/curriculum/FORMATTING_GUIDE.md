# Guía de Formato para Documentos del Curriculum

Esta guía establece las reglas y mejores prácticas para crear y mantener documentos en `/docs/curriculum/`.

---

## 1. Section Wrappers

Todos los documentos usan `AdaptiveMarkdownViewer` que soporta secciones collapsibles y filtrado por modo de lectura.

### Sintaxis Básica

```markdown
<!-- section: id-seccion, importance: essential|important|advanced, collapsible: true, defaultOpen: true|false -->
## Título de la Sección

Contenido aquí...
<!-- /section -->
```

### Niveles de Importancia

- **essential**: Se muestra en todos los modos (Full, Summary, Formulas)
- **important**: Se muestra en Full y Summary
- **advanced**: Solo se muestra en Full

### Cuándo Usar Cada Nivel

**Essential:**
- Conceptos fundamentales
- Fórmulas clave
- Ejemplos básicos tipo PAES
- Operaciones principales

**Important:**
- Estrategias y tips avanzados
- Errores comunes
- Aplicaciones prácticas
- Ejemplos adicionales

**Advanced:**
- Skills relacionados
- Recursos adicionales
- Conexiones con otros temas
- Material complementario

---

## 2. Manejo de Fórmulas

### ⚠️ REGLA ANTI-REPETICIÓN

**NO hagas esto:**
```markdown
<!-- formula-only -->
**Fórmula**:
$$x\% = \frac{x}{100}$$
<!-- /formula-only -->

**Fórmula**:
$$x\% = \frac{x}{100}$$
```

### ✅ Opción 1: Fórmula Solo en Modo Fórmulas (Recomendado)

Usa cuando la fórmula es auto-explicativa y ya está explicada en el texto.

```markdown
### Calcular el Porcentaje de una Cantidad

<!-- formula-only -->
$$\text{Resultado} = \frac{\text{Porcentaje}}{100} \times \text{Cantidad Total}$$
<!-- /formula-only -->

Para calcular el 30% de 200:
$$30\% \text{ de } 200 = 0.3 \times 200 = 60$$
```

**Resultado:**
- En modo **Formulas**: Solo muestra la fórmula general
- En modo **Full/Summary**: Muestra el ejemplo aplicado (sin repetir la fórmula genérica)

### ✅ Opción 2: Fórmula en Texto

Usa cuando la fórmula necesita contexto o explicación inmediata.

```markdown
### Conversión

La regla es simple: divide por 100
$$x\% = \frac{x}{100}$$

**Ejemplo**: $25\% = \frac{25}{100} = 0.25$
```

**Resultado:**
- La fórmula aparece integrada en el texto con su explicación
- NO se duplica en modo fórmulas (no hay tag `<!-- formula-only -->`)

### ⚡ Regla de Oro

**Una fórmula debe aparecer UNA SOLA VEZ en el documento.**

Elige si va:
1. En `<!-- formula-only -->` para modo fórmulas (sin repetirla en el texto)
2. En el texto con explicación (sin tag formula-only)

Pero **NUNCA** ambas.

---

## 3. Estructura de Documento Estándar

```markdown
# Título del Tema

## Overview

Breve descripción del tema (2-3 líneas).

---

<!-- section: conceptos-clave, importance: essential, collapsible: true, defaultOpen: true -->
## Conceptos Clave

### Definiciones Fundamentales

<!-- formula-only -->
$$\text{Fórmula principal}$$
<!-- /formula-only -->

Explicación del concepto...

#### 🎓 Nota Pedagógica: [Subtítulo]

Explicación intuitiva, analogías, visualizaciones.

**¿Por qué es importante?**
- Razón 1
- Razón 2
<!-- /section -->

<!-- section: operaciones-basicas, importance: essential, collapsible: true, defaultOpen: true -->
## Operaciones Básicas

### Operación 1

<!-- formula-only -->
$$\text{Fórmula}$$
<!-- /formula-only -->

**Método 1**: Explicación
**Método 2**: Alternativa

**Ejemplos**:
- Ejemplo 1
- Ejemplo 2

#### ⚡ Atajos Mentales

Tips rápidos para cálculos mentales.
<!-- /section -->

<!-- section: ejemplos-paes, importance: essential, collapsible: true, defaultOpen: false -->
## Ejemplos Tipo PAES

### Ejemplo 1: [Título]

**Pregunta**: ...

**Opciones**:
- A) ...
- B) ...

**Solución**:
$$\text{Paso a paso}$$

**Respuesta**: B)

#### 🎯 Análisis de Distractores (opcional)

Por qué las otras opciones están mal.
<!-- /section -->

<!-- section: errores-comunes, importance: important, collapsible: true, defaultOpen: false -->
## Errores Comunes

### ❌ Error 1: [Título]

**Error**: Descripción
**Correcto**: Solución

**¿Por qué ocurre?** Explicación psicológica/conceptual.
<!-- /section -->

<!-- section: aplicaciones-practicas, importance: important, collapsible: true, defaultOpen: false -->
## Aplicaciones Prácticas

### 💰 [Área de Aplicación]

Explicación + ejemplo concreto con números reales.
<!-- /section -->

<!-- section: skills-relacionados, importance: advanced, collapsible: true, defaultOpen: false -->
## Skills Relacionados

- `skill-id`: Descripción

**Competencias**:
- ✓ Competencia 1
- ✓ Competencia 2

**Conexiones con otros temas**:
- Tema relacionado 1
- Tema relacionado 2
<!-- /section -->

<!-- section: recursos-adicionales, importance: advanced, collapsible: true, defaultOpen: false -->
## Recursos Adicionales

### Práctica
- [Enlaces]

### Prerequisitos
- Lista de temas previos

### Temas Relacionados
- ← [Anterior]
- [Siguiente →]
<!-- /section -->

---

## Referencias

- Metadata del documento
```

---

## 4. Elementos Especiales

### Notas Pedagógicas

Usa cuando necesites explicar la intuición o el "por qué" detrás de un concepto.

```markdown
#### 🎓 Nota Pedagógica: Título

Explicación intuitiva con analogías del mundo real.
```

### Estrategias Rápidas

Para tips y atajos de cálculo.

```markdown
#### ⚡ Estrategia Rápida: Título

**Método 1**: ...
**Método 2**: ...
```

### Aplicaciones del Mundo Real

```markdown
#### 🌍 Aplicaciones Prácticas

**Situación 1**: Contexto real
$$\text{Cálculo}$$
```

### Análisis de Errores

```markdown
### ❌ Error 1: Título

**Error**: Qué está mal
**Correcto**: Cómo hacerlo bien
**¿Por qué ocurre?** Explicación profunda
```

### Análisis de Distractores PAES

```markdown
#### 🎯 Análisis de Distractores

**¿Por qué las otras opciones están mal?**

- **Opción A**: Explicación del error
- **Opción C**: Explicación del error
```

---

## 5. Convenciones de Texto

### Énfasis

- **Negrita**: Términos importantes, palabras clave
- *Cursiva*: Énfasis suave (usar raramente)
- `Código`: Variables matemáticas en texto inline (opcional)

### Íconos Estándar

- 🎓 Notas pedagógicas
- ⚡ Estrategias rápidas / atajos
- 🌍 Aplicaciones prácticas
- 🎯 Análisis de distractores / tips PAES
- 🔍 Análisis profundo
- 🔬 Explicaciones científicas/matemáticas
- ⚠️ Advertencias / precauciones
- ❌ Errores / incorrectos
- ✓ o ✅ Correcto / completo
- 💰 Finanzas / dinero
- 🍽️ Comida / cocina
- 💳 Tarjetas / pagos
- 📊 Estadísticas / datos
- 🏪 Compras / comercio
- 📈 Crecimiento / inversiones
- 🎓 Educación / calificaciones

### Símbolos Matemáticos

- Usa LaTeX para matemáticas: `$x^2$` o `$$x^2$$`
- Para conjuntos numéricos: `$\mathbb{N}, \mathbb{Z}, \mathbb{Q}, \mathbb{R}$`
- Para fracciones: `$\frac{a}{b}$`
- Para porcentajes en texto: escribe `25\%` (escapa el %)

---

## 6. Ejemplos PAES

### Estructura Estándar

```markdown
<!-- section: ejemplo-N-paes, importance: essential, collapsible: true, defaultOpen: false -->
### Ejemplo N: [Categoría]

**Pregunta**: [Enunciado completo]

**Opciones**:
- A) Opción 1
- B) Opción 2
- C) Opción 3
- D) Opción 4

**Solución**:
Paso 1: ...
$$\text{Cálculo}$$

Paso 2: ...
$$\text{Cálculo}$$

**Respuesta**: B) [Valor]

#### 🎯 Análisis de Distractores (opcional para ejemplos complejos)

**¿Por qué las otras opciones están mal?**

- **Opción A**: Explicación del error conceptual
- **Opción C**: Explicación del error de cálculo
- **Opción D**: Explicación del error común
<!-- /section -->
```

### Cuándo Incluir Análisis de Distractores

- Cuando el error es conceptual (no solo aritmético)
- Cuando hay una trampa común de la PAES
- Cuando ayuda a evitar errores frecuentes
- NO en ejemplos triviales

---

## 7. Errores Comunes a Evitar

### ❌ NO Hacer

1. **Repetir fórmulas**
   ```markdown
   <!-- formula-only -->
   $$x = y$$
   <!-- /formula-only -->

   La fórmula es:
   $$x = y$$  <!-- DUPLICADO! -->
   ```

2. **Secciones sin wrapper cuando corresponde**
   ```markdown
   ## Ejemplos PAES  <!-- Falta el wrapper -->

   ### Ejemplo 1
   ...
   ```

3. **Mezclar niveles de heading incorrectamente**
   ```markdown
   ## Nivel 2
   #### Nivel 4  <!-- Saltaste el nivel 3! -->
   ```

4. **Usar importance incorrecta**
   ```markdown
   <!-- section: recursos-adicionales, importance: essential -->
   <!-- Los recursos NO son essential -->
   ```

5. **Olvidar cerrar secciones**
   ```markdown
   <!-- section: ... -->
   Contenido
   <!-- Falta /section -->
   ```

### ✅ Hacer

1. Una fórmula, un lugar
2. Todo contenido importante en section wrappers
3. Jerarquía de headings correcta (H2 → H3 → H4)
4. Importance según relevancia real
5. Siempre cerrar las secciones

---

## 8. Testing del Documento

Antes de commit, verifica:

- [ ] Todas las secciones tienen opening y closing tags
- [ ] Las fórmulas no están duplicadas
- [ ] Los niveles de importance son apropiados
- [ ] Los headings siguen jerarquía correcta
- [ ] Los ejemplos PAES tienen estructura completa
- [ ] Hay al menos una nota pedagógica
- [ ] Los íconos son consistentes
- [ ] El documento renderiza correctamente en los 3 modos:
  - Full: Todo el contenido
  - Summary: Solo essential + important
  - Formulas: Solo fórmulas en formula-only tags

---

## 9. Plantilla Rápida

```markdown
# Título

## Overview
Descripción breve.

---

<!-- section: conceptos, importance: essential, collapsible: true, defaultOpen: true -->
## Conceptos Clave

<!-- formula-only -->
$$\text{Fórmula principal}$$
<!-- /formula-only -->

Contenido...

#### 🎓 Nota Pedagógica: Visualización

Explicación intuitiva...
<!-- /section -->

<!-- section: operaciones, importance: essential, collapsible: true, defaultOpen: true -->
## Operaciones

### Operación 1

Método y ejemplos sin repetir fórmula...
<!-- /section -->

<!-- section: ejemplos-paes, importance: essential, collapsible: true, defaultOpen: false -->
## Ejemplos Tipo PAES

### Ejemplo 1

Pregunta, opciones, solución, respuesta.
<!-- /section -->

<!-- section: errores, importance: important, collapsible: true, defaultOpen: false -->
## Errores Comunes

### ❌ Error 1

Descripción, corrección, explicación.
<!-- /section -->

<!-- section: aplicaciones, importance: important, collapsible: true, defaultOpen: false -->
## Aplicaciones Prácticas

### 💰 Área

Contexto real + ejemplo.
<!-- /section -->

<!-- section: skills, importance: advanced, collapsible: true, defaultOpen: false -->
## Skills Relacionados

Lista de skills y competencias.
<!-- /section -->

<!-- section: recursos, importance: advanced, collapsible: true, defaultOpen: false -->
## Recursos Adicionales

Links, prerequisitos, temas relacionados.
<!-- /section -->

---

## Referencias

Metadata.
```

---

## 10. Migración de Documentos Existentes

Si un documento no sigue estas reglas:

1. Identifica fórmulas duplicadas
2. Decide: ¿va en `formula-only` o en texto?
3. Elimina la duplicada
4. Agrega section wrappers faltantes
5. Ajusta importance según contenido
6. Verifica jerarquía de headings
7. Agrega notas pedagógicas si faltan
8. Test en los 3 modos de lectura

---

## Contacto y Actualizaciones

Este documento es la referencia oficial para formato de curriculum.

Si necesitas agregar nuevas convenciones, actualiza esta guía primero antes de implementarlas en los documentos.
