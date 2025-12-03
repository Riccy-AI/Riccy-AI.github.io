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

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("unifiedContactForm");
  const sendWhatsappBtn = document.getElementById("sendWhatsapp");
  const sendEmailBtn = document.getElementById("sendEmail");

  // Fungsi utilitas untuk mengambil data dari form
  function getFormData() {
    return {
      name: document.getElementById("senderName").value,
      email: document.getElementById("senderEmail").value,
      subject: document.getElementById("messageSubject").value,
      body: document.getElementById("messageBody").value,
      emailTo: document.getElementById("emailTo").value,
      waNumber: document.getElementById("waNumber").value,
    };
  }

  // Fungsi untuk validasi dasar
  function validateForm() {
    // Kita hanya perlu memastikan input yang 'required' tidak kosong
    return form.checkValidity();
  }

  // --- Aksi 1: Kirim via WhatsApp ---
  sendWhatsappBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!validateForm()) {
      form.reportValidity();
      return;
    }

    const data = getFormData();

    // Sanitasi nomor WhatsApp: hapus semua karakter non-digit
    const rawNumber = (data.waNumber || "").toString();
    const sanitizedNumber = rawNumber.replace(/\D/g, "");

    if (!sanitizedNumber) {
      alert("Nomor WhatsApp tujuan tidak valid. Silakan periksa konfigurasi.");
      return;
    }

    let text = `*Pesan dari Portofolio (via WhatsApp)*\n\n`;
    text += `Nama: ${data.name}\n`;
    text += `Email Pengirim: ${data.email}\n`;
    text += `Keperluan: ${data.subject}\n\n`;
    text += `Pesan:\n${data.body}`;

    const url = `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(
      text
    )}`;

    window.open(url, "_blank");
    form.reset();
  });

  // --- Aksi 2: Kirim via Email (menggunakan EmailJS) ---
  sendEmailBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!validateForm()) {
      form.reportValidity();
      return;
    }

    const data = getFormData();

    // Validasi tujuan email
    const emailTo = (data.emailTo || "").trim();
    if (!emailTo) {
      alert("Alamat email tujuan belum dikonfigurasi.");
      return;
    }

    const templateParams = {
      to_email: emailTo,
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.body,
    };

    // Kirim email menggunakan EmailJS
    emailjs.send("service_wlspwwc", "template_hjxre1h", templateParams).then(
      function (response) {
        alert("Pesan berhasil dikirim. Terima kasih!");
        form.reset();
      },
      function (error) {
        alert(
          "Gagal mengirim pesan. Coba lagi atau gunakan WhatsApp. Error: " +
            (error.text || error)
        );
      }
    );
  });
});
