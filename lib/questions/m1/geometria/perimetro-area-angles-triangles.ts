import { Question } from '../../../types';

/**
 * M1 Geometría: Perímetro y Área - Ángulos y Triángulos
 * Questions covering basic geometry, angles, and triangle properties
 */
export const m1GeometriaPerimetroAreaAnglesTrianglesQuestions: Question[] = [
  {
    id: 'm1-6',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un círculo con radio 5 cm es aproximadamente (usar $\\pi \\approx 3.14$):',
    questionLatex: '\\text{El área de un círculo con radio 5 cm es aproximadamente (usar } \\pi \\approx 3.14):',
    options: ['31.4 cm²', '62.8 cm²', '78.5 cm²', '157 cm²'],
    correctAnswer: 2,
    explanation: 'Usamos la fórmula del área del círculo:',
    explanationLatex: 'A = \\pi r^2 = 3.14 \\times 5^2 = 3.14 \\times 25 = 78.5 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'geometria-area', 'numeros-potencias', 'numeros-decimales']
  },
  {
    id: 'm1-17',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si dos ángulos son complementarios y uno mide 35°, ¿cuánto mide el otro?',
    questionLatex: '\\text{Si dos ángulos son complementarios y uno mide } 35^\\circ\\text{, ¿cuánto mide el otro?}',
    options: ['55°', '65°', '145°', '325°'],
    correctAnswer: 0,
    explanation: 'Ángulos complementarios suman 90°:',
    explanationLatex: '90^\\circ - 35^\\circ = 55^\\circ',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-angulos-complementarios', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-18',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Cuál es el perímetro de un rectángulo de 8 cm de largo y 5 cm de ancho?',
    questionLatex: '\\text{¿Cuál es el perímetro de un rectángulo de 8 cm de largo y 5 cm de ancho?}',
    options: ['13 cm', '26 cm', '40 cm', '65 cm'],
    correctAnswer: 1,
    explanation: 'El perímetro de un rectángulo es:',
    explanationLatex: 'P = 2(\\text{largo} + \\text{ancho}) = 2(8 + 5) = 2(13) = 26 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-rectangulos', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-21',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un trapecio con bases de 6 cm y 10 cm, y altura de 4 cm es:',
    questionLatex: '\\text{El área de un trapecio con bases de 6 cm y 10 cm, y altura de 4 cm es:}',
    options: ['24 cm²', '32 cm²', '40 cm²', '64 cm²'],
    correctAnswer: 1,
    explanation: 'El área de un trapecio es:',
    explanationLatex: 'A = \\frac{(b_1 + b_2) \\times h}{2} = \\frac{(6 + 10) \\times 4}{2} = \\frac{64}{2} = 32 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-trapecio', 'geometria-area', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo-visual-2',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un círculo tiene un radio de 7 cm. ¿Cuál es el área del círculo? (usar π ≈ 3.14)',
    questionLatex: '\\text{Un círculo tiene un radio de 7 cm. ¿Cuál es el área del círculo? (usar } \\pi \\approx 3.14)',
    options: ['43.96 cm²', '98.91 cm²', '153.86 cm²', '153.94 cm²'],
    correctAnswer: 3,
    explanation: 'El área de un círculo es:',
    explanationLatex: 'A = \\pi r^2 = 3.14 \\times 7^2 = 3.14 \\times 49 = 153.86 \\text{ cm}^2 \\approx 153.94 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'geometria-area', 'numeros-potencias', 'numeros-decimales', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'geometry',
      data: [
        {
          type: 'circle',
          center: { x: 200, y: 150, label: 'O' },
          radius: 100,
          labels: {
            sides: ['r = 7 cm']
          },
          dimensions: {
            showSides: true
          }
        }
      ]
    }
  },
  {
    id: 'm1-geo-visual-3',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'En la siguiente figura, el ángulo AOB mide 60°. Si añadimos un ángulo BOC de 50°, ¿cuánto mide el ángulo AOC?',
    questionLatex: '\\text{En la siguiente figura, el ángulo AOB mide } 60^\\circ\\text{. Si añadimos un ángulo BOC de } 50^\\circ\\text{, ¿cuánto mide el ángulo AOC?}',
    options: ['90°', '100°', '110°', '120°'],
    correctAnswer: 2,
    explanation: 'Los ángulos adyacentes se suman:',
    explanationLatex: '\\angle AOC = \\angle AOB + \\angle BOC = 60^\\circ + 50^\\circ = 110^\\circ',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-angulos-adyacentes', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'geometry',
      data: [
        {
          type: 'angle',
          points: [
            { x: 200, y: 150, label: 'O' },
            { x: 320, y: 150, label: 'A' },
            { x: 260, y: 46, label: 'C' }
          ],
          labels: {
            angles: ['110°']
          }
        }
      ]
    }
  },
  {
    id: 'm1-geo-visual-4',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El siguiente rectángulo tiene un largo de 12 cm y un ancho de 5 cm. ¿Cuál es su perímetro?',
    questionLatex: '\\text{El siguiente rectángulo tiene un largo de 12 cm y un ancho de 5 cm. ¿Cuál es su perímetro?}',
    options: ['17 cm', '24 cm', '34 cm', '60 cm'],
    correctAnswer: 2,
    explanation: 'El perímetro de un rectángulo es:',
    explanationLatex: 'P = 2(l + w) = 2(12 + 5) = 2 \\times 17 = 34 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-rectangulos', 'geometria-perimetro', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'geometry',
      data: [
        {
          type: 'rectangle',
          points: [
            { x: 50, y: 80, label: 'A' },
            { x: 350, y: 220, label: 'C' }
          ],
          labels: {
            sides: ['12 cm', '5 cm']
          },
          dimensions: {
            showSides: true
          }
        }
      ]
    }
  },
  {
    id: 'm1-geo-visual-5',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'En el siguiente triángulo equilátero, cada lado mide 8 cm. ¿Cuál es su perímetro?',
    questionLatex: '\\text{En el siguiente triángulo equilátero, cada lado mide 8 cm. ¿Cuál es su perímetro?}',
    options: ['16 cm', '20 cm', '24 cm', '32 cm'],
    correctAnswer: 2,
    explanation: 'En un triángulo equilátero, todos los lados son iguales:',
    explanationLatex: 'P = 3 \\times l = 3 \\times 8 = 24 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-perimetro', 'numeros-operaciones-basicas'],
    visualData: {
      type: 'geometry',
      data: [
        {
          type: 'triangle',
          points: [
            { x: 200, y: 220, label: 'A' },
            { x: 340, y: 220, label: 'B' },
            { x: 270, y: 79, label: 'C' }
          ],
          labels: {
            sides: ['8 cm', '8 cm', '8 cm']
          },
          dimensions: {
            showSides: true
          }
        }
      ]
    }
  },
  {
    id: 'm1-34',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un cuadrado con lado de 6 cm es:',
    questionLatex: '\\text{El área de un cuadrado con lado de 6 cm es:}',
    options: ['12 cm²', '24 cm²', '36 cm²', '48 cm²'],
    correctAnswer: 2,
    explanation: 'El área de un cuadrado es lado al cuadrado:',
    explanationLatex: 'A = l^2 = 6^2 = 36 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-cuadrados', 'geometria-area', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-35',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si dos ángulos son suplementarios y uno mide 110°, ¿cuánto mide el otro?',
    questionLatex: '\\text{Si dos ángulos son suplementarios y uno mide } 110^\\circ\\text{, ¿cuánto mide el otro?}',
    options: ['70°', '80°', '90°', '180°'],
    correctAnswer: 0,
    explanation: 'Ángulos suplementarios suman 180°:',
    explanationLatex: '180^\\circ - 110^\\circ = 70^\\circ',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-angulos-suplementarios', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-36',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El perímetro de un triángulo equilátero con lado de 5 cm es:',
    questionLatex: '\\text{El perímetro de un triángulo equilátero con lado de 5 cm es:}',
    options: ['10 cm', '15 cm', '20 cm', '25 cm'],
    correctAnswer: 1,
    explanation: 'Un triángulo equilátero tiene tres lados iguales:',
    explanationLatex: 'P = 3 \\times 5 = 15 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-37',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un triángulo con base 8 cm y altura 6 cm es:',
    questionLatex: '\\text{El área de un triángulo con base 8 cm y altura 6 cm es:}',
    options: ['14 cm²', '24 cm²', '28 cm²', '48 cm²'],
    correctAnswer: 1,
    explanation: 'El área de un triángulo es base por altura dividido entre 2:',
    explanationLatex: 'A = \\frac{b \\times h}{2} = \\frac{8 \\times 6}{2} = \\frac{48}{2} = 24 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-area-triangulo', 'geometria-area', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },

  // BATCH 1: ÁNGULOS Y RELACIONES ANGULARES (15 questions)

  // Tipos de ángulos (3)
  {
    id: 'm1-132',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un ángulo que mide 45° se clasifica como:',
    questionLatex: '\\text{Un ángulo que mide } 45^\\circ \\text{ se clasifica como:}',
    options: ['Agudo', 'Recto', 'Obtuso', 'Llano'],
    correctAnswer: 0,
    explanation: 'Los ángulos agudos miden menos de 90°:',
    explanationLatex: '0^\\circ < 45^\\circ < 90^\\circ \\rightarrow \\text{Ángulo agudo}',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-clasificacion-angulos']
  },
  {
    id: 'm1-133',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un ángulo que mide 135° se clasifica como:',
    questionLatex: '\\text{Un ángulo que mide } 135^\\circ \\text{ se clasifica como:}',
    options: ['Agudo', 'Recto', 'Obtuso', 'Llano'],
    correctAnswer: 2,
    explanation: 'Los ángulos obtusos miden más de 90° pero menos de 180°:',
    explanationLatex: '90^\\circ < 135^\\circ < 180^\\circ \\rightarrow \\text{Ángulo obtuso}',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-clasificacion-angulos']
  },
  {
    id: 'm1-134',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Cuánto mide un ángulo llano?',
    questionLatex: '\\text{¿Cuánto mide un ángulo llano?}',
    options: ['90°', '180°', '270°', '360°'],
    correctAnswer: 1,
    explanation: 'Un ángulo llano forma una línea recta:',
    explanationLatex: '\\text{Ángulo llano} = 180^\\circ',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-clasificacion-angulos']
  },

  // Ángulos complementarios y suplementarios (3)
  {
    id: 'm1-135',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si dos ángulos complementarios son iguales, ¿cuánto mide cada uno?',
    questionLatex: '\\text{Si dos ángulos complementarios son iguales, ¿cuánto mide cada uno?}',
    options: ['30°', '45°', '60°', '90°'],
    correctAnswer: 1,
    explanation: 'Dos ángulos complementarios suman 90°. Si son iguales:',
    explanationLatex: '2x = 90^\\circ \\rightarrow x = 45^\\circ',
    difficulty: 'medium',
    skills: ['geometria-angulos', 'geometria-angulos-complementarios', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-136',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si dos ángulos suplementarios son iguales, ¿cuánto mide cada uno?',
    questionLatex: '\\text{Si dos ángulos suplementarios son iguales, ¿cuánto mide cada uno?}',
    options: ['45°', '60°', '90°', '120°'],
    correctAnswer: 2,
    explanation: 'Dos ángulos suplementarios suman 180°. Si son iguales:',
    explanationLatex: '2x = 180^\\circ \\rightarrow x = 90^\\circ',
    difficulty: 'medium',
    skills: ['geometria-angulos', 'geometria-angulos-suplementarios', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-137',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El complemento de un ángulo de 27° es:',
    questionLatex: '\\text{El complemento de un ángulo de } 27^\\circ \\text{ es:}',
    options: ['53°', '63°', '153°', '333°'],
    correctAnswer: 1,
    explanation: 'El complemento se obtiene restando de 90°:',
    explanationLatex: '90^\\circ - 27^\\circ = 63^\\circ',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-angulos-complementarios', 'numeros-operaciones-basicas']
  },

  // Ángulos entre paralelas (3)
  {
    id: 'm1-138',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Dos rectas paralelas son cortadas por una transversal. Si un ángulo mide 70°, ¿cuánto mide su ángulo correspondiente?',
    questionLatex: '\\text{Dos paralelas cortadas por transversal. Si un ángulo mide } 70^\\circ\\text{, ¿ángulo correspondiente?}',
    options: ['70°', '110°', '120°', '180°'],
    correctAnswer: 0,
    explanation: 'Los ángulos correspondientes son iguales:',
    explanationLatex: '\\text{Ángulo correspondiente} = 70^\\circ',
    difficulty: 'medium',
    skills: ['geometria-angulos', 'geometria-rectas-paralelas', 'geometria-angulos-correspondientes']
  },
  {
    id: 'm1-139',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Dos paralelas cortadas por una transversal forman un ángulo de 65°. ¿Cuánto mide su ángulo alterno interno?',
    questionLatex: '\\text{Paralelas cortadas forman ángulo de } 65^\\circ\\text{. ¿Ángulo alterno interno?}',
    options: ['65°', '115°', '125°', '180°'],
    correctAnswer: 0,
    explanation: 'Los ángulos alternos internos son iguales:',
    explanationLatex: '\\text{Ángulo alterno interno} = 65^\\circ',
    difficulty: 'medium',
    skills: ['geometria-angulos', 'geometria-rectas-paralelas', 'geometria-angulos-alternos']
  },
  {
    id: 'm1-140',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'En dos rectas paralelas cortadas por una transversal, un ángulo mide 130°. ¿Cuánto mide su ángulo conjugado interno?',
    questionLatex: '\\text{Paralelas: ángulo } 130^\\circ\\text{. ¿Ángulo conjugado interno?}',
    options: ['50°', '60°', '70°', '130°'],
    correctAnswer: 0,
    explanation: 'Los ángulos conjugados internos son suplementarios:',
    explanationLatex: '180^\\circ - 130^\\circ = 50^\\circ',
    difficulty: 'hard',
    skills: ['geometria-angulos', 'geometria-rectas-paralelas', 'geometria-angulos-conjugados', 'numeros-operaciones-basicas']
  },

  // Ángulos opuestos por el vértice (3)
  {
    id: 'm1-141',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Dos rectas se intersectan formando un ángulo de 85°. ¿Cuánto mide su ángulo opuesto por el vértice?',
    questionLatex: '\\text{Rectas se intersectan con ángulo } 85^\\circ\\text{. ¿Ángulo opuesto por el vértice?}',
    options: ['85°', '95°', '175°', '275°'],
    correctAnswer: 0,
    explanation: 'Los ángulos opuestos por el vértice son iguales:',
    explanationLatex: '\\text{Ángulo opuesto} = 85^\\circ',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-angulos-opuestos']
  },
  {
    id: 'm1-142',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'En una intersección de rectas, dos ángulos adyacentes miden 3x y 5x. ¿Cuánto vale x?',
    questionLatex: '\\text{Intersección: ángulos adyacentes } 3x \\text{ y } 5x\\text{. ¿Valor de } x?',
    options: ['22.5°', '30°', '45°', '60°'],
    correctAnswer: 0,
    explanation: 'Ángulos adyacentes en una recta suman 180°:',
    explanationLatex: '3x + 5x = 180^\\circ \\rightarrow 8x = 180^\\circ \\rightarrow x = 22.5^\\circ',
    difficulty: 'hard',
    skills: ['geometria-angulos', 'geometria-angulos-adyacentes', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-143',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Dos líneas se cruzan. Si uno de los cuatro ángulos formados mide 40°, ¿cuántos ángulos de 40° hay en total?',
    questionLatex: '\\text{Dos líneas se cruzan. Un ángulo } 40^\\circ\\text{. ¿Cuántos ángulos de } 40^\\circ \\text{ hay?}',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: 'Hay dos pares de ángulos opuestos por el vértice:',
    explanationLatex: '\\text{Dos ángulos de } 40^\\circ \\text{ y dos de } 140^\\circ',
    difficulty: 'medium',
    skills: ['geometria-angulos', 'geometria-angulos-opuestos', 'geometria-angulos-adyacentes', 'numeros-operaciones-basicas']
  },

  // Ángulos en figuras (3)
  {
    id: 'm1-144',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Cuánto suman los ángulos internos de un triángulo?',
    questionLatex: '\\text{¿Suma de ángulos internos de un triángulo?}',
    options: ['90°', '180°', '270°', '360°'],
    correctAnswer: 1,
    explanation: 'La suma de los ángulos internos de cualquier triángulo es:',
    explanationLatex: '\\text{Suma} = 180^\\circ',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-angulos', 'geometria-suma-angulos']
  },
  {
    id: 'm1-145',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'En un triángulo, dos ángulos miden 50° y 60°. ¿Cuánto mide el tercer ángulo?',
    questionLatex: '\\text{Triángulo con ángulos } 50^\\circ \\text{ y } 60^\\circ\\text{. ¿Tercer ángulo?}',
    options: ['60°', '70°', '80°', '90°'],
    correctAnswer: 1,
    explanation: 'La suma de los tres ángulos debe ser 180°:',
    explanationLatex: '180^\\circ - 50^\\circ - 60^\\circ = 70^\\circ',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-angulos', 'geometria-suma-angulos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-146',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Cuánto suman los ángulos internos de un cuadrilátero?',
    questionLatex: '\\text{¿Suma de ángulos internos de un cuadrilátero?}',
    options: ['180°', '270°', '360°', '540°'],
    correctAnswer: 2,
    explanation: 'La suma de ángulos internos de un cuadrilátero es:',
    explanationLatex: '\\text{Suma} = (4-2) \\times 180^\\circ = 360^\\circ',
    difficulty: 'easy',
    skills: ['geometria-cuadrilateros', 'geometria-angulos', 'geometria-suma-angulos', 'numeros-operaciones-basicas']
  },

  // BATCH 2: TRIÁNGULOS Y PROPIEDADES (15 questions)

  // Clasificación de triángulos por lados (3)
  {
    id: 'm1-147',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un triángulo con tres lados de diferente longitud se llama:',
    questionLatex: '\\text{Triángulo con tres lados diferentes se llama:}',
    options: ['Equilátero', 'Isósceles', 'Escaleno', 'Rectángulo'],
    correctAnswer: 2,
    explanation: 'Clasificación por lados:',
    explanationLatex: '\\text{Escaleno: todos los lados diferentes}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-clasificacion-triangulos']
  },
  {
    id: 'm1-148',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un triángulo isósceles tiene:',
    questionLatex: '\\text{Un triángulo isósceles tiene:}',
    options: ['Tres lados iguales', 'Dos lados iguales', 'Ningún lado igual', 'Un ángulo recto'],
    correctAnswer: 1,
    explanation: 'Por definición:',
    explanationLatex: '\\text{Isósceles: dos lados iguales}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-clasificacion-triangulos']
  },
  {
    id: 'm1-149',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Cuántos ángulos iguales tiene un triángulo equilátero?',
    questionLatex: '\\text{¿Cuántos ángulos iguales tiene un triángulo equilátero?}',
    options: ['0', '1', '2', '3'],
    correctAnswer: 3,
    explanation: 'En un triángulo equilátero todos los lados y ángulos son iguales:',
    explanationLatex: '\\text{Cada ángulo mide } 60^\\circ',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-triangulo-equilatero', 'geometria-angulos']
  },

  // Clasificación de triángulos por ángulos (3)
  {
    id: 'm1-150',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un triángulo con un ángulo de 90° se llama:',
    questionLatex: '\\text{Triángulo con ángulo de } 90^\\circ \\text{ se llama:}',
    options: ['Acutángulo', 'Rectángulo', 'Obtusángulo', 'Equiángulo'],
    correctAnswer: 1,
    explanation: 'Por tener un ángulo recto:',
    explanationLatex: '\\text{Triángulo rectángulo}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-clasificacion-triangulos', 'geometria-triangulo-rectangulo']
  },
  {
    id: 'm1-151',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un triángulo con ángulos de 40°, 60° y 80° es:',
    questionLatex: '\\text{Triángulo con ángulos } 40^\\circ, 60^\\circ \\text{ y } 80^\\circ \\text{ es:}',
    options: ['Acutángulo', 'Rectángulo', 'Obtusángulo', 'No existe'],
    correctAnswer: 0,
    explanation: 'Todos los ángulos son menores que 90°:',
    explanationLatex: '\\text{Triángulo acutángulo}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-clasificacion-triangulos']
  },
  {
    id: 'm1-152',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si un triángulo tiene ángulos de 30° y 40°, ¿qué tipo de triángulo es según sus ángulos?',
    questionLatex: '\\text{Triángulo con ángulos } 30^\\circ \\text{ y } 40^\\circ\\text{, ¿tipo según ángulos?}',
    options: ['Acutángulo', 'Rectángulo', 'Obtusángulo', 'Falta información'],
    correctAnswer: 2,
    explanation: 'El tercer ángulo es 180° - 30° - 40° = 110°. Como 110° > 90°:',
    explanationLatex: '\\text{Triángulo obtusángulo}',
    difficulty: 'medium',
    skills: ['geometria-triangulos', 'geometria-clasificacion-triangulos', 'geometria-suma-angulos', 'numeros-operaciones-basicas']
  },

  // Perímetro de triángulos (3)
  {
    id: 'm1-153',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El perímetro de un triángulo con lados 5 cm, 7 cm y 8 cm es:',
    questionLatex: '\\text{Perímetro de triángulo con lados 5 cm, 7 cm y 8 cm:}',
    options: ['15 cm', '18 cm', '20 cm', '24 cm'],
    correctAnswer: 2,
    explanation: 'El perímetro es la suma de todos los lados:',
    explanationLatex: 'P = 5 + 7 + 8 = 20 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-154',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un triángulo isósceles tiene dos lados de 12 cm y un lado de 8 cm. ¿Cuál es su perímetro?',
    questionLatex: '\\text{Triángulo isósceles: dos lados 12 cm, un lado 8 cm. Perímetro?}',
    options: ['20 cm', '28 cm', '32 cm', '36 cm'],
    correctAnswer: 2,
    explanation: 'Sumamos los tres lados:',
    explanationLatex: 'P = 12 + 12 + 8 = 32 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-155',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si el perímetro de un triángulo equilátero es 36 cm, ¿cuánto mide cada lado?',
    questionLatex: '\\text{Triángulo equilátero con perímetro 36 cm. ¿Lado?}',
    options: ['9 cm', '12 cm', '15 cm', '18 cm'],
    correctAnswer: 1,
    explanation: 'En un triángulo equilátero, los tres lados son iguales:',
    explanationLatex: '\\text{Lado} = \\frac{36}{3} = 12 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-triangulo-equilatero', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },

  // Área de triángulos (3)
  {
    id: 'm1-156',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un triángulo con base 10 cm y altura 7 cm es:',
    questionLatex: '\\text{Área de triángulo: base 10 cm, altura 7 cm:}',
    options: ['17 cm²', '35 cm²', '70 cm²', '140 cm²'],
    correctAnswer: 1,
    explanation: 'Área del triángulo:',
    explanationLatex: 'A = \\frac{b \\times h}{2} = \\frac{10 \\times 7}{2} = 35 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-area-triangulo', 'geometria-area', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-157',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si el área de un triángulo es 48 cm² y su base mide 12 cm, ¿cuánto mide su altura?',
    questionLatex: '\\text{Área } 48 \\text{ cm}^2\\text{, base 12 cm. ¿Altura?}',
    options: ['4 cm', '6 cm', '8 cm', '12 cm'],
    correctAnswer: 2,
    explanation: 'Despejamos la altura de la fórmula del área:',
    explanationLatex: '48 = \\frac{12 \\times h}{2} \\rightarrow 96 = 12h \\rightarrow h = 8 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-triangulos', 'geometria-area-triangulo', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-158',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un triángulo tiene base 15 cm y altura 8 cm. Si duplicamos la base, ¿qué pasa con el área?',
    questionLatex: '\\text{Base 15 cm, altura 8 cm. Si duplicamos base, ¿qué pasa con área?}',
    options: ['Se mantiene', 'Se duplica', 'Se triplica', 'Se cuadruplica'],
    correctAnswer: 1,
    explanation: 'El área es proporcional a la base:',
    explanationLatex: 'A_{\\text{nuevo}} = \\frac{30 \\times 8}{2} = 2 \\times \\frac{15 \\times 8}{2} = 2A_{\\text{original}}',
    difficulty: 'medium',
    skills: ['geometria-triangulos', 'geometria-area-triangulo', 'geometria-proporciones', 'numeros-operaciones-basicas']
  },

  // Desigualdad triangular (3)
  {
    id: 'm1-159',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Puede existir un triángulo con lados 3 cm, 4 cm y 8 cm?',
    questionLatex: '\\text{¿Puede existir triángulo con lados 3 cm, 4 cm y 8 cm?}',
    options: ['Sí', 'No', 'Solo si es rectángulo', 'Falta información'],
    correctAnswer: 1,
    explanation: 'La suma de dos lados debe ser mayor que el tercero:',
    explanationLatex: '3 + 4 = 7 < 8 \\rightarrow \\text{No puede existir}',
    difficulty: 'medium',
    skills: ['geometria-triangulos', 'geometria-desigualdad-triangular']
  },
  {
    id: 'm1-160',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Cuál conjunto de medidas puede formar un triángulo?',
    questionLatex: '\\text{¿Qué conjunto forma un triángulo?}',
    options: ['2, 3, 6', '5, 5, 10', '4, 5, 8', '1, 2, 4'],
    correctAnswer: 2,
    explanation: 'Verificamos la desigualdad triangular para cada caso:',
    explanationLatex: '4 + 5 = 9 > 8 \\quad \\checkmark \\quad 4 + 8 = 12 > 5 \\quad \\checkmark \\quad 5 + 8 = 13 > 4 \\quad \\checkmark',
    difficulty: 'hard',
    skills: ['geometria-triangulos', 'geometria-desigualdad-triangular', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-161',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Dos lados de un triángulo miden 5 cm y 9 cm. ¿Cuál puede ser la medida del tercer lado?',
    questionLatex: '\\text{Dos lados: 5 cm y 9 cm. ¿Tercer lado posible?}',
    options: ['3 cm', '4 cm', '7 cm', '15 cm'],
    correctAnswer: 2,
    explanation: 'El tercer lado debe cumplir: 9 - 5 < x < 9 + 5:',
    explanationLatex: '4 < x < 14 \\rightarrow x = 7 \\text{ cm es válido}',
    difficulty: 'hard',
    skills: ['geometria-triangulos', 'geometria-desigualdad-triangular']
  },
];
