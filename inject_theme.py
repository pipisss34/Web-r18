import os
import re

EXCLUDE_FILES = {
    "index.html",
    "support.html",
    "Singlebox.html",
    "Tidak berjudul.html",
    "CyberJSON_Editor.html"
}

THEME_BLOCK = """
/* ==== AUTO THEME VARIABLES ==== */
:root {
  --bg-body: #f8f9fa;
  --bg-content: #ffffff;
  --text-main: #000000;
  --nav-bg: #1E3A8A;
  --nav-hover: #3749BB;
  --card-shadow: rgba(0,0,0,0.1);
}

.dark-mode {
  --bg-body: #121212;
  --bg-content: #1e1e1e;
  --text-main: #e0e0e0;
  --nav-bg: #0f172a;
  --nav-hover: #1e293b;
  --card-shadow: rgba(0,0,0,0.6);
}
/* ==== END AUTO THEME ==== */
"""

REPLACEMENTS = [
    (r'background:\s*white;', 'background: var(--bg-content);'),
    (r'background-color:\s*white;', 'background-color: var(--bg-content);'),
    (r'background:\s*#f8f9fa;', 'background: var(--bg-body);'),
    (r'color:\s*black;', 'color: var(--text-main);'),
    (r'background:\s*#1E3A8A;', 'background: var(--nav-bg);'),
    (r'background:\s*#3749BB;', 'background: var(--nav-hover);'),
]

for file in os.listdir("."):
    if not file.endswith(".html"):
        continue

    if file in EXCLUDE_FILES:
        print(f"Lewati {file}")
        continue

    with open(file, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # Tambah variabel theme jika belum ada
    if "--bg-body" not in content:
        content = content.replace("<style>", f"<style>\n{THEME_BLOCK}\n")
        print(f"Tambah blok theme ke {file}")

    # Ganti warna keras
    for pattern, repl in REPLACEMENTS:
        content = re.sub(pattern, repl, content, flags=re.IGNORECASE)

    if content != original:
        with open(file, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Update warna di {file}")
    else:
        print(f"Tidak ada perubahan di {file}")

print("Selesai. Dark mode sekarang gak setengah-setengah.")
