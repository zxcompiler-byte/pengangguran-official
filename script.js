// script.js
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
const icon = document.getElementById("menu-icon");
const navLinks = document.querySelectorAll(".nav-link");

// FUNGSI UTAMA: Mengganti Class Active
function changeActive(targetHref) {
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === targetHref) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
}

// 1. SAAT HALAMAN DIBUKA
window.addEventListener("load", () => {
  // Set Beranda sebagai aktif secara default
  changeActive("#beranda");

  // Jalankan animasi reveal konten
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    el.classList.remove("opacity-0", "-translate-x-10", "translate-x-10");
    el.classList.add("opacity-100", "translate-x-0");
  });
});

// 2. SAAT LINK DIKLIK
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    changeActive(targetId); // Jalankan fungsi ganti warna

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navHeight = document.querySelector("nav").offsetHeight;
      window.scrollTo({
        top: targetElement.offsetTop - navHeight,
        behavior: "smooth",
      });
      // Ganti URL bar kembali ke root tanpa tanda pagar
      window.history.replaceState(null, null, " ");
    }

    // Tutup menu mobile jika terbuka
    if (window.innerWidth < 768) {
      menu.classList.add("opacity-0", "pointer-events-none", "-translate-y-10");
      icon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
    }
  });
});

// 3. TOGGLE HAMBURGER (Tetap sama)
btn.addEventListener("click", () => {
  menu.classList.toggle("opacity-0");
  menu.classList.toggle("pointer-events-none");
  menu.classList.toggle("-translate-y-10");
  const isOpen = !menu.classList.contains("opacity-0");
  icon.setAttribute(
    "d",
    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
  );
});

// Auto update navbar saat scroll manual
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");
  const navHeight = document.querySelector("nav").offsetHeight;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - navHeight - 10) {
      current = "#" + section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === current) {
      link.classList.add("active-link");
    }
  });
});
