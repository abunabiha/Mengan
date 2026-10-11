/**
 * Script Validasi Integritas Proyek & Aset
 */

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const REQUIRED_FILES = [
  'index.html',
  'css/styles.css',
  'js/app.js',
  'js/data/menu-data.js',
  'js/data/reviews-data.js',
  'js/modules/calculator.js',
  'js/modules/reservation.js',
  'js/modules/menu-renderer.js',
  'js/modules/ui.js',
  '.github/workflows/ci-cd.yml',
  'docs/SDLC_DOCUMENTATION.md',
  'package.json',
  '.gitignore'
];

console.log('📦 Memeriksa integritas berkas proyek...');

let missing = 0;
for (const relPath of REQUIRED_FILES) {
  const full = resolve(relPath);
  if (existsSync(full)) {
    console.log(`  ✓ Ada: ${relPath}`);
  } else {
    console.error(`  ✗ Hilang: ${relPath}`);
    missing++;
  }
}

// Validasi package.json
try {
  const pkg = JSON.parse(readFileSync(resolve('package.json'), 'utf-8'));
  if (!pkg.name || !pkg.scripts || !pkg.scripts.test) {
    console.error('  ✗ package.json tidak memiliki konfigurasi script lengkap');
    missing++;
  }
} catch (e) {
  console.error('  ✗ package.json format JSON tidak valid:', e.message);
  missing++;
}

if (missing > 0) {
  console.error(`\n❌ Integritas proyek gagal (${missing} masalah ditemukan).`);
  process.exit(1);
} else {
  console.log('\n✅ Semua berkas penting lengkap & terverifikasi!');
}
