/**
 * Modul Reservasi Meja Restoran "Mengan Geh"
 * Validasi form & generator chat konfirmasi WhatsApp resmi
 */

/**
 * Validasi nomor telepon format Indonesia
 * @param {string} phone
 * @returns {boolean}
 */
export function validateIndonesianPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Format yang diizinkan: 08xxx atau +628xxx atau 628xxx (panjang 10 - 15 digit)
  return /^(08|\+628|628)[0-9]{8,12}$/.test(cleaned);
}

/**
 * Validasi tanggal tidak boleh sebelum hari ini
 * @param {string} dateString YYYY-MM-DD
 * @returns {boolean}
 */
export function validateReservationDate(dateString) {
  if (!dateString) return false;
  const inputDate = new Date(dateString);
  if (isNaN(inputDate.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return inputDate >= today;
}

/**
 * Validasi jam kunjungan (10:00 - 21:00 WIB)
 * @param {string} timeString HH:MM
 * @returns {boolean}
 */
export function validateReservationTime(timeString) {
  if (!timeString) return false;
  const match = timeString.match(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/);
  if (!match) return false;

  const [_, hours, minutes] = match;
  const totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  const openMinutes = 10 * 60; // 10:00
  const closeMinutes = 21 * 60 + 30; // 21:30

  return totalMinutes >= openMinutes && totalMinutes <= closeMinutes;
}

/**
 * Validasi seluruh field form reservasi
 * @param {Object} data
 * @returns {{ isValid: boolean, errors: Object }}
 */
export function validateReservationForm(data) {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Nama lengkap wajib diisi minimal 2 karakter.';
  }

  if (!validateIndonesianPhone(data.phone)) {
    errors.phone = 'Nomor WhatsApp tidak valid (contoh: 081541446388 atau 082376747987).';
  }

  if (!validateReservationDate(data.date)) {
    errors.date = 'Tanggal reservasi tidak boleh tanggal yang sudah lewat.';
  }

  if (!validateReservationTime(data.time)) {
    errors.time = 'Jam reservasi harus berada dalam jam operasional (10.00 - 21.30 WIB).';
  }

  const guests = parseInt(data.guests, 10);
  if (isNaN(guests) || guests < 1 || guests > 150) {
    errors.guests = 'Jumlah tamu harus antara 1 sampai 150 orang.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Menghasilkan link WhatsApp untuk konfirmasi reservasi
 * @param {Object} formData
 * @param {string} adminPhone
 * @returns {string} URL WhatsApp
 */
export function generateReservationWhatsAppUrl(formData, adminPhone = '6281541446388') {
  const {
    name = '',
    phone = '',
    date = '',
    time = '',
    guests = 1,
    seating = 'Lesehan Tradisional',
    specialRequest = '-'
  } = formData;

  const lines = [
    `Halo Admin Restoran Mengan Geh, saya ingin melakukan *RESERVASI MEJA*:`,
    ``,
    `*DETAIL KEDATANGAN:*`,
    `• Atas Nama: ${name}`,
    `• No. WhatsApp: ${phone}`,
    `• Tanggal: ${date}`,
    `• Jam: ${time} WIB`,
    `• Jumlah Tamu: ${guests} Orang`,
    `• Pilihan Area: ${seating}`,
    `• Permintaan Khusus / Menu Awal: ${specialRequest || 'Tidak ada'}`,
    ``,
    `Mohon konfirmasi ketersediaan meja untuk waktu tersebut. Terima kasih!`
  ];

  const encoded = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${adminPhone}?text=${encoded}`;
}
