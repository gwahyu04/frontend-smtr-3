// Ambil elemen-elemen dari HTML
const modal = document.getElementById("popupModal");
const btnBuka = document.getElementById("bukaFormulir");
const spanTutup = document.getElementsByClassName("tutup")[0];
const formBarang = document.getElementById("formbarang");
const daftarBarang = document.getElementById("daftarbarang");

// Ketika tombol "Tambah Data Baru" diklik, tampilkan modal
btnBuka.onclick = function () {
    modal.style.display = "block";
};

// Ketika tombol "x" diklik, tutup modal
spanTutup.onclick = function () {
    modal.style.display = "none";
};

// Jika pengguna mengklik di luar konten modal, tutup modal
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Event listener saat form disubmit
formBarang.addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah reload halaman

    // Ambil nilai dari input form
    const kodeBarang = document.getElementById("kode").value;
    const namaBarang = document.getElementById("nama").value;
    const hargaBarang = document.getElementById("harga").value;

    // Format harga ke format Rupiah
    const hargaFormat = formatRupiah(hargaBarang);

    // Buat elemen list baru
    const listItem = document.createElement("li");
    listItem.textContent =
        `Kode Barang: ${kodeBarang} | Nama Barang: ${namaBarang} | Harga: ${hargaFormat}`;

    // Tambahkan ke daftar barang
    daftarBarang.appendChild(listItem);

    // Reset form setelah input
    formBarang.reset();

    // Tutup modal setelah data disimpan
    modal.style.display = "none";

    console.log("Data tersimpan:", kodeBarang, namaBarang, hargaFormat);
});

// Fungsi untuk memformat angka menjadi format Rupiah
function formatRupiah(angka) {
    return "Rp " + Number(angka).toLocaleString("id-ID");
}

// Fungsi opsional untuk menampilkan semua barang (data disaat page load)
function tampilkanBarang() {
    console.log("Menampilkan daftar barang...");
}
