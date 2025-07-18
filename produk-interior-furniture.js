
 // Cek URL saat ini dan sesuaikan dengan kondisi yang diinginkan
const urlMappingProdukInteriorFurniture = {
"https://www.betonjayareadymix.com/p/kitchen-set.html": "Kitchen Set"
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
        //restoreCondition('ProdukKonstruksi');
 
     //hapus elemen div id lain
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

     //hapus elemen ID DIV SUB ProdukInteriorFurniture SEMUA NYA
        ProdukInteriorFurnitureLink.style.visibility = 'visible';
         //KitchenSetLink.style.visibility = 'visible';
        //ProdukBuisLink.style.visibility = 'visible';
        pageNameProdukInFur.textContent = urlMappingProdukInteriorFurniture[cleanUrlProdukInFur];
    }
  
   });
