# DOKUMENTASI SOFTWARE DEVELOPMENT LIFE CYCLE (SDLC)
## Proyek: Website Profil Restoran "Mengan Geh" Bandar Lampung
**Versi:** 1.0.0  
**Status:** Production Ready  
**Metodologi:** Agile - Iterative Waterfall Hybrid  

---

## 1. TAHAP 1: PERENCANAAN & ANALISIS KEBUTUHAN (REQUIREMENTS ANALYSIS)

### 1.1 Latar Belakang & Identitas Bisnis
- **Nama Usaha:** Mengan Geh ("Mengan Geh" berasal dari Bahasa Lampung yang berarti *"Ayo Makan / Mari Makan"*).
- **Spesialisasi:** Masakan Tradisional Khas Lampung, Seruit Tampah Komplit, Masakan Rumahan Nusantara, dan Layanan Katering/Nasi Kotak.
- **Lokasi Utama:** Jl. H. Ismail No. 1, Rajabasa, Kec. Rajabasa, Kota Bandar Lampung, Lampung (Koordinat: `-5.3567562, 105.2395415`).
- **Kontak & Pemesanan:** WhatsApp: `081541446388` / `082376747987` | Instagram: `@mengangeh`.
- **Target Pasar:** Wisatawan kuliner Lampung, keluarga, instansi/kantor, komunitas arisan, mahasiswa/akademisi Universitas Lampung (UNILA), dan pelanggan pesan-antar.

### 1.2 Tujuan Proyek
1. Meningkatkan visibilitas digital Mengan Geh sebagai destinasi kuliner Seruit Tampah nomor 1 di Bandar Lampung.
2. Memudahkan calon pelanggan melihat daftar menu, paket seruit, dan harga transparan secara real-time.
3. Menyediakan simulasi estimasi biaya katering dan nasi kotak (Kalkulator Pesanan Katering).
4. Memfasilitasi reservasi meja dan pesanan langsung via WhatsApp dengan format otomatis dan rapi.
5. Mempermudah navigasi ke lokasi fisik via integrasi Google Maps interaktif.

### 1.3 Kebutuhan Fungsional (Functional Requirements)
- **FR-01 (Katalog Menu Dinamis):** Menampilkan daftar menu dengan filter kategori (Seruit Tampah, Aneka Nasi, Lauk Pilihan, Sambal & Lalapan, Sayuran, Minuman) dan fitur pencarian kata kunci.
- **FR-02 (Modal Detail Menu):** Menampilkan detail deskripsi, komposisi bumbu, tingkat kepedasan, dan pilihan porsi.
- **FR-03 (Kalkulator Katering & Nasi Kotak):** Menghitung estimasi biaya pesanan berdasarkan jumlah porsi, tipe paket, dan item tambahan dengan output tombol kirim ke WhatsApp.
- **FR-04 (Formulir Reservasi Meja):** Input data pengunjung (nama, nomor WA, tanggal, jam, jumlah orang, preferensi tempat) yang otomatis memformat pesan WhatsApp resmi ke admin restoran.
- **FR-05 (Integrasi Google Maps & Rute):** Menampilkan peta interaktif dan tombol penunjuk arah yang terhubung langsung ke tautan Google Maps Mengan Geh.
- **FR-06 (Ulasan & Testimoni):** Menampilkan ulasan autentik pelanggan dengan penilaian bintang.
- **FR-07 (FAQ Interaktif):** Accordion tanya jawab seputar lokasi, fasilitas parkir, sertifikasi halal, dan pengiriman ojek online.

### 1.4 Kebutuhan Non-Fungsional (Non-Functional Requirements)
- **NFR-01 (Performa):** Waktu muat halaman pertama < 1.5 detik; Skor Google Lighthouse > 90.
- **NFR-02 (Responsivitas & Mobile-First):** Tampilan optimal di smartphone (320px–480px), tablet (768px–1024px), dan desktop (>1024px).
- **NFR-03 (Aksesibilitas - A11y):** Memenuhi standar WCAG 2.1 AA (kontras warna teks minimal 4.5:1, atribut `aria-*`, navigasi keyboard, alt text gambar).
- **NFR-04 (Keandalan & Zero-Dependency Runtime):** Aplikasi frontend berjalan mandiri tanpa ketergantungan runtime server yang berat sehingga dapat di-host di GitHub Pages, Vercel, Netlify, atau Firebase.

---

## 2. TAHAP 2: DESAIN SISTEM & ARSITEKTUR (SYSTEM & UI/UX DESIGN)

### 2.1 Arsitektur Sistem
Sistem dibangun dengan arsitektur **Jamstack / Modern Static Web Architecture**:
```
+-------------------------------------------------------------+
|                     Client (Web Browser)                    |
|  +-------------------------------------------------------+  |
|  | Modern Responsive HTML5 / CSS3 (Semantic Layout)      |  |
|  +-------------------------------------------------------+  |
|  | Modular JavaScript (ES Modules):                      |  |
|  | - Menu Store & Category Filter Engine                 |  |
|  | - Interactive Catering Calculator Engine              |  |
|  | - WhatsApp Message Formatter & Validator              |  |
|  | - Map & Navigation Bridge                             |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
                               |
               +---------------+---------------+
               |                               |
               v                               v
+-------------------------------+   +--------------------+
| External APIs & Direct Links  |   | CI/CD Pipeline     |
| - WhatsApp Click-to-Chat API  |   | - GitHub Actions   |
| - Google Maps Interactive Pin |   | - Automated Test   |
| - Instagram Profile Link      |   | - Auto-Deploy Pages|
+-------------------------------+   +--------------------+
```

### 2.2 Desain Identitas Visual (Design Tokens)
- **Warna Utama (Primary):** `#C83E1E` (Warm Chili Red / Sambal Delan - melambangkan kehangatan, nafsu makan, dan rempah Lampung).
- **Warna Sekunder (Secondary):** `#D97706` (Amber / Kunyit Mas Etnik Lampung).
- **Warna Aksen (Accent):** `#15803D` (Fresh Leaf Green - melambangkan lalapan segar dan daun pisang).
- **Warna Latar Belakang (Background):** `#FFFDF9` (Warm Ivory / Bersih dan ramah).
- **Warna Teks (Text):** `#1F2937` (Dark Charcoal) untuk keterbacaan tinggi.
- **Tipografi:** Sans-serif modern dan tegas (Inter / Plus Jakarta Sans) dipadukan dengan aksen display serif/heading yang bersahabat.

---

## 3. TAHAP 3: IMPLEMENTASI & PENGEMBANGAN (IMPLEMENTATION)

### 3.1 Struktur Direktori Proyek
```
menuhGEDH/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # Konfigurasi Continuous Integration & Continuous Deployment
├── docs/
│   └── SDLC_DOCUMENTATION.md  # Dokumentasi lengkap SDLC
├── css/
│   └── styles.css             # Desain responsif, animasi, dan design tokens
├── js/
│   ├── app.js                 # Inisialisasi utama aplikasi
│   ├── data/
│   │   ├── menu-data.js       # Database menu komplit & kategori
│   │   └── reviews-data.js    # Database ulasan pelanggan
│   └── modules/
│       ├── calculator.js      # Logika perhitungan kalkulator katering
│       ├── menu-renderer.js   # Rendering dan filter menu
│       ├── reservation.js     # Validasi formulir reservasi & WhatsApp generator
│       └── ui.js              # Interaksi UI (modal, accordion FAQ, navbar scroll)
├── tests/
│   ├── menu.test.js           # Unit test integritas menu
│   ├── calculator.test.js     # Unit test kalkulator katering
│   ├── reservation.test.js    # Unit test format WhatsApp & validasi input
│   └── markup.test.js         # Unit test validasi struktur HTML & A11y
├── scripts/
│   ├── lint.js                # Linter sederhana kode JS
│   ├── serve.js               # Local development HTTP server
│   └── validate.js            # Validasi integritas berkas proyek
├── index.html                 # Halaman utama aplikasi
├── package.json               # Konfigurasi dependensi dan scripts npm
├── .gitignore                 # Konfigurasi pengabaian Git
└── README.md                  # Panduan proyek & dokumentasi
```

### 3.2 Modul Utama yang Dikembangkan
1. **Modul Menu (`js/modules/menu-renderer.js`):** Pencarian real-time dengan debounce, filter berdasarkan kategori menu, formatting mata uang Rupiah (`Intl.NumberFormat`), dan modal pop-up detail menu.
2. **Modul Kalkulator Katering (`js/modules/calculator.js`):** Menghitung total harga katering berdasarkan jenis paket (Paket Seruit Komplit, Paket Nasi Kotak, dsb.), jumlah porsi dengan diskon otomatis untuk kuantitas besar (>= 50 porsi diskon 5%, >= 100 porsi diskon 10%), serta tombol pesan instan ke WhatsApp.
3. **Modul Reservasi Meja (`js/modules/reservation.js`):** Validasi nomor telepon Indonesia (format `08xx` atau `+62`), tanggal kedatangan (tidak boleh tanggal lampau), jam operasional (10:00 - 21:30 WIB), dan pembuatan link `https://wa.me/` terenkripsi URI.

---

## 4. TAHAP 4: PENGUJIAN & JAMINAN KUALITAS (TESTING & QA)

### 4.1 Rencana Pengujian (Test Plan)
Pengujian dilakukan berlapis (Layered Testing):
1. **Unit Testing:**
   - Memastikan data menu memiliki nama, harga positif, gambar, dan kategori yang valid.
   - Menguji rumus perhitungan biaya katering dan akurasi diskon volume.
   - Menguji parser nomor WhatsApp dan perakitan pesan reservasi.
2. **Integration / Structural Testing:**
   - Memeriksa kelengkapan elemen semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`).
   - Memeriksa kesesuaian meta tag SEO, Open Graph (OG), dan Twitter Card.
   - Memeriksa tautan Google Maps agar mengarah tepat ke koordinat restoran Mengan Geh.
3. **Accessibility (A11y) & Cross-Browser Testing:**
   - Kontras warna teks sesuai standar WCAG AA.
   - Keyboard navigability (focus states pada tombol dan link).
   - Responsive breakpoints (uji pada viewport 375px, 768px, 1280px).

---

## 5. TAHAP 5: DEPLOYMENT & CI/CD PIPELINE

### 5.1 Arsitektur CI/CD dengan GitHub Actions
Pipeline diatur dalam berkas `.github/workflows/ci-cd.yml` dengan langkah-langkah otomatis:
1. **Trigger:** Otomatis berjalan pada setiap `push` dan `pull_request` ke branch `main`.
2. **Job 1 - Quality Gate & Linting (`lint-and-validate`):**
   - Menjalankan syntax audit dan validasi integritas struktur berkas.
3. **Job 2 - Automated Unit Testing (`unit-tests`):**
   - Menjalankan rangkaian test suite (`npm test`) menggunakan Node.js native test runner.
   - Memverifikasi 100% test case lulus sebelum proses build diperbolehkan.
4. **Job 3 - Build & Artifact Verification (`build-artifact`):**
   - Mengompilasi dan mengemas aset ke folder distribusi `dist/`.
   - Menghasilkan artifact terkompresi untuk audit rilis.
5. **Job 4 - Continuous Deployment (`deploy-pages`):**
   - Menerapkan artefak secara otomatis ke GitHub Pages menggunakan aksi resmi `actions/deploy-pages@v4`.
   - Mengaktifkan status check untuk verifikasi live URL.

### 5.2 Strategi Pemeliharaan & Monitoring
- **Update Menu Berkala:** Cukup memperbarui file `js/data/menu-data.js` dan melakukan `git push`; pipeline CI/CD akan secara otomatis menguji data dan memperbarui situs dalam < 60 detik.
- **Rollback:** Jika terjadi kesalahan pada rilis baru, GitHub Actions memungkinkan rollback seketika ke commit stabil sebelumnya melalui Git revert.
