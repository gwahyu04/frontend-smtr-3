function loadData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            var output = '<ul>';
            data.forEach(function(mahasiswa) {
                output += '<li>' + mahasiswa.nama + ' - ' + mahasiswa.nim + '</li>';
            });
            output += '</ul>';
            document.getElementById('hasil').innerHTML = output;
        } else {
            document.getElementById('hasil').innerHTML = 'Terjadi kesalahan saat mengambil data.';
        }
    };
    xhr.onerror = function() {
        document.getElementById('hasil').innerHTML = 'Gagal terhubung ke server.';
    };
    xhr.send();
}
