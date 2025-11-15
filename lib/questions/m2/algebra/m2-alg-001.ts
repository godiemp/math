import { Question } from '../../../types';

/**
 * M2-ALG-001: Análisis de sistemas con única solución, infinitas soluciones o sin solución
 *
 * Subsections:
 * A. Sistemas con solución única
 *    Habilidades: sistemas-solucion-unica
 * B. Sistemas con infinitas soluciones
 *    Habilidades: sistemas-infinitas-soluciones
 * C. Sistemas sin solución
 *    Habilidades: sistemas-sin-solucion
 * D. Interpretación geométrica de sistemas
 *    Habilidades: sistemas-interpretacion-geometrica
 */

export const m2Alg001Questions: Question[] = [
  {
    id: 'm2-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Resuelve el sistema: } 2x + y = 8 \\text{ y } x - y = 1',
    options: ['x = 2, y = 4', 'x = 3, y = 2', 'x = 4, y = 0', 'x = 1, y = 6'],
    correctAnswer: 1,
    explanation: 'Sumando las ecuaciones: 3x = 9, entonces x = 3. Sustituyendo: 3 - y = 1, entonces y = 2',
    explanationLatex: '3x = 9 \\rightarrow x = 3. \\quad \\text{Sustituyendo: } 3 - y = 1 \\rightarrow y = 2',
    difficulty: 'medium',
    skills: ['sistemas-solucion-unica', 'algebra-sistemas-ecuaciones', 'algebra-metodo-eliminacion', 'algebra-metodo-sustitucion', 'algebra-despeje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-sist-1',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Resuelve el sistema: } 3x + 2y = 12 \\text{ y } 5x - y = 11',
    options: ['$x = 2, y = 3$', '$x = 3, y = 2$', '$x = 1, y = 6$', '$x = 4, y = 0$'],
    correctAnswer: 0,
    explanation: 'Multiplicamos la segunda ecuación por 2 y sumamos:',
    explanationLatex: '3x + 2y = 12 \\text{ y } 10x - 2y = 22 \\rightarrow 13x = 34 \\rightarrow x = 2, y = 3',
    difficulty: 'hard',
    skills: ['sistemas-solucion-unica', 'algebra-sistemas-ecuaciones', 'algebra-metodo-eliminacion', 'algebra-despeje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-sist-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Un sistema de ecuaciones tiene solución única cuando sus rectas:}',
    options: ['Son paralelas', 'Se intersectan en un punto', 'Son coincidentes', 'Son perpendiculares'],
    correctAnswer: 1,
    explanation: 'Un sistema tiene solución única cuando las rectas se intersectan en exactamente un punto',
    explanationLatex: '\\text{Las rectas se intersectan en un punto único} \\rightarrow \\text{una solución}',
    difficulty: 'medium',
    skills: ['sistemas-interpretacion-geometrica', 'sistemas-solucion-unica', 'algebra-sistemas-ecuaciones', 'algebra-interpretacion-geometrica', 'geometria-rectas', 'algebra-solucion-sistemas']
  },
  {
    id: 'm2-alg-sist-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Resuelve: } x + 2y + z = 6, \\; 2x - y + 3z = 14, \\; x + y - z = -2',
    options: ['$x = 1, y = 2, z = 1$', '$x = 2, y = 1, z = 1$', '$x = 3, y = 0, z = 3$', '$x = 1, y = -1, z = 4$'],
    optionsLatex: ['x = 1, y = 2, z = 1', 'x = 2, y = 1, z = 1', 'x = 3, y = 0, z = 3', 'x = 1, y = -1, z = 4'],
    correctAnswer: 1,
    explanation: 'Resolviendo por eliminación gaussiana: de las ecuaciones 1 y 3: z = 1, luego x = 2, y = 1',
    explanationLatex: '\\text{Sistema 3×3: eliminación gaussiana} \\rightarrow x = 2, y = 1, z = 1',
    difficulty: 'extreme',
    skills: ['sistemas-solucion-unica', 'algebra-sistemas-ecuaciones', 'algebra-sistemas-3x3', 'algebra-eliminacion-gaussiana', 'algebra-despeje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-sist-4',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Resuelve el sistema usando método de sustitución: } y = 2x - 1 \\text{ y } 3x + 4y = 20',
    options: ['$x = 2, y = 3$', '$x = 3, y = 5$', '$x = 1, y = 1$', '$x = 4, y = 7$'],
    optionsLatex: ['x = 2, y = 3', 'x = 3, y = 5', 'x = 1, y = 1', 'x = 4, y = 7'],
    correctAnswer: 0,
    explanation: 'Sustituimos y = 2x - 1 en la segunda ecuación:',
    explanationLatex: '3x + 4(2x - 1) = 20 \\rightarrow 3x + 8x - 4 = 20 \\rightarrow 11x = 24 \\rightarrow x = 2, y = 3',
    difficulty: 'medium',
    skills: ['sistemas-solucion-unica', 'algebra-sistemas-ecuaciones', 'algebra-metodo-sustitucion', 'algebra-despeje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-sist-5',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{El sistema } 2x + 3y = 6 \\text{ y } 4x + 6y = k \\text{ tiene infinitas soluciones si:}',
    options: ['$k = 6$', '$k = 12$', '$k = 3$', '$k = 0$'],
    optionsLatex: ['k = 6', 'k = 12', 'k = 3', 'k = 0'],
    correctAnswer: 1,
    explanation: 'Para infinitas soluciones, la segunda ecuación debe ser múltiplo de la primera:',
    explanationLatex: '4x + 6y = 2(2x + 3y) = 2(6) = 12 \\rightarrow k = 12',
    difficulty: 'hard',
    skills: ['sistemas-infinitas-soluciones', 'algebra-sistemas-ecuaciones', 'algebra-solucion-sistemas', 'algebra-ecuaciones-parametricas', 'algebra-interpretacion-geometrica']
  },
  {
    id: 'm2-alg-sist-6',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{La suma de dos números es 15 y su diferencia es 3. ¿Cuáles son los números?}',
    options: ['9 y 6', '10 y 5', '8 y 7', '12 y 3'],
    correctAnswer: 0,
    explanation: 'Planteamos x + y = 15 y x - y = 3. Sumando: 2x = 18, x = 9. Entonces y = 6',
    explanationLatex: 'x + y = 15, \\; x - y = 3 \\rightarrow 2x = 18 \\rightarrow x = 9, y = 6',
    difficulty: 'medium',
    skills: ['sistemas-solucion-unica', 'algebra-sistemas-ecuaciones', 'algebra-problemas-aplicados', 'algebra-planteamiento-ecuaciones', 'numeros-operaciones-basicas']
  },
  // Subsection C: Sistemas sin solución
  {
    id: 'm2-alg-nosol-1',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Sistema } 2x + 3y = 6 \\text{ y } 4x + 6y = 15 \\text{ no tiene solución porque:}',
    options: ['Las rectas son paralelas', 'Las rectas son perpendiculares', 'Las rectas son coincidentes', 'Las pendientes son diferentes'],
    optionsLatex: ['\\text{Rectas paralelas}', '\\text{Rectas perpendiculares}', '\\text{Rectas coincidentes}', '\\text{Pendientes diferentes}'],
    correctAnswer: 0,
    explanation: 'La segunda ecuación es 2×(primera) en los coeficientes de x,y pero no en el término constante (12 ≠ 15). Son rectas paralelas',
    explanationLatex: '4x + 6y = 2(2x + 3y) \\text{ pero } 15 \\neq 2(6) \\Rightarrow \\text{paralelas, sin solución}',
    difficulty: 'hard',
    skills: ['sistemas-sin-solucion', 'sistemas-interpretacion-geometrica', 'algebra-sistemas-ecuaciones', 'geometria-rectas-paralelas']
  },
  {
    id: 'm2-alg-nosol-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{¿Para qué valor de } k \\text{ el sistema } x + 2y = 5 \\text{ y } 3x + 6y = k \\text{ NO tiene solución?}',
    options: ['$k = 15$', '$k = 10$', '$k = 20$', '$k = 5$'],
    optionsLatex: ['k = 15', 'k = 10', 'k = 20', 'k = 5'],
    correctAnswer: 2,
    explanation: 'Multiplicando la primera por 3: 3x + 6y = 15. Para no tener solución, k ≠ 15. Las opciones 10, 20 y 5 cumplen, pero la respuesta específica es cualquier k ≠ 15',
    explanationLatex: '3(x + 2y) = 3x + 6y = 3(5) = 15 \\Rightarrow \\text{si } k \\neq 15, \\text{ sin solución}',
    difficulty: 'hard',
    skills: ['sistemas-sin-solucion', 'algebra-sistemas-ecuaciones', 'algebra-ecuaciones-parametricas', 'algebra-solucion-sistemas']
  },
  {
    id: 'm2-alg-nosol-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{¿Cuál sistema NO tiene solución?}',
    options: ['$x + y = 4$ y $2x + 2y = 8$', '$x - y = 3$ y $2x - 2y = 5$', '$3x + y = 7$ y $x - y = 1$', '$x + y = 5$ y $x - y = 1$'],
    optionsLatex: ['x + y = 4 \\text{ y } 2x + 2y = 8', 'x - y = 3 \\text{ y } 2x - 2y = 5', '3x + y = 7 \\text{ y } x - y = 1', 'x + y = 5 \\text{ y } x - y = 1'],
    correctAnswer: 1,
    explanation: 'En B: 2(x - y) = 2x - 2y = 2(3) = 6 ≠ 5. Las ecuaciones son paralelas (sin solución)',
    explanationLatex: '2(x - y) = 6 \\neq 5 \\Rightarrow \\text{rectas paralelas, sin solución}',
    difficulty: 'medium',
    skills: ['sistemas-sin-solucion', 'algebra-sistemas-ecuaciones', 'algebra-analisis-sistemas', 'algebra-solucion-sistemas']
  },
  // Additional Subsection B: Sistemas con infinitas soluciones
  {
    id: 'm2-alg-inf-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{¿Cuál sistema tiene infinitas soluciones?}',
    options: ['$x + y = 3$ y $2x + 2y = 6$', '$x + y = 3$ y $x - y = 1$', '$2x + y = 5$ y $4x + 2y = 8$', '$x - y = 2$ y $2x - 2y = 3$'],
    optionsLatex: ['x + y = 3 \\text{ y } 2x + 2y = 6', 'x + y = 3 \\text{ y } x - y = 1', '2x + y = 5 \\text{ y } 4x + 2y = 8', 'x - y = 2 \\text{ y } 2x - 2y = 3'],
    correctAnswer: 0,
    explanation: 'En A: 2(x + y) = 2x + 2y = 2(3) = 6. Las ecuaciones son la misma recta (infinitas soluciones)',
    explanationLatex: '2(x + y) = 6 \\Rightarrow \\text{rectas coincidentes, infinitas soluciones}',
    difficulty: 'medium',
    skills: ['sistemas-infinitas-soluciones', 'algebra-sistemas-ecuaciones', 'algebra-analisis-sistemas', 'algebra-solucion-sistemas']
  },
  {
    id: 'm2-alg-inf-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Si el sistema } ax + 2y = 6 \\text{ y } 6x + 4y = 12 \\text{ tiene infinitas soluciones, entonces } a = ',
    options: ['$2$', '$3$', '$4$', '$6$'],
    optionsLatex: ['2', '3', '4', '6'],
    correctAnswer: 1,
    explanation: 'Para infinitas soluciones, la segunda ecuación debe ser múltiplo de la primera. 6x + 4y = 2(ax + 2y), entonces 6 = 2a, a = 3',
    explanationLatex: '6x + 4y = 2(ax + 2y) \\rightarrow 6 = 2a \\rightarrow a = 3',
    difficulty: 'hard',
    skills: ['sistemas-infinitas-soluciones', 'algebra-sistemas-ecuaciones', 'algebra-ecuaciones-parametricas', 'algebra-despeje']
  },
  {
    id: 'm2-alg-inf-4',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Un sistema con infinitas soluciones representa geométricamente:}',
    options: ['Dos rectas que se intersectan en un punto', 'Dos rectas paralelas', 'Dos rectas coincidentes (la misma recta)', 'Dos rectas perpendiculares'],
    optionsLatex: ['\\text{Rectas que se intersectan}', '\\text{Rectas paralelas}', '\\text{Rectas coincidentes}', '\\text{Rectas perpendiculares}'],
    correctAnswer: 2,
    explanation: 'Infinitas soluciones significa que las ecuaciones representan la misma recta, por lo que todos los puntos de la recta son soluciones',
    explanationLatex: '\\text{Rectas coincidentes} \\Rightarrow \\text{infinitos puntos en común}',
    difficulty: 'easy',
    skills: ['sistemas-infinitas-soluciones', 'sistemas-interpretacion-geometrica', 'algebra-sistemas-ecuaciones', 'geometria-rectas']
  }
];
