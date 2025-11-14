import { Question } from '../../../types';

/**
 * M1-GEO-003: Área y volumen de prismas rectos y cilindros
 * Chilean PAES Curriculum - Geometry Subsection 003
 *
 * This subsection covers:
 * - A: Área superficial de prismas rectos
 * - B: Volumen de prismas rectos
 * - C: Área superficial de cilindros
 * - D: Volumen de cilindros
 *
 * Total: 1 question
 */

export const m1Geo003Questions: Question[] = [
  {
    id: 'm1-19',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'María trabaja en una empresa de embalaje y debe calcular cuánto espacio ocupará una caja cúbica en el almacén. La caja es perfectamente cuadrada en todas sus dimensiones, y cada arista mide 3 cm. El supervisor le pide que calcule el espacio total que ocupa la caja para optimizar el almacenamiento. Para completar el registro de inventario, necesita determinar el volumen de esta caja cúbica. ¿Cuál es el volumen en centímetros cúbicos?',
    questionLatex: '\\text{María trabaja en una empresa de embalaje y debe calcular cuánto espacio ocupará una caja cúbica en el almacén. La caja es perfectamente cuadrada en todas sus dimensiones, y cada arista mide 3 cm. El supervisor le pide que calcule el espacio total que ocupa la caja para optimizar el almacenamiento. Para completar el registro de inventario, necesita determinar el volumen de esta caja cúbica. ¿Cuál es el volumen en centímetros cúbicos?}',
    options: ['9 cm³', '18 cm³', '27 cm³', '36 cm³'],
    correctAnswer: 2,
    explanation: 'En un cubo, el volumen se calcula multiplicando la arista tres veces (largo × ancho × alto), y como todas las aristas son iguales, elevamos la arista al cubo:',
    explanationLatex: 'V = a^3 = 3^3 = 3 \\times 3 \\times 3 = 27 \\text{ cm}^3',
    difficulty: 'easy',
    skills: ['geometria-volumen', 'geometria-volumen-cubo', 'numeros-potencias', 'numeros-operaciones-basicas'],
    operacionBase: 'a^3'
  }
];
