
 // Cek URL saat ini dan sesuaikan dengan kondisi yang diinginkan
// ============================================================
// PRODUK INTERIOR FURNITURE - pillar
// ============================================================
// 🧠 SEO NOTE: Setiap item adalah sub dari Produk Interior (/p/produk-interior.html)
// Parent: Produk Interior (/p/produk-interior.html)
// ============================================================

const urlMappingProdukInteriorFurniture = {
  // ============================================================
  // [SUB2] - TOKO FURNITURE (KATEGORI)
  // 🧠 TYPE: SUB2 (boleh skip di breadcrumb)
  // 🧠 STATUS: AKTIF (konten lengkap)
  // Breadcrumb: Home > Produk Interior > Toko Furniture (3 level)
  // ============================================================
  "https://www.betonjayareadymix.com/p/toko-furniture.html": "Toko Furniture",  // TYPE: SUB2

  // ============================================================
  // [SUB2] - SOFA SET (KATEGORI)
  // 🧠 TYPE: SUB2 (boleh skip di breadcrumb)
  // 🧠 STATUS: AKTIF (konten lengkap)
  // Breadcrumb: Home > Produk Interior > Sofa Set (3 level)
  // ============================================================
  "https://www.betonjayareadymix.com/p/sofa-set.html": "Sofa Set",  // TYPE: SUB2

  // ============================================================
  // [SUB2] - KAMAR SET (KATEGORI)
  // 🧠 TYPE: SUB2 (boleh skip di breadcrumb)
  // 🧠 STATUS: AKTIF (konten lengkap)
  // Breadcrumb: Home > Produk Interior > Kamar Set (3 level)
  // ============================================================
  "https://www.betonjayareadymix.com/p/kamar-set.html": "Kamar Set",  // TYPE: SUB2
  // ============================================================
// [SUB-PILLAR TIPE 2] - JENIS KITCHEN SET
// ============================================================
"https://www.betonjayareadymix.com/p/jenis-kitchen-set.html": "Jenis Kitchen Set",  // TYPE: SUB2

// ============================================================
// [MONEY_PAGE] - KITCHEN SET PABRIKAN
// 🧠 TYPE: MONEY_PAGE (bukan MONEY_MASTER)
// Breadcrumb: Home > Produk Interior > Jenis Kitchen Set > Kitchen Set Pabrikan (4 level)
// ============================================================
//"https://www.betonjayareadymix.com/p/kitchen-set-pabrikan.html": "Kitchen Set Pabrikan",  // TYPE: MONEY_PAGE

/*
Buat MONEY_MASTER terlebih dahulu (struktur ideal)
javascript
// ============================================================
// [MONEY_MASTER] - HARGA KITCHEN SET
// 🧠 TYPE: MONEY_MASTER (WAJIB ada sebelum MONEY_PAGE)
// ============================================================
"https://www.betonjayareadymix.com/p/harga-kitchen-set.html": "Harga Kitchen Set",  // TYPE: MONEY_MASTER

// ============================================================
// [MONEY_PAGE] - KITCHEN SET PABRIKAN (turunan dari MONEY_MASTER)
// ============================================================
"https://www.betonjayareadymix.com/p/kitchen-set-pabrikan.html": "Kitchen Set Pabrikan",  // TYPE: MONEY_PAGE
*/
};

// ============================================================
// FUNGSI GENERATE BREADCRUMB - VERSI FINAL
// UNTUK SEMUA ENTITY TYPE (PRODUK, MATERIAL, JASA, SEWA/RENTAL)
// SUPPORT: Produk Konstruksi, Material Konstruksi, Jasa Konstruksi, 
//          Produk Interior, Jasa Desain Interior, Sewa/Rental
// MAX_LEVEL = 4 (TERMASUK HOME)
// SKIP LEVEL BEKERJA UNTUK PILLAR & SUB2
// ============================================================

function generateBreadcrumbForMapping(mappingObj, currentUrl, breadcrumbItems = [], entityType = 'PRODUK_INTERIOR') {
    
    const MAX_LEVEL = 4;
    const DOMAIN = 'https://www.betonjayareadymix.com';
    
    // ============================================================
    // 1. VALIDASI ENTITY TYPE (SEMUA TYPE DIDUKUNG)
    // ============================================================
    const validEntityTypes = [
        // PRODUK
        'PRODUK_KONSTRUKSI', 
        'PRODUK_INTERIOR',
        'PRODUK',
        // MATERIAL
        'MATERIAL_KONSTRUKSI',
        'MATERIAL',
        // JASA
        'JASA_KONSTRUKSI',
        'JASA_DESAIN_INTERIOR',
        'JASA',
        // SEWA/RENTAL
        'SEWA',
        'RENTAL',
        'SEWA_RENTAL',
        'SEWA_ALAT',
        'RENTAL_ALAT'
    ];
    
    if (!validEntityTypes.includes(entityType)) {
        console.error(`❌ ERROR: "${entityType}" BUKAN ENTITY TYPE yang valid!`);
        console.error(`   Gunakan salah satu dari: ${validEntityTypes.join(', ')}`);
        return null;
    }
    
    // Ambil page title dari mappingObj atau dari breadcrumbItems terakhir
    let pageTitle = mappingObj?.[currentUrl];
    if (!pageTitle && breadcrumbItems.length > 0) {
        const lastItem = breadcrumbItems[breadcrumbItems.length - 1];
        pageTitle = typeof lastItem === 'object' ? lastItem.name : lastItem;
    }
    
    if (!pageTitle) {
        console.error(`❌ ERROR: Page title tidak ditemukan untuk URL "${currentUrl}"`);
        return null;
    }
    
    // ============================================================
    // 2. KUMPULKAN SEMUA NAMA HALAMAN DARI MAPPING
    // ============================================================
    const allPageNames = [];
    if (mappingObj) {
        for (const [url, name] of Object.entries(mappingObj)) {
            if (name && typeof name === 'string') {
                allPageNames.push(name.toLowerCase());
            }
        }
    }
    
    // ============================================================
    // 3. DETEKSI TYPE OTOMATIS (SESUAI STANDAR PHASE 1)
    // DENGAN DUKUNGAN SEMUA ENTITY TYPE
    // ============================================================
    function detectPageType(pageName, position, totalLevels) {
        const lowerName = pageName.toLowerCase();
        const words = lowerName.split(' ');
        const firstWord = words[0];
        const lastWord = words[words.length - 1];
        
        // ============================================================
        // PRIORITAS 1: PILLAR (level terluas, posisi pertama)
        // ============================================================
        if (position === 0) {
            return 'PILLAR';
        }
        
        // ============================================================
        // PRIORITAS 2: MONEY_LEADGEN (khusus JASA & SEWA)
        // ============================================================
        const leadgenWords = ['konsultasi', 'survey', 'hubungi', 'contact', 'estimasi', 'penawaran'];
        for (const word of leadgenWords) {
            if (lowerName.startsWith(word + ' ') || lowerName === word) {
                return 'MONEY_LEADGEN';
            }
        }
        
        // ============================================================
        // PRIORITAS 3: MONEY_MASTER (harga NASIONAL/UMUM)
        // KHUSUS PRODUK, MATERIAL, SEWA (JASA TIDAK BOLEH)
        // ============================================================
        function isMoneyMaster(name) {
            const lower = name.toLowerCase();
            
            // JASA tidak boleh menggunakan MONEY_MASTER
            const isJasaEntity = ['JASA_KONSTRUKSI', 'JASA_DESAIN_INTERIOR', 'JASA'].includes(entityType);
            if (isJasaEntity) {
                return false;
            }
            
            // Harus diawali "harga" atau "sewa" (untuk rental)
            const hasPriceKeyword = lower.startsWith('harga ') || lower.startsWith('sewa ') || lower.startsWith('biaya ');
            if (!hasPriceKeyword) return false;
            
            // Cek apakah ada produk spesifik (bukan kategori umum)
            let afterKeyword = '';
            if (lower.startsWith('harga ')) afterKeyword = lower.substring(6);
            if (lower.startsWith('sewa ')) afterKeyword = lower.substring(5);
            if (lower.startsWith('biaya ')) afterKeyword = lower.substring(6);
            
            // Kata kunci yang menandakan produk SPESIFIK (bukan umum)
            const specificProductIndicators = [
                'pabrikan', 'minimalis', 'modern', 'modular', 'siap pakai',
                'hpl', 'mdf', 'jati', 'bigland', 'pengantin', 'murah',
                'premium', 'ekonomis', 'standar', 'custom', 'bespoke',
                '0.', '0,', '1.', '2.', '3.', 'mm', 'cm', 'meter', 'inch',
                'putih', 'hitam', 'merah', 'biru', 'hijau', 'kuning',
                'kecil', 'besar', 'sedang', 'mini', 'maxi', 'jumbo',
                // Untuk sewa/rental
                'excavator', 'bulldozer', 'crane', 'dump truck', 'vibro',
                'alat berat', 'alat konstruksi'
            ];
            
            for (const indicator of specificProductIndicators) {
                if (afterKeyword.includes(indicator)) {
                    return false; // Ini MONEY_PAGE, bukan MONEY_MASTER
                }
            }
            
            // Jika hanya "harga [kategori]" atau "sewa [kategori]" -> MONEY_MASTER
            return true;
        }
        
        if (isMoneyMaster(pageName)) {
            return 'MONEY_MASTER';
        }
        
        // ============================================================
        // PRIORITAS 4: MONEY_PAGE (harga PRODUK SPESIFIK)
        // ============================================================
        const hasPriceOrRent = lowerName.includes('harga ') || 
                                lowerName.includes('sewa ') || 
                                lowerName.includes('biaya ') ||
                                lowerName.includes('jual ') ||
                                lowerName.includes('beli ') ||
                                lowerName.includes('rental ');
        
        if (hasPriceOrRent && !isMoneyMaster(pageName)) {
            return 'MONEY_PAGE';
        }
        
        // ============================================================
        // PRIORITAS 5: MONEY_PAGE (jual/beli/sewa produk spesifik)
        // ============================================================
        const transactionWords = ['jual', 'beli', 'sewa', 'pesan', 'booking', 'rental', 'order'];
        for (const word of transactionWords) {
            if (lowerName.startsWith(word + ' ')) {
                return 'MONEY_PAGE';
            }
        }
        
        // ============================================================
        // PRIORITAS 6: MONEY_CHILD (harga + lokasi ATAU sewa + lokasi)
        // DETEKSI LOKASI DENGAN WHITELIST + POLA (HYBRID METHOD)
        // ============================================================
        
        // Whitelist kota/kabupaten di Indonesia
        const locationIndicators = [
            // Jabodetabek
            'jakarta', 'bogor', 'depok', 'tangerang', 'bekasi', 'jabodetabek',
            'jakpus', 'jakbar', 'jaksel', 'jakut', 'jaktim',
            'tangerang selatan', 'tangsel', 'bintaro', 'alam sutera', 'gading serpong',
            // Jawa Barat
            'bandung', 'cimahi', 'cirebon', 'tasikmalaya', 'sukabumi', 'garut', 
            'sumedang', 'purwakarta', 'karawang', 'subang', 'indramayu',
            'majalengka', 'kuningan', 'ciamis', 'banjar', 'pangandaran', 'cianjur',
            // Jawa Tengah
            'semarang', 'solo', 'surakarta', 'yogyakarta', 'jogja', 'magelang', 
            'salatiga', 'pekalongan', 'tegal', 'brebes', 'cilacap', 'purwokerto', 
            'kebumen', 'banjarnegara', 'wonosobo', 'temanggung', 'kendal', 'demak', 
            'kudus', 'jepara', 'pati', 'rembang', 'blora', 'grobagan', 'sragen', 
            'karanganyar', 'wonogiri', 'sukoharjo', 'klaten', 'boyolali',
            // Jawa Timur
            'surabaya', 'malang', 'kediri', 'blitar', 'madiun', 'ponorogo', 'ngawi', 
            'magetan', 'trenggalek', 'tulungagung', 'nganjuk', 'jombang', 'mojokerto', 
            'gresik', 'sidoarjo', 'pasuruan', 'probolinggo', 'lumajang', 'jember', 
            'banyuwangi', 'bondowoso', 'situbondo', 'pamekasan', 'sampang', 'sumenep', 
            'bangkalan', 'bojonegoro', 'tuban', 'lamongan',
            // Sumatera
            'medan', 'binjai', 'pematangsiantar', 'tanjungbalai', 'tebingtinggi', 'deli serdang',
            'padang', 'bukittinggi', 'payakumbuh', 'solok', 'sawahlunto', 'padang panjang',
            'pekanbaru', 'dumai', 'bengkalis', 'kampar', 'riau', 'batam', 'tanjungpinang',
            'palembang', 'lubuklinggau', 'prabumulih', 'ogan ilir', 'ogan komering',
            'bandar lampung', 'metro', 'lampung', 'jambi', 'sungai penuh', 'bengkulu',
            'pangkalpinang', 'tanjung pandan', 'aceh', 'banda aceh', 'lhonga', 'sigli',
            // Kalimantan
            'pontianak', 'singkawang', 'ketapang', 'sambas', 'kalimantan barat',
            'balikpapan', 'samarinda', 'bontang', 'kutai', 'penajam', 'kalimantan timur',
            'banjarmasin', 'banjarbaru', 'kalimantan selatan', 'palangkaraya', 'kalimantan tengah',
            'tanjung selor', 'kalimantan utara',
            // Sulawesi
            'makassar', 'parepare', 'palopo', 'sulawesi selatan', 'manado', 'bitung', 'tomohon',
            'kotamobagu', 'sulawesi utara', 'palu', 'sulawesi tengah', 'kendari', 'baubau',
            'sulawesi tenggara', 'gorontalo', 'sulawesi barat', 'mamuju',
            // Bali & Nusa Tenggara
            'denpasar', 'badung', 'gianyar', 'tabanan', 'bangli', 'klungkung', 'karangasem',
            'buleleng', 'jembrana', 'bali', 'mataram', 'bima', 'dompu', 'sumbawa', 'lombok',
            'kupang', 'soe', 'atambua', 'ntt', 'ntb',
            // Maluku & Papua
            'ambon', 'tual', 'maluku', 'ternate', 'tidore', 'maluku utara',
            'jayapura', 'wamena', 'timika', 'merauke', 'biak', 'sorong', 'manokwari', 'nabire',
            'papua', 'papua barat'
        ];
        
        // Pola akhiran kota (untuk mendeteksi kota yang tidak ada di whitelist)
        const citySuffixes = ['karta', 'jaya', 'pura', 'sari', 'mulya', 'agung', 'asih', 'ayem', 'luhur'];
        
        // Blacklist kata yang mirip lokasi tapi sebenarnya produk
        const notLocationWords = [
            'mini', 'maxi', 'super', 'extra', 'plus', 'pro', 'max', 'ultra',
            'baru', 'lama', 'bekas', 'second', 'original', 'kw', 'grade', 
            'murah', 'mahal', 'hemat', 'premium', 'standar', 'ekonomis', 
            'kecil', 'besar', 'sedang', 'panjang', 'pendek', 'tebal', 'tipis',
            'putih', 'hitam', 'merah', 'biru', 'hijau', 'kuning', 'ungu', 'abu', 'coklat',
            'minimalis', 'modern', 'klasik', 'industrial', 'skandinavia', 'jepang'
        ];
        
        function isLocation(word) {
            const lowerWord = word.toLowerCase();
            
            // LEVEL 1: Cek whitelist kota
            if (locationIndicators.includes(lowerWord)) return true;
            
            // LEVEL 2: Cek blacklist kata produk
            if (notLocationWords.includes(lowerWord)) return false;
            
            // LEVEL 3: Cek apakah kata tersebut dikenal sebagai produk (dari mapping)
            const isKnownProduct = allPageNames.some(known => 
                known === lowerWord || 
                known.includes(lowerWord) || 
                lowerWord.includes(known)
            );
            if (isKnownProduct) return false;
            
            // LEVEL 4: Cek pola akhiran kota
            for (const suffix of citySuffixes) {
                if (lowerWord.endsWith(suffix) && lowerWord.length >= 4) {
                    return true;
                }
            }
            
            // LEVEL 5: Cek pola kata dengan 2+ vokal (untuk kata yang panjang)
            if (lowerWord.length >= 5 && lowerWord.length <= 12) {
                const vowelCount = (lowerWord.match(/[aiueo]/g) || []).length;
                if (vowelCount >= 2) {
                    // Pastikan bukan kata produk umum
                    const commonProductWords = ['furniture', 'furnitur', 'meja', 'kursi', 'lemari', 'sofa'];
                    if (!commonProductWords.includes(lowerWord)) {
                        return true;
                    }
                }
            }
            
            return false;
        }
        
        // Cek apakah last word adalah lokasi (minimal 2 kata)
        if (words.length >= 2 && isLocation(lastWord)) {
            return 'MONEY_CHILD';
        }
        
        // ============================================================
        // PRIORITAS 7: SUB1 (perbandingan/evaluasi) - SEMUA ENTITY
        // ============================================================
        const comparisonWords = ['vs', 'versus', 'atau', 'lebih baik', 'perbandingan', 
                                  'banding', 'mana yang', 'kelebihan', 'kekurangan',
                                  'lebih bagus', 'lebih murah', 'lebih tahan', 'lebih awet',
                                  'plus minus', 'keunggulan', 'kelemahan'];
        for (const word of comparisonWords) {
            if (lowerName.includes(word)) {
                return 'SUB1';
            }
        }
        
        // ============================================================
        // PRIORITAS 8: SUB1 (panduan/cara/tips) - EDUKASI SEMUA ENTITY
        // ============================================================
        const guideWords = ['panduan', 'cara', 'tips', 'tutorial', 'langkah', 
                             'petunjuk', 'pedoman', 'strategi', 'metode', 'teknik',
                             'rahasia', 'kunci', 'wajib tahu', 'perlu diketahui'];
        for (const word of guideWords) {
            if (lowerName.startsWith(word + ' ') || lowerName.includes(' ' + word + ' ')) {
                return 'SUB1';
            }
        }
        
        // ============================================================
        // PRIORITAS 9: VARIANT (spesifikasi teknis) - PRODUK/MATERIAL/SEWA
        // ============================================================
        const variantIndicators = [
            'tipe', 'type', 'ukuran', 'model', 'varian', 'warna', 'bentuk', 'seri', 'versi',
            'spesifikasi', 'detail', 'rinci', 'bahan', 'material', 'komposisi', 'kualitas',
            'mutu', 'grade', 'kelas', 'standar', 'kode', 'kapasitas', 'tonase', 'daya'
        ];
        
        for (const word of variantIndicators) {
            if (lowerName.includes(' ' + word + ' ') || lowerName.endsWith(' ' + word)) {
                return 'VARIANT';
            }
        }
        
        // Deteksi angka (ukuran dimensi, tebal, kapasitas, dll)
        if (/\d+(\.\d+)?\s*(mm|cm|m|inch|meter|kg|gram|ton|liter|cc|pk|hp)/.test(lowerName)) {
            return 'VARIANT';
        }
        
        // ============================================================
        // PRIORITAS 10: SUB-VARIANT (sangat detail, level terbawah)
        // ============================================================
        if (lowerName.includes('tebal') || 
            lowerName.includes('ketebalan') ||
            lowerName.includes('lebar') ||
            lowerName.includes('panjang') ||
            lowerName.includes('tinggi') ||
            /\d+(\.\d+)?\s*mm\s*x\s*\d+(\.\d+)?\s*mm/.test(lowerName)) {
            return 'SUB_VARIANT';
        }
        
        // ============================================================
        // PRIORITAS 11: SUB2 (jenis/macam/tipe - konten informasional)
        // ============================================================
        if (lowerName.startsWith('jenis ') || 
            lowerName.startsWith('macam ') || 
            lowerName.startsWith('tipe ')) {
            return 'SUB2';
        }
        
        // ============================================================
        // DEFAULT: SUB2 untuk konten informasional biasa
        // ============================================================
        return 'SUB2';
    }
    
    // ============================================================
    // 4. FUNGSI BANTUAN
    // ============================================================
    function generateIdFromName(name) {
        return name.replace(/[^a-zA-Z0-9]/g, '') + 'Post';
    }
    
    function slugify(text) {
        return text.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .trim();
    }
    
    // ============================================================
    // 5. BANGUN LEVELS DARI breadcrumbItems (SUPPORT OBJECT & STRING)
    // ============================================================
    const allLevels = [];
    for (let i = 0; i < breadcrumbItems.length; i++) {
        const item = breadcrumbItems[i];
        
        let name, url;
        if (typeof item === 'object' && item !== null) {
            name = item.name;
            url = item.url || null;
        } else {
            name = item;
            url = null;
        }
        
        allLevels.push({
            name: name,
            url: url,
            type: detectPageType(name, i, breadcrumbItems.length),
            id: generateIdFromName(name),
            position: i
        });
    }
    
    // ============================================================
    // 6. VALIDASI & FALLBACK URL
    // ============================================================
    for (const level of allLevels) {
        if (!level.url) {
            let foundUrl = null;
            if (mappingObj) {
                for (const [url, name] of Object.entries(mappingObj)) {
                    if (name === level.name) {
                        foundUrl = url.startsWith('http') ? url : DOMAIN + url;
                        break;
                    }
                }
            }
            if (!foundUrl) {
                const slug = slugify(level.name);
                foundUrl = `${DOMAIN}/p/${slug}.html`;
            }
            level.url = foundUrl;
        } else if (!level.url.startsWith('http')) {
            level.url = DOMAIN + level.url;
        }
    }
    
    // ============================================================
    // 7. TENTUKAN LEVEL YANG AKAN DITAMPILKAN (MAX 4 LEVEL)
    // ============================================================
    const selectedLevels = [];
    
    // Level 1: Home (WAJIB)
    selectedLevels.push({ 
        name: 'BJR', 
        url: DOMAIN, 
        isHome: true,
        type: 'HOME'
    });
    
    // Hitung slot tersisa (MAX_LEVEL - 1 untuk home - 1 untuk halaman saat ini)
    let remainingSlots = MAX_LEVEL - 2;
    
    console.log(`📊 ========================================`);
    console.log(`📊 Breadcrumb Generator - SEO Tercanggih`);
    console.log(`📊 Entity Type: ${entityType}`);
    console.log(`📊 Max level: ${MAX_LEVEL}, slot untuk parent: ${remainingSlots}`);
    console.log(`📊 Input levels: ${allLevels.map(l => `${l.name}(${l.type})`).join(' → ')}`);
    console.log(`📊 ========================================`);
    
    // Parent terdekat (level terakhir sebelum current page) - WAJIB tampil
    let parentTerdekat = null;
    if (allLevels.length > 0) {
        parentTerdekat = allLevels[allLevels.length - 1];
        selectedLevels.push(parentTerdekat);
        remainingSlots--;
        console.log(`✅ WAJIB: "${parentTerdekat.name}" (${parentTerdekat.type}) - sisa slot: ${remainingSlots}`);
    }
    
    // Level lainnya (dari awal sampai sebelum parent terdekat)
    // Di-reverse agar yang terdekat dengan parent diprioritaskan
    const otherLevels = [...allLevels.slice(0, allLevels.length - 1)].reverse();
    const canSkipTypes = ['PILLAR', 'SUB2'];
    
    for (const level of otherLevels) {
        if (remainingSlots <= 0) {
            console.log(`📌 SKIP: "${level.name}" (${level.type}) - tidak ada slot tersisa`);
            continue;
        }
        
        if (canSkipTypes.includes(level.type)) {
            console.log(`📌 SKIP: "${level.name}" (${level.type}) - type boleh skip`);
            continue;
        }
        
        // Tambahkan di posisi setelah Home (index 1)
        selectedLevels.splice(1, 0, level);
        remainingSlots--;
        console.log(`✅ TAMBAH: "${level.name}" (${level.type}) - sisa slot: ${remainingSlots}`);
    }
    
    // Halaman saat ini (WAJIB)
    const currentFullUrl = currentUrl.startsWith('http') ? currentUrl : DOMAIN + currentUrl;
    const currentPageType = detectPageType(pageTitle, allLevels.length, allLevels.length);
    
    selectedLevels.push({
        name: pageTitle,
        url: currentFullUrl,
        isCurrent: true,
        type: currentPageType
    });
    
    // Update position
    for (let i = 0; i < selectedLevels.length; i++) {
        selectedLevels[i].position = i + 1;
    }
    
    console.log(`✅ FINAL (${selectedLevels.length} level): ${selectedLevels.map(l => l.name).join(' → ')}`);
    console.log(`📊 Current page type: ${currentPageType}`);
    console.log(`📊 Entity Type: ${entityType}`);
    
    // ============================================================
    // 8. GENERATE HTML BREADCRUMB
    // ============================================================
    let breadcrumbHtml = `<div class="breadcrumbs" itemscope itemtype="https://schema.org/BreadcrumbList">\n`;
    
    for (let i = 0; i < selectedLevels.length; i++) {
        const level = selectedLevels[i];
        const isLast = (i === selectedLevels.length - 1);
        const position = i + 1;
        
        if (!isLast) {
            breadcrumbHtml += `<span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">\n`;
            breadcrumbHtml += `<a href="${level.url}" itemprop="item" title="${level.name}">\n`;
            breadcrumbHtml += `<span itemprop="name">${level.name}</span>\n`;
            breadcrumbHtml += `</a>\n`;
            breadcrumbHtml += `<meta itemprop="position" content="${position}" />\n`;
            breadcrumbHtml += `</span>\n`;
            breadcrumbHtml += `<span class="separator"> › </span>\n`;
        } else {
            breadcrumbHtml += `<span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">\n`;
            breadcrumbHtml += `<span itemprop="name">${level.name}</span>\n`;
            breadcrumbHtml += `<meta itemprop="position" content="${position}" />\n`;
            breadcrumbHtml += `</span>\n`;
        }
    }
    
    breadcrumbHtml += `</div>\n`;
    
    // ============================================================
    // 9. GENERATE JSON-LD SCHEMA
    // ============================================================
    const jsonLdItems = [];
    for (let i = 0; i < selectedLevels.length; i++) {
        const level = selectedLevels[i];
        jsonLdItems.push({
            "@type": "ListItem",
            "position": i + 1,
            "name": level.name,
            "item": level.url
        });
    }
    
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": jsonLdItems
    };
    
    // ============================================================
    // 10. HAPUS BREADCRUMB LAMA & INJECT YANG BARU
    // ============================================================
    
    // Hapus semua breadcrumb lama (manual)
    const oldBreadcrumbs = document.querySelectorAll('.breadcrumbs, .breadcrumb-nav, [aria-label="Breadcrumb"]');
    oldBreadcrumbs.forEach(el => el.remove());
    
    // Hapus JSON-LD breadcrumb lama
    const oldJsonLd = document.querySelector('script[data-breadcrumb="true"]');
    if (oldJsonLd) oldJsonLd.remove();
    
    // Inject HTML breadcrumb baru
    const targetElement = document.querySelector('main, article, .content, #main-content, .post-content');
    if (targetElement && targetElement.firstChild) {
        targetElement.insertAdjacentHTML('afterbegin', breadcrumbHtml);
    } else {
        const container = document.querySelector('.container, #content, .wrapper');
        if (container && container.firstChild) {
            container.insertAdjacentHTML('afterbegin', breadcrumbHtml);
        } else {
            document.body.insertAdjacentHTML('afterbegin', breadcrumbHtml);
        }
    }
    
    // Inject JSON-LD baru
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-breadcrumb', 'true');
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    
    console.log(`✅ Breadcrumb injected to DOM for entity: ${entityType}`);
    console.log(`📊 ========================================`);
    console.log(`✅ Breadcrumb generated and injected successfully!`);
    console.log(`📊 Entity Type: ${entityType} | Page Type: ${currentPageType}`);
    console.log(`📊 ========================================`);
    
    // ============================================================
    // 11. RETURN OUTPUT (LENGKAP)
    // ============================================================
    return {
        html: breadcrumbHtml,
        jsonLd: jsonLd,
        selectedLevels: selectedLevels,
        currentPageType: currentPageType,
        entityType: entityType,
        isValidType: true
    };
}

// ============================================================
// CONTOH PANGGILAN DENGAN URL MANUAL PER LEVEL
// ============================================================

/*
// MATERIAL KONSTRUKSI - READY MIX LOKASI
const result = generateBreadcrumbForMapping(
    urlMappingReadyMixLokasiPost,
    cleanUrl,
    [
        { name: 'Material Konstruksi', url: 'https://www.betonjayareadymix.com/p/material-konstruksi.html' },
        { name: 'Material Struktur Bangunan', url: 'https://www.betonjayareadymix.com/p/material-struktur-bangunan.html' },
        { name: 'Ready Mix Beton Cor Jayamix Minimix', url: 'https://www.betonjayareadymix.com/p/ready-mix-beton-cor-jayamix-minimix.html' },
        { name: 'Ready Mix Lokasi', url: 'https://www.betonjayareadymix.com/p/ready-mix-lokasi.html' }
    ],
    'MATERIAL_KONSTRUKSI'
);

// PRODUK INTERIOR - KITCHEN SET
const result2 = generateBreadcrumbForMapping(
    urlMappingKitchenSetPost,
    currentUrl,
    [
        { name: 'Produk Interior', url: 'https://www.betonjayareadymix.com/p/produk-interior.html' },
        { name: 'Jenis Kitchen Set', url: 'https://www.betonjayareadymix.com/p/jenis-kitchen-set.html' }
    ],
    'PRODUK_INTERIOR'
);

// JASA KONSTRUKSI - KONSULTASI
const result3 = generateBreadcrumbForMapping(
    urlMappingJasaPost,
    currentUrl,
    [
        { name: 'Jasa Konstruksi', url: 'https://www.betonjayareadymix.com/p/jasa-konstruksi.html' },
        { name: 'Jasa Borongan', url: 'https://www.betonjayareadymix.com/p/jasa-borongan.html' }
    ],
    'JASA_KONSTRUKSI'
);

// SEWA ALAT BERAT - EXCAVATOR
const result4 = generateBreadcrumbForMapping(
    urlMappingSewaPost,
    currentUrl,
    [
        { name: 'Sewa Alat Berat', url: 'https://www.betonjayareadymix.com/p/sewa-alat-berat.html' },
        { name: 'Jenis Excavator', url: 'https://www.betonjayareadymix.com/p/jenis-excavator.html' }
    ],
    'SEWA_RENTAL'
);
*/
// Menyimpan elemen yang dihapus dalam variabel
let removedElementsProdukInFur = {};
// Fungsi untuk menghapus elemen berdasarkan ID
function removeCondition(conditionId) {
    const conditionElement = document.getElementById(conditionId);

    if (conditionElement) {
        // Menyimpan elemen yang dihapus dalam objek untuk bisa dikembalikan
        removedElementsProdukInFur[conditionId] = conditionElement;
        conditionElement.remove(); // Menghapus elemen tersebut
    }
}

// Fungsi untuk mengembalikan elemen yang telah dihapus
function restoreCondition(conditionId) {
    const breadcrumb = document.querySelector('.breadcrumb');
    const elementToRestore = removedElementsProdukInFur[conditionId]; // Mendapatkan elemen yang disimpan

    if (elementToRestore) {
        breadcrumb.appendChild(elementToRestore); // Menambahkan elemen kembali ke dalam breadcrumb
        delete removedElementsProdukInFur[conditionId]; // Menghapus elemen dari objek setelah dikembalikan
    } else {
        console.log(`Elemen dengan ID ${conditionId} tidak ditemukan di removedElementsProdukKons.`);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // var currentUrl = window.location.href;
     //const cleanUrl = currentUrl.split('?')[0]; // Menghapus parameter seperti ?m=1
    const cleanUrlProdukInFur = window.location.href.split(/[?#]/)[0]; // Menghilangkan parameter seperti ?m=1

			/* ==========================================================
   🧩 HybridDateModified v2.5 — StableHash + Safe Load Order
   Fitur:
   - Menjamin detect-evergreen.js dimuat lebih dulu
   - Update <meta dateModified> hanya jika URL terdaftar
   - Stable hash → hasil dateModified konsisten
   ========================================================== */

/*
(async function runHybridDateModified() {
  try {
    // --- helper untuk load eksternal JS secara promise ---
    function loadExternalJSAsync(src) {
      return new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = () => resolve(src);
        s.onerror = () => reject(new Error("Gagal load " + src));
        document.head.appendChild(s);
      });
    }

	
     // --- loader evergreen JS dengan sessionStorage (anti 429) ---
    async function loadEvergreenScript() {
      const KEY = "evergreenScriptLoaded";

      const needReload =
        !sessionStorage.getItem(KEY) ||
        !window.AEDMetaDates ||
        !window.detectEvergreenReady;

      if (!needReload) {
        console.log("⚡ detect-evergreen.js sudah aktif & variable ready — SKIP load");
      } else {
        console.log("⏳ load detect-evergreen.js dari GitHack…");
        try {
          await loadExternalJSAsync(
            "https://raw.githack.com/aliyul/solution-blogger/main/detect-evergreen.js"
          );
          window.detectEvergreenReady = true;
          sessionStorage.setItem(KEY, "true");
          console.log("✅ detect-evergreen.js LOADED & READY");
        } catch (err) {
          console.error("❌ Gagal load detect-evergreen.js", err);
          sessionStorage.removeItem(KEY);
        }
      }

      // --- ALWAYS run evergreen check tiap halaman ---
      if (typeof window.runEvergreenCheck === "function") {
        console.log("🔁 Running evergreen check for this page...");
        window.runEvergreenCheck();
      } else {
        console.warn("⚠️ runEvergreenCheck tidak ditemukan!");
      }
    }
	  
    // --- validasi URL terdaftar ---
    if (!urlMappingProdukInteriorFurniture[cleanUrlProdukInFur]) {
      console.log(`[HybridDateModified] URL tidak terdaftar: ${cleanUrlProdukInFur}`);
      return;
    }

  // === Tanggal nextUpdate1 global ===
	const globalNextUpdate1 = "2026-02-27T00:00:00.000Z";
	console.log(`🌐 [AutoMeta] Detected produk-konstruksi-post: ${cleanUrlProdukInFur}`);

    // --- pastikan meta nextUpdate1 ada ---
    let metaNextUpdate1 = document.querySelector('meta[name="nextUpdate1"]');
    if (!metaNextUpdate1) {
      metaNextUpdate1 = document.createElement("meta");
      metaNextUpdate1.setAttribute("name", "nextUpdate1");
      metaNextUpdate1.setAttribute("content", globalNextUpdate1);
      document.head.appendChild(metaNextUpdate1);
      console.log(`🆕 [AutoMeta] Meta nextUpdate1 ditambahkan → ${globalNextUpdate1}`);
    } else {
      console.log("✅ [AutoMeta] Meta nextUpdate1 sudah ada, tidak dibuat ulang.");
    }

    // --- pastikan detect-evergreen.js selesai dimuat ---
    await loadEvergreenScript();
    console.log("✅ detect-evergreen.js selesai dimuat.");

    // --- pastikan AEDMetaDates sudah tersedia ---
    if (!window.AEDMetaDates || !window.AEDMetaDates.dateModified) {
      console.warn("[HybridDateModified] AEDMetaDates tidak ditemukan, skip update.");
      return;
    }

    const { dateModified, nextUpdate, type } = window.AEDMetaDates;

    // 🔒 Stable hash untuk variasi waktu stabil
    function stableHash(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash);
    }

    const hash = stableHash(cleanUrlProdukInFur);
    const offsetSeconds = hash % 86400;
    const finalDate = new Date(new Date(dateModified).getTime() + offsetSeconds * 1000);
    const isoDate = finalDate.toISOString();

    // 🧱 Update meta dateModified
    [
      ['meta[itemprop="dateModified"]', 'itemprop', 'dateModified'],
      ['meta[name="dateModified"]', 'name', 'dateModified'],
      ['meta[property="article:modified_time"]', 'property', 'article:modified_time']
    ].forEach(([selector, attr, val]) => {
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, val);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", isoDate);
    });

    console.log(`✅ [HybridDateModified v2.5] ${cleanUrlProdukInFur} → ${isoDate} | type=${type || "-"}`);

    // 🧩 Perbarui schema jika ada
    const schemaEl = document.querySelector('script[data-schema="evergreen-maintenance"]');
    if (schemaEl) {
      try {
        const data = JSON.parse(schemaEl.textContent.trim());
        data.dateModified = isoDate;
        if (data.maintenanceSchedule) data.maintenanceSchedule.scheduledTime = nextUpdate;
        schemaEl.textContent = JSON.stringify(data, null, 2);
        console.log(`🔄 Schema maintenance diperbarui → dateModified: ${isoDate}`);
      } catch (err) {
        console.error("❌ Gagal update schema:", err);
      }
    }

  } catch (err) {
    console.error("[HybridDateModified] Fatal error:", err);
  }
})();
*/	

	    // --- validasi URL terdaftar ---
    if (!urlMappingProdukInteriorFurniture[cleanUrlProdukInFur]) {
      console.log(`[HybridDateModified] URL tidak terdaftar: ${cleanUrlProdukInFur}`);
      return;
    }

	(async function runHybridDateModified() {
		  try {
		
		    function loadExternalJS(src) {
		      return new Promise((resolve) => {
		        if (document.querySelector(`script[src="${src}"]`)) {
		          resolve();
		          return;
		        }
		
		        const s = document.createElement("script");
		        s.src = src;
		        s.defer = true; // 🔥 PENTING
		        s.onload = resolve;
		        s.onerror = () => {
		          console.warn("[Evergreen] Gagal load:", src);
		          resolve(); // ❗ jangan reject
		        };
		        document.head.appendChild(s);
		      });
		    }
		
		    function waitForDetectEvergreen() {
		      return new Promise((resolve) => {
		        if (
		          window.__detectEvergreenReady &&
		          typeof window.detectEvergreen === "function"
		        ) {
		          resolve(true);
		        } else {
		          window.addEventListener(
		            "detectEvergreenReady",
		            () => resolve(true),
		            { once: true }
		          );
		        }
		      });
		    }
		
		    async function loadEvergreenScript(manualDate = null) {
		
		      if (typeof window.detectEvergreen !== "function") {
		        console.log("⏳ Loading detectEvergreen...");
		
		        await loadExternalJS(
		          "https://raw.githack.com/aliyul/solution-blogger/main/detect-evergreen.js"
		        );
		
		        await waitForDetectEvergreen();
		        console.log("✅ detectEvergreen READY");
		      } else {
		        console.log("⚡ detectEvergreen already available");
		      }
		
		      const config = manualDate
		        ? { customDateModified: manualDate }
		        : {};
		
		      console.log("🧠 detectEvergreen config:", config);
		
		      try {
		        window.detectEvergreen(config);
		      } catch (e) {
		        console.error("[Evergreen] Execution failed:", e);
		      }
		    }
		
		    // =============================
		    // MODE PEMANGGILAN
		    // =============================
		
		    // ✔ MANUAL (ONCE UPDATE EVERGREEN)
		    await loadEvergreenScript("2026-01-11T10:30:00+07:00");
		
		    // ✔ AUTO MODE
		    // await loadEvergreenScript();
		
		  } catch (err) {
		    console.error("[HybridDateModified] Fatal:", err);
		  }
		})();
	
    var ProdukInFur = document.getElementById("ProdukInFur");
    if (!ProdukInFur) {
        console.error("elemen Id ProdukInFur kondisi terhapus");
        return;
    }
	
     // Menemukan elemen menggunakan Id
     var ProdukInteriorFurnitureLink = document.getElementById("ProdukInteriorFurniture");
     //var KitchenSetLink = document.getElementById("KitchenSet");

     var pageNameProdukInFur = document.getElementById("pageNameProdukInFur");
    

     // Default untuk menyembunyikan elemen
     ProdukInteriorFurnitureLink.style.visibility = 'hidden';
     //KitchenSetLink.style.visibility = 'hidden';
  
     pageNameProdukInFur.textContent = "";
if (urlMappingProdukInteriorFurniture[cleanUrlProdukInFur]) {
    restoreCondition('ProdukInFur');
    restoreCondition('ProdukInteriorFurniture');
    
    // hapus elemen div id lain
    removeCondition1('MaterialKons');
    removeCondition1('ProdukKons');
    removeCondition1('ProdukKonsSaluran');
    removeCondition1('ProdukKonsPembatas');
    removeCondition1('JasaKonsPembatas');
    removeCondition('JasaKonsJalanPerkerasan');
    removeCondition('JasaKonsPondasiTanah');
    removeCondition1('JasaKons');
    removeCondition1('JasaKonsSub');
    removeCondition1('MenuKons');
    removeCondition1('JasaKonsFinishing');
    removeCondition1('JasaKonsStruktur');
    removeCondition1('JasaKonsPerbaikan');

    // tampilkan link
    ProdukInteriorFurnitureLink.style.visibility = 'visible';
    pageNameProdukInFur.textContent = urlMappingProdukInteriorFurniture[cleanUrlProdukInFur];
    
    // ✅ CUKUP 1 BARIS INI — GANTI SEMUA JSON-LD MANUAL
    generateBreadcrumbForMapping(
        urlMappingProdukInteriorFurniture,
        cleanUrlProdukInFur,
        [
            'Produk Interior'
        ],
        'PRODUK_INTERIOR'
    );
}

  
   });
