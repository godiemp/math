import { Question } from '../../../types';

/**
 * M1-PROB-006: Gráficos de dispersión y comprensión del azar
 * Chilean PAES Curriculum - Probability and Statistics Subsection 006
 *
 * This subsection covers:
 * - A: Gráficos de dispersión (nubes de puntos)
 * - B: Comparación de poblaciones
 * - C: Comprensión del azar y frecuencia relativa
 * - D: Ley de los grandes números
 *
 * Total: 40 questions (10 per subsection)
 */

export const m1Prob006Questions: Question[] = [
  // ============================================================================
  // SUBSECTION A: GRÁFICOS DE DISPERSIÓN (10 questions)
  // ============================================================================
  {
    id: 'm1-prob-006-a-001',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un profesor registra las horas de estudio y las notas de sus estudiantes. Al graficar estos datos en un plano cartesiano, observa que a mayor cantidad de horas, las notas tienden a ser más altas. ¿Qué tipo de relación muestra este gráfico de dispersión?}',
    options: ['Correlación positiva', 'Correlación negativa', 'Sin correlación', 'Correlación perfecta'],
    correctAnswer: 0,
    explanation: '\\text{Cuando una variable aumenta y la otra también tiende a aumentar, existe correlación positiva.}',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['estadistica-graficos-dispersion', 'estadistica-comparar-poblaciones'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'scatter',
        points: [
          { x: 1, y: 3.5 },
          { x: 2, y: 4.2 },
          { x: 3, y: 4.8 },
          { x: 2.5, y: 4.5 },
          { x: 4, y: 5.5 },
          { x: 5, y: 6.0 },
          { x: 3.5, y: 5.0 },
          { x: 4.5, y: 5.8 }
        ],
        xLabel: 'Horas de estudio',
        yLabel: 'Nota',
        showTrendLine: true
      }
    }
  },
  {
    id: 'm1-prob-006-a-002',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En un estudio sobre el uso de celulares, se graficaron los datos de edad versus horas diarias de uso. Se observó que a mayor edad, menor tiempo de uso. ¿Qué tipo de correlación representa este patrón?}',
    options: ['Correlación positiva', 'Correlación negativa', 'Correlación nula', 'Correlación directa'],
    correctAnswer: 1,
    explanation: '\\text{Cuando una variable aumenta y la otra tiende a disminuir, existe correlación negativa.}',
    difficulty: 'easy',
    difficultyScore: 0.25,
    skills: ['estadistica-graficos-dispersion'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'scatter',
        points: [
          { x: 18, y: 6.5 },
          { x: 25, y: 5.8 },
          { x: 35, y: 4.2 },
          { x: 45, y: 3.5 },
          { x: 55, y: 2.8 },
          { x: 65, y: 1.5 },
          { x: 30, y: 5.0 },
          { x: 50, y: 3.0 }
        ],
        xLabel: 'Edad (años)',
        yLabel: 'Horas de uso diario',
        showTrendLine: true
      }
    }
  },
  {
    id: 'm1-prob-006-a-003',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Se registraron los siguientes pares ordenados (altura en cm, peso en kg) de 5 estudiantes: (150, 45), (160, 52), (155, 48), (170, 65), (165, 58). ¿Cuál es la altura del estudiante que pesa 52 kg?}',
    options: ['150 cm', '155 cm', '160 cm', '165 cm'],
    correctAnswer: 2,
    explanation: '\\text{Del par ordenado (160, 52), la altura es 160 cm y el peso es 52 kg.}',
    difficulty: 'easy',
    difficultyScore: 0.20,
    skills: ['estadistica-graficos-dispersion', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'scatter',
        points: [
          { x: 150, y: 45, label: '45' },
          { x: 160, y: 52, label: '52' },
          { x: 155, y: 48, label: '48' },
          { x: 170, y: 65, label: '65' },
          { x: 165, y: 58, label: '58' }
        ],
        xLabel: 'Altura (cm)',
        yLabel: 'Peso (kg)'
      }
    }
  },
  {
    id: 'm1-prob-006-a-004',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un gráfico de dispersión muestra la relación entre temperatura y ventas de helados. Si los puntos forman una nube que sube de izquierda a derecha, ¿qué se puede concluir?}',
    options: ['A mayor temperatura, menores ventas', 'A mayor temperatura, mayores ventas', 'La temperatura no afecta las ventas', 'Las ventas determinan la temperatura'],
    correctAnswer: 1,
    explanation: '\\text{Una nube que sube de izquierda a derecha indica correlación positiva: a mayor temperatura, mayores ventas.}',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['estadistica-graficos-dispersion', 'estadistica-interpretacion-graficos'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'scatter',
        points: [
          { x: 15, y: 20 },
          { x: 18, y: 35 },
          { x: 22, y: 50 },
          { x: 25, y: 65 },
          { x: 28, y: 80 },
          { x: 30, y: 95 },
          { x: 20, y: 40 },
          { x: 26, y: 70 }
        ],
        xLabel: 'Temperatura (°C)',
        yLabel: 'Ventas de helados',
        showTrendLine: true
      }
    }
  },
  {
    id: 'm1-prob-006-a-005',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En un gráfico de dispersión, el eje X representa las horas de sueño y el eje Y representa errores en una prueba. Si los puntos bajan de izquierda a derecha, ¿qué indica esto?}',
    options: ['Más sueño causa más errores', 'Más sueño está asociado a menos errores', 'El sueño no afecta los errores', 'Los errores causan falta de sueño'],
    correctAnswer: 1,
    explanation: '\\text{Una tendencia descendente indica correlación negativa: más horas de sueño se asocian con menos errores.}',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['estadistica-graficos-dispersion', 'estadistica-interpretacion-graficos'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'scatter',
        points: [
          { x: 4, y: 12 },
          { x: 5, y: 10 },
          { x: 6, y: 7 },
          { x: 7, y: 5 },
          { x: 8, y: 3 },
          { x: 5.5, y: 9 },
          { x: 7.5, y: 4 },
          { x: 6.5, y: 6 }
        ],
        xLabel: 'Horas de sueño',
        yLabel: 'Errores en prueba',
        showTrendLine: true
      }
    }
  },
  {
    id: 'm1-prob-006-a-006',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Se tiene la siguiente tabla de datos: Distancia (km): 10, 20, 30, 40. Tiempo (min): 15, 28, 45, 60. ¿Cuántos puntos se graficarían en un diagrama de dispersión con estos datos?}',
    options: ['2 puntos', '4 puntos', '8 puntos', '16 puntos'],
    correctAnswer: 1,
    explanation: '\\text{Cada par (distancia, tiempo) forma un punto. Hay 4 pares: (10,15), (20,28), (30,45), (40,60).}',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['estadistica-graficos-dispersion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-006-a-007',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un investigador grafica la relación entre el número de zapato y el coeficiente intelectual de 100 personas. Los puntos aparecen dispersos sin ningún patrón claro. ¿Qué tipo de correlación existe?}',
    options: ['Correlación positiva fuerte', 'Correlación negativa fuerte', 'Correlación nula o inexistente', 'Correlación perfecta'],
    correctAnswer: 2,
    explanation: '\\text{Cuando los puntos no muestran ningún patrón, no hay correlación entre las variables.}',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['estadistica-graficos-dispersion', 'estadistica-interpretacion-graficos'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'scatter',
        points: [
          { x: 38, y: 95 },
          { x: 42, y: 110 },
          { x: 40, y: 85 },
          { x: 44, y: 100 },
          { x: 39, y: 120 },
          { x: 43, y: 90 },
          { x: 41, y: 115 },
          { x: 37, y: 105 },
          { x: 45, y: 98 },
          { x: 40, y: 108 }
        ],
        xLabel: 'Número de zapato',
        yLabel: 'Coeficiente intelectual'
      }
    }
  },
  {
    id: 'm1-prob-006-a-008',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En un gráfico de dispersión sobre ingresos y gastos mensuales, un punto está ubicado en (2500, 1800). ¿Qué representa este punto?}',
    options: ['Una persona con $1800 de ingreso y $2500 de gasto', 'Una persona con $2500 de ingreso y $1800 de gasto', 'El promedio de ingresos es $2500', 'El promedio de gastos es $1800'],
    correctAnswer: 1,
    explanation: '\\text{El punto (2500, 1800) indica ingreso de $2500 (eje X) y gasto de $1800 (eje Y).}',
    difficulty: 'medium',
    difficultyScore: 0.32,
    skills: ['estadistica-graficos-dispersion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-006-a-009',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Se estudia la relación entre horas de ejercicio semanal y presión arterial. El gráfico muestra una tendencia descendente clara. ¿Cuál es la interpretación correcta?}',
    options: ['El ejercicio aumenta la presión arterial', 'No hay relación entre ejercicio y presión', 'Mayor ejercicio se asocia con menor presión arterial', 'La presión arterial causa que se haga ejercicio'],
    correctAnswer: 2,
    explanation: '\\text{Una tendencia descendente indica correlación negativa: más ejercicio se asocia con menor presión arterial.}',
    difficulty: 'medium',
    difficultyScore: 0.40,
    skills: ['estadistica-graficos-dispersion', 'estadistica-interpretacion-graficos'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'scatter',
        points: [
          { x: 0, y: 145 },
          { x: 2, y: 138 },
          { x: 4, y: 130 },
          { x: 6, y: 125 },
          { x: 8, y: 118 },
          { x: 3, y: 135 },
          { x: 5, y: 128 },
          { x: 7, y: 122 }
        ],
        xLabel: 'Horas ejercicio semanal',
        yLabel: 'Presión arterial',
        showTrendLine: true
      }
    }
  },
  {
    id: 'm1-prob-006-a-010',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Los puntos de un diagrama de dispersión forman casi una línea recta ascendente. ¿Qué indica esto sobre la relación entre las variables?}',
    options: ['Correlación positiva débil', 'Correlación negativa fuerte', 'Correlación positiva fuerte', 'No hay correlación'],
    correctAnswer: 2,
    explanation: '\\text{Cuando los puntos se alinean casi en línea recta ascendente, hay una correlación positiva fuerte.}',
    difficulty: 'hard',
    difficultyScore: 0.58,
    skills: ['estadistica-graficos-dispersion', 'estadistica-interpretacion-graficos'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'scatter',
        points: [
          { x: 1, y: 10 },
          { x: 2, y: 19 },
          { x: 3, y: 31 },
          { x: 4, y: 39 },
          { x: 5, y: 51 },
          { x: 6, y: 58 },
          { x: 7, y: 72 },
          { x: 8, y: 79 }
        ],
        xLabel: 'Variable X',
        yLabel: 'Variable Y',
        showTrendLine: true
      }
    }
  },

  // ============================================================================
  // SUBSECTION B: COMPARACIÓN DE POBLACIONES (10 questions)
  // ============================================================================
  {
    id: 'm1-prob-006-b-001',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Se comparan las notas de dos cursos. El curso A tiene promedio 5.2 y el curso B tiene promedio 5.8. ¿Qué se puede afirmar?}',
    options: ['El curso A tiene mejor rendimiento', 'El curso B tiene mejor rendimiento promedio', 'Ambos cursos tienen igual rendimiento', 'No se pueden comparar'],
    correctAnswer: 1,
    explanation: '\\text{El curso B tiene mayor promedio (5.8 > 5.2), por lo que tiene mejor rendimiento promedio.}',
    difficulty: 'easy',
    difficultyScore: 0.20,
    skills: ['estadistica-comparar-poblaciones', 'estadistica-media']
  },
  {
    id: 'm1-prob-006-b-002',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En un gráfico de dispersión se muestran con color azul los datos de la Escuela A y con rojo los de la Escuela B. Los puntos azules están más arriba que los rojos. ¿Qué indica esto?}',
    options: ['La Escuela A tiene valores más bajos', 'La Escuela B tiene valores más altos', 'La Escuela A tiene valores más altos', 'Ambas escuelas son iguales'],
    correctAnswer: 2,
    explanation: '\\text{Si los puntos azules (Escuela A) están más arriba, la variable del eje Y tiene valores más altos en esa escuela.}',
    difficulty: 'easy',
    difficultyScore: 0.25,
    skills: ['estadistica-comparar-poblaciones', 'estadistica-graficos-dispersion'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'scatter',
        series: [
          {
            name: 'Escuela A',
            color: '#3B82F6',
            points: [
              { x: 2, y: 75 },
              { x: 3, y: 82 },
              { x: 4, y: 88 },
              { x: 5, y: 92 },
              { x: 3.5, y: 85 }
            ]
          },
          {
            name: 'Escuela B',
            color: '#EF4444',
            points: [
              { x: 2, y: 55 },
              { x: 3, y: 62 },
              { x: 4, y: 68 },
              { x: 5, y: 72 },
              { x: 3.5, y: 65 }
            ]
          }
        ],
        xLabel: 'Horas de estudio',
        yLabel: 'Puntaje',
        showLegend: true
      }
    }
  },
  {
    id: 'm1-prob-006-b-003',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Se comparan los tiempos de traslado al trabajo de dos comunas. La comuna X tiene mediana de 35 minutos y la comuna Y tiene mediana de 45 minutos. ¿Cuál comuna tiene tiempos de traslado más cortos típicamente?}',
    options: ['Comuna X', 'Comuna Y', 'Son iguales', 'No se puede determinar'],
    correctAnswer: 0,
    explanation: '\\text{La comuna X tiene mediana menor (35 < 45), indicando tiempos de traslado típicamente más cortos.}',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['estadistica-comparar-poblaciones', 'estadistica-mediana']
  },
  {
    id: 'm1-prob-006-b-004',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Dos grupos de atletas fueron evaluados. El Grupo 1 tiene rango de tiempos de 8 segundos y el Grupo 2 tiene rango de 15 segundos. ¿Cuál grupo muestra mayor variabilidad en sus tiempos?}',
    options: ['Grupo 1', 'Grupo 2', 'Ambos tienen igual variabilidad', 'No se puede comparar'],
    correctAnswer: 1,
    explanation: '\\text{El Grupo 2 tiene mayor rango (15 > 8), lo que indica mayor variabilidad en los tiempos.}',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['estadistica-comparar-poblaciones', 'estadistica-rango']
  },
  {
    id: 'm1-prob-006-b-005',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Se grafican datos de altura vs peso de hombres (azul) y mujeres (rojo) en el mismo diagrama. Si ambas nubes de puntos muestran tendencia ascendente, ¿qué se puede concluir?}',
    options: ['Solo los hombres muestran correlación positiva', 'Solo las mujeres muestran correlación positiva', 'Ambos grupos muestran correlación positiva entre altura y peso', 'No hay correlación en ningún grupo'],
    correctAnswer: 2,
    explanation: '\\text{Si ambas nubes ascienden, tanto hombres como mujeres muestran correlación positiva entre altura y peso.}',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['estadistica-comparar-poblaciones', 'estadistica-graficos-dispersion']
  },
  {
    id: 'm1-prob-006-b-006',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{La Empresa A tiene empleados con salarios: 500, 600, 700. La Empresa B tiene: 400, 650, 950. ¿Cuál empresa tiene mayor rango salarial?}',
    options: ['Empresa A (rango = 200)', 'Empresa B (rango = 550)', 'Tienen igual rango', 'No se puede calcular'],
    correctAnswer: 1,
    explanation: '\\text{Rango A} = 700 - 500 = 200. \\text{ Rango B} = 950 - 400 = 550. \\text{ La Empresa B tiene mayor rango.}',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['estadistica-comparar-poblaciones', 'estadistica-rango', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-prob-006-b-007',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En un diagrama de dispersión, los puntos de la Ciudad A están concentrados cerca del centro, mientras que los de la Ciudad B están muy dispersos. ¿Qué indica esto?}',
    options: ['Ciudad A tiene mayor variabilidad', 'Ciudad B tiene mayor variabilidad', 'Ambas ciudades tienen igual dispersión', 'La Ciudad A tiene más datos'],
    correctAnswer: 1,
    explanation: '\\text{Los puntos dispersos indican mayor variabilidad en los datos de la Ciudad B.}',
    difficulty: 'medium',
    difficultyScore: 0.40,
    skills: ['estadistica-comparar-poblaciones', 'estadistica-graficos-dispersion']
  },
  {
    id: 'm1-prob-006-b-008',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Se comparan dos clases con los mismos promedios de notas (5.5). Sin embargo, la Clase A tiene todos sus estudiantes entre 5.0 y 6.0, mientras que la Clase B tiene estudiantes entre 3.0 y 7.0. ¿Cuál clase es más homogénea?}',
    options: ['Clase A', 'Clase B', 'Son igualmente homogéneas', 'No se puede determinar'],
    correctAnswer: 0,
    explanation: '\\text{La Clase A tiene menor rango (1.0 vs 4.0), indicando mayor homogeneidad en las notas.}',
    difficulty: 'hard',
    difficultyScore: 0.55,
    skills: ['estadistica-comparar-poblaciones', 'estadistica-rango']
  },
  {
    id: 'm1-prob-006-b-009',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Al comparar dos regiones en un gráfico de dispersión con colores diferentes, se observa que una nube de puntos está desplazada hacia la derecha de la otra. ¿Qué significa esto?}',
    options: ['La región desplazada tiene valores menores en el eje X', 'La región desplazada tiene valores mayores en el eje X', 'Ambas regiones tienen los mismos valores en X', 'No hay diferencia entre las regiones'],
    correctAnswer: 1,
    explanation: '\\text{Una nube desplazada hacia la derecha indica valores mayores en la variable del eje X.}',
    difficulty: 'hard',
    difficultyScore: 0.58,
    skills: ['estadistica-comparar-poblaciones', 'estadistica-graficos-dispersion']
  },
  {
    id: 'm1-prob-006-b-010',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Dos equipos de fútbol tienen el mismo promedio de goles por partido (2.0). El Equipo A tiene moda 2 y el Equipo B tiene moda 0. ¿Cuál equipo es más consistente en marcar goles?}',
    options: ['Equipo A', 'Equipo B', 'Son igualmente consistentes', 'No se puede comparar'],
    correctAnswer: 0,
    explanation: '\\text{El Equipo A tiene moda 2 (valor más frecuente), indicando que regularmente marca 2 goles. El Equipo B frecuentemente no marca.}',
    difficulty: 'hard',
    difficultyScore: 0.62,
    skills: ['estadistica-comparar-poblaciones', 'estadistica-moda', 'estadistica-media']
  },

  // ============================================================================
  // SUBSECTION C: COMPRENSIÓN DEL AZAR Y FRECUENCIA RELATIVA (10 questions)
  // ============================================================================
  {
    id: 'm1-prob-006-c-001',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Al lanzar un dado justo 60 veces, el número 4 salió 12 veces. ¿Cuál es la frecuencia relativa del número 4 en este experimento?}',
    options: ['0.10', '0.15', '0.20', '0.25'],
    correctAnswer: 2,
    explanation: 'f_r = \\frac{12}{60} = \\frac{1}{5} = 0.20',
    difficulty: 'easy',
    difficultyScore: 0.22,
    skills: ['estadistica-frecuencia-relativa', 'probabilidad-azar', 'numeros-fracciones']
  },
  {
    id: 'm1-prob-006-c-002',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En un juego de lotería, cada número tiene la misma probabilidad de salir. ¿Qué característica describe este tipo de evento?}',
    options: ['Evento seguro', 'Evento imposible', 'Evento aleatorio', 'Evento determinista'],
    correctAnswer: 2,
    explanation: '\\text{Un evento donde no se puede predecir el resultado con certeza es un evento aleatorio.}',
    difficulty: 'easy',
    difficultyScore: 0.20,
    skills: ['probabilidad-azar']
  },
  {
    id: 'm1-prob-006-c-003',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una moneda se lanza 100 veces y cae cara 48 veces. ¿Cuál es la frecuencia relativa de obtener cara?}',
    options: ['0.48', '0.50', '0.52', '48'],
    correctAnswer: 0,
    explanation: 'f_r = \\frac{48}{100} = 0.48',
    difficulty: 'easy',
    difficultyScore: 0.25,
    skills: ['estadistica-frecuencia-relativa', 'probabilidad-azar', 'numeros-decimales']
  },
  {
    id: 'm1-prob-006-c-004',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Si la probabilidad teórica de sacar un 6 en un dado es 1/6 ≈ 0.167, ¿qué frecuencia relativa esperarías al lanzar el dado muchas veces?}',
    options: ['Exactamente 0.167 siempre', 'Cercana a 0.167', 'Siempre mayor que 0.167', 'Siempre menor que 0.167'],
    correctAnswer: 1,
    explanation: '\\text{Con muchas repeticiones, la frecuencia relativa tiende a acercarse a la probabilidad teórica.}',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['estadistica-frecuencia-relativa', 'probabilidad-azar']
  },
  {
    id: 'm1-prob-006-c-005',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{¿Por qué no podemos predecir con certeza el resultado de lanzar una moneda?}',
    options: ['Porque la moneda está defectuosa', 'Porque hay infinitos resultados posibles', 'Porque el resultado depende de factores aleatorios', 'Porque no conocemos las reglas'],
    correctAnswer: 2,
    explanation: '\\text{El lanzamiento de una moneda es un fenómeno aleatorio donde el resultado depende de factores impredecibles.}',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['probabilidad-azar']
  },
  {
    id: 'm1-prob-006-c-006',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En una urna hay 3 bolas rojas y 2 azules. Se extrae una bola 50 veces (con reposición) y sale roja 28 veces. ¿Cuál es la frecuencia relativa experimental del color rojo?}',
    options: ['0.40', '0.56', '0.60', '0.70'],
    correctAnswer: 1,
    explanation: 'f_r = \\frac{28}{50} = 0.56',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['estadistica-frecuencia-relativa', 'probabilidad-azar', 'numeros-fracciones']
  },
  {
    id: 'm1-prob-006-c-007',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una ruleta se gira 200 veces. El número 7 salió 25 veces. ¿Cuál es la frecuencia relativa del número 7?}',
    options: ['0.100', '0.125', '0.150', '0.200'],
    correctAnswer: 1,
    explanation: 'f_r = \\frac{25}{200} = \\frac{1}{8} = 0.125',
    difficulty: 'medium',
    difficultyScore: 0.40,
    skills: ['estadistica-frecuencia-relativa', 'numeros-fracciones', 'numeros-decimales']
  },
  {
    id: 'm1-prob-006-c-008',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Si después de lanzar una moneda 10 veces obtuviste 7 caras, ¿garantiza esto que la moneda está cargada?}',
    options: ['Sí, definitivamente está cargada', 'No, puede ser variación normal del azar', 'Sí, porque debería salir 5 caras exactas', 'No se puede saber nada'],
    correctAnswer: 1,
    explanation: '\\text{Con pocas repeticiones, la variación aleatoria es normal. Se necesitan muchos lanzamientos para conclusiones.}',
    difficulty: 'hard',
    difficultyScore: 0.55,
    skills: ['probabilidad-azar', 'estadistica-frecuencia-relativa']
  },
  {
    id: 'm1-prob-006-c-009',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{La probabilidad teórica de obtener un número par al lanzar un dado es 0.5. En 20 lanzamientos, salieron 8 números pares. ¿La frecuencia relativa experimental es mayor o menor que la teórica?}',
    options: ['Mayor (0.8 > 0.5)', 'Menor (0.4 < 0.5)', 'Igual (0.5 = 0.5)', 'No se puede comparar'],
    correctAnswer: 1,
    explanation: 'f_r = \\frac{8}{20} = 0.4 < 0.5 \\text{ (probabilidad teórica)}',
    difficulty: 'hard',
    difficultyScore: 0.58,
    skills: ['estadistica-frecuencia-relativa', 'probabilidad-azar', 'numeros-decimales']
  },
  {
    id: 'm1-prob-006-c-010',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{¿Cuál de los siguientes eventos NO es aleatorio?}',
    options: ['El resultado de lanzar un dado', 'El ganador de una rifa', 'El resultado de sumar 2 + 2', 'El clima de mañana'],
    correctAnswer: 2,
    explanation: '\\text{Sumar 2 + 2 siempre da 4, es un evento determinista, no aleatorio.}',
    difficulty: 'hard',
    difficultyScore: 0.60,
    skills: ['probabilidad-azar']
  },

  // ============================================================================
  // SUBSECTION D: LEY DE LOS GRANDES NÚMEROS (10 questions)
  // ============================================================================
  {
    id: 'm1-prob-006-d-001',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Al lanzar una moneda, la probabilidad de cara es 0.5. Si se lanza 1000 veces, ¿qué esperarías que ocurra con la frecuencia relativa de caras?}',
    options: ['Será exactamente 0.5', 'Estará muy cerca de 0.5', 'Será muy diferente de 0.5', 'No hay forma de predecir'],
    correctAnswer: 1,
    explanation: '\\text{Por la Ley de los Grandes Números, con muchas repeticiones la frecuencia relativa se aproxima a la probabilidad teórica.}',
    difficulty: 'easy',
    difficultyScore: 0.25,
    skills: ['probabilidad-ley-grandes-numeros', 'estadistica-frecuencia-relativa']
  },
  {
    id: 'm1-prob-006-d-002',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{¿Qué afirma la Ley de los Grandes Números sobre experimentos aleatorios repetidos?}',
    options: ['Cada resultado individual es predecible', 'La frecuencia relativa se estabiliza cerca de la probabilidad teórica', 'Los resultados se alternan regularmente', 'Siempre hay resultados extremos'],
    correctAnswer: 1,
    explanation: '\\text{La Ley de los Grandes Números indica que la frecuencia relativa converge a la probabilidad teórica con muchas repeticiones.}',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['probabilidad-ley-grandes-numeros']
  },
  {
    id: 'm1-prob-006-d-003',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Se lanza un dado justo múltiples veces. Con 10 lanzamientos, el 6 salió 3 veces (30%). Con 1000 lanzamientos, salió 168 veces (16.8%). ¿Cuál resultado está más cerca de la probabilidad teórica de 16.67%?}',
    options: ['10 lanzamientos (30%)', '1000 lanzamientos (16.8%)', 'Ambos están igual de cerca', 'Ninguno está cerca'],
    correctAnswer: 1,
    explanation: '\\text{Con 1000 lanzamientos, 16.8% está mucho más cerca de 16.67% que 30% con solo 10 lanzamientos.}',
    difficulty: 'medium',
    difficultyScore: 0.40,
    skills: ['probabilidad-ley-grandes-numeros', 'estadistica-frecuencia-relativa']
  },
  {
    id: 'm1-prob-006-d-004',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En la Tabla de Galton, las bolitas caen y se acumulan formando una curva. ¿Qué demuestra este experimento?}',
    options: ['Las bolitas caen siempre al centro', 'El azar produce patrones predecibles a largo plazo', 'Cada bolita sigue el mismo camino', 'No hay patrones en eventos aleatorios'],
    correctAnswer: 1,
    explanation: '\\text{La Tabla de Galton demuestra que eventos aleatorios individuales producen distribuciones predecibles con muchas repeticiones.}',
    difficulty: 'medium',
    difficultyScore: 0.45,
    skills: ['probabilidad-ley-grandes-numeros', 'probabilidad-azar']
  },
  {
    id: 'm1-prob-006-d-005',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Un casino sabe que en la ruleta, el rojo tiene probabilidad de 18/37. ¿Por qué el casino siempre gana a largo plazo aunque algunos jugadores ganen a corto plazo?}',
    options: ['El casino hace trampa', 'Por la Ley de los Grandes Números, la frecuencia se estabiliza en valores favorables al casino', 'Los jugadores no saben jugar', 'Es solo suerte del casino'],
    correctAnswer: 1,
    explanation: '\\text{Con muchas jugadas, la frecuencia relativa se acerca a la probabilidad teórica, que favorece ligeramente al casino.}',
    difficulty: 'medium',
    difficultyScore: 0.48,
    skills: ['probabilidad-ley-grandes-numeros', 'probabilidad-azar']
  },
  {
    id: 'm1-prob-006-d-006',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Si lanzas una moneda 10 veces y salen 10 caras seguidas, ¿cuál es la probabilidad de que el próximo lanzamiento sea cara?}',
    options: ['Muy baja, porque ya salieron muchas caras', 'Muy alta, porque hay una racha de caras', 'Sigue siendo 0.5', 'Es imposible saberlo'],
    correctAnswer: 2,
    explanation: '\\text{Cada lanzamiento es independiente. Los resultados anteriores no afectan la probabilidad del siguiente (falacia del jugador).}',
    difficulty: 'hard',
    difficultyScore: 0.58,
    skills: ['probabilidad-ley-grandes-numeros', 'probabilidad-azar']
  },
  {
    id: 'm1-prob-006-d-007',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Las frecuencias relativas de obtener cara al lanzar una moneda fueron: 10 lanzamientos: 0.70; 100 lanzamientos: 0.54; 1000 lanzamientos: 0.502. ¿Qué patrón observas?}',
    options: ['La frecuencia aumenta con más lanzamientos', 'La frecuencia disminuye con más lanzamientos', 'La frecuencia se acerca a 0.5 con más lanzamientos', 'No hay patrón'],
    correctAnswer: 2,
    explanation: '\\text{A medida que aumentan los lanzamientos, la frecuencia relativa se estabiliza cerca de 0.5 (probabilidad teórica).}',
    difficulty: 'hard',
    difficultyScore: 0.55,
    skills: ['probabilidad-ley-grandes-numeros', 'estadistica-frecuencia-relativa'],
    visualData: {
      type: 'graph',
      data: {
        chartType: 'line',
        items: [
          { label: '10', value: 70 },
          { label: '100', value: 54 },
          { label: '1000', value: 50.2 }
        ],
        showValues: true,
        showLabels: true
      }
    }
  },
  {
    id: 'm1-prob-006-d-008',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{Una compañía de seguros calcula que el 2% de sus clientes tendrán accidentes. ¿Por qué pueden predecir sus costos aunque no saben quién tendrá el accidente?}',
    options: ['Pueden predecir quién tendrá accidente', 'Con muchos clientes, aproximadamente el 2% tendrá accidentes', 'Los accidentes no son aleatorios', 'Es solo una estimación sin base'],
    correctAnswer: 1,
    explanation: '\\text{Por la Ley de los Grandes Números, con muchos clientes, la proporción real se acercará al 2% esperado.}',
    difficulty: 'hard',
    difficultyScore: 0.60,
    skills: ['probabilidad-ley-grandes-numeros', 'probabilidad-azar']
  },
  {
    id: 'm1-prob-006-d-009',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{En un experimento, se registró la frecuencia relativa de obtener un 3 al lanzar un dado después de n lanzamientos. Los valores fueron: n=50: 0.22, n=200: 0.18, n=500: 0.165, n=1000: 0.168. ¿A qué valor parece converger?}',
    options: ['0.20', '0.167 (1/6)', '0.15', '0.10'],
    correctAnswer: 1,
    explanation: '\\text{La frecuencia relativa converge a } \\frac{1}{6} \\approx 0.167 \\text{, la probabilidad teórica de obtener un 3.}',
    difficulty: 'extreme',
    difficultyScore: 0.72,
    skills: ['probabilidad-ley-grandes-numeros', 'estadistica-frecuencia-relativa']
  },
  {
    id: 'm1-prob-006-d-010',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    questionLatex: '\\text{¿Cuál de las siguientes afirmaciones sobre la Ley de los Grandes Números es FALSA?}',
    options: ['Requiere muchas repeticiones del experimento', 'Garantiza que cada resultado individual será el esperado', 'Explica por qué las frecuencias relativas se estabilizan', 'Se aplica a experimentos aleatorios'],
    correctAnswer: 1,
    explanation: '\\text{La ley NO garantiza resultados individuales. Solo asegura que el promedio de muchos resultados se acerca al valor esperado.}',
    difficulty: 'extreme',
    difficultyScore: 0.75,
    skills: ['probabilidad-ley-grandes-numeros', 'probabilidad-azar']
  }
];
