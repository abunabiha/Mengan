/**
 * Modul Kalkulator Estimasi Katering & Nasi Kotak Restoran "Mengan Geh"
 */

import { CATERING_PACKAGES } from '../data/menu-data.js';

export const EXTRAS = {
  drink: { name: 'Es Teh Manis / Air Mineral Botol', price: 4000 },
  snack: { name: 'Kue Basah Tradisional / Buah Potong', price: 6000 },
  packaging: {
    standard: { name: 'Kotak Dus Standard Ramah Lingkungan', price: 0 },
    bento: { name: 'Bento Box Premium Sekat 5', price: 3000 },
    tampah: { name: 'Tampah Bambu Tradisional', price: 15000 }
  }
};

/**
 * Format angka ke mata uang Rupiah (IDR)
 * @param {number} amount
 * @returns {string}
 */
export function formatIDR(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'Rp 0';
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Menghitung rincian biaya katering
 * @param {Object} options
 * @param {string} options.packageId
 * @param {number} options.portions
 * @param {boolean} [options.includeDrink]
 * @param {boolean} [options.includeSnack]
 * @param {string} [options.packagingType]
 * @returns {Object} Hasil perhitungan
 */
export function calculateCateringTotal({
  packageId,
  portions = 10,
  includeDrink = false,
  includeSnack = false,
  packagingType = 'standard'
}) {
  const selectedPackage = CATERING_PACKAGES.find(p => p.id === packageId) || CATERING_PACKAGES[0];
  const safePortions = Math.max(1, parseInt(portions, 10) || 1);

  const basePricePerPortion = selectedPackage.pricePerPortion;
  const drinkPrice = includeDrink ? EXTRAS.drink.price : 0;
  const snackPrice = includeSnack ? EXTRAS.snack.price : 0;
  const packagingPrice = EXTRAS.packaging[packagingType] ? EXTRAS.packaging[packagingType].price : 0;

  const pricePerPortion = basePricePerPortion + drinkPrice + snackPrice + packagingPrice;
  const subtotal = pricePerPortion * safePortions;

  // Aturan diskon volume:
  // >= 100 porsi -> diskon 10%
  // >= 50 porsi  -> diskon 5%
  let discountPercent = 0;
  if (safePortions >= 100) {
    discountPercent = 10;
  } else if (safePortions >= 50) {
    discountPercent = 5;
  }

  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const grandTotal = subtotal - discountAmount;

  return {
    packageId: selectedPackage.id,
    packageName: selectedPackage.name,
    portions: safePortions,
    basePricePerPortion,
    addonsPerPortion: drinkPrice + snackPrice + packagingPrice,
    pricePerPortion,
    subtotal,
    discountPercent,
    discountAmount,
    grandTotal,
    hasFreeDelivery: safePortions >= 50
  };
}

/**
 * Menghasilkan pesan WhatsApp pemesanan katering terstruktur
 * @param {Object} calcResult Hasil dari calculateCateringTotal
 * @param {Object} customerInfo { name, eventDate, address, notes }
 * @param {string} whatsappAdmin
 * @returns {string} URL WhatsApp API
 */
export function buildCateringWhatsAppUrl(calcResult, customerInfo = {}, whatsappAdmin = '6281541446388') {
  const { name = 'Pelanggan', eventDate = '-', address = '-', notes = '-' } = customerInfo;

  const lines = [
    `Halo Admin Mengan Geh, saya ingin konfirmasi pesanan Katering / Nasi Kotak:`,
    ``,
    `*RINCIAN PEMESANAN:*`,
    `• Paket: ${calcResult.packageName}`,
    `• Jumlah: ${calcResult.portions} Porsi`,
    `• Harga per Porsi: ${formatIDR(calcResult.pricePerPortion)}`,
    `• Subtotal: ${formatIDR(calcResult.subtotal)}`,
    calcResult.discountPercent > 0 ? `• Diskon Volume (${calcResult.discountPercent}%): -${formatIDR(calcResult.discountAmount)}` : null,
    `• *Estimasi Total: ${formatIDR(calcResult.grandTotal)}*`,
    calcResult.hasFreeDelivery ? `• Bonus: Gratis Ongkir Area Bandar Lampung (>= 50 Porsi)` : null,
    ``,
    `*DATA PEMESAN:*`,
    `• Nama: ${name}`,
    `• Tanggal Acara: ${eventDate}`,
    `• Alamat Pengiriman: ${address}`,
    `• Catatan Khusus: ${notes}`,
    ``,
    `Mohon info ketersediaan slot dan nomor rekening untuk pembayaran DP. Terima kasih!`
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${whatsappAdmin}?text=${text}`;
}
