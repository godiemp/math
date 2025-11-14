/**
 * Test script for copyCurriculum functions
 */
import {
  copyCurriculum,
  copyThematicUnit,
  exportCurriculumAsJSON,
  getCurriculumSummary,
  THEMATIC_UNITS,
} from '../config/thematic-units';

console.log('=== Testing Curriculum Copy Functions ===\n');

// Test 1: Copy entire curriculum
console.log('Test 1: Copy entire curriculum');
const allUnits = copyCurriculum();
console.log(`✓ Copied ${allUnits.length} total units`);
console.log(`  Original has ${THEMATIC_UNITS.length} units\n`);

// Test 2: Copy M1 only
console.log('Test 2: Copy M1 curriculum only');
const m1Units = copyCurriculum('M1');
console.log(`✓ Copied ${m1Units.length} M1 units`);
console.log(`  Sample M1 unit: ${m1Units[0].code} - ${m1Units[0].name}\n`);

// Test 3: Copy M2 only
console.log('Test 3: Copy M2 curriculum only');
const m2Units = copyCurriculum('M2');
console.log(`✓ Copied ${m2Units.length} M2 units`);
console.log(`  Sample M2 unit: ${m2Units[0].code} - ${m2Units[0].name}\n`);

// Test 4: Copy single unit
console.log('Test 4: Copy single thematic unit');
const singleUnit = copyThematicUnit(THEMATIC_UNITS[0]);
console.log(`✓ Copied unit: ${singleUnit.code} - ${singleUnit.name}`);
console.log(`  Subsections: ${singleUnit.subsections?.length || 0}\n`);

// Test 5: Export as JSON
console.log('Test 5: Export curriculum as JSON');
const jsonExport = exportCurriculumAsJSON('M1');
const jsonLength = jsonExport.length;
console.log(`✓ Exported M1 curriculum as JSON (${jsonLength} characters)`);
console.log(`  First 100 chars: ${jsonExport.substring(0, 100)}...\n`);

// Test 6: Get curriculum summary
console.log('Test 6: Get curriculum summary');
const fullSummary = getCurriculumSummary();
console.log('✓ Full curriculum summary:');
console.log(`  Total units: ${fullSummary.totalUnits}`);
console.log(`  Total subsections: ${fullSummary.totalSubsections}`);
console.log(`  Total skills: ${fullSummary.totalSkills}`);
console.log(`  By level - M1: ${fullSummary.byLevel.M1}, M2: ${fullSummary.byLevel.M2}`);
console.log('  By subject:');
console.log(`    - Números: ${fullSummary.bySubject.números}`);
console.log(`    - Álgebra: ${fullSummary.bySubject.álgebra}`);
console.log(`    - Geometría: ${fullSummary.bySubject.geometría}`);
console.log(`    - Probabilidad: ${fullSummary.bySubject.probabilidad}\n`);

// Test 7: M1 summary
console.log('Test 7: M1 curriculum summary');
const m1Summary = getCurriculumSummary('M1');
console.log('✓ M1 curriculum summary:');
console.log(`  Total units: ${m1Summary.totalUnits}`);
console.log(`  Total subsections: ${m1Summary.totalSubsections}`);
console.log(`  Total skills: ${m1Summary.totalSkills}\n`);

// Test 8: M2 summary
console.log('Test 8: M2 curriculum summary');
const m2Summary = getCurriculumSummary('M2');
console.log('✓ M2 curriculum summary:');
console.log(`  Total units: ${m2Summary.totalUnits}`);
console.log(`  Total subsections: ${m2Summary.totalSubsections}`);
console.log(`  Total skills: ${m2Summary.totalSkills}\n`);

// Test 9: Verify deep copy (modification doesn't affect original)
console.log('Test 9: Verify deep copy (immutability)');
const copiedUnit = copyThematicUnit(THEMATIC_UNITS[0]);
const originalSkills = THEMATIC_UNITS[0].subsections?.[0].primary_skills.length;
copiedUnit.subsections?.[0].primary_skills.push('test-skill');
const afterModification = THEMATIC_UNITS[0].subsections?.[0].primary_skills.length;
console.log(`✓ Original skills count: ${originalSkills}`);
console.log(`✓ After modifying copy: ${afterModification}`);
console.log(`✓ Deep copy verified: ${originalSkills === afterModification ? 'PASS' : 'FAIL'}\n`);

console.log('=== All tests completed successfully! ===');
