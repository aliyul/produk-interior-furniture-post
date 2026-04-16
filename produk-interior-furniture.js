
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
