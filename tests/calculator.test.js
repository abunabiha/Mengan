import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { calculateCateringTotal, formatIDR, buildCateringWhatsAppUrl, EXTRAS } from '../js/modules/calculator.js';

describe('Modul Kalkulator Katering & Nasi Kotak', () => {
  test('formatIDR memformat angka dengan simbol Rupiah Indonesia yang benar', () => {
    const formatted = formatIDR(45000);
    assert.ok(formatted.includes('45.000') || formatted.includes('45,000'));
    assert.ok(formatted.includes('Rp'));

    assert.strictEqual(formatIDR('bukan-angka'), 'Rp 0');
    assert.strictEqual(formatIDR(NaN), 'Rp 0');
  });

  test('Perhitungan dasar katering tanpa diskon (< 50 porsi)', () => {
    // Paket Nasi Kotak Spesial: 30.000 / porsi, 20 porsi = 600.000
    const res = calculateCateringTotal({
      packageId: 'paket-nasi-kotak-spesial',
      portions: 20,
      includeDrink: false,
      includeSnack: false,
      packagingType: 'standard'
    });

    assert.strictEqual(res.portions, 20);
    assert.strictEqual(res.pricePerPortion, 30000);
    assert.strictEqual(res.subtotal, 600000);
    assert.strictEqual(res.discountPercent, 0);
    assert.strictEqual(res.discountAmount, 0);
    assert.strictEqual(res.grandTotal, 600000);
    assert.strictEqual(res.hasFreeDelivery, false);
  });

  test('Perhitungan diskon volume 5% untuk 50 sampai 99 porsi', () => {
    // Paket Nasi Kotak Spesial: 30.000 * 50 = 1.500.000 -> Diskon 5% = 75.000 -> Total = 1.425.000
    const res = calculateCateringTotal({
      packageId: 'paket-nasi-kotak-spesial',
      portions: 50,
      includeDrink: false,
      includeSnack: false,
      packagingType: 'standard'
    });

    assert.strictEqual(res.subtotal, 1500000);
    assert.strictEqual(res.discountPercent, 5);
    assert.strictEqual(res.discountAmount, 75000);
    assert.strictEqual(res.grandTotal, 1425000);
    assert.strictEqual(res.hasFreeDelivery, true);
  });

  test('Perhitungan diskon volume 10% untuk >= 100 porsi', () => {
    // 30.000 * 100 = 3.000.000 -> Diskon 10% = 300.000 -> Total = 2.700.000
    const res = calculateCateringTotal({
      packageId: 'paket-nasi-kotak-spesial',
      portions: 100,
      includeDrink: false,
      includeSnack: false,
      packagingType: 'standard'
    });

    assert.strictEqual(res.subtotal, 3000000);
    assert.strictEqual(res.discountPercent, 10);
    assert.strictEqual(res.discountAmount, 300000);
    assert.strictEqual(res.grandTotal, 2700000);
    assert.strictEqual(res.hasFreeDelivery, true);
  });

  test('Perhitungan addon minuman, camilan, dan bento packaging', () => {
    // Base: 30.000 + Drink (4.000) + Snack (6.000) + Bento (3.000) = 43.000 / porsi
    const res = calculateCateringTotal({
      packageId: 'paket-nasi-kotak-spesial',
      portions: 10,
      includeDrink: true,
      includeSnack: true,
      packagingType: 'bento'
    });

    const expectedPortionPrice = 30000 + EXTRAS.drink.price + EXTRAS.snack.price + EXTRAS.packaging.bento.price;
    assert.strictEqual(res.pricePerPortion, expectedPortionPrice);
    assert.strictEqual(res.grandTotal, expectedPortionPrice * 10);
  });

  test('buildCateringWhatsAppUrl menghasilkan URL valid dengan nomor admin dan pesan terenkripsi', () => {
    const calcResult = calculateCateringTotal({
      packageId: 'paket-seruit-tampah',
      portions: 25
    });

    const customer = {
      name: 'Ibu Sarah',
      eventDate: '2026-11-20',
      address: 'Rajabasa, Bandar Lampung',
      notes: 'Sambel dipisah'
    };

    const url = buildCateringWhatsAppUrl(calcResult, customer, '6281541446388');
    assert.ok(url.startsWith('https://wa.me/6281541446388?text='));
    assert.ok(url.includes(encodeURIComponent('Ibu Sarah')));
    assert.ok(url.includes(encodeURIComponent('Paket Seruit Tampah')));
    assert.ok(url.includes(encodeURIComponent('25 Porsi')));
  });
});
