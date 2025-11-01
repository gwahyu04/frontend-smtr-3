// 1. Data Struktur (Objek JavaScript)
// Kunci (key) adalah nama Benua, dan isinya adalah array Negara.
const dataLokasi = {
    asia: ["Jepang", "Indonesia", "Korea Selatan", "India", "Thailand", "Malaysia"],
    eropa: ["Jerman", "Prancis", "Italia", "Spanyol", "Belanda", "Inggris"],
    amerika: ["Amerika Serikat", "Kanada", "Brasil", "Meksiko", "Argentina", "Cile"],
    afrika: ["Mesir", "Nigeria", "Afrika Selatan", "Kenya", "Maroko"],
    australia: ["Australia", "Selandia Baru", "Fiji", "Papua Nugini"]
};

// 2. Fungsi untuk menginisialisasi Dropdown Benua saat halaman dimuat
function inisialisasiBenua() {
    const selectBenua = document.getElementById('benua');

    // Tambahkan opsi default
    let defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "-- Pilih Benua --";
    selectBenua.appendChild(defaultOption);

    // Iterasi melalui dataLokasi dan tambahkan opsi Benua
    for (const benuaKey in dataLokasi) {
        const option = document.createElement('option');
        option.value = benuaKey;
        // Ubah key menjadi teks yang lebih rapi (misalnya: "asia" → "Asia")
        option.textContent = benuaKey.charAt(0).toUpperCase() + benuaKey.slice(1);
        selectBenua.appendChild(option);
    }
}

// 3. Fungsi utama yang dipanggil saat pilihan Benua diubah
function updateNegara() {
    const selectBenua = document.getElementById('benua');
    const selectNegara = document.getElementById('negara');
    const hasilElement = document.getElementById('hasil');

    // Dapatkan nilai (value) benua yang dipilih
    const benuaTerpilih = selectBenua.value;

    // A. Reset Dropdown Negara
    selectNegara.innerHTML = "";
    hasilElement.textContent = ""; // Reset hasil

    // B. Jika ada Benua yang dipilih
    if (benuaTerpilih) {
        // Tambahkan opsi default "Pilih Negara"
        let defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "-- Pilih Negara --";
        selectNegara.appendChild(defaultOption);

        // C. Ambil array negara dari benua terpilih
        const negaraArray = dataLokasi[benuaTerpilih];

        // D. Iterasi array dan tambahkan opsi negara
        negaraArray.forEach(function(negara) {
            const option = document.createElement('option');
            option.value = negara.toLowerCase().replace(/\s+/g, "-");
            option.textContent = negara;
            selectNegara.appendChild(option);
        });

        // E. Tambahkan event listener ke dropdown negara setelah diisi
        selectNegara.onchange = tampilkanHasil;
    } else {
        // Jika tidak ada benua dipilih (opsi default)
        let defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "-- Pilih Benua Dahulu --";
        selectNegara.appendChild(defaultOption);
    }
}

// 4. Fungsi untuk menampilkan hasil akhir
function tampilkanHasil() {
    const selectBenua = document.getElementById('benua');
    const selectNegara = document.getElementById('negara');
    const hasilElement = document.getElementById('hasil');

    const benuaTeks = selectBenua.options[selectBenua.selectedIndex].textContent;
    const negaraTeks = selectNegara.options[selectNegara.selectedIndex].textContent;

    if (selectNegara.value) {
        hasilElement.textContent = `Anda memilih: ${negaraTeks}, yang terletak di benua ${benuaTeks}.`;
        hasilElement.style.color = 'green';
    } else {
        hasilElement.textContent = 'Silakan lengkapi pilihan Anda.';
        hasilElement.style.color = 'orange';
    }
}

// Panggil fungsi inisialisasi saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', inisialisasiBenua);
