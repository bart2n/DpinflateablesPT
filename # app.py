# app.py
from flask import Flask, send_from_directory, abort
from pathlib import Path

# Dossier du projet = là où se trouve app.py + tes .html, css/, js/, img/, etc.
BASE_DIR = Path(__file__).resolve().parent

app = Flask(__name__, static_folder=None)  # on sert tout nous-mêmes

# Accueil
@app.route("/")
@app.route("/index.html")
def index():
    return send_from_directory(BASE_DIR, "index.html")

# Route générique : sert n'importe quel fichier du dossier (html, css, js, img, video, etc.)
@app.route("/<path:filename>")
def serve_file(filename: str):
    # Sécurité de base et résolution du chemin
    file_path = (BASE_DIR / filename).resolve()
    if not str(file_path).startswith(str(BASE_DIR)) or not file_path.exists():
        abort(404)
    # Ex.: arches.html, css/template-style.css, img/slider01.jpg, video/..., owl-carousel/...
    return send_from_directory(BASE_DIR, filename)

if __name__ == "__main__":
    # dev server
    app.run(host="127.0.0.1", port=5000, debug=True)
