const fs = require('fs');
const path = require('path');

const CSV_PATH = '/Users/diegomoya/Library/Application Support/com.conductor.app/uploads/originals/659a5285-5b67-4f36-b874-70736928c7a1.csv';
const OUTPUT_PATH = path.join(__dirname, '../lib/schools/data.ts');

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());

  return result;
}

function main() {
  console.log('Reading CSV...');
  const csv = fs.readFileSync(CSV_PATH, 'utf-8');
  const lines = csv.split('\n');

  console.log(`Total lines: ${lines.length}`);

  // Skip header
  const schools = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = parseCSVLine(line);

    // Extract fields by index (0-based)
    const rbd = parseInt(cols[1], 10);
    const name = cols[3].replace(/\s+/g, ' ').trim(); // Trim excess whitespace
    const dependencyCode = parseInt(cols[4], 10);
    const isRural = cols[6] === '1';
    const regionCode = parseInt(cols[7], 10);
    const regionName = cols[8].trim();
    const communeCode = parseInt(cols[10], 10);
    const communeName = cols[11].replace(/\s+/g, ' ').trim();
    const status = parseInt(cols[14], 10);

    // High school enrollment (ENS_5 + ENS_6 + ENS_7 + ENS_8)
    const matEns5 = parseInt(cols[33], 10) || 0;
    const matEns6 = parseInt(cols[37], 10) || 0;
    const matEns7 = parseInt(cols[40], 10) || 0;
    const matEns8 = parseInt(cols[43], 10) || 0;
    const highSchoolEnrollment = matEns5 + matEns6 + matEns7 + matEns8;

    const totalEnrollment = parseInt(cols[47], 10) || 0;

    // Skip invalid entries
    if (isNaN(rbd) || !name) continue;

    schools.push({
      rbd,
      name,
      regionCode,
      regionName,
      communeCode,
      communeName,
      dependencyCode,
      status,
      isRural,
      totalEnrollment,
      highSchoolEnrollment,
    });
  }

  console.log(`Parsed ${schools.length} schools`);

  // Generate TypeScript
  const output = `import { School } from './types';

export const schools: School[] = ${JSON.stringify(schools, null, 2)};
`;

  fs.writeFileSync(OUTPUT_PATH, output);
  console.log(`Output written to ${OUTPUT_PATH}`);

  // Stats
  const withHighSchool = schools.filter(s => s.highSchoolEnrollment > 0).length;
  const functioning = schools.filter(s => s.status === 1).length;
  console.log(`\nStats:`);
  console.log(`- Total schools: ${schools.length}`);
  console.log(`- With high school: ${withHighSchool}`);
  console.log(`- Functioning (status=1): ${functioning}`);
}

main();
