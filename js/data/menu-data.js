/**
 * Database Menu Lengkap Restoran "Mengan Geh" - Bandar Lampung
 * Menyajikan Seruit Tampah Khas Lampung, Masakan Rumahan, dan Aneka Minuman
 */

export const MENU_CATEGORIES = [
  { id: 'all', name: 'Semua Menu', icon: '🍽️' },
  { id: 'seruit', name: 'Seruit Tampah (Signature)', icon: '🥘' },
  { id: 'nasi', name: 'Aneka Nasi & Rames', icon: '🍚' },
  { id: 'lauk', name: 'Lauk Pilihan Nusantara', icon: '🍗' },
  { id: 'sambal', name: 'Sambel Delan & Lalap', icon: '🌶️' },
  { id: 'sayur', name: 'Sayur & Tumisan', icon: '🥬' },
  { id: 'minuman', name: 'Minuman & Segaran', icon: '🍹' }
];

export const CATERING_PACKAGES = [
  {
    id: 'paket-seruit-tampah',
    name: 'Paket Seruit Tampah Akbar (Pilihan Favorit)',
    pricePerPortion: 45000,
    description: 'Nasi pulen, ikan bakar/goreng nila/bekrek, sambel delan khas Lampung, tempoyak durian, lalapan rebus & mentah komplit, tahu tempe, ikan asin renyah, dan es teh jumbo.',
    minOrder: 10,
    recommendedFor: 'Arisan, Rapat Kerja, Jamuan Tamu Daerah, Kumpul Keluarga'
  },
  {
    id: 'paket-nasi-kotak-spesial',
    name: 'Paket Nasi Kotak Rames Spesial',
    pricePerPortion: 30000,
    description: 'Nasi putih wangi, ayam bakar madu/goreng kremes, orek tempe teri, tumis pare/kates, telur dadar iris, sambel terasi delan, lalapan, dan air mineral.',
    minOrder: 15,
    recommendedFor: 'Event Kampus, Seminar, Rapat Kantor, Syukuran'
  },
  {
    id: 'paket-nasi-kotak-hemat',
    name: 'Paket Nasi Kotak Mahasiswa & Hemat',
    pricePerPortion: 20000,
    description: 'Nasi putih, ayam geprek/balado, orek tempe pedas manis, sayur tumis kates, sambal delan, timun, kerupuk, dan air mineral cup.',
    minOrder: 20,
    recommendedFor: 'Kepanitiaan Mahasiswa, Pengajian, Acara Komunitas'
  },
  {
    id: 'paket-prasmanan-hajatan',
    name: 'Paket Prasmanan Mewah Khas Lampung',
    pricePerPortion: 55000,
    description: 'Prasmanan lengkap: Seruit ikan bekrek/nila, udang balado, gulai taboh/sayur asem, ayam bakar, sambel delan & mangga/tempoyak, lalap tampah raksasa, aneka dessert, puding & es buah.',
    minOrder: 30,
    recommendedFor: 'Pernikahan, Lamaran, Reuni Akbar, Wisuda'
  }
];

export const MENU_ITEMS = [
  // --- SERUIT TAMPAH (SIGNATURE) ---
  {
    id: 'seruit-tampah-komplit',
    name: 'Paket Seruit Tampah Komplit (Porsi 3-4 Orang)',
    category: 'seruit',
    price: 135000,
    badge: 'Signature Terlaris',
    spicyLevel: 3,
    description: 'Sajian ikonik khas Lampung dalam tampah bambu tradisional: Ikan bakar nila/bekrek segar, sambel delan terasi khas Lampung, tempoyak durian asli, lalapan kukus & mentah (terong bakar, timun, kemangi, jengkol muda), tahu tempe goreng, dan ikan asin renyah.',
    ingredients: ['Ikan Nila/Bekrek Segar', 'Sambal Delan Terasi', 'Tempoyak Durian', 'Lalapan Komplit', 'Tahu & Tempe', 'Ikan Asin'],
    portionInfo: 'Cukup untuk 3 - 4 orang',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },
  {
    id: 'seruit-personal-nila',
    name: 'Paket Seruit Personal Ikan Nila',
    category: 'seruit',
    price: 38000,
    badge: 'Favorit Personal',
    spicyLevel: 3,
    description: 'Paket seruit porsi perorangan dengan seekor ikan nila goreng/bakar, nasi putih hangat, sambel delan, racikan tempoyak, lalapan segar, dan kuah pindang gurih.',
    ingredients: ['1 Ekor Ikan Nila', 'Nasi Putih', 'Sambal Delan', 'Tempoyak', 'Lalapan', 'Tahu Tempe'],
    portionInfo: 'Porsi 1 Orang',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  },
  {
    id: 'seruit-ikan-bekrek',
    name: 'Seruit Khas Ikan Bekrek Danau/Sungai',
    category: 'seruit',
    price: 42000,
    badge: 'Otentik Lampung',
    spicyLevel: 4,
    description: 'Ikan bekrek sungai air tawar yang gurih lembut dibakar dengan bumbu kuning rempah, disajikan bersama sambal delan asam pedas dan lalapan ranti/timun.',
    ingredients: ['Ikan Bekrek Bakar', 'Bumbu Kuning Rempah', 'Sambal Delan', 'Terong Bakar', 'Lalapan'],
    portionInfo: 'Porsi 1 Orang',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },

  // --- ANEKA NASI & RAMES ---
  {
    id: 'nasi-rames-spesial',
    name: 'Nasi Rames Spesial Mengan Geh',
    category: 'nasi',
    price: 26000,
    badge: 'Menu Andalan Siang',
    spicyLevel: 2,
    description: 'Nasi putih pulen dengan kombinasi lauk pilihan: Ayam goreng rempah, telur dadar cadas, orek tempe manis gurih, tumis daun pepaya/kates tidak pahit, dan kerupuk.',
    ingredients: ['Nasi Putih', 'Ayam Rempah', 'Telur Dadar', 'Orek Tempe', 'Tumis Sayur', 'Sambal'],
    portionInfo: 'Porsi 1 Orang Kenyang',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
    rating: 4.7
  },
  {
    id: 'nasi-bungkus-daun-lampung',
    name: 'Nasi Bungkus Daun Pisang Tradisional',
    category: 'nasi',
    price: 18000,
    badge: 'Ekonomis & Wangi',
    spicyLevel: 2,
    description: 'Nasi dibungkus daun pisang yang harum semerbak, dengan lauk tongkol balado/ayam suwir gurih, orek tempe, sayur urap, dan sambel terasi sedap.',
    ingredients: ['Nasi Gurih Daun Pisang', 'Lauk Pilihan', 'Orek Tempe', 'Sambal Terasi'],
    portionInfo: 'Porsi 1 Orang',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  },
  {
    id: 'nasi-goreng-kampung-lampung',
    name: 'Nasi Goreng Kampung Terasi Delan',
    category: 'nasi',
    price: 24000,
    badge: 'Aroma Khas',
    spicyLevel: 3,
    description: 'Nasi goreng racikan bumbu terasi delan khas Lampung dengan suwiran ayam, telur ceplok setengah matang, taburan teri medan gurih, dan acar timun segar.',
    ingredients: ['Beras Pilihan', 'Terasi Delan', 'Ayam Suwir', 'Telur Ceplok', 'Teri Medan', 'Kerupuk'],
    portionInfo: 'Porsi 1 Orang',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    rating: 4.7
  },

  // --- LAUK PILIHAN NUSANTARA ---
  {
    id: 'ayam-bakar-madu-rempah',
    name: 'Ayam Bakar Madu Rempah Lampung',
    category: 'lauk',
    price: 22000,
    badge: 'Manis Gurih',
    spicyLevel: 1,
    description: 'Potongan ayam pejantan yang diungkep bumbu rempah tradisional lalu dibakar dengan olesan madu hutan asli. Daging empuk meresap hingga ke tulang.',
    ingredients: ['Ayam Pejantan Pilihan', 'Madu Alami', 'Bumbu Rempah Nusantara'],
    portionInfo: '1 Potong Paha/Dada Besar',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  },
  {
    id: 'udang-balado-petai',
    name: 'Udang Balado Sambalado Petai',
    category: 'lauk',
    price: 28000,
    badge: 'Favorit Gurih',
    spicyLevel: 3,
    description: 'Udang laut segar bertekstur manis kenyal yang ditumis dengan cabai merah segar melimpah dan petai renyah harum menggugah selera.',
    ingredients: ['Udang Laut Segar', 'Cabai Merah Keriting', 'Petai Pilihan', 'Tomat Segar'],
    portionInfo: 'Porsi Lauk Sharing/Personal',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },
  {
    id: 'jengkol-sambalado-legit',
    name: 'Jengkol Balado Pulen Legit',
    category: 'lauk',
    price: 18000,
    badge: 'Rekomendasi Pecinta Jengkol',
    spicyLevel: 3,
    description: 'Jengkol tua pilihan yang direbus dengan daun salam hingga empuk tidak bau, digeprek lembut dan dibalut sambalado merah pedas gurih.',
    ingredients: ['Jengkol Tua Pilihan', 'Cabai Merah', 'Bawang Merah', 'Minyak Kelapa'],
    portionInfo: 'Porsi 1 Piring Sedang',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  },
  {
    id: 'kikil-sambal-pedas',
    name: 'Tumis Kikil Sapi Mercon Pedas',
    category: 'lauk',
    price: 20000,
    badge: 'Pedas Nendang',
    spicyLevel: 4,
    description: 'Kikil sapi empuk kenyal dimasak oseng cabai rawit hijau dan merah dengan sensasi pedas gurih yang bikin nambah nasi.',
    ingredients: ['Kikil Sapi Segar', 'Cabai Rawit Hijau & Merah', 'Kecap Manis', 'Daun Jeruk'],
    portionInfo: 'Porsi 1 Piring',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    rating: 4.7
  },

  // --- SAMBAL & LALAPAN ---
  {
    id: 'sambel-delan-khas-lampung',
    name: 'Cobek Sambel Delan Asli Terasi Lampung',
    category: 'sambal',
    price: 10000,
    badge: 'Wajib Coba',
    spicyLevel: 4,
    description: 'Ulekan cabai rawit merah, rampai (tomat kecil khas Lampung), dan terasi delan bakar khas pesisir Teluk Lampung. Asam, segar, dan pedas membakar.',
    ingredients: ['Cabai Rawit Merah', 'Rampai Lampung', 'Terasi Delan Bakar', 'Garam', 'Jeruk Kunci'],
    portionInfo: 'Porsi 1 Cobek',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    rating: 5.0
  },
  {
    id: 'tempoyak-durian-asli',
    name: 'Tempoyak Durian Fermentasi Asli',
    category: 'sambal',
    price: 15000,
    badge: 'Khas Tradisional',
    spicyLevel: 2,
    description: 'Fermentasi daging buah durian asli khas Sumatera yang diolah dengan rempah cabai halus. Cita rasa asam gurih autentik khas sajian Seruit Lampung.',
    ingredients: ['Daging Durian Fermentasi', 'Cabai Halus', 'Garam Alami', 'Kunyit'],
    portionInfo: 'Porsi 1 Mangkuk Kecil',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },
  {
    id: 'lalapan-tampah-segar',
    name: 'Piring Lalapan Segar & Rebus Lengkap',
    category: 'sambal',
    price: 10000,
    badge: 'Segar Alami',
    spicyLevel: 0,
    description: 'Kombinasi lalapan segar dan rebusan: Daun singkong rebus, terong bakar bulat, labu siam mini, timun iris, daun kemangi wangi, dan jengkol muda.',
    ingredients: ['Daun Singkong', 'Terong Bulat', 'Labu Siam', 'Timun', 'Kemangi'],
    portionInfo: 'Porsi 2-3 Orang',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  },

  // --- SAYUR & TUMISAN ---
  {
    id: 'tumis-kates-pepaya-muda',
    name: 'Tumis Kates (Pepaya Muda) Teri Medan',
    category: 'sayur',
    price: 14000,
    badge: 'Masakan Rumah',
    spicyLevel: 2,
    description: 'Serutan pepaya muda segar dimasak tumis dengan bumbu iris cabai merah dan taburan teri medan garing. Tekstur renyah dan gurih alami.',
    ingredients: ['Pepaya Muda Segar', 'Teri Medan', 'Bawang Merah & Putih', 'Cabai Merah'],
    portionInfo: 'Porsi 1 Mangkuk',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  },
  {
    id: 'sayur-asem-lampung-segar',
    name: 'Sayur Asem Segar Kuah Keruh',
    category: 'sayur',
    price: 12000,
    badge: 'Penyegar Seruit',
    spicyLevel: 1,
    description: 'Kuah sayur asem yang segar dengan paduan asam jawa asli, jagung manis, melinjo, kacang panjang, labu siam, dan kacang tanah.',
    ingredients: ['Jagung Manis', 'Asam Jawa', 'Kacang Panjang', 'Melinjo', 'Kacang Tanah'],
    portionInfo: 'Porsi 1 Mangkuk',
    image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=800&q=80',
    rating: 4.7
  },
  {
    id: 'tumis-pare-udang-rebon',
    name: 'Tumis Pare Renyah Udang Rebon (Tidak Pahit)',
    category: 'sayur',
    price: 14000,
    badge: 'Tips Koki Tanpa Pahit',
    spicyLevel: 2,
    description: 'Irisan pare segar yang diremas garam khusus sehingga rasa pahit hilang, ditumis dengan udang rebon gurih dan irisan lengkuas harum.',
    ingredients: ['Pare Hijau Segar', 'Udang Rebon', 'Cabai Rawit', 'Bawang Putih'],
    portionInfo: 'Porsi 1 Mangkuk',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    rating: 4.6
  },

  // --- MINUMAN & SEGARAN ---
  {
    id: 'es-teh-manis-jumbo',
    name: 'Es Teh Manis Melati Jumbo',
    category: 'minuman',
    price: 6000,
    badge: 'Teman Wajib Seruit',
    spicyLevel: 0,
    description: 'Seduhan teh melati wangi khas nusantara disajikan dingin dalam gelas jumbo yang meluruhkan rasa pedas sambel delan.',
    ingredients: ['Teh Melati Pilihan', 'Gula Tebu Alami', 'Es Batu Kristal Higienis'],
    portionInfo: 'Gelas Jumbo 500ml',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },
  {
    id: 'es-jeruk-peras-kunci',
    name: 'Es Jeruk Peras Asli Gula Pasir',
    category: 'minuman',
    price: 10000,
    badge: 'Vitamin C Segar',
    spicyLevel: 0,
    description: 'Jeruk peras murni tanpa pengawet yang diperas langsung saat dipesan, dipadukan dengan larutan gula pasir murni dan es kristal.',
    ingredients: ['Jeruk Peras Segar', 'Gula Tebu Murni', 'Es Kristal'],
    portionInfo: 'Gelas Besar 400ml',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  },
  {
    id: 'es-kopi-susu-gula-aren-lampung',
    name: 'Es Kopi Susu Robusta Lampung Aren',
    category: 'minuman',
    price: 16000,
    badge: 'Kopi Khas Lampung',
    spicyLevel: 0,
    description: 'Kopi Robusta asli Lampung Barat yang harum pekat dipadukan susu kental creamy dan manis legit gula aren cair asli.',
    ingredients: ['Kopi Robusta Lampung', 'Susu Segar', 'Gula Aren Murni'],
    portionInfo: 'Cup 350ml',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  }
];
