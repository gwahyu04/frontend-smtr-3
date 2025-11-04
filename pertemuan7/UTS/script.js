// --- Variabel global ---
let kategoriDipilih = "";
let jenisPenjualan = "";
let hargaBarang = 0;

// --- Fungsi menampilkan popup kategori ---
function showPopupKategori() {
    const kategori = document.getElementById("kategori").value;
    if (kategori === "pc") {
        document.getElementById("popup-pc").style.display = "block";
    } else if (kategori === "aksesoris") {
        document.getElementById("popup-aksesoris").style.display = "block";
    } else if (kategori === "Monitor") {
        document.getElementById("popup-Monitor").style.display = "block";
    }
}

// --- Fungsi menampilkan popup jenis penjualan ---
function showPopupJenis() {
    document.getElementById("popup-jenis").style.display = "block";
}

// --- Fungsi menutup popup ---
function closePopup(id) {
    document.getElementById(id).style.display = "none";
}

// --- Fungsi memilih barang ---
function pilihBarang(kategori) {
    let pilihan;

    if (kategori === "pc") {
        pilihan = document.querySelector('input[name="pc"]:checked');
    } else if (kategori === "aksesoris") {
        pilihan = document.querySelector('input[name="aks"]:checked');
    } else if (kategori === "Monitor") {
        pilihan = document.querySelector('input[name="Monitor"]:checked');
    }

    if (!pilihan) {
        alert("Pilih salah satu barang terlebih dahulu!");
        return;
    }

    const [nama, harga] = pilihan.value.split(",");
    document.getElementById("nama").value = nama;
    document.getElementById("harga").value = harga;
    hargaBarang = parseFloat(harga);
    kategoriDipilih = kategori;

    closePopup("popup-pc");
    closePopup("popup-aksesoris");
    closePopup("popup-Monitor");
}

// --- Fungsi simpan jenis penjualan ---
function simpanJenis() {
    const jenis = document.querySelector('input[name="jual"]:checked');
    if (!jenis) {
        alert("Pilih jenis penjualan terlebih dahulu!");
        return;
    }

    jenisPenjualan = jenis.value;
    document.getElementById("jenis").value = jenis.value;
    closePopup("popup-jenis");
}

// --- Fungsi menghitung total ---
function hitungTotal() {
    const jumlah = parseInt(document.getElementById("jumlah").value);
    const harga = parseFloat(document.getElementById("harga").value);

    if (isNaN(jumlah) || isNaN(harga)) {
        alert("Isi data barang dan jumlah terlebih dahulu!");
        return;
    }

    // Total harga
    const total = jumlah * harga;
    document.getElementById("total").value = total.toLocaleString();

    // Hitung diskon
    let diskon = 0;
    if (jenisPenjualan === "tunai") {
        diskon = 0.1 * total; // diskon 10%
    }
    document.getElementById("diskon").value = diskon.toLocaleString();

    // Hitung pajak
    let pajak = 0;
    if (kategoriDipilih === "pc") {
        pajak = 0.15 * total; // 15% pajak  PC
    } else if (kategoriDipilih === "aksesoris") {
        pajak = 0.10 * total; // 10% pajak  aksesoris
    } else if (kategoriDipilih === "Monitor") {
        pajak = 0.12 * total; // 12% pajak Monitor
    }
    document.getElementById("pajak").value = pajak.toLocaleString();

    // Harga total akhir
    const hargaTotal = total - diskon + pajak;
    document.getElementById("hargatotal").value = hargaTotal.toLocaleString();
}

// --- Fungsi reset form ---
function resetForm() {
    // Reset semua nilai input
    document.getElementById("kategori").value = "";
    document.getElementById("nama").value = "";
    document.getElementById("harga").value = "";
    document.getElementById("jumlah").value = "";
    document.getElementById("jenis").value = "";
    document.getElementById("total").value = "";
    document.getElementById("diskon").value = "";
    document.getElementById("pajak").value = "";
    document.getElementById("hargatotal").value = "";

    // Reset radio button
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(r => r.checked = false);

    // Reset variabel global
    kategoriDipilih = "";
    jenisPenjualan = "";
    hargaBarang = 0;

    // Tutup popup jika ada yang terbuka
    closePopup("popup-pc");
    closePopup("popup-aksesoris");
    closePopup("popup-Monitor");
    closePopup("popup-jenis");
}
