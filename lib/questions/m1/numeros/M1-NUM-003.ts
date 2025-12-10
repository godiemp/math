import { Question } from '../../../types';

/**
 * M1-NUM-003: Problemas con números enteros y racionales en distintos contextos
 *
 * Topics covered:
 * - Direct proportionality (más implica más)
 * - Inverse proportionality (más implica menos)
 * - Ratio and proportion problems
 * - Proportional reasoning in real-world contexts:
 *   - Construction (workers, time, materials)
 *   - Shopping (unit prices, quantities)
 *   - Travel (distance, time, speed)
 *   - Cooking (scaling recipes)
 *   - Finance (currency exchange, costs)
 */

export const m1Num003Questions: Question[] = [
  {
    id: 'm1-1',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '3 \\times 12 = 4 \\times x',
    questionLatex: '\\text{En una obra de construcción, un grupo de 3 obreros trabaja durante 12 días completos para construir un muro perimetral. El jefe de obra recibe una orden urgente para acelerar el proyecto y decide contratar a un obrero adicional, formando así un equipo de 4 obreros con la misma eficiencia. Necesita calcular en cuántos días este nuevo equipo completará un muro idéntico. ¿Cuántos días tardarán 4 obreros?}',
    options: ['8 días', '9 días', '10 días', '16 días'],
    correctAnswer: 1,
    explanation: '3 \\times 12 = 4 \\times x \\text{, entonces } x = \\frac{36}{4} = 9 \\text{ días}',
    difficulty: 'easy',
    difficultyScore: 0.34,
    skills: ['numeros-proporcionalidad', 'numeros-proporcionalidad-inversa', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-84',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{5}{7500} = \\frac{8}{x}',
    questionLatex: '\\text{Una papelería está realizando un inventario de sus productos escolares. La dueña sabe que 5 cuadernos idénticos tienen un costo total de \\$7.500 pesos. Un cliente se acerca y solicita comprar 8 cuadernos del mismo tipo. La dueña necesita calcular cuánto debe cobrar por los 8 cuadernos, manteniendo el mismo precio unitario. ¿Cuánto costarán 8 cuadernos?}',
    options: ['$10.000', '$11.000', '$12.000', '$13.500'],
    correctAnswer: 2,
    explanation: '\\frac{5}{7500} = \\frac{8}{x} \\quad \\Rightarrow \\quad x = \\frac{8 \\times 7500}{5} = 12.000',
    difficulty: 'easy',
    difficultyScore: 0.34,
    skills: ['numeros-proporcionalidad', 'numeros-proporcionalidad-directa', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-85',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{240}{3} = \\frac{x}{5}',
    questionLatex: '\\text{Un conductor está realizando un viaje por carretera y mantiene una velocidad constante durante todo el trayecto. En las primeras 3 horas de viaje, el odómetro registra que ha recorrido 240 kilómetros. El conductor planea continuar manejando durante 5 horas en total y quiere calcular cuántos kilómetros habrá recorrido al finalizar. ¿Cuántos kilómetros recorrerá en 5 horas?}',
    options: ['360 km', '400 km', '420 km', '480 km'],
    correctAnswer: 1,
    explanation: '\\frac{240}{3} = \\frac{x}{5} \\quad \\Rightarrow \\quad x = \\frac{240 \\times 5}{3} = 400 \\text{ km}',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-proporcionalidad', 'numeros-proporcionalidad-directa', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-86',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{6}{4} = \\frac{15}{x}',
    questionLatex: '\\text{Una repostera está ajustando la receta de una torta según el número de invitados. Su receta base está diseñada para 6 personas y requiere 4 huevos. Para una celebración más grande, necesita preparar una torta que alcance para 15 personas, manteniendo exactamente las mismas proporciones de todos los ingredientes. ¿Cuántos huevos necesitará para la torta de 15 personas?}',
    options: ['8 huevos', '9 huevos', '10 huevos', '12 huevos'],
    correctAnswer: 2,
    explanation: '\\frac{6}{4} = \\frac{15}{x} \\quad \\Rightarrow \\quad x = \\frac{15 \\times 4}{6} = 10 \\text{ huevos}',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-proporcionalidad', 'numeros-proporcionalidad-directa', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-87',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{2}{5} \\times 30',
    questionLatex: '\\text{En un curso de matemática hay exactamente 30 estudiantes matriculados. El profesor realiza una encuesta y descubre que la razón entre estudiantes hombres y mujeres es de 2 a 3, lo que significa que por cada 2 hombres hay 3 mujeres. Para organizar actividades grupales diferenciadas, necesita determinar cuántos estudiantes hombres hay en el curso. ¿Cuántos hombres hay?}',
    options: ['10', '12', '15', '18'],
    correctAnswer: 1,
    explanation: '\\text{Hombres} = \\frac{2}{5} \\times 30 = 12',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-proporcionalidad', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-88',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{3}{5} \\times 60000',
    questionLatex: '\\text{Dos hermanos, Ana y Pedro, reciben una herencia familiar de \\$60.000 pesos que debe repartirse según las instrucciones del testamento. El documento especifica que el dinero debe dividirse en la razón de 3 a 2, donde Ana recibe la parte correspondiente al 3 y Pedro la parte correspondiente al 2. El notario debe calcular exactamente cuánto dinero recibirá Ana. ¿Cuánto recibe Ana?}',
    options: ['$24.000', '$30.000', '$36.000', '$40.000'],
    correctAnswer: 2,
    explanation: '\\text{Ana} = \\frac{3}{5} \\times 60.000 = 36.000',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-proporcionalidad', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-89',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{5}{12} \\times 48',
    questionLatex: '\\text{Un triángulo tiene sus tres lados en una razón particular: las longitudes están en razón 3 a 4 a 5. El perímetro completo del triángulo mide exactamente 48 centímetros. Un estudiante de geometría necesita determinar la medida del lado más largo, que corresponde a la parte con valor 5 en la razón. ¿Cuánto mide el lado más largo?}',
    options: ['12 cm', '16 cm', '20 cm', '24 cm'],
    correctAnswer: 2,
    explanation: '\\text{Lado más largo} = \\frac{5}{12} \\times 48 = 20 \\text{ cm}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['numeros-proporcionalidad', 'numeros-fracciones', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-90',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{4}{9} \\times 90000',
    questionLatex: '\\text{Tres socios inician un negocio conjunto con un capital inicial y después de un año obtienen ganancias de \\$90.000 pesos que deben repartirse. El contrato estipula que las ganancias se dividen en la razón 2 a 3 a 4, donde cada número representa la participación de cada socio. El socio que aportó más capital recibe la parte correspondiente al número 4. ¿Cuánto recibe el socio que más gana?}',
    options: ['$20.000', '$30.000', '$40.000', '$50.000'],
    correctAnswer: 2,
    explanation: '\\frac{4}{2+3+4} \\times 90.000 = \\frac{4}{9} \\times 90.000 = 40.000',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-proporcionalidad', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-91',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{2}{6} \\times 36',
    questionLatex: '\\text{En una familia hay tres hermanos: Juan, María y Pedro. Un tío les cuenta que sus edades actuales están en la razón 1 a 2 a 3, es decir, por cada año que tiene Juan, María tiene 2 y Pedro tiene 3. Si la suma de las edades de los tres hermanos es exactamente 36 años, los padres quieren determinar cuántos años tiene María. ¿Cuántos años tiene María?}',
    options: ['6 años', '12 años', '18 años', '24 años'],
    correctAnswer: 1,
    explanation: '\\text{María} = \\frac{2}{6} \\times 36 = 12 \\text{ años}',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-proporcionalidad', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-92',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{5}{10} \\times 100',
    questionLatex: '\\text{Una cafetería especializada está preparando una mezcla especial de café para un cliente importante. La mezcla combina tres tipos diferentes de café en la razón 5 a 3 a 2. El barista necesita preparar exactamente 100 kilogramos de esta mezcla personalizada para un pedido corporativo. Para organizar el inventario correctamente, debe calcular cuántos kilogramos del primer tipo de café necesitará. ¿Cuántos kilogramos se usan del primer tipo?}',
    options: ['20 kg', '30 kg', '50 kg', '60 kg'],
    correctAnswer: 2,
    explanation: '\\frac{5}{10} \\times 100 = 50 \\text{ kg}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['numeros-proporcionalidad', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-93',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{3}{3+2}',
    questionLatex: '\\text{En una planta procesadora de jugos, un técnico está preparando una bebida natural. Mezcla 3 litros de jugo puro recién exprimido con 2 litros de agua filtrada para obtener la concentración deseada. El control de calidad necesita determinar qué fracción del total de la mezcla final corresponde al jugo puro. ¿Qué fracción de la mezcla es jugo?}',
    options: ['\\frac{2}{5}', '\\frac{3}{5}', '\\frac{2}{3}', '\\frac{3}{2}'],
    correctAnswer: 1,
    explanation: '\\frac{3}{5} \\text{ de la mezcla es jugo}',
    difficulty: 'easy',
    difficultyScore: 0.34,
    skills: ['numeros-proporcionalidad', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-95',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{6(1200) + 4(1800)}{10}',
    questionLatex: '\\text{Un comerciante mayorista está combinando dos calidades diferentes de arroz para vender una mezcla homogénea. Mezcla 6 kilogramos de arroz de primera calidad que cuesta \\$1.200 por kilogramo, con 4 kilogramos de arroz de calidad premium que cuesta \\$1.800 por kilogramo. Para fijar el precio de venta de la mezcla resultante, necesita calcular el precio promedio por kilogramo. ¿Cuál es el precio promedio por kilogramo?}',
    options: ['$1.320', '$1.440', '$1.500', '$1.560'],
    correctAnswer: 1,
    explanation: '\\frac{6(1200) + 4(1800)}{10} = \\frac{7200 + 7200}{10} = \\frac{14400}{10} = 1.440',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['numeros-proporcionalidad', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-155',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '4 \\times 50000 = 200000 \\text{ cm} = 2 \\text{ km}',
    questionLatex: '\\text{Un excursionista está planificando una ruta de trekking usando un mapa topográfico con escala 1:50.000. En el mapa, mide con una regla la distancia entre dos refugios de montaña y obtiene 4 centímetros. Para estimar el tiempo de caminata, necesita saber la distancia real entre los refugios. ¿Cuál es la distancia real entre los refugios?}',
    options: ['500 m', '1 km', '2 km', '5 km'],
    correctAnswer: 2,
    explanation: '4 \\text{ cm} \\times 50.000 = 200.000 \\text{ cm} = 2.000 \\text{ m} = 2 \\text{ km}',
    difficulty: 'easy',
    difficultyScore: 0.34,
    skills: ['numeros-proporcionalidad', 'numeros-escalas', 'numeros-conversiones-unidades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-156',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{1500000}{200000} = 7.5 \\text{ cm}',
    questionLatex: '\\text{Una profesora de geografía está preparando material didáctico y necesita usar un mapa regional con escala 1:200.000. Quiere marcar en el mapa dos ciudades que en la realidad están separadas por 15 kilómetros en línea recta. Para dibujar correctamente la distancia en el mapa, debe calcular cuántos centímetros debe medir entre ambas ciudades. ¿Qué distancia debe marcar en el mapa?}',
    options: ['5 cm', '7,5 cm', '10 cm', '15 cm'],
    correctAnswer: 1,
    explanation: '\\frac{1.500.000 \\text{ cm}}{200.000} = 7{,}5 \\text{ cm en el mapa}',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-proporcionalidad', 'numeros-escalas', 'numeros-conversiones-unidades', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-157',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '6 \\times 100 = 600 \\text{ cm} = 6 \\text{ m}',
    questionLatex: '\\text{Un arquitecto está mostrando a sus clientes el plano de una casa que diseñó. El plano está dibujado a escala 1:100. En el plano, el largo del salón principal mide 6 centímetros. Los clientes quieren saber cuánto medirá el salón real cuando la casa esté construida. ¿Cuál será el largo real del salón?}',
    options: ['60 cm', '6 m', '60 m', '600 m'],
    correctAnswer: 1,
    explanation: '6 \\text{ cm} \\times 100 = 600 \\text{ cm} = 6 \\text{ m}',
    difficulty: 'easy',
    difficultyScore: 0.34,
    skills: ['numeros-proporcionalidad', 'numeros-escalas', 'numeros-conversiones-unidades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-158',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{800000}{25000000} = \\frac{1}{31.25} \\approx 1:30000',
    questionLatex: '\\text{Un cartógrafo está elaborando un nuevo mapa turístico de una región. Midió que en su mapa de prueba, 8 cm representan una distancia real de 2,4 km. Para etiquetar correctamente el mapa, necesita determinar cuál es la escala que está utilizando. ¿Cuál es la escala del mapa?}',
    options: ['1:3.000', '1:30.000', '1:300.000', '1:3.000.000'],
    correctAnswer: 1,
    explanation: '\\frac{8 \\text{ cm}}{240.000 \\text{ cm}} = \\frac{1}{30.000} \\quad \\Rightarrow \\quad \\text{Escala: } 1:30.000',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['numeros-proporcionalidad', 'numeros-escalas', 'numeros-conversiones-unidades', 'numeros-simplificacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-159',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '12 \\times 250000 = 3000000 \\text{ cm} = 30 \\text{ km}',
    questionLatex: '\\text{Un ciclista está preparando una ruta en bicicleta y consulta un mapa de carreteras con escala 1:250.000. Traza su recorrido en el mapa y mide que la ruta total tiene una longitud de 12 centímetros. Para planificar cuántas horas necesitará, debe calcular la distancia real que recorrerá. ¿Cuál es la distancia real de la ruta?}',
    options: ['3 km', '12 km', '30 km', '120 km'],
    correctAnswer: 2,
    explanation: '12 \\text{ cm} \\times 250.000 = 3.000.000 \\text{ cm} = 30 \\text{ km}',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-proporcionalidad', 'numeros-escalas', 'numeros-conversiones-unidades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-160',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{42000}{50} = 840 \\text{ cm} = 8.4 \\text{ m}',
    questionLatex: '\\text{Un modelista ferroviario está construyendo una réplica a escala de una estación de trenes. Usa escala 1:50 para su maqueta, lo que significa que cada elemento es 50 veces más pequeño que el real. Si el edificio real de la estación tiene 42 metros de largo, necesita calcular qué longitud debe tener el modelo. ¿Cuánto medirá el modelo de la estación?}',
    options: ['42 cm', '84 cm', '2,1 m', '4,2 m'],
    correctAnswer: 1,
    explanation: '\\frac{4.200 \\text{ cm}}{50} = 84 \\text{ cm en el modelo}',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-proporcionalidad', 'numeros-escalas', 'numeros-conversiones-unidades', 'numeros-decimales', 'numeros-operaciones-basicas']
  }
];
