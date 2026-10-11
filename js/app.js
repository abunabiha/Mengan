/**
 * Entry Point Aplikasi Web Restoran "Mengan Geh" Bandar Lampung
 */

import { MenuRenderer } from './modules/menu-renderer.js';
import { UIManager } from './modules/ui.js';
import { calculateCateringTotal, buildCateringWhatsAppUrl, formatIDR } from './modules/calculator.js';
import { validateReservationForm, generateReservationWhatsAppUrl } from './modules/reservation.js';
import { CATERING_PACKAGES } from './data/menu-data.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inisialisasi UI Manager
  const ui = new UIManager();
  ui.init();

  // 2. Inisialisasi Menu Renderer
  const menuRenderer = new MenuRenderer({
    categoryContainerId: 'menu-categories',
    gridContainerId: 'menu-grid',
    searchInputId: 'menu-search',
    itemCountId: 'menu-count'
  });
  menuRenderer.init();

  // 3. Inisialisasi Kalkulator Katering & Nasi Kotak
  initCateringCalculator(ui);

  // 4. Inisialisasi Form Reservasi Meja
  initReservationForm(ui);

  // 5. Inisialisasi Jam Operasional Status (Real-time Open/Closed indicator)
  updateOpeningStatus();
});

/**
 * Logika Interaktif Kalkulator Katering
 */
function initCateringCalculator(ui) {
  const packageSelect = document.getElementById('calc-package');
  const portionInput = document.getElementById('calc-portions');
  const portionRange = document.getElementById('calc-portions-range');
  const drinkCheckbox = document.getElementById('calc-addon-drink');
  const snackCheckbox = document.getElementById('calc-addon-snack');
  const packagingSelect = document.getElementById('calc-packaging');

  // Output Elements
  const outPortions = document.getElementById('out-portions');
  const outPerPortion = document.getElementById('out-per-portion');
  const outSubtotal = document.getElementById('out-subtotal');
  const outDiscountRow = document.getElementById('out-discount-row');
  const outDiscount = document.getElementById('out-discount');
  const outTotal = document.getElementById('out-total');
  const outDeliveryBonus = document.getElementById('out-delivery-bonus');
  const btnSubmitCatering = document.getElementById('btn-submit-catering');

  // Customer Info Inputs
  const custNameInput = document.getElementById('calc-name');
  const custDateInput = document.getElementById('calc-date');
  const custAddressInput = document.getElementById('calc-address');
  const custNotesInput = document.getElementById('calc-notes');

  if (!packageSelect || !portionInput) return;

  // Sinkronisasi input number & range
  if (portionRange) {
    portionRange.addEventListener('input', (e) => {
      portionInput.value = e.target.value;
      recalculate();
    });
  }

  portionInput.addEventListener('input', (e) => {
    if (portionRange) portionRange.value = e.target.value;
    recalculate();
  });

  packageSelect.addEventListener('change', recalculate);
  drinkCheckbox.addEventListener('change', recalculate);
  snackCheckbox.addEventListener('change', recalculate);
  packagingSelect.addEventListener('change', recalculate);

  function recalculate() {
    const calcResult = calculateCateringTotal({
      packageId: packageSelect.value,
      portions: parseInt(portionInput.value, 10) || 10,
      includeDrink: drinkCheckbox.checked,
      includeSnack: snackCheckbox.checked,
      packagingType: packagingSelect.value
    });

    if (outPortions) outPortions.textContent = `${calcResult.portions} Porsi`;
    if (outPerPortion) outPerPortion.textContent = formatIDR(calcResult.pricePerPortion);
    if (outSubtotal) outSubtotal.textContent = formatIDR(calcResult.subtotal);
    
    if (outDiscountRow && outDiscount) {
      if (calcResult.discountPercent > 0) {
        outDiscountRow.style.display = 'flex';
        outDiscount.textContent = `-${formatIDR(calcResult.discountAmount)} (${calcResult.discountPercent}%)`;
      } else {
        outDiscountRow.style.display = 'none';
      }
    }

    if (outTotal) outTotal.textContent = formatIDR(calcResult.grandTotal);

    if (outDeliveryBonus) {
      outDeliveryBonus.style.display = calcResult.hasFreeDelivery ? 'inline-block' : 'none';
    }

    return calcResult;
  }

  // Hitung awal
  recalculate();

  // Tombol Kirim Rincian Katering via WhatsApp
  if (btnSubmitCatering) {
    btnSubmitCatering.addEventListener('click', (e) => {
      e.preventDefault();
      const calcResult = recalculate();

      const customerInfo = {
        name: custNameInput ? custNameInput.value.trim() : '',
        eventDate: custDateInput ? custDateInput.value : '',
        address: custAddressInput ? custAddressInput.value.trim() : '',
        notes: custNotesInput ? custNotesInput.value.trim() : ''
      };

      if (!customerInfo.name) {
        ui.showToast('Mohon masukkan nama pemesan katering', 'warning');
        if (custNameInput) custNameInput.focus();
        return;
      }

      const waUrl = buildCateringWhatsAppUrl(calcResult, customerInfo);
      ui.showToast('Membuka WhatsApp untuk mengirim pesanan...', 'success');
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }
}

/**
 * Logika Form Reservasi Meja
 */
function initReservationForm(ui) {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  // Set default minimum date ke hari ini
  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('res-name')?.value.trim() || '',
      phone: document.getElementById('res-phone')?.value.trim() || '',
      date: document.getElementById('res-date')?.value || '',
      time: document.getElementById('res-time')?.value || '',
      guests: document.getElementById('res-guests')?.value || 1,
      seating: document.getElementById('res-seating')?.value || 'Lesehan Tradisional',
      specialRequest: document.getElementById('res-notes')?.value.trim() || ''
    };

    const validation = validateReservationForm(formData);

    // Reset error styling
    document.querySelectorAll('.form-error-msg').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-group input, .form-group select').forEach(el => el.classList.remove('has-error'));

    if (!validation.isValid) {
      Object.entries(validation.errors).forEach(([field, msg]) => {
        const errEl = document.getElementById(`err-${field}`);
        const inputEl = document.getElementById(`res-${field}`);
        if (errEl) errEl.textContent = msg;
        if (inputEl) inputEl.classList.add('has-error');
      });
      ui.showToast('Mohon perbaiki data formulir reservasi', 'error');
      return;
    }

    const waUrl = generateReservationWhatsAppUrl(formData);
    ui.showToast('Data valid! Mengalihkan ke WhatsApp Admin...', 'success');
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}

/**
 * Status Buka/Tutup Restoran Berdasarkan Jam Lokal
 */
function updateOpeningStatus() {
  const badge = document.getElementById('live-status-badge');
  if (!badge) return;

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  // Buka 10:00 (600 mnt) s/d 21:30 (1290 mnt)
  const isOpen = currentMinutes >= 600 && currentMinutes <= 1290;

  if (isOpen) {
    badge.innerHTML = `<span class="status-dot online"></span> Buka Sekarang (Tutup 21.30 WIB)`;
    badge.className = 'status-badge open';
  } else {
    badge.innerHTML = `<span class="status-dot offline"></span> Sedang Tutup (Buka 10.00 WIB)`;
    badge.className = 'status-badge closed';
  }
}
