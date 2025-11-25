$(document).ready(function () {

    $("#btn-tambah").click(function () {
        let nama = $("#nama").val();

        if (nama === "") {
            alert("Nama tidak boleh kosong!");
            return;
        }

        let row = `
            <tr>
                <td class="nama">${nama}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="hapus-btn">Hapus</button>
                </td>
            </tr>
        `;

        $("#data-list").append(row);

        $("#nama").val("");
    });

    // Tombol Hapus
    $(document).on("click", ".hapus-btn", function () {
        $(this).closest("tr").remove();
    });

    // Tombol Edit
    $(document).on("click", ".edit-btn", function () {
        let td = $(this).closest("tr").find(".nama");
        let namaBaru = prompt("Edit nama:", td.text());

        if (namaBaru !== null && namaBaru !== "") {
            td.text(namaBaru);
        }
    });

});
