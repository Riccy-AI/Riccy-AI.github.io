// Animasi scroll ke bagian tertentu
document.querySelector("button").addEventListener("click", function () {
  // Menambahkan event listener pada tombol
  window.scrollTo({
    // Mengatur scroll ke posisi tertentu
    top: document.querySelector(".skills").offsetTop, // Mengambil posisi atas dari elemen dengan kelas "skills"
    behavior: "smooth", // Mengatur perilaku scroll menjadi halus
  });
});
