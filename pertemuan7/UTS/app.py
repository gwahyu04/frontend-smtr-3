from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL

app = Flask(__name__)
app.secret_key = 'secret123'

# Konfigurasi koneksi database
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'wahyu'
app.config['MYSQL_PASSWORD'] = 'qwerty'
app.config['MYSQL_DB'] = 'data_armada_trevel'

mysql = MySQL(app)

# ========================
#  HALAMAN UTAMA
# ========================
@app.route('/')
def index():
    return redirect(url_for('mobil'))


# ========================
#  CRUD MOBIL
# ========================
@app.route('/mobil')
def mobil():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM mobil")
    data = cur.fetchall()
    cur.close()
    return render_template('mobil.html', mobil=data)


@app.route('/tambah_mobil', methods=['POST'])
def tambah_mobil():
    nama = request.form['nama_mobil']
    merk = request.form['merk']
    tahun = request.form['tahun']
    harga = request.form['harga']
    status = 'Tersedia'

    cur = mysql.connection.cursor()
    cur.execute("""
        INSERT INTO mobil (nama_mobil, merk, tahun, harga_sewa, status)
        VALUES (%s, %s, %s, %s, %s)
    """, (nama, merk, tahun, harga, status))
    mysql.connection.commit()
    flash('Data mobil berhasil ditambahkan!', 'success')
    return redirect(url_for('mobil'))


@app.route('/hapus_mobil/<int:id>')
def hapus_mobil(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM mobil WHERE id = %s", (id,))
    mysql.connection.commit()
    flash('Data mobil berhasil dihapus!', 'danger')
    return redirect(url_for('mobil'))


# ========================
#  CRUD PELANGGAN
# ========================
@app.route('/pelanggan')
def pelanggan():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM pelanggan")
    data = cur.fetchall()
    cur.close()
    return render_template('pelanggan.html', pelanggan=data)


@app.route('/tambah_pelanggan', methods=['POST'])
def tambah_pelanggan():
    nama = request.form['nama']
    alamat = request.form['alamat']
    no_telp = request.form['no_telp']

    cur = mysql.connection.cursor()
    cur.execute("""
        INSERT INTO pelanggan (nama, alamat, no_telp)
        VALUES (%s, %s, %s)
    """, (nama, alamat, no_telp))
    mysql.connection.commit()
    flash('Data pelanggan berhasil ditambahkan!', 'success')
    return redirect(url_for('pelanggan'))


# ========================
#  CRUD RENTAL
# ========================
@app.route('/rental')
def rental():
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT r.id, m.nama_mobil, p.nama, r.tanggal_pinjam, 
               r.tanggal_kembali, r.total_harga, r.status
        FROM rental r
        JOIN mobil m ON r.id_mobil = m.id
        JOIN pelanggan p ON r.id_pelanggan = p.id
    """)
    data = cur.fetchall()
    cur.close()
    return render_template('rental.html', rental=data)


@app.route('/tambah_rental', methods=['POST'])
def tambah_rental():
    id_mobil = request.form['id_mobil']
    id_pelanggan = request.form['id_pelanggan']
    tanggal_pinjam = request.form['tanggal_pinjam']
    tanggal_kembali = request.form['tanggal_kembali']
    total_harga = request.form['total_harga']
    status = 'Berjalan'

    cur = mysql.connection.cursor()
    cur.execute("""
        INSERT INTO rental (id_mobil, id_pelanggan, tanggal_pinjam, tanggal_kembali, total_harga, status)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (id_mobil, id_pelanggan, tanggal_pinjam, tanggal_kembali, total_harga, status))
    mysql.connection.commit()
    flash('Data rental berhasil ditambahkan!', 'success')
    return redirect(url_for('rental'))

# ========================
#  FILTER FORMAT RUPIAH
# ========================
@app.template_filter('rupiah')
def format_rupiah(value):
    try:
        value = int(value)
        return "Rp {:,}".format(value).replace(",", ".")
    except (ValueError, TypeError):
        return "Rp 0"



if __name__ == '__main__':
    app.run(debug=True)
