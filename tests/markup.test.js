import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Markup & Semantic Validation (index.html)', () => {
  const htmlPath = path.resolve('index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

  test('index.html harus ada dan memiliki DOCTYPE serta atribut lang="id"', () => {
    assert.ok(htmlContent.length > 500);
    assert.ok(htmlContent.includes('<!DOCTYPE html>'));
    assert.ok(htmlContent.includes('<html lang="id">'));
  });

  test('Memiliki Title dan Meta Tags SEO & Open Graph yang lengkap', () => {
    assert.ok(htmlContent.includes('<title>Mengan Geh'), 'Title harus memuat nama resto');
    assert.ok(htmlContent.includes('name="description"'), 'Harus memiliki meta description');
    assert.ok(htmlContent.includes('name="keywords"'), 'Harus memiliki meta keywords');
    assert.ok(htmlContent.includes('property="og:title"'), 'Harus memiliki Open Graph title');
    assert.ok(htmlContent.includes('property="og:image"'), 'Harus memiliki Open Graph image');
  });

  test('Memiliki skema Schema.org (JSON-LD) yang valid untuk Restaurant', () => {
    assert.ok(htmlContent.includes('application/ld+json'));
    assert.ok(htmlContent.includes('"@type": "Restaurant"'));
    assert.ok(htmlContent.includes('"name": "Mengan Geh"'));
    assert.ok(htmlContent.includes('-5.3567562'));
    assert.ok(htmlContent.includes('105.2395415'));
  });

  test('Memiliki tautan dan embed Google Maps sesuai lokasi Mengan Geh', () => {
    // Memastikan koordinat lokasi dan tautan Google Maps tersedia
    assert.ok(htmlContent.includes('maps.google.com/maps?q=-5.3567562,105.2395415'));
    assert.ok(htmlContent.includes('https://www.google.com/maps/place/Mengan+Geh'));
  });

  test('Memiliki seluruh Section ID yang dituju oleh navigasi utama', () => {
    const requiredSections = [
      'beranda',
      'cerita',
      'menu',
      'kalkulator',
      'reservasi',
      'fasilitas',
      'lokasi',
      'faq'
    ];

    for (const sectionId of requiredSections) {
      assert.ok(
        htmlContent.includes(`id="${sectionId}"`),
        `Section dengan id="${sectionId}" wajib ada dalam index.html`
      );
    }
  });

  test('Atribut Aksesibilitas (A11y): Alt images, aria-labels, dan role', () => {
    assert.ok(htmlContent.includes('aria-label='), 'Harus memiliki atribut aria-label');
    assert.ok(htmlContent.includes('alt='), 'Gambar harus memiliki atribut alt');
    assert.ok(htmlContent.includes('aria-live='), 'Harus memiliki live region');
  });
});
