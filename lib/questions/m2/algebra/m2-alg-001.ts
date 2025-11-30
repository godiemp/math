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
    operacionBase: '2x + y = 8; \\quad x - y = 1',
    questionLatex: '\\text{Una florería vende ramos de flores donde cada ramo grande contiene 2 rosas y 1 clavel, mientras que cada ramo pequeño contiene 1 rosa y 1 clavel menos que el grande. Si el total de flores en los ramos grandes es 8 y la diferencia entre rosas y claveles en los pequeños es 1, el sistema de ecuaciones } 2x + y = 8 \\text{ y } x - y = 1 \\text{ modela esta situación. ¿Cuáles son los valores de } x \\text{ e } y\\text{?}',
    options: ['x = 2, y = 4', 'x = 3, y = 2', 'x = 4, y = 0', 'x = 1, y = 6'],
    correctAnswer: 1,
    explanation: '3x = 9 \\rightarrow x = 3. \\quad \\text{Sustituyendo: } 3 - y = 1 \\rightarrow y = 2',
    difficulty: 'medium',
    skills: ['sistemas-solucion-unica', 'algebra-sistemas-ecuaciones', 'algebra-metodo-eliminacion', 'algebra-metodo-sustitucion', 'algebra-despeje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-sist-1',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '3x + 2y = 12; \\quad x + y = 5',
    questionLatex: '\\text{Un nutricionista está diseñando una dieta donde combina dos tipos de alimentos. El alimento A aporta 3 gramos de proteína y 2 gramos de carbohidratos por porción. El alimento B aporta 1 gramo de proteína y 1 gramo de carbohidratos por porción. Si el paciente necesita exactamente 12 gramos de carbohidratos y el total de porciones debe ser 5, el sistema } 3x + 2y = 12 \\text{ y } x + y = 5 \\text{ modela las porciones necesarias. ¿Cuántas porciones de cada alimento se requieren?}',
    options: ['x = 2, y = 3', 'x = 3, y = 2', 'x = 1, y = 4', 'x = 4, y = 1'],
    correctAnswer: 0,
    explanation: 'x + y = 5 \\rightarrow y = 5 - x. \\quad 3x + 2(5-x) = 12 \\rightarrow 3x + 10 - 2x = 12 \\rightarrow x = 2, y = 3',
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
    explanation: '\\text{Las rectas se intersectan en un punto único} \\rightarrow \\text{una solución}',
    difficulty: 'medium',
    skills: ['sistemas-interpretacion-geometrica', 'sistemas-solucion-unica', 'algebra-sistemas-ecuaciones', 'algebra-interpretacion-geometrica', 'geometria-rectas', 'algebra-solucion-sistemas']
  },
  {
    id: 'm2-alg-sist-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'x + y + z = 6; \\quad x - y + z = 2; \\quad x + y - z = 0',
    questionLatex: '\\text{Una empresa de logística tiene tres almacenes que distribuyen productos. El almacén A envía } x \\text{ unidades, el B envía } y \\text{ unidades y el C envía } z \\text{ unidades. Las restricciones de distribución establecen que: la suma total es 6 unidades; A menos B más C es 2 unidades; y A más B menos C es 0 unidades. El sistema de ecuaciones } x + y + z = 6, \\; x - y + z = 2, \\; x + y - z = 0 \\text{ modela esta situación. ¿Cuántas unidades envía cada almacén?}',
    options: ['x = 1, y = 2, z = 3', 'x = 2, y = 1, z = 3', 'x = 1, y = 3, z = 2', 'x = 2, y = 2, z = 2'],
    correctAnswer: 0,
    explanation: '\\text{Sistema 3×3: sumando ecuaciones 1 y 2: } 2x + 2z = 8 \\rightarrow x + z = 4. \\text{ De ec. 1 y 3: } 2z = 6 \\rightarrow z = 3, x = 1, y = 2',
    difficulty: 'extreme',
    skills: ['sistemas-solucion-unica', 'algebra-sistemas-ecuaciones', 'algebra-sistemas-3x3', 'algebra-eliminacion-gaussiana', 'algebra-despeje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-sist-4',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'y = 2x - 1; \\quad x + y = 5',
    questionLatex: '\\text{Un mecánico cobra su servicio según la fórmula } y = 2x - 1\\text{, donde } y \\text{ es el costo en miles de pesos y } x \\text{ es el número de horas trabajadas. Además, la suma del número de horas y el costo total es 5. Para determinar cuántas horas trabajó y cuánto cobró, el cliente debe resolver este sistema usando el método de sustitución. ¿Cuáles son los valores de } x \\text{ (horas) e } y \\text{ (costo)?}',
    options: ['x = 2, y = 3', 'x = 3, y = 5', 'x = 1, y = 1', 'x = 4, y = 7'],
    correctAnswer: 0,
    explanation: 'x + (2x - 1) = 5 \\rightarrow 3x - 1 = 5 \\rightarrow 3x = 6 \\rightarrow x = 2, y = 2(2) - 1 = 3',
    difficulty: 'medium',
    skills: ['sistemas-solucion-unica', 'algebra-sistemas-ecuaciones', 'algebra-metodo-sustitucion', 'algebra-despeje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-sist-5',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{El sistema } 2x + 3y = 6 \\text{ y } 4x + 6y = k \\text{ tiene infinitas soluciones si:}',
    options: ['k = 6', 'k = 12', 'k = 3', 'k = 0'],
    correctAnswer: 1,
    explanation: '4x + 6y = 2(2x + 3y) = 2(6) = 12 \\rightarrow k = 12',
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
    explanation: 'x + y = 15, \\; x - y = 3 \\rightarrow 2x = 18 \\rightarrow x = 9, y = 6',
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
    options: ['\\text{Rectas paralelas}', '\\text{Rectas perpendiculares}', '\\text{Rectas coincidentes}', '\\text{Pendientes diferentes}'],
    correctAnswer: 0,
    explanation: '4x + 6y = 2(2x + 3y) \\text{ pero } 15 \\neq 2(6) \\Rightarrow \\text{paralelas, sin solución}',
    difficulty: 'hard',
    skills: ['sistemas-sin-solucion', 'sistemas-interpretacion-geometrica', 'algebra-sistemas-ecuaciones', 'geometria-rectas-paralelas']
  },
  {
    id: 'm2-alg-nosol-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{¿Para qué valor de } k \\text{ el sistema } x + 2y = 5 \\text{ y } 3x + 6y = k \\text{ NO tiene solución?}',
    options: ['k = 15', 'k = 10', 'k = 20', 'k = 5'],
    correctAnswer: 2,
    explanation: '3(x + 2y) = 3x + 6y = 3(5) = 15 \\Rightarrow \\text{si } k \\neq 15, \\text{ sin solución}',
    difficulty: 'hard',
    skills: ['sistemas-sin-solucion', 'algebra-sistemas-ecuaciones', 'algebra-ecuaciones-parametricas', 'algebra-solucion-sistemas']
  },
  {
    id: 'm2-alg-nosol-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{¿Cuál sistema NO tiene solución?}',
    options: ['x + y = 4 \\text{ y } 2x + 2y = 8', 'x - y = 3 \\text{ y } 2x - 2y = 5', '3x + y = 7 \\text{ y } x - y = 1', 'x + y = 5 \\text{ y } x - y = 1'],
    correctAnswer: 1,
    explanation: '2(x - y) = 6 \\neq 5 \\Rightarrow \\text{rectas paralelas, sin solución}',
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
    options: ['x + y = 3 \\text{ y } 2x + 2y = 6', 'x + y = 3 \\text{ y } x - y = 1', '2x + y = 5 \\text{ y } 4x + 2y = 8', 'x - y = 2 \\text{ y } 2x - 2y = 3'],
    correctAnswer: 0,
    explanation: '2(x + y) = 6 \\Rightarrow \\text{rectas coincidentes, infinitas soluciones}',
    difficulty: 'medium',
    skills: ['sistemas-infinitas-soluciones', 'algebra-sistemas-ecuaciones', 'algebra-analisis-sistemas', 'algebra-solucion-sistemas']
  },
  {
    id: 'm2-alg-inf-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Si el sistema } ax + 2y = 6 \\text{ y } 6x + 4y = 12 \\text{ tiene infinitas soluciones, entonces } a = ',
    options: ['2', '3', '4', '6'],
    correctAnswer: 1,
    explanation: '6x + 4y = 2(ax + 2y) \\rightarrow 6 = 2a \\rightarrow a = 3',
    difficulty: 'hard',
    skills: ['sistemas-infinitas-soluciones', 'algebra-sistemas-ecuaciones', 'algebra-ecuaciones-parametricas', 'algebra-despeje']
  },
  {
    id: 'm2-alg-inf-4',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Un sistema con infinitas soluciones representa geométricamente:}',
    options: ['\\text{Rectas que se intersectan}', '\\text{Rectas paralelas}', '\\text{Rectas coincidentes}', '\\text{Rectas perpendiculares}'],
    correctAnswer: 2,
    explanation: '\\text{Rectas coincidentes} \\Rightarrow \\text{infinitos puntos en común}',
    difficulty: 'easy',
    skills: ['sistemas-infinitas-soluciones', 'sistemas-interpretacion-geometrica', 'algebra-sistemas-ecuaciones', 'geometria-rectas']
  },
  // Problemas clásicos de edades
  {
    id: 'm2-alg-edad-1',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'x = 3y; \\quad x + 10 = 2(y + 10)',
    questionLatex: '\\text{La edad de un padre es el triple de la edad de su hijo. En 10 años, la edad del padre será el doble de la del hijo. ¿Cuántos años tiene cada uno actualmente?}',
    options: ['\\text{Padre: 30, Hijo: 10}', '\\text{Padre: 36, Hijo: 12}', '\\text{Padre: 45, Hijo: 15}', '\\text{Padre: 42, Hijo: 14}'],
    correctAnswer: 0,
    explanation: 'x = 3y. \\quad x + 10 = 2(y + 10) \\rightarrow 3y + 10 = 2y + 20 \\rightarrow y = 10. \\quad x = 30',
    difficulty: 'hard',
    skills: ['sistemas-solucion-unica', 'algebra-sistemas-ecuaciones', 'algebra-problemas-edades', 'algebra-planteamiento-ecuaciones']
  },
  {
    id: 'm2-alg-edad-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'x + y = 50; \\quad x - y = 14',
    questionLatex: '\\text{La suma de las edades de dos hermanos es 50 años y la diferencia es 14 años. ¿Cuántos años tiene el hermano mayor?}',
    options: ['25', '28', '32', '36'],
    correctAnswer: 2,
    explanation: 'x + y = 50, \\quad x - y = 14 \\rightarrow 2x = 64 \\rightarrow x = 32',
    difficulty: 'medium',
    skills: ['sistemas-solucion-unica', 'algebra-sistemas-ecuaciones', 'algebra-problemas-edades', 'numeros-operaciones-basicas']
  },
  // Problemas de mezclas
  {
    id: 'm2-alg-mezcla-1',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'x + y = 30; \\quad 0{,}2x + 0{,}5y = 0{,}3 \\times 30',
    questionLatex: '\\text{¿Cuántos litros de solución al 20\\% y al 50\\% se deben mezclar para obtener 30 litros de solución al 30\\%?}',
    options: ['\\text{10 L al 20\\% y 20 L al 50\\%}', '\\text{15 L al 20\\% y 15 L al 50\\%}', '\\text{20 L al 20\\% y 10 L al 50\\%}', '\\text{25 L al 20\\% y 5 L al 50\\%}'],
    correctAnswer: 2,
    explanation: 'x + y = 30, \\quad 0{,}2x + 0{,}5y = 9 \\rightarrow 0{,}2x + 0{,}5(30-x) = 9 \\rightarrow -0{,}3x = -6 \\rightarrow x = 20, y = 10',
    difficulty: 'hard',
    skills: ['sistemas-solucion-unica', 'algebra-sistemas-ecuaciones', 'algebra-problemas-mezclas', 'numeros-porcentaje']
  },
  {
    id: 'm2-alg-mezcla-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'x + y = 100; \\quad 60x + 80y = 72 \\times 100',
    questionLatex: '\\text{Un café vende mezcla de granos tipo A (\\$60/kg) y tipo B (\\$80/kg). ¿Cuántos kg de cada tipo se necesitan para 100 kg de mezcla a \\$72/kg?}',
    options: ['\\text{30 kg de A y 70 kg de B}', '\\text{40 kg de A y 60 kg de B}', '\\text{50 kg de A y 50 kg de B}', '\\text{60 kg de A y 40 kg de B}'],
    correctAnswer: 1,
    explanation: 'x + y = 100, \\quad 60x + 80y = 7200 \\rightarrow 60x + 80(100-x) = 7200 \\rightarrow -20x = -800 \\rightarrow x = 40, y = 60',
    difficulty: 'hard',
    skills: ['sistemas-solucion-unica', 'algebra-sistemas-ecuaciones', 'algebra-problemas-mezclas', 'numeros-operaciones-basicas']
  },
  // Problemas de trabajo conjunto
  {
    id: 'm2-alg-trabajo-1',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '\\frac{1}{a} + \\frac{1}{b} = \\frac{1}{t}',
    questionLatex: '\\text{Ana puede pintar una casa en 6 horas y Beto en 4 horas. Si trabajan juntos, ¿cuántas horas tardarán en pintar la casa?}',
    options: ['2 horas', '2{,}4 horas', '3 horas', '5 horas'],
    correctAnswer: 1,
    explanation: '\\frac{1}{6} + \\frac{1}{4} = \\frac{2 + 3}{12} = \\frac{5}{12} \\rightarrow t = \\frac{12}{5} = 2{,}4 \\text{ horas}',
    difficulty: 'hard',
    skills: ['sistemas-solucion-unica', 'algebra-problemas-trabajo', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-trabajo-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '\\frac{1}{a} + \\frac{1}{b} = \\frac{1}{t}',
    questionLatex: '\\text{Una llave llena un tanque en 3 horas y otra en 6 horas. ¿En cuánto tiempo se llena el tanque si ambas llaves están abiertas?}',
    options: ['1{,}5 horas', '2 horas', '4{,}5 horas', '9 horas'],
    correctAnswer: 1,
    explanation: '\\frac{1}{3} + \\frac{1}{6} = \\frac{2 + 1}{6} = \\frac{3}{6} = \\frac{1}{2} \\rightarrow t = 2 \\text{ horas}',
    difficulty: 'medium',
    skills: ['sistemas-solucion-unica', 'algebra-problemas-trabajo', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  // Problemas de distancia, velocidad y tiempo
  {
    id: 'm2-alg-dist-1',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'd = v \\cdot t; \\quad d_1 + d_2 = D_{total}',
    questionLatex: '\\text{Dos autos parten simultáneamente de ciudades separadas por 300 km. Uno va a 60 km/h y otro a 90 km/h, acercándose. ¿En cuántas horas se encuentran?}',
    options: ['1{,}5 horas', '2 horas', '2{,}5 horas', '3 horas'],
    correctAnswer: 1,
    explanation: '60t + 90t = 300 \\rightarrow 150t = 300 \\rightarrow t = 2 \\text{ horas}',
    difficulty: 'medium',
    skills: ['sistemas-solucion-unica', 'algebra-problemas-movimiento', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-dist-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'd = v \\cdot t',
    questionLatex: '\\text{Un ciclista viaja a 20 km/h. Una hora después, sale otro ciclista a 30 km/h por el mismo camino. ¿Cuántas horas tardará el segundo en alcanzar al primero?}',
    options: ['1 hora', '2 horas', '3 horas', '4 horas'],
    correctAnswer: 1,
    explanation: '20(t + 1) = 30t \\rightarrow 20t + 20 = 30t \\rightarrow 20 = 10t \\rightarrow t = 2 \\text{ horas}',
    difficulty: 'hard',
    skills: ['sistemas-solucion-unica', 'algebra-problemas-movimiento', 'algebra-despeje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-dist-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: '\\frac{d}{v_1} + \\frac{d}{v_2} = t_{total}',
    questionLatex: '\\text{Un auto viaja de A a B a 60 km/h y regresa a 40 km/h. Si el tiempo total del viaje fue 5 horas, ¿cuál es la distancia entre A y B?}',
    options: ['100 km', '120 km', '150 km', '180 km'],
    correctAnswer: 1,
    explanation: '\\frac{d}{60} + \\frac{d}{40} = 5 \\rightarrow \\frac{2d + 3d}{120} = 5 \\rightarrow 5d = 600 \\rightarrow d = 120 \\text{ km}',
    difficulty: 'hard',
    skills: ['sistemas-solucion-unica', 'algebra-problemas-movimiento', 'numeros-fracciones', 'algebra-despeje']
  }
];
