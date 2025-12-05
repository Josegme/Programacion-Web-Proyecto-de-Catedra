/* ===================================
   MENÚ HAMBURGUESA Y NAVEGACIÓN
   =================================== */

// Selección de elementos
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const overlay = document.getElementById("overlay");

// Toggle del menú hamburguesa
if (hamburger) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });
}

// Función para abrir/cerrar menú
function toggleMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Cerrar menú al hacer click en enlaces
const navLinks = document.querySelectorAll(".nav-menu a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

// Cerrar menú al hacer click en overlay
if (overlay) {
  overlay.addEventListener("click", () => {
    closeMenu();
  });
}

// Función para cerrar menú
function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  overlay.classList.remove("active");
}

// Cerrar menú con tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMenu();
  }
});

// Smooth scroll para enlaces ancla
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
