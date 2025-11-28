import { Question } from '../../../types';

/**
 * M1-GEO-002: Perímetros y áreas de triángulos, paralelogramos, trapecios y círculos
 * Chilean PAES Curriculum - Geometry Subsection 002
 *
 * This subsection covers:
 * - A: Perímetro y área de triángulos
 * - B: Perímetro y área de paralelogramos
 * - C: Perímetro y área de trapecios
 * - D: Perímetro y área de círculos
 * - E: Problemas combinados de áreas
 *
 * Total: 78 questions
 */

export const m1Geo002Questions: Question[] = [
  {
    id: 'm1-6',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Empresa de decoración con mural circular. Radio 5 cm. Calcular área del círculo de diseño. (usar } \\pi \\approx 3.14)',
    options: ['31.4 cm²', '62.8 cm²', '78.5 cm²', '157 cm²'],
    correctAnswer: 2,
    explanation: 'A = \\pi r^2 = 3.14 \\times 5^2 = 3.14 \\times 25 = 78.5 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'geometria-area', 'numeros-potencias', 'numeros-decimales'],
    operacionBase: 'A = \\pi r^2'
  },
  {
    id: 'm1-17',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Carpintero construye estructura. Una viga forma 35° con horizontal. ¿Ángulo complementario?}',
    options: ['55°', '65°', '145°', '325°'],
    correctAnswer: 0,
    explanation: '90^\\circ - 35^\\circ = 55^\\circ',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-angulos-complementarios', 'numeros-operaciones-basicas'],
    operacionBase: '90^\\circ - \\alpha'
  },
  {
    id: 'm1-18',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Jardinero crea cantero rectangular. Largo 8 cm, ancho 5 cm. Perímetro?}',
    options: ['13 cm', '26 cm', '40 cm', '65 cm'],
    correctAnswer: 1,
    explanation: 'P = 2(\\text{largo} + \\text{ancho}) = 2(8 + 5) = 2(13) = 26 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-rectangulos', 'geometria-perimetro', 'numeros-operaciones-basicas'],
    operacionBase: 'P = 2(l + w)'
  },
  {
    id: 'm1-21',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Constructor diseña cornisa trapezoidal. Bases 6 cm y 10 cm, altura 4 cm. Área?}',
    options: ['24 cm²', '32 cm²', '40 cm²', '64 cm²'],
    correctAnswer: 1,
    explanation: 'A = \\frac{(b_1 + b_2) \\times h}{2} = \\frac{(6 + 10) \\times 4}{2} = \\frac{64}{2} = 32 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-trapecio', 'geometria-area', 'numeros-fracciones', 'numeros-operaciones-basicas'],
    operacionBase: 'A = \\frac{(b_1 + b_2) \\times h}{2}'
  },
  {
    id: 'm1-geo-visual-2',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Artesana teje mandalas. Círculo con radio 7 cm. Área? (usar } \\pi \\approx 3.14)',
    options: ['43.96 cm²', '98.91 cm²', '153.86 cm²', '153.94 cm²'],
    correctAnswer: 3,
    explanation: 'A = \\pi r^2 = 3.14 \\times 7^2 = 3.14 \\times 49 = 153.86 \\text{ cm}^2 \\approx 153.94 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'geometria-area', 'numeros-potencias', 'numeros-decimales', 'numeros-operaciones-basicas'],
    operacionBase: 'A = \\pi r^2',
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
    questionLatex: '\\text{Topógrafo mide ángulos. AOB = 60°, BOC = 50°. ¿Ángulo AOC?}',
    options: ['90°', '100°', '110°', '120°'],
    correctAnswer: 2,
    explanation: '\\angle AOC = \\angle AOB + \\angle BOC = 60^\\circ + 50^\\circ = 110^\\circ',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-angulos-adyacentes', 'numeros-operaciones-basicas'],
    operacionBase: '\\alpha + \\beta',
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
    questionLatex: '\\text{Diseñador especifica ventana rectangular. Largo 12 cm, ancho 5 cm. Perímetro?}',
    options: ['17 cm', '24 cm', '34 cm', '60 cm'],
    correctAnswer: 2,
    explanation: 'P = 2(l + w) = 2(12 + 5) = 2 \\times 17 = 34 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-rectangulos', 'geometria-perimetro', 'numeros-operaciones-basicas'],
    operacionBase: 'P = 2(l + w)',
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
    questionLatex: '\\text{Artesano fabrica señales triangulares. Triángulo equilátero, lado 8 cm. Perímetro?}',
    options: ['16 cm', '20 cm', '24 cm', '32 cm'],
    correctAnswer: 2,
    explanation: 'P = 3 \\times l = 3 \\times 8 = 24 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-perimetro', 'numeros-operaciones-basicas'],
    operacionBase: 'P = 3l',
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
    questionLatex: '\\text{Contratista pavimenta plazuela cuadrada. Lado 6 cm. Área?}',
    options: ['12 cm²', '24 cm²', '36 cm²', '48 cm²'],
    correctAnswer: 2,
    explanation: 'A = l^2 = 6^2 = 36 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-cuadrados', 'geometria-area', 'numeros-potencias', 'numeros-operaciones-basicas'],
    operacionBase: 'A = l^2'
  },
  {
    id: 'm1-35',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Ingeniero analiza ángulos en viga. Un ángulo mide 110°. ¿Ángulo suplementario?}',
    options: ['70°', '80°', '90°', '180°'],
    correctAnswer: 0,
    explanation: '180^\\circ - 110^\\circ = 70^\\circ',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-angulos-suplementarios', 'numeros-operaciones-basicas'],
    operacionBase: '180^\\circ - \\alpha'
  },
  {
    id: 'm1-36',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Diseñadora crea colgante triangular equilátero. Lado 5 cm. Perímetro?}',
    options: ['10 cm', '15 cm', '20 cm', '25 cm'],
    correctAnswer: 1,
    explanation: 'P = 3 \\times 5 = 15 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-perimetro', 'numeros-operaciones-basicas'],
    operacionBase: 'P = 3l'
  },
  {
    id: 'm1-37',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Paisajista diseña jardín triangular. Base 8 cm, altura 6 cm. Área?}',
    options: ['14 cm²', '24 cm²', '28 cm²', '48 cm²'],
    correctAnswer: 1,
    explanation: 'A = \\frac{b \\times h}{2} = \\frac{8 \\times 6}{2} = \\frac{48}{2} = 24 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-area-triangulo', 'geometria-area', 'numeros-fracciones', 'numeros-operaciones-basicas'],
    operacionBase: 'A = \\frac{b \\times h}{2}'
  },
  {
    id: 'm1-132',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '45^\\circ < 90^\\circ',
    questionLatex: '\\text{Un técnico de construcción necesita verificar que el ángulo de inclinación de una rampa de accesibilidad sea seguro. Midió el ángulo y encontró que mide } 45^\\circ\\text{. Según las normas de seguridad, los ángulos menores a } 90^\\circ \\text{ se consideran agudos y son adecuados para rampas. ¿Cómo se clasifica este ángulo de } 45^\\circ?',
    options: ['Agudo', 'Recto', 'Obtuso', 'Llano'],
    correctAnswer: 0,
    explanation: '0^\\circ < 45^\\circ < 90^\\circ \\rightarrow \\text{Ángulo agudo}',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-clasificacion-angulos']
  },
  {
    id: 'm1-133',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '90^\\circ < 135^\\circ < 180^\\circ',
    questionLatex: '\\text{Un diseñador de interiores está planificando la colocación de espejos en una sala. Uno de los espejos debe montarse en una esquina formando un ángulo de } 135^\\circ \\text{ con la pared. Este ángulo es importante para que el espejo refleje correctamente la luz. ¿Qué tipo de ángulo es } 135^\\circ?',
    options: ['Agudo', 'Recto', 'Obtuso', 'Llano'],
    correctAnswer: 2,
    explanation: '90^\\circ < 135^\\circ < 180^\\circ \\rightarrow \\text{Ángulo obtuso}',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-clasificacion-angulos']
  },
  {
    id: 'm1-134',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulo llano} = 180^\\circ',
    questionLatex: '\\text{Un albañil está construyendo una cerca recta en una propiedad. La cerca debe estar perfectamente recta, formando una línea continua. Para asegurar que la cerca esté correctamente alineada, verifica que el ángulo entre el piso y la cerca sea un ángulo llano. ¿Cuántos grados mide un ángulo llano?}',
    options: ['90°', '180°', '270°', '360°'],
    correctAnswer: 1,
    explanation: '\\text{Ángulo llano} = 180^\\circ',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-clasificacion-angulos']
  },
  {
    id: 'm1-135',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '2x = 90^\\circ \\rightarrow x = 45^\\circ',
    questionLatex: '\\text{Un carpintero necesita cortar dos piezas de madera que se unan formando ángulos complementarios iguales. Es decir, ambas piezas crean dos ángulos que suman } 90^\\circ \\text{ y cada ángulo debe tener la misma medida. ¿Cuántos grados debe medir cada ángulo?}',
    options: ['30°', '45°', '60°', '90°'],
    correctAnswer: 1,
    explanation: '2x = 90^\\circ \\rightarrow x = 45^\\circ',
    difficulty: 'medium',
    skills: ['geometria-angulos', 'geometria-angulos-complementarios', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-136',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '2x = 180^\\circ \\rightarrow x = 90^\\circ',
    questionLatex: '\\text{Un ingeniero estructural necesita diseñar dos vigas de soporte que formen ángulos suplementarios iguales. Las vigas se conectan en una línea recta y ambos ángulos deben ser idénticos. ¿Cuántos grados debe medir cada ángulo?}',
    options: ['45°', '60°', '90°', '120°'],
    correctAnswer: 2,
    explanation: '2x = 180^\\circ \\rightarrow x = 90^\\circ',
    difficulty: 'medium',
    skills: ['geometria-angulos', 'geometria-angulos-suplementarios', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-137',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '90^\\circ - 27^\\circ = 63^\\circ',
    questionLatex: '\\text{Un técnico de iluminación está instalando focos en un estudio fotográfico. Necesita un ángulo que sea complementario a uno de } 27^\\circ\\text{. El ángulo complementario es necesario para dirigir correctamente la luz. ¿Cuál es el complemento de un ángulo de } 27^\\circ?',
    options: ['53°', '63°', '153°', '333°'],
    correctAnswer: 1,
    explanation: '90^\\circ - 27^\\circ = 63^\\circ',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-angulos-complementarios', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-138',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulo correspondiente} = 70^\\circ',
    questionLatex: '\\text{Un topógrafo está midiendo terrenos divididos por caminos que cruzan dos líneas de propiedad paralelas. Encuentra que uno de los ángulos formados por un camino (transversal) con la primera línea mide } 70^\\circ\\text{. Necesita encontrar el ángulo correspondiente formado por el mismo camino con la segunda línea paralela. ¿Cuánto mide el ángulo correspondiente?}',
    options: ['70°', '110°', '120°', '180°'],
    correctAnswer: 0,
    explanation: '\\text{Ángulo correspondiente} = 70^\\circ',
    difficulty: 'medium',
    skills: ['geometria-angulos', 'geometria-rectas-paralelas', 'geometria-angulos-correspondientes']
  },
  {
    id: 'm1-139',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulo alterno interno} = 65^\\circ',
    questionLatex: '\\text{Un ferrocarril tiene dos vías paralelas. Un puente (transversal) cruza ambas vías formando ángulos. El medidor de ángulos detecta que el ángulo formado en la primera vía es de } 65^\\circ\\text{. El ingeniero necesita determinar el ángulo alterno interno formado en la segunda vía paralela. ¿Cuánto mide ese ángulo?}',
    options: ['65°', '115°', '125°', '180°'],
    correctAnswer: 0,
    explanation: '\\text{Ángulo alterno interno} = 65^\\circ',
    difficulty: 'medium',
    skills: ['geometria-angulos', 'geometria-rectas-paralelas', 'geometria-angulos-alternos']
  },
  {
    id: 'm1-140',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '180^\\circ - 130^\\circ = 50^\\circ',
    questionLatex: '\\text{Un arquitecto diseña un sistema de tuberías que atraviesa dos paredes paralelas. Una cañería forma un ángulo de } 130^\\circ \\text{ con la primera pared. El arquitecto necesita calcular el ángulo conjugado interno que forma la misma cañería con la segunda pared. ¿Cuál es el ángulo conjugado interno?}',
    options: ['50°', '60°', '70°', '130°'],
    correctAnswer: 0,
    explanation: '180^\\circ - 130^\\circ = 50^\\circ',
    difficulty: 'hard',
    skills: ['geometria-angulos', 'geometria-rectas-paralelas', 'geometria-angulos-conjugados', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-141',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulo opuesto por el vértice} = 85^\\circ',
    questionLatex: '\\text{Un artesano está creando una estructura de herrería con dos varillas metálicas que se cruzan. Las varillas forman cuatro ángulos en el punto de intersección. Uno de los ángulos mide } 85^\\circ\\text{. Para asegurar la simetría de su obra, necesita encontrar el ángulo opuesto por el vértice. ¿Cuánto mide ese ángulo?}',
    options: ['85°', '95°', '175°', '275°'],
    correctAnswer: 0,
    explanation: '\\text{Ángulo opuesto} = 85^\\circ',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-angulos-opuestos']
  },
  {
    id: 'm1-142',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '3x + 5x = 180^\\circ \\rightarrow x = 22.5^\\circ',
    questionLatex: '\\text{Un diseñador gráfico está creando un logotipo donde dos líneas se intersectan. Los dos ángulos adyacentes sobre una línea recta están expresados como } 3x \\text{ y } 5x \\text{ grados. El diseñador necesita encontrar el valor de } x\\text{. ¿Cuál es el valor de } x?',
    options: ['22.5°', '30°', '45°', '60°'],
    correctAnswer: 0,
    explanation: '3x + 5x = 180^\\circ \\rightarrow 8x = 180^\\circ \\rightarrow x = 22.5^\\circ',
    difficulty: 'hard',
    skills: ['geometria-angulos', 'geometria-angulos-adyacentes', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-143',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Dos ángulos de } 40^\\circ \\text{ y dos de } 140^\\circ',
    questionLatex: '\\text{Un instalador de baldosas está colocando mosaicos en un piso. Dos líneas se cruzan en el centro de un mosaico, formando cuatro ángulos. Si uno de los ángulos mide } 40^\\circ\\text{, el instalador necesita contar cuántos ángulos adicionales de } 40^\\circ \\text{ se forman en la intersección. ¿Cuántos ángulos de } 40^\\circ \\text{ hay en total?}',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: '\\text{Dos ángulos de } 40^\\circ \\text{ y dos de } 140^\\circ',
    difficulty: 'medium',
    skills: ['geometria-angulos', 'geometria-angulos-opuestos', 'geometria-angulos-adyacentes', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-144',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Suma de ángulos internos} = 180^\\circ',
    questionLatex: '\\text{Un profesor de arte está enseñando a sus estudiantes las propiedades de las formas triangulares. Un estudiante pregunta cuánto suman los ángulos internos de cualquier triángulo. ¿Cuál es la suma de los ángulos internos de un triángulo?}',
    options: ['90°', '180°', '270°', '360°'],
    correctAnswer: 1,
    explanation: '\\text{Suma} = 180^\\circ',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-angulos', 'geometria-suma-angulos']
  },
  {
    id: 'm1-145',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '180^\\circ - 50^\\circ - 60^\\circ = 70^\\circ',
    questionLatex: '\\text{Un navegante está trazando un triángulo de navegación en un mapa. Ha identificado que dos de los ángulos del triángulo miden } 50^\\circ \\text{ y } 60^\\circ\\text{. ¿Cuánto mide el tercer ángulo?}',
    options: ['60°', '70°', '80°', '90°'],
    correctAnswer: 1,
    explanation: '180^\\circ - 50^\\circ - 60^\\circ = 70^\\circ',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-angulos', 'geometria-suma-angulos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-146',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Suma de ángulos internos} = (4-2) \\times 180^\\circ = 360^\\circ',
    questionLatex: '\\text{Un paisajista está diseñando un jardín cuadrilátero (con cuatro lados). Necesita asegurarse de que todos los ángulos internos sumen correctamente para validar su diseño geométrico. ¿Cuál es la suma de los ángulos internos de un cuadrilátero?}',
    options: ['180°', '270°', '360°', '540°'],
    correctAnswer: 2,
    explanation: '\\text{Suma} = (4-2) \\times 180^\\circ = 360^\\circ',
    difficulty: 'easy',
    skills: ['geometria-cuadrilateros', 'geometria-angulos', 'geometria-suma-angulos', 'numeros-operaciones-basicas']
  },

  // Clasificación de triángulos por lados (3)
  {
    id: 'm1-147',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Clasificación de triángulos: Equilátero (3 lados iguales), Isósceles (2 lados iguales), Escaleno (sin lados iguales)}',
    questionLatex: '\\text{Un triángulo con tres lados de longitudes completamente diferentes se clasifica como:}',
    options: ['Equilátero', 'Isósceles', 'Escaleno', 'Rectángulo'],
    correctAnswer: 2,
    explanation: '\\text{Escaleno: todos los lados tienen diferentes medidas}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-clasificacion-triangulos']
  },
  {
    id: 'm1-148',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Triángulo isósceles: dos lados de igual longitud}',
    questionLatex: '\\text{Un triángulo que tiene dos lados de igual longitud se llama:}',
    options: ['Triángulo equilátero', 'Triángulo isósceles', 'Triángulo escaleno', 'Triángulo rectángulo'],
    correctAnswer: 1,
    explanation: '\\text{Isósceles: dos lados tienen la misma medida}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-clasificacion-triangulos']
  },
  {
    id: 'm1-149',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Triángulo equilátero: tres lados iguales, tres ángulos iguales de } 60^\\circ \\text{ cada uno}',
    questionLatex: '\\text{¿Cuántos ángulos iguales tiene un triángulo equilátero?}',
    options: ['0', '1', '2', '3'],
    correctAnswer: 3,
    explanation: '\\text{Los tres ángulos son iguales, cada uno mide } 60^\\circ',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-triangulo-equilatero', 'geometria-angulos']
  },

  // Clasificación de triángulos por ángulos (3)
  {
    id: 'm1-150',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Triángulo rectángulo: uno de sus ángulos internos mide } 90^\\circ',
    questionLatex: '\\text{Un triángulo con un ángulo de } 90^\\circ \\text{ se llama:}',
    options: ['Acutángulo', 'Rectángulo', 'Obtusángulo', 'Equiángulo'],
    correctAnswer: 1,
    explanation: '\\text{Triángulo rectángulo: uno de sus ángulos mide } 90^\\circ',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-clasificacion-triangulos', 'geometria-triangulo-rectangulo']
  },
  {
    id: 'm1-151',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Triángulo acutángulo: todos los ángulos internos son menores que } 90^\\circ',
    questionLatex: '\\text{Un triángulo con ángulos de } 40^\\circ, 60^\\circ \\text{ y } 80^\\circ \\text{ es:}',
    options: ['Acutángulo', 'Rectángulo', 'Obtusángulo', 'No existe'],
    correctAnswer: 0,
    explanation: '\\text{Todos los ángulos son menores que } 90^\\circ \\rightarrow \\text{ Triángulo acutángulo}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-clasificacion-triangulos']
  },
  {
    id: 'm1-152',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Suma de ángulos internos } = 180^\\circ \\text{; Triángulo obtusángulo si un ángulo } > 90^\\circ',
    questionLatex: '\\text{Un triángulo con ángulos de } 30^\\circ \\text{ y } 40^\\circ\\text{, ¿qué tipo de triángulo es según sus ángulos?}',
    options: ['Acutángulo', 'Rectángulo', 'Obtusángulo', 'Falta información'],
    correctAnswer: 2,
    explanation: '\\text{Tercer ángulo} = 180^\\circ - 30^\\circ - 40^\\circ = 110^\\circ > 90^\\circ \\rightarrow \\text{Obtusángulo}',
    difficulty: 'medium',
    skills: ['geometria-triangulos', 'geometria-clasificacion-triangulos', 'geometria-suma-angulos', 'numeros-operaciones-basicas']
  },

  // Perímetro de triángulos (3)
  {
    id: 'm1-153',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'P = a + b + c \\text{ donde } a, b, c \\text{ son los lados del triángulo}',
    questionLatex: '\\text{Perímetro de triángulo con lados 5 cm, 7 cm y 8 cm:}',
    options: ['15 cm', '18 cm', '20 cm', '24 cm'],
    correctAnswer: 2,
    explanation: 'P = 5 + 7 + 8 = 20 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-154',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'P = a + a + b \\text{ (triángulo isósceles con dos lados iguales } a \\text{ y uno diferente } b)',
    questionLatex: '\\text{Triángulo isósceles: dos lados 12 cm, un lado 8 cm. Perímetro?}',
    options: ['20 cm', '28 cm', '32 cm', '36 cm'],
    correctAnswer: 2,
    explanation: 'P = 12 + 12 + 8 = 32 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-155',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Triángulo equilátero: } P = 3l \\text{ donde } l \\text{ es la longitud de cada lado}',
    questionLatex: '\\text{Triángulo equilátero con perímetro 36 cm. ¿Lado?}',
    options: ['9 cm', '12 cm', '15 cm', '18 cm'],
    correctAnswer: 1,
    explanation: '\\text{Lado} = \\frac{36}{3} = 12 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-triangulo-equilatero', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },

  // Área de triángulos (3)
  {
    id: 'm1-156',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'A = \\frac{b \\times h}{2} \\text{ donde } b \\text{ es la base y } h \\text{ es la altura}',
    questionLatex: '\\text{Área de triángulo: base 10 cm, altura 7 cm:}',
    options: ['17 cm²', '35 cm²', '70 cm²', '140 cm²'],
    correctAnswer: 1,
    explanation: 'A = \\frac{b \\times h}{2} = \\frac{10 \\times 7}{2} = 35 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-triangulos', 'geometria-area-triangulo', 'geometria-area', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-157',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'h = \\frac{2A}{b} \\text{ donde } A \\text{ es el área, } b \\text{ es la base}',
    questionLatex: '\\text{Área } 48 \\text{ cm}^2\\text{, base 12 cm. ¿Altura?}',
    options: ['4 cm', '6 cm', '8 cm', '12 cm'],
    correctAnswer: 2,
    explanation: 'A = \\frac{b \\times h}{2} \\rightarrow h = \\frac{2A}{b} = \\frac{2(48)}{12} = 8 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-triangulos', 'geometria-area-triangulo', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-158',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Proporcionalidad del área: si base se duplica, área se duplica}',
    questionLatex: '\\text{Base 15 cm, altura 8 cm. Si duplicamos base, ¿qué pasa con el área?}',
    options: ['Se mantiene', 'Se duplica', 'Se triplica', 'Se cuadruplica'],
    correctAnswer: 1,
    explanation: 'A_{\\text{nuevo}} = \\frac{30 \\times 8}{2} = 2 \\times \\frac{15 \\times 8}{2} = 2A_{\\text{original}}',
    difficulty: 'medium',
    skills: ['geometria-triangulos', 'geometria-area-triangulo', 'geometria-proporciones', 'numeros-operaciones-basicas']
  },

  // Desigualdad triangular (3)
  {
    id: 'm1-159',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Desigualdad triangular: } a + b > c \\text{ para todos los pares de lados}',
    questionLatex: '\\text{¿Puede existir un triángulo con lados 3 cm, 4 cm y 8 cm?}',
    options: ['Sí', 'No', 'Solo si es rectángulo', 'Falta información'],
    correctAnswer: 1,
    explanation: '3 + 4 = 7 < 8 \\rightarrow \\text{No puede existir}',
    difficulty: 'medium',
    skills: ['geometria-triangulos', 'geometria-desigualdad-triangular']
  },
  {
    id: 'm1-160',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Desigualdad triangular: suma de dos lados } > \\text{ tercer lado}',
    questionLatex: '\\text{¿Qué conjunto forma un triángulo?}',
    options: ['2, 3, 6', '5, 5, 10', '4, 5, 8', '1, 2, 4'],
    correctAnswer: 2,
    explanation: '4 + 5 = 9 > 8 \\quad \\checkmark \\quad 4 + 8 = 12 > 5 \\quad \\checkmark \\quad 5 + 8 = 13 > 4 \\quad \\checkmark',
    difficulty: 'hard',
    skills: ['geometria-triangulos', 'geometria-desigualdad-triangular', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-161',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Desigualdad triangular: } |a - b| < c < a + b',
    questionLatex: '\\text{Dos lados: 5 cm y 9 cm. ¿Tercer lado posible?}',
    options: ['3 cm', '4 cm', '7 cm', '15 cm'],
    correctAnswer: 2,
    explanation: '|9 - 5| < x < 9 + 5 \\rightarrow 4 < x < 14 \\rightarrow x = 7 \\text{ cm es válido}',
    difficulty: 'hard',
    skills: ['geometria-triangulos', 'geometria-desigualdad-triangular']
  },
  {
    id: 'm1-162',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Piso con 4 lados iguales y 4 ángulos rectos de } 90^\\circ\\text{. ¿Qué cuadrilátero es?}',
    options: ['Rombo', 'Rectángulo', 'Cuadrado', 'Trapecio'],
    correctAnswer: 2,
    explanation: '\\text{Cuadrado: } 4 \\text{ lados iguales y } 4 \\text{ ángulos de } 90^\\circ',
    difficulty: 'easy',
    skills: ['geometria-cuadrilateros', 'geometria-cuadrados', 'geometria-clasificacion'],
    operacionBase: 'Cuadrilátero con 4 lados iguales y 4 ángulos = 90°'
  },
  {
    id: 'm1-163',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Paralelogramo con 4 lados iguales, sin ángulos rectos. ¿Cuál es?}',
    options: ['Cuadrado', 'Rectángulo', 'Rombo', 'Trapecio'],
    correctAnswer: 2,
    explanation: '\\text{Rombo: paralelogramo con 4 lados iguales y ángulos } \\neq 90^\\circ',
    difficulty: 'easy',
    skills: ['geometria-cuadrilateros', 'geometria-rombo', 'geometria-clasificacion'],
    operacionBase: 'Cuadrilátero con 4 lados iguales y ángulos ≠ 90°'
  },
  {
    id: 'm1-164',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Cuadrilátero con solo un par de lados paralelos. ¿Nombre?}',
    options: ['Paralelogramo', 'Trapecio', 'Rombo', 'Rectángulo'],
    correctAnswer: 1,
    explanation: '\\text{Trapecio: un par de lados paralelos}',
    difficulty: 'easy',
    skills: ['geometria-cuadrilateros', 'geometria-trapecio', 'geometria-clasificacion'],
    operacionBase: 'Cuadrilátero con solo un par de lados paralelos'
  },
  {
    id: 'm1-165',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Cuadrado con lado } 9 \\text{ cm. ¿Perímetro?}',
    options: ['18 cm', '27 cm', '36 cm', '81 cm²'],
    correctAnswer: 2,
    explanation: 'P = 4 \\times 9 = 36 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-cuadrados', 'geometria-perimetro', 'numeros-operaciones-basicas'],
    operacionBase: 'P = 4l'
  },
  {
    id: 'm1-166',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Rombo con lado } 7 \\text{ cm. ¿Perímetro?}',
    options: ['14 cm', '21 cm', '28 cm', '49 cm²'],
    correctAnswer: 2,
    explanation: 'P = 4 \\times 7 = 28 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-rombo', 'geometria-perimetro', 'numeros-operaciones-basicas'],
    operacionBase: 'P = 4l'
  },
  {
    id: 'm1-167',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Rectángulo: perímetro } 40 \\text{ cm, ancho } 8 \\text{ cm. ¿Largo?}',
    options: ['12 cm', '16 cm', '20 cm', '24 cm'],
    correctAnswer: 0,
    explanation: '40 = 2(l + 8) \\rightarrow 20 = l + 8 \\rightarrow l = 12 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-rectangulos', 'geometria-perimetro', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas'],
    operacionBase: 'P = 2(l + w), despejar l'
  },
  {
    id: 'm1-168',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Rectángulo: largo } 14 \\text{ cm, ancho } 6 \\text{ cm. ¿Área?}',
    options: ['20 cm²', '40 cm²', '84 cm²', '168 cm²'],
    correctAnswer: 2,
    explanation: 'A = l \\times w = 14 \\times 6 = 84 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-rectangulos', 'geometria-area', 'numeros-operaciones-basicas'],
    operacionBase: 'A = l × w'
  },
  {
    id: 'm1-169',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Cuadrado con área } 49 \\text{ cm}^2\\text{. ¿Lado?}',
    options: ['6 cm', '7 cm', '8 cm', '12.25 cm'],
    correctAnswer: 1,
    explanation: 'A = l^2 \\rightarrow 49 = l^2 \\rightarrow l = \\sqrt{49} = 7 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-cuadrados', 'geometria-area', 'numeros-raices', 'numeros-potencias'],
    operacionBase: 'A = l², despejar l'
  },
  {
    id: 'm1-170',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Rombo con diagonales } 10 \\text{ cm y } 8 \\text{ cm. ¿Área?}',
    options: ['40 cm²', '80 cm²', '18 cm²', '20 cm²'],
    correctAnswer: 0,
    explanation: 'A = \\frac{d_1 \\times d_2}{2} = \\frac{10 \\times 8}{2} = 40 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-rombo', 'geometria-area', 'numeros-fracciones', 'numeros-operaciones-basicas'],
    operacionBase: 'A = (d₁ × d₂) / 2'
  },
  {
    id: 'm1-171',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Pentágono: ¿suma de ángulos internos?}',
    options: ['360°', '540°', '720°', '900°'],
    correctAnswer: 1,
    explanation: '(5-2) \\times 180^\\circ = 3 \\times 180^\\circ = 540^\\circ',
    difficulty: 'medium',
    skills: ['geometria-poligonos', 'geometria-suma-angulos', 'numeros-operaciones-basicas'],
    operacionBase: '(n - 2) × 180°, n = 5'
  },
  {
    id: 'm1-172',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Hexágono regular: ¿ángulo interno?}',
    options: ['108°', '120°', '135°', '140°'],
    correctAnswer: 1,
    explanation: '\\frac{(6-2) \\times 180^\\circ}{6} = \\frac{720^\\circ}{6} = 120^\\circ',
    difficulty: 'hard',
    skills: ['geometria-poligonos', 'geometria-poligonos-regulares', 'geometria-angulos', 'numeros-operaciones-basicas'],
    operacionBase: '[(n - 2) × 180°] / n, n = 6'
  },
  {
    id: 'm1-173',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Octágono regular con lado } 5 \\text{ cm. ¿Perímetro?}',
    options: ['25 cm', '32 cm', '40 cm', '45 cm'],
    correctAnswer: 2,
    explanation: 'P = 8 \\times 5 = 40 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-poligonos', 'geometria-perimetro', 'numeros-operaciones-basicas'],
    operacionBase: 'P = 8l'
  },
  {
    id: 'm1-174',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Cuadrilátero: ¿cuántas diagonales?}',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: '\\text{Diagonales} = \\frac{n(n-3)}{2} = \\frac{4(4-3)}{2} = 2',
    difficulty: 'easy',
    skills: ['geometria-cuadrilateros', 'geometria-diagonales'],
    operacionBase: 'd = n(n - 3) / 2, n = 4'
  },
  {
    id: 'm1-175',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Pentágono: ¿cuántas diagonales?}',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: '\\text{Diagonales} = \\frac{5(5-3)}{2} = \\frac{5 \\times 2}{2} = 5',
    difficulty: 'medium',
    skills: ['geometria-poligonos', 'geometria-diagonales', 'numeros-operaciones-basicas'],
    operacionBase: 'd = n(n - 3) / 2, n = 5'
  },
  {
    id: 'm1-176',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{En un rectángulo, las diagonales:}',
    options: ['Son perpendiculares', 'Son iguales', 'Se bisecan en ángulos diferentes', 'No se cortan'],
    correctAnswer: 1,
    explanation: '\\text{Las diagonales del rectángulo son iguales en longitud}',
    difficulty: 'easy',
    skills: ['geometria-rectangulos', 'geometria-propiedades', 'geometria-diagonales'],
    operacionBase: 'Diagonales rectángulo: congruentes'
  },
  // m1-177: Área de paralelogramo
  {
    id: 'm1-177',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'A = b × h = 12 × 7',
    questionLatex: '\\text{Un arquitecto paisajista está diseñando un cantero con forma de paralelogramo para un parque público. Después de medir el terreno disponible, determina que la base del cantero debe ser de 12 cm en la maqueta (escala 1:100) y la altura perpendicular desde la base es de 7 cm. Necesita calcular el área exacta de la maqueta para comprender cómo lucirá el proyecto final. ¿Cuál es el área del paralelogramo en la maqueta?}',
    options: ['19 cm²', '38 cm²', '84 cm²', '168 cm²'],
    correctAnswer: 2,
    explanation: 'A = b \\times h = 12 \\times 7 = 84 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-paralelogramo', 'geometria-area', 'numeros-operaciones-basicas']
  },

  // m1-178: Altura de paralelogramo
  {
    id: 'm1-178',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'h = A ÷ b = 60 ÷ 10',
    questionLatex: '\\text{Un artista está creando un mural en forma de paralelogramo en una pared de una galería de arte. El mural debe ocupar exactamente 60 cm² de área según el contrato. El cliente especifica que la base del mural debe medir 10 cm de ancho. Para planificar correctamente la altura del mural y distribuir los elementos visuales, el artista necesita calcular la altura perpendicular del paralelogramo. ¿Cuál debe ser la altura del mural?}',
    options: ['5 cm', '6 cm', '7 cm', '8 cm'],
    correctAnswer: 1,
    explanation: 'A = b \\times h \\Rightarrow 60 = 10 \\times h \\Rightarrow h = 6 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-paralelogramo', 'geometria-area', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },

  // m1-179: Comparación de áreas de paralelogramos
  {
    id: 'm1-179',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'A₁ = bh, A₂ = b(2h) = 2bh',
    questionLatex: '\\text{Un desarrollador inmobiliario está evaluando dos terrenos con forma de paralelogramo para un proyecto. Ambos terrenos tienen exactamente la misma base de frente a la calle. Sin embargo, el segundo terreno tiene el doble de profundidad (altura) que el primero. Para decidir cuál comprar, necesita comparar sus áreas. ¿Cuál es la relación entre los áreas de estos dos terrenos?}',
    options: ['Iguales', 'Una es el doble', 'Una es el triple', 'Una es el cuádruple'],
    correctAnswer: 1,
    explanation: 'A_2 = b \\times (2h) = 2(b \\times h) = 2A_1',
    difficulty: 'medium',
    skills: ['geometria-paralelogramo', 'geometria-area', 'geometria-proporciones']
  },

  // m1-180: Área de trapecio
  {
    id: 'm1-180',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'A = (b₁ + b₂) × h ÷ 2 = (8 + 12) × 5 ÷ 2',
    questionLatex: '\\text{Un constructor está diseñando una cubierta con forma de trapecio para una cabaña de montaña. La base más ancha (inferior) debe medir 12 cm en la maqueta, la base más angosta (superior) debe medir 8 cm, y la altura vertical entre las dos bases es de 5 cm. Antes de comenzar la construcción real, necesita calcular el área exacta del diseño en la maqueta. ¿Cuál es el área del trapecio?}',
    options: ['40 cm²', '50 cm²', '60 cm²', '100 cm²'],
    correctAnswer: 1,
    explanation: 'A = \\frac{(b_1 + b_2) \\times h}{2} = \\frac{(8 + 12) \\times 5}{2} = \\frac{100}{2} = 50 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-trapecio', 'geometria-area', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },

  // m1-181: Altura de trapecio
  {
    id: 'm1-181',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'h = 2A ÷ (b₁ + b₂) = 144 ÷ 24',
    questionLatex: '\\text{Un diseñador de jardines está creando un cantero con forma de trapecio. El cliente especifica que el cantero debe tener un área de 72 cm². Las medidas de las bases ya están determinadas: 10 cm para la base menor y 14 cm para la base mayor. Sin embargo, falta establecer la altura perpendicular del trapecio. ¿Cuál debe ser la altura del cantero?}',
    options: ['4 cm', '6 cm', '8 cm', '12 cm'],
    correctAnswer: 1,
    explanation: '72 = \\frac{(10 + 14) \\times h}{2} \\Rightarrow 144 = 24h \\Rightarrow h = 6 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-trapecio', 'geometria-area', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },

  // m1-182: Perímetro de trapecio isósceles
  {
    id: 'm1-182',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'P = b₁ + b₂ + 2l = 16 + 10 + 5 + 5',
    questionLatex: '\\text{Un fabricante de marcos está diseñando un marco decorativo con forma de trapecio isósceles para una obra de arte. El cliente especifica que los lados paralelos (bases) del marco deben medir 16 cm (base mayor) y 10 cm (base menor), mientras que los dos lados iguales no paralelos deben medir 5 cm cada uno. Para ordenar la cantidad exacta de material de borde decorativo, el fabricante necesita calcular el perímetro total del trapecio. ¿Cuál es el perímetro?}',
    options: ['31 cm', '36 cm', '41 cm', '46 cm'],
    correctAnswer: 1,
    explanation: 'P = 16 + 10 + 5 + 5 = 36 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-trapecio', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },

  // m1-183: Figuras compuestas (cuadrado + triángulo)
  {
    id: 'm1-183',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'A_total = A_cuadrado + A_triángulo = 36 + 12',
    questionLatex: '\\text{Un arquitecto está diseñando el techo de una casa que consiste en dos partes: la base es un cuadrado con lado de 6 cm en la maqueta, y sobre él se coloca un triángulo isósceles (forma de tejado puntiagudo) que tiene la misma base de 6 cm y una altura de 4 cm. Para estimar la cantidad de materiales necesarios, el arquitecto debe calcular el área total del diseño. ¿Cuál es el área total de la figura compuesta?}',
    options: ['36 cm²', '42 cm²', '48 cm²', '60 cm²'],
    correctAnswer: 2,
    explanation: 'A_{\\text{cuadrado}} = 6^2 = 36, \\quad A_{\\text{triángulo}} = \\frac{6 \\times 4}{2} = 12 \\quad \\Rightarrow \\quad A_{\\text{total}} = 48 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-area', 'geometria-figuras-compuestas', 'geometria-cuadrados', 'geometria-triangulos', 'numeros-operaciones-basicas']
  },

  // m1-184: Rectángulo con recorte
  {
    id: 'm1-184',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'A_restante = A_total - A_recorte = 80 - 12',
    questionLatex: '\\text{Un carpintero está creando una bandeja de madera con forma rectangular de 10 cm } \\times \\text{ 8 cm. Sin embargo, necesita hacer un recorte rectangular en una esquina para instalar un mecanismo. El recorte tendrá dimensiones de 4 cm } \\times \\text{ 3 cm. Para estimar la cantidad de pintura o barniz que necesitará, debe calcular el área útil (visible) que quedará después del recorte. ¿Cuál es el área restante de la bandeja?}',
    options: ['68 cm²', '72 cm²', '76 cm²', '80 cm²'],
    correctAnswer: 0,
    explanation: 'A_{\\text{restante}} = (10 \\times 8) - (4 \\times 3) = 80 - 12 = 68 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-area', 'geometria-figuras-compuestas', 'geometria-rectangulos', 'numeros-operaciones-basicas']
  },

  // m1-185: Área de camino alrededor de terreno
  {
    id: 'm1-185',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'A_camino = A_exterior - A_interior = 456 - 300',
    questionLatex: '\\text{Un paisajista está diseñando un parque con un terreno rectangular de 20 m } \\times \\text{ 15 m. Alrededor de toda la perímetro del terreno, se construirá un camino de acceso de 2 m de ancho. Para presupuestar los materiales para el camino (grava, cemento, etc.), el paisajista necesita calcular exactamente cuánta área ocupará el camino. ¿Cuál es el área del camino?}',
    options: ['80 m²', '152 m²', '184 m²', '300 m²'],
    correctAnswer: 1,
    explanation: 'A_{\\text{camino}} = (24 \\times 19) - (20 \\times 15) = 456 - 300 = 156 \\text{ m}^2',
    difficulty: 'hard',
    skills: ['geometria-area', 'geometria-figuras-compuestas', 'geometria-rectangulos', 'numeros-operaciones-basicas']
  },

  // m1-186: Efecto de duplicar dimensiones en el área
  {
    id: 'm1-186',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'A_nuevo = (2l)(2w) = 4lw',
    questionLatex: '\\text{Un agrónomo está comparando dos parcelas rectangulares para cultivo. La segunda parcela tiene exactamente el doble de largo y el doble de ancho que la primera. Necesita entender cómo afecta este cambio proporcional al área total disponible para plantar. ¿Qué sucede con el área cuando se duplican ambas dimensiones de un rectángulo?}',
    options: ['Se duplica', 'Se triplica', 'Se cuadruplica', 'Se mantiene'],
    correctAnswer: 2,
    explanation: 'A_{\\text{nuevo}} = (2l)(2w) = 4(lw) = 4A_{\\text{original}}',
    difficulty: 'medium',
    skills: ['geometria-area', 'geometria-proporciones', 'geometria-rectangulos', 'numeros-operaciones-basicas']
  },

  // m1-187: Razón de áreas con lados en razón 1:3
  {
    id: 'm1-187',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '(A₁/A₂) = (l₁/l₂)² = (1/3)²',
    questionLatex: '\\text{Una constructora está evaluando dos terrenos cuadrados para un proyecto. El primer terreno tiene un lado de 10 m, mientras que el segundo terreno tiene un lado de 30 m. Un consultor inmobiliario le pide que determine la relación entre sus áreas para entender cómo escalan los costos de desarrollo según el tamaño. Si los lados están en razón 1:3, ¿en qué razón están sus áreas?}',
    options: ['1:3', '1:6', '1:9', '1:12'],
    correctAnswer: 2,
    explanation: '\\frac{A_1}{A_2} = \\left(\\frac{l_1}{l_2}\\right)^2 = \\left(\\frac{1}{3}\\right)^2 = \\frac{1}{9}',
    difficulty: 'hard',
    skills: ['geometria-area', 'geometria-proporciones', 'geometria-cuadrados', 'numeros-potencias', 'numeros-razones']
  },

  // m1-188: Comparación de áreas con mismo perímetro
  {
    id: 'm1-188',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'A_cuadrado = 10² = 100, A_rectángulo = 12 × 8 = 96',
    questionLatex: '\\text{Un granjero tiene dos parcelas con el mismo perímetro de 40 m para elegir donde cultivar. Una parcela es un cuadrado perfecto, mientras que la otra es rectangular con 12 m de largo. El granjero necesita determinar cuál parcela ofrece más espacio para maximizar su producción. ¿Cuál de las dos parcelas tiene mayor área?}',
    options: ['Cuadrado', 'Rectángulo', 'Igual área', 'Falta información'],
    correctAnswer: 0,
    explanation: 'A_{\\text{cuadrado}} = 10^2 = 100 \\text{ m}^2 \\quad \\text{vs} \\quad A_{\\text{rectángulo}} = 12 \\times 8 = 96 \\text{ m}^2',
    difficulty: 'hard',
    skills: ['geometria-area', 'geometria-perimetro', 'geometria-comparacion', 'geometria-cuadrados', 'geometria-rectangulos', 'numeros-operaciones-basicas']
  },

  // m1-189: Conversión de m² a cm²
  {
    id: 'm1-189',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '1 m² = (100 cm)² = 10,000 cm²',
    questionLatex: '\\text{Un fabricante de azulejos está recibiendo un pedido especificado en metros cuadrados, pero su sistema de inventario funciona en centímetros cuadrados. Para asegurar que tiene suficiente material en stock, debe convertir las medidas. ¿Cuántos centímetros cuadrados hay en 1 metro cuadrado?}',
    options: ['100', '1,000', '10,000', '100,000'],
    correctAnswer: 2,
    explanation: '1 \\text{ m}^2 = (100 \\text{ cm})^2 = 10,000 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-area', 'geometria-unidades', 'numeros-potencias', 'numeros-operaciones-basicas']
  },

  // m1-190: Conversión de área 2.5 m² a cm²
  {
    id: 'm1-190',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '2.5 m² × 10,000 cm²/m² = 25,000 cm²',
    questionLatex: '\\text{Un artesano necesita encargo de tela especial de 2.5 m² para un proyecto de costura, pero el proveedor internacional muestra el precio por centímetro cuadrado. Para calcular el costo total, el artesano necesita convertir el área a centímetros cuadrados. ¿Cuántos centímetros cuadrados representan 2.5 m²?}',
    options: ['250', '2,500', '25,000', '250,000'],
    correctAnswer: 2,
    explanation: '2.5 \\text{ m}^2 \\times 10,000 \\frac{\\text{cm}^2}{\\text{m}^2} = 25,000 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-area', 'geometria-unidades', 'numeros-decimales', 'numeros-operaciones-basicas']
  },

  // m1-191: Conversión de metros a kilómetros
  {
    id: 'm1-191',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '500 m ÷ 1,000 m/km = 0.5 km',
    questionLatex: '\\text{Un entrenador está diseñando una ruta de entrenamiento para maratonistas. El perímetro total del circuito de entrenamiento en el parque es de 500 metros. Para elaborar un plan de entrenamiento estructurado en kilómetros (completar múltiples vueltas), necesita convertir esta medida. ¿Cuántos kilómetros es el perímetro de 500 metros?}',
    options: ['0.05 km', '0.5 km', '5 km', '50 km'],
    correctAnswer: 1,
    explanation: '500 \\text{ m} = \\frac{500}{1000} = 0.5 \\text{ km}',
    difficulty: 'easy',
    skills: ['geometria-perimetro', 'geometria-unidades', 'numeros-decimales', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-192',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'C = 2\\pi r',
    questionLatex: '\\text{Un diseñador gráfico está creando un logotipo circular para una empresa. La medida más importante es la circunferencia del círculo, que determina el tamaño final del diseño. Se sabe que el radio del círculo es de 3 centímetros. Para calcular la circunferencia exacta y asegurar que el tamaño sea el correcto antes de imprimirlo, necesita determinar cuántos centímetros mide el perímetro del círculo. ¿Cuál es la circunferencia del círculo? (usar } \\pi \\approx 3.14)',
    options: ['9.42 cm', '18.84 cm', '28.26 cm', '37.68 cm'],
    correctAnswer: 1,
    explanation: 'C = 2\\pi r = 2 \\times 3.14 \\times 3 = 18.84 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-circunferencia', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-193',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'C = \\pi d',
    questionLatex: '\\text{Un constructor está diseñando un pozo circular para un parque municipal. El pozo debe tener un diámetro de 10 centímetros en el plano de construcción. Antes de proceder con la excavación, el ingeniero necesita calcular el perímetro exacto del pozo para determinar cuántos metros de borde de seguridad deberá instalar alrededor de él. ¿Cuál es la circunferencia del pozo? (usar } \\pi \\approx 3.14)',
    options: ['15.7 cm', '31.4 cm', '62.8 cm', '78.5 cm'],
    correctAnswer: 1,
    explanation: 'C = \\pi d = 3.14 \\times 10 = 31.4 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-circunferencia', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-194',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'r = \\frac{C}{2\\pi}',
    questionLatex: '\\text{Un artesano está fabricando pulseras circulares personalizadas. Un cliente especifica que la pulsera debe tener una circunferencia exacta de 62.8 centímetros para que le quede perfectamente en la muñeca. Para fabricar la pulsera con el tamaño correcto, el artesano necesita determinar el radio de la pulsera a partir de esta medida de circunferencia. ¿Cuál es el radio de la pulsera? (usar } \\pi \\approx 3.14)',
    options: ['5 cm', '10 cm', '15 cm', '20 cm'],
    correctAnswer: 1,
    explanation: 'C = 2\\pi r \\rightarrow r = \\frac{C}{2\\pi} = \\frac{62.8}{2(3.14)} = \\frac{62.8}{6.28} = 10 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-circunferencia', 'algebra-ecuaciones-lineales', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-195',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'A = \\pi r^2',
    questionLatex: '\\text{Un paisajista está diseñando un jardín circular para un hotel de lujo. El diseño requiere un jardín con un radio de 4 metros. El hotel necesita saber cuántos metros cuadrados de terreno se usarán para poder hacer el presupuesto de plantas, riego y mantenimiento del jardín circular. ¿Cuál es el área exacta del jardín? (usar } \\pi \\approx 3.14)',
    options: ['12.56 cm²', '25.12 cm²', '50.24 cm²', '100.48 cm²'],
    correctAnswer: 2,
    explanation: 'A = \\pi r^2 = 3.14 \\times 4^2 = 3.14 \\times 16 = 50.24 \\text{ m}^2',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'geometria-area', 'numeros-potencias', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-196',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'A = \\pi r^2, \\quad r = \\frac{d}{2}',
    questionLatex: '\\text{Un fabricante de pizzas necesita rediseñar sus empaques para una nueva línea de pizzas. Las pizzas ahora tienen un diámetro de 12 centímetros. Para determinar cuánto material de cartón se necesita para hacer las cajas personalizadas que se adapten perfectamente a estas pizzas, el fabricante debe calcular el área exacta de la pizza. ¿Cuál es el área de la pizza? (usar } \\pi \\approx 3.14)',
    options: ['37.68 cm²', '75.36 cm²', '113.04 cm²', '150.72 cm²'],
    correctAnswer: 2,
    explanation: 'r = \\frac{d}{2} = \\frac{12}{2} = 6 \\text{ cm} \\quad \\Rightarrow \\quad A = \\pi r^2 = 3.14 \\times 6^2 = 3.14 \\times 36 = 113.04 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'geometria-area', 'numeros-potencias', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-197',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'r = \\sqrt{\\frac{A}{\\pi}}',
    questionLatex: '\\text{Un arqueólogo está excavando un sitio antiguo y ha descubierto los restos de una estructura circular perfecta. Mediante mediciones de los escombros, determina que el área total de la estructura es de 78.5 metros cuadrados. Para entender mejor las dimensiones de la estructura antigua y reconstruir su apariencia original, necesita calcular el radio exacto de esta construcción circular. ¿Cuál es el radio de la estructura? (usar } \\pi \\approx 3.14)',
    options: ['3 m', '4 m', '5 m', '6 m'],
    correctAnswer: 2,
    explanation: 'A = \\pi r^2 \\rightarrow r^2 = \\frac{A}{\\pi} = \\frac{78.5}{3.14} = 25 \\rightarrow r = \\sqrt{25} = 5 \\text{ m}',
    difficulty: 'hard',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'algebra-ecuaciones-cuadraticas', 'numeros-raices', 'numeros-potencias', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-198',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'L_{arco} = \\frac{\\theta}{360} \\times 2\\pi r',
    questionLatex: '\\text{Un relojero está diseñando un reloj de pared de lujo con un estilo moderno. El reloj tiene un radio de 6 centímetros. Para decorar el reloj, el diseñador desea agregar un arco dorado entre las 12 y las 3 horas, lo que forma un ángulo central de 90 grados. Antes de encargar el material dorado al fabricante, necesita calcular la longitud exacta del arco que decorará el reloj. ¿Cuál es la longitud del arco? (usar } \\pi \\approx 3.14)',
    options: ['4.71 cm', '9.42 cm', '14.13 cm', '18.84 cm'],
    correctAnswer: 1,
    explanation: 'L_{arco} = \\frac{90}{360} \\times 2\\pi r = \\frac{1}{4} \\times 2(3.14)(6) = \\frac{1}{4} \\times 37.68 = 9.42 \\text{ cm}',
    difficulty: 'hard',
    skills: ['geometria-circulos', 'geometria-sectores', 'geometria-arcos', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-199',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'A_{semicirculo} = \\frac{\\pi r^2}{2}',
    questionLatex: '\\text{Un arquitecto está diseñando la fachada de un edificio moderno que incluye una ventana semicircular decorativa en el techo. Esta ventana tendrá un radio de 8 metros para permitir la entrada de abundante luz natural. El arquitecto necesita calcular cuántos metros cuadrados de vidrio especial se requieren para fabricar esta ventana semicircular única. ¿Cuál es el área de la ventana semicircular? (usar } \\pi \\approx 3.14)',
    options: ['50.24 m²', '100.48 m²', '150.72 m²', '200.96 m²'],
    correctAnswer: 1,
    explanation: 'A_{semicirculo} = \\frac{\\pi r^2}{2} = \\frac{3.14 \\times 8^2}{2} = \\frac{3.14 \\times 64}{2} = \\frac{200.96}{2} = 100.48 \\text{ m}^2',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-sectores', 'geometria-area', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-200',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'A_{cuadrante} = \\frac{\\pi r^2}{4}',
    questionLatex: '\\text{Un diseñador de interiores está creando un sofá modular en forma de cuarto de círculo para una sala de estar de forma particular. El sofá tendrá un radio de 10 metros. Para calcular cuánto material tapizado se necesita para cubrir completamente esta sección curva del sofá, el diseñador debe determinar el área exacta de la superficie del cuadrante circular. ¿Cuál es el área del sofá? (usar } \\pi \\approx 3.14)',
    options: ['39.25 m²', '78.5 m²', '117.75 m²', '157 m²'],
    correctAnswer: 1,
    explanation: 'A_{cuadrante} = \\frac{\\pi r^2}{4} = \\frac{3.14 \\times 10^2}{4} = \\frac{3.14 \\times 100}{4} = \\frac{314}{4} = 78.5 \\text{ m}^2',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-sectores', 'geometria-area', 'numeros-fracciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-201',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'r = \\frac{s}{2}',
    questionLatex: '\\text{Un urbanista está planificando una plaza pública cuadrada con un parque circular en el centro. El cuadrado que delimita la plaza tiene lados de 10 metros, y dentro de este cuadrado se inscribe perfectamente un círculo verde. Para determinar qué tamaño debe tener el círculo del parque de modo que toque a los cuatro lados del cuadrado sin excederlos, necesita calcular el radio del círculo inscrito. ¿Cuál es el radio del círculo inscrito en el cuadrado?}',
    options: ['5 m', '7.07 m', '10 m', '15 m'],
    correctAnswer: 0,
    explanation: 'r = \\frac{s}{2} = \\frac{10}{2} = 5 \\text{ m}',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-cuadrados', 'geometria-figuras-inscritas']
  },
  {
    id: 'm1-203',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'A_{nuevo} = \\pi(3r)^2 = 9\\pi r^2',
    questionLatex: '\\text{Un diseñador gráfico está escalando un logo circular para diferentes tamaños de impresión. Actualmente tiene un logo con cierto radio, pero el cliente pide que el logo sea amplificado al triple del tamaño original. El diseñador necesita entender cómo cambia el área del logo cuando triplica el radio para poder calcular mejor los costos de producción y los cambios en la resolución de impresión. ¿Qué sucede con el área cuando se triplica el radio?}',
    options: ['Se triplica', 'Se multiplica por 6', 'Se multiplica por 9', 'Se multiplica por 27'],
    correctAnswer: 2,
    explanation: 'A_{nuevo} = \\pi(3r)^2 = 9\\pi r^2 = 9A_{original}',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'geometria-proporciones', 'numeros-potencias']
  },
  {
    id: 'm1-204',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'C = \\pi d',
    questionLatex: '\\text{Una ciudad está construyendo una nueva pista de atletismo olímpica de forma circular para entrenamientos profesionales. Los planos especifican que la pista tiene un diámetro de 100 metros. El entrenador necesita calcular cuántos metros recorrerá un atleta al completar una vuelta completa alrededor de esta pista circular para poder registrar y analizar el rendimiento de los corredores durante las prácticas. ¿Cuántos metros mide una vuelta completa? (usar } \\pi \\approx 3.14)',
    options: ['157 m', '314 m', '628 m', '785 m'],
    correctAnswer: 1,
    explanation: 'C = \\pi d = 3.14 \\times 100 = 314 \\text{ m}',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-circunferencia', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-205',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'n = \\frac{\\text{distancia total}}{C}',
    questionLatex: '\\text{Un ingeniero automotriz está probando las ruedas de un nuevo vehículo. Las ruedas tienen un radio de 30 centímetros. Antes de realizar pruebas de rendimiento en carretera, el ingeniero necesita determinar cuántas vueltas completas debe dar la rueda para recorrer una distancia exacta de 188.4 metros, lo cual es la longitud de una sección de prueba importante. ¿Cuántas vueltas da la rueda? (usar } \\pi \\approx 3.14)',
    options: ['50', '75', '100', '150'],
    correctAnswer: 2,
    explanation: 'C = 2\\pi r = 2(3.14)(0.3) = 1.884 \\text{ m} \\quad \\Rightarrow \\quad n = \\frac{188.4}{1.884} = 100 \\text{ vueltas}',
    difficulty: 'hard',
    skills: ['geometria-circulos', 'geometria-circunferencia', 'geometria-aplicaciones', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-206',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'r = \\sqrt{\\frac{A}{\\pi}}',
    questionLatex: '\\text{Un paisajista está creando un jardín comunitario circular en un espacio público de una ciudad. El cliente ha especificado que el jardín debe tener un área total de 314 metros cuadrados para albergar áreas de plantación, caminos internos y zonas de descanso. Basándose en esta área, el paisajista necesita calcular el radio exacto del jardín circular para poder hacer un plan detallado de diseño y distribución de elementos. ¿Cuál es el radio aproximado del jardín? (usar } \\pi \\approx 3.14)',
    options: ['5 m', '10 m', '15 m', '20 m'],
    correctAnswer: 1,
    explanation: 'A = \\pi r^2 \\rightarrow r^2 = \\frac{A}{\\pi} = \\frac{314}{3.14} = 100 \\rightarrow r = \\sqrt{100} = 10 \\text{ m}',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-area-circulo', 'algebra-ecuaciones-cuadraticas', 'numeros-raices', 'numeros-decimales', 'numeros-operaciones-basicas']
  }

];
