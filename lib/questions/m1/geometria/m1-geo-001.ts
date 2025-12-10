import { Question } from '../../../types';

/**
 * M1-GEO-001: Teorema de Pitágoras
 * Chilean PAES Curriculum - Geometry Subsection 001
 *
 * This subsection covers:
 * - A: Enunciado y demostración del teorema
 * - B: Cálculo de la hipotenusa
 * - C: Cálculo de los catetos
 * - D: Aplicaciones del teorema
 *
 * Total: 20 questions
 */

export const m1Geo001Questions: Question[] = [
  {
    id: 'm1-3',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un arquitecto está diseñando una rampa de acceso para un edificio público. La rampa debe conectar el nivel del suelo con una plataforma elevada. El equipo de construcción midió que la distancia horizontal desde la base hasta la plataforma es de 3 metros, y la altura vertical de la plataforma es de 4 metros. Para calcular la cantidad de material necesario, el arquitecto necesita determinar la longitud exacta de la rampa. ¿Cuál es la longitud de la rampa en metros?}',
    options: ['5 m', '6 m', '7 m', '8 m'],
    correctAnswer: 0,
    explanation: 'h^2 = 3^2 + 4^2 = 9 + 16 = 25 \\text{, entonces } h = \\sqrt{25} = 5 \\text{ m}',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['geometria-triangulos', 'geometria-pitagoras', 'numeros-raices', 'numeros-potencias'],
    operacionBase: 'c^2 = a^2 + b^2'
  },
  {
    id: 'm1-20',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un cartógrafo está creando un mapa digital de la ciudad y necesita calcular distancias entre puntos de interés. En su sistema de coordenadas, el museo se encuentra en el punto } A(1, 2) \\text{ y el parque está en el punto } B(4, 6)\\text{, donde cada unidad representa un kilómetro. Para el sistema de navegación del mapa, debe calcular la distancia en línea recta entre estos dos lugares. Utilizando las coordenadas del plano, ¿cuál es la distancia entre el museo y el parque en kilómetros?}',
    options: ['3', '4', '5', '7'],
    correctAnswer: 2,
    explanation: 'd = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['geometria-plano-cartesiano', 'geometria-distancia', 'geometria-pitagoras', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas'],
    operacionBase: 'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}'
  },
  {
    id: 'm1-geo-visual-1',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Una empresa de construcción está instalando cables de soporte para una antena de telecomunicaciones. El cable debe conectar la punta de la antena con un punto de anclaje en el suelo. Los ingenieros midieron que el anclaje está a 6 metros de la base de la antena, y la altura de la antena es de 8 metros. Para solicitar el cable correcto al proveedor, necesitan calcular la longitud exacta del cable de soporte. ¿Cuántos metros de cable necesitan?}',
    options: ['9 m', '10 m', '12 m', '14 m'],
    correctAnswer: 1,
    explanation: 'c^2 = a^2 + b^2 = 6^2 + 8^2 = 36 + 64 = 100 \\quad \\Rightarrow \\quad c = \\sqrt{100} = 10 \\text{ m}',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['geometria-triangulos', 'geometria-pitagoras', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas'],
    operacionBase: 'c^2 = a^2 + b^2',
    visualData: {
      type: 'geometry',
      data: [
        {
          type: 'triangle',
          points: [
            { x: 50, y: 200, label: 'A' },
            { x: 200, y: 200, label: 'B' },
            { x: 50, y: 80, label: 'C' }
          ],
          labels: {
            sides: ['8 cm', '10 cm', '6 cm']
          },
          dimensions: {
            showSides: true
          }
        }
      ]
    }
  },
  {
    id: 'm1-202',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un diseñador gráfico está creando un logo que consiste en un cuadrado inscrito dentro de un círculo. El cliente especificó que el círculo debe tener un radio de 5 cm. Para que el cuadrado quede perfectamente inscrito, sus vértices deben tocar el borde del círculo. El diseñador necesita calcular la medida del lado del cuadrado para ajustar correctamente las proporciones del logo. ¿Cuál es aproximadamente la medida del lado del cuadrado en centímetros?}',
    options: ['5 cm', '7.07 cm', '10 cm', '14.14 cm'],
    correctAnswer: 1,
    explanation: 'l \\times \\sqrt{2} = 10 \\rightarrow l = \\frac{10}{\\sqrt{2}} = \\frac{10\\sqrt{2}}{2} = 5\\sqrt{2} \\approx 7.07 \\text{ cm}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['geometria-circulos', 'geometria-cuadrados', 'geometria-figuras-inscritas', 'numeros-raices', 'geometria-pitagoras'],
    operacionBase: 'd = l\\sqrt{2}'
  },
  {
    id: 'm1-207',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un carpintero está fabricando marcos triangulares para reforzar la estructura de un techo. Cada marco tiene forma de triángulo rectángulo con dos piezas perpendiculares que miden 5 cm y 12 cm respectivamente. Para completar el marco, necesita cortar la pieza diagonal que conectará los extremos de estas dos piezas. ¿Cuál debe ser la longitud de la pieza diagonal en centímetros?}',
    options: ['10 cm', '11 cm', '13 cm', '17 cm'],
    correctAnswer: 2,
    explanation: 'c^2 = 5^2 + 12^2 = 25 + 144 = 169 \\rightarrow c = \\sqrt{169} = 13 \\text{ cm}',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['geometria-triangulos', 'geometria-pitagoras', 'geometria-triangulo-rectangulo', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas'],
    operacionBase: 'c^2 = a^2 + b^2'
  },
  {
    id: 'm1-208',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un técnico de mantenimiento está reparando la estructura metálica de una escalera industrial. La escalera tiene un soporte diagonal que mide 10 cm de largo, y uno de los soportes verticales mide 6 cm. Durante la reparación, se dañó el soporte horizontal y necesita ser reemplazado. Para pedir la pieza de repuesto correcta, debe calcular la longitud del soporte horizontal. ¿Cuántos centímetros debe medir el soporte horizontal?}',
    options: ['4 cm', '6 cm', '8 cm', '12 cm'],
    correctAnswer: 2,
    explanation: 'b^2 = 10^2 - 6^2 = 100 - 36 = 64 \\rightarrow b = \\sqrt{64} = 8 \\text{ cm}',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['geometria-triangulos', 'geometria-pitagoras', 'geometria-triangulo-rectangulo', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas'],
    operacionBase: 'b^2 = c^2 - a^2'
  },
  {
    id: 'm1-209',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un topógrafo está verificando si un terreno triangular que midió tiene forma de triángulo rectángulo, lo cual es importante para los permisos de construcción. Las mediciones de los tres lados del terreno son 7 metros, 24 metros y 25 metros. Para completar el informe técnico, necesita confirmar si este terreno tiene efectivamente un ángulo recto. Según las medidas obtenidas, ¿el terreno forma un triángulo rectángulo?}',
    options: ['Sí', 'No', 'Falta información', 'Solo si es isósceles'],
    correctAnswer: 0,
    explanation: '7^2 + 24^2 = 49 + 576 = 625 = 25^2 \\quad \\checkmark \\text{ Sí es triángulo rectángulo}',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['geometria-triangulos', 'geometria-pitagoras', 'geometria-triangulo-rectangulo', 'numeros-potencias', 'numeros-operaciones-basicas'],
    operacionBase: 'a^2 + b^2 = c^2'
  },
  {
    id: 'm1-210',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Una decoradora está instalando un espejo rectangular en la pared de un salón. El espejo mide 9 cm de alto y 12 cm de ancho. Para asegurarse de que el espejo quede perfectamente alineado, necesita medir la diagonal del espejo y verificarla con una cinta métrica. ¿Cuántos centímetros debe medir la diagonal del espejo?}',
    options: ['13 cm', '15 cm', '17 cm', '21 cm'],
    correctAnswer: 1,
    explanation: 'd^2 = 9^2 + 12^2 = 81 + 144 = 225 \\rightarrow d = \\sqrt{225} = 15 \\text{ cm}',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['geometria-rectangulos', 'geometria-pitagoras', 'geometria-diagonales', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas'],
    operacionBase: 'd^2 = l^2 + w^2'
  },
  {
    id: 'm1-211',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un artesano está cortando baldosas cuadradas para un mosaico decorativo. Tiene una herramienta que mide diagonales, y determinó que cada baldosa debe tener una diagonal de 10 cm para encajar perfectamente en el diseño. Para cortar las baldosas del tamaño correcto, necesita saber la medida del lado de cada baldosa cuadrada. ¿Cuál es aproximadamente la medida del lado de cada baldosa en centímetros?}',
    options: ['5 cm', '7.07 cm', '8 cm', '10 cm'],
    correctAnswer: 1,
    explanation: 'l \\times \\sqrt{2} = 10 \\rightarrow l = \\frac{10}{\\sqrt{2}} = \\frac{10\\sqrt{2}}{2} = 5\\sqrt{2} \\approx 7.07 \\text{ cm}',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['geometria-cuadrados', 'geometria-pitagoras', 'geometria-diagonales', 'numeros-raices', 'numeros-operaciones-basicas'],
    operacionBase: 'd = l\\sqrt{2}'
  },
  {
    id: 'm1-212',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un bombero está rescatando a una persona desde una ventana de un edificio usando una escalera extensible. La escalera mide 5 metros de largo y, por seguridad, su base debe colocarse a 3 metros de distancia de la pared del edificio. El jefe de bomberos necesita saber hasta qué altura llegará la escalera para confirmar que alcanza la ventana donde está la persona. ¿A qué altura en metros llegará la punta de la escalera?}',
    options: ['2 m', '3 m', '4 m', '5 m'],
    correctAnswer: 2,
    explanation: 'h^2 = 5^2 - 3^2 = 25 - 9 = 16 \\rightarrow h = \\sqrt{16} = 4 \\text{ m}',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['geometria-pitagoras', 'geometria-aplicaciones', 'geometria-triangulo-rectangulo', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas'],
    operacionBase: 'h^2 = c^2 - b^2'
  },
  {
    id: 'm1-213',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un programador está desarrollando un videojuego y necesita calcular la distancia que recorre un personaje en el mapa. El personaje comienza en el origen del mapa, en la posición (0, 0), y se mueve hasta la posición (3, 4), donde cada unidad representa un metro en el juego. Para programar correctamente el tiempo de desplazamiento del personaje, necesita conocer la distancia total recorrida en línea recta. ¿Cuál es esta distancia en metros?}',
    options: ['3', '4', '5', '7'],
    correctAnswer: 2,
    explanation: 'd = \\sqrt{(3-0)^2 + (4-0)^2} = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['geometria-plano-cartesiano', 'geometria-distancia', 'geometria-pitagoras', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas'],
    operacionBase: 'd = \\sqrt{x^2 + y^2}'
  },
  {
    id: 'm1-214',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Una empresa de delivery está optimizando sus rutas de entrega usando un sistema de coordenadas de la ciudad. Un repartidor debe ir desde el punto } P(2, 3) \\text{ donde está el restaurante hasta el punto } Q(6, 6) \\text{ donde vive el cliente, con cada unidad del sistema representando un kilómetro. Para estimar el tiempo de entrega, el gerente necesita calcular la distancia en línea recta entre estos dos puntos. ¿Cuál es la distancia en kilómetros?}',
    options: ['3', '4', '5', '7'],
    correctAnswer: 2,
    explanation: 'd = \\sqrt{(6-2)^2 + (6-3)^2} = \\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['geometria-plano-cartesiano', 'geometria-distancia', 'geometria-pitagoras', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas'],
    operacionBase: 'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}'
  },
  {
    id: 'm1-215',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un ingeniero civil está trazando el recorrido de una tubería subterránea en un plano del terreno. La tubería debe conectar dos puntos: uno ubicado a 5 unidades del centro en dirección este (sobre el eje horizontal positivo), y otro ubicado a 12 unidades del centro en dirección norte (sobre el eje vertical positivo). Para calcular la cantidad de tubería necesaria si se hace una conexión directa, necesita determinar la distancia entre estos dos puntos. ¿Cuál es esta distancia en unidades?}',
    options: ['7', '10', '13', '17'],
    correctAnswer: 2,
    explanation: 'd = \\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['geometria-plano-cartesiano', 'geometria-distancia', 'geometria-pitagoras', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas'],
    operacionBase: 'd = \\sqrt{x^2 + y^2}'
  },
  {
    id: 'm1-216',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un profesor de matemáticas está preparando ejercicios sobre triángulos rectángulos para sus estudiantes. Quiere mostrar ejemplos de ternas pitagóricas, que son conjuntos de tres números enteros que satisfacen el teorema de Pitágoras. Ha preparado varios conjuntos de números y necesita identificar cuál de ellos forma una terna pitagórica válida. ¿Cuál de los siguientes conjuntos cumple con esta propiedad?}',
    options: ['(2, 3, 4)', '(5, 12, 13)', '(6, 7, 8)', '(7, 8, 9)'],
    correctAnswer: 1,
    explanation: '5^2 + 12^2 = 25 + 144 = 169 = 13^2 \\quad \\checkmark \\text{ Es terna pitagórica}',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['geometria-pitagoras', 'geometria-ternas-pitagoricas', 'numeros-potencias', 'numeros-operaciones-basicas'],
    operacionBase: 'a^2 + b^2 = c^2'
  },
  {
    id: 'm1-217',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un estudiante descubrió que el conjunto (3, 4, 5) es una terna pitagórica, es decir, tres números que cumplen la relación del teorema de Pitágoras. Su profesora le explicó que si multiplicas todos los números de una terna pitagórica por el mismo factor, el resultado también es una terna pitagórica. El estudiante quiere verificar esto con diferentes opciones. ¿Cuál de los siguientes conjuntos también es una terna pitagórica derivada de (3, 4, 5)?}',
    options: ['(4, 5, 6)', '(6, 8, 10)', '(5, 6, 7)', '(7, 8, 9)'],
    correctAnswer: 1,
    explanation: '(6, 8, 10) = 2(3, 4, 5) \\text{ y cumple: } 6^2 + 8^2 = 36 + 64 = 100 = 10^2',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['geometria-pitagoras', 'geometria-ternas-pitagoricas', 'numeros-operaciones-basicas'],
    operacionBase: 'k \\cdot (a, b, c) = (ka, kb, kc)'
  },
  {
    id: 'm1-218',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un ingeniero estructural está diseñando un soporte triangular para un puente. Las especificaciones técnicas indican que dos de los lados perpendiculares del soporte deben medir 8 metros y 15 metros respectivamente, formando un ángulo recto entre ellos. Para completar el diseño y ordenar el tercer elemento del soporte, necesita calcular la longitud de la pieza diagonal que conectará los extremos de estos dos lados. ¿Cuál debe ser la longitud de esta pieza en metros?}',
    options: ['15', '16', '17', '23'],
    correctAnswer: 2,
    explanation: 'c^2 = 8^2 + 15^2 = 64 + 225 = 289 = 17^2 \\rightarrow c = 17',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['geometria-pitagoras', 'geometria-ternas-pitagoricas', 'geometria-triangulo-rectangulo', 'numeros-potencias', 'numeros-raices', 'numeros-operaciones-basicas'],
    operacionBase: 'c^2 = a^2 + b^2'
  },
  {
    id: 'm1-219',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un topógrafo está midiendo la altura de un poste de alumbrado público usando su sombra. Al mediodía, observó que el poste de 6 metros de altura proyecta una sombra de 8 metros de largo en el suelo. Para verificar sus cálculos, necesita determinar la distancia en línea recta desde la punta del poste hasta el extremo de su sombra en el suelo. ¿Cuál es esta distancia en metros?}',
    options: ['8 m', '10 m', '12 m', '14 m'],
    correctAnswer: 1,
    explanation: 'd^2 = 6^2 + 8^2 = 36 + 64 = 100 \\rightarrow d = \\sqrt{100} = 10 \\text{ m}',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['geometria-pitagoras', 'geometria-aplicaciones', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas'],
    operacionBase: 'd^2 = h^2 + s^2'
  },
  {
    id: 'm1-220',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un barco de pesca sale del puerto y navega en línea recta hacia el norte durante 12 kilómetros. Luego cambia de dirección y navega hacia el este en línea recta durante 16 kilómetros adicionales. El capitán quiere saber cuál es la distancia más corta desde su posición actual hasta el puerto de origen, para calcular el combustible necesario para el regreso directo. ¿A qué distancia en kilómetros se encuentra el barco del puerto?}',
    options: ['18 km', '20 km', '22 km', '28 km'],
    correctAnswer: 1,
    explanation: 'd^2 = 12^2 + 16^2 = 144 + 256 = 400 \\rightarrow d = \\sqrt{400} = 20 \\text{ km}',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['geometria-pitagoras', 'geometria-aplicaciones', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas'],
    operacionBase: 'd^2 = a^2 + b^2'
  },
  {
    id: 'm1-221',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un diseñador de señalética está creando una señal de tránsito con forma de triángulo equilátero (tres lados iguales). El cliente especificó que cada lado debe medir 6 cm. Para calcular correctamente el espacio que ocupará el diseño en el panel, el diseñador necesita conocer la altura del triángulo, que va desde un vértice hasta el punto medio del lado opuesto. ¿Cuál es aproximadamente la altura de este triángulo en centímetros?}',
    options: ['3 cm', '4.24 cm', '5.20 cm', '6 cm'],
    correctAnswer: 2,
    explanation: 'h^2 = 6^2 - 3^2 = 36 - 9 = 27 \\rightarrow h = \\sqrt{27} = 3\\sqrt{3} \\approx 5.20 \\text{ cm}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['geometria-triangulos', 'geometria-triangulo-equilatero', 'geometria-pitagoras', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas'],
    operacionBase: 'h^2 = l^2 - (l/2)^2'
  }
];
