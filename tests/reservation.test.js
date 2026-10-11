import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  validateIndonesianPhone,
  validateReservationDate,
  validateReservationTime,
  validateReservationForm,
  generateReservationWhatsAppUrl
} from '../js/modules/reservation.js';

describe('Modul Reservasi Meja & Validasi', () => {
  test('validateIndonesianPhone memvalidasi format nomor Indonesia', () => {
    // Valid formats
    assert.strictEqual(validateIndonesianPhone('081541446388'), true);
    assert.strictEqual(validateIndonesianPhone('082376747987'), true);
    assert.strictEqual(validateIndonesianPhone('+6281541446388'), true);
    assert.strictEqual(validateIndonesianPhone('6281541446388'), true);
    assert.strictEqual(validateIndonesianPhone('0812-3456-7890'), true);

    // Invalid formats
    assert.strictEqual(validateIndonesianPhone(''), false);
    assert.strictEqual(validateIndonesianPhone('021-123456'), false);
    assert.strictEqual(validateIndonesianPhone('12345'), false);
    assert.strictEqual(validateIndonesianPhone('abc081541446388'), false);
  });

  test('validateReservationDate menolak tanggal yang telah lewat', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split('T')[0];

    const todayStr = new Date().toISOString().split('T')[0];

    const future = new Date();
    future.setDate(future.getDate() + 10);
    const fStr = future.toISOString().split('T')[0];

    assert.strictEqual(validateReservationDate(yStr), false);
    assert.strictEqual(validateReservationDate(todayStr), true);
    assert.strictEqual(validateReservationDate(fStr), true);
    assert.strictEqual(validateReservationDate('invalid-date'), false);
  });

  test('validateReservationTime memvalidasi jam operasional (10.00 - 21.30)', () => {
    assert.strictEqual(validateReservationTime('10:00'), true);
    assert.strictEqual(validateReservationTime('12:30'), true);
    assert.strictEqual(validateReservationTime('19:45'), true);
    assert.strictEqual(validateReservationTime('21:30'), true);

    // Diluar jam operasional
    assert.strictEqual(validateReservationTime('08:00'), false);
    assert.strictEqual(validateReservationTime('09:59'), false);
    assert.strictEqual(validateReservationTime('22:00'), false);
    assert.strictEqual(validateReservationTime('02:00'), false);
    assert.strictEqual(validateReservationTime('invalid'), false);
  });

  test('validateReservationForm memeriksa seluruh input', () => {
    const todayStr = new Date().toISOString().split('T')[0];

    const validData = {
      name: 'Rian Maulana',
      phone: '081541446388',
      date: todayStr,
      time: '13:00',
      guests: 6,
      seating: 'Lesehan Tradisional'
    };

    const resValid = validateReservationForm(validData);
    assert.strictEqual(resValid.isValid, true);
    assert.strictEqual(Object.keys(resValid.errors).length, 0);

    const invalidData = {
      name: 'A', // Terlalu pendek
      phone: '12345', // Nomor salah
      date: '2020-01-01', // Tanggal lampau
      time: '04:00', // Di luar jam operasional
      guests: 0 // Tamu < 1
    };

    const resInvalid = validateReservationForm(invalidData);
    assert.strictEqual(resInvalid.isValid, false);
    assert.ok(resInvalid.errors.name);
    assert.ok(resInvalid.errors.phone);
    assert.ok(resInvalid.errors.date);
    assert.ok(resInvalid.errors.time);
    assert.ok(resInvalid.errors.guests);
  });

  test('generateReservationWhatsAppUrl menghasilkan tautan chat reservasi yang presisi', () => {
    const formData = {
      name: 'Budi Santoso',
      phone: '081541446388',
      date: '2026-12-01',
      time: '19:00',
      guests: 8,
      seating: 'Lesehan Tradisional',
      specialRequest: 'Siapkan 2 Seruit Tampah Ikan Nila'
    };

    const url = generateReservationWhatsAppUrl(formData, '6281541446388');
    assert.ok(url.startsWith('https://wa.me/6281541446388?text='));
    assert.ok(url.includes(encodeURIComponent('Budi Santoso')));
    assert.ok(url.includes(encodeURIComponent('8 Orang')));
    assert.ok(url.includes(encodeURIComponent('Lesehan Tradisional')));
  });
});
