import * as fs from 'fs';
import * as path from 'path';

// Import all M2 question arrays
import { m2Num001Questions } from './lib/questions/m2/numeros/m2-num-001';
import { m2Num002Questions } from './lib/questions/m2/numeros/m2-num-002';
import { m2Num003Questions } from './lib/questions/m2/numeros/m2-num-003';
import { m2Num004Questions } from './lib/questions/m2/numeros/m2-num-004';
import { m2Num005Questions } from './lib/questions/m2/numeros/m2-num-005';
import { m2Num006Questions } from './lib/questions/m2/numeros/m2-num-006';
import { m2Alg001Questions } from './lib/questions/m2/algebra/m2-alg-001';
import { m2Alg002Questions } from './lib/questions/m2/algebra/m2-alg-002';
import { m2Alg003Questions } from './lib/questions/m2/algebra/m2-alg-003';
import { m2Geo001Questions } from './lib/questions/m2/geometria/m2-geo-001';
import { m2Geo002Questions } from './lib/questions/m2/geometria/m2-geo-002';
import { m2Geo003Questions } from './lib/questions/m2/geometria/m2-geo-003';
import { m2Prob001Questions } from './lib/questions/m2/probabilidad/m2-prob-001';
import { m2Prob002Questions } from './lib/questions/m2/probabilidad/m2-prob-002';
import { m2Prob003Questions } from './lib/questions/m2/probabilidad/m2-prob-003';
import { m2Prob004Questions } from './lib/questions/m2/probabilidad/m2-prob-004';

// Curriculum structure with expected skills per subsection
const curriculum = {
  'M2-NUM-001': {
    title: 'Operaciones en el conjunto de los números reales',
    subsections: {
      A: { title: 'Números irracionales y su representación', skills: ['numeros-reales-irracionales'] },
      B: { title: 'Operaciones con números reales', skills: ['numeros-reales-operaciones'] },
      C: { title: 'Aproximaciones y redondeo', skills: ['numeros-reales-aproximaciones'] },
      D: { title: 'Intervalos y conjuntos en la recta real', skills: ['numeros-reales-intervalos'] }
    },
    questions: m2Num001Questions
  },
  'M2-NUM-002': {
    title: 'Problemas que involucren números reales en diversos contextos',
    subsections: {
      A: { title: 'Problemas con raíces y radicales', skills: ['numeros-reales-problemas-raices'] },
      B: { title: 'Problemas de medición con irracionales', skills: ['numeros-reales-problemas-medicion'] },
      C: { title: 'Problemas de aproximación y error', skills: ['numeros-reales-problemas-aproximacion'] },
      D: { title: 'Aplicaciones en ciencias y tecnología', skills: ['numeros-reales-problemas-ciencias'] }
    },
    questions: m2Num002Questions
  },
  'M2-NUM-003': {
    title: 'Problemas aplicados a finanzas: AFP, jubilación, créditos',
    subsections: {
      A: { title: 'Sistemas de AFP y ahorro previsional', skills: ['finanzas-afp'] },
      B: { title: 'Cálculo de jubilación y pensiones', skills: ['finanzas-jubilacion'] },
      C: { title: 'Créditos y sistemas de amortización', skills: ['finanzas-creditos'] },
      D: { title: 'Interés compuesto', skills: ['finanzas-interes-compuesto'] }
    },
    questions: m2Num003Questions
  },
  'M2-NUM-004': {
    title: 'Relación entre potencias, raíces y logaritmos',
    subsections: {
      A: { title: 'Definición de logaritmo', skills: ['logaritmos-definicion'] },
      B: { title: 'Relación entre exponenciación y logaritmo', skills: ['logaritmos-relacion-potencias'] },
      C: { title: 'Logaritmos decimales y naturales', skills: ['logaritmos-tipos', 'logaritmos-decimales'] },
      D: { title: 'Cambio de base', skills: ['logaritmos-cambio-base'] }
    },
    questions: m2Num004Questions
  },
  'M2-NUM-005': {
    title: 'Propiedades de los logaritmos',
    subsections: {
      A: { title: 'Propiedad del producto', skills: ['logaritmos-propiedad-producto'] },
      B: { title: 'Propiedad del cociente', skills: ['logaritmos-propiedad-cociente'] },
      C: { title: 'Propiedad de la potencia', skills: ['logaritmos-propiedad-potencia'] },
      D: { title: 'Simplificación de expresiones logarítmicas', skills: ['logaritmos-simplificacion'] }
    },
    questions: m2Num005Questions
  },
  'M2-NUM-006': {
    title: 'Problemas con logaritmos en distintos contextos',
    subsections: {
      A: { title: 'Ecuaciones logarítmicas', skills: ['logaritmos-ecuaciones'] },
      B: { title: 'Ecuaciones exponenciales', skills: ['logaritmos-ecuaciones-exponenciales'] },
      C: { title: 'Aplicaciones en ciencias naturales', skills: ['logaritmos-problemas-ciencias'] },
      D: { title: 'Escalas logarítmicas (pH, Richter, decibeles)', skills: ['logaritmos-problemas-escalas'] }
    },
    questions: m2Num006Questions
  },
  'M2-ALG-001': {
    title: 'Análisis de sistemas con única solución, infinitas soluciones o sin solución',
    subsections: {
      A: { title: 'Sistemas con solución única', skills: ['sistemas-solucion-unica'] },
      B: { title: 'Sistemas con infinitas soluciones', skills: ['sistemas-infinitas-soluciones'] },
      C: { title: 'Sistemas sin solución', skills: ['sistemas-sin-solucion'] },
      D: { title: 'Interpretación geométrica de sistemas', skills: ['sistemas-interpretacion-geometrica'] }
    },
    questions: m2Alg001Questions
  },
  'M2-ALG-002': {
    title: 'Función potencia: representación gráfica',
    subsections: {
      A: { title: 'Funciones potencia con exponente entero', skills: ['funcion-potencia-exponente-entero'] },
      B: { title: 'Funciones potencia con exponente fraccionario', skills: ['funcion-potencia-exponente-fraccionario'] },
      C: { title: 'Gráficos de funciones potencia', skills: ['funcion-potencia-graficos'] },
      D: { title: 'Análisis de dominio y recorrido', skills: ['funcion-potencia-dominio-recorrido'] }
    },
    questions: m2Alg002Questions
  },
  'M2-ALG-003': {
    title: 'Problemas que involucren la función potencia en distintos contextos',
    subsections: {
      A: { title: 'Modelamiento con funciones potencia', skills: ['funcion-potencia-modelamiento'] },
      B: { title: 'Problemas de variación', skills: ['funcion-potencia-problemas-variacion'] },
      C: { title: 'Aplicaciones en física y geometría', skills: ['funcion-potencia-problemas-fisica'] },
      D: { title: 'Interpretación de gráficos', skills: ['funcion-potencia-problemas-interpretacion'] }
    },
    questions: m2Alg003Questions
  },
  'M2-GEO-001': {
    title: 'Problemas con homotecia en diversos contextos',
    subsections: {
      A: { title: 'Concepto de homotecia', skills: ['geometria-homotecia-concepto'] },
      B: { title: 'Razón de homotecia', skills: ['geometria-homotecia-razon'] },
      C: { title: 'Homotecia y semejanza', skills: ['geometria-homotecia-semejanza'] },
      D: { title: 'Aplicaciones de homotecia', skills: ['geometria-homotecia-aplicaciones'] }
    },
    questions: m2Geo001Questions
  },
  'M2-GEO-002': {
    title: 'Seno, coseno y tangente en triángulos rectángulos',
    subsections: {
      A: { title: 'Razones trigonométricas básicas', skills: ['trigonometria-razones-basicas'] },
      B: { title: 'Cálculo de seno, coseno y tangente', skills: ['trigonometria-calculo'] },
      C: { title: 'Ángulos notables (30°, 45°, 60°)', skills: ['trigonometria-angulos-notables'] },
      D: { title: 'Resolución de triángulos rectángulos', skills: ['trigonometria-resolucion-triangulos'] }
    },
    questions: m2Geo002Questions
  },
  'M2-GEO-003': {
    title: 'Aplicaciones de razones trigonométricas en problemas cotidianos',
    subsections: {
      A: { title: 'Problemas de altura y distancia', skills: ['trigonometria-problemas-altura-distancia'] },
      B: { title: 'Ángulos de elevación y depresión', skills: ['trigonometria-problemas-elevacion-depresion'] },
      C: { title: 'Aplicaciones en navegación', skills: ['trigonometria-problemas-navegacion'] },
      D: { title: 'Aplicaciones en arquitectura e ingeniería', skills: ['trigonometria-problemas-arquitectura'] }
    },
    questions: m2Geo003Questions
  },
  'M2-PROB-001': {
    title: 'Cálculo y comparación de medidas de dispersión',
    subsections: {
      A: { title: 'Varianza y desviación estándar', skills: ['estadistica-varianza-desviacion'] },
      B: { title: 'Coeficiente de variación', skills: ['estadistica-coeficiente-variacion'] },
      C: { title: 'Comparación de dispersión entre grupos', skills: ['estadistica-comparacion-dispersion'] },
      D: { title: 'Interpretación de medidas de dispersión', skills: ['estadistica-interpretacion-dispersion'] }
    },
    questions: m2Prob001Questions
  },
  'M2-PROB-002': {
    title: 'Aplicaciones y propiedades de la probabilidad condicional',
    subsections: {
      A: { title: 'Concepto de probabilidad condicional', skills: ['probabilidad-condicional-concepto'] },
      B: { title: 'Teorema de Bayes', skills: ['probabilidad-bayes'] },
      C: { title: 'Eventos independientes y dependientes', skills: ['probabilidad-eventos-dependientes'] },
      D: { title: 'Aplicaciones de probabilidad condicional', skills: ['probabilidad-condicional-aplicaciones'] }
    },
    questions: m2Prob002Questions
  },
  'M2-PROB-003': {
    title: 'Conceptos y resolución de problemas de conteo (permutación y combinatoria)',
    subsections: {
      A: { title: 'Principio multiplicativo', skills: ['combinatoria-principio-multiplicativo'] },
      B: { title: 'Permutaciones', skills: ['combinatoria-permutaciones'] },
      C: { title: 'Combinaciones', skills: ['combinatoria-combinaciones'] },
      D: { title: 'Problemas de conteo en probabilidad', skills: ['combinatoria-problemas-probabilidad'] }
    },
    questions: m2Prob003Questions
  },
  'M2-PROB-004': {
    title: 'Problemas que involucren el modelo binomial y otros modelos probabilísticos',
    subsections: {
      A: { title: 'Distribución binomial', skills: ['probabilidad-distribucion-binomial'] },
      B: { title: 'Cálculo de probabilidades binomiales', skills: ['probabilidad-calculo-binomial'] },
      C: { title: 'Otros modelos probabilísticos', skills: ['probabilidad-otros-modelos'] },
      D: { title: 'Aplicaciones de modelos probabilísticos', skills: ['probabilidad-modelos-aplicaciones'] }
    },
    questions: m2Prob004Questions
  }
};

function analyzeGaps() {
  const results: any = {};
  let totalUnits = 0;
  let totalSubsections = 0;
  let subsectionsWithQuestions = 0;
  let subsectionsMissing = 0;

  console.log('# M2 Curriculum Coverage Analysis\n');
  console.log('=' .repeat(80));

  for (const [unit_id, unit] of Object.entries(curriculum)) {
    totalUnits++;
    results[unit_id] = { title: unit.title, subsections: {}, totalQuestions: unit.questions.length };

    console.log(`\n## ${unit_id}: ${unit.title}`);
    console.log(`Total questions: ${unit.questions.length}\n`);

    for (const [subsection_id, subsection] of Object.entries(unit.subsections)) {
      totalSubsections++;
      const requiredSkills = subsection.skills;
      const questionsWithSkills = unit.questions.filter((q: any) =>
        q.skills && q.skills.some((skill: string) => requiredSkills.includes(skill))
      );

      const hasQuestions = questionsWithSkills.length > 0;
      if (hasQuestions) {
        subsectionsWithQuestions++;
      } else {
        subsectionsMissing++;
      }

      results[unit_id].subsections[subsection_id] = {
        title: subsection.title,
        expected_skills: requiredSkills,
        question_count: questionsWithSkills.length,
        has_questions: hasQuestions
      };

      const status = hasQuestions ? '✅' : '❌ MISSING';
      console.log(`  ${subsection_id}. ${subsection.title}`);
      console.log(`      Skills: ${requiredSkills.join(', ')}`);
      console.log(`      Questions: ${questionsWithSkills.length} ${status}`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n## SUMMARY\n');
  console.log(`Total Units: ${totalUnits}`);
  console.log(`Total Subsections: ${totalSubsections}`);
  console.log(`Subsections with Questions: ${subsectionsWithQuestions} (${((subsectionsWithQuestions/totalSubsections)*100).toFixed(1)}%)`);
  console.log(`Subsections MISSING: ${subsectionsMissing} (${((subsectionsMissing/totalSubsections)*100).toFixed(1)}%)`);

  console.log('\n## GAPS BY CATEGORY\n');

  const categories = {
    'Números': ['M2-NUM-001', 'M2-NUM-002', 'M2-NUM-003', 'M2-NUM-004', 'M2-NUM-005', 'M2-NUM-006'],
    'Álgebra': ['M2-ALG-001', 'M2-ALG-002', 'M2-ALG-003'],
    'Geometría': ['M2-GEO-001', 'M2-GEO-002', 'M2-GEO-003'],
    'Probabilidad': ['M2-PROB-001', 'M2-PROB-002', 'M2-PROB-003', 'M2-PROB-004']
  };

  for (const [category, unitIds] of Object.entries(categories)) {
    let missing = 0;
    let total = 0;
    const gaps: string[] = [];

    for (const unitId of unitIds) {
      const unit = results[unitId];
      for (const [subsecId, subsec] of Object.entries(unit.subsections) as any) {
        total++;
        if (!subsec.has_questions) {
          missing++;
          gaps.push(`  - ${unitId}-${subsecId}: ${subsec.title}`);
        }
      }
    }

    console.log(`\n### ${category}`);
    console.log(`Missing: ${missing}/${total} subsections`);
    if (gaps.length > 0) {
      console.log(gaps.join('\n'));
    }
  }
}

analyzeGaps();
