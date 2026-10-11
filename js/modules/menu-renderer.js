/**
 * Modul Renderer Menu untuk Restoran "Mengan Geh"
 * Menangani pembuatan card menu, filter kategori, search bar, dan modal detail
 */

import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menu-data.js';
import { formatIDR } from './calculator.js';

export class MenuRenderer {
  constructor({
    categoryContainerId = 'menu-categories',
    gridContainerId = 'menu-grid',
    searchInputId = 'menu-search',
    itemCountId = 'menu-count'
  }) {
    this.categoryContainer = document.getElementById(categoryContainerId);
    this.gridContainer = document.getElementById(gridContainerId);
    this.searchInput = document.getElementById(searchInputId);
    this.itemCountElement = document.getElementById(itemCountId);

    this.activeCategory = 'all';
    this.searchQuery = '';
    this.items = MENU_ITEMS;
  }

  init() {
    if (!this.gridContainer) return;
    this.renderCategories();
    this.bindEvents();
    this.filterAndRender();
  }

  renderCategories() {
    if (!this.categoryContainer) return;
    this.categoryContainer.innerHTML = MENU_CATEGORIES.map(cat => `
      <button 
        type="button" 
        class="category-pill ${cat.id === this.activeCategory ? 'active' : ''}" 
        data-category="${cat.id}"
        aria-label="Filter kategori ${cat.name}"
      >
        <span class="cat-icon">${cat.icon}</span>
        <span class="cat-name">${cat.name}</span>
      </button>
    `).join('');
  }

  bindEvents() {
    if (this.categoryContainer) {
      this.categoryContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.category-pill');
        if (!btn) return;
        const category = btn.getAttribute('data-category');
        this.setActiveCategory(category);
      });
    }

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.filterAndRender();
      });
    }
  }

  setActiveCategory(category) {
    this.activeCategory = category;
    const buttons = this.categoryContainer.querySelectorAll('.category-pill');
    buttons.forEach(btn => {
      if (btn.getAttribute('data-category') === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    this.filterAndRender();
  }

  filterAndRender() {
    const filtered = this.items.filter(item => {
      const matchCategory = this.activeCategory === 'all' || item.category === this.activeCategory;
      const matchSearch = !this.searchQuery ||
        item.name.toLowerCase().includes(this.searchQuery) ||
        item.description.toLowerCase().includes(this.searchQuery) ||
        (item.ingredients && item.ingredients.some(ing => ing.toLowerCase().includes(this.searchQuery)));
      return matchCategory && matchSearch;
    });

    if (this.itemCountElement) {
      this.itemCountElement.textContent = `Menampilkan ${filtered.length} menu`;
    }

    if (filtered.length === 0) {
      this.gridContainer.innerHTML = `
        <div class="menu-empty-state">
          <div class="empty-icon">🔍</div>
          <h3>Menu Tidak Ditemukan</h3>
          <p>Tidak ada hidangan yang cocok dengan pencarian "<strong>${this.searchQuery}</strong>". Coba kata kunci lain atau pilih kategori Semua Menu.</p>
          <button type="button" class="btn btn-secondary btn-reset-search" id="btn-reset-filter">Reset Filter</button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-filter');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (this.searchInput) this.searchInput.value = '';
          this.searchQuery = '';
          this.setActiveCategory('all');
        });
      }
      return;
    }

    this.gridContainer.innerHTML = filtered.map(item => this.createMenuCardHTML(item)).join('');
  }

  createMenuCardHTML(item) {
    const chiliIcons = item.spicyLevel > 0 ? '🌶️'.repeat(Math.min(item.spicyLevel, 4)) : '';
    const ratingDisplay = item.rating ? `⭐ ${item.rating.toFixed(1)}` : '';

    return `
      <article class="menu-card" data-item-id="${item.id}">
        <div class="menu-card-image-wrap">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            loading="lazy" 
            class="menu-card-image"
            onerror="this.src='https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'"
          />
          ${item.badge ? `<span class="menu-badge">${item.badge}</span>` : ''}
          ${ratingDisplay ? `<span class="menu-rating">${ratingDisplay}</span>` : ''}
        </div>
        <div class="menu-card-content">
          <div class="menu-card-header">
            <h3 class="menu-title">${item.name}</h3>
            ${chiliIcons ? `<span class="spicy-level" title="Tingkat kepedasan">${chiliIcons}</span>` : ''}
          </div>
          <p class="menu-desc">${item.description}</p>
          <div class="menu-meta">
            <span class="portion-tag">👥 ${item.portionInfo || 'Porsi Santap'}</span>
          </div>
          <div class="menu-card-footer">
            <div class="menu-price">${formatIDR(item.price)}</div>
            <button 
              type="button" 
              class="btn-detail-menu" 
              data-menu-id="${item.id}"
              aria-label="Lihat rincian ${item.name}"
            >
              Rincian & Pesan
            </button>
          </div>
        </div>
      </article>
    `;
  }
}
