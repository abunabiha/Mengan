import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { MENU_ITEMS, MENU_CATEGORIES, CATERING_PACKAGES } from '../js/data/menu-data.js';

describe('Data Integrity: Menu & Kategori', () => {
  test('MENU_CATEGORIES harus memiliki daftar kategori utama', () => {
    assert.ok(Array.isArray(MENU_CATEGORIES));
    assert.ok(MENU_CATEGORIES.length >= 5);

    const categoryIds = MENU_CATEGORIES.map(c => c.id);
    assert.ok(categoryIds.includes('all'));
    assert.ok(categoryIds.includes('seruit'));
    assert.ok(categoryIds.includes('nasi'));
    assert.ok(categoryIds.includes('lauk'));
    assert.ok(categoryIds.includes('sambal'));
  });

  test('Setiap item di MENU_ITEMS harus memiliki struktur data yang valid', () => {
    assert.ok(Array.isArray(MENU_ITEMS));
    assert.ok(MENU_ITEMS.length >= 10, 'Minimal ada 10 varian menu terdaftar');

    const validCategoryIds = MENU_CATEGORIES.map(c => c.id).filter(id => id !== 'all');
    const seenIds = new Set();

    for (const item of MENU_ITEMS) {
      // ID unik
      assert.ok(item.id, 'Item harus memiliki ID');
      assert.strictEqual(seenIds.has(item.id), false, `ID duplikat ditemukan: ${item.id}`);
      seenIds.add(item.id);

      // Nama & deskripsi
      assert.ok(typeof item.name === 'string' && item.name.length > 3, `Nama tidak valid untuk ${item.id}`);
      assert.ok(typeof item.description === 'string' && item.description.length > 10, `Deskripsi tidak valid untuk ${item.id}`);

      // Kategori valid
      assert.ok(validCategoryIds.includes(item.category), `Kategori "${item.category}" tidak valid untuk ${item.id}`);

      // Harga positif
      assert.ok(typeof item.price === 'number' && item.price > 0, `Harga harus angka positif untuk ${item.id}`);

      // Gambar & porsi
      assert.ok(typeof item.image === 'string' && item.image.startsWith('http'), `URL gambar tidak valid untuk ${item.id}`);
      assert.ok(typeof item.portionInfo === 'string', `Portion info tidak valid untuk ${item.id}`);
    }
  });

  test('CATERING_PACKAGES harus memiliki harga dan batas minimal order yang logis', () => {
    assert.ok(Array.isArray(CATERING_PACKAGES));
    assert.ok(CATERING_PACKAGES.length >= 3);

    for (const pkg of CATERING_PACKAGES) {
      assert.ok(pkg.id);
      assert.ok(pkg.name);
      assert.ok(typeof pkg.pricePerPortion === 'number' && pkg.pricePerPortion >= 15000);
      assert.ok(typeof pkg.minOrder === 'number' && pkg.minOrder >= 5);
      assert.ok(pkg.description);
    }
  });
});
