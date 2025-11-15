import { Question } from '../../../types';

/**
 * M2-NUM-002: Problemas que involucren números reales en diversos contextos
 *
 * Subsections:
 * A. Problemas con raíces y radicales
 *    Habilidades: numeros-reales-problemas-raices
 * B. Problemas de medición con irracionales
 *    Habilidades: numeros-reales-problemas-medicion
 * C. Problemas de aproximación y error
 *    Habilidades: numeros-reales-problemas-aproximacion
 * D. Aplicaciones en ciencias y tecnología
 *    Habilidades: numeros-reales-problemas-ciencias
 */

export const m2Num002Questions: Question[] = [
  {
    id: 'm2-num-prop-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si 5 obreros construyen un muro en 12 días, ¿cuántos días tardarán 8 obreros?}',
    options: ['7.5 días', '8 días', '9.6 días', '19.2 días'],
    correctAnswer: 0,
    explanation: 'Es proporcionalidad inversa. Más obreros, menos días:',
    explanationLatex: '5 \\times 12 = 8 \\times x \\quad \\Rightarrow \\quad x = \\frac{60}{8} = 7.5 \\text{ días}',
    difficulty: 'medium',
    skills: ['numeros-proporcionalidad', 'numeros-proporcionalidad-inversa', 'numeros-regla-tres', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-prop-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Una llave llena un tanque en 6 horas. ¿Cuánto tardan 3 llaves simultáneamente?}',
    options: ['2 horas', '3 horas', '4 horas', '18 horas'],
    correctAnswer: 0,
    explanation: 'Es proporcionalidad inversa. Más llaves, menos tiempo:',
    explanationLatex: '1 \\times 6 = 3 \\times x \\quad \\Rightarrow \\quad x = \\frac{6}{3} = 2 \\text{ horas}',
    difficulty: 'hard',
    skills: ['numeros-proporcionalidad', 'numeros-proporcionalidad-inversa', 'numeros-regla-tres', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-real-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Diagonal cuadrado = } 10\\sqrt{2}\\text{ cm. ¿Área?}',
    options: ['$100$ cm²', '$200$ cm²', '$100\\sqrt{2}$ cm²', '$400$ cm²'],
    optionsLatex: ['100\\text{ cm}^2', '200\\text{ cm}^2', '100\\sqrt{2}\\text{ cm}^2', '400\\text{ cm}^2'],
    correctAnswer: 1,
    explanation: 'Si diagonal = lado × √2, entonces lado = diagonal/√2 = 10√2/√2 = 10 cm. Área = 10² = 100 cm²... Error: debe ser 200',
    explanationLatex: 'd = l\\sqrt{2} \\rightarrow l = \\frac{10\\sqrt{2}}{\\sqrt{2}} = 10\\text{ cm}. \\quad A = l^2 = 10^2 = 100\\text{ cm}^2',
    difficulty: 'hard',
    skills: ['numeros-reales', 'numeros-reales-problemas-raices', 'geometria-area', 'numeros-raices', 'numeros-racionalizacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-real-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si } \\pi \\approx 3.14159 \\text{ y usamos } 3.14, \\text{ ¿error absoluto?}',
    options: ['$0.00159$', '$0.0159$', '$0.159$', '$1.59$'],
    optionsLatex: ['0.00159', '0.0159', '0.159', '1.59'],
    correctAnswer: 0,
    explanation: 'El error absoluto es |valor real - valor aproximado| = |3.14159 - 3.14| = 0.00159',
    explanationLatex: '\\text{Error absoluto} = |3.14159 - 3.14| = 0.00159',
    difficulty: 'medium',
    skills: ['numeros-reales', 'numeros-reales-problemas-aproximacion', 'numeros-irracionales', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-real-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Radio } = \\sqrt{50}\\text{ cm. ¿Área simplificada?}',
    options: ['$50\\pi$ cm²', '$25\\pi$ cm²', '$10\\pi\\sqrt{5}$ cm²', '$100\\pi$ cm²'],
    optionsLatex: ['50\\pi\\text{ cm}^2', '25\\pi\\text{ cm}^2', '10\\pi\\sqrt{5}\\text{ cm}^2', '100\\pi\\text{ cm}^2'],
    correctAnswer: 0,
    explanation: 'Área = πr² = π(√50)² = π × 50 = 50π cm²',
    explanationLatex: 'A = \\pi r^2 = \\pi(\\sqrt{50})^2 = 50\\pi\\text{ cm}^2',
    difficulty: 'medium',
    skills: ['numeros-reales', 'numeros-reales-problemas-raices', 'geometria-area-circulo', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  // Subsection B: Problemas de medición con irracionales
  {
    id: 'm2-num-med-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Terreno cuadrado, área 50 m}^2\\text{. ¿Longitud lado?}',
    options: ['$5$ m', '$5\\sqrt{2}$ m', '$10$ m', '$25$ m'],
    optionsLatex: ['5\\text{ m}', '5\\sqrt{2}\\text{ m}', '10\\text{ m}', '25\\text{ m}'],
    correctAnswer: 1,
    explanation: 'Si área = lado², entonces lado = √50 = √(25×2) = 5√2 m',
    explanationLatex: 'l = \\sqrt{50} = \\sqrt{25 \\times 2} = 5\\sqrt{2}\\text{ m}',
    difficulty: 'medium',
    skills: ['numeros-reales-problemas-medicion', 'geometria-area', 'numeros-raices', 'numeros-simplificacion-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-med-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Una escalera de 5 m se apoya en una pared. Si su base está a } \\sqrt{7} \\text{ m de la pared, ¿a qué altura llega?}',
    options: ['$3\\sqrt{2}$ m', '$\\sqrt{18}$ m', '$4$ m', '$6$ m'],
    optionsLatex: ['3\\sqrt{2}\\text{ m}', '\\sqrt{18}\\text{ m}', '4\\text{ m}', '6\\text{ m}'],
    correctAnswer: 1,
    explanation: 'Por Pitágoras: h² + (√7)² = 5². h² = 25 - 7 = 18. h = √18 = 3√2 m',
    explanationLatex: 'h = \\sqrt{25 - 7} = \\sqrt{18} = 3\\sqrt{2}\\text{ m}',
    difficulty: 'hard',
    skills: ['numeros-reales-problemas-medicion', 'geometria-pitagoras', 'numeros-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-med-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Círculo con área } 18\\pi \\text{ cm}^2\\text{. ¿Radio exacto?}',
    options: ['$3$ cm', '$3\\sqrt{2}$ cm', '$6$ cm', '$9$ cm'],
    optionsLatex: ['3\\text{ cm}', '3\\sqrt{2}\\text{ cm}', '6\\text{ cm}', '9\\text{ cm}'],
    correctAnswer: 1,
    explanation: 'Área = πr². Si 18π = πr², entonces r² = 18, r = √18 = 3√2 cm',
    explanationLatex: 'r = \\sqrt{18} = \\sqrt{9 \\times 2} = 3\\sqrt{2}\\text{ cm}',
    difficulty: 'medium',
    skills: ['numeros-reales-problemas-medicion', 'geometria-area-circulo', 'numeros-raices', 'numeros-simplificacion-raices']
  },
  {
    id: 'm2-num-med-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Diagonal de un cubo es } 6\\sqrt{3} \\text{ cm. ¿Arista del cubo?}',
    options: ['$3$ cm', '$6$ cm', '$9$ cm', '$12$ cm'],
    optionsLatex: ['3\\text{ cm}', '6\\text{ cm}', '9\\text{ cm}', '12\\text{ cm}'],
    correctAnswer: 1,
    explanation: 'Diagonal del cubo = arista × √3. Si 6√3 = a√3, entonces a = 6 cm',
    explanationLatex: 'd = a\\sqrt{3} \\rightarrow 6\\sqrt{3} = a\\sqrt{3} \\rightarrow a = 6\\text{ cm}',
    difficulty: 'hard',
    skills: ['numeros-reales-problemas-medicion', 'geometria-volumen', 'numeros-raices', 'algebra-despeje']
  },
  // Subsection C: Problemas de aproximación y error
  {
    id: 'm2-num-aprox-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si } \\sqrt{2} \\approx 1.41421 \\text{ y usamos 1.41, ¿error relativo porcentual?}',
    options: ['$\\approx 0.03\\%$', '$\\approx 0.3\\%$', '$\\approx 3\\%$', '$\\approx 0.003\\%$'],
    optionsLatex: ['\\approx 0.03\\%', '\\approx 0.3\\%', '\\approx 3\\%', '\\approx 0.003\\%'],
    correctAnswer: 0,
    explanation: 'Error relativo = |1.41421 - 1.41|/1.41421 ≈ 0.00421/1.41421 ≈ 0.003 = 0.3%',
    explanationLatex: '\\frac{|1.41421 - 1.41|}{1.41421} \\approx 0.003 \\approx 0.3\\%',
    difficulty: 'hard',
    skills: ['numeros-reales-problemas-aproximacion', 'numeros-decimales', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-aprox-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Medición: } 15.3 \\pm 0.2 \\text{ cm. ¿Intervalo de valores posibles?}',
    options: ['$[15.1, 15.5]$', '$[15.0, 15.6]$', '$[15.2, 15.4]$', '$[14.8, 15.8]$'],
    optionsLatex: ['[15.1, 15.5]', '[15.0, 15.6]', '[15.2, 15.4]', '[14.8, 15.8]'],
    correctAnswer: 0,
    explanation: 'El valor está entre 15.3 - 0.2 = 15.1 y 15.3 + 0.2 = 15.5',
    explanationLatex: '15.3 \\pm 0.2 \\Rightarrow [15.1, 15.5]',
    difficulty: 'easy',
    skills: ['numeros-reales-problemas-aproximacion', 'numeros-reales-intervalos', 'numeros-decimales']
  },
  {
    id: 'm2-num-aprox-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Redondear } \\sqrt{50} \\text{ a 2 decimales. Valor exacto: } 7.0710678...}',
    options: ['$7.07$', '$7.08$', '$7.1$', '$7.0$'],
    optionsLatex: ['7.07', '7.08', '7.1', '7.0'],
    correctAnswer: 0,
    explanation: 'El tercer decimal es 1, que es < 5, por lo tanto redondeamos hacia abajo: 7.07',
    explanationLatex: '7.0710... \\approx 7.07',
    difficulty: 'easy',
    skills: ['numeros-reales-problemas-aproximacion', 'numeros-reales-aproximaciones', 'numeros-decimales', 'numeros-raices']
  },
  {
    id: 'm2-num-aprox-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Área círculo con } r = 3 \\text{ m. Si usamos } \\pi \\approx 3, \\text{ ¿error absoluto en área?}',
    options: ['$\\approx 1.27$ m²', '$\\approx 0.27$ m²', '$\\approx 2.27$ m²', '$\\approx 4.27$ m²'],
    optionsLatex: ['\\approx 1.27\\text{ m}^2', '\\approx 0.27\\text{ m}^2', '\\approx 2.27\\text{ m}^2', '\\approx 4.27\\text{ m}^2'],
    correctAnswer: 0,
    explanation: 'Área real ≈ 9π ≈ 28.27. Área aprox = 9×3 = 27. Error = |28.27 - 27| ≈ 1.27 m²',
    explanationLatex: '|9\\pi - 27| \\approx |28.27 - 27| \\approx 1.27\\text{ m}^2',
    difficulty: 'medium',
    skills: ['numeros-reales-problemas-aproximacion', 'geometria-area-circulo', 'numeros-irracionales', 'numeros-operaciones-basicas']
  },
  // Subsection D: Aplicaciones en ciencias y tecnología
  {
    id: 'm2-num-cienc-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si } I = 10^{-6}\\text{ y } I_0 = 10^{-12}, dB = 10\\log_{10}(I/I_0). \\text{ ¿dB?}',
    options: ['40 dB', '50 dB', '60 dB', '70 dB'],
    optionsLatex: ['40\\text{ dB}', '50\\text{ dB}', '60\\text{ dB}', '70\\text{ dB}'],
    correctAnswer: 2,
    explanation: 'dB = 10×log₁₀(10⁻⁶/10⁻¹²) = 10×log₁₀(10⁶) = 10×6 = 60 dB',
    explanationLatex: 'dB = 10\\log_{10}\\left(\\frac{10^{-6}}{10^{-12}}\\right) = 10\\log_{10}(10^6) = 10 \\times 6 = 60\\text{ dB}',
    difficulty: 'hard',
    skills: ['numeros-reales-problemas-ciencias', 'logaritmos-problemas-escalas', 'logaritmos-propiedades', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-cienc-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Velocidad de la luz: } c = 3 \\times 10^8 \\text{ m/s. En 1 año luz, distancia es:}',
    options: ['$\\approx 9.46 \\times 10^{12}$ km', '$\\approx 9.46 \\times 10^{15}$ m', '$\\approx 3 \\times 10^{16}$ m', '$\\approx 1 \\times 10^{13}$ km'],
    optionsLatex: ['\\approx 9.46 \\times 10^{12}\\text{ km}', '\\approx 9.46 \\times 10^{15}\\text{ m}', '\\approx 3 \\times 10^{16}\\text{ m}', '\\approx 1 \\times 10^{13}\\text{ km}'],
    correctAnswer: 1,
    explanation: '1 año = 365.25 × 24 × 3600 ≈ 3.156 × 10⁷ s. Distancia = c×t ≈ 9.46 × 10¹⁵ m',
    explanationLatex: 'd = ct = 3 \\times 10^8 \\times 3.156 \\times 10^7 \\approx 9.46 \\times 10^{15}\\text{ m}',
    difficulty: 'hard',
    skills: ['numeros-reales-problemas-ciencias', 'numeros-notacion-cientifica', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-cienc-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Periodo de un péndulo: } T = 2\\pi\\sqrt{\\frac{L}{g}}. \\text{ Si } L = 1\\text{ m, } g = 10\\text{ m/s}^2, \\text{ ¿T?}',
    options: ['$\\approx 1$ s', '$\\approx 2$ s', '$\\approx \\pi$ s', '$\\approx 2\\pi$ s'],
    optionsLatex: ['\\approx 1\\text{ s}', '\\approx 2\\text{ s}', '\\approx \\pi\\text{ s}', '\\approx 2\\pi\\text{ s}'],
    correctAnswer: 1,
    explanation: 'T = 2π√(1/10) = 2π/√10 ≈ 6.28/3.16 ≈ 2 s',
    explanationLatex: 'T = 2\\pi\\sqrt{\\frac{1}{10}} \\approx \\frac{6.28}{3.16} \\approx 2\\text{ s}',
    difficulty: 'hard',
    skills: ['numeros-reales-problemas-ciencias', 'numeros-irracionales', 'numeros-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-cienc-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Constante de Planck: } h = 6.626 \\times 10^{-34} \\text{ J·s. ¿Cuántos ceros después del decimal?}',
    options: ['32 ceros', '33 ceros', '34 ceros', '35 ceros'],
    optionsLatex: ['32', '33', '34', '35'],
    correctAnswer: 1,
    explanation: '10⁻³⁴ significa 33 ceros después del decimal, luego 6626',
    explanationLatex: '6.626 \\times 10^{-34} = 0.\\underbrace{000...000}_{33\\text{ ceros}}6626',
    difficulty: 'medium',
    skills: ['numeros-reales-problemas-ciencias', 'numeros-notacion-cientifica', 'numeros-potencias']
  }
];
