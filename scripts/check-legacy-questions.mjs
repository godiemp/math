import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const BASE = './lib/questions';

// Get all question IDs from curriculum files (m1-xxx-###.ts, m2-xxx-###.ts, M1-XXX-###.ts)
function getCurriculumIds() {
  const ids = new Set();
  const dirs = ['m1/algebra', 'm1/numeros', 'm1/geometria', 'm1/probabilidad', 'm2/algebra', 'm2/numeros', 'm2/geometria', 'm2/probabilidad'];

  for (const dir of dirs) {
    const fullPath = join(BASE, dir);
    const files = readdirSync(fullPath).filter(f =>
      f.match(/^m[12]-.*-\d{3}\.ts$/i) || f.match(/^M[12]-.*-\d{3}\.ts$/i)
    );

    for (const file of files) {
      const content = readFileSync(join(fullPath, file), 'utf-8');
      const matches = content.matchAll(/id:\s*['"]([^'"]+)['"]/g);
      for (const match of matches) {
        ids.add(match[1]);
      }
    }
  }
  return ids;
}

// Get all question IDs from legacy files
function getLegacyIds() {
  const result = {};
  const dirs = ['m1/algebra', 'm1/numeros', 'm1/geometria', 'm1/probabilidad', 'm2/algebra', 'm2/numeros', 'm2/geometria', 'm2/probabilidad'];

  for (const dir of dirs) {
    const fullPath = join(BASE, dir);
    const files = readdirSync(fullPath).filter(f =>
      f.endsWith('.ts') &&
      !f.match(/^m[12]-.*-\d{3}\.ts$/i) &&
      !f.match(/^M[12]-.*-\d{3}\.ts$/i) &&
      f !== 'index.ts' &&
      !f.includes('source')
    );

    for (const file of files) {
      const content = readFileSync(join(fullPath, file), 'utf-8');
      const matches = content.matchAll(/id:\s*['"]([^'"]+)['"]/g);
      const ids = [];
      for (const match of matches) {
        ids.push(match[1]);
      }
      if (ids.length > 0) {
        result[join(dir, file)] = ids;
      }
    }
  }
  return result;
}

const curriculumIds = getCurriculumIds();
const legacyFiles = getLegacyIds();

console.log('=== CURRICULUM FILES ===');
console.log('Total unique question IDs:', curriculumIds.size);

console.log('\n=== LEGACY FILES ANALYSIS ===');
let totalOrphaned = 0;
let totalDuplicated = 0;
const orphanedFiles = [];
const duplicatedFiles = [];

for (const [file, ids] of Object.entries(legacyFiles)) {
  const orphaned = ids.filter(id => !curriculumIds.has(id));
  const duplicated = ids.filter(id => curriculumIds.has(id));

  if (orphaned.length > 0) {
    orphanedFiles.push({ file, orphaned, total: ids.length });
    totalOrphaned += orphaned.length;
  }
  if (duplicated.length === ids.length && ids.length > 0) {
    duplicatedFiles.push(file);
    totalDuplicated += duplicated.length;
  }
}

console.log('\n--- SAFE TO REMOVE (all questions already in curriculum) ---');
duplicatedFiles.forEach(f => console.log(' ', f));

console.log('\n--- HAS UNIQUE QUESTIONS (NOT in curriculum) ---');
orphanedFiles.forEach(({file, orphaned, total}) => {
  console.log(' ', file, ':', orphaned.length, '/', total, 'unique');
  orphaned.forEach(id => console.log('    -', id));
});

console.log('\n=== SUMMARY ===');
console.log('Files safe to remove:', duplicatedFiles.length);
console.log('Files with unique questions:', orphanedFiles.length);
console.log('Total orphaned question IDs:', totalOrphaned);
