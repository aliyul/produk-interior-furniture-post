/*
ProdKitchenPabrikanPost
ProdKamarSetPost
ProdSofaNetPost
ProdTokoFurniturePost
*/
 // Cek URL saat ini dan sesuaikan dengan kondisi yang diinginkan
const urlMappingProdKitchenPabrikanPost = {
  "https://www.betonjayareadymix.com/2019/04/kitchen-set-minimalis-modern.html": "Kitchen Set Minimalis Modern",
  "https://www.betonjayareadymix.com/2019/04/kitchen-set-modular-rumah.html": "Kitchen Set Modular Rumah",
  "https://www.betonjayareadymix.com/2019/04/kitchen-set-siap-pakai.html": "Kitchen Set Siap Pakai",
  "https://www.betonjayareadymix.com/2019/04/kitchen-set-pabrikan.html": "Kitchen Set Pabrikan",
  "https://www.betonjayareadymix.com/2019/04/harga-kitchen-set-pabrikan.html": "Harga Kitchen Set Pabrikan",
  "https://www.betonjayareadymix.com/2019/04/harga-kitchen-set-minimalis.html": "Harga Kitchen Set Minimalis",
  "https://www.betonjayareadymix.com/2019/04/harga-kitchen-set-modular.html": "Harga Kitchen Set Modular",
  "https://www.betonjayareadymix.com/2019/04/jual-kitchen-set-minimalis.html": "Jual Kitchen Set Minimalis",
  "https://www.betonjayareadymix.com/2019/04/jual-kitchen-set-modular.html": "Jual Kitchen Set Modular",
  "https://www.betonjayareadymix.com/2019/04/jual-kitchen-set-terbaru.html": "Jual Kitchen Set Terbaru",
  "https://www.betonjayareadymix.com/2019/04/kitchen-set-material-hpl-mdf.html": "Kitchen Set Material HPL MDF",
  "https://www.betonjayareadymix.com/2019/04/kitchen-set-type-l-dan-i.html": "Kitchen Set Tipe L dan I",
  "https://www.betonjayareadymix.com/2019/04/kitchen-set-mini-apartemen.html": "Kitchen Set Mini Apartemen"
};
const urlMappingProdKamarSetPost = {
  "https://www.betonjayareadymix.com/2018/09/harga-kamar-set.html": "Harga Kamar Set",
  "https://www.betonjayareadymix.com/2018/09/harga-kamar-set-hpl.html": "Harga Kamar Set HPL",
  "https://www.betonjayareadymix.com/2018/09/harga-kamar-set-pengantin.html": "Harga Kamar Set Pengantin",
  "https://www.betonjayareadymix.com/2018/09/harga-kamar-set-bigland.html": "Harga Kamar Set Bigland",
  "https://www.betonjayareadymix.com/2018/09/harga-kamar-set-minimalis-modern.html": "Harga Kamar Set Minimalis Modern",
  "https://www.betonjayareadymix.com/2018/09/harga-kamar-set-murah.html": "Harga Kamar Set Murah"

};
const urlMappingProdSofaNetPost = {
  "https://www.betonjayareadymix.com/2018/09/harga-sofa-set.html": "Harga Sofa Set",
  "https://www.betonjayareadymix.com/2018/09/harga-sofa-set-jati.html": "Harga Sofa Set Jati",
  "https://www.betonjayareadymix.com/2018/09/harga-kasur-set.html": "Harga Kasur Set"
 
};
const urlMappingProdTokoFurniturePost = {
  "https://www.betonjayareadymix.com/2018/09/toko-furniture-terdekat.html": "Toko Furniture Terdekat"
};

// Menyimpan elemen yang dihapus dalam variabel
let removedElementsProdukInFurPost = {};
// Fungsi untuk menghapus elemen berdasarkan ID
function removeCondition(conditionId) {
    const conditionElement = document.getElementById(conditionId);

    if (conditionElement) {
        // Menyimpan elemen yang dihapus dalam objek untuk bisa dikembalikan
        removedElementsProdukInFurPost[conditionId] = conditionElement;
        conditionElement.remove(); // Menghapus elemen tersebut
    }
}

// Fungsi untuk mengembalikan elemen yang telah dihapus
function restoreCondition(conditionId) {
    const breadcrumb = document.querySelector('.breadcrumb');
    const elementToRestore = removedElementsProdukInFurPost[conditionId]; // Mendapatkan elemen yang disimpan

    if (elementToRestore) {
        breadcrumb.appendChild(elementToRestore); // Menambahkan elemen kembali ke dalam breadcrumb
        delete removedElementsProdukInFurPost[conditionId]; // Menghapus elemen dari objek setelah dikembalikan
    } else {
        console.log(`Elemen dengan ID ${conditionId} tidak ditemukan di removedElementsProdukInFurPost.`);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // var currentUrl = window.location.href;
     //const cleanUrl = currentUrl.split('?')[0]; // Menghapus parameter seperti ?m=1
    const cleanUrlProdukInFurPost = window.location.href.split(/[?#]/)[0]; // Menghilangkan parameter seperti ?m=1

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
    // --- gabungkan semua mapping ---
    const urlMappingGabungan = Object.assign(
      {},
		urlMappingProdKitchenPabrikanPost,
		urlMappingProdKamarSetPost,
		urlMappingProdSofaNetPost,
		urlMappingProdTokoFurniturePost
		
   );

    // --- validasi URL terdaftar ---
    if (!urlMappingGabungan[cleanUrlProdukInFurPost]) {
      console.log(`[HybridDateModified] URL tidak terdaftar: ${cleanUrlProdukInFurPost}`);
      return;
    }
   
  // === Tanggal nextUpdate1 global ===
	const globalNextUpdate1 = "2026-02-28T00:00:00.000Z";
	console.log(`🌐 [AutoMeta] Detected produk-interior-furniture-post: ${cleanUrlProdukInFurPost}`);

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

    const hash = stableHash(cleanUrlProdukInFurPost);
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

    console.log(`✅ [HybridDateModified v2.5] ${cleanUrlProdukInFurPost} → ${isoDate} | type=${type || "-"}`);

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
	
    var ProdukInFurPost = document.getElementById("ProdukInFurPost");
    if (!ProdukInFurPost) {
        console.error("elemen Id ProdukInFurPost kondisi terhapus");
        return;
    }
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
      } else if (typeof window.detectEvergreen === "function") {
        // fallback jika runEvergreenCheck tidak ada
        console.log("🔁 fallback: running detectEvergreen() directly...");
        window.detectEvergreen();
      } else {
        console.warn("⚠️ runEvergreenCheck / detectEvergreen tidak ditemukan!");
      }
    }

    // === PANGGIL LOADER ===
    await loadEvergreenScript();

  } catch (err) {
    console.error("[HybridDateModified] Fatal error:", err);
  }
})();

     // Menemukan elemen menggunakan Id
     var ProdukInteriorFurniturePostLink = document.getElementById("ProdukInteriorFurniturePost");
     //var ProdukkitchenSetPostLink = document.getElementById("ProdukkitchenSetPost");

     var pageNameProdukInFurPost = document.getElementById("pageNameProdukInFurPost");
     var ProdKitchenPabrikanPostLink = document.getElementById("ProdKitchenPabrikanPost");
     var ProdKamarSetPostLink = document.getElementById("ProdKamarSetPost");
     var ProdSofaNetPostLink = document.getElementById("ProdSofaNetPost");
     var ProdTokoFurniturePostLink = document.getElementById("ProdTokoFurniturePost");
    
     // Default untuk menyembunyikan elemen
     ProdukInteriorFurniturePostLink.style.visibility = 'hidden';
     ProdKitchenPabrikanPostLink.style.visibility = 'hidden';
     ProdKamarSetPostLink.style.visibility = 'hidden';
     ProdSofaNetPostLink.style.visibility = 'hidden';
     ProdTokoFurniturePostLink.style.visibility = 'hidden';
  
     pageNameProdukInFurPost.textContent = "";
 if (urlMappingProdKitchenPabrikanPost[cleanUrlProdukInFurPost]) {
        restoreCondition('ProdukInFurPost');
        restoreCondition('ProdukInteriorFurniturePost');
        restoreCondition('ProdKitchenPabrikanPost');
 
      //hapus elemen div id lain
	removeCondition('JasaDesInPost');
        removeCondition('ProdukKonsPembatasPost');
	   removeCondition('ProdukKonsDindingModularPost');
        removeCondition('MaterialKonsStukturPost');
        removeCondition('MaterialKonsFasadPelapisEksteriorPost');
        removeCondition('MaterialKonsAtapPenutupPost');
        removeCondition('ProdukKonsSaluranPost');
        removeCondition('ProdukKonsPost');

        removeCondition('JasaKonsPerbaikanPost');
	removeCondition('JasaKonsCuttingBetonPost');
        removeCondition('JasaKonsPembatasPost');
        removeCondition('JasaKonsPondasiTanahPost');
        removeCondition('JasaKonsPerkuatanTanahLongsorPost');
	removeCondition('JasaKonsBongkarBangunanPost');
        removeCondition('JasaKonsPengeboranPost'); 
	removeCondition('JasaKonsFinishingPost');
        removeCondition('JasaKonsStrukturPost');
        removeCondition('JasaKonsAlatKonstruksiPost');
        removeCondition('JasaKonsJalanPerkerasanPost');
     
     //hapus elemen ID DIV SUB ProdukInteriorFurniture SEMUA NYA selain ProdKitchenPabrikanPost
        //removeCondition('ProdKitchenPabrikanPost');
        removeCondition('ProdKamarSetPost');
        removeCondition('ProdSofaNetPost');
        removeCondition('ProdTokoFurniturePost');
		
        ProdukInteriorFurniturePostLink.style.visibility = 'visible';
        ProdKitchenPabrikanPostLink.style.visibility = 'visible';
        //ProdukBuisLink.style.visibility = 'visible';
        pageNameProdukInFurPost.textContent = urlMappingProdKitchenPabrikanPost[cleanUrlProdukInFurPost];
    }
 // ✅ Tambahkan JSON-LD Breadcrumb otomatis
   if (urlMappingProdKitchenPabrikanPost[cleanUrlProdukInFurPost]) {
       const jsonLDBreadcrumb = {
           "@context": "https://schema.org",
           "@type": "BreadcrumbList",
           "itemListElement": [
	    {
	      "@type": "ListItem",
	      "position": 1,
	      "name": "Beton Jaya Readymix",
	      "item": "https://www.betonjayareadymix.com/"
	    },
               {
                   "@type": "ListItem",
                   "position": 2,
                   "name": "Produk Interior",
                   "item": "https://www.betonjayareadymix.com/p/produk-interior.html"
               },
	       {
                   "@type": "ListItem",
                   "position": 3,
                   "name": "Kitchen Set Pabrikan",
                   "item": "https://www.betonjayareadymix.com/p/kitchen-set-pabrikan.html"
               },
               {
                   "@type": "ListItem",
                   "position": 4,
                   "name": urlMappingProdKitchenPabrikanPost[cleanUrlProdukInFurPost],
                   "item": cleanUrlProdukInFurPost
               }
           ]
       };

       const script = document.createElement('script');
       script.type = 'application/ld+json';
       script.text = JSON.stringify(jsonLDBreadcrumb);
       document.head.appendChild(script);
   }
 if (urlMappingProdKamarSetPost[cleanUrlProdukInFurPost]) {
        restoreCondition('ProdukInFurPost');
        restoreCondition('ProdukInteriorFurniturePost');
        restoreCondition('ProdKamarSetPost');
 
	 //hapus elemen div id lain
	removeCondition('JasaDesInPost');
        removeCondition('ProdukKonsPembatasPost');
	   removeCondition('ProdukKonsDindingModularPost');
        removeCondition('MaterialKonsStukturPost');
        removeCondition('MaterialKonsFasadPelapisEksteriorPost');
        removeCondition('MaterialKonsAtapPenutupPost');
        removeCondition('ProdukKonsSaluranPost');
        removeCondition('ProdukKonsPost');

        removeCondition('JasaKonsPerbaikanPost');
	removeCondition('JasaKonsCuttingBetonPost');
        removeCondition('JasaKonsPembatasPost');
        removeCondition('JasaKonsPondasiTanahPost');
        removeCondition('JasaKonsPerkuatanTanahLongsorPost');
	removeCondition('JasaKonsBongkarBangunanPost');
        removeCondition('JasaKonsPengeboranPost'); 
	removeCondition('JasaKonsFinishingPost');
        removeCondition('JasaKonsStrukturPost');
        removeCondition('JasaKonsAlatKonstruksiPost');
        removeCondition('JasaKonsJalanPerkerasanPost');
       
     //hapus elemen ID DIV SUB ProdukInteriorFurniture SEMUA NYA selain ProdKitchenPabrikanPost
        //removeCondition('ProdKitchenPabrikanPost');
        removeCondition('ProdKitchenPabrikanPost');
        removeCondition('ProdSofaNetPost');
        removeCondition('ProdTokoFurniturePost');
		
        ProdukInteriorFurniturePostLink.style.visibility = 'visible';
        ProdKamarSetPostLink.style.visibility = 'visible';
        //ProdukBuisLink.style.visibility = 'visible';
        pageNameProdukInFurPost.textContent = urlMappingProdKamarSetPost[cleanUrlProdukInFurPost];
    }

 // ✅ Tambahkan JSON-LD Breadcrumb otomatis
   if (urlMappingProdKamarSetPost[cleanUrlProdukInFurPost]) {
       const jsonLDBreadcrumb = {
           "@context": "https://schema.org",
           "@type": "BreadcrumbList",
           "itemListElement": [
	    {
	      "@type": "ListItem",
	      "position": 1,
	      "name": "Beton Jaya Readymix",
	      "item": "https://www.betonjayareadymix.com/"
	    },
               {
                   "@type": "ListItem",
                   "position": 2,
                   "name": "Produk Interior",
                   "item": "https://www.betonjayareadymix.com/p/produk-interior.html"
               },
	       {
                   "@type": "ListItem",
                   "position": 3,
                   "name": "Kamar Set",
                   "item": "https://www.betonjayareadymix.com/p/kamar-set.html"
               },
               {
                   "@type": "ListItem",
                   "position": 4,
                   "name": urlMappingProdKamarSetPost[cleanUrlProdukInFurPost],
                   "item": cleanUrlProdukInFurPost
               }
           ]
       };

       const script = document.createElement('script');
       script.type = 'application/ld+json';
       script.text = JSON.stringify(jsonLDBreadcrumb);
       document.head.appendChild(script);
   }
 if (urlMappingProdSofaNetPost[cleanUrlProdukInFurPost]) {
        restoreCondition('ProdukInFurPost');
        restoreCondition('ProdukInteriorFurniturePost');
        restoreCondition('ProdSofaNetPost');

      //hapus elemen div id lain
	removeCondition('JasaDesInPost');
	   removeCondition('ProdukKonsDindingModularPost');
        removeCondition('ProdukKonsPembatasPost');
        removeCondition('MaterialKonsStukturPost');
        removeCondition('MaterialKonsFasadPelapisEksteriorPost');
        removeCondition('MaterialKonsAtapPenutupPost');
        removeCondition('ProdukKonsSaluranPost');
        removeCondition('ProdukKonsPost');

        removeCondition('JasaKonsPerbaikanPost');
	removeCondition('JasaKonsCuttingBetonPost');
        removeCondition('JasaKonsPembatasPost');
        removeCondition('JasaKonsPondasiTanahPost');
        removeCondition('JasaKonsPerkuatanTanahLongsorPost');
	removeCondition('JasaKonsBongkarBangunanPost');
        removeCondition('JasaKonsPengeboranPost'); 
	removeCondition('JasaKonsFinishingPost');
        removeCondition('JasaKonsStrukturPost');
        removeCondition('JasaKonsAlatKonstruksiPost');
        removeCondition('JasaKonsJalanPerkerasanPost');
     
       
     //hapus elemen ID DIV SUB ProdukInteriorFurniture SEMUA NYA selain ProdKitchenPabrikanPost
        //removeCondition('ProdKitchenPabrikanPost');
        removeCondition('ProdKamarSetPost');
        removeCondition('ProdKitchenPabrikanPost');
        removeCondition('ProdTokoFurniturePost');
		
        ProdukInteriorFurniturePostLink.style.visibility = 'visible';
        ProdSofaNetPostLink.style.visibility = 'visible';
        //ProdukBuisLink.style.visibility = 'visible';
        pageNameProdukInFurPost.textContent = urlMappingProdSofaNetPost[cleanUrlProdukInFurPost];
    }
 // ✅ Tambahkan JSON-LD Breadcrumb otomatis
   if (urlMappingProdSofaNetPost[cleanUrlProdukInFurPost]) {
       const jsonLDBreadcrumb = {
           "@context": "https://schema.org",
           "@type": "BreadcrumbList",
           "itemListElement": [
	    {
	      "@type": "ListItem",
	      "position": 1,
	      "name": "Beton Jaya Readymix",
	      "item": "https://www.betonjayareadymix.com/"
	    },
               {
                   "@type": "ListItem",
                   "position": 2,
                   "name": "Produk Interior",
                   "item": "https://www.betonjayareadymix.com/p/produk-interior.html"
               },
	       {
                   "@type": "ListItem",
                   "position": 3,
                   "name": "Sofa Set",
                   "item": "https://www.betonjayareadymix.com/p/sofa-set.html"
               },
               {
                   "@type": "ListItem",
                   "position": 4,
                   "name": urlMappingProdSofaNetPost[cleanUrlProdukInFurPost],
                   "item": cleanUrlProdukInFurPost
               }
           ]
       };

       const script = document.createElement('script');
       script.type = 'application/ld+json';
       script.text = JSON.stringify(jsonLDBreadcrumb);
       document.head.appendChild(script);
   }
 if (urlMappingProdTokoFurniturePost[cleanUrlProdukInFurPost]) {
        restoreCondition('ProdukInFurPost');
        restoreCondition('ProdukInteriorFurniturePost');
        restoreCondition('ProdTokoFurniturePost');
 
      //hapus elemen div id lain
	removeCondition('JasaDesInPost');
        removeCondition('ProdukKonsPembatasPost');
	   removeCondition('ProdukKonsDindingModularPost');
        removeCondition('MaterialKonsStukturPost');
        removeCondition('MaterialKonsFasadPelapisEksteriorPost');
        removeCondition('MaterialKonsAtapPenutupPost');
        removeCondition('ProdukKonsSaluranPost');
        removeCondition('ProdukKonsPost');

        removeCondition('JasaKonsPerbaikanPost');
	removeCondition('JasaKonsCuttingBetonPost');
        removeCondition('JasaKonsPembatasPost');
        removeCondition('JasaKonsPondasiTanahPost');
        removeCondition('JasaKonsPerkuatanTanahLongsorPost');
	removeCondition('JasaKonsBongkarBangunanPost');
        removeCondition('JasaKonsPengeboranPost'); 
	removeCondition('JasaKonsFinishingPost');
        removeCondition('JasaKonsStrukturPost');
        removeCondition('JasaKonsAlatKonstruksiPost');
        removeCondition('JasaKonsJalanPerkerasanPost');
     
       
     //hapus elemen ID DIV SUB ProdukInteriorFurniture SEMUA NYA selain ProdKitchenPabrikanPost
        //removeCondition('ProdKitchenPabrikanPost');
        removeCondition('ProdKamarSetPost');
        removeCondition('ProdSofaNetPost');
        removeCondition('ProdKitchenPabrikanPost');
		
        ProdukInteriorFurniturePostLink.style.visibility = 'visible';
        ProdTokoFurniturePostLink.style.visibility = 'visible';
        //ProdukBuisLink.style.visibility = 'visible';
        pageNameProdukInFurPost.textContent = urlMappingProdTokoFurniturePost[cleanUrlProdukInFurPost];
    }
   // ✅ Tambahkan JSON-LD Breadcrumb otomatis
   if (urlMappingProdTokoFurniturePost[cleanUrlProdukInFurPost]) {
       const jsonLDBreadcrumb = {
           "@context": "https://schema.org",
           "@type": "BreadcrumbList",
           "itemListElement": [
	    {
	      "@type": "ListItem",
	      "position": 1,
	      "name": "Beton Jaya Readymix",
	      "item": "https://www.betonjayareadymix.com/"
	    },
               {
                   "@type": "ListItem",
                   "position": 2,
                   "name": "Produk Interior",
                   "item": "https://www.betonjayareadymix.com/p/produk-interior.html"
               },
	       {
                   "@type": "ListItem",
                   "position": 3,
                   "name": "Toko Furniture",
                   "item": "https://www.betonjayareadymix.com/p/toko-furniture.html"
               },
               {
                   "@type": "ListItem",
                   "position": 4,
                   "name": urlMappingProdTokoFurniturePost[cleanUrlProdukInFurPost],
                   "item": cleanUrlProdukInFurPost
               }
           ]
       };

       const script = document.createElement('script');
       script.type = 'application/ld+json';
       script.text = JSON.stringify(jsonLDBreadcrumb);
       document.head.appendChild(script);
   }
   });
