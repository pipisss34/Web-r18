document.addEventListener("DOMContentLoaded", function () {

  const gameId = window.location.pathname.split("/").pop().replace(".html", "");

  const likeBtn = document.getElementById("likeBtn");
  const likeCountEl = document.getElementById("likeCount");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!likeBtn || !likeCountEl) return;

  const likeRef = firebase.database().ref("likes/" + gameId);

  const provider = new firebase.auth.GoogleAuthProvider();

  let currentUser = null;
  let alreadyLiked = false;
  let isProcessing = false;


  // ================= LOGIN =================
  loginBtn.onclick = () => firebase.auth().signInWithPopup(provider);
  logoutBtn.onclick = () => firebase.auth().signOut();


  // ================= REALTIME COUNT =================
  likeRef.child("count").on("value", snap => {
    likeCountEl.innerText = snap.val() || 0;
  });


  // ================= AUTH =================
  firebase.auth().onAuthStateChanged(user => {

    currentUser = user;

    if (user) {

      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";

      // cek status like user
      likeRef.child("users/" + user.uid).on("value", snap => {

        alreadyLiked = snap.exists();

        if (alreadyLiked) {
          likeBtn.innerText = "💦 Liked";
        } else {
          likeBtn.innerText = "❤ Like";
        }

      });

    } else {

      loginBtn.style.display = "inline-block";
      logoutBtn.style.display = "none";

      likeBtn.innerText = "❤ Like";
      alreadyLiked = false;

    }

  });


  // ================= LIKE BUTTON =================
  likeBtn.onclick = function () {

    if (!currentUser) {
      document.getElementById("loginModal").style.display = "flex";
      return;
    }

    if (alreadyLiked) return;

    if (isProcessing) return;

    isProcessing = true;

    likeRef.transaction(data => {

      if (!data) {
        data = { count: 0, users: {} };
      }

      if (!data.users)
        data.users = {};

      if (data.users[currentUser.uid])
        return data;

      data.count = (data.count || 0) + 1;
      data.users[currentUser.uid] = true;

      return data;

    }, (error, committed) => {

      isProcessing = false;

      if (committed) {
        likeBtn.innerText = "💦 Liked";
      }

    });

  };

});