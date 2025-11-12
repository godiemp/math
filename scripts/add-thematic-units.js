/**
 * Script to add thematic unit mappings to operations
 */

const fs = require('fs');
const path = require('path');

// Define mappings from operation types and levels to thematic units
const operationMappings = {
  // PHASE 1: ARITHMETIC (1-30) - All map to M1-NUM-001
  arithmetic: {
    addition: ['M1-NUM-001'], // Levels 1-5
    subtraction: ['M1-NUM-001'], // Levels 6-10
    multiplication: ['M1-NUM-001'], // Levels 11-17
    division: ['M1-NUM-001', 'M1-NUM-002'], // Levels 18-23 (with decimals)
    'mixed-arithmetic': ['M1-NUM-001', 'M1-NUM-002'], // Levels 24-30
  },

  // PHASE 2: ALGEBRAIC (31-60)
  algebraic: {
    'simple-equation': ['M1-ALG-006'], // Levels 31-40
    'expression-evaluation': ['M1-ALG-002'], // Levels 41-50
    'simplification': ['M1-ALG-001', 'M1-ALG-002'], // Levels 51-60
  },

  // PHASE 3: LOGICAL (61-90)
  logical: {
    'comparison': ['M1-NUM-001', 'M1-ALG-006'], // Levels 61-70
    'logical-operators': [], // Levels 71-80 - NO MAPPING (computational thinking)
    'compound-conditions': ['M1-ALG-006'], // Levels 81-90
  },

  // PHASE 4: STRUCTURAL (91-120)
  structural: {
    'sequences': [], // Levels 91-100 - NO MAPPING
    'sets': ['M1-PROB-004'], // Levels 101-110 - relates to probability space
    'functions': ['M1-ALG-009', 'M1-ALG-012'], // Levels 111-120
  },

  // PHASE 5: ALGORITHMIC (121-150)
  algorithmic: {
    'sorting': ['M1-PROB-002'], // Levels 121-130 - relates to median calculation
    'counting': ['M2-PROB-003'], // Levels 131-140
    'composition': [], // Levels 141-150 - NO MAPPING (functional programming)
  },
};

// Read the operations file
const filePath = path.join(__dirname, '..', 'lib', 'operationsPath.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Pattern to match operation level objects
const levelPattern = /\{\s*level:\s*(\d+),\s*title:\s*'([^']+)',\s*description:\s*'([^']+)',\s*operationType:\s*'([^']+)',\s*phase:\s*'([^']+)',\s*difficulty:\s*'([^']+)',\s*problemsToComplete:\s*(\d+),/g;

let match;
const replacements = [];

// Find all levels and determine their thematic units
while ((match = levelPattern.exec(content)) !== null) {
  const [fullMatch, level, title, description, operationType, phase, difficulty, problemsToComplete] = match;
  const levelNum = parseInt(level);

  // Skip if already has thematicUnits
  const afterMatch = content.substring(match.index + fullMatch.length, match.index + fullMatch.length + 100);
  if (afterMatch.includes('thematicUnits:')) {
    continue;
  }

  // Get thematic units for this operation type
  const thematicUnits = operationMappings[phase]?.[operationType] || [];

  // Create replacement with thematic units
  const thematicUnitsLine = thematicUnits.length > 0
    ? `    thematicUnits: ${JSON.stringify(thematicUnits)},\n`
    : ''; // Don't add field if no mappings

  const replacement = `{
    level: ${level},
    title: '${title}',
    description: '${description}',
    operationType: '${operationType}',
    phase: '${phase}',
    difficulty: '${difficulty}',
    problemsToComplete: ${problemsToComplete},
${thematicUnitsLine}`;

  replacements.push({
    index: match.index,
    original: fullMatch,
    replacement: replacement,
  });
}

// Apply replacements from end to start to preserve indices
replacements.reverse().forEach(({ index, original, replacement }) => {
  content = content.substring(0, index) + replacement + content.substring(index + original.length);
});

// Write back to file
fs.writeFileSync(filePath, content, 'utf8');

console.log(`✅ Added thematic unit mappings to operations`);
console.log(`   Processed ${replacements.length} operations`);

// Count operations by mapping status
const withMappings = replacements.filter(r => r.replacement.includes('thematicUnits')).length;
const withoutMappings = replacements.length - withMappings;

console.log(`   ${withMappings} operations with thematic unit mappings`);
console.log(`   ${withoutMappings} operations without mappings (will be reviewed for removal)`);
