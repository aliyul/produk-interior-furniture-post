
 // Cek URL saat ini dan sesuaikan dengan kondisi yang diinginkan
const urlMappingProdukInteriorFurniturePost = {
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
    const cleanUrlProdukInFur = window.location.href.split(/[?#]/)[0]; // Menghilangkan parameter seperti ?m=1
    var ProdukInFurPost = document.getElementById("ProdukInFurPost");
    if (!ProdukInFurPost) {
        console.error("elemen Id ProdukInFurPost kondisi terhapus");
        return;
    }
     // Menemukan elemen menggunakan Id
     var ProdukInteriorFurniturePostLink = document.getElementById("ProdukInteriorFurniturePost");
     var ProdukkitchenSetPostLink = document.getElementById("ProdukkitchenSetPost");

     var pageNameProdukInFurPost = document.getElementById("pageNameProdukInFurPost");
    

     // Default untuk menyembunyikan elemen
     ProdukInteriorFurnitureLink.style.visibility = 'hidden';
     ProdukkitchenSetPostLink.style.visibility = 'hidden';
  
     pageNameProdukInFurPost.textContent = "";
if (urlMappingProdukInteriorFurniturePost[cleanUrlProdukInFurPost]) {
        restoreCondition('ProdukInFurPost');
        restoreCondition('ProdukInteriorFurniturePost');
        restoreCondition('ProdukkitchenSetPost');
 
      //hapus elemen div id lain
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
     
       
     //hapus elemen ID DIV SUB ProdukInteriorFurniture SEMUA NYA
        ProdukInteriorFurnitureLink.style.visibility = 'visible';
        ProdukkitchenSetPostLink.style.visibility = 'visible';
        //ProdukBuisLink.style.visibility = 'visible';
        pageNameProdukInFurPost.textContent = urlMappingProdukInteriorFurniturePost[cleanUrlProdukInFurPost];
    }
  
   });
