#!/bin/bash

# --- KONFIGURASI ---
EXCLUDE_FILES=("index.html" "support.html" "Singlebox.html" "Tidak berjudul.html" "CyberJSON_Editor.html" "RJ01008902.html")

# Konten Firebase & Modal (Tetap sama, menggunakan CSS overlay agar tidak merusak layout)
NEW_CONTENT='<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>

<style>
  .login-modal {
    position: fixed; inset: 0; background: rgba(0,0,0,0.85);
    display: none; align-items: center; justify-content: center; z-index: 10000;
  }
  .login-box {
    background: #1e1e1e; color: #fff; padding: 25px; border-radius: 15px;
    max-width: 340px; text-align: center; border: 1px solid #333;
  }
  .google-btn-modal {
    background: #fff; color: #000; border: none; padding: 12px; width: 100%;
    border-radius: 8px; font-weight: bold; cursor: pointer; display: flex; 
    align-items: center; justify-content: center; gap: 10px; margin-top: 15px;
  }
</style>

<script>
var firebaseConfig = {
  apiKey: "AIzaSyDI8c_lwobIcMD2b5bluFMSp_Ep_xZ2p2M",
  authDomain: "likeevent-9e9ff.firebaseapp.com",
  databaseURL: "https://likeevent-9e9ff-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "likeevent-9e9ff",
  storageBucket: "likeevent-9e9ff.firebasestorage.app",
  messagingSenderId: "18674215481",
  appId: "1:18674215481:web:d4ee094ef7236209ce3be8"
};
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
var database = firebase.database();
var auth = firebase.auth();
</script>

<div id="loginModal" class="login-modal">
  <div class="login-box">
    <h3>Login Diperlukan</h3>
    <p style="font-size:13px; opacity:0.8;">Satu akun hanya bisa memberikan satu like agar data akurat.</p>
    <button id="confirmLogin" class="google-btn-modal">
      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20">
      <span>Lanjut Login dengan Google</span>
    </button>
    <button id="closeModal" style="background:none; border:none; color:#aaa; cursor:pointer; margin-top:10px;">Batal</button>
  </div>
</div>

<script>
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginModal = document.getElementById("loginModal");
const likeBtn = document.getElementById("likeBtn");

if(likeBtn) likeBtn.onclick = () => { if(!auth.currentUser) loginModal.style.display = "flex"; };
document.getElementById("closeModal").onclick = () => { loginModal.style.display = "none"; };

const googleProvider = new firebase.auth.GoogleAuthProvider();
document.getElementById("confirmLogin").onclick = () => {
  auth.signInWithPopup(googleProvider).then(() => { loginModal.style.display = "none"; });
};

if(logoutBtn) logoutBtn.onclick = () => { auth.signOut(); };

auth.onAuthStateChanged((user) => {
  if (user) {
    if(loginBtn) loginBtn.style.display = "none";
    if(logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    if(loginBtn) loginBtn.style.display = "inline-block";
    if(logoutBtn) logoutBtn.style.display = "none";
  }
});
</script>
<script src="like.js"></script>
</body>
</html>'

# HTML Tombol Login (Dibuat full-width atau rata tengah agar rapi)
LOGIN_BUTTONS='<div style="width:100%; display:flex; justify-content:center; margin-top:10px;"><button id="loginBtn" style="background:#fff; color:#000; border:1px solid #ddd; padding:8px 15px; border-radius:5px; cursor:pointer; font-weight:bold; display:flex; align-items:center; gap:8px;"><img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="16">Login dengan Google</button><button id="logoutBtn" style="display:none; background:#444; color:#fff; border:none; padding:8px 15px; border-radius:5px; cursor:pointer;">Logout</button></div>'

# --- EKSEKUSI ---
for file in *.html; do
  skip=false
  for ex in "${EXCLUDE_FILES[@]}"; do [[ "$file" == "$ex" ]] && skip=true; done
  [[ "$skip" == true ]] && continue

  echo "Memindahkan tombol ke bawah container: $file"

  # 1. Bersihkan script & tombol lama (PENTING!)
  sed -i '//,$d' "$file"
  sed -i '/id="loginBtn"/d' "$file"
  sed -i '/id="logoutBtn"/d' "$file"
  sed -i '/loginBtnUI/d' "$file"

  # 2. Tempelkan script Firebase & Modal di akhir file
  echo "$NEW_CONTENT" >> "$file"

  # 3. MASUKKAN TOMBOL SETELAH DIV ACTIONS (BUKAN DI DALAMNYA)
  # Mencari baris penutup </div> dari class="actions"
  # Logika: Cari baris yang mengandung '</div>' SETELAH 'shareContent()'
  sed -i "/shareContent()/{:a;n;/<\/div>/!ba;a $LOGIN_BUTTONS
  }" "$file"

done

echo "SELESAI! Sekarang tombol login sudah berada di bawah grup tombol Like/Share."
