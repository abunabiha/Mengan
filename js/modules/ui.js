/**
 * Modul UI & Interaksi Restoran "Mengan Geh"
 * Menangani Modal Menu, FAQ Accordion, Mobile Menu, Toast, dan Scroll Behavior
 */

import { MENU_ITEMS } from '../data/menu-data.js';
import { formatIDR } from './calculator.js';

export class UIManager {
  constructor() {
    this.modal = document.getElementById('menu-detail-modal');
    this.modalBody = document.getElementById('modal-detail-content');
    this.closeModalBtn = document.getElementById('btn-close-modal');
    this.mobileMenuBtn = document.getElementById('mobile-nav-toggle');
    this.navMenu = document.getElementById('primary-nav');
    this.toastElement = document.getElementById('toast-notification');
  }

  init() {
    this.initMobileNav();
    this.initNavbarScroll();
    this.initFaqAccordion();
    this.initMenuDetailModal();
    this.initBackToTop();
  }

  initMobileNav() {
    if (!this.mobileMenuBtn || !this.navMenu) return;

    this.mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = this.mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      this.mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      this.navMenu.classList.toggle('nav-open');
    });

    // Close menu when clicking nav link
    const navLinks = this.navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.navMenu.classList.remove('nav-open');
        this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  initNavbarScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      if (!questionBtn) return;

      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        // Tutup yang lain
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    });
  }

  initMenuDetailModal() {
    // Delegasi click untuk tombol detail di grid menu
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.btn-detail-menu');
      if (!trigger) return;
      const itemId = trigger.getAttribute('data-menu-id');
      this.openMenuModal(itemId);
    });

    if (this.closeModalBtn) {
      this.closeModalBtn.addEventListener('click', () => this.closeMenuModal());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeMenuModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('open')) {
        this.closeMenuModal();
      }
    });
  }

  openMenuModal(itemId) {
    const item = MENU_ITEMS.find(m => m.id === itemId);
    if (!item || !this.modal || !this.modalBody) return;

    const spicyText = item.spicyLevel > 0 
      ? `Level Pedas: ${'🌶️'.repeat(item.spicyLevel)} (${item.spicyLevel}/5)` 
      : 'Rasa Gurih / Tidak Pedas';

    const ingredientsHTML = item.ingredients && item.ingredients.length > 0
      ? `<div class="modal-section">
          <h4>Bahan & Komposisi Segar:</h4>
          <ul class="ingredient-list">
            ${item.ingredients.map(ing => `<li>🌿 ${ing}</li>`).join('')}
          </ul>
        </div>`
      : '';

    const waOrderMessage = encodeURIComponent(
      `Halo Admin Mengan Geh, saya mau pesan menu:\n*${item.name}* (${formatIDR(item.price)})\nPorsi: ${item.portionInfo || '1 porsi'}\nBisa mohon info ketersediaan dan cara pesan? Terima kasih!`
    );

    this.modalBody.innerHTML = `
      <div class="modal-layout">
        <div class="modal-image-col">
          <img src="${item.image}" alt="${item.name}" class="modal-image" />
          ${item.badge ? `<span class="modal-badge-tag">${item.badge}</span>` : ''}
        </div>
        <div class="modal-info-col">
          <span class="modal-category">${item.category.toUpperCase()}</span>
          <h2 class="modal-title">${item.name}</h2>
          <div class="modal-price">${formatIDR(item.price)}</div>
          
          <div class="modal-badges-row">
            <span class="badge-pill">👥 ${item.portionInfo || 'Porsi Santap'}</span>
            <span class="badge-pill">${spicyText}</span>
            ${item.rating ? `<span class="badge-pill">⭐ ${item.rating} / 5.0</span>` : ''}
          </div>

          <p class="modal-description">${item.description}</p>

          ${ingredientsHTML}

          <div class="modal-actions">
            <a 
              href="https://wa.me/6281541446388?text=${waOrderMessage}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn btn-primary btn-modal-order"
            >
              📱 Pesan Menu Ini via WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;

    this.modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeMenuModal() {
    if (!this.modal) return;
    this.modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  initBackToTop() {
    const bttBtn = document.getElementById('back-to-top');
    if (!bttBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        bttBtn.classList.add('visible');
      } else {
        bttBtn.classList.remove('visible');
      }
    });

    bttBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  showToast(message, type = 'success') {
    if (!this.toastElement) return;

    this.toastElement.textContent = message;
    this.toastElement.className = `toast-popup toast-${type} active`;

    setTimeout(() => {
      this.toastElement.classList.remove('active');
    }, 3500);
  }
}
