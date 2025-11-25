// Global variabel untuk melacak slide saat ini
let tracks = []; // Array untuk menyimpan semua track carousel

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inisialisasi semua carousel yang ada
  const allWrappers = document.querySelectorAll(".carousel-wrapper");

  allWrappers.forEach((wrapper, index) => {
    const track = wrapper.querySelector(".carousel-track");
    // Pastikan ada slide sebelum menginisialisasi
    const slides = track.querySelectorAll(".carousel-slide");

    if (slides.length > 0) {
      tracks[index] = {
        trackElement: track,
        slides: slides,
        currentIndex: 0,
      };
      createDots(wrapper, index);
      updateCarousel(index);
    }
  });

  // 2. Tambahkan event listener untuk tombol next/prev
  window.moveSlide = function (n) {
    // Cari wrapper terdekat dari tombol yang diklik
    const wrapper = event.target.closest(".carousel-wrapper");
    // Temukan index wrapper ini di antara semua wrapper yang ada
    const allWrappers = document.querySelectorAll(".carousel-wrapper");
    const wrapperIndex = Array.from(allWrappers).indexOf(wrapper);

    if (wrapperIndex !== -1 && tracks[wrapperIndex]) {
      tracks[wrapperIndex].currentIndex += n;
      updateCarousel(wrapperIndex);
    }
  };

  // 3. Tambahkan event listener untuk dots
  window.currentSlide = function (n, wrapperIndex) {
    if (tracks[wrapperIndex]) {
      tracks[wrapperIndex].currentIndex = n;
      updateCarousel(wrapperIndex);
    }
  };
});

function createDots(wrapper, wrapperIndex) {
  const dotsContainer = wrapper.querySelector(".carousel-dots");
  const totalSlides = tracks[wrapperIndex].slides.length;

  // Hapus dot lama (jika ada)
  dotsContainer.innerHTML = "";

  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.setAttribute("onclick", `currentSlide(${i}, ${wrapperIndex})`);
    dotsContainer.appendChild(dot);
  }
}

function updateCarousel(wrapperIndex) {
  const data = tracks[wrapperIndex];
  let currentIndex = data.currentIndex;
  const totalSlides = data.slides.length;

  // Hitung ulang indeks jika melewati batas
  if (currentIndex >= totalSlides) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  }

  data.currentIndex = currentIndex;

  // Geser track
  data.trackElement.style.transform =
    "translateX(" + -currentIndex * 100 + "%)";

  // Update dots
  const dots = data.trackElement
    .closest(".carousel-wrapper")
    .querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.remove("active");
    if (index === currentIndex) {
      dot.classList.add("active");
    }
  });
}

// Fungsi untuk membuka modal/lightbox
window.openModal = function (imageSrc) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");

  modal.style.display = "block";
  modalImage.src = imageSrc;
};

// Fungsi untuk menutup modal/lightbox
window.closeModal = function () {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
};

// Menutup modal jika tombol 'Esc' ditekan
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    window.closeModal();
  }
});
