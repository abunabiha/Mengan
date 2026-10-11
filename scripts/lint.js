/**
 * Script Linter & Syntax Checker (Zero External Dependency)
 * Memverifikasi sintaks ECMAScript seluruh berkas JS dalam proyek
 */

import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

function getFiles(dir, ext = '.js') {
  let results = [];
  const list = readdirSync(dir);
  for (const file of list) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        results = results.concat(getFiles(fullPath, ext));
      }
    } else if (file.endsWith(ext)) {
      results.push(fullPath);
    }
  }
  return results;
}

console.log('🔍 Menjalankan Syntax Linter untuk berkas JavaScript...');

const jsFiles = [...getFiles('js'), ...getFiles('tests'), ...getFiles('scripts')];
let errors = 0;

for (const file of jsFiles) {
  try {
    execSync(`node --check "${file}"`, { stdio: 'pipe' });
    console.log(`  ✓ ${file}`);
  } catch (err) {
    console.error(`  ✗ SINTAKS ERROR di ${file}:\n${err.message}`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\n❌ Ditemukan ${errors} berkas dengan kesalahan sintaks.`);
  process.exit(1);
} else {
  console.log(`\n✅ Seluruh ${jsFiles.length} berkas JavaScript valid tanpa kesalahan sintaks!`);
}
