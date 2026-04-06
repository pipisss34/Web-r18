<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBjwmol72gdvb_c5BZUiu0tYvnhbXSOuBc",
    authDomain: "popular-dcd61.firebaseapp.com",
    projectId: "popular-dcd61",
    storageBucket: "popular-dcd61.firebasestorage.app",
    messagingSenderId: "458070464688",
    appId: "1:458070464688:web:3f35d369afc2feb6ee4375",
    measurementId: "G-0VNFS94JB7"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>