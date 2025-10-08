// Daftar awal data barang
var dataBarang = [
    "Buku Tulis",
    "Pensil",
    "Spidol",
    "Penghapus",
    "Penggaris",
    "Tipe-X",
    "Bolpoin",
    "Kertas HVS",
    "Map Folder",
    "Stapler"
];

// Fungsi untuk menampilkan daftar barang
function showBarang() {
    var listBarang = document.getElementById("list-barang");
    listBarang.innerHTML = "";

    for (let i = 0; i < dataBarang.length; i++) {
        var btnEdit = "<a href='#' onclick='editBarang(" + i + ")'>Edit</a>";
        var btnHapus = "<a href='#' onclick='deleteBarang(" + i + ")'>Hapus</a>";

        listBarang.innerHTML += "<li>" + dataBarang[i] + " [" + btnEdit + " | " + btnHapus + "]</li>";
    }
}

// Fungsi untuk menambah barang baru
function addBarang() {
    var input = document.querySelector("input[name=barang]");
    if (input.value.trim() !== "") {
        dataBarang.push(input.value);
        input.value = ""; // kosongkan input setelah ditambah
        showBarang();
    } else {
        alert("Nama barang tidak boleh kosong!");
    }
}

// Fungsi untuk mengedit barang
function editBarang(id) {
    var newBarang = prompt("Nama baru untuk barang:", dataBarang[id]);
    if (newBarang !== null && newBarang.trim() !== "") {
        dataBarang[id] = newBarang;
        showBarang();
    }
}

// Fungsi untuk menghapus barang
function deleteBarang(id) {
    if (confirm("Yakin ingin menghapus " + dataBarang[id] + "?")) {
        dataBarang.splice(id, 1);
        showBarang();
    }
}

// Tampilkan daftar barang saat pertama kali halaman dibuka
showBarang();
