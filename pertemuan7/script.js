const tombolBuka = document.getElementById("tombolBuka");
const tombolTutup = document.getElementById("tombolTutup");
const modalOverlay = document.getElementById("modalOverlay");

// Ketika tombol buka diklik, tampilkan pop-up
tombolBuka.addEventListener("click", () => {
    modalOverlay.classList.add("popup-tampil");
});

// Ketika tombol tutup diklik, sembunyikan pop-up
tombolTutup.addEventListener("click", () => {
    modalOverlay.classList.remove("popup-tampil");
});

// Klik di luar konten pop-up untuk menutup
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove("popup-tampil");
    }
});
