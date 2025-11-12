/**
 * Script to find operations without thematic unit mappings
 */

const { OPERATIONS_PATH } = require('../lib/operationsPath');

const unmappedOperations = OPERATIONS_PATH.filter(op => !op.thematicUnits || op.thematicUnits.length === 0);

console.log(`\n📊 Operations without thematic unit mappings: ${unmappedOperations.length}\n`);

// Group by operation type
const byType = {};
unmappedOperations.forEach(op => {
  if (!byType[op.operationType]) {
    byType[op.operationType] = [];
  }
  byType[op.operationType].push(op);
});

Object.entries(byType).forEach(([type, operations]) => {
  console.log(`\n${type.toUpperCase()} (${operations.length} operations):`);
  operations.forEach(op => {
    console.log(`  - Level ${op.level}: ${op.title} (${op.phase})`);
  });
});

console.log(`\n📋 Summary by phase:`);
const byPhase = {};
unmappedOperations.forEach(op => {
  byPhase[op.phase] = (byPhase[op.phase] || 0) + 1;
});
Object.entries(byPhase).forEach(([phase, count]) => {
  console.log(`  ${phase}: ${count} operations`);
});
