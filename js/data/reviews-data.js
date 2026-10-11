/**
 * Data Review & Testimoni Pelanggan Restoran "Mengan Geh" Bandar Lampung
 */

export const RESTAURANT_INFO = {
  name: 'Mengan Geh',
  tagline: 'Sensasi Asli Seruit Tampah & Masakan Rumahan Khas Lampung',
  subtitle: 'Pilihan Juara Penikmat Kuliner Tradisional Lampung di Rajabasa',
  address: 'Jl. H. Ismail No. 1, Rajabasa, Kec. Rajabasa, Kota Bandar Lampung, Lampung 35144',
  coordinates: {
    lat: -5.3567562,
    lng: 105.2395415
  },
  googleMapsUrl: 'https://www.google.com/maps/place/Mengan+Geh/@-5.4182964,104.9439357,11.03z/data=!4m11!1m2!2m1!1sRestoran!3m7!1s0x2e40c5d7c26372c5:0x9d2cecbb27d97e87!8m2!3d-5.3567562!4d105.2395415!10e9!15sCghSZXN0b3JhbloKIghyZXN0b3JhbpIBCnJlc3RhdXJhbnSaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUXRYMkpJZFVaUkVBReABAPoBBAgAEDI!16s%2Fg%2F11fmst80z8?entry=ttu',
  phone: '081541446388',
  phoneSecondary: '082376747987',
  whatsappNumber: '6281541446388',
  instagram: 'mengangeh',
  instagramUrl: 'https://www.instagram.com/mengangeh',
  openingHours: {
    days: 'Setiap Hari (Senin - Minggu)',
    hours: '10.00 - 21.30 WIB',
    status: 'Buka Setiap Hari'
  },
  facilities: [
    { title: 'Area Lesehan & Meja', desc: 'Nyaman untuk santap keluarga maupun nongkrong santai', icon: '🪑' },
    { title: 'Parkir Luas', desc: 'Aman untuk mobil dan motor, mudah diakses', icon: '🚗' },
    { title: 'Musholla Bersih', desc: 'Tersedia tempat wudhu dan perlengkapan sholat bersih', icon: '🕌' },
    { title: 'Wi-Fi Cepat', desc: 'Koneksi internet stabil untuk berselancar dan kerja santai', icon: '📶' },
    { title: 'Layanan Katering & Box', desc: 'Siap antar untuk acara kantor, arisan, hingga pernikahan', icon: '🍱' },
    { title: '100% Bahan Halal', desc: 'Semua bahan dan proses memasak dijamin halal & higienis', icon: '✨' }
  ]
};

export const CUSTOMER_REVIEWS = [
  {
    name: 'Rahmat Hidayat',
    role: 'Pecinta Kuliner Lampung',
    rating: 5,
    date: '1 Minggu yang lalu',
    comment: 'Seruit Tampah-nya juara banget! Ikan nilanya dibakar pas, sambal delan campur tempoyak-nya bikin merem melek saking enaknya. Wajib mampir kalau ke Bandar Lampung.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
  },
  {
    name: 'Dinda Ayu Pratiwi',
    role: 'Alumni UNILA',
    rating: 5,
    date: '2 Minggu yang lalu',
    comment: 'Tempat langganan dari zaman kuliah sampai sekarang sudah kerja di pemda. Masakan rumahan kaya tumis kates, orek tempe, sama ayam gorengnya selalu fresh. Harganya ramah di kantong!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
  },
  {
    name: 'Bambang Kusuma',
    role: 'Panitia Seminar Kantor BUMN',
    rating: 5,
    date: 'Bulan lalu',
    comment: 'Pernah pesan katering 85 nasi kotak untuk seminar kantor. Pelayanannya tepat waktu, kemasannya rapi, dan semua peserta memuji rasa ayam bakar madu & sambalnya. Sangat recommended!',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80'
  },
  {
    name: 'Siti Nurhaliza',
    role: 'Ibu Rumah Tangga (Rajabasa)',
    rating: 5,
    date: '1 Bulan yang lalu',
    comment: 'Kalau malas masak di rumah, pasti pesan ke Mengan Geh. Anak-anak suka ayam gorengnya, suami doyan sambel delan dan petainya. Porsi pas dan bersih.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80'
  }
];

export const FAQ_LIST = [
  {
    question: 'Apa itu menu "Seruit" dan mengapa wajib dicoba di Mengan Geh?',
    answer: 'Seruit adalah tradisi kuliner khas Lampung berupa santapan ikan bakar/goreng yang dinikmati bersama sambal delan (terasi khas Lampung), tempoyak (fermentasi durian), kuah pindang gurih, serta tampah aneka lalapan rebus dan mentah. Di Mengan Geh, seruit disajikan dalam tampah tradisional bambu dengan rasa rempah asli warisan turun temurun.'
  },
  {
    question: 'Apakah Mengan Geh melayani pesanan katering dan nasi kotak?',
    answer: 'Ya, kami melayani pesanan Nasi Kotak, Tumpeng Tampah, dan Katering Prasmanan untuk arisan, rapat dinas/kantor, event kampus, syukuran, hingga pernikahan. Pemesanan dapat dihitung langsung melalui fitur Kalkulator Katering di website ini dan dikonfirmasi via WhatsApp.'
  },
  {
    question: 'Berapa minimal pemesanan nasi kotak untuk katering?',
    answer: 'Minimal pemesanan nasi kotak adalah 10 porsi. Untuk pemesanan di atas 50 porsi mendapatkan diskon 5%, dan pemesanan di atas 100 porsi mendapatkan diskon 10% dengan gratis ongkir untuk area Bandar Lampung kota.'
  },
  {
    question: 'Apakah bisa melakukan reservasi meja untuk rombongan keluarga?',
    answer: 'Tentu! Kami menyediakan area meja reguler maupun lesehan luas. Anda dapat mengisi formulir reservasi online di halaman ini agar kami menyiapkan meja dan porsi santap Anda sebelum kedatangan.'
  },
  {
    question: 'Apakah menu makanan di Mengan Geh 100% Halal?',
    answer: 'Ya, 100% Halal dan Thayyib. Semua bahan daging, ikan segar, minyak, dan bumbu diproses secara higienis sesuai syariat Islam.'
  }
];
