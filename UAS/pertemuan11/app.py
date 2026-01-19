from flask import Flask, render_template, request, redirect, url_for, abort
import sqlite3
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

# ================== KONFIGURASI UPLOAD ==================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "static", "uploads")
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# ================== FILTER RUPIAH ==================
@app.template_filter("rupiah")
def format_rupiah(angka):
    try:
        return "Rp {:,.0f}".format(float(angka)).replace(",", ".")
    except:
        return "Rp 0"

# ================== DATABASE ==================
def get_db():
    conn = sqlite3.connect("stokumkm.db")
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS rental (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nama_mobil TEXT,
            merk TEXT,
            harga_sewa REAL,
            status TEXT,
            foto TEXT,
            transmisi TEXT,
            bahan_bakar TEXT,
            kapasitas INTEGER,
            tahun INTEGER
        )
    """)
    conn.commit()
    conn.close()

init_db()

# ================== FRONTEND ==================
@app.route("/")
def beranda():
    conn = get_db()
    data = conn.execute(
        "SELECT * FROM rental WHERE status='Tersedia' LIMIT 3"
    ).fetchall()
    conn.close()
    return render_template("frontend/beranda.html", mobil_favorit=data)

@app.route("/armada")
def armada():
    conn = get_db()
    data = conn.execute(
        "SELECT * FROM rental WHERE status='Tersedia'"
    ).fetchall()
    conn.close()
    return render_template("frontend/armada.html", armada=data)

@app.route("/mobil/<int:id>")
def detail_mobil(id):
    conn = get_db()

    mobil = conn.execute(
        "SELECT * FROM rental WHERE id=?",
        (id,)
    ).fetchone()

    rekomendasi = conn.execute(
        "SELECT * FROM rental WHERE id != ? AND status='Tersedia' LIMIT 3",
        (id,)
    ).fetchall()

    conn.close()

    if mobil is None:
        abort(404)

    return render_template(
        "frontend/detail.html",
        mobil=mobil,
        rekomendasi=rekomendasi
    )

# ================== SEARCH ==================
@app.route("/search")
def search():
    keyword = request.args.get("q", "").strip()
    conn = get_db()

    if keyword:
        data = conn.execute("""
            SELECT * FROM rental
            WHERE status='Tersedia'
            AND (nama_mobil LIKE ? OR merk LIKE ?)
        """, (f"%{keyword}%", f"%{keyword}%")).fetchall()
    else:
        data = []

    conn.close()
    return render_template("frontend/armada.html", armada=data, keyword=keyword)

# ================== STATIC PAGES ==================
@app.route("/tentang")
def tentang():
    return render_template("frontend/tentang.html")

@app.route("/kontak")
def kontak():
    return render_template("frontend/kontak.html")

# ================== ADMIN ==================
@app.route("/index")
def admin_index():
    conn = get_db()
    rows = conn.execute("SELECT * FROM rental").fetchall()
    conn.close()
    return render_template("admin/index.html", stoks=rows)

@app.route("/admin/add", methods=["GET", "POST"])
def admin_add():
    if request.method == "POST":
        file = request.files.get("foto")
        filename = None

        if file and file.filename:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

        conn = get_db()
        conn.execute("""
            INSERT INTO rental
            (nama_mobil, merk, harga_sewa, status,
             transmisi, bahan_bakar, kapasitas, tahun, foto)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            request.form["nama_mobil"],
            request.form["merk"],
            request.form["harga_sewa"],
            request.form["status"],
            request.form["transmisi"],
            request.form["bahan_bakar"],
            request.form["kapasitas"],
            request.form["tahun"],
            filename
        ))
        conn.commit()
        conn.close()
        return redirect(url_for("admin_index"))

    return render_template("admin/add.html")

@app.route("/admin/edit/<int:id>", methods=["GET", "POST"])
def admin_edit(id):
    conn = get_db()
    stok = conn.execute(
        "SELECT * FROM rental WHERE id=?", (id,)
    ).fetchone()

    if request.method == "POST":
        file = request.files.get("foto")
        filename = stok["foto"]

        if file and file.filename:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

        conn.execute("""
            UPDATE rental SET
                nama_mobil=?,
                merk=?,
                harga_sewa=?,
                status=?,
                transmisi=?,
                bahan_bakar=?,
                kapasitas=?,
                tahun=?,
                foto=?
            WHERE id=?
        """, (
            request.form["nama_mobil"],
            request.form["merk"],
            request.form["harga_sewa"],
            request.form["status"],
            request.form["transmisi"],
            request.form["bahan_bakar"],
            request.form["kapasitas"],
            request.form["tahun"],
            filename,
            id
        ))
        conn.commit()
        conn.close()
        return redirect(url_for("admin_index"))

    conn.close()
    return render_template("admin/edit.html", stok=stok)

@app.route("/admin/delete/<int:id>")
def admin_delete(id):
    conn = get_db()
    conn.execute("DELETE FROM rental WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return redirect(url_for("admin_index"))

# ================== RUN ==================
if __name__ == "__main__":
    app.run(debug=True)
