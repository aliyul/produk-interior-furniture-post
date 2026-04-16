
 // Cek URL saat ini dan sesuaikan dengan kondisi yang diinginkan
// ============================================================
// PRODUK INTERIOR FURNITURE - VARIANT
// ============================================================
// 🧠 SEO NOTE: Setiap item adalah sub dari Produk Interior (/p/produk-interior.html)
// Parent: Produk Interior (/p/produk-interior.html)
// ============================================================

const urlMappingProdukInteriorFurniture = {
  // ============================================================
  // [VARIANT] - TOKO FURNITURE
  // 🧠 STATUS: AKTIF (konten lengkap)
  // Breadcrumb: Home > Produk Interior > Toko Furniture
  // ============================================================
  "https://www.betonjayareadymix.com/p/toko-furniture.html": "Toko furniture",

  // ============================================================
  // [VARIANT] - SOFA SET
  // 🧠 STATUS: AKTIF (konten lengkap)
  // Breadcrumb: Home > Produk Interior > Sofa Set
  // ============================================================
  "https://www.betonjayareadymix.com/p/sofa-set.html": "Sofa set",

  // ============================================================
  // [VARIANT] - KAMAR SET
  // 🧠 STATUS: AKTIF (konten lengkap)
  // Breadcrumb: Home > Produk Interior > Kamar Set
  // ============================================================
  "https://www.betonjayareadymix.com/p/kamar-set.html": "Kamar set",

  // ============================================================
  // [VARIANT] - KITCHEN SET PABRIKAN
  // 🧠 STATUS: AKTIF (konten lengkap)
  // Breadcrumb: Home > Produk Interior > Kitchen Set Pabrikan
  // ============================================================
  "https://www.betonjayareadymix.com/p/kitchen-set-pabrikan.html": "Kitchen set pabrikan"
};

// ============================================================
// FUNGSI GENERATE BREADCRUMB - DENGAN URL ABSOLUT (LENGKAP)
// ============================================================

function generateBreadcrumbForMapping(mappingObj, currentUrl, breadcrumbNames = [], pillarType = 'JASA_KONSTRUKSI') {
    
    const MAX_LEVEL = 4;
    const DOMAIN = 'https://www.betonjayareadymix.com';
    
    // Validasi pillar type
    const validPillarTypes = ['PRODUK_KONSTRUKSI', 'MATERIAL_KONSTRUKSI', 'JASA_KONSTRUKSI', 'PRODUK_INTERIOR', 'JASA_DESAIN_INTERIOR'];
    if (!validPillarTypes.includes(pillarType)) {
        console.error(`❌ ERROR: "${pillarType}" BUKAN PILLAR TYPE yang valid!`);
        return null;
    }
    
    const pageTitle = mappingObj[currentUrl];
    if (!pageTitle) {
        console.error(`❌ ERROR: URL "${currentUrl}" tidak ditemukan di mapping`);
        return null;
    }
    
    // ============================================================
    // FUNGSI DETEKSI TYPE OTOMATIS DARI NAMA
    // ============================================================
    function detectPageType(pageName) {
        const lowerName = pageName.toLowerCase();
        
        // Money Child (ada nama kota)
        const cities = ['jakarta', 'surabaya', 'bandung', 'bekasi', 'tangerang', 'depok', 'bogor', 'cikarang', 'karawang'];
        for (const city of cities) {
            if (lowerName.endsWith(city) || lowerName.includes(' ' + city)) return 'MONEY_CHILD';
        }
        
        // Money Lead Gen
        if (lowerName.startsWith('konsultasi')) return 'MONEY_LEADGEN';
        
        // Money Master
        if (lowerName.startsWith('harga ') || lowerName.startsWith('sewa ')) {
            if (lowerName.includes('panduan')) return 'SUB1';
            return 'MONEY_MASTER';
        }
        
        // SUB1 (Panduan)
        if (lowerName.startsWith('panduan ') || lowerName.startsWith('cara memilih ')) return 'SUB1';
        
        // VARIANT
        if (lowerName.includes(' mini') || lowerName.includes(' long arm') || lowerName.match(/k\d{3}/)) return 'VARIANT';
        
        // SUB2_TURUNAN
        if (lowerName.startsWith('sewa alat ') || lowerName === 'sewa alat konstruksi' ||
            lowerName === 'sewa alat berat' || lowerName === 'sewa alat ringan') return 'SUB2_TURUNAN';
        
        // PILLAR
        const pillars = ['produk konstruksi', 'material konstruksi', 'jasa konstruksi', 'produk interior', 'jasa desain interior'];
        if (pillars.includes(lowerName)) return 'PILLAR';
        
        // Default SUB2
        return 'SUB2';
    }
    
    // ============================================================
    // FUNGSI GENERATE URL ABSOLUT (LENGKAP DENGAN DOMAIN)
    // ============================================================
    function generateAbsoluteUrl(pageName) {
        const slug = pageName.toLowerCase().replace(/ /g, '-');
        return `${DOMAIN}/p/${slug}.html`;
    }
    
    // ============================================================
    // GENERATE ID DARI NAMA
    // ============================================================
    function generateIdFromName(name) {
        let id = name.replace(/[^a-zA-Z0-9]/g, '');
        if (id === 'ProdukInterior') return 'ProdukInteriorPost';
        if (id === 'Furniture') return 'FurniturePost';
        return id + 'Post';
    }
    
    // ============================================================
    // BANGUN LEVELS DARI ARRAY NAMA
    // ============================================================
    const allLevels = [];
    for (let i = 0; i < breadcrumbNames.length; i++) {
        const name = breadcrumbNames[i];
        allLevels.push({
            name: name,
            url: generateAbsoluteUrl(name),  // ✅ URL ABSOLUT!
            type: detectPageType(name),
            id: generateIdFromName(name)
        });
    }
    
    // ============================================================
    // TENTUKAN LEVEL YANG AKAN DITAMPILKAN (SKIP OTOMATIS)
    // ============================================================
    const selectedLevels = [];
    
    // Home (BJR) - WAJIB
    selectedLevels.push({
        name: 'BJR',
        url: DOMAIN,
        isHome: true
    });
    
    // Parent terdekat (level terakhir) - WAJIB tampil
    if (allLevels.length > 0) {
        selectedLevels.push(allLevels[allLevels.length - 1]);
    }
    
    // Level lainnya (boleh skip)
    for (let i = 0; i < allLevels.length - 1; i++) {
        const level = allLevels[i];
        if (selectedLevels.length >= MAX_LEVEL) {
            console.log(`📌 Skip "${level.name}" karena batas ${MAX_LEVEL} level`);
            continue;
        }
        if (level.type === 'PILLAR' || level.type === 'SUB2' || level.type === 'SUB2_TURUNAN') {
            console.log(`📌 Skip "${level.name}" (${level.type}) karena type boleh skip`);
            continue;
        }
        selectedLevels.push(level);
    }
    
    // ============================================================
    // GENERATE HTML BREADCRUMB
    // ============================================================
    let breadcrumbHtml = `<div class="breadcrumbs">\n<span>\n`;
    breadcrumbHtml += `<a href="${DOMAIN}/" itemprop="item" title="Beton Jaya Readymix">`;
    breadcrumbHtml += `<meta content="1" itemprop="position">`;
    breadcrumbHtml += `<span itemprop="name">BJR</span></a>\n`;
    breadcrumbHtml += `</span>\n &nbsp;›&nbsp;\n\n`;
    breadcrumbHtml += `<span>\n<div id="JasaKonsAlatKonstruksiPost" style="display: inline;">\n`;
    
    for (let i = 1; i < selectedLevels.length; i++) {
        const level = selectedLevels[i];
        if (i < selectedLevels.length - 1) {
            breadcrumbHtml += `<a href="${level.url}" id="${level.id}" title="${level.name.toUpperCase()}" style="visibility: visible;">`;
            breadcrumbHtml += `<span id="${level.id}Name">${level.name}</span>&nbsp;›&nbsp;\n`;
            breadcrumbHtml += `</a>\n`;
        } else {
            breadcrumbHtml += `<span id="pageNameJasaKonsAlatKonstruksiPost">${pageTitle}</span>\n`;
        }
    }
    
    breadcrumbHtml += `</div>\n</span>\n</div>`;
    
    // ============================================================
    // GENERATE JSON-LD DENGAN URL ABSOLUT
    // ============================================================
    const jsonLdItems = [
        { position: 1, name: 'Beton Jaya Readymix', item: DOMAIN }
    ];
    
    let position = 2;
    for (let i = 1; i < selectedLevels.length; i++) {
        jsonLdItems.push({
            position: position++,
            name: selectedLevels[i].name,
            item: selectedLevels[i].url  // ✅ URL ABSOLUT!
        });
    }
    
    jsonLdItems.push({
        position: position,
        name: pageTitle,
        item: currentUrl.startsWith('http') ? currentUrl : DOMAIN + currentUrl
    });
    
    // ============================================================
    // INJECT KE DOM
    // ============================================================
    document.querySelector('.breadcrumbs')?.remove();
    document.querySelector('script[data-breadcrumb="true"]')?.remove();
    
    const mainContent = document.querySelector('main, article, .content, #main-content, .post-content');
    if (mainContent?.firstChild) {
        mainContent.insertAdjacentHTML('afterbegin', breadcrumbHtml);
    } else {
        document.body.insertAdjacentHTML('afterbegin', breadcrumbHtml);
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-breadcrumb', 'true');
    script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": jsonLdItems
    }, null, 2);
    document.head.appendChild(script);
    
    console.log(`✅ Breadcrumb: ${selectedLevels.map(l => l.name).join(' → ')} → ${pageTitle}`);
    return breadcrumbHtml;
}
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
