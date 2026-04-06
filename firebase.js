// Konfigurasi Firebase
entById("nameInput").value.trim();
  const input = document.getElementById("chatInput");
  let msg = input.value.trim();

  if (!name || !msg) return;

  // Filter kata terlarang sebelum disimpan
  msg = filterBadWords(msg);

  db.ref("messages").push({
    name: name,
    text: msg,
    timestamp: Date.now()
  });

  input.value = "";
}
