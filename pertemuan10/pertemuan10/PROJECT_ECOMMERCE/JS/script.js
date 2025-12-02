// Fungsi untuk format angka menjadi Rupiah (misal: 150000 -> 150.000)
const formatRupiah = (angka) => {
    if (angka === undefined || angka === null) return '0';
    let reverse = angka.toString().split('').reverse().join('');
    let ribuan = reverse.match(/\d{1,3}/g);
    let formatted = ribuan.join('.').split('').reverse().join('');
    return formatted;
};

// Menggunakan $(document).ready() atau $(function) untuk memastikan DOM siap
$(function () {

    // Variabel Keranjang Global
    let cart = [];
    const MAX_PRICE = 1000000; // Maksimal harga filter, diubah dari 10jt ke 1jt agar lebih mudah dites
    
    // ===========================
    //  1. SETUP FILTER HARGA (SLIDER)
    // ===========================
    
    $("#priceSlider").slider({
        range: true,
        min: 0,
        max: MAX_PRICE,
        values: [0, MAX_PRICE], // Default: 0 - 1.000.000
        step: 10000,
        slide: function (event, ui) {
            // Mengupdate label harga saat slider digeser
            $("#priceRange").text(`Rp ${formatRupiah(ui.values[0])} - Rp ${formatRupiah(ui.values[1])}`);
        }
    });

    // Set nilai awal label harga
    $("#priceRange").text(`Rp ${formatRupiah($("#priceSlider").slider("values", 0))} - Rp ${formatRupiah($("#priceSlider").slider("values", 1))}`);

    
    // ===========================
    //  2. FUNGSI FILTER PRODUK BERDASARKAN HARGA
    // ===========================

    // Event click pada tombol "Terapkan Filter"
    $("#filterBtn").click(function () {
        const minPrice = $("#priceSlider").slider("values", 0);
        const maxPrice = $("#priceSlider").slider("values", 1);
        
        $(".product-card").each(function () {
            // Ambil harga dari atribut data-price, pastikan diubah menjadi integer
            const itemPrice = parseInt($(this).data("price"));

            // Logika Filter
            if (itemPrice >= minPrice && itemPrice <= maxPrice) {
                $(this).fadeIn(200); // Tampilkan dengan efek
            } else {
                $(this).fadeOut(200); // Sembunyikan dengan efek
            }
        });
    });

    
    // ===========================
    //  3. DIALOG CART SETUP
    // ===========================

    $("#cartDialog").dialog({
        autoOpen: false,
        width: 350,
        modal: true,
        resizable: false,
        classes: {
            "ui-dialog": "ui-corner-all", // Agar sudut dialog mengikuti style
        }
    });

    // Event click pada ikon keranjang untuk membuka dialog
    $("#openCart").click(function() {
        $("#cartDialog").dialog("open");
    });


    // ===========================
    //  4. SISTEM KERANJANG
    // ===========================

    // === Update Tampilan Keranjang (Fungsi Inti) ===
    function updateCart() {
        const cartItemsList = $("#cartItems");
        cartItemsList.empty(); // Kosongkan daftar item

        let total = 0;

        if (cart.length === 0) {
             cartItemsList.append('<li>Keranjang kosong.</li>');
             $("#cartDialog").dialog("option", "title", "🛒 Keranjang Belanja (0)");
             $("#cartTotal").text(formatRupiah(0));
             return;
        }

        // Hitung total dan tampilkan item
        cart.forEach((item, index) => {
            cartItemsList.append(`
                <li>
                    <span>${item.name}</span>
                    <span>Rp ${formatRupiah(item.price)}
                    <button class="removeCartItem bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2" data-index="${index}" style="margin-left: 10px; padding: 2px 8px; font-size: 12px; background: #f53f2c; border-radius: 3px;">Hapus</button>
                    </span>
                </li>
            `);
            total += item.price;
        });

        $("#cartTotal").text(formatRupiah(total));
        $("#cartDialog").dialog("option", "title", `🛒 Keranjang Belanja (${cart.length})`);
    }
    
    // Panggil updateCart untuk inisialisasi awal
    updateCart();

    // === Tambah Produk ke Keranjang ===
    // Menggunakan event delegation untuk tombol yang dinamis
    $(document).on('click', '.addToCart', function () {
        // Ambil data dari parent (product-card)
        const card = $(this).closest(".product-card");
        const name = card.data("name"); // Mengambil dari data-name
        const price = parseInt(card.data("price"));

        if (name && price) {
            cart.push({ name: name, price: price });
            updateCart();
            $("#cartDialog").dialog("open");

            // Tambahkan indikasi visual produk telah ditambahkan
            $(this).text("✅ Ditambahkan!").prop('disabled', true);
            const btn = this;
            setTimeout(() => {
                 $(btn).text("Tambah Ke Keranjang").prop('disabled', false);
            }, 1000);
        }
    });

    // === Hapus Item dari Keranjang ===
    $(document).on('click', '.removeCartItem', function () {
        const indexToRemove = $(this).data('index');
        
        // Hapus item dari array cart berdasarkan index
        if (indexToRemove !== undefined && indexToRemove >= 0 && indexToRemove < cart.length) {
            cart.splice(indexToRemove, 1);
            updateCart(); // Perbarui tampilan keranjang
        }
    });


    // ===========================
    //  5. FUNGSI PENCARIAN
    // ===========================
    $("#searchBtn").click(performSearch);
    $("#searchInput").on('keypress', function(e) {
        if(e.which == 13) { // Deteksi tombol Enter
            performSearch();
        }
    });

    function performSearch() {
        const query = $("#searchInput").val().toLowerCase();
        
        // Pastikan filter harga dinonaktifkan sementara saat mencari
        $(".product-card").each(function () {
            const productName = $(this).data("name").toLowerCase();
            
            if (productName.includes(query)) {
                $(this).fadeIn(200);
            } else {
                $(this).fadeOut(200);
            }
        });
    }

});