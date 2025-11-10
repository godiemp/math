# 🚀 Quick Start: Abstract Problems Generation

Sistema para generar ~1000 problemas abstractos organizados por unidades temáticas PAES M1 y M2.

## ⚡ Inicio Rápido

### 1. Configurar OpenAI API Key

```bash
# En backend/.env
OPENAI_API_KEY=sk-your-key-here
```

### 2. Ver la taxonomía de unidades (sin generar nada)

```bash
cd backend
npm run helpers:abstract-problems taxonomy
```

Esto muestra:
- **46 unidades temáticas totales**
- **33 unidades M1** (matemática básica)
- **13 unidades M2** (matemática avanzada)
- Organizadas por: Números, Álgebra, Geometría, Probabilidad

### 3. Test: Dry Run (sin generar problemas reales)

```bash
npm run seed:abstract-problems -- --dry-run
```

Esto muestra:
- Qué problemas se generarían
- Cuántos problemas por unidad
- Distribución por dificultad
- **NO hace llamadas a OpenAI**
- **NO guarda nada en la base de datos**

### 4. Test: Generar solo 3 unidades (prueba pequeña)

```bash
npm run seed:abstract-problems -- --limit=3
```

Genera ~45 problemas (15 por unidad) como prueba.

### 5. Generar todos los problemas (~1000)

```bash
npm run seed:abstract-problems
```

⏱️ **Tiempo estimado**: 15-30 minutos (depende de la API de OpenAI)

Genera:
- **~810 problemas** distribuidos en 46 unidades temáticas
- **8 unidades clave** con 30 problemas cada una
- **38 unidades estándar** con 15 problemas cada una

### 6. Ver estadísticas

```bash
npm run helpers:abstract-problems stats
```

Muestra:
- Total de problemas generados
- Distribución por nivel (M1/M2)
- Distribución por materia
- Distribución por dificultad
- Top 10 unidades con más problemas

### 7. Ver ejemplos de problemas

```bash
npm run helpers:abstract-problems samples 10
```

Muestra 10 problemas aleatorios con toda su información.

### 8. Verificar cobertura

```bash
npm run helpers:abstract-problems coverage
```

Muestra qué unidades tienen problemas y cuáles no.

### 9. Activar todos los problemas

```bash
# Cambiar status de 'draft' a 'active'
npm run helpers:abstract-problems activate
```

## 📊 Distribución de Problemas

### Por Nivel
- **M1**: ~660 problemas (33 unidades)
- **M2**: ~195 problemas (13 unidades)

### Por Materia
- **Números**: ~300 problemas
- **Álgebra**: ~405 problemas
- **Geometría**: ~180 problemas
- **Probabilidad**: ~180 problemas

### Por Dificultad (por unidad estándar de 15 problemas)
- **Easy**: 6 problemas (40%)
  - 3 understand
  - 3 apply
- **Medium**: 6 problemas (40%)
  - 3 apply
  - 3 analyze
- **Hard**: 3 problemas (20%)
  - 2 analyze
  - 1 evaluate

### Unidades Clave (30 problemas cada una)

8 unidades fundamentales tienen distribución extendida:

1. **M1-NUM-001**: Operaciones y orden en números enteros
2. **M1-NUM-002**: Operaciones y comparación en racionales
3. **M1-NUM-005**: Problemas de porcentajes
4. **M1-ALG-006**: Ecuaciones e inecuaciones lineales
5. **M1-ALG-011**: Ecuaciones de segundo grado
6. **M1-GEO-002**: Áreas y perímetros
7. **M1-PROB-002**: Medidas de tendencia central
8. **M1-PROB-004**: Probabilidad de eventos

## 🎯 Ejemplos de Uso

### Generar solo problemas de M1

```bash
npm run seed:abstract-problems -- --level=M1
```

### Generar solo problemas de Números

```bash
npm run seed:abstract-problems -- --subject=números
```

### Generar solo Álgebra M1 (primeras 5 unidades)

```bash
npm run seed:abstract-problems -- --level=M1 --subject=álgebra --limit=5
```

### Exportar problemas a JSON

```bash
npm run helpers:abstract-problems export ./my-problems.json
```

## 📁 Archivos Creados

### Backend

```
backend/src/
├── config/
│   └── thematic-units.ts          # Taxonomía completa de 46 unidades
├── scripts/
│   ├── seed-abstract-problems.ts  # Script principal de generación
│   ├── helpers-abstract-problems.ts # Utilidades y helpers
│   └── README-ABSTRACT-PROBLEMS.md  # Documentación completa
└── types/
    └── abstractProblems.ts        # Ya existía (tipos)

backend/package.json                # Actualizado con nuevos scripts
```

### Root

```
QUICK-START-ABSTRACT-PROBLEMS.md   # Esta guía rápida
```

## 🔧 Scripts NPM Disponibles

```bash
# Generar problemas
npm run seed:abstract-problems               # Generar todos (~1000)
npm run seed:abstract-problems -- --dry-run  # Test sin generar
npm run seed:abstract-problems -- --limit=5  # Solo 5 unidades
npm run seed:abstract-problems -- --level=M1 # Solo M1
npm run seed:abstract-problems -- --subject=números # Solo Números

# Helpers y utilidades
npm run helpers:abstract-problems stats      # Estadísticas
npm run helpers:abstract-problems samples 10 # 10 ejemplos
npm run helpers:abstract-problems coverage   # Verificar cobertura
npm run helpers:abstract-problems activate   # Activar todos
npm run helpers:abstract-problems taxonomy   # Ver taxonomía
npm run helpers:abstract-problems export     # Exportar a JSON
npm run helpers:abstract-problems help       # Ver ayuda
```

## ⚠️ Notas Importantes

1. **OpenAI API Key**: Es requerida. El script fallará sin ella.
2. **Rate Limiting**: El script incluye delays de 1 segundo entre llamadas para evitar límites.
3. **Status inicial**: Todos los problemas se crean con status `draft`
4. **Revisión**: Se recomienda revisar los problemas antes de activarlos
5. **Tiempo**: La generación completa puede tomar 15-30 minutos

## 🎓 Próximos Pasos

1. ✅ **Configurar OPENAI_API_KEY** en `.env`
2. ✅ **Ejecutar dry-run** para ver el plan
3. ✅ **Generar primeras 3 unidades** como prueba
4. ✅ **Revisar resultados** con `npm run helpers:abstract-problems stats`
5. ✅ **Generar todos los problemas** si la prueba es exitosa
6. ✅ **Revisar y activar** problemas seleccionados
7. 🔜 **Generar context problems** a partir de los abstract problems

## 📚 Documentación Completa

Para documentación detallada, ver:
- `backend/src/scripts/README-ABSTRACT-PROBLEMS.md`

## 🐛 Troubleshooting

### "OPENAI_API_KEY not set"
→ Agregar la key en `backend/.env`

### "Rate limit exceeded"
→ El script ya incluye delays. Si persiste, usar `--limit` para lotes pequeños.

### Ver problemas en la base de datos
```sql
-- Total
SELECT COUNT(*) FROM abstract_problems;

-- Por materia
SELECT subject, COUNT(*) FROM abstract_problems GROUP BY subject;

-- Ver primeros 5
SELECT essence, unit, difficulty FROM abstract_problems LIMIT 5;
```

---

**¡Listo para generar 1000 problemas abstractos!** 🚀
