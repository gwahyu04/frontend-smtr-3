$(document).ready(function () {

    $("#add-btn").click(function () {
        let input = $("#todo-input").val();

        if (input === "") {
            alert("Isi dulu kegiatannya!");
            return;
        }

        let li = `
            <li>
                ${input}
                <button class="delete-btn">Hapus</button>
            </li>
        `;

        $("#todo-list").append(li);

        $("#todo-input").val("");
    });

    $(document).on("click", ".delete-btn", function () {
        $(this).parent().remove();
    });

});
