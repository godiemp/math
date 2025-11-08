import { Question } from '../../../types';

export const m1GeometriaPerimetroAreaQuestions: Question[] = [
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

  // BATCH 3: CUADRILÁTEROS Y POLÍGONOS (15 questions)

  // Propiedades de cuadriláteros (3)
  {
    id: 'm1-162',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un cuadrilátero con cuatro lados iguales y cuatro ángulos rectos es:',
    questionLatex: '\\text{Cuadrilátero con 4 lados iguales y 4 ángulos rectos es:}',
    options: ['Rombo', 'Rectángulo', 'Cuadrado', 'Trapecio'],
    correctAnswer: 2,
    explanation: 'Por definición:',
    explanationLatex: '\\text{Cuadrado: 4 lados iguales y 4 ángulos de } 90^\\circ',
    difficulty: 'easy',
    skills: ['geometria-cuadrilateros', 'geometria-cuadrados', 'geometria-clasificacion']
  },
  {
    id: 'm1-163',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un paralelogramo con cuatro lados iguales pero ángulos no rectos es:',
    questionLatex: '\\text{Paralelogramo con 4 lados iguales pero ángulos no rectos es:}',
    options: ['Cuadrado', 'Rectángulo', 'Rombo', 'Trapecio'],
    correctAnswer: 2,
    explanation: 'El rombo tiene lados iguales pero ángulos diferentes de 90°:',
    explanationLatex: '\\text{Rombo}',
    difficulty: 'easy',
    skills: ['geometria-cuadrilateros', 'geometria-rombo', 'geometria-clasificacion']
  },
  {
    id: 'm1-164',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un cuadrilátero con solo un par de lados paralelos se llama:',
    questionLatex: '\\text{Cuadrilátero con solo un par de lados paralelos:}',
    options: ['Paralelogramo', 'Trapecio', 'Rombo', 'Rectángulo'],
    correctAnswer: 1,
    explanation: 'Por definición:',
    explanationLatex: '\\text{Trapecio: solo un par de lados paralelos}',
    difficulty: 'easy',
    skills: ['geometria-cuadrilateros', 'geometria-trapecio', 'geometria-clasificacion']
  },

  // Perímetros de cuadriláteros (3)
  {
    id: 'm1-165',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El perímetro de un cuadrado con lado de 9 cm es:',
    questionLatex: '\\text{Perímetro de cuadrado con lado 9 cm:}',
    options: ['18 cm', '27 cm', '36 cm', '81 cm²'],
    correctAnswer: 2,
    explanation: 'El perímetro del cuadrado es 4 veces el lado:',
    explanationLatex: 'P = 4 \\times 9 = 36 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-cuadrados', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-166',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un rombo tiene todos sus lados de 7 cm. ¿Cuál es su perímetro?',
    questionLatex: '\\text{Rombo con lados de 7 cm. Perímetro?}',
    options: ['14 cm', '21 cm', '28 cm', '49 cm²'],
    correctAnswer: 2,
    explanation: 'El rombo tiene 4 lados iguales:',
    explanationLatex: 'P = 4 \\times 7 = 28 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-rombo', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-167',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El perímetro de un rectángulo es 40 cm y su ancho es 8 cm. ¿Cuál es su largo?',
    questionLatex: '\\text{Perímetro 40 cm, ancho 8 cm. ¿Largo?}',
    options: ['12 cm', '16 cm', '20 cm', '24 cm'],
    correctAnswer: 0,
    explanation: 'Usando P = 2(largo + ancho):',
    explanationLatex: '40 = 2(l + 8) \\rightarrow 20 = l + 8 \\rightarrow l = 12 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-rectangulos', 'geometria-perimetro', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },

  // Áreas de cuadriláteros (3)
  {
    id: 'm1-168',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un rectángulo con largo 14 cm y ancho 6 cm es:',
    questionLatex: '\\text{Área de rectángulo: largo 14 cm, ancho 6 cm:}',
    options: ['20 cm²', '40 cm²', '84 cm²', '168 cm²'],
    correctAnswer: 2,
    explanation: 'Área del rectángulo:',
    explanationLatex: 'A = l \\times w = 14 \\times 6 = 84 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-rectangulos', 'geometria-area', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-169',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si el área de un cuadrado es 49 cm², ¿cuánto mide su lado?',
    questionLatex: '\\text{Área de cuadrado } 49 \\text{ cm}^2\\text{. ¿Lado?}',
    options: ['6 cm', '7 cm', '8 cm', '12.25 cm'],
    correctAnswer: 1,
    explanation: 'El área del cuadrado es lado al cuadrado:',
    explanationLatex: 'A = l^2 \\rightarrow 49 = l^2 \\rightarrow l = \\sqrt{49} = 7 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-cuadrados', 'geometria-area', 'numeros-raices', 'numeros-potencias']
  },
  {
    id: 'm1-170',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un rombo tiene diagonales de 10 cm y 8 cm. ¿Cuál es su área?',
    questionLatex: '\\text{Rombo con diagonales 10 cm y 8 cm. Área?}',
    options: ['40 cm²', '80 cm²', '18 cm²', '20 cm²'],
    correctAnswer: 0,
    explanation: 'El área del rombo es producto de diagonales dividido 2:',
    explanationLatex: 'A = \\frac{d_1 \\times d_2}{2} = \\frac{10 \\times 8}{2} = 40 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-rombo', 'geometria-area', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },

  // Polígonos regulares (3)
  {
    id: 'm1-171',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Cuánto suman los ángulos internos de un pentágono?',
    questionLatex: '\\text{¿Suma de ángulos internos de un pentágono?}',
    options: ['360°', '540°', '720°', '900°'],
    correctAnswer: 1,
    explanation: 'Suma de ángulos internos: (n-2) × 180°:',
    explanationLatex: '(5-2) \\times 180^\\circ = 3 \\times 180^\\circ = 540^\\circ',
    difficulty: 'medium',
    skills: ['geometria-poligonos', 'geometria-suma-angulos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-172',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Cuánto mide cada ángulo interno de un hexágono regular?',
    questionLatex: '\\text{¿Ángulo interno de hexágono regular?}',
    options: ['108°', '120°', '135°', '140°'],
    correctAnswer: 1,
    explanation: 'Suma total: (6-2) × 180° = 720°. Cada ángulo:',
    explanationLatex: '\\frac{720^\\circ}{6} = 120^\\circ',
    difficulty: 'hard',
    skills: ['geometria-poligonos', 'geometria-poligonos-regulares', 'geometria-angulos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-173',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El perímetro de un octágono regular con lado de 5 cm es:',
    questionLatex: '\\text{Perímetro de octágono regular con lado 5 cm:}',
    options: ['25 cm', '32 cm', '40 cm', '45 cm'],
    correctAnswer: 2,
    explanation: 'Un octágono tiene 8 lados:',
    explanationLatex: 'P = 8 \\times 5 = 40 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-poligonos', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },

  // Diagonales (3)
  {
    id: 'm1-174',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Cuántas diagonales tiene un cuadrilátero?',
    questionLatex: '\\text{¿Cuántas diagonales tiene un cuadrilátero?}',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: 'Un cuadrilátero tiene 2 diagonales:',
    explanationLatex: '\\text{Diagonales} = \\frac{n(n-3)}{2} = \\frac{4(4-3)}{2} = 2',
    difficulty: 'easy',
    skills: ['geometria-cuadrilateros', 'geometria-diagonales']
  },
  {
    id: 'm1-175',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Cuántas diagonales tiene un pentágono?',
    questionLatex: '\\text{¿Cuántas diagonales tiene un pentágono?}',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: 'Usando la fórmula de diagonales:',
    explanationLatex: '\\text{Diagonales} = \\frac{5(5-3)}{2} = \\frac{5 \\times 2}{2} = 5',
    difficulty: 'medium',
    skills: ['geometria-poligonos', 'geometria-diagonales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-176',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'En un rectángulo, las diagonales:',
    questionLatex: '\\text{En un rectángulo, las diagonales:}',
    options: ['Son perpendiculares', 'Son iguales', 'Se bisecan en ángulos diferentes', 'No se cortan'],
    correctAnswer: 1,
    explanation: 'Propiedad del rectángulo:',
    explanationLatex: '\\text{Las diagonales son iguales en longitud}',
    difficulty: 'easy',
    skills: ['geometria-rectangulos', 'geometria-propiedades', 'geometria-diagonales']
  },

  // BATCH 4: PERÍMETRO Y ÁREA DE FIGURAS PLANAS (15 questions)

  // Área de paralelogramo (3)
  {
    id: 'm1-177',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un paralelogramo con base 12 cm y altura 7 cm es:',
    questionLatex: '\\text{Área de paralelogramo: base 12 cm, altura 7 cm:}',
    options: ['19 cm²', '38 cm²', '84 cm²', '168 cm²'],
    correctAnswer: 2,
    explanation: 'Área del paralelogramo:',
    explanationLatex: 'A = b \\times h = 12 \\times 7 = 84 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-paralelogramo', 'geometria-area', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-178',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un paralelogramo tiene área 60 cm² y base 10 cm. ¿Cuál es su altura?',
    questionLatex: '\\text{Área 60 cm}^2\\text{, base 10 cm. ¿Altura?}',
    options: ['5 cm', '6 cm', '7 cm', '8 cm'],
    correctAnswer: 1,
    explanation: 'Despejamos la altura:',
    explanationLatex: '60 = 10 \\times h \\rightarrow h = 6 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-paralelogramo', 'geometria-area', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-179',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Dos paralelogramos tienen la misma base. Si uno tiene el doble de altura que el otro, ¿cómo son sus áreas?',
    questionLatex: '\\text{Misma base, uno tiene doble altura. ¿Cómo son las áreas?}',
    options: ['Iguales', 'Una es el doble', 'Una es el triple', 'Una es el cuádruple'],
    correctAnswer: 1,
    explanation: 'El área es proporcional a la altura:',
    explanationLatex: 'A_2 = b \\times (2h) = 2(b \\times h) = 2A_1',
    difficulty: 'medium',
    skills: ['geometria-paralelogramo', 'geometria-area', 'geometria-proporciones']
  },

  // Área de trapecio (3)
  {
    id: 'm1-180',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un trapecio tiene bases de 8 cm y 12 cm, y altura de 5 cm. ¿Cuál es su área?',
    questionLatex: '\\text{Trapecio: bases 8 cm y 12 cm, altura 5 cm. Área?}',
    options: ['40 cm²', '50 cm²', '60 cm²', '100 cm²'],
    correctAnswer: 1,
    explanation: 'Área del trapecio:',
    explanationLatex: 'A = \\frac{(b_1 + b_2) \\times h}{2} = \\frac{(8 + 12) \\times 5}{2} = \\frac{100}{2} = 50 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-trapecio', 'geometria-area', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-181',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un trapecio es 72 cm². Si sus bases miden 10 cm y 14 cm, ¿cuál es su altura?',
    questionLatex: '\\text{Área 72 cm}^2\\text{, bases 10 cm y 14 cm. ¿Altura?}',
    options: ['4 cm', '6 cm', '8 cm', '12 cm'],
    correctAnswer: 1,
    explanation: 'Despejamos la altura:',
    explanationLatex: '72 = \\frac{(10 + 14) \\times h}{2} \\rightarrow 144 = 24h \\rightarrow h = 6 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-trapecio', 'geometria-area', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-182',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un trapecio isósceles tiene base mayor 16 cm, base menor 10 cm y lados iguales de 5 cm. ¿Cuál es su perímetro?',
    questionLatex: '\\text{Trapecio isósceles: bases 16 cm y 10 cm, lados 5 cm. Perímetro?}',
    options: ['31 cm', '36 cm', '41 cm', '46 cm'],
    correctAnswer: 1,
    explanation: 'Sumamos todos los lados:',
    explanationLatex: 'P = 16 + 10 + 5 + 5 = 36 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-trapecio', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },

  // Figuras compuestas (3)
  {
    id: 'm1-183',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Una figura está formada por un cuadrado de lado 6 cm y un triángulo de base 6 cm y altura 4 cm. ¿Cuál es el área total?',
    questionLatex: '\\text{Cuadrado (lado 6 cm) + triángulo (base 6 cm, altura 4 cm). Área total?}',
    options: ['36 cm²', '42 cm²', '48 cm²', '60 cm²'],
    correctAnswer: 2,
    explanation: 'Sumamos las áreas:',
    explanationLatex: 'A_{\\text{cuadrado}} = 36, \\quad A_{\\text{triángulo}} = \\frac{6 \\times 4}{2} = 12 \\quad \\Rightarrow \\quad A_{\\text{total}} = 48 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-area', 'geometria-figuras-compuestas', 'geometria-cuadrados', 'geometria-triangulos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-184',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un rectángulo de 10 cm × 8 cm tiene un rectángulo de 4 cm × 3 cm recortado de una esquina. ¿Cuál es el área restante?',
    questionLatex: '\\text{Rectángulo 10×8 menos rectángulo 4×3 recortado. Área restante?}',
    options: ['68 cm²', '72 cm²', '76 cm²', '80 cm²'],
    correctAnswer: 0,
    explanation: 'Restamos el área recortada:',
    explanationLatex: 'A = (10 \\times 8) - (4 \\times 3) = 80 - 12 = 68 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-area', 'geometria-figuras-compuestas', 'geometria-rectangulos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-185',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un terreno rectangular de 20 m × 15 m tiene un camino de 2 m de ancho alrededor. ¿Cuál es el área del camino?',
    questionLatex: '\\text{Terreno 20×15 m con camino 2 m alrededor. Área del camino?}',
    options: ['80 m²', '152 m²', '184 m²', '300 m²'],
    correctAnswer: 1,
    explanation: 'Área externa menos área interna:',
    explanationLatex: 'A_{\\text{camino}} = (24 \\times 19) - (20 \\times 15) = 456 - 300 = 156 \\text{ m}^2',
    difficulty: 'hard',
    skills: ['geometria-area', 'geometria-figuras-compuestas', 'geometria-rectangulos', 'numeros-operaciones-basicas']
  },

  // Relaciones de áreas (3)
  {
    id: 'm1-186',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si se duplican las dimensiones de un rectángulo, ¿qué sucede con su área?',
    questionLatex: '\\text{Si duplicamos dimensiones de rectángulo, ¿qué pasa con área?}',
    options: ['Se duplica', 'Se triplica', 'Se cuadruplica', 'Se mantiene'],
    correctAnswer: 2,
    explanation: 'El área es proporcional al producto de dimensiones:',
    explanationLatex: 'A_{\\text{nuevo}} = (2l)(2w) = 4(lw) = 4A_{\\text{original}}',
    difficulty: 'medium',
    skills: ['geometria-area', 'geometria-proporciones', 'geometria-rectangulos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-187',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Dos cuadrados tienen lados en razón 1:3. ¿En qué razón están sus áreas?',
    questionLatex: '\\text{Lados en razón 1:3. ¿Razón de áreas?}',
    options: ['1:3', '1:6', '1:9', '1:12'],
    correctAnswer: 2,
    explanation: 'Las áreas se relacionan con el cuadrado de la razón:',
    explanationLatex: '\\frac{A_1}{A_2} = \\left(\\frac{l_1}{l_2}\\right)^2 = \\left(\\frac{1}{3}\\right)^2 = \\frac{1}{9}',
    difficulty: 'hard',
    skills: ['geometria-area', 'geometria-proporciones', 'geometria-cuadrados', 'numeros-potencias', 'numeros-razones']
  },
  {
    id: 'm1-188',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un cuadrado y un rectángulo tienen el mismo perímetro de 40 cm. El rectángulo mide 12 cm de largo. ¿Cuál tiene mayor área?',
    questionLatex: '\\text{Cuadrado y rectángulo, perímetro 40 cm. Rectángulo: largo 12 cm. ¿Mayor área?}',
    options: ['Cuadrado', 'Rectángulo', 'Igual área', 'Falta información'],
    correctAnswer: 0,
    explanation: 'Cuadrado: lado 10 cm, área 100 cm². Rectángulo: 12×8 cm, área 96 cm²:',
    explanationLatex: 'A_{\\text{cuadrado}} = 100 > A_{\\text{rectángulo}} = 96',
    difficulty: 'hard',
    skills: ['geometria-area', 'geometria-perimetro', 'geometria-comparacion', 'geometria-cuadrados', 'geometria-rectangulos', 'numeros-operaciones-basicas']
  },

  // Conversión de unidades (3)
  {
    id: 'm1-189',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Cuántos centímetros cuadrados hay en 1 metro cuadrado?',
    questionLatex: '\\text{¿Cuántos cm}^2 \\text{ en 1 m}^2?',
    options: ['100', '1,000', '10,000', '100,000'],
    correctAnswer: 2,
    explanation: 'Conversión de unidades de área:',
    explanationLatex: '1 \\text{ m}^2 = (100 \\text{ cm})^2 = 10,000 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-area', 'geometria-unidades', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-190',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un cuadrado tiene área de 2.5 m². ¿Cuántos cm² son?',
    questionLatex: '\\text{Área 2.5 m}^2\\text{. ¿Cuántos cm}^2?',
    options: ['250', '2,500', '25,000', '250,000'],
    correctAnswer: 2,
    explanation: 'Multiplicamos por el factor de conversión:',
    explanationLatex: '2.5 \\text{ m}^2 \\times 10,000 = 25,000 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-area', 'geometria-unidades', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-191',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El perímetro de un terreno es 500 m. ¿Cuántos kilómetros son?',
    questionLatex: '\\text{Perímetro 500 m. ¿Cuántos km?}',
    options: ['0.05 km', '0.5 km', '5 km', '50 km'],
    correctAnswer: 1,
    explanation: 'Conversión de metros a kilómetros:',
    explanationLatex: '500 \\text{ m} = \\frac{500}{1000} = 0.5 \\text{ km}',
    difficulty: 'easy',
    skills: ['geometria-perimetro', 'geometria-unidades', 'numeros-decimales', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },

  // BATCH 5: CIRCUNFERENCIA Y CÍRCULO (14 questions, excluding m1-202)

  // Perímetro y circunferencia (3)
  {
    id: 'm1-192',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'La circunferencia de un círculo con radio 3 cm es aproximadamente (usar π ≈ 3.14):',
    questionLatex: '\\text{Circunferencia con radio 3 cm (usar } \\pi \\approx 3.14):',
    options: ['9.42 cm', '18.84 cm', '28.26 cm', '37.68 cm'],
    correctAnswer: 1,
    explanation: 'La circunferencia es:',
    explanationLatex: 'C = 2\\pi r = 2 \\times 3.14 \\times 3 = 18.84 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-circunferencia', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-193',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si el diámetro de un círculo es 10 cm, ¿cuál es su circunferencia? (usar π ≈ 3.14)',
    questionLatex: '\\text{Diámetro 10 cm. Circunferencia? (usar } \\pi \\approx 3.14)',
    options: ['15.7 cm', '31.4 cm', '62.8 cm', '78.5 cm'],
    correctAnswer: 1,
    explanation: 'La circunferencia usando diámetro:',
    explanationLatex: 'C = \\pi d = 3.14 \\times 10 = 31.4 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-circunferencia', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-194',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'La circunferencia de un círculo es 62.8 cm. ¿Cuál es su radio? (usar π ≈ 3.14)',
    questionLatex: '\\text{Circunferencia 62.8 cm. Radio? (usar } \\pi \\approx 3.14)',
    options: ['5 cm', '10 cm', '15 cm', '20 cm'],
    correctAnswer: 1,
    explanation: 'Despejamos el radio:',
    explanationLatex: 'C = 2\\pi r \\rightarrow 62.8 = 2(3.14)r \\rightarrow r = \\frac{62.8}{6.28} = 10 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-circunferencia', 'algebra-ecuaciones-lineales', 'numeros-decimales', 'numeros-operaciones-basicas']
  },

  // Área del círculo (3)
  {
    id: 'm1-195',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un círculo con radio 4 cm es aproximadamente (usar π ≈ 3.14):',
    questionLatex: '\\text{Área con radio 4 cm (usar } \\pi \\approx 3.14):',
    options: ['12.56 cm²', '25.12 cm²', '50.24 cm²', '100.48 cm²'],
    correctAnswer: 2,
    explanation: 'Área del círculo:',
    explanationLatex: 'A = \\pi r^2 = 3.14 \\times 4^2 = 3.14 \\times 16 = 50.24 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'geometria-area', 'numeros-potencias', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-196',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si el diámetro de un círculo es 12 cm, ¿cuál es su área? (usar π ≈ 3.14)',
    questionLatex: '\\text{Diámetro 12 cm. Área? (usar } \\pi \\approx 3.14)',
    options: ['37.68 cm²', '75.36 cm²', '113.04 cm²', '150.72 cm²'],
    correctAnswer: 2,
    explanation: 'Radio = 6 cm. Área:',
    explanationLatex: 'A = \\pi r^2 = 3.14 \\times 6^2 = 3.14 \\times 36 = 113.04 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'geometria-area', 'numeros-potencias', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-197',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un círculo es 78.5 cm². ¿Cuál es su radio? (usar π ≈ 3.14)',
    questionLatex: '\\text{Área 78.5 cm}^2\\text{. Radio? (usar } \\pi \\approx 3.14)',
    options: ['3 cm', '4 cm', '5 cm', '6 cm'],
    correctAnswer: 2,
    explanation: 'Despejamos el radio:',
    explanationLatex: '78.5 = 3.14 \\times r^2 \\rightarrow r^2 = 25 \\rightarrow r = 5 \\text{ cm}',
    difficulty: 'hard',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'algebra-ecuaciones-cuadraticas', 'numeros-raices', 'numeros-potencias', 'numeros-decimales', 'numeros-operaciones-basicas']
  },

  // Sectores y arcos (3)
  {
    id: 'm1-198',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un sector circular tiene ángulo central de 90° en un círculo de radio 6 cm. ¿Cuál es la longitud del arco? (usar π ≈ 3.14)',
    questionLatex: '\\text{Sector: 90°, radio 6 cm. Longitud de arco? (usar } \\pi \\approx 3.14)',
    options: ['4.71 cm', '9.42 cm', '14.13 cm', '18.84 cm'],
    correctAnswer: 1,
    explanation: '90° es 1/4 de la circunferencia total:',
    explanationLatex: 'L_{\\text{arco}} = \\frac{90}{360} \\times 2\\pi r = \\frac{1}{4} \\times 2(3.14)(6) = 9.42 \\text{ cm}',
    difficulty: 'hard',
    skills: ['geometria-circulos', 'geometria-sectores', 'geometria-arcos', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-199',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un semicírculo con radio 8 cm es aproximadamente (usar π ≈ 3.14):',
    questionLatex: '\\text{Área de semicírculo, radio 8 cm (usar } \\pi \\approx 3.14):',
    options: ['50.24 cm²', '100.48 cm²', '150.72 cm²', '200.96 cm²'],
    correctAnswer: 1,
    explanation: 'Área del semicírculo es la mitad del círculo completo:',
    explanationLatex: 'A = \\frac{\\pi r^2}{2} = \\frac{3.14 \\times 64}{2} = 100.48 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-sectores', 'geometria-area', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-200',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un cuarto de círculo (sector de 90°) tiene radio 10 cm. ¿Cuál es su área? (usar π ≈ 3.14)',
    questionLatex: '\\text{Cuarto de círculo, radio 10 cm. Área? (usar } \\pi \\approx 3.14)',
    options: ['39.25 cm²', '78.5 cm²', '117.75 cm²', '157 cm²'],
    correctAnswer: 1,
    explanation: 'Área es 1/4 del círculo completo:',
    explanationLatex: 'A = \\frac{\\pi r^2}{4} = \\frac{3.14 \\times 100}{4} = 78.5 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-sectores', 'geometria-area', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },

  // Relaciones círculo-cuadrado (2, excluding m1-202)
  {
    id: 'm1-201',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un círculo está inscrito en un cuadrado de lado 10 cm. ¿Cuál es el radio del círculo?',
    questionLatex: '\\text{Círculo inscrito en cuadrado de lado 10 cm. Radio?}',
    options: ['5 cm', '7.07 cm', '10 cm', '15 cm'],
    correctAnswer: 0,
    explanation: 'El diámetro del círculo inscrito es igual al lado del cuadrado:',
    explanationLatex: 'r = \\frac{10}{2} = 5 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-cuadrados', 'geometria-figuras-inscritas']
  },
  {
    id: 'm1-203',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si el radio de un círculo se triplica, ¿qué sucede con su área?',
    questionLatex: '\\text{Si triplicamos el radio, ¿qué pasa con el área?}',
    options: ['Se triplica', 'Se multiplica por 6', 'Se multiplica por 9', 'Se multiplica por 27'],
    correctAnswer: 2,
    explanation: 'El área es proporcional al cuadrado del radio:',
    explanationLatex: 'A_{\\text{nuevo}} = \\pi(3r)^2 = 9\\pi r^2 = 9A_{\\text{original}}',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'geometria-proporciones', 'numeros-potencias']
  },

  // Aplicaciones prácticas (3)
  {
    id: 'm1-204',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Una pista circular tiene un diámetro de 100 m. ¿Cuánto mide una vuelta completa? (usar π ≈ 3.14)',
    questionLatex: '\\text{Pista circular, diámetro 100 m. ¿Cuánto mide una vuelta? (usar } \\pi \\approx 3.14)',
    options: ['157 m', '314 m', '628 m', '785 m'],
    correctAnswer: 1,
    explanation: 'Una vuelta completa es la circunferencia:',
    explanationLatex: 'C = \\pi d = 3.14 \\times 100 = 314 \\text{ m}',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-circunferencia', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-205',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Una rueda tiene radio de 30 cm. ¿Cuántas vueltas da para recorrer 188.4 m? (usar π ≈ 3.14)',
    questionLatex: '\\text{Rueda radio 30 cm. ¿Vueltas para recorrer 188.4 m? (usar } \\pi \\approx 3.14)',
    options: ['50', '75', '100', '150'],
    correctAnswer: 2,
    explanation: 'Circunferencia: 2πr = 188.4 cm = 1.884 m. Vueltas:',
    explanationLatex: '\\frac{188.4}{1.884} = 100 \\text{ vueltas}',
    difficulty: 'hard',
    skills: ['geometria-circulos', 'geometria-circunferencia', 'geometria-aplicaciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-206',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un jardín circular tiene área de 314 m². ¿Cuál es su radio aproximadamente? (usar π ≈ 3.14)',
    questionLatex: '\\text{Jardín circular, área 314 m}^2\\text{. Radio aprox.? (usar } \\pi \\approx 3.14)',
    options: ['5 m', '10 m', '15 m', '20 m'],
    correctAnswer: 1,
    explanation: 'Despejamos el radio:',
    explanationLatex: '314 = 3.14 \\times r^2 \\rightarrow r^2 = 100 \\rightarrow r = 10 \\text{ m}',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'algebra-ecuaciones-cuadraticas', 'numeros-raices', 'numeros-decimales', 'numeros-operaciones-basicas']
  }
];
