/**
 * Script to remove operations without thematic unit mappings
 * and renumber remaining operations
 */

const fs = require('fs');
const path = require('path');

// Read the operations file
const filePath = path.join(__dirname, '..', 'lib', 'operationsPath.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Operation types to remove (those without thematic unit mappings)
const operationTypesToRemove = [
  'logical-operators',  // Levels 71-80
  'sequences',          // Levels 91-100
  'composition'         // Levels 141-150
];

console.log('\n🗑️  Removing operations without thematic unit mappings...\n');

// Parse the file to find and remove operations
const operationPattern = /\{[^}]*level:\s*(\d+),[^}]*operationType:\s*'([^']+)'[^}]*\},?\s*/gs;

let newContent = content;
let removedCount = 0;
const removedLevels = [];

// First pass: identify and remove operations
let matches = Array.from(content.matchAll(operationPattern));
matches.reverse().forEach(match => {
  const [fullMatch, level, operationType] = match;

  if (operationTypesToRemove.includes(operationType)) {
    // Check if operation has thematicUnits
    if (!fullMatch.includes('thematicUnits')) {
      console.log(`  Removing Level ${level}: ${operationType}`);
      removedLevels.push(parseInt(level));
      removedCount++;

      // Remove this operation including any trailing comma and newline
      newContent = newContent.replace(fullMatch, '');
    }
  }
});

console.log(`\n✅ Removed ${removedCount} operations`);

// Now renumber remaining operations
console.log('\n🔢 Renumbering remaining operations...');

let currentLevel = 1;
const levelPattern = /level:\s*\d+,/g;

newContent = newContent.replace(levelPattern, (match) => {
  const replacement = `level: ${currentLevel},`;
  currentLevel++;
  return replacement;
});

const finalOperationCount = currentLevel - 1;
console.log(`   New total: ${finalOperationCount} operations (was 150)\n`);

// Write back to file
fs.writeFileSync(filePath, newContent, 'utf8');

console.log('✅ Successfully removed unmapped operations and renumbered levels');
console.log(`\nSummary:`);
console.log(`  - Removed: ${removedCount} operations`);
console.log(`  - Remaining: ${finalOperationCount} operations`);
console.log(`  - Reduction: ${((removedCount / 150) * 100).toFixed(1)}%\n`);

console.log('Removed operations by type:');
console.log('  - logical-operators: 10 operations (levels 71-80)');
console.log('  - sequences: 10 operations (levels 91-100)');
console.log('  - composition: 10 operations (levels 141-150)');
