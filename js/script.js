// 1. Toggle icon navbar (Menu Responsif)
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("fa-xmark");
  navbar.classList.toggle("active");
};

// 2. Typing Effect (Efek teks mengetik)
const typedTextElement = document.getElementById("typed-text");
// Daftar profesi yang akan dianimasikan
const texts = ["Web Developer", "Mobile Developer", "Lifelong Learner"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;
let deletingSpeed = 100;
let delay = 1500; // Jeda sebelum mulai menghapus

function type() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    // Mode Hapus
    typedTextElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = deletingSpeed;
  } else {
    // Mode Ketik
    typedTextElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 150;
  }

  // Periksa apakah teks sudah selesai diketik/dihapus
  if (!isDeleting && charIndex === currentText.length) {
    // Teks selesai diketik, tunggu, lalu mulai hapus
    typingSpeed = delay;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Teks selesai dihapus, pindah ke teks berikutnya
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length; // Loop ke teks berikutnya
    typingSpeed = 500; // Jeda pendek sebelum mulai mengetik teks baru
  }

  setTimeout(type, typingSpeed);
}

// Mulai efek typing
document.addEventListener("DOMContentLoaded", () => {
  type();
});
