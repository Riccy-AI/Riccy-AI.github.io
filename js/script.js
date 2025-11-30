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

  // --- Aksi 2: Kirim via Email (menggunakan EmailJS) ---
  sendEmailBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!validateForm()) {
      form.reportValidity(); // Tampilkan pesan error validasi HTML5
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

    // Ganti 'YOUR_SERVICE_ID' dan 'YOUR_TEMPLATE_ID' dengan nilai dari EmailJS
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
  // Mengkodekan URL mailto:
  const subjectEncoded = encodeURIComponent(
    `[Portofolio Kontak] ${data.subject}`
  );
  const bodyEncoded = encodeURIComponent(emailBody);

  // Validasi tujuan email
  const emailTo = (data.emailTo || "").trim();
  if (!emailTo) {
    alert("Alamat email tujuan belum dikonfigurasi.");
    return;
  }

  const mailtoLink = `mailto:${emailTo}?subject=${subjectEncoded}&body=${bodyEncoded}`;

  // Buka mailto di tab baru. Perlu diingat: ini hanya membuka klien email pengguna
  // yang sudah diatur sebagai default. Jika pengguna tidak memiliki mail client,
  // email tidak akan terkirim otomatis.
  try {
    window.open(mailtoLink, "_blank");
  } catch (err) {
    // Fallback: set href agar setidaknya browser mencoba membuka handler mail
    window.location.href = mailtoLink;
  }

  // Informasi singkat ke user untuk membantu troubleshooting
  setTimeout(() => {
    alert(
      "Form telah menyiapkan email di klien mail Anda. Jika tidak muncul, pastikan Anda memiliki aplikasi email default yang terpasang atau gunakan layanan pengiriman email server-side seperti EmailJS atau Formspree."
    );
  }, 500);

  form.reset();
});
