// Fungsi untuk menampilkan hasil
const tampilkanHasil = (hasil) => alert(`Hasil = ${hasil}`);

// Fungsi penjumlahan dengan callback
const penjumlahan = (a, b, display) => {
    let hasil = a + b;  // Perbaikan: 'hsil' jadi 'hasil'
    display(hasil);     // Perbaikan: 'display(hasil)'
};

// Panggilan pertama: Menggunakan fungsi tampilkanHasil
penjumlahan(9, 6, tampilkanHasil);

// Panggilan kedua: Menggunakan arrow function inline
penjumlahan(9, 6, (hasil) => alert(`Wah, hasilnya adalah ${hasil}`));  // Perbaikan: backtick dan kapitalisasi
