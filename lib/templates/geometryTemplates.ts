/**
 * Geometry Templates
 *
 * Templates for geometric calculations, shapes, area, perimeter, volume, angles
 */

import {
  ProblemTemplate,
  randomInt,
  randomChoice,
  randomIntNonZero,
  shuffle,
} from '../problemTemplates';

// ============================================================================
// AREA AND PERIMETER TEMPLATES
// ============================================================================

export const rectangleArea: ProblemTemplate = {
  id: 'rect-area',
  name: 'Rectangle Area',
  subject: 'geometría',
  level: 'M1',
  difficulty: 'easy',
  topic: 'Geometría',
  tags: ['area', 'rectangle', 'basic'],

  variables: {
    length: () => randomInt(3, 15),
    width: () => randomInt(3, 15),
  },

  validator: (vars) => vars.length !== vars.width,

  questionGenerator: (vars) => ({
    question: `¿Cuál es el área de un rectángulo de ${vars.length} cm de largo y ${vars.width} cm de ancho?`,
  }),

  answerCalculator: (vars) => vars.length * vars.width,

  optionGenerator: (vars, correctAnswer) => {
    const wrong = [
      2 * (vars.length + vars.width), // Wrong: calculated perimeter
      vars.length + vars.width, // Wrong: just added
      vars.length * vars.width / 2, // Wrong: divided by 2
    ];

    const allOptions = [correctAnswer, ...wrong];
    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.indexOf(correctAnswer);

    return {
      options: shuffled.map(n => `${n} cm²`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => ({
    explanation: `El área de un rectángulo es largo × ancho = ${vars.length} × ${vars.width} = ${answer} cm².`,
  }),
};

export const triangleArea: ProblemTemplate = {
  id: 'triangle-area',
  name: 'Triangle Area',
  subject: 'geometría',
  level: 'M1',
  difficulty: 'easy',
  topic: 'Geometría',
  tags: ['area', 'triangle'],

  variables: {
    base: () => randomInt(4, 20),
    height: () => randomInt(4, 20),
  },

  questionGenerator: (vars) => ({
    question: `Un triángulo tiene base ${vars.base} cm y altura ${vars.height} cm. ¿Cuál es su área?`,
  }),

  answerCalculator: (vars) => (vars.base * vars.height) / 2,

  optionGenerator: (vars, correctAnswer) => {
    const wrong = [
      vars.base * vars.height, // Wrong: forgot to divide by 2
      vars.base + vars.height, // Wrong: just added
      (vars.base + vars.height) / 2, // Wrong: average instead of area
    ];

    const allOptions = [correctAnswer, ...wrong];
    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.indexOf(correctAnswer);

    return {
      options: shuffled.map(n => `${n} cm²`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => ({
    explanation: `El área de un triángulo es (base × altura) / 2 = (${vars.base} × ${vars.height}) / 2 = ${vars.base * vars.height} / 2 = ${answer} cm².`,
    explanationLatex: `El área de un triángulo es $\\frac{\\text{base} \\times \\text{altura}}{2} = \\frac{${vars.base} \\times ${vars.height}}{2} = \\frac{${vars.base * vars.height}}{2} = ${answer}$ cm².`,
  }),
};

export const circleArea: ProblemTemplate = {
  id: 'circle-area',
  name: 'Circle Area',
  subject: 'geometría',
  level: 'M1',
  difficulty: 'medium',
  topic: 'Geometría',
  tags: ['area', 'circle', 'pi'],

  variables: {
    radius: () => randomInt(2, 10),
  },

  questionGenerator: (vars) => ({
    question: `¿Cuál es el área de un círculo con radio ${vars.radius} cm? (Usa π ≈ 3.14)`,
    questionLatex: `¿Cuál es el área de un círculo con radio ${vars.radius} cm? (Usa $\\pi \\approx 3.14$)`,
  }),

  answerCalculator: (vars) => {
    return Math.round(Math.PI * vars.radius * vars.radius * 100) / 100;
  },

  optionGenerator: (vars, correctAnswer) => {
    const wrong = [
      Math.round(2 * Math.PI * vars.radius * 100) / 100, // Wrong: calculated circumference
      Math.round(Math.PI * vars.radius * 100) / 100, // Wrong: forgot to square
      Math.round(vars.radius * vars.radius * 100) / 100, // Wrong: forgot π
    ];

    const allOptions = [correctAnswer, ...wrong];
    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.indexOf(correctAnswer);

    return {
      options: shuffled.map(n => `${n} cm²`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => ({
    explanation: `El área de un círculo es π × r² = 3.14 × ${vars.radius}² = 3.14 × ${vars.radius * vars.radius} ≈ ${answer} cm².`,
    explanationLatex: `El área de un círculo es $\\pi r^2 = 3.14 \\times ${vars.radius}^2 = 3.14 \\times ${vars.radius * vars.radius} \\approx ${answer}$ cm².`,
  }),
};

export const rectanglePerimeter: ProblemTemplate = {
  id: 'rect-perimeter',
  name: 'Rectangle Perimeter',
  subject: 'geometría',
  level: 'M1',
  difficulty: 'easy',
  topic: 'Geometría',
  tags: ['perimeter', 'rectangle'],

  variables: {
    length: () => randomInt(5, 20),
    width: () => randomInt(3, 15),
  },

  validator: (vars) => vars.length > vars.width,

  questionGenerator: (vars) => ({
    question: `¿Cuál es el perímetro de un rectángulo de ${vars.length} m de largo y ${vars.width} m de ancho?`,
  }),

  answerCalculator: (vars) => 2 * (vars.length + vars.width),

  optionGenerator: (vars, correctAnswer) => {
    const wrong = [
      vars.length * vars.width, // Wrong: calculated area
      vars.length + vars.width, // Wrong: forgot to multiply by 2
      2 * vars.length + vars.width, // Wrong: only doubled length
    ];

    const allOptions = [correctAnswer, ...wrong];
    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.indexOf(correctAnswer);

    return {
      options: shuffled.map(n => `${n} m`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => ({
    explanation: `El perímetro de un rectángulo es 2 × (largo + ancho) = 2 × (${vars.length} + ${vars.width}) = 2 × ${vars.length + vars.width} = ${answer} m.`,
  }),
};

// ============================================================================
// VOLUME TEMPLATES
// ============================================================================

export const cubeVolume: ProblemTemplate = {
  id: 'cube-volume',
  name: 'Cube Volume',
  subject: 'geometría',
  level: 'M1',
  difficulty: 'easy',
  topic: 'Geometría',
  tags: ['volume', 'cube', '3d'],

  variables: {
    side: () => randomInt(2, 10),
  },

  questionGenerator: (vars) => ({
    question: `¿Cuál es el volumen de un cubo con lado ${vars.side} cm?`,
  }),

  answerCalculator: (vars) => vars.side ** 3,

  optionGenerator: (vars, correctAnswer) => {
    const wrong = [
      vars.side * vars.side, // Wrong: calculated area (2D)
      6 * vars.side * vars.side, // Wrong: calculated surface area
      3 * vars.side, // Wrong: multiplied by 3 instead of cubing
    ];

    const allOptions = [correctAnswer, ...wrong];
    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.indexOf(correctAnswer);

    return {
      options: shuffled.map(n => `${n} cm³`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => ({
    explanation: `El volumen de un cubo es lado³ = ${vars.side}³ = ${vars.side} × ${vars.side} × ${vars.side} = ${answer} cm³.`,
    explanationLatex: `El volumen de un cubo es $\\text{lado}^3 = ${vars.side}^3 = ${answer}$ cm³.`,
  }),
};

export const rectangularPrismVolume: ProblemTemplate = {
  id: 'rect-prism-volume',
  name: 'Rectangular Prism Volume',
  subject: 'geometría',
  level: 'M1',
  difficulty: 'easy',
  topic: 'Geometría',
  tags: ['volume', 'prism', '3d'],

  variables: {
    length: () => randomInt(3, 12),
    width: () => randomInt(3, 12),
    height: () => randomInt(3, 12),
  },

  questionGenerator: (vars) => ({
    question: `Una caja rectangular tiene ${vars.length} cm de largo, ${vars.width} cm de ancho y ${vars.height} cm de alto. ¿Cuál es su volumen?`,
  }),

  answerCalculator: (vars) => vars.length * vars.width * vars.height,

  optionGenerator: (vars, correctAnswer) => {
    const wrong = [
      vars.length + vars.width + vars.height, // Wrong: added instead of multiplied
      vars.length * vars.width, // Wrong: forgot height
      2 * (vars.length * vars.width + vars.width * vars.height + vars.length * vars.height), // Wrong: surface area
    ];

    const allOptions = [correctAnswer, ...wrong];
    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.indexOf(correctAnswer);

    return {
      options: shuffled.map(n => `${n} cm³`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => ({
    explanation: `El volumen de un prisma rectangular es largo × ancho × alto = ${vars.length} × ${vars.width} × ${vars.height} = ${answer} cm³.`,
  }),
};

export const cylinderVolume: ProblemTemplate = {
  id: 'cylinder-volume',
  name: 'Cylinder Volume',
  subject: 'geometría',
  level: 'M1',
  difficulty: 'medium',
  topic: 'Geometría',
  tags: ['volume', 'cylinder', '3d', 'pi'],

  variables: {
    radius: () => randomInt(2, 8),
    height: () => randomInt(5, 15),
  },

  questionGenerator: (vars) => ({
    question: `¿Cuál es el volumen de un cilindro con radio ${vars.radius} cm y altura ${vars.height} cm? (Usa π ≈ 3.14)`,
    questionLatex: `¿Cuál es el volumen de un cilindro con radio ${vars.radius} cm y altura ${vars.height} cm? (Usa $\\pi \\approx 3.14$)`,
  }),

  answerCalculator: (vars) => {
    return Math.round(Math.PI * vars.radius * vars.radius * vars.height * 100) / 100;
  },

  optionGenerator: (vars, correctAnswer) => {
    const wrong = [
      Math.round(Math.PI * vars.radius * vars.radius * 100) / 100, // Wrong: forgot height
      Math.round(2 * Math.PI * vars.radius * vars.height * 100) / 100, // Wrong: lateral area
      Math.round(vars.radius * vars.radius * vars.height * 100) / 100, // Wrong: forgot π
    ];

    const allOptions = [correctAnswer, ...wrong];
    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.indexOf(correctAnswer);

    return {
      options: shuffled.map(n => `${n} cm³`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => ({
    explanation: `El volumen de un cilindro es π × r² × h = 3.14 × ${vars.radius}² × ${vars.height} = 3.14 × ${vars.radius * vars.radius} × ${vars.height} ≈ ${answer} cm³.`,
    explanationLatex: `El volumen de un cilindro es $\\pi r^2 h = 3.14 \\times ${vars.radius}^2 \\times ${vars.height} \\approx ${answer}$ cm³.`,
  }),
};

// ============================================================================
// ANGLE TEMPLATES
// ============================================================================

export const complementaryAngles: ProblemTemplate = {
  id: 'angles-complementary',
  name: 'Complementary Angles',
  subject: 'geometría',
  level: 'M1',
  difficulty: 'easy',
  topic: 'Geometría',
  tags: ['angles', 'complementary'],

  variables: {
    angle1: () => randomInt(10, 80),
  },

  questionGenerator: (vars) => ({
    question: `Dos ángulos son complementarios. Si uno mide ${vars.angle1}°, ¿cuánto mide el otro?`,
  }),

  answerCalculator: (vars) => 90 - vars.angle1,

  optionGenerator: (vars, correctAnswer) => {
    const wrong = [
      180 - vars.angle1, // Wrong: used supplementary instead
      vars.angle1, // Wrong: same angle
      90 + vars.angle1, // Wrong: added instead of subtracted
    ];

    const allOptions = [correctAnswer, ...wrong];
    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.indexOf(correctAnswer);

    return {
      options: shuffled.map(n => `${n}°`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => ({
    explanation: `Dos ángulos complementarios suman 90°. Si uno mide ${vars.angle1}°, el otro mide 90° - ${vars.angle1}° = ${answer}°.`,
  }),
};

export const supplementaryAngles: ProblemTemplate = {
  id: 'angles-supplementary',
  name: 'Supplementary Angles',
  subject: 'geometría',
  level: 'M1',
  difficulty: 'easy',
  topic: 'Geometría',
  tags: ['angles', 'supplementary'],

  variables: {
    angle1: () => randomInt(30, 150),
  },

  questionGenerator: (vars) => ({
    question: `Dos ángulos son suplementarios. Si uno mide ${vars.angle1}°, ¿cuánto mide el otro?`,
  }),

  answerCalculator: (vars) => 180 - vars.angle1,

  optionGenerator: (vars, correctAnswer) => {
    const wrong = [
      90 - vars.angle1, // Wrong: used complementary instead
      vars.angle1, // Wrong: same angle
      360 - vars.angle1, // Wrong: full circle
    ];

    const allOptions = [correctAnswer, ...wrong].filter(n => n > 0);
    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.indexOf(correctAnswer);

    return {
      options: shuffled.map(n => `${n}°`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => ({
    explanation: `Dos ángulos suplementarios suman 180°. Si uno mide ${vars.angle1}°, el otro mide 180° - ${vars.angle1}° = ${answer}°.`,
  }),
};

export const triangleAngleSum: ProblemTemplate = {
  id: 'triangle-angle-sum',
  name: 'Triangle Angle Sum',
  subject: 'geometría',
  level: 'M1',
  difficulty: 'medium',
  topic: 'Geometría',
  tags: ['angles', 'triangle'],

  variables: {
    angle1: () => randomInt(30, 80),
    angle2: () => randomInt(30, 80),
  },

  validator: (vars) => vars.angle1 + vars.angle2 < 180,

  questionGenerator: (vars) => ({
    question: `En un triángulo, dos ángulos miden ${vars.angle1}° y ${vars.angle2}°. ¿Cuánto mide el tercer ángulo?`,
  }),

  answerCalculator: (vars) => 180 - vars.angle1 - vars.angle2,

  optionGenerator: (vars, correctAnswer) => {
    const wrong = [
      360 - vars.angle1 - vars.angle2, // Wrong: used 360 instead of 180
      vars.angle1 + vars.angle2, // Wrong: added instead of subtracted
      90 - vars.angle1, // Wrong: used only one angle
    ];

    const allOptions = [correctAnswer, ...wrong];
    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.indexOf(correctAnswer);

    return {
      options: shuffled.map(n => `${n}°`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => ({
    explanation: `La suma de los ángulos internos de un triángulo es 180°. El tercer ángulo mide: 180° - ${vars.angle1}° - ${vars.angle2}° = ${answer}°.`,
  }),
};

// ============================================================================
// PYTHAGOREAN THEOREM TEMPLATES
// ============================================================================

export const pythagoreanTheorem: ProblemTemplate = {
  id: 'pythagoras-find-hypotenuse',
  name: 'Pythagorean Theorem - Find Hypotenuse',
  subject: 'geometría',
  level: 'M2',
  difficulty: 'medium',
  topic: 'Geometría',
  tags: ['pythagoras', 'right-triangle', 'theorem'],

  variables: {
    a: () => randomChoice([3, 5, 6, 8, 9, 12]),
    b: () => randomChoice([4, 5, 8, 12, 15, 16]),
  },

  validator: (vars) => {
    // Ensure it makes a valid right triangle
    const cSquared = vars.a * vars.a + vars.b * vars.b;
    const c = Math.sqrt(cSquared);
    return c === Math.floor(c); // c should be an integer
  },

  questionGenerator: (vars) => ({
    question: `Un triángulo rectángulo tiene catetos de ${vars.a} cm y ${vars.b} cm. ¿Cuánto mide la hipotenusa?`,
  }),

  answerCalculator: (vars) => {
    return Math.sqrt(vars.a * vars.a + vars.b * vars.b);
  },

  optionGenerator: (vars, correctAnswer) => {
    const wrong = [
      vars.a + vars.b, // Wrong: added instead of Pythagorean
      Math.abs(vars.a - vars.b), // Wrong: subtracted
      (vars.a + vars.b) / 2, // Wrong: average
    ];

    const allOptions = [correctAnswer, ...wrong];
    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.indexOf(correctAnswer);

    return {
      options: shuffled.map(n => `${n} cm`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => ({
    explanation: `Por el teorema de Pitágoras: c² = a² + b² = ${vars.a}² + ${vars.b}² = ${vars.a * vars.a} + ${vars.b * vars.b} = ${vars.a * vars.a + vars.b * vars.b}. Por lo tanto, c = √${vars.a * vars.a + vars.b * vars.b} = ${answer} cm.`,
    explanationLatex: `Por el teorema de Pitágoras: $c^2 = a^2 + b^2 = ${vars.a}^2 + ${vars.b}^2 = ${vars.a * vars.a + vars.b * vars.b}$, entonces $c = \\sqrt{${vars.a * vars.a + vars.b * vars.b}} = ${answer}$ cm.`,
  }),
};

// ============================================================================
// EXPORT ALL TEMPLATES
// ============================================================================

export const geometryTemplates: ProblemTemplate[] = [
  rectangleArea,
  triangleArea,
  circleArea,
  rectanglePerimeter,
  cubeVolume,
  rectangularPrismVolume,
  cylinderVolume,
  complementaryAngles,
  supplementaryAngles,
  triangleAngleSum,
  pythagoreanTheorem,
];
