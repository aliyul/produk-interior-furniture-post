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
    var ProdukInFurPost = document.getElementById("ProdukInFurPost");
    if (!ProdukInFurPost) {
        console.error("elemen Id ProdukInFurPost kondisi terhapus");
        return;
    }
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
   if (urlMappingProdKitchenPabrikanPost[cleanUrlProdukInFur]) {
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
                   "name": urlMappingProdKitchenPabrikanPost[cleanUrlProdukInFur],
                   "item": cleanUrlProdukInFur
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
   if (urlMappingProdKamarSetPost[cleanUrlProdukInFur]) {
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
                   "name": urlMappingProdKamarSetPost[cleanUrlProdukInFur],
                   "item": cleanUrlProdukInFur
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
   if (urlMappingProdSofaNetPost[cleanUrlProdukInFur]) {
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
                   "name": urlMappingProdSofaNetPost[cleanUrlProdukInFur],
                   "item": cleanUrlProdukInFur
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
   if (urlMappingProdTokoFurniturePost[cleanUrlProdukInFur]) {
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
                   "name": urlMappingProdTokoFurniturePost[cleanUrlProdukInFur],
                   "item": cleanUrlProdukInFur
               }
           ]
       };

       const script = document.createElement('script');
       script.type = 'application/ld+json';
       script.text = JSON.stringify(jsonLDBreadcrumb);
       document.head.appendChild(script);
   }
   });
